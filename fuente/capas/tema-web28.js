/* ===================== TEMA · Versión web: mapas en grande y sin "este celular" (23 nov · punto 28 de la nueva numeración) =====================
   Ricardo (en la página web): "hay ajustes y cosas que hacen referencia al celular, cuando evidentemente ya no estamos ahí; el mapa de los
   repartidores se ve muy pequeño y no hay manera de hacerlo más grande".
   Ahora:
     - Cada mapa (repartidores, rutas, viajes…) trae "⤢ Ver en grande": lo abre a pantalla completa (con zoom de la rueda del mouse) y
       "✕ Cerrar" lo regresa. También en el celular (salvo el mapa nativo de Google del APK, que ya se abre en grande).
     - En pantalla ancha (computadora) los mapas salen más altos.
     - En la web con mouse, "este celular" dice "esta computadora" (Ajustes y avisos de este aparato).
   No cambia ninguna cuenta. Se arma al final.
   ============================================================================================ */
var WEB28 = { g: null };
function web28Nativo() { try { return typeof esNativo52 === 'function' && esNativo52(); } catch (e) { return false; } }
function web28Compu() { try { return !web28Nativo() && window.matchMedia && window.matchMedia('(pointer: fine)').matches && window.innerWidth >= 900; } catch (e) { return false; } }
(function () {
  var st = document.createElement('style');
  st.textContent = '.mapa28g{position:fixed!important;left:0!important;top:0!important;width:100vw!important;height:100vh!important;z-index:95!important;border-radius:0!important;margin:0!important}'
    + '.mapa28b{display:flex;justify-content:flex-end;margin-top:6px}.mapa28b button{min-height:44px;border-radius:12px;padding:0 14px;font-weight:800;border:1px solid var(--line);background:var(--surface);color:inherit}'
    + '#mapa28x{position:fixed;top:14px;right:14px;z-index:96;min-height:52px;padding:0 18px;border-radius:14px;border:0;background:#111827;color:#fff;font-weight:800;font-size:17px;box-shadow:0 6px 20px rgba(0,0,0,.3)}';
  document.head.appendChild(st);
})();
var _mv28 = mapaVivoHTML;
mapaVivoHTML = function (id, data, alto) {
  try { if (web28Compu() && (alto || 220) >= 220) alto = Math.min(560, Math.round((alto || 220) * 1.9)); } catch (e) {}
  return _mv28.call(this, id, data, alto);
};
function web28Ajusta(el) {
  try { if (el._m) { el._m.invalidateSize(); if (el.classList.contains('mapa28g')) el._m.scrollWheelZoom.enable(); else el._m.scrollWheelZoom.disable(); } } catch (e) {}
}
function web28Mapas() {
  Array.prototype.forEach.call(document.querySelectorAll('[data-vivo]'), function (el) {
    var id = el.getAttribute('data-vivo');
    var grande = WEB28.g === id;
    if (grande !== el.classList.contains('mapa28g')) { el.classList.toggle('mapa28g', grande); setTimeout(function () { web28Ajusta(el); }, 60); }
    if (el._gm) return; /* mapa nativo de Google del APK */
    var n = el.nextElementSibling; while (n && n.hasAttribute && n.hasAttribute('data-mapdata')) n = n.nextElementSibling;
    if (n && n.classList && n.classList.contains('mapa28b')) return;
    var d = document.createElement('div'); d.className = 'mapa28b';
    d.innerHTML = '<button type="button" data-act="mapa28" data-id="' + esc(id) + '">⤢ Ver en grande</button>';
    var ult = el; while (ult.nextElementSibling && ult.nextElementSibling.hasAttribute('data-mapdata')) ult = ult.nextElementSibling;
    ult.after(d);
  });
  var x = document.getElementById('mapa28x');
  if (WEB28.g && document.querySelector('[data-vivo="' + WEB28.g + '"]')) { if (!x) { x = document.createElement('button'); x.id = 'mapa28x'; x.dataset.act = 'mapa28x'; x.textContent = '✕ Cerrar mapa'; document.body.appendChild(x); } }
  else { if (WEB28.g) WEB28.g = null; if (x) x.remove(); }
}
document.addEventListener('click', function (e) {
  var b = e.target.closest && e.target.closest('[data-act="mapa28"],[data-act="mapa28x"]'); if (!b) return;
  e.preventDefault(); e.stopImmediatePropagation();
  WEB28.g = b.dataset.act === 'mapa28' ? b.dataset.id : null; web28Mapas();
}, true);
document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && WEB28.g) { WEB28.g = null; web28Mapas(); } });
/* "este celular" → "esta computadora" en la web con mouse */
function web28Textos() {
  if (!web28Compu()) return;
  var R = [[/\b[Ee]n este celular\b/g, function (m) { return m[0] === 'E' ? 'En esta computadora' : 'en esta computadora'; }], [/\b[Ee]ste celular\b/g, function (m) { return m[0] === 'E' ? 'Esta computadora' : 'esta computadora'; }], [/si el celular va lento/g, function () { return 'si la computadora va lenta'; }]];
  var w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null), n, L = [];
  while ((n = w.nextNode())) if (/celular/.test(n.nodeValue)) L.push(n);
  L.forEach(function (t) { var v = t.nodeValue, o = v; R.forEach(function (r) { v = v.replace(r[0], r[1]); }); if (v !== o) t.nodeValue = v; });
}
var _rd28 = render;
render = function () {
  var r = _rd28.apply(this, arguments);
  try { web28Mapas(); } catch (e) {}
  try { web28Textos(); } catch (e) {}
  return r;
};
