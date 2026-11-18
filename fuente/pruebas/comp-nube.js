/* Migración · tema "Nube: subir y bajar los datos": compara la app de ANTES con la NUEVA (mismos casos = idéntico).
   Uso: node comp-nube.js ANTES.html NUEVO.html   (se corre con la demo y con la real)
   Casos, con los datos de la app y como admin, chofer y encargado:
   - cada dato convertido para la nube (nbCodifica), de regreso (nbDocAPlano + nbArma) y el resultado en el celular;
   - todo lo que se sube (nbEmpuja) a una nube de prueba, y lo que pasa al bajarlo en un celular nuevo (nbPrimera);
   - el papel de cada quien (nbForzarRol), la pantalla de la nube (nbPantalla) y guardar en el celular (guardarYa).
   Lo de varios celulares de verdad lo cubren t61, t94nube, t122nube y t123nube. */
const {chromium}=require('playwright');
async function corre(b,url){const p=await (await b.newContext({viewport:{width:390,height:844}})).newPage();const errs=[];p.on('pageerror',e=>errs.push(String(e)));p.on('dialog',d=>d.accept());
 await p.addInitScript(()=>{window.__pnTest=1;window.__hora93=12;Math.random=(function(){var x=7;return function(){x=(x*16807)%2147483647;return (x-1)/2147483646}})();Date.now=(function(){var t=1794979200000;return function(){return t+=1000}})()});
 await p.goto('file://'+url);await p.waitForTimeout(1000);
 const out=await p.evaluate(()=>{var out={};var T=function(k,f){try{out[k]=f()}catch(e){out[k]='ERR '+e.message}};
  var J=function(x){return JSON.stringify(x===undefined?'(undef)':x,function(k,v){return typeof v==='function'?'(fn)':v})};
  if(window.PN_MODO==='vacio'){var U=S.setup;U.veh=[{n:'Camioneta Uno',pl:'AAA1',plEdo:'Baja California',comb:'Gasolina',img:0,odo:1000}];U.per=[{n:'Chofer Uno',puesto:'chofer',tel:'1'},{n:'Bodeguero',puesto:'bodega',tel:'2'}];
   U.cli=[{n:'Cliente Uno',a:'x',tel:'6640000001',dias:[0,1,2,3,4,5,6],cred:0,vac:0,ch:'0'},{n:'Cliente Dos',a:'y',tel:'6640000002',dias:[1,3],cred:900,vac:3,ch:'0'}];U.prov=[{n:'Proveedor Uno',tel:'3'}];S.precio.R=275;S.precio.M=20;suAplicar()}
  /* algunos datos de un día de trabajo (ventas, gastos, abonos, una ruta de otro chofer) */
  S.log.push({c:S.cli[0].id,R:5,M:0,V:0,Vr:0,total:1500,pago:1500,abono:0,pr:300,pm:0,id:'v1',cn:'x'});
  S.gastos=(S.gastos||[]).concat([{t:'Comida',m:85.5,f:iso(TODAY),id:'g1'}]);S.cobros=(S.cobros||[]).concat([{n:'Cliente',m:200,c:S.cli[0].id,f:iso(TODAY)}]);
  var doc=function(F){var d={};Object.keys(F||{}).forEach(function(x){var i=x.indexOf(':');if(i<0){d[x]=F[x];return}var s=x.slice(0,i);(d[s]=d[s]||{})[x.slice(i+1)]=F[x]});return d};
  var unidades=function(et){var L=nbUnidades();T(et+'·unidades',function(){return J(L.map(function(u){return u.id+(u.perm?'P':'')+(u.cont?'C':'')}))});
   L.forEach(function(u){var F=null;T(et+'·cod·'+u.id,function(){F=nbCodifica(u,u.get());return J(F)});
    if(F)T(et+'·arma·'+u.id,function(){var pl=nbDocAPlano(doc(F));return J({pl:pl,armado:nbArma(u,pl,u.get())})})})};
  var roles=[['admin',{rol:'admin'}],['rep',{rol:'chofer',ch:S.choferes.filter(function(c){return esCh(c)&&!esAdm(c)})[0].id}],['enc',{rol:'encargado',encHasta:Date.now()+864e5}]];
  roles.forEach(function(r){S.role=r[0]==='enc'?'admin':r[0];NB.perfil=r[1];unidades(r[0])});
  /* subir a una nube de prueba */
  var NUBE={},esc=[];var ad={set:function(path,obj,merge){esc.push(path);var o=NUBE[path]=merge&&NUBE[path]?NUBE[path]:{};Object.keys(obj||{}).forEach(function(k){o[k]=obj[k]});return Promise.resolve()},del:function(){return '__BORRA__'},inc:function(n){return {__inc:n}}};
  var sv={on:NB.on,listo:NB.listo,ad:NB.ad,user:NB.user};
  var ch0=S.chofHoy;roles.forEach(function(r){S.role=r[0]==='enc'?'admin':r[0];NB.perfil=r[1];S.chofHoy=r[0]==='rep'?r[1].ch:ch0;NB.on=true;NB.listo=true;NB.ad=ad;NB.user=NB.user||{uid:'u1'};esc=[];NUBE={};
   T('empuja·'+r[0],function(){var x=nbEmpuja();return J({r:x,esc:esc.slice().sort(),nube:NUBE})});
   T('rol·'+r[0],function(){var a=S.role;nbForzarRol();return J({antes:a,despues:S.role,enc:S.encOn})});
   T('pantalla·'+r[0],function(){var h=nbPantalla();var d=document.createElement('div');d.innerHTML=h||'';return d.innerText+' |#'+d.querySelectorAll('[data-act]').length})});
  /* bajar en un celular nuevo: lo que quedó en la nube se aplica sobre la app vacía */
  T('primera',function(){S.role='admin';NB.perfil={rol:'admin'};esc=[];NUBE={};nbEmpuja();var docs=Object.keys(NUBE).sort().map(function(k){return {id:k.split('/').pop(),data:function(){return NUBE[k]},exists:true}}),antes=J({cli:S.cli.length,log:S.log.length,gastos:S.gastos.length});
   var r=null;try{r=nbPrimera(docs)}catch(e){r='ERR '+e.message}return J({r:r,antes:antes,despues:{cli:S.cli.length,log:S.log.length,gastos:(S.gastos||[]).length,cobros:(S.cobros||[]).length}})});
  S.chofHoy=ch0;NB.on=sv.on;NB.listo=sv.listo;NB.ad=sv.ad;NB.user=sv.user;
  T('guardarYa',function(){var c=0,o=window.idbSet;window.idbSet=function(){c++;return o&&o.apply(this,arguments)};try{guardarYa()}finally{window.idbSet=o}window._noGuardar77=true;var c2=c;try{guardarYa()}finally{window._noGuardar77=false}return J({veces:c2})});
  T('estado',function(){return J({role:S.role,cli:S.cli.length,log:S.log.length,inv:S.inv})});
  return out});
 await p.close();return {out,errs}}
(async()=>{const [A,N]=process.argv.slice(2);const b=await chromium.launch();const a=await corre(b,A),n=await corre(b,N);await b.close();
 const K=[...new Set(Object.keys(a.out).concat(Object.keys(n.out)))];let dif=0,err=0;
 for(const k of K){const x=JSON.stringify(a.out[k]),y=JSON.stringify(n.out[k]);if(/^"ERR/.test(y))err++;if(x!==y){dif++;if(dif<=8)console.log('DIF',k,'\n antes:',String(x).slice(0,300),'\n nuevo:',String(y).slice(0,300))}}
 console.log(K.length+' casos · '+dif+' diferencias · casos con ERR '+err+' · errores antes '+a.errs.length+' / nuevo '+n.errs.length+(n.errs.length?' '+n.errs.slice(0,2).join(' | '):''));
 console.log(dif===0&&n.errs.length<=a.errs.length?'IDÉNTICO':'DISTINTO')})();
