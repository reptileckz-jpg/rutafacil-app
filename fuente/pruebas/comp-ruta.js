/* Migración · tema "Ruta y entrega del chofer": compara la app de ANTES con la NUEVA (mismos casos = idéntico).
   Uso: node comp-ruta.js ANTES.html NUEVO.html   (se corre con la demo y con la real) */
const {chromium}=require('playwright');
async function corre(b,url){const p=await (await b.newContext({viewport:{width:390,height:844}})).newPage();const errs=[];p.on('pageerror',e=>errs.push(String(e)));p.on('dialog',d=>d.accept());
 await p.addInitScript(()=>{window.__pnTest=1;window.__hora93=12;Math.random=(function(){var x=7;return function(){x=(x*16807)%2147483647;return (x-1)/2147483646}})();Date.now=(function(){var t=1794979200000;return function(){return t+=1000}})()});
 await p.goto('file://'+url);await p.waitForTimeout(1000);
 const out=await p.evaluate(async()=>{var out={};var T=function(k,f){try{out[k]=f()}catch(e){out[k]='ERR '+e.message}};var txt=function(){var m=document.querySelector('main');return m?m.innerText.replace(/\d{1,2}:\d\d/g,'HH:MM'):''};
  if(window.PN_MODO==='vacio'){var U=S.setup;U.veh=[{n:'Camioneta Uno',pl:'AAA1',plEdo:'Baja California',comb:'Gasolina',img:0,odo:1000}];U.per=[{n:'Chofer Uno',puesto:'chofer',tel:'1'}];
   U.cli=[{n:'Cliente Uno',a:'x',tel:'6640000001',dias:[0,1,2,3,4,5,6],cred:0,vac:0,ch:'0'},{n:'Cliente Dos',a:'y',tel:'6640000002',dias:[0,1,2,3,4,5,6],cred:900,vac:3,ch:'0'},{n:'Cliente Tres',a:'z',tel:'6640000003',dias:[0,1,2,3,4,5,6],cred:0,vac:0,ch:'0'}];U.prov=[];S.precio.R=275;S.precio.M=20;suAplicar()}
  var ch=S.choferes.filter(function(c){return esCh(c)&&!esAdm(c)})[0];S.pinOk[pinKey()]=true;S.pinOk['c:'+ch.id]=true;S.role='rep';S.chofHoy=ch.id;chCambiar(ch.id);if(!S.vehHoy)S.vehHoy=S.veh[0].id;
  S.cli.forEach(function(c){if(c.chofer==null)c.chofer=ch.id});S.tab.rep='ruta';render();T('ruta·antes de salir',txt);
  var bv=document.querySelector('[data-act="bienvgo"]');if(bv)bv.click();S.salida.ok=true;S.inv.reparto=40;S.inv.repartoKg=200;render();T('ruta·en ruta',txt);
  var C=S.cli.filter(function(c){return !c.oculto}).slice(0,6);T('credBloq',function(){return C.map(function(c){return c.n+': '+credBloq(c)})});
  var casos=[['todo',4,0,4,'',''],['parte',6,10,2,'500',''],['credito',3,0,0,'',''],['todo',2,0,2,'','300'],['parte',20,0,5,'5000','100'],['todo',0,0,0,'','200'],['credito',50,50,0,'',''],['credito',30,0,0,'','','tope']];
  C.forEach(function(c,ci){S.stops=[{c:c.id}];S.cur=0;casos.forEach(function(k,i){try{S.tab.rep='entrega';resetDraft(c);var d=S.d;d.mode=k[0];d.R=k[1];d.M=k[2];d.V=k[3];d.pago=k[4];d.abono=k[5];if(i===4){d.may=true;d.pRm='250';d.pMm='18'}var lim0=c.lim,lm0=c.limMan,cr0=S.cfg.crCh;if(k[6]==='tope'){c.lim=100000;c.limMan=100000;S.cfg.crCh='5000'}render();
     var key=ci+'·'+i;T('calc·'+key,function(){var x=entregaCalc();return {total:x.total,pago:x.pago,abono:x.abono,deuda:x.deuda,ef:x.efectivo,sobre:x.sobreLim,vac:x.vacias}});T('valida·'+key,function(){return entValida()});T('pantalla·'+key,txt);if(k[6]==='tope'){c.lim=lim0;c.limMan=lm0;S.cfg.crCh=cr0}}catch(e){out['caso·'+ci+'·'+i]='ERR '+e.message}})});
  /* guardar una entrega de verdad */
  try{var c=C[1];S.stops=[{c:c.id}];S.cur=0;S.tab.rep='entrega';resetDraft(c);S.d.mode='parte';S.d.R=5;S.d.V=3;S.d.pago='800';S.d.abono='100';S.d._deb109='no';S.d._tar72='no';render();
   document.querySelector('[data-act="entconf"]').click();await new Promise(function(r){setTimeout(r,300)});var g=document.querySelector('[data-act="guardar"]');if(g)g.click();await new Promise(function(r){setTimeout(r,400)});
   var l=S.log[S.log.length-1]||{};out['guardar']={log:S.log.length,R:l.R,V:l.V,total:l.total,pago:l.pago,abono:l.abono,cred:c.cred,vac:c.vac,inv:S.inv.reparto,ef:cierreRes().efectivo};S.tab.rep='ruta';render();out['ruta·después']=txt()}catch(e){out.guardar='ERR '+e.message}
  return out});
 await p.close();return {out,errs}}
(async()=>{const [A,N]=process.argv.slice(2);const b=await chromium.launch();const a=await corre(b,A),n=await corre(b,N);await b.close();
 const K=[...new Set(Object.keys(a.out).concat(Object.keys(n.out)))];let dif=0;
 for(const k of K){const x=JSON.stringify(a.out[k]),y=JSON.stringify(n.out[k]);if(x!==y){dif++;if(dif<=8)console.log('DIF',k,'\n antes:',String(x).slice(0,300),'\n nuevo:',String(y).slice(0,300))}}
 const errA=a.errs.length,errN=n.errs.length;console.log(K.length+' casos · '+dif+' diferencias · errores antes '+errA+' / nuevo '+errN+(errN?' '+n.errs.slice(0,2).join(' | '):''));
 console.log(dif===0&&errN<=errA?'IDÉNTICO':'DISTINTO')})();
