/* ===================== v7.2 · parte 6: tarjetas de pantalla completa y lo que faltaba
   13 "No estaba", pedir permiso para fiar y cerrar el mes: por pasos · 23 "Nueva nota" del dueño por pasos y notas agrupadas
   26 "Me voy de vacaciones" por pasos · 31 gastos del chofer (comida solo si se acordó; ticket obligatorio; "Entregó tickets")
   19 textos del tutorial al día · 29 respaldo automático diario en el celular del administrador ===================== */
(function(){var st=document.createElement('style');st.textContent=[
 '#wzov textarea{width:100%;min-height:120px;font-size:18px;border:1px solid var(--line);border-radius:12px;padding:10px;background:var(--surface);color:var(--fg);font-family:inherit}',
 '.wzlista{display:flex;flex-direction:column;gap:6px;margin-top:8px;max-height:52vh;overflow:auto}.wzlista button{min-height:52px;text-align:left;padding:0 14px;border-radius:12px;border:1px solid var(--line);background:var(--surface);font-size:17px;color:var(--fg)}.wzlista button[aria-pressed="true"]{border:3px solid var(--accent);font-weight:800}',
 '.wzsw{display:flex;align-items:center;justify-content:space-between;gap:10px;min-height:56px;border-bottom:1px solid var(--line)}.wzsw button{min-width:76px;min-height:44px;border-radius:12px;font-weight:800}'].join('\n');document.head.appendChild(st)})();

/* ---------- ayuda común: "¿Seguro?" al final de cada tarjeta ---------- */
var _wz63fn=null;
function wzSeguro(txt,fn,si){_wz63fn=fn;abrirModal('¿Seguro?',txt,[[si||'Sí','wz63si']]);return ''}
document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act="wz63si"]');if(!b)return;e.stopImmediatePropagation();S.modal=null;var f=_wz63fn;_wz63fn=null;var d=S.wz&&S.wz.d;S.wz=null;try{if(f)f(d)}catch(er){console.error(er);toast('No se pudo: '+er.message)}render()},true);
function clic63(act,ds){var b=document.createElement('button');b.dataset.act=act;Object.keys(ds||{}).forEach(function(k){b.dataset[k]=ds[k]});b.style.display='none';(document.querySelector('main')||document.body).appendChild(b);try{b.click()}finally{b.remove()}}
function swHTML63(k,l,d,ayuda){var on=!!d[k];return '<div class="wzsw"><span>'+l+(ayuda?'<br><span class="lbl">'+ayuda+'</span>':'')+'</span><button class="btn'+(on?'':' sec')+'" data-act="wzop" data-k="'+k+'" data-v="'+(on?'':'1')+'" aria-pressed="'+on+'">'+(on?'Sí':'No')+'</button></div>'}

/* ---------- 13 · "No estaba" ---------- */
var NOEST_M=[['Cerrado','🔒 Cerrado'],['Tenía producto','📦 Tenía producto'],['Sin dinero','💸 Sin dinero'],['Compró a otro','🔄 Compró a otro'],['Cerró el negocio','🚫 Cerró el negocio']];
WZ.noest={tit:'No se pudo entregar',fin:'Registrar',pasos:[
 {q:function(d){return '¿Por qué no se pudo entregar a '+d.n+'?'},c:[{k:'m',t:'opc',o:NOEST_M,falta:'Escoge el motivo'}],auto:true},
 {q:'Revisa',html:function(d){var m=d.m==='Cerrado'||d.m==='Sin dinero';return '<div class="card good">'+rw('Cliente',esc(d.n))+rw('Motivo',esc(d.m))+'</div><div class="lbl">'+(m?'Pasa a tu ruta de mañana.':'Se queda con su siguiente visita.')+'</div>'}}],
 guardar:function(d){return wzSeguro('Se registra que no se pudo entregar a '+esc(d.n)+' ('+esc(d.m)+').',function(){clic63('nov',{m:d.m})},'Sí, registrar')}};
window.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act="noestaba"]');if(!b||S.role!=='rep'||S.wz)return;var i=typeof curStop==='function'?curStop():null,st=i!=null?S.stops[i]:null,c=st?cl(st.c):null;if(!c)return;
 e.preventDefault();e.stopImmediatePropagation();wzAbre('noest',{n:c.n})},true);
/* ---------- 13 · pedir permiso para fiarle a un cliente ---------- */
WZ.fiar={tit:'Pedir permiso para fiar',fin:'Pedir permiso',pasos:[
 {q:function(d){return '¿Le pides al administrador permiso para fiarle a '+d.n+'?'},a:function(d){var c=cl(+d.id);return c?'Ahora debe '+money(num(c.cred))+'.':''},html:function(d){return '<div class="card"><div class="lbl">Le llega un aviso al administrador. Espera su respuesta antes de dejarle la fruta a crédito.</div></div>'}}],
 guardar:function(d){return wzSeguro('Se le pide permiso al administrador para fiarle a '+esc(d.n)+'.',function(){var pc=cl(+d.id);if(!pc)return;S.permisos=S.permisos||[];if(S.permisos.some(function(x){return +x.c===+pc.id&&x.est==='pend'&&x.f===iso(TODAY)})){toast('Ya le pediste permiso; espera su respuesta');return}S.permisos.push({c:pc.id,ch:+S.chofHoy,est:'pend',f:iso(TODAY)});S.avPrecio.push('URGENTE: '+chofN(S.chofHoy)+' pide permiso para fiarle a '+pc.n);toast('Se le pidió permiso al administrador')},'Sí, pedir permiso')}};
window.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act="permpide"]');if(!b||b.dataset.ok||S.wz)return;var c=cl(+b.dataset.id);if(!c)return;e.preventDefault();e.stopImmediatePropagation();wzAbre('fiar',{id:+b.dataset.id,n:c.n})},true);
/* ---------- 13 · cerrar el mes ---------- */
WZ.mes={tit:'Cerrar el mes',fin:'Cerrar el mes',pasos:[
 {q:function(d){return 'Revisa '+d.nom},html:function(d){var G=(S.gastos||[]).filter(function(g){return mesDe(g.f)===d.m}),cf=G.filter(function(g){return g.fac}).length,tot=G.reduce(function(s,g){return s+num(g.m)},0);
  return '<div class="card">'+rw('Gastos',G.length+' ('+cf+' con factura)')+rw('Total de gastos',money(tot))+'</div><div class="lbl">Si falta algo, sal con la × y regístralo antes de cerrar.</div>'}},
 {q:'Al cerrar ya no se puede cambiar',html:function(d){return '<div class="card alert">Ya no se podrán cambiar ni borrar los gastos de '+esc(d.nom)+'. Las correcciones se registran con fecha nueva.</div>'}}],
 guardar:function(d){return wzSeguro('Se cierra '+esc(d.nom)+'. No se puede deshacer.',function(){clic63('mescierrasi',{m:d.m})},'Sí, cerrar el mes')}};
window.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act="mescierra"]');if(!b||S.wz)return;e.preventDefault();e.stopImmediatePropagation();var prev=new Date(TODAY.getFullYear(),TODAY.getMonth()-1,15);wzAbre('mes',{m:b.dataset.m,nom:prev.toLocaleDateString('es-MX',{month:'long',year:'numeric'})})},true);

/* ---------- 23 · "Así se hace": nueva nota por pasos ---------- */
var NOTA_PASOS=[['paso:caja','💵 Caja y efectivo'],['paso:bodega','🏚️ Bodega y maduración'],['paso:viaje','🚚 Viajes de carga'],['paso:ruta','🗺️ Ruta y clientes'],['paso:cierre','✅ Cierre del día']];
function notaListaHTML(d,items,k){return '<div class="field grande"><label for="wzq">Buscar</label><input id="wzq" type="search" data-wzq="1" placeholder="Escribe para buscar" autocomplete="off"></div><div class="wzlista">'
 +items.map(function(x){return '<button data-act="wzop" data-k="'+k+'" data-v="'+esc(x[0])+'" aria-pressed="'+(String(d[k])===String(x[0]))+'" data-txt="'+esc(String(x[1]).toLowerCase())+'">'+esc(x[1])+'</button>'}).join('')+'</div>'}
document.addEventListener('input',function(e){var t=e.target;if(!t||!t.dataset||!t.dataset.wzq)return;var q=String(t.value||'').toLowerCase().trim();Array.prototype.forEach.call(document.querySelectorAll('#wzov .wzlista button'),function(b){b.style.display=!q||b.dataset.txt.indexOf(q)>-1?'':'none'})},true);
function notaTemaTxt(k){if(k==='gen')return 'General';if(k==='cli:*')return 'Todos los clientes';if(k==='prov:*')return 'Todos los proveedores';var p=NOTA_PASOS.filter(function(x){return x[0]===k})[0];if(p)return p[1].replace(/^\S+\s/,'');
 if(/^cli:/.test(k)){var c=cl(+k.slice(4));return 'Cliente: '+(c?c.n:'')}if(/^prov:/.test(k))return 'Proveedor: '+k.slice(5);return k}
WZ.nota={tit:'Nueva nota',fin:'Guardar nota',pasos:[
 {q:'¿Para qué es la nota?',c:[{k:'tipo',t:'opc',o:[['cli','👤 Un cliente'],['prov','🚚 Un proveedor'],['paso','🧭 Un paso (ruta, cierre, carga…)'],['gen','📌 General']],falta:'Escoge para qué es'}],auto:true},
 {si:function(d){return d.tipo==='cli'},q:'¿De qué cliente?',html:function(d){return notaListaHTML(d,[['cli:*','Todos los clientes']].concat((S.cli||[]).filter(function(c){return !c.oculto}).map(function(c){return ['cli:'+c.id,c.n+(c.apodo?' ('+c.apodo+')':'')]})),'k')},ok:function(d){return /^cli:/.test(d.k||'')?'':'Escoge el cliente'}},
 {si:function(d){return d.tipo==='prov'},q:'¿De qué proveedor?',html:function(d){return notaListaHTML(d,[['prov:*','Todos los proveedores']].concat(provNames().map(function(n){return ['prov:'+n,n]})),'k')},ok:function(d){return /^prov:/.test(d.k||'')?'':'Escoge el proveedor'}},
 {si:function(d){return d.tipo==='paso'},q:'¿De qué paso?',c:[{k:'k',t:'opc',o:NOTA_PASOS,falta:'Escoge el paso'}],auto:true},
 {q:'Escribe la nota',a:'Como se lo explicarías a alguien nuevo. También puedes dictarla con el micrófono.',html:function(d){return '<textarea id="wz_txt" data-wz="txt" placeholder="Ej. A Roly se le paga los lunes por transferencia.">'+esc(d.txt||'')+'</textarea><button class="btn sec" style="margin-top:8px" data-act="wz63dicta">🎤 Dictar</button>'},ok:function(d){return String(d.txt||'').trim()?'':'Escribe la nota'}},
 {q:'¿Quién la ve?',c:[{k:'v',t:'opc',o:[['todos','👥 Todos'],['ch','🚚 Choferes'],['enc','🧑‍💼 Encargado']],falta:'Escoge quién la ve'}],auto:true},
 {q:'Revisa',html:function(d){return '<div class="card good">'+rw('Tema',esc(notaTemaTxt(d.tipo==='gen'?'gen':d.k)))+rw('La ven',{todos:'Todos',ch:'Choferes',enc:'Encargado'}[d.v]||'Todos')+'<div style="margin-top:6px;font-size:16px">'+esc(d.txt||'')+'</div></div>'}}],
 guardar:function(d){var k=d.tipo==='gen'?'gen':d.k;return wzSeguro('Se guarda la nota en "'+esc(notaTemaTxt(k))+'".',function(){S.notasN=S.notasN||[];S.notasN.push({k:k,txt:String(d.txt).trim(),q:quien(),f:iso(TODAY),v:d.v||'todos'});toast('✓ Nota guardada')},'Sí, guardar')}};
document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act="wz63dicta"]');if(!b||!S.wz)return;e.stopImmediatePropagation();var SR=window.SpeechRecognition||window.webkitSpeechRecognition;if(!SR){toast('Para dictar, toca el micrófono de tu teclado');return}
 var r=new SR();r.lang='es-MX';r.onresult=function(ev){S.wz.d.txt=(S.wz.d.txt?S.wz.d.txt+' ':'')+ev.results[0][0].transcript;render()};r.start();toast('Habla ahora…')},true);
/* la pantalla "Así se hace": botón "+ Nueva nota" y notas agrupadas por tema, con buscador */
asi=function(){var L=(S.notasN||[]).map(function(n,i){return {n:n,i:i}}),G={},q=String(S.asiQ||'').toLowerCase();L.forEach(function(o){if(q&&(o.n.txt+' '+notaTemaTxt(o.n.k)).toLowerCase().indexOf(q)<0)return;(G[o.n.k]=G[o.n.k]||[]).push(o)});
 var ks=Object.keys(G).sort(function(a,b){return notaTemaTxt(a).localeCompare(notaTemaTxt(b))});
 return '<button class="link" data-act="tab" data-t="inicio" style="margin-top:8px">← Volver a Inicio</button><h1 style="margin-top:4px">Así se hace</h1><div class="lbl">Lo que sabe el dueño, escrito para que cualquiera pueda seguirlo. Cada nota sale sola en su cliente, proveedor o paso.</div>'
  +'<button class="btn" style="margin:10px 0" data-act="notanueva">＋ Nueva nota</button>'
  +(L.length>5?'<div class="field"><label for="asiq">Buscar</label><input id="asiq" type="search" data-bind="asiQ" value="'+esc(S.asiQ||'')+'" style="width:190px"></div>':'')
  +(ks.length?ks.map(function(k){return '<details class="card" data-k="asi:'+esc(k)+'"'+((S.dOpen||{})['asi:'+k]?' open':'')+'><summary><b>'+esc(notaTemaTxt(k))+'</b><span class="lbl">'+G[k].length+' nota'+(G[k].length>1?'s':'')+'</span></summary>'
   +G[k].map(function(o){return '<div class="row"><span style="font-size:15px">'+esc(o.n.txt)+'<br><span class="lbl">'+esc(o.n.q||'')+(o.n.f?' · '+fmtF(o.n.f):'')+' · la ven: '+({todos:'todos',ch:'choferes',enc:'encargado'}[o.n.v||'todos'])+'</span></span><button class="link" style="color:var(--danger)" data-act="asidel" data-i="'+o.i+'">Quitar</button></div>'}).join('')+'</details>'}).join(''):'<div class="card lbl">Todavía no hay notas.</div>')};
if(typeof VIEWS!=="undefined")VIEWS.asi=asi;
document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act="notanueva"]');if(!b)return;e.stopImmediatePropagation();wzAbre('nota',{})},true);
/* "Quitar" una nota pide ¿Seguro? */
window.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act="asidel"]');if(!b||b.dataset.ok)return;e.preventDefault();e.stopImmediatePropagation();var i=b.dataset.i;wzSeguro('Se quita la nota.',function(){clic63('asidel',{i:i,ok:'1'})},'Sí, quitar')},true);
/* cada nota sale solo a quien debe verla (y las de "todos los clientes/proveedores" en cada uno) */
var _nd63=notasDe;notasDe=function(k){var orig=S.notasN||[],rol=S.role==='rep'?'ch':(S.encOn?'enc':'adm');var gen=/^cli:/.test(k)?'cli:*':(/^prov:/.test(k)?'prov:*':null);
 S.notasN=orig.filter(function(n){if((n.k!==k&&n.k!==gen))return false;var v=n.v||'todos';return rol==='adm'||v==='todos'||v===rol}).map(function(n){return n.k===gen?Object.assign({},n,{k:k}):n});try{return _nd63.call(this,k)}finally{S.notasN=orig}};

/* ---------- 26 · "Me voy de vacaciones" por pasos ---------- */
try{if(NB_SH.indexOf('vacPlan')<0)NB_SH.push('vacPlan')}catch(e){}
var VAC_P=[['precio','Fijar el precio del día'],['cierres','Recibir los cierres'],['pagos','Pagar a proveedores'],['fiar','Autorizar fiados'],['viajes','Programar viajes']];
function vacEnc(){return (S.choferes||[]).filter(function(c){return !c.baja&&esCh(c)&&!esAdm(c)})}
WZ.vac={tit:'Me voy de vacaciones',fin:'Listo, me voy',pasos:[
 {q:'¿Desde cuándo y hasta cuándo?',c:[{k:'desde',l:'Me voy el',t:'date'},{k:'hasta',l:'Regreso el',t:'date'}],ok:function(d){return !d.desde||!d.hasta?'Escribe las dos fechas':(d.hasta<d.desde?'La fecha de regreso va después':'')}},
 {q:'¿Quién se queda a cargo?',a:'Él recibe el efectivo de los choferes y hace el cierre del día.',html:function(d){return notaListaHTML(d,vacEnc().map(function(c){return [String(c.id),c.n]}),'ch')},ok:function(d){return d.ch?'':'Escoge quién se queda a cargo'}},
 {q:'¿Qué puede hacer?',html:function(d){return '<div class="card">'+VAC_P.map(function(p){return swHTML63('p_'+p[0],p[1],d,p[0]==='pagos'?'hasta el límite de abajo':'')}).join('')+(d.p_pagos?wzCampo({k:'lim',l:'Puede pagar hasta $',t:'number'},d):'')+'</div>'}},
 {q:'¿Qué dejas listo?',a:'Si no le dejas fijar el precio, la app usa este precio esos días.',html:function(d){return '<div class="card">'+wzCampo({k:'pR',l:'Precio de la caja de roatán $',t:'number',opc:true},d)+wzCampo({k:'pM',l:'Precio del kilo de macho $',t:'number',opc:true},d)+wzCampo({k:'efe',l:'Efectivo que le dejas $',t:'number',opc:true},d)+'</div><div class="lbl">Para dejar instrucciones, usa "Así se hace" (las notas salen solas en cada cliente o paso).</div>'}},
 {q:'¿Te sigo mandando algo?',c:[{k:'manda',t:'opc',o:[['res','📲 El resumen del día por WhatsApp'],['urg','🚨 Solo lo urgente'],['nada','🌴 Nada']],falta:'Escoge una'}],auto:true},
 {q:'Revisa',html:function(d){var c=cl0(d.ch);return '<div class="card good">'+rw('Fechas',fmtF(d.desde)+' a '+fmtF(d.hasta))+rw('A cargo',esc(c?c.n:''))+rw('Puede',VAC_P.filter(function(p){return d['p_'+p[0]]}).map(function(p){return p[1].toLowerCase()}).join(', ')||'solo lo de todos los días')+(d.p_pagos?rw('Pagos hasta',money(num(d.lim)||encLim())):'')+(num(d.pR)?rw('Precio base',money(num(d.pR))+' la caja'+(num(d.pM)?' · '+money(num(d.pM))+' el kilo':'')):'')+rw('Te llega',{res:'el resumen diario',urg:'solo lo urgente',nada:'nada'}[d.manda])+'</div>'}}],
 guardar:function(d){var c=cl0(d.ch);return wzSeguro('Te vas del '+fmtF(d.desde)+' al '+fmtF(d.hasta)+' y se queda a cargo '+esc(c?c.n:'')+'. Se les avisa a él y a los choferes.',function(){vacEmpieza(d)},'Sí, me voy')}};
function cl0(id){return (S.choferes||[]).filter(function(c){return +c.id===+id})[0]||null}
function vacEmpieza(d){var p={};VAC_P.forEach(function(x){p[x[0]]=!!d['p_'+x[0]]});S.enc={ch:+d.ch,desde:d.desde,hasta:d.hasta,p:p};if(p.pagos&&num(d.lim)>0)S.cfg.encLimPago=String(num(d.lim));
 S.vacPlan={adm:S.adminYo,desde:d.desde,hasta:d.hasta,ch:+d.ch,pR:num(d.pR)||null,pM:num(d.pM)||null,efe:num(d.efe)||0,manda:d.manda,p:p};S.vac=S.vac||{};S.vac[S.adminYo]=true;
 if(S.vacPlan.pR&&!p.precio&&S.precio){S.precio.R=S.vacPlan.pR;if(S.vacPlan.pM)S.precio.M=S.vacPlan.pM;S.precio.conf=iso(TODAY)}
 var nm=chofN(+d.ch);S.rutaAv[d.ch]=(S.rutaAv[d.ch]||[]).concat(['Eres encargado del '+fmtF(d.desde)+' al '+fmtF(d.hasta)+'. Entra desde el menú.'+(S.vacPlan.efe?' Te dejaron '+money(S.vacPlan.efe)+' en caja.':'')]);
 vacEnc().forEach(function(c){if(+c.id!==+d.ch)S.rutaAv[c.id]=(S.rutaAv[c.id]||[]).concat([adminNom()+' sale de vacaciones del '+fmtF(d.desde)+' al '+fmtF(d.hasta)+'. Mientras, el encargado es '+nm+'.'])});
 S.hist.push({t:fmtF(iso(TODAY))+' '+hhmm(),q:quien(),x:'Se fue de vacaciones del '+fmtF(d.desde)+' al '+fmtF(d.hasta)+'; a cargo: '+nm});toast('Buenas vacaciones 🌴')}
function vacTermina(auto){var P=S.vacPlan;if(!P)return;var de=P.desde,a=iso(TODAY),L=(S.hist||[]).filter(function(h){var m=/(\d{1,2}) (\w+)/.exec(h.t||'');return true}).slice(-200);
 var act=(S.actDia||[]).filter(function(x){return x.f>=de&&x.f<=a}).length,cie=(S.rutasHist||[]).filter(function(r){return r.f>=de&&r.f<=a}).length,enc=(S.hist||[]).filter(function(h){return h.q===chofN(P.ch)}).length;
 S.vac[P.adm]=false;if(S.enc&&+S.enc.ch===+P.ch)S.enc.hasta=iso(new Date(TODAY.getTime()-864e5));S.vacPlan=null;
 S.hist.push({t:fmtF(iso(TODAY))+' '+hhmm(),q:quien(),x:'Regresó de vacaciones'});
 abrirModal(auto?'Se acabaron tus vacaciones':'Bienvenido de vuelta','<div>Mientras no estabas ('+fmtF(de)+' a '+fmtF(a)+'):</div><div class="lbl" style="margin-top:6px">'+cie+' rutas cerradas · '+enc+' cosas hechas por el encargado · '+act+' movimientos en la actividad.</div><div class="lbl" style="margin-top:6px">El encargado ya no tiene permisos de administrador.</div>',[['Entendido','modalok']])}
window.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act="vacsw"]');if(!b)return;e.preventDefault();e.stopImmediatePropagation();S.menu=false;
 if((S.vac||{})[S.adminYo]){wzSeguro('Regresas antes y se le quitan los permisos al encargado.',function(){vacTermina(false)},'Sí, ya regresé');render();return}
 var m=new Date(TODAY.getTime()+864e5);wzAbre('vac',{desde:iso(m),hasta:iso(new Date(m.getTime()+9*864e5)),p_cierres:'1',p_precio:'',lim:String(encLim()),manda:'urg'})},true);
document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act="modalok"]');if(!b)return;e.stopImmediatePropagation();S.modal=null;render()},true);
/* al pasar la fecha de regreso se termina sola; mientras, si el encargado no puede fijar precio, se usa el precio base */
var _rd63a=render;render=function(){try{var P=S.vacPlan;if(P&&S.role==='admin'){var hoy=iso(TODAY);if(hoy>P.hasta&&!S.encOn&&S.adminYo===P.adm){setTimeout(function(){vacTermina(true);render()},0)}
  else if(hoy>=P.desde&&hoy<=P.hasta&&!P.p.precio&&P.pR&&S.precio&&S.precio.conf!==hoy){S.precio.R=P.pR;if(P.pM)S.precio.M=P.pM;S.precio.conf=hoy;S.hist.push({t:fmtF(hoy)+' '+hhmm(),q:'App',x:'Precio base de vacaciones: '+money(P.pR)+' la caja'+(P.pM?' y '+money(P.pM)+' el kilo':'')})}}}catch(e){}return _rd63a.apply(this,arguments)};
/* lo que el encargado no tiene permitido: la app dice por qué */
var VAC_ACT={precio:/^(precioconf|precioguarda|preciosave|precioapl|precioint|preciousar|precioayer)$/,cierres:/^(rcabre|rctodo|rcdif|rcfin|recep|regcierre|vercierre)$/,pagos:/^(abonoprov|fijopag|pagarsz|porpagar|credpag)$/,fiar:/^(permok|permno|mayok|mayneg)$/,viajes:/^(progviaje|simabre|newcarga)$/};
window.addEventListener('click',function(e){if(!S.encOn||S.role!=='admin'||!e.isTrusted&&!window.__vacTest)return;var b=e.target.closest&&e.target.closest('[data-act]');if(!b)return;var p=(S.enc||{}).p;if(!p)return;var a=b.dataset.act;
 Object.keys(VAC_ACT).forEach(function(k){if(!p[k]&&VAC_ACT[k].test(a)){e.preventDefault();e.stopImmediatePropagation();toast('El administrador no te dejó '+VAC_P.filter(function(x){return x[0]===k})[0][1].toLowerCase()+' mientras está de vacaciones.')}})},true);

/* ---------- 31 · gastos del chofer ---------- */
function chofComida(){var c=cl0(S.chofHoy);return !!(c&&c.comida)}
function gxTicketObl(t){return !/^Comida/.test(String(t||''))}
/* la opción de comida solo sale si el administrador la acordó con ese chofer */
var _gxT63=gxTipos;gxTipos=function(){var h=_gxT63.apply(this,arguments);if(chofComida())return h;return h.replace(/<button data-act="gxt2" data-t="Comida o viáticos"[^>]*>[^<]*<\/button>/,'')+'<div class="lbl">La comida solo se registra si el administrador te la autorizó.</div>'};
var _rd63b=render;render=function(){var r=_rd63b.apply(this,arguments);try{if(S.role==='rep'&&!chofComida()){Array.prototype.forEach.call(document.querySelectorAll('[data-act="gxt2"][data-t="Comida o viáticos"],[data-act="gxtipo"][data-t="Comida o viáticos"],[data-act="gxtipo"][data-v="Comida o viáticos"]'),function(b){b.remove()});
  if(S.gx&&/^Comida/.test(S.gx.tipo||'')){S.gx.tipo='Caseta'}}
 /* ticket obligatorio: el texto lo dice */
 Array.prototype.forEach.call(document.querySelectorAll('.gxsheet .lbl'),function(l){if(/Sin foto del ticket no se descuenta/.test(l.textContent)&&!(S.gx&&!gxTicketObl(S.gx.tipo)&&!S.gxFuel))l.textContent='La foto del ticket es obligatoria. Guarda el ticket y entrégalo en bodega al cerrar.'})}catch(e){}return r};
window.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act="gxsave"],[data-act="recargar"]');if(!b||S.role!=='rep'||window.__ticketLibre)return;var fuel=b.dataset.act==='recargar';
 if(!fuel&&S.gx&&/^Comida/.test(S.gx.tipo||'')&&!chofComida()){e.preventDefault();e.stopImmediatePropagation();toast('La comida solo se registra si el administrador te la autorizó.');return}
 var foto=fuel?(S.rc&&S.rc.foto):(S.gx&&S.gx.foto);if(!foto&&(fuel||gxTicketObl(S.gx&&S.gx.tipo))){e.preventDefault();e.stopImmediatePropagation();toast('Toma la foto del ticket: es obligatoria.');var f=document.querySelector(fuel?'label[for="rcf"]':'label[for="gxf"]')||document.getElementById(fuel?'rcf':'gxf');if(f)try{marcaFalta(f)}catch(er){}}},true);
/* ficha del chofer: "Puede agregar comida" sí/no */
var _fiE63=fiEmp;fiEmp=function(f){var h=_fiE63.apply(this,arguments);try{if(S.role!=='admin'||S.encOn)return h;var c=cl0(f.id);if(!c||!esCh(c)||esAdm(c)||(S.fiTab||{})['emp:'+f.id]==='ruta')return h;
 var row='<div class="card" data-key="chcomida"><div class="row"><span><b>Puede agregar comida</b><br><span class="lbl">Solo si ya lo acordaron. Si está en No, no le sale la opción.</span></span><button class="btn sm'+(c.comida?'':' sec')+'" style="width:auto" data-act="chcomida" data-id="'+c.id+'">'+(c.comida?'Sí':'No')+'</button></div></div>';
 var i=h.lastIndexOf('</div></div></div>');return i>-1?h.slice(0,i)+row+h.slice(i):h+row}catch(e){return h}};
document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act="chcomida"]');if(!b)return;e.stopImmediatePropagation();var c=cl0(+b.dataset.id);if(!c)return;c.comida=!c.comida;S.hist.push({t:fmtF(iso(TODAY))+' '+hhmm(),q:quien(),x:(c.comida?'Le permitió':'Le quitó')+' agregar comida a '+c.n});toast(c.comida?'Puede agregar comida':'Ya no puede agregar comida');render()},true);
/* recepción del cierre: "Entregó los tickets" */
function tkCuantos(){var g=(nbRGet(+S.chofHoy,'gch')||S.gch||[]).filter(function(x){return gxTicketObl(x.tipo)}).length,r=(nbRGet(+S.chofHoy,'recs')||S.recs||[]).length;return g+r}
var _rcH63=rcHTML;rcHTML=function(){var h=_rcH63.apply(this,arguments);try{if(!h||!S.rcv||S.rcv.p!==0)return h;var n=tkCuantos();if(!n)return h;var on=!!S.rcv.tk;
 var c='<div class="card"><div class="row"><span><b>Entregó sus '+n+' ticket'+(n>1?'s':'')+'</b><br><span class="lbl">Gasolina, casetas y demás gastos (en papel).</span></span><button class="btn sm'+(on?'':' sec')+'" style="width:auto" data-act="rctk" aria-pressed="'+on+'">'+(on?'✓ Sí':'No')+'</button></div></div>';
 var i=h.indexOf('<div style="margin-top:auto');return i>-1?h.slice(0,i)+c+h.slice(i):h}catch(e){return h}};
document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act="rctk"]');if(!b||!S.rcv)return;e.stopImmediatePropagation();S.rcv.tk=!S.rcv.tk;render()},true);
window.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act="rcfin"]');if(!b||!S.rcv)return;var n=tkCuantos();if(!n)return;var ok=!!S.rcv.tk,ch=+S.chofHoy;
 setTimeout(function(){try{S.hist.push({t:fmtF(iso(TODAY))+' '+hhmm(),q:quien(),x:chofN(ch)+(ok?' entregó sus '+n+' tickets':' NO entregó sus '+n+' tickets')});actAdd(ch,ok?'Entregó sus '+n+' tickets':'No entregó sus '+n+' tickets')}catch(er){}},0)},true);

/* ---------- 19 · textos del tutorial al día ---------- */
try{
 if(TUT['d:admin:2'])TUT['d:admin:2'][0][2]='Cuando un chofer manda su cierre, aquí te sale para recibirlo. La app te dice todo lo que debe regresar (cajas, kilos y efectivo) y tú solo confirmas, o corriges lo que llegó diferente.';
 if(TUT.rep)TUT.rep[2][2]='Casetas, ponchadura o combustible: regístralo con el botón Gasto, siempre con foto del ticket. La comida solo si el administrador te la autorizó. Se descuenta de lo que entregas.';
 if(TUT['d:rep:4'])TUT['d:rep:4'][0][2]='Cada gasto lleva foto del ticket (es obligatoria). Guarda el ticket en papel y entrégalo en bodega al cerrar.';
 if(TUT['d:rep:5'])TUT['d:rep:5'][1][2]='En el paso Efectivo puedes contar por billetes con + y −: la app suma sola. El corte se manda como foto al WhatsApp del negocio.';
 if(TUT['d:rep:2'])TUT['d:rep:2'][1][2]='Si el cliente no está o no puede recibir, toca "No estaba" y escoge el motivo en la tarjeta. Cerrado o Sin dinero pasan a la ruta de mañana.';
 if(TUT['d:admin:6'])TUT['d:admin:6'][0]=['[data-act="menu"]','Vacaciones','En el menú toca "Me voy de vacaciones": escoges las fechas, quién se queda a cargo y qué puede hacer. Al regresar te enseña lo que pasó.'];
 if(TUT['d:admin:7'])TUT['d:admin:7'][0][2]='En "Hoy te toca" te mandas el resumen del día cuando recibas los cierres. La app guarda sola un respaldo cada día en Descargas › Ruta Facil › Respaldos.';
 if(GUIA.admin){GUIA.admin.inicio[1]='Aquí ves lo que te toca hoy, en orden. Arriba están los avisos "Por atender"; los numeritos de la barra de abajo te dicen en qué sección hay pendientes.';
  GUIA.admin.personal[1]='Toca a un chofer para ver sus datos, su sueldo y su recorrido: dónde está ahora, sus paradas y dónde estuvo a cada hora.';
  GUIA.admin.cierreadm[1]='Toca "Recibir el cierre": la app te dice qué debe regresar (y lo que pasó en su ruta) y tú solo confirmas.'}
 if(GUIA.rep){GUIA.rep.ruta[1]='Arriba sale lo que sigue. Toca "Entregar" en tu siguiente cliente. Con "Ordenar con tráfico" la app acomoda tu ruta. El botón Gasto es para casetas o combustible (con foto del ticket).';
  GUIA.rep.entrega[1]='Escribe cuántas cajas y kilos le dejas y cómo te pagó. Si no estaba, toca "No estaba" y escoge el motivo.'}
}catch(e){console.error('tutorial',e)}

/* ---------- 29 · respaldo automático diario (celular del administrador) ---------- */
function respTxt(){var o=JSON.parse(JSON.stringify(S));['toast','modal','menu','aj','px','bj','undo','wz','pinOk'].forEach(function(k){delete o[k]});return JSON.stringify({app:'Ruta Fácil',fecha:new Date().toISOString(),datos:o})}
function respNombre(d){return 'respaldo-'+(d||iso(new Date()))+'.json'}
function respQuedan(){var L=[],t=new Date();for(var i=0;i<30;i++){var d=new Date(t.getTime()-i*864e5);L.push(respNombre(iso(d)))}return L}
function respHaz(manual){var n=natPl();if(!n||!n.respaldoGuardar){if(manual){try{respaldoDescargar()}catch(e){}}return Promise.resolve(false)}var hoy=iso(new Date());
 return n.respaldoGuardar({texto:respTxt(),nombre:respNombre(hoy)}).then(function(r){try{localStorage.setItem('respUlt',hoy);localStorage.setItem('respDonde',r&&r.donde||'Descargas/Ruta Facil/Respaldos')}catch(e){}
  if(n.respaldoLimpia)n.respaldoLimpia({quedan:respQuedan()}).catch(function(){});if(manual)toast('✓ Respaldo guardado en '+((r&&r.donde)||'Descargas'));render();return true},function(e){if(manual)toast('No se pudo guardar el respaldo: '+(e&&e.message||e));return false})}
function respUlt(){try{return localStorage.getItem('respUlt')}catch(e){return null}}
setInterval(function(){try{if(window.__pnTest&&!window.__respTest)return;if(!(S.role==='admin'&&!S.encOn)||!_cargado)return;if(respUlt()===iso(new Date()))return;respHaz(false)}catch(e){}},30000);
setTimeout(function(){try{if(window.__pnTest&&!window.__respTest)return;if(S.role==='admin'&&!S.encOn&&respUlt()!==iso(new Date()))respHaz(false)}catch(e){}},8000);
var _av63=avisos;avisos=function(){var a=_av63.apply(this,arguments);try{if(S.role==='admin'&&!S.encOn&&natPl()&&natPl().respaldoGuardar){var u=respUlt(),d=u?Math.round((new Date(iso(new Date())).getTime()-new Date(u).getTime())/864e5):99;if(d>2)a.push('URGENTE: lleva '+(u?d+' días':'mucho')+' sin respaldo. Ve a Ajustes › Respaldo y toca "Respaldar ahora".')}}catch(e){}return a};
var _aj63=ajHTML;ajHTML=function(){var h=_aj63.apply(this,arguments);if(!h||h.indexOf('id="ajov"')<0||!(S.role==='admin'&&!S.encOn))return h;var u=respUlt(),dn='';try{dn=localStorage.getItem('respDonde')||''}catch(e){}
 var c='<div class="card" data-key="respauto"><b>Respaldo automático</b><div class="lbl">Cada día, la primera vez que abres la app, se guarda una copia en este celular (se quedan los últimos 30 días).</div>'
  +rw('Último',u?fmtF(u):'todavía no')+(dn?rw('Dónde',esc(dn)):'')
  +'<div style="display:flex;gap:8px;margin-top:8px"><button class="btn sm" style="flex:1" data-act="resphaz">Respaldar ahora</button><label class="btn sm sec" style="flex:1;display:flex;align-items:center;justify-content:center;cursor:pointer" for="respin">Restaurar</label></div><input id="respin" type="file" accept=".json,application/json" style="position:absolute;opacity:0;width:1px;height:1px"></div>';
 var i=h.lastIndexOf('</div></div>');return i<0?h:h.slice(0,i)+c+h.slice(i)};
document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act="resphaz"]');if(!b)return;e.stopImmediatePropagation();respHaz(true)},true);
document.addEventListener('change',function(e){var t=e.target;if(!t||t.id!=='respin')return;var f=t.files&&t.files[0];if(!f)return;var fr=new FileReader();fr.onload=function(){var o=null;try{o=JSON.parse(fr.result)}catch(er){}t.value='';
  if(!o||!o.datos||o.app!=='Ruta Fácil'){toast('Ese archivo no es un respaldo de Ruta Fácil');return}
  wzSeguro('Se reemplaza todo lo de este celular por el respaldo del '+esc(String(o.fecha||'').slice(0,10))+'. Lo que hiciste después se pierde. Si hay nube, también se sube.',function(){var f2=fresh(),d=o.datos;Object.keys(f2).forEach(function(k){if(!(k in d))d[k]=f2[k]});var keep={pinOk:S.pinOk,role:S.role,adminYo:S.adminYo};S=d;Object.keys(keep).forEach(function(k){S[k]=keep[k]});try{guardarYa()}catch(er){}toast('✓ Respaldo restaurado')},'Sí, restaurar')};fr.readAsText(f)},true);
