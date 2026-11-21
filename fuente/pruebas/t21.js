/* 21 · al entregar a todos: tarjeta "Terminaste tu ruta: regresa a la bodega" + Google Maps se abre solo UNA vez.
   22 · el administrador ve en "Hoy" cuando el chofer ya llegó a la bodega (GPS) con lo que trae. */
const {chromium}=require('playwright');let nOK=0,nF=0;const ok=(c,m,x)=>{c?nOK++:nF++;console.log((c?'OK   ':'FAIL ')+m+(x!==undefined?' '+JSON.stringify(x).slice(0,350):''))};
(async()=>{const b=await chromium.launch();const errs=[];
for(const arch of ['prototipo-platanos.html','platanos-primera-vez.html']){
const p=await (await b.newContext({viewport:{width:412,height:900}})).newPage();p.on('pageerror',e=>errs.push(e.message));p.on('dialog',d=>d.accept());
await p.addInitScript(()=>{window.__pnTest=1;window.__hora93=9;window.__abiertos=[];window.__fin21Abre=u=>window.__abiertos.push(u)});await p.goto('file:///mnt/user-data/outputs/'+arch);await p.waitForTimeout(1200);const ev=(f,a)=>p.evaluate(f,a);let r;
await ev(()=>{var bv=document.getElementById('bienv');if(bv)bv.remove();if(S.setup&&!S.setup.fin){var U=S.setup;U.veh=[{n:'Camioneta Uno',pl:'AAA1',plEdo:'Baja California',comb:'Gasolina',img:0,odo:1000},{n:'Camioneta Dos',pl:'BBB2',plEdo:'Baja California',comb:'Gasolina',img:0,odo:2000}];U.per=[{n:'Danu',puesto:'chofer',tel:'1'},{n:'Beto',puesto:'chofer',tel:'2'}];U.cli=[{n:'Doña Mary',a:'x',tel:'1',dias:[0,1,2,3,4,5,6],cred:0,vac:0,ch:'0'},{n:'Don Beto',a:'y',tel:'2',dias:[0,1,2,3,4,5,6],cred:0,vac:0,ch:'0'}];U.prov=[];S.precio.R=275;S.precio.M=20;suAplicar();_pin.modo=null}
 S.tutVisto={rep:true,admin:true};S.popVisto={admin:iso(TODAY)};S.atras93={};S.modal=null;S.bods=S.bods||[];if(!S.bods.length)S.bods.push({id:1,n:'Bodega'});S.bods.forEach(x=>{x.lat=19.52;x.lng=-96.93});
 var D=S.choferes.filter(c=>esCh(c)&&!esAdm(c))[0];window.__D=+D.id;var c=S.cli.filter(x=>!x.oculto);
 var o=chNuevo(+D.id);o.rutaDia80=iso(TODAY);o.salida.ok=true;o.salida.f7=iso(TODAY);o.invR=3;o.log=[{c:c[0].id,R:2,M:0,pr:275,total:550,pago:550,abono:0,V:0}];
 S.role='rep';S.chofHoy=+D.id;arLoad(o);S.pinOk[pinKey()]=true;S.pinOk['c:'+D.id]=true;S.stops=[{c:c[0].id,done:true},{c:c[1].id}];S.pos={lat:19.60,lng:-96.93};S.tab.rep='ruta';render()});
r=await ev(()=>({card:!!document.querySelector('[data-x="fin21"]')}));
ok(!r.card,arch+' · con un cliente pendiente no sale "Terminaste"',r);
/* entrega al último: nota → "Seguir con la ruta" */
r=await ev(async()=>{var c=S.cli.filter(x=>!x.oculto);S.stops[1].done=true;S.log.push({c:c[1].id,R:1,M:0,pr:275,total:275,pago:275,abono:0,V:0});S.nota={total:275,pago:275,abono:0,recibio:'x',items:[]};S.tab.rep='nota';render();
 document.querySelector('[data-act="notaseguir"]').click();await new Promise(r=>setTimeout(r,60));var d=document.querySelector('[data-x="fin21"]');return {ab:__abiertos.slice(),tab:S.tab.rep,card:d?d.innerText:'',mapa:!!document.querySelector('[data-x="fin21mapa"]')}});
ok(r.ab.length===1&&/destination=19.52,-96.93/.test(r.ab[0]),arch+' · al tocar "Seguir con la ruta" tras la última entrega se abre Google Maps a la bodega',r);
ok(r.tab==='ruta'&&/Terminaste tu ruta: regresa a la bodega/.test(r.card)&&r.mapa&&/Ya llegué: hacer mi cierre/.test(r.card),arch+' · arriba sale "🏁 Terminaste tu ruta" con "Cómo llegar" y "Ya llegué: hacer mi cierre"',r);
r=await ev(async()=>{S.tab.rep='nota';render();document.querySelector('[data-act="notaseguir"]').click();await new Promise(r=>setTimeout(r,60));return __abiertos.length});
ok(r===1,arch+' · Google Maps NO se vuelve a abrir solo (solo una vez)',r);
r=await ev(()=>{S.pos={lat:19.5201,lng:-96.9301};render();var d=document.querySelector('[data-x="fin21"]');return d?d.innerText:''});
ok(/Ya estás en la bodega/.test(r),arch+' · ya cerca de la bodega dice "✓ Ya estás en la bodega"',r);
r=await ev(()=>{document.querySelector('[data-act="fin21ci"]').click();return S.tab.rep});
ok(r==='cierre',arch+' · el botón lleva a su cierre',r);
r=await ev(()=>{S.cierre.sent=true;S.tab.rep='ruta';render();return !!document.querySelector('[data-x="fin21"]')});
ok(!r,arch+' · ya mandado el cierre, la tarjeta se quita',r);
/* 22 · administrador */
r=await ev(()=>{var D=__D;var o=arPack?arPack():null;S.cierre.sent=false;var pk=JSON.parse(JSON.stringify({rutaDia80:S.rutaDia80,salida:S.salida,log:S.log,stops:S.stops,cierre:S.cierre,invR:3,gas:S.gas||[],gastos:S.gastos||[]}));
 S.role='admin';S.encOn=false;S.chofHoy=null;S.chSt={};S.chSt[D]=Object.assign(chNuevo(D),pk);
 GPS.devs={x1:{ch:D,ult:JSON.stringify({lat:19.5203,lng:-96.9302,t:Date.now()-60000})}};S.tab.admin='inicio';var L=hoyTareas();return L.filter(t=>/^fin22/.test(t.k))});
ok(r.length===1&&/ya llegó a la bodega/.test(r[0].t)&&/\$825/.test(r[0].t)&&r[0].go==='rutas',arch+' · en "Hoy": "🏭 Danu ya llegó a la bodega · trae $825…" y lleva a Rutas',r);
r=await ev(()=>{GPS.devs.x1.ult=JSON.stringify({lat:19.60,lng:-96.93,t:Date.now()-60000});var a=hoyTareas().filter(t=>/^fin22/.test(t.k)).length;
 GPS.devs.x1.ult=JSON.stringify({lat:19.5203,lng:-96.9302,t:Date.now()-60*60000});var b2=hoyTareas().filter(t=>/^fin22/.test(t.k)).length;
 GPS.devs.x1.ult=JSON.stringify({lat:19.5203,lng:-96.9302,t:Date.now()});S.chSt[__D].stops.push({c:S.cli[0].id});var c2=hoyTareas().filter(t=>/^fin22/.test(t.k)).length;return {lejos:a,viejo:b2,pend:c2}});
ok(r.lejos===0&&r.viejo===0&&r.pend===0,arch+' · no avisa si está lejos, si la ubicación es vieja o si aún tiene clientes',r);
await p.close()}
ok(!errs.length,'sin errores',errs);console.log(nOK+' OK · '+nF+' FAIL');await b.close()})();
