/* ===================== TEMA · Cierre atrasado con TODO lo de esa ruta + rutas que nadie recibió (20 nov · punto 6 de la nueva numeración, parte 1) =====================
   Ricardo: "no sé si se registró el dinero, las taras o cualquier cosa relacionada con esa ruta o cierre, no sé qué pasó con el vehículo, las
   taras, kilos, gasolina y lo más importante, el dinero … necesitamos saber dónde está cada peso, cada kilo y cada tara".
   1) En Rutas, cada "📥 Cierre atrasado" ahora enseña todo lo de esa ruta (de la ruta guardada, con la MISMA cuenta del cierre: cierreRes):
        💵 Dinero: vendido, cobrado en efectivo, tarjeta/transferencia, a crédito, abonos, gastos pagados del efectivo y el efectivo que
           debe entregar (si mandó su cierre, lo que mandó).
        📦 Taras: salió con, vendió, deben regresar llenas, vacías que recogió (y rotas).
        ⚖️ Kilos de macho: salió con, vendió, deben regresar.
        ⛽ Gasolina y gastos: cargas de gasolina (litros y $) y cada gasto.
        🚚 Vehículo: cuál, odómetro de salida y de llegada, km, tanque.
   2) "Rutas que nadie recibió": una ruta que quedó en el historial como NO mandada y que no está guardada para recibirse, ni sigue viva, ni
      se recibió de otra forma. Antes desaparecía de la vista. Ahora sale en Rutas con lo que se sabe de ella (sus entregas: dinero y vacías)
      y el botón "Recibir lo que traía", que la pasa a cierre atrasado (la misma recepción de siempre: cuentas el efectivo y las cajas).
   Solo enseña; lo único que guarda algo es "Recibir lo que traía" (crea el cierre atrasado con llave fija chofer|día: nunca doble).
   Se arma al final.
   ============================================================================================ */
/* la cuenta del cierre, con la ruta guardada puesta un momento en su lugar (se regresa todo tal cual, pase lo que pase) */
function conRuta6(pack, fn) {
  var K = AR_K.slice(), sv = {}, inv = S.inv ? { r: S.inv.reparto, k: S.inv.repartoKg } : null;
  K.forEach(function (k) { sv[k] = S[k]; });
  try {
    K.forEach(function (k) { if (pack && k in pack) S[k] = JSON.parse(JSON.stringify(pack[k])); });
    if (!S.log) S.log = []; if (!S.recs) S.recs = []; if (!S.gch) S.gch = []; if (!S.cambios) S.cambios = [];
    if (!S.cierre) S.cierre = {};
    if (S.inv && pack) { S.inv.reparto = num(pack.invR); S.inv.repartoKg = num(pack.invM); }
    return fn();
  } finally {
    K.forEach(function (k) { S[k] = sv[k]; });
    if (S.inv && inv) { S.inv.reparto = inv.r; S.inv.repartoKg = inv.k; }
  }
}
function rutaDet6(pack) {
  if (!pack) return null;
  var c = pack.cierre || {}, L = pack.log || [];
  var r = null;
  try { r = conRuta6(pack, function () { return cierreRes(); }); } catch (e) { r = null; }
  r = r || {};
  var env = !!(c.sent && c.res);
  var res = env ? c.res : r;
  var veh = null; try { veh = vehById(pack.vehHoy); } catch (e) {}
  var recs = pack.recs || [], gch = pack.gch || [];
  return {
    env: env, n: L.length,
    total: r2(num(res.total)), cobrado: r2(sum(L, function (l) { return num(l.pago) + num(l.abono); })), ab: r2(num(res.ab)),
    tarj: r2(num(res.tarj)), trans: r2(num(res.trans)), cred: r2(num(res.cred)), efectivo: r2(num(res.efectivo)),
    gasolina: r2(sum(recs, function (x) { return num(x.total); })), litros: r2(sum(recs, function (x) { return num(x.litros); })), recs: recs,
    gastos: r2(sum(gch, function (x) { return num(x.m); })), gch: gch,
    salioR: num(c.salioR), R: num(res.R), reg: Math.max(0, num(res.reg)), camR: num(pack.invR), V: num(res.V), Vr: num(res.Vr),
    salioM: num(c.salioM), M: r2(num(res.M)), regK: r2(Math.max(0, num(res.regK))), camM: r2(num(pack.invM)),
    veh: veh ? (veh.n + (veh.pl ? ' · ' + veh.pl : '')) : '', odoIni: c.odoIni, odo: c.odo, km: (c.odoIni != null && c.odoIni !== '' && c.odo != null) ? Math.max(0, num(c.odo) - num(c.odoIni)) : null,
    tankIni: c.tankIni || '', tank: c.tank || ''
  };
}
function detHTML6(d) {
  if (!d) return '';
  var row = function (a, b, cls) { return '<div class="row" style="border:0;min-height:28px"><span>' + a + '</span><b' + (cls ? ' class="' + cls + '"' : '') + '>' + b + '</b></div>'; };
  var sec = function (t, x) { return x ? '<div style="margin-top:8px"><div style="font-weight:800">' + t + '</div>' + x + '</div>' : ''; };
  var din = row('Entregas', d.n) + row('Vendido', money(d.total))
    + row('Cobrado (incluye abonos)', money(d.cobrado))
    + (d.tarj + d.trans > 0 ? row('Con tarjeta o transferencia', money(d.tarj + d.trans)) : '')
    + (d.cred > 0 ? row('Quedó a crédito', money(d.cred)) : '')
    + (d.gasolina + d.gastos > 0 ? row('Gastos pagados del efectivo', '−' + money(d.gasolina + d.gastos), 'neg') : '')
    + row(d.env ? 'Efectivo que mandó en su cierre' : 'Efectivo que debe entregar', money(d.efectivo));
  var tar = (d.salioR ? row('Salió con (llenas)', d.salioR) : '') + row('Vendió', d.R)
    + (d.reg || d.camR ? row('Deben regresar llenas', Math.max(d.reg, d.camR)) : '')
    + row('Vacías que recogió', d.V + (d.Vr ? ' (+' + d.Vr + ' rotas)' : ''));
  var kg = (d.salioM || d.M || d.regK || d.camM) ? (d.salioM ? row('Salió con', r2(d.salioM) + ' kg') : '') + row('Vendió', d.M + ' kg') + ((d.regK || d.camM) ? row('Deben regresar', Math.max(d.regK, d.camM) + ' kg') : '') : '';
  var gas = (d.recs.length ? d.recs.map(function (x) { return row('⛽ ' + esc(x.tipo || 'Gasolina') + (x.litros ? ' · ' + num(x.litros) + ' L' : ''), money(num(x.total))); }).join('') : '')
    + (d.gch.length ? d.gch.map(function (x) { return row(esc(x.tipo || 'Gasto') + (x.nota ? ' · ' + esc(x.nota) : ''), money(num(x.m))); }).join('') : '');
  var veh = (d.veh ? row('Vehículo', esc(d.veh)) : '') + (d.odoIni != null && d.odoIni !== '' ? row('Odómetro', num(d.odoIni).toLocaleString('es-MX') + ' → ' + (d.odo != null ? num(d.odo).toLocaleString('es-MX') : '—') + (d.km != null ? ' (' + d.km + ' km)' : '')) : row('Odómetro de salida', 'no se anotó'))
    + (d.tankIni || d.tank ? row('Tanque', esc(d.tankIni || '—') + ' → ' + esc(d.tank || '—')) : '');
  /* una tarjeta por tema (como el resto de la app); se usa en su propia pantalla */
  var card = function (t, x) { return x ? '<div class="card det6" style="padding:12px 14px"><div style="display:flex;align-items:center;gap:6px;font-weight:800;font-size:17px;margin-bottom:4px">' + t + '</div>' + x + '</div>' : ''; };
  return card('💵 Dinero', din) + card('📦 Taras', tar) + card('⚖️ Kilos de macho', kg) + card('⛽ Gasolina y gastos', gas || '<div class="lbl">No anotó gasolina ni gastos.</div>') + card('🚚 Vehículo', veh);
}
/* lo esencial, para la tarjeta corta (en Rutas y en Descuadres) */
function detCorto6(d) {
  if (!d) return '';
  var row = function (a, b) { return '<div class="row" style="border:0;min-height:26px"><span>' + a + '</span><b>' + b + '</b></div>'; };
  return row(d.env ? 'Efectivo que mandó' : 'Efectivo que debe entregar', money(d.efectivo))
    + ((d.reg || d.camR || d.V) ? row('Taras', Math.max(d.reg, d.camR) + ' llenas · ' + d.V + ' vacías') : '')
    + ((d.regK || d.camM) ? row('Kilos de macho', Math.max(d.regK, d.camM) + ' kg') : '');
}
/* ---------- rutas que nadie recibió ---------- */
function huerf6() {
  var L = [];
  try {
    var hoy = iso(TODAY), lim = iso(new Date(TODAY.getTime() - 60 * 864e5)), A = S.atras93 || {}, H = S.rutasHist || [];
    var vivas = [];
    if (S.chofHoy != null) vivas.push((+S.chofHoy) + '|' + S.rutaDia80);
    Object.keys(S.chSt || {}).forEach(function (id) { var o = S.chSt[id]; if (o) vivas.push((+id) + '|' + o.rutaDia80); });
    var prev = (S.cierresPrev || []).map(function (x) { return (+x.ch) + '|' + x.f; });
    H.forEach(function (e, i) {
      if (!e || e.enviado || e.recibido94 || e.parcial120 || !e.f || e.f >= hoy || e.f < lim || e.ch == null) return;
      if (!(e.log || []).length) return;
      var k = (+e.ch) + '|' + e.f;
      if (A[k] || vivas.indexOf(k) > -1 || prev.indexOf(k) > -1) return;
      if (H.some(function (x) { return x !== e && +x.ch === +e.ch && x.f === e.f && (x.enviado || x.recibido94); })) return;
      if (L.some(function (x) { return x.k === k; })) return;
      L.push({ k: k, i: i, ch: +e.ch, f: e.f, e: e });
    });
  } catch (e) {}
  return L;
}
function huerfPack6(x) {
  var o = chNuevo(+x.ch);
  o.rutaDia80 = x.f; o.log = JSON.parse(JSON.stringify(x.e.log || [])); o.stops = []; o.salida = o.salida || {}; o.salida.ok = true;
  o.cierre = o.cierre || {}; o.cierre.sent = false; o.cierre.res = null; o.invR = 0; o.invM = 0; o.recs = []; o.gch = [];
  o.huerf6 = 1; return o;
}
function huerfRecibir6(k) {
  var x = huerf6().filter(function (y) { return y.k === k; })[0]; if (!x) return false;
  S.atras93 = S.atras93 || {}; if (S.atras93[k]) return false;
  var p = huerfPack6(x);
  S.atras93[k] = { id: +x.ch, f: x.f, h: hhmm(), why: 'sinCierre', env: false, ef: cobro95(p), cj: 0, pack: flaco93(p), huerf6: 1 };
  try { S.hist.push({ t: fmtF(iso(TODAY)) + ' ' + hhmm(), q: quien(), x: 'La ruta del ' + fCorta91(x.f) + ' de ' + chofN(+x.ch) + ' (nadie la había recibido) pasó a cierre atrasado para recibirla' }); } catch (e) {}
  return true;
}
document.addEventListener('click', function (e) {
  var b = e.target.closest && e.target.closest('[data-act="huerf6"]'); if (!b) return;
  e.preventDefault(); e.stopImmediatePropagation();
  if (huerfRecibir6(b.dataset.k)) { toast('Listo: ya está en Rutas como cierre atrasado para recibirlo'); if (S.tab.admin === 'ruta6') S.ruta6k = 'A|' + b.dataset.k; }
  render();
}, true);
/* ---------- en Rutas: tarjeta corta + "Ver todo lo de esta ruta ›" (su propia pantalla) ---------- */
function verBtn6(k) { return '<button class="btn sec" style="width:100%;margin-top:8px;min-height:48px" data-act="ruta6" data-k="' + esc(k) + '">Ver todo lo de esta ruta ›</button>'; }
function atras6Pon() {
  if (S.role !== 'admin') return;
  var m = document.querySelector('main'); if (!m) return;
  var cards = m.querySelectorAll('[data-x="atr93c"]');
  Array.prototype.forEach.call(cards, function (cd) {
    if (cd.querySelector('[data-x="corto6"]')) return;
    var b = cd.querySelector('[data-act="atr93"]'); if (!b) return;
    var e = (S.atras93 || {})[b.dataset.k]; if (!e || !e.pack) return;
    var h = ''; try { h = detCorto6(rutaDet6(e.pack)); } catch (er) { h = ''; }
    if (!h) return;
    b.insertAdjacentHTML('beforebegin', '<div data-x="corto6" style="margin-top:6px">' + h + '</div>' + verBtn6('A|' + b.dataset.k));
  });
  if (S.tab.admin !== 'rutas' || m.querySelector('[data-x="huerf6"]')) return;
  var H = huerf6(); if (!H.length) return;
  var d = document.createElement('div'); d.dataset.x = 'huerf6';
  d.innerHTML = H.map(function (x) {
    var p = huerfPack6(x), det = rutaDet6(p);
    return '<div class="card alert" style="padding:12px 14px"><b style="font-size:17px">⚠️ La ruta del ' + esc(fCorta91(x.f)) + ' de ' + esc(chofN(x.ch)) + ': nadie la recibió</b>'
      + '<div class="lbl">No mandó su cierre y no quedó guardada para recibirla. Cobró ' + money(det ? det.cobrado : 0) + ' según sus entregas.</div>'
      + '<div data-x="corto6" style="margin-top:6px">' + detCorto6(det) + '</div>' + verBtn6('H|' + x.k)
      + '<button class="btn" style="width:100%;margin-top:8px;min-height:50px" data-act="huerf6" data-k="' + esc(x.k) + '">Recibir lo que traía</button></div>';
  }).join('');
  var h1 = m.querySelector('h1'); if (h1) h1.insertAdjacentElement('afterend', d); else m.prepend(d);
}
/* ---------- la pantalla "Todo lo de esta ruta" ---------- */
function ruta6Datos(k) {
  k = String(k || '');
  if (/^A\|/.test(k)) { var key = k.slice(2), e = (S.atras93 || {})[key]; if (!e || !e.pack) return null; return { k: key, tipo: 'A', id: e.id, f: e.f, pack: e.pack, huerf: !!e.huerf6, hecho: !!e.hecho }; }
  if (/^H\|/.test(k)) { var x = huerf6().filter(function (y) { return y.k === k.slice(2); })[0]; if (!x) return null; return { k: x.k, tipo: 'H', id: x.ch, f: x.f, pack: huerfPack6(x), huerf: true }; }
  return null;
}
function ruta6() {
  var D = ruta6Datos(S.ruta6k), vol = '<button class="link pnback" data-act="tab" data-t="' + esc(S.ruta6de || 'rutas') + '">← Volver</button>';
  if (!D) return vol + '<h1>Todo lo de esta ruta</h1><div class="card good" style="padding:14px"><b>✓ Esta ruta ya no está pendiente</b><div class="lbl">Ya se recibió.</div></div>';
  var d = rutaDet6(D.pack);
  var h = vol + '<h1 style="margin-top:4px">Ruta de ' + esc(chofN(D.id)) + '</h1><div class="lbl" style="margin-bottom:8px">' + esc(fmtF(D.f)) + ' · ' + (D.tipo === 'H' ? 'nadie la recibió' : (d.env ? 'mandó su cierre y no se ha recibido' : 'no mandó su cierre')) + '</div>';
  if (D.huerf) h += '<div class="card note" style="padding:10px 14px"><b>Solo se conocen sus entregas</b><div class="lbl">No quedó lo que traía en el camión ni sus gastos: al recibirla cuenta el efectivo y las cajas que llegaron.</div></div>';
  h += '<div class="fadein" key="r6' + esc(D.k) + '">' + detHTML6(d) + '</div>';
  h += D.tipo === 'A' ? '<button class="btn big" style="width:100%;margin-top:6px" data-act="atr93" data-k="' + esc(D.k) + '">Recibirlo ahora</button>'
    : '<button class="btn big" style="width:100%;margin-top:6px" data-act="huerf6" data-k="' + esc(D.k) + '">Recibir lo que traía</button>';
  return h;
}
document.addEventListener('click', function (e) {
  var b = e.target.closest && e.target.closest('[data-act="ruta6"]'); if (!b) return;
  e.preventDefault(); e.stopImmediatePropagation();
  S.ruta6de = S.tab.admin === 'caso6' ? 'caso6' : (S.tab.admin === 'ruta6' ? (S.ruta6de || 'rutas') : S.tab.admin);
  S.ruta6k = b.dataset.k; S.tab.admin = 'ruta6'; render(); window.scrollTo(0, 0);
}, true);
var _rd6a = render;
render = function () {
  try { if (typeof VIEWS !== 'undefined' && !VIEWS.ruta6) VIEWS.ruta6 = ruta6; } catch (e) {}
  var r = _rd6a.apply(this, arguments); try { atras6Pon(); } catch (e) { console.error('atras6', e); } return r;
};
/* en la barra de abajo, "Rutas" queda marcada mientras ves una ruta */
if (typeof barra92 === 'function') { var _b92r6 = barra92; barra92 = function () { var r = _b92r6.apply(this, arguments); try { if (S.role === 'admin' && S.tab.admin === 'ruta6') { var b = document.querySelector('nav.tabs button[data-t="rutas"]'); if (b) b.setAttribute('aria-pressed', 'true'); } } catch (e) {} return r; }; }
