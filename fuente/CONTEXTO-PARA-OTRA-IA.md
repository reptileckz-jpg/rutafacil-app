# Ruta Fácil (Plátanos Nietos): contexto completo para analizar la app

> **Antes que nada lee `fuente/REGLAS-NUMEROS.md` (reglas obligatorias de los números).**

> **Para la IA que lea esto.** Este documento resume TODO lo que ya existe en la app al 21 de noviembre de 2026 (versión 10.19, APK 1.0.67; ver sección 0).
> Antes de sugerir algo, revisa que no esté en la sección 6 ("Lo que YA hace la app") ni en la sección 8 ("Decisiones tomadas").
> Si una idea ya existe pero crees que está mal hecha, dilo así: "Ya existe X, pero propongo cambiar Y porque Z".
> No propongas cosas descartadas o dejadas para después (sección 8) como si fueran nuevas.
> Contesta en español sencillo de México. Numera tus sugerencias y di en qué pantalla va cada una.

---

## 0. Estado al 20 nov 2026 (léelo primero si vienes de otro chat)

**Versión publicada:** app **10.19** (21 nov) · APK **1.0.67**. **Todo está publicado.** · web https://platanos-nietos.web.app.
**Numeración:** los puntos viejos llegaron al 182 ("el 181 de antes"). La numeración nueva va en el **22**: todos publicados (del 1 al 22, incluido el 3: cliente lejos de su ruta → sugerir pasarlo, el administrador decide). El siguiente punto nuevo es el **23**.

### Cómo se trabaja (reglas de Ricardo)
- Contestar SIEMPRE en español sencillo de México. Ricardo no es programador: explicar qué pasaba, qué se hizo y una lista corta de qué probar.
- **No publicar la APK hasta que Ricardo diga "publica"** (o "arma y publica"). Mientras, todo va a la rama de trabajo con commits `[skip ci]`.
- Publicar = subir APP_VER en `fuente/vite/parches.mjs` (y las cadenas de versión en `fuente/pruebas/t148.js`), armar (`bash fuente/capas/build.sh`), correr pruebas, commit SIN `[skip ci]`, y *fast-forward* de la rama a `main` → se arman solos la APK (`apk.yml`, sale como release) y la web (`web.yml`).
- Los números SIEMPRE cuadran (`fuente/REGLAS-NUMEROS.md`); antes de tocar dinero, explicar cómo se protegen.
- Animaciones solo con transform/opacity (aceleradas por la tarjeta gráfica); con "Modo ahorro" o "reducir movimiento", quietas.
- **Ricardo (20 nov): mantener la MISMA interfaz gráfica** (tarjetas, botones, pestañas `tabs92`, chips, `link pnback` "← Volver", entrada `.fadein`). **Si hay varios pasos, cada paso en su propia pantalla** (barra `wz-hd` + "Paso N de M" + "← Atrás"). **Si es mucha información, que se abra en su propia pantalla** (en la tarjeta solo lo esencial y "Ver todo ›"); una tarjeta por tema, nunca tarjetas dentro de tarjetas.
- Nunca poner secretos en el código (MAPS_KEY y FIREBASE_SA viven solo en secretos de GitHub). No compartir `firma/rutafacil.jks`.
- El repositorio es PÚBLICO: nada de datos del negocio en registros de GitHub (si alguna vez hay que leer datos de la nube, cifrados y con permiso de Ricardo).
- Cada arreglo lleva su prueba `fuente/pruebas/tNNN.js` (Playwright, imprime "N OK · N FAIL"). Antes de publicar, correr TODAS (las que no cuentan: `t67.js`, `tk.js`) y `comp-venta` (debe salir IDÉNTICO).
- La app se arma por capas: `fuente/base-v38.html` + `fuente/capas/*.js` en el orden de `fuente/capas/orden.json`; cada mejora nueva es un `tema-XXX.js` al final. Ojo: el redibujado usa "morph" (compara la copia nueva con la pantalla); lo que deba cambiar el contenido ANTES del morph va en `tema-dibujar1.js` (ver 172 de antes).

### Lo que se hizo del 165 al 182 (19–20 nov)
- **165–170 Diseño:** barra flotante del administrador (165), "Más" en mosaico (166), Inicio, Ruta y Entrega en estilo Bento Glossy 3D (167–168), animaciones solo por GPU (169) y el estilo en toda la app (170).
- **171:** barra flotante también para chofer y venta local; celulares sencillos sin efecto vidrio; **Modo ahorro** (Ajustes, por celular); íconos 3D en toda la app; aviso de costo de carga 40 % fuera del promedio.
- **172:** la pantalla ya no brinca al tocar ✓/Mal en la revisión del vehículo; pantalla ancha (web, Fold, DeX) sin huecos; Ajustes ordenados en grupos con "Acerca de" al final.
- **173:** viaje de carga que nunca salió: aviso, "Este viaje nunca salió · cancelar" (lo pagado pasa a las otras cargas del mismo proveedor, sin mover la caja) y "Sí llegó · recuperar".
- **174:** auditoría de los 2,762 botones: "Ir ›" de "Cuadrar la caja" arreglado; sin "toque fantasma" (doble toque que confirmaba "Dar de baja", marcaba el tanque o avanzaba dos pasos).
- **175:** el teclado ya no se cierra solo (no se redibuja al abrirse el teclado; el morph no mueve ni reusa la caja del campo donde escribes).
- **176:** mayoreo del macho aparte del roatán ("¿Y el macho?").
- **177:** tarjeta de cajas vacías que debe, en rojo, y el renglón tiembla al cambiar.
- **178:** venta rápida / cliente nuevo sin datos ya no se queda como parada al regresar.
- **179:** "Cobrar ahora" del recordatorio lleva al paso de Cobro (no a las taras).
- **180:** un solo cálculo de km de la ruta en el cierre (Google solo si se ordenó desde la bodega antes de entregar; si no, de parada en parada).
- **181 (URGENTE):** "Mandar mi cierre de ayer" no hacía nada: el cierre tronaba con odómetro de salida vacío o con paradas de clientes que ya no existen, y la red de seguridad regresaba a la Ruta. Ahora pide el odómetro de salida y quita esas paradas rotas antes de dibujar (las ventas y el dinero no se tocan).
- **182:** "No mandaste tu cierre de ayer" muestra el resumen de lo que se va a cerrar.

### Lo que se hizo del 1 al 7 (numeración nueva, 20 nov tarde · 10.17)
- **1:** sin el recuadro azul de Android al tocar; si "Mandar mi cierre de ayer" no puede abrir el cierre, el error sale en esa pantalla (`tema-azul1.js`).
- **2:** las taras de un cierre atrasado sin recibir siguen contando en "dónde están las cajas" (`tema-taras2.js`).
- **4:** mayoreo igual o más alto que el normal pide revisarlo (`tema-may4.js`).
- **5:** el chofer no recibe más taras que las que entrega + las que debe el cliente; solo al mover las vacías y al guardar (`tema-tope5.js`).
- **6:** cierre atrasado con TODO (dinero, taras, kilos, gasolina, vehículo) en su pantalla `ruta6`; rutas que nadie recibió; "🔎 Descuadres" (taras, efectivo, kilos, sin recibir) con foto diaria `S.foto6`, casos `S.casos6`, notas y ajuste de taras por pasos (`tema-atras6.js`, `tema-desc6.js`).
- **7:** cada día la ruta empieza desde cero: si una ruta de otro día se queda abierta y pasa a "hoy", se cierra (cierre atrasado) y la de hoy pide "Antes de salir" (`tema-cero7.js`, marca `salida.f7`).
- Caso real de Danu (20 nov): su ruta de ayer pasó a "hoy" sin cierre ni salida nueva al abrir el admin; no se pudo reproducir el camino exacto (ver pendientes.md). La regla 7 lo cubre desde 10.17.

### Lo que se hizo del 8 al 13 (21 nov · 10.18)
- **8:** la pantalla ya no parpadea mientras baja la nube: fotos en tandas y redibujos de la nube con tope de 0.5 s (`tema-calma8.js`).
- **9:** recordatorio de pago de sueldos el sábado en "Hoy" de Inicio y al recibir el cierre del chofer (`tema-pago9.js`).
- **10:** "Cargar más" solo arriba de la Ruta cuando la camioneta trae 0 cajas y 0 kg y quedan clientes (`tema-cargar10.js`).
- **11:** sin rebote al deslizar rápido: mientras el usuario desliza, los redibujos no mueven la pantalla (`tema-scroll11.js`).
- **12:** tarjetas desplegables se abren suave desde el toque y se cierran al salir de la sección (`tema-desp12.js`).
- **13:** fotos guardadas en el celular (IndexedDB, hasta 400) y las de vehículos precargadas (`tema-fotos13.js`).

### Lo que se hizo del 14 al 22 y el 3 (21 nov · 10.19)
- **14:** se quita el aviso viejo "Solo traes X" cuando lo pedido ya cabe (`tema-falta14.js`).
- **15:** la pantalla no brinca (nota de remisión y toda la app): lugar reservado para imágenes y ancla al redibujar (`tema-quieto15.js`).
- **16:** kilometraje imposible (falta odómetro de salida o más de 1000 km) no se cuenta; el admin lo corrige en "⚠️ Kilometraje por corregir" (`tema-km16.js`).
- **17:** contar por billetes vuelve a ser opcional (obligatorio solo si se pone en Ajustes → Controles) (`tema-bill17.js`).
- **18:** en el Cuadre, lo que se resta va en rojo (`tema-rojo18.js`).
- **19:** "🔄 Cerrar su ruta" en Rutas para una ruta que se abrió sola o se quedó abierta; estimado de km si no se anotó (`tema-cero19.js`).
- **20:** cerrar la ruta el MISMO día = que regrese a la bodega (o viaje de carga) y haga su cierre normal; pedidos siguen; vuelta 2 = cierre #2 con "Antes de salir" (`tema-regreso20.js`).
- **21:** al entregar a todos: tarjeta "🏁 Terminaste tu ruta: regresa a la bodega" + Google Maps se abre solo UNA vez al tocar "Seguir con la ruta" (`tema-fin21.js`).
- **22:** en "Hoy" de Inicio: "🏭 Danu ya llegó a la bodega · trae $…, N cajas" (GPS de ≤ 15 min a ≤ 300 m, ruta terminada o regreso pedido, sin cierre) (`tema-fin21.js`).
- **3:** "📍 Quedan lejos de su ruta" en Armar rutas (≥ 3 km del resto de su ruta, con otro chofer a la mitad o menos y ≥ 2 km de ahorro): Pasarlo solo hoy/mañana, Siempre, o No (no vuelve a sugerirlo, `S.lejos3No` en la nube) + aviso en "Hoy" (`tema-lejos3.js`).

### Ideas que quedaron solo como idea (no pendientes)
- Registrar una entrega olvidada de ayer desde el cierre atrasado: se recomendó NO hacerlo (movería inventario y cobranza de dos días); el admin lo ajusta al recibir.
- Leer los datos reales de la nube para confirmar casos (viaje del 173): requiere permiso de Ricardo y salida cifrada (repo público).

---

## 1. Qué es

- **App Android para administrar un negocio familiar de reparto de plátano** (roatán y macho) a tiendas, fruterías y restaurantes.
- **Nombre:** dentro de la app, "Plátanos Nietos". El APK se llama **"Ruta Fácil"** (`com.rutafacil.app`).
- **Quién la hace:** Ricardo Nieto Mejía (hijo), sin cobrar, para el negocio de su papá (también Ricardo). La programa con ayuda de IA (Claude Code).
- **Estado:** en pruebas reales. Hoy se prueba en Tijuana con 1 o 2 choferes y 40 clientes de prueba con ubicaciones reales de Tijuana. El negocio real está en **Banderilla, Veracruz**.
- **Meta del negocio:** que el papá (persona mayor, con lentes, poca tecnología, pero buen uso de WhatsApp) pueda manejar el negocio desde el celular, apartarse sin abandonarlo y tomarse ~10 días de vacaciones. También, que un chofer nuevo pueda hacer la ruta sin que le enseñen cliente por cliente.
- **Lo más importante:** que **los números siempre cuadren** (dinero, cajas y kilos) y que nada se pierda.
- **A futuro:** Ricardo quiere sacarla para uso libre, para otros negocios. Por eso todo lo de lugares (estado, colonia, bodega) sale de la ubicación GPS y no está fijo a Veracruz.

## 2. El negocio (cómo funciona en la vida real)

- **Producto:**
  - **Roatán:** se compra **por kilo** al proveedor y se vende **por caja** (≈20–22 kg). Caja llena = "caja"; caja vacía = "tara" (pesa 2 kg).
  - **Macho:** se compra y se vende **por kilo**.
- **Maduración:** la fruta llega verde y se madura en bodega con carburo. Tarda **horas** (distinto para roatán y para macho) y depende del clima: con frío tarda más. Ya madura dura ~3 días. Lo de segunda se remata por kilo; lo que no sirve se tira (merma).
- **Gente:**
  - **Administradores:** dos (papá e hijo), cada uno con su cuenta y la misma información.
  - **Choferes:** 1 o 2 al día, empiezan a las 8:00. Se trabaja también en domingo.
  - **Encargado:** un chofer de confianza puede quedar como encargado temporal (recibe efectivo y hace el cierre del día).
  - **Contador:** con acceso de solo lectura a números.
  - **Venta local:** venta en bodega.
- **Clientes:** 40–100 por toda la ciudad. Casi todo es en efectivo; también tarjeta y transferencia. El crédito se da a pocos clientes y lo autoriza el admin. El ticket se manda como imagen por WhatsApp o se imprime en una impresora térmica Bluetooth.
- **Viajes de carga:**
  - El roatán viene de El Pital (proveedor "Roly"). El macho viene de Nautla (Josue) y de Coacoatzintla ("El Lic").
  - Ruta típica: Banderilla → El Pital → Nautla → Banderilla, en camión Freightliner M2. A Coacoatzintla se va aparte, en NP300.
  - A quien va le dan efectivo para pagar y para gastos (diésel, básculas, comida). Hay básculas en el camino.
- **Vehículos:**
  - Freightliner M2 2015: diésel y DEF, placas de Guerrero, aceite cada 13,000 km.
  - Dos Nissan NP300: gasolina, placas de Veracruz, aceite cada 10,000 km.
  - Cada día se registran el odómetro, el nivel del tanque y 4 fotos al salir y al regresar (solo con cámara, no galería).
- **Dinero:** no hay sueldo fijo del dueño (toma de la caja). No hay cuenta bancaria del negocio. Están en el SAT pero no facturan.
- **Celulares:** los de los choferes son **del negocio**, por eso la ubicación se manda siempre. Al final del día se entregan en bodega el celular, la terminal, la impresora y el vehículo.

## 3. Cómo está hecha (técnico)

- **Front:** un solo HTML. Hay una **base** (`fuente/base-v38.html`) y encima **capas** (`fuente/capas/l1.js … l90.js`) más **temas aplanados** (`tema-rutadia.js`, `tema-cobranza.js`, `tema-pantallas.js`, `tema-avisos.js`, `tema-reparte.js`, `tema-vehiculos.js`).
  - **Regla nueva:** lo de un tema aplanado se cambia en su `tema-*.js`, sin envolturas nuevas en otras capas. Avance de la migración a Vite en `fuente/migracion.md` (se mide con `bash capas/mide.sh`: envolturas que quedan; meta 0).
  - **Mapa de errores:** el armado marca dónde empieza cada capa y lo anota; los errores dicen "En: l80.js:57".
  - Cada capa reemplaza o envuelve funciones globales: `var _f=f; f=function(){…}`.
  - Se arma con **Vite** (`npm run build`, `npm run dev`): `fuente/vite/armar.mjs` junta todo (orden en `capas/orden.json`) y le hace a la base los cambios de `fuente/vite/parches.mjs`.
  - Salen dos versiones: `prototipo-platanos.html` (**demo** con datos de ejemplo) y `platanos-primera-vez.html` (**versión real**, `PN_MODO="vacio"`, sin datos de ejemplo). La real se copia a `www/index.html`.
- **Estado:** un objeto global `S`. `render()` dibuja la pantalla según `S.role` y `S.tab`. Hay un motor que solo actualiza lo que cambió.
- **Guardado local:** IndexedDB en el teléfono, ~0.7 s después de cada cambio y al irse al fondo. Además, la caché de Firestore.
- **Nube:** Firebase.
  - Auth: usuario/correo + contraseña, con perfiles y roles.
  - Firestore: el estado `S` se parte en "unidades". Hay datos compartidos del negocio (lista `NB_SH`) y la ruta de cada chofer (documentos `r~id~clave`).
  - Se combinan **campo por campo**, así que dos celulares no se borran los cambios. Los saldos usan sumas y restas (increment).
  - Hay reglas de seguridad (`firestore.rules`) con pruebas.
  - Si la copia local se daña, se repara sola. Plan B: copia en memoria.
- **Android:** Capacitor 7 (pide Android 6 o más nuevo). Hay código nativo propio (`nativo/`):
  - `RutaNativa`: huella, compartir a WhatsApp, Descargas, impresora Bluetooth ESC/POS, escáner, Google Places, notificaciones.
  - `RutaGps`: ubicación siempre prendida en celulares del negocio.
  - `RutaArranque`, `RutaAdmin`: modo administrado del dispositivo.
- **Mapas:** Leaflet (OpenStreetMap) dentro de las pantallas; Google Maps a pantalla completa con "Ver en Google Maps".
  - Google **Routes API** para "Ordenar con tráfico". Google **Places** para buscar y nombrar lugares.
  - La llave está en el secreto `MAPS_KEY` de GitHub. **Nunca va en el código.**
- **Clima:** open-meteo, con la ubicación de la bodega.
- **Publicación:** subir a `main` hace que GitHub Actions arme el APK firmado `1.0.<número de corrida>` y lo publique en Releases. Lo que no debe armar APK lleva `[skip ci]`.
- **Pruebas:** Playwright, ~35 archivos en `fuente/pruebas/` (cada uno imprime "N OK · N FAIL"). Hay pruebas con **dos celulares** y una nube de prueba que se porta como Firestore (`t61`, `t78nube`, `t81nube`). También una prueba que revisa que la versión real **no traiga nada de la demo** (`t80vacio`). Todas pasan en la 8.1b.
- **Bitácora:** `fuente/pendientes.md` tiene todo el historial: puntos 1–100 de la primera lista y la lista nueva (hasta el 96).

## 4. Reglas de diseño que ya se siguen (no proponerlas como nuevas)

- Español sencillo de México. Letra y botones **grandes** (el dueño usa lentes). Tarjetas blancas redondeadas, ícono en cuadrito de color, números grandes.
- Todo lo que pide datos o decisiones va en una **tarjeta de pantalla completa, paso a paso, una pregunta a la vez**, con "Atrás" y "Siguiente".
- **"¿Estás seguro?"** en lo que no se puede deshacer.
- **Ningún botón se queda sin hacer nada:** si algo no se puede, la app dice por qué.
- Todo lo que "falta…" te lleva al campo (se pone rojo y se sacude).
- **Doble toque = un solo registro** (protección de 1 s).
- Avisos en segunda persona cuando tú lo hiciste ("Registraste…") y con nombre cuando fue otro ("Danu registró…").
- Fotos de evidencia solo con cámara (la cámara propia de la app, trasera, con marca de agua de fecha y hora). Ahora se guardan a 1000 px.
- Con cada versión se le da a Ricardo una lista de prueba corta por número de punto.

## 5. Roles y pantallas

- **Administrador:** pestañas Inicio · Bodega · Cargas · Clientes · Gastos · Vehículos · Personal · Estadísticas. Además: menú, Ajustes, botón "+" y botón "?".
- **Chofer (rep):** pestañas Ruta · Entrega · Cierre · Viaje/Gasto, con tutorial propio.
- **Encargado:** chofer con permisos de admin temporales.
- **Contador:** Resumen · Gastos · Deudas · Exportar.
- **Venta local:** Vender · Corte.
- **Acceso:** PIN por usuario (se vuelve a pedir tras 5 min admin/contador o 30 min chofer), huella (se ofrece dentro de la app), PIN olvidado, cambiar de usuario, sesiones.

## 6. Lo que YA hace la app (inventario por área)

### Inicio del administrador
- Precio de hoy (si no se fija, se cobra el de ayer y la tarjeta se pone roja). Precio de mayoreo mínimo (no puede ser mayor que el normal). Aviso de precio ±10%.
- Inventario en dos tarjetas (roatán y macho) con "Te alcanza para N días".
- "Por atender": avisos en tarjetas por urgencia, con ícono. Ventana de urgentes "1 de N". "Atender" lleva al lugar exacto.
- Cierres de los choferes por recibir. **Recepción a ciegas:** quien recibe cuenta sin ver lo que debería ser. Faltantes y qué hacer con ellos.
- Resumen del día por WhatsApp. Respaldo (copia y Excel). "Aprende la app" (lista que se palomea sola al hacer cada cosa). "Hoy te toca" / "Ahora sigue". Burbuja "¿Qué sigue?".
- **Rutas de hoy** (ver 6.7).
- "Liberar su ruta de hoy" / "Recordarle" cuando un chofer no mandó su cierre de ayer.

### Bodega
- Inventario: verdes, en maduración, maduras, taras vacías. Varias bodegas.
- **Maduración:** meter a madurar (cajas o kilos, método, clima, temperatura real). Cuándo se sacan (en horas o día y hora). Barra de avance con el **reloj real**. "Sacar: ya está maduro". Sugerencia de cuánto meter a madurar hoy para mañana.
- **Fruta madura por antigüedad:** cada lote dice qué pasó (se tiró / se remató / ya no está / salió a la venta). Los lotes se descuentan solos con las ventas. La tarjeta se desliza para quitarla y vuelve sola si entra fruta de otro día o algo está por pasarse. Fruta apartada para pedidos.
- Cajas que regresan del reparto: no entran a bodega hasta que alguien las cuenta ("Cajas sin contar"), con foto obligatoria. Buró de taras (quién debe taras y desde cuándo).
- **Ubicación de la bodega con GPS:** Google dice qué hay en ese punto y sugiere "Bodega + colonia". Si no hay dirección, el nombre es obligatorio. De ahí salen el estado de las placas, el clima y la dirección del negocio.

### Cargas y viajes de carga
- Registrar carga: proveedor, kilos, precio, cajas, macho, gastos, todo desglosado. "¿Sumar el desgaste del vehículo?", "¿Sueldo por este viaje?", costo del viaje más exacto. "¿Meter a madurar?" con día y hora de salida.
- **Simulador de viaje:** cuánto cuesta cada caja y cuánto deja el viaje antes de hacerlo. "+ Otra báscula", "+ Nuevo" proveedor. Pronóstico de 7 días: si alcanza la fruta y cuándo pedir.
- **Programar un viaje** (fecha, hora, chofer, vehículo, efectivo). **Viaje de carga paso a paso** para el chofer: revisión, tanque, combustible, fotos, camino, básculas, proveedores, vuelta, registro.
  - Ubicaciones de básculas y proveedores: aproximadas → exactas al llegar.
  - Viaje pactado vs real. "Cómo van las cuentas" en vivo durante el camino (le dieron, combustible, otros gastos, debe regresar). Al llegar, resumen prellenado y efectivo que regresa.
  - Retraso: avisa al admin. Pedir al proveedor por WhatsApp.
- Proveedores: qué vende cada uno, crédito, lo que se les debe, pagos.

### Clientes
- Ficha con pestañas: foto de fachada, ubicación (GPS / link de Maps / coordenadas / búsqueda en Google Places), horario, **días de visita**, chofer fijo, crédito y límite, taras que debe, mayoreo, historial de compras.
- **Alta por pasos.** **Importar clientes** desde CSV o Excel con plantilla (nombre, apodo, teléfono, ubicación, dirección, horario, días, chofer, crédito, taras). Si el cliente ya existe, lo actualiza por nombre sin duplicarlo.
- **Buró de crédito y mayoreo:**
  - Crédito máximo por cliente ($1,500; excepciones solo el admin). Tope por chofer de lo que le deben todos sus clientes, con sugerencias de subir o bajar.
  - 2 mayoreos a mano en 10 días → "en revisión".
- Cobranza: quién debe y desde cuándo. Recordatorio amable por WhatsApp. QR de clientes (opcional).
- "Datos que faltan", agrupados por prioridad. Cada uno lleva al campo.

### Pedidos
- Pedidos por WhatsApp, llamada o en persona, paso a paso: cliente (o cliente nuevo), cajas y kilos, para hoy o mañana, a qué chofer (sugiere el más cercano), "¿Cabe en la ruta?".
- Seguimiento: recibido → chofer asignado → salió a reparto. Le llega al chofer al momento por la nube.
- **Precio especial** solo para ese pedido: el chofer pide permiso y el admin tiene 5 min para contestar; si no contesta, va a precio normal.

### Rutas del chofer y reparto
- **La ruta del día se arma sola:** al cambiar de día, cada chofer recibe sus clientes (chofer fijo + días de visita), más pedidos, más los que no se visitaron ayer (solo si ese día sí trabajó), más los cambios del admin.
  - Funciona abra el celular que abra primero.
  - Si el chofer no mandó su cierre de ayer: pantalla "No mandaste tu cierre de ayer" → al mandarlo se le arma sola la de hoy. Si ayer no trabajó, no se le pide.
- **Ordenar con tráfico** (Google Routes, una llamada), con hora estimada por cliente. La app aprende los tiempos.
- Inicio de ruta: odómetro y tanque confirmados, 4 fotos, revisión del vehículo (la del lunes es más completa), equipo con buen o mal estado (celular, terminal, impresora, llaves).
- **Entrega:**
  - Cajas y kilos; empieza con lo de la vez pasada o en ceros. "Lo mismo de la vez pasada". Taras que deja y recoge.
  - Pago: efectivo, tarjeta (con comisión), transferencia o mixto. Crédito o abono (con permiso para fiar). Mayoreo.
  - Ticket obligatorio por WhatsApp si queda crédito o hay abono, e impresión Bluetooth.
  - "No estaba", "Tenía producto", "Compró a otro", cambios de fruta mala con foto, cancelar con motivo, cliente nuevo en ruta (alta por pasos), confirmar o corregir la ubicación.
- Gastos de ruta: comida solo si se acordó, ticket obligatorio con foto, combustible (litros, precio, total). TAG de autopista.
- Modo manejo automático. Ubicación en vivo cada 2 min o cada 200 m. Alertas: sin señal, exceso de velocidad, paradas raras.
- "Su recorrido" para el admin: dónde está ahora, paradas con hora, tiempo en cada parada, km, plan vs real.
- **Cierre por pasos:**
  - Efectivo que de verdad entrega, con billetes opcionales con + y −. Corte en foto con QR. Fotos y odómetro de regreso. Si entrega el vehículo en las mismas condiciones.
  - Reabrir con permiso, carga extra u otra vuelta con permiso. Apoyo entre choferes y pasar la ruta.
  - Lo que pasó hoy en su ruta (minimizado).

### 6.7 Rutas del administrador (nuevo, versión 8.1)
- Tarjeta "🗺️ Rutas de hoy" en Inicio y en Personal → pantalla **Rutas** con **Hoy / Mañana**.
- Cada chofer con su color: sus clientes (zona, cajas y kilos aproximados), "ya va en camino" / "no ha salido", cuántos lleva entregados.
- Marcar varios → **Pasar a…** → chofer → **solo ese día** o **siempre** (cambia su chofer fijo). **Pasar todos…** por chofer. **Todos a un chofer.**
- **Hoy no / Mañana no** (salta solo ese día) y "Volver a ponerlo".
- Avisos **Sin chofer** y **Sin días de visita**. **Mapa** con el color de cada chofer. **"¿Le cabe?"**: cajas contra la capacidad de su camioneta.
- Si el cambio es para hoy, al chofer le llega una notificación y su lista se acomoda sola, aunque ya vaya en camino (la app te avisa antes). Si está entregando a ese cliente, el cambio espera.
- Incluida en el tutorial: paso "Rutas", recorrido "Nuevo: Rutas", "Aprende la app", "¿Cómo se usa?" y el botón "?".

### Gastos, caja y dinero
- Efectivo en caja = lo que de verdad está en la caja. Cierre de caja obligatorio. Límite de pagos. Conteo doble.
- Gastos fijos y gastos con factura. Cerrar el mes por pasos. Préstamos, adelantos, bonos y sueldos (semanal, por día, base + comisión por caja o kilo).
- Costo de repartir. Desgaste del vehículo. Por pagar a proveedores.
- Los saldos de cliente y proveedor se guardan como sumas y restas, así que dos celulares no se borran el movimiento. Centavos redondeados.
- **Facturas CFDI 4.0:** listas pero **apagadas** (datos fiscales, facturar venta, factura global mensual). Falta conectar un PAC cuando se quiera.

### Vehículos
- Ficha con placa dibujada del estado real, papeles con vencimientos (seguro, tarjeta de circulación, verificación), VIN, llantas, DEF.
- Aceite y afinación por km con aviso, preguntando "¿qué marcaba el tablero?" o "¿hace cuántos km?". Taller, bitácora, historial de revisiones.
- TAG por vehículo: saldo, recargas, cruces como gasto del viaje, importar cruces del estado de cuenta, aviso de saldo bajo.
- Rendimiento de combustible y consumo alto. Vehículo asignado a cada chofer.

### Personal
- Alta por pasos: puesto, papeles (licencia, INE, frente y reverso), referencias, sueldo y PIN. Accesos a la nube desde Personal. Bajas.
- Encargado temporal y "Me voy de vacaciones" (solo llegan avisos urgentes). Permisos por chofer (seguir trabajando, fiar).

### Estadísticas
- Ventas, ganancia, por chofer y por cliente, por día, mes y año, con datos reales de cada día (rutas archivadas, venta en bodega, gastos, mermas, costo de la última carga). Rankings con lo que compró cada cliente en 30 días. Revisión de números (15 revisiones).
- **¿Cuadran las cuentas?** (Inicio): dinero, cajas, kilos, taras, conteo de bodega y cierre de caja, en verde/amarillo/rojo, hoy y ayer.

### Primera vez y ayuda
- Asistente de inicio por pasos: Bienvenida, Bodega, Vehículos, Personal, Clientes (o importar), Proveedores, Dinero y precios, Listo. Con "Corregir".
- Tutorial de la primera vez (admin y chofer) y tutorial por días. Botón "?" en cada pantalla. Bienvenida y permisos al primer uso.

### Seguridad, estabilidad y datos
- **Red de seguridad:** si algo se rompe al cargar o al dibujar, la app no se queda en blanco. Hay pantalla de rescate con el error, "Copiar el error", "Mandar por WhatsApp", "Reparar la conexión con la nube" y diagnóstico.
- Limpieza de "viajes revividos a medias" que traía la nube.
- Aviso "N cambios sin subir: no borres datos" si algo tarda más de 20 s en subir.
- Problemas reportados (Ajustes). Borrar datos de prueba. Respaldo con Excel.
- **Sin datos de demo en la versión real** (lo revisa una prueba automática).

## 7. Historial reciente (lo último que se hizo)

| Versión | Qué |
|---|---|
| 7.6 (12 nov) | Fruta madura, ubicaciones con Google Places, chofer (cliente nuevo, taras, botones), cámara propia, huella, aceite, revisión por pasos, primera vez por pasos, importar clientes, TAGs, facturas apagadas |
| 7.7–7.9b (12 nov) | Red de seguridad. Arreglo del admin atorado en "Cargando" (pedazos sueltos de un viaje que la nube revivía) |
| 7.8 (12 nov) | Puntos 15–30: ubicación, TAG, galería, VIN/llantas/DEF, pedidos con precio especial, apartados, historial de revisiones |
| 8.0 (14 nov) | Ruta del día sin depender del cierre ni del celular del admin; reparación de la copia de la nube; **maduración con reloj real** (antes no avanzaba: error grave ya corregido); quitar todo lo de la demo de la versión real; bodega con GPS; cuentas del viaje en vivo |
| 8.0b | Nombres de lugar sacados de la ubicación de la bodega (colonia, estado de placas) |
| 8.1 / 8.1b (14 nov) | **Rutas del administrador** y su tutorial |
| 8.2 (14 nov) | Estadísticas con datos reales (antes solo la demo), retiro del dueño fuera de la ganancia, **¿Cuadran las cuentas?**, recontar bodega con motivo, fruta madura solo si se pasó, la pantalla ya no brinca, cuánto cargar con un solo cálculo, fotos de evidencia solo cámara + el admin las ve, rankings y datos del cliente desde las entregas, pedido tarde (hora límite), kg sueltos de venta local, taras al chofer, días sin movimientos |
| 8.3–8.5 (16 nov) | Rutas con el diseño de Ricardo (letra grande, tarjetas de chofer, panel de abajo con Confirmar, Deshacer), el chofer ya no se traba en "No mandaste tu cierre", el administrador no reparte salvo que prenda "¿Repartes hoy?", días fijos al pasar un cliente sin días, no visitados solo si su siguiente visita está a 2+ días o fallaron 2 |
| 8.6–8.8 (17 nov) | Chofer trabado (pantalla que no se quitaba; liberar la ruta cargada en el celular del admin; petición en rojo), taras que ya debían los clientes como saldo inicial, numeritos con su lista, bloquear solo si el chofer salió, avisos del chofer agrupados, pendientes con "Ir" / "✓ Listo" / "Recordar mañana", informativos a "Lo que pasó hoy", falla de vehículo con 3 opciones |
| 8.9 (17 nov) | Ubicación escrita en la dirección, odómetro inicial con el último registrado, pantalla del chofer acomodada, roatán azul petróleo |
| 9.0 (17 nov) | Fotos del vehículo en grande; aviso grande al chofer cuando le quitan un cliente; el administrador que reparte (contador, acceso arriba, tutorial propio, textos del cierre); vehículo ocupado; vehículos con el mismo número interno (arreglado); versión real del APK arriba |
| 9.1 (17 nov) | **Cobranza** (`tema-cobranza.js`): quién debe y desde cuándo, plazo general y por cliente, estado de cuenta por WhatsApp, promesas de pago (aviso al admin y al chofer) |
| 9.2 (17 nov) | **Reorganización** (`tema-pantallas.js`): barra Inicio · Rutas · Clientes · Bodega · Cargas · Más; Inicio con precio que destella, lista "Hoy", números, bodega como antes; Rutas (repartir, mapa, cierres); Clientes con pestañas Clientes · Pedidos · Cobranza; pendientes en un renglón; numeritos rojos solo si es urgente; sueldos en Personal; tutoriales al día |
| 9.6 (17 nov, APK 1.0.43) | **Versión real sin valores de la demo en los números:** odómetro, costo de la caja/kilo sin cargas (se pregunta en el asistente y en "Datos que faltan"), costos/capacidades de vehículos del asistente, límite y "% de contado" de clientes nuevos; proveedores y básculas con la coordenada escrita en la dirección ya no piden ubicación (98); viaje de una sola fruta sin preguntas de la otra (102); desgaste/sueldo con ✓ y renglón verde (103); sin destello al desplazar en celulares lentos (104); quitar fotos del vehículo (105). Migración a Vite: temas avisos, quién reparte y vehículos (503 envolturas) |
| 9.7 (17 nov, APK 1.0.44) | Notas de remisión con número seguido por chofer (107); taras prestadas: cobrarlas al cliente (25 días) y al chofer a mitad de precio (30 días), fondo para taras (108); aviso grande y ventana de lo que el cliente ya debía (109); "Cargar más" en ruta con parada a la bodega (110); viaje de una sola fruta sin "¿a quién se le cargan los gastos?" y la otra fruta como opción (111); visitados al final y minimizados (112); sin parpadeo al cerrar la ruta, fotos del odómetro que sí se guardan, cámara que abre una sola vez con el lente principal (106, 113); burbuja del admin arriba en Inicio (114); cobro nuevo en la entrega: "A cobrar" abajo con desglose, billetes según el monto, abono rápido, cajas con saldo (115); tope de cajas vacías del chofer, 20 de inicio (116) |
| 9.8 (18 nov, APK 1.0.45) | Horario de los clientes en palabras ("de 8 de la mañana a 8 de la noche") y pregunta "¿Cierra a las 8 de la noche?" al capturarlo mal; apodo igual al nombre ya no se repite; "Esta entrega te deja" legible en la tarjeta verde (117); **sueldos por fechas**: semana de domingo a sábado que se paga el sábado, faltas ("Hoy no vino" y "¿Faltó hoy?"), día de descanso con pregunta semanal, ingreso y baja, primera semana proporcional, vacaciones y aguinaldo de ley, finiquito (118; antes no se sumaban los días ni la comisión de días pasados); fotos a 1280 px y 82% (las de la ruta estaban a 480 px) (119) |
| 9.9 (18 nov, APK 1.0.46) | Barra flotante de lo ganado (117); las faltas bajan el aguinaldo (118); **120 (urgente): nada de la demo en las cuentas** (ingresos +$9,800, gastos +$1,850/$7,300/$29,800, verificación $493, datos de personal de ejemplo), **ningún cierre se borra** (2º, 3º, 4º… guardados completos; Estadísticas e Ingresos con todos), efectivo en caja con lo recibido de todos los cierres (antes se perdía al cambiar de día), recuperar cierres perdidos, Estadísticas que no truenan, el chofer ya no intenta cambiar Ajustes; **121: 💰 Cuadre** (día/semana/mes: cada cierre de cada chofer con fotos, créditos, taras, gastos, km y desgaste, sueldos, ganancia y neto; cuadre del dinero), calculadora de desgaste ($0.70/km al empezar), estimaciones con datos reales, errores de "Problemas reportados" corregidos; **122:** reglas obligatorias de los números (`REGLAS-NUMEROS.md`), cada cierre con su propia llave en la nube (antes el 2º pisaba al 1º al sincronizar), 60 días de detalle + resúmenes por día para siempre (Cuadre por año), dinero con centavos, la venta guarda el nombre del cliente y su id; fotos de evidencia 60 días; "Cuenta tu efectivo" una vez; errores arreglados quedan resueltos |
| 10.0 (18 nov, APK 1.0.47) | **Iniciar el día por pasos** (124, `tema-iniciodia.js`): 1 Vehículo (asignado: "¿Hoy usas este?" o usar otro, con aviso al admin; el equipo se pregunta después de escogerlo, con las llaves del que se lleva) → 2 Inspección → 3 Fotos de los 4 lados → 4 Odómetro → 5 Gasolina → 6 Carga → 7 Revisar; el admin que reparte también por pasos y SOLO él puede omitir las fotos (antes decía "opcionales" pero no lo dejaba). **Venta en ruta por pasos** (125, `tema-entregapasos.js`): Qué le dejas → Cobro → Cajas vacías y taras (se brinca si no debe) → "Revisar y guardar" (la ventana de siempre); cuentas y guardado iguales (`comp-venta.js`). Tarjeta "¿Cuánto cargas hoy?" sin texto cortado. Al recibir el cierre no se acepta efectivo negativo (123). Llaves del equipo = las del vehículo que se llevó (también en el celular del admin, `t124nube`). Vite: 9 temas más aplanados (568 → 294 envolturas, 48%). |
| 10.1 (18 nov, APK 1.0.48) | **Cobro de clientes con deuda** (127): si ya debe algo, la venta es de contado (permiso del admin para fiar se respeta); el paso Cobro en orden (esta entrega → lo que debía y abono → cómo paga → total → ¿Cómo pagó? → ¿Con cuánto? y cambio) sin repetir; sin la comisión del chofer en la venta; recordatorio de taras si ya debe. **"🚦 Ordenar con tráfico"** (126) arriba de la ruta, también antes de salir, y si faltan ubicaciones lo dice en lugar de desaparecer. |
| 9.3–9.5 (17 nov) | **Cambio de día sin perder nada:** de 12 a 5 a.m. el chofer sigue con su ruta; **regla única: ninguna ruta con efectivo, entregas o cajas se reemplaza sin guardarla para recibirla** ("📥 Cierre atrasado / Lo que traía", en rojo hasta recibirlo); liberar guarda lo que traía; batería con dos celulares (`t95nube`) que cuadra efectivo y cajas |

## 8. Decisiones tomadas (no volver a proponer como nuevas)

- **IA dentro de la app:** decidido que **todavía no**. Se propondrá más adelante (Firebase Functions + Claude Haiku para lo diario y un modelo grande para preguntas y resúmenes).
- **Facturación:** lista pero apagada. Se conecta el PAC cuando el negocio quiera facturar.
- **Mapas chicos dentro de las pantallas = Leaflet.** Google Maps solo a pantalla completa. Google Maps "debajo" de la app se desfasaba y trababa algunos celulares, así que se descartó.
- **Huella:** no en la pantalla del PIN. Se ofrece dentro de la app; si se omite, se vuelve a sugerir en 3 días (máximo dos veces) y siempre está en Ajustes.
- **La × para cerrar todos los avisos de golpe:** quitada a propósito (son urgentes). Se usa "Después".
- **Estado de las placas:** se escoge a mano; la app sugiere el de la dirección de la bodega. Pendiente para uso libre: lista de los 32 estados (hoy solo hay diseño de placa de Veracruz y Guerrero; los demás salen genéricos).
- **Reparto automático de clientes entre choferes por zona, historial de cambios de ruta y planear la semana completa:** dejados para después, a propósito.
- **Fotos del viaje de carga:** obligatorias para el chofer, opcionales para el administrador (decidido).
- **Precio de la venta local:** independiente del precio del día (es remate), decidido.
- **Pedido a un chofer que ya cerró:** hora límite ajustable (tope 7:30 pm); antes se le pregunta al chofer, después pasa a mañana. Ya hecho.
- **Taras que faltan al recibir:** se cargan al chofer al precio de la tara; las de más se abonan. Ya hecho.
- **Play Store:** se publicará por prueba interna con cuenta personal; aún no se hace.
- **Datos de prueba:** solo los 40 clientes de Tijuana (`fuente/datos-prueba/clientes-prueba-tijuana.csv`), con 12–13 clientes por día en días salteados. Nada más ficticio.

## 9. Lo que se sabe que falta o está a medias

- La **venta local** no frena lo **apartado**: decidido que no hace falta (la venta en bodega es casi siempre remate).
- **Sugerencias de otra IA ya revisadas (14 nov):** pantalla de cuadre (hecha), correcciones como movimientos (ya existía), conteo físico vs calculado (hecho), corte de emergencia, "modo papá", agrupar avisos, "explícame este número", chofer nuevo con ayudas extra, reporte de pérdidas: anotadas para después; no proponerlas como nuevas.
- **Android 8 (Samsung viejo):** debería instalarse (Capacitor 7 pide Android 6+), pero necesita actualizados "Android System WebView" y Chrome. No se ha probado.
- **Fotos ya guardadas antes de la 8.0:** siguen pesadas. Solo las nuevas salen a 1000 px.
- **Vehículos ya dados de alta con estado "Veracruz" por defecto:** no se cambian solos.
- **Lo que hay que probar en celulares de verdad:** el cierre atrasado y "Recibir lo que traía" (1.0.42), la reorganización (1.0.40), la Cobranza.
- **Viaje de carga que cruza la medianoche:** revisado y con prueba (`t96viaje`), pero sin probar un viaje completo de principio a fin.
- **Pendientes para después (anotados en `pendientes.md`):** orden de carga solo con varias frutas (83); reglas de la nube por campo (el chofer podría sobreescribir un documento completo); mover la llave `.jks` a un secreto de GitHub; seguir la migración a Vite (siguiente tema: avisos/pendientes); mapas chicos con look de Google (opción D, segunda llave) solo si Ricardo lo pide.

## 10. Cómo ayudar mejor

1. Lee primero las secciones 6 y 8.
2. Prioriza en este orden:
   1. Que los números cuadren.
   2. Que no se pierda nada.
   3. Que el dueño (mayor, con lentes) pueda usarla solo.
   4. Que un chofer nuevo no necesite que le enseñen.
3. Para cada sugerencia di:
   - **Pantalla.**
   - **Qué pasa hoy:** si no lo sabes, dilo.
   - **Qué propones.**
   - **Por qué**, con un ejemplo real del negocio (cajas, kilos, choferes, cobro).
4. Separa:
   - **Errores o riesgos:** se pierde dinero o datos, o algo no cuadra.
   - **Mejoras de uso.**
   - **Ideas nuevas.**
5. No propongas cambiar la tecnología: Android con Capacitor, Firebase, capas sobre la base. Funciona, y está probado con pruebas automáticas y dos celulares.
6. Si quieres ver el código, el repositorio es `reptileckz-jpg/rutafacil-app` (privado). La bitácora completa con cada decisión está en `fuente/pendientes.md`; empieza por el final.
