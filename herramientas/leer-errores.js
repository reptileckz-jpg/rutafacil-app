/* 148 · Lee los errores que mandó la app (n/{neg}/err) de los últimos N días y los imprime agrupados.
   Lo corre el flujo "Leer errores de la app" (GitHub → Actions) con la llave FIREBASE_SA. Solo imprime el texto del error, la versión,
   el papel, la pantalla y el número de chofer (sin nombres de clientes). Con BORRAR_DIAS>0 borra los más viejos que eso. */
const { initializeApp } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
initializeApp();
const db = getFirestore();
const dias = Math.max(1, +process.env.DIAS || 7), borrar = +process.env.BORRAR_DIAS || 0;
(async () => {
  const desde = Date.now() - dias * 864e5;
  const negs = await db.collection('n').listDocuments();
  let total = 0;
  for (const n of negs) {
    const q = await n.collection('err').where('t', '>=', desde).get();
    const L = q.docs.map(d => d.data()).sort((a, b) => b.t - a.t);
    total += L.length;
    console.log(`\n===== negocio ${n.id}: ${L.length} errores en ${dias} días =====`);
    const G = {};
    for (const e of L) { const k = (e.tipo || '') + ' | ' + (e.txt || ''); (G[k] = G[k] || []).push(e); }
    Object.entries(G).sort((a, b) => b[1].length - a[1].length).forEach(([k, X]) => {
      const vs = [...new Set(X.map(e => (e.web || '?') + '/' + (e.apk || '-')))].join(', ');
      console.log(`\n(${X.length}×) ${k}\n   versiones: ${vs}\n   último: ${X[0].f} ${X[0].h} · ${X[0].rol} · chofer ${X[0].ch || '-'} · ${X[0].donde}`);
    });
    if (borrar > 0) {
      const viejos = await n.collection('err').where('t', '<', Date.now() - borrar * 864e5).limit(400).get();
      for (const d of viejos.docs) await d.ref.delete();
      if (viejos.size) console.log(`\n(se borraron ${viejos.size} errores de hace más de ${borrar} días)`);
    }
  }
  console.log(`\nTotal: ${total}`);
})().catch(e => { console.error(e); process.exit(1); });
