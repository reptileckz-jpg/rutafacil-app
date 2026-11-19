/* 132 · avisos push: al asignar un pedido, el celular del administrador escribe el aviso en la nube (n/pn/push/…) para ese chofer;
   el celular del chofer guarda su token de avisos (n/pn/tok/{chofer}) una vez al día. Sin Firebase en el APK, nada cambia. */
const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();let nOK=0,nF=0;const ok=(c,m,x)=>{c?nOK++:nF++;console.log((c?'OK   ':'FAIL ')+m+(x!==undefined?' '+JSON.stringify(x).slice(0,400):''))};
const p=await (await b.newContext({viewport:{width:390,height:844}})).newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));p.on('dialog',d=>d.accept());
await p.addInitScript(()=>{window.__pnTest=1;window.__hora93=11;window.__tok=0;window.Capacitor={Plugins:{RutaNativa:{pushToken:function(){window.__tok++;return Promise.resolve({token:'TOKEN-DANU-123'})}}}}});
await p.goto('file:///mnt/user-data/outputs/platanos-primera-vez.html');await p.waitForTimeout(900);const ev=(f,a)=>p.evaluate(f,a),W=ms=>p.waitForTimeout(ms);let r;
await ev(()=>{var U=S.setup;U.veh=[{n:'Camioneta Uno',pl:'AAA1',plEdo:'Baja California',comb:'Gasolina',img:0,odo:1000}];U.per=[{n:'Danu',puesto:'chofer',tel:'1'},{n:'Rafa',puesto:'chofer',tel:'2'}];U.cli=[{n:'Doña Mary',a:'x',tel:'6640000001',dias:[0,1,2,3,4,5,6],cred:0,vac:0,ch:'0'}];U.prov=[];S.precio.R=275;S.precio.M=20;suAplicar();
 window.__esc=[];NB.on=true;NB.listo=true;NB.neg='pn';NB.ad=Object.assign({},NB.ad||{},{set:function(path,obj){window.__esc.push({path:path,obj:JSON.parse(JSON.stringify(obj))});return Promise.resolve()}});
 S.role='admin';S.pinOk[pinKey()]=true});
/* administrador asigna un pedido */
r=await ev(()=>{var D=S.choferes.filter(c=>c.n==='Danu')[0],c=S.cli[0];c.ped={R:10,M:5,f:iso(TODAY),nota:'bien maduro'};window.__esc=[];var t=p57Asigna(c,D.id);return {t:t,D:D.id,esc:window.__esc.filter(x=>/\/push\//.test(x.path))}});
ok(r.esc.length===1&&/^n\/pn\/push\//.test(r.esc[0].path),'al asignar el pedido se escribe el aviso en la nube',r.esc);
ok(r.esc[0]&&r.esc[0].obj.ch===String(r.D)&&r.esc[0].obj.titulo==='📦 Pedido nuevo'&&r.esc[0].obj.texto==='Doña Mary: 10 cajas y 5 kg · bien maduro'&&r.esc[0].obj.tipo==='pedido','el aviso dice para quién, qué cliente y cuánto',r.esc[0]&&r.esc[0].obj);
ok(r.esc[0]&&Object.keys(r.esc[0].obj).sort().join(',')==='ch,t,texto,tipo,titulo','solo los campos que dejan las reglas',r.esc[0]&&Object.keys(r.esc[0].obj));
/* sin nube: no se manda nada */
r=await ev(()=>{NB.on=false;window.__esc=[];var D=S.choferes.filter(c=>c.n==='Rafa')[0],c=S.cli[0];c.ped={R:2,M:0,f:iso(TODAY)};p57Asigna(c,D.id);NB.on=true;return window.__esc.length});ok(r===0,'sin nube no se intenta mandar');
/* el chofer no manda avisos */
r=await ev(()=>{S.role='rep';window.__esc=[];var x=pushManda132(4,'x','y','z');S.role='admin';return [x,window.__esc.length]});ok(r[0]===false&&r[1]===0,'el celular del chofer no manda avisos');
/* el celular del chofer guarda su token (una vez al día) */
r=await ev(()=>{var D=S.choferes.filter(c=>c.n==='Danu')[0];NB.perfil={rol:'chofer',chId:D.id};try{localStorage.removeItem('push132')}catch(e){}_push132.k='';window.__esc=[];pushRegistra132();
 return new Promise(res=>setTimeout(()=>{var a=window.__esc.filter(x=>/\/tok\//.test(x.path));pushRegistra132();setTimeout(()=>{res({a:a,D:D.id,n:window.__esc.filter(x=>/\/tok\//.test(x.path)).length,llam:window.__tok})},200)},200))});
ok(r.a.length===1&&r.a[0].path==='n/pn/tok/'+r.D&&r.a[0].obj.t==='TOKEN-DANU-123'&&Object.keys(r.a[0].obj).sort().join(',')==='t,ts','el chofer guarda su token en n/pn/tok/{chofer}',r.a);
ok(r.n===1,'no lo vuelve a guardar el mismo día',r);
/* APK sin Firebase: no pasa nada */
r=await ev(()=>{window.Capacitor.Plugins.RutaNativa.pushToken=function(){return Promise.reject(new Error('sin-firebase'))};try{localStorage.removeItem('push132')}catch(e){}_push132.k='';window.__esc=[];pushRegistra132();return new Promise(res=>setTimeout(()=>res(window.__esc.length),200))});
ok(r===0,'APK sin Firebase: no guarda nada y la app sigue igual');
ok(!errs.length,'sin errores',errs);
console.log(nOK+' OK · '+nF+' FAIL');await b.close()})();
