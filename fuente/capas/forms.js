const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:400,height:880}});
const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.goto('file:///mnt/user-data/outputs/prototipo-platanos.html');await p.waitForTimeout(400);
await p.evaluate(()=>{S.popVisto={admin:iso(TODAY),cont:iso(TODAY)};S.precio.conf=iso(TODAY);window.__snap=JSON.stringify(S)});
const L=[
 ['entrega','S.role="rep";S.salida.ok=true;S.inv.reparto=80;S.inv.repartoKg=200;S.tab.rep="entrega"'],
 ['cierre','S.role="rep";S.salida.ok=true;S.tab.rep="cierre"'],
 ['gasto','S.role="rep";S.salida.ok=true;S.tab.rep="ruta";S.gxSheet=true'],
 ['carga','S.role="admin";S.tab.admin="cargas";cmNuevo()'],
 ['viaje','S.role="admin";S.tab.admin="cargas";vwNuevo(null)'],
 ['clinuevo','S.role="rep";S.salida.ok=true;S.tab.rep="ruta";S.d=S.d||{};'],
 ['clieditar','S.role="admin";S.tab.admin="clientes";S.openCli=1;S.cliEdit=1'],
 ['vehform','S.role="admin";S.tab.admin="vehiculos";S.vf=VBLANK();S.vfId=null'],
 ['local','S.role="local";S.tab.local="local"'],
 ['bodega','S.role="admin";S.tab.admin="bodega"'],
 ['salida','S.role="rep";S.salida.ok=false;S.tab.rep="ruta"'],
];
for(const [n,js] of L){try{await p.evaluate((js)=>{S=JSON.parse(window.__snap);eval(js);render();window.scrollTo(0,0)},js);await p.waitForTimeout(250);
 const h=await p.evaluate(()=>{var o=document.querySelector('#cmov,#vwov');return o?o.scrollHeight:document.documentElement.scrollHeight});
 if(await p.evaluate(()=>!!document.querySelector('#cmov,#vwov'))){await p.setViewportSize({width:400,height:Math.min(h,3000)});await p.waitForTimeout(150)}
 await p.screenshot({path:'v39/forms/'+n+'.png',fullPage:true});await p.setViewportSize({width:400,height:880});console.log(n,h)}catch(e){console.log('ERR',n,e.message.slice(0,100))}}
console.log('errs',errs);await b.close()})();
