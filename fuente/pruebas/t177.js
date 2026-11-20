/* 177 · Cajas vacías: si queda debiendo, la tarjeta es roja y el renglón "Queda debiendo X" tiembla cada vez que cambia (solo transform);
   al corriente, verde y quieta; al abrir la entrega no tiembla. Las cuentas no cambian. */
const {chromium}=require('playwright');let nOK=0,nF=0;const ok=(c,m,x)=>{c?nOK++:nF++;console.log((c?'OK   ':'FAIL ')+m+(x!==undefined?' '+JSON.stringify(x).slice(0,400):''))};
(async()=>{const b=await chromium.launch();const errs=[];
const p=await (await b.newContext({viewport:{width:390,height:844}})).newPage();p.on('pageerror',e=>errs.push(e.message));p.on('dialog',d=>d.accept());
await p.addInitScript(()=>{window.__pnTest=1;window.__hora93=12});await p.goto('file:///mnt/user-data/outputs/prototipo-platanos.html');await p.waitForTimeout(900);const ev=(f,a)=>p.evaluate(f,a);let r;
r=await ev(()=>{S.tutVisto={rep:true,admin:true};S.role='rep';S.pinOk[pinKey()]=true;S.salida.ok=true;S.tab.rep='ruta';render();S.tab.rep='entrega';var c=curCli();c.vac=6;S.d.R=4;S.d.V=8;entPon125(2);render();
 var t=document.querySelector('#vac115 .vacq177');return {debe:document.getElementById('vac115').classList.contains('debe177'),tiembla:t.classList.contains('tiembla177'),txt:t.textContent,
  bg:getComputedStyle(document.getElementById('vac115')).backgroundColor,danger:getComputedStyle(document.documentElement).getPropertyValue('--danger-soft').trim()}});
ok(r.debe&&/Queda debiendo 2 cajas/.test(r.txt),'queda debiendo: tarjeta roja con su número correcto (6 + 4 − 8 = 2)',r);
ok(!r.tiembla,'al abrir la entrega todavía no tiembla',r);
r=await ev(()=>{S.d.V=7;render();var t=document.querySelector('#vac115 .vacq177');return {tiembla:t.classList.contains('tiembla177'),anim:getComputedStyle(t).animationName,txt:t.textContent}});
ok(r.tiembla&&r.anim==='tiembla177'&&/3 cajas/.test(r.txt),'al cambiar las que devuelve, el renglón tiembla y muestra 3',r);
r=await ev(()=>{var css=document.getElementById('css177').sheet,mal=[];[...css.cssRules].forEach(x=>{if(x.type===7)[...x.cssRules].forEach(k=>[...k.style].forEach(pr=>{if(pr!=='transform')mal.push(pr)}))});return mal});
ok(!r.length,'la animación solo usa transform (tarjeta gráfica)',r);
r=await ev(()=>{S.d.V=10;render();var b=document.getElementById('vac115'),t=b.querySelector('.vacq177');return {debe:b.classList.contains('debe177'),txt:t.textContent,tiembla:t.classList.contains('tiembla177')}});
ok(!r.debe&&/Al corriente/.test(r.txt)&&!r.tiembla,'al corriente: verde y quieta',r);
ok(!errs.length,'sin errores',errs);console.log(nOK+' OK · '+nF+' FAIL');await b.close()})();
