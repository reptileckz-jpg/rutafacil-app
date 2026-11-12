/* 7.7 · l77: la app nunca se queda atorada ni en blanco (31) */
const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();let nOK=0,nF=0;const ok=(c,m,x)=>{c?nOK++:nF++;console.log((c?'OK   ':'FAIL ')+m+(x!==undefined?' '+JSON.stringify(x).slice(0,300):''))};
const p=await b.newPage({viewport:{width:400,height:860}});const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.addInitScript(()=>{window.__pnTest=1});await p.goto('file:///mnt/user-data/outputs/prototipo-platanos.html');await p.waitForTimeout(700);const ev=(f,a)=>p.evaluate(f,a);let r;
await ev(()=>{S.role='admin';S.pinOk[pinKey()]=true;S.tab.admin='inicio';render()});
// 1 · una pantalla que se rompe: regresa a Inicio y sigue
r=await ev(()=>{var v=VIEWS.cargas;VIEWS.cargas=function(){throw new Error('prueba: carga rota')};S.tab.admin='cargas';S.openCarga=S.cargas[0].id;render();var t=document.body.innerText;VIEWS.cargas=v;return [S.tab.admin,S.openCarga,/Hoy te toca|Precio de hoy/.test(t),!!document.getElementById('fallo77'),FALLO77.n,(localStorage.getItem('pnFallo')||'').indexOf('carga rota')>-1]});
ok(r[0]==='inicio'&&r[1]==null&&r[2]&&!r[3],'si una pantalla se rompe, cierra lo abierto y regresa a Inicio (sin pantalla blanca)',r);ok(r[4]===1&&r[5],'el error queda anotado',r);
ok(await ev(()=>(S.probs||[]).some(p=>p.auto&&/carga rota/.test(p.k||''))),'y sale en Problemas reportados');
// 2 · si se rompe siempre: pantalla de rescate
r=await ev(()=>{var v=VIEWS.inicio;VIEWS.inicio=function(){throw new Error('prueba: inicio roto')};S.tab.admin='inicio';render();VIEWS.inicio=v;var o=document.getElementById('fallo77');return [!!o,o&&o.innerText]});
ok(r[0]&&/Reintentar/.test(r[1])&&/Mandar el error/.test(r[1])&&/Volver a bajar los datos de la nube/.test(r[1]),'si sigue fallando: "La app encontró un problema" con Reintentar, Mandar el error y Bajar de la nube',r[1]&&r[1].slice(0,80));
ok(/inicio roto/.test(await ev(()=>document.querySelector('#fallo77 pre').textContent)),'enseña el error para mandarlo');
await ev(()=>{document.getElementById('fallo77').remove();DIAG77.paus=false;render()});
// 3 · la carga de la nube se rompe: deja entrar y pide el PIN
r=await ev(()=>{var f=nbForzarRol,pe=pinEntrar,pin=0;nbForzarRol=function(){throw new Error('prueba: nube rota')};pinEntrar=function(){pin++};window.NB.perfil={rol:'admin',activo:true};NB.vaciaNube=false;
 try{nbPrimera([{id:'s~cfg',data:{v:JSON.stringify(S.cfg)}}])}catch(e){return ['escapó',e.message]}var res=[NB.est,NB.listo,pin];nbForzarRol=f;pinEntrar=pe;return res});
ok(r[0]==='listo'&&r[1]===true&&r[2]===1,'si la carga de la nube se rompe, ya no se queda en "Cargando…": deja entrar y pide el PIN',r);
// 4 · el viaje que estaba abierto ya terminó en el celular del chofer
r=await ev(()=>{var o=S.vws[0];o.open=true;S.vw=o;S.vwI=0;S.vws=[];S.toast=null;render();return [S.vw,errs=0]});ok(r[0]===null,'la ventana del viaje que ya terminó se cierra sola',r);
await p.waitForTimeout(150);ok(/ya terminó/.test(await ev(()=>String(S.toast&&(S.toast.t||S.toast)||''))),'y avisa "Ese viaje ya terminó"');
ok(errs.length===0,'sin errores sin atrapar',errs);console.log(nOK+' OK · '+nF+' FAIL');await b.close()})();
