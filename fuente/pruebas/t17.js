/* 17 (nueva numeración) · contar por billetes vuelve a ser OPCIONAL por omisión (solo obligatorio si se pone así en Ajustes → Controles). */
const {chromium}=require('playwright');let nOK=0,nF=0;const ok=(c,m,x)=>{c?nOK++:nF++;console.log((c?'OK   ':'FAIL ')+m+(x!==undefined?' '+JSON.stringify(x).slice(0,300):''))};
(async()=>{const b=await chromium.launch();const errs=[];
for(const arch of ['prototipo-platanos.html','platanos-primera-vez.html']){
const p=await (await b.newContext({viewport:{width:412,height:900}})).newPage();p.on('pageerror',e=>errs.push(e.message));p.on('dialog',d=>d.accept());
await p.addInitScript(()=>{window.__pnTest=1;window.__hora93=9});await p.goto('file:///mnt/user-data/outputs/'+arch);await p.waitForTimeout(1200);const ev=(f,a)=>p.evaluate(f,a);let r;
await ev(()=>{var bv=document.getElementById('bienv');if(bv)bv.remove();if(S.setup&&!S.setup.fin){var U=S.setup;U.veh=[{n:'Camioneta Uno',pl:'AAA1',plEdo:'Baja California',comb:'Gasolina',img:0,odo:1000}];U.per=[{n:'Danu',puesto:'chofer',tel:'1'}];U.cli=[{n:'Doña Mary',a:'x',tel:'1',dias:[0,1,2,3,4,5,6],cred:0,vac:0,ch:'0'}];U.prov=[];S.precio.R=275;S.precio.M=20;suAplicar();_pin.modo=null}
 var D=S.choferes.filter(c=>esCh(c))[0];S.chofHoy=+D.id;try{chCambiar(+D.id)}catch(e){}S.role='rep';S.tutVisto={rep:true,admin:true};S.pinOk[pinKey()]=true;S.pinOk['c:'+D.id]=true;S.salida.ok=true;S.salida.f7=iso(TODAY);S.rutaDia80=iso(TODAY);S.cierre.sent=false;S.cierre.odoIni=1000;S.cierre.odo=1050;
 S.log=[{c:S.cli[0].id,R:2,M:0,pr:275,total:550,pago:550,abono:0,V:0}];delete S.cfg.bill153});
const paso=()=>ev(()=>{S.tab.rep='cierre';S.cierreP=4;render();var m=document.querySelector('main').innerText;var campo=!!document.getElementById('efent');var bt=document.createElement('button');bt.dataset.act='cipaso';bt.dataset.v='5';document.querySelector('main').appendChild(bt);var t0=S.cierreP;bt.click();bt.remove();
 return {campo:campo,opcional:/opcional/.test(m),obl:billObl153(),falta:bill153Falta(),pasa:S.cierreP!==4||t0!==4}});
r=await paso();ok(!r.obl&&!r.falta&&r.campo&&r.opcional,arch+' · por omisión es opcional: sale "Entrego $" y "Contar por billetes · opcional", y deja seguir sin contar',r);
r=await ev(()=>{S.role='admin';S.aj=true;render();var h=ajHTML();var m=/data-v="opc" aria-pressed="true"/.test(h);var bt=document.createElement('button');bt.dataset.act='bill153';bt.dataset.v='obl';document.body.appendChild(bt);bt.click();bt.remove();var h2=ajHTML();return {marcaOpc:m,cfg:S.cfg.bill153,marcaObl:/data-v="obl" aria-pressed="true"/.test(h2)}});
ok(r.marcaOpc&&r.cfg==='obl'&&r.marcaObl,arch+' · en Ajustes sale marcado "Opcional"; si lo pones "Obligatorio", se guarda y se marca',r);
r=await ev(()=>{S.role='rep';return {obl:billObl153(),falta:bill153Falta()}});ok(r.obl&&/Cuenta tus billetes/.test(r.falta),arch+' · si se pone obligatorio, sí lo pide (como antes)',r);
r=await ev(()=>{S.role='admin';var bt=document.createElement('button');bt.dataset.act='bill153';bt.dataset.v='opc';document.body.appendChild(bt);bt.click();bt.remove();S.role='rep';return {cfg:S.cfg.bill153,obl:billObl153()}});
ok(r.cfg==='opc'&&!r.obl,arch+' · y se puede regresar a opcional',r);
await p.close()}
ok(!errs.length,'sin errores',errs);console.log(nOK+' OK · '+nF+' FAIL');await b.close()})();
