/* ===================== TEMA · Revisión antes del arranque (26 nov · punto 44 de la nueva numeración) =====================
   Ricardo pidió revisar toda la app. Se arregla:
   1) "Borrar los datos de prueba" (Ajustes) era de la versión 6.2 y no conocía lo nuevo. Ahora también borra: periodo de arranque (vuelve
      a empezar solo), préstamos a empleados, banco, cobros pendientes ("Voy a cobrarle"), adelantos, bonos, préstamos del negocio,
      pendientes de choferes, avisos de ruta, taras con proveedores, efectivo de viajes, el conteo inicial de cajas (cajasT0) y, de cada
      empleado, sus pagos de sueldo/aguinaldo/faltas de prueba (la primera semana real empieza el día siguiente al borrado).
      La ruta de cada chofer también se vacía en la nube (antes solo en este celular y la nube la regresaba).
      Al terminar pregunta "¿Cuánto efectivo hay hoy?" (es con lo que empieza la caja). Queda la hora del borrado en cfg.reset44.
      (No se hace que los demás celulares borren solos: uno recién instalado podría borrar los datos reales que acaba de bajar.)
   2) Préstamo a un empleado: avisa si en la caja no alcanza (deja prestar de todos modos).
   3) Doble toque: aguinaldo (mitad, resto, ajuste), préstamo, banco, "Voy a cobrarle" y cancelar viaje entran a la protección de 1 s.
   4) Botón "No pude tomarla" (foto obligatoria del chofer) más grande.
   ============================================================================================ */
(function () {
  var st = document.createElement('style');
  st.textContent = '.fotono{min-height:44px!important;padding:0 14px!important;font-size:15px!important}';
  document.head.appendChild(st);
})();
/* ---------- 3) doble toque ---------- */
try { DOBLE_RE = new RegExp(DOBLE_RE.source.replace(')$', '|ag36mitad|ag36resto|ag36ajok|pr39abok|bdep34ok|vc40q|vc40ya|c43si|rec36wa|wzfin)$')); } catch (e) {}
/* ---------- 2) préstamo: ¿alcanza la caja? ---------- */
try {
  var _pr44 = WZ.prest39.pasos[WZ.prest39.pasos.length - 1].html;
  WZ.prest39.pasos[WZ.prest39.pasos.length - 1].html = function (d) {
    var h = _pr44.apply(this, arguments);
    try { var c = r2(cajaEsp()), m = num(d.m); if (m > c + 0.5) h = '<div class="card alert" style="padding:10px 12px;margin-bottom:6px"><b>⚠️ En la caja solo debería haber ' + money(Math.max(0, c)) + '.</b><div class="lbl">Puedes prestar de todos modos (por ejemplo, si el dinero sale de tu bolsa), pero la caja quedará en negativo hasta que lo registres.</div></div>' + h; } catch (e) {}
    return h;
  };
} catch (e) {}
/* ---------- 1) borrar los datos de prueba: todo lo nuevo ---------- */
var B44 = {
  arr: ['adelantos', 'bonos', 'prestamos', 'bancoMov', 'prest39', 'vcob40', 'extras', 'mayPide', 'otrosPend', 'rutaAdd', 'rutaQuit', 'sinTrabajo', 'arStops', 'gchRev'],
  obj: ['pendCh', 'permOk', 'rutaAv', 'rutaAcep', 'tarasProv', 'atiende', 'hoyOk', 'resDia', 'later30'],
  cero: ['vjEfeOut', 'vjEfeBack', 'cajasT0'],
  emp: ['pagoHasta118', 'agui118', 'aguiP36', 'aguiAj36', 'faltas118', 'asis118', 'finiq118', 'baja118']
};
function b44Local() {
  B44.arr.forEach(function (k) { S[k] = []; });
  B44.obj.forEach(function (k) { S[k] = {}; });
  B44.cero.forEach(function (k) { S[k] = 0; });
  delete S.arr33; S.vc40 = null; S.pr39ab = null; S.bdep34 = null;
  var ayer = iso(new Date(TODAY.getTime() - 864e5));
  (S.choferes || []).forEach(function (c) {
    if (!c) return; B44.emp.forEach(function (k) { delete c[k]; });
    if (c.sz) { c.sz.dias = 0; c.sz.cv = 0; c.sz.kv = 0; }
    c.pagoHasta118 = ayer; /* la primera semana real empieza hoy */
  });
  try { Object.keys(S.invB || {}).forEach(function (b) { var I = S.invB[b]; if (I) Object.keys(I).forEach(function (k) { if (typeof I[k] === 'number') I[k] = 0; }); }); } catch (e) {}
}
var _bp44 = borrarPrueba;
borrarPrueba = function () {
  b44Local();
  var r = _bp44.apply(this, arguments);
  try {
    /* la ruta de CADA chofer también se borra en la nube (antes solo se vaciaba la copia de este celular y la nube la regresaba) */
    var ids = []; try { ids = nbRutaIds(); } catch (e) {} (S.choferes || []).forEach(function (c) { if (c && esCh(c) && ids.indexOf(+c.id) < 0) ids.push(+c.id); });
    S.chSt = S.chSt || {}; ids.forEach(function (id) { if (+id === +S.chofHoy) return; try { S.chSt[id] = chNuevo(+id); } catch (e) {} });
    S.cfg = S.cfg || {}; S.cfg.reset44 = Date.now();
    S.b44 = { m: '' };
    render();
  } catch (e) { console.error('b44', e); }
  return r;
};
var _rd44 = render;
render = function () {
  var r = _rd44.apply(this, arguments);
  try { ovPon70('b44ov', b44HTML()); } catch (e) {}
  return r;
};
/* después de borrar: ¿con cuánto efectivo empiezas? */
function b44HTML() {
  var x = S.b44; if (!x || S.role !== 'admin') return '';
  return ovW70('b44ov', '💵 ¿Cuánto efectivo hay hoy?', '<div class="lbl">Cuenta TODO el efectivo del negocio (también el de tu casa). Con eso empieza la caja.</div>'
    + '<div class="field grande"><label for="b44m">Efectivo en caja $</label><input id="b44m" type="number" inputmode="decimal" data-bind="b44.m" value="' + esc(x.m || '') + '"></div>'
    + '<button class="btn" style="width:100%;min-height:56px;margin-top:10px" data-act="b44ok">Guardar</button><button class="btn sec" style="width:100%;margin-top:8px" data-act="b44x">Después</button>', 'b44x');
}
document.addEventListener('click', function (e) {
  var b = e.target.closest && e.target.closest('[data-act="b44ok"],[data-act="b44x"]'); if (!b) return;
  e.preventDefault(); e.stopImmediatePropagation();
  if (b.dataset.act === 'b44x') { S.b44 = null; render(); return; }
  var m = num(S.b44 && S.b44.m); if (!(m >= 0) || String((S.b44 || {}).m).trim() === '') { toast('Escribe cuánto efectivo hay'); return; }
  /* la caja debe dar exactamente lo contado: se ajusta la base de la caja */
  try { var antes = cajaEsp(); S.cajaBase = r2(num(S.cajaBase) + (m - antes)); } catch (er) {}
  S.hist.push({ t: fmtF(iso(TODAY)) + ' ' + hhmm(), q: quien(), x: 'Empezó la caja con ' + money(m) + ' (después de borrar los datos de prueba)' });
  S.b44 = null; toast('Listo: la caja empieza con ' + money(m)); render();
}, true);
/* ---------- 5) cuenta nueva: en "¿Qué subimos a la nube?" el botón principal es "Empezar desde cero" (subir lo del celular subiría las pruebas) ---------- */
if (typeof nbOvHTML === 'function') {
  var _nbo44 = nbOvHTML;
  nbOvHTML = function () {
    var h = _nbo44.apply(this, arguments);
    try {
      if (h && h.indexOf('data-nb="subir"') > -1 && h.indexOf('data-nb="cero"') > -1) {
        var bs = '<button class="nbbtn" data-nb="subir">Subir lo que tiene este celular</button>', bc = '<button class="nbsec" data-nb="cero">Empezar desde cero</button>';
        if (h.indexOf(bs) > -1 && h.indexOf(bc) > -1) h = h.replace(bs, '').replace(bc, '<button class="nbbtn" data-nb="cero">Empezar desde cero (recomendado)</button><button class="nbsec" data-nb="subir">Subir lo que tiene este celular (solo si son datos reales)</button>');
      }
    } catch (e) {}
    return h;
  };
}
