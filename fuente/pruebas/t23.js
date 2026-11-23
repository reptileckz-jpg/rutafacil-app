/* 23 · antes de iniciar el día, la pestaña Entrega no arma la entrega del primer cliente ni pregunta "¿Dejas esto a medio llenar?" */
const {chromium}=require('playwright');let nOK=0,nF=0;const ok=(c,m,x)=>{c?nOK++:nF++;console.log((c?'OK   ':'FAIL ')+m+(x!==undefined?' '+JSON.stringify(x).slice(0,350):''))};
(async()=>{const b=await chromium.launch();const errs=[];
for(const arch of ['prototipo-platanos.html','platanos-primera-vez.html']){
const p=await (await b.newContext({viewport:{width:412,height:900}})).newPage();p.on('pageerror',e=>errs.push(e.message));p.on('dialog',d=>d.accept());
await p.addInitScript(()=>{window.__pnTest=1;window.__hora93=9});await p.goto('file:///mnt/user-data/outputs/'+arch);await p.waitForTimeout(1100);const ev=(f,a)=>p.evaluate(f,a);let r;
const tab=t=>ev(t=>{var b=document.createElement('button');b.dataset.act='tab';b.dataset.t=t;document.body.appendChild(b);b.click();b.remove();return {tab:S.tab.rep,modal:!!S.modal,borr:!!(S.borr&&S.borr.ent),m:document.querySelector('main').innerText}},t);
await ev(()=>{var bv=document.getElementById('bienv');if(bv)bv.remove();if(S.setup&&!S.setup.fin){var U=S.setup;U.veh=[{n:'Camioneta Uno',pl:'AAA1',plEdo:'Baja California',comb:'Gasolina',img:0,odo:1000}];U.per=[{n:'Danu',puesto:'chofer',tel:'1'}];U.cli=[{n:'Benavides',a:'x',tel:'1',dias:[0,1,2,3,4,5,6],cred:0,vac:0,ch:'0'},{n:'Don Beto',a:'y',tel:'2',dias:[0,1,2,3,4,5,6],cred:0,vac:0,ch:'0'}];U.prov=[];S.precio.R=275;S.precio.M=20;suAplicar();_pin.modo=null}
 S.tutVisto={rep:true,admin:true};S.modal=null;S.borr={};var D=S.choferes.filter(c=>esCh(c)&&!esAdm(c))[0];S.role='rep';S.chofHoy=+D.id;arLoad(chNuevo(+D.id));S.pinOk[pinKey()]=true;S.pinOk['c:'+D.id]=true;S.bienv={};S.bienv[S.chofHoy]=true;S.tab.rep='ruta';render()});
r=await tab('entrega');
ok(/Primero inicia el reparto/.test(r.m)&&!/Ubicación de/.test(r.m),arch+' · sin iniciar el día, Entrega solo dice "Primero inicia el reparto" (sin la ubicación del primer cliente)',r.m.slice(0,200));
r=await ev(()=>{S.d&&(S.d.R=7);return 1});r=await tab('viaje');
ok(r.tab==='viaje'&&!r.modal&&!r.borr,arch+' · al cambiar de pestaña no pregunta "¿Dejas esto a medio llenar?" ni guarda "Sin terminar"',r);
r=await ev(()=>{S.cierre.odo='';S.tab.rep='cierre';render();var m=document.querySelector('main').innerText;return {m,wz:!!document.querySelector('main .wz-hd'),odo:S.cierre.odo}});
ok(/Todavía no inicias el día/.test(r.m)&&!/Odómetro final|Revisa el kilometraje/.test(r.m)&&!r.wz&&!r.odo,arch+' · sin iniciar el día, Cierre dice "Todavía no inicias el día" (sin odómetro ni kilometraje)',r.m.slice(0,200));
r=await ev(()=>{document.querySelector('[data-x="cie23"] [data-act="tab"]').click();return S.tab.rep});ok(r==='ruta',arch+' · "Ir a Ruta" lleva a Ruta',r);
r=await ev(()=>{S.borr={ent:{c:S.stops[0].c,cur:0,d:JSON.parse(JSON.stringify(S.d||{}))}};S.tab.rep='ruta';render();var b=document.querySelector('[data-act="borrir"][data-k="ent"]');if(b)b.click();return {hay:!!b,tab:S.tab.rep}});
ok(r.hay&&r.tab==='ruta',arch+' · un "Sin terminar" viejo: "Continuar" no abre la entrega hasta iniciar el día',r);
/* ya iniciado: abrir la entrega y salir sin tocar nada no pregunta */
r=await ev(()=>{S.borr={};S.salida.ok=true;S.inv.reparto=20;S.tab.rep='ruta';render();var bt=document.createElement('button');bt.dataset.act='entregar';bt.dataset.i='0';document.querySelector('main').appendChild(bt);bt.click();bt.remove();return S.tab.rep});
r=await tab('viaje');ok(r.tab==='viaje'&&!r.modal,arch+' · ya iniciado: abrir una entrega y salir sin tocar nada no pregunta',r);
r=await ev(()=>{S.tab.rep='entrega';render();S.d.R=3;var b=document.createElement('button');b.dataset.act='tab';b.dataset.t='viaje';document.body.appendChild(b);b.click();b.remove();return {modal:!!S.modal,tab:S.tab.rep}});
ok(r.modal,arch+' · ya iniciado y con algo escrito: sí pregunta (como siempre)',r);
await p.close()}
ok(!errs.length,'sin errores',errs);console.log(nOK+' OK · '+nF+' FAIL');await b.close()})();
