/* ===================== v7.4 · diseños de Ricardo (10 nov): 38 tarjeta reparto 1 · 39 datos pendientes · 40 pedidos por WhatsApp
   41 tarjetas paso a paso estilo "Viaje de carga" · 42 pantalla del PIN · 43 tarjetas de vehículos
   Se conservan los datos y palabras de siempre (caja = llena, tara = vacía). Letra y botones grandes. Sin internet. ===================== */
(function(){var st=document.createElement('style');st.textContent=[
 /* 38 · tarjeta reparto 1 */
 '.rep1{border-radius:24px!important;overflow:hidden;padding:0!important;border:0!important;background:linear-gradient(135deg,#DCFCE7,#CCFBF1)!important;box-shadow:0 6px 18px rgba(21,128,61,.15)!important}',
 '.rep1 .h{display:flex;align-items:center;gap:10px;padding:14px 16px 6px;font-size:20px;font-weight:700;color:#14532D}.rep1 .h svg{width:34px;height:34px}',
 '.rep1 .bx{display:grid;grid-template-columns:1fr 1fr;gap:10px;padding:8px 14px 14px}.rep1 .b{background:#fff;border-radius:18px;padding:12px;display:flex;align-items:center;gap:10px;box-shadow:0 2px 8px rgba(0,0,0,.06)}',
 '.rep1 .b svg{width:52px;height:52px;flex:none}.rep1 .n{font-size:38px;font-weight:900;line-height:1;color:#15803D}.rep1 .n small{font-size:20px;font-weight:900;margin-left:4px}.rep1 .l{font-size:15px;color:#334155}',
 '.rep1 .ft{display:flex;align-items:center;justify-content:center;gap:8px;background:#86EFAC;color:#14532D;font-weight:800;font-size:17px;padding:12px 14px;text-align:center}.rep1.mal .ft{background:#FDBA74;color:#7C2D12}.rep1.mal .n{color:#C2410C}',
 /* 39 · datos pendientes (más llamativo: alerta) */
 '.dfbub{background:linear-gradient(110deg,#0F172A 0%,#1E293B 45%,#9A3412 82%,#EA580C 100%)!important;color:#fff!important;border:2px solid #F59E0B!important;border-radius:24px!important;box-shadow:0 8px 22px rgba(234,88,12,.35)!important}',
 '.dfbub .dfi{width:52px;height:52px;border-radius:16px;background:rgba(251,191,36,.18)!important;border:1px solid rgba(251,191,36,.45);color:#FBBF24!important;display:inline-flex!important;align-items:center;justify-content:center;font-size:26px!important;font-weight:900}',
 '.dfbub span[style*="font-size:12px"]{color:#FBBF24!important;opacity:1!important;font-weight:800;letter-spacing:.04em;text-transform:uppercase}',
 '.dfbub .dfbar{background:rgba(255,255,255,.18)!important;height:8px!important;border-radius:6px!important}.dfbub .dfbar i{background:#FBBF24!important;border-radius:6px}',
 /* 40 · pedidos por WhatsApp */
 '.pw40{background:linear-gradient(160deg,#064E3B 0%,#0B3B35 55%,#0F172A 100%)!important;color:#fff!important;border:0!important;border-radius:26px!important;padding:16px!important;box-shadow:0 8px 22px rgba(6,78,59,.3)!important}',
 '.pw40 .hd{display:flex;align-items:center;gap:12px}.pw40 .wa{width:52px;height:52px;border-radius:16px;background:rgba(37,211,102,.18);display:flex;align-items:center;justify-content:center;flex:none}.pw40 .wa svg{width:30px;height:30px}',
 '.pw40 .tt{font-size:20px;font-weight:800}.pw40 .st{font-size:14px;color:#6EE7B7}.pw40 .pend{margin-left:auto;background:#065F46;border:1px solid #10B981;color:#D1FAE5;font-weight:900;font-size:14px;padding:6px 12px;border-radius:999px;white-space:nowrap}',
 '.pw40 .it{margin-top:12px;background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.15);border-radius:20px;padding:14px}.pw40 .it .nm{font-size:20px;font-weight:900}.pw40 .it .cu{font-size:14px;color:#6EE7B7;font-weight:700;white-space:nowrap}',
 '.pw40 .pills{display:flex;gap:8px;flex-wrap:wrap;margin-top:10px}.pw40 .pill{font-size:16px;font-weight:800;padding:7px 12px;border-radius:999px}.pw40 .pr{background:rgba(250,204,21,.18);border:1px solid rgba(250,204,21,.5);color:#FDE68A}.pw40 .pm{background:rgba(16,185,129,.18);border:1px solid rgba(16,185,129,.5);color:#A7F3D0}',
 '.pw40 .nota{font-size:14px;color:#CBD5E1;margin-top:8px}.pw40 .btn{margin-top:14px;background:#10B981!important;color:#052E1C!important;font-weight:900!important;min-height:56px;font-size:18px;border:0!important}.pw40 .vac{color:#A7F3D0;margin-top:10px;font-size:15px}',
 /* 41 · tarjetas paso a paso: estilo "Viaje de carga" */
 '#wzov{background:#F1F5F9!important}#wzov .w{padding-bottom:110px!important}',
 '#wzov .w>div:first-child{background:#fff;margin:-16px -16px 0;padding:calc(18px + var(--sbar,0px)) 18px 12px;border-bottom:1px solid #E2E8F0}#wzov .w>div:first-child b{font-size:24px!important;font-weight:900}',
 '#wzov .w>div:first-child .helpb{width:44px;height:44px;border-radius:50%;background:#F1F5F9;border:0}',
 '#wzov .wz-hd{display:flex!important;gap:4px;margin:0 -16px 14px!important;padding:0 18px 12px;background:#fff;border-bottom:1px solid #E2E8F0}#wzov .wz-hd i{flex:1;height:6px!important;width:auto!important;border-radius:3px!important;background:#E2E8F0!important}#wzov .wz-hd i.on{background:#16A34A!important}',
 '#wzov .q{background:#fff;border:1px solid #E2E8F0;border-radius:20px;padding:18px;font-size:24px!important;font-weight:900;line-height:1.2;box-shadow:0 1px 3px rgba(15,23,42,.05)}#wzov .ayuda{margin:8px 4px 10px!important;font-size:15px!important}',
 '#wzov .card{border-radius:20px;border:1px solid #E2E8F0;background:#fff}',
 '#wzov .opc{display:flex!important;flex-direction:column;gap:10px}#wzov .opc button{position:relative;text-align:left;min-height:64px;border-radius:18px;border:2px solid #E2E8F0;background:#fff;font-size:18px;font-weight:800;padding:12px 16px 12px 56px;color:#0F172A}',
 '#wzov .opc button::before{content:"";position:absolute;left:16px;top:50%;width:26px;height:26px;margin-top:-13px;border-radius:7px;border:2px solid #CBD5E1;background:#fff}',
 '#wzov .opc button[aria-pressed="true"]{border-color:#16A34A;background:#F0FDF4;box-shadow:0 0 0 4px rgba(22,163,74,.1)}#wzov .opc button[aria-pressed="true"]::before{background:#16A34A;border-color:#16A34A}',
 '#wzov .opc button[aria-pressed="true"]::after{content:"";position:absolute;left:25px;top:50%;width:7px;height:13px;margin-top:-9px;border:solid #fff;border-width:0 3px 3px 0;transform:rotate(45deg)}',
 '#wzov select,#wzov input:not([type=file]),#wzov textarea{background:#F8FAFC!important;border:1px solid #E2E8F0!important;border-radius:14px!important;min-height:54px;font-size:18px!important}',
 '#wzov .pie{position:fixed;left:0;right:0;bottom:0;z-index:5;display:flex;gap:10px;background:#fff;border-top:1px solid #E2E8F0;padding:12px 16px calc(12px + env(safe-area-inset-bottom,0px))}',
 '#wzov .pie .btn{min-height:58px;font-size:18px;border-radius:18px;font-weight:900}#wzov .pie .btn.sec{flex:1;background:#fff;border:2px solid #E2E8F0;color:#0F172A}#wzov .pie .btn:not(.sec){flex:1.5;background:#16A34A;box-shadow:0 4px 14px rgba(16,185,129,.35)}',
 /* las otras pantallas paso a paso, mismo aire */
 ':is(#rcov,#cmov,#cxov,#faov,#blov,#eqov){background:#F1F5F9!important}:is(#rcov,#cmov,#cxov,#faov,#blov,#eqov) .q{background:#fff;border:1px solid #E2E8F0;border-radius:20px;padding:16px;font-size:23px;font-weight:900}',
 ':is(#rcov,#cmov,#cxov,#faov,#blov,#eqov) .card{border-radius:20px;border:1px solid #E2E8F0;background:#fff}:is(#rcov,#cmov,#cxov,#faov,#blov,#eqov) .btn{border-radius:18px;min-height:58px;font-weight:900}',
 /* 42 · PIN */
 '#pinov{background:linear-gradient(180deg,#ECFDF5 0%,#F8FAFC 30%,#F1F5F9 100%)!important}#pinov .pw{gap:10px!important}#pinov .pw>img{width:76px!important;height:76px!important;border-radius:24px!important;border:3px solid #fff;box-shadow:0 8px 20px rgba(245,158,11,.25)}',
 '#pinov .pw>b{font-size:28px!important;font-weight:900;letter-spacing:-.01em}#pinov .ses{display:inline-flex;align-items:center;gap:6px;background:#D1FAE5;color:#065F46;border:1px solid #A7F3D0;font-size:14px;font-weight:800;padding:5px 12px;border-radius:999px}#pinov .ses i{width:8px;height:8px;border-radius:50%;background:#10B981}',
 '#pinov .dots{gap:18px!important;margin:10px 0!important}#pinov .dots i{width:20px!important;height:20px!important;border:2px solid #CBD5E1!important;background:#fff;transition:all .2s}#pinov .dots i.on{background:#16A34A!important;border-color:#16A34A!important;transform:scale(1.15);box-shadow:0 0 10px rgba(22,163,74,.4)}',
 '#pinov.err .dots{animation:pinsh .4s}@keyframes pinsh{20%,60%{transform:translateX(-8px)}40%,80%{transform:translateX(8px)}}',
 '#pinov .kp{gap:12px!important;max-width:330px}#pinov .kp button{background:#fff!important;border:1px solid #E2E8F0!important;border-radius:20px!important;min-height:70px!important;font-size:28px!important;font-weight:900!important;color:#1E293B!important;box-shadow:0 1px 2px rgba(15,23,42,.05)}',
 '#pinov .kp button:active{transform:scale(.94);background:#E2E8F0!important}#pinov .kp button[data-act="pinb"]{background:#F1F5F9!important}#pinov .kp button.bio42{background:#ECFDF5!important;border-color:#A7F3D0!important;color:#047857!important}#pinov .kp button.bio42 svg{width:32px;height:32px}',
 '#pinov .huella{background:#fff!important;border:1px solid #E2E8F0!important;border-radius:18px!important;min-height:56px!important;width:100%;max-width:330px;font-weight:900!important;font-size:17px!important}',
 '#pinov .pinmas .link{font-weight:800;font-size:16px!important}#pinov .pinmas .link+.link{color:#047857}',
 /* 43 · tarjetas de vehículos */
 '.veh43{display:block;width:100%;text-align:left;padding:0!important;border:0!important;border-radius:26px!important;overflow:hidden;background:#fff!important;box-shadow:0 4px 16px rgba(15,23,42,.08)!important;margin-top:12px}',
 '.veh43 .top{display:flex;min-height:150px}.veh43 .ft{flex:0 0 42%;position:relative;background:#E2E8F0 center/cover no-repeat;clip-path:polygon(0 0,100% 0,84% 100%,0 100%)}.veh43 .ft::after{content:"";position:absolute;top:0;bottom:0;right:0;width:9px;background:var(--vc,#1E3A8A);transform:skewX(-9deg);transform-origin:top}',
 '.veh43 .dt{flex:1;padding:12px 12px 8px 4px;min-width:0}.veh43 .nm{font-size:21px;font-weight:900;line-height:1.1;color:#0F172A}.veh43 .an{font-size:19px;font-weight:800;color:#334155}',
 '.veh43 .est{display:inline-flex;align-items:center;gap:5px;font-size:13px;font-weight:900;padding:5px 10px;border-radius:999px;margin-bottom:6px}.veh43 .plate{width:120px;height:auto;display:block;margin-top:6px}',
 '.veh43 .cb{display:flex;align-items:center;gap:6px;font-size:15px;font-weight:800;color:#1E293B;margin-top:6px}.veh43 .cb svg{width:22px;height:22px;color:#1E293B}',
 '.veh43 .who{font-size:14px;color:#475569;margin-top:4px}.veh43 .ac{margin-top:6px}.veh43 .ac .bar{height:8px;border-radius:5px;background:#E2E8F0;overflow:hidden}.veh43 .ac .bar i{display:block;height:100%;border-radius:5px}.veh43 .ac .t{font-size:13px;color:#475569;margin-top:2px}',
 '.veh43 .av{display:flex;align-items:center;gap:8px;padding:11px 14px;font-size:16px;font-weight:800}.veh43 .av .mas{margin-left:auto;font-size:13px;background:rgba(15,23,42,.08);padding:3px 9px;border-radius:999px}.veh43 .go{width:40px;height:40px;border-radius:50%;background:#1E293B;color:#fff;display:inline-flex;align-items:center;justify-content:center;font-size:22px;flex:none}'
 ].join('\n');document.head.appendChild(st)})();

/* ---------- 38 · tarjeta reparto 1 ---------- */
var SV38={camion:'<svg viewBox="0 0 48 32" fill="none"><path d="M2 8h4M0 13h6M3 18h3" stroke="#14532D" stroke-width="2.5" stroke-linecap="round"/><path d="M9 5h20v19H9z" fill="#14532D"/><path d="M29 11h8l6 7v6H29z" fill="#14532D"/><circle cx="15" cy="26" r="4" fill="#14532D" stroke="#DCFCE7" stroke-width="2"/><circle cx="37" cy="26" r="4" fill="#14532D" stroke="#DCFCE7" stroke-width="2"/><path d="M14 14l3 3 6-6" stroke="#DCFCE7" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/></svg>',
 cajas:'<svg viewBox="0 0 64 64"><rect x="4" y="36" width="26" height="20" rx="3" fill="#166534"/><rect x="22" y="40" width="30" height="20" rx="3" fill="#EA580C"/><rect x="14" y="16" width="32" height="22" rx="3" fill="#F97316"/><path d="M18 22h24M18 28h24M18 34h24" stroke="#C2410C" stroke-width="2"/><path d="M20 16c4-10 18-12 24-4-6-2-14-1-20 6z" fill="#FACC15" stroke="#CA8A04" stroke-width="1.5"/><path d="M42 11l3-4" stroke="#713F12" stroke-width="2.5" stroke-linecap="round"/></svg>',
 bascula:'<svg viewBox="0 0 64 64"><rect x="16" y="4" width="22" height="16" rx="3" fill="#CBD5E1" stroke="#64748B" stroke-width="2"/><rect x="21" y="8" width="12" height="7" rx="1.5" fill="#F8FAFC"/><path d="M27 20v10" stroke="#64748B" stroke-width="3"/><rect x="6" y="50" width="52" height="9" rx="3" fill="#94A3B8"/><path d="M10 48c-2-14 10-20 24-16 8 2 14 8 16 14z" fill="#84CC16" stroke="#3F6212" stroke-width="2"/><path d="M14 44c4-6 16-8 28-2" stroke="#3F6212" stroke-width="2" fill="none"/></svg>',
 pin:'<svg viewBox="0 0 24 24" width="26" height="26"><path d="M12 22s-7-6.5-7-12a7 7 0 0 1 14 0c0 5.5-7 12-7 12z" fill="#16A34A"/><path d="M9 10l2 2 4-4" stroke="#fff" stroke-width="2.4" fill="none" stroke-linecap="round"/></svg>'};
var _stk66=stockCard;stockCard=function(){var h=_stk66.apply(this,arguments);try{if(!h||S.role!=='rep')return h;var mR=/>([\d,.-]+) <span[^>]*>CAJAS/.exec(h),mM=/>([\d,.-]+) <span[^>]*>KG/.exec(h),tt=/<div class="lbl">([^<]*)<\/div>/.exec(h),ms=/<div style="margin-top:8px;font-size:14px;font-weight:600">([\s\S]*?)<\/div><\/div>$/.exec(h);if(!mR||!mM)return h;var mal=/card alert/.test(h);
 return '<div class="card rep1'+(mal?' mal':'')+'" style="margin-top:6px"><div class="h">'+SV38.camion+'<span>'+(tt?tt[1]:'Te quedan en el camión')+'</span></div><div class="bx">'
  +'<div class="b">'+SV38.cajas+'<span><div class="n">'+mR[1]+'<small>CAJAS</small></div><div class="l">de roatán</div></span></div>'
  +'<div class="b">'+SV38.bascula+'<span><div class="n">'+mM[1]+'<small>KG</small></div><div class="l">de plátano macho</div></span></div></div>'
  +'<div class="ft">'+(mal?'⚠️':SV38.pin)+'<span>'+(ms?ms[1]:'')+'</span></div></div>'}catch(e){return h}};

/* ---------- 40 · pedidos por WhatsApp ---------- */
var WA40='<svg viewBox="0 0 24 24" fill="none"><path d="M12 3a9 9 0 0 0-7.8 13.5L3 21l4.6-1.2A9 9 0 1 0 12 3z" stroke="#25D366" stroke-width="2" stroke-linejoin="round"/><path d="M9 8.5c.3 2.8 3.2 6 6.5 6.6l1-1.6-2-1-1 .8c-1.1-.5-2.2-1.6-2.7-2.7l.8-1-1-2z" fill="#25D366"/></svg>';
/* pedidoCard: pasó a tema-inicio.js */

/* ---------- 42 · PIN: pastilla de sesión y tecla de huella ---------- */
var BIO42='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M12 11v3a8 8 0 0 1-1 4"/><path d="M8.5 8.5A5 5 0 0 1 17 12v1.5a13 13 0 0 1-.6 4"/><path d="M5.5 10a7 7 0 0 1 13.4-2"/><path d="M7 14.5c.3-1 .5-2 .5-2.5a4.5 4.5 0 0 1 .8-2.6"/><path d="M14 13.5a17 17 0 0 1-1.2 6"/><path d="M4 7a10 10 0 0 1 4-3.5"/><path d="M20 12a17 17 0 0 1-.3 3"/></svg>';
var _rd66a=render;render=function(){var r=_rd66a.apply(this,arguments);try{var o=document.getElementById('pinov');if(o&&_pin&&_pin.modo==='entrar'){var pw=o.querySelector('.pw');
  if(pw&&!pw.querySelector('.ses')){var b=pw.querySelector(':scope>b');if(b){var s=document.createElement('span');s.className='ses';s.innerHTML='<i></i>Sesión activa';b.before(s)}}
  var x=o.querySelector('.kp [data-act="pinx"]');if(x&&typeof bioActiva==='function'&&bioActiva(_pin.k)&&typeof bioPl==='function'&&bioPl()&&!x.classList.contains('bio42')){x.className='bio42';x.dataset.act='biousar';x.setAttribute('aria-label','Entrar con mi huella');x.innerHTML=BIO42}}}catch(e){}return r};

/* ---------- 43 · tarjetas de vehículos ---------- */
var BOMBA43='<svg viewBox="0 0 24 24" fill="currentColor"><path d="M5 3h9a1 1 0 0 1 1 1v8h1a2 2 0 0 1 2 2v3a1 1 0 0 0 2 0V9l-2-2 1.4-1.4L22 9v8a3 3 0 0 1-6 0v-3h-1v7H4V4a1 1 0 0 1 1-1zm2 2v5h6V5z"/></svg>';
function vehQuien43(v){var A=S.vehAsig||{},L=Object.keys(A).filter(function(ch){return +A[ch]===+v.id}).map(function(ch){return chofN(+ch)});return L.length?'🧑 Lo trae '+L.join(', '):'🏠 En bodega'}
function vehEnRuta43(v){var A=S.vehAsig||{};return Object.keys(A).some(function(ch){if(+A[ch]!==+v.id)return false;var sa=nbRGet(+ch,'salida'),ci=nbRGet(+ch,'cierre');return sa&&sa.ok&&!(ci&&ci.sent)})}
function vehAvisos43(v){var L=[];try{L=avisos().filter(function(x){return typeof x==='string'&&x.indexOf(v.n)===0})}catch(e){}
 return L.map(function(x){var t=x.slice(v.n.length).replace(/^[:\s·]+/,'');var col=/vencid|URGENTE|ya se pas/i.test(x)?'r':(/aceite|afinaci|servicio|llanta|frenos/i.test(x)?'b':'a');return {t:t.charAt(0).toUpperCase()+t.slice(1),c:col}}).sort(function(a,b){return 'rab'.indexOf(a.c)-'rab'.indexOf(b.c)})}
function veh43(v){var inf={};try{inf=vInfo(v)||{}}catch(e){}var fuera=!!v.fuera,ruta=!fuera&&vehEnRuta43(v);
 var est=fuera?['⚠ Fuera de servicio','#DC2626','#fff','#B91C1C']:(ruta?['🚚 En ruta','#FACC15','#1E293B','#1E3A8A']:['✓ Activo','#16A34A','#fff','#1E3A8A']);
 var h7=(v.hist||[]).slice(-7),km=sum(h7,function(x){return num(x.km)}),l=sum(h7,function(x){return num(x.l)}),rend=l>0?km/l:null;
 var acInt=num(v.acInt)||10000,rem=num(inf.rem),pct=Math.max(0,Math.min(100,100-rem/acInt*100)),acol=rem<=0?'#DC2626':(rem<=1000?'#F59E0B':'#16A34A');
 var A=vehAvisos43(v),a0=A[0],acs={r:['#FEE2E2','#991B1B','⚠️'],a:['#FEF3C7','#92400E','🪪'],b:['#DBEAFE','#1E40AF','🔧']};
 var placa='';
 return '<div class="top"><div class="ft" style="--vc:'+est[3]+';background-image:url(\''+(v.foto||'')+'\')"></div><div class="dt">'
  +'<span class="est" style="background:'+est[1]+';color:'+est[2]+'">'+est[0]+'</span><div class="nm">'+esc(String(v.n).replace(/\s\d{4}$/,''))+'</div><div class="an">'+esc(v.anio||'')+'</div>'+placa
  +'<div class="cb">'+BOMBA43+esc(v.comb==='Premium'?'Gasolina Premium':(v.comb==='Magna'?'Gasolina Magna':(v.comb||'')))+(rend?' · <span style="font-weight:700;color:#475569">'+rend.toFixed(1)+' km/L esta semana</span>':'')+'</div>'
  +'<div class="who">'+esc(vehQuien43(v))+'</div>'
  +(inf.rem!=null?'<div class="ac"><div class="bar"><i style="width:'+pct+'%;background:'+acol+'"></i></div><div class="t">Aceite: '+(rem<=0?'<b style="color:#DC2626">vencido por '+n65(-rem)+' km</b>':'faltan '+n65(rem)+' km')+'</div></div>':'')+'</div></div>'
  +(a0?'<div class="av" style="background:'+acs[a0.c][0]+';color:'+acs[a0.c][1]+'">'+acs[a0.c][2]+'<span>'+esc(a0.t)+'</span>'+(A.length>1?'<span class="mas">+'+(A.length-1)+' más</span>':'<span style="margin-left:auto"></span>')+'<span class="go">›</span></div>'
   :'<div class="av" style="background:#F1F5F9;color:#334155">✓ <span>Todo al día</span><span style="margin-left:auto"></span><span class="go">›</span></div>')}
var _rd66b=render;render=function(){var r=_rd66b.apply(this,arguments);try{if(S.role==='admin'&&S.tab.admin==='vehiculos'){Array.prototype.forEach.call(document.querySelectorAll('main button.vcard[data-act="vehopen"]'),function(bt){if(bt.classList.contains('veh43'))return;var v=(S.veh||[]).filter(function(x){return +x.id===+bt.dataset.id})[0];if(!v)return;
  var pl=bt.querySelector('svg.plate');var html=veh43(v);bt.className='vcard veh43';bt.removeAttribute('style');bt.innerHTML=html;if(pl){pl.classList.add('plate');var an=bt.querySelector('.an');if(an)an.after(pl)}})}}catch(e){console.error('43',e)}return r};
