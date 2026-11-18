/* 124 · Iniciar el día por pasos: 1 Vehículo → 2 Inspección → 3 Odómetro → 4 Gasolina → 5 Fotos → 6 Carga → 7 Revisar.
   - El vehículo va ANTES de la inspección (la inspección es de ese vehículo).
   - No avanza sin lo de cada paso; "Iniciar reparto" con algo faltante regresa a ese paso.
   - El inventario queda igual que antes (cajas y kilos que salen de bodega).
   - Vehículo asignado: "¿Hoy usas este?", puede usar otro y al administrador le llega el aviso.
   - La tarjeta "¿Cuánto cargas hoy?": el texto ya no se sale ni se corta (reporte de Ricardo, 18 nov).
   Uso: node t124.js [archivo.html]   (por defecto la versión real) */
const {chromium}=require('playwright');
const URL=process.argv[2]||'/mnt/user-data/outputs/platanos-primera-vez.html';
(async()=>{const b=await chromium.launch();let nOK=0,nF=0;const ok=(c,m,x)=>{c?nOK++:nF++;console.log((c?'OK   ':'FAIL ')+m+(x!==undefined?' '+JSON.stringify(x).slice(0,300):''))};
 const abre=async(asignado)=>{const p=await (await b.newContext({viewport:{width:360,height:780}})).newPage();const errs=[];p.on('pageerror',e=>errs.push(String(e)));p.on('dialog',d=>d.accept());
  await p.addInitScript(()=>{window.__pnTest=1;window.__hora93=9});await p.goto('file://'+URL);await p.waitForTimeout(900);
  await p.evaluate(asignado=>{if(window.PN_MODO==='vacio'){var U=S.setup;U.veh=[{n:'Camioneta Uno',pl:'AAA1',plEdo:'Baja California',comb:'Gasolina',img:0,odo:1000},{n:'Camioneta Dos',pl:'BBB2',plEdo:'Baja California',comb:'Gasolina',img:0,odo:2000}];U.per=[{n:'Chofer Uno',puesto:'chofer',tel:'1'}];
    var L=[];for(var i=0;i<22;i++)L.push({n:'Cliente '+i,a:'x',tel:'66400000'+(10+i),dias:[0,1,2,3,4,5,6],cred:0,vac:0,ch:'0'});U.cli=L;U.prov=[];S.precio.R=275;S.precio.M=20;suAplicar()}
   S.inv.maduras=50;S.inv.kgMaduro=100;var ch=S.choferes.filter(c=>esCh(c)&&!esAdm(c))[0];S.vehAsig=S.vehAsig||{};if(asignado)S.vehAsig[ch.id]=S.veh[0].id;else delete S.vehAsig[ch.id];
   S.role='rep';S.chofHoy=ch.id;S.pinOk[pinKey()]=true;S.tutVisto={rep:true};S.tab.rep='ruta';S.dia80=1;render()},asignado);
  for(let k=0;k<2;k++){await p.evaluate(()=>{var x=[].slice.call(document.querySelectorAll('main button')).filter(b=>/Iniciar ruta/.test(b.textContent))[0];if(x)x.click()});await p.waitForTimeout(250)}
  return {p,errs}};
 const vis=(p)=>p.evaluate(()=>{var m=document.querySelector('main');return m.innerText});
 const sig=async(p)=>{await p.evaluate(()=>{var x=[].slice.call(document.querySelectorAll('[data-act="sal124p"]')).filter(b=>b.textContent==='Siguiente')[0];x&&x.click()});await p.waitForTimeout(120);return p.evaluate(()=>salPaso124())};
 /* ---------- 1 · los pasos en orden ---------- */
 let {p,errs}=await abre(false);
 let t=await vis(p);ok(/Paso 1 de 7 · Vehículo/.test(t)&&/Camioneta Uno/.test(t)&&!/Inspección del vehículo/.test(t)&&!/Odómetro inicial/.test(t),'paso 1: solo el vehículo (la inspección todavía no)',t.slice(0,200));
 await p.evaluate(()=>{[].slice.call(document.querySelectorAll('[data-act="vehpick"]')).filter(x=>/Dos/.test(x.textContent))[0].click()});await p.waitForTimeout(120);
 ok(await sig(p)===1,'con vehículo escogido pasa a la inspección');
 t=await vis(p);ok(/Paso 2 de 7 · Inspección/.test(t)&&/Inspección del vehículo/.test(t)&&!/Camioneta Uno/.test(t),'paso 2: la inspección');
 ok(await p.evaluate(()=>S.inspR&&S.inspR.veh===String(S.vehHoy)),'la inspección es del vehículo escogido');
 ok(await sig(p)===1,'sin terminar la inspección no avanza');
 await p.evaluate(()=>{var r=S.inspR;inspLista(r.tipo).forEach((x,i)=>r.r[i]='b');render();document.querySelector('[data-act="insprep"]').click()});await p.waitForTimeout(120);
 ok(await sig(p)===2,'inspección lista: pasa al odómetro');
 t=await vis(p);ok(/Paso 3 de 7 · Odómetro/.test(t)&&/Odómetro inicial/.test(t)&&/Sí, marca 2,000 km/.test(t)&&!/el tanque está en/.test(t),'paso 3: odómetro y su confirmación (sin la del tanque)');
 if(await p.evaluate(()=>REAL)){ok(await sig(p)===2,'sin confirmar el odómetro no avanza');await p.evaluate(()=>document.querySelector('[data-act="salodook"]').click());await p.waitForTimeout(100)}
 ok(await sig(p)===3,'pasa a la gasolina');
 t=await vis(p);ok(/Paso 4 de 7 · Gasolina/.test(t)&&/Nivel del tanque/.test(t)&&!/Sí, marca/.test(t),'paso 4: el tanque');
 if(await p.evaluate(()=>REAL)){ok(await sig(p)===3,'sin confirmar el tanque no avanza');await p.evaluate(()=>document.querySelector('[data-act="saltankok"]').click());await p.waitForTimeout(100)}
 ok(await sig(p)===4,'pasa a las fotos');
 t=await vis(p);ok(/Paso 5 de 7 · Fotos/.test(t)&&/Tomar: Frente/.test(t),'paso 5: las 4 fotos');
 if(await p.evaluate(()=>FOTOS_OBLIGATORIAS)){ok(await sig(p)===4,'sin fotos no avanza');await p.evaluate(()=>{FOTOS.forEach(f=>S.salida.fotos[f[0]]='data:x');render()})}
 ok(await sig(p)===5,'pasa a la carga');
 t=await vis(p);ok(/Paso 6 de 7 · Carga/.test(t)&&/¿Cuánto cargas hoy\?/.test(t)&&/Cajas de roatán que cargas/.test(t),'paso 6: "¿Cuánto cargas hoy?" y lo que lleva');
 /* la tarjeta: ningún texto se sale ni se corta */
 const caja=await p.evaluate(()=>{var c=document.querySelector('main .card.rep1');if(!c)return null;var R=c.getBoundingClientRect(),mal=[];var w=document.createTreeWalker(c,NodeFilter.SHOW_TEXT),n;while((n=w.nextNode())){if(!n.textContent.trim())continue;var g=document.createRange();g.selectNodeContents(n);[].slice.call(g.getClientRects()).forEach(function(r){if(!r.width)return;if(r.left<R.left+10||r.right>R.right-6||r.bottom>R.bottom-6)mal.push(n.textContent.trim().slice(0,40))})}return mal});
 ok(caja&&caja.length===0,'"¿Cuánto cargas hoy?": todo el texto queda dentro del cuadro',caja);
 ok(await sig(p)===5,'sin carga no avanza');
 await p.evaluate(()=>{S.salida.R=10;S.salida.M=5;render()});ok(await sig(p)===6,'pasa a revisar');
 t=await vis(p);ok(/Paso 7 de 7 · Revisar/.test(t)&&/Revisa antes de salir/.test(t)&&/Camioneta Dos/.test(t)&&/Iniciar reparto/.test(t),'paso 7: resumen e "Iniciar reparto"');
 /* Atrás y regreso al paso que falta */
 await p.evaluate(()=>{S.salida.R=0;S.salida.M=0;render();document.querySelector('[data-act="iniciar"]').click()});await p.waitForTimeout(150);
 ok(await p.evaluate(()=>!S.salida.ok&&salPaso124()===5),'"Iniciar reparto" sin carga: regresa al paso Carga');
 await p.evaluate(()=>{S.salida.R=10;S.salida.M=5;salPon124(6);render();document.querySelector('[data-act="iniciar"]').click()});await p.waitForTimeout(300);
 const r=await p.evaluate(()=>({ok:S.salida.ok,inv:S.inv}));
 ok(r.ok&&r.inv.maduras===40&&r.inv.reparto===10&&r.inv.kgMaduro===95&&r.inv.repartoKg===5,'sale a reparto; bodega: 50→40 cajas y 100→95 kg; en el camión 10 y 5',r);
 t=await vis(p);ok(!/Paso \d de 7/.test(t),'ya en ruta no salen los pasos');
 ok(!errs.length,'sin errores (pasos)',errs);await p.close();
 /* ---------- 2 · vehículo asignado ---------- */
 ({p,errs}=await abre(true));
 t=await vis(p);ok(/Vas en/.test(t)&&/Camioneta Uno/.test(t)&&/¿Hoy usas este\?/.test(t)&&/Usar otro vehículo/.test(t),'asignado: "¿Hoy usas este?" y "Usar otro vehículo"');
 await p.evaluate(()=>document.querySelector('[data-act="veh124otro"]').click());await p.waitForTimeout(120);
 t=await vis(p);ok(/Escoge el vehículo que vas a usar hoy/.test(t)&&/Camioneta Dos/.test(t)&&/Volver al que me asignaron/.test(t),'puede escoger otro');
 await p.evaluate(()=>{[].slice.call(document.querySelectorAll('[data-act="vehpick"]')).filter(x=>/Dos/.test(x.textContent))[0].click()});await p.waitForTimeout(120);
 ok(await p.evaluate(()=>vehHoy().n)==='Camioneta Dos','queda la Camioneta Dos');
 await p.evaluate(()=>{salPon124(1);render();var r=S.inspR;inspLista(r.tipo).forEach((x,i)=>r.r[i]='b');render();document.querySelector('[data-act="insprep"]').click()});await p.waitForTimeout(120);
 await p.evaluate(()=>{S.salida.odoOk=true;S.salida.tankOk=true;FOTOS.forEach(f=>S.salida.fotos[f[0]]='data:x');S.salida.R=5;salPon124(6);render();document.querySelector('[data-act="iniciar"]').click()});await p.waitForTimeout(300);
 const a=await p.evaluate(()=>({ok:S.salida.ok,av:S.avPrecio.slice(-1)[0],asig:S.vehAsig[S.chofHoy]===S.veh[0].id}));
 ok(a.ok&&/salió en Camioneta Dos en lugar de Camioneta Uno/.test(a.av)&&a.asig,'al iniciar: aviso al administrador y la asignación no cambia',a);
 ok(!errs.length,'sin errores (asignado)',errs);await p.close();
 console.log(nOK+' OK · '+nF+' FAIL');await b.close()})();
