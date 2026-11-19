/* ===================== TEMA · Pantallas angostas (nació como tema, 19 nov · punto 161) =====================
   Ricardo: "la información se desborda de la pantalla; pasa en celulares con pantalla angosta como la de enfrente del Z Fold (y con la
   letra grande); en otros teléfonos no". Las tarjetas de 2 o 3 columnas (Existencias en bodega, precios de Inicio…) no se podían encoger
   más que su contenido (número grande + "cajas"/"kg") y se salían por la derecha.
   - Cualquier columna de una cuadrícula puede encogerse (min-width:0) y su texto se parte si no cabe.
   - En pantallas de 380 px o menos: los números grandes de las tarjetas se achican un poco, la unidad ("cajas", "kg") puede bajar de renglón,
     el puntito de color de las tarjetas se quita (el nombre ya va en ese color) y los renglones "izquierda · derecha" pueden partirse en dos.
     Una palabra que no cabe se corta con guion donde va en español.
   - Ningún dibujo, imagen, mapa o campo es más ancho que la pantalla; en pantallas angostas, si un campo no cabe junto a su nombre, baja
     al renglón de abajo.
   Solo estilos: no cambia ningún dato ni ninguna cuenta. Se arma al final. Si se cambia algo de esto, se cambia AQUÍ.
   ============================================================================================ */
/* el idioma de la página: para que una palabra larga que no cabe se corte con guion donde va en español ("madu-ración") */
try{if(!document.documentElement.lang)document.documentElement.lang='es'}catch(e){}
(function(){var st=document.createElement('style');st.id='css161';st.textContent=[
 'main [style*="display:grid"]>*,main .g3>*,main .g2>*,main .tile{min-width:0}',
 'main .tile .k,main .tile .big,main .tile .u{overflow-wrap:break-word;hyphens:auto;-webkit-hyphens:auto}',
 'main .tile .u{display:inline-block}',
 'main svg,main img,main canvas,main video,main iframe{max-width:100%}',
 'main svg:not([height]){height:auto}',
 'main input,main select,main textarea{max-width:100%}',
 'main .grow,main [style*="display:flex"]>*{min-width:0}',
 '@media (max-width:380px){',
 ' main .g3 .tile{padding:9px 7px}',
 ' main .g3 .tile .big,main .n65 .g3 .big{font-size:clamp(17px,6.2vw,22px)}',
 ' main .g3 .tile .k,main .n65 .g3 .k{font-size:11.5px;line-height:1.2}',
 ' main .g3 .tile .u{font-size:12px;margin-left:2px}',
 ' main .tile .dot{flex:none}',
 ' main .g3 .tile .dot{display:none}',
 ' main [style*="justify-content:space-between"]{flex-wrap:wrap;column-gap:8px}',
 ' main .field{flex-wrap:wrap;row-gap:4px}',
 ' main .field>input,main .field>select{flex:0 1 auto;min-width:0}',
 '}',
 '@media (max-width:320px){',
 ' main .g3 .tile .big,main .n65 .g3 .big{font-size:17px}',
 ' main .g3 .tile .u{display:block;margin-left:0}',
 ' main .vcard .plate.mini,main .vchof .plate.mini{width:100%!important;max-width:84px!important}',
 '}'].join('\n');document.head.appendChild(st)})();
