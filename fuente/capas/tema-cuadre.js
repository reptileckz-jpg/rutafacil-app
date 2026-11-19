/* ===================== TEMA · 💰 Cuadre: el dinero de cada día, semana y mes (nació como tema, 18 nov · punto 121) =====================
   Ricardo: "un historial para revisar cada cierre y poder cuadrar la caja… ver lo que hizo cada repartidor, las fotos de sus vehículos,
   las fotos que tomaron, a los clientes que les dieron crédito, que les prestaron taras… cuánto se vendió a crédito, cuánto en total,
   cuál fue la ganancia, el desgaste de los vehículos, el sueldo de cada chofer… y el total neto del día; por día, semana o mes".
   Dónde: arriba en Inicio ("💰 Cuadre de hoy"), en Más y desde los números de Finanzas (decisión de Ricardo).
   Las cuentas:
   - Ventas = lo vendido en todas las rutas (cada cierre) + venta en bodega; de contado / a crédito; abonos a deudas viejas aparte.
   - Ganancia de la fruta = ventas − lo que costó esa fruta (costo por caja y por kilo de las cargas, igual que Estadísticas).
   - Gastos de operación = los gastos del día, SIN sueldos (van por día), sin retiros del dueño, sin abonos a capital,
     y sin servicios/reparaciones del vehículo (esos se pagan del fondo del desgaste; se muestran aparte para no contarlos dos veces).
   - Desgaste = km de cada ruta (odómetro) × el desgaste por km de su vehículo ($0.70 al empezar; calculadora de desgaste).
   - Sueldos del día = sueldo por día trabajado (semanal ÷ 6, como las faltas) de cada quien que trabajó + comisiones de ese día.
   - Merma del día. Neto = ganancia − gastos de operación − desgaste − sueldos − comisiones − merma.
   Si se cambia algo de esto, se cambia AQUÍ.
   ============================================================================================ */
var DS121=['dom','lun','mar','mié','jue','vie','sáb'],MS121=['ene','feb','mar','abr','may','jun','jul','ago','sep','oct','nov','dic'];
function fC121(s){var d=dOf(s);return DS121[d.getDay()]+' '+d.getDate()+' '+MS121[d.getMonth()]}
function addD121(s,n){var d=dOf(s);d.setDate(d.getDate()+n);return iso(d)}
function lunes121(s){var d=dOf(s);return addD121(s,-((d.getDay()+6)%7))}

/* ---------- fotos: en el historial se guarda la referencia (no la foto entera, para no llenar el celular) ---------- */
var FOTOS121={};
function fotoRef121(x){if(!x||typeof x!=='string')return null;try{if(typeof FOTO_MARCA!=='undefined'&&x.indexOf(FOTO_MARCA)===0)return 'f121:'+x.slice(FOTO_MARCA.length).replace(/⟧$/,'')}catch(e){}
 if(x.indexOf('f121:')===0)return x;if(x.slice(0,5)!=='data:')return null;try{if(typeof NB!=='undefined'&&NB.on&&NB.ad&&typeof nbFotoMarca==='function'){var m=nbFotoMarca(x);return 'f121:'+m.slice(FOTO_MARCA.length).replace(/⟧$/,'')}}catch(e){}return x}
function fotosRuta121(r){var o={ini:{},fin:{},tk:[]};if(!r)return o;var s=r.salida||{};
 [['fotos','ini'],['fotosFin','fin']].forEach(function(g){var G=s[g[0]]||{};Object.keys(G).forEach(function(k){var f=fotoRef121(G[k]);if(f)o[g[1]][k]=f})});
 (r.gch||[]).forEach(function(g){var f=fotoRef121(g&&g.foto);if(f)o.tk.push({t:g.tipo||'Gasto',m:num(g.m),f:f})});
 (r.recs||[]).forEach(function(x){var f=fotoRef121(x&&x.foto);if(f)o.tk.push({t:'Combustible',m:num(x.total),f:f})});return o}
function fotoSrc121(ref){if(!ref)return '';if(ref.slice(0,5)==='data:')return ref;if(ref.indexOf('f121:')!==0)return '';var id=ref.slice(5);if(FOTOS121[id])return FOTOS121[id];
 try{if(NB.fotos&&NB.fotos[id])return NB.fotos[id]}catch(e){}trae121(id);return ''}
function trae121(id){if(FOTOS121['_'+id])return;FOTOS121['_'+id]=1;try{if(!(typeof NB!=='undefined'&&NB.ad))return;NB.ad.get(nbP('f/'+id)).then(function(d){var u=d&&d.d;if(!u){var t=parseInt(id.split('-')[0],36);u=t&&Date.now()-t>59*864e5?FOTO_BORRADA:''}if(u){FOTOS121[id]=u;if(S.role==='admin'&&(S.tab.admin==='cuadre121'||S.tab.admin==='cierreadm'))render()}/* 131 · también al recibir el cierre */},function(){})}catch(e){}}
var FOTO_N121={frente:'Frente',atras:'Atrás',izq:'Izquierdo',der:'Derecho',odo:'Odómetro',gas:'Gasolina'};
function fotosHTML121(F){if(!F)return '';var t=function(ref,l){var s=fotoSrc121(ref);return '<button data-act="foto121" data-ref="'+esc(ref)+'" data-l="'+esc(l)+'" style="padding:0;border:1px solid var(--line);border-radius:10px;overflow:hidden;background:var(--bg);width:31%;min-height:70px;display:flex;flex-direction:column;align-items:stretch">'+(s?'<img src="'+s+'" alt="'+esc(l)+'" style="width:100%;height:64px;object-fit:cover;display:block">':'<span class="lbl" style="height:64px;display:flex;align-items:center;justify-content:center">cargando…</span>')+'<span style="font-size:11px;padding:2px 4px">'+esc(l)+'</span></button>'};
 var g=function(tit,o){var K=Object.keys(o||{});return K.length?'<div class="lbl" style="margin-top:6px"><b>'+tit+'</b></div><div style="display:flex;flex-wrap:wrap;gap:6px;margin-top:4px">'+K.map(function(k){return t(o[k],FOTO_N121[k]||k)}).join('')+'</div>':''};
 var tk=(F.tk||[]).length?'<div class="lbl" style="margin-top:6px"><b>Tickets</b></div><div style="display:flex;flex-wrap:wrap;gap:6px;margin-top:4px">'+F.tk.map(function(x){return t(x.f,x.t+' '+money(x.m))}).join('')+'</div>':'';
 var h=g('Vehículo al salir',F.ini)+g('Vehículo al llegar',F.fin)+tk;return h||'<div class="lbl" style="margin-top:6px">Sin fotos.</div>'}
document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act="foto121"]');if(!b)return;e.preventDefault();e.stopImmediatePropagation();var s=fotoSrc121(b.dataset.ref);
 ovPon70('foto121ov',ovW70('foto121ov',b.dataset.l||'Foto',s?'<img src="'+s+'" alt="'+esc(b.dataset.l||'Foto')+'" style="width:100%;border-radius:12px;display:block">':'<div class="lbl">La foto todavía se está bajando de la nube. Intenta en un momento.</div>','foto121x'))},true);
document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act="foto121x"]');if(!b)return;e.preventDefault();e.stopImmediatePropagation();ovPon70('foto121ov','')},true);

/* ---------- las cuentas de un día ---------- */
var MANT121=/ponchadura|reparaci|aceite|llanta|taller|mantenimiento|^veh[ií]culo:/i,FUERA121=/^sueldos?$|^retiro del due|abono a capital/i;
function costoDia121(d){try{return costoEn82(d)}catch(e){return {R:0,M:0}}}
function rutaGastos121(d,ch,vivo){var n=chofN(ch)+' · ',L=(S.gastos||[]).filter(function(g){return g&&(g.f||g.f82)===d&&/^(Gasto de ruta|Combustible de reparto)$/.test(String(g.t||''))&&String(g.n||'').indexOf(n)===0}).map(function(g){return {t:g.t==='Combustible de reparto'?'Combustible':String(g.n||'').slice(n.length)||g.t,m:num(g.m)}});
 if(vivo&&!(vivo.cierre&&vivo.cierre.sent)){(vivo.gch||[]).forEach(function(g){L.push({t:(g.tipo||'Gasto')+' (sin cerrar)',m:num(g.m)})});(vivo.recs||[]).forEach(function(x){L.push({t:'Combustible (sin cerrar)',m:num(x.total)})})}return L}
function cuadreDia121(d){var hoy=iso(TODAY),c=costoDia121(d),P=[],lin145={};try{P=rutasDia120(d)}catch(e){}var CH={},ord=[];
 P.forEach(function(x){var L=(x.log||[]).filter(function(l){return l&&!l.anul}),r=x.res||{},ch=+x.ch;
  var o=CH[ch];if(!o){o=CH[ch]={ch:ch,n:chofN(ch),partes:[],venta:0,contado:0,cred:0,ab:0,R:0,M:0,gan:0,km:0,desg:0,deb:0,ent:0,rec:0,creditos:[],abonos:[],taras:[],precios:[],veh:{},vivo:null};ord.push(ch)}
  var p={n:x.n,parcial:x.parcial,resc:x.resc,sent:x.sent,vivo:!!x.vivo,h:(x.corte&&x.corte.h)||(x.e&&x.e.h120)||'',corte:x.corte||null,rec:x.reg&&x.reg.rec!=null?num(x.reg.rec):null,deb:num(r.efectivo),venta:0,cob:0,gan:0,com:0};var cz159=(S.choferes||[]).filter(function(z){return +z.id===ch})[0];
  L.forEach(function(l){var t=num(l.total),pg=num(l.pago),cl0=cl(l.c),nm=cl0?cl0.n:(l.rescate120?'(cierre recuperado)':'Cliente');p.venta+=t;p.cob+=pg+num(l.abono);o.venta+=t;o.contado+=pg;o.ab+=num(l.abono);o.R+=num(l.R);o.M+=num(l.M);
   o.gan+=num(l.R)*(num(l.pr||S.precio.R)-num(c.R))+num(l.M)*(num(l.pm||S.precio.M)-num(c.M));p.gan+=num(l.R)*(num(l.pr||S.precio.R)-num(c.R))+num(l.M)*(num(l.pm||S.precio.M)-num(c.M));/* 159 */try{if(cz159&&cz159.sz&&cz159.sz.tipo==='base'&&!esAdm(cz159))p.com+=comDeLog(cz159,l)}catch(e){}
   if(t-pg>0.005){o.cred+=t-pg;o.creditos.push({n:nm,m:r2(t-pg),R:num(l.R),M:num(l.M)})}if(num(l.abono)>0.005)o.abonos.push({n:nm,m:num(l.abono)});preciosLog135(l).forEach(function(x){o.precios.push({n:nm,x:x})});/* 135 */lin145Pon(lin145,l,c);/* 145 */
   var dej=num(l.R),rec=num(l.V);if(!l.rescate120&&(dej||rec)&&dej!==rec)o.taras.push({n:nm,dejo:dej,recogio:rec,rotas:num(l.Vr),neto:dej-rec})});
  /* km, vehículo y desgaste de esta parte */
  var vr=x.r||null,vid=r.veh68!=null?r.veh68:(vr&&vr.vehHoy),vh=vid!=null?vehById(+vid):null,km=Math.max(0,num(r.km));
  if(!km&&vr&&vr.cierre){var a=num(vr.cierre.odoIni),b=num(vr.cierre.odo);if(a>0&&b>a&&vr.cierre.sent)km=b-a}
  var tasa=vh?tasa68(vh):(r.tasa68!=null&&r.tasa68!==''?num(r.tasa68):0.7);/* el desgaste de hoy del vehículo (si lo calibras, se recalcula) */p.km=km;p.tasa=tasa;p.desg=r2(km*tasa);p.veh=vh?vh.n:'';o.km+=km;o.desg+=p.desg;if(vh){var vv=o.veh[vh.id]=o.veh[vh.id]||{n:vh.n,km:0,desg:0,tasa:tasa,id:vh.id};vv.km+=km;vv.desg+=p.desg}
  p.fotos=x.e&&x.e.fotos121?x.e.fotos121:(vr?fotosRuta121(vr):null);
  if(x.sent||x.parcial){o.deb+=p.deb;if(p.corte&&p.corte.ent!=null)o.ent+=num(p.corte.ent);if(p.rec!=null)o.rec+=p.rec}
  if(x.vivo)o.vivo=vr;o.partes.push(p)});
 /* gastos de la ruta de cada chofer, sueldo y comisión del día */
 var G=(S.gastos||[]).filter(function(g){return g&&(g.f||g.f82)===d}),op=0,mant=0,fuera=0,cat={},vivoG=0;
 G.forEach(function(g){var t=String(g.t||''),m=num(g.m);if(FUERA121.test(t)){fuera+=m;return}if(MANT121.test(t)){mant+=m;return}op+=m;var k=t||'Otro';cat[k]=(cat[k]||0)+m});
 var CHL=ord.map(function(ch){var o=CH[ch];o.gastos=rutaGastos121(d,ch,d===hoy?o.vivo:null);o.gasT=r2(sum(o.gastos,function(g){return g.m}));o.gan=r2(o.gan);o.desg=r2(o.desg);
  o.gastos.forEach(function(g){if(/sin cerrar/.test(g.t)){op+=g.m;vivoG+=g.m;cat['Gastos de ruta sin cerrar']=(cat['Gastos de ruta sin cerrar']||0)+g.m}});return o});
 /* sueldos: cada quien que trabajó ese día (no descansó ni faltó) */
 var SU=[],comT=0,suT=0;(S.choferes||[]).forEach(function(c){if(!c||esAdm(c)||!c.sz||c.sz.tipo==='ninguno')return;var trabajo=false;try{trabajo=activo118(c,d)&&dOf(d).getDay()!==descDe118(c,d)&&marca118(c,d)!=='falta'}catch(e){trabajo=false}
  var s=trabajo?r2(diaSz118(c)):0,com=0;if(c.sz.tipo==='base'&&CH[c.id]){try{(rutasDia120(d)||[]).filter(function(x){return +x.ch===+c.id}).forEach(function(x){(x.log||[]).forEach(function(l){if(l&&!l.anul)com+=comDeLog(c,l)})})}catch(e){}}
  com=r2(com);if(!(s||com))return;var sTx=s?szTxt128(c):'';SU.push({ch:c.id,n:c.n,s:s,com:com,sTx:sTx,vac:marca118(c,d)==='vac'});suT+=s;comT+=com;
  if(CH[c.id]){CH[c.id].sueldo=s;CH[c.id].com=com;CH[c.id].sTx=sTx;if(c.sz.tipo==='base'){var LL=[];try{(rutasDia120(d)||[]).filter(function(x){return +x.ch===+c.id}).forEach(function(x){(x.log||[]).forEach(function(l){if(l&&!l.anul)LL.push(l)})})}catch(e){}CH[c.id].comD=comDesg128(c,LL)}}});
 CHL.forEach(function(o){o.sueldo=o.sueldo||0;o.com=o.com||0;o.neto=r2(o.gan-o.gasT-o.desg-o.sueldo-o.com);salidas159(o)});
 /* venta en bodega (venta local), abonos cobrados en bodega, merma */
 var kgC=20;try{kgC=num(vlKgCaja())||20}catch(e){}var loc={venta:0,gan:0,n:0};(S.vlVentas||[]).filter(function(v){return v&&v.f82===d}).forEach(function(v){loc.n++;(v.lin||[]).forEach(function(l){var t=num(l.kg)*num(l.pk),M=false;try{M=vlInv82(l.p)==='M'}catch(e){}loc.venta+=t;loc.gan+=t-(M?num(l.kg)*num(c.M):num(l.kg)*num(c.R)/kgC)})});
 var abB=r2(sum((S.cobros||[]).filter(function(x){return x&&x.f===d&&+x.c!==0&&x.n!=='viaje'&&x.n!=='Venta local'}),function(x){return num(x.m)})),
  merma=r2(sum((S.mermas||[]).filter(function(m){return m&&m.fecha===d}),function(m){return num(m.valor)})),
  cc=(S.cajaCierres||[]).filter(function(x){return x&&x.f===d});
 var T={d:d,lin:Object.keys(lin145).map(function(k){return lin145[k]}),ch:CHL,su:SU,loc:{venta:r2(loc.venta),gan:r2(loc.gan),n:loc.n},abB:abB,merma:merma,cat:cat,op:r2(op),mant:r2(mant),fuera:r2(fuera),caja:cc,
  venta:r2(sum(CHL,function(o){return o.venta})+loc.venta),contado:r2(sum(CHL,function(o){return o.contado})+loc.venta),cred:r2(sum(CHL,function(o){return o.cred})),ab:r2(sum(CHL,function(o){return o.ab})+abB),
  R:sum(CHL,function(o){return o.R}),M:r2(sum(CHL,function(o){return o.M})),gan:r2(sum(CHL,function(o){return o.gan})+loc.gan),km:sum(CHL,function(o){return o.km}),desg:r2(sum(CHL,function(o){return o.desg})),su:SU,suT:r2(suT),comT:r2(comT),
  deb:r2(sum(CHL,function(o){return o.deb})),ent:r2(sum(CHL,function(o){return o.ent})),rec:r2(sum(CHL,function(o){return o.rec})),cierres:sum(CHL,function(o){return o.partes.filter(function(p){return p.sent||p.parcial}).length})};
 T.cR=r2(num(c.R));T.cM=r2(num(c.M));/* 142 */T.sinCosto=(T.R>0&&!(num(c.R)>0))||(T.M>0&&!(num(c.M)>0));T.neto=r2(T.gan-T.op-T.desg-T.suT-T.comT-T.merma);return T}
/* varios días juntos (semana, mes) */
function cuadreRango121(d0,d1){var D=[],d=d0,i=0,h=iso(TODAY);if(d1>h)d1=h;while(d<=d1&&i<370){D.push(cuadreDia121(d));d=addD121(d,1);i++}
 var A={dias:D,lin145:{},cat:{},venta:0,contado:0,cred:0,ab:0,R:0,M:0,gan:0,km:0,desg:0,suT:0,comT:0,merma:0,op:0,mant:0,neto:0,deb:0,ent:0,rec:0,cierres:0,ch:{},su:{},loc:{venta:0,gan:0}};
 D.forEach(function(x){if(x.sinCosto)A.sinCosto=true;['venta','contado','cred','ab','abB','R','M','gan','km','desg','suT','comT','merma','op','mant','neto','deb','ent','rec','cierres'].forEach(function(k){A[k]=num(A[k])+num(x[k])});A.loc.venta+=x.loc.venta;A.loc.gan+=x.loc.gan;
  Object.keys(x.cat).forEach(function(k){A.cat[k]=(A.cat[k]||0)+x.cat[k]});(x.lin||[]).forEach(function(y){var k=y.p+'|'+y.tp+'|'+y.pr,G=A.lin145[k]=A.lin145[k]||{p:y.p,tp:y.tp,pr:y.pr,q:0,m:0,c:y.c};G.q=r2(G.q+y.q);G.m=r2(G.m+y.m)});/* 145 */
  x.ch.forEach(function(o){var a=A.ch[o.ch]=A.ch[o.ch]||{ch:o.ch,n:o.n,venta:0,cred:0,gan:0,km:0,desg:0,gasT:0,sueldo:0,com:0,neto:0,cierres:0,dias:0,deb:0,ent:0,rec:0};['venta','cred','gan','km','desg','gasT','sueldo','com','neto','deb','ent','rec'].forEach(function(k){a[k]+=num(o[k])});if(o.comD){a.comCaj=(a.comCaj||0)+o.comD.cajas;a.comKg=(a.comKg||0)+o.comD.kg}a.cierres+=o.partes&&o.partes.length?o.partes.filter(function(p){return p.sent||p.parcial}).length:num(o.cierres);a.dias++});
  x.su.forEach(function(s){var a=A.su[s.ch]=A.su[s.ch]||{n:s.n,s:0,com:0,dias:0};a.s+=s.s;a.com+=s.com;if(s.s)a.dias++})});
 Object.keys(A).forEach(function(k){if(typeof A[k]==='number')A[k]=r2(A[k])});A.lin=Object.keys(A.lin145).map(function(k){return A.lin145[k]});return A}

/* ---------- 128 · la comisión y el sueldo del día, explicados (solo números; la pantalla está en comHTML128) ----------
   Usa la MISMA cuenta que el sueldo (comDeLog de l18), entrega por entrega, así que el total es idéntico al que se resta.
   Comisión: solo cuenta el dinero que sí entró (contado y abonos); lo fiado cuenta el día que se cobra; el mayoreo que da el chofer a mano paga la mitad. */
function szTxt128(c){var z=c&&c.sz||{};if(z.tipo==='semana')return money(num(z.monto))+' a la semana ÷ 6 días';if(z.tipo==='base')return 'base de '+money(num(z.base))+' a la semana ÷ 6 días';if(z.tipo==='dia')return money(num(z.porDia))+' por día trabajado';return ''}
function comDesg128(c,L){var z=c.sz||{},pct=comModo(c)==='pct',cP=comPct(c),D={pct:pct,comC:num(z.comC),comK:num(z.comK),comP:num(z.comP),cP:cP,precioR:num(S.precio.R),precioM:num(S.precio.M),
  cajas:0,kg:0,parteN:0,parte:0,cobrado:0,mitad:0,mitadN:0,abonos:0,abCom:0,fiR:0,fiM:0,fiado:0,base:0,filas:[],total:0};
 (L||[]).forEach(function(l){if(!l||l.anul)return;var v=comDeLog(c,l),t=num(l.total),pg=num(l.pago),f=t>0?Math.min(1,pg/t):0,mi=comMitad(l),R=num(l.R),M=num(l.M),ab=num(l.abono);
  var b=pct?pg*D.comP/100:(R*D.comC+M*D.comK)*f;/* lo de esta entrega sin descuentos */
  if(f>=0.9999){D.cajas+=R;D.kg+=M}else if(f>0){D.parteN++;D.parte+=b}D.cobrado+=pg;D.base+=b;if(mi<1){D.mitad+=b*(1-mi);D.mitadN++}if(ab>0.005){D.abonos+=ab;D.abCom+=ab*cP}
  if(f<1&&t>0.005){D.fiR+=R*(1-f);D.fiM+=M*(1-f);D.fiado+=t-pg}
  var cli=cl(l.c),nm=cli?cli.n:(l.rescate120?'(cierre recuperado)':'Cliente'),q=[];if(R)q.push(R+' caja'+(R===1?'':'s'));if(M)q.push(M+' kg');
  var como=t>0.005?(f>=0.9999?'pagó todo':(pg>0.005?'pagó '+money(pg)+' de '+money(t)+': cuenta lo que pagó':'quedó fiado: todavía no cuenta')):'';
  var nota=[como];if(mi<1)nota.push('mayoreo que dio él: gana la mitad');if(ab>0.005)nota.push('abonó '+money(ab)+' de lo que debía');
  D.filas.push({n:nm,q:q.join(' y '),nota:nota.filter(Boolean).join(' · '),m:v});D.total+=v});
 ['cajas','kg','parte','cobrado','mitad','abonos','abCom','fiR','fiM','fiado','base','total'].forEach(function(k){D[k]=r2(D[k])});return D}
/* renglones del resumen de la comisión: cada uno con su monto; si por centavos no da el total, se dice */
/* de quién es cada comisión (en un día T.su es una lista; en semana y mes, un objeto por persona) */
function comQuien128(T){var su=T.su||[],L=Array.isArray(su)?su:Object.keys(su).map(function(k){return su[k]});return L.filter(function(x){return x&&num(x.com)>0.005}).map(function(x){return esc(x.n)+' '+money(r2(num(x.com)))}).join(' · ')}
function comFilas128(D){var F=[],n=function(x){return (Math.round(x*100)/100).toLocaleString('es-MX')};
 if(D.pct){if(D.cobrado||!D.abonos)F.push(['Cobrado en sus entregas',money(D.cobrado)+' × '+n(D.comP)+'%',r2(D.cobrado*D.comP/100)])}
 else{if(D.comC&&(D.cajas||!D.kg&&!D.parteN))F.push(['Cajas pagadas completas',n(D.cajas)+' caja'+(D.cajas===1?'':'s')+' × '+money(D.comC),r2(D.cajas*D.comC)]);if(D.comK&&D.kg)F.push(['Kilos pagados completos',n(D.kg)+' kg × '+money(D.comK),r2(D.kg*D.comK)]);
  if(D.parteN)F.push(['Pagadas en parte',D.parteN+' entrega'+(D.parteN===1?'':'s')+': cuenta solo la parte que pagaron (abajo, entrega por entrega)',D.parte])}
 if(D.mitad>0.005)F.push(['Mayoreo que dio él',D.mitadN+' entrega'+(D.mitadN===1?'':'s')+': gana la mitad',-D.mitad]);
 if(D.abonos>0.005)F.push(['Abonos de deudas de antes',money(D.abonos)+(D.pct?' × '+n(D.comP)+'%':' · igual que una venta ('+(D.comC&&D.precioR?money(D.comC)+' por cada '+money(D.precioR):money(D.comK)+' por cada '+money(D.precioM))+')'),D.abCom]);
 var s=r2(F.reduce(function(a,x){return a+r2(x[2])},0)),dif=r2(D.total-s);if(Math.abs(dif)>=0.005)F.push(['Centavos de redondeo','',dif]);return F}

/* 145 · las ventas por producto, tipo de precio (Normal / Mayoreo / Especial) y precio, con lo que dejó cada grupo (precio − costo × cantidad) */
function lin145Pon(G,l,c){if(!l||l.anul)return;['R','M'].forEach(function(p){var q=num(l[p]);if(!(q>0))return;var pr=num(p==='R'?(l.pr||S.precio.R):(l.pm||S.precio.M)),cu=num(p==='R'?c.R:c.M),
  x=(typeof preciosLog135==='function'?preciosLog135(l):[]).filter(function(y){return y.p===p})[0],tp=x?(/mayoreo/i.test(x.txt)?'Mayoreo':'Especial'):'Normal',k=p+'|'+tp+'|'+pr,o=G[k]=G[k]||{p:p,tp:tp,pr:pr,q:0,m:0,c:cu};
  o.q=r2(o.q+q);o.m=r2(o.m+q*(pr-cu))})}

/* ---------- la pantalla ---------- */
function comHTML128(o,k){var D=o.comD,ab=S.dOpen[k+'com']?' open':'';
 var h='<details data-k="'+k+'com"'+ab+'><summary style="display:flex;justify-content:space-between;align-items:flex-start;min-height:44px;gap:8px"><span>− Comisión por repartir<br><span class="lbl">lo que gana por lo que cobró · toca para ver cómo sale</span></span><b style="white-space:nowrap">'+money(o.com)+'</b></summary>';
 if(!D){return h+'<div class="lbl" style="margin:4px 0 8px">El detalle de este día ya no se guarda (solo el total).</div></details>'}
 h+='<div class="card note" style="padding:8px 10px;margin:6px 0"><b>Cómo gana su comisión</b><div class="lbl">'+(D.pct?'El '+(Math.round(D.comP*100)/100).toLocaleString('es-MX')+'% de todo lo que cobra.':[D.comC?money(D.comC)+' por cada caja que cobra':'',D.comK?money(D.comK)+' por cada kilo que cobra':''].filter(Boolean).join(' y ')+'.')
  +' Solo cuenta el dinero que sí entró: lo fiado le cuenta el día que se cobre. Si él da precio de mayoreo, gana la mitad.</div></div>';
 h+=comFilas128(D).map(function(x){return rwN121('&nbsp;&nbsp;'+x[0],(x[2]<0?'−':'')+money(Math.abs(x[2])),x[2]<0?'neg':'',x[1])}).join('');
 h+='<div class="row" style="min-height:44px;border-top:1px solid var(--line)"><b>Comisión del día</b><b>'+money(o.com)+'</b></div>';
 if(D.fiado>0.005)h+='<div class="lbl" style="margin:2px 0 6px">Quedó fiado '+money(D.fiado)+': esa parte no le cuenta hoy; le cuenta el día que se cobre.</div>';
 if(D.filas.length)h+='<div class="lbl" style="margin-top:6px"><b>Entrega por entrega ('+D.filas.length+')</b></div>'+D.filas.map(function(x){return rwN121('&nbsp;&nbsp;'+esc(x.n)+(x.q?' · '+x.q:''),money(x.m),'',esc(x.nota))}).join('');
 return h+'</details>'}
function rwN121(l,v,cls,sub){return '<div class="row" style="min-height:44px;align-items:flex-start"><span>'+l+(sub?'<br><span class="lbl">'+sub+'</span>':'')+'</span><b class="'+(cls||'')+'" style="white-space:nowrap">'+v+'</b></div>'}
/* ---------- 145 · Ricardo mandó un diseño para el resultado de arriba del Cuadre ("el de ticket se ve muy revuelto; este me parece mucho
   mejor, compleméntalo con la información que tenemos"): tarjeta verde con la ganancia neta y el margen, barra de "¿a dónde se fue tu
   ganancia de fruta?", avisos que se tocan, y dos grupos de renglones que se abren (Flujo de ventas e ingresos · Gastos y comisiones),
   con la flecha que brinca para recordar que se pueden abrir. Sin Tailwind ni letras de internet (la app funciona sin señal).
   Las cuentas son las mismas (cuadreDia121 / cuadreRango121). ---------- */
function cdM145(v){return typeof tkM143==='function'?tkM143(v):money(v)}
function cdCss145(){if(document.getElementById('css145'))return;var st=document.createElement('style');st.id='css145';st.textContent=[
 '.cd145{display:flex;flex-direction:column;gap:14px;margin:6px 0 12px}',
 '.cd145 .k5hero{background:linear-gradient(135deg,#14532D 0%,#166534 100%);color:#fff;border-radius:18px;padding:18px;position:relative;overflow:hidden;box-shadow:0 8px 20px rgba(5,46,22,.25)}',
 '.cd145 .k5hero:before{content:"";position:absolute;right:-30px;top:-30px;width:140px;height:140px;border-radius:50%;background:rgba(250,204,21,.10)}',
 '.cd145 .k5hb{display:flex;justify-content:space-between;align-items:center;gap:8px;flex-wrap:wrap}',
 '.cd145 .k5chip{display:inline-flex;align-items:center;gap:6px;font-size:11px;font-weight:800;text-transform:uppercase;letter-spacing:.05em;border-radius:99px;padding:3px 10px}',
 '.cd145 .k5chip.y{background:#FACC15;color:#14532D}.cd145 .k5chip.d{background:rgba(0,0,0,.25);color:#FEF08A;border:1px solid rgba(253,224,71,.25);text-transform:none;letter-spacing:0}',
 '.cd145 .k5hero .k5big{color:#fff;font-size:36px;font-weight:800;letter-spacing:-.02em;margin:6px 0 2px;font-variant-numeric:tabular-nums}',
 '.cd145 .k5pills{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:10px;padding-top:10px;border-top:1px solid rgba(255,255,255,.15)}',
 '.cd145 .k5pill{border-radius:12px;padding:8px 12px;border:1px solid rgba(255,255,255,.1);background:rgba(255,255,255,.1);font-variant-numeric:tabular-nums}.cd145 .k5pill.o{background:rgba(0,0,0,.2)}',
 '.cd145 .k5pill span{display:block;font-size:10px;text-transform:uppercase;letter-spacing:.05em;color:#A7F3D0;font-weight:700}.cd145 .k5pill.o span{color:#FECDD3}.cd145 .k5pill b{font-size:15px;color:#fff!important}.cd145 .k5pill.o b{color:#FECDD3!important}',
 '.cd145 .k5card2{background:var(--card,#fff);border:1px solid var(--line);border-radius:18px;padding:14px}',
 '.cd145 .k5bar{display:flex;gap:2px;height:14px;border-radius:99px;overflow:hidden;background:var(--bg);border:1px solid var(--line);padding:2px;margin-top:8px}.cd145 .k5bar i{display:block;height:100%}',
 '.cd145 .k5ley{display:grid;grid-template-columns:1fr 1fr;gap:4px 12px;margin-top:10px;padding-top:8px;border-top:1px solid var(--line);font-size:12px;font-variant-numeric:tabular-nums}.cd145 .k5ley div{display:flex;justify-content:space-between;align-items:center}',
 '.cd145 .k5sq{display:inline-block;width:10px;height:10px;border-radius:3px;margin-right:6px;vertical-align:-1px}',
 '.cd145 .k5tag{font-size:10px;font-weight:800;text-transform:uppercase;letter-spacing:.04em;border-radius:8px;padding:3px 8px}',
 '.cd145 .k5alert2{background:#FEF2F2;border:1px solid #FECACA;border-left:4px solid #DC2626;border-radius:16px;padding:12px 14px;color:#7F1D1D}.cd145 .k5alert2 b{color:#450A0A}.cd145 .k5alert2 .btn{width:auto;min-height:40px;margin-top:8px;background:#DC2626;color:#fff;border:0}',
 '.cd145 .k5sec h3{display:flex;justify-content:space-between;align-items:center;margin:0 4px 6px;font-size:11px;font-weight:800;text-transform:uppercase;letter-spacing:.06em}.cd145 .k5sec h3 small{font-weight:600;text-transform:none;letter-spacing:0;color:var(--muted)}',
 '.cd145 .k5grp{background:var(--card,#fff);border:1px solid var(--line);border-radius:18px;overflow:hidden}',
 '.cd145 details.k5ac{border-top:1px solid var(--line)}.cd145 details.k5ac:first-child{border-top:0}',
 '.cd145 details.k5ac>summary{list-style:none;display:flex!important;align-items:center;justify-content:space-between;gap:10px;padding:12px 14px;cursor:pointer;min-height:56px}',
 '.cd145 details.k5ac>summary::-webkit-details-marker{display:none}.cd145 details.k5ac>summary::after,.cd145 details.k5ac>summary::before{content:none!important;display:none!important}',
 '.cd145 .k5ic{width:36px;height:36px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:17px;flex:none}',
 '.cd145 .k5tt{flex:1;min-width:0}.cd145 .k5tt b{display:block;font-size:14px}.cd145 .k5tt small{display:block;font-size:12px;color:var(--muted);margin-top:1px}',
 '.cd145 .k5am{font-weight:800;font-size:14px;white-space:nowrap;font-variant-numeric:tabular-nums}',
 '.cd145 .k5chev{display:inline-block;margin-left:6px;color:var(--muted);transition:transform .25s;animation:chev145 2.2s ease-in-out infinite}',
 '.cd145 details.k5ac[open] .k5chev{transform:rotate(180deg);animation:none}',
 '@keyframes chev145{0%,70%,100%{transform:translateY(0)}78%{transform:translateY(3px)}86%{transform:translateY(0)}92%{transform:translateY(2px)}}',
 '@media (prefers-reduced-motion: reduce){.cd145 .k5chev{animation:none}}',
 '.cd145 .k5det{padding:10px 14px 12px;border-top:1px solid var(--line);background:var(--bg);font-size:13px}',
 '.cd145 .k5li>span{flex:1;min-width:0}.cd145 .k5li{display:flex;justify-content:space-between;align-items:flex-start;gap:8px;padding:5px 0;font-variant-numeric:tabular-nums}.cd145 .k5li>b{white-space:nowrap}.cd145 .k5li small{display:block;color:var(--muted);font-size:11px}',
 '.cd145 .k5sub{background:var(--card,#fff);border:1px solid var(--line);border-left:3px solid #BE123C;border-radius:12px;padding:8px 10px;margin:6px 0}',
 '.cd145 .k5pos{color:#15803D}.cd145 .k5neg2{color:#BE123C}.cd145 .k5note2{font-size:11px;color:var(--muted);padding-top:6px;border-top:1px solid var(--line);margin-top:4px}'
 ].join('');document.head.appendChild(st)}
function cdAc145(k,ic,icBg,icFg,tit,sub,amt,amtCls,det,bg){var ab=S.dOpen&&S.dOpen[k];
 return '<details class="k5ac" data-k="'+k+'"'+(ab?' open':'')+(bg?' style="background:'+bg+'"':'')+'><summary><span class="k5ic" style="background:'+icBg+';color:'+icFg+'">'+ic+'</span><span class="k5tt"><b>'+tit+'</b>'+(sub?'<small>'+sub+'</small>':'')+'</span><span class="k5am '+(amtCls||'')+'">'+amt+'<span class="k5chev">▾</span></span></summary><div class="k5det">'+(det||'<div class="k5li"><span>Sin detalle.</span></div>')+'</div></details>'}
function cdLi145(l,v,sub,cls){return '<div class="k5li"><span>'+l+(sub?'<small>'+sub+'</small>':'')+'</span><b class="'+(cls||'')+'">'+v+'</b></div>'}
function cdTag145(tp){var c=tp==='Mayoreo'?'background:#FEF3C7;color:#92400E':(tp==='Especial'?'background:#EDE9FE;color:#5B21B6':'background:#DCFCE7;color:#166534');return ' <span class="k5tag" style="'+c+'">'+tp+'</span>'}
function resultadoHTML121(T,tit){try{cdCss145()}catch(e){}
 var CH=T.ch?(Array.isArray(T.ch)?T.ch:Object.keys(T.ch).map(function(k){return T.ch[k]})):[],SU=T.su?(Array.isArray(T.su)?T.su:Object.keys(T.su).map(function(k){return T.su[k]})):[],J=function(a){return a.join('')};
 var cat=Object.keys(T.cat||{}).sort(function(a,b){return T.cat[b]-T.cat[a]}),LIN=(T.lin||[]).slice().sort(function(a,b){return (a.p===b.p?0:(a.p==='R'?-1:1))||(a.tp==='Normal'?-1:1)}),
  gastosT=r2(num(T.op)+num(T.desg)+num(T.suT)+num(T.comT)+num(T.merma)),marg=num(T.venta)>0?Math.round(num(T.neto)/num(T.venta)*1000)/10:0,
  cuant=(T.R?T.R.toLocaleString('es-MX')+' cajas':'')+(T.R&&T.M?' · ':'')+(T.M?T.M.toLocaleString('es-MX')+' kg':'')+(T.R||T.M?' vendidos':'sin ventas');
 /* 1 · tarjeta verde */
 var h='<div class="cd145"><div class="k5hero"><div class="k5hb"><span class="k5chip y">💰 Ganancia neta</span><span class="k5chip d">● Margen libre: '+marg.toLocaleString('es-MX')+'%</span></div>'
  +'<div class="small" style="opacity:.85;margin-top:6px;font-size:12px">'+tit+'</div><div class="k5big" style="'+(T.neto<0?'color:#FECACA':'')+'">'+cdM145(T.neto)+'</div>'
  +'<div class="k5pills"><div class="k5pill"><span>Ganancia fruta</span><b>'+cdM145(T.gan)+'</b></div><div class="k5pill o"><span>Gastos y com.</span><b>'+(gastosT?'-':'')+cdM145(gastosT)+'</b></div></div></div>';
 /* 2 · ¿a dónde se fue tu ganancia de fruta? */
 var seg=[['Libre (neto)',Math.max(0,num(T.neto)),'#166534'],['Sueldos',num(T.suT),'#7C3AED'],['Comisiones',num(T.comT),'#E11D48'],['Vehículo',num(T.desg),'#D97706'],['Gastos',num(T.op),'#475569'],['Merma',num(T.merma),'#0EA5E9']].filter(function(x){return x[1]>0.005||x[0]==='Libre (neto)'}),
  base=seg.reduce(function(a,x){return a+x[1]},0),pct=function(v){return base>0?Math.round(v/base*1000)/10:0},bueno=num(T.neto)>=0&&num(T.gan)>0;
 if(base>0)h+='<div class="k5card2"><div style="display:flex;justify-content:space-between;gap:8px;align-items:flex-start"><div><b style="font-size:13px">¿A dónde se fue tu ganancia de fruta?</b><div style="font-size:11px;color:var(--muted)">Reparto de los <b>'+cdM145(Math.max(num(T.gan),0))+'</b> de ganancia de la fruta</div></div>'
  +'<span class="k5tag" style="'+(bueno?'background:#D1FAE5;color:#065F46':'background:#FEE2E2;color:#991B1B')+'">'+(bueno?'Día rentable':'Día con pérdida')+'</span></div>'
  +'<div class="k5bar">'+J(seg.map(function(x){return x[1]>0?'<i style="width:'+pct(x[1])+'%;background:'+x[2]+'" title="'+x[0]+'"></i>':''}))+'</div>'
  +'<div class="k5ley">'+J(seg.map(function(x){return '<div><span><span class="k5sq" style="background:'+x[2]+'"></span>'+x[0]+'</span><b>'+pct(x[1]).toLocaleString('es-MX')+'%</b></div>'}))+'</div>'
  +(num(T.neto)<0?'<div style="font-size:11px;color:#991B1B;margin-top:6px">Los gastos pasaron la ganancia de la fruta por '+cdM145(-num(T.neto))+'.</div>':'')+'</div>';
 /* 3 · avisos que se tocan */
 if(T.sinCosto)h+='<div class="k5alert2"><b>⚠️ Falta el costo de la caja o el kilo</b><div style="font-size:12px;margin-top:2px">Sin ese costo la ganancia sale inflada: parece que la fruta no costó nada.</div><button class="btn" data-act="tab" data-t="cargas">Completar costos →</button></div>';
 if(T.gan<-0.5&&T.venta>0)h+='<div class="k5alert2"><b>⚠️ La fruta salió con pérdida</b><div style="font-size:12px;margin-top:2px">Vendiste '+cdM145(T.venta)+' pero esa fruta te costó '+cdM145(r2(T.venta-T.gan))+' según el costo de tu última carga'+(T.cR?' (la caja te sale en '+cdM145(T.cR)+')':'')+'. Si no es real, revisa los kilos, el precio por kilo, el flete y cuántas cajas salieron de esa carga.</div>'+carga142HTML(T.d)+'<button class="btn" data-act="tab" data-t="cargas">Revisar cargas →</button></div>';
 /* 4 · flujo de ventas e ingresos */
 var dV=J(LIN.map(function(x){return cdLi145((x.p==='R'?'Plátano Roatán':'Plátano Macho')+cdTag145(x.tp),cdM145(x.q*x.pr),x.q.toLocaleString('es-MX')+(x.p==='R'?' cajas × '+cdM145(x.pr)+' c/u':' kg × '+cdM145(x.pr)+' / kg'))}))
  +(T.loc&&T.loc.venta?cdLi145('Venta en bodega',cdM145(T.loc.venta),T.loc.n+' venta'+(T.loc.n===1?'':'s')):'')
  +'<div class="k5note2">'+cdLi145('(+) De contado',cdM145(T.contado))+cdLi145('(−) A crédito (fiado)',cdM145(T.cred),'',T.cred>0?'k5neg2':'')
  +J(CH.map(function(o){return J((o.creditos||[]).map(function(x){return cdLi145('&nbsp;&nbsp;↳ '+esc(x.n),cdM145(x.m),(x.R?x.R+' cj':'')+(x.M?' '+x.M+' kg':'')+(CH.length>1?' · '+esc(o.n):''),'k5neg2')}))}))
  +(CH.length>1?J(CH.filter(function(o){return o.venta}).map(function(o){return cdLi145('Vendió '+esc(o.n),cdM145(o.venta))})):'')
  +'Total vendido en el día (contado y crédito).</div>';
 var abo=[];CH.forEach(function(o){(o.abonos||[]).forEach(function(x){abo.push(cdLi145(esc(x.n),'+'+cdM145(x.m),CH.length>1?esc(o.n):'','k5pos'))})});if(num(T.abB))abo.push(cdLi145('Cobrados en bodega','+'+cdM145(T.abB),'','k5pos'));
 var dG='<div class="k5sub" style="border-left-color:#16A34A">'+J(LIN.map(function(x){return cdLi145((x.p==='R'?'Roatán':'Macho')+' · '+x.tp+' <span class="k5tag" style="background:#DCFCE7;color:#166534">'+x.q.toLocaleString('es-MX')+(x.p==='R'?' cj':' kg')+'</span>',(x.m>=0?'+':'-')+cdM145(Math.abs(x.m)),'Venta '+cdM145(x.pr)+' − costo '+(x.c?cdM145(x.c):'(falta)')+(x.p==='R'?' c/u':' /kg'),x.m>=0?'k5pos':'k5neg2')}))
  +(T.loc&&T.loc.venta?cdLi145('Venta en bodega',(T.loc.gan>=0?'+':'-')+cdM145(Math.abs(T.loc.gan)),'','k5pos'):'')+'</div>'
  +'<div class="k5note2"><b>Ventas menos costo de compra.</b> De aquí se descuentan gastos, vehículo, sueldos y comisiones para sacar tu neto.'+(T.cR||T.cM?' Costo usado (de tu última carga): '+[T.cR?'caja '+cdM145(T.cR):'',T.cM?'kilo de macho '+cdM145(T.cM):''].filter(Boolean).join(' · ')+'.':'')+'</div>';
 h+='<div class="k5sec"><h3><span style="color:#065F46">● Flujo de ventas e ingresos</span><small>Toca para desglosar</small></h3><div class="k5grp">'
  +cdAc145('cu145v','🛍️','#DCFCE7','#15803D','Ventas del día',cuant,cdM145(T.venta),'',dV)
  +(num(T.ab)||num(T.abB)?cdAc145('cu145a','💵','#E0F2FE','#0369A1','Abonos cobrados','Deudas de días anteriores','+'+cdM145(r2(num(T.ab)+num(T.abB))),'',J(abo)+'<div class="k5note2">Dinero que entró hoy de cuentas pasadas, <b>no es venta nueva</b>. Cuenta para el efectivo en caja y para la comisión por cobro.</div>'):'')
  +cdAc145('cu145g','📈','#BBF7D0','#14532D','Ganancia bruta de la fruta','Ventas menos costo de la fruta',cdM145(T.gan),T.gan<0?'k5neg2':'k5pos',dG,'#F0FDF4')+'</div></div>';
 /* 5 · gastos y comisiones */
 var dO=cat.length?J(cat.map(function(k){return cdLi145(esc(k),'-'+cdM145(T.cat[k]))})):'<div class="k5li"><span>Sin gastos registrados (casetas, comida, combustible…).</span></div>';
 var dD=J(CH.map(function(o){var V=o.veh?Object.keys(o.veh).map(function(k){return o.veh[k]}):[];if(V.length)return J(V.map(function(v){return cdLi145(esc(v.n)+(CH.length>1?' · '+esc(o.n):''),'-'+cdM145(v.desg),Math.round(v.km).toLocaleString('es-MX')+' km × '+cdM145(v.tasa)+'/km')}));
  return o.km||o.desg?cdLi145(esc(o.n),'-'+cdM145(o.desg),Math.round(num(o.km)).toLocaleString('es-MX')+' km'):''}));
 var dS=J(SU.filter(function(x){return num(x.s)}).map(function(x){return cdLi145(esc(x.n)+(x.vac?' (vacaciones)':''),'-'+cdM145(x.s),x.sTx?esc(x.sTx):(x.dias?x.dias+' día'+(x.dias===1?'':'s')+' trabajado'+(x.dias===1?'':'s'):''))}));
 var dC=J(CH.filter(function(o){return num(o.com)}).map(function(o){var F=o.comD&&typeof comFilas128==='function'?comFilas128(o.comD):[];
  return '<div class="k5sub"><div class="k5li"><span><b>'+esc(o.n)+'</b><small>Repartidor</small></span><b class="k5neg2">-'+cdM145(o.com)+'</b></div>'+J(F.map(function(x){return cdLi145(x[0],(x[2]<0?'-':'+')+cdM145(Math.abs(x[2])),x[1],x[2]<0?'k5neg2':'')}))+'</div>'}));
 if(!dC&&num(T.comT))dC='<div class="k5li"><span>'+comQuien128(T)+'</span></div>';
 var nCh=CH.filter(function(o){return num(o.com)}).length;
 h+='<div class="k5sec"><h3><span style="color:#9F1239">● Gastos y comisiones</span><small class="k5neg2" style="font-weight:800">'+(gastosT?'-':'')+cdM145(gastosT)+'</small></h3><div class="k5grp">'
  +cdAc145('cu121op','🧾','#F1F5F9','#334155','Gastos de operación','Casetas, comida, combustible…',(num(T.op)?'-':'')+cdM145(T.op),'',dO)
  +cdAc145('cu145d','🚚','#FEF3C7','#B45309','Desgaste de vehículos',(T.km?T.km.toLocaleString('es-MX')+' km recorridos':'sin kilómetros registrados'),(num(T.desg)?'-':'')+cdM145(T.desg),'',dD||'<div class="k5li"><span>Sin kilómetros registrados.</span></div>')
  +cdAc145('cu145s','👷','#EDE9FE','#6D28D9','Sueldos','Proporcional del día (semanal ÷ 6)',(num(T.suT)?'-':'')+cdM145(T.suT),'',dS||'<div class="k5li"><span>Nadie trabajó o no tiene sueldo.</span></div>')
  +(num(T.comT)?cdAc145('cu145c','🤝','#FFE4E6','#BE123C','Comisiones de choferes',nCh+' repartidor'+(nCh===1?'':'es')+' · lo que ganan por lo que cobran','-'+cdM145(T.comT),'k5neg2','<div style="font-size:12px;color:var(--muted);margin-bottom:4px">Lo que ganan por lo que cobran en ruta:</div>'+dC):'')
  +(num(T.merma)?cdAc145('cu145m','🗑️','#E0F2FE','#0369A1','Merma','Fruta que se echó a perder','-'+cdM145(T.merma),'k5neg2',''):'')+'</div></div>'
  +(T.mant?'<div style="font-size:11px;color:var(--muted);margin:0 4px">Servicios y reparaciones de vehículos: '+cdM145(T.mant)+'. Se pagan del fondo del desgaste; no se restan otra vez.</div>':'')+'</div>';
 return h}
function cajaHTML121(T,dia){var dif=r2(T.ent-T.deb);
 return '<div class="card" style="padding:14px"><b style="font-size:17px">💵 Cuadre del dinero</b>'
  +rwN121('Los choferes debían entregar',money(T.deb))+rwN121('Entregaron (según sus cortes)',money(T.ent))+(Math.abs(dif)>=0.5?rwN121(dif<0?'Faltó':'Sobró',money(Math.abs(dif)),'neg'):'')
  +rwN121('Recibiste de los cierres',money(T.rec),Math.abs(T.rec-T.ent)>=0.5&&T.ent?'neg':'')+rwN121('Abonos cobrados en bodega',money(T.abB||0))+(T.loc.venta?rwN121('Venta en bodega',money(T.loc.venta)):'')
  +(dia&&T.caja&&T.caja.length?T.caja.map(function(x){return rwN121('Conteo de caja '+esc(x.h||''),money(num(x.cnt)),Math.abs(num(x.dif))>=0.5?'neg':'','la app esperaba '+money(num(x.esp))+(Math.abs(num(x.dif))>=0.5?' · diferencia '+money(num(x.dif)):''))}).join(''):'')
  +(dia&&T.d===iso(TODAY)?rwN121('<b>Efectivo en caja ahora</b>','<b>'+money(cajaEsp())+'</b>'):'')+'</div>'}
function choferHTML121(o){var k='cu121c'+o.ch,abierta=S.dOpen[k]!==false;
 var lst=function(tit,L,f){return L.length?'<div class="lbl" style="margin-top:8px"><b>'+tit+' ('+L.length+')</b></div>'+L.map(f).join(''):''};
 return '<details class="card" data-k="'+k+'"'+(abierta?' open':'')+' style="padding:12px 14px"><summary style="display:flex;justify-content:space-between;gap:8px;align-items:baseline;min-height:44px"><b style="font-size:17px">🚚 '+esc(o.n)+'</b><span><span class="lbl">neto </span><b style="color:'+(o.neto<0?'var(--danger)':'var(--accent)')+'">'+money(o.neto)+'</b></span></summary>'
  +o.partes.map(function(p){var c=p.corte||{},ent=c.ent!=null?num(c.ent):null,est=p.vivo&&!p.sent?'en ruta':(p.sent||p.parcial?(p.rec!=null?'recibido':'falta recibir'):'sin cierre');
   return '<div style="border-top:1px solid var(--line);padding:8px 0"><div style="display:flex;justify-content:space-between"><b>Cierre '+p.n+(p.resc?' (recuperado)':'')+'</b><span class="lbl">'+esc(p.h||'')+' · '+est+'</span></div>'
    +rwN121('Vendió',money(p.venta))+rwN121('Cobrado',money(p.cob))+((p.sent||p.parcial)?rwN121('Debía entregar',money(p.deb))+(ent!=null?rwN121('Entregó',money(ent),Math.abs(ent-p.deb)>=0.5?'neg':''):'')+(p.rec!=null?rwN121('Recibiste',money(p.rec)):''):'')
    +(c.v?rwN121('Código del corte',esc(c.v)):'')+(p.km?rwN121('Kilómetros'+(p.veh?' · '+esc(p.veh):''),p.km.toLocaleString('es-MX')+' km','','desgaste '+f2(p.tasa)+' por km = '+money(p.desg)):'')
    +salida159HTML(o,p)+'<details data-k="'+k+'f'+p.n+'"'+(S.dOpen[k+'f'+p.n]?' open':'')+'><summary class="lbl" style="min-height:40px;display:flex;align-items:center">📷 Fotos del cierre '+p.n+'</summary>'+(S.dOpen[k+'f'+p.n]?fotosHTML121(p.fotos):'')+'</details></div>'}).join('')
  +'<div style="border-top:2px solid var(--line);margin-top:4px;padding-top:6px">'+rwN121('Ventas',money(o.venta),'',o.R+' cajas'+(o.M?' · '+o.M+' kg':''))+rwN121('&nbsp;&nbsp;A crédito',money(o.cred),o.cred>0?'neg':'')+(o.ab?rwN121('Abonos cobrados',money(o.ab)):'')
  +rwN121('Ganancia de su fruta',money(o.gan))+rwN121('− Gastos de su ruta',money(o.gasT))+rwN121('− Desgaste',money(o.desg),'',o.km?o.km.toLocaleString('es-MX')+' km':'sin kilómetros')+rwN121('− Sueldo del día',money(o.sueldo||0),'',o.sTx||'')+(o.com||o.comD&&o.comD.filas.length?comHTML128(o,k):'')
  +'<div class="row" style="min-height:48px"><b>Lo que dejó su ruta</b><b style="font-size:19px;color:'+(o.neto<0?'var(--danger)':'var(--accent)')+'">'+money(o.neto)+'</b></div></div>'
  +lst('Clientes a crédito',o.creditos,function(x){return rwN121('&nbsp;&nbsp;'+esc(x.n),money(x.m),'neg',(x.R?x.R+' cajas':'')+(x.M?' '+x.M+' kg':''))})
  +lst('Mayoreo y precios especiales',o.precios||[],function(y){var x=y.x;return rwN121('&nbsp;&nbsp;'+esc(y.n),x.dif?(x.dif<0?'−':'+')+money(Math.abs(x.dif)):'',x.dif<0?'neg':'',precioTxt135(x)+' · '+esc(x.txt))})
  +lst('Abonos que cobró',o.abonos,function(x){return rwN121('&nbsp;&nbsp;'+esc(x.n),money(x.m))})
  +lst('Taras',o.taras,function(x){return rwN121('&nbsp;&nbsp;'+esc(x.n),(x.neto>0?'prestó '+x.neto:'regresó '+(-x.neto)),x.neto>0?'neg':'','dejó '+x.dejo+' llenas · recogió '+x.recogio+' vacías'+(x.rotas?' ('+x.rotas+' rotas)':''))})
  +lst('Gastos de su ruta',o.gastos,function(x){return rwN121('&nbsp;&nbsp;'+esc(x.t),money(x.m))})+'</details>'}
function cuPer121(){return ['dia','semana','mes','anio'].indexOf(S.cu121p)>-1?S.cu121p:'dia'}
function cuDia121(){var d=S.cu121d;return /^\d{4}-\d\d-\d\d$/.test(d||'')&&d<=iso(TODAY)?d:iso(TODAY)}
function cuadre121(){var P=cuPer121(),d=cuDia121(),hoy=iso(TODAY),h='<h1>💰 Cuadre</h1>';
 h+='<div class="chips" role="group" aria-label="Periodo" style="margin:6px 0">'+[['dia','Día'],['semana','Semana'],['mes','Mes'],['anio','Año']].map(function(x){return '<button data-act="cu121p" data-v="'+x[0]+'" aria-pressed="'+(P===x[0])+'">'+x[1]+'</button>'}).join('')+'</div>';
 var d0,d1,tit;if(P==='dia'){d0=d1=d;tit=d===hoy?'Hoy · '+fC121(d):fC121(d)}else if(P==='semana'){d0=lunes121(d);d1=addD121(d0,6);tit='Semana del '+fC121(d0)+' al '+fC121(d1)}else if(P==='mes'){d0=d.slice(0,8)+'01';var x=dOf(d0);x.setMonth(x.getMonth()+1);x.setDate(0);d1=iso(x);tit=MS121[dOf(d0).getMonth()].replace(/^./,function(c){return c.toUpperCase()})+' '+d0.slice(0,4)}else{d0=d.slice(0,4)+'-01-01';d1=d.slice(0,4)+'-12-31';tit='Año '+d.slice(0,4)}
 var paso=P==='dia'?1:(P==='semana'?7:0),ant=P==='mes'?(function(){var x=dOf(d0);x.setMonth(x.getMonth()-1);return iso(x)})():(P==='anio'?(+d.slice(0,4)-1)+'-12-31':addD121(d,-paso)),sig=P==='mes'?(function(){var x=dOf(d0);x.setMonth(x.getMonth()+1);return iso(x)})():(P==='anio'?(+d.slice(0,4)+1)+'-01-01':addD121(d,paso));
 h+='<div style="display:flex;gap:8px;align-items:center;margin:6px 0"><button class="btn sec" style="width:auto;min-height:48px;padding:0 16px" data-act="cu121d" data-v="'+ant+'" aria-label="Anterior">‹</button><input type="date" data-cu121f="1" max="'+hoy+'" value="'+d+'" style="flex:1;min-height:48px" aria-label="Día"><button class="btn sec" style="width:auto;min-height:48px;padding:0 16px" data-act="cu121d" data-v="'+(sig>hoy?hoy:sig)+'" aria-label="Siguiente"'+(d1>=hoy?' disabled':'')+'>›</button>'+(d!==hoy?'<button class="btn sec" style="width:auto;min-height:48px;padding:0 12px" data-act="cu121d" data-v="'+hoy+'">Hoy</button>':'')+'</div>';
 try{h+=perdidosHTML120()}catch(e){}
 if(P==='dia'){var T=cuadreDia121(d);h+=(T.resumen?'<div class="card note" style="padding:10px 12px"><b>Resumen guardado</b><div class="lbl">De este día se guardan para siempre los números. El detalle (cada cierre, fotos, clientes y taras) se guarda '+(typeof RET122!=='undefined'?RET122:60)+' días.</div></div>':'')+resultadoHTML121(T,tit)+cajaHTML121(T,true);
  if(!T.ch.length)h+='<div class="card"><div class="lbl">No hubo rutas este día.</div></div>';h+=T.ch.map(choferHTML121).join('');
  if(T.loc.n)h+='<div class="card" style="padding:12px 14px"><b>🏪 Venta en bodega</b>'+rwN121('Ventas',money(T.loc.venta),'',T.loc.n+' venta'+(T.loc.n===1?'':'s'))+rwN121('Ganancia',money(T.loc.gan))+'</div>';
  var bod=T.su.filter(function(s){return !T.ch.some(function(o){return o.ch===s.ch})});if(bod.length)h+='<div class="card" style="padding:12px 14px"><b>👷 Sueldos del día de quien no salió a ruta</b>'+bod.map(function(s){return rwN121(esc(s.n)+(s.vac?' (vacaciones)':''),money(s.s+s.com))}).join('')+'</div>';
  return h}
 var A=cuadreRango121(d0,d1);h+=resultadoHTML121(A,tit)+cajaHTML121(A,false);
 if(P==='anio'){var MM={};A.dias.forEach(function(x){var m=x.d.slice(0,7),o=MM[m]=MM[m]||{venta:0,neto:0,cierres:0};o.venta+=x.venta;o.neto+=x.neto;o.cierres+=x.cierres});h+='<div class="card" style="padding:12px 14px"><b>Mes por mes</b>'+Object.keys(MM).sort().reverse().map(function(m){var o=MM[m];return '<button data-act="cu121mes" data-v="'+m+'-01" style="display:flex;justify-content:space-between;width:100%;min-height:48px;align-items:center;background:none;border:0;border-top:1px solid var(--line);color:inherit;text-align:left"><span>'+MS121[+m.slice(5)-1].replace(/^./,function(c){return c.toUpperCase()})+' '+m.slice(0,4)+'<br><span class="lbl">vendió '+money(o.venta)+(o.cierres?' · '+o.cierres+' cierres':'')+'</span></span><b style="color:'+(o.neto<0?'var(--danger)':'var(--accent)')+'">'+money(o.neto)+' ›</b></button>'}).join('')+'</div>'}
 else h+='<div class="card" style="padding:12px 14px"><b>Día por día</b>'+A.dias.slice().reverse().map(function(x){return '<button data-act="cu121dia" data-v="'+x.d+'" style="display:flex;justify-content:space-between;width:100%;min-height:48px;align-items:center;background:none;border:0;border-top:1px solid var(--line);color:inherit;text-align:left"><span>'+fC121(x.d)+'<br><span class="lbl">vendió '+money(x.venta)+(x.cierres?' · '+x.cierres+' cierre'+(x.cierres===1?'':'s'):'')+'</span></span><b style="color:'+(x.neto<0?'var(--danger)':'var(--accent)')+'">'+money(x.neto)+' ›</b></button>'}).join('')+'</div>';
 var C=Object.keys(A.ch).map(function(k){return A.ch[k]});if(C.length)h+='<div class="card" style="padding:12px 14px"><b>Por chofer</b>'+C.map(function(o){return '<div style="border-top:1px solid var(--line);padding:8px 0"><b>'+esc(o.n)+'</b>'+rwN121('Ventas',money(o.venta),'',o.dias+' día'+(o.dias===1?'':'s')+' · '+o.cierres+' cierre'+(o.cierres===1?'':'s'))+rwN121('A crédito',money(o.cred),o.cred>0?'neg':'')+rwN121('Kilómetros y desgaste',money(o.desg),'',Math.round(o.km).toLocaleString('es-MX')+' km')+rwN121('Sueldo y comisión',money(o.sueldo+o.com),'','sueldo '+money(o.sueldo)+' + comisión '+money(o.com)+(o.comCaj||o.comKg?' ('+[o.comCaj?(Math.round(o.comCaj*100)/100).toLocaleString('es-MX')+' cajas':'',o.comKg?(Math.round(o.comKg*100)/100).toLocaleString('es-MX')+' kg':''].filter(Boolean).join(' y ')+' pagados completos)':''))+rwN121('Lo que dejaron sus rutas',money(o.neto),o.neto<0?'neg':'')+(Math.abs(o.ent-o.deb)>=0.5?rwN121(o.ent<o.deb?'Faltó':'Sobró',money(Math.abs(o.ent-o.deb)),'neg'):'')+'</div>'}).join('')+'</div>';
 return h}
/* VIEWS se arma en la base DESPUÉS de las capas: se agrega al dibujar */
var _r121v=render;render=function(){try{if(typeof VIEWS!=='undefined'){VIEWS.cuadre121=cuadre121;VIEWS.cierres120=cuadre121}}catch(e){}return _r121v.apply(this,arguments)};
document.addEventListener('click',function(e){var m=e.target.closest&&e.target.closest('[data-act="cu121mes"]');if(m){e.preventDefault();e.stopImmediatePropagation();S.cu121p='mes';S.cu121d=m.dataset.v;render();window.scrollTo(0,0)}},true);
document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act="cu121p"],[data-act="cu121d"],[data-act="cu121dia"],[data-act="cu121ver"],[data-act="cie120ver"]');if(!b)return;e.preventDefault();e.stopImmediatePropagation();var a=b.dataset.act;
 if(a==='cu121p')S.cu121p=b.dataset.v;else if(a==='cu121d')S.cu121d=b.dataset.v;else if(a==='cu121dia'){S.cu121p='dia';S.cu121d=b.dataset.v}else{S.cu121p='dia';S.cu121d=iso(TODAY)}
 S.tab.admin='cuadre121';render();window.scrollTo(0,0)},true);
document.addEventListener('change',function(e){var t=e.target;if(!t||!t.dataset||!t.dataset.cu121f)return;if(/^\d{4}-\d\d-\d\d$/.test(t.value||'')){S.cu121d=t.value;render()}},true);
/* Inicio: arriba, "💰 Cuadre de hoy" (reemplaza "Cierres de hoy") */
function cuadreCard121(){if(S.role!=='admin')return '';var T=cuadreDia121(iso(TODAY));
 return '<div class="card" data-x="cuad121" role="button" tabindex="0" data-act="cu121ver" style="padding:14px;cursor:pointer;border:2px solid var(--accent)"><div style="display:flex;justify-content:space-between;align-items:baseline;gap:8px"><b style="font-size:18px">💰 Cuadre de hoy</b><span class="lbl">ver todo ›</span></div>'
  +'<div style="display:flex;justify-content:space-between;align-items:flex-end;gap:8px;margin-top:6px"><div><div class="lbl">Neto</div><div style="font-size:30px;font-weight:900;color:'+(T.neto<0?'var(--danger)':'var(--accent)')+'">'+money(T.neto)+'</div></div>'
  +'<div style="text-align:right;font-size:14px;line-height:1.6">Vendido <b>'+money(T.venta)+'</b><br>Ganancia <b>'+money(T.gan)+'</b><br>'+T.cierres+' cierre'+(T.cierres===1?'':'s')+(T.cred?' · <span class="neg">crédito '+money(T.cred)+'</span>':'')+'</div></div></div>'}
cierresHoy120HTML=function(){if(S.role!=='admin')return '';var h='';try{h=perdidosHTML120()}catch(e){}var c='';try{c=typeof cuenta122HTML==='function'?cuenta122HTML():''}catch(e){}return h+cuadreCard121()+c};
/* en "Más": Cuadre en lugar de "Historial de cierres" */
if(typeof mas92==='function'){var _mas121=mas92;mas92=function(){var h=_mas121.apply(this,arguments);try{h=h.replace(/<button data-act="cie120ver" data-x="mas92-cierres">[\s\S]*?<\/button>/,'<button data-act="cu121ver" data-x="mas92-cuadre"><span class="ic92">💰</span>Cuadre<small>cierres, caja, ganancia y neto por día, semana o mes</small></button>')}catch(er){}return h}}
/* en Finanzas: el botón lleva al cuadre */
var _ingP121=ingPanel120;ingPanel120=function(){return _ingP121.apply(this,arguments).replace('📋 Ver los cierres de hoy','💰 Ver el cuadre de hoy')};

/* ---------- 🧮 calculadora de desgaste por km (para no esperar a que se ajuste solo; las llantas duran mucho) ---------- */
var DC121=[['llantas','Llantas (el juego completo)','llInt'],['aceite','Cambio de aceite y filtros','acInt'],['frenos','Frenos (balatas y discos)','frInt'],['afin','Afinación',''],['amort','Amortiguadores y suspensión',''],['bat','Batería',''],['clutch','Clutch',''],['otro','Otro','']];
function dcAbre121(id){var vh=vehById(+id);if(!vh)return;var o=vh.desgCalc120&&vh.desgCalc120.it?JSON.parse(JSON.stringify(vh.desgCalc120)):{it:{},dep:{}};
 DC121.forEach(function(x){var it=o.it[x[0]]=o.it[x[0]]||{c:'',km:''};if(it.km===''&&x[2]&&num(vh[x[2]])>0)it.km=String(num(vh[x[2]]));if(it.c===''){var sv=(vh.serv||[]).concat(vh.taller||[]).filter(function(s){return s&&new RegExp(x[0]==='aceite'?'aceite':(x[0]==='llantas'?'llanta':(x[0]==='frenos'?'freno':x[1].split(' ')[0])),'i').test(String(s.tipo||'')+' '+String(s.que||''))}).sort(function(a,b){return String(b.f).localeCompare(String(a.f))})[0];if(sv&&num(sv.costo)>0)it.c=String(num(sv.costo))}});
 o.dep=o.dep||{};if(o.dep.valor==null||o.dep.valor==='')o.dep.valor=num(vh.valor)>0?String(num(vh.valor)):'';S.dc121={id:vh.id,o:o};dcPon121()}
function dcTasa121(o){var t=0;Object.keys(o.it||{}).forEach(function(k){var x=o.it[k];if(num(x.c)>0&&num(x.km)>0)t+=num(x.c)/num(x.km)});var d=o.dep||{};if(num(d.valor)>0&&num(d.km)>0)t+=Math.max(0,num(d.valor)-num(d.venta))/num(d.km);return Math.round(t*100)/100}
function dcPon121(){var x=S.dc121;if(!x){ovPon70('dc121ov','');return}var vh=vehById(x.id),o=x.o,t=dcTasa121(o),real=null;try{var f=fondoVeh(vh,12);if(f.gs>0&&f.km>0)real=f.tasa}catch(e){}
 var inp=function(k,f,v,ph){return '<input type="number" inputmode="decimal" min="0" data-dc121="'+k+':'+f+'" value="'+esc(v==null?'':v)+'" placeholder="'+ph+'" style="width:100%;min-height:44px">'};
 var body='<div class="lbl">Pon cuánto cuesta cada cosa y cada cuántos kilómetros se cambia. La app saca cuánto se gasta por cada kilómetro. Lo que no sepas, déjalo vacío.</div>'
  +DC121.map(function(d){var it=o.it[d[0]]||{};var pk=num(it.c)>0&&num(it.km)>0?num(it.c)/num(it.km):0;return '<div style="border-top:1px solid var(--line);padding:8px 0"><b>'+d[1]+'</b>'+(pk?' <span class="lbl">= '+f2(pk)+' por km</span>':'')+'<div style="display:flex;gap:8px;margin-top:4px"><label style="flex:1"><span class="lbl">Cuesta $</span>'+inp(d[0],'c',it.c,'')+'</label><label style="flex:1"><span class="lbl">Cada cuántos km</span>'+inp(d[0],'km',it.km,'')+'</label></div></div>'}).join('')
  +'<div style="border-top:1px solid var(--line);padding:8px 0"><b>Lo que pierde de valor el vehículo</b><div class="lbl">Lo que vale hoy, en cuánto lo venderías al final y cuántos km más le quieres sacar.</div><div style="display:flex;gap:6px;margin-top:4px;flex-wrap:wrap"><label style="flex:1;min-width:30%"><span class="lbl">Vale $</span>'+inp('dep','valor',o.dep.valor,'')+'</label><label style="flex:1;min-width:30%"><span class="lbl">Lo venderías en $</span>'+inp('dep','venta',o.dep.venta,'')+'</label><label style="flex:1;min-width:30%"><span class="lbl">Km que le quedan</span>'+inp('dep','km',o.dep.km,'')+'</label></div></div>'
  +'<div class="card good" style="padding:12px;margin-top:8px"><div class="lbl">Desgaste calculado</div><div style="font-size:28px;font-weight:900">'+f2(t)+' por km</div><div class="lbl">Hoy usa '+f2(tasa68(vh))+' por km'+(real!=null?' · con tus gastos reales de 12 meses salen '+f2(real)+' por km':'')+'.</div></div>'
  +'<button class="btn big" data-act="dc121ok"'+(t>0?'':' disabled')+'>Usar '+f2(t)+' por km en '+esc(vh.n)+'</button>'+(real!=null?'<button class="btn sec big" data-act="dc121real">Usar lo real: '+f2(real)+' por km</button>':'')+'<button class="btn sec big" data-act="dc121x">Cerrar</button>';
 ovPon70('dc121ov',ovW70('dc121ov','🧮 Desgaste de '+vh.n,body,'dc121x'))}
document.addEventListener('change',function(e){var t=e.target;if(!t||!t.dataset||!t.dataset.dc121||!S.dc121)return;var p=t.dataset.dc121.split(':'),o=S.dc121.o;if(p[0]==='dep')o.dep[p[1]]=t.value;else{o.it[p[0]]=o.it[p[0]]||{};o.it[p[0]][p[1]]=t.value}dcPon121()},true);
document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act="dc121"],[data-act="dc121ok"],[data-act="dc121real"],[data-act="dc121x"]');if(!b)return;e.preventDefault();e.stopImmediatePropagation();var a=b.dataset.act;
 if(a==='dc121'){dcAbre121(b.dataset.id);return}var x=S.dc121;if(a==='dc121x'||!x){S.dc121=null;dcPon121();return}var vh=vehById(x.id);if(!vh)return;var ant=tasa68(vh),nv=a==='dc121ok'?dcTasa121(x.o):(function(){try{return fondoVeh(vh,12).tasa}catch(er){return 0}})();if(!(nv>0))return;
 vh.desg=nv;if(a==='dc121ok'){x.o.f=iso(TODAY);x.o.tasa=nv;vh.desgCalc120=x.o}else vh.desgCalc120=null;S.hist.push({t:fmtF(iso(TODAY))+' '+hhmm(),q:quien(),x:'El desgaste de '+vh.n+' cambió de '+f2(ant)+' a '+f2(nv)+' por km ('+(a==='dc121ok'?'calculadora':'gastos reales')+')'});toast('Desgaste de '+vh.n+': '+f2(nv)+' por km');S.dc121=null;dcPon121();render()},true);
/* el botón de la calculadora: en "Cuánto deja y cuánto cuesta" de cada vehículo y en el Cuadre (desgaste) */
if(typeof vehResumenHTML==='function'){var _vr121=vehResumenHTML;vehResumenHTML=function(vh){var h=_vr121.apply(this,arguments);try{var bt='<div class="row" style="min-height:48px"><span>Desgaste por km<br><span class="lbl">'+(vh.desgCalc120?'calculado el '+fmtF(vh.desgCalc120.f):'se ajusta solo con lo que gastas; o calcúlalo')+'</span></span><b>'+f2(tasa68(vh))+'</b></div><button class="btn sm sec" style="margin:4px 0 8px" data-act="dc121" data-id="'+vh.id+'">🧮 Calcular el desgaste</button>';var i=h.indexOf('</summary>');if(i>-1)h=h.slice(0,i+10)+bt+h.slice(i+10)}catch(e){}return h}}
/* las fotos se bajan solo al abrir "📷 Fotos del cierre" */
document.addEventListener('toggle',function(e){var d=e.target;if(!d||!d.dataset||!/^cu121c\d+f\d+$/.test(d.dataset.k||''))return;var k=d.dataset.k;if(!!S.dOpen[k]===d.open)return;S.dOpen[k]=d.open;render()},true);
/* "← Volver" como las otras secciones */
try{if(typeof SEC92!=='undefined'&&SEC92.indexOf('cuadre121')<0)SEC92.push('cuadre121')}catch(e){}
/* 121 · una sola vez: todos los vehículos empiezan en $0.70 por km (traían el 0.60 de la demo), salvo los calculados con la calculadora */
function desgIni121(){try{if(S.role!=='admin'||window.PN_MODO!=='vacio')return;(S.veh||[]).forEach(function(v){if(!v||v.desg121||v.desgCalc120)return;v.desg121=1;/* solo el 0.60 de la demo (o vacío) pasa a 0.70; si tú lo pusiste o la app lo ajustó con gastos reales, se respeta */if(v.desg==null||v.desg===''||Math.abs(num(v.desg)-0.6)<0.001)v.desg=''})}catch(e){}}
var _r121d=render;render=function(){desgIni121();return _r121d.apply(this,arguments)};

/* ---------- 142 · Ricardo: "vendí en total $490, ¿por qué dice que la ganancia del día es de −$911.38?" ----------
   Se reprodujo con 3 cierres del mismo chofer el mismo día: el Cuadre cuenta todo UNA vez (km, desgaste, sueldo, comisión). La única forma
   de llegar a −$911 con $490 vendidos es que la fruta "cueste" más de lo que se vende: una carga mal capturada (menos cajas de las que
   salieron, o el precio de la caja escrito en el precio del kilo). Desde 150 ya pregunta al registrarla; para las que ya estaban,
   el aviso "La fruta salió con pérdida" dice QUÉ carga se está usando y qué número se ve raro. Solo lee; no cambia ninguna cuenta. */
function carga142(d){var c=(S.cargas||[]).filter(function(x){return (x.fecha||'')<=d&&num(x.kgR)>0&&num(x.pR)>0&&num(x.cajas)>0}).sort(function(a,b){return String(a.fecha).localeCompare(String(b.fecha))||a.id-b.id}).pop();return c||null}
function carga142HTML(d){try{var c=carga142(d||iso(TODAY));if(!c)return '';var kc=r2(num(c.kgR)/num(c.cajas)),p=num(c.pR),v=num(S.precio&&S.precio.R),L=[];
 if(kc>30)L.push('salen <b>'+kc+' kg por caja</b> ('+num(c.kgR).toLocaleString('es-MX')+' kg ÷ '+num(c.cajas)+' cajas; lo normal es como 20): ¿escribiste bien cuántas cajas?');
 if(v>0&&p*15>v)L.push('el precio por kilo es <b>'+money(p)+'</b>: ¿es el precio de la CAJA?');
 return '<div style="font-size:12px;margin-top:6px;padding:6px 8px;border-radius:8px;background:rgba(0,0,0,.05)">Se está usando la carga de <b>'+esc(c.prov||'')+'</b> del <b>'+esc(fCorta91(c.fecha))+'</b>'+(L.length?': '+L.join(' · '):'.')+'</div>'}catch(e){return ''}}

/* ---------- 159 · Ricardo: "si ya una ruta cubrió todos los gastos de operación del día, las demás (aunque sean 5 cajas) deberían salir
   positivas, a excepción de la gasolina: que se vea si sale más caro ir a entregarlas" ----------
   Cada salida (cierre) del chofer carga lo SUYO: su fruta (venta − costo), su gasolina (los gastos de combustible del día repartidos por
   los km de cada salida) y su desgaste (km × tasa), y su comisión. Lo FIJO del día (sueldo del día y los gastos de la ruta que no son
   gasolina) se cubre en orden: primero la salida 1; lo que no alcance pasa a la 2, y así. Si con todas no alcanza, lo que falta se le
   queda a la primera. Solo se reparte: la suma de las salidas es EXACTO el neto del chofer en el día (o.neto). */
function salidas159(o){try{var P=o.partes||[];if(!P.length)return;var G=o.gastos||[],comb=r2(sum(G.filter(function(g){return g.t==='Combustible'}),function(g){return num(g.m)})),
  fijo=r2(num(o.sueldo)+num(o.gasT)-comb),km=sum(P,function(p){return num(p.km)}),comR=sum(P,function(p){return num(p.com)});
 P.forEach(function(p,i){p.gan=r2(p.gan||0);p.comb=km>0?r2(comb*num(p.km)/km):(i===0?comb:0);p.com=comR>0?r2(num(o.com)*num(p.com)/comR):(i===0?r2(num(o.com)):0)});
 /* los centavos de redondeo, a la última (así la suma es exacta) */
 var u=P[P.length-1];u.comb=r2(u.comb+comb-sum(P,function(p){return p.comb}));u.com=r2(u.com+num(o.com)-sum(P,function(p){return p.com}));
 P.forEach(function(p){p.var=r2(p.gan-p.comb-num(p.desg)-p.com)});
 var rest=fijo;P.forEach(function(p){var f=rest>0?Math.min(rest,Math.max(0,p.var)):0;p.fijo=r2(f);rest=r2(rest-f)});if(rest>0.005)P[0].fijo=r2(P[0].fijo+rest);
 P.forEach(function(p){p.neto=r2(p.var-p.fijo)});
 var d=r2(o.neto-sum(P,function(p){return p.neto}));if(Math.abs(d)>0.004){P[0].fijo=r2(P[0].fijo-d);P[0].neto=r2(P[0].neto+d)}
 o.fijo159=fijo;o.comb159=comb}catch(e){}}
function salida159HTML(o,p){if(!o||(o.partes||[]).length<2||p.neto==null)return '';
 return '<div style="margin-top:6px;padding:6px 8px;border-radius:10px;background:color-mix(in srgb,'+(p.neto<0?'#DC2626':'#16A34A')+' 8%,var(--surface))">'
  +'<div class="lbl" style="margin-bottom:2px"><b>Lo que dejó esta salida</b></div>'
  +rwN121('Ganancia de la fruta',money(p.gan))+rwN121('− Gasolina y desgaste',money(r2(p.comb+num(p.desg))),'',(p.km?p.km.toLocaleString('es-MX')+' km':'sin km'))
  +(p.com?rwN121('− Comisión',money(p.com)):'')+(p.fijo>0.004?rwN121('− Gastos fijos del día',money(p.fijo),'','sueldo y gastos de la ruta (se cubren en orden)'):'')
  +'<div class="row" style="min-height:40px"><b>'+(p.neto<0?'Salió con pérdida':'Dejó')+'</b><b style="color:'+(p.neto<0?'var(--danger)':'var(--accent)')+'">'+money(p.neto)+'</b></div>'
  +(p.neto<0&&p.fijo<0.005&&p.var<0?'<div class="lbl neg" style="font-size:12.5px">Salió más caro ir (gasolina, desgaste y comisión) de lo que dejó la fruta.</div>':'')+'</div>'}
