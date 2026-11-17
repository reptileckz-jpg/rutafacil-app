/* 108 cobrarle las taras al cliente (y castigo al chofer a mitad de precio) · 109 recordar lo que ya debía · 110 "Cargar más": parada a la bodega */
const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();let nOK=0,nF=0;const ok=(c,m,x)=>{c?nOK++:nF++;console.log((c?'OK   ':'FAIL ')+m+(x!==undefined?' '+JSON.stringify(x).slice(0,400):''))};
const p=await (await b.newContext({viewport:{width:390,height:844}})).newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));await p.addInitScript(()=>{window.__pnTest=1});
await p.goto('file:///mnt/user-data/outputs/platanos-primera-vez.html');await p.waitForTimeout(900);const ev=(f,a)=>p.evaluate(f,a);let r;
await ev(()=>{var U=S.setup;U.veh=[{n:'Camioneta Uno',pl:'AAA1',plEdo:'Baja California',comb:'Gasolina',img:0,odo:1000}];U.per=[{n:'Chofer Uno',puesto:'chofer',tel:'1'}];
 U.cli=[{n:'Fruber',a:'x',tel:'6641234567',dias:[0,1,2,3,4,5,6],cred:0,vac:0,ch:'0'},{n:'Don Beto',a:'y',tel:'6641234568',dias:[0,1,2,3,4,5,6],cred:0,vac:0,ch:'0'}];U.prov=[];S.precio.R=300;S.precio.M=20;suAplicar();
 var id=S.choferes.filter(c=>c.n==='Chofer Uno')[0].id;S.pinOk[pinKey()]=true;S.pinOk['c:'+id]=true;S.role='rep';S.chofHoy=id;chCambiar(id);S.vehHoy=S.veh[0].id;S.salida.ok=true;S.salida.okH='08:00';S.inv.reparto=20;S.inv.repartoKg=50;S.inv.maduras=50;
 var f=S.cli.filter(c=>c.n==='Fruber')[0];f.vac=5;f.vacDesde=iso(new Date(TODAY.getTime()-26*864e5));S.cajasMov=S.cajasMov||[];S.cajasMov.push({t:'Taras que ya debía Fruber',f:iso(TODAY),n:5});
 S.stops=[{c:f.id},{c:S.cli.filter(c=>c.n==='Don Beto')[0].id}];S.cur=0;S.tab.rep='ruta';render();var bv=document.querySelector('[data-act="bienvgo"]');if(bv)bv.click();S.salida.ok=true;S.inv.reparto=20;S.inv.repartoKg=50;S.tab.rep='entrega';resetDraft(f);render()});
// ---- 108 · cobrarle las taras desde la entrega
r=await ev(()=>{var f=cl(S.stops[0].c),card=document.querySelector('[data-x="tar72"]');var difA=Math.round(cajasDonde().tot-cajasEsperadas()),efA=cierreRes().efectivo;
 return {card:card&&card.innerText,btn:!!document.querySelector('[data-act="tar108"]'),difA,efA,cred:f.cred,vac:f.vac}});
const r0dif=r.difA;ok(r.btn&&/Ya pasaron 25 días: cóbrale las taras/.test(r.card),'108 · a los 25 días la entrega dice "Ya pasaron 25 días: cóbrale las taras" con su botón',r.card&&r.card.slice(0,200));
await p.click('[data-act="tar108"]');await p.waitForTimeout(200);
r=await ev(()=>{var o=document.getElementById('tar108ov');return o&&o.innerText});ok(/¿Cuántas le cobras\?/.test(r)&&/5 × \$/.test(r),'108 · tarjeta de pantalla completa: cuántas le cobras (empieza con todas)',r&&r.slice(0,160));
await p.click('[data-act="tar108n"][data-d="-1"]');await p.click('[data-act="tar108n"][data-d="-1"]');await p.waitForTimeout(100);
const pr=await ev(()=>tarPr108());
await p.click('[data-act="tar108ok"]');await p.waitForTimeout(200);
r=await ev(()=>{var f=cl(S.stops[0].c),k=entregaCalc();return {vac:f.vac,cred:f.cred,abono:num(S.d.abono),kab:k.abono,mov:(S.cajasMov||[]).filter(m=>m.tar108!=null).map(m=>[m.n,m.m]),dif:Math.round(cajasDonde().tot-cajasEsperadas()),pag:f.tarPag108}});
ok(r.vac===2&&r.mov.length===1&&r.mov[0][0]===-3&&r.mov[0][1]===3*pr,'108 · cobró 3 de 5: le quedan 2 prestadas y las 3 salen de las taras del negocio con su movimiento',r);
ok(r.dif===r0dif,'108 · las taras siguen cuadrando ("¿Cuadran las cuentas?"): la diferencia no cambia',[r0dif,r.dif]);
ok(r.cred===3*pr&&r.abono===3*pr&&r.kab===3*pr,'108 · su precio ('+3*pr+') se cobra como abono en esta entrega',r);
// terminar la entrega: el efectivo del chofer sube y la deuda queda en cero
r=await ev(async()=>{var f=cl(S.stops[0].c);S.d.R=2;S.d.mode='todo';var ef0=cierreRes().efectivo;var t0=toast,msgs=[];toast=function(m){msgs.push(m);return t0.apply(this,arguments)};window.__msgs=msgs;render();var bt=document.querySelector('[data-act="entconf"]');msgs.push('boton='+!!bt+' tab='+S.tab.rep+' cur='+S.cur+' wz='+!!S.wz+' ov='+[...document.querySelectorAll('[id$="ov"]')].map(x=>x.id).join(','));if(bt)bt.click();await new Promise(r=>setTimeout(r,400));
 var ov=document.getElementById('tar72ov');if(ov){var g=ov.querySelector('[data-act="tar72pedi"]');if(g)g.click();await new Promise(r=>setTimeout(r,500))}var o2=document.getElementById('deb109ov');var deb=!!o2;if(o2){o2.querySelector('[data-act="deb109pedi"]').click();await new Promise(r=>setTimeout(r,500))}var gd=document.querySelector('[data-act="guardar"]');if(gd){gd.click();await new Promise(r=>setTimeout(r,500))}
 return {ef0,ef1:cierreRes().efectivo,cred:f.cred,log:(S.log||[]).length,deb,tar72:!!S.tar72,msgs:window.__msgs}});
ok(Math.abs(r.ef1-r.ef0-(600+3*pr))<0.01&&r.cred===0,'108 · al terminar la entrega: el efectivo del chofer sube venta + taras ('+(600+3*pr)+') y el cliente ya no debe pesos',r);
// ---- 108 · castigo al chofer a mitad de precio a los 30 días
r=await ev(()=>{var f=cl(S.stops[0].c);f.tarPag108.forEach(p=>p.desde=iso(new Date(TODAY.getTime()-31*864e5)));f.vac=2;f.tarDesc72=null;f.vacDesde=iso(new Date(TODAY.getTime()-31*864e5));window.__dbg={vac:f.vac,desde:f.vacDesde,d72:f.tarDesc72,ch:f.chofer,ed:tarEdad72(f)};S.tarRev72=null;S.role='admin';tarBuro72();
 var F=(S.faltantes||[]).filter(x=>x.tar108!=null||x.tar72!=null).map(x=>[x.m,x.mot]);var fondo=tarFondo108();S.tarRev72=null;tarBuro72();var F2=(S.faltantes||[]).filter(x=>x.tar108!=null||x.tar72!=null).length;S.role='rep';return {F,F2,fondo,dbg:window.__dbg}});
ok(r.F.some(x=>x[0]===3*pr/2&&/mitad de precio/.test(x[1])),'108 · a los 30 días: al chofer se le descuentan a MITAD de precio las 3 que el cliente pagó',r.F);
ok(r.F.some(x=>x[0]===2*pr&&/no regresadas/.test(x[1])),'108 · y a precio completo las 2 que no regresó ni pagó (como antes)',r);
ok(r.F2===r.F.length,'108 · el descuento se hace una sola vez',r.F2);
ok(r.fondo.cli===3*pr&&r.fondo.ch===3*pr/2+2*pr,'108 · fondo para taras: cobrado a clientes + descontado a choferes',r.fondo);
r=await ev(()=>{S.role='admin';S.tab.admin='estadisticas';render();var c=document.querySelector('[data-x="tf108"]');var t=c&&c.innerText;S.role='rep';return t});ok(/Fondo para comprar taras/.test(r||''),'108 · el fondo sale como reporte en Estadísticas',r);
// ---- 109 · lo que ya debía de antes
r=await ev(()=>{var bt=cl(S.stops[1].c);bt.cred=500;bt.credDesde=iso(new Date(TODAY.getTime()-12*864e5));S.cur=1;S.tab.rep='entrega';resetDraft(bt);render();var c=document.querySelector('[data-x="deb109"]');return c&&c.innerText});
ok(/Don Beto te debe \$500 de antes/.test(r||''),'109 · aviso grande arriba de la entrega: "Don Beto te debe $500 de antes"',r);
r=await ev(async()=>{S.d.R=1;S.d.mode='todo';S.d.abono='';var bt=document.querySelector('[data-act="entconf"]');if(bt)bt.click();await new Promise(r=>setTimeout(r,300));var o=document.getElementById('deb109ov');return o&&o.innerText});
ok(/Antes de terminar/.test(r||'')&&/ya te debía \$500/.test(r||''),'109 · al terminar sin cobrar lo de antes: ventana "Antes de terminar … ya te debía $500"',r&&r.slice(0,160));
r=await ev(async()=>{var b=document.querySelector('[data-act="deb109pedi"]');b.click();await new Promise(r=>setTimeout(r,500));var gd=document.querySelector('[data-act="guardar"]');if(gd){gd.click();await new Promise(r=>setTimeout(r,500))}var bt=cl(S.stops[1].c);return {log:(S.log||[]).length,cred:bt.cred,hist:(S.hist||[]).slice(-3).map(h=>h.x).join(' | ')}});
ok(/no tenía/.test(r.hist)&&r.cred===500&&r.log===2,'109 · "Ya le pedí, no tenía": queda registrado, termina la entrega y la deuda sigue',r);
// ---- 110 · Cargar más: parada a la bodega
r=await ev(async()=>{S.bods=S.bods||[];if(S.bods[0]){S.bods[0].lat=32.5;S.bods[0].lng=-117.0}S.salida.ok=true;S.tab.rep='ruta';S.cx=null;render();var bt=document.querySelector('[data-act="cxabre"]');if(!bt)return {bt:false};bt.click();await new Promise(r=>setTimeout(r,200));var o=document.getElementById('cm110ov');return {bt:true,o:o&&o.innerText,cx:!!S.cx}});
ok(r.bt&&/¿Vas a la bodega por más\?/.test(r.o||'')&&!r.cx,'110 · "Cargar más mercancía" primero pregunta "¿Vas a la bodega por más?"',r);
r=await ev(async()=>{document.querySelector('[data-act="cm110si"]').click();await new Promise(r=>setTimeout(r,200));var c=document.querySelector('[data-x="bod110"]');return c&&c.innerText});
ok(/TU SIGUIENTE PARADA/.test(r||'')&&/Bodega · a cargar más/.test(r||'')&&/Cómo llegar/.test(r||''),'110 · sale la parada "🏭 Bodega" como la siguiente, con "Cómo llegar"',r);
r=await ev(async()=>{document.querySelector('[data-act="bod110ya"]').click();await new Promise(r=>setTimeout(r,300));var ab=!!S.cx;var n0=(S.extras||[]).length;S.rm={R:'5',M:''};var bt=document.createElement('button');bt.dataset.act='extracarga';document.body.appendChild(bt);bt.click();bt.remove();S.cx=null;await new Promise(r=>setTimeout(r,200));render();return {ab,n0,extras:(S.extras||[]).length,bod:S.bod110,card:!!document.querySelector('[data-x="bod110"]')}});
ok(r.ab&&r.extras===r.n0+1&&r.bod==null&&!r.card,'110 · "Ya llegué" abre la captura; al registrarla la parada se quita sola y sigue su ruta',r);
r=await ev(async()=>{render();document.querySelector('[data-act="cxabre"]').click();await new Promise(r=>setTimeout(r,200));document.querySelector('[data-act="cm110no"]').click();await new Promise(r=>setTimeout(r,200));var x={cx:!!S.cx,bod:S.bod110};S.cx=null;render();return x});
ok(r.cx&&!r.bod,'110 · "No, ya lo traigo": la captura de siempre, sin parada',r);
r=await ev(()=>{S.tab.rep='ruta';render();return /Herramientas/.test(document.querySelector('main').innerText)});ok(!r,'100 · en la versión real ya no salen las "Herramientas de la demo" en la ruta del chofer');
ok(!errs.length,'sin errores de página',errs.slice(0,3));
console.log(nOK+' OK · '+nF+' FAIL');await b.close()})();
