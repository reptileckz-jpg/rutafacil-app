/* ===================== TEMA · Fichas del personal y de clientes (aplanado el 18 nov) =====================
   Antes estaba repartido en 24 envolturas encadenadas en l13, l14, l15, l19, l20, l23, l27, l35, l36, l40, l41, l44, l52, l63, l69, l70.
   Aquí está todo junto, en el MISMO orden, y hace exactamente lo mismo (comprobado con pruebas/comp-fichas.js).
   Se arma justo después de l90 (antes de los otros temas).
   Si se cambia algo de estas fichas, se cambia AQUÍ (no se agregan envolturas en capas nuevas).

   - fiEmp: la ficha de cada empleado (datos, documentos, crédito de sus clientes, sueldo…) (9 pasos).
   - fiCli: la ficha de cada cliente (5 pasos).
   - mayHistHTML: el buró y el historial de mayoreo del cliente (4 pasos).
   - permsHTML: los permisos que piden los choferes (fiar, mayoreo) (6 pasos).
   Las funciones que usan los pasos siguen en su capa.
   ============================================================================================ */

/* permsHTML · de l13 */
var _perms13=permsHTML;permsHTML=function(){var h=_perms13.apply(this,arguments);if(S.role!=='admin')return h;mayVencer();var L=[];mayPideL().forEach(function(p,i){if(p.est==='pend')L.push([p,i])});if(!L.length)return h;
 return h+'<div class="card alert" style="padding:10px 12px;border-width:2px"><b class="neg">Piden permiso para mayoreo</b>'+L.map(function(x){var p=x[0],c=cl(p.c),seg=Math.max(0,Math.ceil((MAY_ESPERA-(Date.now()-p.t))/1000)),pn=num(c.ppR)||num(S.precio.R),pm=num(c.ppM)||num(S.precio.M);
  return '<div style="border-top:1px solid var(--line);padding:8px 0"><b>'+esc(chofN(p.ch))+'</b> quiere darle mayoreo a <b>'+esc(c.n)+'</b><div class="lbl">'+(p.R?p.R+' cajas a '+money(p.pR)+' (normal '+money(pn)+')':'')+(p.R&&p.M?' · ':'')+(p.M?p.M+' kg a '+f2(p.pM)+' (normal '+f2(pm)+')':'')+' · si no contestas en '+Math.ceil(seg/60)+' min se vende normal</div><div style="display:flex;gap:8px;margin-top:6px"><button class="btn sm" style="flex:1" data-act="mayok" data-i="'+x[1]+'">Sí, hoy sí</button><button class="btn sm sec" style="flex:1" data-act="mayneg" data-i="'+x[1]+'">No</button></div></div>'}).join('')+'</div>'};

/* mayHistHTML · de l13 */
var _mayH13=mayHistHTML;mayHistHTML=function(c){var h=_mayH13.apply(this,arguments);if(S.role!=='admin'||!c)return h;
 return h+(c.mayNo?'<div class="lbl" style="margin:6px 0">No se le da mayoreo · <button class="link" data-act="maysi" data-id="'+c.id+'">Permitir otra vez</button></div>':'')};

/* permsHTML · de l13 */
var _perms13b=permsHTML;permsHTML=function(){return _perms13b.apply(this,arguments).replace(/ · si no contestas en \d+ min se vende normal<\/div>(<div style="display:flex;gap:8px;margin-top:6px"><button class="btn sm" style="flex:1" data-act="mayok" data-i="(\d+)")/g,function(m,rest,i){var p=mayPideL()[+i];return '</div><div class="lbl" style="margin-top:4px">Se vende a precio normal en <b data-mayt="'+p.t+'" style="font-variant-numeric:tabular-nums">'+mayRelojTxt(p.t)+'</b></div>'+rest})};

/* permsHTML · de l14 */
var _perms14=permsHTML;permsHTML=function(){var h=_perms14.apply(this,arguments);if(S.role!=='admin')return h;return h+gxRevHTML(false)};

/* fiEmp · de l15 */
var _fiEmp15=fiEmp;fiEmp=function(f){var h=_fiEmp15.apply(this,arguments);return h.replace(/<div class="field"><label for="ch(\d+)(r1p|r2p|emp)">Parentesco<\/label><input[^>]*><\/div>/g,function(m,id,k){return parHTML('ch:'+id+':'+k)})};

/* mayHistHTML · de l19 */
var _mh19=mayHistHTML;mayHistHTML=function(c){var h=_mh19.apply(this,arguments);if(!c||c.oculto)return h;var b=buroDe(c),cf=crCfg();
 return '<div class="card note" style="padding:10px 12px;margin:6px 0"><b>Buró</b> '+buroPill(c)+'<div class="lbl" style="margin-top:4px">Límite '+money(limEf(c))+(c.limMan!=null?' · excepción tuya: '+money(limBase(c)):'')+(b.porque&&b.n?' · '+esc(b.porque):'')+(b.n&&b.n<3?' · sube al liquidar a tiempo '+(3-b.ok)+' vez(es) más':'')+(b.n===3?' · sin crédito hasta que pague todo':'')+'</div>'+(S.role==='admin'&&b.n?'<button class="link" data-act="buroreset" data-id="'+c.id+'">Perdonar y regresar a Bueno</button>':'')+'</div>'+h};

/* permsHTML · de l19 */
var _perms19=permsHTML;permsHTML=function(){return _perms19.apply(this,arguments)+mayRevHTML()+limRevHTML()};

/* permsHTML · de l20 */
var _perms20=permsHTML;permsHTML=function(){return _perms20.apply(this,arguments)+chBuroHTML()};

/* permsHTML · de l20 */
var _perms20b=permsHTML;permsHTML=function(){return _perms20b.apply(this,arguments)+mayBajoHTML()};

/* fiCli · de l23 */
var _fiCli23=fiCli;fiCli=function(f){var h=_fiCli23.apply(this,arguments),c=cl(f.id);if(!c)return h;
 var foto=c.foto,inp='<input id="fhx'+c.id+'" type="file" accept="image/*" capture="environment" data-fach="'+c.id+'" style="position:absolute;opacity:0;width:1px;height:1px;pointer-events:none">';
 if(foto)h=h.replace('<div class="fihero"><span class="avt"','<div class="fihero confoto"><div class="clifoto" style="background-image:url(\''+foto+'\')"><label class="clicam" for="fhx'+c.id+'">📷 Cambiar foto</label>'+inp+'</div><span class="avt"');
 else h=h.replace(/(<div class="fihero"><span class="avt"[^>]*>[^<]*<\/span>)/,'$1<label class="btn sm sec" for="fhx'+c.id+'" style="display:inline-flex;align-items:center;cursor:pointer;width:auto">📷 Foto de la fachada</label>'+inp);
 return h};

/* mayHistHTML · de l23 */
var _mh23=mayHistHTML;mayHistHTML=function(c){var h=_mh23.apply(this,arguments);if(!c||S.role!=='admin')return h;
 return h.replace('<div class="card note" style="padding:10px 12px;margin:6px 0"><b>Buró</b>','<div class="card note buroc" role="button" tabindex="0" data-act="cropen" data-id="'+c.id+'" style="padding:10px 12px;margin:6px 0"><span class="ir">›</span><b>Buró y crédito</b>').replace('<button class="link" data-act="buroreset" data-id="'+c.id+'">Perdonar y regresar a Bueno</button>','')};

/* fiEmp · de l27 */
var _fiE27=fiEmp;fiEmp=function(f){var h=_fiE27.apply(this,arguments);try{if(S.role!=='admin')return h;var ch=S.choferes.filter(function(x){return x.id===f.id})[0];if(!ch||!esCh(ch)||esAdm(ch)||S.chEdit===ch.id)return h;
 if(!/data-fi="[^"]*:dat"/.test(h))return h;var i=h.lastIndexOf('</div></div></div>');return i<0?h:h.slice(0,i)+chCredCard(ch)+h.slice(i)}catch(e){return h}};

/* fiCli · de l27 */
var _fiC27=fiCli;fiCli=function(f){var h=_fiC27.apply(this,arguments),c=cl(f.id);if(!c||S.role!=='admin')return h;try{
 var old=rw('Teléfono',c.tel?esc(c.tel):'sin registrar');if(h.indexOf(old)>-1&&c.tel){var dc=telDeChofer(c),ok=telConfOk(c);
  var nv=rw('Teléfono',esc(c.tel))+'<div style="margin:-2px 0 8px;font-size:14px">'+(dc?'<div class="neg">⚠ Es el teléfono de '+esc(dc.n)+', no del cliente</div>':'')+(ok?'<span style="color:var(--accent)">✓ Número confirmado '+hace(c.telConf.t)+'</span>':'<span class="neg">Sin confirmar</span>'+(c.telPor?' <span class="lbl">· lo puso '+esc(chofN(c.telPor))+'</span>':'')+' <button class="btn sm" style="width:auto;margin-left:6px" data-act="telconf" data-id="'+c.id+'">Confirmar número</button>')+'</div>';
  h=h.replace(old,nv)}
 var oldL=rw('Límite de crédito',c.lim?money(c.lim):'sin límite');if(h.indexOf(oldL)>-1){var ch=chCredDe(c);h=h.replace(oldL,rw('Límite de crédito',money(limEf(c))+'<br><span class="lbl">'+(c.limMan!=null?'excepción tuya':(ch?'el de los clientes de '+esc(ch.n):'el de Ajustes'))+(buroDe(c).n?' · bajado por el buró':'')+'</span>'))}}catch(e){}return h};

/* fiEmp · de l35 */
var _fiE35=fiEmp;fiEmp=function(f){var h=_fiE35.apply(this,arguments),c=S.choferes.filter(function(x){return x.id===f.id})[0];if(!c||esAdm(c))return h;try{
 h=h.replace(chImg(c,'ine','INE'),chImg(c,'ine','INE (frente)')+chImg(c,'ineR','INE (reverso)')).replace(chImg(c,'lic','Licencia'),chImg(c,'lic','Licencia (frente)')+chImg(c,'licR','Licencia (reverso)'));
 h=h.replace(chView(c,'ine','INE'),chView(c,'ine','INE (frente)')+chView(c,'ineR','INE (reverso)')).replace(chView(c,'lic','Licencia de conducir'),chView(c,'lic','Licencia (frente)')+chView(c,'licR','Licencia (reverso)'));
 h=h.replace('<div style="display:flex;gap:10px;margin:8px 0">','<div class="chfotos" style="display:flex;gap:10px;margin:8px 0">').replace('<div style="display:flex;gap:10px;margin:4px 0 8px">','<div class="chfotos" style="display:flex;gap:10px;margin:4px 0 8px">')}catch(e){}return h};

/* fiEmp · de l36 */
var _fiE36=fiEmp;fiEmp=function(f){var h=_fiE36.apply(this,arguments);try{if(S.role!=='admin'||S.encOn)return h;var ch=S.choferes.filter(function(x){return x.id===f.id})[0];if(!ch||esAdm(ch)||S.chEdit===ch.id||!/data-fi="[^"]*:dat"/.test(h))return h;var i=h.lastIndexOf('</div></div></div>');
 var c=ch.baja?'<div class="card note"><b>Dado de baja</b><div class="lbl">'+esc(ch.bajaF?fmtF(ch.bajaF):'')+'</div><button class="btn sm sec" style="margin-top:8px" data-act="bjreact" data-id="'+ch.id+'">Volver a darlo de alta</button></div>':'<button class="link" style="color:var(--danger);margin:10px 0" data-act="bjabre" data-id="'+ch.id+'">Dar de baja a '+esc(ch.n)+'</button>';return i<0?h:h.slice(0,i)+c+h.slice(i)}catch(e){return h}};

/* fiEmp · de l40 */
var _fiE40=fiEmp;fiEmp=function(f){var h=_fiE40.apply(this,arguments);try{if(S.role!=='admin'||S.encOn)return h;var ch=S.choferes.filter(function(x){return x.id===f.id})[0];if(!ch||esAdm(ch)||!esCh(ch)||ch.baja||S.chEdit===ch.id||!/data-act="bjabre"/.test(h))return h;
 var c='<div class="card"><b>Después de su cierre</b><div class="lbl">Si quiere cargar más o dar otra vuelta:</div><div class="chips" role="group" aria-label="Permiso para seguir" style="margin-top:6px"><button data-act="segperm" data-id="'+ch.id+'" data-v="0" aria-pressed="'+!ch.segPerm+'">Sigue solo (te avisa)</button><button data-act="segperm" data-id="'+ch.id+'" data-v="1" aria-pressed="'+!!ch.segPerm+'">Me pide permiso</button></div></div>';
 return h.replace(/(<button class="link" style="color:var\(--danger\);margin:10px 0" data-act="bjabre")/,c+'$1')}catch(e){return h}};

/* fiEmp · de l40 */
var _fiE40b=fiEmp;fiEmp=function(f){var h=_fiE40b.apply(this,arguments);try{if(S.role!=='admin')return h;var ch=S.choferes.filter(function(x){return x.id===f.id})[0];if(!ch||!esCh(ch)||esAdm(ch)||ch.baja||!/data-fi="[^"]*:ruta"[^>]*aria-selected="true"|data-k="ruta"/.test(h)&&!pendDe(ch.id).length)return h;
 if(!pendDe(ch.id).length||h.indexOf('data-act="pasar"')>-1)return h;var i=h.lastIndexOf('</div></div></div>');var c='<button class="btn sec" style="margin:10px 0" data-act="pasar" data-id="'+ch.id+'">Pasar su ruta a otro chofer (solo hoy)</button>';return i<0?h:h.slice(0,i)+c+h.slice(i)}catch(e){return h}};

/* mayHistHTML · de l41 */
var _mh41=mayHistHTML;mayHistHTML=function(c){var h=_mh41.apply(this,arguments);if(S.role==='admin'||!c||credActivo(c))return h;return h.replace(/^<div class="card note" style="padding:10px 12px;margin:6px 0"><b>Buró<\/b>[\s\S]*?<\/div><\/div>/,'')};

/* fiCli · de l41 */
var _fiC41=fiCli;fiCli=function(f){var h=_fiC41.apply(this,arguments),c=cl(f.id);if(!c||S.role!=='rep'||c.rapida)return h;var fl=ubCliFalta(c);if(!ubTiene(c))fl.unshift('ubicación');if(!fl.length)return h;
 var card='<div class="card note"><b>Le falta: '+esc(fl.join(', '))+'</b><div class="lbl">Puedes agregar lo que falta (lo que ya tiene no se cambia).</div><button class="btn sm" style="margin-top:8px" data-act="ubcli" data-id="'+c.id+'" data-m="'+(ubTiene(c)?'datos':'gps')+'">Completar datos</button></div>';
 var i=h.indexOf('<div class="card');return i<0?h+card:h.slice(0,i)+card+h.slice(i)};

/* fiCli · de l44 */
var _fiC44=fiCli;fiCli=function(f){var h=_fiC44.apply(this,arguments),c=cl(f.id);if(!c||!qrOn()||c.rapida)return h;
 var q='<div class="card" data-key="cliqr" style="text-align:center"><b>QR de '+esc(c.n)+'</b><div style="margin:8px auto;width:150px">'+QR.svg(cliQR(c),150)+'</div>'+(c.qr?'<div class="lbl">✓ Pegado el '+fmtF(c.qr.f)+(c.qr.q?' por '+esc(c.qr.q):'')+'</div>':'<div class="lbl neg">Falta pegarlo</div>')
  +'<div style="display:flex;gap:8px;justify-content:center;flex-wrap:wrap;margin-top:8px">'+(imprOk()?'<button class="btn sm sec" style="width:auto" data-act="qrimp" data-id="'+c.id+'">Imprimir etiqueta</button>':'')+(c.qr?'':'<button class="btn sm" style="width:auto" data-act="qrpuesto" data-id="'+c.id+'">Ya lo pegué</button>')+'</div></div>';var i=h.lastIndexOf('</div></div></div>');return i<0?h+q:h.slice(0,i)+q+h.slice(i)};

/* fiEmp · de l52 */
var _fiEmp52=fiEmp;fiEmp=function(f){var h=_fiEmp52.apply(this,arguments);if(S.chEdit===f.id||(S.fiTab||{})['emp:'+f.id]!=='ruta')return h;var c=(S.choferes||[]).filter(function(x){return x.id===f.id})[0];var g=c?gpsRutaHTML(c):'';if(!g)return h;return h.replace(/<\/div><\/div><\/div>$/,g+'</div></div></div>')};

/* fiEmp · de l63 */
var _fiE63=fiEmp;fiEmp=function(f){var h=_fiE63.apply(this,arguments);try{if(S.role!=='admin'||S.encOn)return h;var c=cl0(f.id);if(!c||!esCh(c)||esAdm(c)||(S.fiTab||{})['emp:'+f.id]==='ruta')return h;
 var row='<div class="card" data-key="chcomida"><div class="row"><span><b>Puede agregar comida</b><br><span class="lbl">Solo si ya lo acordaron. Si está en No, no le sale la opción.</span></span><button class="btn sm'+(c.comida?'':' sec')+'" style="width:auto" data-act="chcomida" data-id="'+c.id+'">'+(c.comida?'Sí':'No')+'</button></div></div>';
 var i=h.lastIndexOf('</div></div></div>');return i>-1?h.slice(0,i)+row+h.slice(i):h+row}catch(e){return h}};

/* fiEmp · de l69 */
var _fiE69=fiEmp;fiEmp=function(f){var h=_fiE69.apply(this,arguments);try{if(S.role!=='admin'||S.encOn)return h;var c=cl0(f.id);if(!c||!c.comida)return h;
  var add='<div class="field" style="margin-top:6px"><label for="chcp'+c.id+'">Presupuesto diario de comida $</label><input id="chcp'+c.id+'" type="number" inputmode="decimal" min="0" data-ch68="'+c.id+'" value="'+esc(c.comidaMax==null?'':c.comidaMax)+'" placeholder="sin tope"></div>';
  return h.replace(/(data-act="chcomida"[^>]*>[^<]*<\/button><\/div>)/,'$1'+add)}catch(e){return h}};

/* fiCli · de l70 */
var _fiCl70=fiCli;fiCli=function(f){var h=_fiCl70.apply(this,arguments);try{if(S.role!=='admin'||((S.fiTab||{})['cli:'+f.id]||'cta')!=='dat')return h;var c=cl(f.id),ok=c&&c.lat!=null;
  var cd='<div class="card"><b>📍 Ubicación</b><div class="lbl">'+(ok?c.lat+', '+c.lng+(c.locBy?' · '+esc(c.locBy):''):'Sin ubicación todavía')+'</div><button class="btn sm" style="width:100%;margin-top:6px;min-height:50px" data-act="ub68" data-t="cli" data-id="'+f.id+'">'+(ok?'Buscar o corregir en el mapa':'Poner la ubicación')+'</button></div>';
  var i=h.lastIndexOf('</div></div>');return i>-1?h.slice(0,i)+cd+h.slice(i):h+cd}catch(e){return h}};
