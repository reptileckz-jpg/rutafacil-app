const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:390,height:844}});
await p.goto('file:///mnt/user-data/outputs/platanos-primera-vez.html');await p.waitForTimeout(700);const ev=(f,a)=>p.evaluate(f,a),W=ms=>p.waitForTimeout(ms);
await ev(()=>{var bv=document.getElementById('bienv');if(bv)bv.remove();suAplicar();_pin.modo=null;S.tutVisto={rep:1,admin:1};S.role='admin';S.pinOk[pinKey()]=true;S.popVisto={admin:iso(TODAY),cont:iso(TODAY)};S.avPrecio=['Dany dio de alta un cliente nuevo: Ruut','URGENTE: Dany pide reabrir su ruta para cargar más. Autorízalo en Inicio.'];S.tab.admin='inicio';render()});await W(400);await p.screenshot({path:'v50/s6_inicio.png'});
await ev(()=>{S.role='rep';S.chofHoy=S.choferes.filter(c=>!esAdm(c))[0].id;S.pinOk[pinKey()]=true;S.bienv=S.bienv||{};S.bienv[S.chofHoy]=1;S.salida.ok=true;S.cierre.sent=true;S.cierre.res=cierreRes();S.ciEnvH='19:40';S.reab={k:'carga',est:'pend',h:'19:41'};S.tab.rep='ruta';render()});await W(400);await p.screenshot({path:'v50/s6_ruta.png'});
await b.close()})();
