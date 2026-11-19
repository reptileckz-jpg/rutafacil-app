/* ===================== v5 · WhatsApp del negocio en los tickets =====================
   Cada chofer manda el ticket desde su propio número, pero el ticket dice a dónde pedir: el WhatsApp del
   negocio (el de tu papá). Si un chofer captura un número de cliente que no estaba, te llega aviso para revisarlo. */
/* ajHTML: pasó a tema-ajustes.js */
/* setupHTML: pasó a tema-ajustes.js */
/* notaItems: pasó a tema-notas.js */
function telNuevoAviso(c,tel,como){if(!c||!String(tel||'').replace(/\D/g,''))return;c.telPor=chofN(S.chofHoy);S.avPrecio.push('Revisa el número: '+chofN(S.chofHoy)+' capturó el WhatsApp de '+c.n+' ('+tel+')'+(como?' '+como:''))}
/* desde el ticket obligatorio */
document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act="tkwa"]');if(!b||!S.nota)return;var c=S.cli.filter(function(x){return x.n===S.nota.cli})[0];if(!c||String(c.tel||'').replace(/\D/g,''))return;var t=S.nota.tel;
 setTimeout(function(){if(S.nota&&S.nota.waOk&&c.tel===t)telNuevoAviso(c,t,'al mandar el ticket')},0)},true);
/* desde la entrega (cliente nuevo o sin número) */
document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act="guardar"]');if(!b||S.role!=='rep')return;var c=curCli();if(!c)return;var antes=String(c.tel||'').replace(/\D/g,'');
 setTimeout(function(){var d=String(c.tel||'').replace(/\D/g,'');if(!antes&&d)telNuevoAviso(c,c.tel,'en la entrega')},40)},true);

/* ===================== v5 · Comisión sobre lo cobrado y motivadores para el chofer =====================
   La comisión cuenta cuando el dinero entra (contado y abonos), no cuando se fía. En la app del chofer:
   "Hoy llevas $X" (con +$ en cada entrega), "Esta entrega te deja ~$Y", meta del día con lo que ganaría,
   su semana contra la pasada con racha, y "si le cobras hoy, ganas $W". Solo ve lo suyo. */
/* modo: 'unidad' (por caja y kilo cobrados, el de siempre) o 'pct' (% de lo cobrado). El mayoreo a mano paga la mitad. */
function comModo(c){var z=c&&c.sz;return z&&z.comModo==='pct'?'pct':'unidad'}
/* tasa equivalente (sirve para estimar abonos y deudas): en pct es el %, por unidad es lo que deja cada peso de una caja */
function comPct(c){var z=c&&c.sz;if(!z||z.tipo!=='base')return 0;if(comModo(c)==='pct')return num(z.comP)/100;
 if(num(z.comC)>0&&num(S.precio.R)>0)return num(z.comC)/num(S.precio.R);if(num(z.comK)>0&&num(S.precio.M)>0)return num(z.comK)/num(S.precio.M);return 0}
function chofHoyObj(){return S.choferes.filter(function(x){return x.id===+S.chofHoy})[0]}
function cobHoy(c){return String(S.chofHoy)===String(c.id)&&S.salida.ok?logCash():0}
function comMitad(l){return l&&(l.mayT==='chofer'||l.mayEl)?0.5:1}
/* lo que gana por una entrega: solo la parte cobrada; el abono a deudas viejas paga su parte */
function comDeLog(c,l){var z=c.sz,f=num(l.total)>0?Math.min(1,num(l.pago)/num(l.total)):0,v=comModo(c)==='pct'?num(l.pago)*num(z.comP)/100:(num(l.R)*num(z.comC)+num(l.M)*num(z.comK))*f;return r2(v*comMitad(l)+num(l.abono)*comPct(c))}
function comHoyDe(c){if(!c||String(S.chofHoy)!==String(c.id)||!S.salida.ok)return 0;return r2(sum(S.log,function(l){return comDeLog(c,l)}))}
function comPrevia(c){var z=c.sz;return comModo(c)==='pct'?r2(num(z.cob)*num(z.comP)/100):r2(num(z.cv)*num(z.comC)+num(z.kv)*num(z.comK))}
/* szCalc: pasó a tema-personal.js */
/* szDesg: pasó a tema-personal.js */
/* sueldos: pasó a tema-personal.js */
document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act="commodo"]');if(!b)return;e.stopImmediatePropagation();var c=S.choferes.filter(function(x){return x.id===+b.dataset.id})[0];if(!c)return;c.sz.comModo=b.dataset.v;
 if(b.dataset.v==='pct'&&!num(c.sz.comP))c.sz.comP=String(Math.round(comPct(Object.assign({},c,{sz:Object.assign({},c.sz,{comModo:'unidad'})}))*1000)/10||2);render()},true);
/* szRes: pasó a tema-personal.js */
/* ---- motivadores (solo el chofer, solo lo suyo) ---- */
(function(){var st=document.createElement('style');st.textContent=[
 '.compill{display:flex;align-items:center;gap:10px;background:linear-gradient(135deg,#1F6B2A,#2F7D32);color:#fff;border-radius:18px;padding:12px 14px;margin-bottom:10px;box-shadow:0 6px 16px rgba(47,125,50,.25)}',
 '.compill .cv{font-size:26px;font-weight:900;font-variant-numeric:tabular-nums;line-height:1}.compill .cl{font-size:12px;opacity:.9}',
 '.combar{height:8px;border-radius:4px;background:rgba(255,255,255,.25);overflow:hidden;margin-top:6px}.combar i{display:block;height:100%;background:#F2C230;border-radius:4px;transition:width .6s}',
 '.comfloat{position:fixed;z-index:95;font-weight:900;font-size:22px;color:#2F7D32;text-shadow:0 1px 0 #fff;pointer-events:none;animation:comUp 1.4s ease-out forwards}',
 '@keyframes comUp{0%{opacity:0;transform:translateY(6px) scale(.8)}15%{opacity:1;transform:translateY(0) scale(1.1)}100%{opacity:0;transform:translateY(-46px) scale(1)}}',
 '.comtip{display:inline-flex;align-items:center;gap:6px;background:rgba(47,125,50,.12);color:var(--accent);border-radius:999px;padding:4px 10px;font-size:13px;font-weight:700;margin:2px 0 8px}',
 /* 117 · dentro de la tarjeta verde de la siguiente parada: etiqueta blanca, letra verde oscuro (antes verde sobre verde, no se leía) */
 '.card.next .comtip{background:#fff!important;color:#1B5E20!important;font-size:15px;padding:6px 12px;box-shadow:0 1px 3px rgba(0,0,0,.18)}',
 '.card.next .comtip.deu{background:#FFF3C4!important;color:#5C4300!important}'
].join('\n');document.head.appendChild(st)})();
function comOn(){var c=chofHoyObj();return S.role==='rep'&&!!c&&comPct(c)>0}
function rachaDe(id){return ((S.racha||{})[id]||{}).n||0}
function comCardHTML(){var c=chofHoyObj(),p=comPct(c),hoy=comHoyDe(c),k=szCalc(c),sem=k.com,ant=num(c.sz.comAnt),dif=ant>0?Math.round((sem/ant-1)*100):null,rc=rachaDe(c.id);
 var mR=num(c.meta.R),vR=sum(S.log,function(l){return l.R}),falta=Math.max(0,mR-vR),extra=r2(falta*(comModo(c)==='pct'?num(S.precio.R)*p:num(c.sz.comC))),pc=mR?Math.min(100,Math.round(vR/mR*100)):0;
 return '<div class="compill" data-key="compill" data-v="'+hoy+'"><span class="grow"><span class="cl">Hoy llevas ganado</span><br><span class="cv">'+money(hoy)+'</span>'
  +(mR?'<div class="combar"><i style="width:'+pc+'%"></i></div><div class="cl" style="margin-top:4px">'+(falta?'Te faltan <b>'+falta+' cajas</b> para tu meta · si llegas, ganas ~<b>'+money(extra)+'</b> más':'<b>¡Llegaste a tu meta de hoy!</b>')+'</div>':'')
  +(num(c.meta.M)?'<div class="cl" style="margin-top:2px">Macho: '+r2(sum(S.log,function(l){return l.M}))+' de '+num(c.meta.M)+' kg</div>':'')+'</span><span style="text-align:right;font-size:12px;line-height:1.5"><span class="cl">Esta semana</span><br><b style="font-size:16px">'+money(sem)+'</b>'+(dif!==null?(dif>=0?'<br><span style="color:#C8F2C0;font-weight:800">▲ +'+dif+'%</span> <span class="cl">vs la pasada</span>':'<br><span class="cl">La pasada: '+money(ant)+'</span>'):'')+(rc>=2?'<br>🔥 <b>'+rc+' días</b> en meta':'')+'</span></div>'}
/* metaCard: pasó a tema-piezas.js */
/* siguiente parada: lo que le deja y lo que ganaría si cobra la deuda */
function comEstimado(c){var p=comPct(chofHoyObj());/* 120 · lo que de verdad compra este cliente (sus entregas guardadas); sin historia no se inventa (antes 4 cajas y 30 kg) */var L=[];(S.rutasHist||[]).forEach(function(e){(e.log||[]).forEach(function(l){if(l&&+l.c===+c.id&&!l.anul)L.push(l)})});(S.log||[]).forEach(function(l){if(l&&+l.c===+c.id&&!l.anul)L.push(l)});L=L.slice(-8);var prom=L.length?sum(L,function(l){return num(l.total)})/L.length:0;return r2(prom*p)}
/* sigCard: pasó a tema-piezas.js */
/* entrega: pasó a tema-ruta.js */
/* +$ que sube cuando gana */
var _comPrev=null;
var _rCom18=render;render=function(){var r=_rCom18.apply(this,arguments);try{var el=document.querySelector('.compill[data-v]');if(el){var v=num(el.getAttribute('data-v'));if(_comPrev!==null&&v>_comPrev+0.005){var d=r2(v-_comPrev),rc=el.getBoundingClientRect(),f=document.createElement('div');f.className='comfloat';f.textContent='+'+money(d);f.style.left=Math.round(rc.left+rc.width*0.35)+'px';f.style.top=Math.round(Math.max(60,rc.top))+'px';document.body.appendChild(f);setTimeout(function(){f.remove()},1500)}_comPrev=v}}catch(e){}return r};
/* racha: al enviar el cierre, si llegó a su meta de cajas */
document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act="enviar"]');if(!b||S.role!=='rep')return;var c=chofHoyObj();if(!c||!num(c.meta.R))return;var ya=!!S.cierre.sent;
 setTimeout(function(){if(ya||!S.cierre.sent)return;S.racha=S.racha||{};var R=S.racha[c.id]||{n:0,f:''};if(R.f===iso(TODAY))return;var vR=sum(S.log,function(l){return l.R});R.n=vR>=num(c.meta.R)?R.n+1:0;R.f=iso(TODAY);S.racha[c.id]=R},0)},true);
/* demo: Danu cobra con base + comisión para que se vean los motivadores */
(function(){try{if(typeof MODO!=='undefined'&&MODO==='vacio')return;var c=S.choferes.filter(function(x){return x.id===1})[0];if(c&&!c._comDemo){c._comDemo=1;c.sz.tipo='base';c.sz.base='1500';c.sz.comModo='unidad';c.sz.comC='5';c.sz.comK='0.5';c.sz.comP='';c.sz.cob='14200';c.sz.comAnt='520';S.racha=S.racha||{};S.racha[1]={n:3,f:''}}}catch(e){}})();
