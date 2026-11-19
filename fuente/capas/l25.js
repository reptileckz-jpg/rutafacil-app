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
/* vwBasc: pasó a tema-viaje.js */
/* vwNodos: pasó a tema-viaje.js */
/* barra escondida durante el viaje */
/* render: pasó a tema-dibujar1.js */
/* burbujas minimizadas juntas en una esquina */
/* vwBurbuja: pasó a tema-viaje.js */
/* avisos: no salen antes de entrar (pantalla de carga, PIN o elegir usuario); el de "no cuadra" solo al admin y al contador */
var _toastQ=[];
function avisoBloq(t){if(typeof _cargado!=='undefined'&&!_cargado)return true;var auto=t==null||/^⚠|URGENTE|no cuadra/.test(t);return auto&&((typeof _pin!=='undefined'&&_pin.modo==='entrar')||!!S.usrSel)}
/* toast: pasó a tema-toast.js */
/* render: pasó a tema-dibujar1.js */
/* el aviso de cajas en palabras claras */
/* cuentasRevisar: pasó a tema-sueltas.js */
/* toast: pasó a tema-toast.js */
