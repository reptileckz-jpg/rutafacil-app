/* 164 · pantalla ancha (computadora, DeX): la lista de clientes ocupa todo el ancho en cuadrícula (sin la columna larga con huecos al lado) y la
   barra de navegación de la izquierda no tapa el contenido. En el celular todo sigue igual. */
const {chromium}=require('playwright');let nOK=0,nF=0;const ok=(c,m,x)=>{c?nOK++:nF++;console.log((c?'OK   ':'FAIL ')+m+(x!==undefined?' '+JSON.stringify(x).slice(0,400):''))};
(async()=>{const b=await chromium.launch();const errs=[];
const mide=async(W)=>{const p=await (await b.newContext({viewport:{width:W,height:900}})).newPage();p.on('pageerror',e=>errs.push(e.message));p.on('dialog',d=>d.accept());await p.addInitScript(()=>{window.__pnTest=1;window.__hora93=12});
 await p.goto('file:///mnt/user-data/outputs/prototipo-platanos.html');await p.waitForTimeout(900);
 const r=await p.evaluate(()=>{S.tutVisto={rep:true,admin:true};S.popVisto={admin:iso(TODAY),cont:iso(TODAY)};S.role='admin';S.pinOk[pinKey()]=true;S.tab.admin='clientes';render();
  var L=document.querySelector('main>.lista164'),m=document.querySelector('main'),nav=document.querySelector('nav.tabs');
  var cols=L?getComputedStyle(L).gridTemplateColumns.split(' ').length:0,wL=L?L.offsetWidth:0;
  var navR=nav?nav.getBoundingClientRect():null,mL=m.getBoundingClientRect().left;return {lista:!!L,cols:cols,anchoLista:Math.round(wL),anchoMain:Math.round(m.clientWidth-parseFloat(getComputedStyle(m).paddingLeft)-parseFloat(getComputedStyle(m).paddingRight)),navDer:navR?Math.round(navR.right):0,mainIzq:Math.round(mL),navLado:navR&&navR.height>navR.width,sw:document.documentElement.scrollWidth}});
 await p.close();return r};
let r=await mide(1366);
ok(r.lista&&r.cols>=3&&r.anchoLista===r.anchoMain,'1366 px: la lista de clientes ocupa todo el ancho, en 3 columnas o más',r);
ok(!r.navLado&&r.mainIzq<=20,'1366 px: con la barra flotante (165) ya no hay barra a la izquierda; el contenido usa todo el ancho',r);
ok(r.sw<=1366,'1366 px: nada se sale por la derecha',r);
r=await mide(1920);ok(r.lista&&r.cols>=4,'1920 px (DeX a pantalla completa): 4 columnas o más',r);
r=await mide(390);ok(!r.lista&&r.sw<=390,'celular (390 px): todo igual que antes (lista normal)',r);
ok(!errs.length,'sin errores',errs);console.log(nOK+' OK · '+nF+' FAIL');await b.close()})();
