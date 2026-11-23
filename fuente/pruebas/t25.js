/* 25 · avisos al administrador aunque no abra la app: la app deja el resumen (av/plan) y la función de la nube (functions/avisos25.js)
   lee los datos con el mismo formato de la nube y arma los avisos a cada hora. */
const {chromium}=require('playwright');const A=require('../../functions/avisos25.js');let nOK=0,nF=0;const ok=(c,m,x)=>{c?nOK++:nF++;console.log((c?'OK   ':'FAIL ')+m+(x!==undefined?' '+JSON.stringify(x).slice(0,400):''))};
(async()=>{const b=await chromium.launch();const errs=[];
const p=await (await b.newContext({viewport:{width:412,height:900}})).newPage();p.on('pageerror',e=>errs.push(e.message));
await p.addInitScript(()=>{window.__pnTest=1;window.__hora93=9});await p.goto('file:///mnt/user-data/outputs/platanos-primera-vez.html');await p.waitForTimeout(1100);const ev=(f,a)=>p.evaluate(f,a);
const datos=()=>ev(()=>{var docs={};nbUnidades().forEach(u=>{if(!/^s~(precio|madL)$|^r~/.test(u.id))return;var v;try{v=u.get()}catch(e){return}var F=nbCodifica(u,v);if(!F)return;var d={k:F.k};Object.keys(F).forEach(f=>{if(f==='k')return;if(f==='r'){d.r=F.r;return}var s=f[0],x=f.slice(2);(d[s]=d[s]||{})[x===''&&s==='c'?'_':x]=F[f]});docs[u.id]=d});return {plan:av25Plan(),docs,hoy:iso(TODAY)}});
const corre=(D,h)=>A.armaAvisos(D.plan,{f:D.hoy,h,m:5},async id=>D.docs[id]?A.decodifica(D.docs[id]):undefined);
await ev(()=>{var bv=document.getElementById('bienv');if(bv)bv.remove();if(S.setup&&!S.setup.fin){var U=S.setup;U.veh=[{n:'Camioneta Uno',pl:'AAA1',plEdo:'Baja California',comb:'Gasolina',img:0,odo:1000},{n:'Camioneta Dos',pl:'BBB2',plEdo:'Baja California',comb:'Gasolina',img:0,odo:2000}];U.per=[{n:'Danu Pérez',puesto:'chofer',tel:'1'},{n:'Beto',puesto:'chofer',tel:'2'}];U.cli=[{n:'Benavides',a:'x',tel:'1',dias:[0,1,2,3,4,5,6],cred:0,vac:0,ch:'0'},{n:'Don Beto',a:'y',tel:'2',dias:[0,1,2,3,4,5,6],cred:0,vac:0,ch:'0'},{n:'Fruber',a:'z',tel:'3',dias:[0,1,2,3,4,5,6],cred:0,vac:0,ch:'1'}];U.prov=[];S.precio.R=275;S.precio.M=20;suAplicar();_pin.modo=null}
 S.role='admin';S.encOn=false;S.tutVisto={rep:true,admin:true};S.chofHoy=null;S.chSt={};var L=chs81().filter(c=>esCh(c)&&!esAdm(c));window.D1=+L[0].id;window.D2=+L[1].id;S.cli.forEach((c,i)=>{c.chofer=i<2?D1:D2;c.dias=[0,1,2,3,4,5,6]});S.precio.conf='2026-01-01';S.inv.maduras=6;S.madL=[{p:'R',q:6,dia:iso(new Date(TODAY.getTime()-2*864e5))}];S.cfg.vN=3;S.cfg.vC=3;S.cfg.vF=3;render()});
let D=await datos();
ok(D.plan.tz&&D.plan.dias[D.hoy]&&D.plan.dias[D.hoy][await ev(()=>D1)].k===2&&D.plan.dias[D.hoy][await ev(()=>D2)].k===1&&D.plan.dias[D.hoy][await ev(()=>D1)].n==='Danu',' la app arma el resumen: quién tiene cuántos clientes hoy (y 7 días), zona horaria',D.plan.dias[D.hoy]);
let r=await corre(D,8);
ok(r.some(m=>/Fija el precio de hoy/.test(m[0])&&/\$275/.test(m[1])),' 8:00 · precio de hoy sin fijar',r);
ok(r.some(m=>/Fruta madura/.test(m[0])&&/6 cajas de roatán maduro se pasan mañana/.test(m[1])),' 8:00 · fruta madura que se pasa mañana',r);
r=await corre(D,9);ok(r.length===1&&/2 choferes no han iniciado/.test(r[0][0])&&/Danu: 2 clientes/.test(r[0][1])&&/Beto: 1 cliente hoy/.test(r[0][1]),' 9:00 · choferes sin iniciar su ruta',r);
/* Danu sale y entrega a 1 de 2; el precio se fija */
await ev(()=>{var o=chNuevo(D1);o.rutaDia80=iso(TODAY);o.salida.ok=true;o.salida.f7=iso(TODAY);o.stops[0].done=true;S.chSt[D1]=o;S.precio.conf=iso(TODAY);S.madL=[];render()});D=await datos();
r=await corre(D,8);ok(r.length===0,' 8:00 · con el precio fijado y sin fruta por pasarse no avisa nada',r);
r=await corre(D,10);ok(r.length===1&&/Beto no ha iniciado su ruta/.test(r[0][0]),' 10:00 · solo avisa del que sigue sin iniciar',r);
r=await corre(D,14);ok(r.length===1&&/Danu lleva 1 de 2/.test(r[0][1])&&/Beto no ha iniciado \(1 clientes\)/.test(r[0][1]),' 14:00 · cómo van las entregas',r);
r=await corre(D,21);ok(r.some(m=>/Cierre sin mandar/.test(m[0])&&/Danu no ha mandado/.test(m[1])),' 21:00 · cierre sin mandar',r);
await ev(()=>{var o=S.chSt[D1];o.stops.forEach(s=>s.done=true);o.cierre.sent=true;o.cierre.res={efectivo:1};o.cierreReg=null;render()});D=await datos();
r=await corre(D,21);ok(r.some(m=>/Cierre sin recibir/.test(m[0])&&/Danu/.test(m[1]))&&!r.some(m=>/sin mandar/.test(m[0])),' 21:00 · cierre sin recibir',r);
r=await corre(D,11);ok(r.length===0,' a otras horas no avisa',r);
/* una sola vez por hora: la nube falsa */
const mem={};const db={doc:p=>({get:async()=>({exists:mem[p]!==undefined,data:()=>mem[p]}),set:async v=>{mem[p]=v}}),collection:p=>({add:async v=>{(mem[p]=mem[p]||[]).push(v)}})};
mem['n/x/av/plan']=D.plan;Object.keys(D.docs).forEach(k=>mem['n/x/d/'+k]=D.docs[k]);
const cuando=new Date(D.hoy+'T21:05:00');const tz=Intl.DateTimeFormat().resolvedOptions().timeZone;mem['n/x/av/plan'].tz=tz;
let n1=await A.avisosDeNegocio(db,'x',cuando),n2=await A.avisosDeNegocio(db,'x',cuando);
ok(n1>=1&&n2===0&&(mem['n/x/push']||[]).length===n1&&mem['n/x/push'][0].ch==='admins'&&mem['n/x/push'][0].tipo==='aviso',' cada aviso se manda UNA vez, a todos los administradores',{n1,n2,push:mem['n/x/push']});
/* la regla de la nube deja escribir justo esos campos */
ok(Object.keys(Object.assign({t:1},D.plan)).every(k=>['v','tz','vida','dias','sinCh','t'].indexOf(k)>-1),' el resumen solo trae los campos que permite la regla',Object.keys(D.plan));
/* sube a la nube solo si cambió */
r=await ev(async()=>{var w=[];var NB0={on:NB.on,listo:NB.listo,ad:NB.ad};NB.on=true;NB.listo=true;NB.ad={set:(p,o)=>{w.push(p);return Promise.resolve()}};AV25.t=0;AV25.h='';av25Sube();await new Promise(r=>setTimeout(r,20));AV25.t=0;av25Sube();await new Promise(r=>setTimeout(r,20));NB.on=NB0.on;NB.listo=NB0.listo;NB.ad=NB0.ad;return w});
ok(r.length===1&&/av\/plan$/.test(r[0]),' la app sube el resumen a n/{neg}/av/plan y no lo repite si no cambió',r);
ok(!errs.length,'sin errores',errs);console.log(nOK+' OK · '+nF+' FAIL');await b.close()})();
