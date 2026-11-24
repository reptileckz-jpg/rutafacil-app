# Libreta para imprimir (punto 41 · primera semana con libreta en paralelo): 4 hojas para anotar a mano y comparar cada noche con la app.
# Uso: python3 fuente/ayuda/hacer-libreta.py → fuente/ayuda/libreta-chofer.pdf, libreta-duenio.pdf, libreta-comparar.pdf, libreta-prestamos-cobros.pdf
# Cada hoja es de una página: se imprimen las que hagan falta (una de chofer por chofer por día).
import os
from reportlab.lib.pagesizes import letter, landscape
from reportlab.lib.units import cm
from reportlab.lib import colors
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle
from reportlab.lib.styles import ParagraphStyle

F = '/usr/share/fonts/truetype/dejavu/'
pdfmetrics.registerFont(TTFont('S', F + 'DejaVuSans.ttf'))
pdfmetrics.registerFont(TTFont('SB', F + 'DejaVuSans-Bold.ttf'))
pdfmetrics.registerFontFamily('S', normal='S', bold='SB', italic='S', boldItalic='SB')
AQUI = os.path.dirname(os.path.abspath(__file__))
VERDE = colors.HexColor('#166534')
GRIS = colors.HexColor('#E5E7EB')

tit = ParagraphStyle('t', fontName='SB', fontSize=17, leading=21, textColor=VERDE)
sub = ParagraphStyle('s', fontName='S', fontSize=10, leading=13, textColor=colors.HexColor('#444444'), spaceAfter=4)
h = ParagraphStyle('h', fontName='SB', fontSize=11.5, leading=14, spaceBefore=6, spaceAfter=3)
cel = ParagraphStyle('c', fontName='SB', fontSize=9.5, leading=11, textColor=colors.white, alignment=1)
txt = ParagraphStyle('p', fontName='S', fontSize=10, leading=13)


def tabla(cols, anchos, filas, alto=0.72 * cm, extra=None):
    data = [[Paragraph(c, cel) for c in cols]] + (extra or []) + [[''] * len(cols) for _ in range(filas)]
    t = Table(data, colWidths=anchos, rowHeights=[None] + [alto] * (len(data) - 1))
    t.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), VERDE), ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
        ('GRID', (0, 0), (-1, -1), 0.6, colors.HexColor('#9CA3AF')),
        ('FONTNAME', (0, 1), (-1, -1), 'S'), ('FONTSIZE', (0, 1), (-1, -1), 9.5),
        ('ROWBACKGROUNDS', (0, 1), (-1, -1), [colors.white, colors.HexColor('#F7F7F7')]),
    ]))
    return t


def campos(pares, ancho):
    """renglón de datos para llenar: [('Fecha', 4), ('Chofer', 6)…] → etiqueta y raya"""
    tot = sum(p[1] for p in pares)
    data = [[Paragraph('<b>%s:</b>' % p[0], txt) for p in pares]]
    t = Table(data, colWidths=[ancho * p[1] / tot for p in pares], rowHeights=[0.8 * cm])
    t.setStyle(TableStyle([('LINEBELOW', (0, 0), (-1, -1), 0.6, colors.HexColor('#9CA3AF')), ('VALIGN', (0, 0), (-1, -1), 'BOTTOM')]))
    return t


def pdf(nombre, tamano, partes, titulo):
    doc = SimpleDocTemplate(os.path.join(AQUI, nombre), pagesize=tamano, leftMargin=1.2 * cm, rightMargin=1.2 * cm, topMargin=1.0 * cm, bottomMargin=0.9 * cm, title=titulo, author='Ruta Fácil')
    doc.build(partes)


# ---------- 1) chofer, por día (horizontal) ----------
W = landscape(letter)[0] - 2.4 * cm
pdf('libreta-chofer.pdf', landscape(letter), [
    Paragraph('Libreta del chofer · un día', tit),
    Paragraph('Una hoja por chofer por día. Anota cada cliente igual que en la app. En la noche se compara con la app (hoja "Comparar").', sub),
    campos([('Fecha', 3), ('Chofer', 5), ('Vehículo', 4), ('Km al salir', 3), ('Km al regresar', 3)], W),
    campos([('Salí con · cajas de roatán', 4), ('kilos de macho', 3), ('cajas vacías', 3), ('efectivo para cambio $', 4)], W),
    Spacer(1, 6),
    tabla(['#', 'Cliente', 'Cajas', 'Kilos', 'Precio caja / kilo', 'Total $', 'Pagó $', 'Fiado $', 'Abono a lo que debía $', 'Vacías que me regresó', 'Le dejé vacías'],
          [0.8 * cm, 5.4 * cm, 1.5 * cm, 1.5 * cm, 2.6 * cm, 2.0 * cm, 2.0 * cm, 2.0 * cm, 2.6 * cm, 2.1 * cm, 1.9 * cm], 17, 0.7 * cm),
    Spacer(1, 6),
    campos([('Gastos de ruta · gasolina $', 4), ('casetas $', 3), ('comida $', 3), ('otro $', 3)], W),
    campos([('Regresé con · cajas', 3), ('kilos', 2), ('vacías', 2), ('EFECTIVO QUE ENTREGO $', 5), ('Firma de quien recibe', 5)], W),
], 'Libreta del chofer')

# ---------- 2) dueño, por día ----------
W2 = letter[0] - 2.4 * cm
pdf('libreta-duenio.pdf', letter, [
    Paragraph('Libreta del dueño · un día', tit),
    Paragraph('Lo que pasa en la bodega y en la caja. Todo el efectivo del negocio es una sola caja, aunque una parte esté en tu casa.', sub),
    campos([('Fecha', 3), ('Precio de hoy · caja de roatán $', 5), ('kilo de macho $', 3)], W2),
    Paragraph('Fruta que llegó (cargas)', h),
    tabla(['Proveedor', 'Cajas', 'Kilos', 'Costo $', 'Le pagué $', 'Le debo $', 'Vacías que le di'], [4.6 * cm, 1.6 * cm, 1.6 * cm, 2.3 * cm, 2.3 * cm, 2.3 * cm, 2.6 * cm], 4),
    Paragraph('Cierres de los choferes', h),
    tabla(['Chofer', 'Me entregó $', 'Regresó cajas', 'Regresó kilos', 'Vacías', 'Faltó / sobró $'], [4.6 * cm, 2.6 * cm, 2.4 * cm, 2.4 * cm, 2.2 * cm, 3.1 * cm], 4),
    Paragraph('Gastos y pagos del día (también tu sueldo, préstamos y depósitos al banco)', h),
    tabla(['Concepto', '$', '¿Salió de la caja o del banco?'], [9.2 * cm, 2.6 * cm, 5.5 * cm], 8),
    Paragraph('La caja', h),
    tabla(['Caja al empezar el día $', 'Entró hoy $', 'Salió hoy $', 'Debe haber $', 'Conté $', 'Diferencia $'], [3.3 * cm, 2.6 * cm, 2.6 * cm, 2.8 * cm, 2.6 * cm, 3.4 * cm], 1, 0.9 * cm),
    Paragraph('La bodega (cuando cuentes)', h),
    tabla(['Cajas vacías', 'Roatán verde', 'Roatán madurando', 'Roatán maduro', 'Macho verde kg', 'Macho maduro kg'], [2.9 * cm] * 6, 1, 0.9 * cm),
], 'Libreta del dueño')

# ---------- 3) comparar, cada noche ----------
filas = ['Efectivo en caja (contado)', 'Efectivo que entregó cada chofer: ________', 'Efectivo que entregó cada chofer: ________', 'Efectivo que entregó cada chofer: ________',
         'Cajas de roatán vendidas', 'Kilos de macho vendidos', 'Fiado del día (lo que quedaron a deber)', 'Abonos que pagaron los clientes', 'Cajas vacías que regresaron',
         'Gastos del día', 'Bodega: cajas vacías', 'Bodega: cajas de roatán (verdes + madurando + maduras)', 'Bodega: kilos de macho', 'Préstamos a empleados (lo que deben)', 'Cobros fuera de la ruta']
t = Table([[Paragraph(c, cel) for c in ['Qué se compara', 'La libreta dice', 'La app dice', 'Diferencia', '¿Qué pasó?']]] + [[Paragraph(f, txt), '', '', '', ''] for f in filas],
          colWidths=[6.0 * cm, 2.3 * cm, 2.3 * cm, 2.7 * cm, 4.0 * cm], rowHeights=[None] + [1.12 * cm] * len(filas))
t.setStyle(TableStyle([('BACKGROUND', (0, 0), (-1, 0), VERDE), ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'), ('GRID', (0, 0), (-1, -1), 0.6, colors.HexColor('#9CA3AF')),
                       ('ROWBACKGROUNDS', (0, 1), (-1, -1), [colors.white, colors.HexColor('#F7F7F7')])]))
pdf('libreta-comparar.pdf', letter, [
    Paragraph('Comparar la libreta con la app · cada noche', tit),
    Paragraph('La primera semana, cada noche: escribe lo que dice la libreta y lo que dice la app. Si no coinciden, <b>sacude el celular y reporta</b> (o menú → "Reportar un problema") y escribe aquí qué pasó.', sub),
    campos([('Fecha', 3), ('Quién comparó', 5)], W2), Spacer(1, 6), t, Spacer(1, 8),
    Paragraph('En la app: el efectivo está en <b>Inicio → Cuadre de hoy</b> y en <b>Más → Cuadre de Caja</b>; lo de la bodega en <b>Bodega</b>; lo que deben los clientes en <b>Clientes</b>; los préstamos en <b>Más → Personal → Sueldos</b>.', sub),
], 'Comparar libreta y app')

# ---------- 4) préstamos y cobros fuera de ruta ----------
pdf('libreta-prestamos-cobros.pdf', letter, [
    Paragraph('Préstamos a empleados y cobros fuera de la ruta', tit),
    Paragraph('Para tenerlo también en papel la primera semana. En la app: préstamos en Más → Personal → Sueldos; cobros con "🚗 Voy a cobrarle" en la ficha del cliente.', sub),
    Paragraph('Préstamos a empleados', h),
    tabla(['Fecha', 'Empleado', 'Le presté $', 'Cómo paga (de su sueldo en __ pagos / en efectivo para el __)', 'Abonos $', 'Debe $'],
          [1.9 * cm, 3.4 * cm, 2.2 * cm, 5.6 * cm, 2.2 * cm, 2.0 * cm], 9, 0.85 * cm),
    Paragraph('Cobros fuera de la ruta', h),
    tabla(['Fecha', 'Cliente', 'Quién cobró', 'Cobró $', '¿Fue solo a cobrar en su carro? Gasolina $', 'Lo entregó en su cierre ✓'],
          [1.9 * cm, 3.6 * cm, 2.6 * cm, 2.0 * cm, 4.6 * cm, 2.6 * cm], 9, 0.85 * cm),
], 'Préstamos y cobros')
print('listo')
