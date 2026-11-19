/* 143 · formato de ticket de Ricardo (corte de ruta y ticket del cliente): tabla CANT/DESCRIPCIÓN/P.UNIT/IMPORTE, totales y desglose
   de dinero que suman EXACTO lo que hay que entregar (con gastos, crédito, abonos y faltante), estado, folio; todos los renglones del mismo ancho. */
const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();let nOK=0,nF=0;const ok=(c,m,x)=>{c?nOK++:nF++;console.log((c?'OK   ':'FAIL ')+m+(x!==undefined?' '+JSON.stringify(x).slice(0,500):''))};
const p=await (await b.newContext()).newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));await p.addInitScript(()=>{window.__pnTest=1;window.__hora93=11});
await p.goto('file:///mnt/user-data/outputs/platanos-primera-vez.html');await p.waitForTimeout(900);
const r=await p.evaluate(()=>{S.cfg.nombre='Plátanos Nietos';var U=S.setup;U.veh=[{n:'C',pl:'A',plEdo:'Baja California',comb:'Gasolina',img:0,odo:1000}];U.per=[{n:'Danu',puesto:'chofer',tel:'1'}];U.cli=[{n:'Doña Mary',a:'x',tel:'1',dias:[0,1,2,3,4,5,6],cred:500,vac:0,ch:'0'},{n:'Abarrotes Sol',a:'y',tel:'2',dias:[0,1,2,3,4,5,6],cred:0,vac:0,ch:'0'}];U.prov=[];S.precio.R=245;S.precio.M=20.5;suAplicar();
 var D=S.choferes.filter(c=>c.n==='Danu')[0];S.role='rep';S.chofHoy=D.id;chCambiar(D.id);S.salida.ok=true;var c=S.cli;
 S.log.push({c:c[0].id,R:6,M:50,V:0,pr:245,pm:20.5,total:2495,pago:2000,abono:200});
 S.log.push({c:c[1].id,R:5,M:0,V:0,pr:230,pm:20.5,total:1150,pago:1150,abono:0,mayT:'chofer',pnR:245,pnM:20.5});
 S.gch.push({tipo:'Comida',m:150});S.recs.push({total:500,litros:20});
 S.cierre.res=cierreRes();var d=corteDatos();d.ent=r2(d.deb-50);d.dif=-50;d.mot='Se le cayó';
 var L=tkCorte143(d).filter(x=>!x.t).map(x=>x.s),img=corteImg(d);
 var n={tel:'1',folio:12,fecha:'jueves, 19 de noviembre de 2026',cli:'Doña Mary',entrego:'Danu',R:6,M:50,V:2,vacDebe:1,may:0,pr:245,pm:20.5,total:2495,pago:2000,abono:200,cred:795,prox:'lunes'};
 return {d:{deb:d.deb,cont:d.cont,cred:d.cred,ab:d.ab,gas:d.gas},L:L,img:String(img).slice(0,22),N:tkNota143(n).filter(x=>!x.t).map(x=>x.s),nimg:String(notaImg(n)).slice(0,22),txt:notaTxt(n)}});
const has=(L,re)=>L.some(x=>re.test(x));
ok(has(r.L,/^CORTE DE RUTA Y EFECTIVO$/)&&has(r.L,/^PLÁTANOS NIETOS$/)&&has(r.L,/^CANT  DESCRIPCIÓN +P\.UNIT +IMPORTE$/),'encabezado y tabla del corte');
ok(has(r.L,/^6 cj  Roatán \(Normal\) +\$245\.00 +\$1,470\.00$/)&&has(r.L,/^5 cj  Roatán \(Mayoreo\) +\$230\.00 +\$1,150\.00$/)&&has(r.L,/→ Abarrotes Sol/)&&has(r.L,/^50 kg Plátano Macho +\$20\.50 +\$1,025\.00$/),'renglones con cantidad, precio e importe (mayoreo con su cliente)',r.L);
ok(r.d.deb===r.d.cont+r.d.ab-r.d.gas&&!has(r.L,/Otros ajustes/),'el desglose suma exacto lo que hay que entregar (contado + abonos − gastos)',r.d);
ok(has(r.L,/^\(-\) Gastos de ruta: +\$650\.00$/)&&has(r.L,/^\(-\) Ventas a crédito \(fiado\): +\$495\.00$/)&&has(r.L,/^\(\+\) Abonos cobrados hoy: +\$200\.00$/),'gastos, crédito y abonos',r.L);
ok(has(r.L,/^DIFERENCIA: +-\$50\.00$/)&&has(r.L,/^Estado: +FALTANTE$/)&&has(r.L,/^Motivo: Se le cayó$/),'faltante: diferencia, estado y motivo');
ok(r.L.filter(x=>x.length>44).length===0,'ningún renglón se pasa del ancho',r.L.filter(x=>x.length>44));
ok(/^data:image\/png/.test(r.img)&&/^data:image\/png/.test(r.nimg),'las imágenes se arman');
ok(has(r.N,/^NOTA DE REMISIÓN No\. 0012$/)&&has(r.N,/^6 cj  Roatán \(Normal\) +\$245\.00 +\$1,470\.00$/)&&has(r.N,/^\(-\) Quedó a crédito: +\$495\.00$/)&&has(r.N,/^SALDO PENDIENTE: +\$795\.00$/),'ticket del cliente con el mismo formato',r.N);
ok(/^```\n/.test(r.txt)&&/¡Gracias por su compra!/.test(r.txt),'el texto para WhatsApp va con letra de ancho fijo');
ok(!errs.length,'sin errores',errs);
console.log(nOK+' OK · '+nF+' FAIL');await b.close()})();
