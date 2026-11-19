/* 161 · pantallas angostas (la de enfrente del Z Fold, ~320 px, y con letra grande ~280 px): nada se sale por la derecha en las pantallas
   del administrador y del chofer, en la demo y en la real. (Los botones de tipos de gasto se deslizan a propósito y el mapa va dentro de su
   recuadro: no cuentan.) */
const {chromium}=require('playwright');let nOK=0,nF=0;const ok=(c,m,x)=>{c?nOK++:nF++;console.log((c?'OK   ':'FAIL ')+m+(x!==undefined?' '+JSON.stringify(x).slice(0,600):''))};
(async()=>{const b=await chromium.launch();
for(const W of [344,320,280])for(const url of ['/mnt/user-data/outputs/prototipo-platanos.html','/mnt/user-data/outputs/platanos-primera-vez.html']){const out=[];
 const p=await (await b.newContext({viewport:{width:W,height:740},deviceScaleFactor:1})).newPage();p.on('dialog',d=>d.accept());await p.addInitScript(()=>{window.__pnTest=1;window.__hora93=12});
 await p.goto('file://'+url);await p.waitForTimeout(1000);
 const res=await p.evaluate(async(W)=>{S.tutVisto={rep:true,admin:true};S.popVisto={admin:iso(TODAY),cont:iso(TODAY)};var R=[];var wait=ms=>new Promise(r=>setTimeout(r,ms));
  var revisa=function(nombre){var m=document.querySelector('main');if(!m)return;var malos=[];document.querySelectorAll('main *').forEach(function(e){var r=e.getBoundingClientRect();if(r.width>0&&r.right>W+1&&getComputedStyle(e).position!=='fixed'){var anc=e.closest('[data-k],[data-x],[data-key],.card');malos.push((anc?(anc.dataset.k||anc.dataset.x||anc.dataset.key||anc.className.slice(0,20)):'?')+' <'+e.tagName.toLowerCase()+(e.className?'.'+String(e.className).split(' ')[0]:'')+'> '+Math.round(r.right)+'px "'+(e.innerText||'').trim().slice(0,30).replace(/\n/g,' ')+'"')}});
   var sw=document.documentElement.scrollWidth;if(malos.length||sw>W+1)R.push({pant:nombre,sw:sw,malos:[...new Set(malos)].slice(0,6)})};
  var tabs=['inicio','bodega','cargas','clientes','gastos','rutas','estadisticas','vehiculos','personal','mas','finanzas','cuadre121'];
  S.role='admin';S.pinOk[pinKey()]=true;for(var t of tabs){S.tab.admin=t;try{render()}catch(e){}await wait(80);revisa('admin·'+t)}
  S.role='rep';S.pinOk[pinKey()]=true;for(var t2 of ['ruta','entrega','cierre','nota']){S.tab.rep=t2;try{render()}catch(e){}await wait(80);revisa('chofer·'+t2)}
  return R},W);
 out.push(...res.filter(x=>x.pant!=='admin·gastos'&&!(x.pant==='admin·rutas'&&x.malos.every(m=>/polygon|svg|path/.test(m)))));await p.close();
 ok(out.length===0,W+' px · '+(/primera/.test(url)?'real':'demo')+': nada se sale de la pantalla',out)}
console.log(nOK+' OK · '+nF+' FAIL');await b.close()})();
