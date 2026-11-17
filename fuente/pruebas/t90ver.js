/* la versión de arriba es la del APK (1.0.N), leída del celular */
const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const p=await (await b.newContext()).newPage();
await p.addInitScript(()=>{window.__pnTest=1;window.Capacitor={Plugins:{App:{getInfo:()=>Promise.resolve({version:'1.0.40'})}}}});
await p.goto('file:///mnt/user-data/outputs/platanos-primera-vez.html');await p.waitForTimeout(1200);
const v=await p.evaluate(()=>{var U=S.setup;U.veh=[{n:'NP300',pl:'A1',plEdo:'Baja California',comb:'Gasolina',img:0,odo:1}];U.per=[{n:'Danu',puesto:'chofer',tel:'1'}];U.cli=[];U.prov=[];S.precio.R=300;S.precio.M=20;suAplicar();S.role='admin';S.pinOk[pinKey()]=true;render();return [...document.querySelectorAll('.lbl')].map(x=>x.textContent).filter(t=>/Control de reparto/.test(t)).join(' | ')});console.log(/v1\.0\.40/.test(v)?'1 OK · 0 FAIL':'0 OK · 1 FAIL',v);await b.close()})();
