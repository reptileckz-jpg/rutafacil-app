const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();let nOK=0,nF=0;const ok=(c,m,x)=>{c?nOK++:nF++;console.log((c?'OK   ':'FAIL ')+m+(x!==undefined?' '+JSON.stringify(x):''))};
const p=await b.newPage({viewport:{width:390,height:844}});await p.addInitScript(()=>{window.__pnTest=1});const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.goto('file:///mnt/user-data/outputs/prototipo-platanos.html');await p.waitForTimeout(600);const ev=(f,a)=>p.evaluate(f,a),W=ms=>p.waitForTimeout(ms);
// barra abajo en pantalla corta
await ev(()=>{S.popVisto={admin:iso(TODAY),cont:iso(TODAY)};S.role='rep';S.salida.ok=true;S.tab.rep='cierre';render()});await W(700);
let r=await ev(()=>{var n=document.querySelector('nav.tabs');return n?n.getBoundingClientRect().bottom:null});ok(r>780||r===0,'chofer: la barra está hasta abajo (o no hay barra en modo sencillo)',r);
await ev(()=>{S.role='admin';S.tab.admin='personal';render()});await W(700);
r=await ev(()=>{var n=document.querySelector('nav.tabs');return n?n.getBoundingClientRect().bottom:null});ok(r>780,'admin: la barra está hasta abajo',r);
// durante el viaje no hay barra
await ev(()=>{S.role='rep';vwNuevo(null);S.vw.started=true;S.vw.ftSal='x';S.vw.k='camino';render()});await W(500);
r=await ev(()=>{var n=document.querySelector('nav.tabs');return n?getComputedStyle(n).display:'none'});ok(r==='none','en el viaje no sale la barra de secciones',r);
// burbujas minimizadas flotan
await ev(()=>{S.vw.open=false;S.role='admin';S.tab.admin='inicio';S.bubMin=true;S.dfMin=true;render()});await W(600);
r=await ev(()=>{var d=document.querySelector('.mindock');if(!d)return null;var cs=getComputedStyle(d);return {pos:cs.position,n:d.children.length,top:d.getBoundingClientRect().top,right:innerWidth-d.getBoundingClientRect().right}});ok(r&&r.pos==='fixed'&&r.n>=1&&r.right<20,'minimizadas: flotan a la derecha sin ocupar lugar',r);
await p.screenshot({path:'v50/l25a.png'});
await ev(()=>{document.querySelector('.mindock [data-act="bubmax"]').click()});await W(500);ok(await ev(()=>!S.bubMin&&!!document.querySelector('.vbub')),'tocar la de viaje la abre');
// aviso de cajas solo para admin
await ev(()=>{S.toast='';S.role='rep';S.inv.vacias+=7;render()});await W(400);r=await ev(()=>S.toast);ok(!/cuadra/.test(r),'el chofer no ve "no cuadra"',r);
await ev(()=>{S.role='admin';_cuMal='';render()});await W(400);r=await ev(()=>S.toast);ok(/Las taras no cuadran\. La app cuenta [\d,]+ taras y deberían ser [\d,]+: sobran 7/.test(r),'admin: aviso claro de cajas (7.5: en palabras claras)',r);
ok(!errs.length,'sin errores',errs);console.log(nOK+' OK · '+nF+' FAIL');await b.close()})();
