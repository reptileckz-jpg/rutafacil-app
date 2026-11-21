/* 3 (nueva numeración) · cliente que queda lejos de su ruta: sugerir pasarlo a la de otro chofer; el administrador decide. */
const {chromium}=require('playwright');let nOK=0,nF=0;const ok=(c,m,x)=>{c?nOK++:nF++;console.log((c?'OK   ':'FAIL ')+m+(x!==undefined?' '+JSON.stringify(x).slice(0,350):''))};
(async()=>{const b=await chromium.launch();const errs=[];
const p=await (await b.newContext({viewport:{width:412,height:900}})).newPage();p.on('pageerror',e=>errs.push(e.message));p.on('dialog',d=>d.accept());
await p.addInitScript(()=>{window.__pnTest=1});await p.goto('file:///mnt/user-data/outputs/prototipo-platanos.html');await p.waitForTimeout(900);const ev=(f,a)=>p.evaluate(f,a);let r;
/* A: 3 clientes juntos + 1 lejos (junto a los de B); B: 3 clientes juntos */
r=await ev(()=>{var L=chs81();var A=+L[0].id,B=+L[1].id;window.A=A;window.B=B;var d=TODAY.getDay();
 var pos=[[19.50,-96.90],[19.505,-96.905],[19.51,-96.90],[19.60,-97.00],[19.605,-97.005],[19.60,-97.01],[19.61,-97.00]];
 S.cli.forEach((c,i)=>{c.oculto=false;c.extra=null;c.ped=null;if(i<7){c.dias=[0,1,2,3,4,5,6];c.chofer=i<4?A:B;c.lat=pos[i][0];c.lng=pos[i][1]}else{c.dias=[];}});window.LEJ=S.cli[3].id;
 S.chofHoy=null;S.chSt={};S.chSt[A]=chNuevo(A);S.chSt[B]=chNuevo(B);S.role='admin';S.encOn=false;S.pinOk[pinKey()]=true;S.lejos3No={};S.rutaOv81={};S.tab.admin='inicio';render();
 var t=hoyTareas().filter(x=>/^lejos3/.test(x.k));return {A,B,L:lejos3(hoy81()).map(x=>({c:x.c.id,de:x.de,a:x.a,d0:Math.round(x.d0),d1:Math.round(x.d1*10)/10})),t}});
ok(r.L.length===1&&r.L[0].c===await ev(()=>LEJ)&&r.L[0].a===r.B,'detecta al cliente que queda lejos de la ruta de A y cerca de la de B',r);
ok(r.t.length===1&&/1 cliente queda lejos de su ruta de hoy/.test(r.t[0].t),'en "Hoy" de Inicio sale el aviso',r.t);
r=await ev(()=>{var b=document.createElement('button');b.dataset.act='popgo';b.dataset.t=hoyTareas().filter(x=>/^lejos3/.test(x.k))[0].go;document.body.appendChild(b);b.click();b.remove();var o=document.getElementById('rt81');var c=o&&o.querySelector('[data-x="lejos3"]');return {ov:!!o,dia:S.rt81&&S.rt81.dia,t:c?c.innerText:''}});
ok(r.ov&&r.dia==='hoy'&&/Quedan lejos de su ruta/.test(r.t)&&/Queda a .* km del resto de la ruta de/.test(r.t)&&/quedaría a/.test(r.t)&&/No, dejarlo/.test(r.t),'"Ir" abre Armar rutas con la tarjeta "📍 Quedan lejos de su ruta"',r);
/* No → no vuelve a sugerirlo */
r=await ev(()=>{document.querySelector('#rt81 [data-act="lejos3no"]').click();return {n:lejos3(hoy81()).length,card:!!document.querySelector('#rt81 [data-x="lejos3"]'),ch:cl(LEJ).chofer,ov:ovDe81(hoy81(),LEJ),h:S.hist.slice(-1)[0].x}});
ok(r.n===0&&!r.card&&r.ch===await ev(()=>A)&&r.ov===undefined&&/se queda con/.test(r.h),'"No, dejarlo": no se mueve y ya no lo vuelve a sugerir (queda en el historial)',r);
/* Sí, solo hoy */
r=await ev(()=>{S.lejos3No={};render();document.querySelector('#rt81 [data-act="lejos3si"][data-m="dia"]').click();return {ov:ovDe81(hoy81(),LEJ),ch:cl(LEJ).chofer,la:lista81(A,hoy81()).L.map(x=>x.c),lb:lista81(B,hoy81()).L.map(x=>x.c),n:lejos3(hoy81()).length,h:S.hist.slice(-1)[0].x}});
ok(r.ov===await ev(()=>B)&&r.ch===await ev(()=>A)&&r.lb.indexOf(await ev(()=>LEJ))>-1&&r.la.indexOf(await ev(()=>LEJ))<0&&r.n===0&&/solo hoy/.test(r.h),'"Pasarlo con B · solo hoy": se pasa hoy, su chofer fijo no cambia',r);
/* Siempre (mañana) */
r=await ev(()=>{S.rt81={dia:'man',sel:{}};render();var c=document.querySelector('#rt81 [data-act="lejos3si"][data-m="siempre"]');if(c)c.click();return {hay:!!c,ch:cl(LEJ).chofer,n:lejos3(man81()).length}});
ok(r.hay&&r.ch===await ev(()=>B)&&r.n===0,'"Siempre con B": queda en la ruta de B para siempre',r);
/* sin ubicación no se toma en cuenta */
r=await ev(()=>{S.cli.forEach(c=>{c.lat=null;c.lng=null});return lejos3(hoy81()).length+lejos3(man81()).length});ok(r===0,'clientes sin ubicación: no sugiere nada',r);
ok(!errs.length,'sin errores',errs);console.log(nOK+' OK · '+nF+' FAIL');await b.close()})();
