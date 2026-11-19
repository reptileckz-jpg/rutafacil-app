/* ===================== TEMA · Avisos push (nació como tema, 19 nov · punto 132) =====================
   Ricardo: "si no estoy en la app abierta, y está minimizada o cerrada, no le llegan las notificaciones; no le avisa que le asigné
   un nuevo pedido al chofer". Decidió: push de Firebase (Firebase Cloud Messaging).
   - Celular del chofer: saca el token de avisos de su celular (RutaNativa.pushToken) y lo guarda en n/{neg}/tok/{chofer} (una vez al día
     o si cambia). Sin google-services.json en el APK no hay Firebase: no hace nada.
   - Celular del administrador: pushManda132(chofer, título, texto, tipo) escribe n/{neg}/push/{id}; la función de la nube
     (functions/index.js) lo manda a ese celular aunque la app esté cerrada y lo borra.
   - Reglas: solo el administrador (o el encargado) crea avisos; cada chofer solo guarda su token (firestore.rules).
   Se arma al final. Si se cambia algo de los avisos push, se cambia AQUÍ.
   ============================================================================================ */
function pushManda132(ch,titulo,texto,tipo){try{if(typeof NB==='undefined'||!NB.on||!NB.listo||!NB.ad||!NB.ad.set)return false;if(!(S.role==='admin'||S.encOn))return false;
 if(ch==null||ch===''||(typeof ADM85!=='undefined'&&+ch===+ADM85))return false;
 var id=Date.now().toString(36)+'-'+ch+'-'+Math.random().toString(36).slice(2,6);
 NB.ad.set(nbP('push/'+id),{ch:String(ch),titulo:String(titulo||'Ruta Fácil').slice(0,200),texto:String(texto||'').slice(0,1000),tipo:String(tipo||''),t:Date.now()}).catch(function(e){console.error('push',e)});return true}catch(e){return false}}
var _push132={k:''};
function pushRegistra132(){try{if(typeof NB==='undefined'||!NB.on||!NB.listo||!NB.ad||!NB.ad.set||!NB.perfil||NB.perfil.rol!=='chofer'||NB.perfil.chId==null)return;
 var n=natPl38();if(!n||!n.pushToken)return;var ch=String(NB.perfil.chId),hoy=iso(TODAY);if(_push132.k===ch+'|'+hoy)return;_push132.k=ch+'|'+hoy;
 n.pushToken().then(function(r){var t=r&&r.token;if(!t)return;var g='';try{g=localStorage.getItem('push132')||''}catch(e){}if(g===ch+'|'+hoy+'|'+t)return;
  NB.ad.set(nbP('tok/'+ch),{t:t,ts:Date.now()}).then(function(){try{localStorage.setItem('push132',ch+'|'+hoy+'|'+t)}catch(e){}},function(e){console.error('push token',e)})},function(e){/* sin Firebase en este APK o sin token: la app sigue igual */})}catch(e){}}
setInterval(function(){pushRegistra132()},60000);setTimeout(function(){pushRegistra132()},4000);
