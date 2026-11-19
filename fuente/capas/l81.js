/* ===================== v8.1 · 39 · RUTAS del administrador (14 nov)
   Hoy / Mañana: los clientes de cada chofer; marcar varios → "Pasar a…", "Todos a un chofer"; "Hoy no";
   cambio solo ese día o para siempre; le llega al chofer al momento (si ya salió, te avisa "ya va en camino");
   avisos "Sin chofer" y "Sin días"; mapa con el color de cada chofer; "¿le cabe?" contra la camioneta;
   los que no se visitaron ayer y los pedidos van marcados. El orden lo sigue poniendo "Ordenar con tráfico". ===================== */
(function(){var st=document.createElement('style');st.textContent=[
 '#rt81 .chc{border-left:6px solid var(--line)}#rt81 .it{display:flex;align-items:center;gap:10px;width:100%;text-align:left;background:none;border:0;border-top:1px solid var(--line);padding:10px 2px;min-height:52px;color:inherit;font:inherit}',
 '#rt81 .it .ck{flex:0 0 26px;height:26px;border:2px solid var(--line);border-radius:8px;display:flex;align-items:center;justify-content:center;font-weight:900}',
 '#rt81 .it[aria-pressed="true"] .ck{background:var(--accent);border-color:var(--accent);color:#fff}#rt81 .it[disabled]{opacity:.55}',
 '#rt81 .tg{display:inline-block;font-size:12px;font-weight:800;border-radius:8px;padding:1px 7px;margin:2px 4px 0 0;background:var(--banana-soft)}#rt81 .tg.r{background:var(--danger-soft)}#rt81 .tg.v{background:var(--ok-soft)}',
 '#rt81 .bar81{position:sticky;bottom:0;z-index:3;background:var(--surface);border-top:2px solid var(--accent);padding:12px 14px calc(12px + env(safe-area-inset-bottom,0px));margin:12px -16px -40px;box-shadow:0 -6px 18px rgba(0,0,0,.12)}',
 '#rt81 .ch81{display:flex;gap:8px;flex-wrap:wrap}#rt81 .ch81 button{flex:1 1 45%}'].join('\n');document.head.appendChild(st)})();
try{['rq81','rutaOv81'].forEach(function(k){if(NB_SH.indexOf(k)<0)NB_SH.push(k)})}catch(e){}
function hoy81(){return iso(TODAY)}function man81(){return iso(new Date(TODAY.getTime()+864e5))}
function dDe81(f){return new Date(f+'T12:00:00').getDay()}
function chs81(){return choferesL().filter(function(c){return !c.baja&&!c.arch})}
function chCol81(id){var L=chs81(),i=L.map(function(c){return +c.id}).indexOf(+id);return i<0?'var(--muted)':CHCOL[i%CHCOL.length]}
/* ---------- cambios de un día (pasar a otro chofer / "hoy no"); nunca se borran: se cancelan ---------- */
function ovDe81(f,cid){var o=(S.rutaOv81||{})[f],v=o&&o[cid];if(!v||v.x)return undefined;return v.ch==null?undefined:+v.ch}
function ovPon81(f,cid,ch){S.rutaOv81=S.rutaOv81||{};S.rutaOv81[f]=S.rutaOv81[f]||{};S.rutaOv81[f][cid]=ch==null?{x:1,t:Date.now()}:{ch:+ch,t:Date.now()}}
/* ---------- lo que le toca a un chofer un día (lo mismo que se arma solo al cambiar de día) ---------- */
function plan81(id,f,pend){id=+id;var d=dDe81(f),out=[],ya={};var pon=function(c,x){if(!c||c.oculto||ya[c.id])return;ya[c.id]=1;out.push(Object.assign({c:c.id},x||{}))};
 (pend||[]).forEach(function(cid){var c=cl(+cid);if(!c)return;var o=ovDe81(f,c.id);if(o!==undefined&&o!==id)return;pon(c,{pend81:1})});
 S.cli.forEach(function(c){if(c.oculto)return;var o=ovDe81(f,c.id);if(o!==undefined){if(o===id)pon(c,{mv81:+c.chofer!==id?1:0});return}
  if(+c.chofer===id&&(c.dias&&c.dias.indexOf(d)>-1||c.extra===f))pon(c,c.extra===f?{ped:1}:null)});return out}
/* los que se quedaron sin visitar (solo si ese día sí trabajó) */
function pendDe81(r){if(!r)return [];var trab=r.salida&&r.salida.ok||(r.log||[]).length;if(!trab)return [];
 var L=r.cierre&&r.cierre.sent&&Array.isArray(r.pendManana)&&r.pendManana.length?r.pendManana:(r.stops||[]).filter(function(s){return !s.done&&!s.calle}).map(function(s){return s.c});
 return L.filter(function(x,i){return L.indexOf(x)===i&&cl(+x)&&!cl(+x).oculto})}
function rutaObj81(id){return +S.chofHoy===+id?S:(S.chSt||{})[id]}
var PEND81={};
/* → movido (tema-rutadia.js) */
/* → movido (tema-rutadia.js) */
/* los pedidos "para mañana" también quedan con su chofer */
/* pedAsigna: pasó a tema-piezas.js */

/* ---------- avisos al celular del chofer (el admin los deja en la nube; el chofer los aplica a su ruta) ---------- */
function op81(ch,op,cid){if(ch==null)return;var f=hoy81();S.rq81=S.rq81||{};S.rq81[f]=S.rq81[f]||{};S.rq81[f]['o'+Date.now().toString(36)+Math.random().toString(36).slice(2,6)]={ch:+ch,op:op,c:+cid,t:Date.now()}}
function ops81(ch){var o=(S.rq81||{})[hoy81()]||{};return Object.keys(o).map(function(k){return o[k]}).filter(function(x){return x&&+x.ch===+ch&&!x.hecho}).sort(function(a,b){return a.t-b.t})}
function toma81(){if(S.chofHoy==null||S.arOn)return false;var id=+S.chofHoy,f=hoy81();if(S.rutaDia80&&S.rutaDia80!==f)return false;var o=(S.rq81||{})[f];if(!o)return false;var ks=Object.keys(o).filter(function(k){var x=o[k];return x&&+x.ch===id&&!x.hecho});if(!ks.length)return false;
 S.stops=S.stops||[];var curC=S.stops[S.cur]&&S.stops[S.cur].c,ent=S.role==='rep'&&S.tab.rep==='entrega',mas=[],menos=[];
 ks.sort(function(a,b){return o[a].t-o[b].t}).forEach(function(k){var x=o[k],c=cl(x.c);if(!c){x.hecho=1;return}
  if(x.op==='add'){if(!S.stops.some(function(s){return +s.c===x.c&&!s.done})){S.stops.push({c:x.c,mv81:1});mas.push(c.n)}x.hecho=1}
  else{var i=-1;S.stops.forEach(function(s,j){if(i<0&&+s.c===x.c&&!s.done)i=j});if(i>-1&&ent&&+curC===x.c)return;if(i>-1){S.stops.splice(i,1);menos.push(c.n)}x.hecho=1}});
 if(curC!=null){var ni=S.stops.map(function(s){return +s.c}).indexOf(+curC);S.cur=ni>-1?ni:Math.max(0,curStop())}
 if(mas.length||menos.length){var t=(mas.length?'Se agregó a tu ruta: '+mas.join(', ')+'. ':'')+(menos.length?'Ya no visitas hoy: '+menos.join(', ')+'.':'');try{natNotif('Cambió tu ruta de hoy',t)}catch(e){}setTimeout(function(){try{toast(t)}catch(e){}},60)}return true}

/* ---------- lo que se ve en la pantalla ---------- */
function est81(c){if(c.ped&&(num(c.ped.R)||num(c.ped.M)))return {R:num(c.ped.R),M:num(c.ped.M)};var u=null;try{u=ultPedido(c)}catch(e){}return u?{R:num(u.R),M:num(u.M)}:{R:0,M:0}}
function cap81(id){var v=null;try{var va=vehAsig(id)||nbRGet(id,'vehHoy');v=va!=null?vehById(+va):null}catch(e){}return v?num(v.capC):0}
function salio81(id){try{var s=nbRGet(id,'salida');return !!(s&&s.ok)}catch(e){return false}}
/* la lista de un chofer: hoy = su ruta de verdad (con los cambios que van en camino); mañana = lo que se le va a armar */
function lista81(id,f){var hoy=f===hoy81(),L,nota='';
 if(hoy){var st=nbRGet(id,'stops'),dia=nbRGet(id,'rutaDia80');if(st&&(!dia||dia===f)){L=st.map(function(s){return {c:+s.c,done:!!s.done,ped:!!s.ped,pend:!!s.pend81,mv:!!s.mv81}})}
  else{var r=rutaObj81(id);L=plan81(id,f,r?pendDe81(r):[]).map(function(s){return {c:+s.c,ped:!!s.ped,pend:!!s.pend81,mv:!!s.mv81}});if(dia&&dia!==f&&r&&!(r.cierre&&r.cierre.sent)&&!rutaVacia(r))nota='Se le arma cuando mande su cierre de ayer.'}
  ops81(id).forEach(function(x){if(x.op==='add'){if(!L.some(function(y){return y.c===x.c&&!y.done}))L.push({c:x.c,mv:1,va:1})}else L=L.filter(function(y){return !(y.c===x.c&&!y.done)})})}
 else{var pend=[];try{var r2=rutaObj81(id);if(r2&&(!r2.rutaDia80||r2.rutaDia80===hoy81()))pend=pendDe81(r2)}catch(e){}L=plan81(id,f,pend).map(function(s){return {c:+s.c,ped:!!s.ped,pend:!!s.pend81,mv:!!s.mv81}})}
 return {L:L.filter(function(x){return cl(x.c)}),nota:nota}}
function sinCh81(f){var d=dDe81(f),ids=chs81().map(function(c){return +c.id});return S.cli.filter(function(c){if(c.oculto)return false;var o=ovDe81(f,c.id);if(o!==undefined)return false;return (c.dias&&c.dias.indexOf(d)>-1||c.extra===f)&&(c.chofer==null||ids.indexOf(+c.chofer)<0)})}
function sinDias81(){return S.cli.filter(function(c){return !c.oculto&&!c.rapida&&!(c.dias&&c.dias.length)})}
function hoyNo81(f){var o=(S.rutaOv81||{})[f]||{};return Object.keys(o).filter(function(k){return ovDe81(f,+k)===0&&cl(+k)}).map(function(k){return cl(+k)})}
function dTx81(f,p){var t=String(fmtF(f));return new RegExp('^'+p,'i').test(t)?t:p+' · '+t}
function zona81(c){var a=String(c.a||'').split(',')[0];return a.length>34?a.slice(0,33)+'…':a}
function it81(x,from,R){var c=cl(x.c),k=x.c+'|'+from,on=!!R.sel[k],e=est81(c),tg='';
 if(x.done)tg+='<span class="tg v">✓ Ya se le entregó</span>';if(x.pend)tg+='<span class="tg r">No se visitó '+(R.dia==='hoy'?'ayer':'hoy')+'</span>';if(x.ped||c.ped&&(c.ped.cuando||'hoy')===(R.dia==='hoy'?'hoy':'mañana'))tg+='<span class="tg">Pedido</span>';if(x.mv)tg+='<span class="tg">Cambiado'+(x.va?' · va en camino':'')+'</span>';if(c.lat==null)tg+='<span class="tg r">Sin ubicación</span>';
 return '<button class="it" data-act="rt81s" data-k="'+k+'" aria-pressed="'+on+'"'+(x.done?' disabled':'')+'><span class="ck">'+(on?'✓':'')+'</span><span style="flex:1;min-width:0"><b>'+esc(c.n)+'</b><span class="lbl" style="display:block">'+esc(zona81(c))+(e.R||e.M?' · ~'+(e.R?e.R+' cj':'')+(e.R&&e.M?' · ':'')+(e.M?e.M+' kg':''):'')+'</span>'+tg+'</span></button>'}
function rt81HTML(){var R=S.rt81;if(!R||S.role!=='admin')return '';R.sel=R.sel||{};var f=R.dia==='hoy'?hoy81():man81(),hoy=R.dia==='hoy',h='',pts=[],tot=0,nSel=Object.keys(R.sel).length;
 h+='<div class="chips" role="group" style="margin:4px 0 10px"><button data-act="rt81d" data-v="hoy" aria-pressed="'+hoy+'">'+esc(dTx81(hoy81(),'Hoy'))+'</button><button data-act="rt81d" data-v="man" aria-pressed="'+!hoy+'">'+esc(dTx81(man81(),'Mañana'))+'</button></div>';
 var sc=sinCh81(f),sd=sinDias81(),hn=hoyNo81(f),CH=chs81();
 if(sc.length)h+='<div class="card alert" style="padding:12px 14px"><b>⚠️ '+sc.length+' cliente'+(sc.length===1?'':'s')+' sin chofer</b><div class="lbl">Les toca '+(hoy?'hoy':'mañana')+' pero nadie los lleva. Márcalos y pásalos a un chofer.</div>'+sc.map(function(c){return it81({c:c.id},0,R)}).join('')+'</div>';
 if(sd.length)h+='<details class="card note"'+(R.sd?' open':'')+' data-act="rt81sd"><summary><b>'+sd.length+' cliente'+(sd.length===1?'':'s')+' sin días de visita</b> <span class="lbl">nunca les toca</span></summary><div class="lbl" style="margin:6px 0">Ponles sus días en su ficha (Clientes). Si les toca '+(hoy?'hoy':'mañana')+', márcalos y pásalos a un chofer.</div>'+sd.map(function(c){return it81({c:c.id},0,R)}).join('')+'</details>';
 if(!CH.length)h+='<div class="card note">No hay choferes. Dalos de alta en Personal.</div>';
 var top='<div class="card" style="padding:12px 14px"><div class="row"><span><b id="rt81tot"></b><br><span class="lbl">El orden de las paradas lo pone "Ordenar con tráfico" en el celular del chofer.</span></span></div><div class="ch81" style="margin-top:8px"><button class="btn sec" data-act="rt81todos">Todos a un chofer</button><button class="btn sec" data-act="rt81map">'+(R.map?'Ocultar el mapa':'🗺️ Ver en el mapa')+'</button></div></div>';
 var cards='';CH.forEach(function(ch){var id=+ch.id,o=lista81(id,f),L=o.L,col=chCol81(id),eR=0,eM=0,falt=L.filter(function(x){return !x.done});falt.forEach(function(x){var e=est81(cl(x.c));eR+=e.R;eM+=e.M});tot+=L.length;
  var cap=cap81(id),sal=hoy&&salio81(id),hechos=L.length-falt.length,cab=cap&&eR?(eR>cap?'<span class="tg r">No le cabe: ~'+eR+' cajas y le caben '+cap+'</span>':'<span class="tg v">Le cabe: ~'+eR+' de '+cap+' cajas</span>'):'';
  L.forEach(function(x){var c=cl(x.c);if(c.lat!=null)pts.push({lat:+c.lat,lng:+c.lng,col:col,t:String(chofN(id)).charAt(0),n:c.n+' · '+chofN(id),op:x.done?.4:1})});
  cards+='<div class="card chc" style="border-left-color:'+col+'"><div class="row" style="align-items:flex-start"><span style="flex:1"><i class="dot" style="background:'+col+'"></i><b style="font-size:18px">'+esc(chofN(id))+'</b><br><span class="lbl">'+L.length+' cliente'+(L.length===1?'':'s')+(hechos?' · ya entregó '+hechos:'')+(eR||eM?' · lleva ~'+(eR?eR+' cajas':'')+(eR&&eM?' y ':'')+(eM?eM+' kg':''):'')+(sal?' · <b>ya va en camino</b>':(hoy?' · no ha salido':''))+'</span><br>'+cab+'</span>'+(falt.length?'<button class="btn sm sec" data-act="rt81tod" data-id="'+id+'">Pasar todos…</button>':'')+'</div>'
   +(o.nota?'<div class="lbl" style="margin-top:6px">⏳ '+esc(o.nota)+'</div>':'')+(L.length?L.map(function(x){return it81(x,id,R)}).join(''):'<div class="lbl" style="margin-top:6px">No tiene clientes '+(hoy?'hoy':'mañana')+'.</div>')+'</div>'});
 sc.forEach(function(c){if(c.lat!=null)pts.push({lat:+c.lat,lng:+c.lng,col:'var(--danger)',t:'?',n:c.n+' · sin chofer'})});
 h+=top.replace('<b id="rt81tot"></b>','<b>'+tot+' cliente'+(tot===1?'':'s')+' '+(hoy?'hoy':'mañana')+'</b>')+(R.map?'<div class="card" style="padding:6px">'+mapaVivoHTML('rt81m',{pts:pts,refit:true},320)+'<div class="lbl" style="padding:6px">Cada color es un chofer. Rojo: sin chofer.</div></div>':'')+cards;
 if(hn.length)h+='<div class="card"><b>'+(hoy?'Hoy':'Mañana')+' no se visitan</b><div class="lbl">Solo ese día. Después vuelven solos a su ruta.</div>'+hn.map(function(c){return '<div class="row"><span>'+esc(c.n)+'</span><button class="btn sm sec" data-act="rt81vol" data-id="'+c.id+'">Volver a ponerlo</button></div>'}).join('')+'</div>';
 if(R.pick){var src=Object.keys(R.sel).map(function(k){return +k.split('|')[1]}).filter(function(x,i,a){return x&&a.indexOf(x)===i}),dest=R.pick.dest,camino=hoy?CH.filter(function(c){return salio81(+c.id)&&(src.indexOf(+c.id)>-1||+c.id===+dest)}):[];
  h+='<div class="bar81" id="rt81bar"><b style="font-size:17px">Pasar '+nSel+' cliente'+(nSel===1?'':'s')+' a…</b><div class="ch81" style="margin:8px 0">'+CH.map(function(c){return '<button class="btn'+(+dest===+c.id?'':' sec')+'" data-act="rt81dest" data-id="'+c.id+'" style="border-left:6px solid '+chCol81(c.id)+'">'+esc(chofN(c.id))+'</button>'}).join('')+'</div>'
   +'<div class="chips" role="group"><button data-act="rt81modo" data-v="dia" aria-pressed="'+(R.pick.modo!=='siempre')+'">Solo '+(hoy?'hoy':'mañana')+'</button><button data-act="rt81modo" data-v="siempre" aria-pressed="'+(R.pick.modo==='siempre')+'">Siempre (cambia su chofer)</button></div>'
   +(camino.length?'<div class="card note" style="margin:8px 0;padding:10px 12px">🚚 '+camino.map(function(c){return esc(chofN(c.id))}).join(' y ')+' ya va'+(camino.length>1?'n':'')+' en camino. Se puede cambiar: le llega un aviso con el cambio.</div>':'')
   +'<div class="ch81" style="margin-top:8px"><button class="btn sec" data-act="rt81can">Cancelar</button><button class="btn" data-act="rt81ok"'+(dest==null?' disabled':'')+'>Hacer el cambio</button></div></div>'}
 else if(nSel)h+='<div class="bar81" id="rt81bar"><b>'+nSel+' marcado'+(nSel===1?'':'s')+'</b><div class="ch81" style="margin-top:8px"><button class="btn" data-act="rt81pas">Pasar a…</button><button class="btn sec" data-act="rt81no">'+(hoy?'Hoy no':'Mañana no')+'</button><button class="btn sec" data-act="rt81lim" style="flex-basis:100%">Quitar las marcas</button></div></div>';
 return ovW70('rt81','Rutas',h,'rt81x')}
/* poner la ventana sin perder dónde ibas */
function rt81Pon(){var o=document.getElementById('rt81'),y=o?o.scrollTop:0;var h=rt81HTML();if(!h){if(o)o.remove();return}if(o&&o._h===h)return;ovPon70('rt81',h);var n=document.getElementById('rt81');if(n){n._h=h;n.scrollTop=y}}
/* hacer los cambios */
function aplica81(dest,modo){var R=S.rt81,f=R.dia==='hoy'?hoy81():man81(),hoy=R.dia==='hoy',n=0,nom=[],av={};
 Object.keys(R.sel).forEach(function(k){var p=k.split('|'),cid=+p[0],from=+p[1]||null,c=cl(cid);if(!c)return;n++;nom.push(c.n);
  if(dest==='no'){ovPon81(f,cid,0);if(hoy&&from)op81(from,'quit',cid);else if(from){(av[from]=av[from]||[]).push('Mañana no visitas a '+c.n)}return}
  dest=+dest;if(modo==='siempre')c.chofer=dest;ovPon81(f,cid,dest);
  if(hoy){if(from&&from!==dest)op81(from,'quit',cid);if(from!==dest)op81(dest,'add',cid)}else if(from!==dest)(av[dest]=av[dest]||[]).push('Mañana también te toca '+c.n)});
 Object.keys(av).forEach(function(id){try{rutaAviso(+id,av[id].join(' · '))}catch(e){}});
 var tx=dest==='no'?(hoy?'Hoy':'Mañana')+' no se visita: '+nom.join(', '):'Pasó '+(n===1?'a '+nom[0]:n+' clientes')+' con '+chofN(dest)+(modo==='siempre'?' (para siempre)':' ('+(hoy?'solo hoy':'solo mañana')+')');
 S.hist.push({t:fmtF(hoy81())+' '+hhmm(),q:quien(),x:'Rutas: '+tx});R.sel={};R.pick=null;toast(tx)}
document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act^="rt81"]');if(!b)return;var a=b.dataset.act;if(a==='rt81sd'||a==='rt81ay')return;e.preventDefault();e.stopImmediatePropagation();
 if(a==='rt81open'){S.rt81={dia:b.dataset.v||'hoy',sel:{}};render();return}var R=S.rt81;if(!R)return;
 if(a==='rt81x'){S.rt81=null;render();return}
 if(a==='rt81d'){R.dia=b.dataset.v;R.sel={};R.pick=null;render();return}
 if(a==='rt81s'){var k=b.dataset.k;if(R.sel[k])delete R.sel[k];else{Object.keys(R.sel).forEach(function(x){if(x.split('|')[0]===k.split('|')[0])delete R.sel[x]});R.sel[k]=1}R.pick=null;render();return}
 if(a==='rt81lim'){R.sel={};R.pick=null;render();return}
 if(a==='rt81map'){R.map=!R.map;render();return}
 var f=R.dia==='hoy'?hoy81():man81();
 if(a==='rt81tod'||a==='rt81todos'){R.sel={};var ids=a==='rt81tod'?[+b.dataset.id]:chs81().map(function(c){return +c.id});ids.forEach(function(id){lista81(id,f).L.forEach(function(x){if(!x.done)R.sel[x.c+'|'+id]=1})});if(a==='rt81todos')sinCh81(f).forEach(function(c){R.sel[c.id+'|0']=1});
  if(!Object.keys(R.sel).length){toast('No hay clientes para pasar');render();return}R.pick={dest:null,modo:'dia'};render();setTimeout(function(){var x=document.getElementById('rt81bar');if(x)x.scrollIntoView({block:'end'})},30);return}
 if(a==='rt81pas'){R.pick={dest:null,modo:'dia'};render();return}
 if(a==='rt81can'){R.pick=null;render();return}
 if(a==='rt81dest'){R.pick.dest=+b.dataset.id;render();return}
 if(a==='rt81modo'){R.pick.modo=b.dataset.v;render();return}
 if(a==='rt81ok'){if(R.pick.dest==null)return;aplica81(R.pick.dest,R.pick.modo);render();return}
 if(a==='rt81no'){aplica81('no');render();return}
 if(a==='rt81vol'){var c=cl(+b.dataset.id);ovPon81(f,c.id,null);if(R.dia==='hoy'&&c.chofer!=null)op81(+c.chofer,'add',c.id);S.hist.push({t:fmtF(hoy81())+' '+hhmm(),q:quien(),x:'Rutas: volvió a poner a '+c.n});toast('Listo: '+c.n+' vuelve a su ruta');render();return}},true);
document.addEventListener('toggle',function(e){var t=e.target;if(t&&t.dataset&&t.dataset.act==='rt81sd'&&S.rt81)S.rt81.sd=t.open},true);
/* la entrada: arriba en Inicio y en Personal */
function rtEntrada81(){if(S.role!=='admin'||S.encOn||S.rt81)return;var t=S.tab.admin;if(t!=='inicio'&&t!=='personal')return;var m=document.querySelector('main');if(!m||m.querySelector('[data-x="rt81e"]'))return;
 var f=hoy81(),n=0,partes=[];chs81().forEach(function(c){var k=lista81(+c.id,f).L.length;n+=k;if(k)partes.push(chofN(c.id)+' '+k)});var sc=sinCh81(f).length;
 var d=document.createElement('div');d.dataset.x='rt81e';d.className='card'+(sc?' alert':'');d.style.padding='12px 14px';
 d.innerHTML='<div class="row"><span><b style="font-size:18px">🗺️ Rutas de hoy</b><br><span class="lbl">'+n+' cliente'+(n===1?'':'s')+(partes.length?' · '+esc(partes.join(' · ')):'')+(sc?' · <b>'+sc+' sin chofer</b>':'')+'</span></span></div><div style="display:flex;gap:8px;margin-top:8px"><button class="btn" style="flex:1" data-act="rt81open" data-v="hoy">Ver y repartir</button><button class="btn sec" style="flex:1" data-act="rt81open" data-v="man">Mañana</button></div>';
 var ref=m.querySelector('[data-x="dia80a"]');if(ref)ref.after(d);else m.prepend(d)}
/* render: pasó a tema-dibujar1.js */

/* ---------- 39 · Rutas en el tutorial ---------- */
try{TUT.admin.splice(1,0,['[data-x="rt81e"]','Rutas','Aquí ves qué clientes tocan hoy y mañana y con qué chofer. Toca "Ver y repartir" para pasar clientes de un chofer a otro, saltar a uno solo por hoy o ver la ruta en el mapa.'])}catch(e){}
try{TUT.rep.push(['nav.tabs button[data-t="ruta"], nav.tabs','Tu ruta puede cambiar','Si el administrador te pasa un cliente o te quita uno, te llega un aviso y tu lista se acomoda sola.'])}catch(e){}
TUT['n:rt81']=[['[data-x="rt81e"]','Nuevo: Rutas','Aquí ves cuántos clientes lleva cada chofer hoy y si alguno se quedó sin chofer.'],
 ['[data-x="rt81e"] [data-act="rt81open"][data-v="hoy"]','Ver y repartir','Marca uno o varios clientes y toca "Pasar a…". Escoges el chofer y si es solo por hoy o para siempre. Si ya salió, le llega un aviso al momento.'],
 ['[data-x="rt81e"] [data-act="rt81open"][data-v="man"]','Mañana','Lo mismo para mañana: la ruta se le arma sola con tus cambios. Con "Mañana no" saltas a un cliente solo ese día.']];
TUT['n:rt81rep']=[['nav.tabs button[data-t="ruta"], nav.tabs','Tu ruta puede cambiar','Si el administrador te pasa un cliente o te quita uno, te llega un aviso y tu lista se acomoda sola. El orden lo pones tú con "Ordenar con tráfico".']];
/* tutIniciar: pasó a tema-guia.js */
function tutNuevo81(){if(window.__pnTest||!REAL||S.tut||window.__tutAct||(typeof _pin!=='undefined'&&_pin&&_pin.modo)||document.getElementById('nbov')||document.getElementById('setov')||S.rt81)return;S.tutVisto=S.tutVisto||{};
 var k=S.role==='admin'&&!S.encOn&&S.tab.admin==='inicio'&&document.querySelector('[data-x="rt81e"]')?'n:rt81':(S.role==='rep'?'n:rt81rep':null);if(!k||S.tutVisto[k]||!S.tutVisto[S.role==='rep'?'rep':'admin'])return;
 S.tutVisto[k]=true;setTimeout(function(){if(S.tut)return;S.tut={k:k,i:0,prev:{tab:S.tab[S.role]},tab:S.tab[S.role]};render()},1200)}
/* "Aprende la app": Repartir las rutas */
/* aprendeItems: pasó a tema-guia.js */
/* aplica81: pasó a tema-rutas.js */
function aprende81(){Array.prototype.forEach.call(document.querySelectorAll('[data-act="aprendeir"]'),function(b){if(/Repartir las rutas/.test(b.textContent)){b.dataset.act='rt81open';b.dataset.v='hoy'}})}
/* botón "?" */
function help81(){try{if(HELP._81)return;HELP.inicio[1]+=' En "Rutas de hoy" ves qué clientes lleva cada chofer y los repartes.';HELP.personal[1]+=' Para repartir los clientes de hoy o mañana usa "Rutas de hoy".';HELP._81=1}catch(e){}}
/* dentro de Rutas: "¿Cómo se usa?" (abierta la primera vez) */
/* rt81HTML: aquí había una envoltura que no se usaba (l84 rehace rt81HTML completa al cargar); se quitó el 19 nov */
document.addEventListener('toggle',function(e){var t=e.target;if(t&&t.dataset&&t.dataset.act==='rt81ay'&&S.rt81)S.rt81.ay=t.open},true);
/* render: pasó a tema-dibujar1.js */
