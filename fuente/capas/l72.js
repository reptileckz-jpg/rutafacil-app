/* ===================== v7.6 · el chofer (12 nov)
   68 sin pedidos ni historial ya no le dice cuánto cargar (las 26 cajas y 80 kg eran de la demo)
   72 cliente nuevo: un solo alta por pasos (nombre, teléfono, ubicación, horario, días, foto) y luego la entrega normal; no se vuelve a pedir nada
   73 sin la pregunta de "cuántas vienen rotas"
   78 taras prestadas: al guardar la entrega, aviso y "Ya le pedí las vacías"; buró de taras (7, 15 y 30 días) con descuento al sueldo
   79 "Más opciones" se cierra al pasar a otro cliente
   80 pedido de un cliente: + y − en las cajas, en su tarjeta
   83 cierre: si falta una foto, lleva al paso donde va
   84 "Cliente nuevo" y "Venta rápida" arriba, grandes ===================== */
(function(){var st=document.createElement('style');st.textContent=[
 '.cn72{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin:10px 0 4px}',
 '.cn72 button{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:4px;min-height:92px;border-radius:20px;border:0;font-size:18px;font-weight:900;color:#fff;box-shadow:0 6px 16px rgba(0,0,0,.12)}',
 '.cn72 button span.e{font-size:30px;line-height:1}.cn72 button small{font-size:13px;font-weight:700;opacity:.9}',
 '.cn72 .nv{background:linear-gradient(135deg,#16A34A,#15803D)}.cn72 .vr{background:linear-gradient(135deg,#F59E0B,#EA580C)}',
 '.rp72{background:var(--surface)!important;border:2px solid var(--line)!important;border-radius:20px!important;padding:16px!important;box-shadow:0 10px 30px rgba(0,0,0,.18)!important}',
 '.rp72 .field{background:var(--bg);border-radius:12px;padding:8px 10px;margin-top:8px;border:1px solid var(--line)}',
 '.tb72{border-left:5px solid #DC2626}'].join('\n');document.head.appendChild(st)})();

/* ---------- 68 · lo que se cuela de la demo ---------- */
function limpia72(s){if(!s)return s;try{if(s.salida&&!s.salida.ok&&num(s.salida.R)===26&&num(s.salida.M)===80){s.salida.R=0;s.salida.M=0}var m=s.mayMin||{};if(String(m.R)==='220'&&String(m.M)==='15'&&!s.mayMin71)s.mayMin={R:'',M:''}}catch(e){}return s}
if(MODO==='vacio'){var _fr72=fresh;fresh=function(){return limpia72(_fr72.apply(this,arguments))};limpia72(S)}
function sinBase72(){var hayPed=(S.stops||[]).some(function(x){var c=cl(x.c);return c&&c.ped&&(num(c.ped.R)||num(c.ped.M))});return !(S.rutasHist||[]).length&&!hayPed&&!(S.stops||[]).length}
function stock72(){if(S.role!=='rep'||S.salida.ok)return;var m=document.querySelector('main'),c=m&&m.querySelector('.card.rep1');if(!c||c.dataset.x72)return;if(!(num(S.salida.R)===0&&num(S.salida.M)===0||sinBase72()))return;c.dataset.x72='1';
 c.innerHTML='<div class="h">'+SV38.camion+'<span>¿Cuánto cargas hoy?</span></div><div style="font-size:17px;font-weight:700;margin-top:8px">Todavía no hay con qué calcularlo: no tienes pedidos ni días anteriores.</div><div class="lbl" style="margin-top:4px">Carga lo que te diga el administrador. Al iniciar el día capturas lo que de verdad llevas.</div>'}

/* ---------- 72 · cliente nuevo del chofer: un solo alta por pasos ---------- */
var _ubO72=ub68Obj;ub68Obj=function(x){if(x&&x.t==='wz')return S.wz&&S.wz.d||null;return _ubO72.apply(this,arguments)};
var _ubN72=ub68Nom;ub68Nom=function(x){if(x&&x.t==='wz'){var d=S.wz&&S.wz.d||{};return String(d.n||'').trim()||'el cliente'}return _ubN72.apply(this,arguments)};
function ubWz72(d){var ok=d.lat!=null&&d.lat!=='';return '<div class="card" style="border:2px solid '+(ok?'var(--accent)':'var(--line)')+'"><b style="font-size:18px">'+(ok?'✓ Ubicación guardada':'Todavía sin ubicación')+'</b>'+(ok?'<div class="lbl">'+d.lat+', '+d.lng+'</div>':'<div class="lbl">Si estás en el negocio, usa "Estoy aquí".</div>')
 +'<button class="btn" style="margin-top:10px;min-height:58px;width:100%" data-act="wz72gps">📍 Estoy aquí (GPS)</button><button class="btn sec" style="margin-top:8px;min-height:54px;width:100%" data-act="wz72ub">🔎 Buscar el lugar o pegar el link</button></div>'}
var HORAS72=function(){var o=[];for(var h=5;h<=22;h++){o.push([String(h).padStart(2,'0')+':00',(h%12||12)+':00 '+(h<12?'am':'pm')])}return o};
WZ.cliCh={tit:'Cliente nuevo',fin:'Guardar y hacer la entrega',pasos:[
 {q:'¿Cómo se llama el negocio?',c:[{k:'n',l:'Nombre',ph:'Ej. Abarrotes Lupita'}],ok:function(d){return S.cli.some(function(c){return !c.oculto&&c.n.trim().toLowerCase()===String(d.n).trim().toLowerCase()})?'Ya hay un cliente con ese nombre':''}},
 {q:'¿Cómo le dicen? (apodo)',a:'Para que lo reconozcas rápido. Si no tiene, toca "Saltar".',saltar:true,c:[{k:'ap',l:'Apodo',ph:'Ej. La güera',opc:true}]},
 {q:'¿Cuál es su teléfono?',a:'Para mandarle su ticket por WhatsApp.',html:function(d){return '<div class="card"><div class="field grande"><label for="wz_tel">Teléfono (10 dígitos)</label><input id="wz_tel" type="tel" inputmode="tel" data-wz="tel" value="'+esc(d.tel||'')+'"></div><button class="link" data-act="wz72notel" style="margin-top:6px">No quiso dar teléfono</button></div>'},
  ok:function(d){if(d.telNo)return '';var t=String(d.tel||'').replace(/\D/g,'');return t.length!==10?'Escribe el teléfono a 10 dígitos (o toca "No quiso dar teléfono")':''}},
 {q:'¿Dónde está?',a:'Guarda el punto exacto del negocio: con eso se arman las rutas.',html:function(d){return ubWz72(d)},ok:function(d){return d.lat!=null&&d.lat!==''?'':'Pon la ubicación del negocio'}},
 {q:'¿Alguna referencia para llegar?',a:'Calle, color de la fachada, entre qué calles… Si no hace falta, toca "Saltar".',saltar:true,c:[{k:'a',l:'Dirección o referencia',opc:true}]},
 {q:'¿A qué hora abre y a qué hora cierra?',html:function(d){var o=HORAS72();var sel=function(k,l){return '<div class="field grande"><label for="wz_'+k+'">'+l+'</label><select id="wz_'+k+'" data-wz="'+k+'"><option value="">Escoge</option>'+o.map(function(x){return '<option value="'+x[0]+'"'+(d[k]===x[0]?' selected':'')+'>'+x[1]+'</option>'}).join('')+'</select></div>'};return '<div class="card">'+sel('hAb','Abre a las')+sel('hCi','Cierra a las')+'</div>'},
  ok:function(d){if(!d.hAb||!d.hCi)return 'Escoge la hora en que abre y en que cierra';return d.hCi<=d.hAb?'La hora de cierre debe ser después de la de abrir':''}},
 {q:'¿Qué días se le visita?',html:function(d){var L=d.dias||[];return '<div class="card"><div class="opc" style="grid-template-columns:repeat(4,1fr)">'+DIAS_TXT.map(function(x,i){return '<button data-act="wzdia" data-v="'+i+'" aria-pressed="'+(L.indexOf(i)>-1)+'" style="min-height:56px">'+x.slice(0,3)+'</button>'}).join('')+'</div></div>'},ok:function(d){return (d.dias||[]).length?'':'Escoge al menos un día'}},
 {q:'Foto de la fachada',a:'Así el que vaya después lo encuentra. Si es de noche, toca "Saltar" y se la pides otro día.',saltar:true,c:[{k:'foto',t:'foto',l:'Fachada',opc:true}]},
 {q:'Revisa y guarda',html:function(d){return '<div class="card good">'+rw('Cliente',esc(d.n)+(d.ap?' “'+esc(d.ap)+'”':''))+rw('Teléfono',d.telNo?'No quiso dar':esc(d.tel||''))+rw('Ubicación',d.lat!=null?'✓ Guardada':'—')+(d.a?rw('Referencia',esc(d.a)):'')+rw('Horario',esc(d.hAb||'')+' a '+esc(d.hCi||''))+rw('Días',(d.dias||[]).map(function(i){return DIAS_TXT[i]}).join(', '))+rw('Foto',d.foto?'✓':'Después')+rw('Pago','De contado (es nuevo)')+'</div>'}}],
 guardar:function(d){if(!S.salida.ok)return 'Primero inicia el reparto';var c=nuevoCli({n:String(d.n).trim(),tel:d.telNo?'':String(d.tel||'').replace(/\D/g,''),a:d.a||'',dias:(d.dias||[]).slice(),chofer:+S.chofHoy});
  c.ap=String(d.ap||'').trim();c.hAb=d.hAb;c.hCi=d.hCi;c.lat=+d.lat;c.lng=+d.lng;c.locBy=chofN(S.chofHoy);c.locF=iso(TODAY);if(d.foto){c.foto=d.foto;c.fotoH=hhmm()}else c.fotoSkip=iso(TODAY);if(d.telNo)c.telNo=true;
  c.credOk=false;c.lim=0;c.compras=0;c.nuevo=true;c.altaCh=+S.chofHoy;S.cli.push(c);try{if(typeof limSync==='function')limSync()}catch(e){}
  S.hist.push({t:fmtF(iso(TODAY))+' '+hhmm(),q:chofN(S.chofHoy),x:'Dio de alta al cliente '+c.n+' en la ruta'});try{(S.avPrecio=S.avPrecio||[]).push(chofN(S.chofHoy)+' dio de alta al cliente nuevo '+c.n+' en su ruta')}catch(e){}
  var at=curStop();if(at<0)at=S.stops.length;S.stops.splice(at,0,{c:c.id,nuevo72:true});S.cur=at;resetDraft(c);c.nuevo=false;S.d.reg=false;S.tab.rep='entrega';toast('✓ '+c.n+' guardado. Ahora la entrega.');setTimeout(function(){window.scrollTo(0,0)},50);return true}};
window.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act="calle"][data-reg="1"]');if(!b||S.role!=='rep')return;e.stopImmediatePropagation();e.preventDefault();if(!S.salida.ok){toast('Primero inicia el reparto');return}
 wzAbre('cliCh',{dias:[new Date().getDay()]})},true);
document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act="wz72gps"],[data-act="wz72ub"],[data-act="wz72notel"]');if(!b||!S.wz)return;e.stopImmediatePropagation();var d=S.wz.d,a=b.dataset.act;
 if(a==='wz72notel'){d.telNo=true;d.tel='';S.wz.err='';S.wz.p++;render();return}
 if(a==='wz72ub'){S.ub68={t:'wz',id:'wz',p:0};render();return}
 toast('Buscando tu ubicación…');try{navigator.geolocation.getCurrentPosition(function(p){S.ub68={t:'wz',id:'wz',p:2,lat:+p.coords.latitude.toFixed(6),lng:+p.coords.longitude.toFixed(6)};render()},function(){toast('No se pudo leer el GPS. Prende la ubicación o busca el lugar.')},{enableHighAccuracy:true,timeout:15000,maximumAge:0})}catch(er){toast('No se pudo leer el GPS.')}},true);
document.addEventListener('input',function(e){var t=e.target;if(t&&t.dataset&&t.dataset.wz==='tel'&&S.wz)S.wz.d.telNo=false},true);
/* lo que ya se pidió en el alta no se vuelve a pedir en la entrega */
var _ucf72=ubCliFalta;ubCliFalta=function(c){var f=_ucf72.apply(this,arguments);if(!c)return f;return f.filter(function(x){if(x==='teléfono'&&c.telNo)return false;if(x==='foto de la fachada'&&c.fotoSkip===iso(TODAY))return false;return true})};

/* ---------- 73 · sin "cuántas vienen rotas" ---------- */
function rotas72(){if(S.role!=='rep'||S.tab.rep!=='entrega')return;var m=document.querySelector('main');if(!m)return;Array.prototype.forEach.call(m.querySelectorAll('label,span,div'),function(el){if(el.children.length>3)return;if(/^De esas, cuántas vienen rotas/.test((el.textContent||'').trim())){var f=el.closest('.field')||el.parentElement;if(f&&f!==m)f.remove()}});if(S.d&&num(S.d.Vr))S.d.Vr=0}

/* ---------- 79 · "Más opciones" se cierra con cada cliente ---------- */
var _rD72=resetDraft;resetDraft=function(){try{if(S.dOpen){S.dOpen.entmas=false}}catch(e){}return _rD72.apply(this,arguments)};

/* ---------- 78 · taras prestadas ---------- */
function tarCfg72(){var c=crCfg();return {d1:num(c.bD1)||7,d2:num(c.bD2)||15,d3:num(c.bD3)||30,pr:num(S.cfg.taraDesc)>0?num(S.cfg.taraDesc):(num(S.cajaCfg&&S.cajaCfg.precio)||35)}}
function tarEdad72(c){if(!c||!(num(c.vac)>0)||!c.vacDesde)return 0;return Math.max(0,Math.round((TODAY-new Date(c.vacDesde+'T12:00:00'))/864e5))}
function tar72HTML(){var x=S.tar72;if(!x)return '';var c=cl(x.c);if(!c){S.tar72=null;return ''}var T=tarCfg72();
 return ovW70('tar72ov','Taras prestadas','<div class="card tb72" style="padding:14px"><div style="font-size:20px;font-weight:900">'+esc(c.n)+' se queda debiendo '+x.n+' tara'+(x.n===1?'':'s')+'</div>'+(x.antes?'<div class="lbl">Ya debía '+x.antes+'.</div>':'')+'</div>'
  +'<div class="card" style="padding:14px;font-size:17px;line-height:1.4">Prestar taras es una facilidad, como el crédito: <b>entre menos, mejor</b>. Pídele las vacías siempre, o deja solo las mínimas.<br><br>Si no las regresa: a los <b>'+T.d1+' días</b> te avisamos, a los <b>'+T.d2+'</b> le avisamos al administrador y a los <b>'+T.d3+' días se descuentan de tu sueldo</b> ('+money(T.pr)+' cada una).</div>'
  +'<button class="btn big" data-act="tar72pedi">✓ Ya le pedí las vacías</button><button class="btn sec big" data-act="tar72sigue">Guardar así (no tenía)</button><button class="btn sec big" data-act="tar72x">Regresar a la entrega</button>','tar72x')}
window.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act="entconf"]');if(!b||S.role!=='rep'||!S.d)return;var k=entregaCalc(),c=k&&k.c;if(!c||c.oculto||c.rapida)return;var antes=num(c.vac),des=num(k.vacias);if(!(des>antes))return;if(S.d._tar72)return;
 e.preventDefault();e.stopImmediatePropagation();S.tar72={c:c.id,n:des,antes:antes};render()},true);
document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act="tar72pedi"],[data-act="tar72sigue"],[data-act="tar72x"]');if(!b)return;e.stopImmediatePropagation();var x=S.tar72;S.tar72=null;if(!x){render();return}var a=b.dataset.act;
 if(a==='tar72x'){render();return}var c=cl(x.c);S.d._tar72=a==='tar72pedi'?'pedi':'no';render();
 setTimeout(function(){var bt=document.querySelector('[data-act="entconf"]');if(bt)bt.click();setTimeout(function(){if(!c)return;if(a==='tar72pedi'){c.vacPidio=iso(TODAY);S.hist.push({t:fmtF(iso(TODAY))+' '+hhmm(),q:chofN(S.chofHoy),x:'Le pidió las taras vacías a '+c.n+' (queda debiendo '+num(c.vac)+')'})}},60)},30)},true);
/* buró de taras: avisos y descuento al sueldo (lo hace el celular del administrador, una sola vez por deuda) */
function tarBuro72(){if(!(S.role==='admin'&&!S.encOn))return;var hoy=iso(TODAY);if(S.tarRev72===hoy)return;S.tarRev72=hoy;var T=tarCfg72();
 (S.cli||[]).forEach(function(c){if(c.oculto||!(num(c.vac)>0)||!c.vacDesde)return;var e=tarEdad72(c),ch=c.chofer,cn=chofN(ch);
  if(e>=T.d2&&c.tarAv72!==c.vacDesde){c.tarAv72=c.vacDesde;(S.avPrecio=S.avPrecio||[]).push(c.n+' debe '+c.vac+' taras desde hace '+e+' días (lo visita '+cn+'). A los '+T.d3+' días se descuentan del sueldo de '+cn+'.')}
  if(e>=T.d3&&c.tarDesc72!==c.vacDesde&&ch){c.tarDesc72=c.vacDesde;var m=r2(num(c.vac)*T.pr);S.faltantes.push({ch:+ch,m:m,fecha:hoy,desc:true,pend:true,mot:'Taras no regresadas de '+c.n+' ('+c.vac+' × '+money(T.pr)+')',tar72:c.id});
   S.hist.push({t:fmtF(hoy)+' '+hhmm(),q:'La app',x:'Descuento a '+cn+': '+money(m)+' por '+c.vac+' taras de '+c.n+' ('+e+' días)'});(S.avPrecio=S.avPrecio||[]).push('Se descontaron '+money(m)+' del sueldo de '+cn+' por '+c.vac+' taras que '+c.n+' no regresó en '+T.d3+' días.')}});
 /* 108 · las que el cliente pagó en lugar de regresarlas: al chofer a mitad de precio (tema-taras.js) */
 try{if(typeof tarCastigo108==='function')tarCastigo108(T)}catch(e){}}
try{if(typeof CLIK!=='undefined'&&CLIK.push)['vacPidio','tarAv72','tarDesc72','telNo','fotoSkip','altaCh','locBy','locF'].forEach(function(k){if(CLIK.indexOf(k)<0)CLIK.push(k)})}catch(e){}
/* al chofer: en la entrega, cuánto tiempo lleva debiendo y qué pasa si no las regresa */
function tarEnt72(){if(S.role!=='rep'||S.tab.rep!=='entrega')return;var m=document.querySelector('main');if(!m||m.querySelector('[data-x="tar72"]'))return;var i=curStop(),c=i>=0?cl(S.stops[i].c):null;if(!c||!(num(c.vac)>0))return;var e=tarEdad72(c),T=tarCfg72();if(e<T.d1)return;
 var d=document.createElement('div');d.className='card tb72';d.dataset.x='tar72';d.innerHTML='<b style="font-size:18px">🧺 Te debe '+c.vac+' tara'+(c.vac===1?'':'s')+' desde hace '+e+' días</b><div style="font-size:16px;margin-top:4px">'+(e>=T.d3?'Ya pasaron '+T.d3+' días: se descontaron de tu sueldo. Si te las regresa, avísale al administrador.':'Pídeselas hoy. A los '+T.d3+' días ('+(T.d3-e)+' más) se descuentan de tu sueldo ('+money(T.pr)+' cada una).')+'</div>'+(typeof tarCobBtn108==='function'?tarCobBtn108(c,e):'');
 var an=m.querySelector('.card');if(an)an.after(d);else m.prepend(d)}
/* Ajustes: precio de la tara para el descuento */
var _aj72=ajHTML;ajHTML=function(){var h=_aj72.apply(this,arguments);if(!h||h.indexOf('id="ajov"')<0||S.role!=='admin'||S.encOn)return h;var T=tarCfg72();
 var c='<details class="card" data-k="aj72tar"'+(S.dOpen.aj72tar?' open':'')+'><summary><b>🧺 Buró de taras</b><span class="lbl">días y descuento al chofer</span></summary><div class="lbl" style="margin-top:6px">Usa los mismos días del buró de crédito: aviso al chofer a los '+T.d1+' días, al administrador a los '+T.d2+' y descuento del sueldo del chofer a los '+T.d3+' (a mitad de precio las que el cliente pagó).</div>'
  +'<div class="field"><label for="tarCob108">Días para cobrarle las taras al cliente</label><input id="tarCob108" type="number" inputmode="numeric" step="1" min="1" data-bind="cfg.tarCob108" value="'+esc(S.cfg.tarCob108==null?'25':S.cfg.tarCob108)+'"></div>'
  +'<div class="field"><label for="taraDesc">Descuento por cada tara $</label><input id="taraDesc" type="number" inputmode="decimal" step="any" min="0" data-bind="cfg.taraDesc" value="'+esc(S.cfg.taraDesc==null?String(T.pr):S.cfg.taraDesc)+'"></div></details>';
 var i=h.lastIndexOf('</div></div>');return i<0?h:h.slice(0,i)+c+h.slice(i)};

/* ---------- 80 · pedido de un cliente (en la ruta) ---------- */
function rp72(){var i=document.getElementById('rpR');if(!i)return;var dl=i.closest('[role="dialog"]')||i.closest('.card')||i.parentElement.parentElement;if(dl&&!dl.classList.contains('rp72'))dl.classList.add('rp72');if(i.parentElement.classList.contains('step'))return;
 var w=document.createElement('span');w.className='step';w.innerHTML='<button data-act="kgd" data-p="rp.R" data-d="-1" aria-label="Menos 1">−</button>';i.parentElement.insertBefore(w,i);w.appendChild(i);i.style.width='76px';i.style.textAlign='center';var pl=document.createElement('button');pl.className='plus';pl.dataset.act='kgd';pl.dataset.p='rp.R';pl.dataset.d='1';pl.setAttribute('aria-label','Más 1');pl.textContent='+';w.appendChild(pl)}

/* ---------- 83 · cierre: si falta una foto, ir al paso donde va ---------- */
function cierreFalta72(){if(S.role!=='rep'||S.tab.rep!=='cierre'||!S.cierre||S.cierre.sent)return;var sel=window._faltaSel;if(!sel)return;var vis=function(){var el=document.querySelector(sel);return el&&el.offsetParent!==null};if(vis())return;
 var p0=S.cierreP||0;for(var k=0;k<8;k++){if(k===p0)continue;S.cierreP=k;_rd72.call(window);if(vis()){setTimeout(function(){var el=document.querySelector(sel);if(el){try{el.scrollIntoView({block:'center',behavior:'smooth'})}catch(e){}try{marcaFalta(el)}catch(e){}}},80);return}}S.cierreP=p0;_rd72.call(window)}

/* ---------- 84 · botones de cliente nuevo y venta rápida ---------- */
var CN72='<div class="cn72"><button class="nv" data-act="calle" data-reg="1"><span class="e">🏪</span>Cliente nuevo<small>Darlo de alta y venderle</small></button><button class="vr" data-act="calle" data-reg="0"><span class="e">⚡</span>Venta rápida<small>Alguien en la calle</small></button></div>';
var CALLE0='<div style="display:flex;gap:8px"><button class="btn sec" style="flex:1" data-act="calle" data-reg="0">Venta rápida</button><button class="btn sec" style="flex:1" data-act="calle" data-reg="1">Cliente nuevo</button></div>';
/* se acomodan al armar la pantalla (antes de que el tutorial calcule dónde señalar) */
var _vr72=null;function vr72Pon(){if(_vr72||typeof VIEWS==='undefined'||!VIEWS.ruta)return;_vr72=VIEWS.ruta;VIEWS.ruta=function(){var h=_vr72.apply(this,arguments);try{if(S.role!=='rep'||!S.salida.ok||typeof h!=='string'||h.indexOf(CALLE0)<0)return h;h=h.replace(CALLE0,'');var sc='';try{sc=stockCard()}catch(e){}var i=sc?h.indexOf(sc):-1;return i>-1?h.slice(0,i+sc.length)+CN72+h.slice(i+sc.length):CN72+h}catch(e){return h}};}
function botones72(){}

/* ---------- dibujo ---------- */
var _rd72=render;render=function(){try{vr72Pon()}catch(e){}var r=_rd72.apply(this,arguments);try{stock72();rotas72();tarEnt72();rp72();botones72();cierreFalta72();tarBuro72();ovPon70('tar72ov',tar72HTML());
 /* 108–110 (tema-taras.js, tema-cargarmas.js) */
 if(typeof tar108HTML==='function'){ovPon70('tar108ov',tar108HTML());ovPon70('deb109ov',deb109HTML());debCard109();tarFondoCard108()}if(typeof cm110HTML==='function'){ovPon70('cm110ov',cm110HTML());bodCard110()}}catch(e){console.error('l72',e)}return r};
