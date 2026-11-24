/* 148 · Lee los errores que mandó la app (n/{neg}/err) de los últimos N días y los imprime agrupados.
   Lo corre el flujo "Leer errores de la app" (GitHub → Actions) con la llave FIREBASE_SA. Solo imprime el texto del error, la versión,
   el papel, la pantalla y el número de chofer. Con BORRAR_DIAS>0 borra los más viejos que eso.
   32 · El repositorio es PÚBLICO: el texto de cada error pasa por limpio32() → solo quedan números, signos y palabras de una lista
   conocida; cualquier otra palabra (un nombre de cliente, por ejemplo) sale como "·". */
const { initializeApp } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
initializeApp();
const db = getFirestore();
const PAL32 = new Set(('las taras no cuadran por lugar total vacías en bodega llenas camión con clientes proveedores falla a b suma de ' +
  'cliente clientes dato ilegible id fuera redibujo atrasados la app cuenta y deberían ser faltan sobran cuéntalas hay un número que se ' +
  'puede leer cambió movimiento inicial saldo del verdes maduras kgverde kgmaduro reparto repartokg vacias cajas cuadra cuadran ' +
  'inventario negativos error errores reading undefined null of is not function cannot properties map container already initialized ' +
  'missing or insufficient permissions valid selector foreach').split(' '));
function limpio32(t) { return String(t || '').replace(/[A-Za-zÁÉÍÓÚÜÑáéíóúüñ]+/g, w => PAL32.has(w.toLowerCase()) ? w : '·').slice(0, 300); }
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
    for (const e of L) { const k = limpio32(e.tipo) + ' | ' + limpio32(e.txt); (G[k] = G[k] || []).push(e); }
    Object.entries(G).sort((a, b) => b[1].length - a[1].length).forEach(([k, X]) => {
      const vs = [...new Set(X.map(e => (e.web || '?') + '/' + (e.apk || '-')))].join(', ');
      console.log(`\n(${X.length}×) ${k}\n   versiones: ${vs}\n   último: ${X[0].f} ${X[0].h} · ${X[0].rol} · chofer ${X[0].ch || '-'} · ${limpio32(X[0].donde)}`);
    });
    if (borrar > 0) {
      const viejos = await n.collection('err').where('t', '<', Date.now() - borrar * 864e5).limit(400).get();
      for (const d of viejos.docs) await d.ref.delete();
      if (viejos.size) console.log(`\n(se borraron ${viejos.size} errores de hace más de ${borrar} días)`);
    }
  }
  console.log(`\nTotal: ${total}`);
})().catch(e => { console.error(e); process.exit(1); });
