/* ===================== TEMA · La pantalla no se mueve sola cuando termina de cargar una imagen (21 nov · punto 15 de la nueva numeración) =====================
   Ricardo (captura de la nota después de una entrega): "al bajar para 'Seguir con la ruta' la pantalla se sube un poco y en todas las entregas,
   en lugar de presionar 'Seguir con la ruta', se presiona 'Ver como imagen'. Te dije que revisaras que no pasara en ningún lado de la app:
   que las pantallas no se muevan solas si no es necesario".
   Causa: el logo de la nota (<img> de 90 px de ancho, sin alto) mide 0 mientras el teléfono lo carga y luego crece ~90 px: todo lo de abajo
   (los botones) baja esa cantidad justo cuando el dedo ya va a tocar. Pasa con cualquier imagen sin tamaño reservado que termine de cargar
   arriba de lo que estás viendo; y el anclaje del navegador está apagado a propósito (l68, punto 51 de antes) porque peleaba con el redibujo.
   Ahora:
     1) El logo de la nota tiene su espacio reservado desde el principio (90 × 90): ya no crece.
     2) En TODA la app: si una imagen que está ARRIBA de lo que ves cambia de tamaño (porque terminó de cargar), la pantalla se recorre esa
        misma cantidad: lo que tienes enfrente (y donde está tu dedo) se queda quieto. Los cambios que vienen de un redibujo no se tocan
        (esos ya los acomoda el motor de pantalla) y las imágenes que están a la vista o abajo no mueven nada.
     3) En TODA la app, en cada redibujo: lo que tienes a la vista se queda donde estaba. Causa encontrada en la nota (y en todas las pantallas
        del chofer): la barra "💰 $… hoy" (y otras tarjetas que se agregan arriba DESPUÉS del motor de pantalla) se quita y se vuelve a poner
        en cada redibujo; en medio, la página queda 72 px más corta, el teléfono sube la pantalla y luego todo baja: medido 743 → 671.
        Ahora, antes de redibujar se anota qué está a la vista (y a qué altura) y al terminar, ya con todo agregado, si se movió se regresa.
        No aplica si cambias de pantalla, si la app te lleva a propósito a algo (ir arriba, "Ir ›", saltos suaves) o mientras deslizas (11).
   Solo cambia el scroll; no cambia ningún dato. Se arma al final.
   ============================================================================================ */
(function () {
  try {
    var st = document.createElement('style'); st.id = 'quieto15';
    st.textContent = '#notaPrev > div > img:first-child{width:90px;height:90px;object-fit:contain}';
    document.head.appendChild(st);
  } catch (e) {}
})();
var Q15 = { alto: (typeof WeakMap !== 'undefined') ? new WeakMap() : null, finRender: 0, ro: null, vistas: (typeof WeakSet !== 'undefined') ? new WeakSet() : null };
function q15Ajusta(entries) {
  if (!Q15.alto) return;
  var reciente = performance.now() - Q15.finRender < 60, d = 0;
  entries.forEach(function (en) {
    var el = en.target, h = el.getBoundingClientRect().height, ant = Q15.alto.get(el);
    Q15.alto.set(el, h);
    if (ant == null || reciente || !el.isConnected) return;
    var dh = h - ant; if (Math.abs(dh) < 1) return;
    var r = el.getBoundingClientRect();
    /* solo si la imagen está ARRIBA de lo que ves (su parte de abajo antes del cambio ya estaba fuera, arriba) */
    if (r.bottom - dh <= 1) d += dh;
  });
  /* directo sobre la página (no pasa por el freno del punto 11: aquí es justo cuando hay que compensar, aunque estés deslizando) */
  if (Math.abs(d) >= 1) { try { var se = document.scrollingElement || document.documentElement; se.scrollTop = se.scrollTop + d; } catch (e) {} }
}
function q15Observa() {
  if (!Q15.ro) { if (typeof ResizeObserver === 'undefined') return; Q15.ro = new ResizeObserver(q15Ajusta); }
  var L = document.querySelectorAll('#root img');
  for (var i = 0; i < L.length; i++) {
    var im = L[i]; if (Q15.vistas && Q15.vistas.has(im)) continue;
    if (Q15.vistas) Q15.vistas.add(im);
    try { Q15.alto.set(im, im.getBoundingClientRect().height); Q15.ro.observe(im); } catch (e) {}
  }
}
/* 3) lo que está a la vista se queda en su lugar después de cada redibujo */
function q15Vista() { return (S.role || '') + ':' + ((S.tab && S.tab[S.role]) || '') + ':' + (S.vf ? 'vf' : '') + (document.documentElement.classList.contains('fi-on') ? ':fi' : ''); }
function q15Llave(el) {
  if (!el || !el.getAttribute) return '';
  var a = ['data-act', 'data-k', 'data-x', 'data-id', 'data-i', 'data-v', 'id'].map(function (k) { return el.getAttribute(k) || ''; }).join('|');
  return el.tagName + '|' + a + '|' + String(el.textContent || '').replace(/\s+/g, ' ').trim().slice(0, 40);
}
function q15Ancla() {
  var m = document.querySelector('#root > main'); if (!m) return null;
  var H = window.innerHeight || 800, W = window.innerWidth || 400;
  var P = [0.5, 0.4, 0.62, 0.3, 0.72];
  for (var i = 0; i < P.length; i++) {
    var el = document.elementFromPoint(W / 2, H * P[i]);
    if (!el || !m.contains(el)) continue;
    /* no sirve de ancla algo pegado (fijo o "sticky") */
    var x = el, malo = false;
    while (x && x !== m) { var ps = getComputedStyle(x).position; if (ps === 'fixed' || ps === 'sticky') { malo = true; break; } x = x.parentElement; }
    if (malo) continue;
    return { el: el, top: el.getBoundingClientRect().top, key: q15Llave(el) };
  }
  return null;
}
function q15Busca(a) {
  if (a.el && a.el.isConnected && document.querySelector('#root > main') && document.querySelector('#root > main').contains(a.el)) return a.el;
  if (!a.key) return null;
  var tag = a.key.split('|')[0], L = document.querySelectorAll('#root > main ' + tag), c = null, n = 0;
  for (var i = 0; i < L.length; i++) if (q15Llave(L[i]) === a.key) { c = L[i]; n++; }
  return n === 1 ? c : null;
}
var Q15R = { prof: 0 };
var _rd15 = render;
render = function () {
  var a = null, v0 = null, t0 = Date.now(), y0 = window.scrollY;
  if (Q15R.prof === 0) { try { if (!(typeof scr11Deslizando === 'function' && scr11Deslizando()) && y0 > 0) { a = q15Ancla(); v0 = q15Vista(); } } catch (e) { a = null; } }
  Q15R.prof++;
  var r;
  try { r = _rd15.apply(this, arguments); } finally { Q15R.prof--; }
  Q15.finRender = performance.now();
  try { q15Observa(); } catch (e) {}
  if (a && Q15R.prof === 0) {
    try {
      var adrede = (typeof ANC82 !== 'undefined' && ANC82.t >= t0) || window.__scrollPedido;
      if (!adrede && q15Vista() === v0 && !(typeof scr11Deslizando === 'function' && scr11Deslizando())) {
        var el = q15Busca(a);
        if (el) { var d = el.getBoundingClientRect().top - a.top; if (Math.abs(d) >= 1) { var se = document.scrollingElement || document.documentElement; se.scrollTop = se.scrollTop + d; } }
      }
    } catch (e) {}
  }
  return r;
};
