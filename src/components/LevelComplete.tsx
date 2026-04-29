interface Props {
  levelName: string;
  score: number;
  maxScore: number;
  completionMessage: string;
  educationalNote: string;
  onNextLevel: () => void;
  onLevelSelect: () => void;
  isLastLevel: boolean;
}

export default function LevelComplete({ levelName, score, maxScore, completionMessage, educationalNote, onNextLevel, onLevelSelect, isLastLevel }: Props) {
  const percentage = Math.round((score / maxScore) * 100);
  const stars = percentage >= 90 ? 3 : percentage >= 70 ? 2 : 1;

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gradient-to-b from-[#0a0a1a] via-[#111827] to-[#0a0a1a] text-white p-6">
      <div className="max-w-lg w-full animate-fade-in">
        {/* Success header */}
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">🏆</div>
          <h1 className="text-3xl font-black mb-2 bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-500 bg-clip-text text-transparent">
            LEVEL ZAVRŠEN!
          </h1>
          <p className="text-lg text-gray-300">{levelName}</p>
        </div>

        {/* Score card */}
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6 mb-6">
          {/* Stars */}
          <div className="flex justify-center gap-2 mb-4">
            {[1, 2, 3].map(s => (
              <span key={s} className={`text-4xl transition-all duration-500 ${s <= stars ? 'opacity-100 scale-100' : 'opacity-20 scale-75'}`}
                style={{ transitionDelay: `${s * 0.3}s` }}>
                ⭐
              </span>
            ))}
          </div>

          {/* Score */}
          <div className="text-center mb-4">
            <div className="text-5xl font-black text-cyan-400">{score}</div>
            <div className="text-sm text-gray-400">od mogućih {maxScore} bodova</div>
            <div className="w-full bg-gray-700 rounded-full h-2 mt-3">
              <div className="h-2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-1000"
                style={{ width: `${percentage}%` }} />
            </div>
          </div>

          {/* Completion message */}
          <div className="bg-green-900/30 border border-green-500/30 rounded-xl p-4 mb-4">
            <p className="text-green-300 text-sm">{completionMessage}</p>
          </div>

          {/* Educational note */}
          <div className="bg-blue-900/20 border border-blue-500/20 rounded-xl p-4">
            <p className="text-blue-300 text-xs leading-relaxed">{educationalNote}</p>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-4">
          <button
            onClick={onLevelSelect}
            className="flex-1 py-3 bg-white/10 text-white font-bold rounded-xl border border-white/20 
                       hover:bg-white/20 transition-all cursor-pointer"
          >
            📋 Leveli
          </button>
          {!isLastLevel && (
            <button
              onClick={onNextLevel}
              className="flex-1 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold rounded-xl 
                         hover:from-blue-500 hover:to-cyan-500 transition-all hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] cursor-pointer"
            >
              Sljedeći Level →
            </button>
          )}
          {isLastLevel && (
            <div className="flex-1 py-3 bg-gradient-to-r from-yellow-600 to-amber-600 text-white font-bold rounded-xl text-center">
              🎉 Svi leveli završeni!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
