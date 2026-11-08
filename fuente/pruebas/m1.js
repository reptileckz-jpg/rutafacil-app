const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:390,height:800}});await p.addInitScript(()=>{window.__pnTest=1});p.on('pageerror',e=>console.log('ERR',e.message));
await p.goto('file:///mnt/user-data/outputs/prototipo-platanos.html');await p.waitForTimeout(500);
console.log(await p.evaluate(()=>{S.popVisto={admin:iso(TODAY),cont:iso(TODAY)};S.precio.conf=iso(TODAY);S.role='admin';S.tab.admin='personal';S.openCh=3;render();var f=document.querySelector('#fiov'),m=document.querySelector('main'),h=document.querySelector('header.top');f.scrollTop=150;render();var f2=document.querySelector('#fiov');
 var t0=performance.now();for(var i=0;i<20;i++)render();var dt=(performance.now()-t0)/20;
 return JSON.stringify({mismaFicha:f===f2,mismoMain:m===document.querySelector('main'),mismoHeader:h===document.querySelector('header.top'),scroll:f2.scrollTop,roots:document.querySelectorAll('#root').length,msPorRender:Math.round(dt)})}));
await b.close()})();
