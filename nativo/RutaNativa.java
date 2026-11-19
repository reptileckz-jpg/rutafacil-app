package com.rutafacil.app;

import android.Manifest;
import android.bluetooth.BluetoothAdapter;
import android.bluetooth.BluetoothDevice;
import android.bluetooth.BluetoothManager;
import android.bluetooth.BluetoothSocket;
import android.content.ContentValues;
import android.content.Context;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.net.Uri;
import android.os.Build;
import android.os.Environment;
import android.provider.MediaStore;
import android.provider.Settings;
import android.app.NotificationChannel;
import android.app.admin.DevicePolicyManager;
import android.content.ComponentName;
import android.content.pm.ResolveInfo;
import android.os.UserManager;
import android.app.NotificationManager;
import android.app.PendingIntent;
import androidx.core.app.NotificationCompat;
import androidx.core.app.NotificationManagerCompat;
import android.util.Base64;

import androidx.biometric.BiometricManager;
import androidx.biometric.BiometricPrompt;
import androidx.core.content.ContextCompat;
import androidx.core.content.FileProvider;
import androidx.fragment.app.FragmentActivity;

import com.getcapacitor.JSArray;
import com.getcapacitor.JSObject;
import com.getcapacitor.PermissionState;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;
import com.getcapacitor.annotation.Permission;
import com.getcapacitor.annotation.PermissionCallback;

import java.io.File;
import java.io.InputStream;
import java.io.ByteArrayOutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.security.MessageDigest;
import android.content.pm.ApplicationInfo;
import android.content.pm.PackageInfo;
import android.content.pm.Signature;
import android.database.Cursor;
import java.io.FileOutputStream;
import java.io.OutputStream;
import java.util.Set;
import java.util.UUID;
import java.util.concurrent.Executor;

/* Cosas del celular que la app web no puede hacer sola:
   huella, mandar una imagen directo a un WhatsApp, imprimir por Bluetooth y guardar archivos en Descargas. */
@CapacitorPlugin(
    name = "RutaNativa",
    permissions = {
        @Permission(alias = "bt", strings = { Manifest.permission.BLUETOOTH_CONNECT }),
        @Permission(alias = "camara", strings = { Manifest.permission.CAMERA }),
        @Permission(alias = "ubicacion", strings = { Manifest.permission.ACCESS_FINE_LOCATION, Manifest.permission.ACCESS_COARSE_LOCATION }),
        @Permission(alias = "notif", strings = { Manifest.permission.POST_NOTIFICATIONS }),
        @Permission(alias = "fondo", strings = { Manifest.permission.ACCESS_BACKGROUND_LOCATION })
    }
)
public class RutaNativa extends Plugin {

    private static final UUID SPP = UUID.fromString("00001101-0000-1000-8000-00805F9B34FB");

    /* ---------------- huella ---------------- */
    @PluginMethod
    public void bioDisponible(PluginCall call) {
        int r = BiometricManager.from(getContext()).canAuthenticate(BiometricManager.Authenticators.BIOMETRIC_WEAK);
        JSObject o = new JSObject();
        o.put("isAvailable", r == BiometricManager.BIOMETRIC_SUCCESS);
        o.put("codigo", r);
        call.resolve(o);
    }

    @PluginMethod
    public void bioVerificar(final PluginCall call) {
        final String titulo = call.getString("title", "Entrar con tu huella");
        final String sub = call.getString("subtitle", "");
        final String no = call.getString("negativeButtonText", "Usar mi PIN");
        getActivity().runOnUiThread(() -> {
            try {
                FragmentActivity act = (FragmentActivity) getActivity();
                Executor ex = ContextCompat.getMainExecutor(act);
                final int maxFallos = call.getInt("maxAttempts", 3);
                final int[] fallos = { 0 };
                final boolean[] listo = { false };
                final BiometricPrompt[] ref = { null };
                BiometricPrompt bp = new BiometricPrompt(act, ex, new BiometricPrompt.AuthenticationCallback() {
                    @Override
                    public void onAuthenticationSucceeded(BiometricPrompt.AuthenticationResult result) {
                        if (listo[0]) return;
                        listo[0] = true;
                        call.resolve();
                    }
                    @Override
                    public void onAuthenticationFailed() {
                        fallos[0]++;
                        if (fallos[0] >= maxFallos && !listo[0]) {
                            listo[0] = true;
                            try { if (ref[0] != null) ref[0].cancelAuthentication(); } catch (Exception e) { }
                            call.reject("Se equivocó " + fallos[0] + " veces", "fallos");
                        }
                    }
                    @Override
                    public void onAuthenticationError(int code, CharSequence msg) {
                        if (listo[0]) return;
                        listo[0] = true;
                        call.reject(String.valueOf(msg), String.valueOf(code));
                    }
                });
                ref[0] = bp;
                BiometricPrompt.PromptInfo.Builder b = new BiometricPrompt.PromptInfo.Builder()
                    .setTitle(titulo)
                    .setNegativeButtonText(no)
                    .setAllowedAuthenticators(BiometricManager.Authenticators.BIOMETRIC_WEAK);
                if (sub != null && sub.length() > 0) b.setSubtitle(sub);
                bp.authenticate(b.build());
            } catch (Exception e) {
                call.reject(e.getMessage());
            }
        });
    }

    /* ---------------- archivos ---------------- */
    private File aCache(String base64, String nombre) throws Exception {
        File dir = new File(getContext().getCacheDir(), "compartir");
        dir.mkdirs();
        File f = new File(dir, nombre);
        byte[] datos = Base64.decode(base64, Base64.DEFAULT);
        FileOutputStream os = new FileOutputStream(f);
        os.write(datos);
        os.close();
        return f;
    }

    private Uri uriDe(File f) {
        return FileProvider.getUriForFile(getContext(), getContext().getPackageName() + ".fileprovider", f);
    }

    private boolean instalada(String pkg) {
        try {
            getContext().getPackageManager().getPackageInfo(pkg, 0);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    /* Manda una imagen (o archivo) a WhatsApp. Si viene "tel", se abre directo el chat de ese número. */
    @PluginMethod
    public void compartir(PluginCall call) {
        try {
            String b64 = call.getString("base64");
            String nombre = call.getString("nombre", "imagen.png");
            String mime = call.getString("mime", "image/png");
            String texto = call.getString("texto", "");
            String tel = call.getString("tel", "");
            boolean wa = call.getBoolean("whatsapp", true);
            File f = aCache(b64, nombre);
            Uri u = uriDe(f);
            Intent i = new Intent(Intent.ACTION_SEND);
            i.setType(mime);
            i.putExtra(Intent.EXTRA_STREAM, u);
            if (texto != null && texto.length() > 0) i.putExtra(Intent.EXTRA_TEXT, texto);
            i.addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION);
            String pkg = null;
            if (wa) {
                if (instalada("com.whatsapp")) pkg = "com.whatsapp";
                else if (instalada("com.whatsapp.w4b")) pkg = "com.whatsapp.w4b";
            }
            JSObject o = new JSObject();
            if (pkg != null) {
                i.setPackage(pkg);
                String n = tel == null ? "" : tel.replaceAll("\\D", "");
                if (n.length() == 10) n = "52" + n;
                if (n.length() >= 11) i.putExtra("jid", n + "@s.whatsapp.net");
                o.put("whatsapp", true);
                getActivity().startActivity(i);
            } else {
                o.put("whatsapp", false);
                getActivity().startActivity(Intent.createChooser(i, "Compartir"));
            }
            call.resolve(o);
        } catch (Exception e) {
            call.reject(e.getMessage());
        }
    }

    /* Guarda un archivo en Descargas (Excel, respaldo) y regresa dónde quedó */
    @PluginMethod
    public void guardar(PluginCall call) {
        try {
            String b64 = call.getString("base64");
            String nombre = call.getString("nombre", "archivo");
            String mime = call.getString("mime", "application/octet-stream");
            byte[] datos = Base64.decode(b64, Base64.DEFAULT);
            JSObject o = new JSObject();
            if (Build.VERSION.SDK_INT >= 29) {
                ContentValues cv = new ContentValues();
                cv.put(MediaStore.Downloads.DISPLAY_NAME, nombre);
                cv.put(MediaStore.Downloads.MIME_TYPE, mime);
                cv.put(MediaStore.Downloads.RELATIVE_PATH, Environment.DIRECTORY_DOWNLOADS + "/Ruta Facil");
                Uri u = getContext().getContentResolver().insert(MediaStore.Downloads.EXTERNAL_CONTENT_URI, cv);
                OutputStream os = getContext().getContentResolver().openOutputStream(u);
                os.write(datos);
                os.close();
                o.put("donde", "Descargas/Ruta Facil/" + nombre);
            } else {
                File dir = new File(getContext().getExternalFilesDir(null), "Ruta Facil");
                dir.mkdirs();
                File f = new File(dir, nombre);
                FileOutputStream os = new FileOutputStream(f);
                os.write(datos);
                os.close();
                o.put("donde", f.getAbsolutePath());
            }
            call.resolve(o);
        } catch (Exception e) {
            call.reject(e.getMessage());
        }
    }

    /* ---------------- impresora Bluetooth ---------------- */
    private boolean faltaPermisoBt() {
        return Build.VERSION.SDK_INT >= 31 && getPermissionState("bt") != PermissionState.GRANTED;
    }

    private BluetoothAdapter adaptador() {
        BluetoothManager m = (BluetoothManager) getContext().getSystemService(Context.BLUETOOTH_SERVICE);
        return m == null ? null : m.getAdapter();
    }

    @PluginMethod
    public void btLista(PluginCall call) {
        if (faltaPermisoBt()) { requestPermissionForAlias("bt", call, "btListaPermiso"); return; }
        hacerLista(call);
    }

    @PermissionCallback
    private void btListaPermiso(PluginCall call) {
        if (faltaPermisoBt()) { call.reject("Sin permiso de Bluetooth", "permiso"); return; }
        hacerLista(call);
    }

    @SuppressWarnings("MissingPermission")
    private void hacerLista(PluginCall call) {
        try {
            BluetoothAdapter a = adaptador();
            if (a == null) { call.reject("Este celular no tiene Bluetooth", "sinbt"); return; }
            if (!a.isEnabled()) { call.reject("Prende el Bluetooth", "apagado"); return; }
            JSArray L = new JSArray();
            Set<BluetoothDevice> s = a.getBondedDevices();
            for (BluetoothDevice d : s) {
                JSObject o = new JSObject();
                o.put("nombre", d.getName());
                o.put("mac", d.getAddress());
                L.put(o);
            }
            JSObject r = new JSObject();
            r.put("lista", L);
            call.resolve(r);
        } catch (Exception e) {
            call.reject(e.getMessage());
        }
    }

    @PluginMethod
    public void btImprimir(PluginCall call) {
        if (faltaPermisoBt()) { requestPermissionForAlias("bt", call, "btImprimirPermiso"); return; }
        hacerImpresion(call);
    }

    @PermissionCallback
    private void btImprimirPermiso(PluginCall call) {
        if (faltaPermisoBt()) { call.reject("Sin permiso de Bluetooth", "permiso"); return; }
        hacerImpresion(call);
    }

    @SuppressWarnings("MissingPermission")
    private void hacerImpresion(final PluginCall call) {
        final String mac = call.getString("mac");
        final String b64 = call.getString("base64");
        new Thread(() -> {
            BluetoothSocket so = null;
            try {
                BluetoothAdapter a = adaptador();
                if (a == null || !a.isEnabled()) { call.reject("Prende el Bluetooth", "apagado"); return; }
                BluetoothDevice d = a.getRemoteDevice(mac);
                a.cancelDiscovery();
                so = d.createRfcommSocketToServiceRecord(SPP);
                so.connect();
                OutputStream os = so.getOutputStream();
                byte[] datos = Base64.decode(b64, Base64.DEFAULT);
                int i = 0;
                while (i < datos.length) {
                    int n = Math.min(512, datos.length - i);
                    os.write(datos, i, n);
                    os.flush();
                    i += n;
                    Thread.sleep(20);
                }
                Thread.sleep(300);
                call.resolve();
            } catch (Exception e) {
                call.reject("No se pudo imprimir: " + e.getMessage(), "error");
            } finally {
                try { if (so != null) so.close(); } catch (Exception e2) { }
            }
        }).start();
    }

    /* ---------------- permisos (pantalla de la primera vez) ---------------- */
    private String estado(String alias) {
        if (alias.equals("notif") && Build.VERSION.SDK_INT < 33) return NotificationManagerCompat.from(getContext()).areNotificationsEnabled() ? "si" : "no";
        if (alias.equals("bt") && Build.VERSION.SDK_INT < 31) return "si";
        PermissionState p = getPermissionState(alias);
        return p == PermissionState.GRANTED ? "si" : (p == PermissionState.DENIED ? "no" : "preguntar");
    }

    @PluginMethod
    public void permisosEstado(PluginCall call) {
        JSObject o = new JSObject();
        o.put("camara", estado("camara"));
        o.put("ubicacion", estado("ubicacion"));
        o.put("notif", estado("notif"));
        o.put("bt", estado("bt"));
        call.resolve(o);
    }

    @PluginMethod
    public void pedirPermisos(PluginCall call) {
        JSArray L = call.getArray("cuales");
        java.util.List<String> al = new java.util.ArrayList<>();
        try {
            for (int i = 0; i < L.length(); i++) {
                String a = L.getString(i);
                if (a.equals("notif") && Build.VERSION.SDK_INT < 33) continue;
                if (a.equals("bt") && Build.VERSION.SDK_INT < 31) continue;
                al.add(a);
            }
        } catch (Exception e) { }
        if (al.isEmpty()) { permisosEstado(call); return; }
        requestPermissionForAliases(al.toArray(new String[0]), call, "permisosListos");
    }

    @PermissionCallback
    private void permisosListos(PluginCall call) {
        permisosEstado(call);
    }

    @PluginMethod
    public void abrirAjustes(PluginCall call) {
        try {
            Intent i = new Intent(Settings.ACTION_APPLICATION_DETAILS_SETTINGS);
            i.setData(Uri.parse("package:" + getContext().getPackageName()));
            i.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
            getActivity().startActivity(i);
            call.resolve();
        } catch (Exception e) {
            call.reject(e.getMessage());
        }
    }

    /* ---------------- aviso en la barra del celular ---------------- */
    @PluginMethod
    public void notificar(PluginCall call) {
        try {
            String titulo = call.getString("titulo", "Ruta Fácil");
            String texto = call.getString("texto", "");
            Context ctx = getContext();
            String canal = "avisos";
            if (Build.VERSION.SDK_INT >= 26) {
                NotificationManager nm = (NotificationManager) ctx.getSystemService(Context.NOTIFICATION_SERVICE);
                if (nm.getNotificationChannel(canal) == null) {
                    NotificationChannel ch = new NotificationChannel(canal, "Avisos de la ruta", NotificationManager.IMPORTANCE_HIGH);
                    ch.setDescription("Entregas nuevas y avisos del administrador");
                    nm.createNotificationChannel(ch);
                }
            }
            Intent abre = ctx.getPackageManager().getLaunchIntentForPackage(ctx.getPackageName());
            PendingIntent pi = PendingIntent.getActivity(ctx, 0, abre, PendingIntent.FLAG_IMMUTABLE | PendingIntent.FLAG_UPDATE_CURRENT);
            NotificationCompat.Builder b = new NotificationCompat.Builder(ctx, canal)
                .setSmallIcon(ctx.getApplicationInfo().icon)
                .setContentTitle(titulo)
                .setContentText(texto)
                .setStyle(new NotificationCompat.BigTextStyle().bigText(texto))
                .setPriority(NotificationCompat.PRIORITY_HIGH)
                .setAutoCancel(true)
                .setContentIntent(pi);
            if (Build.VERSION.SDK_INT < 33 || ContextCompat.checkSelfPermission(ctx, Manifest.permission.POST_NOTIFICATIONS) == PackageManager.PERMISSION_GRANTED) {
                NotificationManagerCompat.from(ctx).notify((int) (System.currentTimeMillis() % 100000), b.build());
            }
            call.resolve();
        } catch (Exception e) {
            call.reject(e.getMessage());
        }
    }

    /* ---------------- 132 · avisos push (Firebase Cloud Messaging) ----------------
       Regresa el token de este celular para que la nube le mande avisos aunque la app esté cerrada.
       Deja creado el canal "avisos" (el mismo de notificar) para que el aviso suene aunque la app nunca haya avisado nada.
       Si el APK no trae google-services.json, Firebase no está y se dice por qué (la app sigue igual). */
    @PluginMethod
    public void pushToken(PluginCall call) {
        try {
            Context ctx = getContext();
            if (Build.VERSION.SDK_INT >= 26) {
                NotificationManager nm = (NotificationManager) ctx.getSystemService(Context.NOTIFICATION_SERVICE);
                if (nm.getNotificationChannel("avisos") == null) {
                    NotificationChannel ch = new NotificationChannel("avisos", "Avisos de la ruta", NotificationManager.IMPORTANCE_HIGH);
                    ch.setDescription("Entregas nuevas y avisos del administrador");
                    nm.createNotificationChannel(ch);
                }
            }
            if (com.google.firebase.FirebaseApp.getApps(ctx).isEmpty()) { call.reject("sin-firebase"); return; }
            com.google.firebase.messaging.FirebaseMessaging.getInstance().getToken().addOnCompleteListener(t -> {
                if (t.isSuccessful() && t.getResult() != null) { JSObject o = new JSObject(); o.put("token", t.getResult()); call.resolve(o); }
                else call.reject("No se pudo sacar el token de avisos" + (t.getException() != null ? ": " + t.getException().getMessage() : ""));
            });
        } catch (Throwable e) {
            call.reject(String.valueOf(e.getMessage()));
        }
    }

    /* ---------------- 151 · batería: que Android no apague la app (para que lleguen los avisos con la app cerrada) ---------------- */
    @PluginMethod
    public void bateriaEstado(PluginCall call) {
        JSObject o = new JSObject();
        boolean libre = true;
        try {
            if (Build.VERSION.SDK_INT >= 23) {
                android.os.PowerManager pm = (android.os.PowerManager) getContext().getSystemService(Context.POWER_SERVICE);
                libre = pm != null && pm.isIgnoringBatteryOptimizations(getContext().getPackageName());
            }
        } catch (Throwable e) { libre = true; }
        o.put("libre", libre);
        call.resolve(o);
    }

    @PluginMethod
    public void bateriaPide(PluginCall call) {
        try {
            Intent i = new Intent(Settings.ACTION_REQUEST_IGNORE_BATTERY_OPTIMIZATIONS);
            i.setData(Uri.parse("package:" + getContext().getPackageName()));
            i.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
            getContext().startActivity(i);
            call.resolve();
        } catch (Throwable e) {
            try {
                Intent j = new Intent(Settings.ACTION_IGNORE_BATTERY_OPTIMIZATION_SETTINGS);
                j.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
                getContext().startActivity(j);
                call.resolve();
            } catch (Throwable e2) {
                call.reject(String.valueOf(e2.getMessage()));
            }
        }
    }

    /* ---------------- celular del negocio (solo si la app es "dueña" del celular) ---------------- */
    private DevicePolicyManager dpm() { return (DevicePolicyManager) getContext().getSystemService(Context.DEVICE_POLICY_SERVICE); }
    private ComponentName adminCmp() { return new ComponentName(getContext(), RutaAdmin.class); }
    private boolean esDuenio() { return dpm().isDeviceOwnerApp(getContext().getPackageName()); }
    private String restriccion(String clave) {
        switch (clave) {
            case "instalar": return UserManager.DISALLOW_INSTALL_APPS;
            case "desinstalar": return UserManager.DISALLOW_UNINSTALL_APPS;
            case "restablecer": return UserManager.DISALLOW_FACTORY_RESET;
            case "ubicacion": return UserManager.DISALLOW_CONFIG_LOCATION;
            case "cuentas": return UserManager.DISALLOW_MODIFY_ACCOUNTS;
        }
        return null;
    }

    @PluginMethod
    public void celEstado(PluginCall call) {
        JSObject o = new JSObject();
        boolean d = esDuenio();
        o.put("owner", d);
        JSObject r = new JSObject();
        if (d) {
            android.os.Bundle b = dpm().getUserRestrictions(adminCmp());
            for (String k : new String[] { "instalar", "desinstalar", "restablecer", "ubicacion", "cuentas" }) r.put(k, b.getBoolean(restriccion(k), false));
        }
        o.put("restr", r);
        call.resolve(o);
    }

    @PluginMethod
    public void celRestringe(PluginCall call) {
        if (!esDuenio()) { call.reject("La app no administra este celular"); return; }
        String r = restriccion(call.getString("clave", ""));
        if (r == null) { call.reject("No sé qué limitar"); return; }
        try {
            if (call.getBoolean("on", false)) dpm().addUserRestriction(adminCmp(), r);
            else dpm().clearUserRestriction(adminCmp(), r);
            dpm().setUninstallBlocked(adminCmp(), getContext().getPackageName(), true);
            call.resolve();
        } catch (Exception e) { call.reject(e.getMessage()); }
    }

    @PluginMethod
    public void celApps(PluginCall call) {
        try {
            PackageManager pm = getContext().getPackageManager();
            Intent i = new Intent(Intent.ACTION_MAIN);
            i.addCategory(Intent.CATEGORY_LAUNCHER);
            java.util.List<ResolveInfo> L = pm.queryIntentActivities(i, PackageManager.MATCH_DISABLED_COMPONENTS);
            JSArray out = new JSArray();
            java.util.HashSet<String> ya = new java.util.HashSet<>();
            for (ResolveInfo ri : L) {
                String pkg = ri.activityInfo.packageName;
                if (pkg.equals(getContext().getPackageName()) || !ya.add(pkg)) continue;
                JSObject a = new JSObject();
                a.put("pkg", pkg);
                a.put("nombre", String.valueOf(ri.loadLabel(pm)));
                boolean oc = false;
                try { if (esDuenio()) oc = dpm().isApplicationHidden(adminCmp(), pkg); } catch (Exception e) { }
                a.put("oculta", oc);
                out.put(a);
            }
            JSObject r = new JSObject();
            r.put("lista", out);
            call.resolve(r);
        } catch (Exception e) { call.reject(e.getMessage()); }
    }

    @PluginMethod
    public void celOcultar(PluginCall call) {
        if (!esDuenio()) { call.reject("La app no administra este celular"); return; }
        try {
            dpm().setApplicationHidden(adminCmp(), call.getString("pkg"), call.getBoolean("oculta", true));
            call.resolve();
        } catch (Exception e) { call.reject(e.getMessage()); }
    }

    @PluginMethod
    public void celLiberar(PluginCall call) {
        if (!esDuenio()) { call.resolve(); return; }
        try {
            for (String k : new String[] { "instalar", "desinstalar", "restablecer", "ubicacion", "cuentas" }) dpm().clearUserRestriction(adminCmp(), restriccion(k));
            dpm().setUninstallBlocked(adminCmp(), getContext().getPackageName(), false);
            dpm().clearDeviceOwnerApp(getContext().getPackageName());
            call.resolve();
        } catch (Exception e) { call.reject(e.getMessage()); }
    }

    /* ---------------- escáner de QR (el de Google, no el del navegador: ese cerraba la app) ---------------- */
    @PluginMethod
    public void escanear(final PluginCall call) {
        try {
            int ok = com.google.android.gms.common.GoogleApiAvailability.getInstance().isGooglePlayServicesAvailable(getContext());
            if (ok != com.google.android.gms.common.ConnectionResult.SUCCESS) { call.reject("sin_play"); return; }
            com.google.mlkit.vision.codescanner.GmsBarcodeScannerOptions op = new com.google.mlkit.vision.codescanner.GmsBarcodeScannerOptions.Builder()
                .setBarcodeFormats(com.google.mlkit.vision.barcode.common.Barcode.FORMAT_QR_CODE)
                .build();
            com.google.mlkit.vision.codescanner.GmsBarcodeScanning.getClient(getActivity(), op).startScan()
                .addOnSuccessListener(b -> { JSObject o = new JSObject(); o.put("texto", b.getRawValue()); call.resolve(o); })
                .addOnCanceledListener(() -> { JSObject o = new JSObject(); o.put("cancelado", true); call.resolve(o); })
                .addOnFailureListener(e -> call.reject("fallo: " + e.getMessage()));
        } catch (Throwable e) { call.reject("fallo: " + e.getMessage()); }
    }

    /* ---------------- ubicación siempre prendida del celular del negocio ---------------- */
    @PluginMethod
    public void gpsConfig(PluginCall call) {
        try {
            android.content.SharedPreferences.Editor e = RutaGps.pr(getContext()).edit();
            String rt = call.getString("refresh", "");
            if (!rt.isEmpty() && !rt.equals(RutaGps.pr(getContext()).getString("refresh", ""))) e.putString("refresh", rt).remove("idTok");
            e.putString("apiKey", call.getString("apiKey", ""));
            e.putString("proyecto", call.getString("proyecto", ""));
            e.putString("base", call.getString("base", ""));
            e.putString("nom", call.getString("nom", ""));
            e.putString("ch", call.getString("ch", ""));
            String dev = RutaGps.pr(getContext()).getString("dev", "");
            if (dev.isEmpty()) {
                dev = Settings.Secure.getString(getContext().getContentResolver(), Settings.Secure.ANDROID_ID);
                if (dev == null || dev.isEmpty()) dev = UUID.randomUUID().toString().replace("-", "").substring(0, 16);
                e.putString("dev", dev);
            }
            e.apply();
            RutaGps.arrancar(getContext());
            JSObject o = new JSObject();
            o.put("dev", dev);
            call.resolve(o);
        } catch (Throwable e) { call.reject(String.valueOf(e.getMessage())); }
    }

    @PluginMethod
    public void gpsModo(PluginCall call) {
        RutaGps.pr(getContext()).edit().putBoolean("ruta", call.getBoolean("ruta", false)).apply();
        if (call.getString("ch") != null) RutaGps.pr(getContext()).edit().putString("ch", call.getString("ch")).putString("nom", call.getString("nom", "")).apply();
        call.resolve();
    }

    @PluginMethod
    public void gpsEvento(PluginCall call) {
        RutaGps.evento(getContext(), call.getString("e", "evento"));
        new Thread(() -> { try { RutaGps.subirAhora(getContext(), -1, false, RutaGps.pr(getContext()).getBoolean("ruta", false)); } catch (Throwable e) { } }).start();
        call.resolve();
    }

    @PluginMethod
    public void gpsEstado(PluginCall call) {
        JSObject o = new JSObject();
        android.content.SharedPreferences p = RutaGps.pr(getContext());
        o.put("dev", p.getString("dev", ""));
        o.put("config", !p.getString("refresh", "").isEmpty());
        o.put("ruta", p.getBoolean("ruta", false));
        o.put("fondo", Build.VERSION.SDK_INT < 29 || ContextCompat.checkSelfPermission(getContext(), Manifest.permission.ACCESS_BACKGROUND_LOCATION) == PackageManager.PERMISSION_GRANTED);
        o.put("ult", p.getString("ult", ""));
        call.resolve(o);
    }

    /* "Permitir todo el tiempo": en Android 11+ solo se puede escoger en Ajustes */
    @PluginMethod
    public void gpsFondo(PluginCall call) {
        if (Build.VERSION.SDK_INT < 29 || ContextCompat.checkSelfPermission(getContext(), Manifest.permission.ACCESS_BACKGROUND_LOCATION) == PackageManager.PERMISSION_GRANTED) {
            JSObject o = new JSObject(); o.put("ok", true); call.resolve(o); return;
        }
        if (esDuenio()) {
            try {
                dpm().setPermissionGrantState(adminCmp(), getContext().getPackageName(), Manifest.permission.ACCESS_FINE_LOCATION, DevicePolicyManager.PERMISSION_GRANT_STATE_GRANTED);
                dpm().setPermissionGrantState(adminCmp(), getContext().getPackageName(), Manifest.permission.ACCESS_BACKGROUND_LOCATION, DevicePolicyManager.PERMISSION_GRANT_STATE_GRANTED);
                JSObject o = new JSObject(); o.put("ok", true); call.resolve(o); return;
            } catch (Exception e) { }
        }
        if (Build.VERSION.SDK_INT == 29) { requestPermissionForAlias("fondo", call, "fondoListo"); return; }
        try {
            Intent i = new Intent(Settings.ACTION_APPLICATION_DETAILS_SETTINGS, Uri.parse("package:" + getContext().getPackageName()));
            i.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
            getContext().startActivity(i);
        } catch (Exception e) { }
        JSObject o = new JSObject(); o.put("ok", false); o.put("ajustes", true); call.resolve(o);
    }

    @PermissionCallback
    private void fondoListo(PluginCall call) {
        JSObject o = new JSObject(); o.put("ok", getPermissionState("fondo") == PermissionState.GRANTED); call.resolve(o);
    }

    /* celular administrado: la ubicación queda prendida y no se puede quitar el permiso */
    @PluginMethod
    public void celGpsFijo(PluginCall call) {
        if (!esDuenio()) { call.reject("La app no administra este celular"); return; }
        try {
            String pkg = getContext().getPackageName();
            dpm().setPermissionGrantState(adminCmp(), pkg, Manifest.permission.ACCESS_FINE_LOCATION, DevicePolicyManager.PERMISSION_GRANT_STATE_GRANTED);
            dpm().setPermissionGrantState(adminCmp(), pkg, Manifest.permission.ACCESS_COARSE_LOCATION, DevicePolicyManager.PERMISSION_GRANT_STATE_GRANTED);
            if (Build.VERSION.SDK_INT >= 29) dpm().setPermissionGrantState(adminCmp(), pkg, Manifest.permission.ACCESS_BACKGROUND_LOCATION, DevicePolicyManager.PERMISSION_GRANT_STATE_GRANTED);
            if (Build.VERSION.SDK_INT >= 30) dpm().setLocationEnabled(adminCmp(), true);
            dpm().addUserRestriction(adminCmp(), UserManager.DISALLOW_CONFIG_LOCATION);
            dpm().setUninstallBlocked(adminCmp(), pkg, true);
            call.resolve();
        } catch (Exception e) { call.reject(e.getMessage()); }
    }

    /* ---------------- 11 · ordenar la ruta con tráfico (Google Routes API) ----------------
       La llave está restringida a esta app de Android: por eso la llamada sale de aquí, con el paquete y la huella del certificado. */
    private String llaveMapas() {
        try {
            ApplicationInfo ai = getContext().getPackageManager().getApplicationInfo(getContext().getPackageName(), PackageManager.GET_META_DATA);
            return ai.metaData != null ? ai.metaData.getString("com.google.android.geo.API_KEY") : null;
        } catch (Exception e) { return null; }
    }

    private String huellaCert() {
        try {
            PackageManager pm = getContext().getPackageManager();
            String pkg = getContext().getPackageName();
            Signature[] sigs;
            if (Build.VERSION.SDK_INT >= 28) {
                PackageInfo pi = pm.getPackageInfo(pkg, PackageManager.GET_SIGNING_CERTIFICATES);
                sigs = pi.signingInfo.hasMultipleSigners() ? pi.signingInfo.getApkContentsSigners() : pi.signingInfo.getSigningCertificateHistory();
            } else {
                PackageInfo pi = pm.getPackageInfo(pkg, PackageManager.GET_SIGNATURES);
                sigs = pi.signatures;
            }
            byte[] d = MessageDigest.getInstance("SHA-1").digest(sigs[0].toByteArray());
            StringBuilder sb = new StringBuilder();
            for (byte b : d) sb.append(String.format("%02X", b));
            return sb.toString();
        } catch (Exception e) { return ""; }
    }

    @PluginMethod
    public void rutasGoogle(PluginCall call) {
        final String cuerpo = call.getString("cuerpo", "{}");
        final String campos = call.getString("campos", "routes.optimizedIntermediateWaypointIndex,routes.legs.duration,routes.legs.distanceMeters,routes.duration,routes.distanceMeters");
        final String llave = llaveMapas();
        if (llave == null || llave.isEmpty()) { call.reject("Esta app no trae la llave de Google Maps"); return; }
        new Thread(() -> {
            HttpURLConnection c = null;
            try {
                c = (HttpURLConnection) new URL("https://routes.googleapis.com/directions/v2:computeRoutes").openConnection();
                c.setRequestMethod("POST");
                c.setConnectTimeout(15000);
                c.setReadTimeout(20000);
                c.setDoOutput(true);
                c.setRequestProperty("Content-Type", "application/json");
                c.setRequestProperty("X-Goog-Api-Key", llave);
                c.setRequestProperty("X-Goog-FieldMask", campos);
                c.setRequestProperty("X-Android-Package", getContext().getPackageName());
                c.setRequestProperty("X-Android-Cert", huellaCert());
                OutputStream os = c.getOutputStream();
                os.write(cuerpo.getBytes("UTF-8"));
                os.close();
                int st = c.getResponseCode();
                InputStream is = st >= 400 ? c.getErrorStream() : c.getInputStream();
                ByteArrayOutputStream bo = new ByteArrayOutputStream();
                if (is != null) { byte[] buf = new byte[8192]; int n; while ((n = is.read(buf)) > 0) bo.write(buf, 0, n); is.close(); }
                JSObject o = new JSObject();
                o.put("status", st);
                o.put("json", bo.toString("UTF-8"));
                call.resolve(o);
            } catch (Exception e) {
                call.reject("Sin conexión con Google: " + e.getMessage());
            } finally { if (c != null) c.disconnect(); }
        }).start();
    }

    /* ---------------- 58 · buscar lugares como en Uber (Google Places API New, búsqueda de texto) ---------------- */
    @PluginMethod
    public void lugaresGoogle(PluginCall call) {
        final String cuerpo = call.getString("cuerpo", "{}");
        final String campos = "places.displayName,places.formattedAddress,places.location";
        /* 34 · "cerca": qué hay en un punto (para sacar la dirección y la colonia cuando se usa el GPS) */
        final String url = "cerca".equals(call.getString("modo", "")) ? "https://places.googleapis.com/v1/places:searchNearby" : "https://places.googleapis.com/v1/places:searchText";
        final String llave = llaveMapas();
        if (llave == null || llave.isEmpty()) { call.reject("Esta app no trae la llave de Google Maps"); return; }
        new Thread(() -> {
            HttpURLConnection c = null;
            try {
                c = (HttpURLConnection) new URL(url).openConnection();
                c.setRequestMethod("POST");
                c.setConnectTimeout(15000);
                c.setReadTimeout(20000);
                c.setDoOutput(true);
                c.setRequestProperty("Content-Type", "application/json");
                c.setRequestProperty("X-Goog-Api-Key", llave);
                c.setRequestProperty("X-Goog-FieldMask", campos);
                c.setRequestProperty("X-Android-Package", getContext().getPackageName());
                c.setRequestProperty("X-Android-Cert", huellaCert());
                OutputStream os = c.getOutputStream();
                os.write(cuerpo.getBytes("UTF-8"));
                os.close();
                int st = c.getResponseCode();
                InputStream is = st >= 400 ? c.getErrorStream() : c.getInputStream();
                ByteArrayOutputStream bo = new ByteArrayOutputStream();
                if (is != null) { byte[] buf = new byte[8192]; int n; while ((n = is.read(buf)) > 0) bo.write(buf, 0, n); is.close(); }
                JSObject o = new JSObject();
                o.put("status", st);
                o.put("json", bo.toString("UTF-8"));
                call.resolve(o);
            } catch (Exception e) {
                call.reject("Sin conexión con Google: " + e.getMessage());
            } finally { if (c != null) c.disconnect(); }
        }).start();
    }

    /* 58 · los links cortos de Google Maps (maps.app.goo.gl) no traen coordenadas: se sigue la redirección para leer el link largo */
    @PluginMethod
    public void linkLargo(PluginCall call) {
        final String url0 = call.getString("url", "");
        if (!(url0.startsWith("https://maps.app.goo.gl/") || url0.startsWith("https://goo.gl/maps/") || url0.startsWith("https://maps.google.com/") || url0.startsWith("https://www.google.com/maps"))) { call.reject("No es un link de Google Maps"); return; }
        new Thread(() -> {
            String u = url0;
            try {
                for (int i = 0; i < 6; i++) {
                    HttpURLConnection c = (HttpURLConnection) new URL(u).openConnection();
                    c.setInstanceFollowRedirects(false);
                    c.setConnectTimeout(10000);
                    c.setReadTimeout(10000);
                    c.setRequestProperty("User-Agent", "Mozilla/5.0 (Linux; Android)");
                    int st = c.getResponseCode();
                    String loc = c.getHeaderField("Location");
                    c.disconnect();
                    if (st >= 300 && st < 400 && loc != null) { u = new URL(new URL(u), loc).toString(); } else break;
                }
                JSObject o = new JSObject();
                o.put("url", u);
                call.resolve(o);
            } catch (Exception e) { call.reject("Sin conexión: " + e.getMessage()); }
        }).start();
    }

    /* ---------------- 29 · respaldo diario en Descargas/Ruta Facil/Respaldos ---------------- */
    @PluginMethod
    public void respaldoGuardar(PluginCall call) {
        try {
            String txt = call.getString("texto", "");
            String nombre = call.getString("nombre", "respaldo.json");
            byte[] datos = txt.getBytes("UTF-8");
            JSObject o = new JSObject();
            if (Build.VERSION.SDK_INT >= 29) {
                /* si ya hay uno con ese nombre (mismo día), se reemplaza */
                borrarRespaldo(nombre);
                ContentValues cv = new ContentValues();
                cv.put(MediaStore.Downloads.DISPLAY_NAME, nombre);
                cv.put(MediaStore.Downloads.MIME_TYPE, "application/json");
                cv.put(MediaStore.Downloads.RELATIVE_PATH, Environment.DIRECTORY_DOWNLOADS + "/Ruta Facil/Respaldos");
                Uri u = getContext().getContentResolver().insert(MediaStore.Downloads.EXTERNAL_CONTENT_URI, cv);
                OutputStream os = getContext().getContentResolver().openOutputStream(u);
                os.write(datos);
                os.close();
                o.put("donde", "Descargas/Ruta Facil/Respaldos/" + nombre);
            } else {
                File dir = new File(getContext().getExternalFilesDir(null), "Ruta Facil/Respaldos");
                dir.mkdirs();
                FileOutputStream os = new FileOutputStream(new File(dir, nombre));
                os.write(datos);
                os.close();
                o.put("donde", dir.getAbsolutePath() + "/" + nombre);
            }
            call.resolve(o);
        } catch (Exception e) { call.reject(e.getMessage()); }
    }

    private int borrarRespaldo(String nombre) {
        if (Build.VERSION.SDK_INT < 29) return 0;
        try {
            return getContext().getContentResolver().delete(MediaStore.Downloads.EXTERNAL_CONTENT_URI,
                MediaStore.Downloads.DISPLAY_NAME + "=? AND " + MediaStore.Downloads.RELATIVE_PATH + " LIKE ?",
                new String[] { nombre, "%Ruta Facil/Respaldos%" });
        } catch (Exception e) { return 0; }
    }

    /* lista de respaldos que hizo la app; borra los que no estén en "quedan" */
    @PluginMethod
    public void respaldoLimpia(PluginCall call) {
        JSArray quedan = call.getArray("quedan", new JSArray());
        java.util.HashSet<String> q = new java.util.HashSet<>();
        try { for (int i = 0; i < quedan.length(); i++) q.add(quedan.getString(i)); } catch (Exception e) { }
        JSArray lista = new JSArray();
        int borrados = 0;
        try {
            if (Build.VERSION.SDK_INT >= 29) {
                Cursor cu = getContext().getContentResolver().query(MediaStore.Downloads.EXTERNAL_CONTENT_URI,
                    new String[] { MediaStore.Downloads.DISPLAY_NAME },
                    MediaStore.Downloads.RELATIVE_PATH + " LIKE ?", new String[] { "%Ruta Facil/Respaldos%" }, null);
                java.util.ArrayList<String> nombres = new java.util.ArrayList<>();
                if (cu != null) { while (cu.moveToNext()) nombres.add(cu.getString(0)); cu.close(); }
                for (String n : nombres) {
                    if (n != null && n.startsWith("respaldo-") && !q.isEmpty() && !q.contains(n)) borrados += borrarRespaldo(n);
                    else lista.put(n);
                }
            } else {
                File dir = new File(getContext().getExternalFilesDir(null), "Ruta Facil/Respaldos");
                File[] fs = dir.listFiles();
                if (fs != null) for (File f : fs) {
                    String n = f.getName();
                    if (n.startsWith("respaldo-") && !q.isEmpty() && !q.contains(n)) { if (f.delete()) borrados++; }
                    else lista.put(n);
                }
            }
        } catch (Exception e) { }
        JSObject o = new JSObject();
        o.put("lista", lista);
        o.put("borrados", borrados);
        call.resolve(o);
    }
}
