const {chromium,devices}=require('playwright');
(async()=>{const b=await chromium.launch();let n=0,f=0;const ok=(x,m)=>{x?n++:f++;console.log((x?'OK   ':'FAIL ')+m)};
const p=await b.newPage({viewport:{width:390,height:800}});await p.addInitScript(()=>{window.__pnTest=1;window.__pnAnim=1});let errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.goto('file:///mnt/user-data/outputs/prototipo-platanos.html');await p.waitForTimeout(500);
await p.evaluate(()=>{S.popVisto={admin:iso(TODAY),cont:iso(TODAY)};S.precio.conf=iso(TODAY);S.role='admin';S.tab.admin='personal';render()});await p.waitForTimeout(300);
await p.evaluate(()=>{var b=document.createElement('button');b.dataset.act='chopen';b.dataset.id='3';document.body.appendChild(b);S.openCh=3;render()});
let r=await p.evaluate(()=>{var o=document.querySelector('#fiov');return o&&o.classList.contains('ov-in')});ok(r,'la ficha del personal entra suave (deslizándose), ya no aparece de golpe');
await p.waitForTimeout(400);await p.evaluate(()=>render());ok(await p.evaluate(()=>!document.querySelector('#fiov').classList.contains('ov-in')),'al actualizar la misma ficha no se vuelve a animar');
await p.evaluate(()=>{var b=document.querySelector('#fiov [data-act="fitab"][data-v="ref"]');b.click()});ok(await p.evaluate(()=>document.querySelector('#fiov .fibody').classList.contains('scr-in')),'al cambiar de pestaña el contenido entra suave');
await p.evaluate(()=>{S.openCh=null;S.tab.admin='inicio';render()});await p.waitForTimeout(100);await p.evaluate(()=>{S.tab.admin='bodega';render()});
ok(await p.evaluate(()=>document.querySelector('main').classList.contains('scr-in')),'al cambiar de pantalla, entra suave');
r=await p.evaluate(()=>new Promise(res=>{var d=[...document.querySelectorAll('main details:not([open])')][0];if(!d)return res('sin details');d.querySelector('summary').click();setTimeout(()=>res([...d.children].some(c=>c.classList.contains('d-in')||(c.getAnimations&&c.getAnimations().length>0))),80)}));ok(r===true,'los menús que se despliegan se abren suave');
await p.waitForTimeout(700);await p.evaluate(()=>render());await p.waitForTimeout(80);ok(await p.evaluate(()=>!document.querySelector('main .d-in')),'al actualizar no se vuelven a animar los menús abiertos');
// falta: se repite
r=await p.evaluate(()=>new Promise(res=>{S.tab.admin='cargas';cmNuevo();render();var c=0;document.addEventListener('animationstart',function(e){if(e.animationName==='faltaSh')c++},true);
 var bt=document.querySelector('#cmov [data-act="cmsig"],#cmov [data-act="cmnext"],#cmov .btn:not(.sec)');S.cm.fecha='';render();var bb=[...document.querySelectorAll('#cmov button')].filter(x=>/Siguiente/.test(x.textContent))[0];if(!bb)return res('sin siguiente');bb.click();setTimeout(()=>{var bb2=[...document.querySelectorAll('#cmov button')].filter(x=>/Siguiente/.test(x.textContent))[0];bb2.click();setTimeout(()=>{var bb3=[...document.querySelectorAll('#cmov button')].filter(x=>/Siguiente/.test(x.textContent))[0];bb3.click();setTimeout(()=>res(c),500)},700)},700)}));
ok(r>=3,'la animación roja de "falta" se repite cada vez que tocas Siguiente ('+r+' veces)');
// finanzas legible
r=await p.evaluate(()=>new Promise(res=>{var i=new Image();i.onload=()=>{var c=document.createElement('canvas');c.width=i.width;c.height=i.height;var x=c.getContext('2d');x.drawImage(i,0,0);var d=x.getImageData(0,0,c.width,c.height).data,m=0;for(var k=3;k<d.length;k+=4)m=Math.max(m,d[k]);res(m)};i.src=IMG.efe}));ok(r<=90,'Finanzas: los dibujos van tenues para que se lea el texto (alfa máx '+r+')');
await p.evaluate(()=>{S.tab.admin='inicio';render();finVisSet&&finVisSet(true)}).catch(()=>{});
ok(errs.length===0,'sin errores '+errs.join('|'));await p.close();
// bienvenida con el dibujo nuevo
const c=await b.newContext({...devices['iPhone 13']});const q=await c.newPage();await q.goto('file:///mnt/user-data/outputs/platanos-primera-vez.html');await q.waitForTimeout(2600);
r=await q.evaluate(()=>{var s=document.querySelector('#bienv .bv-scene');return s&&[...s.querySelectorAll('img')].every(i=>i.complete&&i.naturalWidth>200)});ok(r,'bienvenida con tu dibujo del camión y las cajas');await q.screenshot({path:'v40/shots/c-bienv.png'});
console.log(n+' OK · '+f+' FAIL');await b.close()})();
