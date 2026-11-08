const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();let nOK=0,nF=0;const ok=(c,m,x)=>{c?nOK++:nF++;console.log((c?'OK   ':'FAIL ')+m+(x!==undefined?' '+JSON.stringify(x):''))};
const p=await b.newPage({viewport:{width:390,height:844}});const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.goto('file:///mnt/user-data/outputs/platanos-primera-vez.html');await p.waitForTimeout(700);const ev=(f,a)=>p.evaluate(f,a),W=ms=>p.waitForTimeout(ms);
await ev(()=>{var bv=document.getElementById('bienv');if(bv)bv.remove();suAplicar();_pin.modo=null;S.role='admin';S.pinOk[pinKey()]=true;S.popVisto={admin:iso(TODAY),cont:iso(TODAY)};render()});
// admin: pedido paso a paso con cliente nuevo
await ev(()=>{S.tab.admin='clientes';render()});await W(150);
await ev(()=>document.querySelector('[data-act="pwabre"]').click());await W(100);
let r=await ev(()=>!!document.querySelector('#pwc option[value="__nuevo"]'));ok(r,'admin: "+ Cliente nuevo" en el paso 1');
await ev(()=>{var s=document.getElementById('pwc');s.value='__nuevo';s.dispatchEvent(new Event('change',{bubbles:true}))});await W(50);
await ev(()=>document.querySelector('[data-act="pwpaso"][data-v="1"]').click());await W(50);r=await ev(()=>S.pw.err);ok(/nombre/.test(r||''),'sin nombre: dice qué falta (no se queda callado)',r);
await ev(()=>{S.pw.nn='Tienda Lupita';S.pw.nt='2281112233';render()});await ev(()=>document.querySelector('[data-act="pwpaso"][data-v="1"]').click());await W(50);
await ev(()=>{S.pw.R='5';render()});for(const v of [2,3,4,5]){await ev(v=>{var b=document.querySelector('[data-act="pwpaso"][data-v="'+v+'"]');if(b)b.click()},v);await W(60);await ev(()=>{if(S.pw&&S.pw.paso===4&&S.pw.ch==null){var b=document.querySelector('[data-act="pwset"][data-k="ch"]');if(b)b.click()}})}
await ev(()=>document.querySelector('[data-act="pwreg"]').click());await W(200);
r=await ev(()=>{var c=S.cli.filter(x=>x.n==='Tienda Lupita')[0];var ch=S.pf&&S.pf.ok;var id=c&&c.chofer;return {c:!!c,ok:ch,ped:c&&c.ped,stops:(nbRGet(id,'stops')||[]).filter(s=>s.c===(c&&c.id)).length,pw:S.pw}});ok(r.c&&r.ped&&r.stops===1&&/Se le avisó/.test(r.ok||'')&&!r.pw,'admin: pedido con cliente nuevo, asignado a un chofer y en su ruta',r);
// chofer
await ev(()=>{S.role='rep';S.chofHoy=S.choferes.filter(c=>!esAdm(c))[0].id;S.salida.ok=true;S.pinOk[pinKey()]=true;S.rp={cli:'__nuevo',R:'',M:'',nota:'',cuando:'hoy'};S.tab.rep='ruta';render()});await W(200);
await ev(()=>document.querySelector('[data-act="rpsave"]').click());await W(150);r=await ev(()=>S.rp&&S.rp.err);ok(/nombre/.test(r||''),'chofer: dice qué falta',r);
await ev(()=>{S.rp.nn='Abarrotes Pepe';S.rp.R='3';render();document.querySelector('[data-act="rpsave"]').click()});await W(200);
r=await ev(()=>{var c=S.cli.filter(x=>x.n==='Abarrotes Pepe')[0];return {c:!!c,rp:S.rp,stop:c&&S.stops.some(s=>s.c===c.id)}});ok(r.c&&!r.rp&&r.stop,'chofer: pedido con cliente nuevo queda en su ruta',r);
ok(!errs.length,'sin errores',errs);console.log(nOK+' OK · '+nF+' FAIL');await b.close()})();
