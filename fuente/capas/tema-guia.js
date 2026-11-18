/* ===================== TEMA · Guía, tutoriales y "Hoy te toca" (aplanado el 18 nov) =====================
   Antes estaba repartido en 7 envolturas encadenadas en l43, l59, l60, l81.
   Aquí está todo junto, en el MISMO orden, y hace exactamente lo mismo (comprobado con su prueba de comparación).
   Si se cambia algo de esto, se cambia AQUÍ (no se agregan envolturas en capas nuevas).

   Se arma justo después de tema-estadisticas.js (tema-pantallas.js se arma después y sigue envolviendo tutIniciar y hoyItems).
   - tutHTML: el globo del tutorial. tutIniciar: tutoriales nuevos de Rutas ya vistos.
   - guiaLibre / guiaMuestra: la burbuja de guía y "Muéstrame dónde".
   - aprendeItems: "Aprende la app" (Repartir las rutas). popSig: la siguiente tarjeta. hoyItems: "Hoy te toca" (cierres).
   ============================================================================================ */

/* tutHTML · de l43 */
var _tutH43=tutHTML;tutHTML=function(quieto){var t=S.tut;if(!t)return '';var L=TUT[t.k],st=L&&L[t.i];if(!st){S.tut=null;return ''}
 /* paso "Gastos": el botón real de Gasto está en Ruta */
 
 var h=_tutH43.call(this,quieto),el=st[3]==='swipe'?null:tutBlanco(st);if(!h)return h;
 if(!el||st[3]==='swipe'){/* lo que señala no está: globo al centro, sin hueco (en "deslizar", la manita al centro de la pantalla) */
  h=h.replace('<div class="hole"','<div class="hole sinhueco"');if(st[3]!=='swipe')h=h.replace(/<svg class="hand"[\s\S]*?<\/svg>/,'');
  h=h.replace(/<div class="bub" style="[^"]*"/,'<div class="bub" style="top:50%;transform:translateY(-50%)"');
  if(st[3]==='swipe')h=h.replace(/(<svg class="hand"[^>]*style=")[^"]*"/,'$1left:'+(innerWidth/2-20)+'px;top:'+(innerHeight*0.32)+'px;animation:pnSwipe 1.6s ease-in-out infinite"')}
 return h};

/* guiaLibre · de l59 */
var _gL59=guiaLibre;guiaLibre=function(){if(!_gL59.apply(this,arguments))return false;try{
 if(!pnArranqueListo())return false;
 var a=document.activeElement;if(a&&/INPUT|TEXTAREA|SELECT/.test(a.tagName))return false;
 if(document.querySelector('.wz-nav,#medov,#fotov,#fgov,#tutov'))return false;
 if(S.role==='rep'&&/^(entrega|cierre)$/.test(S.tab.rep))return false;
 return true}catch(e){return false}};

/* popSig · de l59 */
var _popS59=popSig;popSig=function(){if(Date.now()-_popSigT<450)return;_popSigT=Date.now();
 if(!/^(popdesp|precioayer|inspok|inspno)$/.test(_popUlt||''))_popPausa={t:Date.now(),salio:false};_popUlt='';return _popS59.apply(this,arguments)};

/* hoyItems · de l60 */
var _hoyI60=hoyItems;hoyItems=function(){var L=_hoyI60.apply(this,arguments),hoy=iso(TODAY);try{var C=cierresHoy(),env=C.filter(function(x){return x.env}),rec=C.filter(function(x){return x.rec}),porRec=env.filter(function(x){return !x.rec}),falt=C.filter(function(x){return !x.rec});
 L.forEach(function(x){if(/^Recibir los cierres/.test(x[0])){x[0]='Recibir los cierres · '+(C.length?env.length+' de '+C.length+' mandados'+(rec.length?' · '+rec.length+' recibido'+(rec.length>1?'s':''):''):'nadie salió hoy');x[1]=C.length>0&&rec.length===C.length;x[4]='cierres'}
  if(/^Mandarte el resumen/.test(x[0])){x[1]=S.resHoy===hoy;x[4]='resumen';if(!x[1]&&falt.length)x[0]='Mandarte el resumen del día · faltan '+falt.length+' cierre'+(falt.length>1?'s':'')}})}catch(e){}return L};

/* guiaMuestra · de l60 */
var _gMu60=guiaMuestra;guiaMuestra=function(sel){var hay=String(sel||'main').split(/,\s*/).some(function(s){try{var el=document.querySelector(s);return el&&el.getClientRects().length}catch(e){return false}});
 if(!hay){toast('Eso todavía no aparece en esta pantalla. Sale cuando haya algo que hacer ahí.');return}return _gMu60.apply(this,arguments)};

/* tutIniciar · de l81 */
var _tI81=tutIniciar;tutIniciar=function(k){try{if(k==='admin')S.tutVisto['n:rt81']=true;if(k==='rep')S.tutVisto['n:rt81rep']=true}catch(e){}return _tI81.apply(this,arguments)};

/* aprendeItems · de l81 */
var _ai81=aprendeItems;aprendeItems=function(){var L=_ai81.apply(this,arguments);try{if(S.role!=='rep')L.push(['Repartir las rutas','inicio',!!S.rt81Ya])}catch(e){}return L};
