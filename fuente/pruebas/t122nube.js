const {chromium}=require('playwright');
/* 122 · varios cierres el mismo día con DOS celulares y la nube: ninguno se pierde ni se mezcla (antes la nube guardaba uno por chofer por día) · base t94nube · 9.4 · el cierre de AYER mandado tarde no se pierde: se guarda aparte y el administrador lo recibe (dos celulares) · base t86nube · 8.6 · 67: chofer con la ruta del sábado sin cierre: mandar cierre, pedir que liberen y liberar, con dos celulares · (copiado de t78nube) 7.8 · 27: pedido asignado al chofer con el cierre enviado (dos celulares y nube de prueba) · basado en l61: 30 saldos con sumas y restas (dos celulares, uno sin señal, con una nube de prueba que se porta como Firestore)
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
 await p.addInitScript(()=>{window.__pnTest=1;if(window.__hora93==null)window.__hora93=12/* la prueba no depende de la hora: de 12 a 5 a.m. no se bloquea (93) */;window.__nbFast=1;window.__visto={};
  window.__fakeAd={set:(p,o,m)=>window.__srvSet(p,JSON.stringify(o),!!m),del:()=>({__del:1}),inc:n=>({__inc:n}),watch:()=>()=>{},get:()=>Promise.resolve(null),borrar:()=>Promise.resolve(),rango:()=>Promise.resolve([])};
  window.__pull=async(primera)=>{const L=JSON.parse(await window.__srvPull(nbP('d'),JSON.stringify(__visto)));L.forEach(x=>__visto[x.p]=x.v);if(L.length){nbAplica(L.map(x=>({id:x.id,data:x.data})),!!primera);render()}return L.length}});
 await p.goto('file:///mnt/user-data/outputs/prototipo-platanos.html');await p.waitForTimeout(700);
 await p.evaluate(rol=>{NB.on=true;NB.listo=true;NB.ad=__fakeAd;NB.perfil={rol:rol==='admin'?'admin':'chofer'};S.role=rol==='admin'?'admin':'rep';S.encOn=false;S.pinOk[pinKey()]=true;S.popVisto={admin:iso(TODAY)};localStorage.removeItem('salIni');render()},rol);return p};
const A=await cel('admin');await A.evaluate(()=>{nbEmpuja()});await A.waitForTimeout(300);
const caja0=await A.evaluate(()=>{S.role='admin';return cajaEsp()});
const B=await cel('rep');await B.evaluate(()=>{NB.perfil={rol:'chofer',chId:1}});await B.evaluate(()=>__pull(true));await B.waitForTimeout(200);
/* el chofer (Danu, id 1) hace 3 cierres hoy: 2 recibidos y "empezar otro"; el 3 abierto */
const parte=(L,rec,seguir)=>B.evaluate(([L,rec,seguir])=>{S.chofHoy=1;S.role='rep';S.pinOk[pinKey()]=true;S.salida.ok=true;S.rutaDia80=iso(TODAY);S.log=L.map(function(x,i){return {c:S.cli[i].id,R:x[0],M:0,total:x[0]*275,pago:x[1],abono:0,pr:275,pm:20}});
 if(rec!=null){S.cierre.res=cierreRes();S.cierre.sent=true;S.cierre.corte=corteDatos();S.cierreReg={rec:rec,f:null}}
 if(seguir){var b=document.createElement('button');b.dataset.act='seguir';b.dataset.k='';document.body.appendChild(b);b.click();b.remove()}nbEmpuja();return (S.rutasHist||[]).filter(function(e){return e.parcial120}).length},[L,rec,seguir]);
let r=await parte([[10,2750],[4,1100]],3850,true);await B.waitForTimeout(150);r=await parte([[2,550]],550,true);await B.waitForTimeout(150);r=await parte([[4,1100]],null,false);
ok(r===2,'el celular del chofer guarda sus cierres 1 y 2',r);await B.waitForTimeout(300);await A.evaluate(()=>__pull());await A.waitForTimeout(300);
r=await A.evaluate(()=>{S.role='admin';var hoy=iso(TODAY),P=(S.rutasHist||[]).filter(function(e){return e.parcial120&&+e.ch===1&&e.f===hoy}).map(function(e){return {n:e.n120,log:(e.log||[]).length,rec:e.cierreReg82&&e.cierreReg82.rec}}).sort(function(a,b){return a.n-b.n});
 return {P:P,dia:rutasDia120(hoy).filter(function(x){return x.ch===1}).map(function(x){return x.n+':'+cobPart120(x)}),ing:ingDia120(hoy).partes.filter(function(p){return p.ch===1}).map(function(p){return p.m})}});
ok(r.P.length===2&&r.P[0].n===1&&r.P[0].log===2&&r.P[0].rec===3850&&r.P[1].n===2&&r.P[1].log===1&&r.P[1].rec===550,'en el celular del ADMIN llegan los cierres 1 y 2 completos, cada uno con sus entregas y lo recibido',r.P);
ok(r.dia.join()==='1:3850,2:550,3:1100','y el día de Danu tiene sus 3 cierres ($3,850, $550 y $1,100 en ruta)',r.dia);
r=await A.evaluate(()=>cajaEsp());ok(Math.abs(r-caja0-4400)<0.01,'el efectivo en caja del ADMIN sube exactamente lo recibido de los cierres 1 y 2 ($4,400)',{antes:caja0,ahora:r});
/* cambio de día en el celular del chofer: su ruta final se guarda sin pisar los cierres anteriores */
r=await B.evaluate(()=>{var hoy=iso(TODAY);S.cierre.res=cierreRes();S.cierre.sent=true;S.cierre.corte=corteDatos();S.cierreReg={rec:1100,f:null};TODAY=new Date(TODAY.getTime()+864e5);try{rutaRenueva80()}catch(e){}try{cambioDeDia(hoy)}catch(e){}nbEmpuja();window.__AYER=hoy;return (S.rutasHist||[]).filter(function(e){return e.f===hoy&&+e.ch===1}).length});
await B.waitForTimeout(300);await A.evaluate(()=>{TODAY=new Date(TODAY.getTime()+864e5)});await A.evaluate(()=>__pull());await A.waitForTimeout(300);
r=await A.evaluate(()=>{var d=iso(new Date(TODAY.getTime()-864e5)),E=(S.rutasHist||[]).filter(function(e){return e.f===d&&+e.ch===1});return {n:E.length,partes:E.filter(function(e){return e.parcial120}).length,fin:E.filter(function(e){return !e.parcial120}).map(function(e){return (e.log||[]).length}),dia:rutasDia120(d).filter(function(x){return x.ch===1}).map(function(x){return x.n+':'+cobPart120(x)})}});
r.caja=await A.evaluate(()=>cajaEsp());
ok(Math.abs(r.caja-caja0-5500)<0.01,'y al día siguiente la caja del ADMIN tiene lo recibido de los 3 cierres ($5,500)',{antes:caja0,ahora:r.caja});
ok(r.partes===2&&r.fin.length===1&&r.fin[0]===1&&r.dia.join()==='1:3850,2:550,3:1100','al día siguiente, en el ADMIN siguen los 3 cierres de ayer sin mezclarse',r);
ok(!errs.length,'sin errores de página',errs.slice(0,3));
console.log(nOK+' OK · '+nF+' FAIL');await b.close()})();
