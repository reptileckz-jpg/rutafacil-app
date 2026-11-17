/* ===================== TEMA · Quién reparte (aplanado el 17 nov) =====================
   Antes estaba repartido en envolturas encadenadas en l47, l83, l85 y l90. Aquí está todo junto, en el MISMO orden,
   y hace exactamente lo mismo. Se arma AL FINAL (después de tema-avisos.js), en build.sh.
   Si se cambia algo de quién reparte, se cambia AQUÍ (no se agregan envolturas en capas nuevas).

   - chs81, chofsDia57, pedChoferes: qué choferes cuentan (en Rutas, en el día, para un pedido). El administrador solo si
     prendió "¿Repartes hoy?" (admRep85); para pedidos, tampoco el que trae un vehículo que no es de reparto (esAuto).
   - choferes75: al importar clientes, el administrador queda al final de la lista de choferes.
   - sinCh81: "Sin chofer" también trae los clientes del administrador cuando hoy no reparte.
   - arTiene: si hay "Mi ruta de hoy" para el administrador.
   - toma81: los cambios de Rutas le llegan al chofer en camino (y al administrador en su ruta); aviso "Ya no vayas con X".
   Las funciones que usan los pasos (ADM85, admRep85, lista81, loc83, vivos90, quien90…) siguen en su capa.
   OJO: mig85 (l85) usa _chs81Base (todos los choferes, sin quitar al administrador).
   ============================================================================================ */

/* ---------- qué choferes cuentan ---------- */
/* l85 · 64 · el administrador no reparte salvo que prenda "¿Repartes hoy?" (solo en la app real) */
function sinAdm85(L){return MODO!=='vacio'||admRep85()?L:L.filter(function(c){return !esAdm(c)})}
var _chs81Base=chs81;
chs81=function(){return sinAdm85(_chs81Base.apply(this,arguments))};
var _chofsDia57Base=chofsDia57;
chofsDia57=function(){return sinAdm85(_chofsDia57Base.apply(this,arguments))};
var _pedChoferesBase=pedChoferes;
pedChoferes=function(){var L=_pedChoferesBase.apply(this,arguments);
 /* l47 · a un pedido no se le asigna quien trae un vehículo que no es de reparto */
 L=L.filter(function(ch){var vid=vehAsig(ch.id),v=vid!=null?vehById(+vid):null;return !(v&&v.esAuto)});
 /* l85 · ni el administrador si hoy no reparte */
 return sinAdm85(L)};

/* ---------- l85 · importar: con "Chofer" vacío ya no se los da al administrador (queda al final de la lista) ---------- */
var _choferes75Base=choferes75;
choferes75=function(modo){var L=_choferes75Base.apply(this,arguments);if(modo==='su')return L;return L.filter(function(x){return +x.ref!==ADM85}).concat(L.filter(function(x){return +x.ref===ADM85}))};

/* ---------- l85 · "sin chofer": los clientes del administrador cuando no reparte ---------- */
var _sinCh81Base=sinCh81;
sinCh81=function(f){var L=_sinCh81Base.apply(this,arguments);if(MODO!=='vacio'||admRep85())return L;var d=dDe81(f),ya={};L.forEach(function(c){ya[c.id]=1});
 S.cli.forEach(function(c){if(c.oculto||ya[c.id]||+c.chofer!==ADM85)return;if(ovDe81(f,c.id)!==undefined)return;if(c.dias&&c.dias.indexOf(d)>-1||c.extra===f)L.push(c)});return L};

/* ---------- l85 · "Mi ruta de hoy" del administrador: solo si reparte hoy, con lo que se pasó en Rutas ---------- */
var _arTieneBase=arTiene;
arTiene=function(){if(MODO!=='vacio')return _arTieneBase.apply(this,arguments);if(!admRep85())return !!S.arOn;return !!S.arSt||lista81(ADM85,iso(TODAY)).L.some(function(x){return !x.done})};

/* ---------- los cambios de Rutas le llegan al chofer en camino ---------- */
var _toma81Base=toma81;
/* l83 · cada cambio se aplica una sola vez en este celular (lo que ya se tomó queda anotado) */
function toma83(){try{if(S.chofHoy!=null){var f=hoy81(),Q=(S.rq81||{})[f],id=+S.chofHoy;if(Q){var L=loc83(),ch=false;Object.keys(Q).forEach(function(k){var x=Q[k];if(!x||+x.ch!==id||x.hecho)return;
   if(L[k]){x.hecho=1;ch=true;return}
   if(x.op==='add'&&(S.stops||[]).some(function(s){return +s.c===+x.c})){x.hecho=1;L[k]=1;ch=true}});if(ch)locPon83(L)}}}catch(e){}
 var r=_toma81Base.apply(this,arguments);
 try{if(S.chofHoy!=null){var Q2=(S.rq81||{})[hoy81()],L2=loc83(),ch2=false;if(Q2)Object.keys(Q2).forEach(function(k){var x=Q2[k];if(x&&+x.ch===+S.chofHoy&&x.hecho&&!L2[k]){L2[k]=1;ch2=true}});if(ch2)locPon83(L2)}}catch(e){}return r}
/* l90 · 86/88 · el administrador en su propia ruta también recibe los cambios; si le quitan un cliente: "Ya no vayas con X" */
toma81=function(){
 var ar=!!S.arOn&&S.role==='rep';if(S.arOn&&!ar)return toma83.apply(this,arguments);
 var antes=vivos90(),i0=curStop(),sig0=i0>=0&&S.stops[i0]?+S.stops[i0].c:null,ent=S.role==='rep'&&S.tab.rep==='entrega',hoy=hoy81(),Q=(S.rq81||{})[hoy]||{},quit={};
 Object.keys(Q).forEach(function(k){var x=Q[k];if(x&&+x.ch===+S.chofHoy&&!x.hecho&&x.op!=='add')quit[+x.c]=1});
 /* si está entregándole justo a ese cliente, sale de la entrega para que se pueda quitar */
 var salio=false;if(ent&&sig0!=null&&quit[sig0]){S.tab.rep='ruta';salio=true}
 if(ar)S.arOn=false;var r;try{r=toma83.apply(this,arguments)}finally{if(ar)S.arOn=true}
 try{var ahora=vivos90(),fuera=antes.filter(function(c){return quit[c]&&ahora.indexOf(c)<0});
  if(fuera.length){var i1=curStop(),c1=i1>=0&&S.stops[i1]?cl(S.stops[i1].c):null;
   S.av90={f:hoy,L:fuera.map(function(c){var x=cl(c);return {n:x?x.n:'Un cliente',q:quien90(c)}}),era:sig0!=null&&fuera.indexOf(sig0)>-1,ent:salio,sig:c1?c1.n:null,h:hhmm()};
   try{natNotif('⚠️ Te quitaron '+(fuera.length===1?'un cliente':fuera.length+' clientes'),S.av90.L.map(function(x){return 'Ya no vayas con '+x.n}).join('. '))}catch(e){}}
  else if(salio)S.tab.rep='entrega'}catch(e){console.error('l90 av',e)}
 return r};
