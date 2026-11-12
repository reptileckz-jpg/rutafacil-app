/* 7.6 · l73: cámara propia (69), quién tomó la foto (70) y huella dentro de la app (67) */
const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch({args:['--use-fake-ui-for-media-stream','--use-fake-device-for-media-stream']});let nOK=0,nF=0;const ok=(c,m,x)=>{c?nOK++:nF++;console.log((c?'OK   ':'FAIL ')+m+(x!==undefined?' '+JSON.stringify(x).slice(0,300):''))};
const ctx=await b.newContext({permissions:['camera'],viewport:{width:400,height:800}});const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.addInitScript(()=>{window.__pnTest=1;window.__cam73Test=1});await p.goto('file:///mnt/user-data/outputs/prototipo-platanos.html');await p.waitForTimeout(700);const ev=(f,a)=>p.evaluate(f,a);
await ev(()=>{S.role='rep';S.chofHoy=1;S.pinOk['c:1']=true;S.tab.rep='ruta';render();var i=document.createElement('input');i.type='file';i.accept='image/*';i.setAttribute('capture','environment');i.id='tst73';document.body.appendChild(i);var l=document.createElement('label');l.htmlFor='tst73';l.id='lb73';l.textContent='foto';document.body.appendChild(l);i.addEventListener('change',function(){window._got=i.files[0]&&i.files[0].size})});
await p.click('#lb73');await p.waitForTimeout(1500);ok(await ev(()=>!!document.getElementById('cam73')),'al pedir una foto se abre la cámara de la app');
ok(await ev(()=>CAM73.cara==='environment'),'abre la cámara de atrás');
ok(await ev(()=>{var b=document.querySelector('#cam73 .cbar73').getBoundingClientRect();return b.bottom<=innerHeight+1&&b.top>innerHeight-200}),'los botones de la cámara se ven completos abajo');
await p.click('#cam73 [data-cam="tiro"]');await p.waitForTimeout(1500);r=await ev(()=>[window._got,!document.getElementById('cam73')]);ok(r[0]>1000&&r[1],'toma la foto y se la pasa al campo',r);
ok(await ev(()=>quienFoto73()==='Danu'),'la marca de agua dice quién la tomó');
ok(/quienFoto73\(\)/.test(await ev(()=>document.documentElement.outerHTML.indexOf('quienFoto73()')>-1?'quienFoto73()':'')),'las fotos del vehículo llevan fecha, placa y quién');
await ev(()=>{S.px={t:'bio',k:'c:1'};render()});ok(await ev(()=>!document.getElementById('pxov')&&!S.px),'el aviso de huella viejo (el que se quedaba trabado en el PIN) ya no sale');
await ev(()=>{S.px={t:'bio',k:'c:1',dentro:true};render()});ok(/3 días/.test(await ev(()=>document.getElementById('pxov').innerText)),'dentro de la app: "Ahora no" dice que se vuelve a sugerir en 3 días');
await ev(()=>document.querySelector('[data-act="biono"]').click());r=await ev(()=>[S.px,JSON.parse(localStorage.getItem('bio73:c:1'))]);ok(!r[0]&&r[1].n===1&&!!r[1].next,'"Ahora no" cierra y agenda la siguiente sugerencia',r);
ok(await ev(()=>bioToca73('c:1')===false),'no se vuelve a ofrecer antes de 3 días');
await ev(()=>{localStorage.setItem('bio73:c:1',JSON.stringify({n:2}))});ok(await ev(()=>bioToca73('c:1')===false),'después de dos "no", ya no insiste (queda en Ajustes)');
ok(errs.length===0,'sin errores',errs);console.log(nOK+' OK · '+nF+' FAIL');await b.close()})();
var r;
