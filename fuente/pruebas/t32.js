/* 32 · "Las taras no cuadran por lugar": un dato guardado como texto ya no da un aviso falso; el aviso dice qué falló; un número
   ilegible ya no se vuelve 0 (ni se sube como resta); "Arreglado en la 9.9" solo para reportes de antes del 19 nov. */
const {chromium}=require('playwright');let nOK=0,nF=0;const ok=(c,m,x)=>{c?nOK++:nF++;console.log((c?'OK   ':'FAIL ')+m+(x!==undefined?' '+JSON.stringify(x).slice(0,350):''))};
(async()=>{const b=await chromium.launch();const errs=[];
for(const arch of ['prototipo-platanos.html','platanos-primera-vez.html']){
const p=await (await b.newContext({viewport:{width:412,height:900}})).newPage();p.on('pageerror',e=>errs.push(String(e)));await p.addInitScript(()=>{window.__pnTest=1});
await p.goto('file:///mnt/user-data/outputs/'+arch);await p.waitForTimeout(1100);const ev=(f,a)=>p.evaluate(f,a);let r;
await ev(()=>{var bv=document.getElementById('bienv');if(bv)bv.remove();if(S.setup&&!S.setup.fin){var U=S.setup;U.veh=[{n:'NP',pl:'A1',plEdo:'Baja California',comb:'Gasolina',img:0,odo:1000}];U.per=[{n:'Danu',puesto:'chofer',tel:'1'}];U.cli=[{n:'C1',a:'x',tel:'1',dias:[0,1,2,3,4,5,6],cred:0,vac:0,ch:'0'},{n:'C2',a:'y',tel:'2',dias:[0,1,2,3,4,5,6],cred:0,vac:0,ch:'0'}];U.prov=[];S.precio.R=300;S.precio.M=20;suAplicar();_pin.modo=null}
 S.role='admin';S.encOn=false;S.pinOk[pinKey()]=true;S.tab.admin='inicio';render()});
const chk=()=>ev(()=>{var R=cuentasRevisar();var x=R.filter(x=>x.n0==='Las cajas cuadran con dónde están')[0];return x?{ok:x.ok,det:x.det}:null});
r=await chk();ok(r&&r.ok,arch+' · al inicio cuadra',r);
/* como llega de la nube: una tara como texto y otra vacía, sin redibujar */
r=await ev(()=>{var c=S.cli.filter(x=>!x.oculto);c[0].vac=String(num(c[0].vac)+3);c[1].vac='';var R=cuentasRevisar();var x=R.filter(x=>x.n0==='Las cajas cuadran con dónde están')[0];return {ok:x.ok,t0:typeof c[0].vac,v1:c[1].vac}});
ok(r.ok&&r.t0==='number'&&r.v1===0,arch+' · "3" como texto y un dato vacío (antes de redibujar): ya no da el aviso falso; se guardan como número con el mismo valor',r);
r=await ev(()=>{var c=S.cli.filter(x=>!x.oculto)[0];var antes=c.vac;c.vac='1,200';cuentasRevisar();var v=c.vac;c.vac=antes;return v});
ok(r===1200,arch+' · "1,200" con coma se lee como 1200 (antes se volvía 0)',r);
/* un dato que de veras no se puede leer: no se cambia, el aviso sale y dice qué falló */
r=await ev(()=>{S.probs=[];var c=S.cli.filter(x=>!x.oculto)[0];c.vac='abc';var R=cuentasRevisar();var x=R.filter(x=>x.n0==='Las cajas cuadran con dónde están')[0];var p=(S.probs||[]).filter(p=>/taras no cuadran por lugar/.test(p.txt)).slice(-1)[0];return {ok:x.ok,vac:c.vac,id:c.id,txt:p&&p.txt}});
ok(!r.ok&&r.vac==='abc',arch+' · "abc" no se cambia y la revisión sí avisa',r);
ok(/falla: b/.test(r.txt||'')&&new RegExp('id '+r.id).test(r.txt||'')&&/fuera de redibujo/.test(r.txt||'')&&r.txt.length<=300,arch+' · el aviso dice qué falló (b), qué cliente (por número, sin nombre) y que fue fuera del redibujo',r.txt);
ok(!/C1|Tienda|Panader/.test(r.txt||''),arch+' · el aviso no lleva nombres de clientes',r.txt);
/* sano68 ya no pone 0 */
r=await ev(()=>{S.avPrecio=[];S.probs=[];sano68();var c=S.cli.filter(x=>!x.oculto)[0];var pr=(S.probs||[]).filter(p=>/no se puede leer/.test(p.txt)).slice(-1)[0];return {vac:c.vac,av:S.avPrecio.slice(-1)[0]||'',nube:pr&&pr.txt,n:c.n}});
ok(r.nube&&/cliente #\d+/.test(r.nube)&&r.nube.indexOf(r.n)<0,arch+' · el reporte que va a la nube no lleva el nombre',r.nube);
ok(r.vac==='abc'&&/no se puede leer \(no se cambió\)/.test(r.av)&&/las taras de /.test(r.av)&&!(S=>0)(),arch+' · al redibujar ya no se pone en 0 (no se sube una resta falsa); en la app avisa con el nombre',r);
await ev(()=>{S.cli.filter(x=>!x.oculto)[0].vac=0});
/* "Arreglado en la 9.9" */
r=await ev(()=>{S._probs122=null;S.probs=[{auto:true,f:'2026-11-17',txt:'Las taras no cuadran por lugar: viejo',k:'x'},{auto:true,f:'2026-11-23',txt:'Las taras no cuadran por lugar: nuevo',k:'y'}];probs122();return S.probs.map(p=>!!p.res)});
ok(r[0]===true&&r[1]===false,arch+' · "Arreglado en la 9.9" solo para reportes de antes del 19 nov; el de la 10.20 queda abierto',r);
await p.close()}
ok(!errs.length,'sin errores',errs);console.log(nOK+' OK · '+nF+' FAIL');await b.close()})();
