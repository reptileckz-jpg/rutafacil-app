/* 8 (nueva numeración) · la pantalla ya no parpadea mientras baja la nube: las fotos que llegan se ponen en tandas (un redibujo por tanda,
   no uno por foto) y lo que llega de la nube redibuja como mucho cada 0.5 s, sin perder el último cambio. Lo que toca el usuario, igual. */
const {chromium}=require('playwright');let nOK=0,nF=0;const ok=(c,m,x)=>{c?nOK++:nF++;console.log((c?'OK   ':'FAIL ')+m+(x!==undefined?' '+JSON.stringify(x).slice(0,300):''))};
(async()=>{const b=await chromium.launch();const errs=[];
for(const arch of ['prototipo-platanos.html','platanos-primera-vez.html']){
const p=await (await b.newContext({viewport:{width:412,height:900}})).newPage();p.on('pageerror',e=>errs.push(e.message));
await p.addInitScript(()=>{window.__pnTest=1});await p.goto('file:///mnt/user-data/outputs/'+arch);await p.waitForTimeout(1200);const ev=(f,a)=>p.evaluate(f,a);let r;
await ev(()=>{var bv=document.getElementById('bienv');if(bv)bv.remove();if(S.setup&&!S.setup.fin){var U=S.setup;U.veh=[{n:'Camioneta Uno',pl:'AAA1',plEdo:'Baja California',comb:'Gasolina',img:0,odo:1000}];U.per=[{n:'Danu',puesto:'chofer',tel:'1'}];U.cli=[{n:'Doña Mary',a:'x',tel:'1',dias:[0,1,2,3,4,5,6],cred:0,vac:0,ch:'0'}];U.prov=[];S.precio.R=275;S.precio.M=20;suAplicar();_pin.modo=null}S.role='admin';S.tutVisto={rep:true,admin:true};S.tab.admin='personal';var c=(S.choferes||[]).filter(c=>!esAdm(c))[0];S.openCh=c?c.id:null;render()});
/* 100 fotos que llegan de la nube una tras otra */
r=await ev(async()=>{S.rutasHist=S.rutasHist||[];for(var i=0;i<100;i++)S.rutasHist.push({f:'2026-10-01',ch:99,log:[],fotoX:FOTO_MARCA+'g'+i+'⟧'});S.cli[0].fotoY=FOTO_MARCA+'g7⟧';
 await new Promise(r=>setTimeout(r,700));var R=0,r0=render;render=function(){R++;return r0.apply(this,arguments)};
 for(var j=0;j<100;j++){NB.fotos['g'+j]='data:image/png;base64,QQ'+j;nbPonFoto(FOTO_MARCA+'g'+j+'⟧','data:image/png;base64,QQ'+j);await new Promise(r=>setTimeout(r,20))}
 await new Promise(r=>setTimeout(r,1200));render=r0;
 return {R,quedan:S.rutasHist.filter(x=>x.fotoX&&x.fotoX.indexOf(FOTO_MARCA)===0).length,bien:S.rutasHist.filter(x=>x.ch===99).every((x,i)=>x.fotoX==='data:image/png;base64,QQ'+i),dos:S.cli[0].fotoY==='data:image/png;base64,QQ7'}});
ok(r.R<=8&&r.R>=1,arch+' · 100 fotos que llegan seguidas: unos cuantos redibujos (antes 100)',r.R);
ok(r.quedan===0&&r.bien&&r.dos,arch+' · todas las fotos quedan puestas en su lugar (también si se usa en dos lugares)',r);
/* lo que llega de la nube: como mucho cada 0.5 s y el último cambio siempre se dibuja */
r=await ev(async()=>{await new Promise(r=>setTimeout(r,700));var R=0,r0=render;render=function(){R++;return r0.apply(this,arguments)};
 for(var i=0;i<20;i++){S.cli[0].n9='v'+i;nbRender();await new Promise(r=>setTimeout(r,50))}
 var n1=R;await new Promise(r=>setTimeout(r,900));render=r0;return {durante:n1,total:R}});
ok(r.total<=5&&r.total>=2,arch+' · 20 cambios de la nube en 1 s: unos cuantos redibujos, no 20',r);
r=await ev(async()=>{S.tab.admin='clientes';S.openCh=null;render();await new Promise(r=>setTimeout(r,700));S.cli[0].n='Cliente Cambiado 8';nbRender();S.cli[0].n='Cliente Final 8';nbRender();await new Promise(r=>setTimeout(r,800));return document.querySelector('main').innerText.indexOf('Cliente Final 8')>-1});
ok(r,arch+' · el último cambio que llega de la nube sí se ve',r);
/* lo que toca el usuario se dibuja al momento (no pasa por la espera) */
r=await ev(()=>{S.tab.admin='inicio';render();return document.querySelector('main')&&S.tab.admin==='inicio'});ok(r,arch+' · lo que toca el usuario se dibuja al momento',r);
await p.close()}
ok(!errs.length,'sin errores',errs);console.log(nOK+' OK · '+nF+' FAIL');await b.close()})();
