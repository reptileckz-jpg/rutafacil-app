/* ===================== v7.5 · (11 nov)
   53 Bodega → "Fruta madura por antigüedad": cada lote se toca (o se desliza) y dice qué pasó: se tiró / se remató / ya no está / estaba buena y salió a la venta
   57 Pedidos por WhatsApp: en qué va cada pedido (recibido → chofer asignado → salió a reparto), "Asignar chofer" ahí mismo y los ya asignados chiquitos
   56 "🐞 Reportar un problema" (menú y "?"), con lo que la app sabe sola; Ajustes → "Problemas reportados" y "Sacar el registro"
   58 ubicaciones: estoy aquí (GPS) / buscar como en Uber (Google) / pegar link, con pin que se arrastra; bodega en la primera vez,
      proveedores y clientes; el chofer confirma la ubicación cuando está en el lugar ===================== */
(function(){var st=document.createElement('style');st.textContent=[
 '.ov70{position:fixed;inset:0;z-index:97;background:var(--bg);overflow-y:auto}.ov70 .w{max-width:480px;margin:0 auto;padding:12px 16px 40px}',
 '.ov70 .hd{display:flex;align-items:center;gap:10px;background:var(--surface);border-bottom:1px solid var(--line);padding:12px 16px;position:sticky;top:0;z-index:2}.ov70 .hd b{font-size:20px;font-weight:900;flex:1}',
 '.ov70 .q{font-size:22px;font-weight:900;margin:14px 0 6px;line-height:1.25}.ov70 .op{display:flex;align-items:center;gap:12px;width:100%;min-height:68px;padding:12px 14px;margin-top:10px;border-radius:18px;border:2px solid var(--line);background:var(--surface);font-size:18px;font-weight:800;text-align:left;color:inherit}',
 '.ov70 .op span.e{font-size:28px;width:36px;text-align:center}.ov70 .op small{display:block;font-size:14px;font-weight:600;color:var(--muted)}',
 '.ov70 .btn.big{min-height:58px;font-size:18px;margin-top:12px;width:100%}',
 '.lote[data-act="lt53"]{cursor:pointer}.lote .tq53{font-size:13px;color:var(--muted);margin-top:6px;font-weight:700}',
 '.p57 .it.min{padding:10px 12px!important}.p57 .stp{display:flex;gap:4px;margin-top:8px;flex-wrap:wrap}.p57 .stp span{font-size:13px;font-weight:800;padding:4px 9px;border-radius:999px;background:rgba(255,255,255,.12);color:#CBD5E1}.p57 .stp span.on{background:#16A34A;color:#fff}',
 '.p57 .asg{margin-top:10px;width:100%;min-height:50px;border-radius:14px;border:0;background:#F59E0B;color:#1E293B;font-weight:900;font-size:17px}',
 '.p57 .tg{background:none;border:0;color:#A7F3D0;font-weight:800;font-size:15px;min-height:40px;margin-top:6px;text-decoration:underline}',
 '#ub68map{height:280px;border-radius:16px;overflow:hidden;border:1px solid var(--line);margin-top:8px}',
 '.ub68r{display:block;width:100%;text-align:left;padding:12px 14px;margin-top:8px;border-radius:14px;border:1px solid var(--line);background:var(--surface);color:inherit;font-size:16px}.ub68r b{display:block;font-size:17px}',
 '#blov{z-index:96!important}'
 ].join('\n');document.head.appendChild(st)})();
function ovW70(id,tit,body,x){return '<div id="'+id+'" class="ov70" role="dialog" aria-label="'+esc(tit)+'"><div class="hd"><b>'+esc(tit)+'</b><button class="helpb" style="margin:0" data-act="'+x+'" aria-label="Cerrar">×</button></div><div class="w">'+body+'</div></div>'}
function ovPon70(id,html){var o=document.getElementById(id);if(o)o.remove();if(!html)return;var w=document.createElement('div');w.innerHTML=html;document.body.appendChild(w.firstElementChild)}

/* =============== 53 · lotes de fruta madura =============== */
antig65=function(){var L=(S.madL||[]).map(function(x,i){return {x:x,i:i}}).filter(function(o){return num(o.x.q)>0});if(!L.length)return null;var v=3;try{v=vidaDias()}catch(e){}
 L.sort(function(a,b){return String(a.x.dia).localeCompare(String(b.x.dia))});
 var d=document.createElement('div');d.className='card n65';d.dataset.x='antig65';
 d.innerHTML='<div class="hd"><span class="ic" style="background:#DBEAFE;color:#2563EB">'+IC65.reloj+'</span><span class="grow"><div class="tt">Fruta madura por antigüedad</div><div class="st">Sale primero la más vieja · toca un lote para decir qué pasó</div></span></div>'
  +'<div class="alc" style="background:var(--bg);border:1px solid var(--line);margin-top:0">🌡️ Ya madura aguanta <b>~'+v+' día'+(v===1?'':'s')+'</b> con este clima.</div>'
  +L.map(function(o){var x=o.x,e=0;try{e=madEdad(x)}catch(er){}var q=v-e,mal=q<=0,man=q===1,col=mal?'#B91C1C':(man?'#B45309':'#15803D'),bg=mal?'color-mix(in srgb,#DC2626 7%,var(--surface))':'var(--bg)',tag=mal?'Pasada de tiempo':(man?'Sale mañana':'Lista para salir'),tbg=mal?'#DC2626':(man?'#FEF3C7':'#DCFCE7'),tfg=mal?'#fff':col;
   return '<div class="lote" role="button" tabindex="0" data-act="lt53" data-k="'+o.i+'" data-p="'+x.p+'" style="background:'+bg+';border-color:'+(mal?'color-mix(in srgb,#DC2626 30%,transparent)':'var(--line)')+'"><div style="display:flex;justify-content:space-between;gap:8px;align-items:flex-start"><span><div class="q">'+(x.p==='R'?n65(x.q)+' cajas de roatán':n65(x.q)+' kg de macho')+'</div><div class="st">Salió de madurar '+(e<=0?'hoy':'hace <b style="color:'+col+'">'+e+' día'+(e===1?'':'s')+'</b>')+'</div></span><span class="tag" style="background:'+tbg+';color:'+tfg+'">'+tag+'</span></div>'
    +(mal?'<div class="st" style="color:#B91C1C;font-weight:700;margin-top:8px;padding-top:8px;border-top:1px solid color-mix(in srgb,#DC2626 25%,transparent)">⚠️ Revisarla o rematarla hoy</div>':'')+'<div class="tq53">Toca para decir qué pasó ›</div></div>'}).join('');return d};
function lt53Lote(){var t=S.lt53;return t?(S.madL||[])[t.k]:null}
function lt53HTML(){var t=S.lt53,x=lt53Lote();if(!t)return '';if(!x||num(x.q)<=0){S.lt53=null;return ''}
 var R=x.p==='R',u=R?'cajas':'kg',qtxt=(R?n65(x.q)+' cajas de roatán':n65(x.q)+' kg de macho'),adm=S.role==='admin'&&!S.encOn,kc=20;try{kc=vlKgCaja()||20}catch(e){}
 var f=function(id,bind,v,l){return '<div class="field"><label for="'+id+'">'+l+'</label><input id="'+id+'" type="number" inputmode="decimal" min="0" step="any" data-bind="'+bind+'" value="'+esc(v)+'"></div>'},h='',
  pie=function(sig,lab){return '<div style="display:flex;gap:8px;margin-top:16px"><button class="btn sec" style="flex:1;min-height:56px" data-act="lt53atras">Atrás</button><button class="btn" style="flex:2;min-height:56px" data-act="'+sig+'">'+lab+'</button></div>'};
 if(t.paso===0){h='<div class="card" style="padding:12px 14px"><b style="font-size:19px">'+qtxt+'</b><div class="lbl">Salió de madurar el '+esc(fmtF(x.dia))+'</div></div><div class="q">¿Qué pasó con este lote?</div>'
  +[['tiro','🗑️','Se tiró','Ya no servía (merma)'],['remate','💲','Se remató','Se vendió barato en bodega, por kilo'],['noesta','❓','Ya no está','No sé bien qué pasó'],['salio','✅','Estaba buena y salió a la venta','Ya se cargó a un chofer; no cambia ningún número']].map(function(o){return '<button class="op" data-act="lt53op" data-v="'+o[0]+'"><span class="e">'+o[1]+'</span><span>'+o[2]+'<small>'+o[3]+'</small></span></button>'}).join('')}
 else if(t.op==='tiro'){if(t.q==='')t.q=String(x.q);h='<div class="q">¿Cuánto se tiró?</div>'+f('lt53q','lt53.q',t.q,R?'Cajas':'Kilos')+'<div class="lbl">Hay '+qtxt+' en este lote.'+(R?' Las taras quedan vacías en bodega.':'')+'</div>'+(adm?'':'<div class="lbl">Le llega al administrador para aprobarlo.</div>')+pie('lt53ok','Siguiente')}
 else if(t.op==='remate'||t.op==='noesta'&&t.sub==='bodega'){if(!adm){h='<div class="card note" style="padding:12px 14px">El remate lo registra el administrador (entra dinero a la caja). Avísale.</div>'+pie('lt53x','Entendido')}else{if(t.q==='')t.q=String(x.q);if(t.kg==='')t.kg=String(R?Math.round(num(t.q)*kc):num(t.q));var tot=num(t.kg)*num(t.pr);
   h='<div class="q">¿Cuánto se remató y a cuánto?</div>'+(R?f('lt53q','lt53.q',t.q,'Cajas'):'')+f('lt53kg','lt53.kg',t.kg,'Kilos')+f('lt53pr','lt53.pr',t.pr,'Precio por kilo $')+'<div class="card" style="padding:10px 14px;margin-top:8px">'+rw('Entra a la caja',money(tot))+'</div>'+pie('lt53ok','Siguiente')}}
 else if(t.op==='noesta'&&!t.sub){h='<div class="q">¿Alguien la vendió?</div><button class="op" data-act="lt53sub" data-v="bodega"><span class="e">💲</span><span>Se vendió en bodega<small>Escribes cuánto y a cuánto</small></span></button><button class="op" data-act="lt53sub" data-v="nose"><span class="e">🤷</span><span>No sé<small>Solo se descuenta; queda en el historial quién y cuándo</small></span></button><div class="lbl" style="margin-top:8px">Si se la llevó un chofer, eso ya entró con su carga: escoge "Estaba buena y salió a la venta".</div>'+pie('lt53x','Cancelar')}
 else if(t.op==='noesta'&&t.sub==='nose'){if(t.q==='')t.q=String(x.q);h='<div class="q">¿Cuánto ya no está?</div>'+f('lt53q','lt53.q',t.q,R?'Cajas':'Kilos')+(R?'<div class="lbl">Las taras se cuentan como vacías en bodega; si tampoco están, cuéntalas en Bodega → Taras.</div>':'')+pie('lt53ok','Siguiente')}
 else if(t.op==='salio'){h='<div class="q">Estaba buena y salió a la venta</div><div class="card" style="padding:12px 14px">Cuando el chofer cargó, la app ya la descontó del inventario. Aquí solo se corrige <b>cuáles quedan</b>: las de bodega son las más nuevas.<br><br><b>No cambia ningún número</b> (inventario, cajas del chofer ni dinero).</div>'+pie('lt53ok','Siguiente')}
 if(t.paso===2){var qq=num(t.q),txt=t.op==='tiro'?'Se tiraron '+qq+' '+u+' de '+(R?'roatán':'macho')+(adm?'. Se descuentan del inventario como merma.':'. Se manda al administrador para aprobar.'):(t.op==='salio'?'Este lote ya salió a la venta. Solo se acomodan las fechas de lo que queda.':(t.op==='noesta'&&t.sub==='nose'?'Ya no están '+qq+' '+u+'. Se descuentan del inventario y queda en el historial.':'Se remataron '+(R?qq+' cajas (':'')+num(t.kg)+' kg'+(R?')':'')+' a '+f2(num(t.pr))+' el kilo: entran '+money(num(t.kg)*num(t.pr))+' a la caja y se descuentan del inventario.'));
  h='<div class="q">¿Seguro?</div><div class="card" style="padding:12px 14px;font-size:17px">'+txt+'</div>'+pie('lt53si','Sí, registrar')}
 return ovW70('lt53ov','Fruta madura · '+(R?'roatán':'macho'),h,'lt53x')}
function lt53Valida(){var t=S.lt53,x=lt53Lote(),R=x.p==='R',q=num(t.q),inv=R?num(S.inv.maduras):num(S.inv.kgMaduro);
 if(t.op==='salio')return '';if(t.op==='noesta'&&!t.sub)return 'Escoge una opción';
 if(!(q>0))return 'Escribe cuánto';if(q>num(x.q)+0.001)return 'En este lote solo hay '+n65(x.q)+(R?' cajas':' kg');if(q>inv+0.001)return 'En bodega solo hay '+n65(inv)+(R?' cajas maduras':' kg maduros');if(R&&q!==Math.round(q))return 'Las cajas van sin decimales';
 if(t.op==='remate'||t.sub==='bodega'){if(!(num(t.kg)>0))return 'Escribe los kilos';if(!(num(t.pr)>0))return 'Escribe el precio por kilo'}return ''}
function lt53Aplica(){var t=S.lt53,x=lt53Lote(),R=x.p==='R',q=num(t.q),hoy=iso(TODAY),adm=S.role==='admin'&&!S.encOn,qn=quien(),nom=R?q+' cajas de roatán':q+' kg de macho',hist=function(s){S.hist.push({t:fmtF(hoy)+' '+hhmm(),q:qn,x:s})};
 var baja=function(){x.q=R?num(x.q)-q:r2(num(x.q)-q);if(R){S.inv.maduras=num(S.inv.maduras)-q;S.inv.vacias=num(S.inv.vacias)+q}else S.inv.kgMaduro=r2(num(S.inv.kgMaduro)-q);S.madL=(S.madL||[]).filter(function(z){return num(z.q)>0.001})};
 var costo=R?q*costoCajaAct():q*costoKgMAct();
 if(t.op==='salio'){var otros=(S.madL||[]).filter(function(z){return z!==x&&z.p===x.p&&num(z.q)>0}).map(function(z){return String(z.dia)}).sort(),nd=otros.length?otros[otros.length-1]:hoy;if(nd<x.dia)nd=x.dia;var dv=x.dia;x.dia=nd;hist('Lote de fruta madura ('+(R?n65(x.q)+' cajas de roatán':n65(x.q)+' kg de macho')+', del '+fmtF(dv)+') salió a la venta: solo se acomodó la fecha (sin cambiar números)');return 'Listo: solo se acomodaron las fechas'}
 if(t.op==='tiro'){var it={R:R?q:0,M:R?0:q,mot:'Lote pasado de tiempo',foto:null,quien:adm?'Administrador':qn,valor:costo,est:adm?'ok':'pend'};S.tiradas.push(it);
  if(!adm){hist('Mandó a aprobar merma: '+nom);return 'Enviado al administrador para aprobar'}
  baja();S.mermas.push({tipo:'Fruta tirada',fecha:hoy,R:R?q:0,M:R?0:q,valor:costo,txt:'Lote de fruta madura pasado de tiempo'});hist('Se tiró '+nom+' (merma de '+money(costo)+')');return 'Merma registrada: '+money(costo)}
 if(t.op==='remate'||t.sub==='bodega'){var kg=num(t.kg),pr=num(t.pr),tot=r2(kg*pr);baja();S.aportes=S.aportes||[];S.aportes.push({t:'Remate en bodega',de:qn,f:hoy,m:tot,n:nom+' · '+kg+' kg a '+f2(pr),tipo:'remate'});
  S.mermas.push({tipo:'Remate',fecha:hoy,R:R?q:0,M:R?0:q,valor:Math.max(0,r2(costo-tot)),txt:kg+' kg a '+f2(pr)+' el kilo ('+money(tot)+')'});hist('Remató '+nom+': '+kg+' kg a '+f2(pr)+' = '+money(tot)+' a la caja');return 'Remate registrado: '+money(tot)+' a la caja'}
 if(t.sub==='nose'){baja();S.mermas.push({tipo:'Ya no estaba',fecha:hoy,R:R?q:0,M:R?0:q,valor:costo,txt:'Lote de fruta madura que ya no estaba (no se sabe qué pasó)'});hist('Ya no estaba: '+nom+' (se descontó; valor '+money(costo)+')');return 'Listo: se descontó del inventario'}
 return ''}
document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act]');if(!b)return;var a=b.dataset.act;if(!/^lt53/.test(a))return;e.stopImmediatePropagation();var t=S.lt53;
 if(a==='lt53'){if(S.role!=='admin'&&S.role!=='local'){toast('Esto lo hace el administrador');return}S.lt53={k:+b.dataset.k,paso:0,op:'',sub:'',q:'',kg:'',pr:''};render();return}
 if(!t)return;
 if(a==='lt53x'){S.lt53=null;render();return}
 if(a==='lt53op'){t.op=b.dataset.v;t.sub='';t.paso=1;render();return}
 if(a==='lt53sub'){t.sub=b.dataset.v;render();return}
 if(a==='lt53atras'){if(t.paso===2)t.paso=1;else if(t.op==='noesta'&&t.sub)t.sub='';else{t.paso=0;t.op='';t.q='';t.kg=''}render();return}
 if(a==='lt53ok'){var er=lt53Valida();if(er){toast(er);return}t.paso=2;render();return}
 if(a==='lt53si'){var er2=lt53Valida();if(er2){toast(er2);return}var m=lt53Aplica();S.lt53=null;toast(m);render();return}},true);
/* deslizar el lote = abrir las mismas opciones */
(function(){var s=null;document.addEventListener('pointerdown',function(e){var l=e.target.closest&&e.target.closest('.lote[data-act="lt53"]');s=l?{l:l,x:e.clientX,y:e.clientY}:null},true);
 document.addEventListener('pointerup',function(e){if(!s)return;var dx=e.clientX-s.x,dy=e.clientY-s.y,l=s.l;s=null;if(Math.abs(dx)>60&&Math.abs(dy)<40)l.click()},true)})();
/* al llegar desde el numerito de la barra (62c), además de marcar el lote se abren sus opciones */
/* avFoco: pasó a tema-avisos.js */

/* =============== 57 · pedidos por WhatsApp =============== */
function chofsDia57(){return choferesL().filter(function(c){return !c.baja})}
function est57(c){var r={ch:null,salio:false};chofsDia57().forEach(function(ch){if(r.ch)return;var st=null;try{st=nbRGet(ch.id,'stops')}catch(e){}if(!st&&+ch.id===+S.chofHoy)st=S.stops;var ar=((S.arPas||{})[ch.id]||[]);
  if((st||[]).some(function(s){return +s.c===+c.id&&!s.done})||ar.indexOf(c.id)>-1){r.ch=ch;var sl=null;try{sl=nbRGet(ch.id,'salida')}catch(e){}r.salio=!!(sl&&sl.ok)}});return r}
/* pedidoCard: pasó a tema-inicio.js */
function p57HTML(){var x=S.p57;if(!x)return '';var c=cl(x.c);if(!c||!c.ped){S.p57=null;return ''}var e=est57(c),p=c.ped;
 var h='<div class="card" style="padding:12px 14px"><b style="font-size:19px">'+esc(c.n)+'</b><div class="lbl">'+(num(p.R)?num(p.R)+' cajas de roatán ':'')+(num(p.M)?num(p.M)+' kg de macho':'')+'</div>'+(e.ch?'<div style="margin-top:6px">Ahora lo lleva: <b>'+esc(e.ch.n)+'</b>'+(e.salio?' (ya salió)':'')+'</div>':'')+'</div><div class="q">¿Qué chofer lo lleva hoy?</div>'
  +chofsDia57().map(function(ch){var sl=null;try{sl=nbRGet(ch.id,'salida')}catch(er){}var on=e.ch&&+e.ch.id===+ch.id;return '<button class="op" data-act="p57ch" data-id="'+ch.id+'"'+(on?' style="border-color:var(--accent)"':'')+'><span class="e">🚚</span><span>'+esc(ch.n)+'<small>'+(sl&&sl.ok?'Ya salió a repartir (le llega el aviso)':'Todavía en bodega')+(on?' · ya lo lleva':'')+'</small></span></button>'}).join('');
 if(x.conf){var nv=cl0(x.conf);h='<div class="q">¿Seguro?</div><div class="card" style="padding:12px 14px;font-size:17px">El pedido de <b>'+esc(c.n)+'</b> se pasa de '+esc(e.ch.n)+' a <b>'+esc(nv?nv.n:'')+'</b>. A los dos les llega el aviso.</div><div style="display:flex;gap:8px;margin-top:16px"><button class="btn sec" style="flex:1;min-height:56px" data-act="p57no">No</button><button class="btn" style="flex:2;min-height:56px" data-act="p57si">Sí, cambiar</button></div>'}
 return ovW70('p57ov','Asignar chofer',h,'p57x')}
function p57Stops(id){if(+id===+S.chofHoy&&!S.arOn)return S.stops;if((S.chSt||{})[id])return S.chSt[id].stops=S.chSt[id].stops||[];return null}
function p57Asigna(c,id){var e=est57(c),tx=c.n+' ('+(num(c.ped.R)?num(c.ped.R)+' cajas':'')+(num(c.ped.R)&&num(c.ped.M)?', ':'')+(num(c.ped.M)?num(c.ped.M)+' kg':'')+')';
 if(e.ch){var o=p57Stops(e.ch.id);if(o){for(var i=o.length-1;i>=0;i--)if(+o[i].c===+c.id&&!o[i].done)o.splice(i,1)}if(S.arPas&&S.arPas[e.ch.id])S.arPas[e.ch.id]=S.arPas[e.ch.id].filter(function(z){return +z!==+c.id});rutaAviso(e.ch.id,'Ya no llevas el pedido de '+tx+': se lo pasaron a '+chofN(id))}
 var st=p57Stops(id);if(st){if(!st.some(function(s){return +s.c===+c.id&&!s.done}))st.push({c:c.id,ped:true})}else{S.arPas=S.arPas||{};S.arPas[id]=(S.arPas[id]||[]).concat([c.id])}
 var sl=null;try{sl=nbRGet(id,'salida')}catch(er){}rutaAviso(id,(sl&&sl.ok?'Tienes una parada nueva: ':'Pedido para hoy: ')+tx);
 S.hist.push({t:fmtF(iso(TODAY))+' '+hhmm(),q:quien(),x:'Asignó el pedido de '+tx+' a '+chofN(id)});return 'Listo: '+chofN(id)+' lleva el pedido de '+c.n}
document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act]');if(!b)return;var a=b.dataset.act;if(!/^p57/.test(a))return;e.stopImmediatePropagation();var x=S.p57;
 if(a==='p57all'){S.ped57all=!S.ped57all;render();return}
 if(a==='p57asg'){S.p57={c:+b.dataset.c};render();return}
 if(!x)return;var c=cl(x.c);
 if(a==='p57x'){S.p57=null;render();return}
 if(a==='p57no'){x.conf=null;render();return}
 if(a==='p57ch'){var id=+b.dataset.id,ee=est57(c);if(ee.ch&&+ee.ch.id===id){toast('Ya lo lleva '+ee.ch.n);return}if(ee.ch){x.conf=id;render();return}toast(p57Asigna(c,id));S.p57=null;render();return}
 if(a==='p57si'){toast(p57Asigna(c,x.conf));S.p57=null;render();return}},true);

/* =============== 56 · reportar un problema =============== */
try{if(NB_SH.indexOf('probs')<0)NB_SH.push('probs')}catch(e){}
var _err70=[];function errNota70(m){try{m=String(m||'').slice(0,300);if(!m)return;_err70.push(hhmm()+' '+m);if(_err70.length>15)_err70.shift();apErr('error interno',m,dondeTxt70())}catch(e){}}
window.addEventListener('error',function(e){var w='';try{w=capaDe77(e&&e.lineno)}catch(x){}errNota70(((e&&e.message)||'error')+(w?' ('+w+')':''))});window.addEventListener('unhandledrejection',function(e){errNota70('promesa: '+((e&&e.reason&&e.reason.message)||e.reason||''))});
(function(){var ce=console.error;console.error=function(){try{var a=Array.prototype.slice.call(arguments).map(function(x){return x&&x.message?x.message:(typeof x==='string'?x:'')}).join(' ');if(a)errNota70(a)}catch(e){}return ce.apply(console,arguments)}})();
var TABN70={inicio:'Inicio',bodega:'Bodega',cargas:'Cargas',clientes:'Clientes',gastos:'Gastos',mas:'Más',vehiculos:'Vehículos',personal:'Personal',estadisticas:'Estadísticas',bienes:'Bienes',sugerencias:'Sugerencias',ruta:'Ruta',entrega:'Entrega',cierre:'Cierre',cierreadm:'Recibir cierre'};
function dondeTxt70(){try{var r=S.role,t=S.tab[r],L=[{admin:'Administrador',rep:'Chofer',local:'Venta local',cont:'Contador'}[r]||r,TABN70[t]||t];
  var ov=Array.prototype.filter.call(document.querySelectorAll('[role="dialog"]'),function(d){return d.id!=='rp56ov'&&d.offsetParent!==null}).map(function(d){var b=d.querySelector('b');return d.getAttribute('aria-label')||(b?b.textContent:'')||d.id}).filter(Boolean);
  if(S.cm){var P=cmPasos();L.push('Registrar carga → paso '+(Math.min(S.cm.paso,P.length-1)+1)+' de '+P.length+' ('+P[Math.min(S.cm.paso,P.length-1)]+')')}else if(ov.length)L.push(ov[ov.length-1].slice(0,60));
  return L.join(' → ')}catch(e){return ''}}
function rp56HTML(){var x=S.rp56;if(!x)return '';var gs=[['traba','No me deja trabajar'],['numero','Un número está mal'],['raro','Se ve raro'],['idea','Es una idea']];
 var h='<div class="card" style="padding:12px 14px"><div class="lbl">Estás en:</div><b style="font-size:17px">'+esc(x.donde||'—')+'</b><div class="lbl" style="margin-top:4px">'+esc(quien())+' · '+fmtF(iso(TODAY))+' '+hhmm()+' · '+(navigator.onLine===false?'sin internet':'con internet')+'</div></div>'
  +'<div class="q">¿Qué pasó?</div><textarea id="rp56t" rows="5" style="width:100%;font-size:17px;border-radius:14px;padding:10px;border:1px solid var(--line)" placeholder="Escribe o dicta con el micrófono del teclado">'+esc(x.txt||'')+'</textarea>'
  +'<div class="q" style="font-size:19px">¿Qué tan grave?</div><div class="chips" role="group" style="margin:6px 0">'+gs.map(function(g){return '<button data-act="rp56g" data-v="'+g[0]+'" aria-pressed="'+(x.g===g[0])+'" style="min-height:52px">'+g[1]+'</button>'}).join('')+'</div>'
  +'<label class="btn sec" style="display:flex;align-items:center;justify-content:center;min-height:52px;margin-top:10px" for="rp56f">🖼️ '+(x.foto?'Cambiar la captura de pantalla':'Agregar captura de pantalla (opcional)')+'</label><input id="rp56f" type="file" accept="image/*" style="display:none">'+(x.foto?'<img src="'+x.foto+'" alt="Captura" style="width:100%;max-height:240px;object-fit:contain;margin-top:8px;border-radius:12px;border:1px solid var(--line)">':'')
  +'<div class="lbl" style="margin-top:8px">La app agrega sola: dónde estabas, quién, el celular, la versión, la hora, si había internet y los últimos errores internos.</div>'
  +'<button class="btn big" data-act="rp56ok">Mandar</button>';
 return ovW70('rp56ov','🐞 Reportar un problema',h,'rp56x')}
document.addEventListener('input',function(e){if(e.target&&e.target.id==='rp56t'&&S.rp56)S.rp56.txt=e.target.value},true);
document.addEventListener('change',function(e){var t=e.target;if(!t||t.id!=='rp56f'||!S.rp56||!t.files||!t.files[0])return;var fr=new FileReader();fr.onload=function(){var im=new Image();im.onload=function(){try{var k=Math.min(1,FOTO_PX119/Math.max(im.width,im.height)),cv=document.createElement('canvas');cv.width=Math.round(im.width*k);cv.height=Math.round(im.height*k);cv.getContext('2d').drawImage(im,0,0,cv.width,cv.height);S.rp56.foto=cv.toDataURL('image/jpeg',FOTO_Q119)}catch(er){S.rp56.foto=fr.result}render()};im.src=fr.result};fr.readAsDataURL(t.files[0])},true);
document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act]');if(!b)return;var a=b.dataset.act;if(!/^rp56|^pr56/.test(a))return;e.stopImmediatePropagation();
 if(a==='rp56'){var d=dondeTxt70();S.menu=false;S.help=false;S.rp56={donde:d,txt:'',g:'',foto:null};render();return}
 if(a==='rp56x'){S.rp56=null;render();return}
 if(a==='rp56g'){S.rp56.g=b.dataset.v;render();return}
 if(a==='rp56ok'){var x=S.rp56;if(!String(x.txt||'').trim()){toast('Escribe qué pasó');return}if(!x.g){toast('Escoge qué tan grave');return}S.probs=S.probs||[];var n=S.probs.filter(function(p){return !p.auto}).length+1;
  S.probs.push({id:Date.now().toString(36),n:n,f:iso(TODAY),h:hhmm(),q:quien(),rol:S.role,donde:x.donde,txt:String(x.txt).trim(),g:x.g,foto:x.foto||null,cel:String(navigator.userAgent||'').replace(/^.*?\(([^)]*)\).*$/,'$1').slice(0,80),v:(typeof PN_VER!=='undefined'?PN_VER:''),red:navigator.onLine!==false,errs:_err70.slice(-8)});
  S.rp56=null;toast('Gracias. Quedó anotado (#'+n+')'+(navigator.onLine===false?'; se manda cuando haya internet':''));render();return}
 if(a==='pr56res'){var p=(S.probs||[]).filter(function(z){return z.id===b.dataset.id})[0];if(p){p.res=p.res?null:iso(TODAY)}render();return}
 if(a==='pr56todos'){S.pr56all=!S.pr56all;render();return}
 if(a==='pr56sacar'||a==='pr56wa'){var tx=pr56Texto();if(a==='pr56wa'){try{window.open('https://wa.me/?text='+encodeURIComponent(tx.slice(0,3500)),'_blank')}catch(er){}return}
  var nom='problemas-'+iso(TODAY)+'.txt',n2=natPl&&natPl();if(n2&&n2.respaldoGuardar){n2.respaldoGuardar({texto:tx,nombre:nom}).then(function(r){toast('Guardado en '+((r&&r.donde)||'Descargas'))}).catch(function(){toast('No se pudo guardar el archivo')})}
  else{try{var bl=new Blob([tx],{type:'text/plain'}),u=URL.createObjectURL(bl),ln=document.createElement('a');ln.href=u;ln.download=nom;document.body.appendChild(ln);ln.click();ln.remove()}catch(er){toast('No se pudo guardar el archivo')}}return}},true);
var G56={traba:'No me deja trabajar',numero:'Un número está mal',raro:'Se ve raro',idea:'Idea',App:'Error de la app'};
function pr56Texto(){var L=(S.probs||[]).filter(function(p){return !p.res});return 'Ruta Fácil · problemas reportados · '+fmtF(iso(TODAY))+'\n'+L.length+' sin resolver\n\n'+L.map(function(p){return (p.auto?'[automático] ':'#'+p.n+' ')+p.f+' '+p.h+' · '+(G56[p.g]||p.g||'')+' · '+(p.q||'')+'\nDónde: '+(p.donde||'')+'\n'+p.txt+(p.cel?'\nCelular: '+p.cel:'')+(p.v?' · versión '+p.v:'')+(p.red===false?' · sin internet':'')+((p.errs||[]).length?'\nErrores: '+p.errs.join(' | '):'')}).join('\n\n')}
function pr56Card(){var L=(S.probs||[]).slice().reverse(),todos=!!S.pr56all,V=todos?L:L.filter(function(p){return !p.res}),nr=L.filter(function(p){return !p.res}).length;
 return '<details class="card" data-k="pr56"'+(S.dOpen.pr56?' open':'')+'><summary><b>🐞 Problemas reportados</b><span class="lbl">'+(nr?nr+' sin resolver':'ninguno pendiente')+'</span></summary>'
  +(V.length?V.slice(0,40).map(function(p){return '<div style="border-top:1px solid var(--line);padding:8px 0'+(p.res?';opacity:.55':'')+'"><div style="display:flex;justify-content:space-between;gap:8px"><b>'+(p.auto?'Automático':'#'+p.n)+' · '+esc(G56[p.g]||p.g||'')+'</b><span class="lbl">'+esc(fmtF(p.f))+' '+esc(p.h||'')+'</span></div><div class="lbl">'+esc(p.q||'')+' · '+esc(p.donde||'')+'</div><div style="font-size:15px;margin-top:4px">'+esc(p.txt)+'</div>'+(p.foto?'<img src="'+p.foto+'" alt="Captura" style="max-width:100%;max-height:180px;margin-top:6px;border-radius:10px">':'')
    +'<button class="btn sm '+(p.res?'sec':'')+'" style="width:auto;margin-top:6px" data-act="pr56res" data-id="'+esc(p.id)+'">'+(p.res?'↩ Volver a pendiente':'✓ Resuelto')+'</button></div>'}).join(''):'<div class="lbl" style="margin-top:6px">Nada por aquí.</div>')
  +'<button class="link" data-act="pr56todos">'+(todos?'Ver solo los pendientes':'Ver también los resueltos')+'</button>'
  +'<div style="display:flex;gap:8px;margin-top:8px"><button class="btn sm" style="flex:1" data-act="pr56sacar">Sacar el registro</button><button class="btn sm sec" style="flex:1" data-act="pr56wa">Mandar por WhatsApp</button></div><div class="lbl">El archivo queda en Descargas/Ruta Facil. Pásaselo a Claude para arreglarlos por número.</div></details>'}
var _aj70=ajHTML;ajHTML=function(){var h=_aj70.apply(this,arguments);if(!h||h.indexOf('id="ajov"')<0||S.role!=='admin'||S.encOn)return h;var i=h.lastIndexOf('</div></div>');return i<0?h:h.slice(0,i)+pr56Card()+h.slice(i)};

/* =============== 58 · ubicaciones: GPS, buscar como en Uber, link; pin que se arrastra =============== */
function ub68Obj(x){if(x.t==='bod')return (S.bods||[]).filter(function(z){return +z.id===+x.id})[0]||null;if(x.t==='prov')return provD(x.id);if(x.t==='cli')return cl(+x.id);return null}
function ub68Nom(x){if(x.t==='bod'){var b=ub68Obj(x);return b?b.n:'la bodega'}return x.t==='prov'?String(x.id):((cl(+x.id)||{}).n||'el cliente')}
function ub68HTML(){var x=S.ub68;if(!x)return '';var o=ub68Obj(x),nm=ub68Nom(x),h='';
 if(x.p===0){h='<div class="q">¿Cómo guardamos la ubicación de '+esc(nm)+'?</div>'+(o&&o.lat!=null?'<div class="lbl">Ahora: '+o.lat+', '+o.lng+'</div>':'<div class="lbl">Todavía no tiene ubicación.</div>')
  +'<button class="op" data-act="ub68gps"><span class="e">📍</span><span>Estoy aquí<small>Usa el GPS del celular (párate en el lugar)</small></span></button>'
  +'<button class="op" data-act="ub68bus"><span class="e">🔎</span><span>Buscar el lugar<small>Como en Uber: escribe el nombre o la dirección</small></span></button>'
  +'<div class="card" style="padding:12px 14px;margin-top:10px"><b>🔗 Pegar el link de Google Maps</b><textarea id="ub68l" rows="3" style="width:100%;margin-top:6px" placeholder="https://maps.app.goo.gl/… o 19.58,-96.93">'+esc(x.link||'')+'</textarea><button class="btn sec" style="margin-top:8px;min-height:52px;width:100%" data-act="ub68link">Usar el link</button></div>'+(x.err?'<div class="neg" role="alert" style="font-weight:700;margin-top:8px">'+esc(x.err)+'</div>':'')}
 else if(x.p===1){h='<div class="q">Buscar '+esc(nm)+'</div><div style="display:flex;gap:8px"><input id="ub68q" type="text" value="'+esc(x.q||'')+'" placeholder="Ej. bodega de plátanos Banderilla" style="flex:1;font-size:17px;min-height:52px;border-radius:14px;padding:0 12px;border:1px solid var(--line);text-align:left"><button class="btn" style="width:auto;min-height:52px" data-act="ub68ir">Buscar</button></div>'
  +(x.busy?'<div class="lbl" style="margin-top:10px">Buscando…</div>':'')+(x.err?'<div class="neg" role="alert" style="font-weight:700;margin-top:8px">'+esc(x.err)+'</div>':'')
  +(x.res||[]).map(function(r,i){return '<button class="ub68r" data-act="ub68sel" data-i="'+i+'"><b>'+esc(r.n)+'</b><span class="lbl">'+esc(r.d||'')+'</span></button>'}).join('')+'<button class="btn sec big" data-act="ub68atras">Atrás</button>'}
 else{h='<div class="q">¿Seguro que aquí es '+esc(nm)+'?</div><div class="lbl">Arrastra el pin para dejarlo exacto.</div><div id="ub68map"></div><div class="lbl" id="ub68c" style="margin-top:6px">'+x.lat+', '+x.lng+'</div>'
  +'<button class="btn big" data-act="ub68si">Sí, guardar aquí</button><button class="btn sec big" data-act="ub68atras">Regresar</button>'}
 return ovW70('ub68ov','📍 Ubicación de '+nm,h,'ub68x')}
function ub68Map(){var x=S.ub68,el=document.getElementById('ub68map');if(!x||!el||!window.L||el._leaflet_id)return;/* 120 · ya estaba puesto ("Map container is already initialized") */try{var m=L.map(el,{zoomControl:true}).setView([x.lat,x.lng],17);mapaCapa(m,el,0);var mk=L.marker([x.lat,x.lng],{draggable:true}).addTo(m);
  mk.on('dragend',function(){var p=mk.getLatLng();x.lat=+p.lat.toFixed(6);x.lng=+p.lng.toFixed(6);var c=document.getElementById('ub68c');if(c)c.textContent=x.lat+', '+x.lng});
  m.on('click',function(ev){mk.setLatLng(ev.latlng);x.lat=+ev.latlng.lat.toFixed(6);x.lng=+ev.latlng.lng.toFixed(6);var c=document.getElementById('ub68c');if(c)c.textContent=x.lat+', '+x.lng});setTimeout(function(){try{m.invalidateSize()}catch(e){}},200)}catch(e){console.error('mapa 58',e)}}
function ub68Busca(){var x=S.ub68,n=natPl&&natPl();if(!String(x.q||'').trim()){toast('Escribe qué buscar');return}
 if(!n||!n.lugaresGoogle){x.err='El buscador funciona en la app del celular. Aquí usa el link o el GPS.';render();return}
 x.busy=true;x.err='';x.res=[];render();var cuerpo={textQuery:String(x.q).trim(),languageCode:'es',regionCode:'MX',maxResultCount:8};
 n.lugaresGoogle({cuerpo:JSON.stringify(cuerpo)}).then(function(r){var j={};try{j=JSON.parse(r.json||'{}')}catch(er){}x.busy=false;
  if(r.status>=400){x.err=r.status===403?'Falta habilitar "Places API (New)" en la llave de Google (Google Cloud → Credenciales).':'Google no respondió ('+r.status+'). Intenta otra vez.';render();return}
  x.res=(j.places||[]).filter(function(p){return p.location}).map(function(p){return {n:(p.displayName&&p.displayName.text)||'Lugar',d:p.formattedAddress||'',lat:p.location.latitude,lng:p.location.longitude}});if(!x.res.length)x.err='No encontré ese lugar. Prueba con otras palabras o con la dirección.';render()})
 .catch(function(er){x.busy=false;x.err='Sin conexión con Google. Revisa el internet.';render()})}
function ub68Guarda(){var x=S.ub68,o=ub68Obj(x),nm=ub68Nom(x);if(!o)return;o.lat=x.lat;o.lng=x.lng;if(x.t==='cli'){o.locBy=quien();o.locF=iso(TODAY)}S.hist.push({t:fmtF(iso(TODAY))+' '+hhmm(),q:quien(),x:'Guardó la ubicación de '+nm+' ('+x.lat+', '+x.lng+')'});try{if(x.t==='bod')bodAplica()}catch(e){}}
document.addEventListener('input',function(e){var t=e.target;if(!t||!S.ub68)return;if(t.id==='ub68l')S.ub68.link=t.value;if(t.id==='ub68q')S.ub68.q=t.value},true);
document.addEventListener('keydown',function(e){if(e.key==='Enter'&&e.target&&e.target.id==='ub68q'&&S.ub68){e.preventDefault();ub68Busca()}},true);
window.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act="bodloc"]');if(!b)return;e.stopImmediatePropagation();e.preventDefault();if(!(S.role==='admin'&&!S.encOn)){toast('La ubicación de la bodega solo la cambia el administrador.');return}S.ub68={t:'bod',id:+b.dataset.id||((bodPrincipal()||{}).id),p:0};render()},true);
document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act]');if(!b)return;var a=b.dataset.act;if(!/^ub68/.test(a))return;e.stopImmediatePropagation();
 if(a==='ub68'){var t=b.dataset.t,id=b.dataset.id;if(t==='bod'&&!id){var bp=bodPrincipal();if(!bp){S.bods=S.bods||[];bp={id:1,n:'Bodega'};S.bods.push(bp)}id=bp.id}S.ub68={t:t,id:t==='prov'?decodeURIComponent(id):id,p:0};render();return}
 var x=S.ub68;if(!x)return;
 if(a==='ub68x'){S.ub68=null;render();return}
 if(a==='ub68atras'){x.p=x.p===2&&x.res&&x.res.length?1:0;x.err='';render();return}
 if(a==='ub68bus'){x.p=1;x.err='';render();setTimeout(function(){var q=document.getElementById('ub68q');if(q)q.focus()},100);return}
 if(a==='ub68ir'){var q=document.getElementById('ub68q');if(q)x.q=q.value;ub68Busca();return}
 if(a==='ub68sel'){var r=(x.res||[])[+b.dataset.i];if(r){x.lat=+(+r.lat).toFixed(6);x.lng=+(+r.lng).toFixed(6);x.p=2;render()}return}
 if(a==='ub68link'){var c=coordsDe(x.link),nl=natPl&&natPl(),lk=String(x.link||'').trim();if(!c&&nl&&nl.linkLargo&&/^https:\/\/(maps\.app\.goo\.gl|goo\.gl\/maps|maps\.google\.com|www\.google\.com\/maps)/.test(lk)){toast('Abriendo el link…');nl.linkLargo({url:lk}).then(function(r){var c2=coordsDe(r&&r.url);if(!c2){x.err='Ese link no trae coordenadas. En Google Maps toca el pin del lugar y vuelve a "Compartir", o usa "Buscar el lugar".';render();return}x.lat=c2.lat;x.lng=c2.lng;x.p=2;x.err='';render()}).catch(function(){x.err='No se pudo abrir el link (¿hay internet?).';render()});return}if(!c){x.err='No encontré coordenadas en ese link. En Google Maps toca el lugar, "Compartir" y copia el link; o pega las coordenadas (19.58,-96.93). Los links cortos (maps.app.goo.gl) a veces no traen coordenadas: ábrelo y copia el link largo.';render();return}x.lat=c.lat;x.lng=c.lng;x.p=2;render();return}
 if(a==='ub68gps'){x.err='';toast('Buscando tu ubicación…');try{navigator.geolocation.getCurrentPosition(function(p){x.lat=+p.coords.latitude.toFixed(6);x.lng=+p.coords.longitude.toFixed(6);x.p=2;render()},function(){x.err='No se pudo leer el GPS. Prende la ubicación, o busca el lugar o pega el link.';render()},{enableHighAccuracy:true,timeout:15000,maximumAge:0})}catch(er){x.err='No se pudo leer el GPS.';render()}return}
 if(a==='ub68si'){ub68Guarda();S.ub68=null;toast('✓ Ubicación guardada');render();return}},true);
/* bodega en la primera vez (paso "Bodega" del asistente) */
var _suH70=setupHTML;setupHTML=function(){var h=_suH70.apply(this,arguments);try{if(!h||h.indexOf('id="setov"')<0||!S.setup||S.setup.p!==1)return h;var b=bodPrincipal(),ok=b&&b.lat!=null;
  var c='<div class="card" style="border:2px solid '+(ok?'var(--accent)':'var(--danger)')+'"><b style="font-size:18px">📍 Ubicación de la bodega</b><div class="lbl">'+(ok?'Guardada: '+b.lat+', '+b.lng:'Falta. Los mapas, los kilómetros y las rutas salen de aquí.')+'</div><button class="btn" style="margin-top:8px;min-height:56px;width:100%" data-act="ub68" data-t="bod">'+(ok?'Cambiar la ubicación':'Poner la ubicación de la bodega')+'</button></div>';
  var i=h.indexOf('<div class="card">');return i>-1?h.slice(0,i)+c+h.slice(i):h}catch(e){return h}};
/* proveedores y clientes: en "Datos" */
var _fiP70=fiProv;fiProv=function(f){var h=_fiP70.apply(this,arguments);try{if(S.role!=='admin'||(S.fiTab||{})['prov:'+f.id]&&(S.fiTab||{})['prov:'+f.id]!=='dat')return h;if(h.indexOf('data-act="provtipo"')<0)return h;var d=provD(f.id),ok=d.lat!=null;
  var c='<div class="card"><b>📍 Ubicación</b><div class="lbl">'+(ok?d.lat+', '+d.lng:'Sin ubicación todavía')+'</div><button class="btn sm" style="width:100%;margin-top:6px;min-height:50px" data-act="ub68" data-t="prov" data-id="'+encodeURIComponent(f.id)+'">'+(ok?'Corregir la ubicación':'Poner la ubicación')+'</button></div>';var i=h.indexOf('<div class="card"><div class="lbl">Qué te vende');return i>-1?h.slice(0,i)+c+h.slice(i):h}catch(e){return h}};
/* fiCli: pasó a tema-fichas.js */
/* el chofer confirma la ubicación cuando está en el lugar (entrega del cliente) */
function cfUb70(){if(S.role!=='rep'||S.tab.rep!=='entrega')return;var m=document.querySelector('main');if(!m||m.querySelector('[data-x="cfub70"]'))return;var st=S.stops&&S.stops[S.cur],c=st?cl(st.c):null;if(!c)return;
 var d=document.createElement('div');d.className='card';d.dataset.x='cfub70';d.innerHTML='<b>📍 Ubicación de '+esc(c.n)+'</b><div class="lbl">'+(c.lat!=null?'Ya tiene. Si estás aquí y no es exacta, corrígela.':'Todavía no tiene ubicación.')+'</div><button class="btn sec" style="width:100%;margin-top:6px;min-height:52px" data-act="cfub70" data-id="'+c.id+'">Confirmar la ubicación aquí</button>';m.appendChild(d)}
var _rd70u=render;render=function(){var r=_rd70u.apply(this,arguments);try{cfUb70()}catch(e){}return r};
document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act="cfub70"]');if(!b)return;e.stopImmediatePropagation();var c=cl(+b.dataset.id);if(!c)return;
 var guarda=function(la,ln){S.modal=null;var tenia=c.lat!=null;c.lat=+(+la).toFixed(6);c.lng=+(+ln).toFixed(6);c.locBy=chofN(S.chofHoy);c.locF=iso(TODAY);S.hist.push({t:fmtF(iso(TODAY))+' '+hhmm(),q:chofN(S.chofHoy),x:'Confirmó la ubicación de '+c.n+' estando ahí'});try{(S.avPrecio=S.avPrecio||[]).push(chofN(S.chofHoy)+' '+(tenia?'corrigió':'guardó')+' la ubicación de '+c.n+' estando ahí')}catch(er){}toast('✓ Ubicación guardada');render()};
 toast('Buscando tu ubicación…');try{navigator.geolocation.getCurrentPosition(function(p){var la=p.coords.latitude,ln=p.coords.longitude;if(c.lat!=null){window._cf70=function(){guarda(la,ln)};abrirModal('¿Seguro?',esc(c.n)+' ya tenía ubicación. ¿La cambio por donde estás ahorita? Le aviso al administrador.',[['Sí, cambiarla','cfub70si']])}else guarda(la,ln)},function(){toast('No se pudo leer el GPS. Prende la ubicación.')},{enableHighAccuracy:true,timeout:15000,maximumAge:0})}catch(er){toast('No se pudo leer el GPS.')}},true);
document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act="cfub70si"]');if(!b)return;e.stopImmediatePropagation();var f=window._cf70;window._cf70=null;if(f)f()},true);

/* =============== las ventanas nuevas se dibujan encima; el menú y el "?" llevan "Reportar un problema" =============== */
var _rd70=render;render=function(){var r=_rd70.apply(this,arguments);try{
  ovPon70('lt53ov',lt53HTML());ovPon70('p57ov',p57HTML());ovPon70('rp56ov',rp56HTML());var ub=ub68HTML();ovPon70('ub68ov',ub);if(ub&&S.ub68.p===2)setTimeout(ub68Map,30);
  var nv=document.querySelector('.drawer nav');if(nv&&!nv.querySelector('[data-act="rp56"]')){var bt=document.createElement('button');bt.className='btn sec';bt.style.marginTop='10px';bt.dataset.act='rp56';bt.textContent='🐞 Reportar un problema';var ref=nv.querySelector('[data-act="usrcambia"],[data-act="usrsalir"],.link[data-act="reset"]');if(ref)ref.before(bt);else nv.appendChild(bt)}
  var hp=document.querySelector('[aria-labelledby="hlpT"]');if(hp&&!hp.querySelector('[data-act="rp56"]')){var b2=document.createElement('button');b2.className='btn sec';b2.style.cssText='margin-top:12px;width:100%;min-height:52px';b2.dataset.act='rp56';b2.textContent='🐞 Reportar un problema';hp.appendChild(b2)}
 }catch(e){console.error('ventanas 7.5',e)}return r};
