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
var _toast45=toast;toast=function(t){var r=_toast45.apply(this,arguments);try{if(FALTA_RE.test(String(t||'')))setTimeout(function(){marcaFalta(primerVacio())},40)}catch(e){}return r};
var _clk45=0;window.addEventListener('click',function(e){if(e.target.closest&&e.target.closest('[data-act]'))_clk45=Date.now()},true);
var _r45a=render;render=function(){var r=_r45a.apply(this,arguments);try{if(Date.now()-_clk45<500){var c=capaArriba(),al=c&&c.querySelector('.neg[role="alert"],[role="alert"].neg,.err[role="alert"]');if(al&&al.getClientRects().length&&FALTA_RE.test(al.textContent.trim())){_clk45=0;var t=primerVacio();if(t)marcaFalta(t);else{al.classList.remove('falta');void al.offsetWidth;al.classList.add('falta');try{vibrar(60)}catch(er){}}}}}catch(e){}return r};
/* ---------- 54 · después de mandar el cierre, el cierre solo se ve (fotos fijas) ---------- */
function fotoMini(src,l){return src&&!/^data:x$/.test(src)?'<figure><img src="'+esc(src)+'" alt="'+esc(l)+'" data-act="fotogr" data-src="'+esc(src)+'"><figcaption>'+esc(l)+'</figcaption></figure>':'<figure><div class="lbl" style="aspect-ratio:4/3;border:1px dashed var(--line);border-radius:10px;display:flex;align-items:center;justify-content:center">Sin foto</div><figcaption>'+esc(l)+'</figcaption></figure>'}
var _cie45=cierre;cierre=function(){if(S.role!=='rep'||!S.cierre||!S.cierre.sent)return _cie45.apply(this,arguments);var c=S.cierre,d=c.corte||{},r=c.res||{},ff=(S.salida&&S.salida.fotosFin)||{};
 return '<h1>Cierre del día</h1>'
  +'<div class="card good"><b style="font-size:18px">✓ Cierre enviado'+(S.ciEnvH?' a las '+esc(S.ciEnvH):'')+'</b><div class="lbl">Ya no se puede cambiar. Si algo está mal, avísale al administrador.</div></div>'
  +'<div class="card"><b>Efectivo</b>'+rw('Debías entregar',money(d.deb!=null?d.deb:num(r.efectivo)))+rw('Entregas',money(d.ent!=null?d.ent:num(r.efectivo)))+(d.dif&&Math.abs(d.dif)>=0.5?rw(d.dif<0?'Faltan':'Sobran',money(Math.abs(d.dif)),'neg')+rw('Motivo',esc(d.mot||'')):'')+(d.bolsa?rw('Bolsa',esc(d.bolsa)):'')+(d.dest?rw('Dinero',d.dest==='tómbola'?'a la tómbola':'al administrador'):'')+(d.v?rw('Código del corte',esc(d.v)):'')+'</div>'
  +'<div class="card"><b>Vehículo</b>'+(c.odo?rw('Odómetro final',num(c.odo).toLocaleString('es-MX')+' km'):'')+'<div class="cifoto">'+FOTOS.map(function(f){return fotoMini(ff[f[0]],f[1])}).join('')+(ff.odo?fotoMini(ff.odo,'Odómetro'):'')+'</div></div>'};
document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act="fotogr"],#fgov');if(!b)return;e.stopImmediatePropagation();var o=document.getElementById('fgov');if(o){o.remove();return}o=document.createElement('div');o.id='fgov';o.innerHTML='<img alt="Foto" src="'+b.dataset.src+'">';document.body.appendChild(o)},true);
/* por si algo más intenta cambiar las fotos o reenviar con el cierre ya mandado */
window.addEventListener('change',function(e){var t=e.target;if(S.role==='rep'&&S.cierre&&S.cierre.sent&&t&&t.type==='file'&&t.closest&&t.closest('main')&&S.tab.rep==='cierre'){e.stopImmediatePropagation();t.value='';toast('El cierre ya se mandó; las fotos se quedan como están')}},true);
/* ---------- 58 · burbuja de datos que faltan → proveedor: abre su ficha en Datos con el campo listo ---------- */
var _dfIr45=dfIr;dfIr=function(x){var g=x&&x.go;if(!g||g.t!=='prov')return _dfIr45.apply(this,arguments);S.dfOpen=false;S.menu=false;S.tab.admin='cargas';S.fiLast='openProv';S.openProv=g.n;S.pvEdit=g.n;S.fiTab=S.fiTab||{};S.fiTab['prov:'+g.n]='dat';render();
 var k=/Teléfono/.test(x.txt)?'tel':(/Dirección/.test(x.txt)?'dir':'nota');setTimeout(function(){var el=document.querySelector('[data-pv="'+encodeURIComponent(g.n)+'|'+k+'"]');if(el){marcaFalta(el)}},280)};
/* ---------- 63 · nunca "Infinity" ni "NaN" ---------- */
var _tA45=tiempoAprox;tiempoAprox=function(d){if(!isFinite(d))return '';return _tA45.apply(this,arguments)};
var _kA45=kmAprox;kmAprox=function(km,v){var h=_kA45.apply(this,arguments);if(!(kmDiaV(v)>0)&&num(km)>0)h=String(h).replace(/\s*\(\s*\)|,\s*$/,'')+' (cuando haya unos días de rutas te digo en cuánto tiempo)';return h};
function sinRaros(root){if(!root)return;var w=document.createTreeWalker(root,NodeFilter.SHOW_TEXT,null),n,L=[];while(n=w.nextNode())if(/Infinity|NaN|undefined/.test(n.nodeValue))L.push(n);L.forEach(function(t){console.warn('texto raro:',t.nodeValue);t.nodeValue=t.nodeValue.replace(/(como )?-?Infinity( años| meses| días)?/g,'—').replace(/\$?NaN/g,'—').replace(/\bundefined\b/g,'')})}
var _r45b=render;render=function(){var r=_r45b.apply(this,arguments);try{sinRaros(document.getElementById('root')||document.body)}catch(e){}return r};
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
var _ru45=ruta;ruta=function(){var h=_ru45.apply(this,arguments);if(S.role!=='rep')return h;var p=pedCargaHTML();
 if(S.cierre&&S.cierre.sent){if(!p)return h;var i=h.indexOf('<div class="card good cienv">');return i>-1?h.slice(0,i)+p+h.slice(i):p+h}
 if(p&&S.salida&&S.salida.ok){var n=pedNecesita();if(n.R>n.trR||n.M>n.trM){var j=h.indexOf('<h1>Ruta de hoy</h1>');return j>-1?h.slice(0,j)+p+h.slice(j):p+h}}return h};
function reabreSinPermiso(k,R,M){_seguirOk=true;var bt=document.createElement('button');bt.dataset.act='seguir';bt.dataset.k=k;bt.style.display='none';document.body.appendChild(bt);try{bt.click()}finally{bt.remove();_seguirOk=false}
 setTimeout(function(){S.reab=null;S.cierreP=0;if(k==='carga')S.cx={R:String(R||''),M:String(M||''),foto:null,k:'carga',ped:true};render()},30)}
document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act="pedcarga"],[data-act="pedir"]');if(!b)return;e.stopImmediatePropagation();var sent=S.cierre&&S.cierre.sent;
 if(b.dataset.act==='pedcarga'){if(sent)reabreSinPermiso('carga',b.dataset.r,b.dataset.m);else{S.cx={R:b.dataset.r,M:b.dataset.m,foto:null,k:'carga',ped:true};render()}S.avPrecio.push(chofN(S.chofHoy)+' regresa a la bodega a cargar para el pedido');return}
 if(sent)reabreSinPermiso('vuelta');S.tab.rep='ruta';render();window.scrollTo(0,0)},true);
/* aviso en el celular del chofer cuando le llega algo nuevo */
function natNotif(t,x){var C=window.Capacitor,n=C&&C.Plugins&&C.Plugins.RutaNativa;try{if(n&&n.notificar)n.notificar({titulo:t,texto:x});}catch(e){}try{vibrar([80,60,80])}catch(e){}}
var _r45c=render;render=function(){var r=_r45c.apply(this,arguments);try{if(S.role==='rep'&&S.chofHoy!=null){var av=(S.rutaAv||{})[S.chofHoy]||[],k='rutaAvN:'+S.chofHoy+':'+iso(TODAY),ant=+(localStorage.getItem(k)||0);if(av.length>ant){var nuevos=av.slice(ant);localStorage.setItem(k,String(av.length));
 if(ant>0||Date.now()-(window.__ini45||0)>5000){var t=rutaAvTit(nuevos);natNotif(t,nuevos.map(avPedTxt).join(' · '));toast(t)}}else if(av.length<ant)localStorage.setItem(k,String(av.length))}}catch(e){}return r};window.__ini45=Date.now();
/* Ajustes: cuánto extra sugerir */
var _aj45=ajHTML;ajHTML=function(){var h=_aj45.apply(this,arguments);if(!h||h.indexOf('id="ajov"')<0||S.role!=='admin'||S.encOn)return h;
 var c='<details class="card" data-k="ajextra"'+(S.dOpen.ajextra?' open':'')+'><summary><b>Carga extra sugerida</b><span class="lbl">por si sale otro pedido</span></summary><div class="lbl" style="margin-top:6px">Cuando un chofer regresa a cargar por un pedido, la app le sugiere llevar además al menos esto (o lo que normalmente vende por cliente, lo que sea mayor).</div>'
  +'<div class="field"><label for="cfg_extraR">Cajas de roatán extra</label><input id="cfg_extraR" type="number" inputmode="numeric" data-bind="cfg.extraR" value="'+esc(S.cfg.extraR==null?'3':S.cfg.extraR)+'"></div><div class="field"><label for="cfg_extraM">Kilos de macho extra</label><input id="cfg_extraM" type="number" inputmode="decimal" data-bind="cfg.extraM" value="'+esc(S.cfg.extraM==null?'20':S.cfg.extraM)+'"></div></details>';
 var i=h.lastIndexOf('</div></div>');return i<0?h:h.slice(0,i)+c+h.slice(i)};
/* ---------- 68 · mover el mapa no cambia de sección ---------- */
var _swB45=swBloq;swBloq=function(t){if(t&&t.closest&&t.closest('.leaflet-container,[data-vivo],.mapa,[data-mapa]'))return true;return _swB45.apply(this,arguments)};
var _r45d=render;render=function(){var r=_r45d.apply(this,arguments);try{Array.prototype.forEach.call(document.querySelectorAll('.leaflet-container,[data-vivo]'),function(el){if(!el.hasAttribute('data-swipe'))el.setAttribute('data-swipe','mapa')})}catch(e){}return r};
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
var _r45e=render;render=function(){try{if(typeof NB==='undefined'||!NB.on||NB.listo)migraDemo()}catch(e){}return _r45e.apply(this,arguments)};
/* ---------- encargado: su perfil en la nube dice hasta cuándo manda (para las reglas de seguridad) ---------- */
var _encSync45='';var _r45f=render;render=function(){var r=_r45f.apply(this,arguments);try{if(typeof NB!=='undefined'&&NB.on&&NB.ad&&NB.perfil&&NB.perfil.rol==='admin'&&NB.usuarios){var e=S.enc,hasta=e&&e.hasta?new Date(e.hasta+'T23:59:59').getTime():0,sig=(e?e.ch:'')+':'+hasta;if(sig!==_encSync45){_encSync45=sig;
 Object.keys(NB.usuarios).forEach(function(uid){var p=NB.usuarios[uid];if(!p||p.rol!=='chofer'||!p.activo)return;var quiero=e&&+p.chId===+e.ch?hasta:0;if(num(p.encHasta)!==quiero){p.encHasta=quiero;NB.ad.set('usuarios_app/'+uid,{encHasta:quiero},true).catch(function(){})}})}}}catch(er){}return r};
