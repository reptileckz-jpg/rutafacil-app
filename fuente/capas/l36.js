/* ===================== v6.2 · Acceso: huella, PIN olvidado, cambiar de usuario, sesiones, papeles y bajas ===================== */
(function(){var st=document.createElement('style');st.textContent=[
 '#pinov .pinmas{display:flex;flex-direction:column;align-items:center;gap:2px;margin-top:8px}#pinov .pinmas .link{min-height:40px;font-size:15px}',
 '#pinov .huella{display:flex;align-items:center;justify-content:center;gap:8px;margin:8px auto 0;min-height:48px;padding:0 18px;border-radius:24px;border:1px solid var(--line);background:var(--surface);font-size:16px;font-weight:700;color:var(--fg)}',
 '#pxov{position:fixed;inset:0;z-index:205;background:rgba(0,0,0,.45);display:flex;align-items:flex-end;justify-content:center}#pxov .w{background:var(--bg);width:100%;max-width:520px;border-radius:20px 20px 0 0;padding:18px 16px calc(24px + env(safe-area-inset-bottom,0px))}',
 '#bjov{position:fixed;inset:0;z-index:91;background:var(--bg);overflow-y:auto}#bjov .w{max-width:560px;margin:0 auto;padding:calc(14px + var(--sbar,0px)) 16px 40px}'
].join('\n');document.head.appendChild(st)})();
/* lo que faltaba compartir en la nube (encargos, encargado, vacaciones, revisiones, reglas…) */
['pinPista','pinPide','encargos','enc','atiende','vac','hoyOk','inspHoy','inspMes','inspSem','recep','recepPrev','reglas','cajaBase','chBuroNo','provPagT','mayRech','primerDia'].forEach(function(k){if(typeof NB_SH!=='undefined'&&NB_SH.indexOf(k)<0)NB_SH.push(k)});
['ciEnvH','stopsOrig'].forEach(function(k){if(AR_K.indexOf(k)<0)AR_K.push(k)});
/* ---------- sesión: chofer 40 min sin usar → PIN ---------- */
var _plm36=pinLimMin;pinLimMin=function(k){k=k||pinKey();if(/^c:/.test(k)||k==='local')return 40;return _plm36.apply(this,arguments)};
/* ---------- huella ---------- */
function natPl(){var C=window.Capacitor;return C&&C.Plugins&&C.Plugins.RutaNativa||null}
function bioPl(){var C=window.Capacitor;if(C&&C.Plugins&&C.Plugins.NativeBiometric)return C.Plugins.NativeBiometric;var n=natPl();if(!n)return null;
 return {isAvailable:function(){return n.bioDisponible()},verifyIdentity:function(o){return n.bioVerificar(o||{})}}}
function bioLlave(k){return 'bio:'+(k||pinKey())}
function bioActiva(k){try{return localStorage.getItem(bioLlave(k))==='1'}catch(e){return false}}
var _bioHay=null;function bioHay(cb){var p=bioPl();if(!p||!p.isAvailable){_bioHay=false;cb(false);return}if(_bioHay!=null){cb(_bioHay);return}p.isAvailable().then(function(r){_bioHay=!!(r&&r.isAvailable);cb(_bioHay)},function(){_bioHay=false;cb(false)})}
var _bioEnCurso=false;
function bioEntrar(){var p=bioPl(),k=_pin&&_pin.k;if(!p||!k||_bioEnCurso)return;_bioEnCurso=true;
 p.verifyIdentity({reason:'Para entrar a Ruta Fácil',title:'Entrar con tu huella',subtitle:pinNom(k),negativeButtonText:'Usar mi PIN',maxAttempts:3}).then(function(){_bioEnCurso=false;if(!_pin||_pin.k!==k)return;var cb=_pin.cb,m=_pin.modo;S.pinOk[k]=true;_pinAct=Date.now();if(S.pinF)delete S.pinF[k];_pin={v:'',modo:null};try{vibrar(20)}catch(e){}render();if(m!=='entrar'&&cb)setTimeout(cb,0)},function(){_bioEnCurso=false})}
/* al abrir la pantalla del PIN con huella activada, se pide sola */
var _bioUltK='';var _r36a=render;render=function(){var r=_r36a.apply(this,arguments);try{if(_pin&&_pin.modo==='entrar'&&bioActiva(_pin.k)&&!document.getElementById('pnov')){var sig=_pin.k+':'+(_pin.bloq||0)+':'+(S.pinF&&S.pinF[_pin.k]?S.pinF[_pin.k].hasta:'');if(sig!==_bioUltK){_bioUltK=sig;setTimeout(bioEntrar,350)}}else if(!_pin||!_pin.modo)_bioUltK=''}catch(e){}return r};
/* ---------- pantalla del PIN: huella, olvidé mi PIN, cambiar de usuario ---------- */
var _pH36=pinHTML;pinHTML=function(){var h=_pH36.apply(this,arguments);if(!h||!_pin||_pin.modo!=='entrar')return h;var k=_pin.k,nm=esc(pinNom(k)),mas='';h=h.replace(/<button class="link" data-act="usrcambia">[^<]*<\/button>/,'');
 if(bioActiva(k)&&bioPl())mas+='<button class="huella" data-act="biousar">🫆 Entrar con mi huella</button>';
 mas+='<div class="pinmas"><button class="link" data-act="pinolv">Olvidé mi PIN</button><button class="link" data-act="pinotro">No soy '+nm+' · cambiar de usuario</button></div>';
 return h.replace(/<\/div><\/div>$/,mas+'</div></div>')};
function pxHTML(){var x=S.px;if(!x)return '';var k=x.k,nm=esc(pinNom(k)),pista=(S.pinPista||{})[k],pend=(S.pinPide||{})[k],h='';
 if(x.t==='olv')h='<b style="font-size:20px">¿Olvidaste tu PIN?</b>'+(pista?'<div class="card note" style="margin-top:10px"><div class="lbl">Tu pista</div><b style="font-size:18px">'+esc(pista)+'</b></div>':'<div class="lbl" style="margin-top:6px">No dejaste pista.</div>')
  +(pend?'<div class="card good" style="margin-top:10px"><b>Ya le pediste al administrador que lo reinicie</b><div class="lbl">Cuando lo haga, cierra y abre la app: te va a pedir crear uno nuevo.</div></div>':'<button class="btn" style="margin-top:12px" data-act="pinpide">Pedirle al administrador que lo reinicie</button>')+'<button class="btn sec" style="margin-top:8px" data-act="pxx">Regresar</button>';
 if(x.t==='otro'){var enc=S.role==='rep'&&S.salida&&S.salida.ok&&!(S.cierre&&S.cierre.sent);h='<b style="font-size:20px">¿Cambiar de usuario?</b><div class="lbl" style="margin-top:6px">Se cierra la sesión de '+nm+' en este celular y te pide usuario y contraseña (necesitas internet).</div>'+(enc?'<div class="card note" style="margin-top:10px">'+nm+' tiene su ruta en curso: se queda guardada en la nube y la sigue cuando vuelva a entrar.</div>':'')
  +'<button class="btn" style="margin-top:12px" data-act="pinotrosi">Sí, cerrar sesión de '+nm+'</button><button class="btn sec" style="margin-top:8px" data-act="pxx">Regresar</button>'}
 if(x.t==='pista')h='<b style="font-size:20px">¿Dejas una pista para tu PIN?</b><div class="lbl" style="margin-top:6px">Algo que solo tú entiendas, por si se te olvida. Ejemplo: "mi año de nacimiento al revés". Nunca pongas el PIN.</div><div class="field"><label for="pxp">Pista</label><input id="pxp" type="text" data-pxb="p" value="'+esc(x.p||'')+'" style="width:190px;text-align:left"></div>'+(x.err?'<div class="neg">'+esc(x.err)+'</div>':'')+'<button class="btn" style="margin-top:12px" data-act="pistasave">Guardar pista</button><button class="btn sec" style="margin-top:8px" data-act="pistano">Sin pista</button>';
 if(x.t==='bio')h='<div style="font-size:44px;text-align:center">🫆</div><b style="font-size:20px">¿Entrar con tu huella?</b><div class="lbl" style="margin-top:6px">Así ya no escribes el PIN en este celular. El PIN sigue sirviendo por si la huella falla.</div><button class="btn" style="margin-top:12px" data-act="bioactiva">Sí, usar mi huella</button><button class="btn sec" style="margin-top:8px" data-act="biono">Ahora no</button>';
 return '<div id="pxov" role="dialog" aria-label="PIN"><div class="w">'+h+'</div></div>'}
var _suH36=setupHTML;setupHTML=function(){var a=_suH36.apply(this,arguments);return a};
var _r36b=render;render=function(){var r=_r36b.apply(this,arguments);try{var o=document.getElementById('pxov'),h=pxHTML();if(h){if(!o){o=document.createElement('div');document.body.appendChild(o)}var sig=JSON.stringify([S.px&&S.px.t,S.px&&S.px.err,(S.pinPide||{})[S.px&&S.px.k]]);if(o.dataset.sig!==sig){var v=(o.querySelector('#pxp')||{}).value;o.outerHTML=h;var n=document.getElementById('pxov');n.dataset.sig=sig;if(v&&n.querySelector('#pxp'))n.querySelector('#pxp').value=v}}else if(o)o.remove()}catch(e){console.error(e)}return r};
document.addEventListener('input',function(e){var t=e.target;if(t&&t.dataset&&t.dataset.pxb&&S.px)S.px[t.dataset.pxb]=t.value},true);
document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act]');if(!b)return;var a=b.dataset.act;
 if(a==='biousar'){e.stopImmediatePropagation();bioEntrar();return}
 if(a==='pinolv'){e.stopImmediatePropagation();S.px={t:'olv',k:_pin.k};render();return}
 if(a==='pinotro'){e.stopImmediatePropagation();S.px={t:'otro',k:_pin.k};render();return}
 if(a==='pxx'){e.stopImmediatePropagation();S.px=null;render();return}
 if(a==='pinpide'){e.stopImmediatePropagation();var k=S.px.k;S.pinPide=S.pinPide||{};S.pinPide[k]=Date.now();S.avPrecio.push('URGENTE: '+pinNom(k)+' olvidó su PIN y pide que se lo reinicies. [pin:'+k+']');toast('Listo, le avisamos al administrador');render();return}
 if(a==='pinotrosi'){e.stopImmediatePropagation();S.px=null;try{guardarYa()}catch(er){}if(typeof NB!=='undefined'&&NB.on&&NB.ad){try{localStorage.removeItem('nbSesion')}catch(er){}_pin={v:'',modo:null};NB.ad.salir().then(function(){location.reload()},function(){location.reload()})}else{_pin={v:'',modo:null};S.usrSel=true;render()}return}
 if(a==='pistasave'){e.stopImmediatePropagation();var x=S.px,p=String(x.p||'').trim();if(!p){x.err='Escribe la pista o toca "Sin pista"';render();return}if(/\d{4}/.test(p)&&p.indexOf(S.pins[x.k]||'@@@@')>-1){x.err='La pista no puede llevar tu PIN';render();return}S.pinPista=S.pinPista||{};S.pinPista[x.k]=p;pxSigue(x.k);return}
 if(a==='pistano'){e.stopImmediatePropagation();pxSigue(S.px.k);return}
 if(a==='bioactiva'){e.stopImmediatePropagation();var k2=S.px.k,pl=bioPl();if(!pl){S.px=null;render();return}pl.verifyIdentity({reason:'Para activar la huella en Ruta Fácil',title:'Pon tu huella',negativeButtonText:'Cancelar'}).then(function(){try{localStorage.setItem(bioLlave(k2),'1')}catch(er){}S.px=null;toast('Listo: la próxima vez entras con tu huella');render()},function(){toast('No se activó la huella');S.px=null;render()});return}
 if(a==='biono'){e.stopImmediatePropagation();try{localStorage.setItem(bioLlave(S.px.k)+':no','1')}catch(er){}S.px=null;render();return}
 if(a==='biooff'){e.stopImmediatePropagation();try{localStorage.removeItem(bioLlave())}catch(er){}toast('Huella quitada de este celular');render();return}
 if(a==='bioon'){e.stopImmediatePropagation();S.px={t:'bio',k:pinKey()};render();return}},true);
function pxSigue(k){S.px=null;bioHay(function(si){var no=false;try{no=localStorage.getItem(bioLlave(k)+':no')==='1'}catch(e){}if(si&&!bioActiva(k)&&!no)S.px={t:'bio',k:k};render()});render()}
/* después de crear el PIN: pista y huella */
window.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act="pnd"]');if(!b||typeof _pnew==='undefined'||!_pnew||!_pnew.v1)return;var k=_pnew.k,antes=S.pins[k];setTimeout(function(){if(S.pins[k]&&S.pins[k]!==antes&&S.pinOk[k]){S.px={t:'pista',k:k,p:(S.pinPista||{})[k]||''};if(S.pinPide)delete S.pinPide[k];render()}},60)},true);
/* después de entrar con PIN (sin huella activada): ofrecer la huella una vez */
window.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act="pind"]');if(!b||!_pin||_pin.modo!=='entrar'||_pin.v.length!==3)return;var k=_pin.k;setTimeout(function(){if(S.pinOk[k]&&!bioActiva(k)){var no=false;try{no=localStorage.getItem(bioLlave(k)+':no')==='1'}catch(er){}if(!no)bioHay(function(si){if(si&&!S.px){S.px={t:'bio',k:k};render()}})}},80)},true);
/* en Ajustes: quitar o poner la huella en este celular */
var _aj36=ajHTML;ajHTML=function(){var h=_aj36.apply(this,arguments);if(!h||h.indexOf('id="ajov"')<0||!bioPl())return h;var on=bioActiva();
 var c='<div class="card" data-key="huella"><b>Huella en este celular</b><div class="lbl">'+(on?'Entras con tu huella. El PIN sigue sirviendo.':'Entras con tu PIN.')+'</div><button class="btn sm sec" style="margin-top:8px" data-act="'+(on?'biooff':'bioon')+'">'+(on?'Quitar la huella':'Usar mi huella')+'</button></div>';
 var i=h.lastIndexOf('</div></div>');return i<0?h:h.slice(0,i)+c+h.slice(i)};
/* ---------- avisos del PIN olvidado: llevan a reiniciarlo ---------- */
function avPinK(x){var m=/\[pin:([^\]]+)\]/.exec(x||'');return m?m[1]:null}
/* ---------- sesión revocada / acceso quitado: se cierra en ese celular ---------- */
function nbSesionIni(){try{var t=+localStorage.getItem('nbSesion');if(!t){t=Date.now();localStorage.setItem('nbSesion',String(t))}return t}catch(e){return 0}}
function nbRevisaSesion(p){if(!p||!NB.user)return;var ini=nbSesionIni();if(p.activo===false||(p.corte&&p.corte>ini)){try{localStorage.removeItem('nbSesion')}catch(e){}toast('Tu sesión se cerró en este celular');setTimeout(function(){NB.ad.salir().then(function(){location.reload()})},800)}}
if(typeof nbEmpezarSync==='function'){var _nes36=nbEmpezarSync;nbEmpezarSync=function(){var r=_nes36.apply(this,arguments);try{nbSesionIni();if(NB.ad&&NB.user&&!NB._unp){var path='usuarios_app/'+NB.user.uid;if(NB.ad.watchDoc)NB._unp=NB.ad.watchDoc(path,function(d){if(d){NB.perfil=d;nbRevisaSesion(d)}});else{NB._unp=setInterval(function(){NB.ad.get(path).then(function(d){if(d){NB.perfil=d;nbRevisaSesion(d)}},function(){})},60000)}}}catch(e){}return r}}
/* el administrador cierra la sesión de alguien en todos sus celulares (por si perdió el celular) */
function nbCorte(uid){var t=Date.now();return NB.ad.set('usuarios_app/'+uid,{corte:t},true).then(function(){if(NB.usuarios[uid])NB.usuarios[uid].corte=t})}
/* ---------- papeles: encargado, contador y venta local ---------- */
var _nfr36=nbForzarRol;nbForzarRol=function(){var p=NB.perfil;if(!p||!NB.listo)return;if(p.rol==='encargado'){S.role='admin';S.encOn=true;if(+S.chofHoy!==+p.chId){try{chCambiar(+p.chId)}catch(e){S.chofHoy=+p.chId}}return}if(p.rol==='cont'){S.role='cont';return}if(p.rol==='local'){S.role='local';return}return _nfr36.apply(this,arguments)};
var _pe36=personasEntrar;personasEntrar=function(){var L=_pe36.apply(this,arguments),p=NB.perfil;if(!NB.on||!p)return L;if(p.rol==='cont')return L.filter(function(x){return x.k==='cont'});if(p.rol==='local')return L.filter(function(x){return x.go&&x.go.role==='local'});return L};
/* ---------- baja de un chofer: se le quita el acceso y sus clientes se pasan por zona ---------- */
function bjCentro(id){var L=S.cli.filter(function(c){return !c.oculto&&String(c.chofer)===String(id)&&c.lat!=null});if(!L.length)return null;return {lat:sum(L,function(c){return c.lat})/L.length,lng:sum(L,function(c){return c.lng})/L.length,n:L.length}}
function bjSugiere(c,quita){var mejor=null,dm=1e9;choferesL().forEach(function(ch){if(ch.baja||+ch.id===+quita)return;var ce=bjCentro(ch.id);var d=c.lat!=null&&ce?kmE(ce,c):null;var carga=S.cli.filter(function(x){return !x.oculto&&String(x.chofer)===String(ch.id)}).length;var score=(d==null?50:d)+carga*0.15;if(score<dm){dm=score;mejor=ch.id}});return mejor}
function bjHTML(){var x=S.bj;if(!x)return '';var ch=S.choferes.filter(function(c){return c.id===x.id})[0];if(!ch){S.bj=null;return ''}var L=S.cli.filter(function(c){return !c.oculto&&String(c.chofer)===String(ch.id)}),ops=choferesL().filter(function(o){return !o.baja&&o.id!==ch.id});
 return '<div id="bjov" role="dialog" aria-label="Dar de baja"><div class="w"><div style="display:flex;align-items:center;gap:10px"><span class="grow"><b style="font-size:20px">Dar de baja a '+esc(ch.n)+'</b><div class="lbl">Ya no va a poder entrar a la app. Su historial se queda guardado.</div></span><button class="helpb" style="margin:0" data-act="bjx" aria-label="Cerrar">×</button></div>'
  +(L.length?'<div class="card"><b>Sus '+L.length+' clientes: ¿a quién se los pasas?</b><div class="lbl">La app sugiere por zona (al chofer que tiene clientes más cerca) sin cargar de más una ruta. Cámbialo si quieres.</div>'+L.map(function(c){var v=x.asig[c.id];return '<div class="field"><label for="bj'+c.id+'">'+esc(c.n)+'</label><select id="bj'+c.id+'" data-bjc="'+c.id+'">'+ops.map(function(o){return '<option value="'+o.id+'"'+(+v===o.id?' selected':'')+'>'+esc(esAdm(o)?chofN(2):o.n)+'</option>'}).join('')+'</select></div>'}).join('')+'</div>':'<div class="card note">No tiene clientes asignados.</div>')
  +'<button class="btn" style="margin-top:12px;background:var(--danger)" data-act="bjsi">Dar de baja'+(L.length?' y pasar sus clientes':'')+'</button></div></div>'}
var _suH36b=setupHTML;setupHTML=function(){return bjHTML()||_suH36b.apply(this,arguments)};
/* fiEmp: pasó a tema-fichas.js */
document.addEventListener('change',function(e){var t=e.target;if(t&&t.dataset&&t.dataset.bjc&&S.bj)S.bj.asig[t.dataset.bjc]=+t.value},true);
document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act]');if(!b)return;var a=b.dataset.act;
 if(a==='bjabre'){e.stopImmediatePropagation();var id=+b.dataset.id,asig={};S.cli.filter(function(c){return !c.oculto&&String(c.chofer)===String(id)}).forEach(function(c){asig[c.id]=bjSugiere(c,id)});S.bj={id:id,asig:asig};render();return}
 if(a==='bjx'){e.stopImmediatePropagation();S.bj=null;render();return}
 if(a==='bjsi'){e.stopImmediatePropagation();var x=S.bj,ch=S.choferes.filter(function(c){return c.id===x.id})[0];var n=0;Object.keys(x.asig).forEach(function(cid){var c=cl(+cid);if(c&&x.asig[cid]!=null){c.chofer=+x.asig[cid];n++}});ch.baja=true;ch.bajaF=iso(TODAY);
  if(typeof NB!=='undefined'&&NB.on&&NB.ad)Object.keys(NB.usuarios||{}).forEach(function(uid){var p=NB.usuarios[uid];if(p&&+p.chId===+ch.id&&p.rol!=='admin'&&p.activo){NB.ad.set('usuarios_app/'+uid,{activo:false,quitado:Date.now()},true);p.activo=false}});
  S.hist.push({t:fmtF(iso(TODAY))+' '+hhmm(),q:quien(),x:'Dio de baja a '+ch.n+(n?' y pasó '+n+' clientes':'')});toast(ch.n+' dado de baja'+(n?' · '+n+' clientes pasados':''));S.bj=null;S.openCh=null;render();return}
 if(a==='bjreact'){e.stopImmediatePropagation();var c2=S.choferes.filter(function(c){return c.id===+b.dataset.id})[0];if(c2){c2.baja=false;toast(c2.n+' de alta otra vez. Dale acceso en "Accesos a la app"')}render();return}},true);
/* ---------- al acabar el día, el chofer vuelve a poner su PIN ---------- */
var _pinDia36=iso(new Date());
setInterval(function(){var d=iso(new Date());if(d===_pinDia36)return;_pinDia36=d;if(S.pinOk&&Object.keys(S.pinOk).length&&(S.role==='rep'||S.role==='local')){S.pinOk={};try{pinEntrar()}catch(e){}render()}},60000);
/* al volver a la app después de un rato: si ya pasó el tiempo, pide el PIN de una vez (sin esperar a que toque) */
document.addEventListener('visibilitychange',function(){if(document.visibilityState==='visible'){try{if(pinBloq())render()}catch(e){}}});
