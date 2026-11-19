/* 142 · "vendí $490 y la ganancia del día sale −$911.38": con 3 cierres del mismo chofer el Cuadre cuenta todo UNA vez (km, desgaste, sueldo,
   comisión); y si la carga está mal capturada (menos cajas o el precio de la caja como precio del kilo), el aviso dice qué carga y qué número. */
const {chromium}=require('playwright');let nOK=0,nF=0;const ok=(c,m,x)=>{c?nOK++:nF++;console.log((c?'OK   ':'FAIL ')+m+(x!==undefined?' '+JSON.stringify(x).slice(0,400):''))};
const r2x=x=>Math.round(x*100)/100;(async()=>{const b=await chromium.launch();const p=await (await b.newContext({viewport:{width:390,height:844}})).newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));p.on('dialog',d=>d.accept());await p.addInitScript(()=>{window.__pnTest=1;window.__hora93=12});
await p.goto('file:///mnt/user-data/outputs/platanos-primera-vez.html');await p.waitForTimeout(900);const ev=(f,a)=>p.evaluate(f,a);
await ev(()=>{var U=S.setup;U.veh=[{n:'Camioneta Uno',pl:'AAA1',plEdo:'Baja California',comb:'Gasolina',img:0,odo:1000}];U.per=[{n:'Danu',puesto:'chofer',tel:'1'}];U.cli=[{n:'Doña Mary',a:'x',tel:'6640000001',dias:[0,1,2,3,4,5,6],cred:0,vac:0,ch:'0'}];U.prov=[];S.precio.R=275;S.precio.M=20;suAplicar();
 var D=S.choferes.filter(c=>c.n==='Danu')[0];window.__D=D.id;D.ing='2026-01-05';D.sz={tipo:'base',monto:'',porDia:'',base:'1500',comC:'5',comK:'0.5',dias:0,cv:0,kv:0};
 S.cargas.push({id:S.nextCarga++,fecha:iso(TODAY),prov:'Roly',kgR:2000,pR:10,cajas:100,kgM:0,pM:0,t:{diesel:0,comida:0,casetas:0,extra:0},extras:[],pag:0,est:'Recibida',vCaja:0,vKgM:0,mg:30,pagBase:0,trBase:0,otros:[],trMode:'kilos'});
 S.pinOk[pinKey()]=true;S.pinOk['c:'+D.id]=true;S.role='rep';S.chofHoy=D.id;chCambiar(D.id);S.vehHoy=S.veh[0].id;S.tab.rep='ruta';render();var bv=document.querySelector('[data-act="bienvgo"]');if(bv)bv.click();S.salida.ok=true;S.cierre.odoIni=1000});
const parte=(odo,R,seguir)=>ev(([odo,R,seguir])=>{S.log.push({c:S.cli[0].id,R:R,M:0,pr:245,pm:20,total:R*245,pago:R*245,abono:0,h:'10:00'});S.salida.ok=true;var ini=S.cierre.odoIni;S.cierre.odo=odo;S.cierre.res=cierreRes();S.cierre.sent=true;S.cierre.corte=corteDatos();S.cierreReg={rec:R*245,f:null};
 if(seguir){var b=document.createElement('button');b.dataset.act='seguir';b.dataset.k='';document.body.appendChild(b);b.click();b.remove()}return {ini:ini,odo:odo,km:num(S.cierre.res&&S.cierre.res.km),iniDespues:S.cierre.odoIni,odoDespues:S.cierre.odo}},[odo,R,seguir]);
let a1=await parte(1050,1,true),a2=await parte(1100,1,true),a3=await parte(1150,0,false);
ok(a1.iniDespues===1050&&a2.iniDespues===1100,'al seguir después de un cierre, el odómetro de salida es el del cierre anterior',[a1,a2]);
const r=await ev(()=>{S.role='admin';var T=cuadreDia121(iso(TODAY)),o=T.ch[0]||{};return {venta:o.venta,gan:o.gan,km:o.km,desg:o.desg,partes:(o.partes||[]).map(x=>[x.n,x.km,x.desg,x.venta]),sueldo:o.sueldo,com:o.com,gasT:o.gasT,neto:o.neto,Tneto:T.neto,costo:costoDia121(iso(TODAY)),T:{gan:T.gan,op:T.op,desg:T.desg,suT:T.suT,comT:T.comT,merma:T.merma}}});
ok(r.venta===490&&r.km===150&&r.partes.map(x=>x[1]).join()==='50,50,50'&&r.desg===105,'3 cierres: $490 vendidos y 150 km (50 cada uno), el desgaste una sola vez por km',r);
ok(r.sueldo===250&&r.com===10&&r.T.suT===250,'el sueldo del día y la comisión cuentan UNA vez (no una por cierre)',r);
ok(r.gan===90&&r.neto===r2x(r.gan-r.gasT-r.desg-r.sueldo-r.com)&&r.Tneto===-275,'neto = ganancia de la fruta − desgaste − sueldo − comisión = −$275 (es real: día de poca venta)',r);
/* la carga mal capturada: 2,000 kg en 40 cajas (50 kg por caja) → la caja "cuesta" $500 y se vende en $275 */
let t=await ev(()=>{var c=S.cargas[S.cargas.length-1];c.cajas=40;var T=cuadreDia121(iso(TODAY));S.tab.admin='cuadre121';S.cu121p='dia';S.cu121d=iso(TODAY);render();var a=[...document.querySelectorAll('.k5alert2')].map(x=>x.innerText).join(' | ');return {neto:T.neto,a:a}});
ok(t.neto<-500&&/La fruta salió con pérdida/.test(t.a),'con la carga mal capturada sale muy negativo y el aviso "La fruta salió con pérdida"',t);
ok(/Se está usando la carga de Roly/.test(t.a)&&/salen 50 kg por caja \(2,000 kg ÷ 40 cajas/.test(t.a)&&/¿escribiste bien cuántas cajas\?/.test(t.a),'el aviso dice QUÉ carga y qué se ve raro (50 kg por caja)',t.a);
t=await ev(()=>{var c=S.cargas[S.cargas.length-1];c.cajas=100;c.pR=200;S.precio.R=275;render();return [...document.querySelectorAll('.k5alert2')].map(x=>x.innerText).join(' | ')});
ok(/el precio por kilo es \$200: ¿es el precio de la CAJA\?/.test(t),'si el precio por kilo es el de la caja, también lo dice',t);
ok(!errs.length,'sin errores',errs);console.log(nOK+' OK · '+nF+' FAIL');await b.close()})();
