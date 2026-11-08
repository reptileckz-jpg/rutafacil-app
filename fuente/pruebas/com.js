const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();let nOK=0,nF=0;const ok=(c,m,x)=>{c?nOK++:nF++;console.log((c?'OK   ':'FAIL ')+m+(x!==undefined?' '+JSON.stringify(x):''))};
const p=await b.newPage({viewport:{width:400,height:880},deviceScaleFactor:2});await p.addInitScript(()=>{window.__pnTest=1;window.open=function(){return null}});const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.goto('file:///mnt/user-data/outputs/prototipo-platanos.html');await p.waitForTimeout(600);const ev=(f,a)=>p.evaluate(f,a),W=ms=>p.waitForTimeout(ms),click=s=>ev(s=>{var e=document.querySelector(s);if(!e)return false;e.click();return true},s);
await ev(()=>{S.popVisto={admin:iso(TODAY),cont:iso(TODAY)};S.precio.conf=iso(TODAY);S.role='rep';S.salida.ok=true;S.inv.reparto=30;S.inv.repartoKg=80;S.cierre.salioR=30;S.cierre.salioM=80;S.tab.rep='ruta';var c=chofHoyObj();c.meta.R='20';render()});await W(300);
let r=await ev(()=>({pill:(document.querySelector('.compill')||{}).innerText,tip:[...document.querySelectorAll('.card.next .comtip')].map(x=>x.innerText)}));
ok(r.pill&&/Hoy llevas ganado/.test(r.pill)&&/Esta semana/.test(r.pill)&&/(vs la pasada|La pasada)/.test(r.pill)&&/3 días/.test(r.pill),'"Hoy llevas", la semana contra la pasada y la racha',r.pill);
ok(r.tip.some(x=>/Esta entrega te deja ~\$/.test(x)),'"Esta entrega te deja ~$"',r.tip);
await p.screenshot({path:'v50/com1.png'});
// entrega de contado: sube lo ganado y sale el +$
let h0=await ev(()=>r2(logCash()*comPct(chofHoyObj())));
await ev(()=>{var i=curStop();S.cur=i;resetDraft(cl(S.stops[i].c));S.d.R=4;S.d.M=0;S.d.V=0;S.d.mode='todo';S.tab.rep='entrega';render()});await W(150);
r=await ev(()=>{var t=document.querySelector('main').innerText;return /Si te paga toda su deuda/.test(t)});ok(r,'en la entrega: "si te paga toda su deuda, ganas $"');
await click('[data-act="entconf"]');await W(150);await click('[data-act="guardar"]');await W(300);
await ev(()=>{S.tab.rep='ruta';render()});await W(120);
r=await ev(()=>({v:num(document.querySelector('.compill').getAttribute('data-v')),fl:!!document.querySelector('.comfloat'),t:(document.querySelector('.comfloat')||{}).textContent}));ok(r.v>h0&&r.fl,'al entregar sube y sale el +$',r);
await p.screenshot({path:'v50/com2.png'});
// a crédito no suma
let v1=r.v;await ev(()=>{var i=curStop();S.cur=i;var c=cl(S.stops[i].c);c.credOk=true;S.permOk[c.id]=iso(TODAY);resetDraft(c);S.d.R=3;S.d.M=0;S.d.V=0;S.d.abono=0;S.d.mode='credito';S.tab.rep='entrega';render()});await click('[data-act="entconf"]');await W(150);await click('[data-act="guardar"]');await W(300);
await ev(()=>{S.nota.waOk=true;S.tab.rep='ruta';render()});await W(150);r=await ev(()=>num(document.querySelector('.compill').getAttribute('data-v')));ok(Math.abs(r-v1)<0.01,'lo fiado no suma comisión',[v1,r]);
// admin: comisión sobre lo cobrado en sueldos
await ev(()=>{S.role='admin';S.tab.admin='gastos';S.gsec='sueldos';S.szOpen=1;render()});await W(200);
r=await ev(()=>({c:!!document.querySelector('[data-sz="1:comC"]'),k:!!document.querySelector('[data-sz="1:comK"]'),chips:document.querySelectorAll('[data-act="commodo"]').length}));ok(r.c&&r.k&&r.chips===2,'en Sueldos: por caja y kilo, con opción de porcentaje',r);
r=await ev(()=>{var c=chofHoyObj(),k=szCalc(c),esp=r2(num(c.sz.cv)*5+num(c.sz.kv)*0.5+sum(S.log,function(l){var f=l.total>0?Math.min(1,l.pago/l.total):0;return (l.R*5+l.M*0.5)*f+num(l.abono)*5/num(S.precio.R)}));return {com:k.com,esp:esp,hoy:k.comHoy}});ok(Math.abs(r.com-r.esp)<0.05,'comisión = $5 por caja y $0.50 por kilo cobrados (lo fiado no cuenta)',r);
r=await ev(()=>{var c=chofHoyObj();var l={R:4,M:0,total:1000,pago:1000,abono:0,mayT:'chofer'};var l2={R:4,M:0,total:1000,pago:1000,abono:0};return [comDeLog(c,l),comDeLog(c,l2)]});ok(r[0]===10&&r[1]===20,'el mayoreo a mano paga la mitad',r);
await ev(()=>document.querySelector('[data-act="commodo"][data-v="pct"]').click());await W(150);
r=await ev(()=>({m:chofHoyObj().sz.comModo,f:!!document.querySelector('[data-sz="1:comP"]'),p:chofHoyObj().sz.comP}));ok(r.m==='pct'&&r.f&&+r.p>0,'se cambia a porcentaje y propone uno equivalente',r);
r=await ev(()=>{var c=chofHoyObj();c.sz.comP='3';return comDeLog(c,{R:4,M:0,total:1000,pago:1000,abono:0,mayT:'chofer'})});ok(r===15,'en porcentaje el mayoreo a mano también paga la mitad',r);
await ev(()=>{var c=chofHoyObj();c.sz.comModo='unidad';render()});
// otro rol no ve nada
await ev(()=>{S.role='rep';S.chofHoy=3;render()});await W(150);ok(await ev(()=>!document.querySelector('.compill')),'un chofer con sueldo fijo no ve motivadores de comisión');
// WhatsApp del negocio en el ticket
r=await ev(()=>notaTxt(S.nota||{cli:'x',folio:1,fecha:'',R:1,M:0,V:0,vacDebe:0,pr:1,pm:1,total:1,pago:1,abono:0,cred:0}));ok(/Pedidos por WhatsApp:/.test(r)&&r.indexOf(S_tel=await ev(()=>S.cfg.tel))>-1,'el ticket dice "Pedidos por WhatsApp" con el número del negocio');
ok(!errs.length,'sin errores',errs);console.log(nOK+' OK · '+nF+' FAIL');await b.close()})();
