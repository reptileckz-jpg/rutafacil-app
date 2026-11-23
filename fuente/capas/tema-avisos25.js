/* ===================== TEMA · Avisos al administrador aunque no abra la app (23 nov · punto 25 de la nueva numeración) =====================
   Ricardo: "al administrador, si no abre la app, no hay nada que le diga que no se inició la ruta, que hay clientes con entregas pendientes,
   que la fruta se va a madurar…". Escogió (opción múltiple): los 4 avisos, a las 9, a todos los administradores.
   Cómo funciona:
     1) Cualquier celular con la app abierta (administrador o chofer) deja en la nube un resumen chico: n/{neg}/av/plan =
        { tz (zona horaria del celular), vida (días que dura la fruta madura), dias: { 'AAAA-MM-DD': { idChofer: { n, k (cuántos clientes),
          ped (pedidos) } } } para hoy y los 6 días siguientes, sinCh (pedidos de hoy sin chofer) }. Lo arma con lo mismo que "Armar rutas"
        (lista81), así la nube no repite las cuentas de la app. Solo se vuelve a escribir si cambió (y cuando mucho cada 2 minutos).
     2) La función de la nube "avisosAdmin" (functions/index.js) revisa cada hora, a la hora del negocio:
        8:00  precio de hoy sin fijar · fruta madura que se pasa hoy o mañana
        9:00 y 10:00  choferes con clientes hoy que no han hecho "Iniciar el día"
        14:00 y 17:00  cómo van las entregas ("Danu lleva 5 de 12") y pedidos de hoy sin chofer
        21:00  choferes que no mandaron su cierre y cierres sin recibir
        y los manda a todos los celulares de administrador (el mismo camino que los permisos: n/{neg}/push con ch "admins").
   No cambia ninguna cuenta. Se arma al final.
   ============================================================================================ */
var AV25 = { h: '', t: 0 };
function av25Plan() {
  var tz = 'America/Mexico_City';
  try { tz = Intl.DateTimeFormat().resolvedOptions().timeZone || tz; } catch (e) {}
  var P = { v: 1, tz: tz, vida: 3, dias: {}, sinCh: [] };
  try { P.vida = num(vidaDias()) || 3; } catch (e) {}
  var CH = chs81().filter(function (c) { return esCh(c); });
  for (var i = 0; i < 7; i++) {
    var f = iso(new Date(TODAY.getTime() + i * 864e5)), D = {};
    CH.forEach(function (c) {
      var L = []; try { L = lista81(+c.id, f).L || []; } catch (e) {}
      if (!L.length) return;
      D[c.id] = { n: String(c.n || 'Chofer').split(' ')[0], k: L.length, ped: L.filter(function (x) { return x.ped; }).length };
    });
    P.dias[f] = D;
  }
  try { P.sinCh = sinCh81(iso(TODAY)).filter(function (c) { return c.ped; }).map(function (c) { return String(c.n || '').slice(0, 40); }).slice(0, 10); } catch (e) {}
  return P;
}
function av25Sube() {
  try {
    if (typeof NB === 'undefined' || !NB.on || !NB.listo || !NB.ad || !NB.ad.set) return;
    if (Date.now() - AV25.t < 120000) return;
    var P = av25Plan(), h = JSON.stringify(P);
    if (h === AV25.h) return;
    AV25.t = Date.now(); P.t = Date.now();
    NB.ad.set(nbP('av/plan'), P, false).then(function () { AV25.h = h; }, function (e) { console.error('av25', e); });
  } catch (e) {}
}
setInterval(av25Sube, 60000); setTimeout(av25Sube, 8000);
