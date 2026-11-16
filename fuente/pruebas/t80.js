/* 8.0 · puntos 32 al 37 (l80) */
const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();let nOK=0,nF=0;const ok=(c,m,x)=>{c?nOK++:nF++;console.log((c?'OK   ':'FAIL ')+m+(x!==undefined?' '+JSON.stringify(x).slice(0,300):''))};
const ctx=await b.newContext({viewport:{width:400,height:860}});
const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));await p.addInitScript(()=>{window.__pnTest=1});
await p.goto('file:///mnt/user-data/outputs/prototipo-platanos.html');await p.waitForTimeout(800);const ev=(f,a)=>p.evaluate(f,a);let r;
// 35 · chofer con la ruta de ayer SIN cierre: pantalla "manda tu cierre"
r=await ev(()=>{S.role='rep';S.chofHoy=1;S.pinOk['c:1']=true;S.salida.ok=true;S.log.push({t:'x'});S.cierre=S.cierre||{};S.cierre.sent=false;S.rutaDia80='2026-10-27';S.tab.rep='ruta';render();var o=document.getElementById('dia80');return {o:!!o,t:o&&o.innerText.slice(0,120),tab:S.tab.rep}});
ok(r.o&&/No mandaste tu cierre/.test(r.t),'35 · sin cierre de ayer: pantalla "No mandaste tu cierre"',r);
r=await ev(()=>{document.querySelector('[data-act="dia80c"]').click();return {tab:S.tab.rep,o:!!document.getElementById('dia80')}});ok(r.tab==='cierre'&&!r.o,'35 · "Mandar mi cierre" lleva al cierre',r);
// al mandar el cierre se arma sola la ruta de hoy
r=await ev(()=>{S.cierre.sent=true;render();return {dia:S.rutaDia80,n:S.stops.length,log:S.log.length,tab:S.tab.rep,ov:!!document.getElementById('dia80'),h:(S.rutasHist||[]).some(x=>x.f==='2026-10-27')}});
ok(r.dia==='2026-10-28'&&r.log===0&&r.tab==='ruta'&&!r.ov&&r.h,'35 · cierre mandado: se guarda la de ayer y sale la ruta de hoy',r);
// ruta de ayer vacía (no trabajó): no pide cierre, se arma sola
r=await ev(()=>{S.rutaDia80='2026-10-27';S.log=[];S.salida.ok=false;S.cierre.sent=false;render();return {dia:S.rutaDia80,ov:!!document.getElementById('dia80')}});ok(r.dia==='2026-10-28'&&!r.ov,'35 · si ayer no hubo nada, no pide cierre',r);
// cambio de día desde el celular del admin: el chofer que ya cerró recibe su ruta nueva
r=await ev(()=>{S.role='admin';S.chofHoy=null;var ids=(S.choferes||[]).filter(c=>!c.baja&&esCh(c)).map(c=>+c.id);var id=ids[0];S.chSt=S.chSt||{};var o=chNuevo(id);o.log=[{t:'x'}];o.salida={ok:true};o.cierre={sent:true};o.rutaDia80='2026-10-27';S.chSt[id]=o;var c2=ids[1];var o2=null;if(c2!=null){o2=chNuevo(c2);o2.log=[{t:'x'}];o2.salida={ok:true};o2.cierre={sent:false};o2.rutaDia80='2026-10-27';S.chSt[c2]=o2}
 cambioDeDia('2026-10-27');return {id,a:!!S.chSt[id],nuevo:S.chSt[id]&&S.chSt[id].log.length===0,dia:S.chSt[id]&&S.chSt[id].rutaDia80,c2,b:c2!=null&&S.chSt[c2]&&S.chSt[c2].rutaDia80}});
ok(r.a&&r.nuevo&&r.dia==='2026-10-28','35 · el admin cambia de día: el chofer que ya cerró tiene su ruta nueva (antes se quedaba sin ruta)',r);
ok(r.c2==null||r.b==='2026-10-27','35 · el que no mandó cierre conserva la de ayer (con su fecha)',r);
// admin: liberar
if(r.c2!=null){await ev(()=>{S.tab.admin='inicio';S.pinOk[pinKey()]=true;render()});r=await ev(c2=>{var b=document.querySelector('[data-act="dia80l"][data-id="'+c2+'"]');return !!b},r.c2);ok(r,'35 · el admin ve "Liberar su ruta de hoy"');
 r=await ev(()=>{var b=document.querySelector('[data-act="dia80l"]');var id=+b.dataset.id;b.click();var s=document.querySelector('[data-act="dia80ls"]');if(s)s.click();return {id,d:S.chSt[id].rutaDia80,l:S.chSt[id].log.length}});ok(r.d==='2026-10-28'&&r.l===0,'35 · al liberarla le sale su ruta de hoy',r)}
// 37 · maduración cuenta el tiempo
r=await ev(()=>{S.lotes=[{id:901,prod:'R',q:5,h:0,est:30,met:'Carburo'}];render();var l=S.lotes[0];l.t0=Date.now()-5*36e5;render();return l.h});ok(r===5,'37 · la maduración avanza con el reloj (lleva 5 h)',r);
// 33 · fruta madura: quitar y que vuelva cuando cambie
r=await ev(()=>{S.madL=[{p:'R',q:4,dia:'2026-10-24'}];S.antigOff80=null;var d=antig65();var a=!!d;S.antigOff80=antigFirma80();var b=!antig65();S.madL.push({p:'R',q:2,dia:'2026-10-26'});var c=!!antig65();return [a,b,c]});ok(r[0]&&r[1]&&r[2],'33 · se quita y vuelve sola si entra fruta de otro día',r);
// 32 · cuentas del viaje
r=await ev(()=>cv80({efe:10000,par:[{pago:6000,forma:'Efectivo'},{pago:2000,forma:'Transferencia'}],gx:[{m:150}],recs:[{total:1200}]}));ok(r&&r.efe===10000&&r.prov===6000&&r.comb===1200&&r.otros===150,'32 · cuentas: llevó, pagado en efectivo, combustible, gastos',r);
// 34 · bodega sin nombre ni dirección: no se guarda
r=await ev(()=>{S.role='admin';var bd=S.bods[0];var n0=bd.n;S.ub68={t:'bod',p:2,lat:32.5,lng:-117,nm78:'',dir78:''};render();var bt=document.querySelector('[data-act="ub68si"]');if(bt)bt.click();return {n0,n:S.bods[0].n,lat:S.bods[0].lat,ov:!!S.ub68}});ok(r.ov&&r.lat!==32.5,'34 · sin nombre y sin dirección pide el nombre',r);
await ev(()=>{S.ub68=null;render()});
// 36 · la copia dañada de la nube se repara sola
r=await ev(()=>new Promise(res=>{var n=0;window.NUBE_AD={reparar:function(){n++;return new Promise(function(){})}};var rl=location.reload;try{Object.defineProperty(location,'reload',{value:function(){}})}catch(e){}window.__r80=()=>n;console.error('FIRESTORE INTERNAL ASSERTION FAILED: Failed to read large IndexedDB value');setTimeout(()=>res(n),900)}));ok(r===1,'36 · al ver el error de la copia dañada se repara sola',r);
// 61 · chofer trabado en "No mandaste tu cierre"
r=await ev(()=>{S.role='rep';S.chofHoy=1;S.pinOk['c:1']=true;arLoad(chNuevo(1));S.rutaDia80=iso(new Date(TODAY.getTime()-2*864e5));S.salida.ok=false;S.log=[{c:S.stops[0].c,R:1,M:0,total:300,pago:300,abono:0}];S.cierre.sent=false;S.dia80=null;S.tab.rep='ruta';S.libPide83=null;render();
 var o=document.getElementById('dia80'),b1=o&&o.querySelector('[data-act="dia80c"]');render();render();var b2=document.querySelector('#dia80 [data-act="dia80c"]');var mismo=b1===b2,txt=o?o.innerText:'';
 b2.click();return {mismo,antier:/Antier/.test(txt),sab:/del /.test(txt),tab:S.tab.rep,sal:S.salida.ok,ov:!!document.getElementById('dia80'),em:/Pedir que liberen/.test(txt)}});
ok(r.mismo,'61 · la pantalla ya no se vuelve a crear en cada redibujo (el botón no desaparece bajo el dedo)',r);
ok(!r.antier&&r.sab&&r.em,'61 · dice "del sábado" (no "del Antier sábado") y trae "Pedir que liberen mi ruta"',r);
ok(r.tab==='cierre'&&r.sal&&!r.ov,'61 · con entregas pero sin "Iniciar", el botón sí lleva al cierre',r);
r=await ev(()=>{S.tab.rep='ruta';render();var n0=(S.avPrecio||[]).length;document.querySelector('#dia80 [data-act="lib83"]').click();return {av:(S.avPrecio||[]).slice(n0).some(x=>/URGENTE.*Liberar su ruta/.test(x)),ya:/Ya se le pidió/.test(document.getElementById('dia80').innerText)}});
ok(r.av&&r.ya,'61 · "Pedir que liberen mi ruta" le llega URGENTE al administrador',r);
await ev(()=>{S.role='admin';S.chofHoy=null;render()});
ok(errs.length===0,'sin errores',errs);
console.log(nOK+' OK · '+nF+' FAIL');await b.close()})();
