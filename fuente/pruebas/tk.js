const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();let nOK=0,nF=0;const ok=(c,m,x)=>{c?nOK++:nF++;console.log((c?'OK   ':'FAIL ')+m+(x!==undefined?' '+JSON.stringify(x):''))};
const p=await b.newPage({viewport:{width:400,height:880}});await p.addInitScript(()=>{window.__pnTest=1;window.__opened=[];window.open=function(u){window.__opened.push(u);return null}});const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.goto('file:///mnt/user-data/outputs/prototipo-platanos.html');await p.waitForTimeout(600);const ev=(f,a)=>p.evaluate(f,a),W=ms=>p.waitForTimeout(ms),click=s=>ev(s=>{var e=document.querySelector(s);if(!e)return false;e.click();return true},s);
await ev(()=>{S.popVisto={admin:iso(TODAY),cont:iso(TODAY)};S.precio.conf=iso(TODAY);window.__snap=JSON.stringify(S)});
const entrega=async(modo,tel)=>{await ev(([modo,tel])=>{S=JSON.parse(window.__snap);S.role='rep';S.salida.ok=true;S.inv.reparto=20;S.inv.repartoKg=50;S.cierre.salioR=20;S.cierre.salioM=50;var i=curStop();S.cur=i;var c=cl(S.stops[i].c);c.tel=tel;c.cred=0;c.credDesde=null;c.buro={n:0,ok:0};S.cfg.crCh='999999';c.credOk=true;S.permOk[c.id]=iso(TODAY);resetDraft(c);S.d.R=2;S.d.M=0;S.d.V=0;S.d._tar72='no';S.d.mode=modo;S.tab.rep='entrega';render()},[modo,tel]);await click('[data-act="entconf"]');await W(150);await click('[data-act="guardar"]');await W(300)};
// pagó todo: no pide nada
await entrega('todo','228 111 2222');r=await ev(()=>({tab:S.tab.rep,card:!!document.getElementById('tkcard')}));ok(r.tab==='nota'&&!r.card,'si pagó todo, no es obligatorio',r);
// a crédito con teléfono
await entrega('credito','228 111 2222');var r=await ev(()=>({tab:S.tab.rep,card:!!document.getElementById('tkcard'),t:(document.getElementById('tkcard')||{}).innerText}));ok(r.card&&/Le quedó a deber/.test(r.t),'a crédito: sale "Mándale su ticket" con lo que debe',r.t);
await p.screenshot({path:'v50/tk1.png'});
await click('[data-act="notaseguir"]');await W(150);ok(await ev(()=>S.tab.rep==='nota'&&/ticket/.test(S.toast)),'no deja seguir la ruta sin mandarlo');
await click('[data-act="tkwa"]');await W(200);r=await ev(()=>({o:window.__opened.slice(-1)[0],ok:S.nota.waOk}));ok(r.ok&&/^https:\/\/wa\.me\/522281112222\?text=/.test(r.o)&&/Cr%C3%A9dito%20pendiente/.test(r.o),'abre el WhatsApp del cliente con su ticket y su deuda',r.o&&r.o.slice(0,60));
await click('[data-act="notaseguir"]');await W(150);ok(await ev(()=>S.tab.rep==='ruta'),'ya mandado, sigue la ruta');
// sin teléfono: lo pide y lo guarda
await entrega('credito','');await click('[data-act="tkwa"]');await W(150);ok(await ev(()=>!S.nota.waOk&&/WhatsApp del cliente/.test(S.toast)),'si no tiene número, lo pide');
await p.fill('#tktel','2289998877');await click('[data-act="tkwa"]');await W(150);r=await ev(()=>({ok:S.nota.waOk,tel:cl(S.log[S.log.length-1].c).tel}));ok(r.ok&&r.tel==='2289998877','manda y guarda el número en el cliente',r);
// sin WhatsApp y sin impresora: aviso al admin
await entrega('credito','');await click('[data-act="tknowa"]');await W(150);r=await ev(()=>({sin:S.nota.sinTk,av:S.avPrecio.slice(-1)[0]}));ok(r.sin&&/SIN ticket/.test(r.av),'sin WhatsApp ni impresora: le llega aviso al admin',r.av);
// con impresora: al mandar también imprime
await entrega('credito','228 111 2222');await ev(()=>{S.impr={papel:'58',auto:false,con:true};render()});await W(100);
r=await ev(()=>document.querySelector('[data-act="tkwa"]').innerText);ok(/imprimir/.test(r),'con impresora: "Mandar por WhatsApp e imprimir"',r);
await click('[data-act="tkwa"]');await W(150);ok(await ev(()=>S.nota.waOk&&S.nota.prOk),'se manda y se imprime');
// ajustes demo
await ev(()=>{S.impr.con=false;S.role='admin';S.aj=true;render()});await W(200);await click('[data-act="imprdemo"]');await W(100);ok(await ev(()=>S.impr.con===true),'en Ajustes se puede simular una impresora conectada');
ok(!errs.length,'sin errores',errs);console.log(nOK+' OK · '+nF+' FAIL');await b.close()})();
