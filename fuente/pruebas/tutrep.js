const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();let nOK=0,nF=0;const ok=(c,m,x)=>{c?nOK++:nF++;console.log((c?'OK   ':'FAIL ')+m+(x!==undefined?' '+JSON.stringify(x):''))};
const p=await b.newPage({viewport:{width:390,height:844}});const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.goto('file:///mnt/user-data/outputs/platanos-primera-vez.html');await p.waitForTimeout(900);
await p.evaluate(()=>{var bv=document.getElementById('bienv');if(bv)bv.remove();S.setup.fin=true;S.setup.bienv=true;S.pins['a:'+S.adminYo]='4862';var c=nuevoEmp({n:'Chofer 1',puesto:'chofer'});S.choferes.push(c);S.pins['c:'+c.id]='2580';window.__c=c.id;S.pinOk={};S.pinOk['a:'+S.adminYo]=true;S.role='admin';render()});await p.waitForTimeout(500);
await p.evaluate(()=>{entrarComo(personasEntrar().filter(function(x){return /Chofer 1/.test(x.n)})[0])});await p.waitForTimeout(1200);
let r=await p.evaluate(()=>({pin:!!(_pin&&_pin.modo),tut:!!S.tut}));ok(r.pin&&!r.tut,'con el PIN en pantalla no sale el tutorial',r);
for(const d of '2580'){await p.evaluate(d=>document.querySelector('[data-act="pind"][data-v="'+d+'"]').click(),d);await p.waitForTimeout(40)}
await p.waitForTimeout(1200);r=await p.evaluate(()=>({bv:bienvOn(),tut:!!S.tut}));ok(r.bv&&!r.tut,'en la bienvenida del chofer tampoco',r);
await p.evaluate(()=>{S.salida.ok=true;render()});await p.waitForTimeout(1300);r=await p.evaluate(()=>({bv:bienvOn(),tut:!!S.tut}));ok(!r.bv&&r.tut,'ya en su ruta, sale el tutorial',r);
ok(!errs.length,'sin errores',errs);console.log(nOK+' OK · '+nF+' FAIL');await b.close()})();
