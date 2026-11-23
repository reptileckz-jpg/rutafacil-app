/* 31 · cerrar un viaje de carga que YA empezó y no llegó: pregunta qué pasó, efectivo que regresó, gastos y vacías; cuentas como liquidación */
const r2=x=>Math.round(x*100)/100;
const {chromium}=require('playwright');let nOK=0,nF=0;const ok=(c,m,x)=>{c?nOK++:nF++;console.log((c?'OK   ':'FAIL ')+m+(x!==undefined?' '+JSON.stringify(x).slice(0,400):''))};
(async()=>{const b=await chromium.launch();const errs=[];
const p=await (await b.newContext({viewport:{width:390,height:844}})).newPage();p.on('pageerror',e=>errs.push(e.message));p.on('dialog',d=>d.accept());await p.addInitScript(()=>{window.__pnTest=1;window.__hora93=12});
await p.goto('file:///mnt/user-data/outputs/prototipo-platanos.html');await p.waitForTimeout(900);const ev=(f,a)=>p.evaluate(f,a);let r;
const clic=(act,extra)=>ev(([act,extra])=>{var d=document.createElement('button');d.dataset.act=act;Object.assign(d.dataset,extra||{});document.body.appendChild(d);d.click();d.remove()},[act,extra]);
const pon=(k,v)=>ev(([k,v])=>{var i=document.querySelector('#v31ov [data-v31="'+k+'"]');i.value=v;i.dispatchEvent(new Event('input',{bubbles:true}))},[k,v]);
r=await ev(()=>{S.tutVisto={rep:true,admin:true};S.popVisto={admin:iso(TODAY),cont:iso(TODAY)};S.role='admin';S.pinOk[pinKey()]=true;
 var hace=function(d){return iso(new Date(TODAY.getTime()-d*864e5))};
 var base=function(o){return Object.assign({id:S.nextCarga++,fecha:hace(10),prov:'Prov Prueba',kgR:0,pR:0,cajas:0,kgM:0,pM:0,t:{diesel:0,comida:0,casetas:0,extra:0},extras:[],pag:0,est:'Recibida',vCaja:0,vKgM:0,mg:30,pagBase:0,trBase:0,otros:[],trMode:'kilos'},o)};
 var prog=base({fecha:hace(4),kgR:1000,pR:10,cajas:50,est:'Por llegar',vacEnv:40,prog:true,viaje:{fecha:hace(4),hora:'05:00',chofer:1,veh:1,rec:2,efe:500,gastos:[],ini:true,fin:null,liq:null}});
 var vwc=base({fecha:hace(3),kgR:800,pR:10,cajas:40,est:'Por llegar',vacEnv:0,vw:true,viaje:{fecha:hace(3),hora:'06:00',chofer:1,veh:1,rec:2}});
 S.cargas.push(prog,vwc);S.vws=S.vws||[];S.vws.push({cid:vwc.id,started:true,efe:'600',quien:1,par:[]});S.vjEfeOut=(S.vjEfeOut||0)+600;
 window.__ids={p:prog.id,v:vwc.id};window.__f=function(){return {caja:r2(cajaEsp()),vac:num(S.inv.vacias),deuda:r2(sum(provCargas('Prov Prueba'),function(x){return x.pen})),falt:(S.faltantes||[]).filter(x=>x.v31).map(x=>x.m),vws:(S.vws||[]).length}};
 render();return {f:__f(),can:/data-act="c173can"/.test(cargaCard(prog)),bt:/data-act="v31abre"/.test(cargaCard(prog))&&/data-act="v31abre"/.test(cargaCard(vwc)),av:avisos().filter(x=>/sigue en curso/.test(x))}});
const A=r.f;
ok(!r.can&&r.bt,'un viaje que ya empezó no se cancela como "nunca salió", pero sale "Este viaje no llegó · cerrarlo"',r);
ok(r.av.length===2,'aviso: "sigue en curso hace N días: si no llegó, ciérralo"',r.av);
/* programado: le dio 500, regresó 300, gastó 150 → faltan 50; vacías 30 de 40 */
await clic('v31abre',{id:String(await ev(()=>__ids.p))});
r=await ev(()=>document.getElementById('v31ov').innerText);ok(/Paso 1 de 4/.test(r)&&/¿Qué pasó/.test(r),'se abre por pasos: Paso 1 de 4 · ¿Qué pasó?',r.slice(0,120));
await clic('v31paso',{v:'1'});r=await ev(()=>S.v31.err);ok(/Escoge qué pasó/.test(r),'no avanza sin decir qué pasó',r);
await clic('v31que',{v:'sincarga'});await clic('v31paso',{v:'1'});
r=await ev(()=>document.getElementById('v31ov').innerText);ok(/le diste \$500/i.test(r),'paso 2: "Para este viaje le diste $500"',r.slice(0,300));
await pon('reg','300');await pon('gas','150');await clic('v31paso',{v:'2'});
await pon('vac','30');await clic('v31paso',{v:'3'});
r=await ev(()=>document.getElementById('v31ov').innerText);ok(/Faltan \$50/.test(r)&&/30 de 40/.test(r)&&/10 que no regresaron/.test(r),'revisar: faltan $50 (faltante del chofer), vacías 30 de 40',r);
await clic('v31ok');
r=await ev(()=>{var c=S.cargas.filter(x=>x.id===__ids.p)[0];return {f:__f(),est:c.est,cerr:c.cerr31,ov:!!document.getElementById('v31ov'),h:S.hist.slice(-1)[0].x}});
ok(r.est==='Cancelada'&&!r.ov&&r.cerr&&r.cerr.falt===50,'la carga queda Cancelada con lo que pasó',r);
ok(r.f.caja===r2(A.caja+300)&&r.f.vac===A.vac+30&&r.f.falt.indexOf(50)>-1&&r.f.deuda<A.deuda,'cuentas: a la caja solo lo que regresó (+$300), $50 de faltante, 30 vacías a la bodega, ya no es deuda',{antes:A,despues:r.f});
/* viaje en curso (pantalla del viaje): le dio 600 y regresaron los 600 */
await clic('v31abre',{id:String(await ev(()=>__ids.v))});await clic('v31que',{v:'nosalio'});await clic('v31paso',{v:'1'});await pon('reg','600');await pon('gas','0');await clic('v31paso',{v:'2'});await clic('v31paso',{v:'3'});await clic('v31ok');
r=await ev(()=>({f:__f(),est:S.cargas.filter(x=>x.id===__ids.v)[0].est}));
ok(r.est==='Cancelada'&&r.f.vws===A.vws-1&&r.f.caja===r2(A.caja+300+600),'viaje en curso: se quita de "en curso" y los $600 regresan a la caja',{antes:A,despues:r.f});
r=await ev(()=>/data-act="c173rec"/.test(cargaCard(S.cargas.filter(x=>x.id===__ids.p)[0])));ok(!r,'un viaje cerrado así no se "recupera" (sus cuentas ya se hicieron)',r);
ok(!errs.length,'sin errores',errs);console.log(nOK+' OK · '+nF+' FAIL');await b.close()})();
