/* ===================== v9.0 · 85–92 (17 nov) prueba de Ricardo
   85 Fotos del vehículo (admin): al tocarlas se abren en grande (la foto se abría DETRÁS de la ventana de fotos).
   86 Al chofer en ruta le quitan un cliente: ventana grande "Ya no vayas con X" (quién lo lleva) y "Tu siguiente parada ahora es Y";
      si estaba entregándole a ese cliente, sale de la entrega.
   87 El tutorial de reparto del administrador: ya no le sale el del chofer (señalaba botones que él no tiene); sale uno suyo de 3 pasos.
   88 El administrador que reparte: "Mi ruta de hoy" cuenta sus clientes al momento y sale arriba en Inicio; ya no pregunta otra vez
      "¿Vas a salir a repartir?" si ya prendió "¿Repartes hoy?"; los clientes que se pasa en Rutas le llegan aunque ya esté en su ruta;
      barra fija "Estás repartiendo · Volver a administrador".
   89 Vehículo ocupado: si otro ya salió con un vehículo y no ha cerrado, a los demás les sale "Ocupado: lo trae X" y no lo pueden escoger.
   90 El administrador en su ruta: sin "el administrador ve tu ubicación", sin "¿No eres…?", y el cierre ya no dice "entregar al
      administrador" (el efectivo de su ruta va a la caja). ===================== */
(function(){var st=document.createElement('style');st.textContent=[
 '#av90{position:fixed;inset:0;z-index:97;background:rgba(0,0,0,.55);display:flex;align-items:center;justify-content:center;padding:18px}',
 '#av90 .w{background:var(--surface);color:var(--fg);border-radius:20px;max-width:440px;width:100%;padding:20px 18px;box-shadow:0 10px 40px rgba(0,0,0,.35)}',
 '#av90 h2{font-size:22px;margin:6px 0 10px;text-align:center}#av90 .q{font-size:17px;padding:10px 12px;border-radius:12px;background:color-mix(in srgb,#DC2626 10%,var(--surface));border:1.5px solid #FCA5A5;margin-top:8px}',
 '#av90 .sig{font-size:17px;padding:10px 12px;border-radius:12px;background:color-mix(in srgb,#16A34A 12%,var(--surface));border:1.5px solid #86EFAC;margin-top:10px}',
 '.ar90b{position:sticky;top:calc(var(--sbar,0px) + 4px);z-index:6;display:flex;align-items:center;gap:8px;background:#1E3A8A;color:#fff;border-radius:14px;padding:8px 10px 8px 14px;margin:4px 0 10px;box-shadow:0 4px 14px rgba(0,0,0,.18)}',
 '.ar90b b{font-size:16px}.ar90b .lbl{color:#DBEAFE!important;font-size:13px}.ar90b button{flex:none;min-height:46px;border-radius:12px;border:0;background:#fff;color:#1E3A8A;font-weight:800;padding:0 12px;font-size:14px}',
 '.qa.ar90i{min-height:84px!important;border:3px solid #1E3A8A!important;background:color-mix(in srgb,#1E3A8A 8%,var(--surface))!important}',
 '.veh90oc{display:flex;align-items:center;gap:10px;padding:10px 12px;border-radius:14px;border:1.5px dashed var(--line);opacity:.75;margin-top:6px;font-size:15px}'].join('\n');document.head.appendChild(st)})();

/* ---------- 85 · la foto en grande, encima de todo ---------- */
/* fotoAbrir: pasó a tema-vehiculos.js */

/* ---------- 86 · le quitan un cliente al chofer que va en ruta ---------- */
function vivos90(){return (S.stops||[]).filter(function(s){return s&&!s.done}).map(function(s){return +s.c})}
function quien90(cid){try{var o=ovDe81(hoy81(),cid);if(o===0)return 'hoy no se visita';if(o!=null)return +o===ADM85?'lo lleva el administrador':'lo lleva '+chofN(o)}catch(e){}return 'te lo quitó el administrador'}
/* toma81: pasó a tema-reparte.js */
function av90HTML(){var a=S.av90;if(!a||S.role!=='rep'||a.f!==hoy81())return '';
 return '<div id="av90" role="dialog" aria-label="Cambió tu ruta"><div class="w"><div style="font-size:46px;text-align:center">⚠️</div><h2>'+(a.L.length===1?'Ya no vayas con '+esc(a.L[0].n):'Te quitaron '+a.L.length+' clientes')+'</h2>'
  +a.L.map(function(x){return '<div class="q"><b>'+esc(x.n)+'</b> · '+esc(x.q)+'</div>'}).join('')
  +(a.ent?'<div class="lbl" style="margin-top:8px;font-size:15px">Estabas en su entrega: se canceló, no se guardó nada.</div>':'')
  +'<div class="sig">'+(a.sig?'Tu siguiente parada '+(a.era?'<b>ahora</b> ':'')+'es <b>'+esc(a.sig)+'</b>':'Ya no te quedan clientes por visitar')+'</div>'
  +'<button class="btn big" style="width:100%;margin-top:16px;min-height:58px" data-act="av90x" aria-label="Cerrar">Entendido</button></div></div>'}
window.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act="av90x"]');if(!b)return;e.preventDefault();e.stopImmediatePropagation();S.av90=null;S.tab.rep='ruta';render();window.scrollTo(0,0)},true);

/* ---------- 88 · el administrador que reparte ---------- */
function admRuta90(){return MODO==='vacio'&&typeof admRep85==='function'&&admRep85()}
/* los cambios de Rutas también llegan a su ruta guardada (cuando está en modo administrador) */
function arStToma90(){if(S.role!=='admin'||!S.arSt||S.arOn)return;var f=hoy81(),o=(S.rq81||{})[f];if(!o)return;var st=S.arSt.stops=S.arSt.stops||[];
 Object.keys(o).forEach(function(k){var x=o[k];if(!x||x.hecho||+x.ch!==ADM85)return;if(x.op==='add'){if(!st.some(function(s){return +s.c===+x.c&&!s.done}))st.push({c:+x.c,mv81:1})}else{for(var i=0;i<st.length;i++)if(+st[i].c===+x.c&&!st[i].done){st.splice(i,1);break}}x.hecho=1})}
/* "Mi ruta de hoy" cuenta sus clientes al momento (antes, hasta que entraba) */
function arCuenta90(){if(S.role!=='admin'||!admRuta90()||S.arSt||S.arOn)return;try{S.arStops=lista81(ADM85,hoy81()).L.filter(function(x){return !x.done}).map(function(x){return x.c})}catch(e){}}
/* si ya dijo "Sí, hoy reparto", no se le vuelve a preguntar */
window.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act="arentrar"]');if(!b||b.dataset.ok||!admRuta90()||S.arSt)return;b.dataset.ok='1'},true);
/* Inicio: "Mi ruta de hoy" arriba y grande */
function arArriba90(){if(S.role!=='admin'||S.tab.admin!=='inicio')return;var m=document.querySelector('main');if(!m)return;var b=m.querySelector('[data-act="arentrar"]');if(!b||b.dataset.v90)return;b.dataset.v90='1';b.classList.add('ar90i');
 var ref=m.querySelector('[data-x="adm85"]');if(ref)ref.after(b);else m.prepend(b)}
/* barra fija para regresar */
arBanner=function(){return '<div class="ar90b" data-x="ar90b"><span style="flex:1;min-width:0"><b>🚚 Estás repartiendo</b><br><span class="lbl">Revisión, fotos y odómetro son opcionales para ti</span></span><button data-act="arsalir">← Volver a administrador</button></div>'};
/* 90 · textos que eran para el chofer */
var AR90=[[/Enviar cierre al administrador/g,'Cerrar mi ruta'],[/Cierre enviado al administrador/g,'Ruta cerrada'],[/Entregar al administrador/g,'Pasar a la caja'],[/en efectivo al administrador/g,'en efectivo a la caja'],
 [/Listo, se le mandó al administrador/g,'Listo: tu ruta quedó cerrada'],[/Efectivo a entregar/g,'Efectivo de tu ruta'],[/Debes entregar/g,'Va a la caja'],[/[Ee]ntrégale(lo)? al administrador/g,'pásalo a la caja'],[/^al administrador$/,'a la caja'],[/Al administrador le llega aviso\./g,'Queda anotado.'],[/el administrador te lo puede reabrir/g,'lo puedes reabrir desde Inicio'],[/¿Cuánto entregas\?/g,'¿Cuánto pasas a la caja?']];
function arTxt90(t){AR90.forEach(function(x){t=t.replace(x[0],x[1])});return t}
function arLimpia90(){if(!(S.arOn&&S.role==='rep'))return;var m=document.querySelector('main');if(!m)return;
 [].slice.call(m.querySelectorAll('*')).forEach(function(e){if(!e.isConnected||e.children.length>3)return;var t=(e.textContent||'').trim();
  if(/^Mientras trabajas, el administrador ve tu ubicación\.?$/.test(t)||/^¿No eres .*\?$/.test(t)){var c=e.closest('.card')&&e.closest('.card').textContent.trim()===t?e.closest('.card'):e;if(c!==m)c.remove()}});
 var h=m.querySelector('.hola89');if(h){var s=h.querySelector('span');if(s)s.textContent='· estás repartiendo como administrador'}
 var ap=m.querySelector('.card.aprende');if(ap)ap.remove();
 var w=document.createTreeWalker(m,NodeFilter.SHOW_TEXT,null),n,L=[];while((n=w.nextNode()))if(/administrador|entregar|entregas\?/.test(n.nodeValue))L.push(n);L.forEach(function(x){x.nodeValue=arTxt90(x.nodeValue)});
 [].slice.call(m.querySelectorAll('button,input[type="button"]')).forEach(function(b){if(b.value&&/administrador/.test(b.value))b.value=arTxt90(b.value)})}
var _toast90=toast;toast=function(t){try{if(S.arOn&&S.role==='rep'&&typeof t==='string')t=arTxt90(t)}catch(e){}return _toast90.apply(this,[t].concat([].slice.call(arguments,1)))};

/* ---------- 87 · tutorial del administrador que reparte ---------- */
TUT.ar90=[['[data-x="ar90b"]','Estás repartiendo','Esta barra te dice que estás en tu ruta. Con "Volver a administrador" regresas a tus cosas cuando quieras; tu ruta se queda guardada.'],
 ['[data-act="iniciar"], .card.next, main .card','Empieza','Toca "Iniciar ruta". Para ti la revisión del vehículo, las fotos y el odómetro son opcionales.'],
 ['nav.tabs, main','Entregar y cerrar','Entrega a cada cliente con "Entregar". Abajo tienes Entrega, Gasto y Cierre. Al cerrar, el efectivo de tu ruta va directo a la caja: no se lo entregas a nadie.']];
function arTut90(){if(!(S.arOn&&S.role==='rep')||!S.tut)return;var k=String(S.tut.k||'');if(k==='ar90'||!/^(rep$|d:rep:|n:rt81rep)/.test(k))return;S.tutVisto=S.tutVisto||{};S.tutVisto[k]=true;
 if(S.tutVisto.ar90){S.tut=null;return}S.tutVisto.ar90=true;S.tut={k:'ar90',i:0,prev:S.tut.prev,tab:S.tut.tab}}

/* ---------- 89 · un vehículo que ya salió con otro, no se puede escoger ---------- */
function vehUso90(vid,ch){var hoy=iso(TODAY),r=null;var mira=function(id,v,s,ci,d){if(r!=null||+id===+ch)return;if(v!=null&&+v===+vid&&s&&s.ok&&!(ci&&ci.sent)&&(!d||d===hoy))r=+id};
 try{nbRutaIds().forEach(function(id){mira(id,nbRGet(id,'vehHoy'),nbRGet(id,'salida'),nbRGet(id,'cierre'),nbRGet(id,'rutaDia80'))})}catch(e){}
 try{var A=S.arOn?null:S.arSt;if(A)mira(ADM85,A.vehHoy,A.salida,A.cierre,A.rutaDia80)}catch(e){}
 try{var B=S.arOn?S.arSaved:null;if(B&&B.chofHoy!=null)mira(B.chofHoy,B.vehHoy,B.salida,B.cierre,B.rutaDia80)}catch(e){}
 try{(S.vws||[]).forEach(function(w){if(r==null&&w&&+w.veh===+vid&&w.started&&w.k!=='done'&&!w.fin&&+w.ch!==+ch)r=w.ch!=null?+w.ch:-1})}catch(e){}return r}
/* 89b · los vehículos que se dieron de alta en "Para empezar" quedaban TODOS con el mismo número interno (id 1): para la app eran
   el mismo vehículo (dos personas podían traer "el mismo" y se mezclaban los kilómetros). Las altas nuevas ya salen con número propio,
   y los que ya estaban repetidos se renumeran solos (el primero se queda con el número; lo de antes se queda con él). */
function vehIds90(){var V=S.veh;if(!Array.isArray(V)||V.length<2)return 0;var vis={},mx=V.reduce(function(m,v){return Math.max(m,num(v&&v.id))},0),n=0,L=[];
 V.forEach(function(v){if(!v)return;if(vis[v.id]){v.id=++mx;n++;L.push(v.n)}vis[v.id]=1});
 if(n){try{S.hist.push({t:fmtF(iso(TODAY))+' '+hhmm(),q:'App',x:'Se arregló el número interno de '+L.join(', ')+' (estaba repetido)'})}catch(e){}
  try{var t='Se arregló: '+L.join(', ')+' tenía'+(n===1?'':'n')+' el mismo número interno que otro vehículo y la app los confundía. Revisa en Vehículos el odómetro de cada uno.';if((S.avPrecio=S.avPrecio||[]).indexOf(t)<0)S.avPrecio.push(t)}catch(e){}}return n}
var _suA90=suAplicar;suAplicar=function(){var r=_suA90.apply(this,arguments);try{var V=S.veh||[],vis={},mx=0;V.forEach(function(v,i){if(vis[v.id]||!(v.id>0))v.id=Math.max(mx,0)+1;vis[v.id]=1;mx=Math.max(mx,v.id)});if(V[0])S.vehHoy=V[0].id}catch(e){}return r};
/* vehLibres: pasó a tema-vehiculos.js */
function quienVeh90(q){return q===-1?'un viaje de carga':(+q===ADM85?'el administrador':chofN(q))}
/* si el que tiene puesto ya lo trae otro, se le cambia solo a uno libre (antes de salir) */
function vehAuto90(){if(S.role!=='rep'||S.chofHoy==null||(S.salida&&S.salida.ok)||S.vehHoy==null)return;var q=vehUso90(S.vehHoy,+S.chofHoy);if(q==null)return;var v0=vehHoy(),L=vehLibres(+S.chofHoy);if(!L.length){S.vh90='Todos los vehículos están ocupados: '+(v0?v0.n:'')+' lo trae '+quienVeh90(q)+'.';return}
 S.vehHoy=L[0].id;var v1=vehHoy();if(S.cierre){S.cierre.odoIni=v1.odo;S.cierre.odo=v1.odo}S.inspR=null;S.vh90=(v0?v0.n:'Tu vehículo')+' lo trae '+quienVeh90(q)+': te tocó '+v1.n+'.'}
/* en la revisión, los ocupados no se pueden escoger */
function vehSel90(){if(S.role!=='rep')return;[].slice.call(document.querySelectorAll('select[id^="iv"]')).forEach(function(sel){[].slice.call(sel.options).forEach(function(o){var q=o.value?vehUso90(+o.value,+S.chofHoy):null;if(q!=null&&!o.disabled){o.disabled=true;o.textContent+=' (ocupado: '+quienVeh90(q)+')'}})})}
function vehOcupados90(){if(S.role!=='rep'||S.tab.rep!=='ruta'||(S.salida&&S.salida.ok))return;var m=document.querySelector('main');if(!m||m.querySelector('[data-x="veh90"]'))return;var ch=+S.chofHoy;
 var L=(typeof vehAct==='function'?vehAct():[]).filter(function(v){return !v.fuera&&!v.noRuta&&vehUso90(v.id,ch)!=null});if(!L.length&&!S.vh90)return;
 var ref=m.querySelector('[data-act="vehpick"]');ref=ref?ref.parentElement:m.querySelector('.vcard.vchof');var d=document.createElement('div');d.dataset.x='veh90';
 d.innerHTML=L.map(function(v){var q=vehUso90(v.id,ch);return '<div class="veh90oc">🔒 <span><b>'+esc(v.n)+'</b> · ocupado: lo trae '+esc(quienVeh90(q))+'</span></div>'}).join('')+(S.vh90?'<div class="lbl" style="margin-top:6px;font-weight:700">'+esc(S.vh90)+'</div>':'');
 if(ref)ref.after(d);else{var h=m.querySelector('.hello, .hola89');if(h)h.after(d)}}
/* por si ya lo tenía escogido y otro salió primero: no lo deja iniciar con él */
window.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act="iniciar"]');if(!b||S.role!=='rep'||S.vehHoy==null)return;var q=vehUso90(S.vehHoy,+S.chofHoy);if(q==null)return;
 e.preventDefault();e.stopImmediatePropagation();var v=vehHoy();toast((v?v.n:'Ese vehículo')+' está ocupado: lo trae '+(q===-1?'un viaje de carga':(+q===ADM85?'el administrador':chofN(q)))+'. Escoge otro.');var L=vehLibres(+S.chofHoy);if(L.length){S.vehHoy=L[0].id;var v1=vehHoy();S.cierre.odoIni=v1.odo;S.cierre.odo=v1.odo}render()},true);

var _rd90=render;render=function(){try{vehIds90();vehAuto90();arStToma90();arCuenta90();arTut90()}catch(e){console.error('l90',e)}var r=_rd90.apply(this,arguments);
 try{arArriba90();arLimpia90();vehOcupados90();vehSel90();ovPon70('av90',av90HTML())}catch(e){console.error('l90b',e)}return r};
/* ---------- versión: la del APK (1.0.N), leída del celular; si no se puede, la de la app ---------- */
(function(){try{var A=window.Capacitor&&window.Capacitor.Plugins&&window.Capacitor.Plugins.App;if(!A||!A.getInfo)return;A.getInfo().then(function(i){if(i&&i.version){APP_VER=String(i.version);try{render()}catch(e){}}},function(){})}catch(e){}})();
