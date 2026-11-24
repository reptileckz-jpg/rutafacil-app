/* 8.2 · 40-44: estadísticas de verdad, retiro del dueño, ¿cuadran las cuentas?, recontar bodega, fruta madura */
const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();let nOK=0,nF=0;const ok=(c,m,x)=>{c?nOK++:nF++;console.log((c?'OK   ':'FAIL ')+m+(x!==undefined?' '+JSON.stringify(x).slice(0,300):''))};
const p=await (await b.newContext({viewport:{width:400,height:860}})).newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));await p.addInitScript(()=>{window.__pnTest=1});
await p.goto('file:///mnt/user-data/outputs/platanos-primera-vez.html');await p.waitForTimeout(900);const ev=(f,a)=>p.evaluate(f,a);let r;
// la app real armada con el asistente (y un gasto viejo sin fecha, de antes de la 8.2)
await ev(()=>{var U=S.setup;U.yo='Dueño';U.veh=[{n:'Camioneta A',pl:'A1',plEdo:'Baja California',comb:'Diésel',img:0,odo:1000}];U.per=[{n:'Chofer Uno',puesto:'chofer',tel:'1'}];U.cli=[{n:'Cliente Uno',a:'Calle 1',tel:'1',dias:[0,1,2,3,4,5,6],cred:0,vac:0,ch:'0'},{n:'Cliente Dos',a:'Calle 2',tel:'2',dias:[0,1,2,3,4,5,6],cred:0,vac:0,ch:'0'}];U.prov=[];S.precio.R=300;S.precio.M=20;suAplicar();
 /* 33: esta prueba revisa el conteo normal (sin periodo de arranque) */S.arr33={ini:'2000-01-01',fin:'2000-01-14'};S.cnt82=null;
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
// 46 · cuánto cargar: un solo cálculo
r=await ev(()=>{var ch=S.choferes.find(c=>c.n==='Chofer Uno').id;S.role='rep';S.chofHoy=ch;S.pinOk['c:'+ch]=true;S.salida.ok=false;S.salida.R=0;S.salida.M=0;S.log=[];S.stops=S.cli.filter(c=>!c.oculto).map(c=>({c:c.id}));S.rutasHist=[];S.tab.rep='ruta';render();var ib=[...document.querySelectorAll('main button')].find(b=>/Iniciar ruta/.test(b.textContent));if(ib)ib.click();if(typeof salPon124==='function')salPon124(5);render();
 var t=document.querySelector('main').innerText;return {t:t.slice(0,300),rep1:!!document.querySelector('.card.rep1'),arriba:/no hay con qué calcularlo/.test(t),abajo:/Sugerido para hoy/.test(t),pR:S.cli.map(c=>[c.pR,c.pM])}});
ok(r.arriba&&!r.abajo&&r.pR.every(x=>!x[0]&&!x[1]),'sin historial: arriba "no hay con qué calcularlo" y abajo ya no inventa "suelen llevar 4 cajas y 30 kg"',r);
r=await ev(()=>{var c1=S.cli[0].id;S.rutasHist=[{f:'2026-11-01',ch:S.chofHoy,log:[{c:c1,R:6,M:20,total:1,pago:1}]}];if(typeof salPon124==='function')salPon124(5);render();var t=document.querySelector('main').innerText;var a=(t.match(/Sugerido: ([^\n]*)/)||[])[1],b=(t.match(/Sugerido para hoy: ([^\n]*)/)||[])[1];return {a,b}});
ok(r.a&&r.a===r.b,'con historial: arriba y abajo dicen lo mismo',r);
await ev(()=>{S.role='admin';render()});
// 48 · fotos de evidencia
r=await ev(()=>{var ev2=document.createElement('input');ev2.type='file';ev2.setAttribute('capture','environment');document.body.appendChild(ev2);cam73Abre(ev2);var g1=!!document.querySelector('#cam73 [data-cam="gal"]');cam73Cierra();var doc=document.createElement('input');doc.type='file';document.body.appendChild(doc);cam73Abre(doc);var g2=!!document.querySelector('#cam73 [data-cam="gal"]');cam73Cierra();return {evid:g1,doc:g2}});
ok(!r.evid&&r.doc,'la foto de evidencia ya no ofrece "Galería" (los documentos sí)',r);
r=await ev(()=>{var t=[];var cx={fillRect:()=>{},fillText:(x)=>t.push(x),set fillStyle(v){},set font(v){},set textBaseline(v){}};S.role='rep';cam73Sello(cx,1000,700);S.role='admin';return t});
ok(r.length===2&&/Chofer Uno/.test(r[0])&&/Placa A1/.test(r[1]),'la marca dice fecha y hora, quién la tomó y la placa',r);
r=await ev(()=>{var ch=S.choferes.find(c=>c.n==='Chofer Uno').id;var px='data:image/jpeg;base64,'+'A'.repeat(40);S.chofHoy=null;S.chSt=S.chSt||{};S.chSt[ch]=chNuevo(ch);S.chSt[ch].salida={ok:true,fotos:{frente:px,atras:px,izq:px,der:px,odo:px},fotosFin:{}};S.role='admin';S.rt81={dia:'hoy',sel:{}};render();var b=document.querySelector('#rt81 [data-act="fv82"][data-id="'+ch+'"]');if(!b)return {b:false};b.click();var o=document.getElementById('fv82');return {b:true,o:!!o,imgs:o?o.querySelectorAll('img').length:0}});
ok(r.b&&r.o&&r.imgs===5,'el administrador ve las 4 fotos y el odómetro desde Rutas',r);
await ev(()=>{S.fv82=null;S.rt81=null;render()});
// 49–53 · re-análisis
r=await ev(()=>{var ch=S.choferes.find(c=>c.n==='Chofer Uno').id,c1=S.cli[0],hoy=iso(TODAY),m0=hoy.slice(0,7);S.role='admin';S.chofHoy=null;S.chSt={};c1.ult=null;c1.compras=0;c1.mesR=0;
 S.rutasHist=[{f:m0+'-03',ch:ch,log:[{c:c1.id,R:5,M:0,total:1500,pago:1500,abono:0}]},{f:m0+'-05',ch:ch,log:[{c:c1.id,R:2,M:0,total:600,pago:600,abono:0}]}];S.tab.admin='estadisticas';S.st.sec='clientes';render();
 var t=document.querySelector('main').innerText;return {rk:/Chofer Uno[\s\S]{0,40}\$2,100/.test(t),ult:c1.ult,comp:c1.compras,mesR:c1.mesR,demo:/ejemplo|hasta ayer|esta demo/.test(t)}});
ok(r.rk,'49 · ranking de choferes del mes con las rutas reales ($2,100)',r);
ok(r.ult&&r.comp===2&&r.mesR===7,'51 · última compra, compras pagadas y cajas del mes del cliente salen de las entregas',r);
ok(!r.demo,'52 · sin textos de la demo en Estadísticas',r);
r=await ev(()=>{var m0=iso(TODAY).slice(0,7),c1=S.cli[0];c1.mesR=7;cambioDeDia(m0==='2026-11'?'2026-10-31':'2026-01-31');return [c1.mesR,c1.compras]});ok(r[0]===0&&r[1]===2,'51 · al cambiar de mes se reinicia "este mes", no las compras pagadas',r);
r=await ev(()=>{S.role='rep';S.chofHoy=S.choferes.find(c=>c.n==='Chofer Uno').id;S.salida.ok=false;S.tab.rep='ruta';render();var t=document.querySelector('main').innerText;S.role='admin';return {rev:/Revisión del lunes/.test(t),demo:/en la demo/.test(t)}});
ok(!r.rev&&!r.demo,'53 · ya no sale la "Revisión del lunes" vieja ni "en la demo"',r);
// 55 · pedido tarde
r=await ev(()=>{var ch=S.choferes.find(c=>c.n==='Chofer Uno').id,c=S.cli[1];S.role='admin';S.chofHoy=null;S.chSt={};S.chSt[ch]=chNuevo(ch);S.chSt[ch].cierre={sent:true,res:{}};S.chSt[ch].log=[{c:1}];c.ped={R:3,M:0,cuando:'hoy'};S.pedQ82=[];S.cfg.hPed82='23:00';
 var d0=new Date(),hh=d0.getHours()+d0.getMinutes()/60;var msg=p57Asigna(c,ch);return {hh,msg,q:(S.pedQ82||[]).length,lim:hLim82()}});
ok(r.lim===19*60+30,'55 · la hora límite nunca pasa de las 7:30 pm aunque Ajustes diga 23:00',r.lim);
ok(r.hh>=19.5?/queda para mañana/.test(r.msg):(r.q===1&&/preguntó/.test(r.msg)),'55 · chofer que ya cerró: antes de la hora se le pregunta; después pasa a mañana',r);
if(r.q===1){r=await ev(()=>{var ch=S.choferes.find(c=>c.n==='Chofer Uno').id;S.tab.admin='inicio';render();var adm=!!document.querySelector('[data-x="pedq82"]');var keep=JSON.parse(JSON.stringify(S.chSt[ch]));S.role='rep';S.chofHoy=ch;S.pinOk['c:'+ch]=true;Object.keys(keep).forEach(k=>S[k]=keep[k]);S.tab.rep='ruta';render();var b=document.querySelector('[data-act="pedq82"][data-v="si"]');if(!b)return {adm,b:false};b.click();return {adm,b:true,sent:S.cierre.sent,en:S.stops.some(s=>+s.c===S.cli[1].id&&!s.done),tab:S.tab.rep}});
 ok(r.adm&&r.b&&r.sent===false&&r.en&&r.tab==='ruta','55 · el chofer dice "Sí, lo llevo": se reabre su ruta solo con ese pedido',r);
 r=await ev(()=>{var c=S.cli[0];S.pedQ82=[{id:1,c:c.id,ch:S.chofHoy,t:Date.now()-6*60000,f:iso(TODAY),est:'pend'}];S.role='admin';S.chofHoy=null;render();return {est:S.pedQ82[0].est,man:ovDe81(man81(),c.id),av:(S.avPrecio||[]).some(x=>/MAÑANA/.test(x))}});
 ok(r.est==='tiempo'&&r.man!=null&&r.av,'55 · si no contesta en 5 min, pasa a mañana con ese chofer y te avisa',r)}
// 56 · kilos sueltos
r=await ev(()=>{S.role='admin';S.vlAbierta=5;S.tab.admin='bodega';S.cnt={tipo:'dia',rv:'',ra:'',mv:'',ma:''};S.cnt82=null;render();var i=document.getElementById('cnt82s');S.role='local';S.tab.local='local';render();var t=document.querySelector('main').innerText;S.role='admin';S.tab.admin='bodega';render();return {i:!!i,txt:/Kg sueltos de roatán \(caja abierta\): ~5 kg/.test(t)}});
ok(r.i&&r.txt,'56 · los kg sueltos salen en Bodega y en "Contar bodega"',r);
r=await ev(()=>new Promise(res=>{S.cnt82={suel:'3',mot:'Se echó a perder (merma)'};var n0=S.mermas.length;document.querySelector('[data-act="registrarcnt"]').click();setTimeout(()=>{var m=S.mermas[S.mermas.length-1];res({n:S.mermas.length-n0,ab:S.vlAbierta,kg:m&&m.kgS82,v:m&&m.valor>0})},80)}));
ok(r.n===1&&r.ab===3&&r.kg===2&&r.v,'56 · si se cuentan menos, la diferencia es merma y quedan los contados',r);
// 58 · taras
r=await ev(()=>{S.cajaCfg.precio='60';var m=recFaltaMonto({dR:0,dM:0,dV:-2});var t=recFaltaTxt({dR:0,dM:0,dV:-2});return {m,t}});ok(r.m===120&&/2 taras/.test(r.t),'58 · tara que falta: se carga al chofer al precio de la tara de Ajustes',r);
r=await ev(()=>{S.chofHoy=S.choferes.find(c=>c.n==='Chofer Uno').id;S.recep={dV:3};var n0=S.faltantes.length;var b=document.createElement('button');b.dataset.act='recep';document.body.appendChild(b);b.click();return new Promise(res=>setTimeout(()=>{var f=S.faltantes[S.faltantes.length-1];b.remove();res({n:S.faltantes.length-n0,m:f&&f.m})},80))});
ok(r.n===1&&r.m===-180,'58 · taras de más: se le abonan al chofer',r);
// 59 · día sin movimientos
r=await ev(()=>{S.chofHoy=null;S.chSt={};S.rutasHist=[];S.vlVentas=[];S.gastos=S.gastos.filter(g=>(g.f||g.f82)!==iso(TODAY));var F=cuadre82(iso(TODAY));return {ok:F.every(o=>o.e==='ok'&&/sin movimientos/.test(o.L[0])),sm:sinMov82(iso(TODAY))}});
ok(r.sm&&r.ok,'59 · día sin movimientos: "¿Cuadran las cuentas?" lo dice y todo en verde',r);
r=await ev(()=>{var y=ayerIso();S.gastos=S.gastos.filter(g=>(g.f||g.f82)!==y);S.cargas=S.cargas.filter(c=>c.fecha!==y);S.primerDia=false;S.cajaAyerSkip=false;S.cajaCierres=[];S.sinTrabajo=[];var p=cajaAyerPend();return {p,st:S.sinTrabajo}});ok(r.p===false,'59 · ayer sin movimientos: no pide el cierre de caja (34: el cierre ahora es semanal)',r);
ok(errs.length===0,'sin errores',errs);
console.log(nOK+' OK · '+nF+' FAIL');await b.close()})();
