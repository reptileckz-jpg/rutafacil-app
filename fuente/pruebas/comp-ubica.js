/* Migración · tema "Ubicaciones y mapas": compara la app de ANTES con la NUEVA (mismos casos = idéntico).
   Uso: node comp-ubica.js ANTES.html NUEVO.html   (se corre con la demo y con la real)
   Casos: la ventana para guardar el lugar (cliente, bodega, proveedor) en cada modo (GPS, foto, datos, actualizar) sin y con
   ubicación, y lo que queda guardado; corregir la ubicación en el mapa (cliente, bodega, proveedor, asistente) y lo guardado;
   lo que le falta a cada cliente; el mapa de choferes y clientes, el dibujo sin internet, el recorrido GPS de cada chofer;
   el aviso de ubicación en la entrega y las pantallas completas. */
const {chromium}=require('playwright');
async function corre(b,url){const p=await (await b.newContext({viewport:{width:390,height:844}})).newPage();const errs=[];p.on('pageerror',e=>errs.push(String(e)));p.on('dialog',d=>d.accept());
 await p.addInitScript(()=>{window.__pnTest=1;window.__hora93=12;Math.random=(function(){var x=7;return function(){x=(x*16807)%2147483647;return (x-1)/2147483646}})();Date.now=(function(){var t=1794979200000;return function(){return t+=1000}})()});
 await p.goto('file://'+url);await p.waitForTimeout(1000);
 const out=await p.evaluate(()=>{var out={};var T=function(k,f){try{out[k]=f()}catch(e){out[k]='ERR '+e.message}};
  var limpio=function(t){return String(t||'').replace(/\d{1,2}:\d\d(:\d\d)?/g,'HH:MM')};
  var plano=function(h){if(h==null)return '(null)';if(typeof h!=='string')return limpio(JSON.stringify(h));var d=document.createElement('div');d.innerHTML=h||'';return limpio(d.innerText)+' |#'+d.querySelectorAll('[data-act],[data-bind],input').length};
  var J=function(x){return limpio(JSON.stringify(x===undefined?'(undef)':x,function(k,v){return typeof v==='function'?'(fn)':v}))};
  if(window.PN_MODO==='vacio'){var U=S.setup;U.veh=[{n:'Camioneta Uno',pl:'AAA1',plEdo:'Baja California',comb:'Gasolina',img:0,odo:1000}];U.per=[{n:'Chofer Uno',puesto:'chofer',tel:'1'},{n:'Bodeguero',puesto:'bodega',tel:'2'}];
   U.cli=[{n:'Cliente Uno',a:'x',tel:'6640000001',dias:[0,1,2,3,4,5,6],cred:0,vac:0,ch:'0'},{n:'Cliente Dos',a:'y',tel:'',dias:[1,3],cred:900,vac:3,ch:'0'}];U.prov=[{n:'Proveedor Uno',tel:'3'}];S.precio.R=275;S.precio.M=20;suAplicar()}
  S.tutVisto={rep:true,admin:true};
  var ch1=S.choferes.filter(function(c){return esCh(c)&&!esAdm(c)})[0];
  var cliente=S.cli[0],cli2=S.cli[1]||S.cli[0],bod=(S.bods||[])[0],prov=(S.cargas&&S.cargas[0]&&S.cargas[0].prov)||'Proveedor Uno';
  S.cli.slice(0,8).forEach(function(c){T('falta·'+c.id,function(){return J(ubCliFalta(c))})});
  /* 1 · guardar el lugar */
  var R=[['cli',{k:'cli',id:cliente.id,n:cliente.n,obj:cliente}],['cli2',{k:'cli',id:cli2.id,n:cli2.n,obj:cli2}]];if(bod)R.push(['bod',{k:'bod',id:bod.id,bid:bod.id,n:bod.n,obj:bod}]);R.push(['prov',{k:'prov',id:prov,n:prov,obj:provD(prov)}]);
  [['admin',null],['rep',ch1.id]].forEach(function(ro){S.role=ro[0];if(ro[1]!=null)S.chofHoy=ro[1];S.pinOk[pinKey()]=true;
   R.forEach(function(r){['gps','foto','datos','act'].forEach(function(m){
    T('ub·'+ro[0]+'·'+r[0]+'·'+m,function(){ubAbrir(r[1],{modo:m});return plano(ubHTML())});
    T('ub·'+ro[0]+'·'+r[0]+'·'+m+'·ok',function(){ubAbrir(r[1],{modo:m});var u=S.ub;u.lat=21.15;u.lng=-89.61;u.acc=8;u.est='ok';u.foto='data:x';u.tel='6641112233';return plano(ubHTML())})});
    T('ub·'+ro[0]+'·'+r[0]+'·guarda',function(){ubAbrir(r[1],{modo:'gps'});var u=S.ub;u.lat=21.15;u.lng=-89.61;u.acc=8;u.est='ok';u.foto='data:x';u.tel='6641112233';ubGuardar();var o=r[0].indexOf('cli')===0?cl(r[1].id):r[0]==='bod'?(S.bods||[]).filter(function(z){return +z.id===+r[1].id})[0]:provD(r[1].id);return J({ub:S.ub,o:o&&{lat:o.lat,lng:o.lng,foto:o.foto,tel:o.tel,locBy:o.locBy,locF:o.locF}})})})});
  S.ub=null;
  /* 2 · corregir en el mapa */
  S.role='admin';S.pinOk[pinKey()]=true;
  var X=[['cli',{t:'cli',id:cliente.id,p:0}],['prov',{t:'prov',id:prov,p:0}],['wz',{t:'wz',id:'wz',p:0}],['wz2',{t:'wz',id:'wz',p:2,lat:21.1,lng:-89.6}]];if(bod)X.push(['bod',{t:'bod',id:bod.id,p:0}]);
  X.forEach(function(x){[0,1,2].forEach(function(pp){T('ub68·'+x[0]+'·'+pp,function(){S.ub68=Object.assign({},x[1],{p:pp,lat:21.12,lng:-89.62});return plano(ub68HTML())})});
   T('ub68·'+x[0]+'·obj',function(){return J({o:ub68Obj(x[1]),n:ub68Nom(x[1])})});
   if(x[0]!=='wz'&&x[0]!=='wz2')T('ub68·'+x[0]+'·guarda',function(){S.ub68=Object.assign({},x[1],{lat:21.13,lng:-89.63});ub68Guarda();var o=ub68Obj(x[1]);return J({o:o&&{lat:o.lat,lng:o.lng,locBy:o.locBy,locF:o.locF},ub68:S.ub68,h:(S.hist||[]).slice(-1)})})});
  S.ub68=null;
  /* 3 · mapas */
  T('mapaVivo',function(){return String(mapaVivo())});
  T('mapaSVG',function(){return String(mapaSVG([{lat:21.1,lng:-89.6,t:'1',n:'Uno'},{lat:21.2,lng:-89.5,t:'2',n:'Dos'}],[{lat:21.1,lng:-89.6},{lat:21.2,lng:-89.5}],[],'Mapa'))});
  S.choferes.forEach(function(c){T('gps·'+c.id,function(){return plano(gpsRutaHTML(c))})});
  if(S.vws&&S.vws[0]&&S.vws[0].par)S.vws[0].par.forEach(function(p,i){T('nodo'+i,function(){return J(ubDeNodo(S.vws[0],{t:'prov',i:i}))})});
  /* 4 · pantallas */
  S.tab.admin='inicio';render();T('inicio',function(){mapaMonta();return limpio(document.querySelector('main').innerText)+'|'+document.querySelectorAll('[data-vivo]').length});
  S.tab.admin='clientes';render();T('clientes',function(){return limpio(document.querySelector('main').innerText)});
  S.role='rep';S.chofHoy=ch1.id;S.pinOk[pinKey()]=true;S.salida.ok=true;if(S.stops&&S.stops.length){S.cur=0;try{resetDraft(cl(S.stops[0].c))}catch(e){}S.tab.rep='entrega';render();cfUb70();T('entrega',function(){return limpio(document.querySelector('main').innerText)})}
  return out});
 await p.close();return {out,errs}}
(async()=>{const [A,N]=process.argv.slice(2);const b=await chromium.launch();const a=await corre(b,A),n=await corre(b,N);await b.close();
 const K=[...new Set(Object.keys(a.out).concat(Object.keys(n.out)))];let dif=0,err=0;
 for(const k of K){const x=JSON.stringify(a.out[k]),y=JSON.stringify(n.out[k]);if(/^"ERR/.test(y))err++;if(x!==y){dif++;if(dif<=8)console.log('DIF',k,'\n antes:',String(x).slice(0,300),'\n nuevo:',String(y).slice(0,300))}}
 console.log(K.length+' casos · '+dif+' diferencias · casos con ERR '+err+' · errores antes '+a.errs.length+' / nuevo '+n.errs.length+(n.errs.length?' '+n.errs.slice(0,2).join(' | '):''));
 console.log(dif===0&&n.errs.length<=a.errs.length?'IDÉNTICO':'DISTINTO')})();
