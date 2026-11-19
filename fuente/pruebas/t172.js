/* 172 · (1) Revisión del vehículo: al tocar "Mal"/"✓" de un renglón la pantalla ya no se mueve (antes encontraba el botón igual de OTRO
   renglón y acomodaba según ese). (2) Pantalla ancha (700, 884 y 1280 px): sin columnas vacías (Más, Clientes, Rutas…). (3) Ajustes en
   grupos con "Acerca de" al final, las mismas tarjetas, y el campo donde escribes no pierde el foco. */
const {chromium}=require('playwright');let nOK=0,nF=0;const ok=(c,m,x)=>{c?nOK++:nF++;console.log((c?'OK   ':'FAIL ')+m+(x!==undefined?' '+JSON.stringify(x).slice(0,500):''))};
const SETUP=()=>{if(window.__su)return;window.__su=1;var bv=document.getElementById('bienv');if(bv)bv.remove();var U=S.setup;U.veh=[{n:'Camioneta Uno',pl:'AAA1',plEdo:'Baja California',comb:'Gasolina',img:0,odo:1000}];U.per=[{n:'Danu',puesto:'chofer',tel:'1'}];U.cli=[{n:'Doña Mary',a:'x',tel:'6640000001',dias:[0,1,2,3,4,5,6],cred:0,vac:0,ch:'0'}];U.prov=[];S.precio.R=275;S.precio.M=20;suAplicar();if(typeof _pin!=='undefined')_pin.modo=null;S.tutVisto={rep:true,admin:true};S.popVisto={admin:iso(TODAY),cont:iso(TODAY)}};
(async()=>{const b=await chromium.launch();const errs=[];
/* (1) revisión del vehículo */
{const p=await (await b.newContext({viewport:{width:360,height:700},hasTouch:true})).newPage();p.on('pageerror',e=>errs.push(e.message));p.on('dialog',d=>d.accept());await p.addInitScript(()=>{window.__pnTest=1;window.__hora93=8});
 await p.goto('file:///mnt/user-data/outputs/platanos-primera-vez.html');await p.waitForTimeout(900);const ev=(f,a)=>p.evaluate(f,a);
 await ev(SETUP);await ev(()=>{var D=S.choferes.filter(c=>c.n==='Danu')[0];S.pinOk[pinKey()]=true;S.pinOk['c:'+D.id]=true;S.role='rep';S.chofHoy=D.id;chCambiar(D.id);S.tab.rep='ruta';render();var bv=document.querySelector('[data-act="bienvgo"]');if(bv)bv.click();
  S.vehHoy=S.veh[0].id;salPon124(1);S.inspR=S.inspR||{tipo:'dia',r:{},veh:String(S.vehHoy)};var c=inspCfgN();var _il=inspLista;inspLista=function(t){return _il(t).slice(0,c.dia.length)};render()});
 await p.waitForTimeout(300);const res=[];
 for(const [i,v] of [[1,'mal'],[2,'mal'],[3,'bien'],[2,'bien']]){
  const sel='[data-act="insp"][data-i="'+i+'"][data-v="'+v+'"]';
  await ev(s=>{var e=document.querySelector(s);var r=e.getBoundingClientRect();window.scrollBy({top:r.top-330,behavior:'instant'})},sel);await p.waitForTimeout(300);
  const y0=await ev(()=>scrollY),t0=await ev(s=>Math.round(document.querySelector(s).getBoundingClientRect().top),sel);
  await p.tap(sel);await p.waitForTimeout(400);
  const q=await ev(s=>{var e=document.querySelector(s),a=document.activeElement;return {t1:e?Math.round(e.getBoundingClientRect().top):null,campo:!!(a&&/INPUT|TEXTAREA/.test(a.tagName)&&a.getBoundingClientRect().bottom<=innerHeight)}},sel);res.push({i,v,y0,t0,t1:q.t1,campo:q.campo})}
 /* se queda en su lugar; o, si abrió "¿Qué tiene?" pegado abajo, sube solo lo necesario para mostrar ese campo (nunca brinca hacia arriba de la pantalla) */
 ok(res.every(r=>r.t1!==null&&(Math.abs(r.t1-r.t0)<=3||(r.campo&&r.t1<r.t0&&r.t1>0))),'revisión del vehículo: el botón que tocas se queda en su lugar (Mal y ✓ de cada renglón)',res);
 r=await ev(()=>{var a=document.createElement('button');a.setAttribute('data-act','x');a.setAttribute('data-i','1');var c=a.cloneNode();c.setAttribute('data-i','2');return ext82(a)!==ext82(c)});
 ok(r,'el ancla distingue botones iguales de distinto renglón');
 await p.close()}
/* (2) pantalla ancha */
for(const W of [700,884,1280]){const p=await (await b.newContext({viewport:{width:W,height:900}})).newPage();p.on('pageerror',e=>errs.push(e.message));await p.addInitScript(()=>{window.__pnTest=1;window.__hora93=12});
 await p.goto('file:///mnt/user-data/outputs/prototipo-platanos.html');await p.waitForTimeout(900);const ev=(f,a)=>p.evaluate(f,a);
 const mal=[];
 for(const t of ['mas','clientes','rutas','bodega','cargas','gastos','personal','vehiculos','estadisticas','cuadre121']){
  const r=await ev(t=>{S.tutVisto={rep:true,admin:true};S.popVisto={admin:iso(TODAY),cont:iso(TODAY)};S.role='admin';S.pinOk[pinKey()]=true;S.tab.admin=t;render();
   var m=document.querySelector('main'),n=parseInt(getComputedStyle(m).columnCount)||1,tr=[[]];
   [...m.children].forEach(c=>{var cs=getComputedStyle(c);if(cs.display==='none'||cs.position==='fixed'||cs.position==='absolute')return;if(cs.columnSpan==='all'){tr.push([]);return}tr[tr.length-1].push(c)});
   var peor=0;tr.forEach(T=>{var C={};T.forEach(c=>{var q=c.getBoundingClientRect();if(!q.height)return;var k=Math.round(q.left/40);C[k]=C[k]||{t:1e9,b:0};C[k].t=Math.min(C[k].t,q.top);C[k].b=Math.max(C[k].b,q.bottom)});
    var A=Object.values(C).map(x=>x.b-x.t);if(!A.length)return;var mx=Math.max(...A),mn=A.length<n?0:Math.min(...A);
    /* un tramo con una sola tarjeta chica no cuenta */ if(mx>260)peor=Math.max(peor,Math.round(mx-mn))});
   return {n,peor}},t);
  if(r.n>1&&r.peor>260)mal.push(t+':'+r.peor)}
 ok(!mal.length,W+' px: ninguna pantalla deja una columna vacía (diferencia ≤ 260 px)',mal);
 r=await ev(()=>{S.tab.admin='mas';render();var g=document.querySelector('.mas166 .mas92.bento-grid-container');return g?getComputedStyle(g).gridTemplateColumns.split(' ').length:0});
 ok(r>=3,W+' px: Más pone 3 o más tarjetas a lo ancho',r);
 r=await ev(()=>{S.tab.admin='clientes';render();var L=document.querySelector('main>.lista164');return L?{span:getComputedStyle(L).columnSpan,cols:getComputedStyle(L).gridTemplateColumns.split(' ').length}:null});
 ok(r&&r.span==='all'&&r.cols>=2,W+' px: la lista de clientes va a todo lo ancho en cuadrícula',r);
 r=await ev(()=>{S.tab.admin='rutas';render();return [...document.querySelectorAll('main>.span172 svg:not(.nav-svg)')].map(s=>Math.round(s.getBoundingClientRect().height)).filter(h=>h>500)});
 ok(!r.length,W+' px: un mapa a todo lo ancho no queda altísimo',r);
 await p.close()}
/* (3) Ajustes en orden */
{const p=await (await b.newContext({viewport:{width:390,height:844}})).newPage();p.on('pageerror',e=>errs.push(e.message));await p.addInitScript(()=>{window.__pnTest=1;window.__hora93=12});
 await p.goto('file:///mnt/user-data/outputs/platanos-primera-vez.html');await p.waitForTimeout(900);const ev=(f,a)=>p.evaluate(f,a);await ev(SETUP);
 for(const rol of ['admin','rep']){
  r=await ev(rol=>{S.role=rol;S.pinOk[pinKey()]=true;S.aj=true;render();var c=document.getElementById('ajov').firstElementChild,K=[...c.children];
   var H=K.filter(x=>x.classList.contains('aj172h')).map(x=>x.dataset.g172),ult=K[K.length-1],acerca=/Desarrollada por/.test(ult.textContent)&&K[K.length-2].dataset.g172==='ace';
   var viejos=K.filter(x=>x.classList.contains('lbl')&&!x.classList.contains('aj172h')&&/^(Tu negocio|Vehículos y quejas|Configuración)$/.test(x.textContent.trim())).length;
   /* las mismas tarjetas: cuenta de botones y campos con y sin ordenar */
   var bt=c.querySelectorAll('button,input,select,textarea').length;var _o=ajOrden172;ajOrden172=function(){};render();var bt0=document.querySelectorAll('#ajov button,#ajov input,#ajov select,#ajov textarea').length;ajOrden172=_o;render();
   var grupoDe=function(sel){var e=document.querySelector('#ajov '+sel);if(!e)return null;var x=e.closest('#ajov>div>*');var h=null;for(var y=x;y;y=y.previousElementSibling)if(y.classList.contains('aj172h')){h=y.dataset.g172;break}return h};
   return {H,acerca,viejos,bt,bt0,logo:grupoDe('.logocard'),tut:grupoDe('[data-act="tutver"]')}},rol);
  const orden=['cel','neg','ven','fru','cho','dat','otr','ace'];
  ok(r.H.length>=2&&r.H.every((h,i)=>!i||orden.indexOf(h)>orden.indexOf(r.H[i-1]))&&r.acerca&&!r.viejos&&r.bt===r.bt0&&r.tut==='cel'&&(rol!=='admin'||r.logo==='neg'),
   rol+': Ajustes en grupos (Este celular, Tu negocio…), "Acerca de" al final, mismos botones y campos',r)}
 r=await ev(()=>{S.role='admin';S.aj=true;render();S.dOpen=S.dOpen||{};S.dOpen.ajneg=true;render();var i=document.querySelector('#cfg_nombre')||document.querySelector('#ajov input[type="number"],#ajov input[type="text"]');if(!i)return 'sin campo';i.focus();try{i.setSelectionRange&&i.setSelectionRange(0,0)}catch(e){}var id=i.id;render();var a=document.activeElement;S.aj=false;render();return {id,act:a&&a.id}});
 ok(r==='sin campo'||r.act===r.id,'Ajustes: al redibujar, el campo donde escribes conserva el foco',r);
 await p.close()}
ok(!errs.length,'sin errores',errs);console.log(nOK+' OK · '+nF+' FAIL');await b.close()})();
var r;
