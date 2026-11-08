// Auditoría: errores al tocar, saltos de scroll y textos raros en todas las pantallas
const {chromium}=require('playwright');const fs=require('fs');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:400,height:880}});await p.addInitScript(()=>{window.__pnTest=1});
const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.goto('file:///mnt/user-data/outputs/platanos-primera-vez.html');await p.waitForTimeout(400);await p.evaluate(()=>{if(S.setup&&!S.setup.fin){suAplicar();render()}});
await p.evaluate(()=>{S.popVisto={admin:iso(TODAY),cont:iso(TODAY)};window.__snap0=JSON.stringify(S);window.__errs=[];window.addEventListener('error',function(e){window.__errs.push(e.message)})});
// pantallas a revisar: [nombre, función que prepara]
const screens=await p.evaluate(()=>{var L=[];['admin','local','cont','rep'].forEach(function(r){tabsDe(r).forEach(function(t){L.push([r+'/'+t,'S.role="'+r+'";S.tab["'+r+'"]="'+t[0]+'"'+(r==='rep'?';S.salida.ok=true':'')])})});
 L.push(['admin/ajustes','S.role="admin";S.aj=true']);L.push(['admin/menu','S.role="admin";S.menu=true']);L.push(['rep/menu','S.role="rep";S.menu=true']);
 L.push(['admin/cargas-registrar','S.role="admin";S.tab.admin="cargas";cmNuevo()']);L.push(['admin/vehiculo1','S.role="admin";S.tab.admin="vehiculos";S.vehOpen=1']);
 L.push(['admin/simulador','S.role="admin";simNuevo()']);L.push(['admin/viaje-nuevo','S.role="admin";vwNuevo(null)']);L.push(['admin/estadisticas-ganancias','S.role="admin";S.tab.admin="estadisticas";S.st.sec="ganancias"']);
 L.push(['rep/entrega','S.role="rep";S.salida.ok=true;S.inv.reparto=80;S.inv.repartoKg=200;S.tab.rep="entrega"']);L.push(['rep/gasto','S.role="rep";S.salida.ok=true;S.tab.rep="ruta";S.gxSheet=true']);return L});
const out={errores:[],saltos:[],textos:{},botones:0};
const RX=[['fecha sin formato',/\b20\d\d-\d\d-\d\d\b/g],['dinero negativo raro',/\$-|−\$0\b|-\$0\b/g],['NaN/undefined',/\bNaN\b|undefined|\bnull\b|Infinity/g],['"Hoy/Ayer" con día pegado',/\b(el|Pagado|Pagada) (Hoy|Ayer|Antier) [a-zé]+/g],['número negativo de cajas/kg',/(regresan|quedan|te quedan) -\d/g],['"Administrador" como nombre',/(Hola|Cierre de|registró|Entregó:?) Administrador/g],['texto en inglés',/\b(Loading|Error|Submit|Cancel|Save|Delete)\b/g],['doble espacio o signo',/ {2,}[a-z]|\.\.(?!\.)|,,/g]];
for(const [name,prep] of screens){
 const setup=`S=JSON.parse(window.__snap0);S.popVisto={admin:iso(TODAY),cont:iso(TODAY)};${prep};render();window.scrollTo(0,0)`;
 await p.evaluate(setup);await p.waitForTimeout(60);
 const txt=await p.evaluate(()=>document.body.innerText);
 RX.forEach(([k,rx])=>{const m=txt.match(rx);if(m){out.textos[k]=out.textos[k]||[];m.slice(0,4).forEach(x=>out.textos[k].push(name+': '+x))}});
 const btns=await p.evaluate(()=>{var seen={},L=[];document.querySelectorAll('[data-act]').forEach(function(el,i){if(!el.offsetParent&&getComputedStyle(el).position!=='fixed')return;var a=el.dataset.act;if(/^(reset|enviar|tab|role|chofsel|adminyo|noeres|llamada)$/.test(a))return;var k=a+'|'+(el.dataset.k||'')+'|'+(el.dataset.v||'')+'|'+(el.dataset.t||'');if(seen[k])return;seen[k]=1;el.setAttribute('data-aud',String(i));L.push({i:String(i),a:a,txt:(el.innerText||el.getAttribute('aria-label')||'').trim().slice(0,30)})});return L});
 for(const bt of btns.slice(0,70)){out.botones++;
  await p.evaluate(setup);await p.waitForTimeout(20);
  const r=await p.evaluate((bt)=>{window.__errs=[];var el=Array.from(document.querySelectorAll('[data-act="'+bt.a+'"]')).filter(function(x){return x.offsetParent||getComputedStyle(x).position==='fixed'})[0];if(!el)return null;
   var cont=document.querySelector('#ajov,#cmov,#cvov,#vwov,#arqov,.gxsheet .pn,.drawer nav')||null;el.scrollIntoView({block:'center'});var sc0=cont?cont.scrollTop:window.scrollY,y0=el.getBoundingClientRect().top;
   try{el.click()}catch(e){window.__errs.push(e.message)}
   return new Promise(function(res){setTimeout(function(){var c2=document.querySelector('#ajov,#cmov,#cvov,#vwov,#arqov,.gxsheet .pn,.drawer nav');var sc1=c2?c2.scrollTop:window.scrollY;var same=c2&&cont&&c2.id===cont.id&&c2.className===cont.className;res({err:window.__errs.slice(),sc0:sc0,sc1:sc1,same:same||(!cont&&!c2),modal:!!S.modal||!!S.confirm})},120)})},bt);
  if(!r)continue;
  if(r.err.length)out.errores.push(name+' → '+bt.a+' ('+bt.txt+'): '+r.err[0]);
  if(r.same&&!r.modal&&r.sc0>250&&r.sc1<r.sc0-200)out.saltos.push(name+' → "'+bt.txt+'" ['+bt.a+'] baja de '+Math.round(r.sc0)+' a '+Math.round(r.sc1));
 }
}
out.pageerrors=Array.from(new Set(errs)).slice(0,30);
fs.writeFileSync('v39/audit-vacio.json',JSON.stringify(out,null,1));console.log('botones',out.botones,'errores',out.errores.length,'saltos',out.saltos.length);await b.close()})();
