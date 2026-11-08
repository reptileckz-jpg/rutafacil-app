const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:390,height:844},deviceScaleFactor:1});await p.addInitScript(()=>{window.__pnTest=1;window.__ubTest=1});
await p.goto('file:///mnt/user-data/outputs/prototipo-platanos.html');await p.waitForTimeout(600);const ev=f=>p.evaluate(f),W=ms=>p.waitForTimeout(ms);
await ev(()=>{S.popVisto={admin:iso(TODAY),cont:iso(TODAY)};S.role='admin';vwNuevo(null);S.vw.quien=3;S.vw.k='prov';S.vw.par[0].basId='__nueva';provD(S.vw.par[0].prov).lat=null;render()});await W(400);
await ev(()=>{var e=document.querySelector('#vwnb0');e.scrollIntoView({block:'center'})});await W(200);await p.screenshot({path:'v50/ubs1.png'});
await ev(()=>{S.role='rep';S.vws=[];vwNuevo(null);var v=S.vw;v.par=[v.par[0]];v.par[0].basId='__nueva';v.started=true;v.ftSal='x';v.k='camino';render()});await W(300);await p.screenshot({path:'v50/ubs2.png'});
await ev(()=>document.querySelector('#vwov [data-act="vwnext"]').click());await W(300);await ev(()=>document.querySelector('[data-act="ubgps"]').click());await W(300);await p.screenshot({path:'v50/ubs3.png'});
await b.close()})();
