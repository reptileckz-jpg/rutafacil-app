/* ===================== TEMA · Seguimiento de descuadres: taras, efectivo y kilos (20 nov · punto 6 de la nueva numeración, parte 2) =====================
   Ricardo: "cuando haya un descuadre de taras o efectivo, de kilos, un descuadre de lo que sea, hacer una interfaz que ayude a darle seguimiento
   a cada cosa … necesitamos saber dónde está cada peso, cada kilo y cada tara. No podemos perder nada".
   1) FOTO DIARIA (S.foto6, en la nube, para siempre ~400 días): el celular del administrador anota cada día (se actualiza durante el día)
      dónde están las taras (vacías en bodega, llenas, camiones, vacías en camiones, clientes, proveedores, cierres atrasados), lo esperado,
      los kilos de macho (bodega y camiones) y el efectivo esperado en caja. Así se sabe "hasta qué día cuadraba" y qué lugar cambió.
   2) PANTALLA "🔎 Descuadres" (Más → Descuadres, la tarjeta de Inicio y "¿A dónde se fueron?" en el aviso de taras). Junta solos los casos:
        📦 Taras: "faltan/sobran N" (la cuenta de siempre: tarasDif86). Detalle: hasta qué día cuadraba, tabla por lugar (ese día → hoy),
           lo que movió taras desde ese día (movimientos de taras, rutas recibidas con vacías que faltaron, cierres atrasados) y pistas.
        💵 Efectivo: cada cierre de caja que no cuadró (esperado, contado, diferencia) y cada faltante de efectivo de un chofer (S.faltantes),
           con lo de su ruta (dinero, gastos). Y el dinero de cierres atrasados que todavía no se recibe.
        ⚖️ Kilos y cajas llenas: cada "Faltante al regresar" y cada conteo de bodega con faltante (mermas), con lo de esa ruta.
        📥 Sin recibir: cierres atrasados (efectivo, taras y kilos que traen) y rutas que nadie recibió.
   3) SEGUIMIENTO (S.casos6, en la nube, renglón por caso): cada caso tiene estado (Abierto / Revisando / Resuelto), notas con quién y cuándo
      ("Danu dice que las dejó con Don Beto"), y se cierra con "Ya apareció" (no toca nada) o, SOLO en taras, "Ajustar" (anota un movimiento
      de taras con su motivo, como el conteo; se puede deshacer con "Reabrir y deshacer el ajuste", que anota el movimiento contrario).
      Efectivo y kilos NUNCA se ajustan desde aquí: se resuelven con nota (el cobro al chofer o la merma ya se registran donde siempre).
   Blindaje: la pantalla solo LEE. Lo único que escribe: la foto del día, el estado/notas de cada caso y el ajuste de taras (registro nuevo
   con motivo; nada se borra). Llaves fijas por caso: con dos administradores no se duplica. Se arma al final.
   ============================================================================================ */
try { ['foto6', 'casos6'].forEach(function (k) { if (NB_SH.indexOf(k) < 0) NB_SH.push(k); }); } catch (e) {}

/* ---------- 1) la foto del día ---------- */
function kgDonde6() {
  var bod = 0, cam = 0, atr = 0;
  try { Object.keys(S.invB || {}).forEach(function (id) { var I = S.invB[id]; if (I) bod += num(I.kgVerde) + num(I.kgMaduro); }); if (!S.invB || !Object.keys(S.invB).length) bod = num(S.inv.kgVerde) + num(S.inv.kgMaduro); } catch (e) {}
  try { cam += num(S.inv.repartoKg); (typeof rutasOtras === 'function' ? rutasOtras() : []).forEach(function (o) { cam += num(o.invM); }); } catch (e) {}
  try { (typeof atrasCuenta2 === 'function' ? atrasCuenta2() : []).forEach(function (o) { atr += num(o.invM); }); } catch (e) {}
  return { bod: r2(bod), cam: r2(cam), atr: r2(atr), tot: r2(bod + cam + atr) };
}
function foto6Hoy() {
  var w = cajasDonde(), esp = Math.round(cajasEsperadas()), k = kgDonde6(), e = 0;
  try { e = r2(cajaEsp()); } catch (x) {}
  return { t: { vac: Math.round(num(w.vac)), ll: Math.round(num(w.llenas)), cam: Math.round(num(w.cam)), camV: Math.round(num(w.camV)), cli: Math.round(num(w.cli)), pv: Math.round(num(w.pv)), atr: Math.round(num(w.atras2)), tot: Math.round(num(w.tot)), esp: esp, dif: Math.round(num(w.tot) - esp) },
    k: k, e: e };
}
var FOTO6 = { t: 0 };
function foto6Toma(forzar) {
  try {
    if (S.role !== 'admin' || S.encOn || (S.setup && !S.setup.fin) || S.cajasT0 == null || S.atr93) return;
    if (!forzar && Date.now() - FOTO6.t < 60000) return;
    FOTO6.t = Date.now();
    var hoy = iso(TODAY), f = foto6Hoy(); f.h = hhmm();
    S.foto6 = S.foto6 && typeof S.foto6 === 'object' && !Array.isArray(S.foto6) ? S.foto6 : {};
    var a = S.foto6[hoy], igual = a && JSON.stringify({ t: a.t, k: a.k, e: a.e }) === JSON.stringify({ t: f.t, k: f.k, e: f.e });
    if (!igual) S.foto6[hoy] = f;
    var lim = iso(new Date(TODAY.getTime() - 400 * 864e5));
    Object.keys(S.foto6).forEach(function (d) { if (d < lim) delete S.foto6[d]; });
  } catch (e) {}
}
/* el último día (antes de hoy) en que las taras cuadraban */
function cuadraba6() {
  var F = S.foto6 || {}, D = Object.keys(F).filter(function (d) { return d < iso(TODAY) && F[d] && F[d].t; }).sort();
  for (var i = D.length - 1; i >= 0; i--) if (num(F[D[i]].t.dif) === 0) return D[i];
  return null;
}

/* ---------- 2) los casos ---------- */
function casoSt6(k) { var C = S.casos6 || {}; return C[k] || null; }
function casos6() {
  var L = [], hoy = iso(TODAY), lim = iso(new Date(TODAY.getTime() - 60 * 864e5));
  /* 📦 taras: un caso abierto mientras no cuadre; si se resolvió y vuelve a descuadrar, es un caso nuevo */
  try {
    var d = tarasDif86();
    var C = S.casos6 || {}, abierto = Object.keys(C).filter(function (k) { return /^T\|/.test(k) && C[k] && C[k].est !== 'res'; }).sort().pop();
    var nT = Object.keys(C).filter(function (k) { return /^T\|/.test(k); }).length;
    if (d) L.push({ k: abierto || ('T|' + hoy + '|' + nT), tipo: 'T', f: abierto ? abierto.split('|')[1] : hoy, dif: d, tit: (d < 0 ? 'Faltan ' : 'Sobran ') + Math.abs(d) + ' taras', vivo: true });
    else if (abierto) L.push({ k: abierto, tipo: 'T', f: abierto.split('|')[1], dif: 0, tit: 'Taras: ya cuadran', vivo: true, ya: true });
  } catch (e) {}
  /* 💵 cierres de caja que no cuadraron */
  try {
    (S.cajaCierres || []).forEach(function (x) {
      if (!x || !x.f || x.f < lim) return; var dif = r2(num(x.dif)); if (Math.abs(dif) < 0.5) return;
      L.push({ k: 'E|' + x.f + '|' + (x.h || ''), tipo: 'E', f: x.f, dif: dif, x: x, tit: 'Caja del ' + fCorta91(x.f) + ': ' + (dif < 0 ? 'faltaron ' : 'sobraron ') + money(Math.abs(dif)) });
    });
  } catch (e) {}
  /* 💵 faltantes de efectivo de un chofer */
  try {
    (S.faltantes || []).forEach(function (x, i) {
      if (!x || x.multa || x.arrastre || x.tar72 || x.tar108 || !x.fecha || x.fecha < lim || !(num(x.m) > 0)) return;
      L.push({ k: 'F|' + x.fecha + '|' + x.ch + '|' + r2(num(x.m)), tipo: 'F', f: x.fecha, dif: -r2(num(x.m)), x: x, tit: chofN(+x.ch) + ': ' + (x.txt || x.mot || 'entregó de menos') + ' · ' + money(num(x.m)) + ' (' + fCorta91(x.fecha) + ')' });
    });
  } catch (e) {}
  /* ⚖️ kilos y cajas llenas que faltaron (al regresar, o en un conteo de bodega) */
  try {
    (S.mermas || []).forEach(function (x) {
      if (!x || !x.fecha || x.fecha < lim) return;
      var reg = x.tipo === 'Faltante al regresar', cnt = /^(Día|Semana|Mes)$/.test(x.tipo || '');
      if (!reg && !cnt) return; if (!(num(x.R) > 0 || num(x.M) > 0)) return;
      var q = [num(x.R) > 0 ? num(x.R) + ' caja' + (num(x.R) === 1 ? '' : 's') + ' llena' + (num(x.R) === 1 ? '' : 's') : '', num(x.M) > 0 ? r2(num(x.M)) + ' kg' : ''].filter(Boolean).join(' y ');
      L.push({ k: 'K|' + x.fecha + '|' + (x.tipo || '') + '|' + (x.txt || '') + '|' + num(x.R) + '|' + r2(num(x.M)), tipo: 'K', f: x.fecha, x: x, dif: -r2(num(x.valor)),
        tit: (reg ? 'Faltó al regresar ' + (x.txt || '') : 'Conteo de bodega') + ': ' + q + ' (' + fCorta91(x.fecha) + ')' });
    });
  } catch (e) {}
  /* 📥 lo que todavía no se recibe */
  try {
    (typeof atrasLista93 === 'function' ? atrasLista93() : []).forEach(function (x) {
      L.push({ k: 'A|' + x.k, tipo: 'A', f: x.f, dif: 0, x: x, tit: 'Sin recibir: ' + chofN(x.id) + ' del ' + fCorta91(x.f) + ' (' + money(x.ef) + (x.cj ? ' · ' + x.cj + ' cajas' : '') + ')', vivo: true });
    });
    (typeof huerf6 === 'function' ? huerf6() : []).forEach(function (x) {
      L.push({ k: 'H|' + x.k, tipo: 'H', f: x.f, dif: 0, x: x, tit: 'Nadie la recibió: ruta de ' + chofN(x.ch) + ' del ' + fCorta91(x.f), vivo: true });
    });
  } catch (e) {}
  /* los casos ya resueltos que ya no salen solos (p. ej. taras que se ajustaron): se quedan en "Resueltos" con su historia */
  try {
    var C6 = S.casos6 || {}, ya6 = L.map(function (c) { return c.k; });
    Object.keys(C6).forEach(function (k) { var o = C6[k]; if (!o || ya6.indexOf(k) > -1 || o.est !== 'res') return; L.push({ k: k, tipo: k.charAt(0), f: k.split('|')[1] || '', dif: 0, tit: o.tit || (o.res && o.res.como) || 'Caso resuelto', hist: true }); });
  } catch (e) {}
  L.forEach(function (c) { var s = casoSt6(c.k); c.est = c.vivo && !c.ya ? (s && s.est === 'rev' ? 'rev' : 'ab') : (s ? s.est : 'ab'); if (c.ya && (!s || s.est !== 'res')) c.est = 'rev'; c.s = s; });
  return L;
}
function casosAb6() { return casos6().filter(function (c) { return c.est !== 'res'; }); }
var EST6 = { ab: ['Abierto', '#FEE2E2', '#991B1B'], rev: ['Revisando', '#FEF3C7', '#92400E'], res: ['Resuelto', '#DCFCE7', '#166534'] };
var TIPO6 = { T: '📦 Taras', E: '💵 Efectivo', F: '💵 Efectivo', K: '⚖️ Kilos y cajas llenas', A: '📥 Sin recibir', H: '📥 Sin recibir' };

/* ---------- el detalle de cada caso ---------- */
function row6(a, b, cls) { return '<div class="row" style="border:0;min-height:28px"><span>' + a + '</span><b' + (cls ? ' class="' + cls + '"' : '') + '>' + b + '</b></div>'; }
function histDe6(ch, f) { return (S.rutasHist || []).filter(function (e) { return e && +e.ch === +ch && e.f === f; }); }
function packHist6(e) { return { log: e.log || [], cierre: { sent: !!e.res, res: e.res || null }, vehHoy: null, recs: [], gch: [] }; }
function detT6(c) {
  var F = S.foto6 || {}, desde = cuadraba6(), hoy = foto6Hoy().t, a = desde && F[desde] ? F[desde].t : null;
  var lug = [['vac', 'Vacías en bodega'], ['ll', 'Llenas en bodega'], ['cam', 'Llenas en camiones'], ['camV', 'Vacías en camiones'], ['cli', 'Las deben los clientes'], ['pv', 'Con proveedores']];
  var h = '<div class="lbl">' + (desde ? 'Cuadraban hasta el <b>' + esc(fCorta91(desde)) + '</b> (' + a.tot + ' taras).' : 'Todavía no hay una foto de un día en que cuadraran (la app empieza a guardarla desde hoy).') + ' Hoy por lugares hay <b>' + hoy.tot + '</b> y deberían ser <b>' + hoy.esp + '</b>.</div>';
  h += '<div style="margin-top:6px">' + lug.map(function (x) { var v = num(hoy[x[0]]), p = a ? num(a[x[0]]) : null, d = p == null ? 0 : v - p; return row6(x[1], (p == null ? '' : p + ' → ') + v + (d ? ' <span class="' + (d < 0 ? 'neg' : '') + '">(' + (d > 0 ? '+' : '') + d + ')</span>' : '')); }).join('') + '</div>';
  /* lo que movió taras desde ese día */
  var desdeF = desde || iso(new Date(TODAY.getTime() - 7 * 864e5)), ev = [];
  (S.cajasMov || []).forEach(function (m) { if (m && m.f && m.f > desdeF) ev.push({ f: m.f, x: esc(m.t) + ': ' + (num(m.n) > 0 ? '+' : '') + num(m.n) }); });
  (S.rutasHist || []).forEach(function (e) {
    if (!e || !e.f || e.f <= desdeF) return; var r = e.res || {}, rc = e.recep82 || {};
    var V = sum(e.log || [], function (l) { return num(l.V) - num(l.Vr); });
    ev.push({ f: e.f, x: chofN(+e.ch) + ': entregó ' + sum(e.log || [], function (l) { return num(l.R); }) + ', recogió ' + V + ' vacías' + (num(r.reg) > 0 ? ', debían regresar ' + num(r.reg) + ' llenas' : '') + (e.recep82 ? (num(rc.dV) ? ' · al recibir faltaron ' + Math.abs(num(rc.dV)) + ' vacías' : ' · recibido, cuadró') : (e.enviado ? ' · NO se ha recibido' : ' · sin cierre')) });
  });
  (typeof atrasLista93 === 'function' ? atrasLista93() : []).forEach(function (x) { ev.push({ f: x.f, x: '📥 ' + chofN(x.id) + ': su cierre del ' + fCorta91(x.f) + ' no se ha recibido' + (x.cj ? ' (' + x.cj + ' cajas en el camión)' : '') }); });
  ev.sort(function (p, q) { return p.f < q.f ? -1 : 1; });
  h += '<div style="font-weight:800;margin-top:8px">Lo que movió taras' + (desde ? ' desde el ' + esc(fCorta91(desde)) : ' esta semana') + '</div>' + (ev.length ? ev.map(function (e) { return '<div style="font-size:14px;padding:3px 0;border-bottom:1px solid var(--line)"><span class="lbl">' + esc(fCorta91(e.f)) + '</span> · ' + e.x + '</div>'; }).join('') : '<div class="lbl">Nada registrado.</div>');
  h += pistas6(pistasT6(c, a, hoy));
  return h;
}
function pistasT6(c, a, hoy) {
  var P = [];
  try {
    if ((typeof atrasLista93 === 'function' ? atrasLista93() : []).length) P.push('Hay cierres atrasados sin recibir: recíbelos (Rutas) y cuenta las cajas que traen.');
    if ((typeof huerf6 === 'function' ? huerf6() : []).length) P.push('Hay rutas que nadie recibió (Rutas → "Recibir lo que traía").');
    if (a) {
      if (hoy.vac < a.vac && hoy.cli <= a.cli) P.push('Bajaron las vacías en bodega (' + a.vac + ' → ' + hoy.vac + ') y los clientes no deben más: revisa las vacías que regresaron los choferes y el último conteo.');
      if (hoy.cli < a.cli) P.push('Los clientes deben menos taras (' + a.cli + ' → ' + hoy.cli + '): si nadie las regresó a la bodega, revisa si se cambió a mano lo que debe algún cliente.');
      if (hoy.camV > a.camV) P.push('Hay más vacías en camiones (' + a.camV + ' → ' + hoy.camV + '): falta recibir o cerrar alguna ruta.');
    }
    if ((S.cajasMov || []).some(function (m) { return m && /Faltaron vacías al regresar/.test(m.t) && m.f >= iso(new Date(TODAY.getTime() - 7 * 864e5)); })) P.push('Esta semana faltaron vacías al recibir una ruta: pregúntale al chofer.');
  } catch (e) {}
  if (!P.length) P.push('Cuenta las vacías de la bodega (Bodega → Taras → Conteo) y revisa lo que deben los clientes en sus fichas.');
  return P;
}
function pistas6(P) { return '<div class="card note" style="padding:8px 12px;margin-top:8px"><b>Pistas</b>' + P.map(function (t) { return '<div style="font-size:14px;margin-top:4px">• ' + esc(t) + '</div>'; }).join('') + '</div>'; }
function detE6(c) {
  var x = c.x, h = row6('Debía haber', money(num(x.esp))) + row6('Se contó', money(num(x.cnt))) + row6('Diferencia', (num(x.dif) > 0 ? '+' : '−') + money(Math.abs(num(x.dif))), num(x.dif) < 0 ? 'neg' : '') + (x.q ? row6('Lo contó', esc(x.q)) : '');
  var dia = x.ayer || x.f, H = (S.rutasHist || []).filter(function (e) { return e && e.f === dia && e.cierreReg82; });
  if (H.length) h += '<div style="font-weight:800;margin-top:8px">Cierres de choferes que recibiste ese día</div>' + H.map(function (e) { var esp = num(e.res && e.res.efectivo), rec = num(e.cierreReg82.rec), d = r2(rec - esp); return row6(esc(chofN(+e.ch)), money(rec) + ' de ' + money(esp) + (Math.abs(d) >= 0.5 ? ' <span class="neg">(' + (d < 0 ? '−' : '+') + money(Math.abs(d)) + ')</span>' : ' ✓')); }).join('');
  var P = [];
  if (H.some(function (e) { return Math.abs(num(e.cierreReg82.rec) - num(e.res && e.res.efectivo)) >= 0.5; })) P.push('Un chofer entregó distinto a lo de su cierre ese día (arriba).');
  if ((typeof atrasLista93 === 'function' ? atrasLista93() : []).length) P.push('Hay cierres atrasados sin recibir: ese efectivo todavía no entra a la caja.');
  P.push('Revisa los gastos y pagos de ese día (Más → Gastos) y que todo lo que salió de la caja esté anotado.');
  return h + pistas6(P);
}
function detF6(c) {
  var x = c.x, h = row6('Chofer', esc(chofN(+x.ch))) + row6('Día', esc(fCorta91(x.fecha))) + row6('Faltó', money(num(x.m)), 'neg') + (x.txt || x.mot ? row6('Qué', esc(x.txt || x.mot)) : '') + (x.desc ? row6('Se le descuenta', x.pend ? 'pendiente' : 'ya descontado') : '');
  var H = histDe6(x.ch, x.fecha); if (!H.length) H = histDe6(x.ch, iso(new Date(new Date(x.fecha + 'T12:00').getTime() - 864e5)));
  if (H.length) h += '<div style="font-weight:800;margin-top:8px">Su ruta</div>' + detHTML6(rutaDet6(packHist6(H[0])));
  return h + pistas6(['Pregúntale si pagó algo en efectivo que no anotó (gasolina, comida, casetas).', 'Revisa las entregas a crédito y los abonos de su ruta (arriba).']);
}
function detK6(c) {
  var x = c.x, h = row6('Qué faltó', (num(x.R) ? num(x.R) + ' cajas llenas ' : '') + (num(x.M) ? r2(num(x.M)) + ' kg' : '')) + row6('Vale', money(num(x.valor))) + row6('Día', esc(fCorta91(x.fecha)));
  var ch = (S.choferes || []).filter(function (p) { return p && p.n === x.txt; })[0];
  if (ch) { var H = histDe6(ch.id, x.fecha); if (!H.length) H = histDe6(ch.id, iso(new Date(new Date(x.fecha + 'T12:00').getTime() - 864e5))); if (H.length) h += '<div style="font-weight:800;margin-top:8px">Su ruta</div>' + detHTML6(rutaDet6(packHist6(H[0]))); }
  return h + pistas6(x.tipo === 'Faltante al regresar' ? ['Revisa con el chofer si dejó fruta a un cliente sin anotarla, o si regaló/cambió fruta.', 'Compara lo que salió contra lo vendido (arriba).'] : ['Revisa la fruta tirada y los cambios a clientes de esos días.', 'Vuelve a contar la bodega.']);
}
function detA6(c) {
  if (c.tipo === 'A') { var e = (S.atras93 || {})[c.x.k]; return (e && e.pack ? detHTML6(rutaDet6(e.pack)) : '') + '<button class="btn" style="width:100%;margin-top:8px" data-act="atr93" data-k="' + esc(c.x.k) + '">Recibirlo ahora</button>'; }
  return detHTML6(rutaDet6(huerfPack6(c.x))) + '<button class="btn" style="width:100%;margin-top:8px" data-act="huerf6" data-k="' + esc(c.x.k) + '">Recibir lo que traía</button>';
}
function detCaso6(c) {
  if (c.hist) return '<div class="lbl">' + (c.tipo === 'T' ? 'Las taras ya no tienen este descuadre.' : 'Este caso ya no está pendiente.') + '</div>';
  try { return ({ T: detT6, E: detE6, F: detF6, K: detK6, A: detA6, H: detA6 })[c.tipo](c); } catch (e) { return '<div class="lbl">No se pudo armar el detalle.</div>'; }
}

/* ---------- 3) la pantalla ---------- */
function desc6() {
  foto6Toma(true);
  var L = casos6(), ver = S.desc6v === 'res' ? 'res' : 'ab', V = L.filter(function (c) { return ver === 'res' ? c.est === 'res' : c.est !== 'res'; });
  var nAb = L.filter(function (c) { return c.est !== 'res'; }).length;
  var h = '<h1>🔎 Descuadres</h1><div class="lbl" style="margin-bottom:8px">Aquí se junta todo lo que no cuadra: taras, efectivo, kilos y lo que falta recibir. Cada caso dice qué pasó, desde cuándo y dónde buscar.</div>';
  h += '<div class="tabs92" role="group" aria-label="Casos"><button data-act="desc6v" data-v="ab" aria-pressed="' + (ver === 'ab') + '">Por resolver<small>' + nAb + '</small></button><button data-act="desc6v" data-v="res" aria-pressed="' + (ver === 'res') + '">Resueltos<small>' + (L.length - nAb) + '</small></button></div>';
  if (!V.length) h += '<div class="card good" style="padding:14px"><b>' + (ver === 'ab' ? '✓ Todo cuadra: taras, efectivo y kilos' : 'Todavía no hay casos resueltos') + '</b></div>';
  var orden = ['A', 'H', 'T', 'E', 'F', 'K'], grupos = {};
  V.forEach(function (c) { var g = TIPO6[c.tipo]; (grupos[g] = grupos[g] || []).push(c); });
  Object.keys(grupos).sort(function (a, b) { return orden.indexOf(grupos[a][0].tipo) - orden.indexOf(grupos[b][0].tipo); }).forEach(function (g) {
    h += '<h2 style="font-size:18px;margin:14px 2px 6px;display:flex;align-items:center;gap:6px;white-space:nowrap">' + g + '</h2>';
    h += grupos[g].map(function (c) {
      var E = EST6[c.est] || EST6.ab, ab = S.desc6o === c.k, s = c.s || {}, notas = s.notas || [];
      var x = '<div class="card' + (c.est === 'ab' ? ' alert' : '') + '" data-x="caso6" data-k="' + esc(c.k) + '" style="padding:12px 14px">'
        + '<button data-act="desc6o" data-k="' + esc(c.k) + '" style="all:unset;display:flex;gap:8px;align-items:center;width:100%;cursor:pointer"><b style="flex:1;font-size:16px">' + esc(c.tit) + '</b><span style="background:' + E[1] + ';color:' + E[2] + ';border-radius:999px;padding:2px 10px;font-size:13px;font-weight:800">' + E[0] + '</span><span>' + (ab ? '▾' : '›') + '</span></button>';
      if (ab) {
        x += '<div style="margin-top:8px">' + detCaso6(c) + '</div>';
        if (notas.length) x += '<div style="font-weight:800;margin-top:8px">Notas</div>' + notas.map(function (n) { return '<div style="font-size:14px;padding:3px 0"><span class="lbl">' + esc(n.t || '') + ' · ' + esc(n.q || '') + '</span><br>' + esc(n.x || '') + '</div>'; }).join('');
        if (s.res) x += '<div class="lbl" style="margin-top:6px">Resuelto: ' + esc(s.res.como || '') + ' · ' + esc(s.res.q || '') + ' · ' + esc(s.res.t || '') + '</div>';
        if (!/^[AH]$/.test(c.tipo)) {
          x += '<div class="field" style="margin-top:8px"><label for="nota6">Anotar qué se sabe</label><textarea id="nota6" data-bind="desc6n" rows="2" placeholder="Ej. Danu dice que las dejó con Don Beto">' + esc(S.desc6n || '') + '</textarea></div>'
            + '<div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:6px"><button class="btn sec" style="flex:1;min-height:48px" data-act="desc6nota" data-k="' + esc(c.k) + '">Anotar</button>'
            + (c.est === 'res' ? '<button class="btn sec" style="flex:1;min-height:48px" data-act="desc6re" data-k="' + esc(c.k) + '">Reabrir' + (s.aj ? ' y deshacer el ajuste' : '') + '</button>'
              : (c.est !== 'rev' ? '<button class="btn sec" style="flex:1;min-height:48px" data-act="desc6rev" data-k="' + esc(c.k) + '">Lo estoy revisando</button>' : '')
              + (c.vivo && !c.ya ? '' : '<button class="btn" style="flex:1;min-height:48px" data-act="desc6ok" data-k="' + esc(c.k) + '">Ya apareció ✓</button>')
              + (c.tipo === 'T' && c.dif ? '<button class="btn" style="flex:1;min-height:48px" data-act="desc6aj" data-k="' + esc(c.k) + '" data-n="' + c.dif + '">Ajustar ' + (c.dif > 0 ? '+' : '') + c.dif + ' taras</button>' : ''))
            + '</div>';
          if (c.tipo === 'T' && c.dif && c.est !== 'res') x += '<div class="lbl" style="margin-top:4px">"Ajustar" anota un movimiento de taras con tu nota como motivo (necesita nota). Se puede deshacer.</div>';
          if (c.tipo === 'E' || c.tipo === 'F' || c.tipo === 'K') x += '<div class="lbl" style="margin-top:4px">El dinero y los kilos no se ajustan aquí: si el chofer paga, regístralo donde siempre; aquí queda la nota y el seguimiento.</div>';
        }
      }
      return x + '</div>';
    }).join('');
  });
  return h;
}
function caso6Tit(k) { try { var c = casos6().filter(function (x) { return x.k === k; })[0]; return c ? c.tit : ''; } catch (e) { return ''; } }
function caso6Set(k, f) { S.casos6 = S.casos6 && typeof S.casos6 === 'object' && !Array.isArray(S.casos6) ? S.casos6 : {}; var o = S.casos6[k] || { est: 'ab', notas: [] }; o = JSON.parse(JSON.stringify(o)); if (!o.tit) { var t = caso6Tit(k); if (t) o.tit = t; } f(o); S.casos6[k] = o; }
function ahora6() { return fmtF(iso(TODAY)) + ' ' + hhmm(); }
document.addEventListener('click', function (e) {
  var b = e.target.closest && e.target.closest('[data-act^="desc6"]'); if (!b) return;
  var a = b.dataset.act, k = b.dataset.k;
  if (['desc6', 'desc6v', 'desc6o', 'desc6nota', 'desc6rev', 'desc6ok', 'desc6aj', 'desc6re'].indexOf(a) < 0) return;
  e.preventDefault(); e.stopImmediatePropagation();
  if (a === 'desc6') { S.tab.admin = 'desc6'; S.desc6o = null; render(); window.scrollTo(0, 0); return; }
  if (a === 'desc6v') { S.desc6v = b.dataset.v; S.desc6o = null; render(); return; }
  if (a === 'desc6o') { S.desc6o = S.desc6o === k ? null : k; S.desc6n = ''; render(); return; }
  var nota = String(S.desc6n || '').trim();
  if (a === 'desc6nota') { if (!nota) { toast('Escribe qué se sabe'); return; } caso6Set(k, function (o) { o.notas = (o.notas || []).concat([{ t: ahora6(), q: quien(), x: nota }]); if (o.est === 'ab') o.est = 'rev'; }); S.desc6n = ''; toast('Nota anotada'); render(); return; }
  if (a === 'desc6rev') { caso6Set(k, function (o) { o.est = 'rev'; }); render(); return; }
  if (a === 'desc6ok') { caso6Set(k, function (o) { o.est = 'res'; o.res = { como: 'Ya apareció' + (nota ? ': ' + nota : ''), q: quien(), t: ahora6() }; if (nota) o.notas = (o.notas || []).concat([{ t: ahora6(), q: quien(), x: nota }]); }); S.desc6n = ''; S.desc6o = null; toast('Caso resuelto'); render(); return; }
  if (a === 'desc6aj') {
    if (!nota) { toast('Escribe el motivo del ajuste en la nota'); return; }
    var n = Math.round(num(b.dataset.n)), d = tarasDif86(); if (!n || n !== d) { toast('El descuadre cambió; revisa otra vez'); render(); return; }
    S.cajasMov = S.cajasMov || []; S.cajasMov.push({ t: 'Ajuste por descuadre: ' + nota, f: iso(TODAY), n: n, caso6: k });
    S.hist.push({ t: ahora6(), q: quien(), x: 'Ajustó ' + (n > 0 ? '+' : '') + n + ' taras (descuadre): ' + nota });
    caso6Set(k, function (o) { o.est = 'res'; o.aj = n; o.res = { como: 'Ajuste de ' + (n > 0 ? '+' : '') + n + ' taras: ' + nota, q: quien(), t: ahora6() }; o.notas = (o.notas || []).concat([{ t: ahora6(), q: quien(), x: 'Ajuste: ' + nota }]); });
    S.desc6n = ''; S.desc6o = null; toast('Ajuste anotado'); render(); return;
  }
  if (a === 'desc6re') {
    caso6Set(k, function (o) {
      if (o.aj) { S.cajasMov = S.cajasMov || []; S.cajasMov.push({ t: 'Se deshizo el ajuste por descuadre', f: iso(TODAY), n: -o.aj, caso6: k }); S.hist.push({ t: ahora6(), q: quien(), x: 'Deshizo el ajuste de ' + (o.aj > 0 ? '+' : '') + o.aj + ' taras' }); o.aj = 0; }
      o.est = 'rev'; o.res = null; o.notas = (o.notas || []).concat([{ t: ahora6(), q: quien(), x: 'Se reabrió' + (nota ? ': ' + nota : '') }]);
    });
    S.desc6n = ''; render(); return;
  }
}, true);
document.addEventListener('input', function (e) { var t = e.target; if (t && t.dataset && t.dataset.bind === 'desc6n') S.desc6n = t.value; }, true);

/* ---------- entradas: Más, Inicio y el aviso de taras ---------- */
var _mas6 = mas166HTML;
mas166HTML = function () {
  var h = _mas6.apply(this, arguments);
  try {
    var n = casosAb6().length, k = '<button class="card" data-act="act92"';
    var b = '<button class="card" data-act="desc6" style="width:100%;text-align:left;color:inherit;margin-top:12px;display:flex;align-items:center;gap:10px"><span style="font-size:22px">🔎</span><span style="flex:1"><b>Descuadres</b><br><span class="lbl">' + (n ? n + ' por resolver: taras, efectivo, kilos' : 'Todo cuadra: taras, efectivo y kilos') + '</span></span><span>›</span></button>';
    return h.indexOf(k) > -1 ? h.replace(k, b + k) : h;
  } catch (e) { return h; }
};
function desc6Inicio() {
  if (S.role !== 'admin' || S.encOn) return;
  var m = document.querySelector('main'); if (!m) return;
  if (S.tab.admin === 'bodega') { var t = m.querySelector('[data-x="tar86"]'); if (t && !t.querySelector('[data-act="desc6"]')) t.insertAdjacentHTML('beforeend', '<button class="btn sec" style="margin-top:8px;min-height:50px;width:100%" data-act="desc6">🔎 ¿A dónde se fueron?</button>'); }
  if (S.tab.admin !== 'inicio' || m.querySelector('[data-x="desc6i"]')) return;
  var L = casosAb6(); if (!L.length) return;
  var d = document.createElement('div'); d.dataset.x = 'desc6i';
  d.innerHTML = '<button class="card alert" data-act="desc6" style="width:100%;text-align:left;color:inherit;display:flex;align-items:center;gap:10px;padding:12px 14px"><span style="font-size:24px">🔎</span><span style="flex:1"><b>' + L.length + ' descuadre' + (L.length === 1 ? '' : 's') + ' por resolver</b><br><span class="lbl">' + esc(L.slice(0, 2).map(function (c) { return c.tit; }).join(' · ')) + (L.length > 2 ? '…' : '') + '</span></span><span>›</span></button>';
  m.appendChild(d);
}
var _rd6d = render;
render = function () {
  try { if (typeof VIEWS !== 'undefined' && !VIEWS.desc6) VIEWS.desc6 = desc6; } catch (e) {}
  try { foto6Toma(false); } catch (e) {}
  var r = _rd6d.apply(this, arguments);
  try { desc6Inicio(); } catch (e) { console.error('desc6', e); }
  return r;
};
