/* ===================== v6.3 · Entrada: animación corta al abrir, bienvenida la primera vez, huella/cara con animación,
   permisos al primer uso ===================== */
(function(){var st=document.createElement('style');st.textContent=[
 /* al abrir: el logo aparece y se vuelve la pantalla del PIN */
 '#arr{position:fixed;inset:0;z-index:400;background:var(--bg);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:12px;animation:arrOut .35s ease .55s forwards;pointer-events:none}',
 '#arr img{width:96px;height:96px;border-radius:22px;object-fit:cover;box-shadow:0 10px 30px rgba(0,0,0,.18);animation:arrLogo .55s cubic-bezier(.2,.9,.3,1.3) both}#arr b{font-size:22px;animation:arrTxt .4s ease .15s both}',
 '@keyframes arrLogo{from{transform:scale(.6);opacity:0}to{transform:none;opacity:1}}@keyframes arrTxt{from{opacity:0;transform:translateY(6px)}}@keyframes arrOut{to{opacity:0;transform:scale(1.04)}}',
 /* huella / cara */
 '#bioa{position:fixed;inset:0;z-index:300;display:flex;align-items:center;justify-content:center;pointer-events:none}#bioa .c{width:132px;height:132px;border-radius:50%;background:var(--surface);box-shadow:0 12px 36px rgba(0,0,0,.25);display:flex;align-items:center;justify-content:center;transition:background .25s}',
 '#bioa svg{width:84px;height:84px}#bioa .ln{stroke:var(--muted);stroke-dasharray:60;stroke-dashoffset:60;animation:bioLee 1.2s ease-in-out infinite alternate}#bioa .ln:nth-child(2){animation-delay:.12s}#bioa .ln:nth-child(3){animation-delay:.24s}#bioa .ln:nth-child(4){animation-delay:.36s}#bioa .ln:nth-child(5){animation-delay:.48s}',
 '@keyframes bioLee{to{stroke-dashoffset:0;stroke:var(--accent)}}',
 '#bioa.ok .c{background:var(--accent)}#bioa.ok .ln{display:none}#bioa.ok .ck{display:block}#bioa .ck{display:none;stroke:#fff}',
 '#bioa.mal .c{background:var(--danger);animation:pnShake .45s}#bioa.mal .ln{stroke:#fff;animation:none;stroke-dashoffset:0}',
 'html.bioentra #root{animation:bioIn .45s ease both}@keyframes bioIn{from{opacity:0;transform:scale(.98)}}',
 /* permisos */
 '#permov{position:fixed;inset:0;z-index:250;background:var(--bg);overflow-y:auto}#permov .w{max-width:520px;margin:0 auto;padding:calc(24px + var(--sbar,0px)) 18px 40px}#permov .pr{display:flex;align-items:center;gap:12px;padding:12px 0;border-top:1px solid var(--line)}#permov .pr:first-of-type{border-top:0}#permov .ic{font-size:28px;width:40px;text-align:center}#permov .st{font-weight:900;font-size:20px}'].join('\n');document.head.appendChild(st)})();
/* ---------- 80 · al abrir la app (en frío): el logo, menos de un segundo, y luego el PIN/huella ---------- */
(function(){if(window.__pnTest)return;try{var o=document.createElement('div');o.id='arr';var lg=(typeof logoApp==='function'&&logoApp())||(typeof LOGO_IC!=='undefined'?LOGO_IC:'');o.innerHTML=(lg?'<img alt="" src="'+lg+'">':'')+'<b>'+esc(String((S.cfg&&S.cfg.nombre)||'').trim()||'Ruta Fácil')+'</b>';
 var pon=function(){if(document.body){document.body.appendChild(o);setTimeout(function(){if(o.parentNode)o.remove()},950)}else setTimeout(pon,20)};pon()}catch(e){}})();
/* la primera vez en este celular: la bienvenida completa antes de pedir el correo */
var _r48a=render;render=function(){var r=_r48a.apply(this,arguments);try{if(!window.__pnTest&&document.getElementById('nbov')&&!document.getElementById('bienv')){var vis=false;try{vis=localStorage.getItem('bienvCel')==='1'}catch(e){}if(!vis){try{localStorage.setItem('bienvCel','1')}catch(e){}if(typeof bienvMostrar==='function')setTimeout(bienvMostrar,980)}}}catch(e){}return r};
/* ---------- 77/78/79 · huella o cara: lee con animación, verde al entrar, roja si falla (3 fallos → PIN) ---------- */
function bioAnim(est){var o=document.getElementById('bioa');if(est==='fuera'){if(o)o.remove();return}
 if(!o){o=document.createElement('div');o.id='bioa';o.innerHTML='<div class="c"><svg viewBox="0 0 64 64" fill="none" stroke-width="3.4" stroke-linecap="round"><path class="ln" d="M20 24c3-6 9-9 15-8s10 6 11 12"/><path class="ln" d="M16 34c0-9 7-16 16-16 8 0 15 7 15 16v4"/><path class="ln" d="M24 46c-2-3-3-7-3-11 0-6 5-11 11-11s11 5 11 11c0 3 0 6-1 9"/><path class="ln" d="M28 52c-1-5-1-10-1-16 0-3 2-5 5-5s5 2 5 5c0 6 0 11-2 16"/><path class="ln" d="M32 36c0 7 0 13 3 19"/><path class="ck" d="M18 33l10 10 18-20" stroke-width="5"/></svg></div>';document.body.appendChild(o)}
 o.className=est==='ok'?'ok':(est==='mal'?'mal':'')}
bioEntrar=function(){var p=bioPl(),k=_pin&&_pin.k;if(!p||!k||_bioEnCurso)return;_bioEnCurso=true;bioAnim('lee');
 p.verifyIdentity({reason:'Para entrar a Ruta Fácil',title:'Entrar con tu huella o cara',subtitle:pinNom(k),negativeButtonText:'Usar mi PIN',maxAttempts:3}).then(function(){_bioEnCurso=false;if(!_pin||_pin.k!==k){bioAnim('fuera');return}bioAnim('ok');try{vibrar(30)}catch(e){}
  setTimeout(function(){var cb=_pin.cb,m=_pin.modo;S.pinOk[k]=true;_pinAct=Date.now();if(S.pinF)delete S.pinF[k];_pin={v:'',modo:null};document.documentElement.classList.add('bioentra');bioAnim('fuera');render();setTimeout(function(){document.documentElement.classList.remove('bioentra')},500);if(m!=='entrar'&&cb)setTimeout(cb,0)},650)},
 function(er){_bioEnCurso=false;var cancel=er&&/^(10|13|5)$/.test(String(er.code||''));if(cancel){bioAnim('fuera');return}bioAnim('mal');try{vibrar([60,40,60])}catch(e){}setTimeout(function(){bioAnim('fuera');toast('Usa tu PIN')},900)})};
/* textos: huella o cara */
/* pinHTML: pasó a tema-pin.js */
/* ---------- 69 · permisos la primera vez (y si falta uno importante, se avisa) ---------- */
function natPl48(){var C=window.Capacitor;return C&&C.Plugins&&C.Plugins.RutaNativa||null}
var PERM_L=[['ubicacion','📍','Ubicación','Para la ruta, el mapa y guardar dónde están los clientes (solo mientras usas la app).'],['camara','📷','Cámara','Para las fotos (tickets, vehículo, entregas) y leer códigos QR.'],['notif','🔔','Avisos','Para que te lleguen entregas nuevas y avisos del administrador.']];
function permHTML(){var x=S.perm;if(!x)return '';var E=x.e||{},alguno=PERM_L.some(function(p){return E[p[0]]==='no'});
 return '<div id="permov" role="dialog" aria-label="Permisos"><div class="w"><b style="font-size:24px">Para que la app funcione bien</b><div class="lbl" style="margin:6px 0 12px">El celular te va a preguntar uno por uno. Toca "Permitir".</div><div class="card">'
  +PERM_L.map(function(p){var s=E[p[0]];return '<div class="pr"><span class="ic">'+p[1]+'</span><span class="grow"><b>'+p[2]+'</b><div class="lbl">'+p[3]+'</div></span><span class="st" style="color:'+(s==='si'?'var(--accent)':(s==='no'?'var(--danger)':'var(--muted)'))+'">'+(s==='si'?'✓':(s==='no'?'✗':'•'))+'</span></div>'}).join('')
  +'<div class="pr"><span class="ic">🖨️</span><span class="grow"><b>Bluetooth</b><div class="lbl">Se pide cuando conectes la impresora.</div></span></div></div>'
  +(alguno?'<div class="card alert"><b>Faltó dar algún permiso</b><div class="lbl">El celular ya no lo vuelve a preguntar. Ábrelo en los ajustes del celular → Permisos.</div><button class="btn" style="margin-top:8px" data-act="permaj">Abrir ajustes del celular</button></div>':'')
  +'<button class="btn" style="margin-top:12px;min-height:58px" data-act="'+(x.pedido?'permlisto':'permpide')+'">'+(x.pedido?'Listo':'Dar permisos')+'</button>'+(x.pedido?'':'<button class="link" style="margin-top:6px" data-act="permlisto">Ahora no</button>')+'</div></div>'}
/* setupHTML: pasó a tema-ajustes.js */
function permRevisa(cb){var n=natPl48();if(!n||!n.permisosEstado){cb&&cb(null);return}n.permisosEstado().then(function(e){cb&&cb(e)},function(){cb&&cb(null)})}
var _permVez=false;var _r48b=render;render=function(){var r=_r48b.apply(this,arguments);try{if(!_permVez&&!window.__pnTest&&natPl48()&&!(_pin&&_pin.modo)&&!document.getElementById('nbov')&&!document.getElementById('setov')&&!document.getElementById('bienv')&&S.role){_permVez=true;var vis=false;try{vis=localStorage.getItem('permVisto')==='1'}catch(e){}
 permRevisa(function(e){if(!e)return;S.permE=e;var faltaImp=e.ubicacion!=='si'||e.camara!=='si';if(!vis){S.perm={e:e};render()}else if(faltaImp&&S.role==='rep')render()})}}catch(er){}return r};
document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act]');if(!b)return;var a=b.dataset.act,n=natPl48();
 if(a==='permpide'){e.stopImmediatePropagation();if(!n)return;n.pedirPermisos({cuales:['ubicacion','camara','notif']}).then(function(r){S.perm={e:r,pedido:true};S.permE=r;render()},function(){S.perm.pedido=true;render()});return}
 if(a==='permlisto'){e.stopImmediatePropagation();try{localStorage.setItem('permVisto','1')}catch(er){}S.perm=null;render();return}
 if(a==='permaj'){e.stopImmediatePropagation();if(n&&n.abrirAjustes)n.abrirAjustes();var vuelve=function(){if(document.visibilityState==='visible'){document.removeEventListener('visibilitychange',vuelve);permRevisa(function(r){if(r){S.permE=r;if(S.perm)S.perm.e=r;render()}})}};document.addEventListener('visibilitychange',vuelve);return}},true);
/* al chofer: si le falta la ubicación o la cámara, un aviso arriba de su ruta */
/* ruta: pasó a tema-ruta.js */
function permAvisoHTML(){var e=S.permE;if(S.role!=='rep'||!e||S.perm)return '';var f=[];if(e.ubicacion==='no')f.push('ubicación');if(e.camara==='no')f.push('cámara');if(!f.length)return '';return '<div class="card alert"><b>Falta el permiso de '+f.join(' y ')+'</b><div class="lbl">Sin eso no se guardan las fotos o la ubicación de tus entregas.</div><button class="btn" style="margin-top:8px" data-act="permaj">Abrir ajustes del celular</button></div>'}
/* bienvHTML: pasó a tema-inicio.js */
