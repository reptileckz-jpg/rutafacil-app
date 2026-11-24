/* 34 · sueldo del dueño en gastos fijos (retiro), cierre de caja semanal (sábado), depósito al banco y pagos por transferencia
   que salen del banco, apartado para aguinaldo y vacaciones */
const {chromium}=require('playwright');const r2=x=>Math.round(x*100)/100;let nOK=0,nF=0;const ok=(c,m,x)=>{c?nOK++:nF++;console.log((c?'OK   ':'FAIL ')+m+(x!==undefined?' '+JSON.stringify(x).slice(0,350):''))};
(async()=>{const b=await chromium.launch();const errs=[];
const p=await (await b.newContext({viewport:{width:412,height:900}})).newPage();p.on('pageerror',e=>errs.push(String(e)));p.on('dialog',d=>d.accept());await p.addInitScript(()=>{window.__pnTest=1});
await p.goto('file:///mnt/user-data/outputs/prototipo-platanos.html');await p.waitForTimeout(1100);const ev=(f,a)=>p.evaluate(f,a);let r;
const clic=(act,extra)=>ev(([act,extra])=>{var d=document.createElement('button');d.dataset.act=act;Object.assign(d.dataset,extra||{});document.body.appendChild(d);d.click();d.remove()},[act,extra]);
await ev(()=>{S.role='admin';S.encOn=false;S.pinOk[pinKey()]=true;S.tutVisto={admin:true,rep:true};S.popVisto={admin:iso(TODAY)};S.tab.admin='gastos';S.gsec='fijos';S.dOpen.fijonew=true;render()});
/* 1) gasto fijo marcado como sueldo del dueño */
r=await ev(()=>!!document.querySelector('[data-x="ret34"]'));ok(r,'"Agregar gasto fijo" pregunta si es el sueldo del dueño',r);
await clic('ret34',{v:'1'});
r=await ev(()=>{S.ffn={n:'Mi sueldo',m:'5000',dia:'6',frec:'mensual'};var b=document.querySelector('[data-act="fijoadd"]');b.click();return 1});await p.waitForTimeout(80);
r=await ev(()=>{var f=S.fijos.filter(f=>f.n==='Mi sueldo')[0];return {ret:f&&f.retiro}});ok(r.ret===true,'queda marcado como sueldo del dueño (al pagarlo es "Retiro del dueño": no baja la ganancia)',r);
r=await ev(()=>{var i=S.fijos.findIndex(f=>f.n==='Mi sueldo');var b=document.createElement('button');b.dataset.act='fijopag';b.dataset.i=String(i);b.dataset.ok='1';document.body.appendChild(b);b.click();b.remove();var m=JSON.stringify(S.modal||null).slice(0,300);var y=document.querySelector('[role=dialog] [data-act="fijopag"],#modal [data-act="fijopag"]');if(y)y.click();var g=S.gastos.slice(-1)[0];return g&&g.t||m});
ok(r==='Retiro del dueño','al pagarlo se anota como "Retiro del dueño"',r);
/* 2) caja semanal */
r=await ev(()=>{var keep=TODAY;var res={};sinMov82=function(){return false};TODAY=new Date('2026-11-25T12:00:00');/* miércoles */S.cajaCierres=[];S.primerDia=false;S.cajaAyerSkip=false;S.setup=S.setup||{};S.setup.finF34='2026-01-01';S.sinTrabajo=[];res.mie=cajaAyerPend();
 S.cajaCierres=[{f:'2026-11-21',esp:0,cnt:0,dif:0}];res.cerrado=cajaAyerPend();TODAY=new Date('2026-11-21T12:00:00');/* sábado */S.cajaCierres=[{f:'2026-11-14',esp:0,cnt:0,dif:0}];res.sab=cajaAyerPend();res.tarea=hoyTareas().some(x=>x.k==='cj');TODAY=new Date('2026-11-24T12:00:00');res.tareaMar=hoyTareas().some(x=>x.k==='cj');TODAY=keep;return res});
ok(r.mie===true&&r.cerrado===false,'si el sábado no se cerró la caja, entre semana la pide; si se cerró, no',r);
ok(r.sab===false&&r.tarea===true&&r.tareaMar===false,'el sábado sale "Cerrar la caja de la semana" en Hoy; entre semana ya no se pide cada día',r);
/* 3) banco */
r=await ev(()=>{S.cajaAyerSkip=true;S.tab.admin='inicio';render();return {card:!!document.querySelector('main [data-x="bdep34"]'),caja:r2(cajaEsp()),ban:bancoSaldo()};function r2(x){return Math.round(x*100)/100}});
ok(r.card,'en Inicio sale "🏦 Caja y banco" con "Pasé dinero de la caja al banco"',r);
const c0=r.caja,b0=r.ban;
await clic('bdep34ab');await ev(()=>{S.bdep34.m='1000'});await clic('bdep34si');
r=await ev(()=>({caja:Math.round(cajaEsp()*100)/100,ban:bancoSaldo()}));
ok(r2(r.caja)===r2(c0-1000)&&r2(r.ban)===r2(b0+1000),'depósito: baja la caja y sube el banco',{antes:{c0,b0},despues:r});
r=await ev(async()=>{var c={id:S.nextCarga++,fecha:iso(TODAY),prov:'Prov34',kgR:100,pR:10,cajas:5,kgM:0,pM:0,t:{diesel:0,comida:0,casetas:0,extra:0},extras:[],pag:0,est:'Recibida',vCaja:0,vKgM:0,mg:30,pagBase:0,trBase:0,otros:[],trMode:'kilos'};S.cargas.push(c);var caja=cajaEsp(),ban=bancoSaldo();
 var b=document.createElement('button');b.dataset.act='pagook';b.dataset.n=encodeURIComponent('Prov34');b.dataset.m='500';b.dataset.forma='Transferencia';b.dataset.cid=String(c.id);document.body.appendChild(b);b.click();b.remove();await new Promise(r=>setTimeout(r,150));
 return {caja0:caja,caja:cajaEsp(),ban0:ban,ban:bancoSaldo(),pag:c.pag}});
ok(r.pag===500&&Math.abs(r.caja-r.caja0)<0.01&&Math.abs(r.ban-(r.ban0-500))<0.01,'pago al proveedor por transferencia: sale del banco, no de la caja',r);
/* 4) apartado */
r=await ev(()=>apartado34());ok(r.sem>0&&r.lleva>=0,'apartado semanal para aguinaldo y vacaciones',r);
r=await ev(()=>{var keep=TODAY;TODAY=new Date('2026-11-28T12:00:00');S.tab.admin='inicio';render();var t=!!document.querySelector('main [data-x="apar34"]');TODAY=keep;return t});
ok(r,'el sábado en Inicio sale "🐷 Apartado para aguinaldo y vacaciones"',r);
ok(!errs.length,'sin errores',errs);console.log(nOK+' OK · '+nF+' FAIL');await b.close()})();
