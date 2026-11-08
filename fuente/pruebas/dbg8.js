const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage();await p.addInitScript(()=>{window.__pnTest=1});p.on('pageerror',e=>console.log('ERR',e.message));
await p.goto('file:///mnt/user-data/outputs/prototipo-platanos.html');await p.waitForTimeout(600);
console.log(await p.evaluate(()=>{S.role='admin';S.aj=true;render();var h=ajHTML();return JSON.stringify({len:h.length,cajas:h.indexOf('Cajas que no devuelven'),cred:h.indexOf('ajcred'),start:h.slice(0,80),cbBl:h.indexOf('cbBl'),dom:!!document.querySelector('[data-key="ajcred"]'),domIn:!!document.querySelector('#ajov [data-key="ajcred"]'),crcli:!!document.querySelector('[data-bind="cfg.crCli"]')})}));
await b.close()})();
