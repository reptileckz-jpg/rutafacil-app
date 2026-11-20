/* 181 · URGENTE "No mandaste tu cierre de ayer" → "Mandar mi cierre de ayer" no hacía nada: el cierre tronaba al dibujarse con datos
   reales de ayer (odómetro de salida sin anotar, parada de un cliente que ya no existe, venta rápida quitada) y la red de seguridad
   regresaba a la ruta. Cada caso debe abrir el cierre; y el peor caso se manda completo (6 pasos) y sale la ruta de hoy. */
const {chromium}=require('playwright');let nOK=0,nF=0;const ok=(c,m,x)=>{c?nOK++:nF++;console.log((c?'OK   ':'FAIL ')+m+(x!==undefined?' '+JSON.stringify(x).slice(0,300):''))};
const CASOS={
 'entrega de un cliente que ya no existe':()=>{S.log.push({c:999999,R:1,M:0,pr:260,pm:18,total:260,pago:260,abono:0,V:0,t:'11:00'})},
 'parada de un cliente que ya no existe':()=>{S.stops.push({c:888888})},
 'entrega sin cliente':()=>{S.log.push({R:1,M:0,total:100,pago:100})},
 'vehículo que ya no existe':()=>{S.vehHoy=777777},
 'sin vehículo':()=>{S.vehHoy=null},
 'cierre sin odómetro de salida':()=>{S.cierre.odoIni=null},
 'gasto con monto vacío':()=>{(S.gastosR=S.gastosR||[]);S.gx&&0;(S.recs=S.recs||[]).push({tipo:'Comida',m:'',total:''})},
 'venta rápida con cliente quitado':()=>{var id=S.nextCli++;S.cli.push({id:id,n:'Venta rápida',rapida:true,oculto:true,vac:0,cred:0,dias:[]});S.stops.push({c:id,calle:true,done:true});S.log.push({c:id,R:1,M:0,pr:260,total:260,pago:260,abono:0,V:0,t:'12:00'});S.cli=S.cli.filter(x=>x.id!==id)},
};
(async()=>{const b=await chromium.launch();const errsT=[];
for(const [nom,fn] of Object.entries(CASOS)){
 const p=await (await b.newContext({viewport:{width:412,height:900}})).newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));p.on('dialog',d=>d.accept());
 await p.addInitScript(()=>{window.__pnTest=1;window.__hora93=9});await p.goto('file:///mnt/user-data/outputs/prototipo-platanos.html');await p.waitForTimeout(800);
 await p.evaluate(()=>{var ce=console.error;window.__CE=[];console.error=function(){window.__CE.push([].map.call(arguments,String).join(' ').slice(0,200));return ce.apply(console,arguments)}});
 const r=await p.evaluate(fs=>{S.tutVisto={rep:true,admin:true};S.role='rep';S.chofHoy=1;S.pinOk[pinKey()]=true;S.pinOk['c:1']=true;S.salida.ok=true;S.cierre.sent=false;
  if(!(S.log||[]).length)S.log.push({c:S.stops[0].c,R:2,M:0,pr:260,pm:18,total:520,pago:520,abono:0,V:0,t:'10:00'});
  (new Function(fs))();S.rutaDia80=iso(new Date(TODAY.getTime()-864e5));S.tab.rep='ruta';try{render()}catch(e){}
  var antes=!!document.getElementById('dia80');document.querySelector('[data-act="dia80c"]').click();
  return {pantalla:antes,tab:S.tab.rep,sigue:!!document.getElementById('dia80'),cierre:!!document.querySelector('main')&&/Cierre del d/.test(document.querySelector('main').innerText),trono:window.__CE.filter(x=>/al dibujar/.test(x))}},'('+fn.toString()+')()');
 ok(r.pantalla&&r.tab==='cierre'&&!r.sigue&&r.cierre&&!r.trono.length,'"Mandar mi cierre de ayer" abre el cierre con: '+nom,r);
 await p.close()}
/* el peor caso, con la app real: sin odómetro de salida + parada rota → se manda completo y sale la ruta de hoy */
{const p=await (await b.newContext({viewport:{width:412,height:900}})).newPage();p.on('pageerror',e=>errsT.push(e.message));p.on('dialog',d=>d.accept());
 await p.addInitScript(()=>{window.__pnTest=1;window.__hora93=9});await p.goto('file:///mnt/user-data/outputs/platanos-primera-vez.html');await p.waitForTimeout(900);const ev=(f,a)=>p.evaluate(f,a);
 await ev(()=>{var bv=document.getElementById('bienv');if(bv)bv.remove();var U=S.setup;U.veh=[{n:'Camioneta Uno',pl:'AAA1',plEdo:'Baja California',comb:'Gasolina',img:0,odo:1000}];U.per=[{n:'Danu',puesto:'chofer',tel:'1'}];U.cli=[{n:'Doña Mary',a:'x',tel:'1',dias:[0,1,2,3,4,5,6],cred:0,vac:0,ch:'0'},{n:'Don Beto',a:'y',tel:'2',dias:[0,1,2,3,4,5,6],cred:0,vac:0,ch:'0'}];U.prov=[];S.precio.R=275;S.precio.M=20;suAplicar();_pin.modo=null;
  var D=S.choferes.filter(c=>c.n==='Danu')[0];S.chofHoy=D.id;chCambiar(D.id);S.vehHoy=S.veh[0].id;S.tutVisto={rep:true,admin:true};S.role='rep';S.pinOk[pinKey()]=true;S.pinOk['c:'+D.id]=true;S.salida.ok=true;
  S.log.push({c:S.cli[0].id,R:2,M:0,pr:275,pm:20,total:550,pago:550,abono:0,V:0,t:'10:00'});S.cierre.sent=false;S.cierre.odoIni=null;S.cierre.odo=1040;S.stops.push({c:999999});S.rutaDia80=iso(new Date(TODAY.getTime()-864e5));S.tab.rep='ruta';render();
  document.querySelector('[data-act="dia80c"]').click();
  var px=function(n){var c=document.createElement('canvas');c.width=8;c.height=8;var g=c.getContext('2d');g.fillStyle='rgb('+n+',90,120)';g.fillRect(0,0,8,8);return c.toDataURL('image/jpeg')};S.salida.fotosFin=S.salida.fotosFin||{};['odo','gas','frente','atras','izq','der'].forEach(function(f,i){S.salida.fotosFin[f]=px(40+i*30)});render()});
 const campo=await ev(()=>!!document.getElementById('odoIni181'));
 ok(campo,'sin odómetro de salida: el cierre pide "Odómetro con el que SALIÓ"');
 for(let i=0;i<20;i++){
  const fin=await ev(()=>S.tab.rep!=='cierre'||S.cierre.sent);if(fin)break;
  await ev(()=>{var m=document.querySelector('main');var oi=document.getElementById('odoIni181');if(oi&&!oi.value){oi.value='1000';oi.dispatchEvent(new Event('input',{bubbles:true}));oi.dispatchEvent(new Event('change',{bubbles:true}))}
   var b5=document.getElementById('efb500');var _x=0;if(b5&&!b5.closest('.wz-hide')&&!S.cierre.billOn){var ef=num(cierreRes().efectivo);b5.value=String(Math.floor(ef/500));b5.dispatchEvent(new Event('input',{bubbles:true}));b5.dispatchEvent(new Event('change',{bubbles:true}));var mo=document.getElementById('efbmon');if(mo){mo.value=String(r2(ef-Math.floor(ef/500)*500));mo.dispatchEvent(new Event('input',{bubbles:true}));mo.dispatchEvent(new Event('change',{bubbles:true}))}}
   [...m.querySelectorAll('input')].forEach(function(i){if(!i.offsetParent||i.type==='file'||i.closest('.wz-hide'))return;if(!i.value){i.value='0';i.dispatchEvent(new Event('input',{bubbles:true}));i.dispatchEvent(new Event('change',{bubbles:true}))}})});
  await p.waitForTimeout(100);
  await ev(async()=>{var vis=[...document.querySelectorAll('[data-act]')].filter(x=>x.offsetParent&&!x.closest('.wz-hide'));
   var dlg=[...document.querySelectorAll('[role=dialog],[id$="ov"]')].filter(x=>x.offsetParent||getComputedStyle(x).position==='fixed');
   for(const d of dlg){var bb=[...d.querySelectorAll('button')].filter(x=>/^(Sí|Sí, ya registré todo)/.test(x.textContent.trim()))[0];if(bb){bb.click();return}}
   var e7=vis.filter(x=>x.dataset.act==='ev79'&&/^Sí/.test(x.textContent.trim())&&!S.cierre.ev79)[0];if(e7){e7.click();return}
   var ok=vis.filter(x=>x.dataset.act==='citankok')[0];if(ok){ok.click();return}
   var sig=vis.filter(x=>/^(cipaso|enviar)$/.test(x.dataset.act)&&!/Atrás/.test(x.textContent));var x=sig[sig.length-1];if(x)x.click()});
  await p.waitForTimeout(300)}
 const r=await ev(()=>({tab:S.tab.rep,dia:S.rutaDia80,hoy:iso(TODAY),dia80:!!document.getElementById('dia80'),stops:S.stops.length,hist:(S.rutasHist||[]).some(x=>x.f===iso(new Date(TODAY.getTime()-864e5))&&x.enviado)}));
 ok(r.tab==='ruta'&&r.dia===r.hoy&&!r.dia80&&r.hist,'el cierre de ayer se manda completo (6 pasos) y sale la ruta de hoy',r);await p.close()}
ok(!errsT.length,'sin errores',errsT);console.log(nOK+' OK · '+nF+' FAIL');await b.close()})();
