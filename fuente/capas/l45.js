/* ===================== v6.3 · Arreglos de la prueba en celulares (puntos 54–74) ===================== */
(function(){var st=document.createElement('style');st.textContent=[
 '.cifoto{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:8px}.cifoto figure{margin:0}.cifoto img{width:100%;aspect-ratio:4/3;object-fit:cover;border-radius:10px;border:1px solid var(--line)}.cifoto figcaption{font-size:13px;color:var(--muted);text-align:center}',
 '#fgov{position:fixed;inset:0;z-index:240;background:rgba(0,0,0,.92);display:flex;align-items:center;justify-content:center}#fgov img{max-width:100%;max-height:100%}'].join('\n');document.head.appendChild(st)})();
/* ---------- 71 · campo que falta: rojo, se sacude y vibra, cada vez ---------- */
function marcaFalta(el){if(!el)return;var c=(el.closest&&el.closest('.field'))||el;c.classList.remove('falta');void c.offsetWidth;c.classList.add('falta');try{vibrar(60)}catch(e){try{navigator.vibrate&&navigator.vibrate(60)}catch(er){}}
 try{c.scrollIntoView({block:'center',behavior:'smooth'})}catch(e){}if(el.focus&&/INPUT|SELECT|TEXTAREA/.test(el.tagName))setTimeout(function(){try{el.focus({preventScroll:true})}catch(e){}},250);setTimeout(function(){c.classList.remove('falta')},2600)}
function capaArriba(){var L=Array.prototype.slice.call(document.querySelectorAll('[role="dialog"],#fiov,#ajov')).filter(function(o){return o.getClientRects().length&&getComputedStyle(o).visibility!=='hidden'&&o.id!=='tutov'});
 L.sort(function(a,b){return (+getComputedStyle(b).zIndex||0)-(+getComputedStyle(a).zIndex||0)});return L[0]||document.querySelector('main')}
function primerVacio(){var c=capaArriba();if(!c)return null;var L=Array.prototype.slice.call(c.querySelectorAll('input:not([type=hidden]):not([type=file]):not([type=checkbox]):not([type=radio]):not([disabled]),select:not([disabled]),textarea:not([disabled])')).filter(function(i){return i.getClientRects().length&&!String(i.value||'').trim()&&!/opcional/i.test(((i.closest('.field')||{}).textContent)||'')&&!i.readOnly});return L[0]||null}
var FALTA_RE=/^(Escribe|Escoge|Elige|Pon |Pon la|Falta|Faltan|Toma la|Confirma|Di |Selecciona)/;
/* toast: pasó a tema-toast.js */
var _clk45=0;window.addEventListener('click',function(e){if(e.target.closest&&e.target.closest('[data-act]'))_clk45=Date.now()},true);
/* render: pasó a tema-dibujar1.js */
/* ---------- 54 · después de mandar el cierre, el cierre solo se ve (fotos fijas) ---------- */
function fotoMini(src,l){return src&&!/^data:x$/.test(src)?'<figure><img src="'+esc(src)+'" alt="'+esc(l)+'" data-act="fotogr" data-src="'+esc(src)+'"><figcaption>'+esc(l)+'</figcaption></figure>':'<figure><div class="lbl" style="aspect-ratio:4/3;border:1px dashed var(--line);border-radius:10px;display:flex;align-items:center;justify-content:center">Sin foto</div><figcaption>'+esc(l)+'</figcaption></figure>'}
/* cierre: pasó a tema-cierre.js */
document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act="fotogr"],#fgov');if(!b)return;e.stopImmediatePropagation();var o=document.getElementById('fgov');if(o){o.remove();return}o=document.createElement('div');o.id='fgov';o.innerHTML='<img alt="Foto" src="'+b.dataset.src+'">';document.body.appendChild(o)},true);
/* por si algo más intenta cambiar las fotos o reenviar con el cierre ya mandado */
window.addEventListener('change',function(e){var t=e.target;if(S.role==='rep'&&S.cierre&&S.cierre.sent&&t&&t.type==='file'&&t.closest&&t.closest('main')&&S.tab.rep==='cierre'){e.stopImmediatePropagation();t.value='';toast('El cierre ya se mandó; las fotos se quedan como están')}},true);
/* ---------- 58 · burbuja de datos que faltan → proveedor: abre su ficha en Datos con el campo listo ---------- */
/* dfIr: pasó a tema-piezas.js */
/* ---------- 63 · nunca "Infinity" ni "NaN" ---------- */
/* tiempoAprox: pasó a tema-piezas.js */
/* kmAprox: pasó a tema-piezas.js */
function sinRaros(root){if(!root)return;var w=document.createTreeWalker(root,NodeFilter.SHOW_TEXT,null),n,L=[];while(n=w.nextNode())if(/Infinity|NaN|undefined/.test(n.nodeValue))L.push(n);L.forEach(function(t){console.warn('texto raro:',t.nodeValue);t.nodeValue=t.nodeValue.replace(/(como )?-?Infinity( años| meses| días)?/g,'—').replace(/\$?NaN/g,'—').replace(/\bundefined\b/g,'')})}
/* render: pasó a tema-dibujar1.js */
/* ---------- 67 · el aviso del administrador dice lo que pasó ---------- */
function rutaAvTit(av){var p=(av||[]).filter(function(x){return /^Pedido para/.test(x)}).length;if(p&&p===av.length)return p>1?'Se te asignaron '+p+' entregas nuevas':'Se te asignó una nueva entrega';if(p)return 'Entregas nuevas y avisos del administrador';
 if((av||[]).some(function(x){return /te pasó|apoya/.test(x)}))return 'Te pasaron clientes para hoy';return 'Aviso del administrador'}
function avPedTxt(x){return String(x).replace(/^Pedido para (hoy|mañana): /,function(m,c){return (c==='mañana'?'Para mañana: ':'')})}
/* ---------- 65/66 · pedido asignado: le llega al chofer aunque ya haya mandado su cierre, y sabe qué cargar ---------- */
function pedPend(){var ya={};return (S.stops||[]).filter(function(s){if(s.done||ya[s.c])return false;var c=cl(s.c);if(c&&c.ped&&(c.ped.cuando||'hoy')!=='mañana'){ya[s.c]=1;return true}return false})}
function pedNecesita(){var R=0,M=0;pedPend().forEach(function(s){var c=cl(s.c);R+=num(c.ped.R);M+=num(c.ped.M)});return {R:R,M:M,trR:num(S.inv.reparto),trM:num(S.inv.repartoKg)}}
function extraSug(){var L=[];(S.rutasHist||[]).slice(-7).forEach(function(r){L=L.concat(r.log||[])});L=L.concat(S.log||[]).filter(function(l){return num(l.R)>0||num(l.M)>0});
 var pR=L.length?sum(L,function(l){return num(l.R)})/L.length:0,pM=L.length?sum(L,function(l){return num(l.M)})/L.length:0;
 return {R:Math.max(num(S.cfg.extraR!=null&&S.cfg.extraR!==''?S.cfg.extraR:3),Math.round(pR)),M:Math.max(num(S.cfg.extraM!=null&&S.cfg.extraM!==''?S.cfg.extraM:20),Math.round(pM/5)*5)}}
function pedCargaHTML(){var P=pedPend();if(!P.length)return '';var n=pedNecesita(),fR=Math.max(0,n.R-n.trR),fM=Math.max(0,n.M-n.trM),x=extraSug();
 var lista=P.map(function(s){var c=cl(s.c);return rw(esc(c.n),(num(c.ped.R)?c.ped.R+' cajas':'')+(num(c.ped.R)&&num(c.ped.M)?' · ':'')+(num(c.ped.M)?c.ped.M+' kg':''))}).join('');
 var falta=fR>0||fM>0;
 return '<div class="card alert" data-key="pedasig"><b style="font-size:19px">'+(P.length>1?'Se te asignaron '+P.length+' entregas nuevas':'Se te asignó una nueva entrega')+'</b>'+lista
  +(falta?'<div style="font-size:17px;margin-top:8px"><b>Regresa a la bodega a cargar '+(fR?fR+' cajas de roatán':'')+(fR&&fM?' y ':'')+(fM?fM+' kg de macho':'')+'</b></div><div class="lbl">Traes '+n.trR+' cajas y '+n.trM+' kg. Te sugiero llevar además '+x.R+' cajas y '+x.M+' kg por si sale otro pedido (las puedes quitar).</div>'
   +'<button class="btn" style="margin-top:8px" data-act="pedcarga" data-r="'+(fR+x.R)+'" data-m="'+(fM+x.M)+'">Ir a cargar</button>':'<div class="lbl" style="margin-top:6px">Lo que traes alcanza.</div><button class="btn" style="margin-top:8px" data-act="pedir">Ir a entregar</button>')+'</div>'}
/* ruta: pasó a tema-ruta.js */
function reabreSinPermiso(k,R,M){_seguirOk=true;var bt=document.createElement('button');bt.dataset.act='seguir';bt.dataset.k=k;bt.style.display='none';document.body.appendChild(bt);try{bt.click()}finally{bt.remove();_seguirOk=false}
 setTimeout(function(){S.reab=null;S.cierreP=0;if(k==='carga')S.cx={R:String(R||''),M:String(M||''),foto:null,k:'carga',ped:true};render()},30)}
document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act="pedcarga"],[data-act="pedir"]');if(!b)return;e.stopImmediatePropagation();var sent=S.cierre&&S.cierre.sent;
 if(b.dataset.act==='pedcarga'){if(sent)reabreSinPermiso('carga',b.dataset.r,b.dataset.m);else{S.cx={R:b.dataset.r,M:b.dataset.m,foto:null,k:'carga',ped:true};render()}S.avPrecio.push(chofN(S.chofHoy)+' regresa a la bodega a cargar para el pedido');return}
 if(sent)reabreSinPermiso('vuelta');S.tab.rep='ruta';render();window.scrollTo(0,0)},true);
/* aviso en el celular del chofer cuando le llega algo nuevo */
function natNotif(t,x){var C=window.Capacitor,n=C&&C.Plugins&&C.Plugins.RutaNativa;try{if(n&&n.notificar)n.notificar({titulo:t,texto:x});}catch(e){}try{vibrar([80,60,80])}catch(e){}}
/* render: pasó a tema-dibujar1.js */window.__ini45=Date.now();
/* Ajustes: cuánto extra sugerir */
/* ajHTML: pasó a tema-ajustes.js */
/* ---------- 68 · mover el mapa no cambia de sección ---------- */
/* swBloq: pasó a tema-navega.js */
/* render: pasó a tema-dibujar1.js */
/* ---------- 74 · nada de la demo en la app real ---------- */
function limpiaDemo(s){if(!s)return s;s.vjHist=[];s.tarasProv={};s.loteCierres=[];s.vehAsig={};s.metaMes={ven:'',gan:''};if(s.precio){s.precio.hist=[];s.precio.desde=null}if(s.vj)s.vj.fecha=iso(TODAY);if(s.an){s.an.dia=iso(TODAY);s.an.mes=iso(TODAY).slice(0,7);s.an.anio=iso(TODAY).slice(0,4)}if(s.rev)s.rev.last=null;s.limpDemo=3;return s}
if(typeof MODO!=='undefined'&&MODO==='vacio'){var _fr45=fresh;fresh=function(){return limpiaDemo(_fr45.apply(this,arguments))};limpiaDemo(S)}
/* lo que ya se subió a la nube con datos de la demo se limpia una sola vez (sin tocar lo que capturó el usuario) */
function migraDemo(){if(typeof MODO==='undefined'||MODO!=='vacio'||S.limpDemo>=3)return;if(S.limpDemo>=2){migraDemo100();S.limpDemo=3;return}var antes='2026-11-01';
 S.vjHist=(S.vjHist||[]).filter(function(v){return !(String(v.f||'')<antes&&/Freightliner M2 2015/.test(v.veh||''))});
 if(S.tarasProv&&num(S.tarasProv.Roly)===20&&!(S.cajasMov||[]).some(function(m){return /Roly/.test(JSON.stringify(m))}))delete S.tarasProv.Roly;
 S.loteCierres=(S.loteCierres||[]).filter(function(x){return String(x.fin||'')>=antes});if(S.precio)S.precio.hist=(S.precio.hist||[]).filter(function(x){return String(x.f||'')>=antes});
 if(S.metaMes&&S.metaMes.ven==='260000'&&S.metaMes.gan==='45000')S.metaMes={ven:'',gan:''};migraDemo100();S.limpDemo=3}
/* 100 · vehículos y clientes que se dieron de alta en el asistente con datos de la demo: se quitan los que son IGUALES a los de ejemplo
   (costos al año, sueldo, parte de las ventas, fecha de afinación, valor, km al mes, precio de combustible, rendimiento y capacidades); lo que el usuario cambió se queda */
function migraDemo100(){var T=[];try{T=tpl().veh||[]}catch(e){}var J=function(x){return JSON.stringify(x)};
 (S.veh||[]).forEach(function(v){if(!v)return;T.forEach(function(t){
  if(v.anual&&J(v.anual)===J(t.anual))v.anual={};
  if(t.afDue&&v.afDue===t.afDue)v.afDue='';
  ['parteVentas','sueldoMes'].forEach(function(k){if(t[k]!=null&&v[k]===t[k])delete v[k]});
  ['valor','precioC','kmMes'].forEach(function(k){if(num(t[k])&&num(v[k])===num(t[k]))v[k]=''});
  if(!(v.hist&&v.hist.length)){if(num(t.precio)&&num(v.precio)===num(t.precio))v.precio='';if(num(t.rend0)&&num(v.rend0)===num(t.rend0))v.rend0=''}
  var C=['capV','capVK','capRC','capRK','capC'];if(C.every(function(k){return num(v[k])===num(t[k])})&&C.some(function(k){return num(t[k])}))C.forEach(function(k){v[k]=''})})});
 (S.cli||[]).forEach(function(c){if(c&&c.pc===70&&c.dp==null)c.pc=null})}
['limpDemo'].forEach(function(k){if(NB_SH.indexOf(k)<0)NB_SH.push(k)});
/* render: pasó a tema-dibujar1.js */
/* ---------- encargado: su perfil en la nube dice hasta cuándo manda (para las reglas de seguridad) ---------- */
var _encSync45='';/* render: pasó a tema-dibujar1.js */
