/* ===================== v8.4 · Rutas con el diseño de Ricardo (16 nov), letra grande, todo dentro de la app (sin internet)
   Encabezado compacto (Rutas · Hoy/Mañana · ? · ×), avisos en franja, resumen con "Asignar todos" y "Mapa", tarjetas de chofer
   con iniciales y color que se abren y cierran, buscador dentro de cada lista, renglón marcado en verde, y panel de abajo
   flotante: "Mover N clientes a:" → escoges el chofer (el de origen en gris) → vigencia → aviso de qué va a pasar → Confirmar.
   Solo se marcan clientes de un chofer a la vez. Después: "Deshacer". ===================== */
(function(){var st=document.createElement('style');st.textContent=[
 '#rt81.r84{padding:0}#rt81.r84 .hd84{position:sticky;top:0;z-index:5;background:var(--surface);border-bottom:1px solid var(--line);padding:10px 14px;display:flex;align-items:center;gap:8px;box-shadow:0 2px 10px -4px rgba(15,23,42,.08)}',
 '#rt81.r84 .hd84 h1{font-size:23px;font-weight:900;margin:0;flex:1}',
 '#rt81.r84 .seg84{display:flex;background:var(--bg);border:1px solid var(--line);border-radius:14px;padding:3px}#rt81.r84 .seg84 button{border:0;background:none;border-radius:11px;padding:8px 12px;font-weight:800;font-size:15px;color:var(--muted);min-height:40px}#rt81.r84 .seg84 button[aria-pressed="true"]{background:var(--accent);color:#fff;box-shadow:0 2px 6px rgba(21,128,61,.3)}',
 '#rt81.r84 .ic84{width:42px;height:42px;border-radius:50%;border:1px solid var(--line);background:var(--bg);font-weight:900;font-size:19px;color:var(--fg);display:flex;align-items:center;justify-content:center;flex:0 0 42px}',
 '#rt81.r84 .bd84{max-width:520px;margin:0 auto;padding:14px 14px 40px}#rt81.r84 .bd84.con84{padding-bottom:420px}',
 '#rt81.r84 .ban84{display:flex;align-items:center;gap:12px;border-radius:18px;padding:12px 14px;margin-bottom:12px;border:1.5px solid}',
 '#rt81.r84 .ban84 .bi{width:42px;height:42px;border-radius:13px;display:flex;align-items:center;justify-content:center;font-size:21px;flex:0 0 42px;color:#fff}',
 '#rt81.r84 .ban84.am{background:color-mix(in srgb,#F59E0B 10%,var(--surface));border-color:#FCD34D}#rt81.r84 .ban84.am .bi{background:linear-gradient(135deg,#F59E0B,#EA580C)}',
 '#rt81.r84 .ban84.ro{background:color-mix(in srgb,#DC2626 8%,var(--surface));border-color:#FCA5A5}#rt81.r84 .ban84.ro .bi{background:linear-gradient(135deg,#EF4444,#B91C1C)}',
 '#rt81.r84 .ban84 b{font-size:17px;display:block}#rt81.r84 .ban84 .s{font-size:14px;color:var(--muted)}#rt81.r84 .ban84 .bb{margin-left:auto;flex:0 0 auto;min-height:44px;padding:0 16px;border-radius:13px;border:0;font-weight:800;font-size:15px;color:#fff}',
 '#rt81.r84 .ban84.am .bb{background:#EA580C}#rt81.r84 .ban84.ro .bb{background:#B91C1C}',
 '#rt81.r84 .sum84{display:flex;align-items:center;gap:12px;background:var(--surface);border:1px solid var(--line);border-radius:18px;padding:12px 14px;margin-bottom:14px;box-shadow:0 6px 18px -8px rgba(15,23,42,.12)}',
 '#rt81.r84 .sum84 .bi{width:44px;height:44px;border-radius:13px;background:#0F172A;color:#34D399;display:flex;align-items:center;justify-content:center;font-size:21px;flex:0 0 44px}',
 '#rt81.r84 .sum84 b{font-size:19px;display:block}#rt81.r84 .sum84 .s{font-size:14px;color:var(--muted)}',
 '#rt81.r84 .pb84{min-height:46px;padding:0 14px;border-radius:13px;font-weight:800;font-size:15px;border:1.5px solid var(--line);background:var(--surface);color:var(--fg);white-space:nowrap}#rt81.r84 .pb84.v{background:var(--accent);border-color:var(--accent);color:#fff}',
 '#rt81.r84 .ch84{background:var(--surface);border:2px solid var(--line);border-radius:20px;margin-bottom:14px;overflow:hidden;box-shadow:0 8px 22px -10px rgba(15,23,42,.18)}',
 '#rt81.r84 .ch84 .top{padding:12px 14px;display:flex;align-items:flex-start;gap:12px}',
 '#rt81.r84 .av84{width:50px;height:50px;border-radius:16px;color:#fff;font-weight:900;font-size:18px;display:flex;align-items:center;justify-content:center;flex:0 0 50px;position:relative}',
 '#rt81.r84 .ch84 .nm{font-size:19px;font-weight:900}#rt81.r84 .bdg84{display:inline-block;font-size:13px;font-weight:800;border-radius:999px;padding:2px 10px;margin-left:6px;vertical-align:middle}',
 '#rt81.r84 .bdg84.ru{background:#DBEAFE;color:#1E3A8A}#rt81.r84 .bdg84.sa{background:#DCFCE7;color:#14532D}#rt81.r84 .bdg84.ci{background:#FEF3C7;color:#78350F}',
 '#rt81.r84 .ch84 .s{font-size:15px;color:var(--muted);margin-top:2px}#rt81.r84 .ch84 .s b{color:var(--fg)}',
 '#rt81.r84 .acc84{display:flex;gap:6px;align-items:center;flex:0 0 auto}#rt81.r84 .sq84{width:44px;height:44px;border-radius:13px;border:1.5px solid var(--line);background:var(--surface);font-size:19px;display:flex;align-items:center;justify-content:center;color:var(--fg)}',
 '#rt81.r84 .nota84{margin:0 14px 10px;padding:8px 12px;border-radius:12px;background:#FEF3C7;border:1px solid #FCD34D;color:#78350F;font-weight:800;font-size:14px}',
 '#rt81.r84 .lst84{border-top:1px solid var(--line);padding:6px 8px 10px}',
 '#rt81.r84 .q84{width:100%;min-height:46px;border-radius:13px;border:1.5px solid var(--line);padding:0 14px;font-size:16px;margin:6px 0 4px;background:var(--bg)}',
 '#rt81.r84 .it84{display:flex;align-items:center;gap:12px;width:100%;text-align:left;background:none;border:0;border-radius:14px;padding:11px 8px;min-height:60px;color:inherit;font:inherit;margin:2px 0}',
 '#rt81.r84 .it84 .ck{flex:0 0 28px;height:28px;border:2.5px solid #94A3B8;border-radius:9px;display:flex;align-items:center;justify-content:center;font-weight:900;color:#fff;font-size:17px}',
 '#rt81.r84 .it84.on{background:color-mix(in srgb,var(--accent) 12%,var(--surface));box-shadow:inset 0 0 0 1.5px color-mix(in srgb,var(--accent) 45%,transparent)}#rt81.r84 .it84.on .ck{background:var(--accent);border-color:var(--accent)}',
 '#rt81.r84 .it84[disabled]{opacity:.55}#rt81.r84 .it84 .n{font-size:17px;font-weight:800;display:block}#rt81.r84 .it84 .z{font-size:14px;color:var(--muted);display:block}',
 '#rt81.r84 .tg84{display:inline-block;font-size:12px;font-weight:800;border-radius:8px;padding:2px 8px;margin:3px 4px 0 0;background:#FEF3C7;color:#78350F}#rt81.r84 .tg84.r{background:#FEE2E2;color:#7F1D1D}#rt81.r84 .tg84.v{background:#DCFCE7;color:#14532D}',
 '#rt81.r84 .sh84{position:fixed;left:0;right:0;bottom:0;z-index:6;background:var(--surface);border-radius:26px 26px 0 0;box-shadow:0 -14px 40px -6px rgba(15,23,42,.3);border-top:1px solid var(--line);padding:10px 16px calc(16px + env(safe-area-inset-bottom,0px));max-width:560px;margin:0 auto;max-height:78vh;overflow:auto}',
 '#rt81.r84 .sh84 .hdl{width:46px;height:6px;border-radius:9px;background:#CBD5E1;margin:0 auto 10px}',
 '#rt81.r84 .sh84 .tt{display:flex;align-items:center;gap:8px;margin-bottom:10px}#rt81.r84 .sh84 .pill{background:var(--accent);color:#fff;border-radius:999px;padding:2px 11px;font-weight:900;font-size:16px}#rt81.r84 .sh84 .tt b{font-size:18px;flex:1}',
 '#rt81.r84 .sh84 .lnk{background:none;border:0;color:var(--muted);text-decoration:underline;font-weight:700;font-size:15px;min-height:40px}',
 '#rt81.r84 .gr84{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:12px}',
 '#rt81.r84 .tc84{display:flex;align-items:center;gap:10px;text-align:left;padding:10px;border-radius:16px;border:2px solid var(--line);background:var(--surface);color:var(--fg);min-height:64px;position:relative}',
 '#rt81.r84 .tc84 .a{width:38px;height:38px;border-radius:12px;color:#fff;font-weight:900;font-size:14px;display:flex;align-items:center;justify-content:center;flex:0 0 38px}#rt81.r84 .tc84 .n{font-weight:900;font-size:16px;display:block}#rt81.r84 .tc84 .c{font-size:13px;color:var(--muted)}',
 '#rt81.r84 .tc84.sel{border-color:var(--accent);background:color-mix(in srgb,var(--accent) 10%,var(--surface))}#rt81.r84 .tc84.sel:after{content:"✓";position:absolute;top:8px;right:10px;width:24px;height:24px;border-radius:50%;background:var(--accent);color:#fff;font-weight:900;display:flex;align-items:center;justify-content:center;font-size:14px}',
 '#rt81.r84 .tc84.org{opacity:.55;background:var(--bg)}',
 '#rt81.r84 .vg84{font-size:12px;font-weight:900;letter-spacing:.06em;text-transform:uppercase;color:var(--muted);margin-bottom:6px}',
 '#rt81.r84 .ntc84{display:flex;gap:10px;align-items:flex-start;background:#FFFBEB;border:1px solid #FCD34D;border-radius:14px;padding:10px 12px;margin:12px 0;font-weight:700;font-size:15px;color:#78350F}',
 '#rt81.r84 .bt84{display:grid;grid-template-columns:2fr 3fr;gap:10px}#rt81.r84 .bt84 button{min-height:56px;border-radius:15px;font-weight:900;font-size:17px;border:0}#rt81.r84 .bt84 .no{background:var(--bg);color:var(--fg);border:1.5px solid var(--line)}#rt81.r84 .bt84 .si{background:var(--accent);color:#fff;box-shadow:0 6px 14px -4px rgba(21,128,61,.45)}#rt81.r84 .bt84 .si[disabled]{opacity:.45;box-shadow:none}',
 '#rt81.r84 .hlp84{position:fixed;inset:0;z-index:7;background:rgba(15,23,42,.5);display:flex;align-items:flex-end;justify-content:center;padding:14px}#rt81.r84 .hlp84 .bx{background:var(--surface);border-radius:24px;padding:18px;max-width:520px;width:100%}',
 '#rt81.r84 .hlp84 li{margin:8px 0;font-size:16px;line-height:1.4}'].join('\n');document.head.appendChild(st)})();

function ini84(n){var p=String(n||'').trim().split(/\s+/);return ((p[0]||'?').charAt(0)+(p[1]?p[1].charAt(0):(p[0]||'').charAt(1)||'')).toUpperCase()}
function sal84(id){try{var s=nbRGet(id,'salida');return !!(s&&s.ok)}catch(e){return false}}
function fuente84(){var R=S.rt81,ks=Object.keys(R.sel||{});var src=ks.map(function(k){return +k.split('|')[1]}).filter(function(x,i,a){return a.indexOf(x)===i});return src}
function tag84(x,c,R){var t='';if(x.done)t+='<span class="tg84 v">✓ Ya se le entregó</span>';if(x.pend)t+='<span class="tg84 r">No se visitó '+(R.dia==='hoy'?'ayer':'hoy')+'</span>';if(x.ped||c.ped&&(c.ped.cuando||'hoy')===(R.dia==='hoy'?'hoy':'mañana'))t+='<span class="tg84">Pedido</span>';if(x.mv)t+='<span class="tg84">Cambiado'+(x.va?' · va en camino':'')+'</span>';if(c.lat==null)t+='<span class="tg84 r">Sin ubicación</span>';return t}
function it84(x,from,R,q){var c=cl(x.c),k=x.c+'|'+from,on=!!R.sel[k],e=est81(c),dn=(c.n+' '+(c.a||'')+' '+(c.ap||'')).toLowerCase(),oc=q&&dn.indexOf(String(q).toLowerCase().trim())<0;return '<button class="it84'+(on?' on':'')+'" data-act="rt84s" data-k="'+k+'" data-n="'+esc(dn)+'"'+(oc?' style="display:none"':'')+(x.done?' disabled':'')+'><span class="ck">'+(on?'✓':'')+'</span><span style="flex:1;min-width:0"><span class="n">'+esc(c.n)+'</span><span class="z">'+esc(zona81(c))+(e.R||e.M?' · ~'+(e.R?e.R+' cj':'')+(e.R&&e.M?' · ':'')+(e.M?e.M+' kg':''):'')+'</span>'+tag84(x,c,R)+'</span></button>'}
function sheet84(){var R=S.rt81,ks=Object.keys(R.sel||{}),n=ks.length,hoy=R.dia==='hoy';
 if(!n){if(UNDO83&&Date.now()-UNDO83.t<9000&&UNDO83.dia===R.dia)return '<div class="sh84" id="rt81bar"><div class="row" style="align-items:center;gap:10px"><span style="flex:1;font-size:17px;font-weight:800">✓ '+esc(UNDO83.txt)+'</span><button class="pb84" data-act="rt83u">Deshacer</button></div></div>';return ''}
 var src=fuente84(),CH=chs81(),dest=R.dest84;if(dest!=null&&src.length===1&&src[0]===+dest)dest=R.dest84=null;var m=R.m83==='siempre';
 var g=CH.map(function(c){var id=+c.id,org=src.length===1&&src[0]===id,cnt=lista81(id,hoy?hoy81():man81()).L.length;
  if(org)return '<div class="tc84 org"><span class="a" style="background:#94A3B8">'+esc(ini84(chofN(id)))+'</span><span><span class="n">'+esc(chofN(id))+'</span><span class="c">Origen actual</span></span></div>';
  return '<button class="tc84'+(+dest===id?' sel':'')+'" data-act="rt84t" data-id="'+id+'"><span class="a" style="background:'+chCol81(id)+'">'+esc(ini84(chofN(id)))+'</span><span><span class="n">'+esc(chofN(id))+'</span><span class="c">'+cnt+' cliente'+(cnt===1?'':'s')+'</span></span></button>'}).join('');
 var ntc='';if(dest!=null){var dn=chofN(dest),cam=hoy?src.filter(function(s){return s&&sal84(s)}).map(function(s){return chofN(s)}):[];if(hoy&&sal84(dest))cam.push(dn);
  ntc='<div class="ntc84"><span style="font-size:20px">🔔</span><span>'+(n===1?'El cliente pasará':'Los '+n+' clientes pasarán')+' a <b>'+esc(dn)+'</b> '+(m?'<b>para siempre</b> (cambia su chofer fijo)':(hoy?'<b>solo hoy</b>':'<b>solo mañana</b>'))+'.'+(cam.length?' '+esc(cam.filter(function(x,i,a){return a.indexOf(x)===i}).join(' y '))+' ya va en camino: le llega un aviso al momento.':'')+'</span></div>'}
 return '<div class="sh84" id="rt81bar"><div class="hdl"></div><div class="tt"><span class="pill">'+n+'</span><b>Mover '+n+' cliente'+(n===1?'':'s')+' a:</b><button class="lnk" data-act="rt84l">Quitar marcas</button></div>'
  +'<div class="gr84">'+g+'</div><div class="vg84">Vigencia del cambio</div><div class="seg84" style="display:grid;grid-template-columns:1fr 1fr"><button data-act="rt83m" data-v="dia" aria-pressed="'+!m+'">Solo '+(hoy?'hoy':'mañana')+'</button><button data-act="rt83m" data-v="siempre" aria-pressed="'+m+'">Para siempre</button></div>'
  +ntc+'<div class="bt84" style="margin-top:'+(ntc?'0':'12px')+'"><button class="no" data-act="rt84l">Cancelar</button><button class="si" data-act="rt84ok"'+(dest==null?' disabled':'')+'>✓ Confirmar cambio</button></div>'
  +'<div style="text-align:center;margin-top:6px"><button class="lnk" data-act="rt81no">'+(hoy?'Hoy no se visita':'Mañana no se visita')+'</button></div></div>'}
rt81HTML=function(){var R=S.rt81;if(!R||S.role!=='admin')return '';R.sel=R.sel||{};R.col84=R.col84||{};R.q84=R.q84||{};var hoy=R.dia==='hoy',f=hoy?hoy81():man81(),CH=chs81(),sc=sinCh81(f),sd=sinDias81(),hn=hoyNo81(f),tot=0,pts=[];
 var h='<div class="hd84"><h1>Rutas</h1><div class="seg84" role="group"><button data-act="rt81d" data-v="hoy" aria-pressed="'+hoy+'">'+esc(dTx81(hoy81(),'Hoy').replace(/^Hoy · /,'Hoy '))+'</button><button data-act="rt81d" data-v="man" aria-pressed="'+!hoy+'">Mañana</button></div><button class="ic84" data-act="rt84h" aria-label="¿Cómo se usa?">?</button><button class="ic84" data-act="rt81x" aria-label="Cerrar">×</button></div>';
 var b='';
 if(sc.length)b+='<div class="ban84 ro"><span class="bi">!</span><span style="min-width:0"><b>'+sc.length+' cliente'+(sc.length===1?'':'s')+' sin chofer</b><span class="s">Les toca '+(hoy?'hoy':'mañana')+' y nadie los lleva</span></span><button class="bb" data-act="rt84e" data-k="sc">'+(R.e84==='sc'?'Ocultar':'Asignar')+'</button></div>'+(R.e84==='sc'?'<div class="ch84"><div class="lst84">'+sc.map(function(c){return it84({c:c.id},0,R)}).join('')+'</div></div>':'');
 if(sd.length)b+='<div class="ban84 am"><span class="bi">📅</span><span style="min-width:0"><b>'+sd.length+' cliente'+(sd.length===1?'':'s')+' sin días de visita</b><span class="s">Nunca les toca. Ponles días en su ficha.</span></span><button class="bb" data-act="rt84e" data-k="sd">'+(R.e84==='sd'?'Ocultar':'Ver')+'</button></div>'+(R.e84==='sd'?'<div class="ch84"><div class="lst84">'+sd.map(function(c){return it84({c:c.id},0,R)}).join('')+'</div></div>':'');
 var cards='';CH.forEach(function(ch){var id=+ch.id,o=lista81(id,f),L=o.L,col=chCol81(id),eR=0,eM=0,falt=L.filter(function(x){return !x.done});falt.forEach(function(x){var e=est81(cl(x.c));eR+=e.R;eM+=e.M});tot+=L.length;
  var cap=cap81(id),sal=hoy&&sal84(id),hech=L.length-falt.length,abre=!R.col84[id],q=String(R.q84[id]||'');
  L.forEach(function(x){var c=cl(x.c);if(c.lat!=null)pts.push({lat:+c.lat,lng:+c.lng,col:col,t:String(chofN(id)).charAt(0),n:c.n+' · '+chofN(id),op:x.done?.4:1})});
  var bdg=o.nota?'<span class="bdg84 ci">Cierre pendiente</span>':(sal?'<span class="bdg84 ru">En ruta</span>':(hoy?'<span class="bdg84 sa">Sin salir</span>':''));
  cards+='<div class="ch84" style="border-color:color-mix(in srgb,'+col+' 45%,var(--line))"><div class="top" style="background:linear-gradient(90deg,color-mix(in srgb,'+col+' 10%,var(--surface)),var(--surface))"><span class="av84" style="background:'+col+'">'+esc(ini84(chofN(id)))+'</span>'
   +'<span style="flex:1;min-width:0" data-act="rt84c" data-id="'+id+'"><span class="nm">'+esc(chofN(id))+'</span>'+bdg+'<div class="s"><b>'+L.length+' cliente'+(L.length===1?'':'s')+'</b>'+(hech?' · ya entregó '+hech:'')+(eR||eM?' · ~'+(eR?eR+' cajas':'')+(eR&&eM?' y ':'')+(eM?eM+' kg':''):'')+'</div>'
   +(cap&&eR?'<span class="tg84 '+(eR>cap?'r':'v')+'">'+(eR>cap?'No le cabe: ~'+eR+' de '+cap+' cajas':'Le cabe: ~'+eR+' de '+cap+' cajas')+'</span>':'')+'</span>'
   +'<button class="sq84" data-act="rt84c" data-id="'+id+'" aria-label="'+(abre?'Cerrar':'Abrir')+'">'+(abre?'▴':'▾')+'</button></div>'+(hoy||falt.length?'<div style="display:flex;gap:8px;padding:0 14px 12px">'+(hoy?'<button class="pb84" style="flex:1" data-act="fv82" data-id="'+id+'">📷 Fotos</button>':'')+(falt.length?'<button class="pb84 v" style="flex:1" data-act="rt81tod" data-id="'+id+'">Pasar todos</button>':'')+'</div>':'')
   +(o.nota?'<div class="nota84">⏳ '+esc(o.nota)+'</div>':'')
   +(abre?'<div class="lst84">'+(L.length>6?'<input class="q84" type="search" data-q84="'+id+'" placeholder="Buscar entre '+L.length+' clientes…" value="'+esc(q)+'">':'')+(L.length?L.map(function(x){return it84(x,id,R,q)}).join(''):'<div class="lbl" style="padding:14px;text-align:center">No tiene clientes '+(hoy?'hoy':'mañana')+'. Marca clientes de otro chofer para pasárselos.</div>')+'</div>':'')+'</div>'});
 sc.forEach(function(c){if(c.lat!=null)pts.push({lat:+c.lat,lng:+c.lng,col:'var(--danger)',t:'?',n:c.n+' · sin chofer'})});
 b+='<div class="sum84" style="flex-wrap:wrap"><span class="bi">🗺️</span><span style="flex:1;min-width:0"><b>'+tot+' cliente'+(tot===1?'':'s')+' '+(hoy?'hoy':'mañana')+'</b><span class="s">El orden lo pone "Ordenar con tráfico"</span></span><span style="display:flex;gap:8px;width:100%"><button class="pb84" style="flex:1" data-act="rt81todos">👥 Asignar todos</button><button class="pb84 v" style="flex:1" data-act="rt81map">'+(R.map?'Ocultar el mapa':'🗺️ Mapa')+'</button></span></div>';
 if(R.map)b+='<div class="ch84" style="padding:6px">'+mapaVivoHTML('rt81m',{pts:pts,refit:true},320)+'<div class="lbl" style="padding:6px">Cada color es un chofer. Rojo: sin chofer.</div></div>';
 b+=cards;
 if(hn.length)b+='<div class="ch84" style="padding:12px 14px"><b style="font-size:17px">'+(hoy?'Hoy':'Mañana')+' no se visitan</b><div class="lbl">Solo ese día. Después vuelven solos a su ruta.</div>'+hn.map(function(c){return '<div class="row" style="min-height:52px"><span style="font-size:16px">'+esc(c.n)+'</span><button class="pb84" data-act="rt81vol" data-id="'+c.id+'">Volver a ponerlo</button></div>'}).join('')+'</div>';
 var sh=sheet84(),hlp=R.help84?'<div class="hlp84" data-act="rt84h"><div class="bx" data-stop84="1"><b style="font-size:19px">¿Cómo se usan las rutas?</b><ol style="padding-left:22px;margin:10px 0">'
  +'<li><b>Marca clientes</b> de un chofer (toca el renglón; se pinta de verde).</li><li>Abajo <b>escoge el chofer</b> que los va a llevar y si es <b>solo hoy</b> o <b>para siempre</b>.</li><li>Lee el aviso y toca <b>Confirmar cambio</b>. Si te equivocas, <b>Deshacer</b>.</li><li>Si el chofer ya va en camino, le llega un aviso y su lista se acomoda sola.</li><li><b>Hoy no se visita</b> salta a un cliente solo ese día.</li><li>El orden de las paradas lo pone el chofer con <b>Ordenar con tráfico</b>.</li></ol><button class="btn" style="width:100%;min-height:52px" data-act="rt84h">Entendido</button></div></div>':'';
 return '<div id="rt81" class="ov70 r84" role="dialog" aria-label="Rutas">'+h+'<div class="bd84'+(sh?' con84':'')+'">'+b+'</div>'+sh+hlp+'</div>'};
/* poner sin volver a dibujar toda la app */
function pon84(){try{rt81Pon()}catch(e){}}
window.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('#rt81.r84 [data-act^="rt84"]');if(!b||!S.rt81)return;if(b.dataset.act==='rt84h'&&e.target.closest('[data-stop84]')&&!e.target.closest('button'))return;e.preventDefault();e.stopImmediatePropagation();var a=b.dataset.act,R=S.rt81;
 if(a==='rt84s'){var k=b.dataset.k,from=k.split('|')[1];R.sel=R.sel||{};if(R.sel[k])delete R.sel[k];else{Object.keys(R.sel).forEach(function(x){var p=x.split('|');if(p[0]===k.split('|')[0]||p[1]!==from)delete R.sel[x]});R.sel[k]=1}UNDO83=null;pon84();return}
 if(a==='rt84t'){R.dest84=+b.dataset.id;pon84();return}
 if(a==='rt84l'){R.sel={};R.dest84=null;pon84();return}
 if(a==='rt84ok'){if(R.dest84==null||!Object.keys(R.sel||{}).length)return;var d=R.dest84;R.dest84=null;aplica83(d);render();return}
 if(a==='rt84c'){var id=+b.dataset.id;R.col84=R.col84||{};R.col84[id]=!R.col84[id];pon84();return}
 if(a==='rt84e'){R.e84=R.e84===b.dataset.k?null:b.dataset.k;pon84();return}
 if(a==='rt84h'){R.help84=!R.help84;pon84();return}},true);
/* "Pasar todos" y "Asignar todos" de antes siguen; aquí no hace falta el paso extra */
document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('#rt81.r84 [data-act="rt81tod"],#rt81.r84 [data-act="rt81todos"]');if(!b)return;setTimeout(function(){if(S.rt81){S.rt81.pick=null;S.rt81.dest84=null;pon84()}},0)},false);
/* el buscador filtra sin volver a dibujar (no se pierde el teclado) */
document.addEventListener('input',function(e){var t=e.target;if(!t||!t.matches||!t.matches('#rt81.r84 [data-q84]')||!S.rt81)return;var id=t.dataset.q84,q=String(t.value||'').toLowerCase().trim();S.rt81.q84=S.rt81.q84||{};S.rt81.q84[id]=t.value;var box=t.closest('.lst84');if(!box)return;
 Array.prototype.forEach.call(box.querySelectorAll('.it84'),function(x){x.style.display=!q||String(x.dataset.n||'').indexOf(q)>-1?'':'none'})},true);
/* el "Deshacer" se quita solo */
setInterval(function(){try{if(S.rt81&&UNDO83&&Date.now()-UNDO83.t>=9000&&document.querySelector('#rt81.r84 [data-act="rt83u"]'))pon84()}catch(e){}},1500);

/* el interruptor "Solo hoy / Para siempre" (de la 8.3) ahora dibuja este panel */
barPon83=function(){pon84()};
