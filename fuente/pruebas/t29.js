/* 29 · el PIN se puede escribir con el teclado (web) */
const {chromium}=require('playwright');let nOK=0,nF=0;const ok=(c,m,x)=>{c?nOK++:nF++;console.log((c?'OK   ':'FAIL ')+m+(x!==undefined?' '+JSON.stringify(x).slice(0,300):''))};
(async()=>{const b=await chromium.launch();const errs=[];
const p=await (await b.newContext({viewport:{width:1280,height:900}})).newPage();p.on('pageerror',e=>errs.push(String(e)));await p.addInitScript(()=>{window.__pnTest=1});
await p.goto('file:///mnt/user-data/outputs/prototipo-platanos.html');await p.waitForTimeout(1100);const ev=(f,a)=>p.evaluate(f,a);let r;
await ev(()=>{S.role='admin';S.encOn=false;S.popVisto={admin:iso(TODAY)};S.tutVisto={admin:true,rep:true};S.pinOk={};_pin={v:'',modo:'entrar',cb:null,k:pinKey()};render()});
r=await ev(()=>!!document.getElementById('pinov'));ok(r,'sale la pantalla del PIN');
await p.keyboard.press('1');await p.keyboard.press('2');r=await ev(()=>_pin.v);ok(r==='12','los números del teclado escriben',r);
await p.keyboard.press('Backspace');r=await ev(()=>_pin.v);ok(r==='1','Retroceso borra',r);
await p.keyboard.press('2');await p.keyboard.press('3');await p.keyboard.press('4');await p.waitForTimeout(300);
r=await ev(()=>({abierto:!!document.getElementById('pinov'),ok:!!S.pinOk[pinKey()]}));ok(!r.abierto&&r.ok,'con 1234 entra',r);
ok(!errs.length,'sin errores',errs);console.log(nOK+' OK · '+nF+' FAIL');await b.close()})();
