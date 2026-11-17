/* 119 · fotos más nítidas: 1280 px y 82% (antes 640 px y 70%) */
const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();let nOK=0,nF=0;const ok=(c,m,x)=>{c?nOK++:nF++;console.log((c?'OK   ':'FAIL ')+m+(x!==undefined?' '+JSON.stringify(x).slice(0,300):''))};
const p=await (await b.newContext({viewport:{width:390,height:844}})).newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));await p.addInitScript(()=>{window.__pnTest=1});
await p.goto('file:///mnt/user-data/outputs/platanos-primera-vez.html');await p.waitForTimeout(900);const ev=(f,a)=>p.evaluate(f,a);let r;
await ev(()=>{var U=S.setup;U.veh=[{n:'Camioneta Uno',pl:'AAA1',plEdo:'Baja California',comb:'Gasolina',img:0,odo:1000}];U.per=[{n:'Chofer Uno',puesto:'chofer',tel:'1'}];U.cli=[];U.prov=[];S.precio.R=300;S.precio.M=20;suAplicar();
 var id=S.choferes.filter(c=>c.n==='Chofer Uno')[0].id;S.pinOk[pinKey()]=true;S.pinOk['c:'+id]=true;S.role='rep';S.chofHoy=id;chCambiar(id);S.vehHoy=S.veh[0].id;S.tab.rep='ruta';render();var bv=document.querySelector('[data-act="bienvgo"]');if(bv)bv.click();S.salida.ok=true;S.tab.rep='cierre';render()});
// una foto grande (3000×2000, como la de un celular) en el odómetro del cierre
r=await ev(async()=>{var cv=document.createElement('canvas');cv.width=3000;cv.height=2000;var x=cv.getContext('2d');for(var i=0;i<300;i++){x.fillStyle='hsl('+(i*37%360)+',70%,50%)';x.fillRect((i*97)%3000,(i*53)%2000,120,80)}x.fillStyle='#000';x.font='bold 60px Arial';for(var j=0;j<20;j++)x.fillText('048262 km  ABC-123',40,90+j*95);
 var blob=await new Promise(r=>cv.toBlob(r,'image/jpeg',0.95));var inp=[...document.querySelectorAll('input[type=file]')].filter(x=>/odo/.test(x.id))[0];if(!inp)return {hay:false};var g=inp.dataset.grp,k=inp.dataset.foto;
 var dt=new DataTransfer();dt.items.add(new File([blob],'o.jpg',{type:'image/jpeg'}));inp.files=dt.files;inp.dispatchEvent(new Event('change',{bubbles:true}));await new Promise(r=>setTimeout(r,1500));
 var u=S.salida[g]&&S.salida[g][k];if(!u)return {hay:true,u:false};var im=new Image();await new Promise(r=>{im.onload=r;im.src=u});return {hay:true,w:im.width,h:im.height,kb:Math.round(u.length*3/4/1024)}});
ok(r.hay&&r.w===1280&&r.h===853,'119 · la foto del odómetro se guarda a 1280 px (antes 480)',r);
ok(r.kb>60&&r.kb<900,'119 · y pesa lo razonable para subir a la nube (menos de 900 KB; un documento aguanta 1 MB)',r.kb+' KB');
r=await ev(()=>({px:FOTO_PX119,q:FOTO_Q119}));ok(r.px===1280&&r.q===0.82,'119 · tamaño y calidad en un solo lugar (l1.js)',r);
r=await ev(()=>{var s=document.documentElement.outerHTML;return {n640:(s.match(/Math\.min\(1,640\/Math\.max\(im\.width/g)||[]).length,n720:(s.match(/Math\.min\(1,720\/Math\.max\(im\.width/g)||[]).length}});
ok(r.n640===0&&r.n720===0,'119 · ya no queda ninguna foto reducida a 640/720 px',r);
ok(!errs.length,'sin errores de página',errs.slice(0,3));
console.log(nOK+' OK · '+nF+' FAIL');await b.close()})();
