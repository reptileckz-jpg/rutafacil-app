/* 8.1 · 39 · Rutas del administrador */
const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();let nOK=0,nF=0;const ok=(c,m,x)=>{c?nOK++:nF++;console.log((c?'OK   ':'FAIL ')+m+(x!==undefined?' '+JSON.stringify(x).slice(0,300):''))};
const p=await (await b.newContext({viewport:{width:400,height:860}})).newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));await p.addInitScript(()=>{window.__pnTest=1});
await p.goto('file:///mnt/user-data/outputs/prototipo-platanos.html');await p.waitForTimeout(800);const ev=(f,a)=>p.evaluate(f,a);const ck=s=>ev(s=>{var e=document.querySelector(s);if(!e)return false;e.click();return true},s);let r;
// escenario: dos choferes (A y B) con su ruta de hoy armada; el admin en otro celular
r=await ev(()=>{var L=chs81();var A=+L[0].id,B=+L[1].id;window.A=A;window.B=B;var d=TODAY.getDay();S.cli.forEach((c,i)=>{c.oculto=false;c.dias=i<6?[d]:[];c.chofer=i<3?A:(i<6?B:A);c.extra=null;c.ped=null});S.chofHoy=null;S.chSt={};S.chSt[A]=chNuevo(A);S.chSt[B]=chNuevo(B);
 S.role='admin';S.pinOk[pinKey()]=true;S.tab.admin='rutas';render();return {A,B,a:S.chSt[A].stops.length,b:S.chSt[B].stops.length,e:!!document.querySelector('[data-x="rut92s"]')}});
const A0=r.A,B0=r.B;ok(r.a===3&&r.b===3&&r.e,'Rutas (en la barra): tarjeta con los clientes de hoy',r);
await ck('[data-act="rt81open"][data-v="hoy"]');r=await ev(()=>({ov:!!document.getElementById('rt81'),cards:document.querySelectorAll('#rt81 .ch84').length,its:document.querySelectorAll('#rt81 .it84').length}));ok(r.ov&&r.cards>=3&&r.its>=6,'la pantalla Rutas muestra a cada chofer con sus clientes',r);
// sin días (los demás clientes) → aviso
ok(await ev(()=>/sin días de visita/.test(document.getElementById('rt81').innerText)),'aviso "sin días de visita"');
// pasar 2 clientes de A a B solo hoy
r=await ev(()=>{var a=S.chSt[A].stops.slice(0,2).map(s=>s.c);a.forEach(c=>document.querySelector('#rt81 [data-k="'+c+'|'+A+'"]').click());document.querySelector('[data-act="rt84t"][data-id="'+B+'"]').click();document.querySelector('[data-act="rt84ok"]').click();
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
r=await ev(()=>{S.rt81={dia:'man',sel:{}};var d=(TODAY.getDay()+1)%7;var c=S.cli[7];c.dias=[d];c.chofer=A;render();document.querySelector('#rt81 [data-k="'+c.id+'|'+A+'"]').click();document.querySelector('[data-act="rt83m"][data-v="siempre"]').click();document.querySelector('[data-act="rt84t"][data-id="'+B+'"]').click();document.querySelector('[data-act="rt84ok"]').click();
 var T0=TODAY;TODAY=new Date(TODAY.getTime()+864e5);var nb=chNuevo(B).stops.map(s=>s.c),na=chNuevo(A).stops.map(s=>s.c);TODAY=T0;return {cid:c.id,ch:c.chofer,inB:nb.indexOf(c.id)>-1,inA:na.indexOf(c.id)>-1}});
ok(r.ch===B0&&r.inB&&!r.inA,'mañana, para siempre: cambia su chofer y mañana le sale a B',r);
// sin chofer
r=await ev(()=>{S.rt81={dia:'hoy',sel:{}};var c=S.cli[8];c.dias=[TODAY.getDay()];c.chofer=null;render();var t=document.getElementById('rt81').innerText;document.querySelector('#rt81 [data-act="rt84e"][data-k="sc"]').click();return {sc:sinCh81(hoy81()).length,t:/sin chofer/.test(t),e:!!document.querySelector('#rt81 [data-k="'+c.id+'|0"]')}});
ok(r.sc===1&&r.t&&r.e,'aviso "sin chofer" con el cliente para pasarlo',r);
// todos a un chofer
r=await ev(()=>{document.querySelector('[data-act="rt81todos"]').click();var n=Object.keys(S.rt81.sel).length;document.querySelector('[data-act="rt84t"][data-id="'+A+'"]').click();document.querySelector('[data-act="rt84ok"]').click();return {n,la:lista81(A,hoy81()).L.length,lb:lista81(B,hoy81()).L.length,sc:sinCh81(hoy81()).length}});
ok(r.la===r.n&&r.lb===0&&r.sc===0,'"Todos a un chofer"',r);
// ya va en camino
r=await ev(()=>{S.chSt[B].salida={ok:true};S.rt81={dia:'hoy',sel:{}};render();var it=[...document.querySelectorAll('#rt81 .it84:not([disabled])')].find(x=>x.dataset.k.split('|')[1]!==String(B));it.click();document.querySelector('#rt81 [data-act="rt84t"][data-id="'+B+'"]').click();return /ya va en camino/.test(document.getElementById('rt81bar').innerText)});ok(r,'si el chofer ya salió, avisa "ya va en camino"');
await ev(()=>{S.rt81.sel={};render()});
// le cabe
r=await ev(()=>{var v=S.veh[0];v.capC=2;S.vehAsig=S.vehAsig||{};S.vehAsig[A]=v.id;S.cli.forEach(c=>{c.uR=5});render();return /No le cabe/.test(document.getElementById('rt81').innerText)});ok(r,'"¿le cabe?": avisa cuando no le cabe en la camioneta');
// mapa
r=await ev(()=>{document.querySelector('[data-act="rt81map"]').click();return !!document.querySelector('#rt81 [data-vivo="rt81m"]')});ok(r,'ver en el mapa con el color de cada chofer');
// pendientes de ayer: el chofer trabajó y dejó 2 sin visitar → mañana le salen primero
r=await ev(()=>{S.chSt[A].salida={ok:true};S.chSt[A].log=[{x:1}];S.chSt[A].stops.forEach((s,i)=>{s.done=i>1});var pend=S.chSt[A].stops.filter(s=>!s.done).map(s=>s.c);S.chSt[A].rutaDia80=hoy81();var T0=TODAY;TODAY=new Date(TODAY.getTime()+864e5);var o=chNuevo(A);TODAY=T0;return {pend,st:o.stops.slice(0,pend.length).map(s=>[s.c,!!s.pend81])}});
ok(r.st.length===r.pend.length&&r.st.every((x,i)=>x[0]===r.pend[i]&&x[1]),'los que no se visitaron ayer salen primero y marcados',r);
// tutorial
r=await ev(()=>{S.rt81=null;S.tab.admin='inicio';render();var sel=TUT['n:rt81'].map(x=>!!document.querySelector(x[0]));return {sel,adm:TUT.admin[1][1],rep:TUT.rep.some(x=>/Tu ruta puede cambiar/.test(x[1])),apr:aprendeItems().some(x=>/Repartir las rutas/.test(x[0])),help:/Rutas/.test((HELP.rutas||[])[0]||'')}});
ok(r.sel.every(Boolean)&&r.adm==='Rutas'&&r.rep&&r.apr&&r.help,'tutorial: recorrido de Rutas, paso nuevo, "Aprende la app" y ayuda',r);
r=await ev(()=>{S.rt81=null;S.tab.admin='rutas';render();document.querySelector('[data-act="rt81open"]').click();var a=!!document.querySelector('#rt81 .hlp84');document.querySelector('#rt81 [data-act="rt84h"]').click();var b=!!document.querySelector('#rt81 .hlp84');return [!a,b]});
ok(r[0]&&r[1],'"¿Cómo se usa?" está en el botón "?" (ventanita) y no ocupa la pantalla',r);
await ev(()=>{S.rt81=null;render()});
// 8.3 · más fácil: marcar no redibuja toda la app; un toque al chofer; deshacer; aviso repetido
r=await ev(()=>{S.chSt={};S.chSt[A]=chNuevo(A);S.chSt[B]=chNuevo(B);S.rt81={dia:'hoy',sel:{}};S.rq81={};render();var n=0,r0=render;render=function(){n++;return r0.apply(this,arguments)};var its=[...document.querySelectorAll('#rt81 .it84:not([disabled])')].filter(x=>x.dataset.k.split('|')[1]==String(A)).slice(0,2);var kk=its.map(x=>x.dataset.k);kk.forEach(k=>document.querySelector('#rt81 [data-k="'+k+'"]').click());render=r0;var bar=document.getElementById('rt81bar');return {n,marc:Object.keys(S.rt81.sel).length,chs:bar?[...bar.querySelectorAll('[data-act="rt84t"]')].map(x=>+x.dataset.id):[],ks:its.map(x=>+x.dataset.k.split('|')[0])}},);
ok(r.n===0&&r.marc===2&&r.chs.indexOf(B0)>-1&&r.chs.indexOf(A0)<0,'8.3 · marcar no redibuja toda la app y abajo salen directo los choferes (sin el de origen)',r);
const ks83=r.ks;r=await ev(ks=>{document.querySelector('#rt81 [data-act="rt84t"][data-id="'+B+'"]').click();document.querySelector('#rt81 [data-act="rt84ok"]').click();var ok1=ks.every(c=>lista81(B,hoy81()).L.some(x=>x.c===c));var u=!!document.querySelector('#rt81 [data-act="rt83u"]');document.querySelector('#rt81 [data-act="rt83u"]').click();var back=ks.every(c=>lista81(A,hoy81()).L.some(x=>x.c===c))&&!ks.some(c=>lista81(B,hoy81()).L.some(x=>x.c===c));return {ok1,u,back}},ks83);
ok(r.ok1&&r.u&&r.back,'8.3 · un toque y pasan; "Deshacer" los regresa',r);
r=await ev(()=>{S.role='rep';S.chofHoy=A;var o=JSON.parse(JSON.stringify(S.chSt[A]));Object.keys(o).forEach(k=>S[k]=o[k]);var c=S.stops[0].c;S.stops[0].done=true;S.rq81={};S.rq81[hoy81()]={x1:{ch:A,op:'add',c:c,t:Date.now()}};render();var n1=S.stops.filter(s=>+s.c===c).length;
 S.stops.push({c:S.stops[1].c});render();var n2=S.stops.filter(s=>+s.c===S.stops[1].c&&!s.done).length;S.role='admin';S.chofHoy=null;return {n1,n2}});
ok(r.n1===1&&r.n2===1,'8.3 · un aviso repetido no vuelve a meter a un cliente ya entregado, y no quedan paradas pendientes repetidas',r);
ok(errs.length===0,'sin errores',errs);
console.log(nOK+' OK · '+nF+' FAIL');await b.close()})();
