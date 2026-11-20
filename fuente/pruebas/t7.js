/* 7 (nueva numeración) · cada día la ruta empieza desde cero: si la ruta dice que es de HOY pero su salida fue de OTRO día (se quedó abierta),
   se cierra (pasa a cierre atrasado con todo lo que traía) y la de hoy empieza con "Antes de salir". No aplica a la 2ª vuelta, a rutas sin
   la marca nueva ni a la madrugada. Taras y dinero no se pierden. */
const {chromium}=require('playwright');let nOK=0,nF=0;const ok=(c,m,x)=>{c?nOK++:nF++;console.log((c?'OK   ':'FAIL ')+m+(x!==undefined?' '+JSON.stringify(x).slice(0,350):''))};
(async()=>{const b=await chromium.launch();const errs=[];
for(const arch of ['prototipo-platanos.html','platanos-primera-vez.html']){
const p=await (await b.newContext({viewport:{width:412,height:900}})).newPage();p.on('pageerror',e=>errs.push(e.message));p.on('dialog',d=>d.accept());
await p.addInitScript(()=>{window.__pnTest=1;window.__hora93=9});await p.goto('file:///mnt/user-data/outputs/'+arch);await p.waitForTimeout(800);const ev=(f,a)=>p.evaluate(f,a);let r;
await ev(()=>{var bv=document.getElementById('bienv');if(bv)bv.remove();
 if(S.setup&&!S.setup.fin){var U=S.setup;U.veh=[{n:'Camioneta Uno',pl:'AAA1',plEdo:'Baja California',comb:'Gasolina',img:0,odo:1000}];U.per=[{n:'Danu',puesto:'chofer',tel:'1'}];U.cli=[{n:'Doña Mary',a:'x',tel:'1',dias:[0,1,2,3,4,5,6],cred:0,vac:0,ch:'0'},{n:'Don Beto',a:'y',tel:'2',dias:[0,1,2,3,4,5,6],cred:0,vac:0,ch:'0'}];U.prov=[];S.precio.R=275;S.precio.M=20;suAplicar();_pin.modo=null}
 var D=S.choferes.filter(c=>esCh(c))[0];S.chofHoy=+D.id;try{chCambiar(+D.id)}catch(e){}S.role='rep';S.tutVisto={rep:true,admin:true};S.pinOk[pinKey()]=true;S.pinOk['c:'+D.id]=true;S.atras93={}});
const ay=await ev(()=>iso(new Date(TODAY.getTime()-864e5)));
/* ayer: salió (con la marca de su día), entregó, trae cajas; no mandó cierre */
const prep=(marca)=>ev(([ay,marca])=>{S.atras93={};S.rutaDia80=ay;S.salida.ok=true;delete S.salida.f7;if(marca)S.salida.f7=ay;var c=S.cli.filter(x=>!x.oculto).slice(0,2);S.stops=c.map(x=>({c:x.id,done:true}));
 S.log=c.map((x,i)=>({c:x.id,R:3,M:5,pr:275,pm:20,total:925,pago:925,abono:0,V:2,id:'e'+i}));S.inv.reparto=12;S.inv.repartoKg=20;S.cierre.salioR=18;S.cierre.salioM=30;S.cierre.sent=false;S.cierre.odoIni=1000;S.cierre.odo=1060;S.recs=[{tipo:'Gasolina',litros:10,total:240}];S.gch=[];S.dia80=null;S.tab.rep='ruta';},[ay,marca]);
/* la marca: al salir queda el día de esa ruta */
r=await ev(()=>{S.rutaDia80=iso(TODAY);S.salida.ok=true;delete S.salida.f7;render();return S.salida.f7===iso(TODAY)});ok(r,arch+' · al salir, la salida queda marcada con el día de su ruta',r);
/* la ruta de ayer se queda abierta y por algún camino pasa a decir "hoy" */
await prep(true);
r=await ev(()=>{var t0=null;try{t0=tarasDif86()}catch(e){}var antes={ef:sum(S.log,l=>l.pago),n:S.log.length};S.rutaDia80=iso(TODAY);render();
 var k=Object.keys(S.atras93||{})[0],e=k&&S.atras93[k];var d=e&&rutaDet6(e.pack);
 return {antes,k,why:e&&e.why,ef:e&&e.ef,pack:e&&{log:e.pack.log.length,invR:e.pack.invR,invM:e.pack.invM,gas:(e.pack.recs||[]).length,odo:e.pack.cierre.odo},det:d&&{efectivo:d.efectivo,gasolina:d.gasolina},
  ahora:{dia:S.rutaDia80,salida:S.salida.ok,log:S.log.length,rec:(S.recs||[]).length,cam:S.inv.reparto,tab:S.tab.rep},hoy:iso(TODAY),hist:(S.rutasHist||[]).filter(x=>x.f===e.f&&+x.ch===+S.chofHoy&&(x.log||[]).length===2).length,t0,t1:(function(){try{return tarasDif86()}catch(e){return null}})()}});
ok(r.k&&r.pack&&r.pack.log===2&&r.pack.invR===12&&r.pack.invM===20&&r.pack.gas===1&&r.pack.odo===1060&&r.ef===1850,arch+' · la de ayer se CIERRA: pasa a cierre atrasado con sus 2 entregas ($1,850), 12 cajas y 20 kg en el camión, gasolina y odómetro',r);
ok(r.det&&r.det.efectivo===1610,arch+' · lo que debe entregar (cobrado − gasolina) se ve en el cierre atrasado',r.det);
ok(r.ahora.dia===r.hoy&&r.ahora.salida===false&&r.ahora.log===0&&r.ahora.rec===0&&r.ahora.tab==='ruta',arch+' · la de hoy empieza desde cero: "Antes de salir" otra vez (vehículo, fotos, odómetro), sin entregas ni gastos de ayer',r.ahora);
ok(r.hist===1,arch+' · queda en el historial',r.hist);
ok(r.t0===null||r.t1===r.t0,arch+' · las taras siguen cuadrando (las de ese camión se cuentan en el cierre atrasado)',{t0:r.t0,t1:r.t1});
r=await ev(()=>{render();render();return Object.keys(S.atras93).length});ok(r===1,arch+' · no se repite al volver a dibujar',r);
/* NO aplica: 2ª vuelta del mismo día */
r=await ev(()=>{S.atras93={};S.rutaDia80=iso(TODAY);S.salida.ok=true;S.salida.f7=iso(TODAY);S.log=[{c:S.cli[0].id,R:1,total:275,pago:275,abono:0}];render();return {n:Object.keys(S.atras93).length,log:S.log.length,sal:S.salida.ok}});
ok(r.n===0&&r.log===1&&r.sal,arch+' · la segunda vuelta del mismo día no se toca',r);
/* NO aplica: ruta abierta antes de esta versión (sin marca) */
await prep(false);r=await ev(()=>{S.rutaDia80=iso(TODAY);var s=S.salida;var g=cero7Vieja();return {g,log:S.log.length}});
ok(r.g===null&&r.log===2,arch+' · una ruta que ya estaba abierta antes de esta versión (sin marca) no se reinicia a medio día',r);
/* NO aplica: madrugada (12 a 5 a.m.) con la ruta de ayer */
await prep(true);r=await ev(()=>{window.__hora93=2;render();var x={dia80:!!document.getElementById('dia80'),n:Object.keys(S.atras93).length,log:S.log.length};window.__hora93=9;return x});
ok(r.n===0&&r.log===2,arch+' · de madrugada la ruta de ayer sigue siendo la de hoy (93): no se toca',r);
/* el bloqueo normal sigue: ruta de ayer sin cierre → "No mandaste tu cierre" */
await prep(true);r=await ev(()=>{render();return {dia80:!!document.getElementById('dia80'),n:Object.keys(S.atras93).length}});
ok(r.dia80&&r.n===0,arch+' · la ruta de ayer sin cierre sigue pidiendo "Mandar mi cierre de ayer" (no se cierra sola)',r);
/* al MANDAR el cierre atrasado: la de ayer se guarda para recibirla y la de hoy empieza con "Antes de salir" */
await prep(true);r=await ev(()=>{S.cierre.res=cierreRes();S.cierre.sent=true;render();var k=Object.keys(S.atras93)[0];return {k,env:k&&S.atras93[k].env,dia:S.rutaDia80===iso(TODAY),sal:S.salida.ok,log:S.log.length}});
ok(r.k&&r.env&&r.dia&&r.sal===false&&r.log===0,arch+' · al mandar el cierre de ayer: se guarda para recibirlo y la ruta de hoy pide "Antes de salir" (vehículo, fotos, odómetro)',r);
/* al LIBERAR (administrador): la ruta nueva también empieza con "Antes de salir" */
r=await ev(()=>{var o=chNuevo(+S.chofHoy);return {sal:o.salida.ok,log:o.log.length,f7:o.salida.f7||null}});
ok(r.sal===false&&r.log===0&&!r.f7,arch+' · la ruta que arma el administrador al liberar empieza sin salida (pide "Antes de salir")',r);
await p.close()}
ok(!errs.length,'sin errores',errs);console.log(nOK+' OK · '+nF+' FAIL');await b.close()})();
