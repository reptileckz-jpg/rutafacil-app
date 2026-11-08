/* ===================== v3.9 · 2. Fichas en su propia pantalla, con pestañas ===================== */
(function(){var css=[
 '#fiov{position:fixed;inset:0;z-index:33;background:var(--bg);overflow-y:auto;-webkit-overflow-scrolling:touch}',
 '#fiov .fiw{max-width:560px;margin:0 auto;padding:0 16px 48px}',
 '#fiov .fihd{position:sticky;top:0;z-index:3;background:var(--bg);padding:10px 0 8px;display:flex;align-items:center;gap:10px}',
 '#fiov .fiback{width:44px;height:44px;border-radius:50%;border:1px solid var(--line);background:var(--surface);font-size:22px;line-height:1;color:var(--fg);flex:none}',
 '#fiov .fihd b{font-size:19px;line-height:1.2}',
 '#fiov .fihero{background:var(--surface);border-radius:22px;padding:14px;box-shadow:var(--sh);display:flex;flex-direction:column;gap:10px;align-items:center;text-align:center}',
 '#fiov .fihero .fiimg{width:100%;max-height:150px;object-fit:cover;border-radius:14px}',
 '#fiov .fitabs{position:sticky;top:62px;z-index:2;background:var(--bg);display:flex;gap:6px;overflow-x:auto;padding:10px 0 8px;scrollbar-width:none}',
 '#fiov .fitabs::-webkit-scrollbar{display:none}',
 '#fiov .fitabs button{flex:0 0 auto;min-height:44px;padding:0 16px;border-radius:999px;border:1px solid var(--line);background:var(--surface);font-weight:700;font-size:14px;color:var(--fg);position:relative}',
 '#fiov .fitabs button[aria-pressed="true"]{background:var(--fg);color:var(--bg);border-color:var(--fg)}',
 '#fiov .fitabs .dot{position:absolute;top:6px;right:6px;width:9px;height:9px;border-radius:50%;background:var(--danger);border:2px solid var(--surface)}',
 '#fiov .fibody>.card,#fiov .fibody>details.card{margin-top:10px}',
 '#fiov .fibody{display:flex;flex-direction:column;gap:10px;min-height:calc(100vh - 130px)}',
 '@media (min-width:1000px){html:not(.as-phone) #fiov{left:auto;width:min(600px,52vw);box-shadow:-12px 0 32px rgba(0,0,0,.18);border-left:1px solid var(--line)}}',
'.toast{z-index:92!important}',
 'html.fi-on .fab{display:none!important}'
];var st=document.createElement('style');st.textContent=css.join('\n');document.head.appendChild(st)})();
S.fiTab=S.fiTab||{};
/* cuál ficha está abierta: la manda el estado que ya usaba la app */
function fiCur(){if(S.role!=='admin'||S.vf)return null;var t=S.tab.admin;
 if(t==='cargas'&&S.fiLast==='openProv'&&S.openProv)return {t:'prov',key:'openProv',id:S.openProv};
 if(t==='cargas'&&S.openCarga!=null&&cargaById(S.openCarga))return {t:'carga',key:'openCarga',id:S.openCarga};
 if(t==='cargas'&&S.openProv)return {t:'prov',key:'openProv',id:S.openProv};
 if(t==='clientes'&&S.openCli!=null&&cl(S.openCli))return {t:'cli',key:'openCli',id:S.openCli};
 if(t==='personal'&&S.openCh!=null&&S.choferes.some(function(c){return c.id===S.openCh}))return {t:'emp',key:'openCh',id:S.openCh};
 if(t==='vehiculos'&&S.vehOpen!=null&&S.veh.some(function(v){return v.id===S.vehOpen}))return {t:'veh',key:'vehOpen',id:S.vehOpen};
 return null}
function fiTabs(f,L){var k=f.t+':'+f.id;if(!S.fiTab[k]||!L.some(function(x){return x&&x[0]===S.fiTab[k]}))S.fiTab[k]=L[0][0];var cur=S.fiTab[k];
 return {cur:cur,html:'<div class="fitabs" role="tablist">'+L.filter(Boolean).map(function(x){return '<button role="tab" data-act="fitab" data-v="'+x[0]+'" aria-pressed="'+(cur===x[0])+'">'+x[1]+(x[2]?'<span class="dot" aria-label="tiene algo pendiente"></span>':'')+'</button>'}).join('')+'</div>'}}
function fiWrap(f,title,sub,hero,T,body){return '<div id="fiov" data-fi="'+f.t+':'+esc(String(f.id))+':'+T.cur+'"><div class="fiw"><div class="fihd"><button class="fiback" data-act="fix" aria-label="Regresar">←</button><span class="grow"><b>'+title+'</b>'+(sub?'<br><span class="lbl">'+sub+'</span>':'')+'</span></div>'+hero+T.html+'<div class="fibody">'+body+'</div></div></div>'}

/* ---- Vehículo ---- */
function fiVeh(f){var v=S.veh.filter(function(x){return x.id===f.id})[0],i=vInfo(v),d30=function(d){var n=diasA(d);return n!==null&&n<=30};
 var dPap=d30(v.segVence)||d30(v.tcVence)||d30(v.verVence)||!!(verifDe(v)||{}).win,ll=num(v.llInt)?num(v.llLast)+num(v.llInt)-num(v.odo):null,fr=num(v.frInt)?num(v.frLast)+num(v.frInt)-num(v.odo):null,
  dTal=i.rem<=500||(v.afDue&&i.dias<=30)||(ll!==null&&ll<=500)||(fr!==null&&fr<=500),cI=v.cred?credInfo(v.cred):null,dCre=!!(cI&&cI.rest&&cI.dias<0);
 var T=fiTabs(f,[['res','Resumen'],['pap','Papeles',dPap],['tal','Taller',dTal],['gas','Gastos'],v.cred?['cre','Crédito',dCre]:null]),b='';
 var hero='<div class="fihero fivh">'+(v.foto?'<img class="fiimg big" src="'+v.foto+'" alt="'+esc(v.n)+'">':'')+'<div class="fivrow">'+plateSVG(v,true)+'<div><b style="font-size:18px">'+esc(v.n)+'</b><br><span class="lbl">'+[v.anio,v.color,v.motor].filter(Boolean).map(esc).join(' · ')+'</span><div style="margin-top:6px">'+fuelBadge(v.comb)+' <span class="lbl">'+num(v.odo).toLocaleString('es-MX')+' km</span></div>'+'</div></div>'+(v.fuera?'<div style="color:var(--danger);font-weight:900">Fuera de servicio: requiere reparación</div>':'')+'</div>';
 if(T.cur==='res'){var al=[];if(i.rem<=500)al.push('Aceite '+(i.rem<=0?'vencido':'en '+i.rem.toLocaleString('es-MX')+' km'));if(dPap)al.push('Papeles por revisar');if(dCre)al.push('Mensualidad vencida');
  b='<div class="card">'+(al.length?'<div class="lbl neg" style="margin-bottom:6px">⚠ '+al.join(' · ')+'</div>':'<div class="lbl" style="color:var(--accent);font-weight:700;margin-bottom:6px">✓ Todo al día</div>')
   +rw('Odómetro',num(v.odo).toLocaleString('es-MX')+' km')+rw('Tanque',num(v.capL)+' L')+rw('Límite de velocidad',num(v.vmax)?v.vmax+' km/h':'sin límite')+(v.vin?rw('Número de serie',esc(v.vin)):'')
   +(function(){var L=excesosDe(function(x){return x.vid===v.id});return '<details data-k="exv'+v.id+'"'+(S.dOpen['exv'+v.id]?' open':'')+' style="margin:4px 0"><summary><b>Excesos de velocidad</b><span class="lbl">'+L.length+'</span></summary>'+excesosHTML(L)+'</details>'})()+'</div>'
   +encVehHTML(v)
   +'<div style="display:flex;gap:8px;flex-wrap:wrap"><button class="btn sm sec" style="flex:1 1 110px" data-act="vedit" data-id="'+v.id+'">Editar datos</button>'+(S.vbaja===v.id?'<button class="btn sm" style="flex:1 1 110px;background:var(--danger)" data-act="vbaja" data-id="'+v.id+'">Confirmar baja</button>':'<button class="btn sm sec" style="flex:1 1 110px" data-act="vbaja" data-id="'+v.id+'">Dar de baja</button>')+'</div>'}
 if(T.cur==='pap'){var pe=plEdo(v),pt=v.plTipo||(v.id===2?'carga':'auto');
  b='<div class="card"><b>Placa</b><div class="lbl" style="margin-top:6px">Estado</div><div class="chips" role="group" style="margin:6px 0">'+['Veracruz','Guerrero'].map(function(x){return '<button data-act="pledo" data-id="'+v.id+'" data-v="'+x+'" aria-pressed="'+(pe===x)+'">'+x+'</button>'}).join('')+'</div><div class="lbl">Tipo</div><div class="chips" role="group" style="margin:6px 0"><button data-act="pltipo" data-id="'+v.id+'" data-v="auto" aria-pressed="'+(pt==='auto')+'">Automóvil</button><button data-act="pltipo" data-id="'+v.id+'" data-v="carga" aria-pressed="'+(pt==='carga')+'">Carga</button></div><div class="lbl">El número se cambia en "Editar datos" y la placa se dibuja sola.</div></div>'
   +'<div class="card"><b>Seguro</b>'+rw('Aseguradora',v.aseg?esc(v.aseg):'sin registrar')+rw('Póliza',v.pol?esc(v.pol):'sin registrar')+(v.segTel?rw('Teléfono de siniestros','<a href="tel:'+String(v.segTel).replace(/\D/g,'')+'">'+esc(v.segTel)+'</a>'):'')+'</div>'
   +'<div class="card"><b>Documentos con vencimiento</b>'+vDocRow('Seguro',v.segVence)+vDocRow('Tarjeta de circulación',v.tcVence)+vDocRow('Verificación',v.verVence)+'</div>'+'<div class="card"><b>Fotos de los papeles</b><div style="display:flex;gap:8px;margin-top:8px">'+[['fotoPol','Póliza'],['fotoTc','Tarjeta de circulación'],['fotoVer','Verificación']].map(function(x){return '<div style="flex:1;min-width:0;text-align:center"><div class="lbl" style="font-size:12px;line-height:1.2;min-height:30px">'+x[1]+'</div>'+(v[x[0]]?'<img src="'+v[x[0]]+'" alt="'+x[1]+' de '+esc(v.n)+'" style="width:100%;height:84px;object-fit:cover;border-radius:8px;margin-top:4px;display:block;border:1px solid var(--line)">':'<div style="height:84px;margin-top:4px;border-radius:8px;background:var(--bg);display:flex;align-items:center;justify-content:center;font-size:12px;color:var(--muted)">Sin foto</div>')+'</div>'}).join('')+'</div><div class="lbl" style="margin-top:6px">Toca una para verla en grande. Se cambian en "Editar datos".</div></div>'+verifRow(v)}
 if(T.cur==='tal')b='<div class="card"><b>Mantenimiento</b>'
   +'<div class="row"><span>Cambio de aceite (cada '+num(v.acInt).toLocaleString('es-MX')+' km)</span><b class="'+(i.rem<=500?'neg':'')+'">'+(i.rem<=0?'vencido por '+(-i.rem).toLocaleString('es-MX'):'en '+i.rem.toLocaleString('es-MX'))+' km</b></div>'
   +(v.afDue?'<div class="row"><span>Afinación mayor</span><b class="'+(i.dias<=30?'neg':'')+'">'+(i.dias<0?'vencida':'en '+i.dias+' días')+'</b></div>':'')
   +(ll!==null?rw('Llantas',kmAprox(ll,v),ll<=500?'neg':''):'')+(fr!==null?rw('Frenos',kmAprox(fr,v),fr<=500?'neg':''):'')
   +'<div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:8px">'+mantForm(v)+'</div></div>'+bitHTML(v);
 if(T.cur==='gas')b=vehResumenHTML(v)+fuelVeh(v)+equipoHTML(v);
 if(T.cur==='cre')b=credHTML(v);
 return fiWrap(f,esc(v.n),esc(v.pl||''),hero,T,b)}

/* ---- Empleado ---- */
function fiEmp(f){var c=S.choferes.filter(function(x){return x.id===f.id})[0],ch=esCh(c)&&!esAdm(c),fl=chStatus(c),li=licInfo(c),nm=esAdm(c)?chofN(2)+' (tú)':(c.n||'Sin nombre');
 var hero='<div class="fihero">'+chAvatar(c,84)+'<div><b style="font-size:19px">'+esc(nm)+'</b><br><span class="lbl">'+puestoN(c)+(c.ing&&!esAdm(c)?' · '+antig(c.ing):'')+'</span>'+(c.nuevo?' <span class="pill wait">Nuevo</span>':'')+'<div style="margin-top:6px">'+(esAdm(c)?'':(fl.length?'<span class="pill warn">Faltan '+fl.length+' dato'+(fl.length>1?'s':'')+'</span>':'<span class="pill">✓ Expediente completo</span>'))+(li&&li.d<=30?' <span class="pill warn">Licencia '+(li.d<0?'vencida':'por vencer')+'</span>':'')+'</div>'+(c.tel&&!esAdm(c)?'<div style="display:flex;gap:8px;justify-content:center;margin-top:8px"><a class="btn sm" style="text-decoration:none;display:flex;align-items:center;padding:0 18px" href="tel:'+String(c.tel).replace(/\D/g,'')+'">Llamar</a></div>':'')+'</div></div>';
 if(S.chEdit===c.id){var T0={cur:'edit',html:''};
  var bE='<div class="card">'+chF(c,'n','Nombre completo')
    +(esAdm(c)?'':'<div class="lbl" style="margin-top:6px"><b>Puesto</b></div><div class="chips" role="group" style="margin:6px 0">'+PUESTOS.map(function(p){return '<button data-act="chpuesto" data-id="'+c.id+'" data-v="'+p[0]+'" aria-pressed="'+((c.puesto||'chofer')===p[0])+'">'+p[1]+'</button>'}).join('')+'</div>')
    +'<div style="display:flex;gap:10px;margin:8px 0">'+chImg(c,'foto','Fotografía')+chImg(c,'ine','INE')+(ch?chImg(c,'lic','Licencia'):'')+'</div>'
    +(esAdm(c)?'':chF(c,'tel','Teléfono','tel')+chF(c,'dir','Dirección')+chF(c,'ing','Entró a trabajar','date')+(ch?chF(c,'licV','La licencia vence','date'):'')
    +'<div class="lbl" style="margin-top:10px"><b>Referencia 1</b></div>'+chF(c,'r1n','Nombre')+chF(c,'r1p','Parentesco','text','mamá, compadre…','pn-parent')+chF(c,'r1t','Teléfono','tel')
    +'<div class="lbl" style="margin-top:10px"><b>Referencia 2</b></div>'+chF(c,'r2n','Nombre')+chF(c,'r2p','Parentesco','text','hermano, exjefe…','pn-parent')+chF(c,'r2t','Teléfono','tel')
    +'<div class="lbl" style="margin-top:10px"><b>En caso de accidente, avisar a</b></div>'+chF(c,'emn','Nombre')+chF(c,'emp','Parentesco','text','esposa, mamá…','pn-parent')+chF(c,'emt','Teléfono','tel'))
    +'<button class="btn" style="margin-top:10px" data-act="chlisto">Guardar cambios</button></div>';
  return fiWrap(f,'Editar · '+esc(nm),'',hero,T0,'<datalist id="pn-parent">'+PARENT.map(function(p){return '<option value="'+p+'">'}).join('')+'</datalist>'+bE)}
 var T=fiTabs(f,esAdm(c)?[['dat','Datos'],['bie','Bienes']]:[['dat','Datos',fl.some(function(x){return /foto|teléfono|INE|licencia/.test(x)})||(li&&li.d<=30)],['ref','Referencias',fl.some(function(x){return /referencia|emergencia/.test(x)})],ch?['ruta','Ruta y metas']:null,['sue','Sueldo'],['bie','Bienes']]),b='';
 if(T.cur==='dat')b='<div class="card">'+(fl.length?'<div class="lbl neg" style="margin-bottom:8px">Falta: '+fl.join(', ')+'.</div>':'')
   +'<div style="display:flex;gap:10px;margin:4px 0 8px">'+chView(c,'foto','Fotografía')+(esAdm(c)?'':chView(c,'ine','INE'))+(ch?chView(c,'lic','Licencia de conducir'):'')+'</div>'
   +rw('Nombre completo',esc(esAdm(c)?chofN(2):c.n))+rw('Puesto',puestoN(c))+(esAdm(c)?'':rw('Teléfono',telA(c.tel)||'sin registrar')+rw('Dirección',c.dir?esc(c.dir):'sin registrar')+rw('Entró a trabajar',c.ing?fmtF(c.ing)+' · '+antig(c.ing):'sin registrar')+(ch?rw('Licencia vence',li?li.txt:'sin registrar',li&&li.d<=30?'neg':''):''))
   +(typeof pinRow==='function'?pinRow(esAdm(c)?'a:'+S.adminYo:'c:'+c.id):'')
   +'<div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:10px"><button class="btn sm sec" data-act="chedit" data-id="'+c.id+'">Editar datos</button>'+(ch?'<button class="btn sm '+(c.nuevo?'':'sec')+'" style="'+(c.nuevo?'background:var(--orange)':'')+'" data-act="chnuevo" data-id="'+c.id+'">'+(c.nuevo?'Chofer nuevo · quitar marca':'Marcar como nuevo')+'</button>':'')+'</div>'+(ch&&c.nuevo?'<div class="lbl">Mientras sea nuevo: aviso de efectivo con la mitad del límite y fichas de clientes antes de salir.</div>':'')+'</div>';
 if(T.cur==='ref')b='<div class="card"><b>Referencias</b>'+rw('Referencia 1',refTxt(c.r1n,c.r1p,c.r1t))+rw('Referencia 2',refTxt(c.r2n,c.r2p,c.r2t))+'</div><div class="card"><b>En caso de accidente, avisar a</b>'+rw('Contacto',c.emn?esc(c.emn)+(c.emp?' <span class="pill">'+esc(c.emp)+'</span>':'')+(c.emt?' · '+telA(c.emt):''):'sin registrar')+'</div><button class="btn sm sec" data-act="chedit" data-id="'+c.id+'">Editar referencias</button>';
 if(T.cur==='ruta')b='<div class="card"><b>Meta diaria de venta</b><div class="field"><label for="mR'+c.id+'">Cajas de roatán</label><input id="mR'+c.id+'" type="number" inputmode="numeric" min="0" data-meta="'+c.id+':R" value="'+esc(c.meta.R)+'"></div><div class="field"><label for="mM'+c.id+'">Kilos de macho</label><input id="mM'+c.id+'" type="number" inputmode="decimal" min="0" data-meta="'+c.id+':M" value="'+esc(c.meta.M)+'"></div>'+vehAsigSel(c)
   +(function(){var L=excesosDe(function(x){return x.quien===c.n});return '<details data-k="exc'+c.id+'"'+(S.dOpen['exc'+c.id]?' open':'')+' style="margin-top:10px"><summary><b>Excesos de velocidad</b><span class="lbl">'+L.length+'</span></summary>'+excesosHTML(L)+'</details>'})()+'</div>'+encFichaHTML(c)+choferExtra(c)+quejasCard(c);
 if(T.cur==='sue'){var sv=S.choferes,so=S.szOpen;S.choferes=[c];S.szOpen=c.id;try{b=sueldos()}finally{S.choferes=sv;S.szOpen=so}}
 if(T.cur==='bie')b=bienesDe(c)||'<div class="card lbl">No tiene bienes de la empresa a su cargo.</div>';
 return fiWrap(f,esc(nm),puestoN(c),hero,T,b)}

/* ---- Cliente ---- */
function fiCli(f){var c=cl(f.id),ag=credAge(c),ed=S.cliEdit===c.id,deb=c.cred>0||c.vac>0,pagos=S.cobros.filter(function(x){return x.c===c.id}),dCta=(c.cred>0&&ag>=num(S.cfg.cbWa))||!!cajasVenc(c);
 var hero='<div class="fihero"><span class="avt" style="background:'+AVC[c.id%AVC.length]+';width:72px;height:72px;font-size:26px">'+esc(ini(c.n))+'</span><div><b style="font-size:19px">'+esc(c.n)+'</b>'+(c.ap?'<br><span class="lbl">“'+esc(c.ap)+'”</span>':'')+'<div style="margin-top:6px">'+tagPill(c)+(c.mayoreo?' <span class="pill" style="background:var(--banana);color:#1E2A1A">Mayoreo</span>':'')+(c.prio?' <span class="pill wait">Prioridad</span>':'')+(!c.credOk?' <span class="pill wait">Solo contado</span>':'')+'</div>'
  +'<div style="margin-top:8px;font-size:15px">'+(c.cred>0?'Te debe <b class="neg">'+money(c.cred)+'</b>':'<b style="color:var(--accent)">✓ Al corriente</b>')+(c.vac>0?' · '+c.vac+' caja'+(c.vac>1?'s':'')+' vacía'+(c.vac>1?'s':''):'')+'</div></div>'
  +'<div style="display:flex;gap:8px;flex-wrap:wrap;justify-content:center;width:100%"><a class="btn sm" style="flex:1 1 80px;display:flex;align-items:center;justify-content:center;text-decoration:none" target="_blank" rel="noopener" href="'+mapsLink(c)+'">Ir</a>'+(c.tel?'<a class="btn sm sec" style="flex:1 1 80px;display:flex;align-items:center;justify-content:center;text-decoration:none" href="tel:'+c.tel.replace(/\D/g,'')+'">Llamar</a>':'')+(deb&&c.tel?'<a class="btn sm sec" style="flex:1 1 120px;display:flex;align-items:center;justify-content:center;text-decoration:none" target="_blank" rel="noopener" href="'+waLink(c,msgDeuda(c))+'">WhatsApp</a>':'')+'</div></div>';
 var T=fiTabs(f,[['cta','Cuenta',dCta],['dat','Datos'],['vis','Visitas'],['mas','Más']]),b='';
 if(T.cur==='cta')b=(c.cred>0?'<div class="card"><div style="display:flex;justify-content:space-between;align-items:baseline"><b>Te debe</b><span class="mid" style="color:var(--danger)">'+money(c.cred)+'</span></div><div class="lbl">'+(ag?'Desde hace '+ag+' días'+(ag>=num(S.cfg.cbBl)?' · ya solo de contado':''):'')+'</div><div class="field" style="margin-top:6px"><label for="abc_'+c.id+'">Abonó $</label><input id="abc_'+c.id+'" type="number" inputmode="decimal" step="any" min="0"></div>'
   +'<div style="display:flex;gap:8px;margin-top:6px"><button class="btn sm sec" style="flex:1" data-act="cobrar" data-id="'+c.id+'">Registrar abono</button><button class="btn sm sec" style="flex:1" data-act="cobrartodo" data-id="'+c.id+'">Pagó todo</button></div>'+(pagos.length?'<div class="lbl" style="margin-top:6px">Pagos de hoy: '+pagos.map(function(x){return money(x.m)}).join(', ')+'</div>':'')+'</div>':'<div class="card"><b style="color:var(--accent)">✓ No te debe nada</b><div class="lbl">Límite de crédito: '+(c.lim?money(c.lim):'sin límite')+'</div></div>')
   +(!c.credOk?'<div class="card note"><b>Cliente nuevo: solo de contado</b><div class="lbl">Lleva '+(c.compras||0)+' de 5 compras pagadas.</div><button class="btn sm" style="margin-top:6px" data-act="credok" data-id="'+c.id+'">Darle crédito</button></div>':'')
   +(c.vac>0?'<div class="card'+(cajasVenc(c)?' alert':'')+'"><b'+(cajasVenc(c)?' class="neg"':'')+'>'+c.vac+' caja'+(c.vac>1?'s':'')+' sin devolver'+(cajasVenc(c)?' desde hace '+cajasVenc(c)+' días':'')+'</b>'+(cajasVenc(c)?'<button class="btn sm" style="margin-top:6px" data-act="cobrarcajas" data-id="'+c.id+'">Cargar '+c.vac+' cajas a su deuda ('+money(c.vac*num(S.cajaCfg.precio))+')</button>':'')+'</div>':'')
   +mayHistHTML(c)+'<button class="btn sm '+(c.mayoreo?'':'sec')+'" data-act="climay" data-id="'+c.id+'">'+(c.mayoreo?'✓ Siempre lleva precio de mayoreo':'Darle siempre precio de mayoreo')+'</button>';
 if(T.cur==='dat')b=fachImg(c,150)+notasDe('cli:'+c.id)+(ed?'<div class="card">'+cliForm(c)+'</div>':'<div class="card">'+rw('Dirección',esc(c.a||'sin registrar'))+rw('Tipo de negocio',c.tipo?esc(c.tipo):'sin registrar')+rw('Quién recibe',c.recibe?esc(c.recibe):'sin registrar')+rw('Teléfono',c.tel?esc(c.tel):'sin registrar')+rw('Horario',horTxt(c).replace('Recibe de ','').replace(' a ',' a '))+rw('Límite de crédito',c.lim?money(c.lim):'sin límite')
   +(num(c.ppR)||num(c.ppM)?rw('Precio pactado',(num(c.ppR)?money(num(c.ppR))+' la caja':'')+(num(c.ppM)?' · '+money(num(c.ppM))+' el kilo':'')):'')+rw('Ubicación',c.lat!=null?'guardada'+(c.gpsPor?' por '+esc(c.gpsPor):''):'se guarda sola en la primera entrega')
   +(num(c.ppR)&&num(c.ppR)<costoCajaAct()?'<div class="neg" style="font-size:14px;font-weight:600">El precio pactado está por debajo del costo de la caja ('+money(costoCajaAct())+')</div>':'')
   +'<button class="btn sm sec" style="margin-top:8px" data-act="ceedit" data-id="'+c.id+'">Editar datos</button></div>');
 if(T.cur==='vis')b='<div class="card"><b>Días de visita</b><div class="lbl" style="margin-top:4px">Toca para activar o quitar</div><div class="chips" style="gap:4px;margin-top:6px">'+[1,2,3,4,5,6,0].map(function(d){return '<button style="min-width:0;padding:0" data-act="diavisita" data-id="'+c.id+'" data-d="'+d+'" aria-pressed="'+((c.dias||[]).indexOf(d)>-1)+'">'+DSEM[d]+'</button>'}).join('')+'</div>'
   +rw('Frecuencia',c.dias&&c.dias.length?c.dias.map(function(x){return DSEM[x]}).join(', '):'cada '+c.f+' días')+(c.extra?rw('Visita extra',fechaL(new Date(c.extra+'T12:00:00'))):'')+rw('Horario',horTxt(c))+rw('Chofer',c.chofer?esc(chofN(c.chofer)):'sin chofer')+(c.ult?rw('Última compra',fmtF(c.ult)):'')+'</div>';
 if(T.cur==='mas')b='<div class="card"><b>Cómo paga</b><div class="lbl" style="margin-top:4px">'+(c.dp===null||c.dp===undefined?'todavía sin historial':(c.dp===0?'siempre de contado':'tarda unos '+c.dp+' días en pagar'))+'</div><div class="chips" style="margin-top:6px;flex-wrap:wrap" role="group" aria-label="Etiqueta de pago"><button data-act="cltag" data-id="'+c.id+'" data-t="" aria-pressed="'+(!c.tag)+'">Automática</button>'+TAGS.map(function(t){return '<button data-act="cltag" data-id="'+c.id+'" data-t="'+t+'" aria-pressed="'+(c.tag===t)+'">'+t+'</button>'}).join('')+'</div></div>'
   +'<button class="btn sm '+(c.prio?'':'sec')+'" style="'+(c.prio?'background:var(--orange)':'')+'" data-act="prio" data-id="'+c.id+'">'+(c.prio?'Alta prioridad: la ruta empieza con él':'Marcar como alta prioridad')+'</button><button class="btn sm sec" data-act="archivar" data-id="'+c.id+'">Archivar cliente</button>';
 return fiWrap(f,esc(c.n),c.ap?'“'+esc(c.ap)+'”':'',hero,T,b)}

/* ---- Proveedor ---- */
function fiProv(f){var n=f.id,d=provD(n),enc=encodeURIComponent(n),pen=provSaldo(n);
 var hero='<div class="fihero"><span class="avt" style="background:#8D6E63;width:72px;height:72px;font-size:26px">'+esc(ini(n))+'</span><div><b style="font-size:19px">'+esc(n)+'</b><br><span class="lbl">'+esc(d.tipo||'')+'</span><div style="margin-top:8px">'+(pen>0.005?'<span class="pill warn">Se le debe '+money(pen)+'</span>':'<span class="pill">✓ Sin deuda</span>')+'</div></div>'+provBtns(n)+'</div>';
 var T=fiTabs(f,[['cta','Cuenta',pen>0.005],['dat','Datos'],['his','Historial']]),b='';
 if(T.cur==='cta')b=provDeudaHTML(n)+provEstadoHTML(n)+(num((S.tarasProv||{})[n])?'<div class="card">'+rw('Cajas tuyas que tiene',num(S.tarasProv[n]))+'</div>':'')+'<button class="btn sm sec" data-act="vwnew" data-n="'+enc+'">Nuevo viaje a este proveedor</button>';
 if(T.cur==='dat')b='<div class="card"><div class="lbl">Qué te vende</div><div class="chips" style="margin:4px 0 8px" role="group" aria-label="Qué vende">'+['Roatán','Macho','Ambos','Otros'].map(function(t){return '<button data-act="provtipo" data-n="'+enc+'" data-t="'+t+'" aria-pressed="'+(d.tipo===t)+'">'+t+'</button>'}).join('')+'</div>'+notasDe('prov:'+n)
   +(S.pvEdit===n?pvField(enc,'tel','Teléfono','tel',d.tel)+pvField(enc,'dir','Dirección','text',d.dir)+pvField(enc,'nota','Cómo llegar','text',d.nota||'')+lugFoto('p:'+enc,d.foto)+'<button class="btn sm" style="margin:6px 0" data-act="pvlisto">Guardar datos</button>':rw('Teléfono',d.tel?esc(d.tel):'sin registrar')+rw('Dirección',d.dir?esc(d.dir):'sin registrar')+rw('Cómo llegar',d.nota?esc(d.nota):'sin nota')+(d.foto?'<img src="'+d.foto+'" alt="Foto del lugar" style="width:100%;height:140px;object-fit:cover;border-radius:12px;margin-top:6px">':'')+'<button class="btn sm sec" style="margin:6px 0" data-act="pvedit" data-n="'+enc+'">Editar datos</button>')+'</div>';
 if(T.cur==='his')b='<div class="card">'+provHist(n)+(provD(n).tipo!=='Macho'?provKgCaja(n):'')+'</div>';
 return fiWrap(f,esc(n),esc(d.tipo||'Proveedor'),hero,T,b)}

/* ---- Carga: se reparte el detalle que ya existía en pestañas ---- */
function fiCarga(f){var c=cargaById(f.id),k=cC(c),sv=S.openCarga,html;S.openCarga=c.id;try{html=cargaCard(c)}finally{S.openCarga=sv}
 var box=document.createElement('div');box.innerHTML=html;var card=box.firstElementChild,head=card&&card.children[0],det=card&&card.children[1];
 var parts={res:[],det:[],pag:[],mas:[]},cur='res';
 if(det)Array.prototype.slice.call(det.children).forEach(function(el){var t=(el.textContent||'');
  if(el.matches('details[data-k^="det"]')){el.setAttribute('open','');parts.det.push(el.outerHTML);return}
  if(el.matches('details[data-k^="pg"]')||/Liquidación del viaje|Viaje liquidado/.test(t)){el.setAttribute('open','');parts.pag.push(el.outerHTML);return}
  if(/Agregar un gasto que se pasó/.test(t)&&el.classList.contains('lbl'))cur='mas';
  if(el.matches('details[data-k^="mh"]')||/Modificar datos y costos/.test(t)){parts.mas.push(el.outerHTML);return}
  parts[cur].push(el.outerHTML)});
 var T=fiTabs(f,[['res','Resumen'],['det','Detalle'],['pag','Pagos',k.pend>0.005],['mas','Más']]);
 var hero='<div class="fihero dban" style="text-align:left;align-items:stretch">'+(head?head.innerHTML.replace(/<span class="lbl">[−+]<\/span>/,''):'')+'</div>';
 var b=parts[T.cur].join('')||(T.cur==='pag'?'<div class="card"><b style="color:var(--accent)">✓ Pagada</b><div class="lbl">No le debes nada al proveedor por esta carga.</div></div>':'<div class="card lbl">Nada que mostrar aquí.</div>');
 return fiWrap(f,esc(c.prov),fmtF(c.fecha)+' · '+esc(frutaDe(c)),hero,T,'<div class="card" style="display:flex;flex-direction:column;gap:8px">'+b+'</div>')}

function fichaHTML(f){return f.t==='veh'?fiVeh(f):f.t==='emp'?fiEmp(f):f.t==='cli'?fiCli(f):f.t==='prov'?fiProv(f):fiCarga(f)}
var _fiOpen=null;
var FIK=['openCli','openCh','vehOpen','openProv','openCarga'];
var _rFi=render;render=function(){var f=fiCur(),sv={},ov=$('fiov'),sc=ov?ov.scrollTop:0,sg=ov?ov.getAttribute('data-fi'):null;
 if(f)FIK.forEach(function(k){sv[k]=S[k];S[k]=null});
 try{_rFi.apply(this,arguments)}finally{if(f)FIK.forEach(function(k){S[k]=sv[k]})}
 if(f){try{var w=document.createElement('div');w.innerHTML=fichaHTML(f);var el=w.firstElementChild;$('root').appendChild(el);if(sg&&el.getAttribute('data-fi')===sg)el.scrollTop=sc;
   else if(sg&&sg.split(':').slice(0,2).join(':')===String(el.getAttribute('data-fi')).split(':').slice(0,2).join(':')){/* misma ficha, otra pestaña: las pestañas se quedan arriba y la pestaña nueva se ve desde su inicio */
    var tb=el.querySelector('.fitabs'),lim=0;if(tb)lim=tb.offsetTop-(parseFloat(getComputedStyle(tb).top)||0);el.scrollTop=Math.min(sc,Math.max(0,lim))}
   var key=f.t+':'+f.id;if(_fiOpen!==key){if(!_fiOpen)try{history.pushState({fi:1},'')}catch(e){}_fiOpen=key}
   document.documentElement.classList.add('fi-on');try{fechaTxt(el);singTxt(el)}catch(e){}}catch(e){console.error(e)}}
 else{if(_fiOpen){_fiOpen=null}document.documentElement.classList.remove('fi-on')}};
function fiCerrar(){var f=fiCur();if(!f)return false;S[f.key]=null;if(f.t==='cli')S.cliEdit=null;if(f.t==='emp')S.chEdit=null;if(f.t==='prov')S.pvEdit=null;if(f.t==='veh')S.vbaja=null;render();return true}
document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act]');if(!b)return;var a=b.dataset.act,D=b.dataset;
 if(a==='fix'){e.stopImmediatePropagation();if(typeof borrSalir==='function'&&borrSalir('ficha',function(){fiCerrar()}))return;fiCerrar();return}
 if(a==='fitab'){e.stopImmediatePropagation();var f=fiCur();if(f){S.fiTab[f.t+':'+f.id]=D.v;render()}return}
 if(a==='pledo'||a==='pltipo'){e.stopImmediatePropagation();var v=S.veh.filter(function(x){return x.id===+D.id})[0];if(v){if(a==='pledo')v.plEdo=D.v;else v.plTipo=D.v;render()}return}
 /* abrir una ficha: siempre en su pantalla (se cierran las otras) */
 if(/^(opencli|opench|vehopen|openprov|opencarga)$/.test(a)&&!$('fiov')){var k={opencli:'openCli',opench:'openCh',vehopen:'vehOpen',openprov:'openProv',opencarga:'openCarga'}[a];['openCli','openCh','vehOpen','openProv','openCarga'].forEach(function(x){if(x!==k)S[x]=null});S.fiLast=k;
  if(S[k]!=null){S[k]=null}}},true);
window.addEventListener('popstate',function(){if($('fiov')){if(typeof borrSalir==='function'&&borrSalir('ficha',function(){fiCerrar()}))return;fiCerrar()}});
/* dentro de la ficha, deslizar cambia de pestaña */
(function(){var t0=null;function ini(x,y,el){t0=(el&&el.closest&&el.closest('#fiov')&&!el.closest('input,select,textarea,.fitabs,[data-sw2],[data-swipe],svg[data-gauge]'))?{x:x,y:y,t:Date.now()}:null}
 function fin(x,y){if(!t0)return;var dx=x-t0.x,dy=y-t0.y,dt=Date.now()-t0.t;t0=null;if(Math.abs(dx)<70||Math.abs(dy)>Math.abs(dx)*0.6||dt>900)return;var B=Array.prototype.slice.call(document.querySelectorAll('#fiov .fitabs button')),i=-1;B.forEach(function(b,k){if(b.getAttribute('aria-pressed')==='true')i=k});var j=i+(dx<0?1:-1);if(i>=0&&j>=0&&j<B.length)B[j].click()}
 document.addEventListener('touchstart',function(e){if(e.touches.length===1)ini(e.touches[0].clientX,e.touches[0].clientY,e.target)},{passive:true});
 document.addEventListener('touchend',function(e){var p=e.changedTouches[0];if(p)fin(p.clientX,p.clientY)},{passive:true});
 document.addEventListener('mousedown',function(e){if(window.__swMouse)ini(e.clientX,e.clientY,e.target)});document.addEventListener('mouseup',function(e){if(window.__swMouse)fin(e.clientX,e.clientY)})})();

/* al abrir la app, ninguna ficha abierta */
(function(){var cerrar=function(s){FIK.forEach(function(k){s[k]=null});return s};var _frFi=fresh;fresh=function(){return cerrar(_frFi.apply(this,arguments))};cerrar(S)})();
