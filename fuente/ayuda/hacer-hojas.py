# Hojas de ayuda para imprimir (punto 38 · plan del 30 nov): una para el dueño y otra para los choferes.
# Uso: python3 fuente/ayuda/hacer-hojas.py   → deja fuente/ayuda/hoja-duenio.pdf y fuente/ayuda/hoja-chofer.pdf
# Letra grande y palabras sencillas. Si cambia un botón en la app, se cambia aquí y se vuelven a hacer.
import os
from reportlab.lib.pagesizes import letter
from reportlab.lib.units import cm
from reportlab.lib import colors
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, KeepTogether
from reportlab.lib.styles import ParagraphStyle

F = '/usr/share/fonts/truetype/dejavu/'
pdfmetrics.registerFont(TTFont('S', F + 'DejaVuSans.ttf'))
pdfmetrics.registerFont(TTFont('SB', F + 'DejaVuSans-Bold.ttf'))
pdfmetrics.registerFontFamily('S', normal='S', bold='SB', italic='S', boldItalic='SB')
AQUI = os.path.dirname(os.path.abspath(__file__))
VERDE = colors.HexColor('#166534')

tit = ParagraphStyle('t', fontName='SB', fontSize=20, leading=24, textColor=VERDE, spaceAfter=4)
sub = ParagraphStyle('s', fontName='S', fontSize=12.5, leading=16, textColor=colors.HexColor('#444444'), spaceAfter=10)
sec = ParagraphStyle('h', fontName='SB', fontSize=15.5, leading=19, textColor=colors.white)
txt = ParagraphStyle('p', fontName='S', fontSize=12, leading=15.2)
nota = ParagraphStyle('n', fontName='S', fontSize=11.5, leading=15, textColor=colors.HexColor('#444444'))


def bloque(titulo, pasos, color=VERDE):
    filas = [[Paragraph(titulo, sec)]] + [[Paragraph('<b>%d.</b>&nbsp; %s' % (i + 1, p), txt)] for i, p in enumerate(pasos)]
    t = Table(filas, colWidths=[18.2 * cm])
    t.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), color),
        ('BOX', (0, 0), (-1, -1), 1.2, color),
        ('LINEBELOW', (0, 1), (-1, -2), 0.4, colors.HexColor('#DDDDDD')),
        ('LEFTPADDING', (0, 0), (-1, -1), 9), ('RIGHTPADDING', (0, 0), (-1, -1), 9),
        ('TOPPADDING', (0, 0), (-1, -1), 4), ('BOTTOMPADDING', (0, 0), (-1, -1), 5),
    ]))
    return KeepTogether([t, Spacer(1, 6)])


def hoja(nombre, titulo, subtitulo, bloques, pie):
    doc = SimpleDocTemplate(os.path.join(AQUI, nombre), pagesize=letter, leftMargin=1.6 * cm, rightMargin=1.6 * cm, topMargin=1.1 * cm, bottomMargin=1.0 * cm,
                            title=titulo, author='Ruta Fácil')
    h = [Paragraph(titulo, tit), Paragraph(subtitulo, sub)]
    for b in bloques:
        h.append(bloque(*b))
    h.append(Paragraph(pie, nota))
    doc.build(h)


ROJO = colors.HexColor('#B91C1C')
AZUL = colors.HexColor('#1D4ED8')

hoja('hoja-duenio.pdf', 'Ruta Fácil · Hoja del dueño',
     'Ten esta hoja junto al celular. Abajo de la app están las secciones: <b>Inicio · Rutas · Clientes · Bodega · Cargas · Más</b>.',
     [
         ('Cada mañana', [
             'Abre la app. Estás en <b>Inicio</b>.',
             'Pon el <b>Precio de hoy</b>: toca <b>"Usar estos precios hoy"</b> o <b>"Revisar"</b> para cambiarlo.',
             'Mira la tarjeta <b>"Hoy"</b>: son tus pendientes. Toca uno y escoge <b>"Resolver"</b>, <b>"Recordarme mañana"</b> o <b>"Listo"</b>.',
         ]),
         ('Durante el día', [
             'En <b>Inicio</b> ves dónde va cada chofer.',
             'Si un chofer pide permiso (fiar, mayoreo u otro precio), te llega un aviso al celular: contesta <b>Sí</b> o <b>No</b>.',
             'Cuando llega fruta: <b>Cargas</b> y recibe la carga (cajas, kilos y vacías).',
             'Cuando pagues algo o compres algo: <b>Más → Gastos</b>.',
             'Si vas a cobrarle a un cliente fuera de la ruta: en su ficha toca <b>"Voy a cobrarle"</b> y escoge quién va (tú o un chofer). Cuando cobres, en <b>Inicio</b> toca <b>"Ya cobré"</b>; si fuiste solo a eso en tu carro, el negocio te paga la gasolina.',
             'Si un empleado te pide prestado: <b>Más → Personal → Sueldos</b>, en su tarjeta toca <b>"Prestarle dinero"</b>. Escoge si se lo descuentas de su sueldo o si te lo paga en efectivo; sale el recibo para WhatsApp.',
         ]),
         ('En la tarde, cuando regresa cada chofer', [
             'En <b>Inicio</b> sale <b>"ya llegó a la bodega"</b>. Revisa su cierre y <b>recibe el efectivo</b> que te entrega.',
             'Si algo no cuadra, la app te lo dice. No se borra nada: lo que se corrige queda en el historial.',
         ]),
         ('La bodega · las primeras 2 semanas', [
             'Para contar: <b>Bodega → "Contar bodega"</b>. Escribe lo que de verdad hay.',
             'Ve contando seguido: con cada conteo, el número de <b>cajas</b> se va ajustando. En estas 2 semanas esa diferencia es <b>"ajuste de arranque"</b>: no es merma ni se le descuenta a nadie.',
             '<b>Después de las 2 semanas, las diferencias al contar ya cuentan como merma.</b> La app te avisa cuántos días te quedan.',
             'El <b>macho</b> siempre cuenta como merma (al madurar y al moverlo se caen plátanos y baja de peso): así sabes cuánto se pierde de lo que cargaste.',
             'Las deudas de los clientes, sus cajas y el efectivo sí cuentan exacto desde el primer día.',
         ]),
         ('Cada sábado', [
             '<b>Cierre de caja</b>: cuenta TODO el efectivo del negocio, aunque una parte esté en tu casa.',
             'Paga a los choferes: <b>Más → Personal → Sueldos</b>. Al pagar sale el <b>recibo</b> para mandarlo por WhatsApp.',
             'Tu sueldo sale de la caja (es tuyo, no es gasto del negocio). Aparta lo del aguinaldo y las vacaciones.',
             'Si depositaste al banco: en <b>Inicio → "Caja y banco"</b> toca <b>"Pasé dinero de la caja al banco"</b>.',
         ]),
         ('Si algo falla o no entiendes', [
             '<b>Sacude el celular</b> y toca <b>"Sí, reportar"</b>. La app toma una foto de la pantalla.',
             'Escribe qué pasó o toca <b>"Grabar un audio"</b> y cuéntalo. Luego <b>"Mandar"</b> y mándalo por WhatsApp.',
             'También está en el menú (las tres rayitas, arriba): <b>"Reportar un problema"</b>.',
         ], ROJO),
         ('La primera semana', [
             'Anota también en la <b>libreta</b>, como siempre. Cada noche compara la libreta con la app.',
             'Si no coinciden, repórtalo (sacudiendo el celular) para que se revise.',
         ], AZUL),
     ],
     'Nada se borra: si te equivocas, se corrige y queda anotado quién y cuándo. Sin señal la app sigue funcionando y sube todo cuando regresa la señal.')

hoja('hoja-chofer.pdf', 'Ruta Fácil · Hoja del chofer',
     'Ten esta hoja en la camioneta. <b>No uses la app mientras manejas.</b>',
     [
         ('Al empezar el día', [
             'Abre la app y pon tu <b>PIN</b>.',
             'Revisa que sea tu vehículo y toca <b>"Iniciar ruta"</b>. Toma las fotos que te pida (por ejemplo, el tanque).',
             'Mientras trabajas, el administrador ve tu ubicación.',
         ]),
         ('En cada cliente', [
             'Toca al cliente en tu ruta.',
             'Contesta los pasos: cuántas cajas o kilos le dejas, cuánto te pagó y cuántas <b>cajas vacías</b> te regresa.',
             'Al final toca <b>"Revisar y guardar"</b> y luego manda la <b>nota</b> por WhatsApp al cliente.',
             'Si quiere <b>fiado, mayoreo u otro precio</b>, pídelo en la app y espera la respuesta del administrador.',
             'Si es un cliente nuevo, agrégalo desde tu ruta.',
             'Si te sale <b>"Pasa a cobrarle a …"</b>: es solo para cobrar. No le dejas fruta: anota lo que te pagó y lo entregas en tu cierre.',
         ]),
         ('Al terminar la ruta', [
             'La app te dice <b>"Terminaste tu ruta: regresa a la bodega"</b>. Toca <b>"Cómo llegar a la bodega"</b> si lo necesitas.',
             'En la bodega toca <b>"Hacer mi cierre"</b>: cuenta lo que regresas, el efectivo y toma las fotos que pida.',
             'Toca <b>"Enviar cierre al administrador"</b> y entrégale el efectivo.',
         ]),
         ('Si algo falla', [
             '<b>Ya estacionado</b>, sacude el celular y toca <b>"Sí, reportar"</b> (con el carro en movimiento no aparece).',
             'Escribe qué pasó o toca <b>"Grabar un audio"</b>. Luego <b>"Mandar"</b>.',
             'También está en el menú (las tres rayitas, arriba): <b>"Reportar un problema"</b>.',
         ], ROJO),
         ('Sin señal', [
             'Sigue trabajando normal: todo se guarda en el celular y se sube solo cuando regresa la señal.',
         ], AZUL),
     ],
     'La primera semana también se anota en la libreta, como siempre, para comparar cada noche.')
print('listo')
