/* 4 (nueva numeración) · mayoreo igual o más alto que el precio normal: se pide revisarlo (carga: paso "Precio de mayoreo" y "Sí, guardar";
   "Usar desde hoy"; "Mayoreo de hoy"). Más barato que el normal: sigue igual, sin preguntar. */
const {chromium}=require('playwright');let nOK=0,nF=0;const ok=(c,m,x)=>{c?nOK++:nF++;console.log((c?'OK   ':'FAIL ')+m+(x!==undefined?' '+JSON.stringify(x).slice(0,300):''))};
(async()=>{const b=await chromium.launch();const errs=[];
const p=await (await b.newContext({viewport:{width:412,height:900}})).newPage();p.on('pageerror',e=>errs.push(e.message));await p.addInitScript(()=>{window.__pnTest=1});
await p.goto('file:///mnt/user-data/outputs/prototipo-platanos.html');await p.waitForTimeout(800);const ev=(f,a)=>p.evaluate(f,a);let r;
await ev(()=>{S.role='admin';S.tutVisto={rep:true,admin:true};S.precio.R=275;S.precio.M=20});
/* la función */
r=await ev(()=>({igual:may4Mal(275,20,275,18).length,mas:may4Mal(275,20,280,18).length,menos:may4Mal(275,20,250,18).length,macho:may4Mal(275,20,250,20).length,soloR:may4Mal(275,20,275,20,true,false).length}));
ok(r.igual===1&&r.mas===1&&r.menos===0&&r.macho===1&&r.soloR===1,'igual o más alto se marca (roatán y macho por separado); más barato no',r);
/* carga: paso "Precio de mayoreo" y "Sí, guardar" */
const prep=(mR,mM)=>ev(([mR,mM])=>{var c=S.cargas.filter(x=>x.cajas)[0]||S.cargas[0];try{lpSt(c)}catch(e){}S.lp=Object.assign({},S.lp||{},{R:275,M:20,mR:mR,mM:mM,modo:'hoy'});return c.id},[mR,mM]);
let cid=await prep(275,18);
r=await ev(cid=>{var c=cargaById(cid);var h=cvPasoHTML(c,'may',false);return /Revisa el mayoreo/.test(h)&&/IGUAL/.test(h)},cid);ok(r,'en el paso "Precio de mayoreo" sale en rojo "Revisa el mayoreo" si es igual',r);
r=await ev(cid=>{var c=cargaById(cid);return /Revisa el mayoreo/.test(cvPasoHTML(c,'may',false))},await prep(250,18));ok(!r,'más barato: no sale el aviso',r);
cid=await prep(280,18);
r=await ev(cid=>{var hit=0;var g=lpAplicar;lpAplicar=function(){hit++;return g.apply(this,arguments)};var bt=document.createElement('button');bt.dataset.act='cvconfirm2';bt.dataset.id=cid;document.body.appendChild(bt);window.__tq174Test=1;
 var e=new MouseEvent('click',{bubbles:true});bt.dispatchEvent(e);bt.remove();var m=S.modal;var out={titulo:m&&m.t,hit,botones:m&&m.b.map(x=>x[1])};lpAplicar=g;window.__hit=hit;return out},cid);
ok(r.titulo==='Revisa el mayoreo'&&r.hit===0&&r.botones.join()==='may4ok,may4cor','"Sí, guardar" con mayoreo más alto: primero "Revisa el mayoreo" (no guarda todavía)',r);
r=await ev(()=>{render();var b=document.querySelector('[data-act="may4cor"]');if(!b)return 'sin botón';b.click();return {modal:!!S.modal,may:S.mayP&&S.mayP.R}});ok(r.modal===false&&r.may!==280,'"Corregir": se cierra sin guardar el mayoreo',r);
r=await ev(cid=>{var hit=0;var g=lpAplicar;lpAplicar=function(){hit++;return g.apply(this,arguments)};var bt=document.createElement('button');bt.dataset.act='cvconfirm2';bt.dataset.id=cid;document.body.appendChild(bt);bt.click();bt.remove();render();
 var y=document.querySelector('[data-act="may4ok"]');if(y)y.click();lpAplicar=g;return {hit,modal:!!S.modal}},cid);
ok(r.hit===1,'"Sí, así está bien": se guarda como siempre',r);
/* "Usar desde hoy": el mensaje de confirmación lleva el aviso */
cid=await prep(275,18);r=await ev(cid=>{var m=confMsg({act:'lphoy',id:cid});return m&&m.m},cid);ok(/^⚠️ Revisa el mayoreo/.test(r||''),'"Usar desde hoy": la confirmación empieza con "Revisa el mayoreo"',r);
cid=await prep(250,18);r=await ev(cid=>{var m=confMsg({act:'lphoy',id:cid});return m&&m.m},cid);ok(!/Revisa el mayoreo/.test(r||''),'más barato: la confirmación sigue igual',r);
/* "Mayoreo de hoy": igual → pide revisarlo; segundo toque guarda */
r=await ev(()=>{try{costoCajaAct=function(){return 200};costoKgMAct=function(){return 10}}catch(e){}S.may71={R:'275',M:'18',sig:null};render();var b=document.querySelector('[data-act="may71ok"]');b.click();var t=(document.getElementById('may71ov')||{}).innerText||'';return {abierto:!!S.may71,aviso:/Revisa el mayoreo/.test(t),boton:/Sí, así está bien/.test(t)}});
ok(r.abierto&&r.aviso&&r.boton,'"Mayoreo de hoy" igual al normal: no guarda, sale "Revisa el mayoreo" y el botón "Sí, así está bien"',r);
r=await ev(()=>{document.querySelector('[data-act="may71ok"]').click();return {abierto:!!S.may71,min:S.mayMin&&S.mayMin.R}});ok(!r.abierto&&r.min==='275','al tocar "Sí, así está bien" se guarda',r);
r=await ev(()=>{S.may71={R:'250',M:'18',sig:null};render();document.querySelector('[data-act="may71ok"]').click();return {abierto:!!S.may71,min:S.mayMin.R}});ok(!r.abierto&&r.min==='250','más barato: se guarda al primer toque, como siempre',r);
r=await ev(()=>{S.may71={R:'300',M:'18',sig:null};render();document.querySelector('[data-act="may71ok"]').click();var t=document.getElementById('may71ov').innerText;S.may71=null;render();return /más alto que el precio normal/.test(t)});ok(r,'más alto que el normal: sigue sin dejar guardarlo (como antes)',r);
ok(!errs.length,'sin errores',errs);console.log(nOK+' OK · '+nF+' FAIL');await b.close()})();
