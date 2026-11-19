/* Migración · tema "Piezas sueltas" (tema-sueltas.js): compara la app de ANTES con la NUEVA (mismos casos = idéntico).
   Uso: node comp-sueltas.js ANTES.html NUEVO.html   (se corre con la demo y con la real)
   Casos: menú de cada papel (con y sin nube), tipos de gasto, formulario de reportes, lo que falta (dfLista), revisión de cuentas,
   recibir el cierre (cada paso, con ventas y tickets), la pantalla de "algo falló". */
const {chromium}=require('playwright');
async function corre(b,url){const p=await (await b.newContext({viewport:{width:390,height:844}})).newPage();const errs=[];p.on('pageerror',e=>errs.push(String(e)));p.on('dialog',d=>d.accept());
 await p.addInitScript(()=>{window.__pnTest=1;window.__hora93=12;Math.random=(function(){var x=7;return function(){x=(x*16807)%2147483647;return (x-1)/2147483646}})();Date.now=(function(){var t=1794979200000;return function(){return t+=1000}})()});
 await p.goto('file://'+url);await p.waitForTimeout(1000);
 const out=await p.evaluate(()=>{var out={};var T=function(k,f){try{out[k]=f()}catch(e){out[k]='ERR '+e.message}};
  var limpio=function(t){return String(t||'').replace(/\d{1,2}:\d\d(:\d\d)?/g,'HH:MM').replace(/\s+/g,' ')};
  var plano=function(h){if(h==null)return '(null)';var d=document.createElement('div');d.innerHTML=h||'';return limpio(d.innerText||d.textContent)+' |#'+d.querySelectorAll('[data-act],input,button').length};
  var J=function(x){return limpio(JSON.stringify(x===undefined?'(undef)':x))};
  if(window.PN_MODO==='vacio'){var U=S.setup;U.veh=[{n:'Camioneta Uno',pl:'AAA1',plEdo:'Baja California',comb:'Gasolina',img:0,odo:1000}];U.per=[{n:'Chofer Uno',puesto:'chofer',tel:'1'},{n:'Chofer Dos',puesto:'chofer',tel:'4'}];
   U.cli=[{n:'Cliente Uno',a:'x',tel:'6640000001',dias:[0,1,2,3,4,5,6],cred:0,vac:0,ch:'0'},{n:'Cliente Dos',a:'y',tel:'6640000002',dias:[1,3,5],cred:0,vac:0,ch:'0'}];U.prov=[{n:'Proveedor Uno',tel:'3'}];S.precio.R=275;S.precio.M=20;suAplicar();U.fin=true;S.setup=null}
  S.tutVisto={rep:true,admin:true};S.role='admin';S.pinOk[pinKey()]=true;
  ['admin','rep','local','cont'].forEach(function(r){T('menu·'+r,function(){return plano(menuHTML(r))})});
  T('menu·nube',function(){var o=NB.on,l=NB.listo;NB.on=true;NB.listo=true;NB.perfil={rol:'admin',usuario:'ric'};var h=plano(menuHTML('admin'));NB.on=o;NB.listo=l;return h});
  T('gx·1',function(){return plano(gxTipos())});T('gx·fuel',function(){S.gxFuel=true;var h=plano(gxTipos());S.gxFuel=false;return h});T('gx·comida',function(){S.gx={tipo:'Comida o viáticos'};var h=plano(gxTipos());S.gx=null;return h});
  T('rp·0',function(){S.rp={t:'',c:'',txt:''};return plano(rpForm())});T('rp·1',function(){S.rp={t:'queja',c:S.cli[0].id,txt:'llegó tarde'};return plano(rpForm())});
  T('df·admin',function(){return J(dfLista())});T('df·rep',function(){S.role='rep';var r=J(dfLista());S.role='admin';return r});
  T('cr·1',function(){return J(cuentasRevisar())});
  var ch=S.choferes.filter(function(c){return esCh(c)})[0];S.chofHoy=ch.id;S.salida.ok=true;
  S.log.push({c:S.cli[0].id,R:5,M:2,V:1,Vr:0,total:1515,pago:1000,abono:0,pr:275,pm:20,h:'10:00'});S.log.push({c:S.cli[1].id,R:3,M:0,V:0,Vr:0,total:825,pago:825,abono:0,pr:275,pm:0,h:'11:00'});
  T('cr·2',function(){return J(cuentasRevisar())});T('df·2',function(){return J(dfLista())});
  S.cierre.sent=true;S.cierre.res=cierreRes();try{S.cierre.corte=corteDatos()}catch(e){}
  [0,1,2,3,4].forEach(function(pz){T('rc·'+pz,function(){S.rcv={p:pz};var h=plano(rcHTML());return h})});S.rcv=null;
  T('fallo',function(){try{falloPantalla77('Prueba de falla')}catch(e){return 'ERR '+e.message}var o=document.getElementById('fallo77');var t=o?limpio(o.innerText).replace(/Diagnóstico[\s\S]*/,'').slice(0,400):'(nada)';if(o)o.remove();return t});
  return out});
 await p.close();return {out,errs}}
(async()=>{const [A,N]=process.argv.slice(2);const b=await chromium.launch();const a=await corre(b,A),n=await corre(b,N);await b.close();
 const K=[...new Set(Object.keys(a.out).concat(Object.keys(n.out)))];let dif=0,err=0;
 for(const k of K){const x=JSON.stringify(a.out[k]),y=JSON.stringify(n.out[k]);if(process.env.V)console.log(k,String(y).slice(0,200));if(/^"ERR/.test(y))err++;if(x!==y){dif++;if(dif<=8)console.log('DIF',k,'\n antes:',String(x).slice(0,300),'\n nuevo:',String(y).slice(0,300))}}
 console.log(K.length+' casos · '+dif+' diferencias · casos con ERR '+err+' · errores antes '+a.errs.length+' / nuevo '+n.errs.length+(n.errs.length?' '+n.errs.slice(0,2).join(' | '):''));
 console.log(dif===0&&n.errs.length<=a.errs.length?'IDÉNTICO':'DISTINTO')})();
