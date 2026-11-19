/* 163 · "Iniciar el día": en la revisión del vehículo, al marcar una opción la ventana ya no se sube sola; y "Escoger el nivel con botones"
   del tanque ya no se cierra sola cuando la pantalla se vuelve a dibujar. */
const {chromium}=require('playwright');let nOK=0,nF=0;const ok=(c,m,x)=>{c?nOK++:nF++;console.log((c?'OK   ':'FAIL ')+m+(x!==undefined?' '+JSON.stringify(x).slice(0,400):''))};
(async()=>{const b=await chromium.launch();const p=await (await b.newContext({viewport:{width:360,height:360}})).newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));p.on('dialog',d=>d.accept());await p.addInitScript(()=>{window.__pnTest=1;window.__hora93=8});
await p.goto('file:///mnt/user-data/outputs/platanos-primera-vez.html');await p.waitForTimeout(900);const ev=(f,a)=>p.evaluate(f,a),W=ms=>p.waitForTimeout(ms);let r;
await ev(()=>{var U=S.setup;U.veh=[{n:'Camioneta Uno',pl:'AAA1',plEdo:'Baja California',comb:'Gasolina',img:0,odo:1000}];U.per=[{n:'Danu',puesto:'chofer',tel:'1'}];U.cli=[{n:'Doña Mary',a:'x',tel:'6640000001',dias:[0,1,2,3,4,5,6],cred:0,vac:0,ch:'0'}];U.prov=[];S.precio.R=275;S.precio.M=20;suAplicar();
 var D=S.choferes.filter(c=>c.n==='Danu')[0];S.pinOk[pinKey()]=true;S.pinOk['c:'+D.id]=true;S.role='rep';S.chofHoy=D.id;chCambiar(D.id);S.tutVisto={rep:true,admin:true};S.tab.rep='ruta';render();var bv=document.querySelector('[data-act="bienvgo"]');if(bv)bv.click();
 S.vehHoy=S.veh[0].id;salPon124(1);S.inspR=S.inspR||{tipo:'dia',r:{},veh:String(S.vehHoy)};render();document.querySelector('[data-act="ip74go"]').click()});
await W(300);
/* el que se desplaza: la ventana o algo de adentro */
const scroller=`(function(){var o=document.getElementById('ip74ov');if(!o)return null;var c=[o].concat([].slice.call(o.querySelectorAll('*'))).filter(function(e){return e.scrollHeight>e.clientHeight+20&&/(auto|scroll)/.test(getComputedStyle(e).overflowY)})[0];return c})()`;
r=await ev(s=>{var c=eval(s);if(!c)return {err:'sin desplazamiento',btns:document.querySelectorAll('#ip74ov [data-act="ip74v"]').length};c.scrollTop=c.scrollHeight;var y0=c.scrollTop;
 var bs=[].slice.call(document.querySelectorAll('#ip74ov [data-act="ip74v"]'));var bt=bs.filter(function(x){return x.dataset.v==='bien'})[0];if(!bt)return {err:'sin botón visible',n:bs.length};bt.click();
 var c2=eval(s);return {y0:y0,y1:c2?c2.scrollTop:-1,n:bs.length}},scroller);
ok(r.y0>0&&Math.abs(r.y1-r.y0)<2,'revisión del vehículo: al marcar "Bien" pasa al siguiente punto y la ventana se queda donde ibas (antes regresaba hasta arriba)',r);
await W(1500);r=await ev(s=>{var c=eval(s);return c?c.scrollTop:-1},scroller);ok(r>0,'y no se sube sola después',r);
await ev(()=>{var x=document.querySelector('[data-act="ip74x"]');if(x)x.click()});
/* tanque */
r=await ev(()=>{salPon124(4);render();var d=[].slice.call(document.querySelectorAll('main details')).filter(function(x){return /Escoger el nivel con botones/.test(x.textContent)&&x.offsetParent})[0];if(!d)return 'sin sección';d.open=true;d.dispatchEvent(new Event('toggle'));render();render();
 var d2=[].slice.call(document.querySelectorAll('main details')).filter(function(x){return /Escoger el nivel con botones/.test(x.textContent)&&x.offsetParent})[0];return d2?d2.open:'sin sección después'});
ok(r===true,'tanque: "Escoger el nivel con botones" abierto sigue abierto aunque la pantalla se vuelva a dibujar',r);
ok(!errs.length,'sin errores',errs);console.log(nOK+' OK · '+nF+' FAIL');await b.close()})();
