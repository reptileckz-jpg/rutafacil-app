const {chromium}=require('playwright');
/* 8.1 · 39 · Rutas: el cambio viaja por la nube al celular del chofer · (copiado de t78nube) 7.8 · 27: pedido asignado al chofer con el cierre enviado (dos celulares y nube de prueba) · basado en l61: 30 saldos con sumas y restas (dos celulares, uno sin señal, con una nube de prueba que se porta como Firestore)
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
let r=await A.evaluate(()=>{S.chofHoy=2;S.role='admin';var c=S.cli.find(x=>!x.oculto&&+x.chofer!==1);S.rt81={dia:'hoy',sel:{}};S.rt81.sel[c.id+'|'+(c.chofer||0)]=1;aplica81(1,'dia');nbEmpuja();return {cid:c.id,ops:ops81(1).length}});
ok(r.ops===1,'el admin pasa un cliente al chofer 1 (solo hoy)',r);
await A.waitForTimeout(300);await B.evaluate(()=>__pull());await B.waitForTimeout(200);await B.evaluate(()=>{S.chofHoy=1;render()});await B.waitForTimeout(300);
let t=await B.evaluate(cid=>({en:S.stops.some(s=>+s.c===cid&&!s.done),pend:ops81(1).length}),r.cid);ok(t.en&&t.pend===0,'el celular del chofer lo recibe por la nube y lo mete a su ruta',t);
await B.evaluate(()=>nbEmpuja());await B.waitForTimeout(300);await A.evaluate(()=>__pull());await A.waitForTimeout(200);
t=await A.evaluate(cid=>({ops:ops81(1).length,ve:lista81(1,hoy81()).L.some(x=>x.c===cid)}),r.cid);ok(t.ops===0&&t.ve,'el admin ve que ya lo tiene en su ruta',t);
ok(errs.length===0,'sin errores',errs);
console.log(nOK+' OK · '+nF+' FAIL');await b.close()})();
