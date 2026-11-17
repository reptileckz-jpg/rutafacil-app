const {chromium}=require('playwright');
/* 9.5 · BATERÍA de cambio de día con dos celulares: en cada caso el efectivo y las cajas CUADRAN al final · (de t94nube) 9.4 · el cierre de AYER mandado tarde no se pierde: se guarda aparte y el administrador lo recibe (dos celulares) · base t86nube · 8.6 · 67: chofer con la ruta del sábado sin cierre: mandar cierre, pedir que liberen y liberar, con dos celulares · (copiado de t78nube) 7.8 · 27: pedido asignado al chofer con el cierre enviado (dos celulares y nube de prueba) · basado en l61: 30 saldos con sumas y restas (dos celulares, uno sin señal, con una nube de prueba que se porta como Firestore)
        32 cambio de día · 34 centavos · 35 doble toque */
(async()=>{const b=await chromium.launch();let nOK=0,nF=0;const ok=(c,m,x)=>{c?nOK++:nF++;console.log((c?'OK   ':'FAIL ')+m+(x!==undefined?' '+JSON.stringify(x).slice(0,300):''))};
const errs=[];
/* ---- nube de prueba: set con merge (mapas anidados), borrar campo e increment, como Firestore ---- */
const DB={},VER={};let seq=0;
function merge(dst,src){for(const k of Object.keys(src)){const v=src[k];if(v&&typeof v==='object'&&v.__del){delete dst[k];continue}
 if(v&&typeof v==='object'&&'__inc' in v){dst[k]=(typeof dst[k]==='number'?dst[k]:0)+v.__inc;continue}
 if(v&&typeof v==='object'&&!Array.isArray(v)){if(!dst[k]||typeof dst[k]!=='object')dst[k]={};merge(dst[k],v);continue}dst[k]=v}}
const srvSet=(p,js,m)=>{const o=JSON.parse(js);if(!m||!DB[p])DB[p]={};merge(DB[p],o);VER[p]=++seq;return true};
const srvPull=(pref,visto)=>{visto=JSON.parse(visto);const out=[];for(const p of Object.keys(DB)){if(!p.startsWith(pref+'/'))continue;if(visto[p]===VER[p])continue;out.push({p,id:p.slice(pref.length+1),data:JSON.parse(JSON.stringify(DB[p])),v:VER[p]})}return JSON.stringify(out)};
const cel=async(rol)=>{const p=await b.newPage({viewport:{width:400,height:860}});p.on('pageerror',e=>errs.push(rol+': '+e.message));
 await p.exposeFunction('__srvSet',srvSet);await p.exposeFunction('__srvPull',srvPull);
 await p.addInitScript(()=>{window.__pnTest=1;window.__nbFast=1;window.__visto={};
  window.__fakeAd={set:(p,o,m)=>window.__srvSet(p,JSON.stringify(o),!!m),del:()=>({__del:1}),inc:n=>({__inc:n}),watch:()=>()=>{},get:()=>Promise.resolve(null),borrar:()=>Promise.resolve(),rango:()=>Promise.resolve([])};
  window.__pull=async(primera)=>{const L=JSON.parse(await window.__srvPull(nbP('d'),JSON.stringify(__visto)));L.forEach(x=>__visto[x.p]=x.v);if(L.length){nbAplica(L.map(x=>({id:x.id,data:x.data})),!!primera);render()}return L.length}});
 await p.goto('file:///mnt/user-data/outputs/prototipo-platanos.html');await p.waitForTimeout(700);
 await p.evaluate(rol=>{NB.on=true;NB.listo=true;NB.ad=__fakeAd;NB.perfil={rol:rol==='admin'?'admin':'chofer'};S.role=rol==='admin'?'admin':'rep';S.encOn=false;S.pinOk[pinKey()]=true;S.popVisto={admin:iso(TODAY)};localStorage.removeItem('salIni');render()},rol);return p};

const W=ms=>new Promise(r=>setTimeout(r,ms));
async function par(){for(const k of Object.keys(DB))delete DB[k];const A=await cel('admin');await A.evaluate(()=>{nbEmpuja()});await W(250);const B=await cel('rep');await B.evaluate(()=>{NB.perfil={rol:'chofer',chId:1}});await B.evaluate(()=>__pull(true));await W(150);return {A,B}}
const sync=async(de,a)=>{await de.evaluate(()=>{render();nbEmpuja()});await W(250);await a.evaluate(()=>__pull());await W(200)};
/* la ruta del chofer: dia = 0 hoy / -1 ayer; salió; entregas (cobra 300 c/u, 1 caja); 75 cajas cargadas */
const ruta=(B,o)=>B.evaluate(o=>{S.chofHoy=1;S.role='rep';S.pinOk[pinKey()]=true;S.rutaDia80=iso(new Date(TODAY.getTime()+o.dia*864e5));S.salida.ok=o.salio;S.inv.reparto=75;S.cierre.salioR=75;S.cierre.sent=false;S.cierreReg=null;S.recep=null;S.dia80=null;
 S.stops=S.cli.slice(0,3).map((c,i)=>({c:c.id,done:i<o.n}));S.log=S.cli.slice(0,o.n).map(c=>({c:c.id,R:1,M:0,total:300,pago:300,abono:0,h:'18:00'}));S.tab.rep='ruta';window.__hora93=o.hora==null?12:o.hora;render();nbEmpuja()},o);
const manda=B=>B.evaluate(()=>{S.tab.rep='cierre';S.cierre.gxConf=true;S.cierre.tankOk=true;S.salida.fotosFin=S.salida.fotosFin||{};FOTOS.concat([['odo','o']]).forEach(x=>{S.salida.fotosFin[x[0]]=S.salida.fotosFin[x[0]]||'x'});S.cierre.ev79={ok:true,h:'07:00'};S.cierre.fotoReg='x';
 var b=document.createElement('button');b.dataset.act='enviar';b.dataset.ok='1';document.body.appendChild(b);b.click();b.remove();render();render();return !!S.cierre.sent||S.rutaDia80===iso(TODAY)});
const medianoche=(P,h)=>P.evaluate(h=>{window.__hora93=h;var viejo=iso(TODAY);TODAY=new Date(TODAY.getTime()+864e5);try{_nbDiaOk=true}catch(e){}cambioDeDia(viejo);render()},h);
const cuenta=A=>A.evaluate(()=>{S.role='admin';return {caja:cajaEsp(),mad:S.inv.maduras,pend:atrasLista93().length}});
async function recibe(A,como){await A.evaluate(como=>{S.role='admin';S.tab.admin='rutas';render();if(como==='atr'){var b=document.querySelector('[data-act="atr93"]');if(!b)throw new Error('sin tarjeta 📥');b.click()}else{var v=document.querySelector('[data-x="ch92"][data-id="1"] [data-act="verruta"][data-ir="cierreadm"]');if(!v)throw new Error('sin Recibir su cierre');v.click()}render()},como);await W(100);
 await A.evaluate(()=>{var b=document.querySelector('[data-act="rcabre"]');if(!b)throw new Error('sin botón Recibir el cierre');b.click()});await W(100);
 await A.evaluate(()=>{var b=document.querySelector('[data-act="rctodo"]');if(b)b.click()});await W(100);
 for(let i=0;i<3;i++){if(await A.evaluate(()=>S.rcv&&S.rcv.p)===2){await A.evaluate(()=>{document.querySelectorAll('#rcov [data-act="eqest"][data-v="bien"]').forEach(b=>b.click());var b=document.querySelector('[data-act="rceqok"]');if(b)b.click()});await W(100)}}
 await A.evaluate(()=>{var b=document.querySelector('[data-act="rcfin"]');if(b)b.click();var s=document.querySelector('[data-act="rcfinsi"]');if(s)s.click();render()});await W(200)}
const delta=(a,b)=>({caja:Math.round(b.caja-a.caja),mad:b.mad-a.mad,pend:b.pend});
let P,c0,c1,r;
/* 1 · mandado antes de las 12, recibido después de las 12 */
P=await par();await ruta(P.B,{dia:0,salio:true,n:2});await manda(P.B);await sync(P.B,P.A);c0=await cuenta(P.A);
await medianoche(P.A,1);await medianoche(P.B,1);await sync(P.B,P.A);await sync(P.A,P.B);
r=await P.A.evaluate(()=>atrasLista93().map(x=>x.why));ok(r.join()==='cierre','1 · mandado 11 p.m., a las 12 queda guardado para recibir (no se pierde)',r);
await recibe(P.A,'atr');c1=await cuenta(P.A);r=delta(c0,c1);ok(r.caja===600&&r.mad===73&&r.pend===0,'1 · al recibirlo: +$600 a la caja y +73 cajas a la bodega',r);
/* 2 · mandado a las 12:30 a.m. (sigue siendo su ruta): se recibe normal */
P=await par();await ruta(P.B,{dia:-1,salio:true,n:2,hora:0});r=await P.B.evaluate(()=>!!document.getElementById('dia80'));ok(!r,'2 · 12:30 a.m.: no se bloquea');await manda(P.B);await sync(P.B,P.A);c0=await cuenta(P.A);
await recibe(P.A,'normal');c1=await cuenta(P.A);r=delta(c0,c1);ok(r.caja===600&&r.mad===73,'2 · se recibe normal: +$600 y +73 cajas',r);
/* 3 · mandado después de las 5 a.m. (ya tenía bloqueo): t94nube; aquí con el chofer SIN SEÑAL al mandarlo */
P=await par();await ruta(P.B,{dia:-1,salio:true,n:3,hora:7});await manda(P.B);r=await P.B.evaluate(()=>({rd:S.rutaDia80,hoy:iso(TODAY)}));ok(r.rd===r.hoy,'3 · 7 a.m. sin señal: lo manda y le sale su ruta de hoy',r);
await W(200);await sync(P.B,P.A);c0=await cuenta(P.A);r=await P.A.evaluate(()=>atrasLista93().map(x=>x.why+':'+x.ef));ok(r.join()==='cierre:900','3 · cuando vuelve la señal, al admin le llega para recibirlo ($900)',r);
await recibe(P.A,'atr');c1=await cuenta(P.A);r=delta(c0,c1);ok(r.caja===900&&r.mad===72&&r.pend===0,'3 · +$900 y +72 cajas',r);
/* 4 · liberar la ruta de un chofer que no mandó su cierre */
P=await par();await ruta(P.B,{dia:-1,salio:true,n:2,hora:7});await sync(P.B,P.A);c0=await cuenta(P.A);
r=await P.A.evaluate(()=>{S.role='admin';S.tab.admin='rutas';render();libera86(1);render();nbEmpuja();return atrasLista93().map(x=>x.why+':'+x.ef)});ok(r.join()==='liberada:600','4 · al liberar, lo que traía queda para recibirlo (cobró $600)',r);
r=await P.A.evaluate(()=>{S.tab.admin='inicio';render();var t=document.querySelector('[data-x="hoy92"]').textContent;var nb=document.querySelector('nav.tabs button[data-t="rutas"] .tbadge');return {hoy:/falta recibir lo que traía/.test(t),nb:nb&&!nb.classList.contains('dot92')}});ok(r.hoy&&r.nb,'4 · en rojo en "Hoy" y numerito rojo en Rutas',r);
await recibe(P.A,'atr');c1=await cuenta(P.A);r=delta(c0,c1);ok(r.caja===600&&r.mad===73&&r.pend===0,'4 · al recibirlo: +$600 y +73 cajas',r);
await sync(P.A,P.B);r=await P.B.evaluate(()=>({rd:S.rutaDia80,hoy:iso(TODAY),sent:!!S.cierre.sent}));ok(r.rd===r.hoy&&!r.sent,'4 · el chofer queda con su ruta de hoy',r);
/* 5 · salió con 75 cajas y no entregó nada; cambió el día */
P=await par();await ruta(P.B,{dia:-1,salio:true,n:0,hora:7});r=await P.B.evaluate(()=>({ov:!!document.getElementById('dia80'),rd:S.rutaDia80,hoy:iso(TODAY)}));ok(!r.ov&&r.rd===r.hoy,'5 · no se le bloquea y le sale su ruta de hoy',r);
await sync(P.B,P.A);c0=await cuenta(P.A);r=await P.A.evaluate(()=>atrasLista93().map(x=>x.why));ok(r.join()==='sinEntregas','5 · al admin le quedan "las cajas que traía" para recibir',r);
await recibe(P.A,'atr');c1=await cuenta(P.A);r=delta(c0,c1);ok(r.caja===0&&r.mad===75&&r.pend===0,'5 · +75 cajas a la bodega, $0',r);
/* 6 · faltó efectivo al recibir: queda como faltante, como en un cierre normal */
P=await par();await ruta(P.B,{dia:-1,salio:true,n:2,hora:7});await sync(P.B,P.A);await P.A.evaluate(()=>{S.role='admin';libera86(1);render()});c0=await cuenta(P.A);const f0=await P.A.evaluate(()=>(S.faltantes||[]).length);
await P.A.evaluate(()=>{S.tab.admin='rutas';render();document.querySelector('[data-act="atr93"]').click();render();document.querySelector('[data-act="rcabre"]').click();S.rcv.E='500';S.rcv.R='73';S.rcv.M='0';S.rcv.V=String(S.rcv.V||0);render()});await W(100);
await P.A.evaluate(()=>{var x=S.rcv;var o='chofer';try{rcRegistra(x,o)}catch(e){console.log('rc',e)}S.rcv=null;render()});await W(150);
c1=await cuenta(P.A);r={d:delta(c0,c1),f:await P.A.evaluate(()=>(S.faltantes||[]).length)};ok(r.d.caja===500&&r.f>f0&&r.d.pend===0,'6 · entregó $500 de $600: entran $500 y queda faltante de $100',r);
ok(!errs.length,'sin errores',errs.slice(0,3));
console.log(nOK+' OK · '+nF+' FAIL');await b.close()})();
