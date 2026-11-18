/* 124 · Iniciar el día por pasos. Orden de Ricardo: primero lo de afuera y después lo de adentro:
   1 Vehículo (al seguir: "¿Cómo recibes tu equipo?") → 2 Inspección → 3 Fotos de los 4 lados → 4 Odómetro → 5 Gasolina → 6 Carga → 7 Revisar.
   - La inspección es del vehículo escogido. No avanza sin lo de cada paso; "Iniciar reparto" con algo faltante regresa a ese paso.
   - El inventario queda igual que antes (cajas y kilos que salen de bodega).
   - Vehículo asignado: "¿Hoy usas este?", puede usar otro y al administrador le llega el aviso.
   - El equipo ya no sale al tocar "Iniciar ruta": sale al seguir del paso Vehículo, con las llaves del vehículo que se lleva.
   - El administrador que reparte también va por pasos y SOLO él puede omitir las fotos; el chofer no tiene ese botón.
   - La tarjeta "¿Cuánto cargas hoy?": el texto ya no se sale ni se corta (reporte de Ricardo, 18 nov).
   Uso: node t124.js [archivo.html]   (por defecto la versión real) */
const {chromium}=require('playwright');
const URL=process.argv[2]||'/mnt/user-data/outputs/platanos-primera-vez.html';
(async()=>{const b=await chromium.launch();let nOK=0,nF=0;const ok=(c,m,x)=>{c?nOK++:nF++;console.log((c?'OK   ':'FAIL ')+m+(x!==undefined?' '+JSON.stringify(x).slice(0,300):''))};
 const abre=async(o)=>{o=o||{};const p=await (await b.newContext({viewport:{width:360,height:780}})).newPage();const errs=[];p.on('pageerror',e=>errs.push(String(e)));p.on('dialog',d=>d.accept());
  await p.addInitScript(()=>{window.__pnTest=1;window.__hora93=9});await p.goto('file://'+URL);await p.waitForTimeout(900);
  await p.evaluate(o=>{if(window.PN_MODO==='vacio'){var U=S.setup;U.veh=[{n:'Camioneta Uno',pl:'AAA1',plEdo:'Baja California',comb:'Gasolina',img:0,odo:1000},{n:'Camioneta Dos',pl:'BBB2',plEdo:'Baja California',comb:'Gasolina',img:0,odo:2000}];U.per=[{n:'Chofer Uno',puesto:'chofer',tel:'1'}];
    var L=[];for(var i=0;i<22;i++)L.push({n:'Cliente '+i,a:'x',tel:'66400000'+(10+i),dias:[0,1,2,3,4,5,6],cred:0,vac:0,ch:'0'});U.cli=L;U.prov=[];S.precio.R=275;S.precio.M=20;suAplicar()}
   S.inv.maduras=50;S.inv.kgMaduro=100;var ch=S.choferes.filter(c=>esCh(c)&&!esAdm(c))[0];S.vehAsig=S.vehAsig||{};if(o.asignado)S.vehAsig[ch.id]=S.veh[0].id;else delete S.vehAsig[ch.id];
   if(o.equipo){S.bienes=(S.bienes||[]).concat([{id:901,n:'Celular de la empresa',quien:ch.id,est:'Bueno'}])}
   S.tutVisto={rep:true,admin:true};
   if(o.admin){S.role='admin';S.pinOk[pinKey()]=true;render();var h=document.createElement('button');h.dataset.act='arentrar';document.body.appendChild(h);h.click();h.remove()}
   else{S.role='rep';S.chofHoy=ch.id;S.pinOk[pinKey()]=true;S.tab.rep='ruta';S.dia80=1;render()}},o);
  await p.waitForTimeout(200);
  for(let k=0;k<2;k++){await p.evaluate(()=>{var x=[].slice.call(document.querySelectorAll('main button')).filter(b=>/Iniciar ruta/.test(b.textContent))[0];if(x)x.click()});await p.waitForTimeout(250)}
  return {p,errs}};
 const vis=(p)=>p.evaluate(()=>document.querySelector('main').innerText);
 const sig=async(p)=>{await p.evaluate(()=>{var x=[].slice.call(document.querySelectorAll('[data-act="sal124p"]')).filter(b=>b.textContent==='Siguiente')[0];x&&x.click()});await p.waitForTimeout(150);return p.evaluate(()=>salPaso124())};
 const inspecciona=(p)=>p.evaluate(()=>{var r=S.inspR;inspLista(r.tipo).forEach((x,i)=>r.r[i]='b');render();document.querySelector('[data-act="insprep"]').click()});
 /* ---------- 1 · los pasos en orden (chofer) ---------- */
 let {p,errs}=await abre();
 let t=await vis(p);ok(/Paso 1 de 7 · Vehículo/.test(t)&&/Camioneta Uno/.test(t)&&!/Inspección del vehículo/.test(t)&&!/Odómetro inicial/.test(t)&&!/Tomar: Frente/.test(t),'paso 1: solo el vehículo',t.slice(0,200));
 await p.evaluate(()=>{[].slice.call(document.querySelectorAll('[data-act="vehpick"]')).filter(x=>/Dos/.test(x.textContent))[0].click()});await p.waitForTimeout(120);
 ok(await sig(p)===1,'con vehículo escogido pasa a la inspección');
 t=await vis(p);ok(/Paso 2 de 7 · Inspección/.test(t)&&/Inspección del vehículo/.test(t)&&!/Camioneta Uno/.test(t)&&!/Saltar inspección/.test(t),'paso 2: la inspección (el chofer no la puede saltar)');
 ok(await p.evaluate(()=>S.inspR&&S.inspR.veh===String(S.vehHoy)),'la inspección es del vehículo escogido');
 ok(await sig(p)===1,'sin terminar la inspección no avanza');
 await inspecciona(p);await p.waitForTimeout(120);
 ok(await sig(p)===2,'inspección lista: pasa a las fotos');
 t=await vis(p);ok(/Paso 3 de 7 · Fotos/.test(t)&&/Tomar: Frente/.test(t)&&/Tomar: Lado derecho/.test(t)&&!/Odómetro inicial/.test(t)&&!/Omitir las fotos/.test(t),'paso 3: las 4 fotos de afuera (el chofer no las puede omitir)');
 if(await p.evaluate(()=>FOTOS_OBLIGATORIAS)){ok(await sig(p)===2,'sin fotos no avanza');await p.evaluate(()=>{FOTOS.forEach(f=>S.salida.fotos[f[0]]='data:x');render()})}
 ok(await sig(p)===3,'con las fotos pasa al odómetro');
 t=await vis(p);ok(/Paso 4 de 7 · Odómetro/.test(t)&&/Odómetro inicial/.test(t)&&/Sí, marca 2,000 km/.test(t)&&!/el tanque está en/.test(t)&&!/Tomar: Frente/.test(t),'paso 4: odómetro y su confirmación (sin la del tanque)');
 if(await p.evaluate(()=>REAL)){ok(await sig(p)===3,'sin confirmar el odómetro no avanza');await p.evaluate(()=>document.querySelector('[data-act="salodook"]').click());await p.waitForTimeout(100)}
 ok(await sig(p)===4,'pasa a la gasolina');
 t=await vis(p);ok(/Paso 5 de 7 · Gasolina/.test(t)&&/Nivel del tanque/.test(t)&&!/Sí, marca/.test(t),'paso 5: el tanque');
 if(await p.evaluate(()=>REAL)){ok(await sig(p)===4,'sin confirmar el tanque no avanza');await p.evaluate(()=>document.querySelector('[data-act="saltankok"]').click());await p.waitForTimeout(100)}
 ok(await sig(p)===5,'pasa a la carga');
 t=await vis(p);ok(/Paso 6 de 7 · Carga/.test(t)&&/¿Cuánto cargas hoy\?/.test(t)&&/Cajas de roatán que cargas/.test(t),'paso 6: "¿Cuánto cargas hoy?" y lo que lleva');
 /* la tarjeta: ningún texto se sale ni se corta */
 const caja=await p.evaluate(()=>{var c=document.querySelector('main .card.rep1');if(!c)return null;var R=c.getBoundingClientRect(),mal=[];var w=document.createTreeWalker(c,NodeFilter.SHOW_TEXT),n;while((n=w.nextNode())){if(!n.textContent.trim())continue;var g=document.createRange();g.selectNodeContents(n);[].slice.call(g.getClientRects()).forEach(function(r){if(!r.width)return;if(r.left<R.left+10||r.right>R.right-6||r.bottom>R.bottom-6)mal.push(n.textContent.trim().slice(0,40))})}return mal});
 ok(caja&&caja.length===0,'"¿Cuánto cargas hoy?": todo el texto queda dentro del cuadro',caja);
 ok(await sig(p)===5,'sin carga no avanza');
 await p.evaluate(()=>{S.salida.R=10;S.salida.M=5;render()});ok(await sig(p)===6,'pasa a revisar');
 t=await vis(p);ok(/Paso 7 de 7 · Revisar/.test(t)&&/Revisa antes de salir/.test(t)&&/Camioneta Dos/.test(t)&&/Iniciar reparto/.test(t),'paso 7: resumen e "Iniciar reparto"');
 await p.evaluate(()=>{S.salida.R=0;S.salida.M=0;render();document.querySelector('[data-act="iniciar"]').click()});await p.waitForTimeout(150);
 ok(await p.evaluate(()=>!S.salida.ok&&salPaso124()===5),'"Iniciar reparto" sin carga: regresa al paso Carga');
 await p.evaluate(()=>{S.salida.R=10;S.salida.M=5;salPon124(6);render();document.querySelector('[data-act="iniciar"]').click()});await p.waitForTimeout(300);
 let r=await p.evaluate(()=>({ok:S.salida.ok,inv:S.inv}));
 ok(r.ok&&r.inv.maduras===40&&r.inv.reparto===10&&r.inv.kgMaduro===95&&r.inv.repartoKg===5,'sale a reparto; bodega: 50→40 cajas y 100→95 kg; en el camión 10 y 5',r);
 t=await vis(p);ok(!/Paso \d de 7/.test(t),'ya en ruta no salen los pasos');
 ok(!errs.length,'sin errores (pasos)',errs);await p.close();
 /* ---------- 2 · vehículo asignado + equipo después del vehículo ---------- */
 ({p,errs}=await abre({asignado:true,equipo:true}));
 ok(await p.evaluate(()=>!S.eqov),'al tocar "Iniciar ruta" ya no sale el equipo (todavía no escoge vehículo)');
 t=await vis(p);ok(/Vas en/.test(t)&&/Camioneta Uno/.test(t)&&/¿Hoy usas este\?/.test(t)&&/Usar otro vehículo/.test(t),'asignado: "¿Hoy usas este?" y "Usar otro vehículo"');
 await p.evaluate(()=>document.querySelector('[data-act="veh124otro"]').click());await p.waitForTimeout(120);
 t=await vis(p);ok(/Escoge el vehículo que vas a usar hoy/.test(t)&&/Camioneta Dos/.test(t)&&/Volver al que me asignaron/.test(t),'puede escoger otro');
 await p.evaluate(()=>{[].slice.call(document.querySelectorAll('[data-act="vehpick"]')).filter(x=>/Dos/.test(x.textContent))[0].click()});await p.waitForTimeout(120);
 ok(await p.evaluate(()=>vehHoy().n)==='Camioneta Dos','queda la Camioneta Dos');
 await sig(p);
 let eq=await p.evaluate(()=>({ov:!!S.eqov,t:(document.getElementById('eqov')||{}).innerText||'',paso:salPaso124()}));
 ok(eq.ov&&/¿Cómo recibes tu equipo\?/.test(eq.t)&&/Llaves de Camioneta Dos/.test(eq.t)&&!/Llaves de Camioneta Uno/.test(eq.t)&&/Celular de la empresa/.test(eq.t)&&eq.paso===0,'al seguir del vehículo: el equipo, con las llaves de la Camioneta Dos',eq);
 await p.evaluate(()=>{[].slice.call(document.querySelectorAll('#eqov [data-act="eqest"][data-v="bien"]')).forEach(x=>x.click())});await p.waitForTimeout(120);
 await p.evaluate(()=>{[].slice.call(document.querySelectorAll('#eqov [data-act="eqest"][data-v="bien"]')).forEach(x=>{if(x.getAttribute('aria-pressed')!=='true')x.click()})});await p.waitForTimeout(120);
 await p.evaluate(()=>document.querySelector('[data-act="eqok"]').click());await p.waitForTimeout(400);
 eq=await p.evaluate(()=>({ov:!!S.eqov,paso:salPaso124(),reg:Object.keys(((eqRegDe(+S.chofHoy).salida)||{}).est||{}),llave:'v'+vehHoy().id}));
 ok(!eq.ov&&eq.paso===1&&eq.reg.indexOf(eq.llave)>-1,'equipo guardado y sigue a la inspección',eq);
 await inspecciona(p);await p.waitForTimeout(120);
 await p.evaluate(()=>{S.salida.odoOk=true;S.salida.tankOk=true;FOTOS.forEach(f=>S.salida.fotos[f[0]]='data:x');S.salida.R=5;salPon124(6);render();document.querySelector('[data-act="iniciar"]').click()});await p.waitForTimeout(400);
 const a=await p.evaluate(()=>({ok:S.salida.ok,ov:!!S.eqov,av:S.avPrecio.slice(-1)[0],asig:S.vehAsig[S.chofHoy]===S.veh[0].id}));
 ok(a.ok&&!a.ov&&/salió en Camioneta Dos en lugar de Camioneta Uno/.test(a.av)&&a.asig,'al iniciar (sin volver a pedir el equipo): aviso al administrador y la asignación no cambia',a);
 ok(!errs.length,'sin errores (asignado)',errs);await p.close();
 /* ---------- 3 · el administrador que reparte: por pasos y puede omitir las fotos ---------- */
 ({p,errs}=await abre({admin:true}));
 t=await vis(p);ok(await p.evaluate(()=>S.arOn&&S.role==='rep')&&/Paso 1 de 7 · Vehículo/.test(t)&&/Estás repartiendo/.test(t)&&/Puedes saltar la revisión y omitir las fotos/.test(t),'admin: también por pasos, con su letrero',t.slice(0,300));
 ok(await sig(p)===1,'admin: pasa a la inspección');
 await p.evaluate(()=>document.querySelector('[data-act="inspskip"]').click());await p.waitForTimeout(120);
 ok(await sig(p)===2,'admin: puede saltar la inspección');
 t=await vis(p);ok(/Paso 3 de 7 · Fotos/.test(t)&&/Omitir las fotos \(eres administrador\)/.test(t),'admin: botón "Omitir las fotos"');
 const fo=await p.evaluate(()=>FOTOS_OBLIGATORIAS);
 if(fo)ok(await sig(p)===2,'admin: sin fotos y sin omitirlas no avanza');
 await p.evaluate(()=>document.querySelector('[data-act="sal124fskip"]').click());await p.waitForTimeout(150);
 ok(await p.evaluate(()=>salPaso124())===3,'admin: "Omitir las fotos" pasa al odómetro');
 await p.evaluate(()=>{S.salida.odoOk=true;S.salida.tankOk=true;S.salida.R=4;salPon124(6);render()});
 t=await vis(p);ok(/Fotos\s*omitidas \(administrador\)/.test(t)&&/saltada \(administrador\)/.test(t),'admin: el resumen dice que omitió las fotos y saltó la inspección');
 await p.evaluate(()=>document.querySelector('[data-act="iniciar"]').click());await p.waitForTimeout(400);
 r=await p.evaluate(()=>({ok:S.salida.ok,err:S.salida.err,skip:S.salida.fotoSkip124}));
 ok(r.ok&&r.skip,'admin: sale a repartir sin fotos (antes no lo dejaba aunque decía "opcionales")',r);
 ok(!errs.length,'sin errores (administrador)',errs);await p.close();
 console.log(nOK+' OK · '+nF+' FAIL');await b.close()})();
