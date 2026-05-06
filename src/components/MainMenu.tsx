interface Props {
  onStart: () => void;
}

export default function MainMenu({ onStart }: Props) {
  return (
    <div className="min-h-screen w-full flex items-center justify-center text-white px-6" style={{ backgroundColor: '#14171c' }}>
      
      <div className="w-full max-w-5xl">
        
        {/* Title section */}
        <div className="mb-16">
          <div className="text-5xl mb-4">🖥️</div>

          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight animate-title-glow">
            PC Dijagnostika
          </h1>

          <div className="w-20 h-1 mt-4 mb-6 rounded-full" style={{ backgroundColor: '#22c3a6' }} />

          <p className="text-gray-400 max-w-md">
            Igra u kojoj rješavaš kvarove na računalima koristeći razne alate i logiku.
          </p>
        </div>

        {/* CTA */}
        <button
          onClick={onStart}
          className="mb-16 px-8 py-3 transition-all duration-200 rounded-lg font-semibold"
          style={{ 
            backgroundColor: '#22c3a6',
            color: '#0a0a0a',
            border: '1px solid #22c3a6'
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.9')}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
        >
          Započni igru →
        </button>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          
          <div className="p-5 rounded-lg border transition-all" style={{ backgroundColor: 'rgba(22, 28, 35, 0.7)', borderColor: 'rgba(42, 49, 66, 0.8)', cursor: 'pointer' }} onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(30, 40, 50, 0.9)')} onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'rgba(22, 28, 35, 0.7)')}>
            <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2322c3a6' stroke-width='2'%3E%3Ccircle cx='11' cy='11' r='8'%3E%3C/circle%3E%3Cpath d='m21 21-4.35-4.35'%3E%3C/path%3E%3C/svg%3E" alt="Dijagnostika" className="w-8 h-8 mb-2" />
            <h3 className="font-semibold mb-1">Dijagnostika</h3>
            <p className="text-sm text-gray-400">
              Istraži hardver i pronađite uzrok problema koristeći test alate.
            </p>
          </div>

          <div className="p-5 rounded-lg border transition-all" style={{ backgroundColor: 'rgba(22, 28, 35, 0.7)', borderColor: 'rgba(42, 49, 66, 0.8)', cursor: 'pointer' }} onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(30, 40, 50, 0.9)')} onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'rgba(22, 28, 35, 0.7)')}>
            <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2322c3a6' stroke-width='2'%3E%3Cpath d='M12 2v20M2 12h20'%3E%3C/path%3E%3Ccircle cx='12' cy='12' r='10'%3E%3C/circle%3E%3C/svg%3E" alt="Održavanje" className="w-8 h-8 mb-2" />
            <h3 className="font-semibold mb-1">Održavanje</h3>
            <p className="text-sm text-gray-400">
              Čisti prašinu, zamjenjuj komponente i vrati sistem na noge.
            </p>
          </div>

          <div className="p-5 rounded-lg border transition-all" style={{ backgroundColor: 'rgba(22, 28, 35, 0.7)', borderColor: 'rgba(42, 49, 66, 0.8)', cursor: 'pointer' }} onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(30, 40, 50, 0.9)')} onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'rgba(22, 28, 35, 0.7)')}>
            <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2322c3a6' stroke-width='2'%3E%3Cpath d='M4 19.5A2.5 2.5 0 0 1 6.5 17H7v-3a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v3h.5a2.5 2.5 0 0 1 0 5z'%3E%3C/path%3E%3Crect x='2' y='3' width='20' height='14' rx='2' ry='2'%3E%3C/rect%3E%3C/svg%3E" alt="Edukacija" className="w-8 h-8 mb-2" />
            <h3 className="font-semibold mb-1">Edukacija</h3>
            <p className="text-sm text-gray-400">
              Nauči kako funkcionira PC i što može pošli po zlu u hardveru.
            </p>
          </div>

        </div>

        {/* Footer */}
        <p className="mt-16 text-xs text-gray-500">
          Napravljeno za učenike | Sanja Šajfar™ 
        </p>
      </div>
    </div>
  );
}