const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();
const p=await b.newPage({viewport:{width:390,height:844}});await p.addInitScript(()=>{window.__pnTest=1});const errs=[];p.on('pageerror',e=>errs.push(e.message+' '+e.stack));
await p.goto('file:///mnt/user-data/outputs/prototipo-platanos.html');await p.waitForTimeout(600);const ev=(f,a)=>p.evaluate(f,a),W=ms=>p.waitForTimeout(ms);
const img=require('fs').readFileSync('v50/n0.png');
await ev(()=>{S.popVisto={admin:iso(TODAY),cont:iso(TODAY)};S.role='rep';S.tab.rep='ruta';vwNuevo(null);var v=S.vw;v.started=true;v.ftSal='x';v.k='b0';render()});await W(400);
// scroll down like a person
await ev(()=>{var o=document.getElementById('vwov');o.scrollTop=9999});
// simulate app restart (camera killed the app): state restored from JSON
await ev(()=>{S=JSON.parse(JSON.stringify(S));render()});await W(400);
console.log('same?',await ev(()=>S.vws.indexOf(S.vw)));
await p.setInputFiles('#vwov input[type=file]',{name:'t.png',mimeType:'image/png',buffer:img});await W(900);
await ev(()=>{var t=document.querySelector('#vwov [data-act="vwnext"]');t&&t.click()});await W(700);
console.log(JSON.stringify(await ev(()=>{var o=document.getElementById('vwov');return {k:S.vw&&S.vw.k,txt:o&&o.innerText.slice(0,200),st:o&&o.scrollTop}})));
await p.screenshot({path:'v50/vb4.png'});console.log(errs);await b.close()})();
