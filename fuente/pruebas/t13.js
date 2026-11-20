/* 13 (nueva numeración) · las fotos se quedan guardadas en el celular: la foto que baja de la nube (o que se toma aquí) se guarda; la próxima vez
   sale del celular al instante sin pedirla a la nube; hasta 400 (se quitan las que hace más no se usan); y las de los vehículos se dejan listas. */
const {chromium}=require('playwright');let nOK=0,nF=0;const ok=(c,m,x)=>{c?nOK++:nF++;console.log((c?'OK   ':'FAIL ')+m+(x!==undefined?' '+JSON.stringify(x).slice(0,300):''))};
(async()=>{const b=await chromium.launch();const errs=[];
const ctx=await b.newContext({viewport:{width:412,height:900}});
const abre=async()=>{const p=await ctx.newPage();p.on('pageerror',e=>errs.push(e.message));await p.addInitScript(()=>{window.__pnTest=1});await p.goto('file:///mnt/user-data/outputs/prototipo-platanos.html');await p.waitForTimeout(1200);
 await p.evaluate(()=>{var bv=document.getElementById('bienv');if(bv)bv.remove();S.role='admin';S.tutVisto={rep:true,admin:true};window.__nube=[];NB.ad=NB.ad||{};var g=NB.ad.get;NB.ad.set=function(){return Promise.resolve()};NB.ad.get=function(path){window.__nube.push(path);return Promise.resolve({d:'data:image/jpeg;base64,NUBE'+path.split('/').pop()})}});return p};
let p=await abre();const ev=(f,a)=>p.evaluate(f,a);let r;
/* 1ª vez: la foto no está en el celular → se baja de la nube y se guarda */
r=await ev(async()=>{S.veh[0].foto=FOTO_MARCA+'v13a⟧';NB.faltan={'v13a':1};nbTraerFotos();await new Promise(r=>setTimeout(r,1200));return {nube:window.__nube.slice(),foto:S.veh[0].foto,idx:FC13.idx['v13a']!=null}});
ok(r.nube.length===1&&/NUBEv13a$/.test(r.foto)&&r.idx,'la 1ª vez la foto se baja de la nube y queda guardada en el celular',r);
await p.close();
/* la app se vuelve a abrir (la nube vuelve a mandar "aquí va una foto"): sale del celular, sin pedirla a la nube */
p=await abre();
r=await p.evaluate(async()=>{S.veh[0].foto=FOTO_MARCA+'v13a⟧';NB.fotos={};NB.faltan={'v13a':1};var t0=performance.now();nbTraerFotos();for(var i=0;i<40&&S.veh[0].foto.indexOf(FOTO_MARCA)===0;i++)await new Promise(r=>setTimeout(r,10));return {nube:window.__nube.slice(),foto:S.veh[0].foto,ms:Math.round(performance.now()-t0)}});
ok(r.nube.length===0&&/NUBEv13a$/.test(r.foto)&&r.ms<300,'al volver a abrir la app, la foto sale del celular al instante (no se pide a la nube)',r);
/* una foto tomada en este celular también se guarda */
r=await p.evaluate(async()=>{var big='data:image/jpeg;base64,'+'A'.repeat(3000);var m=nbFotoMarca(big);var id=m.slice(FOTO_MARCA.length,-1);await new Promise(r=>setTimeout(r,300));return new Promise(res=>idbGet('f13:'+id,v=>res({guardada:v===big,idx:FC13.idx[id]!=null})))});
ok(r.guardada&&r.idx,'una foto tomada en este celular también queda guardada',r);
/* si una foto guardada se perdió del celular, se vuelve a pedir a la nube (nada se queda sin foto) */
r=await p.evaluate(async()=>{FC13.idx['v13x']=Date.now();S.veh[0].foto=FOTO_MARCA+'v13x⟧';NB.faltan={'v13x':1};window.__nube=[];nbTraerFotos();await new Promise(r=>setTimeout(r,900));if(Object.keys(NB.faltan).length)nbTraerFotos();await new Promise(r=>setTimeout(r,900));return {nube:window.__nube.slice(),foto:S.veh[0].foto}});
ok(r.nube.length===1&&/NUBEv13x$/.test(r.foto),'si no estaba en el celular, se pide a la nube',r);
/* tope de 400: se quitan las que hace más tiempo no se usan */
r=await p.evaluate(async()=>{FC13.max=5;for(var i=0;i<8;i++){fc13Pon('t13n'+i,'data:image/png;base64,'+i);await new Promise(r=>setTimeout(r,5))}var n=Object.keys(FC13.idx).length;FC13.max=400;return {n,viejas:['t13n0','t13n1','t13n2'].some(k=>FC13.idx[k]!=null),nuevas:['t13n7','t13n6'].every(k=>FC13.idx[k]!=null)}});
ok(r.n===5&&!r.viejas&&r.nuevas,'con el tope lleno se quitan las que hace más tiempo no se usan',r);
/* la "foto borrada" (más de 30 días) no se guarda */
r=await p.evaluate(()=>{fc13Pon('t13b',FOTO_BORRADA);return FC13.idx['t13b']==null});ok(r,'la imagen de "foto borrada" no se guarda',r);
/* las fotos de los vehículos se dejan listas */
r=await p.evaluate(()=>{PRE13.t=0;PRE13.hechas={};S.veh[0].foto='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==';render();return PRE13.im.length>0&&PRE13.im.some(im=>im.src===S.veh[0].foto)});
ok(r,'las fotos de los vehículos se dejan listas (precargadas)',r);
ok(!errs.length,'sin errores',errs);console.log(nOK+' OK · '+nF+' FAIL');await b.close()})();
