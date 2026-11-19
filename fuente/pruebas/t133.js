/* 133 · Ruta del chofer: "Ahora sigue" ya no repite la siguiente parada; "Ordenar con tráfico" dice cuánto ahorra (tiempo y km, comparando
   con Google tu orden de antes y el nuevo) y se puede deshacer ("Regresar al orden de antes"). También cuando la app ordena sola. */
const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();let nOK=0,nF=0;const ok=(c,m,x)=>{c?nOK++:nF++;console.log((c?'OK   ':'FAIL ')+m+(x!==undefined?' '+JSON.stringify(x).slice(0,500):''))};
const p=await (await b.newContext({viewport:{width:390,height:844}})).newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));p.on('dialog',d=>d.accept());
await p.addInitScript(()=>{window.__pnTest=1;window.__hora93=12;window.__g=[];
 window.Capacitor={Plugins:{RutaNativa:{rutasGoogle:function(o){var c=JSON.parse(o.cuerpo);window.__g.push({opt:c.optimizeWaypointOrder,n:c.intermediates.length,campos:o.campos||''});var n=c.intermediates.length;
  if(!c.optimizeWaypointOrder)return Promise.resolve({status:200,json:JSON.stringify({routes:[{duration:'7800s',distanceMeters:85000}]})});
  var idx=[];for(var i=n-1;i>=0;i--)idx.push(i);var legs=[];for(var k=0;k<=n;k++)legs.push({duration:'600s',distanceMeters:5000});
  return Promise.resolve({status:200,json:JSON.stringify({routes:[{optimizedIntermediateWaypointIndex:idx,duration:'6300s',distanceMeters:70000,legs:legs}]})})}}}}});
await p.goto('file:///mnt/user-data/outputs/prototipo-platanos.html');await p.waitForTimeout(900);const ev=(f,a)=>p.evaluate(f,a),W=ms=>p.waitForTimeout(ms);let r;
await ev(()=>{S.popVisto={admin:iso(TODAY),cont:iso(TODAY)};S.precio.conf=iso(TODAY);S.role='rep';S.salida.ok=true;S.pinOk[pinKey()]=true;S.tutVisto={rep:true,admin:true};S.aprT={};S.rg=null;S.rgRes=null;S.rgAnt=null;
 (S.stops||[]).forEach(function(s,i){var c=cl(s.c);if(c&&c.lat==null){c.lat=19.53+i/100;c.lng=-96.92-i/100}});S.tab.rep='ruta';render()});
const txt=()=>ev(()=>{render();var m=document.querySelector('main');return m?m.innerText:''});
r=await ev(()=>{render();var m=document.querySelector('main');return {ahora:!!m.querySelector('[data-key="ahora"]'),next:!!m.querySelector('.card.next'),pend:(S.stops||[]).filter(s=>!s.done).length}});
ok(r.next&&!r.ahora,'en ruta: ya no sale "Ahora sigue" (la tarjeta verde dice lo mismo)',r);
r=await txt();ok(!/Muéstrame dónde/.test(r),'sin el botón "Muéstrame dónde" repetido');
/* cuando ya no hay parada siguiente, "Ahora sigue" sí sale */
r=await ev(()=>{var g=S.stops.map(s=>s.done);S.stops.forEach(s=>{s.done=true});render();var a=document.querySelector('main [data-key="ahora"]'),x=a?a.innerText:'';S.stops.forEach((s,i)=>{s.done=g[i]});render();return x});ok(/Haz tu cierre/.test(r),'cuando ya entregó a todos sí sale "Ahora sigue → Haz tu cierre" (no se repite con nada)',r);
/* ordenar con Google */
const orden0=await ev(()=>S.stops.filter(s=>!s.done).map(s=>String(s.c)));
await ev(()=>document.querySelector('[data-act="rgordena"]').click());await W(400);
r=await ev(()=>({g:window.__g,orden:S.stops.filter(s=>!s.done).map(s=>String(s.c)),res:S.rgRes,ant:S.rgAnt&&S.rgAnt.orden,toast:S.toast}));
ok(r.g.length===2&&r.g.some(x=>x.opt===false)&&r.g.some(x=>x.opt===true),'pide a Google tu orden de antes y el ordenado (mismo tráfico)',r.g);
ok(JSON.stringify(r.ant)===JSON.stringify(orden0)&&JSON.stringify(r.orden)!==JSON.stringify(orden0),'guarda el orden de antes y reordena',[orden0,r.orden]);
ok(r.res&&r.res.antes.min===130&&r.res.ahora.min===105&&r.res.antes.km===85&&r.res.ahora.km===70,'antes 2 h 10 min · 85 km → ahora 1 h 45 min · 70 km',r.res);
ok(/te ahorra ~25 min y 15 km/.test(r.toast),'el aviso dice cuánto ahorra',r.toast);
r=await txt();ok(/Como lo tenías\s*2 h 10 min · 85 km/.test(r)&&/Ordenada\s*1 h 45 min · 70 km/.test(r)&&/Te ahorra ~25 min y 15 km/.test(r),'la tarjeta dice antes, ahora y cuánto ahorra',(r.match(/Último orden[\s\S]{0,200}/)||[''])[0]);
ok(/Regresar al orden de antes/.test(r)&&/Volver a calcular/.test(r),'botones: Volver a calcular y Regresar al orden de antes');
/* deshacer */
await ev(()=>document.querySelector('[data-act="rgdeshaz"]').click());await W(200);
r=await ev(()=>({orden:S.stops.filter(s=>!s.done).map(s=>String(s.c)),ant:S.rgAnt,toast:S.toast,h:S.hist[S.hist.length-1].x}));
ok(JSON.stringify(r.orden)===JSON.stringify(orden0)&&!r.ant&&/regresó al orden de antes/.test(r.toast),'"Regresar al orden de antes" deja la ruta como estaba',r);
r=await txt();ok(/Regresaste al orden de antes/.test(r)&&!/Regresar al orden de antes/.test(r),'la tarjeta lo dice y ya no ofrece deshacer otra vez');
/* deshacer con una entrega hecha en medio: la entregada no se mueve */
await ev(()=>document.querySelector('[data-act="rgordena"]').click());await W(400);
r=await ev(()=>{var pend=S.stops.filter(s=>!s.done);pend[0].done=true;var hecho=String(pend[0].c);document.querySelector('[data-act="rgdeshaz"]').click();return {hecho:hecho,done:S.stops.filter(s=>s.done).map(s=>String(s.c)),pend:S.stops.filter(s=>!s.done).map(s=>String(s.c)),n:S.stops.length}});
ok(r.done.includes(r.hecho)&&!r.pend.includes(r.hecho)&&r.pend.length+r.done.length===r.n,'si ya entregaste a uno, ese se queda entregado al deshacer',r);
/* si Google no mejora: "tu orden ya era el mejor" */
await ev(()=>{window.Capacitor.Plugins.RutaNativa.rutasGoogle=function(o){var c=JSON.parse(o.cuerpo),n=c.intermediates.length,idx=[];for(var i=0;i<n;i++)idx.push(i);return Promise.resolve({status:200,json:JSON.stringify({routes:[{optimizedIntermediateWaypointIndex:c.optimizeWaypointOrder?idx:undefined,duration:'3000s',distanceMeters:40000,legs:[]}]})})};document.querySelector('[data-act="rgordena"]').click()});await W(400);
r=await txt();ok(/Tu orden ya era el mejor/.test(r),'si no ahorra nada, lo dice',(r.match(/Último orden[\s\S]{0,160}/)||[''])[0]);
/* la app ordena sola (aprendió los tramos): compara con su misma cuenta */
r=await ev(()=>{var P=rgPend(),ids=['B'].concat(S.stops.filter(s=>s.done).map(s=>String(s.c))).concat(P.map(s=>String(s.c)));S.aprT={};ids.forEach(function(a,i){P.forEach(function(s,j){var x=String(s.c);if(a!==x){S.aprT[a+'>'+x+'|*']=[5,10+((i*7+j*3)%9)]}})});
 window.__g=[];document.querySelector('[data-act="rgordena"]').click();return {g:window.__g.length,res:S.rgRes,toast:S.toast}});
ok(r.g===0&&r.res&&r.res.fuente==='app'&&r.res.antes.min>=r.res.ahora.min,'si la app ya aprendió los tramos, ordena sola y compara su tiempo',r);
ok(!errs.length,'sin errores',errs);
console.log(nOK+' OK · '+nF+' FAIL');await b.close()})();
