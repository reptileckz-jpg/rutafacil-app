/* ===================== TEMA · El cobro en la entrega (nació como tema, 17 nov · punto 115) =====================
   Ricardo mandó un diseño de cobro; se tomó lo bueno con nuestros textos, letra grande y reglas:
   - La barra de abajo dice "A cobrar" (lo de esta entrega + el abono), "Queda debiendo $X" o "Queda al corriente";
     al tocarla se abre el desglose renglón por renglón.
   - "¿Con cuánto te pagó?": los billetes se sugieren según lo que hay que cobrar (además de "Exacto").
   - "Esta entrega" y "Lo que ya debía" separados; el abono con botones rápidos: $0, la mitad, liquidar.
   - El buró se ve solo al fiar (una parte o a crédito).
   - Cajas vacías con el saldo en vivo: ya debía · le dejas · devuelve → queda debiendo / al corriente.
   La plantilla de la entrega está en la base (ql.py). Si se cambia algo de esto, se cambia AQUÍ y en esas líneas de ql.py.
   ============================================================================================ */
function cobro115(k){k=k||entregaCalc();return r2(num(k.pago)+num(k.abono))}
/* billetes sugeridos: el siguiente cien, el siguiente quinientos y el siguiente mil arriba de lo que hay que cobrar */
function bill115(t){t=Math.round(num(t));if(!(t>0))return [200,500,1000];var L=[],pon=function(v){if(v>t&&L.indexOf(v)<0)L.push(v)};
 pon(Math.ceil((t+1)/100)*100);pon(Math.ceil((t+1)/500)*500);pon(Math.ceil((t+1)/1000)*1000);pon(Math.ceil((t+1)/1000)*1000+1000);pon(Math.ceil((t+1)/1000)*1000+2000);
 return L.sort(function(a,b){return a-b}).slice(0,3)}
/* la barra de abajo */
function entBar115(){var k=entregaCalc();if(!k||!k.c)return '<span><span class="lbl">A cobrar</span><br><b style="font-size:24px">$0</b></span>';var cob=cobro115(k),d=S.d||{},fo={efe:' en efectivo',tarj:' con tarjeta',trans:' por transferencia',mixto:' (mixto)'}[d.forma||'efe']||'';
 return '<span data-act="entdesg" role="button" tabindex="0" aria-label="Ver el desglose" style="cursor:pointer;min-width:0"><span class="lbl">'+(cob>0?'A cobrar'+fo:'Sin cobro en esta visita')+' '+(d._desg115?'▾':'▴')+'</span><br><b style="font-size:26px;color:var(--accent)">'+money(cob)+'</b><br>'
  +(k.deuda>0.005?'<span class="neg" style="font-weight:800;font-size:14px">Queda debiendo '+money(k.deuda)+'</span>':'<span style="font-weight:800;font-size:14px;color:var(--accent)">Queda al corriente</span>')+'</span>'}
/* el desglose (arriba de la barra) */
function entDesg115(){var k=entregaCalc(),d=S.d||{};if(!k||!k.c||!d._desg115)return '';var cr0=num(k.c.cred);
 return '<div class="card" style="padding:12px 14px;margin-bottom:8px;border:2px solid var(--accent)"><b style="font-size:17px">Desglose</b>'
  +rw('Esta entrega',money(k.total))+rw('Paga de esta entrega',money(k.pago))+(cr0>0.005?rw('Abono a lo que ya debía','+ '+money(k.abono)):'')
  +'<div class="row" style="min-height:52px"><b>Total a cobrar</b><b style="font-size:20px;color:var(--accent)">'+money(cobro115(k))+'</b></div>'
  +rw('Su deuda queda en',money(Math.max(0,k.deuda)),k.deuda>0.005?'neg':'')+'</div>'}
/* "Lo que ya debía": botones rápidos del abono */
function abonoBtns115(c){var cr=num(c&&c.cred);if(!(cr>0.005))return '';var mi=Math.round(cr/2),d=S.d||{},ab=num(d.abono);
 return '<div class="chips" role="group" aria-label="Abono rápido" style="margin:6px 0">'+[['0','$0'],[String(mi),'La mitad ('+money(mi)+')'],[String(r2(cr)),'Liquidar ('+money(cr)+')']].map(function(x){return '<button data-act="abono115" data-v="'+x[0]+'" aria-pressed="'+(Math.abs(ab-num(x[0]))<0.005&&(d.abono!==''||x[0]==='0'))+'" style="min-height:52px">'+x[1]+'</button>'}).join('')+'</div>'}
/* cajas vacías: el saldo en vivo */
function vacSaldo115(c,d,k){if(!c||c.oculto)return '';var ya=num(c.vac),R=num(d&&d.R),V=num(d&&d.V),q=Math.max(0,ya+R-V);if(!(ya>0||R>0||V>0))return '';
 return '<div id="vac115" style="margin-top:8px;padding:10px 12px;border-radius:12px;background:'+(q>0?'color-mix(in srgb,#D97706 12%,var(--surface))':'color-mix(in srgb,var(--accent) 12%,var(--surface))')+';font-size:16px">Ya debía <b>'+ya+'</b> · le dejas <b>'+R+'</b> · devuelve <b>'+V+'</b><br><b style="font-size:17px'+(q>0?';color:#B45309':';color:var(--accent)')+'">→ '+(q>0?'Queda debiendo '+q+' caja'+(q===1?'':'s')+' vacía'+(q===1?'':'s'):'Al corriente')+'</b></div>'}
document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act="entdesg"],[data-act="abono115"]');if(!b||!S.d)return;e.preventDefault();e.stopImmediatePropagation();
 if(b.dataset.act==='entdesg'){S.d._desg115=!S.d._desg115;render();return}
 S.d.abono=b.dataset.v==='0'?'':b.dataset.v;render()},true);
