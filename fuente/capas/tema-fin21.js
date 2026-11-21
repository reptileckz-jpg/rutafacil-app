/* ===================== TEMA · Terminó su ruta: regresa a la bodega + aviso al admin cuando llega (21 nov · puntos 21 y 22 de la nueva numeración) =====================
   Ricardo: "al terminar la última entrega, en automático mándale la ubicación para regresar a la bodega". Escogió (opción múltiple): tarjeta + que se
   abra Google Maps solo UNA vez; y "avísame en Inicio cuando el chofer llega a la bodega".
   21 · En el celular del chofer, cuando ya entregó a todos (salió, tiene entregas, no le quedan paradas y no ha mandado su cierre):
        - Arriba de su Ruta: "🏁 Terminaste tu ruta: regresa a la bodega" con "📍 Cómo llegar a la bodega" (o "✓ Ya estás en la bodega" a ≤ 300 m)
          y "Ya llegué: hacer mi cierre".
        - Google Maps se abre solo UNA vez, cuando toca "Seguir con la ruta" después de su última nota (así primero manda la nota al cliente).
        Si el administrador le pidió regresar (20), sale esa tarjeta en su lugar.
   22 · En el celular del administrador, en "Hoy" de Inicio: "🏭 Danu ya llegó a la bodega · trae $…, N cajas" cuando su última ubicación
        (de hace ≤ 15 min) está a ≤ 300 m de la bodega y terminó su ruta (o le pidieron regresar) sin mandar su cierre. "Ir ›" lleva a Rutas.
   Solo avisa y abre el mapa; no cambia ninguna cuenta. Se arma al final.
   ============================================================================================ */
function fin21Bod() { try { var B = typeof bodLugar110 === 'function' ? bodLugar110() : null; return B && B.lat != null ? B : null; } catch (e) { return null; } }
function fin21Url() { var B = fin21Bod(); return B ? 'https://www.google.com/maps/dir/?api=1&destination=' + B.lat + ',' + B.lng : ''; }
function fin21Termino(o) {
  try {
    o = o || S; var c = o.cierre || {};
    if (!(o.salida && o.salida.ok) || c.sent || !(o.log || []).length) return false;
    return !(o.stops || []).some(function (s) { return s && !s.done; });
  } catch (e) { return false; }
}
function fin21Mio() { return S.role === 'rep' && S.chofHoy != null && !S.arOn && fin21Termino(S) && !(typeof reg20Activo === 'function' && reg20Activo()); }
function fin21Card() {
  if (!fin21Mio() || S.tab.rep !== 'ruta') return;
  var m = document.querySelector('main'); if (!m || m.querySelector('[data-x="fin21"]')) return;
  var u = fin21Url(), cerca = typeof reg20Cerca === 'function' && reg20Cerca(), d = document.createElement('div');
  d.className = 'card'; d.dataset.x = 'fin21';
  d.setAttribute('style', 'padding:14px;border:3px solid #166534;background:color-mix(in srgb,#166534 8%,var(--surface))');
  d.innerHTML = '<div class="lbl" style="font-weight:800;color:#166534">YA ENTREGASTE A TODOS</div><div style="font-size:21px;font-weight:900;margin-top:2px">🏁 Terminaste tu ruta: regresa a la bodega</div>'
    + (cerca ? '<div style="font-size:16px;margin-top:6px;font-weight:800">✓ Ya estás en la bodega</div>' : (u ? '<a class="btn sec" style="margin-top:10px;min-height:54px;display:flex;align-items:center;justify-content:center;text-decoration:none" href="' + u + '" target="_blank" rel="noopener" data-x="fin21mapa">📍 Cómo llegar a la bodega</a>' : ''))
    + '<button class="btn" style="margin-top:8px;min-height:58px;font-size:18px;width:100%" data-act="fin21ci">' + (cerca ? 'Hacer mi cierre' : 'Ya llegué: hacer mi cierre') + '</button>';
  var h = m.querySelector('.hola89, .hello'); if (h) h.after(d); else m.prepend(d);
}
document.addEventListener('click', function (e) {
  var b = e.target.closest && e.target.closest('[data-act="fin21ci"]'); if (!b) return;
  e.preventDefault(); e.stopImmediatePropagation(); S.tab.rep = 'cierre'; S.cierreP = 0; render(); window.scrollTo(0, 0);
}, true);
/* Google Maps una sola vez: al tocar "Seguir con la ruta" después de la última nota */
function fin21Llave() { return (S.chofHoy || '') + '|' + (S.rutaDia80 || iso(TODAY)) + '|' + ((S.cierresPrev || []).length) + '|' + ((S.log || []).length); }
function fin21Abre(u) {
  try { if (typeof window.__fin21Abre === 'function') return window.__fin21Abre(u); } catch (e) {}
  try { var w = window.open(u, '_system'); if (!w) window.open(u, '_blank'); } catch (e) { try { location.href = u; } catch (er) {} }
}
window.addEventListener('click', function (e) {
  var b = e.target.closest && e.target.closest('[data-act="notaseguir"]'); if (!b || S.role !== 'rep') return;
  var antes = S.tab.rep;
  /* después de que "Seguir con la ruta" haga lo suyo (si falta mandar el ticket, no se mueve y no se abre nada):
     si ya entregó a todos, se abre el mapa (una vez por ruta y vuelta) */
  setTimeout(function () {
    try {
      if (S.tab.rep !== 'ruta' || antes === 'ruta') return;
      if (!fin21Termino(S) || (typeof reg20Activo === 'function' && reg20Activo())) return;
      var u = fin21Url(); if (!u) return;
      var k = fin21Llave(); if (S.fin21 === k) return;
      if (typeof reg20Cerca === 'function' && reg20Cerca()) return;
      S.fin21 = k; fin21Abre(u); try { toast('Te abrí el camino de regreso a la bodega'); } catch (er) {}
    } catch (er) {}
  }, 0);
}, true);
/* 22 · el administrador: "ya llegó a la bodega" */
function fin22Lista() {
  var L = [];
  try {
    if (S.role !== 'admin' || typeof GPS === 'undefined' || !GPS.devs) return L;
    var B = fin21Bod(); if (!B) return L;
    var ahora = Date.now(), visto = {};
    Object.keys(GPS.devs).forEach(function (dev) {
      var d = GPS.devs[dev], ch = d && d.ch; if (ch == null || visto[ch]) return;
      var u = gpsUlt(d); if (u.lat == null || !(ahora - num(u.t) <= 15 * 60000)) return;
      var km = kmE({ lat: +u.lat, lng: +u.lng }, B); if (km == null || km > 0.3) return;
      var o = typeof rutaObj81 === 'function' ? rutaObj81(+ch) : null; if (!o) return;
      var pidio = o.reg20 && o.reg20.f === iso(TODAY) && !(o.cierre && o.cierre.sent);
      if (!fin21Termino(o) && !pidio) return;
      visto[ch] = 1;
      var det = null; try { det = rutaDet6(o); } catch (e) {}
      L.push({ ch: +ch, h: hmDe(u.t), det: det });
    });
  } catch (e) {}
  return L;
}
var _hT22 = hoyTareas;
hoyTareas = function () {
  var L = _hT22.apply(this, arguments);
  try {
    if (S.role === 'admin' && !S.encOn) fin22Lista().forEach(function (x) {
      var d = x.det, cj = d ? Math.max(d.reg, d.camR) : 0;
      L.unshift({ k: 'fin22' + x.ch, t: '🏭 ' + chofN(x.ch) + ' ya llegó a la bodega (' + x.h + ')' + (d ? ' · trae ' + money(d.efectivo) + (cj ? ', ' + cj + ' cajas' : '') : '') + ': recibe su cierre en cuanto lo mande', go: 'rutas', ok: false });
    });
  } catch (e) {}
  return L;
};
var _rd21 = render;
render = function () { var r = _rd21.apply(this, arguments); try { fin21Card(); } catch (e) { console.error('fin21', e); } return r; };
