/* ===================== TEMA · Cerrar la ruta el mismo día = regresar a la bodega y hacer su cierre (21 nov · punto 20 de la nueva numeración) =====================
   Ricardo: "si se le cierra la ruta el mismo día que se abre, que no cuente como atrasada; si vendió algo se haga el cierre de eso que vendió; si no
   está en la bodega, en automático la app le pone la ubicación de la bodega para que se dirija allá y entregue lo que tiene, a menos que se le haya
   cerrado para ir a un viaje de carga. Si después vuelve a arrancar su ruta, vuelve a hacer todo desde 0 y es un cierre 2. Si no ha regresado a la
   bodega y tiene cajas arriba y se le agregan pedidos, no hace falta tomar las fotos del inicio: continúa y se abre su cierre de nuevo; el cierre #2
   solo cuando ya llegó a la bodega y entregó el efectivo". Detalles decididos con él: solo puede entregar los pedidos que le agregue el
   administrador mientras regresa; la vuelta 2 pide odómetro, fotos y carga (la revisión del vehículo ya la hizo ese día); se queda "Cerrar ya,
   sin esperar" para emergencias (19).
   Cómo queda:
     1) Rutas → "🔄 Cerrar su ruta" (19) en una ruta de HOY: "🏭 Que regrese a la bodega y haga su cierre" o "🚛 Va a un viaje de carga: que haga su
        cierre ahora". Se guarda en su ruta (r~chofer~reg20, viaja por la nube) y le llega el aviso.
     2) En el celular del chofer:
        · Bodega: arriba de su Ruta, "🏭 Regresa a la bodega a cerrar tu vuelta" con "Cómo llegar" y "Ya llegué: hacer mi cierre" (si ya está a
          menos de ~300 m de la bodega, se lo dice). Sus demás clientes quedan EN PAUSA (no se pueden entregar); los PEDIDOS que le agregues sí
          (van primero). No sale "Cargar más".
        · Viaje de carga: "🚛 Te toca un viaje de carga: haz tu cierre ahora" → su cierre, donde esté.
        · Es su cierre NORMAL (#1 del día) con lo que vendió: no es atrasado. Al mandarlo se quita lo de "regresa".
     3) Si le agregas pedidos después de mandar su cierre y todavía no le recibes el efectivo, se reabre ESE cierre y sigue (ya era así, "seguir");
        no se le piden fotos de nuevo.
     4) Si sale otra vez cuando ya le recibiste el efectivo: cierre #2 (ya era así) y ahora "Antes de salir" otra vez con odómetro y carga
        (la revisión del vehículo de ese día se conserva y, como decidió el 137 de antes, las fotos con que regresó ya cuentan como las de salida).
     5) En Rutas, su tarjeta dice "🏭 Regresando a la bodega · trae $…, N cajas, M kg" mientras tanto.
   Blindaje: no mueve dinero ni inventario por sí mismo; todo pasa por el cierre y la recepción de siempre. Las paradas en pausa no se borran
   (siguen en su ruta para la vuelta 2 o se anotan como no visitadas al cambiar de día, como siempre). Se arma al final.
   ============================================================================================ */
try { if (typeof AR_K !== 'undefined' && AR_K.indexOf('reg20') < 0) AR_K.push('reg20'); } catch (e) {}
function reg20Activo() {
  try { var x = S.reg20; return S.role === 'rep' && !!x && x.f === iso(TODAY) && !(S.cierre && S.cierre.sent) && !S.arOn; } catch (e) { return false; }
}
function reg20Bodega() { return reg20Activo() && S.reg20.para !== 'viaje'; }
function reg20Ped(s) { return !!(s && s.ped && !s.done); }
function reg20Cerca() {
  try { var b = typeof km180Bod === 'function' ? km180Bod() : null, p = S.pos; if (!b || !p || p.lat == null) return false; var d = kmE(p, b); return d != null && d <= 0.3; } catch (e) { return false; }
}
/* ---------- administrador: pedirlo ---------- */
document.addEventListener('click', function (e) {
  var b = e.target.closest && e.target.closest('[data-act="reg20"],[data-act="reg20x"]'); if (!b) return;
  e.preventDefault(); e.stopImmediatePropagation();
  var id = +b.dataset.id, o = cero19Ruta(id); if (!o) return;
  if (b.dataset.act === 'reg20x') {
    nbRSet(id, 'reg20', null);
    S.rutaAv = S.rutaAv || {}; S.rutaAv[id] = (S.rutaAv[id] || []).concat(['Ya no tienes que regresar: sigue con tu ruta.']);
    try { S.hist.push({ t: fmtF(iso(TODAY)) + ' ' + hhmm(), q: quien(), x: 'Le dijo a ' + chofN(id) + ' que siga con su ruta (ya no regresa)' }); } catch (er) {}
    toast(chofN(id) + ' sigue con su ruta'); render(); return;
  }
  var para = b.dataset.v === 'viaje' ? 'viaje' : 'bodega';
  nbRSet(id, 'reg20', { f: iso(TODAY), h: hhmm(), q: quien(), para: para });
  S.rutaAv = S.rutaAv || {};
  S.rutaAv[id] = (S.rutaAv[id] || []).concat([para === 'viaje' ? 'El administrador te pidió hacer tu cierre ahora: te toca un viaje de carga.' : 'El administrador te pidió regresar a la bodega a cerrar tu vuelta. Si te agrega pedidos, entrégalos antes de llegar.']);
  try { S.hist.push({ t: fmtF(iso(TODAY)) + ' ' + hhmm(), q: quien(), x: (para === 'viaje' ? 'Le pidió a ' + chofN(id) + ' hacer su cierre para un viaje de carga' : 'Le pidió a ' + chofN(id) + ' regresar a la bodega a hacer su cierre') }); } catch (er) {}
  toast(para === 'viaje' ? 'Listo: ' + chofN(id) + ' hace su cierre para su viaje' : 'Listo: ' + chofN(id) + ' regresa a la bodega a hacer su cierre');
  S.tab.admin = 'rutas'; render(); window.scrollTo(0, 0);
}, true);
/* su tarjeta en Rutas */
function reg20Rutas() {
  if (S.role !== 'admin' || S.encOn || S.tab.admin !== 'rutas') return;
  Array.prototype.forEach.call(document.querySelectorAll('main [data-x="ch92"][data-id]'), function (cd) {
    var id = +cd.dataset.id, o = cero19Ruta(id); if (!o || !o.reg20 || (o.cierre && o.cierre.sent) || o.reg20.f !== iso(TODAY) || cd.querySelector('[data-x="reg20a"]')) return;
    var d = null; try { d = rutaDet6(o); } catch (e) {}
    var t = (o.reg20.para === 'viaje' ? '🚛 Haciendo su cierre para un viaje de carga' : '🏭 Regresando a la bodega a hacer su cierre') + (d ? ' · trae ' + money(d.efectivo) + (Math.max(d.reg, d.camR) ? ', ' + Math.max(d.reg, d.camR) + ' cajas' : '') + (Math.max(d.regK, d.camM) ? ', ' + Math.max(d.regK, d.camM) + ' kg' : '') : '');
    var row = cd.querySelector('.row'); var x = '<div class="card note" data-x="reg20a" style="padding:8px 12px;margin:8px 0 0;font-size:15px"><b>' + esc(t) + '</b></div>';
    if (row) row.insertAdjacentHTML('afterend', x); else cd.insertAdjacentHTML('afterbegin', x);
  });
}
/* ---------- chofer ---------- */
/* sus demás clientes en pausa: la siguiente parada es un pedido que le agregaron (si hay) */
var _cS20 = curStop;
curStop = function () {
  var i = _cS20.apply(this, arguments);
  try {
    if (!reg20Bodega()) return i;
    if (i >= 0 && reg20Ped(S.stops[i])) return i;
    for (var k = 0; k < S.stops.length; k++) if (reg20Ped(S.stops[k])) return k;
    return -1;
  } catch (e) { return i; }
};
window.addEventListener('click', function (e) {
  var b = e.target.closest && e.target.closest('[data-act="entregar"]'); if (!b || !reg20Bodega()) return;
  var s = S.stops[+b.dataset.i]; if (reg20Ped(s)) return;
  e.preventDefault(); e.stopImmediatePropagation();
  toast('En pausa: el administrador te pidió regresar a la bodega a cerrar tu vuelta');
}, true);
function reg20Card() {
  if (!reg20Activo() || S.tab.rep !== 'ruta') return;
  var m = document.querySelector('main'); if (!m || m.querySelector('[data-x="reg20"]')) return;
  var x = S.reg20, d = document.createElement('div'); d.className = 'card'; d.dataset.x = 'reg20';
  d.setAttribute('style', 'padding:14px;border:3px solid #1E3A8A;background:color-mix(in srgb,#1E3A8A 8%,var(--surface))');
  if (x.para === 'viaje') {
    d.innerHTML = '<div class="lbl" style="font-weight:800;color:#1E3A8A">EL ADMINISTRADOR TE PIDIÓ</div><div style="font-size:21px;font-weight:900;margin-top:2px">🚛 Te toca un viaje de carga</div><div style="font-size:16px;margin-top:4px">Haz tu cierre ahora con lo que vendiste.</div>'
      + '<button class="btn" style="margin-top:10px;min-height:58px;font-size:18px;width:100%" data-act="reg20ci">Hacer mi cierre</button>';
  } else {
    var ped = (S.stops || []).filter(reg20Ped).length, pausa = (S.stops || []).filter(function (s) { return s && !s.done && !s.ped; }).length, B = typeof bodLugar110 === 'function' ? bodLugar110() : { lat: null }, cerca = reg20Cerca();
    d.innerHTML = '<div class="lbl" style="font-weight:800;color:#1E3A8A">EL ADMINISTRADOR TE PIDIÓ</div><div style="font-size:21px;font-weight:900;margin-top:2px">🏭 Regresa a la bodega a cerrar tu vuelta</div>'
      + (ped ? '<div style="font-size:16px;margin-top:4px">Primero entrega ' + (ped === 1 ? 'tu <b>pedido</b>' : 'tus <b>' + ped + ' pedidos</b>') + ' y luego a la bodega.</div>' : '')
      + (pausa ? '<div class="lbl" style="margin-top:4px">' + (pausa === 1 ? 'Tu otro cliente queda en pausa.' : 'Tus otros ' + pausa + ' clientes quedan en pausa.') + '</div>' : '')
      + (cerca ? '<div style="font-size:16px;margin-top:6px;font-weight:800">✓ Ya estás en la bodega</div>' : (B.lat != null ? '<a class="btn sec" style="margin-top:10px;min-height:54px;display:flex;align-items:center;justify-content:center" href="https://www.google.com/maps/dir/?api=1&destination=' + B.lat + ',' + B.lng + '" target="_blank" rel="noopener">📍 Cómo llegar a la bodega</a>' : ''))
      + '<button class="btn" style="margin-top:8px;min-height:58px;font-size:18px;width:100%" data-act="reg20ci">' + (cerca ? 'Hacer mi cierre' : 'Ya llegué: hacer mi cierre') + '</button>';
  }
  var h = m.querySelector('.hola89, .hello'); if (h) h.after(d); else m.prepend(d);
}
document.addEventListener('click', function (e) {
  var b = e.target.closest && e.target.closest('[data-act="reg20ci"]'); if (!b) return;
  e.preventDefault(); e.stopImmediatePropagation();
  S.tab.rep = 'cierre'; S.cierreP = 0; render(); window.scrollTo(0, 0);
}, true);
/* mientras regresa no sale "Cargar más" */
if (typeof cargar10Toca === 'function') { var _c10T20 = cargar10Toca; cargar10Toca = function () { if (reg20Activo()) return false; return _c10T20.apply(this, arguments); }; }
/* ya mandó su cierre: se quita lo de "regresa" */
function reg20Limpia() { try { if (S.role === 'rep' && S.reg20 && ((S.cierre && S.cierre.sent) || S.reg20.f !== iso(TODAY))) S.reg20 = null; } catch (e) {} }
/* ---------- 4) vuelta 2 (cierre #2): otra vez "Antes de salir" con odómetro, fotos y carga ---------- */
/* se cuenta ANTES de que la app agregue el cierre #2 (por eso va "capture") */
window.addEventListener('click', function (e) {
  var b = e.target.closest && e.target.closest('[data-act="seguir"]'); if (!b || S.role !== 'rep') return;
  var n0 = (S.cierresPrev || []).length;
  setTimeout(function () {
    try {
      if ((S.cierresPrev || []).length <= n0 || !S.cierre || S.cierre.sent) return;   /* solo cuando empezó un cierre #2 */
      var ins = S.inspR, ft = S.salida && S.salida.fotos ? JSON.parse(JSON.stringify(S.salida.fotos)) : { frente: null, atras: null, izq: null, der: null };
      /* 137 de antes: las fotos con que regresó ya pasaron a ser las de salida → no se vuelven a pedir; se piden odómetro y carga */
      S.salida = { ok: false, fotos: ft, fotosFin: { frente: null, atras: null, izq: null, der: null }, R: '', M: '', err: '', v2: 1 };
      S.inspR = ins;   /* la revisión del vehículo de hoy se conserva */
      S.reg20 = null; S.tab.rep = 'ruta';
      toast('Vuelta 2: haz "Antes de salir" (odómetro y carga; tus fotos de regreso ya cuentan como las de salida)');
      render(); window.scrollTo(0, 0);
    } catch (er) { console.error('reg20 v2', er); }
  }, 0);
}, true);
var _rd20 = render;
render = function () {
  try { reg20Limpia(); } catch (e) {}
  var r = _rd20.apply(this, arguments);
  try { reg20Card(); reg20Rutas(); } catch (e) { console.error('reg20', e); }
  return r;
};
