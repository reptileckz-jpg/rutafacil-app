/* ===================== TEMA · Pantallas del administrador (reorganización, punto 92 · 17 nov) =====================
   Ricardo aprobó el dibujo. Todo lo de cómo se acomodan las pantallas del administrador vive AQUÍ.
   - Barra: Inicio · Rutas · Clientes · Bodega · Cargas · Más (Gastos, Vehículos, Personal, Estadísticas, Bienes, Ajustes).
   - Rutas (nueva): cierres por recibir, liberar rutas, Hoy/Mañana con "Ver y repartir", mapa en vivo y cada chofer con su estado.
   - Inicio: precio de hoy (destella en rojo si no se ha fijado) · Mi ruta de hoy · UNA lista "Hoy" · viaje en curso ·
     números de hoy · inventario como antes (verdes, madurando, maduras, reparto) · ¿cuadran las cuentas? · cierre de caja.
   - Clientes con pestañas: Clientes · Pedidos · Cobranza (con los límites y topes de crédito por decidir).
   - Pendientes de cada sección: un renglón que se abre. Numeritos: rojo solo lo urgente; lo demás, puntito gris.
   - Lo que solo informa va a "Lo que pasó hoy" (en Más). "Viaje en curso" solo en Inicio y Cargas.
   - Sueldos en Personal. Resumen de la semana en Estadísticas. "Aprende la app" se quita sola al terminarla.
   ===================================================================================================================== */
(function(){var st=document.createElement('style');st.textContent=[
 '@keyframes pn92{0%,100%{box-shadow:0 0 0 0 rgba(220,38,38,.55);border-color:#DC2626}50%{box-shadow:0 0 0 7px rgba(220,38,38,0);border-color:#F87171}}',
 '[data-x="precio65"].sinfijar92{border:2.5px solid #DC2626!important;background:color-mix(in srgb,#DC2626 8%,var(--surface))!important;animation:pn92 1.4s ease-in-out infinite}',
 '.pr92n{font-size:14px;color:#991B1B;font-weight:700;margin:4px 0 2px}',
 '.hoy92 .it92{display:flex;align-items:center;gap:10px;width:100%;padding:11px 2px;border:0;border-top:1px solid var(--line);background:none;color:inherit;text-align:left;font-size:15.5px;line-height:1.3}',
 '.hoy92 .it92:first-of-type{border-top:0}.hoy92 .it92 .t{flex:1;min-width:0}.hoy92 .it92 .go{color:var(--accent);font-weight:800;white-space:nowrap}',
 '.hoy92 .it92.ok{opacity:.55}.hoy92 .it92.ok .t{text-decoration:line-through}.hoy92 .ck92{width:24px;height:24px;border-radius:8px;border:2px solid var(--line);flex:none;display:flex;align-items:center;justify-content:center;font-size:14px;background:none;color:#fff;padding:0}',
 '.hoy92 .ck92[aria-pressed="true"]{background:var(--accent);border-color:var(--accent)}',
 '.hoy92 .urg92{display:flex;align-items:center;gap:10px;width:100%;text-align:left;background:color-mix(in srgb,#DC2626 9%,var(--surface));border:1.5px solid #FCA5A5;border-radius:14px;padding:10px 12px;margin:0 0 8px;color:inherit;font-size:15px}',
 '.hoy92 .urg92 .t{flex:1;min-width:0}.hoy92 .urg92 b{color:#B91C1C}.hoy92 .urg92 .go{color:#B91C1C;font-weight:800}',
 '.hoy92 .sub92 .it92{padding-left:8px}.hoy92 .lbl92{font-size:13px;color:var(--muted);display:block}',
 'nav.tabs .tbadge.dot92{min-width:10px!important;width:10px!important;height:10px!important;padding:0!important;font-size:0!important;background:#94A3B8!important;animation:none!important;top:4px!important}',
 '.pnd86.c92{padding:0!important;overflow:hidden}.pnd86.c92>.hd92{display:flex;align-items:center;gap:8px;width:100%;border:0;background:color-mix(in srgb,#F59E0B 12%,var(--surface));color:inherit;padding:12px 14px;font-weight:800;font-size:15.5px;text-align:left}',
 '.pnd86.c92>.hd92 .go{margin-left:auto;color:#92400E;white-space:nowrap}.pnd86.c92.cerr92>:not(.hd92){display:none!important}.pnd86.c92:not(.cerr92)>:not(.hd92){margin-left:12px;margin-right:12px}',
 '.pnd86 .it88 .lbl{display:block;font-weight:400}',
 '.tabs92{display:flex;background:var(--surface);border-radius:14px;padding:4px;margin:0 0 12px;gap:4px}.tabs92 button{flex:1;border:0;background:none;border-radius:11px;padding:9px 4px;font-weight:800;font-size:14.5px;color:var(--muted);min-height:50px}',
 '.tabs92 button small{display:block;font-weight:600;font-size:11.5px}.tabs92 button[aria-pressed="true"]{background:var(--accent);color:#fff}',
 '.ch92{background:var(--surface);border-radius:16px;padding:12px 14px;margin-bottom:10px}.ch92 .tg{font-size:12px;font-weight:800;border-radius:999px;padding:3px 8px;margin-left:6px;white-space:nowrap}',
 '.mas92{display:grid;grid-template-columns:1fr 1fr;gap:10px}.mas92 button{background:var(--surface);border:1.5px solid var(--line);border-radius:18px;padding:14px 12px;text-align:left;color:inherit;font-weight:800;font-size:16px;min-height:96px}',
 '.mas92 button .ic92{display:block;margin-bottom:6px;color:var(--accent)}.mas92 button small{display:block;color:var(--muted);font-weight:600;font-size:12.5px;margin-top:3px}',
 '.act92 .l{display:flex;gap:10px;padding:8px 0;border-top:1px solid var(--line);font-size:15px}.act92 .l:first-child{border-top:0}'].join('\n');document.head.appendChild(st)})();

var SEC92=['gastos','vehiculos','personal','estadisticas','bienes','sugerencias','mas'];
function adm92(){return S.role==='admin'}

/* ---------- barra de abajo ---------- */
var _tD92=tabsDe;tabsDe=function(r){if(r!=='admin')return _tD92.apply(this,arguments);return [['inicio','Inicio'],['rutas','Rutas'],['clientes','Clientes'],['bodega','Bodega'],['cargas','Cargas'],['mas','Más']]};
function barra92(){if(!adm92())return;var nv=document.querySelector('nav.tabs');if(!nv)return;var t=S.tab.admin;
 [].slice.call(nv.querySelectorAll('button[data-t]')).forEach(function(b){var k=b.dataset.t,on=k===t||(k==='rutas'&&t==='cierreadm')||(k==='mas'&&SEC92.indexOf(t)>-1);b.setAttribute('aria-pressed',String(on));
  })}
/* numeritos: rojo solo lo urgente; lo demás un puntito gris */
/* tabBadges: pasó a tema-avisos.js */

/* ---------- lo que solo informa no es pendiente: va a "Lo que pasó hoy" ---------- */
var INFO92=/desgaste de .* cambió de|cambió de \$[\d.,]+ a \$[\d.,]+ por km/i;
/* avisos: pasó a tema-avisos.js */

/* avDestino: pasó a tema-avisos.js */
/* 95 · lo que falta recibir es URGENTE: rojo en "Hoy" y numerito rojo en Rutas, hasta que se reciba */
function atrasTxt95(x){var n=chofN(x.id),d=fCorta91(x.f);return 'URGENTE: falta recibir '+(x.why==='cierre'?'el cierre del '+d+' de '+n:'lo que traía '+n+' del '+d)+' ('+money(x.ef)+')'}
/* avisos: pasó a tema-avisos.js */
/* avDestino: pasó a tema-avisos.js */
/* ---------- "Viaje en curso": solo en Inicio y Cargas ---------- */
var _vb92=vwBurbuja;vwBurbuja=function(){if(adm92()&&['inicio','cargas'].indexOf(S.tab.admin)<0)return '';return _vb92.apply(this,arguments)};

/* ---------- RUTAS ---------- */
function chEstado92(id){var sal=false,ci=null,rg=null,L=[];try{sal=salio81(id);ci=nbRGet(id,'cierre');rg=nbRGet(id,'cierreReg');L=lista81(id,hoy81()).L}catch(e){}var hechos=L.filter(function(x){return x.done}).length;
 var vj=false;try{vj=chofViajeActivo(+id)}catch(e){}
 if(ci&&ci.sent)return rg!=null?{t:'✓ cierre recibido',c:'#DCFCE7',f:'#166534',x:hechos+' de '+L.length+' entregados'}:{t:'✓ mandó su cierre',c:'#DCFCE7',f:'#166534',x:hechos+' de '+L.length+' entregados',rec:1};
 if(vj)return {t:'viaje de carga',c:'#FEF3C7',f:'#92400E',x:'Está en un viaje de carga'};
 if(sal)return {t:'en ruta',c:'#DBEAFE',f:'#1E40AF',x:hechos+' de '+L.length+' entregados'};
 return {t:'no ha salido',c:'#F1F5F9',f:'#475569',x:L.length+' cliente'+(L.length===1?'':'s')+' para hoy'}}
function rutas92(){var d=S.rut92==='man'?'man':'hoy',f=d==='hoy'?hoy81():man81(),CH=[],sc=0,n=0,partes=[];try{CH=chs81();sc=sinCh81(f).length;CH.forEach(function(c){var k=lista81(+c.id,f).L.length;n+=k;if(k)partes.push(chofN(c.id)+' '+k)})}catch(e){}
 var h='<h1>Rutas</h1>';try{h+=atrasLista93().map(function(x){var n=esc(chofN(x.id)),d=esc(fCorta91(x.f));var T={cierre:['📥 Cierre del '+d+' de '+n,'Lo mandó pero no se recibió antes de cambiar de día. Entrega '+money(x.ef)+' en efectivo.','Recibir su cierre'],
  liberada:['📥 Lo que traía '+n+' del '+d+' (ruta liberada)','No mandó su cierre. Cobró '+money(x.ef)+' en efectivo según sus entregas: cuenta el efectivo y las cajas que llegaron.','Recibir lo que traía'],
  sinEntregas:['📥 Las cajas que traía '+n+' del '+d,'Salió y no entregó nada. Cuenta las cajas que regresaron.','Recibir las cajas'],
  sinSalir:['📥 Lo que traía '+n+' del '+d,'Entregó sin iniciar ruta y no mandó cierre. Cobró '+money(x.ef)+': cuenta el efectivo y las cajas que llegaron.','Recibir lo que traía'],
  sinCierre:['📥 Lo que traía '+n+' del '+d,'No mandó su cierre. Cobró '+money(x.ef)+': cuenta el efectivo y las cajas que llegaron.','Recibir lo que traía']}[x.why]||['📥 Cierre del '+d+' de '+n,'',''];
  return '<div class="card alert" data-x="atr93c" style="padding:12px 14px"><b style="font-size:17px">'+T[0]+'</b><div class="lbl">'+T[1]+'</div><button class="btn" style="width:100%;margin-top:8px;min-height:50px" data-act="atr93" data-k="'+esc(x.k)+'">'+(T[2]||'Recibir')+'</button></div>'}).join('')}catch(e){}try{h+=cierreTop()}catch(e){}
 h+='<div class="tabs92" role="group" aria-label="Día"><button data-act="rut92d" data-v="hoy" aria-pressed="'+(d==='hoy')+'">Hoy<small>'+esc(fCorta91(hoy81()))+'</small></button><button data-act="rut92d" data-v="man" aria-pressed="'+(d==='man')+'">Mañana<small>'+esc(fCorta91(man81()))+'</small></button></div>';
 h+='<div class="card'+(sc?' alert':'')+'" data-x="rut92s" style="padding:12px 14px"><b style="font-size:18px">'+n+' cliente'+(n===1?'':'s')+(d==='hoy'?' hoy':' mañana')+'</b><div class="lbl">'+(partes.length?esc(partes.join(' · ')):'Todavía nadie lleva clientes')+(sc?' · <b class="neg">'+sc+' sin chofer</b>':' · ninguno sin chofer')+'</div>'
  +'<button class="btn" style="width:100%;margin-top:10px;min-height:52px" data-act="rt81open" data-v="'+d+'">Ver y repartir clientes</button></div>';
 if(d==='hoy'){var mv='';try{mv=mapaVivo()+viajesGps()}catch(e){}if(mv)h+='<h2 style="font-size:18px;margin:14px 2px 8px">Mapa en vivo</h2>'+mv;
  h+='<h2 style="font-size:18px;margin:14px 2px 8px">Choferes</h2>';
  CH.forEach(function(c){var id=+c.id,E=chEstado92(id),yo=esAdm(c);
   h+='<div class="ch92" data-x="ch92" data-id="'+id+'"><div class="row" style="align-items:center"><span style="flex:1;min-width:0"><b style="font-size:17px">'+esc(yo?chofN(id)+' (tú)':chofN(id))+'</b><span class="tg" style="background:'+E.c+';color:'+E.f+'">'+E.t+'</span><br><span class="lbl">'+esc(E.x)+'</span></span>'
    +(yo?'<button class="btn sec" style="min-height:42px;width:auto" data-act="arentrar">Mi ruta ›</button>':'')+'</div>'
    +(E.rec?'<button class="btn" style="width:100%;margin-top:10px;min-height:50px" data-act="verruta" data-id="'+id+'" data-ir="cierreadm">Recibir su cierre</button>':'')
    +(!yo?'<div style="display:flex;gap:8px;margin-top:8px"><button class="btn sec" style="flex:1;min-height:42px" data-act="verruta" data-id="'+id+'" data-ir="cierreadm">Ver su día</button><button class="btn sec" style="flex:1;min-height:42px" data-act="fv82" data-id="'+id+'">📷 Fotos del vehículo</button></div>':'')+'</div>'});
  if(!CH.length)h+='<div class="card note">No hay choferes. Dalos de alta en Más → Personal.</div>'}
 return h}
document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act="rut92d"]');if(!b)return;e.stopImmediatePropagation();S.rut92=b.dataset.v;render()},true);
/* "Rutas de hoy" y el mapa ya no van en Inicio ni en Personal */
var _pe92=personal;personal=function(){var h=_pe92.apply(this,arguments);try{var a=h.indexOf('<div class="lbl" style="margin:-4px 2px 8px"><b>Choferes en ruta</b></div>'),z=h.indexOf('<datalist id="pn-parent">');if(a>-1&&z>a)h=h.slice(0,a)+h.slice(z)}catch(e){}
 try{var i=h.indexOf('</h1>');if(i>-1){var P=S.per92==='sue';var ch='<div class="tabs92" role="group" aria-label="Personal"><button data-act="per92" data-v="" aria-pressed="'+!P+'">Personal</button><button data-act="per92" data-v="sue" aria-pressed="'+P+'">💵 Sueldos</button></div>';
  if(P)return h.slice(0,i+5)+ch+sueldos();h=h.slice(0,i+5)+ch+h.slice(i+5)}}catch(e){}return h};
document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act="per92"]');if(!b)return;e.stopImmediatePropagation();S.per92=b.dataset.v;render();window.scrollTo(0,0)},true);
/* Sueldos ya no es una pestaña de Gastos (siguen saliendo como gasto) */
function personal92(){if(!adm92()||S.tab.admin!=='personal')return;var e=document.querySelector('main [data-x="rt81e"]');if(e)e.remove()}
function gastos92(){if(!adm92()||S.tab.admin!=='gastos')return;var b=document.querySelector('main [data-act="gsec"][data-p="sueldos"]');if(b)b.remove()}
/* Estadísticas: el resumen de la semana pasada */
if(typeof estadisticas==='function'){var _es92=estadisticas;estadisticas=function(){var h=_es92.apply(this,arguments);try{var l=(typeof HIST!=='undefined'&&HIST.length)?lunesHTML(true):'';var i=h.indexOf('</h1>');if(l&&i>-1)h=h.slice(0,i+5)+l+h.slice(i+5)}catch(e){}return h}}

/* ---------- MÁS ---------- */
function mas92(){var it=[['tab','gastos','gastos','Gastos','registrar, fijos, cerrar el mes'],['tab','vehiculos','vehiculos','Vehículos','servicio, papeles, fotos'],['tab','personal','personal','Personal','choferes, sueldos, permisos'],
 ['tab','estadisticas','estadisticas','Estadísticas','ventas, ganancias, meta del mes'],['tab','bienes','bienes','Bienes','teléfonos, básculas, equipo'],['ajopen','','ajustes','Ajustes','precios, cobranza, la app']];
 var nAct=0;try{nAct=actDe(null,iso(TODAY)).length}catch(e){}
 return '<h1>Más</h1><div class="mas92">'+it.map(function(x){var ic='';try{ic=icon(x[2],24)}catch(e){}return '<button data-act="'+x[0]+'"'+(x[1]?' data-t="'+x[1]+'"':'')+' data-x="mas92-'+x[2]+'"><span class="ic92">'+ic+'</span>'+x[3]+'<small>'+x[4]+'</small></button>'}).join('')+'</div>'
  +'<button class="card" data-act="act92" style="width:100%;text-align:left;color:inherit;margin-top:12px;display:flex;align-items:center;gap:10px"><span style="font-size:22px">🕓</span><span style="flex:1"><b>Lo que pasó hoy</b><br><span class="lbl">'+(nAct?nAct+' aviso'+(nAct===1?'':'s')+' que solo informan':'Aquí quedan los avisos que solo informan')+'</span></span><span>›</span></button>'
  +'<button class="card" data-act="tutver" style="width:100%;text-align:left;color:inherit;display:flex;align-items:center;gap:10px"><span style="font-size:22px">🎓</span><span style="flex:1"><b>Aprende la app</b><br><span class="lbl">Un recorrido por las pantallas</span></span><span>›</span></button>'}
mas=mas92;
/* "Lo que pasó hoy" */
function act92HTML(){if(!S.act92||!adm92())return '';var hoy=iso(TODAY),G={},I=[],nAct=0,h='';try{G=actGrupos(hoy);I=infos92();nAct=actDe(null,hoy).length}catch(e){}var gk=Object.keys(G);
 if(gk.length)h+='<div class="card act92"><b>Por persona</b>'+gk.map(function(k){return '<div class="actl"><b>'+esc(k)+':</b> '+esc(actResumen(G[k]))+'</div>'}).join('')+'</div>';
 if(I.length)h+='<div class="card"><b>Avisos que solo informan</b>'+I.map(function(x){return avRow(x,false)}).join('')+'</div>';
 if(nAct)h+='<div class="card">'+actDiaHTML(hoy,null,'Todo lo de hoy, en orden')+'</div>';
 if(!h)h='<div class="card lbl">Todavía no pasa nada hoy.</div>';
 return ovW70('act92ov','Lo que pasó hoy',h+(gk.length||I.length?'<button class="btn sec" style="margin-top:8px" data-act="avvisto">Marcar todo como visto</button>':''),'act92x')}
document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act="act92"],[data-act="act92x"]');if(!b)return;e.preventDefault();e.stopImmediatePropagation();S.act92=b.dataset.act==='act92';render()},true);

/* ---------- PENDIENTES de cada sección: un renglón que se abre ---------- */
/* pendCard86: pasó a tema-avisos.js */
document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act="pnd92"]');if(!b)return;e.preventDefault();e.stopImmediatePropagation();var t=S.tab.admin;S.pnd92=(S.pnd92||'')===t?'':t;render()},true);

/* ---------- CLIENTES con pestañas: Clientes · Pedidos · Cobranza ---------- */
function cli92(){if(!adm92()||S.tab.admin!=='clientes'||S.openCli!=null)return;var m=document.querySelector('main');if(!m||m.querySelector('[data-x="tabs92c"]'))return;var v=S.cli92||'cli';
 var h1=[].slice.call(m.children).filter(function(x){return x.tagName==='H1'})[0];if(!h1)return;
 var D=deud91(),tot=sum(D,function(c){return num(c.cred)}),nC=(S.cli||[]).filter(function(c){return !c.oculto}).length,nP=0;try{nP=(S.cli||[]).filter(function(c){return c.ped&&(num(c.ped.R)||num(c.ped.M))}).length}catch(e){}
 var T=document.createElement('div');T.className='tabs92';T.dataset.x='tabs92c';T.setAttribute('role','group');T.setAttribute('aria-label','Clientes');
 T.innerHTML='<button data-act="cli92" data-v="cli" aria-pressed="'+(v==='cli')+'">Clientes<small>'+nC+'</small></button><button data-act="cli92" data-v="ped" aria-pressed="'+(v==='ped')+'">Pedidos<small>'+(nP?nP+' por surtir':'sin pendientes')+'</small></button><button data-act="cli92" data-v="cob" aria-pressed="'+(v==='cob')+'">Cobranza<small style="'+(tot>0.5&&v!=='cob'?'color:#B91C1C':'')+'">'+money(tot)+'</small></button>';
 h1.after(T);
 var esPed=function(x){return x.classList&&(x.classList.contains('p57')||x.classList.contains('pw40'))},esCfg=function(x){return /^Cobranza/.test((x.textContent||'').trim())&&x.tagName==='DETAILS'||/^Cobranzamensaje/.test((x.textContent||'').replace(/\s+/g,''))};
 var fijos=function(x){return x===h1||x===T||x.dataset&&x.dataset.x==='pnd86'||x.classList&&x.classList.contains('foot')||x.classList&&x.classList.contains('vbub')};
 var cfg=null;[].slice.call(m.children).forEach(function(x){if(fijos(x))return;if(esCfg(x))cfg=x;var mostrar=v==='cli'?(!esPed(x)&&!esCfg(x)):(v==='ped'?esPed(x):false);if(!mostrar)x.style.display='none'});
 if(v==='cob'){S.cob91=S.cob91||{ch:null};S.cob91.inl=1;var w=document.createElement('div');w.id='cob91i';w.dataset.x='cob92';var ex='';try{ex=(typeof mayRevHTML==='function'?mayRevHTML():'')+limRevHTML()+chBuroHTML()}catch(e){}
  w.innerHTML=cob91Cuerpo()+(ex?'<h2 style="font-size:18px;margin:16px 2px 8px">Créditos por decidir</h2>'+ex:'');T.after(w);if(cfg){cfg.style.display='';w.after(cfg)}}}
document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act="cli92"]');if(!b)return;e.preventDefault();e.stopImmediatePropagation();S.cli92=b.dataset.v||'cli';if(S.cli92==='cob'){S.cob91=S.cob91||{ch:null};S.cob91.inl=1}S.tab.admin='clientes';S.openCli=null;render();window.scrollTo(0,0)},true);

/* ---------- INICIO ---------- */
function hoyItems92(){var L=[];try{L=hoyItems()}catch(e){}return L}
function pendTodos92(){return avSinEfecto(function(){var A=[];try{A=avisos().filter(function(x){return typeof x==='string'&&!(S.avPos||{})[x]})}catch(e){}
 return A.filter(function(x){return AV_URG.test(x)||!AV_INFO.test(x)}).map(function(x){var d=null;try{d=avDestino(x)}catch(e){}return {x:x,t:(d&&d.t)||'inicio',u:AV_URG.test(x)||(typeof AV_ROJO!=='undefined'&&AV_ROJO.test(x))}})})}
function infos92(){return avSinEfecto(function(){var A=[];try{A=avisos().filter(function(x){return typeof x==='string'&&!(S.avPos||{})[x]&&!AV_URG.test(x)&&AV_INFO.test(x)})}catch(e){}return A})}
function limpio92(x){return String(x||'').replace(/^URGENTE:\s*/i,'').replace(/\s*\[(tel|geo|gps|gpsev|pin):[^\]]*\]/g,'')}
function hoyCard92(){var hoy=iso(TODAY),P=[];try{P=pendTodos92()}catch(e){}var U=P.filter(function(o){return o.u}),N=P.filter(function(o){return !o.u}),vis={},h='';
 var row=function(t,go,ok,extra){var k=t.toLowerCase().replace(/\s*[·(].*$/,'').trim();if(vis[k])return '';vis[k]=1;return '<div class="it92'+(ok?' ok':'')+'">'+(extra||'')+'<span class="t">'+t+'</span>'+go+'</div>'};
 h+=U.map(function(o){return avRow(o.x,true)}).join('');
 var T=[];try{T=hoyTareas()}catch(e){}
 T.forEach(function(x){if(x.k==='ef')return;var go=x.k==='cb'?'<button class="go" data-act="cli92" data-v="cob" style="background:none;border:0">Ir ›</button>':'<button class="go" data-act="popgo" data-t="'+esc(x.go)+'" style="background:none;border:0">Ir ›</button>';
  h+=row(esc(x.t),go,x.ok,'<button class="ck92" data-act="hoyok" data-k="'+esc(x.k)+'" aria-pressed="'+!!x.ok+'" aria-label="Marcar como hecho">'+(x.ok?'✓':'')+'</button>')});
 hoyItems92().forEach(function(x,i){if(/^Fijar el precio/.test(x[0]))return;h+=row(esc(x[0]),'<button class="go" data-act="hoyir" data-i="'+i+'" style="background:none;border:0">Ir ›</button>',x[1],'<span class="ck92"'+(x[1]?' style="background:var(--accent);border-color:var(--accent)"':'')+'>'+(x[1]?'✓':'')+'</span>')});
 var cr=0;try{cr=S.cli.filter(function(c){return c.limRev&&!c.oculto}).length+(chBuroHTML()?1:0)+(typeof mayRevHTML==='function'&&mayRevHTML()?1:0)}catch(e){}
 if(cr)h+=row('Créditos por decidir','<button class="go" data-act="cli92" data-v="cob" style="background:none;border:0">Ir ›</button>',false,'<span class="ck92"></span>');
 if(N.length){var ab=!!S.hoy92;h+='<button class="it92" data-act="hoy92"><span style="font-size:16px">🟡</span><span class="t">'+N.length+' pendiente'+(N.length===1?'':'s')+' más en las secciones</span><span class="go">'+(ab?'cerrar ▲':'ver ›')+'</span></button>';
  if(ab)h+='<div class="sub92">'+N.map(function(o){return avRow(o.x,false)}).join('')+'</div>'}
 var nA=0;try{nA=actDe(null,hoy).length+infos92().length}catch(e){}
 if(nA)h+='<button class="it92" data-act="act92" style="color:var(--muted)"><span style="font-size:16px">🕓</span><span class="t" style="font-size:14.5px">Lo que pasó hoy ('+nA+')</span><span class="go" style="color:var(--muted)">Ver ›</span></button>';
 var nu=U.length,np=h.split('class="it92"').length-1;
 return '<div class="card hoy92" data-x="hoy92"><div class="row" style="margin-bottom:8px"><b style="font-size:19px">Hoy</b><span class="lbl">'+(nu?nu+' urgente'+(nu===1?'':'s')+' · ':'')+'lo que hay que hacer</span></div>'+(h||'<div class="lbl">✓ Nada pendiente por ahora.</div>')+'</div>'}
document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act="hoy92"]');if(!b)return;e.preventDefault();e.stopImmediatePropagation();S.hoy92=!S.hoy92;render()},true);
/* "Ver a los choferes en ruta" y los cierres ahora están en Rutas */
var _hI92=hoyItems;hoyItems=function(){var L=_hI92.apply(this,arguments);try{L.forEach(function(x){if(/^Ver a los choferes en ruta/.test(x[0])){x[2]='nav.tabs button[data-t="rutas"]';x[3]='rutas';x[1]=!!S.hoyVisto&&S.hoyVisto.rutas===iso(TODAY)}})}catch(e){}return L};
/* "Te deben" de los números de hoy lleva a Cobranza */
window.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('.finwrap [data-act="finopen"]');if(!b||!/deben/i.test(b.textContent))return;e.preventDefault();e.stopImmediatePropagation();S.cli92='cob';S.cob91=S.cob91||{ch:null};S.cob91.inl=1;S.tab.admin='clientes';render();window.scrollTo(0,0)},true);
function inicio92(){if(!adm92()||S.tab.admin!=='inicio')return;var m=document.querySelector('main');if(!m||m.dataset.v92)return;m.dataset.v92='1';var hoy=iso(TODAY);
 var q=function(s){return m.querySelector(s)},kids=function(){return [].slice.call(m.children)},porTxt=function(re){return kids().filter(function(x){return re.test((x.textContent||'').trim())})};
 /* fuera de Inicio (cada cosa queda en su sección) */
 ['[data-x="rt81e"]','[data-x="cob91c"]','[data-key="hoytoca"]','[data-k="hoyq"]','[data-k="avinfo"]','[data-key="mayrev"]','[data-key="limrev"]','[data-key="chburo"]','[data-k="lunes"]','[data-act="vermeta"]','[data-x="pnd86"]'].forEach(function(s){var e=q(s);if(e)e.remove()});
 var c68=q('[data-x="cuadra68"]');if(c68){if(/^\s*✓/.test(c68.textContent)||/Todo cuadra/.test(c68.textContent.slice(0,40)))c68.remove()}
 porTxt(/^Cierre \d+ de .* entregado$/).forEach(function(e){if(e.parentNode===m)e.remove()});
 porTxt(/^Por atender/).concat(porTxt(/^Fruta para los próximos días/),porTxt(/^Hoy de un vistazo/)).forEach(function(e){if(e.parentNode===m)e.remove()});
 var pr=q('[data-x="precio65"]');if(pr){var pf=q('.pfix');if(pf)pf.remove()}else pr=q('.card.dban')||q('.pfix');if(pr){pr.dataset.p92='1';var ok=S.precio&&S.precio.conf===hoy;if(!ok){pr.classList.add('sinfijar92');var st=pr.querySelector('.st');if(st)st.textContent='⚠️ No lo has fijado hoy';var n=document.createElement('div');n.className='pr92n';n.textContent='Mientras, los choferes cobran con el último precio: el de ayer.';var hd=pr.querySelector('.hd');if(hd)hd.after(n);else pr.prepend(n)}}
 /* arriba, en orden */
 /* (Ricardo) si hay un viaje de carga o una ruta tuya en curso, su burbuja va hasta ARRIBA (a la mitad se perdía) */
 var vb=q('.bubpanel')||q('.vbub'),ar=q('[data-act="arentrar"]'),a85=q('[data-x="adm85"]');/* si repartes hoy, "¿Repartes hoy?" y "Mi ruta de hoy" van juntos arriba (88) */
 var top=(ar?[vb,a85,ar,q('[data-x="dia80a"]'),q('[data-x="perd120"]'),q('[data-x="cuad121"]'),pr]:[vb,q('[data-x="dia80a"]'),q('[data-x="perd120"]'),q('[data-x="cuad121"]'),pr,a85]).filter(Boolean);/* 121 · el Cuadre de hoy arriba (Ricardo) */var hc=document.createElement('div');hc.innerHTML=hoyCard92();var hoyEl=hc.firstElementChild;top.push(hoyEl);var cm=q('[data-x="camb"]');if(cm)top.push(cm);
 var ref=m.firstChild;/* lo que ya iba antes (avisos de vacaciones, permisos) se queda arriba */
 var ancla=kids().filter(function(x){return x!==pr&&top.indexOf(x)<0})[0]||null;top.forEach(function(e){m.insertBefore(e,ancla)});
 /* números de hoy, luego la bodega como antes, luego ¿cuadran?, cierre de caja, resumen */
 var fw=q('.finwrap');if(fw){var t2=fw.querySelector('h2');if(t2)t2.textContent='Números de hoy'}
 var inv=[q('[data-x="inv65"]'),q('.dcaja')].filter(Boolean),cu=[q('[data-x="cu82e"]'),q('[data-x="cuadra68"]')].filter(Boolean),cd=q('[data-k="cajadia"]'),foot=q('.foot');var antes=cd||foot||null;
 inv.concat(cu).forEach(function(e){m.insertBefore(e,antes)});
 /* "Aprende la app" y "Para empezar": al final, y solo mientras no se terminen */
 [q('.card.aprende'),q('.card.guia')].forEach(function(e){if(!e)return;var t=(e.textContent||'').replace(/\s+/g,' '),k=/(\d+) de (\d+)/.exec(t);if(k&&+k[1]>=+k[2]){e.remove();return}m.insertBefore(e,foot)})}

/* ---------- todo junto ---------- */
var _rd92=render;render=function(){try{if(typeof VIEWS!=='undefined'){VIEWS.rutas=rutas92;VIEWS.personal=personal;VIEWS.mas=mas92}if(typeof ICO!=='undefined'){if(!ICO.rutas)ICO.rutas='M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11zM12 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5';if(!ICO.ajustes)ICO.ajustes='M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z'}if(adm92()){if(S.tab.admin==='gastos'&&S.gsec==='sueldos'){S.gsec='gastos';S.tab.admin='personal';S.per92='sue'}if(S.tab.admin!=='clientes'&&S.cob91&&S.cob91.inl)S.cob91=null}}catch(e){}
 var r=_rd92.apply(this,arguments);
 try{barra92();inicio92();cli92();gastos92();personal92();ovPon70('act92ov',act92HTML())}catch(e){console.error('tema-pantallas',e)}return r};

/* ---------- tutoriales y ayuda ("?") con las pantallas nuevas ---------- */
(function(){try{
 var A=TUT.admin||[];A.forEach(function(st){if(/rt81e/.test(st[0])){st[0]='nav.tabs button[data-t="rutas"]';st[1]='Rutas';st[2]='Abajo está Rutas: ahí repartes los clientes de hoy y mañana, ves el mapa en vivo de los choferes y recibes sus cierres.'}
  if(/finver|\.fing/.test(st[0])){st[1]='Números de hoy';st[2]='Lo vendido, lo cobrado, el efectivo en caja y lo que te deben. Con el ojito los ocultas. "Te deben" te lleva a Cobranza.'}});
 var ip=-1;A.forEach(function(st,i){if(/precio65|pfix|deco-pl/.test(st[0])&&ip<0)ip=i});
 A.splice(ip>-1?ip+2:2,0,['[data-x="hoy92"]','Hoy','Todo lo que hay que hacer hoy, en orden. Lo urgente sale en rojo hasta arriba. "Ir" te lleva a resolverlo; lo que solo informa queda en Más → Lo que pasó hoy.']);
 A.push(['nav.tabs button[data-t="clientes"]','Clientes','Tiene tres pestañas: Clientes, Pedidos y Cobranza (quién te debe, desde cuándo, y mandarles su estado de cuenta).']);
 A.push(['nav.tabs button[data-t="mas"]','Más','Gastos, Vehículos, Personal (con los sueldos), Estadísticas, Bienes, Ajustes y "Lo que pasó hoy".']);
 TUT['n:rt81']=[['nav.tabs button[data-t="rutas"]','Rutas','Rutas ahora está en la barra de abajo: cuántos clientes lleva cada chofer hoy y si alguno se quedó sin chofer.'],
  ['nav.tabs button[data-t="rutas"]','Ver y repartir','Adentro toca "Ver y repartir clientes": marca uno o varios y abajo toca el chofer al que se los pasas. Por defecto es solo hoy; si te equivocas, "Deshacer".'],
  ['nav.tabs button[data-t="rutas"]','Mañana','Arriba escoges Hoy o Mañana. Mañana la ruta se le arma sola con tus cambios.']];
 /* recorrido nuevo para quien ya conocía la app: lo que cambió de lugar */
 TUT['n:92']=[['nav.tabs','Se reacomodó la app','La barra de abajo ahora es: Inicio · Rutas · Clientes · Bodega · Cargas · Más.'],['[data-x="hoy92"]','Una sola lista "Hoy"','Lo que hay que hacer hoy, con lo urgente en rojo arriba.'],
  ['nav.tabs button[data-t="rutas"]','Rutas','Repartir clientes, mapa en vivo y recibir los cierres.'],['nav.tabs button[data-t="clientes"]','Clientes','Pestañas Clientes · Pedidos · Cobranza.'],['nav.tabs button[data-t="mas"]','Más','Gastos, Vehículos, Personal (con sueldos), Estadísticas, Bienes, Ajustes y "Lo que pasó hoy".']];
}catch(e){console.error('tut92',e)}})();
/* el recorrido de lo que cambió sale una vez a quien ya había visto el tutorial del administrador */
function tutNuevo92(){if(window.__pnTest||typeof REAL==='undefined'||!REAL||S.tut||S.role!=='admin'||S.encOn||S.tab.admin!=='inicio')return;S.tutVisto=S.tutVisto||{};if(S.tutVisto['n:92']||!S.tutVisto.admin)return;
 if(!document.querySelector('[data-x="hoy92"]'))return;S.tutVisto['n:92']=true;setTimeout(function(){if(S.tut)return;S.tut={k:'n:92',i:0,prev:{tab:'inicio'},tab:'inicio'};render()},1400)}
var _tI92=tutIniciar;tutIniciar=function(k){try{if(k==='admin')S.tutVisto['n:92']=true}catch(e){}return _tI92.apply(this,arguments)};
function tutTxt92(){try{if(TUT._92)return;TUT._92=1;var D=function(k,i,sel,tit,tx){var L=TUT[k];if(!L||!L[i])return;if(sel)L[i][0]=sel;if(tit)L[i][1]=tit;if(tx)L[i][2]=tx};
 D('d:admin:2',0,'nav.tabs button[data-t="rutas"]','Cierres de los choferes','Cuando un chofer manda su cierre, te sale en Rutas (y en tu lista "Hoy"). La app te dice todo lo que debe regresar (cajas, kilos y efectivo) y tú solo confirmas, o corriges lo que llegó diferente.');
 D('d:admin:2',1,null,null,'Si un chofer pide cargar más u otra vuelta, lo autorizas desde tu lista "Hoy" (o en su ficha le das permiso de seguir solo).');
 D('d:admin:3',0,'nav.tabs button[data-t="clientes"]','Cobranza','En Clientes, pestaña Cobranza: quién te debe, desde cuándo y le mandas su estado de cuenta por WhatsApp con un toque.');
 D('d:admin:5',0,'nav.tabs button[data-t="mas"]','Estadísticas','En Más → Estadísticas ves ventas, ganancia, la meta del mes y cómo va cada chofer y cada cliente.');
 D('d:admin:7',0,null,null,'En tu lista "Hoy" te mandas el resumen del día cuando recibas los cierres. La app guarda sola un respaldo cada día en Descargas › Ruta Facil › Respaldos.')}catch(e){}
 try{if(typeof GUIA!=='undefined'&&GUIA.admin&&!GUIA._92){GUIA._92=1;var G=GUIA.admin;
  G.inicio=['Inicio','Arriba el precio de hoy. Luego tu lista "Hoy": lo que hay que hacer, con lo urgente en rojo. Los numeritos de la barra de abajo te dicen en qué sección hay algo urgente.','[data-x="hoy92"], main .card'];
  G.rutas=['Rutas','Aquí repartes los clientes de hoy y de mañana, ves el mapa en vivo de los choferes y recibes sus cierres.','[data-x="rut92s"], main .card'];
  G.mas=['Más','Aquí están Gastos, Vehículos, Personal, Estadísticas, Bienes, Ajustes y "Lo que pasó hoy".','.mas92, main .card'];
  if(G.personal)G.personal=['Personal','Toca a alguien para ver sus datos y permisos. En "Sueldos" ves y pagas lo de cada quien. Dónde va cada chofer está en Rutas.','main .card'];
  if(G.clientes)G.clientes=['Clientes','Arriba tienes tres pestañas: Clientes, Pedidos y Cobranza. Toca un cliente para ver su cuenta o cambiar sus datos.','[data-x="tabs92c"], main .card']}}catch(e){}}
function help92(){tutTxt92();try{if(typeof HELP==='undefined'||HELP._92)return;HELP._92=1;HELP._81=1;
 HELP.inicio=['Inicio','Arriba el precio de hoy (si no lo has fijado, parpadea en rojo; mientras, los choferes cobran con el último precio). Luego la lista "Hoy": lo que hay que hacer, con lo urgente en rojo. Abajo los números del día, la bodega y si cuadran las cuentas.'];
 HELP.rutas=['Rutas','Aquí repartes los clientes de hoy y de mañana ("Ver y repartir clientes"), ves el mapa en vivo de los choferes, recibes sus cierres y, si alguno no mandó el suyo, liberas su ruta.'];
 HELP.mas=['Más','Las demás secciones: Gastos, Vehículos, Personal (con los sueldos), Estadísticas, Bienes y Ajustes. También "Lo que pasó hoy": los avisos que solo informan.'];
 if(HELP.personal)HELP.personal=[HELP.personal[0],'Choferes, ayudantes y bodega: sus datos, permisos y expediente. En "Sueldos" pagas y ves lo que se le debe a cada quien. El mapa y las rutas están en Rutas.'];
 if(HELP.clientes)HELP.clientes=[HELP.clientes[0],String(HELP.clientes[1]||'')+' Arriba tienes tres pestañas: Clientes, Pedidos y Cobranza.']}catch(e){}}
var _rd92t=render;render=function(){try{help92()}catch(e){}var r=_rd92t.apply(this,arguments);try{tutNuevo92()}catch(e){}return r};
