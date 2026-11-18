/* 117 · barra flotante de lo ganado (chofer con comisión): arriba, con avance a la meta; se esconde al cobrar; al tocarla, el detalle */
const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();let nOK=0,nF=0;const ok=(c,m,x)=>{c?nOK++:nF++;console.log((c?'OK   ':'FAIL ')+m+(x!==undefined?' '+JSON.stringify(x).slice(0,400):''))};
const p=await (await b.newContext({viewport:{width:390,height:844}})).newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));await p.addInitScript(()=>{window.__pnTest=1;window.__hora93=12});
await p.goto('file:///mnt/user-data/outputs/prototipo-platanos.html');await p.waitForTimeout(900);const ev=(f,a)=>p.evaluate(f,a);let r;
await ev(()=>{S.role='rep';S.chofHoy=1;S.pinOk['c:1']=true;S.salida.ok=true;S.log=[];S.tab.rep='ruta';var c=chofHoyObj();c.meta.R='20';render();var x=[...document.querySelectorAll('button')].filter(b=>/Después/.test(b.innerText))[0];if(x)x.click();render()});
r=await ev(()=>{var b=document.getElementById('gan117');var rc=b&&b.getBoundingClientRect(),h=document.querySelector('header').getBoundingClientRect();return {hay:!!b,t:b&&b.innerText.replace(/\n/g,' | '),pos:b&&getComputedStyle(b).position,top:rc&&Math.round(rc.top),hb:Math.round(h.bottom),card:!!document.querySelector('main .compill')}});
ok(r.hay&&r.pos==='fixed'&&r.top>=r.hb,'117 · barra fija arriba, debajo del encabezado',r);
ok(/💰 \$0/.test(r.t)&&/0 de 20 cajas/.test(r.t),'117 · dice "💰 $0 hoy · 0 de 20 cajas"',r.t);
ok(!r.card,'117 · la tarjeta verde grande ya no sale en la ruta');
r=await ev(async()=>{window.scrollTo(0,600);await new Promise(r=>setTimeout(r,100));var b=document.getElementById('gan117').getBoundingClientRect();return {top:Math.round(b.top),vis:b.bottom>0}});ok(r.vis&&r.top>=0,'117 · al bajar en la pantalla se queda a la vista',r);
// entrega: se esconde
r=await ev(()=>{S.tab.rep='entrega';render();return !!document.getElementById('gan117')});ok(!r,'117 · en la entrega (donde cobra) se esconde');
// guardó una entrega: sube el "+$" y avanza
r=await ev(async()=>{S.tab.rep='ruta';render();var c=chofHoyObj();S.log.push({R:5,M:0,total:5*num(S.precio.R),pago:5*num(S.precio.R),abono:0,c:S.cli[0].id});render();var f=document.querySelector('[data-x="gan117f"]');var b=document.getElementById('gan117');return {f:f&&f.textContent,t:b.innerText.replace(/\n/g,' | '),w:b.querySelector('.bar i').style.width,hoy:comHoyDe(c)}});
ok(/^\+\$/.test(r.f||'')&&/5 de 20 cajas/.test(r.t)&&r.w==='25%'&&r.hoy>0,'117 · al guardar una entrega: sube el "+$" y la barra avanza (5 de 20 = 25%)',r);
// tocarla: el detalle
r=await ev(()=>{document.getElementById('gan117').click();var o=document.getElementById('gan117ov');return o&&o.innerText});ok(/Hoy llevas ganado/.test(r||'')&&/Esta semana/.test(r||''),'117 · al tocarla se abre el detalle (hoy, semana, meta)',(r||'').slice(0,160));
r=await ev(()=>{document.querySelector('[data-act="gan117x"]').click();return !!document.getElementById('gan117ov')});ok(!r,'117 · "Listo" la cierra');
// minimizar
r=await ev(()=>{document.querySelector('[data-act="gan117min"]').click();var b=document.getElementById('gan117');var a={cls:b.className,t:b.innerText};b.click();return [a,document.getElementById('gan117').className]});
ok(r[0].cls==='min'&&/💰/.test(r[0].t)&&r[1]==='','117 · se puede minimizar a "💰 $X" y volver a abrir',r);
// admin o chofer sin comisión: no sale
r=await ev(()=>{S.role='admin';render();return !!document.getElementById('gan117')});ok(!r,'117 · el admin no la ve');
ok(!errs.length,'sin errores de página',errs.slice(0,3));
console.log(nOK+' OK · '+nF+' FAIL');await b.close()})();
