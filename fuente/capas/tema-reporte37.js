/* ===================== TEMA · Reportar un error sacudiendo el celular, con captura, dibujo, audio y WhatsApp; pantalla de desarrollador (24 nov · punto 37 de la nueva numeración) =====================
   Plan del 30 nov (fuente/PLAN-ARRANQUE-30NOV.md). Decisiones de Ricardo: lo usan TODOS; sacudir + confirmar ("¿Reportar un problema?";
   no se activa si el GPS dice que vas en movimiento); la captura la toma la app (html2canvas, sin APK nuevo); se puede dibujar encima;
   dictar (micrófono del teclado) y grabar audio; se guarda en la app ("Problemas reportados") y abre WhatsApp al número de Ajustes.
   Pantalla de desarrollador SOLO para el usuario con la marca "dev" (la pone el dueño en Ajustes): todos los reportes con su captura y
   los errores automáticos, marcar arreglado, "Mandar todo a Claude" (sin nombres de clientes) y el estado de cada celular.
   Avisos al celular del desarrollador: cada reporte nuevo y cada error "no cuadra" (push con ch "dev"; la función avisoPush lo manda
   solo a los celulares de usuarios con la marca dev).
   No cambia ninguna cuenta. Se arma al final.
   ============================================================================================ */
var R37 = { t: [], ult: 0, cap: null, aud: null, rec: null };
function dev37() { try { if (typeof NB === 'undefined' || !NB.on || !NB.perfil) return S.role === 'admin' && !S.encOn; return !!NB.perfil.dev; } catch (e) { return false; } }
/* ---------- la captura de la pantalla ---------- */
function h2c37() {
  return new Promise(function (ok, no) {
    if (window.html2canvas) return ok(window.html2canvas);
    var s = document.createElement('script'); s.src = 'h2c/html2canvas.min.js'; s.onload = function () { window.html2canvas ? ok(window.html2canvas) : no(new Error('sin html2canvas')); }; s.onerror = function () { no(new Error('sin html2canvas')); };
    document.head.appendChild(s); setTimeout(function () { no(new Error('tarde')); }, 6000);
  });
}
function captura37() {
  return h2c37().then(function (h2c) {
    var w = window.innerWidth, h = window.innerHeight;
    return h2c(document.body, { x: window.scrollX, y: window.scrollY, width: w, height: h, scale: Math.min(1, 720 / Math.max(w, h)) * (window.devicePixelRatio > 1 ? 1.4 : 1), useCORS: true, logging: false, backgroundColor: null, ignoreElements: function (el) { return el && (el.id === 'rp56ov' || el.id === 'sk37ov' || el.id === 'dib37ov'); } })
      .then(function (cv) { return cv.toDataURL('image/jpeg', 0.72); });
  }).catch(function () { return null; });
}
/* abrir el reporte: primero la captura (de lo que se veía), luego la pantalla del reporte */
function abre37() {
  S.menu = false; S.help = false; S.sk37 = null; render();
  setTimeout(function () {
    captura37().then(function (img) {
      var b = document.createElement('button'); b.dataset.act = 'rp56'; b.dataset.cap37 = '1'; b.style.display = 'none'; document.body.appendChild(b); b.click(); b.remove();
      if (S.rp56) { S.rp56.foto = img || S.rp56.foto || null; S.rp56.auto37 = !!img; } render();
    });
  }, 80);
}
window.addEventListener('click', function (e) {
  var b = e.target.closest && e.target.closest('[data-act="rp56"]'); if (!b || b.dataset.cap37) return;
  e.preventDefault(); e.stopImmediatePropagation(); abre37();
}, true);
/* ---------- sacudir ---------- */
function sacude37(e) {
  try {
    var a = e.accelerationIncludingGravity || e.acceleration; if (!a || a.x == null) return;
    var g = Math.sqrt(a.x * a.x + a.y * a.y + a.z * a.z), ahora = Date.now();
    if (Math.abs(g - 9.8) < 14) return;
    R37.t = R37.t.filter(function (t) { return ahora - t < 900; }); R37.t.push(ahora);
    if (R37.t.length < 3 || ahora - R37.ult < 6000) return;
    R37.t = []; R37.ult = ahora;
    if (S.rp56 || S.sk37 || document.getElementById('pinov') || S.modal) return;
    var pide = function () { S.sk37 = { t: ahora }; render(); try { if (navigator.vibrate) navigator.vibrate(60); } catch (er) {} };
    if (navigator.geolocation && S.role === 'rep') {
      navigator.geolocation.getCurrentPosition(function (p) { var v = p.coords && p.coords.speed; if (v != null && v > 3) return; pide(); }, pide, { maximumAge: 20000, timeout: 2500 });
    } else pide();
  } catch (er) {}
}
window.addEventListener('devicemotion', sacude37);
function sk37HTML() {
  if (!S.sk37) return '';
  return '<div id="sk37ov" role="dialog" aria-label="¿Reportar un problema?" style="position:fixed;inset:0;z-index:90;background:rgba(0,0,0,.5);display:flex;align-items:center;justify-content:center;padding:16px"><div class="card" style="max-width:420px;width:100%;padding:18px"><div style="font-size:22px;font-weight:900">🐞 ¿Reportar un problema?</div><div class="lbl" style="margin-top:6px">Sacudiste el celular. La app toma una captura de lo que estabas viendo.</div>'
    + '<div style="display:flex;gap:8px;margin-top:14px"><button class="btn" style="flex:2;min-height:56px" data-act="sk37si">Sí, reportar</button><button class="btn sec" style="flex:1;min-height:56px" data-act="sk37no">No</button></div></div></div>';
}
/* ---------- dibujar encima de la captura ---------- */
function dib37HTML() {
  var x = S.dib37; if (!x || !S.rp56 || !S.rp56.foto) return '';
  return '<div id="dib37ov" role="dialog" aria-label="Señala el problema" style="position:fixed;inset:0;z-index:95;background:#111;display:flex;flex-direction:column"><div style="color:#fff;padding:10px 14px;font-weight:800">✏️ Con el dedo, encierra o raya dónde está el problema</div>'
    + '<div style="flex:1;display:flex;align-items:center;justify-content:center;overflow:hidden"><canvas id="dib37c" style="max-width:100%;max-height:100%;touch-action:none;background:#fff"></canvas></div>'
    + '<div style="display:flex;gap:8px;padding:10px"><button class="btn sec" style="flex:1" data-act="dib37undo">↶ Deshacer</button><button class="btn sec" style="flex:1" data-act="dib37x">Cancelar</button><button class="btn" style="flex:2" data-act="dib37ok">Listo</button></div></div>';
}
function dib37Monta() {
  var cv = document.getElementById('dib37c'); if (!cv || cv._m) return; cv._m = 1;
  var x = S.dib37, im = new Image(); im.onload = function () {
    cv.width = im.width; cv.height = im.height; var ctx = cv.getContext('2d');
    var pinta = function () { ctx.drawImage(im, 0, 0); ctx.strokeStyle = '#E11D48'; ctx.lineWidth = Math.max(4, im.width / 90); ctx.lineCap = 'round'; ctx.lineJoin = 'round'; x.tr.forEach(function (t) { ctx.beginPath(); t.forEach(function (p, i) { if (i) ctx.lineTo(p[0], p[1]); else ctx.moveTo(p[0], p[1]); }); ctx.stroke(); }); };
    x.pinta = pinta; pinta();
    var pos = function (e) { var r = cv.getBoundingClientRect(); return [(e.clientX - r.left) * cv.width / r.width, (e.clientY - r.top) * cv.height / r.height]; }, cur = null;
    cv.addEventListener('pointerdown', function (e) { cur = [pos(e)]; x.tr.push(cur); try { cv.setPointerCapture(e.pointerId); } catch (er) {} e.preventDefault(); });
    cv.addEventListener('pointermove', function (e) { if (!cur) return; cur.push(pos(e)); pinta(); e.preventDefault(); });
    cv.addEventListener('pointerup', function () { cur = null; });
  }; im.src = x.src;
}
/* ---------- grabar audio ---------- */
function aud37Empieza() {
  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia || typeof MediaRecorder === 'undefined') { toast('Este celular no deja grabar aquí: usa el micrófono del teclado para dictar'); return; }
  navigator.mediaDevices.getUserMedia({ audio: true }).then(function (st) {
    var ch = [], mr = new MediaRecorder(st); R37.rec = { mr: mr, st: st, t0: Date.now() };
    mr.ondataavailable = function (e) { if (e.data && e.data.size) ch.push(e.data); };
    mr.onstop = function () { try { st.getTracks().forEach(function (t) { t.stop(); }); } catch (er) {} var bl = new Blob(ch, { type: mr.mimeType || 'audio/webm' }), fr = new FileReader(); fr.onload = function () { if (S.rp56) { S.rp56.aud = fr.result; S.rp56.audS = Math.round((Date.now() - R37.rec.t0) / 1000); } R37.rec = null; render(); }; fr.readAsDataURL(bl); };
    mr.start(); render();
    setTimeout(function () { if (R37.rec && R37.rec.mr === mr && mr.state === 'recording') mr.stop(); }, 120000);
  }, function () { toast('Sin permiso de micrófono: usa el micrófono del teclado para dictar'); });
}
/* el reporte: botones nuevos */
var _rp37 = rp56HTML;
rp56HTML = function () {
  var h = _rp37.apply(this, arguments); if (!h || !S.rp56) return h;
  try {
    var x = S.rp56, grabando = !!(R37.rec && R37.rec.mr && R37.rec.mr.state === 'recording');
    var extra = (x.foto ? '<button class="btn sec" style="width:100%;min-height:52px;margin-top:8px" data-act="dib37">✏️ Señalar dónde está el problema</button>' : '')
      + '<button class="btn ' + (grabando ? '' : 'sec') + '" style="width:100%;min-height:52px;margin-top:8px' + (grabando ? ';background:#DC2626' : '') + '" data-act="aud37">' + (grabando ? '⏹️ Terminar de grabar' : (x.aud ? '🎙️ Volver a grabar (' + (x.audS || 0) + ' s)' : '🎙️ Grabar un audio (opcional)')) + '</button>'
      + (x.aud ? '<audio controls src="' + x.aud + '" style="width:100%;margin-top:6px"></audio>' : '');
    h = h.replace('<div class="lbl" style="margin-top:8px">La app agrega sola', extra + '<div class="lbl" style="margin-top:8px">La app agrega sola');
    if (x.auto37) h = h.replace('Cambiar la captura de pantalla', 'Cambiar la captura (ya se tomó sola)');
  } catch (e) {}
  return h;
};
/* al mandar: se guarda (como siempre), se avisa al desarrollador y se abre WhatsApp */
window.addEventListener('click', function (e) {
  var b = e.target.closest && e.target.closest('[data-act="rp56ok"]'); if (!b || !S.rp56) return;
  var x = S.rp56; if (!String(x.txt || '').trim() && x.aud) x.txt = '(audio)';
  if (!String(x.txt || '').trim() || !x.g) return;
  var copia = { foto: x.foto, aud: x.aud, txt: String(x.txt || '').trim(), donde: x.donde, g: x.g }, n0 = (S.probs || []).length;
  setTimeout(function () {
    try {
      var p = (S.probs || [])[n0]; if (p && copia.aud) { p.aud37 = 1; p.audS = x.audS || 0; }
      push37('🐞 Reporte de ' + quien(), copia.txt.slice(0, 160) + ' · ' + (copia.donde || ''));
      S.wa37x = { foto: copia.foto, aud: copia.aud, texto: '🐞 Reporte #' + (p ? p.n : '') + ' de ' + quien() + '\n' + (copia.donde || '') + '\n' + copia.txt };
      render();
    } catch (er) {}
  }, 30);
}, true);
function wa37HTML() {
  var x = S.wa37x; if (!x) return '';
  var tel = String((S.cfg || {}).wa37 || '').replace(/\D/g, '');
  return ovW70('wa37ov', '📲 Mandarlo por WhatsApp', '<div class="lbl">Quedó guardado en la app. ' + (tel ? 'Mándalo también por WhatsApp:' : 'Para mandarlo por WhatsApp, el administrador pone el número en Ajustes → "WhatsApp para los reportes".') + '</div>'
    + (tel ? '<button class="btn" style="width:100%;min-height:56px;margin-top:10px" data-act="wa37img">📲 Mandar ' + (x.foto ? 'la captura' : 'el reporte') + '</button>' + (x.aud ? '<button class="btn sec" style="width:100%;min-height:52px;margin-top:8px" data-act="wa37aud">🎙️ Mandar el audio</button>' : '') : '')
    + '<button class="btn sec" style="width:100%;margin-top:8px" data-act="wa37x">Listo</button>', 'wa37x');
}
document.addEventListener('click', function (e) {
  var b = e.target.closest && e.target.closest('[data-act^="wa37"],[data-act^="sk37"],[data-act^="dib37"],[data-act="aud37"]'); if (!b) return;
  e.preventDefault(); e.stopImmediatePropagation(); var a = b.dataset.act;
  if (a === 'sk37si') { abre37(); return; }
  if (a === 'sk37no') { S.sk37 = null; render(); return; }
  if (a === 'aud37') { if (R37.rec && R37.rec.mr && R37.rec.mr.state === 'recording') R37.rec.mr.stop(); else aud37Empieza(); return; }
  if (a === 'dib37') { if (S.rp56 && S.rp56.foto) { S.dib37 = { src: S.rp56.foto, tr: [] }; render(); } return; }
  if (a === 'dib37x') { S.dib37 = null; render(); return; }
  if (a === 'dib37undo') { if (S.dib37) { S.dib37.tr.pop(); if (S.dib37.pinta) S.dib37.pinta(); } return; }
  if (a === 'dib37ok') { var cv = document.getElementById('dib37c'); if (cv && S.rp56) { try { S.rp56.foto = cv.toDataURL('image/jpeg', 0.8); } catch (er) {} } S.dib37 = null; render(); return; }
  var x = S.wa37x; if (!x) return; var tel = String((S.cfg || {}).wa37 || '');
  if (a === 'wa37x') { S.wa37x = null; render(); return; }
  if (a === 'wa37img') {
    if (x.foto) natCompartir(x.foto, 'reporte.jpg', { tel: tel, texto: x.texto, mime: 'image/jpeg' }).then(function (ok) { if (!ok) try { window.open('https://wa.me/52' + telDiez(tel) + '?text=' + encodeURIComponent(x.texto), '_blank'); } catch (er) {} });
    else try { window.open('https://wa.me/52' + telDiez(tel) + '?text=' + encodeURIComponent(x.texto), '_blank'); } catch (er) {}
    return;
  }
  if (a === 'wa37aud') { natCompartir(x.aud, 'audio-reporte.webm', { tel: tel, mime: (x.aud.match(/^data:([^;]+)/) || [])[1] || 'audio/webm' }).then(function (ok) { if (!ok) toast('No se pudo abrir WhatsApp para el audio'); }); return; }
}, true);
/* ---------- avisos al celular del desarrollador ---------- */
function push37(titulo, texto) {
  try { if (typeof NB === 'undefined' || !NB.on || !NB.listo || !NB.ad || !NB.ad.set) return; var id = Date.now().toString(36) + '-dev-' + Math.random().toString(36).slice(2, 6);
    NB.ad.set(nbP('push/' + id), { ch: 'dev', titulo: String(titulo).slice(0, 200), texto: String(texto || '').slice(0, 1000), tipo: 'reporte', t: Date.now() }).catch(function () {}); } catch (e) {}
}
var _ae37 = apErr;
apErr = function (tipo, txt, donde) {
  var n0 = (S.probs || []).length, r = _ae37.apply(this, arguments);
  try { if ((S.probs || []).length > n0 && /no cuadra|número ilegible/.test(String(tipo))) push37('⚠️ ' + String(txt).split(':')[0], 'La app detectó: ' + String(txt).slice(0, 200)); } catch (e) {}
  return r;
};
/* ---------- Ajustes: número de WhatsApp, marca de desarrollador (la pone el dueño) y la pantalla de desarrollador ---------- */
var _aj37 = ajHTML;
ajHTML = function () {
  var h = _aj37.apply(this, arguments);
  try {
    if (!h || S.role !== 'admin' || S.encOn) return h;
    var x = '<div class="card" data-k="wa37aj"><b>📲 WhatsApp para los reportes</b><div class="lbl" style="margin-top:4px">Cuando alguien reporta un problema (sacudiendo el celular o desde el menú), se lo puede mandar a este número.</div><div class="field"><label for="wa37n">Número (10 dígitos)</label><input id="wa37n" type="tel" inputmode="tel" data-bind="cfg.wa37" value="' + esc((S.cfg || {}).wa37 || '') + '"></div></div>';
    if (dev37()) x += '<button class="btn" style="width:100%;min-height:54px;margin-top:8px" data-act="dev37ab">🛠️ Pantalla de desarrollador</button>';
    if (typeof NB !== 'undefined' && NB.on && NB.perfil && NB.perfil.duenio) {
      var U = Object.assign({}, NB.usuarios || {});
      /* el dueño también se puede marcar a sí mismo (si él es quien programa la app) */
      try { if (NB.user && NB.user.uid && !U[NB.user.uid]) U[NB.user.uid] = Object.assign({ rol: 'admin', activo: true }, NB.perfil, { nombre: (NB.perfil && NB.perfil.nombre) || 'Tú' }); } catch (e) {}
      var L = Object.keys(U).filter(function (u) { return U[u] && U[u].rol === 'admin' && U[u].activo !== false; });
      if (L.length) x += '<div class="card" data-k="dev37aj"><b>🛠️ Desarrollador de la app</b><div class="lbl" style="margin-top:4px">Quien tiene esta marca ve los reportes, los errores y los datos personales de tu sueldo. Solo tú (el dueño) la puedes poner.</div>'
        + L.map(function (u) { var p = U[u]; return '<div class="row" style="min-height:48px"><span>' + esc(p.nombre || p.email || u) + (NB.user && NB.user.uid === u ? ' (tú)' : '') + '</span><button class="btn sm ' + (p.dev ? '' : 'sec') + '" data-act="dev37set" data-uid="' + esc(u) + '" data-v="' + (p.dev ? '0' : '1') + '">' + (p.dev ? '✓ Desarrollador' : 'Hacer desarrollador') + '</button></div>'; }).join('') + '</div>';
    }
    var i = h.lastIndexOf('</div></div>'); return i > -1 ? h.slice(0, i) + x + h.slice(i) : h + x;
  } catch (e) { return h; }
};
document.addEventListener('click', function (e) {
  var b = e.target.closest && e.target.closest('[data-act^="dev37"]'); if (!b) return;
  e.preventDefault(); e.stopImmediatePropagation(); var a = b.dataset.act;
  if (a === 'dev37set') {
    var uid = b.dataset.uid, v = b.dataset.v === '1'; if (!NB || !NB.ad) return;
    NB.ad.set('usuarios_app/' + uid, { dev: v }, true).then(function () { if (NB.usuarios && NB.usuarios[uid]) NB.usuarios[uid].dev = v; try { if (NB.user && NB.user.uid === uid && NB.perfil) NB.perfil.dev = v; } catch (e2) {} toast(v ? 'Ya es desarrollador' : 'Se le quitó la marca'); render(); }, function (er) { toast(typeof nbErrTxt === 'function' ? nbErrTxt(er) : 'No se pudo'); });
    return;
  }
  if (!dev37()) return;
  if (a === 'dev37ab') { S.dev37 = { v: 'rep' }; S.aj = null; S.tab.admin = 'dev37'; render(); window.scrollTo(0, 0); return; }
  if (a === 'dev37v') { S.dev37 = S.dev37 || {}; S.dev37.v = b.dataset.v; render(); return; }
  if (a === 'dev37x') { S.tab.admin = 'inicio'; render(); return; }
  if (a === 'dev37claude') {
    var tx = dev37Paquete(); try { navigator.clipboard.writeText(tx).then(function () { toast('Copiado: pégalo en el chat con Claude'); }, function () { toast('No se pudo copiar'); }); } catch (er) {}
    return;
  }
  /* compartir o guardar: UNA imagen por reporte (su texto arriba y su captura abajo), para que se lea bien */
  if (a === 'dev37comp' || a === 'dev37guarda') {
    var R = dev37ConCaptura(), uno = b.dataset.id ? R.filter(function (p) { return String(p.id) === b.dataset.id; }) : R;
    if (!uno.length) { toast('No hay reportes pendientes'); return; }
    try { navigator.clipboard.writeText(dev37Paquete()).catch(function () {}); } catch (er) {}
    var nom = function (p) { return 'reporte-' + (p.auto ? 'auto-' + String(p.id).slice(-4) : p.n) + '.jpg'; };
    if (a === 'dev37comp') {
      var p0 = uno[0];
      dev37Hoja([p0], 0, 1).then(function (img) { return natCompartir(img, nom(p0), { mime: 'image/jpeg', wa: false, texto: 'Reporte ' + (p0.auto ? '(automático)' : '#' + p0.n) + ' de la app' }); })
        .then(function (ok) { toast(ok ? 'Listo. El texto de todos también quedó copiado.' : 'No se pudo compartir'); }, function () { toast('No se pudo armar la imagen'); });
      return;
    }
    var k = 0, sig = function () {
      if (k >= uno.length) { toast('Listo: ' + uno.length + ' imagen' + (uno.length === 1 ? '' : 'es') + ' en Descargas. El texto también quedó copiado.'); return; }
      var p1 = uno[k++]; dev37Hoja([p1], 0, 1).then(function (img) { return natGuardar(img.split(',')[1], nom(p1), 'image/jpeg'); }).then(sig, function () { toast('No se pudo guardar el reporte ' + (p1.n || '')); sig(); });
    };
    toast('Guardando ' + uno.length + ' imagen' + (uno.length === 1 ? '' : 'es') + '…'); sig();
    return;
  }
}, true);
function dev37ConCaptura() { return (S.probs || []).filter(function (p) { return p && !p.res; }).slice(-60).reverse(); }
/* una imagen larga: por cada reporte, su texto y debajo su captura */
function dev37Hoja(L, pg, tot) {
  var W = 800, M = 20, cargar = function (src) { return new Promise(function (ok) { if (!src || String(src).slice(0, 5) !== 'data:') return ok(null); var im = new Image(); im.onload = function () { ok(im); }; im.onerror = function () { ok(null); }; im.src = src; }); };
  return Promise.all(L.map(function (p) { return cargar(p.foto); })).then(function (IM) {
    var cv = document.createElement('canvas'), x = cv.getContext('2d'), lin = function (t, max) { var o = [], w = '', P = String(t || '').split(/\s+/); x.font = '20px sans-serif'; P.forEach(function (q) { var n = w ? w + ' ' + q : q; if (x.measureText(n).width > max && w) { o.push(w); w = q; } else w = n; }); if (w) o.push(w); return o; };
    var bloques = L.map(function (p, i) {
      var cab = (p.auto ? '⚙️ automático' : '🐞 #' + p.n) + ' · ' + (p.f || '') + ' ' + (p.h || '') + ' · ' + (p.rol || '') + ' · v' + (p.v || '?') + ' · ' + (p.donde || '');
      var T = lin(cab, W - 2 * M).concat(lin(p.txt || p.k || '', W - 2 * M)).concat(p.errs && p.errs.length ? lin('Errores: ' + p.errs.join(' | '), W - 2 * M).slice(0, 4) : []).concat(p.aud37 ? ['(trae audio: se mandó por WhatsApp)'] : []);
      var im = IM[i], ih = im ? Math.min(1500, Math.round(im.height * (W - 2 * M) / im.width)) : (p.foto ? 30 : 0);
      return { T: T, im: im, ih: ih, sinCarga: !im && !!p.foto };
    });
    var H = 70 + bloques.reduce(function (a, k) { return a + 30 + k.T.length * 28 + k.ih + 30; }, 0);
    cv.width = W; cv.height = Math.min(H, 30000); x.fillStyle = '#fff'; x.fillRect(0, 0, W, cv.height);
    x.fillStyle = '#111'; x.font = 'bold 24px sans-serif'; x.fillText((tot > 1 ? 'Reportes de la app · ' + (pg + 1) + ' de ' + tot : 'Reporte de la app') + ' · ' + fmtF(iso(TODAY)), M, 40);
    var y = 70;
    bloques.forEach(function (k) {
      x.strokeStyle = '#ddd'; x.beginPath(); x.moveTo(M, y); x.lineTo(W - M, y); x.stroke(); y += 30;
      x.fillStyle = '#111'; k.T.forEach(function (t, j) { x.font = (j === 0 ? 'bold ' : '') + '20px sans-serif'; x.fillText(t, M, y); y += 28; });
      if (k.im) { x.drawImage(k.im, M, y, W - 2 * M, k.ih); x.strokeStyle = '#999'; x.strokeRect(M, y, W - 2 * M, k.ih); y += k.ih; }
      else if (k.sinCarga) { x.fillStyle = '#888'; x.font = '18px sans-serif'; x.fillText('(la captura todavía no baja de la nube: abre el reporte y vuelve a intentar)', M, y + 20); y += 30; }
      y += 30;
    });
    return cv.toDataURL('image/jpeg', 0.82);
  });
}
function dev37SinNombres(t) { t = String(t || ''); try { (S.cli || []).forEach(function (c) { if (c && c.n && c.n.length > 2) t = t.split(c.n).join('cliente #' + c.id); }); } catch (e) {} return t; }
function dev37Paquete() {
  var L = (S.probs || []).filter(function (p) { return p && !p.res; }).slice(-60), v = (typeof PN_VER !== 'undefined' ? PN_VER : '');
  return 'Reportes de la app (versión ' + v + ', ' + fmtF(iso(TODAY)) + '):\n' + L.map(function (p) {
    return '- [' + (p.auto ? 'auto' : '#' + p.n) + '] ' + p.f + ' ' + (p.h || '') + ' · ' + (p.rol || '') + ' · ' + dev37SinNombres(p.donde || '') + ' · ' + (p.g || '') + '\n  ' + dev37SinNombres(p.txt || p.k || '').slice(0, 400) + (p.errs && p.errs.length ? '\n  errores: ' + dev37SinNombres(p.errs.join(' | ')).slice(0, 300) : '') + (p.foto ? '\n  (tiene captura)' : '') + (p.aud37 ? '\n  (tiene audio)' : '');
  }).join('\n');
}
function dev37HTML() {
  if (!dev37()) return '<h1>Desarrollador</h1><div class="card">Solo para el desarrollador de la app.</div>';
  var v = (S.dev37 || {}).v || 'rep', P = (S.probs || []).slice().reverse();
  var man = P.filter(function (p) { return p && !p.auto; }), aut = P.filter(function (p) { return p && p.auto; });
  var h = '<button class="link" data-act="dev37x">← Volver</button><h1>🛠️ Desarrollador</h1><div class="chips" role="group" style="margin:6px 0;flex-wrap:wrap">'
    + [['rep', 'Reportes (' + man.filter(function (p) { return !p.res; }).length + ')'], ['aut', 'Errores automáticos (' + aut.filter(function (p) { return !p.res; }).length + ')'], ['cel', 'Celulares']].map(function (o) { return '<button data-act="dev37v" data-v="' + o[0] + '" aria-pressed="' + (v === o[0]) + '">' + o[1] + '</button>'; }).join('') + '</div>'
    + '<button class="btn" style="width:100%;min-height:54px;margin:6px 0 0" data-act="dev37guarda">💾 Guardar todas en el celular (' + dev37ConCaptura().length + ')</button><div class="lbl" style="margin:4px 2px 0">Una imagen por reporte, con su texto y su captura. Quedan en Descargas: adjúntalas en el chat con Claude.</div>'
    + '<button class="btn sec" style="width:100%;min-height:48px;margin:8px 0 10px" data-act="dev37claude">📋 Copiar solo el texto (sin nombres de clientes)</button>';
  var tarjeta = function (p) {
    return '<div class="card" style="padding:12px 14px' + (p.res ? ';opacity:.6' : '') + '"><div style="display:flex;gap:8px;align-items:baseline"><b style="flex:1">' + (p.auto ? '⚙️ ' : '🐞 #' + p.n + ' ') + esc(String(p.txt || p.k || '').slice(0, 140)) + '</b></div>'
      + '<div class="lbl">' + esc(p.f || '') + ' ' + esc(p.h || '') + ' · ' + esc(p.q || '') + ' · ' + esc(p.donde || '') + (p.v ? ' · v' + esc(p.v) : '') + '</div>'
      + (p.foto && String(p.foto).slice(0, 5) === 'data:' ? '<img src="' + p.foto + '" alt="Captura del reporte" style="width:100%;max-height:260px;object-fit:contain;margin-top:6px;border-radius:10px;border:1px solid var(--line)">' : (p.foto ? '<div class="lbl">(captura guardada en la nube)</div>' : ''))
      + (p.aud37 ? '<div class="lbl">🎙️ Trae audio (' + (p.audS || 0) + ' s): se mandó por WhatsApp.</div>' : '')
      + (p.errs && p.errs.length ? '<details><summary class="lbl">Errores internos de ese momento</summary><div class="lbl">' + esc(p.errs.join(' · ')) + '</div></details>' : '')
      + '<div style="display:flex;flex-wrap:wrap;gap:6px;margin-top:6px">' + (p.res ? '' : '<button class="btn sm sec" style="width:auto" data-act="dev37comp" data-id="' + esc(p.id) + '">📤 Compartir</button><button class="btn sm sec" style="width:auto" data-act="dev37guarda" data-id="' + esc(p.id) + '">💾 Guardar</button>')
      + '<button class="btn sm ' + (p.res ? 'sec' : '') + '" style="width:auto" data-act="pr56res" data-id="' + esc(p.id) + '">' + (p.res ? 'Reabrir' : '✓ Arreglado') + '</button></div></div>';
  };
  if (v === 'rep') h += man.length ? man.slice(0, 80).map(tarjeta).join('') : '<div class="card">Sin reportes.</div>';
  else if (v === 'aut') h += aut.length ? aut.slice(0, 80).map(tarjeta).join('') : '<div class="card">Sin errores automáticos.</div>';
  else {
    var D = (typeof GPS !== 'undefined' && GPS.devs) ? GPS.devs : {}, K = Object.keys(D);
    h += K.length ? K.map(function (k) { var d = D[k] || {}, u = gpsUlt(d), ult = Math.max(num(d.hb), num(u.t)), min = ult ? Math.round((Date.now() - ult) / 60000) : null;
      return '<div class="card" style="padding:12px 14px"><b>' + esc(d.ch ? chofN(+d.ch) : (d.nom || 'Un celular')) + '</b>' + rw('Última señal', min == null ? '—' : (min < 2 ? 'ahorita' : 'hace ' + (min < 60 ? min + ' min' : Math.round(min / 60) + ' h'))) + (d.bat != null ? rw('Batería', num(d.bat) + '%') : '') + (d.v || d.ver ? rw('Versión', esc(d.v || d.ver)) : '') + '</div>'; }).join('')
      : '<div class="card">Todavía no hay celulares mandando su señal.</div>';
  }
  return h;
}
try { if (typeof VIEWS !== 'undefined') VIEWS.dev37 = dev37HTML; } catch (e) {}
var _rd37 = render;
render = function () {
  try { if (typeof VIEWS !== 'undefined' && !VIEWS.dev37) VIEWS.dev37 = dev37HTML; } catch (e) {}
  var r = _rd37.apply(this, arguments);
  try { ovPon70('sk37ov', sk37HTML()); ovPon70('wa37ov', wa37HTML()); if (!document.getElementById('dib37ov') || !S.dib37) ovPon70('dib37ov', dib37HTML()); dib37Monta(); } catch (e) { console.error('r37', e); }
  return r;
};
