const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:390,height:844}});await p.addInitScript(()=>{window.__pnTest=1;window.open=()=>null});
await p.goto('file:///mnt/user-data/outputs/prototipo-platanos.html');await p.waitForTimeout(700);const ev=(f,a)=>p.evaluate(f,a),W=ms=>p.waitForTimeout(ms);
await ev(()=>{S.role='rep';S.chofHoy=1;S.pinOk[pinKey()]=true;_pin={v:'',modo:null};S.tutVisto={rep:true,admin:true};S.salida.ok=true;S.log.push({c:8,R:5,M:0,V:0,Vr:0,total:1500,pago:1500,abono:0,pr:300,pm:0});S.tab.rep='cierre';S.cierreP=4;render()});await W(300);
await p.screenshot({path:'s62_ef.png'});
await ev(()=>{S.cierre.sent=true;S.cierre.corte={ent:1500,dest:'administrador'};S.ciEnvH='18:20';S.tab.rep='ruta';render();window.scrollTo(0,0)});await W(300);await p.screenshot({path:'s62_pos.png'});
await ev(()=>{S.role='admin';S.encOn=false;S.pinOk[pinKey()]=true;S.popVisto={admin:iso(TODAY)};S.tab.admin='cargas';S.sim2={prov:Object.keys(S.provDir)[0],veh:'',km:'200',cas:'300',com:'300',dias:'1',sueldo:'400',cajas:'300',pCaja:'180',kgM:'',pKg:'',merma:'3'};render()});await W(300);await p.screenshot({path:'s62_sim.png'});
await ev(()=>{S.sim2=null;S.tab.admin='clientes';S.pw={paso:4,cli:String(S.cli[2].id),R:'6',M:'',nota:'',cuando:'hoy',ch:null};render()});await W(300);await p.screenshot({path:'s62_pw.png'});
await b.close()})();
