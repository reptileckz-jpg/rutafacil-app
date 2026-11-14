/* 8.2 · 40-44: estadísticas de verdad, retiro del dueño, ¿cuadran las cuentas?, recontar bodega, fruta madura */
const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();let nOK=0,nF=0;const ok=(c,m,x)=>{c?nOK++:nF++;console.log((c?'OK   ':'FAIL ')+m+(x!==undefined?' '+JSON.stringify(x).slice(0,300):''))};
const p=await (await b.newContext({viewport:{width:400,height:860}})).newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));await p.addInitScript(()=>{window.__pnTest=1});
await p.goto('file:///mnt/user-data/outputs/platanos-primera-vez.html');await p.waitForTimeout(900);const ev=(f,a)=>p.evaluate(f,a);let r;
// la app real armada con el asistente (y un gasto viejo sin fecha, de antes de la 8.2)
await ev(()=>{var U=S.setup;U.yo='Dueño';U.veh=[{n:'Camioneta A',pl:'A1',plEdo:'Baja California',comb:'Diésel',img:0,odo:1000}];U.per=[{n:'Chofer Uno',puesto:'chofer',tel:'1'}];U.cli=[{n:'Cliente Uno',a:'Calle 1',tel:'1',dias:[0,1,2,3,4,5,6],cred:0,vac:0,ch:'0'},{n:'Cliente Dos',a:'Calle 2',tel:'2',dias:[0,1,2,3,4,5,6],cred:0,vac:0,ch:'0'}];U.prov=[];S.precio.R=300;S.precio.M=20;suAplicar();
 S.role='admin';S.pinOk[pinKey()]=true;S.tab.admin='estadisticas';render()});
r=await ev(()=>({h:HIST.length,t:document.querySelector('main').innerText.slice(0,200)}));ok(r.h===0&&/Todavía no hay historial/.test(r.t),'sin movimientos: Estadísticas dice que todavía no hay historial',r);
// un día de trabajo archivado (ayer): 2 entregas, gastos y una merma; y una venta en bodega hoy
r=await ev(()=>{var ay=iso(new Date(TODAY.getTime()-864e5)),ch=S.choferes.find(c=>c.n==='Chofer Uno').id,c1=S.cli[0].id,c2=S.cli[1].id;
 S.rutasHist=S.rutasHist||[];S.mermas=S.mermas||[];S.vlVentas=S.vlVentas||[];S.cargas.push({id:90,fecha:ay,prov:'X',kgR:2200,pR:9,cajas:100,kgM:0,pM:0,t:{},est:'Llegó',otros:[]});
 S.rutasHist.push({f:ay,ch:ch,log:[{c:c1,R:5,M:0,total:1500,pago:1500,abono:0,pr:300},{c:c2,R:3,M:10,total:1100,pago:600,abono:100,pr:300,pm:20}],res:{R:8,M:10,efectivo:2000,reg:2,regK:0,V:0},enviado:true});
 S.gastos.push({t:'Combustible de reparto',m:500,n:'x',f:ay});S.gastos.push({t:'Retiro del dueño',m:3000,n:'para mí',f:ay});S.gastos.push({t:'Para un vehículo',m:800,n:'tapetes',f:ay});
 S.mermas.push({tipo:'Fruta tirada',fecha:ay,R:1,M:0,valor:200,txt:'x'});S.gastos.push({t:'Sueldos',m:9999,n:'viejo sin fecha',f82:'?'});S.vlVentas.push({h:'10:00',lin:[{p:'Roatán',kg:10,pk:12}],tot:120});render();var row=HIST.find(x=>x.d===ay),hoy=HIST.find(x=>x.d===iso(TODAY));return {n:HIST.length,row,hoy,t:document.querySelector('main').innerText.slice(0,160)}});
ok(r.row&&r.row.R===8&&r.row.M===10&&r.row.ing===2600&&r.row.gc===500&&r.row.gm===800&&r.row.gt===1300&&r.row.mv===200&&r.row.cr===500&&r.row.ab===100,'Estadísticas con los datos reales del día (ventas, gastos, merma, crédito, abonos)',r.row);
ok(r.row&&r.row.gt===1300,'el retiro del dueño NO cuenta como gasto; lo de un vehículo sí',r.row&&r.row.gt);
ok(r.row&&r.row.gR===816,'ganancia del roatán = $2,400 vendidos − 8 cajas × $198 que costó cada una',r.row&&r.row.gR);
ok(r.hoy&&r.hoy.ing===120,'la venta en bodega de hoy se suma',r.hoy);
ok(!/Datos de ejemplo/.test(r.t),'ya no dice "Datos de ejemplo"',r.t);
r=await ev(()=>{S.fijos=[{n:'Luz',m:'1000',frec:'mensual'},{n:'Sueldo del dueño',m:'10000',frec:'mensual',retiro:true}];return fijoMes()});ok(r===1000,'gastos fijos: el retiro del dueño no baja la ganancia',r);
// ¿cuadran las cuentas?
await ev(()=>{S.tab.admin='inicio';render()});r=await ev(()=>!!document.querySelector('[data-x="cu82e"]'));ok(r,'Inicio: tarjeta "¿Cuadran las cuentas?"');
r=await ev(()=>{document.querySelector('[data-act="cu82open"]').click();document.querySelector('[data-act="cu82d"][data-v="ayer"]').click();var t=document.getElementById('cu82').innerText;return t});
ok(/Falta recibir el efectivo de Chofer Uno/.test(r)&&/salieron 10 cajas/.test(r)&&/Falta contar/.test(r),'ayer: falta recibir el efectivo y contar lo que regresó',r.slice(0,400));
r=await ev(()=>{var e=S.rutasHist[S.rutasHist.length-1];e.cierreReg82={rec:1900};e.recep82={dR:1,dM:0,dV:0};render();return document.getElementById('cu82').innerText});
ok(/faltan \$100/.test(r)&&/faltaron 1 cajas/.test(r)&&/no cuadra/.test(r),'con lo recibido: marca en rojo los $100 y la caja que faltaron',r.slice(0,500));
await ev(()=>{S.cu82=null;render()});
// recontar bodega
await ev(()=>{S.tab.admin='bodega';S.inv.verdes=30;S.cnt.rv='';render()});
r=await ev(()=>{var i=document.getElementById('cnt_rv');i.value='25';i.dispatchEvent(new Event('input',{bubbles:true}));return new Promise(res=>setTimeout(()=>{document.querySelector('[data-act="registrarcnt"]').click();res({re:S.cnt82&&S.cnt82.re,v:S.inv.verdes,m:S.mermas.length})},50))});
ok(r.re&&r.v===30,'diferencia grande (5 cajas): pide volver a contar y no registra',r);
r=await ev(()=>new Promise(res=>{var i=document.getElementById('cnt_rv');i.value='25';i.dispatchEvent(new Event('input',{bubbles:true}));setTimeout(()=>{var m0=S.mermas.length;document.querySelector('[data-act="registrarcnt"]').click();res({m:S.mermas.length-m0,v:S.inv.verdes,pide:!!document.querySelector('[data-act="cnt82m"]'),rv:S.cnt.rv,x:S.cnt82})},80)}));
ok(r.m===0&&r.v===30&&r.pide,'el segundo conteo igual: ahora pide el motivo',r);
r=await ev(()=>new Promise(res=>{document.querySelector('[data-act="cnt82m"][data-v="Venta que no se registró"]').click();setTimeout(()=>{var m0=S.mermas.length;document.querySelector('[data-act="registrarcnt"]').click();setTimeout(()=>{var m=S.mermas[S.mermas.length-1];res({n:S.mermas.length-m0,v:S.inv.verdes,mot:m&&m.mot82})},60)},50)}));
ok(r.n===1&&r.v===25&&r.mot==='Venta que no se registró','se registra con su motivo',r);
// fruta madura: solo lo pasado de tiempo
r=await ev(()=>{var hoy=iso(TODAY),v=vidaDias();S.madL=[{p:'R',q:4,dia:hoy}];S.antigOff80=null;var a=antig65();S.madL.push({p:'R',q:2,dia:iso(new Date(TODAY.getTime()-(v+1)*864e5))});var d=antig65();return {a:a===null,b:!!d,n:d&&d.querySelectorAll('.lote').length,sw:d&&!!d.dataset.sw80,blq:d?swBloq(d):null}});
ok(r.a&&r.b&&r.n===1&&!r.sw&&r.blq,'fruta madura: solo sale lo pasado de tiempo y ya no se desliza (no cambia de página)',r);
r=await ev(()=>{var n=S.gastos.length;S.gastos.push({t:'Sueldos',m:50,n:'nuevo'});render();var g=S.gastos[n];return {f:g.f82,hoy:iso(TODAY),viejo:HIST.some(x=>x.go>=9999)}});
ok(r.f===r.hoy&&!r.viejo,'lo nuevo sin fecha recibe el día; lo viejo sin fecha no se cuenta en ningún día',r);
ok(errs.length===0,'sin errores',errs);
console.log(nOK+' OK · '+nF+' FAIL');await b.close()})();
