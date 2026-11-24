/* ===================== TEMA · El aviso "Las taras no cuadran por lugar" ya no se equivoca y dice qué falló (24 nov · punto 32 de la nueva numeración) =====================
   Revisión con 7 revisores independientes (concepts_brief.md, Etapa 0). Ricardo dio permiso (24 nov).
   1) La revisión "Las cajas cuadran con dónde están" (l5) compara las taras con clientes contra la suma de c.vac TAL COMO ESTÁ GUARDADO.
      Si un cliente traía "3" (texto) o el dato vacío —por ejemplo justo después de bajar de la nube, antes de redibujar— decía "no cuadra"
      aunque las cuentas sí cuadraban. Ahora, antes de revisar, cada número que se PUEDE leer se guarda como número (mismo valor: "3" → 3,
      "1,200" → 1200, vacío → 0). Un dato que no se puede leer ("abc") NO se cambia: la revisión sigue avisando.
   2) El aviso dice qué falló: si la suma por lugar no da el total (a) o si las taras de los clientes no se pueden leer (b), cuántos
      clientes y su número interno (nunca el nombre), y si pasó al redibujar o fuera.
   3) Antes, cuando un número no se podía leer, la app lo ponía en 0 y ese 0 se subía a la nube como si fuera una resta de verdad
      (sano68 usaba Number(), que no entiende "1,200"). Ahora lee con comas y, si de veras no se puede leer, lo deja como está y avisa.
   4) La lista de "Problemas reportados" ya no marca como "Arreglado en la 9.9" los reportes nuevos: solo los de antes del 19 nov.
   No mueve ninguna caja ni dinero. Se arma al final.
   ============================================================================================ */
var TAR32 = { enRender: false, d: null };
try { if (typeof PN_VER === 'undefined') window.PN_VER = (typeof APP_VER !== 'undefined' ? APP_VER : ''); } catch (e) {}
function num32Lee(v) { /* ¿es un número que se puede leer? (mismo criterio que num()) */
  if (typeof v === 'number') return isFinite(v) ? { ok: true, n: v } : { ok: false };
  if (v === undefined || v === null || v === '') return { ok: true, n: 0 };
  var s = String(v).replace(/,/g, '').trim();
  return /^-?\d*\.?\d+$/.test(s) ? { ok: true, n: parseFloat(s) } : { ok: false };
}
function taras32Limpia() {
  var malos = [];
  try {
    (S.cli || []).forEach(function (c) {
      if (!c || typeof c.vac === 'number') return;
      var r = num32Lee(c.vac); if (r.ok) c.vac = r.n; else if (!c.oculto) malos.push(c.id);
    });
  } catch (e) {}
  return malos;
}
var _cr32 = cuentasRevisar;
cuentasRevisar = function () {
  var malos = taras32Limpia();
  var w = null; try { w = cajasDonde(); } catch (e) {}
  TAR32.d = { malos: malos, w: w, fuera: !TAR32.enRender };
  return _cr32.apply(this, arguments);
};
/* el aviso que se manda dice qué falló (corto: el reporte se corta a 300 letras) */
var _ae32 = apErr;
apErr = function (tipo, txt, donde) {
  try {
    if (/^Las taras no cuadran por lugar/.test(String(txt || '')) && TAR32.d) {
      var d = TAR32.d, w = d.w || {}, sumPartes = num(w.vac) + num(w.llenas) + num(w.cam) + num(w.camV) + num(w.cli) + num(w.pv);
      var a = !(Math.abs(num(w.tot) - sumPartes) < 0.5);
      txt = String(txt).replace(/\. Es un error de la app.*$/, '') + ' · falla: ' + (a ? 'a (suma por lugar ≠ total ' + Math.round(sumPartes) + ')' : 'b (taras de clientes)')
        + (num(w.camV) ? ' · vacías en camión ' + num(w.camV) : '') + (num(w.atras2) ? ' · atrasados ' + num(w.atras2) : '')
        + (d.malos.length ? ' · clientes con dato ilegible: ' + d.malos.length + ' (id ' + d.malos.slice(0, 5).join(',') + ')' : '')
        + (d.fuera ? ' · fuera de redibujo' : ' · en redibujo');
    }
  } catch (e) {}
  return _ae32.call(this, tipo, txt, donde);
};
var _rd32 = render;
render = function () { TAR32.enRender = true; try { return _rd32.apply(this, arguments); } finally { TAR32.enRender = false; } };
/* 3) un número que no se puede leer ya no se vuelve 0 */
sano68 = function () {
  var malos = [], nom = [];
  try {
    var I = S.inv || {};
    ['verdes', 'maduras', 'kgVerde', 'kgMaduro', 'reparto', 'repartoKg', 'vacias'].forEach(function (k) {
      var v = I[k]; if (typeof v === 'number' && isFinite(v)) return;
      var r = num32Lee(v); if (r.ok) I[k] = r.n; else malos.push('Bodega: ' + k);
    });
    (S.cli || []).forEach(function (c) {
      ['vac', 'cred'].forEach(function (k) {
        var v = c[k]; if (typeof v === 'number' && isFinite(v)) return;
        var r = num32Lee(v); if (r.ok) c[k] = r.n; else { malos.push((k === 'vac' ? 'Taras' : 'Saldo') + ' del cliente #' + c.id); nom.push((k === 'vac' ? 'las taras' : 'el saldo') + ' de ' + (c.n || 'un cliente')); }
      });
    });
    if (S.cajasT0 != null) { var r0 = num32Lee(S.cajasT0); if (r0.ok) S.cajasT0 = r0.n; else malos.push('Total de taras inicial'); }
    (S.cajasMov || []).forEach(function (m) { var r1 = num32Lee(m.n); if (r1.ok) m.n = r1.n; else malos.push('Movimiento de taras'); });
  } catch (e) {}
  if (malos.length) {
    var t = 'Hay un número que no se puede leer (no se cambió): ' + malos.join(', ');
    apErr('número ilegible', t, S.tab && S.tab[S.role]);
    /* a la nube va sin nombres (el número interno); en la app, con el nombre para que lo encuentres */
    try { var av = 'Hay un número que no se puede leer (no se cambió): ' + (nom.length ? nom.join(', ') : malos.join(', ')) + '. Revísalo y corrígelo; es un error de la app, ya quedó anotado.'; if ((S.avPrecio = S.avPrecio || []).indexOf(av) < 0) S.avPrecio.push(av); } catch (e) {}
  }
};
/* 4) "Arreglado en la 9.9" solo para los reportes de antes del 19 nov (la 9.9 salió el 18) */
probs122 = function () {
  try {
    if (S.role !== 'admin' || S._probs122) return; if (typeof NB !== 'undefined' && NB.on && !NB.listo) return; S._probs122 = iso(TODAY);
    (S.probs || []).forEach(function (p) { if (p && p.auto && !p.res && p.f < '2026-11-19' && ARREG122.test(String(p.txt || '') + ' ' + String(p.k || ''))) { p.res = iso(TODAY); p.resNota = 'Arreglado en la versión 9.9'; } });
  } catch (e) {}
};
