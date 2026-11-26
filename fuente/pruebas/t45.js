/* 45 · impresora de tickets lista: una sola tarjeta (sin "muy pronto"), buscar, escoger, prueba, y "Imprimir después de cada entrega" sin imprimir doble */
const {chromium}=require('playwright');let nOK=0,nF=0;const ok=(c,m,x)=>{c?nOK++:nF++;console.log((c?'OK   ':'FAIL ')+m+(x!==undefined?' '+JSON.stringify(x).slice(0,350):''))};
(async()=>{const b=await chromium.launch();const errs=[];
const p=await (await b.newContext({viewport:{width:412,height:900}})).newPage();p.on('pageerror',e=>errs.push(String(e)));p.on('dialog',d=>d.accept());
await p.addInitScript(()=>{window.__pnTest=1;window.__imp=[];window.Capacitor={Plugins:{RutaNativa:{btLista:()=>Promise.resolve({lista:[{nombre:'PT-210',mac:'AA:BB'}]}),btImprimir:(o)=>{window.__imp.push(o);return Promise.resolve({})}}}}});
await p.goto('file:///mnt/user-data/outputs/prototipo-platanos.html');await p.waitForTimeout(1100);const ev=(f,a)=>p.evaluate(f,a);let r;
const clic=(act,extra)=>ev(([act,extra])=>{var d=document.createElement('button');d.dataset.act=act;Object.assign(d.dataset,extra||{});document.body.appendChild(d);d.click();d.remove()},[act,extra]);
for(const rol of ['admin','rep']){
 r=await ev((rol)=>{S.tutVisto={admin:true,rep:true};S.popVisto={admin:iso(TODAY)};S.role=rol;S.pinOk[pinKey()]=true;if(rol==='rep'){S.chofHoy=1;S.pinOk['c:1']=true}S.aj=true;S.impr=null;S.imprLista=null;var h=ajHTML()||'';return {muy:/muy pronto|Se activa en la app final/.test(h),n:(h.match(/Impresora de tickets/g)||[]).length,buscar:/Buscar impresoras/.test(h),viejo:/data-k="ajimpr"/.test(h)}},rol);
 ok(!r.muy&&r.n===1&&!r.viejo,rol+': una sola tarjeta de impresora, sin "muy pronto"',r);
 if(r.n)ok(r.buscar,rol+': la tarjeta tiene "Buscar impresoras"',r);
}
await ev(()=>{S.role="admin";S.aj=true;render()});
await clic('imprbusca');await p.waitForTimeout(150);
r=await ev(()=>{var h=ajHTML();return {lista:S.imprLista,boton:/data-act="imprpon" data-mac="AA:BB"/.test(h)}});
ok(r.lista&&r.lista.length===1&&r.boton,'"Buscar impresoras" muestra las emparejadas para escogerla',r);
await clic('imprpon',{mac:'AA:BB',nom:'PT-210'});
r=await ev(()=>{var h=ajHTML();return {mac:S.impr&&S.impr.mac,ok:imprOk(),est:/✓ PT-210/.test(h),prueba:/data-act="imprprueba"/.test(h)}});
ok(r.mac==='AA:BB'&&r.ok&&r.est&&r.prueba,'al escogerla: "✓ PT-210" y aparece "Imprimir prueba"',r);
await clic('imprprueba');await p.waitForTimeout(150);r=await ev(()=>window.__imp.length);ok(r===1,'"Imprimir prueba" manda el ticket a la impresora',r);
/* automática */
await clic('ajimpa',{v:'1'});
r=await ev(async()=>{window.__imp=[];S.aj=false;S.role='rep';S.chofHoy=1;S.pinOk[pinKey()]=true;S.pinOk['c:1']=true;S.salida.ok=true;S.salida.f7=iso(TODAY);S.rutaDia80=iso(TODAY);S.cierre.sent=false;S.inv.reparto=30;S.inv.repartoKg=120;S.cur=0;resetDraft(cl(Array.from(S.stops)[0].c));S.tab.rep='entrega';render();var n0=S.log.length;
 for(let i=0;i<12;i++){var v=[...document.querySelectorAll('button')].filter(x=>x.offsetParent&&/^(Siguiente|Revisar y guardar|Sí, guardar|Guardar entrega|Ya le pedí|Sí)/.test(x.textContent.trim()));if(!v.length)break;v[v.length-1].click();await new Promise(r=>setTimeout(r,200));if(S.log.length>n0)break}
 await new Promise(r=>setTimeout(r,400));var a=window.__imp.length;var n=S.nota;if(n)n.tel='5512345678';window.open=()=>null;for(const act of ['tkwa','tknowa']){var w=document.createElement('button');w.dataset.act=act;document.body.appendChild(w);w.click();w.remove();await new Promise(r=>setTimeout(r,400))}var t1=window.__imp.length;
 var w2=document.createElement('button');w2.dataset.act='tkprint';document.body.appendChild(w2);w2.click();w2.remove();await new Promise(r=>setTimeout(r,300));
 return {guardo:S.log.length>n0,auto:a,total:t1,otra:window.__imp.length-t1,wa:!!(n&&n.waOk)}});
ok(r.guardo&&r.auto===1,'"Imprimir después de cada entrega": al guardar sale el ticket solo',r);
ok(r.total===1&&r.wa,'si luego se manda por WhatsApp, no se imprime otra vez',r);
ok(r.otra===1,'"Imprimir" a propósito sí saca otra copia',r);
ok(!errs.length,'sin errores',errs);console.log(nOK+' OK · '+nF+' FAIL');await b.close()})();
