const {chromium}=require('playwright');
/* l60: 16 ubicación · 17 Atender · 20 faltante · 21 avisos/actividad · 22 Hoy te toca · 25 numeritos · 28 avisos del chofer */
(async()=>{const b=await chromium.launch();let nOK=0,nF=0;const ok=(c,m,x)=>{c?nOK++:nF++;console.log((c?'OK   ':'FAIL ')+m+(x!==undefined?' '+JSON.stringify(x).slice(0,300):''))};
const errs=[];const p=await b.newPage({viewport:{width:400,height:860}});p.on('pageerror',e=>errs.push(e.message));
await p.addInitScript(()=>{window.__pnTest=1});await p.goto('file:///mnt/user-data/outputs/prototipo-platanos.html');await p.waitForTimeout(700);const ev=(f,a)=>p.evaluate(f,a),W=ms=>p.waitForTimeout(ms);
await ev(()=>{S.role='admin';S.encOn=false;S.pinOk[pinKey()]=true;S.popVisto={admin:iso(TODAY)};S.tab.admin='inicio';S.avPrecio=[];render()});

/* ---- 16 · ubicación ---- */
let r=await ev(()=>{const ahora=Date.now();GPS.w=true;GPS.devs={d1:{ch:1,hb:ahora-20*60000,ult:JSON.stringify({t:ahora-20*60000,lat:19.58,lng:-96.94}),bat:40,evs:'[]'}};
 S.avPrecio.push('URGENTE: El celular de '+chofN(1)+' no manda su ubicación desde hace 15 min (última: 10:00) [geo:1,2]');S.avPrecio.push('URGENTE: El celular de '+chofN(1)+' no manda su ubicación desde hace 30 min (última: 10:00) [geo:1,2]');
 gpsAlertas();gpsAlertas();return S.avPrecio.filter(x=>/no manda su ubicación/.test(x))});
ok(r.length===1&&/\[gps:d1\]/.test(r[0])&&!/^URGENTE/.test(r[0]),'16 · una sola tarjeta por celular (se quitaron las repetidas)',r);
r=await ev(()=>{GPS.devs.d1.hb=Date.now()-50*60000;GPS.devs.d1.ult=JSON.stringify({t:Date.now()-50*60000,lat:19.58,lng:-96.94});gpsAlertas();return S.avPrecio.filter(x=>/no manda su ubicación/.test(x))});
ok(r.length===1&&/^URGENTE/.test(r[0])&&/50 min/.test(r[0]),'16 · la misma tarjeta se actualiza y pasa a URGENTE (no sale otra)',r);
/* lo que se ve no trae coordenadas ni [tel:] */
r=await ev(()=>{render();const t=document.querySelector('main').innerText;return {geo:/\[geo:|\[gps:|\[tel:|19\.58/.test(t),pop:/\[geo:|\[tel:|\[gps:/.test(popHTML()||'')}});ok(!r.geo&&!r.pop,'16 · en ninguna tarjeta se ven coordenadas ni [tel:…]',r);
r=await ev(()=>{S.popVisto={};S.popI=0;const L=popItems().filter(x=>/ubicación/.test(x.m));return L.map(x=>x.b.map(b=>b[0]).join('|'))});ok(r.length&&/Atender/.test(r[0])&&/Ver dónde/.test(r[0]),'17 · tarjeta urgente de ubicación: Atender + Ver dónde',r);
await ev(()=>{S.popVisto={admin:iso(TODAY)}});
r=await ev(()=>{const x=S.avPrecio.filter(x=>/no manda/.test(x))[0];const d=avDestino(x);return {t:d.t,ch:S.openCh,ft:S.fiTab['emp:1']}});ok(r.t==='personal'&&r.ch===1&&r.ft==='ruta','17 · Atender (ubicación) abre la ficha del chofer en "Su recorrido"',r);
await ev(()=>{S.openCh=null});
/* se reconecta: la tarjeta se quita sola y queda una línea */
r=await ev(()=>{GPS.devs.d1.hb=Date.now();GPS.devs.d1.ult=JSON.stringify({t:Date.now(),lat:19.58,lng:-96.94});gpsAlertas();return {av:S.avPrecio.filter(x=>/no manda/.test(x)).length,act:(S.actDia||[]).filter(a=>/estuvo sin señal de/.test(a.x)).map(a=>a.x)}});
ok(r.av===0&&r.act.length===1,'16 · al reconectarse la tarjeta se quita sola y queda "estuvo sin señal de … a …"',r);
/* apagado y prendido */
r=await ev(()=>{const t=Date.now();GPS.devs.d1.evs=JSON.stringify([{e:'apagado',t:t-3600000}]);gpsAlertas();const a=S.avPrecio.filter(x=>/apagó el celular/.test(x)).length;
 GPS.devs.d1.evs=JSON.stringify([{e:'apagado',t:t-3600000},{e:'encendido',t:t-600000}]);gpsAlertas();return {a1:a,a2:S.avPrecio.filter(x=>/apagó el celular/.test(x)).length,l:(S.actDia||[]).filter(a=>/se apagó de/.test(a.x)).length}});
ok(r.a1===1&&r.a2===0&&r.l===1,'16 · apagado: tarjeta; al prenderse se quita y queda "se apagó de … a …"',r);

/* ---- 20 · efectivo que no coincide ---- */
await ev(()=>{S.faltantes=[{ch:1,m:30,fecha:iso(TODAY),pend:true}];S.avPrecio.push('URGENTE: el efectivo de '+chofN(1)+' no coincide: él dijo $13,180 y se contaron $13,150.');render()});
r=await ev(()=>S.avPrecio.some(x=>/no coincide/.test(x)));ok(r,'20 · el aviso sigue mientras no se decide');
await ev(()=>{const x=S.avPrecio.filter(x=>/no coincide/.test(x))[0];const b=document.createElement('button');b.dataset.act='avgo';b.dataset.k=encodeURIComponent(x);document.querySelector('main').appendChild(b);b.click()});await W(150);
r=await ev(()=>{const o=document.getElementById('faov');return o?{t:o.innerText.slice(0,200),b:[...o.querySelectorAll('[data-act]')].map(x=>x.dataset.act+':'+(x.dataset.o||''))}:null});
ok(r&&/13,180/.test(r.t)&&/13,150/.test(r.t)&&/Faltan/.test(r.t)&&r.b.join(',').includes('fadec:desc')&&r.b.join(',').includes('fadec:pago'),'20 · abre DIRECTO la tarjeta del faltante (dijo, se contó, diferencia y botones)',r);
await ev(()=>document.querySelector('#faov [data-o="desc"]').click());await W(80);ok(await ev(()=>/¿Seguro\?/.test(document.getElementById('faov').innerText)),'20 · pide "¿Seguro?"');
await ev(()=>document.querySelector('#faov [data-act="fasi"]').click());await W(80);
r=await ev(()=>({desc:S.faltantes[0].desc,av:S.avPrecio.some(x=>/no coincide/.test(x)),ov:!!document.getElementById('faov')}));ok(r.desc===true&&!r.av&&!r.ov,'20 · al decidir: se descuenta, la tarjeta se quita y queda en historial',r);
r=await ev(()=>{S.avPrecio.push('URGENTE: el efectivo de '+chofN(1)+' no coincide: él dijo $500 y se contaron $480.');render();return S.avPrecio.some(x=>/no coincide/.test(x))});ok(r===false,'20 · si ya se decidió al recibir el cierre, el aviso desaparece solo');

/* ---- 21 · lo informativo no va a Avisos ---- */
r=await ev(()=>{S.avPrecio.push(chofN(1)+' registró un gasto: Comida $80');S.avPrecio.push(chofN(1)+' cargó 5 cajas y 0 kg más en bodega a las 12:00');S.avPrecio.push(chofN(1)+' registró un gasto: Comida $80');render();return 1});await W(1400);r=await ev(()=>{render();
 return {av:S.avPrecio.filter(x=>/registró un gasto|más en bodega/.test(x)).length,act:actDe(1,iso(TODAY)).filter(a=>/gasto|bodega/.test(a.x)).length,inf:(function(){S.act92=true;render();var o=document.getElementById('act92ov');var t=o?o.textContent:'';S.act92=false;render();return new RegExp(chofN(1)+':.*gasto').test(t)?'G'+t:t})()}});r.grp=/^G/.test(r.inf);r.inf=/Por persona/.test(r.inf);
ok(r.av===0&&r.act===2,'21 · gastos y "volvió a cargar" no van a Avisos: van a la actividad del día (sin repetir)',r);ok(r.inf&&r.grp,'21 · "Lo que pasó hoy" (en Más) agrupado por chofer en una línea',r);
r=await ev(()=>!!document.querySelector('main [data-x="hoy92"]'));ok(r,'21 · arriba la lista "Hoy" (antes "Por atender")');
r=await ev(()=>{S.rcv={p:0};return /Lo que pasó hoy en su ruta/.test(rcHTML())&&/registró un gasto/.test(rcHTML())});ok(r,'21 · en la recepción del cierre: "Lo que pasó hoy en su ruta"');await ev(()=>{S.rcv=null;render()});
r=await ev(()=>{S.avPrecio.push('URGENTE: '+chofN(1)+' pide reabrir su ruta para cargar más');render();return S.avPrecio.some(x=>/pide reabrir/.test(x))});ok(r,'21 · lo que pide permiso sí se queda en Avisos');

/* ---- 22 · Hoy te toca ---- */
r=await ev(()=>hoyItems().map(x=>x[0]));ok(r.some(x=>/^Recibir los cierres · /.test(x)),'22 · "Recibir los cierres" dice cómo va',r);
await ev(()=>{window.__t=[];const t0=toast;toast=function(m){__t.push(m);return t0.apply(this,arguments)};S.tab.admin='inicio';render()});
const toca=async re=>{await ev(re=>{const L=hoyItems();const i=L.findIndex(x=>new RegExp(re).test(x[0]));const b=document.querySelector('[data-act="hoyir"][data-i="'+i+'"]');b.click()},re);await W(150);return ev(()=>({t:__t.slice(-1)[0]||'',tab:S.tab.admin,res:S.resHoy}))};
r=await ev(()=>{S.salida.ok=true;S.cierre.sent=false;render();return 1});r=await toca('^Recibir');ok(/Faltan|no ha salido|Ya recibiste/.test(r.t),'22 · "Recibir los cierres" sin cierres: dice por qué',r);
r=await toca('^Mandarte');ok(/faltan/i.test(r.t)&&!r.res,'22 · "Mandarte el resumen" con cierres pendientes: dice cuáles faltan',r);
r=await ev(()=>{S.cierre.sent=true;S.cierreReg=null;S.recep=null;render();return 1});r=await toca('^Recibir');ok(r.tab==='cierreadm','22 · con un cierre mandado: lleva a recibirlo',r);
await ev(()=>{S.tab.admin='inicio';S.cierre.sent=false;S.salida.ok=false;S.chSt={};render()});

/* ---- 25 · numeritos ---- */
r=await ev(()=>{render();return {n:document.querySelectorAll('nav.tabs .tbadge').length,b:document.querySelectorAll('nav.tabs .tbadge.blink').length}});ok(r.n>=1&&r.b<=1,'25 · numerito por sección (rojo solo lo urgente) y a lo más uno parpadea',r);

/* ---- 28 · chofer ---- */
r=await ev(()=>{S.rutaAv={1:['Pedido para hoy: 3 cajas','Pedido para hoy: 3 cajas','Se quitó Don Beto de mañana','Se regresó Don Beto a mañana']};render();return S.rutaAv[1]});ok(r.length===1,'28 · avisos del chofer sin repetidos (y lo que se canceló, se quita)',r);

ok(!errs.length,'sin errores',errs);console.log(nOK+' OK · '+nF+' FAIL');await b.close()})();
