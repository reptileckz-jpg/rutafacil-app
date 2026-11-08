const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:390,height:844}});
await p.goto('file:///mnt/user-data/outputs/platanos-primera-vez.html');await p.waitForTimeout(700);
console.log(await p.evaluate(()=>{var bv=document.getElementById('bienv');if(bv)bv.remove();suAplicar();_pin.modo=null;S.role='rep';S.chofHoy=S.choferes.filter(c=>!esAdm(c))[0].id;S.pinOk[pinKey()]=true;S.bienv=S.bienv||{};S.bienv[S.chofHoy]=1;S.salida.ok=false;S.tab.rep='ruta';render();return [...document.querySelector('main').children].map(x=>x.tagName+'.'+x.className+' :: '+(x.textContent||'').replace(/\s+/g,' ').slice(0,160)).join('\n')}));
console.log('PINOV-ish',await p.evaluate(()=>{S.pins[pinKey()]='4821';S.pinOk={};pinEntrar();render();var o=document.getElementById('pinov');return o?o.innerText+' | '+[...o.querySelectorAll('[data-act]')].map(x=>x.dataset.act+':'+x.textContent.trim()).join(','):'none'}));
await b.close()})();
