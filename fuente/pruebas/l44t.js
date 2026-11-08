const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();let nOK=0,nF=0;const ok=(c,m,x)=>{c?nOK++:nF++;console.log((c?'OK   ':'FAIL ')+m+(x!==undefined?' '+JSON.stringify(x).slice(0,300):''))};
const p=await b.newPage({viewport:{width:390,height:844}});await p.addInitScript(()=>{window.__pnTest=1});const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.goto('file:///mnt/user-data/outputs/prototipo-platanos.html');await p.waitForTimeout(700);const ev=(f,a)=>p.evaluate(f,a),W=ms=>p.waitForTimeout(ms);
await ev(()=>{S.role='admin';S.encOn=false;S.pinOk[pinKey()]=true;_pin={v:'',modo:null};S.popVisto={admin:iso(TODAY)};S.cfg.qrOn=true;S.tab.admin='clientes';S.openCli=S.cli[0].id;render()});await W(200);
ok(await ev(()=>!!document.querySelector('[data-key="cliqr"] svg')),'ficha del cliente: su QR');
await ev(()=>document.querySelector('[data-act="qrpuesto"]').click());await W(50);ok(await ev(()=>!!S.cli[0].qr),'"Ya lo pegué"');
/* corte: verificación */
const r=await ev(()=>{var d={ch:'Danu',f:'2026-11-07',h:'18:00',deb:1500,ent:1400,bill:{b500:2,b200:2},bolsa:'A7',may:[]};d.v=verifCodigo([d.ch,d.f,d.deb,d.ent,d.bolsa,JSON.stringify(d.bill),0].join('|'));var q=corteQR(d);corteVerifica(q);var a=S.modal.m;var mal=q.replace('"ent":1400','"ent":1900');S.modal=null;corteVerifica(mal);return [/coincide/.test(a)&&!/NO coincide/.test(a),/NO coincide/.test(S.modal.m)]});
ok(r[0]&&r[1],'escanear el corte: detecta si lo cambiaron',r);await ev(()=>{S.modal=null;render()});
/* pedido paso a paso */
await ev(()=>{S.openCli=null;S.tab.admin='clientes';render()});await W(100);
const hay=await ev(()=>!!document.querySelector('[data-act="pwabre"]'));ok(hay,'botón "Registrar un pedido"');
if(hay){await ev(()=>document.querySelector('[data-act="pwabre"]').click());await W(100);
 await ev(()=>document.querySelector('[data-act="pwpaso"][data-v="1"]').click());await W(50);ok(await ev(()=>S.pw.paso===0&&/Escoge el cliente/.test(S.pw.err)),'sin cliente no avanza');
 await ev(()=>{var s=document.getElementById('pwc');s.value=String(S.cli[2].id);s.dispatchEvent(new Event('change',{bubbles:true}))});await W(50);
 await ev(()=>document.querySelector('[data-act="pwpaso"][data-v="1"]').click());await W(50);
 await ev(()=>{var i=document.getElementById('pwR');i.value='6';i.dispatchEvent(new Event('input',{bubbles:true}))});
 for(const v of [2,3,4]){await ev(v=>document.querySelector('[data-act="pwpaso"][data-v="'+v+'"]').click(),v);await W(60)}
 let t=await ev(()=>document.getElementById('pwov').innerText);ok(/¿Cabe en la ruta\?/.test(t),'paso "¿Quién?" con "¿Cabe en la ruta?"',(t.match(/¿Cabe en la ruta\?\n[^\n]*/)||[''])[0]);
 await ev(()=>{if(S.pw.ch==null)document.querySelector('[data-act="pwset"][data-k="ch"]').click()});await W(50);await ev(()=>document.querySelector('[data-act="pwpaso"][data-v="5"]').click());await W(60);
 await ev(()=>document.querySelector('[data-act="pwreg"]').click());await W(100);
 ok(await ev(()=>!S.pw&&!!S.cli[2].ped&&S.cli[2].ped.R===6),'pedido registrado y la pantalla se cierra limpia')}
/* modo manejo */
await ev(()=>{S.role='rep';S.chofHoy=1;S.pinOk[pinKey()]=true;S.salida.ok=true;S.tab.rep='ruta';render();window.__t0=Date.now()});
const mj=await ev(()=>{var t=Date.now(),la=19.53,ln=-96.92;var now=Date.now;var fake=t;Date.now=function(){return fake};var pos=function(s){mjPos({coords:{latitude:la,longitude:ln,speed:s}})};
 pos(10);fake+=10000;pos(10);fake+=11000;pos(10);var on=MJ.on;fake+=50000;pos(0.5);fake+=46000;pos(0.5);var off=!MJ.on;Date.now=now;return [on,off]});
ok(mj[0]&&mj[1],'modo manejo: se prende a +15 km/h por 20 s y se apaga parado 45 s',mj);
await ev(()=>{MJ.on=true;render()});await W(50);ok(await ev(()=>!!document.getElementById('mjov')&&/copiloto/.test(document.getElementById('mjov').innerText)),'pantalla de manejo con "Voy de copiloto"');
await ev(()=>document.querySelector('[data-act="mjcopi"]').click());await W(50);ok(await ev(()=>!document.getElementById('mjov')&&S.copiloto===iso(TODAY)),'copiloto: ya no se esconde');
/* llegar cerca */
await ev(()=>{S.copiloto=null;MJ.on=false;var i=curStop(),c=cl(S.stops[i].c);c.lat=19.6;c.lng=-96.9;mjPos({coords:{latitude:19.6003,longitude:-96.9002,speed:0}})});await W(100);
ok(await ev(()=>/Llegaste con/.test(document.querySelector('main').innerText)),'a ~100 m de un cliente ofrece su entrega');
ok(!errs.length,'sin errores',errs);console.log(nOK+' OK · '+nF+' FAIL');await b.close()})();
