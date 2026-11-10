const {chromium}=require('playwright');
/* l62: 8 recorrido navegable · 10 ubicación de la bodega · 11 ordenar con tráfico · 12 aprender tiempos */
(async()=>{const b=await chromium.launch();let nOK=0,nF=0;const ok=(c,m,x)=>{c?nOK++:nF++;console.log((c?'OK   ':'FAIL ')+m+(x!==undefined?' '+JSON.stringify(x).slice(0,300):''))};
const errs=[];const p=await b.newPage({viewport:{width:400,height:860}});p.on('pageerror',e=>errs.push(e.message));
await p.addInitScript(()=>{window.__pnTest=1});await p.goto('file:///mnt/user-data/outputs/prototipo-platanos.html');await p.waitForTimeout(700);const ev=(f,a)=>p.evaluate(f,a),W=ms=>p.waitForTimeout(ms);
await ev(()=>{window.__t=[];const t0=toast;toast=function(m){__t.push(m);return t0.apply(this,arguments)};S.role='admin';S.encOn=false;S.pinOk[pinKey()]=true;S.popVisto={admin:iso(TODAY)};render()});

/* ---- 10 · bodega ---- */
let r=await ev(()=>[coordsDe('https://www.google.com/maps/@19.5901,-96.9401,17z'),coordsDe('https://www.google.com/maps/place/X/@19.6,-96.9,15z/data=!3d19.59012!4d-96.94123'),coordsDe('19.5885, -96.9395'),coordsDe('https://maps.google.com/?q=19.1,-96.2'),coordsDe('hola')]);
ok(r[0].lat===19.5901&&r[1].lat===19.59012&&r[2].lng===-96.9395&&r[3].lat===19.1&&r[4]===null,'10 · entiende el link de Google Maps o las coordenadas',r);
await ev(()=>{S.aj=true;render()});r=await ev(()=>!!document.querySelector('#ajov [data-act="bodloc"]'));ok(r,'10 · en Ajustes: "Ubicación de la bodega · Cambiar"');
await ev(()=>{document.querySelector('#ajov [data-act="bodloc"]').click()});await W(100);r=await ev(()=>({ov:!!document.getElementById('blov'),t:(document.getElementById('blov')||{}).innerText||''}));ok(r.ov&&/Estoy en la bodega/.test(r.t)&&/link/.test(r.t),'10 · tarjeta de pantalla completa: "Estoy en la bodega" o pegar link',r);
await ev(()=>{S.blov.link='https://maps.app.goo.gl/abc';document.querySelector('[data-act="bllink"]').click()});r=await ev(()=>S.blov.err);ok(/corto/.test(r),'10 · link corto: explica qué hacer',r);
await ev(()=>{S.blov.link='19.6001, -96.9502';document.querySelector('[data-act="bllink"]').click()});r=await ev(()=>({p:S.blov.p,t:document.getElementById('blov').innerText}));ok(r.p===1&&/¿Seguro/.test(r.t),'10 · pide "¿Seguro?" antes de guardar',r);
await ev(()=>document.querySelector('[data-act="blsi"]').click());r=await ev(()=>({b:[S.bods[0].lat,S.bods[0].lng],B:[BOD.lat,BOD.lng],ov:!!document.getElementById('blov')}));ok(r.b[0]===19.6001&&r.B[0]===19.6001&&r.B[1]===-96.9502&&!r.ov,'10 · se guarda y todos los mapas/km usan la nueva ubicación',r);
r=await ev(()=>{S.role='rep';render();document.body.insertAdjacentHTML('beforeend','<button id="bx" data-act="bodloc" data-id="1">x</button>');document.getElementById('bx').click();document.getElementById('bx').remove();return !!S.blov});ok(r===false,'10 · el chofer no puede cambiarla (y la app le dice por qué)');
r=await ev(()=>{const h=mapaVivoHTML('gps1x',{pts:[{lat:32.5,lng:-117.0}],line:[{lat:32.5,lng:-117.0}],marks:[]});return /&quot;bod&quot;:false/.test(h)});ok(r,'10 · recorrido en Tijuana: el mapa no mete la bodega de Veracruz (se acerca a los puntos)');

/* ---- 8 · recorrido navegable ---- */
await ev(()=>{REAL=true;NB.on=true;S.role='admin';S.encOn=false;const dia=iso(TODAY),t0=new Date(dia+'T09:00:00').getTime(),c0=S.cli.filter(c=>c.lat!=null).slice(0,2),pts=[];
 for(let i=0;i<20;i++)pts.push({t:t0+i*60000,lat:BOD.lat,lng:BOD.lng,ch:1});for(let i=0;i<20;i++)pts.push({t:t0+(25+i)*60000,lat:c0[0].lat,lng:c0[0].lng,ch:1});for(let i=0;i<20;i++)pts.push({t:t0+(50+i)*60000,lat:c0[1].lat,lng:c0[1].lng,ch:1});
 GPS.dia['1|'+dia]={est:'ok',pts:pts};GPS.devs={d1:{ch:1,ult:JSON.stringify({t:Date.now()-120000,lat:c0[1].lat,lng:c0[1].lng}),bat:66,hb:Date.now()}};
 window.__cen=[];const mc=mapaCentra;mapaCentra=function(){__cen.push([...arguments]);return mc.apply(this,arguments)};
 S.tab.admin='personal';S.openCh=1;S.fiTab['emp:1']='ruta';S.aj=false;render()});await W(150);
r=await ev(()=>{const t=document.body.innerText;return {ahora:/Dónde está ahora/.test(t)&&/batería 66%/.test(t),ir:!!document.querySelector('.gpsahora a[href*="maps/dir"]'),st:document.querySelectorAll('.gpsst[data-act="gpsir"]').length,irst:document.querySelectorAll('.gpsst a.link').length,hr:document.querySelectorAll('.gpsh').length}});
ok(r.ahora&&r.ir,'8a · "Dónde está ahora": hora, hace cuánto, batería y "Cómo llegar"',r);ok(r.st>=2&&r.irst>=2,'8b · cada parada se puede tocar y tiene "Ir"',r);ok(r.hr>=1,'8c · puntos agrupados por hora',r);
await ev(()=>{document.querySelector('.gpsh').open=true;document.querySelector('.gpsh [data-act="gpsir"]').click();document.querySelector('.gpsst[data-act="gpsir"]').click()});r=await ev(()=>__cen.length);ok(r===2,'8 · al tocar una hora o una parada, el mapa se va a ese punto',r);
await ev(()=>{REAL=false;NB.on=false;S.openCh=null;render()});

/* ---- 11 · ordenar con tráfico ---- */
await ev(()=>{S.role='rep';S.chofHoy=1;S.pinOk[pinKey()]=true;S.salida.ok=true;S.cierre.sent=false;const C=S.cli.filter(c=>c.lat!=null).slice(0,3);S.stops=C.map(c=>({c:c.id}));window.__C=C.map(c=>c.id);
 window.Capacitor={Plugins:{RutaNativa:{rutasGoogle:o=>{window.__body=JSON.parse(o.cuerpo);return Promise.resolve({status:200,json:JSON.stringify({routes:[{optimizedIntermediateWaypointIndex:[2,0,1],legs:[{duration:'600s'},{duration:'300s'},{duration:'420s'},{duration:'900s'}],duration:'2220s',distanceMeters:23000}]})})}}}};
 S.tab.rep='ruta';render()});
r=await ev(()=>!!document.querySelector('[data-act="rgordena"]'));ok(r,'11 · en su ruta: "Ordenar con tráfico"');
await ev(()=>document.querySelector('[data-act="rgordena"]').click());await W(200);
r=await ev(()=>({orden:S.stops.map(s=>s.c),esp:[__C[2],__C[0],__C[1]],b:__body&&__body.routingPreference+'|'+__body.optimizeWaypointOrder+'|'+__body.intermediates.length,legs:S.rg&&S.rg.legs,plan:S.planDia&&Object.keys(S.planDia.c).length,t:__t.slice(-1)[0]}));
ok(JSON.stringify(r.orden)===JSON.stringify(r.esp)&&r.b==='TRAFFIC_AWARE|true|3','11 · una sola llamada (con tráfico) y la ruta queda en el orden de Google',r);
ok(r.plan===3&&/Regresas a bodega/.test(r.t),'11 · hora estimada de llegada a cada cliente y de regreso',r);
r=await ev(()=>{const E=etas();return [E[0].eta-(S.salida.ok?S.reloj:480),E.fin-E[2].eta]});ok(r[0]===10&&r[1]===10+15,'11 · usa los tiempos de Google (tramo + 10 min de atención)',r);
await ev(()=>{Capacitor.Plugins.RutaNativa.rutasGoogle=()=>Promise.resolve({status:403,json:JSON.stringify({error:{message:'Routes API has not been used in project before or it is disabled'}})});document.querySelector('[data-act="rgordena"]').click()});await W(150);
r=await ev(()=>__t.slice(-1)[0]);ok(/Routes API/.test(r)&&/orden de siempre/.test(r),'11 · si Google no deja, avisa qué falta y se queda el orden de siempre',r);

/* ---- 12 · aprender ---- */
r=await ev(()=>{S.aprT={};S.aprA={};const a=String(__C[2]),b2=String(__C[0]);for(let i=0;i<3;i++){aprPon(S.aprT,a+'>'+b2+'|*',20);aprPon(S.aprA,b2,25)}S.stops[0].done=true;S.rg=null;const E=etas();return E[1].eta-(S.salida.ok?S.reloj:480)});
ok(r===20,'12 · con 3 o más viajes, usa lo aprendido para ese tramo',r);
r=await ev(()=>{const E=etas();return E[2].eta-E[1].eta});ok(r>=25,'12 · y el tiempo que tardan atendiendo a ese cliente',r);
r=await ev(()=>{const t0=Date.now()-3600000;S.stopsT={};S.salidaTs=t0;S.stopsT[__C[0]]={lleg:t0+15*60000,sal:t0+30*60000};S.stopsT[__C[1]]={lleg:t0+42*60000,sal:t0+50*60000};S.aprT={};S.aprA={};aprAprende();return {t:Object.keys(S.aprT),a:S.aprA}});
ok(r.t.some(k=>k.indexOf('B>')===0)&&r.t.length>=4&&Object.keys(r.a).length===2,'12 · guarda cuánto tardan de verdad por tramo y por cliente',r);
r=await ev(()=>{S.stops=__C.map(c=>({c:c}));S.stops.forEach(s=>s.done=false);const ids=__C.map(String);S.aprT={};['B'].concat(ids).forEach(a=>ids.forEach(b2=>{if(a!==b2)for(let i=0;i<3;i++)aprPon(S.aprT,a+'>'+b2+'|*',a==='B'&&b2===ids[1]?5:30)}));window.__llam=0;Capacitor.Plugins.RutaNativa.rutasGoogle=()=>{__llam++;return Promise.resolve({status:500,json:'{}'})};
 document.querySelector('[data-act="rgordena"]').click();return {llam:__llam,pri:S.stops[0].c,esp:__C[1],t:__t.slice(-1)[0]}});
ok(r.llam===0&&r.pri===r.esp&&/sin gastar/.test(r.t),'12 · si ya sabe todos los tramos, ordena sola sin pedir a Google',r);

ok(!errs.length,'sin errores',errs);console.log(nOK+' OK · '+nF+' FAIL');await b.close()})();
