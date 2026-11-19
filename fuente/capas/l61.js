/* ===================== v7.2 · parte 4: que los números siempre cuadren
   30 saldo y cajas de cada cliente (y cajas de cada proveedor) con sumas y restas: dos celulares ya no se borran el movimiento
   32 cambio de día aunque la app se quede abierta · 34 centavos redondeados al guardar · 35 doble toque = un solo registro ===================== */

/* ---------- 30 · saldos con sumas y restas ----------
   Antes: el saldo (c.cred) se guardaba como número final y el último celular que escribía ganaba.
   Ahora: saldo = lo que había al migrar (cliBase, igual en todos) + suma de movimientos (cliCnt, se suma en la nube). */
try{if(NB_SH.indexOf('cliBase')<0)NB_SH.push('cliBase');if(NB_SH.indexOf('cliCnt')<0)NB_SH.push('cliCnt');NB_CONT.cliCnt=1}catch(e){}
function salMig(){return (S.cfg&&S.cfg.saldoMig)||null}
function salListo(){var m=salMig();return !!(m&&S.cliBase&&S.cliBase.__mig===m)}
function salCampos(){var L=[],vis={};(S.cli||[]).forEach(function(c){if(!c||c.id==null)return;L.push({k:c.id+'|cred',o:c,p:'cred'});L.push({k:c.id+'|vac',o:c,p:'vac'})});
 S.tarasProv=S.tarasProv||{};Object.keys(S.tarasProv).forEach(function(n){vis[n]=1;L.push({k:'p:'+n+'|tar',o:S.tarasProv,p:n})});
 /* proveedores que solo existen en la nube */
 [S.cliBase||{},S.cliCnt||{}].forEach(function(M){Object.keys(M).forEach(function(k){var m=/^p:(.*)\|tar$/.exec(k);if(m&&!vis[m[1]]){vis[m[1]]=1;L.push({k:k,o:S.tarasProv,p:m[1]})}})});return L}
function salEsp(k){return Math.round((num((S.cliBase||{})[k])+num((S.cliCnt||{})[k]))*100)/100}
/* lo que cambió en este celular se vuelve suma/resta */
function salPuente(){if(!salListo())return false;S.cliCnt=S.cliCnt||{};var cam=false;salCampos().forEach(function(f){var v=num(f.o[f.p]),e=salEsp(f.k);if(Math.abs(v-e)>0.004){S.cliCnt[f.k]=Math.round((num(S.cliCnt[f.k])+(v-e))*100)/100;cam=true}});return cam}
/* lo que llegó de la nube se pone en cada cliente */
function salAplica(){if(!salListo())return;salCampos().forEach(function(f){var e=salEsp(f.k),v=f.o[f.p];if(v===undefined&&e===0&&f.p==='vac')return;if(num(v)!==e||v==null&&e!==0)f.o[f.p]=e})}
/* migración: una sola vez, la hace el dueño ya con la nube cargada */
function salMigra(){if(salMig()||!(typeof NB!=='undefined'&&NB.on&&NB.listo)||!(S.role==='admin'&&!S.encOn&&NB.perfil&&NB.perfil.rol==='admin'))return false;
 var t=Date.now(),B={__mig:t};salCampos().forEach(function(f){B[f.k]=num(f.o[f.p])});S.cliBase=B;S.cliCnt=S.cliCnt||{};Object.keys(S.cliCnt).forEach(function(k){S.cliCnt[k]=num(S.cliCnt[k])});S.cfg.saldoMig=t;
 try{localStorage.setItem('salIni',String(t))}catch(e){}return true}
/* en un celular que recién ve la migración: primero toma lo de la nube (no manda nada) */
function salPrimera(){var m=salMig();if(!m||!salListo())return false;var ya=null;try{ya=localStorage.getItem('salIni')}catch(e){}if(ya===String(m))return false;salAplica();try{localStorage.setItem('salIni',String(m))}catch(e){}return true}
/* la nube ya no sube c.cred / c.vac ni tarasProv como número final */
/* nbCodifica: pasó a tema-nube.js */
/* nbEmpuja: pasó a tema-nube.js */
/* nbAplica: pasó a tema-fresco2.js */
/* render: pasó a tema-dibujar1.js */

/* ---------- 32 · cambio de día aunque la app nunca se vaya al fondo ---------- */
var _dia61=null;
setInterval(function(){try{if(window.__pnTest&&!window.__diaTest)return;if(!(typeof REAL!=='undefined'&&REAL)&&!window.__diaTest)return;
 var d=new Date();d.setHours(12,0,0,0);var hoy=iso(d);if(_dia61==null){_dia61=iso(TODAY);return}if(hoy===_dia61)return;
 /* si está a la mitad de algo, espera a que termine */
 var a=document.activeElement;if(a&&/INPUT|TEXTAREA|SELECT/.test(a.tagName))return;if(typeof pnAMedias==='function'&&pnAMedias())return;if(_pin&&_pin.modo&&_pin.modo!=='entrar')return;
 _dia61=hoy;try{guardarYa()}catch(e){}if(window.__diaTest){window.__diaCambio=(window.__diaCambio||0)+1;return}setTimeout(function(){location.reload()},300)}catch(e){}},60000);

/* ---------- 34 · centavos: cada venta, cobro, abono, gasto y pesada se guarda con 2 decimales ---------- */
var RED_LISTAS=['log','cobros','gastos','aportes','pagosSueldo','adelantos','gch','extras','mermas','cajasMov','faltantes','tiradas','cajaCierres','abonos','pagosProv','porPagar','bonos','fijosPag','recargas','cambios','cancels'];
var RED_NO=/^(id|_k|t|ts|lat|lng|acc|c|ch|cid|veh|hora|f|fecha|i|n)$/;
function redN(v){if(typeof v==='number'){if(!isFinite(v)||Math.round(v)===v)return v;return Math.round(v*100)/100}
 if(typeof v==='string'&&/^-?\d+\.\d{3,}$/.test(v)){return String(Math.round(parseFloat(v)*100)/100)}return v}
function redObj(o,prof){if(!o||typeof o!=='object'||prof>2)return;Object.keys(o).forEach(function(k){if(RED_NO.test(k))return;var v=o[k];if(v&&typeof v==='object'){if(!Array.isArray(v))redObj(v,prof+1);return}var r=redN(v);if(r!==v)o[k]=r})}
function redondea(){RED_LISTAS.forEach(function(k){var L=S[k];if(!Array.isArray(L))return;for(var i=Math.max(0,L.length-400);i<L.length;i++)redObj(L[i],0)});
 (S.cargas||[]).forEach(function(c){redObj(c,0);(c.pagos||[]).forEach(function(p){redObj(p,0)})});(S.cli||[]).forEach(function(c){var r=redN(c.cred);if(r!==c.cred)c.cred=r})}
var _redT=0;/* render: pasó a tema-dibujar1.js */

/* ---------- 35 · doble toque: el mismo botón no se ejecuta dos veces en menos de 1 segundo ---------- */
var DOBLE_RE=/^(entregar|cobrar|cobrarcajas|cobrartodo|enviar|guardar|gsave|gxsave|credpag|fijopag|pagarsz|porpagar|rcfin|rctodo|rceqok|recibir|regcierre|vlvender|vtliq|vtgasto|vtfin|abonoprov|tirar|fasi|vwfpago|vwcomb|vfcomb|savecarga|newcarga|cxsave|ventaok|pagook|extracarga|recargar|registrarcnt|cajacierre|clialta|provalta|cesave|vsave|npsave|ubsave|bfsave|fnsave|eqsave|eqok|wzok|wzsig|abono|abonar|gasto|gastar|combustible|pagar|pago|cobro)$/;
var _dobleU={};
window.addEventListener('click',function(e){if(!e.isTrusted&&!window.__dobleTest)return;var b=e.target.closest&&e.target.closest('[data-act]');if(!b)return;var a=b.dataset.act;if(!DOBLE_RE.test(a))return;
 var k=a+'|'+JSON.stringify(b.dataset),t=Date.now();if(_dobleU[k]&&t-_dobleU[k]<1000){e.preventDefault();e.stopImmediatePropagation();return}_dobleU[k]=t},true);
