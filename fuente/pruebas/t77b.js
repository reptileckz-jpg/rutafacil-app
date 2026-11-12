/* 7.9 · el viaje a medias ya no tumba la app; la pantalla de rescate responde aunque algo bloquee los toques */
const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();let nOK=0,nF=0;const ok=(c,m,x)=>{c?nOK++:nF++;console.log((c?'OK   ':'FAIL ')+m+(x!==undefined?' '+JSON.stringify(x).slice(0,300):''))};
const ctx=await b.newContext({viewport:{width:400,height:800},permissions:['clipboard-read','clipboard-write']});let p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
/* 1 · el error real de Ricardo: un viaje de carga guardado sin su lista (par) */
await p.addInitScript(()=>{window.__pnTest=1});await p.goto('file:///mnt/user-data/outputs/prototipo-platanos.html');await p.waitForTimeout(700);let ev=(f,a)=>p.evaluate(f,a);
let r=await ev(()=>{S.role='admin';S.pinOk[pinKey()]=true;S.tab.admin='inicio';S.vws.push({k:'camino',quien:3,open:false});S.vw=S.vws[S.vws.length-1];FALLO77.n=0;render();return [!!document.getElementById('fallo77'),S.vws.every(v=>Array.isArray(v.par)),/Hoy te toca|Precio de hoy/.test(document.body.innerText),FALLO77.n]});
ok(!r[0]&&r[1]&&r[2],'un viaje a medias ya no tumba Inicio del administrador: se quita y la app sigue',r);
r=await ev(()=>{var d=nbAplica;S.vws.push({k:'fin',quien:3});return vwLimpia77()&&S.vws.every(v=>Array.isArray(v.par))});ok(r,'si llega de la nube un viaje a medias, también se quita');
/* 2 · la pantalla de rescate en su propio cuadro */
await ev(()=>{NB.on=true;NB.est='cargando';NB._t77=Date.now()-60000;window.addEventListener('click',function(e){e.stopImmediatePropagation();e.preventDefault()},true);window.addEventListener('touchmove',function(e){e.preventDefault()},{capture:true,passive:false});console.error('nube escuchar','permission-denied');});
await p.waitForTimeout(1800);
const fr=p.frameLocator('#fallo77');r=await fr.locator('body').innerText();ok(/La app encontró un problema/.test(r)&&/Diagnóstico/.test(r)&&/permission-denied/.test(r),'sale la pantalla de rescate con el diagnóstico',r.slice(0,60));
await fr.locator('#cp').click();await p.waitForTimeout(300);ok(/Copiado/.test(await fr.locator('#cp').innerText()),'"Copiar el error" responde aunque la app se coma los toques');
r=await ev(()=>navigator.clipboard.readText());ok(/Diagnóstico/.test(r),'el error quedó copiado');
ok(errs.length===0,'sin errores',errs);console.log(nOK+' OK · '+nF+' FAIL');await b.close()})();
