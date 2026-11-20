/* ===================== TEMA · Sin rebote al deslizar rápido (20 nov · punto 11 de la nueva numeración) =====================
   Ricardo: "al bajar rápido hasta el final (por ejemplo en la Ruta para buscar el botón), la vista se regresa sola a casi el final de la lista
   … todas las veces que hice scroll rápido; si bajo despacio sí llega. Después de un rato ya responde bien. Revisar en toda la app".
   Causa (toda la app): cada redibujo guarda dónde estaba la pantalla y al terminar la regresa ahí (morph: window.scrollTo(0, y)), y el
   "no brinques al tocar" (82) también la acomoda con scrollBy. En un deslizamiento rápido el dedo ya soltó pero la pantalla sigue bajando
   sola (inercia); si en ese momento llega un redibujo (al abrir la app llegan muchos: fotos y datos de la nube, ver 8) la app la regresaba
   a donde estaba al empezar → el brinco. "Después de un rato" ya no hay redibujos seguidos → ya no pasa.
   Ahora: mientras TÚ estás deslizando (dedo en la pantalla, rueda, o la pantalla todavía moviéndose por la inercia: hasta 0.7 s después del
   último movimiento), la app NO mueve la pantalla por su cuenta al redibujar. Lo que pides tú (ir arriba al cambiar de sección, "Ir ›",
   saltos suaves a algo) sigue igual, porque no pasa durante un redibujo o es un salto suave a propósito.
   Solo cambia el scroll automático; no cambia ningún dato. Se arma al final.
   ============================================================================================ */
var SCR11 = { dedo: false, movio: false, t: 0, ent: 0, enRender: 0 };
(function () {
  /* solo cuenta como "estás deslizando" mover el dedo o la rueda (y la inercia que sigue); un toque normal NO */
  window.addEventListener('touchstart', function () { SCR11.dedo = true; SCR11.movio = false; }, { capture: true, passive: true });
  var suelta = function () { SCR11.dedo = false; SCR11.movio = false; };
  window.addEventListener('touchend', suelta, { capture: true, passive: true });
  window.addEventListener('touchcancel', suelta, { capture: true, passive: true });
  var mueve = function () { SCR11.movio = true; SCR11.t = SCR11.ent = Date.now(); };
  window.addEventListener('touchmove', mueve, { capture: true, passive: true });
  window.addEventListener('wheel', mueve, { capture: true, passive: true });
  /* la pantalla que se sigue moviendo por la inercia (solo si viene de tu dedo o la rueda, no de un scroll que hizo la app) */
  window.addEventListener('scroll', function () { if (Date.now() - SCR11.ent < 1500) SCR11.t = Date.now(); }, { capture: true, passive: true });
})();
function scr11Deslizando() { return (SCR11.dedo && SCR11.movio) || Date.now() - SCR11.t < 700; }
/* el scroll que hace la app sola mientras redibuja (o el acomodo de 82) no pelea con tu dedo */
(function () {
  var st = window.scrollTo, sb = window.scrollBy;
  var suave = function (x) { return x && typeof x === 'object' && x.behavior === 'smooth'; };
  window.scrollTo = function (x, y) {
    if (SCR11.enRender && scr11Deslizando() && !suave(x)) { var top = x && typeof x === 'object' ? x.top : y; if (+top !== 0) return; }
    return st.apply(window, arguments);
  };
  window.scrollBy = function (x, y) {
    if (scr11Deslizando() && !suave(x)) return;
    return sb.apply(window, arguments);
  };
})();
var _rd11 = render;
render = function () { SCR11.enRender++; try { return _rd11.apply(this, arguments); } finally { SCR11.enRender--; } };
