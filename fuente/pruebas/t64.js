const {chromium}=require('playwright');
/* l64: entrar en otro celular: sin error rojo engañoso; "crear la cuenta" cuando ya existe no deja cuentas sueltas; "olvidé" con usuario */
(async()=>{const b=await chromium.launch();let nOK=0,nF=0;const ok=(c,m,x)=>{c?nOK++:nF++;console.log((c?'OK   ':'FAIL ')+m+(x!==undefined?' '+JSON.stringify(x).slice(0,300):''))};
const errs=[];const p=await b.newPage({viewport:{width:400,height:860}});p.on('pageerror',e=>errs.push(e.message));
await p.addInitScript(()=>{window.__pnTest=1});await p.goto('file:///mnt/user-data/outputs/platanos-primera-vez.html');await p.waitForTimeout(800);const ev=(f,a)=>p.evaluate(f,a),W=ms=>p.waitForTimeout(ms);
await ev(()=>{window.__c={borra:0,salir:0,reset:[],sets:[]};NB.on=true;NB.ad={crear:()=>Promise.resolve('nuevo'),get:p=>p==='meta/duenio'?Promise.resolve({uid:'dueno'}):(p==='usuarios/dany'?Promise.resolve({email:'dany.admin@gmail.com'}):(p==='usuarios/pepe'?Promise.resolve({email:'pepe@rutafacil.app'}):Promise.resolve(null))),
  set:(p)=>{__c.sets.push(p);return Promise.reject({code:'permission-denied'})},borrarYo:()=>{__c.borra++;return Promise.resolve()},salir:()=>{__c.salir++;return Promise.resolve()},reset:e=>{__c.reset.push(e);return Promise.resolve()}};
 NB.est='login';NB.revErr='FirebaseError: Missing or insufficient permissions.';NBF.modo='entrar';nbPantalla()});
let r=await ev(()=>{const o=document.getElementById('nbov');return {err:/faltan las reglas/.test(o.innerText),aviso:/NUNCA ha usado/.test(o.innerText)}});
ok(!r.err&&r.aviso,'sin sesión: ya no sale "faltan las reglas" y "Crear la cuenta" avisa que es solo la primera vez',r);
/* olvidé con usuario de administrador */
await ev(()=>{document.getElementById('nbu').value='dany';document.querySelector('#nbov [data-nb="olvide"]').click()});await W(100);
r=await ev(()=>({reset:__c.reset,msg:NBF.msg}));ok(r.reset[0]==='dany.admin@gmail.com'&&/da•••@gmail\.com/.test(r.msg),'"Olvidé mi contraseña" con usuario: manda el correo al correo del administrador',r);
await ev(()=>{nbPantalla();document.getElementById('nbu').value='pepe';document.querySelector('#nbov [data-nb="olvide"]').click()});await W(100);
r=await ev(()=>({n:__c.reset.length,err:NBF.err}));ok(r.n===1&&/contraseña nueva/.test(r.err),'usuario de chofer (sin correo propio): dice que el administrador le da una nueva',r);
/* crear cuando ya hay dueño */
await ev(()=>{NBF.modo='crear';NBF.err='';NBF.msg='';nbPantalla()});
const hay=await ev(()=>!!document.getElementById('nbe'));
await ev(()=>{const s=(id,v)=>{const i=document.getElementById(id);if(i)i.value=v};s('nbn','Juan');s('nbe','x@gmail.com');s('nbp','123456');s('nbp2','123456');document.querySelector('#nbov [data-nb="crear"]').click()});await W(200);
r=await ev(()=>({borra:__c.borra,salir:__c.salir,sets:__c.sets,err:NBF.err,modo:NBF.modo}));
ok(hay&&r.borra===1&&r.salir===1&&r.sets.length===0&&/ya tiene su cuenta/.test(r.err)&&r.modo==='entrar','crear la cuenta del negocio cuando ya existe: no se crea otra, se borra la cuenta suelta y explica cómo entrar',r);
ok(!errs.length,'sin errores',errs);console.log(nOK+' OK · '+nF+' FAIL');await b.close()})();
