const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();let nOK=0,nF=0;const ok=(c,m,x)=>{c?nOK++:nF++;console.log((c?'OK   ':'FAIL ')+m+(x!==undefined?' '+JSON.stringify(x):''))};
const p=await b.newPage({viewport:{width:390,height:844}});const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.goto('file:///mnt/user-data/outputs/prototipo-platanos.html');await p.waitForTimeout(700);
const ev=(f,a)=>p.evaluate(f,a);
await ev(()=>{S.role='admin';S.encOn=false;S.pinOk[pinKey()]=true;_pin={v:'',modo:null};S.popVisto={admin:iso(TODAY)};S.tab.admin='inicio';var ch=S.choferes.filter(c=>!esAdm(c))[0];window._ch=ch;S.pins['c:'+ch.id]='5823';S.avPrecio.push('URGENTE: '+ch.n+' olvidó su PIN y pide que se lo reinicies. [pin:c:'+ch.id+']');render()});await p.waitForTimeout(300);
let t=await ev(()=>document.querySelector('main').innerText);ok(/olvidó su PIN/.test(t)&&!/\[pin:/.test(t),'aviso visible sin la marca');
await ev(()=>{[...document.querySelectorAll('[data-act="avgo"]')].find(x=>/olvidó su PIN/.test(x.innerText)).click()});await p.waitForTimeout(700);
ok(await ev(()=>S.tab.admin==='personal'&&S.openCh===_ch.id),'te lleva a Personal, a la ficha del chofer');
ok(await ev(()=>!!document.querySelector('[data-act="pinreset"]')),'ahí está el botón de reiniciar PIN');await ev(()=>document.querySelector('[data-act="pinreset"]').click());ok(await ev(()=>!S.avPrecio.some(x=>/olvidó su PIN/.test(x))&&!S.pins['c:'+_ch.id]),'al reiniciar se quita el aviso');
const casos=[['URGENTE: X registró un gasto SIN ticket: Comida $100 (por revisar)','gastos'],['Salió con una falla: '+'VEH'+' (Danu): luces','vehiculos'],['URGENTE: CH pide reabrir su ruta para dar otra vuelta. Autorízalo en Inicio.','inicio']];
for(const [x,tt] of casos){const r=await ev(([x])=>{x=x.replace('VEH',S.veh[0].n).replace('CH',_ch.n);return avDestino(x).t},[x]);ok(r===tt,'aviso → '+tt,r)}
/* ventana de urgentes */
await ev(()=>{S.avPrecio.push('URGENTE: '+_ch.n+' olvidó su PIN y pide que se lo reinicies. [pin:c:'+_ch.id+']');S.popVisto={};S.popI=0;S.tab.admin='inicio';render()});await p.waitForTimeout(300);
t=await ev(()=>{var d=document.querySelector('[aria-label="Aviso urgente"]');return d?d.innerText:''});ok(/de \d+/.test(t),'ventana de urgentes "1 de N" al abrir',t.slice(0,120));
const tiene=await ev(()=>popItems().some(x=>/olvidó su PIN/.test(x.m)));ok(tiene,'el urgente del PIN está en la ventana');
ok(!errs.length,'sin errores',errs);console.log(nOK+' OK · '+nF+' FAIL');await b.close()})();
