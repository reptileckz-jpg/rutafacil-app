/* 7.9 · la pantalla de rescate responde aunque algo bloquee los toques, y trae diagnóstico */
const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();let nOK=0,nF=0;const ok=(c,m,x)=>{c?nOK++:nF++;console.log((c?'OK   ':'FAIL ')+m+(x!==undefined?' '+JSON.stringify(x).slice(0,300):''))};
const ctx=await b.newContext({viewport:{width:400,height:800},permissions:['clipboard-read','clipboard-write']});const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.addInitScript(()=>{window.__pnTest=1});await p.goto('file:///mnt/user-data/outputs/prototipo-platanos.html');await p.waitForTimeout(700);const ev=(f,a)=>p.evaluate(f,a);
/* simula: la nube se quedó "cargando", la pantalla de carga encima y algo que se come todos los toques */
await ev(()=>{NB.on=true;NB.est='cargando';NB._t77=Date.now()-60000;var nb=document.createElement('div');nb.id='nbov';nb.style.cssText='position:fixed;inset:0;z-index:200;background:#eee';nb.textContent='Cargando los datos…';document.body.appendChild(nb);
 window.addEventListener('click',function(e){e.stopImmediatePropagation();e.preventDefault()},true);console.error('nube escuchar n/pn/d','permission-denied Missing or insufficient permissions.');window.__r=0;var r=render;render=function(){window.__r++;return r.apply(this,arguments)}});
await p.waitForTimeout(1800);
let r=await ev(()=>{var o=document.getElementById('fallo77');return o?o.innerText:''});ok(/La app encontró un problema/.test(r),'si se queda "cargando", sale la pantalla de rescate');
ok(/Diagnóstico/.test(r)&&/Estado: cargando/.test(r)&&/permission-denied/.test(r),'trae el diagnóstico con lo que contestó la nube',r.slice(r.indexOf('Diagn'),r.indexOf('Diagn')+200));
ok(await ev(()=>getComputedStyle(document.getElementById('nbov')).display==='none'),'quita la pantalla de "Cargando" de encima');
r=await ev(()=>{var n=window.__r;render();return window.__r===n+1&&DIAG77.paus});ok(r,'deja de dibujar y de procesar la nube (no se congela)');
await p.click('#f77cp');await p.waitForTimeout(200);ok(/Copiado/.test(await ev(()=>document.getElementById('f77cp').textContent)),'"Copiar el error" responde aunque algo se coma los toques');
ok(await ev(()=>/^https:\/\/wa\.me\/\?text=/.test(document.getElementById('f77wa').getAttribute('href'))),'"Mandar por WhatsApp" es un enlace directo');
ok(errs.length===0,'sin errores',errs);console.log(nOK+' OK · '+nF+' FAIL');await b.close()})();
