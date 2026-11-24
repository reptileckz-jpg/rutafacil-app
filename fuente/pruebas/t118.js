/* 118 · sueldos: semana dom–sáb que se paga el sábado, faltas, descanso, ingreso a media semana, vacaciones, aguinaldo y finiquito */
const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();let nOK=0,nF=0;const ok=(c,m,x)=>{c?nOK++:nF++;console.log((c?'OK   ':'FAIL ')+m+(x!==undefined?' '+JSON.stringify(x).slice(0,400):''))};
const p=await (await b.newContext({viewport:{width:390,height:844}})).newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));p.on('dialog',d=>d.accept());await p.addInitScript(()=>{window.__pnTest=1});
await p.goto('file:///mnt/user-data/outputs/platanos-primera-vez.html');await p.waitForTimeout(900);const ev=(f,a)=>p.evaluate(f,a);let r;
const dia=s=>ev(s=>{TODAY=new Date(s+'T12:00:00');render()},s);
await ev(()=>{var U=S.setup;U.veh=[{n:'Camioneta Uno',pl:'AAA1',plEdo:'Baja California',comb:'Gasolina',img:0,odo:1000}];U.per=[{n:'Danu',puesto:'chofer',tel:'1'},{n:'Pepe',puesto:'bodega',tel:'2',ing:'2026-01-05'},{n:'Lalo',puesto:'bodega',tel:'3'}];U.cli=[{n:'Doña Mary',a:'x',tel:'6640000001',dias:[0,1,2,3,4,5,6],cred:0,vac:0,ch:'0'}];U.prov=[];S.precio.R=275;S.precio.M=20;suAplicar();S.role='admin';S.pinOk[pinKey()]=true;S.popVisto={admin:iso(TODAY)}});
r=await ev(()=>S.choferes.filter(c=>c.n==='Pepe')[0].ing);ok(r==='2026-01-05','118 · el asistente guarda "Empezó a trabajar el"',r);
await dia('2026-11-21');// sábado
await ev(()=>{var g=n=>S.choferes.filter(c=>c.n===n)[0];var D=g('Danu'),P=g('Pepe'),L=g('Lalo');D.ing='2025-03-10';D.sz.tipo='base';D.sz.base='1200';D.sz.comModo='unidad';D.sz.comC='5';D.sz.comK='0';S.cli[0].chofer=D.id;
 P.sz.tipo='semana';P.sz.monto='1800';L.sz.tipo='semana';L.sz.monto='1800';L.ing='2026-11-19';
 S.rutasHist=[{f:'2026-11-17',ch:D.id,log:[{R:10,M:0,total:2750,pago:2750,abono:0}]},{f:'2026-11-10',ch:D.id,log:[{R:50,M:0,total:13750,pago:13750,abono:0}]}];window.__ids={D:D.id,P:P.id,L:L.id}});
const k=(n)=>ev(n=>{var c=S.choferes.filter(x=>x.n===n)[0];var k=szCalc(c);return {ini:k.ini,fin:k.fin,hasta:k.hasta,prog:k.prog,dias:k.dias,base:k.base,desc:k.desc,prima:Math.round(k.prima*100)/100,com:k.com,cv:k.cv,pagar:Math.round(k.pagar*100)/100,vacio:k.vacio}},n);
r=await k('Pepe');ok(r.ini==='2026-11-15'&&r.fin==='2026-11-21'&&r.prog===6&&r.pagar===1800,'118 · la semana va del dom 15 al sáb 21 (descansa domingo): 6 días, $1,800',r);
r=await k('Danu');ok(r.com===50&&r.cv===10&&r.pagar===1250,'118 · la comisión se suma de toda la semana (del historial de rutas), no solo de hoy; la semana pasada no cuenta',r);
await ev(()=>{var P=S.choferes.filter(c=>c.n==='Pepe')[0];marcaPon118(P,'2026-11-18','falta');marcaPon118(P,'2026-11-20','vac')});
r=await k('Pepe');ok(r.dias===5&&r.desc===300&&r.prima===64.29&&r.pagar===1564.29,'118 · faltó el miércoles (−$300) y el viernes fue de vacaciones (pagado + prima 25%)',r);
r=await ev(()=>{S.tab.admin='personal';S.per92='sue';S.szOpen=__ids.P;render();var t=document.querySelector('main').innerText;return t});
ok(/Del dom 15 nov al sáb 21 nov/.test(r)&&/Días de trabajo\s*5 de 6 · faltó mié 18 nov/.test(r)&&/Faltas \(1 × \$300\)/.test(r)&&/Vacaciones: 1 día/.test(r),'118 · el desglose dice la semana, los días y las faltas',r.slice(r.indexOf('Desglose'),r.indexOf('Desglose')+300));
ok(/Datos de trabajo/.test(r)&&/Empezó a trabajar el/.test(r)&&/Lleva 10 meses/.test(r)&&/Descansa el/.test(r)&&/Dejó de trabajar el/.test(r),'118 · tarjeta "Datos de trabajo": ingreso con antigüedad, descanso, faltas y baja');
// pagar
r=await ev(async()=>{var P=S.choferes.filter(c=>c.n==='Pepe')[0],g0=S.gastos.length;document.querySelector('[data-act="pagarsz"][data-id="'+P.id+'"]').click();await new Promise(r=>setTimeout(r,100));document.querySelector('[data-act="confok"]').click();await new Promise(r=>setTimeout(r,150));var pg=S.pagosSueldo[S.pagosSueldo.length-1];return {n:pg.n,m:Math.round(pg.m*100)/100,hasta:P.pagoHasta118,gasto:S.gastos.length-g0,vac:szCalc(P).vacio,btn:document.querySelector('[data-act="pagarsz"][data-id="'+P.id+'"]').innerText}});
ok(/Semana del dom 15 nov al sáb 21 nov · 1 falta/.test(r.n)&&r.m===1564.29&&r.hasta==='2026-11-21'&&r.gasto===1,'118 · al pagar queda "Semana del dom 15 al sáb 21 · 1 falta" y hasta qué día se le pagó',r);
ok(r.vac&&/Ya se le pagó esta semana/.test(r.btn),'118 · después de pagar: "Ya se le pagó esta semana" (no se paga dos veces)',r.btn);
// la semana siguiente, a media semana
await dia('2026-11-25');r=await k('Pepe');ok(r.ini==='2026-11-22'&&r.hasta==='2026-11-25'&&r.prog===3&&r.pagar===900,'118 · el miércoles siguiente: lleva dom 22 (descanso) a mié 25 = 3 días, $900',r);
// cambia su descanso esa semana al miércoles: el domingo cuenta como día normal
await ev(()=>{var P=S.choferes.filter(c=>c.n==='Pepe')[0];P.descW118={'2026-11-28':3}});r=await k('Pepe');ok(r.prog===3&&r.pagar===900,'118 · si esa semana descansa el miércoles, el domingo trabajado cuenta como día normal',r);
await ev(()=>{S.choferes.filter(c=>c.n==='Pepe')[0].descW118={}});
// entra a media semana
await dia('2026-11-21');r=await k('Lalo');ok(r.ini==='2026-11-19'&&r.prog===3&&r.pagar===900,'118 · Lalo entró el jueves 19: primera semana proporcional (3 días, $900)',r);
r=await ev(()=>{S.szOpen=__ids.L;render();return document.querySelector('main').innerText});ok(/Entró el jue 19 nov/.test(r),'118 · el desglose lo dice: "Entró el jue 19: solo cuentan sus días"');
// ¿faltó hoy?
r=await ev(()=>{window.__falta118=1;S.tab.admin='inicio';render();var c=document.querySelector('[data-x="falta118"]');return c&&c.innerText});
ok(/¿Danu faltó hoy\?/.test(r||''),'118 · a mediodía, si un chofer no ha salido a su ruta: "¿Danu faltó hoy?"',r);
r=await ev(()=>{document.querySelector('[data-act="asis118"][data-v="falta"]').click();var D=S.choferes.filter(c=>c.n==='Danu')[0];return {f:D.faltas118,card:!!document.querySelector('[data-x="falta118"]')}});
ok(r.f&&r.f.indexOf('2026-11-21')>-1&&!r.card,'118 · "Sí, faltó": queda la falta y se quita el aviso',r);
// descansos de la semana que viene (el sábado)
r=await ev(()=>{var c=document.querySelector('[data-x="desc118"]');return c&&c.innerText});ok(/Descansos de la semana/.test(r||'')&&/Del dom 22 nov al sáb 28 nov/.test(r)&&/Pepe/.test(r),'118 · el sábado pregunta los descansos de la semana que viene',r);
r=await ev(()=>{document.querySelector('[data-act="descw118"][data-id="'+__ids.P+'"][data-v="2"]').click();document.querySelector('[data-act="descok118"]').click();var P=S.choferes.filter(c=>c.n==='Pepe')[0];return {w:P.descW118,ok:S.cfg.descOk118,card:!!document.querySelector('[data-x="desc118"]'),d:descDe118(P,'2026-11-24')}});
ok(r.w['2026-11-28']===2&&r.ok==='2026-11-28'&&!r.card&&r.d===2,'118 · Pepe pidió descansar el martes esa semana: queda solo para esa semana',r);
// vacaciones de ley
r=await ev(()=>[1,2,3,4,5,6,10,11,16].map(vacLey118));ok(JSON.stringify(r)==='[12,14,16,18,20,22,22,24,26]','118 · días de vacaciones de la ley (12, 14, 16, 18, 20, 22…)',r);
r=await ev(()=>{var D=S.choferes.filter(c=>c.n==='Danu')[0];return vacInfo118(D)});ok(r.a===1&&r.tiene===12,'118 · Danu (entró mar 2025) ya tiene 12 días de vacaciones',r);
// aguinaldo
r=await ev(()=>{var g=n=>agui118(S.choferes.filter(c=>c.n===n)[0],2026);return {P:g('Pepe'),L:g('Lalo'),D:g('Danu')}});
ok(Math.abs(r.P.m-15*1800/7*360/365)<0.02&&Math.abs(r.D.m-15*1200/7*364/365)<0.02&&r.P.fal===1&&r.D.fal===1,'118 · aguinaldo: 15 días de sueldo base (sin comisión), proporcional si entró en el año, y las faltas lo bajan',r);
await dia('2026-12-05');r=await ev(()=>{S.tab.admin='inicio';render();var c=document.querySelector('[data-x="agui118"]');return c&&c.innerText});ok(/Aguinaldo 2026/.test(r||'')&&/antes del 20 de diciembre/.test(r),'118 · en diciembre: aviso del aguinaldo',r);
r=await ev(()=>{S.tab.admin='personal';S.per92='sue';S.szOpen=__ids.D;render();var g0=S.gastos.length;/* 36: el aguinaldo se paga en partes: la mitad y luego lo que falta */document.querySelector('[data-act="ag36mitad"][data-id="'+__ids.D+'"]').click();S.rec36=null;render();document.querySelector('[data-act="ag36resto"][data-id="'+__ids.D+'"]').click();S.rec36=null;var D=S.choferes.filter(c=>c.n==='Danu')[0];var G=S.gastos.slice(g0);return {pag:D.agui118&&D.agui118[2026],g:G.length,m:Math.round(G.reduce((a,x)=>a+x.m,0)*100)/100}});
ok(r.pag==='2026-12-05'&&r.g===2&&r.m===2564.38,'118 · el aguinaldo pagado en dos partes (36) se registra como gasto de sueldos y queda pagado',r);
// baja y finiquito
await dia('2026-11-21');
r=await ev(async()=>{S.szOpen=__ids.L;render();var i=document.getElementById('baja118_'+__ids.L);i.value='2026-11-21';i.dispatchEvent(new Event('change',{bubbles:true}));await new Promise(r=>setTimeout(r,50));var L=S.choferes.filter(c=>c.n==='Lalo')[0];var F=finiq118(L);return {baja:L.baja118,F,t:(document.querySelector('main').innerText.match(/Finiquito[\s\S]{0,300}/)||[''])[0]}});
ok(r.baja==='2026-11-21'&&r.F&&r.F.sem===900&&Math.abs(r.F.ag-15*1800/7*3/365)<0.02&&r.F.vm>0&&/Pagar finiquito/.test(r.t),'118 · al darlo de baja: finiquito = su semana + aguinaldo y vacaciones proporcionales',r);
r=await ev(()=>{var L=S.choferes.filter(c=>c.n==='Lalo')[0],g0=S.gastos.length;document.querySelector('[data-act="finiq118"]').click();return {f:L.finiq118,g:S.gastos.length-g0,ph:L.pagoHasta118,vac:szCalc(L).vacio,emp:emp118().some(c=>c.n==='Lalo')}});
ok(r.f==='2026-11-21'&&r.g===1&&r.ph==='2026-11-21'&&r.vac&&!r.emp,'118 · "Pagar finiquito": queda pagado y ya no sale en avisos',r);
ok(!errs.length,'sin errores de página',errs.slice(0,3));
console.log(nOK+' OK · '+nF+' FAIL');await b.close()})();
