/* ===================== v7.2 · Lista nueva (10 nov) · parte 1: seguridad y mapas
   37 bloqueo siempre hasta arriba · 18 huella una sola vez · 24 al desbloquear regresa a Inicio/Ruta
   36 Ajustes según el puesto (logo solo admin) · 1/2 Google Maps dentro de fichas y que no se trabe el deslizar ===================== */
(function(){var st=document.createElement('style');st.textContent=[
 '#pinov{z-index:2147483000!important}#pxov{z-index:2147483001!important}#pnov{z-index:2147483002!important}',
 '#pncubre{position:fixed;inset:0;z-index:2147483003;background:var(--bg,#F6F1E3);display:flex;align-items:center;justify-content:center}#pncubre img{width:84px;height:84px;border-radius:22px}',
 '.gmoc{visibility:hidden!important}',
 '#medov{position:fixed;inset:0;z-index:2147482000;background:var(--bg);display:flex;flex-direction:column;justify-content:center;padding:24px 18px;gap:14px;text-align:center}#medov b{font-size:22px}#medov .btn{min-height:60px;font-size:19px}'].join('\n');document.head.appendChild(st)})();

/* ---------- 37 · bloqueo ---------- */
function pnBloqueada(){return !!(_pin&&_pin.modo==='entrar')}
var PN_LIBRE='#pinov,#pxov,#pnov,#permov,#nbov,#setov,#arr,[data-kp]';
/* mientras está bloqueada, ningún toque llega a la app (solo al teclado del PIN y lo que sale de él) */
['pointerdown','pointerup','touchstart','touchend','mousedown','mouseup','click','keydown','input','change','submit','wheel'].forEach(function(t){
 window.addEventListener(t,function(e){if(!pnBloqueada())return;var x=e.target;if(x&&x.closest&&x.closest(PN_LIBRE))return;if(x===document||x===window)return;
  if(e.cancelable)e.preventDefault();e.stopImmediatePropagation()},{capture:true,passive:false})});
/* al bloquearse: cerrar los mapas de Google (los dibuja Android y quedarían encima) */
function pnQuitaMapas(){try{if(typeof gmCierra==='function'&&GM)gmCierra()}catch(e){}try{if(typeof GMI!=='undefined')GMI.slice().forEach(gmQuita)}catch(e){}}
var _gmIn58=gmInHay;gmInHay=function(){if(pnBloqueada())return false;return _gmIn58.apply(this,arguments)};
var _gmH58=gmHay;gmHay=function(){if(pnBloqueada())return false;return _gmH58.apply(this,arguments)};
/* al irse al fondo: si hay PIN, tapar la pantalla (así "apps recientes" no enseña datos) */
function pnTapa(){if(document.getElementById('pncubre'))return;var o=document.createElement('div');o.id='pncubre';o.setAttribute('aria-hidden','true');o.innerHTML='<img src="'+(typeof LOGO_IC!=='undefined'?LOGO_IC:'')+'" alt="">';document.body.appendChild(o)}
function pnDestapa(){var o=document.getElementById('pncubre');if(o)o.remove()}
function pnTienePin(){try{var k=pinKey();return !!(S.pinOk&&S.pinOk[k])&&!(S.setup&&!S.setup.fin)}catch(e){return false}}
document.addEventListener('visibilitychange',function(){if(window.__pnTest&&!window.__pnTapa)return;
 if(document.visibilityState==='hidden'){if(pnTienePin()||pnBloqueada())pnTapa();return}
 setTimeout(function(){try{if(pinBloq())render()}catch(e){}pnDestapa()},60)});
/* que el bloqueo se revise también cada vez que dibuja (y cierra mapas) */
var _rd58=render;render=function(){var r=_rd58.apply(this,arguments);try{if(pnBloqueada())pnQuitaMapas()}catch(e){}return r};

/* ---------- 18 · huella una sola vez ---------- */
/* al terminar de cargar lo guardado (o la nube) se borraba el "ya entró" y la pedía otra vez */
var _pinAuth={},_pnCarga=Date.now();
/* solo al abrir la app (cuando termina de cargar lo guardado o la nube); en pruebas solo si se pide */
function pnGracia(k){if(window.__pnTest&&!window.__pnGracia)return false;return !!(_pinAuth[k]&&Date.now()-_pinAuth[k]<120000&&Date.now()-_pnCarga<180000)}
var _pinEnt58=pinEntrar;pinEntrar=function(){var k=pinKey();if(pnGracia(k)){S.pinOk[k]=true;return false}return _pinEnt58.apply(this,arguments)};
var _pinModoAnt=null,_pinKAnt=null;
var _rd58b=render;render=function(){
 try{if(_pin&&_pin.modo==='entrar'&&pnGracia(_pin.k)&&!_pin.bloq){S.pinOk[_pin.k]=true;_pin={v:'',modo:null}}}catch(e){}
 var r=_rd58b.apply(this,arguments);
 try{/* solo cuenta como "ya entró" si pasó por la pantalla del PIN o la huella */var k=pinKey(),m=_pin&&_pin.modo;if(_pinModoAnt==='entrar'&&!m&&S.pinOk&&S.pinOk[_pinKAnt])_pinAuth[_pinKAnt]=Date.now();_pinModoAnt=m;_pinKAnt=_pin&&_pin.k}catch(e){}return r};
/* salir, cambiar de usuario o cerrar el día sí borran el permiso */
window.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act]');if(!b)return;if(/^(usrsalir|pinotrosi|role|chofsel|adminyo|encentrar|encsalir|usrgo|nbsalir|enviar)$/.test(b.dataset.act))_pinAuth={}},true);
var _entC58=entrarComo;entrarComo=function(){_pinAuth={};return _entC58.apply(this,arguments)};

/* ---------- 24 · al desbloquear, regresa a Inicio (admin) o a su Ruta (chofer) ---------- */
function pnCasa(){var r=S.role;return (typeof NAV_CASA!=='undefined'&&NAV_CASA[r])||S.tab[r]}
function pnAMedias(){var v=null;try{v=navVentana()}catch(e){}
 var hayForm=Array.prototype.some.call(document.querySelectorAll('#wzov,#rcov,#cxov,#fnov,#eqov,#npov,#dfov,.modal-bg'),function(o){return o.getClientRects().length});
 if(hayForm)return true;if(S.modal)return true;
 if(v){var ov=v.closest('[id$="ov"]')||document.body;return Array.prototype.some.call(ov.querySelectorAll('input:not([type=hidden]):not([type=date]),textarea'),function(i){return i.type==='checkbox'?false:String(i.value||'').trim()!==''})}
 if(S.role==='rep'&&/^(entrega|cierre)$/.test(S.tab.rep)){if(S.tab.rep==='cierre')return !!(S.cierre&&!S.cierre.sent&&(S.cierre.odo||S.cierre.tank||S.cierre.wz));return !!S.ent}
 return false}
function pnIrCasa(){for(var i=0;i<12;i++){var r=false;try{r=navAtras()}catch(e){}if(!r)break}S.modal=null;S.confirm=null;S.aj=false;S.menu=false;S.tab[S.role]=pnCasa();render();window.scrollTo(0,0)}
var _pnBloqEra=false;
var _rd58c=render;render=function(){var r=_rd58c.apply(this,arguments);try{
 if(pnBloqueada()&&_pin.bloq)_pnBloqEra=true;
 else if(_pnBloqEra&&!(_pin&&_pin.modo)){_pnBloqEra=false;if(pnAMedias())setTimeout(pnMedias,0);else setTimeout(pnIrCasa,0)}}catch(e){console.error(e)}return r};
function pnMedias(){if(document.getElementById('medov'))return;var o=document.createElement('div');o.id='medov';o.setAttribute('role','dialog');
 o.innerHTML='<div style="font-size:44px">📝</div><b>Tenías algo a medias</b><div class="lbl" style="font-size:16px">¿Quieres seguir donde ibas o regresar '+(S.role==='rep'?'a tu ruta':'a Inicio')+'? Si regresas, se pierde lo que no guardaste.</div><button class="btn" data-act="medsigue">Seguir donde iba</button><button class="btn sec" data-act="medcasa">Ir '+(S.role==='rep'?'a mi ruta':'a Inicio')+'</button>';document.body.appendChild(o)}
document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act="medsigue"],[data-act="medcasa"]');if(!b)return;e.stopImmediatePropagation();var o=document.getElementById('medov');if(o)o.remove();
 if(b.dataset.act==='medcasa')pnIrCasa()},true);
/* al abrir la app (en frío) también empieza en Inicio / Ruta */
var _pnFrio=true;
var _rd58d=render;render=function(){if(_pnFrio&&typeof _cargado!=='undefined'&&_cargado){_pnFrio=false;try{if(S.role&&S.tab&&!(S.setup&&!S.setup.fin)){var c=pnCasa();if(S.tab[S.role]!==c){if(S.role==='rep'&&/^(entrega|cierre|viaje)$/.test(S.tab.rep)&&pnAMedias())setTimeout(pnMedias,400);else S.tab[S.role]=c}S.aj=false}}catch(e){}}
 return _rd58d.apply(this,arguments)};

/* ---------- 36 · Ajustes según el puesto ---------- */
function esDueno(){return S.role==='admin'&&!S.encOn}
var _rd58e=render;render=function(){var r=_rd58e.apply(this,arguments);try{var aj=document.getElementById('ajov');if(aj&&!esDueno()){
 Array.prototype.forEach.call(aj.querySelectorAll('.logocard,[data-key="ajcred"],[data-key="mincard"],details[data-k="ajcredd"],details[data-k="ajmind"]'),function(c){c.remove()});
 Array.prototype.forEach.call(aj.querySelectorAll('.card,details'),function(c){var t=(c.querySelector('b,summary')||c).textContent.trim();if(/^(Logo del negocio|Aviso de poca fruta|Crédito y mayoreo)/.test(t))c.remove()})}}catch(e){}return r};
/* aunque alguien encontrara el botón: solo el dueño cambia lo del negocio */
window.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act]');if(!b||esDueno())return;
 if(/^(logotk|logoquita|logoapp|lgquita|cfgsimple|ajmay|imprdemo|inspdel|inspadd|mcdel|mcadd|quejasver|respbaja|borrapr|comcobra|qron|gmswitch2)$/.test(b.dataset.act)&&b.closest('#ajov')){e.preventDefault();e.stopImmediatePropagation();toast('Eso solo lo cambia el administrador.')}},true);
window.addEventListener('change',function(e){var t=e.target;if(!t||esDueno()||!t.closest||!t.closest('#ajov'))return;if(/^(lg_|cfg_|aj_)/.test(t.id||'')){e.stopImmediatePropagation();toast('Eso solo lo cambia el administrador.');render()}},true);
/* tema y tamaño de letra: de cada celular (antes se cambiaba para todos) */
function prefTema(){try{var v=localStorage.getItem('pTema');if(v)return v}catch(e){}return (S.cfg&&S.cfg.tema)||'auto'}
function prefBig(){try{var v=localStorage.getItem('pBig');if(v!=null)return v==='1'}catch(e){}return !!(S.cfg&&S.cfg.big)}
temaApply=function(){var t=prefTema();if(t==='auto')document.documentElement.removeAttribute('data-theme');else document.documentElement.setAttribute('data-theme',t);try{colorEsquema()}catch(e){}};
window.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act="tema"],[data-act="cfgbig"]');if(!b)return;if(pnBloqueada())return;e.preventDefault();e.stopImmediatePropagation();
 try{if(b.dataset.act==='tema')localStorage.setItem('pTema',b.dataset.v);else localStorage.setItem('pBig',b.dataset.v==='1'?'1':'0')}catch(er){}render()},true);
var _rd58f=render;render=function(){var r=_rd58f.apply(this,arguments);try{temaApply();document.body.classList.toggle('big-ui',prefBig());
 var aj=document.getElementById('ajov');if(aj){var t=prefTema(),bg=prefBig();Array.prototype.forEach.call(aj.querySelectorAll('[data-act="tema"]'),function(x){x.setAttribute('aria-pressed',String(x.dataset.v===t))});Array.prototype.forEach.call(aj.querySelectorAll('[data-act="cfgbig"]'),function(x){x.setAttribute('aria-pressed',String((x.dataset.v==='1')===bg))})}}catch(e){}return r};

/* ---------- 4 y 9 · campos con colores claros u oscuros según la app (no según el celular) ---------- */
function colorEsquema(){var t=document.documentElement.getAttribute('data-theme'),osc=t?t==='dark':!!(window.matchMedia&&matchMedia('(prefers-color-scheme: dark)').matches);
 document.documentElement.style.colorScheme=osc?'dark':'light';var m=document.querySelector('meta[name="color-scheme"]');if(!m){m=document.createElement('meta');m.name='color-scheme';document.head.appendChild(m)}m.content=osc?'dark':'light'}
(function(){var st=document.createElement('style');st.textContent=[
 'input,select,textarea{background-color:var(--surface,#fff);color:var(--fg,#1E2A1A);-webkit-text-fill-color:currentColor}',
 'input::placeholder,textarea::placeholder{color:var(--muted,#6b6b6b);-webkit-text-fill-color:var(--muted,#6b6b6b);opacity:1}',
 'input:disabled,select:disabled,textarea:disabled{opacity:.6}',
 'input[type=date],input[type=time],input[type=datetime-local],input[type=month]{background-color:var(--surface,#fff);color:var(--fg,#1E2A1A)}',
 'input[type=checkbox],input[type=radio],input[type=range],input[type=color]{background-color:transparent}'].join('\n');document.head.appendChild(st)})();
try{if(window.matchMedia)matchMedia('(prefers-color-scheme: dark)').addEventListener('change',function(){try{colorEsquema()}catch(e){}})}catch(e){}
try{colorEsquema()}catch(e){}

/* ---------- 1 · Google Maps dentro de una ficha o tarjeta encima: lo de abajo se ocultaba mal y salía blanco ---------- */
function gmZ(el){var z=parseInt(getComputedStyle(el).zIndex,10);return isNaN(z)?0:z}
function gmDebajo(){var hosts=[];GMI.forEach(function(x){if(x.m&&x.host!==document.body&&document.body.contains(x.host)&&hosts.indexOf(x.host)<0)hosts.push(x.host)});
 var quiero=[];hosts.forEach(function(h){var zh=gmZ(h),n=h;while(n&&n!==document.body){var p=n.parentElement;if(!p)break;
   Array.prototype.forEach.call(p.children,function(s){if(s===n||s.classList.contains('gmhole')||/^(SCRIPT|STYLE)$/.test(s.tagName))return;var cs=getComputedStyle(s);if(cs.position==='fixed'&&gmZ(s)>zh)return;if(/^(pinov|pxov|pnov|pncubre|medov)$/.test(s.id))return;if(quiero.indexOf(s)<0)quiero.push(s)});
   if(n!==h&&quiero.indexOf(n)<0){/* ancestro: transparente */if(!n._gmN58){n._gmN58=1;n._gmBg58=n.style.background;n.style.background='transparent'}}n=p}});
 Array.prototype.forEach.call(document.querySelectorAll('.gmoc'),function(e){if(quiero.indexOf(e)<0)e.classList.remove('gmoc')});quiero.forEach(function(e){e.classList.add('gmoc')});
 if(hosts.length)document.documentElement.classList.add('gmin');
 if(!hosts.length)Array.prototype.forEach.call(document.querySelectorAll('*'),function(n){if(n._gmN58){n._gmN58=0;n.style.background=n._gmBg58||''}})}
var _gmHu58=gmHuecos;gmHuecos=function(){var r=_gmHu58.apply(this,arguments);try{gmDebajo()}catch(e){console.error(e)}return r};

/* ---------- 2 · que ningún mapa de Google quede "agarrando" los toques ---------- */
/* todos los mapas que se piden quedan anotados; el que ya no está en pantalla se destruye aunque haya fallado al crearse */
var GMTODOS={};
var _gmCr58=null;(function(){function envuelve(){if(!window.GMAPA||window.GMAPA._pn58)return;var c=window.GMAPA.create;window.GMAPA.create=function(o){try{if(o&&o.id)GMTODOS[o.id]=Date.now()}catch(e){}return c.apply(this,arguments)};window.GMAPA._pn58=1}
 envuelve();setTimeout(envuelve,0);setTimeout(envuelve,1500)})();
function gmVivos(){var v={};GMI.forEach(function(x){v[x.id]=1});if(typeof GM!=='undefined'&&GM)v['pn-gm']=1;return v}
function gmBarre(){if(!window.GMAPA_PL||!window.GMAPA_PL.destroy)return;var v=gmVivos(),ahora=Date.now();Object.keys(GMTODOS).forEach(function(id){if(v[id])return;if(ahora-GMTODOS[id]<6000)return;/* aún se está creando */
  delete GMTODOS[id];try{var p=window.GMAPA_PL.destroy({id:id});if(p&&p.catch)p.catch(function(){})}catch(e){}})}
setInterval(function(){try{gmBarre()}catch(e){}},4000);
/* un mapa tapado por otra ventana (por ejemplo el cierre encima de la ruta) no recibe toques: así se puede deslizar */
function gmToques(){if(!window.GMAPA_PL||!window.GMAPA_PL.disableTouch)return;GMI.forEach(function(x){if(!x.m)return;var r=x.el.getBoundingClientRect(),on=false;
  if(r.width>4&&r.height>4&&r.bottom>0&&r.top<innerHeight){var el=document.elementFromPoint(Math.min(innerWidth-2,Math.max(1,r.left+r.width/2)),Math.min(innerHeight-2,Math.max(1,r.top+r.height/2)));on=!!(el&&(el===x.el||x.el.contains(el)))}
  if(x.toq!==on){x.toq=on;try{var p=on?window.GMAPA_PL.enableTouch({id:x.id}):window.GMAPA_PL.disableTouch({id:x.id});if(p&&p.catch)p.catch(function(){})}catch(e){}}})}
var _gmMu58=gmMueve;gmMueve=function(){var r=_gmMu58.apply(this,arguments);try{gmToques()}catch(e){}return r};
setInterval(function(){try{if(GMI.length)gmToques()}catch(e){}},1200);
/* al apagar los mapas en Ajustes, también se barre todo */
document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act="gmswitch"]');if(!b)return;setTimeout(function(){try{Object.keys(GMTODOS).forEach(function(id){GMTODOS[id]=0});gmBarre()}catch(er){}},300)});
