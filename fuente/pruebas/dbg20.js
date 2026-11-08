const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:390,height:844}});
await p.goto('file:///mnt/user-data/outputs/platanos-primera-vez.html');await p.waitForTimeout(700);
console.log(await p.evaluate(()=>{var bv=document.getElementById('bienv');if(bv)bv.remove();suAplicar();_pin.modo=null;S.tutVisto={rep:1,admin:1};S.role='rep';S.chofHoy=S.choferes.filter(c=>!esAdm(c))[0].id;S.pinOk[pinKey()]=true;S.bienv=S.bienv||{};S.bienv[S.chofHoy]=1;S.salida.ok=false;S.tab.rep='ruta';render();var c=[...document.querySelectorAll('main .card')].find(x=>/Iniciar el día/.test(x.textContent));return c.innerText.replace(/\n+/g,' | ').slice(0,2500)+'\nACTS '+[...c.querySelectorAll('[data-act],[data-bind]')].map(x=>(x.dataset.act||'bind:'+x.dataset.bind)).filter((v,i,a)=>a.indexOf(v)===i).join(',')}));
await b.close()})();
