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
