/* ===================== TEMA · Bodega y maduración: existencias, fruta vieja, lotes, la tarjeta de lo que lleva el chofer (aplanado el 18 nov) =====================
   Antes estaba repartido en 11 envolturas encadenadas en l22, l42, l62, l66, l71, l79, l80, l82.
   Aquí está todo junto, en el MISMO orden, y hace exactamente lo mismo (comprobado con su prueba de comparación).
   Si se cambia algo de esto, se cambia AQUÍ (no se agregan envolturas en capas nuevas).

   Se arma justo después de tema-guia.js. Toca mercancía (solo se movió; comprobado con pruebas/comp-bodega.js).
   - antig65: la fruta madura que se pasa de tiempo (la base la rehace l70; aquí sus 3 envolturas).
   - exist65: las existencias por bodega y lo apartado para pedidos.
   - lotePrecioHTML / lt53Aplica: precio por lote y lotes que salen.
   - stockCard: lo que lleva el chofer en el camión. bodega / bodegasCard: la pantalla de Bodega y la tarjeta de bodegas.
   ============================================================================================ */

/* bodega · de l22 */
var _bod22=bodega;bodega=function(){return _bod22.apply(this,arguments).replace('<div class="card"><div class="lbl">Existencias de ','<div class="card exist"><div class="lbl">Existencias de ')};

/* bodega · de l42 */
var _bod42=bodega;bodega=function(){var h=_bod42.apply(this,arguments),s=madSugHTML();if(!s)return h;var i=h.indexOf('</h1>');return i>-1?h.slice(0,i+5)+s+h.slice(i+5):s+h};

/* bodegasCard · de l62 */
var _bc62=bodegasCard;bodegasCard=function(){var h=_bc62.apply(this,arguments);try{var L=(S.bods||[]).map(function(b){return '<div class="row"><span>📍 '+esc(b.n)+'<br><span class="lbl">'+(b.lat!=null?'Ubicación guardada':(b===bodPrincipal()?'Banderilla (la de inicio)':'Sin ubicación'))+'</span></span><button class="btn sm sec" style="width:auto" data-act="bodloc" data-id="'+b.id+'">Cambiar ubicación</button></div>'}).join('');
 var i=h.indexOf('<div class="lbl" style="margin-top:8px"><b>Agregar bodega');return i>-1?h.slice(0,i)+L+h.slice(i):h}catch(e){return h}};

/* stockCard · de l66 */
var _stk66=stockCard;stockCard=function(){var h=_stk66.apply(this,arguments);try{if(!h||S.role!=='rep')return h;var mR=/>([\d,.-]+) <span[^>]*>CAJAS/.exec(h),mM=/>([\d,.-]+) <span[^>]*>KG/.exec(h),tt=/<div class="lbl">([^<]*)<\/div>/.exec(h),ms=/<div style="margin-top:8px;font-size:14px;font-weight:600">([\s\S]*?)<\/div><\/div>$/.exec(h);if(!mR||!mM)return h;var mal=/card alert/.test(h);
 return '<div class="card rep1'+(mal?' mal':'')+'" style="margin-top:6px"><div class="h">'+SV38.camion+'<span>'+(tt?tt[1]:'Te quedan en el camión')+'</span></div><div class="bx">'
  +'<div class="b">'+SV38.cajas+'<span><div class="n">'+mR[1]+'<small>CAJAS</small></div><div class="l">de roatán</div></span></div>'
  +'<div class="b">'+SV38.bascula+'<span><div class="n">'+mM[1]+'<small>KG</small></div><div class="l">de plátano macho</div></span></div></div>'
  +'<div class="ft">'+(mal?'⚠️':SV38.pin)+'<span>'+(ms?ms[1]:'')+'</span></div></div>'}catch(e){return h}};

/* antig65 · de l71 */
var _ant71=antig65;antig65=function(){var d=_ant71.apply(this,arguments);if(!d)return d;var v=3;try{v=vidaDias()}catch(e){}
 try{var st=d.querySelector('.hd .st');if(st)st.textContent='Sale primero la más vieja · se descuenta sola con las ventas';
  Array.prototype.forEach.call(d.querySelectorAll('.lote[data-act="lt53"]'),function(el){var x=(S.madL||[])[+el.dataset.k];if(!x)return;var mal=v-madEdad(x)<=0;if(mal){var t=el.querySelector('.tq53');if(t)t.textContent='Se pasó de tiempo: toca para decir qué pasó ›';return}
   el.removeAttribute('data-act');el.removeAttribute('role');el.removeAttribute('tabindex');el.style.cursor='default';var t2=el.querySelector('.tq53');if(t2)t2.remove()})}catch(e){}return d};

/* lt53Aplica · de l71 */
var _ltA71=lt53Aplica;lt53Aplica=function(){var t=S.lt53,x=lt53Lote();if(!t||!x||t.op!=='salio')return _ltA71.apply(this,arguments);
 var R=x.p==='R',hoy=iso(TODAY),otros=(S.madL||[]).filter(function(z){return z!==x&&z.p===x.p&&num(z.q)>0}).sort(function(a,b){return String(a.dia).localeCompare(String(b.dia))}),nuevo=otros[otros.length-1],nom=R?n65(x.q)+' cajas de roatán':n65(x.q)+' kg de macho',dv=x.dia;
 /* lo que queda en bodega es fruta más nueva: el lote viejo se junta con el más nuevo (o queda con fecha de hoy) y su tarjeta se quita */
 if(nuevo&&nuevo.dia>=x.dia){nuevo.q=R?num(nuevo.q)+num(x.q):r2(num(nuevo.q)+num(x.q));x.q=0;S.madL=(S.madL||[]).filter(function(z){return num(z.q)>0.001})}else x.dia=hoy;
 S.hist.push({t:fmtF(hoy)+' '+hhmm(),q:quien(),x:'Lote de fruta madura ('+nom+', del '+fmtF(dv)+') salió a la venta: ya no es fruta vieja (no cambia el inventario)'});return 'Listo: ese lote ya no sale como fruta vieja'};

/* exist65 · de l71 */
var _ex71=exist65;exist65=function(old){var d=_ex71.apply(this,arguments);try{var I=S.inv||{},b=(S.bods||[]).filter(function(x){return +x.id===+(S.bodSel||1)})[0]||{n:'Bodega'},mR=madBod71('R'),mM=madBod71('M');
  var t=function(k,v,u,col,bg){return '<div class="tile" style="background:'+bg+'"><div class="k" style="color:'+col+'"><span class="dot" style="background:'+col+'"></span>'+k+'</div><div><span class="big">'+n65(v)+'</span><span class="u">'+u+'</span></div></div>'},
   fila=function(nom,col,tot,u,vv,mm,ma,uu){return '<div class="lab71" style="margin:12px 2px 6px;font-size:16px;font-weight:800;color:var(--fg)">Hay <b style="font-size:20px;color:'+col+'">'+n65(tot)+'</b> '+u+' de '+nom+', de '+(u==='kg'?'los cuales':'las cuales')+':</div>'
    +'<div class="g3" style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px">'+t('Verdes',vv,uu,'#15803D','color-mix(in srgb,#16A34A 7%,var(--surface))')+t('En maduración',mm,uu,'#D97706','color-mix(in srgb,#F59E0B 7%,var(--surface))')+t('Maduras',ma,uu,'#B45309','color-mix(in srgb,#CA8A04 10%,var(--surface))')+'</div>'};
  d.innerHTML='<div class="hd"><span class="ic" style="background:#FFEDD5;color:#EA580C">'+IC65.caja+'</span><span class="grow"><div class="tt">Existencias en bodega</div><div class="st">'+esc(b.n)+' (solo consulta)</div></span></div>'
   +fila('roatán','#C2410C',num(I.verdes)+mR+num(I.maduras),'cajas',I.verdes,mR,I.maduras,'cajas')
   +fila('macho','#15803D',num(I.kgVerde)+mM+num(I.kgMaduro),'kg',I.kgVerde,mM,I.kgMaduro,'kg')
   +'<div class="lbl" style="margin-top:8px">Lo que va en los camiones no cuenta aquí: ya salió de la bodega.</div>'}catch(e){console.error('exist71',e)}return d};

/* lotePrecioHTML · de l71 */
var _lpH71=lotePrecioHTML;lotePrecioHTML=function(c){if(!c)return '';var ed=S.lp71===c.id;if(!c.lpOk||ed||!c.lpModo)return _lpH71.apply(this,arguments);
 var txt=c.lpModo==='lphoy'?'Se usa desde el '+fmtF(c.lpF||iso(TODAY)):(c.lpModo==='lpinter'?'Precio intermedio mientras se acaba el lote anterior':'Se usará cuando se acabe el lote anterior');
 return '<div class="card good" style="padding:12px 14px"><b style="font-size:18px">✓ Precio de esta carga en uso</b>'+(c.cajas?rw('Caja de roatán',money(num(c.vCaja))):'')+(c.kgM?rw('Kilo de macho',money(num(c.vKgM))):'')+'<div class="lbl">'+esc(txt)+'</div><button class="btn sec" style="margin-top:8px;min-height:50px;width:100%" data-act="lp71cam" data-id="'+c.id+'">Cambiar el precio</button></div>'};

/* exist65 · de l79 */
var _ex79=exist65;exist65=function(old){var d=_ex79.apply(this,arguments);try{var a=apartado79('hoy');if(a.R||a.M){var x=document.createElement('div');x.className='card note';x.style.cssText='margin-top:10px;padding:10px 12px';x.innerHTML='<b>📌 Apartado para pedidos de hoy: '+(a.R?a.R+' cajas':'')+(a.R&&a.M?' y ':'')+(a.M?a.M+' kg':'')+'</b><div class="lbl">'+esc(a.N.join(', '))+'. Nadie más lo puede usar.</div>';d.appendChild(x)}}catch(e){}return d};

/* antig65 · de l80 */
var _ant80=antig65;antig65=function(){var d=_ant80.apply(this,arguments);if(!d)return d;try{if(S.antigOff80&&S.antigOff80===antigFirma80())return null;d.dataset.sw80='1';var st=d.querySelector('.hd .st');if(st)st.textContent=st.textContent+' · desliza para quitarla'}catch(e){}return d};

/* antig65 · de l82 */
var _an82=antig65;antig65=function(){var d=_an82.apply(this,arguments);if(!d)return d;var v=3;try{v=vidaDias()}catch(e){}var mal=(S.madL||[]).filter(function(x){var e=0;try{e=madEdad(x)}catch(er){}return num(x.q)>0&&v-e<=0});if(!mal.length)return null;
 try{delete d.dataset.sw80;d.style.transform='';Array.prototype.forEach.call(d.querySelectorAll('.lote'),function(el){var x=(S.madL||[])[+el.dataset.k];if(!x||v-madEdad(x)>0)el.remove()});var tt=d.querySelector('.hd .tt');if(tt)tt.textContent='Fruta madura pasada de tiempo';
  var st=d.querySelector('.hd .st');if(st)st.textContent='Toca cada una para decir qué pasó (se tiró, se remató o salió a la venta)';var al=d.querySelector('.alc');if(al)al.remove()}catch(e){}return d};
