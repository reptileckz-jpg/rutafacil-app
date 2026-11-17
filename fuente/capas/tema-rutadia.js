/* ===================== TEMA · La ruta del día (aplanado el 17 nov) =====================
   Antes estaba repartido en envolturas encadenadas en l80, l81, l82, l83, l85, l86 y l87. Aquí está todo junto, en orden,
   y hace exactamente lo mismo. Se arma justo después de l85 (en build.sh).
   Si se cambia algo de la ruta del día, se cambia AQUÍ (no se agregan envolturas en capas nuevas).

   - chNuevo: la ruta nueva de un chofer (fecha de hoy, sus clientes de hoy + pendientes, el admin no reparte).
   - cambioDeDia: lo que pasa cuando el celular abre en un día nuevo.
   - rutaVieja80 / rutaRenueva80: el celular del chofer cambia solo a la ruta de hoy.
   - dia80HTML: la pantalla "No mandaste tu cierre" (solo si salió a ruta).
   - porLib86 / dia80Adm: el administrador ve qué rutas puede liberar.
   ============================================================================================ */

/* ---------- la ruta nueva de un chofer ---------- */
var _chNBase=chNuevo;
chNuevo=function(id){var o=_chNBase.apply(this,arguments);
 /* 35 · cada ruta sabe de qué día es */
 try{o.rutaDia80=iso(TODAY)}catch(e){}
 /* 81 · los clientes de hoy (rutas del admin) + los que quedaron pendientes de la ruta anterior */
 try{var f=hoy81(),r=rutaObj81(id),pend=r&&r.rutaDia80&&r.rutaDia80!==f?pendDe81(r):(PEND81[id]||[]);delete PEND81[id];
  o.stops=plan81(id,f,pend);if(o.cierre&&o.cierre.odoIni!=null&&typeof rutaKmEstDe==='function')o.cierre.odo=num(o.cierre.odoIni)+rutaKmEstDe(o.stops)}catch(e){console.error('l81 plan',e)}
 /* 85 · el administrador no reparte */
 try{if(MODO==='vacio'&&+id===ADM85)o.stops=[]}catch(e){}
 return o};

/* ---------- el celular abre en un día nuevo ---------- */
var _cddBase=cambioDeDia;   /* l21 (archiva las rutas) + l28 (espera a la nube) */
cambioDeDia=function(viejo){var hoy=iso(TODAY),nuevo=!!(viejo&&viejo!==hoy);
 /* 85 · los clientes que no se visitaron quedan anotados */
 try{if(nuevo){Object.keys(S.chSt||{}).forEach(function(id){var r=S.chSt[id];if(r&&r.rutaDia80!==hoy)fallas85(r,r.rutaDia80||viejo)});if(S.chofHoy!=null&&S.rutaDia80!==hoy)fallas85(S,S.rutaDia80||viejo)}}catch(e){}
 /* 82 · se guarda cómo se recibió cada cierre, para el historial */
 var snap={};try{if(nuevo){Object.keys(S.chSt||{}).forEach(function(id){var r=S.chSt[id];if(r)snap[id]={reg:r.cierreReg,recep:r.recep}});if(S.chofHoy!=null)snap[S.chofHoy]={reg:S.cierreReg,recep:S.recep}}}catch(e){}
 /* 81 · los pendientes de cada ruta pasan a la de hoy */
 try{if(nuevo){PEND81={};Object.keys(S.chSt||{}).forEach(function(id){var r=S.chSt[id];if(r&&r.rutaDia80!==hoy)PEND81[id]=pendDe81(r)})}}catch(e){}
 var r;
 if(!nuevo)r=_cddBase.apply(this,arguments);
 else{var antes=Object.keys(S.chSt||{});
  /* 35 · las rutas sin fecha quedan con la del día que se cierra */
  try{if(!S.rutaDia80)S.rutaDia80=viejo;Object.keys(S.chSt||{}).forEach(function(id){var o=S.chSt[id];if(o&&!o.rutaDia80)o.rutaDia80=viejo})}catch(e){}
  r=_cddBase.apply(this,arguments);
  /* 35 · el admin: cada chofer con clientes hoy tiene su ruta nueva */
  try{if(S.role==='admin'||S.role==='cont'){S.chSt=S.chSt||{};(S.choferes||[]).forEach(function(c){var id=+c.id;if(c.baja||!esCh(c)||id===+S.chofHoy)return;if(!S.chSt[id]&&(antes.indexOf(String(id))>-1||cliHoy80(id).length))S.chSt[id]=chNuevo(id)})}}catch(e){}}
 /* 81 · se limpian los cambios de ruta de hace más de 3 días */
 try{var lim=iso(new Date(TODAY.getTime()-3*864e5));['rutaOv81','rq81'].forEach(function(k){var o=S[k];if(o)Object.keys(o).forEach(function(f){if(f<lim)delete o[f]})})}catch(e){}
 /* 82 · al historial se le pega cómo se recibió el cierre */
 try{(S.rutasHist||[]).forEach(function(e){var s=snap[e.ch];if(e.f===viejo&&s&&e.recep82===undefined){e.cierreReg82=s.reg||null;e.recep82=s.recep||null}})}catch(e){}
 /* 82 · mes nuevo: los contadores del mes empiezan en 0 */
 try{if(viejo&&String(viejo).slice(0,7)!==hoy.slice(0,7)){(S.cli||[]).forEach(function(c){c.mesR=0;c.mesM=0});S.choferes.forEach(function(c){if(c.mes)c.mes={ven:0,R:0,M:0,cob:0,cred:0}})}}catch(e){}
 return r};

/* ---------- el celular del chofer cambia solo a la ruta de hoy ---------- */
function rutaVieja80(){if(S.role!=='rep'||S.chofHoy==null||S.arOn)return null;var hoy=iso(TODAY);if(S.rutaDia80)return S.rutaDia80!==hoy?S.rutaDia80:null;
 /* rutas de antes (sin fecha): vieja si ya mandó el cierre y no trae a ninguno de sus clientes de hoy */
 var H=cliHoy80(S.chofHoy).map(function(c){return c.id});if(!H.length)return null;var st=S.stops||[];if(st.some(function(s){return H.indexOf(+s.c)>-1}))return null;return 'antes'}
function rutaRenueva80(){var v=rutaVieja80();if(!v)return false;var o=arPack(),env=!!(o.cierre&&o.cierre.sent),f=v==='antes'?ayer80():v;
 /* 71 · si NO salió a ruta (no tocó "Iniciar"), no se bloquea: lo de antes se archiva y al admin le llega "cuádralo con él" */
 var sinSalir=!env&&!salio87(o),rv=rutaVacia;
 if(sinSalir){try{if((o.log||[]).length){S.rutasHist=S.rutasHist||[];if(!S.rutasHist.some(function(x){return x.f===f&&+x.ch===+S.chofHoy}))S.rutasHist.push({f:f,ch:+S.chofHoy,log:o.log,res:null,enviado:false,sinSalir87:1});
   (S.avPrecio=S.avPrecio||[]).push(chofN(S.chofHoy)+' tenía '+o.log.length+' entrega'+(o.log.length===1?'':'s')+' '+del80(f)+' sin haber iniciado ruta ni mandado cierre: cuádralo con él.')}}catch(e){}
  rutaVacia=function(x){return !salio87(x)}}   /* mientras se renueva, "vacía" = "no salió" */
 try{
  /* 85 · los clientes que no se visitaron quedan anotados */
  try{fallas85(S,f)}catch(e){}
  var rec={reg:S.cierreReg,recep:S.recep},n=(S.rutasHist||[]).length;
  /* salió y no ha mandado el cierre: se bloquea con la pantalla "No mandaste tu cierre" */
  if(!env&&!rutaVacia(o)){if(v!=='antes')S.dia80=v;return false}
  S.rutasHist=S.rutasHist||[];if(!rutaVacia(o)&&!S.rutasHist.some(function(x){return x.f===f&&+x.ch===+S.chofHoy}))S.rutasHist.push({f:f,ch:+S.chofHoy,log:o.log,res:o.cierre&&o.cierre.res||null,enviado:env});
  /* 82 · al historial se le pega cómo se recibió el cierre */
  try{S.rutasHist.slice(n).forEach(function(e){if(e.recep82===undefined){e.cierreReg82=rec.reg||null;e.recep82=rec.recep||null}})}catch(e){}
  arLoad(chNuevo(+S.chofHoy));S.dia80=null;S.tab.rep='ruta';var k=(S.stops||[]).length;setTimeout(function(){try{toast(k?'Listo: ya puedes empezar tu ruta de hoy ('+k+' cliente'+(k===1?'':'s')+')':'Tu ruta de hoy está lista')}catch(e){}},80);return true
 }finally{if(sinSalir)rutaVacia=rv}}

/* ---------- la pantalla del chofer "No mandaste tu cierre" ---------- */
function dia80HTML(){
 /* 71 · si no salió a ruta, no se bloquea */
 if(S.role==='rep'&&S.dia80&&!salio87(S)&&!(S.cierre&&S.cierre.sent)){S.dia80=null;setTimeout(function(){try{render()}catch(e){}},0);return ''}
 if(S.role!=='rep'||!S.dia80||S.cierre&&S.cierre.sent||S.tab.rep==='cierre')return '';var n=cliHoy80(S.chofHoy).length,ya=(S.libPide83||'')===iso(TODAY);
 return '<div id="dia80" role="dialog" aria-label="Cierre pendiente"><div class="w"><div style="font-size:44px;text-align:center">📋</div><h1 style="font-size:23px;text-align:center">No mandaste tu cierre '+esc(del80(S.dia80))+'</h1><p style="font-size:17px;text-align:center">Para empezar tu ruta de hoy, primero mándalo.</p>'
  +'<button class="btn big" style="width:100%;min-height:62px;font-size:19px" data-act="dia80c">Mandar mi cierre '+esc(del80(S.dia80))+'</button>'+(n?'<div class="card note" style="margin-top:14px;text-align:center;font-size:17px">Hoy te tocan <b>'+n+' cliente'+(n===1?'':'s')+'</b>. En cuanto mandes el cierre te sale tu ruta.</div>':'')
  /* 83 · "Pedir que liberen mi ruta de hoy" */
  +'<div style="margin-top:22px;text-align:center"><div class="lbl" style="font-size:15px">¿No puedes mandarlo (no te deja, o ya no tienes los datos)?</div>'+(ya?'<div style="font-weight:800;margin-top:8px">✓ Ya se le pidió al administrador. En cuanto la libere, te sale tu ruta.</div>':'<button class="btn sec" style="width:100%;min-height:54px;margin-top:8px" data-act="lib83">Pedir que liberen mi ruta de hoy</button>')+'</div>'
  +'</div></div>'}

/* ---------- el administrador: rutas que puede liberar ---------- */
/* las de otros choferes Y la que tiene cargada en su celular; solo si el chofer SALIÓ y no mandó su cierre */
function porLib86(){var hoy=iso(TODAY),L=[];Object.keys(S.chSt||{}).forEach(function(id){var o=S.chSt[id];if(+id===+S.chofHoy)return;if(o&&o.rutaDia80&&o.rutaDia80!==hoy&&!(o.cierre&&o.cierre.sent)&&!rutaVacia(o)&&salio87(o))L.push({id:+id,f:o.rutaDia80,propia:false})});
 if(S.chofHoy!=null&&!S.arOn&&!esAdm({id:+S.chofHoy})&&S.rutaDia80&&S.rutaDia80!==hoy&&!(S.cierre&&S.cierre.sent)&&salio87(S)){var pk=arPack();if(!rutaVacia(pk))L.push({id:+S.chofHoy,f:S.rutaDia80,propia:true})}return L}
/* la tarjeta roja en Inicio (pide que la liberen / no ha mandado su cierre) */
function dia80Adm(){if(!(S.role==='admin'&&!S.encOn)||S.tab.admin!=='inicio')return;var m=document.querySelector('main');if(!m||m.querySelector('[data-x="dia80a"]'))return;var L=porLib86(),P=S.libPide86||{},hoy=iso(TODAY);
 var pide=Object.keys(P).filter(function(id){return P[id]&&P[id].f===hoy});if(!L.length&&!pide.length)return;var ya={};
 var h=pide.map(function(id){ya[id]=1;var en=L.filter(function(x){return x.id===+id})[0];return '<div class="card sos86" style="padding:12px 14px"><b style="font-size:18px">🆘 '+esc(chofN(+id))+' pide que liberes su ruta</b><div class="lbl" style="font-size:15px">No puede mandar su cierre'+(P[id].de?' '+esc(del80(P[id].de)):'')+' y no le sale su ruta de hoy.</div>'+(en?'<button class="btn" style="margin-top:8px;min-height:54px" data-act="lib86" data-id="'+id+'">Liberar su ruta de hoy</button>':'<div class="lbl" style="margin-top:6px">✓ Su ruta de hoy ya está lista. En cuanto su celular tenga señal le sale.</div>')+'</div>'}).join('');
 h+=L.filter(function(x){return !ya[x.id]}).map(function(x){return '<div class="card alert" style="padding:12px 14px"><b>'+esc(chofN(x.id))+' no ha mandado su cierre '+esc(del80(x.f))+'</b><div class="lbl">Hasta que lo mande no le sale su ruta de hoy.</div><div style="display:flex;gap:8px;margin-top:8px"><button class="btn sec" style="flex:1" data-act="dia80r" data-id="'+x.id+'">Recordarle</button><button class="btn" style="flex:1" data-act="lib86" data-id="'+x.id+'">Liberar su ruta de hoy</button></div></div>'}).join('');
 var d=document.createElement('div');d.dataset.x='dia80a';d.innerHTML=h;m.prepend(d)}
