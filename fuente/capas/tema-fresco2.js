/* ===================== TEMA · Estado nuevo (fresh) y datos que llegan de la nube (nbAplica), parte 2 (aplanado el 19 nov) =====================
   Las envolturas de fresh() de l7, l45, l72 y l80 (versión real: quitar lo de la demo) y las de nbAplica() de l61, l77, l80 y l82
   (puente al cerrar, pausar si falló, limpiar plantillas de la demo al bajar de la nube). Mismo orden de cada una.
   Se arma justo después de l85.js (antes de tema-dibujar1.js). Lo que se le hacía a S al cargar (S=vaciar(S), limpia72(S),
   limpia80(S), limpiaTpl82(S), limpiaDemo(S)) se quedó en su capa, en su lugar. Las condiciones (MODO==='vacio') van con cada una.
   ============================================================================================ */

/* fresh · de l7 */
if(MODO==='vacio'){var _frL7=fresh;fresh=function(){return vaciar(_frL7.apply(this,arguments))};}

/* fresh · de l45 */
if(typeof MODO!=='undefined'&&MODO==='vacio'){var _fr45=fresh;fresh=function(){return limpiaDemo(_fr45.apply(this,arguments))};}

/* nbAplica · de l61 */
var _nbApl61=nbAplica;nbAplica=function(docs,primera){try{if(!primera&&!salPrimera())salPuente()}catch(e){}var r=_nbApl61.apply(this,arguments);try{salPrimera();salAplica()}catch(e){console.error('saldos',e)}return r};

/* fresh · de l72 */
if(MODO==='vacio'){var _fr72=fresh;fresh=function(){return limpia72(_fr72.apply(this,arguments))};}

/* nbAplica · de l77 */
if(typeof nbAplica==='function'){var _nbA77=nbAplica;nbAplica=function(){try{return _nbA77.apply(this,arguments)}catch(e){falloAnota77(e,'al recibir cambios de la nube');return true}}}

/* nbAplica · de l77 */
if(typeof nbAplica==='function'){var _nbA77b=nbAplica;nbAplica=function(){if(DIAG77.paus)return false;return _nbA77b.apply(this,arguments)}}

/* nbAplica · de l77 */
if(typeof nbAplica==='function'){var _nbA77c=nbAplica;nbAplica=function(){var r=_nbA77c.apply(this,arguments);if(vwLimpia77())r=true;return r}}

/* nbAplica · de l80 */
if(typeof nbAplica==='function'){var _nbA80=nbAplica;nbAplica=function(){var r=_nbA80.apply(this,arguments);if(bodDemo80()){try{setTimeout(function(){try{nbEmpuja()}catch(e){}},500)}catch(e){}r=true}return r}}

/* fresh · de l80 */
if(MODO==='vacio'){var _fr80=fresh;fresh=function(){var s=_fr80.apply(this,arguments);limpia80(s);return s};}

/* nbAplica · de l80 */
if(MODO==='vacio'){if(typeof nbAplica==='function'){var _nbA80b=nbAplica;nbAplica=function(){var r=_nbA80b.apply(this,arguments);if(limpia80(S)){try{setTimeout(function(){try{nbEmpuja()}catch(e){}},700)}catch(e){}r=true}return r}}}

/* nbAplica · de l82 */
if(MODO==='vacio'){if(typeof nbAplica==='function'){var _nbA82=nbAplica;nbAplica=function(){var r=_nbA82.apply(this,arguments);if(limpiaTpl82(S)){setTimeout(function(){try{nbEmpuja()}catch(e){}},900);r=true}return r}}}
