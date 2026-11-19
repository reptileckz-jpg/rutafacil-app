/* ===================== TEMA · Entrar con PIN (crear, escribir, bloqueo, huella, quién puede entrar) (aplanado el 18 nov) =====================
   Antes estaba repartido en 12 envolturas encadenadas en l22, l28, l32, l36, l48, l58.
   Aquí está todo junto, en el MISMO orden, y hace exactamente lo mismo (comprobado con su prueba de comparación).
   Si se cambia algo de esto, se cambia AQUÍ (no se agregan envolturas en capas nuevas).

   Se arma justo después de tema-personal.js.
   - pinDe: el PIN de cada quien (en la real no hay "1234"); cuenta los intentos fallidos y bloquea 5 veces mal.
   - pinHTML: la pantalla del PIN (crear el PIN la primera vez, bloqueo, sin "saltar" en la real, huella o cara, olvidé mi PIN, cambiar de usuario).
   - pinRow: el renglón "PIN para entrar" en Ajustes y fichas (Reiniciar para el admin).
   - pinLimMin: cuántos minutos sin usar antes de pedir el PIN otra vez (chofer y venta local 40).
   - pinEntrar: si acaba de entrar hace poco (gracia), no lo vuelve a pedir.
   - personasEntrar: quién puede entrar en este celular según su cuenta de la nube.
   - entrarComo: al cambiar de usuario se borra la gracia.
   ============================================================================================ */

/* pinDe · de l22 */
var _pd22=pinDe;pinDe=function(k){if(REAL&&!S.pins[k])return '\u0000';return _pd22.apply(this,arguments)};

/* pinHTML · de l22 */
var _pinH22=pinHTML;pinHTML=function(){if(!_pin.modo)return '';var k=_pin.k;
 if(REAL&&!pinTiene(k)){if(_pnew.k!==k)_pnew={k:k,v:'',v1:null};var p2=_pnew.v1!=null;
  return '<div id="pinov" role="dialog" aria-label="Crea tu PIN"><div class="pw"><b style="font-size:20px">Hola, '+esc(pinNom(k))+'</b><div class="lbl">'+(p2?'Escríbelo otra vez para confirmar':'Crea tu PIN de 4 números. Con él vas a entrar a la app. No uses 1234 ni tu fecha de nacimiento.')+'</div>'
   +(_pnew.err?'<div class="neg" role="alert" style="font-weight:700;font-size:16px;margin:8px 0 0">'+esc(_pnew.err)+'</div>':'')+'<div class="dots">'+[0,1,2,3].map(function(i){return '<i class="'+(i<_pnew.v.length?'on':'')+'"></i>'}).join('')+'</div>'
   +'<div class="kp">'+[1,2,3,4,5,6,7,8,9].map(function(n){return '<button data-act="pnd" data-v="'+n+'">'+n+'</button>'}).join('')+'<button data-act="pnx" style="font-size:15px">'+(p2?'Volver':'')+'</button><button data-act="pnd" data-v="0">0</button><button data-act="pnb" aria-label="Borrar" style="font-size:20px">⌫</button></div>'+(REAL&&_pin.modo==='entrar'&&personasEntrar().length>1?'<button class="link" data-act="usrcambia">No soy '+esc(pinNom(k))+'</button>':'')+'</div></div>'}
 var bl=pinBloqueo(k),h=_pinH22.apply(this,arguments);
 if(bl)h=h.replace(/<div class="dots">/,'<div class="neg" style="font-weight:700;margin:6px 0">Demasiados intentos. Espera '+bl+'.</div><div class="dots">');
 if(REAL&&_pin.modo==='entrar'&&personasEntrar().length>1)h=h.replace(/<\/div><\/div>$/,'<button class="link" data-act="usrcambia">No soy '+esc(pinNom(k))+'</button></div></div>');
 return h};

/* pinDe · de l22 */
var _pd22b=pinDe;pinDe=function(k){var real=_pd22b.apply(this,arguments);if(!_pin||_pin.v.length!==4||_pin.k!==k)return real;
 if(pinBloqueo(k))return '\u0001';
 var f=pinFallas(k);if(_pin.v===real){f.n=0;return real}
 f.n++;if(f.n>=5){var min=PIN_ESP[Math.min(f.nivel,PIN_ESP.length-1)];f.hasta=Date.now()+min*60000;f.nivel++;f.n=0;
  S.avPrecio.push('URGENTE: alguien escribió mal 5 veces el PIN de '+pinNom(k)+' ('+hhmm()+'). Se bloqueó '+min+' min.');setTimeout(render,50)}
 return real};

/* pinRow · de l22 */
var _pinRow22=pinRow;pinRow=function(k){var h=_pinRow22.apply(this,arguments).replace('el de inicio (1234)',REAL?'todavía no lo crea (lo crea al entrar)':'el de inicio (1234)');
 if(S.role==='admin'&&!S.encOn&&k!==pinKey()&&pinTiene(k))h=h.replace('</button></div>','</button><button class="btn sm sec" style="width:auto;margin-left:6px" data-act="pinreset" data-k="'+k+'">Reiniciar</button></div>');return h};

/* personasEntrar · de l28 */
var _pe28=personasEntrar;personasEntrar=function(){var L=_pe28.apply(this,arguments),p=NB.perfil;if(!NB.on||!p)return L;if(p.rol==='chofer')return L.filter(function(x){return x.go&&x.go.role==='rep'&&+x.go.ch===+p.chId});return L.filter(function(x){return !(x.go&&x.go.role==='admin'&&x.go.adm!==p.adm)})};

/* pinHTML · de l32 */
var _pH32=pinHTML;pinHTML=function(){var h=_pH32.apply(this,arguments);if(!REAL||!h)return h;return h.replace(/<div[^>]*>En la demo el PIN de todos es 1234\.?<\/div>/,'').replace(/<button[^>]*data-act="pinskip"[^>]*>[^<]*<\/button>/,'')};

/* pinLimMin · de l36 */
var _plm36=pinLimMin;pinLimMin=function(k){k=k||pinKey();if(/^c:/.test(k)||k==='local')return 40;return _plm36.apply(this,arguments)};

/* pinHTML · de l36 */
var _pH36=pinHTML;pinHTML=function(){var h=_pH36.apply(this,arguments);if(!h||!_pin||_pin.modo!=='entrar')return h;var k=_pin.k,nm=esc(pinNom(k)),mas='';h=h.replace(/<button class="link" data-act="usrcambia">[^<]*<\/button>/,'');
 if(bioActiva(k)&&bioPl())mas+='<button class="huella" data-act="biousar">🫆 Entrar con mi huella</button>';
 mas+='<div class="pinmas"><button class="link" data-act="pinolv">Olvidé mi PIN</button><button class="link" data-act="pinotro">No soy '+nm+' · cambiar de usuario</button></div>';
 return h.replace(/<\/div><\/div>$/,mas+'</div></div>')};

/* personasEntrar · de l36 */
var _pe36=personasEntrar;personasEntrar=function(){var L=_pe36.apply(this,arguments),p=NB.perfil;if(!NB.on||!p)return L;if(p.rol==='cont')return L.filter(function(x){return x.k==='cont'});if(p.rol==='local')return L.filter(function(x){return x.go&&x.go.role==='local'});return L};

/* pinHTML · de l48 */
var _pH48=pinHTML;pinHTML=function(){var h=_pH48.apply(this,arguments);return h?h.replace('🫆 Entrar con mi huella','🫆 Entrar con mi huella o cara'):h};

/* pinEntrar · de l58 */
var _pinEnt58=pinEntrar;pinEntrar=function(){var k=pinKey();if(pnGracia(k)){S.pinOk[k]=true;return false}return _pinEnt58.apply(this,arguments)};

/* entrarComo · de l58 */
var _entC58=entrarComo;entrarComo=function(){_pinAuth={};return _entC58.apply(this,arguments)};

/* 147 · Ricardo: "cuando te pide el PIN y le das 'No eres Danu', se vuelve a poner el PIN: no te deja cambiar de usuario".
   En el celular de un chofer, la lista de "Cambiar de usuario" solo traía a ese chofer (la cuenta de la nube es suya): escogerlo pedía su PIN
   otra vez (el ciclo). Ahora, si en este celular solo puede entrar esa persona, "Cambiar de usuario" lleva directo a "¿Cambiar de usuario?"
   (cerrar la sesión de la cuenta y entrar con otra). */
window.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act="usrcambia"]');if(!b)return;var L=[];try{L=personasEntrar()}catch(er){}
 if(!(typeof NB!=='undefined'&&NB.on&&NB.perfil)||L.length>1)return;e.stopImmediatePropagation();S.menu=false;S.usrSel=false;var k=(_pin&&_pin.k)||pinKey();S.px={t:'otro',k:k};render()},true);

/* 158 · Ricardo: "una vez que le das a cerrar sesión y pones la huella, te manda a la pantalla donde pones el correo, pero eso está mal".
   Escogió (con "haz todo lo que me dijiste") la opción B: cada quien sigue con su cuenta, pero la pantalla "Entrar" ya no pide escribir el
   usuario o el correo: muestra los nombres de quienes ya entraron en ESTE celular ("¿Quién eres?"); tocas el tuyo y solo pones tu contraseña.
   "Otra persona" abre la pantalla de siempre. Se recuerdan en el celular (localStorage 'rec158': usuario o correo, nombre y papel; nunca
   la contraseña), hasta 8, el último primero; "Quitar de la lista" para borrar a alguien. */
function rec158L(){try{var L=JSON.parse(localStorage.getItem('rec158')||'[]');return Array.isArray(L)?L.filter(function(x){return x&&x.u}):[]}catch(e){return []}}
function rec158Pon(L){try{localStorage.setItem('rec158',JSON.stringify(L.slice(0,8)))}catch(e){}}
function rec158Guarda(){try{if(typeof NB==='undefined'||!NB.on||!NB.listo||!NB.user||!NB.perfil||NB.perfil.activo!==true)return;var p=NB.perfil,u=p.usuario||NB.user.email;if(!u)return;
 var n=p.nombre||'';if(!n&&p.chId!=null){try{n=chofN(p.chId)}catch(e){}}if(!n)n=String(u).split('@')[0];var rol={admin:'Administrador',chofer:'Chofer',cont:'Contador',local:'Venta local'}[p.rol]||'';
 var L=rec158L(),i=-1;L.forEach(function(x,j){if(x.u===u)i=j});var o={u:u,n:n,r:rol};if(i===0&&L[0].n===n&&L[0].r===rol)return;if(i>-1)L.splice(i,1);L.unshift(o);rec158Pon(L)}catch(e){}}
setInterval(rec158Guarda,20000);setTimeout(rec158Guarda,6000);
var NBF158={i:null,otro:false};
var _nbOv158=nbOvHTML;nbOvHTML=function(){var h=_nbOv158.apply(this,arguments);try{if(NB.est!=='login'||NBF.modo==='crear'||NBF158.otro)return h;var L=rec158L();if(!L.length)return h;
 var w='<div class="nbw">'+nbLogo(),x=NBF158.i!=null?L[NBF158.i]:null,pie=(NBF.err?'<div class="nberr">'+esc(NBF.err)+'</div>':'')+(NBF.msg?'<div class="nbok">'+esc(NBF.msg)+'</div>':'');
 if(!x)return w+'<h1>¿Quién eres?</h1><p>Toca tu nombre y escribe tu contraseña.</p>'+L.map(function(p,i){return '<button class="nbsec" data-nb="rec158" data-i="'+i+'" style="text-align:left;padding:8px 16px;display:flex;flex-direction:column;gap:2px"><span style="font-size:18px;font-weight:800">'+esc(p.n)+'</span>'+(p.r?'<span class="lbl" style="font-size:14px">'+esc(p.r)+'</span>':'')+'</button>'}).join('')
  +pie+'<button class="nblink" data-nb="otro158">Otra persona (escribir usuario o correo)</button></div>';
 return w+'<h1>Hola, '+esc(x.n)+'</h1><p>Escribe tu contraseña para entrar. Después entras con tu PIN.</p><input id="nbu" type="hidden" value="'+esc(x.u)+'"><label for="nbp">Contraseña</label><input id="nbp" type="password" autocomplete="current-password">'
  +pie+'<button class="nbbtn" data-nb="entrar"'+(NBF.ocupado?' disabled':'')+'>'+(NBF.ocupado?'Entrando…':'Entrar')+'</button><button class="nblink" data-nb="olvide">Olvidé mi contraseña</button>'
  +'<button class="nbsec" data-nb="rec158x">No soy '+esc(x.n)+'</button><button class="nblink" data-nb="rec158q" data-i="'+NBF158.i+'" style="font-size:14px">Quitar a '+esc(x.n)+' de este celular</button></div>'}catch(e){return h}};
window.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('#nbov [data-nb]');if(!b)return;var a=b.dataset.nb;if(['rec158','rec158x','rec158q','otro158'].indexOf(a)<0)return;e.stopImmediatePropagation();e.preventDefault();NBF.err='';NBF.msg='';
 if(a==='rec158'){NBF158.i=+b.dataset.i;NBF.u=(rec158L()[NBF158.i]||{}).u||''}
 else if(a==='rec158x'){NBF158.i=null}
 else if(a==='otro158'){NBF158.otro=true;NBF158.i=null;NBF.u=''}
 else if(a==='rec158q'){var L=rec158L();L.splice(+b.dataset.i,1);rec158Pon(L);NBF158.i=null}
 _nbSig='';nbPantalla();var p=document.getElementById('nbp');if(p&&a==='rec158')try{p.focus()}catch(er){}},true);
/* "Otra persona" regresa a "¿Quién eres?" cuando se vuelve a cerrar la sesión */
var _nbP158=nbPantalla;nbPantalla=function(){if(typeof NB!=='undefined'&&NB.est!=='login'){NBF158.otro=false;NBF158.i=null}return _nbP158.apply(this,arguments)};

/* 162 · Ricardo (con la 1.0.52): "le di en cerrar sesión… y en 'No soy Ricardo Nieto' y vuelve a pedir el PIN: no cierra la sesión".
   Sí se cerraba la sesión de la cuenta, pero la pantalla del PIN (z-index altísimo) se dibujaba ENCIMA de la de "Entrar" (z-index 200):
   parecía que no se había cerrado y el letrero "Sesión activa" del PIN es solo adorno. Ahora, mientras la nube no tenga una sesión lista
   (cerrada, entrando, cargando…), no se pide el PIN: queda a la vista "¿Quién eres?" / "Entrar". Ya adentro, el PIN se pide como siempre. */
function sinSesion162(){return typeof NB!=='undefined'&&NB.on&&NB.est&&NB.est!=='listo'&&NB.est!=='off'}
var _pinH162=pinHTML;pinHTML=function(){if(sinSesion162())return '';return _pinH162.apply(this,arguments)};
var _rd162=render;render=function(){try{if(sinSesion162()&&_pin&&_pin.modo){_pin={v:'',modo:null};S.px=null}}catch(e){}var r=_rd162.apply(this,arguments);try{if(sinSesion162()){var o=document.getElementById('pinov');if(o)o.remove()}}catch(e){}return r};
/* 162 · y la pantalla de "Entrar" va encima de TODO (antes z-index 200: algunas ventanas de la app quedaban encima) */
(function(){var st=document.createElement('style');st.textContent='#nbov{z-index:2147483100!important}';document.head.appendChild(st)})();

/* 164 · versión web (computadora): en "Entrar" dice "en esta computadora" en vez de "en este celular" */
var _nbOv164=nbOvHTML;nbOvHTML=function(){var h=_nbOv164.apply(this,arguments);try{if(window.PN_WEB&&h)h=h.split('en este celular').join('en esta computadora')}catch(e){}return h};
