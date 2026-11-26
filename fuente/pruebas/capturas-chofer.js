/* Capturas para el manual del chofer (fuente/ayuda/img/ch-*.png). Uso (desde fuente/): node pruebas/capturas-chofer.js y luego python3 ayuda/hacer-manual-chofer.py */
const {chromium}=require('playwright');const OUT='ayuda/img/';
(async()=>{const b=await chromium.launch();const hechas=[],fallas=[];
async function pagina(){const p=await (await b.newContext({viewport:{width:390,height:844},deviceScaleFactor:2})).newPage();p.on('dialog',d=>d.accept());
 await p.addInitScript(()=>{window.__pnTest=1;window.__hora93=9;window.Capacitor={Plugins:{RutaNativa:{btLista:()=>Promise.resolve({lista:[{nombre:'PT-210',mac:'AA:BB'}]}),btImprimir:()=>Promise.resolve({})}}}});
 await p.goto('file:///mnt/user-data/outputs/prototipo-platanos.html');await p.waitForTimeout(1300);
 await p.addStyleTag({content:'#morehint,.toast,#toast{display:none!important}'});return p}
const base='S.tutVisto={admin:true,rep:true,cont:true,local:true};S.popVisto={admin:iso(TODAY)};S.menu=false;S.aj=null;S.eqov=null;S.modal=null;S.rp56=null;S.sk37=null;window.scrollTo(0,0);'
 +'S.role="rep";S.chofHoy=1;S.pinOk[pinKey()]=true;S.pinOk["c:1"]=true;S.inv.reparto=30;S.inv.repartoKg=120;';
const enRuta='S.salida.ok=true;S.salida.f7=iso(TODAY);S.rutaDia80=iso(TODAY);S.cierre.sent=false;';
async function foto(p,nom,js,opt){opt=opt||{};try{await p.evaluate(new Function(base+js+';render()'));await p.waitForTimeout(450);
  if(opt.clic){await p.evaluate((t)=>{var v=[...document.querySelectorAll('button,summary,[data-act],[data-tab]')].filter(x=>x.offsetParent&&x.textContent.indexOf(t)>-1);if(v.length)v[0].click()},opt.clic);await p.waitForTimeout(500)}
  if(opt.tab){await p.click('nav [data-tab="'+opt.tab+'"]');await p.waitForTimeout(600)}
  await p.evaluate(()=>{var t=document.querySelector('.toast,#toast');if(t)t.remove()});
  if(opt.sel){const el=p.locator(opt.sel).first();await el.scrollIntoViewIfNeeded();await p.waitForTimeout(250);await el.screenshot({path:OUT+nom+'.png'})}else await p.screenshot({path:OUT+nom+'.png'});hechas.push(nom)}catch(e){fallas.push(nom+': '+String(e).slice(0,140))}}
let p=await pagina();
await foto(p,'ch-bienv','S.salida.ok=false;S.salP124=null;S.tab.rep="ruta"');
await foto(p,'ch-equipo','S.salida.ok=false;S.tab.rep="ruta";S.eqov={est:{}}');
await p.evaluate(new Function(base+'S.salida.ok=false;S.salP124=null;S.tab.rep="ruta";render()'));await p.waitForTimeout(300);
await p.evaluate(async()=>{var b=document.querySelector('[data-act="iniciar"],[data-act="bienvgo"]');if(b)b.click();await new Promise(r=>setTimeout(r,300));document.querySelectorAll('[data-act=eqest][data-v=bien]').forEach(x=>x.click());await new Promise(r=>setTimeout(r,200));var o=document.querySelector('[data-act=eqok]');if(o)o.click();await new Promise(r=>setTimeout(r,400))});
for(const [k,n] of [[0,'veh'],[1,'insp'],[2,'fotos'],[3,'odo'],[5,'carga'],[6,'revisar']])await foto(p,'ch-sal-'+n,'S.tab.rep="ruta";S.salP124={ch:1,d:iso(TODAY),p:'+k+'}');
await p.close();p=await pagina();
await foto(p,'ch-ruta',enRuta+'S.tab.rep="ruta"');
await foto(p,'ch-entrega',enRuta+'S.cur=0;resetDraft(cl(Array.from(S.stops)[0].c));S.tab.rep="entrega"');
await foto(p,'ch-mas',enRuta+'S.cur=0;resetDraft(cl(Array.from(S.stops)[0].c));S.tab.rep="entrega";S.dOpen.entmas=true',{sel:'details[data-k="entmas"]'});
await p.close();p=await pagina();
await foto(p,'ch-cobro',enRuta+'S.cur=0;resetDraft(cl(Array.from(S.stops)[0].c));S.tab.rep="entrega"',{clic:'Siguiente'});
await foto(p,'ch-nota','',{});
await p.evaluate(async()=>{var n0=S.log.length;for(let i=0;i<12;i++){var v=[...document.querySelectorAll('button')].filter(x=>x.offsetParent&&/^(Siguiente|Revisar y guardar|Sí, guardar|Guardar entrega|Ya le pedí|Sí)/.test(x.textContent.trim()));if(!v.length)break;v[v.length-1].click();await new Promise(r=>setTimeout(r,200));if(S.log.length>n0)break}window.scrollTo(0,0)});
await p.waitForTimeout(500);await p.screenshot({path:OUT+'ch-nota.png'});
await p.close();p=await pagina();
await foto(p,'ch-nuevo',enRuta+'S.tab.rep="ruta"',{clic:'🏪'});
await p.close();p=await pagina();
await foto(p,'ch-rapida',enRuta+'S.tab.rep="ruta"',{clic:'⚡'});
await p.close();p=await pagina();
await foto(p,'ch-incidente',enRuta+'S.tab.rep="ruta"',{clic:'Reportar incidente'});
await p.close();p=await pagina();
await foto(p,'ch-gasto',enRuta+'S.tab.rep="ruta"',{tab:'gasto'});
await p.close();p=await pagina();
await foto(p,'ch-viaje',enRuta+'S.tab.rep="ruta"',{tab:'viaje'});
await foto(p,'ch-cierre1',enRuta+'S.tab.rep="cierre";S.cierreP=0');
await foto(p,'ch-cierre4',enRuta+'S.tab.rep="cierre";S.cierreP=3');
await foto(p,'ch-cierre5',enRuta+'S.tab.rep="cierre";S.cierreP=4');
await foto(p,'ch-cierre6',enRuta+'S.tab.rep="cierre";S.cierreP=5');
await foto(p,'ch-impr','S.aj=true;S.impr={mac:"AA:BB",nom:"PT-210",papel:"58",auto:true};S.imprLista=[{nombre:"PT-210",mac:"AA:BB"}]',{sel:'[data-k="imp45"]'});
await foto(p,'ch-impr-nueva','S.aj=true;S.impr=null;S.imprLista=[{nombre:"PT-210",mac:"AA:BB"}]',{sel:'[data-k="imp45"]'});
await p.close();
console.log('HECHAS',hechas.length,hechas.join(' '));console.log('FALLAS',fallas.join('\n'));await b.close()})();
