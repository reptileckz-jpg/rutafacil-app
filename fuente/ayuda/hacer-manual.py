# Guía rápida y manual con ilustraciones (capturas reales de la app, versión demo con datos de ejemplo).
# Uso: 1) node pruebas/capturas-manual.js (desde fuente/) (toma las capturas en fuente/ayuda/img/)   2) python3 fuente/ayuda/hacer-manual.py
# Deja fuente/ayuda/guia-rapida.pdf y fuente/ayuda/manual-ruta-facil.pdf. Si cambia un botón en la app, se cambia aquí y se vuelven a hacer.
import os, tempfile
from PIL import Image as PImg
from reportlab.lib.pagesizes import letter
from reportlab.lib.units import cm
from reportlab.lib import colors
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import (BaseDocTemplate, PageTemplate, Frame, Paragraph, Spacer, Table, TableStyle, PageBreak, Flowable, KeepTogether)
from reportlab.lib.styles import ParagraphStyle

F = '/usr/share/fonts/truetype/dejavu/'
pdfmetrics.registerFont(TTFont('S', F + 'DejaVuSans.ttf'))
pdfmetrics.registerFont(TTFont('SB', F + 'DejaVuSans-Bold.ttf'))
pdfmetrics.registerFontFamily('S', normal='S', bold='SB', italic='S', boldItalic='SB')
AQUI = os.path.dirname(os.path.abspath(__file__))
IMG = os.path.join(AQUI, 'img')
TMP = tempfile.mkdtemp()
VERDE = colors.HexColor('#166534'); VERDE2 = colors.HexColor('#DCFCE7'); GRIS = colors.HexColor('#475569'); ROJO = colors.HexColor('#B91C1C')
AMBAR = colors.HexColor('#FEF3C7')

st = {
    'portada': ParagraphStyle('pt', fontName='SB', fontSize=34, leading=40, textColor=VERDE),
    'sub': ParagraphStyle('su', fontName='S', fontSize=15, leading=20, textColor=GRIS),
    'h1': ParagraphStyle('h1', fontName='SB', fontSize=22, leading=27, textColor=VERDE, spaceAfter=6),
    'h2': ParagraphStyle('h2', fontName='SB', fontSize=15, leading=19, textColor=colors.black, spaceBefore=8, spaceAfter=4),
    'p': ParagraphStyle('p', fontName='S', fontSize=12, leading=16.5, spaceAfter=4),
    'paso': ParagraphStyle('pa', fontName='S', fontSize=12, leading=16.5, leftIndent=22, firstLineIndent=-22, spaceAfter=5),
    'pie': ParagraphStyle('pi', fontName='S', fontSize=9.5, leading=12, textColor=GRIS, alignment=1),
    'tile_t': ParagraphStyle('tt', fontName='SB', fontSize=12.5, leading=15, textColor=VERDE),
    'tile_p': ParagraphStyle('tp', fontName='S', fontSize=10.5, leading=13.5),
    'nota': ParagraphStyle('no', fontName='S', fontSize=11.5, leading=15.5),
    'ind': ParagraphStyle('in', fontName='S', fontSize=13, leading=20),
}


def jpg(nombre, ancho_px=560):
    """la captura, más ligera para el PDF"""
    src = os.path.join(IMG, nombre + '.png'); dst = os.path.join(TMP, nombre + '.jpg')
    if not os.path.exists(dst):
        im = PImg.open(src).convert('RGB')
        if im.width > ancho_px: im = im.resize((ancho_px, round(im.height * ancho_px / im.width)), PImg.LANCZOS)
        im.save(dst, 'JPEG', quality=84, optimize=True)
    w, h = PImg.open(dst).size
    return dst, w, h


class Cel(Flowable):
    """una captura dentro de un marco de celular (esquinas redondas)"""
    def __init__(self, nombre, ancho, alto_max=None):
        super().__init__(); self.src, w, h = jpg(nombre); self.w = ancho; self.h = ancho * h / w
        if alto_max and self.h > alto_max: self.h = alto_max; self.w = alto_max * w / h
        self.pad = 5
    def wrap(self, aw, ah): return self.w + 2 * self.pad, self.h + 2 * self.pad
    def draw(self):
        c = self.canv; p = self.pad; r = 14
        c.setFillColor(colors.HexColor('#111827')); c.roundRect(0, 0, self.w + 2 * p, self.h + 2 * p, r + 3, stroke=0, fill=1)
        c.saveState(); pa = c.beginPath(); pa.roundRect(p, p, self.w, self.h, r); c.clipPath(pa, stroke=0, fill=0)
        c.drawImage(self.src, p, p, self.w, self.h); c.restoreState()


def P(t, s='p'): return Paragraph(t, st[s])
def pasos(L): return [P('<font name="SB" color="#166534">%d.</font>&nbsp;&nbsp;%s' % (i + 1, t), 'paso') for i, t in enumerate(L)]


def cuadro(textos, color=VERDE2, borde=VERDE, ancho=17.4 * cm):
    t = Table([[P(x, 'nota')] for x in textos], colWidths=[ancho])
    t.setStyle(TableStyle([('BACKGROUND', (0, 0), (-1, -1), color), ('BOX', (0, 0), (-1, -1), 1, borde), ('LEFTPADDING', (0, 0), (-1, -1), 10), ('RIGHTPADDING', (0, 0), (-1, -1), 10), ('TOPPADDING', (0, 0), (-1, -1), 5), ('BOTTOMPADDING', (0, 0), (-1, -1), 5)]))
    return t


def lado(img, contenido, ancho_img=5.6 * cm, alto_max=12.2 * cm):
    """captura a la izquierda, pasos a la derecha"""
    imgs = img if isinstance(img, list) else [img]
    col_img = [Cel(x, ancho_img, alto_max) for x in imgs]
    t = Table([[col_img, contenido]], colWidths=[ancho_img + 0.9 * cm, 17.4 * cm - ancho_img - 0.9 * cm])
    t.setStyle(TableStyle([('VALIGN', (0, 0), (-1, -1), 'TOP'), ('LEFTPADDING', (0, 0), (-1, -1), 0), ('RIGHTPADDING', (0, 0), (0, 0), 12)]))
    return t


def dos(titulo, imgs, contenido, alto=9.3 * cm, estilo='h2'):
    """título, capturas lado a lado y los pasos abajo; todo junto en la misma página"""
    celdas = [Cel(x, 5.0 * cm, alto) for x in imgs]
    t = Table([celdas], colWidths=[6.0 * cm] * len(celdas), hAlign='CENTER')
    t.setStyle(TableStyle([('VALIGN', (0, 0), (-1, -1), 'TOP'), ('ALIGN', (0, 0), (-1, -1), 'CENTER')]))
    return KeepTogether(([P(titulo, estilo)] if titulo else []) + [t, Spacer(1, 6)] + contenido)


def doc(nombre, titulo, pie):
    d = BaseDocTemplate(os.path.join(AQUI, nombre), pagesize=letter, leftMargin=2.1 * cm, rightMargin=2.1 * cm, topMargin=1.6 * cm, bottomMargin=1.5 * cm, title=titulo, author='Ruta Fácil')
    fr = Frame(d.leftMargin, d.bottomMargin, d.width, d.height, id='f')
    def deco(c, d2):
        c.saveState(); c.setFont('S', 9); c.setFillColor(GRIS)
        if d2.page > 1: c.drawString(2.1 * cm, 1.0 * cm, pie); c.drawRightString(letter[0] - 2.1 * cm, 1.0 * cm, 'Página %d' % d2.page)
        c.setFillColor(VERDE); c.rect(0, letter[1] - 0.45 * cm, letter[0], 0.45 * cm, stroke=0, fill=1); c.restoreState()
    d.addPageTemplates([PageTemplate(id='p', frames=[fr], onPage=deco)])
    return d


# ================= GUÍA RÁPIDA =================
def mosaico(items):
    filas, fila = [], []
    for img, tit, txt in items:
        celda = [Cel(img, 4.6 * cm, 6.7 * cm), Spacer(1, 3), P(tit, 'tile_t'), P(txt, 'tile_p')]
        fila.append(celda)
        if len(fila) == 3: filas.append(fila); fila = []
    if fila: filas.append(fila + [''] * (3 - len(fila)))
    t = Table(filas, colWidths=[5.8 * cm] * 3)
    t.setStyle(TableStyle([('VALIGN', (0, 0), (-1, -1), 'TOP'), ('LEFTPADDING', (0, 0), (-1, -1), 2), ('RIGHTPADDING', (0, 0), (-1, -1), 8), ('BOTTOMPADDING', (0, 0), (-1, -1), 10)]))
    return t


g = doc('guia-rapida.pdf', 'Ruta Fácil · Guía rápida', 'Ruta Fácil · Guía rápida')
h = [P('Guía rápida · El dueño', 'h1'), P('Tu día en 6 pasos. Abajo de la app están: <b>Inicio · Rutas · Clientes · Bodega · Cargas · Más</b>.', 'sub'), Spacer(1, 8),
     mosaico([
         ('a-precio-grande', '1. Fija el precio de hoy', 'Al abrir la app sale solo. Toca <b>"Cambiar el precio"</b> o <b>"Está bien, el de ayer"</b>.'),
         ('a-hoy', '2. Revisa "Hoy"', 'Tus pendientes en Inicio. Toca <b>›</b> para ir a resolverlo, o <b>"Posponer"</b>.'),
         ('a-centro', '3. Atiende uno por uno', '<b>"Atender los pendientes"</b>: <b>Resolver</b>, <b>Recordarme mañana</b> o <b>Listo</b>.'),
         ('a-rutas', '4. Rutas y choferes', 'Dónde va cada chofer. Cuando regresa, <b>recibe su cierre</b> y el efectivo.'),
         ('a-existencias', '5. La bodega', 'Lo que hay. Para contar: <b>Bodega → "Contar bodega"</b>.'),
         ('a-banco', '6. Caja y banco', 'Cada <b>sábado</b>, cierre de caja. Si depositas: <b>"Pasé dinero de la caja al banco"</b>.'),
     ]),
     cuadro(['<b>Si algo falla:</b> sacude el celular 4 veces y toca <b>"Sí, reportar"</b>. La app toma la foto de la pantalla.'], AMBAR, colors.HexColor('#D97706')),
     PageBreak(),
     P('Guía rápida · El chofer', 'h1'), P('No uses la app mientras manejas. Abajo están: <b>Ruta · Entrega · Gasto · Viaje · Cierre</b>.', 'sub'), Spacer(1, 8),
     mosaico([
         ('c-iniciar', '1. Inicia tu ruta', 'Pon tu PIN, revisa tu vehículo y toca <b>"Iniciar ruta"</b>.'),
         ('c-ruta', '2. Tu ruta de hoy', 'Lo que traes en el camión y tus clientes en orden. Toca a un cliente.'),
         ('c-entrega', '3. ¿Qué le dejas?', 'Cajas y kilos con <b>−</b> y <b>+</b>. Toca <b>"Siguiente"</b>.'),
         ('c-cobro', '4. Cobro', 'Lo que paga, si debe de antes y las cajas vacías. <b>"Siguiente"</b> y <b>"Revisar y guardar"</b>.'),
         ('c-nota', '5. La nota', 'Escribe quién recibió y manda la nota por <b>WhatsApp</b>.'),
         ('c-cierre', '6. Tu cierre', 'En la bodega: <b>Cierre</b>. Paso por paso: odómetro, lo que regresa y el efectivo.'),
     ]),
     cuadro(['<b>Sin señal:</b> sigue trabajando; se guarda y se sube solo. <b>Si algo falla:</b> ya estacionado, sacude el celular y toca <b>"Sí, reportar"</b>.'], AMBAR, colors.HexColor('#D97706'))]
g.build(h)

# ================= MANUAL =================
m = doc('manual-ruta-facil.pdf', 'Ruta Fácil · Manual', 'Ruta Fácil · Manual de uso')
S_ = []
S_ += [Spacer(1, 3 * cm), P('Ruta Fácil', 'portada'), Spacer(1, 6), P('Manual de uso · Plátanos Nietos', 'sub'), Spacer(1, 1.2 * cm),
       Table([[Cel('a-inicio', 5.2 * cm), Cel('c-ruta', 5.2 * cm), Cel('a-hoy', 5.2 * cm, 11.3 * cm)]], colWidths=[5.9 * cm] * 3),
       Spacer(1, 1 * cm), P('Las imágenes son de la versión de prueba, con datos de ejemplo. En tu celular verás tus clientes y tus números.', 'pie'), PageBreak()]
S_ += [P('Contenido', 'h1')] + [P(x, 'ind') for x in [
    '1. Antes de empezar', '2. El precio de hoy', '3. Inicio: "Hoy" y los pendientes', '4. Rutas y choferes', '5. Clientes y cobranza',
    '6. La bodega y el periodo de arranque', '7. Cargas y proveedores', '8. Gastos, caja y banco', '9. Personal: sueldos, préstamos y aguinaldo',
    '10. Mi sueldo (el dueño)', '11. El chofer: un día de trabajo', '12. Si algo falla: reportar un problema', '13. La configuración inicial',
    '14. Preguntas frecuentes']] + [PageBreak()]

S_ += [P('1. Antes de empezar', 'h1'), lado('a-inicio', [
    P('La primera vez entras con tu <b>usuario y contraseña</b>; después solo con tu <b>PIN</b> de 4 números.'),
    P('Abajo siempre están las secciones:', 'p')] + pasos([
    '<b>Inicio</b>: lo de hoy, tus pendientes, el precio y la caja.', '<b>Rutas</b>: los choferes y sus clientes de hoy.',
    '<b>Clientes</b>: quién debe, cajas vacías, cobranza.', '<b>Bodega</b>: lo que hay, maduración y conteo.',
    '<b>Cargas</b>: fruta que compras y viajes.', '<b>Más</b>: Cuadre, Gastos, Estadísticas, Vehículos, Personal, Ajustes.']) + [
    Spacer(1, 6), cuadro(ancho=10.6 * cm, textos=['<b>Nada se borra.</b> Si te equivocas, se corrige y queda anotado quién y cuándo (Más → "Lo que pasó hoy").', '<b>Sin señal</b> la app sigue funcionando y sube todo cuando regresa la señal.'])]), PageBreak()]

S_ += [P('2. El precio de hoy', 'h1'), lado(['a-precio-grande'], [
    P('Mientras no fijes el precio del día, la app te lo pide:')] + pasos([
    'Al abrir la app sale la pantalla <b>"Fija el precio de hoy"</b> (en cualquier sección).',
    'Toca <b>"Cambiar el precio"</b> para escribir el nuevo, o <b>"Está bien, el de ayer"</b>.',
    'Si tocas <b>"Después"</b>, vuelve a salir en una hora.',
    'En Inicio, la tarjeta <b>"Precio de hoy"</b> brilla en rojo hasta que lo fijes.']) + [Spacer(1, 8), Cel('a-precio-tarjeta', 9.5 * cm), Spacer(1, 6),
    P('Mientras tanto, los choferes cobran con el precio de ayer.')]), PageBreak()]

S_ += [P('3. Inicio: "Hoy" y los pendientes', 'h1'), lado('a-hoy', [
    P('En <b>Inicio</b>, la tarjeta <b>"Hoy"</b> junta lo que tienes que atender. Cada aviso dice qué pasa y cuánto:')] + pasos([
    'El color dice qué tan urgente es: <b>rojo</b> urgente, <b>ámbar</b> pronto, <b>azul</b> para saber.',
    'Si algo <b>no cuadra</b> (cajas, kilos o dinero), sale en tarjeta <b>oscura</b> con los números: "Hay", "Deben ser" y la diferencia.',
    'Toca el cuadro <b>›</b> para ir a donde se resuelve.', '<b>"Posponer"</b> lo pasa a mañana. <b>"Lo atiendo yo"</b> avisa que ya lo viste.']), ancho_img=5.2 * cm),
    PageBreak(), dos('3. Inicio (sigue): el centro de pendientes', ['a-centro-sec', 'a-centro'], pasos([
    'Toca <b>"Atender los pendientes"</b> (abajo de "Hoy").', 'Escoge una sección (Dinero, Rutas, Clientes…).',
    'Atiéndelos uno por uno: <b>"Resolver ›"</b> te lleva justo ahí; <b>"Recordarme mañana"</b>; o <b>"✓ Listo"</b>.']), estilo='h1'), PageBreak()]

S_ += [P('4. Rutas y choferes', 'h1'), lado('a-rutas', pasos([
    'En <b>Rutas</b> ves cuántos clientes tiene cada chofer hoy y mañana.', '<b>"Ver y repartir clientes"</b> para pasar clientes de un chofer a otro.',
    'El <b>mapa en vivo</b> muestra dónde va cada uno (mientras trabajan).',
    'Cuando el chofer llega a la bodega te sale <b>"ya llegó"</b>: recibe su cierre y cuenta el efectivo que te entrega.',
    'Si un pago o un cierre no cuadra, la app te lo dice con los números.'])), PageBreak()]

S_ += [P('5. Clientes y cobranza', 'h1'), lado(['a-clientes'], pasos([
    'En <b>Clientes</b> ves quién debe dinero o cajas y desde cuándo.', 'Toca a un cliente para abrir su ficha: lo que debe, sus visitas, teléfono y WhatsApp.',
    'Para un abono: en su ficha, escribe el <b>abono</b> y toca <b>"Registrar abono"</b>.']), ancho_img=4.8 * cm),
    PageBreak(), dos('5. Clientes (sigue): "Voy a cobrarle" (cobrar fuera de la ruta)', ['a-cliente', 'a-cobrar'], pasos([
    'En la ficha del cliente toca <b>"Voy a cobrarle"</b> y escoge quién va.',
    '<b>Yo</b>: te queda en Inicio. Cuando cobres toca <b>"Ya cobré"</b>; te pregunta cuánto y cómo fuiste. Si fuiste solo a cobrar en tu carro, el negocio paga tu gasolina.',
    '<b>Un chofer</b>: le llega como parada de "solo cobrar" y lo entrega en su siguiente cierre.']), estilo='h1'), PageBreak()]

S_ += [P('6. La bodega y el periodo de arranque', 'h1'), lado('a-existencias', pasos([
    'En <b>Bodega</b> ves las cajas de roatán (verdes, en maduración, maduras) y los kilos de macho.',
    'Para contar: <b>"Contar bodega"</b>, escribe lo que de verdad hay y regístralo.',
    'Para madurar: <b>"Meter a maduración"</b>. La app te avisa cuando un lote ya está.']) + [Spacer(1, 6), cuadro(ancho=10.1 * cm, textos=[
    '<b>Periodo de arranque (las primeras 2 semanas):</b> con cada conteo, el número de <b>cajas</b> se va ajustando y esa diferencia es "ajuste de arranque": no es merma ni se le descuenta a nadie.',
    '<b>Después</b> de las 2 semanas, las diferencias ya cuentan como merma. La app te avisa cuántos días te quedan.',
    'El <b>macho</b> siempre cuenta como merma (se cae fruta y baja de peso al madurar).'])], ancho_img=6.4 * cm), PageBreak()]

S_ += [P('7. Cargas y proveedores', 'h1'), lado('a-cargas', pasos([
    '<b>"Registrar carga nueva"</b> cuando compras fruta: proveedor, cajas, kilos y costo.',
    'Al llegar, recíbela: lo que llegó y las cajas vacías que le diste.', 'Para pagarle al proveedor: abre la carga y registra el pago (efectivo o transferencia).',
    'Si un viaje <b>nunca salió</b>, ábrelo y toca <b>"Este viaje nunca salió · cancelar"</b>: te pregunta antes y queda en el historial.',
    'El <b>"Simulador de viaje"</b> te ayuda a calcular cuánto llevar.'])), PageBreak()]

S_ += [P('8. Gastos, caja y banco', 'h1'), lado('a-gastos', pasos([
    '<b>Más → Gastos</b>: registra lo que pagas. En <b>"Fijos"</b> están la luz, la renta, etc.',
    '<b>"Lo que va a salir"</b> te dice si te alcanza la caja esta semana.',
    'Tu sueldo como dueño es un gasto fijo marcado como <b>"sueldo del dueño"</b>: baja la caja pero no la ganancia.']), ancho_img=5.0 * cm),
    Spacer(1, 6), lado('a-banco', pasos([
    'Todo el efectivo del negocio es <b>una sola caja</b>, aunque una parte esté en tu casa.',
    'Si depositas: <b>"Pasé dinero de la caja al banco"</b>. Lo que pagues por transferencia sale del banco.',
    'Cada <b>sábado</b>: cierre de caja (cuenta todo el efectivo). La app te recuerda apartar para aguinaldo y vacaciones.',
    '<b>Más → Cuadre de Caja</b>: ventas, ganancia y neto por día, semana o mes.']), ancho_img=6.6 * cm), PageBreak()]

S_ += [P('9. Personal: sueldos, préstamos y aguinaldo', 'h1'), lado('a-sueldos', pasos([
    '<b>Más → Personal → Sueldos</b>, toca al empleado: ves el desglose de su semana.',
    '<b>"Pagar"</b>: le pagas la semana y sale el <b>recibo</b> para mandarlo por WhatsApp.',
    '<b>"Agregar extra o adelanto"</b> para bonos o adelantos.',
    '<b>Aguinaldo</b>: en la misma tarjeta, "Pagar la mitad" o "Pagar lo que falta", con su desglose.']), ancho_img=5.0 * cm),
    Spacer(1, 6), P('Préstamos a empleados', 'h2'), lado('a-prestamo', pasos([
    'En la tarjeta del empleado toca <b>"Prestarle dinero"</b> y contesta: cuánto, cómo lo paga (descontado de su sueldo en pagos, o en efectivo con fecha) y para qué.',
    'Te avisa si ya debe otro préstamo, si es mucho, o si no alcanza la caja.',
    'Sale el recibo para WhatsApp. Si abona en efectivo: <b>"Abonó en efectivo"</b>. Si deja de trabajar, se descuenta de su finiquito.']), ancho_img=4.2 * cm, alto_max=8 * cm), PageBreak()]

S_ += [P('10. Mi sueldo (el dueño)', 'h1'), lado('a-misueldo', pasos([
    '<b>Más → "Mi sueldo"</b>: unas preguntas de tus gastos de la casa, tu carro, salud, deudas y ahorro.',
    'Al final te dice cuánto necesitas, cuánto puede pagarte el negocio y te <b>sugiere un sueldo</b>. Tú decides.',
    'Cada quincena la app te dice cómo va: verde, amarillo o rojo, y si conviene subirlo o bajarlo.',
    'Solo lo ven tú y el desarrollador de la app.']) + [Spacer(1, 6), cuadro(ancho=10.9 * cm, textos=['<b>Tu carro:</b> sus gastos son tuyos. Cuando lo uses para el negocio, anótalo en Gastos como <b>"Mi carro (para el negocio)"</b>.'])]), PageBreak()]

S_ += [dos('11. El chofer: un día de trabajo', ['c-iniciar', 'c-ruta'], pasos([
    'Pon tu <b>PIN</b>. Revisa que sea tu vehículo y toca <b>"Iniciar ruta"</b>; toma las fotos que pida.',
    'En <b>Ruta</b> ves lo que traes en el camión y tus clientes. Toca uno para entregarle.']), estilo='h1'), PageBreak(),
    dos('11. El chofer (sigue): la entrega', ['c-entrega', 'c-cobro'], pasos([
    '<b>¿Qué le dejas?</b>: cajas y kilos con − y +. <b>"Siguiente"</b>.',
    '<b>Cobro</b>: lo que paga y, si debe de antes, su abono. Pídele sus cajas vacías.',
    '<b>"Revisar y guardar"</b> y luego la <b>nota</b> por WhatsApp.']), estilo='h1'), PageBreak(),
    dos('11. El chofer (sigue): la nota y el cierre', ['c-nota', 'c-cierre'], pasos([
    '<b>La nota</b>: escribe quién recibió y mándala por WhatsApp al cliente.',
    'Si el cliente quiere <b>fiado, mayoreo u otro precio</b>, pídelo en la app y espera la respuesta.',
    'Si te sale <b>"Pasa a cobrarle a…"</b>: solo cobras, no dejas fruta.',
    'Al terminar: <b>"Terminaste tu ruta: regresa a la bodega"</b>. En la bodega, <b>Cierre</b>: odómetro, lo que regresa, el efectivo y las fotos. Al final <b>"Enviar cierre al administrador"</b>.']), estilo='h1'),
    Spacer(1, 6), cuadro(['<b>No uses la app manejando.</b> Si se va la señal, sigue trabajando: se guarda y se sube sola.'], AMBAR, colors.HexColor('#D97706')), PageBreak()]

S_ += [dos('12. Si algo falla: reportar un problema', ['r-sacudir', 'r-reporte'], pasos([
    '<b>Sacude el celular 4 veces</b> (con el carro en movimiento no sale). Toca <b>"Sí, reportar"</b>.',
    'La app toma la <b>foto de la pantalla</b>. Con <b>"Señalar"</b> encierras con el dedo dónde está el problema.',
    'Escribe qué pasó (o usa el micrófono del teclado) o <b>graba un audio</b>. Escoge qué tan grave es y toca <b>"Mandar"</b>.',
    'También está en el menú (las tres rayitas, arriba): <b>"Reportar un problema"</b>.']), estilo='h1'), PageBreak(),
    P('12. (sigue) Para el desarrollador', 'h1'), lado('a-dev', pasos([
    '<b>Ajustes → "Pantalla de desarrollador"</b> (solo quien tiene la marca de desarrollador).',
    'Todos los reportes con su captura, los errores automáticos y el estado de cada celular.',
    '<b>"Guardar todas en el celular"</b>: una imagen por reporte, para mandárselas a Claude.', 'Cuando quede arreglado: <b>"✓ Arreglado"</b>.']), ancho_img=4.2 * cm, alto_max=8 * cm), PageBreak()]

S_ += [dos('13. La configuración inicial', ['s-config', 's-config-ayuda'], pasos([
    'La primera vez, el dueño contesta <b>8 pasos</b>: negocio, bodega, vehículos, personal, clientes, proveedores, dinero y precios, y listo.',
    'En cada paso: <b>"¿Qué hago aquí?"</b> lo explica, y <b>"Pedir ayuda"</b> manda WhatsApp a quien te ayuda.',
    'Alguien te puede ayudar desde su celular con su propio usuario: lo que agregue cada quien se junta, y la app avisa si están los dos.',
    'Al final, solo el dueño toca <b>"Empezar"</b>.']), estilo='h1'), PageBreak()]

S_ += [P('14. Preguntas frecuentes', 'h1')]
for q, a in [
    ('¿Y si me equivoco?', 'Corrígelo. Nada se borra: queda anotado qué se cambió, quién y cuándo.'),
    ('¿Qué pasa si no hay señal?', 'La app sigue funcionando. Dice "Buscando señal, guardando N datos" y lo sube solo cuando regresa la señal.'),
    ('Un número no me cuadra con la libreta.', 'La primera semana anota también en la libreta y compara cada noche con la hoja "Comparar". Si no coincide, repórtalo sacudiendo el celular.'),
    ('¿Quién ve mi sueldo?', 'Solo el dueño y el desarrollador. Los demás administradores solo ven el gasto fijo.'),
    ('Un chofer quiere fiado o un precio especial.', 'Lo pide en su app; al dueño le llega un aviso al celular para decir sí o no.'),
    ('Olvidé mi PIN.', 'En la pantalla del PIN toca <b>"¿Olvidaste tu PIN?"</b>: al administrador le llega el aviso y te lo reinicia.'),
    ('El celular va lento o gasta pila.', 'En Ajustes activa "Modo ahorro": quita animaciones.'),
]:
    S_ += [KeepTogether([P(q, 'h2'), P(a)])]
S_ += [Spacer(1, 14), cuadro(['¿Algo no está en este manual? Repórtalo desde la app y se agrega.'])]
m.build(S_)
print('listo')
