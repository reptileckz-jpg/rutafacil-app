/* ===================== v6.2 · Entrega: pago con tarjeta / transferencia / mixto (comisión y banco), "No estaba",
   buró solo si tiene crédito, completar datos del cliente cuando sea (con horario) ===================== */
['bancoMov'].forEach(function(k){if(NB_SH.indexOf(k)<0)NB_SH.push(k)});
function tarjPct(){var v=num(S.cfg.comPct);return v>0?v:4.06}
function comCobra(){return !!S.cfg.comCobra}
function bancoSaldo(){return r2(sum(S.bancoMov||[],function(x){return num(x.m)}))}
/* ---------- en el cálculo de la entrega: lo que no es efectivo ---------- */
/* entregaCalc: pasó a tema-ruta.js */
function pagoFormaHTML(){var d=S.d||{},fo=d.forma||'efe',k=entregaCalc();
 var h='<div style="border-top:1px solid var(--line);margin-top:8px;padding-top:8px"><b>¿Cómo pagó?</b><div class="chips" role="group" aria-label="Cómo pagó" style="margin:6px 0"><button data-act="pforma" data-v="efe" aria-pressed="'+(fo==='efe')+'" style="min-height:52px;font-size:17px">💵 Efectivo</button><button data-act="pforma" data-v="tarj" aria-pressed="'+(fo==='tarj')+'" style="min-height:52px;font-size:17px">💳 Tarjeta</button><button data-act="pforma" data-v="otros" aria-pressed="'+(fo==='trans'||fo==='mixto')+'">Otros</button></div>';
 if(fo==='trans'||fo==='mixto'||d.formaOtros)h+='<div class="chips" role="group" aria-label="Otras formas" style="margin:4px 0"><button data-act="pforma" data-v="trans" aria-pressed="'+(fo==='trans')+'">Transferencia</button><button data-act="pforma" data-v="mixto" aria-pressed="'+(fo==='mixto')+'">Mixto (parte y parte)</button></div>';
 if(fo==='mixto')h+='<div class="chips" role="group" aria-label="La otra parte" style="margin:4px 0"><button data-act="pmixt" data-v="tarj" aria-pressed="'+(d.mixT!=='trans')+'">Con tarjeta</button><button data-act="pmixt" data-v="trans" aria-pressed="'+(d.mixT==='trans')+'">Con transferencia</button></div><div class="field"><label for="pmix">¿Cuánto '+(d.mixT==='trans'?'por transferencia':'con tarjeta')+'? $</label><input id="pmix" type="number" inputmode="decimal" data-bind="d.mixM" value="'+esc(d.mixM||'')+'"></div>';
 if(k.tarj>0)h+='<div class="card note" style="margin:6px 0;padding:8px 12px">'+(k.comCli?'Cóbrale en la terminal <b>'+money(k.tarj+k.comCli)+'</b> (incluye la comisión de '+money(k.comCli)+').':'Cóbrale en la terminal <b>'+money(k.tarj)+'</b>.')+'<div class="lbl">Ese dinero va al banco; no lo entregas en efectivo.</div></div>';
 if(k.trans>0)h+='<div class="card note" style="margin:6px 0;padding:8px 12px">Transferencia de <b>'+money(k.trans)+'</b>. Revisa que te enseñe el comprobante.<div class="lbl">Va al banco; no lo entregas en efectivo.</div></div>';
 return h+'</div>'}
/* entrega: pasó a tema-ruta.js */
if(typeof VIEWS!=='undefined'&&VIEWS.entrega)VIEWS.entrega=entrega;
function credActivo(c){return !!c&&!c.nuevo&&c.credOk!==false&&!c.credFrz&&(num(c.cred)>0||c.credOk===true)}
/* mayHistHTML: pasó a tema-fichas.js */
document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act]');if(!b||!S.d)return;var a=b.dataset.act;
 if(a==='pforma'){e.stopImmediatePropagation();var v=b.dataset.v;if(v==='otros'){S.d.formaOtros=true;if(S.d.forma!=='trans'&&S.d.forma!=='mixto')S.d.forma='trans'}else{S.d.forma=v;if(v==='efe'||v==='tarj')S.d.formaOtros=false}render();return}
 if(a==='pmixt'){e.stopImmediatePropagation();S.d.mixT=b.dataset.v;render();return}
 if(a==='noestaba'){e.stopImmediatePropagation();S.dOpen.entmas=true;render();setTimeout(function(){var x=document.querySelector('[data-act="nov"]');if(x){var c=x.closest('div');try{c.scrollIntoView({block:'center',behavior:'smooth'})}catch(er){}c.classList.add('avfoco');setTimeout(function(){c.classList.remove('avfoco')},3000)}},80);return}},true);
document.addEventListener('input',function(e){var t=e.target;if(t&&t.id==='pmix'){setTimeout(function(){var c=document.getElementById('calc');if(c)c.innerHTML=calcHTML()},0)}},false);
/* al guardar: se anota la forma de pago, el dinero va al banco y la comisión como gasto */
var _k41=null;window.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act="guardar"]');if(!b||S.role!=='rep'&&!S.arOn)return;try{_k41=entregaCalc();_k41.n0=S.log.length}catch(er){_k41=null}
 setTimeout(function(){var k=_k41;_k41=null;if(!k||!k.c||S.log.length<=k.n0)return;var l=S.log[S.log.length-1];if(l.c!==k.c.id)return;l.forma=k.forma;l.tarj=k.tarj;l.trans=k.trans;if(k.comCli)l.comCli=k.comCli;
  var noEfe=r2(k.tarj+k.trans);if(noEfe<=0)return;S.bancoMov=S.bancoMov||[];var fee=k.tarj>0?r2((k.tarj+k.comCli)*tarjPct()/100):0;
  if(k.tarj>0)S.bancoMov.push({f:iso(TODAY),h:hhmm(),m:r2(k.tarj+k.comCli-fee),t:'Venta con tarjeta',n:k.c.n+' · '+chofN(S.chofHoy)});
  if(k.trans>0)S.bancoMov.push({f:iso(TODAY),h:hhmm(),m:k.trans,t:'Transferencia',n:k.c.n+' · '+chofN(S.chofHoy)});
  if(fee>0&&!k.comCli)S.gastos.push({t:'Comisión de tarjeta',m:fee,n:k.c.n+' · '+tarjPct()+'%',pago:'Banco',caja:false,f:iso(TODAY),h:hhmm(),q:chofN(S.chofHoy)})},40)},true);
/* el cierre del chofer: lo de tarjeta y transferencia se ve, pero no es efectivo que entrega */
/* cierreRes: pasó a tema-cierre.js */
var _efD41=efeDesgloseHTML;efeDesgloseHTML=function(r){var h=_efD41.apply(this,arguments);if(!(r.tarj||r.trans))return h;
 var x=(r.tarj?rw('Cobrado con tarjeta (va al banco)','− '+money(r.tarj),'neg'):'')+(r.trans?rw('Transferencias (van al banco)','− '+money(r.trans),'neg'):'');return h.replace('<div class="row" style="min-height:56px;border-top:2px solid var(--fg)"><b>Debes entregar</b>',x+'<div class="row" style="min-height:56px;border-top:2px solid var(--fg)"><b>Debes entregar</b>')};
/* ---------- caja: retirar del banco ---------- */
/* cajaEsp: pasó a tema-cajas.js */
function bancoCardHTML(){if(S.role!=='admin'||S.encOn)return '';var s=bancoSaldo(),L=(S.bancoMov||[]).slice(-5).reverse(),x=S.bret;if(!(S.bancoMov||[]).length)return '';
 return '<details class="card" data-k="banco"'+(S.dOpen.banco?' open':'')+'><summary><b>En el banco (tarjeta y transferencias)</b><span class="lbl">'+money(s)+'</span></summary>'
  +L.map(function(m){return rw(esc(m.t)+'<br><span class="lbl">'+fmtF(m.f)+' · '+esc(m.n||'')+'</span>',(m.m<0?'− ':'+ ')+money(Math.abs(m.m)),m.m<0?'neg':'')}).join('')
  +(x?'<div class="field"><label for="bret">¿Cuánto sacaste? $</label><input id="bret" type="number" inputmode="decimal" data-bind="bret.m" value="'+esc(x.m||'')+'"></div><div style="display:flex;gap:8px;margin-top:6px"><button class="btn" style="flex:2" data-act="bretsi">Pasar a la caja</button><button class="btn sec" style="flex:1" data-act="bretno">Cancelar</button></div>':'<button class="btn sm sec" style="margin-top:8px" data-act="bretab">Retirar del banco a la caja</button>')+'</details>'}
/* inicio: pasó a tema-inicio.js */
document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act]');if(!b)return;var a=b.dataset.act;
 if(a==='bretab'){e.stopImmediatePropagation();S.bret={m:''};S.dOpen.banco=true;render();return}
 if(a==='bretno'){e.stopImmediatePropagation();S.bret=null;render();return}
 if(a==='bretsi'){e.stopImmediatePropagation();var m=num(S.bret&&S.bret.m);if(!(m>0)){toast('Escribe cuánto sacaste');return}if(m>bancoSaldo()+0.5){toast('En el banco solo hay '+money(bancoSaldo()));return}S.bancoMov.push({f:iso(TODAY),h:hhmm(),m:-m,t:'Retiro a la caja',n:quien()});S.bret=null;toast(money(m)+' pasaron del banco a la caja');render();return}},true);
/* Ajustes: comisión de la tarjeta */
/* ajHTML: pasó a tema-ajustes.js */
document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act="comcobra"]');if(!b)return;e.stopImmediatePropagation();S.cfg.comCobra=b.dataset.v==='1';render()},true);
/* ---------- completar datos del cliente en cualquier momento (y su horario) ---------- */
/* ubCliFalta: pasó a tema-ubica.js */
/* ubHTML: pasó a tema-ubica.js */
document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act="ubdia"]');if(!b||!S.ub)return;e.stopImmediatePropagation();var v=+b.dataset.v,L=S.ub.diasAbre=S.ub.diasAbre||[];var i=L.indexOf(v);if(i>-1)L.splice(i,1);else L.push(v);L.sort();render()},true);
window.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act="ubsave"]');if(!b||!S.ub||S.ub.k!=='cli'||S.ub.modo!=='datos')return;var u=S.ub,c=cl(u.id);if(!c)return;
 if(!c.hCi&&(u.hAb||u.hCi)){if(!u.hAb||!u.hCi){e.stopImmediatePropagation();toast('Pon la hora en que abre y la hora en que cierra');return}c.hAb=u.hAb;c.hCi=u.hCi}
 if(!c.diasAbre&&u.diasAbre&&u.diasAbre.length)c.diasAbre=u.diasAbre.slice()},true);
/* en la ficha del cliente, el chofer puede completar lo que falte cuando quiera */
/* fiCli: pasó a tema-fichas.js */
