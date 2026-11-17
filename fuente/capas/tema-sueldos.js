/* ===================== TEMA · Sueldos: semana, faltas, descanso, ingreso, baja, vacaciones y aguinaldo (nació como tema, 17 nov · punto 118) =====================
   Antes la "semana" no tenía fechas (iba del último pago al siguiente) y los días y la comisión de días pasados no se sumaban.
   Ahora (decisiones de Ricardo):
   - La semana cierra el SÁBADO, que es el día de pago: va de domingo a sábado. Cada quien descansa un día acordado
     (c.desc118, de inicio domingo); si trabaja en domingo es un día normal. Cada semana se pregunta si cambia su descanso
     (c.descW118[sábado de esa semana]).
   - Faltas: el admin las marca ("Hoy no vino"); si un chofer no salió a ruta en un día que le toca, a mediodía le pregunta
     al admin "¿Faltó hoy?". Una falta descuenta un día (sueldo semanal ÷ 6). Vacaciones: día pagado + prima del 25%.
   - "Empezó a trabajar el" (c.ing) y "Dejó de trabajar el" (c.baja118). Si entra a media semana solo cuentan sus días.
   - Todo se suma por fechas: días, comisión (del historial de rutas), viajes de carga. c.pagoHasta118 = hasta qué día se le pagó.
   - Vacaciones y aguinaldo según la Ley Federal del Trabajo, solo sobre el sueldo base; finiquito al darlo de baja.
   Si se cambia algo de esto, se cambia AQUÍ (szCalc y szDesg se rehacen aquí; las de la base y l18 ya no se usan).
   ============================================================================================ */
var DIAS118=['domingo','lunes','martes','miércoles','jueves','viernes','sábado'];
function addD118(s,n){var d=dOf(s);d.setDate(d.getDate()+n);return iso(d)}
function semFin118(s){var d=dOf(s);return addD118(s,(6-d.getDay()+7)%7)}
function semIni118(s){return addD118(semFin118(s),-6)}
function fCorta118(s){var d=dOf(s);return DIAS118[d.getDay()].slice(0,3)+' '+d.getDate()+' '+['ene','feb','mar','abr','may','jun','jul','ago','sep','oct','nov','dic'][d.getMonth()]}
function fLarga118(s){var d=dOf(s);return d.getDate()+' de '+['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'][d.getMonth()]+' de '+d.getFullYear()}
function nd118(x){return (Math.round(num(x)*10)/10).toLocaleString('es-MX')}
function fechaOk118(s){return /^\d{4}-\d\d-\d\d$/.test(String(s||''))}
function chById118(id){return S.choferes.filter(function(x){return x.id===+id})[0]}
function activo118(c,s){return (!fechaOk118(c.ing)||c.ing<=s)&&(!fechaOk118(c.baja118)||s<=c.baja118)}
function descDe118(c,s){var o=c.descW118&&c.descW118[semFin118(s)];return o!=null&&o!==''?+o:(c.desc118!=null&&c.desc118!==''?+c.desc118:0)}
function marca118(c,s){return (c.faltas118||[]).indexOf(s)>-1?'falta':((c.vac118||[]).indexOf(s)>-1?'vac':'')}
/* lo que se le va a pagar: desde el día después de lo último pagado hasta el sábado (o hasta hoy si la semana no ha terminado) */
function periodo118(c){var hoy=iso(TODAY),fs=semFin118(hoy),ini=fechaOk118(c.pagoHasta118)?addD118(c.pagoHasta118,1):semIni118(hoy),fin;
 if(fechaOk118(c.ing)&&c.ing>ini)ini=c.ing;
 if(TODAY.getDay()===6)fin=hoy;else{var ant=addD118(fs,-7);fin=ant>=ini?ant:fs}
 if(fechaOk118(c.baja118)&&c.baja118<fin)fin=c.baja118;
 var hasta=fin>hoy?hoy:fin;return {ini:ini,fin:fin,hasta:hasta}}
function dias118(c,ini,fin){var r={prog:0,fal:[],vac:[],tr:0};if(!ini||!fin||ini>fin)return r;
 for(var s=ini,i=0;s<=fin&&i<400;s=addD118(s,1),i++){if(!activo118(c,s)||dOf(s).getDay()===descDe118(c,s))continue;r.prog++;var m=marca118(c,s);if(m==='falta')r.fal.push(s);else if(m==='vac')r.vac.push(s)}
 r.tr=r.prog-r.fal.length;return r}
/* un día de sueldo (para faltas) y el salario diario de la ley (para vacaciones y aguinaldo: solo el sueldo base) */
function diaSz118(c){var z=c.sz||{};return z.tipo==='semana'?num(z.monto)/6:(z.tipo==='base'?num(z.base)/6:(z.tipo==='dia'?num(z.porDia):0))}
function sdLey118(c){var z=c.sz||{};return z.tipo==='semana'?num(z.monto)/7:(z.tipo==='base'?num(z.base)/7:(z.tipo==='dia'?num(z.porDia):0))}
function logsPer118(c,ini,hasta){var L=[],hoy=iso(TODAY);if(!ini||!hasta||ini>hasta)return L;
 (S.rutasHist||[]).forEach(function(x){if(+x.ch===+c.id&&x.f>=ini&&x.f<=hasta&&x.f!==hoy)L=L.concat(x.log||[])});
 if(hoy>=ini&&hoy<=hasta){var lg;try{lg=nbRGet(c.id,'log')}catch(e){lg=null}if(!lg&&String(S.chofHoy)===String(c.id))lg=S.log;L=L.concat(lg||[])}return L}
szCalc=function(c){var z=c.sz||{},P=periodo118(c),vac=P.ini>P.hasta,D=dias118(c,P.ini,P.hasta),r=diaSz118(c),nada=z.tipo==='ninguno';
 var L=nada?[]:logsPer118(c,P.ini,P.hasta),cv=sum(L,function(l){return num(l.R)}),kv=sum(L,function(l){return num(l.M)}),cob=r2(sum(L,function(l){return num(l.pago)+num(l.abono)}));
 var com=z.tipo==='base'?r2(sum(L,function(l){return comDeLog(c,l)})):0,base=nada?0:r2(r*D.prog),desc=nada?0:r2(r*D.fal.length),prima=nada?0:r2(D.vac.length*sdLey118(c)*0.25);
 var vjN=nada||vac?0:(S.vjHist||[]).filter(function(x){return x.quien===c.n&&x.f>=P.ini&&x.f<=P.hasta}).length,vjM=r2(vjN*num(z.comViaje));
 var bo=sum(S.bonos.filter(function(x){return x.ch===c.id&&x.pend}),function(x){return num(x.m)}),ad=sum(S.adelantos.filter(function(x){return x.ch===c.id&&x.pend}),function(x){return num(x.m)}),fa=sum(S.faltantes.filter(function(x){return x.ch===c.id&&x.desc&&x.pend}),function(x){return num(x.m)});
 var br=r2(base-desc+com+vjM+prima+bo);
 return {ini:P.ini,fin:P.fin,hasta:P.hasta,vacio:vac,prog:D.prog,fal:D.fal,vac:D.vac,dias:D.tr,rate:r,base:base,desc:desc,prima:prima,cv:cv,kv:kv,cob:cob,com:com,comHoy:comHoyDe(c),vjN:vjN,vjM:vjM,bo:bo,ad:ad,fa:fa,br:br,pagar:Math.max(0,r2(br-ad-fa)),resto:Math.max(0,r2(ad+fa-br))}};
function perTxt118(k){if(k.vacio)return 'Ya se le pagó esta semana';var t=k.ini===k.fin?fCorta118(k.ini):'Del '+fCorta118(k.ini)+' al '+fCorta118(k.fin);return t+(k.hasta<k.fin?' · lleva hasta hoy':'')}
szDesg=function(c){var k=szCalc(c),z=c.sz||{};if(z.tipo==='ninguno')return '';
 var ent=fechaOk118(c.ing)&&c.ing>=k.ini&&c.ing<=k.fin,h='<div class="card" style="padding:10px 12px;margin-top:8px"><b>Desglose de la semana</b><div class="lbl" data-x="per118">'+perTxt118(k)+'</div>';
 if(k.vacio)return h+'<div class="lbl" style="margin-top:6px">La siguiente semana empieza el '+fCorta118(addD118(c.pagoHasta118,1))+'.</div></div>';
 h+=rw('Días de trabajo',k.dias+' de '+k.prog+(k.fal.length?' · faltó '+k.fal.map(fCorta118).join(', '):''))+(ent?'<div class="lbl">Entró el '+fCorta118(c.ing)+': solo cuentan sus días desde ese día.</div>':'');
 h+=rw(z.tipo==='dia'?'Días ('+k.prog+' × '+money(k.rate)+')':(k.prog===6&&!ent?'Sueldo de la semana':'Sueldo ('+k.prog+' días × '+money(k.rate)+')'),money(k.base));
 if(k.fal.length)h+=rw('Faltas ('+k.fal.length+' × '+money(k.rate)+')','− '+money(k.desc),'neg');
 if(k.vac.length)h+=rw('Vacaciones: '+k.vac.length+' día'+(k.vac.length===1?'':'s')+' (pagados) · prima del 25%','+ '+money(k.prima));
 if(z.tipo==='base'){var t=comModo(c)==='pct'?(num(z.comP)+'% de lo cobrado ('+money(k.cob)+')'):(money(num(z.comC))+' por caja y '+money(num(z.comK))+' por kilo cobrados');h+=rw('Comisión<br><span class="lbl">'+t+' · '+k.cv+' cajas · '+k.kv+' kg</span>',money(k.com))}
 h+=(k.vjN?'<button class="btn sm sec" style="margin:4px 0" data-act="szextraviaje" data-id="'+c.id+'">+ Extra por viaje de carga</button>'+rw('Viajes de carga ('+k.vjN+' × '+money(num(z.comViaje))+')',money(k.vjM)):'')
  +S.bonos.filter(function(x){return x.ch===c.id&&x.pend}).map(function(x){return rw('Extra'+(x.mot?': '+esc(x.mot):''),'+ '+money(x.m))}).join('')+(k.ad?rw('Adelantos','− '+money(k.ad),'neg'):'')+(k.fa?rw('Faltantes de efectivo','− '+money(k.fa),'neg'):'')
  +'<div class="row" style="min-height:60px;border-top:2px solid var(--fg)"><b style="font-size:18px">Total a pagarle</b><span class="mid" style="font-size:30px">'+money(k.pagar)+'</span></div>'+(k.resto?'<div class="lbl neg">Los descuentos pasan el sueldo: '+money(k.resto)+' se descuentan la próxima semana.</div>':'')+'</div>';
 return h};
/* al pagar: queda hasta qué día se le pagó y el pago dice qué semana fue */
window.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act="pagarsz"]');if(!b)return;var c=chById118(b.dataset.id);if(!c)return;var k=szCalc(c);
 if(k.vacio){e.preventDefault();e.stopImmediatePropagation();toast('A '+c.n+' ya se le pagó esta semana');return}var n0=S.pagosSueldo.length;
 setTimeout(function(){if(S.pagosSueldo.length<=n0)return;var p=S.pagosSueldo[S.pagosSueldo.length-1];p.ini=k.ini;p.fin=k.hasta;p.n=(k.ini===k.hasta?fCorta118(k.ini):'Semana del '+fCorta118(k.ini)+' al '+fCorta118(k.hasta))+(k.fal.length?' · '+k.fal.length+' falta'+(k.fal.length===1?'':'s'):'');c.pagoHasta118=k.hasta;render()},0)},true);

/* ---------- antigüedad, vacaciones y aguinaldo (Ley Federal del Trabajo) ---------- */
function anios118(c,al){if(!fechaOk118(c.ing))return 0;var a=dOf(c.ing),b=dOf(al||iso(TODAY)),n=b.getFullYear()-a.getFullYear();if(b.getMonth()<a.getMonth()||(b.getMonth()===a.getMonth()&&b.getDate()<a.getDate()))n--;return Math.max(0,n)}
function aniv118(c,n){var a=dOf(c.ing);a.setFullYear(a.getFullYear()+n);return iso(a)}
function antTxt118(c){if(!fechaOk118(c.ing))return '';var a=anios118(c),d=dOf(aniv118(c,a)),hoy=dOf(iso(TODAY)),m=(hoy.getFullYear()-d.getFullYear())*12+hoy.getMonth()-d.getMonth();if(hoy.getDate()<d.getDate())m--;m=Math.max(0,m);
 return a||m?'Lleva '+(a?a+' año'+(a===1?'':'s'):'')+(a&&m?' y ':'')+(m?m+' mes'+(m===1?'':'es'):''):'Lleva menos de un mes'}
/* días de vacaciones al cumplir n años (reforma 2023): 12, 14, 16, 18, 20, y de 6 en adelante 22 + 2 cada 5 años */
function vacLey118(n){return n<1?0:(n<=5?10+2*n:22+2*Math.floor((n-6)/5))}
function vacTomadas118(c,desde,hasta){return (c.vac118||[]).filter(function(s){return s>=desde&&(!hasta||s<=hasta)}).length}
function vacInfo118(c){if(!fechaOk118(c.ing))return null;var a=anios118(c);if(a<1)return {a:0,tiene:0,tom:0,queda:0,prox:aniv118(c,1),proxD:12};var desde=aniv118(c,a),t=vacLey118(a),tom=vacTomadas118(c,desde);return {a:a,tiene:t,tom:tom,queda:Math.max(0,t-tom),prox:aniv118(c,a+1),proxD:vacLey118(a+1)}}
/* aguinaldo: 15 días de salario base, proporcional a lo trabajado en el año; se paga antes del 20 de diciembre */
function agui118(c,anio){anio=anio||TODAY.getFullYear();var i=anio+'-01-01',f=anio+'-12-31';if(fechaOk118(c.ing)&&c.ing>i)i=c.ing;if(fechaOk118(c.baja118)&&c.baja118<f)f=c.baja118;if(i>f)return {d:0,m:0,prop:0};
 var d=Math.round((dOf(f)-dOf(i))/864e5)+1,tot=Math.round((dOf(anio+'-12-31')-dOf(anio+'-01-01'))/864e5)+1,prop=Math.min(1,d/tot);return {d:d,prop:prop,m:r2(15*sdLey118(c)*prop),dias:r2(15*prop)}}
function aguiPag118(c,anio){return !!(c.agui118&&c.agui118[anio||TODAY.getFullYear()])}
/* finiquito: la semana pendiente + aguinaldo proporcional + vacaciones pendientes y proporcionales con su prima */
function finiq118(c){if(!fechaOk118(c.baja118))return null;var k=szCalc(c),an=TODAY.getFullYear(),ag=aguiPag118(c,an)?{m:0,dias:0}:agui118(c,an),a=anios118(c,c.baja118),desde=a?aniv118(c,a):c.ing;
 var pend=a?Math.max(0,vacLey118(a)-vacTomadas118(c,desde,c.baja118)):0,fr=Math.min(1,(Math.round((dOf(c.baja118)-dOf(desde))/864e5)+1)/365),prop=r2(vacLey118(a+1)*fr),vd=r2(pend+prop),vm=r2(vd*sdLey118(c)*1.25);
 return {sem:k.vacio?0:k.pagar,ag:ag.m,agD:ag.dias,vd:vd,vm:vm,tot:r2((k.vacio?0:k.pagar)+ag.m+vm)}}

/* ---------- la tarjeta "Datos de trabajo" (en Sueldos y en la ficha del empleado) ---------- */
function lab118HTML(c){var id=c.id,hoy=iso(TODAY),des=c.desc118!=null&&c.desc118!==''?+c.desc118:0,v=vacInfo118(c),an=TODAY.getFullYear(),ag=agui118(c,an),k=szCalc(c),sp=c.sz&&c.sz.tipo!=='ninguno';
 var marcas=[].concat((c.faltas118||[]).map(function(s){return [s,'falta']}),(c.vac118||[]).map(function(s){return [s,'vac']})).filter(function(x){return x[0]>=addD118(hoy,-35)}).sort(function(a,b){return a[0]<b[0]?1:-1});
 var h='<div class="card" data-x="lab118" style="padding:10px 12px;margin-top:8px"><b>Datos de trabajo</b>'
  +'<div class="field"><label for="ing118_'+id+'">Empezó a trabajar el</label><input id="ing118_'+id+'" type="date" max="'+hoy+'" data-lab118="'+id+':ing" value="'+esc(fechaOk118(c.ing)?c.ing:'')+'"></div>'+(fechaOk118(c.ing)?'<div class="lbl">'+antTxt118(c)+'</div>':'')
  +'<div class="lbl" style="margin-top:8px"><b>Descansa el</b> (si trabaja en domingo es un día normal)</div><div class="chips" role="group" aria-label="Día de descanso de '+esc(c.n)+'" style="margin:6px 0;flex-wrap:wrap">'+DIAS118.map(function(x,i){return '<button data-act="desc118" data-id="'+id+'" data-v="'+i+'" aria-pressed="'+(des===i)+'" style="min-height:44px">'+x.slice(0,3)+'</button>'}).join('')+'</div>'
  +(descDe118(c,hoy)!==des?'<div class="lbl">Esta semana descansa el <b>'+DIAS118[descDe118(c,hoy)]+'</b> (cambio solo de esta semana).</div>':'')
  +'<div class="lbl" style="margin-top:8px"><b>Faltas y vacaciones</b></div>'
  +(marca118(c,hoy)?'<div class="lbl">Hoy: <b>'+(marca118(c,hoy)==='falta'?'no vino':'de vacaciones')+'</b></div>':'<button class="btn sec" style="min-height:52px;margin:6px 0" data-act="falta118" data-id="'+id+'" data-f="'+hoy+'" data-t="falta">🚫 Hoy no vino</button>')
  +'<div style="display:flex;gap:6px;align-items:flex-end;flex-wrap:wrap"><div class="field" style="margin:0"><label for="fd118_'+id+'">Otro día</label><input id="fd118_'+id+'" type="date" max="'+addD118(hoy,60)+'"></div><button class="btn sm sec" data-act="falta118" data-id="'+id+'" data-t="falta">Faltó</button><button class="btn sm sec" data-act="falta118" data-id="'+id+'" data-t="vac">Vacaciones</button></div>'
  +(marcas.length?marcas.map(function(x){return '<div class="row"><span>'+fCorta118(x[0])+' · '+(x[1]==='falta'?'<span class="neg">faltó</span>':'vacaciones')+'</span><button class="link" data-act="faltaq118" data-id="'+id+'" data-f="'+x[0]+'" data-t="'+x[1]+'">Quitar</button></div>'}).join(''):'<div class="lbl">Sin faltas en las últimas semanas.</div>');
 if(sp&&v)h+='<div class="lbl" style="margin-top:8px"><b>Vacaciones</b></div><div class="lbl">'+(v.a<1?'Sus primeras vacaciones: <b>12 días</b> al cumplir 1 año ('+fLarga118(v.prox)+').':'Le tocan <b>'+v.tiene+' días</b> por '+v.a+' año'+(v.a===1?'':'s')+' · tomó '+v.tom+' · le quedan <b>'+v.queda+'</b>. Al cumplir '+(v.a+1)+' años ('+fCorta118(v.prox)+') le tocan '+v.proxD+'.')+' Se pagan con prima del 25%.</div>';
 if(sp)h+='<div class="lbl" style="margin-top:8px"><b>Aguinaldo '+an+'</b></div>'+(aguiPag118(c,an)?'<div class="lbl">Pagado el '+fCorta118(c.agui118[an])+'.</div>':'<div class="lbl">'+money(ag.m)+' · '+(ag.prop<1?nd118(ag.dias)+' días (proporcional: '+ag.d+' días trabajados en el año)':'15 días')+' de sueldo base ('+money(sdLey118(c))+' por día). Se paga antes del 20 de diciembre.</div>'+(ag.m>0?'<button class="btn sm sec" style="margin-top:6px" data-act="agui118" data-id="'+id+'">Pagar aguinaldo ('+money(ag.m)+')</button>':''));
 h+='<div class="field" style="margin-top:8px"><label for="baja118_'+id+'">Dejó de trabajar el</label><input id="baja118_'+id+'" type="date" data-lab118="'+id+':baja118" value="'+esc(fechaOk118(c.baja118)?c.baja118:'')+'"></div>';
 var F=sp&&finiq118(c);if(F){h+='<div class="card alert" style="padding:10px 12px;margin-top:6px"><b>Finiquito</b>'+rw('Lo que falta de su semana',money(F.sem))+rw('Aguinaldo proporcional ('+nd118(F.agD)+' días)',money(F.ag))+rw('Vacaciones pendientes y proporcionales ('+nd118(F.vd)+' días + 25%)',money(F.vm))+'<div class="row"><b>Total</b><b style="font-size:20px">'+money(F.tot)+'</b></div>'
   +(c.finiq118?'<div class="lbl">Pagado el '+fCorta118(c.finiq118)+'.</div>':'<button class="btn" style="min-height:52px;margin-top:6px" data-act="finiq118" data-id="'+id+'">Pagar finiquito ('+money(F.tot)+')</button>')+'</div>'}
 return h+'</div>'}
var _suel118=sueldos;sueldos=function(){var h=_suel118.apply(this,arguments);try{h=h.replace(/<div id="szr_(\d+)">/g,function(m,id){var c=chById118(id);return c?lab118HTML(c)+m:m});
 S.choferes.forEach(function(c){var k=szCalc(c);if(c.sz&&c.sz.tipo!=='ninguno')h=h.replace('data-act="pagarsz" data-id="'+c.id+'">Pagar semana</button>','data-act="pagarsz" data-id="'+c.id+'">'+(k.vacio?'Ya se le pagó esta semana':'Pagar · '+esc(perTxt118(k)))+'</button>')})}catch(e){console.error('t118',e)}return h};
function marcaPon118(c,s,t){c.faltas118=(c.faltas118||[]).filter(function(x){return x!==s});c.vac118=(c.vac118||[]).filter(function(x){return x!==s});if(t==='falta')c.faltas118.push(s);else if(t==='vac')c.vac118.push(s)}
document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act="desc118"],[data-act="falta118"],[data-act="faltaq118"],[data-act="agui118"],[data-act="finiq118"],[data-act="descw118"],[data-act="descok118"],[data-act="asis118"]');if(!b)return;e.preventDefault();e.stopImmediatePropagation();
 var a=b.dataset.act,c=chById118(b.dataset.id),q=quien(),hp=function(x){S.hist.push({t:fmtF(iso(TODAY))+' '+hhmm(),q:q,x:x})};
 if(a==='descok118'){S.cfg.descOk118=b.dataset.k;hp('Confirmó los descansos de la semana al '+fCorta118(b.dataset.k));toast('Descansos guardados');render();return}
 if(!c)return;
 if(a==='desc118'){c.desc118=+b.dataset.v;hp(c.n+' descansa el '+DIAS118[+b.dataset.v]);toast(c.n+' descansa el '+DIAS118[+b.dataset.v]);render();return}
 if(a==='descw118'){c.descW118=c.descW118||{};c.descW118[b.dataset.k]=+b.dataset.v;render();return}
 if(a==='falta118'){var s=b.dataset.f||(document.getElementById('fd118_'+c.id)||{}).value;if(!fechaOk118(s)){toast('Escoge el día');return}if(fechaOk118(c.ing)&&s<c.ing){toast('Ese día todavía no trabajaba');return}
  if(dOf(s).getDay()===descDe118(c,s)){toast('Ese día es su descanso');return}marcaPon118(c,s,b.dataset.t);hp((b.dataset.t==='falta'?'Falta de ':'Vacaciones de ')+c.n+' el '+fCorta118(s));toast(b.dataset.t==='falta'?c.n+' faltó el '+fCorta118(s):c.n+': vacaciones el '+fCorta118(s));render();return}
 if(a==='faltaq118'){marcaPon118(c,b.dataset.f,'');hp('Quitó '+(b.dataset.t==='falta'?'la falta':'las vacaciones')+' de '+c.n+' del '+fCorta118(b.dataset.f));render();return}
 if(a==='asis118'){var hoy=iso(TODAY);if(b.dataset.v==='falta')marcaPon118(c,hoy,'falta');c.asis118=hoy;hp(b.dataset.v==='falta'?c.n+' faltó hoy':c.n+' sí vino hoy');toast(b.dataset.v==='falta'?'Falta de '+c.n+' guardada':'Listo');render();return}
 if(a==='agui118'){var an=TODAY.getFullYear(),g=agui118(c,an);if(!(g.m>0)||aguiPag118(c,an))return;if(!confirm('¿Pagarle a '+c.n+' su aguinaldo '+an+' de '+money(g.m)+'?'))return;
  c.agui118=c.agui118||{};c.agui118[an]=iso(TODAY);S.gastos.push({t:'Sueldos',m:g.m,n:'Aguinaldo '+an+' de '+c.n});S.pagosSueldo.push({ch:c.id,f:iso(TODAY),m:g.m,n:'Aguinaldo '+an});hp('Pagó el aguinaldo '+an+' a '+c.n+': '+money(g.m));toast('Aguinaldo pagado a '+c.n);render();return}
 if(a==='finiq118'){var F=finiq118(c);if(!F||c.finiq118)return;if(!confirm('¿Pagarle a '+c.n+' su finiquito de '+money(F.tot)+'?'))return;var k=szCalc(c),an2=TODAY.getFullYear();
  if(F.tot>0)S.gastos.push({t:'Sueldos',m:F.tot,n:'Finiquito de '+c.n});S.pagosSueldo.push({ch:c.id,f:iso(TODAY),m:F.tot,n:'Finiquito (semana '+money(F.sem)+', aguinaldo '+money(F.ag)+', vacaciones '+money(F.vm)+')'});
  S.adelantos.forEach(function(x){if(x.ch===c.id)x.pend=false});S.bonos.forEach(function(x){if(x.ch===c.id)x.pend=false});S.faltantes.forEach(function(x){if(x.ch===c.id&&x.desc)x.pend=false});
  if(!k.vacio)c.pagoHasta118=k.hasta;if(F.ag>0){c.agui118=c.agui118||{};c.agui118[an2]=iso(TODAY)}c.finiq118=iso(TODAY);hp('Pagó el finiquito de '+c.n+': '+money(F.tot));toast('Finiquito pagado a '+c.n);render();return}},true);
document.addEventListener('change',function(e){var t=e.target;if(!t||!t.dataset||!t.dataset.lab118)return;var p=t.dataset.lab118.split(':'),c=chById118(p[0]);if(!c)return;var v=t.value,hoy=iso(TODAY);
 if(p[1]==='ing'){if(!fechaOk118(v)||v>hoy){toast('Escoge un día de hoy para atrás');render();return}c.ing=v;S.hist.push({t:fmtF(hoy)+' '+hhmm(),q:quien(),x:c.n+' empezó a trabajar el '+fCorta118(v)})}
 else{if(v&&(fechaOk118(c.ing)&&v<c.ing)){toast('No puede ser antes de que empezara');render();return}if(v&&!confirm('¿'+c.n+' dejó de trabajar el '+fLarga118(v)+'? Se calcula su finiquito.')){render();return}c.baja118=v||'';S.hist.push({t:fmtF(hoy)+' '+hhmm(),q:quien(),x:v?c.n+' dejó de trabajar el '+fCorta118(v):'Se quitó la fecha de baja de '+c.n})}
 render()},true);

/* ---------- avisos en Inicio del admin: ¿faltó hoy?, descansos de la semana, aguinaldo ---------- */
function emp118(){return S.choferes.filter(function(c){return c&&!esAdm(c)&&!c.oculto&&activo118(c,iso(TODAY))&&!c.finiq118})}
function faltaPreg118(){var hoy=iso(TODAY);if(new Date().getHours()<12&&!window.__falta118)return [];return emp118().filter(function(c){if(!esCh(c)||c.asis118===hoy||marca118(c,hoy)||TODAY.getDay()===descDe118(c,hoy))return false;
 var sal;try{sal=salio81(c.id)}catch(e){sal=false}if(sal)return false;var dw=TODAY.getDay();if(S.cli.some(function(x){return !x.oculto&&+x.chofer===+c.id&&x.dias&&x.dias.indexOf(dw)>-1}))return true;var r;try{r=chofRutaHoy(c.id)}catch(e){r=[]}return !!(r&&r.length)})}
function descKey118(){var d=TODAY.getDay(),hoy=iso(TODAY);if(d===5||d===6)return addD118(semFin118(hoy),7);if(d===0)return semFin118(hoy);return null}
function avisos118HTML(){var h='',hoy=iso(TODAY);
 faltaPreg118().forEach(function(c){h+='<div class="card alert" data-x="falta118" style="padding:12px 14px;border:2px solid var(--danger)"><div style="font-size:18px;font-weight:900">¿'+esc(c.n)+' faltó hoy?</div><div class="lbl">No ha salido a su ruta y hoy le toca trabajar.</div><div style="display:flex;gap:8px;margin-top:8px;flex-wrap:wrap"><button class="btn" data-act="asis118" data-id="'+c.id+'" data-v="falta" style="min-height:52px">Sí, faltó</button><button class="btn sec" data-act="asis118" data-id="'+c.id+'" data-v="vino" style="min-height:52px">No, sí vino</button></div></div>'});
 var dk=descKey118(),L=emp118().filter(function(c){return c.sz&&c.sz.tipo!=='ninguno'});
 if(dk&&S.cfg.descOk118!==dk&&L.length)h+='<div class="card" data-x="desc118" style="padding:12px 14px;border:2px solid var(--accent)"><div style="font-size:18px;font-weight:900">📅 Descansos de la semana</div><div class="lbl">Del '+fCorta118(addD118(dk,-6))+' al '+fCorta118(dk)+'. ¿Alguien cambia o pidió cambiar su día?</div>'
  +L.map(function(c){var v=descDe118(c,dk);return '<div style="margin-top:8px"><b>'+esc(c.n)+'</b><div class="chips" role="group" aria-label="Descanso de '+esc(c.n)+'" style="margin:4px 0;flex-wrap:wrap">'+DIAS118.map(function(x,i){return '<button data-act="descw118" data-id="'+c.id+'" data-k="'+dk+'" data-v="'+i+'" aria-pressed="'+(v===i)+'" style="min-height:44px">'+x.slice(0,3)+'</button>'}).join('')+'</div></div>'}).join('')
  +'<button class="btn" style="min-height:52px;margin-top:8px" data-act="descok118" data-k="'+dk+'">Así quedan</button></div>';
 var an=TODAY.getFullYear(),P=TODAY.getMonth()===11&&TODAY.getDate()<=20?L.filter(function(c){return !aguiPag118(c,an)&&agui118(c,an).m>0}):[];
 if(P.length)h+='<div class="card alert" data-x="agui118" style="padding:12px 14px"><div style="font-size:18px;font-weight:900">🎁 Aguinaldo '+an+'</div><div class="lbl">Se paga antes del 20 de diciembre. Faltan '+P.length+': '+P.map(function(c){return esc(c.n)+' ('+money(agui118(c,an).m)+')'}).join(', ')+'.</div><button class="btn sec" style="min-height:52px;margin-top:8px" data-act="aguiver118">Ver en Sueldos</button></div>';
 return h}
document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act="aguiver118"]');if(!b)return;e.stopImmediatePropagation();S.tab.admin='personal';S.per92='sue';render();window.scrollTo(0,0)},true);
var _r118=render;render=function(){var r=_r118.apply(this,arguments);try{if(S.role==='admin'&&S.tab.admin==='inicio'){var m=document.querySelector('main');if(m&&!m.querySelector('[data-x="av118"]')){var x=avisos118HTML();if(x){var d=document.createElement('div');d.dataset.x='av118';d.innerHTML=x;/* debajo de la burbuja del viaje y del precio (114), antes de "Hoy" */var hy=m.querySelector('[data-x="hoy92"],[data-key="hoy92"],[data-k="hoy92"]');if(hy&&hy.parentNode===m)m.insertBefore(d,hy);else{var h1=m.querySelector('h1');if(h1&&h1.nextSibling)h1.parentNode.insertBefore(d,h1.nextSibling);else m.prepend(d)}}}}}catch(e){console.error('av118',e)}return r};
