/* 44 · "Cuenta nueva desde cero" (decisión de Ricardo, 26 nov): deja la nube como recién creada para que el dueño (su papá) abra la
   cuenta nueva el sábado 28 y haga la configuración inicial con datos reales.
   Lo corre a mano el flujo "Reiniciar la nube (cuenta nueva)" (GitHub → Actions) con la llave FIREBASE_SA.
   1) RESPALDO dentro de la misma nube (privado: las reglas no dejan leer "respaldos" a nadie desde la app; el repositorio es público,
      así que NO se imprime ni se sube nada del negocio a GitHub): respaldos/{fecha}/docs/{n} = {p: ruta, d: datos}
      y respaldos/{fecha}/cuentas/{uid} = {email, desactivada} (sin contraseñas).
   2) BORRA: meta, usuarios, usuarios_app y n/… (todo lo del negocio) y TODAS las cuentas de entrada (Authentication).
   Con MODO=contar solo cuenta (no respalda ni borra). Con MODO=borrar exige CONFIRMA="BORRAR TODO".
   Solo imprime números (cuántos documentos y cuentas), nunca nombres, correos ni datos. */
const { initializeApp } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const { getAuth } = require('firebase-admin/auth');
initializeApp();
const db = getFirestore(), auth = getAuth();
const MODO = process.env.MODO || 'contar', CONFIRMA = process.env.CONFIRMA || '';
const RAICES = ['meta', 'usuarios', 'usuarios_app', 'n'];

async function todosLosDocs() {
  const L = [];
  async function bajar(col) {
    const refs = await col.listDocuments();
    for (const ref of refs) {
      const s = await ref.get();
      if (s.exists) L.push({ p: ref.path, d: s.data() });
      for (const sub of await ref.listCollections()) await bajar(sub);
    }
  }
  for (const r of RAICES) await bajar(db.collection(r));
  return L;
}
async function todasLasCuentas() {
  const L = []; let tok;
  do { const r = await auth.listUsers(1000, tok); r.users.forEach(u => L.push({ uid: u.uid, email: u.email || '', desactivada: !!u.disabled })); tok = r.pageToken; } while (tok);
  return L;
}
(async () => {
  const docs = await todosLosDocs(), cuentas = await todasLasCuentas();
  const porRaiz = {}; docs.forEach(x => { const k = x.p.split('/')[0]; porRaiz[k] = (porRaiz[k] || 0) + 1; });
  console.log('Documentos en la nube:', docs.length, JSON.stringify(porRaiz));
  console.log('Cuentas de entrada:', cuentas.length);
  if (MODO !== 'borrar') { console.log('MODO=contar: no se respaldó ni se borró nada.'); return; }
  if (CONFIRMA !== 'BORRAR TODO') { console.log('Falta escribir exactamente "BORRAR TODO" para borrar. No se hizo nada.'); process.exit(1); }
  /* 1) respaldo */
  const f = new Date().toISOString().replace(/[-:]/g, '').slice(0, 13), base = db.collection('respaldos').doc(f);
  await base.set({ t: Date.now(), docs: docs.length, cuentas: cuentas.length, nota: 'Respaldo antes de la cuenta nueva desde cero' });
  let w = db.batch(), n = 0, i = 0;
  const pon = async (ref, data) => { w.set(ref, data); if (++n >= 400) { await w.commit(); w = db.batch(); n = 0; } };
  for (const x of docs) await pon(base.collection('docs').doc(String(i++).padStart(6, '0')), { p: x.p, d: x.d });
  for (const c of cuentas) await pon(base.collection('cuentas').doc(c.uid), c);
  if (n) await w.commit();
  /* comprobar el respaldo antes de borrar */
  const nd = (await base.collection('docs').count().get()).data().count, nc = (await base.collection('cuentas').count().get()).data().count;
  console.log('Respaldo guardado:', nd, 'documentos y', nc, 'cuentas (respaldos/' + f + ')');
  if (nd !== docs.length || nc !== cuentas.length) { console.log('El respaldo no está completo: NO se borra nada.'); process.exit(1); }
  /* 2) borrar */
  for (const r of RAICES) await db.recursiveDelete(db.collection(r));
  for (let k = 0; k < cuentas.length; k += 1000) await auth.deleteUsers(cuentas.slice(k, k + 1000).map(c => c.uid));
  const quedan = (await todosLosDocs()).length, quedanC = (await todasLasCuentas()).length;
  console.log('Listo. Quedan', quedan, 'documentos del negocio y', quedanC, 'cuentas. La nube está como nueva: el dueño ya puede abrir la cuenta.');
})().catch(e => { console.error('Error:', (e && e.message) || e); process.exit(1); });
