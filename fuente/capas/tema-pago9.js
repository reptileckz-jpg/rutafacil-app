/* ===================== TEMA · La app recuerda pagar los sueldos (20 nov · punto 9 de la nueva numeración) =====================
   Ricardo: "no sé si cuando se acaba la semana o se llega al día acordado de pago la app te lo recuerda. Sería bueno que te avise en inicio,
   y aparte, si es chofer, cuando te entregue el cierre te recuerde la app que debes pagarle".
   El día de pago ya estaba decidido (118): la semana va de domingo a sábado y el SÁBADO se paga. No había ningún aviso.
   Ahora:
     1) En Inicio, en "Hoy": "💵 Pagarle su semana a Danu: $2,350" el sábado (y si ya pasó el sábado y no se le pagó: "Falta pagarle a Danu
        la semana del …"), uno por empleado con sueldo, con "Ir ›" que abre su ficha en la pestaña Sueldo. Se quita solo al pagarle
        (c.pagoHasta118 ya cubre esa semana).
     2) Al recibir el cierre de un chofer el día de pago (o con su semana atrasada), sale "Ya recibiste el cierre de Danu · Hoy toca pagarle
        su semana: $…" con "Pagarle ahora" (abre su Sueldo) o cerrar. Una vez por chofer y semana.
   La cantidad es la misma que calcula su ficha (szCalc: días, faltas, comisión, extras, adelantos y faltantes). Solo recuerda; el pago se
   hace como siempre en su ficha. Se arma al final.
   ============================================================================================ */
function sz9Debe(c) {
  try {
    if (!c || c.baja || esAdm(c)) return null;
    var z = c.sz || {}; if (!z.tipo || z.tipo === 'ninguno') return null;
    var k = szCalc(c), hoy = iso(TODAY);
    if (!k || k.vacio || !(k.fin <= hoy)) return null;
    var sab = TODAY.getDay() === 6;
    if (k.fin === hoy && !sab && !(fechaOk118(c.baja118) && c.baja118 <= hoy)) return null;
    if (!(num(k.pagar) > 0 || num(k.br) > 0)) return null;
    return { c: c, k: k, atras: k.fin < hoy };
  } catch (e) { return null; }
}
function sz9Lista() { return (S.choferes || []).map(sz9Debe).filter(Boolean); }
function sz9Txt(x) {
  return x.atras ? 'Falta pagarle a ' + x.c.n + ' la semana del ' + fCorta118(x.k.ini) + ' al ' + fCorta118(x.k.fin) + ': ' + money(x.k.pagar)
    : '💵 Hoy toca pagarle su semana a ' + x.c.n + ': ' + money(x.k.pagar);
}
/* 1) en "Hoy" de Inicio */
var _hT9 = hoyTareas;
hoyTareas = function () {
  var L = _hT9.apply(this, arguments);
  try { if (S.role === 'admin' && !S.encOn) sz9Lista().forEach(function (x) { L.push({ k: 'sz9' + x.c.id + '|' + x.k.fin, t: sz9Txt(x), go: 'sz9:' + x.c.id, ok: false }); }); } catch (e) {}
  return L;
};
function sz9Abre(id) { S.modal = null; S.tab.admin = 'personal'; ['openCli', 'vehOpen', 'openProv', 'openCarga'].forEach(function (k) { S[k] = null; }); S.openCh = +id; S.fiTab = S.fiTab || {}; S.fiTab['emp:' + id] = 'sue'; render(); window.scrollTo(0, 0); }
window.addEventListener('click', function (e) {
  var b = e.target.closest && e.target.closest('[data-act="popgo"][data-t^="sz9:"],[data-act="sz9go"]'); if (!b) return;
  e.preventDefault(); e.stopImmediatePropagation();
  sz9Abre(b.dataset.act === 'sz9go' ? b.dataset.id : String(b.dataset.t).slice(4));
}, true);
/* 2) al recibir el cierre de un chofer el día de pago */
function sz9AlRecibir() {
  if (S.role !== 'admin' || S.encOn || S.modal || S.chofHoy == null || !S.cierreReg) return;
  var c = chById118(S.chofHoy), x = sz9Debe(c); if (!x) return;
  var k = x.c.id + '|' + x.k.fin; S.sz9av = S.sz9av || {}; if (S.sz9av[k]) return;
  S.sz9av[k] = iso(TODAY);
  abrirModal('Ya recibiste el cierre de ' + esc(x.c.n), (x.atras ? 'Falta pagarle la semana del ' + esc(fCorta118(x.k.ini)) + ' al ' + esc(fCorta118(x.k.fin)) : 'Hoy es día de pago: toca pagarle su semana') + ': <b>' + money(x.k.pagar) + '</b>.',
    [['Pagarle ahora', 'sz9go', ' data-id="' + x.c.id + '"']]);
}
var _rd9 = render;
render = function () { try { sz9AlRecibir(); } catch (e) {} return _rd9.apply(this, arguments); };
