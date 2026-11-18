/* ===================== TEMA · Nube: subir y bajar los datos (aplanado el 18 nov) =====================
   Antes estaba repartido en 10 envolturas encadenadas en l28, l36, l61, l64, l77.
   Aquí está todo junto, en el MISMO orden, y hace exactamente lo mismo (comprobado con pruebas/comp-nube.js
   y con las pruebas de varios celulares t61, t94nube, t122nube y t123nube).
   Se arma justo después de tema-ajustes.js (antes de los otros temas).
   Si se cambia algo de esto, se cambia AQUÍ (no se agregan envolturas en capas nuevas).

   - nbDocAPlano, nbCodifica, nbArma: cómo se convierte cada dato para la nube y de regreso.
   - nbEmpuja, nbPrimera: subir lo del celular y la primera bajada.
   - nbEmpezarSync, nbForzarRol, nbPantalla: arrancar la sincronización, el papel de cada quien y la pantalla de la nube.
   - guardarYa: guardar en el celular.
   NO están aquí (se quedan en su capa a propósito):
   - fresh (l2, l5, l6b, l7, l45, l72, l80): van dentro de bloques que también cambian S al cargar, y l7 usa la copia de l6b.
   - nbAplica (l61, l77, l80, l82): dos de sus envolturas van dentro de bloques; mover solo una parte cambiaría el orden
     (la pausa del diagnóstico de l77 se saltaría la limpieza de l80/l82).
   ============================================================================================ */

/* nbDocAPlano · de l28 */
var _nbDocAPlano0=nbDocAPlano;nbDocAPlano=function(d){var F=_nbDocAPlano0(d);if(F['c:_']!==undefined&&d&&d.k==='n'){F['c:']=F['c:_'];delete F['c:_']}return F};

/* nbEmpezarSync · de l36 */
if(typeof nbEmpezarSync==='function'){var _nes36=nbEmpezarSync;nbEmpezarSync=function(){var r=_nes36.apply(this,arguments);try{nbSesionIni();if(NB.ad&&NB.user&&!NB._unp){var path='usuarios_app/'+NB.user.uid;if(NB.ad.watchDoc)NB._unp=NB.ad.watchDoc(path,function(d){if(d){NB.perfil=d;nbRevisaSesion(d)}});else{NB._unp=setInterval(function(){NB.ad.get(path).then(function(d){if(d){NB.perfil=d;nbRevisaSesion(d)}},function(){})},60000)}}}catch(e){}return r}}

/* nbForzarRol · de l36 */
var _nfr36=nbForzarRol;nbForzarRol=function(){var p=NB.perfil;if(!p||!NB.listo)return;if(p.rol==='encargado'){S.role='admin';S.encOn=true;if(+S.chofHoy!==+p.chId){try{chCambiar(+p.chId)}catch(e){S.chofHoy=+p.chId}}return}if(p.rol==='cont'){S.role='cont';return}if(p.rol==='local'){S.role='local';return}return _nfr36.apply(this,arguments)};

/* nbCodifica · de l61 */
var _nbCod61=nbCodifica;nbCodifica=function(u,v){if(salListo()){if(u.k==='tarasProv')return null;
  if(u.k==='cli'&&Array.isArray(v)){v=v.map(function(c){if(!nbEsObj(c))return c;var o={};Object.keys(c).forEach(function(p){if(p!=='cred'&&p!=='vac')o[p]=c[p]});return o})}}return _nbCod61.call(this,u,v)};

/* nbEmpuja · de l61 */
var _nbEmp61=nbEmpuja;nbEmpuja=function(){try{salMigra();if(!salPrimera())salPuente()}catch(e){console.error('saldos',e)}return _nbEmp61.apply(this,arguments)};

/* nbPantalla · de l64 */
var _nbPan64=nbPantalla;nbPantalla=function(){try{if(nbEsPermiso(NB.revErr)){NB.revErr='';NB.duenioHay=null}}catch(e){}var r=_nbPan64.apply(this,arguments);
 try{var o=document.getElementById('nbov');if(o){Array.prototype.forEach.call(o.querySelectorAll('.nbcard'),function(c){if(c.dataset.p64||!/primera vez/i.test(c.textContent))return;c.dataset.p64='1';
  var d=document.createElement('div');d.className='lbl';d.style.cssText='margin-top:8px;font-weight:700;color:var(--danger)';d.textContent='Solo si el negocio NUNCA ha usado la app. Si ya la usan, toca "Entrar" arriba con el correo o usuario del administrador.';c.appendChild(d)})}}catch(e){}return r};

/* nbForzarRol · de l64 */
var _nfr64=nbForzarRol;nbForzarRol=function(){var p=NB.perfil;
 try{if(p&&NB.listo&&p.rol==='admin'&&NB.user&&_rolUid64!==NB.user.uid){_rolUid64=NB.user.uid;
   if(p.adm&&(S.admins||[]).some(function(a){return a.k===p.adm}))S.adminYo=p.adm;
   if(S.role!=='admin'||S.encOn){S.role='admin';S.encOn=false;S.tab.admin='inicio';S.pinOk={};try{pinEntrar()}catch(e){}}}}catch(e){console.error(e)}
 return _nfr64.apply(this,arguments)};

/* guardarYa · de l77 */
if(typeof guardarYa==='function'){var _gY77=guardarYa;guardarYa=function(){if(window._noGuardar77)return;return _gY77.apply(this,arguments)}}

/* nbPrimera · de l77 */
if(typeof nbPrimera==='function'){var _nbP77=nbPrimera;nbPrimera=function(docs){try{return _nbP77.apply(this,arguments)}catch(e){falloAnota77(e,'al cargar la nube');
  try{NB.listo=true;NB.est='listo'}catch(x){}try{nbForzarRol()}catch(x){}try{S.diaNube=iso(TODAY)}catch(x){}try{S.pinOk={};if(!(S.setup&&!S.setup.fin))pinEntrar()}catch(x){falloAnota77(x,'al pedir el PIN')}
  try{falloSeguro77();nbRender()}catch(x){falloPantalla77(falloAnota77(x,'al dibujar después de cargar'))}try{nbEmpuja()}catch(x){}}}}

/* nbArma · de l77 */
if(typeof nbArma==='function'){var _nbAr77=nbArma;nbArma=function(u,F,viejo){try{if(F&&(F.k==='a'||F.k==='m')){var ord={},G={};Object.keys(F).forEach(function(f){if(f.slice(0,2)==='o:')ord[f.slice(2)]=1;else if(f.slice(0,2)==='e:'){var r=f.slice(2),i=r.indexOf('|');G[r.slice(0,i)]=G[r.slice(0,i)]||{};G[r.slice(0,i)][r.slice(i+1)]=1}});
  var suelto={};Object.keys(G).forEach(function(K){if((F.k==='m'||!ord[K])&&!G[K]['#']&&!G[K]['='])suelto[K]=1});if(Object.keys(suelto).length){var F2={};Object.keys(F).forEach(function(f){if(f.slice(0,2)==='e:'){var r=f.slice(2),K=r.slice(0,r.indexOf('|'));if(suelto[K])return}F2[f]=F[f]});F=F2}}}catch(e){}return _nbAr77.call(this,u,F,viejo)}}
