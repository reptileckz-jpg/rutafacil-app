const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:400,height:880},deviceScaleFactor:2});await p.addInitScript(()=>{window.__pnTest=1});const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.goto('file:///mnt/user-data/outputs/prototipo-platanos.html');await p.waitForTimeout(600);
await p.evaluate(()=>{S.popVisto={admin:iso(TODAY),cont:iso(TODAY)};S.role='rep';S.tab.rep='ruta';render()});await p.waitForTimeout(800);
console.log(await p.evaluate(()=>{var c=document.querySelector('.vcard.vchof');return c?{plate:!!c.querySelector('svg.plate'),bg:getComputedStyle(c,'::before').backgroundImage.slice(0,20)}:'no card'}),errs);
await p.screenshot({path:'v50/vch.png'});await b.close()})();
