/* 7.6 · l76: TAGs de autopista y facturas (apagadas) */
const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:400,height:860}});const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.addInitScript(()=>{window.__pnTest=1});await p.goto('file:///mnt/user-data/outputs/prototipo-platanos.html');await p.waitForTimeout(700);const ev=(f,a)=>p.evaluate(f,a);let nOK=0,nF=0;const ok=(c,m,x)=>{c?nOK++:nF++;console.log((c?'OK   ':'FAIL ')+m+(x!==undefined?' '+JSON.stringify(x).slice(0,300):''))};const ck=s=>ev(s=>{var e=document.querySelector(s);if(!e)return 'NO '+s;e.click();return 'ok'},s);
await ev(()=>{S.role='admin';S.tab.admin='vehiculos';S.vehOpen=S.veh[0].id;render()});await p.waitForTimeout(150);
ok(/Agregar TAG/.test(await ev(()=>{var c=document.querySelector('[data-x="tag76"]');return c?c.innerText:''})),'ficha del vehículo: tarjeta del TAG');
const caja0=await ev(()=>cajaEsp());
await ck('[data-act="tag76"]');await p.waitForTimeout(100);await ck('[data-act="tag76p"][data-v="IAVE"]');await p.fill('#tag76n','123456');await p.fill('#tag76i','300');await p.fill('#tag76min','200');await ck('[data-act="tag76ok"]');await p.waitForTimeout(100);
ok(/Saldo: \$300/.test(await ev(()=>document.getElementById('tag76ov').innerText)),'alta del TAG con su saldo');
await ck('[data-act="tag76go"][data-m="rec"]');await p.fill('#tag76m','500');await ck('[data-act="tag76rok"]');await p.waitForTimeout(80);
ok(await ev(()=>tagSaldo(S.veh[0]))===800&&await ev(c=>c-cajaEsp(),caja0)===500,'recarga de $500 con efectivo: sube el saldo y baja la caja');
// cruce en un viaje del día
const cid=await ev(()=>{var c=S.cargas.find(x=>x.viaje);if(!c)return null;c.viaje.veh=S.veh[0].id;c.viaje.fecha=iso(TODAY);return c.id});
await ck('[data-act="tag76go"][data-m="cru"]');await p.fill('#tag76c','Las Vigas');await p.fill('#tag76cm','150');await ck('[data-act="tag76cok"]');await p.waitForTimeout(80);
var rr=await ev(cid=>[tagSaldo(S.veh[0]),((cargaById(cid)||{}).extras||[]).some(x=>x.tag76&&x.m===150)],cid);ok(rr[0]===650&&rr[1],'cada cruce baja el saldo y se suma como gasto del viaje de ese día',rr);ok(await ev(c=>c-cajaEsp(),caja0)===500,'el cruce no vuelve a salir de la caja');
// importar
require('fs').writeFileSync('/tmp/cru76.csv','Fecha,Hora,Plaza,Importe\n12/11/2026,08:10,Perote,$95.00\n12/11/2026,08:10,Perote,95\n2026-11-11,07:00,Amozoc,120\nxx,,,\n');
await ck('[data-act="tag76go"][data-m="imp"]');await p.setInputFiles('#tag76file','/tmp/cru76.csv');await p.waitForTimeout(300);var pv=await ev(()=>S.tag76.prev);ok(pv.n===2&&pv.ya===1&&pv.er===1&&pv.tot===215,'importar cruces: lee fechas y $, salta repetidos',pv&&[pv.n,pv.ya,pv.er,pv.tot]);
await ck('[data-act="tag76iok"]');await p.waitForTimeout(80);ok(await ev(()=>tagSaldo(S.veh[0]))===435,'saldo después de importar');
await ev(()=>{S.tag76=null;S.avPrecio=[];S.veh[0].tag76.av=null;S.veh[0].tag76.min=500;render()});ok(await ev(()=>S.avPrecio.some(t=>/Recárgalo/.test(t))),'aviso cuando el saldo baja del mínimo');
// facturas
await ev(()=>{S.vehOpen=null;S.aj=true;render()});await p.waitForTimeout(100);ok(/apagada/.test(await ev(()=>{var d=document.querySelector('[data-k="aj76fac"]');return d?d.innerText:''})),'Ajustes: Facturación, apagada');
await ck('[data-act="fac76on"][data-v="1"]');ok(await ev(()=>fac76().on===false),'no se prende sin los datos fiscales del negocio');
await ev(()=>{S.cfg.rfc='NIMR800101AB1';var F=fac76();F.rs='RICARDO NIETO';F.reg='612';F.cp='91300';render()});await ck('[data-act="fac76on"][data-v="1"]');ok(await ev(()=>fac76().on===true),'con RFC, razón social, régimen y C.P. se prende');
await ev(()=>{S.aj=false;var c=S.cli[0];S.rutasHist=[{f:iso(TODAY),log:[{c:c.id,R:5,M:10,total:1480,pr:260,pm:18}]}];S.tab.admin='clientes';S.openCli=c.id;render()});await p.waitForTimeout(100);
ok(/datos fiscales/.test(await ev(()=>{var d=document.querySelector('[data-x="fac76"]');return d?d.innerText:''})),'ficha del cliente: tarjeta de factura');
await ck('[data-act="fac76cli"]');await p.waitForTimeout(80);await p.fill('#wz_rfc','ABC010101AB1');await ck('[data-act="wzsig"]');await p.fill('#wz_rs','ABARROTES SA');await ck('[data-act="wzsig"]');await p.selectOption('#wz_reg','601');await ck('[data-act="wzsig"]');await p.fill('#wz_cp','91000');await ck('[data-act="wzsig"]');await ck('[data-act="wzop"][data-v="G01"]');await ck('[data-act="wzsig"]');await ck('[data-act="wzfin"]');await p.waitForTimeout(100);
ok(await ev(()=>S.cli[0].fis76&&S.cli[0].fis76.rfc==='ABC010101AB1'&&S.cli[0].fis76.uso==='G01'),'datos fiscales del cliente por pasos');
await ck('[data-act="fac76ven"]');await p.waitForTimeout(80);await ck('[data-act="fv76t"]');await p.waitForTimeout(50);await ck('[data-act="fv76ok"]');await p.waitForTimeout(80);
var fx=await ev(()=>fac76().L.map(x=>[x.folio,x.total,x.conc.length,x.est]));ok(fx.length===1&&fx[0][0]==='A-1'&&fx[0][1]===1480&&fx[0][3]==='borrador','factura de una venta: borrador A-1 por $1,480 (se timbra al conectar el PAC)',fx);
ok(errs.length===0,'sin errores',errs);console.log(nOK+' OK · '+nF+' FAIL');await b.close()})();
