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
