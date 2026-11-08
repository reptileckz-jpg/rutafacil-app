const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();let nOK=0,nF=0;const ok=(c,m,x)=>{c?nOK++:nF++;console.log((c?'OK   ':'FAIL ')+m+(x!==undefined?' '+JSON.stringify(x).slice(0,300):''))};
for(const f of ['prototipo-platanos','platanos-primera-vez']){
const p=await b.newPage({viewport:{width:400,height:880}});await p.addInitScript(()=>{window.__pnTest=1;window.__guiaTest=1;window.__guiaIdle=1500;try{localStorage.clear()}catch(e){}});const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.goto('file:///mnt/user-data/outputs/'+f+'.html');await p.waitForTimeout(800);const ev=(fn,a)=>p.evaluate(fn,a),W=ms=>p.waitForTimeout(ms);
await ev(()=>{if(S.setup)S.setup.fin=true;S.role='admin';S.encOn=false;S.pinOk[pinKey()]=true;S.popVisto={admin:iso(TODAY)};S.tab.admin='inicio';S.modal=null;render();window.scrollTo(0,0)});await W(200);
let r=await ev(()=>({hoy:!!document.querySelector('.hoytoca'),sig:(document.querySelector('.hoytoca .sig')||{}).textContent,q:!!document.querySelector('header.top .qbtn')}));
ok(r.hoy&&/Ahora sigue/.test(r.sig||''),f+': Inicio con "Hoy te toca" y lo que sigue',r);
const tabs=await ev(()=>tabsDe('admin').map(x=>x[0]).filter(t=>VIEWS[t]));
for(const t of tabs){await ev(t=>{S.tab.admin=t;S.openCh=null;S.openCli=null;render()},t);await W(80);const q=await ev(()=>!!document.querySelector('header.top .qbtn'));ok(q,f+': botón "?" en '+t)}
await ev(()=>{S.tab.admin='clientes';render()});await W(100);await ev(()=>document.querySelector('header.top .qbtn').click());await W(80);
r=await ev(()=>document.getElementById('guiab')&&document.getElementById('guiab').innerText);ok(/Clientes/.test(r||''),f+': "?" explica la pantalla',r);
await ev(()=>document.querySelector('[data-act="guiaok"]').click());await W(50);
await ev(()=>{S.tab.admin='gastos';render()});await W(3800);r=await ev(()=>document.getElementById('guiab')&&document.getElementById('guiab').innerText);ok(/¿Qué sigue\?/.test(r||'')&&/Gastos/.test(r||''),f+': quieto → burbuja "¿Qué sigue?"',r);
await ev(()=>document.querySelector('[data-act="guiamu"]').click());await W(100);ok(await ev(()=>!!document.querySelector('.guiahl')),f+': "Muéstrame" resalta');
await ev(()=>{S.role='rep';S.chofHoy=1;S.pinOk[pinKey()]=true;S.tab.rep='ruta';S.salida.ok=true;S.cierre.sent=false;render()});await W(150);
r=await ev(()=>{var a=document.querySelector('.ahora');return a&&a.innerText});ok(/Ahora sigue/.test(r||'')&&/Entrega a |Espera tus entregas/.test(r||''),f+': chofer: "Ahora sigue"',r);
ok(!errs.length,f+': sin errores',errs);await p.close()}
console.log(nOK+' OK · '+nF+' FAIL');await b.close()})();
