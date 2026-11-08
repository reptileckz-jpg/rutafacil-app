// Dos celulares (admin y chofer) contra una "nube" falsa que imita a Firestore (fusión por campos, sumas, borrar campo, escuchas)
const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();let nOK=0,nF=0;const ok=(c,m,x)=>{c?nOK++:nF++;console.log((c?'OK   ':'FAIL ')+m+(x!==undefined?' '+JSON.stringify(x).slice(0,400):''))};
const DB=new Map(),USERS={},pages=[],W=ms=>new Promise(r=>setTimeout(r,ms));let uidN=1;
const clone=o=>o==null?o:JSON.parse(JSON.stringify(o));
function merge(t,o){for(const k of Object.keys(o)){const v=o[k];if(v&&v.__del)delete t[k];else if(v&&v.__inc!==undefined)t[k]=(typeof t[k]==='number'?t[k]:0)+v.__inc;else if(v&&typeof v==='object'&&!Array.isArray(v)){if(!t[k]||typeof t[k]!=='object')t[k]={};merge(t[k],v)}else t[k]=v}}
function strip(o){if(!o||typeof o!=='object')return o;const r=Array.isArray(o)?[]:{};for(const k of Object.keys(o)){const v=o[k];if(v&&v.__del)continue;if(v&&v.__inc!==undefined){r[k]=v.__inc;continue}r[k]=(v&&typeof v==='object')?strip(v):v}return r}
function col(path){return path.split('/').slice(0,-1).join('/')}
async function notify(path){const c=col(path),id=path.split('/').pop(),d=DB.get(path);for(const P of pages){if(P.offline)continue;for(const w of P.watch){if(w.col===c){await P.page.evaluate(([wid,docs])=>window.__fakeDeliver(wid,docs,false),[w.id,[{id,data:clone(d)||null,removed:!d}]]).catch(()=>{})}}}}
async function apply(op){if(op.t==='set'){let d=op.merge&&DB.has(op.path)?clone(DB.get(op.path)):{};if(op.merge)merge(d,op.obj);else d=strip(op.obj);DB.set(op.path,d);await notify(op.path)}}
async function mk(name){const page=await b.newPage({viewport:{width:390,height:844}});const P={name,page,watch:[],offline:false,queue:[],user:null};pages.push(P);
 await page.addInitScript(()=>{window.__pnTest=1;window.__nbFast=1;var cbs={},n=0,ucb=null;window.__fakeDeliver=function(wid,docs,cache){if(cbs[wid])cbs[wid](docs,cache)};window.__fakeUser=function(u){if(ucb)ucb(u)};
  window.__nubeAd={init:function(){},onUser:function(cb){ucb=cb;window.fakeNube('who').then(function(u){cb(u)})},login:function(e,p){return window.fakeNube('login',e,p)},crear:function(e,p){return window.fakeNube('crear',e,p)},crearOtro:function(e,p){return window.fakeNube('crearOtro',e,p)},salir:function(){return window.fakeNube('salir')},reset:function(){return Promise.resolve()},
   get:function(p){return window.fakeNube('get',p)},set:function(p,o,m){return window.fakeNube('set',p,o,m)},watch:function(p,cb){var id=++n;cbs[id]=cb;window.fakeNube('watch',p,id);return function(){delete cbs[id]}},del:function(){return {__del:1}},inc:function(x){return {__inc:x}},borrar:function(p){return window.fakeNube('set',p,null,false)},viejas:function(){return Promise.resolve([])}}});
 await page.exposeBinding('fakeNube',async(src,op,a1,a2,a3)=>{
  if(op==='who')return P.user;
  if(op==='login'){const u=USERS[a1];if(!u||u.pw!==a2)throw new Error('auth/invalid-credential');P.user={uid:u.uid,email:a1};setTimeout(()=>page.evaluate(u=>window.__fakeUser(u),P.user),10);return true}
  if(op==='crear'||op==='crearOtro'){if(USERS[a1])throw new Error('auth/email-already-in-use');const uid='u'+(uidN++);USERS[a1]={pw:a2,uid};if(op==='crear'){P.user={uid,email:a1};setTimeout(()=>page.evaluate(u=>window.__fakeUser(u),P.user),10)}return uid}
  if(op==='salir'){P.user=null;setTimeout(()=>page.evaluate(()=>window.__fakeUser(null)),10);return true}
  if(op==='get'){const d=DB.get(a1);return d?clone(d):null}
  if(op==='set'){const o={t:'set',path:a1,obj:a2,merge:a3};if(P.offline){P.queue.push(o);return new Promise(r=>P.flush.push(r))}await apply(o);return true}
  if(op==='watch'){const docs=[...DB.entries()].filter(([k])=>col(k)===a1).map(([k,v])=>({id:k.split('/').pop(),data:clone(v)}));setTimeout(async()=>{await page.evaluate(([w,d])=>window.__fakeDeliver(w,d,false),[a2,docs]).catch(()=>{});P.watch.push({col:a1,id:a2})},5);return true}});
 P.flush=[];await page.goto('file:///mnt/user-data/outputs/platanos-primera-vez.html');await W(700);return P}
async function online(P,on){P.offline=!on;if(on){const q=P.queue;P.queue=[];for(const o of q)await apply(o);P.flush.forEach(r=>r(true));P.flush=[];
 // al volver, recibe lo que cambió mientras no tenía señal
 for(const w of P.watch){const docs=[...DB.entries()].filter(([k])=>col(k)===w.col).map(([k,v])=>({id:k.split('/').pop(),data:clone(v)}));await P.page.evaluate(([wid,d])=>window.__fakeDeliver(wid,d,false),[w.id,docs])}}}
const ev=(P,f,a)=>P.page.evaluate(f,a),txt=P=>ev(P,()=>{var o=document.getElementById('nbov');return o?o.innerText:''});
const sinPin=P=>ev(P,()=>{S.pinOk=S.pinOk||{};S.pinOk[pinKey()]=true;_pin.modo=null;S.popVisto={admin:iso(TODAY),cont:iso(TODAY)};render()});
const errs=[];
// ---------- A: el dueño crea la cuenta del negocio
const A=await mk('admin');A.page.on('pageerror',e=>errs.push('A '+e.message));
ok(/Crear la cuenta del negocio/.test(await txt(A)),'sin sesión: pantalla de entrar con "Crear la cuenta del negocio"');
await ev(A,()=>document.querySelector('[data-nb="acrear"]').click());await W(100);
await A.page.fill('#nbn','Ricardo Nieto');await A.page.fill('#nbe','negocio@gmail.com');await A.page.fill('#nbp','secreta1');await A.page.fill('#nbp2','secreta1');
await ev(A,()=>document.querySelector('[data-nb="crear"]').click());await W(900);
let r=await ev(A,()=>({est:NB.est,perfil:NB.perfil,ov:!!document.getElementById('nbov'),setup:!!(S.setup&&!S.setup.fin)}));
ok(r.est==='listo'&&r.perfil&&r.perfil.rol==='admin'&&!r.ov,'cuenta del dueño creada y adentro',r);
ok(!!DB.get('meta/duenio'),'quedó registrado el dueño');
// termina la configuración inicial
await ev(A,()=>{suAplicar();S.inv.vacias=300;S.cajasT0=cajasDonde().tot-cajasMovTot();render()});await sinPin(A);await W(1500);
r={docs:[...DB.keys()].filter(k=>k.startsWith('n/pn/d/')).length,cli:!!DB.get('n/pn/d/s~cli'),ch:!!DB.get('n/pn/d/s~choferes')};ok(r.docs>20&&r.ch,'los datos subieron a la nube',r);
// ---------- A le da acceso al chofer
const chId=await ev(A,()=>S.choferes.filter(c=>!esAdm(c)&&esCh(c))[0].id);
await ev(A,()=>{S.role='admin';S.tab.admin='personal';S.openCh=null;render()});await W(300);
ok(await ev(A,()=>!!document.querySelector('[data-k="nbacc"]')),'Personal: tarjeta "Accesos a la app"');
await ev(A,id=>document.querySelector('[data-act="nbacc"][data-t="c"][data-ref="'+id+'"]').click(),chId);await W(200);
const cred=await ev(A,()=>({u:NB.nuevo.u,pw:NB.nuevo.pw}));await ev(A,()=>document.querySelector('[data-act="nbaccsi"]').click());await W(600);
r=await ev(A,()=>({listo:NB.nuevo&&NB.nuevo.listo,txt:document.querySelector('[data-k="nbacc"]').innerText}));ok(r.listo&&r.txt.indexOf(cred.pw)>-1,'acceso creado: muestra usuario y contraseña',cred);
await ev(A,()=>document.querySelector('[data-act="nbaccok"]').click());
// ---------- B: el chofer entra en su celular
const B=await mk('chofer');B.page.on('pageerror',e=>errs.push('B '+e.message));
ok(!/Crear la cuenta del negocio/.test(await txt(B)),'segundo celular: ya no ofrece crear la cuenta del negocio');
await B.page.fill('#nbu',cred.u);await B.page.fill('#nbp','mala');await ev(B,()=>document.querySelector('[data-nb="entrar"]').click());await W(400);
ok(/incorrectos/.test(await txt(B)),'contraseña mala: avisa');
await B.page.fill('#nbp',cred.pw);await ev(B,()=>document.querySelector('[data-nb="entrar"]').click());await W(1200);
r=await ev(B,()=>({est:NB.est,role:S.role,ch:S.chofHoy,setup:!!(S.setup&&!S.setup.fin),cli:S.cli.length,ch2:S.choferes.length}));
ok(r.est==='listo'&&r.role==='rep'&&+r.ch===+chId&&!r.setup,'chofer adentro: es chofer, su ruta, sin configuración inicial',r);
ok(await ev(B,()=>personasEntrar().every(x=>x.go.role==='rep')),'el chofer no puede cambiarse a administrador');
// ---------- clientes: el chofer da de alta uno, el admin lo ve
await sinPin(B);
await ev(B,()=>{S.salida.ok=true;S.inv.reparto=40;var id=S.nextCli++;S.cli.push({id:id,n:'Abarrotes Lupe',ap:'',a:'',vac:0,cred:0,f:7,km:1,min:5,tel:'2281234567',dias:[],chofer:+S.chofHoy,lim:1500,credOk:false,compras:0,tipo:'',recibe:'',lat:19.5,lng:-96.9});render()});await W(1500);
r=await ev(A,()=>S.cli.filter(c=>c.n==='Abarrotes Lupe').map(c=>({id:c.id,tel:c.tel})));ok(r.length===1&&r[0].id>=100000,'el admin ve el cliente nuevo (con id que no choca)',r);
// el admin cambia el límite y el chofer el teléfono del mismo cliente al mismo tiempo
const lid=r[0].id;
await ev(A,id=>{cl(id).limMan=2500;render()},lid);await ev(B,id=>{cl(id).recibe='Lupe';render()},lid);await W(1500);
r=[await ev(A,id=>[cl(id).limMan,cl(id).recibe],lid),await ev(B,id=>[cl(id).limMan,cl(id).recibe],lid)];ok(r[0][0]===2500&&r[0][1]==='Lupe'&&r[1][0]===2500&&r[1][1]==='Lupe','cambios al mismo tiempo en el mismo cliente: no se pisan',r);
// ---------- inventario: sumas desde los dos celulares, uno sin señal
await online(B,false);
await ev(A,()=>{S.inv.vacias+=5;render()});await ev(B,()=>{S.inv.vacias-=3;render()});await W(800);
await online(B,true);await W(1500);
r=[await ev(A,()=>S.inv.vacias),await ev(B,()=>S.inv.vacias)];ok(r[0]===302&&r[1]===302,'inventario: +5 en uno y −3 en el otro (sin señal) = 302 en los dos',r);
// la ruta del chofer: entregas que ve el admin, y su camión no se mezcla con el inventario
await ev(B,()=>{S.log.push({c:S.cli[0].id,R:3,M:0,pr:250,pm:0,total:750,pago:750,abono:0,V:0,Vr:0,h:'10:00'});S.inv.reparto-=3;render()});await W(1500);
r=await ev(A,id=>({log:(nbRGet(id,'log')||[]).length,invR:nbRGet(id,'invR')}),chId);ok(r&&r.log===1&&r.invR===37,'el admin ve la ruta del chofer en vivo',r);
r=await ev(A,id=>{var o=+S.chofHoy===+id;return {vac:S.inv.vacias,top:o}},chId);ok(r.vac===302,'el camión del chofer no cambia las cajas vacías de la bodega',r);
// ---------- fotos
const foto='data:image/jpeg;base64,'+'A'.repeat(6000);
await ev(B,([id,f])=>{cl(id).foto=f;render()},[lid,foto]);await W(1500);
r={doc:[...DB.keys()].some(k=>k.startsWith('n/pn/f/')),cli:JSON.stringify(DB.get('n/pn/d/s~cli')).indexOf('AAAAAAAAAA')<0};ok(r.doc&&r.cli,'la foto sube aparte (no dentro del cliente)',r);
r=await ev(A,id=>(cl(id).foto||'').length,lid);ok(r===foto.length,'el admin recibe la foto',r);
// ---------- el chofer sin señal sigue trabajando
await online(B,false);await ev(B,()=>{S.log.push({c:S.cli[0].id,R:2,M:0,pr:250,pm:0,total:500,pago:500,abono:0,V:0,Vr:0,h:'11:00'});S.inv.reparto-=2;render()});await W(600);
r=await ev(A,id=>(nbRGet(id,'log')||[]).length,chId);ok(r===1,'sin señal: el admin todavía no lo ve',r);
r=await ev(B,()=>document.getElementById('nbind')?1:nbEstadoTxt());ok(/por subir|Subiendo/.test(r),'el chofer ve "cambios por subir"',r);
await online(B,true);await W(1500);r=await ev(A,id=>(nbRGet(id,'log')||[]).length,chId);ok(r===2,'regresó la señal: se subió solo',r);
// ---------- quitar acceso
const uidB=await ev(B,()=>NB.user.uid);
await ev(A,()=>{render()});await W(200);await ev(A,u=>document.querySelector('[data-act="nbaccquita"][data-uid="'+u+'"]').click(),uidB);await W(400);
ok(DB.get('usuarios_app/'+uidB).activo===false,'quitar acceso: queda desactivado');
// ---------- contraseña nueva para el chofer (mismo usuario)
await ev(A,id=>document.querySelector('[data-act="nbacc"][data-t="c"][data-ref="'+id+'"]').click(),chId);await W(100);const cred2=await ev(A,()=>({u:NB.nuevo.u,pw:NB.nuevo.pw}));await ev(A,()=>document.querySelector('[data-act="nbaccsi"]').click());await W(600);
ok(cred2.u===cred.u&&DB.get('usuarios/'+cred.u).email!==undefined,'contraseña nueva: mismo usuario',cred2);
// un tercer celular entra con la contraseña nueva y ve todo
const C=await mk('chofer2');C.page.on('pageerror',e=>errs.push('C '+e.message));await C.page.fill('#nbu',cred2.u);await C.page.fill('#nbp',cred2.pw);await ev(C,()=>document.querySelector('[data-nb="entrar"]').click());await W(1200);
r=await ev(C,()=>({est:NB.est,log:S.log.length,inv:S.inv.vacias,lupe:S.cli.some(c=>c.n==='Abarrotes Lupe'),idB:NB.perfil.idBase}));ok(r.est==='listo'&&r.log===2&&r.inv===302&&r.lupe,'celular nuevo: baja todo (ruta, inventario, clientes)',r);

// ---------- cambio de día: lo hace el primer celular que abre, y una sola vez
await ev(A,()=>{S.diaNube='2026-01-01';render()});await W(1200);
C.watch=[];await C.page.reload();await W(900);r=await ev(C,()=>({est:NB.est,ov:document.getElementById('nbov')&&document.getElementById('nbov').innerText.slice(0,60)}));
if(r.est!=='listo'){console.log('C tras recargar',r)}
await W(1500);
r=await ev(C,()=>({dia:S.diaNube,log:S.log.length,hist:(S.rutasHist||[]).length,av:S.avPrecio.filter(x=>/no envió su cierre/.test(x)).length}));ok(r.dia!=='2026-01-01'&&r.log===2&&r.hist===1&&r.av===1,'día nuevo: la ruta sin cierre se guarda en el historial, sigue abierta y avisa',r);
await W(800);r=await ev(A,()=>({dia:S.diaNube,hist:(S.rutasHist||[]).length,av:S.avPrecio.filter(x=>/no envió su cierre/.test(x)).length}));ok(r.dia!=='2026-01-01'&&r.hist===1&&r.av===1,'el admin lo ve una sola vez (no se duplica)',r);
// el chofer cierra: la ruta se archiva con la misma clave (sin duplicar) y empieza vacía al día siguiente
await ev(C,()=>{S.cierre.sent=true;S.diaNube='2026-01-02';render()});await W(1200);console.log('DIA',JSON.stringify(DB.get('n/pn/d/s~diaNube')),JSON.stringify(DB.get('n/pn/d/r~'+chId+'~cierre')).slice(0,200));C.page.on('console',m=>{if(m.type()==='error')console.log('CERR',m.text())});C.watch=[];await C.page.reload();await W(2200);console.log('CST',JSON.stringify(await ev(C,()=>({dd:NB._dd,d:S.diaNube,sent:S.cierre&&S.cierre.sent,h:S.rutasHist}))).slice(0,300));
r=await ev(C,()=>({log:S.log.length,hist:(S.rutasHist||[]).length}));ok(r.log===0&&r.hist===2,'cierre enviado: al otro día la ruta empieza vacía',r);

// ---------- reabrir con permiso del admin (de un celular a otro)
await ev(C,()=>{S.pinOk[pinKey()]=true;_pin.modo=null;S.salida.ok=true;S.cierre.sent=true;S.cierre.res=cierreRes();S.tab.rep='ruta';render()});await W(800);
await ev(C,()=>{S.choferes.find(x=>x.id===+S.chofHoy).segPerm=true;render()});await W(800);
await ev(C,()=>{var b=document.querySelector('[data-act="seguir"][data-k="carga"]');if(b)b.click()});await W(1500);
r=await ev(A,()=>{S.role='admin';S.tab.admin='inicio';S.pinOk[pinKey()]=true;_pin.modo=null;render();return !!document.querySelector('[data-act="reabsi"]')});ok(r,'el admin ve "quiere seguir trabajando" con Autorizar');
await ev(A,()=>document.querySelector('[data-act="reabsi"]').click());await W(1800);
r=await ev(C,()=>({sent:S.cierre.sent,cx:!!S.cx}));ok(!r.sent&&r.cx,'autorizó en su celular: al chofer se le reabre y le sale "¿Cuánto cargaste?"',r);
// ubicación del chofer en el mapa del admin
await ev(C,()=>{S.gps={lat:19.6,lng:-96.9,t:Date.now(),acc:8};render()});await W(1500);
r=await ev(A,id=>{var g=nbRGet(id,'gps');return g&&g.lat},chId);ok(r===19.6,'la ubicación del chofer le llega al admin',r);
// varias bodegas: la bodega 2 viaja aparte y no se mezcla con la 1
await ev(A,()=>{S.bods=S.bods||[{id:1,n:'Bodega 1'}];if(!S.bods.some(b=>b.id===2))S.bods.push({id:2,n:'Bodega 2'});S.invB[2]={verdes:7,maduras:0,reparto:0,repartoKg:0,vacias:0,kgVerde:0,kgMaduro:0};S.lotesB[2]=[];render()});await W(1500);
const v1=await ev(C,()=>S.invB&&S.invB[1]?S.invB[1].verdes:S.inv.verdes);
await ev(A,()=>{S.bodSel=2;S.inv=S.invB[2];S.lotes=S.lotesB[2];S.inv.verdes+=5;render()});await W(1800);
r=await ev(C,()=>({b2:S.invB&&S.invB[2]&&S.invB[2].verdes,b1:S.inv.verdes}));ok(r.b2===12&&r.b1===v1,'varias bodegas: lo de la bodega 2 llega aparte y no toca la bodega 1',[r,v1]);
r=await ev(A,()=>({b1:S.invB[1].verdes,sel:S.inv.verdes}));ok(r.b1===v1&&r.sel===12,'el admin sigue viendo su bodega 2 y la 1 intacta',r);
ok(!errs.length,'sin errores',errs);console.log(nOK+' OK · '+nF+' FAIL');await b.close()})();
