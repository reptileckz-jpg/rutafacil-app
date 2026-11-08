const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:400,height:880}});await p.addInitScript(()=>{window.__pnTest=1});p.on('pageerror',e=>console.log('ERR',e.message));
await p.goto('file:///mnt/user-data/outputs/prototipo-platanos.html');await p.waitForTimeout(600);const ev=(f)=>p.evaluate(f);
console.log(await ev(()=>{S.popVisto={admin:iso(TODAY),cont:iso(TODAY)};S.precio.conf=iso(TODAY);S.role='rep';S.salida.ok=true;var i=curStop();S.cur=i;resetDraft(cl(S.stops[i].c));S.d.R=2;S.tab.rep='entrega';chofById(S.chofHoy).mayPerm=true;S.d.may=true;S.d.pRm='300';render();
 var h=precioCard();return JSON.stringify({need:mayNecesitaPerm(curCli(),S.d),end:h.slice(-200),inMain:!!document.querySelector('main [data-act="may"]'),cnt:document.querySelectorAll('[data-act="maypide"]').length})}));
await b.close()})();
