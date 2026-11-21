/* 15 (nueva numeración) · la pantalla no se mueve sola cuando termina de cargar una imagen que está ARRIBA de lo que ves (el logo de la nota
   crecía ~90 px al cargar y "Seguir con la ruta" bajaba: se tocaba "Ver como imagen"). El logo tiene su espacio reservado. */
const {chromium}=require('playwright');let nOK=0,nF=0;const ok=(c,m,x)=>{c?nOK++:nF++;console.log((c?'OK   ':'FAIL ')+m+(x!==undefined?' '+JSON.stringify(x).slice(0,300):''))};
const PNG='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==';
(async()=>{const b=await chromium.launch();const errs=[];
const p=await (await b.newContext({viewport:{width:412,height:820},hasTouch:true})).newPage();p.on('pageerror',e=>errs.push(e.message));
await p.addInitScript(()=>{window.__pnTest=1;window.__hora93=9});await p.goto('file:///mnt/user-data/outputs/prototipo-platanos.html');await p.waitForTimeout(1200);const ev=(f,a)=>p.evaluate(f,a);let r;
await ev(()=>{var bv=document.getElementById('bienv');if(bv)bv.remove();S.role='rep';S.chofHoy=1;S.pinOk[pinKey()]=true;S.pinOk['c:1']=true;S.salida.ok=true;S.salida.f7=iso(TODAY);S.rutaDia80=iso(TODAY);S.cierre.sent=false;S.tutVisto={rep:true,admin:true};S.inv.reparto=Math.max(S.inv.reparto,20);
 var c=cl(S.stops[0].c);S.cur=0;S.tab.rep='entrega';resetDraft(c);S.d.R=2;S.d.M=0;S.d.mode='todo';render()});
await p.waitForTimeout(400);
for(let i=0;i<12;i++){const t=await ev(()=>S.tab.rep);if(t==='nota')break;await ev(()=>{var v=[...document.querySelectorAll('button')].filter(x=>x.offsetParent&&/^(Siguiente|Revisar y guardar|Sí, guardar|Guardar entrega|Ya le pedí|Sí)/.test(x.textContent.trim()));if(v.length)v[v.length-1].click()});await p.waitForTimeout(350)}
r=await ev(()=>{var im=document.querySelector('#notaPrev > div > img');var cs=im&&getComputedStyle(im);return {tab:S.tab.rep,h:cs&&cs.height,w:cs&&cs.width}});
ok(r.tab==='nota'&&r.h==='90px'&&r.w==='90px','el logo de la nota tiene su espacio reservado (90 × 90): no crece al cargar',r);
/* una imagen arriba de lo que se ve que termina de cargar (simulada: sin tamaño, y luego carga) */
r=await ev(async(PNG)=>{var m=document.querySelector('main');var im=document.createElement('img');im.style.width='120px';im.style.display='block';m.prepend(im);render();await new Promise(r=>setTimeout(r,300));
 window.scrollTo(0,document.documentElement.scrollHeight);await new Promise(r=>setTimeout(r,300));var bt=document.querySelector('[data-act="notaseguir"]');var y0=Math.round(bt.getBoundingClientRect().top),s0=scrollY;
 im.src=PNG;await new Promise(r=>setTimeout(r,500));var y1=Math.round(bt.getBoundingClientRect().top);im.remove();return {s0,y0,y1,alto:120}},PNG);
ok(r.s0>0&&Math.abs(r.y1-r.y0)<=2,'una imagen ARRIBA que carga y crece 120 px: el botón "Seguir con la ruta" se queda en su lugar (antes bajaba)',r);
/* una imagen a la vista que carga: no se mueve la pantalla por eso */
r=await ev(async(PNG)=>{window.scrollTo(0,0);await new Promise(r=>setTimeout(r,200));var im=document.createElement('img');im.style.width='60px';im.style.display='block';var h1=document.querySelector('main h1');h1.after(im);render();await new Promise(r=>setTimeout(r,300));var s0=scrollY;im.src=PNG;await new Promise(r=>setTimeout(r,500));var s1=scrollY;im.remove();return {s0,s1}},PNG);
ok(r.s0===r.s1,'una imagen a la vista que carga no mueve la pantalla',r);
/* lo que cambia por un redibujo no se compensa aquí (lo acomoda el motor de pantalla) */
r=await ev(async()=>{window.scrollTo(0,document.documentElement.scrollHeight);await new Promise(r=>setTimeout(r,300));var s0=scrollY;S.nota.showTxt=false;render();await new Promise(r=>setTimeout(r,300));return {s0,s1:scrollY}});
ok(Math.abs(r.s1-r.s0)<=2,'un redibujo sin cambios no mueve la pantalla',r);
/* barrido: toda la app, a media pantalla y hasta abajo, 4 redibujos */
for(const arch of ['prototipo-platanos.html','platanos-primera-vez.html']){
const p=await (await b.newContext({viewport:{width:412,height:820},hasTouch:true})).newPage();
await p.addInitScript(()=>{window.__pnTest=1;window.__hora93=9});await p.goto('file:///mnt/user-data/outputs/'+arch);await p.waitForTimeout(1200);
await p.evaluate(()=>{var bv=document.getElementById('bienv');if(bv)bv.remove();if(S.setup&&!S.setup.fin){var U=S.setup;U.veh=[{n:'Camioneta Uno',pl:'AAA1',plEdo:'Baja California',comb:'Gasolina',img:0,odo:1000}];U.per=[{n:'Danu',puesto:'chofer',tel:'1'}];U.cli=[];for(var i=0;i<12;i++)U.cli.push({n:'Cliente '+i,a:'x'+i,tel:''+i,dias:[0,1,2,3,4,5,6],cred:i%3?200:0,vac:i%2,ch:'0'});U.prov=[];S.precio.R=275;S.precio.M=20;suAplicar();_pin.modo=null}S.tutVisto={rep:true,admin:true}});
const pant=[['admin','inicio'],['admin','rutas'],['admin','clientes'],['admin','bodega'],['admin','cargas'],['admin','mas'],['admin','gastos'],['admin','personal'],['admin','estadisticas'],['admin','vehiculos'],['admin','cuadre121'],['admin','desc6'],['rep','ruta'],['rep','entrega'],['rep','cierre'],['rep','nota']];
for(const [rol,tab] of pant){
 const r=await p.evaluate(async([rol,tab])=>{S.role=rol;if(rol==='rep'){var D=S.choferes.filter(c=>esCh(c))[0];S.chofHoy=+D.id;S.pinOk[pinKey()]=true;S.pinOk['c:'+D.id]=true;S.salida.ok=true;S.salida.f7=iso(TODAY);S.rutaDia80=iso(TODAY);S.cierre.sent=false;S.inv.reparto=Math.max(5,num(S.inv.reparto));if(!(S.stops||[]).length)S.stops=S.cli.filter(x=>!x.oculto).slice(0,10).map(x=>({c:x.id}));if(tab==='entrega'){S.cur=0;resetDraft(cl(S.stops[0].c))}if(tab==='nota'&&!S.nota){S.nota={cli:'X',R:1,M:0,total:275,pago:275,abono:0,V:0,recibio:'',fecha:'hoy',entrego:'Y',vacDebe:0,cred:0,prox:'',pr:275,pm:20}}}
  S.tab[rol]=tab;render();await new Promise(r=>setTimeout(r,500));var out=[];var max=document.documentElement.scrollHeight-innerHeight;if(max<40)return {tab,corto:true};
  for(const pos of [0.5,1]){window.scrollTo(0,Math.round(max*pos));await new Promise(r=>setTimeout(r,250));var y0=scrollY;var el=document.elementFromPoint(innerWidth/2,innerHeight*0.5);var fx=false;for(var z=el;z&&z.tagName!=='HTML';z=z.parentElement){var ps=getComputedStyle(z).position;if(ps==='fixed'||ps==='sticky'){fx=true;break}}if(fx)el=null;var t0=el?el.getBoundingClientRect().top:0;var peor=0;
   for(var i=0;i<4;i++){render();await new Promise(r=>setTimeout(r,150));var t=el&&el.isConnected?el.getBoundingClientRect().top:t0;peor=Math.max(peor,Math.abs(t-t0))}
   out.push({pos,y0,y:scrollY,peor:Math.round(peor),dy:Math.abs(scrollY-y0)})}
  return {tab,out}},[rol,tab]);
 ok(r.corto||r.out.every(o=>o.peor<=2),arch.slice(0,4)+' · '+rol+' '+tab+': al redibujar (a media pantalla y hasta abajo) lo que se ve no se mueve',r);
}
await p.close()}
ok(!errs.length,'sin errores',errs);console.log(nOK+' OK · '+nF+' FAIL');await b.close()})();
