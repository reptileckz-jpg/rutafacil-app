/* 28 · versión web: cada mapa con "⤢ Ver en grande" (pantalla completa) y en computadora "este celular" dice "esta computadora" */
const {chromium}=require('playwright');let nOK=0,nF=0;const ok=(c,m,x)=>{c?nOK++:nF++;console.log((c?'OK   ':'FAIL ')+m+(x!==undefined?' '+JSON.stringify(x).slice(0,300):''))};
(async()=>{const b=await chromium.launch();const errs=[];
const p=await (await b.newContext({viewport:{width:1280,height:900}})).newPage();p.on('pageerror',e=>errs.push(String(e)));await p.addInitScript(()=>{window.__pnTest=1});
await p.goto('file:///mnt/user-data/outputs/prototipo-platanos.html');await p.waitForTimeout(1100);const ev=(f,a)=>p.evaluate(f,a);let r;
r=await ev(()=>{S.role='admin';S.encOn=false;S.popVisto={admin:iso(TODAY)};S.tutVisto={admin:true,rep:true};S.pinOk[pinKey()]=true;S.tab.admin='inicio';render();
 var h=mapaVivoHTML('prueba28',{pts:[]},260);var d=document.createElement('div');d.className='card';d.id='c28';d.innerHTML=h;document.querySelector('main').appendChild(d);web28Mapas();
 var el=document.querySelector('[data-vivo="prueba28"]');return {alto:el.offsetHeight,boton:!!document.querySelector('#c28 [data-act="mapa28"]')}});
ok(r.alto>=480&&r.boton,'en computadora el mapa sale más alto y trae "⤢ Ver en grande"',r);
r=await ev(()=>{document.querySelector('#c28 [data-act="mapa28"]').click();var el=document.querySelector('[data-vivo="prueba28"]');var rc=el.getBoundingClientRect();return {g:el.classList.contains('mapa28g'),w:Math.round(rc.width),h:Math.round(rc.height),x:!!document.getElementById('mapa28x')}});
ok(r.g&&r.w===1280&&r.h===900&&r.x,'"Ver en grande" lo pone a pantalla completa con "✕ Cerrar mapa"',r);
r=await ev(()=>{document.getElementById('mapa28x').click();var el=document.querySelector('[data-vivo="prueba28"]');return {g:el.classList.contains('mapa28g'),x:!!document.getElementById('mapa28x')}});
ok(!r.g&&!r.x,'"✕ Cerrar mapa" lo regresa',r);
r=await ev(()=>{var d=document.createElement('div');d.id='t28';d.textContent='Se guarda en este celular. Este celular';document.querySelector('main').appendChild(d);web28Textos();return d.textContent});
ok(r==='Se guarda en esta computadora. Esta computadora','en la web con mouse dice "esta computadora" en lugar de "este celular"',r);
ok(!errs.length,'sin errores',errs);console.log(nOK+' OK · '+nF+' FAIL');await b.close()})();
