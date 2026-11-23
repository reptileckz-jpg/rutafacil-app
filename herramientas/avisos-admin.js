/* 25 · Corre los avisos al administrador (functions/avisos25.js) para cada negocio. Lo llama .github/workflows/avisos.yml cada hora.
   El repositorio es PÚBLICO: no imprime nada del negocio (solo cuántos avisos salieron). */
const { initializeApp } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const { avisosDeNegocio } = require('./avisos25.js');
initializeApp({ projectId: process.env.GOOGLE_CLOUD_PROJECT || 'platanos-nietos' });
(async () => {
  const db = getFirestore();
  let n = 0, err = 0;
  for (const ref of await db.collection('n').listDocuments()) {
    try { n += await avisosDeNegocio(db, ref.id); } catch (e) { err++; }
  }
  console.log('Avisos mandados: ' + n + (err ? ' · negocios con error: ' + err : ''));
  if (err) process.exitCode = 1;
})();
