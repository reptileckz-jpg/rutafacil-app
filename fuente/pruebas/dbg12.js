const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:390,height:844}});await p.addInitScript(()=>{window.__pnTest=1;window.__ubTest=1});p.on('pageerror',e=>console.log('ERR',e.message));
await p.goto('file:///mnt/user-data/outputs/prototipo-platanos.html');await p.waitForTimeout(600);
console.log(await p.evaluate(()=>{S.popVisto={admin:iso(TODAY),cont:iso(TODAY)};S.role='rep';S.salida.ok=true;S.inv.reparto=50;S.tab.rep='ruta';render();var n0=S.cli.length;var bt=document.querySelector('[data-act="calle"][data-reg="1"]');if(!bt)return 'no btn';bt.click();return {n0:n0,n1:S.cli.length,tab:S.tab.rep,modal:S.modal&&S.modal.t,conf:S.confirm,cur:S.cur,stop:S.stops[S.cur]}}));await b.close()})();
