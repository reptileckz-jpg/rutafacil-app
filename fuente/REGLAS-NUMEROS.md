# REGLAS OBLIGATORIAS DE LOS NÚMEROS — RUTA FÁCIL

Las dio Ricardo el 18 de noviembre de 2026, después de que un segundo cierre borrara el primero ($27,270 que dejaron de aparecer en las cuentas). **Léelas antes de tocar cualquier código.** Están ajustadas a cómo funciona de verdad la app (ver "Ajustes").

## Estado del proyecto
1. **Ya se arma con Vite (19 nov).** Ricardo: "si tienes algún pendiente con Vite, termínalo todo sin preguntarme". `npm run build` (o `bash fuente/capas/build.sh`) arma la app con `fuente/vite/armar.mjs`; `npm run dev` abre el servidor de prueba. La app sale idéntica byte por byte a la del armado viejo. Las capas siguen siendo scripts clásicos (no módulos) y se cambian igual que antes.
2. **Prioridad absoluta: blindar los números.** Lo visual puede fallar; los números (efectivo, cortes, inventario, créditos, abonos) **jamás** deben perderse ni descuadrarse.
   - Antes de escribir código que toque dinero o mercancía: analizar los casos límite y **explicarle a Ricardo cómo se blindan** (ver "Plan de blindaje").

## Reglas de contabilidad (desde ya)

### 1. Bitácora: no sobrescribir totales
- Cada venta, abono, gasto de ruta, entrega de efectivo, salida o vuelta es un **registro independiente** con **id único** (`timestamp + quién`). Ya lo hacen: entregas (`id` y `cn` desde el 122), gastos, abonos, cierres.
- No pisar ni borrar registros. Para corregir o cancelar: `anulado: true`, `motivo`, fecha, y un registro nuevo si aplica.
- Todo total en pantalla (efectivo a entregar, corte, saldo de cliente, cajas) se **calcula sumando** los registros vigentes.
- **Excepción decidida por Ricardo (18 nov): 60 días de detalle.**
  - El detalle (rutas, cierres recibidos, gastos, abonos en bodega, venta en bodega, mermas) se guarda 60 días. Los gastos del vehículo se guardan 400 días.
  - Antes de quitarlo, se guarda **para siempre el resumen de cada día** (`S.resDia`: la fila de Estadísticas y el Cuadre en números). De ahí salen los totales por mes y año.
  - Lo que el detalle sumaba a la caja queda como un registro **"arrastre"** en la **misma lista** (mismo documento de la nube: se guarda todo junto o nada). Su llave es fija por día y lista, así que no se cuenta doble.
  - Solo el celular del **admin** lo hace, una vez al día y con la nube ya cargada. El chofer nunca borra. Ver `capas/tema-retencion.js` y `pruebas/t122.js`.

### 2. Cada salida es una VUELTA (no un día)
- Un repartidor puede salir 1, 2 o más veces el mismo día. Cada salida es una **vuelta**: se le dice "vuelta" porque **"viaje" ya es el viaje de carga al proveedor**.
- Al cerrar y entregar el efectivo, esa vuelta queda **cerrada y congelada**. La siguiente es nueva y limpia.
- El corte del día suma **todas** las vueltas cerradas de esa fecha; una no pisa a otra.
- Hoy (punto 120 y 122): cada cierre se guarda completo (`parcial120`, `n120`, `id120`). En la nube cada uno tiene su propia llave; antes la llave era fecha + chofer y el 2º pisaba al 1º. **Pendiente (fase 1):** un `vueltaId` desde que sale, puesto en cada entrega y gasto de esa vuelta.

### 3. Varios celulares al mismo tiempo
- Cada celular escribe lo suyo: cada chofer su ruta (`r~chofer~…`); las listas compartidas se guardan **renglón por renglón** con llave propia. Así un celular no borra lo que guardó otro.
  - **Cuidado con las llaves que chocan**: dos registros distintos con la misma llave se pisan en la nube. Por eso cada registro lleva `id`.
- Inventario, saldos y taras de clientes se cambian con **incrementos** (sumas y restas que la nube junta). Ya funciona así y lo cubre la prueba `t61`, con dos celulares.
- Operaciones que mueven dinero y mercancía a la vez: **escritura en lote (`writeBatch`)**.
  - Funciona sin señal y se sube completa al regresar.
  - **No usar `runTransaction` en ruta**: necesita señal en ese momento.
  - Pendiente (fase 4): hoy cada lista se sube por separado. La nube de Firestore guarda en el celular lo que no se ha subido, y lo sube después.
- La venta congela su precio (`pr`, `pm`), cantidades, total, lo pagado, la forma de pago y el **nombre del cliente** de ese momento (`cn`). Un cambio de precio no recalcula ventas pasadas.

### 4. Centavos
- Nunca operar dinero con decimales sueltos: `r2()` (redondeo a centavos) en cada operación, o en enteros de centavos.
- El dinero se muestra con centavos cuando los hay (`money()`, punto 122). Antes $12.50 se veía como $13 y la suma de renglones podía no dar el total.

### 5. Una sola fuente de verdad
- Las pantallas no suman por su cuenta. Las cuentas viven en funciones, con los datos separados de lo que se dibuja (eso ayuda a pasarlas a módulos con Vite):
  - `ingDia120`, `gasDia120`: ingresos y gastos del día.
  - `cierresCaja`: efectivo recibido de todos los cierres.
  - `cuadreDia121`, `cuadreRango121`: Cuadre del día, semana, mes y año.
  - `szCalc`: sueldos.
  - `hist82`: Estadísticas.
  - `rutasDia120`: todos los cierres de un día.
- Código nuevo: funciones de números aparte de las que arman HTML.

## Plan de blindaje (antes de cada cambio que toque dinero o mercancía)
Revisar y explicar qué pasa en cada caso. Cada caso nuevo lleva su prueba.

| Caso | Qué revisar |
|---|---|
| Varias vueltas el mismo día | Ninguna pisa a otra. Corte del día = suma de todas (`t120`, `t122nube`) |
| Sin señal | Se guarda en el celular y se sube completo después. No usar transacciones en ruta |
| Dos o más celulares a la vez | Llaves únicas por registro, incrementos, sin documentos que se sobrescriban (`t61`, `t122nube`, `t123nube` con 4 celulares). Un celular no sube nada hasta bajar primero lo de la nube |
| Medianoche / cambio de día | La vuelta abierta se queda en su día. Lo recibido sigue en caja (`t120`) |
| Reabrir, cancelar, anular | Nada se borra. Lo anulado no suma |
| Recepción atrasada | Se cuenta una sola vez (`t94nube`) |
| Celular nuevo o reinstalado | Todo baja de la nube. No se cambia el origen de la app (androidScheme, hostname, appId) |
| Datos viejos | Al cambiar cómo se guarda algo, lo existente se pasa como "saldo inicial" o "arrastre" para que ningún número brinque |
| Límite de 1 MB por documento | Detalle 60 días y resúmenes por día (`t122`) |
| Dos administradores | Lo que hace el admin una vez al día usa llaves fijas: no se duplica |

**Antes de cada APK:** todas las pruebas en 0 FAIL, incluidas las de cuadre:
- `t61` (saldos con dos celulares);
- `t115` (cobro en la entrega);
- `t118` (sueldos);
- `t120`, `t120b` (varios cierres; app en blanco sin nada de la demo);
- `t121` (Cuadre);
- `t122`, `t122nube` (60 días; cierres con dos celulares);
- `t123nube` (cuatro celulares a la vez: dos administradores y dos choferes).

Sin ningún dato de la demo en la versión real (`t120b` revisa todas las pantallas).

## Fases pendientes (en orden)
1. **Vueltas con `vueltaId`** desde la salida, en cada entrega y gasto.
2. **Anular en vez de borrar**: gastos (hoy "Borrar gasto"), entregas canceladas, abonos, "por pagar".
3. **Todas las cuentas en un solo lugar** (`contabilidad`: corte de la vuelta, corte del día, saldo del cliente, inventario), usadas por todas las pantallas, con pruebas que comparen el antes y el después.
4. **Escritura en lote** por operación (agregar `writeBatch` a `nube/entrada.js`) y centavos enteros en los registros nuevos.

## Reglas para cuando se migre a Vite (solo recordar)
- **Desacoplar desde hoy:** todo código nuevo separa números y datos (funciones puras) de lo que dibuja la pantalla. Así luego es fácil pasarlo a módulos (`contabilidad.js`, `firebase.js`).
- **Salida:** `outDir: 'www'` con `base: './'` (rutas relativas; si no, pantalla en blanco sin internet).
- **No borrar los datos de los celulares:** no cambiar el origen de la app.
  - `androidScheme: 'https'` (así está en `capacitor.config.json`);
  - el hostname;
  - el appId `com.rutafacil.app`.
  - Si cambian, se pierden IndexedDB y localStorage de los teléfonos instalados.
- **Capa nativa intacta:** no tocar `MainActivity.java`, `RutaNativa`, `RutaGps`, `RutaAdmin`, `RutaArranque`, los permisos de `AndroidManifest.xml` ni la firma del APK.
- La llave de Google Maps sigue siendo el secreto `MAPS_KEY` de GitHub; nunca va en el código.
