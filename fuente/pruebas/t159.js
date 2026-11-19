/* 159 · Cada salida del chofer carga lo suyo (fruta, gasolina y desgaste por sus km, comisión); lo fijo del día (sueldo, gastos de la ruta que
   no son gasolina) se cubre en orden: primero la salida 1 y lo que falte pasa a la siguiente. La suma de las salidas = el neto del chofer. */
const {chromium}=require('playwright');let nOK=0,nF=0;const ok=(c,m,x)=>{c?nOK++:nF++;console.log((c?'OK   ':'FAIL ')+m+(x!==undefined?' '+JSON.stringify(x).slice(0,500):''))};
const r2=x=>Math.round(x*100)/100;
(async()=>{const b=await chromium.launch();const p=await (await b.newContext({viewport:{width:390,height:844}})).newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));p.on('dialog',d=>d.accept());await p.addInitScript(()=>{window.__pnTest=1;window.__hora93=12});
await p.goto('file:///mnt/user-data/outputs/platanos-primera-vez.html');await p.waitForTimeout(900);const ev=(f,a)=>p.evaluate(f,a);let r;
const inicio=()=>ev(()=>{var U=S.setup;U.veh=[{n:'Camioneta Uno',pl:'AAA1',plEdo:'Baja California',comb:'Gasolina',img:0,odo:1000}];U.per=[{n:'Danu',puesto:'chofer',tel:'1'}];U.cli=[{n:'Doña Mary',a:'x',tel:'6640000001',dias:[0,1,2,3,4,5,6],cred:0,vac:0,ch:'0'}];U.prov=[];S.precio.R=275;S.precio.M=20;suAplicar();
 var D=S.choferes.filter(c=>c.n==='Danu')[0];window.__D=D.id;D.ing='2026-01-05';D.sz={tipo:'base',monto:'',porDia:'',base:'1500',comC:'5',comK:'0.5',dias:0,cv:0,kv:0};
 S.cargas.push({id:S.nextCarga++,fecha:iso(TODAY),prov:'Roly',kgR:2000,pR:10,cajas:100,kgM:0,pM:0,t:{diesel:0,comida:0,casetas:0,extra:0},extras:[],pag:0,est:'Recibida',vCaja:0,vKgM:0,mg:30,pagBase:0,trBase:0,otros:[],trMode:'kilos'});
 S.pinOk[pinKey()]=true;S.pinOk['c:'+D.id]=true;S.role='rep';S.chofHoy=D.id;chCambiar(D.id);S.vehHoy=S.veh[0].id;S.tab.rep='ruta';render();var bv=document.querySelector('[data-act="bienvgo"]');if(bv)bv.click();S.salida.ok=true;S.cierre.odoIni=1000;
 S.gastos.push({t:'Combustible de reparto',n:'Danu · Gasolina',m:300,f:iso(TODAY)})});
const parte=(odo,R,seguir)=>ev(([odo,R,seguir])=>{if(R)S.log.push({c:S.cli[0].id,R:R,M:0,pr:275,pm:20,total:R*275,pago:R*275,abono:0,h:'10:00'});S.salida.ok=true;S.cierre.odo=odo;S.cierre.res=cierreRes();S.cierre.sent=true;S.cierre.corte=corteDatos();S.cierreReg={rec:R*275,f:null};
 if(seguir){var b=document.createElement('button');b.dataset.act='seguir';b.dataset.k='';document.body.appendChild(b);b.click();b.remove()}},[odo,R,seguir]);
const cuadre=()=>ev(()=>{S.role='admin';var T=cuadreDia121(iso(TODAY)),o=T.ch[0];return {neto:o.neto,sueldo:o.sueldo,com:o.com,P:o.partes.map(x=>({n:x.n,km:x.km,gan:x.gan,comb:x.comb,desg:x.desg,com:x.com,fijo:x.fijo,neto:x.neto}))}});
await inicio();
/* salida 1: 20 cajas, 50 km · salida 2: 5 cajas, 20 km · salida 3: 2 cajas pero 80 km */
await parte(1050,20,true);await parte(1070,5,true);await parte(1150,2,false);
r=await cuadre();const [s1,s2,s3]=r.P;
ok(r.P.length===3&&Math.abs(r.P.reduce((a,x)=>a+x.neto,0)-r.neto)<0.005,'la suma de las 3 salidas es EXACTO el neto del chofer en el día',r);
ok(s1.gan===1500&&s2.gan===375&&s3.gan===150,'cada salida con la ganancia de SU fruta (20, 5 y 2 cajas a $275 que costaron $200)',r.P.map(x=>x.gan));
ok(s1.comb===100&&s2.comb===40&&s3.comb===160&&r2(s1.comb+s2.comb+s3.comb)===300,'la gasolina del día ($300) se reparte por los km de cada salida (50, 20 y 80 km)',r.P.map(x=>x.comb));
ok(s1.fijo===250&&s2.fijo===0&&s3.fijo===0,'el sueldo del día ($250) lo cubre la primera salida; las demás ya no lo cargan',r.P.map(x=>x.fijo));
ok(s2.neto>0&&s2.neto===r2(375-40-14-s2.com),'la salida de 5 cajas sale POSITIVA (solo carga su gasolina, desgaste y comisión)',s2);
ok(s3.neto<0&&s3.fijo===0,'la de 2 cajas a 80 km sale negativa solo por la gasolina y el desgaste (salió más caro ir)',s3);
r=await ev(()=>{S.tab.admin='cuadre121';S.cu121p='dia';S.cu121d=iso(TODAY);S.dOpen['cu121c'+window.__D]=true;render();return document.querySelector('main').innerText});
ok(/Lo que dejó esta salida/.test(r)&&/Gastos fijos del día/.test(r)&&/Salió más caro ir/.test(r),'en el Cuadre: "Lo que dejó esta salida", los gastos fijos solo en la que los cubrió y el aviso de la gasolina',(r.match(/Cierre 3[\s\S]{0,400}/)||[''])[0]);
/* si la primera salida no alcanza a cubrir lo fijo, lo que falta pasa a la siguiente */
r=await ev(()=>{location.reload();return 1});await p.waitForTimeout(1200);await inicio();
await parte(1010,1,true);await parte(1060,20,false);r=await cuadre();
ok(r.P[0].fijo===r2(Math.max(0,r.P[0].gan-r.P[0].comb-r.P[0].desg-r.P[0].com))&&r.P[0].neto===0&&r.P[1].fijo===r2(250-r.P[0].fijo)&&Math.abs(r.P[0].neto+r.P[1].neto-r.neto)<0.005,'si la salida 1 no alcanza, cubre lo que puede (queda en $0) y el resto lo cubre la salida 2',r.P);
ok(!errs.length,'sin errores',errs);console.log(nOK+' OK · '+nF+' FAIL');await b.close()})();
