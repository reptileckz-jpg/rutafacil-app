/* 40 · "Voy a cobrarle": el dueño (Inicio → Ya cobré, gasolina si fue solo en su carro) o un chofer (parada de solo cobro que entrega en su cierre) */
const {chromium}=require('playwright');let nOK=0,nF=0;const ok=(c,m,x)=>{c?nOK++:nF++;console.log((c?'OK   ':'FAIL ')+m+(x!==undefined?' '+JSON.stringify(x).slice(0,350):''))};
(async()=>{const b=await chromium.launch();const errs=[];
const p=await (await b.newContext({viewport:{width:412,height:900}})).newPage();p.on('pageerror',e=>errs.push(String(e)));p.on('dialog',d=>d.accept());await p.addInitScript(()=>{window.__pnTest=1});
await p.goto('file:///mnt/user-data/outputs/prototipo-platanos.html');await p.waitForTimeout(1100);const ev=(f,a)=>p.evaluate(f,a);let r;
const clic=(act,extra)=>ev(([act,extra])=>{var d=document.createElement('button');d.dataset.act=act;Object.assign(d.dataset,extra||{});document.body.appendChild(d);d.click();d.remove()},[act,extra]);
r=await ev(()=>{S.role='admin';S.encOn=false;S.pinOk[pinKey()]=true;S.tutVisto={admin:true,rep:true};S.popVisto={admin:iso(TODAY)};S.cajaAyerSkip=true;S.vcob40=[];
 var L=S.cli.filter(x=>num(x.cred)>500);window.__A=L[0];window.__B=L[1];S.tab.admin='clientes';S.openCli=__A.id;render();var f=document.querySelector('[data-x="vc40"]');return {a:__A.id,b:__B.id,an:__A.n,bt:f&&f.innerText}});
ok(r.bt&&/Voy a cobrarle/.test(r.bt),'en la ficha del cliente que debe: "🚗 Voy a cobrarle"',r);
const A=String(r.a),B=String(r.b),AN=r.an;
await clic('vc40',{id:A});r=await ev(()=>(document.getElementById('vc40ov')||{}).innerText||'');
ok(/¿Quién va a cobrarle\?/.test(r)&&/Yo/.test(r)&&/lo entrega en su cierre/.test(r),'pregunta quién va: Yo o un chofer',r);
await clic('vc40q',{v:'yo'});
r=await ev(()=>{S.openCli=null;S.tab.admin='inicio';render();return (document.querySelector('main [data-x="vc40ini"]')||{}).innerText||''});
ok(/Vas a cobrar/.test(r)&&r.indexOf(AN)>-1,'"Yo": queda en Inicio "💵 Vas a cobrar"',r);
/* ya cobré: fue solo en su carro */
r=await ev(()=>({c0:cajaEsp(),cred0:__A.cred,g0:S.gastos.length,id:S.vcob40[0].id}));const c0=r.c0,cred0=r.cred0,g0=r.g0;
await clic('vc40ya',{i:r.id});await ev(()=>{S.wz.d.m='500'});await clic('wzsig');await clic('wzop',{k:'como',v:'solo'});await p.waitForTimeout(500);
r=await ev(()=>(document.querySelector('#wzov .q')||{}).innerText);ok(/gasolina/.test(r),'"Fui solo a cobrar, en mi carro" → pregunta la gasolina',r);
await ev(()=>{S.wz.d.gas='80'});await clic('wzsig');await clic('wzfin');await p.waitForTimeout(100);
r=await ev(()=>({caja:cajaEsp(),cred:__A.cred,g:S.gastos.slice(-1)[0],n:S.gastos.length,est:S.vcob40[0].est,card:!!document.querySelector('main [data-x="vc40ini"]')}));
ok(Math.abs(r.cred-(cred0-500))<0.01,'el cliente baja lo que debe ($500)',r);
ok(Math.abs((r.caja-c0)-(500-80))<0.01&&r.g.t==='Mi carro (para el negocio)'&&+r.g.m===80,'la caja: +$500 del cobro − $80 de gasolina (gasto "Mi carro (para el negocio)")',r);
ok(r.est==='hecho'&&!r.card,'queda hecho y se quita de Inicio',r);
/* aproveché otra salida: sin gasolina */
await ev(()=>{S.vcob40.push({id:'x2',c:__A.id,quien:'yo',f:iso(TODAY),est:'pend'})});
const o2=await ev(()=>({c0:cajaEsp(),n:S.gastos.length}));
await clic('vc40ya',{i:'x2'});await ev(()=>{S.wz.d.m='100'});await clic('wzsig');await clic('wzop',{k:'como',v:'otra'});await p.waitForTimeout(400);
if(await ev(()=>!!S.wz))await clic('wzfin');
r=await ev(o=>({wz:!!S.wz,dc:cajaEsp()-o.c0,ng:S.gastos.length-o.n,est:S.vcob40.find(x=>x.id==='x2').est}),o2);
ok(!r.wz&&r.est==='hecho'&&Math.abs(r.dc-100)<0.01&&r.ng===0,'"Aproveché otra salida": entra el cobro a la caja y no hay gasto de gasolina',r);
/* un chofer */
r=await ev(()=>{var ch=chofsDia57().filter(c=>+c.id!==+S.chofHoy)[0];window.__CH=ch;S.chSt=S.chSt||{};S.chSt[ch.id]={stops:[]};S.vc40={c:__B.id};render();return ch.id});const CH=String(r);
await clic('vc40q',{v:CH});
r=await ev(()=>{var st=Array.from(p57Stops(__CH.id)||[]);var s=st.filter(x=>+x.c===+__B.id&&x.cob40)[0];return {dbg:JSON.stringify(p57Stops(__CH.id)).slice(0,300),s:!!s||((S.arPas||{})[__CH.id]||[]).indexOf(__B.id)>-1,av:JSON.stringify(S.rutaAv||'').indexOf('Pasa a cobrarle')>-1,p:S.vcob40.slice(-1)[0]}});
ok(r.s&&r.av,'un chofer: le llega como parada nueva "Pasa a cobrarle a …" (solo cobrar)',r);
/* el chofer hace la visita: 0 cajas, abono → en su cierre */
r=await ev(async()=>{S.role='rep';S.chofHoy=__CH.id;S.pinOk[pinKey()]=true;S.pinOk['c:'+__CH.id]=true;S.salida.ok=true;S.salida.f7=iso(TODAY);S.rutaDia80=iso(TODAY);S.cierre.sent=false;S.inv.reparto=20;if(!Array.isArray(S.stops))S.stops=Array.from(S.stops);
 if(!S.stops.some(x=>+x.c===+__B.id&&!x.done))S.stops.push({c:__B.id,cob40:1});S.cur=S.stops.findIndex(x=>+x.c===+__B.id&&!x.done);S.tab.rep='entrega';resetDraft(__B);var d0={R:S.d.R,M:S.d.M};S.d.abono=300;render();var n0=S.log.length,cred0=__B.cred;
 for(let i=0;i<12;i++){var v=[...document.querySelectorAll('button')].filter(x=>x.offsetParent&&/^(Siguiente|Revisar y guardar|Sí, guardar|Guardar entrega|Ya le pedí|Sí)/.test(x.textContent.trim()));if(!v.length)break;v[v.length-1].click();await new Promise(r=>setTimeout(r,150));if(S.log.length>n0)break}
 await new Promise(r=>setTimeout(r,150));var l=S.log.slice(n0)[0];return {d0,l:l&&{R:l.R,M:l.M,ab:l.abono},dc:cred0-__B.cred,p:S.vcob40.slice(-1)[0]}});
ok(r.d0.R===0&&r.d0.M===0,'la visita de solo cobro empieza en 0 cajas y 0 kilos',r.d0);
ok(r.l&&r.l.R===0&&r.l.ab===300&&r.dc===300,'el abono queda en su ruta (lo entrega en su cierre) y el cliente baja lo que debe',r);
ok(r.p.est==='hecho'&&r.p.m===300,'el pendiente queda hecho con lo que cobró',r.p);
/* el chofer lo pone él mismo */
r=await ev(()=>{var C=S.cli.filter(x=>num(x.cred)>0&&!S.stops.some(s=>+s.c===+x.id))[0];var b=document.createElement('button');b.dataset.act='vc40yo';b.dataset.id=String(C.id);document.body.appendChild(b);b.click();b.remove();return {st:S.stops.some(s=>+s.c===+C.id&&s.cob40),p:S.vcob40.slice(-1)[0].quien===+S.chofHoy}});
ok(r.st&&r.p,'el chofer también puede ponerse "Voy a cobrarle" (se agrega a su ruta)',r);
ok(!errs.length,'sin errores',errs);console.log(nOK+' OK · '+nF+' FAIL');await b.close()})();
