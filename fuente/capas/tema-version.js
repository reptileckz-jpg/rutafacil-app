/* ===================== TEMA · Versión de la app y errores a la nube (nació como tema, 19 nov · puntos 148 y 149) =====================
   Ricardo: "haz todo lo que me dijiste" (sugerencias 1 y 2).
   148 · Los errores que la app ya anotaba en "Problemas" (apErr) también se mandan solos a la nube, a n/{neg}/err/{id}, con la versión,
         el papel (admin/chofer/…), la pantalla y el número de chofer (sin nombres de clientes). Así se revisan sin pedir capturas
         (GitHub → Actions → "Leer errores de la app"). Si no hay señal se guardan en el celular y se mandan después.
         Máximo 40 por día por celular. Solo números y texto del error: no cambia ninguna cuenta.
   149 · Aviso de "Hay versión nueva": en el APK (APP_VER = 1.0.N, lo lee l90 del celular) revisa cada 6 horas el último APK publicado
         en GitHub (Releases) y, si hay uno más nuevo, sale una tarjeta con "Descargar" (en Inicio del admin y arriba de la ruta del chofer).
         "Después" la esconde hasta mañana. Cada corte de ruta dice con qué versión se hizo (d.ver).
   Se arma al final. Si se cambia algo de esto, se cambia AQUÍ.
   ============================================================================================ */
var WEB149=typeof APP_VER!=='undefined'?String(APP_VER):'';
var REPO149='reptileckz-jpg/rutafacil-app';
function apk149(){var v=typeof APP_VER!=='undefined'?String(APP_VER):'';return /^\d+\.\d+\.\d+$/.test(v)?v:''}
function verTxt149(){var a=apk149();return 'app '+WEB149+(a?' · APK '+a:'')}

/* ---------- 148 · errores a la nube ---------- */
var ERR148={cola:[],n:0,dia:''};
try{var _e148=JSON.parse(localStorage.getItem('err148')||'null');if(_e148&&_e148.cola)ERR148=_e148}catch(e){}
function err148Guarda(){try{localStorage.setItem('err148',JSON.stringify({cola:ERR148.cola.slice(-60),n:ERR148.n,dia:ERR148.dia}))}catch(e){}}
function err148Pon(p){try{var hoy=iso(TODAY);if(ERR148.dia!==hoy){ERR148.dia=hoy;ERR148.n=0}if(ERR148.n>=40)return;ERR148.n++;
 ERR148.cola.push({t:Date.now(),f:hoy,h:hhmm(),tipo:String(p.k||'').split('|')[0].slice(0,40),txt:String(p.txt||'').slice(0,300),donde:String(p.donde||'').slice(0,200),
  rol:String(S.role||''),ch:S.chofHoy!=null?String(S.chofHoy):'',web:WEB149,apk:apk149()});err148Guarda();err148Manda()}catch(e){}}
function err148Manda(){try{if(!ERR148.cola.length||typeof NB==='undefined'||!NB.on||!NB.listo||!NB.ad||!NB.ad.set||ERR148.va)return;
 var x=ERR148.cola[0],id=x.t.toString(36)+'-'+Math.random().toString(36).slice(2,7);ERR148.va=1;
 NB.ad.set(nbP('err/'+id),x).then(function(){ERR148.va=0;ERR148.cola.shift();err148Guarda();if(ERR148.cola.length)setTimeout(err148Manda,300)},function(){ERR148.va=0})}catch(e){ERR148.va=0}}
var _apErr148=apErr;apErr=function(tipo,txt,donde){var n=(S.probs||[]).length,r=_apErr148.apply(this,arguments);try{var L=S.probs||[];if(L.length>n){var p=L[L.length-1];if(p&&p.auto)err148Pon(p)}}catch(e){}return r};
setInterval(function(){err148Manda()},60000);setTimeout(function(){err148Manda()},8000);

/* ---------- 149 · ¿hay versión nueva del APK? ---------- */
var NV149={rev:0,ult:'',url:''};
try{var _n149=JSON.parse(localStorage.getItem('nv149')||'null');if(_n149)NV149=_n149}catch(e){}
function verNum149(v){var m=/(\d+)\.(\d+)\.(\d+)/.exec(String(v||''));return m?(+m[1])*1e6+(+m[2])*1e3+(+m[3]):0}
function nv149Revisa(forzar){try{var a=apk149();if(!a||typeof fetch!=='function')return;if(!forzar&&Date.now()-num(NV149.rev)<6*3600e3)return;NV149.rev=Date.now();
 fetch('https://api.github.com/repos/'+REPO149+'/releases/latest',{headers:{Accept:'application/vnd.github+json'}}).then(function(r){return r.ok?r.json():null}).then(function(j){if(!j||!j.tag_name)return;
  var as=(j.assets||[]).filter(function(x){return /\.apk$/i.test(x.name||'')})[0];NV149.ult=String(j.tag_name).replace(/^v/,'');NV149.url=as?as.browser_download_url:(j.html_url||'');
  try{localStorage.setItem('nv149',JSON.stringify(NV149))}catch(e){}try{render()}catch(e){}},function(){})}catch(e){}}
function nv149Hay(){var a=apk149();return !!(a&&NV149.ult&&NV149.url&&verNum149(NV149.ult)>verNum149(a))}
function nv149HTML(){if(!nv149Hay())return '';var k='';try{k=localStorage.getItem('nv149x')||''}catch(e){}if(k===iso(TODAY)+'|'+NV149.ult)return '';
 return '<div class="card good" data-k="nv149" style="padding:12px 14px"><b style="font-size:17px">📲 Hay una versión nueva de la app</b><div class="lbl" style="margin-top:2px">La nueva es la <b>'+esc(NV149.ult)+'</b>; este celular tiene la '+esc(apk149())+'. Descárgala e instálala encima (no se borra nada).</div>'
  +'<div style="display:flex;gap:8px;margin-top:8px"><button class="btn" style="flex:2" data-act="nv149baja">Descargar</button><button class="btn sec" style="flex:1" data-act="nv149x">Después</button></div></div>'}
function nv149Pon(){try{var m=document.querySelector('main');if(!m||m.querySelector('[data-k="nv149"]'))return;var ok=(S.role==='admin'&&S.tab.admin==='inicio')||(S.role==='rep'&&S.tab.rep==='ruta');if(!ok)return;
 var h=nv149HTML();if(!h)return;var d=document.createElement('div');d.innerHTML=h;m.prepend(d.firstChild)}catch(e){}}
var _rd149=render;render=function(){var r=_rd149.apply(this,arguments);nv149Pon();return r};
window.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act="nv149baja"],[data-act="nv149x"]');if(!b)return;e.stopImmediatePropagation();e.preventDefault();
 if(b.dataset.act==='nv149x'){try{localStorage.setItem('nv149x',iso(TODAY)+'|'+NV149.ult)}catch(er){}render();return}
 try{window.open(NV149.url,'_system')}catch(er){location.href=NV149.url}},true);
setTimeout(function(){nv149Revisa()},5000);setInterval(function(){nv149Revisa()},30*60000);

/* versión en Ajustes ("Acerca de") y en cada corte de ruta */
var _cd149=corteDatos;corteDatos=function(){var d=_cd149.apply(this,arguments);try{if(d&&typeof d==='object')d.ver=verTxt149()}catch(e){}return d};
var _tkC149=tkCorte143;tkCorte143=function(d){var L=_tkC149.apply(this,arguments);try{if(d&&d.ver)L.push({s:'Hecho con la '+d.ver,c:1})}catch(e){}return L};
