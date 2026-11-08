const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:390,height:844}});p.on('pageerror',e=>console.log('PE',e.message));
await p.goto('file:///mnt/user-data/outputs/platanos-primera-vez.html');await p.waitForTimeout(700);const ev=(f,a)=>p.evaluate(f,a);
await ev(()=>{var bv=document.getElementById('bienv');if(bv)bv.remove();suAplicar();_pin.modo=null;S.role='rep';S.chofHoy=S.choferes.filter(c=>!esAdm(c))[0].id;S.salida.ok=true;S.pinOk[pinKey()]=true;S.rp={cli:'__nuevo',R:'',M:'',nota:'',cuando:'hoy'};S.tab.rep='ruta';render()});await p.waitForTimeout(300);
console.log(await ev(()=>JSON.stringify({rp:!!S.rp,inr:ruta().indexOf("rpsave"),inV:VIEWS.ruta().indexOf("rpsave"),dom:!!document.querySelector("[data-act=rpsave]"),tut:S.tut,ovs:[...document.querySelectorAll('[role=dialog],[id$=ov]')].map(x=>x.id||x.getAttribute('aria-label')),main:document.querySelector('main').innerText.slice(0,300)})));await b.close()})();
