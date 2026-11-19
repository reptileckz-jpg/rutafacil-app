/* Ruta Fácil · versión web: deja abrir la app aunque falle el internet.
   Siempre intenta primero lo nuevo de internet (así cada versión publicada se ve al abrir) y, si no hay internet, usa la última copia.
   Los datos del negocio NO pasan por aquí: los guarda Firebase en el navegador, como en el celular. */
var CACHE = 'rf-web-__VER__';
var BASE = ['./', 'index.html', 'firebase.js', 'mapas-cfg.js', 'mapas.js', 'leaflet/leaflet.js', 'leaflet/leaflet.css', 'manifest.webmanifest', 'iconos/icono-192.png'];
self.addEventListener('install', function (e) {
  e.waitUntil(caches.open(CACHE).then(function (c) { return c.addAll(BASE); }).then(function () { return self.skipWaiting(); }));
});
self.addEventListener('activate', function (e) {
  e.waitUntil(caches.keys().then(function (L) { return Promise.all(L.filter(function (k) { return k !== CACHE; }).map(function (k) { return caches.delete(k); })); }).then(function () { return self.clients.claim(); }));
});
self.addEventListener('fetch', function (e) {
  var r = e.request;
  if (r.method !== 'GET' || new URL(r.url).origin !== self.location.origin) return;
  e.respondWith(fetch(r).then(function (res) {
    if (res && res.ok) { var copia = res.clone(); caches.open(CACHE).then(function (c) { c.put(r, copia); }); }
    return res;
  }).catch(function () { return caches.match(r).then(function (m) { return m || caches.match('index.html'); }); }));
});
