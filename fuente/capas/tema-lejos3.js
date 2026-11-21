/* ===================== TEMA · Cliente que queda lejos de su ruta: sugerir pasarlo a otra (21 nov · punto 3 de la nueva numeración) =====================
   Ricardo: que la app marque al cliente que queda lejos de los demás de su ruta. Escogió (opción múltiple): "Sugerir y yo decido".
   Cómo se calcula (con la ubicación de cada cliente; el que no tiene ubicación no se toma en cuenta):
     · "Qué tan lejos queda de su ruta" = la distancia al cliente más cercano de esa misma ruta (del mismo día).
     · "Con otro chofer" = la distancia al cliente más cercano de la ruta de ese otro chofer ese día.
     · Se sugiere si queda a 3 km o más de su ruta, con el otro quedaría a la mitad o menos y se ahorran al menos 2 km.
   Dónde sale: en "Armar rutas" (Hoy / Mañana) una tarjeta "📍 Quedan lejos de su ruta" con, por cliente:
     "Pasarlo con Beto · solo hoy/mañana", "Siempre con Beto" o "No, dejarlo" (no vuelve a sugerirlo para ese mismo cambio).
     Y en "Hoy" de Inicio un aviso que abre "Armar rutas". Pasarlo usa lo mismo que el botón "Pasar a otro chofer" (avisos e historial igual).
   No mueve a nadie solo; el administrador decide. Se arma al final.
   ============================================================================================ */
var LEJ3 = { min: 3, ahorro: 2 };
try { if (NB_SH.indexOf('lejos3No') < 0) NB_SH.push('lejos3No'); } catch (e) {}
function lejos3(f) {
  var out = [];
  try {
    var No = S.lejos3No || {}, CH = chs81(), R = {};
    CH.forEach(function (ch) {
      var L = [];
      try { L = lista81(+ch.id, f).L || []; } catch (e) {}
      R[ch.id] = L.filter(function (x) { return !x.done; }).map(function (x) { var c = cl(x.c); return c && c.lat != null ? { x: x, c: c } : null; }).filter(Boolean);
    });
    var cerca = function (c, L) { var m = null; L.forEach(function (o) { if (o.c.id === c.id) return; var d = kmE(c, o.c); if (d != null && (m == null || d < m)) m = d; }); return m; };
    CH.forEach(function (ch) {
      var L = R[ch.id]; if (L.length < 3) return;
      L.forEach(function (o) {
        var d0 = cerca(o.c, L); if (d0 == null || d0 < LEJ3.min) return;
        var mejor = null;
        CH.forEach(function (b) { if (+b.id === +ch.id || !R[b.id].length) return; var d = cerca(o.c, R[b.id]); if (d != null && (!mejor || d < mejor.d)) mejor = { ch: +b.id, d: d }; });
        if (!mejor || mejor.d > d0 * 0.5 || d0 - mejor.d < LEJ3.ahorro) return;
        if (No[o.c.id + '|' + ch.id + '|' + mejor.ch]) return;
        out.push({ c: o.c, de: +ch.id, a: mejor.ch, d0: d0, d1: mejor.d });
      });
    });
  } catch (e) {}
  return out.sort(function (a, b) { return (b.d0 - b.d1) - (a.d0 - a.d1); });
}
function lejos3Km(k) { return k < 10 ? (Math.round(k * 10) / 10) : Math.round(k); }
function lejos3HTML(f, hoy) {
  var L = lejos3(f); if (!L.length) return '';
  var cuando = hoy ? 'solo hoy' : 'solo mañana';
  return '<div class="card" data-x="lejos3" style="padding:12px 14px;border-left:5px solid #b45309"><b>📍 Quedan lejos de su ruta</b><div class="lbl">Tú decides; si lo pasas, se le avisa a los dos choferes.</div>'
    + L.slice(0, 4).map(function (x) {
      var k = x.c.id + '|' + x.de + '|' + x.a;
      return '<div style="border-top:1px solid var(--line);margin-top:10px;padding-top:10px"><div style="font-weight:800">' + esc(x.c.n) + '</div>'
        + '<div style="font-size:15px">Queda a ' + lejos3Km(x.d0) + ' km del resto de la ruta de ' + esc(chofN(x.de)) + '; con ' + esc(chofN(x.a)) + ' quedaría a ' + lejos3Km(x.d1) + ' km.</div>'
        + '<div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:8px"><button class="btn" style="flex:1 1 140px;min-height:48px" data-act="lejos3si" data-k="' + k + '" data-m="dia">Pasarlo con ' + esc(chofN(x.a)) + ' · ' + cuando + '</button>'
        + '<button class="btn sec" style="flex:1 1 110px;min-height:48px" data-act="lejos3si" data-k="' + k + '" data-m="siempre">Siempre con ' + esc(chofN(x.a)) + '</button>'
        + '<button class="btn sec" style="flex:1 1 90px;min-height:48px" data-act="lejos3no" data-k="' + k + '">No, dejarlo</button></div></div>';
    }).join('')
    + (L.length > 4 ? '<div class="lbl" style="margin-top:8px">Y ' + (L.length - 4) + ' más: aparecen al decidir estos.</div>' : '') + '</div>';
}
var _rt3 = rt81HTML;
rt81HTML = function () {
  var h = _rt3.apply(this, arguments);
  try {
    var R = S.rt81; if (!h || !R || R.pick) return h;
    var hoy = R.dia === 'hoy', x = lejos3HTML(hoy ? hoy81() : man81(), hoy); if (!x) return h;
    var m = '<div class="bd84">', i = h.indexOf(m);
    if (i < 0) { i = h.indexOf('</div>', h.indexOf('data-act="rt81d"')); if (i < 0) return h; i += 6; } else i += m.length;
    return h.slice(0, i) + x + h.slice(i);
  } catch (e) { return h; }
};
document.addEventListener('click', function (e) {
  var b = e.target.closest && e.target.closest('[data-act="lejos3si"],[data-act="lejos3no"]'); if (!b) return;
  e.preventDefault(); e.stopImmediatePropagation();
  var R = S.rt81; if (!R) return;
  var p = b.dataset.k.split('|'), cid = +p[0], de = +p[1], a = +p[2], c = cl(cid); if (!c) return;
  if (b.dataset.act === 'lejos3no') {
    S.lejos3No = S.lejos3No || {}; S.lejos3No[b.dataset.k] = Date.now();
    try { S.hist.push({ t: fmtF(hoy81()) + ' ' + hhmm(), q: quien(), x: 'Rutas: ' + c.n + ' se queda con ' + chofN(de) + ' (no se pasó con ' + chofN(a) + ')' }); } catch (er) {}
    toast('Listo: ' + c.n + ' se queda con ' + chofN(de)); render(); return;
  }
  R.sel = {}; R.sel[cid + '|' + de] = 1; R.pick = null;
  aplica81(a, b.dataset.m === 'siempre' ? 'siempre' : 'dia'); render();
}, true);
/* aviso en "Hoy" de Inicio */
var _hT3 = hoyTareas;
hoyTareas = function () {
  var L = _hT3.apply(this, arguments);
  try {
    if (S.role === 'admin' && !S.encOn) {
      var a = lejos3(hoy81()).length, m = a ? 0 : lejos3(man81()).length;
      if (a || m) L.push({ k: 'lejos3' + (a ? 'h' : 'm') + (a || m), t: '📍 ' + (a || m) + ((a || m) === 1 ? ' cliente queda' : ' clientes quedan') + ' lejos de su ruta ' + (a ? 'de hoy' : 'de mañana') + ': ¿pasarlo' + ((a || m) === 1 ? '' : 's') + ' a otra?', go: 'lejos3:' + (a ? 'hoy' : 'man'), ok: false });
    }
  } catch (e) {}
  return L;
};
window.addEventListener('click', function (e) {
  var b = e.target.closest && e.target.closest('[data-act="popgo"][data-t^="lejos3:"]'); if (!b) return;
  e.preventDefault(); e.stopImmediatePropagation();
  S.tab.admin = 'rutas'; S.rt81 = { dia: b.dataset.t.split(':')[1] === 'man' ? 'man' : 'hoy', sel: {} }; render();
}, true);
