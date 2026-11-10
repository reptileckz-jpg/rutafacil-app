/* ===================== v7.2.1 · entrar en otro celular (10 nov)
   - Sin sesión, la app no puede leer si el negocio ya tiene dueño (las reglas solo dejan leer con sesión):
     ya no sale el error rojo "faltan las reglas"; y "Crear la cuenta del negocio" avisa que es solo la primera vez.
   - Si alguien crea "la cuenta del negocio" cuando ya existe: se borra esa cuenta nueva y se explica cómo entrar.
   - "Olvidé mi contraseña" con usuario (sin @): si es un administrador con correo real, se le manda el correo. ===================== */
function nbEsPermiso(x){return /permission|insufficient/i.test(String(x||''))}
var _nbPan64=nbPantalla;nbPantalla=function(){try{if(nbEsPermiso(NB.revErr)){NB.revErr='';NB.duenioHay=null}}catch(e){}var r=_nbPan64.apply(this,arguments);
 try{var o=document.getElementById('nbov');if(o){Array.prototype.forEach.call(o.querySelectorAll('.nbcard'),function(c){if(c.dataset.p64||!/primera vez/i.test(c.textContent))return;c.dataset.p64='1';
  var d=document.createElement('div');d.className='lbl';d.style.cssText='margin-top:8px;font-weight:700;color:var(--danger)';d.textContent='Solo si el negocio NUNCA ha usado la app. Si ya la usan, toca "Entrar" arriba con el correo o usuario del administrador.';c.appendChild(d)})}}catch(e){}return r};
window.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('#nbov [data-nb="crear"],#nbov [data-nb="olvide"]');if(!b)return;var ad=NB.ad;if(!ad)return;var a=b.dataset.nb;
 if(a==='olvide'){var u=nbV('nbu');if(!u||u.indexOf('@')>-1)return;e.preventDefault();e.stopImmediatePropagation();NBF.u=u;NBF.err='';NBF.msg='';
  ad.get('usuarios/'+nbSlug(u)).then(function(d){var em=d&&d.email;if(!em||/@rutafacil\.app$/i.test(em)){NBF.err='Ese usuario no tiene correo propio. Pídele al administrador una contraseña nueva (desde Personal).';nbPantalla();return}
   return ad.reset(em).then(function(){var p=em.split('@');NBF.msg='Te mandamos un correo a '+p[0].slice(0,2)+'•••@'+p[1]+' para cambiar la contraseña. Revisa también "Spam".';nbPantalla()})},function(er){NBF.err=nbErrTxt(er);nbPantalla()});return}
 /* crear la cuenta del negocio */
 var n=nbV('nbn'),em=nbV('nbe'),p1=(document.getElementById('nbp')||{}).value||'',p2=(document.getElementById('nbp2')||{}).value||'';if(!n||!em||!p1||p1.length<6||p1!==p2)return;/* los errores de llenado los dice la app de siempre */
 e.preventDefault();e.stopImmediatePropagation();NBF.n=n;NBF.e=em;NBF.err='';NBF.ocupado=true;NB.creando=true;nbPantalla();var adm=S.adminYo||((S.admins||[])[0]||{}).k||'rn';
 var yaHay=function(){NBF.ocupado=false;NB.creando=false;NBF.modo='entrar';NBF.err='Este negocio ya tiene su cuenta: no se crea otra. Para entrar, escribe arriba el correo o usuario del administrador y su contraseña. Si no la recuerdas, escribe el correo y toca "Olvidé mi contraseña".';
  var fin=function(){try{ad.salir()}catch(x){}nbPantalla()};try{(ad.borrarYo?ad.borrarYo():Promise.resolve()).then(fin,fin)}catch(x){fin()}};
 ad.crear(em,p1).then(function(uid){return ad.get('meta/duenio').then(function(d){if(d&&d.uid&&d.uid!==uid){yaHay();return null}
   return ad.set('meta/duenio',{uid:uid,email:em,t:Date.now()},false).then(function(){return ad.set('usuarios_app/'+uid,{rol:'admin',activo:true,nombre:n,email:em,adm:adm,chId:2,duenio:true,idBase:0,t:Date.now()},false)}).then(function(){return uid})})})
 .then(function(uid){if(!uid)return;NBF.ocupado=false;NB.creando=false;try{var A=(S.admins||[]).filter(function(x){return x.k===adm})[0];if(A)A.n=n}catch(x){}return ad.get('usuarios_app/'+uid).then(function(p){NB.perfil=p;nbEmpezarSync()})},
  function(er){if(nbEsPermiso(er&&(er.code||er.message))){yaHay();return}NBF.ocupado=false;NB.creando=false;NBF.err=/email-already/.test(String(er&&er.code))?'Ese correo ya tiene cuenta: toca "Ya tengo cuenta: entrar" y entra con él.':nbErrTxt(er);nbPantalla()})},true);
/* ---------- cada cuenta abre con su puesto: si entra la cuenta del administrador, el celular abre como administrador
   (antes, si ese celular estaba guardado como chofer, se quedaba como chofer). El admin todavía puede "entrar como" otro desde el menú. ---------- */
var _rolUid64=null;
var _nfr64=nbForzarRol;nbForzarRol=function(){var p=NB.perfil;
 try{if(p&&NB.listo&&p.rol==='admin'&&NB.user&&_rolUid64!==NB.user.uid){_rolUid64=NB.user.uid;
   if(p.adm&&(S.admins||[]).some(function(a){return a.k===p.adm}))S.adminYo=p.adm;
   if(S.role!=='admin'||S.encOn){S.role='admin';S.encOn=false;S.tab.admin='inicio';S.pinOk={};try{pinEntrar()}catch(e){}}}}catch(e){console.error(e)}
 return _nfr64.apply(this,arguments)};
