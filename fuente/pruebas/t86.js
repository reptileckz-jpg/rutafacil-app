/* 8.6 · 68 taras que ya debían los clientes · 69 qué pendientes son los numeritos */
const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();let nOK=0,nF=0;const ok=(c,m,x)=>{c?nOK++:nF++;console.log((c?'OK   ':'FAIL ')+m+(x!==undefined?' '+JSON.stringify(x).slice(0,300):''))};
const p=await (await b.newContext({viewport:{width:400,height:860}})).newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));await p.addInitScript(()=>{window.__pnTest=1});
await p.goto('file:///mnt/user-data/outputs/platanos-primera-vez.html');await p.waitForTimeout(900);const ev=(f,a)=>p.evaluate(f,a);let r;
await ev(()=>{var U=S.setup;U.yo='Ricardo';U.veh=[{n:'NP300',pl:'A1',plEdo:'Baja California',comb:'Gasolina',img:0,odo:1}];U.per=[{n:'Danu',puesto:'chofer',tel:'1'}];U.cli=[];U.prov=[];S.inv.vacias=100;S.precio.R=300;S.precio.M=20;suAplicar();S.role='admin';S.pinOk[pinKey()]=true;S.chofHoy=null;S.chSt={}});
r=await ev(()=>({d:tarasDif86()}));ok(r.d===0,'después del asistente las taras cuadran',r);
// importar un cliente que ya debía 6 taras: sigue cuadrando
r=await ev(()=>{var c=nuevoCli({n:'Debe seis',a:'x',dias:[1],vac:6});S.cli.push(c);return {d:tarasDif86(),mov:(S.cajasMov||[]).some(m=>/ya debía Debe seis/.test(m.t))}});ok(r.d===0&&r.mov,'68 · cliente nuevo que ya debía taras: cuentan como saldo inicial y siguen cuadrando',r);
// datos viejos (de antes del arreglo): sobran 44 → tarjeta en Bodega con botón
r=await ev(()=>{S.cli[0].vac=num(S.cli[0].vac)+44;S.tab.admin='bodega';render();var c=document.querySelector('[data-x="tar86"]');return {d:tarasDif86(),c:!!c,t:c?c.innerText.slice(0,80):''}});ok(r.d===44&&r.c&&/sobran 44/.test(r.t),'68 · si ya sobraban, en Bodega lo explica: "sobran 44"',r);
r=await ev(()=>{document.querySelector('[data-act="tar86"]').click();return {d:tarasDif86(),c:!!document.querySelector('[data-x="tar86"]')}});ok(r.d===0&&!r.c,'68 · un toque y quedan como saldo inicial: ya cuadran',r);
// 69 · numeritos: lista de pendientes arriba de la sección
r=await ev(()=>{var c=S.cli[0];c.tel='';c.lat=null;S.tab.admin='clientes';render();var A=avisos().filter(x=>typeof x==='string');var L=pend86('clientes');var card=document.querySelector('[data-x="pnd86"]');return {n:L.length,card:!!card,items:card?card.querySelectorAll('[data-act="avgo"]').length:0,txt:card?card.innerText.slice(0,120):''}});
ok(r.n===0||(r.card&&r.items===r.n),'69 · en cada sección con numerito sale arriba la lista de qué pendientes son',r);
r=await ev(()=>{S.tab.admin='mas';render();var L=pend86('mas');var card=document.querySelector('[data-x="pnd86"]');return {n:L.length,card:!!card,sec:card?[...card.querySelectorAll('.sec')].map(x=>x.textContent):[]}});
ok(r.n===0||(r.card&&r.sec.length===r.n),'69 · en "Más" dice de qué sección es cada pendiente',r);
ok(errs.length===0,'sin errores',errs);
console.log(nOK+' OK · '+nF+' FAIL');await b.close()})();
