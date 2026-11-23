/* 25 · Avisos al administrador aunque no abra la app (23 nov).
   Cada hora (al minuto 2), por negocio: lee n/{neg}/av/plan (lo deja la app: quién tiene clientes cada día, zona horaria, días que dura la fruta)
   y el estado de cada ruta (n/{neg}/d/r~{chofer}~salida, stops, cierre, cierreReg, rutaDia80), y a la hora del negocio manda:
     8:00  precio de hoy sin fijar · fruta madura que se pasa hoy o mañana
     9:00 y 10:00  choferes con clientes hoy que no han hecho "Iniciar el día"
     14:00 y 17:00  cómo van las entregas y pedidos de hoy sin chofer
     21:00  cierres sin mandar y cierres sin recibir
   Cada aviso se manda una sola vez (n/{neg}/av/env) y va a todos los celulares de administrador (n/{neg}/push con ch "admins",
   que manda la función avisoPush). No escribe en los registros (logs) ningún dato del negocio. */

// mismo formato que la app (fuente/capas/l28.js: nbDocAPlano + nbArma)
const dk = (s) => (s === '%00' ? '' : String(s).replace(/%([0-9A-F]{2})/g, (m, h) => String.fromCharCode(parseInt(h, 16))));
const jp = (s) => { try { return JSON.parse(s); } catch (e) { return null; } };
function decodifica(d) {
  if (!d || !d.k) return undefined;
  if (d.k === 'r') return d.r === undefined ? null : jp(d.r);
  if (d.k === 'n') { const c = d.c || {}; return Number(c[''] !== undefined ? c[''] : c._) || 0; }
  const G = {}, ord = d.o || {};
  Object.keys(d.e || {}).forEach((f) => { const i = f.indexOf('|'), K = f.slice(0, i), p = f.slice(i + 1); (G[K] = G[K] || {})[p] = d.e[f]; });
  const arma = (g) => {
    if (g['='] !== undefined && g['#'] === undefined) return jp(g['=']);
    const o = {}; Object.keys(g).forEach((p) => { if (p !== '#') o[dk(p)] = jp(g[p]); }); return o;
  };
  if (d.k === 'c') {
    const o = {}; Object.keys(d.c || {}).forEach((x) => { o[dk(x)] = Number(d.c[x]) || 0; });
    Object.keys(G).forEach((K) => { if (G[K]['=']) o[dk(K)] = jp(G[K]['=']); }); return o;
  }
  const pos = (K) => (ord[K] === undefined ? 1e9 : ord[K]);
  if (d.k === 'a') return Object.keys(G).sort((a, b) => pos(a) - pos(b) || (a < b ? -1 : a > b ? 1 : 0)).map((K) => arma(G[K]));
  const m = {}; Object.keys(G).forEach((K) => { m[dk(K)] = arma(G[K]); }); return m;
}
function ahoraEn(tz, cuando) {
  let p;
  try {
    p = new Intl.DateTimeFormat('en-CA', { timeZone: tz, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' }).formatToParts(cuando || new Date());
  } catch (e) { return tz === 'America/Mexico_City' ? null : ahoraEn('America/Mexico_City', cuando); }
  const v = {}; p.forEach((x) => { v[x.type] = x.value; });
  return { f: v.year + '-' + v.month + '-' + v.day, h: +v.hour, m: +v.minute };
}
const masDias = (f, n) => { const d = new Date(f + 'T12:00:00Z'); d.setUTCDate(d.getUTCDate() + n); return d.toISOString().slice(0, 10); };
const lista = (L) => (L.length <= 2 ? L.join(' y ') : L.slice(0, -1).join(', ') + ' y ' + L[L.length - 1]);
const SLOTS = { 8: 'manana', 9: 'inicio', 10: 'inicio', 14: 'entregas', 17: 'entregas', 21: 'cierre' };

/* arma los avisos de un negocio. leer(id) = valor decodificado de n/{neg}/d/{id}. Regresa [[titulo, texto], ...] */
async function armaAvisos(plan, ahora, leer) {
  const tipo = SLOTS[ahora.h]; if (!tipo || ahora.m >= 30) return [];
  const hoy = (plan.dias || {})[ahora.f] || {}, ids = Object.keys(hoy);
  const ruta = async (ch) => {
    const v = await Promise.all(['salida', 'stops', 'cierre', 'cierreReg', 'rutaDia80'].map((k) => leer('r~' + ch + '~' + k)));
    const s = v[0] || {}, rutaDia = v[4], inicio = !!(s.ok && (s.f7 === ahora.f || rutaDia === ahora.f));
    const L = Array.isArray(v[1]) && rutaDia === ahora.f ? v[1].filter(Boolean) : [];
    const p = hoy[ch] || ((plan.dias || {})[masDias(ahora.f, -1)] || {})[ch] || {};
    return { n: p.n || 'Un chofer', k: hoy[ch] ? hoy[ch].k : 0, inicio, hechas: L.filter((x) => x.done).length, total: L.length, cierre: v[2] || {}, cierreReg: v[3] };
  };
  const msgs = [];
  if (tipo === 'manana') {
    if (ids.length) {
      const precio = (await leer('s~precio')) || {};
      if (Number(precio.R) > 0 && precio.conf !== ahora.f) msgs.push(['💲 Fija el precio de hoy', 'Todavía no lo fijas. Los choferes salen con el de ayer: roatán $' + precio.R + ' la caja · macho $' + precio.M + ' el kilo.']);
    }
    const madL = await leer('s~madL'), vida = Number(plan.vida) || 3, R = [], M = [];
    (Array.isArray(madL) ? madL : []).forEach((x) => {
      if (!x || !(Number(x.q) > 0) || !x.dia) return;
      const vence = masDias(x.dia, vida); if (vence <= masDias(ahora.f, 1)) (x.p === 'R' ? R : M).push({ q: Number(x.q), ya: vence <= ahora.f });
    });
    const t = [], suma = (L) => L.reduce((a, x) => a + x.q, 0);
    if (R.length) t.push(suma(R) + ' cajas de roatán maduro'); if (M.length) t.push(suma(M) + ' kg de macho maduro');
    if (t.length) msgs.push(['🍌 Fruta madura que se pasa', lista(t) + ' se ' + (R.concat(M).some((x) => x.ya) ? 'pasan hoy' : 'pasan mañana') + ': que salgan primero o rematarlas.']);
  }
  if (tipo === 'inicio' && ids.length) {
    const R = await Promise.all(ids.map(ruta)), no = R.filter((r) => !r.inicio && r.k > 0);
    if (no.length) msgs.push(['🚚 ' + (no.length === 1 ? no[0].n + ' no ha iniciado su ruta' : no.length + ' choferes no han iniciado su ruta'),
      no.map((r) => r.n + ': ' + r.k + ' cliente' + (r.k === 1 ? '' : 's') + ' hoy').join(' · ') + '. Todavía no hacen "Iniciar el día".']);
  }
  if (tipo === 'entregas') {
    const R = await Promise.all(ids.map(ruta)), t = [];
    R.forEach((r) => {
      if (!r.inicio) { if (r.k > 0) t.push(r.n + ' no ha iniciado (' + r.k + ' clientes)'); return; }
      if (r.total && r.hechas < r.total) t.push(r.n + ' lleva ' + r.hechas + ' de ' + r.total);
    });
    const sin = Array.isArray(plan.sinCh) ? plan.sinCh : [];
    if (sin.length) t.push('pedido' + (sin.length === 1 ? '' : 's') + ' sin chofer: ' + lista(sin.slice(0, 4)) + (sin.length > 4 ? '…' : ''));
    if (t.length) msgs.push(['📦 Entregas pendientes', t.join(' · ') + '.']);
  }
  if (tipo === 'cierre') {
    const L = Array.from(new Set(ids.concat(Object.keys((plan.dias || {})[masDias(ahora.f, -1)] || {}))));
    const R = await Promise.all(L.map(ruta)), sinMandar = [], sinRecibir = [];
    R.forEach((r) => { const c = r.cierre || {}; if (r.inicio && !c.sent) sinMandar.push(r.n); else if (c.sent && c.res && r.cierreReg == null) sinRecibir.push(r.n); });
    if (sinMandar.length) msgs.push(['🧾 Cierre sin mandar', lista(sinMandar) + ' no ha' + (sinMandar.length === 1 ? '' : 'n') + ' mandado su cierre de hoy.']);
    if (sinRecibir.length) msgs.push(['📥 Cierre sin recibir', 'Falta recibir el cierre de ' + lista(sinRecibir) + ': cuenta su efectivo y sus cajas.']);
  }
  return msgs;
}

async function avisosDeNegocio(db, neg, cuando) {
  const base = 'n/' + neg;
  const planS = await db.doc(base + '/av/plan').get(); if (!planS.exists) return 0;
  const plan = planS.data() || {}, ahora = ahoraEn(plan.tz || 'America/Mexico_City', cuando);
  if (!ahora || ahora.m >= 30 || !SLOTS[ahora.h]) return 0;
  const llave = ahora.f + '_' + ahora.h, envRef = db.doc(base + '/av/env'), env = (await envRef.get()).data() || {};
  if (env[llave]) return 0;
  const leer = async (id) => { const s = await db.doc(base + '/d/' + id).get(); return s.exists ? decodifica(s.data()) : undefined; };
  const msgs = await armaAvisos(plan, ahora, leer);
  const nuevo = {}; nuevo[llave] = Date.now();
  Object.keys(env).forEach((k) => { if (k.slice(0, 10) >= masDias(ahora.f, -2)) nuevo[k] = env[k]; });
  await envRef.set(nuevo);
  for (const m of msgs) await db.collection(base + '/push').add({ ch: 'admins', titulo: m[0].slice(0, 200), texto: m[1].slice(0, 1000), tipo: 'aviso', t: Date.now() });
  return msgs.length;
}

module.exports = { decodifica, ahoraEn, armaAvisos, avisosDeNegocio, masDias };
