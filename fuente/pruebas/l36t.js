const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();let nOK=0,nF=0;const ok=(c,m,x)=>{c?nOK++:nF++;console.log((c?'OK   ':'FAIL ')+m+(x!==undefined?' '+JSON.stringify(x):''))};
const p=await b.newPage({viewport:{width:390,height:844}});const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.goto('file:///mnt/user-data/outputs/platanos-primera-vez.html');await p.waitForTimeout(700);
await p.evaluate(()=>{var bv=document.getElementById('bienv');if(bv)bv.remove();suAplicar();S.role='rep';S.chofHoy=S.choferes.filter(c=>!esAdm(c))[0].id;delete S.pins['c:'+S.chofHoy];S.pinOk={};pinEntrar();render()});await p.waitForTimeout(300);
const tap=async d=>{for(const x of d){await p.evaluate(x=>document.querySelector('#pinov [data-v="'+x+'"]').click(),x);await p.waitForTimeout(60)}};
await tap('4821');await tap('4821');await p.waitForTimeout(200);
let t=await p.evaluate(()=>(document.getElementById('pxov')||{}).innerText||'');ok(/pista/.test(t),'después de crear el PIN pide una pista',t.slice(0,80));
await p.evaluate(()=>{const i=document.getElementById('pxp');i.value='4821 jaja';i.dispatchEvent(new Event('input',{bubbles:true}));document.querySelector('[data-act="pistasave"]').click()});await p.waitForTimeout(100);
t=await p.evaluate(()=>document.getElementById('pxov').innerText);ok(/no puede llevar tu PIN/.test(t),'la pista no puede llevar el PIN');
await p.evaluate(()=>{const i=document.getElementById('pxp');i.value='año de mi hija';i.dispatchEvent(new Event('input',{bubbles:true}));document.querySelector('[data-act="pistasave"]').click()});await p.waitForTimeout(150);
ok(await p.evaluate(()=>!document.getElementById('pxov')&&S.pinPista[pinKey()]==='año de mi hija'),'pista guardada');
ok(await p.evaluate(()=>NB_SH.indexOf('pinPista')>-1&&NB_SH.indexOf('encargos')>-1&&NB_SH.indexOf('enc')>-1&&AR_K.indexOf('ciEnvH')>-1),'pista, encargos y encargado se comparten en la nube');
ok(await p.evaluate(()=>pinLimMin('c:'+S.chofHoy)===40&&pinLimMin('a:rn')===5),'chofer 40 min, admin 5 min');
/* bloqueo por inactividad */
await p.evaluate(()=>{_pinAct=Date.now()-41*60000});await p.evaluate(()=>document.body.dispatchEvent(new PointerEvent('pointerdown',{bubbles:true})));await p.waitForTimeout(1200);
t=await p.evaluate(()=>(document.getElementById('pinov')||{}).innerText||'');ok(/Olvidé mi PIN/.test(t)&&/No soy/.test(t),'tras 41 min pide el PIN, con "Olvidé" y "No soy"',t.slice(0,200));
await p.evaluate(()=>document.querySelector('[data-act="pinolv"]').click());await p.waitForTimeout(100);
t=await p.evaluate(()=>document.getElementById('pxov').innerText);ok(/año de mi hija/.test(t),'olvidé: enseña la pista');
await p.evaluate(()=>document.querySelector('[data-act="pinpide"]').click());await p.waitForTimeout(100);
ok(await p.evaluate(()=>S.avPrecio.some(x=>/olvidó su PIN/.test(x))&&!!S.pinPide[pinKey()]),'aviso al admin para reiniciarlo');
t=await p.evaluate(()=>document.getElementById('pxov').innerText);ok(/Ya le pediste/.test(t),'dice que ya se pidió');
await p.evaluate(()=>document.querySelector('[data-act="pxx"]').click());await p.waitForTimeout(80);
await p.evaluate(()=>document.querySelector('[data-act="pinotro"]').click());await p.waitForTimeout(80);
t=await p.evaluate(()=>document.getElementById('pxov').innerText);ok(/Cambiar de usuario/.test(t),'no soy: confirma cambiar de usuario');
await p.evaluate(()=>document.querySelector('[data-act="pxx"]').click());
await tap('4821');await p.waitForTimeout(120);ok(await p.evaluate(()=>!document.getElementById('pinov')),'entra con su PIN');
/* huella con plugin falso */
await p.evaluate(()=>{window.Capacitor={Plugins:{NativeBiometric:{isAvailable:()=>Promise.resolve({isAvailable:true}),verifyIdentity:()=>Promise.resolve()}}};_bioHay=null;localStorage.removeItem(bioLlave()+':no');S.pinOk={};pinEntrar();render()});await p.waitForTimeout(100);
await tap('4821');await p.waitForTimeout(250);
t=await p.evaluate(()=>(document.getElementById('pxov')||{}).innerText||'');ok(/huella/.test(t),'ofrece la huella después del PIN');
await p.evaluate(()=>document.querySelector('[data-act="bioactiva"]').click());await p.waitForTimeout(150);
ok(await p.evaluate(()=>bioActiva()),'huella activada');
await p.evaluate(()=>{S.pinOk={};pinEntrar();render()});await p.waitForTimeout(1500);
ok(await p.evaluate(()=>!document.getElementById('pinov')&&!!S.pinOk[pinKey()]),'entra solo con la huella');
/* baja de chofer */
await p.evaluate(()=>{S.role='admin';S.encOn=false;S.pinOk[pinKey()]=true;var ids=S.choferes.filter(c=>!esAdm(c)).map(c=>c.id);
 if(ids.length<2){S.choferes.push({id:77,n:'Pepe',puesto:'chofer'});ids.push(77)}
 S.cli.push({id:9001,n:'Tienda A',chofer:ids[0],lat:19.53,lng:-96.92,dias:[1]},{id:9002,n:'Tienda B',chofer:ids[1],lat:19.531,lng:-96.921,dias:[1]},{id:9003,n:'Tienda C',chofer:ids[0],lat:19.6,lng:-97,dias:[1]});
 window._ids=ids;var h=document.createElement('button');h.dataset.act='bjabre';h.dataset.id=ids[0];document.body.appendChild(h);h.click();h.remove()});await p.waitForTimeout(150);
t=await p.evaluate(()=>(document.getElementById('bjov')||{}).innerText||'');ok(/Dar de baja/.test(t)&&/Tienda A/.test(t),'pantalla de baja con sus clientes',t.slice(0,120));
ok(await p.evaluate(()=>S.bj.asig[9001]===_ids[1]),'sugiere al chofer de la zona');
await p.evaluate(()=>document.querySelector('[data-act="bjsi"]').click());await p.waitForTimeout(100);
ok(await p.evaluate(()=>{var c=S.choferes.find(x=>x.id===_ids[0]);return c.baja&&cl(9001).chofer===_ids[1]&&cl(9003).chofer!==_ids[0]}),'dado de baja y clientes pasados');
ok(!errs.length,'sin errores',errs);console.log(nOK+' OK · '+nF+' FAIL');await b.close()})();
