const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();let nOK=0,nF=0;const ok=(c,m,x)=>{c?nOK++:nF++;console.log((c?'OK   ':'FAIL ')+m+(x!==undefined?' '+JSON.stringify(x):''))};
const p=await b.newPage({viewport:{width:400,height:880}});await p.addInitScript(()=>{window.__pnTest=1});const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.goto('file:///mnt/user-data/outputs/prototipo-platanos.html');await p.waitForTimeout(600);const ev=(f,a)=>p.evaluate(f,a),W=ms=>p.waitForTimeout(ms);
await ev(()=>{S.popVisto={admin:iso(TODAY),cont:iso(TODAY)};S.precio.conf=iso(TODAY);S.dfTest=1;var c=S.choferes.filter(function(x){return x.id===1})[0];c.tel='';c.licV='';var v=S.veh[0];v.capL='';v.tcVence='';S.role='admin';S.tab.admin='inicio';render()});await W(300);
let L=await ev(()=>dfLista().map(function(x){return x.pr+' '+x.txt}));console.log('faltan',L.length,L.slice(0,8));
await p.evaluate(()=>{var t=document.querySelector('[data-act="bubtab"][data-v="df"]');if(t)t.click()});await p.waitForTimeout(150);let r=await ev(()=>{var b=document.querySelector('.dfbub');return b?b.innerText:null});ok(r&&r.indexOf(L[0].slice(2))>-1,'la burbuja muestra solo el más importante',r);
await p.screenshot({path:'v50/df1.png'});
await p.evaluate(()=>{var t=document.querySelector('[data-act="bubtab"][data-v="df"]');if(t)t.click()});await p.waitForTimeout(150);await p.click('.dfbub');await W(300);r=await ev(()=>({ov:!!document.getElementById('dfov'),gr:[...document.querySelectorAll('#dfov .card > b')].map(x=>x.innerText)}));ok(r.ov&&r.gr.length>=2,'al tocarla abre "Datos que faltan" agrupados por prioridad',r.gr);
await p.screenshot({path:'v50/df2.png',fullPage:true});
// ir al primero de personal
const go=async(re)=>{await ev(re=>{var b=[...document.querySelectorAll('#dfov .dfit')].find(x=>new RegExp(re).test(x.innerText));if(b)b.click();return !!b},re);await W(500)};
await go('Teléfono de');r=await ev(()=>({fi:!!document.getElementById('fiov'),edit:S.chEdit,foc:document.activeElement&&document.activeElement.id}));ok(r.fi&&r.edit&&/tel$/.test(r.foc||''),'un dato de personal te lleva a su campo',r);
// vehículo
await ev(()=>{S.openCh=null;S.chEdit=null;S.dfOpen=true;render()});await W(200);
let hayV=await ev(()=>dfLista().some(function(x){return x.go.t==='veh'}));
if(hayV){await go('(Seguro|Tarjeta|tanque|aceite|Kilometraje|Placas) ');r=await ev(()=>({tab:S.tab.admin,vf:!!S.vf}));ok(r.tab==='vehiculos'&&r.vf,'un dato del vehículo abre su edición',r)}
// minimizar
await ev(()=>{S.vf=null;S.dfOpen=false;S.tab.admin='inicio';render()});await W(200);await p.click('[data-act="dfmin"],[data-act="bubmin2"]');await W(200);
r=await ev(()=>({b:!!document.querySelector('.dfbub'),m:!!document.querySelector('[data-act="dfmax"]')}));ok(!r.b&&r.m,'se puede minimizar (queda "Faltan N")',r);
// cuando no falta nada desaparece
await ev(()=>{dfLista=function(){return []};render()});await W(200);ok(await ev(()=>!document.querySelector('.dfbub')&&!document.querySelector('[data-act="dfmax"]')),'si no falta nada, no sale');
ok(!errs.length,'sin errores',errs);console.log(nOK+' OK · '+nF+' FAIL');await b.close()})();
