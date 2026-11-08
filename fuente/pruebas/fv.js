const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();let nOK=0,nF=0;const ok=(c,m,x)=>{c?nOK++:nF++;console.log((c?'OK   ':'FAIL ')+m+(x!==undefined?' '+JSON.stringify(x):''))};
const p=await b.newPage({viewport:{width:390,height:844}});await p.addInitScript(()=>{window.__pnTest=1});const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.goto('file:///mnt/user-data/outputs/prototipo-platanos.html');await p.waitForTimeout(600);const ev=(f,a)=>p.evaluate(f,a),W=ms=>p.waitForTimeout(ms);
const img=require('fs').readFileSync('v50/n0.png');
let chooser=0;p.on('filechooser',()=>chooser++);
// ticket de gasolina
await ev(()=>{S.popVisto={admin:iso(TODAY),cont:iso(TODAY)};S.role='rep';S.salida.ok=true;S.tab.rep='ruta';S.gxSheet=true;S.gxFuel=true;render()});await W(300);
await p.setInputFiles('#rcf',{name:'t.png',mimeType:'image/png',buffer:img});await W(800);
let c0=chooser;await p.click('img[alt="Ticket de gasolina"]');await W(300);
let r=await ev(()=>({ov:!!document.getElementById('fotov'),otra:!!document.querySelector('#fotov .fvotra')}));ok(r.ov&&r.otra&&chooser===c0,'ticket de gasolina: al tocar la foto se ve en grande (no abre la cámara)',{r:r,chooser:chooser-c0});
await p.screenshot({path:'v50/fv1.png'});
const [fc]=await Promise.all([p.waitForEvent('filechooser',{timeout:3000}).catch(()=>null),p.click('#fotov .fvotra')]);ok(!!fc&&await ev(()=>!document.getElementById('fotov')),'"Tomar otra" abre la cámara para reemplazarla');
// cambio de fruta (foto dentro de la etiqueta)
await ev(()=>{S.gxSheet=false;var i=curStop();S.cur=i;resetDraft(cl(S.stops[i].c));S.tab.rep='entrega';S.dOpen.entmas=true;S.dOpen.cambio=true;S.cbx={R:1,M:'',foto:null};render()});await W(300);
await p.setInputFiles('#cbF',{name:'c.png',mimeType:'image/png',buffer:img});await W(800);
c0=chooser;r=await ev(()=>{var l=document.querySelector('label[for="cbF"]'),i=l&&l.querySelector('img');var im=i||document.querySelector('img[src^="data:"][alt*="ruta"],img[src^="data:"][alt*="ambio"]');if(!im)return 'sin img';im.click();return !!document.getElementById('fotov')});ok(r===true&&chooser===c0,'cambio de fruta: también se ve la foto',r);
await ev(()=>{var o=document.getElementById('fotov');if(o)o.remove()});
ok(!errs.length,'sin errores',errs);console.log(nOK+' OK · '+nF+' FAIL');await b.close()})();
