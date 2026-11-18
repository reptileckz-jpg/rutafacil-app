/* Migración · tema "Entrar con PIN": compara la app de ANTES con la NUEVA (mismos casos = idéntico).
   Uso: node comp-pin.js ANTES.html NUEVO.html   (se corre con la demo y con la real)
   Casos: cuánto tiempo sin usar antes de pedir el PIN (pinLimMin) de cada quien; el renglón "PIN para entrar" (pinRow) como admin,
   encargado y chofer, con y sin PIN propio; pinDe con PIN propio, sin PIN, y 6 intentos mal (bloqueo, aviso URGENTE) y luego bien;
   la pantalla del PIN (pinHTML) para entrar, confirmar, crear el PIN (real), bloqueado y sin pantalla; quién puede entrar
   (personasEntrar) sin nube y con cuenta de chofer, admin, contador y venta local; pinEntrar con y sin gracia; entrarComo
   (borra la gracia) y la pantalla completa del PIN. */
const {chromium}=require('playwright');
async function corre(b,url){const p=await (await b.newContext({viewport:{width:390,height:844}})).newPage();const errs=[];p.on('pageerror',e=>errs.push(String(e)));p.on('dialog',d=>d.accept());
 await p.addInitScript(()=>{window.__pnTest=1;window.__hora93=12;Math.random=(function(){var x=7;return function(){x=(x*16807)%2147483647;return (x-1)/2147483646}})();Date.now=(function(){var t=1794979200000;return function(){return t+=1000}})()});
 await p.goto('file://'+url);await p.waitForTimeout(1000);
 const out=await p.evaluate(()=>{var out={};var T=function(k,f){try{out[k]=f()}catch(e){out[k]='ERR '+e.message}};
  var limpio=function(t){return String(t||'').replace(/\d{1,2}:\d\d(:\d\d)?/g,'HH:MM')};
  var plano=function(h){if(h==null)return '(null)';var d=document.createElement('div');d.innerHTML=h||'';return limpio(d.innerText)+' |#'+d.querySelectorAll('[data-act],[data-bind],input').length+' |'+Array.prototype.map.call(d.querySelectorAll('[data-act]'),function(x){return x.dataset.act}).join(',')};
  var J=function(x){return limpio(JSON.stringify(x===undefined?'(undef)':x))};
  if(window.PN_MODO==='vacio'){var U=S.setup;U.veh=[{n:'Camioneta Uno',pl:'AAA1',plEdo:'Baja California',comb:'Gasolina',img:0,odo:1000}];U.per=[{n:'Chofer Uno',puesto:'chofer',tel:'1'},{n:'Chofer Dos',puesto:'chofer',tel:'4'},{n:'Bodeguero',puesto:'bodega',tel:'2'}];
   U.cli=[{n:'Cliente Uno',a:'x',tel:'6640000001',dias:[0,1,2,3,4,5,6],cred:0,vac:0,ch:'0'}];U.prov=[{n:'Proveedor Uno',tel:'3'}];S.precio.R=275;S.precio.M=20;suAplicar()}
  S.tutVisto={rep:true,admin:true};S.role='admin';S.pinOk[pinKey()]=true;
  var chs=(S.choferes||[]).slice(0,4);
  var K=['a:'+S.adminYo,'local','cont','otro'].concat(chs.map(function(c){return 'c:'+c.id}));
  /* cuánto tiempo sin usar */
  K.forEach(function(k){T('lim·'+k,function(){return pinLimMin(k)})});
  T('lim·actual',function(){return pinLimMin()});
  /* PIN de cada quien */
  var pins0=JSON.parse(JSON.stringify(S.pins||{}));
  K.forEach(function(k){T('de·'+k,function(){return J(pinDe(k))})});
  S.pins[K[1]]='4321';S.pins[K[4]]='9876';
  K.forEach(function(k){T('de2·'+k,function(){return J(pinDe(k))})});
  /* renglón del PIN */
  [['admin',false],['admin',true],['rep',false]].forEach(function(r){S.role=r[0];S.encOn=r[1];if(r[0]==='rep'&&chs[0])S.chofHoy=chs[0].id;
   K.forEach(function(k){T('row·'+r[0]+(r[1]?'enc':'')+'·'+k,function(){return plano(pinRow(k))})})});
  S.role='admin';S.encOn=false;
  /* intentos: 6 mal y uno bien */
  var k4=K[4]||K[1];S.pinF={};var av0=(S.avPrecio||[]).length;
  for(var i=0;i<6;i++){(function(i){_pin={v:'0000',modo:'entrar',k:k4,cb:null};T('mal'+i,function(){var r=pinDe(k4);return J([r,S.pinF[k4],(S.avPrecio||[]).length-av0])})})(i)}
  T('bloq·html',function(){_pin={v:'',modo:'entrar',k:k4,cb:null};return plano(pinHTML())});
  S.pinF={};_pin={v:S.pins[k4],modo:'entrar',k:k4,cb:null};T('bien',function(){return J([pinDe(k4),S.pinF[k4]])});
  /* la pantalla del PIN */
  K.forEach(function(k){
   T('html·entrar·'+k,function(){_pin={v:'',modo:'entrar',k:k,cb:null};return plano(pinHTML())});
   T('html·entrar2·'+k,function(){_pin={v:'12',modo:'entrar',k:k,cb:null};return plano(pinHTML())});
   T('html·conf·'+k,function(){_pin={v:'',modo:'conf',k:k,motivo:'Escribe tu PIN actual',cb:function(){}};return plano(pinHTML())})});
  T('html·nada',function(){_pin={v:'',modo:null,k:null,cb:null};return plano(pinHTML())});
  /* quién puede entrar */
  var nb0={on:NB.on,perfil:NB.perfil};
  T('pe·sinnube',function(){return J(personasEntrar().map(function(x){return [x.k,x.n,x.p]}))});
  var perf=[{rol:'chofer',chId:chs[0]&&chs[0].id},{rol:'chofer',chId:chs[1]&&chs[1].id},{rol:'admin',adm:S.adminYo},{rol:'admin',adm:'zz'},{rol:'cont'},{rol:'local'}];
  perf.forEach(function(pf,i){T('pe·'+i+'·'+pf.rol,function(){NB.on=true;NB.perfil=pf;var r=J(personasEntrar().map(function(x){return [x.k,x.n,x.p]}));NB.on=nb0.on;NB.perfil=nb0.perfil;return r})});
  T('pe·perfilnulo',function(){NB.on=true;NB.perfil=null;var r=J(personasEntrar().map(function(x){return x.k}));NB.on=nb0.on;NB.perfil=nb0.perfil;return r});
  /* pinEntrar con y sin gracia */
  S.pins=JSON.parse(JSON.stringify(pins0));S.pinF={};
  T('ent·sinOk',function(){S.pinOk={};_pin={v:'',modo:null,k:null,cb:null};var r=pinEntrar();return J([r,_pin.modo,_pin.k,S.pinOk])});
  T('ent·ok',function(){var r=pinEntrar();return J([r,_pin.modo])});
  T('ent·gracia',function(){S.pinOk={};_pin={v:'',modo:null,k:null,cb:null};window.__pnGracia=1;_pinAuth[pinKey()]=Date.now();var r=pinEntrar();window.__pnGracia=0;return J([r,_pin.modo,S.pinOk])});
  T('ent·graciaVieja',function(){S.pinOk={};_pin={v:'',modo:null,k:null,cb:null};window.__pnGracia=1;_pinAuth[pinKey()]=Date.now()-600000;var r=pinEntrar();window.__pnGracia=0;return J([r,_pin.modo])});
  /* pantalla completa del PIN */
  T('pantalla·entrar',function(){S.pinOk={};_pin={v:'',modo:'entrar',k:pinKey(),cb:null};render();var o=document.getElementById('pinov');return o?limpio(o.innerText)+' |'+o.querySelectorAll('[data-act]').length:'(sin pinov)'});
  T('pantalla·crear',function(){var k=pinKey(),g=S.pins[k];delete S.pins[k];_pin={v:'',modo:'entrar',k:k,cb:null};render();var o=document.getElementById('pinov');var r=o?limpio(o.innerText):'(sin pinov)';if(g)S.pins[k]=g;return r});
  /* entrarComo borra la gracia */
  _pin={v:'',modo:null,k:null,cb:null};S.pinOk[pinKey()]=true;
  personasEntrar().slice(0,3).forEach(function(x,i){T('como·'+i,function(){_pinAuth={x:1};entrarComo(x);return J([Object.keys(_pinAuth).length,S.role,S.chofHoy,S.encOn,S.usrSel,S.menu])})});
  return out});
 await p.close();return {out,errs}}
(async()=>{const [A,N]=process.argv.slice(2);const b=await chromium.launch();const a=await corre(b,A),n=await corre(b,N);await b.close();
 const K=[...new Set(Object.keys(a.out).concat(Object.keys(n.out)))];let dif=0,err=0;
 for(const k of K){const x=JSON.stringify(a.out[k]),y=JSON.stringify(n.out[k]);if(/^"ERR/.test(y))err++;if(x!==y){dif++;if(dif<=8)console.log('DIF',k,'\n antes:',String(x).slice(0,300),'\n nuevo:',String(y).slice(0,300))}}
 console.log(K.length+' casos · '+dif+' diferencias · casos con ERR '+err+' · errores antes '+a.errs.length+' / nuevo '+n.errs.length+(n.errs.length?' '+n.errs.slice(0,2).join(' | '):''));
 console.log(dif===0&&n.errs.length<=a.errs.length?'IDÉNTICO':'DISTINTO')})();
