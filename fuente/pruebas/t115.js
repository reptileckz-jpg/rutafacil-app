/* 115 · el cobro en la entrega: "A cobrar" abajo (entrega + abono), desglose, billetes según el monto, "Lo que ya debía", buró al fiar, cajas con saldo; el dinero cuadra */
const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();let nOK=0,nF=0;const ok=(c,m,x)=>{c?nOK++:nF++;console.log((c?'OK   ':'FAIL ')+m+(x!==undefined?' '+JSON.stringify(x).slice(0,400):''))};
const p=await (await b.newContext({viewport:{width:390,height:844}})).newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));await p.addInitScript(()=>{window.__pnTest=1});
await p.goto('file:///mnt/user-data/outputs/platanos-primera-vez.html');await p.waitForTimeout(900);const ev=(f,a)=>p.evaluate(f,a);let r;
await ev(()=>{var U=S.setup;U.veh=[{n:'Camioneta Uno',pl:'AAA1',plEdo:'Baja California',comb:'Gasolina',img:0,odo:1000}];U.per=[{n:'Danu',puesto:'chofer',tel:'1'}];U.cli=[{n:'Doña Mary',a:'x',tel:'6640000001',dias:[0,1,2,3,4,5,6],cred:0,vac:0,ch:'0'}];U.prov=[];S.precio.R=275;S.precio.M=20;suAplicar();
 var id=S.choferes.filter(c=>c.n==='Danu')[0].id;S.pinOk[pinKey()]=true;S.pinOk['c:'+id]=true;S.role='rep';S.chofHoy=id;chCambiar(id);S.vehHoy=S.veh[0].id;S.tab.rep='ruta';render();var bv=document.querySelector('[data-act="bienvgo"]');if(bv)bv.click();S.salida.ok=true;S.inv.reparto=20;
 var c=S.cli[0];c.cred=1000;c.credDesde=iso(TODAY);c.vac=4;c.vacDesde=iso(TODAY);c.credOk=true;S.stops=[{c:c.id}];S.cur=0;S.tab.rep='entrega';resetDraft(c);S.d.R=4;S.d.V=4;render()});
const bar=()=>ev(()=>{var b=document.querySelector('#entbt');return b&&b.innerText.replace(/\n/g,' | ')});
r=await bar();ok(/A cobrar en efectivo/.test(r)&&/\$1,100/.test(r)&&/Queda debiendo \$1,000/.test(r),'115 · abajo: "A cobrar en efectivo $1,100 · Queda debiendo $1,000" (antes decía "Total")',r);
r=await ev(()=>{if(typeof entPon125==='function')entPon125(1);render();var t=document.querySelector('main').innerText;return {esta:/Esta entrega: \$1,100/.test(t),debia:/Lo que ya debía: \$1,000/.test(t),buro:/Buró:/.test(t),bills:[...document.querySelectorAll('[data-act="entcon"]')].map(x=>x.innerText)}});
ok(r.esta&&r.debia,'115 · "Esta entrega: $1,100" y "Lo que ya debía: $1,000" separados',r);
ok(!r.buro,'115 · si paga todo, el buró no estorba');
ok(JSON.stringify(r.bills)===JSON.stringify(['$1,200','$1,500','$2,000','Exacto']),'115 · billetes según lo que hay que cobrar ($1,100): $1,200, $1,500, $2,000 y Exacto',r.bills);
// abono rápido "La mitad"
r=await ev(()=>{document.querySelector('[data-act="abono115"][data-v="500"]').click();var k=entregaCalc();return {ab:k.abono,bar:document.querySelector('#entbt').innerText.replace(/\n/g,' | '),bills:[...document.querySelectorAll('[data-act="entcon"]')].map(x=>x.innerText)}});
ok(r.ab===500&&/\$1,600/.test(r.bar)&&/Queda debiendo \$500/.test(r.bar),'115 · "La mitad ($500)": a cobrar $1,600 y queda debiendo $500',r);
ok(JSON.stringify(r.bills)===JSON.stringify(['$1,700','$2,000','$3,000','Exacto']),'115 · los billetes se acomodan a $1,600',r.bills);
r=await ev(()=>{document.querySelector('[data-act="entcon"][data-v="2000"]').click();var c=document.getElementById('cambio');return c&&c.innerText});
ok(/Dale \$400 de cambio/.test(r||''),'115 · paga con $2,000: "Dale $400 de cambio" en grande',r);
// desglose
r=await ev(()=>{document.querySelector('[data-act="entdesg"]').click();var d=document.getElementById('entdesg');return d&&d.innerText.replace(/\n/g,' | ')});
ok(/Esta entrega \| \$1,100/.test(r)&&/Abono a lo que ya debía \| \+ \$500/.test(r)&&/Total a cobrar \| \$1,600/.test(r)&&/Su deuda queda en \| \$500/.test(r),'115 · al tocar la barra: el desglose renglón por renglón',r);
// a crédito: buró a la vista y "sin cobro"
r=await ev(()=>{document.querySelector('[data-act="abono115"][data-v="0"]').click();document.querySelector('[data-act="mode"][data-m="credito"]').click();return {t:document.querySelector('main').innerText,bar:document.querySelector('#entbt').innerText.replace(/\n/g,' | ')}});
ok(/Buró:/.test(r.t)&&/Sin cobro en esta visita/.test(r.bar)&&/\$0/.test(r.bar)&&/Queda debiendo \$2,100/.test(r.bar),'115 · a crédito: el buró a la vista, "Sin cobro en esta visita · Queda debiendo $2,100"',r.bar);
// cajas vacías con saldo en vivo
r=await ev(()=>{S.d.V=2;render();var v=document.getElementById('vac115');var a=v&&v.innerText.replace(/\n/g,' | ');S.d.V=8;render();var b2=document.getElementById('vac115').innerText.replace(/\n/g,' | ');return [a,b2]});
ok(/Ya debía 4 · le dejas 4 · devuelve 2/.test(r[0])&&/Queda debiendo 6 cajas vacías/.test(r[0])&&/Al corriente/.test(r[1]),'115 · cajas vacías con el saldo en vivo (debe 6 / al corriente)',r);
// guardar: el dinero cuadra (paga todo + liquida)
r=await ev(async()=>{S.d.V=4;S.d.mode='todo';document.querySelector('[data-act="abono115"][data-v="1000"]').click();var c=S.cli[0],ef0=cierreRes().efectivo,cob=cobro115();S.d._deb109='no';S.d._tar72='no';
 document.querySelector('[data-act="entconf"]').click();await new Promise(r=>setTimeout(r,300));var g=document.querySelector('[data-act="guardar"]');if(g)g.click();await new Promise(r=>setTimeout(r,500));return {cob,ef:cierreRes().efectivo-ef0,cred:c.cred,log:S.log.length}});
r.cn=await ev(()=>({cn:S.log[S.log.length-1].cn,id:S.log[S.log.length-1].id}));ok(r.cn.cn==='Doña Mary'&&/^e/.test(r.cn.id||''),'122 · la venta guarda el nombre del cliente de ese momento y su propio número',r.cn);
ok(r.log===1&&r.cob===2100&&Math.abs(r.ef-2100)<0.01&&r.cred===0,'115 · al guardar: el efectivo del chofer sube lo que dijo "A cobrar" ($2,100) y el cliente queda en $0',r);
ok(!errs.length,'sin errores de página',errs.slice(0,3));
console.log(nOK+' OK · '+nF+' FAIL');await b.close()})();
