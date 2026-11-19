/* ===================== TEMA · Pantalla ancha: computadora, Samsung DeX, Fold abierto (nació como tema, 19 nov · punto 164) =====================
   Ricardo (probándola en DeX a pantalla completa): "se adapta bien; algunas tarjetas quedan flotando con un espacio vacío a su lado, sobre
   todo los clientes; se podría aprovechar más ese apartado en la pantalla grande".
   La pantalla ancha ya acomoda las tarjetas en columnas tipo periódico (2 o 3). Una tarjeta que es una LISTA larga (clientes, pedidos…) se
   quedaba en una sola columna, larguísima, y las demás columnas vacías.
   - En pantallas de 900 px o más: una tarjeta con 8 renglones iguales o más ocupa todo el ancho y acomoda sus renglones en cuadrícula
     (las columnas que quepan, de ~340 px). Lo que no es renglón (títulos, botones) va a todo lo ancho arriba.
   - En 1000 px o más, la barra de navegación va al lado izquierdo: se le deja su espacio para que no tape el contenido.
   Solo acomoda; no cambia ningún dato ni ninguna cuenta. En el celular normal no hace nada. Se arma al final.
   ============================================================================================ */
(function(){var st=document.createElement('style');st.id='css164';st.textContent=[
 '@media (min-width:900px){',
 ' html:not(.as-phone):not(.onecol) main>.lista164{column-span:all;display:grid;grid-template-columns:repeat(auto-fill,minmax(340px,1fr));column-gap:22px;align-items:start}',
 ' html:not(.as-phone):not(.onecol) main>.lista164>.full164{grid-column:1/-1}',
 '}',
 '@media (min-width:1000px){',
 ' html:not(.as-phone) body{padding-left:max(108px,calc(env(safe-area-inset-left,0px) + 104px))}',
 '}'].join('\n');document.head.appendChild(st)})();
function ancha164(){try{if(window.innerWidth<900)return;var h=document.documentElement;if(h.classList.contains('as-phone')||h.classList.contains('onecol'))return;var m=document.querySelector('main');if(!m)return;
 Array.prototype.forEach.call(m.children,function(c){if(!c.classList||!c.classList.contains('card')||c.tagName==='DETAILS'||c.classList.contains('lista164'))return;var K=c.children;if(K.length<8)return;
  var cuenta={},firma=function(x){return x.tagName+'.'+(typeof x.className==='string'?x.className:'')};Array.prototype.forEach.call(K,function(x){var f=firma(x);cuenta[f]=(cuenta[f]||0)+1});
  var mejor=Object.keys(cuenta).sort(function(a,b){return cuenta[b]-cuenta[a]})[0];if(cuenta[mejor]<8)return;
  c.classList.add('lista164');Array.prototype.forEach.call(K,function(x){if(firma(x)!==mejor)x.classList.add('full164')})})}catch(e){}}
var _rd164=render;render=function(){var r=_rd164.apply(this,arguments);ancha164();return r};
var _rs164=0;window.addEventListener('resize',function(){clearTimeout(_rs164);_rs164=setTimeout(function(){try{render()}catch(e){}},250)});
