/* ===================== TEMA · Personal y cuentas de sueldo (aplanado el 18 nov) =====================
   Antes estaba repartido en 11 envolturas encadenadas en l13, l15, l18, l20, l29, l46, l50, l52.
   Aquí está todo junto, en el MISMO orden, y hace exactamente lo mismo (comprobado con pruebas/comp-sueldos.js y t118).
   Se arma justo después de tema-ubica.js (antes de los otros temas; tema-sueldos.js y tema-pantallas.js se arman después y siguen envolviendo).
   Si se cambia algo de esto, se cambia AQUÍ (no se agregan envolturas en capas nuevas).

   - szCalc y szDesg (de l18): YA NO SE USAN. tema-sueldos.js (punto 118) las rehace completas y se arma después.
     Se dejan aquí solo para no cambiar nada; al pasar a Vite se pueden quitar.
   - szRes: el resumen del sueldo (comisión de mayoreo, faltantes por descontar) — TOCA DINERO.
   - sueldos: la pantalla de Sueldos (campos de comisión y adelantos).
   - personal: la pantalla del personal (agregar, accesos de la nube, ficha abierta).
   - fichaHTML: las fichas como tarjetas.
   ============================================================================================ */

/* sueldos · de l13 */
var _suel13=sueldos;sueldos=function(){var h=_suel13.apply(this,arguments);
 return h.replace(/<div class="field" style="margin-top:6px"><label for="adl_(\d+)"/g,function(m,id){var ch=chofById(id);if(!ch)return m;var n=mayRech30(ch.id);
  return '<div class="row" style="margin-top:6px"><span>Mayoreo<br><span class="lbl">'+(ch.mayPerm?'Solo con tu permiso':'Lo puede dar sin pedirte permiso')+(n?' · '+n+' no aprobado'+(n>1?'s':'')+' en 30 días':'')+'</span></span><button class="btn sm sec" style="width:auto" data-act="mayperm" data-id="'+ch.id+'" data-v="'+(ch.mayPerm?'0':'1')+'">'+(ch.mayPerm?'Quitar permiso':'Pedir permiso')+'</button></div>'+m})};

/* personal · de l15 */
var _pers15=personal;personal=function(){var h=_pers15.apply(this,arguments),a=h.indexOf('<div class="card"><b>Agregar a alguien del personal</b>');if(a<0)a=h.indexOf('<div class="card"><b>Agregar chofer o personal</b>');if(a<0)return h;
 var e=h.indexOf('data-act="addch"',a);e=h.indexOf('</div>',e)+6;
 return h.slice(0,a)+'<button class="card npadd" data-act="npopen"><span class="ic">+</span><span class="grow"><b style="font-size:17px">Agregar a alguien nuevo</b><br><span class="lbl">Chofer, ayudante, bodega, venta local…</span></span><span style="font-size:22px">›</span></button>'+h.slice(e)};

/* szCalc · de l18 */
var _szC18=szCalc;szCalc=function(c){var k=_szC18.apply(this,arguments),z=c.sz;if(z.tipo!=='base')return k;
 var viejo=k.cv*num(z.comC)+k.kv*num(z.comK),hoy=comHoyDe(c),com=r2(comPrevia(c)+hoy);k.cob=r2(num(z.cob)+cobHoy(c));k.com=com;k.comHoy=hoy;k.br=r2(k.br-viejo+com);k.pagar=Math.max(0,k.br-k.ad-k.fa);k.resto=Math.max(0,k.ad+k.fa-k.br);return k};

/* szDesg · de l18 */
var _szD18=szDesg;szDesg=function(c){var h=_szD18.apply(this,arguments),z=c.sz;if(z.tipo!=='base')return h;var k=szCalc(c),may=S.log.filter(function(l){return comMitad(l)<1}).length;
 var t=comModo(c)==='pct'?(num(z.comP)+'% de lo cobrado ('+money(k.cob)+')'):(money(num(z.comC))+' por caja y '+money(num(z.comK))+' por kilo cobrados');
 return h.replace(/<div class="row"><span>Comisión<br><span class="lbl">[^<]*<\/span><\/span><b[^>]*>[^<]*<\/b><\/div>/,rw('Comisión<br><span class="lbl">'+t+(may?' · '+may+' con mayoreo a mano (pagan la mitad)':'')+'</span>',money(k.com)))};

/* sueldos · de l18 */
var _suel18=sueldos;sueldos=function(){var h=_suel18.apply(this,arguments);
 return h.replace(/<div class="field"><label for="sz(\d+)comC">[^<]*<\/label><input[^>]*><\/div><div class="field"><label for="sz\d+comK">[^<]*<\/label><input[^>]*><\/div>/g,function(m,id){var c=S.choferes.filter(function(x){return x.id===+id})[0];if(!c)return m;var pc=comModo(c)==='pct';
  return '<div class="lbl" style="margin-top:6px"><b>Comisión</b></div><div class="chips" role="group" style="margin:6px 0"><button data-act="commodo" data-id="'+id+'" data-v="unidad" aria-pressed="'+!pc+'">Por caja y kilo</button><button data-act="commodo" data-id="'+id+'" data-v="pct" aria-pressed="'+pc+'">Por porcentaje</button></div>'
   +(pc?szField(c,'comP','% de lo cobrado'):szField(c,'comC','Por caja cobrada $')+szField(c,'comK','Por kilo cobrado $'))
   +'<div class="lbl">Cuenta cuando el dinero entra: contado y abonos. Lo fiado cuenta hasta que se cobra. El mayoreo que da a mano paga la mitad.</div>'})};

/* szRes · de l18 */
var _szR18=szRes;szRes=function(c){var h=_szR18.apply(this,arguments);if(c.sz.tipo!=='base')return h;var k=szCalc(c);return h.replace(/<div class="row"><span>Vendió esta semana<\/span><b[^>]*>[^<]*<\/b><\/div>/,rw('Cobró esta semana',money(k.cob)))};

/* sueldos · de l20 */
var _suel20=sueldos;sueldos=function(){var h=_suel20.apply(this,arguments);
 return h.replace(/(<div class="field"><label for="adl_(\d+)")/g,function(m,all,id){var ch=S.choferes.filter(function(x){return x.id===+id})[0];if(!ch||(ch.puesto||'chofer')!=='chofer')return m;var bb=chBuro(ch);
  return '<div class="field"><label for="crm'+id+'">Tope de crédito (lo que le pueden deber sus clientes) $</label><input id="crm'+id+'" type="number" inputmode="decimal" min="0" data-crmax="'+id+'" value="'+esc(ch.crMax!=null&&ch.crMax!==''?ch.crMax:crCfg().crCh)+'"></div><div class="lbl">Le deben '+money(bb.tot)+(bb.atr>0?' · '+money(bb.atr)+' atrasado':'')+' · '+['🟢 cobra bien','🟡 se atrasa','🟠 cobra mal'][bb.n]+'</div>'+all})};

/* personal · de l29 */
var _pers29=personal;personal=function(){var h=_pers29.apply(this,arguments);var a=nbAccHTML();if(!a)return h;var i=h.indexOf('</h1>');return i<0?a+h:h.slice(0,i+5)+a+h.slice(i+5)};

/* fichaHTML · de l46 */
var _fH46=fichaHTML;fichaHTML=function(f){var h=_fH46.apply(this,arguments);return tarjetear(h,'.fibody')};

/* szRes · de l50 */
var _szRes50=szRes;szRes=function(c){var h=_szRes50.apply(this,arguments),L=(S.faltantes||[]).filter(function(f){return f.ch===c.id&&f.desc&&f.pend&&f.m>0.005});if(!L.length)return h;
 return h+'<div class="lbl" style="margin-top:4px">'+L.map(function(f){return '· '+esc(f.txt||('Faltante del '+fCorta(f.fecha)))+': −'+money(f.m)}).join('<br>')+'</div>'};

/* personal · de l52 */
var _pers52=personal;personal=function(){var h=_pers52.apply(this,arguments);if(S.openCh==null)return h;var c=(S.choferes||[]).filter(function(x){return x.id===S.openCh})[0];if(!c)return h;var g=gpsRutaHTML(c);if(!g)return h;
 var m='<div class="lbl" style="margin-top:10px"><b>Referencias</b></div>',i=h.indexOf(m);return i<0?h:h.slice(0,i)+g+h.slice(i)};
