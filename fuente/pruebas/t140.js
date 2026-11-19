/* 140/141 · el corte del chofer desglosado como el ticket (cada producto con su precio; mayoreo y precio especial con el cliente; contado,
   crédito y abonos) y "Lo que pasó hoy en su ruta" solo con lo de ese cierre (después del cierre anterior y hasta que mandó este). */
const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();let nOK=0,nF=0;const ok=(c,m,x)=>{c?nOK++:nF++;console.log((c?'OK   ':'FAIL ')+m+(x!==undefined?' '+JSON.stringify(x).slice(0,700):''))};
const p=await (await b.newContext({viewport:{width:390,height:844}})).newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));await p.addInitScript(()=>{window.__pnTest=1;window.__hora93=11});
await p.goto('file:///mnt/user-data/outputs/platanos-primera-vez.html');await p.waitForTimeout(900);const ev=(f,a)=>p.evaluate(f,a);let r;
r=await ev(()=>{var U=S.setup;U.veh=[{n:'Camioneta Uno',pl:'AAA1',plEdo:'Baja California',comb:'Gasolina',img:0,odo:1000}];U.per=[{n:'Danu',puesto:'chofer',tel:'1'}];U.cli=[{n:'Doña Mary',a:'x',tel:'6640000001',dias:[0,1,2,3,4,5,6],cred:0,vac:0,ch:'0'},{n:'Lupe',a:'y',tel:'2',dias:[0,1,2,3,4,5,6],cred:0,vac:0,ch:'0'},{n:'Abarrotes Sol',a:'z',tel:'3',dias:[0,1,2,3,4,5,6],cred:0,vac:0,ch:'0'}];U.prov=[];S.precio.R=275;S.precio.M=20;suAplicar();
 var D=S.choferes.filter(c=>c.n==='Danu')[0];window.__D=D.id;S.role='rep';S.chofHoy=D.id;chCambiar(D.id);S.salida.ok=true;S.rutaDia80=iso(TODAY);var c=S.cli;
 S.log.push({c:c[0].id,R:10,M:3,V:0,pr:275,pm:20,total:2810,pago:2810,abono:0,tR:{t:'dia',txt:'Precio del día',pr:275,n:275}});
 S.log.push({c:c[1].id,R:4,M:0,V:0,pr:250,pm:20,total:1000,pago:500,abono:100,tR:{t:'esp',txt:'Precio especial',pr:250,n:275}});
 S.log.push({c:c[2].id,R:12,M:0,V:0,pr:240,pm:20,total:2880,pago:2880,abono:0,mayT:'chofer',pnR:275,pnM:20});
 S.log.push({c:c[0].id,R:5,M:2,V:0,pr:275,pm:20,total:1415,pago:1415,abono:0});
 S.cierre.res=cierreRes();var d=corteDatos();return {it:corteItems(d).filter(x=>x.t==='kv').map(x=>x.k+' | '+x.v),v:d.v,v0:verifCodigo([d.ch,d.f,d.deb,d.ent,d.bolsa,JSON.stringify(d.bill||{}),d.may.length].join('|')),img:String(corteImg(d)).slice(0,15)}});
ok(r.it.includes('Roatán 15 cajas a $275 | $4,125')&&r.it.includes('Macho 5 kg a $20 | $100'),'lo de precio del día se junta por producto y precio',r.it);
ok(r.it.includes('Roatán 4 cajas a $250 | $1,000')&&r.it.includes('   Precio especial: Lupe | ')&&r.it.includes('Roatán 12 cajas a $240 | $2,880')&&r.it.includes('   Mayoreo (lo dio el chofer): Abarrotes Sol | '),'mayoreo y precio especial: aparte y con el nombre del cliente',r.it);
ok(r.it.includes('Vendió | $8,105')&&r.it.includes('  De contado | $7,605')&&r.it.includes('  A crédito | $500')&&r.it.includes('Abonos de deudas | $100'),'vendió, de contado, a crédito y abonos',r.it);
ok(r.v===r.v0&&/^data:image\/png/.test(r.img),'el código de verificación es el mismo y la imagen se arma');
/* 141 */
r=await ev(()=>{var f=iso(TODAY),ch=window.__D;S.actDia=[{f:f,h:'08:10',ch:ch,x:'salió rumbo a la ruta (vuelta 1)'},{f:f,h:'11:30',ch:ch,x:'cosa de la vuelta 1'},{f:f,h:'12:40',ch:ch,x:'cosa de la vuelta 2'},{f:f,h:'13:50',ch:ch,x:'después de mandar'},{f:f,h:'12:45',ch:999,x:'de otro chofer'}];
 S.rutasHist=(S.rutasHist||[]).concat([{f:f,ch:ch,parcial120:1,h120:'12:00',log:[]}]);S.cierre.sent=true;S.cierre.corte={h:'13:30'};return actCierre141(ch,f).map(a=>a.x).concat([actCierreHTML141(f,ch).indexOf('cierre 2')>-1])});
ok(JSON.stringify(r)===JSON.stringify(['cosa de la vuelta 2',true]),'"Lo que pasó hoy en su ruta": solo lo de este cierre (después del anterior y hasta que lo mandó)',r);
ok(!errs.length,'sin errores',errs);
console.log(nOK+' OK · '+nF+' FAIL');await b.close()})();
