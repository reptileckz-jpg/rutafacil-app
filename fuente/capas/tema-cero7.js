/* ===================== TEMA · Cada día la ruta empieza desde cero (20 nov · punto 7 de la nueva numeración) =====================
   Ricardo: "no se hizo el cierre, al abrir la app del admin se liberó en automático, pero se inició en automático la ruta … ¿qué pasa con
   esa ruta? con las fotos, odómetro, la verificación inicial del vehículo … El chofer siempre regresa el vehículo y la carga sobrante a la
   bodega, entonces se debe hacer todo el proceso desde 0, como si apenas fuera a iniciar su ruta. Al liberar o mandar el cierre atrasado se
   debe cerrar la ruta e iniciarla como cualquier otro día".
   Regla (sin importar por qué camino llegó la ruta de hoy):
     · Cada salida queda marcada con su día (salida.f7 = el día de esa ruta) en cuanto el chofer termina "Antes de salir".
     · En el celular del chofer: si la ruta ya dice que es de HOY pero su salida fue de OTRO día, es la ruta de antes que se quedó abierta.
       Entonces: 1) se CIERRA: todo lo que traía (entregas, efectivo, gastos, gasolina, cajas y kilos en el camión, odómetro) se guarda como
       "📥 Cierre atrasado" de su día para que el administrador lo reciba (atrasGuarda93; llave chofer|día: nunca doble) y queda en el
       historial; 2) se le arma su ruta de HOY nueva (chNuevo): "Antes de salir" otra vez (revisión del vehículo, fotos, odómetro y carga),
       sin entregas ni dinero de ayer.
   No aplica: a la segunda vuelta del mismo día, a la madrugada (12–5 a.m., 93) ni a rutas que ya estaban abiertas antes de esta versión
   (no tienen la marca: no se le reinicia la ruta a nadie a medio día). No cambia ninguna venta; lo de antes no se borra: pasa a recibirse.
   Se arma al final.
   ============================================================================================ */
function cero7Marca() {
  try {
    var s = S.salida;
    if (s && s.ok && !s.f7) s.f7 = S.rutaDia80 || iso(TODAY);
  } catch (e) {}
}
function cero7Vieja() {
  try {
    if (S.role !== 'rep' || S.chofHoy == null || S.arOn) return null;
    var hoy = iso(TODAY), s = S.salida;
    if (S.rutaDia80 !== hoy || !s || !s.ok || !s.f7 || s.f7 >= hoy) return null;
    return s.f7;
  } catch (e) { return null; }
}
function cero7Aplica() {
  var f = cero7Vieja(); if (!f) return false;
  var id = +S.chofHoy, o = arPack(), env = !!(o.cierre && o.cierre.sent);
  /* 1) se cierra la de antes: se guarda para recibirla (lo mismo que al renovar la ruta, 94/95) */
  try {
    if (typeof sinRecibir93 === 'function' && sinRecibir93(o) && !o.cierre.regMov) { regMov93(S); o = arPack(); }
    if (typeof guardable95 === 'function' && guardable95(o)) atrasGuarda93(o, id, f, env ? 'cierre' : 'sinCierre');
  } catch (e) { console.error('cero7 guarda', e); }
  try {
    S.rutasHist = S.rutasHist || [];
    var ya = S.rutasHist.filter(function (x) { return x.f === f && +x.ch === id && !x.parcial120; })[0];
    if (ya && (o.log || []).length > (ya.log || []).length) { ya.log = o.log; ya.cero7 = 1; }
    else if (!ya && (o.log || []).length) S.rutasHist.push({ f: f, ch: id, log: o.log, res: o.cierre && o.cierre.res || null, enviado: env, cero7: 1, fotos121: (typeof fotosRuta121 === 'function' ? fotosRuta121(o) : null) });
    S.hist.push({ t: fmtF(iso(TODAY)) + ' ' + hhmm(), q: 'App', x: 'La ruta del ' + fCorta91(f) + ' de ' + chofN(id) + ' seguía abierta: se cerró para recibirla y su ruta de hoy empieza desde cero' });
  } catch (e) {}
  /* 2) su ruta de hoy, nueva: "Antes de salir" otra vez */
  var n = chNuevo(id);
  try { n.rutaDia80 = iso(TODAY); } catch (e) {}
  arLoad(n); S.dia80 = null; S.tab.rep = 'ruta';
  setTimeout(function () { try { toast('Tu ruta del ' + fCorta91(f) + ' quedó guardada para que el administrador la reciba. Hoy empiezas desde cero: revisión del vehículo, fotos y odómetro.'); } catch (e) {} }, 80);
  return true;
}
var _rd7 = render;
render = function () {
  try { cero7Aplica(); } catch (e) { console.error('cero7', e); }
  try { cero7Marca(); } catch (e) {}
  return _rd7.apply(this, arguments);
};
