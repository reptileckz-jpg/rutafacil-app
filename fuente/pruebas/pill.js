const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:390,height:800}});await p.addInitScript(()=>{window.__pnTest=1});
await p.goto('file:///mnt/user-data/outputs/prototipo-platanos.html');await p.waitForTimeout(500);
console.log(await p.evaluate(()=>{S.popVisto={admin:iso(TODAY),cont:iso(TODAY)};S.precio.conf=iso(TODAY);S.role='admin';S.tab.admin='inicio';render();
 var anim=[...document.querySelectorAll('main *')].filter(x=>{var a=getComputedStyle(x).animationName;return a&&a!=='none'&&getComputedStyle(x).animationIterationCount==='infinite'}).map(x=>x.tagName+'.'+x.className+' :: '+getComputedStyle(x).animationName+' :: '+(x.innerText||'').slice(0,30));
 var av=document.querySelector('.avl');return JSON.stringify({anim:anim.slice(0,15),av:av&&av.outerHTML.slice(0,400),navInicio:document.querySelector('nav.tabs [data-t="inicio"]').outerHTML.slice(0,300)})}));
await b.close()})();
