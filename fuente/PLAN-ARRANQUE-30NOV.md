# Plan de arranque · lunes 30 de noviembre de 2026

> **Para la IA que lea esto:** léelo junto con la sección 0 de `fuente/CONTEXTO-PARA-OTRA-IA.md`. Aquí están TODAS las decisiones que
> Ricardo (hijo) tomó el 24 de noviembre en una entrevista. Hay que hablarle SIEMPRE en español sencillo, con preguntas de opción
> múltiple cuando haya dudas. Regla: no publicar hasta que diga "publica". Numeración nueva: el siguiente punto es el **33**.

## Quiénes y dónde
- **Ricardo Nieto (papá):** dueño. Está en **Veracruz** (Banderilla). Persona mayor, poco tecnológica. Usará la app en su celular.
- **Ricardo (hijo):** administrador y **desarrollador** de la app. Está en **Tijuana**. Prueba en su celular y en la web.
- Ricardo no puede ayudar en persona: todo tiene que poder hacerlo el papá solo, con apoyo a distancia.

## Fechas
| Día | Qué pasa |
| :-- | :-- |
| Mar 24 – Jue 26 | Programar y probar todo (abajo). Ricardo prueba el APK conforme salga. |
| Vie 27 | Publicar versión con todo; instalar el APK nuevo en todos los celulares; imprimir las hojas de ayuda. |
| Sáb 28 | El papá hace la configuración inicial con datos REALES (se empieza de cero; antes se guarda respaldo de lo de prueba). Ricardo lo apoya desde Tijuana **con su propio usuario** (no con el del papá). |
| Dom 29 | **Ensayo**: el papá y un chofer en Veracruz hacen un día de mentira; Ricardo lo sigue en vivo. Después se borra. |
| Lun 30 | Arrancan todos (papá y choferes). **Primera semana con libreta en paralelo** para comparar cada noche. |
| Semanas 1–2 | Piloto de Bodega más fácil (ver `concepts_brief.md`), cuando Ricardo mande sus notas de las 7 tareas. |

Ricardo pidió **"todo o nada"**: no se entrega a medias. Si algo no queda bien probado, avisarle el jueves para que decida si se mueve el arranque.

## Lo que se hace antes del lunes
1. **Periodo de arranque (2 semanas, solo Bodega).** Taras vacías, llenas, en maduración y maduras, y kilos de macho se capturan
   aproximados. Cada diferencia que salga al contar en esas 2 semanas se anota como **"ajuste de arranque"**: no es merma, ni faltante,
   ni descuento al chofer. Las taras con clientes, las deudas de clientes y el efectivo cuentan EXACTO desde el día 1.
2. **Configuración inicial para que la haga el papá solo**, por pasos y clara. Ricardo puede apoyar a distancia con su usuario
   (agregar clientes, etc.). Si dos están en la configuración inicial a la vez, la app avisa.
3. **Sueldo del dueño:** al crear un gasto fijo, opción **"Es el sueldo del dueño (no es gasto del negocio)"** (retiro: baja la caja,
   no la ganancia). Hoy solo la demo lo trae (`retiro:true`); en la versión real no había forma de marcarlo.
4. **Entrevista "💰 Mi sueldo"** (por pasos, una pregunta por pantalla), se ofrece **al día 1 o 2** después de lo básico, y siempre
   en Más → "Mi sueldo": su casa (cuántos viven, despensa, comida fuera, servicios, renta), su carro particular (gasolina, seguro,
   servicio, tenencia, uso para el negocio), salud y escuela, deudas personales, ahorro e imprevistos, el negocio (ventas por semana
   aprox., días de trabajo). Resultado: lo que necesita, lo que el negocio puede pagar y el **sueldo sugerido = lo menor + colchón
   (~20% para el negocio)**. El primer día se ACEPTA lo que él diga aunque el negocio deje menos, mostrándole claro cuánto se come del
   capital.
5. **Revisión del sueldo cada quincena** (cuando cobra): tarjeta "💰 Tu sueldo y el negocio" verde / amarillo / rojo con el promedio
   de las últimas 4 semanas. Si va en rojo 2 quincenas seguidas sugiere bajarlo y también las otras salidas (precio, cobranza,
   gastos, merma); si sobra 2 quincenas seguidas (con colchón guardado) sugiere subirlo. Él decide: Bajarlo/Subirlo · Dejarlo así ·
   Recordarme la próxima.
6. **Su carro particular:** sus gastos son personales (salen de su sueldo). Botón "Usé mi carro para el negocio": el negocio le paga
   esa gasolina.
7. **Caja:** UNA sola caja ("Efectivo en caja"), aunque el dinero esté en su casa. "Pasé $X al banco" cuando deposite para pagar por
   transferencia. **Cierre de caja cada sábado** (recordatorio junto con su sueldo).
8. **Apartado semanal** para aguinaldo y vacaciones (se marca en la caja como "apartado"; el dinero no se mueve).
9. **Aguinaldo pulido** (ya existe el cálculo por ley, punto 118 de antes, `tema-sueldos.js`): pagos parciales (mitad antes del 20 de
   noviembre, el resto ANTES del 20 de diciembre, como pide la ley), ajuste a mano con motivo, desglose del cálculo (salario diario,
   días trabajados, faltas) y recordatorios. Este año no lo van a manejar con la app, pero el módulo debe quedar completo.
10. **Recibo de pago del chofer:** imagen con logo y desglose (días, faltas, comisión, descuentos, aguinaldo, vacaciones) que se manda
    por WhatsApp al pagarle (como la nota de remisión).
11. **Reporte de errores para todos** (ya existe "🐞 Reportar un problema", punto 56 de antes, `l70.js`): abrir al **sacudir +
    confirmar** ("¿Reportar un problema?"; no se activa con el camión en movimiento, ahí solo el botón del menú); **captura automática
    desde la app** (sin APK nuevo; puede salir sin mapas o fotos de la nube); **dibujar encima** con el dedo (rojo, Deshacer);
    **dictar** (micrófono del teclado) y **grabar audio**; se guarda en la app y **abre WhatsApp** al número que Ricardo ponga en
    Ajustes.
12. **Perfil de desarrollador** solo para el usuario de Ricardo (es administrador + desarrollador; la marca la pone el dueño de la
    cuenta, porque nadie se sube de nivel a sí mismo). Pantalla con: todos los reportes con su captura (marcar arreglado), errores
    automáticos, "Mandar todo a Claude" (paquete sin nombres de clientes) y estado de cada celular (versión, última subida, avisos,
    batería). Los datos personales del sueldo solo los ven el dueño y el desarrollador (también en las reglas de la nube); otros
    administradores futuros, no.
13. **Avisos al celular de Ricardo** cuando hay un reporte, un error automático o una cuenta que no cuadra.
14. **Hoja de ayuda (PDF para imprimir):** una para el dueño y otra para los choferes, con los pasos del día y cómo reportar un error.
15. **APK nuevo** (permiso de micrófono para el audio). Ricardo lo prueba conforme salga.

## Otras decisiones de ese día
- Reporte de errores: **todos** lo pueden usar; va a la app + WhatsApp.
- Revisión de pantallas (Bodega, Cargas, Clientes): ver `concepts_brief.md` (revisado por 7 revisores). Piloto solo en Bodega primero.
- Lista de 7 tareas que Ricardo hace en su celular ANTES del piloto (sin tocar el último botón en las que mueven dinero o cajas):
  ver cajas maduras · meter a madurar · contar bodega · recibir carga con vacías · pagar al proveedor · ver deuda y empezar abono ·
  corregir teléfono de un cliente. Por cada una anota: ¿sin preguntar?, ¿dónde dudé?, ¿bajé mucho?, ¿qué sobraba o faltaba?
- Lista de pruebas en celulares reales que faltan: GPS y "ya llegó a la bodega", notificaciones con la app cerrada, cámara, sin señal,
  dos celulares a la vez, celular viejo, día completo de chofer, avisos al admin a las 8/9/14/17/21.

## Cómo recuperar todo en una conversación nueva
Escribir: **"Lee primero la sección 0 de fuente/CONTEXTO-PARA-OTRA-IA.md y fuente/PLAN-ARRANQUE-30NOV.md, y sigue el plan."**
Los dos archivos están en el repositorio (rama `main` y la rama de trabajo), así que no se pierden aunque se acabe la conversación.
