/* 135 · el tipo de precio de cada producto (del día, mayoreo, precio especial) queda en la entrega y sale en el ticket ("Roatán · 4 cajas a $275 c/u = $1,100"),
   en el Cuadre (Mayoreo y precios especiales), al recibir el cierre (⭐ Precio especial) y en el Historial de cierres. No cambia ninguna cuenta. */
const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();let nOK=0,nF=0;const ok=(c,m,x)=>{c?nOK++:nF++;console.log((c?'OK   ':'FAIL ')+m+(x!==undefined?' '+JSON.stringify(x).slice(0,600):''))};
const p=await (await b.newContext({viewport:{width:390,height:844}})).newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));p.on('dialog',d=>d.accept());await p.addInitScript(()=>{window.__pnTest=1;window.__hora93=11});
await p.goto('file:///mnt/user-data/outputs/platanos-primera-vez.html');await p.waitForTimeout(900);const ev=(f,a)=>p.evaluate(f,a),W=ms=>p.waitForTimeout(ms);let r;
await ev(()=>{var U=S.setup;U.veh=[{n:'Camioneta Uno',pl:'AAA1',plEdo:'Baja California',comb:'Gasolina',img:0,odo:1000}];U.per=[{n:'Danu',puesto:'chofer',tel:'1'}];
 U.cli=[{n:'Doña Mary',a:'x',tel:'6640000001',dias:[0,1,2,3,4,5,6],cred:0,vac:0,ch:'0'},{n:'Lupe',a:'y',tel:'6640000002',dias:[0,1,2,3,4,5,6],cred:0,vac:0,ch:'0'},{n:'Toño',a:'z',tel:'6640000003',dias:[0,1,2,3,4,5,6],cred:0,vac:0,ch:'0'},{n:'Abarrotes Sol',a:'w',tel:'6640000004',dias:[0,1,2,3,4,5,6],cred:0,vac:0,ch:'0'}];
 U.prov=[];S.precio.R=275;S.precio.M=20;suAplicar();var ch=S.choferes.filter(c=>c.n==='Danu')[0];window.__D=ch.id;S.chofHoy=ch.id;S.stops=S.cli.map(c=>({c:c.id}));
 S.role='rep';S.pinOk[pinKey()]=true;S.tutVisto={rep:true};S.salida.ok=true;S.rutaDia80=iso(TODAY);S.inv.reparto=60;S.inv.repartoKg=80;S.cierre.salioR=60;S.cierre.salioM=80;S.cfg.tarCh116='500';
 var c=S.cli;c[1].ppR=250;c[1].ppUna=iso(TODAY);c[3].mayoreo=true;S.mayP={R:240,M:17}});
const vende=async(i,mod)=>{await ev(([i,mod])=>{S.cur=i;resetDraft(cl(S.stops[i].c));S.tab.rep='entrega';S.d.R=4;S.d.M=3;Object.assign(S.d,mod);render()},[i,mod]);
 for(let k=0;k<4;k++){const hay=await ev(()=>{var x=document.querySelector('.entbar [data-act="ent125p"]');if(!x||x.classList.contains('wz-hide'))return false;x.click();return true});if(!hay)break;await W(80)}
 await ev(()=>{var x=document.querySelector('[data-act="entconf"]');if(x)x.click()});await W(150);
 for(let k=0;k<5;k++){const t=await ev(()=>{var y=[].slice.call(document.querySelectorAll('button')).filter(x=>x.getClientRects().length&&!x.closest('main')&&/^(Sí, guardar|Ya le pedí|Sí|Guardar)/.test(x.textContent.trim()))[0];if(!y)return null;var t=y.textContent.trim();y.click();return t});if(!t)break;await W(150)}
 await W(100);return ev(()=>{var l=S.log[S.log.length-1];return {n:S.log.length,l:l,items:notaItems(S.nota).filter(x=>x.t==='kv').map(x=>x.k+' | '+x.v)}})};
/* 1. precio del día */
r=await vende(0,{});ok(r.n===1&&r.l.tR&&r.l.tR.t==='dia'&&r.l.tM&&r.l.tM.t==='dia','precio del día: queda marcado',[r.l.tR,r.l.tM]);
ok(r.items.includes('Roatán · 4 cajas a $275 c/u | $1,100')&&r.items.includes('Macho · 3 kg a $20 el kilo | $60'),'ticket: "Roatán · 4 cajas a $275 c/u = $1,100" y "Macho · 3 kg a $20 el kilo = $60"',r.items);
ok(!r.items.some(x=>/Mayoreo|especial/.test(x)),'precio del día: sin letrero de mayoreo ni especial');
/* 2. precio especial del cliente (solo esta compra) */
r=await vende(1,{M:0});ok(r.l.tR&&r.l.tR.t==='esp'&&r.l.tR.pr===250&&r.l.tR.n===275&&!r.l.tM,'precio especial: marcado con el normal ($275)',r.l.tR);
ok(r.items.includes('Roatán · 4 cajas a $250 c/u | $1,000')&&r.items.includes('   Precio especial | normal $275')&&!r.items.some(x=>/^Macho/.test(x)),'ticket: precio especial y el normal; el macho en 0 ya no sale',r.items);
/* 3. mayoreo que da el chofer */
r=await vende(2,{may:true,R:12,M:0,pRm:'240',pMm:''});ok(r.l.tR&&r.l.tR.t==='mayChofer'&&r.l.pr===240,'mayoreo que dio el chofer: marcado',r.l.tR);
ok(r.items.includes('Roatán · 12 cajas a $240 c/u | $2,880')&&r.items.includes('   Mayoreo (lo dio el chofer) | normal $275'),'ticket: mayoreo y el precio normal',r.items);
/* 4. cliente de mayoreo (precio fijo) */
r=await vende(3,{});ok(r.l.tR&&r.l.tR.t==='mayFijo'&&r.l.pr===240&&r.l.tM&&r.l.tM.t==='mayFijo'&&r.l.pm===17,'cliente de mayoreo: marcado en roatán y macho',[r.l.tR,r.l.tM]);
/* las cuentas no cambian */
r=await ev(()=>S.log.map(l=>[l.R,l.M,l.pr,l.pm,l.total]));ok(JSON.stringify(r)===JSON.stringify([[4,3,275,20,1160],[4,0,250,20,1000],[12,0,240,0,2880],[4,3,240,17,1011]]),'cajas, kilos, precios y totales: los de siempre (el macho en $0 cuando el chofer da mayoreo solo de roatán ya era así)',r);
/* Cuadre */
r=await ev(()=>{S.role='admin';S.pinOk[pinKey()]=true;S.tab.admin='cuadre121';S.cu121p='dia';S.cu121d=iso(TODAY);render();var m=document.querySelector('main');return m.innerText});
ok(/Mayoreo y precios especiales \(4\)/.test(r)&&/Lupe\s*4 cajas a \$250 \(normal \$275\) · Precio especial\s*−\$100/.test(r)&&/Toño\s*12 cajas a \$240 \(normal \$275\) · Mayoreo \(lo dio el chofer\)\s*−\$420/.test(r)&&/Abarrotes Sol\s*3 kg a \$17 \(normal \$20\) · Mayoreo \(cliente de mayoreo\)/.test(r),'Cuadre: a qué cliente le dio mayoreo o precio especial y cuánto menos',(r.match(/Mayoreo y precios especiales[\s\S]{0,500}/)||[''])[0]);
/* Recibir el cierre */
r=await ev(()=>{S.role='rep';S.cierre.res=cierreRes();S.cierre.sent=true;S.cierre.corte=corteDatos();S.role='admin';S.tab.admin='cierreadm';render();var e=document.querySelector('[data-key="esp135"]');return e?e.innerText:''});
ok(/Precio especial/.test(r)&&/Lupe/.test(r)&&/4 cajas a \$250 \(normal \$275\)/.test(r)&&!/Toño/.test(r),'Recibir el cierre: "⭐ Precio especial" con Lupe (el mayoreo sale en su propia tarjeta)',r);
/* Historial de cierres (cada entrega) */
r=await ev(()=>{var h=typeof precioMarca135==='function'?[precioMarca135(S.log[1],'R'),precioMarca135(S.log[2],'R'),precioMarca135(S.log[0],'R')]:null;return h});
ok(r&&/· <b>Precio especial<\/b> \(normal \$275\)/.test(r[0])&&/· <b>Mayoreo \(lo dio el chofer\)<\/b> \(normal \$275\)/.test(r[1])&&r[2]==='','Historial: cada entrega dice si fue mayoreo o precio especial',r);
/* entrega vieja (sin marca) con mayoreo: también sale */
r=await ev(()=>preciosLog135({R:10,M:0,pr:240,pm:20,pnR:275,pnM:20,mayT:'auto'}));ok(r.length===1&&r[0].t==='may'&&r[0].dif===-350,'entrega vieja con mayoreo (sin marca): también se ve',r);
ok(!errs.length,'sin errores',errs);
console.log(nOK+' OK · '+nF+' FAIL');await b.close()})();
