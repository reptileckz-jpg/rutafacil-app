/* ===================== v6.5 · Avisos en segunda persona cuando tú lo hiciste ("Registraste…"), y con nombre cuando fue otro ("Danu registró…") ===================== */
ubQuien=function(){return quien()};
var AV_VERB={'registró':'Registraste','guardó':'Guardaste','no pudo':'No pudiste','recibió':'Recibiste','entregó':'Entregaste','cambió':'Cambiaste','mandó':'Mandaste','pagó':'Pagaste','agregó':'Agregaste','borró':'Borraste','marcó':'Marcaste','asignó':'Asignaste','canceló':'Cancelaste','programó':'Programaste','autorizó':'Autorizaste','quitó':'Quitaste','dio':'Diste','anotó':'Anotaste','cobró':'Cobraste','pidió':'Pediste','subió':'Subiste','abrió':'Abriste','cerró':'Cerraste','tomó':'Tomaste','dejó':'Dejaste','sacó':'Sacaste','puso':'Pusiste','hizo':'Hiciste','corrigió':'Corregiste','reportó':'Reportaste','aceptó':'Aceptaste','rechazó':'Rechazaste','terminó':'Terminaste','empezó':'Empezaste','inició':'Iniciaste','llegó':'Llegaste','salió':'Saliste'};
function avYo(x){x=String(x==null?'':x);var pre='',m=/^(URGENTE: )/.exec(x);if(m){pre=m[1];x=x.slice(pre.length)}
 var yo=[quien()];try{if(S.role==='admin')yo.push(adminNom())}catch(e){}yo.push('Tú');
 for(var i=0;i<yo.length;i++){var n=yo[i];if(!n||x.indexOf(n+' ')!==0)continue;var r=x.slice(n.length+1);for(var v in AV_VERB){if(r.indexOf(v+' ')===0||r===v)return pre+AV_VERB[v]+r.slice(v.length)}if(n==='Tú')return pre+'Tú: '+r}
 return pre+x}
/* avRow: pasó a tema-avisos.js */
