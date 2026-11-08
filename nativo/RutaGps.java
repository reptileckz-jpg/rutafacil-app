package com.rutafacil.app;

import android.app.Notification;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.app.Service;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.content.SharedPreferences;
import android.content.pm.ServiceInfo;
import android.location.Location;
import android.location.LocationManager;
import android.net.ConnectivityManager;
import android.net.NetworkInfo;
import android.os.BatteryManager;
import android.os.Build;
import android.os.Handler;
import android.os.HandlerThread;
import android.os.IBinder;

import androidx.core.app.NotificationCompat;

import com.google.android.gms.location.FusedLocationProviderClient;
import com.google.android.gms.location.LocationAvailability;
import com.google.android.gms.location.LocationCallback;
import com.google.android.gms.location.LocationRequest;
import com.google.android.gms.location.LocationResult;
import com.google.android.gms.location.LocationServices;
import com.google.android.gms.location.Priority;

import org.json.JSONArray;
import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileOutputStream;
import java.io.FileReader;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.List;

/* Ubicación del celular del negocio, siempre prendida (aunque nadie tenga la sesión abierta).
   En ruta o en viaje de carga: cada 30 segundos. Fuera de eso: cada 5 minutos.
   Si no hay señal, los puntos se guardan en el celular y se suben cuando regresa. */
public class RutaGps extends Service {
    static final String PREF = "rutagps";
    static final int NID = 7301;
    static final String CANAL = "gps";
    static final String BUF = "gps_buf.jsonl";

    private FusedLocationProviderClient cli;
    private HandlerThread ht;
    private Handler h;
    private String modoAct = "";
    private long ultSubida = 0;
    private boolean subidaPend = false;
    private boolean ubOff = false;

    public static void arrancar(Context c) {
        try {
            Intent i = new Intent(c, RutaGps.class);
            if (Build.VERSION.SDK_INT >= 26) c.startForegroundService(i); else c.startService(i);
        } catch (Throwable e) { evento(c, "no_arranco"); }
    }

    static SharedPreferences pr(Context c) { return c.getSharedPreferences(PREF, Context.MODE_PRIVATE); }

    /* guarda un evento (apagado, encendido, ubicación apagada…) para subirlo con el siguiente punto */
    static synchronized void evento(Context c, String tipo) {
        try {
            SharedPreferences p = pr(c);
            JSONArray a = new JSONArray(p.getString("evs", "[]"));
            JSONObject o = new JSONObject();
            o.put("e", tipo);
            o.put("t", System.currentTimeMillis());
            a.put(o);
            while (a.length() > 20) a.remove(0);
            p.edit().putString("evs", a.toString()).apply();
        } catch (Exception e) { }
    }

    private final LocationCallback cb = new LocationCallback() {
        @Override public void onLocationResult(LocationResult r) {
            for (Location l : r.getLocations()) punto(l);
        }
        @Override public void onLocationAvailability(LocationAvailability a) {
            boolean on = ubPrendida();
            if (!on && !ubOff) { ubOff = true; evento(RutaGps.this, "ubicacion_off"); subir(true); }
            if (on && ubOff) { ubOff = false; evento(RutaGps.this, "ubicacion_on"); }
        }
    };

    @Override public void onCreate() {
        super.onCreate();
        ht = new HandlerThread("rutagps");
        ht.start();
        h = new Handler(ht.getLooper());
        cli = LocationServices.getFusedLocationProviderClient(this);
    }

    @Override public int onStartCommand(Intent intent, int flags, int startId) {
        try {
            Notification n = aviso();
            if (Build.VERSION.SDK_INT >= 29) startForeground(NID, n, ServiceInfo.FOREGROUND_SERVICE_TYPE_LOCATION);
            else startForeground(NID, n);
        } catch (Throwable e) {
            evento(this, "sin_permiso");
            h.post(() -> subir(true));
            stopSelf();
            return START_NOT_STICKY;
        }
        modoAct = "";
        h.post(this::pedir);
        h.removeCallbacks(latido);
        h.postDelayed(latido, 60000);
        return START_STICKY;
    }

    private Notification aviso() {
        NotificationManager nm = (NotificationManager) getSystemService(Context.NOTIFICATION_SERVICE);
        if (Build.VERSION.SDK_INT >= 26 && nm.getNotificationChannel(CANAL) == null) {
            NotificationChannel ch = new NotificationChannel(CANAL, "Ubicación del celular del negocio", NotificationManager.IMPORTANCE_LOW);
            ch.setShowBadge(false);
            nm.createNotificationChannel(ch);
        }
        Intent abrir = getPackageManager().getLaunchIntentForPackage(getPackageName());
        PendingIntent pi = abrir == null ? null : PendingIntent.getActivity(this, 0, abrir, PendingIntent.FLAG_IMMUTABLE);
        return new NotificationCompat.Builder(this, CANAL)
            .setSmallIcon(getApplicationInfo().icon)
            .setContentTitle("Ruta Fácil")
            .setContentText("Celular del negocio: ubicación activa")
            .setOngoing(true)
            .setPriority(NotificationCompat.PRIORITY_LOW)
            .setContentIntent(pi)
            .build();
    }

    private boolean enRuta() { return pr(this).getBoolean("ruta", false); }

    private boolean ubPrendida() {
        try {
            LocationManager lm = (LocationManager) getSystemService(Context.LOCATION_SERVICE);
            if (Build.VERSION.SDK_INT >= 28) return lm.isLocationEnabled();
            return lm.isProviderEnabled(LocationManager.GPS_PROVIDER) || lm.isProviderEnabled(LocationManager.NETWORK_PROVIDER);
        } catch (Exception e) { return true; }
    }

    /* pide la ubicación con el intervalo que toca */
    private void pedir() {
        boolean r = enRuta();
        String m = r ? "ruta" : "fuera";
        if (m.equals(modoAct)) return;
        modoAct = m;
        try { cli.removeLocationUpdates(cb); } catch (Exception e) { }
        LocationRequest req = new LocationRequest.Builder(r ? Priority.PRIORITY_HIGH_ACCURACY : Priority.PRIORITY_BALANCED_POWER_ACCURACY, r ? 30000 : 300000)
            .setMinUpdateIntervalMillis(r ? 20000 : 120000)
            .build();
        try {
            cli.requestLocationUpdates(req, cb, ht.getLooper());
        } catch (SecurityException e) {
            evento(this, "sin_permiso");
            subir(true);
        }
    }

    /* cada minuto revisa el modo; cada 5 minutos avisa que el celular sigue vivo (aunque no haya GPS) */
    private final Runnable latido = new Runnable() {
        @Override public void run() {
            pedir();
            long ahora = System.currentTimeMillis();
            if (ahora - ultSubida > 300000) subir(true);
            h.postDelayed(this, 60000);
        }
    };

    private int bateria() {
        try {
            BatteryManager bm = (BatteryManager) getSystemService(Context.BATTERY_SERVICE);
            return bm.getIntProperty(BatteryManager.BATTERY_PROPERTY_CAPACITY);
        } catch (Exception e) { return -1; }
    }

    private boolean cargando() {
        try {
            Intent b = registerReceiver(null, new IntentFilter(Intent.ACTION_BATTERY_CHANGED));
            int s = b == null ? -1 : b.getIntExtra(BatteryManager.EXTRA_STATUS, -1);
            return s == BatteryManager.BATTERY_STATUS_CHARGING || s == BatteryManager.BATTERY_STATUS_FULL;
        } catch (Exception e) { return false; }
    }

    private synchronized void punto(Location l) {
        try {
            JSONObject o = new JSONObject();
            o.put("t", l.getTime() > 0 ? l.getTime() : System.currentTimeMillis());
            o.put("lat", Math.round(l.getLatitude() * 1e6) / 1e6);
            o.put("lng", Math.round(l.getLongitude() * 1e6) / 1e6);
            o.put("acc", Math.round(l.getAccuracy()));
            if (l.hasSpeed()) o.put("vel", Math.round(l.getSpeed() * 3.6));
            o.put("bat", bateria());
            o.put("ch", pr(this).getString("ch", ""));
            File f = new File(getFilesDir(), BUF);
            try (FileOutputStream w = new FileOutputStream(f, true)) { w.write((o.toString() + "\n").getBytes("UTF-8")); }
            pr(this).edit().putString("ult", o.toString()).apply();
        } catch (Exception e) { }
        subir(false);
    }

    /* sube a la nube. En ruta junta los puntos y los sube cada 2 minutos (para no gastar de más) */
    private void subir(boolean ya) {
        long ahora = System.currentTimeMillis();
        long espera = enRuta() ? 120000 : 0;
        if (!ya && ahora - ultSubida < espera) {
            if (!subidaPend) { subidaPend = true; h.postDelayed(() -> { subidaPend = false; subir(true); }, espera - (ahora - ultSubida)); }
            return;
        }
        if (!hayRed()) return;
        try {
            if (subirAhora(this, bateria(), cargando(), enRuta())) ultSubida = ahora;
        } catch (Throwable e) { }
    }

    private boolean hayRed() {
        try {
            ConnectivityManager cm = (ConnectivityManager) getSystemService(Context.CONNECTIVITY_SERVICE);
            NetworkInfo ni = cm.getActiveNetworkInfo();
            return ni != null && ni.isConnected();
        } catch (Exception e) { return true; }
    }

    /* ---------- nube (Firestore por REST, con la sesión que dejó guardada la app) ---------- */
    static synchronized boolean subirAhora(Context c, int bat, boolean carga, boolean ruta) throws Exception {
        SharedPreferences p = pr(c);
        String proyecto = p.getString("proyecto", ""), base = p.getString("base", ""), dev = p.getString("dev", "");
        if (proyecto.isEmpty() || base.isEmpty() || dev.isEmpty()) return false;
        String tok = token(c);
        if (tok == null) return false;

        File f = new File(c.getFilesDir(), BUF);
        List<String> L = new ArrayList<>();
        if (f.exists()) {
            try (BufferedReader r = new BufferedReader(new FileReader(f))) {
                String s;
                while ((s = r.readLine()) != null) if (!s.trim().isEmpty()) L.add(s);
            }
        }
        int n = Math.min(L.size(), 400);
        JSONArray pts = new JSONArray();
        for (int i = 0; i < n; i++) { try { pts.put(new JSONObject(L.get(i))); } catch (Exception e) { } }

        String raiz = "projects/" + proyecto + "/databases/(default)/documents/";
        JSONArray writes = new JSONArray();
        long ahora = System.currentTimeMillis();
        JSONObject ult = null;
        try { ult = new JSONObject(p.getString("ult", "{}")); } catch (Exception e) { }

        JSONObject g = new JSONObject();
        g.put("dev", sv(dev));
        g.put("nom", sv(p.getString("nom", "")));
        g.put("ch", sv(p.getString("ch", "")));
        g.put("hb", iv(ahora));
        g.put("bat", iv(bat));
        g.put("carga", bv(carga));
        g.put("ruta", bv(ruta));
        g.put("evs", sv(p.getString("evs", "[]")));
        g.put("ult", sv(ult == null ? "{}" : ult.toString()));
        if (ult != null && ult.has("t")) g.put("t", iv(ult.optLong("t")));
        g.put("ver", sv("1"));
        writes.put(new JSONObject().put("update", new JSONObject().put("name", raiz + base + "/gps/" + dev).put("fields", g)));

        if (pts.length() > 0) {
            long t0 = pts.getJSONObject(0).optLong("t", ahora);
            String id = dev + "_" + String.format(java.util.Locale.US, "%013d", t0);
            JSONObject q = new JSONObject();
            q.put("dev", sv(dev));
            q.put("t", iv(t0));
            q.put("v", sv(pts.toString()));
            writes.put(new JSONObject().put("update", new JSONObject().put("name", raiz + base + "/gpsp/" + id).put("fields", q)));
        }

        String url = "https://firestore.googleapis.com/v1/projects/" + proyecto + "/databases/(default)/documents:commit";
        int code = post(url, new JSONObject().put("writes", writes).toString(), "application/json", tok, null);
        if (code == 401 || code == 403) { p.edit().remove("idTok").apply(); return false; }
        if (code < 200 || code >= 300) return false;

        /* quita lo que ya se subió */
        if (n > 0) {
            StringBuilder resto = new StringBuilder();
            List<String> L2 = new ArrayList<>();
            try (BufferedReader r = new BufferedReader(new FileReader(f))) {
                String s;
                while ((s = r.readLine()) != null) if (!s.trim().isEmpty()) L2.add(s);
            }
            for (int i = n; i < L2.size(); i++) resto.append(L2.get(i)).append("\n");
            try (FileOutputStream w = new FileOutputStream(f, false)) { w.write(resto.toString().getBytes("UTF-8")); }
        }
        return true;
    }

    static JSONObject sv(String s) throws Exception { return new JSONObject().put("stringValue", s == null ? "" : s); }
    static JSONObject iv(long v) throws Exception { return new JSONObject().put("integerValue", String.valueOf(v)); }
    static JSONObject bv(boolean v) throws Exception { return new JSONObject().put("booleanValue", v); }

    /* la llave corta (1 hora) se saca con la llave larga que guardó la app al iniciar sesión */
    static String token(Context c) {
        SharedPreferences p = pr(c);
        String id = p.getString("idTok", null);
        long exp = p.getLong("idExp", 0);
        if (id != null && System.currentTimeMillis() < exp - 120000) return id;
        String rt = p.getString("refresh", ""), key = p.getString("apiKey", "");
        if (rt.isEmpty() || key.isEmpty()) return null;
        try {
            StringBuilder out = new StringBuilder();
            int code = post("https://securetoken.googleapis.com/v1/token?key=" + URLEncoder.encode(key, "UTF-8"),
                "grant_type=refresh_token&refresh_token=" + URLEncoder.encode(rt, "UTF-8"),
                "application/x-www-form-urlencoded", null, out);
            if (code < 200 || code >= 300) return null;
            JSONObject o = new JSONObject(out.toString());
            String nid = o.optString("id_token", null);
            long seg = Long.parseLong(o.optString("expires_in", "3600"));
            SharedPreferences.Editor e = p.edit().putString("idTok", nid).putLong("idExp", System.currentTimeMillis() + seg * 1000);
            String nrt = o.optString("refresh_token", "");
            if (!nrt.isEmpty()) e.putString("refresh", nrt);
            e.apply();
            return nid;
        } catch (Exception e) { return null; }
    }

    static int post(String url, String body, String tipo, String tok, StringBuilder out) throws Exception {
        HttpURLConnection c = (HttpURLConnection) new URL(url).openConnection();
        c.setConnectTimeout(15000);
        c.setReadTimeout(20000);
        c.setRequestMethod("POST");
        c.setDoOutput(true);
        c.setRequestProperty("Content-Type", tipo);
        if (tok != null) c.setRequestProperty("Authorization", "Bearer " + tok);
        try (OutputStream o = c.getOutputStream()) { o.write(body.getBytes("UTF-8")); }
        int code = c.getResponseCode();
        if (out != null) {
            InputStream in = code < 400 ? c.getInputStream() : c.getErrorStream();
            if (in != null) {
                byte[] b = new byte[4096];
                int k;
                while ((k = in.read(b)) > 0) out.append(new String(b, 0, k, "UTF-8"));
                in.close();
            }
        }
        c.disconnect();
        return code;
    }

    @Override public void onDestroy() {
        try { cli.removeLocationUpdates(cb); } catch (Exception e) { }
        try { h.removeCallbacksAndMessages(null); ht.quitSafely(); } catch (Exception e) { }
        super.onDestroy();
    }

    /* si alguien cierra la app desde "recientes", el servicio sigue */
    @Override public void onTaskRemoved(Intent rootIntent) {
        arrancar(getApplicationContext());
        super.onTaskRemoved(rootIntent);
    }

    @Override public IBinder onBind(Intent intent) { return null; }
}
