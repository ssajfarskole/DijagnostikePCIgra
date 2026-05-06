import { ComponentState, ToolId } from '../types';

interface Props {
  components: ComponentState[];
  selectedTool: ToolId | null;
  onComponentClick: (componentId: string) => void;
  appliedFixes: string[];
  diagnosedComponents: string[];
  removedComponents: string[];
  onReattach: (componentId: string) => void;
  onPowerOn: () => void;
  canPowerOn: boolean;
  isPoweredOn: boolean;
}

export default function PCCase({
  components,
  selectedTool,
  onComponentClick,
  appliedFixes,
  diagnosedComponents,
  removedComponents,
  onReattach,
  onPowerOn,
  canPowerOn,
  isPoweredOn,
}: Props) {
  const motherboard = components.find(c => c.id === 'motherboard');
  const cpuMboCable = components.find(c => c.id === 'cpuMboCable');
  const cpuPowerCable = components.find(c => c.id === 'cpuPowerCable');
  const ram1 = components.find(c => c.id === 'ram1');
  const ram2 = components.find(c => c.id === 'ram2');
  const trayActionLabel =
    selectedTool === 'replacement' ? 'ZAMIJENI UKLONJENE' :
    selectedTool === 'hand' ? 'VRATI UKLONJENE' :
    selectedTool ? 'ODABRANI ALAT NA UKLONJENOM' :
    'VRATI UKLONJENE';

  const handleRemovedInteraction = (componentId: string) => {
    if (selectedTool === 'hand' || !selectedTool) {
      onReattach(componentId);
      return;
    }

    onComponentClick(componentId);
  };

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div className="relative w-[620px] h-[440px] bg-gradient-to-br from-[#2a2a3a] via-[#222233] to-[#1a1a2a] rounded-lg border-2 border-[#3a3a4a] shadow-[0_0_40px_rgba(0,0,0,0.8)] overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.12),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(16,185,129,0.10),transparent_28%)]" />
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: 'linear-gradient(135deg, rgba(255,255,255,0.04) 0 8%, transparent 8% 16%)',
            backgroundSize: '18px 18px',
          }}
        />

        <button
          onClick={onPowerOn}
          className={`absolute top-4 left-4 w-8 h-8 rounded-full flex items-center justify-center transition-all cursor-pointer z-20 border
            ${
              isPoweredOn
                ? 'bg-green-500 border-green-300 shadow-[0_0_18px_rgba(34,197,94,0.75)] hover:bg-green-400'
                : canPowerOn
                  ? 'text-white border-[#22c3a6] shadow-[0_0_18px_rgba(34,195,166,0.75)] hover:opacity-90 animate-pulse' 
                  : 'bg-red-600 border-red-500 shadow-[0_0_12px_rgba(239,68,68,0.45)] hover:bg-red-500'
            }`}
          style={canPowerOn && !isPoweredOn ? { backgroundColor: '#22c3a6' } : {}}
          title={isPoweredOn ? 'PC je uključen' : canPowerOn ? 'PC spreman za uključivanje - klikni da upališ' : 'PC nije spreman za uključivanje'}
        >
          <span className={`text-sm ${
            isPoweredOn ? 'text-green-100' : canPowerOn ? 'text-gray-900' : 'text-red-200'
          }`}>⏻</span>
        </button>

        <div className="absolute inset-1 bg-gradient-to-b from-[#1a1a28] to-[#151522] rounded" />

        {motherboard && (
          <div
            className="absolute rounded-sm border border-[#0a4020] overflow-hidden"
            style={{
              left: `${motherboard.x}%`,
              top: `${motherboard.y}%`,
              width: `${motherboard.width}%`,
              height: `${motherboard.height}%`,
              background: 'linear-gradient(135deg, #2d7c4e 0%, #1a5a34 50%, #2d7c4e 100%)',
            }}
          >
            <div
              className="absolute inset-0 opacity-40"
              style={{
                backgroundImage: `
                  linear-gradient(0deg, transparent 48%, #3a9a65 48%, #3a9a65 52%, transparent 52%),
                  linear-gradient(90deg, transparent 48%, #3a9a65 48%, #3a9a65 52%, transparent 52%)
                `,
              }}
            />
            <svg className="absolute inset-0 w-full h-full opacity-30" viewBox="0 0 100 100" preserveAspectRatio="none">
              <line x1="20" y1="30" x2="80" y2="30" stroke="#1a8a45" strokeWidth="0.3" />
              <line x1="20" y1="50" x2="80" y2="50" stroke="#1a8a45" strokeWidth="0.3" />
              <line x1="20" y1="70" x2="60" y2="70" stroke="#1a8a45" strokeWidth="0.3" />
              <line x1="30" y1="20" x2="30" y2="80" stroke="#1a8a45" strokeWidth="0.3" />
              <line x1="50" y1="20" x2="50" y2="80" stroke="#1a8a45" strokeWidth="0.3" />
              <circle cx="25" cy="25" r="1.5" fill="#1a8a45" />
              <circle cx="45" cy="45" r="1" fill="#1a8a45" />
              <circle cx="60" cy="60" r="1.5" fill="#1a8a45" />
              <rect x="55" y="30" width="4" height="2" fill="#1a8a45" rx="0.3" />
              <rect x="35" y="60" width="6" height="2" fill="#1a8a45" rx="0.3" />
            </svg>
            <div className="absolute bottom-1 left-2 text-[8px] text-green-700 font-mono opacity-60">
              ASUS PRIME B550-PLUS
            </div>

            <div className="absolute left-[12%] top-[9%] w-[13%] h-[6%] rounded-sm bg-gradient-to-b from-slate-500/70 to-slate-900/90 border border-slate-300/30 shadow-[inset_0_0_6px_rgba(0,0,0,0.35)]" />
            <div className="absolute left-[12%] top-[75%] w-[14%] h-[4%] rounded-sm bg-gradient-to-b from-slate-500/60 to-slate-900/90 border border-slate-300/20" />
            <div className="absolute left-[44%] top-[44%] w-[7%] h-[1.5%] bg-gradient-to-r from-cyan-300/10 via-cyan-300/35 to-cyan-300/10 rounded-full opacity-60" />
            <div className="absolute left-[47%] top-[52%] w-[5%] h-[0.8%] bg-gradient-to-r from-violet-300/10 via-violet-300/30 to-violet-300/10 rounded-full opacity-50" />
            <button
              type="button"
              className={`pc-component absolute left-[17%] top-[7.2%] z-20 h-[3.1%] w-[11%] rounded-sm border-2 overflow-hidden select-none ${getVisualClass(cpuMboCable?.status || 'working', appliedFixes.some(fix => fix.startsWith('cpuMboCable_')), diagnosedComponents.includes('cpuMboCable'))} ${appliedFixes.some(fix => fix.startsWith('cpuMboCable_')) ? 'ring-2 ring-green-400/50' : ''}`}
              onClick={() => (cpuMboCable?.status === 'removed' ? handleRemovedInteraction('cpuMboCable') : onComponentClick('cpuMboCable'))}
              title="CPU MBO kabel - spoj na matičnu ploču"
            >
              {cpuMboCable?.status === 'removed' ? (
                <div className="absolute inset-0 pointer-events-none border border-dashed border-gray-500/50 rounded-sm bg-black/20 flex items-center justify-center">
                  <span className="text-[8px] text-gray-400 font-bold tracking-widest">SLOT</span>
                </div>
              ) : (
                <>
                  <div className="absolute inset-y-[24%] left-[8%] w-[8%] rounded-full bg-slate-600/70" />
                  <div className="absolute left-[20%] top-1/2 -translate-y-1/2 h-[14%] w-[32%] rounded-full bg-gradient-to-r from-slate-950 via-slate-800 to-slate-700 opacity-95" />
                  <div className="absolute inset-y-[22%] right-[8%] w-[12%] rounded-sm bg-slate-700/80" />
                  <span className="absolute left-[14%] top-1/2 -translate-y-1/2 text-[5.5px] font-mono font-bold tracking-[0.18em] text-slate-100 drop-shadow-[0_0_3px_rgba(0,0,0,0.8)]">
                    CPU MBO
                  </span>
                </>
              )}
            </button>

            <button
              type="button"
              className={`pc-component absolute left-[29%] top-[10.8%] z-20 h-[3.1%] w-[11%] rounded-sm border-2 overflow-hidden select-none ${getVisualClass(cpuPowerCable?.status || 'working', appliedFixes.some(fix => fix.startsWith('cpuPowerCable_')), diagnosedComponents.includes('cpuPowerCable'))} ${appliedFixes.some(fix => fix.startsWith('cpuPowerCable_')) ? 'ring-2 ring-green-400/50' : ''}`}
              onClick={() => (cpuPowerCable?.status === 'removed' ? handleRemovedInteraction('cpuPowerCable') : onComponentClick('cpuPowerCable'))}
              title="CPU KBL - 8-pinski CPU kabel napajanja"
            >
              {cpuPowerCable?.status === 'removed' ? (
                <div className="absolute inset-0 pointer-events-none border border-dashed border-gray-500/50 rounded-sm bg-black/20 flex items-center justify-center">
                  <span className="text-[8px] text-gray-400 font-bold tracking-widest">SLOT</span>
                </div>
              ) : (
                <>
                  <div className="absolute inset-y-[24%] left-[8%] w-[8%] rounded-full bg-slate-600/70" />
                  <div className="absolute left-[20%] top-1/2 -translate-y-1/2 h-[14%] w-[32%] rounded-full bg-gradient-to-r from-slate-950 via-slate-800 to-slate-700 opacity-95" />
                  <div className="absolute inset-y-[22%] right-[8%] w-[12%] rounded-sm bg-slate-700/80" />
                  <span className="absolute left-[14%] top-1/2 -translate-y-1/2 text-[5.5px] font-mono font-bold tracking-[0.18em] text-slate-100 drop-shadow-[0_0_3px_rgba(0,0,0,0.8)]">
                    CPU KBL
                  </span>
                </>
              )}
            </button>
            <div className="absolute left-[60%] top-[12%] flex gap-[2%] w-[31%] h-[28%]">
              {[0, 1, 2, 3].map(i => {
                const active = i === 1 || i === 3;
                const module = i === 1 ? ram1 : i === 3 ? ram2 : null;
                const isEmpty = !module || module.status === 'removed';
                const isFixed = module ? appliedFixes.some(fix => fix.startsWith(`${module.id}_`)) : false;
                const isDiagnosed = module ? diagnosedComponents.includes(module.id) : false;
                const statusClass = module ? getVisualClass(module.status, isFixed, isDiagnosed) : '';
                const canRemove = module && isDiagnosed && (module.status === 'failing' || module.status === 'dusty' || module.status === 'loose' || module.status === 'broken' || module.status === 'overheating') && selectedTool === 'screwdriver';
                
                return (
                  <div
                    key={i}
                    className={`relative flex-1 rounded-sm border overflow-hidden ${active ? 'border-cyan-300/30 bg-slate-900/75' : 'border-slate-700/40 bg-slate-950/80'}`}
                  >
                    {active && !isEmpty ? (
                      <>
                        <button
                          type="button"
                          className={`pc-component absolute inset-[6%_18%_6%_18%] z-10 flex items-center justify-center cursor-pointer rounded-sm border-2 overflow-hidden select-none ${statusClass} ${isFixed ? 'ring-2 ring-green-400/50' : ''} ${canRemove ? 'ring-2 ring-red-500' : ''}`}
                          onClick={() => module && onComponentClick(module.id)}
                          title={module?.name}
                          style={{ background: module ? getComponentBg(module) : undefined, transform: module ? getComponentTransform(module, isDiagnosed) : undefined }}
                        >
                          <div className="absolute inset-1 rounded-sm border border-cyan-400/20 bg-gradient-to-r from-slate-900 via-slate-700 to-slate-900 shadow-[inset_0_0_8px_rgba(0,0,0,0.5)]" />
                          <div className="absolute inset-x-[19%] top-[6%] h-[16%] rounded-sm bg-gradient-to-b from-cyan-300 via-violet-400 to-indigo-500 shadow-[0_0_10px_rgba(56,189,248,0.28)]" />
                          <div className="absolute inset-x-[22%] bottom-[6%] h-[8%] rounded-sm bg-gradient-to-r from-emerald-300/20 via-cyan-300/10 to-indigo-300/20" />
                          <div className="absolute inset-y-[8%] left-[11%] w-[8%] rounded-sm bg-black/25" />
                          <div className="absolute inset-y-[8%] right-[11%] w-[8%] rounded-sm bg-black/25" />
                        </button>
                      </>
                    ) : active && isEmpty ? (
                      <>
                        <button
                          type="button"
                          className={`pc-component absolute inset-[6%_18%_6%_18%] z-10 flex flex-col items-center justify-center cursor-pointer rounded-sm border-2 overflow-hidden select-none border-dashed border-gray-500/50 bg-black/20 ${statusClass}`}
                          onClick={() => {
                            if (!module) return;

                            if (!selectedTool || selectedTool === 'hand') {
                              onReattach(module.id);
                              return;
                            }

                            onComponentClick(module.id);
                          }}
                          title={module?.name}
                        >
                          <span className="text-[8px] text-gray-400 font-bold tracking-widest">SLOT</span>
                          {module && (
                            <span className="text-[6px] text-gray-500 mt-1">Klikni za zamjenu</span>
                          )}
                        </button>
                      </>
                    ) : (
                      <>
                        <div className="absolute inset-[10%_22%_10%_22%] rounded-sm bg-slate-950/95 border border-slate-700/80" />
                        <div className="absolute inset-x-[24%] top-[10%] h-[12%] rounded-sm bg-slate-800/90" />
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        <svg className="absolute inset-0 w-full h-full pointer-events-none z-[4]" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <linearGradient id="mainCableGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#020617" />
              <stop offset="50%" stopColor="#111827" />
              <stop offset="100%" stopColor="#020617" />
            </linearGradient>
            <linearGradient id="dataCableGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#7c2d12" />
              <stop offset="100%" stopColor="#f59e0b" />
            </linearGradient>
          </defs>
          <path d="M 10 86 C 18 79, 20 76, 22 68 C 26 56, 28 42, 30 36" stroke="url(#mainCableGradient)" strokeWidth="1.4" fill="none" strokeLinecap="round" opacity="0.95" />
          <path d="M 10 86 C 18 82, 23 80, 31 81 C 42 82, 53 79, 62 68" stroke="url(#mainCableGradient)" strokeWidth="1.1" fill="none" strokeLinecap="round" opacity="0.95" />
          <path d="M 10 86 C 20 84, 36 78, 52 70 C 63 64, 69 56, 73 50" stroke="url(#mainCableGradient)" strokeWidth="1.2" fill="none" strokeLinecap="round" opacity="0.95" />
          <path d="M 85 18 C 78 20, 74 24, 72 29 C 69 36, 66 42, 60 50" stroke="url(#dataCableGradient)" strokeWidth="0.8" fill="none" strokeLinecap="round" opacity="0.75" />
          <path d="M 85 26 C 75 29, 71 31, 66 34 C 58 39, 52 43, 47 49" stroke="url(#dataCableGradient)" strokeWidth="0.8" fill="none" strokeLinecap="round" opacity="0.75" />
        </svg>

        {components.filter(c => c.id !== 'motherboard').map(comp => {
          if (comp.id === 'ram1' || comp.id === 'ram2' || comp.id === 'cpuMboCable' || comp.id === 'cpuPowerCable') {
            return null;
          }
          const isFixed = appliedFixes.some(fix => fix.startsWith(`${comp.id}_`));
          const isDiagnosed = diagnosedComponents.includes(comp.id);
          const statusClass = getVisualClass(comp.status, isFixed, isDiagnosed);
          const isRemoved = comp.status === 'removed';

          return (
            <div
              key={comp.id}
              className={`absolute pc-component ${statusClass} flex items-center justify-center border-2 rounded-sm overflow-hidden select-none
                ${selectedTool || isRemoved ? 'cursor-pointer' : 'cursor-default'}
                ${isFixed ? 'ring-2 ring-green-400/50' : ''}`}
              style={{
                left: `${comp.x}%`,
                top: `${comp.y}%`,
                width: `${comp.width}%`,
                height: `${comp.height}%`,
                background: getComponentBg(comp),
                transform: getComponentTransform(comp, isDiagnosed),
              }}
              onClick={() => {
                if (isRemoved) {
                  handleRemovedInteraction(comp.id);
                  return;
                }
                onComponentClick(comp.id);
              }}
              title={`${comp.name} - ${isRemoved ? 'Uklonjeno. Klikni za zamjenu ili vracanje.' : 'Klikni za dijagnostiku'}`}
            >
              <div className="flex flex-col items-center justify-center w-full h-full relative z-10">
                
                {comp.width >= 8 && (
                  <span className={`text-[7px] mt-0.5 font-mono text-center leading-tight px-0.5 ${isRemoved ? 'text-gray-500' : 'text-gray-300'}`}>
                    {isRemoved ? 'UKLONJENO' : getShortName(comp.id)}
                  </span>
                )}

                {isRemoved && (
                  <div className="absolute inset-0 pointer-events-none border border-dashed border-gray-500/50 rounded-sm bg-black/20 flex items-center justify-center">
                    <span className="text-[8px] text-gray-400 font-bold tracking-widest">SLOT</span>
                  </div>
                )}

                {isDiagnosed && comp.status === 'dusty' && (
                  <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-1 left-1 w-1 h-1 bg-yellow-700/60 rounded-full animate-dust" />
                    <div className="absolute top-3 left-3 w-0.5 h-0.5 bg-yellow-800/50 rounded-full animate-dust" style={{ animationDelay: '0.5s' }} />
                    <div className="absolute bottom-1 right-2 w-1 h-1 bg-yellow-700/40 rounded-full animate-dust" style={{ animationDelay: '1s' }} />
                    <div className="absolute top-2 right-1 w-0.5 h-0.5 bg-yellow-600/50 rounded-full animate-dust" style={{ animationDelay: '1.5s' }} />
                  </div>
                )}

                {isDiagnosed && comp.status === 'overheating' && (
                  <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-red-500/30 to-transparent animate-heat" />
                    <div className="absolute -top-1 left-1/2 -translate-x-1/2 text-[8px] animate-heat">♨️</div>
                  </div>
                )}

                {isDiagnosed && comp.status === 'broken' && (
                  <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                    <span className="text-lg opacity-80">⚡</span>
                  </div>
                )}

                {isDiagnosed && comp.status === 'failing' && (
                  <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                    <span className="text-[10px] opacity-80">⚠️</span>
                  </div>
                )}

                {isFixed && (
                  <div className="absolute inset-0 bg-green-500/10 pointer-events-none flex items-center justify-center">
                    <span className="text-xs">✅</span>
                  </div>
                )}
              </div>

              {comp.id === 'cpu' && comp.status !== 'removed' && (
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute inset-1 bg-gradient-to-br from-gray-200 to-gray-500 rounded-sm border border-white/20 shadow-[inset_0_0_10px_rgba(0,0,0,0.25)]" />
                  <div className="absolute inset-[14%] rounded-sm border border-black/15 bg-gradient-to-br from-slate-200 via-slate-300 to-slate-500" />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[6px] font-mono text-black tracking-widest">INTEL</div>
                  <div className="absolute bottom-1 left-1/2 -translate-x-1/2 text-[4px] font-mono text-black">i7-9700K</div>
                </div>
              )}

              {comp.id === 'cpuFan' && comp.status !== 'removed' && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="relative w-12 h-12 rounded-full border-2 border-slate-500 bg-[radial-gradient(circle,rgba(255,255,255,0.15),rgba(15,23,42,0.85))] shadow-inner">
                    <div className={`absolute inset-1 rounded-full border border-slate-400/60 ${isPoweredOn && (comp.status === 'dusty' ? 'animate-spin-slow' : 'animate-spin-slower')}`}>
                      <div className="absolute left-1/2 top-1 bottom-1 w-[2px] -translate-x-1/2 bg-slate-300/80" />
                      <div className="absolute left-1/2 top-1 bottom-1 w-[2px] -translate-x-1/2 bg-slate-300/80 rotate-45" />
                      <div className="absolute left-1/2 top-1 bottom-1 w-[2px] -translate-x-1/2 bg-slate-300/80 rotate-90" />
                      <div className="absolute left-1/2 top-1 bottom-1 w-[2px] -translate-x-1/2 bg-slate-300/80 rotate-135" />
                    </div>
                    <div className="absolute inset-[28%] rounded-full bg-slate-700/80 border border-slate-300/30" />
                  </div>
                  <div className="absolute bottom-1 left-1/2 -translate-x-1/2 text-[5px] font-mono text-gray-300 tracking-widest">COOLER</div>
                </div>
              )}

              {comp.id === 'caseFan' && comp.status !== 'removed' && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className={`relative w-9 h-9 rounded-full border border-blue-400/50 bg-[radial-gradient(circle,rgba(148,163,184,0.14),rgba(15,23,42,0.9))] shadow-inner ${isPoweredOn ? 'animate-spin-slower' : ''}`}>
                    <div className="absolute inset-1 rounded-full border border-blue-300/30" />
                    <div className="absolute left-1/2 top-1 bottom-1 w-[2px] -translate-x-1/2 bg-blue-300/50" />
                    <div className="absolute left-1/2 top-1 bottom-1 w-[2px] -translate-x-1/2 bg-blue-300/50 rotate-60" />
                    <div className="absolute left-1/2 top-1 bottom-1 w-[2px] -translate-x-1/2 bg-blue-300/50 rotate-120" />
                  </div>
                </div>
              )}

              {comp.id === 'gpu' && comp.status !== 'removed' && (
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute inset-1 rounded-sm border border-violet-500/30 bg-gradient-to-r from-[#201538] via-[#100f22] to-[#201538] shadow-[inset_0_0_18px_rgba(0,0,0,0.45)]" />
                  <div className="absolute left-2 top-1 text-[5px] font-mono text-slate-300/70 tracking-[0.2em]">GEFORCE RTX</div>
                  <div className="absolute left-2 top-1/2 -translate-y-1/2 flex gap-2">
                    {[0, 1].map(i => (
                      <div
                        key={i}
                        className={`relative w-12 h-12 rounded-full border border-slate-500/50 bg-[radial-gradient(circle,rgba(148,163,184,0.18),rgba(15,23,42,0.95))] ${isPoweredOn ? 'animate-spin-slower' : ''}`}
                      >
                        <div className="absolute inset-[28%] rounded-full bg-slate-700/90" />
                        <div className="absolute inset-1 rounded-full border border-slate-400/20" />
                        <div className="absolute left-1/2 top-1 bottom-1 w-[2px] -translate-x-1/2 bg-slate-300/70" />
                        <div className="absolute left-1/2 top-1 bottom-1 w-[2px] -translate-x-1/2 bg-slate-300/70 rotate-60" />
                        <div className="absolute left-1/2 top-1 bottom-1 w-[2px] -translate-x-1/2 bg-slate-300/70 rotate-120" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {comp.id === 'psu' && comp.status !== 'removed' && (
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute left-2 top-1/2 -translate-y-1/2 w-24 h-12 rounded-sm border border-slate-500/50 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 shadow-[inset_0_0_14px_rgba(0,0,0,0.5)] flex items-center justify-center">
                    <div className="absolute left-2 top-2 text-[5px] text-slate-400 font-mono tracking-[0.3em]">MODULAR PSU</div>
                    <div className={`absolute right-2 bottom-2 w-5 h-5 rounded-full border border-slate-500/50 bg-[radial-gradient(circle,rgba(148,163,184,0.18),rgba(15,23,42,0.95))] ${isPoweredOn ? 'animate-spin-slower' : ''}`}>
                      <div className="absolute inset-[25%] rounded-full bg-slate-700/80" />
                    </div>
                  </div>
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-1">
                    <div className="w-1.5 h-3 bg-red-500/50 rounded-sm" />
                    <div className="w-1.5 h-3 bg-yellow-500/50 rounded-sm" />
                    <div className="w-1.5 h-3 bg-orange-500/50 rounded-sm" />
                    <div className="w-1.5 h-3 bg-blue-500/50 rounded-sm" />
                  </div>
                  {isDiagnosed && comp.status === 'broken' && (
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-red-400/40 bg-red-950/70 px-2 py-0.5 text-[6px] font-mono tracking-[0.25em] text-red-200">
                      DEAD
                    </div>
                  )}
                </div>
              )}

              {(comp.id === 'hdd' || comp.id === 'ssd') && comp.status !== 'removed' && (
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute right-1 top-1/2 -translate-y-1/2 flex gap-0.5">
                    <div className="w-1 h-1 bg-green-500/60 rounded-full" />
                    <div className="w-1 h-1 bg-yellow-500/60 rounded-full" />
                  </div>
                </div>
              )}

              {comp.id === 'cmosBattery' && (
                <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                  <div
                    className={`w-3 h-3 rounded-full border ${isDiagnosed && comp.status === 'broken' ? 'bg-gray-600 border-gray-500' : 'bg-silver border-gray-300'}`}
                    style={{ background: isDiagnosed && comp.status === 'broken' ? '#666' : 'linear-gradient(135deg, #e0e0e0, #c0c0c0, #d0d0d0)' }}
                  />
                </div>
              )}

              {(comp.id === 'gpuPowerCable' || comp.id === 'mainPowerCable') && comp.status !== 'removed' && (
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 flex gap-px shadow-[0_0_2px_rgba(0,0,0,0.8)]">
                    <div className="w-2 h-1.5 bg-slate-950 rounded-r-sm" />
                    <div className="w-2 h-1.5 bg-slate-700 rounded-r-sm" />
                    <div className="w-2 h-1.5 bg-slate-900 rounded-r-sm" />
                    <div className="w-2 h-1.5 bg-slate-600 rounded-r-sm" />
                    {comp.id === 'mainPowerCable' && (
                      <>
                        <div className="w-2 h-1.5 bg-slate-800 rounded-r-sm" />
                        <div className="w-2 h-1.5 bg-slate-900 rounded-r-sm" />
                        <div className="w-2 h-1.5 bg-slate-700 rounded-r-sm" />
                        <div className="w-2 h-1.5 bg-slate-500 rounded-r-sm" />
                      </>
                    )}
                  </div>
                </div>
              )}

              {(comp.id === 'sataCable1' || comp.id === 'sataCable2') && comp.status !== 'removed' && (
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 flex gap-px">
                    <div className="w-3 h-1 bg-orange-700/70 rounded-sm" />
                    <div className="w-3 h-1 bg-slate-950/80 rounded-sm" />
                  </div>
                </div>
              )}
            </div>
          );
        })}

        <div className="absolute top-1 right-[2%] text-[7px] text-gray-500 font-mono">
          Drive Bay
        </div>

        {[[1, 1], [1, 98], [98, 1], [98, 98]].map(([x, y], i) => (
          <div
            key={i}
            className="absolute w-1.5 h-1.5 rounded-full bg-gray-500/30"
            style={{ left: `${x}%`, top: `${y}%`, transform: 'translate(-50%, -50%)' }}
          />
        ))}
      </div>

      {selectedTool && (
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-black/80 text-white text-xs px-3 py-1 rounded-full border border-gray-600">
          Kliknite na komponentu s: {getToolEmoji(selectedTool)} {getToolName(selectedTool)}
        </div>
      )}

      {removedComponents.length > 0 && (
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-gray-900/90 backdrop-blur-sm border border-gray-700 rounded-xl p-3 shadow-2xl max-w-md flex flex-wrap gap-2 justify-center z-30">
          <span className="text-xs text-yellow-400 font-bold block mb-1 w-full text-center">{trayActionLabel}:</span>
          {removedComponents.map((id: string) => {
            const comp = components.find(c => c.id === id);
            if (!comp) return null;
            return (
              <button
                key={id}
                onClick={() => {
                  if (!selectedTool || selectedTool === 'hand') {
                    onReattach(id);
                    return;
                  }

                  onComponentClick(id);
                }}
                className="flex items-center gap-1 px-2 py-1 border text-xs rounded-lg transition-all text-white shadow-md"
                style={{ backgroundColor: 'rgba(34, 195, 166, 0.2)', borderColor: 'rgba(34, 195, 166, 0.5)' }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(34, 195, 166, 0.3)')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'rgba(34, 195, 166, 0.2)')}
                title={selectedTool ? `${getToolName(selectedTool)} na ${comp.name}` : `Vrati ${comp.name}`}
              >
                <span className="text-sm leading-none">{comp.icon}</span>
                <span className="font-mono">{getShortName(comp.id)}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

function getComponentBg(comp: ComponentState): string {
  if (comp.status === 'removed') return 'rgba(50,50,50,0.3)';

  switch (comp.id) {
    case 'cpu': return 'linear-gradient(135deg, #cbd5e1, #94a3b8, #e2e8f0)';
    case 'cpuFan': return 'linear-gradient(135deg, #1f2937, #111827, #1f2937)';
    case 'ram1':
    case 'ram2':
      return 'linear-gradient(180deg, #0f172a, #1f2937, #0f172a)';
    case 'gpu': return 'linear-gradient(90deg, #120d24, #0b1020, #120d24)';
    case 'gpuPowerCable':
    case 'cpuMboCable':
    case 'cpuPowerCable':
    case 'mainPowerCable':
    case 'sataCable1':
    case 'sataCable2':
      return 'linear-gradient(90deg, #020617, #111827, #020617)';
    case 'psu': return 'linear-gradient(135deg, #0f172a, #111827, #0f172a)';
    case 'hdd': return 'linear-gradient(135deg, #374151, #1f2937)';
    case 'ssd': return 'linear-gradient(135deg, #334155, #1e293b)';
    case 'cmosBattery': return 'transparent';
    case 'caseFan': return 'linear-gradient(135deg, #2a2a3e, #3a3a4e)';
    default: return '#333';
  }
}

function getComponentTransform(comp: ComponentState, isDiagnosed: boolean): string | undefined {
  switch (comp.id) {
    case 'gpu':
      return isDiagnosed && comp.status === 'loose' ? 'rotate(-0.4deg) translateY(1px)' : undefined;
    case 'gpuPowerCable':
      return 'rotate(-3deg)';
    case 'cpuMboCable':
      return 'rotate(-1deg)';
    case 'cpuPowerCable':
      return 'rotate(2deg)';
    case 'mainPowerCable':
      return 'rotate(0deg)';
    case 'sataCable1':
      return 'rotate(1deg)';
    case 'sataCable2':
      return 'rotate(-1deg)';
    default:
      return isDiagnosed && comp.status === 'loose' ? 'rotate(1.5deg) translateX(2px)' : undefined;
  }
}

function getShortName(id: string): string {
  switch (id) {
    case 'cpu': return 'CPU';
    case 'cpuFan': return 'HLADNJAK';
    case 'ram1': return 'RAM1';
    case 'ram2': return 'RAM2';
    case 'gpu': return 'GPU';
    case 'gpuPowerCable': return 'GPU KBL';
    case 'cpuMboCable': return 'CPU MBO';
    case 'cpuPowerCable': return 'CPU KBL';
    case 'sataCable1': return 'SATA HDD';
    case 'sataCable2': return 'SATA SSD';
    case 'mainPowerCable': return 'ATX KBL';
    case 'psu': return 'PSU';
    case 'hdd': return 'HDD';
    case 'ssd': return 'SSD';
    case 'cmosBattery': return 'CMOS';
    case 'caseFan': return 'VENTILATOR';
    default: return id.slice(0, 4);
  }
}

function getVisualClass(status: ComponentState['status'], isFixed: boolean, isDiagnosed: boolean): string {
  if (isFixed) return 'border-green-500/70';
  if (!isDiagnosed) return 'border-gray-600/40 hover:border-blue-400/60';
  switch (status) {
    case 'working': return 'border-emerald-500/40 hover:border-emerald-300/60';
    case 'dusty': return 'border-yellow-600/60';
    case 'loose': return 'border-orange-500/70';
    case 'failing': return 'animate-pulse-red border-red-500/70';
    case 'broken': return 'animate-pulse-red border-red-700/70';
    case 'overheating': return 'animate-pulse-orange border-orange-500/70';
    case 'removed': return 'border-gray-600/40 border-dashed';
  }
}

function getToolEmoji(tool: ToolId): string {
  switch (tool) {
    case 'magnifier': return '🔍';
    case 'screwdriver': return '🔧';
    case 'replacement': return '🔩';
    case 'thermalCamera': return '🌡️';
    case 'powerTester': return '🔌';
    case 'postCard': return '🖥️';
    case 'compressedAir': return '💨';
    case 'thermalPaste': return '🧴';
    case 'diagnosticDisk': return '💿';
    default: return '❓';
  }
}

function getToolName(tool: ToolId): string {
  switch (tool) {
    case 'magnifier': return 'Povecalo';
    case 'screwdriver': return 'Odvijac';
    case 'replacement': return 'Zamjena';
    case 'thermalCamera': return 'Termalna kamera';
    case 'powerTester': return 'Tester napajanja';
    case 'postCard': return 'POST kartica';
    case 'compressedAir': return 'Kompresirani zrak';
    case 'thermalPaste': return 'Termalna pasta';
    case 'diagnosticDisk': return 'Dijagnosticki disk';
    default: return tool;
  }
}
