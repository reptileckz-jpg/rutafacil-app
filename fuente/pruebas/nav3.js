const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:390,height:800}});await p.addInitScript(()=>{window.__pnTest=1});p.on('pageerror',e=>console.log('ERR',e.message));
await p.goto('file:///mnt/user-data/outputs/prototipo-platanos.html');await p.waitForTimeout(500);
await p.evaluate(()=>{S.popVisto={admin:iso(TODAY),cont:iso(TODAY)};S.precio.conf=iso(TODAY);S.role='admin';S.tab.admin='bodega';render()});await p.waitForTimeout(300);
console.log(await p.evaluate(()=>JSON.stringify({av:avisos(),urg:String(AV_URG),cp:typeof cierrePend=='function'&&!!cierrePend(),vl:typeof vlPend=='function'&&!!vlPend(),navInRoot:!!document.querySelector('#root nav.tabs'),navs:document.querySelectorAll('nav.tabs').length})));
await b.close()})();
