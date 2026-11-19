/* ===================== v5 · Ruta sin trampas (cancelar con motivo, tickets, cambios con foto) ===================== */
/* cualquier foto que se toma: se vacía el campo después de leerla (si no, la ventana de "¿Confirmar?" fallaba al querer restaurarlo) */
document.addEventListener('change',function(e){var t=e.target;if(t&&t.type==='file')setTimeout(function(){try{t.value=''}catch(er){}},0)},true);
function fotoLeer(f,cb){var fr=new FileReader();fr.onload=function(){var im=new Image();im.onload=function(){var k=Math.min(1,FOTO_PX119/Math.max(im.width,im.height)),cv=document.createElement('canvas');cv.width=Math.round(im.width*k);cv.height=Math.round(im.height*k);cv.getContext('2d').drawImage(im,0,0,cv.width,cv.height);cb(cv.toDataURL('image/jpeg',FOTO_Q119))};im.src=fr.result};fr.readAsDataURL(f)}

/* ---- 1. Cancelar una entrega: el chofer puede, pero escribe por qué. Sale en su corte. ---- */
function cancL(){return S.cancels||(S.cancels=[])}
/* confMsg: pasó a tema-cierre.js */
document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act="cancelent"]');if(!b)return;var D=b.dataset,st=S.stops[+D.i];if(!st||st.logI==null)return;var l=S.log[st.logI],c=cl(st.c);
 if(!D.ok){e.stopImmediatePropagation();S._cmot=S._cmot||'';
  abrirModal('¿Por qué cancelas la entrega?','<b>'+esc(c.n)+'</b> · '+l.R+' cajas'+(l.M?', '+l.M+' kg':'')+' · '+money(l.total)+(l.pago+l.abono>0?'<br><span class="neg">Ya habías cobrado '+money(l.pago+l.abono)+'.</span>':'')+'<div class="lbl" style="margin-top:6px">Las cajas regresan a tu camión. Esto sale en tu corte y le llega al administrador.</div><div class="field" style="display:block;margin-top:8px"><label for="cmot" style="display:block;margin-bottom:4px">Escribe brevemente qué pasó</label><textarea id="cmot" data-bind="_cmot" rows="2" style="width:100%;box-sizing:border-box" placeholder="ej. me equivoqué de cliente">'+esc(S._cmot)+'</textarea></div>',[['Sí, cancelar la entrega','cancelent',' data-i="'+D.i+'" data-ok="1"']]);
  setTimeout(function(){var t=document.getElementById('cmot');if(t)t.focus()},80);return}
 var mt=(document.getElementById('cmot')||{}).value;mt=String(mt==null?S._cmot||'':mt).trim();
 if(mt.length<3){e.stopImmediatePropagation();window._faltaSel='#cmot';toast('Escribe por qué cancelas');render();return}
 S.modal=null;S._cmot='';cancL().push({c:c.id,n:c.n,R:l.R,M:l.M,total:l.total,cobro:r2(l.pago+l.abono),mot:mt,h:hhmm(),ch:+S.chofHoy,f:iso(TODAY)});
 setTimeout(function(){var k=S.avPrecio.length-1;if(k>=0&&/canceló la entrega de/.test(S.avPrecio[k]))S.avPrecio[k]+=' · motivo: '+mt+(l.pago+l.abono>0?' (ya había cobrado '+money(l.pago+l.abono)+')':'');render()},0)},true);
function cancelsHTML(adm){var L=cancL().filter(function(x){return x.ch===+S.chofHoy&&x.f===iso(TODAY)}),X=(S.cambios||[]).filter(function(x){return x.foto||adm});if(!L.length&&!(adm&&X.length))return '';
 var h=L.length?'<div class="card'+(adm?' alert':'')+'" data-key="cancels"><b>Entregas canceladas</b>'+L.map(function(x){return '<div style="border-top:1px solid var(--line);padding:6px 0"><div class="row" style="border:0;padding:0"><span>'+esc(x.n)+'<br><span class="lbl">'+x.h+' · '+x.R+' cajas'+(x.M?', '+x.M+' kg':'')+' regresaron al camión</span></span><b>'+money(x.total)+'</b></div>'+(x.cobro>0?'<div class="neg" style="font-size:13px;font-weight:700">Ya había cobrado '+money(x.cobro)+'</div>':'')+'<div style="font-size:14px">“'+esc(x.mot)+'”</div></div>'}).join('')+'</div>':'';
 if(adm&&X.length)h+='<details class="card" data-key="cambiosft"><summary><b>Cambios de fruta a clientes</b><span class="lbl">'+X.length+' · con foto</span></summary>'+X.map(function(x){var c=cl(x.c);return '<div style="border-top:1px solid var(--line);padding:6px 0"><div>'+esc(c?c.n:'')+' · '+x.R+' cajas'+(num(x.M)?', '+x.M+' kg':'')+'</div>'+(x.foto?'<img src="'+x.foto+'" alt="Fruta que se cambió" style="width:100%;max-height:200px;object-fit:cover;border-radius:10px;margin-top:4px">':'<div class="lbl neg">Sin foto</div>')+'</div>'}).join('')+'</details>';
 return h}
/* cierreAdm: pasó a tema-cierre.js */
/* cierre: pasó a tema-cierre.js */

/* ---- 3. Gastos y gasolina: con foto del ticket se descuentan; sin foto quedan "por revisar" ---- */
function gxRevL(){return S.gchRev||(S.gchRev=[])}
function gxRevPend(){return gxRevL().filter(function(x){return x.est==='pend'})}
document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act]');if(!b)return;var a=b.dataset.act;
 if(a==='gxsave'&&S.role==='rep'&&S.gx&&!S.gx.foto){var gm=num(S.gx.monto);if(gm<=0)return;e.stopImmediatePropagation();
  gxRevL().push({k:'gx',tipo:S.gx.tipo,m:gm,nota:S.gx.nota,h:hm(S.reloj),ch:+S.chofHoy,f:iso(TODAY),est:'pend'});
  S.avPrecio.push('URGENTE: '+chofN(S.chofHoy)+' registró un gasto SIN ticket: '+S.gx.tipo+' '+money(gm)+' (por revisar)');S.gx={tipo:S.gx.tipo,monto:'',nota:'',foto:null};
  toast('Guardado sin ticket: queda por revisar y no se descuenta hasta que el administrador lo acepte');return}
 if(a==='recargar'&&S.role==='rep'&&S.rc&&!S.rc.foto){var tp=rcTipo(),pp=rcPrecio(),lt=num(S.rc.litros),tt=S.rc.manual?num(S.rc.total):pp*lt;if(lt<=0||pp<=0||tt<=0)return;e.stopImmediatePropagation();
  gxRevL().push({k:'rc',tipo:tp,precio:pp,litros:lt,m:tt,h:hm(S.reloj),ch:+S.chofHoy,f:iso(TODAY),est:'pend'});
  S.avPrecio.push('URGENTE: '+chofN(S.chofHoy)+' cargó combustible SIN ticket: '+lt+' L por '+money(tt)+' (por revisar)');S.rc={tipo:S.rc.tipo,precio:'',litros:'',total:'',manual:false};
  toast('Guardado sin ticket: queda por revisar y no se descuenta hasta que el administrador lo acepte');return}
 if(a==='recargar'&&S.rc&&S.rc.foto){var ft=S.rc.foto,n0=S.recs.length;setTimeout(function(){if(S.recs.length>n0){S.recs[S.recs.length-1].foto=ft;S.rc.foto=null;render()}},0)}
 if(a==='gxrevok'||a==='gxrevno'){e.stopImmediatePropagation();var x=gxRevL()[+b.dataset.i];if(!x||x.est!=='pend')return;var qn=chofN(x.ch);
  if(a==='gxrevno'){x.est='no';toast('No aceptado: '+qn+' entrega ese dinero completo');S.hist.push({t:fmtF(iso(TODAY))+' '+hhmm(),q:quien(),x:'No aceptó gasto sin ticket de '+qn+': '+money(x.m)});render();return}
  x.est='ok';S.hist.push({t:fmtF(iso(TODAY))+' '+hhmm(),q:quien(),x:'Aceptó gasto sin ticket de '+qn+': '+money(x.m)});
  var mismoDia=x.f===iso(TODAY)&&+x.ch===+S.chofHoy&&!S.cierre.sent;
  if(mismoDia){if(x.k==='rc')S.recs.push({tipo:x.tipo,precio:x.precio,litros:x.litros,total:x.m,hora:x.h,sinTicket:1});else S.gch.push({tipo:x.tipo,m:x.m,nota:(x.nota?x.nota+' · ':'')+'sin ticket',foto:null,h:x.h});toast('Aceptado: se le descuenta de lo que entrega');render();return}
  /* el cierre ya se envió: si se le anotó faltante ese día, se le quita; si no, se le devuelve */
  var fa=S.faltantes.filter(function(f){return f.ch===+x.ch&&f.fecha===x.f&&f.pend&&f.m>0.005}).slice(-1)[0],q=x.m,quita=0;if(fa){quita=Math.min(fa.m,q);fa.m=r2(fa.m-quita);q=r2(q-quita)}
  S.gastos.push({t:x.k==='rc'?'Combustible de reparto':'Gasto de ruta',m:quita,n:qn+' · '+x.tipo+' (sin ticket, aceptado)',caja:false});if(q>0.005)S.gastos.push({t:x.k==='rc'?'Combustible de reparto':'Gasto de ruta',m:q,n:'Se le devolvió a '+qn+' · '+x.tipo+' (sin ticket)'});
  toast(q>0.005?'Aceptado: devuélvele '+money(q)+' a '+qn:'Aceptado: se le quitó '+money(quita)+' de su faltante');render();return}
},true);
/* foto del ticket en la gasolina */
document.addEventListener('change',function(e){var t=e.target;if(!t||!t.dataset||!t.dataset.rcf||!t.files||!t.files[0])return;fotoLeer(t.files[0],function(u){S.rc.foto=u;render()})},true);
/* recargaCard: pasó a tema-viaje.js */
/* gchCard: pasó a tema-piezas.js */
function gxRevChofer(k){var L=gxRevL().filter(function(x){return x.k===k&&x.ch===+S.chofHoy&&x.f===iso(TODAY)&&x.est!=='ok'});if(!L.length)return '';
 return '<div style="margin-top:8px">'+L.map(function(x){return '<div class="row"><span>'+esc(x.h)+' · '+esc(x.tipo)+(x.litros?' '+x.litros+' L':'')+'<br><span class="lbl '+(x.est==='no'?'neg':'')+'">'+(x.est==='no'?'No aceptado: entrega ese dinero':'Sin ticket · por revisar, no se descuenta')+'</span></span><b>'+money(x.m)+'</b></div>'}).join('')+'</div>'}
function gxRevHTML(enCierre){var L=[];gxRevL().forEach(function(x,i){if(x.est==='pend')L.push([x,i])});if(!L.length)return '';
 return '<div class="card alert" data-key="gxrev" style="padding:10px 12px;border-width:2px"><b class="neg">Gastos sin ticket por revisar</b><div class="lbl">Si los aceptas, se le descuentan a su efectivo (o se le quita del faltante si ya entregó).</div>'+L.map(function(y){var x=y[0];return '<div style="border-top:1px solid var(--line);padding:8px 0"><b>'+esc(chofN(x.ch))+'</b> · '+esc(x.tipo)+(x.litros?' '+x.litros+' L':'')+(x.nota?' · '+esc(x.nota):'')+' · <b>'+money(x.m)+'</b><div class="lbl">'+fmtF(x.f)+' '+esc(x.h)+'</div><div style="display:flex;gap:8px;margin-top:6px"><button class="btn sm" style="flex:1" data-act="gxrevok" data-i="'+y[1]+'">Aceptar</button><button class="btn sm sec" style="flex:1" data-act="gxrevno" data-i="'+y[1]+'">No aceptar</button></div></div>'}).join('')+'</div>'}
/* permsHTML: pasó a tema-fichas.js */
/* los litros sin ticket sí cuentan para el rendimiento */
/* recL: pasó a tema-piezas.js */

/* ---- 4. Cambio de fruta: foto obligatoria y aviso ---- */
/* cambioCard: pasó a tema-piezas.js */
document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act="cambio"]');if(!b||S.role!=='rep')return;var x=S.cbx;if(!x||(x.R<=0&&!(num(x.M)>0)))return;
 if(!x.foto){e.stopImmediatePropagation();S.dOpen.cambio=true;window._faltaSel='label[for="cbF"]';toast('Falta la foto de la fruta mala que te llevas');render();return}
 var c=curCli(),R=x.R,M=num(x.M);setTimeout(function(){S.avPrecio.push(chofN(S.chofHoy)+' cambió fruta en mal estado a '+(c?c.n:'un cliente')+': '+R+' cajas'+(M?', '+M+' kg':'')+' (con foto)');render()},0)},true);

/* ===================== v5 · El chofer ve su vehículo con el mismo estilo que el admin, con su placa ===================== */
(function(){var st=document.createElement('style');st.textContent='.vcard.vchof{cursor:default;margin-top:10px;width:100%;text-align:left}.vcard.vchof .plate.mini{width:118px;max-width:118px;display:block;margin:4px 0 2px;filter:drop-shadow(0 2px 4px rgba(0,0,0,.18))}';document.head.appendChild(st)})();
function vehChofHTML(v){return '<div class="vcard popin vchof'+(v.foto?' vbg':'')+'" data-id="'+v.id+'" style="display:flex;gap:12px;align-items:center">'+vehThumb(v,124,84)+'<span class="grow"><span class="lbl">Tu vehículo</span><br><b style="font-size:17px">'+esc(v.n)+'</b>'+plateSVG(v,true)+fuelBadge(v.comb)+'</span></div>'}
/* bienvHTML: pasó a tema-inicio.js */
