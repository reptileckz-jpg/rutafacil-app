/* 132 · Avisos push de Ruta Fácil (Firebase Cloud Messaging).
   Cuando el administrador asigna algo a un chofer, su celular escribe n/{neg}/push/{id} = {ch, titulo, texto, tipo, t}.
   Esta función lo manda al celular de ese chofer (su token está en n/{neg}/tok/{ch}), aunque la app esté cerrada,
   y borra el aviso. Si no se pudo, lo deja con el motivo (campo "error") para revisarlo. */
const { onDocumentCreated } = require('firebase-functions/v2/firestore');
const { initializeApp } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const { getMessaging } = require('firebase-admin/messaging');
initializeApp();

// 25 · los avisos al administrador (avisos25.js) los corre cada hora el workflow .github/workflows/avisos.yml


// la función corre en us-central1 (en México no hay funciones); el aviso se engancha desde la región de la base de datos (northamerica-south1)
exports.avisoPush = onDocumentCreated({ document: 'n/{neg}/push/{id}', region: 'us-central1' }, async (ev) => {
  const snap = ev.data; if (!snap) return;
  const d = snap.data() || {}, neg = ev.params.neg;
  if (!d.ch || !d.titulo) { await snap.ref.update({ error: 'aviso incompleto', fin: Date.now() }); return; }
  // 152 · "admins": un chofer pide permiso (fiar, mayoreo, precio) → a todos los celulares de administrador (tok/a~{uid})
  if (d.ch === 'admins') {
    const q = await getFirestore().collection(`n/${neg}/tok`).get();
    const L = q.docs.filter(x => x.id.startsWith('a~')).map(x => ({ ref: x.ref, t: x.get('t') })).filter(x => x.t);
    if (!L.length) { await snap.ref.update({ error: 'ningún celular de administrador registra sus avisos', fin: Date.now() }); return; }
    let bien = 0, err = '';
    for (const x of L) {
      try {
        await getMessaging().send({
          token: x.t,
          notification: { title: String(d.titulo).slice(0, 200), body: String(d.texto || '').slice(0, 1000) },
          android: { priority: 'high', notification: { channelId: 'avisos', sound: 'default', tag: String(d.tipo || 'permiso') + '-' + String(d.t || '') } },
          data: { tipo: String(d.tipo || 'permiso'), neg: String(neg) }
        });
        bien++;
      } catch (e) {
        const code = String((e && e.code) || '');
        if (/registration-token-not-registered|invalid-registration-token/.test(code)) await x.ref.delete().catch(() => {});
        err = String((e && e.message) || e);
      }
    }
    if (bien) await snap.ref.delete(); else await snap.ref.update({ error: err || 'no se pudo', fin: Date.now() });
    return;
  }
  const tok = await getFirestore().doc(`n/${neg}/tok/${d.ch}`).get();
  const t = tok.exists ? tok.get('t') : null;
  if (!t) { await snap.ref.update({ error: 'el celular de ese chofer todavía no registra sus avisos', fin: Date.now() }); return; }
  try {
    await getMessaging().send({
      token: t,
      notification: { title: String(d.titulo).slice(0, 200), body: String(d.texto || '').slice(0, 1000) },
      android: { priority: 'high', notification: { channelId: 'avisos', sound: 'default', tag: String(d.tipo || 'aviso') + '-' + String(d.ch) } },
      data: { tipo: String(d.tipo || ''), neg: String(neg) }
    });
    await snap.ref.delete();
  } catch (e) {
    const code = String((e && e.code) || '');
    if (/registration-token-not-registered|invalid-registration-token|invalid-argument/.test(code)) await tok.ref.delete().catch(() => {});
    await snap.ref.update({ error: String((e && e.message) || e), fin: Date.now() });
  }
});
