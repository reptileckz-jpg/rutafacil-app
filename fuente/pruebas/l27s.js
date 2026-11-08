const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:390,height:844}});await p.addInitScript(()=>{window.__pnTest=1});
await p.goto('file:///mnt/user-data/outputs/prototipo-platanos.html');await p.waitForTimeout(600);
await p.evaluate(()=>{S.popVisto={admin:iso(TODAY),cont:iso(TODAY)};S.role='admin';S.tab.admin='personal';S.openCh=3;render()});await p.waitForTimeout(400);
await p.evaluate(()=>document.querySelector('[data-k="chcred"]').scrollIntoView({block:'center'}));await p.waitForTimeout(200);await p.screenshot({path:'v50/l27a.png'});
await p.evaluate(()=>{S.openCh=null;var c=S.cli[0];c.telPor=3;S.tab.admin='clientes';S.openCli=c.id;S.fiTab=S.fiTab||{};S.fiTab['cli:'+c.id]='dat';render()});await p.waitForTimeout(400);
await p.evaluate(()=>document.querySelector('[data-act="telconf"]').scrollIntoView({block:'center'}));await p.waitForTimeout(200);await p.screenshot({path:'v50/l27b.png'});await b.close()})();
