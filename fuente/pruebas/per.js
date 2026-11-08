const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();let nOK=0,nF=0;const ok=(c,m,x)=>{c?nOK++:nF++;console.log((c?'OK   ':'FAIL ')+m+(x!==undefined?' '+JSON.stringify(x):''))};
const ctx=await b.newContext({viewport:{width:400,height:880}});const errs=[];
const abrir=async()=>{const p=await ctx.newPage();p.on('pageerror',e=>errs.push(e.message));await p.goto('file:///mnt/user-data/outputs/platanos-primera-vez.html');await p.waitForTimeout(1200);return p};
let p=await abrir();const ev=(f,a)=>p.evaluate(f,a);
await ev(()=>{S.setup.fin=true;S.setup.bienv=true;S.cfg.nombre='Prueba Guardado';S.cli.push({id:901,n:'Cliente Que Se Guarda',a:'',km:3,lim:1500,cred:0,dias:[],chofer:1});S.inv.maduras=77;render()});await p.waitForTimeout(1200);
await p.close();p=await abrir();
let r=await p.evaluate(()=>({n:S.cfg.nombre,c:S.cli.some(function(c){return c.n==='Cliente Que Se Guarda'}),inv:S.inv.maduras,setup:!!document.getElementById('setov')}));
ok(r.n==='Prueba Guardado'&&r.c&&r.inv===77&&!r.setup,'al cerrar y volver a abrir, todo sigue ahí',r);
// cambio de día: ruta con entregas sin enviar
await p.evaluate(()=>{S.salida.ok=true;S.log=[{c:901,R:2,M:0,total:500,pago:500,abono:0,V:0}];S.cierre.sent=false;render()});await p.waitForTimeout(1200);
await p.evaluate(()=>{_cargado=false;return new Promise(function(res){idbGet('S',function(t){var o=JSON.parse(t);o._dia='2026-11-01';idbPut('S',JSON.stringify(o),res)})})});
await p.close();p=await abrir();
r=await p.evaluate(()=>({av:S.avPrecio.slice(-1)[0],log:S.log.length,hist:(S.rutasHist||[]).length}));ok(/no envió su cierre de ayer/.test(r.av)&&r.log===1,'nuevo día con cierre sin enviar: se queda la ruta y avisa',r);
// cambio de día con cierre enviado: archiva y empieza limpia
await p.evaluate(()=>{S.cierre.sent=true;S.cierre.res=cierreRes();render()});await p.waitForTimeout(1200);
await p.evaluate(()=>{_cargado=false;return new Promise(function(res){idbGet('S',function(t){var o=JSON.parse(t);o._dia='2026-11-02';idbPut('S',JSON.stringify(o),res)})})});
await p.close();p=await abrir();
r=await p.evaluate(()=>({log:S.log.length,sent:!!S.cierre.sent,hist:S.rutasHist.length,f:S.rutasHist.slice(-1)[0].f}));ok(r.log===0&&!r.sent&&r.hist>=2&&r.f==='2026-11-02','nuevo día con cierre enviado: se archiva y empieza limpia',r);
// la demo no se guarda
const p2=await ctx.newPage();await p2.goto('file:///mnt/user-data/outputs/prototipo-platanos.html');await p2.waitForTimeout(800);await p2.evaluate(()=>{S.cfg.nombre='NO GUARDAR';render()});await p2.waitForTimeout(1000);await p2.close();
const p3=await ctx.newPage();await p3.goto('file:///mnt/user-data/outputs/prototipo-platanos.html');await p3.waitForTimeout(800);ok(await p3.evaluate(()=>S.cfg.nombre!=='NO GUARDAR'),'la demo siempre empieza igual');
// dos rutas: admin ve cada una
const p4=await ctx.newPage();await p4.addInitScript(()=>{window.__pnTest=1});await p4.goto('file:///mnt/user-data/outputs/prototipo-platanos.html');await p4.waitForTimeout(700);
r=await p4.evaluate(()=>{S.popVisto={admin:iso(TODAY),cont:iso(TODAY)};S.role='rep';S.salida.ok=true;S.log=[{c:S.stops[0].c,R:3,M:0,total:780,pago:780,abono:0,V:0}];S.cierre.salioR=10;S.cierre.sent=true;S.cierre.res=cierreRes();var a=S.chofHoy;chCambiar(3);S.salida.ok=true;S.log=[{c:S.stops[0]?S.stops[0].c:1,R:5,M:0,total:1300,pago:1300,abono:0,V:0}];S.role='admin';S.tab.admin='inicio';render();
 var t=document.querySelector('main').innerText;return {a:a,act:S.chofHoy,card:/mandó su cierre/.test(t),log:S.log.length}});
ok(r.card,'admin: en Inicio sale el cierre de la otra ruta',r);
await p4.evaluate(()=>document.querySelector('[data-act="verruta"][data-ir]').click());await p4.waitForTimeout(200);
r=await p4.evaluate(()=>({ch:S.chofHoy,tab:S.tab.admin,log:S.log.length,sel:document.querySelectorAll('[data-act="verruta"]').length}));ok(r.ch===1&&r.tab==='cierreadm'&&r.log===1&&r.sel===2,'al tocarlo abre el cierre de ese chofer, con selector de rutas',r);
await p4.evaluate(()=>{document.querySelector('[data-act="verruta"][data-id="3"]').click()});await p4.waitForTimeout(150);r=await p4.evaluate(()=>({ch:S.chofHoy,log:S.log[0]&&S.log[0].R}));ok(r.ch===3&&r.log===5,'cada ruta conserva sus propias entregas',r);
ok(!errs.length,'sin errores',errs);console.log(nOK+' OK · '+nF+' FAIL');await b.close()})();
