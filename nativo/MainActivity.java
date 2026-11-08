package com.rutafacil.app;

import android.graphics.Color;
import android.os.Bundle;
import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
    @Override
    public void onCreate(Bundle savedInstanceState) {
        registerPlugin(RutaNativa.class);
        super.onCreate(savedInstanceState);
        // transparente: así el mapa de Google (que va debajo) se ve por el hueco que deja la página
        try { getBridge().getWebView().setBackgroundColor(Color.TRANSPARENT); } catch (Exception e) { }
    }
}
