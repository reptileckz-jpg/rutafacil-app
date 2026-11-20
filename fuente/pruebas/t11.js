/* 11 (nueva numeración) · sin rebote al deslizar rápido: mientras el usuario desliza (dedo moviéndose, rueda o inercia), los redibujos NO regresan
   la pantalla (morph y l86 hacían scrollTo(0, y) y 82 scrollBy). Un toque normal NO cuenta como deslizar (el acomodo de 82 sigue). */
const {chromium}=require('playwright');let nOK=0,nF=0;const ok=(c,m,x)=>{c?nOK++:nF++;console.log((c?'OK   ':'FAIL ')+m+(x!==undefined?' '+JSON.stringify(x).slice(0,300):''))};
(async()=>{const b=await chromium.launch();const errs=[];
const p=await (await b.newContext({viewport:{width:412,height:700},hasTouch:true})).newPage();p.on('pageerror',e=>errs.push(e.message));
await p.addInitScript(()=>{window.__pnTest=1;window.__hora93=9});await p.goto('file:///mnt/user-data/outputs/prototipo-platanos.html');await p.waitForTimeout(1200);const ev=(f,a)=>p.evaluate(f,a);let r;
await ev(()=>{var bv=document.getElementById('bienv');if(bv)bv.remove();S.role='admin';S.tutVisto={rep:true,admin:true};S.tab.admin='clientes';render()});
await p.waitForTimeout(400);
/* un redibujo que intenta regresar la pantalla (como el morph o l86 cuando la posición leída va atrasada) */
const prueba=(antes)=>ev(async(antes)=>{window.scrollTo(0,0);await new Promise(r=>setTimeout(r,800));
 var alto=document.documentElement.scrollHeight;window.scrollTo(0,Math.min(1500,alto-800));await new Promise(r=>setTimeout(r,50));
 var y1=window.scrollY;
 if(antes==='desliza'){window.dispatchEvent(new TouchEvent('touchstart',{bubbles:true}));window.dispatchEvent(new TouchEvent('touchmove',{bubbles:true}));window.dispatchEvent(new TouchEvent('touchend',{bubbles:true}))}
 if(antes==='toque'){window.dispatchEvent(new TouchEvent('touchstart',{bubbles:true}));window.dispatchEvent(new TouchEvent('touchend',{bubbles:true}))}
 if(antes==='rueda'){window.dispatchEvent(new WheelEvent('wheel',{bubbles:true,deltaY:300}))}
 /* el redibujo "regresa" a una posición vieja */
 var r0=_rd11;_rd11=function(){var x=r0.apply(this,arguments);window.scrollTo(0,200);return x};try{render()}finally{_rd11=r0}
 var y2=window.scrollY;var sb=window.scrollY;window.scrollBy(0,-100);var y3=window.scrollY;
 return {y1,y2,quedo:y2===y1,scrollBy:y3!==sb}},antes);
r=await prueba('desliza');ok(r.quedo&&!r.scrollBy,'deslizando con el dedo: el redibujo NO regresa la pantalla (ni scrollBy)',r);
r=await prueba('rueda');ok(r.quedo,'con la rueda: tampoco',r);
r=await ev(()=>new Promise(r=>setTimeout(r,900)));
r=await prueba('toque');ok(!r.quedo&&r.y2===200&&r.scrollBy,'un toque normal no cuenta como deslizar: la app sí acomoda la pantalla (como antes)',r);
r=await ev(()=>new Promise(r=>setTimeout(r,900)));
r=await prueba('nada');ok(!r.quedo&&r.y2===200,'sin deslizar: igual que antes',r);
/* ir arriba al cambiar de sección sigue funcionando aunque se haya deslizado */
r=await ev(async()=>{window.scrollTo(0,800);window.dispatchEvent(new TouchEvent('touchmove',{bubbles:true}));S.tab.admin='inicio';render();window.scrollTo(0,0);return window.scrollY});ok(r===0,'cambiar de sección y "ir arriba" sigue funcionando',r);
/* la inercia: hasta 0.7 s después del último movimiento */
r=await ev(async()=>{S.tab.admin='clientes';render();await new Promise(r=>setTimeout(r,800));window.dispatchEvent(new TouchEvent('touchmove',{bubbles:true}));var a=scr11Deslizando();await new Promise(r=>setTimeout(r,900));return [a,scr11Deslizando()]});
ok(r[0]===true&&r[1]===false,'deja de contar como deslizando 0.7 s después del último movimiento',r);
ok(!errs.length,'sin errores',errs);console.log(nOK+' OK · '+nF+' FAIL');await b.close()})();
