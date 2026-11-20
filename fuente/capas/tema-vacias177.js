/* ===================== TEMA · Cajas vacías que debe: roja y que tiembla (20 nov · punto 177) =====================
   Ricardo: "esta tarjeta naranja donde dice que debe taras, me gustaría que fuera roja o de un color más llamativo. Y con cada tara que
   le añades / entrega, donde dice 'queda debiendo X cajas vacías', que ese renglón tiemble para recalcar que tiene que entregarlas.
   Las animaciones son aceleradas por GPU."
   - Si queda debiendo: tarjeta roja (fondo rojo claro + borde rojo; en oscuro, el rojo oscuro de la app) y el renglón en rojo.
     Al corriente: sigue verde.
   - Cada vez que cambia lo que queda debiendo (tocas + o − en las que le dejas o las que devuelve, o escribes) y todavía debe, el renglón
     tiembla: solo transform (translateX) → lo mueve la tarjeta gráfica. Con "Modo ahorro" o "reducir movimiento" no se mueve.
   Solo apariencia; no cambia ninguna cuenta. Se arma al final.
   ============================================================================================ */
(function () {
  if (document.getElementById('css177')) return;
  var st = document.createElement('style'); st.id = 'css177';
  st.textContent = [
    '#vac115.debe177{background:var(--danger-soft)!important;border:2px solid var(--danger)}',
    '#vac115.debe177 .vacq177{color:var(--danger)!important}',
    '.vacq177{display:inline-block}',
    '@keyframes tiembla177{0%,100%{transform:translate3d(0,0,0)}12%{transform:translate3d(-7px,0,0)}25%{transform:translate3d(6px,0,0)}37%{transform:translate3d(-5px,0,0)}50%{transform:translate3d(4px,0,0)}62%{transform:translate3d(-3px,0,0)}75%{transform:translate3d(2px,0,0)}87%{transform:translate3d(-1px,0,0)}}',
    '.vacq177.tiembla177{animation:tiembla177 .55s cubic-bezier(.36,.07,.19,.97) both;will-change:transform}',
    '@media (prefers-reduced-motion:reduce){.vacq177.tiembla177{animation:none}}'
  ].join('\n');
  document.head.appendChild(st);
})();
var _vs177 = vacSaldo115;
vacSaldo115 = function (c, d, k) {
  var h = _vs177.apply(this, arguments);
  try {
    if (!h) return h;
    var q = Math.max(0, num(c.vac) + num(d && d.R) - num(d && d.V));
    h = h.replace('<div id="vac115" style="', '<div id="vac115" class="' + (q > 0 ? 'debe177' : '') + '" data-q177="' + q + '" style="');
    h = h.replace('<b style="font-size:17px', '<b class="vacq177" style="font-size:17px');
    return h;
  } catch (e) { return h; }
};
/* tiembla cuando cambia lo que queda debiendo (no al abrir la entrega) */
var _vacUlt177 = null;
function vac177() {
  try {
    var box = document.getElementById('vac115'), cid = (typeof curCli === 'function' && curCli()) ? curCli().id : null;
    if (!box) { _vacUlt177 = null; return; }
    var q = +box.getAttribute('data-q177'), clave = cid + ':' + q, ant = _vacUlt177;
    _vacUlt177 = clave;
    if (!ant || ant.split(':')[0] !== String(cid) || ant === clave || !(q > 0)) return;
    var b = box.querySelector('.vacq177'); if (!b) return;
    b.classList.remove('tiembla177'); void b.offsetWidth; b.classList.add('tiembla177');
    clearTimeout(b._t177); b._t177 = setTimeout(function () { b.classList.remove('tiembla177'); }, 650);
  } catch (e) {}
}
var _rd177 = render;
render = function () { var r = _rd177.apply(this, arguments); vac177(); return r; };
