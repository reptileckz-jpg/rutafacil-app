/* ===================== TEMA · Las taras de un cierre atrasado no desaparecen de la cuenta (20 nov · punto 2 de la nueva numeración) =====================
   Ricardo: "me marca en el administrador un descuadre de 12 taras, muy seguramente son las que sobraron de esa ruta … ahora parecen
   perdidas esas taras y el dinero".
   Causa: cuando una ruta que no se cerró (o se cerró y no se recibió) se guarda aparte para recibirla después ("📥 Cierre atrasado",
   S.atras93: al liberar la ruta, al cambiar de día o al renovar la ruta del chofer), "dónde están las cajas" (cajasDonde) ya no la veía:
   solo cuenta la ruta cargada y las de S.chSt. Las cajas que seguían en ese camión y las vacías que recogió dejaban de contarse hasta
   recibirla → "Las taras no cuadran: faltan N" (y el botón "registrar como saldo inicial" las habría borrado de verdad).
   Ahora cada cierre atrasado SIN recibir cuenta igual que una ruta de otro chofer (misma fórmula de tema-cajas · l28):
     · en camión: las cajas llenas que traía (invR) + si mandó el cierre y falta contarlas, las que regresan (res.reg);
     · vacías en el camión: las que recogió en sus entregas (V − Vr) si no mandó el cierre, o res.V si lo mandó y falta contarlas;
     · las rotas (Vr) de una ruta sin cierre se restan de las esperadas, igual que en las otras rutas.
   No se cuenta dos veces: se salta el que ya se recibió (hecho), el que se está recibiendo ahora mismo (S.atr93: ya está cargado como
   la ruta del celular) y el de una ruta que sigue viva con la misma fecha (cargada o en S.chSt).
   Solo cambia la CUENTA de dónde están las taras; no mueve inventario, dinero ni registros. El efectivo de ese cierre no entra a la caja
   hasta que se recibe (como siempre); sale en Rutas → "📥 Cierre atrasado · Recibir". Se arma al final.
   ============================================================================================ */
function atrasCuenta2() {
  var L = [];
  try {
    var A = S.atras93 || {}, rec = S.atr93 && S.atr93.k;
    /* 19: "la misma ruta" = mismo chofer, mismo día Y lo mismo adentro (entregas y cajas en el camión); una ruta nueva del mismo día
       (al cerrar y empezar de cero) NO es la misma y el cierre atrasado sí se cuenta */
    var firma = function (log, invR) { return (log || []).length + '|' + num(invR) + '|' + (log || []).map(function (l) { return (l && (l.id || l.c)) + ':' + num(l && l.R) + ':' + num(l && l.V); }).join(','); };
    var vivas = [];
    try { if (S.chofHoy != null) vivas.push({ id: +S.chofHoy, f: S.rutaDia80, s: firma(S.log, S.inv && S.inv.reparto) }); } catch (e) {}
    Object.keys(S.chSt || {}).forEach(function (id) { var o = S.chSt[id]; if (o) vivas.push({ id: +id, f: o.rutaDia80, s: firma(o.log, o.invR) }); });
    Object.keys(A).forEach(function (k) {
      var e = A[k];
      if (!e || e.hecho || k === rec || !e.pack) return;
      var fe = firma(e.pack.log, e.pack.invR);
      if (vivas.some(function (v) { return v.id === +e.id && v.f && v.f === e.f && v.s === fe; })) return;
      L.push(e.pack);
    });
  } catch (e) {}
  return L;
}
var _cd2 = cajasDonde;
cajasDonde = function () {
  var w = _cd2.apply(this, arguments);
  try {
    atrasCuenta2().forEach(function (o) {
      var cam = Math.max(0, num(o.invR)), v = 0, ll = 0, vv = 0, c = o.cierre;
      if (c && !c.sent) v = sum(o.log || [], function (l) { return num(l.V) - num(l.Vr); });
      if (c && c.sent && c.res && !o.recep && c.porContar) { ll = Math.max(0, num(c.res.reg)); vv = Math.max(0, num(c.res.V)); }
      w.cam += cam + ll; w.camV = (w.camV || 0) + v + vv; w.tot += cam + v + ll + vv;
      w.atras2 = (w.atras2 || 0) + cam + v + ll + vv;
    });
  } catch (e) {}
  return w;
};
var _ce2 = cajasEsperadas;
cajasEsperadas = function () {
  var x = _ce2.apply(this, arguments);
  try {
    atrasCuenta2().forEach(function (o) { if (o.cierre && !o.cierre.sent) x -= sum(o.log || [], function (l) { return num(l.Vr); }); });
  } catch (e) {}
  return x;
};
