/* 107 · notas de remisión: serie por chofer que nunca se reinicia (A-0001, A-0002…; otro chofer B-…) */
const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();let nOK=0,nF=0;const ok=(c,m,x)=>{c?nOK++:nF++;console.log((c?'OK   ':'FAIL ')+m+(x!==undefined?' '+JSON.stringify(x).slice(0,400):''))};
const p=await (await b.newContext({viewport:{width:390,height:844}})).newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));await p.addInitScript(()=>{window.__pnTest=1});
await p.goto('file:///mnt/user-data/outputs/platanos-primera-vez.html');await p.waitForTimeout(900);
const r=await p.evaluate(()=>{var U=S.setup;U.veh=[{n:'Camioneta Uno',pl:'AAA1',plEdo:'Baja California',comb:'Gasolina',img:0,odo:1000}];U.per=[{n:'Danu',puesto:'chofer',tel:'1'},{n:'Beto',puesto:'chofer',tel:'2'}];U.cli=[{n:'Cliente Uno',a:'x',tel:'6640000000',dias:[0,1,2,3,4,5,6],cred:0,vac:0,ch:'0'}];U.prov=[];S.precio.R=300;S.precio.M=20;suAplicar();
 var ids=S.choferes.filter(c=>esCh(c)&&!esAdm(c)).map(c=>c.id),out={};
 var nota=function(id){S.chofHoy=id;S.log=S.log||[];S.log.push({c:1,R:1,M:0,total:300,pago:300});var f=folioNota107();S.nota={folio:f,fecha:'hoy',cli:'Cliente Uno',entrego:chofN(id),R:1,M:0,V:0,pr:300,pm:20,total:300,pago:300,abono:0,cred:0};var txt=JSON.stringify(notaItems(S.nota));return {f,enNota:/Nota de remisión No\. [A-Z]+-\d{4}/.exec(txt)&&/Nota de remisión No\. [A-Z]+-\d{4}/.exec(txt)[0],log:S.log[S.log.length-1].folio107}};
 out.d1=nota(ids[0]);out.d2=nota(ids[0]);out.b1=nota(ids[1]);
 /* otro día: la ruta empieza de cero, el número sigue */
 S.log=[];out.d3=nota(ids[0]);out.b2=nota(ids[1]);
 /* el número queda guardado en el chofer (se sube a la nube con los choferes) */
 out.guardado=S.choferes.filter(c=>c.id===ids[0])[0].folio107;out.compartido=NB_SH.indexOf('choferes')>-1;
 /* otro celular sin señal calcula la misma letra */
 var copia=JSON.parse(JSON.stringify(S.choferes));copia.forEach(c=>delete c.serie107);var S0=S.choferes;S.choferes=copia;out.letraOtro=serie107(copia.filter(c=>c.id===ids[1])[0]);S.choferes=S0;
 return out});
ok(r.d1.f==='A-0001'||/^[A-Z]-0001$/.test(r.d1.f),'107 · la primera nota del chofer: su letra y 0001',r.d1.f);
ok(r.d2.f.slice(0,2)===r.d1.f.slice(0,2)&&/0002$/.test(r.d2.f),'107 · la siguiente sigue el consecutivo',r.d2.f);
ok(r.b1.f.slice(0,1)!==r.d1.f.slice(0,1)&&/0001$/.test(r.b1.f),'107 · otro chofer tiene otra letra: nunca se repite el número',r.b1.f);
ok(/0003$/.test(r.d3.f)&&/0002$/.test(r.b2.f),'107 · al otro día NO se reinicia: sigue en 0003 y 0002',[r.d3.f,r.b2.f]);
ok(r.d1.enNota==='Nota de remisión No. '+r.d1.f,'107 · la nota dice "Nota de remisión No. '+r.d1.f+'"',r.d1.enNota);
ok(r.d1.log===r.d1.f,'107 · la entrega se queda con el número de su nota',r.d1.log);
ok(r.guardado===3&&r.compartido,'107 · el consecutivo se guarda en el chofer (se sube a la nube)',r.guardado);
ok(r.letraOtro===r.b1.f.slice(0,1),'107 · otro celular sin señal saca la misma letra para ese chofer',r.letraOtro);
ok(!errs.length,'sin errores de página',errs.slice(0,3));
console.log(nOK+' OK · '+nF+' FAIL');await b.close()})();
