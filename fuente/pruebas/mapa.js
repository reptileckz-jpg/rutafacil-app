const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();let nOK=0,nF=0;const ok=(c,m,x)=>{c?nOK++:nF++;console.log((c?'OK   ':'FAIL ')+m+(x!==undefined?' '+JSON.stringify(x).slice(0,300):''))};
const p=await b.newPage({viewport:{width:390,height:844}});const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.addInitScript(()=>{window.__pnTest=1;window.__maps=0;var mk=function(){var o={_l:[],on:function(){return o},addTo:function(){return o},bindTooltip:function(){return o},addLayer:function(x){o._l.push(x);return o},clearLayers:function(){o._l=[];return o}};return o};
 window.L={map:function(el){window.__maps++;var m={fitBounds:function(){m.fit=1},setView:function(){},invalidateSize:function(){}};return m},tileLayer:function(){return mk()},layerGroup:function(){var g=mk();window.__g=window.__g||[];window.__g.push(g);return g},marker:function(){return mk()},polyline:function(){return mk()},divIcon:function(){return {}}}});
await p.goto('file:///mnt/user-data/outputs/prototipo-platanos.html');await p.waitForTimeout(700);const ev=(f,a)=>p.evaluate(f,a),W=ms=>p.waitForTimeout(ms);
await ev(()=>{S.popVisto={admin:iso(TODAY),cont:iso(TODAY)};S.role='admin';S.tab.admin='personal';render()});await W(300);
let r=await ev(()=>({n:document.querySelectorAll('[data-vivo]').length,maps:window.__maps,svg:document.querySelectorAll('main svg[aria-label="Mapa de choferes y clientes"]').length}));ok(r.n>=1&&r.maps>=1&&r.svg===0,'Personal: mapa real en lugar del dibujo',r);
const m0=await ev(()=>window.__maps);await ev(()=>{render();render()});ok(await ev(()=>window.__maps)===m0,'al volver a dibujar la pantalla, el mapa no se vuelve a crear');
// ubicación del chofer en vivo
r=await ev(()=>{var id=S.choferes.filter(c=>!esAdm(c))[0].id;nbRSet(id,'gps',{lat:19.55,lng:-96.93,t:Date.now(),acc:10});render();return {marks:JSON.parse(document.querySelector('[data-mapdata]').getAttribute('data-j')).marks.length,txt:/📍 ahora/.test(document.querySelector('main').innerText)}});ok(r.marks>=1&&r.txt,'el admin ve al chofer en el mapa y "📍 ahora"',r);
// viaje
r=await ev(()=>{S.role='rep';vwNuevo(null);S.vw.started=true;S.vw.ftSal='x';S.vw.k='camino';render();return document.querySelectorAll('#vwov [data-vivo]').length});ok(r===1,'viaje de carga: mapa real',r);
ok(!errs.length,'sin errores',errs);console.log(nOK+' OK · '+nF+' FAIL');await b.close()})();
