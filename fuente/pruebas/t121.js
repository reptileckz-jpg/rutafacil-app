/* 121 · 💰 Cuadre: un día completo con sus números exactos (ventas, crédito, ganancia, gastos, desgaste, sueldos, merma y neto), fotos, taras, semana, mes y calculadora de desgaste */
const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();let nOK=0,nF=0;const ok=(c,m,x)=>{c?nOK++:nF++;console.log((c?'OK   ':'FAIL ')+m+(x!==undefined?' '+JSON.stringify(x).slice(0,600):''))};
const p=await (await b.newContext({viewport:{width:390,height:844}})).newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));p.on('dialog',d=>d.accept());await p.addInitScript(()=>{window.__pnTest=1;window.__hora93=12});
await p.goto('file:///mnt/user-data/outputs/platanos-primera-vez.html');await p.waitForTimeout(900);const ev=(f,a)=>p.evaluate(f,a);let r;
const IMG='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==';
await ev((IMG)=>{TODAY=new Date('2026-11-18T12:00:00');var U=S.setup;U.veh=[{n:'Camioneta Uno',pl:'AAA1',plEdo:'Baja California',comb:'Gasolina',img:0,odo:1000}];U.per=[{n:'Danu',puesto:'chofer',tel:'1'},{n:'Pepe',puesto:'bodega',tel:'2'}];
 U.cli=[{n:'Doña Mary',a:'x',tel:'6640000001',dias:[0,1,2,3,4,5,6],cred:0,vac:0,ch:'0'},{n:'Lupe',a:'y',tel:'6640000002',dias:[0,1,2,3,4,5,6],cred:0,vac:0,ch:'0'},{n:'Toño',a:'z',tel:'6640000003',dias:[0,1,2,3,4,5,6],cred:300,vac:0,ch:'0'}];U.prov=[];S.precio.R=275;S.precio.M=20;suAplicar();
 var g=n=>S.choferes.filter(c=>c.n===n)[0],D=g('Danu'),P=g('Pepe');window.__D=D.id;D.ing='2026-01-05';P.ing='2026-01-05';D.sz.tipo='semana';D.sz.monto='1800';P.sz.tipo='semana';P.sz.monto='1200';
 S.cargas.push({id:S.nextCarga++,fecha:'2026-11-18',prov:'Roly',kgR:2000,pR:10,cajas:100,kgM:0,pM:0,t:{diesel:0,comida:0,casetas:0,extra:0},extras:[],pag:0,est:'Recibida',vCaja:0,vKgM:0,mg:30,pagBase:0,trBase:0,otros:[],trMode:'kilos'});
 S.pinOk[pinKey()]=true;S.pinOk['c:'+D.id]=true;S.role='rep';S.chofHoy=D.id;chCambiar(D.id);S.vehHoy=S.veh[0].id;S.tab.rep='ruta';render();var bv=document.querySelector('[data-act="bienvgo"]');if(bv)bv.click();S.salida.ok=true;
 S.salida.fotos.frente=IMG;S.salida.fotos.odo=IMG;S.salida.fotosFin.frente=IMG;S.cierre.odoIni=1000;S.cierre.odo=1100;
 var c=S.cli;S.log.push({c:c[0].id,R:20,M:0,V:16,Vr:1,pr:275,pm:20,total:5500,pago:5500,abono:0});S.log.push({c:c[1].id,R:4,M:0,V:0,pr:275,pm:20,total:1100,pago:600,abono:0});S.log.push({c:c[2].id,R:0,M:0,V:0,pr:275,pm:20,total:0,pago:0,abono:200});
 S.gch.push({tipo:'Comida',m:150,foto:IMG});S.recs.push({total:500,litros:20,precio:25,foto:IMG,fase:'salida'});
 S.cierre.res=cierreRes();S.cierre.sent=true;S.cierre.corte=corteDatos();S.gastos.push({t:'Gasto de ruta',m:150,n:'Danu · Comida',tmp:1,f82:'2026-11-18'});S.gastos.push({t:'Combustible de reparto',m:500,n:'Danu · Gasolina 20 L',tmp:1,f82:'2026-11-18'});S.cierreReg={rec:5650,f:null};
 S.gastos.push({t:'Otro',m:100,n:'escoba',f:'2026-11-18'});S.gastos.push({t:'Vehículo: Reparación',m:1000,n:'Camioneta Uno',f:'2026-11-18'});S.gastos.push({t:'Sueldos',m:1800,n:'Sueldo de Danu',f:'2026-11-18'});
 S.mermas.push({fecha:'2026-11-18',valor:50,tipo:'Conteo',txt:'x'});S.vlVentas.push({h:'10:00',lin:[{p:'Roatán suelto',kg:10,pk:33}],tot:330,f82:'2026-11-18'})},IMG);
r=await ev(()=>{var T=cuadreDia121('2026-11-18'),o=T.ch[0];return {venta:T.venta,contado:T.contado,cred:T.cred,ab:T.ab,gan:T.gan,op:T.op,mant:T.mant,desg:T.desg,km:T.km,suT:T.suT,merma:T.merma,neto:T.neto,deb:T.deb,ent:T.ent,rec:T.rec,ch:{gan:o.gan,gasT:o.gasT,desg:o.desg,sueldo:o.sueldo,neto:o.neto,cred:o.creditos,taras:o.taras,ab:o.abonos}}});
ok(r.venta===6930&&r.contado===6430&&r.cred===500&&r.ab===200,'121 · ventas $6,930 (de contado $6,430 · a crédito $500) y abonos de antes $200',r);
ok(r.gan===2030,'121 · ganancia de la fruta $2,030 = 24 cajas × ($275 − $200 que costó) + venta en bodega $230',r.gan);
ok(r.op===750&&r.mant===1000,'121 · gastos de operación $750 (ruta $650 + escoba $100); sin el pago de sueldos y la reparación va aparte (del fondo del desgaste)',{op:r.op,mant:r.mant});
ok(r.km===100&&r.desg===70,'121 · desgaste: 100 km × $0.70 = $70 (el desgaste inicial que pidió Ricardo)',{km:r.km,desg:r.desg});
ok(r.suT===500&&r.merma===50,'121 · sueldos del día $500 (Danu $1,800÷6 + Pepe $1,200÷6) y merma $50',{su:r.suT,merma:r.merma});
ok(r.neto===660,'121 · NETO del día $660 = 2,030 − 750 − 70 − 500 − 50',r.neto);
ok(r.deb===5650&&r.ent===5650&&r.rec===5650,'121 · cuadre del dinero: debía entregar $5,650, entregó $5,650, recibiste $5,650',r);
ok(r.ch.gan===1800&&r.ch.gasT===650&&r.ch.desg===70&&r.ch.sueldo===300&&r.ch.neto===780,'121 · lo que dejó la ruta de Danu: 1,800 − 650 − 70 − 300 = $780',r.ch);
ok(r.ch.cred.length===1&&r.ch.cred[0].n==='Lupe'&&r.ch.cred[0].m===500&&r.ch.ab.length===1&&r.ch.ab[0].n==='Toño','121 · clientes a crédito (Lupe $500) y abonos (Toño $200)',r.ch);
ok(r.ch.taras.length===2&&r.ch.taras[0].neto===4&&r.ch.taras[1].neto===4,'121 · taras prestadas: Doña Mary 4 (dejó 20, recogió 16) y Lupe 4',r.ch.taras);
// Inicio: arriba
r=await ev(()=>{S.role='admin';S.tab.admin='inicio';render();var x=[...document.querySelectorAll('button')].filter(b=>/Después/.test(b.innerText))[0];if(x)x.click();render();var m=document.querySelector('main'),k=[...m.children].map(e=>e.dataset.x||e.dataset.key||e.className.split(' ')[0]),c=document.querySelector('[data-x="cuad121"]');return {k:k.slice(0,5),t:c&&c.innerText.replace(/\n/g,' | ')}});
ok(/Cuadre de hoy/.test(r.t||'')&&/\$660/.test(r.t)&&/Vendido \$6,930/.test(r.t),'121 · Inicio: "💰 Cuadre de hoy" con el neto, lo vendido y la ganancia',r.t);
ok(r.k.indexOf('cuad121')>-1&&r.k.indexOf('cuad121')<3,'121 · y va arriba en Inicio',r.k);
// la pantalla del cuadre
r=await ev(()=>{document.querySelector('[data-act="cu121ver"]').click();return document.querySelector('main').innerText});
ok(/💰 Cuadre/.test(r)&&/Neto\s*\$660/.test(r)&&/Ganancia de la fruta[\s\S]{0,60}\$2,030/.test(r)&&/Gastos de operación\s*\$750/.test(r)&&/Desgaste de vehículos\s*100 km\s*\$70/.test(r)&&/Sueldos[\s\S]{0,60}\$500/.test(r),'121 · la pantalla del Cuadre trae todo el desglose',(r.match(/Neto[\s\S]{0,700}/)||[''])[0].slice(0,700));
ok(/Servicios y reparaciones de vehículos: \$1,000/.test(r)&&/Recibiste de los cierres\s*\$5,650/.test(r)&&/Efectivo en caja ahora/.test(r),'121 · aparte las reparaciones (fondo del desgaste) y el cuadre del dinero con la caja');
ok(/Danu/.test(r)&&/Cierre 1/.test(r)&&/Lo que dejó su ruta\s*\$780/.test(r)&&/Clientes a crédito \(1\)/.test(r)&&/Taras \(2\)/.test(r)&&/Gastos de su ruta \(2\)/.test(r)&&/Código del corte/.test(r),'121 · la tarjeta de Danu: su cierre, crédito, taras, gastos y lo que dejó su ruta');
ok(/Venta en bodega/.test(r)&&/Sueldos del día de quien no salió a ruta[\s\S]{0,40}Pepe/.test(r),'121 · venta en bodega y el sueldo de Pepe (bodega)');
// fotos: se ven al abrirlas
r=await ev(async()=>{var d=document.querySelector('details[data-k="cu121c'+window.__D+'f1"]');d.open=true;d.dispatchEvent(new Event('toggle'));await new Promise(r=>setTimeout(r,100));var m=document.querySelector('main'),t=m.innerText;return {imgs:m.querySelectorAll('[data-act="foto121"] img').length,t:/Vehículo al salir/.test(t)&&/Vehículo al llegar/.test(t)&&/Tickets/.test(t)&&/Odómetro/.test(t)}});
ok(r.imgs===5&&r.t,'121 · fotos del cierre: vehículo al salir (frente y odómetro), al llegar y los 2 tickets',r);
// semana y mes: los sueldos cuentan cada día trabajado aunque no haya ventas
r=await ev(()=>{S.cu121p='semana';render();var a=document.querySelector('main').innerText;S.cu121p='mes';render();var m=document.querySelector('main').innerText;S.cu121p='dia';render();var w=cuadreRango121('2026-11-16','2026-11-22'),mm=cuadreRango121('2026-11-01','2026-11-30');return {a:/Semana del lun 16 nov al dom 22 nov/.test(a)&&/Neto\s*−\$340/.test(a)&&/Día por día/.test(a)&&/Por chofer/.test(a),m:/Nov 2026/.test(m)&&/Neto\s*−\$6,340/.test(m),w:{su:w.suT,neto:w.neto,dias:w.dias.length},mm:{su:mm.suT,neto:mm.neto}}});
ok(r.a&&r.m&&r.w.su===1500&&r.w.neto===-340&&r.w.dias===3&&r.mm.su===7500&&r.mm.neto===-6340,'121 · semana: lun a hoy, sueldos de 3 días ($1,500) → neto −$340; mes: 15 días trabajados ($7,500) → −$6,340; con "Día por día" y "Por chofer"',r);
// calculadora de desgaste
r=await ev(()=>{var vh=S.veh[0];dcAbre121(vh.id);var o=S.dc121.o;o.it.llantas={c:'8000',km:'40000'};o.it.aceite={c:'1200',km:'10000'};o.dep={valor:'300000',venta:'100000',km:'200000'};dcPon121();var t=document.getElementById('dc121ov').innerText;document.querySelector('[data-act="dc121ok"]').click();return {t:/1\.32 por km/.test(t),desg:vh.desg,calc:!!vh.desgCalc120,neto:cuadreDia121('2026-11-18').neto}});
ok(r.t&&r.desg===1.32&&r.calc&&r.neto===598,'121 · calculadora de desgaste: llantas $8,000/40,000 km + aceite $1,200/10,000 km + valor que pierde → $1.32 por km; el neto se recalcula ($598)',r);
// Más
r=await ev(()=>{S.tab.admin='mas';render();return [...document.querySelectorAll('.mas92 button')].map(x=>x.dataset.t||x.dataset.act)});ok(r.indexOf('cu121ver')>-1,'121 · en Más: "💰 Cuadre"',r);
ok(!errs.length,'sin errores de página',errs.slice(0,3));
console.log(nOK+' OK · '+nF+' FAIL');await b.close()})();
