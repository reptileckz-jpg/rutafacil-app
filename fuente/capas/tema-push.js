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


/* ===================== 151 · que Android no mate la app (avisos con la app cerrada) =====================
   Ricardo: "abrí la app, la cerré… le mandé un pedido y no llegó; la minimicé y así sí llegó". En muchos celulares (Xiaomi, Motorola,
   Samsung) el ahorro de batería no deja que lleguen los avisos con la app cerrada. RutaNativa.bateriaEstado() dice si la app ya puede
   funcionar en segundo plano; bateriaPide() abre la ventana de Android para permitirlo. Tarjeta arriba de la ruta del chofer y en
   Inicio del administrador (los dos reciben avisos) hasta que se permita; "Ahora no" la esconde hasta mañana. También en Ajustes. */
var BAT151={libre:null,rev:0};
function bat151Revisa(){try{var n=natPl38();if(!n||!n.bateriaEstado)return;if(Date.now()-BAT151.rev<20000)return;BAT151.rev=Date.now();
 n.bateriaEstado().then(function(r){var l=!!(r&&r.libre);if(l!==BAT151.libre){BAT151.libre=l;try{render()}catch(e){}}},function(){})}catch(e){}}
function bat151HTML(enAj){if(BAT151.libre!==false)return '';var k='';try{k=localStorage.getItem('bat151x')||''}catch(e){}if(!enAj&&k===iso(TODAY))return '';
 return '<div class="card alert" data-k="bat151" style="padding:12px 14px"><b style="font-size:17px">🔋 Deja que la app funcione en segundo plano</b><div class="lbl" style="margin-top:2px">Si no, Android la apaga para ahorrar batería y <b>no te llegan los avisos con la app cerrada</b>'+(S.role==='rep'?' (pedidos nuevos)':' (permisos que piden los choferes)')+'. Toca "Permitir" y escoge <b>Permitir / Sin restricciones</b>.</div>'
  +'<div style="display:flex;gap:8px;margin-top:8px"><button class="btn" style="flex:2" data-act="bat151si">Permitir</button>'+(enAj?'':'<button class="btn sec" style="flex:1" data-act="bat151x">Ahora no</button>')+'</div></div>'}
function bat151Pon(){try{var m=document.querySelector('main');if(!m||m.querySelector('[data-k="bat151"]'))return;var ok=(S.role==='admin'&&S.tab.admin==='inicio')||(S.role==='rep'&&S.tab.rep==='ruta');if(!ok)return;
 var h=bat151HTML();if(!h)return;var d=document.createElement('div');d.innerHTML=h;m.prepend(d.firstChild)}catch(e){}}
var _rd151=render;render=function(){var r=_rd151.apply(this,arguments);bat151Pon();return r};
window.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act="bat151si"],[data-act="bat151x"]');if(!b)return;e.stopImmediatePropagation();e.preventDefault();
 if(b.dataset.act==='bat151x'){try{localStorage.setItem('bat151x',iso(TODAY))}catch(er){}render();return}
 var n=natPl38();if(!n||!n.bateriaPide){toast('Actualiza la app para poder hacerlo');return}n.bateriaPide().then(function(){BAT151.rev=0;setTimeout(bat151Revisa,1500)},function(){toast('Ábrelo en Ajustes del celular → Apps → Ruta Fácil → Batería → Sin restricciones')})},true);
document.addEventListener('visibilitychange',function(){if(!document.hidden){BAT151.rev=0;bat151Revisa()}});
setTimeout(bat151Revisa,3000);setInterval(bat151Revisa,120000);

/* ===================== 152 · permisos: precio menor al de mayoreo y aviso al celular del administrador =====================
   Ricardo: "haz todo lo que me dijiste" (sugerencia 5: "si el chofer quiere dar un precio menor al de mayoreo, te llega un aviso y tú
   lo apruebas desde tu celular").
   - Ya existía: mayoreo con permiso (solo para choferes marcados "mayoreo solo con mi permiso") y permiso para fiar. Ahora, además,
     un precio MENOR al de mayoreo siempre pide permiso (a cualquier chofer). Si ya le dieron permiso y luego baja más el precio,
     se pide otra vez. Si no contesta en 5 minutos, se vende a precio normal (como el mayoreo).
   - Aviso push al administrador: cada permiso que pide un chofer (fiar, mayoreo, precio) le llega al celular del administrador aunque
     tenga la app cerrada (n/{neg}/push con ch "admins"; la función lo manda a los celulares de administrador, tok/a~{uid}).
   No cambia ninguna cuenta: solo decide si se puede guardar la entrega con ese precio. */
function bajoMay152(c,d){if(!c||!d||!d.may||!S.mayP)return false;
 var R=num(d.R)>0&&num(d.pRm)>0&&num(S.mayP.R)>0&&num(d.pRm)<num(S.mayP.R)-0.005,M=num(d.M)>0&&num(d.pMm)>0&&num(S.mayP.M)>0&&num(d.pMm)<num(S.mayP.M)-0.005;return R||M}
var _mnp152=mayNecesitaPerm;mayNecesitaPerm=function(c,d){if(_mnp152.apply(this,arguments))return true;return S.role!=='admin'&&bajoMay152(c,d)};
var _mpd152=mayPideDe;mayPideDe=function(cid){var p=_mpd152.apply(this,arguments);try{var d=S.d;if(p&&p.est==='ok'&&d&&d.may&&((num(d.R)>0&&num(d.pRm)<num(p.pR)-0.005)||(num(d.M)>0&&num(d.pMm)<num(p.pM)-0.005)))return null}catch(e){}return p};
var _mnh152=mayNotaHTML;mayNotaHTML=function(){var h=_mnh152.apply(this,arguments);try{var c=curCli(),d=S.d,ch=chofById(S.chofHoy);if(h&&bajoMay152(c,d)&&!(ch&&ch.mayPerm)){
  var t=[];if(num(d.R)>0&&num(d.pRm)<num(S.mayP.R)-0.005)t.push(money(num(S.mayP.R))+' la caja');if(num(d.M)>0&&num(d.pMm)<num(S.mayP.M)-0.005)t.push(money(num(S.mayP.M))+' el kilo');
  h=h.replace('<b>Necesitas permiso del administrador para el mayoreo</b>','<b>Ese precio es menor que el de mayoreo ('+t.join(' y ')+'): necesitas permiso del administrador</b>')}}catch(e){}return h};

function pushAdmins152(titulo,texto){try{if(typeof NB==='undefined'||!NB.on||!NB.listo||!NB.ad||!NB.ad.set)return false;
 var id=Date.now().toString(36)+'-adm-'+Math.random().toString(36).slice(2,6);
 NB.ad.set(nbP('push/'+id),{ch:'admins',titulo:String(titulo||'').slice(0,200),texto:String(texto||'').slice(0,1000),tipo:'permiso',t:Date.now()}).catch(function(e){console.error('push admins',e)});return true}catch(e){return false}}
function push152Revisa(){try{if(S.role==='admin'||typeof NB==='undefined'||!NB.on||!NB.listo)return;var hoy=iso(TODAY),me=+S.chofHoy,quien=chofN(me);
 (S.permisos||[]).forEach(function(p){if(p&&p.est==='pend'&&+p.ch===me&&p.f===hoy&&!p.push152){p.push152=1;var c=cl(p.c);pushAdmins152('🙋 '+quien+' pide permiso para fiar','Quiere fiarle a '+(c?c.n:'un cliente')+(c&&num(c.cred)>0?' (ya debe '+money(num(c.cred))+')':'')+'. Contesta en Inicio.')}});
 mayPideL().forEach(function(p){if(p&&p.est==='pend'&&+p.ch===me&&p.f===hoy&&!p.push152){p.push152=1;var c=cl(p.c),q=[];if(num(p.R)>0)q.push(num(p.R)+' cajas a '+money(num(p.pR)));if(num(p.M)>0)q.push(num(p.M)+' kg a '+money(num(p.pM)));
  pushAdmins152('🙋 '+quien+' pide permiso de precio','A '+(c?c.n:'un cliente')+': '+q.join(' y ')+'. Tienes 5 minutos para contestar en Inicio.')}})}catch(e){}}
var _rd152=render;render=function(){push152Revisa();return _rd152.apply(this,arguments)};
/* el celular del administrador también registra su token (tok/a~{uid}) para recibir los permisos */
var _pa152={k:''};
function pushRegistraAdm152(){try{if(typeof NB==='undefined'||!NB.on||!NB.listo||!NB.ad||!NB.ad.set||!NB.perfil||NB.perfil.rol!=='admin'||!NB.user||!NB.user.uid)return;
 var n=natPl38();if(!n||!n.pushToken)return;var k='a~'+NB.user.uid,hoy=iso(TODAY);if(_pa152.k===k+'|'+hoy)return;_pa152.k=k+'|'+hoy;
 n.pushToken().then(function(r){var t=r&&r.token;if(!t){_push132.st='no dio token';return}_push132.st='ok';var g='';try{g=localStorage.getItem('push152')||''}catch(e){}if(g===k+'|'+hoy+'|'+t)return;
  NB.ad.set(nbP('tok/'+k),{t:t,ts:Date.now()}).then(function(){try{localStorage.setItem('push152',k+'|'+hoy+'|'+t)}catch(e){}},function(e){_push132.st='no se pudo guardar en la nube: '+(e&&e.message||e)})},function(e){_push132.st=String(e&&e.message||e)==='sin-firebase'?'este APK no trae Firebase':'no se pudo sacar el token: '+(e&&e.message||e)})}catch(e){}}
setInterval(pushRegistraAdm152,60000);setTimeout(pushRegistraAdm152,4500);
/* Ajustes: estado de los avisos y de la batería, también para el administrador */
var _aj152=ajHTML;ajHTML=function(){var h=_aj152.apply(this,arguments);try{if(!h)return h;var x='';
 if(S.role==='admin'&&typeof NB!=='undefined'&&NB.on&&NB.perfil&&NB.perfil.rol==='admin'){var n=natPl38(),e=!n||!n.pushToken?'este APK no los trae (actualiza la app)':(_push132.st||'revisando…');
  x+='<div class="card" data-k="push152"><b>🔔 Avisos de permisos con la app cerrada</b><div class="lbl" style="margin-top:4px">'+(e==='ok'?'<span class="pos">✓ Te llegan los permisos que piden los choferes (fiar, mayoreo, precio) aunque la app esté cerrada.</span>':'No están activos: '+esc(e)+'.')+'</div></div>'}
 x+=bat151HTML(true);if(!x)return h;var i=h.lastIndexOf('</div></div>');return i>-1?h.slice(0,i)+x+h.slice(i):h+x}catch(er){return h}};
