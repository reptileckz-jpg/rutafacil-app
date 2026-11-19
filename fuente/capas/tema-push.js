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
var _push132={k:'',st:''};
function pushRegistra132(){try{if(typeof NB==='undefined'||!NB.on||!NB.listo||!NB.ad||!NB.ad.set||!NB.perfil||NB.perfil.rol!=='chofer'||NB.perfil.chId==null)return;
 var n=natPl38();if(!n||!n.pushToken)return;var ch=String(NB.perfil.chId),hoy=iso(TODAY);if(_push132.k===ch+'|'+hoy)return;_push132.k=ch+'|'+hoy;
 n.pushToken().then(function(r){var t=r&&r.token;if(!t){_push132.st='no dio token';return}_push132.st='ok';var g='';try{g=localStorage.getItem('push132')||''}catch(e){}if(g===ch+'|'+hoy+'|'+t)return;
  NB.ad.set(nbP('tok/'+ch),{t:t,ts:Date.now()}).then(function(){try{localStorage.setItem('push132',ch+'|'+hoy+'|'+t)}catch(e){}},function(e){_push132.st='no se pudo guardar en la nube: '+(e&&e.message||e);console.error('push token',e)})},function(e){_push132.st=String(e&&e.message||e)==='sin-firebase'?'este APK no trae Firebase':'no se pudo sacar el token: '+(e&&e.message||e)})}catch(e){}}
setInterval(function(){pushRegistra132()},60000);setTimeout(function(){pushRegistra132()},4000);

/* 132 · el push sale de rutaAviso: por ahí pasan TODOS los caminos para asignar un pedido (registrar un pedido con su chofer, "Asignar"
   en Pedidos, pedidos para mañana) y cuando a un chofer le quitan un pedido. Antes solo estaba en p57Asigna y al registrar un pedido
   nuevo con su chofer no llegaba. Solo pedidos y paradas (lo demás de la ruta llega al abrir la app, como siempre). */
var PUSH132=[[/^(Pedido para hoy|Tienes una parada nueva)/,'📦 Pedido nuevo'],[/^Pedido para mañana/,'📦 Pedido para mañana'],[/^Ya no llevas el pedido/,'↩️ Cambio en tu ruta']];
var _rAv132=rutaAviso;rutaAviso=function(ch,msg){var r=_rAv132.apply(this,arguments);try{var m=String(msg||''),t=PUSH132.filter(function(x){return x[0].test(m)})[0];if(t&&typeof pushManda132==='function')pushManda132(ch,t[1],m.replace(/^(Pedido para hoy|Pedido para mañana|Tienes una parada nueva):\s*/,''),'pedido')}catch(e){}return r};

/* 132 · en Ajustes del chofer: si este celular ya recibe avisos con la app cerrada (y si no, por qué) */
function pushEstado132(){if(typeof NB==='undefined'||!NB.on)return 'sin nube';if(!NB.perfil||NB.perfil.rol!=='chofer')return '';var n=natPl38();if(!n||!n.pushToken)return 'este APK no los trae (actualiza la app)';
 if(_push132.st==='ok')return 'ok';if(_push132.st)return _push132.st;return 'revisando…'}
var _aj132=ajHTML;ajHTML=function(){var h=_aj132.apply(this,arguments);try{if(!h||S.role!=='rep')return h;var e=pushEstado132();if(!e)return h;
 var x='<div class="card" data-k="push132"><b>🔔 Avisos con la app cerrada</b><div class="lbl" style="margin-top:4px">'+(e==='ok'?'<span class="pos">✓ Este celular ya recibe los avisos de pedidos aunque la app esté cerrada.</span>':'No están activos: '+esc(e)+'.')+'</div></div>';
 var i=h.lastIndexOf('</div></div>');return i>-1?h.slice(0,i)+x+h.slice(i):h+x}catch(er){return h}};

