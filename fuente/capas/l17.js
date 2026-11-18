/* ===================== v5 · Ticket obligatorio cuando queda a crédito o hay abono =====================
   Si al cliente le queda deuda o dio un abono, el chofer tiene que mandarle su ticket por WhatsApp
   (va directo a su número, con "Crédito pendiente"). Si hay impresora conectada, además se le imprime.
   Así, si el chofer anota "a crédito" algo que le pagaron, el cliente se da cuenta ese mismo día. */
function tkNecesita(n){return !!(n&&(n.total-n.pago>0.005||n.abono>0.005))}
function tkHecho(n){return !!(n&&(n.waOk||n.sinTk))}
function imprOk(){return !!(S.impr&&S.impr.con)}
function tkTel(n){return String(n.tel||'').replace(/\D/g,'').slice(-10)}
function tkImprimir(n){n.prOk=true;S.hist.push({t:fmtF(iso(TODAY))+' '+hhmm(),q:chofN(S.chofHoy),x:'Imprimió el ticket de '+n.cli})}
/* notaBlock: pasó a tema-notas.js */
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
/* ajHTML: pasó a tema-ajustes.js */
