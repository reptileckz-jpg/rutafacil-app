/* Migración · tema "Cierre del chofer y recibir el cierre": compara la app de ANTES con la NUEVA (mismos casos = idéntico).
   Uso: node comp-cierre.js ANTES.html NUEVO.html   (se corre con la demo y con la real)
   Casos: cada paso del cierre (0 a 5) con efectivo exacto, faltante y sobrante, con gastos de ruta y combustible;
   las cuentas del cierre (cierreRes); las preguntas de confirmación; el cierre ya enviado; los avisos de Inicio
   y la pantalla del admin para recibir el cierre (antes y después de recibir). */
const {chromium}=require('playwright');
async function corre(b,url){const p=await (await b.newContext({viewport:{width:390,height:844}})).newPage();const errs=[];p.on('pageerror',e=>errs.push(String(e)));p.on('dialog',d=>d.accept());
 await p.addInitScript(()=>{window.__pnTest=1;window.__hora93=12;Math.random=(function(){var x=7;return function(){x=(x*16807)%2147483647;return (x-1)/2147483646}})();Date.now=(function(){var t=1794979200000;return function(){return t+=1000}})()});
 await p.goto('file://'+url);await p.waitForTimeout(1000);
 await p.evaluate(()=>{var out={};var T=function(k,f){try{out[k]=f()}catch(e){out[k]='ERR '+e.message}};
  var limpio=function(t){return String(t||'').replace(/\d{1,2}:\d\d(:\d\d)?/g,'HH:MM')};
  var main=function(){var m=document.querySelector('main');return m?limpio(m.innerText)+' |#'+m.querySelectorAll('[data-act]').length:''};
  var plano=function(h){var d=document.createElement('div');d.innerHTML=h||'';return limpio(d.innerText)+' |#'+d.querySelectorAll('[data-act]').length};
  if(window.PN_MODO==='vacio'){var U=S.setup;U.veh=[{n:'Camioneta Uno',pl:'AAA1',plEdo:'Baja California',comb:'Gasolina',img:0,odo:1000}];U.per=[{n:'Chofer Uno',puesto:'chofer',tel:'1'},{n:'Bodeguero',puesto:'bodega',tel:'2'}];
   U.cli=[{n:'Cliente Uno',a:'x',tel:'6640000001',dias:[0,1,2,3,4,5,6],cred:0,vac:0,ch:'0'},{n:'Cliente Dos',a:'y',tel:'6640000002',dias:[1,3],cred:900,vac:3,ch:'0'}];U.prov=[];S.precio.R=275;S.precio.M=20;suAplicar()}
  window.Capacitor={Plugins:{RutaNativa:{compartir:function(){return Promise.resolve({})}}}};
  var ch1=S.choferes.filter(function(c){return esCh(c)&&!esAdm(c)})[0];
  S.cfg.tel='228 555 0000';S.role='rep';S.chofHoy=ch1.id;S.pinOk[pinKey()]=true;S.tutVisto={rep:true,admin:true};S.salida.ok=true;S.salida.fotosFin=S.salida.fotosFin||{};
  (window.FOTOS||[]).forEach(function(f){S.salida.fotosFin[f[0]]='data:x'});S.salida.fotosFin.odo='data:x';
  S.cierre.odo=String(num(S.cierre.odoIni)+50);S.cierre.tankOk=true;S.cierre.gxConf=true;S.cierre.fotoReg='data:x';S.cierre.ev79={ok:true};S.rutaDia80=iso(TODAY);
  var c0=S.cli[0].id,c1=(S.cli[1]||S.cli[0]).id;
  S.log.push({c:c0,R:5,M:0,V:0,Vr:0,total:1500,pago:1500,abono:0,pr:300,pm:0});
  S.log.push({c:c1,R:3,M:2,V:0,Vr:0,total:865.5,pago:440,abono:120,pr:275,pm:20.25,tarj:100});
  S.gch=(S.gch||[]).concat([{t:'Comida',m:85,n:'tacos'},{t:'Combustible',m:400.5,lit:18}]);
  S.tab.rep='cierre';
  var ef=function(){return num(cierreRes().efectivo)};
  T('res',function(){var r=cierreRes();return JSON.stringify(r)});
  [['exacto',0],['falta',-100],['sobra',75.5]].forEach(function(v){
   S.cierre.entrega=String(r2(ef()+v[1]));S.cierre.efMot=v[1]?'motivo '+v[0]:'';S.cajaCnt=String(r2(ef()+v[1]));
   for(var P=0;P<=5;P++){S.cierreP=P;render();T('rep·'+v[0]+'·paso'+P,main)}
   ['cajacierre','enviar','cancelent','regcierre'].forEach(function(a){T('conf·'+v[0]+'·'+a,function(){return JSON.stringify(confMsg({act:a,id:'1'}))})})});
  try{Object.keys(window.CONF53||{}).forEach(function(a){T('conf53·'+a,function(){return JSON.stringify(confMsg({act:a,id:'1'}))})})}catch(e){}
  T('pantalla·cierre',function(){return plano(cierre())});
  /* el chofer envía (como lo hace el botón) */
  S.cierreP=5;S.cierre.entrega=String(r2(ef()-100));S.cierre.efMot='me faltó cobrar';render();
  var b=[].slice.call(document.querySelectorAll('main button')).filter(function(x){return /Enviar cierre|Terminar mi ruta/.test(x.textContent)})[0];
  T('boton·enviar',function(){return !!b});
  if(b)b.click();window.__out=out});
 await p.waitForTimeout(500);
 for(let k=0;k<4;k++){await p.evaluate(()=>{if(S.cierre.sent)return;var y=[].slice.call(document.querySelectorAll('button')).filter(function(x){return x.getClientRects().length&&/^(Sí|Enviar|Confirmar)/.test(x.textContent.trim())&&!x.closest('main')})[0];if(y)y.click()});await p.waitForTimeout(300)}
 await p.evaluate(()=>{var out=window.__out;var T=function(k,f){try{out[k]=f()}catch(e){out[k]='ERR '+e.message}};
  var limpio=function(t){return String(t||'').replace(/\d{1,2}:\d\d(:\d\d)?/g,'HH:MM')};
  var main=function(){var m=document.querySelector('main');return m?limpio(m.innerText)+' |#'+m.querySelectorAll('[data-act]').length:''};
  var plano=function(h){var d=document.createElement('div');d.innerHTML=h||'';return limpio(d.innerText)+' |#'+d.querySelectorAll('[data-act]').length};
  T('enviado',function(){var c=S.cierre;return JSON.stringify({sent:!!c.sent,res:c.res,dif:c.corte&&c.corte.dif,ef:c.corte&&c.corte.ef})});
  render();T('rep·enviado',main);T('pantalla·cierre·enviado',function(){return plano(cierre())});
  /* el admin: avisos de Inicio y recibir el cierre */
  S.role='admin';S.pinOk[pinKey()]=true;S.popVisto={admin:iso(TODAY)};S.encOn=false;
  T('top',function(){return plano(cierreTop())});
  S.tab.admin='inicio';render();T('admin·inicio',main);
  S.cierreRec='';T('adm·sinmonto',function(){return plano(cierreAdm())});
  [0,-100,50.5].forEach(function(d){S.cierreRec=String(r2(num(S.cierre.entrega)+d));T('adm·monto'+d,function(){return plano(cierreAdm())})});
  T('conf·regcierre',function(){return JSON.stringify(confMsg({act:'regcierre'}))});
  /* recibe $50 menos de lo que entregó */
  S.cierreRec=String(r2(num(S.cierre.entrega)-50));S.tab.admin='cierreadm';render();T('admin·pantalla',main);
  var rb=document.querySelector('main [data-act="regcierre"]');T('boton·recibir',function(){return !!rb});if(rb)rb.click();window.__out=out});
 await p.waitForTimeout(400);
 for(let k=0;k<4;k++){await p.evaluate(()=>{if(S.cierreReg)return;var y=[].slice.call(document.querySelectorAll('button')).filter(function(x){return x.getClientRects().length&&/^(Sí|Registrar|Confirmar)/.test(x.textContent.trim())&&!x.closest('main')})[0];if(y)y.click()});await p.waitForTimeout(300)}
 const out=await p.evaluate(()=>{var out=window.__out;var T=function(k,f){try{out[k]=f()}catch(e){out[k]='ERR '+e.message}};
  var limpio=function(t){return String(t||'').replace(/\d{1,2}:\d\d(:\d\d)?/g,'HH:MM')};
  var main=function(){var m=document.querySelector('main');return m?limpio(m.innerText)+' |#'+m.querySelectorAll('[data-act]').length:''};
  var plano=function(h){var d=document.createElement('div');d.innerHTML=h||'';return limpio(d.innerText)+' |#'+d.querySelectorAll('[data-act]').length};
  T('recibido',function(){return limpio(JSON.stringify({reg:S.cierreReg,caja:typeof cierresCaja==='function'?cierresCaja():null}))});
  render();T('admin·recibido',main);T('adm·recibido',function(){return plano(cierreAdm())});
  T('top·final',function(){return plano(cierreTop())});
  S.tab.admin='inicio';render();T('admin·inicio·final',main);
  return out});
 await p.close();return {out,errs}}
(async()=>{const [A,N]=process.argv.slice(2);const b=await chromium.launch();const a=await corre(b,A),n=await corre(b,N);await b.close();
 const K=[...new Set(Object.keys(a.out).concat(Object.keys(n.out)))];let dif=0,err=0;
 for(const k of K){const x=JSON.stringify(a.out[k]),y=JSON.stringify(n.out[k]);if(/^"ERR/.test(y))err++;if(x!==y){dif++;if(dif<=8)console.log('DIF',k,'\n antes:',String(x).slice(0,300),'\n nuevo:',String(y).slice(0,300))}}
 console.log(K.length+' casos · '+dif+' diferencias · casos con ERR '+err+' · errores antes '+a.errs.length+' / nuevo '+n.errs.length+(n.errs.length?' '+n.errs.slice(0,2).join(' | '):''));
 console.log(dif===0&&n.errs.length<=a.errs.length?'IDÉNTICO':'DISTINTO')})();
