/* 176 · Mayoreo del macho aparte: con más de 10 cajas, el mayoreo es del roatán; el macho solo si el chofer lo escoge ("¿Y el macho?").
   Cliente marcado de mayoreo: los dos. Roatán a normal → macho a normal. Los totales cuadran con lo que se cobra. */
const {chromium}=require('playwright');let nOK=0,nF=0;const ok=(c,m,x)=>{c?nOK++:nF++;console.log((c?'OK   ':'FAIL ')+m+(x!==undefined?' '+JSON.stringify(x).slice(0,400):''))};
(async()=>{const b=await chromium.launch();const errs=[];
const p=await (await b.newContext({viewport:{width:390,height:844}})).newPage();p.on('pageerror',e=>errs.push(e.message));p.on('dialog',d=>d.accept());
await p.addInitScript(()=>{window.__pnTest=1;window.__hora93=12});await p.goto('file:///mnt/user-data/outputs/prototipo-platanos.html');await p.waitForTimeout(900);const ev=(f,a)=>p.evaluate(f,a);let r;
r=await ev(()=>{S.tutVisto={rep:true,admin:true};S.role='rep';S.pinOk[pinKey()]=true;S.salida.ok=true;S.tab.rep='entrega';render();
 var i=curStop(),c=cl(S.stops[i].c);c.mayoreo=false;c.ppR='';c.ppM='';c.mayNo=false;S.cfg.mayAuto='preg';S.mayP=S.mayP||{R:'240',M:'16'};
 var ch=chofById(S.chofHoy);if(ch)ch.mayPerm=false;
 S.d.R=12;S.d.M=20;S.d.may=false;S.d.mayQ='may';S.d.mayQM=undefined;render();
 var nR=num(S.precio.R),nM=num(S.precio.M),mR=num(S.mayP.R),mM=num(S.mayP.M);window.__P={nR,nM,mR,mM};
 var k=entregaCalc();var q=document.querySelector('[data-act="mayqm"]');return {pr:k.pr,pm:k.pm,total:k.total,P:window.__P,boton:!!q,norm:q&&document.querySelector('[data-act="mayqm"][data-v="norm"]').getAttribute('aria-pressed')}});
ok(r.pr===r.P.mR&&r.pm===r.P.nM&&r.total===12*r.P.mR+20*r.P.nM,'más de 10 cajas con mayoreo: el roatán a mayoreo y el macho sigue a precio normal',r);
ok(r.boton&&r.norm==='true','sale "¿Y el macho?" aparte, con Normal marcado',r);
r=await ev(()=>{document.querySelector('[data-act="mayqm"][data-v="may"]').click();var k=entregaCalc();return {pr:k.pr,pm:k.pm,total:k.total,pago:k.pago}});
r=await ev(()=>{var k=entregaCalc(),P=window.__P;return {ok:k.pr===P.mR&&k.pm===P.mM&&k.total===12*P.mR+20*P.mM,k:{pr:k.pr,pm:k.pm,total:k.total}}});
ok(r.ok,'si el chofer escoge mayoreo para el macho, el macho va a mayoreo',r);
r=await ev(()=>{document.querySelector('[data-act="mayq"][data-v="norm"]').click();var k=entregaCalc(),P=window.__P;return {pr:k.pr,pm:k.pm,ok:k.pr===P.nR&&k.pm===P.nM,boton:!!document.querySelector('[data-act="mayqm"]')}});
ok(r.ok&&!r.boton,'si el roatán regresa a normal, el macho también y ya no sale la pregunta del macho',r);
r=await ev(()=>{var i=curStop(),c=cl(S.stops[i].c);c.mayoreo=true;S.d.mayQ=undefined;S.d.mayQM=undefined;S.d.R=3;render();var k=entregaCalc(),P=window.__P;c.mayoreo=false;return {ok:k.pr===P.mR&&k.pm===P.mM,pr:k.pr,pm:k.pm}});
ok(r.ok,'cliente que marcaste de mayoreo: los dos a mayoreo (como antes)',r);
r=await ev(()=>{S.cfg.mayAuto='siempre';S.d.R=15;S.d.M=10;S.d.mayQ=undefined;S.d.mayQM=undefined;render();var k=entregaCalc(),P=window.__P;var q=!!document.querySelector('[data-act="mayqm"]');S.cfg.mayAuto='preg';return {ok:k.pr===P.mR&&k.pm===P.nM,q,pr:k.pr,pm:k.pm}});
ok(r.ok&&r.q,'modo "siempre mayoreo": roatán a mayoreo, macho normal hasta que el chofer lo escoja',r);
r=await ev(()=>{S.d.R=12;S.d.M=0;S.d.mayQ='may';render();return !!document.querySelector('[data-act="mayqm"]')});
ok(!r,'sin macho no sale la pregunta del macho');
ok(!errs.length,'sin errores',errs);console.log(nOK+' OK · '+nF+' FAIL');await b.close()})();
