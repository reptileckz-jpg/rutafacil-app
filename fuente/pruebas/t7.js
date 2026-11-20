/* 6 (nueva numeración) · parte 2: "🔎 Descuadres": junta taras, efectivo (caja y choferes), kilos/cajas llenas y lo que falta recibir; foto diaria;
   notas, "Revisando", "Ya apareció", ajuste de taras (con motivo) y deshacerlo. La pantalla no cambia ningún número. */
const {chromium}=require('playwright');let nOK=0,nF=0;const ok=(c,m,x)=>{c?nOK++:nF++;console.log((c?'OK   ':'FAIL ')+m+(x!==undefined?' '+JSON.stringify(x).slice(0,350):''))};
(async()=>{const b=await chromium.launch();const errs=[];
for(const arch of ['prototipo-platanos.html','platanos-primera-vez.html']){
const p=await (await b.newContext({viewport:{width:412,height:900}})).newPage();p.on('pageerror',e=>errs.push(e.message));p.on('dialog',d=>d.accept());
await p.addInitScript(()=>{window.__pnTest=1;window.__hora93=9});await p.goto('file:///mnt/user-data/outputs/'+arch);await p.waitForTimeout(800);const ev=(f,a)=>p.evaluate(f,a);let r;
await ev(()=>{var bv=document.getElementById('bienv');if(bv)bv.remove();
 if(S.setup&&!S.setup.fin){var U=S.setup;U.veh=[{n:'Camioneta Uno',pl:'AAA1',plEdo:'Baja California',comb:'Gasolina',img:0,odo:1000}];U.per=[{n:'Danu',puesto:'chofer',tel:'1'},{n:'Beto',puesto:'chofer',tel:'2'}];U.cli=[{n:'Doña Mary',a:'x',tel:'1',dias:[0,1,2,3,4,5,6],cred:0,vac:5,ch:'0'}];U.prov=[];S.precio.R=275;S.precio.M=20;suAplicar();_pin.modo=null}
 S.role='admin';S.encOn=false;S.tutVisto={rep:true,admin:true};S.cajasT0=S.cajasT0+(cajasDonde().tot-cajasEsperadas());S.cajaCierres=[];S.faltantes=[];S.mermas=[];S.atras93={};S.casos6={};S.foto6={};S.tab.admin='inicio';render()});
/* todo cuadra: no hay casos ni tarjeta */
r=await ev(()=>({n:casosAb6().length,card:!!document.querySelector('[data-x="desc6i"]')}));ok(r.n===0&&!r.card,arch+' · si todo cuadra no hay casos ni tarjeta en Inicio',r);
/* la foto del día y "cuadraba hasta" */
r=await ev(()=>{var ay=iso(new Date(TODAY.getTime()-864e5));foto6Toma(true);var h=S.foto6[iso(TODAY)];S.foto6[ay]=JSON.parse(JSON.stringify(h));S.foto6[ay].t.dif=0;return {hoy:!!h,dif:h.t.dif,tot:h.t.tot,cuadraba:cuadraba6()===ay}});
ok(r.hoy&&r.dif===0&&r.cuadraba,arch+' · se guarda la foto del día y se sabe hasta cuándo cuadraba',r);
/* se pierden 3 vacías de la bodega */
r=await ev(()=>{S.inv.vacias-=3;var I=invOf(1);if(I!==S.inv)I.vacias-=3;render();var L=casosAb6();var t=L.filter(c=>c.tipo==='T')[0];return {n:L.length,t:t&&t.tit,dif:t&&t.dif,card:!!document.querySelector('[data-x="desc6i"]')}});
ok(r.t==='Faltan 3 taras'&&r.card,arch+' · faltan 3 taras: sale el caso y la tarjeta en Inicio',r);
/* caja que no cuadró, faltante de un chofer, kilos que faltaron, cierre sin recibir */
r=await ev(()=>{var D=S.choferes.filter(c=>esCh(c))[0];var hoy=iso(TODAY),ay=iso(new Date(TODAY.getTime()-864e5));
 S.cajaCierres.push({f:ay,ayer:ay,h:'20:00',esp:5000,cnt:4800,dif:-200,q:'Ricardo'});
 S.faltantes.push({ch:D.id,m:150,fecha:hoy,desc:true,pend:true});S.faltantes.push({ch:D.id,m:900,fecha:hoy,desc:true,pend:true,arrastre:true});
 S.mermas.push({tipo:'Faltante al regresar',fecha:hoy,R:1,M:5,valor:300,txt:D.n});
 var o=chNuevo(+D.id);o.rutaDia80=ay;o.salida.ok=true;o.invR=4;o.log=[{c:S.cli[0].id,R:2,M:0,pr:275,total:550,pago:550,abono:0,V:1}];S.atras93[D.id+'|'+ay]={id:+D.id,f:ay,why:'liberada',env:false,ef:550,cj:4,pack:o};S.cajasT0+=5;/* sus 4 llenas y 1 vacía ya existían */
 var L=casosAb6();return {tipos:L.map(c=>c.tipo).sort().join(''),tits:L.map(c=>c.tit)}});
ok(r.tipos==='AEFKT',arch+' · salen los 5: taras, caja, faltante del chofer (no el sueldo pendiente), kilos y lo sin recibir',r);
/* la pantalla */
const snap=await ev(()=>JSON.stringify([S.inv,S.cli.map(c=>c.vac),S.cajasMov,S.log,S.faltantes,S.mermas,S.cajaCierres,cajaEsp()]));
r=await ev(()=>{S.tab.admin='mas';render();var b=document.querySelector('[data-act="desc6"]');if(!b)return 'sin entrada en Más';b.click();var m=document.querySelector('main').innerText;return {tab:S.tab.admin,h:/Descuadres/.test(m),grupos:['Taras','Efectivo','Kilos','Sin recibir'].every(g=>m.indexOf(g)>-1)}});
ok(r.tab==='desc6'&&r.h&&r.grupos,arch+' · Más → Descuadres abre la pantalla con los 4 grupos',r);
r=await ev(()=>{var k=casosAb6().filter(c=>c.tipo==='T')[0].k;document.querySelector('[data-act="desc6o"][data-k="'+k+'"]').click();var t=document.querySelector('[data-x="caso6"][data-k="'+k+'"]').innerText;return {t:t.slice(0,900)}});
ok(/Cuadraban hasta el/.test(r.t)&&/Vacías en bodega/.test(r.t)&&/\(-3\)/.test(r.t)&&/Pistas/.test(r.t)&&/Lo que movió taras/.test(r.t),arch+' · el detalle de taras dice hasta cuándo cuadraba, la tabla por lugar (−3 en bodega), lo que se movió y pistas',r);
r=await ev(()=>{var k=casosAb6().filter(c=>c.tipo==='E')[0].k;document.querySelector('[data-act="desc6o"][data-k="'+k+'"]').click();return document.querySelector('[data-x="caso6"][data-k="'+k+'"]').innerText.slice(0,400)});
ok(/Debía haber/.test(r)&&/\$5,000/.test(r)&&/\$4,800/.test(r),arch+' · el detalle de la caja: debía haber, se contó, diferencia',r);
r=await ev(()=>{var k=casosAb6().filter(c=>c.tipo==='A')[0].k;document.querySelector('[data-act="desc6o"][data-k="'+k+'"]').click();return document.querySelector('[data-x="caso6"][data-k="'+k+'"]').innerText.slice(0,500)});
ok(/Todo lo de esta ruta/.test(r)&&/Recibirlo ahora/.test(r),arch+' · lo sin recibir enseña todo lo de esa ruta y "Recibirlo ahora"',r);
/* la pantalla no cambió ningún número */
r=await ev(a=>JSON.stringify([S.inv,S.cli.map(c=>c.vac),S.cajasMov,S.log,S.faltantes,S.mermas,S.cajaCierres,cajaEsp()])===a,snap);
ok(r,arch+' · abrir la pantalla y los detalles no cambia inventario, taras de clientes, movimientos, ventas, faltantes, mermas ni caja',r);
/* notas y estados */
r=await ev(()=>{var k=casosAb6().filter(c=>c.tipo==='F')[0].k;S.desc6o=k;render();var t=document.querySelector('#nota6');t.value='Dice que pagó una caseta';t.dispatchEvent(new Event('input',{bubbles:true}));document.querySelector('[data-act="desc6nota"]').click();var s=S.casos6[k];return {est:s.est,n:s.notas.length,x:s.notas[0].x}});
ok(r.est==='rev'&&r.n===1&&/caseta/.test(r.x),arch+' · "Anotar" guarda la nota con quién y cuándo, y pasa a "Revisando"',r);
r=await ev(()=>{var k=casosAb6().filter(c=>c.tipo==='F')[0].k;document.querySelector('[data-act="desc6ok"][data-k="'+k+'"]').click();return {ab:casosAb6().some(c=>c.k===k),est:S.casos6[k].est,falt:S.faltantes.length}});
ok(!r.ab&&r.est==='res'&&r.falt===2,arch+' · "Ya apareció" lo pasa a resueltos sin tocar el faltante',r);
/* ajuste de taras: pide motivo, cuadra, y se puede deshacer */
r=await ev(()=>{var c=casosAb6().filter(c=>c.tipo==='T')[0];S.desc6o=c.k;S.desc6n='';render();var b=document.querySelector('[data-act="desc6aj"]');b.click();var sin=tarasDif86();
 var t=document.querySelector('#nota6');t.value='Se rompieron 3 en la bodega';t.dispatchEvent(new Event('input',{bubbles:true}));document.querySelector('[data-act="desc6aj"]').click();
 return {sin,con:tarasDif86(),mov:S.cajasMov[S.cajasMov.length-1],k:c.k,est:S.casos6[c.k].est}});
ok(r.sin===-3&&r.con===0&&r.mov.n===-3&&/Se rompieron/.test(r.mov.t)&&r.est==='res',arch+' · "Ajustar" sin nota no hace nada; con motivo anota el movimiento (−3) y cuadra',r);
r=await ev(k=>{S.desc6v='res';S.desc6o=k;render();document.querySelector('[data-act="desc6re"][data-k="'+k+'"]').click();return {dif:tarasDif86(),est:S.casos6[k].est,mov:S.cajasMov[S.cajasMov.length-1].n}},r.k);
ok(r.dif===-3&&r.est==='rev'&&r.mov===3,arch+' · "Reabrir y deshacer el ajuste" anota el movimiento contrario y el caso vuelve',r);
await p.close()}
ok(!errs.length,'sin errores',errs);console.log(nOK+' OK · '+nF+' FAIL');await b.close()})();
