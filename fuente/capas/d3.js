const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:400,height:880}});await p.addInitScript(()=>{window.__pnTest=1});
await p.goto('file:///mnt/user-data/outputs/prototipo-platanos.html');await p.waitForTimeout(400);
await p.evaluate(()=>{S.popVisto={admin:iso(TODAY),cont:iso(TODAY)};S.precio.conf=iso(TODAY);S.tab.admin='cargas';S.openProv='Roly';render()});
await p.evaluate(()=>document.querySelector('[data-act="pdnuevo"]').scrollIntoView());
const tops=await p.evaluate(async()=>{var o=[];for(var i=0;i<10;i++){var el=document.querySelector('[data-act="pdnuevo"]');var f=document.querySelector('#fiov');o.push([el?Math.round(el.getBoundingClientRect().top):'x',f?Math.round(f.scrollTop):'-',Math.round(window.scrollY),f?Math.round(f.getBoundingClientRect().top):'-']);await new Promise(r=>requestAnimationFrame(r))}return o});console.log(tops);
try{await p.click('[data-act="pdnuevo"]',{timeout:3000});console.log('click ok')}catch(e){console.log('fail',e.message.slice(0,300))}
await b.close()})();
