/* ===================== TEMA · Tarjetas desplegables: se abren suave y se cierran al salir (20 nov · punto 12 de la nueva numeración) =====================
   Ricardo: "las tarjetas desplegables (ej. sección de cuadre), al abrirlas parpadean en lugar de desplegarse con una transición suave. Si sales
   de ese apartado y regresas, se quedan abiertas cuando deberían resetearse al salir. Aplicar en todas las tarjetas desplegables de la app".
   Causa del parpadeo: la animación de abrir (l9) arrancaba con el aviso "toggle", que el teléfono manda DESPUÉS de pintar la tarjeta ya abierta:
   se veía el contenido completo, desaparecía y volvía a aparecer. Además varias tarjetas arman su contenido al abrirse (se redibuja) y ese
   contenido nuevo aparecía de golpe.
   Ahora (en TODAS las tarjetas desplegables <details> de la app):
     1) La animación arranca en el MISMO instante del toque (antes de que el teléfono pinte): aparece suave, solo con transparencia y un
        pequeño movimiento (por la tarjeta gráfica). Lo que la app agregue adentro justo después también entra suave.
        Con "Modo ahorro" o "reducir movimiento" se abren sin animación (como toda la app).
     2) Al salir de la sección (o de la ficha), las tarjetas que abriste o cerraste ahí regresan a como estaban (S.dOpen de esas tarjetas se
        borra: vuelven a su estado de siempre). Las que la app abre sola para llevarte a algo (por ejemplo "Ir ›") no se tocan.
   Solo cambia cómo se ven; no cambia ningún dato. Se arma al final.
   ============================================================================================ */
var DESP12 = { anim: (typeof WeakSet !== 'undefined') ? new WeakSet() : null, abierta: null, t: 0, vista: null, mias: {} };
function desp12Quieto() {
  try { if (document.documentElement.classList.contains('ahorro171')) return true; } catch (e) {}
  try { return !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches); } catch (e) { return false; }
}
function desp12Anima(el) {
  if (!el || el.tagName === 'SUMMARY' || !el.animate || desp12Quieto()) return;
  if (DESP12.anim) { if (DESP12.anim.has(el)) return; DESP12.anim.add(el); }
  try { el.animate([{ opacity: 0, transform: 'translateY(-6px)' }, { opacity: 1, transform: 'none' }], { duration: 220, easing: 'ease-out' }); } catch (e) {}
}
function desp12Vista() {
  var f = null; try { f = typeof fiCur === 'function' ? fiCur() : null; } catch (e) {}
  return (S.role || '') + ':' + ((S.tab && S.tab[S.role]) || '') + (f ? ':' + f.t + ':' + f.id : '');
}
/* 1) al tocar el título de una tarjeta cerrada: la animación empieza en el mismo toque (antes de que se pinte).
   Si estaba cerrada se anota desde que baja el dedo: otras partes de la app la abren en el mismo toque, antes que esta. */
var DESP12pre = { d: null, cerrada: false, t: 0 };
['pointerdown', 'mousedown', 'touchstart'].forEach(function (ty) {
  window.addEventListener(ty, function (e) {
    var s = e.target && e.target.closest && e.target.closest('summary'); if (!s) return;
    var d = s.parentElement; if (!d || d.tagName !== 'DETAILS') return;
    if (DESP12pre.d === d && Date.now() - DESP12pre.t < 800) return;
    DESP12pre = { d: d, cerrada: !d.open, t: Date.now() };
  }, { capture: true, passive: true });
});
window.addEventListener('click', function (e) {
  var s = e.target && e.target.closest && e.target.closest('summary'); if (!s) return;
  var d = s.parentElement; if (!d || d.tagName !== 'DETAILS') return;
  if (d.dataset && d.dataset.k) DESP12.mias[d.dataset.k] = desp12Vista();
  var cerrada = DESP12pre.d === d && Date.now() - DESP12pre.t < 1500 ? DESP12pre.cerrada : !d.open;
  DESP12pre = { d: null, cerrada: false, t: 0 };
  if (!cerrada) return;
  /* la animación vieja (l9, la que arrancaba tarde con "toggle") no se encima: se apaga para este toque */
  try { _sumT = 0; } catch (er) {}
  DESP12.abierta = d.dataset && d.dataset.k ? d.dataset.k : null; DESP12.t = Date.now();
  Array.prototype.forEach.call(d.children, desp12Anima);
}, true);
/* lo que la app agrega adentro al abrirla (se redibuja) también entra suave */
function desp12Nuevos() {
  if (!DESP12.abierta || Date.now() - DESP12.t > 1500) return;
  var d = document.querySelector('details[data-k="' + DESP12.abierta.replace(/"/g, '') + '"]'); if (!d || !d.open) return;
  Array.prototype.forEach.call(d.children, desp12Anima);
}
/* 2) al salir de la sección: las que tú abriste o cerraste ahí vuelven a como estaban */
function desp12Sale() {
  var v = desp12Vista();
  if (DESP12.vista && DESP12.vista !== v && S.dOpen) {
    var ant = DESP12.vista;
    Object.keys(DESP12.mias).forEach(function (k) { if (DESP12.mias[k] === ant) { delete S.dOpen[k]; delete DESP12.mias[k]; } });
  }
  DESP12.vista = v;
}
var _rd12 = render;
render = function () {
  try { desp12Sale(); } catch (e) {}
  var r = _rd12.apply(this, arguments);
  try { desp12Nuevos(); } catch (e) {}
  return r;
};
