# Manual del chofer de ruta, con capturas reales de la app (versión demo con datos de ejemplo).
# Uso (desde fuente/): 1) node pruebas/capturas-chofer.js   2) python3 ayuda/hacer-manual-chofer.py
# Deja fuente/ayuda/manual-chofer.pdf. Usa los mismos estilos y marcos de celular que hacer-manual.py.
import os
_aqui = os.path.dirname(os.path.abspath(__file__))
exec(open(os.path.join(_aqui, 'hacer-manual.py'), encoding='utf-8').read().split('# ================= GUÍA RÁPIDA')[0])
from reportlab.platypus import Image as RLImage

S_ = []
# ---------- portada ----------
S_ += [Spacer(1, 1.2 * cm), P('Manual del chofer de ruta', 'portada'), Spacer(1, 6),
       P('Plátanos Nietos · Ruta Fácil', 'sub'), Spacer(1, 4),
       P('Todo tu día de trabajo en la app, paso por paso: salir, entregar, cobrar, imprimir el ticket y hacer tu cierre.', 'sub'), Spacer(1, 18),
       Table([[Cel('ch-ruta', 5.2 * cm), Cel('ch-entrega', 5.2 * cm), Cel('ch-nota', 5.2 * cm)]], colWidths=[5.9 * cm] * 3),
       Spacer(1, 14),
       cuadro(['<b>Lo más importante:</b> la app te va diciendo qué sigue. Lee la pantalla, llena lo que te pide y toca el botón verde grande. '
               'Si algo no te deja seguir, la app te dice qué falta.']),
       PageBreak()]

# ---------- índice ----------
ind = ['1. Antes de empezar', '2. Iniciar el día: tu equipo', '3. Iniciar el día: los 7 pasos', '4. Tu ruta de hoy',
       '5. La entrega: qué le dejas', '6. El cobro, la deuda y las cajas vacías', '7. La nota y el ticket', '8. Cliente nuevo y venta rápida',
       '9. Cuando no se pudo entregar', '10. Gastos de la ruta y viajes de carga', '11. La impresora de tickets',
       '12. Incidentes y reportar un problema', '13. El cierre del día', '14. Sin señal', '15. Preguntas frecuentes', '16. Reglas de oro']
S_ += [P('Contenido', 'h1'), Spacer(1, 6)] + [P(x, 'ind') for x in ind] + [PageBreak()]

# ---------- 1 ----------
S_ += [P('1. Antes de empezar', 'h1'),
       P('<b>Tu celular.</b> Usa el celular del negocio con la app <b>Ruta Fácil</b>. Tráelo cargado y con datos. La app funciona aunque se vaya la señal (ver la sección 14).'),
       P('<b>Tu PIN.</b> Al abrir la app escoges tu nombre y escribes tu PIN de 4 números. El PIN es solo tuyo: no se lo des a nadie. '
         'Si se te olvida, pídele al administrador que te ponga uno nuevo.'),
       P('<b>¿No eres tú?</b> Si el celular tiene abierto el nombre de otro compañero, toca <b>"¿No eres …?"</b> abajo del botón y entra con tu nombre.'),
       P('<b>Tu ubicación.</b> Mientras trabajas, el administrador ve en el mapa dónde vas. Así puede ayudarte si pasa algo y saber a qué hora llegas.'),
       Spacer(1, 6),
       cuadro(['<b>Palabras de la app</b>',
               '<b>Caja</b> = caja llena de plátano roatán.  <b>Kilos</b> = plátano macho.',
               '<b>Vacía</b> (o tara) = caja vacía que el cliente te regresa. Se cuentan igual que el dinero.',
               '<b>Crédito</b> = lo que el cliente debe.  <b>Abono</b> = lo que paga de su deuda.',
               '<b>Nota</b> = el ticket de la entrega que le mandas al cliente.']),
       Spacer(1, 8),
       P('<b>Las pestañas de abajo</b>', 'h2'),
       P('<b>Ruta</b>: tus clientes de hoy en orden.  <b>Entrega</b>: el cliente que estás atendiendo.  '
         '<b>Gasto</b>: gasolina, ponchadura, estacionamiento.  <b>Viaje</b>: si te mandan por carga.  <b>Cierre</b>: al regresar a la bodega.'),
       PageBreak()]

# ---------- 2 ----------
S_ += [dos('2. Iniciar el día: tu equipo', ['ch-bienv', 'ch-equipo'], pasos([
    'En la pantalla de bienvenida ves cuántos clientes tienes hoy y el vehículo que te asignaron. Toca <b>"Iniciar ruta"</b>.',
    'Antes de salir, la app te pregunta <b>cómo recibes tu equipo</b>: el celular, la impresora y las llaves.',
    'Toca <b>"Buen estado"</b> en cada uno. Si algo viene mal, toca <b>"Mal estado"</b>, escribe qué tiene y tómale foto: así no se te culpa a ti.',
    'Toca <b>"Listo, ya lo revisé"</b>.']), alto=10.2 * cm),
    Spacer(1, 6), cuadro(['Al regresar también entregas tu equipo. Si algo se descompone en el camino, avísalo en ese momento con <b>"Reportar incidente"</b> (sección 12).'], AMBAR, colors.HexColor('#D97706')),
    PageBreak()]

# ---------- 3 ----------
S_ += [dos('3. Iniciar el día: los 7 pasos', ['ch-sal-veh', 'ch-sal-insp'], pasos([
    '<b>Vehículo.</b> Confirma con cuál sales. Si hoy usas otro, toca <b>"Usar otro vehículo"</b>.',
    '<b>Inspección.</b> Toca <b>"Empezar la revisión"</b>: la app te pasa los puntos uno por uno (llantas, luces, aceite, documentos…). '
    'Si algo está mal, dilo ahí: el administrador te dice si puedes salir.']), alto=9.6 * cm),
    dos(None, ['ch-sal-fotos', 'ch-sal-odo'], pasos([
        '<b>Fotos.</b> Frente, atrás y los dos lados del vehículo, con la cámara.',
        '<b>Odómetro.</b> Escribe lo que marca el tablero y tómale foto. Si coincide con lo último que se registró, toca <b>"Sí, marca …"</b>.']), alto=7.0 * cm),
    PageBreak(),
    dos('3. Iniciar el día (sigue)', ['ch-sal-carga', 'ch-sal-revisar'], pasos([
        '<b>Gasolina.</b> Mueve la aguja a lo que marca el tablero y toma la foto si te la pide.',
        '<b>Carga.</b> Pon las cajas de roatán y los kilos de macho que <b>de verdad</b> llevas. La app te sugiere cuánto según tus clientes; '
        'puedes tocar <b>"Usar lo sugerido"</b>.',
        '<b>Revisar.</b> Revisa el resumen y toca el botón para salir. Desde aquí empieza tu ruta.']), alto=9.6 * cm),
    Spacer(1, 6), cuadro(['Lo que cargas tiene que ser lo que de verdad lleva el camión: al final del día la app compara lo que salió, lo que entregaste y lo que regresa.']),
    PageBreak()]

# ---------- 4 ----------
S_ += [P('4. Tu ruta de hoy', 'h1'),
       lado('ch-ruta', pasos([
           'Arriba ves lo que <b>te queda en el camión</b> (cajas y kilos) y lo que llevas cobrado hoy.',
           '<b>"Ordenar con tráfico"</b>: Google acomoda tus clientes en el mejor orden y te dice a qué hora llegas a cada uno.',
           '<b>Siguiente parada</b>: el cliente que toca. <b>"Ir"</b> abre Google Maps; al llegar toca <b>"Entregar"</b>.',
           'Si un cliente <b>cierra antes</b> de que llegues, la app te avisa en rojo.',
           '<b>"Modo manejo"</b>: pantalla grande y sencilla mientras vas manejando.',
           '<b>"+ Pedido de un cliente"</b>: si un cliente te pide algo para otro día, anótalo aquí.',
           'Los botones grandes de arriba: <b>Cliente nuevo</b> y <b>Venta rápida</b> (sección 8).']) + [Spacer(1, 6),
           cuadro(['No manejes viendo el celular. Primero estaciónate y luego captura.'], AMBAR, colors.HexColor('#D97706'), ancho=10.4 * cm)],
           ancho_img=6.0 * cm, alto_max=13 * cm),
       PageBreak()]

# ---------- 5 ----------
S_ += [dos('5. La entrega: qué le dejas', ['ch-entrega', 'ch-mas'], pasos([
    'Arriba dice en qué parada vas y lo que te queda en el camión.',
    'Pon las <b>cajas de roatán</b> y los <b>kilos de macho</b> con <b>−</b> y <b>+</b> (o escribe el número). Abajo sale el precio de hoy.',
    'En la barra verde de abajo ves <b>cuánto le vas a cobrar</b> y cuánto quedaría debiendo.',
    '<b>"Más opciones"</b>: <b>Mayoreo a mano</b> (si el administrador lo permite), cambio por fruta en mal estado y cuándo regresar.',
    'Toca <b>"Siguiente"</b>.']), alto=9.6 * cm),
    PageBreak()]

# ---------- 6 ----------
S_ += [dos('6. El cobro, la deuda y las cajas vacías', ['ch-cobro'], pasos([
    'La app te avisa si el cliente <b>debe de antes</b> y desde cuándo: cóbrale también su deuda (abono).',
    'Si el cliente ya pasó su límite, sale <b>"No se le puede fiar: solo de contado"</b>. Si de todos modos quiere crédito, toca '
    '<b>"Pedir permiso para fiarle"</b> y espera la respuesta del administrador.',
    'Pon <b>cuánto te paga</b> en efectivo. Si paga todo, queda al corriente.',
    'Pídele las <b>cajas vacías</b> que debe y pon cuántas te regresó. Si no te dio, toca <b>"Ya le pedí, no tenía"</b>: queda anotado.',
    'Toca <b>"Siguiente"</b> y luego <b>"Revisar y guardar"</b>. Revisa bien antes de guardar.']), alto=11.5 * cm),
    Spacer(1, 6),
    cuadro(['<b>El dinero y las vacías se cuentan igual.</b> Lo que pongas aquí es lo que tienes que entregar en tu cierre. '
            'Nunca pongas que te pagó si no te pagó.']),
    PageBreak()]

# ---------- 7 ----------
S_ += [P('7. La nota y el ticket', 'h1'),
       lado('ch-nota', pasos([
           'Al guardar sale la <b>Nota de remisión</b>. Escribe <b>quién recibió</b>.',
           'Toca <b>"Mandar por WhatsApp"</b>: se abre WhatsApp con el ticket para el cliente. Si no tiene el número guardado, la app te lo pide (10 números).',
           'Si el cliente no tiene WhatsApp, toca <b>"El cliente no tiene WhatsApp"</b>: si hay impresora se le imprime el ticket; si no, se le avisa al administrador.',
           'Si tienes <b>impresora</b> conectada, el ticket también sale impreso (sección 11).',
           'Toca <b>"Seguir con la ruta"</b> para pasar al siguiente cliente.']) + [Spacer(1, 6),
           cuadro(['Si el cliente se queda con deuda, <b>siempre</b> tiene que llevarse su ticket (por WhatsApp o impreso). La app no te deja seguir sin eso.'], AMBAR, colors.HexColor('#D97706'), ancho=10.4 * cm)],
           ancho_img=6.0 * cm, alto_max=13 * cm),
       PageBreak()]

# ---------- 8 ----------
S_ += [dos('8. Cliente nuevo y venta rápida', ['ch-nuevo', 'ch-rapida'], pasos([
    '<b>Cliente nuevo</b> (botón verde en Ruta): un negocio que te quiere comprar y no está dado de alta. La app te pregunta una cosa por pantalla: '
    'nombre, teléfono, dónde está, foto del negocio… y luego le vendes.',
    '<b>Venta rápida</b> (botón naranja): alguien en la calle que te compra y no necesita registrarse. Se cobra <b>todo en el momento</b>: no se fía.',
    'Las dos siguen los mismos pasos de la entrega: qué le dejas, cobro y nota.']), alto=9.8 * cm),
    PageBreak()]

# ---------- 9 ----------
S_ += [P('9. Cuando no se pudo entregar', 'h1'),
       *pasos(['En la entrega toca <b>"No estaba / no se pudo entregar"</b> (o en <b>"Más opciones"</b> → <b>"No se pudo entregar"</b>).',
              'Escoge qué pasó: <b>cerrado</b>, <b>tenía producto</b>, <b>sin dinero</b>… La app lo anota y pasa al siguiente.',
              'Si quedaron clientes sin visitar, al hacer el cierre se pasan a la ruta de mañana.']),
       Spacer(1, 8), P('"Pasa a cobrarle a …"', 'h2'),
       P('A veces el administrador te manda un aviso <b>"Pasa a cobrarle a …"</b>: es un cliente que debe y está en tu camino. '
         'Pasa, cóbrale y regístralo como abono. Si no te pagó, ponlo igual: queda anotado que fuiste.'),
       Spacer(1, 8), P('Cargar más', 'h2'),
       P('Si se te acaba el producto y todavía te quedan clientes, en Ruta sale <b>"Pedir permiso: cargar más"</b>. Pídelo y espera la respuesta antes de regresar a la bodega.'),
       PageBreak()]

# ---------- 10 ----------
S_ += [dos('10. Gastos de la ruta y viajes de carga', ['ch-gasto', 'ch-viaje'], pasos([
    '<b>Gasto</b> (pestaña de abajo): combustible, ponchadura o reparación, estacionamiento u otro.',
    'Escribe el <b>monto</b> y toma la <b>foto del ticket</b> (es obligatoria). Guarda el ticket de papel y entrégalo en la bodega al cerrar.',
    'Se paga con el efectivo de la ruta y se descuenta de lo que entregas. La comida solo cuenta si el administrador te la autorizó.',
    '<b>Viaje</b>: si el administrador te manda por una carga, aquí te sale el viaje con su ruta. Si no tienes ninguno, dice "No tienes viajes de carga asignados".']), alto=9.6 * cm),
    PageBreak()]

# ---------- 11 ----------
S_ += [dos('11. La impresora de tickets', ['ch-impr-nueva', 'ch-impr'], pasos([
    'Prende la impresora. En el <b>Bluetooth del celular</b> emparéjala (la clave casi siempre es <b>0000</b> o <b>1234</b>).',
    'En la app: menú <b>☰</b> → <b>Ajustes</b> → tarjeta <b>"Impresora de tickets"</b>. Toca <b>"Buscar impresoras"</b> y escoge la tuya.',
    'Cuando sale <b>"✓ (nombre de la impresora)"</b> ya quedó. Toca <b>"Imprimir prueba"</b> para ver que sale bien.',
    '<b>Papel</b>: 58 mm (la chica) u 80 mm (la grande).',
    '<b>"Imprimir después de cada entrega"</b> en <b>Sí</b>: al guardar cada entrega sale el ticket solo. Si luego lo mandas por WhatsApp no se imprime otra vez.',
    'Para sacar otra copia, en la nota toca <b>"Imprimir ticket"</b>.']), alto=7.6 * cm),
    Spacer(1, 6),
    cuadro(['La impresora se conecta en <b>cada celular</b>. Si cambias de celular, hay que buscarla otra vez. '
            'Si no imprime: revisa que esté prendida, con papel y con batería, y toca "Imprimir prueba".'], AMBAR, colors.HexColor('#D97706')),
    PageBreak()]

# ---------- 12 ----------
S_ += [dos('12. Incidentes y reportar un problema', ['ch-incidente', 'r-sacudir'], pasos([
    '<b>Incidente</b> (ponchadura, choque, falla mecánica, robo): en Ruta toca <b>"Reportar incidente"</b>, escoge qué pasó, escribe y toma foto. '
    'Tu ubicación se manda sola y el administrador recibe el aviso al momento.',
    '<b>Si la app falla</b> (un botón no hace nada, un número sale mal): <b>sacude el celular</b> con fuerza unas 4 veces. Sale la pantalla para reportar: '
    'marca dónde está el error, escribe qué pasó y mándalo. Le llega al que arregla la app.']), alto=9.6 * cm),
    Spacer(1, 6), cuadro(['En un robo o choque, primero tu seguridad. El reporte lo haces cuando ya estés bien.'], AMBAR, colors.HexColor('#D97706')),
    PageBreak()]

# ---------- 13 ----------
S_ += [dos('13. El cierre del día', ['ch-cierre1', 'ch-cierre4'], pasos([
    'Al regresar a la bodega toca la pestaña <b>Cierre</b>. Son 6 pasos.',
    '<b>Odómetro</b>: lo que marca el tablero y su foto. La app te dice más o menos cuánto debería marcar.',
    '<b>Gasolina</b>: la aguja del tanque. <b>Fotos</b>: lo que te pide.',
    '<b>Cajas</b>: cuántas salieron, cuántas entregaste, cuántas llenas regresan y cuántas vacías recibiste. Si quedaron clientes sin visitar, se pasan a mañana.']), alto=9.6 * cm),
    PageBreak(),
    dos('13. El cierre del día (sigue)', ['ch-cierre5', 'ch-cierre6'], pasos([
        '<b>Efectivo</b>: la app te dice cuánto <b>debes entregar</b> (lo que vendiste y cobraste, menos tus gastos). Escribe cuánto entregas. '
        'Puedes contar por billetes con <b>"Contar por billetes"</b> y la app suma. Si sale <b>"✓ Cuadra"</b>, todo bien.',
        'Si usas bolsa, escribe el número de bolsa.',
        '<b>Enviar</b>: revisa el resumen y manda el cierre. El administrador lo recibe y lo revisa contigo.',
        'Entrega el efectivo, los tickets de gastos y tu equipo.']), alto=9.6 * cm),
    Spacer(1, 6),
    cuadro(['Si no cuadra, <b>no lo escondas</b>: escribe lo que de verdad entregas y explica qué pasó. Es más fácil arreglarlo el mismo día.']),
    PageBreak()]

# ---------- 14 ----------
S_ += [P('14. Sin señal', 'h1'),
       P('Si se va la señal, <b>la app sigue funcionando</b>. Sale un aviso de "Sin señal": sigue entregando y cobrando normal. '
         'Todo se guarda en el celular y se sube solo cuando regresa la señal ("Volvió la señal").'),
       *pasos(['No cierres la app ni borres los datos del celular mientras no haya señal.',
              'El WhatsApp de la nota puede esperar: mándalo cuando tengas señal, o imprime el ticket.',
              'Si pasas mucho tiempo sin señal, al llegar a la bodega abre la app con wifi antes de hacer el cierre.']),
       Spacer(1, 10),
       P('15. Preguntas frecuentes', 'h1')]
faq = [('Me equivoqué en una entrega que ya guardé.', 'No la vuelvas a capturar. Avísale al administrador: él la corrige. Nunca se borra nada, se corrige.'),
       ('El cliente quiere más de lo que traigo.', 'Dale lo que tengas y anota el resto con "+ Pedido de un cliente". Si te quedan clientes, pide permiso para cargar más.'),
       ('El cliente quiere precio de mayoreo.', 'En "Más opciones" → "Mayoreo a mano". Si no te deja, es porque necesita permiso del administrador.'),
       ('El cliente no tiene para pagar.', 'Si tiene crédito, se le fía y se lleva su ticket. Si ya pasó su límite, pide permiso para fiarle o regístralo como "Sin dinero".'),
       ('El cliente regresó plátano feo.', 'En "Más opciones" → "Cambio por fruta en mal estado".'),
       ('No me aparece un cliente en la ruta.', 'Búscalo o pídele al administrador que te lo pase a tu ruta. Si es nuevo, usa "Cliente nuevo".'),
       ('Se me descargó el celular.', 'Cárgalo y vuelve a entrar con tu PIN: lo que capturaste sigue ahí.'),
       ('No me deja seguir.', 'Lee el aviso en rojo: te dice qué falta (una foto, un número, el ticket del cliente).')]
for q, a in faq:
    S_ += [P('<b>' + q + '</b>', 'p'), P(a, 'p'), Spacer(1, 3)]
S_ += [PageBreak(), P('16. Reglas de oro', 'h1'), Spacer(1, 4),
       cuadro(['<b>1.</b> Captura cada entrega <b>en el momento</b>, con el cliente enfrente.',
               '<b>2.</b> Lo que pones en la app es lo que entregas en tu cierre: dinero, cajas y vacías.',
               '<b>3.</b> Todo cliente que queda debiendo se lleva su ticket.',
               '<b>4.</b> Fotos y tickets de cada gasto. Sin foto no cuenta.',
               '<b>5.</b> Tu PIN es tuyo: no lo prestes.',
               '<b>6.</b> Si algo pasa en el camino, avísalo en ese momento con "Reportar incidente".',
               '<b>7.</b> Si la app falla, sacude el celular y repórtalo.',
               '<b>8.</b> Primero tu seguridad. No captures manejando.']),
       Spacer(1, 16), P('¿Dudas? Pregúntale al administrador. La app también tiene ayuda en el botón <b>?</b> de arriba.', 'p')]

d = doc('manual-chofer.pdf', 'Manual del chofer de ruta', 'Ruta Fácil · Manual del chofer de ruta')
d.build(S_)
print('listo manual-chofer.pdf')
