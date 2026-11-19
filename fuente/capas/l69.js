/* ===================== v7.5 · el dinero (11 nov) · "que no se pase nada"
   54 al registrar una carga: al final del desglose, "¿Sumar el desgaste del vehículo?" y "¿Se le asignó un sueldo por este viaje?";
      el desglose trae TODOS los gastos renglón por renglón; "Costo del viaje más exacto" a la vista
   55 costo de repartir (real, de las rutas cerradas) por caja y por kilo; precio sugerido = (puesta en bodega + repartirla) × meta;
      meta de ganancia de roatán y de macho (o la misma); imprevistos: hasta $500 al viaje/ruta, más al mantenimiento;
      comida autorizada antes (viaje: sí/no y máximo; ruta: presupuesto diario); en el reparto no hay casetas;
      el desgaste por km se ajusta solo con lo que de verdad se gasta en cada vehículo
   58 contra errores de dedo: "¿Seguro? Es mucho más de lo normal"
   60 avisos de "no cuadra" en palabras claras + ningún número vacío rompe las cuentas ===================== */

/* ---------- ayudas ---------- */
function tope68(){var t=num(S.cfg&&S.cfg.topeImp);return t>0?t:500}
function esImp68(n){return /imprevist|reparaci|ponchadura|talacha|gr[uú]a|refacci|mec[aá]nic|llanta|falla/i.test(String(n||''))}
function tasa68(vh){return vh&&vh.desg!=null&&vh.desg!==''&&isFinite(+vh.desg)?num(vh.desg):0.7}/* 120 · $0.70 por km al empezar (decisión de Ricardo); se ajusta con el uso o con la calculadora de desgaste */
function suelDia68(ch){if(!ch||ch.id===2||!ch.sz)return {s:0,c:0};var z=ch.sz,s=z.tipo==='semana'?num(z.monto)/7:(z.tipo==='dia'?num(z.porDia):(z.tipo==='base'?num(z.base)/7:0));return {s:Math.round(s),c:num(z.comViaje)}}
function mgM68(c){return (S.cfg.mgIgual===false&&c&&c.mgM!=null&&c.mgM!=='')?num(c.mgM):num(c&&c.mg||30)}
function mgR68(c){return num(c&&c.mg||30)}
function kmProvs68(P){var km=0;(P||[]).forEach(function(p){var d=null;try{d=provD(p)}catch(e){}km=Math.max(km,num(d&&d.km)||150)});return Math.round(km*2+40*Math.max(0,(P||[]).length-1))}
/* registro de problemas (lo usa el 56; aquí se anotan solos los errores de la app) */
function apErr(tipo,txt,donde){try{S.probs=S.probs||[];var k=tipo+'|'+txt;if(S.probs.some(function(p){return p.auto&&p.k===k&&p.f===iso(TODAY)&&!p.res}))return;/* 122 · si ya se había marcado resuelto y vuelve a pasar, se anota otra vez */S.probs.push({id:Date.now()+Math.random().toString(36).slice(2,6),k:k,auto:true,f:iso(TODAY),h:hhmm(),q:(function(){try{return quien()}catch(e){return ''}})(),donde:donde||'',g:'App',txt:txt,v:(typeof PN_VER!=='undefined'?PN_VER:'')});if(S.probs.length>300)S.probs=S.probs.slice(-300)}catch(e){}}

/* ---------- 54 · registrar carga: desgaste, sueldo e imprevisto ---------- */
/* cmNuevo: pasó a tema-cargas.js */
function cmX68(){var m=S.cm;if(!m.x68)m.x68={dOn:'',km:'',tasa:'',sOn:'',sm:'',impOn:'',impT:'Ponchadura',impM:''};var x=m.x68;
 if(x.km===''){x.km=String(kmProvs68(cmProvs().map(function(p){return p[0]})))}
 if(x.tasa===''){x.tasa=String(tasa68(vehById(+m.veh)))}
 if(x.sm===''){var ch=m.quien==='yo'?null:cl0(+m.quien),z=suelDia68(ch);x.sm=String(z.s+z.c||'')}
 return x}
function ch68(act,k,opts,cur,extra){return '<div class="chips" style="margin:6px 0" role="group">'+opts.map(function(o){return '<button data-act="'+act+'" data-k="'+k+'" data-v="'+o[0]+'"'+(extra||'')+' aria-pressed="'+(cur===o[0])+'" style="min-height:56px;font-size:17px">'+(cur===o[0]?'✓ ':'')+o[1]+'</button>'}).join('')+'</div>'}
/* 103 · que se note que sí se sumó: renglón verde con lo que se sumó (y cuánto le toca a cada caja si es solo roatán) */
function suma103(on,m,cajas,txtNo){if(on==='si'){var u=num(cajas)>0&&num(m)>0?' · +'+f2(num(m)/num(cajas))+' por caja':'';return '<div class="ok103" style="margin-top:8px;padding:10px 12px;border-radius:12px;background:color-mix(in srgb,var(--accent) 14%,var(--surface));font-weight:800;font-size:16px">✓ Se sumaron '+money(num(m))+' al costo del viaje'+u+'</div>'}
 if(on==='no')return '<div class="lbl" style="margin-top:8px;font-size:15px">'+txtNo+'</div>';return ''}
function caja103(c){return c&&num(c.cajas)>0&&!(num(c.kgM)>0)?num(c.cajas):0}
function inp68(id,bind,val,lbl){return '<div class="field"><label for="'+id+'">'+lbl+'</label><input id="'+id+'" type="number" inputmode="decimal" step="any" min="0" data-bind="'+bind+'" value="'+esc(val)+'"></div>'}
function cmCostCards68(){var m=S.cm,x=cmX68(),vh=vehById(+m.veh)||{n:'el vehículo'},quienN=m.quien==='yo'?'Tú ('+quien()+')':chofN(+m.quien),dm=Math.round(num(x.km)*num(x.tasa));
 return '<div class="card c68" style="padding:12px 14px;margin-top:12px;border:2px solid var(--accent)"><div style="font-size:19px;font-weight:900">¿Sumar el desgaste del vehículo?</div>'
  +'<div class="lbl" style="margin:4px 0 6px">Lo que se gasta el vehículo (llantas, aceite, reparaciones) por cada kilómetro. Entra al costo de la caja.</div>'
  +'<div class="row"><span>'+esc(vh.n)+'</span><b>'+num(x.km).toLocaleString('es-MX')+' km × '+f2(num(x.tasa))+' = '+money(dm)+'</b></div>'
  +ch68('cm68','dOn',[['si','Sí, súmalo'],['no','No']],x.dOn)+suma103(x.dOn,dm,m.R&&!m.M?m.cajas:0,'No se suma el desgaste.')+(x.dOn==='si'?inp68('cm68km','cm.x68.km',x.km,'Kilómetros del viaje (ida y vuelta)')+'<div class="lbl">'+(num(vh.desg)?'':'Todavía no hay gastos de este vehículo: se usa $0.60 por km. ')+'Se ajusta solo con el uso.</div>':'')+'</div>'
  +'<div class="card c68" style="padding:12px 14px;margin-top:10px;border:2px solid var(--accent)"><div style="font-size:19px;font-weight:900">¿Se le asignó un sueldo por este viaje?</div>'
  +'<div class="lbl" style="margin:4px 0 6px">Fue: <b>'+esc(quienN)+'</b>. Si se le paga algo por ir, entra al costo de la caja.</div>'
  +ch68('cm68','sOn',[['si','Sí'],['no','No']],x.sOn)+(x.sOn==='si'?inp68('cm68sm','cm.x68.sm',x.sm,'¿Cuánto por este viaje? $'):'')+suma103(x.sOn,x.sm,m.R&&!m.M?m.cajas:0,'No se suma sueldo.')+'</div>'}
function cmImpCard68(){var x=cmX68(),t=tope68();
 return '<div style="border-top:1px solid var(--line);padding:8px 0;margin-top:4px"><div style="font-weight:800">¿Hubo algún imprevisto en el camino?</div><div class="lbl">Ponchadura, talacha, grúa, refacción, mecánico…</div>'
  +ch68('cm68','impOn',[['no','No'],['si','Sí']],x.impOn)
  +(x.impOn==='si'?ch68('cm68','impT',[['Ponchadura','Ponchadura o talacha'],['Grúa','Grúa'],['Refacción','Refacción'],['Mecánico','Mecánico'],['Otro','Otro']],x.impT)+inp68('cm68im','cm.x68.impM',x.impM,'¿Cuánto costó? $')
   +(num(x.impM)>t?'<div class="card note" style="padding:8px 12px"><b>Es más de '+money(t)+'</b><div style="font-size:14px">Se carga al <b>mantenimiento del vehículo</b>, no al costo de esta fruta (si no, saldría carísima).</div></div>':(num(x.impM)?'<div class="lbl">Hasta '+money(t)+': entra al costo de este viaje.</div>':'')):'')+'</div>'}
/* cmHTML: pasó a tema-cargas.js */
/* cmObj: pasó a tema-cargas.js */
/* cmValida: pasó a tema-cargas.js */
document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act="cm68"]');if(!b||!S.cm)return;e.stopImmediatePropagation();var x=cmX68();x[b.dataset.k]=b.dataset.v;var o=$('cmov'),st=o?o.scrollTop:0;render();o=$('cmov');if(o)o.scrollTop=st},true);
/* el viaje queda en el historial con su desgaste y su sueldo (para comparar proveedores) */
window.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act="cmguardar"],[data-act="cmpvok"]');if(!b||!S.cm)return;var n0=S.cargas.length;
 setTimeout(function(){try{if(S.cargas.length<=n0)return;var c=S.cargas[S.cargas.length-1],v=(S.vjHist||[]).filter(function(x){return x.cid===c.id})[0];if(v){v.km=num(c.dsgKm);v.desg=num(c.dsgM);v.sueldo=num(c.suelM);v.otros=sum((c.extras||[]).filter(function(x){return x.imp68&&!x.mant}),function(x){return x.m})}}catch(er){}},0)},true);

/* ---------- el costo del viaje (para el costo de la caja) ---------- */
function impBig68(c){return (c.extras||[]).filter(function(x){return (x.imp68||esImp68(x.c))&&(x.mant||num(x.m)>tope68())})}
var _trC69=trCost;trCost=function(c){var r=_trC69.apply(this,arguments);try{if(!(c.cv&&c.cv.ok))r+=num(c.dsgM)+num(c.suelM);r-=sum(impBig68(c),function(x){return num(x.m)})}catch(e){}return r};
/* "Costo del viaje más exacto": respeta lo que se contestó de desgaste y sueldo */
var _cvD69=cvDef;cvDef=function(c){var D=_cvD69.apply(this,arguments);try{if(c.dsgOn===false)D.desgKm=0;if(c.suelOn===false){D.sueldo=0;D.com=0}else if(c.suelOn===true){D.sueldo=num(c.suelM);D.com=0}}catch(e){}return D};
var _cvP69=cvPasoHTML;cvPasoHTML=function(c,P,wiz){var h=_cvP69.apply(this,arguments);
 /* 111 · en "La fruta": ¿sí se cargó la fruta planeada sin precio? (tema-cargas.js) */
 if(P==='fruta'){try{var fh=fant111HTML(c);if(fh){var j=h.indexOf('<div class="card"');h=j>-1?h.slice(0,j)+fh+h.slice(j):fh+h}}catch(e){}return h}
 if(P!=='costo')return h;try{var D=cvDef(c),vh=D.vh||{n:'el vehículo'},km=Math.round(num(cvCalc(c).km)),tasa=tasa68(vh),z=suelDia68(D.ch),sd=c.suelM!=null&&c.suelM!==''?c.suelM:String(z.s+z.c||''),nom=D.ch&&D.ch.id!==2?D.ch.n:'Tú';
  var dOn=c.dsgOn===true?'si':(c.dsgOn===false?'no':''),sOn=c.suelOn===true?'si':(c.suelOn===false?'no':''),at=' data-id="'+c.id+'"';
  h+='<div class="card c68" style="padding:12px 14px;margin-top:12px;border:2px solid var(--accent)"><div style="font-size:19px;font-weight:900">¿Sumar el desgaste del vehículo?</div><div class="row"><span>'+esc(vh.n)+'</span><b>'+km.toLocaleString('es-MX')+' km × '+f2(tasa)+' = '+money(Math.round(km*tasa))+'</b></div>'+ch68('cv68','dOn',[['si','Sí, súmalo'],['no','No']],dOn,at)+suma103(dOn,Math.round(km*tasa),caja103(c),'No se suma el desgaste.')+'</div>'
   +'<div class="card c68" style="padding:12px 14px;margin-top:10px;border:2px solid var(--accent)"><div style="font-size:19px;font-weight:900">¿Se le asignó un sueldo por este viaje?</div><div class="lbl">Fue: <b>'+esc(nom)+'</b></div>'+ch68('cv68','sOn',[['si','Sí'],['no','No']],sOn,at)
   +(sOn==='si'?'<div class="field"><label for="cv68s">¿Cuánto por este viaje? $</label><input id="cv68s" type="number" inputmode="decimal" step="any" min="0" data-cf="'+c.id+':suelM" value="'+esc(sd)+'"></div>':'')+suma103(sOn,sd,caja103(c),'No se suma sueldo.')+'</div>'}catch(e){console.error('cv69',e)}return h};
document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act="cv68"]');if(!b)return;e.stopImmediatePropagation();var c=S.cargas.filter(function(x){return x.id===+b.dataset.id})[0];if(!c)return;var on=b.dataset.v==='si';
 if(b.dataset.k==='dOn')c.dsgOn=on;else{c.suelOn=on;if(on&&(c.suelM==null||c.suelM==='')){var z=suelDia68(cvDef(c).ch);c.suelM=z.s+z.c}}S.cvf&&(S.cvf._t=Date.now());render()},true);
window.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act="cvpaso"][data-d="1"],[data-act="cvconfirm"]');if(!b)return;var c=S.cargas.filter(function(x){return x.id===+(b.dataset.id||S.cvOpen)})[0];if(!c)return;var f=S.cvf;if(!f||CVP[f.paso||0][0]!=='costo')return;
 var er=c.dsgOn==null?'Contesta si sumas el desgaste del vehículo':(c.suelOn==null?'Contesta si se le asignó un sueldo por este viaje':(c.suelOn&&num(c.suelM)<=0?'Escribe cuánto se le paga por el viaje':''));if(er){e.preventDefault();e.stopImmediatePropagation();toast(er)}},true);

/* ---------- 54 · el desglose con TODOS los gastos ---------- */
function gastosViaje68(c,k){var t=c.t||{},cv=c.cv&&c.cv.ok?c.cv:null,L=[],add=function(n,m,nota){m=num(m);if(Math.abs(m)>0.004)L.push({n:n,m:m,nota:nota||''})};
 if(cv)add('Combustible'+(cv.lit?' ('+r2(cv.lit)+' L a '+f2(cv.precio)+')':''),cv.comb);else if(!c.vw)add('Combustible',t.diesel);
 add('Básculas',t.extra);add('Comida',t.comida);add('Casetas',t.casetas);
 (c.extras||[]).forEach(function(x){if((x.imp68||esImp68(x.c))&&(x.mant||num(x.m)>tope68()))return;add(String(x.c||'Otro gasto'),x.m)});
 var dk=cv?num(cv.desg):num(c.dsgM),km=cv?num(cv.km):num(c.dsgKm);if(dk)add('Desgaste del vehículo ('+Math.round(km).toLocaleString('es-MX')+' km × '+f2(km?dk/km:0)+')',dk);
 var su=cv?num(cv.sueldo)+num(cv.com):num(c.suelM);if(su)add('Sueldo '+(c.suelQ?'de '+c.suelQ+' ':'')+'por el viaje',su);
 var s=sum(L,function(x){return x.m}),dif=r2(num(k.tr)-s);if(Math.abs(dif)>0.5)add('Otros gastos del viaje',dif);
 return {L:L,big:impBig68(c)}}
/* costo de repartir (por caja de roatán y por kilo de macho) */
function cierreExtra68(r){try{var G=(S.gch||[]),t=tope68(),big=G.filter(function(x){return esImp68(x.tipo)&&num(x.m)>t});r.g68={tot:r2(sum(G,function(x){return num(x.m)})-sum(big,function(x){return num(x.m)})),big:big.map(function(x){return {tipo:x.tipo,m:num(x.m),nota:x.nota||''}}),comb:r2(sum(G.filter(function(x){return /combust/i.test(x.tipo)}),function(x){return num(x.m)})+sum(S.recs||[],function(x){return num(x.total||x.m)}))};
 var vh=vehHoy();r.veh68=vh?vh.id:null;r.tasa68=tasa68(vh);var z=suelDia68(cl0(+S.chofHoy));r.suel68=z.s;r.ch68=+S.chofHoy}catch(e){}return r}
/* cierreRes: pasó a tema-cierre.js */
function rep68(dias){dias=dias||30;var d0=iso(new Date(TODAY.getTime()-dias*864e5)),R=[];(S.rutasHist||[]).forEach(function(x){if(x.f>=d0&&x.res)R.push(x.res)});
 try{rutasOtras().forEach(function(o){if(o.cierre&&o.cierre.sent&&o.cierre.res)R.push(o.cierre.res)})}catch(e){}if(S.cierre&&S.cierre.sent&&S.cierre.res&&R.indexOf(S.cierre.res)<0)R.push(S.cierre.res);
 var o={rutas:0,cajas:0,kg:0,comb:0,otros:0,desg:0,suel:0};R.forEach(function(r){if(!(num(r.R)||num(r.M)))return;o.rutas++;o.cajas+=num(r.R);o.kg+=num(r.M);var g=r.g68||{};o.comb+=num(g.comb);o.otros+=Math.max(0,num(g.tot)-num(g.comb));o.desg+=Math.max(0,num(r.km))*(r.tasa68!=null?num(r.tasa68):0.7);o.suel+=num(r.suel68)});
 o.tot=o.comb+o.otros+o.desg+o.suel;var kc=20;try{var lc=S.cargas.filter(function(c){return c.cajas>0&&c.kgR>0}).sort(function(a,b){return b.id-a.id})[0];if(lc)kc=lc.kgR/lc.cajas}catch(e){}
 var wR=o.cajas*kc,wM=o.kg,w=wR+wM;o.caja=o.cajas&&w?o.tot*wR/w/o.cajas:0;o.kgc=o.kg&&w?o.tot*wM/w/o.kg:0;o.kc=kc;return o}
repCostoCard=function(){var a=rep68(7),b=rep68(30);
 if(!b.rutas)return '<div class="card"><b>Costo de reparto</b><div class="lbl">Todavía no hay rutas cerradas para calcularlo. Sale solo cuando los choferes manden sus cierres: combustible, gastos de la ruta, desgaste de la camioneta (km del odómetro) y su sueldo del día, entre lo que entregaron.</div></div>';
 return '<div class="card"><b>Costo de reparto</b><div class="lbl">Lo real de las rutas: combustible, gastos de la ruta, desgaste de la camioneta (km del odómetro) y sueldo del día, entre lo entregado. El roatán va por caja y el macho por kilo (repartido por peso).</div>'
  +rw('Últimos 7 días',(a.rutas?f2(a.caja)+' por caja · '+f2(a.kgc)+' por kilo':'sin rutas'))+rw('Últimos 30 días',f2(b.caja)+' por caja · '+f2(b.kgc)+' por kilo')
  +'<div class="lbl" style="margin-top:6px">30 días: '+b.rutas+' rutas · combustible '+money(b.comb)+' · otros gastos '+money(b.otros)+' · desgaste '+money(b.desg)+' · sueldos '+money(b.suel)+' · '+b.cajas.toLocaleString('es-MX')+' cajas y '+Math.round(b.kg).toLocaleString('es-MX')+' kg</div></div>'};
desg=function(c,k){var rp=rep68(30),vR=num(c.vCaja)||num(S.precio.R),vM=num(c.vKgM)||num(S.precio.M),eR=k.costoCaja+rp.caja,eM=k.costoKgM+rp.kgc,uR=vR-eR,uM=vM-eM,utR=c.cajas?uR*c.cajas:0,utM=c.kgM?uM*c.kgM:0,utO=sum(k.otros,function(x){return x.util}),ut=utR+utM+utO,mR=mgR68(c),mM=mgM68(c),
 sec=function(n,t,col,bg,body){return '<div style="border-left:5px solid '+col+';background:'+bg+';border-radius:12px;padding:8px 12px;margin-top:10px"><div style="font-size:13px;font-weight:800;color:'+col+';text-transform:uppercase;letter-spacing:.03em">'+n+' · '+t+'</div>'+body+'</div>'},
 ln=function(l,v,cls){return '<div style="display:flex;justify-content:space-between;gap:8px;font-size:15px;padding:3px 0"><span>'+l+'</span><b class="'+(cls||'')+'" style="white-space:nowrap">'+v+'</b></div>'},
 big=function(l,v,col){return '<div style="display:flex;justify-content:space-between;align-items:baseline;gap:8px;border-top:1px solid rgba(0,0,0,.08);margin-top:4px;padding-top:6px"><b>'+l+'</b><span style="font-size:24px;font-weight:800;'+(col?'color:'+col:'')+'">'+v+'</span></div>'},
 G=gastosViaje68(c,k);
 var h=sec('1','Lo que pagaste','var(--fg)','var(--bg)',(k.fR?ln('Roatán · '+c.kgR.toLocaleString('es-MX')+' kg a '+f2(c.pR)+' el kilo',money(k.fR)):'')+(k.fM?ln('Macho · '+c.kgM.toLocaleString('es-MX')+' kg a '+f2(c.pM)+' el kilo',money(k.fM)):'')+k.otros.map(function(x){return ln(esc(x.n||'Otra fruta'),money(x.f))}).join('')
  +'<div style="font-size:13px;font-weight:800;color:var(--muted);margin-top:6px">GASTOS DEL VIAJE</div>'+(G.L.length?G.L.map(function(x){return ln(esc(x.n),money(x.m))}).join(''):'<div class="lbl">Sin gastos del viaje.</div>')+ln('<b>Total de gastos del viaje</b>','<b>'+money(k.tr)+'</b>')
  +big('Total del viaje',money(k.total))+G.big.map(function(x){return '<div class="lbl" style="margin-top:4px">🔧 '+esc(x.c)+' '+money(x.m)+': va al mantenimiento del vehículo, no al costo de la fruta.</div>'}).join(''));
 h+=sec('2','Cuánto te cuesta cada una','var(--orange)','var(--banana-soft)',(c.cajas?ln('Caja de roatán puesta en bodega'+(c.kgR?'<br><span class="lbl">'+c.kgR.toLocaleString('es-MX')+' kg ÷ '+c.cajas+' cajas = '+k.kgCaja.toFixed(1)+' kg por caja</span>':''),'<span style="font-size:18px">'+f2(k.costoCaja)+'</span>')
   +ln('+ Repartirla'+(rp.rutas?'':' <span class="lbl">(sin rutas cerradas todavía)</span>'),f2(rp.caja))+ln('<b>= Te cuesta entregada al cliente</b>','<span style="font-size:18px">'+f2(eR)+'</span>'):'')
  +(c.kgM?ln('Kilo de macho puesto en bodega','<span style="font-size:18px">'+f2(k.costoKgM)+'</span>')+ln('+ Repartirlo',f2(rp.kgc))+ln('<b>= Te cuesta entregado</b>','<span style="font-size:18px">'+f2(eM)+'</span>'):'')
  +k.otros.map(function(x){return ln('Kilo de '+esc(x.n||'otra fruta'),f2(x.costoKg))}).join('')+'<div class="lbl">Los gastos del viaje se reparten entre roatán y macho por kilos.</div>');
 h+=sec('3','A cuánto la vendes','var(--info)','var(--surface)',(c.cajas?ln('Caja de roatán',f2(vR)+(num(c.vCaja)?'':' <span class="lbl">(precio de hoy)</span>'))+ln('Para ganar tu meta de '+mR+'%','<span class="lbl">véndela a </span>'+f2(eR*(1+mR/100))):'')+(c.kgM?ln('Kilo de macho',f2(vM)+(num(c.vKgM)?'':' <span class="lbl">(precio de hoy)</span>'))+ln('Para ganar tu meta de '+mM+'%','<span class="lbl">véndelo a </span>'+f2(eM*(1+mM/100))):''));
 h+=sec('4','Cuánto ganas','var(--accent)','var(--ok-soft)',(c.cajas?ln('Por caja de roatán',f2(uR)+(eR?' ('+(uR/eR*100).toFixed(0)+'%)':''),uR<0?'neg':''):'')+(c.kgM?ln('Por kilo de macho',f2(uM)+(eM?' ('+(uM/eM*100).toFixed(0)+'%)':''),uM<0?'neg':''):'')+big('Utilidad del viaje',money(ut),ut<0?'var(--danger)':'var(--accent)')+'<div class="lbl">Si vendes todo a esos precios, ya contando lo que cuesta repartirla. No incluye merma.</div>');
 return h};
/* precio sugerido (resumen de "Revisa y guarda" y precio de la carga) con el costo de repartir y la meta de cada fruta */
/* cC: pasó a tema-cargas.js */
/* meta de ganancia: roatán y macho (o la misma para los dos) */
/* cfield: pasó a tema-cargas.js */
document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act="mgigual"]');if(!b)return;e.stopImmediatePropagation();S.cfg.mgIgual=S.cfg.mgIgual===false?true:false;toast(S.cfg.mgIgual===false?'Ahora el macho tiene su propia meta':'La misma meta para los dos');render()},true);
var _bP69=bigPrecio;bigPrecio=function(tit,cost,key,step,unit,mg){if(key==='M'&&mg!=null){var c=S.cargas.filter(function(x){return S.cvOpen&&x.id===+S.cvOpen})[0];if(c)mg=mgM68(c)}return _bP69.call(this,tit,cost,key,step,unit,mg)};

/* ---------- 55 · comida autorizada antes ---------- */
/* viaje de carga: el administrador decide al mandarlo */
/* vwBody: pasó a tema-viaje.js */
document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act="vw68"]');if(!b||!S.vw)return;e.stopImmediatePropagation();S.vw.comOk=b.dataset.v==='si';render()},true);
/* vwSideHTML: pasó a tema-viaje.js */
window.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act="vwgx"]');if(!b||!S.vw)return;var v=S.vw,t=v.gxt||'Comida';if(t!=='Comida')return;
 if(v.comOk===false){e.preventDefault();e.stopImmediatePropagation();toast('La comida no está autorizada en este viaje. Pídele permiso al administrador.');return}
 if(v.comOk===true&&num(v.comMax)>0){var ya=sum((v.gx||[]).filter(function(x){return x.t==='Comida'}),function(x){return num(x.m)});if(ya+num(v.gxm)>num(v.comMax)+0.005){e.preventDefault();e.stopImmediatePropagation();toast('Pasa del máximo autorizado para comida ('+money(num(v.comMax))+'). Llévale el ticket al administrador.')}}},true);
/* ruta de reparto: presupuesto diario de comida en la ficha del chofer */
/* fiEmp: pasó a tema-fichas.js */
document.addEventListener('change',function(e){var t=e.target;if(!t||!t.dataset||!t.dataset.ch68)return;var c=cl0(+t.dataset.ch68);if(!c)return;var v=String(t.value).trim();c.comidaMax=v===''?null:num(v);S.hist.push({t:fmtF(iso(TODAY))+' '+hhmm(),q:quien(),x:'Presupuesto diario de comida de '+c.n+': '+(c.comidaMax==null?'sin tope':money(c.comidaMax))});toast('Guardado');render()},true);
window.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act="gxsave"]');if(!b||S.role!=='rep'||!S.gx||!/^Comida/.test(S.gx.tipo||''))return;var c=cl0(S.chofHoy);if(!c||c.comidaMax==null)return;
 var ya=sum((S.gch||[]).filter(function(x){return /^Comida/.test(x.tipo||'')}),function(x){return num(x.m)});if(ya+num(S.gx.m)>num(c.comidaMax)+0.005){e.preventDefault();e.stopImmediatePropagation();toast('Pasa del presupuesto de comida de hoy ('+money(num(c.comidaMax))+'; llevas '+money(ya)+').')}},true);
/* en el reparto no hay casetas: no sale la opción */
var _gxT69=gxTipos;gxTipos=function(){return _gxT69.apply(this,arguments).replace(/<button data-act="gxt2" data-t="Caseta"[^>]*>[^<]*<\/button>/,'')};
var _rd69c=render;render=function(){var r=_rd69c.apply(this,arguments);try{if(S.role==='rep'){Array.prototype.forEach.call(document.querySelectorAll('[data-act="gxtipo"][data-t="Caseta"],[data-act="gxt2"][data-t="Caseta"]'),function(b){b.remove()});if(S.gx&&S.gx.tipo==='Caseta')S.gx.tipo='Ponchadura o reparación'}}catch(e){}return r};

/* ---------- 55 · imprevistos grandes van al mantenimiento del vehículo; el desgaste se ajusta solo ---------- */
/* vehGastos: pasó a tema-vehiculos.js */
function desgAuto68(){try{var hoy=iso(TODAY);if(S.role!=='admin'||(S.desgAutoF===hoy))return;S.desgAutoF=hoy;vehAct().forEach(function(vh){if(vh.desgCalc120)return;/* 120 · si se calculó con la calculadora, no se cambia solo */var f=fondoVeh(vh,12);if(!(f.gs>0&&f.km>0&&f.tasa>0))return;var ant=tasa68(vh);if(Math.abs(f.tasa-ant)<0.05)return;
  vh.desg=f.tasa;var txt='El desgaste de '+vh.n+' cambió de '+f2(ant)+' a '+f2(f.tasa)+' por km (con lo que de verdad se gastó en el año)';S.hist.push({t:fmtF(hoy)+' '+hhmm(),q:'App',x:txt});(S.avPrecio=S.avPrecio||[]).push(txt)})}catch(e){}}
var _rd69d=render;render=function(){var r=_rd69d.apply(this,arguments);desgAuto68();return r};

/* ---------- 58 · contra errores de dedo: "¿Seguro? Es mucho más de lo normal" ---------- */
function med68(L){L=L.filter(function(x){return x>0}).sort(function(a,b){return a-b});return L.length>=2?L[Math.floor(L.length/2)]:0}
function raro68(v,L,f,dos){v=num(v);var m=med68(L);if(!(v>0)||!m)return '';return v>m*(f||3)?'mucho más':(dos&&v<m/(f||3)?'mucho menos':'')}
function cmRaros68(k){var m=S.cm,C=S.cargas.slice(-15),R=[],chk=function(lbl,v,L,u,f){var r=raro68(v,L,f,!!f&&f<2);if(r)R.push(lbl+': '+num(v).toLocaleString('es-MX')+(u||'')+' es '+r+' de lo normal (normalmente ~'+med68(L).toLocaleString('es-MX',{maximumFractionDigits:2})+(u||'')+')')};
 if(k==='R'){chk('Kilos de roatán',m.kgR,C.map(function(c){return num(c.kgR)}),' kg');chk('Cajas',m.cajas,C.map(function(c){return num(c.cajas)}));chk('Precio del kilo de roatán',m.pR,C.map(function(c){return num(c.pR)}),'',1.6)}
 if(k==='M'){chk('Kilos de macho',m.kgM,C.map(function(c){return num(c.kgM)}),' kg');chk('Precio del kilo de macho',m.pM,C.map(function(c){return num(c.pM)}),'',1.6)}
 if(k==='gastos'){chk('Combustible',m.comb,C.map(function(c){return num(c.t&&c.t.diesel)}),'');var x=m.x68;if(x&&x.impOn==='si')chk('Imprevisto',x.impM,[300,300],'',6)}
 return R}
window.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act="cmsig"]');if(!b||!S.cm)return;var P=cmPasos(),k=P[Math.min(S.cm.paso,P.length-1)];try{if(cmValida(k))return}catch(er){return}
 var R=cmRaros68(k),sg=k+'|'+R.join('|');if(!R.length||(S.cm._dedo68||{})[sg])return;e.preventDefault();e.stopImmediatePropagation();
 abrirModal('¿Seguro?',R.map(esc).join('<br>')+'<br><br>Revisa que no sea un error de dedo.',[['Sí, está bien','dedo68',' data-k="'+encodeURIComponent(sg)+'"']])},true);
window.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act="gxsave"]');if(!b||S.role!=='rep'||!S.gx)return;var t=S.gx.tipo||'';var v=num(S.gx.m),lim=/^Comida/.test(t)?600:(esImp68(t)?3000:1500);if(!(v>lim)||S.gx._dedo68===v)return;e.preventDefault();e.stopImmediatePropagation();
 abrirModal('¿Seguro?','Un gasto de '+money(v)+' en "'+esc(t)+'" es mucho más de lo normal. Revisa que no sea un error de dedo.',[['Sí, está bien','dedo68g',' data-v="'+v+'"']])},true);
document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act="dedo68"],[data-act="dedo68g"]');if(!b)return;e.stopImmediatePropagation();S.modal=null;
 if(b.dataset.act==='dedo68'){if(!S.cm)return render();S.cm._dedo68=S.cm._dedo68||{};S.cm._dedo68[decodeURIComponent(b.dataset.k)]=1;render();var s=document.querySelector('#cmov [data-act="cmsig"]');if(s)s.click()}
 else{if(S.gx)S.gx._dedo68=num(b.dataset.v);render();var g=document.querySelector('[data-act="gxsave"]');if(g)g.click()}},true);

/* ---------- 60 · ningún número vacío rompe las cuentas ---------- */
function sano68(){var malos=[];try{var I=S.inv||{};['verdes','maduras','kgVerde','kgMaduro','reparto','repartoKg','vacias'].forEach(function(k){var v=I[k];if(typeof v==='number'&&isFinite(v))return;var n=Number(v);if(v===''||v==null||!isFinite(n)){malos.push('Bodega: '+k);I[k]=0}else I[k]=n});
  (S.cli||[]).forEach(function(c){['vac','cred'].forEach(function(k){var v=c[k];if(typeof v==='number'&&isFinite(v))return;if(v===undefined||v===null||v===''){c[k]=0;return}var n=Number(v);if(!isFinite(n)){malos.push((k==='vac'?'Taras de ':'Saldo de ')+(c.n||'un cliente'));c[k]=0}else c[k]=n})});
  ['cajasT0'].forEach(function(k){if(S[k]!=null&&!isFinite(Number(S[k]))){malos.push('Total de taras inicial');S[k]=0}else if(S[k]!=null)S[k]=Number(S[k])});
  (S.cajasMov||[]).forEach(function(m){if(!isFinite(Number(m.n))){malos.push('Movimiento de taras: '+(m.t||''));m.n=0}else m.n=Number(m.n)})}catch(e){}
 if(malos.length){apErr('número vacío','Faltaba un número y se puso en 0: '+malos.join(', '),S.tab&&S.tab[S.role]);try{(S.avPrecio=S.avPrecio||[]).push('Faltaba un número y la app lo puso en 0: '+malos.join(', ')+'. Revísalo; es un error de la app, ya quedó anotado.')}catch(e){}}}
var _rd69s=render;render=function(){sano68();return _rd69s.apply(this,arguments)};

/* ---------- 60 · avisos de "no cuadra" en palabras claras ---------- */
var CU68={
 'Los números se pueden calcular':['Falta un número en las cuentas',1],
 'Inventario sin números negativos':['Hay inventario en negativo',0],
 'Ningún cliente con deuda negativa':['Un cliente quedó con saldo en negativo',0],
 'Cada deuda tiene desde cuándo':['A una deuda le falta la fecha',0],
 'Las cajas cuadran con dónde están':['Las taras no cuadran por lugar',1],
 'Todas las cajas están contadas':['Las taras no cuadran',0],
 'Ningún caja se pierde sin registrarse':['Las taras no cuadran',0],
 'Ningún cliente debe cajas negativas':['Un cliente quedó con taras en negativo',0],
 'Deuda a proveedores: total = suma por proveedor':['La deuda con proveedores no cuadra',1],
 'Cada entrega: cantidades × precio = total':['Una venta no cuadra (cantidad × precio)',1],
 'Efectivo del chofer = cobrado − sus gastos':['El efectivo del chofer no cuadra',1],
 'Lo cobrado hoy = pagos + abonos de las entregas':['Lo cobrado hoy no cuadra',1],
 'Todos los gastos tienen monto':['Hay un gasto sin cantidad',0],
 'Lo anulado no se cuenta':['Algo cancelado se sigue contando',1],
 'Cada gasto fijo pagado hoy salió de la caja':['Un gasto fijo pagado no salió de la caja',1],
 'Ningún gasto fijo se pagó dos veces hoy':['Un gasto fijo se pagó dos veces hoy',0],
 'Faltante del chofer = lo que debía − lo que entregó':['El faltante del chofer no cuadra',1]};
var _cr69=cuentasRevisar;cuentasRevisar=function(){var R=_cr69.apply(this,arguments);try{R.forEach(function(x){var m=CU68[x.n];if(!m)return;x.n0=x.n;x.n=m[0];x.app=!!m[1];if(x.ok)return;var d=String(x.det||'');
   if(x.n0==='Los números se pueden calcular'){d='Algún número del inventario, la caja o las deudas quedó vacío'}
   else if(x.n0==='Todas las cajas están contadas'||x.n0==='Ningún caja se pierde sin registrarse'){var w=cajasDonde(),es=cajasEsperadas(),df=Math.round(es-w.tot);d=isFinite(w.tot)&&isFinite(es)?('La app cuenta '+Math.round(w.tot).toLocaleString('es-MX')+' taras y deberían ser '+Math.round(es).toLocaleString('es-MX')+': '+(df>0?'faltan '+df:'sobran '+(-df))+'. Cuéntalas en Bodega → Taras'):'Un número de las taras quedó vacío'}
   else if(x.n0==='Las cajas cuadran con dónde están'){var w2=cajasDonde();d='Total '+Math.round(w2.tot)+': vacías en bodega '+num(w2.vac)+', llenas '+num(w2.llenas)+', en camión '+num(w2.cam)+', con clientes '+num(w2.cli)+', con proveedores '+num(w2.pv)}
   else if(x.n0==='Inventario sin números negativos'){d=d.replace(/cajas vacías/g,'taras vacías')+'. Corrige el conteo en Bodega'}
   x.det=d+(x.app?'. Es un error de la app, no tuyo; ya quedó anotado':'');if(x.app)apErr('no cuadra',x.n+': '+d,'cuentas')})}catch(e){}return R};
/* avDestino: pasó a tema-avisos.js */
/* "¿Cuadra todo?" a la vista en Inicio */
function cuadraCard68(){var R=[];try{R=cuentasRevisar()}catch(e){}var m=R.filter(function(x){return !x.ok}),d=document.createElement('div');d.dataset.x='cuadra68';
 if(!m.length){d.className='card';d.style.cssText='padding:12px 16px;display:flex;align-items:center;gap:12px;border:1.5px solid color-mix(in srgb,#16A34A 40%,transparent);background:color-mix(in srgb,#16A34A 9%,var(--surface))';d.innerHTML='<span style="font-size:26px">✓</span><span><b style="font-size:17px;color:#15803D">Todo cuadra</b><br><span class="lbl">Caja, cajas, kilos, taras y deudas ('+R.length+' revisiones)</span></span>';return d}
 d.className='card alert';d.style.cssText='padding:12px 16px;border-width:2px';d.innerHTML='<b style="font-size:18px" class="neg">⚠ Algo no cuadra</b>'+m.map(function(x){return '<div style="margin-top:8px;padding:8px 10px;border-radius:12px;background:color-mix(in srgb,var(--danger) 8%,var(--surface))"><b>'+esc(x.n)+'</b><div style="font-size:15px">'+esc(x.det||'')+'</div></div>'}).join('');return d}
var _rd69q=render;render=function(){var r=_rd69q.apply(this,arguments);try{var mm=document.querySelector('main');if(mm&&S.role==='admin'&&S.tab.admin==='inicio'&&!mm.querySelector('[data-x="cuadra68"]')){var ref=mm.querySelector(':scope > details[data-k="avinfo"]')||Array.prototype.filter.call(mm.querySelectorAll(':scope > .card'),function(c){var b=c.querySelector('.tt');return b&&/^Por atender/.test(b.textContent)})[0]||mm.querySelector('.inv68');if(ref)ref.after(cuadraCard68())}}catch(e){console.error('cuadra68',e)}return r};
/* 54 · "Costo del viaje más exacto" a la vista en la ficha de la carga (antes escondido en "Detalle") */
/* fiCarga: pasó a tema-viaje.js */
/* el aviso que sale abajo también dice qué no cuadra y por cuánto */
/* toast: pasó a tema-toast.js */
