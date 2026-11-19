/* 173 · Viaje de carga que nunca salió: aviso, cancelar (deuda, pagos traspasados, caja, cajas vacías) y recuperar (todo vuelve igual). */
const {chromium}=require('playwright');let nOK=0,nF=0;const ok=(c,m,x)=>{c?nOK++:nF++;console.log((c?'OK   ':'FAIL ')+m+(x!==undefined?' '+JSON.stringify(x).slice(0,500):''))};
(async()=>{const b=await chromium.launch();const errs=[];
const p=await (await b.newContext({viewport:{width:390,height:844}})).newPage();p.on('pageerror',e=>errs.push(e.message));p.on('dialog',d=>d.accept());await p.addInitScript(()=>{window.__pnTest=1;window.__hora93=12});
await p.goto('file:///mnt/user-data/outputs/prototipo-platanos.html');await p.waitForTimeout(900);const ev=(f,a)=>p.evaluate(f,a);let r;
r=await ev(()=>{S.tutVisto={rep:true,admin:true};S.popVisto={admin:iso(TODAY),cont:iso(TODAY)};S.role='admin';S.pinOk[pinKey()]=true;
 var hace=function(d){return iso(new Date(TODAY.getTime()-d*864e5))},last=S.cargas.slice().sort(function(a,b){return b.id-a.id})[0];
 var base=function(o){return Object.assign({id:S.nextCarga++,fecha:hace(10),prov:'Prov Prueba',kgR:0,pR:0,cajas:0,kgM:0,pM:0,t:{diesel:0,comida:0,casetas:0,extra:0},extras:[],pag:0,est:'Recibida',vCaja:0,vKgM:0,mg:30,pagBase:0,trBase:0,otros:[],trMode:'kilos'},o)};
 /* una carga recibida que se le debe (5,000) y la del viaje que nunca salió (10,000; programada con $500 para el chofer y 40 cajas vacías) */
 var vieja=base({fecha:hace(12),kgR:500,pR:10,cajas:25});
 var huerf=base({fecha:hace(6),kgR:1000,pR:10,cajas:50,est:'Por llegar',vacEnv:40,prog:true,viaje:{fecha:hace(6),hora:'05:00',chofer:1,veh:1,rec:2,efe:500,gastos:[],ini:false,fin:null,liq:null}});
 S.cargas.push(vieja,huerf);S.inv.vacias=num(S.inv.vacias);
 /* ya le habías pagado 3,000 (1,000 por transferencia) a la del viaje */
 provPagar('Prov Prueba',2000,'Efectivo',huerf.id);provPagar('Prov Prueba',1000,'Transferencia',huerf.id);
 window.__ids={v:vieja.id,h:huerf.id};
 var foto=function(){var pend=sum(provCargas('Prov Prueba'),function(x){return x.pen});return {saldo:r2(provSaldo('Prov Prueba')),pend:r2(pend),caja:r2(cajaEsp()),out:r2(cargaOut()),vac:num(S.inv.vacias)}};
 window.__foto=foto;window.__snap=JSON.stringify(S.cargas.filter(function(c){return c.prov==='Prov Prueba'}));
 render();return {antes:foto(),aviso:avisos().filter(function(x){return /nunca llegó/.test(x)})}});
ok(r.antes.saldo===12000&&r.aviso.length===1&&/Prov Prueba/.test(r.aviso[0])&&/\$10,000|\$7,000/.test(r.aviso[0]),'aviso: "Viaje a … nunca llegó" con lo que cuenta de deuda',r);
const antes=r.antes;
/* el botón en la carga */
r=await ev(()=>{var c=S.cargas.filter(function(x){return x.id===window.__ids.h})[0];return /data-act="c173can"/.test(cargaCard(c))&&!/data-act="c173can"/.test(cargaCard(S.cargas.filter(function(x){return x.id===window.__ids.v})[0]))});
ok(r,'la carga del viaje tiene "Este viaje nunca salió · cancelar"; la recibida no');
/* cancelar */
r=await ev(()=>{var d=document.createElement('button');d.dataset.act='c173can';d.dataset.id=window.__ids.h;document.body.appendChild(d);d.click();d.remove();
 var c=S.cargas.filter(function(x){return x.id===window.__ids.h})[0],v=S.cargas.filter(function(x){return x.id===window.__ids.v})[0];
 return {f:window.__foto(),est:c.est,pagH:c.pag,pagV:v.pag,baseV:v.pagBase,aviso:avisos().filter(function(x){return /nunca llegó/.test(x)}).length,hist:S.hist.slice(-1)[0].x}});
ok(r.est==='Cancelada'&&r.f.saldo===2000&&r.f.pend===2000,'cancelar: la deuda baja exactamente 10,000 y lo pagado (3,000) se descuenta de la otra carga (saldo = lista de pendientes = 2,000)',r);
ok(r.pagV===3000&&r.baseV===1000&&r.pagH===0,'el pago pasa a la otra carga, con su parte por transferencia',r);
ok(r.f.out===antes.out,'la caja no se mueve por el traspaso (lo pagado sigue pagado)',{antes:antes.out,despues:r.f.out});
ok(r.f.caja===Math.round((antes.caja+500)*100)/100&&r.f.vac===antes.vac+40,'los $500 para el chofer regresan a la caja y las 40 cajas vacías a la bodega',{antes,despues:r.f});
ok(r.aviso===0&&/Canceló el viaje/.test(r.hist),'ya no hay aviso y queda en el historial',r);
/* las pantallas abren bien con una carga cancelada */
r=await ev(()=>{var out=[];['cargas','inicio','bodega','estadisticas','cuadre121','gastos'].forEach(function(t){try{S.tab.admin=t;render()}catch(e){out.push(t+': '+e.message)}});
 try{S.openCarga=window.__ids.h;S.tab.admin='cargas';render();var c=S.cargas.filter(function(x){return x.id===window.__ids.h})[0];var h=cargaCard(c);if(!/Viaje cancelado/.test(h))out.push('sin aviso de cancelado')}catch(e){out.push('cargaCard: '+e.message)}return out});
ok(!r.length,'con una carga cancelada abren bien Cargas, Inicio, Bodega, Estadísticas, Cuadre y Gastos',r);
/* recuperar */
r=await ev(()=>{var d=document.createElement('button');d.dataset.act='c173rec';d.dataset.id=window.__ids.h;document.body.appendChild(d);d.click();d.remove();
 return {f:window.__foto(),igual:JSON.stringify(S.cargas.filter(function(c){return c.prov==='Prov Prueba'}))===window.__snap}});
ok(r.igual&&JSON.stringify(r.f)===JSON.stringify(antes),'recuperar: todo queda exactamente como antes',r);
/* no se puede si ya empezó o si su viaje sigue abierto */
r=await ev(()=>{var c=S.cargas.filter(function(x){return x.id===window.__ids.h})[0];c.viaje.ini=true;var a=c173Cancelable(c);c.viaje.ini=false;S.vws.push({cid:c.id,par:[],started:false});var b2=c173Cancelable(c);S.vws.pop();return [a,b2,c173Cancelable(c)]});
ok(JSON.stringify(r)==='[false,false,true]','no se puede cancelar si el viaje ya empezó o si sigue abierto',r);
/* una carga recibida o en viaje de hoy no avisa */
r=await ev(()=>{var c=S.cargas.filter(function(x){return x.id===window.__ids.h})[0];c.fecha=iso(TODAY);var n=avisos().filter(function(x){return /nunca llegó/.test(x)}).length;return n});
ok(r===0,'un viaje de hoy todavía no avisa',r);
ok(!errs.length,'sin errores',errs);console.log(nOK+' OK · '+nF+' FAIL');await b.close()})();
