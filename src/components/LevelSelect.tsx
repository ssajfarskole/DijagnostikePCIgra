import { LEVELS } from '../gameData';

interface Props {
  onSelectLevel: (levelId: number) => void;
  onBack: () => void;
  completedLevels: number[];
}

export default function LevelSelect({ onSelectLevel, onBack, completedLevels }: Props) {
  return (
    <div className="h-screen w-screen flex flex-col items-center bg-gradient-to-b from-[#0a0a1a] via-[#111827] to-[#0a0a1a] text-white p-6 overflow-auto">
      {/* Header */}
      <div className="w-full max-w-4xl flex items-center justify-between mb-8">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors cursor-pointer"
        >
          ← Natrag
        </button>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
          ODABERI LEVEL
        </h1>
        <div className="text-sm text-gray-400">
          {completedLevels.length}/{LEVELS.length} završeno
        </div>
      </div>

      {/* Progress bar */}
      <div className="w-full max-w-4xl mb-8">
        <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-500"
            style={{ width: `${(completedLevels.length / LEVELS.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Level grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl w-full">
        {LEVELS.map((level) => {
          const isCompleted = completedLevels.includes(level.id);
          const isUnlocked = true; // Svi leveli otključani za testiranje

          return (
            <button
              key={level.id}
              onClick={() => isUnlocked && onSelectLevel(level.id)}
              disabled={!isUnlocked}
              className={`relative text-left rounded-xl p-5 border transition-all duration-300 cursor-pointer
                ${isCompleted 
                  ? 'bg-green-900/30 border-green-500/50 hover:border-green-400' 
                  : isUnlocked 
                    ? 'bg-white/5 border-white/10 hover:border-cyan-400/50 hover:bg-white/10' 
                    : 'bg-gray-900/30 border-gray-700/30 opacity-50 cursor-not-allowed'
                }`}
            >
              {/* Level number badge */}
              <div className={`absolute -top-3 -left-3 w-10 h-10 rounded-full flex items-center justify-center text-sm font-black
                ${isCompleted ? 'bg-green-500 text-white' : isUnlocked ? 'bg-blue-500 text-white' : 'bg-gray-700 text-gray-400'}`}>
                {isCompleted ? '✓' : level.id}
              </div>

              {/* Status icon */}
              {isCompleted && <div className="absolute top-3 right-3 text-2xl">🏆</div>}
              {!isUnlocked && <div className="absolute top-3 right-3 text-2xl">🔒</div>}

              {/* Content */}
              <div className="mt-2">
                <h3 className="font-bold text-sm mb-1 pr-8">{level.name}</h3>
                <p className="text-xs text-gray-400 mb-3 line-clamp-2">{level.description}</p>
                
                {/* Difficulty */}
                <div className="flex items-center gap-1">
                  <span className="text-xs text-gray-500">Težina:</span>
                  <div className="flex gap-0.5">
                    {[1, 2, 3].map(star => (
                      <span key={star} className={`text-xs ${star <= level.difficultyStars ? 'text-yellow-400' : 'text-gray-600'}`}>
                        ★
                      </span>
                    ))}
                  </div>
                  <span className="text-xs text-gray-500 ml-1">({level.difficulty})</span>
                </div>

                {/* Symptoms preview */}
                {isUnlocked && (
                  <div className="mt-3 space-y-1">
                    {level.symptoms.slice(0, 2).map((s, i) => (
                      <p key={i} className="text-xs text-gray-500 truncate">{s}</p>
                    ))}
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* All completed message */}
      {completedLevels.length === LEVELS.length && (
        <div className="mt-8 text-center animate-fade-in">
          <div className="text-4xl mb-2">🎉🏆🎊</div>
          <h2 className="text-2xl font-bold text-yellow-400">ČESTITAMO!</h2>
          <p className="text-gray-400">Završili ste sve levele! Pravi ste majstor za dijagnostiku!</p>
        </div>
      )}
    </div>
  );
}
