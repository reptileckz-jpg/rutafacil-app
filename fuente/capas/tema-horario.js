/* ===================== TEMA · Horario y apodo de los clientes (nació como tema, 17 nov · punto 117) =====================
   Ricardo puso a Benavides "de 8 de la mañana a 8 de la noche" y quedó "08:00 a 08:01" (el reloj del celular en 12 horas):
   - Las horas se muestran como "8 de la mañana", "2:30 de la tarde", "8 de la noche" (horaTxt117).
   - Al escribir el horario, si "cierra" queda antes o casi igual que "abre", pregunta "¿Cierra a las 8 de la noche?"
     y se corrige con un toque (en cualquier casilla de abre/cierra: ficha, asistente, ubicación, preguntas en ruta).
   - Los clientes que ya tienen un horario así salen en "Datos que faltan" (horMal117, en l16).
   - Si el apodo es igual al nombre (sin importar mayúsculas ni acentos), no se repite ("Benavides" · "Benavides").
   Las líneas de la base que muestran el horario están en fuente/vite/parches.mjs (117). Si se cambia algo de esto, se cambia AQUÍ y ahí.
   ============================================================================================ */
function horaTxt117(t){var m=hmin(t);if(m==null||isNaN(m))return String(t||'');var h=Math.floor(m/60)%24,mi=m%60,h12=h%12||12,
  p=h<6?'de la madrugada':h<12?'de la mañana':h===12?'del día':h<19?'de la tarde':'de la noche';return h12+(mi?':'+('0'+mi).slice(-2):'')+' '+p}
function horRango117(c){return 'de '+horaTxt117(c.hAb)+' a '+horaTxt117(c.hCi)}
/* cierra antes de abrir, o menos de una hora después */
function horMal117(c){if(!c||!c.hAb||!c.hCi)return false;var a=hmin(c.hAb),b=hmin(c.hCi);return a!=null&&b!=null&&b<=a+60}
/* lo que seguramente quiso decir: la misma hora pero de la tarde/noche, redondeada a la media hora */
function horSug117(ab,ci){var a=hmin(ab),b=hmin(ci);if(a==null||b==null||b>a+60)return null;if(b<720&&b+720>a+60&&b+720<1440){var s=Math.round((b+720)/30)*30;if(s>=1440)s=1410;return ('0'+Math.floor(s/60)).slice(-2)+':'+('0'+s%60).slice(-2)}return ''}
/* apodo igual al nombre: no se repite */
function apNorm117(x){return String(x||'').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'').replace(/[^a-z0-9ñ]+/g,' ').trim()}
function apLimpia117(){(S.cli||[]).forEach(function(c){if(c&&c.ap&&apNorm117(c.ap)===apNorm117(c.n))c.ap=''})}
var _r117=render;render=function(){try{apLimpia117()}catch(e){}return _r117.apply(this,arguments)};
/* la pregunta junto a la casilla de "cierra" */
var HOR117_AT=['data-bind','data-wz','data-clh','id'];
function hor117Par(el,de,a){for(var i=0;i<HOR117_AT.length;i++){var v=el.getAttribute(HOR117_AT[i]);if(v&&v.indexOf(de)>-1){var s='['+HOR117_AT[i]+'="'+v.split(de).join(a)+'"]';return {sel:s,yo:'['+HOR117_AT[i]+'="'+v+'"]'}}}return null}
function hor117Revisa(el){var ci,ab,k;if(hor117Par(el,'hCi','hAb')){k=hor117Par(el,'hCi','hAb');ci=el;ab=document.querySelector(k.sel);k={ci:k.yo,ab:k.sel}}
 else if(hor117Par(el,'hAb','hCi')){k=hor117Par(el,'hAb','hCi');ab=el;ci=document.querySelector(k.sel);k={ci:k.sel,ab:k.yo}}else return;
 var vie=document.querySelector('[data-x="hor117"]');if(vie)vie.remove();if(!ab||!ci||!ab.value||!ci.value||ci._ok117===ci.value)return;var s=horSug117(ab.value,ci.value);if(s===null)return;
 if(s&&ci.tagName==='SELECT'&&![].some.call(ci.options,function(o){return o.value===s}))s='';
 var d=document.createElement('div');d.dataset.x='hor117';d.className='card alert';d.setAttribute('style','padding:10px 12px;margin:6px 0;border:2px solid var(--danger)');d.dataset.ci=k.ci;d.dataset.s=s;
 d.innerHTML=s?'<div style="font-size:17px;font-weight:800">¿Cierra a las '+horaTxt117(s)+'?</div><div class="lbl">Dice que abre a las '+horaTxt117(ab.value)+' y cierra a las '+horaTxt117(ci.value)+'.</div><div style="display:flex;gap:8px;margin-top:8px;flex-wrap:wrap"><button class="btn" data-act="hor117si" style="min-height:52px">Sí, a las '+horaTxt117(s)+'</button><button class="btn sec" data-act="hor117no" style="min-height:52px">No, así está</button></div>'
  :'<div style="font-size:17px;font-weight:800">Revisa el horario</div><div class="lbl">Dice que cierra ('+horaTxt117(ci.value)+') antes de abrir o casi a la misma hora ('+horaTxt117(ab.value)+').</div><button class="btn sec" data-act="hor117no" style="min-height:52px;margin-top:8px">Así está</button>';
 var f=ci.closest('.field')||ci;f.after(d)}
document.addEventListener('change',function(e){var t=e.target;if(!t||!t.getAttribute||!(t.type==='time'||t.tagName==='SELECT'))return;if(!hor117Par(t,'hCi','hAb')&&!hor117Par(t,'hAb','hCi'))return;
 var k=hor117Par(t,'hCi','hAb')||hor117Par(t,'hAb','hCi');setTimeout(function(){var el=document.querySelector(k.yo);if(el)hor117Revisa(el)},0)},true);
document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act="hor117si"],[data-act="hor117no"]');if(!b)return;e.preventDefault();e.stopImmediatePropagation();
 var d=b.closest('[data-x="hor117"]'),ci=d&&document.querySelector(d.dataset.ci);if(!ci){if(d)d.remove();return}
 if(b.dataset.act==='hor117no'){ci._ok117=ci.value;d.remove();return}
 ci.value=d.dataset.s;d.remove();ci.dispatchEvent(new Event('input',{bubbles:true}));ci.dispatchEvent(new Event('change',{bubbles:true}));toast('Cierra a las '+horaTxt117(ci.value))},true);
