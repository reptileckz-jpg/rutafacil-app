/* ===================== TEMA · Bento Glossy 3D en toda la app (nació como tema, 19 nov · punto 170) =====================
   Ricardo: "con esos dos diseños que ya tienes (Inicio y Ruta/Entrega), adáptalos a toda la app, conserva o añade animaciones
   según sea el caso y recuerda que son aceleradas por GPU".
   - Mismo lenguaje que 167/168: tarjetas de 24 px con sombra suave, botones con brillo y rebote, opciones elegidas como
     píldora verde, campos redondeados; claro y oscuro.
   - Los colores que SIGNIFICAN algo se quedan: tarjeta roja (alerta), amarilla (nota) y verde (bien) conservan su fondo y borde;
     el brillo de los botones va ENCIMA de su color (un botón rojo sigue rojo).
   - NO cambia espacios ni tamaños de letra (para no volver a desbordar pantallas angostas ni mover nada de lugar).
   - Animaciones SOLO con transform y opacity (las mueve la tarjeta de video):
       · las tarjetas entran escalonadas SOLO al llegar a una pantalla (no cada vez que se redibuja);
       · las ventanas entran con rebote SOLO cuando se abren (si se redibujan por dentro, no);
       · los botones se encogen al tocarlos y regresan con rebote.
     Con "reducir movimiento" del celular, nada se anima.
   - Arreglo de paso: en el Cuadre, 3 tarjetas se quedaban blancas en modo oscuro; ahora toman el color de tarjeta.
   - Inicio, Más, Ruta, Entrega y las barras ya tienen su diseño (167/168/165/166): aquí no se tocan.
   Solo apariencia; no cambia ningún dato. Se arma al final.
   ============================================================================================ */
var APP170_CSS = [
 ':root{--r170:24px;--sh170:0 1px 0 rgba(255,255,255,.7) inset,0 10px 26px -14px rgba(30,42,26,.28),0 2px 6px -2px rgba(30,42,26,.08);--rise170:cubic-bezier(.22,1,.36,1);--spring170:cubic-bezier(.34,1.56,.64,1)}',
 '@media (prefers-color-scheme:dark){:root:not([data-theme="light"]){--sh170:0 1px 0 rgba(255,255,255,.05) inset,0 12px 28px -14px rgba(0,0,0,.7)}}',
 ':root[data-theme="dark"]{--sh170:0 1px 0 rgba(255,255,255,.05) inset,0 12px 28px -14px rgba(0,0,0,.7)}',
 /* tarjetas: forma y sombra (el fondo/borde de alerta, nota y bien no se toca) */
 'html.app170 main:not(.ini167):not(.ruta168) .card{border-radius:var(--r170);box-shadow:var(--sh170)}',
 'html.app170 .pop68,html.app170 .sheet>div{box-shadow:0 24px 60px -18px rgba(0,0,0,.45)}',
 'html.app170 .sheet>div{border-radius:28px 28px 0 0}',
 /* botones: brillo encima de su propio color, esquinas suaves, rebote al soltar (solo transform) */
 'html.app170 .btn{border-radius:16px;background-image:linear-gradient(180deg,rgba(255,255,255,.20),rgba(255,255,255,0) 55%,rgba(0,0,0,.06));box-shadow:0 1px 0 rgba(255,255,255,.35) inset,0 6px 14px -8px rgba(30,42,26,.45)}',
 'html.app170 .btn.sec{background-image:none;box-shadow:0 1px 0 rgba(255,255,255,.6) inset,0 4px 12px -8px rgba(30,42,26,.3)}',
 'html.app170 .btn.sm{border-radius:999px}',
 'html.app170 button:not(.nav-item),html.app170 .btn,html.app170 .qa{transition:transform .32s var(--spring170)!important}',
 'html.app170 button:not(.nav-item):active,html.app170 .btn:active,html.app170 .qa:active{transform:scale(.95);transition:transform .08s ease-out!important}',
 /* opción elegida: píldora verde */
 'html.app170 .chips button{border-radius:999px}',
 'html.app170 .chips button[aria-pressed="true"]{box-shadow:0 6px 14px -8px rgba(46,125,50,.7),0 1px 0 rgba(255,255,255,.3) inset}',
 /* Cuadre: sus tarjetas blancas no respetaban el modo oscuro (letra clara sobre blanco); toman el color de tarjeta de la app */
 'html.app170 .k5card2,html.app170 .k5grp,html.app170 .k5sub{background:var(--surface)}',
 /* campos redondeados */
 'html.app170 .field input,html.app170 .field select,html.app170 input.full,html.app170 select.full,html.app170 textarea{border-radius:14px}',
 /* entrada escalonada: solo al llegar a una pantalla */
 '@keyframes in170{from{opacity:0;transform:translate3d(0,14px,0) scale(.985)}to{opacity:1;transform:none}}',
 'main.in170>*{animation:in170 .5s var(--rise170) both}',
 'main.in170>*:nth-child(2){animation-delay:.04s}main.in170>*:nth-child(3){animation-delay:.08s}main.in170>*:nth-child(4){animation-delay:.12s}',
 'main.in170>*:nth-child(5){animation-delay:.16s}main.in170>*:nth-child(6){animation-delay:.2s}main.in170>*:nth-child(n+7){animation-delay:.24s}',
 /* ventanas: el fondo aparece y el panel entra con rebote, solo al abrirse */
 '@keyframes ovf170{from{opacity:0}to{opacity:1}}',
 '@keyframes ovp170{from{opacity:0;transform:translate3d(0,22px,0) scale(.96)}to{opacity:1;transform:none}}',
 '@keyframes ovs170{from{transform:translate3d(0,100%,0)}to{transform:none}}',
 '.ab170{animation:ovf170 .2s ease-out both}',
 '.ab170:not(.sheet)>*:first-child{animation:ovp170 .46s var(--spring170) both;will-change:transform,opacity}',
 '.sheet.ab170>div{animation:ovs170 .42s var(--rise170) both;will-change:transform}',
 /* pantallas completas (.ov70): solo deslizan, sin rebote */
 '.ov70.ab170{animation:ovp170 .36s var(--rise170) both}.ov70.ab170>*:first-child{animation:none}',
 '@media (prefers-reduced-motion:reduce){main.in170>*,.ab170,.ab170>*{animation:none!important}}'
].join('\n');

(function () {
  if (document.getElementById('css170')) return;
  var st = document.createElement('style');
  st.id = 'css170';
  st.textContent = APP170_CSS;
  document.head.appendChild(st);
  document.documentElement.classList.add('app170');
})();

/* las tarjetas entran solo al llegar a una pantalla (Inicio y Ruta/Entrega ya tienen la suya) */
var _app170Ult = '';
function app170() {
  try {
    var m = document.querySelector('main');
    var vista = S.role + ':' + (S.tab && S.tab[S.role]);
    var llega = vista !== _app170Ult;
    _app170Ult = vista;
    if (!m) return;
    var propia = m.classList.contains('ini167') || m.classList.contains('ruta168') || !!m.querySelector('.mas166');
    if (llega && !propia) {
      m.classList.add('in170');
      setTimeout(function () { var x = document.querySelector('main.in170'); if (x) x.classList.remove('in170'); }, 900);
    } else m.classList.remove('in170');
  } catch (e) { console.error('app170', e); }
}
var _rd170 = render;
render = function () { var r = _rd170.apply(this, arguments); app170(); return r; };

/* las ventanas: se anima solo la que NO estaba abierta antes (si solo se redibujó, no) */
var OV170 = '.sheet,#cvov,#cmov,#vwov,#ajov,#fiov,#pinov,#cajov,#setov,#tutov,.modal,#fotov,#npov,#dfov,#crov,#ubov,#nbov,#cxov,#fnov,#pxov,#bjov,#qsov,#mjov,#pwov,#fgov,#wzov,#permov,#rcov,#eqov,#gmov,#pnov,#medov,#faov,#blov,.pop68,.ov70';
function ov170Llave(e) { return e.id || ('.' + (e.className || '').toString().split(/\s+/).filter(function (c) { return c && c !== 'ab170'; }).sort().join('.')); }
var _ov170Ant = {};
function ov170Revisa() {
  try {
    var ahora = {};
    Array.prototype.forEach.call(document.querySelectorAll(OV170), function (e) {
      if (e.parentNode && e.parentNode.closest && e.parentNode.closest(OV170)) return;   /* solo la ventana de afuera */
      var k = ov170Llave(e);
      ahora[k] = 1;
      if (!_ov170Ant[k] && !e.classList.contains('ab170')) {
        e.classList.add('ab170');
        setTimeout(function () { e.classList.remove('ab170'); }, 700);
      }
    });
    _ov170Ant = ahora;
  } catch (err) { console.error('ov170', err); }
}
(function () {
  if (!window.MutationObserver || !document.body) return;
  var pend = false;
  new MutationObserver(function () {
    if (pend) return;
    pend = true;
    Promise.resolve().then(function () { pend = false; ov170Revisa(); });
  }).observe(document.body, { childList: true, subtree: true });
  ov170Revisa();
})();
