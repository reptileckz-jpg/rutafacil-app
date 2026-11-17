const {chromium}=require('playwright');
/* 9.4 · el cierre de AYER mandado tarde no se pierde: se guarda aparte y el administrador lo recibe (dos celulares) · base t86nube · 8.6 · 67: chofer con la ruta del sábado sin cierre: mandar cierre, pedir que liberen y liberar, con dos celulares · (copiado de t78nube) 7.8 · 27: pedido asignado al chofer con el cierre enviado (dos celulares y nube de prueba) · basado en l61: 30 saldos con sumas y restas (dos celulares, uno sin señal, con una nube de prueba que se porta como Firestore)
        32 cambio de día · 34 centavos · 35 doble toque */
(async()=>{const b=await chromium.launch();let nOK=0,nF=0;const ok=(c,m,x)=>{c?nOK++:nF++;console.log((c?'OK   ':'FAIL ')+m+(x!==undefined?' '+JSON.stringify(x).slice(0,300):''))};
const errs=[];
/* ---- nube de prueba: set con merge (mapas anidados), borrar campo e increment, como Firestore ---- */
const DB={},VER={};let seq=0;
function merge(dst,src){for(const k of Object.keys(src)){const v=src[k];if(v&&typeof v==='object'&&v.__del){delete dst[k];continue}
 if(v&&typeof v==='object'&&'__inc' in v){dst[k]=(typeof dst[k]==='number'?dst[k]:0)+v.__inc;continue}
 if(v&&typeof v==='object'&&!Array.isArray(v)){if(!dst[k]||typeof dst[k]!=='object')dst[k]={};merge(dst[k],v);continue}dst[k]=v}}
const srvSet=(p,js,m)=>{const o=JSON.parse(js);if(!m||!DB[p])DB[p]={};merge(DB[p],o);VER[p]=++seq;return true};
const srvPull=(pref,visto)=>{visto=JSON.parse(visto);const out=[];for(const p of Object.keys(DB)){if(!p.startsWith(pref+'/'))continue;if(visto[p]===VER[p])continue;out.push({p,id:p.slice(pref.length+1),data:JSON.parse(JSON.stringify(DB[p])),v:VER[p]})}return JSON.stringify(out)};
const cel=async(rol)=>{const p=await b.newPage({viewport:{width:400,height:860}});p.on('pageerror',e=>errs.push(rol+': '+e.message));
 await p.exposeFunction('__srvSet',srvSet);await p.exposeFunction('__srvPull',srvPull);
 await p.addInitScript(()=>{window.__pnTest=1;window.__nbFast=1;window.__visto={};
  window.__fakeAd={set:(p,o,m)=>window.__srvSet(p,JSON.stringify(o),!!m),del:()=>({__del:1}),inc:n=>({__inc:n}),watch:()=>()=>{},get:()=>Promise.resolve(null),borrar:()=>Promise.resolve(),rango:()=>Promise.resolve([])};
  window.__pull=async(primera)=>{const L=JSON.parse(await window.__srvPull(nbP('d'),JSON.stringify(__visto)));L.forEach(x=>__visto[x.p]=x.v);if(L.length){nbAplica(L.map(x=>({id:x.id,data:x.data})),!!primera);render()}return L.length}});
 await p.goto('file:///mnt/user-data/outputs/prototipo-platanos.html');await p.waitForTimeout(700);
 await p.evaluate(rol=>{NB.on=true;NB.listo=true;NB.ad=__fakeAd;NB.perfil={rol:rol==='admin'?'admin':'chofer'};S.role=rol==='admin'?'admin':'rep';S.encOn=false;S.pinOk[pinKey()]=true;S.popVisto={admin:iso(TODAY)};localStorage.removeItem('salIni');render()},rol);return p};
const A=await cel('admin');await A.evaluate(()=>{nbEmpuja()});await A.waitForTimeout(300);
const B=await cel('rep');await B.evaluate(()=>{NB.perfil={rol:'chofer',chId:1}});await B.evaluate(()=>__pull(true));await B.waitForTimeout(200);
/* el chofer salió AYER con 75 cajas, entregó 2 (cobró $600) y no mandó su cierre; hoy lo manda */
let r=await B.evaluate(()=>{S.chofHoy=1;S.role='rep';S.pinOk[pinKey()]=true;S.rutaDia80=iso(new Date(TODAY.getTime()-864e5));window.AYER=S.rutaDia80;S.salida.ok=true;S.inv.reparto=75;S.cierre.salioR=75;S.cierre.sent=false;S.cierreReg=null;S.recep=null;
 S.stops=[{c:S.cli[0].id,done:true},{c:S.cli[1].id}];S.log=[{c:S.cli[0].id,R:2,M:0,total:600,pago:600,abono:0,h:'18:00'}];S.dia80=null;S.tab.rep='ruta';render();nbEmpuja();return {ov:!!document.getElementById('dia80')}});
ok(r.ov,'el chofer ve "No mandaste tu cierre de ayer"');await B.waitForTimeout(300);await A.evaluate(()=>__pull());await A.waitForTimeout(200);
const caja0=await A.evaluate(()=>{S.role='admin';return cajaEsp()});
/* manda su cierre de ayer */
r=await B.evaluate(()=>{document.querySelector('[data-act="dia80c"]').click();S.cierre.gxConf=true;S.cierre.tankOk=true;S.salida.fotosFin=S.salida.fotosFin||{};FOTOS.concat([['odo','o']]).forEach(x=>{S.salida.fotosFin[x[0]]=S.salida.fotosFin[x[0]]||'x'});S.cierre.ev79={ok:true,h:'07:00'};S.cierre.fotoReg='x';
 var b=document.createElement('button');b.dataset.act='enviar';b.dataset.ok='1';document.body.appendChild(b);b.click();b.remove();render();render();nbEmpuja();
 var A93=S.atras93||{},k=Object.keys(A93)[0];return {k,ef:k&&A93[k].ef,rd:S.rutaDia80,hoy:iso(TODAY),sent:!!S.cierre.sent,st:S.stops.length,tab:S.tab.rep,ov:!!document.getElementById('dia80')}});
ok(r.k==='1|'+(await B.evaluate(()=>AYER)),'al mandarlo, su cierre de ayer queda guardado aparte',r);ok(r.rd===r.hoy&&!r.sent&&!r.ov,'y ya le sale su ruta de hoy',r);
await B.waitForTimeout(300);await A.evaluate(()=>__pull());await A.waitForTimeout(300);
/* el administrador */
r=await A.evaluate(()=>{S.role='admin';S.tab.admin='rutas';render();var c=document.querySelector('[data-x="atr93c"]');c=c&&{textContent:c.textContent};S.tab.admin='inicio';render();var h=/Recibir el cierre del/.test((document.querySelector('[data-x="hoy92"]')||{}).textContent||'');return {c:c&&c.textContent,h,hoyR:nbRGet(1,'rutaDia80'),hoy:iso(TODAY)}});
ok(r.c&&/Cierre del .* de /.test(r.c)&&/\$600/.test(r.c),'al administrador le sale "📥 Cierre del … · Recibir su cierre" en Rutas',r);ok(r.h,'…y en su lista "Hoy"',r);ok(r.hoyR===r.hoy,'la ruta de hoy del chofer ya está en la nube',r);
r=await A.evaluate(()=>{S.tab.admin='rutas';render();document.querySelector('[data-act="atr93"]').click();return {tab:S.tab.admin,rd:S.rutaDia80,ch:S.chofHoy,sent:!!(S.cierre&&S.cierre.sent),ban:!!document.querySelector('[data-x="atr93b"]'),btn:!!document.querySelector('[data-act="rcabre"]'),hoyNube:nbRGet(1,'rutaDia80')}});
ok(r.tab==='cierreadm'&&r.sent&&r.rd===(await B.evaluate(()=>AYER))&&r.ban&&r.btn,'se abre la recepción de siempre con el cierre de ayer',r);ok(r.hoyNube===(await A.evaluate(()=>iso(TODAY))),'mientras, la ruta de hoy del chofer no se toca',r);
const inv0=await A.evaluate(()=>({m:S.inv.maduras,v:S.inv.vacias}));await A.evaluate(()=>document.querySelector('[data-act="rcabre"]').click());await A.waitForTimeout(150);
await A.evaluate(()=>{var b=document.querySelector('[data-act="rctodo"]');if(b)b.click()});await A.waitForTimeout(150);
for(let i=0;i<3;i++){const p=await A.evaluate(()=>S.rcv&&S.rcv.p);if(p===2){await A.evaluate(()=>{document.querySelectorAll('#rcov [data-act="eqest"][data-v="bien"]').forEach(b=>b.click());var b=document.querySelector('[data-act="rceqok"]');if(b)b.click()});await A.waitForTimeout(150)}}
await A.evaluate(()=>{var b=document.querySelector('[data-act="rcfin"]');if(b)b.click();var s=document.querySelector('[data-act="rcfinsi"]');if(s)s.click()});await A.waitForTimeout(300);
r=await A.evaluate(()=>{render();nbEmpuja();var e=Object.values(S.atras93||{})[0];var H=(S.rutasHist||[]).filter(h=>+h.ch===1&&h.f===e.f);return {hecho:!!e.hecho,atr:!!S.atr93,tab:S.tab.admin,hist:H.map(h=>({env:h.enviado,rec:!!h.cierreReg82,r94:h.recibido94})),caja:cajaEsp(),pend:atrasLista93().length,hoyR:nbRGet(1,'rutaDia80')}});
ok(r.hecho&&!r.atr&&r.pend===0,'al terminar de recibirlo, queda recibido y se cierra solo',r);ok(r.hist.some(h=>h.env&&h.rec&&h.r94),'en el historial: enviado y recibido',r.hist);
const inv1=await A.evaluate(()=>({m:S.inv.maduras,v:S.inv.vacias}));ok(inv1.m-inv0.m===73,'las 73 cajas llenas que regresaron entran a la bodega (no quedan como faltantes)',{inv0,inv1});ok(r.caja-caja0>=599,'el efectivo ($600) entra a la caja',{antes:caja0,despues:r.caja});ok(r.hoyR===(await A.evaluate(()=>iso(TODAY))),'la ruta de hoy del chofer sigue intacta',r);
await A.waitForTimeout(300);await B.evaluate(()=>__pull());await B.waitForTimeout(200);
r=await B.evaluate(()=>({rd:S.rutaDia80,hoy:iso(TODAY),sent:!!S.cierre.sent,st:S.stops.length}));ok(r.rd===r.hoy&&!r.sent,'el chofer sigue con su ruta de hoy después de que el admin recibió lo de ayer',r);
/* el admin a medianoche con un cierre mandado y sin recibir: tampoco se pierde */
r=await A.evaluate(()=>{S.chSt=S.chSt||{};var o=JSON.parse(JSON.stringify(S.chSt[1]||arPack()));o.rutaDia80=iso(TODAY);o.cierre=o.cierre||{};o.cierre.sent=true;o.cierre.res={efectivo:900,reg:0,regK:0,V:0};o.cierreReg=null;S.chSt[2]=o;var ch0=S.chofHoy;S.chofHoy=null;var viejo=iso(TODAY);TODAY=new Date(TODAY.getTime()+864e5);try{_nbDiaOk=true}catch(e){}cambioDeDia(viejo);S.chofHoy=ch0;return atrasLista93().map(x=>x.id+'|'+x.ef)});
ok(r.indexOf('2|900')>-1,'a medianoche, en el celular del admin, un cierre mandado y sin recibir también se guarda aparte',r);
ok(!errs.length,'sin errores',errs.slice(0,3));
console.log(nOK+' OK · '+nF+' FAIL');await b.close()})();
