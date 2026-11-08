const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();let nOK=0,nF=0;const ok=(c,m,x)=>{c?nOK++:nF++;console.log((c?'OK   ':'FAIL ')+m+(x!==undefined?' '+JSON.stringify(x):''))};
const p=await b.newPage({viewport:{width:400,height:880}});await p.addInitScript(()=>{window.__pnTest=1;window.open=function(){return null}});const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.goto('file:///mnt/user-data/outputs/prototipo-platanos.html');await p.waitForTimeout(600);const ev=(f,a)=>p.evaluate(f,a),W=ms=>p.waitForTimeout(ms),click=s=>ev(s=>{var e=document.querySelector(s);if(!e)return false;e.click();return true},s);
await ev(()=>{S.popVisto={admin:iso(TODAY),cont:iso(TODAY)};S.precio.conf=iso(TODAY);window.__snap=JSON.stringify(S)});
// límites que bajaron
let r=await ev(()=>({rev:S.cli.filter(function(c){return c.limRev}).map(function(c){return c.n+' '+c.limOld}),max:Math.max.apply(null,S.cli.filter(function(c){return !c.oculto}).map(function(c){return limEf(c)}))}));ok(r.max<=1500,'ningún cliente pasa de $1,500 (salvo excepciones)',r);
// buró por días
r=await ev(()=>{var c=S.cli[0];c.cred=800;c.limMan=null;c.buro={n:0,ok:0};var out=[];[[3,0],[10,1],[20,2],[40,3]].forEach(function(x){c.buro={n:0,ok:0};c.credDesde=iso(new Date(TODAY.getTime()-x[0]*864e5));buroSync();out.push([x[0],c.buro.n,limEf(c)])});return out});
ok(r.map(x=>x[1]).join()==='0,1,2,3'&&r.map(x=>x[2]).join()==='1500,1000,500,0','buró: 7/15/30 días → $1,500/$1,000/$500/bloqueado',r);
// sube un nivel al liquidar 3 veces a tiempo
r=await ev(()=>{var c=S.cli[0];c.buro={n:1,ok:0};for(var i=0;i<3;i++){c.cred=500;c.credDesde=iso(new Date(TODAY.getTime()-2*864e5));buroSync();c.cred=0;c.credDesde=null;buroSync()}return c.buro});ok(r.n===0,'sube a Bueno al liquidar 3 veces a tiempo',r);
// entrega: bloqueado no puede fiar; tope del chofer
const entrega=async(prep)=>{await ev(prep=>{S=JSON.parse(window.__snap);S.role='rep';S.salida.ok=true;S.inv.reparto=30;S.cierre.salioR=30;var i=curStop();S.cur=i;var c=cl(S.stops[i].c);eval(prep);resetDraft(c);S.d.R=2;S.d.M=0;S.d.V=0;S.d.mode='credito';S.tab.rep='entrega';render()},prep);await W(150)};
await entrega("c.cred=900;c.credDesde=iso(new Date(TODAY.getTime()-40*864e5));c.buro={n:0,ok:0};");
r=await ev(()=>({b:credBloq(curCli()),txt:/Buró:/.test(document.querySelector('main').innerText)}));ok(/bloqueado en el buró|deuda de hace 40/.test(r.b)&&r.txt,'cliente con 40 días: bloqueado, solo de contado (y lo ve el chofer)',r);
await entrega("S.cli.forEach(function(x){if(+x.chofer===+S.chofHoy){x.cred=0;x.credDesde=null}});var o=S.cli.filter(function(x){return +x.chofer===+S.chofHoy&&x.id!==c.id})[0];o.cred=4800;o.credDesde=iso(TODAY);c.cred=0;c.buro={n:0,ok:0};c.credOk=true;");
r=await ev(()=>entValida());ok(r&&/Tu tope es \$5,000/.test(r[1]),'el chofer no puede fiar si sus clientes ya deben casi $5,000',r);
await entrega("S.cli.forEach(function(x){if(+x.chofer===+S.chofHoy){x.cred=0;x.credDesde=null}});c.cred=0;c.buro={n:0,ok:0};c.credOk=true;");
r=await ev(()=>entValida());ok(r===null,'sin deudas sí puede fiar',r);
// mayoreo 2 veces en 10 días → en revisión
await ev(()=>{S=JSON.parse(window.__snap);S.role='rep';S.salida.ok=true;S.inv.reparto=30;S.cierre.salioR=30;window.__c=S.stops[curStop()].c;var c=cl(window.__c);c.mayoreo=false;c.mayNo=false;c.mayAM=[iso(new Date(TODAY.getTime()-3*864e5))];var i=curStop();S.cur=i;resetDraft(c);S.d.R=2;S.d.M=0;S.d.V=0;S.d.mode='todo';S.d.may=true;S.d.pRm=String(num(S.mayMin.R)+5);S.tab.rep='entrega';render()});
await click('[data-act="entconf"]');await W(150);await click('[data-act="guardar"]');await W(300);
r=await ev(()=>{var c=cl(window.__c);return {rev:c.mayRev,no:c.mayNo,av:S.avPrecio.slice(-1)[0]}});ok(r.rev&&r.no&&/Se bloqueó/.test(r.av),'2 mayoreos en 10 días: aviso y bloqueo en revisión',r);
await ev(()=>{S.role='admin';S.tab.admin='inicio';render()});await W(150);ok(await ev(()=>!!document.querySelector('[data-act="mayrevsi"]')),'al admin le salen los 3 botones de revisión');
await p.screenshot({path:'v50/b1.png'});
await click('[data-act="mayrevsi"]');await W(100);r=await ev(()=>{var c=cl(window.__c);return {may:c.mayoreo,rev:c.mayRev,base:c.mayBase}});ok(r.may&&!r.rev&&r.base!=null,'"lo justifica": cliente de mayoreo y se guarda su consumo',r);
// baja su consumo → precio normal
r=await ev(()=>{var c=cl(window.__c);c.mayBase=10000;c.c30=6000;render();return {may:c.mayoreo,av:S.avPrecio.slice(-1)[0],card:!!document.querySelector('[data-act="maymant"]')}});ok(!r.may&&/regresó a precio normal/.test(r.av)&&r.card,'si baja su consumo más de 30%, regresa a precio normal y te avisa',r);
await click('[data-act="maymant"]');await W(100);ok(await ev(()=>cl(window.__c).mayoreo===true),'puedes mantenerle el mayoreo');
// buró del chofer: sugerencia
r=await ev(()=>{S.cli.forEach(function(x){if(+x.chofer===1){x.cred=0}});var L=S.cli.filter(function(x){return +x.chofer===1&&!x.oculto});L[0].cred=3000;L[0].credDesde=iso(new Date(TODAY.getTime()-25*864e5));L[1].cred=1000;L[1].credDesde=iso(TODAY);var ch=S.choferes.filter(function(x){return x.id===1})[0];return chBuro(ch)});ok(r.sug&&r.sug.t==='bajar'&&r.sug.v<5000,'chofer que se atrasa en cobrar: la app sugiere bajar su tope',r.sug);
await ev(()=>{render()});await W(100);await p.screenshot({path:'v50/b2.png',fullPage:true});
await click('[data-act="chburook"]');await W(100);r=await ev(()=>S.choferes.filter(function(x){return x.id===1})[0].crMax);ok(+r<5000,'al aceptar cambia su tope',r);
r=await ev(()=>{S.cli.forEach(function(x){if(+x.chofer===1){x.cred=0;x.credDesde=null}});var L=S.cli.filter(function(x){return +x.chofer===1&&!x.oculto});var ch=S.choferes.filter(function(x){return x.id===1})[0];ch.crMax='4000';L[0].cred=2000;L[0].credDesde=iso(TODAY);L[1].cred=1400;L[1].credDesde=iso(TODAY);return chBuro(ch)});ok(r.sug&&r.sug.t==='subir'&&r.sug.v===5000,'si cobra a tiempo y usa casi todo, sugiere subirlo poco',r.sug);
// ajustes
await ev(()=>{S.aj=true;render()});await W(150);r=await ev(()=>['crCli','crCh','bD1','bD2','bD3','bL2','bL3','mayN','mayD','mayBaja'].every(function(k){return !!document.querySelector('#ajov [data-bind="cfg.'+k+'"]')}));ok(r,'todos los números se cambian en Ajustes');
ok(!errs.length,'sin errores',errs);console.log(nOK+' OK · '+nF+' FAIL');await b.close()})();
