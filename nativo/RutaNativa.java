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
        @Permission(alias = "bt", strings = { Manifest.permission.BLUETOOTH_CONNECT })
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
                BiometricPrompt bp = new BiometricPrompt(act, ex, new BiometricPrompt.AuthenticationCallback() {
                    @Override
                    public void onAuthenticationSucceeded(BiometricPrompt.AuthenticationResult result) {
                        call.resolve();
                    }
                    @Override
                    public void onAuthenticationError(int code, CharSequence msg) {
                        call.reject(String.valueOf(msg), String.valueOf(code));
                    }
                });
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
}
