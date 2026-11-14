/* 8.1 · 39 · Rutas del administrador */
const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();let nOK=0,nF=0;const ok=(c,m,x)=>{c?nOK++:nF++;console.log((c?'OK   ':'FAIL ')+m+(x!==undefined?' '+JSON.stringify(x).slice(0,300):''))};
const p=await (await b.newContext({viewport:{width:400,height:860}})).newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));await p.addInitScript(()=>{window.__pnTest=1});
await p.goto('file:///mnt/user-data/outputs/prototipo-platanos.html');await p.waitForTimeout(800);const ev=(f,a)=>p.evaluate(f,a);const ck=s=>ev(s=>{var e=document.querySelector(s);if(!e)return false;e.click();return true},s);let r;
// escenario: dos choferes (A y B) con su ruta de hoy armada; el admin en otro celular
r=await ev(()=>{var L=chs81();var A=+L[0].id,B=+L[1].id;window.A=A;window.B=B;var d=TODAY.getDay();S.cli.forEach((c,i)=>{c.oculto=false;c.dias=i<6?[d]:[];c.chofer=i<3?A:(i<6?B:A);c.extra=null;c.ped=null});S.chofHoy=null;S.chSt={};S.chSt[A]=chNuevo(A);S.chSt[B]=chNuevo(B);
 S.role='admin';S.pinOk[pinKey()]=true;S.tab.admin='inicio';render();return {A,B,a:S.chSt[A].stops.length,b:S.chSt[B].stops.length,e:!!document.querySelector('[data-x="rt81e"]')}});
const A0=r.A,B0=r.B;ok(r.a===3&&r.b===3&&r.e,'Inicio: tarjeta "Rutas de hoy"',r);
await ck('[data-act="rt81open"][data-v="hoy"]');r=await ev(()=>({ov:!!document.getElementById('rt81'),cards:document.querySelectorAll('#rt81 .chc').length,its:document.querySelectorAll('#rt81 .it').length}));ok(r.ov&&r.cards>=2&&r.its>=6,'la pantalla Rutas muestra a cada chofer con sus clientes',r);
// sin días (los demás clientes) → aviso
ok(await ev(()=>/sin días de visita/.test(document.getElementById('rt81').innerText)),'aviso "sin días de visita"');
// pasar 2 clientes de A a B solo hoy
r=await ev(()=>{var a=S.chSt[A].stops.slice(0,2).map(s=>s.c);a.forEach(c=>document.querySelector('#rt81 [data-k="'+c+'|'+A+'"]').click());document.querySelector('[data-act="rt81pas"]').click();document.querySelector('[data-act="rt81dest"][data-id="'+B+'"]').click();document.querySelector('[data-act="rt81ok"]').click();
 return {a,la:lista81(A,hoy81()).L.length,lb:lista81(B,hoy81()).L.length,ch:a.map(c=>cl(c).chofer),ops:Object.keys(S.rq81[hoy81()]).length}});
ok(r.la===1&&r.lb===5&&r.ch.every(x=>x===A0)&&r.ops===4,'pasar 2 a otro chofer solo hoy: se ve al momento, su chofer fijo no cambia',r);
// el celular de B recibe el cambio
r=await ev(()=>{var keep=JSON.parse(JSON.stringify(S.chSt[B]));S.role='rep';S.chofHoy=B;Object.keys(keep).forEach(k=>S[k]=keep[k]);S.rt81=null;S.tab.rep='ruta';render();return {n:S.stops.length,mv:S.stops.filter(s=>s.mv81).length,pend:ops81(B).length}});
ok(r.n===5&&r.mv===2&&r.pend===0,'el celular del chofer B mete los 2 clientes a su ruta',r);
r=await ev(()=>{var keep=JSON.parse(JSON.stringify(S.chSt[A]));S.chofHoy=A;Object.keys(keep).forEach(k=>S[k]=keep[k]);render();return {n:S.stops.length,pend:ops81(A).length}});
ok(r.n===1&&r.pend===0,'el celular del chofer A los quita de su ruta',r);
// "Hoy no" + "Volver a ponerlo"
r=await ev(()=>{S.role='admin';S.chofHoy=null;S.chSt[A]=JSON.parse(JSON.stringify(arPack()));S.rt81={dia:'hoy',sel:{}};render();var c=S.chSt[A].stops[0].c;document.querySelector('#rt81 [data-k="'+c+'|'+A+'"]').click();document.querySelector('[data-act="rt81no"]').click();var t=document.getElementById('rt81').innerText;return {c,no:/Hoy no se visitan/.test(t),la:lista81(A,hoy81()).L.length,ov:ovDe81(hoy81(),c)}});
ok(r.no&&r.la===0&&r.ov===0,'"Hoy no": se quita solo hoy',r);
r=await ev(c=>{document.querySelector('[data-act="rt81vol"][data-id="'+c+'"]').click();return {la:lista81(A,hoy81()).L.length,ov:ovDe81(hoy81(),c)}},r.c);ok(r.la===1&&r.ov===undefined,'"Volver a ponerlo" lo regresa',r);
// mañana: pasar para siempre
r=await ev(()=>{S.rt81={dia:'man',sel:{}};var d=(TODAY.getDay()+1)%7;var c=S.cli[7];c.dias=[d];c.chofer=A;render();document.querySelector('#rt81 [data-k="'+c.id+'|'+A+'"]').click();document.querySelector('[data-act="rt81pas"]').click();document.querySelector('[data-act="rt81dest"][data-id="'+B+'"]').click();document.querySelector('[data-act="rt81modo"][data-v="siempre"]').click();document.querySelector('[data-act="rt81ok"]').click();
 var T0=TODAY;TODAY=new Date(TODAY.getTime()+864e5);var nb=chNuevo(B).stops.map(s=>s.c),na=chNuevo(A).stops.map(s=>s.c);TODAY=T0;return {cid:c.id,ch:c.chofer,inB:nb.indexOf(c.id)>-1,inA:na.indexOf(c.id)>-1}});
ok(r.ch===B0&&r.inB&&!r.inA,'mañana, para siempre: cambia su chofer y mañana le sale a B',r);
// sin chofer
r=await ev(()=>{S.rt81={dia:'hoy',sel:{}};var c=S.cli[8];c.dias=[TODAY.getDay()];c.chofer=null;render();var t=document.getElementById('rt81').innerText;return {sc:sinCh81(hoy81()).length,t:/sin chofer/.test(t),e:!!document.querySelector('#rt81 [data-k="'+c.id+'|0"]')}});
ok(r.sc===1&&r.t&&r.e,'aviso "sin chofer" con el cliente para pasarlo',r);
// todos a un chofer
r=await ev(()=>{document.querySelector('[data-act="rt81todos"]').click();var n=Object.keys(S.rt81.sel).length;document.querySelector('[data-act="rt81dest"][data-id="'+A+'"]').click();document.querySelector('[data-act="rt81ok"]').click();return {n,la:lista81(A,hoy81()).L.length,lb:lista81(B,hoy81()).L.length,sc:sinCh81(hoy81()).length}});
ok(r.la===r.n&&r.lb===0&&r.sc===0,'"Todos a un chofer"',r);
// ya va en camino
r=await ev(()=>{S.chSt[B].salida={ok:true};S.rt81={dia:'hoy',sel:{}};render();var it=document.querySelector('#rt81 .it:not([disabled])');it.click();document.querySelector('[data-act="rt81pas"]').click();document.querySelector('[data-act="rt81dest"][data-id="'+B+'"]').click();return /ya va en camino/.test(document.getElementById('rt81bar').innerText)});ok(r,'si el chofer ya salió, avisa "ya va en camino"');
await ev(()=>{S.rt81.pick=null;S.rt81.sel={};render()});
// le cabe
r=await ev(()=>{var v=S.veh[0];v.capC=2;S.vehAsig=S.vehAsig||{};S.vehAsig[A]=v.id;S.cli.forEach(c=>{c.uR=5});render();return /No le cabe/.test(document.getElementById('rt81').innerText)});ok(r,'"¿le cabe?": avisa cuando no le cabe en la camioneta');
// mapa
r=await ev(()=>{document.querySelector('[data-act="rt81map"]').click();return !!document.querySelector('#rt81 [data-vivo="rt81m"]')});ok(r,'ver en el mapa con el color de cada chofer');
// pendientes de ayer: el chofer trabajó y dejó 2 sin visitar → mañana le salen primero
r=await ev(()=>{S.chSt[A].salida={ok:true};S.chSt[A].log=[{x:1}];S.chSt[A].stops.forEach((s,i)=>{s.done=i>1});var pend=S.chSt[A].stops.filter(s=>!s.done).map(s=>s.c);S.chSt[A].rutaDia80=hoy81();var T0=TODAY;TODAY=new Date(TODAY.getTime()+864e5);var o=chNuevo(A);TODAY=T0;return {pend,st:o.stops.slice(0,pend.length).map(s=>[s.c,!!s.pend81])}});
ok(r.st.length===r.pend.length&&r.st.every((x,i)=>x[0]===r.pend[i]&&x[1]),'los que no se visitaron ayer salen primero y marcados',r);
ok(errs.length===0,'sin errores',errs);
console.log(nOK+' OK · '+nF+' FAIL');await b.close()})();
