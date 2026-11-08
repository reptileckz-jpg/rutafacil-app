// Google Maps nativo (Capacitor). GitHub Actions lo empaqueta en www/mapas.js.
// La app solo usa window.GMAPA; si no está, o no hay llave (window.PN_GMAPS != true), usa Leaflet.
import {GoogleMap} from '@capacitor/google-maps';
import {registerPlugin} from '@capacitor/core';
window.GMAPA = GoogleMap;
window.GMAPA_PL = registerPlugin('CapacitorGoogleMaps');
