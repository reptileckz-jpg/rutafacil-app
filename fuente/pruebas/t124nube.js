const {chromium}=require('playwright');
/* 124 · con DOS celulares y la nube: el chofer con vehículo asignado se lleva OTRO; al salir recibe su equipo con las llaves del que se lleva,
   y al regresar el celular del administrador le pregunta por esas MISMAS llaves (antes: las del asignado). La asignación no cambia.
   Harness de t122nube / t94nube (nube de prueba con merge, borrar campo e increment, como Firestore). */
(async()=>{const b=await chromium.launch();let nOK=0,nF=0;const ok=(c,m,x)=>{c?nOK++:nF++;console.log((c?'OK   ':'FAIL ')+m+(x!==undefined?' '+JSON.stringify(x).slice(0,300):''))};
const errs=[];
const DB={},VER={};let seq=0;
function merge(dst,src){for(const k of Object.keys(src)){const v=src[k];if(v&&typeof v==='object'&&v.__del){delete dst[k];continue}
 if(v&&typeof v==='object'&&'__inc' in v){dst[k]=(typeof dst[k]==='number'?dst[k]:0)+v.__inc;continue}
 if(v&&typeof v==='object'&&!Array.isArray(v)){if(!dst[k]||typeof dst[k]!=='object')dst[k]={};merge(dst[k],v);continue}dst[k]=v}}
const srvSet=(p,js,m)=>{const o=JSON.parse(js);if(!m||!DB[p])DB[p]={};merge(DB[p],o);VER[p]=++seq;return true};
const srvPull=(pref,visto)=>{visto=JSON.parse(visto);const out=[];for(const p of Object.keys(DB)){if(!p.startsWith(pref+'/'))continue;if(visto[p]===VER[p])continue;out.push({p,id:p.slice(pref.length+1),data:JSON.parse(JSON.stringify(DB[p])),v:VER[p]})}return JSON.stringify(out)};
const cel=async(rol)=>{const p=await b.newPage({viewport:{width:400,height:860}});p.on('pageerror',e=>errs.push(rol+': '+e.message));p.on('dialog',d=>d.accept());
 await p.exposeFunction('__srvSet',srvSet);await p.exposeFunction('__srvPull',srvPull);
 await p.addInitScript(()=>{window.__pnTest=1;if(window.__hora93==null)window.__hora93=12;window.__nbFast=1;window.__visto={};
  window.__fakeAd={set:(p,o,m)=>window.__srvSet(p,JSON.stringify(o),!!m),del:()=>({__del:1}),inc:n=>({__inc:n}),watch:()=>()=>{},get:()=>Promise.resolve(null),borrar:()=>Promise.resolve(),rango:()=>Promise.resolve([])};
  window.__pull=async(primera)=>{const L=JSON.parse(await window.__srvPull(nbP('d'),JSON.stringify(__visto)));L.forEach(x=>__visto[x.p]=x.v);if(L.length){nbAplica(L.map(x=>({id:x.id,data:x.data})),!!primera);render()}return L.length}});
 await p.goto('file:///mnt/user-data/outputs/prototipo-platanos.html');await p.waitForTimeout(700);
 await p.evaluate(rol=>{NB.on=true;NB.listo=true;NB.ad=__fakeAd;NB.perfil={rol:rol==='admin'?'admin':'chofer'};S.role=rol==='admin'?'admin':'rep';S.encOn=false;S.pinOk[pinKey()]=true;S.popVisto={admin:iso(TODAY)};localStorage.removeItem('salIni');render()},rol);return p};
/* el administrador da de alta una camioneta libre (sin asignar) */
const A=await cel('admin');await A.evaluate(()=>{S.veh.push({id:9,n:'Camioneta Prueba',pl:'ZZZ9',plEdo:'Veracruz',comb:'Gasolina Magna',img:0,odo:5000});nbEmpuja()});await A.waitForTimeout(300);
const B=await cel('rep');await B.evaluate(()=>{NB.perfil={rol:'chofer',chId:1}});await B.evaluate(()=>__pull(true));await B.waitForTimeout(200);
let r=await B.evaluate(()=>({asig:S.vehAsig[1],eq:eqDe(1).map(x=>x.n),hay:!!vehById(9)}));
ok(r.asig===1&&r.hay&&r.eq.indexOf('Llaves de Nissan NP300 2023')>-1,'Danu tiene asignada la NP300 2023 y en su equipo están sus llaves',r);
/* el chofer empieza su día y se lleva la Camioneta Prueba */
await B.evaluate(()=>{S.chofHoy=1;S.role='rep';S.pinOk[pinKey()]=true;S.tutVisto={rep:true};S.salida.ok=false;S.rutaDia80=iso(TODAY);S.dia80=1;S.tab.rep='ruta';render()});
for(let k=0;k<2;k++){await B.evaluate(()=>{var x=[].slice.call(document.querySelectorAll('main button')).filter(b=>/Iniciar ruta/.test(b.textContent))[0];if(x)x.click()});await B.waitForTimeout(250)}
ok(await B.evaluate(()=>!S.eqov&&salPaso124()===0),'al tocar "Iniciar ruta" todavía no le pregunta el equipo');
await B.evaluate(()=>document.querySelector('[data-act="veh124otro"]').click());await B.waitForTimeout(120);
await B.evaluate(()=>{[].slice.call(document.querySelectorAll('[data-act="vehpick"]')).filter(x=>/Camioneta Prueba/.test(x.textContent))[0].click()});await B.waitForTimeout(120);
await B.evaluate(()=>{[].slice.call(document.querySelectorAll('[data-act="sal124p"]')).filter(b=>b.textContent==='Siguiente')[0].click()});await B.waitForTimeout(200);
r=await B.evaluate(()=>({veh:vehHoy().n,ov:!!S.eqov,t:(document.getElementById('eqov')||{}).innerText||''}));
ok(r.veh==='Camioneta Prueba'&&r.ov&&/Llaves de Camioneta Prueba/.test(r.t)&&!/Llaves de Nissan NP300 2023/.test(r.t),'al salir: el equipo pide las llaves de la Camioneta Prueba (la que se lleva)',r);
await B.evaluate(()=>{[].slice.call(document.querySelectorAll('#eqov [data-act="eqest"][data-v="bien"]')).forEach(x=>x.click())});await B.waitForTimeout(100);
await B.evaluate(()=>{[].slice.call(document.querySelectorAll('#eqov [data-act="eqest"][data-v="bien"]')).forEach(x=>{if(x.getAttribute('aria-pressed')!=='true')x.click()})});await B.waitForTimeout(100);
await B.evaluate(()=>document.querySelector('[data-act="eqok"]').click());await B.waitForTimeout(400);
r=await B.evaluate(()=>({ov:!!S.eqov,paso:salPaso124(),est:Object.keys(((eqRegDe(1).salida)||{}).est||{})}));
ok(!r.ov&&r.paso===1&&r.est.indexOf('v9')>-1&&r.est.indexOf('v1')<0,'queda registrado que recibió las llaves de la Camioneta Prueba',r);
await B.evaluate(()=>{var x=S.inspR;inspLista(x.tipo).forEach((y,i)=>x.r[i]='b');render();document.querySelector('[data-act="insprep"]').click()});await B.waitForTimeout(150);
await B.evaluate(()=>{S.salida.odoOk=true;S.salida.tankOk=true;FOTOS.forEach(f=>S.salida.fotos[f[0]]='data:x');S.salida.R=5;salPon124(6);render();document.querySelector('[data-act="iniciar"]').click()});await B.waitForTimeout(400);
r=await B.evaluate(()=>({ok:S.salida.ok,veh:vehHoy().n,asig:S.vehAsig[1],av:S.avPrecio.slice(-1)[0]}));
ok(r.ok&&r.veh==='Camioneta Prueba'&&r.asig===1&&/salió en Camioneta Prueba en lugar de Nissan NP300 2023/.test(r.av),'sale en la Camioneta Prueba; la asignación no cambia; aviso al administrador',r);
/* entrega y manda su cierre */
await B.evaluate(()=>{S.log=[{c:S.cli[0].id,R:2,M:0,total:550,pago:550,abono:0,pr:275,pm:20,h:'10:00'}];S.cierre.gxConf=true;S.cierre.tankOk=true;S.salida.fotosFin=S.salida.fotosFin||{};FOTOS.concat([['odo','o']]).forEach(x=>{S.salida.fotosFin[x[0]]='x'});S.cierre.ev79={ok:true,h:'18:00'};S.cierre.fotoReg='x';S.cierre.odo=String(num(S.cierre.odoIni)+40);
 var b=document.createElement('button');b.dataset.act='enviar';b.dataset.ok='1';document.body.appendChild(b);b.click();b.remove();render();nbEmpuja()});
await B.waitForTimeout(400);ok(await B.evaluate(()=>!!S.cierre.sent),'el chofer mandó su cierre');
/* el celular del administrador: solo sabe lo que trae la nube */
await A.evaluate(()=>__pull());await A.waitForTimeout(300);
r=await A.evaluate(()=>({otro:S.vehOtro124||null,eq:eqDe(1).map(x=>x.n),asig:S.vehAsig[1]}));
ok(!r.otro&&r.asig===1&&r.eq.indexOf('Llaves de Camioneta Prueba')>-1&&r.eq.indexOf('Llaves de Nissan NP300 2023')<0,'en el celular del admin, el equipo de Danu hoy trae las llaves de la Camioneta Prueba',r);
await A.evaluate(()=>{S.role='admin';S.chofHoy=1;S.tab.admin='cierreadm';render();var x=document.querySelector('[data-act="rcabre"]')||document.querySelector('[data-act="vercierre"]');if(x)x.click()});await A.waitForTimeout(150);
await A.evaluate(()=>{var b=document.querySelector('[data-act="rctodo"]');if(b)b.click()});await A.waitForTimeout(150);
r=await A.evaluate(()=>({p:S.rcv&&S.rcv.p,t:(document.getElementById('rcov')||{}).innerText||''}));
ok(r.p===2&&/¿Cómo entregó su equipo\?/.test(r.t)&&/Llaves de Camioneta Prueba/.test(r.t)&&!/Llaves de Nissan NP300 2023/.test(r.t),'al recibir el cierre: "¿Cómo entregó su equipo?" pregunta por las llaves de la Camioneta Prueba',r);
await A.evaluate(()=>{document.querySelectorAll('#rcov [data-act="eqest"][data-v="bien"]').forEach(b=>b.click());var b=document.querySelector('[data-act="rceqok"]');if(b)b.click()});await A.waitForTimeout(150);
await A.evaluate(()=>{var b=document.querySelector('[data-act="rcfin"]');if(b)b.click();var s=document.querySelector('[data-act="rcfinsi"]');if(s)s.click()});await A.waitForTimeout(300);
r=await A.evaluate(()=>({reg:Object.keys(((eqRegDe(1).regreso)||{}).est||{}),rec:!!S.cierreReg}));
ok(r.rec&&r.reg.indexOf('v9')>-1&&r.reg.indexOf('v1')<0,'queda registrado que entregó las llaves de la Camioneta Prueba y el cierre recibido',r);
/* otro día sin cambio: vuelve a ser el asignado */
r=await A.evaluate(()=>{var d=S.eqDia;S.eqDia={};var L=null;var sv=S.chofHoy;S.chofHoy=3;try{L=eqDe(1).map(x=>x.n)}finally{S.chofHoy=sv;S.eqDia=d}return L});
ok(r&&r.indexOf('Llaves de Nissan NP300 2023')>-1,'sin registro de hoy (otro día), el equipo vuelve a ser con las llaves del asignado',r);
ok(!errs.length,'sin errores',errs);console.log(nOK+' OK · '+nF+' FAIL');await b.close()})();
