const {chromium}=require('playwright');
/* 8.6 · 67: chofer con la ruta del sábado sin cierre: mandar cierre, pedir que liberen y liberar, con dos celulares · (copiado de t78nube) 7.8 · 27: pedido asignado al chofer con el cierre enviado (dos celulares y nube de prueba) · basado en l61: 30 saldos con sumas y restas (dos celulares, uno sin señal, con una nube de prueba que se porta como Firestore)
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
const A=await cel('admin');await A.evaluate(()=>{nbEmpuja()});await A.waitForTimeout(300);
const B=await cel('rep');await B.evaluate(()=>__pull(true));await B.waitForTimeout(200);
await B.evaluate(()=>{S.chofHoy=1;S.role='rep';S.salida.ok=true;S.tab.rep='ruta';nbEmpuja();render()});await B.waitForTimeout(300);
await A.evaluate(()=>__pull());await A.waitForTimeout(200);
let r=await B.evaluate(()=>{S.chofHoy=1;S.role='rep';S.rutaDia80=iso(new Date(TODAY.getTime()-3*864e5));S.salida.ok=true;S.stops=[{c:S.cli[0].id,done:true}];S.log=[{c:S.cli[0].id,R:2,M:0,total:600,pago:600,abono:0}];S.cierre.sent=false;S.dia80=null;S.tab.rep='ruta';render();nbEmpuja();return {ov:!!document.getElementById('dia80'),txt:(document.getElementById('dia80')||{}).innerText}});
ok(r.ov,'el chofer ve "No mandaste tu cierre"',r.txt&&r.txt.slice(0,60));
await B.waitForTimeout(300);
r=await B.evaluate(()=>{var b=document.querySelector('#dia80 [data-act="lib83"]');if(!b)return 'sin botón';b.click();nbEmpuja();return (S.avPrecio||[]).filter(x=>/URGENTE.*Liberar/.test(x)).length});ok(r===1,'el chofer pide que liberen su ruta',r);
await B.waitForTimeout(300);await A.evaluate(()=>__pull());await A.waitForTimeout(200);
r=await A.evaluate(()=>{S.role='admin';S.tab.admin='inicio';render();var av=(S.avPrecio||[]).some(x=>/URGENTE.*no puede mandar su cierre/.test(x));var card=!!document.querySelector('[data-x="dia80a"] [data-act="lib86"]');var sos=!!document.querySelector('[data-x="dia80a"] .sos86');var vis=document.querySelector('main').innerText.indexOf('no puede mandar su cierre')>-1;return {av,card,vis,sos,ch:S.chofHoy,dia:nbRGet(1,'rutaDia80')}});
ok(r.av,'al administrador le llega la petición (en sus datos)',r);ok(r.vis,'el administrador VE la petición en su pantalla',r);ok(r.card&&r.sos,'el administrador ve la tarjeta roja "pide que liberes su ruta" con "Liberar su ruta de hoy" (aunque su celular tenga cargada esa ruta)',r);
r=await A.evaluate(()=>{var b=document.querySelector('[data-x="dia80a"] [data-act="lib86"]');if(!b)return 'no';b.click();var s=document.querySelector('[data-act="lib86s"]');if(!s)return 'sin confirmar';s.click();nbEmpuja();return {d:nbRGet(1,'rutaDia80'),n:(nbRGet(1,'stops')||[]).length}});ok(r&&r.d==='2026-10-28','el administrador libera la ruta',r);
await A.waitForTimeout(400);await B.evaluate(()=>__pull());await B.waitForTimeout(300);
r=await B.evaluate(()=>{S.chofHoy=1;S.role='rep';render();return {ov:!!document.getElementById('dia80'),dia:S.rutaDia80,log:(S.log||[]).length}});ok(!r.ov&&r.log===0,'al chofer le llega su ruta de hoy y desaparece la pantalla',r);
ok(errs.length===0,'sin errores',errs);
console.log(nOK+' OK · '+nF+' FAIL');await b.close()})();
