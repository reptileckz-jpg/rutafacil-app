package com.rutafacil.app;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;

/* Al prender el celular (o al actualizar la app) vuelve a prender la ubicación.
   Al apagarlo deja anotado a qué hora se apagó, para que el administrador lo vea. */
public class RutaArranque extends BroadcastReceiver {
    @Override public void onReceive(Context c, Intent i) {
        String a = i == null ? "" : String.valueOf(i.getAction());
        if (RutaGps.pr(c).getString("refresh", "").isEmpty()) return;
        if (a.equals(Intent.ACTION_SHUTDOWN) || a.equals("android.intent.action.QUICKBOOT_POWEROFF")) {
            RutaGps.evento(c, "apagado");
            final PendingResult pr = goAsync();
            new Thread(() -> {
                try { RutaGps.subirAhora(c, -1, false, false); } catch (Throwable e) { }
                pr.finish();
            }).start();
            return;
        }
        if (a.equals(Intent.ACTION_BOOT_COMPLETED) || a.equals("android.intent.action.QUICKBOOT_POWERON")) RutaGps.evento(c, "encendido");
        RutaGps.arrancar(c);
    }
}
