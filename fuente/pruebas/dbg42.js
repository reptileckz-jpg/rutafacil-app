const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:390,height:844}});await p.addInitScript(()=>{window.__pnTest=1});
await p.goto('file:///mnt/user-data/outputs/prototipo-platanos.html');await p.waitForTimeout(700);
console.log(await p.evaluate(()=>{S.role='admin';S.pinOk[pinKey()]=true;_pin={v:'',modo:null};S.popVisto={admin:iso(TODAY)};S.tab.admin='gastos';render();var c=[...document.querySelectorAll('main .chips button')].find(x=>x.textContent.trim()==='Combustible');if(c)c.click();return [...document.querySelector('main').children].map(x=>x.tagName+'.'+x.className+' :: '+x.innerText.slice(0,60).replace(/\n/g,' | ')).join('\n')}));
await b.close()})();
