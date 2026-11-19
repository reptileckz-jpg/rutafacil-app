/* ===================== v8.5 · puntos 64–66 (16 nov) · 63 ya quedó en la 8.4
   64 El administrador NO reparte salvo que lo diga: interruptor "¿Repartes hoy?" en Inicio (apagado; se puede prender más tarde;
      al otro día se apaga solo). Apagado: no sale en Rutas, no se le arma ruta, no se le asigna nada (importar, pedidos, "Asignar todos").
      Prendido: sale como chofer con ruta vacía y él se pasa clientes en Rutas. Sus clientes fijos (del importador) pasan a Danu (una vez).
   65 Cliente "sin días": al pasarlo a un chofer en Rutas se preguntan sus días y queda FIJO con ese chofer.
   66 No visitados: solo se meten al día siguiente si su siguiente visita está a 2 días o más, o si ya fallaron 2 visitas seguidas
      (y te avisa "se está quedando sin visita"); si le toca mañana, espera a su día sin aviso. ===================== */
var ADM85=2;
function admRep85(){return (S.admRep85||'')===iso(TODAY)}
try{['admRep85','mig85'].forEach(function(k){if(NB_SH.indexOf(k)<0)NB_SH.push(k)})}catch(e){}
/* ---------- 64 · quién cuenta como chofer ---------- */
/* chs81: pasó a tema-reparte.js */
/* pedChoferes: pasó a tema-reparte.js */
/* chofsDia57: pasó a tema-reparte.js */
/* importar: con "Chofer" vacío ya no se los da al administrador (queda al final de la lista) */
/* choferes75: pasó a tema-reparte.js */
/* la ruta del administrador empieza vacía (él se pasa clientes en Rutas) */
/* → movido (tema-rutadia.js) */
/* "sin chofer": los clientes del administrador cuando no reparte */
/* sinCh81: pasó a tema-reparte.js */
/* "Mi ruta de hoy" del administrador: solo si reparte hoy, con lo que se pasó en Rutas */
/* arTiene: pasó a tema-reparte.js */
window.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act="arentrar"]');if(!b||MODO!=='vacio'||S.arSt)return;try{S.arStops=lista81(ADM85,iso(TODAY)).L.filter(function(x){return !x.done}).map(function(x){return x.c})}catch(er){}},true);
/* el interruptor en Inicio */
function admSw85(){if(MODO!=='vacio'||S.role!=='admin'||S.encOn||S.tab.admin!=='inicio'||S.rt81)return;var m=document.querySelector('main');if(!m||m.querySelector('[data-x="adm85"]'))return;var on=admRep85(),n=on?lista81(ADM85,iso(TODAY)).L.filter(function(x){return !x.done}).length:0;
 var d=document.createElement('div');d.dataset.x='adm85';d.className='card'+(on?' good':'');d.style.padding='12px 14px';
 d.innerHTML='<div class="row" style="align-items:center"><span style="flex:1"><b style="font-size:18px">🚚 ¿Repartes hoy?</b><br><span class="lbl">'+(on?'Sí: sales en Rutas como chofer'+(n?' · llevas '+n+' cliente'+(n===1?'':'s'):' · todavía sin clientes: pásatelos en Rutas'):'No: la app no cuenta contigo para repartir. Si sales a ayudar, préndelo.')+'</span></span><button class="btn sm'+(on?' sec':'')+'" data-act="adm85" style="width:auto;min-width:110px">'+(on?'Ya no reparto':'Sí, hoy reparto')+'</button></div>';
 var ref=m.querySelector('[data-x="rt81e"]');if(ref)ref.before(d);else m.prepend(d)}
window.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act="adm85"]');if(!b)return;e.stopImmediatePropagation();var hoy=iso(TODAY);
 if(!admRep85()){S.admRep85=hoy;S.hist.push({t:fmtF(hoy)+' '+hhmm(),q:quien(),x:'Hoy sí reparte (el administrador)'});toast('Listo: hoy sales como chofer. Pásate clientes en Rutas.');render();return}
 var pend=lista81(ADM85,hoy).L.filter(function(x){return !x.done});if(pend.length){S.rt81={dia:'hoy',sel:{}};pend.forEach(function(x){S.rt81.sel[x.c+'|'+ADM85]=1});toast('Tienes '+pend.length+' cliente'+(pend.length===1?'':'s')+': pásalos a otro chofer y luego apágalo');render();return}
 S.admRep85='';S.hist.push({t:fmtF(hoy)+' '+hhmm(),q:quien(),x:'Ya no reparte hoy (el administrador)'});toast('Listo: hoy no cuentas como chofer');render()},true);
/* una vez: los clientes fijos del administrador (los puso el importador) pasan al chofer de verdad */
function mig85(){if(MODO!=='vacio'||S.mig85||S.role!=='admin'||!(S.setup&&S.setup.fin))return;if(typeof NB!=='undefined'&&NB.on&&!NB.listo)return;var D=_chs81Base().filter(function(c){return !esAdm(c)})[0];if(!D)return;var hoy=iso(TODAY),d=TODAY.getDay(),n=0,hoyL=[];
 S.cli.forEach(function(c){if(c.oculto||+c.chofer!==ADM85)return;c.chofer=+D.id;n++;if(c.dias&&c.dias.indexOf(d)>-1)hoyL.push(c.id)});
 if(!admRep85()&&hoyL.length){var r=(S.chSt||{})[ADM85];hoyL.forEach(function(cid){var hecho=r&&(r.stops||[]).some(function(s){return +s.c===cid&&s.done});if(hecho)return;ovPon81(hoy,cid,+D.id);op81(+D.id,'add',cid)});if(r&&Array.isArray(r.stops))r.stops=r.stops.filter(function(s){return s.done})}
 S.mig85=hoy;if(n){S.hist.push({t:fmtF(hoy)+' '+hhmm(),q:'App',x:n+' clientes que tenía el administrador como chofer pasaron a '+chofN(D.id)});(S.avPrecio=S.avPrecio||[]).push(n+' clientes que tenías como chofer fijo pasaron a '+chofN(D.id)+'. Si un día sales a repartir, prende "¿Repartes hoy?" en Inicio.')}}

/* ---------- 65 · cliente "sin días": al pasarlo se preguntan sus días ---------- */
var DS85=[[1,'Lun'],[2,'Mar'],[3,'Mié'],[4,'Jue'],[5,'Vie'],[6,'Sáb'],[0,'Dom']];
function sinD85(){var R=S.rt81;return Object.keys((R&&R.sel)||{}).map(function(k){return cl(+k.split('|')[0])}).filter(function(c){return c&&!(c.dias&&c.dias.length)})}
/* sheet84: pasó a tema-piezas.js */
document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('#rt81 [data-act="rt85d"]');if(!b||!S.rt81)return;e.preventDefault();e.stopImmediatePropagation();var R=S.rt81,v=+b.dataset.v;R.dias85=R.dias85||[];var i=R.dias85.indexOf(v);if(i>-1)R.dias85.splice(i,1);else R.dias85.push(v);pon84()},true);
/* aplica83: pasó a tema-rutas.js */

/* ---------- 66 · no visitados: solo si su siguiente visita está lejos o ya falló 2 veces ---------- */
function dHasta85(c){if(!c||!c.dias||!c.dias.length)return 99;var d=TODAY.getDay();for(var k=0;k<7;k++)if(c.dias.indexOf((d+k)%7)>-1)return k;return 99}
var _pd85=pendDe81;
pendDe81=function(r){var L=_pd85.apply(this,arguments);if(MODO!=='vacio')return L;return L.filter(function(cid){var c=cl(+cid);if(!c)return false;var k=dHasta85(c),f=c.falla85&&num(c.falla85.n)||0;return k===0||k>=2||f>=2})};
function fallas85(r,f0){try{if(!r||!f0)return;_pd85(r).forEach(function(cid){var c=cl(+cid);if(!c)return;var o=c.falla85||{n:0,f:''};if(o.f===f0)return;c.falla85={n:num(o.n)+1,f:f0};var k=dHasta85(c);
  if(k>=2||c.falla85.n>=2){var t=c.n+' se está quedando sin visita ('+(c.falla85.n>=2?'falló '+c.falla85.n+' visitas seguidas':'su siguiente visita es en '+(k>=99?'(sin días)':k+' días'))+'): va en la ruta de hoy.';if((S.avPrecio||[]).indexOf(t)<0)(S.avPrecio=S.avPrecio||[]).push(t)}})}catch(e){}}
/* → movido (tema-rutadia.js) */
/* → movido (tema-rutadia.js) */
/* al entregarle, se le borran las fallas */
function fallaLimpia85(){(S.cli||[]).forEach(function(c){if(c.falla85&&c.ult&&c.ult>=c.falla85.f)c.falla85=null})}

/* render: pasó a tema-dibujar1.js */
