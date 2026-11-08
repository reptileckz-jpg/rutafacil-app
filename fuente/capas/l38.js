/* ===================== v6.2 · Compartir y archivos: imagen directo al WhatsApp, Excel de verdad, respaldo,
   borrar datos de prueba y "✓ Guardado" en los campos ===================== */
function natPl38(){var C=window.Capacitor;return C&&C.Plugins&&C.Plugins.RutaNativa||null}
function b64De(dataUrl){return String(dataUrl).split(',')[1]||''}
function telDiez(t){var d=String(t||'').replace(/\D/g,'');if(d.length>10)d=d.slice(-10);return d}
/* manda una imagen: con la pieza nativa va directo al chat de ese número; si no, "Compartir" del celular; si no, regresa false */
function natCompartir(dataUrl,nombre,o){o=o||{};var n=natPl38();
 if(n&&n.compartir)return n.compartir({base64:b64De(dataUrl),nombre:nombre,mime:o.mime||'image/png',tel:o.tel?telDiez(o.tel):'',texto:o.texto||'',whatsapp:o.wa!==false}).then(function(){return true},function(e){console.error('compartir',e);return false});
 try{var bin=atob(b64De(dataUrl)),arr=new Uint8Array(bin.length);for(var i=0;i<bin.length;i++)arr[i]=bin.charCodeAt(i);var f=new File([arr],nombre,{type:o.mime||'image/png'});
  if(navigator.canShare&&navigator.canShare({files:[f]}))return navigator.share({files:[f]}).then(function(){return true},function(){return true})}catch(e){}
 return Promise.resolve(false)}
/* guarda un archivo en Descargas (o lo baja en la página de prueba) */
function natGuardar(b64,nombre,mime){var n=natPl38();if(n&&n.guardar)return n.guardar({base64:b64,nombre:nombre,mime:mime}).then(function(r){return r&&r.donde||'Descargas'});
 try{var a=document.createElement('a');a.href='data:'+mime+';base64,'+b64;a.download=nombre;document.body.appendChild(a);a.click();a.remove();return Promise.resolve('Descargas')}catch(e){return Promise.reject(e)}}
/* ---------- ticket al cliente: la IMAGEN va directo a su WhatsApp ---------- */
window.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act="tkwa"],[data-act="notawa"]');if(!b)return;var n=S.nota;if(!n)return;var a=b.dataset.act;
 var t=a==='tkwa'?tkTel(n):telDiez(n.tel||((S.cli.filter(function(x){return x.n===n.cli})[0]||{}).tel));
 if(a==='tkwa'&&t.length!==10)return; /* el manejador de siempre pide el número */
 e.stopImmediatePropagation();var c=S.cli.filter(function(x){return x.n===n.cli})[0];if(c&&!String(c.tel||'').replace(/\D/g,'')&&n.tel)c.tel=n.tel;
 var img;try{img=n.img=notaImg(n)}catch(er){img=null}
 var fin=function(ok){if(!ok){try{window.open('https://wa.me/52'+t+'?text='+encodeURIComponent(notaTxt(n)),'_blank')}catch(er){}}
  if(a==='tkwa'){n.waOk=true;if(imprOk())try{tkImprimir(n)}catch(er){}toast(imprOk()?'Ticket enviado e impreso':'Ticket enviado por WhatsApp')}else n.waFb=!ok&&!t;render()};
 if(img)natCompartir(img,'ticket-'+(n.folio||'')+'.png',{tel:t,texto:''}).then(fin);else fin(false)},true);
/* ---------- resumen para el proveedor: directo a su chat ---------- */
window.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act="vwprovimg"]');if(!b)return;e.stopImmediatePropagation();var pi=S.vw.par[+b.dataset.i],u=provImg(pi),d=(S.provDir||{})[pi.prov]||{};
 natCompartir(u,'resumen-'+pi.prov+'.png',{tel:d.tel||''}).then(function(ok){if(!ok){S.vw.provImg={i:+b.dataset.i,u:u};render()}})},true);
window.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act="imgguarda"]');if(!b)return;e.stopImmediatePropagation();var im=b.parentNode.querySelector('img');if(!im)return;
 natGuardar(b64De(im.src),'imagen-'+Date.now()+'.png','image/png').then(function(d){toast('Guardada en '+d)},function(){toast('No se pudo guardar')})},true);
/* ---------- Excel de verdad (.xlsx armado aquí mismo) ---------- */
var _crcT=null;function crc32(u){if(!_crcT){_crcT=[];for(var n=0;n<256;n++){var c=n;for(var k=0;k<8;k++)c=c&1?0xEDB88320^(c>>>1):c>>>1;_crcT[n]=c>>>0}}var x=0xFFFFFFFF;for(var i=0;i<u.length;i++)x=_crcT[(x^u[i])&255]^(x>>>8);return (x^0xFFFFFFFF)>>>0}
function utf8(s){return new TextEncoder().encode(s)}
function zipArma(files){var partes=[],cen=[],off=0;var le16=function(v){return [v&255,(v>>8)&255]},le32=function(v){return [v&255,(v>>8)&255,(v>>16)&255,(v>>>24)&255]};
 files.forEach(function(f){var nm=utf8(f.n),d=utf8(f.d),cr=crc32(d);
  var h=[].concat([0x50,0x4b,3,4],le16(20),le16(0x0800),le16(0),le16(0),le16(0x21),le32(cr),le32(d.length),le32(d.length),le16(nm.length),le16(0));
  partes.push(new Uint8Array(h),nm,d);
  cen.push(new Uint8Array([].concat([0x50,0x4b,1,2],le16(20),le16(20),le16(0x0800),le16(0),le16(0),le16(0x21),le32(cr),le32(d.length),le32(d.length),le16(nm.length),le16(0),le16(0),le16(0),le16(0),le32(0),le32(off))),nm);
  off+=h.length+nm.length+d.length});
 var cl=0;cen.forEach(function(x){cl+=x.length});var fin=new Uint8Array([].concat([0x50,0x4b,5,6],le16(0),le16(0),le16(files.length),le16(files.length),le32(cl),le32(off),le16(0)));
 var todo=partes.concat(cen,[fin]),tot=0;todo.forEach(function(x){tot+=x.length});var out=new Uint8Array(tot),p=0;todo.forEach(function(x){out.set(x,p);p+=x.length});return out}
function xmlE(s){return String(s==null?'':s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g,'')}
function xlsCol(i){var s='';i++;while(i>0){var m=(i-1)%26;s=String.fromCharCode(65+m)+s;i=Math.floor((i-1)/26)}return s}
function xlsHoja(filas){return '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"><sheetData>'+filas.map(function(f,r){return '<row r="'+(r+1)+'">'+f.map(function(v,c){var ref=xlsCol(c)+(r+1);if(typeof v==='number'&&isFinite(v))return '<c r="'+ref+'"'+(r===0?' s="1"':'')+'><v>'+v+'</v></c>';return '<c r="'+ref+'" t="inlineStr"'+(r===0?' s="1"':'')+'><is><t xml:space="preserve">'+xmlE(v)+'</t></is></c>'}).join('')+'</row>'}).join('')+'</sheetData></worksheet>'}
function xlsxArma(hojas){var ct='<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/><Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml"/>'+hojas.map(function(h,i){return '<Override PartName="/xl/worksheets/sheet'+(i+1)+'.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>'}).join('')+'</Types>';
 var F=[{n:'[Content_Types].xml',d:ct},{n:'_rels/.rels',d:'<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/></Relationships>'},
  {n:'xl/workbook.xml',d:'<?xml version="1.0" encoding="UTF-8" standalone="yes"?><workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"><sheets>'+hojas.map(function(h,i){return '<sheet name="'+xmlE(h.n.slice(0,31))+'" sheetId="'+(i+1)+'" r:id="rId'+(i+1)+'"/>'}).join('')+'</sheets></workbook>'},
  {n:'xl/_rels/workbook.xml.rels',d:'<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">'+hojas.map(function(h,i){return '<Relationship Id="rId'+(i+1)+'" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet'+(i+1)+'.xml"/>'}).join('')+'<Relationship Id="rId'+(hojas.length+1)+'" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/></Relationships>'},
  {n:'xl/styles.xml',d:'<?xml version="1.0" encoding="UTF-8" standalone="yes"?><styleSheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"><fonts count="2"><font><sz val="11"/><name val="Calibri"/></font><font><b/><sz val="11"/><name val="Calibri"/></font></fonts><fills count="2"><fill><patternFill patternType="none"/></fill><fill><patternFill patternType="gray125"/></fill></fills><borders count="1"><border/></borders><cellStyleXfs count="1"><xf/></cellStyleXfs><cellXfs count="2"><xf/><xf fontId="1" applyFont="1"/></cellXfs></styleSheet>'}];
 hojas.forEach(function(h,i){F.push({n:'xl/worksheets/sheet'+(i+1)+'.xml',d:xlsHoja(h.f)})});return zipArma(F)}
function u8b64(u){var s='',k=0x8000;for(var i=0;i<u.length;i+=k)s+=String.fromCharCode.apply(null,u.subarray(i,i+k));return btoa(s)}
function xlsHojas(){var cliN=function(id){var c=cl(id);return c?c.n:''},H=[];
 var V=[['Fecha','Chofer','Cliente','Cajas roatán','Kg macho','Total','Pagó','Abono','Debe de esta venta']];
 var pon=function(f,ch,L){(L||[]).forEach(function(l){var tot=num(l.total),pg=num(l.pago);V.push([f,chofN(ch),cliN(l.c),num(l.R),num(l.M),tot,pg,num(l.abono),Math.max(0,r2(tot-pg))])})};
 (S.rutasHist||[]).forEach(function(r){pon(r.f,r.ch,r.log)});
 Object.keys(S.chSt||{}).forEach(function(id){var o=S.chSt[id];if(o&&+id!==+S.chofHoy)pon(iso(TODAY),+id,o.log)});pon(iso(TODAY),S.chofHoy,S.log);
 (S.vlVentas||[]).forEach(function(x){V.push([x.f||iso(TODAY),'Venta local',x.cli||'',0,0,num(x.tot),num(x.tot),0,0])});H.push({n:'Ventas',f:V});
 H.push({n:'Deudas de clientes',f:[['Cliente','Debe','Cajas vacías que debe','Teléfono','Chofer']].concat(S.cli.filter(function(c){return !c.oculto&&(num(c.cred)>0||num(c.vac)>0)}).map(function(c){return [c.n,num(c.cred),num(c.vac),c.tel||'',chofN(c.chofer)]}))});
 H.push({n:'Deudas a proveedores',f:[['Proveedor','Total comprado','Pagado','Le debes']].concat(provDeb().filter(function(p){return p.tot>0}).map(function(p){return [p.n,r2(p.tot),r2(p.ab),r2(p.pen)]}))});
 H.push({n:'Gastos',f:[['Fecha','Hora','Tipo','Monto','Nota','Cómo se pagó','Quién','Tiene factura']].concat((S.gastos||[]).map(function(g){return [g.f||'',g.h||'',g.t||'',num(g.m),g.n||'',g.pago||'',g.q||'',g.fac?'Sí':'No']}))});
 H.push({n:'Cargas',f:[['Fecha','Proveedor','Cajas roatán','Kg roatán','Kg macho','Precio caja/kg roatán','Precio kg macho','Estado']].concat((S.cargas||[]).map(function(c){return [c.fecha,c.prov,num(c.cajas),num(c.kgR),num(c.kgM),num(c.pR),num(c.pM),c.est||'']}))});
 H.push({n:'Sueldos',f:[['Fecha','Empleado','Monto','Nota']].concat((S.pagosSueldo||[]).map(function(p){return [p.f,chofN(p.ch),num(p.m),p.n||'']}))});
 H.push({n:'Merma',f:[['Fecha','Tipo','Cajas','Kg','Valor','Nota']].concat((S.mermas||[]).map(function(m){return [m.fecha||'',m.tipo||'',num(m.R),num(m.M),r2(num(m.valor)),m.txt||'']}))});
 return H}
function xlsExportar(){try{var u=xlsxArma(xlsHojas()),nom='RutaFacil-'+iso(TODAY)+'.xlsx';natGuardar(u8b64(u),nom,'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet').then(function(d){toast('Excel guardado en '+d)},function(){toast('No se pudo guardar el Excel')})}catch(e){console.error(e);toast('No se pudo armar el Excel')}}
/* ---------- respaldo y borrar datos de prueba ---------- */
function respaldoDescargar(){try{var o=JSON.parse(JSON.stringify(S));['toast','modal','menu','aj','px','bj','undo'].forEach(function(k){delete o[k]});var txt=JSON.stringify({app:'Ruta Fácil',fecha:new Date().toISOString(),datos:o});
 natGuardar(u8b64(utf8(txt)),'Respaldo-RutaFacil-'+iso(TODAY)+'.json','application/json').then(function(d){S.respUlt=iso(TODAY);toast('Respaldo guardado en '+d);render()},function(){toast('No se pudo guardar el respaldo')})}catch(e){toast('No se pudo armar el respaldo')}}
var BORRA_K=['log','rutasHist','vlVentas','gastos','cargas','pagosSueldo','mermas','cobros','hist','quejas','reportes','excesos','faltantes','anulados','cancels','corrs','entCorr','cambios','incid','novs','tiradas','vjHist','cajaCierres','cajasMov','aportes','porPagar','ventasPend','provPag','provPagT','permisos','avPrecio','encargos','loteCierres','lotes','cierresPrev'];
function borrarPrueba(){BORRA_K.forEach(function(k){if(Array.isArray(S[k]))S[k]=[]});S.cli.forEach(function(c){c.cred=0;c.vac=0});(S.prov||[]).forEach(function(p){p.tot=0;p.ab=0});
 if(S.inv){Object.keys(S.inv).forEach(function(k){if(typeof S.inv[k]==='number')S.inv[k]=0})}S.chSt={};try{arLoad(chNuevo(+S.chofHoy))}catch(e){}
 S.hist.push({t:fmtF(iso(TODAY))+' '+hhmm(),q:quien(),x:'Borró los datos de prueba'});S.modal=null;toast('Listo: se borraron las ventas, gastos y movimientos de prueba. Clientes, personal y vehículos se quedan.');render()}
var _aj38=ajHTML;ajHTML=function(){var h=_aj38.apply(this,arguments);if(!h||h.indexOf('id="ajov"')<0||S.role!=='admin'||S.encOn)return h;
 var c='<details class="card" data-k="ajresp"'+(S.dOpen.ajresp?' open':'')+'><summary><b>Respaldo y datos</b><span class="lbl">descargar respaldo, Excel, borrar pruebas</span></summary>'
  +'<div class="lbl" style="margin-top:6px">Todo se guarda en la nube al momento. El respaldo es una copia extra en tu celular (hazlo cada semana).'+(S.respUlt?' Último: '+fmtF(S.respUlt)+'.':'')+'</div>'
  +'<button class="btn sec" style="margin-top:8px" data-act="respbaja">Descargar respaldo</button><button class="btn sec" style="margin-top:8px" data-act="exportar">Exportar a Excel</button>'
  +'<div class="lbl" style="margin-top:12px"><b>Antes de empezar de verdad</b>: borra lo que capturaste para practicar (ventas, gastos, cargas, cierres). Se quedan clientes, proveedores, personal y vehículos.</div><button class="btn sec" style="margin-top:8px;color:var(--danger)" data-act="borrapr">Borrar datos de prueba</button></details>';
 var i=h.lastIndexOf('</div></div>');return i<0?h:h.slice(0,i)+c+h.slice(i)};
document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act]');if(!b)return;var a=b.dataset.act;
 if(a==='respbaja'){e.stopImmediatePropagation();respaldoDescargar();return}
 if(a==='borrapr'){e.stopImmediatePropagation();abrirModal('¿Borrar los datos de prueba?','Se borran ventas, gastos, cargas, cierres, deudas y movimientos. Se quedan clientes, proveedores, personal y vehículos. Antes se descarga un respaldo por si acaso. No se puede deshacer.',[['Sí, borrar','borraprsi']]);return}
 if(a==='borraprsi'){e.stopImmediatePropagation();respaldoDescargar();setTimeout(borrarPrueba,300);return}},true);
/* ---------- "✓ Guardado" junto a cada campo que se cambia ---------- */
(function(){var st=document.createElement('style');st.textContent='.guardado{display:inline-block;margin-left:6px;font-size:13px;font-weight:700;color:var(--accent);animation:gdIn .25s ease}.guardado.fuera{opacity:0;transition:opacity .4s}@keyframes gdIn{from{opacity:0;transform:translateY(3px)}}';document.head.appendChild(st)})();
document.addEventListener('change',function(e){var t=e.target;if(!t||!t.dataset||!(t.dataset.bind||t.dataset.cfg||t.dataset.chf)||t.type==='file')return;
 if(t.closest('#pinov,#nbov,.entbar'))return;var lab=t.closest('.field')||t.parentNode;if(!lab)return;
 setTimeout(function(){var f=document.getElementById(t.id)||t,cont=(f.closest&&f.closest('.field'))||f.parentNode;if(!cont)return;var l=cont.querySelector('label')||cont;var v=l.querySelector('.guardado');if(v)v.remove();v=document.createElement('span');v.className='guardado';v.textContent='✓ Guardado';l.appendChild(v);
  setTimeout(function(){v.classList.add('fuera');setTimeout(function(){v.remove()},450)},1800)},60)},true);
