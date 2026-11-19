/* ===================== v7.3 · diseño nuevo (ideas de Ricardo, 10 nov): Inicio y Bodega primero
   Estilo: tarjetas blancas muy redondeadas, ícono en cuadrito de color, números grandes, fondo gris claro.
   Letra y botones GRANDES (para el dueño). Palabras: "caja" = llena, "tara" = vacía. Todo dentro del APK (sin internet). ===================== */
(function(){var L=':is(html[data-theme="light"])';var st=document.createElement('style');st.textContent=[
 /* colores en modo claro */
 'html[data-theme="light"]{--bg:#F1F5F9;--surface:#FFFFFF;--line:#E2E8F0;--sh:0 1px 2px rgba(15,23,42,.04),0 4px 14px rgba(15,23,42,.05)}',
 '@media (prefers-color-scheme: light){html:not([data-theme]){--bg:#F1F5F9;--surface:#FFFFFF;--line:#E2E8F0;--sh:0 1px 2px rgba(15,23,42,.04),0 4px 14px rgba(15,23,42,.05)}}',
 /* tarjetas */
 'main .card{border-radius:22px;border:1px solid var(--line);box-shadow:var(--sh)}',
 'main .card.note{border-radius:22px}',
 /* encabezado */
 'header.top{background:var(--surface);border-bottom:1px solid var(--line);box-shadow:0 1px 2px rgba(15,23,42,.04)}',
 'header.top .helpb{width:46px;height:46px;min-height:46px;border-radius:50%;background:var(--bg);border:0;font-size:20px}',
 'header.top .logo{border-radius:16px;overflow:hidden}',
 /* barra de abajo: la sección activa en una pastilla de su color */
 'nav.tabs{background:var(--surface);border-top:1px solid var(--line)}',
 'nav.tabs button[aria-pressed="true"]{background:color-mix(in srgb,var(--tc,#2F7D32) 12%,transparent);border-radius:16px;color:var(--tc,#2F7D32);font-weight:800}',
 /* piezas del diseño nuevo */
 '.n65{padding:16px}.n65 .hd{display:flex;align-items:center;gap:10px;margin-bottom:12px}.n65 .ic{width:42px;height:42px;border-radius:14px;display:flex;align-items:center;justify-content:center;flex:none}',
 '.n65 .ic svg{width:22px;height:22px}.n65 .tt{font-size:19px;font-weight:800;line-height:1.2}.n65 .st{font-size:14px;color:var(--muted)}',
 '.n65 .g2{display:grid;grid-template-columns:1fr 1fr;gap:10px}.n65 .g4{display:grid;grid-template-columns:repeat(4,1fr);gap:6px;margin-top:10px}',
 '.n65 .tile{background:var(--bg);border:1px solid var(--line);border-radius:18px;padding:12px}.n65 .tile .k{font-size:14px;font-weight:700;color:var(--muted);display:flex;align-items:center;gap:6px}',
 '.n65 .big{font-size:30px;font-weight:900;line-height:1.1;margin-top:4px}.n65 .u{font-size:14px;font-weight:700;color:var(--muted);margin-left:4px}',
 '.n65 .mini{background:var(--surface);border:1px solid var(--line);border-radius:14px;padding:8px 4px;text-align:center}.n65 .mini .k{font-size:13px;font-weight:700;justify-content:center}.n65 .mini b{font-size:19px;display:block}',
 '.n65 .row2{display:flex;justify-content:space-between;font-size:15px;margin-top:4px}.n65 .sep{border-top:1px solid var(--line);margin:10px 0 0;padding-top:8px}',
 '.n65 .dot{width:10px;height:10px;border-radius:50%;display:inline-block;flex:none}',
 '.n65 .chip{display:inline-flex;align-items:center;gap:6px;font-size:14px;font-weight:800;padding:6px 12px;border-radius:999px;background:var(--bg)}',
 '.n65 .alc{margin-top:10px;font-size:15px;padding:10px 12px;border-radius:14px;display:block;line-height:1.4}',
 '.n65 .acts{display:flex;gap:8px;margin-top:12px}.n65 .acts .btn{flex:1;min-height:52px;font-size:17px}',
 '.n65 .blk{background:var(--bg);border:1px solid var(--line);border-radius:18px;padding:12px;margin-top:10px}.n65 .blk .lab{font-size:14px;font-weight:800;text-transform:uppercase;letter-spacing:.03em;display:flex;align-items:center;gap:6px}',
 '.n65 .lote{border-radius:18px;padding:12px;border:1px solid var(--line);background:var(--bg);margin-top:8px}.n65 .lote .q{font-size:18px;font-weight:900}.n65 .tag{font-size:13px;font-weight:900;padding:5px 10px;border-radius:999px;white-space:nowrap}',
 '.t65{display:flex;align-items:flex-end;justify-content:space-between;gap:8px;margin:6px 2px 4px}.t65 h1{margin:0}.t65 .st{font-size:15px;color:var(--muted)}',
 /* "Datos que faltan": naranja como en el diseño */
 '.dfbub{background:linear-gradient(90deg,#E8890C,#D97706)!important;color:#fff!important;border:0!important;border-radius:20px!important;box-shadow:0 6px 16px rgba(217,119,6,.25)!important}',
 '[data-x="exist65"],[data-x="antig65"]{column-span:all;-webkit-column-span:all;grid-column:1/-1}',
 '.sugmad{background:color-mix(in srgb,#16A34A 8%,var(--surface))!important;border-color:color-mix(in srgb,#16A34A 30%,transparent)!important}'
 ].join('\n');document.head.appendChild(st)})();

var IC65={caja:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M19,4H5C3.89,4 3,4.89 3,6V18C3,19.11 3.89,20 5,20H19C20.11,20 21,19.11 21,18V6C21,4.89 20.11,4 19,4M5,6H19V8H5V6M5,10H8V14H5V10M10,10H14V14H10V10M19,18H5V16H19V18M19,14H16V10H19V14Z"/></svg>',
 tag:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 12l-8 8-9-9V3h8z"/><circle cx="7.5" cy="7.5" r="1.5"/></svg>',
 kilo:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8h12l2 12H4z"/><circle cx="12" cy="5" r="2"/></svg>',
 reloj:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
 bodega:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linejoin="round"><path d="M3 9l9-5 9 5v11H3z"/><path d="M8 20v-6h8v6"/></svg>',
 foco:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-4 10.5c.7.7 1 1.5 1 2.5h6c0-1 .3-1.8 1-2.5A6 6 0 0 0 12 3z"/></svg>'};
function n65(v){return Math.round(num(v)).toLocaleString('es-MX')}
function mini65(k,v,col){return '<div class="mini"><div class="k" style="color:'+col+'"><span class="dot" style="background:'+col+'"></span>'+k+'</div><b>'+v+'</b></div>'}
function madKg65(){return sum((S.lotes||[]).filter(function(l){return l.prod==='M'}),function(l){return num(l.q)})}

/* ---------- Inicio: "Precio de hoy" ---------- */
function precio65(old){var P=S.precio||{},hoy=iso(TODAY),ok=P.conf===hoy,cR=0,cM=0;try{cR=costoCajaAct()}catch(e){}try{cM=costoKgMAct()}catch(e){}var may=S.mayMin||{};
 var d=document.createElement('div');d.className='card n65';d.dataset.x='precio65';
 d.innerHTML='<div class="hd"><span class="ic" style="background:#FEF3C7;color:#B45309">'+IC65.tag+'</span><span class="grow"><div class="tt">Precio de hoy</div><div class="st" style="color:'+(ok?'var(--accent)':'var(--danger)')+';font-weight:700">'+(ok?'✓ Ya lo confirmaste hoy':'Falta confirmarlo hoy')+'</div></span></div>'
  +'<div class="g2"><div class="tile"><div class="k"><span style="color:#EA580C;width:18px;height:18px;display:inline-flex">'+IC65.caja+'</span>Caja de roatán</div><div class="big">'+money(num(P.R))+'</div><div class="sep"></div><div class="row2"><span>Costo</span><b>'+(cR?money(cR):'—')+'</b></div><div class="row2"><span>Mayoreo</span><b style="color:var(--accent)">'+(num(may.R)?'≥ '+money(num(may.R)):'—')+'</b></div></div>'
  +'<div class="tile"><div class="k"><span style="color:#16A34A;width:18px;height:18px;display:inline-flex">'+IC65.kilo+'</span>Kilo de macho</div><div class="big">'+money(num(P.M))+'</div><div class="sep"></div><div class="row2"><span>Costo</span><b>'+(cM?money(cM):'—')+'</b></div><div class="row2"><span>Mayoreo</span><b style="color:var(--accent)">'+(num(may.M)?'≥ '+money(num(may.M)):'—')+'</b></div></div></div>'
  +'<div class="acts"></div>';
 /* los mismos botones de antes (misma función): se copian */
 var A=d.querySelector('.acts');Array.prototype.forEach.call(old.querySelectorAll('[data-act="precioed"],[data-act="precioconf"]'),function(b){var c=b.cloneNode(true);c.className='btn'+(c.dataset.act==='precioed'?' sec':'');c.style.cssText='';if(c.dataset.act==='precioed'&&!/\w/.test(c.textContent))c.textContent='Cambiar';A.appendChild(c)});
 if(!A.children.length)A.remove();return d}
/* ---------- Inicio: "Inventario de bodega" ---------- */
function inv65(old){var I=S.inv||{},mr=0,da={};try{mr=madR()}catch(e){}try{da=diasAlcanza()||{}}catch(e){}var tot=num(I.verdes)+mr+num(I.maduras)+num(I.reparto),mk=madKg65(),totK=num(I.kgVerde)+mk+num(I.kgMaduro)+num(I.repartoKg);
 var d=document.createElement('div');d.className='card n65';d.dataset.x='inv65';d.setAttribute('role','button');d.tabIndex=0;d.dataset.act='tab';d.dataset.t='bodega';
 var dias=function(x){x=num(x);return x>=99?'muchos días':'~'+Math.floor(x)+' día'+(Math.floor(x)===1?'':'s')};
 d.innerHTML='<div class="hd"><span class="ic" style="background:#DCFCE7;color:#15803D">'+IC65.bodega+'</span><span class="grow"><div class="tt">Inventario de bodega</div><div class="st">Toca para ver la bodega</div></span><span style="font-size:22px;color:var(--muted)">›</span></div>'
  +'<div class="blk" style="margin-top:0"><div style="display:flex;justify-content:space-between;align-items:flex-start;gap:8px"><div><div class="lab" style="color:#C2410C"><span style="width:18px;height:18px;display:inline-flex">'+IC65.caja+'</span>Roatán</div><div><span class="big">'+n65(tot)+'</span><span class="u">cajas llenas</span></div></div><span class="chip">'+n65(I.vacias)+' taras vacías</span></div>'
  +'<div class="g4">'+mini65('Verdes',n65(I.verdes),'#16A34A')+mini65('Madurando',n65(mr),'#D97706')+mini65('Maduras',n65(I.maduras),'#CA8A04')+mini65('Reparto',n65(I.reparto),'#2563EB')+'</div>'
  +(da.R!=null?'<div class="alc" style="background:#FFFBEB;color:#78350F">⏳ Te alcanza para <b>'+dias(da.R)+'</b> de roatán.</div>':'')+'</div>'
  +'<div class="blk"><div class="lab" style="color:#15803D"><span style="width:18px;height:18px;display:inline-flex">'+IC65.kilo+'</span>Macho</div><div><span class="big">'+n65(totK)+'</span><span class="u">kg</span></div>'
  +'<div class="g4">'+mini65('Verdes',n65(I.kgVerde),'#16A34A')+mini65('Madurando',n65(mk),'#D97706')+mini65('Maduras',n65(I.kgMaduro),'#CA8A04')+mini65('Reparto',n65(I.repartoKg),'#2563EB')+'</div>'
  +(da.M!=null?'<div class="alc" style="background:#F0FDF4;color:#14532D">⏳ Te alcanza para <b>'+dias(da.M)+'</b> de macho.</div>':'')+'</div>';
 return d}
function inicio65(m){var pr=m.querySelector('.card.pfix');if(pr&&!m.querySelector('[data-x="precio65"]')){var n=precio65(pr);pr.before(n);pr.style.display='none'}
 var cj=m.querySelector('.card.dcaja');if(cj&&!m.querySelector('[data-x="inv65"]')){var v=inv65(cj),ref=m.querySelector('[data-x="precio65"]');(ref||cj).after(v);cj.style.display='none';
  /* "Por atender" justo después del inventario */
  var pa=Array.prototype.filter.call(m.querySelectorAll(':scope > .card'),function(c){var b=c.querySelector('.tt');return b&&/^Por atender/.test(b.textContent)})[0];if(pa){v.after(pa);var inf=m.querySelector(':scope > details[data-k="avinfo"]');if(inf)pa.after(inf)}}}

/* ---------- Bodega ---------- */
function bodTit65(m){var h=m.querySelector(':scope > h1');if(!h||h.dataset.x65)return;h.dataset.x65='1';var b=(S.bods||[]).filter(function(x){return +x.id===+(S.bodSel||1)})[0]||(S.bods||[])[0]||{n:'Bodega'};
 var w=document.createElement('div');w.className='t65';w.innerHTML='<span><h1>Bodega</h1><div class="st">Lo que hay y la maduración</div></span><span class="chip" style="display:inline-flex;align-items:center;gap:6px;font-size:15px;font-weight:800;padding:8px 14px;border-radius:999px;background:var(--surface);border:1px solid var(--line)"><span style="width:18px;height:18px;display:inline-flex;color:#16A34A">'+IC65.bodega+'</span>'+esc(String(b.n||'').replace(/^Bodega\s+/i,''))+'</span>';h.replaceWith(w)}
function exist65(old){var I=S.inv||{},b=(S.bods||[]).filter(function(x){return +x.id===+(S.bodSel||1)})[0]||{n:'Bodega'};var d=document.createElement('div');d.className='card n65';d.dataset.x='exist65';
 var t=function(k,v,u,col,bg){return '<div class="tile" style="background:'+bg+'"><div class="k" style="color:'+col+'"><span class="dot" style="background:'+col+'"></span>'+k+'</div><div><span class="big">'+n65(v)+'</span><span class="u">'+u+'</span></div></div>'};
 d.innerHTML='<div class="hd"><span class="ic" style="background:#FFEDD5;color:#EA580C">'+IC65.caja+'</span><span class="grow"><div class="tt">Existencias en bodega</div><div class="st">'+esc(b.n)+' (solo consulta)</div></span></div>'
  +'<div class="lab" style="font-size:14px;font-weight:800;color:#C2410C;display:flex;justify-content:space-between;margin:2px 2px 6px"><span>ROATÁN</span><span style="color:var(--fg)">'+n65(num(I.verdes)+num(I.maduras))+' cajas</span></div>'
  +'<div class="g2">'+t('Verdes',I.verdes,'cajas','#15803D','color-mix(in srgb,#16A34A 7%,var(--surface))')+t('Maduras',I.maduras,'cajas','#B45309','color-mix(in srgb,#F59E0B 9%,var(--surface))')+'</div>'
  +'<div class="lab" style="font-size:14px;font-weight:800;color:#15803D;display:flex;justify-content:space-between;margin:14px 2px 6px"><span>MACHO</span><span style="color:var(--fg)">'+n65(num(I.kgVerde)+num(I.kgMaduro))+' kg</span></div>'
  +'<div class="g2">'+t('Verdes',I.kgVerde,'kg','#15803D','color-mix(in srgb,#16A34A 7%,var(--surface))')+t('Maduros',I.kgMaduro,'kg','#B45309','color-mix(in srgb,#F59E0B 9%,var(--surface))')+'</div>';return d}
function antig65(){var L=(S.madL||[]).filter(function(x){return num(x.q)>0});if(!L.length)return null;var v=3;try{v=vidaDias()}catch(e){}
 L=L.slice().sort(function(a,b){return String(a.dia).localeCompare(String(b.dia))});
 var d=document.createElement('div');d.className='card n65';d.dataset.x='antig65';
 d.innerHTML='<div class="hd"><span class="ic" style="background:#DBEAFE;color:#2563EB">'+IC65.reloj+'</span><span class="grow"><div class="tt">Fruta madura por antigüedad</div><div class="st">Sale primero la más vieja</div></span></div>'
  +'<div class="alc" style="background:var(--bg);border:1px solid var(--line);margin-top:0">🌡️ Ya madura aguanta <b>~'+v+' día'+(v===1?'':'s')+'</b> con este clima.</div>'
  +L.map(function(x){var e=0;try{e=madEdad(x)}catch(er){}var q=v-e,mal=q<=0,man=q===1,col=mal?'#B91C1C':(man?'#B45309':'#15803D'),bg=mal?'color-mix(in srgb,#DC2626 7%,var(--surface))':'var(--bg)',tag=mal?'Pasada de tiempo':(man?'Sale mañana':'Lista para salir'),tbg=mal?'#DC2626':(man?'#FEF3C7':'#DCFCE7'),tfg=mal?'#fff':col;
   return '<div class="lote" style="background:'+bg+';border-color:'+(mal?'color-mix(in srgb,#DC2626 30%,transparent)':'var(--line)')+'"><div style="display:flex;justify-content:space-between;gap:8px;align-items:flex-start"><span><div class="q">'+(x.p==='R'?n65(x.q)+' cajas de roatán':n65(x.q)+' kg de macho')+'</div><div class="st">Salió de madurar '+(e<=0?'hoy':'hace <b style="color:'+col+'">'+e+' día'+(e===1?'':'s')+'</b>')+'</div></span><span class="tag" style="background:'+tbg+';color:'+tfg+'">'+tag+'</span></div>'
    +(mal?'<div class="st" style="color:#B91C1C;font-weight:700;margin-top:8px;padding-top:8px;border-top:1px solid color-mix(in srgb,#DC2626 25%,transparent)">⚠️ Revisarla o rematarla hoy</div>':'')+'</div>'}).join('');return d}
function bodega65(m){bodTit65(m);var ex=m.querySelector('.card.exist');if(ex&&!m.querySelector('[data-x="exist65"]')){var n=exist65(ex);ex.before(n);ex.style.display='none';var a=antig65();if(a)n.after(a)}
 Array.prototype.forEach.call(m.querySelectorAll(':scope > .card'),function(c){if(/^\s*Sugerencia|meter a madurar|Por hoy no hace falta/i.test(c.textContent.slice(0,80)))c.classList.add('sugmad')})}

/* render: pasó a tema-dibujar1.js */
/* el tutorial y las guías apuntan a las tarjetas nuevas */
try{if(TUT.admin&&TUT.admin[0])TUT.admin[0][0]='[data-x="precio65"], .card.deco-pl, .card.pfix'}catch(e){}
