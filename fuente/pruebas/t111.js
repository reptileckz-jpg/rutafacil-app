/* 111 · viaje de una sola fruta: sin "¿A quién se le cargan los gastos?"; la fruta planeada que no se cargó; la otra fruta como opción */
const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();let nOK=0,nF=0;const ok=(c,m,x)=>{c?nOK++:nF++;console.log((c?'OK   ':'FAIL ')+m+(x!==undefined?' '+JSON.stringify(x).slice(0,400):''))};
const p=await (await b.newContext({viewport:{width:390,height:844}})).newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));await p.addInitScript(()=>{window.__pnTest=1});
await p.goto('file:///mnt/user-data/outputs/platanos-primera-vez.html');await p.waitForTimeout(900);const ev=(f,a)=>p.evaluate(f,a);let r;
await ev(()=>{var U=S.setup;U.veh=[{n:'Camioneta Uno',pl:'AAA1',plEdo:'Baja California',comb:'Gasolina',img:0,odo:1000}];U.per=[{n:'Chofer Uno',puesto:'chofer',tel:'1'}];U.cli=[];U.prov=[{n:'Roly',tipo:'Roatán',tel:''}];S.precio.R=300;S.precio.M=20;suAplicar();S.role='admin';S.pinOk[pinKey()]=true;S.popVisto={admin:iso(TODAY)}});
const paso=(id,P)=>ev(([id,P])=>{var c=cargaById(id);var d=document.createElement('div');d.innerHTML=cvPasoHTML(c,P,true);document.body.appendChild(d);var t=d.innerText;d.remove();return t},[id,P]);
// una carga programada con 300 kg de macho PLANEADO; ese día solo se cargó roatán
const id=await ev(()=>{var c={id:S.nextCarga++,fecha:iso(TODAY),prov:'Roly',kgR:2200,pR:8,cajas:100,kgM:300,pM:0,t:{diesel:1500,comida:200,casetas:300,extra:0},extras:[],pag:0,est:'Llegó',vCaja:0,vKgM:0,mg:30,pagBase:0,trBase:0,otros:[],trMode:'kilos',prog:true};S.cargas.push(c);return c.id});
r=await paso(id,'fruta');ok(/¿Sí se cargó macho\?/.test(r)&&/Se había planeado \(300 kg\)/.test(r),'111 · en "La fruta": "¿Sí se cargó macho? Se había planeado (300 kg), pero no tiene precio"',r.slice(0,200));
const antes=await ev(id=>{var c=cargaById(id),k=cC(c);return {caja:k.costoCaja,tr:k.tr}},id);
r=await paso(id,'otros');
// no deja seguir sin contestar
r=await ev(async id=>{S.cvOpen=id;S.cvf={paso:0};render();var b=document.createElement('button');b.dataset.act='cvpaso';b.dataset.d='1';b.dataset.id=id;var t0=toast,m=[];toast=function(x){m.push(x);return t0.apply(this,arguments)};document.body.appendChild(b);b.click();b.remove();toast=t0;return {paso:S.cvf.paso,m}},id);
ok(r.paso===0&&/Contesta si se cargó macho/.test(r.m.join(' ')),'111 · no se pasa del paso sin contestar',r);
r=await ev(async id=>{var b=document.createElement('button');b.dataset.act='fan111no';b.dataset.id=id;b.dataset.k='M';document.body.appendChild(b);b.click();b.remove();var c=cargaById(id),k=cC(c);return {kgM:c.kgM,caja:k.costoCaja,tr:k.tr}},id);
ok(r.kgM===0,'111 · "No se cargó": la carga queda sin macho',r);
ok(Math.abs(r.caja-(2200*8+antes.tr)/100)<0.01&&r.caja>antes.caja,'111 · todo el costo del viaje va al roatán: la caja ya no sale más barata ('+antes.caja.toFixed(2)+' → '+r.caja.toFixed(2)+')',[antes,r]);
r=await paso(id,'otros');ok(!/A quién se le cargan/.test(r),'111 · con una sola fruta ya no pregunta "¿A quién se le cargan los gastos del viaje?"');
r=await paso(id,'venta');ok(!/macho/i.test(r),'111 · y ya no habla del macho en el precio de venta');
// roatán + otra fruta: la otra fruta es una opción
const id2=await ev(()=>{var c={id:S.nextCarga++,fecha:iso(TODAY),prov:'Roly',kgR:2200,pR:8,cajas:100,kgM:0,pM:0,t:{diesel:1500,comida:200,casetas:300,extra:0},extras:[],pag:0,est:'Llegó',vCaja:0,vKgM:0,mg:30,pagBase:0,trBase:0,otros:[{n:'Dominico',compra:'kg',u:'kg',kg:800,p:5,cajas:0,v:0,vc:0}],trMode:'kilos'};S.cargas.push(c);return c.id});
r=await paso(id2,'otros');ok(/A quién se le cargan/.test(r)&&/Dividir entre los dos/.test(r)&&/Solo roatán/.test(r)&&/Solo Dominico/.test(r)&&!/Solo macho/.test(r),'111 · roatán + otra fruta: "Dividir entre los dos", "Solo roatán", "Solo Dominico" (sin macho)',r.slice(r.indexOf('A quién'),r.indexOf('A quién')+120));
r=await ev(id=>{var c=cargaById(id);var b=document.createElement('button');b.dataset.act='trmode';b.dataset.w='c';b.dataset.id=id;b.dataset.v='O';document.body.appendChild(b);b.click();b.remove();var k=cC(c);return {modo:c.trMode,caja:k.costoCaja,otra:k.otros[0].cost,tr:k.tr,fO:k.fO}},id2);
ok(r.modo==='O'&&Math.abs(r.caja-8*2200/100)<0.01&&Math.abs(r.otra-(r.fO+r.tr))<0.01,'111 · "Solo Dominico": todo el costo del viaje va a la otra fruta y la caja de roatán solo lleva su fruta',r);
const id3=await ev(()=>{var c=JSON.parse(JSON.stringify(cargaById(S.cargas[S.cargas.length-1].id)));c.id=S.nextCarga++;c.kgM=500;c.pM=12;c.trMode='kilos';S.cargas.push(c);return c.id});
r=await paso(id3,'otros');ok(/Dividir entre todas/.test(r)&&/Solo macho/.test(r),'111 · con tres frutas: "Dividir entre todas"');
r=await ev(id=>{var c=cargaById(id),k=cC(c);var tr=k.tr,kg=c.kgR+c.kgM+800;return Math.abs((k.costoCaja*100-2200*8)-tr*2200/kg)<0.01},id3);ok(r,'111 · dividir entre todas sigue repartiendo por kilos (como antes)');
ok(!errs.length,'sin errores de página',errs.slice(0,3));
console.log(nOK+' OK · '+nF+' FAIL');await b.close()})();
