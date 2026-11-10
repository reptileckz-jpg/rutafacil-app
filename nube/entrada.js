// Conexión real con Firebase. GitHub Actions la empaqueta en www/firebase.js (con esbuild).
// La app solo usa window.NUBE_AD: si este archivo no está (p. ej. en la página de prueba), la app funciona sin nube.
import {initializeApp} from 'firebase/app';
import {initializeAuth, indexedDBLocalPersistence, inMemoryPersistence, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, sendPasswordResetEmail, deleteUser} from 'firebase/auth';
import {initializeFirestore, persistentLocalCache, persistentSingleTabManager, doc, getDoc, setDoc, deleteDoc, collection, onSnapshot, deleteField, increment, query, where, limit, getDocs, documentId, orderBy} from 'firebase/firestore';

let cfg, app, auth, db, app2, auth2;
window.NUBE_AD = {
  init(c) {
    cfg = c;
    app = initializeApp(cfg);
    auth = initializeAuth(app, {persistence: indexedDBLocalPersistence});
    db = initializeFirestore(app, {localCache: persistentLocalCache({tabManager: persistentSingleTabManager()})});
  },
  onUser(cb) { return onAuthStateChanged(auth, u => cb(u ? {uid: u.uid, email: u.email} : null)); },
  login(email, pw) { return signInWithEmailAndPassword(auth, email, pw); },
  crear(email, pw) { return createUserWithEmailAndPassword(auth, email, pw).then(c => c.user.uid); },
  // crea la cuenta de otra persona sin cerrar la sesión del administrador
  crearOtro(email, pw) {
    if (!app2) { app2 = initializeApp(cfg, 'segunda'); auth2 = initializeAuth(app2, {persistence: inMemoryPersistence}); }
    return createUserWithEmailAndPassword(auth2, email, pw).then(c => { const uid = c.user.uid; return signOut(auth2).then(() => uid); });
  },
  salir() { return signOut(auth); },
  // borra la cuenta con la que se acaba de entrar (cuando se creó por error)
  borrarYo() { const u = auth.currentUser; return u ? deleteUser(u) : Promise.resolve(); },
  reset(email) { return sendPasswordResetEmail(auth, email); },
  get(path) { return getDoc(doc(db, path)).then(s => s.exists() ? s.data() : null); },
  set(path, obj, merge) { return setDoc(doc(db, path), obj, {merge: !!merge}); },
  borrar(path) { return deleteDoc(doc(db, path)); },
  watch(path, cb) {
    return onSnapshot(collection(db, path), snap => {
      cb(snap.docChanges().map(ch => ({id: ch.doc.id, data: ch.doc.data(), removed: ch.type === 'removed'})), snap.metadata.fromCache);
    }, err => console.error('nube escuchar', path, err));
  },
  watchDoc(path, cb) {
    return onSnapshot(doc(db, path), s => cb(s.exists() ? s.data() : null), err => console.error('nube escuchar', path, err));
  },
  del() { return deleteField(); },
  inc(n) { return increment(n); },
  // para que el celular suba su ubicación por su cuenta (servicio nativo)
  token() {
    const u = auth.currentUser;
    return u ? {refresh: u.refreshToken, uid: u.uid, apiKey: cfg.apiKey, proyecto: cfg.projectId} : null;
  },
  // documentos cuyo nombre está entre "desde" y "hasta" (p. ej. puntos de GPS de un día)
  rango(colPath, desde, hasta, max) {
    return getDocs(query(collection(db, colPath), where(documentId(), '>=', desde), where(documentId(), '<', hasta), orderBy(documentId()), limit(max || 500)))
      .then(s => s.docs.map(d => ({id: d.id, data: d.data()})));
  },
  viejas(colPath, campo, menorQue, max) {
    return getDocs(query(collection(db, colPath), where(campo, '<', menorQue), limit(max || 200))).then(s => s.docs.map(d => d.id));
  }
};
