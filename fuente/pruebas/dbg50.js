const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage();await p.addInitScript(()=>{window.__pnTest=1});p.on('pageerror',e=>console.log('ERR',e.message));
await p.goto('file:///mnt/user-data/outputs/prototipo-platanos.html');await p.waitForTimeout(600);const ev=(f,a)=>p.evaluate(f,a);
console.log(await ev(()=>{S.popVisto={admin:iso(TODAY)};S.cierre.salioR=6;S.cierre.gxConf=true;S.cierre.sent=true;S.cierre.res=cierreRes();S.recep=null;S.role='admin';S.tab.admin='cierreadm';render();
 var ids=['rcR','rcM','rcV'].map(i=>!!document.getElementById(i));var bt=document.createElement('button');bt.dataset.act='recep';document.body.appendChild(bt);
 var i1=document.createElement('input');i1.id='rcR';i1.value='6';document.body.appendChild(i1);var i2=document.createElement('input');i2.id='rcM';i2.value='0';document.body.appendChild(i2);var i3=document.createElement('input');i3.id='rcV';i3.value='0';document.body.appendChild(i3);
 bt.click();return JSON.stringify({ids,recep:S.recep,t:S.toast,m:S.modal&&S.modal.t,res:S.cierre.res&&[S.cierre.res.reg,S.cierre.res.regK,S.cierre.res.V]})}));await b.close()})();
