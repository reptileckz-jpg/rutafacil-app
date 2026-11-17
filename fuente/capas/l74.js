/* ===================== v7.6 · vehículos, revisión, datos del cliente, mayoreo y desgaste (12 nov)
   66 aceite: "¿qué marcaba el tablero?" o "¿hace cuántos km?" (antes se confundía) + aviso para corregir el dato que ya está mal
   71 la revisión de la semana (lunes) es paso a paso, a pantalla completa
   81 "Datos que faltan" de un cliente: por pasos y solo lo que falta; en su ficha, "¿Mayoreo? Sí/No" en lugar del precio pactado,
      y "precio especial" que solo vale para su próxima compra
   86 el desglose trae el desgaste al ir por la fruta (también en el viaje de carga) y al repartirla (estimado mientras no hay rutas) ===================== */
(function(){var st=document.createElement('style');st.textContent=[
 '.ip74 .it{font-size:24px;font-weight:900;line-height:1.2;margin:16px 2px 4px}.ip74 .ds{font-size:17px;color:var(--muted);margin:0 2px 12px}',
 '.ip74 .ic{width:84px;height:84px;border-radius:24px;background:var(--surface);border:1px solid var(--line);display:flex;align-items:center;justify-content:center;margin:12px auto 0}.ip74 .ic svg{width:52px;height:52px}',
 '.ip74 .bb{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:14px}.ip74 .bb button{min-height:84px;border-radius:20px;font-size:21px;font-weight:900;border:3px solid var(--line);background:var(--surface);color:var(--fg)}',
 '.ip74 .bb .ok[aria-pressed="true"]{background:#16A34A;border-color:#16A34A;color:#fff}.ip74 .bb .mal[aria-pressed="true"]{background:#DC2626;border-color:#DC2626;color:#fff}',
 '.ip74 .bar{height:8px;border-radius:4px;background:var(--line);overflow:hidden;margin-top:6px}.ip74 .bar i{display:block;height:100%;background:var(--accent)}',
 '.ce74{border:1px solid var(--line);border-radius:14px;padding:10px 12px;margin-top:8px;background:var(--bg)}'].join('\n');document.head.appendChild(st)})();

/* ---------- 66 · aceite ---------- */
function acMal74(odo,ac,int){odo=num(odo);ac=num(ac);int=num(int)||10000;return ac>0&&odo>0&&ac<odo&&odo-ac>3*Math.max(int,5000)&&ac<=Math.max(int,5000)*1.6}
(function(){var P=WZ.veh.pasos,i=-1;P.forEach(function(p,k){if(/kilómetros marca hoy/.test(p.q))i=k});if(i<0)return;
 P.splice(i+1,0,
  {q:'¿Cada cuántos kilómetros le cambias el aceite?',a:'Lo dice el manual o tu mecánico. Si no sabes, escoge 10,000.',c:[{k:'acInt',t:'opc',o:[['5000','5,000 km'],['7500','7,500 km'],['10000','10,000 km'],['15000','15,000 km']],falta:'Escoge cada cuánto'}],auto:true},
  {q:'¿Cuándo fue el último cambio de aceite?',html:function(d){var m=d.acM||'';var ch=function(v,l){return '<button data-act="wzop" data-k="acM" data-v="'+v+'" aria-pressed="'+(m===v)+'">'+l+'</button>'};
    return '<div class="card"><div class="opc" style="grid-template-columns:1fr">'+ch('tab','Sé lo que marcaba el tablero')+ch('hace','Sé hace cuántos kilómetros fue')+ch('nose','No sé')+'</div>'
     +(m==='tab'?'<div class="field grande"><label for="wz_acX">¿Qué marcaba el tablero en ese cambio? (km)</label><input id="wz_acX" type="number" inputmode="decimal" data-wz="acX" value="'+esc(d.acX||'')+'" placeholder="Ej. '+Math.max(0,num(d.odo)-3000)+'"></div><div class="lbl">Hoy marca '+num(d.odo).toLocaleString('es-MX')+' km.</div>':'')
     +(m==='hace'?'<div class="field grande"><label for="wz_acX">¿Hace cuántos kilómetros? </label><input id="wz_acX" type="number" inputmode="decimal" data-wz="acX" value="'+esc(d.acX||'')+'" placeholder="Ej. 3600"></div><div class="lbl">Lo que ha recorrido desde ese cambio.</div>':'')
     +(m==='nose'?'<div class="lbl" style="margin-top:8px">Se toma como si fuera hoy. Cuando lo cambies, regístralo y la app te avisa a tiempo del siguiente.</div>':'')+'</div>'},
   ok:function(d){var m=d.acM,v=num(d.acX),odo=num(d.odo);if(!m)return 'Escoge una opción';if(m==='nose')return '';if(!(v>0))return 'Escribe los kilómetros';
    if(m==='tab'){if(v>odo)return 'No puede ser más de lo que marca hoy ('+odo.toLocaleString('es-MX')+' km)';if(acMal74(odo,v,d.acInt))return '¿Seguro? Eso sería hace '+(odo-v).toLocaleString('es-MX')+' km. Si quisiste decir que fue hace '+v.toLocaleString('es-MX')+' km, escoge "Sé hace cuántos kilómetros fue".'}
    if(m==='hace'&&v>odo)return 'No puede ser más de lo que marca hoy';return ''}});
 var g0=WZ.veh.guardar;WZ.veh.guardar=function(d){var odo=num(d.odo),v=num(d.acX);d.acLast=d.acM==='tab'?String(v):(d.acM==='hace'?String(Math.max(0,odo-v)):String(odo));delete d.acM;delete d.acX;return g0.apply(this,arguments)}})();
/* al editar: la etiqueta dice qué es, y si parece al revés, pregunta */
function acLbl74(){var l=document.querySelector('label[for="vf_acLast"]');if(l&&!l.dataset.x74){l.dataset.x74=1;l.innerHTML='Último cambio de aceite: lo que <b>marcaba el tablero</b> (km)'}}
window.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act="vsave"]');if(!b||!S.vf)return;var f=S.vf;if(f._ac74||!acMal74(f.odo,f.acLast,f.acInt))return;e.preventDefault();e.stopImmediatePropagation();var v=num(f.acLast),o=num(f.odo);
 window._ac74=function(hace){S.modal=null;if(hace)f.acLast=String(o-v);f._ac74=1;render();var s=document.querySelector('[data-act="vsave"]');if(s)s.click()};
 abrirModal('¿Está bien el aceite?','Pusiste que en el último cambio el tablero marcaba '+v.toLocaleString('es-MX')+' km, y hoy marca '+o.toLocaleString('es-MX')+' km. ¿Quisiste decir que el cambio fue hace '+v.toLocaleString('es-MX')+' km?',[['Sí, fue hace '+v.toLocaleString('es-MX')+' km','ac74si'],['No, así está','ac74no']])},true);
document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act="ac74si"],[data-act="ac74no"]');if(!b)return;e.stopImmediatePropagation();var f=window._ac74;window._ac74=null;if(f)f(b.dataset.act==='ac74si')},true);
/* los vehículos que ya tienen el dato al revés: se pregunta una vez */
function acArregla74(){if(!(S.role==='admin'&&!S.encOn)||S.tab.admin!=='vehiculos')return;var m=document.querySelector('main');if(!m||m.querySelector('[data-x="ac74"]'))return;var L=(S.veh||[]).filter(function(v){return !v.baja&&v.acOk74!==v.acLast&&acMal74(v.odo,v.acLast,v.acInt)});if(!L.length)return;
 var d=document.createElement('div');d.dataset.x='ac74';d.innerHTML=L.map(function(v){var a=num(v.acLast),o=num(v.odo);return '<div class="card alert" style="padding:12px 14px"><b style="font-size:18px">¿Está bien el aceite de '+esc(v.n)+'?</b><div style="font-size:16px;margin-top:4px">Dice que el último cambio fue cuando el tablero marcaba <b>'+a.toLocaleString('es-MX')+' km</b>, y hoy marca <b>'+o.toLocaleString('es-MX')+' km</b>: saldría vencido por '+(o-a-num(v.acInt||10000)).toLocaleString('es-MX')+' km.</div><div style="display:flex;flex-direction:column;gap:8px;margin-top:10px"><button class="btn" data-act="ac74fix" data-id="'+v.id+'">Fue hace '+a.toLocaleString('es-MX')+' km</button><button class="btn sec" data-act="ac74ok" data-id="'+v.id+'">Sí, de verdad está vencido</button></div></div>'}).join('');m.prepend(d)}
document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act="ac74fix"],[data-act="ac74ok"]');if(!b)return;e.stopImmediatePropagation();var v=vehById(+b.dataset.id);if(!v)return;
 if(b.dataset.act==='ac74fix'){var a=num(v.acLast);v.acLast=Math.max(0,num(v.odo)-a);S.hist.push({t:fmtF(iso(TODAY))+' '+hhmm(),q:quien(),x:'Corrigió el último aceite de '+v.n+': fue hace '+a.toLocaleString('es-MX')+' km'});toast('✓ Corregido')}else{v.acOk74=v.acLast}render()},true);

/* ---------- 71 · revisión de la semana paso a paso ---------- */
/* inspHTML: pasó a tema-vehiculos.js */
function ip74HTML(){var x=S.ip74;if(!x)return '';var o;try{o=inspObj(x.w)}catch(e){o=null}if(!o){S.ip74=null;return ''}var L=inspLista(o.tipo),IC=inspIcos(o.tipo),c=inspCfgN(),P=inspPartes(o.tipo),nD=c.dia.length,nS=P.indexOf('sem')>-1?c.lunes.length:0,nC=P.indexOf('carga')>-1?c.carga.length:0;
 if(x.i>=L.length){var mal=L.map(function(t,i){return o.r[i]==='mal'?t.split(': ')[0]:null}).filter(Boolean);
  return ovW70('ip74ov','Revisión del vehículo','<div class="ip74"><div class="bar"><i style="width:100%"></i></div><div class="it">'+(mal.length?'Revisaste todo · '+mal.length+' con falla':'✓ Todo revisado y bien')+'</div>'+(mal.length?'<div class="card note" style="font-size:16px">'+mal.map(esc).join('<br>')+'<div class="lbl" style="margin-top:6px">Se le avisa al administrador.</div></div>':'')+'<button class="btn big" data-act="ip74fin">Listo</button><button class="btn sec big" data-act="ip74atras">Atrás</button></div>','ip74x')}
 var i=x.i,p=L[i].split(': '),r=o.r[i],sec=i<nD?'Revisión diaria':(i<nD+nS?'Una vez por semana':(i<nD+nS+nC?'Para el viaje de carga':'Documentos del mes'));
 var h='<div class="ip74"><div class="lbl" style="font-weight:800">'+sec+' · '+(i+1)+' de '+L.length+'</div><div class="bar"><i style="width:'+Math.round(i/L.length*100)+'%"></i></div>'
  +'<div class="ic">'+(IC_INSP[IC[i]||'llave']||'')+'</div><div class="it">'+esc(p[0])+'</div>'+(p[1]?'<div class="ds">'+esc(p[1])+'</div>':'')
  +'<div class="bb"><button class="ok" data-act="ip74v" data-v="bien" aria-pressed="'+(r==='bien')+'">✓ Bien</button><button class="mal" data-act="ip74v" data-v="mal" aria-pressed="'+(r==='mal')+'">✗ Mal</button></div>';
 if(r==='mal')h+='<div class="card" style="margin-top:12px"><div class="field"><label for="ip74n">¿Qué tiene?</label><input id="ip74n" type="text" data-bind="'+x.w+'.n.'+i+'" value="'+esc(o.n[i]||'')+'" style="width:100%;text-align:left"></div><label style="display:block;cursor:pointer;margin-top:8px">'+(o.f[i]?'<img src="'+o.f[i]+'" alt="Foto de la falla" style="width:100%;height:140px;object-fit:cover;border-radius:12px">':'<div style="min-height:60px;border-radius:12px;border:2px dashed var(--line);display:flex;align-items:center;justify-content:center;color:var(--muted);font-weight:700">📷 Foto de la falla</div>')+'<input type="file" accept="image/*" capture="environment" data-inspf="'+x.w+':'+i+'" style="position:absolute;opacity:0;width:1px;height:1px;pointer-events:none"></label><button class="btn big" data-act="ip74sig">Siguiente</button></div>';
 h+='<div style="display:flex;gap:8px;margin-top:14px">'+(i>0?'<button class="btn sec" style="flex:1;min-height:56px" data-act="ip74atras">Atrás</button>':'')+'<button class="btn sec" style="flex:1;min-height:56px" data-act="ip74todo">Todo lo demás bien</button></div></div>';
 return ovW70('ip74ov','Revisión del vehículo',h,'ip74x')}
document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act^="ip74"]');if(!b)return;var a=b.dataset.act;e.stopImmediatePropagation();
 if(a==='ip74go'){var o=inspObj(b.dataset.w),L=inspLista(o.tipo),k=0;while(k<L.length&&o.r[k])k++;S.ip74={w:b.dataset.w,i:k};render();return}
 var x=S.ip74;if(!x)return;var o2=inspObj(x.w),L2=inspLista(o2.tipo);
 if(a==='ip74x'||a==='ip74fin'){S.ip74=null;render();return}
 if(a==='ip74atras'){x.i=Math.max(0,x.i-1);render();return}
 if(a==='ip74sig'){x.i++;render();return}
 if(a==='ip74todo'){L2.forEach(function(t,i){if(!o2.r[i])o2.r[i]='bien'});x.i=L2.length;render();return}
 if(a==='ip74v'){o2.r[x.i]=b.dataset.v;if(b.dataset.v==='bien')x.i++;render();return}},true);

/* ---------- 81 · datos que faltan del cliente, por pasos ---------- */
function cliF74Pasos(c){var P=[],v=function(x){return x==null||String(x).trim()===''};
 if(v(c.tel))P.push({q:'¿Cuál es el teléfono de '+c.n+'?',a:'Para mandarle su ticket por WhatsApp.',saltar:true,c:[{k:'tel',l:'Teléfono (10 dígitos)',t:'tel',opc:true}],ok:function(d){var t=String(d.tel||'').replace(/\D/g,'');return t&&t.length!==10?'El teléfono debe tener 10 dígitos':''}});
 if(c.lat==null)P.push({q:'¿Dónde está '+c.n+'?',a:'Pon el punto exacto, o déjalo para que el chofer lo guarde al llegar.',saltar:true,html:function(d){return ubWz72(d)}});
 if(v(c.a))P.push({q:'Dirección o referencia de '+c.n,saltar:true,c:[{k:'a',l:'Dirección o cómo llegar',opc:true}]});
 if(!(c.dias&&c.dias.length)&&!c.sinRuta)P.push({q:'¿Qué días se le visita?',html:function(d){var L=d.dias||[];return '<div class="card"><div class="opc" style="grid-template-columns:repeat(4,1fr)">'+DIAS_TXT.map(function(x,i){return '<button data-act="wzdia" data-v="'+i+'" aria-pressed="'+(L.indexOf(i)>-1)+'" style="min-height:56px">'+x.slice(0,3)+'</button>'}).join('')+'</div></div>'},ok:function(d){return (d.dias||[]).length?'':'Escoge al menos un día'}});
 if(v(c.hAb)||v(c.hCi)||horMal117(c))P.push({q:'¿A qué hora abre y cierra '+c.n+'?',a:horMal117(c)?'Dice que abre a las '+horaTxt117(c.hAb)+' y cierra a las '+horaTxt117(c.hCi)+'. Escógelo otra vez.':undefined,html:function(d){var o=HORAS72();var sel=function(k,l){return '<div class="field grande"><label for="wz_'+k+'">'+l+'</label><select id="wz_'+k+'" data-wz="'+k+'"><option value="">Escoge</option>'+o.map(function(x){return '<option value="'+x[0]+'"'+(d[k]===x[0]?' selected':'')+'>'+x[1]+'</option>'}).join('')+'</select></div>'};return '<div class="card">'+sel('hAb','Abre a las')+sel('hCi','Cierra a las')+'</div>'},
  ok:function(d){if(!d.hAb||!d.hCi)return 'Escoge la hora en que abre y en que cierra';return d.hCi<=d.hAb?'La hora de cierre debe ser después de la de abrir':''}});
 if(v(c.recibe))P.push({q:'¿Quién recibe en '+c.n+'?',saltar:true,c:[{k:'recibe',l:'Nombre de quien recibe',opc:true}]});
 P.push({q:'Revisa y guarda',html:function(d){return '<div class="card good">'+['tel','a','recibe'].filter(function(k){return d[k]}).map(function(k){return rw({tel:'Teléfono',a:'Dirección',recibe:'Recibe'}[k],esc(d[k]))}).join('')+(d.lat!=null?rw('Ubicación','✓'):'')+(d.dias&&d.dias.length?rw('Días',d.dias.map(function(i){return DIAS_TXT[i]}).join(', ')):'')+(d.hAb?rw('Horario',esc(d.hAb+' a '+d.hCi)):'')+'</div>'}});return P}
WZ.cliF={tit:'Completar datos',fin:'Guardar',pasos:[],guardar:function(d){var c=cl(+d.id);if(!c)return 'No encontré al cliente';var n=0;
 if(d.tel){c.tel=String(d.tel).replace(/\D/g,'');n++}if(d.a){c.a=String(d.a).trim();n++}if(d.recibe){c.recibe=String(d.recibe).trim();n++}if(d.lat!=null&&c.lat==null){c.lat=+d.lat;c.lng=+d.lng;c.locBy=quien();c.locF=iso(TODAY);n++}
 if(d.dias&&d.dias.length&&!(c.dias&&c.dias.length)){c.dias=d.dias.slice();n++}if(d.hAb&&d.hCi){c.hAb=d.hAb;c.hCi=d.hCi;n++}
 S.hist.push({t:fmtF(iso(TODAY))+' '+hhmm(),q:quien(),x:'Completó '+n+' dato'+(n===1?'':'s')+' de '+c.n});toast('✓ Datos de '+c.n+' guardados');return true}};
window.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act="dfgo"]');if(!b)return;var x=dfLista()[+b.dataset.i];if(!x||!x.go||!(x.go.t==='cli'||x.go.t==='clidias'))return;var c=cl(+x.go.id);if(!c)return;
 e.stopImmediatePropagation();WZ.cliF.pasos=cliF74Pasos(c);WZ.cliF.tit='Datos de '+c.n;S.dfOpen=false;wzAbre('cliF',{id:c.id,dias:[]})},true);

/* ---------- 81 · mayoreo Sí/No y precio especial de una sola vez ---------- */
(function(){try{(S.cli||[]).forEach(function(c){if((num(c.ppR)||num(c.ppM))&&!c.ppUna&&!c.pp74){c.ppUna=iso(TODAY);c.pp74=1}})}catch(e){}})();
function ce74(){var r=document.getElementById('ce_ppR');if(!r||r.dataset.x74)return;var id=S.cliEdit,c=cl(id);if(!c)return;r.dataset.x74=1;var fR=r.closest('.field'),fM=(document.getElementById('ce_ppM')||{}).closest?document.getElementById('ce_ppM').closest('.field'):null;
 var box=document.createElement('div');box.className='ce74';var pe=num(c.ppR)||num(c.ppM);
 box.innerHTML='<b>¿Se le da precio de mayoreo?</b><div class="lbl">Usa el mayoreo del día; nunca un precio fijo.</div><div class="chips" role="group" style="margin:6px 0"><button data-act="may74" data-id="'+id+'" data-v="1" aria-pressed="'+!!c.mayoreo+'">Sí</button><button data-act="may74" data-id="'+id+'" data-v="0" aria-pressed="'+!c.mayoreo+'">No</button></div>'
  +'<div style="border-top:1px solid var(--line);margin-top:8px;padding-top:8px"><b>⭐ Precio especial</b><div class="lbl">Solo para su próxima compra (para ganarlo o que compre más). Después vuelve al precio del día.</div>'+(pe?'<div style="margin-top:4px">Tiene: '+(num(c.ppR)?money(num(c.ppR))+' la caja':'')+(num(c.ppR)&&num(c.ppM)?' · ':'')+(num(c.ppM)?money(num(c.ppM))+' el kilo':'')+'</div>':'')
  +'<button class="btn sm sec" style="margin-top:6px" data-act="pe74" data-id="'+id+'">'+(pe?'Cambiar o quitar':'Darle precio especial una vez')+'</button></div>';
 if(fR)fR.replaceWith(box);if(fM)fM.remove();Array.prototype.forEach.call(document.querySelectorAll('.lbl'),function(l){if(/^Precio pactado vacío/.test(l.textContent))l.remove()})}
document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act="may74"],[data-act="pe74"],[data-act="pe74ok"],[data-act="pe74quita"],[data-act="pe74x"]');if(!b)return;e.stopImmediatePropagation();var a=b.dataset.act;
 if(a==='may74'){var c=cl(+b.dataset.id);if(!c)return;c.mayoreo=b.dataset.v==='1';S.hist.push({t:fmtF(iso(TODAY))+' '+hhmm(),q:quien(),x:(c.mayoreo?'Le da mayoreo a ':'Ya no le da mayoreo a ')+c.n});render();return}
 if(a==='pe74'){var c2=cl(+b.dataset.id);S.pe74={id:+b.dataset.id,R:num(c2.ppR)?String(c2.ppR):'',M:num(c2.ppM)?String(c2.ppM):''};render();return}
 var x=S.pe74;if(!x)return;var c3=cl(x.id);
 if(a==='pe74x'){S.pe74=null;render();return}
 if(a==='pe74quita'){c3.ppR='';c3.ppM='';delete c3.ppUna;if(S.ce&&S.cliEdit===c3.id){S.ce.ppR='';S.ce.ppM=''}S.pe74=null;toast('Precio especial quitado');render();return}
 var R=num(x.R),M=num(x.M),cR=0,cM=0;try{cR=costoCajaAct()}catch(er){}try{cM=costoKgMAct()}catch(er){}
 if(!(R>0)&&!(M>0)){toast('Escribe al menos un precio');return}
 var sig=function(){c3.ppR=R>0?String(R):'';c3.ppM=M>0?String(M):'';c3.ppUna=iso(TODAY);if(S.ce&&S.cliEdit===c3.id){S.ce.ppR=c3.ppR;S.ce.ppM=c3.ppM}S.hist.push({t:fmtF(iso(TODAY))+' '+hhmm(),q:quien(),x:'Precio especial de una vez para '+c3.n+': '+(R?money(R)+' la caja ':'')+(M?money(M)+' el kilo':'')});S.pe74=null;toast('✓ Solo para su próxima compra');render()};
 if((R>0&&cR&&R<cR)||(M>0&&cM&&M<cM)){window._pe74=sig;abrirModal('¿Seguro?','Ese precio queda abajo de lo que te cuesta ('+(R>0&&R<cR?money(cR)+' la caja':money(cM)+' el kilo')+'). Perderías en esa venta.',[['Sí, darlo así','pe74si']]);return}sig()},true);
document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act="pe74si"]');if(!b)return;e.stopImmediatePropagation();S.modal=null;var f=window._pe74;window._pe74=null;if(f)f();else render()},true);
function pe74HTML(){var x=S.pe74;if(!x)return '';var c=cl(x.id);if(!c){S.pe74=null;return ''}var P=S.precio||{};
 return ovW70('pe74ov','Precio especial','<div class="q">Precio especial para '+esc(c.n)+'</div><div class="lbl">Solo vale para su próxima compra. Después se le cobra el precio del día.</div><div class="card" style="margin-top:10px"><div class="field"><label for="pe74R">Caja de roatán $ (hoy '+money(num(P.R))+')</label><input id="pe74R" type="number" inputmode="decimal" step="any" min="0" data-bind="pe74.R" value="'+esc(x.R)+'"></div><div class="field"><label for="pe74M">Kilo de macho $ (hoy '+money(num(P.M))+')</label><input id="pe74M" type="number" inputmode="decimal" step="any" min="0" data-bind="pe74.M" value="'+esc(x.M)+'"></div></div>'
  +'<button class="btn big" data-act="pe74ok">Guardar (una sola vez)</button>'+(num(c.ppR)||num(c.ppM)?'<button class="btn sec big" data-act="pe74quita">Quitar el precio especial</button>':''),'pe74x')}
/* después de su compra, el precio especial se quita solo */
window.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act="entconf"],[data-act="confsi"],.modal [data-act]');if(!b||S.role!=='rep')return;var i=curStop(),c=i>=0?cl(S.stops[i].c):null;if(!c||!c.ppUna)return;var id=c.id;
 setTimeout(function(){var cc=cl(id);if(!cc||!cc.ppUna)return;if((S.stops||[]).some(function(s){return s.c===id&&s.done})){var t=(num(cc.ppR)?money(num(cc.ppR))+' la caja ':'')+(num(cc.ppM)?money(num(cc.ppM))+' el kilo':'');cc.ppR='';cc.ppM='';delete cc.ppUna;S.hist.push({t:fmtF(iso(TODAY))+' '+hhmm(),q:'La app',x:'Se usó el precio especial de '+cc.n+' ('+t+'); vuelve al precio del día'})}},400)},false);
try{if(typeof CLIK!=='undefined'&&CLIK.push)['ppUna','mayoreo','acOk74'].forEach(function(k){if(CLIK.indexOf(k)<0)CLIK.push(k)})}catch(e){}

/* ---------- 86 · desgaste al ir por la fruta y al repartirla ---------- */
function vehRep74(){var L=(S.veh||[]).filter(function(v){return !v.baja&&!vehEsAuto(v)});return L[0]||vehHoy()}
function dsgVj74(){(S.cargas||[]).forEach(function(c){if(!c.vw||c.est==='Por llegar'||c.dsgM!=null||(c.cv&&c.cv.ok))return;try{var km=num(cvCalc(c).km);if(!(km>0))return;var vh=vehById(+(c.viaje&&c.viaje.veh));c.dsgKm=Math.round(km);c.dsgM=Math.round(km*tasa68(vh));c.dsgOn=true;c.dsg74=1}catch(e){}})}
var _rep74=rep68;rep68=function(dias){var o=_rep74.apply(this,arguments);if(o.rutas)return o;try{var vh=vehRep74(),km=num(S.cfg.kmRuta)||40,cj=num(S.cfg.cajRuta)||num(vh&&vh.capC)||40,kg=num(S.cfg.kgRuta)||150,d=km*tasa68(vh),kc=o.kc||20,wR=cj*kc,wM=kg,w=wR+wM;
  o.est=true;o.desg=d;o.estKm=km;o.caja=w?d*wR/w/cj:0;o.kgc=w?d*wM/w/kg:0}catch(e){}return o};
var _desg74=desg;desg=function(c,k){var h=_desg74.apply(this,arguments);if(typeof h!=='string')return h;var rp=rep68(30);
 h=h.replace(/Desgaste del vehículo \(/g,'Desgaste al ir por la fruta (');
 if(rp.est){h=h.replace('+ Repartirla <span class="lbl">(sin rutas cerradas todavía)</span>','+ Repartirla: desgaste de la camioneta <span class="lbl">(estimado: '+rp.estKm+' km de ruta; sale real al cerrar rutas)</span>').replace('>+ Repartirlo<','>+ Repartirlo: desgaste de la camioneta <span class="lbl">(estimado)</span><')}
 else h=h.replace('>+ Repartirla<','>+ Repartirla <span class="lbl">(combustible, gastos, desgaste y sueldo de las rutas)</span><');return h};
var _aj74=ajHTML;ajHTML=function(){var h=_aj74.apply(this,arguments);if(!h||h.indexOf('id="ajov"')<0||S.role!=='admin'||S.encOn)return h;
 var c='<details class="card" data-k="aj74rep"'+(S.dOpen.aj74rep?' open':'')+'><summary><b>🚚 Costo de repartir (mientras no hay rutas)</b><span class="lbl">para el precio sugerido</span></summary><div class="lbl" style="margin-top:6px">Mientras no haya rutas cerradas, el costo de repartir se estima con el desgaste de la camioneta. Al cerrar rutas se usa lo real.</div>'
  +'<div class="field"><label for="kmRuta">Kilómetros de una ruta normal</label><input id="kmRuta" type="number" inputmode="decimal" data-bind="cfg.kmRuta" value="'+esc(S.cfg.kmRuta||'')+'" placeholder="40"></div><div class="field"><label for="cajRuta">Cajas de roatán en una ruta</label><input id="cajRuta" type="number" inputmode="decimal" data-bind="cfg.cajRuta" value="'+esc(S.cfg.cajRuta||'')+'" placeholder="40"></div><div class="field"><label for="kgRuta">Kilos de macho en una ruta</label><input id="kgRuta" type="number" inputmode="decimal" data-bind="cfg.kgRuta" value="'+esc(S.cfg.kgRuta||'')+'" placeholder="150"></div></details>';
 var i=h.lastIndexOf('</div></div>');return i<0?h:h.slice(0,i)+c+h.slice(i)};

var _rd74=render;render=function(){try{dsgVj74()}catch(e){}var r=_rd74.apply(this,arguments);try{acLbl74();acArregla74();ce74();ovPon70('ip74ov',ip74HTML());ovPon70('pe74ov',pe74HTML())}catch(e){console.error('l74',e)}return r};
/* el precio especial de una vez gana sobre el mayoreo en esa compra */
var _eC74=entregaCalc;entregaCalc=function(){var i=curStop(),c=i>=0&&S.stops[i]?cl(S.stops[i].c):null;if(c&&c.ppUna&&c.mayoreo&&(num(c.ppR)||num(c.ppM))){c.mayoreo=false;try{return _eC74.apply(this,arguments)}finally{c.mayoreo=true}}return _eC74.apply(this,arguments)};
