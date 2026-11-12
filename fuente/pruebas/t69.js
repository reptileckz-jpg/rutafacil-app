/* 7.5 · el dinero: carga con desgaste, sueldo e imprevistos; desglose con todos los gastos; reparto; metas; comida; casetas; dedo; cuentas claras */
const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();let nOK=0,nF=0;const ok=(c,m,x)=>{c?nOK++:nF++;console.log((c?'OK   ':'FAIL ')+m+(x!==undefined?' '+JSON.stringify(x).slice(0,400):''))};
const p=await b.newPage({viewport:{width:400,height:860}});await p.addInitScript(()=>{window.__pnTest=1});const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.goto('file:///mnt/user-data/outputs/prototipo-platanos.html');await p.waitForTimeout(700);const ev=(f,a)=>p.evaluate(f,a),W=ms=>p.waitForTimeout(ms);
await ev(()=>{S.role='admin';S.pinOk[pinKey()]=true;S.popVisto={admin:iso(TODAY)};S.tutVisto={admin:true};S.cajaAyerSkip=true;S.tab.admin='cargas';render()});
const click=async sel=>ev(s=>{const e=document.querySelector(s);if(!e)return 'no '+s;e.click();return 'ok'},sel);
/* carga: roatán 2000 kg, 100 cajas a $10; chofer en camioneta */
let r=await ev(()=>{cmNuevo();var m=S.cm,ch=choferesL().filter(c=>!c.baja&&c.id!==2)[0],vh=vehAct().filter(x=>!x.fuera)[0];vh.desg=1;m.R=true;m.quien=String(ch.id);m.veh=String(vh.id);m.provR=provNames()[0];m.kgR='2000';m.cajas='100';m.pR='10';
 m.comb='3000';m._cAuto=false;m.g.bas={on:'si',m:'100'};m.g.cas={on:'si',m:'200'};m.g.com={on:'si',m:'150'};m.g.car={on:'no',m:''};render();
 var P=cmPasos();m.paso=P.indexOf('gastos');render();return {P,err:cmValida('gastos'),card:!!document.querySelector('#cmov [data-act="cm68"][data-k="impOn"]')}});
ok(r.card&&/imprevisto/.test(r.err),'gastos: pregunta si hubo imprevisto (obligatorio)',r);
await click('#cmov [data-act="cm68"][data-k="impOn"][data-v="si"]');await ev(()=>{S.cm.x68.impM='300';render()});
r=await ev(()=>cmValida('gastos'));ok(r==='','imprevisto de $300 contestado',r);
r=await ev(()=>{var m=S.cm;m.pg[cmProvs()[0][0]]={q:'todo',m:'',c:'efe'};m.llego='si';m.cal='Buena';m.mad='no';var P=cmPasos();m.paso=P.indexOf('res');render();return {err:cmValida('res'),cards:document.querySelectorAll('#cmov .c68').length,txt:document.querySelector('#cmov').innerText}});
ok(r.cards===2&&/desgaste/.test(r.err),'al final del desglose: 2 tarjetas (desgaste y sueldo), obligatorias',r.err);
ok(['Combustible','Básculas','Comida','Casetas','Imprevisto: Ponchadura'].every(w=>r.txt.indexOf(w)>-1),'desglose: cada gasto en su renglón');
await click('#cmov [data-act="cm68"][data-k="dOn"][data-v="si"]');await ev(()=>{S.cm.x68.km='300';S.cm.x68.tasa='1';render()});
await click('#cmov [data-act="cm68"][data-k="sOn"][data-v="si"]');await ev(()=>{S.cm.x68.sm='500';render()});
r=await ev(()=>{var o=cmObj(),k=cC(o);return {err:cmValida('res'),tr:trCost(o),tot:k.total,cc:k.costoCaja,trTot:trTot(o),txt:document.querySelector('#cmov').innerText}});
ok(r.err==='','tarjetas contestadas',r.err);
ok(Math.abs(r.tr-4550)<0.01,'costo del viaje = 3000+100+200+150+300 imprevisto+300 desgaste+500 sueldo = 4550',r.tr);
ok(Math.abs(r.cc-245.5)<0.01,'costo por caja = (20000+4550)/100 = 245.50',r.cc);
ok(Math.abs(r.trTot-3750)<0.01,'dinero que salió (sin desgaste ni sueldo) = 3750',r.trTot);
ok(/Desgaste al ir por la fruta \(300 km × \$1/.test(r.txt)&&/Sueldo de .* por el viaje/.test(r.txt),'desglose: desgaste y sueldo con su renglón');
ok(/Total de gastos del viaje\s*\$4,550/.test(r.txt)&&/Total del viaje\s*\$24,550/.test(r.txt),'desglose: totales cuadran con la suma');
/* imprevisto grande → mantenimiento */
r=await ev(()=>{S.cm.x68.impM='2000';var o=cmObj(),k=cC(o);render();return {tr:trCost(o),trTot:trTot(o),txt:document.querySelector('#cmov').innerText}});
ok(Math.abs(r.tr-4250)<0.01&&Math.abs(r.trTot-5450)<0.01,'imprevisto de $2,000: sale del dinero pero NO entra al costo de la fruta',r);
ok(/va al mantenimiento del vehículo/.test(r.txt),'desglose: dice que va al mantenimiento');
r=await ev(()=>{S.cm.x68.impM='300';var n0=S.cargas.length,v0=S.inv.verdes;cmGuardar();var c=S.cargas[S.cargas.length-1];return {n:S.cargas.length-n0,dsg:c.dsgM,su:c.suelM,cc:cC(c).costoCaja,dv:S.inv.verdes-v0}});
ok(r.n===1&&r.dsg===300&&r.su===500&&Math.abs(r.cc-245.5)<0.01&&r.dv===100,'carga guardada con desgaste, sueldo y costo por caja; 100 cajas a bodega',r);
/* costo exacto del viaje: respeta lo contestado (no cuenta doble) */
r=await ev(()=>{var c=S.cargas[S.cargas.length-1];c.dsgOn=false;var D=cvDef(c);c.dsgOn=true;c.suelOn=false;var D2=cvDef(c);c.suelOn=true;return {d:D.desgKm,s:D2.sueldo+D2.com}});
ok(r.d===0&&r.s===0,'"Costo exacto": si dijo No al desgaste o al sueldo, no se suman',r);
/* reparto real */
r=await ev(()=>{S.rutasHist=S.rutasHist||[];S.rutasHist.push({f:iso(TODAY),ch:1,log:[],res:{R:100,M:200,km:80,tasa68:0.6,suel68:400,g68:{tot:600,comb:500,big:[]}}});var o=rep68(30);return o});
ok(r.rutas>=1&&r.tot>0&&r.caja>0&&r.kgc>0,'costo de reparto con rutas reales',{c:r.caja,k:r.kgc,t:r.tot});
r=await ev(()=>{var o=rep68(30);return Math.abs(o.caja*o.cajas+o.kgc*o.kg-o.tot)<0.01});ok(r,'reparto: lo de roatán + lo de macho = total (cuadra)');
r=await ev(()=>{var c=S.cargas[S.cargas.length-1],k=cC(c),rp=rep68(30);return {sug:k.sug,esp:(k.costoCaja+rp.caja)*(1+num(c.mg||30)/100)}});
ok(Math.abs(r.sug-r.esp)<0.01,'precio sugerido = (puesta en bodega + repartir) × meta',r);
/* metas por fruta */
r=await ev(()=>{var c=S.cargas[S.cargas.length-1];c.kgM=100;c.pM=10;S.cfg.mgIgual=false;c.mg=30;c.mgM=50;var k=cC(c),rp=rep68(30);var h=cfield(c,'mg','x');S.cfg.mgIgual=true;var k2=cC(c);c.kgM=0;return {a:Math.abs(k.sugM-(k.costoKgM+rp.kgc)*1.5)<0.01,b:Math.abs(k2.sugM-(k2.costoKgM+rp.kgc)*1.3)<0.01,h:/macho/.test(h)}});
ok(r.a&&r.b&&r.h,'meta del macho aparte (o la misma para los dos)',r);
/* casetas: no en el reparto */
r=await ev(()=>{S.role='rep';S.chofHoy=1;S.pinOk[pinKey()]=true;var h=gxTipos();S.role='admin';return /Caseta/.test(h)});ok(!r,'reparto: no sale "Caseta" en los gastos de la ruta');
/* comida en viaje: no autorizada */
r=await ev(()=>{S.vw=S.vw||{};var v=S.vw;v.comOk=false;v.gx=v.gx||[];v.gxt='Comida';v.gxm='100';var h='';try{h=vwSideHTML('gasto')}catch(e){h='ERR '+e.message}return /no está autorizada/.test(h)&&!/data-v="Comida"/.test(h)});ok(r,'viaje sin comida autorizada: no sale la opción');
/* cuentas claras */
r=await ev(()=>{S.inv.vacias='';S.cli[0].vac='abc';render();var R=cuentasRevisar().filter(x=>!x.ok);return {inv:S.inv.vacias,cv:S.cli[0].vac,mal:R.map(x=>x.n+' · '+x.det),prob:(S.probs||[]).length}});
ok(r.inv===0&&r.cv===0,'número vacío o inválido: se pone en 0 y no rompe las cuentas',r);
ok(!r.mal.some(x=>/Falta un número/.test(x)),'ya no sale "Algún número salió vacío"',r.mal);
ok(r.prob>0,'el error quedó anotado solo',r.prob);
r=await ev(()=>{S.cajasT0=(S.cajasT0||0)+12;var x=cuentasRevisar().filter(y=>y.n==='Las taras no cuadran')[0];var av=avisos().filter(a=>/no cuadra/.test(a));return {x,av}});
ok(r.x&&/La app cuenta [\d,]+ taras y deberían ser [\d,]+: (faltan|sobran) \d+/.test(r.x.det),'aviso de taras en palabras claras',r.x);
r=await ev(()=>{S.tab.admin='inicio';render();var c=document.querySelector('[data-x="cuadra68"]');return c?c.innerText:''});ok(/Algo no cuadra[\s\S]*Las taras no cuadran/.test(r),'"¿Cuadra todo?" a la vista en Inicio',r.slice(0,120));
r=await ev(()=>{cmNuevo();var m=S.cm;m.R=true;m.kgR='68000';m.cajas='100';m.pR='10';var R=cmRaros68('R');m.kgR='6000';m.cajas='300';var R2=cmRaros68('R');S.cm=null;return {R,R2}});
ok(r.R.length>0&&/mucho más de lo normal/.test(r.R[0])&&!r.R2.some(x=>/Kilos/.test(x)),'error de dedo: 68,000 kg pregunta "¿Seguro?"; 2,000 kg no',r);
ok(!errs.length,'sin errores',errs);
console.log(nOK+' OK · '+nF+' FAIL');await b.close()})();
