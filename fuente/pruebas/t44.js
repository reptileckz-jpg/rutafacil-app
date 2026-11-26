/* 44 · "Borrar los datos de prueba" borra también lo nuevo, vacía la ruta de cada chofer en la nube, pregunta el efectivo y todo cuadra */
const {chromium}=require('playwright');let nOK=0,nF=0;const ok=(c,m,x)=>{c?nOK++:nF++;console.log((c?'OK   ':'FAIL ')+m+(x!==undefined?' '+JSON.stringify(x).slice(0,400):''))};
(async()=>{const b=await chromium.launch();const errs=[];
const p=await (await b.newContext({viewport:{width:412,height:900},acceptDownloads:true})).newPage();p.on('pageerror',e=>errs.push(String(e)));p.on('dialog',d=>d.accept());await p.addInitScript(()=>{window.__pnTest=1;window.__hora93=9});
await p.goto('file:///mnt/user-data/outputs/platanos-primera-vez.html');await p.waitForTimeout(1200);const ev=(f,a)=>p.evaluate(f,a);let r;
const clic=(act,extra)=>ev(([act,extra])=>{var d=document.createElement('button');d.dataset.act=act;Object.assign(d.dataset,extra||{});document.body.appendChild(d);d.click();d.remove()},[act,extra]);
/* la app real, ya configurada, con movimientos de prueba */
r=await ev(()=>{var bv=document.getElementById('bienv');if(bv)bv.remove();var U=S.setup;U.veh=[{n:'Camioneta Uno',pl:'AAA1',plEdo:'Veracruz',comb:'Gasolina',img:0,odo:1000}];U.per=[{n:'Danu',puesto:'chofer',tel:'1'},{n:'Rafa',puesto:'chofer',tel:'2'}];U.cli=[];for(var i=0;i<6;i++)U.cli.push({n:'Cliente '+i,a:'x'+i,tel:''+i,dias:[0,1,2,3,4,5,6],cred:i%2?300:0,vac:i%2,ch:'0'});U.prov=[];S.inv.vacias=100;S.inv.verdes=40;S.precio.R=275;S.precio.M=20;S.cajaBase=5000;suAplicar();_pin.modo=null;
 S.tutVisto={rep:true,admin:true};S.popVisto={admin:iso(TODAY)};S.role='admin';S.pinOk[pinKey()]=true;render();
 var ch=S.choferes.filter(c=>esCh(c)&&!esAdm(c));var c=ch[0],c2=ch[1];
 S.prest39=[{id:'p1',ch:c.id,m:1000,f:iso(TODAY),forma:'sueldo',n:2,cuota:500,abonos:[]}];S.bancoMov=[{f:iso(TODAY),m:2000,t:'Depósito desde la caja'}];S.vcob40=[{id:'v1',c:S.cli[0].id,quien:'yo',f:iso(TODAY),est:'pend'}];
 S.adelantos=[{ch:c.id,m:300,pend:true}];S.bonos=[{ch:c.id,m:100,pend:true}];S.gastos.push({t:'Combustible',m:500,n:'prueba'});S.cobros.push({c:S.cli[1].id,m:200});
 c.pagoHasta118='2026-01-03';c.agui118={2026:iso(TODAY)};c.aguiP36={2026:[{f:iso(TODAY),m:500}]};c.faltas118=[iso(TODAY)];
 S.chSt=S.chSt||{};S.chSt[c2.id]=chNuevo(+c2.id);S.chSt[c2.id].log=[{c:S.cli[2].id,R:5,M:0,total:1375,pago:1375}];
 window.__C=c;window.__C2=c2;return {arr:!!S.arr33,caja:cajaEsp(),log2:S.chSt[c2.id].log.length}});
ok(r.arr&&r.log2===1,'antes: hay periodo de arranque, préstamos, banco, cobros, adelantos y una venta en la ruta de otro chofer',r);
/* borrar */
await clic('borrapr');r=await ev(()=>!!S.modal&&S.modal.b.map(x=>x[1]).join());ok(/borraprsi/.test(r),'"Borrar los datos de prueba" pregunta antes',r);
await clic('borraprsi');await p.waitForTimeout(900);
r=await ev(()=>({prest:S.prest39.length,banco:S.bancoMov.length,vc:S.vcob40.length,adel:S.adelantos.length,bon:S.bonos.length,gas:S.gastos.length,cob:S.cobros.length,
 arr:S.arr33&&S.arr33.ini,hoy:iso(TODAY),pago:__C.pagoHasta118,agui:!!__C.aguiP36,falt:!!__C.faltas118,t0:S.cajasT0,vjo:S.vjEfeOut,log2:((S.chSt||{})[__C2.id]||{}).log,b44:!!document.getElementById('b44ov')}));
ok(!r.prest&&!r.banco&&!r.vc&&!r.adel&&!r.bon&&!r.gas&&!r.cob,'borra préstamos, banco, "Voy a cobrarle", adelantos, bonos, gastos y cobros',r);
ok(r.arr===r.hoy,'el periodo de arranque vuelve a empezar hoy (2 semanas desde el borrado)',r);
ok(r.pago<r.hoy&&r.pago>'2026-11-01','cada empleado: sin pagos ni aguinaldo ni faltas de prueba; la semana real empieza hoy',r);
ok(!r.agui&&!r.falt&&r.t0===0&&r.vjo===0,'sin aguinaldo ni faltas de prueba; conteo inicial de cajas y efectivo de viajes en 0',r);
ok(Array.isArray(r.log2)&&r.log2.length===0,'la ruta de OTRO chofer también queda vacía (para que la nube no la regrese)',r.log2);
ok(r.b44,'pregunta "¿Cuánto efectivo hay hoy?"',r.b44);
r=await ev(()=>{S.b44.m='8500';var b=document.createElement('button');b.dataset.act='b44ok';document.body.appendChild(b);b.click();b.remove();return {caja:cajaEsp(),ov:!!document.getElementById('b44ov')}});
ok(Math.abs(r.caja-8500)<0.01&&!r.ov,'la caja empieza con lo contado ($8,500)',r);
r=await ev(()=>{var R=cuentasRevisar();return R.filter(x=>!x.ok).map(x=>x.n+': '+x.det)});
ok(r.length===0,'después de borrar, "¿Cuadran las cuentas?" no marca nada',r);
r=await ev(()=>{var k=szCalc(__C);return {vacio:k.vacio,ini:k.ini,hoy:iso(TODAY)}});
ok(!r.vacio&&r.ini<=r.hoy,'el sueldo de esta semana se puede pagar (no sale como "ya pagado")',r);
/* préstamo: avisa si no alcanza la caja */
r=await ev(()=>{wzAbre('prest39',{ch:__C.id,m:'99999',forma:'efectivo',vence:iso(new Date(TODAY.getTime()+864e5))});S.wz.p=99;render();return (document.querySelector('#wzov')||{}).innerText||''});
ok(/En la caja solo debería haber/.test(r),'préstamo: avisa si en la caja no alcanza',r.slice(0,200));
await ev(()=>{S.wz=null;render()});
/* doble toque */
r=await ev(()=>['ag36mitad','pr39abok','bdep34ok','vc40q','c43si'].every(a=>DOBLE_RE.test(a)));ok(r,'aguinaldo, préstamo, banco, "Voy a cobrarle" y cancelar viaje protegidos contra doble toque',r);
r=await ev(()=>{var e0=NB.est;NB.est='decide';var h=nbOvHTML();NB.est=e0;var d=document.createElement('div');d.innerHTML=h;return [...d.querySelectorAll('button')].map(b=>b.className+':'+b.textContent)});
ok(/^nbbtn:Empezar desde cero/.test(r[0]||''),'cuenta nueva: en "¿Qué subimos a la nube?" el botón principal es "Empezar desde cero"',r);
ok(!errs.length,'sin errores',errs);console.log(nOK+' OK · '+nF+' FAIL');await b.close()})();
