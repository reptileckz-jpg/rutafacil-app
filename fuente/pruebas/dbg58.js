const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:390,height:844}});await p.addInitScript(()=>{window.__pnTest=1});
await p.goto('file:///mnt/user-data/outputs/prototipo-platanos.html');await p.waitForTimeout(700);const ev=f=>p.evaluate(f);
console.log(await ev(()=>{S.role='admin';S.pinOk[pinKey()]=true;_pin={v:'',modo:null};S.popVisto={admin:iso(TODAY)};var n=provNames()[0];S.tab.admin='cargas';S.fiLast='openProv';S.openProv=n;S.pvEdit=n;S.fiTab['prov:'+n]='dat';render();var o=document.getElementById('fiov');var h=o?o.innerHTML:'';return [!!o, document.body.innerText.indexOf('Contactos'), S.openProv, S.pvEdit, document.getElementById('fiov').innerText.slice(0,900), [...document.querySelectorAll('#fiov [data-act]')].map(x=>x.dataset.act+':'+x.textContent.trim().slice(0,20)).join(' | '), !!document.querySelector('#fiov [data-pv]')]}));
await b.close()})();
