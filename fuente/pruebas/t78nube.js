const {chromium}=require('playwright');
/* 7.8 · 27: pedido asignado al chofer con el cierre enviado (dos celulares y nube de prueba) · basado en l61: 30 saldos con sumas y restas (dos celulares, uno sin señal, con una nube de prueba que se porta como Firestore)
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
await B.evaluate(()=>{S.chofHoy=1;S.role='rep';S.salida.ok=true;S.stops.forEach(s=>s.done=true);S.inv.reparto=0;S.cierre.sent=true;S.tab.rep='ruta';nbEmpuja();render()});await B.waitForTimeout(300);
await A.evaluate(()=>__pull());await A.waitForTimeout(200);
let r=await A.evaluate(()=>{S.chofHoy=2;var c=S.cli.find(x=>x.chofer!==1&&!x.oculto)||S.cli[5];c.ped={R:5,M:10,cuando:'hoy'};p57Asigna(c,1);nbEmpuja();return {cid:c.id,ch:est57(c).ch&&est57(c).ch.id}});
ok(r.ch===1,'el administrador ve el pedido como asignado a ese chofer',r);
await A.waitForTimeout(300);await B.evaluate(()=>__pull());await B.waitForTimeout(200);await B.evaluate(()=>{S.chofHoy=1;render()});await B.waitForTimeout(200);
const t=await B.evaluate(()=>[S.stops.filter(s=>!s.done).map(s=>s.c),document.querySelector('main').innerText]);
ok(t[0].indexOf(r.cid)>-1,'con el cierre enviado y la app abierta, la parada nueva entra a su ruta al momento',t[0]);
ok(/Se te asignó una nueva entrega/.test(t[1])&&(t[1].match(/Ir a cargar/g)||[]).length===1,'le sale la tarjeta con UN solo botón "Ir a cargar"');
ok(!errs.length,'sin errores',errs);console.log(nOK+' OK · '+nF+' FAIL');await b.close()})();