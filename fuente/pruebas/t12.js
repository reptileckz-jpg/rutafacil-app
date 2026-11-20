/* 12 (nueva numeración) · tarjetas desplegables: la animación (transparencia + movimiento, GPU) empieza en el MISMO toque (antes de pintar),
   lo nuevo que la app agrega adentro también entra suave, y al salir de la sección (o ficha) las que tocaste vuelven a como estaban. */
const {chromium}=require('playwright');let nOK=0,nF=0;const ok=(c,m,x)=>{c?nOK++:nF++;console.log((c?'OK   ':'FAIL ')+m+(x!==undefined?' '+JSON.stringify(x).slice(0,300):''))};
(async()=>{const b=await chromium.launch();const errs=[];
const p=await (await b.newContext({viewport:{width:412,height:900}})).newPage();p.on('pageerror',e=>errs.push(e.message));
await p.addInitScript(()=>{window.__pnTest=1});await p.goto('file:///mnt/user-data/outputs/prototipo-platanos.html');await p.waitForTimeout(1200);const ev=(f,a)=>p.evaluate(f,a);let r;
await ev(()=>{var bv=document.getElementById('bienv');if(bv)bv.remove();S.role='admin';S.tutVisto={rep:true,admin:true};S.tab.admin='cuadre121';render()});await p.waitForTimeout(500);
r=await ev(async()=>{var d=[...document.querySelectorAll('main details[data-k]')].filter(x=>!x.open)[0];var k=d.dataset.k;var s=d.querySelector('summary');s.dispatchEvent(new PointerEvent('pointerdown',{bubbles:true}));s.click();
 var hijos=[...d.children].filter(x=>x.tagName!=='SUMMARY');var conAnim=hijos.filter(x=>x.getAnimations().length>0).length;
 var fr=[];for(var i=0;i<3;i++){await new Promise(r=>requestAnimationFrame(r));var dd=document.querySelector('main details[data-k="'+k+'"]');var c=[...dd.children].filter(x=>x.tagName!=='SUMMARY')[0];fr.push(Math.round(+getComputedStyle(c).opacity*100))}
 var anims=[...d.children].flatMap(x=>x.getAnimations()).map(a=>JSON.stringify(a.effect.getKeyframes().map(f=>Object.keys(f).filter(z=>!/^(offset|easing|composite|computedOffset)$/.test(z)))));
 return {k,hijos:hijos.length,conAnim,fr,props:[...new Set(anims)]}});
ok(r.hijos>0&&r.conAnim===r.hijos,'al tocar el título, la animación ya empezó en el mismo toque (todos sus hijos)',r);
ok(r.fr[0]<50,'el primer cuadro ya sale transparente (no se ve completo y luego desaparece)',r.fr);
ok(r.props.every(x=>/opacity/.test(x)&&/transform/.test(x)&&!/height|top|left|width/.test(x)),'solo transparencia y movimiento (por la tarjeta gráfica)',r.props);
const k=r.k;
r=await ev(k=>{var v=[...document.querySelectorAll('main details[open]')].map(d=>d.dataset.k);S.tab.admin='inicio';render();S.tab.admin='cuadre121';render();var d=document.querySelector('main details[data-k="'+k+'"]');return {antes:v.indexOf(k)>-1,despues:!!(d&&d.open)}},k);
ok(r.antes&&!r.despues,'al salir de la sección y volver, la que abriste vuelve a estar cerrada',r);
/* la que la app abre sola para llevarte a algo no se toca */
r=await ev(()=>{S.dOpen.cajadia=true;S.tab.admin='inicio';render();return S.dOpen.cajadia===true});ok(r,'la que la app abre sola (p. ej. "Ir ›") no se toca',r);
/* modo ahorro: sin animación */
r=await ev(async()=>{document.documentElement.classList.add('ahorro171');S.tab.admin='cuadre121';render();await new Promise(r=>setTimeout(r,200));var d=[...document.querySelectorAll('main details[data-k]')].filter(x=>!x.open)[0];d.querySelector('summary').click();var n=[...d.children].filter(x=>x.tagName!=='SUMMARY').filter(x=>x.getAnimations().length).length;document.documentElement.classList.remove('ahorro171');return n});
ok(r===0,'con "Modo ahorro" se abre sin animación',r);
ok(!errs.length,'sin errores',errs);console.log(nOK+' OK · '+nF+' FAIL');await b.close()})();
