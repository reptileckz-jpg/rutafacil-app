/* ===================== v3.9 · 1. Colores, imágenes y placas ===================== */
/* el PIN se vuelve a pedir si no se usa la app: admin y contador 5 min, chofer y venta local 30 min.
   (va aquí para que se registre antes que todo: el primer toque después de la espera solo desbloquea) */
function pinLimMin(k){k=k||pinKey();return /^a:/.test(k)||k==='cont'?5:30}
var _pinAct=Date.now(),_pinTrag=0;
function pinBloq(){if(window.__pnTest||!_pin||_pin.modo||(S.setup&&!S.setup.fin))return false;var k=pinKey();if(!S.pinOk[k])return false;
 var lim=pinLimMin(k);if(Date.now()-_pinAct<lim*60000)return false;
 Object.keys(S.pinOk).forEach(function(x){S.pinOk[x]=false});S.toast='';S.undo=null;_pin={v:'',modo:'entrar',cb:null,k:k,bloq:lim};return true}
function pinActividad(e){if(pinBloq()){render();_pinTrag=Date.now();if(e.cancelable)e.preventDefault();e.stopImmediatePropagation();return}if(e.type==='pointerdown')_pinTrag=0;_pinAct=Date.now()}
['pointerdown','touchstart','keydown','input','wheel'].forEach(function(t){document.addEventListener(t,pinActividad,{capture:true,passive:false})});
document.addEventListener('scroll',function(){if(!_pin||!_pin.modo)_pinAct=Date.now()},true);
document.addEventListener('click',function(e){if(_pinTrag&&Date.now()-_pinTrag<900){_pinTrag=0;e.preventDefault();e.stopImmediatePropagation()}},true);
setInterval(function(){if(!document.hidden&&pinBloq())render()},15000);
document.addEventListener('visibilitychange',function(){if(!document.hidden&&pinBloq())render()});

var IMG={pl:"__IMG_platanos__",caja:"__IMG_caja__",efe:"__IMG_efectivo_w__",ing:"__IMG_ingresos_w__",gas:"__IMG_gastos_w__",deb:"__IMG_deben_w__",prov:"__IMG_proveedores_w__",tk:"__IMG_ticket__"};
/* barra: un color por sección, más oscuros para que la letra blanca se lea (contraste 4.5 o más) */
(function(){var D={bodega:'#8A6500',cargas:'#A84F06',viaje:'#A84F06',personal:'#0B6B61',inicio:'#2E7531',ruta:'#2E7531',local:'#2E7531',cres:'#2E7531'};Object.keys(D).forEach(function(k){TCOL[k]=D[k]})})();
(function(){var css=[
 /* dibujos de fondo */
 '.card.deco-pl,.card.note.deco-pl,.card.deco-din{background-image:none!important}',
 '.dban,.dcaja{position:relative;overflow:hidden}.dban>*,.dcaja>*{position:relative;z-index:1}',
 '.dban::after,.dcaja::after{content:"";position:absolute;right:-6px;bottom:-8px;width:118px;height:104px;background:no-repeat right bottom/contain;opacity:.30;pointer-events:none;z-index:0}',
 '.dban::after{background-image:url('+IMG.pl+')}.dcaja::after{background-image:url('+IMG.caja+')}',
 'html[data-theme="dark"] .dban::after,html[data-theme="dark"] .dcaja::after{opacity:.18;filter:invert(1) hue-rotate(180deg)}',
 '@media (prefers-color-scheme:dark){:root:not([data-theme="light"]) .dban::after,:root:not([data-theme="light"]) .dcaja::after{opacity:.18;filter:invert(1) hue-rotate(180deg)}}',
 '.card.pfix.dban::after{display:none}',
 '.dban::after,.dcaja::after{display:none!important}',
 '.fin.k-caja{--ico:url('+IMG.efe+')}.fin.k-in{--ico:url('+IMG.ing+')}.fin.k-out{--ico:url('+IMG.gas+')}.fin.k-fan{--ico:url('+IMG.deb+')}.fin.k-prov{--ico:url('+IMG.prov+')}',
 '.fin{background-size:118px auto,auto!important;background-position:right -6px bottom -6px,0 0!important}',
 '.fin.c-n{--grad:linear-gradient(150deg,#5A7389,#3E5466)}',
 /* el precio late entre rojos oscuros (letra blanca siempre legible) */
 '@keyframes pnLate{0%,100%{box-shadow:0 0 0 0 rgba(198,40,40,.55);background:#C62828}50%{box-shadow:0 0 0 12px rgba(198,40,40,0);background:#B71C1C}}',
 '.card.pfix{background:#C62828!important}',
 /* estado siempre con palabra o símbolo, no solo color */
 '.pill.warn::before{content:"⚠ "}',
 /* avisos por nivel */
 '.avl{border-left:5px solid var(--info)}.avl.r{border-left-color:var(--danger)}.avl.o{border-left-color:var(--orange)}',
 '.avlv{display:inline-block;font-size:11px;font-weight:800;padding:1px 7px;border-radius:99px;margin-right:6px;color:#fff;background:var(--info)}.avlv.r{background:var(--danger)}.avlv.o{background:var(--orange)}',
 /* placas */
 '.plate{display:block;width:100%;max-width:300px;height:auto;filter:drop-shadow(0 3px 6px rgba(0,0,0,.18))}.plate.mini{max-width:116px;filter:none;margin-top:3px}'
];var st=document.createElement('style');st.textContent=css.join('\n');document.head.appendChild(st)})();
function gastoUsual(){var d0=iso(new Date(TODAY.getTime()-7*864e5)),L=HIST.filter(function(r){return r.d>=d0});return L.length?sum(L,function(r){return r.gt})/L.length:0}

/* ---- Avisos con color según su nivel ---- */
var AV_ROJO=/vencid|Falta pagar|se pasan mañana|pasó su tiempo|sin devolver hace|URGENTE|Faltaron|negativo|no cuadra|sin señal|Fuera de servicio/i,AV_NAR=/vence|toca|en \d+ km|pronto|por vencer|calibrar|Le toca|Mañana toca|Merma por aprobar|corrigió|por aprobar/i;
function avNivel(x){return AV_ROJO.test(x)?'r':(AV_NAR.test(x)?'o':'b')}
function avisosHTML(av){if(!av.length)return '';var U=av.filter(function(x){return AV_URG.test(x)}),I=av.filter(function(x){return !AV_URG.test(x)&&AV_INFO.test(x)}),N=av.filter(function(x){return U.indexOf(x)<0&&I.indexOf(x)<0});
 var lv={r:'Urgente',o:'Pronto',b:'Info'},row=function(x){var n=avNivel(x);return avRow(x).replace('class="av"','class="av avl '+n+'"').replace(/(role="button" tabindex="0"[^>]*>)/,'$1<span class="avlv '+n+'">'+lv[n]+'</span>')};
 N.sort(function(a,b){var o={r:0,o:1,b:2};return o[avNivel(a)]-o[avNivel(b)]});
 return (U.length?'<div class="card alert" style="border-width:2px"><b class="neg">Urgente</b>'+U.map(row).join('')+'</div>':'')
  +(N.length?'<div class="card"><b class="tt">Avisos</b><div class="lbl">Toca uno para ir a ese apartado. Deslízalo hacia un lado para posponerlo a mañana.</div>'+N.map(row).join('')+'</div>':'')
  +(I.length?'<details class="card" data-k="avinfo"'+(S.dOpen.avinfo?' open':'')+'><summary><b>Para tu información</b><span class="lbl">'+I.length+' · se borran solos mañana</span></summary>'+I.map(row).join('')+'</details>':'')}

/* ---- Placas dibujadas (Veracruz y Guerrero) ---- */
function plEdo(v){return v.plEdo||(v.id===2?'Guerrero':'Veracruz')}
function plTipoTxt(v){return 'TRANSPORTE PRIVADO '+((v.plTipo||(v.id===2?'carga':'auto'))==='carga'?'DE CARGA':'AUTOMÓVIL')}
function plateSVG(v,mini){var n=String(v.pl||'').toUpperCase().trim()||'SIN PLACA',e=plEdo(v),F='font-family="Arial Narrow,Roboto Condensed,PN Inter,Arial,sans-serif"',x='';
 var qr='<g transform="translate(262,9)"><rect width="28" height="28" rx="2" fill="#fff" stroke="#bbb"/>'+[0,1,2,3,4,5,6].map(function(i){return [0,1,2,3,4,5,6].map(function(j){return ((i*7+j*3+i*j)%3===0)?'<rect x="'+(2+j*3.5)+'" y="'+(2+i*3.5)+'" width="3.2" height="3.2" fill="#333"/>':''}).join('')}).join('')+'</g>';
 var seal=function(cx,col){return '<g><circle cx="'+cx+'" cy="128" r="11" fill="none" stroke="'+col+'" stroke-width="1.6"/><circle cx="'+cx+'" cy="128" r="6.5" fill="none" stroke="'+col+'" stroke-width="1"/></g>'};
 if(e==='Guerrero'){var g='#7A1F2E';
  x='<rect x="1.5" y="1.5" width="297" height="147" rx="12" fill="#fff" stroke="#3a3a3a" stroke-width="2"/>'
   +'<text x="18" y="33" font-size="17" font-weight="900" fill="#111" '+F+'>F</text><text x="52" y="33" font-size="12" font-weight="800" fill="'+g+'" '+F+'>12</text>'
   +'<g transform="translate(112,10)" fill="#B28B3A"><path d="M12 2c4 5 8 6 10 12-4-1-7-3-10-6-3 3-6 5-10 6 2-6 6-7 10-12z"/><rect x="11" y="14" width="2" height="9"/></g>'
   +'<text x="140" y="21" font-size="8" fill="#6b5a2e" '+F+'>TRANSFORMANDO</text><text x="140" y="33" font-size="14" font-weight="900" fill="#5b4a22" '+F+'>GUERRERO</text><text x="140" y="41" font-size="6" fill="'+g+'" '+F+'>GOBIERNO DEL ESTADO</text>'+qr
   +'<rect x="3" y="47" width="294" height="62" fill="'+g+'"/>'+[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28].map(function(i){var px=8+i*10;return '<path d="M'+px+' 49l3 3-3 3-3-3z M'+px+' 102l3 3-3 3-3-3z" fill="#A65563"/>'}).join('')
   +'<text x="150" y="99" text-anchor="middle" font-size="54" font-weight="900" fill="#fff" '+F+' textLength="248" lengthAdjust="spacingAndGlyphs">'+esc(n)+'</text>'
   +seal(24,'#9a9a9a')+seal(276,'#B28B3A')+'<rect x="66" y="119" width="168" height="16" rx="8" fill="'+g+'"/><text x="150" y="130.5" text-anchor="middle" font-size="8.6" font-weight="800" fill="#fff" '+F+'>'+plTipoTxt(v)+'</text>'}
 else{var m='#8E1F3E';
  x='<rect x="1.5" y="1.5" width="297" height="147" rx="12" fill="#fff" stroke="#3a3a3a" stroke-width="2"/>'
   +'<path d="M4 14a10 10 0 0 1 10-10h272a10 10 0 0 1 10 10v30H4z" fill="'+m+'"/>'
   +'<path d="M4 44h292v6H4z" fill="#F4D7DE"/>'+[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36].map(function(i){var px=4+i*8;return '<path d="M'+px+' 50l4 5 4-5z" fill="'+(i%2?'#D9A23A':m)+'"/>'}).join('')
   +'<rect x="12" y="10" width="20" height="27" rx="3" fill="#fff"/><text x="22" y="31" text-anchor="middle" font-size="17" font-weight="900" fill="#111" '+F+'>F</text>'
   +'<rect x="40" y="12" width="20" height="20" rx="3" fill="#DCDDE8" stroke="#fff"/><path d="M44 28l12-12M48 30l10-10" stroke="#fff" stroke-width="1.4" opacity=".8"/>'
   +'<g transform="translate(78,10)"><path d="M10 0l10 4v9c0 7-5 11-10 13C5 24 0 20 0 13V4z" fill="#E9C46A" stroke="#fff" stroke-width="1"/><path d="M5 8h10M5 13h10" stroke="'+m+'" stroke-width="1.6"/></g>'
   +'<text x="176" y="35" text-anchor="middle" font-size="25" font-weight="900" fill="#fff" '+F+' textLength="150" lengthAdjust="spacingAndGlyphs">VERACRUZ</text>'+qr
   +'<text x="150" y="107" text-anchor="middle" font-size="56" font-weight="900" fill="#111" '+F+' textLength="250" lengthAdjust="spacingAndGlyphs">'+esc(n)+'</text>'
   +'<text x="66" y="128" text-anchor="middle" font-size="13" font-weight="800" fill="'+m+'" '+F+'>SICT</text>'
   +'<g transform="translate(122,115)"><path d="M0 4l6-4 6 4-6 4z M3 9l6-4 6 4-6 4z" fill="'+m+'"/><text x="18" y="7" font-size="6" fill="'+m+'" '+F+'>POR AMOR A</text><text x="18" y="15" font-size="9" font-weight="900" fill="'+m+'" '+F+'>VERACRUZ</text></g>'
   +'<text x="240" y="128" text-anchor="middle" font-size="14" font-weight="800" fill="'+m+'" '+F+'>30</text>'
   +seal(22,'#C79AA6')+seal(278,'#C79AA6')+'<text x="150" y="143" text-anchor="middle" font-size="8.4" font-weight="800" fill="#111" '+F+'>'+plTipoTxt(v)+'</text>'}
 return '<svg class="plate'+(mini?' mini':'')+'" viewBox="0 0 300 150" role="img" aria-label="Placa '+esc(n)+' de '+e+'">'+x+'</svg>'}
/* en la lista de vehículos la placa se ve dibujada en chiquito */
var _vbL=vehBasic;vehBasic=function(v,warn){var h=_vbL.apply(this,arguments);return h.replace('<span class="lbl">'+esc(v.pl)+(v.color?' · '+esc(v.color):'')+'</span><br>',plateSVG(v,true)+'<span class="lbl">'+(v.color?esc(v.color):'')+'</span><br>')};
/* imágenes de vehículo para escoger */
var VEH_IMGS=[['Nissan NP300 (foto)',function(){return FOTO_NP}],['Freightliner M2 (foto)',function(){return FOTO_FL}],['Camioneta (dibujo)',function(){return vehImg('pick','#F3F3F0','#C9CCD1')}],['Camión (dibujo)',function(){return vehImg('truck','#F4F4F2','#1F4E9A')}]];
function vehEsCamion(i){return /Cami[oó]n|M2/.test((VEH_IMGS[+i]||[''])[0])}
