# Cambios acordados para la próxima vista previa (no aplicados al HTML)





> v2.9 PUBLICADA (artifact versión 30): viaje/ruta excluyentes, una inspección de reparto (diaria 5 puntos, lunes completa), Antes de salir solo efectivo, tarjeta de carga con precio/costo una vez, plantillas compactas, vehículo de reparto asignado o a escoger entre libres, vehículos solo con Editar, sin Transportes Rojas, contador sin Exportar en Resumen, avisos por urgencia sin repetir la burbuja, costo del viaje pide precio por kilo si falta.
> v2.8 PUBLICADA (artifact versión 29): Ya llegué bajo los botones, un solo mapa automático, límite de velocidad por vehículo con alerta roja+sonido e historial, inspección (carga completa; reparto diaria y lunes) con ok del admin, bienvenida del chofer con prioridad al viaje de carga.
> v2.7 PUBLICADA (artifact versión 28): básculas como paradas (vacío+pago → proveedor → cargado), Tu ruta de hoy con horas, mapa con acercamiento, notas/fotos de cómo llegar, horario de básculas, báscula cerrada (admin manda a otra o que espere), admin elige proveedor/báscula/método, plantillas marcadas y editables en Cargas, chofer solo viajes asignados.
> v2.6 PUBLICADA (artifact versión 27): viaje por fases, salida bloqueada, tramo entre paradas, De regreso, recargas múltiples, Gasto/Combustible/Problema/Llamar, fotos ticket báscula y fruta, cargadores, capacidad, mini mapa, GPS admin (viaje de ejemplo de Rafa a Tuxtepec), scroll conservado, 5 proveedores, proveedor por producto, 5 plantillas.
> v2.5 PUBLICADA (artifact versión 26): datos reales, combustible por vehículo, fotos de ejemplo, costo real del viaje, odómetro, desgaste, sueldo/comisión, precio intermedio, cierre de lotes, avisos de compra y alza, comparar proveedores, costo de reparto, contador ve costos. Pendiente solo lo marcado para APK.

## Datos reales para la demo (v2.5)
- Bodega: Banderilla, Veracruz.
- Proveedor de roatán: "El Rolly", en El Pital, Veracruz (reemplaza a Finca El Palmar).
- Proveedor de macho: "Proveedor de plátanos machos", en Nautla, Veracruz (reemplaza a Granja Los Mangos).
- Camión de carga: Freightliner M2 2015 (reemplaza al Camión Hino 2016).
- Distancias/tiempos aproximados desde Banderilla para ETA y combustible (~150–170 km por trayecto, ~3 h).
- Básculas de ejemplo cerca de El Pital y de Nautla (nombres genéricos hasta tener los reales).
- Clientes con direcciones de Banderilla y Xalapa, teléfonos con lada 228; mapa centrado entre Banderilla y Xalapa.
- Choferes: se quedan Danu y Rafa.
- Vehículos: Nissan NP300 2023 y Nissan NP300 2025 (reparto); Freightliner M2 2015 (carga).
- Nissan NP300 (gasolina): tanque 80 L; ficha 2023: 10.1 km/L ciudad, 14.8 carretera, 11.8 combinado (laboratorio). Rendimiento inicial en la app: 10 km/L (reparto en ciudad); se afina con datos reales.
- Freightliner M2 2015, Cummins 6.7, diésel: 2 tanques de 200 L = 400 L. Rendimiento inicial ~3.5 km/L (referencia Freightliner: 8–10 mpg ≈ 3.4–4.25 km/L; cargado rinde menos). Se afina con datos reales.
- Peso del camión: 4,000 kg es CON las cajas vacías arriba (carga normal de roatán). Cada caja vacía (tara) pesa 2 kg → camión solo ≈ 4,000 − 360×2 = 3,280 kg.
- DECISIÓN DEL USUARIO: el número de cajas varía → primer peso vacío predeterminado = 4,000 kg FIJO sin importar cuántas cajas lleve (no ajustar ±2 kg por caja). Editable con +/−. La tara de 2 kg/caja se guarda en Ajustes solo como dato (p. ej. revisar kg por caja).
- Kilos netos de fruta = peso cargado − peso vacío (las cajas ya van en los dos pesos, no se restan aparte).
- Peso del camión solo y peso por tara configurables en el vehículo / Ajustes.

## Para la v2.5 — CORRECCIÓN COMBUSTIBLE (análisis)
- Error actual: el costo de la carga solo suma combustible si hubo recarga (c.t.diesel = total recargado). Sin recarga → $0 de combustible; con recarga → se carga TODO lo recargado aunque sobre en el tanque. Ambos casos están mal.
- Separar DINERO de COSTO: la recarga es dinero que sale (gasto de combustible del vehículo); el costo que se le asigna a la carga es lo CONSUMIDO en el viaje.
- Paso obligatorio para el admin al cerrar cualquier viaje (suyo o del chofer), antes del precio del lote: "Combustible que gastó este viaje" en litros o pesos (enlazados), precio por litro = última recarga o precio del vehículo. Referencia: (nivel salida − nivel llegada) × capacidad + litros recargados; respaldo km × rendimiento. Debe ser mayor a 0; sin eso no se puede fijar precio.
- Mismo paso: "Otros gastos del viaje" (básculas ya puestas, casetas, comida, reparación, otro) con lo registrado en el viaje y opción de agregar.
- Carga de chofer: en la tarjeta de la carga "Falta: combustible del viaje" y aviso en Inicio hasta que el admin lo capture.
- Carga registrada a mano: el diésel también es obligatorio para fijar precio.
- Precio del litro: el de la última recarga de ese vehículo (editable).
- Gastos del viaje se reparten según lo que elija el admin: dividir por kilos, solo roatán o solo macho (el mismo selector de la carga, también dentro del paso de cierre del viaje).
- Odómetro en el viaje de carga: al salir y al llegar (mejora el cálculo de combustible y el mantenimiento).
- Mismo camión en reparto y viaje el mismo día: cada salida registra su nivel inicial y final; cada una se lleva su combustible.
- Comida del chofer en el viaje: entra al costo del viaje (costo por caja).
- Sueldo del chofer ese día entra al costo de la carga: semanal ÷ 7 (trabajan todos los días); por día = su pago diario; base+comisión = base ÷ 7 + comisión de lo cargado no aplica. Si va el admin: no se suma costo por su día.
- Desgaste del camión por km (aceite, llantas, mantenimiento): costo por km calculado con lo gastado en taller ÷ km recorridos, ajustable en el vehículo; se suma al costo del viaje.
- Pantalla final del viaje (admin): desglose (fruta, combustible, básculas, casetas, comida, sueldo, desgaste), costo por caja y por kilo con el reparto elegido, comparación con el lote anterior, precio sugerido con la meta de esa carga.
- Desgaste: ~$18,000 al año por camión (aceite, llantas, taller) ÷ km al año = costo por km (ajustable).
- Chofer base+comisión: comisión aparte por hacer un viaje de carga (independiente de la ruta); entra al costo del viaje y a su sueldo.
- Si falta fruta al llegar, el costo se calcula con lo que realmente llegó (cajas/kilos recibidos en bodega).
- No hay merma de viaje.
- Lote viejo + lote nuevo en bodega: sugerir un precio intermedio por 1–2 días hasta que se acabe el viejo.
- Desgaste: ~30,000 km al año → $18,000 ÷ 30,000 = $0.60 por km (ajustable por vehículo).
- Comisión por viaje de carga: monto fijo por viaje, en la ficha del chofer.
- Precio intermedio: promedio ponderado por cajas de cada lote; cuando se acaba el viejo, la app avisa "¿usar $X desde hoy?" y el admin confirma.
- Costo de reparto por caja: combustible + desgaste + sueldo de la ruta ÷ cajas entregadas; en Estadísticas.
- Combustible del viaje de chofer: solo lo captura el administrador.
- Si el precio sugerido cambia más de 10% contra el de hoy: avisar y explicar por qué (kilo subió, viaje más caro, etc.).
- Estadísticas: comparar proveedores por costo real por caja (con todos los gastos del viaje) en los últimos viajes.
- Cierre de cada lote al acabarse: vendido, a qué precios (normal, mayoreo, remate), fiado, merma, ganancia real vs esperada; aviso y se guarda en Estadísticas.
- Precio por día de la semana: NO; el precio solo por costo y meta.
- Aviso de compra con 2 días de anticipación ("en 2 días te quedas sin roatán") con botón para usar la plantilla de viaje.
- Aviso al capturar precio por kilo si el proveedor lo subió contra la carga anterior (siempre que suba).
- Gastos de viaje sin ticket: basta con el monto; foto opcional, opción "sin ticket".
- Costos de compra y viajes: los ven ambos administradores y el contador (solo lectura).
- Estadísticas: no contar dos veces (la recarga es el gasto en efectivo; el consumo asignado solo sirve para costo por caja y precio).
- Combustible del viaje: SIEMPRE cuenta en el costo aunque no se haya cargado. El admin lo captura a mano (obligatorio) antes de fijar el precio final del lote; mostrar como referencia lo estimado (medidor/km). Solo se cobra lo gastado, no lo cargado de más.
- Al cerrar el viaje (admin) recordar otros gastos: casetas, comida, etc.
- Gastos del viaje de carga: botón "Agregar gasto" disponible durante todo el viaje (caseta, comida, reparación, otro) para quien va; se suman al costo del viaje y de la carga.

## Para la v2.4 (ajustes al viaje)
- Chofer ve el plan del admin: "Debes llevar 360 cajas vacías" (= cajas asignadas). Si lleva otra cantidad, la escribe y avisa al admin.
- Lista para palomear antes de salir (chofer): mantas para el macho (solo si carga macho), efectivo para gastos (confirma cuánto recibió), documentos del vehículo.
- Vehículo asignado: el chofer no lo elige, solo ve "Vas en: X". Si falla, solo el admin lo cambia.
- Chofer nunca ve precios.
- Combustible pendiente: desde la burbuja y desde el viaje se puede volver a la pantalla de recarga para completarla o corregirla.
- Segunda báscula: peso inicial predeterminado = último peso cargado de la parada anterior.
- Burbuja "Viaje en curso": arriba, debajo del encabezado, sin taparlo (no fija); no debe tapar el menú ☰.
- Foto del medidor de combustible: obligatoria para el chofer al salir y al regresar; el admin la puede omitir. Aviso si el consumo pasa 20% de lo esperado.
- Resumen al proveedor en imagen: nombre y logo, pesos de báscula (vacío, cargado, neto), cajas, pago y pendiente total con ese proveedor.
- Recordatorio al chofer: la noche anterior y 1 hora antes (APK).
- Varios viajes al mismo tiempo (hoy suele ser uno): misma burbuja, se desliza a izquierda/derecha para cambiar de viaje; arriba a la izquierda dice "Viaje 1 de 2".
- Historial de viajes en Cargas: quién fue, vehículo, kilos, básculas, combustible, duración, fotos.
- Costo real de cada viaje: combustible + básculas + comida, total y cuánto le toca a cada caja.
- Básculas guardadas: nombre, cuánto cobra y ubicación (con botón Ir, para choferes nuevos); se ponen solas en cada parada.
- Básculas: son de particulares, no del proveedor. Cada proveedor tiene su báscula habitual (se liga al proveedor). Se guarda nombre, cobro, ubicación GPS/coordenadas y botón Ir.
- Macho: elegir método de pesado: "Camión completo" (tara y cargado en báscula grande) o "Por pesadas" (báscula chica: se agregan pesadas una por una, ej. 50, 52, 60 kg; lista editable con total en vivo; botón "Terminé de pesar" suma todo). Por pesadas no lleva cobro de báscula grande.
- Plantillas de viaje: "Repetir último viaje" / plantillas guardadas que llenan todo de un toque; se ajusta lo que cambie.

## Para la v2.3: nuevo flujo de VIAJE DE CARGA
- Botón redondo (+) en Cargas → "Nuevo viaje" abre pantalla completa aparte, por pasos; X arriba a la derecha cierra y queda burbuja "Viaje en curso" (paso actual, hora estimada de llegada, lo que falta por llenar).
- Pasos: 1 destino/proveedor (o agregar nuevo) · 2 vehículo (de la lista) · 3 nivel de tanque con medidor de aguja animado · 4 ¿carga combustible? (tipo, precio, litros, foto ticket obligatoria para chofer, opcional admin; si queda pendiente se ve en la burbuja) · 5 ¿qué cargarás? (roatán, macho, otra fruta de venta local) y ¿qué cargas primero? · 6 si roatán: cajas vacías que lleva · 7 fotos del vehículo al salir y al regresar (4 y 4, solo cámara).
- Roatán: cajas con + / − (predeterminado 300) y escribir en medio. Báscula: tara (con cajas vacías arriba) y peso cargado → kilos de roatán automáticos; solo el admin puede modificarlos.
- Macho: otra parada y otro proveedor, se pide hasta llegar ahí; pesada antes y después en su báscula; en kilos con + / −.
- Otra fruta: elegir de las de venta local o nueva; ¿por kilo o por caja?, cantidad y precio.
- ¿Cargas otra cosa? sí/no; predeterminado macho.
- Info: consumo y costo estimado de combustible del viaje.
- Cajas: si llevaba X vacías y regresan Y llenas + Z vacías y no cuadra, mostrar diferencia y pedir motivo.
- Precio de compra por kilo: lo pone el admin al asignar (lo corrige si cambió); el chofer NO captura precios (sí lo que pagó en efectivo).
- Asignar viaje a chofer: proveedores y orden, cajas y kilos a cargar (el chofer pone lo que realmente se cargó), vehículo, efectivo que le das (sugerido).
- Al llegar a bodega la carga se recibe sola; el admin puede corregir.
- Al recibir/finalizar (admin): tabla igual a Inicio Costo / Precio / Ganas para ese lote, con precio sugerido; al guardar pregunta "usar desde hoy" o "cuando se acabe el lote anterior".
- "Lo que pagaste": Macho 600 kg a $10.80 el kilo (mostrar precio del macho como el del roatán).
- Cada paso con cantidad: botones Atrás y Siguiente abajo para confirmar o corregir.
- Báscula particular: un cobro por parada (cubre las 2 pesadas); se pregunta al terminar la 2a pesada y se suma al costo del viaje. Cada parada: pesada vacío → cargar → pesada cargado → diferencia = kilos.
- Al terminar la pesada de cada parada se avisa al admin; el admin puede mandar al proveedor por WhatsApp (imagen y texto, un toque): kilos, precio, total, pagado y pendiente.
- Si va el chofer: NO maneja efectivo para fruta; el admin paga al proveedor aparte (registra monto y forma de pago). Al chofer se le da solo efectivo para gastos (báscula, combustible, comida) y regresa el sobrante con tickets. (Reemplaza el "efectivo para el viaje" de la v2.1.)

## Para la v2.2 (después de la v2.1 publicada)
- ARREGLO: avisos de Inicio descuadrados (choque de estilo .av con el círculo de iniciales). Renombrar el estilo del círculo.
- Costo siempre a la vista donde se fija precio: tabla Costo / Precio / Ganas por producto (caja de roatán, kilo de macho, frutas de venta local). En la tarjeta de cada carga, mostrar también el costo por kilo de macho en el encabezado.
- Al registrar una carga: cerrar el formulario y dejar la carga nueva cerrada (no expandida).
- Menú ☰ a la izquierda con: Ajustes, Historial de cambios y el cambio de rol de la demo (Admin/Chofer/Venta local/Contador). Arriba queda nombre, ayuda y ☰.
- Inicio más corto: Meta del mes pasa a Estadísticas (en Inicio, una línea con el %); cajas llenas y vacías en una sola tarjeta.

## Venta local
- Corte lo hace el vendedor; cuadra kilos vendidos por producto contra lo que salió de bodega.

## Cargas y viajes
- Va un chofer de reparto o el administrador (sin fletes). El admin sigue el mismo flujo que un chofer.
- Viaje: fotos de salida y llegada, foto del ticket de báscula, gastos en el camino (se suman a la carga), ubicación en el mapa.
- Proveedor: se procura pagar todo al cargar (crédito mínimo). Antes del viaje el admin entrega efectivo de caja (de rutas previas o guardado) a quien va, chofer o él mismo; se registra como "efectivo para el viaje".
- Al regresar: liquidación del viaje = efectivo entregado − pago al proveedor − gastos del camino = efectivo que regresa a caja. Lo no pagado queda como deuda con el proveedor y se avisa.
- Al programar el viaje, la app sugiere cuánto efectivo llevar (costo estimado de la carga + gastos de camino) y muestra cuánto hay en caja.
- Al recibir la carga: campo "cajas vacías que regresaron" (no alcanzó la fruta) → vuelven a vacías.

- Al regresar del viaje: quien fue reporta el efectivo que trae; el admin confirma lo recibido (faltante/sobrante registrado).
- Deuda con proveedor: aviso en Inicio a los X días y se suma al efectivo sugerido del siguiente viaje.

## Sueldos y vehículos
- Bonos manuales con motivo (admin).
- Vehículos: multas (admin decide en cada una si se descuenta al chofer o paga el negocio), choques/siniestros con fotos y costo y si pagó el seguro, trámites (placas, tenencia, refrendo) con costo y vencimiento, historial de reparaciones con costo y km.

## Interfaz fácil (prioridad: que la use el papá del usuario sin dificultad)
- Pantalla de inicio por rol con botones grandes de tareas ("Registrar carga", "Ver quién debe", "Fijar precio") en vez de muchas pestañas.
- Letra grande por defecto (opción "Letra más grande" en ajustes), alto contraste, botones de 56 px o más.
- Una sola acción principal por pantalla, en verde y abajo; lo secundario oculto en "Más opciones".
- Íconos siempre con texto, palabras sencillas sin términos contables ("Te deben", "Debes", "Te queda").
- Asistentes paso a paso para tareas largas (registrar carga, cierre, nueva carga), con "Paso 1 de 4".
- Confirmación clara con el resultado en palabras ("Listo: Don Beto ahora debe $3,060").
- Botón "Deshacer" unos segundos después de guardar.
- Ayuda en cada pantalla: botón "?" con explicación corta y, a futuro, voz.
- Números siempre con unidad (Cajas, KG, $) y colores consistentes: verde dinero que entra, rojo deudas o faltantes.
- Modo administrador simple vs completo.
- El papá usará el rol administrador; usa lentes y le cuesta la letra chica: letra un poco más grande que la normal (no enorme), buen contraste.
- Usa bien WhatsApp, llamadas, fotos, Facebook y manda audios: imitar patrones de WhatsApp (listas tipo chat, botón verde flotante, fotos con un toque).
- Cantidades: botones + y − grandes en todas partes, conservando poder escribir el número.
- Notificaciones aprobadas (solo lo importante): llegó un cierre, falta dinero, incidente del chofer, deuda vencida, inventario bajo. Al tocar, abre directo el detalle. Lo normal no suena. Les llegan a los dos administradores (papá y usuario).
- Sin audios ni dictado. No simplificar al máximo: solo que sea usable y claro.
- Objetivo: que el papá pueda apartarse del negocio sin abandonarlo; aún carga y maneja. Inicio debe dar un resumen de un vistazo (hoy: vendido, cobrado, efectivo, quién debe, avisos) y las notificaciones importantes deben llegarle al celular.

## Correcciones detectadas
- Proveedores (Cargas): teléfono y dirección hoy se editan con solo tocarlos. Deben mostrarse como texto fijo y tener botón "Editar" exclusivo (igual que la ficha de choferes).

## Versión para computadora (futuro)
- Misma base de código y misma base de datos que el APK; para administrador y contador (tablas, reportes, Excel). Chofer y venta local siguen en celular.
- Diseñar desde ahora pantallas que se adapten a pantalla grande.

## Escala y horario
- 40 a 100 clientes, 1 o 2 choferes al día.
- Primer chofer sale 8:00; recordatorio de fijar precio a las 7:30.

## Clientes
- Dos entregas el mismo día: permitir agregarlo otra vez a la ruta si hay espacio.
- Sin día fijo de pago; plazo general.
- Nuevos: de contado; tras 5 compras pagadas, aviso para activar crédito (admin decide).
- Cobranza escalonada (configurable): 5 días WhatsApp listo (admin envía con un toque) · 10 días aviso al chofer · 20 días bloqueo de crédito.
- Datos extra: tipo de negocio, persona que recibe.

## Maduración y fruta madura
- Método: carburo (guardar en el lote). Carburo se registra solo como gasto.
- Vida de la fruta madura: 3 días normal, 2 con calor (>30 °C), 4 con frío (<15 °C), configurable.
- Aviso en Inicio cuando la fruta madura esté por pasarse; al cargar el camión sale primero la más vieja (PEPS).
- Mínimos de inventario configurables por el administrador (sin valores fijos).

## Correcciones
- Chofer pide corrección de una entrega con motivo; admin aprueba; queda en historial.
- Chofer puede cancelar una entrega antes del cierre, con motivo y aviso al admin; regresa inventario.

## General
- Se trabaja domingo. Historial se guarda siempre.
- Fotos diarias (vehículo, entregas, tickets) se borran a los 3 meses; documentos y fachadas siempre.
- Impresora Bluetooth: dejar preparado para más adelante.
- Contraseña olvidada: el admin la cambia. Sesión del chofer se cierra al terminar el día.
- Dejar preparado para otro negocio: nombre, logo y productos configurables.
- No hacer más vistas previas hasta que el usuario diga que sí.

## Fotos de relleno (v2.5)
- Vehículos: ilustración dibujada en la app (SVG/canvas) de cada uno: NP300 2023 blanca, NP300 2025 (otro color), Freightliner M2 2015 con caja/redilas. Se ve en la ficha del vehículo, al elegir vehículo en el wizard y en la burbuja del viaje.
- Choferes (Danu, Rafa) y admins: avatar ilustrado genérico (no fotos reales de personas). Se ve en la ficha, en la lista de choferes, al asignar viaje y en la burbuja.
- En cada ficha: botón "Cambiar foto" (cámara/galería) para poner la foto real después; la ilustración queda como predeterminada.

## Tipo de combustible por vehículo (v2.5)
- Al agregar/editar vehículo: campo obligatorio "Combustible" (Magna / Premium / Diésel). NP300 2023 y 2025 = Gasolina PREMIUM (roja); Freightliner M2 = Diésel.
- Chofer NO elige el tipo: al cargar combustible se muestra fijo con recordatorio grande ("Este vehículo usa DIÉSEL") con color (Magna verde, Premium roja, Diésel negro/amarillo).
- Recordatorio también en el paso "¿Cargas combustible?" del wizard y en el gasto de combustible de reparto.
- Precio por litro sugerido = última recarga del mismo tipo/vehículo.

## Para la v2.6 — errores reproducidos en el viaje (v2.5)
- ERROR 1: "Completar combustible" abre el paso 'comb' dentro de la secuencia lineal; Siguiente → 'vacias' → vuelve a pedir toda la carga. Atrás también deja regresar a pasos de salida ya hechos.
- ERROR 2: en la última parada "Regresar a bodega" salta directo a 'reg' (entrega del vehículo). Falta la fase "De regreso" (camino, comida, casetas, combustible). También falta "En camino a la siguiente parada" entre parada 1 y 2 (a0 → m1 directo).
- ERROR 3: en pantallas completas (viaje y costo del viaje) cada render regresa el scroll arriba (el contenedor fijo con overflow pierde scrollTop). Pasa al agregar gasto en Costo del viaje y en "Agregar gasto del viaje".
- ERROR 4: lista de proveedores del viaje sale de los nombres de las cargas ("El Rolly + Proveedor…" combinado) → no se puede elegir el proveedor de roatán solo.
- ERROR 5: la burbuja calcula "llega ~" con el tiempo al proveedor aunque ya vaya de regreso.

## Propuesta v2.6
- Viaje por fases: Salida (bloqueada al salir) → Ida → Parada 1 → Camino a parada 2 → Parada 2 → Regreso → Llegada. Al salir ya no se puede volver a los pasos de salida (solo admin corrige).
- Recarga de combustible como acción disponible en cualquier momento del viaje (varias recargas: ida y regreso), igual que gastos. "Completar combustible" abre una pantalla aparte y al guardar regresa a donde ibas.
- Botones fijos durante el viaje: Agregar gasto · Cargar combustible · Reportar problema · Llamar al admin.
- Fase "De regreso": hora de llegada, mini mapa, gastos (comida, casetas, combustible) y botón "Llegué a bodega".
- Mini mapa del viaje con paradas (bodega, proveedores, básculas) y posición del vehículo.
- Admin ve la ubicación del vehículo (GPS del teléfono del chofer) en la burbuja/mapa.
- Mantener posición del scroll en pantallas completas.
- Proveedores de ejemplo: Roly (El Pital, Ver., roatán); El Lic (Coacoatzintla, Ver., macho); Juanito Banana (Tuxtepec, Oax., roatán); Pedro Mota (Tuxtepec, Oax., macho). Cada proveedor: qué vende, lugar, km y tiempo desde bodega, báscula habitual.
- Nuevo viaje: primero qué cargas, luego proveedor de CADA producto filtrado por lo que vende; luego orden.
- Plantillas: "Ruta Veracruz: Roly + El Lic", "Ruta Tuxtepec: Juanito Banana + Pedro Mota".

## Decisiones del usuario para v2.6
- Combustible: botón "Cargar combustible" disponible en cualquier momento del viaje, varias recargas (ida y regreso). El paso inicial queda como "¿cargas antes de salir?".
- Orden de carga con dos proveedores: lo elige el usuario cada vez (sin sugerencia automática).
- GPS: el admin ve la ubicación del vehículo TODO EL DÍA DE TRABAJO (desde que el chofer inicia sesión hasta que cierra el día), no solo en viajes.
- Mini mapa: dibujado en la vista previa (paradas, básculas, camión); mapa real de Google en el APK.
- Cargadores/maniobra: botón opcional "Pago a cargadores" en cada parada; entra al costo del viaje.
- Tuxtepec: ida y vuelta el mismo día (no hospedaje); solo más comida y combustible.
- Fotos en la carga: ticket de báscula y fruta ya cargada (opcionales en la demo, obligatorias en APK). Nota del proveedor: no.
- Capacidad: si cajas + macho pasan la capacidad del camión, solo avisar.

## Rutas de ejemplo (corrección del usuario)
- Proveedores de ejemplo (5): Roly (El Pital, Ver., roatán) · Josue (Nautla, Ver., macho; reemplaza a "Proveedor de plátanos machos") · El Lic (Coacoatzintla, Ver., macho) · Juanito Banana (Tuxtepec, Oax., roatán) · Pedro Mota (Tuxtepec, Oax., macho).
- Viaje normal: Freightliner, Banderilla → El Pital (Roly, roatán) → Nautla (Josue, macho) → Banderilla.
- Coacoatzintla (El Lic, solo macho): viaje independiente, normalmente en camioneta NP300 (~20 km).
- Tuxtepec: a veces juntos (Juanito + Pedro), a veces separados.
- Plantillas: "Ruta El Pital + Nautla" (Roly + Josue, camión) · "Macho con El Lic" (NP300) · "Tuxtepec: Juanito + Pedro" · "Tuxtepec: solo Juanito" · "Tuxtepec: solo Pedro".

## Para la v2.7 — básculas como paradas del viaje
- Pedido del usuario: la báscula es una parada aparte (no está en el proveedor). Ruta El Pital + Nautla:
  Banderilla → Báscula de El Pital (pesa vacío) → Roly (carga) → Báscula de El Pital (pesa cargado, paga) → Nautla → Báscula de Nautla (pesa) → Josue (carga) → Báscula de Nautla (pesa cargado, paga) → regreso → Bodega.
- Báscula se puede escoger en cada parada (predeterminada la habitual del proveedor).
- Mapa y lista de ruta muestran básculas y proveedores como puntos separados, con orden numerado.
- Objetivo: que un chofer nuevo sepa exactamente qué hacer y qué ruta seguir.
- Pantallas por parada: En camino a báscula (ETA, Ir con Maps, nota) → Báscula peso vacío (+ pago, ticket) → En camino al proveedor (dirección, llamar) → Carga (cajas, foto fruta, cargadores) → De regreso a la báscula → Báscula peso cargado (kilos automáticos, ticket, aviso admin + resumen al proveedor) → siguiente parada / De regreso a bodega.
- "Tu ruta de hoy": lista numerada de todas las paradas (básculas y proveedores) + mapa con todos los puntos.
- DECISIONES: pago de báscula UNA vez, en la PRIMERA pesada (al pesar vacío). Si dos proveedores comparten báscula: SIEMPRE 2 pesadas por proveedor (no se reutiliza). Nota "cómo llegar" + foto del lugar en cada báscula y proveedor (se escribe una vez, la ve quien vaya). Horario de cada báscula: avisar al asignar/armar el viaje si la llegada cae fuera del horario.
- Segunda parada: peso vacío prellenado con el último peso cargado (ya viene así). Pesadas (El Lic): sin paradas de báscula.
- Viaje asignado: el ADMIN marca la báscula y el proveedor de cada parada; el chofer NO los escoge (solo ve "Pesas en: X").
- Botón del chofer en la báscula: "Báscula cerrada / no está en servicio" (+ motivo/nota opcional) → aviso urgente al admin; la pantalla del chofer queda en "Espera instrucciones del administrador" (puede llamar).
- Respuestas del admin: (1) "Mandarlo a otra báscula" (elige de las guardadas; al chofer le cambia la ruta, la hora y el mapa) · (2) "Que espere": le sale "Espera, el administrador te va a dar instrucciones" hasta que el admin decida.

## Plantillas de viaje — errores reproducidos (v2.6)
- Al tocar una plantilla la pantalla NO cambia: no se marca cuál escogiste, sigue en "¿Quién va?", solo sale un aviso de 2 segundos → parece que no hizo nada.
- Después te hace pasar igual por todos los pasos (qué cargas, proveedores, orden, plan, vehículo): la plantilla no ahorra nada.
- No guarda báscula, efectivo ni chofer; las guardadas no se pueden renombrar ni borrar.
- El chofer que empieza un viaje por su cuenta no puede escoger qué/dónde carga (le pone Roly + Josue fijo) y no ve plantillas.
- Propuesta: tocar plantilla → queda marcada y salta a "Revisa el viaje" (resumen con todo y botón Cambiar en cada parte) → Asignar/Salir. Sección "Plantillas" en Cargas para ver, renombrar, editar y borrar.
- DECISIONES plantillas: al tocarla queda MARCADA (se ve cuál escogiste) y llena todo, pero SE PASA POR CADA PASO para revisar/cambiar (cada paso muestra "de la plantilla X"). Guarda: proveedores y orden, básculas de cada parada, vehículo, chofer y efectivo para gastos. NO guarda cantidades ni precio por kilo (se capturan cada viaje; el precio sigue mostrando "la vez pasada").
- Chofer NO puede empezar viajes de carga por su cuenta: en su app solo ve los asignados (quitar "Nuevo viaje de carga" del chofer).
- Con chofer en la plantilla, el paso "¿Quién va?" ya viene marcado.

## Para la v2.8 (pedido del usuario)
- Pantalla de tramo del viaje: botón "Ya llegué" justo debajo de "Ir con Google Maps" / "Llamar al proveedor" (no hasta abajo).
- Un solo mapa en cada tramo: el más relevante (lejos → mapa del viaje; en la zona de carga → acercamiento).
- Vehículos: límite de velocidad por vehículo; si el chofer lo pasa, el teléfono avisa con señal visual y sonido (APK con GPS; en demo se simula).
- Viaje de carga: inspección mecánica básica obligatoria antes de llevarse el vehículo.
- App del chofer sin ruta activa: bienvenida con su nombre, saludo según la hora (Buenos días/tardes/noches) y botón grande "Iniciar ruta"; al tocarlo aparece la información de siempre.
- DECISIONES v2.8: mapa automático según tramo (carretera → viaje completo; zona de carga → acercamiento). Exceso de velocidad: aviso visual (pantalla roja parpadeando) + sonido al chofer + historial de excesos en ficha del chofer y del vehículo (sin aviso al admin). Límites por vehículo: el usuario dirá los valores (pendiente).
- Inspección: obligatoria en cada viaje de carga (17 puntos); reparto: básica diaria (6 puntos) y los lunes completa (12 puntos). Listas aprobadas tal cual, editables en Ajustes. Si algo sale "Mal": foto + aviso al admin, el chofer espera el ok del admin o que le asigne otro vehículo.
- Bienvenida del chofer: nombre + saludo según la hora + cuántos clientes tiene hoy + vehículo asignado (con foto) + botón grande. Si tiene viaje de carga ese día, el viaje de carga tiene PRIORIDAD sobre la ruta.
- Límites de velocidad de ejemplo: NP300 2023 y NP300 2025 = 120 km/h; Freightliner M2 2015 = 105 km/h (editables).
- Con viaje de carga asignado ese día: en la bienvenida solo se puede tocar "Iniciar viaje de carga"; "Iniciar ruta" se ve pero deshabilitado (gris, con texto "primero termina tu viaje de carga") hasta que termine el viaje.

## Para la v2.9 — errores de la v2.8 (revisados en el código)
- ERROR: con un viaje de carga YA EMPEZADO, el chofer todavía puede abrir Ruta e iniciar reparto (la bienvenida se oculta cuando el viaje empezó y vuelven las pestañas). Regla: viaje de carga y ruta de reparto son EXCLUYENTES.
  - Viaje de carga en curso → Ruta/Entrega/Cierre muestran "Estás en un viaje de carga" + botón "Ir al viaje"; "Iniciar reparto" bloqueado.
  - Ruta en curso (salió y no ha mandado cierre) → "Empezar viaje de carga" bloqueado: "Termina tu ruta y manda el cierre primero".
  - Admin al asignar un viaje a un chofer que está en ruta: aviso "Danu está en ruta; podrá empezar el viaje cuando cierre".
- ERROR: en reparto salen DOS listas: la vieja "Revisión del lunes" (llantas, frenos, aceite; en la demo salía todos los días) y la nueva inspección. Quitar la vieja; queda solo la nueva: básica diaria, y los lunes la más completa (en la demo: botón "Ver la de los lunes").
- ERROR: la lista diaria trae "Nivel de combustible" y ya hay apartado exclusivo (nivel del tanque + foto del medidor). Quitarlo → diaria de 5 puntos.
- Viaje de carga: la inspección completa se queda igual (sin combustible). Duplicados con el paso "Antes de salir": mantas y documentos ya están en la inspección → "Antes de salir" queda solo con "Recibí $X para gastos".
- APROBADO: quitar mantas y documentos de "Antes de salir" (viaje de carga) → sin duplicados con la inspección.

## Auditoría completa (v2.8) — duplicados y optimizaciones encontrados (por confirmar)
D1 Tarjeta de carga: precio de venta 2 veces ("Precio de venta de este lote" tabla Costo/Precio/Ganas + "Ajustar precio de venta y meta" campos sueltos).
D2 Tarjeta de carga: costo en 4 lugares (secciones 1-4 Pagaste/Cuesta/Vendes/Ganas + "Costo real del viaje" + "Detalle de compra y pagos" + tabla de precio).
D3 "Historial de viajes" repite lo de cada carga (cada viaje ya es una carga).
D4 Pestaña Viaje del chofer: sigue el flujo viejo (v2.1) con la carga 2 "Sin teléfono / Sin dirección" + "Liquidación del viaje" vieja en la tarjeta de carga → reemplazado por el viaje nuevo.
D5 Gastos: tipo "Combustible de reparto" (ya está Recarga en la ruta del chofer) y "Gasto de una carga" (ya está en la carga y en el viaje). Texto viejo "Diesel, comida y casetas se capturan al registrar la carga".
D6 Viaje: paso de llegada tiene "Comida u otros gastos $" además del botón Gasto.
D7 Vehículos: capacidad/precio/desgaste se editan en la tarjeta y en Editar → solo en Editar (igual que proveedores).
D8 Proveedores: "Transportes Rojas" (fletes) ya no se usa.
D9 Contador: "Exportar" sale en Resumen y en su pestaña Exportar.
D10 Avisos repiten la burbuja ("Viaje a Pedro Mota hoy a las 05:30" mientras el viaje ya va en camino).
D11 "Te alcanza para X días" en Inicio + "Te alcanza la semana / Pronóstico" en Cargas + aviso de compra.
D12 Ruta del chofer: "Iniciar el día" deja al chofer escoger chofer y vehículo (debería venir asignado, como en carga).
D13 "Registrar carga nueva" a mano (Cargas y menú +) vs viaje nuevo: dejar solo como "Carga sin viaje (a mano)" dentro de Más opciones.
D14 "Administrador (yo)" aparece en Choferes con "Faltan: licencia, referencias".
S1 Avisos: agrupar por urgencia (urgentes arriba en rojo; normales; informativos se borran solos al día siguiente).
- DECISIONES auditoría: APROBADO D1+D2 (precio y costo una sola vez en la carga: tabla única + "Ver detalle"). APROBADO S1 (avisos por urgencia).
- NUEVO: plantillas de viaje minimizadas en "¿Quién va?" (ocupan mucho, se ve saturado): fila compacta "Usar una plantilla ▾" que se despliega; si ya escogiste, solo una línea "✓ Plantilla: X · Cambiar".
- Reparto (D12): el admin asigna vehículo al chofer; si NO asignó, el chofer puede escoger solo entre los DISPONIBLES (no en viaje de carga, no asignado a otro chofer). El chofer no escoge quién es.
- D3, D4, D13: no seleccionados todavía (preguntar de nuevo). D5–D11, D14: el usuario pidió explicación más clara.
- DECISIONES finales auditoría: APROBADO D7 (editar vehículo solo en "Editar"), D8 (quitar Transportes Rojas), D9 (Exportar solo en su pestaña del contador), D10 (avisos que no repitan la burbuja). NO aprobados (dejar como están): D3, D4, D5, D6, D11, D13, D14.
- ERROR visto al preparar la presentación: si el viaje se asignó sin precio por kilo, el costo del viaje calcula la caja solo con el transporte (sale $11/caja y "baja 94%"). En v2.9: si falta el precio por kilo, pedirlo en Costo del viaje antes de calcular.

## Para la v3.0 — pedido del usuario (30 oct)
- REGLA: ya no anexar zips con las previews. No hacer preview hasta que el usuario diga.
- Cargas (admin): fecha relativa en la tarjeta: "Hoy lunes", "Ayer domingo", "Antier sábado"; si es más vieja: día abreviado + mes abreviado ("jue 23 oct"); sin año si es del mismo año; con año si es de otro año (ej. en enero, las de diciembre: "lun 29 dic 2025").
- Asignar viaje, paso 3 (proveedores), macho: poner la pregunta "¿Cómo lo vas a pesar?" arriba de Camión completo / Por pesadas.
- Otra fruta (no plátano): preguntar ¿se compra por kilo o por caja?, ¿se carga suelta (kg) o en cajas como el roatán?, ¿se pesa en báscula (camión completo) o por pesadas?
- ACLARACIÓN: el macho va SUELTO (no en cajas, no cuenta como caja). Roatán: ideal 20 kg de fruta por caja para venta (sin contar los 2 kg de la tara). Quitar el "~22 kg" de la estimación (vwSugTxt) → usar 20 kg o el promedio real de kg/caja de las cargas. El valor real varía según kilos cargados ÷ cajas llenas de cada viaje.
- Paso 5 (plan): bajo "La vez pasada" mostrar la diferencia por kilo: en ROJO si ahora es más caro, en VERDE si más barato.
- Chofer, "Llegaste a la bodega" (viaje y ruta): pop-up que tapa la pantalla recordando registrar gastos, botones "Sí, ya registré todo" (deja terminar) y "Agregar gasto".
- Odómetro de llegada: se prellena con salida + km recorridos estimados (ruta/viaje o GPS); editable; recordar al chofer verificar y poner el número real. Foto del odómetro (salida y llegada) en viaje y ruta.
- Estética: "Cajas" y "Kg" más grandes junto a los números grandes (chofer: carga a bordo; admin: Bodega, Inicio y todo lugar donde salgan en grande).
- Imágenes de vehículos más realistas: NP300 blancas con caja de redilas que diga "NIETOS"; Freightliner blanco "rabón" (un eje trasero) con caja seca que diga "NIETOS". Mapas más realistas (no exactos).
- Costo del viaje (pantalla de cierre del admin): poder poner ahí el precio de compra si faltó y el precio de venta (tabla costo/precio/ganas/margen); agregar pagos al proveedor POR PROVEEDOR: costo de su fruta, pagaste, debes de este viaje, deuda pasada, total que le debes; tocar la deuda pasada → detalle de deudas anteriores.
- Carga ya registrada: botón "Modificar datos y costos" que vuelve a mostrar costos de operación, costo puesto en bodega, etc.
- DECISIONES v3.0: odómetro de llegada prellenado = salida + km previstos (demo; GPS en APK), editable con aviso de verificar. Foto del odómetro al salir y al llegar (viaje y ruta; opcional demo, obligatoria APK). Pop-up de llegada con la lista de gastos ya registrados + "Sí, ya registré todo" / "Agregar gasto". Vehículos y mapas: dibujos más realistas (no hay generación de imágenes IA ni internet en la preview; fotos reales después con "Cambiar foto"; mapa real en APK).
- Pagos en costo del viaje: botón "Registrar pago" por proveedor (monto + efectivo/transferencia); el admin ESCOGE cada vez a qué deuda abona (este viaje o deudas anteriores).
- "Modificar datos y costos" de una carga registrada: kilos, cajas y precio por kilo; gastos del viaje y combustible; pagos al proveedor; precio de venta y meta. Todo cambio queda en el historial (quién, cuándo, antes → después); lo ve el contador.
- Otra fruta por caja: usa NUESTRAS taras (se descuentan de vacías y regresan llenas).
- "La vez pasada": diferencia por kilo en rojo/verde + impacto en el total de la carga ("+$0.30 el kilo ≈ +$2,160 en esta carga").
- Unidades: "CAJAS"/"KG" casi del tamaño del número, en negrita.
- Fecha: con año solo si es de otro año.
- Estado de cuenta por proveedor en Proveedores (cargas, pagos, saldo; Registrar pago; compartir por WhatsApp).
- Aviso al recibir roatán si los kg reales por caja bajan de 19 kg (ideal 20); queda en la comparación de proveedores.
- Cajas vacías que sobran al regresar: preguntar si regresaron a bodega o se quedaron con el proveedor; si se quedaron, anotarlas a nombre del proveedor y en el siguiente viaje con ese proveedor recordar al admin ("Roly tiene 20 cajas tuyas: ¿llevar solo 280 en vez de 300?"); el admin decide.
- Validar odómetro de llegada (menor al de salida o ±30% de lo previsto, pedir motivo) SOLO en rutas de reparto, no en viajes de carga.
- "Modificar datos y costos": lo pueden usar los dos administradores; el contador solo ve el historial.
- Fecha relativa en TODA la app (historial de viajes, pagos, gastos, cobranza, cierres, cargas).
- Si cambia el costo de compra de un lote ya vendido en parte: las ventas no cambian de precio, pero la ganancia del lote se recalcula con el costo nuevo.

## SOLO PARA EL APK (no mostrar en la preview): usuarios e inicio de sesión
- Una sola app para todos; el usuario inicia sesión y su rol decide qué ve (admin, chofer, venta local, contador). El admin ve y hace todo, como en la preview, con acceso a todos los usuarios.
- Menú lateral del admin: "Crear usuario" → escoge rol (chofer, otro admin, contador, venta local).
- Entrar: usuario + contraseña la primera vez; después huella o PIN de 4 números.
- Contraseña olvidada de un admin: el otro admin se la cambia; si los dos la olvidan, código por SMS o correo. (Choferes/venta/contador: la cambia un admin.)
- Baja de chofer: se desactiva (ya no puede entrar), su historial se guarda y sus clientes se reasignan automáticamente al chofer o choferes que quedan.
- Sesión: chofer y venta local se cierra al cerrar el día (pueden volver a entrar); admin y contador no se cierra, pero si la app del admin se quita de la multitarea, al abrirla pide huella o PIN (lo que el teléfono tenga).
- Usuario: nombre de usuario (ej. "danu"). Solo el dueño puede crear o desactivar administradores.
- Reasignar clientes de un chofer dado de baja: la app sugiere por ZONA y viabilidad de la ruta (no por cantidad pareja); el admin confirma y puede mover clientes. Una ruta compacta (clientes cada 2 km, 30 clientes) aguanta más que una ruta de clientes lejanos; no sobrecargar rutas largas.
- "¿Cabe en la ruta?": lo que más pesa = horas de trabajo del chofer + horarios de los clientes. La ruta termina en promedio a las 8:00 pm (varía por día), salvo acuerdo con un cliente. Si no cabe: sugerir otro día de visita (el de menos carga en esa zona). Esta lógica se usa en todo: baja de chofer, clientes nuevos y pedidos de un día.
- El administrador también sale a reparto: tiene su propia lista de clientes (por día o por pedido). Si lleva poca carga puede tomar visitas de otras rutas para hacerlas él; al chofer le llega aviso cuando se le quita o agrega una parada.
- DECISIONES (en la v3.0): tomar visitas → la app sugiere las que le quedan de paso y alivian la ruta más cargada, y además el admin puede escoger libremente de la lista del día. Se pueden quitar paradas a un chofer ya en ruta si todavía no visita a ese cliente (aviso inmediato y ruta reacomodada). Admin en reparto: inspección, fotos y odómetro OPCIONALES (él puede omitirlos); el cierre del día con efectivo y los gastos SÍ son obligatorios para que cuadren las cuentas.
- REVISIÓN DE COHERENCIA (v3.0): la regla ruta/viaje excluyentes aplica también al admin; cada admin (dueño y papá) puede tener su propia ruta de reparto. Inspección completa del viaje de carga también es OPCIONAL para el admin. El admin ve su ruta con un botón "Mi ruta de hoy" en Inicio (abre la pantalla del chofer; si no tiene ruta, no aparece). Si se le quitan visitas a un chofer con comisión: solo se le avisa (gana por lo que él entrega).
- Ajustes aprobados: kg por caja <19 = aviso "vino baja", >22 = "revisa la captura del peso" (reemplaza 18–24). Si un vehículo ya pasó la inspección completa de carga ese día, se salta la diaria. Las cajas de otra fruta por caja cuentan en las cajas vacías que se llevan y en la diferencia al regresar.
- Una sola inspección por vehículo al día (sin importar quién la hizo ni si fue de carga o diaria). Si otro chofer usa ese vehículo después el mismo día: en lugar de la inspección sale una pregunta rápida "¿Notas algo raro en el vehículo?" → "Todo bien" / "Reportar algo" (qué tiene + foto) → aviso al admin, que decide igual que en una falla de inspección (puede salir así u otro vehículo). Ve quién hizo la inspección de hoy y a qué hora.
- CAMBIO flujo de falla en inspección (reemplaza "espera el ok del admin"): si algo sale "Mal", la app pregunta al chofer "¿Puedes salir así?".
  - Sí → sigue normal; aviso NORMAL al admin con la falla y la foto.
  - No → no lo deja continuar; aviso URGENTE al admin. El admin puede "Liberar el vehículo" (el chofer sigue) o "No sale".
  - "No sale" → el vehículo queda FUERA DE SERVICIO: aviso en Inicio con todo el texto en rojo "El vehículo X no está funcionando y requiere reparación" hasta que se repare; no se puede asignar a rutas ni viajes; en Vehículos sale "Fuera de servicio"; desde el mismo aviso el admin le da otro vehículo disponible al chofer; botón "Ya se reparó" pide el costo y lo registra en Taller (Reparación) del vehículo.
- "Ya se reparó" pide: qué se reparó (prellenado con la falla reportada, editable), costo y kilometraje (prellenado con el odómetro actual del vehículo, editable); queda en Taller del vehículo.
- Mantenimiento en cada vehículo (botones, aunque sea antes de tiempo; cada uno pide km y costo, reinicia su contador y queda en el historial):
  - Cambio de aceite (filtro de aceite sí/no).
  - Afinación mayor con lista palomeable: gasolina = bujías, filtro de aire, filtro de gasolina, filtro y aceite, limpieza de inyectores, cuerpo de aceleración, banda; diésel = filtro de aire, filtros de diésel, filtro y aceite, separador de agua, banda, revisión de inyectores.
  - Frenos: balatas delanteras, balatas traseras, discos/tambores (rectificados o cambiados), líquido de frenos; Freightliner: ajuste de frenos de aire.
  - Llantas (cambio o rotación), Batería, Suspensión y alineación.
  - Listas editables en Ajustes.
- Historial de fallas/reparaciones: resumen en la ficha del vehículo ("Llantas 4 veces · Frenos 2 · Luces 1" y gasto por cosa) y comparación entre vehículos en Estadísticas.
- Categorías de fallas/reparaciones: Motor · Tren motriz (transmisión, clutch, diferencial, flecha) · Frenos · Suspensión y dirección · Llantas · Eléctrico (batería, luces, alternador, marcha) · Enfriamiento (radiador, mangueras) · Combustible · Carrocería y caja (redilas, caja seca, puertas) · Otro. La app sugiere la categoría (por el punto de la inspección o el tipo de servicio) y el admin confirma. Resumen y estadísticas por categoría.
- Estadísticas generales: gastos de reparaciones y servicios de vehículos, restados de la ganancia real. Para el PRECIO de la caja se sigue usando el desgaste por km (promedio); en la GANANCIA real se restan reparaciones/servicios pagados y NO el desgaste (no contar doble).
- FONDO DE MANTENIMIENTO (solo cuenta para ver, el dinero sigue en caja), por vehículo y total, por mes y año: junta km recorridos (carga y reparto) × desgaste por km; se le restan reparaciones, servicios y fallas pagadas; muestra si faltó (rojo) o sobró (verde). Si no alcanza, sugiere el nuevo valor por km según los últimos 6 meses de ese vehículo y el admin decide. En cajas/kilos vendidos: "De cada caja vendida, $X se fueron al fondo de mantenimiento".
- SUGERENCIAS (reglas, sin IA) en el MENÚ LATERAL, no en Inicio: compras y proveedores; clientes y ventas; rutas y choferes; vehículos, merma y gastos. IA de verdad (resumen semanal / preguntar a la app) a futuro en el APK.
- VEHÍCULO A CRÉDITO (sección "Crédito" en la ficha): con quién, precio, enganche, monto financiado, mensualidad, día de pago, plazo en meses, primer pago, tasa opcional. Muestra pagos hechos/faltan ("18 de 48"), saldo, fecha en que se termina, barra de avance; aviso días antes de cada mensualidad y rojo si se pasó. La mensualidad sale de caja como gasto fijo (se marca pagada con comprobante). NO entra al costo de la caja: sale de la ganancia (en Estadísticas como "Crédito de vehículos"). Pagos extra a capital: bajan el saldo y recalculan la fecha de término. Al terminar: aviso "Ya es tuyo" y deja de salir. Lo ven los dos admins y el contador (solo consulta). Ejemplo en la preview: NP300 2025 a crédito (datos inventados).
- Sugerencias de flota (reglas editables en Ajustes): VENDER/CAMBIAR si en 12 meses las reparaciones pasan ~30% del valor, el fondo queda corto varios meses, muchos días fuera de servicio o se usa poco. COMPRAR otro si las rutas terminan después de las 8 pm seguido o hay clientes que no caben, si los viajes no caben en el camión o si un vehículo fuera de servicio no se puede cubrir. Dato nuevo en la ficha: valor aproximado del vehículo (lo pone y actualiza el admin).
- QUEJAS SOBRE el chofer: las registran los admins con tipo (llegó tarde, trato al cliente, faltante de dinero o fruta, maltrato a la fruta o al vehículo, otro), nota, fecha y cliente. Que el chofer las vea (sin saber quién se quejó) es una opción para activar/desactivar en Ajustes.
- QUEJAS/REPORTES DEL chofer: botón en su menú con tipo (vehículo, ruta, cliente, sugerencia, otro) + nota/foto; le llegan al admin, no necesitan respuesta (solo se guardan; el admin puede marcarlas como vistas).
- Las quejas: resumen en la ficha del chofer ("3 quejas este mes: 2 llegó tarde"), entran en las sugerencias, y al dar bonos se recuerdan.
- Ficha del vehículo, dos apartados nuevos: "Equipo de trabajo" (carrocería, redilas, caja seca; de agencia viene solo el chasis) → SUMA al valor del vehículo; "Accesorios" (rines, estéreo, luces, tumbaburros, polarizado, etc.) → gasto que NO se recupera (sale en rojo). Inversión total = vehículo + equipo + accesorios. No se restan de la ganancia del mes: van aparte en Estadísticas como "Inversión en vehículos". Entran en las sugerencias de vender/cambiar (comparación reparaciones vs valor, total invertido).
- Equipo de trabajo a crédito / en abonos (sin pagos fijos, se fabrica a la medida): costo total, abonos libres, saldo; estados Encargada → En fabricación → Lista → Montada; aviso cuando está lista y aún se debe. Se muestra junto al crédito del vehículo (total, pagado, pendiente).
- La CARROCERÍA tiene su propia ficha (costo, abonos, estado, en qué vehículo está montada). Se puede pasar de un vehículo a otro (ej. vender la NP300 2023, quedarse con su carrocería y montarla en una 2027); desmontar/montar se registra como gasto de equipo. Las sugerencias de vender/comprar la consideran (comparar reusar la carrocería + montaje contra hacer una nueva; al vender, el valor del vehículo sin carrocería si te la quedas).
- Carrocería/equipo liquidado y montado: ya no se muestra en la ficha (no saturar); reaparece en el simulador de venta/compra.
- SIMULADOR "¿Vender / comprar vehículo?": venta del actual (ej. NP300 2023 $300,000), costo final del nuevo salida de agencia (ej. 2027 $525,000), ¿se puede usar la carrocería del actual? sí → costo de instalación; no → costo de hacer una nueva ya montada (se suma al nuevo). Con todas las variables (crédito opcional, seguro y trámites al año, mantenimiento esperado, rendimiento de combustible, km al mes, sueldos) → inversión neta, diferencia de gastos al mes, en cuánto tiempo se paga y desde cuándo genera ganancia real; comparar seguir con el actual vs cambiar.
- Recuperación por vehículo: costo total (vehículo + equipo + accesorios) vs lo que genera al mes (viajes + ruta) → tiempo de recuperación (ej. $500,000 / $20,000 al mes ≈ 25 meses; "ya se pagó" o "faltan X meses").
- CAPACIDADES por vehículo y uso (reemplazan capC y la regla de 25 kg ≈ 1 caja): NP300 viaje de carga: 160 cajas de roatán, o 2,000 kg si solo macho; NP300 en ruta: 50 cajas + 600 kg de macho. Freightliner M2: 600 cajas de roatán, o 10,000 kg si solo macho; NO sale a ruta (solo carga). Carga mixta: proporción (cajas/cap.cajas + kg/cap.kg ≤ 1).
- Sugerencias de flota comparando escenarios con todos los costos (seguro, mantenimiento, combustible, casetas, básculas, desgaste, sueldos/comisiones de chofer de carga, número de viajes): ej. "2 viajes de NP300 reemplazan al camión" → si conviene conservar el camión o vender; igual para ruta: sugerir comprar otra NP300, un camión más grande u otro similar.
- Vehículo de CARGA (Freightliner): lo que "genera" = lo que ahorra contra la alternativa REAL del usuario, que es hacerlo con las NP300 (no flete): para igualar 1 viaje del camión se harían mínimo 3 viajes de NP300 (2 de roatán + 1 de macho). Ahorro por viaje = costo de esos 3 viajes de NP300 (combustible, casetas, básculas, 3 sueldos/comisiones, desgaste, comida) − costo del viaje del camión (incluyendo seguro y trámites prorrateados). Con eso: recuperación del camión y sugerencias (conservar/vender). Costo por caja traída por vehículo también se muestra (automático). No se usa precio de flete.
- Vehículo de REPARTO: genera = ganancia de lo que entregó − sus gastos (combustible, desgaste, seguro, sueldo).
- Gastos anuales en la ficha (para simulación y costo por caja): seguro, tenencia/refrendo y verificación, placas y otros trámites.
- Simulador: botón "Simular venta o compra" en Vehículos y en Sugerencias (las sugerencias lo abren ya lleno).
- Simulador — formas de pago combinables: venta del vehículo actual + ahorros + crédito bancario (enganche, tasa, plazo) + PRÉSTAMO INFORMAL (familia, proveedor; sin interés ni plazo fijo, entre menos tiempo mejor). Préstamo: escenarios con varios abonos de ejemplo (ej. $10,000/mes → 20 meses; $20,000/mes → 10 meses) y con lo que deja libre el vehículo cada mes. Considera también valor de reventa del nuevo en 3–5 años y ahorro en reparaciones del vehículo viejo. (Agencia a cuenta: NO.)
- Si se hace la compra: el préstamo queda registrado como deuda con abonos libres (a quién, total, abonos, saldo; aviso suave si pasan meses sin abonar).
- NP300 uso mixto: sus viajes de carga (ej. El Lic) cuentan como AHORRO contra hacerlos con el camión (mover el Freightliner por poca carga cuesta más); se suma a la ganancia de sus rutas.
- Simular vender una NP300 sin reponerla: revisar con la regla "¿cabe en la ruta?" si las otras rutas absorben sus clientes; mostrar cuántos no caben y la venta que se perdería.
- Para ruta solo Nissan (la ciudad es estrecha): no comparar con vehículos más grandes para reparto; el simulador compara solo NP300 para ruta.
- "Equipo de trabajo" incluye CÁMARAS (además de carrocería, redilas, caja seca).
- RESULTADO DEL SIMULADOR (lo que debe decir claro):
  1) Total neto a pagar para pasar de un vehículo a otro = precio del nuevo + carrocería (nueva o instalación de la tuya) + equipo/accesorios + intereses del crédito (si hay) − lo que te dan por el actual. Si el resultado es negativo: "te sobran $X" (diferencia positiva).
  2) Cómo se paga: contado / ahorros / crédito (mensualidad y plazo) / préstamo (escenarios de abonos) → cuánto pagas al mes y en cuánto tiempo terminas.
  3) Diferencia mes a mes contra quedarte con el actual (combustible, reparaciones del viejo que te ahorras, seguro y trámites, capacidad).
  4) En cuánto tiempo se paga solo y desde cuándo genera ganancia real.
  5) Valor de reventa en 3–5 años.
  6) Veredicto en palabras: "Sí conviene" (verde) / "Conviene con cuidado" (amarillo, ej. se paga en más de 3 años o deja la caja justa) / "No conviene por ahora" (rojo), con la razón principal.
- Veredicto (editable en Ajustes): se paga en 2 años o menos = "Sí conviene" (verde); 2 a 3 años = "Conviene con cuidado" (amarillo); más de 3 años o te deja sin efectivo para operar = "No conviene por ahora" (rojo).
- Mensualidad (crédito) contra lo que queda libre al mes según el historial de ventas de los últimos 12 meses (incluye meses flojos): hasta 20% = "Holgada" (verde); 20–35% = "Justa" (amarillo); más de 35% = "Arriesgada" (rojo). Si en el peor mes del año no alcanza: "En temporada baja no te alcanzaría". Muestra el mes promedio y el peor mes. Editable en Ajustes. Entra en el veredicto.

## v3.0 PUBLICADA (30 oct)
Partes 1-3 completas. Pendiente para APK: login/usuarios, mapa real, IA. Admin en ruta usa vehículo libre o el asignado a otro (avisa). Pruebas: v30/t1-t3.js.

## Para la v3.1 — pedido del usuario (30 oct, después de ver la v3.0)
1. Cierre de ruta: el desglose de "Efectivo a entregar" no muestra los gastos descontados (el total sí los descuenta).
2. Tomar visitas de otra ruta: no hay forma de regresarla o deshacer.
3. Cierre: NO pedir motivo por km distinto. El km esperado solo prellena el odómetro; solo recordar que verifique contra el tablero y lo corrija.
4. Sugerencias: deslizar a cualquier lado para quitarlas; las que tienen apartado son interactivas (sugieren acción o llevan a su pantalla); si se hizo la acción desaparecen solas.
5. Estadísticas: al cambiar de sección se vuelve a abrir "Meta del mes" aunque se haya minimizado.
6. Vehículos: tarjeta básica (foto, modelo, marca, placa); al tocar se abre todo; abrir otra cierra la anterior; al salir y volver todas cerradas. Copiar en otros apartados con mucha info.
7. "Te cuesta": aclarar que es el precio puesto en bodega.
8. Capturar costo del viaje: desaparece el costo por kilo (debe seguir); agregar botón de confirmar. Registrar pago a proveedor: el monto desaparece y no se refleja en total ni desglose. Liquidar: sin confirmación y sin decir si liquida el viaje o todo lo pendiente.
9. Viaje de carga: hora de llegada con el proveedor; el chofer ve si va tarde o a tiempo; el admin en la burbuja ve "A tiempo / Posible retraso / Retrasado"; si retrasado, botón para recordarle al chofer. APK: evento en calendario y alarma.
10. Si se carga macho: recordar llevar mantas.
11. Viaje: los 4 iconos fijos de abajo con color (y animados si se puede).
12. Cantidades con separador de miles al escribir (10,000 kg, $10,000).
13. Simulador: cascada automática en "¿Cómo lo pagas?" (precio − venta − ahorros = resto que se autollena en préstamo; si hay personal y banco, lo que pongas en uno se descuenta del otro).
14. Plan del viaje: efectivo para gastos, hora de salida y capacidad no están en recuadros como lo demás; se pierden.
15. Capturar costo del viaje: más intuitivo, por pasos como al crear un viaje.
16. Toda la app es brusca: botones de confirmar/cancelar donde se necesiten.
Sin preview todavía: el usuario sigue analizando.
DECISIONES v3.1:
- Visitas tomadas: Deshacer al momento + botón Devolver mientras no se visite (aviso al chofer).
- Simulador: lo que falta cae primero en crédito bancario; lo que se escribe en préstamo personal se le resta al banco.
- Confirmar/cancelar: en dinero y cosas que no se deshacen (pagos, liquidar, cierre, borrar, baja, cancelar viaje, fuera de servicio). Lo demás con aviso "Deshacer".
- Tarjetas que se abren una a la vez: Vehículos, Clientes, Cargas, Proveedores, Choferes, Avisos y Estadísticas (un bloque abierto a la vez). Al salir y volver, todas cerradas.
- Retraso con proveedor: posible retraso a 15 min, retrasado a 30 min.
- Cantidades con comas mientras se escribe.
- Sugerencia quitada vuelve en 7 días si sigue pasando.
- Costo del viaje en 6 pasos (km, combustible, otros gastos, te cuesta puesto en bodega, precio de venta, pago al proveedor) + confirmar. Al final pantalla grande con costo y precio de venta, con botones + y − para la caja y el kilo de macho; y otra pantalla para precio de mayoreo.
- Aprobadas mis sugerencias: mantas en "Antes de salir" (palomear) si lleva macho; Liquidar pregunta "solo este viaje ($X) o todo lo que le debes ($Y)" y el pago se queda visible y baja el total al momento; plan del viaje con recuadros grandes +/− para efectivo, hora de salida y hora de llegada con proveedor, capacidad como barra verde/amarillo/rojo; iconos de abajo del viaje con color (combustible naranja, gasto azul, problema rojo, cerrar gris) y pulso en combustible si hay recarga pendiente; recordatorio de retraso con mensaje ya escrito ("Vas con retraso a Roly, avísale que llegas ~10:40"); desglose del cierre con cada renglón y su signo (ventas, − crédito, + abonos, − gastos de ruta, − combustible = entrega).
- Botones +/− del precio de venta: $5 la caja y $0.50 el kilo.
- Mayoreo: precio de mayoreo a partir de más de 10 cajas, o el admin marca clientes que siempre reciben precio de mayoreo sin importar la cantidad.
- Menú lateral: Ajustes (y los demás bloques del menú) salen minimizados al abrir el menú.
- Sueldos: una tarjeta por empleado con su foto chica (nombre y total a pagar); al tocarla se abre su desglose: base, comisión, viajes, bonos, descuentos (adelantos, faltantes) y total a pagarle. Una abierta a la vez, como Vehículos.
- Gastos fijos: quitar uno pide confirmar ('¿Seguro que quitas X?'). Cada gasto fijo con su frecuencia: semanal (qué día), quincenal, mensual (qué día del mes), bimestral, anual (qué fecha). (Propuesta: aviso un día antes y botón 'Ya lo pagué' en cada periodo.)
- Gastos fijos: aprobado aviso un día antes y botón "Ya lo pagué" por periodo (si no se marca, al día siguiente sale pendiente).

## Para la APK (no en preview)
- Pantallas grandes (plegables y tabletas): aprovechar el ancho y alto mostrando más contenido (2 o 3 columnas: lista + detalle, mapa al lado, etc.), no solo agrandar todo.
- Inicio admin: la tarjeta de fijar/confirmar el precio de hoy siempre hasta arriba (antes que avisos y todo lo demás).
- Iconos fijos de abajo del administrador: con color, animados y fáciles de recordar (propuesta: Inicio verde casa, Bodega amarillo plátano, Cargas naranja camión, Clientes azul personas, Gastos rojo billete, Más morado; animación corta al tocar: rebote; y el de Inicio con punto rojo que late si hay avisos urgentes).
- Aprobados colores de iconos del admin. Burbuja tipo Uber del viaje con animaciones: camioncito que avanza sobre una barra de progreso del viaje, punto que late en vivo, color según estado (verde a tiempo, amarillo posible retraso, rojo retrasado que parpadea suave), entra deslizándose y se puede minimizar a un círculo con el camión; cambio de paso con transición suave.
- Al abrir la app por primera vez en el día: ventana encima de todo con los avisos más urgentes, cada uno con sus botones de acción según el aviso (ej. mensualidad: Pagar/Recordar mañana; vehículo fuera de servicio: Ya se reparó/Asignar otro; deuda proveedor: Registrar pago/Estado de cuenta; falta costo del viaje: Capturar; inspección con falla: Liberar/No sale). PENDIENTE confirmar: uno por uno o lista; quién la ve.
  -> DECIDIDO: uno por uno ('1 de 3', botón 'Después' pasa al siguiente y lo deja en avisos normales). La ven administradores y contador (contador solo con botones de ver, sin acciones de dinero). Choferes no.
- Animaciones sutiles en toda la app: tarjetas que se abren/cierran deslizando, pantallas que entran con desvanecido corto, botones que se hunden al tocar, números que suben al cambiar (contador), palomitas que se dibujan, avisos que entran deslizando y se van al deslizar. Cortas (~200 ms) y respetando "reducir movimiento" del teléfono.
- Bienvenida del chofer: hasta abajo botón "¿No eres Danu?" (último usuario de ese dispositivo). En la preview: lista de choferes para cambiar (reemplaza los chips de demo del menú para el rol chofer). En el APK: va al inicio de sesión (usuario y contraseña, luego huella/PIN). Si el usuario actual tiene ruta o viaje en curso: confirmar "Danu tiene su ruta en curso; se queda guardada y la sigue cuando vuelva a entrar". Cada chofer conserva su ruta, inspección del día, viaje y cierre (mismo mecanismo que "Mi ruta de hoy" del admin).
- NUEVO apartado "Bienes de la empresa" (en Más), en tarjetas (una abierta a la vez, foto chica):
  - Tipos: teléfonos y tabletas (modelo, IMEI/serie, número, compañía, plan o prepago, monto y día de pago/recarga), básculas propias (marca, capacidad, última calibración), equipo de bodega (diablitos, montacargas, tarimas, mantas, cuarto de maduración, extintores con vencimiento), computadoras y cobro (computadora, impresora de tickets, terminal de tarjeta).
  - Comunes: foto, fecha de compra, costo, estado (bien/en reparación/perdido/baja), dónde está o a quién se le dio, notas, historial.
  - Plan/recarga del teléfono se vuelve gasto fijo automático (con aviso un día antes y "Ya lo pagué").
  - Asignado a empleado: sale en su ficha ("Tiene: ...") con firma de recibido; al dar de baja al empleado, la app recuerda pedirlos de vuelta.
  - Valor cuenta como inversión aparte (junto a vehículos, sin tocar la ganancia del día); reparaciones sí restan.
  - Propuesta: avisos de vencimientos (extintor, calibración de báscula, plan del teléfono); mantas ligadas al recordatorio del viaje con macho.
- Estadísticas: tarjeta 'Valor de los bienes' = vehículos (valor + equipo de trabajo) + bienes de la empresa + todas las cajas (bodega, con clientes, con proveedores) × precio por caja vacía (se escribe en Ajustes, ej. $45). Sin fruta, efectivo ni deudas. Desglose por tipo.
- Gastos: tarjeta 'Lo que va a salir' con chips Semana/Quincena/Mes. Suma: gastos fijos que caen en el periodo, sueldos estimados, mensualidades de crédito, planes de teléfono, seguros/tenencia/trámites que caen, y mantenimiento que toca por km o fecha (costo de la última vez). NO deudas de proveedores ni compras de fruta. Comparado con semáforo contra efectivo en caja + cobros esperados del periodo + venta normal (verde alcanza, amarillo justo, rojo no). Desglose por día/fecha. Solo en Gastos.
- Pestaña Gastos rediseñada:
  - Arriba: totales Hoy · Semana · Mes (números animados) y la tarjeta "Lo que va a salir" con semáforo.
  - Registrar: cuadros con ícono de color (Combustible, Caseta, Comida/viáticos, Carburo, Ponchadura o falla, Bodega (luz, agua, renta), Otro) → ventana que sube con monto grande con comas, botones rápidos $50/$100/$200/$500, concepto, foto del ticket (opcional), con qué se pagó (efectivo de caja / transferencia / tarjeta; solo efectivo baja la caja), ¿es de un viaje de carga o de un vehículo? (opcional, tarjetas para escoger) → Guardar + aviso "Deshacer".
  - Lista de gastos agrupada por día (Hoy, Ayer, Antier…), ícono de color por tipo, filtros por tipo/vehículo/quién; tocar para editar; deslizar para borrar con confirmación.
  - Gastos de choferes (ruta y viaje) se ven con nombre y foto del ticket; el admin puede marcar "Revisar" y le llega aviso al chofer. No se aprueban.
  - Sin gráfica en Gastos (ya está en Estadísticas).
  - Secciones Gastos / Sueldos (tarjetas por empleado) / Fijos (tarjetas con frecuencia, próxima fecha, "Ya lo pagué", quitar con confirmación).

## v3.1 PUBLICADA (30 oct)
Todo lo de la lista v3.1. Arreglado: pago a proveedor se borraba porque los dos proveedores compartían el mismo formulario; los números con comas se borraban al redibujar. Pruebas: v31/t1.js y r1-r3.

## Para la v3.2 — pedido del usuario (31 oct, después de ver la v3.1)
1. Proveedor (desde sugerencias): su tarjeta muestra precios de roatán y macho aunque solo venda uno. Mostrar solo el historial de la fruta que vende; poder editar que vende las dos.
2. Pago al proveedor: funciona pero la interfaz (monto, efectivo/transferencia, este viaje o deuda pasada) es confusa. Mejorarla.
3. Carga: "Precio por kilo" debe decir "Precio al que lo compraste".
4. Precio intermedio: decir por cuántos días (ej. vendes ~60 cajas al día, quedan 80 del lote anterior → precio intermedio 1-3 días) y luego ajustar.
5. Cargas: junto al proveedor, en negritas y grande, qué fruta es (Roatán, Macho, otra o ambas).
6. Tarjetas: animación al cerrar una y abrir otra; colores/fondo para distinguir la abierta (blanco sobre blanco no se nota).
7. Cliente cerrado: mostrar si tiene precio de mayoreo.
8. Simulador: si compra, preguntar si venderá alguno y con eso paga parte o todo; si vende, preguntar si comprará otro (si sí, llenar todo; si no, cerrar y recordatorio hasta que se venda; el dinero pasa al fondo solo cuando confirme la venta). Simulador por pasos como el viaje de carga.
9. Inicio: efectivo en caja negativo en rojo con "!". Si un pago supera el efectivo: avisar y preguntar de dónde sale el resto (de quién, a crédito, plazo, interés, en pagos o en una fecha).
10. Modo noche en toda la app.
11. Ajustes: datos del negocio (nombre, RFC, teléfono, dirección, etc.).
12. Calendario de verificación de Veracruz por terminación de placa; avisar en la tarjeta del vehículo, sugerencias y avisos ("a la Nissan le toca en febrero").
13. DEF del camión: nivel con 4 cuadritos verdes bajo el medidor de diésel. El usuario mandará imagen para proponer interfaz.
14. Vehículo: al cerrar la tarjeta, sus secciones internas también se cierran.
15. Gastos "fecha por fecha": tocar un gasto → marcar pagado / ver detalle / ir a él.
16. Sueldos: extra por viaje de carga sin importar forma de pago; botón "Agregar extra" con concepto y cantidad.
17. Indicador de que se puede deslizar hacia arriba para ver más.
18. Medidores: fotos reales del medidor de gasolina NP300 y diésel del camión (las mandará). Aguja encima que se mueve según el nivel; también arrastrar la aguja para escoger el nivel.
19. Ruta: si nadie pidió cantidad, no mostrar cuántas cajas/kilos cargar. Si llega un pedido con cantidad durante la ruta (o lo agrega el admin), recordar arriba "Reserva X cajas para Y"; si no alcanza, sugerir regresar a bodega. El chofer siempre captura cuánto cargó.
20. Aprendizaje con el historial: sugerir cuánto cargar por cliente y día (ej. La Güera los lunes ~3 cajas y 100 kg) más un extra de 5-10; en general la app aprende de todo.
21. Entrega: el aviso del cliente arriba (pide cajas vacías, deuda) se queda flotando ~3 s al bajar la pantalla y luego se queda arriba.
22. Ruta, cargar más mercancía: roatán no tiene botones + y −; en macho al tocar +/− parpadea toda el área.
23. Ticket/foto para el cliente: falta precio, subtotal y desglose (ej. Roatán 10 cajas × $200 = $2,000).
Sin HTML todavía.
DECISIONES v3.2:
- Pago al proveedor en 3 pasos: ¿Qué pagas? (este viaje / deuda vieja / todo / otra cantidad, tarjetas grandes) → ¿Cómo? (Efectivo/Transferencia) → Confirmar con resumen.
- Precio intermedio: al terminar los días sugeridos, aviso "¿pasas a $X?" con confirmar.
- Pago mayor que la caja: avisar y preguntar de dónde sale el resto: dinero personal del dueño (se registra como DEUDA del negocio con el dueño) o préstamo de una persona (nombre, plazo, interés, en pagos o en una fecha).
- Modo noche: sigue el modo del teléfono + botón en el menú Claro/Oscuro/Automático.
- Verificación Veracruz 2026 (semestral, por terminación de placa; costo $493): 5-6 amarillo ene-feb y jul-ago; 7-8 rosa feb-mar y ago-sep; 3-4 rojo mar-abr y sep-oct; 1-2 verde abr-may y oct-nov; 9-0 azul may-jun y nov-dic. Editable en Ajustes. Fuente: todosobreautos.com.
- Simulador: si vende sin comprar, al confirmar la venta el dinero va al efectivo en caja.
- Pedidos en ruta: cajas reservadas solo como recordatorio; avisar si una entrega deja menos de lo reservado.
- Sugerencia de carga por historial: +10%, mínimo 5 cajas (y lo mismo en kg); se ajusta según lo que sobre/falte.
- Pendiente: imágenes del medidor de gasolina NP300, diésel del camión y DEF.
- Medidor NP300 recibido (scratchpad/medidores/np300-gasolina.jpg): arco abierto hacia arriba, 0 a la izquierda con zona roja de reserva, rayas en 1/4, 1/2, 3/4, y 1 a la derecha; fondo negro, trazos blancos.
  -> DECIDIDO: redibujarlo idéntico (SVG: fondo negro, arco blanco con brillo, rayas 1/4 1/2 3/4, 0 y 1, zona roja de reserva, ícono de bomba) con aguja naranja que gira suave y se puede arrastrar; niveles en octavos (Reserva, 1/8…7/8, Lleno), se acomoda a la raya más cercana. Se usa al salir de ruta, al regresar y en viajes; también calcula litros con la capacidad del tanque.
- Medidor Freightliner recibido (scratchpad/medidores/freightliner-diesel-def.jpg): redondo, arco de E (izquierda) a F (derecha) por arriba; rayas rojas de reserva cerca de E, banda blanca gruesa con marcas en 1/2 (arriba) y ~3/4; texto ULTRA LOW SULFUR DIESEL FUEL ONLY; abajo DEF con 4 cuadritos verdes entre E y F.
  -> DECIDIDO Freightliner: redibujarlo idéntico (círculo, arco E→F por arriba, rayas rojas de reserva, banda blanca, marcas, leyenda ULTRA LOW SULFUR DIESEL FUEL ONLY) con aguja que se mueve/arrastra en octavos. DEF abajo: 4 cuadritos verdes que se tocan (0-4); con 1 cuadrito aviso "Carga DEF pronto", vacío = URGENTE (puede perder potencia). DEF se compra en bodega: no se registra en el viaje, solo el nivel al salir y al llegar (la compra de garrafas va en Gastos de bodega).
- DEF (aclaración): normalmente se tiene en bodega; si no hay, el camión puede salir con 1 cuadrito.
  - Salida con 1 cuadrito: aviso grande "Solo tiene 1 cuadrito de DEF. ¿Sales así?" Sí/No; aviso al admin siempre.
  - Al cargar diésel en el camino con DEF bajo y sin haber añadido DEF: ventana grande "Ponle DEF: ~X litros alcanzan para lo que falta del viaje" (con km que faltan), botones "Ya le puse" / "No hay DEF aquí".
  - Si lo compra en el camino: gasto del viaje (litros, total, foto del ticket), suma al costo del viaje.
  - Consumo: ~3 L de DEF por cada 100 L de diésel; se ajusta con lo registrado. Tanque de DEF del camión editable (propuesta 25 L, ~6 L por cuadrito).
  -> Tanque DEF: usar 25 L (~6 L por cuadrito) por ahora. En Agregar/Editar vehículo: '¿Usa DEF?' sí/no y capacidad del tanque de DEF (para vehículos nuevos).
  -> '¿Usa DEF?' y capacidad solo aparecen si el combustible del vehículo es Diésel.
- Foto real para las dos NP300 (scratchpad/fotos/np300.jpg, reducida a 720 px): Nissan NP300 blanca con redilas y lona negra 'NIETO'S', 'Plataneros' en la puerta. Usarla como foto de los vehículos 1 y 3 (reemplaza el dibujo).
- Foto real del Freightliner (scratchpad/fotos/freightliner.jpg, 720 px): rabón blanco caja seca con logo 'Plátanos Nietos' (racimo de plátanos en escudo verde). La placa en la foto dice HA-9219-J (en la app XV-117-C): PREGUNTADO si se actualiza.
  -> Placa: dejar la de ejemplo (XV-117-C). Logo: recortar de la foto del camión (scratchpad/fotos/logo-crop.png) y usarlo como logo de la app (arriba junto al nombre y en notas/tickets).
- Logo original recibido: fotos/logo.jpg (420 px, para notas/tickets y bienvenida) y fotos/logo-icono.jpg (128 px, racimo, para el encabezado). Reemplaza el recorte de la foto.

## Ideas para la app que salieron de la plática de negocio (31 oct) — PROPUESTAS, falta confirmar
- Crédito a clientes: regla clara en la app. Si el cliente ya debe vencido o pasó su límite, el chofer NO puede fiar (botón bloqueado con texto "No se le puede fiar: debe $X desde ..."). Si pide fiado dentro de las reglas, se registra solo; si es caso especial, "Pedir permiso" y el admin aprueba/rechaza desde su celular.
- Planeador de compras: con existencias (verdes, madurando, maduras), venta diaria promedio, días de maduración (~3) y tiempo del viaje, la app avisa "Te alcanza hasta el jueves: programa el viaje a Roly a más tardar el martes" y deja armado el viaje (plantilla) para asignarlo a un chofer.
- Retiros del dueño: categoría "Retiro del dueño" separada de gastos del negocio; sueldo fijo del dueño; reparto de ganancias mensual.
- Cuenta del negocio: efectivo de rutas se deposita; fondo fijo de caja; depósitos registrados.
- "Resumen del lunes": 6 números con semáforo (ganancia semana, efectivo caja+banco, clientes deben/vencido, deuda proveedores, merma, costo caja vs precio).
- Apartados (sobres): mantenimiento, emergencias, impuestos, crecimiento.
- Usuario: solo él y su papá compran, fijan precios, cobran y cuadran caja. Dados de alta en SAT, no facturan. Lo que más le pesa: manejar por la fruta, atender proveedores y organizar el abasto (maduración 3 días). El dinero normalmente alcanza.
- Respuestas (31 oct): los dos (él y su papá) prefieren hacer de todo. Choferes SÍ pueden ir solos a cualquier proveedor si el precio y la forma de pago ya están arreglados (admin paga por transferencia o arregla la forma de pago). Sueldo necesario: ~20,000 al mes.
- PROPUESTAS app derivadas: (a) en el plan del viaje: "Precio acordado con el proveedor" y "¿Cómo se le paga?" (transferencia del admin / efectivo que lleva el chofer / a crédito); al cargar, al admin le llega "Pagar a Roly $X" con botón para registrar la transferencia y foto del comprobante. (b) Como los dos hacen todo: avisos con "Lo atiendo yo" para que el otro vea quién lo tomó y no se duplique un pago; historial con nombre de quién hizo cada cosa (usuario por persona en el APK). (c) Sueldo del dueño 20,000/mes como retiro fijo (ej. 10,000 cada quincena), revisión a los 3 meses con números reales.
- Dos administradores con su propia cuenta: los dos se llaman Ricardo; en la app se distinguen como "Ricardo Mejía" (el usuario) y "Ricardo Nieto" (su papá) — usar estos nombres en la demo en lugar de "Administrador". Toda la información es la misma en las dos cuentas (sincronizada); cada acción muestra quién la hizo, ej. "Ricardo Mejía le pagó $10,000 a Roly · efectivo de caja". Al pagar uno, la deuda baja para los dos.
- "Hospital" era El Pital (dictado por voz).
- Usuario aprobó meter en la 3.2: planeador de compras, regla del fiado, pago al proveedor desde el celular, "Lo atiendo yo", retiros del dueño (sueldo fijo) y resumen del lunes.
- Sueldo: los 20,000 al mes son solo para su papá (Ricardo Nieto, dueño). El usuario (Ricardo Mejía) ayuda sin cobrar y tiene su trabajo aparte. En la app: sueldo fijo del dueño Ricardo Nieto 10,000 cada quincena como 'Retiro del dueño'; Ricardo Mejía sin sueldo (admin).
- OBJETIVO DE FONDO (31 oct): que el negocio funcione sin Ricardo Nieto (papá): por edad, cansancio, enfermedad futura o vacaciones. "Que cualquiera la pueda usar y se mantenga el negocio sin él."
- PROPUESTAS app para esto: (1) "Qué hacer hoy": lista diaria para el encargado (recibir carga, revisar maduración, cuadrar caja, cobrar vencidos, programar viaje) que se va palomeando; (2) "Encargado temporal": dar permisos por fechas a alguien de confianza (ej. corte de caja, recibir cargas) sin dar todo; (3) "Así se hace": guía dentro de la app con lo que sabe el papá (proveedores y cómo tratarlos, precios usuales, clientes especiales, qué hacer si...), que él mismo dicta o llena; (4) "Modo vacaciones": avisos urgentes van al otro admin o al encargado; (5) Ensayo: un día a la semana el papá no va y la app guía al que se quede.
- ENCARGADO (decidido): cuenta de administrador con opción de tener ruta (como "Mi ruta de hoy"). Activa SOLO por fechas (la activan Ricardo Mejía o Ricardo Nieto, ej. del 1 al 7 dic); fuera de esas fechas trabaja como chofer normal. NO ve ganancias ni estadísticas (ni crédito de vehículos/simulador) y NO puede crear ni quitar usuarios. SÍ ve sueldos y puede hacer pagos (no se limitó). En la demo: botón para activar a un chofer como encargado por fechas.
- 'Lo atiendo yo' solo aparece si hay más de un administrador activo (contando encargado por fechas); con uno solo se omite.

## v3.2 PUBLICADA (31 oct)
Todo lo de la lista v3.2 + plática de negocio (dos admins, encargado, vacaciones, qué hacer hoy, así se hace, planeador, pagos por hacer, regla del fiado con permiso, caja que no alcanza, resumen del lunes, medidores, DEF, verificación, fotos y logo, simulador por pasos). Pruebas: v32/t1.js.

## Para la v3.3 — errores reportados (31 oct, noche)
1. Viaje de carga del administrador, paso "Listo en Roly": el campo del precio de compra por kilo sale como un recuadro vacío sin texto (foto del usuario). CAUSA encontrada: en la v3.2 al cambiar la etiqueta a "Precio al que lo compraste (kilo) $" se borró el ">" de la etiqueta <label for="apk…">, así que el texto quedó dentro de la etiqueta y no se ve. Arreglar: restaurar el ">" y revisar que "Total de la fruta" se calcule al escribir el precio. Revisar el mismo patrón en las otras etiquetas cambiadas.
2. Simulador — carrocería nueva: preguntar con quién se manda a hacer, cuánto vale, anticipo (pago inicial) y si se va abonando (abonos libres, no fijos: según material/avance, el admin decide cuánto) o se liquida al final. Mostrar en el resultado "Carrocería: debes $X, la vas abonando" (no entra como mensualidad fija).
3. Simulador — cascada del pago: después de ahorros, lo que queda (ej. $95,000) se prellena en el préstamo. Preguntar ¿con quién? banco / persona / los dos. Si es uno, se prellena todo ahí; si son los dos, lo que escribas en la persona se resta y el resto se llena solo en el banco (y viceversa). No dejar que la suma pase de lo que falta (en la captura puso 200,000 de persona con 95,000 faltantes).
4. Simulador — gastos extra: preguntar si habrá placas, rines o llantas, cámara, etc. (lista con monto cada uno). DECIDIDO: se suman a lo que cuesta y se pagan con lo mismo (venta, ahorros, préstamo o banco). Cámaras/equipo suman al valor; rines/accesorios como dinero que no regresa; placas como trámite.
5. Simulador — DECIDIDO: botón "Ya lo compré" al final: crea el vehículo nuevo, la carrocería (equipo con fabricante, anticipo y abonos libres, estado Encargada→En fabricación→Lista→Montada), el préstamo de la persona (deuda con abonos libres), el crédito del banco (mensualidad, plazo, tasa) y deja pendiente la venta del vehículo viejo hasta que se confirme.
6. Entrega — aviso flotante: sale corrido hacia la derecha y dura ~1 s. CAUSA: la animación de entrada pisa el centrado (transform) y el tiempo se cuenta desde que se abrió la pantalla, no desde que aparece flotando. Arreglar: centrado sin transform (left/right 12px) y que dure ~4 s desde que aparece.
7. Entrega — el aviso flotante debe juntar TODO lo anormal del cliente (uno debajo de otro, con color por gravedad): pide/debe cajas vacías, debe crédito (cuánto y desde cuándo), "No se le puede fiar: solo de contado" (si ya debe/pasó límite/moroso), cliente nuevo de contado, pedido especial, notas de "Así se hace" del cliente. Queda fijo arriba de la pantalla de entrega y flota 4 s al bajar.
   -> Cajas vacías que debe: solo SUGERENCIA ('Debe 3 cajas vacías: pídeselas'), nunca obligatorio ni bloquea la entrega. Cambiar el texto actual 'Antes de entregar, recoge las cajas que debe'.
8. Inicio — "Fija el precio de hoy": el aviso y la tarjeta "Precio de hoy" deben verse como UNA sola cosa (mismo color amarillo/borde, aviso como encabezado de la tarjeta) para que se entienda que es el mismo apartado.
9. Precio de hoy: de momento solo roatán y macho (caja, mayoreo, kilo y venta local por kilo). Quitar productos extra por defecto. "Agregar producto" pide nombre, precio de venta y si se vende por kilo o por caja. (DECIDIDO: solo en Precio de hoy; el viaje de carga sigue ofreciendo "Otra fruta".)
10. ENCARGOS al chofer (pendientes del vehículo): en la tarjeta del vehículo, junto a "Ya se verificó", botón "Encargárselo al chofer" (para quien traiga ese vehículo, o escoger chofer). Sirve para cualquier pendiente: verificación, cambio de aceite, llevar al taller, lavar, cambiar llanta, etc. (tipo + nota).
   - En la ruta del chofer sale como recordatorio NO prioritario ("Cuando tengas tiempo: verificar la NP300 2023"), no estorba la ruta; se le recuerda en la bienvenida y al cerrar.
   - Al tocarlo: "¿Se hizo?" Sí → ¿cuánto costó? (+ foto del comprobante), se registra como gasto de la ruta (sale del efectivo de la ruta y se descuenta en el cierre) y en el historial del vehículo (verificación: verUlt; aceite: servicio). No → ¿por qué? (texto), al admin le llega aviso y el encargo sigue pendiente.
   - El admin ve en la tarjeta del vehículo "Encargado a Danu desde …" y puede cancelarlo.
11. Crear viaje de carga: el paso de escoger vehículo va ANTES del plan del viaje (orden: quién → qué → proveedor → orden → VEHÍCULO → plan → listo), para que la barra de espacio, el efectivo sugerido (combustible) y el plan usen el vehículo escogido y no el Freightliner por defecto. Propuesta: las cantidades del plan se prellenan según lo que cabe (NP300 ~160 cajas, camión 300+) y avisa si no cabe.
12. Burbuja tipo Uber: el dibujo animado que avanza depende del vehículo: diésel/camión → camión 🚛; gasolina/Nissan → pickup 🛻 (también en la burbuja minimizada).
13. Cargas — "Registrar carga nueva" (manual): QUITAR el formulario actual y hacerlo por pasos (pantalla propia, como el viaje de carga):
   1) Proveedor (de los guardados o nuevo) y fecha (Hoy/Ayer/...).
   2) ¿Qué cargaste? Roatán / Macho / Otra (tarjetas); abajo "¿Cargaste algo más?" para marcar varios; no avanza sin escoger.
   3) Roatán: "¿Cuántos kilos netos de roatán se cargaron?" (ej. 6,800) → "¿Cuántas cajas se llenaron?" (avisa si < 19 kg/caja) → "¿A cuánto te dio el kilo el proveedor?" (ej. $9.80).
   4) Macho: "¿Cuántos kilos netos de macho?" (ej. 2,000) → "¿A cuánto te dio el kilo?" (ej. $10.80).
   5) Otra: nombre; ¿se cargó por kilo o por caja?; si por kilo, ¿se vende por kilo o por caja?; cantidad y precio de compra.
   6) Gastos del transporte: combustible, básculas, casetas, comida o flete si alguien la trajo.
   7) Pago al proveedor (3 pasos: qué, cómo, confirmar) o quedó a deber.
   8) ¿Ya llegó a bodega o ya viene?
   9) Resumen como antes: cuánto costó, cuánto pagaste/debes, costo por caja y por kilo puesto en bodega, ganancia esperada con el precio, comparación con la carga pasada (más caro/barato) y precio de venta sugerido. Confirmar y guardar.
   AGREGADOS a la carga manual (31 oct):
   - Paso "¿Quién fue y en qué vehículo?" (chofer o "lo trajo el proveedor/flete"); sirve para costo del viaje, desgaste y extra del chofer.
   - Cajas vacías: cuántas se llevaron, cuántas regresaron, y si faltan, ¿se quedaron con el proveedor? (igual que en el viaje).
   - Gastos: COMBUSTIBLE OBLIGATORIO (o "lo trajo el proveedor/flete" → monto del flete); básculas, casetas, comida, cargadores OPCIONALES según el lugar (ej. Coacoatzintla no tiene casetas) — mostrarlos como "¿Hubo…?" con monto si sí.
   - Si ya llegó: calidad (buena/regular/mala + nota) y "¿Vas a meter a madurar una parte de esta carga de una vez?" → cuántas cajas/kilos → crea el lote de maduración.
   - NO se agregan: copiar la carga pasada, foto del ticket, fruta dañada al llegar.
   - La carga manual también la puede capturar el ENCARGADO (con su nombre en el historial).
14. Reparto — pantalla de entrega: no hay forma de regresar si el chofer tocó "Ir" o "Ya llegué" por error. Agregar arriba "← Volver a la ruta" (sin guardar nada; si ya escribió cantidades, preguntar "¿Salir sin guardar?") y en la ruta poder escoger otro cliente o deshacer "Ya llegué" (la parada vuelve a pendiente).
15. Entrega más intuitiva (DECIDIDO: una sola pantalla, ordenada):
   - Orden: ← Volver · cliente y su aviso de cosas anormales · ¿Qué le dejas? (roatán, macho; botones grandes) · Cobro (Pagó todo / parte / crédito, abono a deuda) · Cajas vacías que devuelve (y rotas) · "Más opciones" plegado con lo que casi no se usa (mayoreo manual, cambio por fruta mala, cuándo regresar, novedades).
   - Calculadora de cambio: "¿Con cuánto te pagó?" → "Dale $420 de cambio" (con botones $200/$500/$1,000).
   - Barra fija abajo con el total y "Guardar entrega"; al tocar, resumen para confirmar (cajas, kilos, total, pagó, queda a crédito, cajas vacías).
   - NO se agregan: botón "Lo de siempre", botones de llamar/WhatsApp/Ir en la entrega.
16. Viaje de carga — recordatorio de combustible: con el nivel del tanque al salir (medidor × capacidad), el rendimiento del vehículo (km/L de viajes anteriores) y los km que faltan (ruta/GPS), calcular si alcanza. Si NO alcanza o queda justo (sobraría menos de ~15% del tanque o entraría en reserva), avisar: al salir (paso combustible: "Carga antes de salir o en el camino: te alcanza para ~X km y el viaje son ~Y km") y durante el viaje en la pantalla del tramo ("Carga combustible antes de llegar a …"). Si ya cargó o el tanque alcanza con margen, no mostrar nada. Se recalcula con cada recarga registrada. (Propuesto: en cada parada, opcional, tocar el medidor para actualizar el nivel y afinar el cálculo.)
   -> DECIDIDO: NO pedir actualizar el medidor en cada parada; el cálculo usa solo el nivel al salir, el rendimiento y las recargas registradas.
17. Textos que no caben en su botón/burbuja (revisión automática a 360 y 412 px + capturas): Gastos → filtros "Combustible" y "Ponchadura" (cortados); Gastos → cuadro "Combustible"; Choferes → Registrar queja: los botones de tipo se aplastan en círculos ("Faltante de dinero o fruta", "Maltrato a la fruta o al vehículo"); Bienes → "En reparación" (a 360 px); Estadísticas → "Ganancias" (a 412 px); Clientes → "Mié" (día) a 360 px. CAUSA general: las filas de botones (chips) reparten el ancho en partes iguales y no dejan crecer los textos largos. Arreglo general: que cada botón tome el ancho de su texto y pase a la siguiente línea si no cabe (o la fila se desliza de lado en filtros), sin cortar ni aplastar; revisar de nuevo toda la app con la misma prueba automática.
   - Además: las quejas de ejemplo dicen "registró Administrador": cambiar por Ricardo Nieto / Ricardo Mejía.

## v3.3 PUBLICADA (1 nov)
Los 17 puntos de "Para la v3.3" quedaron hechos. 37 pruebas automáticas pasan; sin textos cortados a 360 y 412 px.
Extra: en el simulador, al pasar de un campo a otro ya no se pierde el cursor.

## Para la v3.4
1. Combustible pre-rellenado según el viaje (1 nov). Ya se sabe a qué proveedores va y en qué vehículo, entonces el paso de combustible debe venir lleno, y se puede corregir.
   - DÓNDE: en las dos pantallas. En el viaje de carga, el paso "¿Cargas combustible antes de salir?" (litros, precio y total). En "Registrar carga" a mano, el paso "Gastos del transporte" (monto del combustible).
   - DATO BASE: el promedio de los últimos 3 viajes a esos mismos proveedores con ese vehículo (ej. Alpital + Anautla en camión = ~100 L). Si no hay historial, se calcula con km del recorrido ÷ rendimiento del vehículo. Mostrar de dónde sale: "Normalmente se gastan ~100 L para ir a Alpital y Anautla (promedio de 3 viajes)".
   - LITROS: se pone lo que se gasta el viaje (no lo que falta en el tanque). Precio = último precio del diésel/gasolina registrado de ese vehículo; total = litros × precio. Abajo se avisa si con lo que trae el tanque ya le alcanza.
   - Cada viaje terminado guarda sus litros reales para que el promedio se vaya afinando.
2. Registrar carga a mano: no deja escoger dos proveedores (1 nov). RECOMENDADO (el usuario dejó la decisión a Claude):
   - Nuevo orden: 1) fecha y "¿Qué cargaste?" (Roatán / Macho / Otra) → 2) dentro de cada fruta, "¿Quién te lo vendió?" ya pre-seleccionado con su proveedor de siempre (Roatán → Roly, Macho → Josue, según las cargas pasadas), con chips de los demás y "+ Otro nuevo" → kilos, cajas y precio de esa fruta.
   - Así cada fruta lleva su proveedor y no hay que pensar en "dos proveedores": si solo cargó roatán, solo sale Roly; si también macho, sale el apartado del macho con su proveedor.
   - Se guarda como UNA sola carga (un viaje, un costo de transporte repartido por kilos), con proveedor por fruta (como ya hacen los viajes con varias paradas).
   - El pago se hace POR PROVEEDOR: "¿Cuánto le pagaste a Roly?" y "¿Cuánto le pagaste a Josue?" (todo / parte / quedó a deber, efectivo o transferencia). En el resumen sale lo que se le debe a cada uno.
   - Cajas vacías: "¿se quedaron con el proveedor?" se pregunta solo para el proveedor de roatán.
   - El combustible pre-rellenado (punto 1) usa la combinación de proveedores escogida (ej. Alpital + Anautla).
3. Registrar carga a mano, paso "Cajas vacías" (1 nov): "¿Cuántas cajas vacías se llevaron?" viene pre-rellenado con las cajas que se llenaron de roatán (ej. 300), y "¿Cuántas regresaron sin llenar?" en 0. Se puede corregir. Si después se cambian las cajas llenas en el paso de roatán y el usuario no había tocado las vacías, se actualiza solo.
4. Apariencia más "pro" estilo Samsung Health (1 nov, con captura de referencia). DECIDIDO: por ahora SOLO Inicio del administrador, como prueba.
   - Inicio como tablero de mosaicos: tarjetas grandes muy redondeadas, número grande + etiqueta (Efectivo hoy, Ventas de la semana con barritas por día, Viajes en curso con anillo de avance, Por cobrar, Fruta en bodega), y mosaicos de color para Cargas, Clientes, Gastos, Vehículos, Personal; al tocar se abre el detalle de siempre. Avisos urgentes arriba, como ahora.
   - Modo: igual que el teléfono (claro u oscuro) con el botón que ya existe; el tablero debe verse bien en los dos.
   - Colores: uno por apartado, fuertes y con degradado suave (verde Inicio, naranja Cargas, azul Clientes, rojo Gastos, gris azul Vehículos, verde agua Personal, morado Estadísticas).
   - Solo cambia la vista: no se tocan cálculos ni flujos. Si gusta, después se pasa al resto de la app por etapas (cuidando contraste y letra grande para los choferes en la calle).
   AJUSTE (1 nov, tras ver la prueba "inicio-v34-prueba.html"): le gusta el estilo, pero CONSERVAR EL ORDEN ORIGINAL del Inicio: burbuja del viaje (tipo Uber, misma función, estilo nuevo) → tarjeta del precio de hoy (aviso amarillo + caja de roatán y kilo de macho; "está perfecta") → fruta para los próximos días → qué hacer hoy → resumen del lunes → mi ruta de hoy (si el admin tiene ruta) → hoy de un vistazo → avisos → para tu información → cajas en bodega → meta del mes → cobrar hoy → semana pasada → finanzas.
   - El EFECTIVO no debe verse arriba (por si alguien husmea): se quita de "Hoy de un vistazo"; las Finanzas van ocultas (••••••) hasta tocar "Mostrar" y se vuelven a ocultar solas a los 20 s.
   - QUITAR los anillos de avance del reparto de los choferes y del viaje (no le gustaron en Inicio).
   - Los mosaicos de "Apartados" no entran (no estaban en el orden original); la barra de abajo ya da acceso.
   ORDEN FINAL (1 nov): 1 burbuja del viaje · 2 mi ruta de hoy · 3 precio de hoy · 4 avisos · 5 para tu información · 6 fruta para los próximos días · 7 qué hacer hoy · 8 resumen del lunes · 9 hoy de un vistazo · 10 cajas en bodega · 11 meta del mes · 12 cobrar hoy · 13 semana pasada · 14 finanzas (con cierre de caja).
   - Dibujos de fondo muy tenues en lugar de los círculos: billete y monedas en tarjetas de dinero (finanzas, te deben, cobrar hoy); plátanos en tarjetas de fruta (precio de hoy, fruta para los próximos días, cajas en bodega).
   ÚLTIMO AJUSTE: la tarjeta de cajas en bodega va abajo del precio de hoy (orden final: burbuja · mi ruta · precio · cajas · avisos · para tu info · fruta · qué hacer · lunes · vistazo · meta · cobrar · semana · finanzas).

## v3.4 PUBLICADA (1 nov)
Puntos 1-4 hechos. Diseño nuevo para administrador (y encargado), venta local y contador; choferes se quedan con el diseño de siempre (a ellos les funciona). 46 pruebas automáticas pasan; sin textos cortados a 360/412 px.
- Proveedor "de siempre" por fruta = el más frecuente de las últimas 10 cargas.
- Carga a mano con chofer también se guarda en el historial de viajes (para afinar el promedio de combustible).
- Finanzas ocultas hasta "Mostrar" (20 s); al tocar un mosaico se ve su detalle.

## Para la v3.5
1. ERROR (1 nov): al fijar el precio de un lote ("Usar desde hoy", "Precio intermedio mientras se acaba el anterior", "Cuando se acabe el lote anterior") se aplica directo, sin confirmar. CAUSA: esos tres botones (lphoy, lpinter, lpdesp) no tienen ventana de confirmación. Pasa en TODAS las cargas (manuales y de viaje) y también en el último paso del viaje de carga, porque es el mismo apartado.
   ARREGLO: antes de aplicar, ventana "¿Cambiar el precio?" que diga qué cambia: caja de roatán $X → $Y y kilo de macho $X → $Y (ganancia por caja y %), desde cuándo aplica (hoy / intermedio $Z mientras se acaban N cajas del lote anterior / cuando se acabe el lote anterior) y que los choferes lo verán en su siguiente entrega. Botones "Sí, cambiar" y "Cancelar". Si el precio no cambia, decirlo ("se queda igual").
2. Menú lateral más limpio con TUERCA de ajustes (1 nov): al abrir el menú, arriba un ícono de tuerca que abre "Ajustes".
   - En la tuerca: modo oscuro (igual que el teléfono / claro / oscuro), toda la configuración que hoy está en el menú (Ajustes, Inspección del vehículo, Mantenimiento, Verificación, Tipos de queja) y "Acerca de".
   - En el menú se quedan: quién entró (y en la demo "ver como"), selección de administrador, Así se hace, Sugerencias, Bienes, y lo propio del chofer.
   - ACERCA DE (texto decidido): "Plátanos Nietos · Control de reparto v3.5 · Desarrollada por Ricardo Nieto Mejía · © 2026 Ricardo Nieto Mejía. Todos los derechos reservados. Prohibida su copia o distribución sin permiso del autor." Con el logo.
   - La tuerca también la ven choferes, venta local y contador, pero solo con modo oscuro y Acerca de (la configuración es solo del administrador).
3. Textos que se salen de su burbuja otra vez (1 nov), por ejemplo en Gastos → "Registrar un gasto · toca el tipo" (los cuadritos de tipo). CAUSA probable: la v3.4 usa la letra nueva (Manrope), que es más ancha; la revisión automática se corrió sin esa letra (no carga en el entorno de pruebas). ARREGLO: incluir la letra dentro de la app (sirve también para el APK sin internet), volver a correr la revisión de desbordes con la letra real en 360 y 412 px en TODAS las pantallas y arreglar lo que salga (cuadritos de Gastos con texto en dos líneas o 3 columnas si no cabe).
4. Filas que se deslizan de lado (1 nov): en cualquier fila o menú que se desliza hacia un lado (filtros de Gastos, pestañas, chips, etc.) poner una señal de que hay más: degradado en la orilla + flechita "›" y, la primera vez, una pista "Desliza para ver más". La flechita desaparece al llegar al final. Revisar toda la app para encontrar todas las filas así.
5. Inicio → Finanzas: colores según la situación y dibujos nuevos (1 nov).
   - Colores: Efectivo en caja verde (rojo si está en negativo) · Ingresos de hoy verde · Gastos de hoy rojo/naranja · Debes a proveedores rojo si debes, verde si no debes nada · Te deben los clientes rojo/naranja si te deben, verde si nadie debe.
   - Dibujos de fondo (tenues): Efectivo en caja → caja registradora; Ingresos de hoy → billete con flecha entrando; Gastos de hoy → billete con flecha saliendo (dinero que se va, con alitas); Debes a proveedores → nota/recibo "por pagar" con un camioncito de fruta (DECIDIDO); Te deben los clientes → billete fantasma (contorno punteado con ojitos).
   - DECIDIDO: los colores se ven siempre, aunque las cifras estén ocultas; solo el monto se esconde.
6. Estadísticas: palabras que se salen de su burbuja (1 nov). Entra en la revisión del punto 3 con la letra real.
7. Vehículos → Simulador: cuando el resultado es "🔴 No conviene por ahora", las tarjetas se enciman (1 nov). Revisar el resultado en los 3 casos (conviene, con cuidado, no conviene) a 360 y 412 px, con la letra real.
8. Entrega (chofer), "Cajas vacías que devuelve" (1 nov): pre-rellenar con las mismas cajas de roatán que se le dejan (si le dejas 4, devuelve 4). Si cambias las cajas que le dejas y no habías tocado las vacías, se actualiza solo. Se puede corregir (más si paga cajas que debía, menos si no las tiene).
9. ERROR (1 nov): cuando el chofer manda su cierre, el administrador "no lo ve" en Inicio. CAUSA encontrada: la tarjeta "Cierre de Danu recibido" sí se crea, pero queda casi hasta abajo (después de todos los avisos y de Hoy de un vistazo), y no hay aviso. ARREGLO: la tarjeta sale ARRIBA (justo debajo de la burbuja del viaje) con color verde y "Toca para recibir el efectivo", se queda ahí hasta que confirmes el efectivo recibido, y el ícono de Inicio lleva el puntito rojo mientras tanto. Lo mismo para el corte de venta local pendiente de recibir.
10. Ruta de reparto (chofer, y también "Mi ruta de hoy" del administrador): agregar un botón "Gasto" a la barra fija de abajo (junto a Ruta, Entrega, Cierre, Viaje) (1 nov). Al tocarlo se abre una ventana desde abajo con el mismo registro de gasto de la ruta (tipo, monto, nota, foto del ticket), sin salir de la pantalla en la que estás; se descuenta del efectivo de la ruta como hoy. Solo cuando ya inició el reparto y no ha mandado el cierre. (El viaje de carga ya tiene su botón "Gasto" fijo abajo.)
11. Inspección de vehículos más simple (1 nov). Hoy: diaria 5 puntos, lunes 11, viaje de carga 16, cada uno con Bien/Mal. DECIDIDO (las 4 cosas):
   a) Botón grande "Todo está bien": se ve la lista y con un toque se marca todo; solo se toca el punto que esté mal (pide "¿qué tiene?" y foto, y sigue el aviso al administrador como hoy).
   b) Menos puntos con dibujito: la diaria queda en 4 tarjetas con ícono: Llantas (infladas, sin cortes) · Luces (delanteras, freno, direccionales) · Tablero y frenos (sin focos de alerta, pedal firme) · Fugas o golpes (no tira aceite/agua, espejos y parabrisas bien).
   c) Lo de los lunes (aceite, anticongelante, líquido de frenos, presión con medidor y refacción, gato y llave, limpiaparabrisas) se pide UNA vez por semana POR VEHÍCULO: el primer uso de la semana, aunque sea en viaje de carga; ya no se repite si ese vehículo ya la pasó.
   d) Documentos (tarjeta de circulación, póliza, licencia) una vez al mes; la app ya avisa cuando van a vencer.
   - El viaje de carga agrega solo lo propio de la carga (redilas/amarres, lonas o mantas, triángulos y extintor), también agrupado en tarjetas con ícono.
   - Ajustes (tuerca) → Listas de inspección se sigue pudiendo editar.

## v3.5 PUBLICADA (1 nov)
Los 11 puntos hechos. Letra: Manrope no se pudo incluir (sin acceso a internet para descargarla) → se incluyó Inter dentro de la app (sirve sin internet y en el APK). Revisión de desbordes y tarjetas encimadas con la letra real en todas las pantallas (admin, venta local, contador, estadísticas, vehículos, simulador, ajustes): sin problemas. Pruebas: 46 de la v3.4 + 27 nuevas, todas pasan.
Siguiente: PWA en GitHub Pages (repo reptileckz4-cmd/platanitos), falta que el usuario vincule GitHub o subir archivos a mano.

## Para la v3.6 (revisando la PWA, 1 nov)
1. La app no se adapta al ancho de la pantalla (se queda en una columna angosta de 440 px al centro), aunque el menú lateral sí sale desde la orilla. Importante para tablet y teléfono plegable. DECIDIDO: se acomoda por tamaño:
   - Teléfono (hasta ~600 px): como ahora, pero ocupando todo el ancho disponible.
   - Plegable abierto o tablet en vertical (~600–1000 px): tarjetas en 2 columnas (Inicio, listas de clientes, cargas, vehículos, gastos); barra de abajo igual.
   - Tablet acostada o pantalla grande (más de ~1000 px): las secciones pasan a un menú a la izquierda (riel) y 2–3 columnas.
   - Pasos (viaje de carga, registrar carga, simulador, ajustes) y ventanas: centrados con ancho cómodo (~560 px), no estirados.
   - Aplica para todos los roles, también choferes (por si usan tablet). Probar a 360, 412, 600 (plegable), 800 (tablet vertical) y 1280 (tablet acostada), en claro y oscuro.
2. Ajustes (tuerca) → "Forma de la pantalla" (1 nov): opción para verla "Como teléfono" por si en algún aparato el acomodo automático da problemas.
   - Automático (predeterminado): se acomoda por tamaño (punto 1).
   - Como teléfono: una sola columna angosta centrada, con proporción de teléfono normal (9:16, ~412 px de ancho), aunque la pantalla sea grande; barra de abajo de teléfono.
   - Se guarda POR APARATO (cada tablet o teléfono escoge la suya) y lo pueden cambiar todos los roles, incluido el chofer.
3. Respuesta al tocar (1 nov): vibración muy corta y/o sonido de "tap" muy corto y suave al tocar botones, pestañas y opciones.
   - Ajustes (tuerca) → "Al tocar": Vibración (sí/no) y Sonido (sí/no). PROPUESTO por defecto: vibración encendida, sonido apagado (en la calle el sonido puede molestar). Se guarda por aparato.
   - Vibración ~10 ms al tocar; doble vibración corta cuando algo sale mal (falta un dato, error); una un poco más larga al guardar algo importante (entrega, cierre, carga).
   - Sonido: "tic" de ~30 ms generado por la app (sin archivos), volumen bajo; uno distinto, suave, al guardar.
   - Nota: la vibración funciona en Android (Chrome y la PWA); en iPhone el navegador no lo permite. En el APK se usará la vibración del sistema.
4. Resumen y desglose de cargas: dice "diésel" aunque se haya ido en la Nissan (1 nov). ARREGLO: el nombre del combustible sale según el vehículo con que se fue esa carga: camión → "diésel"; Nissan → "gasolina" (Magna/Premium). Si la trajo el proveedor o un flete, "flete" en lugar de combustible.
   Lugares encontrados: desglose de la carga ("Transporte (diésel, comida, casetas, extras)"), detalle de la carga ("Combustible recargado"), botones de gasto del viaje sencillo ("Diésel, Comida, Casetas, Otro"), y el valor inicial del paso de combustible del viaje. Revisar también historial de viajes y estadísticas.
   - ACLARACIÓN (1 nov): no se fija por nombre ("camión"/"Nissan"): sale del campo Combustible de cada vehículo (Magna, Premium o Diésel), así que cualquier vehículo nuevo funciona solo según el combustible que se le ponga al darlo de alta, y si se cambia el vehículo de la carga, cambia el texto. Magna/Premium → "gasolina" (o el nombre exacto: "gasolina Magna"/"gasolina Premium" donde quepa).
5. Campos vacíos al tocar "Siguiente" o "Guardar" (1 nov). Hoy solo sale un aviso abajo y no se ve QUÉ falta; con los datos pre-rellenados alguien distraído puede creer que todo se llenó solo.
   ARREGLO en TODAS las pantallas donde se capturan datos (registrar carga, viaje de carga, venta local, entrega, gastos, simulador, encargos, vehículos, etc.):
   - El campo o la sección que falta se pone con borde y fondo rojo suave, se sacude de lado a lado (~0.4 s), la pantalla se desliza hasta él y queda listo para escribir; abajo del campo un texto corto: "Falta: kilos de macho".
   - Si faltan varios, se marcan todos; el rojo se quita en cuanto se llena.
   - Junto con la doble vibración corta de error (punto 3).
   - Además: los ejemplos dentro de los campos vacíos ("6,800", "2,000", "$9.80") hoy parecen datos ya puestos. Se cambian a "ej. 6,800" en gris claro, para que se note que está vacío.
6. Registrar carga → Gastos del transporte (1 nov): el combustible sale pre-rellenado (bien), pero el precio por litro queda fijo en la nota ("A $26.40 el litro") y no se puede cambiar en esa carga.
   ARREGLO: el combustible se captura en 3 renglones como en el viaje de carga: Litros (pre-rellenado con lo normal), Precio por litro (pre-rellenado con el último precio de ese vehículo, editable) y Total (se calcula solo; si escribes el total, se ajustan los litros). El precio que se escriba se guarda como el último precio de ese combustible para ese vehículo (para la próxima). Mismo arreglo en cualquier otro lugar donde el precio del combustible se vea pero no se pueda cambiar.
   - CONFIRMADO (1 nov): el precio que se pre-rellena es el de la ÚLTIMA vez que se le cargó combustible a ese vehículo (de cualquier lado: viaje de carga, ruta de reparto, carga manual), siempre editable. Mostrar junto al precio "último: $26.40 el 28 oct" para saber qué tan viejo es; si tiene más de 7 días, avisar suave "el precio puede haber cambiado".
7. Precios de ejemplo del combustible (1 nov): Diésel $29.60 por litro (Freightliner, hoy 26.40) y Gasolina Premium $25.50 (las dos NP300, hoy 25.90). También en los gastos/recargas de ejemplo que usen esos precios y en la fecha del "último precio".
   - (Punto 5) INCLUYE las preguntas de botones, no solo los campos de escribir: ej. pago al proveedor "¿Cómo le pagaste?" (Efectivo/Transferencia) sin escoger → la fila de botones se pone en rojo y se sacude, con "Falta: cómo le pagaste a Roly". Igual para "¿Quién fue?", vehículo, "¿Hubo casetas?", calidad, "¿Ya llegó o ya viene?", forma de pago en la entrega, etc.
8. Pago al proveedor: si fue "Una parte" o "Quedó a deber", tarjeta "¿Cuándo se le paga lo que falta?" (1 nov), en Registrar carga y también en el viaje de carga y en el pago a proveedor de Cargas.
   - Opciones: Una fecha (calendario; atajos Mañana / En una semana) · En la siguiente carga · Sin fecha fija.
   - Una fecha: el día anterior y ese día sale en Avisos e "Inicio → Por pagar": "Pagarle $16,640 a Roly hoy"; si pasa la fecha, sale en rojo.
   - En la siguiente carga: al crear el siguiente viaje o registrar la siguiente carga con ese proveedor, aviso "Le debes $16,640 de la carga del 1 nov: ¿se lo pagas en esta?" y se puede sumar al pago.
   - Sin fecha fija: queda en "Por pagar" como deuda sin recordatorio de día.
   - Se ve en la tarjeta de la carga y del proveedor ("Debes $16,640 · pagar el 8 nov") y se puede cambiar después.
9. Registrar carga → "¿Vas a meter a madurar una parte?" = Sí (1 nov): además de cajas y kilos, pedir lo mismo que en Bodega al crear un lote de maduración:
   - Con carburo / Sin carburo.
   - Clima: Soleado / Nublado / Lluvia / Frío (pre-escogido el de hoy).
   - Temperatura (pre-rellenada con la de hoy, editable).
   - Horas para madurar: se calcula sola con la temperatura (igual que en Bodega) y se puede cambiar; se recalcula si cambias la temperatura y no la habías tocado.
   - Por separado para roatán y macho si se mete de los dos (cada uno con sus horas).
   - DECIDIDO (1 nov): la maduración va en su PROPIA pantalla (paso "Madurar"), solo si la carga ya llegó. Orden: … → ¿Ya llegó o ya viene? + calidad → Madurar (¿Metes a madurar una parte? Sí/No; si Sí: roatán y/o macho, cantidad, carburo, clima, temperatura y horas) → Resumen. En el resumen aparece "A madurar: 60 cajas, listas en ~48 h".
10. Registrar carga: el precio de venta dentro del mismo registro (1 nov). Hoy, al guardar, se cierra y hay que ir a la tarjeta de la carga para fijar el precio. DECIDIDO (propuesta de Claude, el usuario preguntó opinión):
   - Después de "Revisa y guarda" sigue un paso "Precio de venta": muestra cuánto te cuesta la caja de roatán y el kilo de macho puestos en bodega, el precio actual y cuánto ganarías, y el precio sugerido con tu meta de ganancia.
   - Campos para caja y kilo (pre-rellenados con el precio actual) con la ganancia que se actualiza al escribir.
   - Botones: Usar desde hoy · Precio intermedio mientras se acaba el anterior (si hay fruta vieja) · Cuando se acabe el lote anterior · Dejar el precio como está. Si la carga todavía viene en camino: "Cuando llegue" en lugar de "desde hoy".
   - Al tocar uno sale la confirmación "¿Cambiar el precio?" (v3.5) y se guarda todo junto: carga + precio. El último botón del registro dice "Guardar carga y precio".
   - Lo mismo al final del viaje de carga, que ya lo tiene, para que se vea igual.
11. Lista de clientes para 50+ clientes (1 nov). Hoy: lista simple sin buscador ni filtros. DECIDIDO (las 4):
   a) Buscador arriba (nombre, apodo, teléfono o colonia/dirección) + filtros en chips (con la señal de deslizar): Todos · Me deben · Deben cajas · Morosos · Les toca hoy · Por chofer · Nuevos.
   b) Resumen arriba: cuántos clientes, cuánto te deben en total y cuántas cajas deben (de lo filtrado). Ordenar por: Nombre · Deuda (mayor primero) · Última compra · Lo que compran al mes.
   c) Agrupar: Sin agrupar · Por día de visita (lun, mar…) · Por chofer; cada grupo con su encabezado y su total.
   d) Vista de mapa: botón "Ver en el mapa" con todos los clientes (o los filtrados), color según si deben (rojo moroso, naranja debe, verde al corriente); al tocar uno se abre su ficha.
   - Datos de ejemplo: agregar ~20 clientes inventados (tiendas y fruterías de Xalapa y Banderilla, con días, chofer, deudas y cajas variadas) para probar; sin cambiar la ruta de hoy de la demo.
   - Con tablet (punto 1): la lista en 2 columnas.
12. Cargas → tarjeta del proveedor: botón "Registrar lo que le debo" (1 nov), para deudas que no vienen de una carga registrada (ej. cargas de antes de usar la app, fruta que se llevó sin registrar, dinero que nos prestó).
   - Pide: monto, concepto (texto corto con sugerencias: "Carga anterior", "Fruta sin registrar", "Préstamo", "Otro"), fecha y "¿Cuándo se le paga?" (fecha / en la siguiente carga / sin fecha fija, igual que el punto 8).
   - Se suma a "Debes a proveedores" (Inicio → Finanzas) y a "Por pagar"; aparece en la tarjeta del proveedor como "Deuda pasada" y se abona con el mismo pago a proveedor de 3 pasos (primero lo más viejo).
   - Se puede corregir o borrar (con confirmación) y queda en el historial de cambios con quién la registró.
13. Gastos → Fijos (1 nov): cuando un gasto fijo ya se pagó en este periodo, su tarjeta se hace CHIQUITA (un renglón): ícono · nombre · monto · ✓ "Pagado el 3 nov"; al tocarla se abre completa (para ver historial o deshacer). Los pendientes quedan grandes y arriba; los pagados abajo, agrupados en "Ya pagados este mes (4)".
   - Ícono por tipo, se escoge solo por el nombre (y se puede cambiar al crear/editar): Luz → rayo/foco; Agua → gota; Teléfono e internet / planes y recargas de celular → teléfono; Renta → casa; Gas → flama; Seguro de vehículos → escudo con carrito; Sueldo / retiro del dueño → persona con billete; Báscula / calibración → báscula; Mantenimiento → llave; Otro → recibo.
   - La palomita verde junto al nombre en los pagados; en los vencidos, el ícono en rojo.
14. Sugerencias (1 nov): al aceptar una sugerencia que cambia un dato (ej. "Sube el costo por desgaste del Freightliner"), hoy se aplica sin mostrar dónde. ARREGLO:
   - Antes: confirmación con el cambio exacto ("Desgaste por km del Freightliner: $0.60 → $0.75").
   - Después: te lleva a donde quedó (la tarjeta del vehículo abierta, con el dato resaltado en amarillo unos segundos) y un aviso con "Deshacer".
   - Mismo comportamiento para todas las sugerencias que cambian algo (precios, metas, vehículos, clientes, gastos): cada una dice a qué pantalla te lleva ("Ver en Vehículos ›").
15. Ajustes → "Impresora de tickets" (1 nov). Todavía no tienen impresora: por ahora SOLO dejar el apartado en Ajustes; la conexión real queda para la VERSIÓN FINAL (APK).
   - En la vista previa: tarjeta "Impresora de tickets" con "Agregar impresora (Bluetooth)", tamaño de papel 58 mm / 80 mm, "Imprimir ticket después de cada entrega" (sí/no) y "Imprimir prueba"; con la nota "Se activa en la app final". El ticket es el mismo que hoy se genera como imagen para WhatsApp.
   - Nota técnica para el APK: la mayoría de las impresoras térmicas baratas usan Bluetooth clásico, que el navegador no puede usar; por eso va en el APK.
   - (1 nov) En la ruta / nota de entrega NO mostrar nada de imprimir mientras no haya una impresora agregada en Ajustes. Solo cuando haya impresora aparece el botón "Imprimir ticket" (junto a compartir por WhatsApp).
16. Ruta de reparto, barra de abajo (1 nov): hoy queda Ruta · Entrega · Cierre · Viaje · Gasto. CAMBIAR a: Ruta · Entrega · GASTO (en medio) · Viaje · CIERRE (orilla derecha).
17. Botón Gasto de la ruta (1 nov): falta "Combustible". En la ventana de gasto agregar Combustible como PRIMERA opción; al escogerlo pide lo de una recarga: tipo según el vehículo del día (Magna/Premium/Diésel, ya escogido), precio por litro (último de ese vehículo, editable), litros, total (se calcula solo) y foto del ticket. Se guarda como RECARGA de combustible (para que cuente en el cálculo de rendimiento y en el cierre), no como gasto suelto, y se descuenta del efectivo de la ruta.
18. Chofer con mucho efectivo (1 nov): cuando el efectivo que trae de la ruta pase de $5,000 (el mismo límite que ya existe en Ajustes y que hoy solo le avisa al administrador "conviene recogerlo"), al CHOFER le sale un recordatorio suave, solo como consejo: "Traes más de $5,000. No traigas todo el dinero en un mismo lado: sepáralo en dos o tres lugares."
   - Aparece como aviso flotante unos segundos al guardar la entrega que lo hace pasar de $5,000, y otra vez cada $5,000 más (10,000, 15,000…); no bloquea nada y se puede cerrar.
   - No muestra cuánto trae exactamente en el aviso (por si alguien ve la pantalla). Con chofer nuevo usa la mitad del límite, como ya lo hace el aviso del administrador.
19. Cierre que recibe el administrador (1 nov): agregar sección "Precios de mayoreo que dio el chofer": solo las ventas donde el CHOFER puso mayoreo a mano (no los clientes que el administrador ya tiene marcados con mayoreo, ni el mayoreo automático por más de 10 cajas).
   - Por cada una: cliente, cajas y kilos, precio que dio (caja / kilo) contra el precio normal, y cuánto se dejó de cobrar ("Tienda Don Beto · 12 cajas a $230 (normal $260) · −$360").
   - Total dejado de cobrar por mayoreo. En rojo si quedó por debajo del costo.
   - También en el historial de cierres y en la ficha del cliente ("Le dieron mayoreo: 1 nov, $230 la caja, Danu"), con un botón para "Dejarle siempre precio de mayoreo" si al administrador le parece bien.
   - CAMBIO (1 nov): que salgan TODOS los mayoreos del día, separados en tres grupos con su subtotal: "Lo dio el chofer a mano" (resaltado, arriba) · "Cliente con mayoreo fijo (lo pusiste tú)" · "Automático por más de 10 cajas". Cada renglón igual: cliente, cajas/kilos, precio contra el normal y lo dejado de cobrar; total general al final.
20. Mayoreo automático por más de 10 cajas (1 nov): ya NO se aplica solo. Cuando el chofer deja más de 10 cajas a un cliente que NO tiene mayoreo fijo, en "¿Qué le dejas?" aparece la pregunta "Lleva más de 10 cajas: ¿precio de mayoreo o normal?" con los dos precios y el total de cada uno. Es obligatoria (si no escoge, se marca en rojo como el punto 5).
   - Ayuda para decidir, debajo: qué tan seguido compra ("Compra seguido: 6 veces este mes" / "Cliente esporádico: 1 compra en 2 meses"); viene marcada la opción sugerida: frecuente → mayoreo, esporádico → normal (el chofer puede cambiarla).
   - Ajustes → "Mayoreo por más de 10 cajas": Preguntar al chofer (predeterminado) · Siempre mayoreo · Nunca automático (solo clientes con mayoreo fijo).
   - En el cierre (punto 19) el grupo "Automático por más de 10 cajas" dice además si lo escogió el chofer.
21. ERROR (1 nov): después de registrar el efectivo del cierre del chofer y confirmar ("se recibió el efectivo"), al volver a Inicio SIGUE la tarjeta "X mandó su cierre" con el círculo rojo parpadeando, y al tocarla deja registrar el efectivo otra vez.
   DEBE SER: al registrar el efectivo desaparecen la tarjeta y el puntito; el cierre ya solo se ve en "Cierre de caja" (desglose). No debe poderse registrar dos veces (si se abre, muestra "Efectivo recibido: $X el 1 nov, 18:40").
   Nota: en una prueba rápida con Danu sí desapareció; revisar con Rafa, con la demo de cambiar de chofer, con segundo cierre ("Otra vuelta"), en la PWA instalada y desde el botón de la tarjeta del Inicio. Quitar también la tarjeta "Cierre de X recibido" del Inicio.
   - CAUSA según el usuario (1 nov): pasa cuando el efectivo a recibir era $0. Revisar todo lugar que tome "recibido $0" como "no recibido" (un 0 que se lee como vacío). Además: si el cierre trae $0 de efectivo por entregar, la tarjeta dice "Danu mandó su cierre · no hay efectivo por recibir" con un solo botón "Enterado" que lo cierra (sin pedir cantidad); si el chofer sí trae dinero aunque debía $0, se puede registrar como sobrante.
   - (1 nov) "Efectivo que recibiste" vacío al confirmar → igual que el punto 5: el campo en rojo, se sacude, "Falta: cuánto efectivo recibiste", y NO se cierra. Si se escribe $0 cuando debía entregar más: confirmación "¿Recibiste $0? Se le anota un faltante de $X a Danu" antes de cerrar. Mismo trato al recibir el corte de venta local.
22. "Mi ruta de hoy" del administrador (1 nov): al tocarla, primero "¿Vas a salir a repartir hoy?" Sí / No.
   - Sí → todo como ahora.
   - No → "¿Qué hacemos con tus N clientes de hoy?": 
     · Repartir entre los choferes disponibles (automático, por cercanía a sus rutas) — predeterminado.
     · Pasárselos todos a un chofer (escoger cuál).
     · Escoger cliente por cliente a quién va (o "dejar para mañana").
     Se ve antes de confirmar cómo quedaría cada ruta: clientes, cajas y kilos, y a qué hora terminaría.
   - Revisión de saturación (antes de confirmar): con la hora de salida, tiempos entre clientes y en cada parada, si algún chofer terminaría muy tarde (después de las 20:00 o del horario de cierre de sus clientes) o si no le cabe la carga en su vehículo → aviso "Probablemente a Danu no le dé tiempo: terminaría ~21:10" con ACCIONES:
     · Repartir entre los dos choferes (si hay otro disponible).
     · Pasar a mañana los clientes que menos urgen (sugeridos: sin pedido, sin prioridad, que compraron hace poco) — con mensaje de WhatsApp listo para avisarles.
     · Salir tú solo a unos cuantos (sugiere los que más le sirven quitarle al chofer).
     · Usar un vehículo más grande o llevar más carga si el problema es espacio.
     · Dejarlo así de todos modos.
   - Al confirmar, al chofer le llega el aviso "El administrador te pasó 2 clientes: …" (como el cambio de ruta que ya existe) y se reacomoda su orden. El administrador puede deshacerlo mientras el chofer no haya salido.
23. Ticket / nota de entrega cuando reparte el administrador (1 nov): en "Entregó" dice "Administrador". Debe decir el nombre del administrador que está usando la app (Ricardo Nieto o Ricardo Mejía; si es el encargado, su nombre). CAUSA: la ruta del administrador usa un "chofer" interno llamado "Administrador". Cambiar en TODOS los lugares de su ruta: ticket/imagen y texto de WhatsApp, saludo "Hola, …", historial de cambios, avisos ("… registró un gasto"), cierre, ubicación en el mapa y estadísticas de ventas por chofer.
24. Entrega (chofer): errores al guardar que no se ven (1 nov). Ej.: dejar más kilos de macho (o cajas) de los que trae el camión → al tocar "Guardar entrega" no guarda y el aviso "Solo traes 20 kg de macho en el camión" queda hasta abajo; si subió la pantalla no lo ve.
   ARREGLO:
   - Revisar ANTES de abrir el resumen; si hay error, no abre el resumen: lleva la pantalla al campo con el problema (Kilos de macho), lo pone en rojo y lo sacude (punto 5), con el texto pegado al campo: "Solo traes 20 kg de macho en el camión".
   - Aviso en vivo: en cuanto escribe o sube más de lo que trae, el campo se pone rojo con "Solo traes 20 kg" y el botón "+" ya no sube más.
   - La barra fija de abajo cambia a rojo con "Revisa: kilos de macho" mientras haya error.
   - Igual para todos los errores de la entrega: pagó más que el total, pasa el límite de crédito, precio de mayoreo menor al mínimo, falta nombre al registrar cliente, falta escoger mayoreo/normal (punto 20).

## v3.6 PUBLICADA (1 nov)
Los 24 puntos hechos. Pruebas: 49 nuevas + las de v3.4/v3.5, todas pasan; sin textos cortados ni tarjetas encimadas a 360, 412, 600, 800 y 1280 px.
Notas: en el mapa de clientes, tocar un punto aún no abre la ficha (debajo del mapa va la lista numerada que sí la abre). Los clientes pasados a un chofer que no es el de la demo se aplican cuando se cambia a ese chofer.

## Para la v3.7 (análisis 1 nov — sin publicar)
Revisión automática: 561 botones tocados en todas las pantallas de los 4 roles; 0 errores de programa.
1. Ajustes: TODOS los botones regresan la pantalla hasta arriba (letra, modo sencillo, tema, vibración, sonido, mayoreo, papel, impresora, inspecciones Agregar/Quitar, ver quejas). Causa: al redibujar solo se guarda la posición en viaje y cuenta del vehículo. Arreglo: guardar la posición de toda ventana que se desliza.
2. Igual en: ficha del vehículo → "Editar" (baja 1386 → 0). Revisar también "Venta rápida" y "Reportar incidente" en la ruta.
3. Ajustes desordenado: hay una sección "Ajustes" dentro de Ajustes; "Letra normal/grande" y "Modo sencillo" están a media pantalla, lejos de "Forma de la pantalla" y el tema; bajo el título "Avisar cuando quede poco (fruta madura)" salen RFC, teléfono, dirección, correo y precio de caja vacía (mal agrupado).
4. Entrega: "De esas, cuántas vienen rotas" muestra "undefined" en vez de 0.
5. Dinero negativo se ve "$-7,512" (ganancia en Estadísticas y Resumen del contador) y en otros lados "−$23,283". Unificar a "−$7,512" en rojo.
6. Fechas: "Pagado Hoy miércoles", "del Hoy miércoles", "Encargado del Hoy … al Mañana …". Usar minúscula y sin pegar ("pagado hoy", "desde hoy").
7. Se dice "Chofer" en casi toda la app pero "repartidor" en 4 lugares ("Mejor repartidor", "Eres el repartidor más cercano"…). Unificar a "chofer".
8. Código viejo sin uso (gastosViejo con botón "Guardar gasto" sin acción). No se ve, pero quitarlo.
9. "Fija el precio de hoy" al abrir la app: color más llamativo (rojo).
10. Pantalla ancha, Inicio → Finanzas: las cifras quedan en una columna y el botón "Mostrar" en otra. Que siempre vayan juntos (la tarjeta no se parte entre columnas).
11. Quitar el dibujo de plátanos de fondo en las tarjetas ("parecen puntas amarillas").
12. Barra flotante de abajo (Inicio, Bodega…): colores más sólidos; al tocar, el ícono salta y da una vuelta.
13. Deslizar a la izquierda/derecha desde cualquier pantalla = pasar a la sección de al lado de la barra.
14. Lo mismo (barra flotante, animación, deslizar) en la app de ruta y en viaje; la barra aparece/desaparece según se desliza.
   Respuestas (4 nov): precio → toda la tarjeta late en rojo; fondo de plátanos → cambiar por un ícono más bonito; barra → se esconde al bajar y regresa al subir; deslizar → en toda la pantalla menos encima del mapa, listas que se deslizan y gastos.

## v3.7 PUBLICADA (4 nov)
Los 14 puntos hechos. Pruebas t37: 29 de 29 pasan. Revisión: 561 botones sin errores; Ajustes ya no salta. Subida a GitHub (5724ee3).
Dudas / sugerencias para la v3.8:
- Deslizar también funciona dentro de Entrega y Cierre (se puede salir sin querer a media entrega; lo escrito no se pierde). ¿Bloquearlo ahí?
- El círculo oscuro con flecha "hay más abajo" tapa texto; con la barra que se esconde ya casi no hace falta. ¿Quitarlo?
- Entrega: "Debe 3" y abajo "Cajas vacías que seguiría debiendo 5" confunde. Cambiar a "Ya debía 3".
- Entrega: "rotas" se ve con número fijo y "devuelve" con cajita para escribir; dejarlos iguales.
- Ajustes: hay dos precios de caja ("Cobrar por cada caja" y "Valor de cada caja en tus bienes"). ¿Son distintos de verdad o uno solo?
- Letra grande y Modo sencillo se guardan para todo el negocio (S.cfg), no por aparato como vibración/sonido. ¿Por aparato?

## Para la v3.8 (revisión a fondo, 4 nov)
Pedido por Ricardo: en las referencias poner el parentesco; no todos son choferes, hay empleados.
Personal: título "Choferes" → "Personal"; puesto (chofer, ayudante, bodega, venta local, otro); el admin "(yo)" sale como chofer con expediente incompleto; faltan teléfono del empleado, dirección, INE, fecha de entrada, contacto de emergencia; licencia solo para choferes y con fecha de vencimiento + aviso.
Números que no cuadran: ganancia semana pasada $4,891 (Resumen del lunes) vs $3,260 (Resumen de la semana); ganancia del mes −$7,512 (Meta) vs −$6,650 (Utilidad contable); "debes a proveedores $0" vs "fruta que todavía debes $9,458"; margen de la caja 27% / 22% / 33.6%; fijos del mes $26,215 (contador) vs $23,283 (estadísticas); sueldo del dueño día 15 (contador) vs sáb 31 (gastos); km del cierre "recorrió 90 km" vs "~56 km según tu ruta".
Inicio repetido: Luz sale 2 veces en Avisos; cobranza en "Qué hacer hoy" y "Cobrar hoy"; "Te deben los clientes" 3 veces; "Fruta para los próximos días" vs "Te alcanza la semana" en Cargas.
Textos: Pedro Mota (macho) "0 cajas de roatán"; historial de viajes pegado "$3,9522026-10-17" y fechas sin formato; "Combustible (combustible)"; "Debe 1 cajas"; "Se cambian en Ajustes, al final de Inicio" (ya no está ahí); Don Beto "Paga rápido" pero debe hace 9 días; pill "Revisar" en vehículos sin explicar.
Chofer: tipos de gasto distintos a los del admin (Estacionamiento / Reparación o ponchadura vs Ponchadura o falla, Carburo, Bodega); recarga "se paga con la cuenta y se descuenta del efectivo" (contradice); pestaña Viaje dice "No tienes viajes" y abajo muestra uno sin teléfono ni dirección.
Local: roatán $9/kg y macho $12/kg (en ruta macho $18). ¿Correcto?
Contador: Resumen empieza con el crédito de la Nissan; sueldos pagados solo de Danu.

## v3.8 PUBLICADA (4 nov)
Hecho todo lo de "Para la v3.8". Personal con puesto (chofer, ayudante de ruta, bodega, venta local, otro), teléfono, dirección, INE, fecha de entrada, licencia con vencimiento y aviso, referencias con parentesco y contacto de emergencia. Ejemplo nuevo: Chava Morales (bodega). Los que no son choferes no salen para asignar viajes ni rutas.
Números iguales: ganancia semanal (una sola tarjeta "Resumen de la semana pasada"), ganancia del mes = utilidad contable, margen de la caja con el precio de hoy, km del cierre, fijos prorrateados con su explicación, sueldo del dueño quincenal.
Pruebas t38: 33 de 33. Revisión: 555 botones sin errores. GitHub actualizado.

## Para la v3.9 (4 nov, NO publicar ni preview hasta estar seguros)
- Tarjetas de vehículos y de empleados muy largas y confusas; sin quitar información. (preguntar forma)
- Al abrir un vehículo: la placa dibujada con el formato de Veracruz (foto de ejemplo). La del M2 es de Guerrero.
- Rellenar TODOS los datos que falten en la demo (vehículos, empleados, clientes, proveedores…) para ver la app completa.
- Cuentas y números 100% seguros: que siempre cuadren.
- Venta local: SÍ puede ser más barata que en ruta, porque ahí se remata la merma (solo en ese canal).
- Fondos: imagen de plátanos (reemplaza mi ícono), imagen de caja para la sección de cajas, e imágenes para cada tarjeta de Finanzas (efectivo, ingresos, gastos, te deben, debes a proveedores). Usar solo el dibujo, sin el fondo.
Respuestas (4 nov):
- Fichas de vehículo y empleado: pantalla propia con pestañas (placa arriba, una parte a la vez).
- Placa del M2: Ricardo manda foto de una placa de Guerrero (esperar).
- Cuentas: las dos cosas, revisión automática dentro de la app con aviso si algo no cuadra + pruebas antes de publicar.
- Venta local: su propio precio, lo fija el admin (puede ser menor por remate de merma).
- Idea de Ricardo (4 nov): todo lo que lleve mucha información va en su propia pantalla con tarjetas/pestañas. Propuesta: vehículo, empleado, cliente, proveedor, carga, y Ajustes de vehículos/inspecciones. Se quedan igual: entrega, cierre, gasto rápido y venta local. En tablet: lista a la izquierda y ficha a la derecha. Dentro de una ficha, deslizar cambia de pestaña. (esperando confirmación)
- Idea de Ricardo (4 nov): si sale de una pantalla a medio llenar, preguntar: "Guardar para seguir después" / "Borrar lo que llenaste" (+ "Seguir llenando"). Propuesta: borradores no cuentan en ninguna cuenta hasta guardarse; aviso "Tienes X sin terminar" con botón para continuar; se guardan solos si se cierra la app o se apaga el teléfono; el cierre del chofer avisa si quedó una entrega sin terminar; preguntar solo si cambió algo. Aplica a entrega, registrar carga, viaje, gasto, cliente/empleado/vehículo nuevo o editado, venta local, cierres. (esperando confirmación)
- Revisión de pantallas de captura (4 nov), propuestas:
  Reglas para todas: mismo estilo de captura (+/− iguales, teclado numérico, fechas con Hoy/Ayer), formularios largos por pasos con barra de avance, botón Guardar fijo abajo y sin barra de secciones mientras llenas, obligatorios marcados, valores sugeridos, resumen antes de guardar, borrador.
  Entrega: total sale 4 veces → una; "Debe 3 cajas" repetido; rotas con otro estilo; "seguiría debiendo 5" confuso; barra de secciones encima de la barra de Guardar; botón "Lo mismo que la vez pasada"; foto de fachada solo si no tiene.
  Cierre del chofer: muy largo; aguja del tanque y 8 botones hacen lo mismo; "Ventas del día / Entregas" confuso → 4 pasos (vehículo, dinero, cajas, fotos) + resumen.
  Ruta del chofer: botones de demo mezclados (probar exceso, simular llamada); "Registrar un gasto" y "Recarga de combustible" repiten el botón Gasto.
  Registrar carga: bien; íconos emoji distintos al resto. Viaje de carga: 29 pasos → ~8.
  Vehículo nuevo: ~45 campos en una sola hoja → 5 pasos; solo nombre, placas y combustible obligatorios.
  Cliente: se edita dentro de la lista de 27 → en su ficha; horario con botones.
  Venta local: producto en lista desplegable → botones grandes.
  Bodega: madurar, merma, compra de cajas y conteo todos apilados → cada uno su botón que abre su hoja.
  Técnico: el archivo no declara la codificación (en pruebas a veces salía "PlÃ¡tanos"); agregar meta charset.
- Revisión de colores (4 nov): base bien (texto 15:1, gris 8:1, modo oscuro bien). Problemas: pestañas Bodega (#C99A06) y Cargas (#E07B1A) con letra blanca 2.6 y 3.0 (mínimo 4.5) → oscurecer; 8 colores en la barra le quitan significado al color (Gastos en rojo parece alarma); rojo de más en Inicio (Avisos todo rosa aunque sean informativos, precio rojo, tarjetas de finanzas rojas); "Gastos de hoy" rojo aunque sea normal; depende mucho de verde/rojo (daltonismo ~8% de hombres) → siempre con ícono o palabra; el pulso del precio baja a 3.9. Propuesta: rojo = urgente/vencido, naranja = atención/pronto, verde = bien, azul = información, gris = normal; avisos con su color según nivel; barra con un solo color de marca (o colores más oscuros); "modo sol" de alto contraste para el chofer (opcional).
  Respuesta: barra con varios colores, pero más oscuros (que la letra blanca se lea, contraste ≥4.5). Colores por significado: sí.
- Respuestas (4 nov, ronda 2):
  - Correcciones de dinero: nunca se borra; se ANULA con motivo (quién, cuándo, por qué) y se registra el correcto.
  - Entrar: PIN de 4 números por persona; también para cosas de dinero grandes (anular, pagar sueldo, cerrar caja).
  - Chofer puede corregir su entrega ya guardada; al admin le llega aviso, NO requiere aprobación.
  - Cierre de caja obligatorio: si no se cerró ayer, hoy lo pide antes de todo.
  - Funciona sin señal. Ricardo pide: si el admin cambia la ruta y el chofer/empleado no tiene conexión, avisar al admin "X no tiene conexión, sus cambios no los verá aún"; pensar en anomalías de inventario al sincronizar. Normalmente son minutos, exagerado 2–3 horas.
  - Resumen diario por WhatsApp y modo sol: NO por ahora.
- Respuestas (4 nov, ronda 3):
  - Pagos: solo efectivo.
  - Descuentos del chofer: ya está cubierto con el mayoreo (no repetir).
  - Facturas: por ahora no; dejar la opción para más adelante (solo clientes grandes, p. ej. Walmart o Chedraui).
  - Sin señal: mostrar desde qué hora no tiene señal (y última ubicación), cambios que aún no le llegan ("pendiente de llegar a X"), aviso si pasa de 1 hora. (No pidió el resumen de lo subido al volver.)
- Respuestas (4 nov, ronda 4):
  - Clientes grandes: por ahora NO mostrar nada (orden de compra, plazo largo, cita, datos de factura quedan para después). Solo agregar Walmart como cliente en la lista, guardado, sin entregas ni ruta.
  - Una sola calidad de plátano.
  - Dos admins cambian lo mismo: gana el último y al otro le sale aviso ("Ricardo cambió el precio a $265 hace 1 min").
  - Arranque: una semana a la par de la libreta. Además, la PRIMERA VEZ que se use la app debe salir un asistente con lo básico para arrancar: cajas vacías, llenas verdes, en maduración, macho (kilos aprox.), vehículos, clientes, etc.
  - Vehículos: las imágenes de las camionetas y el camión quedan como imágenes por defecto para escoger; se pueden agregar más. La placa dibujada se actualiza sola al cambiar el número.

## v3.9 HECHA (4 nov) · SIN PUBLICAR (esperando a Ricardo)
Todo lo de "Para la v3.9": fichas con pestañas (vehículo, empleado, cliente, proveedor, carga), placas Veracruz/Guerrero dibujadas, captura por pasos (vehículo 4, cierre 4), borradores, revisión automática de cuentas (16 revisiones), anular con motivo, PIN (demo 1234 y se puede saltar), cierre de caja obligatorio, sin señal (Rafa de ejemplo), dos admins, Walmart, datos completos, imágenes, colores por nivel, barra más oscura, venta local con precio propio ($12/$16).
Dos demos: prototipo-platanos.html (con datos) y platanos-primera-vez.html (asistente de 8 pasos + tutorial animado admin y chofer).
Errores de números encontrados y corregidos:
- La caja contaba el dinero que todavía traía el chofer y no restaba sus gastos; al empezar un 2º cierre se perdía el 1º; los faltantes se contaban doble. Ahora el dinero entra a la caja cuando se recibe (y se ve aparte "lo trae el chofer").
- Deshacer el pago de un gasto fijo no lo regresaba: al volver a pagar se contaba dos veces. Ahora se anula.
- Pagar una deuda anotada a mano a un proveedor bajaba la deuda pero el dinero no salía de la caja.
- Al confirmar un abono desde una ficha se perdía el monto.
- Cajas que desaparecían: fruta tirada, cajas abiertas en venta local y cambios por fruta en mal estado (las cajas regresan vacías). Cobrar cajas a un cliente ahora pone fecha a su deuda.
Pruebas: números 60 + 23, nuevas 70, todas pasan; 538 botones (demo con datos) y 333 (primera vez) sin errores.

## v3.9 PUBLICADA (4 nov)
Respuestas de Ricardo antes de publicar:
- PIN: ya no se pide al cobrar o pagar (solo se confirma). Funciona como candado: se vuelve a pedir tras 5 min sin usar la app (admin y contador) o 30 min (chofer y venta local). El toque que la bloquea no hace nada más; al poner el PIN sigue donde iba. Los avisos de abajo (con Deshacer) no salen encima del candado.
- El cierre de caja ahora también se confirma ("contaste X, la app esperaba Y").
- Placa de las NP300: Automóvil (ya estaba así).
Publicada: demo con datos en el link de siempre (Version 40) y demo de primera vez en link nuevo (https://claude.ai/artifact/9iH1d12P2U5CqNdVJVNubC). PWA v3.9 en GitHub (commit 3467a98, caché platanos-v3.9).
Pruebas: 60 + 23 de números, 75 de lo nuevo, 538 y 333 botones sin errores.

## Para la v4.0 (errores que encontró Ricardo en la v3.9) · NO HACER hasta que diga "haz la preview"
1. Vehículos, placa más grande que la foto:
   - Ficha: foto grande (más alta) arriba; placa chica abajo junto al nombre, año, color, combustible y km.
   - Lista: foto más grande, placa dibujada más chica.
2. Fichas: al cambiar de pestaña se regresa hasta arriba (el #fiov se vuelve a crear y no guarda su scroll). Decidido: pestañas pegadas arriba al bajar; al cambiar, la otra pestaña se ve desde su inicio sin volver a la foto.
3. Ficha del vehículo: que quepan las 5 pestañas (Crédito quedaba escondida a la derecha).
4. Barra de abajo parpadea al tocar "Mostrar" en Finanzas. Causa: cuando la barra está escondida (bajaste), cada vez que la pantalla se refresca la barra se crea visible y luego se vuelve a esconder con animación. Pasa con cualquier botón, no solo Mostrar. Arreglo: crearla ya escondida, sin animación; vuelve a salir al subir.
5. Fondo de foto en tarjetas de vehículos (lista): foto borrosa de fondo con velo crema (oscuro en modo oscuro), la foto chica nítida se queda a la izquierda; guardar la foto ya borrosa para que no se alente. (Pendiente: ¿también arriba dentro de la ficha?)
6. Tocar cualquier foto (vehículo, INE, licencia, póliza, fachada, báscula…) la abre en grande: fondo negro, zoom con dos dedos, cerrar con ✕ o deslizando hacia abajo.
7. Dibujo de la caja: Ricardo quiere que vaya literalmente al lado de la palabra "Cajas", no de fondo. Se ve borroso porque está al 30% de transparencia y la imagen es chica (280 px) estirada en pantallas de alta resolución. Hacerla ícono nítido al 100%, sacada del dibujo original con más resolución.
   Corrección de Ricardo: no es por la transparencia, se ve borrosa de BAJA RESOLUCIÓN. Todas las imágenes sacadas de sus dibujos quedaron a 280 px (caja, plátano, efectivo, ingresos, gastos, deben, proveedores). Los originales miden hasta 2576 px (v39/img/*.jpg): volver a recortarlas a ~3x del tamaño en pantalla (mín. 360–480 px), WebP de buena calidad o PNG.
8. Dibujo del plátano: también como ícono al lado de su título (no de fondo), nítido.
9. Logo para el ticket (v40/img/logo-ticket.jpg, 2000 px, línea verde sobre crema: "PLATANOS NIETOS · Calidad que ya conoces", camión + caja con plátanos). SOLO para el ticket/nota, en ningún otro lado. Arriba y centrado. En el ticket compartido se ve en verde; para impresora térmica, versión en negro sobre blanco (sin el fondo crema).
10. Llantas y frenos en la ficha del vehículo: ya no exacto ("12,345 km restantes"). Mostrar km aproximados (redondeados) + tiempo estimado según los km que hace ese vehículo al día: "Faltan unos 12,000 km · como 5 meses". Solo por km (NO por edad de las llantas). Mismo formato para frenos. El aviso de "ya toca" se queda igual.
11. Revisión de "se sube solo hasta arriba" (v40/scroll.js + r5.js, 473 toques):
   a) TODAS las fichas al cambiar de pestaña (vehículo, empleado, cliente, carga, proveedor). → pestañas pegadas arriba (punto 2).
   b) Avisos de Inicio (y botón "Ir" del aviso urgente) que no tienen a dónde llevar: tocas y solo se sube hasta arriba de Inicio. Son: Falta pagar Luz (gasto fijo) → Gastos/fijos; Mensualidad de vehículo → ficha del vehículo, pestaña Crédito; Le toca verificar / cambio de aceite → ficha, Papeles/Taller; Toca calibrar báscula / Vence extintor → donde están los bienes; Licencia de Rafa vence → ficha de Rafa; Rafa sin señal → su ruta/ficha. Revisar avDestino para que cada aviso abra su lugar exacto.
   c) Ficha de empleado → "Editar datos" se sube hasta arriba. Que se quede donde estaba (o lleve al dato).
   d) Normales (pantalla nueva, se queda arriba): Modo manejo, Reportar incidente, paso siguiente del cierre.
12. Tutorial: si estás en otra pantalla, la manita y el globo se ponen encima de lo que estás viendo, no de lo que explica. Arreglo: cada paso del tutorial primero lleva a la pantalla correcta (p. ej. Inicio), baja hasta lo que explica y luego lo marca; al terminar regresa a donde estabas.
13. Ruta (chofer): si por error entras al Cierre, no hay cómo salir (solo deslizando, poco intuitivo). Poner botón "← Volver a la ruta" arriba del cierre (y en cualquier pantalla sin barra de abajo). Revisar que en todas las pantallas del chofer haya cómo regresar.
14. Cada vez que se abre la app y se pone el PIN: animación corta (manita deslizando a los lados, ~2 s, se quita al tocar) que recuerda que se puede pasar entre pantallas deslizando. Para admin y chofer.

## v4.0 HECHA (5 nov) · SIN PUBLICAR (esperando a Ricardo)
Puntos 1–14 hechos. Extras: fotos de los papeles (póliza, tarjeta, verificación) ahora se ven en la pestaña Papeles; el recordatorio de deslizar espera a que se cierre lo que esté encima.
"Editar datos" del empleado se queda como pantalla nueva (empieza arriba), igual que Modo manejo, Reportar incidente y el siguiente paso del cierre.
Fondo borroso solo en la lista (no se respondió si también arriba en la ficha).
Pruebas: v4.0 61/61, números 60+23, v3.9 75/75, botones 538 y 333 sin errores; revisión de saltos: solo quedan pantallas nuevas.
Fuentes: v40src/ (l1–l9, build.sh, t40.js). Respaldo: v40.bak.html y v40-vacio.bak.html.

## v4.0 PUBLICADA (5 nov)
Demo con datos: Version 41 (link de siempre). Primera vez: Version 2 (https://claude.ai/artifact/9iH1d12P2U5CqNdVJVNubC). PWA en GitHub commit ca928f2, caché platanos-v4.0.
Fondo borroso: Ricardo lo dejó a mi criterio → solo en la lista (en la ficha la foto ya es grande, el fondo estorbaría).

## v4.0 · cambios después de publicar (5 nov, SIN PUBLICAR · "aún no publiques nada")
- Asistente: el aviso "Falta llenar" quedaba DETRÁS de la pantalla (z 80 = 80). Ventanas de aviso 88 y confirmar 87, encima de todo. Si llenas un vehículo/persona/cliente/proveedor y tocas Siguiente sin "Agregar", se agrega solo; si falta el combustible, lo dice.
- Comas en cantidades: las ventanas que se ponen encima (cierre de caja de ayer, asistente, fichas) no tenían formato; ahora fmtInputs() corre al final de todo.
- Bienvenida animada (primera vez): camión tipo Freightliner M2 llega, caen 3 cajas, nombre + "Tus cajas, entregas, cobros y lo que te deben, en tu celular." ~4 s, se salta tocando.
- Logo: uno para la app y otro para el ticket; si solo hay uno, se usa para los dos; opción de ticket sin logo. En el paso 1 del asistente y en Ajustes. Con logo propio el ticket sí escribe el nombre.
- Bodega (asistente): ¿cuándo se sacan de madurar? En cuántas horas o día y hora, para roatán y macho (antes preguntaba cuántas horas llevaban y el macho usaba las horas del roatán).
- Vehículos: tus fotos (NP300 y M2) primero, luego dibujo de camioneta y de camión (se quitaron 2 dibujos repetidos), y "Tomar o subir foto".
Pruebas: t40 61, t40b 18, p8 5, números 60+23, t39f 75, botones 538 y 334 sin errores.
- Escribir sin brincos: render guarda scroll (ventana y ventanas encima) y el campo tocado; tras redibujar regresa ahí y pone el cursor en el campo tocado. Si el teclado tapa el campo, sube solo lo necesario y suave. Revisión (v40/inputs.js): 96 pares de campos en las dos demos; solo quedan casos donde el contenido cambia de verdad (p. ej. al escribir el abono aparecen renglones arriba).
- "Falta llenar" (rojo): la animación se repite cada vez que tocas Siguiente.
- Bienvenida con el dibujo nuevo de Ricardo (camión M2 + cajas, recortado de su imagen; el texto va aparte, su imagen traía "lo quedeben").
- Logo nuevo del ticket (camioneta con lona).
- Finanzas: dibujos blancos al 30% para que se lea el texto.
- Transiciones: ventanas (ficha, carga, viaje, ajustes, asistente) entran suave; cambio de pantalla/pestaña/paso con desvanecido corto; menús que se despliegan abren suave. No se anima al solo actualizar.
- PUBLICAR: demo de siempre → artifact de siempre + repo platanitos. Primera vez → artifact 9iH1d12P2U5CqNdVJVNubC + repo NUEVO https://github.com/reptileckz-jpg/Primera-vez.git (solo la app de primera vez).
Pruebas: t40 61, t40b 18, t40c 10, p8 5, números 60+23, t39f 75, botones 538/334 sin errores.

## v4.0 PUBLICADA otra vez (5 nov 13:25)
Demo de siempre: Version 42 + platanitos commit 16e4792. Primera vez: Version 3 + repo nuevo Primera-vez commit 9cac9ff (index, sw con caché primera-vez-v4.0, manifest "Primera vez", íconos, README).
Los dos sw ahora solo borran su propia caché (están en el mismo sitio de GitHub Pages).
PENDIENTE de Ricardo: activar GitHub Pages en Primera-vez (Settings → Pages → rama main, carpeta raíz); no tengo permiso desde aquí.
- Corrección: el index.html de Primera-vez no traía <script>window.PN_MODO="vacio"</script> (va antes del meta que uso para cortar) → salía la demo normal. Agregado, caché primera-vez-v4.0b. OJO en próximas publicaciones: conservar esa línea.

## v4.0 (3) PUBLICADA (5 nov ~14:00)
- La pantalla se subía al tocar una opción (combustible, imagen, estado…): la ventana se volvía a crear. Ahora si sigues en la misma pantalla todo se queda donde estaba (en toda la app). Revisión: 706 toques en las dos demos; solo se mueve al cambiar de paso/pantalla o cuando el contenido se encoge.
- Finanzas: etiqueta con mayúscula, 15px, negritas, sombra suave.
- Bienvenida: ya no avanza sola; botón Comenzar grande que brinca suave; a los 9 s las cajas se caen con el video que mandó Ricardo (Gemini, recortado a 640px sin audio, 176 KB).
- Publicar las PWA con pwa.py (conserva PN_MODO en Primera-vez y sube caché).
- Fondo de tarjetas de vehículos: ya sin desenfoque fuerte; la foto completa a la derecha (64%), poco difuminada y desvaneciéndose hacia el texto; esquinas limpias. Publicado (artifacts 44/5, repos).

## Idea nueva (5 nov 15:50) · QR de clientes y pago con tarjeta · NO HACER hasta que diga
- QR por cliente (no código de barras). Va en una ETIQUETA para pegar en su local; la app la genera para imprimir.
- La app escanea el QR con la cámara (funciona sin internet) → abre la entrega/cuenta de ese cliente.
- Tarjeta: "las dos": AHORA anotar a mano "Pagó con tarjeta" (va al banco, NO a la caja, se resta la comisión); DESPUÉS (con la APK + servidor) conectar la terminal para mandarle el monto.
- La terminal no puede escanear nuestro QR para abrir al cliente (solo apps nativas hechas para la terminal).
- Terminal aún no elegida. Datos abril 2026: Mercado Pago Point 3.5%+IVA (4.06%), dinero al instante, tiene API pública (Orders API); Clip 3.6%+IVA (4.176%); KiWi 3.2%+IVA; BBVA desde 2.15% pero $1,500 afiliación y $359/mes si vendes < $25,000/mes con tarjeta.
- Point Air (nov 2026): chip 4G gratis + WiFi, no necesita celular, sin impresora (comprobante por SMS/correo), $349 en oferta (precio normal $2,999), 3.5%+IVA sin renta. En la documentación para programadores sale 'Point Air 2' como conectable (solo modo SELF_SERVICE): confirmar que la que compren sea la 2. Una por chofer. El ticket lo da nuestra app.
- DECIDIDO (5 nov): la app final (APK) es solo Android; los choferes usarán Android. Impresora de tickets propia (térmica Bluetooth, ESC/POS) desde el Android del chofer; logo en negro. El admin puede seguir usando la versión web en su iPhone (sin imprimir).

## QR de clientes · detalles decididos (5 nov 16:10) · NO HACER hasta que diga
- Impresora de QR: UNA sola. Quién la trae: FIJO en Ajustes (lo cambia el admin).
- Al chofer con la impresora le sale "Falta QR" junto a cada cliente sin etiqueta; a los demás no.
- Al pegar el QR: foto de dónde lo pegó, OPCIONAL. Marcar "QR puesto" (fecha, quién).
- Escanear con la cámara de la app; botón "¿No encuentras el QR?" → foto de dónde lo pegaron + fachada.
- Botón "Imprimir los que faltan" (todas las etiquetas de una vez, con nombre del cliente).
- Fachada: el chofer toma/actualiza la foto; las anteriores se guardan con fecha y se pueden ver.
- El QR solo lleva un código del cliente (nada privado).
- Impresión ahora: compartir la imagen a la app de la impresora; con la APK, directo si el modelo lo permite.
- Impresora sugerida: Brother PT-P710BT (cinta plastificada, aguanta sol/lluvia); económicas Phomemo M110 / Niimbot B1 (térmicas, se decoloran al sol). Ricardo aún no elige.

## PLAN DECIDIDO (5 nov 16:30) · esperar "empieza"
Respuestas:
- QR de otro cliente (no la siguiente parada): avisa y deja seguir.
- Comisión tarjeta: AMBAS por prueba → por cliente se elige "la absorbe el negocio" o "se le cobra al cliente" (+%); por defecto el negocio. Después se quedará todo absorbido.
- Pagos: Efectivo, Tarjeta, Transferencia, Mixto. En pantalla solo Efectivo y Tarjeta grandes; "Otros" abre Transferencia y Mixto.
- Ticket impreso: preguntar cada vez ("¿Imprimir ticket?").
- Guardado y sincronización: servicio en la nube listo (Firebase o Supabase); Ricardo crea la cuenta, yo conecto. Recomendación: Firebase (Firestore guarda sin señal y sincroniza al volver).
- v5: reordenar el código ANTES de la APK (se ve igual, actualiza solo lo que cambia).
- QR NO es prueba de visita: es solo un atajo (otro chofer, o buscar rápido). La ruta ya guía; la prueba es la entrega con su hora.
- Extras de esta tanda: exportar a Excel (contador), quitar confirmaciones que no mueven dinero, reportar "QR dañado", hoja para imprenta en vinil.
Fases propuestas: 1) v5 reordenada (mismas pruebas de números) → 2) funciones nuevas (QR, fachada con historial, tarjeta/transferencia/mixto con comisión, ticket impreso, Excel) → 3) nube y varios celulares → 4) APK Android (impresora ESC/POS directa, Point Air 2 conectada).
- CAMBIO (16:35): comisión de tarjeta GLOBAL (no por cliente), en Ajustes: % (4.06 con IVA) + "la absorbe el negocio / se le cobra al cliente". Si se cobra al cliente: subir 4.23% (100/(100-4.06)) para que llegue completo. La comisión entra como gasto de operación (variable) y baja la ganancia; lo cobrado con tarjeta va a "Banco/Mercado Pago" (no a caja); "Retirar del banco a la caja" como movimiento. Terminal ($349) como gasto único.
- Escala esperada primeros meses: ≤ $3,500/mes con tarjeta (comisión ≈ $142/mes). El fuerte es el efectivo. Demo: poner ventas con tarjeta realistas (~$3,500/mes).
- Cierre del chofer (16:37): en su resumen se muestra lo cobrado con tarjeta (y transferencias) pero NO cuenta como efectivo que entrega. En Caja/Finanzas/Estadísticas: "Efectivo $X" y "En banco / ventas con tarjeta $Y" separados (y total).

## Ideas por papel · ELEGIDAS (5 nov 16:45)
Admin: rol de ENCARGADO (recibe efectivo, aprueba cierres, fija precio si no está el admin; el admin ve todo lo que hizo) · RESUMEN diario y semanal (WhatsApp) · COBRANZA con recordatorio por WhatsApp (lista por antigüedad, mensaje amable con saldo).
Chofer: PANTALLA DE RUTA SIMPLE (siguiente parada + Entregar · Cobrar · No estaba) · CÓMO LLEGAR (Maps/Waze), LLAMAR y WHATSAPP · CONTAR EFECTIVO POR BILLETES en el cierre.
Contador/bodega: GASTOS CON FOTO y marca "tiene factura" · CERRAR EL MES (bloqueado; correcciones con fecha nueva) · AVISO DE CANTIDAD MÍNIMA + pedir al proveedor por WhatsApp.
Otros: PRECIO DE AYER si no se fijó (con aviso) · "CÓMO SE HACE" dentro de la app · PEDIDOS DE CLIENTES por WhatsApp.
NO elegidas (por ahora): límite de crédito con aprobación, gasolina con foto/modo sol, recibir carga kilos esperados vs reales, estado de cuenta al cliente.
Nota WhatsApp: enviar SOLO automático requiere WhatsApp Business API (de pago, por conversación). Sin eso: la app arma el mensaje y se manda con un toque; resumen también como notificación en la APK. Pedidos: v1 = "Nuevo pedido" rápido (el admin lo captura del WhatsApp) y cae en la ruta del día que pidió.

## "10 días sin el dueño" · ELEGIDO (5 nov 16:50)
- Encargado FIJA EL PRECIO, con aviso si se sale del rango normal (±10% vs semana pasada).
- CRÉDITO: lo sigue decidiendo admin o encargado desde la FICHA DEL CLIENTE (quién puede tener crédito). Muy pocos clientes tienen crédito; lo normal es pagar todo en una sola exhibición. La app es para CONTROLAR esos pocos créditos. (No límites automáticos.)
- VIAJE PROGRAMADO con lo pactado (proveedor, fecha, cantidad, precio); al recibir compara kilos/cajas/precio y anota diferencias.
- DEPÓSITO AL BANCO: OPCIONAL (el dueño puede mandar a alguien de confianza por el dinero → movimiento "Entregado a ___").
- CONTEO DOBLE: el ENCARGADO, en su cuenta, confirma que cada chofer entregó el efectivo de su ruta (cuenta de nuevo) y HACE EL CIERRE DEL DÍA. Si no coincide → aviso.
- LÍMITES DE PAGO para el encargado (arriba de $X necesita OK del admin).
- PASAR LA RUTA a otro chofer con un toque.
- SUGERENCIA DE MADURACIÓN (cuántas meter y cuándo, según ventas normales y pedidos).
- MODO VACACIONES (solo avisos urgentes; lo demás en el resumen diario).
El dueño sigue: negociar con proveedores y programar viajes.

## A FUTURO: tómbola tipo Oxxo (5 nov 16:52) · aún no la tienen
- Chofer/encargado cuenta por billetes → la app imprime el CORTE (58 mm) → va dentro de una BOLSA DE SEGURIDAD numerada (se rompe si la abren) con el dinero → a la tómbola.
- En la app: "Depositado en tómbola", número de bolsa, quién y hora. Ese dinero cuenta en la caja como "En tómbola, sin abrir".
- (Cambió de opinión 16:52) Corte DETALLADO en el ticket Y ADEMÁS un QR al final que lleva los datos del corte (montos, billetes, bolsa, chofer, fecha) con código de verificación: al escanearlo el encargado registra el corte en su app aunque los celulares no se hayan sincronizado; si alguien altera el ticket, el código no coincide. Al abrir la bolsa: buscar el cierre por número de bolsa o chofer/fecha → contar → confirmar o marcar diferencia (conteo doble).
- Dejar preparado desde ahora: imprimir corte en el cierre; campo opcional "Número de bolsa".
- El QR del corte incluye también las ventas a PRECIO DE MAYOREO (cliente, cantidad, precio). Al escanearlo, la app muestra a qué clientes se les vendió a mayoreo. En el ticket impreso solo un renglón con el total de ventas a mayoreo.

## Arranque y operación (5 nov 17:00)
- Prueba de 2 semanas con UN chofer (app + su libreta en paralelo); si cuadra, entran todos. Capturar con calma lo que ya existe (deudas, cajas que deben, caja, bodega).
- APK por LINK por ahora (aviso de versión nueva); Play Store más adelante si crecen.
- El día termina cuando el ENCARGADO hace el cierre (no a medianoche).
- Desactivar cuenta de un chofer que se va / cerrar sesión de un celular perdido; botón "Descargar respaldo" semanal.
- Lista de compras entregada (aprox., 2 choferes): A16 $2,895 c/u, impresora tickets ~$659 c/u, Point Air $349 promo c/u, papel 58 mm, Brother PT-P710BT + cintas 24 mm, bolsas de seguridad, tómbola después.

## Propuesta: SIMULADOR DE VIAJE (5 nov 17:00) · esperando OK
(El simulador que ya existe es de comprar/vender vehículos.) Nuevo: mismo formulario que el viaje real (destino, proveedor, vehículo, chofer, qué/cuánto carga, precio ofrecido) sin mover dinero ni inventario. Calcula: diésel (km del destino × rendimiento real del vehículo), casetas, comida, sueldo por días, merma esperada (historial), venta esperada (precios recientes) → ganancia total y por caja, y PRECIO MÁXIMO por caja para no perder. Comparar 2 opciones lado a lado. Botón "Convertir en viaje programado". Destinos frecuentes guardados con km y casetas.
- SIMULADOR DE VIAJE: APROBADO (17:00). Resultado final: "Cada caja te cuesta $X (compra $A + viaje $B) · Gastos del viaje $G · Véndela al menos en $Y para ganar $Z por caja · Este viaje deja $T". Al final: "Programar este viaje" → solo escoge chofer (y fecha). El chofer NO se pide al simular. Mostrar con qué datos calculó (km, rendimiento, merma) y marcar "estimado" si faltan datos.

## TUTORIAL POR DÍAS (5 nov 17:05) · aprobado
- Chofer 5 días (1: ruta, entregar, cobrar efectivo · 2: fiar/abonos, No estaba · 3: tarjeta + ticket · 4: gastos, escanear QR · 5: cierre contando billetes). Admin 7 días (precio, cierres, cobranza, viajes/simulador, estadísticas, encargado/modo vacaciones…). También ENCARGADO y CONTADOR (no venta local).
- Aviso la PRIMERA VEZ que entras a cada pantalla (manita), una sola vez.
- "Aprende la app" en Inicio: lista con palomitas que se marcan solas al hacerlo de verdad.
- Saltar/repetir desde Ajustes.
- Cada paso apunta a un elemento real; si no existe, no se muestra. PRUEBA AUTOMÁTICA que recorre todos los pasos de todos los días y roles y verifica pantalla + elemento antes de publicar.

## TAGs de autopista (5 nov 17:10) · idea, a futuro
- Un TAG por vehículo (número y proveedor en su ficha). Choferes con el menor efectivo posible.
- Recarga del TAG = salida de dinero (caja o banco) que pasa a "Saldo del TAG" (no es gasto todavía). Cada CRUCE = gasto del viaje (caseta, fecha, hora, monto). Así no se cuenta doble y cada viaje sabe sus casetas.
- Importar cruces del estado de cuenta del proveedor (archivo) → se asignan al vehículo y al viaje por fecha/hora. Si no se puede descargar: captura rápida o foto. (Verificar qué permite cada proveedor cuando elijan.)
- Aprende: casetas y costo por ruta → simulador de viaje y "Guía de ruta" para choferes nuevos (casetas en orden, total, ruta recomendada). Aviso de saldo bajo.
- Datos 2026 (Expansión, 19 oct 2026): IAVE $94, ViaPass $120, EasyTrip $130, TeleVía $150, PASE $150; PASE solo vende para particulares (no transporte pesado); ViaPass ligeros y pesados. Interoperables.
- QR (17:07): por ahora NO se muestra en la ruta. Es una OPCIÓN en Ajustes ("Usar QR de clientes", apagada). Al activarla: tutorial propio para admin y repartidor. Aun así se construye y se PRUEBA completa.

## CHOFER TRAMPOSO (5 nov 17:40)
- HECHO (l12.js, sin publicar): RECEPCIÓN A CIEGAS. Campos vacíos, arriba ya no se ve "regresan N" ni las vacías. Si falta algo la app PREGUNTA CADA VEZ: "Faltante del chofer" (a precio de venta; vacías a cfg.cajaVal) o "Merma". Prueba v50/rec.js 10/10.
- HECHO (l11.js): punto rojo de Inicio lleva directo a avisos en 1 toque.
- Encontrado, por decidir: carga de salida la anota solo el chofer; cancelar entrega ya cobrada sin ok; gasolina/gastos sin foto del ticket; cambio a cliente sin foto; mayoreo del chofer sin aviso; crédito/abono no anotado (ticket al cliente por WhatsApp); PIN 1234 y "Saltar"; fotos del vehículo opcionales (FOTOS_OBLIGATORIAS=false).
- Tarjeta: se cuadra contra el historial de la terminal Mercado Pago (Ricardo, 17:41).
- Mayoreo (idea de Ricardo, 17:41): en el cierre sale cada cliente al que se le dio mayoreo; el admin puede marcar "a este cliente no le des mayoreo"; chofer reincidente → "mayoreo solo con permiso del admin", salvo clientes que el admin ya puso como de mayoreo.
- Sin bodeguero: ¿quién confirma las cajas al regresar? (opciones enviadas 17:45)
- Nota: v40src/t39f.js (prueba vieja) se traba en la bienvenida nueva; no es falla de la app.
- HECHO 5 nov 18:10 (l13.js, sin publicar): A+B+C (foto obligatoria del chofer, cajas "sin contar" no entran a bodega hasta contarlas, al recibir dinero te manda a contar; segundo cierre: lo no contado sigue en el camión). Mayoreo: botones en el cierre, 2 rechazos/30 días → sugiere "solo con permiso", permiso con cronómetro de 5 min (chofer y admin), interruptor en Gastos › Sueldos y ficha del chofer, "permitir otra vez" en la ficha del cliente. Sin conexión: barrita corta. Tutorial: ya no se puede cambiar de sección mientras está abierto.
- Bug viejo arreglado: en un segundo cierre la recepción se quedaba como "confirmada" del primero.
- HECHO 5 nov 18:45 (l14–l16, sin publicar): cancelar entrega con motivo (sale en el corte, cajas regresan al camión, sin autorización); gastos y gasolina sin foto del ticket = por revisar (no se descuentan; admin acepta/no; si ya cerró, se quita del faltante o se le devuelve); cambio a cliente con foto obligatoria + aviso; tarjeta del vehículo con placa para el chofer; Personal: tarjeta "Agregar a alguien nuevo" con pantalla propia; parentesco con menú (básico + "Otro…" con más opciones o escribirlo); asistente inicial con más datos (negocio, PIN, papeles del vehículo, tanque, aceite, licencia, sueldo, PIN del chofer, horario/quién recibe/límite de clientes, dirección de proveedores); burbuja "Datos que faltan" (uno a la vez, el más importante; pantalla agrupada por prioridad; cada uno lleva a su campo; se minimiza).
- Pendiente de decidir: confirmar carga de salida (1) y ticket al cliente por WhatsApp (5) — no los eligió.
- HECHO 18:50 (l17): ticket obligatorio por WhatsApp (wa.me al número del cliente) cuando queda a crédito o abona; con impresora conectada también se imprime; sin WhatsApp → se imprime o aviso URGENTE al admin; simular impresora en Ajustes (demo). Apodo del cliente en el asistente.
- HECHO 19:05 (l18): WhatsApp del negocio en tickets ('Pedidos por WhatsApp'), Ajustes renombrado, aviso al admin cuando el chofer captura un número nuevo. Comisión % sobre lo cobrado (base+comisión); motivadores: 'Hoy llevas ganado' con +$, 'Esta entrega te deja ~$', meta con lo que ganaría, semana vs pasada (sin % negativo), racha, 'si le cobras su deuda ganas $'. Sin ranking. Demo: Danu en base+comisión 3%.
- HECHO 19:25 (l19–l20): mayoreo a mano 2 veces/10 días por cliente → aviso + bloqueo en revisión (3 botones); regla del chofer a 10 días. Crédito: $1,500 por cliente (excepciones del admin; lista 'Límites por decidir' para los que tenían más), tope por chofer = deuda total de sus clientes ≤ $5,000 (editable por chofer). Buró cliente 7/15/30 días → 1500/1000/500/bloqueado, sube al liquidar 3 veces a tiempo, 'Perdonar'. Buró del chofer: sugiere bajar (atrasado) o subir 20% (cobra a tiempo y usa ≥80%) con precauciones; tú aceptas. Mayoreo autorizado que baja >30% su compra de 30 días → precio normal + aviso + 'Mantenerle'. Todo editable en Ajustes › Control de crédito y mayoreo.
- HECHO 6 nov: comisión por caja y kilo cobrados (opción: % de lo cobrado), mayoreo a mano paga la mitad; abonos pagan su parte proporcional.

## NUBE (6 nov 16:05)
- Proyecto Firebase 'platanos-nietos' creado con el Gmail del negocio. Config guardada en nube/firebase-config.js (SDK 13.2.0 por <script>).
- Falta que Ricardo active Authentication (correo/contraseña + dominio reptileckz-jpg.github.io) y Firestore (Standard, nam5, modo producción).
- HECHO 6 nov 16:30 (l21): se guarda en el teléfono (IndexedDB, solo versión real; demo no), cambio de día archiva rutas cerradas en S.rutasHist y avisa cierres sin enviar; admin ve cada ruta (selector + 'X mandó su cierre' en Inicio). AR_K + recep,cbx,porContar.
- SIGUIENTE: paso 2 cuentas (Darle acceso a la app; usuario+contraseña una vez + PIN), paso 3 Firestore (sin poder probar aquí: gstatic/googleapis bloqueados → simulador), paso 4 reglas, paso 5 publicar en Primera-vez. Para lanzamiento: botón 'Borrar datos de prueba'.
- APK: repo reptileckz-jpg/rutafacil-app (Capacitor 7, com.rutafacil.app, 'Ruta Fácil'); workflow .github/workflows/apk.yml arma APK firmado y lo publica en Releases. Llave en firma/rutafacil.jks, contraseña = secreto RF_PASS (Ricardo debe agregarlo). No puedo ver Actions ni poner secretos desde aquí (proxy 403).
- HECHO 6 nov 17:20 (l22–l23, sin subir al APK todavía; www/index.html ya copiado en rutafacil-app):
  Ajustes ya no se cuela; "+" pegado a la orilla y barra del viaje (animaciones sin transform pegado); burbuja de faltantes pegada bajo el encabezado (--hdrH);
  PIN al reabrir, crear PIN propio (no 1234), cambiar con el actual, reiniciar el de otro, bloqueo 5 intentos (1/5/15 min) con aviso; teclado del PIN con pointerdown; vibración (Haptics);
  vehículo: marca, modelo, año, color, VIN, capacidad cajas/kg, motor, llanta (asistente y edición); Bodega existencias a todo el ancho; menú sin demo (Cambiar de usuario, Cerrar sesión);
  fecha y hora reales en la versión real; sin pie "Prototipo"; avatar del chofer centrado; bienvenida legible en modo oscuro; barra de estado (status-bar + adjustMarginsForEdgeToEdge + env());
  botón/gesto atrás (cierra ventana / pantalla anterior / Inicio; doble atrás sale); tutorial del chofer solo ya en su ruta; mantas solo si se carga macho; aviso de velocidad se quita solo;
  avisos de poca fruta (cajas verdes/maduras, kg verde/maduro) en asistente y Ajustes; ficha del cliente: foto de fachada de portada; buró → pantalla de crédito (cobrar, recordar, límite, congelar, cancelar, bajar/perdonar).
- Pendiente: código de recuperación del admin → "ya hay que gestionar la nube" (paso 2/3). Ricardo debe terminar Authentication + Firestore.

## 2026-11-06 · Ubicaciones y arreglos de la prueba en celulares
- Viaje: si no hay báscula registrada (o sin ubicación) ya no se queda en blanco ni se traba.
- La barra de secciones no sale dentro del viaje; en pantallas cortas queda abajo.
- Burbujas minimizadas flotan a la derecha (no dejan hueco).
- Avisos automáticos ("no cuadra") solo después de entrar y solo al admin/contador; texto claro de cajas.
- Cajas: las vacías que se lleva el viaje quedan "con el proveedor"; las taras que regresan llenas se anotan.
- Ids de clientes nuevos ya no se repiten.
- Ubicaciones (decidido): admin elige báscula o "Báscula nueva", puede pegar link/coordenadas o pedir al chofer.
  Al llegar ("Ya llegué"): GPS obligatorio con "¿seguro que estás ahí?", nombre, foto recomendada; foto de noche → se pide actualizar de día.
  Reparto: ubicación del cliente obligatoria la primera vez; luego foto de fachada y teléfono hasta que esté completo. Clientes nuevos del chofer entran ya y avisan al admin.
  Si el GPS falla 2 veces se puede seguir sin ubicación (aviso al admin).
- APK: se agregó permiso de ubicación al AndroidManifest en el workflow.
- Roatán siempre pasa a báscula (se paga por kilo).
- Proveedor/báscula: el admin pone ubicación aproximada; el chofer al llegar solo toca "Actualizar ubicación" (la app la escribe). Ya exacta, el chofer no la cambia.
- Cliente: el chofer agrega datos (ubicación, teléfono, quién recibe, foto) pero no cambia los que ya hay (la foto se puede actualizar si era de noche).
- Admin confirma el teléfono del cliente en su ficha ("Número confirmado hace 3 días"); aviso si el chofer agrega un teléfono o si es el número de un chofer.
- Ficha del chofer (Personal → Datos): máximo por cliente y tope total; se reflejan en todos lados (c.lim = límite real).

## 2026-11-06 · Nube (Firebase) — paso 2 y 3
- Entrar: usuario (choferes) o correo (admins) + contraseña una vez por celular; luego PIN. Dueño crea "la cuenta del negocio" (meta/duenio).
- Accesos desde Personal: Darle acceso / Contraseña nueva (chofer: mismo usuario, cuenta nueva) / correo para cambiarla (admin) / Quitar acceso.
- Sincroniza todo el negocio campo por campo; inventario con sumas; ruta de cada chofer aparte; fotos aparte (evidencia se borra a los 30 días; lugares, fachadas, personal y vehículos se quedan).
- La nube manda al abrir; el cambio de día lo hace el primero que abre.
- Ids por celular (idBase de 100000) para que no choquen.
- Pendiente: probar con Firebase real en el APK; varias bodegas aún no se sincronizan (invB/lotesB); botón "Borrar datos de prueba" para el lanzamiento.

## 2026-11-06 19:20 · Prueba de 1.0.4 en celulares — SOLO REGISTRAR (el usuario pidió no hacer cambios hasta que diga)
1. Teclado tapa los campos en toda la app; la "gotita" del cursor se ve encima del teclado (letra N). 1.0.5 trae el arreglo por JS; ya está preparado (sin publicar) el ajuste nativo: plugin @capacitor/keyboard con resize "native" y resizeOnFullScreen.
2. Entrega: la barra fija de "Total / Guardar entrega" tapa lo de abajo (Más opciones / cambio de fruta); no hay forma de llegar.
3. Quitar todo lo "opcional en la demo": en la versión real las fotos todavía salen como opcionales. Deben ser obligatorias.
4. Al enviar el cierre de ruta, regresar a la pantalla de bienvenida del chofer (la que dice "Hola, Danu" con su nombre).
5. Cierre: el nivel de gasolina y el odómetro no se piden antes de la foto, o salen hasta el final. Deben pedirse en orden, antes de la foto.
6. "Cargar más" y "Otra vuelta" asignan cajas solas. Deben abrir una pantalla propia donde el chofer escribe cuántas cajas o kilos más cargó.
7. Al chofer se le deja saltarse el PIN. Quitarlo: nada se puede saltar "por ser demo".
8. Mapas: no funcionan ni son realistas. Ya con la nube, deben ser mapas reales.
9. Admin con la app vacía (sin clientes ni nada) no sabe qué hacer. Agregar una guía en Inicio que invite a seguir llenando y a usar la app ("Puedes hacer esto mientras…": agregar clientes, proveedores, darle acceso a los choferes, registrar la primera carga, etc.). Pasa sobre todo cuando el admin usa la app solo, sin choferes todavía.
10. Ajustes → "Tu negocio / Datos del negocio": la tarjeta parpadea dos veces cada vez que se abre.
11. Ajustes: las tarjetas "Control de crédito y mayoreo" y "¿Cuándo te aviso que hay poca fruta?" se ven desparramadas. Ordenarlas y compactarlas para que se vean como las demás.
12. Tarjetas encimadas, sin separación entre ellas (ej. "Datos que faltan": Papeles y vencimientos / Para trabajar / Contacto y extras). Se repite en muchas partes de la app: poner espacio entre tarjetas en todas las pantallas.
13. Fotos de personal (INE, licencia, foto del chofer o empleado, etc.): solo deja subir de la galería, no deja tomar foto. Debe ofrecer "Tomar foto" (cámara) y "Subir de la galería".
14. INE y licencia tienen dos lados: pedir frente y reverso de cada una.
15. Menú lateral (☰): hoy solo aparece y desaparece. Que se deslice suavemente desde la izquierda al abrir y se meta al cerrar, con el fondo oscureciéndose poco a poco.
16. Pantalla de Ruta del chofer todavía confusa: revisar y simplificar el flujo (junto con los puntos 5 y 6).
17. Al iniciar la ruta: exigir que el chofer ajuste o confirme el nivel de combustible y el odómetro (que no pase con el valor que ya trae sin confirmarlo).
18. Inicio de ruta: cuando el chofer termina la revisión del vehículo y marca que todo está bien, esa tarjeta se minimiza (queda como "✓ Revisión lista", y se puede abrir) para dejar espacio y seguir con odómetro, nivel de combustible y fotos del vehículo.
19. Viaje de carga: si en la lista de revisión algo sale "Mal", ya no pregunta si puede salir así. Regresar esa opción (preguntar "¿Sales así?" y avisar al admin, como estaba antes).
20. PIN del chofer: al crearlo, opción de escribir una pista ("mi año de nacimiento al revés", etc.). En la pantalla del PIN, un botón "¿Olvidaste tu PIN?" que muestra la pista; si no sirve, que se pueda pedir al admin que lo reinicie (aviso al admin).
21. Tarjetas con la orilla izquierda de color (ej. avisos "Info"): no le gustan. Pintar toda la tarjeta de un color suave según el tipo (info, aviso, urgente) en vez de solo la orilla. Aplicar en toda la app.
22. No era duplicado: él hizo y reabrió el cierre 3 veces porque el reparto es confuso. Al rediseñar el cierre (puntos 4, 5, 16): dejar claro cuándo el cierre ya quedó enviado, qué sigue ("Hola, Danu") y que reabrir sea algo raro y explicado, no algo en lo que se cae sin querer.
23. Primera vez como admin: salieron muchas alertas/anuncios seguidos y la pantalla parpadeaba. En 1.0.5 los avisos ya esperan a que entres, pero los guardados salen uno tras otro. Arreglo pensado: juntarlos en uno solo ("Tienes 3 avisos") que lleva a Avisos, y evitar el parpadeo cuando llegan los datos de la nube (dibujar una sola vez al terminar de cargar).
### Decisiones 19:52
- Mapas: OpenStreetMap (gratis) dentro de la app + botón para abrir Google Maps y manejar.
- Cierre: una pantalla por paso: odómetro → gasolina → fotos → cajas → efectivo → enviar. Al enviar: "Cierre enviado ✓" y regresa a "Hola, Danu". Reabrir solo con permiso del admin.
- Fotos obligatorias en la versión real, con botón "No pude tomarla" + motivo + aviso al admin.
- Carga extra / otra vuelta: pantalla propia con cajas de roatán, kilos de macho y foto de lo que cargó (se descuenta de bodega).
### Decisiones 19:56
- Inicio de ruta: el odómetro viene prellenado con el último del vehículo; se le pide al chofer que lo verifique y, si no está bien, lo corrija.
- Cierre enviado: reabrirlo solo con autorización del admin desde su celular.
- Sí al mapa en vivo (ubicación del chofer cada pocos minutos).
- Hacer los 23 puntos en 1.0.6.
### 1.0.6 (hecho): puntos 1–23
- Cierre en 6 pasos (odómetro → gasolina → fotos → cajas → efectivo → enviar), cada uno valida; al enviar regresa a "Hola" con "Cierre enviado ✓".
- Seguir después del cierre: el chofer pide permiso; el admin autoriza en Inicio (de celular a celular); al autorizar se reabre y sale "¿Cuánto cargaste?" (cajas, kilos y foto).
- Fotos obligatorias en la versión real con "No pude tomarla" (motivo + aviso). Sin textos ni botones de demo; PIN sin "saltar".
- Inicio de ruta: confirmar odómetro (prellenado) y tanque; revisión lista se encoge. Viaje: "¿Puedes salir así?" de vuelta.
- Mapas reales (OpenStreetMap/Leaflet) + ubicación del chofer cada 2 min, el admin la ve.
- Teclado: ajuste nativo de Capacitor + el campo sube. Entrega: la barra de Total ya no tapa.
- Diseño: separación entre tarjetas, tarjetas pintadas, menú que se desliza, Ajustes plegado, sin doble parpadeo, fotos de personal con cámara o galería y frente/reverso, guía "Para empezar", avisos juntos al abrir.

## 2026-11-07 00:11 · Prueba de 1.0.6 — SOLO REGISTRAR (no hacer cambios hasta que diga)
24. Pantalla del PIN (celular con sesión de chofer): al equivocarse sale "intento fallido" y se bloquea un minuto, pero no hay "Olvidé mi PIN" ni forma de restablecerlo (se junta con el punto 20: pista + pedir al admin que lo reinicie).
25. En la pantalla del PIN no hay forma de cambiar de usuario ni de cerrar la sesión. Si un celular se quedó con la sesión de Danu, nadie puede entrar ahí como administrador. Agregar "No soy Danu / Cambiar de usuario" (cierra la sesión de la nube y vuelve a "Entrar" con usuario y contraseña).
26. Mapas: no se ven, solo dice "API key required". El servicio de mapas que usé (CARTO) ya pide clave. Cambiarlo por uno que no pida clave (OpenStreetMap directo o Esri), con otro de respaldo por si uno falla, y que la app avise si no carga.
27. Aviso URGENTE "alguien escribió mal 5 veces el PIN": al tocarlo no hace nada (solo sube la pantalla). Debe decir de quién es el PIN y llevar a su ficha con el botón "Reiniciar PIN" (o tener ahí mismo "Reiniciar su PIN").
(24/25 confirmado: con PIN olvidado la app del chofer queda inservible; es prioridad.)
28. Tutorial del chofer (1.0.6): ya lleva a donde debe, pero parpadea/flashea. Probable causa: el ajuste que sigue a la pantalla (mueve la pantalla, vuelve a acomodar el hueco y el globo, y cada vez que la app se redibuja lo repite, con transición). Hacer que se acomode una sola vez por paso y sin transición repetida.
(Workaround usado: el admin reinició el PIN de Danu desde Personal → Danu → Datos → "PIN para entrar" → Reiniciar; funcionó.)
29. Tutorial del chofer, paso 2 "Entrega": señala un hueco vacío porque la barra de abajo (secciones) no se ve en ese momento (se esconde al bajar la pantalla), y además se puede tocar la pantalla de atrás. Arreglar: mientras el tutorial está abierto, la barra siempre visible y fija; el fondo bloqueado (solo responde el tutorial); si lo que señala no existe o no se ve, saltar ese paso o mostrar el globo al centro sin hueco.
30. Tutorial del chofer, paso "Gastos": señala la pestaña "Ruta" (no coincide), porque el botón de Gasto no está en pantalla en ese momento. Hacer que señale el botón real de "Gasto" (mostrarlo si hace falta) o explicarlo sin señalar otra cosa.
31. Tutorial del chofer, paso 5 "Deslizar": dice que deslice sobre la barra, pero la barra no hace nada; el deslizado funciona sobre la pantalla. Cambiar el texto y la manita: señalar el centro de la pantalla ("desliza el dedo a los lados sobre la pantalla para cambiar de sección").
32. Al chofer no mostrarle el buró de un cliente nuevo ni de uno sin crédito habilitado (siempre sale "Bueno" y solo llena la pantalla). Mostrarlo solo si el cliente tiene crédito activo.
33. (CONFIRMADO tal cual) Modo manejo automático con el GPS: se prende al ir a más de ~15 km/h por ~20 s y se apaga al estar casi parado (<5 km/h) por ~45 s; con margen para no prender/apagar en semáforos. Al llegar a ~100 m de un cliente de la ruta, ofrece abrir su entrega. Botón "Voy de copiloto" para apagarlo en ese viaje. Solo con la app abierta.
   - La batería no importa: los vehículos tendrán cargador (celular, impresora de tickets y terminal).
34. Vehículos → Papeles: el estado de la placa y el tipo de placa se pueden cambiar siempre desde ahí. Deben capturarse al agregar el vehículo y quedar fijos; solo se cambian en "Editar datos".
35. Vehículos: aviso de "verificación vencida" sin forma de registrar a mano que ya se hizo (fecha, costo, ticket/foto). Solo deja encargarla a un chofer. Agregar "Ya se hizo" (fecha, costo, quién la llevó, foto) que actualice el próximo vencimiento y registre el gasto. Revisar lo mismo para tenencia/placas, seguro, aceite y afinación.
36. Gastos → rendimiento / costo por km / etc.: el texto queda sobre el fondo de la app, sin tarjeta. Meter ese apartado en una tarjeta como los demás.
37. Encargo de verificación al chofer (desde el admin) no le llega al chofer. Causa encontrada: los encargos se guardan en "encargos", que no está en la lista de datos que se suben a la nube. Arreglar y además REVISAR TODA la lista de datos que se sincronizan: buscar cualquier otro dato del negocio que se haya quedado fuera (encargos y lo que aparezca) y probarlo con dos celulares.
38. Encargos (verificación, autolavado, etc.): el admin puede poner a dónde ir (lugar guardado, link de Maps o coordenadas). Si no lo pone, el chofer escoge o escribe el lugar al hacerlo, y la app guarda la ubicación (GPS) al marcarlo como hecho. Los lugares quedan guardados para la próxima ("Verificentro X", "Autolavado Y") con botón para ir con Google Maps.
39. Cierre del chofer, paso Efectivo: hoy solo confirma la cantidad que "debe entregar"; no deja poner lo que de verdad entrega (si le faltó). Hacer:
   - Conteo por denominación: billetes de 1000, 500, 200, 100, 50, 20 (cuántos de cada uno) + un total general de monedas. La app suma.
   - Si no cuadra con lo que debe entregar: muestra la diferencia (faltante/sobrante) y pide el motivo (como quedamos: "preguntar cada vez"); te llega aviso.
   - Ticket del corte (impreso si hay impresora, si no por WhatsApp/pantalla) con el desglose de billetes y monedas, lo que debía y la diferencia: va dentro de la bolsa con el dinero y a la tómbola; si no hay tómbola, el admin recibe la bolsa con su ticket.
   - En la recepción (admin), el conteo a ciegas compara contra este desglose.
   - Ya estaba decidido antes (ver "CONTAR EFECTIVO POR BILLETES" y "A FUTURO: tómbola tipo Oxxo"): incluir número de bolsa de seguridad, "Depositado en tómbola" (quién y hora) y que ese dinero cuente en caja como "En tómbola, sin abrir".
   - (00:39) La tómbola se da de alta como un bien en Ajustes → Bienes (como los demás bienes). Solo cuando exista una tómbola registrada aparece la opción "Meter a la tómbola". Mientras no haya: solo "Entregar al administrador" (bolsa + ticket en mano).
   - (00:39) El contador por billetes es OPCIONAL y se puede minimizar ("Contar por billetes ▾"). El chofer decide: o cuenta por billetes, o solo confirma/corrige la cantidad que entrega. El ticket y la bolsa van igual; si no usó el contador, el ticket solo lleva el total.
   - (00:40) El cierre siempre se guarda en la app (y en la nube). Además, al enviar el cierre, el chofer manda el corte por WhatsApp al número del NEGOCIO (desde el WhatsApp de su celular; el dueño tiene a cada chofer guardado por su nombre). Con impresora: se imprime y también se manda por WhatsApp.
   - (00:41) El corte por WhatsApp va como FOTO (imagen del ticket), no como texto, para que no se pueda editar. La app arma la imagen y abre "Compartir" de Android; el chofer elige WhatsApp → Negocio → Enviar. (Necesita en el APK el plugin para compartir archivos.) La imagen lleva código de verificación/QR y en la nube queda el original para comparar.
   - (00:42) Quiere que la FOTO del corte vaya directo al número del negocio (como los textos a clientes con wa.me). El link wa.me solo lleva texto; para mandar foto a un número fijo hace falta una pieza nativa en el APK (intento de Android a WhatsApp/WhatsApp Business con el número y la imagen). Hacerla, con respaldo: si falla (cambia WhatsApp), abrir "Compartir" normal.
40. Avisos que no llevan a ningún lado: al tocar "X pide reabrir su ruta…" (y el del PIN, punto 27) solo sube la pantalla. Revisar TODOS los avisos: cada uno debe llevar a donde se atiende (la tarjeta de Autorizar, la ficha del chofer, el cliente, etc.), o tener el botón ahí mismo.
41. Permiso para seguir después del cierre ("Cargar más" / "Otra vuelta"): que sea configurable POR CHOFER en su ficha (Personal → chofer): con permiso o sin permiso. Sin permiso: se reabre solo y abre "¿Cuánto cargaste?" (igual con foto y aviso al admin).
   - (00:45) Chofer NUEVO: de entrada SIN permiso (se reabre solo). El admin se lo pone a quien quiera.
42. NUEVO (no estaba hecho): APOYO ENTRE CHOFERES. Cuando un chofer terminó (o va adelantado) y todavía trae cajas en el camión, y otro chofer tiene muchos clientes pendientes: pasarle paradas solo por hoy. Propuesta:
   - La app lo detecta y le sugiere al admin: "Danu terminó y trae 8 cajas. Rafa tiene 15 pendientes. ¿Le pasas clientes?"; sugiere cuáles (los más cercanos a Danu / los del final de la ruta de Rafa, sin pasar de las cajas que trae).
   - El admin confirma (puede quitar/agregar); a cada chofer le llega aviso y su lista se actualiza sola (nube). Si el que apoya ya había cerrado, se le reabre para esos clientes (respetando su permiso del punto 41).
   - El chofer también puede ofrecerse: botón "Puedo apoyar" al terminar.
   - Pendiente de confirmar: quién lo inicia y si es solo por hoy.
   - (00:48) CONFIRMADO: los choferes se pueden poner de acuerdo entre ellos (uno ofrece, el otro acepta) y al admin le llega aviso; el admin también puede hacerlo. Los clientes se pasan SOLO POR ESE DÍA; al otro día regresan a su chofer de siempre.
43. HUELLA DIGITAL para entrar (además del PIN): estaba planeado para el APK y no se hizo. Los dos celulares de prueba tienen huella. Hacer: al crear/entrar con PIN, ofrecer "¿Usar tu huella para entrar?"; luego entra con huella y el PIN queda de respaldo (si falla la huella o después de reiniciar el celular). Opción para quitarla. Plugin nativo de biometría en el APK.
44. ANTES DEL SIGUIENTE APK: REVISIÓN COMPLETA de este archivo contra el APK real. Hacer una lista de todo lo DECIDIDO que no está hecho o no funciona en la versión con nube (ej. ya encontrados: huella; "¿No eres Danu?" en la bienvenida que manda a iniciar sesión; sesión del chofer se cierra al cerrar el día y la del admin pide huella/PIN si se quita de multitarea; contraseña de admin la cambia el otro admin; "Crear usuario" con roles contador y venta local; admin que toma visitas de otras rutas). Enseñársela al usuario y acordar qué entra.
   - (00:50) Confirmado: todo lo del punto 44 lo daba por hecho; entra.
45. REGLA GENERAL: todo lo que se registra en varios pasos se hace en una PANTALLA PROPIA, un paso a la vez (como el cierre). Primer ejemplo: "Pedido por WhatsApp" → 1 cliente (o nuevo) · 2 cajas de roatán y kilos de macho · 3 nota · 4 ¿hoy o mañana? · 5 ¿quién lo entrega? · 6 revisar y registrar. Al terminar se cierra la pantalla y queda limpio (hoy la tarjeta se queda abierta con el cliente que se había elegido). Revisar en toda la app qué otros registros son así (alta de cliente, proveedor, carga, gasto, personal, vehículo, encargos, etc.) y pasarlos al mismo formato.
46. (corregido 00:53) En la entrega SÍ salieron la ubicación y la foto, pero después ya no se puede agregar nada más al cliente. Hacer:
   - Que el chofer pueda completar datos de un cliente en cualquier momento (no solo en la entrega): botón "Completar datos" en la ficha del cliente, mientras le falte algo.
   - Agregar HORARIO de apertura y cierre del cliente (y días que abre) a lo que el chofer puede llenar.
   - Regla de antes: el chofer agrega lo que falta pero no cambia lo que ya está.
47. Ticket de entrega en el APK: dice "Este navegador no deja compartir imágenes… En el APK se manda directo" estando YA en el APK, y "mantén presionada la imagen" no hace nada en la app. Hacer: en el APK mandar la IMAGEN del ticket directo al WhatsApp del cliente con la pieza nativa (la misma del punto 39: foto directo a un número, con respaldo de "Compartir"); quitar esos textos de navegador; "Guardar imagen" con botón (no con mantener presionado).
48. El ticket dice "Pedidos por WhatsApp: 228 100 0000" (parece número de ejemplo). Revisar de dónde sale: si el WhatsApp del negocio no está capturado, no imprimir uno inventado; pedirlo en "Datos que faltan".
49. Ya trabajamos SOLO sobre el APK: quitar todos los textos y avisos "de navegador" o "en el APK será…" y hacer que de verdad funcione en el APK. Encontrados en el código:
   - "Este navegador no deja compartir imágenes…" (ticket a cliente y otro igual) → mandar imagen directo (punto 47).
   - "En el APK se manda directo al chat del proveedor." → hacerlo.
   - "En el APK aquí se pide usuario y contraseña." → quitar (ya se hace).
   - "En el APK te llega cada lunes como notificación." (2 lugares) → notificación real o quitar el texto.
   - "Se guarda en este aparato. En iPhone el navegador no permite vibrar." → quitar.
   - "Aquí no se puede dictar; en el APK sí" → dictado real o quitar.
   - "En la demo no se puede descargar. En el APK se genera el Excel…" → generar y guardar el Excel en el APK.
   - "En el APK la posición se actualiza en vivo con el GPS…" → ya cambiado; revisar que no quede.
   - Buscar cualquier otro igual antes de armar.
   - (48 resuelto 00:57: el 228 100 0000 sí lo había puesto el usuario; no es error.)
50. Cambios que no dicen si se guardaron: en Ajustes (WhatsApp del negocio, fruta madura: cuándo avisar y cuántos días aguanta, etc.) se escribe y no hay "Guardar" ni confirmación. Regla para TODA la app: cada campo que se cambia muestra que se guardó ("✓ Guardado" junto al campo, o botón "Guardar" en los formularios) — se guarda al salir del campo y se ve la palomita. Revisar todos los apartados con campos editables.
51. Pantalla propia para DESPUÉS DE ENVIAR EL CIERRE (hoy regresa a la de inicio y esa pide el PIN):
   - Saludo según la hora: "Buenos días / Buenas tardes / Buenas noches, Danu".
   - Sin pendientes: "Nada más por hoy ✓" (con resumen corto: cierre enviado, efectivo entregado/por entregar).
   - Con pendientes: "Ya no tienes pedidos por entregar, pero te queda: lavar la camioneta / hacer la verificación…", cada uno con su botón para hacerlo o confirmarlo (encargos, puntos 37/38).
   - Botones: "Cargar más / Otra vuelta" (según su permiso, punto 41), "Puedo apoyar" (punto 42) y "Listo por hoy".
   - Que NO pida el PIN al llegar ahí después de enviar el cierre (ya está adentro).

## 2026-11-07 01:05 · DECIDIDO: meter TODO (A 1–12, B 13–26, C puntos 24–51) en la siguiente versión
- Sesión del chofer: se cierra sola al terminar el día; además, si pasa MÁS DE 40 MINUTOS INACTIVO, vuelve a pedir el PIN (o huella).
52. (01:13) Teclado: en algunos apartados la pantalla se sube DE MÁS y otra vez no se ve lo que se escribe. Causa: el arreglo por JS sumaba 55vh de espacio y movía el campo, y además Android ya achica la pantalla (resize native) → doble ajuste. HECHO: solo se mueve lo justo (campo centrado en lo visible), espacio abajo solo si no hay para dónde subir. Prueba v50/kb2.js.
53. (01:13) Mapas: recordatorio del usuario → HECHO: Esri (sin llave) + OpenStreetMap de respaldo + aviso si no cargan.
### Avance (01:20)
- l36: huella (pieza nativa propia RutaNativa), pista del PIN, Olvidé mi PIN (pide al admin), No soy X (cierra sesión de la nube), chofer 40 min, PIN al cambiar de día, al volver a la app pide PIN si ya pasó el tiempo, roles en Accesos (contador, venta local; encargado usa su cuenta de chofer), solo el dueño da/quita acceso a admins, admins con usuario (otro admin les da contraseña nueva), cerrar sesión en todos sus celulares, baja de chofer con clientes por zona. NB_SH auditado (+encargos, enc, vac, atiende, hoyOk, inspHoy/Mes/Sem, recep, reglas, cajaBase, chBuroNo, provPagT, mayRech, primerDia, pinPista, pinPide); AR_K + ciEnvH, stopsOrig. invB/lotesB (varias bodegas) siguen sin nube.
- l37: avisos llevan a donde se atienden (con resaltado); ventana de urgentes "1 de N" incluye los URGENTE.
### Hecho para 1.0.8 (07 nov, ~02:30) · l36–l44 + pieza nativa RutaNativa (Java)
- l38: imagen directo al WhatsApp (ticket al cliente, resumen al proveedor), Excel .xlsx real, respaldo, borrar datos de prueba, "✓ Guardado"; fuera textos de navegador (ql.py).
- l39: QR propio (probado con OpenCV), impresora Bluetooth ESC/POS real (buscar, escoger, prueba; ticket y corte).
- l40: cierre paso Efectivo (cuánto entregas, billetes opcional, motivo, bolsa, tómbola/admin), corte en foto con QR+código directo al WhatsApp del negocio (e impreso), pantalla después del cierre (saludo, nada más por hoy, encargos, Listo por hoy, sin PIN), permiso por chofer (nuevo = sigue solo), apoyo entre choferes y pasar la ruta (solo hoy).
- l41: tarjeta/transferencia/mixto + comisión (absorbe/cobra) + banco + retirar a caja; "No estaba" a la vista; buró al chofer solo con crédito; completar datos del cliente cuando sea + horario y días.
- l42: precio de ayer, encargado ±10%, límite de pagos del encargado con OK, conteo doble, resumen día/semana por WhatsApp, pedir al proveedor, sugerencia de maduración, viaje pactado vs real, gasto con factura, cerrar el mes, simulador de viaje.
- l43: tutorial sin parpadeo (globo aparte), fondo bloqueado, Gasto/Deslizar arreglados, tutorial por días (chofer 5, admin 7), "Aprende la app", 2 columnas en pantallas grandes, placa fija, "Ya se hizo" (seguro, tenencia, verificación), encargos con lugar, combustible en tarjeta.
- l44: QR de clientes (opción en Ajustes, etiqueta, escanear), escanear el corte y verificar código, modo manejo automático + copiloto + "llegaste con…", pedido por WhatsApp paso a paso con "¿Cabe en la ruta?", tómbola sin abrir.
- Fechas fijas de la demo que se colaban (carga nueva, rendimiento).
- Falta / parcial: otros registros a pantalla por pasos (solo se hizo el pedido); varias bodegas (invB/lotesB) sin nube; notificaciones reales del resumen.

## 2026-11-07 08:50 · Prueba de 1.0.8 (SOLO ANOTAR, no hacer cambios todavía)
54. Ruta: si ya mandaste el cierre, sales de la app y vuelves a entrar, te deja volver a tomar las fotos del vehículo. Las fotos que ya se mandaron en el cierre deben quedarse FIJAS (solo verlas, sin poder cambiarlas).
55. Personal → fotos de los empleados (INE, licencia, todas las de su tarjeta): "📷 Tomar" y "🖼️ Galería" abren las dos la GALERÍA; no deja tomar la foto con la cámara. Debe: Tomar = abre la cámara directo; Galería = escoge una foto guardada. CONFIRMADO (09:23): pasa en TODA la app (también la foto del lugar en el viaje de carga: abre galería, no cámara). Revisar: en 1.0.8 se agregó el permiso CAMERA al AndroidManifest; si la app declara CAMERA y no está concedido, Android/Capacitor cae a la galería. Arreglo: pedir el permiso de cámara (punto 69) y/o abrir la cámara con la pieza nativa (RutaNativa.tomarFoto) en vez del input de archivo, para que "Tomar" SIEMPRE abra la cámara.
56. Vehículo (alta/datos): al dar "Siguiente" con campos vacíos sale alerta "Falta llenar… / Seguir sin llenarlo (solo en la demo)". Quitar ese texto: en la app real se piden los campos obligatorios y punto (o se deja seguir sin decir "demo").
57. RECORDATORIO del usuario: quitar de TODA la app las palabras "demo", "prueba" y "web" (y "Prototipo", "navegador") en lo que se ve en pantalla. Barrido completo antes de armar. EXCEPCIÓN (08:58, dicho por el usuario): "Borrar datos de prueba" e "Imprimir prueba" SE QUEDAN así.
58. Burbuja "Datos por llenar" (faltan): al tocar un pendiente, p. ej. "Teléfono de (proveedor)", abre "Contactos y extras", pero al tocar "Teléfono del proveedor" (o "Dirección del proveedor") NO pasa nada. Debe llevar directo al campo correcto del proveedor (su ficha → Datos, con el campo enfocado y el teclado listo) para llenarlo ahí mismo.
59. Burbujas: minimizadas las dos están bien. PERO cuando una está ABIERTA, la otra (minimizada) le estorba encima de sus botones: viaje abierto → la de "faltan" tapa; "faltan" abierta → la de viaje tapa. DECIDIDO (09:05): las DOS siempre visibles e integradas como PESTAÑAS arriba del panel abierto: [🛻 Viaje] [📝 Faltan N] [─ minimizar]; tocar la otra pestaña cambia el contenido. Minimizadas siguen como burbujas chicas. Nunca se enciman ni tapan botones.
60. Simulador de viaje: son muchos datos en una sola pantalla. Hacerlo con la regla de PANTALLA POR PASOS / TARJETAS (una pregunta por tarjeta, como el pedido por WhatsApp), con su propia interfaz.
    - Si el proveedor ya tiene ubicación GPS guardada, los KM DE IDA se ponen SOLOS (aproximados) — no se escriben.
    - Pero ANTES pregunta el recorrido: ¿va a pasar a la báscula? (cuál) y el orden del recorrido (bodega → báscula → proveedor(es) → regreso). Con eso calcula los km aproximados.
    - Si falta la ubicación de algo, entonces sí pide los km (o sugiere guardar la ubicación).
61. Admin → Clientes: NO hay manera de agregar un cliente (solo se ven los que ya están). Falta botón claro "+ Agregar cliente" (por pasos/tarjetas).
62. Admin → Clientes: los filtros "Todos · Me deben cajas · Morosos · Les toca hoy · Por chofer · Nuevos" están en una fila que se desliza a los lados → no le gusta. DECIDIDO (09:08): CUADRÍCULA de 2 renglones × 3, todos visibles, cada uno con su número: [Todos N][Hoy N][Morosos N] / [Cajas N][Nuevos N][Por chofer ▾]. Debajo: 🔍 Buscar cliente… y "+ Agregar cliente".
63. Vehículos → Taller → Llantas: puso cuántos km faltan y sale "faltan unos 10,000 km (≈ Infinity años)". Causa probable: el tiempo se calcula km que faltan ÷ km que recorre al día, y como todavía no hay rutas/odómetro registrados, los km por día = 0 → división entre cero = "Infinity". Debe: si aún no hay recorridos, decir "Cuando haya unos días de rutas te digo en cuánto tiempo" (y nunca mostrar Infinity/NaN en ningún lado de la app → revisar todos los cálculos de tiempo/rendimiento).
64. Vehículos → Gastos: las secciones "Cuánto deja / cuánto cuesta" y "Equipo y accesorios" están sobre el fondo de la app, SIN tarjeta propia → difícil de leer. Ponerlas cada una en su tarjeta. Y REVISAR TODA LA APP: cualquier bloque de información (títulos + renglones) que esté suelto sobre el fondo va dentro de su tarjeta (barrido automático con prueba que lo detecte en todas las pantallas y fichas).
65. Pedido por WhatsApp asignado por el admin a un chofer → AL CHOFER NO LE LLEGA. Caso real: chofer ya sin nada arriba (0 cajas roatán, 0 kg macho), ya en su pantalla "Nada más por hoy / Listo por hoy"; el admin le asigna pedido de 10 cajas + 100 kg macho y al chofer no le sale nada.
    Debe:
    - Llegarle AVISO al chofer en su celular (notificación + aviso en pantalla, aunque ya haya mandado su cierre): "Se te asignó un pedido: Cliente X, 10 cajas y 100 kg".
    - Si no trae suficiente (lo que trae − lo apartado < lo del pedido): decirle claro "Regresa a la bodega a cargar 10 cajas de roatán y 100 kg de macho" → botón que abre "Cargar más" ya con esas cantidades puestas (se reabre su ruta sin pedir permiso porque se lo mandó el admin).
    - El pedido aparece en su ruta como parada.
    - El "¿Cabe en la ruta?" del admin ya le avisaba "No le alcanza" → además ofrecer "Que regrese a cargar".
    - Revisar por qué no llegó (la parada se agrega en la nube a su ruta, pero la pantalla después del cierre no la muestra / no hay aviso al chofer).
66. Al mandarlo a cargar por un pedido: SUGERIR cargar unas cajas/kilos EXTRA "por si sale otro pedido". La sugerencia se calcula con lo que se vende normalmente en esa zona/a esa hora (o un mínimo configurable en Ajustes, p. ej. +3 cajas y +20 kg). El chofer puede quitarlas. Lo extra que no venda regresa a bodega como siempre.
67. La tarjeta que le sale al chofer cuando el admin le asigna un pedido dice "Cambió tu ruta" → no le gusta. Cambiar a: "Se te asignó una nueva entrega" (1) / "Se te asignaron N entregas nuevas" (varias), con el cliente, cantidades y botón para verla en su ruta. Revisar también otros textos de ese tipo de tarjeta (pasar ruta, apoyo) para que digan lo que pasó en palabras simples.
68. Mapas: ya se ven (bien), PERO al mover el mapa deslizando a la izquierda/derecha, además de moverse el mapa, la app CAMBIA DE PESTAÑA (el gesto de deslizar entre secciones también se activa). Debe: cuando el dedo empieza encima de un mapa (o de cualquier cosa que se arrastra: carrusel, firma, etc.) NO se cambia de sección. Igual en los mapas dentro de fichas y del viaje.
69. PERMISOS AL PRIMER USO (idea del usuario, aprobada): la primera vez que se abre la app en un celular, una pantalla "Para que la app funcione bien" que explica y pide de una vez: Ubicación (mientras se usa la app), Cámara, Notificaciones (Android 13+), Bluetooth (solo si se va a usar impresora; si no, se pide al conectarla) y huella (se ofrece después del PIN, ya existe). Cada permiso con su renglón ✓/✗. Si alguno se niega: Android ya no vuelve a preguntar → botón "Abrir ajustes del celular" para darlo a mano. También revisarlo cada vez que se abre: si falta uno importante (ubicación/cámara para el chofer), avisar con ese mismo botón.
70. IDEA (para cuando tenga los celulares en físico): celulares del negocio LIMITADOS — que no se puedan instalar más apps que las escogidas. Opciones platicadas: (a) "Dueño del dispositivo" (Device Owner) con ADB en celular recién restablecido sin cuenta Google: `adb shell dpm set-device-owner …`; Ruta Fácil (o una app hermana) sería la administradora → bloquear instalar/desinstalar apps, lista de apps permitidas (WhatsApp, Maps, Teléfono, Cámara), no apagar la ubicación, no restablecer de fábrica, no quitar Ruta Fácil. (b) Rápido pero débil: `adb shell pm disable-user --user 0 com.android.vending` (quita Play Store; se puede volver a prender desde Ajustes y aún se pueden instalar APK). (c) Un MDM comercial. Recomendación: (a). Solo en celulares que sean del negocio y avisando a los choferes. PENDIENTE: decidir cuando tenga los celulares.
71. Se perdió la ANIMACIÓN DE ERROR: antes, al dar Guardar/Siguiente con algo faltante, el recuadro del campo se ponía ROJO y VIBRABA/saltaba, y se repetía en cada toque. Ahora solo sale el aviso abajo (toast) y el campo no se marca. Caso: viaje de carga → "Guardar esta báscula" sin nombre → sale "Escribe cómo se llama la báscula" pero el campo no se pone rojo ni se mueve. Debe: TODA validación de la app (incluidas las capas nuevas l26–l44: ubov, cxov, pedido por pasos, efectivo, simulador, vehículo "Ya se hizo", etc.) marca el campo faltante en rojo + sacudida (y vibración del celular) cada vez, lo enfoca y lo pone a la vista. Hacer una función única (marcaFalta) y que todas la usen.
72. Viaje de carga → "Báscula nueva": el campo "¿Cómo se llama?" está suelto sobre el fondo, sin tarjeta → se pierde y parece no importante. Meterlo en tarjeta (entra en el barrido del punto 64).
73. Viaje de carga → al terminar con un proveedor ("Listo" con Roly): la información sale suelta sobre el fondo, sin tarjetas. "¿Le pagaste dinero?" y su recuadro para escribir: el contorno es muy delgado y del mismo color que el fondo → no se ve dónde escribir. Debe: todo en tarjeta y los campos para escribir con contorno/fondo bien visibles (en toda la app: campos con borde más marcado y fondo distinto al de la tarjeta).
    → REGLA GENERAL (reiterada por el usuario): TODOS los apartados de la app que estén sobre el fondo van en su tarjeta. Sin excepciones. (Ver 64 y 72.)
74. DATOS DE LA DEMO QUE SE COLAN en la app real: en la ficha del proveedor Roly salen "20 cajas mías" aunque el usuario nunca lo puso. Causa encontrada: la semilla de la demo trae tarasProv={Roly:20} y el modo real ("vacío") no la borra. Debe: en la app real NO queda nada de la demo. Revisar TODA la semilla (cada dato que trae la demo: tarasProv, vjHist, cargas, quejas, excesos, provDir, precio.hist, mermas, rutasHist, etc.) contra lo que limpia el modo vacío, y limpiar todo; además una prueba que abra la versión real y confirme que ningún dato de la demo aparece (nombres Roly, Josue, Danu, Fruver Sol, Freightliner…). Ojo: Roly sí es proveedor real del usuario (lo dio de alta él), pero sus datos deben ser solo los que él capturó.
75. Alta de VEHÍCULO NUEVO: hoy es mucha información de jalón en una sola tarjeta → confuso. Debe ser PANTALLA COMPLETA (como la del viaje / pedido por pasos), una pregunta por paso con barra de avance, Atrás/Siguiente, validación con campo rojo + sacudida (punto 71). Pasos propuestos: 1 Tipo (carga/auto) · 2 Marca · 3 Modelo · 4 Año · 5 Placa (estado + número) · 6 Combustible y tanque · 7 Capacidad (cajas/kg) · 8 Odómetro actual · 9 Papeles (seguro, tarjeta, verificación: vencimientos) · 10 Fotos (frente, tarjeta, póliza) · 11 Revisar y guardar. Lo opcional se puede "Saltar". REGLA: toda alta grande de la app (cliente, proveedor, empleado, vehículo, carga) va así.
76. Tipo de vehículo al inicio del alta: "Vehículo de carga" o "Auto (no carga)". Si es AUTO: NO se piden capacidad en cajas/kilos, no sale en "¿quién lo entrega?" ni en "¿Cabe en la ruta?", no se le asigna ruta de reparto ni viaje de carga (sí gastos, combustible, papeles, taller, encargos). Se puede cambiar después en "Editar datos". La placa de carga/auto se toma de este mismo dato (ya no se pregunta aparte).
77. Huella (detalle visual): hoy es muy brusco — sale el lector del celular y "zas" ya está adentro. Debe: en la pantalla del PIN, mientras el celular lee, un ícono de huella con animación de "leyendo" (líneas que se llenan/pulso); al leerla bien → la huella se pone VERDE con palomita ✓ (y vibración corta), ~0.6 s, y luego la app se abre suave (desvanecido). Si falla → la huella se pone roja y se sacude, y queda el PIN.
78. Huella: si falla 3 VECES → se cierra el lector y se pide el PIN. Android por sí solo deja ~5 intentos y luego bloquea 30 s; en nuestra pieza nativa (RutaNativa.bioVerificar) se cuentan los fallos (onAuthenticationFailed) y al 3.º se cancela (cancelAuthentication) y regresa "usa tu PIN". Se ve con la animación roja del punto 77.
79. Huella/cara: SE USA LA PANTALLA DEL CELULAR (la de Android) — probado y funciona bien en Android 16 y Android 17 (Samsung). En el Samsung también ofrece desbloquear con la CARA → mantenerlo (por eso se usa BIOMETRIC_WEAK; no cambiar a STRONG o se pierde la cara en Samsung). Lo nuestro solo va alrededor: animación antes/después (77) y cortar al 3.er fallo (78). Textos de la app: decir "huella o cara" ("Entrar con tu huella o tu cara") cuando el celular tenga las dos.
80. Animación de inicio (la del logo): hoy se pierde (primera vez → pide correo; después → huella/PIN directo). DECIDIDO (09:39, aprobado por el usuario): dejarla pero CORTA (~0.8 s) e integrada: al abrir la app en frío, el logo se anima y se transforma en la pantalla del PIN/huella (sin esperar); al entrar bien (huella verde del punto 77) la app se despliega. Al volver de segundo plano NO se repite. Primera vez (sin cuenta): la animación completa una sola vez antes del correo, como bienvenida.
81. SEGURIDAD DE LA NUBE (pregunta del usuario). Google cuida los servidores y el cifrado, pero QUIÉN puede leer/escribir qué lo deciden NUESTRAS reglas de Firestore. Hacer auditoría y endurecer (pedir al usuario que pegue las reglas actuales de la consola; no las tengo en archivo):
    - Que nadie pueda cambiar su propio papel (un chofer no puede ponerse rol admin en usuarios_app); solo el dueño crea/quita admins (igual que en la app).
    - Choferes: escribir solo en su propia ruta (r~suId~…) y en lo compartido que de verdad usan; NO precios, sueldos, proveedores, usuarios, ni borrar clientes.
    - Contador: solo leer (y lo que capture).
    - Sin sesión: nada (salvo buscar usuario→correo para entrar; revisar que eso no exponga datos).
    - Bitácora en la nube de quién cambió qué (ya existe S.hist en la app; hacerla del lado del servidor no se puede sin Functions → al menos que cada escritura lleve uid y hora).
    - Respaldos automáticos de Firestore (exportación programada; requiere Blaze, ya está) para poder regresar si alguien borra algo.
    - Guardar las reglas en el repo (archivo firestore.rules) para no perderlas.
    → (09:43) Se hace MÁS ADELANTE, cuando el usuario esté en la oficina (en el celular le cuesta entrar a la consola). No es cambio de la app: son las reglas en Firebase. Yo las rearmo desde lo que usa la app, las pruebo con el simulador de nube, se las paso para pegar y las guardo en el repo (firestore.rules).

### HECHO para la siguiente versión (07 nov, tarde) · capas l45–l49 + nativo + reglas
54 ✓ cierre mandado = solo se ve (fotos fijas, sin reenviar) · 55 ✓ cámara: la causa era que Android 11+ no "veía" la app de cámara (faltaba <queries> IMAGE_CAPTURE); + permiso CAMERA y pantalla de permisos · 56 ✓ sin "seguir sin llenarlo (demo)" · 57 ✓ barrido de textos (demo/ejemplo/Prototipo/web/navegador; "prueba" solo en los 2 botones) · 58 ✓ burbuja → campo del proveedor · 59 ✓ burbujas como pestañas · 60 ✓ simulador por tarjetas con recorrido y km solos · 61 ✓ "+ Agregar cliente" por pasos · 62 ✓ filtros en cuadrícula con números + chofer en lista · 63 ✓ sin Infinity/NaN · 64/72/73 ✓ todo en tarjetas automático + campos con borde marcado · 65 ✓ pedido llega al chofer (aviso + notificación + "Regresa a cargar…", reabre sin permiso) · 66 ✓ carga extra sugerida (Ajustes) · 67 ✓ "Se te asignó una nueva entrega" · 68 ✓ mapa no cambia de sección · 69 ✓ permisos al primer uso + aviso al chofer · 70 ✓ modo "celular del negocio" (Device Owner por ADB, limitar instalar/desinstalar/restablecer/ubicación/cuentas, esconder apps, liberar) · 71 ✓ campo rojo + sacudida + vibración en toda la app · 74 ✓ sin datos de la demo (y limpieza única de lo que ya estaba en la nube) · 75/76 ✓ vehículo por pasos con tipo carga/auto (auto sin capacidad y fuera de repartos; cambiable en Editar datos) · proveedor por pasos · 77 ✓ animación huella (leyendo → verde → entra / roja) · 78 ✓ 3 fallos → PIN (en el nativo) · 79 ✓ pantalla del celular, "huella o cara" · 80 ✓ logo corto al abrir + bienvenida completa la primera vez · 81 ✓ reglas nuevas en firestore.rules con prueba automática en GitHub (falta que el usuario las PEGUE en la consola) · extra ✓ varias bodegas sincronizadas.

## 2026-11-07 12:08 · Prueba de 1.0.9
82. Cierre → "Contar por billetes": a cada billete ($1000, 500, 200, 100, 50, 20) ponerle botones grandes [ − ] número [ + ] para subir/bajar de uno en uno (son pocos billetes; más fácil que escribir). El número se puede seguir tocando para escribir si quiere. Monedas se queda como total en pesos (se escribe). El total contado y la diferencia se actualizan al momento con cada toque (con vibración cortita).
83. Avisos con redacción mala cuando los hizo el mismo que los lee: "Tú registró una báscula nueva", "Tú guardó la ubicación…". Debe: si lo hizo quien está viendo → en segunda persona bien conjugado ("Registraste una báscula nueva", "Guardaste la ubicación de Tienda X"); si lo hizo otro → "Danu registró…". Revisar TODOS los avisos/historial que arman el texto con el nombre de quien lo hizo (chofN/quien()), en todas las capas, con prueba que busque "Tú " seguido de verbo en tercera persona.
84. CRASH: admin, ya llegó el aviso del cierre del chofer; con el botón "📷 Escanear el ticket del corte" la app se CIERRA (crashea). Sospecha: el escáner usa la cámara del navegador (getUserMedia) dentro de la app; si el permiso de cámara no estaba dado, la petición nativa de Capacitor o el lector (BarcodeDetector) truena. Arreglo: pedir el permiso de cámara con nuestra pieza nativa ANTES de abrir el escáner; si no hay permiso → aviso + "Abrir ajustes"; y mejor hacer el escaneo con la pieza nativa (cámara de Android / ML Kit o ZXing) en vez del navegador. Atrapar cualquier error para que nunca cierre la app. Mismo arreglo para "Escanear QR del cliente" del chofer. CONFIRMADO (12:14): truena al TOCAR el botón, y la cámara YA tenía permiso → no es el permiso. Causa probable: el lector de QR del navegador (BarcodeDetector + getUserMedia) dentro del WebView de Android. DECISIÓN: cambiar a escáner NATIVO de Google (ML Kit "code scanner" de Play Services: GmsBarcodeScanning.startScan) en RutaNativa — trae su propia pantalla, no necesita permiso de cámara y es muy estable; el lector del navegador queda solo de respaldo y envuelto para que nunca cierre la app. LOG CONFIRMADO (12:34, crash.txt del usuario): FATAL EXCEPTION Chrome_InProcGpuThread · GooglePlayServicesMissingManifestValueException ("falta meta-data en AndroidManifest") · en org.chromium.shape_detection.InterfaceRegistrar.bindBarcodeDetectionProvider. O sea: el lector BarcodeDetector del WebView usa Play Services y, como el APK no declara com.google.android.gms.version, truena TODO el proceso. ARREGLO: (1) NO usar BarcodeDetector nunca más; (2) escáner nativo con com.google.android.gms:play-services-code-scanner (GmsBarcodeScanning) en RutaNativa (esa librería ya trae la meta-data); (3) si el celular no tiene Play Services → aviso, sin cerrar la app.
85. Recepción del cierre (admin) más simple: hoy hay que escribir cuántas cajas/kilos regresó. Debe SUGERIR arriba lo que debe regresar: "Debe regresar: N cajas vacías · N cajas llenas (roatán) · N kg de macho · $ efectivo", y facilitarlo: botón grande "✓ Sí, llegó todo eso" (un toque) y "No, llegó diferente" → solo ahí se escriben (con +/−) los que no cuadran; diferencia → aviso. DECIDIDO (12:37): MOSTRAR TODO (también el efectivo esperado; ya no a ciegas). "No, llegó diferente" abre solo los renglones con +/− y escribe el real; la diferencia va al aviso del faltante/sobrante.
86. Historial de ubicaciones del chofer + cuánto tardó en cada parada. Propuesta:
    - Solo mientras está en ruta/viaje (desde "Iniciar ruta" hasta su cierre), con el GPS que ya se manda (cada 2 min o 200 m). Se guarda el recorrido del día en su ruta (gpsH), poquitos puntos (no se llena la nube).
    - Por parada: llegó (al estar a ~100 m del cliente o al abrir su entrega) y se fue (al guardar la entrega o alejarse) → "Tienda X · 10:12 a 10:25 · 13 min". También tiempo de manejo entre paradas y paradas largas fuera de clientes (>15 min en un lugar que no es cliente).
    - Admin: Personal → chofer → pestaña Ruta: mapa con la línea del recorrido + lista de paradas con tiempos; selector de día (se guardan 30 días y luego se borran).
    - Resumen: tiempo total, km aproximados, promedio por cliente.
    - Al chofer ya se le dice "el administrador ve tu ubicación" (seguir avisándole).
87. GPS del chofer: DECIDIDO (12:44) CADA 30 SEGUNDOS (o cada 100 m), en ruta Y en viajes de carga (por si hay un percance: saber por dónde se fue y dónde quedó la última señal). ~1,200 envíos al día por chofer: sigue siendo poco. (Antes se pensó cada minuto (antes cada 2 min o 200 m) → cada 1 min o cada 100 m, lo que pase primero. Costo: ~600 escrituras al día por chofer en 10 h (muy poco para Firebase); batería casi igual porque el GPS ya está prendido. Mejor precisión para el punto 86 (tiempos por parada).
    - IMPORTANTE (para que sirva de verdad en un percance): hoy el GPS sale del navegador de la app y Android lo DETIENE con la pantalla apagada o la app minimizada. Hacer un servicio nativo de ubicación "en primer plano" (notificación fija "Ruta Fácil está registrando tu ruta") que sigue mandando con la pantalla apagada, solo durante ruta/viaje; se apaga solo al mandar el cierre o terminar el viaje. Requiere permiso de ubicación "Permitir todo el tiempo" (ACCESS_BACKGROUND_LOCATION) → agregarlo a la pantalla de permisos (punto 69) con explicación.
    - Admin: "Última señal hace X min" en el mapa; si un chofer en ruta deja de mandar más de 10 min → aviso URGENTE "Danu no manda ubicación desde las 11:40 (batería 8%)" con el último punto en el mapa y botón Llamar. Mandar también el nivel de batería con cada punto.
88. UBICACIÓN SIEMPRE (decisión del usuario 12:46, por seguridad contra tranzas / asaltos fingidos):
    - El servicio nativo de ubicación NO depende de la sesión: el celular del negocio manda su ubicación SIEMPRE (pantalla apagada, app minimizada, sesión cerrada). Se identifica por el CELULAR (no por el usuario) → "Celular de Danu".
    - Que no lo puedan apagar: con el modo "celular del negocio" (punto 70) se bloquea apagar la ubicación, quitar el permiso, forzar el cierre / desinstalar la app; el servicio arranca solo al prender el celular.
    - Avisos URGENTES al admin: cerró sesión con la ruta abierta · apagó la ubicación o quitó el permiso · el celular se apagó (última señal + batería) · el celular se reinició.
    - SIN SEÑAL (ej. Sierra de Axalan 20–40 min): los puntos se GUARDAN en el celular y se suben cuando regresa la señal → se ve el recorrido completo por la sierra. Aviso: a los 15 min "Danu sin señal desde 11:40" (aviso normal) y a los 45 min URGENTE con última ubicación, batería y botón Llamar. (Ajustable en Ajustes.)
    - Fuera de horario de trabajo: mandar con menos frecuencia (cada 5 min) para cuidar batería y datos; en ruta/viaje cada 30 s.
    - Avisar por escrito a los choferes que el celular del negocio manda su ubicación siempre (y que es solo en celulares del negocio, no en los personales).
89. DECIDIDO (12:48): la app de chofer SOLO en celulares del negocio (nunca en personales: evita pretextos de datos/batería). Fuera de horario: ubicación cada 5 min (confirmado).
90. Entrega y recepción de EQUIPO en la bodega: el chofer deja al terminar el día y recoge al empezar: celular, terminal de tarjeta, impresora de tickets y el vehículo (llaves). Propuesta:
    - Bienes (Ajustes → bienes) ya tienen estos equipos; cada uno asignado a un chofer/vehículo.
    - Al empezar (salida): "Recibo: celular ✓ · terminal ✓ · impresora ✓ · llaves ✓" (un toque cada uno; batería del celular y de la terminal).
    - Al terminar (en la recepción del cierre del punto 85, lado admin): "Entregó: celular ✓ terminal ✓ impresora ✓ llaves ✓" con el mismo botón "✓ Sí, entregó todo" / "Falta algo" → aviso URGENTE si falta algo (y con la ubicación del celular si no se entregó).
    - Si un equipo no se entrega en X horas después del cierre → aviso.
    - (12:49) Cada equipo con [Buen estado] / [Mal estado]; si "Mal estado" → nota corta de qué tiene (ej. "pantalla estrellada", "la terminal no prende") + foto opcional. Se guarda en la ficha del bien (historial de daños con fecha y quién lo tenía) y llega aviso al admin. Al RECIBIRLO en la mañana también se marca el estado, para saber si el daño ya venía de antes (quién lo dañó).
91. Aviso "el efectivo de X no coincide" (faltante) → botones en el mismo aviso:
    - "Descontárselo de su pago" → se anota como deuda del chofer (como los adelantos) y sale descontado en su próximo pago de sueldo con la leyenda "Faltante del cierre del 07/nov".
    - "Ya lo pagó" → entra a caja ahora.
    - "No descontar" (lo absorbe el negocio) → queda como faltante de caja en los números, con nota de por qué.
    - Si es SOBRANTE: "Guardarlo en caja" o "Es del chofer (se le regresa)".
    - El chofer ve en su ficha/pago cuánto se le va a descontar y por qué. Todo queda en el historial.
92. REGLA GENERAL (reiterada 12:51): casi todas las funciones que piden datos o decisiones se abren como TARJETA INTERACTIVA A PANTALLA COMPLETA (el mismo motor por pasos del alta de vehículo/cliente, l47 "wz"): una pregunta por pantalla, botones grandes Sí/No y opciones, campos grandes, barra de avance, Atrás/Siguiente, campo rojo + sacudida si falta. Aplica a todo lo de hoy: billetes con +/− (82), recepción del cierre (85), entrega/recepción de equipo con buen/mal estado (90), faltante del chofer (91), y además pasar a ese formato: gasto, carga extra, "No estaba", pedido del chofer, encargos, pagos a proveedor, abonos, cierre del mes, "Ya se hizo" de vehículos, alta de empleado, permisos, etc. Hacer inventario de TODOS los formularios de la app y convertirlos.
93. GUÍA PARA UNA PERSONA NUEVA (12:53): entrando como admin NO le salió ningún tutorial ni sugerencia, aunque se acordó que los primeros días saldrían. Meta del usuario: darle el celular a alguien que solo conoce el negocio (va por vehículo → carga → reparte → regresa → entrega vehículo y cuentas) y que la app lo vaya llevando sola, sin que él explique nada.
    Causas probables (revisar): el tutorial por días no tiene nada para el día 1 (solo días 2+), depende de haber visto el tutorial principal, y "Aprende la app" quedó hasta ABAJO de Inicio (no se ve).
    Hacer:
    - "¿Qué sigue?" en cada pantalla: si la persona se queda sin hacer nada ~15–20 s (primeras 2–3 semanas), sale un globito con qué puede hacer AQUÍ y el siguiente paso de su día, con "Muéstrame" (resalta el botón) y "Ya entendí".
    - "Hoy te toca" arriba en Inicio (admin) según la hora y lo que falta: fijar precio → revisar viajes → ver choferes en ruta → recibir cierres → resumen. Para el chofer, su día ya va por pasos; reforzar con "Ahora sigue: …".
    - Tutorial por días: que SÍ salga desde el día 1 (admin y chofer) aunque no se haya visto el principal; probar en la versión real.
    - "Aprende la app" ARRIBA (no al final) mientras no esté completo.
    - Botón "?" en cada pantalla: qué es esta pantalla y para qué sirve, en palabras simples.
    - Probarlo como persona nueva: una prueba que abra la app real sin datos y verifique que en cada pantalla aparece guía.
94. Simulador (paso 2 "¿Va a pasar a la báscula?"): solo da "No pasa" + las básculas ya guardadas; falta "+ Otra báscula (nueva)" → nombre + ubicación (pegar link de Maps o "la guardo al llegar"). Se guarda en básculas para los viajes. Revisar lo mismo en programar viaje de carga y en registrar carga: en todos los lugares donde se escoge báscula/proveedor/cliente debe existir "+ Nuevo/a" ahí mismo.
95. ROATÁN: se COMPRA POR KILO al proveedor y se VENDE POR CAJA al cliente (macho: kilo y kilo). El simulador pregunta "cajas de roatán y precio por caja" → MAL. Debe: ¿cuántas cajas quieres sacar? (o ¿cuántos kilos?) + precio por KILO con el proveedor; la app convierte con los kilos por caja (KGC_IDEAL / el promedio real de las cargas) → costo por caja = kg por caja × precio kg + gastos/caja; venta = cajas × precio de venta por caja. Revisar en TODA la app que la compra de roatán sea por kilo (programar viaje, registrar carga, pedir al proveedor por WhatsApp, viaje pactado vs real, Excel) y la venta por caja.
96. Preguntar SOLO lo que corresponde a lo que vende cada proveedor escogido (provDir[n].tipo: Roatán / Macho / Ambos): si solo hay proveedores de roatán → no preguntar macho; si solo macho → no preguntar roatán; si hay de los dos (o uno que vende "Ambos") → preguntar las dos, y por proveedor (cuánto con cada uno). Si un proveedor no tiene tipo guardado → preguntarle una vez "¿Qué te vende X?" y guardarlo. Aplica al simulador, programar viaje, registrar carga y pedido al proveedor.
97. Simulador → "Programar este viaje": te saca a Cargas y no hace nada visible; solo sale un aviso chiquito "Escoge el chofer y la fecha / falta asignar vehículo y chofer" sin decir dónde. Debe: seguir DENTRO de la misma pantalla por pasos: ¿Quién va? (chofer, botones grandes) → ¿En qué vehículo? (ya sugerido el del simulador; solo de carga) → ¿Qué día y hora? → Revisar todo → "Programar viaje" → CONFIRMACIÓN "¿Seguro? Se le avisa al chofer" [Sí, programar] [Regresar]. Y después poder DESHACER/CANCELAR un viaje programado (mientras no haya salido) con su confirmación.
98. REGLA: ningún aviso de "falta X" sin llevarte a X. Todo "falta…" abre/resalta el campo o el paso exacto (con el rojo + sacudida del punto 71). Revisar todos los toast de validación de la app.
99. REGLA: toda acción importante que no se puede deshacer (programar/asignar viaje, mandar cierre, dar de baja, borrar, pagar, autorizar) pide "¿Estás seguro?" con Sí/Regresar grandes, y donde se pueda, ofrece "Deshacer" unos segundos después.
100. MAPAS DE GOOGLE (12:59). Precios verificados (developers.google.com/maps/billing/pricing): "Maps SDK" (mapa nativo de Android/iOS) = uso ILIMITADO sin costo; Maps JavaScript "Dynamic Maps" = 10,000 cargas gratis al mes y luego $7 USD por cada 1,000. RECOMENDACIÓN: mapa NATIVO de Google (plugin @capacitor/google-maps, va debajo de la app) → gratis siempre; Leaflet queda de respaldo. Pasos del usuario: (1) console.cloud.google.com → proyecto de Firebase; (2) Biblioteca → habilitar "Maps SDK for Android"; (3) Credenciales → Clave de API → restringir a app Android com.rutafacil.app + huella SHA-1 de la firma (yo la saco en GitHub Actions) y a la API "Maps SDK for Android"; (4) guardar la clave como secreto MAPS_KEY en GitHub; (5) Facturación → Presupuestos y alertas → alerta de $1 USD. Yo: plugin + meta-data en el manifest + reemplazar los mapas (ruta, viaje, en vivo, fichas) por el de Google.
    → (13:21) Clave de Maps recibida (empieza AIzaSyAG5…). No pude guardarla como secreto desde aquí (GitHub bloquea esa parte) → el usuario la guarda como secreto MAPS_KEY. Huella de la firma (SHA-1): 7D:23:DA:00:44:F3:08:CB:6E:6C:0A:E5:53:8E:9D:7D:A7:78:48:BE · paquete com.rutafacil.app. Falta: que el usuario restrinja la clave a esa app + API "Maps SDK for Android", y presupuesto de $1.
    → (13:30) El usuario dice "Listo": clave restringida (app + Maps SDK for Android) y guardada. Al armar: el workflow lee secrets.MAPS_KEY y la mete en el AndroidManifest (meta-data com.google.android.geo.API_KEY); si el secreto no existe, la app usa el mapa de respaldo (Leaflet) sin tronar.

### HECHO para 1.0.10 (07 nov, tarde-noche) · capas l50–l56 + nativo (RutaGps, RutaArranque, escáner) + reglas gps
- 82 billetes [−][+] (vibra) · 85 tarjeta "Recibir el cierre": Debe regresar → "Sí, llegó todo" / "No, llegó diferente" (+/−) · 90 equipo Buen/Mal/No lo entregó al salir y al recibir (nota+foto, historial del bien lo aplica el admin, URGENTE si mal/falta; aviso si a las 3 h no ha entregado) · 91 faltante: descontar / ya lo pagó / no descontar; sobrante: caja / es del chofer; en su sueldo sale "Faltante del cierre del dd/mmm".
- 83 avisos en 2ª persona (avYo) + prueba tu.js · 84 escáner nativo (GmsBarcodeScanning), sin BarcodeDetector en la app; sin Play Services → aviso.
- 86–89 servicio nativo de ubicación siempre (30 s en ruta/viaje, 5 min fuera), arranca al prender, guarda sin señal y sube por REST (n/pn/gps, n/pn/gpsp), batería, eventos (apagado, ubicación apagada, sin permiso, sesión cerrada con ruta abierta) → avisos con Llamar y Ver dónde; 15/45 min en Ajustes; recorrido del día en ficha del chofer → "Ruta y metas" (tiempos por cliente, paradas raras >15 min, manejo, km, promedio); borra >30 días; permiso "todo el tiempo"; celular administrado deja la ubicación fija.
- 92 pantalla completa: gasto, Ya se hizo, encargo, abono de cliente y pago a proveedor (por pasos), pedido del chofer, incidente, corrección. (Alta empleado, pedido admin, vehículo, cliente, proveedor ya eran por pasos.)
- 93 Hoy te toca (admin), Ahora sigue (chofer), Aprende arriba, "?" en el encabezado de cada pantalla, burbuja ¿Qué sigue? a los 18 s quieto (3 semanas), tutorial desde el día 1 por persona.
- 94–97 simulador: + Otro proveedor / + Otra báscula ahí mismo, qué vende (una vez), carga por proveedor con precio por KILO del roatán (kg/caja real), programar sigue en la tarjeta (quién, día/hora, efectivo, revisar, ¿Seguro?), un viaje por proveedor; cancelar viaje programado; carga con proveedor nuevo se da de alta; pedido WhatsApp según lo que vende.
- 98 errores de dato marcan el campo · 99 ¿Estás seguro? (Sí/Regresar grandes) en encargos, pagos, quitar acceso, cerrar sesión, programar, quitar de ruta, merma, venta, efectivo de viaje, autorizar fiado, lote maduro, borrar pesada; Deshacer en lo nuevo.
- 100 Google Maps nativo en pantalla completa ("Ver en Google Maps" bajo cada mapa) si la app trae MAPS_KEY; los mapas dentro de la pantalla siguen con Leaflet.
- Pendiente del usuario: pegar firestore.rules nuevo en la consola (ahora incluye gps y gpsp).

### 1.0.14 (07 nov 18:xx) · Google Maps DENTRO de cada pantalla (l57): mapa nativo debajo de la app con hueco transparente; se mueve con el scroll; si falla → Leaflet; interruptor por celular en Ajustes ('Mapas de Google'). Botón '⤢ Ver más grande' abre pantalla completa.

## 2026-11-07 18:34 · Prueba de 1.0.14 — SOLO ANOTAR (el usuario pidió NO hacer cambios)
101. Google Maps dentro de las pantallas: el mapa se ve EN BLANCO. (Mientras: Ajustes → Mapas de Google → No para usar el mapa de antes.) Falta saber: ¿blanco/del color del fondo o gris con el logo de Google?
    → (18:34) Vista pequeña: BLANCO (el hueco no deja ver el mapa nativo: WebView/ancestros no transparentes o el mapa no queda debajo). 'Ver más grande': sale logo de Google + botón de ubicación pero NO cargan calles → Google rechaza la llave (sospecha: facturación no ligada al proyecto, Maps SDK for Android no habilitada, o restricción paquete/SHA-1). Pedir log: adb logcat | grep -i 'Google Maps Android API'.
102. (18:37) Ya con Mapas de Google APAGADO: chofer en el cierre, después de la foto de lo que se entrega → paso de contar billetes: la pantalla NO se desliza (los botones sí responden). Sospechas: (a) el plugin de Google Maps dejó 'agarrado' el toque del WebView aunque ya se apagó; (b) quedó la clase/capa del mapa (gmin/gmon) bloqueando; (c) algo del paso de billetes nuevo (+/−). Preguntar: ¿pasa en otras pantallas? ¿se arregla al cerrar y abrir la app? El usuario también siente que Google Maps causa muchos errores.
103. (18:39) Cierre → 'Contar por billetes' (desplegable): al tocar + o − de un billete A VECES se cierra el desplegable. Sospecha: el render redibuja y el 'abierto' depende de c.billOn, no de que lo abrió con el dedo → al abrirlo marcar billOn/S.dOpen y nunca cerrarlo por un render.
104. (18:39) En billetes, el cuadrito del número (entre − y +) tiene FONDO GRIS con número negro: no se lee. Revisar estilo del input dentro de .mm (posible tema oscuro/estilo de input deshabilitado). Debe verse claro y grande, con buen contraste en tema claro y oscuro.
    → (18:39) Captura (fotos/p104-billetes.png): los cuadritos de número de TODOS los billetes y el de Monedas salen gris oscuro con número negro/verde oscuro (también el placeholder 0). Tema del celular claro (la página se ve clara).
105. (18:39, de la captura) Arriba salen DOS botones '?' juntos en el encabezado (debe haber uno solo).
106. (18:39, de la captura) La burbuja '¿Qué sigue?' salió en medio del cierre, tapando 'Total contado', el número de bolsa y casi los botones Atrás/Siguiente. No debe salir mientras la persona está haciendo algo (pasos del cierre, formularios, si escribió o tocó hace poco, o si intentó deslizar); y no debe tapar los botones de abajo. Revisar si el 'no se desliza' (102) tiene que ver con esto.
    → 102 (18:40): al CERRAR Y ABRIR la app ya se desliza. Causa probable: el plugin de Google Maps dejó agarrado el toque del WebView aunque se apagó (o la burbuja). Arreglo: al apagar/quitar mapas, soltar el toque (destruir mapas y reiniciar sin recargar), y que la burbuja no bloquee nunca el deslizar.
107. (18:43) Cierre ya mandado y confirmado: las fotos del vehículo sí aparecen (miniaturas) pero al tocarlas NO se hacen grandes. Toda foto en miniatura debe abrirse en grande al tocarla (con zoom y para cerrar), en el lado del admin y del chofer.
    → 107 (18:44): pasa en la pantalla del ADMINISTRADOR (cierre recibido). Revisar compFotos/miniaturas del cierre en cierreAdm y que abran el visor #fgov (y en todas las miniaturas de la app).

## 2026-11-07 18:45 · LISTA NUEVA (el usuario pidió volver a numerar desde 1; los 1–100 ya están hechos) — SOLO ANOTAR
1. (antes 101) Google Maps dentro de las pantallas: vista pequeña en BLANCO; "Ver más grande" muestra logo de Google y botón de ubicación pero no cargan calles (llave rechazada: revisar facturación / Maps SDK for Android / paquete + SHA-1; pedir log "Google Maps Android API").
2. (antes 102) Después de usar Google Maps, la pantalla dejó de deslizarse (aun apagado) hasta cerrar y abrir la app.
3. (antes 103) "Contar por billetes": al tocar + o − a veces se cierra el desplegable.
4. (antes 104) Cuadritos del número de billetes y monedas: fondo gris oscuro, número negro → no se lee (tema claro). Ver fotos/p104-billetes.png.
5. (antes 105) Dos botones "?" en el encabezado.
6. (antes 106) La burbuja "¿Qué sigue?" sale en medio del cierre y tapa contenido y casi los botones Atrás/Siguiente.
7. (antes 107) Admin, cierre ya recibido: las fotos del vehículo no se abren en grande al tocarlas.
8. (21:46) Ficha del chofer → "Su recorrido": sí sale tiempo en la calle y la línea del recorrido, pero FALTA el HISTORIAL DE UBICACIONES navegable: (a) "Dónde está ahora / última ubicación" (hora, hace cuánto, batería) con botón para ir ahí (abrir en Google Maps / cómo llegar); (b) lista de paradas por hora, cada una tocable → centra el mapa en ese punto y botón "Ir" (Google Maps); (c) lista de puntos por hora (cada 30 s / 5 min) agrupada para poder ver dónde estuvo a tal hora. Probado con el celular del usuario (ya sube ubicaciones: reglas OK).
9. (21:50) El selector de fecha de "Su recorrido" también sale oscuro (fondo gris oscuro, texto oscuro). CAUSA (igual que el 4): el celular está en modo oscuro (automático de noche) y la app en modo claro; los campos (input) toman los colores oscuros del sistema porque la app no le dice al navegador que está en claro. Arreglo: cuando la app está en claro → color-scheme: light (y en oscuro → dark), y fondo/texto explícitos en TODOS los campos (input, select, date, textarea). Probar con el celular en oscuro y la app en claro, y al revés. Foto: fotos/p9-fecha-oscura.jpg
10. (21:50, de la captura) El mapa de "Su recorrido" sale con TODO México (de Tijuana a CDMX) porque la BODEGA ("B") está en Ciudad de México (ubicación de ejemplo, no la real). Arreglos: (a) el mapa del recorrido debe acercarse solo a los puntos de ese día (no meter la bodega si está lejos); (b) pedir/avisar que falta guardar la ubicación real de la bodega (y no usar la de ejemplo en la versión real).
    → 10 CORREGIDO (21:51): la bodega en BANDERILLA, Veracruz SÍ es la real (la operación es en Veracruz; el usuario vive en Tijuana y prueba desde allá). Hoy la ubicación de la bodega está FIJA en el código (BOD = Banderilla) y NO hay dónde cambiarla. Hacer: (a) en Ajustes → Bodegas, cada bodega (también la principal) con "Cambiar ubicación": "Estoy aquí, guardar" (GPS) o pegar link de Google Maps; que todos los mapas, km y rutas usen esa; (b) el mapa del recorrido se acerca solo a los puntos del día (si la bodega está lejos, no la mete).
    → 1 (21:57) Log: la app manda la llave correcta (AIzaSyAG5…ZNQ) y la huella correcta (7D:23:…:BE;com.rutafacil.app). La app está bien; el problema está en Google Cloud (facturación, Maps SDK for Android habilitada en EL MISMO proyecto de la llave, o restricción de la llave). Prueba sugerida: quitar temporalmente la restricción de app de la llave.
    → 1 (22:06) CAUSA ENCONTRADA: Google Cloud muestra 'Tu prueba gratuita requiere un prepago' → la facturación no está activa hasta que haga el prepago (se acredita en ≤24 h). Llave 'Maps Platform API Key' en 'My First Project', restricción Apps para Android + 1 API: bien. Decisión pendiente del usuario: hacer el prepago o quedarse con el mapa de antes.
    → 1 (22:09) El usuario intentó el prepago: Google pidió verificar tarjeta + identificación; lo contactarán en los próximos días. Mientras: mapa de antes (Leaflet). Cuando Google active la facturación → probar Mapas de Google.
11. (22:11) Botón "Ordenar ruta" con datos de TRÁFICO de Google. Propuesta: Routes API "Compute Routes" con optimizeWaypointOrder + TRAFFIC_AWARE (1 llamada por ordenar; máx. 25 paradas por llamada, si hay más se parte). Con tráfico cuenta como "Pro": 5,000 gratis al mes, luego $10 USD/1,000 (≈ $0.01 USD por ordenar). NO usar Route Matrix (cobra por par: 30 paradas ≈ 900 elementos por vez). Llamar desde la pieza nativa (la llave está restringida a Android; mandar X-Android-Package/X-Android-Cert) y habilitar "Routes API" en la llave. Si no hay señal o falla → orden de siempre. Pendiente: que el usuario confirme. Requiere facturación activa (verificación de Google en proceso).
    → 11 (22:13) Aclarado: en la MISMA llamada Google regresa el orden + tiempo de cada tramo (cliente a cliente) + total del día → mostrar al chofer hora estimada de llegada a cada cliente y de regreso. Tráfico sirve sobre todo en ciudad (Xalapa); en carretera casi no. Recalcular durante el día (ej. al llegar a cada cliente o con botón) = otra llamada (~1 centavo de dólar). Usuario de acuerdo con la idea.
12. (22:14) Que la app APRENDA de sus propias rutas (con el historial de GPS del punto 86) y pida menos a Google:
    - Guarda por cada tramo (cliente A → cliente B) cuánto tardan de verdad, por franja de hora/día; y por cliente cuánto tardan ATENDIÉNDOLO (eso Google no lo sabe).
    - Cuando un tramo tiene suficientes viajes (ej. 3+), usa lo aprendido; Google solo para tramos/clientes nuevos o cuando no hay datos; si hay datos de todo, la app ordena sola sin pedir nada.
    - Hora estimada = manejo (aprendido o Google) + tiempo de atención de cada cliente → más exacta que Google solo.
    - Ir mejorando con cada día (promedio que pesa más lo reciente). Mostrar al admin "estimado vs real" por ruta.
13. (00:24) Pasar a TARJETA DE PANTALLA COMPLETA (paso a paso, botones grandes, ¿Seguro?) lo que falta del punto 92: "No estaba" en la entrega; cierre del mes; carga extra del chofer; pedir permiso para fiarle a un cliente; registrar carga; programar viaje desde la lista de proveedores (vjForm). Revisar si queda algún otro formulario suelto y convertirlo también.
14. (00:27) Después de poner la huella, el tutorial/sugerencias salen ENCIMA de la pantalla de bienvenida que dice "Comenzar". Propuesta (recomendada): dejar la pantalla de Comenzar pero con dos botones: "Ver cómo se usa (1 min)" → arranca el tutorial; "Ya sé usarla" → entra directo (el tutorial queda en "Aprende la app"). Nada de tutorial/burbuja/¿Qué sigue? mientras esté esa pantalla (ni PIN, ni permisos, ni intro). Esperando decisión del usuario.
15. (00:29) Al abrir la app salen las tarjetas de aviso URGENTE y ENCIMA vuelve a salir el tutorial/sugerencias. Orden correcto: intro → huella/PIN → pantalla Comenzar → avisos urgentes (atenderlos) → hasta entonces tutorial / ¿Qué sigue?. Nunca encimados.
16. (00:29) Avisos de ubicación: salen MUCHAS tarjetas del mismo celular ("no manda su ubicación…"). Propuesta: UNA sola tarjeta por celular que se va actualizando (15 min → 45 min URGENTE, mismo aviso, no uno nuevo); cuando el celular se reconecta y sube lo pendiente, la tarjeta SE QUITA SOLA y queda solo una línea en el historial: "Celular de Danu estuvo sin señal de 10:12 a 11:05 (53 min)". Igual con apagado/encendido: "Se apagó de 22:10 a 06:30". Si de verdad sigue sin señal o apagado, la tarjeta se queda. Limpiar también las que ya existen repetidas.
    → 16 (00:31) Usuario de acuerdo. ADEMÁS: que NO se vean las coordenadas ni el [tel:…] en ninguna tarjeta (en las tarjetas URGENTE emergentes sí salen como texto: esas no pasan por avRow). En su lugar solo botones '📍 Ver dónde' y '📞 Llamar'. Revisar en todos los lugares donde se muestran avisos (tarjetas urgentes, burbuja, historial, notificación del celular).
17. (00:32) Tarjetas de aviso URGENTE al abrir la app: el botón "Atender" NO hace nada (parece que espera que atiendas la tarjeta de atrás / la siguiente). Arreglo:
    - Mostrar UNA tarjeta a la vez, con "1 de 4", y la de enfrente es la que manda (sus botones siempre funcionan).
    - "Atender" hace algo útil SIEMPRE según el aviso: ubicación → abre la ficha del chofer en "Su recorrido" con la última ubicación (y Llamar / Ver dónde); faltante → recepción del cierre; equipo → bienes del chofer; pedido/permiso → lo que toca; si no hay a dónde ir → marca como atendido y quita la tarjeta.
    - Al atender se quita esa tarjeta y sale la siguiente; al terminar todas → hasta entonces tutorial / ¿Qué sigue? (ver 15).
    - Probar con varias tarjetas juntas (de ubicación, faltante, equipo, pedidos).
18. (00:33) A veces pide la HUELLA DOS VECES aunque el celular la reconoció bien. Sospecha: la ventana de huella del sistema hace que la app "se vaya al fondo" y al regresar se activa el bloqueo de visibilidad (visibilitychange → relock) y la vuelve a pedir; o se dispara dos veces al abrir (al cargar + al reanudar). Arreglo: no volver a bloquear mientras la huella está abierta ni justo después de aceptarla (ventana de unos segundos), y un solo disparo de huella a la vez. Probar abriendo la app en frío y regresando de otra app.
    → 14 (00:34) Captura: fotos/p14-tutorial-sobre-comenzar.jpg — el consejo del día "1 de 2 · Cierres de los choferes" sale encima de la pantalla de bienvenida (Plátanos Nietos) y TAPA el botón Comenzar.
19. (00:34, de la captura) Textos del tutorial DESACTUALIZADOS: "Cuéntalo sin ver cuánto debía" ya no aplica (desde el punto 85 la recepción muestra todo lo que debe regresar y solo confirmas). Revisar TODOS los pasos del tutorial principal, los consejos por día y "¿Qué sigue?" contra cómo funciona la app ahora (recepción del cierre, billetes +/−, equipo, simulador que programa, abonos/pagos por pasos, GPS, etc.).
20. (00:37) Aviso "El efectivo de X no coincide: él dijo $13,180 y se contaron $13,150": al tocarlo manda a la ficha del chofer → "Ruta y metas", que no sirve para nada. Debe abrir DIRECTO la tarjeta de pantalla completa del faltante: cuánto dijo, cuánto se contó, la diferencia ($30), y botones "Descontárselo de su pago" / "Ya lo pagó" / "No descontar" (con ¿Seguro?). Si fue sobrante: "Guardarlo en la caja" / "Es del chofer". Ya decidido → la tarjeta se quita y queda en historial. Revisar que TODOS los avisos lleven a donde se resuelve (ver 17).
    → 20 (00:37) Además: si el faltante YA se decidió al recibir el cierre (descontar / ya lo pagó / no descontar), el aviso "no coincide" debe DESAPARECER solo (y cualquier aviso cuyo asunto ya se resolvió por otro camino). Al abrir la app, limpiar los avisos ya resueltos.
21. (00:40) Apartado de AVISOS se llena muchísimo de avisos azules "info" (con solo unas pruebas: cargar, visitar cliente, alta de cliente, venta, volver a cargar, ~5 clientes). Propuesta:
    - Avisos = SOLO lo que pide hacer algo o es importante (urgente, por decidir, por autorizar). Lo demás (registró, guardó, entregó…) va a "Actividad del día"/historial, no a avisos.
    - Lo informativo que sí se quede: agrupado por chofer/tipo en una sola línea ("Danu: 5 entregas, 1 cliente nuevo") y se borra solo al día siguiente.
    - Arriba: "Por atender (N)" y abajo "Informativos" plegado; botón "Marcar todo como visto".
    - Revisar cada aviso que crea la app y decidir: urgente / por atender / informativo / solo historial.
    → 21 (00:41) Idea del usuario (aceptada): lo que pasó en la ruta (volvió a cargar, reabrió su ruta, clientes nuevos, ventas, gastos, "No estaba", cambios) NO va a avisos: se muestra en un RESUMEN DEL DÍA dentro de la recepción del cierre ("Lo que pasó hoy en su ruta") antes de confirmar el efectivo — sirve para revisar los números. También queda en la ficha del chofer (Ruta y metas → por día) y en Actividad del día. Excepción: si algo necesita permiso o es raro (reabrir ruta sin permiso, carga extra grande, venta a crédito arriba del límite) → sí aviso "por atender".
22. (00:43) "Hoy te toca": el 4 "Recibir los cierres" y el 5 "Mandarte el resumen del día" NO hacen nada al tocarlos. Regla: ningún renglón/botón puede quedarse sin respuesta.
    - Si se puede: lleva directo a hacerlo (recibir cierre → tarjeta de recepción; resumen → manda el resumen por WhatsApp).
    - Si todavía no se puede: mensaje claro y el renglón lo dice ("Aún no hay cierres. Te aviso cuando un chofer mande el suyo." / "El resumen se puede mandar cuando recibas los cierres del día (faltan 2: Danu, Rafa)").
    - Mostrar el estado en el mismo renglón (ej. "Recibir los cierres · 0 de 3 mandados"). Revisar también los demás renglones (precio, viajes, choferes en ruta) y "Ahora sigue" del chofer.
23. (00:45) "Así se hace": al escoger un tema sale una lista con CADA cliente y CADA proveedor uno por uno (con 50 clientes y 20 proveedores sería larguísima). Arreglo: agrupar ("Faltan datos de 12 clientes · 3 proveedores") y al tocar se abre la TARJETA DE PANTALLA COMPLETA paso a paso (como el simulador): uno por uno con "Siguiente / Saltar", buscador y contador "3 de 12". Recordatorio del usuario: la interfaz de pantalla completa se iba a usar en TODO lo que se pudiera y no se ha hecho en todo → revisar la app completa (listas largas, formularios, pasos guiados) junto con el punto 13. Pedir captura si hace falta ubicar exacto "Así se hace".
    → 23 CORREGIDO (00:46): "Así se hace" son las NOTAS DEL DUEÑO para el encargado y los choferes (cada nota sale sola en su cliente, proveedor o paso). El problema: el selector "Tema" trae una opción por CADA cliente y CADA proveedor → lista larguísima. Rehacer "Nueva nota" como tarjeta de pantalla completa paso a paso:
       1) ¿Para qué es? (Un cliente · Un proveedor · Un paso de la ruta/cierre/carga · General) — botones grandes;
       2) si es cliente/proveedor → buscador + lista (o "Todos los clientes");
       3) escribir la nota (con dictado);
       4) ¿Quién la ve? (choferes · encargado · todos) → Guardar con ¿Seguro?.
       Las notas guardadas: agrupadas por tema con buscador, no todas desplegadas.
24. (00:48) Al desbloquear la app (huella/PIN, después de que se bloqueó o se cerró) debe REGRESAR SIEMPRE A INICIO (hoy se queda en la pantalla donde estaba, ej. Clientes). Para el chofer: a su Ruta. Excepción a pensar: si estaba a la mitad de algo (cierre, entrega, formulario), avisar "Tenías algo a medias: Continuar / Ir a inicio" para no perder lo escrito.
25. (00:48) Avisos en la BARRA DE ABAJO por sección (como el de Inicio): Bodega (falta precio de una carga…), Clientes (falta información…), Cargas, Gastos, etc. Cada pestaña con un numerito de pendientes, pero SOLO UNA PARPADEA a la vez: la más importante / la que sigue (orden de prioridad), para que no parpadee todo. Al entrar a la pestaña, el pendiente se resalta (como "Muéstrame"). También en el menú de "Más" si la sección está ahí.
26. (00:49) "Me voy de vacaciones": hoy con un toque ya lo da por hecho. Hacerlo tarjeta de pantalla completa paso a paso:
    1) ¿Desde cuándo y hasta cuándo? (fechas)
    2) ¿Quién se queda a cargo? (escoger encargado)
    3) ¿Qué puede hacer? (fijar precio, recibir cierres, pagar a proveedores hasta $X, autorizar fiados, programar viajes) — sí/no cada uno
    4) ¿Qué dejas listo? (precio base de esos días, efectivo en caja para el encargado, pagos a proveedores pendientes, notas en "Así se hace")
    5) ¿Te sigo mandando algo? (resumen diario por WhatsApp sí/no; solo urgentes)
    6) Revisar → ¿Seguro? → se avisa al encargado y a los choferes.
    Al terminar las fechas regresa solo (o botón "Ya regresé"), quita los permisos del encargado y muestra el resumen de lo que pasó en esos días.

### Decisiones (00:51)
- Todo sale en UNA SOLA versión (puntos 1–26).
- 14: QUITAR la pantalla de Comenzar; entra directo y el tutorial sale después de los avisos urgentes (orden del 15).
- 1/2: arreglar Google Maps dentro de las pantallas, pero dejarlo APAGADO por defecto hasta que Google active la facturación; el usuario lo prende en Ajustes para probar.
- 24: bloqueo igual que hoy (chofer 40 min, admin 5 min).
27. (00:53) LISTA DE PRUEBA con cada versión: corta, por número de punto, qué tocar en el celular y qué debe pasar; el usuario responde qué falló por número. (Debió hacerse desde el principio.)
28. (00:53) Avisos del CHOFER: misma regla del 21 (solo lo que le pide hacer algo; lo demás a su actividad/historial; agrupado; sin repetidos).
29. (00:53) RESPALDO AUTOMÁTICO DIARIO en el celular del ADMINISTRADOR: un archivo por día en una carpeta (Descargas/RutaFacil/Respaldos), sin zip; se guardan solo los últimos 30 días (borra los más viejos que la app creó). Se hace solo la primera vez que se abre la app cada día (y si es posible también en segundo plano). En Ajustes: dónde están, cuándo fue el último, "Respaldar ahora" y "Restaurar". Aviso si lleva más de 2 días sin respaldo.
30. (01:14) SALDO DEL CLIENTE SE PUEDE PISAR (confirmado leyendo l28.js): c.cred se guarda como número final (campo por campo, el último que escribe gana). Si el chofer registra un abono SIN SEÑAL y el admin registra otro movimiento del mismo cliente en bodega, al regresar la señal uno puede borrar al otro en el saldo (el dinero sí queda en los cobros). serverTimestamp NO lo arregla. Arreglo: el saldo se guarda con sumas y restas (como el inventario, NB_CONT/increment) o se calcula de los movimientos. Revisar también otros números que tocan dos personas: taras que debe cada cliente, tarasProv, deuda con proveedores, préstamos/adelantos. Prueba: dos celulares, uno sin señal, mismo cliente → el saldo final debe tener los dos movimientos.
31. (01:14) GASTOS DEL CHOFER:
    - COMIDA: interruptor por chofer en su ficha ("Puede agregar comida": sí/no, por acuerdo previo). Si está en no, el botón de comida no sale (o dice por qué).
    - Los DEMÁS gastos (gasolina/diésel, casetas, talacha, etc.): FOTO DEL TICKET OBLIGATORIA. Gasolina/diésel: litros, precio y total + foto. El chofer guarda y entrega el ticket físico en el cierre (palomita "Entregó tickets" en la recepción).
    - Nota: el ticket al cliente YA va como IMAGEN directo a su chat (l38, natCompartir); el texto solo si falla. No es pendiente.
32. (01:21, revisión de otra IA) FECHA DEL DÍA: TODAY solo se toma al abrir la app. Si la app se queda abierta en el fondo de un día para otro, sigue con la fecha de ayer. Arreglo: al regresar al frente (visibilitychange/resume) revisar si cambió el día → cambioDeDia(). Prueba: simular app abierta que pasa la medianoche.
33. (01:21) TEXTOS PELIGROSOS (XSS): confirmar que TODO texto libre (nombres, apodos, notas, direcciones, motivos, notas del dueño, nombres de proveedores/básculas) pasa por esc(). Prueba que meta textos tipo <img onerror>, comillas y símbolos en todos esos campos y recorra todas las pantallas sin que se rompan ni ejecuten nada.
34. (01:21) DECIMALES: NO pasar toda la app a centavos (reescritura riesgosa). Sí: redondear a 2 decimales (dinero) y 2 (kilos) al GUARDAR cada venta, cobro, abono, gasto y pesada; comparaciones con tolerancia. Prueba que sume cientos de movimientos con centavos y confirme que caja, saldos y cierres cuadran exacto.
35. (01:21) DOBLE TOQUE: bloqueo general: el mismo botón (data-act) no se ejecuta dos veces en menos de ~1 segundo; sobre todo Entregar, Cobrar, Abono, Gasto, Combustible, Recibir cierre, Pagar. Prueba de doble toque rápido → un solo registro.
(01:21) Revisado y descartado por ahora: guardar S en el teléfono (YA existe: IndexedDB a los 0.7 s de cada cambio + al irse al fondo, l21; más caché de Firestore) y partir funciones grandes (solo poco a poco en lo que se toque).
    → 30 (01:29→01:32) CORRECCIÓN: el "segundo hueco" de cobros NO existe. nbElKey da a todo OBJETO sin id una llave _k aleatoria (se guarda en el objeto); el hash solo se usa para valores sueltos (no objetos). Cobros {c,m} ya tienen _k único.
    → 30 (01:32) Propuesta de otra IA (l58.js, convertir e:i12|cred en increment dentro de nbW) RECHAZADA: (1) nbEmpuja actualiza NB.C ANTES de llamar nbW → delta siempre 0 → el saldo dejaría de subir; (2) el campo en Firestore es TEXTO ("500"); increment sobre texto lo toma como 0 → quedaría -50 (migración NO es automática); (3) lim y c30 no son contadores (lim lo fija el admin); (4) parchar S.cobros.push se pierde cuando S o el arreglo se reemplazan (carga de IndexedDB, nube, filter); (5) la prueba no toca Firebase (sin nube nbEmpuja no hace nada). Camino bueno: unidad nueva de contador (NB_CONT) para saldos y taras por cliente {idCliente: número}, c.cred se lee de ahí; migración UNA sola vez por el dueño con marca en meta/ para que no se sume dos veces; prueba con el emulador de Firestore.
36. (09-nov 20:31) ERROR GRAVE: el chofer ve "Logo del negocio" en sus Ajustes y puede subir/cambiar/quitar el logo. Causa: l9.js (~línea 246) mete logoCardHTML() en Ajustes (#ajov) SIN revisar el papel. En la nube las reglas NO dejan al chofer escribir s~cfg (se rechaza), pero en SU celular sí cambia hasta que se rechaza → confuso y el botón "hace algo" que no debe. Arreglo: la tarjeta del logo solo para administrador (dueño). Además REVISAR TODO Ajustes del chofer, del encargado, del contador y de venta local: que no salga nada que solo puede cambiar el admin (precios, cfg, bodega, reglas, etc.). Prueba: entrar como chofer → en Ajustes no existe .logocard ni otras opciones de admin.
    → (20:31) Usuario dice que YA configuró la cuenta de pagos de Google → probar "Ver más grande" (deben salir calles). Si sí: puntos 1, 11 y 12 dejan de esperar.
37. (09-nov 20:52) ERROR GRAVE DE SEGURIDAD · BLOQUEO SE VE "DEBAJO": al regresar de suspensión pide huella pero la app se sigue viendo. CAUSA ENCONTRADA (leyendo código): la pantalla de bloqueo #pinov tiene z-index 90, y muchas pantallas completas quedan ENCIMA: #bjov/#pwov 91, #wzov (tarjetas paso a paso)/#cxov/#fnov 92, #rcov (recepción de cierre)/#eqov 93, #mjov/#tutov 95, #fotov 96, #nbov 200, #pxov 205, #qsov 230, #fgov 240, #permov 250, #gmov (Google Maps) 9999. Además pinBloq() solo regresa true la PRIMERA vez (luego _pin.modo ya está puesto y regresa false) → pinActividad deja de frenar los toques → se puede USAR lo que quedó encima sin huella.
    Arreglo: (a) bloqueo SIEMPRE hasta arriba (z-index mayor que todo, incluido el mapa de Google; cerrar/ocultar el mapa nativo mientras está bloqueada); (b) "está bloqueada" = _pin.modo==='entrar' && se pidió por tiempo, y mientras sea así NO pasa ningún toque fuera de #pinov; (c) al irse al fondo (visibilitychange hidden) tapar YA la pantalla si va a tocar bloqueo, para que la vista previa de "apps recientes" no muestre datos (opcional: FLAG_SECURE en MainActivity solo para admin); (d) cancelar la huella → se queda en el teclado del PIN, nunca entra. Prueba: abrir cada pantalla completa, forzar el tiempo, regresar → solo se ve el bloqueo y ningún toque llega a la app. Lo mismo para chofer (40 min).
    → Pedir al usuario: en qué pantalla estaba y si al cancelar la huella entra.
(20:52) Nota sobre el 32 (fecha del día): YA existe en parte → al volver al frente, si cambió el día, guarda y recarga la app (visibilitychange en la versión armada). Revisar que también pase si el celular nunca manda la app al fondo (app abierta toda la noche con pantalla prendida) → revisar el día cada minuto.
    → 37 (20:54) Confirmado por el usuario: estaba en el mapa de Google en pantalla completa (#gmov, z-index 9999) → al desbloquear el celular pidió huella pero se veía el mapa. Coincide con la causa. Además el mapa nativo de Google se dibuja por Android, no solo con HTML → al bloquear hay que OCULTAR/cerrar el mapa nativo, no basta con el z-index. Falta probar si responde a los toques (por el código, sí respondería).
    → 1 (20:54) Google Maps aún NO carga calles (usuario ya configuró pagos). Revisar: que la cuenta de facturación esté VINCULADA a "My First Project" (el de la llave), que "Maps SDK for Android" esté habilitada en ese proyecto, y esperar hasta 24 h.

## 2026-11-10 · Usuario: "Haz todo, haz prueba y error, la facturación ya está arreglada"
- Facturación de Google Maps: el usuario dice que ya quedó → los mapas de Google siguen PRENDIDOS por defecto (se pueden apagar por celular en Ajustes).

### HECHO (10 nov) · versión 7.2 · capas l58–l63 + nativo (rutasGoogle, respaldoGuardar, respaldoLimpia) · puntos 1–37 de la lista nueva
- l58 · 37 bloqueo: la pantalla del PIN queda hasta arriba de todo (z-index máximo), mientras está bloqueada ningún toque llega a la app, se cierran los mapas de Google (pantalla completa y dentro de pantallas) y al irse al fondo se tapa la pantalla con el logo. Cancelar la huella deja en el teclado del PIN.
- l58 · 18 huella dos veces: CAUSA = al terminar de cargar lo guardado (IndexedDB) o la nube se borraba S.pinOk y se volvía a pedir. Ahora, si entró con PIN/huella en los últimos 2 min al abrir la app, no se vuelve a pedir. Salir/cambiar de usuario/mandar cierre sí la vuelven a pedir.
- l58 · 24 al desbloquear (por tiempo) regresa a Inicio (admin) o a su Ruta (chofer); si tenía algo a medias pregunta "Seguir donde iba / Ir a Inicio". Al abrir la app en frío también empieza en Inicio/Ruta.
- l58 · 36 Ajustes por puesto: chofer, encargado, contador y venta local ya no ven "Logo del negocio" ni ajustes del negocio (crédito, poca fruta); y aunque toquen algo, la app lo frena y dice por qué. Tema (claro/oscuro) y letra grande ahora son de cada celular (antes se cambiaban para todos).
- l58 · 4 y 9 campos oscuros: la app le dice al navegador si está en claro u oscuro (color-scheme) y todos los campos (número, fecha, select, textarea) tienen fondo y letra explícitos.
- l58 · 1 Google Maps en blanco: CAUSA ENCONTRADA = cuando el mapa está dentro de una ficha o tarjeta encima (ej. "Su recorrido"), lo de abajo tapaba el hueco → blanco. Ahora se ocultan las capas de abajo mientras se ve ese mapa. Probado con captura de píxel (transparente donde va el mapa).
- l58 · 2 no se desliza: el plugin de Google "agarra" los toques en el rectángulo de cada mapa vivo. Ahora: (a) un mapa tapado por otra ventana deja de recibir toques (disableTouch), (b) todo mapa que se pidió y ya no está en pantalla se destruye aunque haya fallado al crearse.
- l59 · 3 billetes: el desplegable se queda abierto/cerrado como lo dejó el chofer. · 5 un solo "?" (enseña "¿Qué sigue?" con Muéstrame). · 6 la burbuja no sale en entrega/cierre, ni escribiendo, ni en tarjetas paso a paso; sale ARRIBA (no tapa Atrás/Siguiente) y se quita si empieza a escribir o deslizar. · 7 toda foto (jpg/https) en miniatura se abre en grande, también las del cierre que recibe el admin. · 14 se quitó la pantalla de "Comenzar". · 15 orden al abrir: logo → PIN/huella → tarjetas urgentes → hasta entonces tutorial/¿Qué sigue?. · 17 "Atender": lleva a donde se resuelve y la siguiente tarjeta sale hasta que regresa a Inicio (antes salía encima y parecía que no hacía nada; además se brincaba una).
- l60 · 16 ubicación: UNA tarjeta por celular que se actualiza (15 → 45 min URGENTE); al reconectarse se quita sola y queda "Celular de X estuvo sin señal de 10:12 a 11:05 (53 min)"; apagado/prendido igual ("se apagó de 22:10 a 06:30"). Se limpiaron las repetidas. En ninguna tarjeta se ven coordenadas ni [tel:]: botones 📍 Ver dónde y 📞 Llamar.
- l60 · 17 a dónde lleva cada aviso: ubicación → ficha del chofer en "Su recorrido"; faltante → recepción del cierre; equipo → bienes.
- l60 · 20 "el efectivo no coincide" abre la tarjeta del faltante (dijo / se contó / falta, Descontar · Ya lo pagó · No descontar con ¿Seguro?). Si ya se decidió al recibir el cierre, el aviso se quita solo y queda en la actividad.
- l60 · 21 Avisos = "Por atender (N)" arriba; lo informativo (gastos, volvió a cargar, clientes nuevos, correcciones, viajes…) va a la ACTIVIDAD DEL DÍA (S.actDia, se sincroniza): en Avisos sale plegado "Informativos" agrupado por chofer en una línea + "Marcar todo como visto"; en la recepción del cierre sale "Lo que pasó hoy en su ruta"; en la ficha del chofer "Lo que pasó ese día".
- l60 · 22 "Hoy te toca": "Recibir los cierres · 1 de 3 mandados" lleva a recibir o dice quién falta; "Mandarte el resumen" dice cuántos cierres faltan o lo manda. "Muéstrame dónde" dice por qué si todavía no hay nada que tocar.
- l60 · 25 numerito por sección en la barra de abajo (las que no están en la barra suman en "Más"); solo parpadea uno (el de urgente o el primero). Al entrar se resalta el pendiente.
- l60 · 28 avisos del chofer sin repetidos; "se quitó / se regresó" del mismo cliente se cancelan.
- l61 · 30 SALDOS: c.cred y c.vac de cada cliente y las cajas de cada proveedor (tarasProv) ya no se guardan como número final: saldo = lo que había al migrar (s~cliBase, igual en todos) + suma de movimientos (s~cliCnt, contador que la nube suma con increment). La migración la hace UNA vez el dueño (marca S.cfg.saldoMig) y cada celular la toma de la nube antes de mandar nada. Probado con dos celulares y una nube de prueba: chofer sin señal −50 y admin +100 → los dos quedan con +50.
- l61 · 32 si la app se queda abierta y cambia el día (aunque nunca se vaya al fondo), se guarda y se recarga (espera si estás escribiendo o a la mitad de algo). · 34 centavos: cada venta, cobro, gasto, aporte, etc. se redondea a 2 decimales al guardar (300 movimientos con centavos cuadran exacto). · 35 doble toque: el mismo botón de guardar/cobrar/entregar/pagar no corre dos veces en menos de 1 s.
- t62xss · 33 textos peligrosos: se metieron textos con <img onerror>, <svg onload>, comillas y símbolos en clientes, choferes, proveedores, básculas, gastos, avisos, notas, motivos e historial y se recorrieron todas las pantallas, fichas, Ajustes, menú y tarjetas urgentes: nada se ejecuta ni se rompe.
- l62 · 8 "Su recorrido": "Dónde está ahora" (hora, hace cuánto, batería, Ver en el mapa, 🚗 Cómo llegar); cada parada se puede tocar (centra el mapa) y tiene "Ir"; "¿Dónde estuvo a tal hora?" por horas → minuto → el mapa se va ahí.
- l62 · 10 bodega: Ajustes y Bodega → "Cambiar ubicación" (tarjeta: "Estoy en la bodega" con GPS, o pegar link/coordenadas → ¿Seguro?). La principal mueve todos los mapas, km y rutas. El mapa del recorrido ya no mete la bodega si está lejos (ej. pruebas en Tijuana).
- l62 · 11 "🚦 Ordenar con tráfico" en la ruta del chofer: UNA llamada a Google Routes (computeRoutes, TRAFFIC_AWARE, optimizeWaypointOrder, máx. 25 paradas) desde la pieza nativa (RutaNativa.rutasGoogle, manda la llave del manifest + X-Android-Package + X-Android-Cert). Reacomoda la ruta y da hora estimada por cliente y de regreso. Si falla o no hay señal → orden de siempre (y si falta habilitar la API, lo dice).
- l62 · 12 aprender: por cada tramo (cliente A → B, por franja de hora) y por cliente (tiempo atendiéndolo) se guarda lo real (S.aprT / S.aprA, se sincronizan). Con 3+ viajes usa lo aprendido; si sabe todos los tramos, ordena sola SIN pedir a Google. Hora estimada = manejo + atención. En la ficha del chofer: "Estimado contra real".
- l63 · 13 tarjetas paso a paso: "No estaba" (motivo → revisa → ¿Seguro?), pedir permiso para fiar, cerrar el mes. (Carga nueva y carga extra ya eran de pantalla completa; vjForm ya no se usaba.) ERROR ENCONTRADO: "Pedir permiso para fiarle" no hacía nada porque se llamaba igual (permpide) que el botón de permisos del celular; ahora lo registra la tarjeta.
- l63 · 23 "Así se hace": "+ Nueva nota" por pasos (¿para qué? → cliente/proveedor con buscador o paso → texto con dictado → ¿quién la ve? → revisa → ¿Seguro?); notas agrupadas por tema (plegadas) con buscador; cada nota sale solo a quien debe verla; "todos los clientes/proveedores" sale en cada uno.
- l63 · 26 "Me voy de vacaciones" por pasos: fechas → quién se queda → qué puede (precio, cierres, pagos hasta $X, fiados, viajes) → qué dejas (precio base, efectivo) → ¿te mando algo? → revisa → ¿Seguro?. Avisa al encargado y a los choferes. Lo que no le diste, la app no lo deja hacer y dice por qué. Al pasar la fecha (o "Ya regresé") quita permisos y enseña lo que pasó.
- l63 · 31 gastos del chofer: "Puede agregar comida" sí/no en la ficha del chofer (si no, no sale la opción). Lo demás (casetas, combustible, etc.): foto del ticket OBLIGATORIA. En la recepción del cierre: "Entregó sus N tickets" (queda en historial y actividad).
- l63 · 19 textos del tutorial y de "¿Qué sigue?" al día (recepción del cierre, billetes +/−, gastos con ticket, No estaba, vacaciones, respaldo, recorrido, ordenar con tráfico).
- l63 · 29 respaldo automático: en el celular del admin, la primera vez que se abre cada día, se guarda Descargas/Ruta Facil/Respaldos/respaldo-AAAA-MM-DD.json (nativo; se borran los de más de 30 días que hizo la app). Ajustes → "Respaldo automático": último, dónde, Respaldar ahora, Restaurar (con ¿Seguro?). Aviso si lleva más de 2 días sin respaldo.
- 27 lista de prueba: va con cada versión (abajo).
- Pruebas: todas las anteriores siguen bien + t58 (22) · t59 (18) · t60 (24) · t61 (11) · t62 (22) · t62xss (5) · t63 (33). Única falla: fix.js "Reiniciar en el PIN del chofer", que ya fallaba ANTES de estos cambios (es de la prueba: en la app el botón sí sale).
- APK de prueba armado desde la rama de trabajo (Actions, manual): la parte nativa nueva compila.
- PENDIENTE DEL USUARIO: (1) en Google Cloud, en la llave "Maps Platform API Key", agregar "Routes API" a las APIs permitidas (para "Ordenar con tráfico"); (2) probar Google Maps con calles ya con la facturación activa.

### Lista de prueba 7.2 (por número de punto)
1. Personal → chofer → Ruta y metas: el mapa de "Su recorrido" se ve con calles (no blanco). "⤢ Ver más grande" también.
2. Abre un mapa, luego el cierre del chofer: la pantalla sí se desliza.
3. Cierre → Efectivo → "Contar por billetes": toca + y − varias veces; no se cierra.
4/9. Celular en modo oscuro y app en claro: los cuadritos de billetes y la fecha de "Su recorrido" se leen bien.
5. Solo hay un "?" arriba.
6. En el cierre del chofer no sale la burbuja "¿Qué sigue?"; cuando sale, está arriba.
7. Admin → cierre recibido: toca una foto del vehículo → se abre en grande.
8. Su recorrido: "Dónde está ahora", tocar una parada o una hora mueve el mapa; "Ir" abre Google Maps.
10. Ajustes → Ubicación de la bodega → Cambiar → pega un link → ¿Seguro? → Sí.
11. Chofer con 2+ clientes con ubicación: "🚦 Ordenar con tráfico" (necesita Routes API habilitada).
13. Entrega → "No estaba" → motivo → Registrar → ¿Seguro?. Pedir permiso para fiar → le llega al admin.
14/15. Abre la app: no sale "Comenzar"; primero PIN, luego urgentes, luego el tutorial.
16. Apaga los datos de un celular de chofer 20 min: una sola tarjeta que se actualiza; al prender, se quita sola.
17. En una tarjeta urgente toca "Atender": te lleva y la siguiente sale al regresar a Inicio.
18. Abre la app en frío con huella: la pide una sola vez.
20. Un efectivo que no coincide ya decidido al recibir: el aviso no aparece.
21. Registra gastos y vuelve a cargar: no llenan Avisos; salen en "Informativos" y en la recepción del cierre.
22. "Hoy te toca": toca "Recibir los cierres" y "Mandarte el resumen": siempre hacen algo o dicen por qué.
23. Así se hace → + Nueva nota → cliente (buscador) → nota → quién la ve.
24. Deja la app 5 min (admin) en Clientes; al desbloquear regresa a Inicio.
25. Barra de abajo: numeritos; solo uno parpadea.
26. Menú → Me voy de vacaciones (pasos) → ¿Seguro?; luego "Ya regresé".
29. Ajustes → Respaldo automático → Respaldar ahora → revisa Descargas/Ruta Facil/Respaldos.
30. Dos celulares, uno sin datos: abono en uno y venta a crédito en otro al mismo cliente → al volver la señal, el saldo tiene los dos.
31. Chofer sin permiso de comida: no sale "Comida"; caseta sin foto no se guarda. Al recibir el cierre: "Entregó sus N tickets".
36. Como chofer → Ajustes: no hay "Logo del negocio".
37. Abre el mapa de Google en pantalla completa, bloquea el celular 5+ min, regresa: solo se ve el PIN y nada responde detrás.

## 2026-11-10 · PUBLICADA la versión 7.2 (puntos 1–37) en main
- El usuario dijo "Sí, publícalo" y que YA habilitó "Routes API" en la llave → "Ordenar con tráfico" debe funcionar.

## 2026-11-10 · Prueba en otro celular (sin el del administrador): no lo dejaba entrar
- Capturas: "Crear la cuenta del negocio" → "Sin permiso. Revisa las reglas" y en "Entrar" sale "No pude revisar la nube: faltan las reglas en Firestore".
- CAUSA: (a) sin sesión, las reglas no dejan leer meta/duenio, así que la app no sabe si el negocio ya tiene dueño y enseñaba un error rojo engañoso. (b) "Crear la cuenta del negocio" cuando YA existe: se creaba la cuenta de correo en Firebase y luego las reglas (bien) rechazaban hacerla dueña → quedaba una cuenta suelta sin acceso. (c) "Olvidé mi contraseña" con usuario (sin @) solo decía "pídele al administrador".
- HECHO (capa l64 + nube/entrada.js borrarYo): ya no sale el error rojo; "Crear la cuenta" avisa que es solo la primera vez; si ya existe, se borra la cuenta suelta y explica cómo entrar; "Olvidé mi contraseña" con usuario de administrador manda el correo a su correo real. Prueba t64.js (5 OK).
- PENDIENTE: la cuenta suelta que ya se creó con el correo del usuario en Firebase (Authentication) se puede borrar a mano en la consola (Authentication → Usuarios) si no es la del dueño.

## 2026-11-10 · Entró con la cuenta del administrador y le abrió como CHOFER
- CAUSA: nbForzarRol ponía el puesto para chofer, contador, venta local y encargado, pero NO para administrador; ese celular estaba guardado como chofer y se quedó así.
- HECHO (l64): al entrar con la cuenta del administrador (cada vez que se abre la app), abre como administrador en Inicio y pide su PIN. Desde el menú todavía puede "entrar como" otro. La cuenta de un chofer siempre abre como chofer (no puede entrar como admin). Prueba t64.js (8 OK).
- (21:10) Reglas: s~cliBase (saldo base de la migración) y s~vacPlan ahora solo los escribe el administrador/encargado (antes un chofer podía). Prueba en pruebas-reglas. PENDIENTE DEL USUARIO: pegar firestore.rules en la consola y Publicar.

## 2026-11-10 · Diseño nuevo (ideas de Ricardo en HTML: "Dashboard" e "Bodega") · decisiones
- Palabras: "caja" = llena, "tara" = vacía (como siempre). Letra y botones GRANDES (estilo del diseño pero no la letra chiquita). Primero Inicio y Bodega; si le gustan, se adaptan las demás. Barra de abajo: las mismas secciones, con el estilo nuevo.
- HECHO (l65): estilo general (fondo gris claro, tarjetas blancas muy redondeadas, encabezado blanco con botones redondos, sección activa en pastilla de su color). Inicio: "Precio de hoy" (caja de roatán / kilo de macho con costo y mayoreo, botones de siempre), "Inventario de bodega" (roatán: cajas llenas, taras vacías, verdes/madurando/maduras/reparto y cuántos días alcanza; macho igual en kg) y "Por atender" justo abajo. Bodega: título con chip de la bodega, "Existencias en bodega" (verdes/maduras de roatán y macho), "Fruta madura por antigüedad" (más vieja primero; Pasada de tiempo / Sale mañana / Lista para salir) y la sugerencia de maduración en verde. Todo sin internet (sin Tailwind ni íconos de afuera).
- No se puso el botón "Despachar" del diseño porque la app no tiene esa acción (ningún botón puede quedarse sin hacer nada).

## 2026-11-10 · Ideas de diseño de Ricardo — SOLO ANOTAR (pidió no hacer cambios hasta que diga)
38. "TARJETA REPARTO 1" (chofer, pantalla Ruta): reemplazar el aviso de lo que le queda en el camión por esta tarjeta. Foto: fotos/p38-tarjeta-reparto-1.jpg.
    - Arriba: ícono de camión + "Te quedan en el camión".
    - Dos cuadros blancos grandes: izquierda dibujo de cajas con plátano + número grande "26" + "cajas de roatán" (en la imagen dice "TARAS", pero se decidió: caja = llena, tara = vacía); derecha dibujo de báscula con plátano macho + "80 KG" + "de plátano macho".
    - Abajo una franja verde con ícono de ubicación: "Ya no quedan paradas pendientes." (o cuántas paradas faltan si todavía hay).
    - Fondo verde claro con hojas suaves; números en verde oscuro, muy grandes.
    - Los dibujos (cajas, báscula) van como imágenes dentro del APK (sin internet).
39. Tarjeta "DATOS PENDIENTES" (burbuja flotante de arriba del ADMINISTRADOR, la que hoy dice "Datos que faltan · N por llenar"). Foto: fotos/p39-datos-pendientes.png.
    - Fondo oscuro (azul marino) que se va a café/naranja a la derecha; orilla redondeada; cuadrito con ícono ⚠️ amarillo a la izquierda.
    - Arriba en amarillo "DATOS PENDIENTES" + pastilla "11 por llenar"; abajo en blanco grande el dato que falta ("Dirección de Juan"); flecha › a la derecha; barra de avance amarilla abajo.
    - Ricardo: le gusta mucho, pero que los colores sean un poco MÁS LLAMATIVOS para que se note que es alerta (que faltan datos). Idea: el lado derecho más naranja/rojizo intenso y el amarillo más brillante; que siga leyéndose bien.
40. Tarjeta "PEDIDOS POR WHATSAPP" (admin): conservar este estilo casi igual. Foto: fotos/p40-pedidos-whatsapp.png.
    - Fondo verde muy oscuro (tipo WhatsApp) que baja a azul marino; cuadrito con logo de WhatsApp; título "Pedidos por WhatsApp" + "Mensajes listos para surtir"; pastilla "1 Pendiente" a la derecha.
    - Cada pedido en un recuadro: nombre y apodo grande ("Renata “La güera”"), "Hoy · 09:15" a la derecha; dos pastillas: roatán (amarilla, con ícono de plátano) y macho en kg (verde, con báscula); botón verde grande "＋ Registrar este pedido".
    - Palabras: en la imagen dice "2 Taras Roatán" → poner "2 cajas de roatán" (caja = llena, tara = vacía). DECIDIDO: si el pedido no trae macho (o roatán), esa pastilla no sale.
    → (Decisión general) La información se maneja como hasta ahora (mismas palabras y datos: caja = llena, tara = vacía); solo se adoptan los diseños nuevos.
41. TARJETAS PASO A PASO con el estilo del "Viaje de carga" (código de ejemplo: disenos/p41-viaje-de-carga-wizard.jsx). Aplicarlo en TODA la app donde se captura información por pasos (las tarjetas de pantalla completa: wzov, cmov, cxov, rcov, cierre, simulador, etc.):
    - Encabezado fijo blanco: título grande ("Viaje de carga"), debajo "Antes de salir · paso 3 de 11 · Qué cargas primero", botón × redondo gris; barra de avance verde delgada.
    - Cada paso: tarjeta blanca con la pregunta grande ("¿Qué vas a cargar?") y una ayuda corta gris.
    - Opciones como tarjetas grandes con casilla (borde verde y fondo verde claro al escoger); selects grandes grises; selector de dos opciones tipo "Camión completo / Por pasadas".
    - Ordenar paradas arrastrando (con agarradera ⋮⋮); "Tu ruta de hoy" con mapa y línea de tiempo de paradas numeradas con hora.
    - Vehículos como tarjetas con foto/ícono, placas y pastilla del combustible (Premium roja, Diésel negra/amarilla).
    - Inspección: recuadro verde "Este vehículo ya se revisó hoy" + "Todo bien / Reportar algo".
    - Pie fijo blanco: "Atrás" (blanco con borde) y "Siguiente" verde grande (en el último: "Empezar ruta"/"Finalizar").
    - Se conserva: letra y botones grandes, ¿Seguro? en lo que no se puede deshacer, caja = llena / tara = vacía, sin internet.
- Diseños de referencia guardados en fuente/disenos/ (inicio.html, bodega.html).
42. PANTALLA DEL PIN nueva (diseño: disenos/p42-pin.html): fondo claro con degradado verde suave arriba; logo; pastilla "Sesión activa"; "Hola, Ricardo Nieto" grande; texto "Pasaron 5 minutos…"; 4 puntos que se ponen verdes al teclear y tiemblan si el PIN está mal ("PIN incorrecto. Intenta de nuevo"); teclado 3×4 de botones blancos redondeados grandes; la tecla de abajo a la izquierda es la HUELLA (verde) y la de la derecha Borrar; botón "Entrar con mi huella o cara"; abajo "Olvidé mi PIN" y "No soy Ricardo Nieto · Cambiar de usuario".
    - Conservar lo que ya hace: pista y aviso al admin en "Olvidé mi PIN" (NO "código al teléfono" como dice el ejemplo), bloqueo tras 5 intentos, huella sola al abrir, teclado rápido sin teclas perdidas, siempre hasta arriba (punto 37).
    - Solo mostrar la tecla/botón de huella si el celular tiene huella activada en la app; si no, esa tecla queda vacía.
43. TARJETAS DE VEHÍCULOS (Vehículos): conservar este diseño tal cual. Foto: fotos/p43-tarjetas-vehiculos.png.
    - Izquierda: la FOTO del vehículo (la que ya tiene en su ficha) cortada en diagonal con franja azul (o roja si está fuera de servicio).
    - Derecha: marca y modelo grande + año; pastilla de estado arriba a la derecha: "✓ Activo" (verde), "En servicio/en taller" (amarilla), "⚠ Fuera de servicio" (roja).
    - Placa dibujada como placa real con su estado (Veracruz blanca, Guerrero con franja roja) usando las placas y el estado que ya están guardados.
    - Combustible con ícono de bomba (Gasolina Premium / Diésel). En la imagen el Camaro dice "Negro" ahí: es el color, no va en ese lugar.
    - Franja de abajo con el aviso más importante (Afinación próxima azul, Tarjeta por vencer amarilla, vencido rojo) y botón redondo › que abre la ficha.
    - AÑADIR (Ricardo dijo que sí a las 4): (a) quién lo trae hoy (chofer) o "En bodega"; (b) barra de km para el próximo cambio de aceite ("faltan 1,200 km"); (c) rendimiento km/L de la semana; (d) si hay varios avisos, "+2 más" en la franja.
- (Ricardo: "lánzate a hacer toda la aplicación con esos cambios estéticos") HECHO capa l66: 38 tarjeta reparto 1 (dibujos de cajas y báscula hechos en la app, franja verde o naranja si no alcanza), 39 burbuja "Datos que faltan" oscura con naranja intenso y amarillo (más llamativa), 40 pedidos por WhatsApp (verde oscuro, pastillas solo si lo pidió, botón "Registrar un pedido"), 41 todas las tarjetas paso a paso con el estilo "Viaje de carga" (encabezado con barra, pregunta en tarjeta, opciones con casilla, pie fijo Atrás/Siguiente) y el mismo aire en recepción del cierre, carga nueva, carga extra, faltante y bodega, 42 PIN (pastilla "Sesión activa", puntos verdes que tiemblan, teclas grandes, tecla de huella si está activada), 43 tarjetas de vehículos (foto en diagonal, estado Activo/En ruta/Fuera de servicio, placa, combustible + km/L de la semana, quién lo trae, barra de aceite, aviso más importante con "+N más"). El estilo general (l65) ya aplica a todas las pantallas.

## 2026-11-11 · Prueba de 1.0.21 — SOLO ANOTAR (pidió no hacer cambios hasta que diga)
44. (admin, celular del repartidor con la cuenta del admin) Quiso ver el MAPA con la ubicación de los choferes: el mapa NO se ve, y al tocar/deslizar se SELECCIONÓ TEXTO y salió la barra de Android "Copiar · Seleccionar todo · Búsqueda en la Web". Foto: fotos/p44-seleccion-texto.jpg (pantalla de Personal → accesos).
    - Arreglo pensado: (a) que en la app no se pueda seleccionar texto al tocar o mantener presionado (solo en los campos donde se escribe); (b) revisar por qué no se ve el mapa ahí (¿blanco, gris o no aparece?, ¿Mapas de Google prendido?); (c) de la foto: el botón "?" de arriba a la derecha se ve raro (dos figuras verdes encimadas) → revisar el ícono.
    → 44 (evidencia, foto fotos/p44b-mapa-personal.jpg): en Personal, tarjeta "Tú · viaje de carga", el mapa sale VACÍO del color de la tarjeta (crema), con "Ver más grande" abajo. Otra vez salió la barra de "Copiar · Seleccionar todo".
       Sospecha: ese mapa está en la página (no en ficha), así que el hueco lo hace la capa .gmhole con clip-path:path(evenodd,…). Si el WebView de ese celular (Moto, puede tener "Android System WebView" viejo) no entiende clip-path con path(), la capa tapa todo con el color de fondo → se ve crema. En la computadora sí funciona.
       Arreglo pensado: hacer el hueco con 4 rectángulos alrededor del mapa (arriba, abajo, izquierda, derecha) en lugar de clip-path, que funciona en cualquier WebView; y si aun así no carga, que caiga solo al mapa de antes. Preguntar: ¿"Ver más grande" sí enseña calles? ¿Ajustes → Mapas de Google está en Sí?
    → 44 (más datos de Ricardo): "Ver más grande" SÍ se ve completo y bien, con los puntos. El problema es SOLO el mapa chico dentro de la pantalla: no se ve al frente, pero por las ORILLAS se alcanza a ver el mapa de Google detrás (está ahí pero tapado/desfasado). Al deslizar la pantalla el mapa chico no se mueve bien: se queda "pegado" arriba, como arrastrándose. En Personal hay DOS mapas (el de su viaje de carga simulado y el "mapa en vivo"); el del mapa en vivo tampoco se ve.
       Conclusión: el mapa de Google "debajo" de la app es frágil en ese celular (se desfasa con el scroll y no se ve por el hueco). PROPUESTA para decidir: (A) mapas chicos dentro de las pantallas con el mapa de antes (Leaflet, que se mueve junto con la pantalla y no falla), y Google Maps solo en "Ver más grande" (que ya funciona bien) — recomendada; (B) seguir intentando arreglar el mapa de Google chico (hueco con 4 rectángulos + mover el mapa en cada cuadro del scroll), con riesgo de que siga fallando en algunos celulares.
    → 44 (video, 15 s, ficha de Dany → Ruta y metas → Su recorrido; cuadros 1 por segundo en fotos/p44c-video-mapa-recorrido.png):
       - Quieto: el lugar del mapa sale VACÍO (blanco/crema) entre "Dónde está ahora" y "Ver más grande".
       - Al deslizar: el mapa de Google APARECE por instantes pero ARRIBA de la pantalla (encima de "Dany · Datos/Referencias…"), no en su lugar, y se vuelve a esconder; el mapa nativo va atrasado/desfasado respecto al scroll de la ficha (la ficha se desliza por dentro, no la página).
       - El texto se pone gris/transparente en algunos cuadros (las capas de abajo se esconden/ven mientras se mueve).
       - Confirma lo anterior: el mapa de Google "debajo" de la app no sigue bien el movimiento en ese celular. Recomendación sigue siendo la opción A del 44 (mapas chicos con el mapa de antes; Google solo en "Ver más grande").
45. (11 nov) Después de usar el mapa, la app se pone TRABADA: sí deja deslizar tarjetas e interactuar, pero responde lento/a tirones. Al cerrar y abrir la app se arregla. (Mismo origen que el 2: el plugin de Google Maps "debajo" de la app intercepta cada toque para preguntarle a la app si es del mapa; con mapas desfasados o varios mapas, cada toque se retrasa.)
    → Ricardo pregunta: ¿es imposible que el mapa de Google chico funcione bien? Opciones explicadas (esperando que escoja):
       A) mapas chicos con el mapa de antes (Leaflet) y Google solo en "Ver más grande". Gratis, sin trabas.
       C) mapa chico como FOTO de Google (Maps Static API: misma vista de Google con los puntos y la línea; no se arrastra, al tocarlo abre "Ver más grande" interactivo). Se pide desde la pieza nativa (la llave es de Android). Sin trabas. 10,000 gratis al mes; habilitar "Maps Static API" en la llave.
       D) Google Maps "de página" (Maps JavaScript API): mapa de Google interactivo dibujado DENTRO de la app como cualquier tarjeta (se mueve bien con el dedo). Necesita una SEGUNDA llave restringida al sitio de la app; 10,000 cargas gratis al mes.
    → 44/45 DECIDIDO (Ricardo: "dime la mejor, te hago caso"): opción A. Mapas chicos dentro de las pantallas = mapa de antes (Leaflet); Google Maps solo en "⤢ Ver más grande" (pantalla completa, que sí funciona). Se quita el mapa de Google "debajo" de la app (adiós trabas y desfases). Si después quiere el look de Google en chico: opción D (segunda llave). Hacerlo cuando diga que empiece.
46. (11 nov) Inicio (admin): al deslizar despacio hacia arriba, la BARRA FLOTANTE de abajo a veces PARPADEA, como si se volviera a dibujar la pantalla. Pasa de vez en cuando; luego ya no.
    Sospechas: (a) la barra se esconde/aparece sola al deslizar (navHid) y en el borde del umbral va y viene; (b) algo vuelve a dibujar la pantalla cada pocos segundos (revisión de mapas cada 1.2–1.5 s, cuenta de numeritos de la barra en cada dibujo) y la barra se rehace; (c) el mapa de Google "debajo" (se quita con la opción A del 44). Revisar: que dibujar no rehaga la barra si no cambió nada y que esconder/mostrar la barra tenga margen para no parpadear.
47. (11 nov) Rendimiento: en el Samsung Z Fold 5 la app va perfecta y fluida; en el Motorola Z2 Force (Android 15, usado como admin) se siente un poco más torpe, aunque todo funciona. Ricardo: NO hacer cambios de rendimiento que arriesguen algo; ya funciona bien.
    → Lo que sí ayuda sin riesgo y ya está decidido: opción A del 44 (quitar el mapa de Google "debajo" de la app, que es lo más pesado) y el 46 (no rehacer la barra si no cambió nada). Sugerencia al usuario: actualizar "Android System WebView" y Chrome en el Motorola.
48. (11 nov) Numerito de la barra de abajo: tocarlo no hacía nada. Debe ser: 1er toque = ir a la sección (como siempre); 2º toque (ya estando ahí) = ir directo al pendiente de ese numerito.
### HECHO (11 nov) · capa l67 · 44, 45, 46, 48
- 44/45 opción A: los mapas chicos dentro de las pantallas son siempre el mapa de antes; Google Maps solo al tocar "Ver en Google Maps" (pantalla completa). Se quitó el interruptor "Mapas de Google" de Ajustes. Para pruebas: window.__gmInline=1 vuelve a prender el mapa chico de Google (gmin.js, t58.js).
- 44 ya no se selecciona texto al tocar o mantener presionado (solo en campos donde se escribe).
- 46 el numerito que parpadea ya no reinicia su animación cada vez que se vuelve a dibujar la barra (seguía su ritmo con el reloj).
- 48 segundo toque en una sección con numerito: lleva al pendiente (el urgente primero; en Inicio baja a "Por atender"; en "Más" al de las secciones de ahí).
- Prueba t67.js.
- Lo que sigue (nuevos puntos) se empieza en una conversación nueva (esta ya está muy cargada).
49. (11 nov) Inicio: rediseñar las tarjetas de inventario (roatán y macho) como disenos/p49-inventario-inicio.html: un renglón "Inventario de bodega · Toca para ver la bodega" y DOS tarjetas separadas (Roatán y Macho), cada una con número grande, pastilla a la derecha (roatán: taras vacías), barra apilada de colores (verdes / madurando / maduras / reparto), 4 cuadritos con número y %, y abajo el aviso de cuántos días alcanza.
    - Ricardo: conservar NUESTROS íconos (la caja/tara para roatán y el de plátano/kilo para macho) y poner COLORES MÁS SÓLIDOS para que se distingan (roatán naranja/ámbar fuerte, macho verde fuerte).
    - Propuestas (esperando OK): encabezado de cada tarjeta en color sólido con letra blanca; el aviso de abajo cambia de color según los días (verde 5+, amarillo 2–4, rojo menos de 2) en lugar de "Stock asegurado" fijo; pastilla del macho "Alta disponibilidad" solo si alcanza 5+ días; tocar cada tarjeta lleva a la Bodega.
    → 49 DECIDIDO (11 nov): sí encabezado de color sólido con letra blanca; sí aviso de abajo que cambia de color según los días (verde 5+, amarillo 2–4, rojo <2) diciendo "Te alcanza para N días"; NO "Alta disponibilidad" (se quita); tocar cualquiera de las dos tarjetas lleva a Bodega; SIN porcentaje debajo de los números (la barra de colores ya enseña la proporción y así se lee más fácil). Hacerlo en la conversación nueva.
50. (11 nov) Inicio → "Por atender": Ricardo propone un diseño nuevo para los avisos. Foto: fotos/p50-avisos-inicio.jpg.
    - Cada aviso es una tarjeta redondeada con fondo de color suave y orilla del mismo color; ícono grande a la izquierda; texto grande en dos o tres renglones; a la derecha "ACCEDER ›" en el color de la tarjeta.
    - Colores de la foto: rojo (campana, 60 cajas de roatán pasadas de tiempo), naranja (plátano con reloj, 215 kg de macho pasados), azul claro (camión, DEF bajo), verde (engranes, báscula nueva sin precio), azul (documento, viaje con kilos distintos a lo pactado), gris (calendario, afinación en 30 días).
    - Conservar lo que ya hace: tocar el aviso lleva a donde se resuelve; deslizarlo a un lado lo pospone a mañana; los urgentes primero; el título "Por atender (N)". Los íconos se dibujan dentro de la app (sin internet).
    - Opinión y propuestas (esperando OK):
      (a) El color debe decir QUÉ TAN URGENTE es, siempre igual: rojo = urgente (hoy), naranja = pronto, azul = vehículos, verde = falta un dato o un ajuste, gris = informativo o falta mucho. En la foto, la fruta pasada sale roja en roatán y naranja en macho, aunque es el mismo problema → las dos rojas, y el ícono dice si es roatán o macho.
      (b) "ACCEDER" ocupa mucho a lo ancho y aprieta el texto (en el Motorola se partiría en más renglones). Mejor solo la flecha › grande, o la palabra "Ver" corta; toda la tarjeta se puede tocar.
      (c) El botón verde "+" tapa la flecha del aviso de abajo (en la foto tapa "ACCEDER" del viaje) → dejar espacio abajo de la lista para que el "+" no tape nada.
      (d) En modo oscuro: mismos colores, pero fondo oscuro con orilla de color, para que se lea.
    → 50 DECIDIDO (11 nov): sí a las 4 propuestas: (a) colores por urgencia, siempre iguales (rojo urgente hoy, naranja pronto, azul vehículos, verde falta un dato o ajuste, gris informativo o falta mucho); la fruta pasada sale roja en roatán y en macho, y el ícono dice cuál es; (b) en lugar de "ACCEDER", flecha › grande o "Ver" (toda la tarjeta se puede tocar); (c) espacio abajo de la lista para que el "+" no tape nada; (d) modo oscuro con fondo oscuro y orilla de color. Se conserva tocar = ir a resolverlo, deslizar = posponer a mañana, urgentes primero. Hacerlo cuando diga que empiece.
51. (11 nov) Inicio → Finanzas → "👁 Mostrar": al tocarlo la pantalla se SUBE mucho y las tarjetas quedan cortadas arriba. Detalle menor: solo que no suba tanto (que "Finanzas" y sus tarjetas queden a la vista, sin brincar).
    - Pista en el código: "finver" vuelve a dibujar toda la pantalla (render) y las tarjetas cambian de alto; el brinco puede venir de ahí (o del ajuste del scroll al redibujar). Al hacerlo: guardar dónde está el título "Finanzas" antes de dibujar y dejarlo en el mismo lugar después; revisar también "🙈 Ocultar" y cuando se esconde solo a los 20 s.
52. (11 nov) Pantalla del PIN en MODO OSCURO: el texto sí cambia (se pone claro), pero el FONDO se queda claro → "Hola, Ricardo Nieto", el texto de "Pasaron 5 minutos…" y "Entrar con mi huella o cara" casi no se ven (letra clara sobre fondo claro). Foto: fotos/p52-pin-oscuro.png. Hay que corregirlo.
    - Causa en el código: capa l66, #pinov tiene el fondo fijo claro (linear-gradient #ECFDF5 → #F1F5F9 con !important) y las teclas blancas fijas; no hay versión para modo oscuro.
    - Al hacerlo: en modo oscuro, fondo oscuro (con un toque verde arriba), teclas oscuras con número claro, tecla de huella verde oscuro, botón "Entrar con mi huella o cara" oscuro con letra clara, "Olvidé mi PIN" y "No soy…" en colores que se lean. Revisar también: celular en oscuro + app en claro (y al revés), como en el punto 4/9.
53. (11 nov) Bodega → "Fruta madura por antigüedad": las tarjetas de cada lote NO hacen nada: no se pueden tocar, no hay ninguna acción y no se pueden quitar (ni las que dicen "Pasada de tiempo").
    - Ojo con los números: esos lotes NO son un registro aparte; salen del inventario de maduras (madSync: si bajan las maduras, se quitan primero los lotes más viejos). Si solo se "borrara" la tarjeta, el inventario y los lotes dejarían de cuadrar. Por eso cada acción debe mover el inventario de verdad.
    - Propuesta (esperando OK): al tocar un lote se abre una tarjeta de pantalla completa paso a paso con:
      (a) "Se tiró (merma)" → cuántas cajas/kg → foto opcional → ¿Seguro? (usa el mismo registro de merma que ya existe, "Registrar como merma"; el chofer/encargado lo manda para aprobación);
      (b) "Se remató en bodega" → cuántos kg y a cuánto → ¿Seguro? (entra como venta de bodega por kilo, como lo de segunda);
      (c) "Ya no está / el conteo está mal" → cuántas quedan de verdad → ¿Seguro? (ajuste de inventario que queda en el historial con quién y cuándo);
      (d) "Todavía está buena" → marcarla revisada hoy (deja de salir en rojo hoy, sin mover números).
      Deslizar el lote a un lado = atajo para abrir esas mismas opciones (no borrar directo).
    - Pregunta pendiente para Ricardo: ¿le late así, o quiere otras acciones?
    → 53 DECIDIDO (11 nov) · PRIORIDAD BAJA (Ricardo: "es muy, muy raro que se nos queden cajas así"; hacerlo sencillo). Al tocar un lote, 4 opciones, y las 4 DESCUENTAN del inventario de maduras:
      1) "Se tiró" → cuánto → ¿Seguro? → merma (mismo registro de merma de siempre).
      2) "Se remató" → cuánto y a cuánto → ¿Seguro? → venta de bodega por kilo (entra el dinero a la caja).
      3) "Ya no está" → pregunta "¿Alguien se la llevó o la vendió?": un chofer (se le suma a lo que lleva para que su cierre cuadre) / se vendió en bodega (cuánto y a cuánto) / no sé (ajuste que queda en el historial con quién y cuándo).
      4) "Estaba buena y salió a la venta" → misma pregunta: ¿qué chofer se la llevó, o se vendió en bodega?
      Sin opción de "marcar revisada sin mover números" (se cambió por la 4). Deslizar = abre estas mismas opciones.
    → 53 CORRECCIÓN (11 nov) a la opción 4 "Estaba buena y salió a la venta": NO se le suma al chofer ni se descuenta del inventario (eso ya pasó cuando se registró la carga del chofer). Ejemplo de Ricardo: hay 30 cajas maduras, 15 son las más viejas; el chofer carga 20 → se llevó las 15 viejas y 5 de las otras.
      - La app ya descuenta así al cargar (madSync quita primero los lotes más viejos), por eso normalmente esa tarjeta se va sola.
      - Si aun así sale una tarjeta vieja y Ricardo dice "salió a la venta": solo se corrige CUÁLES quedan (las que quedan en bodega son las más nuevas: ese lote se pasa a la fecha del siguiente más nuevo, o a hoy). NO cambia ningún número (inventario, cajas del chofer ni dinero). Queda en el historial.
      - Las opciones 1 "Se tiró" y 2 "Se remató" sí descuentan. La 3 "Ya no está": sí descuenta, preguntando si se vendió en bodega o "no sé" (se quita lo de "un chofer": lo que se lleva un chofer siempre entra por su carga).
54. (11 nov) Precio de la carga → desglose y precio sugerido de la caja/kilo: NO está sumando el DESGASTE DEL VEHÍCULO (y ya lo teníamos: "desgaste por km" en cada vehículo, 0.60 por km si no tiene).
    - Causa en el código (base-v38, trCost): el desgaste (y el sueldo del chofer) solo entran si ya se llenó "Costo del viaje más exacto" (c.cv). Mientras tanto el transporte = diésel + comida + casetas + extras, sin desgaste. La tarjeta paso a paso de la carga (cmov: "Revisa y guarda" y "Caja de roatán · Precio sugerido") y el desglose de "Lo que pagaste → Transporte (diésel, comida, casetas, extras)" usan ese cálculo → el costo por caja/kilo sale más bajo y el precio sugerido también.
    - Al hacerlo: sumar SIEMPRE el desgaste al transporte: km del viaje (odómetro si ya está; si no, el estimado de la ruta, 330 km por defecto) × desgaste por km del vehículo que fue. Que se vea su propio renglón en el desglose: "Desgaste del vehículo (N km × $X)". Cuando se capture el costo exacto, se cambia por los km reales (sin contarlo doble). Se reparte entre roatán y macho igual que el resto del transporte. Revisar que cuadre en: desglose, precio sugerido, comparar proveedores y "Ojo: el precio sugerido sube/baja".
    - Pregunta pendiente: el SUELDO del chofer del viaje (y su comisión por viaje) tampoco entra hasta el costo exacto. ¿También se suma siempre?
    → 54 DECIDIDO (11 nov): en las tarjetas paso a paso donde se llena la carga (registrar carga, registrar viaje y llenar los datos que faltan), AL FINAL DEL DESGLOSE van dos tarjetas aparte:
      1) "¿Sumar el desgaste del vehículo?" → enseña el vehículo, los km y el precio por km (ej.: Freightliner, 300 km × $1 = $300) → botones grandes Sí / No. Km: odómetro si ya está, si no el estimado de la ruta (se puede corregir ahí mismo). Precio por km: el de la ficha del vehículo.
      2) "¿Quién fue por la fruta?" → "Fui yo" (el administrador) u otro chofer (lista) → "¿Se le asignó un sueldo por este viaje?" Sí (cuánto, ya escrito con lo de su ficha: sueldo del día + comisión por viaje; se puede cambiar) / No.
      Lo que se escoja se suma al transporte y entra en el costo por caja/kilo y en el precio sugerido (repartido entre roatán y macho como el resto del transporte), con su propio renglón en el desglose. Sin contar doble con "Costo del viaje más exacto" (si después se captura, usa los km reales y lo ya contestado).
    → 54 (11 nov) DESGLOSE CON TODOS LOS GASTOS: Ricardo: "que vengan todos los gastos, todos". En "1 · Lo que pagaste" ya no un solo renglón "Transporte (diésel, comida, casetas, extras)", sino CADA gasto en su renglón: fruta de roatán, fruta de macho, otras frutas, combustible (litros × precio), comida, casetas, básculas, cada extra con su nombre (talacha, etc.), desgaste del vehículo (N km × $X) y sueldo/comisión del chofer del viaje. Al final "Total del viaje" (tiene que cuadrar con la suma de los renglones). Los renglones en $0 no salen. Revisar que las básculas y los gastos que el chofer registró en el viaje sí entren.
    → 54 (11 nov) Ricardo registró una carga y NO le salió dónde poner el costo más a detalle. Revisado en el código: el botón "Costo del viaje más exacto (combustible, desgaste, sueldo)" solo sale cuando la carga ya está "Recibida", y si ya se escribió el diésel queda ESCONDIDO dentro de Cargas → la carga → "Ver detalle" (plegado), como botón chico gris. Solo sale a la vista (tarjeta roja "Capturar costo del viaje") si falta el combustible.
      Con lo decidido arriba se resuelve: las preguntas de desgaste y chofer/sueldo salen SIEMPRE al final del desglose en la tarjeta paso a paso de la carga (no hay que buscarlas). Además: sacar "Costo del viaje más exacto" de "Ver detalle" y ponerlo a la vista en la carga, como botón grande.
55. (11 nov) REGLA DE ORO DEL DINERO (Ricardo: "son mega importantes, definen si el negocio es rentable"). En todo lo que tenga que ver con dinero, gastos y cargas: que NO se pase nada. El costo real de la caja/kilo tiene DOS partes y las dos deben entrar al precio sugerido:
    A) TRAER LA FRUTA (viaje de carga, bodega → proveedores → bodega): fruta + combustible + casetas + comida + básculas + sueldo/comisión del chofer + desgaste del camión por km + IMPREVISTOS del camino (ponchadura/talacha, grúa, refacción, mecánico, multa, etc., cada uno con su nombre y foto del ticket). Ya decidido en el 54 (tarjetas al final del desglose y todos los gastos en renglones).
    B) REPARTIRLA (salir a ruta con las NP300): combustible de la ruta + desgaste de la camioneta por km (odómetro de salida y regreso) + sueldo/comisión del chofer + casetas/comida acordada + imprevistos de la ruta (talacha, grúa, etc.) → dividido entre las cajas y kilos entregados = "costo de reparto por caja/kilo".
    - Revisado en el código: la tarjeta "Costo de reparto por caja" (base-v38, repCostoCard) usa números FIJOS de ejemplo (95 km × $0.60 de desgaste y sueldo $450 + $2,600/7 por día), no los reales de cada ruta, y NO entra al precio sugerido. Hay que cambiarla para que use lo real: km del odómetro de cada vehículo, su desgaste por km, el combustible que se cargó, los gastos del cierre de cada chofer y su sueldo.
    - Precio sugerido = (costo de traerla + costo de repartirla) × (1 + meta de ganancia). En el desglose: "Te cuesta puesta en bodega" + "Repartirla te cuesta" = "Te cuesta entregada al cliente", y sobre eso la meta.
    - COMBUSTIBLE ESTANDARIZADO (ya platicado antes): con el uso, la app aprende el rendimiento real de cada vehículo (km por litro, con los tanques y cargas registradas) y el precio del litro de las últimas cargas; con eso estima el combustible de un viaje aunque no se capture todo, y avisa si un viaje gastó mucho más de lo normal.
    - Imprevistos: que exista "Imprevisto del camino" en los gastos del viaje de carga y de la ruta (tipo: ponchadura, grúa, refacción, mecánico, otro), con foto del ticket obligatoria (como el 31). Una reparación grande (más de cierta cantidad) preguntar: ¿se carga a este viaje o al mantenimiento del vehículo? (para no inflar de golpe el costo de una sola carga).
    - Revisar al hacerlo: que cada peso que sale (cierres, viajes, gastos fijos) quede en un solo lugar y no se cuente dos veces; prueba que sume todo y cuadre con la caja.
    → 55 DECIDIDO (11 nov):
      - IMPREVISTOS: hasta $500 (ponchadura, talacha) se cargan al viaje o a la ruta (entran al costo de la caja). Más de $500 (grúa, reparación grande) se cargan al MANTENIMIENTO del vehículo (no al costo de esa carga). La app lo acomoda sola según el monto y lo dice en el renglón; el administrador lo puede cambiar. El tope de $500 se puede cambiar en Ajustes.
      - COMIDA siempre autorizada antes por el administrador (amplía el 31):
        · Viaje de carga: al programar/mandar el viaje, tarjeta "¿Tiene autorizado comer?" Sí (máximo $___) / No. Si es No, el chofer no ve el botón de comida en ese viaje; si es Sí, no le deja pasar del máximo (o le pide permiso al admin).
        · Ruta de reparto: en la ficha del chofer (al darlo de alta y en Editar): "¿Tiene comida asignada?" Sí (presupuesto diario $___) / No. Si es No, ni siquiera sale el botón. Se puede cambiar después (si hay otro acuerdo, se vuelve a habilitar). Queda en el historial el cambio.
      - CASETAS: solo en el viaje de carga (ir con el proveedor). En la RUTA de reparto NO hay casetas: quitar "Caseta" de los gastos del reparto y no contarla en el costo de reparto.
56. (11 nov) BOTÓN "REPORTAR UN PROBLEMA" (idea de Ricardo, para que no se pase ningún error). Propuesta (esperando OK):
    - Dónde: botón "🐞 Reportar un problema" en el menú (☰) y dentro del "?" de arriba, en todas las pantallas, para todos (admin, encargado, choferes).
    - Al tocarlo: tarjeta de pantalla completa: arriba dice solo dónde estás ("Estás en: Cargas → Registrar carga → paso 4 · Precio"); "¿Qué pasó?" (escribir o dictar con el micrófono del teclado); "¿Qué tan grave?" (No me deja trabajar / Un número está mal / Se ve raro / Idea); opción "Agregar captura de pantalla" (la que tomó con los botones del celular, de la galería); Enviar.
    - Lo que la app guarda SOLA (sin que lo escriba): pantalla y tarjeta abierta, paso, quién, celular, versión de la app, fecha y hora, si había internet, y los últimos errores internos de la app (los que no se ven). Sin datos de dinero de clientes de más.
    - También, sin botón: si la app tiene un error interno, lo anota sola en el mismo registro (marcado "automático").
    - Se sube a la nube (Firebase, colección aparte) para que el hijo lo vea desde Tijuana; si no hay internet, se guarda y se manda después.
    - Para revisarlos: Ajustes → "Problemas reportados": lista por fecha con dónde pasó, marcar "Resuelto", y "Sacar el registro" (archivo de texto en Descargas/Ruta Facil y botón de mandarlo por WhatsApp) para pasárselo a Claude en la siguiente sesión y arreglarlos por número.
57. (11 nov) Inicio → "Pedidos por WhatsApp": cada tarjeta de pedido debe decir en qué va, y poderse MINIMIZAR para que la lista no se haga larga.
    - Estados (como una rayita de pasos en cada pedido): ✓ Recibido (se registró) → ✓ Chofer asignado (nombre del chofer) → ✓ Salió a reparto → (al entregarse se quita de la lista, como hoy).
    - Revisado en el código: hoy el pedido se guarda en el cliente (c.ped: roatán, macho, cuándo, nota) y NO tiene estado. Al hacerlo: "chofer asignado" = el cliente ya está en la ruta de un chofer para ese día; "salió a reparto" = ese chofer ya arrancó su ruta. (Que salga solo, sin que el admin lo marque a mano.)
    - Minimizar: los pedidos que ya tienen chofer o ya salieron se ven chiquitos en un renglón (nombre · chofer · estado) y se pueden abrir con un toque; también un "Ver todos / Ocultar los ya asignados". A la vista grande quedan solo los que falta asignar, y siempre el botón "＋ Registrar un pedido".
    - Pregunta pendiente: el pedido que todavía no tiene chofer, ¿debe tener un botón "Asignar chofer" ahí mismo?
    → 57 DECIDIDO (11 nov): SÍ botón "Asignar chofer" ahí mismo en cada pedido sin chofer: abre una tarjeta con los choferes de ese día (botones grandes) → mete al cliente en la ruta de ese chofer (al final, o donde le toque por ubicación) → el pedido pasa solo a "Chofer asignado". Si ese chofer ya salió, le avisa al chofer que tiene una parada nueva. Que se pueda cambiar de chofer después (con ¿Seguro?).
58. (11 nov) DECISIONES ANTES DE ARMAR LA VERSIÓN NUEVA (Ricardo contestó las preguntas; todavía NO armar: va a mandar más cosas antes):
    - Se mete TODO (49 al 57 y lo de aquí) en una sola versión, con pruebas completas.
    - Borrar todo / empezar de cero: NO habrá botón en la app (peligroso). Cuando el APK esté terminado, explicarle paso a paso cómo borrar los datos y las cuentas en la consola de Firebase y los datos de la app en cada celular.
    - Ubicaciones (bodega en la primera vez, proveedores —El Pital, Nautla, Coacoatzintla—, clientes y todo lo que tenga ubicación): tres formas: "Estoy aquí (GPS)", "Pegar link de Google Maps" y BUSCAR como en Uber (escribe el nombre o la dirección → sale la lista de lugares de Google → escoge → mapa con PIN que se arrastra para dejarlo exacto → ¿Seguro?).
      · Además: botón "Confirmar la ubicación aquí" para el chofer cuando está en el lugar (en la ruta con un cliente, o en el viaje de carga con el proveedor): guarda las coordenadas exactas de su GPS (queda en historial quién y cuándo; si ya tenía, pregunta ¿Seguro? y avisa al admin).
      · PENDIENTE DEL USUARIO (se le dirá al armar): habilitar "Places API (New)" en la llave de Google para el buscador.
    - Desgaste por km: se queda $0.60 por km por defecto si no hay registros. Con el uso, la app lo AJUSTA SOLA para cada vehículo (lo que de verdad se gastó en servicios y reparaciones ÷ km recorridos; hoy solo lo sugiere). Que avise cuando lo cambió y cuánto.
    - Costo de reparto: el roatán se compra por kilo pero se vende por CAJA → su costo de reparto va POR CAJA; el macho POR KILO. (Para dividir el gasto del día entre los dos: por el peso de lo entregado; luego se muestra como $ por caja de roatán y $ por kilo de macho.)
    - Meta de ganancia: una para roatán y otra para macho, con la opción "Usar la misma para los dos".
    - 56 Reportar un problema: SÍ, como se propuso. Todo lo que se pueda se llena SOLO; lo que no, a mano.
    - Simulación: el GPS manda la ubicación real (va a probar con ubicaciones reales en Tijuana).
    - Contra errores de dedo: SÍ. Si un número sale muy fuera de lo normal (kilos, precio, litros, gastos, cajas), pregunta "¿Seguro? Es mucho más de lo normal (normalmente X)" antes de guardar.
    - Publicar: DIRECTO a main (APK final), sin APK de prueba aparte; mandar la lista de prueba por número de punto para verificar.
    - Sin contestar todavía: la tarjeta "¿Cuadra todo?" (punto 8 de las sugerencias).
    - (respuesta pendiente de Ricardo sobre "¿Cuadra todo?")
59. (11 nov) Mapa chico (el de antes, Leaflet, ya NO el de Google) en Personal → "Tú · viaje de carga": al moverlo con el dedo se DESPLAZA TODO EL CUADRO del mapa (incluso los botones + y −): queda corrido a la derecha, con un hueco blanco a la izquierda y cortado por la orilla de la tarjeta. Foto: fotos/p59-mapa-chico-se-corre.png.
    - Lo que debe pasar: al arrastrar, solo se mueven las calles DENTRO del cuadro; el cuadro y los botones + − se quedan fijos en su lugar.
    - Sospechas a revisar al hacerlo: (a) algo que contiene al mapa se puede deslizar de lado (overflow) y el dedo mueve ese contenedor en vez del mapa → poner el cuadro con overflow:hidden y touch-action:none; (b) el deslizar de lado para cambiar de sección (ya hay bloqueo sobre mapas, l45 "68") todavía mueve la tarjeta en ese mapa; (c) quedó algún estilo del hueco del mapa de Google (gmhole/l67) que corre el cuadro. Reproducirlo en prueba con toque (celular emulado) y revisar TODOS los mapas chicos (Personal: viaje de carga y mapa en vivo; Su recorrido; clientes; rutas).
60. (11 nov) AVISOS "NO CUADRA" QUE NO SE ENTIENDEN (urgentes al abrir la app). Fotos: fotos/p60a-no-cuadra-cajas.png y fotos/p60b-no-cuadra-numeros.png.
    - "no cuadra · Los números se pueden calcular (Algún número salió vacío o inválido)" → no dice cuál número ni dónde.
    - "no cuadra · Todas las cajas están contadas (hay — y deberían ser 1312)" → "hay —" no se entiende.
    - Ricardo: "cuando mi papá la use no va a saber ni qué hacer con eso; ni yo sé qué se hace con esas tarjetas".
    - Revisado en el código: salen de la "Revisión automática de cuentas" (capa l5, cuentasRevisar; se ve en Más → Estadísticas como "✓ Las cuentas cuadran / ⚠ Algo no cuadra"); cada revisión que falla se vuelve aviso URGENTE con su nombre técnico. O sea, la tarjeta "¿Cuadra todo?" que propuse YA EXISTE, pero escondida y con palabras de programador.
    - Además hay un ERROR REAL detrás: "hay —" quiere decir que el total de cajas (cajasDonde().tot) salió vacío/inválido (NaN), y por eso también falla "Los números se pueden calcular". Algún número del inventario de cajas/taras quedó vacío (sospecha: taras con proveedores, con clientes o alguna bodega/vehículo sin número). HAY QUE ENCONTRARLO Y ARREGLARLO (y que nunca más un número vacío rompa las cuentas: si falta, contarlo como 0 y decir cuál faltaba).
    - Cómo deben quedar estos avisos (propuesta, esperando OK):
      · Título en palabras de todos los días: "Las taras no cuadran", "Falta un número en el inventario", "El efectivo de Juan no cuadra"…
      · Qué está mal, con los números: "La app cuenta 1,300 taras y deberían ser 1,312: faltan 12."
      · Dónde está: "Taras con clientes: 3 clientes sin número" / "Bodega: macho maduro vacío".
      · Qué hacer: un botón que lleve justo ahí ("Ir a contar las taras", "Corregir el número de Juan") y, si es un error de la app (no del usuario), decirlo claro: "Esto es un error de la app, no tuyo. Ya quedó anotado para arreglarlo" (se manda solo al registro de problemas del 56).
      · La tarjeta "¿Cuadra todo?" a la vista en Inicio (chica, verde ✓ cuando todo está bien; roja con la lista en palabras claras cuando no).
61. (11 nov) Diseño nuevo de la ventana de AVISO URGENTE que sale al abrir la app ("Atiende esto", N de 7). Foto: fotos/p61-aviso-urgente.png.
    - Diseño: franja roja arriba con ⚠️ "Urgente" y rayas diagonales; pastilla "4 de 7" y ×; ícono grande en círculo rosa (calendario con !); título grande y texto; botón rojo grande "✓ | Atender ›"; botón blanco con borde "🕒 | Después"; esquina con rayas rojas.
    - Ajustes propuestos (esperando OK):
      (a) Título: en vez de "Atiende esto" (siempre igual), el título claro del aviso (punto 60): "Las taras no cuadran", "Falta el precio de hoy"… y abajo el detalle con números y dónde.
      (b) Ícono según el tipo de aviso (taras, dinero, vehículo, fruta, cliente…), no siempre el calendario; mismos íconos y colores que los avisos de Inicio (punto 50).
      (c) Color según urgencia (punto 50): rojo solo en lo urgente; si sale uno naranja o azul, la franja y el botón de su color.
      (d) Quitar la ×: hace lo mismo que "Después" y dos botones para lo mismo confunden. (Si se deja, que haga exactamente lo de "Después".)
      (e) El ✓ en "Atender" parece "ya quedó resuelto", y en realidad te LLEVA a resolverlo → dejar solo "Atender ›" (o un ícono de flecha).
      (f) Modo oscuro: fondo oscuro, misma franja de color.
    → 61 DECIDIDO (11 nov): sí a (a) título claro, (b) ícono según el tipo, (c) color según urgencia, (e) "Atender ›" sin palomita y (f) modo oscuro.
      La × (Ricardo pensó que era para quitar todos los avisos de un golpe): SE QUITA. Razón: son urgentes (dinero, cajas); cerrarlos todos de un toque hace fácil que se pase algo importante. Con "Después" se pasa al siguiente y todos se quedan en Inicio → "Por atender", así que nada se pierde.
62. (11 nov) Tres errores juntos (admin, al usar el menú lateral y bloquearse la app):
    a) Al entrar a una opción del MENÚ LATERAL (ej.: "Sugerencias"), esa opción se queda SELECCIONADA (marcada) en el menú aunque ya salió de ahí.
    b) Estaba en "Sugerencias", salió de la app a otra cosa, al regresar se bloqueó → PIN → la app lo dejó en INICIO (bien, punto 24), pero la BARRA FLOTANTE DE ABAJO YA NO APARECIÓ (desapareció). Sospecha: la ventana de Sugerencias (pantalla completa) esconde la barra; al bloquear y mandar a Inicio, la ventana se cerró pero la barra se quedó marcada como escondida (o el esconder-al-deslizar, navHid, se quedó prendido). Al hacerlo: al desbloquear siempre cerrar ventanas abiertas y volver a mostrar la barra; y que la barra nunca se quede escondida si no hay una ventana abierta.
    c) El NUMERITO de la barra (punto 48, ya hecho en l67): 1er toque = ir a la sección; 2º toque estando ahí = ir al pendiente de ese numerito. En el celular NO HACE NADA. Revisar en el APK real (toque de dedo, no clic de computadora; puede que el toque lo agarre antes el deslizar de secciones o que el numerito no esté dentro del botón) y probarlo con toque emulado.
    → 62c (Ricardo, 11 nov): en Bodega tenía el numerito 4; sospecha que no sabe cuál de los 4 escoger, o que eran las tarjetas de fruta madura que ya se iba a pasar (que no tienen acción, punto 53) y por eso no se veía nada.
      Muy probable: esos avisos mandan a "Bodega", y como ya estaba en Bodega, el 2º toque lo "llevaba" al mismo lugar y no se notaba nada.
      Al hacerlo: el 2º toque debe BAJAR hasta la tarjeta exacta del pendiente y marcarla (parpadeo), y si tiene acción, abrirla (ej.: el lote de fruta pasada abre sus opciones del 53). Si hay varios, va primero al más urgente; cada toque más pasa al siguiente, con un aviso chico "1 de 4: 60 cajas de roatán pasadas de tiempo". Nunca un toque sin que pase algo (si no hay a dónde ir, decirlo).
### HECHO (11 nov) · versión 7.5 · capas l68, l69, l70 (puntos 49 al 62)
- l68 · 49 inventario en Inicio: renglón "Inventario de bodega" + tarjetas Roatán (encabezado ámbar sólido, pastilla de taras vacías) y Macho (verde sólido), barra de colores, 4 cuadritos sin %, "Te alcanza para N días" verde/amarillo/rojo; tocar → Bodega.
- l68 · 50 "Por atender": cada aviso en tarjeta de color según urgencia (rojo urgente, naranja pronto, azul vehículos, verde falta un dato, gris para saber), ícono dibujado en la app, letra grande, flecha ›, "Posponer" abajo del texto; espacio abajo para el +.
- l68 · 52 PIN en modo oscuro. · 61 ventana de aviso: franja de color con nivel, "N de M", ícono, título claro, "Atender ›", "🕒 Después", sin ×.
- l68 · 51 Finanzas ya no brinca (era el "anclaje del scroll" del navegador: overflow-anchor:none). · 59 el mapa chico ya no se corre: tenía la marca data-swipe del gesto "posponer aviso" (se cambió por data-noswipe).
- l68 · 62a "Sugerencias" en el menú ya no se ve verde/seleccionado · 62b la barra de abajo vuelve al cambiar de pantalla o desbloquear · 62c 2º toque del numerito baja al pendiente exacto y lo marca; con varios, cada toque el siguiente ("1 de 4: …"); los lotes de fruta abren sus opciones.
- l69 · 54 registrar carga: pregunta de imprevisto en "Gastos"; al final del desglose "¿Sumar el desgaste del vehículo?" (km × $/km) y "¿Se le asignó un sueldo por este viaje?"; desglose con TODOS los gastos en renglones y total que cuadra; "Costo del viaje más exacto" con las mismas dos preguntas (paso "Te cuesta") y botón grande a la vista en la ficha de la carga.
- l69 · 55 costo de repartir REAL (rutas cerradas de 30 días: combustible y gastos de la ruta, desgaste por km del odómetro, sueldo del día) por caja de roatán y por kilo de macho; precio sugerido = (puesta en bodega + repartir) × meta; meta de roatán y de macho (botón "Usar la misma para los dos"); imprevistos hasta $500 al viaje, más al mantenimiento del vehículo (Ajustes cfg.topeImp); comida del viaje autorizada (sí/no y máximo) y presupuesto diario de comida en la ficha del chofer; sin "Caseta" en el reparto; el desgaste por km se ajusta solo una vez al día con lo gastado en el año.
- l69 · 58 errores de dedo en la carga (kilos, cajas, precio, combustible) y en gastos de la ruta: "¿Seguro? Es mucho más de lo normal".
- l69 · 60 ningún número vacío rompe las cuentas (se pone en 0, se avisa y se anota solo); avisos "no cuadra" en palabras claras con números y qué hacer ("Esto es un error de la app, no tuyo" cuando aplica); tarjeta "Todo cuadra / Algo no cuadra" en Inicio. Nota: el "Se tiró" de antes no regresaba la tara vacía (descuadraba taras); en el 53 sí se regresa.
- l70 · 53 lotes de fruta madura: tocar o deslizar → Se tiró / Se remató (entra a la caja) / Ya no está (se vendió en bodega o no sé) / Salió a la venta (solo acomoda fechas) con ¿Seguro?.
- l70 · 57 pedidos (en Clientes): pasos Recibido → Chofer → Salió a reparto (solos), "🚚 Asignar chofer" ahí mismo (con aviso al chofer y ¿Seguro? al cambiar), los ya asignados chiquitos y "Ver todos".
- l70 · 56 "🐞 Reportar un problema" en el menú y en el "?" (dónde, quién, celular, versión, hora, internet y errores internos solos; captura opcional); se sube a la nube (s~probs); Ajustes → "Problemas reportados": Resuelto, "Sacar el registro" (Descargas/Ruta Facil) y "Mandar por WhatsApp". Los errores internos se anotan solos.
- l70 · 58 ubicaciones: GPS / buscar como en Uber (nativo lugaresGoogle, Places API New) / pegar link (los cortos maps.app.goo.gl se abren con nativo linkLargo) con pin que se arrastra y ¿Seguro?; en el paso "Bodega" de la primera vez, en Ajustes, en proveedores y clientes (Datos); el chofer: "Confirmar la ubicación aquí" en la entrega (avisa al admin).
- Pruebas nuevas: t68 (18), t69 (27), t70 (26).
- PENDIENTE DEL USUARIO: en Google Cloud, en la llave de Android, agregar "Places API (New)" a las APIs permitidas (para "Buscar el lugar").

### Lista de prueba 7.5 (por número de punto)
49. Inicio: "Inventario de bodega" + tarjetas Roatán (ámbar) y Macho (verde) con barra de colores; el aviso de días cambia de color; tocar una tarjeta lleva a Bodega.
50. Inicio → "Por atender": tarjetas de color con ícono y ›; la fruta pasada sale roja en roatán y en macho; el + no tapa el último aviso.
51. Inicio → Finanzas → "👁 Mostrar" y "🙈 Ocultar": la pantalla no brinca.
52. Celular en modo oscuro: la pantalla del PIN se ve oscura y se lee todo.
53. Bodega → "Fruta madura por antigüedad": toca un lote → prueba "Se tiró", "Se remató" (entra a la caja), "Ya no está" y "Salió a la venta" (no cambia números).
54. Registrar carga: en "Gastos" pregunta por imprevistos; en "Revisa y guarda" salen "¿Sumar el desgaste?" y "¿Sueldo por el viaje?"; el desglose trae cada gasto y el total cuadra. En la ficha de la carga, botón grande "Costo del viaje más exacto".
55. Precio sugerido = puesta en bodega + repartirla (sale después de cerrar rutas) × meta; meta distinta para macho; imprevisto de más de $500 dice "va al mantenimiento"; viaje con comida "No" → el chofer no ve "Comida"; ficha del chofer → presupuesto diario de comida; en la ruta ya no sale "Caseta".
56. Menú (☰) o "?" → "🐞 Reportar un problema" → escribe y manda; Ajustes → "Problemas reportados" → "Sacar el registro".
57. Clientes → Pedidos por WhatsApp: un pedido de hoy sin chofer → "🚚 Asignar chofer" → al chofer le llega el aviso; luego se ve chiquito con "Ver todos".
58. Primera vez → paso Bodega → "Poner la ubicación de la bodega" → "Buscar el lugar" (como Uber) → escoge → arrastra el pin → "Sí, guardar". También en Proveedores/Clientes → Datos. Chofer en la entrega → "Confirmar la ubicación aquí". (Necesita "Places API (New)" en la llave.)
58b. Carga con 10 veces más kilos de lo normal → "¿Seguro? Es mucho más de lo normal".
59. Personal → mapa chico: arrástralo; solo se mueven las calles, no el cuadro.
60/61. Si algo no cuadra: el aviso dice qué, con números y dónde; la ventana urgente sin ×, con "Atender ›" y "Después". Inicio → tarjeta "Todo cuadra / Algo no cuadra".
62. Menú: "Sugerencias" ya no se ve verde. Entra a Sugerencias, deja que se bloquee, mete el PIN: la barra de abajo aparece. Bodega con numerito: 1er toque entra, 2º toque baja al pendiente (con varios, cada toque el siguiente).

## 2026-11-12 · Prueba de la 7.5 desde cero + pedidos nuevos — SOLO ANOTAR (pidió NO hacer cambios: revisar, preguntar y sugerir)
Pedidos grandes:
- TAGs de autopista: YA implementarlo (ver "TAGs de autopista (5 nov)").
- Facturas: agregar el módulo/proceso de facturar aunque todavía no lo use.
- IA de verdad: explicarle cómo se haría (sin hacer).
Errores y mejoras de la prueba (revisado en el código):
63. Buscador de lugares: dice que "Places API (New)" no está habilitada y Ricardo dice que sí. Código (l70 ub68Busca): CUALQUIER 403 de Google enseña ese mensaje y se tira el mensaje real de Google (j.error.message). Causas posibles: (a) la API está en la lista de la llave pero no "Habilitada" en el proyecto (Biblioteca de APIs), (b) se habilitó "Places API" vieja y no "Places API (New)", (c) la huella SHA-1 del APK (firma de GitHub Actions) no es la registrada en la llave. Arreglo: enseñar el mensaje real de Google y probar. Quitar "(como en Uber)" del texto.
64. Links de Google Maps no funcionan. Código: solo la ventana nueva (l70) abre links cortos; las viejas (l26 ubParse, l62 bodega, cliente nuevo l47/l16, primera vez) no. Además, muchos links cortos de un lugar se abren como "maps.google.com/?q=Nombre&ftid=…" SIN coordenadas → falla aunque se abra. Arreglo: UNA sola forma de poner ubicación en TODA la app (GPS / buscar / pegar link / pegar coordenadas, todo en el mismo cuadro); si el link no trae coordenadas, buscar el nombre del lugar con Places y ofrecerlo. Cliente nuevo (admin y chofer) y primera vez usan esa misma ventana; el campo "Dirección" queda como texto de referencia.
65. Fruta madura por antigüedad: recién empezado ya pedía decidir qué pasó. Código: los lotes (S.madL) YA se descuentan solos (madSync, primero los más viejos) cuando sale fruta madura; pero l70 puso "Toca para decir qué pasó" en TODOS los lotes, aunque estén frescos, y "Salió a la venta" solo cambia la fecha (no quita la tarjeta). Arreglo propuesto: los lotes no piden nada mientras estén en tiempo; solo el que se pasó de su vida (y no se ha vendido) pide decidir; "Salió a la venta" quita el lote y lo descuenta del inventario si todavía estaba (preguntar).
66. Vehículos → aceite: "Km del último cambio de aceite" (l16) se entendió como km recorridos desde el cambio (puso 3,600 con odómetro 100,000 → "vencido por 96,400"). Arreglo: preguntar "¿Hace cuántos km fue el último cambio?" o "¿Qué marcaba el tablero cuando se cambió?" con dos botones, y validar (si es mucho menor que el odómetro y menor que el intervalo, preguntar cuál quiso decir). Alta de vehículo por pasos (pantalla completa) y ficha en pestañas: es mucha información en una sola.
67. Huella (chofer, Z Fold 5): falló 2 veces → Android canceló y se tomó como "no". Al volver con PIN la volvió a ofrecer; "Sí" no hacía nada y no se podía salir (trabada). Código l36: al fallar no guarda el "no"; probable que la ventana del PIN tape la de la huella o que el aviso de huella anterior siga abierto. Arreglo: (a) nunca ofrecer la huella desde la pantalla del PIN; se ofrece una vez DENTRO de la app (después de entrar) y queda en Ajustes → "Entrar con huella"; (b) si falla o se cancela, se cierra la ventana y no se vuelve a ofrecer sola; (c) la ventana siempre tiene "Ahora no".
68. Al chofer le dice cuántas cajas cargar sin pedidos ni clientes (primera vez). Probable: el "extra por si sale otro pedido" (+3 cajas/+20 kg, punto 66 viejo) o el promedio por defecto. Arreglo: sin historial ni pedidos, no sugerir números ("todavía no hay con qué calcular").
69. Cámara: en el Z Fold 5 siempre abre la frontal; en el Moto bien. No es la cuenta: la app pide la cámara trasera (capture="environment") pero la cámara de Samsung abre la última que se usó. Arreglo: cámara propia dentro de la app (siempre trasera, con botón para voltear) o pedirla por la pieza nativa con la trasera.
70. Marca de agua de las fotos: además de fecha y placa, poner QUIÉN la tomó.
71. Revisión semanal (lista de los lunes): hacerla pantalla completa paso a paso (una parte por tarjeta).
72. Chofer: venta a cliente nuevo pide los datos dos veces (alta + "completar datos"). Al cliente nuevo del chofer no se le pide horario. Después de guardar la ubicación vuelve a pedir el teléfono. Arreglo: un solo alta por pasos (nombre, teléfono, ubicación, horario, días) y no pedir lo que ya tiene.
73. Quitar la pregunta "¿cuántas están rotas?" cuando el cliente devuelve taras.
74. Primera vez: puso 1,900 kg de macho verde y en Bodega sale 0. Pista: también salió el aviso "Faltaba un número y la app lo puso en 0" → la revisión de números (l69 sano68) corre en CADA dibujo, también mientras se llena la primera vez con campos vacíos; puede estar poniendo 0 a lo que se está escribiendo. Revisar también "Metidas a madurar" y la carga de macho a madurar (¿salieron de los verdes?). Arreglo: que esa revisión no corra en la primera vez ni mientras se escribe, y que el aviso no salga por campos vacíos de un asistente.
75. Registrar carga de macho → "¿Metes a madurar?" → sí y kilos, pero no pregunta cuánto tiempo / cuándo sale.
76. Costo de la carga: ya se dio "Usar desde hoy" y el botón vuelve a salir.
77. Bodega: enseñar 4 números por fruta: total grande y abajo verdes / en maduración / maduras (hoy no salen los que están madurando).
    → (12 nov, Ricardo lo repite) Revisado: en Bodega la tarjeta "Existencias en bodega" (l65 exist65) solo trae Verdes y Maduras y el total de arriba NO suma lo que está madurando (en Inicio sí sale "Madurando"). Debe quedar así, para roatán y macho: "Hay 500 cajas de roatán, de las cuales:" y en grande 400 verdes · 50 en maduración · 50 maduras; el total incluye las tres. Lo que va en los camiones se ve aparte (no es de bodega).
78. Taras prestadas al cerrar entrega: ventana que recuerde no dejar taras (o el mínimo), botón "Ya le pedí las vacías", y si no las regresa en X días, descontar de la comisión/sueldo del chofer (preguntar reglas).
79. Ruta: "Más opciones" se queda abierto al pasar a otro cliente.
80. Ruta → registrar pedido de un cliente: en cajas de roatán no hay + y −; el formulario es del color del fondo (sin tarjeta).
81. Admin: "faltan datos" de un cliente lleva a su ficha pero no al campo que falta; hacerlo por pasos (solo lo que falta). En vez de "precio pactado": "¿Se le da precio de mayoreo? Sí/No" (usa el mayoreo del día). Precio especial solo como promoción de UNA vez o en pedidos por WhatsApp (preguntar).
82. Aviso "Faltaba un número y la app lo puso en 0" (ver 74): falsa alarma en la primera vez.
83. Cierre de ruta: al decir "falta la foto" no lleva al paso de la foto; hay que buscarlo. Arreglo: el aviso trae "Ir a tomarla" y salta al paso.
84. Chofer: "Cliente nuevo" y "Venta rápida" más arriba, más visibles y más bonitos.
85. Precio del día: caja a $200 pero mayoreo mínimo $220. Código: mayMin {R:'220',M:'15'} viene de la DEMO y no se borra en la app real (como el punto 74 viejo). Arreglo: al fijar el precio del día se fija también el de mayoreo (siempre menor o igual al normal, con aviso si queda debajo del costo); quitar ese dato de la demo.
### Decisiones (12 nov)
- 65 fruta madura: si las ventas ya cubrieron el lote, se quita SOLO, sin preguntar. Solo pregunta el lote pasado de días que no se vendió.
- 74 macho en 0: Ricardo está seguro de que puso 1,900 kg en el asistente y en Bodega salía 0 → es error de la app. Reproducirlo con la primera vez completa (asistente → nube → Bodega) antes de arreglar.
- 78 taras prestadas: "buró de taras" con los mismos tiempos del buró de crédito (cfg bD1/bD2/bD3 = 7/15/30 días): recordatorios al chofer y, al último plazo, descuento del SUELDO del chofer. El precio por tara del descuento se ajusta en Ajustes. Al cerrar la entrega con taras prestadas: ventana que le recuerda recogerlas o sufrirá deducciones de su sueldo + botón "Ya le pedí las vacías".
- 81 precio especial: solo UNA vez (promoción), nunca fijo. El mayoreo del día debe ser MAYOR al costo. Se pide al iniciar el día junto con el precio, como ya se hace (y se quita el $220 de la demo).
- 67 huella: no ofrecerla en la pantalla del PIN; ofrecerla dentro de la app y, si se omitió, volver a sugerirla dentro de la app más adelante (y siempre en Ajustes).
- 69 cámara: en el Fold la última usada fue la trasera y aun así abre la frontal → la cámara de Samsung no respeta lo que pide la app. Hacer cámara propia dentro de la app (siempre trasera, botón para voltear).
- TAGs: todavía no hay proveedor → hacerlo genérico (cualquier proveedor), que sirva para camioneta y camión (ligero/pesado).
- Facturas: SÍ, dejar todo listo y apagado (datos fiscales, facturar venta, factura global mensual); se conecta el PAC cuando lo quiera usar.
- IA: todavía NO. No olvidarla: proponerla más adelante (Functions + Haiku para lo diario y Opus para preguntas/resumen).
- 63 Places: "Places API (New)" ya dice "API habilitada" en el proyecto → el problema está en la LLAVE: falta agregarla a "Restricciones de API" de la llave que usa la app (la misma donde se agregó Routes API), o la huella SHA-1 del APK. Pedirle que lo revise; además enseñar el mensaje real de Google.
- (12 nov) 63 Places: Ricardo agregó "Places API (New)" a las Restricciones de API de la llave (sí faltaba). Probar "Buscar el lugar" otra vez en el celular (puede tardar ~5 min).
86. (12 nov) Desglose para el precio de venta: debe traer el DESGASTE del vehículo al ir por la fruta y al repartirla, y verse tanto al REGISTRAR UNA CARGA como al terminar un VIAJE DE CARGA.
    - Revisado: en la 7.5 (54/55) ya está en "Registrar carga" (pregunta "¿Sumar el desgaste?" con km × $/km) y el reparto real (desgaste por km del odómetro) entra al precio sugerido. Huecos: (a) el VIAJE DE CARGA crea su carga sin el desgaste (solo se suma si luego se abre "Costo del viaje más exacto"), aunque la app ya tiene los km del viaje → que lo sume solo y lo enseñe en el desglose al terminar; (b) el desgaste de REPARTIR sale en $0 hasta que haya rutas cerradas → mientras tanto, estimarlo (km normales de una ruta × $/km de la camioneta) y decir "estimado"; (c) el desglose debe enseñar en renglones separados: desgaste al ir por la fruta y desgaste al repartirla.
87. (12 nov) PRIMERA VEZ (asistente de 8 pasos: Bienvenida, Bodega, Vehículos, Personal, Clientes, Proveedores, Dinero y precios, Listo): cada paso es una página larga con muchos campos. Rehacerlo con la interfaz de pasos (estilo "Viaje de carga", una pregunta por tarjeta, barra de avance, Atrás/Siguiente fijos):
    - Bodega: ubicación → taras vacías → roatán (verdes / maduras / madurando + cuándo salen) → macho (igual) → resumen de la bodega con el total.
    - Vehículos, Personal, Clientes y Proveedores: cada uno con su mini asistente (el MISMO alta que se usa después en la app: vehículo por pasos del 66, cliente nuevo del 72 con ubicación del 64) y al final "¿Agregar otro?" o "Seguir".
    - Dinero y precios: caja inicial → precio del día → mayoreo del día (mayor al costo, punto 81).
    - Listo: resumen por apartado con "Corregir" en cada uno.
    - Si se cierra a medias, sigue donde se quedó. Lo opcional se puede "Llenar después" y queda en "Datos que faltan".
    - Prueba automática de toda la primera vez con datos reales (incluye 1,900 kg de macho del 74).
88. (12 nov) IMPORTAR CLIENTES (Ricardo tardó mucho poniendo ubicaciones a mano en las pruebas). En Clientes (admin) y en la primera vez (paso Clientes): "📥 Importar clientes" desde un archivo de Excel o CSV (Descargas, WhatsApp, Drive).
    - Botón "Bajar la plantilla" (Excel con columnas: nombre, apodo, teléfono, ubicación [link de Google Maps o coordenadas], dirección/referencia, horario, días de visita, chofer, crédito inicial, taras que debe).
    - Vista previa antes de guardar: cuántos entran, cuáles tienen error (en palabras claras) y cuáles ya existen (mismo nombre o teléfono → "Saltar" o "Actualizar"); ¿Seguro? al final.
    - La ubicación se lee con el mismo lector del punto 64 (links cortos, coordenadas). Lo que falte queda en "Datos que faltan".
    - Lo mismo para proveedores. Queda en el historial quién importó y cuándo.
    - Para pruebas: Claude arma un archivo de ejemplo con clientes de prueba y ubicaciones reales de la ciudad que diga Ricardo.

### HECHO (12 nov) · versión 7.6 · capas l71 a l76 (puntos 63 al 88, TAGs y facturas)
- l71 · 74/82 el macho en 0: la revisión de números de la 7.5 leía "1,900" (con coma de miles) como vacío y lo ponía en 0, con el aviso falso. Ahora lee igual que el resto de la app y no revisa mientras se llena la primera vez. (Reproducido: con la 7.5 quedaba en 0; con la 7.6 se queda en 1,900.)
- l71 · 65 fruta madura: se descuenta sola con las ventas; solo el lote pasado de días pide decidir y avisa; "Salió a la venta" quita el lote viejo sin cambiar el inventario. · 77 Bodega: "Hay N cajas, de las cuales: verdes / en maduración / maduras" (el total ya suma lo que madura). · 75 meter a madurar: "¿En cuántas horas los sacas?" con día y hora de salida. · 76 "Usar desde hoy" ya usado: "✓ Precio en uso" con "Cambiar". · 85 mayoreo del día: no más alto que el precio ni abajo del costo; se quitó el $220 de la demo.
- l71 · 63/64 ubicaciones: el buscador enseña lo que dice Google (llave sin Places, API apagada, huella del APK); sin "como en Uber"; un solo cuadro para link o coordenadas; si el link no trae el punto, busca el lugar por su nombre; en cualquier campo viejo, el link corto se abre y se cambia por coordenadas.
- l72 · 68 sin pedidos ni historial ya no inventa cuánto cargar (eran 26 cajas y 80 kg de la demo). · 72 cliente nuevo del chofer: un solo alta por pasos (nombre, apodo, teléfono o "no quiso dar", ubicación obligatoria, referencia, horario, días, foto) y luego la entrega normal, sin volver a pedir nada. · 73 sin "cuántas vienen rotas". · 78 taras prestadas: aviso al guardar la entrega con "Ya le pedí las vacías"; buró de taras con los días del buró (7/15/30): aviso al chofer, al administrador y descuento del sueldo del chofer (una vez por deuda, precio en Ajustes → Buró de taras). · 79 "Más opciones" se cierra con cada cliente. · 80 pedido de un cliente: + y − en cajas, en su tarjeta. · 83 cierre: si falta una foto, lleva al paso donde va. · 84 "Cliente nuevo" y "Venta rápida" arriba, grandes.
- l73 · 67 huella: ya no se ofrece en la pantalla del PIN (ni queda trabada al volver a abrir); se ofrece dentro de la app; "Ahora no" la vuelve a sugerir en 3 días (dos veces como mucho); siempre en Ajustes. · 69 cámara propia de la app: siempre la trasera, con "Voltear" y "Galería" (la de Samsung abría la frontal). · 70 las fotos llevan fecha y quién la tomó (las del vehículo, también la placa).
- l74 · 66 aceite: "¿qué marcaba el tablero?" o "¿hace cuántos km?" y cada cuánto se cambia; al editar pregunta si parece al revés; y en Vehículos sale una tarjeta para corregir el dato que ya estaba mal ("Fue hace 3,600 km"). · 71 revisión de la semana paso a paso, un punto por pantalla. · 81 "Datos que faltan" de un cliente: por pasos y solo lo que falta; ficha: "¿Mayoreo? Sí/No" y "Precio especial" solo para su próxima compra (gana sobre el mayoreo y se quita solo). Los precios pactados que ya había se volvieron "de una vez". · 86 desgaste: el viaje de carga lo suma solo; el desglose dice "Desgaste al ir por la fruta" y "Repartirla: desgaste de la camioneta (estimado)" mientras no hay rutas (km, cajas y kilos de una ruta normal en Ajustes).
- l75 · 87 primera vez: Bienvenida, Bodega y Dinero una tarjeta por pantalla (con resumen de la bodega y el mayoreo del día); vehículos, personal, clientes y proveedores con su alta por pasos; "Listo" con "Corregir" por apartado. · 88 importar clientes y proveedores de Excel (.xlsx) o CSV: plantilla, vista previa, repetidos (saltar o actualizar) y errores en palabras claras; en la primera vez y en Clientes/Proveedores.
- l76 · TAGs: por vehículo (cualquier proveedor, camioneta o camión): saldo, recarga (sale de la caja pero no es gasto), cada cruce es gasto del viaje de ese día (no vuelve a salir de la caja), importar cruces del estado de cuenta (salta repetidos), aviso de saldo bajo. · Facturas (CFDI 4.0) APAGADAS: datos fiscales del negocio y de cada cliente, borrador de factura por venta (IVA tasa 0%) y factura global del mes; se timbran al conectar un PAC.
- Reglas: s~fac76 solo lo cambia el administrador (prueba agregada en pruebas-reglas; no se pudo correr aquí: falta el emulador). PENDIENTE DEL USUARIO (opcional): pegar firestore.rules en la consola y Publicar.
- datos-prueba/clientes-prueba-tijuana.csv: 40 clientes con ubicaciones de colonias de Tijuana, repartidos de lunes a sábado.
- Pruebas: nuevas t71 (18), t72 (20), t73 (12), t74 (21), t75 (21), t76 (15). Se ajustaron t69, t70 y tk a lo nuevo. Todas: 22 archivos, 0 FAIL.
- IA de verdad: sigue pendiente para más adelante (Functions + Haiku para lo diario, Opus para preguntas y resumen).

### Lista de prueba 7.6 (por pantalla, para recorrer la app una sola vez)
1. Primera vez (desde cero): una tarjeta por pantalla en Bienvenida y Bodega; en Bodega pon 1,900 kg de macho verde y revisa el resumen. Vehículos: "Agregar un vehículo" por pasos; en el aceite escoge "Sé hace cuántos kilómetros fue" (87, 66, 74).
2. Primera vez → Clientes → "📥 Importar clientes de un Excel" → escoge clientes-prueba-tijuana.csv (está en el repositorio, fuente/datos-prueba) → revisa la vista previa → Importar (88).
3. Primera vez → Dinero: pide el mayoreo del día; si lo pones más alto que el precio no deja seguir. En "Listo" están los botones "Corregir" (85, 87).
4. Inicio: no sale "Faltaba un número…". Precio de hoy → confirmar: si el mayoreo está mal, pide arreglarlo (82, 85).
5. Bodega: "Hay N cajas…, de las cuales: verdes / en maduración / maduras"; la fruta madura fresca ya no pide nada (77, 65).
6. Registrar carga de macho → meter a madurar → pregunta en cuántas horas y dice el día y la hora. En el precio, "Usar desde hoy" ya no vuelve a salir (75, 76). El desglose trae "Desgaste al ir por la fruta" y "Repartirla" (86).
7. Ubicaciones (bodega, clientes, proveedores): "Buscar el lugar" (si falla, dice qué revisar); pega un link de Google Maps o las coordenadas (63, 64).
8. Vehículos: si un vehículo tiene el aceite al revés, sale "¿Está bien el aceite?" → "Fue hace … km". Ficha → 🛣️ TAG: agregar, recargar, cruce, importar cruces (66, TAGs).
9. Clientes: "Datos que faltan" → por pasos. Ficha → Datos → Editar: "¿Mayoreo? Sí/No" y "Precio especial" de una vez (81).
10. Ajustes: 🧾 Facturación (apagada), 🧺 Buró de taras, 🚚 Costo de repartir, Huella.
11. Chofer (Z Fold): al entrar ya no ofrece la huella en el PIN; adentro sí, con "Ahora no" (67). Iniciar el día: sin pedidos no dice cuánto cargar (68). La revisión del lunes es paso a paso (71). Las fotos abren la cámara de atrás y llevan fecha y tu nombre (69, 70).
12. Ruta: botones grandes "Cliente nuevo" y "Venta rápida" arriba (84). Cliente nuevo → todo por pasos → entrega sin volver a pedir datos (72). Deja taras sin recibir vacías → aviso y "Ya le pedí las vacías" (78). Sin "cajas rotas" (73). "Más opciones" se cierra al cambiar de cliente (79). "+ Pedido de un cliente": + y − en cajas (80).
13. Cierre: intenta enviar sin la foto de lo que regresas → te lleva a esa foto (83).

## 2026-11-12 · LISTA NUEVA (otra vez desde 1) — puntos 63–88 cerrados en la 7.6
Ricardo: los puntos anteriores se dan por corregidos; se empieza de cero. Primero van los que Claude no pudo probar en un celular de verdad o que dejan alguna duda:
1. Buscador de lugares (Places): solo se probó con respuestas simuladas. Revisar en el celular que salgan lugares, y si falla, qué mensaje da.
2. Links de Google Maps (cortos maps.app.goo.gl y "Compartir" de un lugar): la parte nativa que abre el link no se probó con links reales. Si el link no trae el punto, la app busca el nombre del lugar (depende del punto 1).
3. Cámara propia: se probó en una computadora con cámara simulada, no en el Z Fold. Revisar: que pida permiso de cámara, que abra la trasera, "Voltear", "Galería" y que la foto llegue con fecha y nombre.
4. Huella: la ventana nativa de la huella no se puede probar aquí. Revisar: que ya no salga en el PIN, que se ofrezca adentro, "Ahora no", y activarla desde Ajustes.
5. Importar de Excel: se probó con CSV. El .xlsx (Excel de verdad) no se probó con un archivo real, y en Android el selector puede no dejar escoger el CSV. Probar los dos y "Bajar la plantilla".
6. Nube: lo nuevo (TAG del vehículo, datos fiscales, precio especial, buró de taras) no se probó con dos celulares a la vez. Revisar que lo que haga el admin se vea en el otro celular y que el descuento de taras no salga dos veces.
7. TAG: un cruce solo se suma como gasto si ese día hubo viaje de carga con ese vehículo. Los cruces de días de reparto o sin viaje quedan solo en el TAG (no cuentan como gasto en ningún lado). Duda: ¿a dónde deben ir?
8. Costo de repartir estimado: usa 40 km, 40 cajas y 150 kg por ruta mientras no haya rutas cerradas. Revisar si esos números se parecen a la realidad (Ajustes → Costo de repartir).
9. Precios pactados que ya existían: se volvieron "de una sola vez" sin preguntar. Revisar que nadie quedara con un precio que no se quería.
10. Primera vez: si se cierra la app a medias, debe seguir donde se quedó. No se probó cerrando la app de verdad.
11. Cliente nuevo del chofer: la ubicación es obligatoria. Si no hay señal de GPS, puede buscar el lugar o pegar el link; revisar que nunca se quede atorado.
12. Revisión del vehículo: el botón "Todo lo demás bien" ayuda a ir rápido, pero un chofer podría saltarse la revisión. Duda: ¿se deja o se quita?
13. Reglas de Firebase (facturas solo el administrador): opcional; la prueba no se pudo correr aquí. Falta pegarlas en la consola y Publicar.
14. Los 40 clientes de prueba de Tijuana tienen puntos dentro de colonias reales, pero algunos pueden caer fuera de la calle.
### Prueba del 1.0.25 (12 nov) — SOLO ANOTAR (pidió no hacer cambios todavía)
- Ya funcionan en el celular: 1 buscador de lugares, 2 links de Google Maps, 3 cámara, 4 huella. Falta probar: 5 Excel, 6 nube, 10 primera vez, 11 cliente sin señal (y 8, 9, 13, 14).
- 12 DECIDIDO: se queda "Todo lo demás bien" (es responsabilidad del chofer leer). A cambio → punto 17.
15. Ubicación que no se cierra: aunque ya se abrió el link de Google, sigue pidiendo confirmar por GPS; "Estoy aquí" → espera → "Guardar" → vuelve a salir el mismo apartado con "Estoy aquí", sin fin.
    Revisado en el código, hay dos lugares que se portan así:
    (a) en la ENTREGA del chofer, la tarjeta "📍 Ubicación de … · Confirmar la ubicación aquí" (l70) sale SIEMPRE, aunque el cliente ya tenga ubicación y aunque se acabe de confirmar;
    (b) en el alta por pasos (cliente nuevo), el paso "¿Dónde está?" se queda en pantalla después de guardar, con "✓ Ubicación guardada" y otra vez los botones "Estoy aquí", hasta que se toca "Siguiente".
    Propuesta: (a) la tarjeta solo sale si el cliente no tiene ubicación o si la que tiene es aproximada (de link, búsqueda o Excel, sin confirmar en el lugar); una vez confirmada por GPS ya no sale (queda "Corregir la ubicación" dentro de "Más opciones"). (b) al guardar la ubicación pasa solo al siguiente paso.
    Pregunta a Ricardo: ¿en cuál de las dos lo viste (o en las dos)?
16. TAG · la primera recarga y los cruces sin viaje de carga. Propuesta (esperando OK):
    - Recargar el TAG NUNCA es gasto: es dinero que se pasa de la caja (o del banco) al TAG, como un monedero. La caja baja, el saldo del TAG sube, las ganancias no cambian. El saldo que ya traía el TAG al darlo de alta tampoco es gasto (ya se pagó antes).
    - El gasto es cada CRUCE: si ese día hubo viaje de carga con ese vehículo → gasto de ese viaje (ya así está); si no hubo viaje (reparto u otro) → gasto general del vehículo en Gastos, categoría "Casetas (TAG)", sin volver a sacar dinero de la caja (ya salió en la recarga).
    - Así el gasto del mes es lo que de verdad se cruzó, y la recarga solo mueve dinero.
17. Historial de revisiones del vehículo (porque se queda "Todo lo demás bien"): en la ficha del vehículo, cada revisión con chofer, fecha, hora, cuánto tardó, cuántos puntos revisó uno por uno, si usó "Todo lo demás bien" y las fallas. Opcional: avisar al administrador si un chofer lo usa siempre o tarda muy poco.
