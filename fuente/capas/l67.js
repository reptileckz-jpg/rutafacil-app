/* ===================== v7.4.1 · estabilidad (11 nov)
   44/45 (opción A): los mapas chicos dentro de las pantallas son siempre el mapa de antes; Google Maps solo al abrir "Ver en Google Maps"
          (el mapa de Google "debajo" de la app se desfasaba, no se veía y dejaba la app trabada en algunos celulares)
   44 no se selecciona texto al tocar o mantener presionado (solo en los campos donde se escribe)
   46 la barra de abajo no se rehace si no cambió nada (parpadeaba al deslizar) ===================== */
/* gmInHay: pasó a tema-ubica.js */
/* quitar los mapas de Google chicos que hubieran quedado */
try{setTimeout(function(){try{GMI.slice().forEach(gmQuita)}catch(e){}},0)}catch(e){}
/* el interruptor "Mapas de Google" de Ajustes ya no hace falta */
/* render: pasó a tema-dibujar1.js */
(function(){var st=document.createElement('style');st.textContent=[
 'body{-webkit-user-select:none;user-select:none;-webkit-touch-callout:none}',
 'input,textarea,select,[contenteditable="true"]{-webkit-user-select:text;user-select:text;-webkit-touch-callout:default}'].join('\n');document.head.appendChild(st)})();
/* 46 · la barra se vuelve a dibujar en cada actualización y la animación del numerito arrancaba de nuevo (parpadeo):
   ahora la animación sigue su ritmo según el reloj, aunque se vuelva a dibujar */
/* tabBadges: pasó a tema-avisos.js */
/* 48 · numerito de la barra: 1er toque = ir a la sección; 2º toque (ya estando ahí) = ir directo al pendiente de ese numerito */
function tabPend48(t){var cas=['inicio','bodega','cargas','clientes','gastos','mas'],nv=document.querySelector('nav.tabs'),enBarra={};if(nv)Array.prototype.forEach.call(nv.querySelectorAll('button[data-t]'),function(b){enBarra[b.dataset.t]=1});
 return avSinEfecto(function(){var L=[];try{L=avisos().filter(function(x){return typeof x==='string'&&!(S.avPos||{})[x]})}catch(e){}
  var conT=L.map(function(x){var d=null;try{d=avDestino(x)}catch(e){}return {x:x,t:(d&&d.t)||'inicio'}}).filter(function(o){return t==='mas'?!enBarra[o.t]:o.t===t});
  conT.sort(function(a,b){return (AV_URG.test(b.x)?1:0)-(AV_URG.test(a.x)?1:0)});return conT[0]?conT[0].x:null})}
window.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('nav.tabs button[data-t]');if(!b||S.role!=='admin'||!b.querySelector('.tbadge'))return;var t=b.dataset.t;if(S.tab[S.role]!==t)return;/* 1er toque: lo de siempre */
 e.preventDefault();e.stopImmediatePropagation();
 if(t==='inicio'){var pa=Array.prototype.filter.call(document.querySelectorAll('main > .card'),function(c){var x=c.querySelector('.tt');return x&&/^Por atender/.test(x.textContent)})[0];if(pa){try{pa.scrollIntoView({block:'start',behavior:'smooth'})}catch(er){}pa.classList.remove('avfoco');void pa.offsetWidth;pa.classList.add('avfoco');setTimeout(function(){pa.classList.remove('avfoco')},3000)}return}
 var x=tabPend48(t);if(!x){toast('Ya no hay pendientes aquí');return}var g=document.createElement('button');g.dataset.act='avgo';g.dataset.k=encodeURIComponent(x);g.style.display='none';(document.querySelector('main')||document.body).appendChild(g);try{g.click()}finally{g.remove()}},true);
