/* ===================== v8.8 · 75–78 (17 nov) los pendientes se resuelven y se quitan
   75 Cada pendiente de la lista (en cada sección y en "Más"): "Ir" (te lleva a resolverlo) y "✓ Listo" (lo quita y lo guarda en
      "Lo que pasó hoy"). Los de dinero (pagar a un proveedor, faltantes, no cuadra, deudas) traen "Recordar mañana" en vez de Listo.
   76 Los que solo informan ("subió el kilo", "báscula nueva", "llegó la carga", "dio de alta al cliente nuevo"…) ya no son pendientes:
      van directo a "Lo que pasó hoy".
   77 "Revisa el número": se quita solo en cuanto confirmas el teléfono del cliente.
   78 "Salió con una falla": tarjeta con "Ya se reparó" (cuánto costó → taller y gasto), "Mandarlo al taller" (queda fuera de servicio)
      y "Puede seguir así" (se anota en su bitácora). ===================== */
(function(){var st=document.createElement('style');st.textContent=[
 '.pnd86 .row88{display:flex;gap:8px;margin-top:6px}.pnd86 .row88 button{flex:1;min-height:46px;border-radius:12px;font-weight:800;font-size:15px}',
 '.pnd86 .ir88{background:var(--accent);color:#fff;border:0}.pnd86 .ok88{background:var(--surface);color:var(--fg);border:1.5px solid var(--line)}',
 '.pnd86 .it88{background:var(--surface);border:1px solid var(--line);border-radius:14px;padding:10px 12px;margin-top:8px}.pnd86 .it88 b{font-size:16px}',
 '.fa88{background:color-mix(in srgb,#F59E0B 10%,var(--surface));border:1.5px solid #FCD34D;border-radius:14px;padding:10px 12px;margin-top:8px}.fa88 .bt{display:flex;flex-direction:column;gap:6px;margin-top:8px}.fa88 .bt button{min-height:48px;border-radius:12px;font-weight:800;font-size:15px}'].join('\n');document.head.appendChild(st)})();
try{['avOk88','avLater88'].forEach(function(k){if(NB_SH.indexOf(k)<0)NB_SH.push(k)})}catch(e){}
var DIN88=/Pagar a |Le debes|debes a|faltante|Faltaron|no cuadra|deuda|debe \$|crédito|URGENTE: .*no cuadra/i;
var INFO88=/subió el kilo|subió la caja|bajó el kilo|registró una báscula nueva|Llegó la carga|llegó la carga|dio de alta al cliente nuevo|dio de alta un cliente nuevo|registró un proveedor nuevo|salió rumbo|va de regreso|cargado en|Viaje asignado|Se acabó el lote|le pagó|lleva \d+ cajas vacías|Dio de alta al cliente/;
function avLimpio88(x){return String(x||'').replace(/^URGENTE:\s*/i,'').replace(/\s*\[(tel|geo|gps|gpsev|pin):[^\]]*\]/g,'')}
/* ---------- 76/77 · lo que solo informa o ya se resolvió sale de los pendientes ---------- */
function ordena88(){if(S.role!=='admin'||!Array.isArray(S.avPrecio))return;var cam=false;
 S.avPrecio=S.avPrecio.filter(function(x){if(typeof x!=='string')return true;var t=avLimpio88(x);
  if(!/^URGENTE/i.test(x)&&INFO88.test(t)){try{actAdd(null,x)}catch(e){}cam=true;return false}
  var m=/^Revisa el número: .*? (?:el WhatsApp de|el teléfono de|el número de) (.+?) \(/.exec(t);if(m){var c=(S.cli||[]).filter(function(y){return y.n===m[1]})[0];try{if(c&&telConfOk(c)){actAdd(null,'Confirmaste el teléfono de '+c.n);cam=true;return false}}catch(e){}}
  return true});return cam}
var _avs88=avisos;avisos=function(){var L=_avs88.apply(this,arguments);if(S.role!=='admin')return L;var hoy=iso(TODAY),O=S.avOk88||{},D=S.avLater88||{};
 return L.filter(function(x){if(typeof x!=='string')return true;if(O[x])return false;if(D[x]&&D[x]>hoy)return false;return true})};
/* ---------- 75 · Ir / ✓ Listo / Recordar mañana ---------- */
var _pc88=pendCard86;pendCard86=function(){_pc88.apply(this,arguments);var c=document.querySelector('[data-x="pnd86"]');if(!c||c.dataset.v88)return;c.dataset.v88='1';
 Array.prototype.forEach.call(c.querySelectorAll('button.it[data-act="avgo"]'),function(b){var x=decodeURIComponent(b.dataset.k||''),din=DIN88.test(x),fa=/^(URGENTE:\s*)?Salió con una falla/.test(x);var d=document.createElement('div');d.className='it88';
  d.innerHTML=b.querySelector('.tx').innerHTML.replace(/<span class="lbl" style="font-size:20px">›<\/span>/,'')+(fa?falla88HTML(x):'<div class="row88"><button class="ir88" data-act="avgo" data-k="'+b.dataset.k+'">Ir ›</button>'+(din?'<button class="ok88" data-act="av88m" data-k="'+b.dataset.k+'">Recordar mañana</button>':'<button class="ok88" data-act="av88ok" data-k="'+b.dataset.k+'">✓ Listo</button>')+'</div>');b.replaceWith(d)});
 var lb=c.querySelector('.lbl');if(lb)lb.textContent='Es el numerito de la barra de abajo. "Ir" te lleva a resolverlo; "✓ Listo" lo quita.'};
function quita88(x,como){var hoy=iso(TODAY),i=(S.avPrecio||[]).indexOf(x);if(i>-1){S.avPrecio=S.avPrecio.filter(function(y){return y!==x})}else{S.avOk88=S.avOk88||{};S.avOk88[x]=hoy}try{actAdd(null,(como||'Atendido')+': '+avLimpio88(x))}catch(e){}}
window.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act="av88ok"],[data-act="av88m"]');if(!b)return;e.preventDefault();e.stopImmediatePropagation();var x=decodeURIComponent(b.dataset.k||'');
 if(b.dataset.act==='av88ok'){quita88(x,'Visto');toast('Listo: se quitó de pendientes')}else{S.avLater88=S.avLater88||{};S.avLater88[x]=iso(new Date(TODAY.getTime()+864e5));toast('Te lo recuerdo mañana')}render()},true);
/* ---------- 78 · falla del vehículo: 3 opciones ---------- */
function vehDe88(x){var t=avLimpio88(x);return (S.veh||[]).filter(function(v){return !v.baja&&t.indexOf(v.n)>-1})[0]||null}
function falla88HTML(x){var v=vehDe88(x),k=encodeURIComponent(x),F=S.fa88||{},o=F.k===k?F:null;
 if(o&&o.paso==='costo')return '<div class="fa88"><b>¿Cuánto costó la reparación?</b><div class="field" style="margin-top:6px"><input id="fa88c" type="number" inputmode="decimal" min="0" placeholder="$ (0 si no costó)" style="width:100%"></div><div class="bt"><button class="btn" data-act="fa88" data-v="rep2" data-k="'+k+'">Guardar: ya se reparó</button><button class="btn sec" data-act="fa88" data-v="no" data-k="'+k+'">Cancelar</button></div></div>';
 return '<div class="fa88"><b>¿Qué pasó con esta falla'+(v?' de '+esc(v.n):'')+'?</b><div class="bt"><button class="btn" data-act="fa88" data-v="rep" data-k="'+k+'">🔧 Ya se reparó</button><button class="btn sec" data-act="fa88" data-v="taller" data-k="'+k+'">🏭 Mandarlo al taller (fuera de servicio)</button><button class="btn sec" data-act="fa88" data-v="sigue" data-k="'+k+'">✓ Puede seguir así</button><button class="btn sec" data-act="avgo" data-k="'+k+'">Ver el vehículo ›</button></div></div>'}
window.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act="fa88"]');if(!b)return;e.preventDefault();e.stopImmediatePropagation();var k=b.dataset.k,x=decodeURIComponent(k),v=vehDe88(x),hoy=iso(TODAY),que=avLimpio88(x).replace(/^Salió con una falla:\s*/,''),a=b.dataset.v;
 if(a==='rep'){S.fa88={k:k,paso:'costo'};render();return}if(a==='no'){S.fa88=null;render();return}
 if(a==='rep2'){var i=document.getElementById('fa88c'),m=num(i&&i.value);if(v){v.taller=v.taller||[];v.taller.push({f:hoy,tipo:'Reparación',que:que,costo:m,km:num(v.odo),cat:'Falla reportada'});if(m>0)S.gastos.push({t:'Vehículo: Reparación',m:m,n:v.n+' · '+que,f:hoy,h:hhmm(),q:quien(),veh:v.id,pago:'Efectivo de caja',caja:true})}
  S.fa88=null;quita88(x,'Se reparó');S.hist.push({t:fmtF(hoy)+' '+hhmm(),q:quien(),x:'Se reparó la falla de '+(v?v.n:'')+(m>0?' ('+money(m)+')':'')+': '+que});toast('Listo: reparación registrada');render();return}
 if(a==='taller'){if(v){v.fuera=true;v.taller=v.taller||[];v.taller.push({f:hoy,tipo:'En taller',que:que,costo:0,km:num(v.odo),cat:'Falla reportada'})}quita88(x,'Se mandó al taller');S.hist.push({t:fmtF(hoy)+' '+hhmm(),q:quien(),x:(v?v.n:'El vehículo')+' se mandó al taller: '+que});toast((v?v.n:'El vehículo')+' queda fuera de servicio. Cuando regrese, actívalo en su ficha.');render();return}
 if(a==='sigue'){if(v){v.bit=v.bit||[];v.bit.push({f:hoy,x:'Falla reportada, puede seguir así: '+que,q:quien()})}quita88(x,'Puede seguir así');S.hist.push({t:fmtF(hoy)+' '+hhmm(),q:quien(),x:'Falla de '+(v?v.n:'')+': puede seguir así ('+que+')'});toast('Anotado en la bitácora del vehículo');render();return}},true);
/* en la ficha del vehículo también sale la tarjeta de la falla */
function fichaFalla88(){var o=document.getElementById('fiov');if(!o||S.vehOpen==null||o.querySelector('[data-x="fa88f"]'))return;var v=(S.veh||[]).filter(function(y){return y.id===S.vehOpen})[0];if(!v)return;
 var L=(S.avPrecio||[]).filter(function(x){return typeof x==='string'&&/Salió con una falla/.test(x)&&avLimpio88(x).indexOf(v.n)>-1});if(!L.length)return;var w=o.querySelector('.fiw')||o;var d=document.createElement('div');d.dataset.x='fa88f';d.className='card alert';d.style.padding='12px 14px';
 d.innerHTML='<b style="font-size:18px">⚠️ Falla reportada</b>'+L.map(function(x){return '<div style="margin-top:6px;font-size:15px">'+esc(avLimpio88(x).replace(/^Salió con una falla:\s*/,''))+'</div>'+falla88HTML(x)}).join('');var hd=w.querySelector('.fihd');if(hd&&hd.nextSibling)w.insertBefore(d,hd.nextSibling);else w.prepend(d)}

var _rd88=render;render=function(){try{ordena88()}catch(e){console.error('l88',e)}var r=_rd88.apply(this,arguments);try{fichaFalla88()}catch(e){console.error('l88b',e)}return r};
/* deslizar sobre la lista de pendientes ya no cambia de sección */
var _swB88=swBloq;swBloq=function(t){if(t&&t.closest&&t.closest('[data-x="pnd86"],[data-x="dia80a"],[data-x="tar86"]'))return true;return _swB88.apply(this,arguments)};
