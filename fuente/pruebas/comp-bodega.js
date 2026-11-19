/* Migración · "Registrar una carga" (final de tema-cargas.js) y "Bodega y maduración" (tema-bodega.js): compara ANTES y NUEVO.
   Uso: node comp-bodega.js ANTES.html NUEVO.html   (demo y real)
   Casos: el COSTO de cada carga (cC: caja, kilo, desgaste y sueldo por caja), meta de ganancia (cfield), el formulario de carga (cfForm),
   registrar una carga paso por paso (cmNuevo, cmHTML de cada paso, cmObj, cmValida, maduración), Bodega y sus tarjetas, existencias,
   fruta que se pasa de tiempo, precio por lote, lo que lleva el chofer, y las pantallas de Bodega y Cargas. */
const {chromium}=require('playwright');
async function corre(b,url){const p=await (await b.newContext({viewport:{width:390,height:844}})).newPage();const errs=[];p.on('pageerror',e=>errs.push(String(e)));p.on('dialog',d=>d.accept());
 await p.addInitScript(()=>{window.__pnTest=1;window.__hora93=12;Math.random=(function(){var x=7;return function(){x=(x*16807)%2147483647;return (x-1)/2147483646}})();Date.now=(function(){var t=1794979200000;return function(){return t+=1000}})()});
 await p.goto('file://'+url);await p.waitForTimeout(1000);
 const out=await p.evaluate(()=>{var out={};var T=function(k,f){try{out[k]=f()}catch(e){out[k]='ERR '+e.message}};
  var limpio=function(t){return String(t||'').replace(/\d{1,2}:\d\d(:\d\d)?/g,'HH:MM').replace(/\s+/g,' ')};
  var plano=function(h){if(h==null)return '(null)';var d=document.createElement('div');d.innerHTML=h||'';return limpio(d.innerText)+' |#'+d.querySelectorAll('[data-act],input,select').length};
  var J=function(x){return limpio(JSON.stringify(x===undefined?'(undef)':x,function(k,v){return typeof v==='number'?Math.round(v*1e6)/1e6:v}))};
  if(window.PN_MODO==='vacio'){var U=S.setup;U.veh=[{n:'Camioneta Uno',pl:'AAA1',plEdo:'Baja California',comb:'Gasolina',img:0,odo:1000}];U.per=[{n:'Chofer Uno',puesto:'chofer',tel:'1'}];U.cli=[{n:'Cliente Uno',a:'x',tel:'6640000001',dias:[0,1,2,3,4,5,6],cred:0,vac:0,ch:'0'}];U.prov=[{n:'Proveedor Uno',tel:'3'}];S.precio.R=275;S.precio.M=20;suAplicar();S.setup=null}
  S.tutVisto={rep:true,admin:true};S.role='admin';S.pinOk[pinKey()]=true;
  S.cargas.push({id:S.nextCarga++,fecha:iso(TODAY),prov:'Proveedor Uno',kgR:2000,pR:9.5,cajas:100,kgM:300,pM:7,t:{diesel:2500,comida:300,casetas:850.5,extra:0},extras:[],pag:0,est:'Recibida',vCaja:0,vKgM:0,mg:30,pagBase:0,trBase:0,otros:[],trMode:'kilos'});
  S.cargas.push({id:S.nextCarga++,fecha:iso(TODAY),prov:'Proveedor Uno',kgR:1000,pR:10,cajas:50,kgM:0,pM:0,t:{diesel:1000,comida:0,casetas:0,extra:0},extras:[],pag:0,est:'Por llegar',vCaja:0,vKgM:0,mg:25,mgM:20,pagBase:0,trBase:0,otros:[],trMode:'R'});
  (S.cargas||[]).forEach(function(c){T('cC·'+c.id,function(){return J(cC(c))});T('lp·'+c.id,function(){return plano(lotePrecioHTML(c))})});
  [true,false].forEach(function(ig){S.cfg.mgIgual=ig;(S.cargas||[]).slice(-2).forEach(function(c){T('cfield·'+ig+'·'+c.id,function(){return plano(cfield(c,'mg','Meta %',1))+plano(cfield(c,'kgR','Kilos',1))})})});
  T('cfForm',function(){S.cf=S.cf||{prov:'',fecha:iso(TODAY),kgR:'',pR:'',cajas:'',kgM:'',pM:'',diesel:'',comida:'',casetas:'',extra:'',pag:'',otros:[]};return plano(cfForm())});
  /* registrar una carga paso por paso */
  T('cm·nuevo',function(){cmNuevo();return J(S.cm)});
  var pasos=function(){try{return cmPasos()}catch(e){return []}};
  T('cm·pasos',function(){return J(pasos())});
  pasos().forEach(function(k,i){T('cm·html·'+i,function(){S.cm.paso=i;return plano(cmHTML())});T('cm·val·'+k,function(){return J(cmValida(k))})});
  T('cm·llenar',function(){var m=S.cm;m.R=true;m.M=true;m.kgR=1500;m.pR=9.8;m.cajas=75;m.kgM=200;m.pM=6.5;m.quien='admin';m.mad='si';return J(cmObj())});
  pasos().forEach(function(k,i){T('cm·html2·'+i,function(){S.cm.paso=i;return plano(cmHTML())});T('cm·val2·'+k,function(){return J(cmValida(k))})});
  T('cm·mad',function(){return plano(cmMadHTML())});
  /* bodega */
  T('antig',function(){return J(antig65())});T('exist',function(){return J(exist65())});T('existOld',function(){return J(exist65(true))});
  T('bodega',function(){return plano(bodega())});T('bodegas',function(){return plano(bodegasCard())});
  T('lt53',function(){S.lt53=null;return J(lt53Aplica())});
  ['bodega','cargas','inicio'].forEach(function(t){T('pant·'+t,function(){S.tab.admin=t;render();var m=document.querySelector('main');return m?limpio(m.innerText).slice(0,3000):''})});
  /* lo que lleva el chofer */
  T('stock·rep',function(){var ch=S.choferes.filter(function(c){return esCh(c)})[0];S.role='rep';S.chofHoy=ch.id;S.salida.ok=true;S.inv.reparto=12;S.inv.repartoKg=30;var h=plano(stockCard());S.role='admin';return h});
  return out});
 await p.close();return {out,errs}}
(async()=>{const [A,N]=process.argv.slice(2);const b=await chromium.launch();const a=await corre(b,A),n=await corre(b,N);await b.close();
 const K=[...new Set(Object.keys(a.out).concat(Object.keys(n.out)))];let dif=0,err=0;
 for(const k of K){const x=JSON.stringify(a.out[k]),y=JSON.stringify(n.out[k]);if(process.env.V)console.log(k,String(y).slice(0,180));if(/^"ERR/.test(y))err++;if(x!==y){dif++;if(dif<=8)console.log('DIF',k,'\n antes:',String(x).slice(0,300),'\n nuevo:',String(y).slice(0,300))}}
 console.log(K.length+' casos · '+dif+' diferencias · casos con ERR '+err+' · errores antes '+a.errs.length+' / nuevo '+n.errs.length+(n.errs.length?' '+n.errs.slice(0,2).join(' | '):''));
 console.log(dif===0&&n.errs.length<=a.errs.length?'IDÉNTICO':'DISTINTO')})();
