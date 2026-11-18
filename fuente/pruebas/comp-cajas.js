/* Migración · tema "Cajas y caja de dinero" (tema-cajas.js), la nota de remisión (al final de tema-notas.js) y la cámara (tema-camara.js):
   compara la app de ANTES con la NUEVA (mismos casos = idéntico). TOCA MERCANCÍA Y DINERO: cada número debe salir igual.
   Uso: node comp-cajas.js ANTES.html NUEVO.html   (se corre con la demo y con la real)
   Casos: al abrir la app (cajasT0, dónde están las cajas, cuántas debería haber, efectivo esperado, la revisión de taras);
   ruta abierta con entregas, vacías, rotas y cambios; cierre mandado sin contar; otras rutas en camino (abiertas y con cierre
   sin contar, y ya recibidas); retiros del banco a la caja y recargas de TAG pagadas de la caja; caja de ayer sin movimientos;
   la nota de remisión (en pantalla, renglones, imagen, sin nombre, con logo, a crédito) y las notas que ve cada quien;
   la cámara (abrir, solo cámara, galería). */
const {chromium}=require('playwright');const crypto=require('crypto');
async function corre(b,url){const p=await (await b.newContext({viewport:{width:390,height:844}})).newPage();const errs=[];p.on('pageerror',e=>errs.push(String(e)));p.on('dialog',d=>d.accept());
 await p.addInitScript(()=>{window.__pnTest=1;window.__hora93=12;Math.random=(function(){var x=7;return function(){x=(x*16807)%2147483647;return (x-1)/2147483646}})();Date.now=(function(){var t=1794979200000;return function(){return t+=1000}})()});
 await p.goto('file://'+url);await p.waitForTimeout(1000);
 const out=await p.evaluate(()=>{var out={};var T=function(k,f){try{out[k]=f()}catch(e){out[k]='ERR '+e.message}};
  var limpio=function(t){return String(t||'').replace(/\d{1,2}:\d\d(:\d\d)?/g,'HH:MM')};
  var plano=function(h){if(h==null)return '(null)';var d=document.createElement('div');d.innerHTML=h||'';return limpio(d.innerText)+' |#'+d.querySelectorAll('[data-act],img,input').length};
  var J=function(x){return limpio(JSON.stringify(x===undefined?'(undef)':x))};
  var todo=function(){return J({donde:cajasDonde(),esp:cajasEsperadas(),caja:r2(cajaEsp()),dif:typeof tarasDif86==='function'?tarasDif86():null,t0:S.cajasT0})};
  T('carga·t0',function(){return J(S.cajasT0)});
  T('carga·todo',todo);
  if(window.PN_MODO==='vacio'){var U=S.setup;U.veh=[{n:'Camioneta Uno',pl:'AAA1',plEdo:'Baja California',comb:'Gasolina',img:0,odo:1000}];U.per=[{n:'Chofer Uno',puesto:'chofer',tel:'1'},{n:'Chofer Dos',puesto:'chofer',tel:'4'},{n:'Bodeguero',puesto:'bodega',tel:'2'}];
   U.cli=[{n:'Cliente Uno',a:'x',tel:'6640000001',dias:[0,1,2,3,4,5,6],cred:0,vac:0,ch:'0'}];U.prov=[{n:'Proveedor Uno',tel:'3'}];S.precio.R=275;S.precio.M=20;suAplicar();U.fin=true;S.cajasT0=cajasDonde().tot-cajasMovTot()}
  S.tutVisto={rep:true,admin:true};S.role='admin';S.pinOk[pinKey()]=true;
  T('base·todo',todo);
  T('base·revisa',function(){return J((typeof cuentasRevisar==='function'?cuentasRevisar():null))});
  var chs=S.choferes.filter(function(c){return esCh(c)});var ch=chs[0],ch2=chs[1]||chs[0];
  /* ruta abierta de este celular */
  S.chofHoy=ch.id;S.salida.ok=true;S.cierre=S.cierre||{};S.cierre.sent=false;
  var c0=S.cli[0];S.log.push({c:c0.id,R:5,M:2,V:3,Vr:1,total:1540.5,pago:1000,abono:0,pr:300,pm:20});S.log.push({c:c0.id,R:2,M:0,V:2,Vr:0,total:600,pago:600,abono:0,pr:300,pm:0});
  S.cambios=(S.cambios||[]).concat([{R:2,dev:false},{R:1,dev:true}]);
  T('ruta·todo',todo);
  /* cierre mandado sin contar */
  S.cierre.sent=true;S.cierre.res={reg:'7',V:'4'};S.cierre.porContar=true;S.recep=null;
  T('regPend·todo',todo);
  S.cierre.res={reg:'x',V:null};T('regPend·raro',todo);
  S.cierre.res={reg:-3,V:2};T('regPend·neg',todo);
  S.cierre={sent:false};
  /* otras rutas en camino */
  S.chSt=S.chSt||{};
  S.chSt[ch2.id===ch.id?999:ch2.id]={invR:'12',log:[{V:3,Vr:2},{V:'1',Vr:0}],cierre:{sent:false}};
  S.chSt[998]={invR:4,log:[{V:5,Vr:1}],cierre:{sent:true,porContar:true,res:{reg:6,V:'3'}}};
  S.chSt[997]={invR:2,log:[],cierre:{sent:true,porContar:true,res:{reg:6,V:3}},recep:{ok:1}};
  S.chSt[996]=null;
  T('otras·todo',todo);
  T('otras·rutas',function(){return J(rutasOtras().length)});
  /* dinero: banco y TAG */
  S.bancoMov=(S.bancoMov||[]).concat([{t:'Retiro a la caja',m:500},{t:'Depósito',m:300},{t:'Retiro a la caja',m:'250.75'}]);
  T('banco·caja',function(){return J(r2(cajaEsp()))});
  var v=S.veh[0];v.tag76={mov:[{t:'rec',de:'caja',m:200},{t:'rec',de:'banco',m:100},{t:'cruce',m:50},{t:'rec',de:'caja',m:'49.5'}]};
  T('tag·caja',function(){return J([r2(cajaEsp()),tagRecCaja()])});
  /* caja de ayer */
  T('ayer·1',function(){var h=S.hist.length;var r=cajaAyerPend();return J([r,S.sinTrabajo,S.hist.length-h])});
  T('ayer·2',function(){S.cajaAyerSkip=false;S.primerDia=false;var h=S.hist.length;var r=cajaAyerPend();return J([r,S.hist.length-h])});
  T('ayer·skip',function(){S.cajaAyerSkip=true;var r=cajaAyerPend();S.cajaAyerSkip=false;return J(r)});
  T('ayer·rep',function(){S.role='rep';var r=cajaAyerPend();S.role='admin';return J(r)});
  /* pantalla de cajas y taras */
  ['inicio','mas'].forEach(function(t){T('pantalla·'+t,function(){S.tab.admin=t;render();var m=document.querySelector('main');return m?limpio(m.innerText).replace(/\s+/g,' ').slice(0,3000):''})});
  /* nota de remisión */
  var notaDe=function(o){return Object.assign({tel:'6641234567',folio:7,fecha:'martes, 17 de noviembre de 2026',cli:c0.n,entrego:chofN(ch.id),recibio:'',R:5,M:2,V:3,vacDebe:2,may:0,pr:300,pm:20,total:1540.5,pago:1540.5,abono:0,cred:0,prox:'jueves',img:null,showTxt:false},o||{})};
  var hash=function(s){var h=0;s=String(s||'');for(var i=0;i<s.length;i++){h=(h*31+s.charCodeAt(i))|0}return s.length+':'+h};
  var notas=[['contado',{}],['credito',{pago:1000,cred:540.5}],['abono',{abono:300,cred:200}],['mayoreo',{may:1}]];
  var cfgs=[['normal',{}],['sinNombre',{nombre:'Plátanos Nietos'}],['sinLogo',{tkLogo:false}],['tel',{tel:'228 111 2233'}]];
  var cfg0=JSON.parse(JSON.stringify(S.cfg));
  cfgs.forEach(function(cf){notas.forEach(function(nt){var k=cf[0]+'·'+nt[0];
   S.cfg=Object.assign(JSON.parse(JSON.stringify(cfg0)),cf[1]);if(cf[1].tkLogo===false)S.cfg.tkLogo=false;
   S.nota=notaDe(nt[1]);
   T('nota·blk·'+k,function(){return plano(notaBlock())});
   T('nota·it·'+k,function(){return J(notaItems(S.nota))});
   T('nota·txt·'+k,function(){return limpio(notaTxt(S.nota))});
   T('nota·img·'+k,function(){return hash(notaImg(S.nota))})})});
  S.cfg=cfg0;S.nota=null;T('nota·nula',function(){return plano(notaBlock())});
  /* notas de "Así se hace" que ve cada quien */
  S.notasN=[{k:'cli:'+c0.id,txt:'Solo efectivo'},{k:'cli:*',txt:'Para todos los clientes',v:'ch'},{k:'prov:Roly',txt:'Se le paga el lunes',v:'adm'},{k:'prov:*',txt:'Pedir ticket',v:'todos'},{k:'cli:'+c0.id,txt:'Encargado',v:'enc'}];
  [['admin',false],['admin',true],['rep',false]].forEach(function(r){S.role=r[0];S.encOn=r[1];
   ['cli:'+c0.id,'cli:999','prov:Roly','prov:Otro','veh:1'].forEach(function(k){T('notasDe·'+r[0]+(r[1]?'enc':'')+'·'+k,function(){var a=JSON.stringify(S.notasN);var h=plano(notasDe(k));return h+(JSON.stringify(S.notasN)===a?'':' (CAMBIÓ notasN)')})})});
  S.role='admin';S.encOn=false;
  /* cámara */
  var st=function(){var o=document.getElementById('cam73');return J([!!o,CAM73.solo82||0,CAM73.cara,o?limpio(o.innerText).slice(0,200):''])};
  T('cam·abre',function(){var i=document.createElement('input');i.type='file';document.body.appendChild(i);cam73Abre(i);var r=st();try{cam73Cierra()}catch(e){}return r});
  T('cam·soloCam',function(){var i=document.createElement('input');i.type='file';i.setAttribute('capture','environment');document.body.appendChild(i);cam73Abre(i);var r=st();try{cam73Galeria()}catch(e){r+=' ERR '+e.message}r+=st()+J(toastLast());try{cam73Cierra()}catch(e){}return r});
  T('cam·galeria',function(){var i=document.createElement('input');i.type='file';document.body.appendChild(i);cam73Abre(i);try{cam73Galeria()}catch(e){}return st()});
  function toastLast(){var t=document.querySelector('.toast,#toast');return t?limpio(t.innerText):''}
  return out});
 await p.close();return {out,errs}}
(async()=>{const [A,N]=process.argv.slice(2);const b=await chromium.launch();const a=await corre(b,A),n=await corre(b,N);await b.close();
 const K=[...new Set(Object.keys(a.out).concat(Object.keys(n.out)))];let dif=0,err=0;
 for(const k of K){const x=JSON.stringify(a.out[k]),y=JSON.stringify(n.out[k]);if(process.env.V)console.log(k,String(y).slice(0,200));if(/^"ERR/.test(y))err++;if(x!==y){dif++;if(dif<=8)console.log('DIF',k,'\n antes:',String(x).slice(0,300),'\n nuevo:',String(y).slice(0,300))}}
 console.log(K.length+' casos · '+dif+' diferencias · casos con ERR '+err+' · errores antes '+a.errs.length+' / nuevo '+n.errs.length+(n.errs.length?' '+n.errs.slice(0,2).join(' | '):''));
 console.log(dif===0&&n.errs.length<=a.errs.length?'IDÉNTICO':'DISTINTO')})();
