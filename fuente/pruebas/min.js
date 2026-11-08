const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();let nOK=0,nF=0;const ok=(c,m,x)=>{c?nOK++:nF++;console.log((c?'OK   ':'FAIL ')+m+(x!==undefined?' '+JSON.stringify(x):''))};
const p=await b.newPage({viewport:{width:390,height:844}});const errs=[];p.on('pageerror',e=>errs.push(e.message));await p.goto('file:///mnt/user-data/outputs/platanos-primera-vez.html');await p.waitForTimeout(900);
await p.evaluate(()=>{var bv=document.getElementById('bienv');if(bv)bv.remove();S.setup.bienv=true;S.setup.p=1;render()});await p.waitForTimeout(200);
let r=await p.evaluate(()=>['minV','minMad','minKV','minKMad'].map(function(k){return !!document.querySelector('#setov [data-bind="cfg.'+k+'"]')}));ok(r.every(Boolean),'configuración inicial: pregunta con cuántas cajas/kilos avisar',r);
await p.screenshot({path:'v50/min1.png',fullPage:true});
await p.fill('#su_minV','20');await p.fill('#su_minKMad','100');
r=await p.evaluate(()=>{S.inv.verdes=8;S.inv.kgMaduro=60;S.inv.maduras=50;S.inv.kgVerde=500;return avisos().filter(function(x){return /quedan poc/.test(x)})});ok(r.length===2&&/8 cajas/.test(r[0]),'avisa cuando hay poca fruta',r);
ok(!errs.length,'sin errores',errs);console.log(nOK+' OK · '+nF+' FAIL');await b.close()})();
