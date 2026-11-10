/* ===================== v7.2 · parte 2: pantalla
   3 billetes no se cierran · 5 un solo "?" · 6 burbuja ¿Qué sigue? solo cuando no estorba · 7 toda foto se abre en grande
   14 sin pantalla de "Comenzar" · 15 orden al abrir: PIN → avisos urgentes → tutorial · 17 tarjetas urgentes: "Atender" sí lleva ===================== */

/* ---------- 3 · "Contar por billetes": se queda abierto mientras el chofer lo tenga abierto ---------- */
document.addEventListener('toggle',function(e){var d=e.target;if(!d||!d.matches||!d.matches('details[data-k="efbilld"]')||!S.cierre)return;S.cierre.billAb=d.open},true);
var _rd59a=render;render=function(){var r=_rd59a.apply(this,arguments);try{var d=document.querySelector('details[data-k="efbilld"]');if(d&&S.cierre&&S.cierre.billAb!=null&&d.open!==!!S.cierre.billAb)d.open=!!S.cierre.billAb}catch(e){}return r};

/* ---------- 5 · un solo "?" en el encabezado ---------- */
var _rd59b=render;render=function(){var r=_rd59b.apply(this,arguments);try{var h=document.querySelector('header.top .brand');if(h){var q=h.querySelectorAll('.qbtn');Array.prototype.forEach.call(q,function(x){x.remove()})}}catch(e){}return r};
/* el "?" que queda: si la pantalla tiene guía, enseña "¿Qué sigue?" con Muéstrame; si no, la ayuda de siempre */
window.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('header.top [data-act="help"]');if(!b)return;try{if(typeof guiaTip==='function'&&guiaTip()){e.preventDefault();e.stopImmediatePropagation();guiaBurbuja(true)}}catch(er){}},true);

/* ---------- 6 · la burbuja no sale mientras haces algo, y nunca tapa los botones de abajo ---------- */
(function(){var st=document.createElement('style');st.textContent='#guiab{top:calc(74px + var(--sbar,0px));bottom:auto!important}';document.head.appendChild(st)})();
['pointerdown','touchmove','wheel','focusin'].forEach(function(ev){window.addEventListener(ev,function(e){if(e.target&&e.target.closest&&e.target.closest('#guiab'))return;try{_guiaT=Date.now()}catch(er){}},{capture:true,passive:true})});
var _gL59=guiaLibre;guiaLibre=function(){if(!_gL59.apply(this,arguments))return false;try{
 if(!pnArranqueListo())return false;
 var a=document.activeElement;if(a&&/INPUT|TEXTAREA|SELECT/.test(a.tagName))return false;
 if(document.querySelector('.wz-nav,#medov,#fotov,#fgov,#tutov'))return false;
 if(S.role==='rep'&&/^(entrega|cierre)$/.test(S.tab.rep))return false;
 return true}catch(e){return false}};
/* si empieza a escribir o deslizar con la burbuja puesta, se quita sola */
['input','touchmove','wheel'].forEach(function(ev){window.addEventListener(ev,function(e){if(e.target&&e.target.closest&&e.target.closest('#guiab'))return;try{var o=document.getElementById('guiab');if(o&&!o.dataset.forzada)o.remove()}catch(er){}},{capture:true,passive:true})});

/* ---------- 7 · toda foto en miniatura se abre en grande (también en el cierre que recibe el admin) ---------- */
var _fZ59=fotoZoomable;fotoZoomable=function(im){if(_fZ59.apply(this,arguments))return true;try{
 if(!im||im.tagName!=='IMG'||im.closest('#fotov,#fgov,#tutov,#pinov,#pncubre,nav,header,label,[data-act],a,.tklogo,.logo,#bienv,#arr,.bv-stage,.gmhole'))return false;
 if(im.classList.contains('tic'))return false;var s=im.getAttribute('src')||'';if(!/^(data:image\/(jpe?g|webp)|blob:|https?:)/i.test(s))return false;
 var r=im.getBoundingClientRect();return r.width>=36&&r.height>=36}catch(e){return false}};

/* ---------- 14 · ya no sale la pantalla de "Comenzar": entra directo ---------- */
bienvMostrar=function(){try{if(S.setup)S.setup.bienv=true;localStorage.setItem('bienvCel','1')}catch(e){}};

/* ---------- 15 · orden al abrir: logo → PIN/huella → avisos urgentes → hasta entonces tutorial o "¿Qué sigue?" ---------- */
function pnHayUrgentes(){try{return !!(typeof popHTML==='function'&&popHTML())}catch(e){return false}}
function pnArranqueListo(){try{if(_pin&&_pin.modo)return false;if(document.querySelector('#arr,#bienv,#nbov,#setov,#permov,#pxov,#pinov,#medov'))return false;if(S.setup&&!S.setup.fin)return false;
 if(pnHayUrgentes())return false;return true}catch(e){return false}}
var _tutPend59=null;
var _rd59c=render;render=function(){
 try{if(S.tut&&!S.tut._ok&&!pnArranqueListo()){_tutPend59=S.tut;S.tut=null}
  else if(!S.tut&&_tutPend59&&pnArranqueListo()){S.tut=_tutPend59;S.tut._ok=1;_tutPend59=null}
  else if(S.tut&&!S.tut._ok)S.tut._ok=1}catch(e){}
 return _rd59c.apply(this,arguments)};
setInterval(function(){try{if(_tutPend59&&pnArranqueListo())render()}catch(e){}},1500);

/* ---------- 17 · tarjetas URGENTE: una a la vez, y "Atender" sí te lleva ---------- */
/* antes: al atender salía la siguiente tarjeta encima del lugar a donde te llevó (parecía que no hacía nada), y a veces se brincaba una */
var _popSigT=0,_popPausa=null,_popUlt='';
/* qué botón de la tarjeta se tocó (las que resuelven ahí mismo no pausan) */
window.addEventListener('pointerdown',function(e){var b=e.target.closest&&e.target.closest('[data-pop],[data-act="popdesp"]');if(b)_popUlt=b.dataset.act},true);
window.addEventListener('keydown',function(e){var b=e.target.closest&&e.target.closest('[data-pop],[data-act="popdesp"]');if(b)_popUlt=b.dataset.act},true);
function popCasa(){return (typeof NAV_CASA!=='undefined'&&NAV_CASA[S.role])||'inicio'}
var _popS59=popSig;popSig=function(){if(Date.now()-_popSigT<450)return;_popSigT=Date.now();
 if(!/^(popdesp|precioayer|inspok|inspno)$/.test(_popUlt||''))_popPausa={t:Date.now(),salio:false};_popUlt='';return _popS59.apply(this,arguments)};
/* la siguiente tarjeta sale hasta que regresa a Inicio (o, si lo mandó a Inicio mismo, después de un rato) */
var _popH59=popHTML;popHTML=function(){var P=_popPausa;if(P){var casa=S.tab[S.role]===popCasa()&&!document.querySelector('#fiov,#rcov,#wzov,#eqov,#cxov,#ajov,#medov,#cvov');if(!casa)P.salio=true;
  if(casa&&(P.salio||Date.now()-P.t>90000))_popPausa=null;else return ''}return _popH59.apply(this,arguments)};
var _rd59d=render;render=function(){try{if(_popPausa&&S.tab[S.role]!==popCasa())_popPausa.salio=true}catch(e){}return _rd59d.apply(this,arguments)};
setInterval(function(){try{if(_popPausa&&Date.now()-_popPausa.t>90000&&S.tab[S.role]===popCasa())render()}catch(e){}},15000);
