/* ===================== v5.1 · Arreglos de la prueba en celulares ===================== */
(function(){var st=document.createElement('style');st.textContent=[
 /* el "+" se iba a media pantalla: la animación de cambio de pantalla dejaba un transform puesto */
 '.scr-in,main.scr-in{animation-fill-mode:backwards!important}',
 '.fab{position:fixed!important;right:max(16px,env(safe-area-inset-right,0px))!important;left:auto!important}',
 /* la burbuja de datos que faltan queda pegada debajo del encabezado (no se esconde detrás) */
 '.dfbub{position:sticky;top:calc(var(--hdrH,72px) + 6px);z-index:7}',
 '.dfmini{position:sticky;top:calc(var(--hdrH,72px) + 6px);z-index:7}',
 /* Bodega: la tarjeta de existencias usa todo el ancho en pantallas anchas */
 '.card.exist{column-span:all;-webkit-column-span:all;grid-column:1/-1}',
 /* bienvenida legible aunque el celular esté en modo oscuro */
 '#bienv{background:#F6F1E3!important;color:#1E2A1A!important}#bienv p,#bienv .lbl{color:#3D4A38!important;font-size:17px}#bienv h1{color:#1E2A1A!important}'
].join('\n');document.head.appendChild(st);
 if(!document.querySelector('meta[name="color-scheme"]')){var m=document.createElement('meta');m.name='color-scheme';m.content='light dark';document.head.appendChild(m)}})();
function hdrMedir(){var h=document.querySelector('header');if(h)document.documentElement.style.setProperty('--hdrH',Math.round(h.getBoundingClientRect().height)+'px')}
window.addEventListener('resize',hdrMedir);
var _r22=render;render=function(){var r=_r22.apply(this,arguments);try{hdrMedir()}catch(e){}return r};
/* minimizada también se queda arriba */
/* dfBurbuja: pasó a tema-piezas.js */
/* Bodega */
/* bodega: pasó a tema-bodega.js */
if(typeof VIEWS!=='undefined')VIEWS.bodega=bodega;

/* ===================== Versión real: sin "demo" en el menú ===================== */
var REAL=(typeof MODO!=='undefined'&&MODO==='vacio');
function personasEntrar(){var L=[];(S.admins||[]).forEach(function(a){L.push({k:'a:'+a.k,n:a.n,p:'Administrador',go:{role:'admin',adm:a.k}})});
 S.choferes.forEach(function(c){if(c.baja||c.arch)return;if(typeof esAdm==='function'&&esAdm(c))return;var pu=c.puesto||'chofer';if(pu==='chofer')L.push({k:'c:'+c.id,n:c.n,p:'Chofer',go:{role:'rep',ch:c.id}});else if(pu==='local')L.push({k:'local',n:c.n,p:'Venta local',go:{role:'local'}})});
 if(S.cfg.contador||S.pins.cont)L.push({k:'cont',n:'Contador',p:'Contador',go:{role:'cont'}});return L}
/* menuHTML: pasó a tema-sueltas.js */
var _bienv22=typeof bienvHTML==='function'?bienvHTML:null;
/* pie de página de "prototipo" */
var _rFoot22=render;render=function(){var r=_rFoot22.apply(this,arguments);if(REAL){var f=document.querySelector('main .foot');if(f&&f.style.display!=='none')f.style.display='none'}return r};
function usrHTML(){if(!S.usrSel)return '';var L=personasEntrar();
 return '<div class="drawer" style="z-index:86" data-act="usrx"><nav role="dialog" aria-label="Cambiar de usuario" style="max-width:420px"><div style="display:flex;align-items:center"><b style="font-size:18px">¿Quién va a usar el celular?</b><button class="helpb" style="margin-left:auto" data-act="usrx" aria-label="Cerrar">×</button></div><div class="lbl">Te va a pedir el PIN de esa persona.</div>'+L.map(function(x,i){return '<button class="qa" style="margin-top:8px;width:100%;text-align:left" data-act="usrpick" data-i="'+i+'"><span class="grow"><b>'+esc(x.n)+'</b><br><span class="lbl">'+x.p+'</span></span><span style="font-size:20px">›</span></button>'}).join('')+'</nav></div>'}
/* setupHTML: pasó a tema-ajustes.js */
function entrarComo(x){var g=x.go;S.menu=false;S.usrSel=false;if(g.role==='rep'){if(+S.chofHoy!==+g.ch)chCambiar(+g.ch);S.arOn=false}if(g.role==='admin'){S.adminYo=g.adm;S.encOn=false}S.role=g.role;S.pinOk={};S.toast='';pinEntrar();render();window.scrollTo(0,0)}
document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act]');if(!b)return;var a=b.dataset.act;
 if(a==='usrcambia'){e.stopImmediatePropagation();S.menu=false;S.usrSel=true;render();return}
 if(a==='usrx'){if(e.target.closest('nav')&&b.tagName!=='BUTTON')return;e.stopImmediatePropagation();S.usrSel=false;render();return}
 if(a==='usrpick'){e.stopImmediatePropagation();var x=personasEntrar()[+b.dataset.i];if(x)entrarComo(x);return}
 if(a==='usrsalir'){e.stopImmediatePropagation();S.menu=false;S.pinOk={};S.toast='';pinEntrar();render();return}},true);

/* ===================== PIN: crear el propio, cambiarlo, reiniciarlo, bloqueo por intentos ===================== */
/* nadie entra con 1234: si no tiene PIN, lo crea al entrar */
function pinTiene(k){return !!S.pins[k]}
/* pinDe: pasó a tema-pin.js */
var _pnew={k:null,v:'',v1:null};
/* pinHTML: pasó a tema-pin.js */
document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act="pnd"],[data-act="pnb"],[data-act="pnx"]');if(!b)return;e.stopImmediatePropagation();var a=b.dataset.act;
 if(a==='pnb'){_pnew.v=_pnew.v.slice(0,-1);render();return}
 if(a==='pnx'){if(_pnew.v1!=null){_pnew.v1=null;_pnew.v=''}render();return}
 _pnew.err='';if(_pnew.v.length<4)_pnew.v+=b.dataset.v;if(_pnew.v.length<4){render();return}
 if(_pnew.v1==null){if(_pnew.v==='1234'||/^(\d)\1{3}$/.test(_pnew.v)){_pnew.v='';_pnew.err='Ese PIN es muy fácil de adivinar (como 1234 o 1111). Escoge otro.';try{vibrar([60,40,60])}catch(er){}render();return}_pnew.v1=_pnew.v;_pnew.v='';render();return}
 if(_pnew.v!==_pnew.v1){_pnew={k:_pnew.k,v:'',v1:null,err:'No fue el mismo PIN. Vuelve a crearlo desde el principio.'};try{vibrar([60,40,60])}catch(er){}render();return}
 var k=_pnew.k;S.pins[k]=_pnew.v;S.pinOk[k]=true;_pnew={k:null,v:'',v1:null};var cb=_pin.cb,m=_pin.modo;_pin={v:'',modo:null};_pinAct=Date.now();S.hist.push({t:fmtF(iso(TODAY))+' '+hhmm(),q:pinNom(k),x:'Creó su PIN'});toast('PIN creado');render();if(m!=='entrar'&&cb)setTimeout(cb,0)},true);
/* bloqueo por intentos: 5 equivocados → 1 min, luego 5, luego 15; aviso al admin */
var PIN_ESP=[1,5,15];
function pinFallas(k){S.pinF=S.pinF||{};return S.pinF[k]||(S.pinF[k]={n:0,nivel:0,hasta:0})}
function pinBloqueo(k){var f=pinFallas(k),r=f.hasta-Date.now();if(r<=0)return '';var s=Math.ceil(r/1000);return s>=60?Math.ceil(s/60)+' min':s+' s'}
/* pinDe: pasó a tema-pin.js */
setInterval(function(){if(_pin&&_pin.modo&&_pin.k&&S.pinF&&S.pinF[_pin.k]&&S.pinF[_pin.k].hasta>Date.now()-1500)render()},1000);
/* "Cambiar" mi PIN pide el actual; el admin puede reiniciar el de otros */
/* pinRow: pasó a tema-pin.js */
document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act]');if(!b)return;var a=b.dataset.act,k=b.dataset.k;
 if(a==='pincambia'&&k===pinKey()&&pinTiene(k)&&!b.dataset.ok){e.stopImmediatePropagation();_pin={v:'',modo:'conf',k:k,motivo:'Escribe tu PIN actual',cb:function(){var x=document.createElement('button');x.dataset.act='pincambia';x.dataset.k=k;x.dataset.ok='1';x.style.display='none';document.body.appendChild(x);x.click();x.remove()}};render();return}
 if(a==='pinreset'){e.stopImmediatePropagation();delete S.pins[k];if(S.pinF)delete S.pinF[k];S.hist.push({t:fmtF(iso(TODAY))+' '+hhmm(),q:quien(),x:'Reinició el PIN de '+pinNom(k)});toast('Listo: '+pinNom(k)+' va a crear un PIN nuevo la próxima vez que entre');render();return}},true);
/* ya no hay "todavía es 1234" en los datos que faltan */
/* dfLista: pasó a tema-sueltas.js */

/* ===================== Vehículo: marca, modelo, año, color, serie, capacidad, motor, llantas ===================== */
var VEH_X=[['marca','Marca','text','ej. Nissan'],['modelo','Modelo','text','ej. NP300'],['anio','Año','number',''],['color','Color','text',''],['vin','Número de serie (VIN)','text',''],['capC','Capacidad de carga (cajas)','number',''],['capK','Capacidad de carga (kg)','number',''],['motor','Motor','text','ej. 2.5 L diésel'],['llanta','Medida de llanta','text','ej. 195/R15']];
/* vForm: pasó a tema-vehiculos.js */
document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act]');if(!b)return;var a=b.dataset.act;
 if(a==='vsave'&&S.vf){var f=JSON.parse(JSON.stringify(S.vf)),id=S.vfId,n0=S.veh.length;setTimeout(function(){var v=id!=null?vehById(id):(S.veh.length>n0?S.veh[S.veh.length-1]:null);if(!v)return;['marca','modelo','motor','llanta'].forEach(function(k){if(f[k]!=null)v[k]=String(f[k]).trim()});if(num(f.capK)>0)v.capK=num(f.capK);render()},0)}
 if(a==='vedit'){var vid=+b.dataset.id;setTimeout(function(){var v=vehById(vid);if(v&&S.vf){['marca','modelo','motor','llanta','capK'].forEach(function(k){if(v[k]!=null)S.vf[k]=v[k]});render()}},0)}},true);
/* en la configuración inicial */
/* setupHTML: pasó a tema-ajustes.js */
/* suAplicar: pasó a tema-ajustes.js */
/* faltantes del vehículo */
/* dfLista: pasó a tema-sueltas.js */

/* ===================== Avisos de poca fruta (desde la configuración inicial) ===================== */
var MIN_K=[['minV','Cajas verdes de roatán','cajas','verdes','Pide carga'],['minMad','Cajas maduras de roatán','cajas','maduras','Saca a madurar'],['minKV','Kilos de macho verde','kg','kgVerde','Pide carga'],['minKMad','Kilos de macho maduro','kg','kgMaduro','Saca a madurar']];
function minCampos(pref){return '<div class="card" data-key="mincard"><b>¿Cuándo te aviso que hay poca fruta?</b><div class="lbl">Te aviso cuando quede esto o menos. Déjalo vacío si no quieres aviso.</div>'+MIN_K.map(function(m){return '<div class="field"><label for="'+pref+m[0]+'">'+m[1]+' ('+m[2]+')</label><input id="'+pref+m[0]+'" type="number" inputmode="decimal" min="0" data-bind="cfg.'+m[0]+'" value="'+esc(S.cfg[m[0]]==null?'':S.cfg[m[0]])+'"></div>'}).join('')+'</div>'}
/* setupHTML: pasó a tema-ajustes.js */
/* ajHTML: pasó a tema-ajustes.js */
function minAvisos(){var a=[];MIN_K.forEach(function(m){var lim=S.cfg[m[0]];if(lim==null||lim==='')return;lim=num(lim);var hay=num(S.inv[m[3]]);if(hay<=lim)a.push('URGENTE: '+(m[2]==='kg'?'quedan pocos ':'quedan pocas ')+m[1].toLowerCase()+': '+(m[2]==='kg'?(Math.round(hay*10)/10).toLocaleString('es-MX')+' kg':hay+' cajas')+' (te aviso con '+lim+'). '+m[4]+'.')});return a}
/* avisos: pasó a tema-avisos.js */

/* ===================== Versión real: sin rastros de demo, fecha y hora de verdad ===================== */
if(REAL){document.documentElement.classList.add('real');(function(){var st=document.createElement('style');st.textContent='html.real main .foot,html.real [data-act="reset"]{display:none!important}.bvhola>:first-child{margin-left:auto!important;margin-right:auto!important}';document.head.appendChild(st)})()}
function relojReal(){var d=new Date();return d.getHours()*60+d.getMinutes()}
if(REAL){S.reloj=relojReal();var _rClk22=render;render=function(){S.reloj=relojReal();return _rClk22.apply(this,arguments)};
 /* si la app se queda abierta y cambia el día, se recarga (lo guardado pasa al día nuevo) */
 var _diaAbierto=iso(TODAY);document.addEventListener('visibilitychange',function(){if(document.visibilityState==='visible'){var d=new Date();d.setHours(12,0,0,0);if(iso(d)!==_diaAbierto){try{guardarYa()}catch(e){}setTimeout(function(){location.reload()},300)}}})}
/* bienvHTML: pasó a tema-inicio.js */

/* ===================== Botón o gesto de "atrás" =====================
   Atrás = cierra la ventana que está abierta o regresa a la pantalla anterior; si ya no hay, va a la
   pantalla principal (Inicio del admin / Ruta del chofer). Estando en la principal, hay que hacerlo
   dos veces seguidas para salir. */
var NAV_CASA={admin:'inicio',rep:'ruta',local:'local',cont:'cres'};
var _navPila=[],_navUlt=null,_navAtras=false,_navSalir=0,_navGuard=false;
function navLlave(){return S.role+':'+(S.tab&&S.tab[S.role])}
function navGuardia(){if(_navGuard)return;try{history.pushState({pn:1},'');_navGuard=true}catch(e){}}
try{history.replaceState({pn:0},'')}catch(e){}
setTimeout(navGuardia,300);
var _rNav22=render;render=function(){var r=_rNav22.apply(this,arguments);try{var k=navLlave();if(_navUlt&&k!==_navUlt&&!_navAtras&&_navUlt.split(':')[0]===S.role){_navPila.push(_navUlt);if(_navPila.length>30)_navPila.shift()}if(_navUlt&&_navUlt.split(':')[0]!==S.role)_navPila=[];_navUlt=k;_navAtras=false}catch(e){}return r};
function navVentana(){/* la ventana de más arriba que tenga botón para cerrar/regresar */
 var D=[].slice.call(document.querySelectorAll('[role="dialog"],.drawer,#fiov,#ajov,#npov,#dfov,#setov,.gxsheet')).filter(function(d){if(!d.isConnected||d.id==='pinov'||d.id==='bienv'||d.id==='setov'||d.id==='cajov')return false;var cs=getComputedStyle(d);return cs.display!=='none'&&cs.visibility!=='hidden'&&d.getBoundingClientRect().height>0});
 if(!D.length)return null;D.sort(function(a,b){return (+getComputedStyle(b).zIndex||0)-(+getComputedStyle(a).zIndex||0)});
 for(var i=0;i<D.length;i++){var d=D[i],c=d.querySelector('[aria-label="Regresar"],[aria-label="Cerrar"],[aria-label="Cerrar menú"],[aria-label="Cancelar"],.fiback,[data-act$="x"],[data-act="modalx"],[data-act="menux"]');if(!c&&d.classList.contains('drawer'))c=d;if(c)return c}return null}
function navAtras(){
 if(_pin&&_pin.modo){if(_pin.modo!=='entrar'){_pin={v:'',modo:null};render()}return true}
 if(S.modal){S.modal=null;render();return true}
 if(S.confirm){S.confirm=null;render();return true}
 var c=navVentana();if(c){c.click();return true}
 var casa=NAV_CASA[S.role]||S.tab[S.role];
 while(_navPila.length){var p=_navPila.pop();if(p!==navLlave()&&p.split(':')[0]===S.role){_navAtras=true;S.tab[S.role]=p.split(':')[1];render();window.scrollTo(0,0);return true}}
 if(S.tab[S.role]!==casa){_navAtras=true;S.tab[S.role]=casa;render();window.scrollTo(0,0);return true}
 return false}
window.addEventListener('popstate',function(){_navGuard=false;
 if(navAtras()){_navSalir=0;navGuardia();return}
 /* ya está en la principal: la primera vez avisa, la segunda sale */
 var now=Date.now();if(now-_navSalir<2500){_navSalir=0;try{history.back()}catch(e){}return}
 _navSalir=now;toast('Vuelve a deslizar hacia atrás para salir');setTimeout(function(){if(!_navGuard&&Date.now()-_navSalir>=2400)navGuardia()},2500);
 /* si sigue usando la app, se vuelve a poner la guardia */
 var g=function(){navGuardia();document.removeEventListener('pointerdown',g,true)};document.addEventListener('pointerdown',g,true)});

/* ===================== Barra de estado del teléfono =====================
   En la app de Android la pantalla empezaba debajo de la hora y los íconos. Ahora se respeta ese espacio
   (también en las ventanas que cubren toda la pantalla). */
(function(){var mv=document.querySelector('meta[name="viewport"]');if(mv&&mv.content.indexOf('viewport-fit')<0)mv.content+=',viewport-fit=cover';
 var esApp=!!(window.Capacitor&&window.Capacitor.isNativePlatform&&window.Capacitor.isNativePlatform());if(esApp)document.documentElement.classList.add('app-nativa');
 var st=document.createElement('style');st.textContent=[
  ':root{--sbar:env(safe-area-inset-top,0px)}',
  'header{padding-top:calc(12px + var(--sbar))!important}',
  '#setov,#ajov,#pinov,#cajov,#bienv,.drawer nav{padding-top:calc(10px + var(--sbar))!important}',
  '#fiov .fihd,#npov .fihd,#dfov .fihd{padding-top:calc(10px + var(--sbar))!important}',
  '#fiov .fitabs{top:calc(62px + var(--sbar))!important}'
 ].join('\n');document.head.appendChild(st)})();

/* el vehículo al asignar un viaje: la etiqueta de combustible ya no se sale */
(function(){var st=document.createElement('style');st.textContent='[data-act="vwveh"]{height:auto!important;min-height:76px;padding-top:10px!important;padding-bottom:10px!important;align-items:center}';document.head.appendChild(st)})();
/* tutorial del chofer: solo cuando ya entró con su PIN y ya está en su ruta (no encima de la bienvenida) */
var _tutRepT=null;
var _rTut22=render;render=function(){var r=_rTut22.apply(this,arguments);try{if(REAL&&S.role==='rep'&&!(S.tutVisto&&S.tutVisto.rep)&&!S.tut&&!(_pin&&_pin.modo)&&!(typeof bienvOn==='function'&&bienvOn())&&!document.getElementById('bienv')&&!S.modal&&!_tutRepT){_tutRepT=setTimeout(function(){_tutRepT=null;if(S.role==='rep'&&!S.tut&&!(S.tutVisto&&S.tutVisto.rep)&&!(_pin&&_pin.modo)&&!bienvOn())tutIniciar('rep')},700)}}catch(e){}return r};

/* las animaciones de entrada ya no dejan "movidas" las barras fijas (la de abajo del viaje se iba a un lado) */
(function(){var st=document.createElement('style');st.textContent='.ov-in,.ov-fade,.d-in,.popin,.slideup,.fadein,.app,main,main>*{animation-fill-mode:backwards!important}';document.head.appendChild(st)})();

/* ===================== Vibración ===================== */
function vibrar(p){try{var H=window.Capacitor&&window.Capacitor.Plugins&&window.Capacitor.Plugins.Haptics;if(H){if(Array.isArray(p)){H.vibrate({duration:Math.min(1500,p.reduce(function(a,b){return a+b},0))})}else if(p>=200)H.vibrate({duration:p});else H.impact({style:p>=40?'MEDIUM':'LIGHT'});return}}catch(e){}try{if(navigator.vibrate)navigator.vibrate(p)}catch(e){}}
/* velBeep: pasó a tema-vehiculos.js */
if(typeof fxErr==='function'){var _fe22=fxErr;fxErr=function(){try{_fe22.apply(this,arguments)}catch(e){}vibrar(250)}}

/* ===================== Teclado del PIN: responde aunque se teclee rápido ===================== */
(function(){var st=document.createElement('style');st.textContent='#pinov .kp button{touch-action:manipulation;-webkit-user-select:none;user-select:none;-webkit-tap-highlight-color:transparent}';document.head.appendChild(st)})();
var _kpUlt=0;
document.addEventListener('pointerdown',function(e){var b=e.target.closest&&e.target.closest('#pinov .kp button[data-act]');if(!b)return;e.preventDefault();_kpUlt=Date.now();vibrar(15);
 var a=b.dataset.act,v=b.dataset.v;setTimeout(function(){var x=document.createElement('button');x.dataset.act=a;if(v!=null)x.dataset.v=v;x.dataset.kp='1';x.style.display='none';document.body.appendChild(x);x.click();x.remove()},0)},true);
window.addEventListener('click',function(e){if(e.target&&e.target.dataset&&e.target.dataset.kp)return;var b=e.target.closest&&e.target.closest('#pinov .kp button[data-act]');if(b&&Date.now()-_kpUlt<800){e.stopImmediatePropagation();e.preventDefault()}},true);

/* ===================== Aviso de velocidad: se quita solo al bajar =====================
   Muestra la velocidad de ese momento; cuando baja del límite por unos segundos, se cierra solo.
   En la app usa el GPS del celular; en la demo se simula que va bajando. */
var _velW=null,_velBajo=0,_velSin=0;
function velMedir(){var a=S.velAl;if(!a)return;
 if(navigator.geolocation&&!_velW&&!DEMO){try{_velW=navigator.geolocation.watchPosition(function(p){var s=p.coords&&p.coords.speed;if(s==null||!S.velAl)return;S.velAl.cur=Math.round(s*3.6);velRevisar()},function(){},{enableHighAccuracy:true,maximumAge:1000})}catch(e){}}}
function velRevisar(){var a=S.velAl;if(!a)return;var cur=a.cur==null?a.vel:a.cur;if(cur<=a.lim){_velBajo++;if(_velBajo>=2){velCerrar(true);return}}else _velBajo=0;render()}
function velCerrar(auto){S.velAl=null;_velBajo=0;_velSin=0;if(_velW!=null){try{navigator.geolocation.clearWatch(_velW)}catch(e){}_velW=null}if(auto)toast('Gracias, ya vas a buena velocidad');render()}
setInterval(function(){var a=S.velAl;if(!a)return;velMedir();_velSin++;if(DEMO){a.cur=Math.max(a.lim-8,(a.cur==null?a.vel:a.cur)-4);velRevisar()}else if(a.cur==null&&_velSin>20&&!a._sin113){a._sin113=1;render()}},1000);
/* velAlertaHTML: pasó a tema-vehiculos.js */
