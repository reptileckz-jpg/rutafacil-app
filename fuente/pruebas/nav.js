const {chromium,devices}=require('playwright');
(async()=>{const b=await chromium.launch();const c=await b.newContext({...devices['iPhone 13']});const p=await c.newPage();
await p.goto('file:///mnt/user-data/outputs/prototipo-platanos.html');await p.waitForTimeout(600);
for(const d of '1234')await p.tap('#pinov [data-act="pind"][data-v="'+d+'"]');await p.waitForTimeout(400);
if(await p.$('[data-act="cajaayerskip"]'))await p.tap('[data-act="cajaayerskip"]');await p.waitForTimeout(400);
const st=async(l)=>console.log(l,await p.evaluate(()=>JSON.stringify({tab:S.tab.admin,y:Math.round(scrollY),modal:S.modal&&S.modal.t,pop:!!document.querySelector('[aria-label="Aviso urgente"]'),dlg:[...document.querySelectorAll('[role=dialog]')].map(x=>(x.getAttribute('aria-label')||x.innerText.slice(0,40)).replace(/\n/g,' ')),tdot:!!document.querySelector('nav.tabs .tdot')})));
await st('inicio');await p.screenshot({path:'v50/n0.png'});
// cerrar lo que haya
await p.evaluate(()=>{S.tab.admin='bodega';render()});await p.waitForTimeout(300);await st('bodega');
await p.tap('nav.tabs [data-act="tab"][data-t="inicio"]');await p.waitForTimeout(600);await st('tap1');await p.screenshot({path:'v50/n1.png'});
await p.tap('nav.tabs [data-act="tab"][data-t="inicio"]').catch(e=>console.log('tap2 err',e.message.slice(0,80)));await p.waitForTimeout(600);await st('tap2');await p.screenshot({path:'v50/n2.png'});
await b.close()})();
