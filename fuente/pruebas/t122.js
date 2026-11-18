/* 122 · 60 días de detalle y resúmenes para siempre: al quitar lo viejo la caja no cambia ni un centavo, los totales del día/mes/año y Estadísticas tampoco; nada se cuenta doble; el chofer nunca borra */
const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();let nOK=0,nF=0;const ok=(c,m,x)=>{c?nOK++:nF++;console.log((c?'OK   ':'FAIL ')+m+(x!==undefined?' '+JSON.stringify(x).slice(0,500):''))};
const p=await (await b.newContext({viewport:{width:390,height:844}})).newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));p.on('dialog',d=>d.accept());await p.addInitScript(()=>{window.__pnTest=1;window.__hora93=12});
await p.goto('file:///mnt/user-data/outputs/platanos-primera-vez.html');await p.waitForTimeout(900);const ev=(f,a)=>p.evaluate(f,a);let r;
await ev(()=>{TODAY=new Date('2026-11-18T12:00:00');var U=S.setup;U.veh=[{n:'Camioneta Uno',pl:'AAA1',plEdo:'Baja California',comb:'Gasolina',img:0,odo:1000}];U.per=[{n:'Danu',puesto:'chofer',tel:'1'}];U.cli=[{n:'Doña Mary',a:'x',tel:'6640000001',dias:[0,1,2,3,4,5,6],cred:0,vac:0,ch:'0'},{n:'Lupe',a:'y',tel:'6640000002',dias:[0,1,2,3,4,5,6],cred:0,vac:0,ch:'0'}];U.prov=[];S.precio.R=275;S.precio.M=20;suAplicar();S.pinOk[pinKey()]=true;S.popVisto={admin:iso(TODAY)};S.role='admin';
 var D=S.choferes.filter(c=>c.n==='Danu')[0];window.__D=D.id;D.ing='2026-01-05';D.sz.tipo='semana';D.sz.monto='1800';var A='2026-09-08',B='2026-11-08';window.__A=A;window.__B=B;var c=S.cli,ve=S.veh[0].id;
 S.cargas.push({id:S.nextCarga++,fecha:'2026-09-01',prov:'Roly',kgR:2000,pR:10,cajas:100,kgM:0,pM:0,t:{diesel:0,comida:0,casetas:0,extra:0},extras:[],pag:0,est:'Recibida',vCaja:0,vKgM:0,mg:30,pagBase:0,trBase:0,otros:[],trMode:'kilos'});
 S.rutasHist=[{f:A,ch:D.id,parcial120:1,n120:1,id120:'p1',log:[{c:c[0].id,R:8,M:0,V:8,pr:275,pm:20,total:2200,pago:2200,abono:0}],res:{total:2200,efectivo:2000,km:40,veh68:ve,tasa68:0.7},enviado:true,cierreReg82:{rec:2000},recep82:null},
  {f:A,ch:D.id,log:[{c:c[0].id,R:10,M:0,V:6,pr:275,pm:20,total:2750,pago:2750,abono:0},{c:c[1].id,R:4,M:0,V:0,pr:275,pm:20,total:1100,pago:600,abono:0}],res:{total:3850,efectivo:3350,km:60,veh68:ve,tasa68:0.7},enviado:true,cierreReg82:{rec:3350},recep82:null},
  {f:B,ch:D.id,log:[{c:c[1].id,R:2,M:0,V:2,pr:275,pm:20,total:550,pago:550,abono:0}],res:{total:550,efectivo:550,km:20,veh68:ve,tasa68:0.7},enviado:true,cierreReg82:{rec:550},recep82:null}];
 S.cierresPrev=[{n:1,ch:D.id,f:A,n120:1,id120:'p1',rec:2000,res:{total:2200,efectivo:2000}},{n:2,res:{R:3,M:0,vR:825,vM:0,total:825,cred:0,ab:0,efectivo:825},rec:825}];
 S.gastos=[{t:'Otro',m:100,n:'escoba',f:A},{t:'Vehículo: Reparación',m:1000,n:'Camioneta Uno',f:A,veh:ve},{t:'Comisión de tarjeta',m:50,n:'x',f:A,caja:false},{t:'Otro',m:70,n:'trapo',f:B}];
 S.cobros=[{c:c[1].id,m:300,f:A},{c:c[1].id,m:100,f:B}];S.vlVentas=[{h:'10:00',lin:[{p:'Roatán suelto',kg:10,pk:33}],tot:330,f82:A}];S.mermas=[{fecha:A,valor:40,tipo:'Conteo',txt:'x'}];
 S.resDia={};S._ret122=iso(TODAY);render()});
const foto=()=>ev(()=>{var A=window.__A,B=window.__B,h=hist82(),ra=h.filter(x=>x.d===A)[0]||{},rb=h.filter(x=>x.d===B)[0]||{},T=cuadreDia121(A),M=cuadreRango121('2026-09-01','2026-09-30'),Y=cuadreRango121('2026-01-01','2026-12-31');
 return {caja:cajaEsp(),ha:{ing:ra.ing,gan:ra.gan,gt:ra.gt,R:ra.R,mv:ra.mv},hb:{ing:rb.ing,gt:rb.gt},dia:{venta:T.venta,contado:T.contado,cred:T.cred,ab:T.ab,gan:T.gan,op:T.op,mant:T.mant,desg:T.desg,suT:T.suT,merma:T.merma,neto:T.neto,rec:T.rec,cierres:T.cierres},mes:{venta:M.venta,gan:M.gan,op:M.op,desg:M.desg,suT:M.suT,neto:M.neto,cierres:M.cierres},anio:{venta:Y.venta,neto:Y.neto,cierres:Y.cierres}}});
// ANTES: se corre como si hoy fuera el 18 de nov; nada tiene más de 60 días todavía… salvo el día A (8 sep = 71 días)
await ev(()=>{S._ret122='x'});const antes=await foto();
r=await ev(()=>{S._ret122=null;S.role='rep';ret122();var a={rh:S.rutasHist.length,g:S.gastos.length,res:Object.keys(S.resDia||{}).length};S.role='admin';return a});
ok(r.rh===3&&r.g===4&&r.res===0,'122 · el celular del CHOFER nunca resume ni borra nada',r);
r=await ev(()=>{S._ret122=null;S.role='admin';S.tab.admin='inicio';render();var A=window.__A;return {rh:S.rutasHist.filter(e=>e.f===A).length,arrR:S.rutasHist.filter(e=>e.arr122).map(e=>e.rec),cp:S.cierresPrev.map(x=>x.arr122?'arr:'+x.rec:(x.ch==null?'perdido':'cierre')),g:S.gastos.map(x=>x.arr122?'arr:'+x.m:x.t),cob:S.cobros.map(x=>x.arr122?'arr:'+x.m:x.m),vl:S.vlVentas.length,me:S.mermas.length,res:!!(S.resDia[A]&&S.resDia[A].h&&S.resDia[A].cu),hasta:S.resDia._hasta,hb:!!S.resDia[window.__B]}});
ok(r.rh===0&&JSON.stringify(r.arrR)==='[3350]','122 · las rutas del 8 sep (71 días) se quitan y queda su arrastre a la caja ($3,350 recibido del cierre final)',r);
ok(JSON.stringify(r.cp)==='["perdido","arr:2000"]','122 · el cierre recibido de ese día se vuelve arrastre ($2,000); el cierre perdido sin recuperar se queda',r.cp);
ok(JSON.stringify(r.g)==='["Vehículo: Reparación","Otro","arr:100"]','122 · gastos: el de la camioneta se queda (400 días), la escoba se resume ($100 de caja; la comisión de tarjeta no era de caja)',r.g);
ok(JSON.stringify(r.cob)==='[100,"arr:300"]'&&r.vl===0&&r.me===0,'122 · abonos en bodega con su arrastre; venta en bodega y mermas de ese día se resumen',r);
ok(r.res&&r.hasta==='2026-09-18'&&r.hb,'122 · el resumen del día queda guardado para siempre (y los recientes también, listos)',r);
const despues=await foto();
ok(Math.abs(despues.caja-antes.caja)<0.005,'122 · el EFECTIVO EN CAJA no cambia ni un centavo',{antes:antes.caja,despues:despues.caja});
ok(JSON.stringify(despues.ha)===JSON.stringify(antes.ha)&&JSON.stringify(despues.hb)===JSON.stringify(antes.hb),'122 · Estadísticas: el día viejo y el reciente siguen igual',{antes:antes.ha,despues:despues.ha});
ok(JSON.stringify(despues.dia)===JSON.stringify(antes.dia),'122 · el Cuadre del día viejo sale igual desde su resumen',{antes:antes.dia,despues:despues.dia});
ok(JSON.stringify(despues.mes)===JSON.stringify(antes.mes)&&JSON.stringify(despues.anio)===JSON.stringify(antes.anio),'122 · los totales del mes y del año no cambian',{antes:antes.mes,despues:despues.mes,anio:despues.anio});
// otra vez (u otro celular de admin): nada se cuenta doble
r=await ev(()=>{var c0=cajaEsp(),n0=JSON.stringify([S.rutasHist,S.cierresPrev,S.gastos,S.cobros]);S._ret122=null;ret122();poda122();arr122(S.gastos,'arr122g_'+window.__A,{t:'Saldo de gastos anteriores',m:100,caja:true,f:'arr'});return {c:cajaEsp()-c0,igual:JSON.stringify([S.rutasHist,S.cierresPrev,S.gastos,S.cobros])===n0}});
ok(Math.abs(r.c)<0.005&&r.igual,'122 · si se vuelve a correr (u otro celular de admin lo hace), nada cambia ni se cuenta doble',r);
// pantallas
r=await ev(()=>{S.tab.admin='cuadre121';S.cu121p='dia';S.cu121d=window.__A;render();var t=document.querySelector('main').innerText;S.cu121p='anio';render();var y=document.querySelector('main').innerText;S.tab.admin='estadisticas';S.st.sec='ventas';S.st.per='mes';var n0=FALLO77.n;render();return {t:/Resumen guardado/.test(t)&&/Danu/.test(t),y:/Año 2026/.test(y)&&/Mes por mes/.test(y)&&/Sep 2026/.test(y),est:FALLO77.n===n0}});
ok(r.t&&r.y&&r.est,'122 · el Cuadre del 8 sep dice "Resumen guardado"; "Año" con "Mes por mes"; Estadísticas sin errores',r);
r=await ev(()=>[money(12.5),money(12),money(-340),money(1234.567),money(0.004)]);ok(JSON.stringify(r)==='["$12.50","$12","−$340","$1,234.57","$0"]','122 · el dinero se ve con centavos cuando los hay',r);
ok(!errs.length,'sin errores de página',errs.slice(0,3));
console.log(nOK+' OK · '+nF+' FAIL');await b.close()})();
