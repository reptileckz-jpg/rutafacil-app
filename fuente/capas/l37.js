/* ===================== v6.2 · Avisos: cada uno te lleva a donde se atiende · ventana de urgentes "1 de N" ===================== */
(function(){var st=document.createElement('style');st.textContent=[
 '@keyframes avFoco{0%,100%{box-shadow:0 0 0 0 rgba(0,0,0,0)}30%,70%{box-shadow:0 0 0 4px var(--accent)}}',
 '.avfoco{animation:avFoco 1.6s ease 2;border-radius:12px}'].join('\n');document.head.appendChild(st)})();
function avChofDe(x){return S.choferes.filter(function(c){var n=chofN(c.id);return n&&new RegExp('(^|[^A-Za-zÁÉÍÓÚáéíóúñÑ])'+reEsc(n)+'([^A-Za-zÁÉÍÓÚáéíóúñÑ]|$)').test(x)})[0]||null}
/* a dónde lleva cada aviso y qué resalta al llegar */
var _avD37=avDestino;avDestino=function(x){var r=_avD37.apply(this,arguments)||{t:'inicio',cli:null},ch=avChofDe(x),pk=typeof avPinK==='function'?avPinK(x):null;r.sel=null;
 if(pk||/PIN de /.test(x)){var id=pk&&/^c:/.test(pk)?+pk.slice(2):(ch?ch.id:null);r.t='personal';r.cli=null;if(id){S.openCh=id;S.fiTab['emp:'+id]='dat'}r.sel='[data-act="pinreset"]';return r}
 if(/pide reabrir su ruta/.test(x)){r.t='inicio';r.cli=null;r.sel='[data-act="reabsi"]';return r}
 if(/no envió su cierre|segundo cierre|reabrió su (cierre|ruta)|Cierre con faltante|no se contaron las cajas/i.test(x)){r.t='cierreadm';r.cli=null;if(ch&&+S.chofHoy!==+ch.id)try{chCambiar(+ch.id)}catch(e){}return r}
 if(/SIN ticket: .*(L por|combustible)|cargó combustible SIN ticket/.test(x)||/registró un gasto/.test(x)){r.t='gastos';r.cli=null;return r}
 if(/báscula|Báscula/.test(x)){r.t='cargas';r.cli=null;return r}
 if(/DEF|Consumo alto|Problema en el viaje|cajas vacías se quedaron|lleva \d+ cajas vacías|Pagar a |roatán de .* vino bajo/.test(x)){r.t='cargas';r.cli=null;return r}
 if(/Salió con una falla|no puede salir|hizo el encargo|no pudo hacer el encargo/.test(x)){r.t='vehiculos';r.cli=null;var vh=S.veh.filter(function(v){return !v.baja&&x.indexOf(v.n)>-1})[0];if(vh)S.vehOpen=vh.id;return r}
 if(/Pedido para|registró un pedido/.test(x)){r.t='inicio';r.cli=null;r.sel='.pedcard,[data-key="pedidos"]';return r}
 if(/no tomó la foto|anuló|corrigió la entrega|pidió corregir|canceló la entrega|cambió fruta|está ayudando|cargó .* más en bodega|Reporte de/.test(x)&&ch){r.t='personal';r.cli=null;S.openCh=ch.id;S.fiTab['emp:'+ch.id]='ruta';return r}
 if(/Revisa el número|agregó el teléfono|dio de alta un cliente|Cliente nuevo|guardó la ubicación|no pudo guardar la ubicación|cerró el negocio|le compró a otro proveedor|pasó su límite|Mayoreo por debajo|mayoreo .* veces|ya lleva 5 compras|bajó su consumo|pide permiso (de mayoreo|para fiarle)|quedó con deuda/.test(x)){
  var c=null;S.cli.forEach(function(k){if(!k.oculto&&k.n&&x.indexOf(k.n)>-1&&(!c||k.n.length>c.n.length))c=k});if(c){r.t='clientes';r.cli=c.id;S.fiTab=S.fiTab||{};if(/número|teléfono|ubicación|dio de alta|Cliente nuevo/.test(x))S.fiTab['cli:'+c.id]='dat';return r}}
 if(r.t==='inicio'&&ch&&!esAdm(ch)){r.t='personal';S.openCh=ch.id}
 return r};
/* al llegar: baja hasta el lugar y lo resalta */
function avFoco(sel){if(!sel)return;var n=0,f=function(){var el=document.querySelector(sel);if(!el){if(++n<8)setTimeout(f,120);return}var c=el.closest('.card')||el;try{c.scrollIntoView({block:'center',behavior:'smooth'})}catch(e){}c.classList.remove('avfoco');void c.offsetWidth;c.classList.add('avfoco');setTimeout(function(){c.classList.remove('avfoco')},3400)};setTimeout(f,150)}
window.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act="avgo"]');if(!b||e.target.closest('[data-act="avpos"],[data-act="atiende"]'))return;e.stopImmediatePropagation();
 if(b.dataset.pop)try{popSig()}catch(er){}var x=decodeURIComponent(b.dataset.k||''),d=avDestino(x);S.menu=false;S.tab[S.role]=d.t;if(d.cli)S.openCli=d.cli;render();if(d.sel)avFoco(d.sel);else window.scrollTo(0,0)},true);
/* ventana de urgentes al abrir la app (una vez al día): ahora también trae los avisos URGENTES, uno por uno */
var _popI37=popItems;popItems=function(){var L=_popI37.apply(this,arguments);if(S.role!=='admin'||S.encOn)return L;try{var ya=L.map(function(x){return x.t+' '+x.m}).join(' | ');
 avisos().filter(function(x){return AV_URG.test(x)}).forEach(function(x){var t=x.replace(/^URGENTE:\s*/,'').replace(/\s*\[pin:[^\]]+\]/,'');if(ya.indexOf(t.slice(0,30))>-1)return;
  L.push({t:'Atiende esto',m:esc(t),b:[['Ir a atenderlo','avgo',' data-k="'+encodeURIComponent(x)+'"']]})})}catch(e){}return L};
/* el texto del aviso no enseña la marca [pin:…] */
var _avRow37=avRow;avRow=function(x,u){return _avRow37.apply(this,arguments).replace(/\s*\[pin:[^\]]+\]/,'')};
/* al reiniciar el PIN, se quita la petición y su aviso */
window.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act="pinreset"]');if(!b)return;var k=b.dataset.k;if(S.pinPide)delete S.pinPide[k];if(S.pinPista)delete S.pinPista[k];S.avPrecio=(S.avPrecio||[]).filter(function(x){return x.indexOf('[pin:'+k+']')<0})},true);
