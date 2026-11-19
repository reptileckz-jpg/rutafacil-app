/* ===================== v7.0 · 93: que una persona nueva la pueda usar sola:
   tutorial desde el primer día (admin y chofer), "Hoy te toca" / "Ahora sigue", "Aprende la app" arriba,
   botón "?" en cada pantalla y la burbuja "¿Qué sigue?" si se queda quieto ===================== */
(function(){var st=document.createElement('style');st.textContent=[
 '.qbtn{width:34px;height:34px;min-height:34px;border-radius:50%;border:2px solid var(--line);background:var(--surface);font-weight:900;font-size:17px;color:var(--fg);margin-left:8px;vertical-align:middle;padding:0}',
 '#guiab{position:fixed;left:12px;right:12px;bottom:calc(84px + env(safe-area-inset-bottom,0px));z-index:86;background:var(--fg);color:var(--bg);border-radius:18px;padding:14px 16px;box-shadow:0 6px 24px rgba(0,0,0,.35);max-width:520px;margin:0 auto;animation:popin .25s}',
 '#guiab b{font-size:17px}#guiab .t{font-size:16px;margin:4px 0 10px;line-height:1.35}#guiab .bb{display:flex;gap:8px}#guiab button{flex:1;min-height:50px;border-radius:12px;border:0;font-weight:800;font-size:16px}#guiab .si{background:var(--banana,#F2C230);color:#1E2A1A}#guiab .no{background:transparent;color:var(--bg);border:2px solid rgba(255,255,255,.4)}',
 '.guiahl{outline:4px solid var(--banana,#F2C230)!important;outline-offset:3px;border-radius:12px;animation:guiapulse 1s ease-in-out 3}@keyframes guiapulse{50%{outline-offset:9px}}',
 '.hoytoca .it{display:flex;align-items:center;gap:10px;min-height:52px;border-top:1px solid var(--line);width:100%;background:none;border-left:0;border-right:0;border-bottom:0;text-align:left;font-size:16px;color:inherit;padding:0}.hoytoca .it:first-of-type{border-top:0}.hoytoca .ck{width:28px;height:28px;border-radius:50%;border:2px solid var(--line);display:inline-flex;align-items:center;justify-content:center;flex:none;font-weight:900}.hoytoca .ok .ck{background:var(--accent);border-color:var(--accent);color:#fff}.hoytoca .ok{color:var(--muted)}.hoytoca .sig{font-weight:800}.hoytoca .sig .ck{border-color:var(--accent)}',
 '.ahora{border:2px solid var(--accent)}.ahora .q{font-size:20px;font-weight:900;margin-top:2px}'].join('\n');document.head.appendChild(st)})();
function guiaUid(){try{return (NB&&NB.user&&NB.user.uid)||'local'}catch(e){return 'local'}}
function guiaGet(k){try{return localStorage.getItem('guia:'+guiaUid()+':'+k)}catch(e){return null}}
function guiaSet(k,v){try{localStorage.setItem('guia:'+guiaUid()+':'+k,v==null?'1':String(v))}catch(e){}}
function guiaDia(){var f=guiaGet('ini');if(!f){f=iso(TODAY);guiaSet('ini',f)}return Math.floor((new Date(iso(TODAY)).getTime()-new Date(f).getTime())/864e5)+1}
/* ---------- consejos por pantalla ---------- */
var GUIA={admin:{
 inicio:['Inicio','Aquí ves lo que te toca hoy, en orden. Empieza por fijar el precio del día.','.hoytoca, main .card'],
 bodega:['Bodega','Cuántas cajas hay: verdes, madurando y maduras. Cuando llega fruta, regístrala aquí.','main .card'],
 cargas:['Cargas y viajes','Con el botón + programas un viaje al proveedor. Con el Simulador ves cuánto deja antes de ir.','.fab, [data-act="simabre"], main .card'],
 clientes:['Clientes','Toca un cliente para ver su cuenta, cobrarle o cambiar sus datos. "+ Agregar" para uno nuevo.','[data-act="clialta"], main .card'],
 gastos:['Gastos','Registra los gastos del negocio y revisa los de los choferes.','main .card'],
 vehiculos:['Vehículos','Papeles, taller, llantas y lo que gasta cada vehículo. La app te avisa antes de que venza algo.','main .card'],
 personal:['Personal','Toca a un chofer para ver sus datos, su sueldo y su recorrido del día.','main .card'],
 estadisticas:['Estadísticas','Ventas, ganancia y cómo va cada chofer y cada cliente.','main .card'],
 mas:['Más','Aquí están Vehículos, Personal y Estadísticas.','main .card'],
 cierreadm:['Cierre del chofer','Toca "Recibir el cierre": la app te dice qué debe regresar y tú solo confirmas.','[data-act="rcabre"], main .card']},
 rep:{
 ruta:['Tu ruta','Arriba sale lo que sigue. Toca "Entregar" en tu siguiente cliente. El botón Gasto es para comida, casetas o combustible.','.ahora, .card.next, [data-act="iniciar"], main .card'],
 entrega:['Entrega','Escribe cuántas cajas y kilos le dejas y cómo te pagó. Si no estaba, toca "No estaba".','main .card'],
 cierre:['Cierre','Al terminar tu ruta: odómetro, fotos, cajas y efectivo, un paso a la vez.','main .card'],
 viaje:['Viaje de carga','Cuando te programen un viaje sale aquí, con la hora y a dónde vas.','main .card']}};
function guiaTip(){var r=S.role==='rep'?'rep':(S.role==='admin'?'admin':null);if(!r)return null;var t=S.tab[S.role];return (GUIA[r]||{})[t]||null}
function guiaMuestra(sel){var L=String(sel||'main').split(/,\s*/);for(var i=0;i<L.length;i++){var el=document.querySelector(L[i]);if(el&&el.getClientRects().length){try{el.scrollIntoView({block:'center',behavior:'smooth'})}catch(e){}el.classList.remove('guiahl');void el.offsetWidth;el.classList.add('guiahl');setTimeout(function(){el.classList.remove('guiahl')},3500);return true}}return false}
function guiaBurbuja(forzar){var g=guiaTip();if(!g)return;var k=S.role+':'+S.tab[S.role];if(!forzar&&guiaGet('ok:'+k))return;var o=document.getElementById('guiab');if(o)o.remove();
 o=document.createElement('div');o.id='guiab';o.setAttribute('role','dialog');o.setAttribute('aria-label','¿Qué sigue?');o.dataset.k=k;
 o.innerHTML='<b>¿Qué sigue? · '+esc(g[0])+'</b><div class="t">'+esc(g[1])+'</div><div class="bb"><button class="si" data-act="guiamu">Muéstrame</button><button class="no" data-act="guiaok">Ya entendí</button></div>';document.body.appendChild(o)}
function guiaCierra(){var o=document.getElementById('guiab');if(o)o.remove()}
/* si se queda quieto ~18 s en una pantalla (las primeras 3 semanas), sale la burbuja */
var _guiaT=Date.now();['click','touchstart','keydown','scroll','input'].forEach(function(ev){window.addEventListener(ev,function(e){if(e.target&&e.target.closest&&e.target.closest('#guiab'))return;_guiaT=Date.now()},{capture:true,passive:true})});
setInterval(function(){try{if((!REAL||navigator.webdriver)&&!window.__guiaTest)return;if(document.getElementById('guiab')||!guiaLibre())return;
 if(guiaDia()>21||S.guiaOff)return;if(Date.now()-_guiaT<(window.__guiaIdle||18000))return;guiaBurbuja(false)}catch(e){}},2000);
document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act="guiamu"],[data-act="guiaok"],[data-act="guiaq"]');if(!b)return;e.stopImmediatePropagation();var a=b.dataset.act;
 if(a==='guiaq'){guiaBurbuja(true);return}var o=document.getElementById('guiab'),k=o&&o.dataset.k;
 if(a==='guiamu'){var g=guiaTip();guiaCierra();if(g)guiaMuestra(g[2]);_guiaT=Date.now();return}
 if(k)guiaSet('ok:'+k);guiaCierra();_guiaT=Date.now()},true);
/* botón "?" junto al título de cada pantalla */
/* render: pasó a tema-dibujar1.js */
/* ---------- "Hoy te toca" (admin) ---------- */
function hoyItems(){var h=new Date().getHours(),hoy=iso(TODAY),L=[];
 var choferesRuta=nbRutaIdsSeguro().length;
 L.push(['Fijar el precio de hoy',S.precio&&S.precio.conf===hoy,'[data-act="precioconf"], main .card','inicio']);
 var prog=(S.cargas||[]).filter(function(c){return c.prog&&c.est==='Por llegar'});L.push(['Revisar los viajes de carga'+(prog.length?' ('+prog.length+')':''),!prog.length||!!S.hoyVisto&&S.hoyVisto.cargas===hoy,'nav.tabs button[data-t="cargas"]','cargas']);
 L.push(['Ver a los choferes en ruta',!!S.hoyVisto&&S.hoyVisto.personal===hoy,'nav.tabs button[data-t="personal"]','personal']);
 var porRecibir=S.cierre&&S.cierre.sent&&!(S.cierreReg&&S.recep);L.push(['Recibir los cierres'+(porRecibir?' (hay uno)':''),!porRecibir&&h>=18||(!!S.cierreReg&&!!S.recep),'[data-act="vercierre"], [data-act="rcabre"]','inicio']);
 L.push(['Mandarte el resumen del día',S.resHoy===hoy,'[data-act="resdia"], main .card','inicio']);return L}
function nbRutaIdsSeguro(){try{return typeof nbRutaIds==='function'?nbRutaIds():[]}catch(e){return []}}
function hoyTocaHTML(){if(S.role!=='admin'||S.encOn||S.hoyOff)return '';var L=hoyItems(),i0=-1;L.forEach(function(x,i){if(i0<0&&!x[1])i0=i});if(i0<0)return '<div class="card good hoytoca" data-key="hoytoca"><b>Hoy ya hiciste todo ✓</b></div>';
 return '<div class="card hoytoca" data-key="hoytoca"><b style="font-size:18px">Hoy te toca</b>'+L.map(function(x,i){return '<button class="it'+(x[1]?' ok':'')+(i===i0?' sig':'')+'" data-act="hoyir" data-i="'+i+'"><span class="ck">'+(x[1]?'✓':i+1)+'</span><span class="grow">'+esc(x[0])+(i===i0?'<br><span class="lbl">Ahora sigue esto</span>':'')+'</span><span class="lbl">›</span></button>'}).join('')+'</div>'}
document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act="hoyir"]');if(!b)return;e.stopImmediatePropagation();var x=hoyItems()[+b.dataset.i];if(!x)return;S.hoyVisto=S.hoyVisto||{};
 if(x[3]!=='inicio'){S.hoyVisto[x[3]]=iso(TODAY);S.tab.admin=x[3];render();window.scrollTo(0,0)}else{render();setTimeout(function(){guiaMuestra(x[2])},60)}},true);
/* ---------- "Ahora sigue" (chofer) ---------- */
function ahoraSigue(){if(S.role!=='rep')return null;if(S.cierre&&S.cierre.sent)return null;
 if(!(S.salida&&S.salida.ok))return ['Empieza tu día','Revisa el vehículo, toma las fotos y toca "Iniciar".','[data-act="insprep"], [data-act="iniciar"]'];
 var p=(S.stops||[]).filter(function(x){return !x.done});if(p.length){var c=cl(p[0].c);return ['Entrega a '+(c?c.n:'tu siguiente cliente'),'Toca "Entregar" cuando llegues. Te faltan '+p.length+' cliente'+(p.length>1?'s':'')+'.','[data-act="entregar"], .card.next']}
 if(!(S.stops||[]).length)return ['Espera tus entregas','Todavía no tienes clientes en tu ruta. Cuando te asignen, salen aquí.','main .card'];
 return ['Haz tu cierre','Ya entregaste a todos. Ve a Cierre y sigue los pasos.','nav.tabs button[data-t="cierre"]']}
/* ruta: pasó a tema-ruta.js */
document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act="ahorami"]');if(!b)return;e.stopImmediatePropagation();var a=ahoraSigue();if(a)guiaMuestra(a[2])},true);
/* ---------- Inicio del admin: "Hoy te toca" y "Aprende la app" arriba ---------- */
/* inicio: pasó a tema-inicio.js */
if(typeof VIEWS!=='undefined'&&VIEWS.inicio)VIEWS.inicio=inicio;
/* ruta: pasó a tema-ruta.js */
/* ---------- tutorial desde el primer día, para cada persona (no depende del de otro celular) ---------- */
function guiaLibre(){try{if(S.tut||S.wz||S.modal||S.confirm||S.perm||(_pin&&_pin.modo))return false;if(typeof bienvOn==='function'&&bienvOn())return false;
 return !document.querySelector('#nbov,#setov,#permov,#bienv,#arr,#pxov,#pinov,#fiov,#rcov,#eqov,#wzov,#pwov,#ajov,#gmov,[role="dialog"][aria-modal="true"]')}catch(e){return false}}
var _tutVez56=false;/* render: pasó a tema-dibujar1.js */
window.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act="resdia"]');if(b)S.resHoy=iso(TODAY)},true);
['resHoy','hoyVisto'].forEach(function(k){if(NB_SH.indexOf(k)<0)NB_SH.push(k)});
