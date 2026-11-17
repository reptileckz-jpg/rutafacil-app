/* 8.8 · 75–78: los pendientes se resuelven y se quitan */
const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();let nOK=0,nF=0;const ok=(c,m,x)=>{c?nOK++:nF++;console.log((c?'OK   ':'FAIL ')+m+(x!==undefined?' '+JSON.stringify(x).slice(0,300):''))};
const p=await (await b.newContext({viewport:{width:400,height:860}})).newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));await p.addInitScript(()=>{window.__pnTest=1});
await p.goto('file:///mnt/user-data/outputs/platanos-primera-vez.html');await p.waitForTimeout(900);const ev=(f,a)=>p.evaluate(f,a);let r;
await ev(()=>{var U=S.setup;U.yo='Ricardo';U.veh=[{n:'Nissan NP300',pl:'A1',plEdo:'Baja California',comb:'Gasolina',img:0,odo:1000}];U.per=[{n:'Danu',puesto:'chofer',tel:'1'}];U.cli=[{n:'Fruber',a:'x',tel:'6641234567',dias:[1],cred:0,vac:0,ch:'0'}];U.prov=[{n:'El Rosca',tipo:'Macho',tel:''}];S.precio.R=300;S.precio.M=20;suAplicar();S.role='admin';S.pinOk[pinKey()]=true;S.chofHoy=null;S.chSt={}});
// 76 · informativos: no son pendientes, van a "Lo que pasó hoy"
r=await ev(()=>{S.avPrecio=['El Rosca subió el kilo de macho a $15','Danu registró una báscula nueva: Báscula Otay.','Llegó la carga de El Rosca','Danu dio de alta al cliente nuevo Fruber en su ruta'];S.tab.admin='cargas';render();return {quedan:S.avPrecio.length,act:(S.actDia||[]).filter(a=>/Rosca|báscula|Fruber/.test(a.x)).length}});
ok(r.quedan===0&&r.act>=4,'76 · lo que solo informa ya no es pendiente: pasa a "Lo que pasó hoy"',r);
// 77 · "Revisa el número": se quita al confirmar el teléfono
r=await ev(()=>{var c=S.cli.find(x=>x.n==='Fruber');S.avPrecio=['Revisa el número: Danu capturó el WhatsApp de Fruber (6641234567) en la entrega'];render();var a=S.avPrecio.length;c.telConf={tel:c.tel,t:Date.now(),q:'Ricardo'};render();return {a,b:S.avPrecio.length}});
ok(r.a===1&&r.b===0,'77 · "Revisa el número": se quita en cuanto confirmas el teléfono',r);
// 75 · Ir / ✓ Listo / Recordar mañana
r=await ev(()=>{S.avPrecio=['Danu necesita permiso para algo raro','URGENTE: Pagar a El Rosca $5,000 (vence hoy)'];S.tab.admin='mas';render();var c=document.querySelector('[data-x="pnd86"]');var L=pend86('mas');var t=S.tab.admin;
 var out={n:L.length};['inicio','cargas','clientes','gastos','bodega','mas'].forEach(tb=>{S.tab.admin=tb;render();var cc=document.querySelector('[data-x="pnd86"]');if(cc)out[tb]={ok:cc.querySelectorAll('[data-act="av88ok"]').length,m:cc.querySelectorAll('[data-act="av88m"]').length,ir:cc.querySelectorAll('[data-act="avgo"]').length}});return out});
ok(Object.keys(r).some(k=>r[k]&&r[k].ok>=1)&&Object.keys(r).some(k=>r[k]&&r[k].m>=1),'75 · cada pendiente trae "Ir" y "✓ Listo"; los de dinero "Recordar mañana"',r);
r=await ev(()=>{var x='Danu necesita permiso para algo raro';var tb=avDestino(x).t;S.tab.admin=tb==='inicio'?'mas':tb;render();var b=document.querySelector('[data-act="av88ok"][data-k="'+encodeURIComponent(x)+'"]');if(!b)return {sin:true,tb};b.click();return {queda:avisos().indexOf(x)>-1,act:(S.actDia||[]).some(a=>/Visto: Danu necesita/.test(a.x))}});
ok(r.sin||(!r.queda&&r.act),'75 · "✓ Listo" lo quita y lo guarda en "Lo que pasó hoy"',r);
r=await ev(()=>{var x='URGENTE: Pagar a El Rosca $5,000 (vence hoy)';S.avLater88={};S.avLater88[x]=iso(new Date(TODAY.getTime()+864e5));var hoyNo=avisos().indexOf(x)<0;var T0=TODAY;TODAY=new Date(TODAY.getTime()+864e5);var manSi=avisos().indexOf(x)>-1;TODAY=T0;return {hoyNo,manSi}});
ok(r.hoyNo&&r.manSi,'75 · "Recordar mañana": hoy se quita y mañana vuelve',r);
// 78 · falla del vehículo
r=await ev(()=>{var x='Salió con una falla: Nissan NP300 (Danu): Tablero y freno: check engine encendido';S.avPrecio=[x];S.tab.admin='vehiculos';render();if(!document.querySelector('[data-act="fa88"]')){S.tab.admin='mas';render()}var b=document.querySelector('[data-act="fa88"][data-v="rep"]');if(!b)return 'sin tarjeta';b.click();var i=document.getElementById('fa88c');i.value='850';document.querySelector('[data-act="fa88"][data-v="rep2"]').click();var v=S.veh[0];return {queda:S.avPrecio.length,taller:v.taller.slice(-1)[0],gasto:S.gastos.some(g=>g.m===850&&g.veh===v.id)}});
ok(r.queda===0&&r.taller&&r.taller.costo===850&&r.gasto,'78 · falla → "Ya se reparó" con costo: va al taller y a gastos, y se quita',r);
r=await ev(()=>{var x='Salió con una falla: Nissan NP300 (Danu): Llantas: lisa';S.avPrecio=[x];render();var b=document.querySelector('[data-act="fa88"][data-v="taller"]');b.click();return {fuera:S.veh[0].fuera,queda:S.avPrecio.length}});ok(r.fuera&&r.queda===0,'78 · "Mandarlo al taller": queda fuera de servicio y se quita',r);
r=await ev(()=>{S.veh[0].fuera=false;var x='Salió con una falla: Nissan NP300 (Danu): Luces: foco fundido';S.avPrecio=[x];render();document.querySelector('[data-act="fa88"][data-v="sigue"]').click();return {bit:(S.veh[0].bit||[]).some(b=>/puede seguir/.test(b.x)),queda:S.avPrecio.length}});ok(r.bit&&r.queda===0,'78 · "Puede seguir así": se anota en la bitácora y se quita',r);
ok(errs.length===0,'sin errores',errs);
console.log(nOK+' OK · '+nF+' FAIL');await b.close()})();
