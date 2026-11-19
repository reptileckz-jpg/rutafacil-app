/* ===================== v7.2 · parte 2: pantalla
   3 billetes no se cierran · 5 un solo "?" · 6 burbuja ¿Qué sigue? solo cuando no estorba · 7 toda foto se abre en grande
   14 sin pantalla de "Comenzar" · 15 orden al abrir: PIN → avisos urgentes → tutorial · 17 tarjetas urgentes: "Atender" sí lleva ===================== */

/* ---------- 3 · "Contar por billetes": se queda abierto mientras el chofer lo tenga abierto ---------- */
document.addEventListener('toggle',function(e){var d=e.target;if(!d||!d.matches||!d.matches('details[data-k="efbilld"]')||!S.cierre)return;S.cierre.billAb=d.open},true);
/* render: pasó a tema-dibujar1.js */

/* ---------- 5 · un solo "?" en el encabezado ---------- */
/* render: pasó a tema-dibujar1.js */
/* el "?" que queda: si la pantalla tiene guía, enseña "¿Qué sigue?" con Muéstrame; si no, la ayuda de siempre */
window.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('header.top [data-act="help"]');if(!b)return;try{if(typeof guiaTip==='function'&&guiaTip()){e.preventDefault();e.stopImmediatePropagation();guiaBurbuja(true)}}catch(er){}},true);

/* ---------- 6 · la burbuja no sale mientras haces algo, y nunca tapa los botones de abajo ---------- */
(function(){var st=document.createElement('style');st.textContent='#guiab{top:calc(74px + var(--sbar,0px));bottom:auto!important}';document.head.appendChild(st)})();
['pointerdown','touchmove','wheel','focusin'].forEach(function(ev){window.addEventListener(ev,function(e){if(e.target&&e.target.closest&&e.target.closest('#guiab'))return;try{_guiaT=Date.now()}catch(er){}},{capture:true,passive:true})});
/* guiaLibre: pasó a tema-guia.js */
/* si empieza a escribir o deslizar con la burbuja puesta, se quita sola */
['input','touchmove','wheel'].forEach(function(ev){window.addEventListener(ev,function(e){if(e.target&&e.target.closest&&e.target.closest('#guiab'))return;try{var o=document.getElementById('guiab');if(o&&!o.dataset.forzada)o.remove()}catch(er){}},{capture:true,passive:true})});

/* ---------- 7 · toda foto en miniatura se abre en grande (también en el cierre que recibe el admin) ---------- */
/* fotoZoomable: pasó a tema-vehiculos.js */

/* ---------- 14 · ya no sale la pantalla de "Comenzar": entra directo ---------- */
bienvMostrar=function(){try{if(S.setup)S.setup.bienv=true;localStorage.setItem('bienvCel','1')}catch(e){}};

/* ---------- 15 · orden al abrir: logo → PIN/huella → avisos urgentes → hasta entonces tutorial o "¿Qué sigue?" ---------- */
function pnHayUrgentes(){try{return !!(typeof popHTML==='function'&&popHTML())}catch(e){return false}}
function pnArranqueListo(){try{if(_pin&&_pin.modo)return false;if(document.querySelector('#arr,#bienv,#nbov,#setov,#permov,#pxov,#pinov,#medov'))return false;if(S.setup&&!S.setup.fin)return false;
 if(pnHayUrgentes())return false;return true}catch(e){return false}}
var _tutPend59=null;
/* render: pasó a tema-dibujar1.js */
/* 113 · solo si de verdad ya puede salir (sin otro tutorial puesto): antes, con otro tutorial en pantalla, redibujaba cada 1.5 s sin fin (parpadeo) */
setInterval(function(){try{if(_tutPend59&&!S.tut&&pnArranqueListo())render()}catch(e){}},1500);

/* ---------- 17 · tarjetas URGENTE: una a la vez, y "Atender" sí te lleva ---------- */
/* antes: al atender salía la siguiente tarjeta encima del lugar a donde te llevó (parecía que no hacía nada), y a veces se brincaba una */
var _popSigT=0,_popPausa=null,_popUlt='';
/* qué botón de la tarjeta se tocó (las que resuelven ahí mismo no pausan) */
window.addEventListener('pointerdown',function(e){var b=e.target.closest&&e.target.closest('[data-pop],[data-act="popdesp"]');if(b)_popUlt=b.dataset.act},true);
window.addEventListener('keydown',function(e){var b=e.target.closest&&e.target.closest('[data-pop],[data-act="popdesp"]');if(b)_popUlt=b.dataset.act},true);
function popCasa(){return (typeof NAV_CASA!=='undefined'&&NAV_CASA[S.role])||'inicio'}
/* popSig: pasó a tema-guia.js */
/* la siguiente tarjeta sale hasta que regresa a Inicio (o, si lo mandó a Inicio mismo, después de un rato) */
/* popHTML: pasó a tema-inicio.js */
/* render: pasó a tema-dibujar1.js */
setInterval(function(){try{if(_popPausa&&Date.now()-_popPausa.t>90000&&S.tab[S.role]===popCasa())render()}catch(e){}},15000);
