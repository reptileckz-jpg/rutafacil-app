const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();let nOK=0,nF=0;const ok=(c,m,x)=>{c?nOK++:nF++;console.log((c?'OK   ':'FAIL ')+m+(x!==undefined?' '+JSON.stringify(x).slice(0,300):''))};
const p=await b.newPage({viewport:{width:390,height:844}});await p.addInitScript(()=>{window.__pnTest=1;window.__o=[];window.open=function(u){__o.push(u);return null}});const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.goto('file:///mnt/user-data/outputs/prototipo-platanos.html');await p.waitForTimeout(700);const ev=(f,a)=>p.evaluate(f,a),W=ms=>p.waitForTimeout(ms);
await ev(()=>{S.role='admin';S.encOn=false;S.pinOk[pinKey()]=true;_pin={v:'',modo:null};S.tutVisto={rep:true,admin:true};S.precio.conf='2026-01-01';S.popVisto={};S.popI=0;S.tab.admin='inicio';render()});await W(200);
let t=await ev(()=>(document.querySelector('[aria-label="Aviso urgente"]')||{}).innerText||'');ok(/Precio de hoy/.test(t)&&/el de ayer/.test(t),'ventana: precio de ayer',t.slice(0,100));
await ev(()=>document.querySelector('[data-act="precioayer"]').click());await W(100);ok(await ev(()=>S.precio.conf===iso(TODAY)),'"Está bien, el de ayer" lo deja fijo');
/* encargado ±10% */
await ev(()=>{S.precio.hist=[{f:iso(new Date(TODAY.getTime()-2*864e5)),R:250,M:18}];S.encOn=true;S.enc={ch:1,desde:iso(TODAY),hasta:iso(TODAY)};S.precio.R=300;S.popVisto={admin:iso(TODAY)};var x=document.createElement('button');x.dataset.act='precioconf';document.body.appendChild(x);x.click();x.remove()});await W(100);
t=await ev(()=>S.modal&&S.modal.t);ok(t==='¿Seguro de ese precio?','encargado: precio 20% arriba pregunta',t);
await ev(()=>document.querySelector('[data-act="precioconf"][data-ok]').click());await W(100);ok(await ev(()=>S.avPrecio.some(x=>/encargado\) fijó el precio fuera/.test(x))&&S.precio.conf===iso(TODAY)),'y avisa al admin');
/* límite de pago */
await ev(()=>{S.gsheet={i:null,tipo:'Refacciones',monto:'8000',nota:'',pago:'Efectivo de caja',foto:null,ref:''};var x=document.createElement('button');x.dataset.act='gsave';document.body.appendChild(x);x.click();x.remove()});await W(100);
ok(await ev(()=>(S.pagoPide||[]).some(x=>x.est==='pend'&&x.m===8000)&&!S.gastos.some(g=>g.m===8000)),'encargado: gasto de $8,000 necesita OK');
await ev(()=>{S.encOn=false;S.tab.admin='inicio';render()});await W(150);ok(await ev(()=>!!document.querySelector('[data-act="ppsi"]')),'el admin ve "Autorizar"');
await ev(()=>document.querySelector('[data-act="ppsi"]').click());await W(50);
await ev(()=>{S.encOn=true;S.gsheet={i:null,tipo:'Refacciones',monto:'8000',nota:'',pago:'Efectivo de caja',foto:null,ref:''};S.cajaBase=99999;var x=document.createElement('button');x.dataset.act='gsave';document.body.appendChild(x);x.click();x.remove()});await W(150);
ok(await ev(()=>S.gastos.some(g=>num(g.m)===8000)),'autorizado: ya se registra');
await ev(()=>{S.encOn=false;S.gsheet=null;render()});
/* resumen */
await ev(()=>{S.dOpen.resumen=true;render();document.querySelector('[data-act="resdia"]').click()});await W(50);ok(await ev(()=>__o.some(u=>/wa\.me\/\?text=.*resumen/.test(decodeURIComponent(u)))),'resumen del día por WhatsApp');
/* maduración */
await ev(()=>{S.rutasHist=[{f:iso(new Date(TODAY.getTime()-864e5)),ch:1,log:[{R:30}]},{f:iso(new Date(TODAY.getTime()-2*864e5)),ch:1,log:[{R:30}]}];S.inv.maduras=5;S.inv.verdes=200;S.tab.admin='bodega';render()});await W(150);
t=await ev(()=>document.querySelector('main').innerText);ok(/Sugerencia de maduración/.test(t)&&/Mete \d+ cajas/.test(t),'bodega: sugerencia de maduración',(t.match(/Mete \d+ cajas[^\n]*/)||[''])[0]);
/* factura y cerrar mes */
await ev(()=>{S.tab.admin='gastos';S.gsheet={i:null,tipo:'Papelería',monto:'100',nota:'',pago:'Efectivo de caja',foto:null,ref:''};render()});await W(100);
await ev(()=>document.querySelector('[data-act="gfac"][data-v="1"]').click());await W(50);await ev(()=>{var x=document.querySelector('[data-act="gsave"]');x.click()});await W(150);
ok(await ev(()=>S.gastos.slice(-1)[0].fac===true),'gasto con factura');
t=await ev(()=>document.querySelector('main').innerText);ok(/Cerrar el mes/.test(t),'tarjeta cerrar el mes');
await ev(()=>{var pm=mesDe(iso(new Date(TODAY.getFullYear(),TODAY.getMonth()-1,15)));S.gastos.push({t:'X',m:50,f:pm+'-10'});var i=S.gastos.length-1;window._gi=i;document.querySelector('[data-act="mescierra"]').click()});await W(50);await ev(()=>document.querySelector('[data-act="mescierrasi"]').click());await W(50);
await ev(()=>{var x=document.createElement('button');x.dataset.act='gedit';x.dataset.i=_gi;document.body.appendChild(x);x.click();x.remove()});await W(50);ok(await ev(()=>!S.gsheet),'mes cerrado: ya no se edita');
ok(!errs.length,'sin errores',errs);console.log(nOK+' OK · '+nF+' FAIL');await b.close()})();
