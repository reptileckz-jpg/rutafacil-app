/* ===================== TEMA · Frutas de una carga y reparto de los gastos del viaje (nació como tema, 17 nov · punto 111) =====================
   - Una carga programada se crea con lo PLANEADO (p. ej. 300 kg de macho). Si ese día no se cargó esa fruta, se quedaba con sus kilos
     sin precio: "Costo del viaje" creía que había dos frutas, preguntaba "¿A quién se le cargan los gastos?", pedía datos del macho
     (102) y, al dividir "entre los dos", esa fruta fantasma se quedaba con parte del costo del viaje (la caja salía más barata).
     Ahora, en el paso "La fruta", si una fruta tiene kilos pero no precio y otra sí, pregunta "¿Sí se cargó?"; "No" la quita.
   - "¿A quién se le cargan los gastos del viaje?" solo sale con 2 frutas o más (las que de verdad se compraron: con kilos y precio).
   - Las opciones son las frutas de la carga, incluida la otra fruta ("Solo plátano dominico", por ejemplo); con 3, "Dividir entre todas".
   Si se cambia algo de esto, se cambia AQUÍ (el reparto en sí está en la base, cC, ajustado en ql.py para "Solo otra fruta").
   ============================================================================================ */
function frutas111(o){if(!o)return [];var L=[];if((num(o.kgR)>0||num(o.cajas)>0)&&num(o.pR)>0)L.push(['R','roatán']);if(num(o.kgM)>0&&num(o.pM)>0)L.push(['M','macho']);
 (o.otros||[]).forEach(function(x){if(x&&num(x.kg)>0&&num(x.p)>0&&!L.some(function(y){return y[0]==='O'}))L.push(['O',String(x.n||'la otra fruta').trim()||'la otra fruta'])});return L}
/* "¿A quién se le cargan los gastos del viaje?" (reemplaza la de la base) */
trChips=function(w,v,id){var o=w==='cf'?S.cf:cargaById(+id),F=frutas111(o);if(F.length<2)return '';var ops=[['kilos',F.length>2?'Dividir entre todas':'Dividir entre los dos']].concat(F.map(function(f){return [f[0],'Solo '+f[1]]}));if(!ops.some(function(x){return x[0]===v}))v='kilos';
 return '<div class="lbl" style="margin-top:8px">¿A quién se le cargan los gastos del viaje?</div><div class="chips" style="margin:6px 0" role="group" aria-label="Reparto del transporte">'+ops.map(function(x){return '<button data-act="trmode" data-w="'+w+'" data-id="'+(id||'')+'" data-v="'+x[0]+'" aria-pressed="'+(v===x[0])+'">'+x[1]+'</button>'}).join('')+'</div>'+(v==='kilos'?'<div class="lbl">Se divide según los kilos de cada producto.</div>':'')};
document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act="trmode"]');if(!b)return;e.stopImmediatePropagation();var w=b.dataset.w,v=b.dataset.v,o=w==='cf'?S.cf:cargaById(+b.dataset.id);if(!o)return;o.trMode=v;
 var F=frutas111(o),f=F.filter(function(x){return x[0]===v})[0];if(w!=='cf')toast('Gastos del viaje: '+(v==='kilos'?(F.length>2?'divididos entre todas':'divididos entre los dos'):'solo a'+(f?(f[0]==='O'?' '+f[1]:'l '+f[1]):' esa fruta')));render()},true);

/* ---------- la fruta planeada que no se cargó ---------- */
function fantasmas111(c){if(!c)return [];var conPrecio=frutas111(c).length;if(!conPrecio)return [];var L=[];
 if((num(c.kgR)>0||num(c.cajas)>0)&&!(num(c.pR)>0))L.push({k:'R',n:'roatán',q:num(c.kgR)>0?num(c.kgR).toLocaleString('es-MX')+' kg':num(c.cajas)+' cajas'});
 if(num(c.kgM)>0&&!(num(c.pM)>0))L.push({k:'M',n:'macho',q:num(c.kgM).toLocaleString('es-MX')+' kg'});
 (c.otros||[]).forEach(function(x,i){if(x&&num(x.kg)>0&&!(num(x.p)>0))L.push({k:'O'+i,n:String(x.n||'otra fruta'),q:num(x.kg).toLocaleString('es-MX')+' kg'})});return L}
function fant111HTML(c){return fantasmas111(c).map(function(f){return '<div class="card" data-x="fan111" style="padding:12px 14px;border:3px solid var(--orange,#D97706)"><div style="font-size:18px;font-weight:900">¿Sí se cargó '+esc(f.n)+'?</div><div style="font-size:15px;margin-top:4px">Se había planeado ('+esc(f.q)+'), pero no tiene precio de compra.</div>'
  +'<div style="display:flex;gap:8px;margin-top:10px"><button class="btn" style="flex:1;min-height:54px" data-act="fan111no" data-id="'+c.id+'" data-k="'+f.k+'">No se cargó</button><button class="btn sec" style="flex:1;min-height:54px" data-act="fan111si" data-id="'+c.id+'" data-k="'+f.k+'">Sí, falta su precio</button></div></div>'}).join('')}
document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act="fan111no"],[data-act="fan111si"]');if(!b)return;e.preventDefault();e.stopImmediatePropagation();var c=cargaById(+b.dataset.id),k=b.dataset.k;if(!c)return;
 if(b.dataset.act==='fan111si'){var sel=k==='R'?'[data-cf="'+c.id+':pR"]':(k==='M'?'[data-cf="'+c.id+':pM"]':null);var el=sel&&document.querySelector(sel);if(el){el.scrollIntoView({block:'center'});try{marcaFalta(el)}catch(er){}el.focus()}else toast('Escribe el precio al que se compró');return}
 var n='';if(k==='R'){c.kgR=0;c.cajas=0;c.pR=0;c.vCaja=0;n='roatán'}else if(k==='M'){c.kgM=0;c.pM=0;c.vKgM=0;n='macho'}else{var i=+k.slice(1),x=(c.otros||[])[i];if(x){n=x.n;c.otros.splice(i,1)}}
 if(c.trMode&&c.trMode!=='kilos'&&!frutas111(c).some(function(f){return f[0]===c.trMode}))c.trMode='kilos';
 try{S.hist.push({t:fmtF(iso(TODAY))+' '+hhmm(),q:quien(),x:'En la carga del '+fmtF(c.fecha)+': no se cargó '+n+' (estaba planeado)'})}catch(er){}toast('Listo: esta carga es sin '+n);render()},true);
/* no se pasa del paso "La fruta" sin contestar */
window.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act="cvpaso"][data-d="1"]');if(!b)return;var f=S.cvf;if(!f||CVP[f.paso||0][0]!=='fruta')return;var c=cargaById(+(b.dataset.id||S.cvOpen))||(typeof vwCarga==='function'&&S.vw?vwCarga():null);var L=fantasmas111(c);
 if(L.length){e.preventDefault();e.stopImmediatePropagation();toast('Contesta si se cargó '+L[0].n);var el=document.querySelector('[data-x="fan111"]');if(el){el.scrollIntoView({block:'center'});try{marcaFalta(el)}catch(er){}}}},true);

/* ---------- Registrar una carga (aplanado el 19 nov; antes en l4, l54, l69, l71, en el mismo orden): pasos del registro (cmNuevo, cmValida, cmHTML, cmObj, cmMadHTML), el COSTO de la carga con desgaste y sueldo (cC), la meta de ganancia (cfield) y el formulario (cfForm). Toca dinero: comprobado con pruebas/comp-bodega.js ---------- */
/* cmNuevo · de l4 */
var _cmNK=cmNuevo;cmNuevo=function(){var r=_cmNK.apply(this,arguments);S._cm0=JSON.stringify(S.cm);return r};

/* cfForm · de l54 */
var _cf54=cfForm;cfForm=function(){var h=_cf54.apply(this,arguments);return h.replace('</datalist></div>','</datalist></div><div class="lbl" style="margin:-2px 0 6px">¿Es nuevo? Escríbelo y se agrega al guardar.</div>')};

/* cmNuevo · de l69 */
var _cmN69=cmNuevo;cmNuevo=function(){var r=_cmN69.apply(this,arguments);if(S.cm)S.cm.x68={dOn:'',km:'',tasa:'',sOn:'',sm:'',impOn:'',impT:'Ponchadura',impM:''};return r};

/* cmHTML · de l69 */
var _cmH69=cmHTML;cmHTML=function(){var h=_cmH69.apply(this,arguments);try{if(!h||!S.cm)return h;var P=cmPasos(),k=P[Math.min(S.cm.paso,P.length-1)];
  if(k==='res'&&cmChof()){var i=h.indexOf('<div class="card" style="padding:10px 12px">');if(i>-1)h=h.slice(0,i)+cmCostCards68()+h.slice(i)}
  if(k==='gastos'){var j=h.lastIndexOf('<div style="display:flex;gap:8px;margin-top:14px">');if(j>-1)h=h.slice(0,j)+cmImpCard68()+h.slice(j)}
 }catch(e){console.error('cm69',e)}return h};

/* cmObj · de l69 */
var _cmO69=cmObj;cmObj=function(){var o=_cmO69.apply(this,arguments);try{var m=S.cm,x=m&&m.x68;if(!x)return o;
  if(x.impOn==='si'&&num(x.impM)>0){var big=num(x.impM)>tope68();o.extras=(o.extras||[]).concat([{c:'Imprevisto: '+x.impT,m:num(x.impM),imp68:true,mant:big}])}
  if(cmChof()){var vh=vehById(+m.veh);o.dsgOn=x.dOn==='si';o.dsgKm=num(x.km);o.dsgTasa=num(x.tasa);o.dsgM=o.dsgOn?Math.round(o.dsgKm*o.dsgTasa):0;o.suelOn=x.sOn==='si';o.suelM=o.suelOn?num(x.sm):0;o.suelQ=m.quien==='yo'?quien():chofN(+m.quien);if(vh)o.veh=vh.id}
 }catch(e){}return o};

/* cmValida · de l69 */
var _cmV69=cmValida;cmValida=function(k){var e=_cmV69.apply(this,arguments);if(e)return e;var m=S.cm,x=m&&m.x68;if(!x)return '';
 if(k==='gastos'){if(!x.impOn)return 'Contesta si hubo algún imprevisto en el camino';if(x.impOn==='si'&&num(x.impM)<=0)return 'Escribe cuánto costó el imprevisto'}
 if(k==='res'&&cmChof()){cmX68();if(!x.dOn)return 'Contesta si sumas el desgaste del vehículo';if(x.dOn==='si'&&num(x.km)<=0)return 'Escribe los kilómetros del viaje';if(!x.sOn)return 'Contesta si se le asignó un sueldo por este viaje';if(x.sOn==='si'&&num(x.sm)<=0)return 'Escribe cuánto se le paga por el viaje'}
 return ''};

/* cC · de l69 */
var _cC69=cC;cC=function(c){var o=_cC69.apply(this,arguments);try{var rp=rep68(30);o.repCaja=rp.caja;o.repKg=rp.kgc;o.sug=(o.costoCaja+rp.caja)*(1+mgR68(c)/100);o.sugM=(o.costoKgM+rp.kgc)*(1+mgM68(c)/100)}catch(e){}return o};

/* cfield · de l69 */
var _cf69=cfield;cfield=function(c,key,label,step){if(key!=='mg')return _cf69.apply(this,arguments);var ig=S.cfg.mgIgual!==false;
 /* 102 · si la carga es de una sola fruta, una sola meta (sin hablar de la otra) */
 var hayR=num(c&&c.cajas)>0||num(c&&c.kgR)>0,hayM=num(c&&c.kgM)>0;if(hayR&&!hayM)return _cf69(c,'mg','Meta de ganancia %',step);if(hayM&&!hayR)return _cf69(c,ig?'mg':'mgM','Meta de ganancia %',step);
 return _cf69(c,'mg',ig?'Meta de ganancia (roatán y macho) %':'Meta de ganancia del roatán %',step)+(ig?'':_cf69(c,'mgM','Meta de ganancia del macho %',step))
  +'<button class="btn sm sec" style="width:auto;margin-top:6px" data-act="mgigual">'+(ig?'Poner una meta distinta para el macho':'Usar la misma para los dos')+'</button>'};

/* cmMadHTML · de l71 */
var _cmMad71=cmMadHTML;cmMadHTML=function(){var h=_cmMad71.apply(this,arguments),m=S.cm;try{if(m.mad!=='si')return h;
  h=h.replace(/<label for="cm_mz\.(R|M)\.h">Horas para madurar<\/label>/g,function(a,p){return '<label for="cm_mz.'+p+'.h" style="font-weight:800;font-size:17px">¿En cuántas horas los sacas de madurar?</label>'});
  ['R','M'].forEach(function(p){var z=m.mz&&m.mz[p];if(!z||!m[p])return;var id='cmmzh'+p,i=h.indexOf('<div class="lbl" id="'+id+'">');if(i<0)return;
   h=h.slice(0,i)+'<div class="card note" style="padding:8px 12px;margin-top:6px;font-size:16px" id="cmsal71'+p+'">⏰ Salen de madurar <b>'+(num(z.h)>0?salida71(z.h):'—')+'</b></div>'+h.slice(i)})}catch(e){}return h};

/* cmValida · de l71 */
var _cmV71=cmValida;cmValida=function(k){var e=_cmV71.apply(this,arguments);if(e||k!=='madurar')return e;var m=S.cm;if(m.mad==='si'){var f=['R','M'].filter(function(p){return m[p]&&num(m['mad'+p])>0&&!(num((m.mz&&m.mz[p]||{}).h)>0)});if(f.length)return 'Escribe en cuántas horas los sacas de madurar'}return ''};
