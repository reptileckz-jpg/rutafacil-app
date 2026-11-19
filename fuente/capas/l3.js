/* ===================== v3.9 · 3. Pantallas de captura más claras ===================== */
var DEMO=true; /* en la app final: false (lo obligatorio no se puede saltar) */
(function(){var css=[
 '.wz-hd{display:flex;gap:6px;margin:8px 0 4px}.wz-hd i{flex:1;height:6px;border-radius:9px;background:var(--line)}.wz-hd i.on{background:var(--accent)}',
 '.wz-nav{display:flex;gap:8px;margin-top:12px;position:sticky;bottom:calc(10px + env(safe-area-inset-bottom,0px));z-index:5;background:var(--bg);padding:8px 0;border-radius:14px}',
 '.wz-nav .btn{flex:1}.wz-hide{display:none!important}',
 '.vlprod{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin:8px 0}.vlprod button{min-height:72px;border-radius:16px;border:2px solid var(--line);background:var(--surface);font-weight:800;font-size:16px;color:var(--fg)}.vlprod button[aria-pressed="true"]{border-color:var(--accent);background:var(--ok-soft)}.vlprod small{display:block;font-weight:600;color:var(--muted);font-size:13px}',
 '.vfimgs{display:grid;grid-template-columns:repeat(4,1fr);gap:6px;margin:6px 0}.vfimgs button{border:2px solid var(--line);border-radius:12px;background:var(--surface);padding:4px;min-height:58px}.vfimgs button[aria-pressed="true"]{border-color:var(--accent)}.vfimgs img{width:100%;height:40px;object-fit:contain}',
 'html.onecol nav.tabs{display:none!important}',
 '.cmcard img{width:46px;height:40px;object-fit:contain;display:block;margin:0 auto 4px}'
];var st=document.createElement('style');st.textContent=css.join('\n');document.head.appendChild(st)})();
/* pide lo obligatorio; en la demo se puede saltar */
function obligatorio(faltan,seguir){if(!faltan.length)return true;
 if(DEMO){abrirModal('Falta llenar',esc(faltan.join(', '))+'. En la app final no te dejará seguir sin esto. En la demo puedes seguir.',[['Seguir sin llenarlo (solo demo)','wzforce']]);window._wzForce=seguir;return false}
 toast('Falta: '+faltan.join(', '));return false}
document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act="wzforce"]');if(!b)return;e.stopImmediatePropagation();S.modal=null;var f=window._wzForce;window._wzForce=null;if(f)f();else render()},true);

/* ---- Entrega: el total una vez y textos claros ---- */
calcHTML=function(){var k=entregaCalc();if(!k.c)return '';var simple=k.abono<=0&&k.pago>=k.total-0.005;
 var h=simple?'<div class="row" style="min-height:58px"><b>A cobrar</b><span class="mid" style="color:var(--accent)">'+money(k.efectivo)+'</span></div>'
  :rw('Esta entrega',money(k.total))+rw('Paga ahora de esta entrega',money(k.pago))+(k.abono>0?rw('Abona a lo que ya debía','+ '+money(k.abono)):'')+'<div class="row" style="min-height:58px;background:var(--ok-soft);border-radius:12px;padding:0 10px"><b>A cobrar en efectivo</b><span class="mid" style="color:var(--accent)">'+money(k.efectivo)+'</span></div>'+(k.quedaEntrega>0?rw('Queda a crédito de esta entrega',money(k.quedaEntrega),'neg'):'');
 h+=(k.deuda>0?rw('Su deuda queda en',money(k.deuda),'neg'):'')+(k.vacias>0||(k.c.vac>0)?rw('Cajas vacías que quedaría debiendo',k.vacias,k.vacias>0?'neg':''):'');
 return h+(k.sobreLim?'<div class="neg" role="alert" style="font-weight:600;font-size:14px;margin-top:6px">Con esto pasaría su límite de crédito de '+money(k.c.lim)+'. Cóbrale más de contado para poder guardar.</div>':'')};
/* "lo mismo que la vez pasada" */
function ultPedido(c){var L=S.log.filter(function(l){return l.c===c.id&&!l.anul});if(L.length){var l=L[L.length-1];return {R:l.R,M:l.M}}if(c.uR!=null||c.uM!=null)return {R:num(c.uR),M:num(c.uM)};return null}
document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act="entmismo"]');if(!b)return;e.stopImmediatePropagation();var c=curCli(),u=c&&ultPedido(c);if(u){S.d.R=Math.min(u.R,S.inv.reparto);S.d.M=Math.min(u.M,S.inv.repartoKg);toast('Puse lo de la vez pasada: '+u.R+' cajas y '+u.M+' kg');render()}},true);
/* que las rotas no pasen de las que devuelve */
document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act="entconf"],[data-act="guardar"]');if(!b||S.role!=='rep'||!S.d)return;if(num(S.d.Vr)>num(S.d.V)){e.stopImmediatePropagation();S.d.Vr=num(S.d.V);toast('Las rotas no pueden ser más que las cajas que devuelve');render()}},true);

/* ---- Cierre del chofer por pasos ---- */
S.cierreP=S.cierreP||0;
function cierrePasos(){if(S.role!=='rep'||S.tab.rep!=='cierre'||!S.cierre||S.cierre.sent)return;var m=document.querySelector('main');if(!m||m.querySelector('.wz-hd'))return;
 var K=Array.prototype.slice.call(m.children).filter(function(x){return !x.classList.contains('foot')&&x.tagName!=='H1'});
 var paso=function(el){var t=el.textContent||'';if(/Odómetro final|Combustible del día/.test(t))return 0;if(/Otros gastos de la ruta|Efectivo a entregar/.test(t))return 1;if(/Cajas que salieron|sin visitar|pasaron a la ruta/.test(t))return 2;if(/Fotos del vehículo|Enviar cierre|Terminar mi ruta/.test(t))return 3;return -1};
 var P=['Vehículo','Dinero','Cajas','Fotos y enviar'],cur=Math.max(0,Math.min(3,S.cierreP));
 K.forEach(function(el){var p=paso(el);if(p>=0&&p!==cur)el.classList.add('wz-hide')});
 var hd=document.createElement('div');hd.innerHTML='<div class="lbl" style="margin:0 2px"><b>Paso '+(cur+1)+' de 4 · '+P[cur]+'</b></div><div class="wz-hd">'+P.map(function(x,i){return '<i class="'+(i<=cur?'on':'')+'"></i>'}).join('')+'</div>';
 var h1=m.querySelector('h1');if(h1)h1.after(hd);
 if(cur===3){var r=cierreRes(),c=S.cierre,res=document.createElement('div');res.className='card good';res.innerHTML='<b>Resumen antes de enviar</b>'+rw('Recorriste',Math.max(0,r.km)+' km')+rw('Vendiste',money(r.total))+rw('Debes entregar',money(r.efectivo))+rw('Cajas entregadas',r.R)+rw('Cajas llenas que regresan',r.reg)+rw('Cajas vacías recibidas',r.V)+(typeof borrPend==='function'&&borrPend().length?'<div class="neg" style="font-weight:700;margin-top:6px">⚠ Tienes '+borrPend().length+' cosa(s) sin terminar: '+esc(borrPend().map(function(x){return x.n}).join(', '))+'</div>':'');var fb=K.filter(function(x){return /Fotos del vehículo/.test(x.textContent)})[0];if(fb)fb.before(res)}
 var nav=document.createElement('div');nav.className='wz-nav';nav.innerHTML=(cur>0?'<button class="btn sec" data-act="cipaso" data-v="'+(cur-1)+'">Atrás</button>':'')+(cur<3?'<button class="btn" data-act="cipaso" data-v="'+(cur+1)+'">Siguiente</button>':'');
 var foot=m.querySelector('.foot');if(nav.innerHTML)(foot?foot.before(nav):m.appendChild(nav))}
document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act="cipaso"]');if(!b)return;e.stopImmediatePropagation();S.cierreP=+b.dataset.v;render();window.scrollTo(0,0)},true);
/* el tanque: la aguja; los botones quedan guardados por si los prefieren */
/* chipsTank: pasó a tema-piezas.js */

/* ---- Ruta del chofer: lo de la demo hasta abajo ---- */
function demoRutaHTML(){if(!S.salida.ok)return '';return '<details class="card" data-k="demor"'+(S.dOpen.demor?' open':'')+'><summary><b>Herramientas de la demo</b><span class="lbl">no salen en la app final</span></summary>'+velDemoBtn(vehHoy())+'<button class="btn sec" style="margin-top:8px" data-act="llamada"'+(S.stops.some(function(s){return s.call})?' disabled':'')+'>Simular llamada de un cliente</button>'+(typeof senalDemoBtn==='function'?senalDemoBtn():'')+'</details>'}

/* ---- Venta local: productos con botones grandes ---- */
document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act="vlprod"]');if(!b)return;e.stopImmediatePropagation();var l=S.vl.lin[+b.dataset.i];if(l){l.p=decodeURIComponent(b.dataset.p);render()}},true);
function vlProdBtns(l,i){return '<div class="vlprod" role="group" aria-label="Producto">'+S.vlProd.map(function(p){return '<button data-act="vlprod" data-i="'+i+'" data-p="'+encodeURIComponent(p.n)+'" aria-pressed="'+(p.n===l.p)+'">'+esc(p.n)+'<small>'+money(num(p.p))+' el '+(p.u==='caja'?'caja':'kilo')+'</small></button>'}).join('')+'</div>'}

/* ---- Bodega: cada cosa en su apartado que se abre ---- */
function colapsaCard(card,key,title,sub,keepFirst){if(!card||card.dataset.cz)return;var d=document.createElement('details');d.className=card.className;d.dataset.k=key;d.dataset.cz='1';if(S.dOpen[key])d.open=true;
 var sm=document.createElement('summary');sm.innerHTML='<b>'+title+'</b>'+(sub?'<span class="lbl">'+sub+'</span>':'');d.appendChild(sm);
 var K=Array.prototype.slice.call(card.childNodes);K.forEach(function(n,i){if(i<(keepFirst||1))return;d.appendChild(n)});card.replaceWith(d)}
function bodegaOrden(){if(S.role!=='admin'||S.tab.admin!=='bodega')return;var m=document.querySelector('main');if(!m)return;
 Array.prototype.slice.call(m.children).forEach(function(c){if(!c.classList||!c.classList.contains('card')||c.tagName==='DETAILS')return;var b=c.firstElementChild,t=b?b.textContent.trim():'';
  if(t==='Meter a maduración')colapsaCard(c,'bzmad','Meter a maduración','registrar un lote nuevo');
  else if(t==='Contar bodega y merma')colapsaCard(c,'bzcnt','Contar bodega','lo que hay contra lo que dice la app');});
 var cj=Array.prototype.slice.call(m.querySelectorAll('.card')).filter(function(c){var b=c.firstElementChild;return b&&b.tagName==='B'&&b.textContent.trim()==='Cajas'})[0];
 if(cj&&!cj.querySelector('details[data-k="bzcj"]')){var ch=cj.querySelector('.chips[aria-label="Movimiento de cajas vacías"]');if(ch){var d=document.createElement('details');d.dataset.k='bzcj';if(S.dOpen.bzcj)d.open=true;d.style.marginTop='8px';d.innerHTML='<summary><b>Comprar cajas o ajustar el conteo</b></summary>';var n=ch;var L=[];while(n){L.push(n);n=n.nextSibling}L.forEach(function(x){d.appendChild(x)});cj.appendChild(d)}cj.classList.add('dcaja')}
 var ex=Array.prototype.slice.call(m.querySelectorAll('.card')).filter(function(c){return /^Existencias de/.test((c.textContent||'').trim())})[0];if(ex)ex.classList.add('dban');
 Array.prototype.slice.call(m.querySelectorAll('button')).forEach(function(b){if(/Avanzar el reloj 6 horas/.test(b.textContent)){b.textContent='Avanzar el reloj 6 horas (solo demo)';b.style.opacity='.8'}})}

/* ---- Vehículo nuevo o editado: por pasos ---- */
S.vfP=0;
function vfPasos(){if(S.role!=='admin'||S.tab.admin!=='vehiculos'||!S.vf)return;var card=Array.prototype.slice.call(document.querySelectorAll('main .card')).filter(function(c){var b=c.firstElementChild;return b&&b.tagName==='B'&&/^(Agregar|Editar) vehículo$/.test(b.textContent.trim())})[0];if(!card||card.querySelector('.wz-hd'))return;
 var MAP={'Datos básicos':0,'Combustible que usa':1,'¿Usa DEF?':1,'Seguro':2,'Documentos con vencimiento':2,'Mantenimiento (cada cuántos km)':3},P=['Datos','Combustible y costos','Seguro y papeles','Mantenimiento'],cur=Math.max(0,Math.min(3,S.vfP)),sec=-1,K=Array.prototype.slice.call(card.children);
 K.forEach(function(el,i){if(i===0)return;var hb=el.classList&&el.classList.contains('lbl')&&el.firstElementChild&&el.firstElementChild.tagName==='B'?el.firstElementChild.textContent.trim():null;if(hb!=null&&MAP[hb]!=null)sec=MAP[hb];
  if(el.querySelector&&el.querySelector('[data-act="vsave"]')){el.classList.add('wz-hide');return}
  if(sec>=0&&sec!==cur)el.classList.add('wz-hide')});
 var f=S.vf,hd=document.createElement('div');hd.innerHTML='<div class="lbl" style="margin-top:6px"><b>Paso '+(cur+1)+' de 4 · '+P[cur]+'</b></div><div class="wz-hd">'+P.map(function(x,i){return '<i class="'+(i<=cur?'on':'')+'"></i>'}).join('')+'</div>';card.firstElementChild.after(hd);
 if(cur===0){var pl=card.querySelector('[data-bind="vf.pl"]'),box=document.createElement('div');box.innerHTML='<div class="lbl" style="margin-top:8px">Así se ve la placa</div><div id="vfplate" style="margin:6px 0">'+plateSVG({id:S.vfId,pl:f.pl,plEdo:f.plEdo||(S.vfId===2?'Guerrero':'Veracruz'),plTipo:f.plTipo})+'</div><div class="chips" role="group" style="margin:4px 0">'+edos80().map(function(x){return '<button data-act="vfpl" data-k="plEdo" data-v="'+x+'" aria-pressed="'+((f.plEdo||(S.vfId===2?'Guerrero':'Veracruz'))===x)+'">'+x+'</button>'}).join('')+'<button data-act="vfpl" data-k="plTipo" data-v="auto" aria-pressed="'+((f.plTipo||'auto')==='auto')+'">Automóvil</button><button data-act="vfpl" data-k="plTipo" data-v="carga" aria-pressed="'+(f.plTipo==='carga')+'">Carga</button></div>'
   +'<div class="lbl" style="margin-top:8px">Dibujo del vehículo (o sube su foto)</div><div class="vfimgs">'+VEH_IMGS.map(function(x,i){var u=x[1]();return '<button data-act="vfimg" data-i="'+i+'" aria-pressed="'+(f.foto===u)+'" aria-label="'+x[0]+'"><img src="'+u+'" alt=""></button>'}).join('')+'</div>';
  var fl=pl&&pl.closest('.field');if(fl)fl.after(box)}
 var nav=document.createElement('div');nav.className='wz-nav';nav.innerHTML=(cur>0?'<button class="btn sec" data-act="vfpaso" data-v="'+(cur-1)+'">Atrás</button>':'<button class="btn sec" data-act="vcancel">Cancelar</button>')+(cur<3?'<button class="btn" data-act="vfpaso" data-v="'+(cur+1)+'">Siguiente</button>':'<button class="btn" data-act="vsave">Guardar</button>');
 card.appendChild(nav);if(cur<3){var g=document.createElement('button');g.className='link';g.style.marginTop='4px';g.dataset.act='vsave';g.textContent='Guardar ya y completar lo demás después';card.appendChild(g)}}
document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act]');if(!b)return;var a=b.dataset.act;
 if(a==='vfpaso'){e.stopImmediatePropagation();var to=+b.dataset.v,f=S.vf;if(to>S.vfP&&S.vfP===0){var fl=[];if(!String(f.n||'').trim())fl.push('nombre o modelo');if(!String(f.pl||'').trim())fl.push('placas');if(fl.length&&!obligatorio(fl,function(){S.vfP=to;render()}))return}if(to>S.vfP&&S.vfP===1&&!f.comb){if(!obligatorio(['el combustible que usa'],function(){S.vfP=to;render()}))return}S.vfP=to;render();window.scrollTo(0,0)}
 else if(a==='vfpl'){e.stopImmediatePropagation();S.vf[b.dataset.k]=b.dataset.v;render()}
 else if(a==='vfimg'){e.stopImmediatePropagation();S.vf.foto=VEH_IMGS[+b.dataset.i][1]();render()}
 else if(a==='vsave'&&S.vf){var f=S.vf,id=S.vfId,n0=S.veh.length,ex={plEdo:f.plEdo,plTipo:f.plTipo};setTimeout(function(){var v=id!=null?S.veh.filter(function(x){return x.id===id})[0]:(S.veh.length>n0?S.veh[S.veh.length-1]:null);if(v){if(ex.plEdo)v.plEdo=ex.plEdo;if(ex.plTipo)v.plTipo=ex.plTipo}S.vfP=0;render()},0)}
 else if(a==='vcancel'||a==='vnew'||a==='vedit'){S.vfP=0}},true);
document.addEventListener('input',function(e){var t=e.target;if(t&&t.dataset&&t.dataset.bind==='vf.pl'){var p=$('vfplate');if(p)p.innerHTML=plateSVG({id:S.vfId,pl:t.value,plEdo:S.vf.plEdo||(S.vfId===2?'Guerrero':'Veracruz'),plTipo:S.vf.plTipo})}});

/* ---- Viaje de carga: el avance por etapa (antes de salir, en el camino, de regreso) ---- */
function vwEtapaTxt(L,i){var a=L.indexOf('camino'),r=L.indexOf('vuelta');if(a<0)a=L.length;if(r<0)r=L.length;var f,ini,fin;if(i<a){f='Antes de salir';ini=0;fin=a}else if(i<r){f='En el camino';ini=a;fin=r}else{f='De regreso';ini=r;fin=L.length}return f+' · paso '+(i-ini+1)+' de '+(fin-ini)}

/* ---- Después de dibujar ---- */
var _rL3=render;render=function(){_rL3.apply(this,arguments);try{
 cierrePasos();bodegaOrden();vfPasos();
 /* dibujos de fondo */
 Array.prototype.forEach.call(document.querySelectorAll('main .card.deco-pl'),function(c){if(c.getAttribute('data-act')==='tab'&&c.getAttribute('data-t')==='bodega')c.classList.add('dcaja');else c.classList.add('dban')});
 Array.prototype.forEach.call(document.querySelectorAll('img.banic'),function(x){x.remove()});
 /* entrega: foto de fachada solo si no tiene, y "lo mismo que la vez pasada" */
 if(S.role==='rep'&&S.tab.rep==='entrega'){var c=curCli();if(c&&c.foto){var lb=document.querySelector('label[for="fach"]');if(lb)lb.style.display='none'}
  var q=Array.prototype.slice.call(document.querySelectorAll('main .card')).filter(function(x){var b=x.querySelector('b');return b&&/Qué le dejas/.test(b.textContent)})[0],u=c&&ultPedido(c);
  if(q&&u&&(u.R||u.M)&&!q.querySelector('[data-act="entmismo"]')){var bt=document.createElement('button');bt.className='btn sm sec';bt.style.marginTop='8px';bt.dataset.act='entmismo';bt.textContent='Lo mismo que la vez pasada ('+u.R+' cajas · '+u.M+' kg)';q.appendChild(bt)}
  var cv=Array.prototype.slice.call(document.querySelectorAll('main .card')).filter(function(x){var b=x.querySelector('b');return b&&b.textContent.trim()==='Cajas vacías'})[0];if(cv&&c){var lbl=Array.prototype.slice.call(cv.querySelectorAll('.lbl')).filter(function(x){return /^Debe \d+\. Pídeselas/.test(x.textContent)})[0];if(lbl)lbl.textContent='Ya debía '+c.vac+'. Si no las tiene, entrégale de todos modos.'}}
}catch(e){console.error(e)}};
