/* ===================== v6.2 · Entrega: pago con tarjeta / transferencia / mixto (comisión y banco), "No estaba",
   buró solo si tiene crédito, completar datos del cliente cuando sea (con horario) ===================== */
['bancoMov'].forEach(function(k){if(NB_SH.indexOf(k)<0)NB_SH.push(k)});
function tarjPct(){var v=num(S.cfg.comPct);return v>0?v:4.06}
function comCobra(){return !!S.cfg.comCobra}
function bancoSaldo(){return r2(sum(S.bancoMov||[],function(x){return num(x.m)}))}
/* ---------- en el cálculo de la entrega: lo que no es efectivo ---------- */
var _eC41=entregaCalc;entregaCalc=function(){var k=_eC41.apply(this,arguments);if(!k||!k.c)return k;var d=S.d||{},fo=d.forma||'efe',cob=r2(num(k.pago)+num(k.abono)),no=0;
 if(fo==='tarj'||fo==='trans')no=cob;else if(fo==='mixto')no=Math.min(cob,Math.max(0,num(d.mixM)));
 k.forma=fo;k.tarj=fo==='tarj'||(fo==='mixto'&&d.mixT!=='trans')?r2(no):0;k.trans=fo==='trans'||(fo==='mixto'&&d.mixT==='trans')?r2(no):0;k.efectivo=r2(cob-no);
 k.comCli=k.tarj>0&&comCobra()?r2(k.tarj*tarjPct()/(100-tarjPct())):0;return k};
function pagoFormaHTML(){var d=S.d||{},fo=d.forma||'efe',k=entregaCalc();
 var h='<div style="border-top:1px solid var(--line);margin-top:8px;padding-top:8px"><b>¿Cómo pagó?</b><div class="chips" role="group" aria-label="Cómo pagó" style="margin:6px 0"><button data-act="pforma" data-v="efe" aria-pressed="'+(fo==='efe')+'" style="min-height:52px;font-size:17px">💵 Efectivo</button><button data-act="pforma" data-v="tarj" aria-pressed="'+(fo==='tarj')+'" style="min-height:52px;font-size:17px">💳 Tarjeta</button><button data-act="pforma" data-v="otros" aria-pressed="'+(fo==='trans'||fo==='mixto')+'">Otros</button></div>';
 if(fo==='trans'||fo==='mixto'||d.formaOtros)h+='<div class="chips" role="group" aria-label="Otras formas" style="margin:4px 0"><button data-act="pforma" data-v="trans" aria-pressed="'+(fo==='trans')+'">Transferencia</button><button data-act="pforma" data-v="mixto" aria-pressed="'+(fo==='mixto')+'">Mixto (parte y parte)</button></div>';
 if(fo==='mixto')h+='<div class="chips" role="group" aria-label="La otra parte" style="margin:4px 0"><button data-act="pmixt" data-v="tarj" aria-pressed="'+(d.mixT!=='trans')+'">Con tarjeta</button><button data-act="pmixt" data-v="trans" aria-pressed="'+(d.mixT==='trans')+'">Con transferencia</button></div><div class="field"><label for="pmix">¿Cuánto '+(d.mixT==='trans'?'por transferencia':'con tarjeta')+'? $</label><input id="pmix" type="number" inputmode="decimal" data-bind="d.mixM" value="'+esc(d.mixM||'')+'"></div>';
 if(k.tarj>0)h+='<div class="card note" style="margin:6px 0;padding:8px 12px">'+(k.comCli?'Cóbrale en la terminal <b>'+money(k.tarj+k.comCli)+'</b> (incluye la comisión de '+money(k.comCli)+').':'Cóbrale en la terminal <b>'+money(k.tarj)+'</b>.')+'<div class="lbl">Ese dinero va al banco; no lo entregas en efectivo.</div></div>';
 if(k.trans>0)h+='<div class="card note" style="margin:6px 0;padding:8px 12px">Transferencia de <b>'+money(k.trans)+'</b>. Revisa que te enseñe el comprobante.<div class="lbl">Va al banco; no lo entregas en efectivo.</div></div>';
 return h+'</div>'}
var _ent41=entrega;entrega=function(){var h=_ent41.apply(this,arguments);try{var k=entregaCalc(),c=k&&k.c;if(!c)return h;
 /* forma de pago, debajo del cálculo */
 h=h.replace('<div id="calc" style="margin-top:6px">','<div id="pforma">'+pagoFormaHTML()+'</div><div id="calc" style="margin-top:6px">');
 /* "No estaba" a la vista */
 if(!(c.rapida&&!S.d.reg))h=h.replace(/(<div class="card" style="padding:10px 14px"><b style="font-size:18px">¿Qué le dejas\?<\/b>)/,'<button class="btn sec" style="margin:6px 0" data-act="noestaba">🚪 No estaba / no se pudo entregar</button>$1');
 /* buró: el chofer solo lo ve si el cliente tiene crédito */
 if(S.role==='rep'&&!credActivo(c))h=h.replace(/<div class="lbl" style="margin:6px 0;line-height:1\.6">Buró: [\s\S]*?<\/div>/,'');
}catch(e){console.error(e)}return h};
if(typeof VIEWS!=='undefined'&&VIEWS.entrega)VIEWS.entrega=entrega;
function credActivo(c){return !!c&&!c.nuevo&&c.credOk!==false&&!c.credFrz&&(num(c.cred)>0||c.credOk===true)}
var _mh41=mayHistHTML;mayHistHTML=function(c){var h=_mh41.apply(this,arguments);if(S.role==='admin'||!c||credActivo(c))return h;return h.replace(/^<div class="card note" style="padding:10px 12px;margin:6px 0"><b>Buró<\/b>[\s\S]*?<\/div><\/div>/,'')};
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
var _cR41=cierreRes;cierreRes=function(){var r=_cR41.apply(this,arguments);if(!r)return r;var tj=r2(sum(S.log||[],function(l){return num(l.tarj)})),tr=r2(sum(S.log||[],function(l){return num(l.trans)}));r.tarj=tj;r.trans=tr;if(!r._noEfe){r.efectivo=r2(num(r.efectivo)-tj-tr);r._noEfe=true}return r};
var _efD41=efeDesgloseHTML;efeDesgloseHTML=function(r){var h=_efD41.apply(this,arguments);if(!(r.tarj||r.trans))return h;
 var x=(r.tarj?rw('Cobrado con tarjeta (va al banco)','− '+money(r.tarj),'neg'):'')+(r.trans?rw('Transferencias (van al banco)','− '+money(r.trans),'neg'):'');return h.replace('<div class="row" style="min-height:56px;border-top:2px solid var(--fg)"><b>Debes entregar</b>',x+'<div class="row" style="min-height:56px;border-top:2px solid var(--fg)"><b>Debes entregar</b>')};
/* ---------- caja: retirar del banco ---------- */
var _cE41=cajaEsp;cajaEsp=function(){return _cE41.apply(this,arguments)+sum((S.bancoMov||[]).filter(function(x){return x.t==='Retiro a la caja'}),function(x){return -num(x.m)})};
function bancoCardHTML(){if(S.role!=='admin'||S.encOn)return '';var s=bancoSaldo(),L=(S.bancoMov||[]).slice(-5).reverse(),x=S.bret;if(!(S.bancoMov||[]).length)return '';
 return '<details class="card" data-k="banco"'+(S.dOpen.banco?' open':'')+'><summary><b>En el banco (tarjeta y transferencias)</b><span class="lbl">'+money(s)+'</span></summary>'
  +L.map(function(m){return rw(esc(m.t)+'<br><span class="lbl">'+fmtF(m.f)+' · '+esc(m.n||'')+'</span>',(m.m<0?'− ':'+ ')+money(Math.abs(m.m)),m.m<0?'neg':'')}).join('')
  +(x?'<div class="field"><label for="bret">¿Cuánto sacaste? $</label><input id="bret" type="number" inputmode="decimal" data-bind="bret.m" value="'+esc(x.m||'')+'"></div><div style="display:flex;gap:8px;margin-top:6px"><button class="btn" style="flex:2" data-act="bretsi">Pasar a la caja</button><button class="btn sec" style="flex:1" data-act="bretno">Cancelar</button></div>':'<button class="btn sm sec" style="margin-top:8px" data-act="bretab">Retirar del banco a la caja</button>')+'</details>'}
var _ini41=inicio;inicio=function(){var h=_ini41.apply(this,arguments),c=bancoCardHTML();if(!c)return h;var i=h.lastIndexOf('</div>');return h+c};
document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act]');if(!b)return;var a=b.dataset.act;
 if(a==='bretab'){e.stopImmediatePropagation();S.bret={m:''};S.dOpen.banco=true;render();return}
 if(a==='bretno'){e.stopImmediatePropagation();S.bret=null;render();return}
 if(a==='bretsi'){e.stopImmediatePropagation();var m=num(S.bret&&S.bret.m);if(!(m>0)){toast('Escribe cuánto sacaste');return}if(m>bancoSaldo()+0.5){toast('En el banco solo hay '+money(bancoSaldo()));return}S.bancoMov.push({f:iso(TODAY),h:hhmm(),m:-m,t:'Retiro a la caja',n:quien()});S.bret=null;toast(money(m)+' pasaron del banco a la caja');render();return}},true);
/* Ajustes: comisión de la tarjeta */
var _aj41=ajHTML;ajHTML=function(){var h=_aj41.apply(this,arguments);if(!h||h.indexOf('id="ajov"')<0||S.role!=='admin'||S.encOn)return h;
 var c='<details class="card" data-k="ajtarj"'+(S.dOpen.ajtarj?' open':'')+'><summary><b>Pagos con tarjeta</b><span class="lbl">comisión '+tarjPct()+'% · '+(comCobra()?'la paga el cliente':'la absorbe el negocio')+'</span></summary>'
  +'<div class="field"><label for="cfg_comPct">Comisión de la terminal (con IVA) %</label><input id="cfg_comPct" type="number" inputmode="decimal" step="any" data-bind="cfg.comPct" value="'+esc(S.cfg.comPct==null?'4.06':S.cfg.comPct)+'"></div>'
  +'<div class="chips" role="group" aria-label="Quién paga la comisión" style="margin:8px 0"><button data-act="comcobra" data-v="0" aria-pressed="'+!comCobra()+'">La absorbe el negocio</button><button data-act="comcobra" data-v="1" aria-pressed="'+comCobra()+'">Se le cobra al cliente</button></div>'
  +'<div class="lbl">'+(comCobra()?'Al cliente se le cobra '+(100*tarjPct()/(100-tarjPct())).toFixed(2)+'% más para que llegue completo.':'La comisión entra como gasto y baja la ganancia.')+'</div></details>';
 var i=h.lastIndexOf('</div></div>');return i<0?h:h.slice(0,i)+c+h.slice(i)};
document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act="comcobra"]');if(!b)return;e.stopImmediatePropagation();S.cfg.comCobra=b.dataset.v==='1';render()},true);
/* ---------- completar datos del cliente en cualquier momento (y su horario) ---------- */
var _ucf41=ubCliFalta;ubCliFalta=function(c){var f=_ucf41.apply(this,arguments);if(c&&!c.rapida&&!c.hCi)f.push('horario');return f};
var _ubH41=ubHTML;ubHTML=function(){var h=_ubH41.apply(this,arguments),u=S.ub;if(!h||!u||u.k!=='cli'||u.modo!=='datos')return h;var c=cl(u.id);if(!c)return h;
 var hor=c.hCi?'<div class="row"><span>Horario</span><b>'+esc(horRango117(c))+'</b></div>':'<div class="field"><label for="ubab">Abre a las</label><input id="ubab" type="time" data-bind="ub.hAb" value="'+esc(u.hAb||'')+'"></div><div class="field"><label for="ubci">Cierra a las</label><input id="ubci" type="time" data-bind="ub.hCi" value="'+esc(u.hCi||'')+'"></div>';
 var D=['D','L','M','M','J','V','S'],da=c.diasAbre||u.diasAbre||[];var dias=c.diasAbre?'<div class="lbl">Abre: '+c.diasAbre.map(function(i){return ['domingo','lunes','martes','miércoles','jueves','viernes','sábado'][i]}).join(', ')+'</div>':'<div class="lbl" style="margin-top:6px">¿Qué días abre?</div><div class="chips" role="group" aria-label="Días que abre">'+D.map(function(x,i){return '<button data-act="ubdia" data-v="'+i+'" aria-pressed="'+(da.indexOf(i)>-1)+'">'+x+'</button>'}).join('')+'</div>';
 var card='<div class="card" style="padding:8px 12px;margin-top:10px"><b>Horario del negocio</b>'+hor+dias+'</div>';
 /* lo que ya tiene no se cambia: el teléfono y quién recibe se enseñan fijos */
 if(String(c.tel||'').trim())h=h.replace(/<div class="field"><label for="ubtel">Teléfono<\/label>[\s\S]*?<\/div>/,'<div class="row"><span>Teléfono</span><b>'+esc(c.tel)+'</b></div>');
 if(String(c.recibe||'').trim())h=h.replace(/<div class="field"><label for="ubrec">¿Quién recibe\?<\/label>[\s\S]*?<\/div>/,'<div class="row"><span>Quién recibe</span><b>'+esc(c.recibe)+'</b></div>');
 var i=h.indexOf('<button class="btn" style="margin-top:14px;min-height:56px" data-act="ubsave"');return i<0?h:h.slice(0,i)+card+h.slice(i)};
document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act="ubdia"]');if(!b||!S.ub)return;e.stopImmediatePropagation();var v=+b.dataset.v,L=S.ub.diasAbre=S.ub.diasAbre||[];var i=L.indexOf(v);if(i>-1)L.splice(i,1);else L.push(v);L.sort();render()},true);
window.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act="ubsave"]');if(!b||!S.ub||S.ub.k!=='cli'||S.ub.modo!=='datos')return;var u=S.ub,c=cl(u.id);if(!c)return;
 if(!c.hCi&&(u.hAb||u.hCi)){if(!u.hAb||!u.hCi){e.stopImmediatePropagation();toast('Pon la hora en que abre y la hora en que cierra');return}c.hAb=u.hAb;c.hCi=u.hCi}
 if(!c.diasAbre&&u.diasAbre&&u.diasAbre.length)c.diasAbre=u.diasAbre.slice()},true);
/* en la ficha del cliente, el chofer puede completar lo que falte cuando quiera */
var _fiC41=fiCli;fiCli=function(f){var h=_fiC41.apply(this,arguments),c=cl(f.id);if(!c||S.role!=='rep'||c.rapida)return h;var fl=ubCliFalta(c);if(!ubTiene(c))fl.unshift('ubicación');if(!fl.length)return h;
 var card='<div class="card note"><b>Le falta: '+esc(fl.join(', '))+'</b><div class="lbl">Puedes agregar lo que falta (lo que ya tiene no se cambia).</div><button class="btn sm" style="margin-top:8px" data-act="ubcli" data-id="'+c.id+'" data-m="'+(ubTiene(c)?'datos':'gps')+'">Completar datos</button></div>';
 var i=h.indexOf('<div class="card');return i<0?h+card:h.slice(0,i)+card+h.slice(i)};
