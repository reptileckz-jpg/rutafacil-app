const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:390,height:844}});await p.addInitScript(()=>{window.__pnTest=1});
await p.goto('file:///mnt/user-data/outputs/prototipo-platanos.html');await p.waitForTimeout(600);
await p.evaluate(()=>{S.popVisto={admin:iso(TODAY),cont:iso(TODAY)};S.role='rep';S.salida.ok=true;S.tab.rep='cierre';render()});await p.waitForTimeout(700);
console.log(await p.evaluate(()=>{var n=document.querySelector('nav.tabs');return n?{d:getComputedStyle(n).display,cls:document.documentElement.className,r:n.getBoundingClientRect().toJSON()}:'no nav'}));await p.screenshot({path:'v50/dbg11.png'});await b.close()})();
