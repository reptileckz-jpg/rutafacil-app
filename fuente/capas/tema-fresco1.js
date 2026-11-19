/* ===================== TEMA · Estado nuevo (fresh), parte 1 (aplanado el 19 nov) =====================
   Las envolturas de fresh() de l2, l5 y l6b: lo que se le hace al estado nuevo de la app (S) cuando se crea (cerrar lo abierto, cajas
   de arranque, datos de la demo). Mismo orden. Se arma justo después de l6b.js, ANTES de l7.js: tpl() de l7 usa _frL6 directo.
   Lo que se le hacía al estado de ESE MOMENTO al cargar (cerrar(S), fij(S)) se quedó en su capa, en su lugar.
   ============================================================================================ */

/* fresh · de l2 */
(function(){var cerrar=function(s){FIK.forEach(function(k){s[k]=null});return s};var _frFi=fresh;fresh=function(){return cerrar(_frFi.apply(this,arguments))};})();

/* fresh · de l5 */
(function(){var fij=function(s){var sv=S;S=s;try{s.cajasT0=cajasDonde().tot-cajasMovTot()}finally{S=sv}return s};var _frC=fresh;fresh=function(){return fij(_frC.apply(this,arguments))};})();

/* fresh · de l6b */
var _frL6=fresh;fresh=function(){return datosDemo(_frL6.apply(this,arguments))};
