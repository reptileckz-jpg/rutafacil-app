const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:390,height:844}});
await p.goto('file:///mnt/user-data/outputs/platanos-primera-vez.html');await p.waitForTimeout(700);
const t=await p.evaluate(()=>{var bv=document.getElementById('bienv');if(bv)bv.remove();suAplicar();_pin.modo=null;S.role='rep';S.chofHoy=S.choferes.filter(c=>!esAdm(c))[0].id;S.pinOk[pinKey()]=true;S.bienv=S.bienv||{};S.bienv[S.chofHoy]=1;S.salida.ok=true;S.tab.rep='cierre';render();return document.querySelector('main').innerText});
console.log(t.slice(0,2500));
console.log('ACTS',await p.evaluate(()=>[...document.querySelectorAll('main [data-act]')].filter(x=>x.getClientRects().length).map(x=>x.dataset.act+'|'+x.textContent.trim().slice(0,20)).join(' ; ')));
await b.close()})();
