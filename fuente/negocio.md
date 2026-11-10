# El negocio (contexto para quien trabaje en la app)

Respaldo de lo que Ricardo ha contado del negocio, para que cualquier conversación nueva lo sepa. Si algo choca con `pendientes.md`, vale lo más reciente de `pendientes.md`.

## Quiénes
- **Dueño:** Ricardo (papá). Es una persona mayor, usa lentes y le cuesta la tecnología, pero usa bien WhatsApp, las llamadas y las fotos. Todavía carga y maneja. La meta es que pueda apartarse del negocio sin abandonarlo, que lo maneje desde el celular y que se pueda tomar ~10 días de vacaciones.
- **Hijo:** Ricardo (hijo). Programa la app y vive en Tijuana. Ayuda sin cobrar y también repartirá con su propia ruta.
- Los dos son administradores, cada uno con su propia cuenta y la misma información. Los dos hacen de todo; no se reparten tareas.
- Solo ellos dos compran, fijan precios, cobran, cuadran la caja y resuelven problemas. El chofer les pregunta antes de fiar.
- **Choferes:** salen 1 o 2 al día, el primero a las 8:00. Se trabaja también en domingo. No todo el personal son choferes; también hay empleados.
- **Encargado (planeado):** un chofer de confianza que confirma el efectivo de los choferes y hace el cierre del día cuando no está el dueño.
- **Contacto del negocio:** el WhatsApp Business del papá, que es quien asigna los pedidos. Cada celular de chofer tiene su propio chip.

## Producto
- **Plátano roatán:** el proveedor lo vende **por kilo**; a los clientes se les vende **por caja** (≈20–22 kg). La caja vacía (tara) pesa 2 kg.
  - Ejemplo: 6,800 kg de roatán son ≈340 cajas.
- **Plátano macho:** se compra y se vende **por kilo**.
- **Maduración:** la fruta llega verde y se madura con carburo. Tarda horas, no días, y es distinto para roatán y para macho. Depende del clima: con frío tarda más y con calor menos. Ya maduro dura unos 3 días.
- Lo de segunda que todavía sirve se remata en bodega por kilo; lo que no sirve se tira (merma).

## Clientes y cobro
- Son entre 40 y 100 clientes, repartidos por toda la ciudad.
- Casi todo se cobra en efectivo. Se planea cobrar con tarjeta: al inicio menos de $3,500 al mes, y la comisión la paga el negocio.
- El crédito se da a muy pocos clientes y lo decide el admin o el encargado. Al entregar, el cliente puede dejar a crédito, abonar, o pagar el producto y seguir debiendo lo anterior.
- Cada cliente tiene nombre, apodo, teléfono, dirección y coordenadas GPS (se guardan solas).
- Al entregar se manda una nota de remisión o ticket en imagen por WhatsApp. También se puede imprimir en una impresora térmica.

## Proveedores y viajes de carga
- **Roatán:** "El Rolly" (Roly), en El Pital, Veracruz.
- **Macho:**
  - Josue, en Nautla, Veracruz.
  - "El Lic", en Coacoatzintla.
- **Viaje normal:** Banderilla → El Pital → Nautla → Banderilla, en el camión. A Coacoatzintla se va aparte, normalmente en la NP300.
- Se trata de pagar al proveedor en efectivo todo o casi todo, aunque hay crédito con todos. A quien va por la carga se le da el efectivo.
- Los choferes pueden ir solos por la fruta si el precio y el pago ya están arreglados.
- No hay fletes: va un chofer o el dueño.

## Vehículos
- **Freightliner M2 2015 (camión de carga):** usa diésel y DEF (se guarda en bodega). Pesa unos 4,000 kg con las taras vacías arriba. Placas de Guerrero. Cambio de aceite cada 13,000 km.
- **Dos Nissan NP300 de reparto:** usan gasolina Premium. Placas de Veracruz. Cambio de aceite cada 10,000 km; afinación mayor cada año o cada 60,000 km.
- Cada día el chofer toma el odómetro al salir y al regresar, el nivel del tanque y 4 fotos del vehículo (solo con la cámara, nunca de la galería).
- Cada carga de combustible se registra con litros, precio y total, y se paga con el dinero de la ruta.

## Bodega y gastos
- La bodega es propia y está en Banderilla, Veracruz.
- **Gastos fijos:** luz, teléfono, agua y seguro de los vehículos.
- **Gastos de ruta y de viaje:** combustible, casetas, comida del chofer (solo si se acordó antes), talachas y extras.

## Dinero
- No hay sueldo fijo: el dueño toma de la caja cuando lo necesita.
- El negocio no tiene cuenta de banco propia; todo pasa por las cuentas de los dos Ricardos.
- Están dados de alta en el SAT, pero no facturan.

## Lo que más importa
- Que los números (dinero, cajas y kilos) **siempre cuadren**.
- Que el negocio funcione sin el dueño y que un chofer nuevo pueda hacer la ruta sin que le enseñen cliente por cliente.
- Lo que más le pesa hoy al dueño es ir por la fruta, atender a los proveedores y organizar el abasto.
- Guardar el historial siempre, para comparar por fechas, clima y temporadas.

## Técnico (resumen)
- La app es solo para **Android**: celulares del negocio, nunca personales. Al final del día el chofer entrega en bodega el celular, la terminal, la impresora y el vehículo.
- **Nube:** Firebase, con una cuenta de Gmail del negocio.
- **Google Maps:** la llave está lista. La facturación de Google se configuró el 9 de noviembre de 2026; falta confirmar que ya cargan las calles.
- Ricardo hizo antes una demo web (PWA) en `reptileckz-jpg/platanitos` y `reptileckz-jpg/Primera-vez`. La app actual es este repositorio.
