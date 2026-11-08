const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:390,height:844}});
await p.goto('file:///mnt/user-data/outputs/platanos-primera-vez.html');await p.waitForTimeout(700);
for(const ok of [false,true]){console.log(await p.evaluate(ok=>{var bv=document.getElementById('bienv');if(bv)bv.remove();suAplicar();_pin.modo=null;S.role='rep';S.chofHoy=S.choferes.filter(c=>!esAdm(c))[0].id;S.salida.ok=ok;S.tab.rep='ruta';S.bienv=S.bienv||{};S.bienv[S.chofHoy]=1;render();return {cls:document.documentElement.className,nav:!!document.querySelector('nav.tabs')&&getComputedStyle(document.querySelector('nav.tabs')).display,acts:[...document.querySelectorAll('main [data-act]')].filter(x=>x.getClientRects().length).map(x=>x.dataset.act+(x.dataset.t?':'+x.dataset.t:'')+'|'+(x.textContent||'').trim().slice(0,25)).slice(0,30)}},ok))}
await b.close()})();
