/* ===================== v7.5 · diseño (11 nov)
   49 Inicio: inventario en dos tarjetas (roatán y macho) con encabezado de color, barra de colores y "Te alcanza para N días" con color
   50 "Por atender": cada aviso en tarjeta de color según urgencia, con ícono, letra grande y flecha ›
   52 PIN en modo oscuro
   61 ventana de aviso urgente nueva (título claro, ícono y color según el aviso, sin ×, "Atender ›") ===================== */
function dk68(L){return L.map(function(r){return 'html[data-theme="dark"] '+r}).join('\n')+'\n@media (prefers-color-scheme: dark){'+L.map(function(r){return 'html:not([data-theme]) '+r}).join('\n')+'}'}
var IC68={
 campana:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 22a2.5 2.5 0 0 0 2.4-2h-4.8a2.5 2.5 0 0 0 2.4 2zm7-6V11a7 7 0 0 0-5.5-6.8V3.5a1.5 1.5 0 0 0-3 0v.7A7 7 0 0 0 5 11v5l-2 2v1h18v-1z"/></svg>',
 camion:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 5h11v10H3zM15 8h3.5L21 11.5V15h-6zM6.5 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm11 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"/></svg>',
 dinero:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="2.5" y="6" width="19" height="12" rx="2"/><circle cx="12" cy="12" r="2.6"/><path d="M6 9.5v5M18 9.5v5"/></svg>',
 engrane:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/></svg>',
 doc:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M6 2h8l6 6v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zm7 1.5V9h5.5zM8 13v2h8v-2zm0 4v2h5v-2z"/></svg>',
 cal:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M8 3v4M16 3v4M3 10h18M8.5 15.5l2 2 4-4"/></svg>',
 gps:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a7 7 0 0 0-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 0 0-7-7zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5z"/></svg>',
 persona:'<svg viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="7.5" r="4"/><path d="M4 21a8 8 0 0 1 16 0z"/></svg>',
 cuadre:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v18M5 7h14M5 7l-3 7a3.5 3.5 0 0 0 6 0zM19 7l-3 7a3.5 3.5 0 0 0 6 0zM8 21h8"/></svg>',
 fruta:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20 5c.5 1.5.3 3.4-.6 5.4C17.6 14.6 13 18 8 18.5c-2 .2-3.6-.2-4.7-1 4.5-.3 8.5-2.8 11-6.5 1.2-1.8 2-3.7 2.3-5.6z"/><path d="M19 3.5l1.6-1.2.9 1.2-1.4 1.2z"/></svg>'};
/* qué es cada aviso: color, ícono, título y detalle (en palabras de todos los días) */
var AV68_VEH=/DEF|aceite|afinaci|llanta|veh[ií]culo|Freightliner|NP300|Nissan|cami[oó]n|camioneta|seguro de|tarjeta de circulaci|verificaci|placas|mensualidad|inspecci|servicio|fuera de servicio|km/i;
function avInfo68(x){var t=String(x||'').replace(/^URGENTE:\s*/i,'').replace(/\s*\[(tel|geo|gps|gpsev|pin):[^\]]*\]/g,'');try{if(typeof avYo==='function')t=avYo(t)}catch(e){}
 var urg=AV_URG.test(x)||AV_ROJO.test(x)||/se pasaron de tiempo|no cuadra/i.test(x);
 var ic=/no cuadra/i.test(t)?'cuadre':(/ubicaci|celular|se[nñ]al|gps|apag[oó]/i.test(t)?'gps':(/roat[aá]n|cajas? (de|madur|verde)/i.test(t)&&/madur|pasa|verde|merma|lote/i.test(t)?'caja':(/macho|kg/i.test(t)&&/madur|pasa|verde|merma|lote/i.test(t)?'kilo':(/precio/i.test(t)?'dinero':(AV68_VEH.test(t)?(/afinaci|vence|mensualidad|seguro|tarjeta/i.test(t)?'cal':'camion'):(/efectivo|faltante|debes|deuda|pag|cobr|\$/i.test(t)?'dinero':(/b[aá]scula|ajuste|Ponle/i.test(t)?'engrane':(/viaje|carga|pactado|proveedor/i.test(t)?'doc':(/cliente|direcci/i.test(t)?'persona':'campana')))))))));
 var veh=ic==='camion'||ic==='cal',col=urg?'r':(AV_NAR.test(t)&&!veh?'o':(veh?'v':(/Falta|Ponle|Registraste|sin precio|sin direcci|Captura|Completa|por llenar|Precio de hoy/i.test(t)?'g':(AV_INFO.test(t)?'n':'o'))));
 if(veh&&!urg&&/en \d+ d[ií]as|en [\d,]+ km/.test(t)&&!/en [0-7] d[ií]as/.test(t))col='n';
 var tit=t,det='',m=/^no cuadra\s*·\s*(.*?)\s*(?:\((.*)\))?$/.exec(t);if(m){tit=m[1];det=m[2]||''}else{var i=t.indexOf(': ');if(i>8&&i<70){tit=t.slice(0,i);det=t.slice(i+2);det=det.charAt(0).toUpperCase()+det.slice(1)}}
 return {col:col,ic:ic,tit:tit,det:det,txt:t}}
function ic68(k){return k==='caja'?IC65.caja:(k==='kilo'?IC65.kilo:(IC68[k]||IC68.campana))}
var COL68={r:'#DC2626',o:'#EA580C',v:'#2563EB',g:'#16A34A',n:'#64748B'},NIV68={r:'Urgente',o:'Pronto',v:'Vehículo',g:'Falta un dato',n:'Para saber'};
(function(){var st=document.createElement('style');st.textContent=[
 /* 49 inventario */
 '.inv68{display:flex;flex-direction:column;gap:12px;column-span:all;-webkit-column-span:all;grid-column:1/-1;margin-top:12px}',
 '.inv68 .ban{display:flex;align-items:center;gap:12px;padding:14px 16px;cursor:pointer;margin:0!important}.inv68 .ban .ic{width:44px;height:44px;border-radius:14px;background:color-mix(in srgb,#16A34A 14%,var(--surface));color:#15803D;display:flex;align-items:center;justify-content:center;flex:none}.inv68 .ban .ic svg{width:24px;height:24px}',
 '.inv68 .ban .tt{font-size:19px;font-weight:800;line-height:1.2}.inv68 .ban .st{font-size:14px;color:var(--muted)}',
 '.inv68 .pc{padding:0!important;overflow:hidden;cursor:pointer;margin:0!important}',
 '.inv68 .pc .hd{display:flex;flex-wrap:wrap;align-items:center;gap:8px 12px;padding:14px 16px;color:#fff}.inv68 .pc.r .hd{background:#D97706}.inv68 .pc.m .hd{background:#15803D}',
 '.inv68 .pc .hd .ic{width:44px;height:44px;border-radius:14px;background:rgba(255,255,255,.22);display:flex;align-items:center;justify-content:center;flex:none}.inv68 .pc .hd .ic svg{width:26px;height:26px}',
 '.inv68 .pc .hd .lb{font-size:14px;font-weight:900;letter-spacing:.06em;text-transform:uppercase;opacity:.95}.inv68 .pc .hd .nb{font-size:34px;font-weight:900;line-height:1.05}.inv68 .pc .hd .u{font-size:16px;font-weight:700;margin-left:6px;opacity:.95;white-space:nowrap}',
 '.inv68 .pc .hd .chip{margin-left:auto;background:rgba(255,255,255,.22);border:1px solid rgba(255,255,255,.4);color:#fff;font-size:14px;font-weight:800;padding:6px 12px;border-radius:999px;white-space:nowrap}',
 '.inv68 .pc .bd{padding:14px 16px 16px}',
 '.inv68 .bar{display:flex;height:16px;border-radius:999px;overflow:hidden;background:var(--bg);border:1px solid var(--line);gap:2px}.inv68 .bar i{display:block;height:100%}',
 '.inv68 .g4{display:grid;grid-template-columns:repeat(4,1fr);gap:6px;margin-top:12px}.inv68 .mi{background:var(--bg);border:1px solid var(--line);border-radius:14px;padding:8px 2px;text-align:center}',
 '.inv68 .mi{border-top:4px solid var(--mc)!important;min-width:0}.inv68 .mi .k{font-size:12.5px;font-weight:800;letter-spacing:-.02em;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;color:var(--mc)}.inv68 .mi b{display:block;font-size:20px;font-weight:900;margin-top:2px}.inv68 .dot{width:10px;height:10px;border-radius:50%;flex:none}',
 '.inv68 .alc{margin-top:12px;font-size:16px;padding:10px 12px;border-radius:14px;display:flex;align-items:center;gap:10px;line-height:1.35;border:1.5px solid}',
 '.inv68 .alc.v{background:color-mix(in srgb,#16A34A 12%,var(--surface));border-color:color-mix(in srgb,#16A34A 40%,transparent)}.inv68 .alc.v b{color:#15803D}',
 '.inv68 .alc.a{background:color-mix(in srgb,#EAB308 16%,var(--surface));border-color:color-mix(in srgb,#CA8A04 45%,transparent)}.inv68 .alc.a b{color:#A16207}',
 '.inv68 .alc.r{background:color-mix(in srgb,#DC2626 12%,var(--surface));border-color:color-mix(in srgb,#DC2626 45%,transparent)}.inv68 .alc.r b{color:#B91C1C}',
 /* 50 avisos */
 '.av[data-c68]{display:flex!important;align-items:center;gap:12px!important;padding:14px 12px!important;border-radius:18px!important;border:1.5px solid color-mix(in srgb,var(--c68) 38%,transparent)!important;background:color-mix(in srgb,var(--c68) 11%,var(--surface))!important;font-size:17px!important;line-height:1.35;margin-top:10px!important;box-shadow:0 2px 6px rgba(15,23,42,.06)}',
 '.av[data-c68] .ic68{width:42px;height:42px;flex:none;color:var(--c68);display:flex;align-items:center;justify-content:center}.av[data-c68] .ic68 svg{width:36px;height:36px}',
 '.av[data-c68]>.lbl[aria-hidden]{font-size:34px!important;font-weight:900;color:var(--c68)!important;line-height:1;padding:0 2px}',
 '.av[data-c68] .avlv{display:none!important}.av[data-c68] .pos68{font-size:13px!important;min-height:30px!important;color:var(--muted)!important;padding:0!important;margin-top:2px}',
 'main{padding-bottom:calc(var(--navh,80px) + 96px)!important}',
 /* 61 ventana de aviso */
 '.pop68{background:var(--surface);border-radius:26px;max-width:420px;width:100%;overflow:hidden;box-shadow:0 20px 50px rgba(0,0,0,.35)}',
 '.pop68 .fr{display:flex;align-items:center;gap:10px;padding:12px 16px;color:#fff;background:linear-gradient(110deg,var(--c68) 0%,var(--c68) 60%,color-mix(in srgb,var(--c68) 55%,#fff) 60%,color-mix(in srgb,var(--c68) 55%,#fff) 66%,var(--c68) 66%)}',
 '.pop68 .fr svg{width:26px;height:26px}.pop68 .fr b{font-size:22px;font-weight:900;flex:1}.pop68 .fr .n{background:rgba(255,255,255,.92);color:var(--c68);font-weight:900;font-size:16px;padding:5px 12px;border-radius:999px}',
 '.pop68 .cu{display:flex;gap:14px;align-items:flex-start;padding:16px}.pop68 .cu .ic{width:72px;height:72px;border-radius:50%;flex:none;display:flex;align-items:center;justify-content:center;background:color-mix(in srgb,var(--c68) 14%,var(--surface));color:var(--c68)}.pop68 .cu .ic svg{width:40px;height:40px}',
 '.pop68 .cu .t{font-size:22px;font-weight:900;line-height:1.2}.pop68 .cu .m{font-size:17px;margin-top:6px;line-height:1.4}',
 '.pop68 .bt{display:flex;flex-direction:column;gap:10px;padding:0 16px 16px}.pop68 .bt .btn{min-height:58px;font-size:19px;font-weight:900;border-radius:18px}',
 '.pop68 .bt .btn.p{background:var(--c68)!important;color:#fff!important;border:0!important;display:flex;align-items:center;justify-content:center;gap:10px}.pop68 .bt .btn.p span{font-size:28px;line-height:1}',
 /* 52 PIN en modo oscuro */
 dk68(['#pinov{background:linear-gradient(180deg,#0B2A1E 0%,#0F172A 32%,#0B1120 100%)!important}',
  '#pinov .pw>b{color:#F1F5F9}','#pinov .pw{color:#E2E8F0}','#pinov .pw .lbl{color:#CBD5E1!important}',
  '#pinov .ses{background:#064E3B;color:#A7F3D0;border-color:#065F46}',
  '#pinov .dots i{background:#1E293B;border-color:#475569!important}',
  '#pinov .kp button{background:#1E293B!important;border-color:#334155!important;color:#F1F5F9!important}',
  '#pinov .kp button:active{background:#334155!important}','#pinov .kp button[data-act="pinb"]{background:#111827!important}',
  '#pinov .kp button.bio42{background:#064E3B!important;border-color:#047857!important;color:#6EE7B7!important}',
  '#pinov .huella{background:#1E293B!important;border-color:#334155!important;color:#F1F5F9!important}',
  '#pinov .pinmas .link{color:#93C5FD!important}','#pinov .pinmas .link+.link{color:#6EE7B7!important}',
  '#pinov .pw>img{border-color:#1E293B}'])
 ].join('\n');document.head.appendChild(st)})();

/* ---------- 49 · inventario ---------- */
function alc68(d,que){if(d==null||!isFinite(d))return '';var n=Math.floor(num(d)),c=d>=5?'v':(d>=2?'a':'r'),txt=d>=99?'muchos días':(n<1?'menos de 1 día':n+' día'+(n===1?'':'s'));
 return '<div class="alc '+c+'"><span style="font-size:20px">'+(c==='r'?'⚠️':'⏳')+'</span><span>Te alcanza para <b>'+txt+'</b> de '+que+'.'+(c==='r'?' <b>Programa el viaje.</b>':'')+'</span></div>'}
function bar68(L){var t=sum(L,function(x){return Math.max(0,num(x[1]))});if(!t)return '<div class="bar"></div>';return '<div class="bar" aria-hidden="true">'+L.filter(function(x){return num(x[1])>0}).map(function(x){return '<i style="width:'+(num(x[1])/t*100).toFixed(2)+'%;background:'+x[2]+'"></i>'}).join('')+'</div>'}
function mi68(k,v,c){return '<div class="mi" style="--mc:'+c+'"><div class="k">'+k+'</div><b>'+v+'</b></div>'}
inv65=function(old){var I=S.inv||{},mr=0,da={};try{mr=madR()}catch(e){}try{da=diasAlcanza()||{}}catch(e){}var mk=madKg65(),
  R=[['Verdes',num(I.verdes),'#16A34A'],['Madurando',mr,'#F59E0B'],['Maduras',num(I.maduras),'#CA8A04'],['Reparto',num(I.reparto),'#2563EB']],
  M=[['Verdes',num(I.kgVerde),'#16A34A'],['Madurando',mk,'#F59E0B'],['Maduras',num(I.kgMaduro),'#CA8A04'],['Reparto',num(I.repartoKg),'#2563EB']],
  tot=sum(R,function(x){return x[1]}),totK=sum(M,function(x){return x[1]}),at=' role="button" tabindex="0" data-act="tab" data-t="bodega"';
 var d=document.createElement('div');d.className='inv68';d.dataset.x='inv65';
 d.innerHTML='<div class="card ban"'+at+'><span class="ic">'+IC65.bodega+'</span><span class="grow"><div class="tt">Inventario de bodega</div><div class="st">Toca para ver la bodega</div></span><span style="font-size:26px;color:var(--muted)">›</span></div>'
  +'<div class="card pc r" data-x="invR"'+at+'><div class="hd"><span class="ic">'+IC65.caja+'</span><span><div class="lb">Roatán</div><div><span class="nb">'+n65(tot)+'</span><span class="u">cajas llenas</span></div></span><span class="chip">'+n65(I.vacias)+' taras vacías</span></div>'
  +'<div class="bd">'+bar68(R)+'<div class="g4">'+R.map(function(x){return mi68(x[0],n65(x[1]),x[2])}).join('')+'</div>'+alc68(da.R,'roatán')+'</div></div>'
  +'<div class="card pc m" data-x="invM"'+at+'><div class="hd"><span class="ic">'+IC65.kilo+'</span><span><div class="lb">Macho</div><div><span class="nb">'+n65(totK)+'</span><span class="u">kg</span></div></span></div>'
  +'<div class="bd">'+bar68(M)+'<div class="g4">'+M.map(function(x){return mi68(x[0],n65(x[1]),x[2])}).join('')+'</div>'+alc68(da.M,'macho')+'</div></div>';
 return d};

/* ---------- 50 · "Por atender": tarjetas de color con ícono ---------- */
/* avRow: pasó a tema-avisos.js */

/* ---------- 61 · ventana de aviso urgente ---------- */
var _popH68=popHTML;popHTML=function(){var h=_popH68.apply(this,arguments);if(!h)return h;try{var L=popItems(),i=S.popI||0,x=L[i];if(!x)return h;
  var raw=(x.b&&x.b[0]&&x.b[0][1]==='avgo')?decodeURIComponent((/data-k="([^"]*)"/.exec(x.b[0][2])||[])[1]||''):'',
   I=raw?avInfo68(raw):avInfo68(String(x.t||'')+': '+String(x.m||'').replace(/<[^>]*>/g,'')),col=raw?I.col:(/vencid|falla|faltante|fuera de servicio|Le debes|Falta el costo/i.test(x.t)?'r':(/Precio de hoy/i.test(x.t)?'o':I.col)),
   tit=raw?I.tit:esc(x.t),msg=raw?esc(I.det):x.m;if(raw)tit=esc(tit);
  var bs=(x.b||[]).map(function(b,j){var lab=j===0&&b[1]==='avgo'?'Atender':b[0];return '<button class="btn'+(j?' sec':' p')+'" data-act="'+b[1]+'"'+b[2]+' data-pop="1">'+lab+(j?'':'<span aria-hidden="true">›</span>')+'</button>'}).join('');
  return '<div style="position:fixed;inset:0;z-index:70;background:rgba(0,0,0,.55);display:flex;align-items:center;justify-content:center;padding:16px" class="fadein"><div class="popin pop68" role="dialog" aria-label="Aviso urgente" style="--c68:'+COL68[col]+'">'
   +'<div class="fr">'+'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2 1 21h22zm-1 7h2v6h-2zm0 8h2v2h-2z"/></svg><b>'+NIV68[col]+'</b><span class="n">'+(i+1)+' de '+L.length+'</span></div>'
   +'<div class="cu"><span class="ic">'+ic68(I.ic)+'</span><div><div class="t">'+tit+'</div>'+(msg?'<div class="m">'+msg+'</div>':'')+'</div></div>'
   +'<div class="bt">'+bs+'<button class="btn sec" data-act="popdesp">🕒 Después</button></div></div></div>'}catch(e){console.error('aviso 61',e);return h}};

/* ---------- 51 · "Mostrar/Ocultar" Finanzas ya no brinca: el navegador movía la pantalla al volver a dibujarla (anclaje del scroll) ---------- */
(function(){var st=document.createElement('style');st.textContent='html,body{overflow-anchor:none}';document.head.appendChild(st)})();

/* ---------- 59 · el mapa chico ya no se corre completo al arrastrarlo:
   tenía la marca de "deslizar para posponer aviso" (data-swipe) y ese gesto movía todo el cuadro ---------- */
(function(){var st=document.createElement('style');st.textContent='.leaflet-container,[data-vivo]{transform:none!important;opacity:1!important}';document.head.appendChild(st)})();
function mapSw68(){try{Array.prototype.forEach.call(document.querySelectorAll('.leaflet-container[data-swipe],[data-vivo][data-swipe],[data-mapa][data-swipe]'),function(el){if(el.getAttribute('data-swipe')==='mapa'){el.removeAttribute('data-swipe');el.setAttribute('data-noswipe','1')}})}catch(e){}}
var _rd68m=render;render=function(){var r=_rd68m.apply(this,arguments);mapSw68();return r};

/* ---------- 62a · el menú lateral: "Sugerencias" se veía verde (parecía seleccionado); ahora todos los botones del menú iguales ---------- */
/* ---------- 62b · la barra de abajo nunca se queda escondida al cambiar de pantalla o al desbloquear ---------- */
var _t68=null,_pin68=false;
var _rd68n=render;render=function(){var r=_rd68n.apply(this,arguments);try{
  Array.prototype.forEach.call(document.querySelectorAll('.drawer nav button.btn:not(.sec)'),function(b){b.classList.add('sec')});
  var t=S.role+':'+S.tab[S.role],pin=!!document.getElementById('pinov');
  if(t!==_t68||(_pin68&&!pin)||window.scrollY<=30){navHid=false;document.documentElement.classList.remove('navhid');var nv=document.querySelector('nav.tabs');if(nv)nv.classList.remove('hid')}
  _t68=t;_pin68=pin}catch(e){}return r};

/* ---------- 62c · numerito de la barra, 2º toque: va al pendiente EXACTO (baja y lo marca); si hay varios, cada toque pasa al siguiente ("1 de 4: …") ---------- */
/* avDestino: pasó a tema-avisos.js */
var _np68={};
tabPend48=function(t){var cas=['inicio','bodega','cargas','clientes','gastos','mas'],nv=document.querySelector('nav.tabs'),enBarra={};if(nv)Array.prototype.forEach.call(nv.querySelectorAll('button[data-t]'),function(b){enBarra[b.dataset.t]=1});
 var L=avSinEfecto(function(){var A=[];try{A=avisos().filter(function(x){return typeof x==='string'&&!(S.avPos||{})[x]})}catch(e){}
  return A.map(function(x){var d=null;try{d=avDestino(x)}catch(e){}return {x:x,t:(d&&d.t)||'inicio',u:AV_URG.test(x)||AV_ROJO.test(x)?1:0}}).filter(function(o){return t==='mas'?!enBarra[o.t]:o.t===t})});
 L.sort(function(a,b){return b.u-a.u});if(!L.length)return null;
 var k=_np68[t]||{i:-1,n:0};k.i=(k.i+1)%L.length;_np68[t]=k;var x=L[k.i].x;
 setTimeout(function(){try{var I=avInfo68(x);toast((L.length>1?(k.i+1)+' de '+L.length+': ':'')+I.tit)}catch(e){}},250);
 return x};
