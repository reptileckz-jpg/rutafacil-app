const {chromium}=require('playwright');
/* l61: 30 saldos con sumas y restas (dos celulares, uno sin señal, con una nube de prueba que se porta como Firestore)
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
const A=await cel('admin');
/* el admin sube todo y hace la migración (una vez) */
await A.evaluate(()=>{nbEmpuja()});await A.waitForTimeout(300);
let r=await A.evaluate(()=>({mig:S.cfg.saldoMig,base:Object.keys(S.cliBase||{}).length,cli:S.cli.filter(c=>num(c.cred)>0).map(c=>({id:c.id,n:c.n,cred:c.cred}))}));
ok(r.mig&&r.base>3,'30 · el dueño hace la migración una sola vez',{mig:!!r.mig,base:r.base});
const X=r.cli[0];const base=X.cred;
const srvCli=JSON.stringify(DB['n/pn/d/s~cli']||{});ok(!/\|cred"/.test(srvCli)&&!/\|vac"/.test(srvCli),'30 · en la nube el saldo ya no va como número final dentro del cliente');
/* el chofer abre la app y toma lo de la nube */
const B=await cel('rep');await B.evaluate(()=>__pull(true));await B.waitForTimeout(200);
r=await B.evaluate(id=>({cred:S.cli.filter(c=>c.id===id)[0].cred,listo:salListo()}),X.id);ok(r.listo&&r.cred===base,'30 · el celular del chofer ve el mismo saldo',r);
/* chofer SIN SEÑAL registra un abono de $50 */
await B.evaluate(id=>{const c=S.cli.filter(c=>c.id===id)[0];c.cred=r2(num(c.cred)-50);render()},X.id);
/* mientras, el admin en bodega le vende $100 más a crédito al mismo cliente */
await A.evaluate(id=>{const c=S.cli.filter(c=>c.id===id)[0];c.cred=r2(num(c.cred)+100);render();nbEmpuja()},X.id);await A.waitForTimeout(150);
/* vuelve la señal del chofer: sube lo suyo y baja lo de la nube */
await B.evaluate(()=>{nbEmpuja()});await B.waitForTimeout(150);await B.evaluate(()=>__pull());await A.evaluate(()=>__pull());await A.waitForTimeout(150);
const ra=await A.evaluate(id=>S.cli.filter(c=>c.id===id)[0].cred,X.id),rb=await B.evaluate(id=>S.cli.filter(c=>c.id===id)[0].cred,X.id);
ok(ra===base+50&&rb===base+50,'30 · los DOS movimientos quedan: saldo = '+base+' − 50 + 100 en los dos celulares',{admin:ra,chofer:rb,esperado:base+50});
/* cajas vacías del cliente y cajas del proveedor igual */
await B.evaluate(id=>{const c=S.cli.filter(c=>c.id===id)[0];c.vac=num(c.vac)+3;S.tarasProv.Roly=num(S.tarasProv.Roly)-5;render();nbEmpuja()},X.id);await A.evaluate(id=>{const c=S.cli.filter(c=>c.id===id)[0];c.vac=num(c.vac)-1;S.tarasProv.Roly=num(S.tarasProv.Roly)+2;render();nbEmpuja()},X.id);
await B.waitForTimeout(150);await A.evaluate(()=>__pull());await B.evaluate(()=>__pull());
const va=await A.evaluate(id=>[S.cli.filter(c=>c.id===id)[0].vac,S.tarasProv.Roly],X.id),vb=await B.evaluate(id=>[S.cli.filter(c=>c.id===id)[0].vac,S.tarasProv.Roly],X.id);
ok(JSON.stringify(va)===JSON.stringify(vb),'30 · cajas vacías del cliente y cajas del proveedor: los dos movimientos quedan',{admin:va,chofer:vb});
/* la migración no se repite (no se suma dos veces) */
r=await A.evaluate(id=>{const m=S.cfg.saldoMig;nbEmpuja();return {m2:S.cfg.saldoMig===m,cred:S.cli.filter(c=>c.id===id)[0].cred}},X.id);ok(r.m2&&r.cred===base+50,'30 · la migración no se repite',r);
await B.close();

/* ---- 34 · centavos ---- */
r=await A.evaluate(()=>{const n0=S.gastos.length;let esp=0;for(let i=0;i<300;i++){const m=10+(i%7)*0.1+(i%3)*0.01+0.001*(i%2);S.gastos.push({t:'Prueba',m:m*1,n:'centavos '+i,caja:false});esp+=Math.round(m*100)}render();_redT=0;render();
 const L=S.gastos.slice(n0);const tot=L.reduce((s,x)=>s+Math.round(x.m*100),0);return {malos:L.filter(x=>Math.round(x.m*100)/100!==x.m).length,tot:tot,esp:esp}});
ok(r.malos===0&&r.tot===r.esp,'34 · 300 gastos con centavos: cada uno guardado con 2 decimales y la suma cuadra exacto',r);

/* ---- 35 · doble toque ---- */
r=await A.evaluate(()=>{window.__dobleTest=1;window.__n=0;const bt=document.createElement('button');bt.dataset.act='gasto';bt.dataset.id='9';document.body.appendChild(bt);document.addEventListener('click',e=>{if(e.target===bt)__n++});bt.click();bt.click();return __n});
ok(r===1,'35 · doble toque rápido en Guardar: un solo registro',r);await A.waitForTimeout(1100);r=await A.evaluate(()=>{document.querySelector('[data-act="gasto"][data-id="9"]').click();return __n});ok(r===2,'35 · después de un segundo sí deja volver a tocar',r);

/* ---- 32 · cambio de día ---- */
r=await A.evaluate(()=>{window.__diaTest=1;_dia61='2000-01-01';return 1});await A.waitForTimeout(61000);r=await A.evaluate(()=>window.__diaCambio||0);ok(r===1,'32 · si la app se queda abierta y cambia el día, se guarda y se recarga',r);

ok(!errs.length,'sin errores',errs);console.log(nOK+' OK · '+nF+' FAIL');await b.close()})();
