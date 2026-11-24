/* 39 · préstamos a empleados: por pasos, descuento del sueldo o efectivo, avisos, recibo, finiquito; la caja y los gastos cuadran */
const {chromium}=require('playwright');let nOK=0,nF=0;const ok=(c,m,x)=>{c?nOK++:nF++;console.log((c?'OK   ':'FAIL ')+m+(x!==undefined?' '+JSON.stringify(x).slice(0,350):''))};
(async()=>{const b=await chromium.launch();const errs=[];
const p=await (await b.newContext({viewport:{width:412,height:900}})).newPage();p.on('pageerror',e=>errs.push(String(e)));p.on('dialog',d=>d.accept());await p.addInitScript(()=>{window.__pnTest=1});
await p.goto('file:///mnt/user-data/outputs/prototipo-platanos.html');await p.waitForTimeout(1100);const ev=(f,a)=>p.evaluate(f,a);let r;
const clic=(act,extra)=>ev(([act,extra])=>{var d=document.createElement('button');d.dataset.act=act;Object.assign(d.dataset,extra||{});document.body.appendChild(d);d.click();d.remove()},[act,extra]);
const wz=async(o)=>{for(const k in o)await ev(([k,v])=>{S.wz.d[k]=v},[k,o[k]]);};
const sig=()=>clic('wzsig');
r=await ev(()=>{S.role='admin';S.encOn=false;S.pinOk[pinKey()]=true;S.tutVisto={admin:true,rep:true};S.popVisto={admin:iso(TODAY)};S.cajaAyerSkip=true;
 var c=S.choferes.filter(c=>esCh(c)&&!esAdm(c))[0];c.sz={tipo:'semana',monto:'2100'};c.pagoHasta118=null;c.baja118='';c.finiq118=null;S.adelantos=[];S.bonos=[];S.faltantes=[];S.prest39=[];window.__C=c;
 S.tab.admin='personal';S.per92='sue';S.szOpen=c.id;render();var t=(document.querySelector('main [data-x="pr39"]')||{}).innerText||'';return {id:c.id,t,caja:cajaEsp(),g:S.gastos.length}});
ok(/Préstamos/.test(r.t)&&/No debe nada/.test(r.t)&&/Prestarle dinero/.test(r.t),'en Sueldos, la tarjeta del empleado tiene "💵 Préstamos" y "Prestarle dinero"',r.t);
const id=String(r.id),caja0=r.caja,g0=r.g;
/* prestar 2000 en 4 pagos */
await clic('pr39new',{id});r=await ev(()=>({wz:S.wz&&S.wz.k,q:(document.querySelector('#wzov .q')||{}).innerText}));
ok(r.wz==='prest39'&&/Cuánto le prestas/.test(r.q),'se abre por pasos: "¿Cuánto le prestas a …?"',r);
await wz({m:'2000'});await sig();await clic('wzop',{k:'forma',v:'sueldo'});await p.waitForTimeout(150);
r=await ev(()=>(document.querySelector('#wzov .q')||{}).innerText);ok(/cuántos pagos/.test(r),'"Se lo descuento de su sueldo" → pregunta en cuántos pagos',r);
await clic('wzop',{k:'n',v:'4'});await p.waitForTimeout(150);await sig();await sig();
r=await ev(()=>(document.querySelector('#wzov')||{}).innerText);ok(/4 pagos de \$500/.test(r)&&!/⚠️/.test(r),'resumen: 4 pagos de $500, sin avisos (no pasa de 2 semanas, no debe nada)',r.slice(0,300));
await clic('wzfin');await p.waitForTimeout(150);
r=await ev(c0=>({wz:!!S.wz,n:S.prest39.length,caja:cajaEsp(),dif:c0-cajaEsp(),g:S.gastos.length,rec:!!S.rec36&&/^data:image\/png/.test(S.rec36.img),h:S.hist.slice(-1)[0].x}),caja0);
ok(!r.wz&&r.n===1&&Math.abs(r.dif-2000)<0.01,'al prestar: salen $2,000 de la caja',r);
ok(r.g===g0,'pero NO es gasto (no se anota en Gastos)',r);
ok(r.rec&&/prestó \$2,000/.test(r.h),'sale el recibo para WhatsApp y queda en el historial',r);
await clic('rec36x');
/* pagar la semana: se descuenta $500 */
r=await ev(()=>{var k=szCalc(__C);S.tab.admin='personal';S.per92='sue';S.szOpen=__C.id;render();return {br:k.br,pagar:k.pagar,pr:k.pr39,des:(document.getElementById('szr_'+__C.id)||{}).innerText||''}});
ok(r.pr===500&&Math.abs(r.pagar-(r.br-500))<0.01&&/Préstamo \(pago 1 de 4\)/.test(r.des),'al pagar la semana: "Préstamo (pago 1 de 4) − $500" y "Total a pagarle" baja $500',r);
const br=r.br;
r=await ev(async()=>{var c0=cajaEsp(),n0=S.gastos.length;var b=document.createElement('button');b.dataset.act='pagarsz';b.dataset.id=String(__C.id);b.dataset.ok='1';document.body.appendChild(b);b.click();b.remove();await new Promise(r=>setTimeout(r,200));
 var G=S.gastos.slice(n0);return {dc:c0-cajaEsp(),gas:G.reduce((a,g)=>a+(+g.m),0),G:G.map(g=>[g.n,g.m,g.caja]),debe:pr39Debe(__C)}});
ok(Math.abs(r.dc-(br-500))<0.01,'la caja baja solo lo que se le pagó ('+(br-500)+')',r);
ok(Math.abs(r.gas-br)<0.01,'el gasto de Sueldos sigue siendo el sueldo completo (pago + préstamo descontado, sin mover la caja)',r);
ok(r.debe===1500,'ahora debe $1,500',r);
await clic('rec36x');
/* abono en efectivo */
await clic('pr39ab',{id});r=await ev(async()=>{var c0=cajaEsp();S.pr39ab.m='300';var b=document.createElement('button');b.dataset.act='pr39abok';b.dataset.id=String(__C.id);document.body.appendChild(b);b.click();b.remove();return {dc:cajaEsp()-c0,debe:pr39Debe(__C)}});
ok(Math.abs(r.dc-300)<0.01&&r.debe===1200,'"Abonó en efectivo" $300: entra a la caja y debe $1,200',r);
/* segundo préstamo: avisa que debe y que es mucho */
await clic('pr39new',{id});await wz({m:'9000'});await sig();await clic('wzop',{k:'forma',v:'efectivo'});await p.waitForTimeout(150);
r=await ev(()=>(document.querySelector('#wzov .q')||{}).innerText);ok(/Para cuándo/.test(r),'"Me lo paga en efectivo" → pregunta para cuándo',r);
await wz({vence:'2000-01-01'});await sig();r=await ev(()=>S.wz.err);ok(/fecha/.test(r),'no deja una fecha pasada',r);
await ev(()=>{S.wz.err='';var d=new Date(TODAY.getTime()+7*864e5);S.wz.d.vence=iso(d)});await sig();await sig();
r=await ev(()=>(document.querySelector('#wzov')||{}).innerText);
ok(/todavía debe \$1,200/.test(r)&&/más de lo que gana en 2 semanas/.test(r),'avisa: "todavía debe $1,200" y "es más de lo que gana en 2 semanas"',r.slice(0,400));
await clic('wzfin');await clic('rec36x');
/* recordatorio si se pasa la fecha */
r=await ev(()=>{var t=TODAY;TODAY=new Date(TODAY.getTime()+10*864e5);var x=hoyTareas().filter(x=>/^pr39/.test(x.k)).map(x=>x.t);TODAY=t;return x});
ok(r.length===1&&/ya se pasó de la fecha/.test(r[0]),'si se pasa la fecha, sale en "Hoy"',r);
/* finiquito: se descuenta lo que debe */
r=await ev(async()=>{var c=__C;c.baja118=iso(TODAY);var F=finiq118(c),debe=pr39Debe(c),c0=cajaEsp(),n0=S.gastos.length;
 var b=document.createElement('button');b.dataset.act='finiq118';b.dataset.id=String(c.id);document.body.appendChild(b);b.click();b.remove();await new Promise(r=>setTimeout(r,200));
 var G=S.gastos.slice(n0);return {F,debe0:debe,debe:pr39Debe(c),dc:c0-cajaEsp(),gas:G.reduce((a,g)=>a+(+g.m),0),fin:c.finiq118}});
ok(r.fin&&r.F.pr39>0&&Math.abs(r.dc-r.F.tot)<0.01&&Math.abs(r.gas-(r.F.tot+r.F.pr39))<0.01&&Math.abs(r.debe-(r.debe0-r.F.pr39))<0.01,'al pagar el finiquito se descuenta lo que debe; la caja baja solo lo pagado',r);
ok(!errs.length,'sin errores',errs);console.log(nOK+' OK · '+nF+' FAIL');await b.close()})();
