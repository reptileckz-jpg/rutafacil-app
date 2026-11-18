/* 123 · Recibir el cierre: no se acepta efectivo negativo (antes se registraba y restaba de la caja).
   El chofer manda su cierre (con $100 de menos) y el admin intenta recibir −$50, luego $0 y luego lo correcto.
   Uso: node t123.js [archivo.html]   (por defecto la demo; también se corre con la real) */
const {chromium}=require('playwright');
const URL=process.argv[2]||'/mnt/user-data/outputs/prototipo-platanos.html';
(async()=>{const b=await chromium.launch();let nOK=0,nF=0;const ok=(c,m,x)=>{c?nOK++:nF++;console.log((c?'OK   ':'FAIL ')+m+(x!==undefined?' '+JSON.stringify(x).slice(0,300):''))};
 const p=await (await b.newContext({viewport:{width:390,height:844}})).newPage();const errs=[];p.on('pageerror',e=>errs.push(String(e)));p.on('dialog',d=>d.accept());
 await p.addInitScript(()=>{window.__pnTest=1;window.__hora93=12});
 await p.goto('file://'+URL);await p.waitForTimeout(1000);const ev=(f,a)=>p.evaluate(f,a),W=ms=>p.waitForTimeout(ms);
 const clicSi=async(re,hecho)=>{for(let k=0;k<4;k++){await ev(([re,h])=>{if(eval(h))return;var y=[].slice.call(document.querySelectorAll('button')).filter(function(x){return x.getClientRects().length&&new RegExp(re).test(x.textContent.trim())&&!x.closest('main')})[0];if(y)y.click()},[re,hecho]);await W(250)}};
 /* el chofer manda su cierre */
 await ev(()=>{window.__t=[];var _tt=toast;toast=function(m){__t.push(String(m));return _tt.apply(this,arguments)};
  if(window.PN_MODO==='vacio'){var U=S.setup;U.veh=[{n:'Camioneta Uno',pl:'AAA1',plEdo:'Baja California',comb:'Gasolina',img:0,odo:1000}];U.per=[{n:'Chofer Uno',puesto:'chofer',tel:'1'}];
   U.cli=[{n:'Cliente Uno',a:'x',tel:'6640000001',dias:[0,1,2,3,4,5,6],cred:0,vac:0,ch:'0'}];U.prov=[];S.precio.R=275;S.precio.M=20;suAplicar()}
  window.Capacitor={Plugins:{RutaNativa:{compartir:function(){return Promise.resolve({})}}}};
  var ch1=S.choferes.filter(function(c){return esCh(c)&&!esAdm(c)})[0];
  S.cfg.tel='228 555 0000';S.role='rep';S.chofHoy=ch1.id;S.pinOk[pinKey()]=true;S.tutVisto={rep:true,admin:true};S.salida.ok=true;S.salida.fotosFin=S.salida.fotosFin||{};
  FOTOS.forEach(function(f){S.salida.fotosFin[f[0]]='data:x'});S.salida.fotosFin.odo='data:x';
  S.cierre.odo=String(num(S.cierre.odoIni)+50);S.cierre.tankOk=true;S.cierre.gxConf=true;S.cierre.fotoReg='data:x';S.cierre.ev79={ok:true};S.rutaDia80=iso(TODAY);
  S.log.push({c:S.cli[0].id,R:5,M:0,V:0,Vr:0,total:1500,pago:1500,abono:0,pr:300,pm:0});
  S.tab.rep='cierre';S.cierreP=5;S.cierre.entrega=String(r2(num(cierreRes().efectivo)-100));S.cierre.efMot='me faltó cobrar';render();
  var bt=[].slice.call(document.querySelectorAll('main button')).filter(function(x){return /Enviar cierre|Terminar mi ruta/.test(x.textContent)})[0];bt.click()});
 await W(400);await clicSi('^(Sí|Enviar|Confirmar)','S.cierre.sent');
 const ent=await ev(()=>({sent:!!S.cierre.sent,ent:num(S.cierre.entrega)}));ok(ent.sent,'el chofer mandó su cierre',ent);
 /* el admin intenta recibir −$50 */
 await ev(()=>{S.role='admin';S.pinOk[pinKey()]=true;S.popVisto={admin:iso(TODAY)};S.encOn=false;S.tab.admin='cierreadm';S.cierreRec='-50';render();__t=[];document.querySelector('main [data-act="regcierre"]').click()});
 await W(300);await clicSi('^(Sí|Registrar|Confirmar)','S.cierreReg');
 let r=await ev(()=>({reg:S.cierreReg||null,caja:cierresCaja(),t:__t}));
 ok(!r.reg&&r.caja===0,'con −$50 no se registra nada y la caja no cambia',r);
 ok(r.t.some(x=>/no puede ser negativo/.test(x)),'avisa que no puede ser negativo',r.t);
 /* $0: pregunta antes */
 await ev(()=>{S.cierreRec='0';render();document.querySelector('main [data-act="regcierre"]').click()});await W(300);
 r=await ev(()=>({reg:S.cierreReg||null,modal:[].slice.call(document.querySelectorAll('button')).filter(x=>x.getClientRects().length&&!x.closest('main')).map(x=>x.textContent.trim())}));
 ok(!r.reg&&r.modal.some(x=>/Sí, recibí \$0/.test(x)),'con $0 pregunta antes de registrar',r);
 await ev(()=>{S.modal=null;render()});
 /* lo que entregó, menos $50 */
 await ev(()=>{S.cierreRec=String(r2(num(S.cierre.entrega)-50));render();document.querySelector('main [data-act="regcierre"]').click()});
 await W(300);await clicSi('^(Sí|Registrar|Confirmar)','S.cierreReg');
 r=await ev(()=>({reg:S.cierreReg||null,caja:cierresCaja(),esp:r2(num(S.cierre.entrega)-50)}));
 ok(r.reg&&r.reg.rec===r.esp&&r.caja===r.esp,'una cantidad normal sí se registra y entra a la caja',r);
 ok(!errs.length,'sin errores',errs);console.log(nOK+' OK · '+nF+' FAIL');await b.close()})();
