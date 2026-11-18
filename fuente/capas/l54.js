/* ===================== v6.8 · Simulador y viajes: "+ Otra báscula" y "+ Nuevo" ahí mismo (94), el roatán se compra por kilo (95),
   solo se pregunta lo que vende cada proveedor (96), y "Programar este viaje" sigue en la misma tarjeta con ¿Seguro? (97) ===================== */
function provTipoOk(n){var p=S.provDir[n];return !!(p&&p.tipo&&(p.tipo!=='Ambos'||p.tipoOk))}
function provVende(n,t){var p=S.provDir[n],x=p&&p.tipo||'Ambos';return x==='Ambos'||x===(t==='R'?'Roatán':'Macho')}
function kgcDe(n){var L=(S.cargas||[]).filter(function(c){return (c.provR===n||(!c.provR&&c.prov===n))&&c.cajas>0&&c.kgR>0});if(!L.length)return KGC_IDEAL;return r2(sum(L,function(c){return c.kgR})/sum(L,function(c){return c.cajas}))}
function svNuevoHTML(d,k,lbl,ph){return d['_n'+k]?'<div class="card" style="margin-top:8px"><b>'+lbl+'</b><div class="field grande"><label for="wz_nn'+k+'">Nombre</label><input id="wz_nn'+k+'" type="text" data-wz="nn'+k+'" value="'+esc(d['nn'+k]||'')+'" placeholder="'+ph+'" style="text-align:left"></div>'
  +'<div class="field grande"><label for="wz_nl'+k+'">Link de Google Maps</label><input id="wz_nl'+k+'" type="text" data-wz="nl'+k+'" value="'+esc(d['nl'+k]||'')+'" placeholder="opcional" style="text-align:left"></div><div class="lbl">Si no tienes el link, la ubicación se guarda cuando el chofer llegue.</div>'
  +(k==='p'?'<div class="lbl" style="margin-top:8px"><b>¿Qué vende?</b></div><div class="opc" role="group" aria-label="Qué vende">'+[['Roatán','Roatán'],['Macho','Macho'],['Ambos','Los dos']].map(function(o){return '<button data-act="wzop" data-k="nt'+k+'" data-v="'+o[0]+'" aria-pressed="'+(d['nt'+k]===o[0])+'">'+o[1]+'</button>'}).join('')+'</div>':'')
  +'<button class="btn" style="margin-top:10px" data-act="svnuevo" data-k="'+k+'">Agregar</button></div>':'<button class="btn sec" style="margin-top:8px" data-act="svnuevoab" data-k="'+k+'">+ '+(k==='p'?'Otro proveedor':'Otra báscula')+'</button>'}
function svCargaHTML(d){return (d.provs||[]).map(function(n,i){var kc=kgcDe(n),h='<div class="card"><b style="font-size:18px">'+esc(n)+'</b>';
  if(provVende(n,'R')){var pc=num(d['pr'+i])*kc;h+='<div class="field grande"><label for="wz_c'+i+'">Cajas de roatán</label><input id="wz_c'+i+'" type="number" inputmode="numeric" data-wz="c'+i+'" value="'+esc(d['c'+i]||'')+'"></div>'
   +'<div class="field grande"><label for="wz_pr'+i+'">Precio por kilo del roatán $</label><input id="wz_pr'+i+'" type="number" inputmode="decimal" data-wz="pr'+i+'" value="'+esc(d['pr'+i]||'')+'"></div>'
   +'<div class="lbl">El roatán se compra por kilo y se vende por caja. '+(kc===KGC_IDEAL?'Se calcula con '+KGC_IDEAL+' kg por caja.':'Con este proveedor salen '+kc+' kg por caja (promedio).')+(pc?' Cada caja cuesta <b>'+money(pc)+'</b>.':'')+'</div>'}
  if(provVende(n,'M'))h+='<div class="field grande"><label for="wz_k'+i+'">Kilos de macho</label><input id="wz_k'+i+'" type="number" inputmode="decimal" data-wz="k'+i+'" value="'+esc(d['k'+i]||'')+'"></div>'
   +'<div class="field grande"><label for="wz_pm'+i+'">Precio por kilo del macho $</label><input id="wz_pm'+i+'" type="number" inputmode="decimal" data-wz="pm'+i+'" value="'+esc(d['pm'+i]||'')+'"></div>';
  return h+'</div>'}).join('')}
function svTot(d){var cj=0,cR=0,kM=0,cM=0;(d.provs||[]).forEach(function(n,i){var kc=kgcDe(n);if(provVende(n,'R')){var c=num(d['c'+i]);cj+=c;cR+=c*kc*num(d['pr'+i])}if(provVende(n,'M')){var k=num(d['k'+i]);kM+=k;cM+=k*num(d['pm'+i])}});return {cajas:cj,pCaja:cj?r2(cR/cj):0,kgM:kM,pKg:kM?r2(cM/kM):0}}
function svSug(d,n,i){var t=svTot({provs:[n],c0:d['c'+i],pr0:d['pr'+i],k0:d['k'+i],pm0:d['pm'+i]});return t.cajas*t.pCaja+t.kgM*t.pKg+((t.cajas||t.kgM)?1500:0)+num(provSaldo(n))}
function svFecha(d){return d.fecha&&d.hora?fmtF(d.fecha)+' a las '+d.hora:''}
var _simOld54=WZ.sim.pasos;
WZ.sim={tit:'Simulador de viaje',fin:'Programar este viaje',pasos:[
 {q:'¿A qué proveedores vas?',a:'Puedes escoger varios.',html:function(d){var L=d.provs||[];return '<div class="card"><div class="opc">'+provNames().map(function(n){return '<button data-act="svprov" data-v="'+esc(n)+'" aria-pressed="'+(L.indexOf(n)>-1)+'">'+esc(n)+'<br><span class="lbl">'+(svPunto(n)?'con ubicación':'sin ubicación')+'</span></button>'}).join('')+'</div>'+svNuevoHTML(d,'p','Proveedor nuevo','ej. Don Chuy')+'</div>'},ok:function(d){return (d.provs||[]).length?'':'Escoge al menos un proveedor'}},
 {q:'¿Qué vende cada uno?',a:'Solo se pregunta una vez.',si:function(d){return (d.provs||[]).some(function(n){return !provTipoOk(n)})},html:function(d){return (d.provs||[]).filter(function(n){return !provTipoOk(n)||d['t_'+n]}).map(function(n){var v=d['t_'+n];return '<div class="card"><b>'+esc(n)+'</b><div class="opc" role="group">'+[['Roatán','Roatán'],['Macho','Macho'],['Ambos','Los dos']].map(function(o){return '<button data-act="svtipo" data-n="'+esc(n)+'" data-v="'+o[0]+'" aria-pressed="'+(v===o[0])+'">'+o[1]+'</button>'}).join('')+'</div></div>'}).join('')},
  ok:function(d){var f=(d.provs||[]).filter(function(n){return !provTipoOk(n)});return f.length?'Escoge qué vende '+f[0]:''}},
 {q:'¿Va a pasar a la báscula?',html:function(d){return '<div class="card"><div class="opc" role="group">'+[['no','No pasa']].concat((S.basc||[]).map(function(b){return [String(b.id),b.n]})).map(function(o){return '<button data-act="wzop" data-k="basc" data-v="'+esc(o[0])+'" aria-pressed="'+(String(d.basc)===String(o[0]))+'">'+esc(o[1])+'</button>'}).join('')+'</div>'+svNuevoHTML(d,'b','Báscula nueva','ej. Báscula de la Sierra')+'</div>'},ok:function(d){return d.basc?'':'Escoge si pasa a la báscula'}},
 _simOld54[2],_simOld54[3],
 {q:'¿Qué vas a cargar?',html:svCargaHTML,ok:function(d){var t=svTot(d);if(!(t.cajas>0||t.kgM>0))return 'Escribe cuántas cajas o kilos';var e='';(d.provs||[]).some(function(n,i){if(num(d['c'+i])>0&&!(num(d['pr'+i])>0)){e='Escribe el precio por kilo del roatán de '+n;return true}if(num(d['k'+i])>0&&!(num(d['pm'+i])>0)){e='Escribe el precio por kilo del macho de '+n;return true}});return e}},
 _simOld54[5],
 {q:'Así sale el viaje',html:function(d){var t=svTot(d),x={};d.cajas=String(t.cajas||'');d.pCaja=String(t.pCaja||'');d.kgM=String(t.kgM||'');d.pKg=String(t.pKg||'');return _simOld54[6].html(d)}},
 {q:'¿Quién va?',c:[{k:'chofer',t:'opc',o:function(){return choferesL().filter(function(c){return !c.baja}).map(function(c){return [String(c.id),c.n]})},falta:'Escoge quién va'}],auto:true},
 {q:'¿Qué día y a qué hora sale?',c:[{k:'fecha',l:'Día',t:'date'},{k:'hora',l:'Hora',t:'time'}]},
 {q:'¿Cuánto efectivo le das?',a:function(){return 'Para pagar al proveedor y los gastos del camino. En caja hay '+money(cajaEsp())+'.'},html:function(d){return (d.provs||[]).map(function(n,i){if(d['e'+i]==null){d['e'+i]=String(Math.min(Math.round(svSug(d,n,i)),Math.max(0,Math.floor(cajaEsp()/Math.max(1,(d.provs||[]).length)))))}
   return '<div class="card"><div class="field grande"><label for="wz_e'+i+'">'+esc(n)+' $</label><input id="wz_e'+i+'" type="number" inputmode="decimal" data-wz="e'+i+'" value="'+esc(d['e'+i])+'"></div><div class="lbl">Sugerido '+money(svSug(d,n,i))+'</div></div>'}).join('')},
  ok:function(d){var t=0;(d.provs||[]).forEach(function(n,i){t+=num(d['e'+i])});return t>cajaEsp()+0.5?'En caja solo hay '+money(cajaEsp())+'. Baja el efectivo.':''}},
 {q:'Revisa el viaje',html:function(d){var t=svTot(d),v=d.veh?vehById(+d.veh):null;return '<div class="card good">'+rw('Va',esc(chofN(+d.chofer)))+rw('Vehículo',v?esc(v.n):'—')+rw('Sale',esc(svFecha(d)))+rw('Proveedores',esc((d.provs||[]).join(', ')))
   +(t.cajas?rw('Roatán',t.cajas+' cajas'):'')+rw('Efectivo que lleva',money((d.provs||[]).reduce(function(a,n,i){return a+num(d['e'+i])},0)))+(t.kgM?rw('Macho',t.kgM+' kg'):'')+'</div><div class="lbl">Al programarlo, a '+esc(chofN(+d.chofer))+' le aparece en su pestaña Viaje. Lo puedes cancelar mientras no salga.</div>'}}],
 guardar:function(d){abrirModal('¿Seguro?','Se programa el viaje y se le avisa a '+esc(chofN(+d.chofer))+'. Sale '+esc(svFecha(d))+'.',[['Sí, programar','svprogsi']]);return ''}};
/* tipo de vehículo (si es de carga) va antes del recorrido; el paso del vehículo ya excluye autos */
document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act]');if(!b||!S.wz||S.wz.k!=='sim')return;var a=b.dataset.act,d=S.wz.d;
 if(a==='svtipo'){e.stopImmediatePropagation();var p=provD(b.dataset.n);p.tipo=b.dataset.v;p.tipoOk=true;d['t_'+b.dataset.n]=b.dataset.v;S.wz.err='';render();return}
 if(a==='svnuevoab'){e.stopImmediatePropagation();d['_n'+b.dataset.k]=true;render();setTimeout(function(){var i=document.getElementById('wz_nn'+b.dataset.k);if(i)try{i.focus()}catch(er){}},80);return}
 if(a==='svnuevo'){e.stopImmediatePropagation();var k=b.dataset.k,n=String(d['nn'+k]||'').trim();if(!n){S.wz.err='Escribe el nombre';render();marcaFalta(document.getElementById('wz_nn'+k));return}
  var u=d['nl'+k]&&typeof ubParse==='function'?ubParse(d['nl'+k]):null;
  if(k==='p'){if(!d['ntp']){S.wz.err='Escoge qué vende';render();return}if(provNames().indexOf(n)>-1){S.wz.err='Ya hay un proveedor con ese nombre';render();return}var p=provD(n);p.tipo=d.ntp;p.tipoOk=true;if(u){p.lat=u.lat;p.lng=u.lng}else p.nub=true;
   (d.provs=d.provs||[]).push(n);S.hist.push({t:fmtF(iso(TODAY))+' '+hhmm(),q:quien(),x:'Dio de alta al proveedor '+n});S.avPrecio.push(quien()+' registró un proveedor nuevo: '+n)}
  else{var id=(S.basc||[]).reduce(function(m,x){return Math.max(m,+x.id||0)},0)+1;var o={id:id,n:n,cobro:'',dir:'',ab:'',ci:'',nota:'',nuevaPor:quien()};if(u){o.lat=u.lat;o.lng=u.lng}(S.basc=S.basc||[]).push(o);d.basc=String(id);S.avPrecio.push(quien()+' registró una báscula nueva: '+n)}
  d['_n'+k]=false;d['nn'+k]='';d['nl'+k]='';d.km=null;S.wz.err='';toast('Listo: '+n+' agregad'+(k==='p'?'o':'a'));render();return}},true);
/* Sí, programar: un viaje por proveedor, con lo que se escribió en el simulador */
document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act="svprogsi"]');if(!b)return;e.stopImmediatePropagation();S.modal=null;var w=S.wz;if(!w||w.k!=='sim'){render();return}var d=w.d,n0=S.cargas.length,err='';
 S.simDest=S.simDest||{};(d.provs||[]).forEach(function(p){S.simDest[p]={km:String(num(d.km)/2),cas:String(num(d.cas)/2)}});
 (d.provs||[]).forEach(function(n,i){if(err)return;var cj=provVende(n,'R')?num(d['c'+i]):0,km=provVende(n,'M')?num(d['k'+i]):0;if(!(cj>0||km>0))return;
  S.vj={cajas:cj?String(cj):'',kgM:km?String(km):'',fn:'',fkg:'',fecha:d.fecha,hora:d.hora,chofer:String(d.chofer),veh:String(d.veh||''),rec:'2',efe:String(num(d['e'+i]))};var antes=S.cargas.length,t0=S.toast;
  var bb=document.createElement('button');bb.dataset.act='progviaje';bb.dataset.n=encodeURIComponent(n);bb.dataset.ok='1';bb.style.display='none';document.body.appendChild(bb);try{bb.click()}finally{bb.remove()}
  if(S.cargas.length===antes){err=S.toast&&S.toast!==t0?S.toast:'No se pudo programar el viaje a '+n;return}
  var c=S.cargas[S.cargas.length-1];c.pPlan={kgCaja:kgcDe(n),pR:num(d['pr'+i]),pM:num(d['pm'+i])}});
 if(err){w.err=err;render();return}
 var hechos=S.cargas.length-n0;S.wz=null;S.tab.admin='cargas';S.hist.push({t:fmtF(iso(TODAY))+' '+hhmm(),q:quien(),x:'Programó '+(hechos>1?hechos+' viajes':'un viaje')+' para '+chofN(+d.chofer)+': '+svFecha(d)});
 toast('Viaje programado: '+chofN(+d.chofer)+' sale '+svFecha(d));render();window.scrollTo(0,0)},true);
window.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act="simabre"]');if(!b)return;e.stopImmediatePropagation();S.simYa=true;var h=new Date();h.setDate(h.getDate()+1);wzAbre('sim',{provs:[],dias:'1',com:'300',merma:'3',fecha:iso(TODAY),hora:'06:00'})},true);
/* ---------- 97 · cancelar un viaje programado que todavía no sale ---------- */
/* fiCarga: pasó a tema-viaje.js */
setTimeout(function(){CONF.progcancel=1},0);CONF53.progcancel='Se borra el viaje y se le avisa al chofer.';
document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act="progcancel"]');if(!b||!b.dataset.ok)return;e.stopImmediatePropagation();var c=cargaById(+b.dataset.id);if(!c)return;
 S.inv.vacias+=num(c.vacEnv);S.cargas=S.cargas.filter(function(x){return x.id!==c.id});S.openCarga=null;var ch=c.viaje&&c.viaje.chofer;
 S.avPrecio.push(quien()+' canceló el viaje a '+c.prov+' del '+fmtF(c.fecha)+(ch?' ('+chofN(ch)+')':''));S.hist.push({t:fmtF(iso(TODAY))+' '+hhmm(),q:quien(),x:'Canceló el viaje a '+c.prov});toast('Viaje cancelado');render()},true);
/* registrar carga: si escribes un proveedor que no existe, se da de alta ahí mismo */
var _rCm54=null;window.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act="savecarga"]');if(!b||!S.cf)return;var n=String(S.cf.prov||'').trim();if(!n||provNames().indexOf(n)>-1)return;var n0=S.cargas.length;
 setTimeout(function(){if(S.cargas.length>n0){provD(n);S.hist.push({t:fmtF(iso(TODAY))+' '+hhmm(),q:quien(),x:'Dio de alta al proveedor '+n});S.avPrecio.push(quien()+' registró un proveedor nuevo: '+n+' (completa sus datos)');render()}},30)},true);
var _cf54=cfForm;cfForm=function(){var h=_cf54.apply(this,arguments);return h.replace('</datalist></div>','</datalist></div><div class="lbl" style="margin:-2px 0 6px">¿Es nuevo? Escríbelo y se agrega al guardar.</div>')};
/* pedido por WhatsApp: solo lo que vende ese proveedor (el roatán se pide en kilos o cajas, se paga por kilo) */
/* provPideHTML: pasó a tema-viaje.js */
