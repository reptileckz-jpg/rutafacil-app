/* ===================== v3.9 · 8. Arranque ===================== */
if(window.__pnTest){S.cajaAyerSkip=true}
else if(!(MODO==='vacio'&&S.setup&&!S.setup.fin))pinEntrar();
function ensureS(){var D={fiTab:{},borr:{},anulados:[],entSnap:{},entCorr:[],pins:{},pinOk:{},conn:{},pendCh:{},histVisto:{},tutVisto:{},cajaCierres:[],hist:[],sinTrabajo:[]};Object.keys(D).forEach(function(k){if(S[k]==null)S[k]=D[k]});if(S.colaEnv==null)S.colaEnv=0;if(S.cierreP==null)S.cierreP=0;if(window.__pnTest&&!S.cajaAyerSkip){S.cajaAyerSkip=true}}
/* render: pasó a tema-dibujar1.js */
/* si no hay ningún vehículo (por ejemplo, se dieron todos de baja), la app no se traba */
/* vehHoy: pasó a tema-vehiculos.js */
/* sin historial todavía (primera vez): las estadísticas lo dicen en vez de quedarse en blanco */
/* estadisticas: pasó a tema-estadisticas.js */
