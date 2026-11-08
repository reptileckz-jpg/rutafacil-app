/* ===================== v5 · Ticket obligatorio cuando queda a crédito o hay abono =====================
   Si al cliente le queda deuda o dio un abono, el chofer tiene que mandarle su ticket por WhatsApp
   (va directo a su número, con "Crédito pendiente"). Si hay impresora conectada, además se le imprime.
   Así, si el chofer anota "a crédito" algo que le pagaron, el cliente se da cuenta ese mismo día. */
function tkNecesita(n){return !!(n&&(n.total-n.pago>0.005||n.abono>0.005))}
function tkHecho(n){return !!(n&&(n.waOk||n.sinTk))}
function imprOk(){return !!(S.impr&&S.impr.con)}
function tkTel(n){return String(n.tel||'').replace(/\D/g,'').slice(-10)}
function tkImprimir(n){n.prOk=true;S.hist.push({t:fmtF(iso(TODAY))+' '+hhmm(),q:chofN(S.chofHoy),x:'Imprimió el ticket de '+n.cli})}
var _nB17=notaBlock;notaBlock=function(){var h=_nB17.apply(this,arguments),n=S.nota;if(!tkNecesita(n))return h;var debe=n.total-n.pago,x;
 if(!tkHecho(n)){var tel=tkTel(n);
  x='<div class="card alert" id="tkcard" data-key="tkcard" style="border-width:2px"><b class="neg" style="font-size:17px">Mándale su ticket al cliente</b><div style="font-size:15px;margin-top:4px">'+(debe>0.005?'Le quedó a deber <b>'+money(debe)+'</b>':'')+(debe>0.005&&n.abono>0?' y ':'')+(n.abono>0?'Dio un abono de <b>'+money(n.abono)+'</b>':'')+'. Ahora debe <b>'+money(n.cred)+'</b>.</div><div class="lbl">Es obligatorio para seguir con la ruta.</div>'
   +(tel.length===10?'':'<div class="field" style="margin-top:6px"><label for="tktel">WhatsApp del cliente</label><input id="tktel" type="tel" inputmode="tel" data-bind="nota.tel" value="'+esc(n.tel||'')+'" placeholder="10 números" style="width:160px;text-align:left"></div>')
   +'<button class="btn" style="margin-top:10px;background:#1FA855" data-act="tkwa">📲 Mandar por WhatsApp'+(imprOk()?' e imprimir':'')+'</button>'
   +'<button class="link" style="margin-top:6px" data-act="tknowa">El cliente no tiene WhatsApp</button></div>'}
 else x='<div class="card good" data-key="tkcard"><b>'+(n.waOk?'✓ Ticket enviado por WhatsApp':'Sin WhatsApp')+(n.prOk?' · ✓ impreso':'')+'</b>'+(n.sinTk&&!n.prOk?'<div class="lbl">Se le avisó al administrador que se fue sin ticket.</div>':'')+(!n.prOk&&imprOk()?'<button class="btn sm sec" style="margin-top:6px" data-act="tkprint">Imprimir ticket</button>':'')+'</div>';
 return x+h};
document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act]');if(!b)return;var a=b.dataset.act,n=S.nota;
 if(a==='notaseguir'&&tkNecesita(n)&&!tkHecho(n)){e.stopImmediatePropagation();window._faltaSel='#tkcard';toast('Primero mándale su ticket al cliente');render();window.scrollTo({top:0,behavior:'smooth'});return}
 if(a==='tkwa'){e.stopImmediatePropagation();var t=tkTel(n);if(t.length!==10){window._faltaSel='#tktel';toast('Escribe el WhatsApp del cliente (10 números)');render();return}
  var c=S.cli.filter(function(x){return x.n===n.cli})[0];if(c&&!String(c.tel||'').replace(/\D/g,''))c.tel=n.tel;
  try{window.open('https://wa.me/52'+t+'?text='+encodeURIComponent(notaTxt(n)),'_blank')}catch(er){}
  n.waOk=true;if(imprOk())tkImprimir(n);toast(imprOk()?'Ticket enviado e impreso':'Ticket enviado por WhatsApp');render();return}
 if(a==='tknowa'){e.stopImmediatePropagation();n.sinTk=true;if(imprOk()){tkImprimir(n);toast('Se le imprimió su ticket')}
  else{S.avPrecio.push('URGENTE: '+n.cli+' quedó con deuda de '+money(n.cred)+' y se fue SIN ticket (no tiene WhatsApp) · entregó '+chofN(S.chofHoy));toast('Se le avisó al administrador')}render();return}
 if(a==='tkprint'){e.stopImmediatePropagation();tkImprimir(n);toast('Ticket impreso');render();return}
 if(a==='imprdemo'){e.stopImmediatePropagation();S.impr=S.impr||{papel:'58',auto:false};S.impr.con=!S.impr.con;toast(S.impr.con?'Impresora de prueba conectada':'Impresora desconectada');render();return}},true);
/* en Ajustes: en la demo se puede simular una impresora conectada */
var _aj17=ajHTML;ajHTML=function(){var h=_aj17.apply(this,arguments);if(typeof REAL!=='undefined'&&REAL)return h.replace('>Agregar impresora (Bluetooth)</button>','>Agregar impresora (Bluetooth) · muy pronto</button>');return h.replace('<button class="btn sm sec" style="margin-top:8px" disabled>Agregar impresora (Bluetooth)</button>','<button class="btn sm '+(imprOk()?'':'sec')+'" style="margin-top:8px" data-act="imprdemo">'+(imprOk()?'✓ Impresora de prueba conectada':'Simular impresora conectada (demo)')+'</button>')};
