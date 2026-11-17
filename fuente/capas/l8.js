/* ===================== v3.9 · 8. Arranque ===================== */
if(window.__pnTest){S.cajaAyerSkip=true}
else if(!(MODO==='vacio'&&S.setup&&!S.setup.fin))pinEntrar();
function ensureS(){var D={fiTab:{},borr:{},anulados:[],entSnap:{},entCorr:[],pins:{},pinOk:{},conn:{},pendCh:{},histVisto:{},tutVisto:{},cajaCierres:[],hist:[],sinTrabajo:[]};Object.keys(D).forEach(function(k){if(S[k]==null)S[k]=D[k]});if(S.colaEnv==null)S.colaEnv=0;if(S.cierreP==null)S.cierreP=0;if(window.__pnTest&&!S.cajaAyerSkip){S.cajaAyerSkip=true}}
var _rL8=render;render=function(){ensureS();return _rL8.apply(this,arguments)};
/* si no hay ningún vehículo (por ejemplo, se dieron todos de baja), la app no se traba */
/* vehHoy: pasó a tema-vehiculos.js */
/* sin historial todavía (primera vez): las estadísticas lo dicen en vez de quedarse en blanco */
var _estL8=estadisticas;estadisticas=function(){if(HIST.length)return _estL8.apply(this,arguments);return '<h1>Estadísticas</h1><div class="card"><b>Todavía no hay historial</b><div class="lbl" style="margin-top:6px">Las ventas, ganancias, gastos y rankings aparecen aquí cuando empiecen a registrarse días de trabajo. En la app final se guardan día con día.</div></div>'+cuentasHTML()};
