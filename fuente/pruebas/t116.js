/* 116 · tope de cajas vacías del chofer: entre todos sus clientes no pueden deberle más de 20 (Ajustes y por chofer) */
const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();let nOK=0,nF=0;const ok=(c,m,x)=>{c?nOK++:nF++;console.log((c?'OK   ':'FAIL ')+m+(x!==undefined?' '+JSON.stringify(x).slice(0,400):''))};
const p=await (await b.newContext({viewport:{width:390,height:844}})).newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));await p.addInitScript(()=>{window.__pnTest=1});
await p.goto('file:///mnt/user-data/outputs/platanos-primera-vez.html');await p.waitForTimeout(900);const ev=(f,a)=>p.evaluate(f,a);let r;
await ev(()=>{var U=S.setup;U.veh=[{n:'Camioneta Uno',pl:'AAA1',plEdo:'Baja California',comb:'Gasolina',img:0,odo:1000}];U.per=[{n:'Danu',puesto:'chofer',tel:'1'}];U.cli=[{n:'Doña Mary',a:'x',tel:'6640000001',dias:[0,1,2,3,4,5,6],cred:0,vac:0,ch:'0'},{n:'Abarrotes Lupe',a:'y',tel:'6640000002',dias:[0,1,2,3,4,5,6],cred:0,vac:0,ch:'0'}];U.prov=[];S.precio.R=275;S.precio.M=20;suAplicar();
 var id=S.choferes.filter(c=>c.n==='Danu')[0].id;S.pinOk[pinKey()]=true;S.pinOk['c:'+id]=true;S.role='rep';S.chofHoy=id;chCambiar(id);S.vehHoy=S.veh[0].id;S.tab.rep='ruta';render();var bv=document.querySelector('[data-act="bienvgo"]');if(bv)bv.click();S.salida.ok=true;S.inv.reparto=30;
 var a=S.cli[0],c=S.cli[1];a.chofer=id;c.chofer=id;a.vac=12;a.vacDesde=iso(TODAY);c.vac=4;c.vacDesde=iso(TODAY);c.credOk=true;S.stops=[{c:c.id}];S.cur=0;S.tab.rep='entrega';resetDraft(c);S.d.R=6;S.d.V=0;S.d.mode='todo';render()});
r=await ev(()=>({tope:tarTope116(chofHoyObj()),v:entValida(),lin:(document.getElementById('vac115')||{}).innerText}));
ok(r.tope===20,'116 · el tope de inicio es 20 cajas',r.tope);
ok(r.v&&r.v[0]==='#dV'&&/ya te deben 16 cajas vacías\. Tu tope es 20/.test(r.v[1]),'116 · deja 6 y no recoge (12 + 4 + 6 = 22): no deja guardar, como el tope de dinero',r.v);
ok(/te deberían 22 de 20 cajas · ya no puedes dejar más/.test(r.lin||''),'116 · en "Cajas vacías" se ve en rojo cuántas le deberían',r.lin);
r=await ev(()=>{S.d.V=2;render();return {v:entValida(),lin:document.getElementById('vac115').innerText}});
ok(r.v===null&&/te deberían 20 de 20 cajas/.test(r.lin)&&!/ya no puedes/.test(r.lin),'116 · recoge 2 vacías (justo 20): sí deja guardar',r);
r=await ev(()=>{S.cli[0].vac=30;S.d.R=4;S.d.V=4;render();return entValida()});
ok(r===null,'116 · si ya está pasado pero en esta entrega no le deja más cajas, sí deja entregar',r);
r=await ev(()=>{S.d.R=4;S.d.V=3;render();return entValida()});
ok(r&&/Tu tope es 20/.test(r[1]),'116 · pasado del tope, dejarle aunque sea 1 caja más ya no se puede',r);
r=await ev(()=>{var ch=chofHoyObj();ch.tarMax116='40';var a=entValida();ch.tarMax116='';var b2=tarTope116(ch);ch.tarMax116=null;S.cfg.tarCh116='';var c2=entValida(),t=tarTope116(ch);S.cfg.tarCh116=null;return {a,b2,c2,t}});
ok(r.a===null,'116 · con tope propio del chofer (40) sí deja',r);
ok(r.c2===null&&r.t===0,'116 · Ajustes vacío = sin tope',r);
// guardar con el tope bien: sale la ventana de guardar
r=await ev(async()=>{S.cli[0].vac=12;S.d.R=6;S.d.V=2;S.d._deb109='no';S.d._tar72='no';render();var n0=S.log.length;document.querySelector('[data-act="entconf"]').click();await new Promise(r=>setTimeout(r,300));var g=document.querySelector('[data-act="guardar"]');if(g)g.click();await new Promise(r=>setTimeout(r,500));return {log:S.log.length-n0,vac:S.cli[1].vac}});
ok(r.log===1&&r.vac===8,'116 · al guardar dentro del tope: el cliente queda debiendo 8 cajas',r);
// admin: Ajustes y ficha del chofer
r=await ev(()=>{S.role='admin';var ch=S.choferes.filter(c=>c.n==='Danu')[0];var h=chCredCard(ch);var d=document.createElement('div');d.innerHTML=h;document.body.appendChild(d);var t=d.innerText;var i=d.querySelector('[data-chtar116]');i.value='25';i.dispatchEvent(new Event('change',{bubbles:true}));d.remove();return {t,top:ch.tarMax116,hist:S.hist.slice(-3).map(h=>h.x).join(' | ')}});
ok(/Tope de cajas vacías de todos sus clientes/.test(r.t)&&/le deben 20 de 20 cajas vacías/.test(r.t),'116 · en la ficha del chofer: su tope de cajas y cuántas le deben',r.t);
ok(r.top==='25'&&/tope de cajas vacías de Danu: 20 → 25/.test(r.hist),'116 · el admin le cambia el tope a un chofer y queda en el historial',r);
ok(!errs.length,'sin errores de página',errs.slice(0,3));
console.log(nOK+' OK · '+nF+' FAIL');await b.close()})();
