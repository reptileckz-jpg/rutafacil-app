/* 175 · El teclado ya no se abre y se cierra solo: al abrirse el teclado la pantalla solo cambia de ALTO y la app ya no se redibuja
   (antes quitaba el foco del campo). Si cambia el ANCHO (girar, abrir el Fold) sí se acomoda; si estás escribiendo, al salir del campo. */
const {chromium}=require('playwright');let nOK=0,nF=0;const ok=(c,m,x)=>{c?nOK++:nF++;console.log((c?'OK   ':'FAIL ')+m+(x!==undefined?' '+JSON.stringify(x).slice(0,400):''))};
(async()=>{const b=await chromium.launch();const errs=[];
const p=await (await b.newContext({viewport:{width:412,height:900},hasTouch:true})).newPage();p.on('pageerror',e=>errs.push(e.message));p.on('dialog',d=>d.accept());
await p.addInitScript(()=>{window.__pnTest=1;window.__hora93=8});
await p.goto('file:///mnt/user-data/outputs/platanos-primera-vez.html');await p.waitForTimeout(900);const ev=(f,a)=>p.evaluate(f,a);let r;
await ev(()=>{var bv=document.getElementById('bienv');if(bv)bv.remove();var U=S.setup;U.veh=[{n:'Camioneta Uno',pl:'AAA1',plEdo:'Baja California',comb:'Gasolina',img:0,odo:1000}];U.per=[{n:'Danu',puesto:'chofer',tel:'1'}];U.cli=[{n:'Doña Mary',a:'x',tel:'6640000001',dias:[0,1,2,3,4,5,6],cred:0,vac:0,ch:'0'}];U.prov=[];S.precio.R=275;S.precio.M=20;suAplicar();_pin.modo=null;S.tutVisto={rep:true,admin:true};
 var D=S.choferes.filter(c=>c.n==='Danu')[0];S.pinOk[pinKey()]=true;S.pinOk['c:'+D.id]=true;S.role='rep';S.chofHoy=D.id;chCambiar(D.id);S.tab.rep='ruta';render();var b=document.querySelector('[data-act="bienvgo"]');if(b)b.click();
 S.vehHoy=S.veh[0].id;salPon124(5);render()});
await p.waitForTimeout(400);
for(const id of ['salR','salM']){
 await p.setViewportSize({width:412,height:900});await p.waitForTimeout(400);
 const pt=await ev(id=>{var e=document.getElementById(id);if(!e)return null;e.scrollIntoView({block:'center'});var q=e.getBoundingClientRect();return {x:q.left+q.width/2,y:q.top+q.height/2}},id);
 if(!pt){ok(false,'no se encontró '+id);continue}
 await ev(()=>{window.__blur=0;document.addEventListener('focusout',function f(){window.__blur++},true)});
 await p.touchscreen.tap(pt.x,pt.y);await p.waitForTimeout(100);
 await p.setViewportSize({width:412,height:520});await p.waitForTimeout(800);   /* sale el teclado */
 await p.keyboard.type('7');await p.waitForTimeout(200);
 r=await ev(id=>({act:document.activeElement&&document.activeElement.id,blur:window.__blur,val:document.getElementById(id).value}),id);
 ok(r.act===id&&r.blur===0&&/7/.test(r.val),'Iniciar el día › Carga › '+(id==='salR'?'cajas de roatán':'kilos de macho')+': con el teclado abierto el campo no se cierra y se puede escribir',r);
 await ev(()=>document.activeElement&&document.activeElement.blur());}
/* girar / abrir el Fold (cambia el ANCHO) sí acomoda la pantalla */
await p.setViewportSize({width:412,height:900});await p.waitForTimeout(500);
r=await ev(()=>{window.__rend=0;var _r=render;render=function(){window.__rend++;return _r.apply(this,arguments)};return true});
await p.setViewportSize({width:884,height:900});await p.waitForTimeout(600);
r=await ev(()=>window.__rend);ok(r>=1,'al cambiar el ancho (Fold abierto) la pantalla se vuelve a acomodar',r);
/* cambiar el ancho mientras escribes: espera a que salgas del campo */
await ev(()=>{S.role='admin';S.pinOk[pinKey()]=true;S.tab.admin='clientes';render()});await p.waitForTimeout(300);
const hay=await ev(()=>{var i=document.querySelector('main input[type="text"],main input[type="search"],main input:not([type])');if(!i)return false;i.focus();window.__rend=0;return document.activeElement===i});
if(hay){await p.setViewportSize({width:700,height:900});await p.waitForTimeout(600);
 r=await ev(()=>({rend:window.__rend,campo:/INPUT/.test(document.activeElement&&document.activeElement.tagName)}));
 const a=r;await ev(()=>document.activeElement.blur());await p.waitForTimeout(300);r=await ev(()=>window.__rend);
 ok(a.rend===0&&a.campo&&r>=1,'si cambia el ancho mientras escribes, se acomoda al salir del campo (no te cierra el teclado)',{escribiendo:a,alSalir:r})}
else ok(false,'no hubo campo en Clientes');
ok(!errs.length,'sin errores',errs);console.log(nOK+' OK · '+nF+' FAIL');await b.close()})();
