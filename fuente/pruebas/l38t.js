const {chromium}=require('playwright');const fs=require('fs');
(async()=>{const b=await chromium.launch();let nOK=0,nF=0;const ok=(c,m,x)=>{c?nOK++:nF++;console.log((c?'OK   ':'FAIL ')+m+(x!==undefined?' '+JSON.stringify(x):''))};
const p=await b.newPage({viewport:{width:390,height:844}});const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.goto('file:///mnt/user-data/outputs/prototipo-platanos.html');await p.waitForTimeout(700);const ev=(f,a)=>p.evaluate(f,a);
await ev(()=>{S.role='admin';S.encOn=false;S.pinOk[pinKey()]=true;_pin={v:'',modo:null};S.popVisto={admin:iso(TODAY)}});
const b64=await ev(()=>u8b64(xlsxArma(xlsHojas())));fs.writeFileSync('/tmp/claude-0/-home-claude/0fa80c8a-70b4-519a-be68-4797b9c63231/scratchpad/prueba.xlsx',Buffer.from(b64,'base64'));ok(b64.length>1000,'Excel armado');
/* compartir con pieza nativa falsa */
await ev(()=>{window.__c=[];window.Capacitor={Plugins:{RutaNativa:{compartir:o=>{__c.push(o);return Promise.resolve({whatsapp:true})},guardar:o=>{__c.push(o);return Promise.resolve({donde:'Descargas/Ruta Facil/'+o.nombre})}}}}});
const r=await ev(()=>natCompartir('data:image/png;base64,AAAA','t.png',{tel:'228 123 4567'}).then(x=>[x,__c[0].tel,__c[0].base64]));ok(r[0]&&r[1]==='2281234567'&&r[2]==='AAAA','imagen directo al número',r);
await ev(()=>{xlsExportar()});await p.waitForTimeout(200);ok(await ev(()=>__c.some(x=>/\.xlsx$/.test(x.nombre))),'Excel se guarda en Descargas');
/* ajustes: respaldo */
await ev(()=>{S.aj=true;S.dOpen.ajresp=true;render()});await p.waitForTimeout(300);
ok(await ev(()=>!!document.querySelector('#ajov [data-act="respbaja"]')&&!!document.querySelector('#ajov [data-act="borrapr"]')),'Ajustes: respaldo, Excel y borrar pruebas');
await ev(()=>document.querySelector('#ajov [data-act="respbaja"]').click());await p.waitForTimeout(200);ok(await ev(()=>__c.some(x=>/Respaldo.*\.json$/.test(x.nombre))),'respaldo guardado');
const antes=await ev(()=>({cli:S.cli.length,log:S.log.length}));
await ev(()=>{document.querySelector('#ajov [data-act="borrapr"]').click()});await p.waitForTimeout(100);await ev(()=>{var x=document.querySelector('[data-act="borraprsi"]');x.click()});await p.waitForTimeout(600);
const desp=await ev(()=>({cli:S.cli.length,log:S.log.length,g:S.gastos.length,deu:S.cli.reduce((a,c)=>a+num(c.cred),0)}));ok(desp.cli===antes.cli&&desp.log===0&&desp.g===0&&desp.deu===0,'borrar pruebas: quedan clientes, se van ventas y deudas',desp);
/* guardado */
await ev(()=>{S.aj=true;S.dOpen.ajustes=true;render()});await p.waitForTimeout(200);
const g=await ev(()=>{var i=document.querySelector('#ajov input[data-bind^="cfg."]');if(!i)return 'sin campo';i.value='Prueba';i.dispatchEvent(new Event('input',{bubbles:true}));i.dispatchEvent(new Event('change',{bubbles:true}));return i.id});await p.waitForTimeout(300);
ok(await ev(()=>!!document.querySelector('.guardado')),'sale "✓ Guardado"',g);
ok(await ev(()=>!/navegador|en el APK|En el APK/i.test(document.documentElement.innerHTML.replace(/<script[\s\S]*?<\/script>/g,''))),'sin textos de navegador en pantalla');
ok(!errs.length,'sin errores',errs);console.log(nOK+' OK · '+nF+' FAIL');await b.close()})();
