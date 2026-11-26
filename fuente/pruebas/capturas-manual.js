/* Toma las capturas para el manual y la guía rápida (fuente/ayuda/img/). Uso: node fuente/pruebas/capturas-manual.js (desde fuente/) y luego python3 fuente/ayuda/hacer-manual.py */
const {chromium}=require('playwright');const OUT='ayuda/img/';
(async()=>{const b=await chromium.launch();const hechas=[],fallas=[];
async function pagina(arch,extra){const p=await (await b.newContext({viewport:{width:390,height:844},deviceScaleFactor:2})).newPage();p.on('dialog',d=>d.accept());
 await p.addInitScript((x)=>{window.__pnTest=1;window.__hora93=9;if(x)window.__pr24Test=1},extra);await p.goto('file:///mnt/user-data/outputs/'+arch);await p.waitForTimeout(1300);
 await p.addStyleTag({content:'#morehint,.toast,#toast{display:none!important}'});return p}
async function foto(p,nom,fn,sel){try{await p.evaluate(fn);await p.waitForTimeout(500);await p.evaluate(()=>{var t=document.querySelector('.toast,#toast');if(t)t.remove()});
  if(sel){const el=p.locator(sel).first();await el.scrollIntoViewIfNeeded();await p.waitForTimeout(250);await el.screenshot({path:OUT+nom+'.png'})}else await p.screenshot({path:OUT+nom+'.png'});hechas.push(nom)}catch(e){fallas.push(nom+': '+String(e).slice(0,120))}}
const base=()=>{S.tutVisto={admin:true,rep:true,cont:true,local:true};S.popVisto={admin:iso(TODAY)};S.cajaAyerSkip=true;S.menu=false;S.c30=null;S.wz=null;S.rp56=null;S.sk37=null;S.openCli=null;S.openCarga=null;S.vc40=null;S.szOpen=null;S.aj=null;window.scrollTo(0,0)};
let p=await pagina('prototipo-platanos.html',false);
await p.evaluate(base);
const A=(fn)=>new Function('('+base.toString()+')();S.role="admin";S.pinOk[pinKey()]=true;S.precio.conf=iso(TODAY);'+fn+';render();');
await foto(p,'a-inicio',A('S.tab.admin="inicio"'));
await foto(p,'a-hoy',A('S.tab.admin="inicio";setTimeout(function(){var e=document.querySelector("main [data-x=hoy92]");if(e)e.scrollIntoView()},50)'),'main [data-x="hoy92"]');
await foto(p,'a-centro',A('S.tab.admin="inicio";var G=c30Grupos();var k=Object.keys(G)[0];S.c30={sec:k,i:0}'));
await foto(p,'a-centro-sec',A('S.tab.admin="inicio";S.c30={sec:null}'));
await foto(p,'a-rutas',A('S.tab.admin="rutas"'));
await foto(p,'a-clientes',A('S.tab.admin="clientes"'));
await foto(p,'a-cliente',A('S.tab.admin="clientes";S.openCli=S.cli.filter(function(x){return num(x.cred)>500})[0].id'));
await foto(p,'a-bodega',A('S.tab.admin="bodega"'));
await foto(p,'a-existencias',A('S.tab.admin="bodega"'),'main [data-x="exist65"]');
await foto(p,'a-cargas',A('S.tab.admin="cargas"'));
await foto(p,'a-mas',A('S.tab.admin="mas"'));
await foto(p,'a-gastos',A('S.tab.admin="gastos"'));
await foto(p,'a-sueldos',A('S.tab.admin="personal";S.per92="sue";S.szOpen=S.choferes.filter(function(c){return esCh(c)&&!esAdm(c)})[0].id;setTimeout(function(){var e=document.querySelector("main [data-x=pr39]");if(e)e.scrollIntoView({block:"center"})},60)'));
await foto(p,'a-prestamo',A('S.tab.admin="personal";wzAbre("prest39",{ch:S.choferes.filter(function(c){return esCh(c)&&!esAdm(c)})[0].id})'));
await foto(p,'a-banco',A('S.tab.admin="inicio"'),'main [data-x="bdep34"]');
await foto(p,'a-cuadre',A('S.tab.admin="cuadre121"'));
await foto(p,'a-dev',A('S.tab.admin="dev37";S.dev37={v:"rep"}'));
await foto(p,'a-misueldo',A('S.tab.admin="mas";wzAbre("suel35",{})'));
await foto(p,'a-cobrar',A('S.tab.admin="clientes";S.vc40={c:S.cli.filter(function(x){return num(x.cred)>500})[0].id}'));
await foto(p,'r-sacudir',A('S.tab.admin="inicio";S.sk37={t:1}'));
await foto(p,'r-reporte',A('S.tab.admin="inicio";var c=document.createElement("canvas");c.width=390;c.height=700;var x=c.getContext("2d");x.fillStyle="#eef2ea";x.fillRect(0,0,390,700);x.fillStyle="#166534";x.font="bold 28px sans-serif";x.fillText("Captura de la pantalla",40,120);x.strokeStyle="#E11D48";x.lineWidth=6;x.beginPath();x.arc(195,300,90,0,6.3);x.stroke();S.rp56={donde:"Administrador → Inicio",txt:"El botón Ir no hace nada",g:"traba",foto:c.toDataURL("image/jpeg"),auto37:true}'));
await p.close();
/* precio sin fijar */
p=await pagina('prototipo-platanos.html',true);
await foto(p,'a-precio-grande',()=>{S.tutVisto={admin:true,rep:true};S.popVisto={admin:iso(TODAY)};S.role='admin';S.pinOk[pinKey()]=true;S.precio.conf='';try{localStorage.removeItem('pr24')}catch(e){}S.tab.admin='inicio';render()});
await foto(p,'a-precio-tarjeta',()=>{var o=document.getElementById('pr24ov');if(o)o.remove();try{localStorage.setItem('pr24',iso(TODAY))}catch(e){}render()},'main [data-x="precio65"]');
await p.close();
/* chofer */
p=await pagina('prototipo-platanos.html',false);
const C=(fn)=>new Function('('+base.toString()+')();S.role="rep";S.chofHoy=1;S.pinOk[pinKey()]=true;S.pinOk["c:1"]=true;S.inv.reparto=30;S.inv.repartoKg=120;'+fn+';render();');
await foto(p,'c-iniciar',C('S.salida.ok=false;S.tab.rep="ruta"'));
await foto(p,'c-ruta',C('S.salida.ok=true;S.salida.f7=iso(TODAY);S.rutaDia80=iso(TODAY);S.cierre.sent=false;S.inv.reparto=30;S.tab.rep="ruta"'));
await foto(p,'c-entrega',C('S.salida.ok=true;S.cur=0;resetDraft(cl(Array.from(S.stops)[0].c));S.tab.rep="entrega"'));
await foto(p,'c-cobro',C('S.salida.ok=true;S.tab.rep="entrega";setTimeout(function(){var v=[].slice.call(document.querySelectorAll("main button")).filter(function(x){return /^Siguiente/.test(x.textContent.trim())});if(v.length)v[v.length-1].click()},60)'));
await foto(p,'c-nota',async()=>{var n0=S.log.length;for(let i=0;i<12;i++){var v=[...document.querySelectorAll('button')].filter(x=>x.offsetParent&&/^(Siguiente|Revisar y guardar|Sí, guardar|Guardar entrega|Ya le pedí|Sí)/.test(x.textContent.trim()));if(!v.length)break;v[v.length-1].click();await new Promise(r=>setTimeout(r,200));if(S.log.length>n0)break}window.scrollTo(0,0)});
await foto(p,'c-cierre',C('S.salida.ok=true;S.tab.rep="cierre";S.cierreP=0'));
await p.close();
/* configuración inicial */
p=await (await b.newContext({viewport:{width:390,height:844},deviceScaleFactor:2})).newPage();await p.goto('file:///mnt/user-data/outputs/platanos-primera-vez.html');await p.waitForTimeout(1300);
await foto(p,'s-config',()=>{var bv=document.getElementById('bienv');if(bv)bv.remove();S.setup.p=0;S.setup.sub75=0;render()});
await foto(p,'s-config-ayuda',()=>{S.ayu38=true;S.setup.p=4;render()});
await p.close();
console.log('HECHAS',hechas.length,hechas.join(' '));console.log('FALLAS',fallas.join('\n'));await b.close()})();
