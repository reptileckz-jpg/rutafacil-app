/* ===================== TEMA · Centro de pendientes: por secciones y uno por uno (23 nov · punto 30 de la nueva numeración) =====================
   Ricardo: "en Inicio, en 'Hoy', me salen los pendientes: clientes con poca fruta, pagos, lo que debo a proveedores, un viaje que nunca llegó,
   si le doy crédito… deberían gestionarse mejor; quizás un apartado donde se vea cada uno por secciones y, cuando estés en esa sección,
   atender uno por uno, al estilo de las tarjetas del inicio cuando abres la app por primera vez". Escogió (opción múltiple):
   "Centro de pendientes" con los botones "Resolver aquí mismo" (o "Ir" a donde se resuelve), "Recordarme mañana" y "Listo / ya lo vi".
   Ahora:
     - Inicio → "Hoy": lo urgente (hasta 5) y, si hay lugar, los más importantes hasta 3; y "🔔 Atender los N pendientes ›".
     - "Pendientes" (pantalla propia): cada sección con su número (Dinero y pagos, Clientes, Cargas y proveedores, Rutas, Personal, Vehículos,
       Bodega…) y un punto rojo si hay algo urgente. Al entrar a una sección: una tarjeta grande a la vez ("1 de 5"), con
       "Resolver ›" (te lleva justo a donde se resuelve), "Recordarme mañana" y "✓ Listo". Al terminar una, sigue la siguiente.
     - "Recordarme mañana" / "Listo" usan lo mismo de siempre (los avisos: avLater88 / quita88; las tareas de hoy: su palomita).
   No cambia ninguna cuenta: solo ordena y enseña los pendientes que ya existían. Se arma al final.
   ============================================================================================ */
var C30 = {
  sec: { dinero: '💵 Dinero y pagos', clientes: '🧑‍🤝‍🧑 Clientes', cargas: '🚚 Cargas y proveedores', rutas: '🗺️ Rutas y choferes', personal: '👷 Personal', vehiculos: '🛻 Vehículos', bodega: '📦 Bodega y fruta', gastos: '🧾 Gastos', bienes: '🏷️ Bienes', estadisticas: '📊 Estadísticas', inicio: '📌 Generales' },
  ord: ['dinero', 'rutas', 'clientes', 'cargas', 'bodega', 'personal', 'vehiculos', 'gastos', 'bienes', 'estadisticas', 'inicio']
};
try { if (NB_SH.indexOf('later30') < 0) NB_SH.push('later30'); } catch (e) {}
function c30Sec(t, txt) {
  t = String(t || 'inicio').split(':')[0];
  var M = { sz9: 'personal', lejos3: 'rutas', cu121: 'dinero', cuadre121: 'dinero', cuadre: 'dinero', cierreadm: 'dinero', caja: 'dinero', mas: 'inicio' };
  if (M[t]) t = M[t];
  if (/pagar|Falta pagar|le debes|Le debes|vence|mensualidad|sueldo|caja|efectivo|faltante/i.test(String(txt || '')) && (t === 'inicio' || t === 'gastos')) t = 'dinero';
  return C30.sec[t] ? t : 'inicio';
}
function c30Items() {
  var L = [], hoy = iso(TODAY), later = S.later30 || {}, ok = S.ok30 || {};
  var vale = function (id) { return !(later[id] && later[id] > hoy) && ok[id] !== hoy; };
  try {
    pendTodos92().forEach(function (o) {
      var tx = limpio92(o.x), I = { tit: tx }; try { I = avInfo68(o.x) || I; } catch (e) {}
      L.push({ id: 'av:' + o.x, sec: c30Sec(o.t, tx), u: !!o.u, t: I.tit || tx, d: I.tit && I.tit !== tx ? tx : '', av: o.x });
    });
  } catch (e) {}
  try {
    (hoyTareas() || []).forEach(function (x) {
      if (!x || x.ok || x.k === 'ef') return; var id = 'ht:' + x.k; if (!vale(id)) return;
      L.push({ id: id, sec: x.k === 'cb' ? 'clientes' : c30Sec(x.go, x.t), u: /^(🏭|🚨|⚠️)/.test(String(x.t)), t: String(x.t), tarea: x });
    });
  } catch (e) {}
  try {
    hoyItems92().forEach(function (x, i) {
      if (!x || x[1] || /^Fijar el precio/.test(x[0])) return; var id = 'hi:' + x[0]; if (!vale(id)) return;
      L.push({ id: id, sec: 'inicio', u: false, t: String(x[0]), item: i });
    });
  } catch (e) {}
  try {
    var cr = S.cli.filter(function (c) { return c.limRev && !c.oculto; }).length + (chBuroHTML() ? 1 : 0) + (typeof mayRevHTML === 'function' && mayRevHTML() ? 1 : 0);
    if (cr && vale('cr:dec')) L.push({ id: 'cr:dec', sec: 'clientes', u: false, t: 'Créditos por decidir (' + cr + ')', cred: 1 });
  } catch (e) {}
  var vis = {};
  return L.filter(function (o) { var k = o.t.toLowerCase().replace(/\s*[·(].*$/, '').trim(); if (vis[k]) return false; vis[k] = 1; return true; });
}
function c30Grupos() {
  var G = {}; c30Items().forEach(function (o) { (G[o.sec] = G[o.sec] || []).push(o); });
  Object.keys(G).forEach(function (k) { G[k].sort(function (a, b) { return (b.u ? 1 : 0) - (a.u ? 1 : 0); }); });
  return G;
}
/* ---------- Inicio → "Hoy" ---------- */
var _hc30 = hoyCard92;
hoyCard92 = function () {
  try {
    if (S.role !== 'admin') return _hc30.apply(this, arguments);
    var L = c30Items().sort(function (a, b) { return (b.u ? 1 : 0) - (a.u ? 1 : 0); }), nu = L.filter(function (o) { return o.u; }).length, h = '';
    var pri = function (o) { return o.av && /^URGENTE:/i.test(o.av) ? 2 : (o.u ? 1 : 0); };
    var U = L.filter(function (o) { return o.u; }).sort(function (a, b) { return pri(b) - pri(a); }).slice(0, 5), Ln = L.filter(function (o) { return !o.u; }).slice(0, Math.max(0, 3 - U.length));
    U.concat(Ln).forEach(function (o) {
      if (o.av && typeof avRow === 'function') { h += avRow(o.av, o.u); return; }
      var ck = o.tarea ? '<button class="ck92" data-act="hoyok" data-k="' + esc(o.tarea.k) + '" aria-pressed="false" aria-label="Marcar como hecho"></button>' : '<span class="ck92"></span>';
      h += '<div class="it92">' + ck + '<span class="t">' + esc(o.t) + '<span class="lbl92">' + esc(C30.sec[o.sec]) + '</span></span><button class="go" ' + c30Attr(o) + ' style="background:none;border:0">Ir ›</button></div>';
    });
    if (L.length) h += '<button class="btn" style="width:100%;margin-top:10px;min-height:54px" data-act="c30abre">🔔 Atender ' + (L.length === 1 ? 'el pendiente' : 'los ' + L.length + ' pendientes') + ' ›</button>';
    var nA = 0; try { nA = actDe(null, iso(TODAY)).length + infos92().length; } catch (e) {}
    if (nA) h += '<button class="it92" data-act="act92" style="color:var(--muted)"><span style="font-size:16px">🕓</span><span class="t" style="font-size:14.5px">Lo que pasó hoy (' + nA + ')</span><span class="go" style="color:var(--muted)">Ver ›</span></button>';
    return '<div class="card hoy92" data-x="hoy92"><div class="row" style="margin-bottom:8px"><b style="font-size:19px">Hoy</b><span class="lbl">' + (L.length ? (nu ? nu + ' urgente' + (nu === 1 ? '' : 's') + ' · ' : '') + L.length + ' pendiente' + (L.length === 1 ? '' : 's') : 'al día') + '</span></div>' + (h || '<div class="lbl">✓ Nada pendiente por ahora.</div>') + '</div>';
  } catch (e) { return _hc30.apply(this, arguments); }
};
/* ---------- la pantalla ---------- */
function c30HTML() {
  var x = S.c30; if (!x || S.role !== 'admin') return '';
  if (x.tab == null) x.tab = S.tab.admin;
  if (x.tab !== S.tab.admin) { S.c30 = null; return ''; } /* "Resolver" te llevó a otra sección */
  var G = c30Grupos(), h = '';
  if (!x.sec || !G[x.sec]) {
    x.sec = null;
    var tot = 0; Object.keys(G).forEach(function (k) { tot += G[k].length; });
    h += '<div class="lbl" style="margin-bottom:8px">' + (tot ? 'Escoge una sección y atiéndelos uno por uno.' : '✓ No hay pendientes.') + '</div>';
    C30.ord.forEach(function (k) {
      var g = G[k]; if (!g) return; var u = g.filter(function (o) { return o.u; }).length;
      h += '<button class="card" data-act="c30sec" data-v="' + k + '" style="display:flex;align-items:center;gap:10px;width:100%;text-align:left;min-height:64px;padding:12px 14px;margin:0 0 8px;border:' + (u ? '2px solid #FCA5A5' : '1px solid var(--line)') + ';color:inherit;font:inherit">'
        + '<span style="flex:1;font-size:17px;font-weight:800">' + C30.sec[k] + '</span>' + (u ? '<span style="color:#B91C1C;font-weight:800">' + u + ' urgente' + (u === 1 ? '' : 's') + '</span>' : '')
        + '<span style="min-width:34px;height:34px;border-radius:17px;background:' + (u ? '#DC2626' : 'var(--accent)') + ';color:#fff;display:flex;align-items:center;justify-content:center;font-weight:800">' + g.length + '</span><span class="lbl" style="font-size:20px">›</span></button>';
    });
    return ovW70('c30ov', '🔔 Pendientes', h, 'c30x');
  }
  var g = G[x.sec], i = Math.min(x.i || 0, g.length - 1), o = g[i];
  h += '<button class="link" style="min-height:44px" data-act="c30sec" data-v="">← Secciones</button>'
    + '<div class="lbl"><b>' + C30.sec[x.sec] + ' · ' + (i + 1) + ' de ' + g.length + '</b></div><div class="wz-hd">' + g.map(function (_, j) { return '<i class="' + (j <= i ? 'on' : '') + '"></i>'; }).join('') + '</div>'
    + '<div class="card" style="padding:18px 16px;margin-top:8px;border:' + (o.u ? '2.5px solid #DC2626' : '1px solid var(--line)') + '"><div style="font-size:13px;font-weight:800;color:' + (o.u ? '#B91C1C' : 'var(--muted)') + '">' + (o.u ? '🔴 URGENTE' : '🟡 PENDIENTE') + '</div>'
    + '<div style="font-size:21px;font-weight:900;margin-top:4px;line-height:1.25">' + esc(o.t) + '</div>' + (o.d ? '<div style="font-size:15px;margin-top:6px">' + esc(o.d) + '</div>' : '')
    + '<button class="btn" style="width:100%;margin-top:14px;min-height:56px;font-size:18px" ' + c30Attr(o) + '>Resolver ›</button>'
    + '<div style="display:flex;gap:8px;margin-top:8px"><button class="btn sec" style="flex:1;min-height:50px" data-act="c30man" data-id="' + esc(o.id) + '">Recordarme mañana</button><button class="btn sec" style="flex:1;min-height:50px" data-act="c30ok" data-id="' + esc(o.id) + '">✓ Listo</button></div></div>'
    + '<div style="display:flex;gap:8px;margin-top:10px">' + (i > 0 ? '<button class="btn sec" style="flex:1" data-act="c30i" data-v="' + (i - 1) + '">← Anterior</button>' : '') + (i < g.length - 1 ? '<button class="btn sec" style="flex:1" data-act="c30i" data-v="' + (i + 1) + '">Siguiente →</button>' : '') + '</div>';
  return ovW70('c30ov', '🔔 Pendientes', h, 'c30x');
}
function c30Attr(o) {
  var d = o.av ? { act: 'avgo', k: encodeURIComponent(o.av) } : o.tarea ? (o.tarea.k === 'cb' ? (o.tarea.r155 ? { act: 'cob155' } : { act: 'cli92', v: 'cob' }) : { act: 'popgo', t: String(o.tarea.go || 'inicio') }) : o.item != null ? { act: 'hoyir', i: String(o.item) } : { act: 'cli92', v: 'cob' };
  return Object.keys(d).map(function (k) { return 'data-' + k + '="' + esc(d[k]) + '"'; }).join(' ');
}
/* abre el centro justo en ese pendiente (lo usan las pruebas y los avisos) */
function c30Ver(id) { var G = c30Grupos(); for (var k in G) { var i = G[k].map(function (o) { return o.id; }).indexOf(id); if (i > -1) { S.c30 = { sec: k, i: i }; render(); return true; } } return false; }
/* "Resolver": el botón de siempre hace lo suyo y la pantalla se cierra */
['pointerdown', 'click'].forEach(function (t) { window.addEventListener(t, function (e) {
  var b = e.target.closest && e.target.closest('#c30ov [data-act]'); if (!b || /^c30/.test(b.dataset.act)) return; S.c30 = null; }, true); });
document.addEventListener('click', function (e) {
  var b = e.target.closest && e.target.closest('#c30ov [data-act]'); if (!b || /^c30/.test(b.dataset.act)) return;
  S.c30 = null; var ov = document.getElementById('c30ov'); if (ov) ov.remove();
}, true);
function c30Busca(id) { return c30Items().filter(function (o) { return o.id === id; })[0] || null; }
function c30Clic(d) { var b = document.createElement('button'); Object.keys(d).forEach(function (k) { b.dataset[k] = d[k]; }); b.style.display = 'none'; document.body.appendChild(b); b.click(); b.remove(); }
document.addEventListener('click', function (e) {
  var b = e.target.closest && e.target.closest('[data-act^="c30"]'); if (!b || S.role !== 'admin') return;
  var a = b.dataset.act; e.preventDefault(); e.stopImmediatePropagation();
  if (a === 'c30abre') { S.c30 = { sec: null, i: 0 }; render(); return; }
  if (a === 'c30x') { S.c30 = null; render(); return; }
  if (a === 'c30sec') { S.c30 = { sec: b.dataset.v || null, i: 0, tab: S.tab.admin }; render(); return; }
  if (a === 'c30i') { if (S.c30) S.c30.i = +b.dataset.v; render(); return; }
  var o = c30Busca(b.dataset.id); if (!o) { render(); return; }
  var hoy = iso(TODAY), man = iso(new Date(TODAY.getTime() + 864e5));
  if (a === 'c30ir') {
    S.c30 = null; render();
    if (o.av) c30Clic({ act: 'avgo', k: encodeURIComponent(o.av) });
    else if (o.tarea) c30Clic(o.tarea.k === 'cb' ? { act: 'cli92', v: 'cob' } : { act: 'popgo', t: String(o.tarea.go || 'inicio') });
    else if (o.item != null) c30Clic({ act: 'hoyir', i: String(o.item) });
    else if (o.cred) c30Clic({ act: 'cli92', v: 'cob' });
    return;
  }
  if (a === 'c30man') {
    if (o.av) { S.avLater88 = S.avLater88 || {}; S.avLater88[o.av] = man; } else { S.later30 = S.later30 || {}; S.later30[o.id] = man; }
    toast('Te lo recuerdo mañana');
  } else if (a === 'c30ok') {
    if (o.av) { try { quita88(o.av, 'Visto'); } catch (er) {} }
    else if (o.tarea) { S.hoyOk = S.hoyOk || {}; S.hoyOk[hoy] = S.hoyOk[hoy] || {}; S.hoyOk[hoy][o.tarea.k] = true; S.ok30 = S.ok30 || {}; S.ok30[o.id] = hoy; }
    else { S.ok30 = S.ok30 || {}; S.ok30[o.id] = hoy; }
    toast('Listo');
  }
  /* sigue con la siguiente de la misma sección (la de ahora ya no está) */
  if (S.c30) { var G = c30Grupos(); if (!G[S.c30.sec]) S.c30.sec = null; else S.c30.i = Math.min(S.c30.i || 0, G[S.c30.sec].length - 1); }
  render();
}, true);
var _rd30 = render;
render = function () { var r = _rd30.apply(this, arguments); try { ovPon70('c30ov', c30HTML()); } catch (e) { console.error('c30', e); } return r; };
