/* ===================== v5 · Se guarda en el teléfono y cada chofer con su ruta =====================
   1) En la versión real ("Primera vez") todo se guarda en el teléfono (IndexedDB): si se cierra el navegador o
      se apaga el celular, al abrir sigue donde iba. La demo NO se guarda (siempre empieza igual).
   2) Cada chofer tiene su propia ruta del día (entregas, cobros, gastos, cierre); el inventario y los
      clientes son compartidos. El admin puede ver la ruta de cada chofer.
   3) Al cambiar de día: las rutas ya cerradas se archivan y empieza una nueva; si alguien no envió su
      cierre, se le avisa. */
/* lo que es de cada ruta (además de lo que ya existía) */
['recep','cbx','porContar'].forEach(function(k){if(AR_K.indexOf(k)<0)AR_K.push(k)});
var PN_GUARDA=(typeof MODO!=='undefined'&&MODO==='vacio')&&!window.__pnTest;
var _idb=null;
function idbAbrir(cb){if(_idb)return cb(_idb);try{var rq=indexedDB.open('platanos',1);rq.onupgradeneeded=function(){rq.result.createObjectStore('kv')};rq.onsuccess=function(){_idb=rq.result;cb(_idb)};rq.onerror=function(){cb(null)}}catch(e){cb(null)}}
function idbGet(k,cb){idbAbrir(function(db){if(!db)return cb(null);try{var t=db.transaction('kv','readonly').objectStore('kv').get(k);t.onsuccess=function(){cb(t.result==null?null:t.result)};t.onerror=function(){cb(null)}}catch(e){cb(null)}})}
function idbPut(k,v,cb){idbAbrir(function(db){if(!db)return cb&&cb(false);try{var tx=db.transaction('kv','readwrite');tx.objectStore('kv').put(v,k);tx.oncomplete=function(){cb&&cb(true)};tx.onerror=function(){cb&&cb(false)}}catch(e){cb&&cb(false)}})}
var PN_TRANS=['toast','modal','confirm','undo','np','dfOpen','aj','menu','pinOk','usrSel'];
function estadoTxt(){var o={};Object.keys(S).forEach(function(k){if(PN_TRANS.indexOf(k)<0)o[k]=S[k]});o._dia=iso(TODAY);o._guardado=Date.now();return JSON.stringify(o)}
var _gT=null,_gUlt='',_cargado=!PN_GUARDA;
function guardarYa(){if(!PN_GUARDA||!_cargado)return;try{var t=estadoTxt();if(t===_gUlt)return;_gUlt=t;idbPut('S',t)}catch(e){console.error('guardar',e)}}
function guardarLuego(){if(!PN_GUARDA||!_cargado)return;clearTimeout(_gT);_gT=setTimeout(guardarYa,700)}
var _rG21=render;render=function(){var r=_rG21.apply(this,arguments);guardarLuego();return r};
document.addEventListener('visibilitychange',function(){if(document.visibilityState==='hidden')guardarYa()});
window.addEventListener('pagehide',guardarYa);
/* al abrir: si hay algo guardado, se sigue de ahí */
function rutaVacia(o){return !o||!((o.log||[]).length||(o.salida&&o.salida.ok))}
function cambioDeDia(viejo){var hoy=iso(TODAY);if(!viejo||viejo===hoy)return;S.rutasHist=S.rutasHist||[];var pend=[];
 function archiva(o,ch){if(rutaVacia(o))return true;var env=o.cierre&&o.cierre.sent;S.rutasHist.push({f:viejo,ch:ch,log:o.log,res:o.cierre&&o.cierre.res||null,enviado:!!env,corte120:o.cierre&&o.cierre.corte||null,fotos121:(typeof fotosRuta121==='function'?fotosRuta121(o):null)});if(!env){pend.push(chofN(ch));return false}return true}
 var act=arPack();if(archiva(act,S.chofHoy)){arLoad(chNuevo(+S.chofHoy))}
 Object.keys(S.chSt||{}).forEach(function(id){if(archiva(S.chSt[id],+id))delete S.chSt[id]});
 if(S.arSt&&archiva(S.arSt,S.arSt.chofHoy))S.arSt=null;
 S.recep=null;S.cierreReg=null;S.cierreRec='';S.rutasHist=S.rutasHist.slice(-400);
 if(pend.length)S.avPrecio.push('URGENTE: '+pend.join(', ')+' no envió su cierre de ayer ('+fmtF(viejo)+'). Pídele que lo envíe.')}
if(PN_GUARDA)idbGet('S',function(t){try{if(t){var o=JSON.parse(t),f=fresh(),viejo=o._dia;delete o._dia;delete o._guardado;Object.keys(f).forEach(function(k){if(!(k in o))o[k]=f[k]});S=o;cambioDeDia(viejo);S.pinOk={};S.usrSel=false;S.menu=false;if(!(S.setup&&!S.setup.fin))pinEntrar();_gUlt='';render()}}catch(e){console.error('cargar',e)}_cargado=true;guardarLuego()});
/* ---- el admin ve la ruta de cada chofer ---- */
function rutasDeHoy(){var L=[];var a={ch:+S.chofHoy,o:null,act:true};L.push(a);Object.keys(S.chSt||{}).forEach(function(id){if(+id!==+S.chofHoy&&!rutaVacia(S.chSt[id]))L.push({ch:+id,o:S.chSt[id]})});return L}
function rutaSelHTML(){var L=rutasDeHoy();if(L.length<2||S.role!=='admin')return '';
 return '<div class="chips" role="group" aria-label="Ver la ruta de" style="margin:0 0 10px">'+L.map(function(x){var o=x.o||arPack(),env=o.cierre&&o.cierre.sent;return '<button data-act="verruta" data-id="'+x.ch+'" aria-pressed="'+!!x.act+'">'+esc(chofN(x.ch))+(env?' ✓':'')+'</button>'}).join('')+'</div>'}
var _cA21=cierreAdm;cierreAdm=function(){return rutaSelHTML()+_cA21.apply(this,arguments)};
document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act="verruta"]');if(!b)return;e.stopImmediatePropagation();chCambiar(+b.dataset.id);if(b.dataset.ir)S.tab.admin=b.dataset.ir;render();window.scrollTo(0,0)},true);
/* ---- borrar los datos de prueba (para el lanzamiento) ---- */
function borrarTodoLocal(cb){idbPut('S','',function(){cb&&cb()})}
/* en Inicio: cierres de los otros choferes por recibir */
var _cT21=cierreTop;cierreTop=function(){var h=_cT21.apply(this,arguments);if(S.role!=='admin')return h;
 Object.keys(S.chSt||{}).forEach(function(id){if(+id===+S.chofHoy)return;var o=S.chSt[id];if(!(o&&o.cierre&&o.cierre.sent&&!o.cierreReg))return;var r=o.cierre.res||{};
  h+='<button class="card alert" data-act="verruta" data-id="'+id+'" data-ir="cierreadm" style="text-align:left;width:100%;color:inherit;display:flex;gap:12px;align-items:center;border-width:2px"><span class="ic" style="background:var(--danger);color:#fff">'+icon('cierre',20)+'</span><span class="grow"><b style="font-size:17px">'+esc(chofN(+id))+' mandó su cierre</b><br><span class="lbl">Debe entregar '+money(r.efectivo||0)+'. Recíbelo.</span></span><span style="font-size:22px">›</span></button>'});return h};
