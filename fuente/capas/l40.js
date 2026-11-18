/* ===================== v6.2 · Cierre: efectivo que de verdad entrega (con billetes opcionales), corte en foto con QR,
   tómbola, pantalla de "después del cierre", permiso por chofer, apoyo entre choferes y pasar la ruta ===================== */
(function(){var st=document.createElement('style');st.textContent=[
 '.efbill{display:grid;grid-template-columns:1fr auto;gap:6px 10px;align-items:center;margin-top:8px}.efbill input{width:84px;text-align:center}',
 '.efdif{font-weight:800;font-size:18px;margin-top:8px}.efdif.ok{color:var(--accent)}.efdif.mal{color:var(--danger)}',
 '.poscierre .saludo{font-size:26px;font-weight:900;margin:6px 2px 2px}.poscierre .nada{font-size:20px;font-weight:800;color:var(--accent)}'].join('\n');document.head.appendChild(st)})();
var BILLETES=[1000,500,200,100,50,20];
function efBillTot(b){b=b||{};var t=0;BILLETES.forEach(function(d){t+=d*num(b['b'+d])});return r2(t+num(b.mon))}
function efEntrega(c){c=c||S.cierre;if(!c)return 0;if(c.bill&&c.billOn)return efBillTot(c.bill);return c.entrega===''||c.entrega==null?num((cierreRes()||{}).efectivo):Math.max(0,num(c.entrega))}
function tombolaHay(){return (S.bienes||[]).some(function(b){return b.est!=='Dado de baja'&&/t[oó]mbola/i.test((b.n||'')+' '+(b.tipo||''))})}
function efDifTxt(dif){return Math.abs(dif)<0.5?'<div class="efdif ok">✓ Cuadra</div>':'<div class="efdif mal">'+(dif<0?'Faltan ':'Sobran ')+money(Math.abs(dif))+'</div>'}
function efPasoHTML(){var c=S.cierre,r=cierreRes(),deb=num(r.efectivo),ent=efEntrega(c),dif=r2(ent-deb),b=c.bill||{};
 return '<div class="card" data-key="efpaso"><b style="font-size:18px">¿Cuánto entregas?</b><div class="lbl">Debes entregar <b>'+money(deb)+'</b>. Si entregas otra cantidad, escríbela.</div>'
  +(c.billOn?'':'<div class="field"><label for="efent">Entrego $</label><input id="efent" type="number" inputmode="decimal" data-ef="entrega" value="'+esc(c.entrega==null||c.entrega===''?String(deb):c.entrega)+'" style="width:130px"></div>')
  +'<details class="card" data-k="efbilld" style="margin-top:8px"'+(c.billOn?' open':'')+'><summary><b>Contar por billetes</b><span class="lbl">opcional · la app suma</span></summary><div class="efbill">'
  +BILLETES.map(function(d){return '<label for="efb'+d+'">Billetes de $'+d+'</label><input id="efb'+d+'" type="number" inputmode="numeric" min="0" data-ef="b'+d+'" value="'+esc(b['b'+d]||'')+'" placeholder="0">'}).join('')
  +'<label for="efmon">Monedas (total) $</label><input id="efmon" type="number" inputmode="decimal" min="0" data-ef="mon" value="'+esc(b.mon||'')+'" placeholder="0"></div><div class="row"><b>Total contado</b><b id="efbtot">'+money(efBillTot(b))+'</b></div></details>'
  +'<div id="efdif">'+efDifTxt(dif)+'</div>'
  +'<div id="efmotw"'+(Math.abs(dif)<0.5?' hidden':'')+'><div class="field"><label for="efmot">¿Por qué no cuadra?</label><input id="efmot" type="text" data-ef="motivo" value="'+esc(c.efMot||'')+'" placeholder="ej. me faltó cobrar a…" style="width:190px;text-align:left"></div><div class="lbl">Al administrador le llega aviso.</div></div>'
  +'<div class="field"><label for="efbol">Número de bolsa</label><input id="efbol" type="text" data-ef="bolsa" value="'+esc(c.bolsa||'')+'" placeholder="si usas bolsa" style="width:130px;text-align:left"></div>'
  +'<div class="lbl" style="margin-top:8px"><b>¿Qué haces con el dinero?</b></div><div class="chips" role="group" aria-label="Destino del dinero" style="margin-top:6px">'
  +(tombolaHay()?'<button data-act="efdest" data-v="tom" aria-pressed="'+(c.dest==='tom')+'">Meter a la tómbola</button>':'')+'<button data-act="efdest" data-v="adm" aria-pressed="'+(c.dest!=='tom')+'">Entregar al administrador</button></div>'
  +'<div class="lbl" style="margin-top:6px">El dinero va en la bolsa con su ticket del corte.</div></div>'}
/* se mete en el paso 5 del cierre */
/* cierrePasos: pasó a tema-cierre.js */
document.addEventListener('input',function(e){var t=e.target;if(!t||!t.dataset||!t.dataset.ef||!S.cierre)return;var c=S.cierre,k=t.dataset.ef;
 if(k==='entrega')c.entrega=t.value;else if(k==='motivo')c.efMot=t.value;else if(k==='bolsa')c.bolsa=t.value;else{c.bill=c.bill||{};c.bill[k]=t.value;c.billOn=BILLETES.some(function(d){return num(c.bill['b'+d])>0})||num(c.bill.mon)>0;var bt=document.getElementById('efbtot');if(bt)bt.textContent=money(efBillTot(c.bill))}
 var deb=num(cierreRes().efectivo),dif=r2(efEntrega(c)-deb),dd=document.getElementById('efdif'),mw=document.getElementById('efmotw');if(dd)dd.innerHTML=efDifTxt(dif);if(mw)mw.hidden=Math.abs(dif)<0.5},true);
document.addEventListener('change',function(e){var t=e.target;if(!t||!t.dataset||!t.dataset.ef||!S.cierre)return;if(/^b\d|^mon$/.test(t.dataset.ef)){var had=!!document.getElementById('efent');if(had===!!S.cierre.billOn)render()}},true);
document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act="efdest"]');if(!b||!S.cierre)return;e.stopImmediatePropagation();S.cierre.dest=b.dataset.v;render()},true);
/* no pasa al último paso si no cuadra y no dice por qué */
window.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act="cipaso"]');if(!b||!S.cierre||(S.cierreP||0)!==4||+b.dataset.v<5)return;var c=S.cierre,dif=r2(efEntrega(c)-num(cierreRes().efectivo));
 if(Math.abs(dif)>=0.5&&!String(c.efMot||'').trim()){e.stopImmediatePropagation();toast('Escribe por qué no cuadra');var i=document.getElementById('efmot');if(i)i.focus();return}},true);
/* resumen del último paso: lo que entrega */
/* cierrePasos: pasó a tema-cierre.js */
/* ---------- corte: datos, imagen con QR y código, impreso y por WhatsApp al negocio ---------- */
function corteDatos(){var c=S.cierre,r=c.res||cierreRes(),deb=num(r.efectivo),ent=efEntrega(c),may=(S.log||[]).filter(function(l){return l.may}).map(function(l){var k=cl(l.c);return {n:k?k.n:'',R:num(l.R),M:num(l.M),pr:num(l.pr),pm:num(l.pm)}});
 var tj=sum(S.log||[],function(l){return num(l.tarj)}),tr=sum(S.log||[],function(l){return num(l.trans)});
 var d={ch:chofN(S.chofHoy),f:iso(TODAY),h:S.ciEnvH||hhmm(),deb:deb,ent:ent,dif:r2(ent-deb),mot:c.efMot||'',bolsa:c.bolsa||'',dest:c.dest==='tom'?'tómbola':'administrador',bill:c.billOn?c.bill:null,may:may,vend:num(r.total),tarj:r2(tj),trans:r2(tr)};
 d.v=verifCodigo([d.ch,d.f,d.deb,d.ent,d.bolsa,JSON.stringify(d.bill||{}),d.may.length].join('|'));return d}
function corteItems(d){var it=[{t:'c',s:(S.cfg.nombre||'').toUpperCase(),b:1},{t:'c',s:'CORTE DEL CHOFER'},{t:'c',s:fmtF(d.f)+' · '+d.h},{t:'hr'},{t:'kv',k:'Chofer',v:d.ch},{t:'kv',k:'Vendió',v:money(d.vend)}];
 if(d.tarj)it.push({t:'kv',k:'Cobrado con tarjeta (no es efectivo)',v:money(d.tarj)});if(d.trans)it.push({t:'kv',k:'Transferencias (no es efectivo)',v:money(d.trans)});
 it.push({t:'kv',k:'Debía entregar',v:money(d.deb)},{t:'kv',k:'Entrega',v:money(d.ent),b:1});
 if(Math.abs(d.dif)>=0.5)it.push({t:'kv',k:d.dif<0?'Faltante':'Sobrante',v:money(Math.abs(d.dif)),b:1,c:'neg'},{t:'kv',k:'Motivo',v:d.mot});
 if(d.bill){it.push({t:'hr'});BILLETES.forEach(function(x){var n=num(d.bill['b'+x]);if(n)it.push({t:'kv',k:n+' × $'+x,v:money(n*x)})});if(num(d.bill.mon))it.push({t:'kv',k:'Monedas',v:money(num(d.bill.mon))})}
 if(d.may.length)it.push({t:'hr'},{t:'kv',k:'Ventas a mayoreo',v:d.may.length+' cliente'+(d.may.length>1?'s':'')});
 it.push({t:'hr'},{t:'kv',k:'Dinero',v:'a la '+(d.dest==='tómbola'?'tómbola':'mano del administrador')});if(d.bolsa)it.push({t:'kv',k:'Bolsa No.',v:d.bolsa,b:1});it.push({t:'kv',k:'Código de verificación',v:d.v,b:1});return it}
function corteQR(d){return 'RF-CORTE|'+JSON.stringify({ch:d.ch,f:d.f,h:d.h,deb:d.deb,ent:d.ent,b:d.bill,bo:d.bolsa,may:d.may,v:d.v})}
function corteImg(d){var it=corteItems(d),W=460,Q=260,H=110+it.length*28+Q+40,cv=document.createElement('canvas');cv.width=W;cv.height=H;var cx=cv.getContext('2d');cx.fillStyle='#fff';cx.fillRect(0,0,W,H);
 try{if(LOGO_IMG.complete)cx.drawImage(LOGO_IMG,W/2-40,8,80,80)}catch(e){}var y=110;cx.fillStyle='#111';
 it.forEach(function(x){cx.font=(x.b?'bold ':'')+'15px monospace';if(x.t==='hr')cx.fillRect(20,y-12,W-40,1);else if(x.t==='c'){cx.textAlign='center';cx.font=(x.b?'bold 19px':'15px')+' monospace';cx.fillText(x.s,W/2,y)}else{cx.fillStyle=x.c==='neg'?'#B3261E':'#111';cx.textAlign='left';cx.fillText(x.k,20,y);cx.textAlign='right';cx.fillText(x.v,W-20,y);cx.fillStyle='#111'}y+=28});
 try{QR.canvas(cx,corteQR(d),(W-Q)/2,y,Q,false)}catch(e){}cx.textAlign='center';cx.font='13px monospace';cx.fillText('Escanéalo para registrar este corte',W/2,y+Q+18);return cv.toDataURL('image/png')}
/* al enviar el cierre: guarda el corte, avisa si no cuadra, imprime y manda la foto al WhatsApp del negocio */
document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act="enviar"]');if(!b||S.role!=='rep')return;var c=S.cierre;if(!c||c.sent)return;
 setTimeout(function(){if(!c.sent)return;try{var d=corteDatos();c.corte=d;c.entregaF=d.ent;
  if(Math.abs(d.dif)>=0.5)S.avPrecio.push((d.dif<0?'URGENTE: ':'')+d.ch+' entrega '+money(d.ent)+' y debía '+money(d.deb)+' ('+(d.dif<0?'faltan ':'sobran ')+money(Math.abs(d.dif))+'): '+d.mot);
  if(d.dest==='tómbola')S.avPrecio.push(d.ch+' metió '+money(d.ent)+' a la tómbola'+(d.bolsa?' (bolsa '+d.bolsa+')':''));
  if(imprOk())imprimirItems(corteItems(d),corteQR(d)).catch(function(){toast('No se pudo imprimir el corte')});
  var img=corteImg(d);c.corteImg=null;S.corteUlt=img;
  if(S.cfg.tel)natCompartir(img,'corte-'+d.f+'.png',{tel:S.cfg.tel}).then(function(ok){if(!ok)toast('Manda la foto del corte al WhatsApp del negocio desde la pantalla de tu ruta')});else toast('Falta el WhatsApp del negocio en Ajustes para mandar el corte')}catch(er){console.error(er)}},60)},true);
/* ---------- pantalla después del cierre ---------- */
function saludoHora(){var h=new Date().getHours();return h<12?'Buenos días':(h<19?'Buenas tardes':'Buenas noches')}
function chPideSeguir(id){var c=(S.choferes||[]).filter(function(x){return x.id===+id})[0];return !!(c&&c.segPerm)}
/* ruta: pasó a tema-ruta.js */
document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act="corteotra"],[data-act="listohoy"]');if(!b)return;e.stopImmediatePropagation();
 if(b.dataset.act==='corteotra'){natCompartir(S.corteUlt,'corte.png',{tel:S.cfg.tel||''});return}
 toast('¡Hasta mañana!');S.pinOk={};try{pinEntrar()}catch(er){}render()},true);
/* después de enviar el cierre no pide el PIN otra vez (ya está adentro) */
document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act="enviar"]');if(!b||S.role!=='rep')return;setTimeout(function(){if(S.cierre&&S.cierre.sent){_pinAct=Date.now();if(_pin&&_pin.modo==='entrar'&&S.pinOk[pinKey()]!==false){_pin={v:'',modo:null};S.pinOk[pinKey()]=true;render()}}},120)},true);
/* ---------- permiso para seguir: por chofer (nuevo = sin permiso, se reabre solo) ---------- */
window.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act="seguir"]');if(!b||S.role!=='rep'||_seguirOk||chPideSeguir(S.chofHoy))return;
 _seguirOk=true;var k=b.dataset.k||'carga';setTimeout(function(){_seguirOk=false;S.cierreP=0;S.cx={R:'',M:'',foto:null,k:k};S.avPrecio.push(chofN(S.chofHoy)+' reabrió su ruta para '+(k==='carga'?'cargar más':'dar otra vuelta'));render()},0)},true);
/* fiEmp: pasó a tema-fichas.js */
document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act="segperm"]');if(!b)return;e.stopImmediatePropagation();var ch=S.choferes.filter(function(x){return x.id===+b.dataset.id})[0];if(ch){ch.segPerm=b.dataset.v==='1';toast(ch.segPerm?ch.n+' te pedirá permiso':ch.n+' puede seguir solo')}render()},true);
/* ---------- apoyo entre choferes (solo por hoy) y pasar la ruta ---------- */
function stopsDe(id){return nbRGet(id,'stops')||[]}
function pendDe(id){return stopsDe(id).filter(function(s){return !s.done})}
function cajasDe(id){return num(nbRGet(id,'invR'))}
function apoyoSugiere(de,a,cajas){var yo=cl((stopsDe(de).filter(function(s){return s.done}).slice(-1)[0]||{}).c),L=pendDe(a).map(function(s){var c=cl(s.c);return {s:s,c:c,d:yo&&c?kmE(yo,c):null}}).filter(function(x){return x.c});
 L.sort(function(x,y){return (x.d==null?1e9:x.d)-(y.d==null?1e9:y.d)});var out=[],tot=0;L.forEach(function(x){var q=num(x.c.qR||x.c.ped||3);if(cajas&&tot+q>cajas&&out.length)return;tot+=q;out.push(x.s.c)});return out}
function apoyoPasa(de,a,ids,quien){ids=ids.map(Number);var A=stopsDe(a).filter(function(s){return ids.indexOf(+s.c)<0||s.done}),D=stopsDe(de).concat(ids.map(function(c){return {c:c,apoyo:+a}}));nbRSet(a,'stops',A);nbRSet(de,'stops',D);
 if(nbRGet(de,'cierre')&&nbRGet(de,'cierre').sent&&+de===+S.chofHoy){/* se le reabre para esos clientes */var bt=document.createElement('button');bt.dataset.act='seguir';bt.dataset.k='vuelta';_seguirOk=true;bt.style.display='none';document.body.appendChild(bt);try{bt.click()}finally{bt.remove();_seguirOk=false}}
 S.avPrecio.push(chofN(de)+' apoya hoy a '+chofN(a)+' con '+ids.length+' cliente'+(ids.length>1?'s':'')+' ('+quien+')');S.hist.push({t:fmtF(iso(TODAY))+' '+hhmm(),q:quien,x:'Pasó '+ids.length+' clientes de '+chofN(a)+' a '+chofN(de)+' (solo hoy)'})}
function apoyoMioHTML(){var A=(S.apoyos||[]).filter(function(x){return x.f===iso(TODAY)&&x.de===+S.chofHoy&&x.est==='ofrece'});return A.length?'<div class="card note"><b>Ofreciste apoyo</b><div class="lbl">Cuando otro chofer acepte, te llegan sus clientes aquí.</div></div>':''}
function apoyoParaMiHTML(){if(S.role!=='rep')return '';var A=(S.apoyos||[]).filter(function(x){return x.f===iso(TODAY)&&x.est==='ofrece'&&x.de!==+S.chofHoy});if(!A.length||!pendDe(S.chofHoy).length)return '';
 return A.map(function(x){var sug=apoyoSugiere(x.de,S.chofHoy,x.cajas);return '<div class="card note" data-key="apoyo'+x.id+'"><b>'+esc(chofN(x.de))+' puede apoyarte</b><div class="lbl">Trae '+num(x.cajas)+' cajas. Te sugiero pasarle '+sug.length+' cliente'+(sug.length>1?'s':'')+': '+sug.map(function(c){return esc((cl(c)||{}).n||'')}).join(', ')+'. Solo por hoy.</div><div style="display:flex;gap:8px;margin-top:8px"><button class="btn" style="flex:2" data-act="apoyosi" data-id="'+x.id+'">Sí, pásaselos</button><button class="btn sec" style="flex:1" data-act="apoyono" data-id="'+x.id+'">No</button></div></div>'}).join('')}
/* ruta: pasó a tema-ruta.js */
/* admin: pasar la ruta de un chofer a otro (o solo algunos clientes) */
function pasaRutaHTML(){var x=S.pasaR;if(!x)return '';var ids=nbRutaIds().filter(function(i){var c=S.choferes.filter(function(k){return k.id===i})[0];return c&&!c.baja});var L=pendDe(x.de);
 return '<div id="bjov" role="dialog" aria-label="Pasar la ruta"><div class="w"><div style="display:flex;align-items:center;gap:10px"><span class="grow"><b style="font-size:20px">Pasar la ruta de '+esc(chofN(x.de))+'</b><div class="lbl">Solo por hoy. Mañana regresan a su chofer.</div></span><button class="helpb" style="margin:0" data-act="pasarx" aria-label="Cerrar">×</button></div>'
  +'<div class="card"><b>¿A quién?</b><div class="chips" style="margin-top:6px">'+ids.filter(function(i){return i!==x.de}).map(function(i){return '<button data-act="pasaa" data-id="'+i+'" aria-pressed="'+(x.a===i)+'">'+esc(chofN(i))+'</button>'}).join('')+'</div></div>'
  +'<div class="card"><b>Clientes pendientes ('+L.length+')</b>'+L.map(function(s){var c=cl(s.c)||{n:''};return '<label class="row" style="cursor:pointer"><span>'+esc(c.n)+'</span><input type="checkbox" data-pasac="'+s.c+'"'+(x.sel[s.c]!==false?' checked':'')+'></label>'}).join('')+'</div>'
  +'<button class="btn" style="margin-top:12px" data-act="pasasi">Pasar'+(x.a?' a '+esc(chofN(x.a)):'')+'</button></div></div>'}
/* setupHTML: pasó a tema-ajustes.js */
/* fiEmp: pasó a tema-fichas.js */
document.addEventListener('change',function(e){var t=e.target;if(t&&t.dataset&&t.dataset.pasac&&S.pasaR)S.pasaR.sel[t.dataset.pasac]=t.checked},true);
document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act]');if(!b)return;var a=b.dataset.act;
 if(a==='apoyoofrece'){e.stopImmediatePropagation();S.apoyos=(S.apoyos||[]).filter(function(x){return x.f===iso(TODAY)});S.apoyos.push({id:Date.now(),de:+S.chofHoy,f:iso(TODAY),cajas:num(S.inv.reparto),est:'ofrece'});S.avPrecio.push(chofN(S.chofHoy)+' terminó y puede apoyar a otro chofer (trae '+num(S.inv.reparto)+' cajas)');toast('Listo: a los demás choferes les sale que puedes apoyar');render();return}
 if(a==='apoyosi'||a==='apoyono'){e.stopImmediatePropagation();var x=(S.apoyos||[]).filter(function(k){return k.id===+b.dataset.id})[0];if(!x)return;if(a==='apoyono'){x.est='no:'+S.chofHoy;render();return}
  var ids=apoyoSugiere(x.de,S.chofHoy,x.cajas);x.est='hecho';x.a=+S.chofHoy;apoyoPasa(x.de,S.chofHoy,ids,chofN(S.chofHoy));toast('Listo: '+chofN(x.de)+' entrega '+ids.length+' de tus clientes hoy');render();return}
 if(a==='pasar'){e.stopImmediatePropagation();var de=+b.dataset.id,sel={};pendDe(de).forEach(function(s){sel[s.c]=true});S.pasaR={de:de,a:null,sel:sel};render();return}
 if(a==='pasarx'){e.stopImmediatePropagation();S.pasaR=null;render();return}
 if(a==='pasaa'){e.stopImmediatePropagation();S.pasaR.a=+b.dataset.id;render();return}
 if(a==='pasasi'){e.stopImmediatePropagation();var p=S.pasaR;if(!p.a){toast('Escoge a quién se la pasas');return}var ids2=Object.keys(p.sel).filter(function(k){return p.sel[k]});if(!ids2.length){toast('Escoge al menos un cliente');return}
  apoyoPasa(p.a,p.de,ids2,quien());toast('Listo: '+chofN(p.a)+' entrega hoy '+ids2.length+' clientes de '+chofN(p.de));S.pasaR=null;render();return}},true);
['apoyos'].forEach(function(k){if(NB_SH.indexOf(k)<0)NB_SH.push(k)});
