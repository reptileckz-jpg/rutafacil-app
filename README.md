# Ruta Fácil

App de Android para controlar el reparto (rutas, entregas, cobros, crédito, gastos y cierres).
Es la versión web (`www/index.html`) metida en una app con Capacitor.

## Cómo se arma el APK
Cada vez que se sube algo a `main`, GitHub lo arma solo (pestaña **Actions**) y lo deja en **Releases**.
No hace falta instalar Android Studio.

## Firma
- La llave está en `firma/rutafacil.jks` (alias `rutafacil`). Su contraseña NO está aquí: es el secreto `RF_PASS`.
- Guarda una copia de la llave y de su contraseña fuera de GitHub. Si se pierden, los celulares no aceptan actualizaciones.

## Identificador
`com.rutafacil.app` (no se puede cambiar).

_Última vez armado: 2026-11-07._
