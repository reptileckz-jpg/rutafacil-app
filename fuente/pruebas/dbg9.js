const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage();await p.addInitScript(()=>{window.__pnTest=1});p.on('pageerror',e=>console.log('ERR',e.message));
await p.goto('file:///mnt/user-data/outputs/platanos-primera-vez.html');await p.waitForTimeout(800);
console.log(await p.evaluate(()=>{S.setup.fin=true;var c=nuevoEmp({n:'Danu',puesto:'chofer'});S.choferes.push(c);S.pins['c:'+c.id]='2580';S.role='admin';S.tab.admin='personal';S.openCh=c.id;render();var t=document.querySelector('#fiov [data-act="fitab"][data-v="dat"]');if(t)t.click();var h=document.getElementById('fiov');return JSON.stringify({REAL:REAL,tabs:[...document.querySelectorAll('#fiov [data-act="fitab"]')].map(x=>x.dataset.v),pin:h&&h.innerHTML.indexOf('PIN para entrar'),row:pinRow('c:'+c.id).slice(-200),pk:pinKey()})}));
await b.close()})();
