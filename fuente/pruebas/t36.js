/* 36 · aguinaldo en partes (mitad, resto, otra cantidad, ajuste con motivo, desglose, recordatorios) y recibo de pago por WhatsApp */
const {chromium}=require('playwright');let nOK=0,nF=0;const ok=(c,m,x)=>{c?nOK++:nF++;console.log((c?'OK   ':'FAIL ')+m+(x!==undefined?' '+JSON.stringify(x).slice(0,350):''))};
(async()=>{const b=await chromium.launch();const errs=[];
const p=await (await b.newContext({viewport:{width:412,height:900}})).newPage();p.on('pageerror',e=>errs.push(String(e)));p.on('dialog',d=>d.accept());await p.addInitScript(()=>{window.__pnTest=1});
await p.goto('file:///mnt/user-data/outputs/prototipo-platanos.html');await p.waitForTimeout(1100);const ev=(f,a)=>p.evaluate(f,a);let r;
const clic=(act,extra)=>ev(([act,extra])=>{var d=document.createElement('button');d.dataset.act=act;Object.assign(d.dataset,extra||{});document.body.appendChild(d);d.click();d.remove()},[act,extra]);
r=await ev(()=>{S.role='admin';S.encOn=false;S.pinOk[pinKey()]=true;S.tutVisto={admin:true,rep:true};S.popVisto={admin:iso(TODAY)};S.cajaAyerSkip=true;
 var c=S.choferes.filter(c=>esCh(c)&&!esAdm(c))[0];c.sz={tipo:'semana',monto:'2100'};c.ing='2020-01-01';c.agui118={};c.aguiP36={};c.aguiAj36={};c.faltas118=[];window.__C=c;S.tab.admin='personal';S.per92='sue';S.szOpen=c.id;render();var bx=document.querySelector('main [data-x="ag36"]');return {id:c.id,t:bx?bx.innerText:'',sd:sdLey118(c),obj:ag36Obj(c,TODAY.getFullYear())}});
ok(/Cómo se calcula/.test(r.t)&&/\$300 por día/.test(r.t)&&/× 15 días/.test(r.t)&&/Pagar la mitad/.test(r.t),'en Sueldos: el desglose del aguinaldo (salario diario × 15 días) y "Pagar la mitad"',r.t.slice(0,300));
const id=String(r.id),obj=r.obj.obj;
await clic('ag36mitad',{id});
r=await ev(()=>{var x=ag36Obj(__C,TODAY.getFullYear());return {pag:x.pag,falta:x.falta,rec:!!document.getElementById('rec36ov'),g:S.gastos.slice(-1)[0]}});
ok(Math.abs(r.pag-obj/2)<1&&Math.abs(r.falta-obj/2)<1&&/Aguinaldo .* \(parte\)/.test(r.g.n)&&r.g.t==='Sueldos','"Pagar la mitad": queda pagada la mitad y falta la otra (gasto de Sueldos)',r);
ok(r.rec,'sale el recibo de pago con "Mandar por WhatsApp"',r);
await clic('rec36x');
/* ajuste con motivo */
await clic('ag36aj',{id});await ev(()=>{S.ag36.m=String(Math.round(ag36Obj(__C,TODAY.getFullYear()).obj+500));S.ag36.mot='Bono por buen año'});await clic('ag36ajok',{id});
r=await ev(()=>{var x=ag36Obj(__C,TODAY.getFullYear());return {obj:x.obj,aj:x.aj,h:S.hist.slice(-1)[0].x}});
ok(Math.abs(r.obj-(obj+500))<1&&/Bono por buen año/.test(r.h),'"Ajustar el monto" con motivo: queda en el historial',r);
await clic('ag36resto',{id});
r=await ev(()=>{var x=ag36Obj(__C,TODAY.getFullYear());S.rec36=null;S.szOpen=__C.id;render();var t=(document.querySelector('main [data-x="ag36"]')||{}).innerText||'';return {falta:x.falta,pagado:aguiPag118(__C,TODAY.getFullYear()),t}});
ok(r.falta===0&&r.pagado&&/pagado completo/.test(r.t),'"Pagar lo que falta": queda pagado completo',r);
/* recordatorios */
r=await ev(()=>{var keep=TODAY;var c=__C;c.aguiP36={};c.agui118={};c.aguiAj36={};TODAY=new Date('2026-11-15T12:00:00');var a=hoyTareas().filter(x=>/^ag36/.test(x.k)).map(x=>x.t);TODAY=new Date('2026-12-12T12:00:00');var b=hoyTareas().filter(x=>/^ag36/.test(x.k)).map(x=>x.t);TODAY=new Date('2026-12-25T12:00:00');var cc=hoyTareas().filter(x=>/^ag36/.test(x.k)).length;TODAY=keep;return {a,b,cc}});
ok(r.a.some(t=>/primera mitad/.test(t)&&/20 de noviembre/.test(t))&&r.b.some(t=>/antes del 20 de diciembre/.test(t))&&r.cc===0,'recordatorios en "Hoy": del 10 al 20 de noviembre y del 10 al 20 de diciembre',r);
/* recibo al pagar la semana */
r=await ev(async()=>{S.rec36=null;var c=__C;c.pagoHasta118=null;S.tab.admin='personal';S.per92='sue';render();var b=document.createElement('button');b.dataset.act='pagarsz';b.dataset.id=String(c.id);b.dataset.ok='1';document.body.appendChild(b);b.click();b.remove();await new Promise(r=>setTimeout(r,150));return {rec:!!S.rec36,img:S.rec36&&S.rec36.img.slice(0,22)}});
ok(r.rec&&/^data:image\/png/.test(r.img),'al pagar la semana sale el recibo (imagen) para mandarlo por WhatsApp',r);
ok(!errs.length,'sin errores',errs);console.log(nOK+' OK · '+nF+' FAIL');await b.close()})();
