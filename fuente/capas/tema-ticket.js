/* ===================== TEMA · Formato de ticket (nació como tema, 19 nov · punto 143) =====================
   Ricardo mandó el diseño ("me gusta más… para el cierre que se le manda al administrador y para los tickets a los clientes;
   adáptalo a nuestras necesidades pero conserva el formato"): logo, nombre, título, fecha y hora, "=====", datos, tabla
   CANT · DESCRIPCIÓN · P.UNIT · IMPORTE, resumen, total, desglose de dinero, estado, folio y QR.
   - Los renglones se arman aquí con funciones de solo números/texto (tkCorte143, tkNota143); una sola función los dibuja (tkImg143).
   - corteImg (la foto del corte que va al administrador) y notaImg (el ticket del cliente) usan este formato; el texto de WhatsApp
     cuando no se puede mandar la imagen (notaTxt) también. La impresora sigue con sus renglones de siempre.
   - Los números salen de lo mismo de siempre: corteDatos (l40) y la nota guardada (S.nota). No cambia ninguna cuenta.
   Se arma al final. Si se cambia algo del formato del ticket, se cambia AQUÍ.
   ============================================================================================ */
var TK143=44;/* ancho en letras */
function tkM143(v){var n=Math.round(num(v)*100)/100,neg=n<0;n=Math.abs(n);return (neg?'-':'')+'$'+n.toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2})}
function tkPad143(s,w,der){s=String(s==null?'':s);if(s.length>w)s=s.slice(0,w);var p=new Array(w-s.length+1).join(' ');return der?p+s:s+p}
function tkKV143(k,v){k=String(k);v=String(v);var w=TK143-v.length;return tkPad143(k,Math.max(1,w))+v}
function tkFila143(cant,desc,pu,imp){return tkPad143(cant,6)+tkPad143(desc,18)+tkPad143(pu,9,1)+tkPad143(imp,11,1)}
function tkRaya143(c){return new Array(TK143+1).join(c||'-')}
function tkFecha143(f,h){var d=f?dOf(f):TODAY,D=['Dom','Lun','Mar','Mié','Jue','Vie','Sáb'],M=['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'];
 return D[d.getDay()]+' '+d.getDate()+' '+M[d.getMonth()]+' '+d.getFullYear()+(h?'  ·  '+h:'')}
function tkTipo143(t){t=String(t||'');return /mayoreo/i.test(t)?'Mayoreo':(/especial/i.test(t)?'Especial':'Normal')}
function tkCant143(p,q){q=Math.round(num(q)*100)/100;return q.toLocaleString('es-MX')+(p==='R'?' cj':' kg')}
function tkProd143(p){return p==='R'?'Roatán':'Plátano Macho'}
/* encabezado: logo, nombre (si el logo no lo trae), datos del negocio, título y fecha */
function tkCab143(tit,fecha){var L=[{t:'logo'}];var nom=String(S.cfg.nombre||'').toUpperCase();if(nom)L.push({s:nom,c:1,b:1,g:1});
 if(S.cfg.dir)L.push({s:S.cfg.dir,c:1});if(S.cfg.tel)L.push({s:'Tel. '+S.cfg.tel,c:1});L.push({s:tit,c:1,b:1},{s:fecha,c:1},{s:tkRaya143('=')});return L}

/* ---------- el corte que el chofer le manda al administrador ---------- */
function tkCorte143(d){var L=tkCab143('CORTE DE RUTA Y EFECTIVO',tkFecha143(d.f,d.h));
 L.push({kv:1,s:tkKV143('Chofer:',d.ch)});if(d.nEnt!=null)L.push({kv:1,s:tkKV143('Clientes atendidos:',d.nEnt+' entrega'+(d.nEnt===1?'':'s'))});
 L.push({s:tkRaya143()},{f:1,s:tkFila143('CANT','DESCRIPCIÓN','P.UNIT','IMPORTE'),b:1},{s:tkRaya143()});
 (d.lin||[]).forEach(function(x){L.push({f:1,s:tkFila143(tkCant143(x.p,x.q),tkProd143(x.p)+(x.p==='R'||x.t?' ('+tkTipo143(x.t)+')':''),tkM143(x.pr),tkM143(x.q*x.pr))});if(x.t&&x.n)L.push({s:'      → '+x.n})});
 if(!(d.lin||[]).length&&(d.R||d.M)){if(d.R)L.push({f:1,s:tkFila143(tkCant143('R',d.R),'Roatán','','')});if(d.M)L.push({f:1,s:tkFila143(tkCant143('M',d.M),'Macho','','')})}
 L.push({s:tkRaya143()},{s:'RESUMEN DE MERCANCÍA:',b:1},{kv:1,s:tkKV143('Total Roatán:',(num(d.R)||0)+' cajas')},{kv:1,s:tkKV143('Total Macho:',(Math.round(num(d.M)*100)/100)+' kg')},{s:tkRaya143()});
 L.push({kv:1,s:tkKV143('TOTAL VENDIDO:',tkM143(d.vend)),b:1},{s:''},{s:'DESGLOSE DE DINERO:',b:1});
 var cont=d.cont!=null?d.cont:num(d.vend),cred=num(d.cred),ab=num(d.ab),tj=num(d.tarj),tr=num(d.trans),gas=num(d.gas);
 L.push({kv:1,s:tkKV143('(+) Ventas de contado:',tkM143(cont))},{kv:1,s:tkKV143('(-) Ventas a crédito (fiado):',tkM143(cred))},{kv:1,s:tkKV143('(+) Abonos cobrados hoy:',tkM143(ab))});
 if(tj)L.push({kv:1,s:tkKV143('(-) Cobrado con tarjeta:',tkM143(tj))});if(tr)L.push({kv:1,s:tkKV143('(-) Transferencias:',tkM143(tr))});
 L.push({kv:1,s:tkKV143('(-) Gastos de ruta:',tkM143(gas))});
 var aj=r2(num(d.deb)-(cont+ab-tj-tr-gas));if(Math.abs(aj)>=0.01)L.push({kv:1,s:tkKV143('(±) Otros ajustes del cierre:',tkM143(aj))});
 L.push({s:tkRaya143('=')},{kv:1,s:tkKV143('EFECTIVO A ENTREGAR:',tkM143(d.deb)),b:1},{kv:1,s:tkKV143('EFECTIVO ENTREGADO:',tkM143(d.ent)),b:1},{kv:1,s:tkKV143('DIFERENCIA:',tkM143(d.dif)),b:1,r:Math.abs(num(d.dif))>=0.5});
 if(d.bill){var B=[];(typeof BILLETES!=='undefined'?BILLETES:[]).forEach(function(x){var n=num(d.bill['b'+x]);if(n)B.push(n+' × $'+x)});if(num(d.bill.mon))B.push('monedas '+tkM143(d.bill.mon));if(B.length)L.push({s:'Billetes: '+B.join(', ')})}
 var dif=num(d.dif),est=Math.abs(dif)<0.5?'CUADRADO / COMPLETO':(dif<0?'FALTANTE':'SOBRANTE');
 L.push({s:tkRaya143('=')},{kv:1,s:tkKV143('Estado:',est),b:1,r:est!=='CUADRADO / COMPLETO'});if(d.mot&&Math.abs(dif)>=0.5)L.push({s:'Motivo: '+d.mot});
 L.push({kv:1,s:tkKV143('Recibe dinero:',d.dest==='tómbola'?'Tómbola'+(d.bolsa?' · bolsa '+d.bolsa:''):'En mano (Administrador)')});
 if(d.dest!=='tómbola'&&d.bolsa)L.push({kv:1,s:tkKV143('Bolsa No.:',d.bolsa)});
 L.push({kv:1,s:tkKV143('Folio de corte:',d.v||''),b:1},{s:''},{t:'qr'},{s:'Escanéalo para registrar este corte',c:1});return L}

/* ---------- el ticket del cliente (nota de remisión) ---------- */
function tkNota143(n){var L=tkCab143('NOTA DE REMISIÓN No. '+('000'+n.folio).slice(-4),n.fecha?String(n.fecha).replace(/^./,function(c){return c.toUpperCase()}):tkFecha143());
 L.push({kv:1,s:tkKV143('Cliente:',n.cli)},{kv:1,s:tkKV143('Entregó:',n.entrego||'')},{kv:1,s:tkKV143('Recibió:',n.recibio||'______________')});
 L.push({s:tkRaya143()},{f:1,s:tkFila143('CANT','DESCRIPCIÓN','P.UNIT','IMPORTE'),b:1},{s:tkRaya143()});
 var normal=function(t){if(t&&t.t!=='dia'&&num(t.n)&&Math.abs(num(t.n)-num(t.pr))>0.005)L.push({s:'      Precio normal: '+tkM143(t.n)})};
 if(num(n.R)>0){L.push({f:1,s:tkFila143(tkCant143('R',n.R),'Roatán ('+tkTipo143(n.tR?n.tR.txt:(n.may?'Mayoreo':''))+')',tkM143(n.pr),tkM143(num(n.R)*num(n.pr)))});normal(n.tR)}
 if(num(n.M)>0){L.push({f:1,s:tkFila143(tkCant143('M',n.M),'Plátano Macho'+(n.tM&&n.tM.t!=='dia'?' ('+tkTipo143(n.tM.txt)+')':(n.may&&!n.tM?' (Mayoreo)':'')),tkM143(n.pm),tkM143(num(n.M)*num(n.pm)))});normal(n.tM)}
 L.push({s:tkRaya143()},{kv:1,s:tkKV143('TOTAL DE LA ENTREGA:',tkM143(n.total)),b:1},{s:''},{s:'PAGO:',b:1},{kv:1,s:tkKV143('(+) Pagó:',tkM143(n.pago))});
 var queda=r2(num(n.total)-num(n.pago));if(queda>0.005)L.push({kv:1,s:tkKV143('(-) Quedó a crédito:',tkM143(queda)),r:1});
 if(num(n.abono)>0)L.push({kv:1,s:tkKV143('(+) Abono a deuda anterior:',tkM143(n.abono))});
 L.push({s:tkRaya143('=')},{kv:1,s:tkKV143('SALDO PENDIENTE:',tkM143(n.cred)),b:1,r:num(n.cred)>0.005});
 L.push({kv:1,s:tkKV143('Cajas vacías que devuelve:',String(num(n.V)))},{kv:1,s:tkKV143('Cajas vacías que debe:',String(num(n.vacDebe))),r:num(n.vacDebe)>0});
 if(n.prox)L.push({kv:1,s:tkKV143('Próxima visita:',n.prox)});L.push({s:tkRaya143('=')},{s:'¡Gracias por su compra!',c:1,b:1});return L}

/* ---------- dibujar: logo, letra de ancho fijo y QR ---------- */
function tkImg143(L,qr){var F=15,CW=9,PAD=20;try{var mc=document.createElement('canvas').getContext('2d');mc.font=F+'px monospace';CW=mc.measureText('0000000000').width/10||9}catch(e){}var W=Math.ceil(TK143*CW+PAD*2),LH=24,Q=230,src=null,im=null,lw=0,lh=0;try{src=logoTkSrc();im=src?tkImg(src):null}catch(e){}
 if(im&&im.complete&&im.naturalWidth){lw=Math.min(160,im.naturalWidth);lh=Math.round(lw*im.naturalHeight/im.naturalWidth);if(lh>150){lh=150;lw=Math.round(150*im.naturalWidth/im.naturalHeight)}}
 var H=PAD;L.forEach(function(x){H+=x.t==='logo'?(lh?lh+10:0):(x.t==='qr'?(qr?Q+10:0):(x.g?LH+6:LH))});H+=PAD;
 var cv=document.createElement('canvas');cv.width=W;cv.height=H;var cx=cv.getContext('2d');cx.fillStyle='#fff';cx.fillRect(0,0,W,H);var y=PAD;cx.textBaseline='top';
 L.forEach(function(x){if(x.t==='logo'){if(lh){try{cx.drawImage(im,W/2-lw/2,y,lw,lh)}catch(e){}y+=lh+10}return}
  if(x.t==='qr'){if(qr){try{QR.canvas(cx,qr,(W-Q)/2,y,Q,false)}catch(e){}y+=Q+10}return}
  cx.fillStyle=x.r?'#B3261E':'#111';cx.font=(x.b?'bold ':'')+(x.g?F+4:F)+'px monospace';
  /* 143 · columnas dibujadas por separado: CANT y DESCRIPCIÓN a la izquierda; P.UNIT e IMPORTE (encabezado y precios) a la derecha
     contra su orilla, para que los $ y los puntos decimales queden en línea sin importar la letra del celular */
  /* las rayas ==== y ---- de orilla a orilla */
  if(/^=+$/.test(String(x.s||''))){cx.fillRect(PAD,y+7,W-PAD*2,2);cx.fillRect(PAD,y+12,W-PAD*2,2);y+=LH;return}
  if(/^-+$/.test(String(x.s||''))){for(var dx=PAD;dx<W-PAD;dx+=8)cx.fillRect(dx,y+10,5,1.5);y+=LH;return}
  if(x.f){var S6=String(x.s),col=function(a,b){return S6.slice(a,b).trim()};cx.textAlign='left';cx.fillText(col(0,6),PAD,y);cx.fillText(col(6,24),PAD+6*CW,y);
   cx.textAlign='right';cx.fillText(col(24,33),PAD+33*CW,y);cx.fillText(col(33,44),PAD+44*CW,y)}
  else if(x.kv){var m=/^(.*?:)\s+(.*)$/.exec(String(x.s));if(m){cx.textAlign='left';cx.fillText(m[1],PAD,y);cx.textAlign='right';cx.fillText(m[2],W-PAD,y)}else{cx.textAlign='left';cx.fillText(x.s,PAD,y)}}
  else if(x.c){cx.textAlign='center';cx.fillText(x.s,W/2,y)}else{cx.textAlign='left';cx.fillText(x.s,PAD,y)}y+=x.g?LH+6:LH});
 return cv.toDataURL('image/png')}
function tkTxt143(L){return '```\n'+L.filter(function(x){return !x.t}).map(function(x){if(!x.c)return x.s;var p=Math.max(0,Math.floor((TK143-String(x.s).length)/2));return new Array(p+1).join(' ')+x.s}).join('\n')+'\n```'}

/* el corte y el ticket del cliente con este formato (antes: renglones "concepto ··· valor") */
corteImg=function(d){return tkImg143(tkCorte143(d),corteQR(d))};
notaImg=function(n){return tkImg143(tkNota143(n),null)};
notaTxt=function(n){return tkTxt143(tkNota143(n))};
