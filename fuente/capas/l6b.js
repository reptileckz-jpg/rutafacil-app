/* ===================== v3.9 · 6b. Datos de ejemplo completos ===================== */
function svgU(s){return 'data:image/svg+xml;charset=utf-8,'+encodeURIComponent(s)}
function docImg(tit,sub,col,lines){var L=(lines||[]).map(function(t,i){return '<text x="118" y="'+(78+i*18)+'" font-size="12" fill="#333" font-family="Arial">'+esc(t)+'</text>'}).join('');
 return svgU('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 200"><rect width="320" height="200" rx="14" fill="#F7F7F2" stroke="#ccc"/><rect width="320" height="40" rx="14" fill="'+col+'"/><rect y="26" width="320" height="14" fill="'+col+'"/><text x="14" y="26" font-size="15" font-weight="700" fill="#fff" font-family="Arial">'+esc(tit)+'</text><rect x="16" y="56" width="86" height="104" rx="8" fill="#DDE3EA"/><circle cx="59" cy="92" r="20" fill="#B9C3CE"/><rect x="31" y="118" width="56" height="30" rx="14" fill="#B9C3CE"/>'+L+'<text x="14" y="188" font-size="10" fill="#999" font-family="Arial">'+esc(sub)+'</text></svg>')}
function papelImg(tit,col,lines){var L=(lines||[]).map(function(t,i){return '<text x="18" y="'+(70+i*20)+'" font-size="13" fill="#333" font-family="Arial">'+esc(t)+'</text>'}).join('');
 return svgU('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 200"><rect width="320" height="200" rx="10" fill="#fff" stroke="#bbb"/><rect width="320" height="36" fill="'+col+'"/><text x="16" y="24" font-size="15" font-weight="700" fill="#fff" font-family="Arial">'+esc(tit)+'</text>'+L+'<text x="16" y="188" font-size="10" fill="#aaa" font-family="Arial">DOCUMENTO DE EJEMPLO · DEMO</text></svg>')}
function fachadaImg(n,col){return svgU('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 160"><rect width="320" height="160" fill="#CFE4F2"/><rect y="120" width="320" height="40" fill="#BFBFB8"/><rect x="40" y="38" width="240" height="88" fill="#F3EFE6" stroke="#999"/><path d="M30 38h260l-14 26H44z" fill="'+col+'"/><path d="M44 64h232" stroke="#fff" stroke-width="2" stroke-dasharray="14 10"/><text x="160" y="56" text-anchor="middle" font-size="15" font-weight="800" fill="#fff" font-family="Arial">'+esc(String(n).toUpperCase().slice(0,26))+'</text><rect x="62" y="78" width="70" height="48" fill="#8DB2D6" stroke="#666"/><rect x="190" y="78" width="40" height="48" fill="#7A5A3A"/><rect x="146" y="80" width="34" height="26" fill="#8DB2D6" stroke="#666"/></svg>')}
function lugarImg(n){return svgU('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 160"><rect width="320" height="160" fill="#DCEFD8"/><path d="M0 110 C80 90 160 130 320 100 V160 H0z" fill="#9BC58F"/><rect x="40" y="62" width="120" height="60" fill="#EDE6D6" stroke="#8a7a60"/><path d="M34 62h132l-66-30z" fill="#B5643A"/><rect x="180" y="84" width="110" height="38" rx="6" fill="#5B6B7A"/><rect x="188" y="76" width="40" height="18" rx="3" fill="#6E7F8F"/><text x="160" y="150" text-anchor="middle" font-size="13" font-weight="700" fill="#2F4F2F" font-family="Arial">'+esc(n)+'</text></svg>')}
function datosDemo(s){if(s._v39)return s;s._v39=1;
 /* vehículos: papeles, seguro, llantas, frenos */
 var VD={1:{vin:'3N6AD33A0PK812345',aseg:'Qualitas',pol:'7700-123456',segTel:'800 800 2880',segVence:'2027-03-15',tcVence:'2027-01-31',verVence:'2027-05-31',llInt:'40000',llLast:'20000',frInt:'30000',frLast:'25000',tara0:'1850',plEdo:'Veracruz',plTipo:'auto'},
  3:{vin:'3N6AD33A4SK554321',aseg:'GNP',pol:'GNP-998877',segTel:'800 400 9000',segVence:'2026-12-10',tcVence:'2027-06-30',verVence:'2027-04-30',llInt:'40000',llLast:'0',frInt:'30000',frLast:'0',tara0:'1900',plEdo:'Veracruz',plTipo:'auto'},
  2:{vin:'1FVACWDT4FHGT1234',aseg:'Qualitas',pol:'7700-654321',segTel:'800 800 2880',segVence:'2027-02-28',tcVence:'2027-03-31',verVence:'2027-03-31',llInt:'60000',llLast:'360000',frInt:'50000',frLast:'370000',plEdo:'Guerrero',plTipo:'carga'}};
 (s.veh||[]).forEach(function(v){var d=VD[v.id];if(!d)return;Object.keys(d).forEach(function(k){if(v[k]==null||v[k]==='')v[k]=d[k]});
  if(!v.fotoPol)v.fotoPol=papelImg('PÓLIZA DE SEGURO','#1F4E9A',[v.aseg+' · póliza '+v.pol,'Vehículo: '+v.n,'Placas: '+v.pl,'Vigencia hasta: '+v.segVence]);
  if(!v.fotoTc)v.fotoTc=papelImg('TARJETA DE CIRCULACIÓN','#7A1F2E',['Placas: '+v.pl,'Serie: '+v.vin,'Marca y modelo: '+v.n,'Vence: '+v.tcVence]);
  if(!v.fotoVer)v.fotoVer=papelImg('CONSTANCIA DE VERIFICACIÓN','#2E7531',['Placas: '+v.pl,'Holograma: 0','Vigente hasta: '+v.verVence])});
 /* personal: INE, licencia y las referencias que faltaban */
 var ED={3:{r2n:'Juana Pérez',r2p:'Hermana',r2t:'228 171 5541',emn:'José Martínez',emp:'Papá',emt:'228 171 2290'}};
 (s.choferes||[]).forEach(function(c){if(c.id===2)return;var d=ED[c.id];if(d)Object.keys(d).forEach(function(k){if(!c[k])c[k]=d[k]});
  if(!c.ine)c.ine=docImg('INSTITUTO NACIONAL ELECTORAL','CREDENCIAL DE EJEMPLO · DEMO','#9C1C55',[String(c.n).toUpperCase(),'DOMICILIO: '+String(c.dir||'').toUpperCase().slice(0,26),'CLAVE: XXXX000000XXX','VIGENCIA 2031']);
  if((!c.puesto||c.puesto==='chofer')&&!c.lic)c.lic=docImg('LICENCIA DE CONDUCIR · VERACRUZ','LICENCIA DE EJEMPLO · DEMO','#1F4E9A',[String(c.n).toUpperCase(),'TIPO: CHOFER','VENCE: '+(c.licV||'')])});
 /* clientes: quién recibe, foto de la fachada, teléfono que faltaba */
 var REC=['Don Beto','Lupita','Doña Chela','Señora Marta','La güera','Don José','Nacho','Toño','Doña Mari','Chucho','Lupe','Rosy','Beto Martínez','Bruno','Paloma','Guayabo','Espe','Lalo','Memo','Chayo','Pancho','Doña Tere','Pradera','Lencero','Lety','Profe Juan','Xali'];
 (s.cli||[]).forEach(function(c,i){if(c.oculto)return;if(!c.recibe)c.recibe=c.ap||REC[i%REC.length];if(!c.tel)c.tel='228 155 '+(4000+c.id*37).toString().slice(-4);if(c.lat==null){c.lat=19.53+((c.id*37)%50)/1000;c.lng=-96.95+((c.id*53)%60)/1000}if(!c.foto)c.foto=fachadaImg(c.n,AVC[c.id%AVC.length])});
 /* Walmart: solo guardado en la lista, sin ruta ni entregas */
 if(!s.cli.some(function(c){return /Walmart/.test(c.n)})){var nid=s.nextCli++;s.cli.push({id:nid,n:'Walmart Xalapa',ap:'',a:'Av. Lázaro Cárdenas 1520, Xalapa',vac:0,cred:0,f:30,km:6,min:15,tel:'228 800 1100',dias:[],chofer:null,lim:0,dp:null,tag:'',credOk:false,compras:0,tipo:'Supermercado',recibe:'Recepción de proveedores',lat:19.556,lng:-96.927,hAb:'07:00',hCi:'12:00',c30:0,mesR:0,mesM:0,credDesde:null,foto:fachadaImg('Walmart Xalapa','#1F4E9A'),grande:true,sinRuta:true})}
 /* proveedores y básculas: foto del lugar */
 Object.keys(s.provDir||{}).forEach(function(n){var d=s.provDir[n];if(!d.foto)d.foto=lugarImg(n)});
 (s.basc||[]).forEach(function(b){if(!b.foto)b.foto=lugarImg(b.n)});
 /* sin señal: Rafa va en su viaje de carga y perdió la señal a las 10:42 */
 s.conn=s.conn||{};if(!s.conn[3])s.conn[3]={on:false,desde:'10:42',pos:'carretera a Tuxtepec, km 84'};
 /* el otro administrador cambió algo ayer en la noche */
 s.hist=s.hist||[];s.hist.push({t:'mar 27 oct 21:10',q:'Ricardo Mejía',x:'Cambió el precio de hoy: $260 la caja y $18 el kilo'});s.hist.push({t:'mar 27 oct 21:12',q:'Ricardo Mejía',x:'Cambió el límite de crédito de Panadería El Trigal a $6,000'});s._histSeed=2;
 /* venta local con su propio precio (puede ser menor: ahí se remata la merma) */
 (s.vlProd||[]).forEach(function(p){if(p.inv==='R'&&(p.p==='13'||p.p==='9'))p.p='12';if(p.inv==='M'&&(p.p==='18'||p.p==='12'))p.p='16'});
 return s}
var _frL6=fresh;fresh=function(){return datosDemo(_frL6.apply(this,arguments))};
datosDemo(S);
/* "con señal / sin señal" también en el mapa y el viaje */
var _rL6b=render;render=function(){_rL6b.apply(this,arguments);try{if(S.role!=='admin')return;offIds().forEach(function(id){var n=chofN(id),c=conn(id),w=document.createTreeWalker($('root'),NodeFilter.SHOW_TEXT,null),x,L=[];while(x=w.nextNode())if(x.nodeValue.indexOf('GPS del teléfono de '+n+' · hace')>-1)L.push(x);L.forEach(function(t){t.nodeValue=t.nodeValue.replace(/GPS del teléfono de ([^·]+)· hace [^·]+/,'Sin señal desde las '+c.desde+' · última ubicación: '+(c.pos||'')+' ')})})}catch(e){}};
