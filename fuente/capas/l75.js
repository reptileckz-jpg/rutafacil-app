/* ===================== v7.6 · primera vez por pasos e importar clientes (12 nov)
   87 primera vez: en Bienvenida, Bodega y Dinero una tarjeta por pantalla (con resumen de la bodega y el mayoreo del día);
      vehículos, personal, clientes y proveedores se agregan con su alta por pasos (la misma de la app); en "Listo", "Corregir" por apartado
   88 importar clientes (y proveedores) de un Excel o CSV, con plantilla, vista previa, repetidos y errores en palabras claras ===================== */
(function(){var st=document.createElement('style');st.textContent=[
 '.su75p{font-size:14px;font-weight:800;color:var(--muted);margin:2px 2px 8px}.su75big{display:flex;align-items:center;justify-content:center;gap:10px;width:100%;min-height:72px;border-radius:20px;font-size:19px;font-weight:900;margin-top:10px}',
 '.im75 table{width:100%;border-collapse:collapse;font-size:14px}.im75 td{border-top:1px solid var(--line);padding:6px 4px;vertical-align:top}.im75 .er{color:var(--danger);font-weight:700}'].join('\n');document.head.appendChild(st)})();

/* ---------- 87 · una tarjeta por pantalla en Bienvenida, Bodega y Dinero ---------- */
var SU75_SUB={0:1,1:1,6:1};
function suTarj75(){var o=document.getElementById('setov');if(!o||!S.setup)return [];var sw=o.querySelector('.sw');return sw?[].slice.call(sw.children).filter(function(e){return e.classList.contains('card')}):[]}
function suRes75(){var I=S.inv,M=S.setup.mad||{},tR=num(I.verdes)+num(M.R)+num(I.maduras),tM=num(I.kgVerde)+num(M.M)+num(I.kgMaduro);var d=document.createElement('div');d.className='card good';d.dataset.x75='res';
 d.innerHTML='<b style="font-size:19px">Así queda tu bodega</b>'+rw('Taras vacías',n65(I.vacias))+'<div style="margin-top:8px;font-weight:800">Hay '+n65(tR)+' cajas de roatán, de las cuales:</div>'+rw('Verdes',n65(I.verdes))+rw('En maduración',n65(M.R))+rw('Maduras',n65(I.maduras))+'<div style="margin-top:8px;font-weight:800">Hay '+n65(tM)+' kg de macho, de los cuales:</div>'+rw('Verde',n65(I.kgVerde))+rw('En maduración',n65(M.M))+rw('Maduro',n65(I.kgMaduro));return d}
function suMay75(){var m=S.mayMin||{},d=document.createElement('div');d.className='card';d.dataset.x75='may';
 d.innerHTML='<b>Mayoreo de hoy</b><div class="lbl">Lo mínimo que un chofer puede cobrar por mayoreo. No puede ser más alto que el precio normal.</div><div class="field"><label for="su75mR">Caja de roatán $</label><input id="su75mR" type="number" inputmode="decimal" step="any" min="0" data-bind="mayMin.R" value="'+esc(m.R==null?'':m.R)+'"></div><div class="field"><label for="su75mM">Kilo de macho $</label><input id="su75mM" type="number" inputmode="decimal" step="any" min="0" data-bind="mayMin.M" value="'+esc(m.M==null?'':m.M)+'"></div>';return d}
function suPrep75(){var U=S.setup,o=document.getElementById('setov');if(!U||!o||S.wz||!SU75_SUB[U.p])return;var sw=o.querySelector('.sw');if(!sw||sw.dataset.x75==='1')return;sw.dataset.x75='1';
 if(U.p===1){var C=suTarj75();var last=C[C.length-1];if(last)last.after(suRes75())}
 if(U.p===6){var C2=suTarj75(),pr=C2.filter(function(c){return /Precio de hoy/.test(c.textContent)})[0];if(pr)pr.after(suMay75())}
 var C3=suTarj75(),n=C3.length;if(n<2)return;var s=U.sub75;if(s==='ult')s=n-1;s=Math.max(0,Math.min(n-1,+s||0));U.sub75=s;
 C3.forEach(function(c,i){c.style.display=i===s?'':'none'});var h2=sw.querySelector('h2'),pp=document.createElement('div');pp.className='su75p';pp.textContent='Parte '+(s+1)+' de '+n;if(h2)h2.after(pp);
 setTimeout(function(){var i=C3[s]&&C3[s].querySelector('input:not([type=file])');if(i&&!String(i.value).trim()&&s>0)try{i.focus({preventScroll:true})}catch(e){}},80)}
function may75Mal(){var m=S.mayMin||{},P=S.precio||{},o=[];[['R','la caja de roatán'],['M','el kilo de macho']].forEach(function(x){var v=num(m[x[0]]),p=num(P[x[0]]);if(!(v>0))o.push('Escribe el mayoreo de '+x[1]);else if(p>0&&v>p)o.push('El mayoreo de '+x[1]+' no puede ser más alto que el precio normal ('+money(p)+')')});return o}
window.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('#setov [data-act="supaso"]');if(!b||!S.setup||S.wz)return;var U=S.setup,p=U.p,t=+b.dataset.v,C=suTarj75(),n=C.length,s=+U.sub75||0;
 if(!SU75_SUB[p]||n<2){U.sub75=t<p?'ult':0;return}
 if(t===p+1&&s<n-1){e.preventDefault();e.stopImmediatePropagation();U.sub75=s+1;render();try{document.getElementById('setov').scrollTop=0}catch(er){}return}
 if(t===p-1&&s>0){e.preventDefault();e.stopImmediatePropagation();U.sub75=s-1;render();return}
 if(p===6&&t>p){var mal=may75Mal();if(mal.length){e.preventDefault();e.stopImmediatePropagation();U.sub75=C.findIndex(function(c){return c.dataset.x75==='may'});toast(mal[0]);render();return}}
 U.sub75=t<p?'ult':0},true);

/* ---------- 87 · vehículos, personal, clientes y proveedores con su alta por pasos ---------- */
var SU75_K={2:['veh','vehículo','🚚'],3:['per','persona','👤'],4:['cli','cliente','🏪'],5:['prov','proveedor','🌱']};
function suListas75(){var U=S.setup,o=document.getElementById('setov');if(!U||!o||S.wz)return;var k=SU75_K[U.p];if(!k)return;var sw=o.querySelector('.sw');if(!sw||sw.dataset.x75b==='1')return;sw.dataset.x75b='1';
 var C=suTarj75(),form=C.filter(function(c){return c.querySelector('[data-act="suadd"]')})[0];if(form)form.style.display='none';var n=(U[k[0]]||[]).length;
 var d=document.createElement('div');d.innerHTML='<button class="btn su75big" data-act="su75add" data-k="'+k[0]+'">'+k[2]+' '+(k[0]==='per'?(n?'Agregar a otra persona':'Agregar a una persona'):(n?'Agregar otro '+k[1]:'Agregar un '+k[1]))+'</button>'+(k[0]==='cli'?'<button class="btn sec su75big" style="min-height:60px;font-size:17px" data-act="im75" data-m="su">📥 Importar clientes de un Excel</button>':'')+(k[0]==='prov'?'<button class="btn sec su75big" style="min-height:60px;font-size:17px" data-act="im75" data-m="su" data-t="prov">📥 Importar proveedores de un Excel</button>':'')
  +(n?'':'<div class="lbl" style="margin-top:8px;text-align:center">'+({veh:'Agrega cada camioneta o camión.',per:'Choferes, ayudantes y quien atiende la bodega.',cli:'Los que tengas a la mano; los demás los da de alta el chofer en la ruta.',prov:'A quién le compras la fruta.'})[k[0]]+'</div>');
 var nav=sw.querySelector('.wz-nav');if(nav)nav.before(d);else sw.appendChild(d)}
var COMB75={Magna:'Gasolina Magna',Premium:'Gasolina Premium','Diésel':'Diésel'};
WZ.suVeh={tit:'Vehículo',fin:'Agregar vehículo',pasos:WZ.veh.pasos.filter(function(p){return !/papeles/.test(p.q)}),
 guardar:function(d){var U=S.setup,odo=num(d.odo),v=num(d.acX);var x={n:vehNomDe(d)||d.modelo||'Vehículo',pl:String(d.pl||'').trim(),plEdo:d.plEdo||edoDef80(),plTipo:d.tipo==='auto'?'auto':'carga',comb:COMB75[d.comb]||d.comb,img:d.tipo==='auto'?0:1,odo:odo,fotoMia:d.foto||null,
  ex75:{marca:d.marca,modelo:d.modelo,anio:d.anio,color:d.color,capL:d.capL,precio:d.precio,capC:d.capC,capK:d.capK,kmMes:d.kmMes,acInt:d.acInt,acLast:d.acM==='tab'?v:(d.acM==='hace'?Math.max(0,odo-v):odo),esAuto:d.tipo==='auto'}};
  U.veh.push(x);toast('✓ '+x.n+' agregado');return true}};
WZ.suPer={tit:'Personal',fin:'Agregar',pasos:[
 {q:'¿Cómo se llama?',c:[{k:'n',l:'Nombre',ph:'Ej. Pepe López'}],ok:function(d){return (S.setup.per||[]).some(function(x){return String(x.n).trim().toLowerCase()===String(d.n).trim().toLowerCase()})?'Ya agregaste a alguien con ese nombre':''}},
 {q:'¿Qué hace?',c:[{k:'puesto',t:'opc',o:function(){return PUESTOS},falta:'Escoge qué hace'}],auto:true},
 {q:'¿Cuál es su teléfono?',saltar:true,c:[{k:'tel',l:'Teléfono (10 dígitos)',t:'tel',opc:true}],ok:function(d){var t=String(d.tel||'').replace(/\D/g,'');return t&&t.length!==10?'El teléfono debe tener 10 dígitos':''}}],
 guardar:function(d){S.setup.per.push({n:String(d.n).trim(),puesto:d.puesto,tel:String(d.tel||'').replace(/\D/g,'')});toast('✓ '+String(d.n).trim()+' agregado');return true}};
WZ.suCli={tit:'Cliente',fin:'Agregar cliente',pasos:[
 {q:'¿Cómo se llama el negocio?',c:[{k:'n',l:'Nombre',ph:'Ej. Abarrotes Lupita'}],ok:function(d){return (S.setup.cli||[]).some(function(x){return String(x.n).trim().toLowerCase()===String(d.n).trim().toLowerCase()})?'Ya agregaste un cliente con ese nombre':''}},
 {q:'¿Cuál es su teléfono?',a:'Para mandarle su ticket por WhatsApp.',saltar:true,c:[{k:'tel',l:'Teléfono (10 dígitos)',t:'tel',opc:true}],ok:function(d){var t=String(d.tel||'').replace(/\D/g,'');return t&&t.length!==10?'El teléfono debe tener 10 dígitos':''}},
 {q:'¿Dónde está?',a:'Busca el lugar o pega el link de Google Maps. Si no lo sabes, el chofer lo guarda al llegar.',saltar:true,html:function(d){return ubWz72(d)}},
 {q:'¿Alguna referencia para llegar?',saltar:true,c:[{k:'a',l:'Dirección o referencia',opc:true}]},
 {q:'¿Qué días se le visita?',html:function(d){var L=d.dias||[];return '<div class="card"><div class="opc" style="grid-template-columns:repeat(4,1fr)">'+DIAS_TXT.map(function(x,i){return '<button data-act="wzdia" data-v="'+i+'" aria-pressed="'+(L.indexOf(i)>-1)+'" style="min-height:56px">'+x.slice(0,3)+'</button>'}).join('')+'</div></div>'},ok:function(d){return (d.dias||[]).length?'':'Escoge al menos un día'}},
 {q:'¿Qué chofer lo visita?',si:function(){return (S.setup.per||[]).filter(function(x){return x.puesto==='chofer'}).length>1},c:[{k:'ch',t:'opc',o:function(){return (S.setup.per||[]).filter(function(x){return x.puesto==='chofer'}).map(function(x,i){return [String(i),esc(x.n)]})},falta:'Escoge el chofer'}]},
 {q:'¿A qué hora abre y cierra?',saltar:true,html:function(d){var o=HORAS72();var sel=function(k,l){return '<div class="field grande"><label for="wz_'+k+'">'+l+'</label><select id="wz_'+k+'" data-wz="'+k+'"><option value="">Escoge</option>'+o.map(function(x){return '<option value="'+x[0]+'"'+(d[k]===x[0]?' selected':'')+'>'+x[1]+'</option>'}).join('')+'</select></div>'};return '<div class="card">'+sel('hAb','Abre a las')+sel('hCi','Cierra a las')+'</div>'},
  ok:function(d){if(!d.hAb&&!d.hCi)return '';if(!d.hAb||!d.hCi)return 'Escoge las dos horas (o toca "Saltar")';return d.hCi<=d.hAb?'La hora de cierre debe ser después de la de abrir':''}},
 {q:'¿Te debe algo hoy?',a:'Dinero y taras que ya te debe. Si no, déjalo vacío.',saltar:true,c:[{k:'cred',l:'Dinero que te debe $',t:'number',opc:true},{k:'vac',l:'Taras que te debe',t:'number',opc:true}]}],
 guardar:function(d){S.setup.cli.push({n:String(d.n).trim(),a:d.a||'',tel:String(d.tel||'').replace(/\D/g,''),dias:(d.dias||[]).slice(),cred:d.cred||'',vac:d.vac||'',ch:d.ch!=null?d.ch:'',ex75:{lat:d.lat,lng:d.lng,hAb:d.hAb||'',hCi:d.hCi||''}});toast('✓ '+String(d.n).trim()+' agregado');return true}};
WZ.suProv={tit:'Proveedor',fin:'Agregar proveedor',pasos:[
 {q:'¿Cómo se llama?',c:[{k:'n',l:'Nombre',ph:'Ej. Roly'}],ok:function(d){return (S.setup.prov||[]).some(function(x){return String(x.n).trim().toLowerCase()===String(d.n).trim().toLowerCase()})?'Ya agregaste un proveedor con ese nombre':''}},
 {q:'¿Qué te vende?',c:[{k:'tipo',t:'opc',o:[['Roatán','Roatán'],['Macho','Macho'],['Ambos','Los dos']],falta:'Escoge qué te vende'}],auto:true},
 {q:'¿Cuál es su teléfono?',saltar:true,c:[{k:'tel',l:'Teléfono (10 dígitos)',t:'tel',opc:true}]},
 {q:'¿Dónde está?',a:'Con esto la app calcula los kilómetros de los viajes.',saltar:true,html:function(d){return ubWz72(d)}},
 {q:'¿Le debes algo hoy?',saltar:true,c:[{k:'deb',l:'Le debes $',t:'number',opc:true}]}],
 guardar:function(d){S.setup.prov.push({n:String(d.n).trim(),tipo:d.tipo,deb:d.deb||'',tel:String(d.tel||'').replace(/\D/g,''),ex75:{lat:d.lat,lng:d.lng}});toast('✓ '+String(d.n).trim()+' agregado');return true}};
window.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act="su75add"]');if(!b||!S.setup)return;e.stopImmediatePropagation();var k=b.dataset.k;
 if(k==='veh')wzAbre('suVeh',{plEdo:'Veracruz'});else if(k==='per')wzAbre('suPer',{puesto:(S.setup.per||[]).some(function(x){return x.puesto==='chofer'})?'':'chofer'});else if(k==='cli')wzAbre('suCli',{dias:[]});else wzAbre('suProv',{})},true);
/* al terminar: lo que se capturó en los pasos también se guarda (aceite, capacidad, ubicación, horario…) */
/* suAplicar: pasó a tema-ajustes.js */
/* "Listo": corregir cada apartado */
function suListo75(){var U=S.setup,o=document.getElementById('setov');if(!U||!o||U.p!==7||S.wz)return;var sw=o.querySelector('.sw');if(!sw||sw.querySelector('[data-x75="cor"]'))return;var d=document.createElement('div');d.className='card';d.dataset.x75='cor';
 d.innerHTML='<b>¿Algo que corregir?</b><div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:8px">'+[[0,'Negocio'],[1,'Bodega'],[2,'Vehículos'],[3,'Personal'],[4,'Clientes'],[5,'Proveedores'],[6,'Dinero y precios']].map(function(x){return '<button class="btn sec" style="min-height:50px" data-act="su75ir" data-v="'+x[0]+'">✎ '+x[1]+'</button>'}).join('')+'</div>';
 var nav=sw.querySelector('.wz-nav');if(nav)nav.before(d);else sw.appendChild(d)}
window.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act="su75ir"]');if(!b||!S.setup)return;e.stopImmediatePropagation();S.setup.p=+b.dataset.v;S.setup.sub75=0;render();try{document.getElementById('setov').scrollTop=0}catch(er){}},true);

/* ---------- 88 · importar clientes y proveedores ---------- */
function sinAc75(s){return String(s||'').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'').replace(/[^a-z0-9]+/g,' ').trim()}
function csv75(t){t=String(t||'').replace(/^﻿/,'');var sep=(t.split('\n')[0].match(/;/g)||[]).length>(t.split('\n')[0].match(/,/g)||[]).length?';':',',R=[],row=[],f='',q=false;
 for(var i=0;i<t.length;i++){var ch=t[i];if(q){if(ch==='"'){if(t[i+1]==='"'){f+='"';i++}else q=false}else f+=ch}else if(ch==='"')q=true;else if(ch===sep){row.push(f);f=''}else if(ch==='\n'||ch==='\r'){if(ch==='\r'&&t[i+1]==='\n')i++;row.push(f);f='';if(row.some(function(x){return String(x).trim()}))R.push(row);row=[]}else f+=ch}
 row.push(f);if(row.some(function(x){return String(x).trim()}))R.push(row);return R}
function zipLee75(buf){var u=new Uint8Array(buf),dv=new DataView(buf),E=-1;for(var i=u.length-22;i>=Math.max(0,u.length-70000);i--){if(dv.getUint32(i,true)===0x06054b50){E=i;break}}if(E<0)throw new Error('zip');
 var n=dv.getUint16(E+10,true),off=dv.getUint32(E+16,true),F={};for(var k=0;k<n;k++){var m=dv.getUint16(off+10,true),cs=dv.getUint32(off+20,true),nl=dv.getUint16(off+28,true),el=dv.getUint16(off+30,true),cl2=dv.getUint16(off+32,true),lo=dv.getUint32(off+42,true),nm=new TextDecoder().decode(u.subarray(off+46,off+46+nl));
  var ln=dv.getUint16(lo+26,true),le=dv.getUint16(lo+28,true),st=lo+30+ln+le;F[nm]={m:m,d:u.subarray(st,st+cs)};off+=46+nl+el+cl2}return F}
function inflar75(e){if(e.m===0)return Promise.resolve(new TextDecoder().decode(e.d));if(typeof DecompressionStream==='undefined')return Promise.reject(new Error('sin descompresor'));var s=new Blob([e.d]).stream().pipeThrough(new DecompressionStream('deflate-raw'));return new Response(s).text()}
function xlsx75(buf){var F=zipLee75(buf),sh=Object.keys(F).filter(function(k){return /^xl\/worksheets\/sheet\d+\.xml$/.test(k)}).sort()[0];if(!sh)return Promise.reject(new Error('sin hoja'));
 return Promise.all([F['xl/sharedStrings.xml']?inflar75(F['xl/sharedStrings.xml']):Promise.resolve(''),inflar75(F[sh])]).then(function(r){var P=new DOMParser(),ss=[];if(r[0]){var d=P.parseFromString(r[0],'application/xml');[].forEach.call(d.getElementsByTagName('si'),function(si){ss.push([].map.call(si.getElementsByTagName('t'),function(t){return t.textContent}).join(''))})}
  var x=P.parseFromString(r[1],'application/xml'),R=[];[].forEach.call(x.getElementsByTagName('row'),function(row){var L=[];[].forEach.call(row.getElementsByTagName('c'),function(c){var ref=c.getAttribute('r')||'',col=0;(ref.match(/^[A-Z]+/)||[''])[0].split('').forEach(function(ch){col=col*26+ch.charCodeAt(0)-64});col=Math.max(0,col-1);
   var t=c.getAttribute('t'),v=c.getElementsByTagName('v')[0],is=c.getElementsByTagName('is')[0],val=t==='s'?ss[+(v&&v.textContent)]:(t==='inlineStr'?(is?is.textContent:''):(v?v.textContent:''));L[col]=val==null?'':String(val)});for(var i=0;i<L.length;i++)if(L[i]==null)L[i]='';if(L.some(function(z){return String(z).trim()}))R.push(L)});return R})}
var IM75_COL={cli:{nombre:'n',negocio:'n',cliente:'n',apodo:'ap',telefono:'tel',tel:'tel',celular:'tel',whatsapp:'tel',ubicacion:'ub',coordenadas:'ub',link:'ub','link de google maps':'ub',maps:'ub',direccion:'a','direccion o referencia':'a',referencia:'a',horario:'hor','dias de visita':'dias',dias:'dias',chofer:'ch','credito inicial':'cred',credito:'cred','te debe':'cred',deuda:'cred','taras que debe':'vac',taras:'vac','cajas que debe':'vac'},
 prov:{nombre:'n',proveedor:'n','que vende':'tipo',vende:'tipo',fruta:'tipo',telefono:'tel',tel:'tel',celular:'tel',ubicacion:'ub',coordenadas:'ub',link:'ub',direccion:'dir',referencia:'dir','le debes':'deb',deuda:'deb'}};
var DIAS75={dom:0,domingo:0,lun:1,lunes:1,mar:2,martes:2,mie:3,miercoles:3,jue:4,jueves:4,vie:5,viernes:5,sab:6,sabado:6};
function hora75(s){var m=/^(\d{1,2})(?::(\d{2}))?\s*(am|pm|a\.m\.|p\.m\.)?$/i.exec(String(s||'').trim());if(!m)return '';var h=+m[1],mi=m[2]?+m[2]:0,ap=(m[3]||'').toLowerCase();if(/p/.test(ap)&&h<12)h+=12;if(/a/.test(ap)&&h===12)h=0;if(h>23||mi>59)return '';return String(h).padStart(2,'0')+':'+String(mi).padStart(2,'0')}
function choferes75(modo){if(modo==='su')return (S.setup.per||[]).map(function(x,i){return {n:x.n,ref:i,ch:x.puesto==='chofer'}}).filter(function(x){return x.ch});return choferesL().filter(function(c){return !c.baja&&esCh(c)}).map(function(c){return {n:esAdm(c)?chofN(2):c.n,ref:c.id}})}
function im75Filas(R,t,modo){if(!R.length)return {err:'El archivo está vacío.'};var H=R[0].map(function(h){return IM75_COL[t][sinAc75(h)]||null});if(H.indexOf('n')<0)return {err:'No encontré la columna "Nombre". Usa la plantilla.'};
 var CH=t==='cli'?choferes75(modo):[],yaN={},yaT={},L=[];
 var exist=modo==='su'?(t==='cli'?S.setup.cli:S.setup.prov):(t==='cli'?S.cli.filter(function(c){return !c.oculto}):provNames().map(function(n){return {n:n,tel:provD(n).tel}}));
 exist.forEach(function(c){yaN[sinAc75(c.n)]=c;var tl=String(c.tel||'').replace(/\D/g,'');if(tl)yaT[tl]=c});
 R.slice(1).forEach(function(row,ri){var o={fila:ri+2,er:[],av:[]};H.forEach(function(k,i){if(k&&o[k]==null)o[k]=String(row[i]==null?'':row[i]).trim()});
  if(!o.n){o.er.push('Sin nombre');L.push(o);return}
  var tl=String(o.tel||'').replace(/\D/g,'');if(tl.length===12&&tl.indexOf('52')===0)tl=tl.slice(2);if(tl&&tl.length!==10)o.av.push('El teléfono no tiene 10 dígitos (no se guarda)');o.tel=tl.length===10?tl:'';
  if(o.ub){var c=coordsDe(o.ub);if(c){o.lat=c.lat;o.lng=c.lng}else if(linkMaps71(o.ub)){o.link=o.ub;o.av.push('Ubicación: link corto, se abre al importar')}else o.av.push('No entendí la ubicación')}
  if(t==='cli'){if(o.hor){var p=String(o.hor).split(/\s*(?:-|–|\sa\s)\s*/);var a=hora75(p[0]),b=hora75(p[1]);if(a&&b&&b>a){o.hAb=a;o.hCi=b}else o.av.push('No entendí el horario')}
   if(o.dias){var D=[];String(o.dias).split(/[,;\/y ]+/).forEach(function(x){var k=sinAc75(x);if(k in DIAS75&&D.indexOf(DIAS75[k])<0)D.push(DIAS75[k])});D.sort();o.diasL=D;if(!D.length)o.av.push('No entendí los días')}else o.diasL=[];
   if(o.ch){var m=CH.filter(function(x){return sinAc75(x.n)===sinAc75(o.ch)})[0];if(m)o.chRef=m.ref;else o.av.push('No hay un chofer "'+o.ch+'"')}
   o.cred=num(o.cred);o.vac=Math.round(num(o.vac))}
  else{o.tipo=/macho/i.test(o.tipo||'')&&/roat/i.test(o.tipo||'')?'Ambos':(/macho/i.test(o.tipo||'')?'Macho':(/ambos|los dos/i.test(o.tipo||'')?'Ambos':'Roatán'));o.deb=num(o.deb)}
  var k1=sinAc75(o.n);if(yaN[k1]||(o.tel&&yaT[o.tel]))o.ya=yaN[k1]||yaT[o.tel];else if(L.some(function(z){return !z.er.length&&sinAc75(z.n)===k1}))o.er.push('Repetido en el archivo');L.push(o)});return {L:L}}
function im75HTML(){var x=S.im75;if(!x)return '';var T=x.t==='prov'?'proveedores':'clientes',h='';
 if(x.p===0){h='<div class="q">Importar '+T+'</div><div class="lbl">De un archivo de Excel (.xlsx) o CSV. La primera fila son los títulos de las columnas.</div>'
  +'<div class="card" style="margin-top:10px"><b>1. Baja la plantilla</b><div class="lbl">Columnas: '+(x.t==='prov'?'Nombre, Qué vende, Teléfono, Ubicación, Dirección, Le debes':'Nombre, Apodo, Teléfono, Ubicación (link de Google Maps o coordenadas), Dirección o referencia, Horario (7:00-10:00), Días de visita (Lun,Jue), Chofer, Crédito inicial, Taras que debe')+'.</div><button class="btn sec big" data-act="im75plan">📄 Bajar la plantilla</button></div>'
  +'<div class="card"><b>2. Escoge tu archivo</b><label class="btn big" style="display:flex;align-items:center;justify-content:center;cursor:pointer;margin-top:10px" for="im75f">📂 Escoger el archivo</label><input id="im75f" type="file" accept=".csv,.xlsx,text/csv,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" style="position:absolute;opacity:0;width:1px;height:1px"></div>'
  +(x.busy?'<div class="lbl">Leyendo…</div>':'')+(x.err?'<div class="neg" role="alert" style="font-weight:700;margin-top:8px">'+esc(x.err)+'</div>':'')}
 else if(x.p===1){var L=x.L,ok=L.filter(function(o){return !o.er.length&&!o.ya}),ya=L.filter(function(o){return !o.er.length&&o.ya}),er=L.filter(function(o){return o.er.length}),av=L.filter(function(o){return !o.er.length&&o.av.length}),nIm=ok.length+(x.upd?ya.length:0);
  h='<div class="q">Revisa antes de importar</div><div class="card good">'+rw('Nuevos',ok.length)+rw('Ya existen',ya.length)+rw('Con error (no entran)',er.length)+'</div>'
   +(ya.length?'<div class="card"><b>Los que ya existen ('+ya.length+')</b><div class="lbl">Mismo nombre o teléfono.</div><div class="chips" role="group" style="margin:6px 0"><button data-act="im75upd" data-v="0" aria-pressed="'+!x.upd+'">Saltarlos</button><button data-act="im75upd" data-v="1" aria-pressed="'+!!x.upd+'">Actualizar sus datos</button></div></div>':'')
   +(er.length?'<div class="card alert"><b>No entran ('+er.length+')</b>'+er.slice(0,30).map(function(o){return '<div class="lbl">Fila '+o.fila+': '+esc(o.n||'(sin nombre)')+' — '+esc(o.er.join(', '))+'</div>'}).join('')+'</div>':'')
   +(av.length?'<div class="card note"><b>Entran, pero revisa ('+av.length+')</b>'+av.slice(0,30).map(function(o){return '<div class="lbl">Fila '+o.fila+': '+esc(o.n)+' — '+esc(o.av.join(', '))+'</div>'}).join('')+'<div class="lbl" style="margin-top:4px">Lo que falte queda en "Datos que faltan".</div></div>':'')
   +'<div class="card im75"><b>Vista previa</b><table>'+L.filter(function(o){return !o.er.length}).slice(0,12).map(function(o){return '<tr><td><b>'+esc(o.n)+'</b>'+(o.ya?' <span class="lbl">(ya existe)</span>':'')+'<br><span class="lbl">'+[o.tel,o.lat!=null?'📍':'',o.hAb?o.hAb+'-'+o.hCi:'',(o.diasL||[]).map(function(i){return DIAS_TXT[i].slice(0,3)}).join(',')].filter(Boolean).join(' · ')+'</span></td></tr>'}).join('')+'</table>'+(L.length>12?'<div class="lbl">… y '+(L.length-12)+' más</div>':'')+'</div>'
   +'<button class="btn big" data-act="im75si"'+(nIm?'':' disabled')+'>Importar '+nIm+' '+T+'</button><button class="btn sec big" data-act="im75atras">Escoger otro archivo</button>'}
 return ovW70('im75ov','Importar '+T,h,'im75x')}
function im75Lee(f){var x=S.im75;x.busy=true;x.err='';render();var es=/\.xlsx$/i.test(f.name)||/sheet/.test(f.type||'');
 (es?f.arrayBuffer().then(xlsx75):f.text().then(csv75)).then(function(R){var r=im75Filas(R,x.t,x.modo);x.busy=false;if(r.err){x.err=r.err;render();return}x.L=r.L;x.p=1;x.upd=false;render()},function(er){x.busy=false;x.err='No pude leer el archivo. Guárdalo como Excel (.xlsx) o CSV e intenta otra vez.';render()})}
document.addEventListener('change',function(e){var t=e.target;if(!t||t.id!=='im75f'||!S.im75)return;var f=t.files&&t.files[0];if(f)im75Lee(f)},true);
function im75Aplica(){var x=S.im75,L=x.L.filter(function(o){return !o.er.length&&(!o.ya||x.upd)}),n=0,u=0,su=x.modo==='su',links=[];
 L.forEach(function(o){
  if(x.t==='cli'){
   if(su){var tgt=o.ya||{n:o.n,a:'',tel:'',dias:[],cred:'',vac:'',ch:''};tgt.n=o.n;if(o.a)tgt.a=o.a;if(o.tel)tgt.tel=o.tel;if(o.diasL.length)tgt.dias=o.diasL;if(o.cred)tgt.cred=String(o.cred);if(o.vac)tgt.vac=String(o.vac);if(o.chRef!=null)tgt.ch=String(o.chRef);tgt.ex75=tgt.ex75||{};if(o.lat!=null){tgt.ex75.lat=o.lat;tgt.ex75.lng=o.lng}if(o.hAb){tgt.ex75.hAb=o.hAb;tgt.ex75.hCi=o.hCi}if(!o.ya){S.setup.cli.push(tgt);n++}else u++;return}
   var c=o.ya;if(!c){var chs=choferes75('');c=nuevoCli({n:o.n,a:o.a||'',tel:o.tel,dias:o.diasL,cred:o.cred,vac:o.vac,chofer:o.chRef!=null?o.chRef:(chs[0]&&chs[0].ref)});S.cli.push(c);n++}else{if(o.a)c.a=o.a;if(o.tel)c.tel=o.tel;if(o.diasL.length)c.dias=o.diasL;if(o.chRef!=null)c.chofer=o.chRef;u++}
   if(o.ap)c.ap=o.ap;if(o.lat!=null){c.lat=o.lat;c.lng=o.lng;c.locBy='Importado';c.locF=iso(TODAY)}else if(o.link)links.push([c,o.link]);if(o.hAb){c.hAb=o.hAb;c.hCi=o.hCi}}
  else{if(su){var tp=o.ya||{n:o.n,tipo:'Roatán',deb:'',tel:''};tp.tipo=o.tipo;if(o.tel)tp.tel=o.tel;if(o.deb)tp.deb=String(o.deb);tp.ex75=tp.ex75||{};if(o.lat!=null){tp.ex75.lat=o.lat;tp.ex75.lng=o.lng}if(!o.ya){S.setup.prov.push(tp);n++}else u++;return}
   var d=provD(o.n);d.tipo=o.tipo;if(o.tel)d.tel=o.tel;if(o.dir)d.dir=o.dir;if(o.lat!=null){d.lat=o.lat;d.lng=o.lng}if(!o.ya&&o.deb>0)S.prov.push({n:o.n,tot:o.deb,ab:0,c:'Fruta',f:iso(TODAY),vence:{t:'sin'},q:quien(),id:Date.now()+Math.random()});if(o.ya)u++;else n++}});
 try{if(!su&&typeof limSync==='function')limSync()}catch(e){}
 S.hist.push({t:fmtF(iso(TODAY))+' '+hhmm(),q:quien(),x:'Importó '+n+' '+(x.t==='prov'?'proveedores':'clientes')+' nuevos'+(u?' y actualizó '+u:'')+' de un archivo'});
 /* links cortos: se abren después, uno por uno */
 var nl=natPl&&natPl();if(links.length&&nl&&nl.linkLargo){var i=0,sig=function(){if(i>=links.length){render();return}var z=links[i++];linkAbre71(z[1]).then(function(r){if(r.c){z[0].lat=r.c.lat;z[0].lng=r.c.lng}sig()},sig)};sig()}
 toast('✓ '+n+' nuevos'+(u?' · '+u+' actualizados':''));S.im75=null;render()}
window.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act^="im75"]');if(!b)return;var a=b.dataset.act;e.stopImmediatePropagation();
 if(a==='im75'){S.im75={p:0,t:b.dataset.t==='prov'?'prov':'cli',modo:b.dataset.m==='su'?'su':''};render();return}
 var x=S.im75;if(!x)return;
 if(a==='im75x'){S.im75=null;render();return}if(a==='im75atras'){x.p=0;x.L=null;render();return}if(a==='im75upd'){x.upd=b.dataset.v==='1';render();return}
 if(a==='im75plan'){var H=x.t==='prov'?[['Nombre','Qué vende','Teléfono','Ubicación','Dirección','Le debes'],['Roly','Roatán','2281234567','19.5432, -96.9271','El Pital, Ver.','0']]:[['Nombre','Apodo','Teléfono','Ubicación','Dirección o referencia','Horario','Días de visita','Chofer','Crédito inicial','Taras que debe'],['Abarrotes Lupita','La güera','2281234567','https://maps.app.goo.gl/…  o  19.5432, -96.9271','Calle 5, portón verde','7:00-10:00','Lun,Jue','','0','0']];
  try{var u=xlsxArma([{n:x.t==='prov'?'Proveedores':'Clientes',f:H}]);natGuardar(u8b64(u),'Plantilla-'+(x.t==='prov'?'proveedores':'clientes')+'.xlsx','application/vnd.openxmlformats-officedocument.spreadsheetml.sheet').then(function(d){toast('Plantilla guardada en '+d)},function(){toast('No se pudo guardar la plantilla')})}catch(er){toast('No se pudo armar la plantilla')}return}
 if(a==='im75si'){var nIm=x.L.filter(function(o){return !o.er.length&&(!o.ya||x.upd)}).length;window._im75=im75Aplica;abrirModal('¿Seguro?','Se van a importar '+nIm+' '+(x.t==='prov'?'proveedores':'clientes')+'.',[['Sí, importar','im75ok']]);return}
 if(a==='im75ok'){S.modal=null;var f=window._im75;window._im75=null;if(f)f();return}},true);
/* el botón en Clientes y en Proveedores (administrador) */
function im75Btn(){if(!(S.role==='admin'&&!S.encOn))return;var m=document.querySelector('main');if(!m)return;
 [['clialta','cli','clientes'],['provalta','prov','proveedores']].forEach(function(z){var b=m.querySelector('[data-act="'+z[0]+'"]');if(!b||m.querySelector('[data-act="im75"][data-t="'+z[1]+'"]'))return;var n=document.createElement('button');n.className='btn sec';n.dataset.act='im75';n.dataset.t=z[1];n.style.cssText='margin-top:8px;width:100%;min-height:52px';n.textContent='📥 Importar '+z[2]+' de un Excel';b.after(n)})}

/* render: pasó a tema-dibujar1.js */
