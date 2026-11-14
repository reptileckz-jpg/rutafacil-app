/* 8.2 · 45: la pantalla ya no brinca sola al tocar apartados o botones */
const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:390,height:800},hasTouch:true,isMobile:true});const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));await p.addInitScript(()=>{window.__pnTest=1});
await p.goto('file:///mnt/user-data/outputs/prototipo-platanos.html');await p.waitForTimeout(900);
const res=[];
for(const [rol,tabs] of [['admin',['inicio','bodega']],['rep',['entrega']]]){
 for(const t of tabs){
  const n=await p.evaluate(([rol,t])=>{S.role=rol;if(rol==='rep'){S.chofHoy=1;S.pinOk['c:1']=true;S.salida.ok=true}else S.pinOk[pinKey()]=true;S.tab[rol]=t;S.modal=null;S.rt81=null;S.cu82=null;render();window.scrollTo(0,0);
   var L=[...document.querySelectorAll('main summary, main .chips button, main [role="tab"], main details>summary')];window.__L=L;return L.length},[rol,t]);
  for(let i=0;i<Math.min(n,40);i++){
   const r=await p.evaluate(async([rol,t,i])=>{S.tab[rol]=t;S.modal=null;render();var L=[...document.querySelectorAll('main summary, main .chips button, main [role="tab"], main details>summary')];var el=L[i];if(!el)return null;
    el.scrollIntoView({block:'center'});await new Promise(r=>setTimeout(r,60));var y0=window.scrollY,r0=el.getBoundingClientRect().top,txt=(el.textContent||'').trim().slice(0,40);
    var bb=el.getBoundingClientRect(),o={bubbles:true,clientX:bb.left+5,clientY:bb.top+5,pointerType:'touch'};el.dispatchEvent(new PointerEvent('pointerdown',o));el.dispatchEvent(new PointerEvent('pointerup',o));el.click();await new Promise(r=>setTimeout(r,600));var ov=[...document.querySelectorAll('.ov70,#wzov,#fiov,.sheet,#vwov,#setov')].some(x=>x.offsetParent!==null||getComputedStyle(x).position==='fixed');
    var same=document.body.contains(el)?el:null;var r1=same?same.getBoundingClientRect().top:null;return {txt,dy:Math.round(window.scrollY-y0),dr:r1==null?null:Math.round(r1-r0),ov,tab:S.tab[rol]}},[rol,t,i]);
   if(r&&!r.ov&&r.tab===t&&(r.dr!=null?Math.abs(r.dr)>60:Math.abs(r.dy)>60))res.push(rol+':'+t+' "'+r.txt+'" dy='+r.dy+' dr='+r.dr);
  }}}
const malos=res.filter(x=>!/Informativos/.test(x));console.log(malos.length?'FAIL la pantalla brinca al tocar:\n'+malos.join('\n'):'OK   lo que tocas se queda en su lugar (apartados de Inicio y Bodega, botones de la entrega)');console.log(errs.length?'FAIL errores '+errs[0]:'OK   sin errores');console.log((2-(malos.length?1:0)-(errs.length?1:0))+' OK · '+((malos.length?1:0)+(errs.length?1:0))+' FAIL');await b.close()})();
