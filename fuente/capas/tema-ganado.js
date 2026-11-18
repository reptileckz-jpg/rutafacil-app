/* ===================== TEMA · Barra flotante de lo ganado (chofer con comisión) (nació como tema, 18 nov · punto 117) =====================
   Ricardo: "debería ser como una barra progresiva arriba que se mantenga flotante, tipo la burbuja de Uber".
   - Barra fija arriba (debajo del encabezado) en las pantallas del chofer en ruta: "💰 $640 hoy" y "12 de 20 cajas" con la barra
     llenándose hacia la meta (si no tiene meta: lo de la semana).
   - Se esconde en la entrega (donde cobra) para no distraer ni que la vea el cliente; al guardar sube el "+$45".
   - La tarjeta verde grande que estaba en la ruta se quitó; al tocar la barra se abre el detalle (semana, vs la pasada, racha, meta).
   - Se puede minimizar a una pastilla "💰 $640" (S.gan117min).
   Si se cambia algo de esto, se cambia AQUÍ.
   ============================================================================================ */
(function(){var st=document.createElement('style');st.textContent=[
 '#gan117{position:fixed;left:12px;right:12px;z-index:60;display:flex;flex-direction:column;gap:4px;background:linear-gradient(135deg,#1B5E20,#2F7D32);color:#fff;border-radius:16px;padding:8px 12px;box-shadow:0 8px 20px rgba(0,0,0,.25);cursor:pointer;max-width:560px;margin:0 auto}',
 '#gan117 .r{display:flex;align-items:center;gap:8px;min-height:30px}#gan117 .m{font-size:21px;font-weight:900;white-space:nowrap}#gan117 .t{font-size:14px;opacity:.95;flex:1;min-width:0;text-align:right;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}',
 '#gan117 .bar{height:8px;border-radius:4px;background:rgba(255,255,255,.28);overflow:hidden}#gan117 .bar i{display:block;height:100%;background:#F2C230;border-radius:4px;transition:width .6s ease}',
 '#gan117 .x{background:rgba(255,255,255,.18);color:#fff;border:0;border-radius:10px;min-width:36px;min-height:30px;font-size:18px;font-weight:900;line-height:1}',
 '#gan117.min{left:auto;right:12px;flex-direction:row;padding:6px 12px;border-radius:999px}#gan117.min .m{font-size:17px}'
].join('\n');document.head.appendChild(st)})();
/* la tarjeta grande de la ruta ya no sale (ahora es la barra) */
var _meta117=metaCard;metaCard=function(){try{if(comOn()&&S.salida.ok)return ''}catch(e){}return _meta117.apply(this,arguments)};
function gan117On(){try{return S.role==='rep'&&comOn()&&S.salida.ok&&S.tab.rep!=='entrega'&&!S.confirm&&!document.getElementById('dia80')&&!document.getElementById('cam73')}catch(e){return false}}
function gan117Datos(){var c=chofHoyObj(),hoy=comHoyDe(c),mR=num(c.meta&&c.meta.R),vR=sum(S.log||[],function(l){return num(l.R)}),k=szCalc(c);return {c:c,hoy:hoy,mR:mR,vR:vR,pc:mR?Math.min(100,Math.round(vR/mR*100)):0,sem:k.com}}
function gan117HTML(x){if(S.gan117min)return '<span class="m">💰 '+money(x.hoy)+'</span>';
 return '<div class="r"><span class="m">💰 '+money(x.hoy)+'</span><span class="lbl" style="color:#fff;opacity:.9;font-size:13px">hoy</span><span class="t">'+(x.mR?(x.vR>=x.mR?'<b>¡Meta lograda!</b> ':'')+x.vR+' de '+x.mR+' cajas':'Esta semana '+money(x.sem))+'</span><button class="x" data-act="gan117min" aria-label="Minimizar">–</button></div>'
  +(x.mR?'<div class="bar"><i style="width:'+x.pc+'%"></i></div>':'')}
var _gan117prev=null,_gan117top=null;
function gan117Top(){var b=document.getElementById('gan117');if(!b)return;var h=document.querySelector('header'),t=8;try{var r=h&&h.getBoundingClientRect();t=Math.max(8,(r?r.bottom:0)+6)}catch(e){}t=Math.round(t);if(t!==_gan117top){_gan117top=t;b.style.top=t+'px'}}
function gan117Pon(){var b=document.getElementById('gan117'),m=document.querySelector('main');if(!gan117On()){if(b)b.remove();var sp=m&&m.querySelector('[data-x="gan117sp"]');if(sp)sp.remove();_gan117top=null;return}
 var x=gan117Datos();if(!b){b=document.createElement('div');b.id='gan117';b.setAttribute('role','button');b.setAttribute('tabindex','0');b.setAttribute('aria-label','Lo que llevas ganado hoy. Toca para ver el detalle');document.body.appendChild(b);_gan117top=null}
 b.className=S.gan117min?'min':'';var html=gan117HTML(x);if(b._h!==html){b.innerHTML=html;b._h=html}gan117Top();
 /* el espacio arriba para que no tape lo primero de la pantalla */
 if(m&&!S.gan117min&&!m.querySelector('[data-x="gan117sp"]')){var s=document.createElement('div');s.dataset.x='gan117sp';s.style.height=(x.mR?62:46)+'px';m.prepend(s)}
 if(m&&S.gan117min){var s2=m.querySelector('[data-x="gan117sp"]');if(s2)s2.remove()}
 /* al guardar una entrega: el "+$45" sube desde la barra */
 if(_gan117prev!==null&&x.hoy>_gan117prev+0.005){var d=r2(x.hoy-_gan117prev),rc=b.getBoundingClientRect(),f=document.createElement('div');f.className='comfloat';f.dataset.x='gan117f';f.textContent='+'+money(d);f.style.left=Math.round(rc.left+24)+'px';f.style.top=Math.round(rc.bottom+4)+'px';document.body.appendChild(f);setTimeout(function(){f.remove()},1500)}
 _gan117prev=x.hoy}
var _r117g=render;render=function(){var r=_r117g.apply(this,arguments);try{gan117Pon()}catch(e){console.error('gan117',e)}return r};
window.addEventListener('scroll',function(){try{gan117Top()}catch(e){}},{passive:true});
/* tocar la barra: el detalle de antes (semana, vs la pasada, racha, meta) en una ventanita */
function gan117Det(){return S.gan117det&&comOn()?ovW70('gan117ov','Lo que llevas ganado','<div style="margin-top:6px">'+comCardHTML()+'</div><button class="btn sec big" data-act="gan117x">Listo</button>','gan117x'):''}
document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act="gan117min"],[data-act="gan117x"],#gan117');if(!b)return;e.preventDefault();e.stopImmediatePropagation();
 if(b.dataset&&b.dataset.act==='gan117min'){S.gan117min=true;render();return}
 if(b.dataset&&b.dataset.act==='gan117x'){S.gan117det=false;ovPon70('gan117ov','');return}
 if(S.gan117min){S.gan117min=false;render();return}
 S.gan117det=true;ovPon70('gan117ov',gan117Det())},true);
