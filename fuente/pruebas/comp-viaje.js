/* Migración · tema "Viaje de carga al proveedor": compara la app de ANTES con la NUEVA (mismos casos = idéntico).
   Uso: node comp-viaje.js ANTES.html NUEVO.html   (se corre con la demo y con la real)
   Casos: cada viaje de la demo en cada uno de sus pasos (como admin y como chofer), su panel de lado (combustible, gasto,
   problema, cerrar), la burbuja, el mapa, los tramos, las básculas y la configuración de cada fruta; las fichas de cada
   proveedor y de cada carga en todas sus pestañas; recargar, lo que pide el proveedor y la sugerencia de cuánto cargar.
   En la versión real (sin viajes) se revisa lo que existe vacío y un viaje nuevo en sus primeros pasos. */
const {chromium}=require('playwright');
async function corre(b,url){const p=await (await b.newContext({viewport:{width:390,height:844}})).newPage();const errs=[];p.on('pageerror',e=>errs.push(String(e)));p.on('dialog',d=>d.accept());
 await p.addInitScript(()=>{window.__pnTest=1;window.__hora93=12;Math.random=(function(){var x=7;return function(){x=(x*16807)%2147483647;return (x-1)/2147483646}})();Date.now=(function(){var t=1794979200000;return function(){return t+=1000}})()});
 await p.goto('file://'+url);await p.waitForTimeout(1000);
 const out=await p.evaluate(()=>{var out={};var T=function(k,f){try{out[k]=f()}catch(e){out[k]='ERR '+e.message}};
  var limpio=function(t){return String(t||'').replace(/\d{1,2}:\d\d(:\d\d)?/g,'HH:MM')};
  var plano=function(h){if(h==null)return '(null)';if(typeof h!=='string')return limpio(JSON.stringify(h));var d=document.createElement('div');d.innerHTML=h||'';return limpio(d.innerText)+' |#'+d.querySelectorAll('[data-act],[data-bind],input').length};
  var J=function(x){return limpio(JSON.stringify(x===undefined?'(undef)':x,function(k,v){return typeof v==='function'?'(fn)':v}))};
  if(window.PN_MODO==='vacio'){var U=S.setup;U.veh=[{n:'Camioneta Uno',pl:'AAA1',plEdo:'Baja California',comb:'Gasolina',img:0,odo:1000}];U.per=[{n:'Chofer Uno',puesto:'chofer',tel:'1'},{n:'Bodeguero',puesto:'bodega',tel:'2'}];
   U.cli=[{n:'Cliente Uno',a:'x',tel:'6640000001',dias:[0,1,2,3,4,5,6],cred:0,vac:0,ch:'0'}];U.prov=[{n:'Proveedor Uno',tel:'3'}];S.precio.R=275;S.precio.M=20;suAplicar()}
  S.tutVisto={rep:true,admin:true};S.role='admin';S.pinOk[pinKey()]=true;
  /* tarjetas sueltas */
  T('recarga',function(){return plano(recargaCard())});T('provPide',function(){return plano(provPideHTML())});
  T('sugCarga',function(){return J(sugCarga())});T('sugCargaHTML',function(){return plano(sugCargaHTML())});T('pend',function(){return J(vwPend())});
  /* fichas de proveedores y cargas */
  var TABS=['dat','his','cre','pag','gas','res','cta','mas','det','car','prov'];
  var provs=[];(S.cargas||[]).forEach(function(c){if(c&&c.prov&&provs.indexOf(c.prov)<0)provs.push(c.prov)});(S.provs||[]).forEach(function(x){var n=x&&(x.n||x);if(n&&provs.indexOf(n)<0)provs.push(n)});
  provs.slice(0,6).forEach(function(n){TABS.forEach(function(tb){S.fiTab['prov:'+n]=tb;T('prov·'+n+'·'+tb,function(){return plano(fiProv({t:'prov',key:'openProv',id:n}))})})});
  (S.cargas||[]).slice(-6).forEach(function(c){TABS.forEach(function(tb){S.fiTab['carga:'+c.id]=tb;T('carga·'+c.id+'·'+tb,function(){return plano(fiCarga({t:'carga',key:'openCarga',id:c.id}))})})});
  /* viajes: cada paso como admin y como chofer */
  var viaje=function(v,et){[['admin',null],['rep',v.quien]].forEach(function(r){S.role=r[0];if(r[1]!=null)S.chofHoy=r[1];S.pinOk[pinKey()]=true;S.vw=v;var k0=v.k,L=[];try{L=vwSteps()}catch(e){}
    T(et+'·'+r[0]+'·pasos',function(){return J(L)});
    L.forEach(function(k){v.k=k;T(et+'·'+r[0]+'·'+k,function(){return plano(vwBody(k))});T(et+'·'+r[0]+'·tramo·'+k,function(){return plano(vwTramoHTML(k))})});v.k=k0;
    ['comb','gasto','prob','cerr'].forEach(function(sd){T(et+'·'+r[0]+'·lado·'+sd,function(){return plano(vwSideHTML(sd))})});
    T(et+'·'+r[0]+'·burbuja',function(){return plano(vwBurbuja())});
    T(et+'·'+r[0]+'·nodos',function(){return J(vwNodos(v))});T(et+'·'+r[0]+'·pos',function(){return J(vwPos(v))});
    T(et+'·'+r[0]+'·mapa',function(){return String(vwMapa(v))+'|'+String(vwMapa(v,true))});
    (v.par||[]).forEach(function(p,ix){T(et+'·'+r[0]+'·basc'+ix,function(){return J(vwBasc(p))});T(et+'·'+r[0]+'·parcfg'+ix,function(){return plano(vwParCfg(p,ix))})});
    T(et+'·'+r[0]+'·foto',function(){return plano(vwFotoUna('ftSal','Foto del medidor'))})});S.vw=null;S.role='admin'};
  (S.vws||[]).slice(0,6).forEach(function(v,i){viaje(v,'vw'+i)});
  /* un viaje nuevo */
  T('nuevo',function(){S.role='admin';try{vwNuevo()}catch(e){try{act('vwnuevo')}catch(e2){}}return J(S.vw&&{k:S.vw.k,quien:S.vw.quien})});
  if(S.vw&&S.vw.k!=null)viaje(S.vw,'nuevo');
  /* pantallas completas */
  S.role='admin';S.vw=null;S.tab.admin='inicio';render();T('inicio',function(){return limpio(document.querySelector('main').innerText)});
  S.tab.admin='cargas';render();T('cargas',function(){return limpio(document.querySelector('main').innerText)});
  return out});
 await p.close();return {out,errs}}
(async()=>{const [A,N]=process.argv.slice(2);const b=await chromium.launch();const a=await corre(b,A),n=await corre(b,N);await b.close();
 const K=[...new Set(Object.keys(a.out).concat(Object.keys(n.out)))];let dif=0,err=0;
 for(const k of K){const x=JSON.stringify(a.out[k]),y=JSON.stringify(n.out[k]);if(/^"ERR/.test(y))err++;if(x!==y){dif++;if(dif<=8)console.log('DIF',k,'\n antes:',String(x).slice(0,300),'\n nuevo:',String(y).slice(0,300))}}
 console.log(K.length+' casos · '+dif+' diferencias · casos con ERR '+err+' · errores antes '+a.errs.length+' / nuevo '+n.errs.length+(n.errs.length?' '+n.errs.slice(0,2).join(' | '):''));
 console.log(dif===0&&n.errs.length<=a.errs.length?'IDÉNTICO':'DISTINTO')})();
