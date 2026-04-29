

interface Props {
  onStart: () => void;
}

export default function MainMenu({ onStart }: Props) {
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#0a0a1a] via-[#111827] to-[#0a0a1a] text-white relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/3 rounded-full blur-3xl" />
      </div>

      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
        backgroundSize: '40px 40px'
      }} />

      <div className="relative z-10 text-center">
        {/* PC Icon */}
        <div className="text-8xl mb-6 animate-float">🖥️</div>

        {/* Title */}
        <h1 className="text-6xl font-black mb-3 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent animate-title-glow">
          PC DIJAGNOSTIKA
        </h1>
        <p className="text-xl text-gray-400 mb-2">Igrica za popravak i dijagnostiku računala</p>
        <p className="text-sm text-gray-500 mb-12">Koristi alate, dijagnosticiraj probleme i popravi računalo!</p>

        {/* Start button */}
        <button
          onClick={onStart}
          className="group relative px-12 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white text-xl font-bold rounded-xl 
                     hover:from-blue-500 hover:to-cyan-500 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] 
                     active:scale-95 cursor-pointer"
        >
          <span className="relative z-10">Započni igru</span>
        </button>

        {/* Info cards */}
        <div className="mt-16 grid grid-cols-3 gap-6 max-w-2xl mx-auto">
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-5 border border-white/10 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="text-3xl mb-2">🔧</div>
            <h3 className="font-bold text-sm text-cyan-400">8 Alata</h3>
            <p className="text-xs text-gray-400 mt-1">Povećalo, odvijač, termalna kamera i više...</p>
          </div>
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-5 border border-white/10 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <div className="text-3xl mb-2">🎯</div>
            <h3 className="font-bold text-sm text-cyan-400">Puno levela</h3>
            <p className="text-xs text-gray-400 mt-1">Suoči se raznim problemima, od laganih do teških problema</p>
          </div>
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-5 border border-white/10 animate-fade-in" style={{ animationDelay: '0.6s' }}>
            <div className="text-3xl mb-2">📚</div>
            <h3 className="font-bold text-sm text-cyan-400">Učenje</h3>
            <p className="text-xs text-gray-400 mt-1">Nauči kako dijagnosticirati prava računala</p>
          </div>
        </div>

        {/* Footer */}
        <p className="mt-12 text-xs text-gray-600">
          Napravljeno za učenike 👨‍🎓 | Napravila Sanja Šajfar
        </p>
      </div>
    </div>
  );
}
