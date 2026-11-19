/* 129 · ticket por WhatsApp: después de mandarlo la imagen ya no sale doble abajo; si no se pudo mandar (o con "Ver como imagen")
   sale con botones que sí funcionan (Guardar en el celular, Compartir, Ocultar) en lugar de "mantén presionada" (en el APK no hace nada). */
const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();let nOK=0,nF=0;const ok=(c,m,x)=>{c?nOK++:nF++;console.log((c?'OK   ':'FAIL ')+m+(x!==undefined?' '+JSON.stringify(x).slice(0,500):''))};
const p=await (await b.newContext({viewport:{width:390,height:844}})).newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));p.on('dialog',d=>d.accept());
await p.addInitScript(()=>{window.__pnTest=1;window.__hora93=12;window.open=function(u){(window.__abre=window.__abre||[]).push(u);return null};
 /* pieza nativa de prueba (como en el APK) */
 window.__nat={comp:[],guar:[],compOk:true};window.Capacitor={Plugins:{RutaNativa:{compartir:function(o){window.__nat.comp.push(o);return window.__nat.compOk?Promise.resolve({}):Promise.reject(new Error('no'))},guardar:function(o){window.__nat.guar.push(o);return Promise.resolve({donde:'Descargas'})}}}}});
await p.goto('file:///mnt/user-data/outputs/prototipo-platanos.html');await p.waitForTimeout(900);const ev=(f,a)=>p.evaluate(f,a),W=ms=>p.waitForTimeout(ms);let r;
await ev(()=>{S.popVisto={admin:iso(TODAY),cont:iso(TODAY)};S.precio.conf=iso(TODAY);S.role='rep';S.salida.ok=true;S.pinOk[pinKey()]=true;S.tutVisto={rep:true,admin:true};
 S.nota={tel:'6641112233',folio:3,fecha:'miércoles, 18 de noviembre de 2026',cli:'Doña Mary',entrego:chofN(S.chofHoy),recibio:'',R:4,M:0,V:0,vacDebe:0,may:0,pr:275,pm:20,total:1100,pago:600,abono:0,cred:500,prox:'',img:null,showTxt:false};
 S.tab.rep='nota';render()});
const txt=()=>ev(()=>{var m=document.querySelector('main');return m?m.innerText:''});
const imgs=()=>ev(()=>document.querySelectorAll('main img[alt="Nota de remisión como imagen"]').length);
r=await ev(()=>!!document.querySelector('main [data-act="tkwa"],main [data-act="notawa"]'));ok(r,'sale el botón para mandar el ticket');
/* 1. se manda bien (como en el APK) */
await ev(()=>{var b=document.querySelector('main [data-act="tkwa"]')||document.querySelector('main [data-act="notawa"]');b.click()});await W(300);
r={n:await ev(()=>window.__nat.comp.length),tel:await ev(()=>(window.__nat.comp[0]||{}).tel),img:await imgs(),t:await txt(),ni:await ev(()=>S.nota.img)};
ok(r.n===1&&r.tel==='6641112233','la imagen se manda directo al WhatsApp del cliente',[r.n,r.tel]);
ok(r.img===0&&r.ni===null,'después de mandarlo, la imagen YA NO sale abajo (antes salía doble)',[r.img,!!r.ni]);
ok(!/Mantén presionada|mantenla presionada/i.test(r.t),'ya no dice "mantén presionada"');
/* 2. no se pudo mandar: sale la imagen con botones */
await ev(()=>{window.__nat.compOk=false;S.nota.waOk=false;render()});
await ev(()=>{var b=document.querySelector('main [data-act="tkwa"]')||document.querySelector('main [data-act="notawa"]');b.click()});await W(300);
r={img:await imgs(),t:await txt(),btn:await ev(()=>['imgguarda','tkimgcomp','tkimgx'].map(a=>!!document.querySelector('main [data-act="'+a+'"]')))};
ok(r.img===1,'si no se pudo mandar, sale la imagen (una sola vez)',r.img);
ok(r.btn.every(Boolean)&&/Guardar en el celular/.test(r.t)&&/Compartir la imagen/.test(r.t)&&/Ocultar la imagen/.test(r.t),'con botones: Guardar en el celular, Compartir y Ocultar',r.btn);
ok(!/Mantén presionada|mantenla presionada/i.test(r.t),'sin "mantén presionada"');
/* guardar */
await ev(()=>document.querySelector('main [data-act="imgguarda"]').click());await W(200);
r=await ev(()=>({n:window.__nat.guar.length,nom:(window.__nat.guar[0]||{}).nombre,b64:((window.__nat.guar[0]||{}).base64||'').length,t:(document.querySelector('.toast,#toast')||{}).innerText||''}));
ok(r.n===1&&r.b64>1000&&/\.png$/.test(r.nom),'"Guardar en el celular" la guarda en Descargas',r);
/* compartir otra vez */
await ev(()=>{window.__nat.compOk=true;window.__nat.comp=[];document.querySelector('main [data-act="tkimgcomp"]').click()});await W(200);
r=await ev(()=>({n:window.__nat.comp.length,tel:(window.__nat.comp[0]||{}).tel}));
ok(r.n===1&&r.tel==='6641112233','"Compartir la imagen" la manda otra vez al cliente',r);
/* ocultar */
await ev(()=>document.querySelector('main [data-act="tkimgx"]').click());await W(100);
ok(await imgs()===0,'"Ocultar la imagen" la quita');
/* Ver como imagen */
await ev(()=>{var b=document.querySelector('main [data-act="notaimg"]');if(b)b.click()});await W(100);
r={img:await imgs(),btn:await ev(()=>!!document.querySelector('main [data-act="imgguarda"]'))};
ok(r.img===1&&r.btn,'"Ver como imagen": sale con el botón para guardarla',r);
ok(!errs.length,'sin errores',errs);
console.log(nOK+' OK · '+nF+' FAIL');await b.close()})();
