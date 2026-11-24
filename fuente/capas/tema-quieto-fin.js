/* ===================== TEMA · La pantalla no brinca al redibujar (24 nov · arreglo de la prueba 15) =====================
   El motor de pantalla regresa el scroll a donde estabas, pero algunas tarjetas se ponen DESPUÉS (Caja y banco, pendientes,
   Mi sueldo, periodo de arranque…). Si estabas hasta abajo, por un momento la página era más corta y el scroll se recortaba.
   Esta capa va SIEMPRE AL FINAL de orden.json: cuando ya terminaron todas, si sigues en la misma pantalla, te deja donde estabas.
   No respeta el regreso si vas deslizando con el dedo (eso lo maneja tema-scroll11). Solo mueve el scroll; no cambia datos.
   ============================================================================================ */
var QF = { on: 0, ult: null };
(function () {
  var st = window.scrollTo, siv = Element.prototype.scrollIntoView;
  window.scrollTo = function (x, y) { if (QF.on) QF.ult = (x && typeof x === 'object') ? (x.behavior === 'smooth' ? 'otro' : x.top) : y; return st.apply(window, arguments); };
  Element.prototype.scrollIntoView = function () { if (QF.on) QF.ult = 'otro'; return siv.apply(this, arguments); };
})();
var _rdQF = render;
render = function () {
  var y = window.scrollY, k = S.role + '|' + S.tab[S.role], r; QF.on++; if (QF.on === 1) QF.ult = null;
  try { r = _rdQF.apply(this, arguments); } finally { QF.on--; }
  try {
    /* solo si el último acomodo durante el redibujo fue "quédate donde estabas" (no uno a propósito) */
    if (!QF.on && QF.ult != null && +QF.ult === y && k === S.role + '|' + S.tab[S.role] && y > 0 && Math.abs(window.scrollY - y) > 1 && !(typeof scr11Deslizando === 'function' && scr11Deslizando())) window.scrollTo(0, y);
  } catch (e) {}
  return r;
};
