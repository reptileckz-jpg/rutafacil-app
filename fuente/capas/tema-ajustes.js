/* ===================== TEMA · Ajustes y asistente de la primera vez (aplanado el 18 nov) =====================
   Antes estaba repartido en 44 envolturas encadenadas en l15, l16, l17, l18, l19, l20, l22, l23, l26, l30, l32, l35, l36, l38, l39, l40, l41, l42, l43, l44, l45, l46, l47, l48, l49, l50, l52, l57, l62, l63, l70, l72, l74, l76, l82.
   Aquí está todo junto, en el MISMO orden, y hace exactamente lo mismo (comprobado con pruebas/comp-ajustes.js).
   Se arma justo después de tema-inicio.js (antes de los otros temas).
   Si se cambia algo de Ajustes o del asistente, se cambia AQUÍ (no se agregan envolturas en capas nuevas).

   - ajHTML: la ventana de Ajustes (23 pasos). La versión base se rehízo completa en base-v38.html.
   - setupHTML: el asistente de la primera vez en la versión real: bodega, vehículos, personal, clientes, proveedores, dinero y precios (21 pasos).
   Los dos van intercalados en el orden en que se armaban.
   - suAplicar (al final, 4 más): lo que se capturó en el asistente pasa a la app (seguros, licencias, sueldos, horarios, ubicaciones, PIN del admin, número de cada vehículo).
   Las funciones que usan los pasos siguen en su capa.
   ============================================================================================ */

/* setupHTML · de l15 */
var _suH15=setupHTML;setupHTML=function(){var h=_suH15.apply(this,arguments);return h||npHTML()};

/* setupHTML · de l16 */
var _suH16=setupHTML;setupHTML=function(){var h=_suH16.apply(this,arguments);if(!h||h.indexOf('id="setov"')<0)return h;var U=S.setup,p=U.p;
 if(p===0){var k='a:'+S.adminYo;U.pinA=U.pinA==null?(S.pins[k]||''):U.pinA;
  var x='<div class="card"><b>Datos del negocio</b>'+suX('cfg.tel','Teléfono',S.cfg.tel,'tel')+suX('cfg.dir','Dirección',S.cfg.dir)+suX('cfg.rfc','RFC (si facturas)',S.cfg.rfc)+suX('cfg.correo','Correo',S.cfg.correo,'email')+'</div><div class="card"><b>Tu PIN para entrar</b><div class="lbl">Así nadie más entra como administrador. No uses 1234.</div>'+suPin('setup.pinA','PIN',U.pinA)+'</div>';
  var i=h.indexOf('<div class="card">');var j=i>-1?h.indexOf('</div>',h.indexOf('setup.yo',i)):-1;if(j>-1){j+=6;h=h.slice(0,j)+x+h.slice(j)}}
 if(p===2){var f=U.vf||{};h=h.replace('<button class="btn sec" style="margin-top:8px" data-act="suadd" data-k="veh">','<div class="lbl" style="margin-top:12px"><b>Seguro y papeles</b></div>'+suX('setup.vf.aseg','Aseguradora',f.aseg)+suX('setup.vf.segVence','El seguro vence',f.segVence,'date')+suX('setup.vf.tcVence','Tarjeta de circulación vence',f.tcVence,'date')+suX('setup.vf.verVence','Próxima verificación',f.verVence,'date')
  +'<div class="lbl" style="margin-top:12px"><b>Para sus cuentas</b></div>'+suX('setup.vf.capL','Tanque (litros)',f.capL,'number')+suX('setup.vf.acLast','Km del último cambio de aceite',f.acLast,'number')+SU_NOTA+'<button class="btn sec" style="margin-top:8px" data-act="suadd" data-k="veh">')}
 if(p===3){var e=U.ef||{},ch=(e.puesto||'chofer')==='chofer';h=h.replace('<button class="btn sec" style="margin-top:8px" data-act="suadd" data-k="per">',(ch?suX('setup.ef.licV','Su licencia vence',e.licV,'date'):'')+suX('setup.ef.sueldo','Sueldo por semana $',e.sueldo,'number')+suPin('setup.ef.pin','Su PIN (4 números)',e.pin)+SU_NOTA+'<button class="btn sec" style="margin-top:8px" data-act="suadd" data-k="per">')}
 if(p===4){var c=U.cf||{};h=h.replace(/(data-bind="setup\.cf\.n"[^>]*><\/div>)/,'$1'+suX('setup.cf.ap','Apodo o cómo le dicen',c.ap,'text','ej. la de la esquina verde'));h=h.replace('<button class="btn sec" style="margin-top:8px" data-act="suadd" data-k="cli">',suX('setup.cf.hAb','Abre a las',c.hAb,'time')+suX('setup.cf.hCi','Cierra a las',c.hCi,'time')+suX('setup.cf.recibe','¿Quién recibe?',c.recibe,'text','ej. Don Beto')+suX('setup.cf.lim','Límite de crédito $',c.lim,'number')+SU_NOTA+'<button class="btn sec" style="margin-top:8px" data-act="suadd" data-k="cli">')}
 if(p===5){var pf=U.pf||{};h=h.replace('<button class="btn sec" style="margin-top:8px" data-act="suadd" data-k="prov">',suX('setup.pf.dir','Dirección o lugar',pf.dir)+'<button class="btn sec" style="margin-top:8px" data-act="suadd" data-k="prov">')}
 return h};

/* setupHTML · de l16 */
var _suH16b=setupHTML;setupHTML=function(){var h=_suH16b.apply(this,arguments);return h||dfHTML()};

/* ajHTML · de l17 */
var _aj17=ajHTML;ajHTML=function(){var h=_aj17.apply(this,arguments);if(typeof REAL!=='undefined'&&REAL)return h.replace('>Agregar impresora (Bluetooth)</button>','>Agregar impresora (Bluetooth) · muy pronto</button>');return h.replace('<button class="btn sm sec" style="margin-top:8px" disabled>Agregar impresora (Bluetooth)</button>','<button class="btn sm '+(imprOk()?'':'sec')+'" style="margin-top:8px" data-act="imprdemo">'+(imprOk()?'✓ Impresora de prueba conectada':'Simular impresora conectada (demo)')+'</button>')};

/* ajHTML · de l18 */
var _aj18=ajHTML;ajHTML=function(){return _aj18.apply(this,arguments).replace(/(<label[^>]*>)Teléfono del negocio(<\/label>)/,'$1WhatsApp del negocio (sale en los tickets)$2')};

/* setupHTML · de l18 */
var _suH18=setupHTML;setupHTML=function(){var h=_suH18.apply(this,arguments);return h?h.replace('<label>Teléfono</label><input type="tel" data-bind="cfg.tel"','<label>WhatsApp del negocio (sale en los tickets)</label><input type="tel" data-bind="cfg.tel"'):h};

/* ajHTML · de l19 */
var _aj19=ajHTML;ajHTML=function(){var h=_aj19.apply(this,arguments);if(!h||h.indexOf('id="ajov"')<0||S.role!=='admin')return h;crCfg();var f=function(k,l){return '<div class="field"><label for="cfg_'+k+'">'+l+'</label><input id="cfg_'+k+'" type="number" inputmode="decimal" min="0" data-bind="cfg.'+k+'" value="'+esc(S.cfg[k])+'"></div>'};
 var x='<div class="card" data-key="ajcred"><b>Control de crédito y mayoreo</b>'+f('crCli','Máximo de crédito por cliente $')+f('crCh','Lo que pueden deber todos los clientes de un chofer $')
  +'<div class="lbl" style="margin-top:10px"><b>Buró: si tarda en pagar, baja su límite</b></div>'+f('bD1','Bueno: paga en máximo (días)')+f('bD2','Regular hasta (días)')+f('bL2','Límite de Regular $')+f('bD3','Malo hasta (días); después, bloqueado')+f('bL3','Límite de Malo $')
  +'<div class="lbl">Sube un nivel cuando liquida 3 veces a tiempo.</div><div class="lbl" style="margin-top:10px"><b>Mayoreo a mano</b></div>'+f('mayN','Veces que se permiten')+f('mayD','En cuántos días')+'<div class="lbl">Si se pasa, se bloquea el mayoreo de ese cliente hasta que lo revises.</div></div>';
 var i=h.indexOf('data-bind="cfg.cbBl"');if(i<0)i=h.indexOf('data-act="tutver"');var j=i>-1?h.lastIndexOf('<div class="card"',i):-1;if(j<0){var e=h.lastIndexOf('</div>');return h.slice(0,e)+x+h.slice(e)}return h.slice(0,j)+x+h.slice(j)};

/* ajHTML · de l20 */
var _aj20=ajHTML;ajHTML=function(){var h=_aj20.apply(this,arguments);crCfg2();return h.replace('<div class="lbl">Si se pasa, se bloquea el mayoreo de ese cliente hasta que lo revises.</div>','<div class="lbl">Si se pasa, se bloquea el mayoreo de ese cliente hasta que lo revises.</div><div class="field"><label for="cfg_mayBaja">Si un cliente de mayoreo baja su compra más de (%)</label><input id="cfg_mayBaja" type="number" inputmode="decimal" min="0" data-bind="cfg.mayBaja" value="'+esc(S.cfg.mayBaja)+'"></div><div class="lbl">…regresa a precio normal y te aviso.</div>')};

/* setupHTML · de l22 */
var _suH22=setupHTML;setupHTML=function(){var h=_suH22.apply(this,arguments);return h||usrHTML()};

/* setupHTML · de l22 */
var _suH22b=setupHTML;setupHTML=function(){var h=_suH22b.apply(this,arguments);if(!h||h.indexOf('id="setov"')<0||S.setup.p!==2)return h;var f=S.setup.vf||{};
 var x='<div class="lbl" style="margin-top:12px"><b>Datos del vehículo</b></div>'+VEH_X.filter(function(d){return ['marca','modelo','anio'].indexOf(d[0])<0}).map(function(d){return suX('setup.vf.'+d[0],d[1],f[d[0]],d[2],d[3])}).join('');
 return h.replace('<div class="lbl" style="margin-top:12px"><b>Seguro y papeles</b></div>',x+'<div class="lbl" style="margin-top:12px"><b>Seguro y papeles</b></div>')};

/* setupHTML · de l22 */
var _suH22c=setupHTML;setupHTML=function(){var h=_suH22c.apply(this,arguments);if(!h||h.indexOf('id="setov"')<0||S.setup.p!==1)return h;var i=h.indexOf('<div class="card"><b>Macho (kilos aproximados)</b>');if(i<0)return h;var j=h.indexOf('<div class="wz-nav"',i);if(j<0)j=h.indexOf('<button class="btn" data-act="sunext"',i);return j>-1?h.slice(0,j)+minCampos('su_')+h.slice(j):h};

/* ajHTML · de l22 */
var _aj22=ajHTML;ajHTML=function(){var h=_aj22.apply(this,arguments);if(!h||h.indexOf('id="ajov"')<0||S.role!=='admin')return h;var i=h.indexOf('<div class="card" data-key="ajcred">');return i>-1?h.slice(0,i)+minCampos('aj_')+h.slice(i):h};

/* setupHTML · de l23 */
var _suH23=setupHTML;setupHTML=function(){var h=_suH23.apply(this,arguments);return h||crHTML()};

/* setupHTML · de l26 */
var _suH26=setupHTML;setupHTML=function(){return ubHTML()||_suH26.apply(this,arguments)};

/* setupHTML · de l30 */
var _suH30=setupHTML;setupHTML=function(){var h=_suH30.apply(this,arguments);if(!h||h.indexOf('id="setov"')<0||!S.setup||S.setup.p!==2)return h;var f=S.setup.vf||{};
 return h.replace(/<div class="field"><label[^>]*>Nombre o modelo<\/label>[\s\S]*?<\/div>/,VEH_TRES('setup.vf.',f,function(k,l,t,ph){return suX('setup.vf.'+k,l,f[k],t,ph)})+'<div class="lbl" style="margin:-2px 0 6px">La tarjeta del vehículo se llama así: <b>'+esc(vehNomDe(f)||'Marca Modelo Año')+'</b></div>')};

/* setupHTML · de l32 */
var _suH32=setupHTML;setupHTML=function(){return fnHTML()||cxHTML()||_suH32.apply(this,arguments)};

/* ajHTML · de l35 */
var _aj35=ajHTML;ajHTML=function(){var h=_aj35.apply(this,arguments);if(!h||h.indexOf('id="ajov"')<0)return h;try{h=ajPliega(h,'ajcred','ajcredd','Crédito y mayoreo','límites, buró y mayoreo');h=ajPliega(h,'mincard','ajmind','Aviso de poca fruta','cuándo te aviso')}catch(e){}return h};

/* setupHTML · de l36 */
var _suH36=setupHTML;setupHTML=function(){var a=_suH36.apply(this,arguments);return a};

/* ajHTML · de l36 */
var _aj36=ajHTML;ajHTML=function(){var h=_aj36.apply(this,arguments);if(!h||h.indexOf('id="ajov"')<0||!bioPl())return h;var on=bioActiva();
 var c='<div class="card" data-key="huella"><b>Huella en este celular</b><div class="lbl">'+(on?'Entras con tu huella. El PIN sigue sirviendo.':'Entras con tu PIN.')+'</div><button class="btn sm sec" style="margin-top:8px" data-act="'+(on?'biooff':'bioon')+'">'+(on?'Quitar la huella':'Usar mi huella')+'</button></div>';
 var i=h.lastIndexOf('</div></div>');return i<0?h:h.slice(0,i)+c+h.slice(i)};

/* setupHTML · de l36 */
var _suH36b=setupHTML;setupHTML=function(){return bjHTML()||_suH36b.apply(this,arguments)};

/* ajHTML · de l38 */
var _aj38=ajHTML;ajHTML=function(){var h=_aj38.apply(this,arguments);if(!h||h.indexOf('id="ajov"')<0||S.role!=='admin'||S.encOn)return h;
 var c='<details class="card" data-k="ajresp"'+(S.dOpen.ajresp?' open':'')+'><summary><b>Respaldo y datos</b><span class="lbl">descargar respaldo, Excel, borrar pruebas</span></summary>'
  +'<div class="lbl" style="margin-top:6px">Todo se guarda en la nube al momento. El respaldo es una copia extra en tu celular (hazlo cada semana).'+(S.respUlt?' Último: '+fmtF(S.respUlt)+'.':'')+'</div>'
  +'<button class="btn sec" style="margin-top:8px" data-act="respbaja">Descargar respaldo</button><button class="btn sec" style="margin-top:8px" data-act="exportar">Exportar a Excel</button>'
  +'<div class="lbl" style="margin-top:12px"><b>Antes de empezar de verdad</b>: borra lo que capturaste para practicar (ventas, gastos, cargas, cierres). Se quedan clientes, proveedores, personal y vehículos.</div><button class="btn sec" style="margin-top:8px;color:var(--danger)" data-act="borrapr">Borrar datos de prueba</button></details>';
 var i=h.lastIndexOf('</div></div>');return i<0?h:h.slice(0,i)+c+h.slice(i)};

/* ajHTML · de l39 */
var _aj39=ajHTML;ajHTML=function(){var h=_aj39.apply(this,arguments);if(!h||h.indexOf('id="ajov"')<0)return h;var c=imprCardHTML();if(!c)return h;
 h=h.replace(/<button[^>]*data-act="imprdemo"[^>]*>[^<]*<\/button>/,'');var i=h.lastIndexOf('</div></div>');return i<0?h:h.slice(0,i)+c+h.slice(i)};

/* setupHTML · de l40 */
var _suH40=setupHTML;setupHTML=function(){return pasaRutaHTML()||_suH40.apply(this,arguments)};

/* ajHTML · de l41 */
var _aj41=ajHTML;ajHTML=function(){var h=_aj41.apply(this,arguments);if(!h||h.indexOf('id="ajov"')<0||S.role!=='admin'||S.encOn)return h;
 var c='<details class="card" data-k="ajtarj"'+(S.dOpen.ajtarj?' open':'')+'><summary><b>Pagos con tarjeta</b><span class="lbl">comisión '+tarjPct()+'% · '+(comCobra()?'la paga el cliente':'la absorbe el negocio')+'</span></summary>'
  +'<div class="field"><label for="cfg_comPct">Comisión de la terminal (con IVA) %</label><input id="cfg_comPct" type="number" inputmode="decimal" step="any" data-bind="cfg.comPct" value="'+esc(S.cfg.comPct==null?'4.06':S.cfg.comPct)+'"></div>'
  +'<div class="chips" role="group" aria-label="Quién paga la comisión" style="margin:8px 0"><button data-act="comcobra" data-v="0" aria-pressed="'+!comCobra()+'">La absorbe el negocio</button><button data-act="comcobra" data-v="1" aria-pressed="'+comCobra()+'">Se le cobra al cliente</button></div>'
  +'<div class="lbl">'+(comCobra()?'Al cliente se le cobra '+(100*tarjPct()/(100-tarjPct())).toFixed(2)+'% más para que llegue completo.':'La comisión entra como gasto y baja la ganancia.')+'</div></details>';
 var i=h.lastIndexOf('</div></div>');return i<0?h:h.slice(0,i)+c+h.slice(i)};

/* setupHTML · de l42 */
var _suH42=setupHTML;setupHTML=function(){return svHTML()||_suH42.apply(this,arguments)};

/* ajHTML · de l43 */
var _aj43=ajHTML;ajHTML=function(){var h=_aj43.apply(this,arguments);if(!h||h.indexOf('id="ajov"')<0)return h;return h.replace('data-act="tutver">Ver el tutorial otra vez</button>','data-act="tutver">Ver el tutorial otra vez</button><button class="btn sec" style="margin-top:8px" data-act="tutdias">'+(S.tutDiasOff?'Volver a prender los consejos de cada día':'Apagar los consejos de cada día')+'</button>'+(S.aprendeOff?'<button class="btn sec" style="margin-top:8px" data-act="aprendeon">Mostrar "Aprende la app"</button>':''))};

/* ajHTML · de l44 */
var _aj44=ajHTML;ajHTML=function(){var h=_aj44.apply(this,arguments);if(!h||h.indexOf('id="ajov"')<0||S.role!=='admin'||S.encOn)return h;
 var c='<details class="card" data-k="ajqr"'+(S.dOpen.ajqr?' open':'')+'><summary><b>QR de clientes</b><span class="lbl">'+(qrOn()?'prendido':'apagado')+'</span></summary><div class="lbl" style="margin-top:6px">Cada cliente tiene un código QR para pegar en su local. El chofer lo escanea y se abre su entrega. Es solo un atajo.</div><div class="chips" role="group" aria-label="QR de clientes" style="margin:8px 0"><button data-act="qron" data-v="1" aria-pressed="'+qrOn()+'">Usar QR de clientes</button><button data-act="qron" data-v="0" aria-pressed="'+!qrOn()+'">No usar</button></div></details>';
 var i=h.lastIndexOf('</div></div>');return i<0?h:h.slice(0,i)+c+h.slice(i)};

/* setupHTML · de l44 */
var _suH44=setupHTML;setupHTML=function(){return mjHTML()||pwHTML()||_suH44.apply(this,arguments)};

/* ajHTML · de l45 */
var _aj45=ajHTML;ajHTML=function(){var h=_aj45.apply(this,arguments);if(!h||h.indexOf('id="ajov"')<0||S.role!=='admin'||S.encOn)return h;
 var c='<details class="card" data-k="ajextra"'+(S.dOpen.ajextra?' open':'')+'><summary><b>Carga extra sugerida</b><span class="lbl">por si sale otro pedido</span></summary><div class="lbl" style="margin-top:6px">Cuando un chofer regresa a cargar por un pedido, la app le sugiere llevar además al menos esto (o lo que normalmente vende por cliente, lo que sea mayor).</div>'
  +'<div class="field"><label for="cfg_extraR">Cajas de roatán extra</label><input id="cfg_extraR" type="number" inputmode="numeric" data-bind="cfg.extraR" value="'+esc(S.cfg.extraR==null?'3':S.cfg.extraR)+'"></div><div class="field"><label for="cfg_extraM">Kilos de macho extra</label><input id="cfg_extraM" type="number" inputmode="decimal" data-bind="cfg.extraM" value="'+esc(S.cfg.extraM==null?'20':S.cfg.extraM)+'"></div></details>';
 var i=h.lastIndexOf('</div></div>');return i<0?h:h.slice(0,i)+c+h.slice(i)};

/* setupHTML · de l46 */
var _suH46=setupHTML;setupHTML=function(){var h=_suH46.apply(this,arguments);return h?tarjetear(h,'[role="dialog"] > .w, [role="dialog"] > .fiw, .vwbody, .vwsec'):h};

/* setupHTML · de l47 */
var _suH47=setupHTML;setupHTML=function(){return wzHTML()||_suH47.apply(this,arguments)};

/* setupHTML · de l48 */
var _suH48=setupHTML;setupHTML=function(){return permHTML()||_suH48.apply(this,arguments)};

/* ajHTML · de l49 */
var _aj49=ajHTML;ajHTML=function(){var h=_aj49.apply(this,arguments);if(!h||h.indexOf('id="ajov"')<0||S.role!=='admin'||S.encOn)return h;var c=celCardHTML();if(!c)return h;var i=h.lastIndexOf('</div></div>');return i<0?h:h.slice(0,i)+c+h.slice(i)};

/* setupHTML · de l50 */
var _suH50=setupHTML;setupHTML=function(){return rcHTML()||eqOvHTML()||_suH50.apply(this,arguments)};

/* ajHTML · de l52 */
var _aj52=ajHTML;ajHTML=function(){var h=_aj52.apply(this,arguments);if(!h||h.indexOf('id="ajov"')<0||S.role!=='admin'||S.encOn)return h;var M=gpsCfgMin();
 var c='<details class="card" data-k="ajgps"'+(S.dOpen.ajgps?' open':'')+'><summary><b>Ubicación de los celulares</b><span class="lbl">avisos si dejan de mandar</span></summary>'
  +'<div class="field"><label for="gpsa1">Aviso si no manda en (min)</label><input id="gpsa1" type="number" inputmode="numeric" data-gpscfg="gpsA1" value="'+M.a+'" style="width:90px"></div>'
  +'<div class="field"><label for="gpsa2">Aviso URGENTE en (min)</label><input id="gpsa2" type="number" inputmode="numeric" data-gpscfg="gpsA2" value="'+M.b+'" style="width:90px"></div>'
  +'<div class="lbl">En ruta manda cada 30 segundos; fuera del horario, cada 5 minutos. También avisa si apagan el celular, la ubicación o cierran la sesión con la ruta abierta.</div></details>';
 var i=h.lastIndexOf('</div></div>');return i<0?h:h.slice(0,i)+c+h.slice(i)};

/* ajHTML · de l57 */
var _aj57=ajHTML;ajHTML=function(){var h=_aj57.apply(this,arguments);if(!h||h.indexOf('id="ajov"')<0||!gmHay())return h;var no=false;try{no=localStorage.getItem('gmapsNo')==='1'}catch(e){}
 var c='<div class="card"><div class="row"><span><b>Mapas de Google</b><br><span class="lbl">Si algún mapa se ve mal en este celular, apágalo y se usa el mapa de antes.</span></span><button class="btn sm'+(no?' sec':'')+'" style="width:auto" data-act="gmswitch">'+(no?'No':'Sí')+'</button></div></div>';
 var i=h.lastIndexOf('</div></div>');return i<0?h:h.slice(0,i)+c+h.slice(i)};

/* ajHTML · de l62 */
var _aj62=ajHTML;ajHTML=function(){var h=_aj62.apply(this,arguments);if(!h||h.indexOf('id="ajov"')<0||!(S.role==='admin'&&!S.encOn))return h;var b=bodPrincipal();if(!b)return h;
 var c='<div class="card"><div class="row"><span><b>Ubicación de la bodega</b><br><span class="lbl">'+esc(b.n)+(b.lat!=null?' · guardada':' · Banderilla (la de inicio)')+'. La usan los mapas, los km y las rutas.</span></span><button class="btn sm sec" style="width:auto" data-act="bodloc" data-id="'+b.id+'">Cambiar</button></div></div>';var i=h.lastIndexOf('</div></div>');return i<0?h:h.slice(0,i)+c+h.slice(i)};

/* ajHTML · de l63 */
var _aj63=ajHTML;ajHTML=function(){var h=_aj63.apply(this,arguments);if(!h||h.indexOf('id="ajov"')<0||!(S.role==='admin'&&!S.encOn))return h;var u=respUlt(),dn='';try{dn=localStorage.getItem('respDonde')||''}catch(e){}
 var c='<div class="card" data-key="respauto"><b>Respaldo automático</b><div class="lbl">Cada día, la primera vez que abres la app, se guarda una copia en este celular (se quedan los últimos 30 días).</div>'
  +rw('Último',u?fmtF(u):'todavía no')+(dn?rw('Dónde',esc(dn)):'')
  +'<div style="display:flex;gap:8px;margin-top:8px"><button class="btn sm" style="flex:1" data-act="resphaz">Respaldar ahora</button><label class="btn sm sec" style="flex:1;display:flex;align-items:center;justify-content:center;cursor:pointer" for="respin">Restaurar</label></div><input id="respin" type="file" accept=".json,application/json" style="position:absolute;opacity:0;width:1px;height:1px"></div>';
 var i=h.lastIndexOf('</div></div>');return i<0?h:h.slice(0,i)+c+h.slice(i)};

/* ajHTML · de l70 */
var _aj70=ajHTML;ajHTML=function(){var h=_aj70.apply(this,arguments);if(!h||h.indexOf('id="ajov"')<0||S.role!=='admin'||S.encOn)return h;var i=h.lastIndexOf('</div></div>');return i<0?h:h.slice(0,i)+pr56Card()+h.slice(i)};

/* setupHTML · de l70 */
var _suH70=setupHTML;setupHTML=function(){var h=_suH70.apply(this,arguments);try{if(!h||h.indexOf('id="setov"')<0||!S.setup||S.setup.p!==1)return h;var b=bodPrincipal(),ok=b&&b.lat!=null;
  var c='<div class="card" style="border:2px solid '+(ok?'var(--accent)':'var(--danger)')+'"><b style="font-size:18px">📍 Ubicación de la bodega</b><div class="lbl">'+(ok?'Guardada: '+b.lat+', '+b.lng:'Falta. Los mapas, los kilómetros y las rutas salen de aquí.')+'</div><button class="btn" style="margin-top:8px;min-height:56px;width:100%" data-act="ub68" data-t="bod">'+(ok?'Cambiar la ubicación':'Poner la ubicación de la bodega')+'</button></div>';
  var i=h.indexOf('<div class="card">');return i>-1?h.slice(0,i)+c+h.slice(i):h}catch(e){return h}};

/* ajHTML · de l72 */
var _aj72=ajHTML;ajHTML=function(){var h=_aj72.apply(this,arguments);if(!h||h.indexOf('id="ajov"')<0||S.role!=='admin'||S.encOn)return h;var T=tarCfg72();
 var c='<details class="card" data-k="aj72tar"'+(S.dOpen.aj72tar?' open':'')+'><summary><b>🧺 Buró de taras</b><span class="lbl">días y descuento al chofer</span></summary><div class="lbl" style="margin-top:6px">Usa los mismos días del buró de crédito: aviso al chofer a los '+T.d1+' días, al administrador a los '+T.d2+' y descuento del sueldo del chofer a los '+T.d3+' (a mitad de precio las que el cliente pagó).</div>'
  +'<div class="field"><label for="tarCob108">Días para cobrarle las taras al cliente</label><input id="tarCob108" type="number" inputmode="numeric" step="1" min="1" data-bind="cfg.tarCob108" value="'+esc(S.cfg.tarCob108==null?'25':S.cfg.tarCob108)+'"></div>'
  +'<div class="field"><label for="tarCh116">Cajas vacías que pueden deber todos los clientes de un chofer</label><input id="tarCh116" type="number" inputmode="numeric" step="1" min="0" data-bind="cfg.tarCh116" value="'+esc(S.cfg.tarCh116==null?'20':S.cfg.tarCh116)+'"></div><div class="lbl">Vacío = sin tope.</div>'
  +'<div class="field"><label for="taraDesc">Descuento por cada tara $</label><input id="taraDesc" type="number" inputmode="decimal" step="any" min="0" data-bind="cfg.taraDesc" value="'+esc(S.cfg.taraDesc==null?String(T.pr):S.cfg.taraDesc)+'"></div></details>';
 var i=h.lastIndexOf('</div></div>');return i<0?h:h.slice(0,i)+c+h.slice(i)};

/* ajHTML · de l74 */
var _aj74=ajHTML;ajHTML=function(){var h=_aj74.apply(this,arguments);if(!h||h.indexOf('id="ajov"')<0||S.role!=='admin'||S.encOn)return h;
 var c='<details class="card" data-k="aj74rep"'+(S.dOpen.aj74rep?' open':'')+'><summary><b>🚚 Costo de repartir (mientras no hay rutas)</b><span class="lbl">para el precio sugerido</span></summary><div class="lbl" style="margin-top:6px">Mientras no haya rutas cerradas, el costo de repartir se estima con el desgaste de la camioneta. Al cerrar rutas se usa lo real.</div>'
  +'<div class="field"><label for="kmRuta">Kilómetros de una ruta normal</label><input id="kmRuta" type="number" inputmode="decimal" data-bind="cfg.kmRuta" value="'+esc(S.cfg.kmRuta||'')+'" placeholder="40"></div><div class="field"><label for="cajRuta">Cajas de roatán en una ruta</label><input id="cajRuta" type="number" inputmode="decimal" data-bind="cfg.cajRuta" value="'+esc(S.cfg.cajRuta||'')+'" placeholder="40"></div><div class="field"><label for="kgRuta">Kilos de macho en una ruta</label><input id="kgRuta" type="number" inputmode="decimal" data-bind="cfg.kgRuta" value="'+esc(S.cfg.kgRuta||'')+'" placeholder="150"></div></details>';
 var i=h.lastIndexOf('</div></div>');return i<0?h:h.slice(0,i)+c+h.slice(i)};

/* ajHTML · de l76 */
var _aj76=ajHTML;ajHTML=function(){var h=_aj76.apply(this,arguments);if(!h||h.indexOf('id="ajov"')<0||S.role!=='admin'||S.encOn)return h;var i=h.lastIndexOf('</div></div>');return i<0?h:h.slice(0,i)+facAj76()+h.slice(i)};

/* ajHTML · de l82 */
var _ajP82=ajHTML;ajHTML=function(){var h=_ajP82.apply(this,arguments);if(!h||h.indexOf('id="ajov"')<0||S.role!=='admin'||S.encOn)return h;
 var c='<details class="card" data-k="ajped82"'+(S.dOpen.ajped82?' open':'')+'><summary><b>Pedidos tarde</b><span class="lbl">hasta qué hora se mandan hoy</span></summary><div class="lbl" style="margin-top:6px">Si un chofer ya mandó su cierre y le asignas un pedido para hoy antes de esta hora, se le pregunta si puede llevarlo. Después de esta hora (y siempre después de las 7:30 pm) el pedido pasa a mañana.</div><div class="field"><label for="cfg_hPed82">Hora límite</label><input id="cfg_hPed82" type="time" data-bind="cfg.hPed82" value="'+esc(S.cfg.hPed82||'17:00')+'" max="19:30"></div></details>';
 var i=h.lastIndexOf('</div></div>');return i<0?h:h.slice(0,i)+c+h.slice(i)};

/* ---------- suAplicar: lo que se captura en el asistente de la primera vez pasa a la app (aplanado el 18 nov; antes en l16, l22, l75, l90, en el mismo orden) ---------- */
/* suAplicar · de l16 */
var _suAp16=suAplicar;suAplicar=function(){var U=S.setup,nC0=S.choferes.length,nCl0=S.cli.length;var r=_suAp16.apply(this,arguments);
 try{U.veh.forEach(function(v,i){var o=S.veh[i];if(!o)return;['aseg','segVence','tcVence','verVence'].forEach(function(k){if(v[k])o[k]=v[k]});if(num(v.capL)>0)o.capL=num(v.capL);if(num(v.acLast)>0)o.acLast=num(v.acLast)});
  var emps=S.choferes.slice(nC0);U.per.forEach(function(x,i){var c=emps[i];if(!c)return;if(x.licV)c.licV=x.licV;if(num(x.sueldo)>0)c.sz.monto=String(num(x.sueldo));if(/^\d{4}$/.test(String(x.pin||''))&&x.pin!=='1234')S.pins['c:'+c.id]=String(x.pin)});
  var cls=S.cli.slice(nCl0);U.cli.forEach(function(x,i){var c=cls[i];if(!c)return;['ap','hAb','hCi','recibe'].forEach(function(k){if(x[k])c[k]=x[k]});if(num(x.lim)>0){c.lim=num(x.lim);c.limMan=num(x.lim)}});
  U.prov.forEach(function(x){if(x.dir)provD(x.n).dir=x.dir});
  if(/^\d{4}$/.test(String(U.pinA||''))&&U.pinA!=='1234')S.pins['a:'+S.adminYo]=String(U.pinA)}catch(e){console.error(e)}
 return r};

/* suAplicar · de l22 */
var _suAp22=suAplicar;suAplicar=function(){var U=S.setup,r=_suAp22.apply(this,arguments);try{U.veh.forEach(function(v,i){var o=S.veh[i];if(!o)return;['marca','modelo','color','vin','motor','llanta'].forEach(function(k){if(v[k])o[k]=String(v[k]).trim()});if(v.anio)o.anio=String(v.anio);if(num(v.capC)>0)o.capC=num(v.capC);if(num(v.capK)>0)o.capK=num(v.capK)})}catch(e){}return r};

/* suAplicar · de l75 */
var _suA75=suAplicar;suAplicar=function(){var U=S.setup,ev=(U.veh||[]).map(function(v){return v.ex75||null}),ec=(U.cli||[]).map(function(c){return [c.n,c.ex75||null]}),ep=(U.prov||[]).map(function(p){return [p.n,p.ex75||null]});var r=_suA75.apply(this,arguments);
 try{ev.forEach(function(x,i){var v=S.veh[i];if(!x||!v)return;Object.keys(x).forEach(function(k){if(x[k]!==undefined&&x[k]!=='')v[k]=x[k]});if(x.acLast!=null)v.acLast=num(x.acLast);if(x.acInt)v.acInt=num(x.acInt);if(x.capC){v.capC=num(x.capC);v.capRC=num(x.capC)}});
  ec.forEach(function(x){if(!x[1])return;var c=S.cli.filter(function(z){return z.n===x[0]})[0];if(!c)return;if(x[1].lat!=null&&x[1].lat!==''){c.lat=+x[1].lat;c.lng=+x[1].lng}if(x[1].hAb){c.hAb=x[1].hAb;c.hCi=x[1].hCi}});
  ep.forEach(function(x){if(!x[1])return;var d=provD(x[0]);if(x[1].lat!=null&&x[1].lat!==''){d.lat=+x[1].lat;d.lng=+x[1].lng}})}catch(e){console.error('suA75',e)}return r};

/* suAplicar · de l90 */
var _suA90=suAplicar;suAplicar=function(){var r=_suA90.apply(this,arguments);try{var V=S.veh||[],vis={},mx=0;V.forEach(function(v,i){if(vis[v.id]||!(v.id>0))v.id=Math.max(mx,0)+1;vis[v.id]=1;mx=Math.max(mx,v.id)});if(V[0])S.vehHoy=V[0].id}catch(e){}return r};

/* ---------- 139 · Ajustes → "📷 Fotos del vehículo": la foto del tablero de gasolina obligatoria u opcional (por defecto obligatoria) ---------- */
var _aj139=ajHTML;ajHTML=function(){var h=_aj139.apply(this,arguments);try{if(!h||S.role!=='admin'||S.encOn)return h;var ob=(S.cfg||{}).fotoGas!=='opc';
 var x='<details class="card" data-k="aj139"'+(S.dOpen&&S.dOpen.aj139?' open':'')+'><summary><b>📷 Fotos del vehículo</b><span class="lbl">gasolina: '+(ob?'obligatoria':'opcional')+'</span></summary>'
  +'<div class="lbl" style="margin-top:6px">La foto del tablero de gasolina al salir y al regresar. Sirve para llevar bien el control del combustible: con el puro marcador de la app es fácil equivocarse.</div>'
  +'<div class="chips" role="group" aria-label="Foto de la gasolina" style="margin-top:8px"><button data-act="fotogas139" data-v="obl" aria-pressed="'+ob+'">Obligatoria</button><button data-act="fotogas139" data-v="opc" aria-pressed="'+!ob+'">Opcional</button></div></details>';
 var i=h.lastIndexOf('</div></div>');return i>-1?h.slice(0,i)+x+h.slice(i):h+x}catch(e){return h}};
document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act="fotogas139"]');if(!b)return;e.stopImmediatePropagation();S.cfg=S.cfg||{};S.cfg.fotoGas=b.dataset.v==='opc'?'opc':'';
 S.hist.push({t:fmtF(iso(TODAY))+' '+hhmm(),q:quien(),x:'La foto del tablero de gasolina ahora es '+(S.cfg.fotoGas==='opc'?'opcional':'obligatoria')});toast(S.cfg.fotoGas==='opc'?'La foto de la gasolina es opcional':'La foto de la gasolina es obligatoria');render()},true);
