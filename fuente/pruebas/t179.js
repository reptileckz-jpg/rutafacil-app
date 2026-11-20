/* 179 · Entrega a un cliente que debe taras y dinero: paga solo lo de hoy, regresa sus taras, y en el recordatorio "Cobrar ahora" lleva al
   paso de COBRO con el campo del abono a la vista (antes se quedaba en "Cajas vacías y taras"). */
const {chromium}=require('playwright');let nOK=0,nF=0;const ok=(c,m,x)=>{c?nOK++:nF++;console.log((c?'OK   ':'FAIL ')+m+(x!==undefined?' '+JSON.stringify(x).slice(0,400):''))};
(async()=>{const b=await chromium.launch();const errs=[];
const p=await (await b.newContext({viewport:{width:390,height:844}})).newPage();p.on('pageerror',e=>errs.push(e.message));p.on('dialog',d=>d.accept());
await p.addInitScript(()=>{window.__pnTest=1;window.__hora93=12});await p.goto('file:///mnt/user-data/outputs/prototipo-platanos.html');await p.waitForTimeout(900);const ev=(f,a)=>p.evaluate(f,a);let r;
r=await ev(()=>{S.tutVisto={rep:true,admin:true};S.role='rep';S.pinOk[pinKey()]=true;S.salida.ok=true;S.tab.rep='ruta';render();S.tab.rep='entrega';render();
 var c=curCli();c.cred=1500;c.vac=6;c.rapida=false;c.nuevo=false;S.d.R=4;S.d.M=0;S.d.mode='todo';S.d.abono='';S.d.V=10;entPon125(2);render();
 var paso0=entPaso125();
 /* terminar la entrega: sale el recordatorio de lo que debía */
 var bt=document.querySelector('[data-act="entconf"]');if(bt)bt.click();
 return {paso0,rec:!!document.querySelector('[data-act="deb109cob"]'),deb:S.deb109}});
ok(r.paso0===2&&r.rec,'al terminar, sale el recordatorio de cobrarle lo que debía',r);
r=await ev(async()=>{document.querySelector('[data-act="deb109cob"]').click();await new Promise(x=>setTimeout(x,700));
 var ab=[...document.querySelectorAll('[data-act="abono115"]')].filter(x=>!x.closest('.wz-hide'))[0],vis=ab&&ab.getBoundingClientRect().height>0;
 var t=(document.querySelector('[data-x="ent125hd"]')||{}).textContent||'';
 return {paso:entPaso125(),encabezado:t.trim().slice(0,40),abonoVisible:!!vis,enfocado:document.activeElement===ab,enPantalla:ab?ab.getBoundingClientRect().top>0&&ab.getBoundingClientRect().top<innerHeight:false}});
ok(r.paso===1&&/Cobro/.test(r.encabezado)&&r.abonoVisible,'"Cobrar ahora" lleva al paso de Cobro (no a las taras)',r);
ok(r.enPantalla,'y el campo del abono queda a la vista',r);
ok(!errs.length,'sin errores',errs);console.log(nOK+' OK · '+nF+' FAIL');await b.close()})();
