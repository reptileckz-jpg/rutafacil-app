const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();let nOK=0,nF=0;const ok=(c,m,x)=>{c?nOK++:nF++;console.log((c?'OK   ':'FAIL ')+m+(x!==undefined?' '+JSON.stringify(x):''))};
const p=await b.newPage({viewport:{width:390,height:844}});await p.addInitScript(()=>{window.__pnTest=1});const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.goto('file:///mnt/user-data/outputs/prototipo-platanos.html');await p.waitForTimeout(700);await p.evaluate(()=>{S.popVisto={admin:iso(TODAY),cont:iso(TODAY)};S.role='admin';S.aj=true;S.dOpen.ajcredd=true;render()});await p.waitForTimeout(300);
// asistente de inicio: el último campo de la pantalla
await p.evaluate(()=>{var ins=[...document.querySelectorAll('#ajov input')].filter(i=>kbCampo(i)&&i.getClientRects().length&&!i.closest('details:not([open])'));ins[ins.length-1].setAttribute('data-kbt','1')});await p.focus('[data-kbt]');await p.waitForTimeout(900);const r=await p.evaluate(()=>{var el=document.querySelector('[data-kbt]');return {top:el.getBoundingClientRect().top,kb:document.documentElement.classList.contains('kbopen')}});
ok(r.kb&&r.top<844*0.5,'al escribir, el campo sube arriba (el teclado no lo tapa)',r);
await p.evaluate(()=>document.activeElement.blur());await p.waitForTimeout(400);ok(await p.evaluate(()=>!document.documentElement.classList.contains('kbopen')),'al terminar, se quita el espacio extra');
ok(!errs.length,'sin errores',errs);console.log(nOK+' OK · '+nF+' FAIL');await b.close()})();
