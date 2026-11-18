/* Migración · tema "Personal y cuentas de sueldo": compara la app de ANTES con la NUEVA (mismos casos = idéntico).
   Uso: node comp-sueldos.js ANTES.html NUEVO.html   (se corre con la demo y con la real)
   Casos: la cuenta del sueldo de cada empleado (szCalc) con cada tipo de sueldo (semana, por día, base con comisión por caja,
   por kilo y por porcentaje, ninguno), sin y con ruta de hoy, con ventas de mayoreo y con faltantes por descontar; su resumen
   y desglose; las pantallas de Sueldos y de Personal (con y sin ficha abierta) y las fichas como tarjetas. */
const {chromium}=require('playwright');
async function corre(b,url){const p=await (await b.newContext({viewport:{width:390,height:844}})).newPage();const errs=[];p.on('pageerror',e=>errs.push(String(e)));p.on('dialog',d=>d.accept());
 await p.addInitScript(()=>{window.__pnTest=1;window.__hora93=12;Math.random=(function(){var x=7;return function(){x=(x*16807)%2147483647;return (x-1)/2147483646}})();Date.now=(function(){var t=1794979200000;return function(){return t+=1000}})()});
 await p.goto('file://'+url);await p.waitForTimeout(1000);
 const out=await p.evaluate(()=>{var out={};var T=function(k,f){try{out[k]=f()}catch(e){out[k]='ERR '+e.message}};
  var limpio=function(t){return String(t||'').replace(/\d{1,2}:\d\d(:\d\d)?/g,'HH:MM')};
  var plano=function(h){if(h==null)return '(null)';var d=document.createElement('div');d.innerHTML=h||'';return limpio(d.innerText)+' |#'+d.querySelectorAll('[data-act],[data-bind],input').length};
  var J=function(x){return limpio(JSON.stringify(x===undefined?'(undef)':x))};
  if(window.PN_MODO==='vacio'){var U=S.setup;U.veh=[{n:'Camioneta Uno',pl:'AAA1',plEdo:'Baja California',comb:'Gasolina',img:0,odo:1000}];U.per=[{n:'Chofer Uno',puesto:'chofer',tel:'1'},{n:'Chofer Dos',puesto:'chofer',tel:'4'},{n:'Bodeguero',puesto:'bodega',tel:'2'}];
   U.cli=[{n:'Cliente Uno',a:'x',tel:'6640000001',dias:[0,1,2,3,4,5,6],cred:0,vac:0,ch:'0'}];U.prov=[{n:'Proveedor Uno',tel:'3'}];S.precio.R=275;S.precio.M=20;suAplicar()}
  S.tutVisto={rep:true,admin:true};S.role='admin';S.pinOk[pinKey()]=true;
  var TIPOS={semana:{tipo:'semana',monto:'2600',porDia:'',base:'',comC:'',comK:'',dias:3,cv:0,kv:0,comViaje:'250'},
   dia:{tipo:'dia',monto:'',porDia:'450.5',base:'',comC:'',comK:'',dias:4,cv:0,kv:0},
   base:{tipo:'base',monto:'',porDia:'',base:'1500',comC:'5',comK:'0.5',dias:2,cv:48,kv:260,comViaje:'250'},
   basePct:{tipo:'base',monto:'',porDia:'',base:'1200',comC:'',comK:'',comModo:'pct',comP:'3',dias:5,cv:30,kv:120},
   ninguno:{tipo:'ninguno',monto:'',porDia:'',base:'',comC:'',comK:'',dias:0,cv:0,kv:0}};
  var copia=function(o){return JSON.parse(JSON.stringify(o))};
  var cs=S.choferes.slice(0,6),guard={};cs.forEach(function(c){guard[c.id]=copia(c.sz||null)});
  var cuentas=function(et){cs.forEach(function(c){
   T(et+'·'+c.id+'·calc',function(){return J(szCalc(c))});T(et+'·'+c.id+'·res',function(){return plano(szRes(c))});T(et+'·'+c.id+'·desg',function(){return plano(szDesg(c))})})};
  cuentas('propio');
  Object.keys(TIPOS).forEach(function(t){cs.forEach(function(c){c.sz=copia(TIPOS[t])});cuentas(t)});
  /* con ruta de hoy (ventas de menudeo y mayoreo) y faltantes por descontar */
  var ch=cs.filter(function(c){return esCh(c)})[0];
  S.chofHoy=ch.id;S.salida.ok=true;S.log.push({c:S.cli[0].id,R:5,M:2,V:0,Vr:0,total:1540,pago:1540,abono:0,pr:300,pm:20});S.log.push({c:S.cli[0].id,R:10,M:0,V:0,Vr:0,total:2600,pago:2600,abono:0,pr:260,pm:0,may:1});
  S.faltantes=(S.faltantes||[]).concat([{ch:ch.id,m:120.5,desc:true,pend:true,fecha:iso(TODAY)},{ch:ch.id,m:80,desc:false,pend:true,fecha:iso(TODAY)}]);
  Object.keys(TIPOS).forEach(function(t){ch.sz=copia(TIPOS[t]);T('hoy·'+t+'·calc',function(){return J(szCalc(ch))});T('hoy·'+t+'·res',function(){return plano(szRes(ch))});T('hoy·'+t+'·desg',function(){return plano(szDesg(ch))})});
  cs.forEach(function(c){c.sz=copia(TIPOS.base)});ch.sz=copia(TIPOS.semana);
  /* pantallas */
  T('sueldos',function(){return plano(sueldos())});
  T('personal',function(){S.openCh=null;return plano(personal())});
  cs.forEach(function(c){T('personal·'+c.id,function(){S.openCh=c.id;var h=plano(personal());S.openCh=null;return h})});
  cs.forEach(function(c){T('ficha·'+c.id,function(){return plano(fichaHTML({t:'emp',key:'openCh',id:c.id}))})});
  S.cli.slice(0,3).forEach(function(c){T('fichaCli·'+c.id,function(){return plano(fichaHTML({t:'cli',key:'openCli',id:c.id}))})});
  (S.veh||[]).slice(0,2).forEach(function(v){T('fichaVeh·'+v.id,function(){return plano(fichaHTML({t:'veh',key:'vehOpen',id:v.id}))})});
  S.tab.admin='sueldos';render();T('pantalla·sueldos',function(){return limpio(document.querySelector('main').innerText)});
  S.tab.admin='personal';render();T('pantalla·personal',function(){return limpio(document.querySelector('main').innerText)});
  return out});
 await p.close();return {out,errs}}
(async()=>{const [A,N]=process.argv.slice(2);const b=await chromium.launch();const a=await corre(b,A),n=await corre(b,N);await b.close();
 const K=[...new Set(Object.keys(a.out).concat(Object.keys(n.out)))];let dif=0,err=0;
 for(const k of K){const x=JSON.stringify(a.out[k]),y=JSON.stringify(n.out[k]);if(/^"ERR/.test(y))err++;if(x!==y){dif++;if(dif<=8)console.log('DIF',k,'\n antes:',String(x).slice(0,300),'\n nuevo:',String(y).slice(0,300))}}
 console.log(K.length+' casos · '+dif+' diferencias · casos con ERR '+err+' · errores antes '+a.errs.length+' / nuevo '+n.errs.length+(n.errs.length?' '+n.errs.slice(0,2).join(' | '):''));
 console.log(dif===0&&n.errs.length<=a.errs.length?'IDÉNTICO':'DISTINTO')})();
