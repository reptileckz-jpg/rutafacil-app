/* ===================== v6.0 · Entrar a la nube y accesos desde Personal ===================== */
(function(){var st=document.createElement('style');st.textContent=[
 '#nbov{position:fixed;inset:0;z-index:200;background:#F6F1E3;color:#1E2A1A;overflow-y:auto;-webkit-overflow-scrolling:touch}',
 '#nbov .nbw{max-width:420px;margin:0 auto;padding:calc(28px + var(--sbar,0px)) 20px 40px;display:flex;flex-direction:column;gap:12px}',
 '#nbov h1{font-size:24px;margin:6px 0 0}#nbov p,#nbov .lbl{color:#3D4A38;font-size:16px;margin:0}',
 '#nbov input{width:100%;min-height:54px;font-size:18px;border:1px solid #CFC8B4;border-radius:12px;padding:0 14px;background:#fff;color:#1E2A1A;box-sizing:border-box}',
 '#nbov label{font-weight:700;font-size:15px;margin-bottom:-6px}',
 '#nbov .nbbtn{min-height:56px;border-radius:14px;border:0;background:#2F7D32;color:#fff;font-size:18px;font-weight:800}',
 '#nbov .nbsec{min-height:52px;border-radius:14px;border:1px solid #CFC8B4;background:#fff;color:#1E2A1A;font-size:16px;font-weight:700}',
 '#nbov .nblink{background:none;border:0;color:#2F6DB5;font-size:16px;text-decoration:underline;min-height:40px}',
 '#nbov .nberr{color:#B3261E;font-weight:700}#nbov .nbok{color:#2F7D32;font-weight:700}',
 '#nbov .nbcard{background:#fff;border-radius:16px;padding:14px;box-shadow:0 2px 10px rgba(0,0,0,.06);display:flex;flex-direction:column;gap:10px}',
 '.nbacc .row{align-items:center}.nbacc .nbst{font-size:14px}.nbacc .btn{width:auto}'
].join('\n');document.head.appendChild(st)})();
var NBF={modo:'entrar',msg:'',err:'',ocupado:false};
function nbSlug(s){return String(s||'').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'').replace(/[^a-z0-9]+/g,'').slice(0,16)||'chofer'}
function nbErrTxt(e){var c=(e&&e.code)||String(e&&e.message||e);if(/invalid-credential|wrong-password|user-not-found|invalid-login/.test(c))return 'Usuario o contraseña incorrectos';if(/network|unavailable|offline/.test(c))return 'Sin internet. Conéctate para entrar la primera vez';if(/too-many/.test(c))return 'Demasiados intentos. Espera unos minutos';if(/email-already/.test(c))return 'Ese correo ya tiene cuenta';if(/weak-password/.test(c))return 'La contraseña debe tener al menos 6 letras o números';if(/invalid-email/.test(c))return 'Ese correo no es válido';if(/permission/.test(c))return 'Sin permiso. Revisa las reglas de la base de datos';return 'No se pudo: '+c}
function nbLogo(){return '<img src="'+(typeof LOGO_IC!=='undefined'?LOGO_IC:'')+'" alt="" style="width:72px;height:72px;border-radius:20px;align-self:center">'}
function nbOvHTML(){var e=NB.est,h='<div class="nbw">'+nbLogo();
 if(e==='auth'||e==='perfil'||e==='cargando'||e==='conectando')return h+'<h1 style="text-align:center">'+(e==='conectando'?'Conectando…':'Cargando los datos…')+'</h1><p style="text-align:center">'+(e==='conectando'?'Este celular necesita internet la primera vez para bajar los datos del negocio.':'Un momento.')+'</p></div>';
 if(e==='sinacceso')return h+'<h1>Esta cuenta no tiene acceso</h1><p>Pídele al administrador que te dé acceso desde Personal.</p>'+(NB.err?'<p class="lbl">'+esc(NB.err)+'</p>':'')+'<button class="nbsec" data-nb="salir">Salir y entrar con otra cuenta</button></div>';
 if(e==='espera')return h+'<h1>Todavía no hay datos del negocio</h1><p>El administrador tiene que entrar primero y dejar lista la app. Luego abre la app otra vez.</p><button class="nbbtn" data-nb="reintentar">Ya está, intentar otra vez</button><button class="nbsec" data-nb="salir">Salir</button></div>';
 if(e==='decide')return h+'<h1>¿Qué subimos a la nube?</h1><p>La nube está vacía y este celular ya tiene datos de prueba.</p><button class="nbbtn" data-nb="subir">Subir lo que tiene este celular</button><button class="nbsec" data-nb="cero">Empezar desde cero</button><p class="lbl">Desde cero: este celular también se borra y empieza la configuración inicial.</p></div>';
 if(e!=='login')return '';
 if(NBF.modo==='crear')return h+'<h1>Crear la cuenta del negocio</h1><p>Solo se hace una vez, con el correo del dueño o del negocio. Con ese correo recuperas la contraseña si se te olvida.</p>'
  +'<label for="nbn">Tu nombre</label><input id="nbn" type="text" autocomplete="name" value="'+esc(NBF.n||'')+'"><label for="nbe">Correo</label><input id="nbe" type="email" autocomplete="email" inputmode="email" value="'+esc(NBF.e||'')+'"><label for="nbp">Contraseña (6 o más)</label><input id="nbp" type="password" autocomplete="new-password"><label for="nbp2">Repite la contraseña</label><input id="nbp2" type="password" autocomplete="new-password">'
  +(NBF.err?'<div class="nberr">'+esc(NBF.err)+'</div>':'')+'<button class="nbbtn" data-nb="crear"'+(NBF.ocupado?' disabled':'')+'>'+(NBF.ocupado?'Creando…':'Crear cuenta')+'</button><button class="nblink" data-nb="aentrar">Ya tengo cuenta: entrar</button></div>';
 return h+'<h1>Entrar</h1><p>Solo la primera vez en este celular. Después entras con tu PIN.</p><label for="nbu">Usuario o correo</label><input id="nbu" type="text" autocomplete="username" autocapitalize="none" value="'+esc(NBF.u||'')+'"><label for="nbp">Contraseña</label><input id="nbp" type="password" autocomplete="current-password">'
  +(NBF.err?'<div class="nberr">'+esc(NBF.err)+'</div>':'')+(NBF.msg?'<div class="nbok">'+esc(NBF.msg)+'</div>':'')+'<button class="nbbtn" data-nb="entrar"'+(NBF.ocupado?' disabled':'')+'>'+(NBF.ocupado?'Entrando…':'Entrar')+'</button><button class="nblink" data-nb="olvide">Olvidé mi contraseña</button>'
  +(NB.revErr?'<div class="nberr" style="font-size:14px">No pude revisar la nube: '+esc(/permission|insufficient/i.test(NB.revErr)?'faltan las reglas en Firestore (pestaña Reglas → Publicar)':(/offline|unavailable|network/i.test(NB.revErr)?'no hay internet':NB.revErr))+'.</div>':'')+(NB.duenioHay!==true?'<div class="nbcard"><b>¿Es la primera vez que usan la app?</b><div class="lbl">El dueño crea la cuenta del negocio. Después él les da acceso a los choferes.</div><button class="nbsec" data-nb="acrear">Crear la cuenta del negocio</button></div>':'')+'</div>'}
var _nbSig='';
function nbPantalla(){if(!NB.on)return;var e=NB.est,ver=!(e==='listo'||e==='off'),o=document.getElementById('nbov');
 if(!ver){if(o)o.remove();_nbSig='';return}
 var sig=e+'|'+NB.revErr+'|'+NBF.modo+'|'+NBF.err+'|'+NBF.msg+'|'+NBF.ocupado+'|'+NB.duenioHay+'|'+NB.err;if(o&&sig===_nbSig)return;_nbSig=sig;
 var vals={};if(o)Array.prototype.forEach.call(o.querySelectorAll('input'),function(i){vals[i.id]=i.value});
 if(!o){o=document.createElement('div');o.id='nbov';o.setAttribute('role','dialog');o.setAttribute('aria-label','Entrar');document.body.appendChild(o)}
 o.innerHTML=nbOvHTML();Object.keys(vals).forEach(function(id){var i=document.getElementById(id);if(i&&vals[id])i.value=vals[id]})}
function nbV(id){var i=document.getElementById(id);return i?String(i.value||'').trim():''}
document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('#nbov [data-nb]');if(!b)return;e.stopImmediatePropagation();e.preventDefault();var a=b.dataset.nb,ad=NB.ad;NBF.err='';NBF.msg='';
 if(a==='acrear'){NBF.modo='crear';nbPantalla();return}
 if(a==='aentrar'){NBF.modo='entrar';nbPantalla();return}
 if(a==='salir'){ad.salir();return}
 if(a==='reintentar'){location.reload();return}
 if(a==='subir'){NB.decide=true;NB.listo=true;NB.est='listo';S.diaNube=iso(TODAY);nbForzarRol();nbRender();nbEmpuja();return}
 if(a==='cero'){NB.decide=true;var keep={role:'admin'};S=fresh();S.role=keep.role;NB.listo=true;NB.est='listo';S.diaNube=iso(TODAY);nbForzarRol();nbRender();nbEmpuja();return}
 if(a==='olvide'){var u=nbV('nbu');NBF.u=u;if(u.indexOf('@')<0){NBF.err=u?'Pídele al administrador una contraseña nueva (desde Personal).':'Escribe tu correo arriba y vuelve a tocar "Olvidé mi contraseña".';nbPantalla();return}
  ad.reset(u).then(function(){NBF.msg='Te mandamos un correo a '+u+' para cambiar la contraseña. Revisa también "Spam".';nbPantalla()},function(er){NBF.err=nbErrTxt(er);nbPantalla()});return}
 if(a==='entrar'){var id=nbV('nbu'),pw=(document.getElementById('nbp')||{}).value||'';NBF.u=id;if(!id||!pw){NBF.err='Escribe tu usuario y tu contraseña';nbPantalla();return}NBF.ocupado=true;nbPantalla();
  var correo=id.indexOf('@')>-1?Promise.resolve(id):ad.get('usuarios/'+nbSlug(id)).then(function(d){if(!d||!d.email)throw {code:'invalid-credential'};return d.email});
  correo.then(function(em){return ad.login(em,pw)}).then(function(){NBF.ocupado=false},function(er){NBF.ocupado=false;NBF.err=nbErrTxt(er)+(NB.duenioHay!==true?'. Si es la primera vez, primero toca "Crear la cuenta del negocio" (abajo).':'. La contraseña es la de la app, no la de tu correo.');nbPantalla()});return}
 if(a==='crear'){var n=nbV('nbn'),em=nbV('nbe'),p1=(document.getElementById('nbp')||{}).value||'',p2=(document.getElementById('nbp2')||{}).value||'';NBF.n=n;NBF.e=em;
  if(!n||!em||!p1){NBF.err='Llena tu nombre, correo y contraseña';nbPantalla();return}if(p1.length<6){NBF.err='La contraseña debe tener al menos 6 letras o números';nbPantalla();return}if(p1!==p2){NBF.err='Las contraseñas no son iguales';nbPantalla();return}
  NBF.ocupado=true;NB.creando=true;nbPantalla();var adm=S.adminYo||((S.admins||[])[0]||{}).k||'rn';
  ad.crear(em,p1).then(function(uid){return ad.set('meta/duenio',{uid:uid,email:em,t:Date.now()},false).then(function(){return ad.set('usuarios_app/'+uid,{rol:'admin',activo:true,nombre:n,email:em,adm:adm,chId:2,duenio:true,idBase:0,t:Date.now()},false)}).then(function(){return uid})})
  .then(function(uid){NBF.ocupado=false;NB.creando=false;try{var A=(S.admins||[]).filter(function(x){return x.k===adm})[0];if(A)A.n=n}catch(e){}return ad.get('usuarios_app/'+uid).then(function(p){NB.perfil=p;nbEmpezarSync()})},function(er){NBF.ocupado=false;NB.creando=false;NBF.err=nbErrTxt(er);nbPantalla()});return}},true);
/* ---------- arranque automático en la versión real ---------- */
setTimeout(function(){if(nbPuede())nbIniciar()},0);
/* ---------- Personal: accesos a la app ---------- */
function nbCuentaDe(t,ref){var L=Object.keys(NB.usuarios).map(function(uid){var p=NB.usuarios[uid];return {uid:uid,p:p}}).filter(function(x){var p=x.p;return p&&(t==='a'?(p.rol==='admin'&&p.adm===ref):t==='k'?p.rol==='cont':t==='l'?(p.rol==='local'&&+p.chId===+ref):(p.rol==='chofer'&&+p.chId===+ref))});
 L.sort(function(a,b){return (b.p.activo?1:0)-(a.p.activo?1:0)||num(b.p.t)-num(a.p.t)});return L[0]||null}
function nbIdBase(){var mx=0;Object.keys(NB.usuarios).forEach(function(u){mx=Math.max(mx,num(NB.usuarios[u].idBase))});return mx+100000}
function nbGenPw(){var s='';for(var i=0;i<6;i++)s+=Math.floor(Math.random()*10);return s}
function nbAccHTML(){if(!NB.on||!NB.listo||S.role!=='admin'||!NB.perfil||NB.perfil.rol!=='admin')return '';var h='<div class="card nbacc" data-k="nbacc"><b>Accesos a la app</b><div class="lbl">Quién puede entrar en su celular. Cada uno entra una vez con su usuario y contraseña, y luego con su PIN.</div>';
 var fila=function(t,ref,nom,sub){var c=nbCuentaDe(t,ref),p=c&&c.p,yo=c&&NB.user&&c.uid===NB.user.uid,nuevo=NB.nuevo&&NB.nuevo.t===t&&String(NB.nuevo.ref)===String(ref);
  var r='<div style="border-top:1px solid var(--line);padding:10px 0"><div style="display:flex;align-items:center;gap:8px"><span class="grow"><b>'+esc(nom)+'</b> <span class="lbl">'+sub+'</span><br><span class="nbst '+(p&&p.activo?'':'neg')+'">'+(p&&p.activo?'✓ Entra '+(p.usuario?'con el usuario <b>'+esc(p.usuario)+'</b>':'con '+esc(p.email||''))+(yo?' (eres tú)':''):(p?'Acceso quitado':'Sin acceso'))+'</span></span></div>';
  if(nuevo){var N=NB.nuevo;if(N.listo)r+='<div class="card good" style="margin:8px 0 0"><b>Listo. Dale estos datos:</b><div style="font-size:18px;margin-top:6px">'+(N.e?'Correo: <b>'+esc(N.e)+'</b><br>':'Usuario: <b>'+esc(N.u)+'</b><br>')+'Contraseña: <b>'+esc(N.pw)+'</b></div><div class="lbl">Anótalos ahora: después ya no se pueden ver.</div>'+(N.tel?'<a class="btn sm" style="margin-top:8px;display:flex;align-items:center;justify-content:center;text-decoration:none" target="_blank" rel="noopener" href="https://wa.me/52'+String(N.tel).replace(/\D/g,'').slice(-10)+'?text='+encodeURIComponent('Hola '+nom+'. Para entrar a Ruta Fácil:\n'+(N.e?'Correo: '+N.e:'Usuario: '+N.u)+'\nContraseña: '+N.pw+'\nLa primera vez necesitas internet. Después entras con tu PIN.')+'">📲 Mandárselos por WhatsApp</a>':'')+'<button class="btn sm sec" style="margin-top:8px" data-act="nbaccok">Ya los anoté</button></div>';
   else r+='<div class="card" style="margin:8px 0 0">'+(!N.e?'<div class="field"><label for="nbau">Usuario</label><input id="nbau" type="text" autocapitalize="none" data-nbb="nbN.u" value="'+esc(N.u)+'" style="width:160px;text-align:left"></div>':'<div class="field"><label for="nbae">Su correo</label><input id="nbae" type="email" data-nbb="nbN.e" value="'+esc(N.e||'')+'" style="width:190px;text-align:left"></div>')
    +'<div class="field"><label for="nbap">Contraseña</label><input id="nbap" type="text" data-nbb="nbN.pw" value="'+esc(N.pw)+'" style="width:160px;text-align:left"></div>'+(N.err?'<div class="neg">'+esc(N.err)+'</div>':'')+'<div style="display:flex;gap:8px;margin-top:8px"><button class="btn sm" style="flex:2" data-act="nbaccsi"'+(N.ocupado?' disabled':'')+'>'+(N.ocupado?'Creando…':(N.reset?'Darle la contraseña nueva':'Darle acceso'))+'</button><button class="btn sm sec" style="flex:1" data-act="nbaccno">Cancelar</button></div></div>';
   return r+'</div>'}
  var soyDue=!!(NB.perfil&&NB.perfil.duenio),esDue=!!(p&&p.duenio),manda=t!=='a'||soyDue;
  if(!p||!p.activo){if(manda)r+='<button class="btn sm" style="margin-top:6px" data-act="nbacc" data-t="'+t+'" data-ref="'+esc(String(ref))+'">'+(p?'Devolverle el acceso':'Darle acceso')+'</button>';else r+='<div class="lbl">Solo el dueño da acceso a los administradores.</div>'}
  else if(!yo)r+='<div style="display:flex;gap:8px;margin-top:6px;flex-wrap:wrap">'+(esDue?'<button class="btn sm sec" data-act="nbaccmail" data-e="'+esc(p.email||'')+'">Mandarle correo para cambiar contraseña</button>':'<button class="btn sm sec" data-act="nbacc" data-t="'+t+'" data-ref="'+esc(String(ref))+'" data-reset="1">Contraseña nueva</button>')+(manda&&!esDue?'<button class="btn sm sec" data-act="nbcorte" data-uid="'+c.uid+'">Cerrar su sesión en sus celulares</button><button class="btn sm sec" style="color:var(--danger)" data-act="nbaccquita" data-uid="'+c.uid+'">Quitar acceso</button>':'')+'</div>';
  return r+'</div>'};
 (S.admins||[]).forEach(function(a){h+=fila('a',a.k,a.n,'· Administrador')});
 (S.choferes||[]).forEach(function(c){if(c.baja||c.arch||esAdm(c))return;if(esCh(c))h+=fila('c',c.id,c.n||'Chofer','· Chofer'+(S.enc&&+S.enc.ch===+c.id&&encVig()?' y encargado':''));else if(c.puesto==='local')h+=fila('l',c.id,c.n||'Venta local','· Venta local')});
 if(S.cfg.contador||S.pins.cont||nbCuentaDe('k','cont'))h+=fila('k','cont',(S.cfg.contadorN||'Contador'),'· Contador');else h+='<button class="link" style="margin-top:6px" data-act="nbacc" data-t="k" data-ref="cont">+ Darle acceso al contador</button>';
 h+='<div class="lbl" style="margin-top:8px">El encargado entra con su misma cuenta de chofer: mientras sea encargado le aparece "Entrar como encargado".</div>';
 return h+'</div>'}
/* personal: pasó a tema-personal.js */
if(typeof VIEWS!=='undefined'&&VIEWS.personal)VIEWS.personal=personal;
document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act]');if(!b)return;var a=b.dataset.act;if(['nbacc','nbaccsi','nbaccno','nbaccok','nbaccquita','nbaccmail','nbsalir','nbcorte'].indexOf(a)<0)return;e.stopImmediatePropagation();var ad=NB.ad;
 if(a==='nbsalir'){abrirModal('¿Cerrar la sesión en este celular?','Para volver a entrar vas a necesitar tu usuario y contraseña (y internet).',[['Sí, cerrar sesión','nbsalirya']]);return}
 if(a==='nbacc'){var t=b.dataset.t,ref=b.dataset.ref,nom='',tel='';if(t==='c'||t==='l'){var ch=S.choferes.filter(function(x){return String(x.id)===ref})[0];nom=ch?ch.n:'';tel=ch?ch.tel:''}else if(t==='k'){nom=S.cfg.contadorN||'Contador'}else{var A=(S.admins||[]).filter(function(x){return x.k===ref})[0];nom=A?A.n:''}
  var prev=nbCuentaDe(t,ref);NB.nuevo={t:t,ref:ref,nom:nom,tel:tel,u:prev&&prev.p.usuario?prev.p.usuario:nbSlug(nom.split(' ')[0]),e:prev&&prev.p.duenio?prev.p.email:'',pw:nbGenPw(),reset:!!b.dataset.reset||!!prev,prev:prev};render();return}
 if(a==='nbcorte'){var u2=b.dataset.uid;nbCorte(u2).then(function(){toast('Listo: se cierra su sesión en todos sus celulares. Para volver a entrar necesita usuario y contraseña.');render()},function(er){toast(nbErrTxt(er))});return}
 if(a==='nbaccno'){NB.nuevo=null;render();return}
 if(a==='nbaccok'){NB.nuevo=null;render();return}
 if(a==='nbaccmail'){ad.reset(b.dataset.e).then(function(){toast('Le mandamos el correo a '+b.dataset.e)},function(er){toast(nbErrTxt(er))});return}
 if(a==='nbaccquita'){var uid=b.dataset.uid;ad.set('usuarios_app/'+uid,{activo:false,quitado:Date.now()},true).then(function(){toast('Acceso quitado');if(NB.usuarios[uid])NB.usuarios[uid].activo=false;render()},function(er){toast(nbErrTxt(er))});return}
 if(a==='nbaccsi'){var N=NB.nuevo;if(!N||N.ocupado)return;N.u=nbSlug(N.u);N.pw=String(N.pw||'').trim();N.e=String(N.e||'').trim();N.err='';if(N.pw.length<6){N.err='La contraseña debe tener al menos 6 letras o números';render();return}
  N.ocupado=true;render();var prev=N.prev&&N.prev.p,base=prev&&prev.idBase?prev.idBase:nbIdBase();
  var paso=!N.e?ad.get('usuarios/'+N.u).then(function(d){if(d&&d.email&&!(prev&&prev.usuario===N.u))throw {code:'usuario-ocupado'};return N.u+'.'+Date.now().toString(36)+'@rutafacil.app'}):Promise.resolve(N.e);
  paso.then(function(email){N.email=email;return ad.crearOtro(email,N.pw)}).then(function(uid){var perfil=N.t==='a'?{rol:'admin',activo:true,nombre:N.nom,adm:N.ref,chId:2,email:N.email,idBase:base,t:Date.now()}:N.t==='k'?{rol:'cont',activo:true,nombre:N.nom,chId:0,email:N.email,idBase:base,t:Date.now()}:{rol:N.t==='l'?'local':'chofer',activo:true,nombre:N.nom,chId:+N.ref,email:N.email,idBase:base,t:Date.now()};if(!N.e)perfil.usuario=N.u;if(prev&&prev.duenio)perfil.duenio=true;if(N.prev&&N.prev.uid)perfil.reemplaza=N.prev.uid;
   var ps=[ad.set('usuarios_app/'+uid,perfil,false)];if(!N.e)ps.push(ad.set('usuarios/'+N.u,{email:N.email,uid:uid},false));if(N.prev&&N.prev.uid!==uid)ps.push(ad.set('usuarios_app/'+N.prev.uid,{activo:false,reemplazo:uid},true));
   return Promise.all(ps).then(function(){NB.usuarios[uid]=perfil;if(N.prev&&NB.usuarios[N.prev.uid])NB.usuarios[N.prev.uid].activo=false})})
  .then(function(){N.ocupado=false;N.listo=true;S.hist.push({t:fmtF(iso(TODAY))+' '+hhmm(),q:quien(),x:(N.reset?'Le dio contraseña nueva a ':'Le dio acceso a la app a ')+N.nom});render()},function(er){N.ocupado=false;N.err=er&&er.code==='usuario-ocupado'?'Ese usuario ya lo tiene otra persona. Escribe otro.':nbErrTxt(er);render()});return}},true);
document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act="nbsalirya"]');if(!b)return;e.stopImmediatePropagation();S.modal=null;try{NB.ad.salir()}catch(er){}render()},true);
/* los campos del formulario de acceso (data-nbb="nbN.u") escriben en NB.nuevo */
document.addEventListener('input',function(e){var t=e.target;if(!t||!t.dataset||!/^nbN\./.test(t.dataset.nbb||'')||!NB.nuevo)return;NB.nuevo[t.dataset.nbb.slice(4)]=t.value},true);
/* ---------- menú: estado de la nube y cerrar sesión ---------- */
function nbEstadoTxt(){if(!NB.on||!NB.listo)return '';return NB.pend>0?(navigator.onLine===false?'☁️ Sin señal: '+NB.pend+' cambio'+(NB.pend>1?'s':'')+' por subir':'☁️ Subiendo '+NB.pend+' cambio'+(NB.pend>1?'s':'')+'…'):'☁️ Todo guardado en la nube'}
function nbIndicador(){var el=document.getElementById('nbind');if(el)el.textContent=nbEstadoTxt()}
var _menu29=menuHTML;menuHTML=function(r){var h=_menu29.apply(this,arguments);if(!NB.on||!NB.listo)return h;var add='<div style="border-top:1px solid var(--line);margin-top:10px;padding-top:10px"><div id="nbind" class="lbl">'+nbEstadoTxt()+'</div><div class="lbl">'+esc(NB.user&&NB.user.email&&!/@rutafacil\.app$/.test(NB.user.email)?NB.user.email:(NB.perfil&&NB.perfil.usuario?'Usuario: '+NB.perfil.usuario:''))+'</div><button class="link" data-act="nbsalir">Cerrar sesión en este celular</button></div>';
 var i=h.lastIndexOf('</nav>');return i<0?h+add:h.slice(0,i)+add+h.slice(i)};

/* el teclado no tapa lo que se escribe (en toda la app).
   El celular ya achica la pantalla cuando sale el teclado; aquí solo se mueve lo justo para que el campo quede a la vista.
   Solo si el campo está hasta abajo y ya no hay para dónde subir, se agrega un espacio abajo. */
(function(){var st=document.createElement('style');st.textContent=[
 'html.kbopen [id$="ov"]{overflow-y:auto;align-items:safe flex-end}',
 'html.kbesp main::after,.kbesp::after{content:"";display:block;height:40vh;pointer-events:none}'].join('\n');document.head.appendChild(st)})();
function kbCampo(el){return el&&(el.tagName==='TEXTAREA'||(el.tagName==='INPUT'&&!/^(checkbox|radio|file|range|button|submit|color|hidden)$/i.test(el.type||'')))}
function kbContenedor(el){for(var p=el.parentElement;p&&p!==document.body;p=p.parentElement){var oy=getComputedStyle(p).overflowY;if(oy==='auto'||oy==='scroll')return p}return null}
function kbVisible(el){var r=el.getBoundingClientRect(),vh=window.visualViewport?window.visualViewport.height:innerHeight;return r.top>=Math.max(56,vh*0.06)&&r.bottom<=vh-12}
function tecladoAcomoda(){var el=document.activeElement;if(!kbCampo(el)||kbVisible(el))return;
 try{el.scrollIntoView({block:'center',inline:'nearest',behavior:'instant'})}catch(e){el.scrollIntoView(false)}
 if(kbVisible(el))return;
 /* ya no hay para dónde subir: un espacio abajo y otra vez */
 var c=kbContenedor(el);if(c)c.classList.add('kbesp');else document.documentElement.classList.add('kbesp');
 try{el.scrollIntoView({block:'center',inline:'nearest',behavior:'instant'})}catch(e){}}
var _kbT=0;function kbProg(ms){clearTimeout(_kbT);_kbT=setTimeout(tecladoAcomoda,ms)}
document.addEventListener('focusin',function(e){if(!kbCampo(e.target))return;document.documentElement.classList.add('kbopen');kbProg(350)},true);
document.addEventListener('focusout',function(){setTimeout(function(){if(kbCampo(document.activeElement))return;document.documentElement.classList.remove('kbopen','kbesp');Array.prototype.forEach.call(document.querySelectorAll('.kbesp'),function(x){x.classList.remove('kbesp')})},200)},true);
if(window.visualViewport)window.visualViewport.addEventListener('resize',function(){kbProg(80)});
