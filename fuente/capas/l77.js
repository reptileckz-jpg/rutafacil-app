/* ===================== v7.7 · 31 URGENTE: la app nunca se queda atorada ni en blanco (12 nov)
   - si algo se rompe al cargar los datos de la nube, la app se salta esa parte y deja entrar (con el PIN)
   - si algo se rompe al dibujar, cierra lo que estaba abierto y regresa a Inicio; si sigue fallando, enseña
     "La app encontró un problema" con Reintentar, Mandar el error y Volver a bajar los datos de la nube
   - una ventana abierta de un viaje que ya terminó se cierra sola ("Ese viaje ya terminó")
   - el error queda anotado (Ajustes → Problemas reportados) para poder arreglar la causa ===================== */
var FALLO77={n:0,ult:null,enRender:false};
/* mapa de errores: el armado pone aquí en qué renglón empieza cada capa, para que "index.html:40123" diga "l80.js:57" */
var CAPAS77=[];/*@@MAPA*/
function capaDe77(n){n=+n;if(!n||!CAPAS77.length)return '';var c=null;for(var i=0;i<CAPAS77.length;i++){if(CAPAS77[i][0]<n)c=CAPAS77[i];else break}return c?c[1]+':'+(n-c[0]):'base:'+n}
function capasPila77(st){var L=[];String(st||'').split('\n').forEach(function(x){var m=/(\.html|localhost\/?)[^\s()]*:(\d+):\d+\)?\s*$/.exec(x);if(m)m[1]=m[2];if(m){var c=capaDe77(m[1]);if(c&&L.indexOf(c)<0)L.push(c)}});return L.slice(0,5).join(' ← ')}
function falloTxt77(e,donde){var m=(e&&(e.message||String(e)))||'error',st=String(e&&e.stack||'').split('\n').slice(0,6).join('\n');
 var r='';try{r=(S.role||'')+' · '+(S.tab&&S.tab[S.role]||'')}catch(x){}var cp='';try{cp=capasPila77(e&&e.stack)}catch(x){}return 'Ruta Fácil · '+donde+' · '+new Date().toLocaleString('es-MX')+'\n'+r+'\n'+m+(cp?'\nEn: '+cp:'')+'\n'+st}
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
/* guardarYa: pasó a tema-nube.js */
/* deja la pantalla en un lugar seguro: cierra todo lo abierto y regresa a Inicio */
function falloSeguro77(){try{var r=S.role;['fi','openCarga','vehOpen','openCli','openProv','openCh','modal','wz','ub68','lt53','tag76','im75','ip74','pe74','fv76','fl76','may71','tar72','cvOpen','vjOpen','px','ub','gx','cm','rcv','rp','dfOpen','blov','p57','rp56'].forEach(function(k){if(S[k]!=null&&S[k]!==false)S[k]=k==='dfOpen'?false:null});
 S.aj=false;S.menu=false;if(S.vws&&S.vw&&S.vws.indexOf(S.vw)<0)S.vw=null;if(S.tab&&r)S.tab[r]=r==='rep'?'ruta':'inicio'}catch(x){}}
/* el viaje que estaba abierto ya no existe (lo terminó el chofer en su celular) */
function vwVivo77(){try{if(!S.vw||!S.vws)return;if(S.vws.indexOf(S.vw)>-1)return;var cid=S.vw.cid,o=S.vws.filter(function(v){return v.cid!=null&&v.cid===cid})[0];if(o){S.vw=o;S.vwI=S.vws.indexOf(o);return}
 var ab=!!S.vw.open;S.vw=S.vws[0]||null;S.vwI=0;if(ab&&S.role==='admin')setTimeout(function(){try{toast('Ese viaje ya terminó')}catch(x){}},50)}catch(x){}}
/* render: pasó a tema-dibujar1.js */
/* la carga de la nube: si algo se rompe, se salta y deja entrar */
/* nbPrimera: pasó a tema-nube.js */
if(typeof nbAplica==='function'){var _nbA77=nbAplica;nbAplica=function(){try{return _nbA77.apply(this,arguments)}catch(e){falloAnota77(e,'al recibir cambios de la nube');return true}}}
/* si la carga se queda más de 25 segundos en "Cargando…", ofrece salir */
(function(){var t0=Date.now();var iv=setInterval(function(){try{if(typeof NB==='undefined'||!NB.on){if(Date.now()-t0>120000)clearInterval(iv);return}if(NB.est==='listo'){clearInterval(iv);return}
 if((NB.est==='cargando'||NB.est==='conectando'||NB.est==='perfil'||NB.est==='auth')&&Date.now()-(NB._t77||(NB._t77=Date.now()))>40000){clearInterval(iv);falloPantalla77(falloAnota77(new Error('La carga de la nube tardó más de 40 segundos ('+NB.est+')'),'al cargar'))}}catch(x){}},1000)})();
/* errores en los botones: se anotan (sin tumbar la app) */
window.addEventListener('error',function(ev){try{if(ev&&ev.error)falloAnota77(ev.error,'en un botón')}catch(x){}});
/* después de "Volver a bajar los datos de la nube" */
try{if(localStorage.getItem('pnFalloNube')){localStorage.removeItem('pnFalloNube');setTimeout(function(){try{toast('Se volvieron a bajar los datos de la nube')}catch(x){}},3000)}}catch(x){}

/* ===================== 7.9 · la pantalla de rescate siempre responde y manda un diagnóstico =====================
   - al salir, la app deja de cargar y de dibujar (para que nada la congele ni le quite los toques)
   - el error y el diagnóstico se ven directo (sin tener que abrir nada) y se mandan por WhatsApp o se copian
   - el diagnóstico dice en qué paso se quedó la carga, qué contestó la nube y qué datos son los más pesados */
var DIAG77={t0:Date.now(),est:[],errs:[],watch:{n:0,docs:0,bytes:0,cache:0,top:[]},paus:false};
(function(){var ce=console.error;console.error=function(){try{var a=[].slice.call(arguments).map(function(x){return x&&x.message?(x.code?x.code+' ':'')+x.message:String(x)}).join(' ');DIAG77.errs.push(Math.round((Date.now()-DIAG77.t0)/1000)+'s '+a.slice(0,300));if(DIAG77.errs.length>25)DIAG77.errs.shift()}catch(e){}return ce.apply(console,arguments)}})();
(function(){try{var A=window.NUBE_AD;if(!A||!A.watch||A._w77)return;A._w77=1;var w=A.watch;A.watch=function(path,cb){return w.call(A,path,function(docs,cache){try{var W=DIAG77.watch;W.n++;W.docs+=(docs||[]).length;if(cache)W.cache++;(docs||[]).forEach(function(d){var n=0;try{n=JSON.stringify(d.data||{}).length}catch(e){}W.bytes+=n;W.top.push([d.id,n]);});W.top.sort(function(a,b){return b[1]-a[1]});W.top=W.top.slice(0,8);W.ult=Math.round((Date.now()-DIAG77.t0)/1000)}catch(e){}if(DIAG77.paus)return;return cb.apply(this,arguments)})}}catch(e){}})();
setInterval(function(){try{if(typeof NB==='undefined')return;var e=NB.est,l=DIAG77.est[DIAG77.est.length-1];if(!l||l[0]!==e)DIAG77.est.push([e,Math.round((Date.now()-DIAG77.t0)/1000)])}catch(x){}},500);
function diagTxt77(){var d=DIAG77,W=d.watch,o=[];try{o.push('Estado: '+(typeof NB!=='undefined'?NB.est+' · listo '+NB.listo+' · rol '+(NB.perfil&&NB.perfil.rol):'sin nube')+(typeof NB!=='undefined'&&NB.err?' · '+NB.err:''))}catch(e){}
 try{o.push('Pasos: '+d.est.map(function(x){return x[0]+'@'+x[1]+'s'}).join(' → '))}catch(e){}
 try{o.push('Guardado del celular listo: '+(typeof _cargado!=='undefined'?_cargado:'?'))}catch(e){}
 o.push('Nube: '+W.n+' respuestas, '+W.docs+' documentos, '+Math.round(W.bytes/1024)+' KB'+(W.cache?' ('+W.cache+' desde caché)':'')+(W.ult!=null?' · última a los '+W.ult+'s':''));
 if(W.top.length)o.push('Más pesados: '+W.top.map(function(x){return x[0]+' '+Math.round(x[1]/1024)+'KB'}).join(', '));
 if(d.errs.length)o.push('Errores:\n'+d.errs.slice(-12).join('\n'));
 try{o.push('Celular: '+navigator.userAgent.replace(/.*Android/,'Android').slice(0,80))}catch(e){}return o.join('\n')}
function falloPausa77(){DIAG77.paus=true;try{if(typeof NB!=='undefined'&&NB._unw){NB._unw();NB._unw=null}}catch(e){}try{var nb=document.getElementById('nbov');if(nb)nb.style.display='none'}catch(e){}}
falloPantalla77=function(t){try{falloPausa77();var txt=String(t||'')+'\n\n— Diagnóstico —\n'+diagTxt77();FALLO77.ult=txt;try{localStorage.setItem('pnFallo',txt)}catch(x){}
 var o=document.getElementById('fallo77');if(o)o.remove();o=document.createElement('div');o.id='fallo77';
 o.setAttribute('style','position:fixed;inset:0;z-index:2147483000;background:#F6F1E3;color:#1E2A1A;overflow:auto;font-family:system-ui,sans-serif;touch-action:auto');
 var es=function(s){return String(s).replace(/[<>&]/g,function(c){return {'<':'&lt;','>':'&gt;','&':'&amp;'}[c]})},bt='display:flex;align-items:center;justify-content:center;width:100%;min-height:56px;margin-top:10px;border-radius:16px;font-size:18px;font-weight:800;text-decoration:none;box-sizing:border-box';
 o.innerHTML='<div style="max-width:480px;margin:0 auto;padding:24px 16px 40px"><div style="font-size:40px;text-align:center">🛠️</div><h1 style="font-size:23px;text-align:center;margin:6px 0">La app encontró un problema</h1>'
  +'<p style="font-size:16px;line-height:1.4;text-align:center;margin:6px 0">No se perdió nada del negocio. Manda este error para arreglarlo.</p>'
  +'<a id="f77wa" href="https://wa.me/?text='+encodeURIComponent(txt.slice(0,3500))+'" target="_blank" rel="noopener" style="'+bt+';background:#25D366;color:#fff">📲 Mandar el error por WhatsApp</a>'
  +'<button id="f77cp" style="'+bt+';border:2px solid #2F7D32;background:#fff;color:#2F7D32">📋 Copiar el error</button>'
  +'<button id="f77re" style="'+bt+';border:0;background:#2F7D32;color:#fff">Reintentar</button>'
  +'<button id="f77nube" style="'+bt+';border:2px solid #B45309;background:#fff;color:#B45309;font-size:16px">☁️ Volver a bajar los datos de la nube</button>'
  +'<div style="font-size:14px;font-weight:700;margin-top:16px">El error:</div><pre style="white-space:pre-wrap;word-break:break-word;font-size:12px;background:#fff;border-radius:10px;padding:10px;margin-top:4px;user-select:text;-webkit-user-select:text">'+es(txt)+'</pre></div>';
 document.body.appendChild(o);
 var on=function(id,f){var b=document.getElementById(id);if(!b)return;var hecho=0,go=function(ev){if(hecho)return;hecho=1;setTimeout(function(){hecho=0},600);try{ev.stopPropagation()}catch(x){}f(ev)};b.addEventListener('pointerup',go,true);b.addEventListener('click',go,true)};
 on('f77re',function(){location.reload()});
 on('f77cp',function(){var ok=function(){var b=document.getElementById('f77cp');if(b)b.textContent='✓ Copiado';};try{navigator.clipboard.writeText(txt).then(ok,function(){var a=document.createElement('textarea');a.value=txt;document.body.appendChild(a);a.select();try{document.execCommand('copy');ok()}catch(x){}a.remove()})}catch(x){}});
 on('f77nube',function(){if(!confirm('¿Seguro? Se borra lo guardado en este celular y se vuelve a bajar todo de la nube.'))return;var fin=function(){try{localStorage.setItem('pnFalloNube','1')}catch(x){}location.reload()};var listo=false,f2=function(){if(listo)return;listo=true;fin()};try{window._noGuardar77=1;idbAbrir(function(db){if(!db)return f2();try{var tx=db.transaction('kv','readwrite');tx.objectStore('kv').delete('S');tx.oncomplete=f2;tx.onerror=f2}catch(x){f2()}});setTimeout(f2,3000)}catch(x){f2()}})}catch(x){}};
/* mientras la pantalla de rescate está, no se dibuja ni se procesa nada más */
/* render: pasó a tema-dibujar1.js */
if(typeof nbAplica==='function'){var _nbA77b=nbAplica;nbAplica=function(){if(DIAG77.paus)return false;return _nbA77b.apply(this,arguments)}}
/* el aviso de "tardó mucho" ahora espera 40 segundos y también cubre "Conectando…" */

/* ===================== 7.9b · el viaje que quedó a medias ya no tumba la app =====================
   Error real de Ricardo (Moto, administrador, Inicio): vwPend → "Cannot read properties of undefined (reading 'forEach')".
   Un viaje de carga quedó guardado sin su lista de proveedores/básculas (par) cuando el chofer lo terminó; la burbuja del
   viaje lo quería recorrer y la app se caía antes de entrar. Ahora: los viajes a medias se quitan al abrir y cada vez que
   llega algo de la nube, y la burbuja del viaje nunca tumba la app. */
function vwLimpia77(){try{if(!S)return;if(!Array.isArray(S.vws)){S.vws=[];}var n=S.vws.length;S.vws=S.vws.filter(function(v){return v&&typeof v==='object'&&Array.isArray(v.par)});
 if(S.vw&&(S.vws.indexOf(S.vw)<0||!Array.isArray(S.vw.par))){var cid0=S.vw.cid,ab0=!!S.vw.open,mismo=S.vws.filter(function(v){return cid0!=null&&v.cid===cid0})[0];if(!mismo&&ab0&&S.role==='admin')setTimeout(function(){try{toast('Ese viaje ya terminó')}catch(x){}},50);S.vw=mismo||S.vws[S.vwI]||S.vws[0]||null;if(S.vw)S.vwI=S.vws.indexOf(S.vw);else S.vwI=0}
 if(S.vws.length<n){try{S.hist.push({t:fmtF(iso(TODAY))+' '+hhmm(),q:'La app',x:'Se quitó '+(n-S.vws.length)+' viaje de carga que había quedado a medias'})}catch(e){}try{falloAnota77(new Error('viaje a medias quitado ('+(n-S.vws.length)+')'),'al limpiar')}catch(e){}}return S.vws.length<n}catch(e){return false}}
vwLimpia77();
/* render: pasó a tema-dibujar1.js */
if(typeof nbAplica==='function'){var _nbA77c=nbAplica;nbAplica=function(){var r=_nbA77c.apply(this,arguments);if(vwLimpia77())r=true;return r}}
/* vwBurbuja: pasó a tema-viaje.js */
/* vwPend: pasó a tema-viaje.js */

/* la pantalla de rescate va en un cuadro aparte (iframe): nada de la app le puede quitar los toques ni el deslizar */
/* falloPantalla77: pasó a tema-sueltas.js */
/* la causa: un viaje que el chofer borró y que el celular del administrador "revivió" al escribir un solo dato (p. ej. que tenía
   abierta la ruta en vivo). En la nube quedaba un pedazo sin su orden ni sus demás datos. Al armar listas desde la nube,
   los pedazos sueltos (sin orden ni marca de elemento) ya no se convierten en elementos. */
/* nbArma: pasó a tema-nube.js */
