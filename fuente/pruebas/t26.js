/* 26 · al ver cierres pasados (Cuadre → 📷 Fotos del cierre) salen también la foto de lo que regresó, las de lo que cargó en ruta, y si falta la de gasolina */
const {chromium}=require('playwright');let nOK=0,nF=0;const ok=(c,m,x)=>{c?nOK++:nF++;console.log((c?'OK   ':'FAIL ')+m+(x!==undefined?' '+JSON.stringify(x).slice(0,300):''))};
(async()=>{const b=await chromium.launch();const errs=[];
for(const arch of ['prototipo-platanos.html','platanos-primera-vez.html']){
const p=await (await b.newContext({viewport:{width:390,height:844}})).newPage();p.on('pageerror',e=>errs.push(String(e)));await p.addInitScript(()=>{window.__pnTest=1});
await p.goto('file:///mnt/user-data/outputs/'+arch);await p.waitForTimeout(900);const ev=(f,a)=>p.evaluate(f,a);let r;
await ev(()=>{if(S.setup&&!S.setup.fin){var U=S.setup;U.veh=[{n:'NP300',pl:'A1',plEdo:'Baja California',comb:'Gasolina',img:0,odo:1000}];U.per=[{n:'Danu',puesto:'chofer',tel:'1'}];U.cli=[{n:'C1',a:'x',tel:'1',dias:[0,1,2,3,4,5,6],cred:0,vac:0,ch:'0'}];U.prov=[];S.precio.R=300;S.precio.M=20;suAplicar();_pin.modo=null}
 var mk=t=>{var c=document.createElement('canvas');c.width=30;c.height=30;var x=c.getContext('2d');x.fillStyle=t;x.fillRect(0,0,30,30);return c.toDataURL('image/jpeg')};window.MK=mk;
 var D=S.choferes.filter(c=>esCh(c)&&!esAdm(c))[0];S.role='rep';S.chofHoy=+D.id;S.pinOk['c:'+D.id]=true;arLoad(chNuevo(+D.id));S.salida.ok=true;S.rutaDia80=iso(TODAY);S.inv.reparto=10;S.inv.maduras=20;
 S.salida.fotos={frente:mk('#a00'),atras:mk('#0a0'),izq:mk('#00a'),der:mk('#aa0'),odo:mk('#0aa')};
 S.salida.fotosFin={frente:mk('#b00'),atras:mk('#0b0'),izq:mk('#00b'),der:mk('#bb0'),odo:mk('#0bb')};S.cierre.fotoReg=mk('#777');S.tab.rep='ruta';render()});
/* carga en ruta con foto (por la ventana de "Cargar más") */
r=await ev(async()=>{S.cx={R:'3',M:'',foto:MK('#333'),err:''};render();var b=document.createElement('button');b.dataset.act='cxsave';document.body.appendChild(b);b.click();b.remove();await new Promise(r=>setTimeout(r,30));var x=S.extras[S.extras.length-1];return {ch:x.ch,f:x.f,foto:!!x.foto,me:S.chofHoy}});
ok(r.foto&&r.ch===r.me&&r.f,arch+' · la carga en ruta queda con su foto, su chofer y su día',r);
r=await ev(()=>{var F=fotosRuta121(S);var h=fotosHTML121(F);var d=document.createElement('div');d.innerHTML=h;return {otras:F.otras.map(o=>o.t),t:d.innerText}});
ok(r.otras.indexOf('Lo que regresó')>-1&&r.otras.some(t=>/Cargó en ruta/.test(t)&&/3 cajas/.test(t)),arch+' · el historial del cierre guarda "Lo que regresó" y "Cargó en ruta"',r.otras);
ok(/Carga y regreso/.test(r.t)&&/Lo que regresó/.test(r.t)&&/Cargó en ruta/.test(r.t)&&/Gasolina al llegar · no la tomó/.test(r.t),arch+' · en "📷 Fotos del cierre" salen, y avisa que no tomó la de gasolina',r.t);
r=await ev(()=>{S.salida.fotosFin.gas=MK('#b0b');var d=document.createElement('div');d.innerHTML=fotosHTML121(fotosRuta121(S));return d.innerText});
ok(/Gasolina/.test(r)&&!/no la tomó/.test(r),arch+' · con la foto de gasolina, sale la foto',r);
await p.close()}
ok(!errs.length,'sin errores',errs);console.log(nOK+' OK · '+nF+' FAIL');await b.close()})();
