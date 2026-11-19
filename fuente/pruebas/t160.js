/* 160 · aviso al chofer y al administrador: con muy pocas cajas la vuelta no deja ganancia; dice el mínimo de cajas para no perder y para ganar
   algo. Si una salida anterior ya cubrió el sueldo del día, solo cuenta la gasolina y el desgaste. */
const {chromium}=require('playwright');let nOK=0,nF=0;const ok=(c,m,x)=>{c?nOK++:nF++;console.log((c?'OK   ':'FAIL ')+m+(x!==undefined?' '+JSON.stringify(x).slice(0,500):''))};
(async()=>{const b=await chromium.launch();const p=await (await b.newContext({viewport:{width:390,height:844}})).newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));p.on('dialog',d=>d.accept());await p.addInitScript(()=>{window.__pnTest=1;window.__hora93=12});
await p.goto('file:///mnt/user-data/outputs/platanos-primera-vez.html');await p.waitForTimeout(900);const ev=(f,a)=>p.evaluate(f,a);let r;
await ev(()=>{var U=S.setup;U.veh=[{n:'Camioneta Uno',pl:'AAA1',plEdo:'Baja California',comb:'Gasolina',img:0,odo:1000}];U.per=[{n:'Danu',puesto:'chofer',tel:'1'}];U.cli=[{n:'Doña Mary',a:'x',tel:'6640000001',dias:[0,1,2,3,4,5,6],cred:0,vac:0,ch:'0'}];U.prov=[];S.precio.R=275;S.precio.M=20;suAplicar();
 var v=S.veh[0];v.precio=25;v.rend0=8;v.hist=[];v.desg=0.7;S.cli[0].km=10;
 var D=S.choferes.filter(c=>c.n==='Danu')[0];window.__D=D.id;D.ing='2026-01-05';D.sz={tipo:'base',monto:'',porDia:'',base:'1500',comC:'5',comK:'0.5',dias:0,cv:0,kv:0};
 S.cargas.push({id:S.nextCarga++,fecha:iso(TODAY),prov:'Roly',kgR:2000,pR:10,cajas:100,kgM:0,pM:0,t:{diesel:0,comida:0,casetas:0,extra:0},extras:[],pag:0,est:'Recibida',vCaja:0,vKgM:0,mg:30,pagBase:0,trBase:0,otros:[],trMode:'kilos'});
 S.pinOk[pinKey()]=true;S.pinOk['c:'+D.id]=true;S.role='rep';S.chofHoy=D.id;chCambiar(D.id);S.vehHoy=S.veh[0].id;S.tab.rep='ruta';render();var bv=document.querySelector('[data-act="bienvgo"]');if(bv)bv.click();
 S.salida.ok=true;S.cierre.odoIni=1000;S.stops=[{c:S.cli[0].id,done:false}];S.inv.reparto=3;S.tutVisto={rep:true,admin:true};render()});
r=await ev(()=>({x:viaje160(window.__D),t:(document.querySelector('main [data-k="viaje160"]')||{}).innerText||''}));
ok(r.x&&r.x.km===20&&r.x.vuelta===76.5&&r.x.deja===70&&r.x.fijo===250,'1ª salida: vuelta 20 km × ($25/8 km por litro + $0.70) = $76.50; cada caja deja $70 ($275 − $200 − $5 de comisión); falta el sueldo $250',r.x);
ok(r.x.min===5&&r.x.minG===7&&r.x.malo,'mínimo 5 cajas para no perder y 7 para ganar algo',r.x);
ok(/Con 3 cajas esta vuelta sale con pérdida/.test(r.t)&&/mínimo 5 cajas/.test(r.t)&&/7 cajas/.test(r.t)&&/todavía no se cubren los gastos del día/.test(r.t),'el chofer ve el aviso arriba de su ruta con el mínimo',r.t);
ok(!/\$200|\$250|\$70|costó|sueldo/.test(r.t),'al chofer NO se le enseña el costo de la fruta, lo que deja cada caja ni el sueldo',r.t);
r=await ev(()=>{S.inv.reparto=8;render();return [viaje160(window.__D).malo,!!document.querySelector('main [data-k="viaje160"]')]});ok(r[0]===false&&!r[1],'con 8 cajas no sale nada',r);
r=await ev(()=>{S.inv.reparto=3;S.log.push({c:S.cli[0].id,R:1,M:0,pr:275,pm:20,total:275,pago:275,abono:0,h:'10:00'});render();var a=!!document.querySelector('main [data-k="viaje160"]');S.log=[];return a});ok(!r,'ya empezó a entregar: ya no sale (es para antes de salir)');
/* 1ª salida grande que cubre el sueldo, y 2ª salida chica */
r=await ev(()=>{S.log.push({c:S.cli[0].id,R:20,M:0,pr:275,pm:20,total:5500,pago:5500,abono:0,h:'10:00'});S.cierre.odo=1020;S.cierre.res=cierreRes();S.cierre.sent=true;S.cierre.corte=corteDatos();S.cierreReg={rec:5500,f:null};
 var bt=document.createElement('button');bt.dataset.act='seguir';bt.dataset.k='';document.body.appendChild(bt);bt.click();bt.remove();S.salida.ok=true;S.stops=[{c:S.cli[0].id,done:false}];S.inv.reparto=2;S.tab.rep='ruta';render();
 return {x:viaje160(window.__D),t:(document.querySelector('main [data-k="viaje160"]')||{}).innerText||''}});
ok(r.x&&r.x.fijo===0&&r.x.min===2&&r.x.minG===3&&r.x.malo,'2ª salida: el sueldo ya lo cubrió la 1ª → solo gasolina y desgaste: mínimo 2 cajas para no perder, 3 para ganar algo',r.x);
ok(/Con 2 cajas esta vuelta casi no deja ganancia/.test(r.t)&&/se comen casi toda la ganancia/.test(r.t)&&!/gastos del día/.test(r.t),'el aviso lo dice (sin gastos del día pendientes)',r.t);
r=await ev(()=>{S.inv.reparto=5;render();return !!document.querySelector('main [data-k="viaje160"]')});ok(!r,'2ª salida con 5 cajas: ya no sale aviso (deja ganancia)');
/* el administrador */
r=await ev(()=>{S.inv.reparto=2;S.role='admin';S.pinOk[pinKey()]=true;S.tab.admin='inicio';render();var x=document.querySelector('main [data-k="viaje160"]');return x?x.innerText:''});
ok(/Danu salió con 2 cajas: la vuelta casi no deja ganancia/.test(r)&&/mínimo 2 cajas/.test(r)&&/el sueldo del día ya lo cubrió una salida anterior/.test(r)&&/costó \$200/.test(r),'el administrador lo ve en Inicio',r);
ok(!errs.length,'sin errores',errs);console.log(nOK+' OK · '+nF+' FAIL');await b.close()})();
