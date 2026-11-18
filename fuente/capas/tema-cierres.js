/* ===================== TEMA · Cierres: varios en el mismo día, sin borrar nada (nació como tema, 18 nov · punto 120) =====================
   Ricardo hizo dos cierres el mismo día y el primero desapareció de Estadísticas e Ingresos. Era grave:
   - "Empezar otro cierre" (botón "seguir" con el cierre ya recibido) vaciaba las entregas del cierre anterior SIN guardarlas.
   - Estadísticas guardaba UNA ruta por chofer por día.
   - "Efectivo en caja" solo contaba el cierre recibido del chofer seleccionado y, al cambiar de día, ese efectivo dejaba de contar.
   Ahora:
   - Cada cierre (1, 2, 3, 4…) se guarda completo en el historial (rutasHist con parcial120 y n) antes de empezar el siguiente.
   - rutasDia82 regresa TODOS los cierres del día (los guardados + la ruta abierta), sin repetir.
   - cierresCaja cuenta TODO el efectivo recibido: los cierres anteriores, los de todas las rutas abiertas y los de días pasados.
   - "📋 Historial de cierres": cada cierre por día, chofer y número, con su corte y sus entregas.
   - Los cierres que se habían perdido (quedó su resumen en cierresPrev) se recuperan: el admin confirma de qué chofer y día son.
   Si se cambia algo de esto, se cambia AQUÍ (y en las líneas 120 de tema-rutadia.js y l21.js).
   ============================================================================================ */
function hoy120(){return iso(TODAY)}
/* la ruta abierta de un chofer, donde esté (en pantalla, en la nube o la del admin guardada aparte) */
function rutaViva120(id){id=+id;if(S.chofHoy!=null&&+S.chofHoy===id&&!S.atr93)return S;/* la ruta del admin que reparte: la copia de su celular (arSt) es la buena */if(S.arSt&&+(S.arSt.chofHoy==null?ADM85:S.arSt.chofHoy)===id)return S.arSt;var o=(S.chSt||{})[id];return o||null}
function rutaIds120(){var L=[];var pon=function(i){i=+i;if(!isNaN(i)&&L.indexOf(i)<0)L.push(i)};try{nbRutaIds().forEach(pon)}catch(e){}Object.keys(S.chSt||{}).forEach(pon);if(S.chofHoy!=null)pon(S.chofHoy);if(S.arSt)pon(S.arSt.chofHoy==null?ADM85:S.arSt.chofHoy);return L}
function partesDe120(f,ch){return (S.rutasHist||[]).filter(function(e){return e&&e.parcial120&&e.f===f&&+e.ch===+ch})}
/* todos los cierres de un día: guardados (cada parte y el final) + la ruta abierta; sin repetir */
function rutasDia120(d){var hoy=hoy120(),o={},ord=[];var pon=function(k,x){if(!o[k])ord.push(k);o[k]=x};
 (S.rutasHist||[]).forEach(function(e){if(!e||e.f!==d)return;var x={ch:+e.ch,log:e.log||[],res:e.res,sent:!!e.enviado,reg:e.cierreReg82,recep:e.recep82,arch:1,corte:e.corte120||null,n:e.n120||0,parcial:!!e.parcial120,resc:!!e.rescatado120,e:e};
  if(e.parcial120){pon(e.ch+'|p'+e.n120+'|'+(e.id120||''),x);return}
  var k=e.ch+'|f',a=o[k];if(!a||(!a.reg&&e.cierreReg82)||(!a.sent&&e.enviado))pon(k,x)});
 rutaIds120().forEach(function(id){var r=rutaViva120(id);if(!r||rutaVacia(r))return;var f=r.rutaDia80||hoy;if(f!==d)return;
  pon(id+'|f',{ch:+id,log:r.log||[],res:r.cierre&&r.cierre.res,sent:!!(r.cierre&&r.cierre.sent),reg:r.cierreReg,recep:r.recep,r:r,corte:r.cierre&&r.cierre.corte||null,vivo:1})});
 var L=ord.map(function(k){return o[k]});
 /* número de cierre: las partes por su número; el final después de las partes */
 L.forEach(function(x){if(!x.parcial)x.n=partesDe120(d,x.ch).length+1});
 return L.sort(function(a,b){return a.ch-b.ch||a.n-b.n})}
rutasDia82=function(d){return rutasDia120(d)};
/* lo cobrado en una parte de ruta (contado + abonos), sin lo anulado */
function cobPart120(x){return r2(sum((x.log||[]).filter(function(l){return l&&!l.anul}),function(l){return num(l.pago)+num(l.abono)}))}
function ventaPart120(x){return r2(sum((x.log||[]).filter(function(l){return l&&!l.anul}),function(l){return num(l.total)}))}

/* ---------- "Empezar otro cierre": antes de vaciar, el cierre se guarda completo ---------- */
window.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act="seguir"]');if(!b||!S.cierreReg||!S.cierre||!S.cierre.sent)return;
 try{var f=S.rutaDia80||hoy120(),ch=+S.chofHoy,n=partesDe120(f,ch).length+1,id=Date.now().toString(36)+'-'+ch,c=S.cierre;
  S.rutasHist=S.rutasHist||[];S.rutasHist.push({f:f,ch:ch,n120:n,parcial120:1,id120:id,log:JSON.parse(JSON.stringify(S.log||[])),res:c.res||null,enviado:true,corte120:c.corte||null,
   cierreReg82:S.cierreReg?JSON.parse(JSON.stringify(S.cierreReg)):null,recep82:S.recep?JSON.parse(JSON.stringify(S.recep)):null,h120:(c.corte&&c.corte.h)||hhmm(),fotos121:(typeof fotosRuta121==='function'?fotosRuta121(S):null)});
  var n0=(S.cierresPrev||[]).length;setTimeout(function(){var L=S.cierresPrev||[];if(L.length>n0){var x=L[L.length-1];x.ch=ch;x.f=f;x.n120=n;x.id120=id;x.corte120=c.corte||null}},0)}catch(er){console.error('120 seguir',er)}},true);

/* ---------- el efectivo recibido de TODOS los cierres (antes: solo el del chofer en pantalla, y se perdía al cambiar de día) ---------- */
cierresCaja=function(){var t=sum(S.cierresPrev||[],function(x){return num(x.rec)}),vivos={};
 rutaIds120().forEach(function(id){var r=rutaViva120(id);if(!r)return;if(r.cierreReg)t+=num(r.cierreReg.rec);vivos[id+'|'+(r.rutaDia80||hoy120())]=1});
 /* días pasados: el cierre final de cada chofer (las partes ya están en cierresPrev; los atrasados también) */
 var vis={};(S.rutasHist||[]).forEach(function(e){if(!e||e.parcial120||e.recibido94||!e.cierreReg82)return;var k=e.ch+'|'+e.f;if(vis[k]||vivos[k])return;vis[k]=1;t+=num(e.cierreReg82.rec)});
 return r2(t)};

/* ---------- los cierres que se perdieron antes del arreglo: se recuperan de su resumen ---------- */
function perdidos120(){return (S.cierresPrev||[]).filter(function(x){return x&&x.ch==null&&!x.atras94&&x.r120!=='ok'})}
function rescata120(i,ch,f){var x=(S.cierresPrev||[])[i];if(!x||x.ch!=null)return;var r=x.res||{},n=partesDe120(f,ch).length+1,id='r'+Date.now().toString(36)+'-'+i;
 var lin={R:num(r.R),M:num(r.M),pr:num(r.R)?r2(num(r.vR)/num(r.R)):0,pm:num(r.M)?r2(num(r.vM)/num(r.M)):0,total:num(r.total),pago:r2(num(r.total)-num(r.cred)),abono:num(r.ab),c:null,rescate120:1};
 S.rutasHist=S.rutasHist||[];S.rutasHist.push({f:f,ch:+ch,n120:n,parcial120:1,rescatado120:1,id120:id,log:[lin],res:x.res||null,enviado:true,corte120:null,cierreReg82:{rec:num(x.rec)},recep82:null});
 x.ch=+ch;x.f=f;x.n120=n;x.id120=id;x.r120='ok';S.hist.push({t:fmtF(hoy120())+' '+hhmm(),q:quien(),x:'Recuperó el cierre '+n+' de '+chofN(+ch)+' del '+fmtF(f)+': vendió '+money(num(r.total))+', recibió '+money(num(x.rec))})}
/* lo que la app sí dejó anotado ese día ("X empezó un segundo cierre", con fecha y chofer) sirve para sugerir de quién y de qué día es cada uno */
function perdSug120(){var A=(S.actDia||[]).filter(function(a){return a&&/empezó un segundo cierre|empezó su cierre/.test(String(a.x||''))&&a.ch!=null}).sort(function(a,b){return (a.f+(a.h||'')).localeCompare(b.f+(b.h||''))}),L=perdidos120(),o={};L.forEach(function(x,i){if(A[i])o[(S.cierresPrev||[]).indexOf(x)]=A[i]});return o}
function perdidosHTML120(){if(S.role!=='admin')return '';var L=perdidos120();if(!L.length)return '';var all=S.cierresPrev,CH=S.choferes.filter(function(c){return esCh(c)}),SG=perdSug120();
 return '<div class="card alert" data-x="perd120" style="padding:12px 14px;border:3px solid var(--danger)"><div style="font-size:18px;font-weight:900">⚠️ Cierres que no salían en las cuentas</div><div class="lbl">Se habían quitado de Estadísticas al empezar otro cierre. Su resumen sí quedó guardado. Dime de qué chofer y qué día son y se suman otra vez.</div>'
  +L.map(function(x){var i=all.indexOf(x),r=x.res||{};return '<div style="border-top:1px solid var(--line);padding:10px 0">'+rw('Vendió',money(num(r.total)))+rw('Debía entregar',money(num(r.efectivo)))+rw('Recibiste',money(num(x.rec)))+(num(r.R)||num(r.M)?rw('Cajas y kilos',num(r.R)+' cajas · '+num(r.M)+' kg'):'')
   +(SG[i]?'<div class="lbl" style="margin-top:4px">Según lo que pasó ese día: <b>'+esc(chofN(SG[i].ch))+'</b> empezó otro cierre el <b>'+fmtF(SG[i].f)+'</b>'+(SG[i].h?' a las '+esc(SG[i].h):'')+'. Revísalo.</div>':'')+'<div class="field"><label for="pch120_'+i+'">Chofer</label><select id="pch120_'+i+'">'+CH.map(function(c){var sel=SG[i]?+c.id===+SG[i].ch:+c.id===ADM85;return '<option value="'+c.id+'"'+(sel?' selected':'')+'>'+esc(c.n)+'</option>'}).join('')+'</select></div>'
   +'<div class="field"><label for="pf120_'+i+'">Día</label><input id="pf120_'+i+'" type="date" max="'+hoy120()+'" value="'+(SG[i]?SG[i].f:hoy120())+'"></div>'
   +'<button class="btn" style="min-height:52px;margin-top:6px" data-act="resc120" data-i="'+i+'">Sumarlo a las cuentas</button></div>'}).join('')+'</div>'}
document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act="resc120"]');if(!b)return;e.preventDefault();e.stopImmediatePropagation();var i=+b.dataset.i,ch=(document.getElementById('pch120_'+i)||{}).value,f=(document.getElementById('pf120_'+i)||{}).value;
 if(!ch||!/^\d{4}-\d\d-\d\d$/.test(f||'')){toast('Escoge el chofer y el día');return}rescata120(i,+ch,f);toast('Listo: el cierre ya se suma en '+fmtF(f));render()},true);

/* ---------- Inicio: los cierres de hoy (antes "Cierre N de [el chofer en pantalla] entregado", para siempre) ---------- */
function cierresHoy120HTML(){if(S.role!=='admin')return '';var L=rutasDia120(hoy120()).filter(function(x){return x.sent||x.parcial});var h=perdidosHTML120();
 if(!L.length)return h;var tot=sum(L,function(x){return cobPart120(x)});
 return h+'<div class="card" data-x="cie120" role="button" tabindex="0" data-act="cie120ver" style="padding:12px 14px;cursor:pointer"><div style="display:flex;justify-content:space-between;gap:8px"><b>📋 Cierres de hoy ('+L.length+')</b><b>'+money(tot)+'</b></div><div class="lbl">'
  +L.map(function(x){return esc(chofN(x.ch))+' · '+x.n+(x.resc?' (recuperado)':'')}).join(' · ')+' · toca para ver el detalle</div></div>'}

/* ---------- 📋 Historial de cierres ---------- */
function cie120Dia(){var d=S.cie120d;return /^\d{4}-\d\d-\d\d$/.test(d||'')?d:hoy120()}
function cie120Card(x){var r=x.res||{},c=x.corte||{},rec=x.reg&&x.reg.rec!=null?num(x.reg.rec):null,deb=c.deb!=null?num(c.deb):num(r.efectivo),ent=c.ent!=null?num(c.ent):null,est=x.vivo&&!x.sent?'Ruta en curso':(x.sent?(rec!=null?'Recibido':'Enviado, falta recibir'):'Sin cierre');
 var L=(x.log||[]).filter(function(l){return l&&!l.anul}),k='cie120_'+x.ch+'_'+x.n;
 return '<div class="card" style="padding:12px 14px"><div style="display:flex;justify-content:space-between;gap:8px;align-items:baseline"><b style="font-size:17px">'+esc(chofN(x.ch))+' · Cierre '+x.n+'</b><span class="lbl">'+esc(c.h||(x.e&&x.e.h120)||'')+'</span></div>'
  +'<div class="lbl" style="margin-bottom:4px">'+est+(x.resc?' · recuperado de su resumen':'')+'</div>'
  +rw('Vendió',money(x.resc?num(r.total):ventaPart120(x)))+rw('Cobrado (contado y abonos)',money(cobPart120(x)))+(num(r.cred)?rw('Quedó a crédito',money(num(r.cred))):'')
  +rw('Debía entregar',money(deb))+(ent!=null?rw('Entregó',money(ent)):'')+(ent!=null&&Math.abs(ent-deb)>=0.5?rw(ent<deb?'Faltante':'Sobrante',money(Math.abs(ent-deb)),'neg'):'')
  +(rec!=null?rw('Recibiste',money(rec)):'')+(c.v?rw('Código de verificación','<b>'+esc(c.v)+'</b>'):'')
  +(L.length&&!x.resc?'<details data-k="'+k+'"'+(S.dOpen[k]?' open':'')+' style="margin-top:6px"><summary><b>Entregas ('+L.length+')</b></summary>'+L.map(function(l){var cl0=cl(l.c);return '<div class="row" style="align-items:flex-start"><div><div>'+esc(cl0?cl0.n:'Cliente')+'</div><div class="lbl">'+(num(l.R)?num(l.R)+' cajas':'')+(num(l.R)&&num(l.M)?' · ':'')+(num(l.M)?num(l.M)+' kg':'')+(num(l.total)-num(l.pago)>0.005?' · a crédito '+money(num(l.total)-num(l.pago)):'')+(num(l.abono)?' · abonó '+money(num(l.abono)):'')+'</div></div><b>'+money(num(l.total))+'</b></div>'}).join('')+'</details>'
   :(x.resc?'<div class="lbl" style="margin-top:6px">El detalle por cliente de este cierre se borró antes del arreglo; los saldos de los clientes sí quedaron bien.</div>':''))+'</div>'}
function cierres120(){var d=cie120Dia(),hoy=hoy120(),L=rutasDia120(d),ay=addD120(hoy,-1);
 var h='<h1>📋 Historial de cierres</h1><div class="chips" role="group" aria-label="Día" style="margin:6px 0;flex-wrap:wrap"><button data-act="cie120d" data-v="'+hoy+'" aria-pressed="'+(d===hoy)+'">Hoy</button><button data-act="cie120d" data-v="'+ay+'" aria-pressed="'+(d===ay)+'">Ayer</button></div>'
  +'<div class="field"><label for="cie120f">Otro día</label><input id="cie120f" type="date" max="'+hoy+'" value="'+d+'" data-cie120f="1"></div>'+perdidosHTML120();
 if(!L.length)return h+'<div class="card"><div class="lbl">No hay cierres el '+fmtF(d)+'.</div></div>';
 var cob=sum(L,cobPart120),rec=sum(L,function(x){return x.reg&&x.reg.rec!=null?num(x.reg.rec):0});
 h+='<div class="card" style="padding:12px 14px"><b>'+fmtF(d)+'</b>'+rw('Cierres',String(L.length))+rw('Cobrado en ruta',money(cob))+rw('Efectivo recibido',money(rec))+'</div>';
 return h+L.map(cie120Card).join('')}
function addD120(s,n){var d=dOf(s);d.setDate(d.getDate()+n);return iso(d)}
/* VIEWS se arma en la base DESPUÉS de las capas: se agrega al dibujar */
var _r120v=render;render=function(){try{if(typeof VIEWS!=='undefined'&&!VIEWS.cierres120)VIEWS.cierres120=cierres120}catch(e){}return _r120v.apply(this,arguments)};
document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act="cie120ver"],[data-act="cie120d"]');if(!b)return;e.preventDefault();e.stopImmediatePropagation();
 if(b.dataset.act==='cie120d')S.cie120d=b.dataset.v;else S.cie120d=hoy120();S.tab.admin='cierres120';render();window.scrollTo(0,0)},true);
document.addEventListener('change',function(e){var t=e.target;if(!t||!t.dataset||!t.dataset.cie120f)return;if(/^\d{4}-\d\d-\d\d$/.test(t.value||'')){S.cie120d=t.value;render()}},true);
/* en "Más", después de Estadísticas */
if(typeof mas92==='function'){var _mas120=mas92;mas92=function(){var h=_mas120.apply(this,arguments);try{var bt='<button data-act="cie120ver" data-x="mas92-cierres"><span class="ic92">📋</span>Historial de cierres<small>cada cierre de cada chofer, día por día</small></button>',k=h.indexOf('data-x="mas92-bienes"');var i=k>-1?h.lastIndexOf('<button',k):-1;if(i>-1)h=h.slice(0,i)+bt+h.slice(i)}catch(er){}return h}}
