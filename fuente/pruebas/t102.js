/* 9.6 · 102 viaje de una sola fruta · 103 que se note que se sumó el desgaste/sueldo · 104 sin destello al desplazar · 105 quitar fotos del vehículo */
const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();let nOK=0,nF=0;const ok=(c,m,x)=>{c?nOK++:nF++;console.log((c?'OK   ':'FAIL ')+m+(x!==undefined?' '+JSON.stringify(x).slice(0,400):''))};
const p=await (await b.newContext({viewport:{width:390,height:844}})).newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));await p.addInitScript(()=>{window.__pnTest=1});
await p.goto('file:///mnt/user-data/outputs/prototipo-platanos.html');await p.waitForTimeout(900);const ev=(f,a)=>p.evaluate(f,a);let r;
await ev(()=>{S.role='admin';S.pinOk[pinKey()]=true;S.popVisto={admin:iso(TODAY)}});
// ---- 102 · "Costo del viaje": una sola fruta, sin nada de la otra
r=await ev(()=>{var base=S.cargas.filter(x=>x.kgR>0)[0];var mk=function(o){var c=JSON.parse(JSON.stringify(base));delete c.cv;Object.assign(c,o);c.id=Math.floor(Math.random()*1e6)+5e5;S.cargas.push(c);return c};
 var txt=function(c,P){var d=document.createElement('div');d.innerHTML=cvPasoHTML(c,P,true);document.body.appendChild(d);var t=d.innerText;d.remove();return t};
 var R=mk({kgM:0,pM:0,vKgM:0}),M=mk({kgR:0,cajas:0,pR:0,kgM:500,pM:12}),A=mk({kgM:300,pM:11});var out={};
 out.R=CVP.map(function(x){return /macho/i.test(txt(R,x[0]))?x[0]:''}).filter(Boolean);
 out.Mventa=txt(M,'venta');out.Aventa=txt(A,'venta');return out});
ok(!r.R.length,'102 · carga solo de roatán: ningún paso de "Costo del viaje" pide o menciona el macho',r.R);
ok(!/roatán/i.test(r.Mventa)&&/Meta de ganancia %/.test(r.Mventa),'102 · carga solo de macho: la meta de ganancia no habla del roatán',r.Mventa.slice(0,200));
ok(/Meta de ganancia \(roatán y macho\)/.test(r.Aventa),'102 · con las dos frutas se sigue preguntando por las dos');
r=await ev(()=>{var c=JSON.parse(JSON.stringify(S.cargas[0]));c.id=777001;c.prog=true;c.est='Por llegar';c.kgR=0;c.cajas=0;c.kgM=0;c.provR='Roly';c.provM='';S.cargas.push(c);S.tab.admin='cargas';S.cOpen=c.id;S.openCarga=c.id;render();
 var h=cargaCard?'' :'';var d=document.createElement('div');try{d.innerHTML=cargaCard(c,true)}catch(e){try{d.innerHTML=cargaDet(c)}catch(e2){d.innerHTML=''}}return d.innerHTML.indexOf('Completar con lo que se compre')>-1?{m:/Kilos de macho/.test(d.innerHTML),r:/Kilos de roatán comprados/.test(d.innerHTML)}:null});
if(r)ok(!r.m&&r.r,'102 · viaje programado solo de roatán: "Completar con lo que se compre" ya no pide kilos de macho',r);else console.log('(sin tarjeta "Completar" a la mano: se revisa en la versión armada)');
// ---- 103 · ✓ y renglón verde
r=await ev(()=>{var c=S.cargas.filter(x=>x.kgR>0&&!(x.kgM>0))[0]||S.cargas.filter(x=>x.cajas>0)[0];c=JSON.parse(JSON.stringify(c));c.id=888001;c.kgM=0;delete c.cv;S.cargas.push(c);var t=function(){var d=document.createElement('div');d.innerHTML=cvPasoHTML(c,'costo',true);document.body.appendChild(d);var x=d.innerText;d.remove();return x};
 c.dsgOn=null;c.suelOn=null;var t0=t();c.dsgOn=true;c.suelOn=true;c.suelM=250;var t1=t();c.dsgOn=false;c.suelOn=false;var t2=t();return {t0,t1,t2,cajas:c.cajas}});
ok(!/Se sumaron/.test(r.t0)&&!/✓/.test(r.t0),'103 · sin contestar todavía: no dice nada');
ok(/✓ Sí, súmalo/.test(r.t1)&&/✓ Se sumaron \$[\d,]+ al costo del viaje · \+\$[\d.,]+ por caja/.test(r.t1),'103 · desgaste: "✓ Sí, súmalo" y "✓ Se sumaron $… al costo del viaje · +$… por caja"',r.t1.split('\n').filter(l=>/✓/.test(l)));
ok(/✓ Se sumaron \$250 al costo del viaje/.test(r.t1),'103 · sueldo: "✓ Se sumaron $250 al costo del viaje"');
ok(/No se suma el desgaste/.test(r.t2)&&/No se suma sueldo/.test(r.t2)&&/✓ No/.test(r.t2),'103 · con "No": "No se suma…" y la palomita en "No"');
r=await ev(()=>{cmNuevo();var m=S.cm;m.R=true;m.cajas='100';m.kgR='2200';m.pR='8';m.veh=String(S.veh[0].id);m.quien='yo';var x=cmX68();x.dOn='si';x.sOn='si';x.sm='300';var d=document.createElement('div');d.innerHTML=cmCostCards68();document.body.appendChild(d);var t=d.innerText;d.remove();S.cm=null;return t});
ok(/✓ Se sumaron \$[\d,]+ al costo del viaje · \+\$[\d.,]+ por caja/.test(r)&&/✓ Se sumaron \$300/.test(r),'103 · también al registrar una carga a mano',r.split('\n').filter(l=>/✓/.test(l)));
// ---- 104 · al desplazar, la página no se repinta en cada movimiento
r=await ev(async()=>{S.role='admin';S.dfTest=1;S.dfMin=true;S.tab.admin='inicio';S.cargas=S.cargas.filter(c=>c.id<5e5);render();window.scrollTo(0,0);await new Promise(r=>setTimeout(r,300));var n=0,mo=new MutationObserver(function(L){L.forEach(function(m){if(m.target===document.documentElement)n++})});mo.observe(document.documentElement,{attributes:true});
 for(var y=0;y<1200;y+=60){window.scrollTo(0,y);await new Promise(r=>setTimeout(r,30))}for(var y2=1200;y2>=0;y2-=60){window.scrollTo(0,y2);await new Promise(r=>setTimeout(r,30))}await new Promise(r=>setTimeout(r,200));mo.disconnect();return n});
ok(r<=3,'104 · desplazando hacia abajo y arriba, la página completa cambia a lo mucho al esconder/mostrar la barra (antes: en cada movimiento)',r);
// ---- 105 · quitar fotos del vehículo (también el dibujo de la app) y de sus papeles
r=await ev(async()=>{var v=S.veh[0];S.vehOpen=null;S.tab.admin='vehiculos';render();var bt=document.createElement('button');bt.dataset.act='vedit';bt.dataset.id=v.id;document.body.appendChild(bt);bt.click();bt.remove();await new Promise(r=>setTimeout(r,50));
 var tiene=!!S.vf&&!!S.vf.foto,btn=null,pap=[];for(var i=0;i<5;i++){S.vfP=i;render();if(!btn)btn=document.querySelector('[data-act="vfquita"][data-k="foto"]');document.querySelectorAll('[data-act="vfquita"]').forEach(function(x){if(x.dataset.k!=='foto'&&pap.indexOf(x.dataset.k)<0)pap.push(x.dataset.k)})}
 if(!btn)return {tiene,btn:false,pap};S.vfP=0;render();btn=document.querySelector('[data-act="vfquita"][data-k="foto"]');if(!btn){for(var j=0;j<5&&!btn;j++){S.vfP=j;render();btn=document.querySelector('[data-act="vfquita"][data-k="foto"]')}}
 btn.click();await new Promise(r=>setTimeout(r,30));var modal=!!S.modal&&/¿Quitar la foto\?/.test(S.modal.t);var okb=document.querySelector('[data-act="vfquitaok"]');if(okb)okb.click();await new Promise(r=>setTimeout(r,30));
 var nula=S.vf&&S.vf.foto===null;var pk=pap[0];if(pk){S.vf[pk]=S.vf[pk]||'data:image/png;base64,xx';S.modal=null;var b2=document.createElement('button');b2.dataset.act='vfquitaok';b2.dataset.k=pk;document.body.appendChild(b2);b2.click();b2.remove()}
 var sv=document.createElement('button');sv.dataset.act='vsave';document.body.appendChild(sv);sv.click();sv.remove();await new Promise(r=>setTimeout(r,60));
 return {tiene,btn:true,pap,modal,nula,guardada:v.foto,papel:pk?v[pk]:'(sin papel)',vf:!!S.vf}});
ok(r.tiene&&r.btn,'105 · al editar un vehículo con foto (o con el dibujo de la app) sale "🗑 Quitar foto"',r);
ok(r.modal&&r.nula,'105 · pregunta "¿Quitar la foto?" y la quita',r);
ok(r.guardada===null,'105 · al guardar se queda sin foto (ya no se le pone un dibujo solo)',r.guardada);
ok(r.pap.length>0&&r.papel===null,'105 · también se pueden quitar las fotos de los papeles (póliza, tarjeta, verificación)',r);
r=await ev(()=>{S.tab.admin='vehiculos';S.vf=null;render();return document.querySelector('main').innerHTML.length>0});ok(r,'105 · la sección Vehículos se dibuja bien con un vehículo sin foto');
ok(!errs.length,'sin errores de página',errs.slice(0,3));
console.log(nOK+' OK · '+nF+' FAIL');await b.close()})();
