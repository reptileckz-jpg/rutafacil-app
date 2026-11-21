/* 20 (nueva numeración) · cerrar la ruta el MISMO día = que regrese a la bodega (o haga su cierre para un viaje de carga) y haga su cierre normal:
   no es atrasado; sus clientes quedan en pausa salvo los pedidos que le agreguen; vuelta 2 = "Antes de salir" con odómetro, fotos y carga. */
const {chromium}=require('playwright');let nOK=0,nF=0;const ok=(c,m,x)=>{c?nOK++:nF++;console.log((c?'OK   ':'FAIL ')+m+(x!==undefined?' '+JSON.stringify(x).slice(0,350):''))};
(async()=>{const b=await chromium.launch();const errs=[];
for(const arch of ['prototipo-platanos.html','platanos-primera-vez.html']){
const p=await (await b.newContext({viewport:{width:412,height:900}})).newPage();p.on('pageerror',e=>errs.push(e.message));p.on('dialog',d=>d.accept());
await p.addInitScript(()=>{window.__pnTest=1;window.__hora93=9});await p.goto('file:///mnt/user-data/outputs/'+arch);await p.waitForTimeout(1200);const ev=(f,a)=>p.evaluate(f,a);let r;
await ev(()=>{var bv=document.getElementById('bienv');if(bv)bv.remove();if(S.setup&&!S.setup.fin){var U=S.setup;U.veh=[{n:'Camioneta Uno',pl:'AAA1',plEdo:'Baja California',comb:'Gasolina',img:0,odo:1000},{n:'Camioneta Dos',pl:'BBB2',plEdo:'Baja California',comb:'Gasolina',img:0,odo:2000}];U.per=[{n:'Danu',puesto:'chofer',tel:'1'},{n:'Beto',puesto:'chofer',tel:'2'}];U.cli=[{n:'Doña Mary',a:'x',tel:'1',dias:[0,1,2,3,4,5,6],cred:0,vac:0,ch:'0'},{n:'Don Beto',a:'y',tel:'2',dias:[0,1,2,3,4,5,6],cred:0,vac:0,ch:'0'},{n:'Fruber',a:'z',tel:'3',dias:[0,1,2,3,4,5,6],cred:0,vac:0,ch:'0'}];U.prov=[];S.precio.R=275;S.precio.M=20;suAplicar();_pin.modo=null}
 S.role='admin';S.encOn=false;S.tutVisto={rep:true,admin:true};S.popVisto={admin:iso(TODAY)};S.atras93={};S.modal=null;
 var D=S.choferes.filter(c=>esCh(c)&&!esAdm(c)&&+c.id!==+S.chofHoy)[0];window.__D=+D.id;var c=S.cli.filter(x=>!x.oculto);
 var o=chNuevo(+D.id);o.rutaDia80=iso(TODAY);o.salida.ok=true;o.salida.f7=iso(TODAY);o.invR=5;o.cierre.salioR=7;o.log=[{c:c[0].id,R:2,M:0,pr:275,total:550,pago:550,abono:0,V:0}];o.cierre.sent=false;S.chSt=S.chSt||{};S.chSt[D.id]=o;S.tab.admin='rutas';render()});
/* administrador */
r=await ev(()=>{document.querySelector('main [data-x="ch92"][data-id="'+__D+'"] [data-act="cero19"]').click();var m=document.querySelector('main').innerText;return {bod:!!document.querySelector('[data-act="reg20"][data-v="bodega"]'),viaje:!!document.querySelector('[data-act="reg20"][data-v="viaje"]'),emer:/Cerrar ya, sin esperar/.test(m),noAtras:/No queda atrasado/.test(m)}});
ok(r.bod&&r.viaje&&r.emer&&r.noAtras,arch+' · ruta de hoy: "Que regrese a la bodega y haga su cierre", "Va a un viaje de carga" y abajo "Cerrar ya, sin esperar"',r);
r=await ev(()=>{document.querySelector('[data-act="reg20"][data-v="bodega"]').click();var o=S.chSt[__D];var cd=document.querySelector('main [data-x="ch92"][data-id="'+__D+'"] [data-x="reg20a"]');return {reg:o.reg20,atras:Object.keys(S.atras93||{}).length,log:(o.log||[]).length,av:(S.rutaAv[__D]||[]).slice(-1)[0],card:cd?cd.innerText:''}});
ok(r.reg&&r.reg.para==='bodega'&&r.atras===0&&r.log===1,arch+' · queda pedido en su ruta; NO se hace cierre atrasado ni se le quita nada',r);
ok(/regresar a la bodega/.test(r.av||'')&&/Regresando a la bodega/.test(r.card)&&/\$550/.test(r.card),arch+' · le llega el aviso y en Rutas su tarjeta dice "Regresando a la bodega · trae $550…"',r);
/* chofer */
r=await ev(()=>{var D=__D;var o=S.chSt[D];S.role='rep';S.chofHoy=D;arLoad(JSON.parse(JSON.stringify(o)));delete S.chSt[D];S.pinOk[pinKey()]=true;S.pinOk['c:'+D]=true;var c=S.cli.filter(x=>!x.oculto);S.stops=[{c:c[0].id,done:true},{c:c[1].id},{c:c[2].id,ped:true}];S.inv.reparto=0;S.inv.repartoKg=0;S.bods=S.bods||[];if(!S.bods.length)S.bods.push({id:1,n:'Bodega'});S.bods.forEach(x=>{x.lat=19.52;x.lng=-96.93});S.tab.rep='ruta';render();
 var card=document.querySelector('[data-x="reg20"]');var i1=curStop();var bt=document.createElement('button');bt.dataset.act='entregar';bt.dataset.i='1';document.querySelector('main').appendChild(bt);bt.click();bt.remove();var bloq=S.tab.rep;
 var card2=document.querySelector('[data-x="reg20"]');return {card:card2?card2.innerText:'',cur:i1,bloq,cargar:!!document.querySelector('[data-x="cargar10"]')}});
ok(/Regresa a la bodega/.test(r.card)&&/entrega tu pedido/.test(r.card)&&/Tu otro cliente queda en pausa/.test(r.card)&&/Cómo llegar|Ya estás/.test(r.card),arch+' · el chofer ve arriba "🏭 Regresa a la bodega", sus pedidos primero, los demás en pausa y "Cómo llegar"',r);
ok(r.cur===2&&r.bloq==='ruta',arch+' · la siguiente parada es el pedido; un cliente en pausa no se puede entregar',r);
ok(!r.cargar,arch+' · mientras regresa no sale "Cargar más"',r);
r=await ev(()=>{var bt=document.createElement('button');bt.dataset.act='entregar';bt.dataset.i='2';document.querySelector('main').appendChild(bt);bt.click();bt.remove();var t=S.tab.rep;S.tab.rep='ruta';render();return t});
ok(r==='entrega',arch+' · el pedido que le agregaron sí se puede entregar',r);
r=await ev(()=>{S.stops[2].done=true;render();var c1=curStop();document.querySelector('[data-act="reg20ci"]').click();return {cur:c1,tab:S.tab.rep}});
ok(r.cur===-1&&r.tab==='cierre',arch+' · ya sin pedidos: "Ya llegué: hacer mi cierre" abre su cierre normal',r);
r=await ev(()=>{S.cierre.res=cierreRes();S.cierre.sent=true;render();return {reg:S.reg20}});ok(r.reg===null,arch+' · al mandar su cierre se quita lo de "regresa"',r);
/* vuelta 2: ya le recibieron el efectivo → cierre #2 con "Antes de salir" (odómetro, fotos, carga), la revisión de hoy se conserva */
r=await ev(async()=>{S.inspR={dia:iso(TODAY),veh:String(S.vehHoy),ok:true,r:{},n:{},f:{}};S.cierreReg={rec:550,f:null};var n0=(S.cierresPrev||[]).length;var odo=num(S.cierre.odo);
 var bt=document.createElement('button');bt.dataset.act='seguir';bt.dataset.k='vuelta';document.querySelector('main').appendChild(bt);bt.click();bt.remove();await new Promise(r=>setTimeout(r,100));
 return {n:(S.cierresPrev||[]).length-n0,sal:S.salida.ok,v2:S.salida.v2,insp:!!(S.inspR&&S.inspR.ok),oi:num(S.cierre.odoIni)===odo,log:S.log.length}});
ok(r.n===1&&r.sal===false&&r.v2&&r.insp&&r.oi&&r.log===0,arch+' · vuelta 2: cierre #2, "Antes de salir" otra vez (odómetro, fotos, carga) y la revisión del vehículo de hoy se conserva',r);
/* si no le han recibido el efectivo: se reabre el mismo cierre, sin fotos */
r=await ev(async()=>{S.salida.ok=true;S.log=[{c:S.cli[0].id,R:1,M:0,pr:275,total:275,pago:275,abono:0}];S.cierre.res=cierreRes();S.cierre.sent=true;S.cierre.regMov=false;S.cierreReg=null;var n0=(S.cierresPrev||[]).length;
 var bt=document.createElement('button');bt.dataset.act='seguir';bt.dataset.k='vuelta';document.querySelector('main').appendChild(bt);bt.click();bt.remove();await new Promise(r=>setTimeout(r,100));return {n:(S.cierresPrev||[]).length-n0,sent:S.cierre.sent,sal:S.salida.ok,log:S.log.length}});
ok(r.n===0&&r.sent===false&&r.sal===true&&r.log===1,arch+' · sin recibirle el efectivo: se reabre el mismo cierre y sigue, sin fotos',r);
/* viaje de carga */
r=await ev(()=>{S.reg20={f:iso(TODAY),para:'viaje'};S.cierre.sent=false;S.tab.rep='ruta';render();var c=document.querySelector('[data-x="reg20"]');var t=c?c.innerText:'';document.querySelector('[data-act="reg20ci"]').click();return {t,tab:S.tab.rep}});
ok(/viaje de carga/.test(r.t)&&/Haz tu cierre ahora/.test(r.t)&&r.tab==='cierre',arch+' · viaje de carga: "Te toca un viaje de carga · haz tu cierre ahora" → su cierre',r);
await p.close()}
ok(!errs.length,'sin errores',errs);console.log(nOK+' OK · '+nF+' FAIL');await b.close()})();
