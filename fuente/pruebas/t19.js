/* 19 (nueva numeración) · "Cerrar su ruta y empezar de cero" (admin, en Rutas): lo que traía queda como cierre atrasado (nada se pierde, taras
   cuadran) y el chofer arranca con "Antes de salir"; candado si ya hay uno de ese día sin recibir. Y km estimados cuando no hubo odómetro de salida. */
const {chromium}=require('playwright');let nOK=0,nF=0;const ok=(c,m,x)=>{c?nOK++:nF++;console.log((c?'OK   ':'FAIL ')+m+(x!==undefined?' '+JSON.stringify(x).slice(0,350):''))};
(async()=>{const b=await chromium.launch();const errs=[];
for(const arch of ['prototipo-platanos.html','platanos-primera-vez.html']){
const p=await (await b.newContext({viewport:{width:412,height:900}})).newPage();p.on('pageerror',e=>errs.push(e.message));p.on('dialog',d=>d.accept());
await p.addInitScript(()=>{window.__pnTest=1;window.__hora93=9});await p.goto('file:///mnt/user-data/outputs/'+arch);await p.waitForTimeout(1200);const ev=(f,a)=>p.evaluate(f,a);let r;
await ev(()=>{var bv=document.getElementById('bienv');if(bv)bv.remove();if(S.setup&&!S.setup.fin){var U=S.setup;U.veh=[{n:'Camioneta Uno',pl:'AAA1',plEdo:'Baja California',comb:'Gasolina',img:0,odo:1000},{n:'Camioneta Dos',pl:'BBB2',plEdo:'Baja California',comb:'Gasolina',img:0,odo:2000}];U.per=[{n:'Danu',puesto:'chofer',tel:'1'},{n:'Beto',puesto:'chofer',tel:'2'}];U.cli=[{n:'Doña Mary',a:'x',tel:'1',dias:[0,1,2,3,4,5,6],cred:0,vac:0,ch:'0'},{n:'Don Beto',a:'y',tel:'2',dias:[0,1,2,3,4,5,6],cred:0,vac:0,ch:'0'}];U.prov=[];S.precio.R=275;S.precio.M=20;suAplicar();_pin.modo=null}
 S.role='admin';S.encOn=false;S.tutVisto={rep:true,admin:true};S.popVisto={admin:iso(TODAY)};S.atras93={};S.modal=null;
 var D=S.choferes.filter(c=>esCh(c)&&!esAdm(c)&&+c.id!==+S.chofHoy)[0];window.__D=+D.id;var c=S.cli.filter(x=>!x.oculto);
 var o=chNuevo(+D.id);o.rutaDia80=iso(TODAY);o.salida.ok=true;o.salida.f7=iso(TODAY);o.invR=5;o.cierre.salioR=7;o.cierre.odoIni='';o.log=[{c:c[0].id,R:2,M:0,pr:275,total:550,pago:550,abono:0,V:1,id:'a'}];o.cierre.sent=false;S.chSt=S.chSt||{};S.chSt[D.id]=o;
 S.cajasT0=S.cajasT0+(cajasDonde().tot-cajasEsperadas());S.tab.admin='rutas';render()});
r=await ev(()=>{var cd=document.querySelector('main [data-x="ch92"][data-id="'+__D+'"]');return {card:!!cd,bt:!!(cd&&cd.querySelector('[data-act="cero19"]'))}});
ok(r.card&&r.bt,arch+' · en Rutas, la tarjeta del chofer con la ruta abierta trae "🔄 Cerrar su ruta y empezar de cero"',r);
r=await ev(()=>{document.querySelector('main [data-x="ch92"][data-id="'+__D+'"] [data-act="cero19"]').click();var m=document.querySelector('main').innerText;return {tab:S.tab.admin,efe:/Efectivo que debe entregar/.test(m),que:/Cierre atrasado/.test(m)&&/Antes de salir/.test(m),bt:!!document.querySelector('[data-act="cero19ok"]')}});
ok(r.tab==='cero19'&&r.efe&&r.que&&r.bt,arch+' · abre su pantalla: lo que trae, qué va a pasar y "Sí, cerrar su ruta"',r);
const antes=await ev(()=>{var t=0;try{t=tarasDif86()}catch(e){}return {t,log:JSON.stringify(S.chSt[__D].log)}});
r=await ev(()=>{document.querySelector('[data-act="cero19ok"]').click();var k=__D+'|'+iso(TODAY),e=S.atras93[k],n=S.chSt[__D];return {tab:S.tab.admin,guardado:!!e,log:e&&JSON.stringify(e.pack.log),invR:e&&e.pack.invR,ef:e&&e.ef,nueva:{sal:n.salida.ok,log:(n.log||[]).length,dia:n.rutaDia80===iso(TODAY)},av:(S.rutaAv[__D]||[]).slice(-1)[0],hist:S.hist.some(h=>/Cerró la ruta de/.test(h.x)),t:(function(){try{return tarasDif86()}catch(e){return 0}})()}});
ok(r.guardado&&r.log===antes.log&&r.invR===5&&r.ef===550,arch+' · lo que traía (entregas, $550, 5 cajas) queda como cierre atrasado para recibirlo',r);
ok(r.nueva.sal===false&&r.nueva.log===0&&r.nueva.dia,arch+' · su ruta nueva empieza en cero: "Antes de salir" (vehículo, fotos, odómetro)',r.nueva);
ok(/empezar de cero/.test(r.av||'')&&r.hist&&r.tab==='rutas',arch+' · al chofer le llega el aviso y queda en el historial',r);
ok(r.t===antes.t,arch+' · las taras siguen cuadrando',{antes:antes.t,despues:r.t});
/* candado: otra ruta abierta el mismo día con un cierre atrasado sin recibir */
r=await ev(()=>{var o=S.chSt[__D];o.salida.ok=true;o.log=[{c:S.cli[0].id,R:1,M:0,pr:275,total:275,pago:275,abono:0}];S.tab.admin='rutas';render();var bt=document.querySelector('main [data-x="ch92"][data-id="'+__D+'"] [data-act="cero19"]');if(bt)bt.click();var m=document.querySelector('main').innerText;return {bt:!!bt,aviso:/Primero recibe su cierre atrasado/.test(m),ok:!!document.querySelector('[data-act="cero19ok"]')}});
ok(r.bt&&r.aviso&&!r.ok,arch+' · si ya hay un cierre atrasado de ese día sin recibir, primero hay que recibirlo (no se pierde nada)',r);
/* ruta con cierre mandado: no sale el botón */
r=await ev(()=>{var o=S.chSt[__D];o.cierre.sent=true;S.tab.admin='rutas';render();var x=!!document.querySelector('main [data-x="ch92"][data-id="'+__D+'"] [data-act="cero19"]');o.cierre.sent=false;return x});
ok(!r,arch+' · si ya mandó su cierre, no sale',r);
/* km estimados cuando no hubo odómetro de salida */
r=await ev(()=>{var ay=iso(new Date(TODAY.getTime()-864e5)),c=S.cli.filter(x=>!x.oculto);c.forEach((x,i)=>{x.lat=19.53+i*0.01;x.lng=-96.92;x.km=5});try{if(typeof BOD!=='undefined'&&BOD){BOD.lat=19.52;BOD.lng=-96.93}}catch(e){}
 S.rutasHist.push({f:ay,ch:__D,log:c.map((x,i)=>({c:x.id,R:1,total:275,pago:275})),res:{km:50593,tasa68:0.7},enviado:true,t19:1});S.tab.admin='cuadre121';render();
 var k=[...document.querySelectorAll('[data-x="km16"] [data-act="km16"]')].pop();k.click();var b=document.querySelector('[data-act="km19est"]');return {bt:!!b,km:b&&+b.dataset.km,txt:b&&b.textContent}});
ok(r.bt&&r.km>0&&r.km<200,arch+' · "Corregir kilometraje": "No se anotó: usar ~N km" (calculado con el mapa de los clientes)',r);
r=await ev(()=>{var km=+document.querySelector('[data-act="km19est"]').dataset.km;document.querySelector('[data-act="km19est"]').click();var e=S.rutasHist.filter(x=>x.t19)[0];return {km:e.res.km,esp:km,est:e.res.km16.corr.est,orig:e.res.km16.orig,hist:S.hist.some(h=>/estimado: no se anotó/.test(h.x))}});
ok(r.km===r.esp&&r.est&&r.orig===50593&&r.hist,arch+' · al usarlo: esos km, marcado como estimado, el original guardado y en el historial',r);
await p.close()}
ok(!errs.length,'sin errores',errs);console.log(nOK+' OK · '+nF+' FAIL');await b.close()})();
