/* 8.7 · 71–74: bloquear solo si salió, avisos agrupados, cuánto cargar sin datos, "no envió su cierre" que se quita solo */
const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();let nOK=0,nF=0;const ok=(c,m,x)=>{c?nOK++:nF++;console.log((c?'OK   ':'FAIL ')+m+(x!==undefined?' '+JSON.stringify(x).slice(0,300):''))};
const p=await (await b.newContext({viewport:{width:400,height:860}})).newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));await p.addInitScript(()=>{window.__pnTest=1;if(window.__hora93==null)window.__hora93=12/* la prueba no depende de la hora: de 12 a 5 a.m. no se bloquea (93) */});
await p.goto('file:///mnt/user-data/outputs/platanos-primera-vez.html');await p.waitForTimeout(900);const ev=(f,a)=>p.evaluate(f,a);let r;
await ev(()=>{var U=S.setup;U.yo='Ricardo';U.veh=[{n:'NP300',pl:'A1',plEdo:'Baja California',comb:'Gasolina',img:0,odo:1}];U.per=[{n:'Danu',puesto:'chofer',tel:'1'}];var d=TODAY.getDay();U.cli=[0,1,2,3].map(i=>({n:'C'+i,a:'x',tel:'1',dias:[0,1,2,3,4,5,6],cred:0,vac:0,ch:'0'}));U.prov=[];S.precio.R=300;S.precio.M=20;suAplicar();window.DANU=S.choferes.find(c=>c.n==='Danu').id});
// 71 · no salió (aunque tenga una entrega): no se bloquea; al admin le avisa
r=await ev(()=>{S.role='rep';S.chofHoy=DANU;S.pinOk['c:'+DANU]=true;arLoad(chNuevo(DANU));S.rutaDia80=iso(new Date(TODAY.getTime()-3*864e5));S.salida.ok=false;S.log=[{c:S.cli[0].id,R:1,M:0,total:300,pago:300}];S.cierre.sent=false;S.dia80=null;S.tab.rep='ruta';var n0=(S.avPrecio||[]).length;render();return {ov:!!document.getElementById('dia80'),dia:S.rutaDia80,log:S.log.length,av:(S.avPrecio||[]).slice(n0).some(x=>/sin haber iniciado ruta.*cuádralo/.test(x))||Object.values(S.atras93||{}).some(e=>e.why==='sinSalir'&&e.ef===300),hist:(S.rutasHist||[]).some(x=>x.sinSalir87)}});
ok(!r.ov&&r.log===0,'71 · no salió a ruta: no se bloquea y le sale la de hoy',r);ok(r.av&&r.hist,'71 · las entregas de ese día se guardan y al admin le queda "📥 Recibir lo que traía" (cobró $300)',r);
// 71 · sí salió: se bloquea
r=await ev(()=>{arLoad(chNuevo(DANU));S.rutaDia80=iso(new Date(TODAY.getTime()-3*864e5));S.salida.ok=true;S.log=[{c:S.cli[0].id,R:1,M:0,total:300,pago:300}];S.cierre.sent=false;S.dia80=null;render();return {ov:!!document.getElementById('dia80')}});ok(r.ov,'71 · sí salió y no mandó cierre: sí pide el cierre',r);
// 74 · admin: el aviso "no envió su cierre" se quita solo si ya no aplica
r=await ev(()=>{var ch=DANU;S.role='admin';S.pinOk[pinKey()]=true;S.chofHoy=null;S.chSt={};S.chSt[ch]=chNuevo(ch);S.chSt[ch].rutaDia80=iso(new Date(TODAY.getTime()-864e5));S.chSt[ch].salida={ok:false};S.chSt[ch].log=[{c:1}];S.avPrecio=['URGENTE: Danu no envió su cierre de ayer (x). Pídele que lo envíe.'];S.tab.admin='inicio';render();return {queda:S.avPrecio.length,card:!!document.querySelector('[data-x="dia80a"] [data-act="lib86"]')}});
ok(r.queda===0&&!r.card,'74 · no salió: el aviso "no envió su cierre" se quita solo y no hay nada que liberar',r);
r=await ev(()=>{var ch=DANU;S.chSt[ch].salida={ok:true};S.avPrecio=['URGENTE: Danu no envió su cierre de ayer (x). Pídele que lo envíe.'];render();var d=avDestino(S.avPrecio[0]);return {queda:S.avPrecio.length,card:!!document.querySelector('[data-x="dia80a"] [data-act="lib86"]'),t:d&&d.t}});
ok(r.queda===1&&r.card&&r.t==='inicio','74 · si sí salió: el aviso se queda y te lleva a Inicio, donde está "Liberar su ruta de hoy"',r);
r=await ev(()=>{S.chofHoy=DANU;var o=S.chSt[DANU];delete S.chSt[DANU];arLoad(o);S.tab.admin='cierreadm';render();var c=document.querySelector('[data-x="cad87"]');var lab=SEC86.cierreadm;S.chofHoy=null;return {c:!!c,b:c?!!c.querySelector('[data-act="lib86"]'):false,lab}});
ok(r.c&&r.b&&r.lab==='Cierre del chofer','74 · la pantalla del cierre trae "Recordarle" y "Liberar su ruta de hoy"; ya no dice "cierreadm"',r);
// 72 · avisos agrupados
r=await ev(()=>agrupa87(['Mañana también te toca A · Mañana también te toca B · Mañana también te toca C · Mañana también te toca D · Mañana también te toca E','Mañana también te toca F','El administrador liberó tu ruta de hoy. Lo de antes lo cuadras con él.','El administrador liberó tu ruta de hoy. Lo de antes lo cuadras con él.']));
ok(r.length===2&&/Mañana te tocan también 6 clientes: A, B, C y 3 más/.test(r[0])&&/liberó/.test(r[1]),'72 · "Mañana te tocan también 6 clientes: A, B, C y 3 más" y sin repetidos',r);
// 73 · pocos datos
r=await ev(()=>{S.role='rep';S.chofHoy=DANU;arLoad(chNuevo(DANU));S.salida.ok=false;S.rutasHist=[{f:'2026-11-01',ch:DANU,log:[{c:S.cli[0].id,R:9,M:300,total:1,pago:1}]}];S.tab.rep='ruta';render();var ib=[...document.querySelectorAll('main button')].find(b=>/Iniciar ruta/.test(b.textContent));if(ib)ib.click();render();var t=document.querySelector('main').innerText;return {poco:/no hay datos suficientes/.test(t),abajo:/Sugerido para hoy/.test(t)}});
ok(r.poco&&!r.abajo,'73 · si menos de la mitad tiene historial: "Todavía no hay datos suficientes" y no inventa un número',r);
ok(errs.length===0,'sin errores',errs);
console.log(nOK+' OK · '+nF+' FAIL');await b.close()})();
