// Prueba de las reglas de Firestore con el emulador (corre en GitHub Actions).
import { initializeTestEnvironment, assertSucceeds, assertFails } from '@firebase/rules-unit-testing';
import { readFileSync } from 'node:fs';
import { doc, getDoc, setDoc, deleteDoc } from 'firebase/firestore';

const env = await initializeTestEnvironment({ projectId: 'rutafacil-prueba', firestore: { rules: readFileSync('firestore.rules', 'utf8') } });
let ok = 0, mal = 0;
async function prueba(nombre, fn) { try { await fn(); ok++; console.log('OK   ' + nombre); } catch (e) { mal++; console.log('FAIL ' + nombre + ' · ' + (e && e.message)); } }

// datos iniciales (sin reglas)
await env.withSecurityRulesDisabled(async (c) => {
  const db = c.firestore();
  await setDoc(doc(db, 'meta/duenio'), { uid: 'duenio', email: 'r@x.com' });
  await setDoc(doc(db, 'usuarios_app/duenio'), { rol: 'admin', activo: true, duenio: true, chId: 2 });
  await setDoc(doc(db, 'usuarios_app/admin2'), { rol: 'admin', activo: true, chId: 2, adm: 'rm' });
  await setDoc(doc(db, 'usuarios_app/danu'), { rol: 'chofer', activo: true, chId: 1, usuario: 'danu' });
  await setDoc(doc(db, 'usuarios_app/rafa'), { rol: 'chofer', activo: true, chId: 3, encHasta: Date.now() + 864e5 });
  await setDoc(doc(db, 'usuarios_app/cont'), { rol: 'cont', activo: true, chId: 0 });
  await setDoc(doc(db, 'usuarios_app/baja'), { rol: 'chofer', activo: false, chId: 4 });
  await setDoc(doc(db, 'usuarios/danu'), { email: 'danu.x@rutafacil.app' });
  await setDoc(doc(db, 'n/pn/d/s~precio'), { r: '{"R":250}' });
  await setDoc(doc(db, 'n/pn/d/s~cli'), { o: '[]' });
});
const db = (uid) => (uid ? env.authenticatedContext(uid) : env.unauthenticatedContext()).firestore();

await prueba('sin sesión: se puede buscar usuario → correo (para entrar)', () => assertSucceeds(getDoc(doc(db(null), 'usuarios/danu'))));
await prueba('sin sesión: NO se leen los datos', () => assertFails(getDoc(doc(db(null), 'n/pn/d/s~cli'))));
await prueba('chofer: lee los datos', () => assertSucceeds(getDoc(doc(db('danu'), 'n/pn/d/s~cli'))));
await prueba('chofer: escribe clientes y su ruta', async () => { await assertSucceeds(setDoc(doc(db('danu'), 'n/pn/d/s~cli'), { o: '[1]' }, { merge: true })); await assertSucceeds(setDoc(doc(db('danu'), 'n/pn/d/r~1~stops'), { o: '[]' })); });
await prueba('chofer: puede pasar clientes a otra ruta (apoyo)', () => assertSucceeds(setDoc(doc(db('danu'), 'n/pn/d/r~3~stops'), { o: '[2]' })));
await prueba('chofer: NO cambia el precio', () => assertFails(setDoc(doc(db('danu'), 'n/pn/d/s~precio'), { r: '{"R":1}' })));
await prueba('chofer: NO cambia la configuración', () => assertFails(setDoc(doc(db('danu'), 'n/pn/d/s~cfg'), { r: '{}' })));
await prueba('chofer: NO cambia el saldo base de los clientes', () => assertFails(setDoc(doc(db('danu'), 'n/pn/d/s~cliBase'), { k: 'm' })));
await prueba('chofer: SÍ suma/resta en los saldos (cliCnt)', () => assertSucceeds(setDoc(doc(db('danu'), 'n/pn/d/s~cliCnt'), { k: 'c' }, { merge: true })));
await prueba('chofer: NO cambia el plan de vacaciones', () => assertFails(setDoc(doc(db('danu'), 'n/pn/d/s~vacPlan'), { r: '{}' })));
await prueba('chofer: NO cambia las facturas', () => assertFails(setDoc(doc(db('danu'), 'n/pn/d/s~fac76'), { r: '{}' })));
await prueba('chofer: NO borra datos', () => assertFails(deleteDoc(doc(db('danu'), 'n/pn/d/s~cli'))));
await prueba('chofer: NO se hace administrador', () => assertFails(setDoc(doc(db('danu'), 'usuarios_app/danu'), { rol: 'admin' }, { merge: true })));
await prueba('chofer: NO crea otro perfil de administrador', () => assertFails(setDoc(doc(db('danu'), 'usuarios_app/nuevo'), { rol: 'admin', activo: true })));
await prueba('chofer: NO lee los perfiles de los demás', () => assertFails(getDoc(doc(db('danu'), 'usuarios_app/admin2'))));
await prueba('chofer: sí lee su propio perfil', () => assertSucceeds(getDoc(doc(db('danu'), 'usuarios_app/danu'))));
await prueba('chofer dado de baja: NO lee nada', () => assertFails(getDoc(doc(db('baja'), 'n/pn/d/s~cli'))));
await prueba('encargado (vigente): sí cambia el precio', () => assertSucceeds(setDoc(doc(db('rafa'), 'n/pn/d/s~precio'), { r: '{"R":260}' })));
await prueba('contador: sí registra cosas de dinero', () => assertSucceeds(setDoc(doc(db('cont'), 'n/pn/d/s~gastos'), { o: '[]' })));
await prueba('contador: NO toca a los usuarios', () => assertFails(setDoc(doc(db('cont'), 'usuarios_app/danu'), { activo: false }, { merge: true })));
await prueba('admin: da acceso a un chofer', () => assertSucceeds(setDoc(doc(db('admin2'), 'usuarios_app/pepe'), { rol: 'chofer', activo: true, chId: 5 })));
await prueba('admin: le quita el acceso a un chofer', () => assertSucceeds(setDoc(doc(db('admin2'), 'usuarios_app/danu'), { activo: false, quitado: 1 }, { merge: true })));
await prueba('admin (no dueño): NO crea administradores', () => assertFails(setDoc(doc(db('admin2'), 'usuarios_app/admin3'), { rol: 'admin', activo: true })));
await prueba('admin (no dueño): NO se pone de dueño', () => assertFails(setDoc(doc(db('admin2'), 'usuarios_app/admin2'), { duenio: true }, { merge: true })));
await prueba('dueño: crea un administrador', () => assertSucceeds(setDoc(doc(db('duenio'), 'usuarios_app/admin3'), { rol: 'admin', activo: true, chId: 2 })));
await prueba('admin (no dueño): da contraseña nueva a otro admin (lo reemplaza)', async () => {
  await assertSucceeds(setDoc(doc(db('admin2'), 'usuarios_app/admin3b'), { rol: 'admin', activo: true, chId: 2, reemplaza: 'admin3' }));
  await assertSucceeds(setDoc(doc(db('admin2'), 'usuarios_app/admin3'), { activo: false, reemplazo: 'admin3b' }, { merge: true }));
});
await prueba('admin (no dueño): NO reemplaza al dueño', () => assertFails(setDoc(doc(db('admin2'), 'usuarios_app/x'), { rol: 'admin', activo: true, reemplaza: 'duenio' })));
await prueba('admin: cierra la sesión de otro admin en sus celulares', () => assertSucceeds(setDoc(doc(db('admin2'), 'usuarios_app/admin3b'), { corte: Date.now() }, { merge: true })));
await prueba('37 · dueño: se pone a sí mismo la marca de desarrollador (y se la quita)', async () => {
  await assertSucceeds(setDoc(doc(db('duenio'), 'usuarios_app/duenio'), { dev: true }, { merge: true }));
  await assertSucceeds(setDoc(doc(db('duenio'), 'usuarios_app/duenio'), { dev: false }, { merge: true }));
});
await prueba('37 · dueño: a sí mismo NO se cambia otra cosa (papel, activo)', async () => {
  await assertFails(setDoc(doc(db('duenio'), 'usuarios_app/duenio'), { rol: 'chofer' }, { merge: true }));
  await assertFails(setDoc(doc(db('duenio'), 'usuarios_app/duenio'), { dev: true, activo: false }, { merge: true }));
});
await prueba('37 · admin (no dueño): NO se pone la marca de desarrollador', () => assertFails(setDoc(doc(db('admin2'), 'usuarios_app/admin2'), { dev: true }, { merge: true })));
await prueba('37 · admin (no dueño): NO se la pone a otro', () => assertFails(setDoc(doc(db('admin2'), 'usuarios_app/danu'), { dev: true }, { merge: true })));
await prueba('37 · dueño: se la pone a otro administrador', () => assertSucceeds(setDoc(doc(db('duenio'), 'usuarios_app/admin2'), { dev: true }, { merge: true })));
await prueba('nadie toma el lugar del dueño', () => assertFails(setDoc(doc(db('admin2'), 'meta/duenio'), { uid: 'admin2' })));
await prueba('fotos: el chofer sube, el admin borra', async () => { await assertSucceeds(setDoc(doc(db('pepe'), 'n/pn/f/1'), { d: 'x' })); await assertFails(deleteDoc(doc(db('pepe'), 'n/pn/f/1'))); await assertSucceeds(deleteDoc(doc(db('duenio'), 'n/pn/f/1'))); });
await prueba('GPS: el celular del chofer sube su ubicación; el chofer NO la lee', async () => {
  await assertSucceeds(setDoc(doc(db('rafa'), 'n/pn/gps/cel1'), { dev: 'cel1', t: 1, ult: '{}' }));
  await assertSucceeds(setDoc(doc(db('rafa'), 'n/pn/gpsp/cel1_0000000000001'), { dev: 'cel1', t: 1, v: '[]' }));
  await assertFails(setDoc(doc(db('rafa'), 'n/pn/gpsp/otro_0000000000001'), { dev: 'cel1', t: 1, v: '[]' }));
  await assertFails(getDoc(doc(db('pepe'), 'n/pn/gps/cel1')));
  await assertFails(deleteDoc(doc(db('pepe'), 'n/pn/gpsp/cel1_0000000000001')));
});
await prueba('GPS: aunque el chofer esté dado de baja, su celular sigue mandando', () => assertSucceeds(setDoc(doc(db('baja'), 'n/pn/gps/cel2'), { dev: 'cel2', t: 1 })));
await prueba('GPS: el admin lee y borra lo viejo; sin sesión nada', async () => {
  await assertSucceeds(getDoc(doc(db('duenio'), 'n/pn/gps/cel1')));
  await assertSucceeds(deleteDoc(doc(db('duenio'), 'n/pn/gpsp/cel1_0000000000001')));
  await assertFails(setDoc(doc(db(null), 'n/pn/gps/cel9'), { dev: 'cel9' }));
});
await prueba('push: el chofer guarda SU token (y no el de otro); nadie lo lee; sin acceso, nada', async () => {
  /* danu ya no tiene acceso (una prueba de arriba se lo quitó): se usa otro chofer activo */
  await env.withSecurityRulesDisabled(async (c) => { await setDoc(doc(c.firestore(), 'usuarios_app/pepe'), { rol: 'chofer', activo: true, chId: 6 }); });
  await assertSucceeds(setDoc(doc(db('pepe'), 'n/pn/tok/6'), { t: 'tokenpepe', ts: 1 }));
  await assertFails(setDoc(doc(db('pepe'), 'n/pn/tok/3'), { t: 'x', ts: 1 }));
  await assertFails(setDoc(doc(db('pepe'), 'n/pn/tok/6'), { t: 'x', ts: 1, otro: 1 }));
  await assertFails(getDoc(doc(db('pepe'), 'n/pn/tok/6')));
  await assertFails(getDoc(doc(db('duenio'), 'n/pn/tok/6')));
  await assertFails(setDoc(doc(db('danu'), 'n/pn/tok/1'), { t: 'x', ts: 1 }));
  await assertFails(setDoc(doc(db('baja'), 'n/pn/tok/4'), { t: 'x', ts: 1 }));
});
await prueba('push: solo el administrador (o el encargado) manda un aviso; el chofer no', async () => {
  const av = { ch: '1', titulo: '📦 Pedido nuevo', texto: 'Doña Mary: 10 cajas', tipo: 'pedido', t: 1 };
  await assertSucceeds(setDoc(doc(db('duenio'), 'n/pn/push/a1'), av));
  await assertSucceeds(setDoc(doc(db('rafa'), 'n/pn/push/a2'), av));
  await assertFails(setDoc(doc(db('danu'), 'n/pn/push/a3'), av));
  await assertFails(setDoc(doc(db('duenio'), 'n/pn/push/a4'), { ...av, extra: 1 }));
  await assertFails(getDoc(doc(db('duenio'), 'n/pn/push/a1')));
});
await prueba('152 · el chofer avisa a los administradores SOLO para pedir permiso', async () => {
  const pe = { ch: 'admins', titulo: '🙋 Piden permiso', texto: 'Pepe quiere fiarle a Doña Mary', tipo: 'permiso', t: 1 };
  await assertSucceeds(setDoc(doc(db('pepe'), 'n/pn/push/p1'), pe));
  await assertFails(setDoc(doc(db('pepe'), 'n/pn/push/p2'), { ...pe, tipo: 'pedido' }));
  await assertFails(setDoc(doc(db('pepe'), 'n/pn/push/p3'), { ...pe, ch: '1' }));
  await assertFails(setDoc(doc(db('baja'), 'n/pn/push/p4'), pe));
  await assertSucceeds(setDoc(doc(db('duenio'), 'n/pn/tok/a~duenio'), { t: 'tokenadmin', ts: 1 }));
  await assertFails(setDoc(doc(db('pepe'), 'n/pn/tok/a~pepe'), { t: 'x', ts: 1 }));
});
await prueba('148 · errores: cualquiera con acceso los manda (solo crear); solo el admin los lee', async () => {
  const er = { t: 1, f: '2026-11-19', h: '10:00', tipo: 'error interno', txt: 'x is not a function', donde: 'Chofer · Ruta', rol: 'rep', ch: '6', web: '10.5', apk: '1.0.52' };
  await assertSucceeds(setDoc(doc(db('pepe'), 'n/pn/err/e1'), er));
  await assertFails(setDoc(doc(db('pepe'), 'n/pn/err/e2'), { ...er, nombre: 'Doña Mary' }));
  await assertFails(setDoc(doc(db('pepe'), 'n/pn/err/e3'), { ...er, txt: 'x'.repeat(301) }));
  await assertFails(getDoc(doc(db('pepe'), 'n/pn/err/e1')));
  await assertFails(setDoc(doc(db('pepe'), 'n/pn/err/e1'), { ...er, txt: 'otro' }));
  await assertFails(setDoc(doc(db('baja'), 'n/pn/err/e4'), er));
  await assertSucceeds(getDoc(doc(db('duenio'), 'n/pn/err/e1')));
  await assertSucceeds(deleteDoc(doc(db('duenio'), 'n/pn/err/e1')));
});
await prueba('cuenta nueva del negocio: el dueño crea su perfil', async () => {
  await env.clearFirestore();
  const d = db('nuevoDuenio');
  await assertSucceeds(setDoc(doc(d, 'meta/duenio'), { uid: 'nuevoDuenio' }));
  await assertSucceeds(setDoc(doc(d, 'usuarios_app/nuevoDuenio'), { rol: 'admin', activo: true, duenio: true, chId: 2 }));
  await assertFails(setDoc(doc(db('otro'), 'usuarios_app/otro'), { rol: 'admin', activo: true, duenio: true }));
});
console.log(ok + ' OK · ' + mal + ' FAIL');
await env.cleanup();
process.exit(mal ? 1 : 0);
