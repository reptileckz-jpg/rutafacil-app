/* ===================== v7.7 · 31 URGENTE: la app nunca se queda atorada ni en blanco (12 nov)
   - si algo se rompe al cargar los datos de la nube, la app se salta esa parte y deja entrar (con el PIN)
   - si algo se rompe al dibujar, cierra lo que estaba abierto y regresa a Inicio; si sigue fallando, enseña
     "La app encontró un problema" con Reintentar, Mandar el error y Volver a bajar los datos de la nube
   - una ventana abierta de un viaje que ya terminó se cierra sola ("Ese viaje ya terminó")
   - el error queda anotado (Ajustes → Problemas reportados) para poder arreglar la causa ===================== */
var FALLO77={n:0,ult:null,enRender:false};
function falloTxt77(e,donde){var m=(e&&(e.message||String(e)))||'error',st=String(e&&e.stack||'').split('\n').slice(0,6).join('\n');
 var r='';try{r=(S.role||'')+' · '+(S.tab&&S.tab[S.role]||'')}catch(x){}return 'Ruta Fácil · '+donde+' · '+new Date().toLocaleString('es-MX')+'\n'+r+'\n'+m+'\n'+st}
function falloAnota77(e,donde){var t=falloTxt77(e,donde);FALLO77.ult=t;FALLO77.n++;try{console.error('fallo77',donde,e)}catch(x){}
 try{localStorage.setItem('pnFallo',t)}catch(x){}try{if(typeof apErr==='function')apErr('fallo',String(e&&e.message||e).slice(0,200),donde)}catch(x){}return t}
/* pantalla de rescate: no depende de nada de la app */
function falloPantalla77(t){try{var o=document.getElementById('fallo77');if(o)o.remove();o=document.createElement('div');o.id='fallo77';
 o.setAttribute('style','position:fixed;inset:0;z-index:200;background:#F6F1E3;color:#1E2A1A;overflow:auto;font-family:system-ui,sans-serif');
 o.innerHTML='<div style="max-width:480px;margin:0 auto;padding:28px 18px 40px"><div style="font-size:44px;text-align:center">🛠️</div><h1 style="font-size:24px;text-align:center;margin:8px 0">La app encontró un problema</h1>'
  +'<p style="font-size:17px;line-height:1.4;text-align:center">No se perdió nada del negocio. Prueba "Reintentar". Si sigue igual, manda el error para arreglarlo.</p>'
  +'<button data-f77="re" style="display:block;width:100%;min-height:58px;margin-top:14px;border:0;border-radius:16px;background:#2F7D32;color:#fff;font-size:19px;font-weight:800">Reintentar</button>'
  +'<button data-f77="wa" style="display:block;width:100%;min-height:54px;margin-top:10px;border:2px solid #2F7D32;border-radius:16px;background:#fff;color:#2F7D32;font-size:17px;font-weight:800">📲 Mandar el error por WhatsApp</button>'
  +'<button data-f77="nube" style="display:block;width:100%;min-height:54px;margin-top:10px;border:2px solid #B45309;border-radius:16px;background:#fff;color:#B45309;font-size:17px;font-weight:800">☁️ Volver a bajar los datos de la nube</button>'
  +'<div style="font-size:13px;color:#555;margin-top:6px;text-align:center">Borra lo guardado en este celular y vuelve a bajar todo de la nube. Lo que no se haya subido se pierde.</div>'
  +'<details style="margin-top:16px"><summary style="font-size:14px;color:#555">Ver el error</summary><pre style="white-space:pre-wrap;font-size:12px;background:#fff;border-radius:10px;padding:10px">'+String(t).replace(/[<>&]/g,function(c){return {'<':'&lt;','>':'&gt;','&':'&amp;'}[c]})+'</pre></details></div>';
 document.body.appendChild(o)}catch(x){}}
document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-f77]');if(!b)return;e.stopImmediatePropagation();e.preventDefault();var a=b.dataset.f77,t=FALLO77.ult||'';try{t=t||localStorage.getItem('pnFallo')||''}catch(x){}
 if(a==='re'){location.reload();return}
 if(a==='wa'){var u='https://wa.me/?text='+encodeURIComponent(t.slice(0,1800));try{window.open(u,'_system')}catch(x){location.href=u}return}
 if(a==='nube'){if(!confirm('¿Seguro? Se borra lo guardado en este celular y se vuelve a bajar todo de la nube.'))return;var fin=function(){try{localStorage.setItem('pnFalloNube','1')}catch(x){}location.reload()};
  var listo=false,f2=function(){if(listo)return;listo=true;fin()};try{window._noGuardar77=1;idbAbrir(function(db){if(!db)return f2();try{var tx=db.transaction('kv','readwrite');tx.objectStore('kv').delete('S');tx.oncomplete=f2;tx.onerror=f2}catch(x){f2()}});setTimeout(f2,3000)}catch(x){f2()}}},true);
/* mientras se borra, que no se vuelva a guardar */
if(typeof guardarYa==='function'){var _gY77=guardarYa;guardarYa=function(){if(window._noGuardar77)return;return _gY77.apply(this,arguments)}}
/* deja la pantalla en un lugar seguro: cierra todo lo abierto y regresa a Inicio */
function falloSeguro77(){try{var r=S.role;['fi','openCarga','vehOpen','openCli','openProv','openCh','modal','wz','ub68','lt53','tag76','im75','ip74','pe74','fv76','fl76','may71','tar72','cvOpen','vjOpen','px','ub','gx','cm','rcv','rp','dfOpen','blov','p57','rp56'].forEach(function(k){if(S[k]!=null&&S[k]!==false)S[k]=k==='dfOpen'?false:null});
 S.aj=false;S.menu=false;if(S.vws&&S.vw&&S.vws.indexOf(S.vw)<0)S.vw=null;if(S.tab&&r)S.tab[r]=r==='rep'?'ruta':'inicio'}catch(x){}}
/* el viaje que estaba abierto ya no existe (lo terminó el chofer en su celular) */
function vwVivo77(){try{if(!S.vw||!S.vws)return;if(S.vws.indexOf(S.vw)>-1)return;var cid=S.vw.cid,o=S.vws.filter(function(v){return v.cid!=null&&v.cid===cid})[0];if(o){S.vw=o;S.vwI=S.vws.indexOf(o);return}
 var ab=!!S.vw.open;S.vw=S.vws[0]||null;S.vwI=0;if(ab&&S.role==='admin')setTimeout(function(){try{toast('Ese viaje ya terminó')}catch(x){}},50)}catch(x){}}
var _rd77=render;render=function(){if(FALLO77.enRender)return;try{vwVivo77()}catch(x){}
 try{return _rd77.apply(this,arguments)}catch(e){var t=falloAnota77(e,'al dibujar');FALLO77.enRender=true;
  try{falloSeguro77();_rd77.apply(this,arguments);FALLO77.enRender=false;setTimeout(function(){try{toast('Algo falló y se cerró lo que estaba abierto. Ya quedó anotado.')}catch(x){}},60);return}catch(e2){FALLO77.enRender=false;falloPantalla77(falloAnota77(e2,'al dibujar (otra vez)'))}}};
/* la carga de la nube: si algo se rompe, se salta y deja entrar */
if(typeof nbPrimera==='function'){var _nbP77=nbPrimera;nbPrimera=function(docs){try{return _nbP77.apply(this,arguments)}catch(e){falloAnota77(e,'al cargar la nube');
  try{NB.listo=true;NB.est='listo'}catch(x){}try{nbForzarRol()}catch(x){}try{S.diaNube=iso(TODAY)}catch(x){}try{S.pinOk={};if(!(S.setup&&!S.setup.fin))pinEntrar()}catch(x){falloAnota77(x,'al pedir el PIN')}
  try{falloSeguro77();nbRender()}catch(x){falloPantalla77(falloAnota77(x,'al dibujar después de cargar'))}try{nbEmpuja()}catch(x){}}}}
if(typeof nbAplica==='function'){var _nbA77=nbAplica;nbAplica=function(){try{return _nbA77.apply(this,arguments)}catch(e){falloAnota77(e,'al recibir cambios de la nube');return true}}}
/* si la carga se queda más de 25 segundos en "Cargando…", ofrece salir */
(function(){var t0=Date.now();var iv=setInterval(function(){try{if(typeof NB==='undefined'||!NB.on){if(Date.now()-t0>60000)clearInterval(iv);return}if(NB.est==='listo'){clearInterval(iv);return}
 if(NB.est==='cargando'&&Date.now()-(NB._t77||(NB._t77=Date.now()))>25000){clearInterval(iv);falloPantalla77(falloAnota77(new Error('La carga de la nube tardó más de 25 segundos'),'al cargar'))}}catch(x){}},1000)})();
/* errores en los botones: se anotan (sin tumbar la app) */
window.addEventListener('error',function(ev){try{if(ev&&ev.error)falloAnota77(ev.error,'en un botón')}catch(x){}});
/* después de "Volver a bajar los datos de la nube" */
try{if(localStorage.getItem('pnFalloNube')){localStorage.removeItem('pnFalloNube');setTimeout(function(){try{toast('Se volvieron a bajar los datos de la nube')}catch(x){}},3000)}}catch(x){}
