/* ===================== TEMA · "💰 Mi sueldo": entrevista por pasos, revisión cada quincena y el carro particular (24 nov · punto 35 de la nueva numeración) =====================
   Plan del 30 nov (fuente/PLAN-ARRANQUE-30NOV.md). Decisiones de Ricardo:
   - Una entrevista por pasos para el dueño (su casa, su carro particular, salud y escuela, deudas, ahorro, el negocio) que termina con
     tres números: lo que necesita, lo que el negocio puede pagar (su ganancia menos un colchón del 20%) y el sueldo sugerido (lo menor).
     El primer día se ACEPTA lo que él escoja, aunque sea más de lo que el negocio deja; la app le dice cuánto se come del capital.
   - Se ofrece en Inicio desde el día 1–2 (después de la configuración inicial) y siempre en Más → "💰 Mi sueldo".
   - El sueldo queda como gasto fijo "Sueldo de … (dueño)" marcado como sueldo del dueño (Retiro del dueño: baja la caja, no la ganancia).
   - Cada quincena: tarjeta "💰 Tu sueldo y el negocio" (verde / amarillo / rojo) con la ganancia neta de las últimas 4 semanas (la del
     Cuadre). Si va en rojo 2 quincenas seguidas sugiere bajarlo (y otras salidas: precio, cobranza, gastos, merma); si sobra 2 seguidas,
     subirlo. Él decide.
   - El detalle de sus gastos personales solo lo ven el dueño y el desarrollador: se guarda en este celular y en la nube en n/{neg}/priv
     (reglas: solo dueño y desarrollador). A los demás solo les llega el sueldo final como gasto fijo.
   - Su carro particular: tipo de gasto "Mi carro (para el negocio)" cuando lo usa para el negocio; lo demás sale de su sueldo.
   No cambia ninguna cuenta del negocio. Se arma al final.
   ============================================================================================ */
var S35 = { colchon: 0.2 };
function suel35Puede() { try { if (S.role !== 'admin' || S.encOn) return false; if (typeof NB === 'undefined' || !NB.on || !NB.perfil) return true; return !!(NB.perfil.duenio || NB.perfil.dev); } catch (e) { return false; } }
function suel35Nom() { try { var a = typeof adminNom === 'function' ? adminNom() : ''; return a || 'el dueño'; } catch (e) { return 'el dueño'; } }
/* ganancia neta del negocio (la del Cuadre) de los últimos 28 días, por mes */
var _g35 = { k: '', v: null };
function suel35Ganancia() {
  var k = iso(TODAY); if (_g35.k === k) return _g35.v;
  var tot = 0, dias = 0;
  try { for (var i = 1; i <= 28; i++) { var d = iso(new Date(TODAY.getTime() - i * 864e5)); var c = cuadreDia121(d); if (c && isFinite(num(c.neto))) { tot += num(c.neto); if (num(c.venta) > 0) dias++; } } } catch (e) {}
  _g35 = { k: k, v: dias >= 6 ? { mes: Math.round(tot * 30 / 28), dias: dias } : null }; return _g35.v;
}
function suel35Mes(m, frec) { m = num(m); return frec === 'semanal' ? Math.round(m * 52 / 12) : (frec === 'quincenal' ? m * 2 : m); }
function suel35Calc(d) {
  var v = function (k) { return Math.max(0, num(d[k])); };
  var nec = v('desp') + v('fuera') + v('serv') + v('renta') + v('cgas') + Math.round((v('cseg') + v('cserv')) / 12) + v('salud') + v('deuda') + v('ahorro');
  var g = suel35Ganancia(), ganMes = g ? g.mes : Math.round(v('ganSem') * 52 / 12);
  var pue = Math.max(0, Math.round(ganMes * (1 - S35.colchon)));
  return { nec: Math.round(nec), ganMes: ganMes, real: !!g, pue: pue, sug: Math.min(Math.round(nec), pue) };
}
function suel35Por(mes, frec) { return frec === 'semanal' ? Math.round(mes * 12 / 52) : Math.round(mes / 2); }
var num35 = function (k, l, ph) { return { k: k, l: l, t: 'number', opc: true, ph: ph || '0' }; };
WZ.suel35 = { tit: '💰 Mi sueldo', fin: 'Usar este sueldo', pasos: [
  { q: 'Vamos a calcular cuánto te conviene pagarte', a: 'Son unas preguntas de tus gastos de la casa, más o menos. Solo lo ven tú y tu hijo (el desarrollador de la app); a los demás solo les sale tu sueldo final.', html: function () { return '<div class="card"><div style="font-size:16px">Al final te digo: lo que necesitas, lo que el negocio puede pagarte y un sueldo sugerido. Tú decides.</div></div>'; } },
  { q: 'Tu casa', a: 'Lo que gastan al mes, más o menos. Si no sabes, deja en blanco.', c: [{ k: 'pers', l: '¿Cuántos viven en tu casa?', t: 'number', opc: true }, num35('desp', 'Despensa al mes $'), num35('fuera', 'Comida fuera al mes $')] },
  { q: 'Servicios y vivienda', a: 'Al mes, más o menos.', c: [num35('serv', 'Luz, agua, gas, internet y teléfono $'), num35('renta', 'Renta o hipoteca $')] },
  { q: '¿Tienes carro particular?', a: 'Tu carro de uso personal (no las camionetas del negocio).', c: [{ k: 'carro', t: 'opc', o: [['si', 'Sí'], ['no', 'No']], falta: 'Escoge una opción' }], auto: true },
  { q: 'Tu carro particular', si: function (d) { return d.carro === 'si'; }, a: 'Lo que gastas en él. Cuando lo uses para el negocio, anótalo en Gastos → "Mi carro (para el negocio)" y eso lo paga el negocio.', c: [num35('cgas', 'Gasolina al mes $'), num35('cseg', 'Seguro al año $'), num35('cserv', 'Servicio y tenencia al año $')] },
  { q: 'Salud y escuela', a: 'Medicinas, consultas, colegiaturas… al mes.', c: [num35('salud', 'Al mes $')] },
  { q: 'Deudas personales', a: 'Lo que pagas al mes de tarjetas o préstamos personales.', c: [num35('deuda', 'Al mes $')] },
  { q: 'Ahorro e imprevistos', a: 'Cuánto te gustaría guardar cada mes para ti.', c: [num35('ahorro', 'Al mes $')] },
  { q: 'El negocio', si: function () { return !suel35Ganancia(); }, a: 'Todavía no hay suficientes días en la app para saber cuánto gana. ¿Cuánto crees que le queda limpio al negocio a la semana, después de pagar fruta, gasolina y sueldos?', c: [num35('ganSem', 'Le queda a la semana $')] },
  { q: '¿Cada cuándo te pagas?', c: [{ k: 'frec', t: 'opc', o: [['quincenal', 'Cada quincena'], ['semanal', 'Cada sábado']], falta: 'Escoge cada cuándo' }], auto: true },
  { q: 'Tu sueldo', html: function (d) {
    var r = suel35Calc(d), fr = d.frec || 'quincenal', per = fr === 'semanal' ? 'cada sábado' : 'cada quincena';
    if (d.elige == null) d.elige = 'sug';
    var mes = d.elige === 'nec' ? r.nec : (d.elige === 'yo' ? suel35Mes(d.yo, fr) : r.sug);
    var come = Math.max(0, mes - Math.round(r.ganMes));
    return '<div class="card">' + rw('Lo que necesita tu casa', money(r.nec) + ' al mes') + rw('Lo que deja el negocio' + (r.real ? ' (con los números de la app)' : ' (lo que me dijiste)'), money(r.ganMes) + ' al mes')
      + rw('Lo que puede pagarte (dejando 20% para el negocio)', money(r.pue) + ' al mes') + '<div style="font-size:18px;font-weight:900;margin-top:8px">Te sugiero ' + money(suel35Por(r.sug, fr)) + ' ' + per + '</div></div>'
      + '<div class="opc" role="group" style="margin-top:8px"><button data-act="wzop" data-k="elige" data-v="sug" aria-pressed="' + (d.elige === 'sug') + '">El sugerido: ' + money(suel35Por(r.sug, fr)) + '</button><button data-act="wzop" data-k="elige" data-v="nec" aria-pressed="' + (d.elige === 'nec') + '">Lo que necesito: ' + money(suel35Por(r.nec, fr)) + '</button><button data-act="wzop" data-k="elige" data-v="yo" aria-pressed="' + (d.elige === 'yo') + '">Lo pongo yo</button></div>'
      + (d.elige === 'yo' ? '<div class="field grande"><label for="wz_yo">Mi sueldo ' + per + ' $</label><input id="wz_yo" type="number" inputmode="decimal" data-wz="yo" value="' + esc(d.yo || '') + '"></div>' : '')
      + (come > 0 ? '<div class="card alert" style="margin-top:8px;padding:10px 12px"><b>Con este sueldo el negocio pierde ~' + money(come) + ' al mes</b><div class="lbl">Eso sale del dinero para comprar fruta. Por ahora lo aceptamos; cada quincena te digo cómo vamos con los números reales.</div></div>' : '');
  } }],
  guardar: function (d) {
    var r = suel35Calc(d), fr = d.frec || 'quincenal', mes = d.elige === 'nec' ? r.nec : (d.elige === 'yo' ? suel35Mes(d.yo, fr) : r.sug), m = suel35Por(mes, fr);
    if (!(m > 0)) return 'Escribe tu sueldo';
    var nom = 'Sueldo de ' + suel35Nom() + ' (dueño)';
    S.fijos = S.fijos || [];
    var f = S.fijos.filter(function (x) { return x && x.retiro && x.s35; })[0];
    if (!f) { f = { n: nom, m: String(m), dia: fr === 'semanal' ? '1' : '15', pag: '', frec: fr, retiro: true, s35: 1, mesIni: TODAY.getMonth() }; if (fr === 'semanal') f.dsem = 6; S.fijos.push(f); }
    else { f.m = String(m); f.frec = fr; if (fr === 'semanal') f.dsem = 6; else { f.dia = '15'; delete f.dsem; } }
    var det = { d: JSON.parse(JSON.stringify(d)), r: r, f: iso(TODAY), mes: mes, frec: fr };
    S.suel35 = det; suel35Nube(det);
    try { S.hist.push({ t: fmtF(iso(TODAY)) + ' ' + hhmm(), q: quien(), x: 'Sueldo del dueño: ' + money(m) + (fr === 'semanal' ? ' cada sábado' : ' cada quincena') }); } catch (e) {}
    toast('Listo: tu sueldo es ' + money(m) + (fr === 'semanal' ? ' cada sábado' : ' cada quincena'));
  } };
/* el detalle privado: en este celular y en la nube (solo dueño y desarrollador) */
function suel35Nube(det) { try { if (typeof NB !== 'undefined' && NB.on && NB.listo && NB.ad && NB.ad.set) NB.ad.set(nbP('priv/sueldo35'), { j: JSON.stringify(det), t: Date.now() }, false).catch(function () {}); } catch (e) {} }
function suel35Baja() { try { if (S.suel35 || !suel35Puede() || typeof NB === 'undefined' || !NB.on || !NB.listo || !NB.ad || !NB.ad.get || S._s35b) return; S._s35b = 1; NB.ad.get(nbP('priv/sueldo35')).then(function (x) { if (x && x.j && !S.suel35) { try { S.suel35 = JSON.parse(x.j); render(); } catch (e) {} } }, function () {}); } catch (e) {} }
/* que el detalle no viaje en la nube compartida ni en respaldos que ven otros */
try { var _i35 = NB_SH.indexOf('suel35'); if (_i35 > -1) NB_SH.splice(_i35, 1); } catch (e) {}
/* ---------- Inicio: ofrecerla (día 1–2) y la revisión de cada quincena ---------- */
function quin35() { var d = TODAY.getDate(); return iso(TODAY).slice(0, 7) + (d <= 15 ? '-1' : '-2'); }
function suel35Card() {
  if (!suel35Puede() || S.tab.admin !== 'inicio') return '';
  if (!S.suel35) {
    if (!(S.setup && S.setup.fin) || (S.suel35off && S.suel35off >= iso(TODAY))) return '';
    return '<div class="card" data-x="suel35" style="padding:14px;border:2px solid var(--accent)"><b style="font-size:18px">💰 ¿Cuánto te conviene pagarte?</b><div style="font-size:15px;margin-top:4px">Contesta unas preguntas de tus gastos (5 minutos) y te sugiero un sueldo que el negocio pueda pagar.</div>'
      + '<div style="display:flex;gap:8px;margin-top:10px"><button class="btn" style="flex:2" data-act="suel35ab">Empezar</button><button class="btn sec" style="flex:1" data-act="suel35mn">Mañana</button></div></div>';
  }
  var q = quin35(), dia = TODAY.getDate(); if (!(dia === 15 || dia === 16 || dia === 1 || dia === 2 || dia >= 28)) return '';
  var vis = (S.suel35.vis || {}); if (vis[q]) return '';
  var g = suel35Ganancia(), mes = num(S.suel35.mes);
  if (!g) return '<div class="card" data-x="suel35q" style="padding:12px 14px"><b>💰 Tu sueldo y el negocio</b><div class="lbl" style="margin-top:4px">Todavía no hay suficientes días en la app para comparar. La próxima quincena te digo cómo vamos.</div><button class="btn sec" style="margin-top:8px" data-act="suel35ok" data-v="nd">Entendido</button></div>';
  var pue = Math.round(g.mes * (1 - S35.colchon)), est = mes <= pue * 0.9 ? 'v' : (mes <= g.mes ? 'a' : 'r');
  var H = S.suel35.hq || [], prev = H.length ? H[H.length - 1].e : '', fr = S.suel35.frec || 'quincenal';
  var sugBaja = est === 'r' && prev === 'r', sugSube = est === 'v' && prev === 'v' && pue > mes * 1.1;
  var col = est === 'v' ? '#166534' : (est === 'a' ? '#B45309' : '#B91C1C'), txt = est === 'v' ? '🟢 Alcanza' : (est === 'a' ? '🟡 Está justo' : '🔴 Te estás comiendo el capital');
  var h = '<div class="card" data-x="suel35q" style="padding:14px;border:2.5px solid ' + col + '"><b style="font-size:18px">💰 Tu sueldo y el negocio</b><div style="font-size:17px;font-weight:900;color:' + col + ';margin-top:4px">' + txt + '</div>'
    + rw('El negocio ganó (promedio de 4 semanas)', money(g.mes) + ' al mes') + rw('Te pagas', money(mes) + ' al mes') + rw('Puede pagarte (con colchón)', money(pue) + ' al mes');
  if (sugBaja) h += '<div class="card alert" style="margin-top:8px;padding:10px 12px"><b>Te recomiendo bajarlo a ' + money(suel35Por(pue, fr)) + (fr === 'semanal' ? ' cada sábado' : ' cada quincena') + ' por ahora</b><div class="lbl">O revisa: subir un poco el precio, cobrar a los que deben, gastos que crecieron o fruta que se echó a perder (en Más → Estadísticas).</div></div>';
  if (sugSube) h += '<div class="card good" style="margin-top:8px;padding:10px 12px"><b>Puedes subirlo a ' + money(suel35Por(pue, fr)) + (fr === 'semanal' ? ' cada sábado' : ' cada quincena') + '</b><div class="lbl">Dos quincenas seguidas sobró dinero, con el colchón ya guardado.</div></div>';
  h += '<div style="display:flex;gap:8px;margin-top:10px;flex-wrap:wrap">' + (sugBaja || sugSube ? '<button class="btn" style="flex:1 1 140px" data-act="suel35ok" data-v="cambia" data-m="' + pue + '" data-e="' + est + '">' + (sugBaja ? 'Bajarlo' : 'Subirlo') + '</button><button class="btn sec" style="flex:1 1 110px" data-act="suel35ok" data-v="deja" data-e="' + est + '">Dejarlo así</button>' : '<button class="btn sec" style="flex:1" data-act="suel35ok" data-v="deja" data-e="' + est + '">Entendido</button>') + '</div></div>';
  return h;
}
document.addEventListener('click', function (e) {
  var b = e.target.closest && e.target.closest('[data-act^="suel35"]'); if (!b || S.role !== 'admin') return;
  e.preventDefault(); e.stopImmediatePropagation(); var a = b.dataset.act;
  if (a === 'suel35ab') { var d0 = S.suel35 ? JSON.parse(JSON.stringify(S.suel35.d || {})) : {}; d0.elige = null; wzAbre('suel35', d0); return; }
  if (a === 'suel35mn') { S.suel35off = iso(TODAY); render(); return; }
  if (a === 'suel35ok') {
    var q = quin35(), x = S.suel35; if (!x) return; x.vis = x.vis || {}; x.vis[q] = 1;
    if (b.dataset.e) { x.hq = (x.hq || []).concat([{ q: q, e: b.dataset.e }]).slice(-12); }
    if (b.dataset.v === 'cambia') {
      var fr = x.frec || 'quincenal', mes = num(b.dataset.m), m = suel35Por(mes, fr), f = (S.fijos || []).filter(function (y) { return y && y.retiro && y.s35; })[0];
      x.mes = mes; if (f) f.m = String(m); try { S.hist.push({ t: fmtF(iso(TODAY)) + ' ' + hhmm(), q: quien(), x: 'Cambió su sueldo a ' + money(m) + (fr === 'semanal' ? ' cada sábado' : ' cada quincena') }); } catch (er) {}
      toast('Listo: tu sueldo ahora es ' + money(m));
    }
    suel35Nube(x); render(); return;
  }
}, true);
/* Más → "💰 Mi sueldo" */
if (typeof mas92 === 'function') { var _mas35 = mas92; mas92 = function () { var h = _mas35.apply(this, arguments); try { if (!suel35Puede()) return h; var bt = '<button data-act="suel35ab" data-x="mas92-sueldo"><span class="ic92">💰</span>Mi sueldo<small>cuánto te conviene pagarte</small></button>', k = h.indexOf('data-x="mas92-bienes"'); var i = k > -1 ? h.lastIndexOf('<button', k) : -1; if (i > -1) h = h.slice(0, i) + bt + h.slice(i); } catch (er) {} return h; }; }
/* Gastos: "Mi carro (para el negocio)" */
try { if (!GTIP.some(function (x) { return x[0] === 'Mi carro (para el negocio)'; })) { var iR = GTIP.map(function (x) { return x[0]; }).indexOf('Retiro del dueño'); GTIP.splice(iR < 0 ? GTIP.length : iR, 0, ['Mi carro (para el negocio)', 'fuel', '#E07B1A']); } } catch (e) {}
var _rd35 = render;
render = function () {
  try { suel35Baja(); } catch (e) {}
  var r = _rd35.apply(this, arguments);
  try {
    if (S.role === 'admin' && S.tab.admin === 'inicio') {
      var m = document.querySelector('main');
      if (m && !m.querySelector('[data-x="suel35"],[data-x="suel35q"]')) { var h = suel35Card(); if (h) { var d = document.createElement('div'); d.innerHTML = h; var ref = m.querySelector('[data-x="hoy92"]'); if (ref) ref.after(d.firstElementChild); else m.appendChild(d.firstElementChild); } }
    }
  } catch (e) {}
  return r;
};
