/* ===================== v5.1 · Viaje sin báscula, barra, burbujas minimizadas y avisos al abrir ===================== */
(function(){var st=document.createElement('style');st.textContent=[
 /* durante el viaje no se ve la barra de secciones */
 'html.vwab nav.tabs{display:none!important}',
 /* la barra siempre hasta abajo aunque la pantalla tenga poco contenido */
 '@media (max-width:999px){main{min-height:calc(100vh - var(--hdrH,72px) - 96px);min-height:calc(100dvh - var(--hdrH,72px) - 96px)}}',
 /* burbujas minimizadas: flotan a la derecha y no ocupan lugar */
 '.mindock{position:fixed;right:max(12px,env(safe-area-inset-right,0px));top:calc(var(--hdrH,72px) + 8px);z-index:12;display:flex;flex-direction:column;align-items:flex-end;gap:6px;pointer-events:none}',
 '.mindock>button{pointer-events:auto;padding:7px 12px!important;font-size:14px!important;min-height:38px}'
].join('\n');document.head.appendChild(st)})();
/* si no hay báscula registrada (o no tiene ubicación) el viaje sigue: antes la pantalla se quedaba en blanco */
var _vb25=vwBasc;vwBasc=function(p){var b=_vb25.apply(this,arguments);if(b||vwPes(p))return b;return {id:null,n:'Báscula',lat:null,lng:null}};
var _vn25=vwNodos;vwNodos=function(v){var N=_vn25.apply(this,arguments);
 N.forEach(function(x,i){if(x.lat==null||x.lng==null||isNaN(x.lat)||isNaN(x.lng)){var pr=N.filter(function(y){return y.t==='prov'&&y.i===x.i})[0];x.lat=pr&&pr.lat!=null?pr.lat-.02:BOD.lat+.28;x.lng=pr&&pr.lng!=null?pr.lng-.02:BOD.lng+.28}});return N};
/* barra escondida durante el viaje */
var _r25=render;render=function(){var vo=!!(S.vw&&S.vw.open);document.documentElement.classList.toggle('vwab',vo);return _r25.apply(this,arguments)};
/* burbujas minimizadas juntas en una esquina */
var _vwB25=vwBurbuja;vwBurbuja=function(){var h=_vwB25.apply(this,arguments),ch=[];
 h=h.replace(/<div class="dfmini"[^>]*>(<button[\s\S]*?<\/button>)<\/div>/,function(m,b){ch.push(b);return ''});
 h=h.replace(/<div style="display:flex;justify-content:flex-end">(<button class="popin[^"]*" data-act="bubmax"[\s\S]*?<\/button>)<\/div>/,function(m,b){ch.push(b);return ''});
 return h+(ch.length?'<div class="mindock">'+ch.join('')+'</div>':'')};
/* avisos: no salen antes de entrar (pantalla de carga, PIN o elegir usuario); el de "no cuadra" solo al admin y al contador */
var _toastQ=[];
function avisoBloq(t){if(typeof _cargado!=='undefined'&&!_cargado)return true;var auto=t==null||/^⚠|URGENTE|no cuadra/.test(t);return auto&&((typeof _pin!=='undefined'&&_pin.modo==='entrar')||!!S.usrSel)}
var _t25=toast;toast=function(t){if(/no cuadra/.test(t||'')&&['admin','cont'].indexOf(S.role)<0)return;if(avisoBloq(t)){if(t&&_toastQ.indexOf(t)<0)_toastQ.push(t);return}return _t25.apply(this,arguments)};
var _r25b=render;render=function(){var r=_r25b.apply(this,arguments);if(_toastQ.length&&!avisoBloq()){var q=_toastQ.slice();_toastQ=[];setTimeout(function(){q.forEach(function(t,i){setTimeout(function(){toast(t)},i*2400)})},400)}return r};
/* el aviso de cajas en palabras claras */
var _cr25=cuentasRevisar;cuentasRevisar=function(){var R=_cr25.apply(this,arguments);R.forEach(function(x){if(x.n==='Ninguna caja se pierde sin registrarse'){x.n='Todas las cajas están contadas';if(!x.ok){var m=/hay (-?\d+) y deberían ser (-?\d+)/.exec(x.det||'');if(m){var d=+m[2]-+m[1];x.det=(d>0?'Faltan '+d:'Sobran '+(-d))+' cajas: deberían ser '+m[2]+' y la app cuenta '+m[1]}}}});return R};
var _tq25=toast;toast=function(t){var m=/^⚠ Algo no cuadra: Todas las cajas están contadas/.test(t||'');if(m){try{var x=cuentasRevisar().filter(function(y){return y.n==='Todas las cajas están contadas'})[0];if(x&&x.det)t='⚠ Las cajas no cuadran. '+x.det+'. Revísalo en Estadísticas.'}catch(e){}}return _tq25.call(this,t)};
