const {chromium}=require('playwright');
/* 123 · CUATRO celulares a la vez (dos administradores y dos choferes): saldos del mismo cliente, inventario, varios cierres de cada chofer, gastos al mismo tiempo y la limpieza de 60 días en los dos administradores; al final todos tienen los mismos números · base t122nube/t94nube · 9.4 · el cierre de AYER mandado tarde no se pierde: se guarda aparte y el administrador lo recibe (dos celulares) · base t86nube · 8.6 · 67: chofer con la ruta del sábado sin cierre: mandar cierre, pedir que liberen y liberar, con dos celulares · (copiado de t78nube) 7.8 · 27: pedido asignado al chofer con el cierre enviado (dos celulares y nube de prueba) · basado en l61: 30 saldos con sumas y restas (dos celulares, uno sin señal, con una nube de prueba que se porta como Firestore)
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
/* como en la app real: un celular no sube nada hasta bajar primero lo de la nube (nbPrimera); solo el primero empieza la nube */
const cel=async(rol,primero)=>{const p=await b.newPage({viewport:{width:400,height:860}});p.on('pageerror',e=>errs.push(rol+': '+e.message));
 await p.exposeFunction('__srvSet',srvSet);await p.exposeFunction('__srvPull',srvPull);
 await p.addInitScript(()=>{window.__pnTest=1;if(window.__hora93==null)window.__hora93=12/* la prueba no depende de la hora: de 12 a 5 a.m. no se bloquea (93) */;window.__nbFast=1;window.__visto={};
  window.__fakeAd={set:(p,o,m)=>window.__srvSet(p,JSON.stringify(o),!!m),del:()=>({__del:1}),inc:n=>({__inc:n}),watch:()=>()=>{},get:()=>Promise.resolve(null),borrar:()=>Promise.resolve(),rango:()=>Promise.resolve([])};
  window.__pull=async(primera)=>{const L=JSON.parse(await window.__srvPull(nbP('d'),JSON.stringify(__visto)));L.forEach(x=>__visto[x.p]=x.v);if(L.length){nbAplica(L.map(x=>({id:x.id,data:x.data})),!!primera);render()}return L.length}});
 await p.goto('file:///mnt/user-data/outputs/prototipo-platanos.html');await p.waitForTimeout(700);
 await p.evaluate(([rol,primero])=>{NB.on=true;NB.listo=!!primero;NB.ad=__fakeAd;NB.perfil={rol:rol==='admin'?'admin':'chofer'};S.role=rol==='admin'?'admin':'rep';S.encOn=false;S.pinOk[pinKey()]=true;S.popVisto={admin:iso(TODAY)};localStorage.removeItem('salIni');render()},[rol,!!primero]);return p};
const A=await cel('admin',true);await A.evaluate(()=>{nbEmpuja()});await A.waitForTimeout(300);
const A2=await cel('admin');await A2.evaluate(()=>__pull(true));await A2.evaluate(()=>{NB.listo=true});await A2.waitForTimeout(200);
const B=await cel('rep');await B.evaluate(()=>{NB.perfil={rol:'chofer',chId:1}});await B.evaluate(()=>__pull(true));await B.evaluate(()=>{NB.listo=true});
const C=await cel('rep');await C.evaluate(()=>{NB.perfil={rol:'chofer',chId:3}});await C.evaluate(()=>__pull(true));await C.evaluate(()=>{NB.listo=true});await C.waitForTimeout(200);
const TODOS=[A,A2,B,C],sync=async()=>{for(const p of TODOS){await p.evaluate(()=>nbEmpuja())}await A.waitForTimeout(250);for(const p of TODOS){await p.evaluate(()=>__pull())}await A.waitForTimeout(250);for(const p of TODOS){await p.evaluate(()=>__pull())}await A.waitForTimeout(150)};
const cli0=await A.evaluate(()=>{var c=S.cli[0];return {id:c.id,cred:num(c.cred),vac:num(c.vac),inv:num(S.inv.vacias),caja:cajaEsp(),gastos:S.gastos.length}});
/* 1 · Danu y Rafa le fían al MISMO cliente y regresan taras, al mismo tiempo (ninguno ha visto lo del otro) */
await B.evaluate(id=>{var c=S.cli.filter(x=>x.id===id)[0];c.cred=num(c.cred)+500;c.vac=num(c.vac)+4;S.inv.vacias=num(S.inv.vacias)+5},cli0.id);
await C.evaluate(id=>{var c=S.cli.filter(x=>x.id===id)[0];c.cred=num(c.cred)+300;c.vac=num(c.vac)+2;S.inv.vacias=num(S.inv.vacias)+7},cli0.id);
await sync();
const R1=[];for(const p of TODOS)R1.push(await p.evaluate(([id])=>{var c=S.cli.filter(x=>x.id===id)[0];return {cred:num(c.cred),vac:num(c.vac),inv:num(S.inv.vacias)}},[cli0.id]));
ok(R1.every(x=>x.cred===cli0.cred+800&&x.vac===cli0.vac+6),'123 · el saldo del cliente suma lo de los DOS choferes en los 4 celulares (+$800 de crédito y +6 taras)',{antes:[cli0.cred,cli0.vac],ahora:R1.map(x=>[x.cred,x.vac])});
ok(R1.every(x=>x.inv===cli0.inv+12),'123 · el inventario suma lo de los dos choferes en los 4 celulares (+12 taras)',{antes:cli0.inv,ahora:R1.map(x=>x.inv)});
/* 2 · cada chofer hace 2 cierres recibidos y deja un 3º abierto (las entregas regresan las vacías que dejaron) */
const parte=(P,ch,L,rec,seguir)=>P.evaluate(([ch,L,rec,seguir])=>{S.chofHoy=ch;S.role='rep';S.pinOk[pinKey()]=true;S.salida.ok=true;S.rutaDia80=iso(TODAY);S.log=L.map(function(x,i){return {c:S.cli[i+1].id,R:x[0],M:0,V:0,Vr:0,total:x[0]*275,pago:x[1],abono:0,pr:275,pm:20}});
 if(rec!=null){S.cierre.res=cierreRes();S.cierre.sent=true;S.cierre.corte=corteDatos();S.cierreReg={rec:rec,f:null}}
 if(seguir){var b=document.createElement('button');b.dataset.act='seguir';b.dataset.k='';document.body.appendChild(b);b.click();b.remove()}return (S.rutasHist||[]).filter(function(e){return e.parcial120&&+e.ch===ch}).length},[ch,L,rec,seguir]);
await parte(B,1,[[4,1100]],1100,true);await parte(C,3,[[6,1650]],1650,true);await parte(B,1,[[8,2200]],2200,true);await parte(C,3,[[2,550]],550,true);await parte(B,1,[[1,275]],null,false);await parte(C,3,[[3,825]],null,false);
/* 3 · los dos administradores registran un gasto al mismo tiempo */
await A.evaluate(()=>{S.role='admin';S.gastos.push({t:'Otro',m:100,n:'escoba',f:iso(TODAY)})});await A2.evaluate(()=>{S.role='admin';S.gastos.push({t:'Otro',m:200,n:'cubeta',f:iso(TODAY)})});
await sync();
const ver=P=>P.evaluate(([id])=>{var c=S.cli.filter(x=>x.id===id)[0],hoy=iso(TODAY),dia=rutasDia120(hoy);return {cred:num(c.cred),vac:num(c.vac),inv:num(S.inv.vacias),
 partes:(S.rutasHist||[]).filter(function(e){return e.parcial120&&e.f===hoy}).map(function(e){return e.ch+':'+e.n120+':'+(e.cierreReg82&&e.cierreReg82.rec)}).sort().join(','),
 dia:dia.map(function(x){return x.ch+':'+x.n+':'+cobPart120(x)}).sort().join(','),gas:S.gastos.filter(function(g){return g.f===hoy&&/escoba|cubeta/.test(g.n)}).map(function(g){return g.m}).sort().join(',')}},[cli0.id]);
const R4=[];for(const p of TODOS)R4.push(await ver(p));
ok(R4.every(x=>x.cred===R1[0].cred&&x.vac===R1[0].vac),'123 · después de los cierres, el saldo del cliente sigue igual en los 4 celulares',R4.map(x=>[x.cred,x.vac]));
ok(R4.every(x=>x.inv===R4[0].inv),'123 · y el inventario es el mismo en los 4 celulares',R4.map(x=>x.inv));
ok(R4.every(x=>x.partes==='1:1:1100,1:2:2200,3:1:1650,3:2:550'),'123 · los 4 celulares tienen los 2 cierres de Danu y los 2 de Rafa, completos',R4.map(x=>x.partes));
const ad=[R4[0],R4[1]];ok(ad.every(x=>/1:1:1100/.test(x.dia)&&/1:2:2200/.test(x.dia)&&/1:3:275/.test(x.dia)&&/3:1:1650/.test(x.dia)&&/3:2:550/.test(x.dia)&&/3:3:825/.test(x.dia)),'123 · los dos administradores ven los 3 cierres de cada chofer (2 recibidos y el abierto)',ad.map(x=>x.dia));
ok(R4.every(x=>x.gas==='100,200'),'123 · los gastos que los dos administradores guardaron al mismo tiempo están los dos en los 4 celulares',R4.map(x=>x.gas));
let cj=[await A.evaluate(()=>cajaEsp()),await A2.evaluate(()=>cajaEsp())];
ok(cj.every(x=>Math.abs(x-(cli0.caja+5500-300))<0.01),'123 · la caja de los dos administradores es igual y exacta (+$5,500 recibidos − $300 de gastos)',{antes:cli0.caja,A:cj[0],A2:cj[1]});
/* 4 · la limpieza de 60 días la hacen los DOS administradores el mismo día (sin verse): nada se cuenta doble */
await A.evaluate(()=>{var d=iso(new Date(TODAY.getTime()-70*864e5));S.rutasHist.push({f:d,ch:1,log:[{c:S.cli[1].id,R:3,M:0,total:825,pago:825,abono:0,pr:275,pm:20}],res:{total:825,efectivo:700,km:30},enviado:true,cierreReg82:{rec:700},recep82:null});S.gastos.push({t:'Otro',m:150,n:'viejo',f:d})});
await sync();cj=[await A.evaluate(()=>cajaEsp()),await A2.evaluate(()=>cajaEsp())];
await A.evaluate(()=>{S._ret122=null;S.role='admin';ret122()});await A2.evaluate(()=>{S._ret122=null;S.role='admin';ret122()});await sync();
const R5=[];for(const p of [A,A2])R5.push(await p.evaluate(()=>{var d=iso(new Date(TODAY.getTime()-70*864e5));return {caja:cajaEsp(),arrG:S.gastos.filter(g=>g.arr122).length,arrR:S.rutasHist.filter(e=>e.arr122).length,viejos:S.rutasHist.filter(e=>e.f===d).length+S.gastos.filter(g=>g.f===d).length,res:!!(S.resDia&&S.resDia[d])}}));
ok(R5.every((x,i)=>Math.abs(x.caja-cj[i])<0.01)&&Math.abs(R5[0].caja-R5[1].caja)<0.01,'123 · después de la limpieza en los DOS administradores la caja no cambia ni un centavo y es igual en los dos',{antes:cj,despues:R5.map(x=>x.caja)});
ok(R5.every(x=>x.arrG===1&&x.arrR===1&&x.viejos===0&&x.res),'123 · y queda UN solo arrastre por lista (no se duplica) y el resumen del día viejo',R5);
const R6=[];for(const p of TODOS)R6.push(await ver(p));ok(R6.every(x=>JSON.stringify([x.cred,x.vac,x.inv,x.partes,x.gas])===JSON.stringify([R6[0].cred,R6[0].vac,R6[0].inv,R6[0].partes,R6[0].gas])),'123 · al final los 4 celulares tienen exactamente los mismos números',R6.map(x=>[x.cred,x.vac,x.inv]));
ok(!errs.length,'sin errores de página',errs.slice(0,3));
console.log(nOK+' OK · '+nF+' FAIL');await b.close()})();
