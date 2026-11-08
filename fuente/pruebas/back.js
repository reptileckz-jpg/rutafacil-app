const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();let nOK=0,nF=0;const ok=(c,m,x)=>{c?nOK++:nF++;console.log((c?'OK   ':'FAIL ')+m+(x!==undefined?' '+JSON.stringify(x):''))};
const p=await b.newPage({viewport:{width:390,height:844}});await p.addInitScript(()=>{window.__pnTest=1});const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.goto('file:///mnt/user-data/outputs/platanos-primera-vez.html');await p.waitForTimeout(900);
const ev=(f,a)=>p.evaluate(f,a),W=ms=>p.waitForTimeout(ms);
const atras=async()=>{await ev(()=>history.back());await W(350)};
await ev(()=>{var bv=document.getElementById('bienv');if(bv)bv.remove();S.setup.fin=true;S.setup.bienv=true;S.role='admin';S.tab.admin='inicio';render()});await W(400);
for(const t of ['bodega','clientes'])await ev(t=>document.querySelector('nav.tabs [data-t="'+t+'"]').click(),t),await W(250);
await atras();ok(await ev(()=>S.tab.admin)==='bodega','atrás: regresa a la pantalla anterior');
await atras();ok(await ev(()=>S.tab.admin)==='inicio','atrás otra vez: Inicio');
await ev(()=>{S.menu=true;render()});await W(200);await atras();ok(await ev(()=>!document.querySelector('.drawer')),'atrás cierra el menú');
await ev(()=>{S.aj=true;render()});await W(200);await atras();ok(await ev(()=>!S.aj&&!document.getElementById('ajov')),'atrás cierra Ajustes');
await ev(()=>{S.tab.admin='personal';render();document.querySelector('[data-act="npopen"]').click()});await W(250);await atras();let r=await ev(()=>({np:!!S.np,tab:S.tab.admin}));ok(!r.np&&r.tab==='personal','atrás cierra "Agregar a alguien" y te deja en Personal',r);
await atras();ok(await ev(()=>S.tab.admin)==='inicio','sin pantalla anterior: va a Inicio');
await atras();r=await ev(()=>({t:S.toast,tab:S.tab.admin}));ok(/para salir/.test(r.t)&&r.tab==='inicio','en Inicio: la primera vez avisa',r);
// chofer
await ev(()=>{S.role='rep';S.tab.rep='ruta';render()});await W(300);await ev(()=>{document.body.dispatchEvent(new PointerEvent('pointerdown',{bubbles:true}))});await W(100);
await ev(()=>{S.tab.rep='cierre';render()});await W(200);await atras();ok(await ev(()=>S.tab.rep)==='ruta','chofer: atrás regresa a su Ruta');
ok(!errs.length,'sin errores',errs);console.log(nOK+' OK · '+nF+' FAIL');await b.close()})();
