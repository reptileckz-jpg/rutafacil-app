/* 128 · 💰 Cuadre: la comisión del chofer explicada (cómo la gana, cajas y kilos cobrados, mayoreo, abonos, lo fiado, entrega por entrega)
   y el sueldo del día con su cuenta. Los números del desglose suman EXACTO lo que se resta en el neto. */
const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();let nOK=0,nF=0;const ok=(c,m,x)=>{c?nOK++:nF++;console.log((c?'OK   ':'FAIL ')+m+(x!==undefined?' '+JSON.stringify(x).slice(0,700):''))};
const p=await (await b.newContext({viewport:{width:390,height:844}})).newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));p.on('dialog',d=>d.accept());await p.addInitScript(()=>{window.__pnTest=1;window.__hora93=12});
await p.goto('file:///mnt/user-data/outputs/platanos-primera-vez.html');await p.waitForTimeout(900);const ev=(f,a)=>p.evaluate(f,a);let r;
await ev(()=>{TODAY=new Date('2026-11-18T12:00:00');var U=S.setup;U.veh=[{n:'Camioneta Uno',pl:'AAA1',plEdo:'Baja California',comb:'Gasolina',img:0,odo:1000}];U.per=[{n:'Danu',puesto:'chofer',tel:'1'}];
 U.cli=[{n:'Doña Mary',a:'x',tel:'6640000001',dias:[0,1,2,3,4,5,6],cred:0,vac:0,ch:'0'},{n:'Lupe',a:'y',tel:'6640000002',dias:[0,1,2,3,4,5,6],cred:0,vac:0,ch:'0'},{n:'Toño',a:'z',tel:'6640000003',dias:[0,1,2,3,4,5,6],cred:300,vac:0,ch:'0'},{n:'Abarrotes Sol',a:'w',tel:'6640000004',dias:[0,1,2,3,4,5,6],cred:0,vac:0,ch:'0'}];U.prov=[];S.precio.R=275;S.precio.M=20;suAplicar();
 var D=S.choferes.filter(c=>c.n==='Danu')[0];window.__D=D.id;D.ing='2026-01-05';D.sz={tipo:'base',monto:'',porDia:'',base:'1500',comC:'5',comK:'0.5',dias:0,cv:0,kv:0};
 S.cargas.push({id:S.nextCarga++,fecha:'2026-11-18',prov:'Roly',kgR:2000,pR:10,cajas:100,kgM:0,pM:0,t:{diesel:0,comida:0,casetas:0,extra:0},extras:[],pag:0,est:'Recibida',vCaja:0,vKgM:0,mg:30,pagBase:0,trBase:0,otros:[],trMode:'kilos'});
 S.pinOk[pinKey()]=true;S.pinOk['c:'+D.id]=true;S.role='rep';S.chofHoy=D.id;chCambiar(D.id);S.vehHoy=S.veh[0].id;S.tab.rep='ruta';render();var bv=document.querySelector('[data-act="bienvgo"]');if(bv)bv.click();S.salida.ok=true;
 var c=S.cli;
 S.log.push({c:c[0].id,R:10,M:4,V:0,pr:275,pm:20,total:2830,pago:2830,abono:0});          /* pagó todo: 10×5 + 4×0.5 = 52 */
 S.log.push({c:c[1].id,R:4,M:0,V:0,pr:275,pm:20,total:1100,pago:600,abono:0});           /* pagó una parte: 20 × 600/1100 = 10.91 */
 S.log.push({c:c[3].id,R:2,M:0,V:0,pr:275,pm:20,total:550,pago:0,abono:0});              /* fiado: 0 */
 S.log.push({c:c[2].id,R:0,M:0,V:0,pr:275,pm:20,total:0,pago:0,abono:275});              /* abono: 275 × 5/275 = 5 */
 S.log.push({c:c[0].id,R:10,M:0,V:0,pr:250,pm:20,total:2500,pago:2500,abono:0,mayT:'chofer',may:1}); /* mayoreo que dio él: 50 ÷ 2 = 25 */
 S.cierre.res=cierreRes();S.cierre.sent=true;S.cierre.corte=corteDatos();S.cierreReg={rec:6205,f:null};
 S.role='admin';S.pinOk[pinKey()]=true});
r=await ev(()=>{var T=cuadreDia121('2026-11-18'),o=T.ch[0]||{},D=o.comD||{};return {com:o.com,comT:T.comT,D:{cajas:D.cajas,kg:D.kg,mitad:D.mitad,mitadN:D.mitadN,abonos:D.abonos,abCom:D.abCom,fiado:D.fiado,fiR:D.fiR,total:D.total,filas:(D.filas||[]).map(x=>[x.n,x.m,x.nota])},
 F:comFilas128(D),sueldo:o.sueldo,sTx:o.sTx,neto:T.neto,cuenta:r2(T.gan-T.op-T.desg-T.suT-T.comT-T.merma)}});
ok(r.com===92.91&&r.comT===92.91,'la comisión del día es la misma de siempre (52 + 10.91 + 0 + 5 + 25)',r.com);
ok(r.D.total===r.com,'el desglose suma exacto la comisión que se resta',[r.D.total,r.com]);
ok(Math.abs(r.F.reduce((a,x)=>a+x[2],0)-r.com)<0.005,'los renglones del resumen suman exacto',r.F);
ok(r.F.some(x=>x[0]==='Cajas pagadas completas'&&x[1]==='20 cajas × $5'&&x[2]===100),'cajas pagadas completas: 20 × $5 (lo fiado no cuenta)',r.F[0]);
ok(r.F.some(x=>x[0]==='Pagadas en parte'&&x[2]===10.91),'pagadas en parte: cuenta solo lo que pagaron ($10.91)',r.F);
ok(!r.F.some(x=>x[0]==='Centavos de redondeo'),'sin renglón de centavos de redondeo en este caso',r.F);
ok(r.F.some(x=>x[0]==='Kilos pagados completos'&&x[2]===2),'kilos cobrados × $0.50',r.F);
ok(r.F.some(x=>x[0]==='Mayoreo que dio él'&&x[2]===-25),'mayoreo que dio él: gana la mitad (−$25)',r.F);
ok(r.F.some(x=>x[0]==='Abonos de deudas de antes'&&x[2]===5),'abonos: igual que una venta ($5 por cada $275)',r.F);
ok(r.D.fiado===550+500&&r.D.filas.length===5,'lo fiado se dice aparte (no cuenta hoy) y sale cada entrega',[r.D.fiado,r.D.filas.length]);
ok(r.D.filas.some(x=>x[1]===0&&/quedó fiado/.test(x[2]))&&r.D.filas.some(x=>/pagó \$600\.?0?0? de/.test(x[2])),'cada entrega dice cómo pagó',r.D.filas);
ok(r.sueldo===250&&/base de \$1,500 a la semana ÷ 6 días/.test(r.sTx),'sueldo del día con su cuenta',[r.sueldo,r.sTx]);
ok(r.neto===r.cuenta,'el neto no cambia (ganancia − gastos − desgaste − sueldos − comisiones − merma)',[r.neto,r.cuenta]);
/* pantalla */
r=await ev(()=>{S.tab.admin='cuadre121';S.cu121p='dia';S.cu121d='2026-11-18';S.dOpen['cu121c'+window.__D+'com']=true;render();var m=document.querySelector('main');return m?m.innerText:''});
ok(/Comisión por repartir/.test(r)&&/lo que gana por lo que cobró/.test(r),'en la tarjeta del chofer: "Comisión por repartir"',r.slice(0,200));
ok(/Cómo gana su comisión/.test(r)&&/\$5 por cada caja que cobra y \$0\.50 por cada kilo que cobra/.test(r)&&/lo fiado le cuenta el día que se cobre/.test(r),'explica cómo la gana');
ok(/Cajas pagadas completas/.test(r)&&/Kilos pagados completos/.test(r)&&/Pagadas en parte/.test(r)&&/Mayoreo que dio él/.test(r)&&/Abonos de deudas de antes/.test(r)&&/Comisión del día/.test(r),'resumen: cajas, kilos, mayoreo, abonos y total');
ok(/Quedó fiado \$1,050/.test(r)&&/Entrega por entrega \(5\)/.test(r)&&/Doña Mary · 10 cajas y 4 kg/.test(r),'lo fiado y cada entrega',(r.match(/Entrega por entrega[\s\S]{0,300}/)||[''])[0]);
ok(/Comisiones de los choferes/.test(r)&&/Danu \$92\.91/.test(r),'arriba dice de quién es cada comisión');
ok(/base de \$1,500 a la semana ÷ 6 días/.test(r),'el sueldo del día dice cómo sale');
/* por porcentaje */
r=await ev(()=>{var D=S.choferes.filter(c=>c.id===window.__D)[0];D.sz.comModo='pct';D.sz.comP='3';var T=cuadreDia121('2026-11-18'),o=T.ch[0];return {com:o.com,F:comFilas128(o.comD),tot:o.comD.total}});
ok(r.tot===r.com&&Math.abs(r.F.reduce((a,x)=>a+x[2],0)-r.com)<0.005&&r.F[0][0]==='Cobrado en sus entregas'&&/× 3%/.test(r.F[0][1]),'por porcentaje: cobrado × 3% y abonos × 3%, suma exacto',r);
/* semana: sueldo y comisión separados */
r=await ev(()=>{var D=S.choferes.filter(c=>c.id===window.__D)[0];D.sz.comModo='unidad';S.cu121p='semana';render();return document.querySelector('main').innerText});
ok(/sueldo \$[\d,.]+ \+ comisión \$92\.91 \(20 cajas y 4 kg pagados completos\)/.test(r)&&/Comisiones de los choferes/.test(r)&&/Danu \$92\.91/.test(r),'semana: sueldo y comisión por separado y de quién es cada comisión',(r.match(/Sueldo y comisión[\s\S]{0,120}/)||[r.slice(0,300)])[0]);
r=await ev(()=>{S.cu121p='mes';render();return [document.querySelector('main').innerText,(S.probs||[]).some(x=>/filter is not a function/.test(x.txt||''))]});
ok(/Comisiones de los choferes/.test(r[0])&&!r[1],'mes: también sin tronar',r[0].slice(0,120));
/* un día que ya solo tiene el resumen */
r=await ev(()=>{var T=cuadreDia121('2026-11-18'),o=JSON.parse(JSON.stringify(T.ch[0]));delete o.comD;return comHTML128(o,'x')});
ok(/ya no se guarda/.test(r),'día viejo (solo el resumen): lo dice en vez de tronar');
ok(!errs.length,'sin errores',errs);
console.log(nOK+' OK · '+nF+' FAIL');await b.close()})();
