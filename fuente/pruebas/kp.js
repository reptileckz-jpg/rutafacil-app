const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();let nOK=0,nF=0;const ok=(c,m,x)=>{c?nOK++:nF++;console.log((c?'OK   ':'FAIL ')+m+(x!==undefined?' '+JSON.stringify(x):''))};
const p=await b.newPage({viewport:{width:390,height:844},hasTouch:true});const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.goto('file:///mnt/user-data/outputs/platanos-primera-vez.html');await p.waitForTimeout(900);
await p.evaluate(()=>{var bv=document.getElementById('bienv');if(bv)bv.remove();S.setup.fin=true;S.setup.bienv=true;S.pins['a:'+S.adminYo]='4862';S.role='admin';S.pinOk={};pinEntrar();render()});await p.waitForTimeout(300);
// teclear muy rápido con toques reales
for(const d of '4862'){const bx=await p.evaluate(d=>{var r=document.querySelector('#pinov [data-act="pind"][data-v="'+d+'"]').getBoundingClientRect();return [r.left+r.width/2,r.top+r.height/2]},d);await p.touchscreen.tap(bx[0],bx[1])}
await p.waitForTimeout(400);let r=await p.evaluate(()=>({ov:!!document.getElementById('pinov'),ok:S.pinOk['a:'+S.adminYo]}));ok(!r.ov&&r.ok,'PIN tecleado muy rápido sí entra (sin teclas perdidas ni dobles)',r);
// con mouse (clic normal) no se duplica
await p.evaluate(()=>{if(typeof _pinAuth!=='undefined')_pinAuth={};S.pinOk={};pinEntrar();render()});await p.waitForTimeout(200);
for(const d of '48'){await p.click('#pinov [data-act="pind"][data-v="'+d+'"]');await p.waitForTimeout(60)}
r=await p.evaluate(()=>_pin.v);ok(r==='48','con clic normal cada tecla cuenta una vez',r);
// velocidad: en la demo
const q=await b.newPage();await q.addInitScript(()=>{window.__pnTest=1});await q.goto('file:///mnt/user-data/outputs/prototipo-platanos.html');await q.waitForTimeout(600);
await q.evaluate(()=>{S.velAl={vel:132,lim:120,vn:'NP300'};render()});await q.waitForTimeout(300);
r=await q.evaluate(()=>({btn:!!document.querySelector('[data-act="velok"]'),txt:/Se quita solo/.test(document.body.innerText)}));ok(!r.btn&&r.txt,'el aviso ya no tiene "Ya bajé": se quita solo',r);
await q.waitForTimeout(6500);ok(await q.evaluate(()=>!S.velAl),'al bajar la velocidad se quita solo');
ok(!errs.length,'sin errores',errs);console.log(nOK+' OK · '+nF+' FAIL');await b.close()})();
