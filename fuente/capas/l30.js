/* ===================== v6.0 · Vehículos sin "nombre": se arma con marca, modelo y año ===================== */
function vehNomDe(f){var p=[f.marca,f.modelo,f.anio].map(function(x){return String(x==null?'':x).trim()}).filter(Boolean);return p.join(' ')}
var VEH_TRES=function(pre,f,camp){return camp('marca','Marca','text','ej. Nissan')+camp('modelo','Modelo','text','ej. NP300')+camp('anio','Año','number','ej. 2020')};
/* configuración inicial */
/* setupHTML: pasó a tema-ajustes.js */
/* Vehículos (admin) */
/* vForm: pasó a tema-vehiculos.js */
/* el nombre se arma solo antes de guardar */
function vehNomFix(){try{var U=S.setup&&S.setup.vf;if(U){var n=vehNomDe(U);if(n)U.n=n}if(S.vf){var n2=vehNomDe(S.vf);if(n2)S.vf.n=n2}}catch(e){}}
document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act]');if(!b)return;if(['suadd','sunext','vsave','sufin'].indexOf(b.dataset.act)>-1)vehNomFix()},true);
document.addEventListener('input',function(e){var t=e.target;if(t&&t.dataset&&/(^|\.)vf\.(marca|modelo|anio)$/.test(t.dataset.bind||''))setTimeout(vehNomFix,0)},true);
/* ===================== Avisos encima de todo, nada de "simular" en la versión real ===================== */
(function(){var st=document.createElement('style');st.textContent=[
 '.toast{z-index:260!important}',
 'html.real [data-act*="demo"],html.real [data-act="llamada"],html.real [data-act="senal"]{display:none!important}'
].join('\n');document.head.appendChild(st)})();
/* ===================== Tutorial: mueve la pantalla hasta lo que explica y no lo tapa ===================== */
function tutBlanco(st){var el=null;st[0].split(',').some(function(sel){var L=document.querySelectorAll(sel.trim());for(var i=0;i<L.length;i++){var x=L[i],r=x.getBoundingClientRect();if(r.height>0&&r.width>0&&!x.closest('details:not([open])')){el=x;return true}}return false});return el}
function tutScrollPadre(el){for(var p=el.parentElement;p&&p!==document.body;p=p.parentElement){var oy=getComputedStyle(p).overflowY;if((oy==='auto'||oy==='scroll')&&p.scrollHeight>p.clientHeight)return p}return null}
tutHTML=function(quieto){var t=S.tut;if(!t||_pin.modo||$('setov')||$('nbov'))return '';var L=TUT[t.k],st=L[t.i];if(!st){S.tut=null;return ''}if(/nav\.tabs/.test(st[0])){document.documentElement.classList.remove('navhid');try{navHid=false}catch(e){}}
 var el=tutBlanco(st),H=window.innerHeight,W=window.innerWidth;
 if(el&&!quieto&&getComputedStyle(el).position!=='fixed'){var r0=el.getBoundingClientRect(),zona=[90,H-260];if(r0.top<zona[0]||r0.bottom>zona[1]){var d=r0.top-Math.max(90,(H-r0.height)/2-80),c=tutScrollPadre(el);try{if(c)c.scrollBy({top:d,behavior:'instant'});else window.scrollBy({top:d,behavior:'instant'})}catch(e){if(c)c.scrollTop+=d;else window.scrollBy(0,d)}}}
 var r=el?el.getBoundingClientRect():{left:W/2-40,top:H/2-40,width:80,height:80,bottom:H/2+40};
 var pad=6,arriba=r.top,abajo=H-r.bottom,ponArriba=arriba>abajo;
 var pos=ponArriba?'bottom:'+Math.max(16,H-r.top+pad+12)+'px':'top:'+Math.min(H-200,r.bottom+pad+12)+'px';
 if(r.height>H*0.6)pos='bottom:16px';
 var bub='<div class="bub" style="'+pos+'"><div class="lbl">'+(t.i+1)+' de '+L.length+'</div><b style="font-size:18px">'+esc(st[1])+'</b><div style="font-size:15px;margin-top:4px">'+esc(st[2])+'</div><div style="display:flex;gap:8px;margin-top:12px"><button class="btn sec" style="flex:1" data-act="tutfin">Saltar</button><button class="btn" style="flex:1" data-act="tutsig">'+(t.i<L.length-1?'Siguiente':'Listo')+'</button></div></div>';
 var hand='<svg class="hand" viewBox="0 0 48 48" style="left:'+(r.left+r.width/2-6)+'px;top:'+(r.top+Math.min(r.height,120)/2-6)+'px'+(st[3]==='swipe'?';animation:pnSwipe 1.6s ease-in-out infinite':'')+'"><path d="M18 22V8a3 3 0 0 1 6 0v12l2-1a3 3 0 0 1 4 1l1 2 1-.5a3 3 0 0 1 4 1.5l.6 1.4a3 3 0 0 1 4 2L42 34c0 7-5 12-12 12h-3c-4 0-7-2-9-5l-7-10a3 3 0 0 1 5-3z" fill="#fff" stroke="#1E2A1A" stroke-width="2.2" stroke-linejoin="round"/></svg>';
 return '<div id="tutov"><div class="hole" style="left:'+(r.left-pad)+'px;top:'+(r.top-pad)+'px;width:'+(r.width+pad*2)+'px;height:'+(r.height+pad*2)+'px"></div>'+hand+bub+'</div>'};
/* si la pantalla se mueve, el hueco y el globo la siguen */
var _tutT=null;function tutReacomoda(mover){if(!S.tut)return;clearTimeout(_tutT);_tutT=setTimeout(function(){var o=document.getElementById('tutov');if(!o)return;var h=tutHTML(!mover);if(!h)return;var w=document.createElement('div');w.innerHTML=h;var n=w.firstElementChild;o.querySelector('.hole').setAttribute('style',n.querySelector('.hole').getAttribute('style'));o.querySelector('.bub').setAttribute('style',n.querySelector('.bub').getAttribute('style'));var hd=o.querySelector('.hand');if(hd)hd.setAttribute('style',n.querySelector('.hand').getAttribute('style'))},80)}
window.addEventListener('scroll',function(){tutReacomoda(false)},true);window.addEventListener('resize',function(){tutReacomoda(false)});
var _tutUlt='',_r30t=render;render=function(){var r=_r30t.apply(this,arguments);var k=S.tut?S.tut.k+':'+S.tut.i:'';if(k&&k!==_tutUlt){setTimeout(function(){tutReacomoda(true)},380)}_tutUlt=k;return r};
/* pasos del tutorial del chofer apuntando a lo que de verdad hay en su pantalla */
TUT.rep=[['[data-act="iniciar"], [data-act="insprep"], .card.next, [data-act="calle"], main .card','Empieza tu día','Revisa el vehículo, toma las fotos y empieza la ruta. Después aquí sale tu siguiente parada.'],['nav.tabs button[data-t="entrega"]','Entrega','Aquí capturas lo que le dejas al cliente y lo que te paga.'],['[data-act="gxsheet"], nav.tabs button[data-t="ruta"]','Gastos','Comida, caseta, ponchadura o combustible: regístralo aquí. Se descuenta de lo que entregas.'],['nav.tabs button[data-t="cierre"]','Cierre','Al terminar, haz tu cierre y entrega el efectivo.'],['nav.tabs','Deslizar','También puedes cambiar de sección deslizando el dedo a los lados.','swipe']];
/* ===================== Botón/gesto de atrás en el APK (Capacitor) =====================
   En el APK el "atrás" no pasa por el historial del navegador: si no se atiende, Android cierra la app.
   Aquí se atiende: regresa a la pantalla anterior; en la principal, la 1a vez avisa y la 2a minimiza. */
(function(){var C=window.Capacitor,A=C&&C.Plugins&&C.Plugins.App;if(!A||!A.addListener)return;var ult=0;
 A.addListener('backButton',function(){try{var vw=document.getElementById('vwov');if(vw&&!navVentana()){var x=vw.querySelector('[data-act="vwx"]');if(x){x.click();return}}if(navAtras()){ult=0;return}}catch(e){}
  var now=Date.now();if(now-ult<2500){ult=0;try{(A.minimizeApp||A.exitApp).call(A)}catch(e){}return}ult=now;toast('Toca atrás otra vez para salir')})})();
