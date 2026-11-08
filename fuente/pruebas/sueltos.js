// Busca información suelta sobre el fondo (sin tarjeta) en todas las pantallas
const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:390,height:844}});await p.addInitScript(()=>{window.__pnTest=1;window.open=()=>null});
await p.goto('file:///mnt/user-data/outputs/prototipo-platanos.html');await p.waitForTimeout(700);const ev=(f,a)=>p.evaluate(f,a);
await ev(()=>{window.__suelto=function(){var res=[],bodyBg=getComputedStyle(document.body).backgroundColor;
 function fondo(el){for(var p=el;p&&p!==document.documentElement;p=p.parentElement){var cs=getComputedStyle(p);var bg=cs.backgroundColor;if(p.id==='root'||p.tagName==='MAIN'||p.tagName==='BODY')return 'app';if(bg&&bg!=='rgba(0, 0, 0, 0)'&&bg!=='transparent'){if(bg===bodyBg&&(cs.position==='fixed'||p.classList.contains('fiw')||/ov$/.test(p.id)||p.classList.contains('w')))return 'app';return 'tarjeta'}}return 'app'}
 var w=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT,null),n;while(n=w.nextNode()){var t=n.nodeValue.trim();if(t.length<3)continue;var el=n.parentElement;if(!el||!el.getClientRects().length)continue;if(el.closest('script,style,h1,.hello,nav,.toast,#tutov,.fihd,.fitabs,.wz-hd,.mindock,.vwmin,[class*="dock"],button,.foot,label.btn,a.btn'))continue;
  var cs=getComputedStyle(el);if(parseFloat(cs.fontSize)>=22)continue;var r=el.getBoundingClientRect();if(r.bottom<0||r.top>innerHeight*3)continue;
  if(fondo(el)==='app'){var k=(el.closest('.lbl,.row,.field,h2,div,p,span')||el);var tx=k.innerText.replace(/\s+/g,' ').trim().slice(0,60);if(res.indexOf(tx)<0)res.push(tx)}}
 return res}});
const pantallas=[];
const roles={admin:['inicio','clientes','bodega','cargas','gastos','vehiculos','personal','estadisticas','bienes','sugerencias'],rep:['ruta','entrega','viaje','cierre']};
for(const r of Object.keys(roles))for(const t of roles[r]){const res=await ev(([r,t])=>{S.role=r;S.encOn=false;S.chofHoy=r==='rep'?1:S.chofHoy;S.pinOk[pinKey()]=true;_pin={v:'',modo:null};S.popVisto={admin:iso(TODAY)};S.tutVisto={rep:true,admin:true};S.openCli=null;S.openCh=null;S.vehOpen=null;S.openProv=null;S.openCarga=null;S.tab[r]=t;render();return __suelto()},[r,t]);if(res.length)pantallas.push('['+r+'/'+t+'] '+res.join(' ‖ '))}
// fichas
const fichas=await ev(()=>{var out=[];S.role='admin';var F=[['clientes','openCli',S.cli[0].id,'cli:'+S.cli[0].id],['personal','openCh',1,'emp:1'],['vehiculos','vehOpen',S.veh[0].id,'veh:'+S.veh[0].id],['cargas','openProv',provNames()[0],'prov:'+provNames()[0]]];
 F.forEach(function(f){S.openCli=S.openCh=S.vehOpen=S.openProv=null;S.tab.admin=f[0];S[f[1]]=f[2];if(f[1]==='openProv')S.fiLast='openProv';render();var tabs=[].slice.call(document.querySelectorAll('#fiov [data-act="fitab"]')).map(function(b){return b.dataset.v});(tabs.length?tabs:[null]).forEach(function(tb){if(tb){S.fiTab[f[3]]=tb;render()}var r=__suelto();if(r.length)out.push('[ficha '+f[3]+'/'+tb+'] '+r.join(' ‖ '))})});S.openCli=S.openCh=S.vehOpen=S.openProv=null;return out});
console.log(pantallas.concat(fichas).join('\n'));await b.close()})();
