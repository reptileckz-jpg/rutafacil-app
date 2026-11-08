const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();let nOK=0,nF=0;const ok=(c,m,x)=>{c?nOK++:nF++;console.log((c?'OK   ':'FAIL ')+m+(x!==undefined?' '+JSON.stringify(x):''))};
const p=await b.newPage({viewport:{width:400,height:880}});await p.addInitScript(()=>{window.__pnTest=1});const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.goto('file:///mnt/user-data/outputs/prototipo-platanos.html');await p.waitForTimeout(600);
const ev=(f,a)=>p.evaluate(f,a),W=ms=>p.waitForTimeout(ms),click=s=>ev(s=>{var e=document.querySelector(s);if(!e)return false;e.click();return true},s);
await ev(()=>{S.popVisto={admin:iso(TODAY),cont:iso(TODAY)};S.precio.conf=iso(TODAY);window.__snap=JSON.stringify(S)});
// ===== CAJAS: chofer
await ev(()=>{S=JSON.parse(window.__snap);S.role='rep';S.salida.ok=true;S.cierre.salioR=sum(S.log,function(l){return l.R})+5;S.cierre.salioM=r2(sum(S.log,function(l){return l.M})+12);S.cierre.gxConf=true;S.tab.rep='cierre';S.cierreP=3;render()});await W(200);
let r=await ev(()=>({foto:!!document.querySelector('#regFb'),vis:(function(){var e=document.querySelector('#regFb');return e&&e.offsetParent!==null})()}));ok(r.foto&&r.vis,'chofer: en el paso Cajas sale "Tomar foto"',r);
await p.screenshot({path:'v50/c1.png'});
let inv0=await ev(()=>[S.inv.maduras,S.inv.kgMaduro,S.inv.vacias]);
await ev(()=>{S.cierreP=5;render();var e=document.querySelector('[data-act="enviar"]');e.click()});await W(200);
r=await ev(()=>({sent:S.cierre.sent,t:S.toast,p:S.cierreP}));ok(!r.sent&&/foto/.test(r.t)&&r.p===2,'sin foto no deja enviar y regresa al paso Cajas',r);
await p.setInputFiles('#regF',{name:'f.png',mimeType:'image/png',buffer:require('fs').readFileSync('v50/n0.png')});await W(800);
ok(await ev(()=>!!S.cierre.fotoReg),'la foto se guarda');
await ev(()=>{S.cierreP=5;render();document.querySelector('[data-act="enviar"]').click()});await W(200);console.log('D1',await ev(()=>JSON.stringify({cf:S.confirm&&S.confirm.t,t:S.toast,ok:!!document.querySelector('[data-act="confok"]')})));await ev(()=>{var o=document.querySelector('[data-act="confok"]');if(o)o.click()});await W(200);console.log('D2',await ev(()=>JSON.stringify({cf:S.confirm,t:S.toast,s:S.cierre.sent,m:S.modal&&S.modal.t})));
r=await ev(()=>({sent:S.cierre.sent,pc:S.cierre.porContar,inv:[S.inv.maduras,S.inv.kgMaduro,S.inv.vacias],res:[S.cierre.res.reg,S.cierre.res.regK,S.cierre.res.V]}));
ok(r.sent&&r.pc,'enviado: lo que regresa queda sin contar',r);ok(r.inv[0]===inv0[0]&&Math.abs(r.inv[1]-inv0[1])<0.01,'todavía no entra a bodega',{antes:inv0,despues:r.inv});
// ===== admin
await ev(()=>{S.role='admin';S.tab.admin='inicio';render()});await W(200);
let t=await ev(()=>document.querySelector('main').innerText);ok(/mandó su cierre/.test(t),'Inicio: llegó el cierre');
await ev(()=>{S.tab.admin='cierreadm';render();S.cierreRec=String(S.cierre.res.efectivo);render();var b=document.querySelector('[data-act="regcierre"]')||document.querySelector('[data-act="cierreok0"]');b.click()});await W(150);await ev(()=>{var o=document.querySelector('[data-act="confok"]');if(o)o.click()});await W(400);
r=await ev(()=>({t:S.toast,reg:!!S.cierreReg,img:!!document.querySelector('[data-key="recep"] img')}));ok(r.reg&&/cuenta las cajas/.test(r.t),'A: al recibir el dinero te manda a contar las cajas',r.t);ok(r.img,'el admin puede ver la foto del chofer');
await ev(()=>{S.tab.admin='inicio';render()});await W(150);t=await ev(()=>document.querySelector('main').innerText);ok(/Cajas sin contar de/.test(t),'B: Inicio dice "Cajas sin contar"');
await p.screenshot({path:'v50/c2.png'});
await ev(()=>{S.tab.admin='cierreadm';render();var R=S.cierre.res;document.getElementById('rcR').value=R.reg;document.getElementById('rcM').value=R.regK;document.getElementById('rcV').value=R.V;document.querySelector('[data-act="recep"]').click()});await W(200);
r=await ev(()=>({inv:[S.inv.maduras,S.inv.kgMaduro,S.inv.vacias],pc:S.cierre.porContar,t:S.toast}));ok(!r.pc&&r.inv[0]===inv0[0]+5&&Math.abs(r.inv[1]-(inv0[1]+12))<0.01,'al contar entra completo a bodega',{antes:inv0,despues:r.inv,t:r.t});
await ev(()=>{S.tab.admin='inicio';render()});t=await ev(()=>document.querySelector('main').innerText);ok(!/Cajas sin contar de/.test(t),'ya no sale "Cajas sin contar"');
// ===== MAYOREO
const entrega=async()=>{await ev(()=>{S=JSON.parse(window.__snap);S.role='rep';S.salida.ok=true;var i=curStop();S.cur=i;resetDraft(cl(S.stops[i].c));S.d.R=2;S.d.M=0;S.tab.rep='entrega';render()});await W(150)};
await entrega();
await ev(()=>{chofById(S.chofHoy).mayPerm=true;render()});
await click('[data-act="may"][data-v="1"]');await W(100);await ev(()=>{S.d.pRm=String(num(S.mayMin.R)+5);render()});await W(100);
r=await ev(()=>({e:entValida(),btn:!!document.querySelector('[data-act="maypide"]')}));ok(r.e&&/permiso/.test(r.e[1])&&r.btn,'con "solo con permiso": no deja guardar mayoreo y sale "Pedir permiso"',r.e);
await click('[data-act="maypide"]');await W(200);
let r1=await ev(()=>{var e=document.querySelector('.mayreloj');return e?e.textContent:null});await W(2200);let r2=await ev(()=>{var e=document.querySelector('.mayreloj');return e?e.textContent:null});
ok(r1&&r2&&r1!==r2&&/^4:5\d$/.test(r2),'el chofer ve el cronómetro de 5 minutos corriendo',[r1,r2]);
await p.screenshot({path:'v50/m1.png'});
await ev(()=>{S.role='admin';S.tab.admin='inicio';render()});await W(200);
r=await ev(()=>({card:/Piden permiso para mayoreo/.test(document.querySelector('main').innerText),reloj:!!document.querySelector('main [data-mayt]')}));ok(r.card&&r.reloj,'al admin le sale la tarjeta con Sí/No y el tiempo',r);
await p.screenshot({path:'v50/m2.png'});
await click('[data-act="mayok"]');await W(150);await ev(()=>{S.role='rep';render()});
r=await ev(()=>entValida());ok(r===null||!/permiso/.test(r[1]),'con el sí del admin ya puede guardar (ya no pide permiso)',r);
// se vence
await entrega();await ev(()=>{chofById(S.chofHoy).mayPerm=true;S.d.may=true;S.d.pRm=String(num(S.mayMin.R)+5);S.dOpen.entmas=true;mayPideL().push({c:curCli().id,ch:+S.chofHoy,f:iso(TODAY),t:Date.now()-5*60000+1500,est:'pend',R:2,M:0,pR:300,pM:0});render()});await W(3500);
r=await ev(()=>({tab:S.tab.rep,role:S.role,nota:mayNotaHTML().length,est:mayPideL().slice(-1)[0].est,may:S.d.may,txt:/No contestó a tiempo/.test(document.querySelector('main').innerHTML)}));ok(r.est==='tiempo'&&!r.may&&r.txt,'si no contesta en 5 min: precio normal solo',r);
// cliente "nunca mayoreo"
await entrega();await ev(()=>{curCli().mayNo=true;render()});await click('[data-act="may"][data-v="1"]');await W(100);
r=await ev(()=>({may:S.d.may,t:S.toast}));ok(!r.may&&/no se le da mayoreo/.test(r.t),'cliente marcado "no darle mayoreo": el chofer no puede',r.t);
// cierre: botones y sugerencia
await ev(()=>{S=JSON.parse(window.__snap);if(!S.log.length)S.log.push({c:S.stops[0].c,R:3,M:0,pr:num(S.precio.R),pm:num(S.precio.M),total:3*num(S.precio.R),pago:3*num(S.precio.R),abono:0,V:0});var l=S.log[0];l.mayT='chofer';l.pnR=num(S.precio.R);l.pr=l.pnR-20;l.pnM=num(S.precio.M);l.pm=l.pnM;S.cierre.sent=true;S.cierre.res=cierreRes();S.role='admin';S.tab.admin='cierreadm';S.mayRech=[{ch:+S.chofHoy,c:99,f:iso(TODAY)}];render()});await W(200);
r=await ev(()=>!!document.querySelector('[data-act="mayno"]')&&!!document.querySelector('[data-act="mayfijo"]'));ok(r,'cierre: "No darle mayoreo" y "Hacerlo cliente de mayoreo"');
await click('[data-act="mayno"]');await W(150);
r=await ev(()=>({no:cl(S.log[0].c).mayNo,n:mayRech30(S.chofHoy),sug:!!document.querySelector('[data-act="mayperm"][data-v="1"]')}));ok(r.no&&r.n===2&&r.sug,'2 rechazos en 30 días: te sugiere "solo con mi permiso"',r);
await p.screenshot({path:'v50/m3.png',fullPage:true});
await click('[data-act="mayperm"][data-v="1"]');await W(100);ok(await ev(()=>chofById(S.chofHoy).mayPerm===true),'se activa');
await ev(()=>{S.tab.admin='gastos';S.gsec='sueldos';S.szOpen=S.chofHoy;render()});await W(150);ok(await ev(()=>!!document.querySelector('[data-act="mayperm"]')),'en Gastos › Sueldos (y en la ficha del chofer) está el interruptor');
// ===== sin conexión
await ev(()=>{S=JSON.parse(window.__snap);S.role='rep';S.tab.rep='ruta';render()});await W(100);
await ev(()=>{var b=document.createElement('button');b.dataset.act='senal';document.body.appendChild(b);b.click();b.remove()});await W(200);
r=await ev(()=>({b:(document.querySelector('.sinconx')||{}).innerText,t:S.toast,viejo:/se manda solo cuando vuelva/.test(document.body.innerText)}));ok(/Sin conexión/.test(r.b)&&/tus datos se guardan/.test(r.b)&&!r.viejo&&!/Sin conexión/.test(r.t),'sin conexión: solo una barrita corta (sin mensaje extra)',r);
await p.screenshot({path:'v50/s1.png'});
ok(!errs.length,'sin errores',errs);console.log(nOK+' OK · '+nF+' FAIL');await b.close()})();
