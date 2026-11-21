/* 16 (nueva numeración) · kilometraje imposible (odómetro de salida vacío: 50,593 − 0): no se cuenta en el desgaste, queda el original guardado,
   se corrige desde el Cuadre (su pantalla) y el chofer ya no puede mandar un cierre así. Un cierre normal no se toca. */
const {chromium}=require('playwright');let nOK=0,nF=0;const ok=(c,m,x)=>{c?nOK++:nF++;console.log((c?'OK   ':'FAIL ')+m+(x!==undefined?' '+JSON.stringify(x).slice(0,350):''))};
(async()=>{const b=await chromium.launch();const errs=[];
for(const arch of ['prototipo-platanos.html','platanos-primera-vez.html']){
const p=await (await b.newContext({viewport:{width:412,height:900}})).newPage();p.on('pageerror',e=>errs.push(e.message));p.on('dialog',d=>d.accept());
await p.addInitScript(()=>{window.__pnTest=1;window.__hora93=9});await p.goto('file:///mnt/user-data/outputs/'+arch);await p.waitForTimeout(1200);const ev=(f,a)=>p.evaluate(f,a);let r;
await ev(()=>{var bv=document.getElementById('bienv');if(bv)bv.remove();if(S.setup&&!S.setup.fin){var U=S.setup;U.veh=[{n:'Nissan Np300 2025',pl:'AAA1',plEdo:'Baja California',comb:'Gasolina',img:0,odo:50437}];U.per=[{n:'Danu',puesto:'chofer',tel:'1'}];U.cli=[{n:'Doña Mary',a:'x',tel:'1',dias:[0,1,2,3,4,5,6],cred:0,vac:0,ch:'0'}];U.prov=[];S.precio.R=275;S.precio.M=20;suAplicar();_pin.modo=null}S.tutVisto={rep:true,admin:true}});
const ay=await ev(()=>iso(new Date(TODAY.getTime()-864e5)));
/* el cierre del viernes: 50,593 km guardados */
r=await ev(ay=>{var D=S.choferes.filter(c=>esCh(c))[0],vh=S.veh[0];vh.desg=0.7;S.rutasHist=S.rutasHist||[];S.rutasHist.push({f:ay,ch:+D.id,log:[{c:S.cli[0].id,R:2,M:0,pr:275,total:550,pago:550,abono:0}],res:{R:2,M:0,total:550,efectivo:550,km:50593,veh68:vh.id,tasa68:0.7},enviado:true,t16:1});
 var antes=JSON.stringify(S.rutasHist.filter(e=>e.t16)[0].log);var c0=cuadreDia121(ay);
 S.role='admin';S.tab.admin='cuadre121';render();var e=S.rutasHist.filter(e=>e.t16)[0];var c1=cuadreDia121(ay);
 return {d0:Math.round(c0.desg||(c0.T&&c0.T.desg)||0),km0:c0.km||(c0.T&&c0.T.km),d1:Math.round(c1.desg||(c1.T&&c1.T.desg)||0),km1:c1.km||(c1.T&&c1.T.km),res:e.res,log:JSON.stringify(e.log)===antes,hist:S.hist.some(h=>/traía 50,593 km/.test(h.x)),aviso:(document.querySelector('[data-x="km16"]')||{}).innerText||''}},ay);
ok(r.res.km===0&&r.res.km16&&r.res.km16.orig===50593,arch+' · el cierre con 50,593 km ya no cuenta km (0) y el número original queda guardado',r.res);
ok(r.log&&r.hist,arch+' · no toca las ventas de ese cierre y queda en el historial',{log:r.log,hist:r.hist});
ok(/Kilometraje por corregir/.test(r.aviso)&&/50,593 km/.test(r.aviso),arch+' · en el Cuadre sale "⚠️ Kilometraje por corregir"',r.aviso);
/* la pantalla de corregir */
r=await ev(()=>{document.querySelector('[data-x="km16"] [data-act="km16"]').click();var m=document.querySelector('main').innerText;var lle=(document.getElementById('km16lle')||{}).value;return {tab:S.tab.admin,lle,m:m.slice(0,300),dis:document.querySelector('[data-act="km16ok"]').disabled}});
ok(r.tab==='km16'&&String(r.lle).replace(/,/g,'')==='50593'&&r.dis,arch+' · abre su pantalla con el odómetro de llegada ya puesto; sin el de salida no deja guardar',r);
r=await ev(()=>{var i=document.getElementById('km16sal');i.value='50437';i.dispatchEvent(new Event('input',{bubbles:true}));var t=document.querySelector('[data-x="km16calc"]').innerText;return {t,dis:document.querySelector('[data-act="km16ok"]').disabled}});
ok(/156 km/.test(r.t)&&/\$109\.20/.test(r.t)&&!r.dis,arch+' · con el odómetro de salida 50,437: 156 km y $109.20 de desgaste',r);
r=await ev(ay=>{document.querySelector('[data-act="km16ok"]').click();var e=S.rutasHist.filter(e=>e.t16)[0];var c=cuadreDia121(ay);return {tab:S.tab.admin,km:e.res.km,corr:e.res.km16.corr,orig:e.res.km16.orig,desg:Math.round((c.desg||(c.T&&c.T.desg)||0)*100)/100,hist:S.hist.some(h=>/de 50,593 a 156 km/.test(h.x)),aviso:!!document.querySelector('[data-x="km16"]')}},ay);
ok(r.km===156&&r.orig===50593&&r.corr&&r.desg>=109.19&&r.desg<=109.21,arch+' · al guardar: 156 km, desgaste $109.20 en el Cuadre, el original sigue guardado',r);
ok(r.hist&&!r.aviso&&r.tab==='cuadre121',arch+' · queda en el historial "de 50,593 a 156 km" y el aviso ya no sale',r);
/* el chofer ya no puede mandar un cierre así */
r=await ev(()=>{var D=S.choferes.filter(c=>esCh(c))[0];S.role='rep';S.chofHoy=+D.id;S.pinOk[pinKey()]=true;S.pinOk['c:'+D.id]=true;S.salida.ok=true;S.salida.f7=iso(TODAY);S.rutaDia80=iso(TODAY);S.cierre.sent=false;S.cierre.odoIni='';S.cierre.odo=50593;S.tab.rep='cierre';render();
 var bt=document.createElement('button');bt.dataset.act='enviar';document.querySelector('main').appendChild(bt);bt.click();bt.remove();return {sent:!!S.cierre.sent,campo:!!document.getElementById('odoIni181'),falta:!!S.cierre.odoFalta181}});
ok(!r.sent&&r.campo&&r.falta,arch+' · el chofer sin odómetro de salida no puede mandar: sale "Odómetro con el que SALIÓ"',r);
r=await ev(()=>{S.cierre.odoIni=100;S.cierre.odo=50593;return !!km16Cierre()});ok(r,arch+' · con un odómetro de salida que da más de 1,000 km en un día, tampoco',r);
r=await ev(()=>{S.cierre.odoIni=50437;S.cierre.odo=50593;var x=km16Cierre();var res=cierreRes();return {x,km:res.km,odo:res.odo16,oi:res.odoIni16}});
ok(!r.x&&r.km===156&&r.odo===50593&&r.oi===50437,arch+' · con el odómetro bien (156 km) sí deja, y el cierre guarda sus dos odómetros',r);
/* un cierre normal no se toca */
r=await ev(ay=>{S.role='admin';var D=S.choferes.filter(c=>esCh(c))[0];S.rutasHist.push({f:ay,ch:+D.id,log:[],res:{km:80,veh68:S.veh[0].id},enviado:true,t16b:1});render();var e=S.rutasHist.filter(e=>e.t16b)[0];return {km:e.res.km,k16:!!e.res.km16}},ay);
ok(r.km===80&&!r.k16,arch+' · un cierre normal (80 km) no se toca',r);
await p.close()}
ok(!errs.length,'sin errores',errs);console.log(nOK+' OK · '+nF+' FAIL');await b.close()})();
