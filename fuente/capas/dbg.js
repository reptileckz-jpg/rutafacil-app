const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:400,height:880}});p.on('pageerror',e=>console.log('ERR',e.message));
await p.goto('file:///mnt/user-data/outputs/prototipo-platanos.html');await p.waitForTimeout(400);
for(const d of '1234')await p.click('#pinov [data-act="pind"][data-v="'+d+'"]');await p.waitForTimeout(120);
await p.fill('#cjay',String(await p.evaluate(()=>cajaEsp())));await p.click('[data-act="cajaayerok"]');await p.waitForTimeout(120);
await p.evaluate(()=>{S.tab.admin='inicio';S.cajaCnt=String(cajaEsp());render();document.querySelector('[data-act="cajacierre"]').click()});await p.waitForTimeout(80);
await p.click('[data-act="confok"]');await p.waitForTimeout(120);
await p.evaluate(()=>{S.tab.admin='inicio';render();_pinAct=Date.now()-4*60000});
await p.evaluate(()=>{S.popVisto={admin:iso(TODAY),cont:iso(TODAY)};render();_pinAct=Date.now()-6*60000});await p.click('nav.tabs [data-act="tab"][data-t="gastos"]');await p.waitForTimeout(150);
console.log('locked',await p.evaluate(()=>!!document.querySelector('#pinov')+' '+S.tab.admin+' '+JSON.stringify(_pin)));
for(const d of '1234'){await p.click('#pinov [data-act="pind"][data-v="'+d+'"]');console.log(d,await p.evaluate(()=>JSON.stringify(_pin)+' '+!!document.querySelector('#pinov')))}
await p.waitForTimeout(150);console.log('after',await p.evaluate(()=>!!document.querySelector('#pinov')+' '+S.tab.admin+' '+JSON.stringify(S.pinOk)));
await p.screenshot({path:'v39/shots/dbg.png'});await b.close()})();
