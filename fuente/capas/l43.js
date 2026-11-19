/* ===================== v6.2 · Tutorial sin parpadeo, tutorial por días y "Aprende la app", pantallas grandes,
   vehículos (placa fija y "Ya se hizo"), encargos con lugar, combustible en tarjeta ===================== */
(function(){var st=document.createElement('style');st.textContent=[
 /* tutorial: nada se mueve ni parpadea; la barra de secciones siempre a la vista */
 '#tutov,#tutov .hole,#tutov .bub{transition:none!important;animation:none!important}#tutov .hand{transition:none!important}',
 'html.tuton nav.tabs{transform:none!important;visibility:visible!important;opacity:1!important}html.tuton.navhid nav.tabs{transform:none!important}',
 '#tutov .hole.sinhueco{opacity:0}',
 /* pantallas grandes (tableta o celular acostado): dos columnas */
 '@media (min-width:900px){html:not(.onecol) main{column-count:2;column-gap:16px}html:not(.onecol) main>*{break-inside:avoid}html:not(.onecol) main>h1,html:not(.onecol) main>.wz-hd,html:not(.onecol) main>.entbar,html:not(.onecol) main>.foot{column-span:all}}',
 '.aprende .it{display:flex;align-items:center;gap:10px;width:100%;text-align:left;background:none;border:0;border-top:1px solid var(--line);padding:9px 0;color:inherit;font-size:16px}.aprende .ck{width:26px;height:26px;border-radius:50%;border:2px solid var(--line);display:flex;align-items:center;justify-content:center;flex:none;font-weight:800}.aprende .it.ok .ck{background:var(--accent);border-color:var(--accent);color:#fff}.aprende .it.ok .t{color:var(--muted);text-decoration:line-through}'].join('\n');document.head.appendChild(st)})();
/* ---------- tutorial: se acomoda UNA vez por paso; en cada redibujo se reusa lo mismo (sin parpadeo) ---------- */
function tutClave(){var t=S.tut;return t?t.k+':'+t.i:''}
/* tutHTML: pasó a tema-guia.js */
/* el globo se pinta aparte y solo cambia cuando cambia el paso: los redibujos de la app ya no lo tocan */
function tutPinta(){var de=document.documentElement,on=!!S.tut&&!(_pin&&_pin.modo)&&!document.getElementById('setov')&&!document.getElementById('nbov');de.classList.toggle('tuton',on);var o=document.getElementById('tutov');
 if(!on){if(o)o.remove();return}de.classList.remove('navhid');try{navHid=false}catch(e){}
 var k=tutClave();if(o&&o.dataset.k===k&&o.parentNode===document.body)return;if(o)o.remove();
 var h=tutHTML(false);if(!h)return;var w=document.createElement('div');w.innerHTML=h;var n=w.firstElementChild;n.dataset.k=k;document.body.appendChild(n);setTimeout(function(){tutReacomoda(false)},380)}
tutTab=function(){var t=S.tut;if(!t)return null;if(t.tab)return t.tab;return (t.k==='rep'||/^d:rep/.test(t.k))?'ruta':'inicio'};
var _r43t=render;render=function(){var t=S.tut,r;if(t&&S.role&&S.tab&&S.tab[S.role]!==tutTab())S.tab[S.role]=tutTab();window.__tutAct=t;S.tut=null;try{r=_r43t.apply(this,arguments)}finally{S.tut=t;window.__tutAct=null}try{tutPinta()}catch(e){console.error(e)}return r};
/* mientras está el tutorial, lo de atrás no responde (solo el tutorial) */
window.addEventListener('click',function(e){if(!S.tut)return;var o=document.getElementById('tutov');if(!o||o.contains(e.target))return;if(e.target.closest&&e.target.closest('#pinov,#nbov'))return;e.stopImmediatePropagation();e.preventDefault()},true);
/* pasos del chofer: Gasto apunta al botón de verdad; Deslizar, al centro de la pantalla */
TUT.rep=[['[data-act="iniciar"], [data-act="insprep"], .card.next, [data-act="calle"], main .card','Empieza tu día','Revisa el vehículo, toma las fotos y empieza la ruta. Después aquí sale tu siguiente parada.'],['nav.tabs button[data-t="entrega"]','Entrega','Aquí capturas lo que le dejas al cliente y lo que te paga.'],['[data-act="gxsheet"]','Gastos','Comida, caseta, ponchadura o combustible: regístralo con el botón Gasto de tu ruta. Se descuenta de lo que entregas.'],['nav.tabs button[data-t="cierre"]','Cierre','Al terminar, haz tu cierre y entrega el efectivo.'],['main','Deslizar','Desliza el dedo a los lados sobre la pantalla para cambiar de sección.','swipe']];
/* ---------- tutorial por días ---------- */
var TUT_DIAS={rep:[null,
 [['[data-act="mode"][data-m="parte"], nav.tabs button[data-t="entrega"]','Fiar y abonos','En la entrega, "Pagó una parte" o "A crédito" deja anotado lo que debe. Si te da para su deuda anterior, ponlo en "Abona a deuda anterior".'],['[data-act="noestaba"], nav.tabs button[data-t="entrega"]','No estaba','Si el cliente no está o no puede recibir, toca "No estaba" y escoge el motivo. Pasa a la ruta de mañana.']],
 [['nav.tabs button[data-t="entrega"]','Pago con tarjeta','En "¿Cómo pagó?" escoge Tarjeta: la app te dice cuánto cobrar en la terminal. Ese dinero va al banco, no lo entregas.'],['nav.tabs button[data-t="entrega"]','Ticket','Si queda a deber o abona, la app le manda su ticket por WhatsApp directo al cliente.']],
 [['[data-act="gxsheet"]','Gastos','Registra cada gasto con foto del ticket. Sin ticket, el administrador lo revisa.'],['[data-act="qrscan"]','QR de clientes','Si el negocio tiene su QR pegado, escanéalo para abrir su entrega rápido.']],
 [['nav.tabs button[data-t="cierre"]','Cierre por pasos','Odómetro, gasolina, fotos, cajas, efectivo y enviar. Un paso a la vez.'],['nav.tabs button[data-t="cierre"]','Cuenta por billetes','En el paso Efectivo puedes contar por billetes y la app suma. El corte se manda como foto al WhatsApp del negocio.']]],
 admin:[null,
 [['main .card','Cierres de los choferes','Cuando un chofer manda su cierre, aquí te sale para recibir su efectivo. Cuéntalo sin ver cuánto debía.'],['[data-act="reabsi"], main .card','Seguir trabajando','Si un chofer pide cargar más u otra vuelta, lo autorizas aquí (o en su ficha le das permiso de seguir solo).']],
 [['nav.tabs button[data-t="clientes"]','Cobranza','En Clientes ves quién debe y desde cuándo. Con un toque le mandas un recordatorio amable por WhatsApp.']],
 [['nav.tabs button[data-t="cargas"]','Viajes y simulador','En Cargas programas viajes. Con el Simulador ves cuánto te cuesta cada caja y cuánto deja el viaje antes de hacerlo.']],
 [['nav.tabs button[data-t="estadisticas"], nav.tabs','Estadísticas','Aquí ves ventas, ganancia y cómo va cada chofer y cada cliente.']],
 [['nav.tabs button[data-t="personal"]','Encargado y vacaciones','En Personal pones a un encargado cuando no estés; en vacaciones solo te llegan los avisos urgentes.']],
 [['main','Resumen y respaldo','En Inicio te mandas el resumen del día por WhatsApp. En Ajustes → Respaldo bajas una copia y el Excel.']]]};
(function(){Object.keys(TUT_DIAS).forEach(function(r){TUT_DIAS[r].forEach(function(L,i){if(L)TUT['d:'+r+':'+(i+1)]=L})})})();
function tutDiaNum(r){S.tutD=S.tutD||{};var L=S.tutD[r]=S.tutD[r]||[],h=iso(TODAY);if(L.indexOf(h)<0)L.push(h);return L.length}
var _r43d=render;render=function(){var r=_r43d.apply(this,arguments);try{if(!window.__pnTest&&REAL&&!S.tut&&!window.__tutAct&&!(_pin&&_pin.modo)&&!S.tutDiasOff&&!document.getElementById('nbov')&&!document.getElementById('setov')&&(S.role==='rep'||S.role==='admin')){var rr=S.role==='rep'?'rep':'admin';
 if(S.tutVisto&&S.tutVisto[rr]){var n=tutDiaNum(rr),k='d:'+rr+':'+n;if(TUT[k]&&!S.tutVisto[k]&&(S.role!=='rep'||(S.salida&&S.salida.ok))){S.tutVisto[k]=true;setTimeout(function(){if(S.tut)return;S.tut={k:k,i:0,prev:{tab:S.tab[S.role]},tab:S.tab[S.role]};render()},900)}}}}catch(e){}return r};
/* ---------- "Aprende la app": se palomea solo al hacerlo de verdad ---------- */
function logsTodos(){var L=[].concat(S.log||[]);(S.rutasHist||[]).forEach(function(r){L=L.concat(r.log||[])});return L}
function aprendeItems(){var L=logsTodos();if(S.role==='rep')return [
 ['Entregar a un cliente','entrega',L.length>0],['Fiar o recibir un abono','entrega',L.some(function(l){return num(l.total)>num(l.pago)+0.5||num(l.abono)>0})],['Marcar "No estaba"','entrega',(S.novs||[]).length>0],
 ['Cobrar con tarjeta','entrega',L.some(function(l){return num(l.tarj)>0})],['Registrar un gasto','ruta',(S.gch||[]).length>0],['Hacer tu cierre','cierre',!!(S.cierre&&S.cierre.sent)||(S.rutasHist||[]).some(function(r){return r.enviado})],['Contar por billetes','cierre',!!(S.cierre&&S.cierre.billOn)]];
 return [['Fijar el precio de hoy','inicio',(S.precio.hist||[]).length>0],['Recibir el efectivo de un chofer','inicio',!!S.cierreReg||(S.cierresPrev||[]).length>0],['Mandarte el resumen del día','inicio',!!S.resYa],['Programar un viaje','cargas',(S.cargas||[]).some(function(c){return c.prog})],['Usar el simulador de viaje','cargas',!!S.simYa],['Agregar un cliente','clientes',(S.cli||[]).some(function(c){return !c.oculto&&!c.rapida})],['Bajar un respaldo','inicio',!!S.respUlt]]}
function aprendeHTML(){if(S.aprendeOff||!REAL||(S.role!=='rep'&&(S.role!=='admin'||S.encOn)))return '';var L=aprendeItems(),n=L.filter(function(x){return x[2]}).length;if(n===L.length)return '';
 return '<details class="card aprende" data-k="aprende"'+(S.dOpen.aprende?' open':'')+'><summary><b>Aprende la app</b><span class="lbl">'+n+' de '+L.length+'</span></summary>'+L.map(function(x){return '<button class="it'+(x[2]?' ok':'')+'" data-act="aprendeir" data-t="'+x[1]+'"><span class="ck">'+(x[2]?'✓':'')+'</span><span class="t grow">'+x[0]+'</span><span class="lbl">›</span></button>'}).join('')+'<button class="link" style="margin-top:4px" data-act="aprendeoff">Ya no mostrar</button></details>'}
/* inicio: pasó a tema-inicio.js */
/* ruta: pasó a tema-ruta.js */
document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act="aprendeir"],[data-act="aprendeoff"],[data-act="resdia"],[data-act="ressem"],[data-act="simabre"]');if(!b)return;var a=b.dataset.act;
 if(a==='resdia'||a==='ressem'){S.resYa=true;return}if(a==='simabre'){S.simYa=true;return}
 e.stopImmediatePropagation();if(a==='aprendeoff'){S.aprendeOff=true;render();return}S.tab[S.role]=b.dataset.t;render();window.scrollTo(0,0)},true);
/* Ajustes: tutorial por días */
/* ajHTML: pasó a tema-ajustes.js */
document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act="tutdias"],[data-act="aprendeon"]');if(!b)return;e.stopImmediatePropagation();if(b.dataset.act==='tutdias')S.tutDiasOff=!S.tutDiasOff;else S.aprendeOff=false;render()},true);
/* ---------- combustible del vehículo dentro de su tarjeta ---------- */
/* fuelVeh: pasó a tema-vehiculos.js */
/* ---------- vehículos: la placa no se cambia en Papeles (solo en "Editar datos"); "Ya se hizo" en cada papel ---------- */
var VDOC=[['segVence','Seguro',12,'Seguro'],['tcVence','Tarjeta de circulación / tenencia',12,'Tenencia y placas'],['verVence','Verificación',6,'Verificación']];
function vYaHTML(v){var x=S.vya;if(!x||x.vid!==v.id)return '';var d=VDOC.filter(function(z){return z[0]===x.k})[0];
 return '<div class="card" style="border:2px solid var(--accent)"><b>'+esc(d[1])+': ya se hizo</b><div class="field"><label for="vyaf">¿Cuándo?</label><input id="vyaf" type="date" data-bind="vya.f" value="'+esc(x.f)+'"></div><div class="field"><label for="vyac">¿Cuánto costó? $</label><input id="vyac" type="number" inputmode="decimal" data-bind="vya.c" value="'+esc(x.c)+'"></div><div class="field"><label for="vyav">¿Hasta cuándo vale?</label><input id="vyav" type="date" data-bind="vya.v" value="'+esc(x.v)+'"></div>'
  +'<div class="field"><label for="vyaq">¿Quién lo llevó?</label><input id="vyaq" type="text" data-bind="vya.q" value="'+esc(x.q||'')+'" style="width:160px;text-align:left"></div><label class="btn sm sec" for="vyafo" style="display:inline-flex;align-items:center;cursor:pointer;margin-top:6px">'+(x.foto?'✓ Foto del comprobante':'📷 Foto del comprobante')+'</label><input id="vyafo" type="file" accept="image/*" capture="environment" data-vyafoto="1" style="position:absolute;opacity:0;width:1px;height:1px;pointer-events:none">'
  +'<div style="display:flex;gap:8px;margin-top:10px"><button class="btn" style="flex:2" data-act="vyasi">Guardar</button><button class="btn sec" style="flex:1" data-act="vyano">Cancelar</button></div><div class="lbl">Se registra el gasto y se actualiza el próximo vencimiento.</div></div>'}
function sumaMeses(f,m){var d=new Date(f+'T12:00:00');d.setMonth(d.getMonth()+m);return iso(d)}
/* fiVeh: pasó a tema-vehiculos.js */
document.addEventListener('change',function(e){var t=e.target;if(!t||!t.dataset||!t.dataset.vyafoto||!S.vya)return;var f=t.files&&t.files[0];if(!f)return;var fr=new FileReader();fr.onload=function(){var im=new Image();im.onload=function(){var r=Math.min(1,FOTO_PX119/Math.max(im.width,im.height)),cv=document.createElement('canvas');cv.width=Math.round(im.width*r);cv.height=Math.round(im.height*r);cv.getContext('2d').drawImage(im,0,0,cv.width,cv.height);S.vya.foto=cv.toDataURL('image/jpeg',FOTO_Q119);render()};im.src=fr.result};fr.readAsDataURL(f)},true);
document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act]');if(!b)return;var a=b.dataset.act;
 if(a==='vya'){e.stopImmediatePropagation();var d=VDOC.filter(function(z){return z[0]===b.dataset.k})[0];S.vya={vid:+b.dataset.id,k:b.dataset.k,f:iso(TODAY),c:'',v:sumaMeses(iso(TODAY),d[2]),q:'',foto:null};render();return}
 if(a==='vyano'){e.stopImmediatePropagation();S.vya=null;render();return}
 if(a==='vyasi'){e.stopImmediatePropagation();var x=S.vya,v=vehById(x.vid),d2=VDOC.filter(function(z){return z[0]===x.k})[0];if(!x.f||!x.v){toast('Pon la fecha y hasta cuándo vale');return}
  v[x.k]=x.v;if(x.k==='verVence')v.verUlt=x.f;if(x.foto){if(x.k==='verVence')v.fotoVer=x.foto;if(x.k==='segVence')v.fotoPol=x.foto;if(x.k==='tcVence')v.fotoTc=x.foto}
  var co=num(x.c);if(co>0)S.gastos.push({t:d2[3],m:co,n:v.n+(x.q?' · llevó '+x.q:''),pago:'Efectivo de caja',caja:true,foto:x.foto,f:x.f,h:hhmm(),q:quien(),veh:v.id});
  v.bit=v.bit||[];v.bit.push({tipo:d2[3],fecha:x.f,costo:co,nota:d2[3]+(x.q?' · '+x.q:''),desc:false,seg:false,vence:x.v,km:''});
  encList().forEach(function(z){if(z.vid===v.id&&z.est==='pend'&&(z.tipo===d2[3]||(d2[3]==='Verificación'&&z.tipo==='Verificación'))){z.est='hecho';z.hecho=x.f}});
  S.vya=null;toast(d2[3]+' registrada · vence '+fmtF(x.v));render();return}},true);
/* ---------- encargos: a dónde ir (lugar guardado o link de Maps) y el lugar se guarda ---------- */
['lugares'].forEach(function(k){if(NB_SH.indexOf(k)<0)NB_SH.push(k)});
function lugaresL(){return S.lugares=S.lugares||[]}
/* encVehHTML: pasó a tema-vehiculos.js */
document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act="enclug"]');if(!b||!S.encF)return;e.stopImmediatePropagation();S.encF.lug=+b.dataset.i;render()},true);
window.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act="encsave"]');if(!b||!S.encF)return;var f=S.encF,n0=encList().length;setTimeout(function(){var L=encList();if(L.length<=n0)return;var x=L[L.length-1];
 if(f.lug!=null&&f.lug>=0){var l=lugaresL()[f.lug];if(l)x.lugar={n:l.n,lat:l.lat,lng:l.lng}}else if(f.link){var u=typeof ubParse==='function'?ubParse(f.link):null;x.lugar=u?{n:'Lugar del link',lat:u.lat,lng:u.lng}:{n:'',link:f.link}}},20)},true);
/* encRutaHTML: pasó a tema-piezas.js */
window.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act="encok"]');if(!b||!S.encR)return;var r=S.encR,n=String(r.donde||'').trim();if(!n)return;var L=lugaresL(),ya=L.filter(function(l){return l.n.toLowerCase()===n.toLowerCase()})[0];
 var x2=encList().filter(function(y){return y.id===r.id})[0];var pon=function(la,ln){if(!ya){ya={n:n,lat:la,lng:ln,tipo:x2?x2.tipo:''};L.push(ya)}else if(la!=null&&ya.lat==null){ya.lat=la;ya.lng=ln}if(x2)x2.lugar={n:ya.n,lat:ya.lat,lng:ya.lng}};
 if(navigator.geolocation&&!window.__pnTest)navigator.geolocation.getCurrentPosition(function(p){pon(+p.coords.latitude.toFixed(6),+p.coords.longitude.toFixed(6));render()},function(){pon(null,null)},{enableHighAccuracy:true,timeout:15000});else pon(null,null)},true);
