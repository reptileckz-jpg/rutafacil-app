/* 18 (nueva numeración) · en el Cuadre todo lo que resta va en rojo: montos con signo de menos y renglones de gastos, desgaste, sueldos,
   comisiones, merma, faltó… Lo que suma (ventas, abonos, ganancia de la fruta) no. En la tarjeta verde, rojo claro. */
const {chromium}=require('playwright');let nOK=0,nF=0;const ok=(c,m,x)=>{c?nOK++:nF++;console.log((c?'OK   ':'FAIL ')+m+(x!==undefined?' '+JSON.stringify(x).slice(0,400):''))};
(async()=>{const b=await chromium.launch();const errs=[];
const p=await (await b.newContext({viewport:{width:412,height:900}})).newPage();p.on('pageerror',e=>errs.push(e.message));
await p.addInitScript(()=>{window.__pnTest=1});await p.goto('file:///mnt/user-data/outputs/prototipo-platanos.html');await p.waitForTimeout(1200);const ev=(f,a)=>p.evaluate(f,a);let r;
r=await ev(async()=>{var bv=document.getElementById('bienv');if(bv)bv.remove();S.tutVisto={rep:true,admin:true};S.role='admin';S.tab.admin='cuadre121';render();await new Promise(r=>setTimeout(r,500));
 var rojo=x=>{var c=getComputedStyle(x).color;var m=c.match(/\d+/g).map(Number);return m[0]>150&&m[1]<120&&m[2]<140};var rojoClaro=x=>{var m=getComputedStyle(x).color.match(/\d+/g).map(Number);return m[0]>240&&m[1]>180&&m[2]>180&&m[1]<215};
 var menos=[...document.querySelectorAll('main b, main span, main small, main strong')].filter(x=>x.children.length<=1&&/^\s*[-−]\s*\$/.test(x.textContent.trim())&&x.textContent.trim().length<22);
 var noRojo=menos.filter(x=>!rojo(x)&&!rojoClaro(x)).map(x=>x.textContent.trim());
 var fila=t=>{var L=[...document.querySelectorAll('main .k5li, main .row, main .cdac145, main [data-k]')];return null};
 var ventas=[...document.querySelectorAll('main *')].filter(x=>x.children.length===0&&/^Ventas del día$/.test(x.textContent.trim()))[0];var vAmt=ventas&&ventas.closest('summary,button,div').parentElement.querySelector('b');
 var pill=[...document.querySelectorAll('.k5pill')].filter(x=>/Gastos/.test(x.textContent))[0];
 return {n:menos.length,noRojo,ventaRoja:vAmt?rojo(vAmt):null,pillClaro:pill?rojoClaro(pill.querySelector('b'))||!/[-−]/.test(pill.querySelector('b').textContent):null}});
ok(r.n>0&&r.noRojo.length===0,'todos los montos con signo de menos van en rojo ('+r.n+')',r);
ok(r.ventaRoja===false,'las ventas (lo que suma) no van en rojo',r);
ok(r.pillClaro,'en la tarjeta verde, "Gastos y com." en rojo claro (se lee sobre el verde)',r);
/* periodo (semana): renglones de lo que resta, aunque vayan sin signo */
r=await ev(async()=>{var b=[...document.querySelectorAll('main [data-act]')].filter(x=>/^Semana$/.test(x.textContent.trim()))[0];if(b)b.click();await new Promise(r=>setTimeout(r,400));
 var R=[...document.querySelectorAll('main .row')].filter(x=>/Kilómetros y desgaste|Sueldo y comisión/.test(x.children[0]&&x.children[0].textContent||''));
 return {semana:!!b,n:R.length,rojos:R.map(x=>x.lastElementChild.classList.contains('rojo18'))}});
ok(!r.semana||(r.n===0||r.rojos.every(Boolean)),'en semana/mes/año, "Kilómetros y desgaste" y "Sueldo y comisión" en rojo',r);
r=await ev(async()=>{var b=[...document.querySelectorAll('main [data-act]')].filter(x=>/^Día$/.test(x.textContent.trim()))[0];if(b)b.click();await new Promise(r=>setTimeout(r,400));var c=[...document.querySelectorAll('main .card')].filter(x=>/Sueldos del día de quien no salió/.test(x.textContent))[0];if(!c)return {hay:false};var v=[...c.querySelectorAll('.row > b:last-child, .row > span:last-child')].filter(x=>/\$/.test(x.textContent));return {hay:true,n:v.length,rojos:v.every(x=>x.classList.contains('rojo18'))}});
ok(!r.hay||(r.n>0&&r.rojos),'"Sueldos del día de quien no salió a ruta": sus montos en rojo',r);
await p.screenshot({path:'/tmp/claude-0/s/rojo18.png',fullPage:false});
ok(!errs.length,'sin errores',errs);console.log(nOK+' OK · '+nF+' FAIL');await b.close()})();
