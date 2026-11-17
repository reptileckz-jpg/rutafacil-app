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
 /* 94 · los cierres mandados y sin recibir se guardan aparte antes de armar rutas nuevas */
 try{if(nuevo){Object.keys(S.chSt||{}).forEach(function(id){var r=S.chSt[id];if(sinRecibir93(r)||rutaVacia(r)&&guardable95(r))atrasGuarda93(r,+id,r.rutaDia80||viejo)});if(S.chofHoy!=null&&!S.arOn){var o9=arPack();if(sinRecibir93(o9)||rutaVacia(o9)&&guardable95(o9)){if(sinRecibir93(o9)&&!o9.cierre.regMov){regMov93(S);o9=arPack()}atrasGuarda93(o9,S.chofHoy,S.rutaDia80||viejo,sinRecibir93(o9)?'cierre':'sinSalir')}}}}catch(e){console.error('94 dia',e)}
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
/* 93 · de noche (12 a 5 a.m.) la ruta de AYER que ya salió sigue siendo "la de hoy": el chofer termina sus entregas y manda su cierre
   sin que se le bloquee nada; a las 5 a.m., si todavía no lo mandó, ya sale "No mandaste tu cierre de ayer". */
var NOCHE93=5;
function noche93(f){try{var h=window.__hora93!=null?window.__hora93:new Date().getHours();return !!f&&f===ayer80()&&h<NOCHE93}catch(e){return false}}
function rutaVieja80(){if(S.role!=='rep'||S.chofHoy==null||S.arOn)return null;var hoy=iso(TODAY);if(S.rutaDia80&&noche93(S.rutaDia80)&&salio87(S))return null;if(S.rutaDia80)return S.rutaDia80!==hoy?S.rutaDia80:null;
 /* rutas de antes (sin fecha): vieja si ya mandó el cierre y no trae a ninguno de sus clientes de hoy */
 var H=cliHoy80(S.chofHoy).map(function(c){return c.id});if(!H.length)return null;var st=S.stops||[];if(st.some(function(s){return H.indexOf(+s.c)>-1}))return null;return 'antes'}
function rutaRenueva80(){var v=rutaVieja80();if(!v)return false;var o=arPack(),env=!!(o.cierre&&o.cierre.sent),f=v==='antes'?ayer80():v;
 /* 94 · si mandó su cierre y todavía no se recibe, se guarda aparte ANTES de armarle la ruta de hoy */
 try{if(sinRecibir93(o)){if(!o.cierre.regMov){regMov93(S);o=arPack()}atrasGuarda93(o,S.chofHoy,f,'cierre')}}catch(e){console.error('94',e)}
 /* 95 · salió con cajas pero NO entregó nada: no se le bloquea; las cajas se guardan para recibirlas y le sale su ruta de hoy */
 var sinEnt95=!env&&salio87(o)&&!(o.log||[]).length;if(sinEnt95){try{atrasGuarda93(o,S.chofHoy,f,'sinEntregas')}catch(e){}}
 /* 71 · si NO salió a ruta (no tocó "Iniciar"), no se bloquea: lo de antes se archiva y al admin le llega "cuádralo con él" */
 var sinSalir=!env&&!salio87(o),rv=rutaVacia,guardo95=false;
 /* 95 · entregó sin haber iniciado ruta: lo que traía se guarda para recibirlo */
 if(sinSalir){try{guardo95=atrasGuarda93(o,S.chofHoy,f,'sinSalir')}catch(e){}}
 if(sinSalir){try{if((o.log||[]).length){S.rutasHist=S.rutasHist||[];if(!S.rutasHist.some(function(x){return x.f===f&&+x.ch===+S.chofHoy}))S.rutasHist.push({f:f,ch:+S.chofHoy,log:o.log,res:null,enviado:false,sinSalir87:1});
   if(!guardo95)(S.avPrecio=S.avPrecio||[]).push(chofN(S.chofHoy)+' tenía '+o.log.length+' entrega'+(o.log.length===1?'':'s')+' '+del80(f)+' sin haber iniciado ruta ni mandado cierre: cuádralo con él.')}}catch(e){}
  rutaVacia=function(x){return !salio87(x)}}   /* mientras se renueva, "vacía" = "no salió" */
 try{
  /* 85 · los clientes que no se visitaron quedan anotados */
  try{fallas85(S,f)}catch(e){}
  var rec={reg:S.cierreReg,recep:S.recep},n=(S.rutasHist||[]).length;
  /* salió y no ha mandado el cierre: se bloquea con la pantalla "No mandaste tu cierre" */
  if(!env&&!rutaVacia(o)&&!sinEnt95){if(v!=='antes')S.dia80=v;return false}
  S.rutasHist=S.rutasHist||[];var ya=S.rutasHist.filter(function(x){return x.f===f&&+x.ch===+S.chofHoy})[0];
  if(!rutaVacia(o)&&!ya)S.rutasHist.push({f:f,ch:+S.chofHoy,log:o.log,res:o.cierre&&o.cierre.res||null,enviado:env});
  /* 93 · si al cambiar de día ya se había guardado "sin enviar" y luego SÍ mandó su cierre, se actualiza (antes se quedaba "no enviado") */
  else if(ya&&env&&!ya.enviado){ya.log=o.log;ya.res=o.cierre&&o.cierre.res||null;ya.enviado=true;ya.tarde93=1;if(ya.recep82===undefined||ya.recep82===null){ya.cierreReg82=rec.reg||null;ya.recep82=rec.recep||null}}
  /* 82 · al historial se le pega cómo se recibió el cierre */
  try{S.rutasHist.slice(n).forEach(function(e){if(e.recep82===undefined){e.cierreReg82=rec.reg||null;e.recep82=rec.recep||null}})}catch(e){}
  arLoad(chNuevo(+S.chofHoy));S.dia80=null;S.tab.rep='ruta';var k=(S.stops||[]).length;setTimeout(function(){try{toast((env?'Tu cierre '+del80(f)+' se mandó al administrador. ':'')+(k?'Ya puedes empezar tu ruta de hoy ('+k+' cliente'+(k===1?'':'s')+')':'Tu ruta de hoy está lista'))}catch(e){}},80);return true
 }finally{if(sinSalir)rutaVacia=rv}}

/* ---------- la pantalla del chofer "No mandaste tu cierre" ---------- */
function dia80HTML(){
 /* 93 · de noche no se bloquea la ruta que va en curso */
 if(S.role==='rep'&&S.dia80&&noche93(S.dia80)&&salio87(S)){S.dia80=null;return ''}
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
function porLib86(){var hoy=iso(TODAY),L=[];Object.keys(S.chSt||{}).forEach(function(id){var o=S.chSt[id];if(+id===+S.chofHoy)return;if(o&&o.rutaDia80&&o.rutaDia80!==hoy&&!noche93(o.rutaDia80)&&!(o.cierre&&o.cierre.sent)&&!rutaVacia(o)&&salio87(o))L.push({id:+id,f:o.rutaDia80,propia:false})});
 if(S.chofHoy!=null&&!S.arOn&&!esAdm({id:+S.chofHoy})&&S.rutaDia80&&S.rutaDia80!==hoy&&!noche93(S.rutaDia80)&&!(S.cierre&&S.cierre.sent)&&salio87(S)){var pk=arPack();if(!rutaVacia(pk))L.push({id:+S.chofHoy,f:S.rutaDia80,propia:true})}return L}
/* la tarjeta roja en Inicio (pide que la liberen / no ha mandado su cierre) */
function dia80Adm(){if(!(S.role==='admin'&&!S.encOn)||['inicio','rutas'].indexOf(S.tab.admin)<0)return;var m=document.querySelector('main');if(!m||m.querySelector('[data-x="dia80a"]'))return;var L=porLib86(),P=S.libPide86||{},hoy=iso(TODAY);
 var pide=Object.keys(P).filter(function(id){return P[id]&&P[id].f===hoy});if(!L.length&&!pide.length)return;var ya={};
 var h=pide.map(function(id){ya[id]=1;var en=L.filter(function(x){return x.id===+id})[0];return '<div class="card sos86" style="padding:12px 14px"><b style="font-size:18px">🆘 '+esc(chofN(+id))+' pide que liberes su ruta</b><div class="lbl" style="font-size:15px">No puede mandar su cierre'+(P[id].de?' '+esc(del80(P[id].de)):'')+' y no le sale su ruta de hoy.</div>'+(en?'<button class="btn" style="margin-top:8px;min-height:54px" data-act="lib86" data-id="'+id+'">Liberar su ruta de hoy</button>':'<div class="lbl" style="margin-top:6px">✓ Su ruta de hoy ya está lista. En cuanto su celular tenga señal le sale.</div>')+'</div>'}).join('');
 h+=L.filter(function(x){return !ya[x.id]}).map(function(x){return '<div class="card alert" style="padding:12px 14px"><b>'+esc(chofN(x.id))+' no ha mandado su cierre '+esc(del80(x.f))+'</b><div class="lbl">Hasta que lo mande no le sale su ruta de hoy.</div><div style="display:flex;gap:8px;margin-top:8px"><button class="btn sec" style="flex:1" data-act="dia80r" data-id="'+x.id+'">Recordarle</button><button class="btn" style="flex:1" data-act="lib86" data-id="'+x.id+'">Liberar su ruta de hoy</button></div></div>'}).join('');
 var d=document.createElement('div');d.dataset.x='dia80a';d.innerHTML=h;m.prepend(d)}

/* ===================== 94 · un cierre MANDADO y todavía sin recibir nunca se pierde al cambiar de día =====================
   Antes: al cambiar de día (o al mandar el cierre de ayer), la ruta nueva se armaba ENCIMA del cierre sin recibir: el administrador
   ya no lo podía recibir y se perdían el efectivo, las entregas y las cajas/taras que regresaban (quedaban como faltantes).
   Ahora: antes de armar la ruta nueva, ese cierre se guarda aparte (en la nube, "atras93"). En el celular del administrador sale en
   Rutas (y en "Hoy") como "📥 Cierre atrasado · Recibir"; al tocarlo se abre la recepción de siempre con ESE cierre, sin tocar la
   ruta de hoy del chofer. Al terminar de recibirlo, queda en el historial como recibido y se regresa a lo que tenía abierto. */
try{if(NB_SH.indexOf('atras93')<0)NB_SH.push('atras93')}catch(e){}
function flaco93(o){return JSON.parse(JSON.stringify(o,function(k,v){return typeof v==='string'&&v.length>3000&&/^data:/.test(v)?'':v}))}
function sinRecibir93(o){return !!(o&&o.cierre&&o.cierre.sent&&o.cierre.res&&o.cierreReg==null)}
/* 95 · REGLA ÚNICA: una ruta que trae efectivo, entregas o cajas NO se reemplaza sin guardarla antes para recibirla */
function traeAlgo95(o){return !!(o&&o.cierreReg==null&&((o.log||[]).length||num(o.invR)>0||num(o.invM)>0||num(o.cierre&&o.cierre.salioR)>0))}
function guardable95(o){return sinRecibir93(o)||(!!o&&!(o.cierre&&o.cierre.sent)&&traeAlgo95(o))}
function cobro95(o){return r2(sum(o.log||[],function(l){return num(l.pago)+num(l.abono)}))}
/* lo mismo que hace l13 justo después de mandar: las cajas que regresan se cuentan al recibir, no antes */
function regMov93(o){var c=o&&o.cierre;if(!c||!c.sent||!c.res||c.regMov||o.recep)return;var r=c.res;c.regMov=true;c.porContar=true;try{S.inv.maduras-=Math.max(0,num(r.reg));S.inv.kgMaduro=r2(S.inv.kgMaduro-Math.max(0,num(r.regK)));S.inv.vacias-=num(r.V)}catch(e){}}
function atrasGuarda93(o,id,f,why){if(!guardable95(o)||id==null||!f)return false;S.atras93=S.atras93||{};var k=(+id)+'|'+f;if(S.atras93[k])return false;var env=sinRecibir93(o);if(env&&S.role==='rep')regMov93(o);/* en el admin lo hace la recepción (l13) si hiciera falta: así nunca se cuenta dos veces */
 S.atras93[k]={id:+id,f:f,h:hhmm(),why:why||(env?'cierre':'sinCierre'),env:env,ef:env?num(o.cierre.res&&o.cierre.res.efectivo):cobro95(o),cj:num(o.invR),pack:flaco93(o)};
 try{S.hist.push({t:fmtF(iso(TODAY))+' '+hhmm(),q:'App',x:'El cierre del '+fCorta91(f)+' de '+chofN(+id)+' quedó guardado para recibirlo (se cambió de día antes de recibirlo)'})}catch(e){}return true}
function atrasLista93(){var A=S.atras93||{};return Object.keys(A).filter(function(k){return A[k]&&!A[k].hecho}).map(function(k){var e=A[k];return {k:k,id:e.id,f:e.f,ef:e.ef,why:e.why||'cierre',env:e.env!==false,cj:e.cj}}).sort(function(a,b){return a.f<b.f?-1:1})}
/* ---- el administrador recibe un cierre atrasado ---- */
function atrasAbre93(k){var e=(S.atras93||{})[k];if(!e||e.hecho||S.role!=='admin')return;var cur=S.chofHoy;S.chSt=S.chSt||{};if(cur!=null&&!S.atr93)S.chSt[cur]=arPack();
 S.atr93={k:k,id:+e.id,prev:cur};arLoad(JSON.parse(JSON.stringify(e.pack)));S.chofHoy=+e.id;S.rcv=null;S.tab.admin='cierreadm';
 /* 95 · nunca se mandó como cierre: la app calcula lo que debía entregar (efectivo cobrado y cajas) para contarlo como un cierre normal */
 if(S.cierre&&!S.cierre.sent){try{var r=cierreRes();S.cierre.gxConf=true;S.cierre.res=r;S.cierre.sent=true;S.cierre.regMov=true;S.cierre.porContar=true;S.cierre.lib95=e.why||1;
   (S.recs||[]).forEach(function(x){S.gastos.push({t:'Combustible de reparto',m:x.total,n:chofN(S.chofHoy)+' · '+x.tipo+' '+x.litros+' L',tmp:1})});(S.gch||[]).forEach(function(x){S.gastos.push({t:'Gasto de ruta',m:x.m,n:chofN(S.chofHoy)+' · '+x.tipo+(x.nota?' · '+x.nota:''),tmp:1})});
   S.inv.reparto=0;S.inv.repartoKg=0}catch(er){console.error('95 abre',er)}}}
function atrasSale93(recibido){var x=S.atr93;if(!x)return;var e=(S.atras93||{})[x.k];
 if(recibido&&e){e.hecho=1;e.rec={f:iso(TODAY),h:hhmm(),q:quien()};try{var H=(S.rutasHist||[]).filter(function(h){return h.f===e.f&&+h.ch===+e.id})[0];var pk=arPack();
   if(H){H.log=pk.log;H.res=pk.cierre&&pk.cierre.res||H.res;H.enviado=true;H.cierreReg82=S.cierreReg||null;H.recep82=S.recep||null;H.recibido94=1}
   else{S.rutasHist=S.rutasHist||[];S.rutasHist.push({f:e.f,ch:+e.id,log:pk.log,res:pk.cierre&&pk.cierre.res||null,enviado:true,cierreReg82:S.cierreReg||null,recep82:S.recep||null,recibido94:1})}
   S.hist.push({t:fmtF(iso(TODAY))+' '+hhmm(),q:quien(),x:'Recibió el cierre del '+fCorta91(e.f)+' de '+chofN(+e.id)})}catch(er){}
  /* el efectivo que se recibió entra a la caja de hoy (como un "cierre entregado") */
  try{if(S.cierreReg){S.cierresPrev=S.cierresPrev||[];S.cierresPrev.push({n:S.cierresPrev.length+1,res:S.cierre&&S.cierre.res||null,rec:num(S.cierreReg.rec),ch:+e.id,f:e.f,atras94:1});try{actAdd(+e.id,'Recibiste el cierre del '+fCorta91(e.f)+' de '+chofN(+e.id)+': '+money(num(S.cierreReg.rec)))}catch(er){}}}catch(er){}}
 S.atr93=null;var prev=x.prev;if(prev!=null){arLoad(S.chSt[prev]||chNuevo(+prev));S.chofHoy=+prev}S.rcv=null;S.tab.admin='rutas'}
/* mientras se recibe un cierre atrasado, la ruta de hoy de ese chofer NO se toca (ni se sube ni se baja de la nube a la pantalla) */
var _nbG94=nbRGet;nbRGet=function(id,k){if(S.atr93&&+id===+S.atr93.id){var o=(S.chSt||{})[id];return o?o[k]:undefined}return _nbG94.apply(this,arguments)};
var _nbS94=nbRSet;nbRSet=function(id,k,v){if(S.atr93&&+id===+S.atr93.id){S.chSt=S.chSt||{};S.chSt[id]=S.chSt[id]||{};S.chSt[id][k]=v;return}return _nbS94.apply(this,arguments)};
/* termina solo en cuanto quedó recibido (efectivo y cajas) */
function atrasRevisa93(){if(!S.atr93)return;if(S.role!=='admin'){S.atr93=null;return}if(S.cierreReg!=null&&S.recep&&!S.rcv){atrasSale93(true);setTimeout(function(){try{toast('Listo: cierre recibido')}catch(e){}},60)}}
function atrasBanner93(){if(!S.atr93||S.role!=='admin'||S.tab.admin!=='cierreadm')return;var m=document.querySelector('main');if(!m||m.querySelector('[data-x="atr93b"]'))return;var e=(S.atras93||{})[S.atr93.k]||{};
 var d=document.createElement('div');d.dataset.x='atr93b';d.className='card alert';d.style.padding='12px 14px';d.innerHTML='<b style="font-size:17px">📥 Estás recibiendo el cierre del '+esc(fCorta91(e.f||''))+' de '+esc(chofN(S.atr93.id))+'</b><div class="lbl">Su ruta de hoy no se toca. Al terminar de recibirlo regresas a Rutas.</div><button class="btn sec" style="margin-top:8px;min-height:44px" data-act="atr93x">Salir sin recibirlo</button>';m.prepend(d)}
document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act="atr93"],[data-act="atr93x"]');if(!b)return;e.preventDefault();e.stopImmediatePropagation();if(b.dataset.act==='atr93')atrasAbre93(b.dataset.k);else atrasSale93(false);render();window.scrollTo(0,0)},true);
/* no se puede cambiar de chofer a la mitad (primero terminar o salir) */
var _chC94=chCambiar;chCambiar=function(id){if(S.atr93){if(+id===+S.atr93.id)return;atrasSale93(false)}return _chC94.apply(this,arguments)};
var _rd94=render;render=function(){try{atrasRevisa93()}catch(e){console.error('94r',e)}var r=_rd94.apply(this,arguments);try{atrasBanner93()}catch(e){}return r};

/* ---- 95 · liberar la ruta de un chofer (antes en l86): lo que traía (efectivo, entregas, cajas) se guarda para recibirlo ---- */
function libera86(id){var hoy=iso(TODAY),propia=+id===+S.chofHoy&&!S.arOn,o=propia?arPack():(S.chSt||{})[id];if(!o)return;
 try{atrasGuarda93(o,+id,o.rutaDia80||ayer80(),'liberada')}catch(e){console.error('95 lib',e)}
 S.rutasHist=S.rutasHist||[];S.rutasHist.push({f:o.rutaDia80,ch:+id,log:o.log,res:o.cierre&&o.cierre.res||null,enviado:false,liberada:true});
 if(propia)arLoad(chNuevo(+id));else S.chSt[id]=chNuevo(+id);
 S.hist.push({t:fmtF(hoy)+' '+hhmm(),q:quien(),x:'Liberó la ruta de hoy de '+chofN(id)+' (no mandó su cierre '+del80(o.rutaDia80)+')'});S.rutaAv=S.rutaAv||{};S.rutaAv[id]=(S.rutaAv[id]||[]).concat(['El administrador liberó tu ruta de hoy. Lo de antes lo cuadras con él.']);
 if(S.libPide86&&S.libPide86[id])S.libPide86[id]=null;toast('Listo: '+chofN(id)+' ya tiene su ruta de hoy. Lo que traía te queda en Rutas para recibirlo.')}
