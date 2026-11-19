/* 165 · barra de navegación flotante (el componente de Ricardo, tal cual): cada botón abre su pantalla, la cápsula se mueve con
   transform translateX(index*100%), los puntos salen con los pendientes, no tapa el final de las pantallas ni las ventanas de la app,
   en Más/Gastos/Vehículos… queda en "Más", y el chofer sigue con su barra de siempre. */
const {chromium}=require('playwright');const fs=require('fs'),path=require('path');let nOK=0,nF=0;const ok=(c,m,x)=>{c?nOK++:nF++;console.log((c?'OK   ':'FAIL ')+m+(x!==undefined?' '+JSON.stringify(x).slice(0,400):''))};
(async()=>{const b=await chromium.launch();const p=await (await b.newContext({viewport:{width:390,height:844}})).newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));p.on('dialog',d=>d.accept());await p.addInitScript(()=>{window.__pnTest=1;window.__hora93=12});
await p.goto('file:///mnt/user-data/outputs/prototipo-platanos.html');await p.waitForTimeout(900);const ev=(f,a)=>p.evaluate(f,a);let r;
await ev(()=>{S.tutVisto={rep:true,admin:true};S.popVisto={admin:iso(TODAY),cont:iso(TODAY)};S.role='admin';S.pinOk[pinKey()]=true;S.tab.admin='inicio';render()});
r=await ev(()=>{var n=document.querySelector('nav.floating-nav');return {n:document.querySelectorAll('nav.floating-nav').length,vieja:getComputedStyle(document.querySelector('nav.tabs')).display,items:[...n.querySelectorAll('.nav-item')].map(x=>x.dataset.tab).join(','),svg:n.querySelectorAll('.duotone-fill').length,clases:['.home-door','.pin-body','.pin-wave','.user-front','.truck-chassis','.truck-wheel-l','.anim-grid'].every(c=>n.querySelector(c)),blur:getComputedStyle(n).backdropFilter}});
ok(r.n===1&&r.vieja==='none'&&r.items==='inicio,rutas,clientes,bodega,cargas,mas'&&r.svg>=9&&r.clases&&/blur\(20px\)/.test(r.blur),'admin: la barra flotante (con sus íconos duotone y el vidrio) en lugar de la de antes',r);
for(const [t,i,h] of [['cargas',4,'Cargas'],['clientes',2,'Clientes'],['rutas',1,''],['bodega',3,''],['mas',5,'Más'],['inicio',0,'']]){
 await p.click('nav.floating-nav [data-tab="'+t+'"]');await p.waitForTimeout(150);
 r=await ev(()=>{var n=document.querySelector('nav.floating-nav'),a=n.querySelector('.nav-item.active');return {tab:S.tab.admin,pill:document.getElementById('activePill').style.transform,act:a&&a.dataset.tab,anim:!!n.querySelector('.nav-item.is-animating'),misma:n===window.__n0||(window.__n0=n,true)}});
 ok(r.tab===t&&r.pill==='translateX('+(i*100)+'%)'&&r.act===t&&r.anim&&r.misma,'"'+t+'": abre su pantalla, la cápsula a translateX('+(i*100)+'%) y el ícono se anima (misma barra, no se vuelve a crear)',r)}
r=await ev(()=>{S.tab.admin='vehiculos';render();return [S.tab.admin,document.getElementById('activePill').style.transform,document.querySelector('nav.floating-nav .nav-item.active').dataset.tab]});
ok(r[1]==='translateX(500%)'&&r[2]==='mas','si se llega a Vehículos (sección de Más) por otro lado, la cápsula queda en "Más"',r);
r=await ev(()=>{S.tab.admin='inicio';render();return [...document.querySelectorAll('nav.floating-nav .nav-item')].map(it=>{var o=document.querySelector('nav.tabs button[data-t="'+it.dataset.tab+'"]'),s=it.querySelector('.badge-slate');return [it.dataset.tab,!!(o&&o.querySelector('.tbadge')),s?!s.hidden:null]})});
ok(r.every(x=>x[2]===null||x[2]===x[1]),'los puntos grises salen donde hay pendientes',r);
r=await ev(()=>{S.tab.admin='clientes';render();window.scrollTo(0,document.body.scrollHeight);var m=document.querySelector('main'),k=[...m.querySelectorAll('*')].filter(x=>x.offsetParent&&x.getBoundingClientRect().height>0).pop();return [Math.round(k.getBoundingClientRect().bottom),Math.round(document.querySelector('nav.floating-nav').getBoundingClientRect().top)]});
ok(r[0]<=r[1],'hasta abajo: la barra no tapa el final de la pantalla',r);
r=await ev(()=>{var d=document.createElement('div');d.id='wzov';d.style.cssText='position:fixed;inset:0;z-index:92;background:#fff';d.innerHTML='<button id="wzb" style="position:absolute;bottom:30px;left:150px;width:90px;height:50px">Siguiente</button>';document.body.appendChild(d);var bb=document.getElementById('wzb').getBoundingClientRect(),e=document.elementFromPoint(bb.left+45,bb.top+25);var x=e&&e.id;d.remove();return x});
ok(r==='wzb','las ventanas de la app quedan ENCIMA de la barra (no tapa sus botones)',r);
r=await ev(()=>{S.role='rep';S.pinOk[pinKey()]=true;render();var f=!!document.querySelector('nav.floating-nav'),c=document.documentElement.classList.contains('fnav165');S.role='admin';S.pinOk[pinKey()]=true;render();return [f,c,!!document.querySelector('nav.floating-nav')]});
ok(r[0]===false&&r[1]===false&&r[2]===true,'el chofer no tiene la barra flotante (sigue con la suya); al volver a admin, regresa',r);
/* el HTML y el CSS van tal cual */
const s=fs.readFileSync('/home/user/rutafacil-app/fuente/capas/tema-barra.js','utf8');
ok(s.includes('activePill.style.transform = `translateX(${index * 100}%)`')&&s.includes('void el.offsetWidth')&&s.includes('cubic-bezier(0.34, 1.56, 0.64, 1)'),'switchTab: translateX(index*100%), curva elástica y void offsetWidth');
ok(!errs.length,'sin errores',errs);console.log(nOK+' OK · '+nF+' FAIL');await b.close()})();
