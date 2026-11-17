/* ===================== TEMA · Cargar más estando en ruta (nació como tema, 17 nov · punto 110) =====================
   Antes, "Cargar más mercancía" preguntaba de una vez cuánto más cargaste. Ahora primero pregunta "¿Vas a la bodega por más?":
   - Sí → en su ruta sale la parada extra "🏭 Bodega" como la siguiente (con "Cómo llegar"). Al llegar, "Ya llegué" abre la captura
     de lo que cargó; al registrarla, la parada se quita sola y sigue con el cliente que le tocaba.
   - No (se lo llevaron, o ya lo trae) → la captura de siempre (la ventana de l32 con cuánto cargaste y la foto).
   La parada no es un cliente: no entra a la lista de clientes, ni al orden con tráfico, ni a las entregas.
   Si se cambia algo de esto, se cambia AQUÍ.
   ============================================================================================ */
function bodLugar110(){try{var b=(S.bods||[]).filter(function(x){return +x.id===+(S.bodSel||1)})[0]||(S.bods||[])[0];if(b&&b.lat!=null&&b.lng!=null)return {n:b.n||'la bodega',lat:+b.lat,lng:+b.lng}}catch(e){}return {n:'la bodega',lat:null,lng:null}}
function enRuta110(){return S.role==='rep'&&S.salida&&S.salida.ok&&!(S.cierre&&S.cierre.sent)}
/* la pregunta, antes de capturar */
function cm110HTML(){if(!S.cm110)return '';
 return ovW70('cm110ov','Cargar más','<div class="card" style="padding:14px"><div style="font-size:21px;font-weight:900">¿Vas a la bodega por más?</div><div style="font-size:16px;margin-top:6px">Si vas, te la pongo como tu siguiente parada y luego sigues con el cliente que te tocaba.</div></div>'
  +'<button class="btn big" data-act="cm110si">🏭 Sí, llévame a la bodega</button><button class="btn sec big" data-act="cm110no">No, ya lo traigo (me lo llevaron)</button><button class="btn sec big" data-act="cm110x">Regresar</button>','cm110x')}
/* la parada en la ruta */
function bodCard110(){var x=S.bod110;if(!x)return;if(x.f!==iso(TODAY)||!enRuta110()){S.bod110=null;return}
 if(num((S.extras||[]).length)>num(x.n0)){var i=curStop(),c=i>=0&&S.stops[i]?cl(S.stops[i].c):null;S.bod110=null;toast('Listo: carga registrada'+(c?'. Sigue con '+c.n:''));return}
 if(S.tab.rep!=='ruta')return;var m=document.querySelector('main');if(!m||m.querySelector('[data-x="bod110"]'))return;var B=bodLugar110(),i2=curStop(),sig=i2>=0&&S.stops[i2]?cl(S.stops[i2].c):null;
 var d=document.createElement('div');d.className='card';d.dataset.x='bod110';d.setAttribute('style','padding:14px;border:3px solid #1E3A8A;background:color-mix(in srgb,#1E3A8A 8%,var(--surface))');
 d.innerHTML='<div class="lbl" style="font-weight:800;color:#1E3A8A">TU SIGUIENTE PARADA</div><div style="font-size:21px;font-weight:900;margin-top:2px">🏭 Bodega · a cargar más</div>'
  +(sig?'<div style="font-size:16px;margin-top:4px">Después sigues con <b>'+esc(sig.n)+'</b>.</div>':'')
  +(B.lat!=null?'<a class="btn sec" style="margin-top:10px;min-height:54px;display:flex;align-items:center;justify-content:center" href="https://www.google.com/maps/dir/?api=1&destination='+B.lat+','+B.lng+'" target="_blank" rel="noopener">📍 Cómo llegar</a>':'')
  +'<button class="btn" style="margin-top:8px;min-height:58px;font-size:18px" data-act="bod110ya">Ya llegué: capturar lo que cargué</button><button class="btn sec" style="margin-top:8px" data-act="bod110x">Ya no voy a la bodega</button>';
 var h=m.querySelector('.hola89, .hello');if(h)h.after(d);else m.prepend(d)}
/* la captura de siempre (la ventana de l32: cuánto cargaste y la foto) */
function abreExtra110(){S.tab.rep='ruta';S.cx={R:'',M:'',foto:null,k:'carga'};render()}
/* "Cargar más mercancía" (la tarjeta o el botón) primero pregunta */
window.addEventListener('click',function(e){var t=e.target;if(!t||!t.closest||!enRuta110()||S.bod110)return;
 var sm=t.closest('[data-k="extra"]>summary'),ab=t.closest('[data-act="abrirextra"],[data-act="cxabre"]');if(!sm&&!ab)return;if(sm){var dt=sm.parentElement;if(dt&&dt.open)return}
 e.preventDefault();e.stopImmediatePropagation();S.cm110=1;render()},true);
document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act="cm110si"],[data-act="cm110no"],[data-act="cm110x"],[data-act="bod110ya"],[data-act="bod110x"]');if(!b)return;e.preventDefault();e.stopImmediatePropagation();var a=b.dataset.act;S.cm110=null;
 if(a==='cm110x'){render();return}
 if(a==='cm110no'){abreExtra110();return}
 if(a==='cm110si'){S.bod110={f:iso(TODAY),h:hhmm(),n0:(S.extras||[]).length};S.tab.rep='ruta';render();window.scrollTo(0,0);try{S.hist.push({t:fmtF(iso(TODAY))+' '+hhmm(),q:chofN(S.chofHoy),x:'Va a la bodega a cargar más'})}catch(er){}return}
 if(a==='bod110ya'){abreExtra110();return}
 if(a==='bod110x'){S.bod110=null;render();return}},true);
try{if(typeof AR_K!=='undefined'&&AR_K.indexOf('bod110')<0)AR_K.push('bod110')}catch(e){}
