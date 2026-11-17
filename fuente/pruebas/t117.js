/* 117 · horario en palabras y la pregunta "¿Cierra a las 8 de la noche?"; apodo igual al nombre; "Esta entrega te deja" se lee */
const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();let nOK=0,nF=0;const ok=(c,m,x)=>{c?nOK++:nF++;console.log((c?'OK   ':'FAIL ')+m+(x!==undefined?' '+JSON.stringify(x).slice(0,400):''))};
const p=await (await b.newContext({viewport:{width:390,height:844}})).newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));await p.addInitScript(()=>{window.__pnTest=1});
await p.goto('file:///mnt/user-data/outputs/platanos-primera-vez.html');await p.waitForTimeout(900);const ev=(f,a)=>p.evaluate(f,a);let r;
r=await ev(()=>['08:00','20:00','08:30','12:00','14:30','05:00','19:00','08:01'].map(horaTxt117));
ok(JSON.stringify(r)===JSON.stringify(['8 de la mañana','8 de la noche','8:30 de la mañana','12 del día','2:30 de la tarde','5 de la madrugada','7 de la noche','8:01 de la mañana']),'117 · las horas en palabras',r);
await ev(()=>{var U=S.setup;U.veh=[{n:'Camioneta Uno',pl:'AAA1',plEdo:'Baja California',comb:'Gasolina',img:0,odo:1000}];U.per=[{n:'Danu',puesto:'chofer',tel:'1'}];U.cli=[{n:'Benavides',a:'',tel:'6640000001',dias:[0,1,2,3,4,5,6],cred:0,vac:0,ch:'0'},{n:'Doña Mary',a:'x',tel:'6640000002',dias:[0,1,2,3,4,5,6],cred:0,vac:0,ch:'0'}];U.prov=[];S.precio.R=275;S.precio.M=20;suAplicar();
 var c=S.cli[0];c.ap='BENAVÍDES';c.hAb='08:00';c.hCi='08:01';var m=S.cli[1];m.ap='La del arco';m.hAb='08:00';m.hCi='20:00';S.role='admin';S.pinOk[pinKey()]=true;render()});
r=await ev(()=>({a:S.cli[0].ap,m:S.cli[1].ap}));
ok(r.a===''&&r.m==='La del arco','117 · apodo igual al nombre (sin importar mayúsculas ni acentos) ya no se repite; otro apodo se queda',r);
r=await ev(()=>{S.stops=[{c:S.cli[0].id},{c:S.cli[1].id}];var E=etas();var d=document.createElement('div');d.innerHTML=sigCard(1,E)+sigCard(0,E);var t=d.innerText;return t});
ok(/Recibe de 8 de la mañana a 8 de la noche/.test(r)&&!/08:00|20:00/.test(r),'117 · "Recibe de 8 de la mañana a 8 de la noche" (antes "08:00 a 20:00")',r.slice(0,300));
ok(!/“Benavides”/.test(r)&&/“La del arco”/.test(r),'117 · en la siguiente parada ya no sale · "Benavides"');
r=await ev(()=>dfLista().map(x=>x.txt).filter(t=>/Horario/.test(t)));
ok(r.length===1&&/Horario de Benavides: dice que cierra a las 8:01 de la mañana, revísalo/.test(r[0]),'117 · el horario mal capturado sale en "Datos que faltan"',r);
// el asistente de datos que faltan vuelve a preguntar el horario
r=await ev(()=>{var P=cliF74Pasos(S.cli[0]);var x=P.filter(p=>/abre y cierra/.test(p.q))[0];return x&&x.a});
ok(/abre a las 8 de la mañana y cierra a las 8:01 de la mañana/.test(r||''),'117 · "Datos que faltan" lo vuelve a preguntar diciendo lo que tiene',r);
// la ficha: al poner cierra 08:01, pregunta "¿Cierra a las 8 de la noche?"
r=await ev(async()=>{var c=S.cli[1];S.cliEdit=c.id;S.ce={n:c.n,ap:c.ap,a:c.a,tel:c.tel,tipo:'',recibe:'',hAb:c.hAb,hCi:c.hCi,lim:'',ppR:'',ppM:''};var box=document.createElement('div');box.id='box117';box.innerHTML=cliForm(c);document.body.appendChild(box);
 var i=document.getElementById('ce_hCi');if(!i)return {hay:false};i.value='08:01';i.dispatchEvent(new Event('input',{bubbles:true}));i.dispatchEvent(new Event('change',{bubbles:true}));await new Promise(r=>setTimeout(r,100));
 var q=document.querySelector('[data-x="hor117"]');var t=q&&q.innerText;var si=q&&q.querySelector('[data-act="hor117si"]');if(si)si.click();await new Promise(r=>setTimeout(r,100));return {hay:true,t,val:document.getElementById('ce_hCi').value,ce:S.ce&&S.ce.hCi,quedo:!!document.querySelector('[data-x="hor117"]')}});
ok(r.hay&&/¿Cierra a las 8 de la noche\?/.test(r.t||''),'117 · al escribir "cierra 08:01" pregunta "¿Cierra a las 8 de la noche?"',r);
ok(r.val==='20:00'&&r.ce==='20:00'&&!r.quedo,'117 · "Sí": queda a las 20:00 (8 de la noche) con un toque',r);
r=await ev(async()=>{var i=document.getElementById('ce_hCi');i.value='07:00';i.dispatchEvent(new Event('input',{bubbles:true}));i.dispatchEvent(new Event('change',{bubbles:true}));await new Promise(r=>setTimeout(r,100));var q=document.querySelector('[data-x="hor117"]');var t=q&&q.innerText;q.querySelector('[data-act="hor117no"]').click();await new Promise(r=>setTimeout(r,50));var a=!!document.querySelector('[data-x="hor117"]');
 i.value='18:00';i.dispatchEvent(new Event('input',{bubbles:true}));i.dispatchEvent(new Event('change',{bubbles:true}));await new Promise(r=>setTimeout(r,100));return {t,a,b:!!document.querySelector('[data-x="hor117"]'),ce:S.ce.hCi}});
ok(/Cierra a las 7 de la noche/.test(r.t||'')&&!r.a,'117 · "No, así está" quita la pregunta',r);
ok(!r.b&&r.ce==='18:00','117 · con un horario normal (8 a 6) no pregunta nada',r);
// la etiqueta "Esta entrega te deja" se lee dentro de la tarjeta verde
r=await ev(()=>{var d=document.createElement('div');d.className='card next';d.innerHTML='<span class="comtip">💵 Esta entrega te deja ~$23</span><span class="comtip deu" style="background:rgba(242,194,48,.18);color:#8A6A00">Si le cobras</span>';document.body.appendChild(d);var a=getComputedStyle(d.children[0]),b2=getComputedStyle(d.children[1]);var x={c:a.color,bg:a.backgroundColor,c2:b2.color,bg2:b2.backgroundColor};d.remove();return x});
ok(r.c==='rgb(27, 94, 32)'&&r.bg==='rgb(255, 255, 255)'&&r.bg2==='rgb(255, 243, 196)','117 · "Esta entrega te deja" ahora es etiqueta blanca con letra verde oscuro (antes verde sobre verde)',r);
ok(!errs.length,'sin errores de página',errs.slice(0,3));
console.log(nOK+' OK · '+nF+' FAIL');await b.close()})();
