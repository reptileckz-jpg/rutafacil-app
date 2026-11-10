import React, { useState } from 'react';
import { 
  X, Check, GripVertical, MapPin, Truck, Car, 
  CheckCircle2, AlertTriangle, ChevronDown 
} from 'lucide-react';

export default function App() {
  const [step, setStep] = useState(1);
  const totalSteps = 11;

  // States for interactivity
  const [cargos, setCargos] = useState(['roatan', 'macho']); // Pre-selected for demo
  const [weighMethod, setWeighMethod] = useState('camion');
  const [vehicle, setVehicle] = useState('freightliner');

  const stepTitles = {
    1: 'Qué vas a cargar',
    2: 'Proveedores',
    3: 'Qué cargas primero',
    4: 'Tu ruta de hoy',
    5: 'Vehículo',
    6: 'Inspección'
  };

  const handleNext = () => {
    if (step < 6) setStep(step + 1);
  };

  const handlePrev = () => {
    if (step > 1) setStep(step - 1);
  };

  const toggleCargo = (id) => {
    if (cargos.includes(id)) {
      setCargos(cargos.filter(c => c !== id));
    } else {
      setCargos([...cargos, id]);
    }
  };

  // --- Step Components ---

  const renderStep1 = () => (
    <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
      <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-900 leading-tight">¿Qué vas a cargar?</h2>
        <p className="text-gray-500 text-sm mt-1.5">Escoge uno o varios.</p>
      </div>

      <div className="space-y-3">
        {[
          { id: 'roatan', title: 'Roatán', desc: 'por caja' },
          { id: 'macho', title: 'Macho', desc: 'por kilo' },
          { id: 'otra', title: 'Otra fruta', desc: 'de venta local' }
        ].map((item) => {
          const isSelected = cargos.includes(item.id);
          return (
            <div
              key={item.id}
              onClick={() => toggleCargo(item.id)}
              className={`relative p-4 rounded-2xl border-2 transition-all cursor-pointer select-none flex items-center gap-4 ${
                isSelected 
                  ? 'border-emerald-600 bg-emerald-50/40 shadow-sm' 
                  : 'border-gray-200 bg-white hover:border-gray-300'
              }`}
            >
              <div className={`w-7 h-7 rounded-md flex items-center justify-center border-2 flex-shrink-0 transition-colors ${
                isSelected ? 'bg-emerald-600 border-emerald-600 text-white' : 'bg-white border-gray-300'
              }`}>
                {isSelected && <Check size={18} strokeWidth={3} />}
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-lg leading-tight">{item.title}</h3>
                <p className="text-sm text-gray-500">{item.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
      <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-900 leading-tight">¿Con quién vas a cargar cada cosa?</h2>
        <p className="text-gray-500 text-sm mt-1.5">Solo salen los que venden ese producto.</p>
      </div>

      {/* Form Card 1: Roatán */}
      <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 space-y-4">
        <h3 className="font-bold text-gray-900 text-lg">Roatán</h3>
        
        <div className="relative">
          <select className="w-full appearance-none bg-gray-50 border border-gray-200 text-gray-900 text-base rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent font-medium">
            <option>Roly · El pital</option>
          </select>
          <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
        </div>
        
        <p className="text-sm text-gray-500 flex items-center gap-2">
          <span>~0 km de la bodega</span>
          <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
          <span>~0 min</span>
        </p>
        <p className="text-sm text-gray-600">El roatán siempre pasa a pesar a la báscula.</p>

        <div>
          <label className="text-xs text-gray-500 block mb-1.5 ml-1">Pesa en</label>
          <div className="relative">
            <select className="w-full appearance-none bg-gray-50 border border-gray-200 text-gray-900 text-base rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent font-medium">
              <option>Molo · $0</option>
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
          </div>
        </div>
      </div>

      {/* Form Card 2: Macho */}
      <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 space-y-4">
        <h3 className="font-bold text-gray-900 text-lg">Macho</h3>
        
        <div className="relative">
          <select className="w-full appearance-none bg-gray-50 border border-gray-200 text-gray-900 text-base rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent font-medium">
            <option>Seleccionar proveedor...</option>
          </select>
          <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
        </div>
        
        <p className="text-sm text-gray-500 flex items-center gap-2">
          <span>~0 km de la bodega</span>
          <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
          <span>~0 min</span>
        </p>

        <div className="space-y-3 pt-2">
          <h4 className="font-bold text-gray-900">¿Cómo lo vas a pesar?</h4>
          <div className="flex bg-gray-100 p-1 rounded-xl">
            <button 
              onClick={() => setWeighMethod('camion')}
              className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-semibold transition-all ${
                weighMethod === 'camion' ? 'bg-emerald-600 text-white shadow-sm' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Camión completo
            </button>
            <button 
              onClick={() => setWeighMethod('pesadas')}
              className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-semibold transition-all ${
                weighMethod === 'pesadas' ? 'bg-emerald-600 text-white shadow-sm' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Por pesadas
            </button>
          </div>
        </div>

        <div>
          <label className="text-xs text-gray-500 block mb-1.5 ml-1">Pesa en</label>
          <div className="relative">
            <select className="w-full appearance-none bg-gray-50 border border-gray-200 text-gray-900 text-base rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent font-medium">
              <option>Molo · $0</option>
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
      <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-900 leading-tight">¿Qué cargas primero?</h2>
        <p className="text-gray-500 text-sm mt-1.5">Cada parada tiene su báscula.</p>
      </div>

      <div className="space-y-3">
        {/* Draggable Item 1 */}
        <div className="bg-white border-2 border-emerald-600 rounded-2xl p-4 flex items-center gap-3 shadow-sm cursor-grab active:cursor-grabbing">
          <GripVertical className="text-gray-400" size={24} />
          <h3 className="font-bold text-gray-900 text-lg flex-1">1. Roatán · Roly</h3>
        </div>
        
        {/* Draggable Item 2 */}
        <div className="bg-white border border-gray-200 rounded-2xl p-4 flex items-center gap-3 shadow-sm cursor-grab active:cursor-grabbing">
          <GripVertical className="text-gray-400" size={24} />
          <h3 className="font-bold text-gray-900 text-lg flex-1">2. Macho · <span className="text-gray-400 font-normal">Sin asignar</span></h3>
        </div>

        <div className="bg-gray-50 border border-dashed border-gray-300 rounded-2xl p-4 text-center">
          <p className="text-gray-500 text-sm font-medium">Toca y arrastra para reordenar.</p>
        </div>
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
      <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-900 leading-tight">Tu ruta de hoy</h2>
        <p className="text-gray-500 text-sm mt-1.5 mb-4">Cada parada te va a salir en su pantalla, con su mapa y cómo llegar.</p>
        
        {/* Fake Map */}
        <div className="w-full h-32 bg-slate-200 rounded-xl overflow-hidden relative border border-gray-200 flex items-center justify-center">
          {/* Mock Map Background via inline SVG or pure CSS pattern to avoid external image dependencies */}
          <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#94a3b8 1px, transparent 1px)', backgroundSize: '10px 10px' }}></div>
          <div className="flex gap-1 items-end relative z-10 text-emerald-600 drop-shadow-md animate-bounce">
            <MapPin size={40} fill="currentColor" className="text-emerald-100" strokeWidth={1.5} />
          </div>
          <button className="absolute bottom-2 right-2 bg-white/90 backdrop-blur px-3 py-1.5 rounded-lg text-xs font-bold text-gray-700 shadow-sm border border-gray-200 flex items-center gap-1.5">
            Ver más grande
          </button>
        </div>
      </div>

      <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
        <p className="text-sm text-gray-500 mb-6 bg-gray-50 p-3 rounded-xl border border-gray-100 text-center font-medium">
          Los números son las paradas del viaje.
        </p>

        {/* Timeline */}
        <div className="relative border-l-2 border-gray-100 ml-4 space-y-8 pb-4">
          
          {/* Stop 1 */}
          <div className="relative pl-6">
            <div className="absolute -left-[17px] bg-gray-900 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm border-4 border-white shadow-sm">
              1
            </div>
            <div>
              <h4 className="font-bold text-gray-900 text-base">Bodega Banderilla <span className="text-gray-400 font-normal text-sm ml-1">~5:00</span></h4>
              <p className="text-sm text-gray-500 mt-0.5">Sale de Banderilla</p>
            </div>
          </div>

          {/* Stop 2 */}
          <div className="relative pl-6">
            <div className="absolute -left-[17px] bg-white text-gray-900 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm border-2 border-gray-200">
              2
            </div>
            <div>
              <h4 className="font-bold text-gray-900 text-base">Molo <span className="text-gray-400 font-normal text-sm ml-1">~7:00</span></h4>
              <p className="text-sm text-gray-500 mt-0.5">Pesa vacío y paga ($0)</p>
            </div>
          </div>

          {/* Stop 3 */}
          <div className="relative pl-6">
            <div className="absolute -left-[17px] bg-white text-gray-900 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm border-2 border-gray-200">
              3
            </div>
            <div>
              <h4 className="font-bold text-gray-900 text-base">Roly <span className="text-gray-400 font-normal text-sm ml-1">~7:20</span></h4>
              <p className="text-sm text-gray-500 mt-0.5 text-emerald-700 font-medium bg-emerald-50 inline-block px-2 py-0.5 rounded mt-1">Carga roatán · 300 cajas</p>
            </div>
          </div>

          {/* Stop 4 */}
          <div className="relative pl-6">
            <div className="absolute -left-[17px] bg-white text-gray-900 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm border-2 border-gray-200">
              4
            </div>
            <div>
              <h4 className="font-bold text-gray-900 text-base">Molo <span className="text-gray-400 font-normal text-sm ml-1">~8:55</span></h4>
              <p className="text-sm text-gray-500 mt-0.5">Pesa ya cargado</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );

  const renderStep5 = () => (
    <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
      <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-900 leading-tight">¿En qué vehículo vas?</h2>
      </div>

      <div className="space-y-3">
        {/* Vehicle 1 */}
        <label 
          className={`block relative p-4 rounded-2xl border-2 transition-all cursor-pointer select-none ${
            vehicle === 'nissan' ? 'border-emerald-600 bg-emerald-50/40 shadow-sm ring-4 ring-emerald-600/10' : 'border-gray-200 bg-white hover:border-gray-300'
          }`}
        >
          <input 
            type="radio" 
            name="vehicle" 
            value="nissan" 
            checked={vehicle === 'nissan'}
            onChange={(e) => setVehicle(e.target.value)}
            className="sr-only" 
          />
          <div className="flex items-center gap-4">
            <div className="w-20 h-14 bg-gray-100 rounded-xl flex items-center justify-center text-gray-400 flex-shrink-0 border border-gray-200">
              <Car size={32} />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-gray-900 text-lg leading-tight">Nissan NP300 2023</h3>
              <p className="text-sm text-gray-500 font-mono mt-0.5">YHR-453-74</p>
              <span className="inline-block mt-2 px-2 py-0.5 bg-red-100 text-red-700 text-xs font-bold rounded-md border border-red-200">Gasolina Premium</span>
            </div>
          </div>
        </label>

        {/* Vehicle 2 */}
        <label 
          className={`block relative p-4 rounded-2xl border-2 transition-all cursor-pointer select-none ${
            vehicle === 'freightliner' ? 'border-emerald-600 bg-emerald-50/40 shadow-sm ring-4 ring-emerald-600/10' : 'border-gray-200 bg-white hover:border-gray-300'
          }`}
        >
          <input 
            type="radio" 
            name="vehicle" 
            value="freightliner" 
            checked={vehicle === 'freightliner'}
            onChange={(e) => setVehicle(e.target.value)}
            className="sr-only" 
          />
          <div className="flex items-center gap-4">
            <div className="w-20 h-14 bg-gray-100 rounded-xl flex items-center justify-center text-gray-400 flex-shrink-0 border border-gray-200">
              <Truck size={32} />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-gray-900 text-lg leading-tight">Freightliner M2 2015</h3>
              <p className="text-sm text-gray-500 font-mono mt-0.5">XKK-654-78</p>
              <span className="inline-block mt-2 px-2 py-0.5 bg-gray-800 text-yellow-400 text-xs font-bold rounded-md">Diésel</span>
            </div>
          </div>
        </label>
      </div>
    </div>
  );

  const renderStep6 = () => (
    <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
      {/* Selected Vehicle Header */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
        <div className="w-16 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400 border border-gray-200">
          <Truck size={24} />
        </div>
        <div>
          <h3 className="font-bold text-gray-900">Freightliner M2 2015</h3>
          <p className="text-sm text-gray-500 font-mono">XKK-654-78</p>
        </div>
      </div>

      {/* Inspection Box */}
      <div className="bg-emerald-50 rounded-2xl border border-emerald-200 p-5 space-y-4 shadow-sm">
        <div>
          <h3 className="font-bold text-emerald-900 text-lg flex items-center gap-2">
            <CheckCircle2 className="text-emerald-600" size={20} />
            Este vehículo ya se revisó hoy
          </h3>
          <p className="text-emerald-800/80 text-sm mt-1">
            Lo revisó Dany a las 11:25. No tienes que hacer la lista otra vez.
          </p>
        </div>

        <div className="pt-2">
          <h4 className="font-bold text-emerald-950 mb-3">¿Notas algo raro?</h4>
          <div className="grid grid-cols-2 gap-3">
            <button className="py-3 px-4 bg-emerald-600 text-white font-bold rounded-xl hover:bg-emerald-700 active:bg-emerald-800 transition-colors shadow-sm flex justify-center">
              Todo bien
            </button>
            <button className="py-3 px-4 bg-white border-2 border-emerald-200 text-emerald-700 font-bold rounded-xl hover:bg-emerald-50 active:bg-emerald-100 transition-colors flex justify-center">
              Reportar algo
            </button>
          </div>
        </div>
      </div>

      <div className="text-center pt-2">
        <button className="text-emerald-600 text-sm font-semibold hover:underline">
          Saltar inspección (eres administrador)
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-200 sm:p-4 flex items-center justify-center font-sans selection:bg-emerald-200">
      {/* Mobile Device Simulator Container */}
      <main className="w-full max-w-md h-[100dvh] sm:h-[850px] bg-slate-50 sm:rounded-[2.5rem] shadow-2xl flex flex-col relative overflow-hidden ring-1 ring-gray-900/10">
        
        {/* Fixed Header */}
        <header className="bg-white px-5 pt-6 pb-4 border-b border-gray-100 flex-shrink-0 z-20 sm:rounded-t-[2.5rem]">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">Viaje de carga</h1>
              <div className="text-sm text-gray-500 mt-1 flex items-center gap-1.5 font-medium">
                <span>Antes de salir</span>
                <span className="text-gray-300">•</span>
                <span>paso {step} de {totalSteps}</span>
                <span className="text-gray-300">•</span>
                <span className="text-gray-700 truncate max-w-[120px]">{stepTitles[step]}</span>
              </div>
            </div>
            
            <button className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-200">
              <X size={20} strokeWidth={2.5} />
            </button>
          </div>
          
          {/* Progress Bar */}
          <div className="mt-5 h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-emerald-600 transition-all duration-500 ease-out rounded-full" 
              style={{ width: `${(step / totalSteps) * 100}%` }}
            />
          </div>
        </header>

        {/* Scrollable Content */}
        <div className="flex-grow overflow-y-auto p-5 relative [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {step === 1 && renderStep1()}
          {step === 2 && renderStep2()}
          {step === 3 && renderStep3()}
          {step === 4 && renderStep4()}
          {step === 5 && renderStep5()}
          {step === 6 && renderStep6()}
          
          {/* Padding for sticky footer */}
          <div className="h-6"></div>
        </div>

        {/* Fixed Footer */}
        <footer className="bg-white border-t border-gray-100 p-4 sm:p-5 flex gap-3 flex-shrink-0 z-20 sm:rounded-b-[2.5rem]">
          {step > 1 && (
            <button 
              onClick={handlePrev}
              className="flex-1 py-4 px-4 bg-white border-2 border-gray-200 text-gray-800 font-bold rounded-2xl hover:bg-gray-50 active:bg-gray-100 transition-colors focus:outline-none focus:ring-4 focus:ring-gray-100"
            >
              Atrás
            </button>
          )}
          <button 
            onClick={handleNext}
            className="flex-[1.5] py-4 px-4 bg-emerald-600 text-white font-bold rounded-2xl hover:bg-emerald-700 active:bg-emerald-800 transition-colors shadow-[0_4px_14px_0_rgba(16,185,129,0.39)] focus:outline-none focus:ring-4 focus:ring-emerald-500/30"
          >
            {step === 4 ? 'Empezar ruta' : step === 6 ? 'Finalizar' : 'Siguiente'}
          </button>
        </footer>

      </main>
    </div>
  );
}