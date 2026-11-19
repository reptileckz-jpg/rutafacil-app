/* ===================== v7.2 · parte 3: avisos
   16 ubicación: una tarjeta por celular que se actualiza y se quita sola · sin coordenadas ni [tel:] a la vista
   17 "Atender" lleva a donde se resuelve · 20 "no coincide" abre la tarjeta del faltante y se quita si ya se decidió
   21 avisos = solo lo que pide hacer algo; lo demás va a la actividad del día y al resumen en la recepción del cierre
   22 "Hoy te toca": ningún renglón se queda sin hacer nada · 25 numerito en la barra de abajo (solo uno parpadea)
   28 avisos del chofer: sin repetidos ===================== */
(function(){var st=document.createElement('style');st.textContent=[
 'nav.tabs button{position:relative}nav.tabs .tbadge{position:absolute;top:2px;right:calc(50% - 26px);min-width:20px;height:20px;border-radius:10px;background:var(--danger,#C0392B);color:#fff;font-size:12px;font-weight:900;line-height:20px;padding:0 5px;font-style:normal}',
 'nav.tabs .tbadge.suave{background:var(--muted,#777)}nav.tabs .tbadge.blink{animation:tbBlink 1.1s ease-in-out infinite}@keyframes tbBlink{50%{transform:scale(1.25);box-shadow:0 0 0 4px rgba(192,57,43,.25)}}',
 '@media (prefers-reduced-motion:reduce){nav.tabs .tbadge.blink{animation:none}}',
 '#faov{position:fixed;inset:0;z-index:93;background:var(--bg);overflow:auto;padding:calc(14px + var(--sbar,0px)) 16px 24px;display:flex;flex-direction:column;gap:10px}#faov .q{font-size:24px;font-weight:900}#faov .btn{min-height:58px;font-size:18px}',
 '.actl{font-size:14px;border-top:1px solid var(--line);padding:6px 0}.actl .lbl{margin-right:6px}'].join('\n');document.head.appendChild(st)})();

/* ---------- marcas escondidas en el texto de los avisos ---------- */
function avLimpio(x){return String(x||'').replace(/\s*\[(tel|geo|gps|gpsev|pin):[^\]]*\]/g,'')}
/* avRow: pasó a tema-avisos.js */
/* natNotif: pasó a tema-piezas.js */

/* ---------- actividad del día (lo que pasó, sin ser aviso) ---------- */
try{if(typeof NB_SH!=='undefined'&&NB_SH.indexOf('actDia')<0)NB_SH.push('actDia')}catch(e){}
function actAdd(ch,x,f,h){S.actDia=S.actDia||[];var d=f||iso(TODAY),hh=h||hhmm();if(S.actDia.some(function(a){return a.f===d&&a.x===x}))return;S.actDia.push({f:d,h:hh,ch:ch==null?null:+ch,x:avLimpio(x)});
 if(S.actDia.length>1500){var lim=iso(new Date(TODAY.getTime()-60*864e5));S.actDia=S.actDia.filter(function(a){return a.f>=lim})}}
function actDe(ch,f){return (S.actDia||[]).filter(function(a){return a.f===f&&(ch==null||+a.ch===+ch)})}
/* lo que solo informa (no pide hacer nada): sale de Avisos y se va a la actividad */
var AV_ACT=/registró un gasto: |cargó \d+ cajas y .* más en bodega|registró un cliente nuevo|dio de alta un cliente nuevo|Cliente nuevo por pedido|guardó la ubicación de|corrigió la entrega de|canceló la entrega de|cambió fruta en mal estado|anuló |reabrió su ruta con tu permiso|reabrió su ruta para|reabrió su cierre para seguir|empezó un segundo cierre|está ayudando con|hizo el encargo|salió rumbo a|va de regreso a bodega|cargado en |Viaje asignado a|le pagó |metió .* a la tómbola|apoya hoy a|terminó y puede apoyar|regresa a la bodega a cargar|registró un pedido para|salió al viaje con|registró un proveedor nuevo: [^(]*$|registró una báscula nueva: [^.]*$|lleva \d+ cajas vacías|canceló el viaje a|recibió .* en ma|entregó .* bien/;
function avEsAct(x){return !/^URGENTE/.test(x)&&AV_ACT.test(x)}
function avOrdena(){if(!S.avPrecio||!S.avPrecio.length)return false;var cam=false,vistos={},L=[];
 S.avPrecio.forEach(function(x){if(typeof x!=='string'){L.push(x);return}
  if(vistos[x]){cam=true;return}vistos[x]=1;
  if(avEsAct(x)){var c=null;try{c=avChofDe(x)}catch(e){}actAdd(c?c.id:null,x);cam=true;return}
  L.push(x)});
 if(cam)S.avPrecio=L;return cam}

/* ---------- 16 · ubicación: una tarjeta por celular ---------- */
function gpsQuita(marca){var i=-1;(S.avPrecio||[]).forEach(function(x,j){if(typeof x==='string'&&x.indexOf(marca)>-1)i=j});if(i<0)return false;S.avPrecio=S.avPrecio.filter(function(x){return !(typeof x==='string'&&x.indexOf(marca)>-1)});return true}
function gpsPon(marca,txt){var L=S.avPrecio=S.avPrecio||[],i=-1;L.forEach(function(x,j){if(typeof x==='string'&&x.indexOf(marca)>-1)i=j});var t=txt+' '+marca;
 if(i>-1){if(L[i]===t)return false;L[i]=t;S.avPrecio=L.filter(function(x,j){return j===i||!(typeof x==='string'&&x.indexOf(marca)>-1)});return true}L.push(t);return true}
function gpsHist(ch,x){try{S.hist.push({t:fmtF(iso(TODAY))+' '+hhmm(),q:'Celular',x:x})}catch(e){}actAdd(ch,x)}
var _gpsMig60=false;
gpsAlertas=function(){if(S.role!=='admin')return;var A=S.gpsAv=S.gpsAv||{},ahora=Date.now(),M=gpsCfgMin(),cam=false;
 /* una sola vez: quitar las tarjetas repetidas de antes (se vuelven a hacer una por celular) */
 if(!_gpsMig60&&GPS.w&&Object.keys(GPS.devs).length){_gpsMig60=true;var n0=(S.avPrecio||[]).length;S.avPrecio=(S.avPrecio||[]).filter(function(x){if(typeof x!=='string')return true;if(/\[gps(ev)?:/.test(x))return true;
   if(/El celular de .* no manda su ubicación/.test(x))return false;for(var k in GPS_EV){if(x.indexOf(' '+GPS_EV[k]+' (')>-1&&/^URGENTE/.test(x))return false}return true});if(S.avPrecio.length!==n0)cam=true}
 Object.keys(GPS.devs).forEach(function(dev){var d=GPS.devs[dev],u=gpsUlt(d),ch=d.ch,nm=d.ch?chofN(+d.ch):(d.nom||'Un celular'),ult=Math.max(num(d.hb),num(u.t)),min=ult?Math.round((ahora-ult)/60000):0,tel=chTel(ch);
  var donde=u.lat!=null?' [geo:'+u.lat+','+u.lng+']':'',bat=num(d.bat)>=0&&d.bat!=null?' · batería '+d.bat+'%':'',mk='[gps:'+dev+']',k0=dev+'|sin';
  if(ult&&min>=M.a){var urg=min>=M.b;if(!A[k0])A[k0]=ult;
   if(gpsPon(mk,(urg?'URGENTE: ':'')+'El celular de '+nm+' no manda su ubicación desde hace '+minTxt(min*60000)+' (última: '+hmDe(ult)+bat+')'+donde+(tel?' [tel:'+tel+']':'')))cam=true}
  else if(A[k0]){var t0=A[k0];delete A[k0];if(gpsQuita(mk))cam=true;cam=true;if(ult)gpsHist(ch,'Celular de '+nm+' estuvo sin señal de '+hmDe(t0)+' a '+hmDe(ult)+' ('+minTxt(ult-t0)+')')}
  else if(gpsQuita(mk))cam=true;
  var evs=[];try{evs=JSON.parse(d.evs||'[]')}catch(e){}
  Object.keys(GPS_EV).forEach(function(tipo){if(tipo==='encendido')return;var mke='[gpsev:'+dev+':'+tipo+']',ult1=null;evs.forEach(function(v){if(v.e===tipo&&ahora-num(v.t)<=864e5&&(!ult1||num(v.t)>num(ult1.t)))ult1=v});
   if(!ult1){if(gpsQuita(mke))cam=true;return}
   /* ¿ya se arregló? apagado → prendió después · lo demás → volvió a mandar ubicación después */
   var fin=null;if(tipo==='apagado')evs.forEach(function(v){if(v.e==='encendido'&&num(v.t)>num(ult1.t)&&(!fin||num(v.t)<fin))fin=num(v.t)});else if(num(u.t)>num(ult1.t)+60000&&min<M.a)fin=num(u.t);
   var kh=dev+'|h|'+tipo+'|'+ult1.t;
   if(fin){if(gpsQuita(mke))cam=true;if(!A[kh]){A[kh]=ahora;cam=true;gpsHist(ch,tipo==='apagado'?'El celular de '+nm+' se apagó de '+hmDe(ult1.t)+' a '+hmDe(fin)+' ('+minTxt(fin-num(ult1.t))+')':nm+' '+GPS_EV[tipo]+' a las '+hmDe(ult1.t)+'; se arregló a las '+hmDe(fin))}return}
   if(gpsPon(mke,'URGENTE: '+nm+' '+GPS_EV[tipo]+' ('+hmDe(ult1.t)+bat+')'+donde+(tel?' [tel:'+tel+']':'')))cam=true})});
 Object.keys(A).forEach(function(k){if(/\|sin$/.test(k))return;if(ahora-A[k]>3*864e5){delete A[k];cam=true}});if(cam)render()};

/* ---------- 17 · las tarjetas URGENTE: sin coordenadas ni teléfono a la vista; con Llamar / Ver dónde; "Atender" lleva a donde se resuelve ---------- */
/* popItems: pasó a tema-inicio.js */
document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act="avgeo"],[data-act="avtel"]');if(!b)return;e.stopImmediatePropagation();
 var u=b.dataset.act==='avtel'?'tel:'+b.dataset.tel:'https://www.google.com/maps?q='+b.dataset.lat+','+b.dataset.lng;try{if(b.dataset.act==='avtel')location.href=u;else window.open(u,'_blank')}catch(er){}},true);
/* a dónde lleva cada aviso */
/* avDestino: pasó a tema-avisos.js */

/* ---------- 20 · "el efectivo no coincide": tarjeta de pantalla completa del faltante ---------- */
function faChof(x){var c=null;try{c=avChofDe(x)}catch(e){}return c}
function faDe(ch){var lim=iso(new Date(TODAY.getTime()-3*864e5));var L=(S.faltantes||[]).map(function(f,i){return {f:f,i:i}}).filter(function(o){return +o.f.ch===+ch&&(o.f.fecha||'')>=lim});L.sort(function(a,b){return (b.f.fecha||'').localeCompare(a.f.fecha||'')});return L}
function faDecidido(f){return !!(f.desc||f.absorbe||f.pagado||f.pend===false)}
function faTxt(f){return f.pagado?'ya lo pagó':(f.absorbe?'no se le descuenta (lo absorbe el negocio)':(f.desc?'se le descuenta de su pago':'ya está resuelto'))}
function faovHTML(){var o=S.faov;if(!o||S.role!=='admin')return '';var x=o.x,c=faChof(x),nm=c?esc(chofN(c.id)):'el chofer',m1=/él dijo (\$[\d,.]+)/.exec(x),m2=/se contaron (\$[\d,.]+)/.exec(x),L=c?faDe(c.id):[],pend=L.filter(function(z){return !faDecidido(z.f)})[0],h;
 h='<div style="display:flex;align-items:center;gap:10px"><span class="grow"><b style="font-size:18px">Efectivo de '+nm+'</b></span><button class="helpb" style="margin:0" data-act="fax" aria-label="Cerrar">×</button></div>'
  +'<div class="card">'+(m1?rw('Él dijo que entregaba',esc(m1[1])):'')+(m2?rw('Se contaron',esc(m2[1])):'')+(pend?rw('Le falta',money(num(pend.f.m)),'neg'):'')+'</div>';
 if(o.conf){var tx={desc:'Se le descuenta '+money(num(pend&&pend.f.m))+' de su pago.',pago:'Se anota que ya pagó '+money(num(pend&&pend.f.m))+' (entra a la caja).',nodesc:'No se le descuenta: lo absorbe el negocio.'}[o.conf];
  return '<div id="faov" role="dialog" aria-label="Faltante">'+h+'<div class="q">¿Seguro?</div><div class="card">'+tx+'</div><button class="btn big" data-act="fasi">Sí</button><button class="btn sec big" data-act="fareg">Regresar</button></div>'}
 if(pend)h+='<div class="q">Faltan '+money(num(pend.f.m))+'</div><div class="lbl">¿Qué hacemos con lo que falta?</div><button class="btn big" data-act="fadec" data-o="desc">Descontárselo de su pago</button><button class="btn sec big" data-act="fadec" data-o="pago">Ya lo pagó</button><button class="btn sec big" data-act="fadec" data-o="nodesc">No descontar</button>';
 else if(L.length)h+='<div class="card good"><b>Ya se decidió</b><div>'+esc(faTxt(L[0].f))+'.</div></div><button class="btn big" data-act="faok">Entendido</button>';
 else h+='<div class="card good"><b>El efectivo sí cuadra</b><div class="lbl">Lo que se contó es lo que debía entregar; solo él contó diferente.</div></div><button class="btn big" data-act="faok">Entendido</button>';
 return '<div id="faov" role="dialog" aria-label="Faltante">'+h+'</div>'}
function faQuitaAv(x,linea){S.avPrecio=(S.avPrecio||[]).filter(function(y){return y!==x});var c=faChof(x);if(linea)actAdd(c?c.id:null,linea)}
document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act^="fa"]');if(!b||!S.faov)return;var a=b.dataset.act;if(!/^(fax|fadec|fasi|fareg|faok)$/.test(a))return;e.stopImmediatePropagation();var o=S.faov;
 if(a==='fax'){S.faov=null;render();return}if(a==='fareg'){o.conf=null;render();return}if(a==='fadec'){o.conf=b.dataset.o;render();return}
 if(a==='faok'){faQuitaAv(o.x,avLimpio(o.x).replace(/^URGENTE: /,''));S.faov=null;render();return}
 if(a==='fasi'){var c=faChof(o.x),L=c?faDe(c.id):[],p=L.filter(function(z){return !faDecidido(z.f)})[0];if(p){var f=p.f,m=num(f.m);
   if(o.conf==='desc'){f.desc=true}else if(o.conf==='pago'){f.desc=false;f.pend=false;f.pagado=iso(TODAY);(S.aportes=S.aportes||[]).push({t:'Faltante pagado',de:chofN(c.id),f:iso(TODAY),m:m,n:'Pagó su faltante del cierre',tipo:'faltante'})}else if(o.conf==='nodesc'){f.desc=false;f.absorbe=true}
   S.hist.push({t:fmtF(iso(TODAY))+' '+hhmm(),q:quien(),x:'Faltante de '+chofN(c.id)+' ('+money(m)+'): '+faTxt(f)})}
  faQuitaAv(o.x,c?'Faltante de '+chofN(c.id)+': '+(p?faTxt(p.f):'resuelto'):null);S.faov=null;toast('✓ Listo');render();return}},true);
/* si ya se decidió al recibir el cierre, el aviso se quita solo */
function faLimpia(){var cam=false;(S.avPrecio||[]).slice().forEach(function(x){if(typeof x!=='string'||!/el efectivo de .* no coincide/.test(x))return;var c=faChof(x);if(!c)return;var L=faDe(c.id);
  if(!L.some(function(z){return !faDecidido(z.f)})){faQuitaAv(x,avLimpio(x).replace(/^URGENTE: /,'')+(L.length?' · '+faTxt(L[0].f):''));cam=true}});return cam}

/* ---------- 21 · Avisos: "Por atender" arriba e "Informativos" plegados ---------- */
function actGrupos(f){var G={};actDe(null,f).forEach(function(a){var k=a.ch!=null?chofN(a.ch):'Otros';(G[k]=G[k]||[]).push(a)});return G}
function actResumen(L){var c={g:0,cn:0,rc:0,ca:0,co:0,ot:0};L.forEach(function(a){var x=a.x;if(/registró un gasto/.test(x))c.g++;else if(/cliente nuevo|Cliente nuevo/.test(x))c.cn++;else if(/cargó \d+ cajas/.test(x)||/regresa a la bodega a cargar/.test(x))c.ca++;else if(/reabrió/.test(x))c.rc++;else if(/corrigió|canceló la entrega|anuló|cambió fruta/.test(x))c.co++;else c.ot++});
 var p=[];if(c.g)p.push(c.g+' gasto'+(c.g>1?'s':''));if(c.cn)p.push(c.cn+' cliente'+(c.cn>1?'s':'')+' nuevo'+(c.cn>1?'s':''));if(c.ca)p.push('volvió a cargar'+(c.ca>1?' '+c.ca+' veces':''));if(c.rc)p.push('reabrió '+c.rc+' vez'+(c.rc>1?'es':''));if(c.co)p.push(c.co+' cambio'+(c.co>1?'s':''));if(c.ot)p.push(c.ot+' más');return p.join(', ')}
function actDiaHTML(f,ch,tit){var L=actDe(ch,f);if(!L.length)return '';return '<div style="margin-top:8px"><b>'+(tit||'Lo que pasó')+'</b>'+L.map(function(a){return '<div class="actl"><span class="lbl">'+esc(a.h)+'</span>'+esc(typeof avYo==='function'?avYo(a.x):a.x)+'</div>'}).join('')+'</div>'}
/* avisosHTML: pasó a tema-avisos.js */
document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act="avvisto"]');if(!b)return;e.stopImmediatePropagation();var hoy=iso(TODAY);S.actVisto=S.actVisto||{};S.actVisto[hoy]=actDe(null,hoy).length;
 S.avPrecio=(S.avPrecio||[]).filter(function(x){return typeof x!=='string'||AV_URG.test(x)||!AV_INFO.test(x)});toast('Listo');render()},true);
/* recepción del cierre: "Lo que pasó hoy en su ruta" antes de confirmar el efectivo */
/* rcHTML: pasó a tema-sueltas.js */
/* ficha del chofer → Ruta y metas: lo que pasó ese día */
/* gpsRutaHTML: pasó a tema-ubica.js */

/* ---------- 28 · avisos del chofer: sin repetidos (y lo que se canceló, se quita) ---------- */
function chAvLimpia(){var R=S.rutaAv;if(!R)return false;var cam=false;Object.keys(R).forEach(function(ch){var L=R[ch];if(!L||!L.length)return;var out=[],vis={};
 L.forEach(function(x){if(vis[x]){cam=true;return}vis[x]=1;var q=/^Se quitó (.*) de mañana$/.exec(x),v=/^Se regresó (.*) a mañana$/.exec(x);
  if(v){var j=out.indexOf('Se quitó '+v[1]+' de mañana');if(j>-1){out.splice(j,1);cam=true;return}}if(q){var k=out.indexOf('Se regresó '+q[1]+' a mañana');if(k>-1){out.splice(k,1);cam=true;return}}out.push(x)});
 if(out.length!==L.length)R[ch]=out});return cam}

/* ---------- se ordena todo antes de dibujar ---------- */
/* lo informativo se pasa a la actividad un momento después (algunas partes le agregan el motivo al aviso justo después de crearlo) */
var _avOrdT=0;function avOrdenaLuego(){if(_avOrdT)return;if(!(S.avPrecio||[]).some(function(x){return typeof x==='string'&&avEsAct(x)}))return;_avOrdT=setTimeout(function(){_avOrdT=0;try{if(avOrdena())render()}catch(e){}},1200)}
/* avisos: pasó a tema-avisos.js */
var _rd60a=render;render=function(){try{avOrdenaLuego();faLimpia();chAvLimpia()}catch(e){console.error(e)}var r=_rd60a.apply(this,arguments);
 try{var fo=document.getElementById('faov');if(fo)fo.remove();var fh=faovHTML();if(fh){var w=document.createElement('div');w.innerHTML=fh;document.body.appendChild(w.firstElementChild)}}catch(e){console.error(e)}
 try{tabBadges()}catch(e){console.error(e)}return r};

/* ---------- 22 · "Hoy te toca": cada renglón hace algo o dice por qué todavía no ---------- */
function cierresHoy(){var ids=nbRutaIdsSeguro(),L=[];ids.forEach(function(id){var sa=nbRGet(id,'salida'),ci=nbRGet(id,'cierre'),rg=nbRGet(id,'cierreReg'),rc=nbRGet(id,'recep');if(!(sa&&sa.ok)&&!(ci&&ci.sent))return;
 L.push({id:+id,n:chofN(+id),env:!!(ci&&ci.sent),rec:!!(rg&&rc)})});return L}
/* hoyItems: pasó a tema-guia.js */
window.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act="hoyir"]');if(!b)return;var x=hoyItems()[+b.dataset.i];if(!x||!x[4])return;e.preventDefault();e.stopImmediatePropagation();
 var C=cierresHoy();
 if(x[4]==='cierres'){var pr=C.filter(function(z){return z.env&&!z.rec})[0];
  if(pr){if(+S.chofHoy!==pr.id)try{chCambiar(pr.id)}catch(er){}S.tab.admin='cierreadm';render();window.scrollTo(0,0);setTimeout(function(){try{guiaMuestra('[data-act="rcabre"], [data-act="vercierre"], main .card')}catch(er){}},80);return}
  if(!C.length){toast('Hoy no ha salido ningún chofer. Cuando alguien mande su cierre, te aviso.');return}
  var ya=C.filter(function(z){return z.rec}).length;if(ya===C.length){toast('Ya recibiste todos los cierres de hoy ✓');return}
  toast('Aún no hay cierres por recibir. Faltan: '+C.filter(function(z){return !z.env}).map(function(z){return z.n}).join(', ')+'. Te aviso cuando manden el suyo.');return}
 if(x[4]==='resumen'){var f=C.filter(function(z){return !z.rec});if(f.length){toast('El resumen se manda cuando recibas los cierres del día (faltan '+f.length+': '+f.map(function(z){return z.n}).join(', ')+')');return}
  S.resHoy=iso(TODAY);var t=document.createElement('button');t.dataset.act='resdia';t.style.display='none';document.body.appendChild(t);try{t.click()}finally{t.remove()}render();return}},true);
/* "Muéstrame dónde" / Hoy te toca: si lo que hay que tocar todavía no está, decirlo */
/* guiaMuestra: pasó a tema-guia.js */

/* ---------- 25 · numerito en la barra de abajo por sección (solo parpadea el más importante) ---------- */
/* calcular a dónde lleva un aviso SIN cambiar nada de la pantalla (avDestino a veces abre fichas o secciones) */
function avSinEfecto(fn){var cc=chCambiar,prev={},obj={};Object.keys(S).forEach(function(k){prev[k]=S[k]});['fiTab','dOpen','tab'].forEach(function(k){try{obj[k]=JSON.stringify(S[k])}catch(e){}});
 chCambiar=function(){};try{return fn()}finally{chCambiar=cc;Object.keys(S).forEach(function(k){if(!(k in prev))delete S[k]});Object.keys(prev).forEach(function(k){S[k]=prev[k]});Object.keys(obj).forEach(function(k){try{if(obj[k]!==undefined)S[k]=JSON.parse(obj[k])}catch(e){}})}}
var TAB_PRIO=['inicio','cierreadm','bodega','cargas','clientes','gastos','personal','vehiculos','bienes','estadisticas'];
function tabCuenta(){var C={},U={};if(S.role!=='admin')return {C:C,U:U};avSinEfecto(function(){var av=[];try{av=avisos().filter(function(x){return !(S.avPos||{})[x]})}catch(e){}
 av.forEach(function(x){var d;try{d=avDestino(x)}catch(e){d=null}var t=(d&&d.t)||'inicio';C[t]=(C[t]||0)+1;if(AV_URG.test(x))U[t]=1})});return {C:C,U:U}}
var _tabSnap=null;
function tabBadges(){var nv=document.querySelector('nav.tabs');if(!nv)return;Array.prototype.forEach.call(nv.querySelectorAll('.tbadge'),function(b){b.remove()});if(S.role!=='admin')return;
 var R=tabCuenta();
 var enTab={};Array.prototype.forEach.call(nv.querySelectorAll('button[data-t]'),function(b){enTab[b.dataset.t]=b});var mas=enTab.mas,cuenta={},urg={};
 Object.keys(R.C).forEach(function(t){var k=enTab[t]?t:(mas?'mas':null);if(!k)return;cuenta[k]=(cuenta[k]||0)+R.C[t];if(R.U[t])urg[k]=1});
 /* el que parpadea: el primero con urgente; si no hay, el primero en orden */
 var orden=Object.keys(cuenta).sort(function(a,b){var ua=urg[a]?0:1,ub=urg[b]?0:1;if(ua!==ub)return ua-ub;var ia=TAB_PRIO.indexOf(a),ib=TAB_PRIO.indexOf(b);return (ia<0?99:ia)-(ib<0?99:ib)});
 var cur=S.tab[S.role],blink=orden.filter(function(t){return t!==cur})[0];
 orden.forEach(function(t){var b=enTab[t];if(!b||!cuenta[t])return;var i=document.createElement('i');i.className='tbadge'+(urg[t]?'':' suave')+(t===blink?' blink':'');i.textContent=cuenta[t]>9?'9+':String(cuenta[t]);i.setAttribute('aria-label',cuenta[t]+' pendientes');b.appendChild(i)})}
/* al entrar a una sección con pendientes, se resalta el primero */
document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('nav.tabs button[data-t]');if(!b||S.role!=='admin'||!b.querySelector('.tbadge'))return;var t=b.dataset.t;if(t==='mas'||t==='inicio')return;
 setTimeout(function(){try{var d=avSinEfecto(function(){var x=avisos().filter(function(y){var d=avDestino(y);return d&&d.t===t})[0];return x?avDestino(x):null});if(d&&d.sel)avFoco(d.sel);else if(d&&d.cli!=null)avFoco('[data-id="'+d.cli+'"]')}catch(er){}},120)},true);
