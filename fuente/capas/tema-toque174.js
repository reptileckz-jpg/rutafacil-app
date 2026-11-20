/* ===================== TEMA · Sin "toque fantasma" (20 nov · punto 174, auditoría de botones) =====================
   Al tocar un botón la pantalla cambia y, en el MISMO lugar, aparece otro botón. Con un doble toque (o un dedo que rebota), el 2º toque
   caía en ese botón nuevo sin querer. Lo encontró la auditoría:
     · Vehículos › "Dar de baja": el 2º toque caía en "Sí, dar de baja" → se daba de baja sin confirmar.
     · Cierre del chofer › "Siguiente": el 2º toque caía en un nivel del tanque → quedaba "1/2" sin que el chofer lo eligiera.
     · Viaje de carga › "Siguiente": avanzaba dos pasos (el "Siguiente" del paso nuevo sale en el mismo lugar): para los "Siguiente" de
       los asistentes, un 2º toque en menos de 0.7 s tampoco cuenta.
   Regla: si un toque EMPIEZA (dedo abajo) menos de 450 ms después del anterior, en el mismo lugar (±32 px), y sobre OTRO control (no el
   mismo), se ignora ese toque completo (dedo abajo, dedo arriba y clic): así también se cubren controles que responden al tocar, como el
   medidor del tanque.
   Tocar rápido el MISMO botón (+, −, siguiente cliente…) sigue igual. Solo toques de verdad (no los que la app hace por código).
   Solo evita toques sin querer; no cambia ningún dato. Se arma al final.
   ============================================================================================ */
var _tq174 = null, _tqFant = 0;
/* "Siguiente" de los asistentes: el mismo botón aparece en el paso nuevo, en el mismo lugar → con doble toque avanzaba dos pasos */
var TQ174_PASO = /^(vwnext|cipaso|wzsig|wznext|cmnext|ip74sig|insnext|entsig|sig)$/;
function tq174El(t) { return t && t.closest ? (t.closest('[data-act],button,input,select,textarea,label,a,svg,[role="slider"]') || t) : t; }
function tq174Firma(b) {
  if (!b) return '';
  var d = b.dataset || {}, o = {};
  Object.keys(d).sort().forEach(function (k) { o[k] = d[k]; });
  return (b.tagName || '') + JSON.stringify(o) + '|' + (b.id || '') + '|' + (b.textContent || '').replace(/\s+/g, ' ').trim().slice(0, 40);
}
/* el toque empieza: ¿es un fantasma del anterior? (algunos controles, como el medidor del tanque, responden al tocar, no al "clic") */
function tq174Inicio(e) {
  if (!e.isTrusted && !window.__tq174Test) return;
  if (e.type === 'touchstart' && _tqFant && Date.now() - _tqFant < 700) { e.preventDefault(); e.stopImmediatePropagation(); return; }
  if (e.type !== 'pointerdown') return;
  var t = Date.now(), f = tq174Firma(tq174El(e.target)), a = _tq174;
  var el = tq174El(e.target), act = el && el.dataset ? el.dataset.act || '' : '';
  var cerca = a && Math.abs(e.clientX - a.x) <= 32 && Math.abs(e.clientY - a.y) <= 32;
  if (cerca && ((t - a.t < 450 && f !== a.f) || (t - a.t < 700 && f === a.f && TQ174_PASO.test(act)))) {
    _tqFant = t; e.preventDefault(); e.stopImmediatePropagation(); return;   /* el siguiente toque cuenta desde el primero */
  }
  _tqFant = 0;
  _tq174 = { t: t, x: e.clientX, y: e.clientY, f: f };
}
/* el resto del mismo toque fantasma (soltar, clic) también se ignora */
function tq174Resto(e) {
  if (!_tqFant || Date.now() - _tqFant > 700) return;
  if (!e.isTrusted && !window.__tq174Test) return;
  e.preventDefault(); e.stopImmediatePropagation();
  if (e.type === 'click') _tqFant = 0;
}
['pointerdown', 'touchstart', 'mousedown'].forEach(function (ty) { window.addEventListener(ty, ty === 'mousedown' ? tq174Resto : tq174Inicio, { capture: true, passive: false }); });
['pointerup', 'touchend', 'mouseup', 'click'].forEach(function (ty) { window.addEventListener(ty, tq174Resto, { capture: true, passive: false }); });
