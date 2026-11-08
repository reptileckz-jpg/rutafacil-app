const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();let nOK=0,nF=0;const ok=(c,m,x)=>{c?nOK++:nF++;console.log((c?'OK   ':'FAIL ')+m+(x!==undefined?' '+JSON.stringify(x).slice(0,300):''))};
const p=await b.newPage({viewport:{width:390,height:844}});const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.goto('file:///mnt/user-data/outputs/platanos-primera-vez.html');await p.waitForTimeout(700);const ev=(f,a)=>p.evaluate(f,a),W=ms=>p.waitForTimeout(ms);
await ev(()=>{var bv=document.getElementById('bienv');if(bv)bv.remove();suAplicar();_pin.modo=null;S.tutVisto={rep:1,admin:1};S.role='rep';S.chofHoy=S.choferes.filter(c=>!esAdm(c))[0].id;S.pinOk[pinKey()]=true;S.bienv=S.bienv||{};S.bienv[S.chofHoy]=1;S.salida.ok=false;S.tab.rep='ruta';render()});
let r=await ev(()=>{var t=document.querySelector('main').innerText;return {conf:/Confirma lo que marca el tablero/.test(t),odo:!!document.querySelector('[data-act="salodook"]'),tk:!!document.querySelector('[data-act="saltankok"]')}});ok(r.conf&&r.odo&&r.tk,'inicio: pide confirmar odómetro y tanque',r);
await ev(()=>{var b=document.querySelector('[data-act="iniciar"]');if(b)b.click()});await W(100);ok(/Confirma el odómetro/.test(await ev(()=>S.toast)),'sin confirmar no inicia');
await ev(()=>{document.querySelector('[data-act="salodook"]').click()});await ev(()=>{document.querySelector('[data-act="saltankok"]').click()});await W(100);
ok(await ev(()=>S.salida.odoOk&&S.salida.tankOk&&/✓ Odómetro/.test(document.querySelector('main').innerText)),'confirmados');
// revisión lista se encoge
await ev(()=>{S.inspR=S.inspR||{};var r=S.inspR;var o=inspTipoVw?null:null;});
r=await ev(()=>{var b=document.querySelector('[data-act="insptodo"]');if(!b)return 'sin revisión';b.click();var t=document.querySelector('[data-act="insprep"]');if(t)t.click();return {ok:S.inspR&&S.inspR.ok,chico:!!document.querySelector('[data-act="inspver"]')}});ok(r&&r.ok&&r.chico,'revisión terminada: se encoge',r);
// viaje: algo "Mal" pregunta ¿Puedes salir así?
await ev(()=>{S.vws=[];vwNuevo(null);var v=S.vw;v.veh=String((S.veh[0]||{}).id);v.k='insp';render()});await W(200);
r=await ev(()=>{var v=S.vw,o=v.insp;var bs=[...document.querySelectorAll('#vwov [data-act="insp"]')];if(!bs.length)return 'sin botones';document.querySelector('#vwov [data-act="insptodo"]')&&document.querySelector('#vwov [data-act="insptodo"]').click();var mal=[...document.querySelectorAll('#vwov [data-act="insp"]')].find(x=>/Mal/.test(x.textContent));if(mal)mal.click();render();var n=document.querySelector('#vwov [data-act="vwnext"]');if(n)n.click();return new Promise(res=>setTimeout(()=>res({k:v.k,preg:!!v.insp.preg,txt:/¿Puedes salir así\?/.test(document.getElementById('vwov').innerText)}),200))});
ok(r&&r.k==='insp'&&r.preg&&r.txt,'viaje: algo "Mal" → pregunta "¿Puedes salir así?"',r);
ok(!errs.length,'sin errores',errs);console.log(nOK+' OK · '+nF+' FAIL');await b.close()})();
