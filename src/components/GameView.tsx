import { useState, useCallback, useRef, useEffect } from 'react';
import { ToolId, ComponentState, LogEntry, ComponentId, ComponentStatus, Fix } from '../types';
import { TOOLS } from '../types';
import { getLevel } from '../gameData';
import PCCase from './PCCase';

const PSU_POWER_CABLE_IDS = ['mainPowerCable', 'cpuMboCable', 'cpuPowerCable', 'gpuPowerCable', 'sataCable1', 'sataCable2'] as const;


function getDisconnectedPowerCables(components: ComponentState[]): string[] {
  return components
    .filter(comp => PSU_POWER_CABLE_IDS.includes(comp.id as typeof PSU_POWER_CABLE_IDS[number]) && comp.status !== 'working')
    .map(comp => comp.name);
}

function getFixKey(fix: Fix): string {
  return `${fix.componentId}_${fix.toolId}_${fix.targetStatus}`;
}

function resolveDiagnosticMessage(
  levelId: number,
  diagnostic: { componentId: string; toolId: ToolId; message: string; type: 'info' | 'warning' | 'error' },
  component: ComponentState,
  components: ComponentState[],
): { message: string; type: 'info' | 'warning' | 'error' } {
  if (diagnostic.componentId === 'psu' && diagnostic.toolId === 'powerTester') {
    if (component.status === 'broken' || component.status === 'removed') {
      return {
        message: '🔌 Test napajanja: Nema ispravnog izlaza iz PSU-a. Napajanje je pokvareno ili uklonjeno i treba zamjenu.',
        type: 'error',
      };
    }

    const disconnectedCables = getDisconnectedPowerCables(components);
    if (disconnectedCables.length > 0) {
      return {
        message: '🔌 Test napajanja: PSU je ispravan, ali naponska veza nije potpuno vraćena. Potrebno je dovršiti sve povezane konekcije.',
        type: 'warning',
      };
    }

    if (levelId === 1) {
      return {
        message: '🔌 Test napajanja: PSU daje pravilan napon i svi naponski kablovi su spojeni. Sustav je dobio napajanje.',
        type: 'info',
      };
    }

    return diagnostic;
  }

  if (levelId === 1 && diagnostic.componentId === 'motherboard' && diagnostic.toolId === 'postCard') {
    const disconnectedCables = getDisconnectedPowerCables(components);
    const psu = components.find(c => c.id === 'psu');
    if (psu?.status !== 'working' || disconnectedCables.length > 0) {
      return {
        message: '🖥️ POST kartica: Nema koda - napajanje još nije potpuno vraćeno. Provjerite PSU i sve naponske kablove.',
        type: 'warning',
      };
    }

    return {
      message: '🖥️ POST kartica: Napajanje je vraćeno i sustav prolazi POST bez grešaka.',
      type: 'info',
    };
  }

  return diagnostic;
}

function getExpectedFinalStates(level: ReturnType<typeof getLevel>): Partial<Record<ComponentId, ComponentStatus>> {
  const expected: Partial<Record<ComponentId, ComponentStatus>> = {};

  for (const fix of level.fixes) {
    expected[fix.componentId] = fix.targetStatus;
  }

  return expected;
}

function areAllRemovedComponentsRestored(components: ComponentState[]): boolean {
  return components.every(c => c.status !== 'removed');
}

function isLevelSolved(level: ReturnType<typeof getLevel>, components: ComponentState[]): boolean {
  const expected = getExpectedFinalStates(level);

  const allExpected = Object.entries(expected).every(([componentId, expectedStatus]) => {
    const component = components.find(c => c.id === componentId);
    return component?.status === expectedStatus;
  });

  // Special case for level 5: HDD can remain removed if SSD replacement is done
  if (level.id === 5) {
    const hdd = components.find(c => c.id === 'hdd');
    const ssd = components.find(c => c.id === 'ssd');
    if (hdd?.status === 'removed' && ssd?.status === 'working') {
      // HDD is replaced by SSD, so it's OK that HDD is removed
      return allExpected;
    }
  }

  return allExpected && areAllRemovedComponentsRestored(components);
}

interface Props {
  levelId: number;
  onLevelComplete: (score: number) => void;
  onBack: () => void;
}

export default function GameView({ levelId, onLevelComplete, onBack }: Props) {
  const level = getLevel(levelId);
  
  const [selectedTool, setSelectedTool] = useState<ToolId | null>(null);
  const [components, setComponents] = useState<ComponentState[]>(
    () => level.components.map(c => ({ ...c }))
  );
  const [log, setLog] = useState<LogEntry[]>([
    { id: 0, message: `🔧 Level ${level.id}: ${level.name}`, type: 'info' },
    { id: 1, message: `📋 Simptomi: ${level.symptoms[0]}`, type: 'info' },
    { id: 2, message: '💡 Koristite simptome i opis da pronađete kvar. Kliknite alat i zatim komponentu.', type: 'info' },
  ]);
  const [appliedFixes, setAppliedFixes] = useState<Set<string>>(new Set());
  const [diagnosedComponents, setDiagnosedComponents] = useState<Set<string>>(new Set());
  const [removedComponents, setRemovedComponents] = useState<Set<string>>(new Set());
  const [actionCount, setActionCount] = useState(0);
  const [hintUsed, setHintUsed] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [showSymptoms, setShowSymptoms] = useState(true);
  const [completed, setCompleted] = useState(false);
  const [isPoweredOn, setIsPoweredOn] = useState(false);
  const logRef = useRef<HTMLDivElement>(null);
  const nextId = useRef(4);

  // Update removedComponents when components change
  useEffect(() => {
    const removed = components.filter(c => c.status === 'removed').map(c => c.id);
    setRemovedComponents(new Set(removed));
  }, [components]);

  const validateAllSteps = useCallback((currentComponents: ComponentState[]) => {
    // Tools that require explicit user interaction and shouldn't auto-validate
    const explicitInteractionTools = ['diagnosticDisk', 'replacement', 'thermalPaste', 'powerTester', 'postCard', 'thermalCamera', 'compressedAir'];
    
    setAppliedFixes(prev => {
      const next = new Set(prev);
      let changed = false;

      for (const fix of level.fixes) {
        const fixKey = getFixKey(fix);
        if (next.has(fixKey)) continue;

        // Skip auto-validation for fixes that require explicit tool usage
        if (explicitInteractionTools.includes(fix.toolId)) {
          continue;
        }

        const component = currentComponents.find(c => c.id === fix.componentId);
        if (component && component.status === fix.targetStatus) {
          next.add(fixKey);
          changed = true;
        }
      }

      return changed ? next : prev;
    });
  }, [level]);

  // Auto-scroll log
  useEffect(() => {
    if (logRef.current) {
      logRef.current.scrollTop = logRef.current.scrollHeight;
    }
  }, [log]);

  
  const addLog = useCallback((message: string, type: LogEntry['type']) => {
    setLog(prev => [...prev, { id: nextId.current++, message, type }]);
  }, []);

  const handlePowerOn = useCallback(() => {
    if (isLevelSolved(level, components)) {
      const score = Math.max(10, 100 - (actionCount * 3) - (hintUsed ? 10 : 0) + (level.fixes.length * 5));
      setIsPoweredOn(true);
      addLog('🎉 PC se uspješno pali! Svi problemi su riješeni.', 'success');
      setCompleted(true);
      setTimeout(() => onLevelComplete(score), 1500);
      return;
    }

    const missingItems = components.filter(c => c.status === 'removed');
    if (missingItems.length > 0) {
      addLog('❌ PC se ne može uključiti dok sve uklonjene komponente i kablovi nisu vraćeni.', 'error');
      return;
    }

    addLog('❌ PC se ne može uključiti, kvar nije otklonjen!', 'error');
  }, [level, components, actionCount, hintUsed, addLog, onLevelComplete]);

  const handleComponentClick = useCallback((componentId: string) => {
    if (!selectedTool || completed) return;

    const comp = components.find(c => c.id === componentId);
    if (!comp) return;

    setActionCount(prev => prev + 1);

    
    
    // Validate prerequisites before checking for fixes
    if (selectedTool === 'screwdriver' && comp.status !== 'removed') {
      // Check for component-specific prerequisites
      if (comp.id === 'gpu') {
        const gpuPowerCable = components.find(c => c.id === 'gpuPowerCable');
        if (gpuPowerCable?.status !== 'removed') {
          addLog('❌ Prvo odvijačem odsponjite GPU kabel napajanja!', 'warning');
          return;
        }
      }
      if (comp.id === 'hdd') {
        const sataCable1 = components.find(c => c.id === 'sataCable1');
        if (sataCable1?.status !== 'removed') {
          addLog('❌ Prvo odvijačem odsponjite SATA kabel za HDD!', 'warning');
          return;
        }
        if (level.id === 5 && !diagnosedComponents.has('hdd')) {
          addLog('❌ Prvo koristite dijagnostički disk na HDD-u da potvrdite kvar prije uklanjanja.', 'warning');
          return;
        }
      }
      if (comp.id === 'ssd') {
        const sataCable2 = components.find(c => c.id === 'sataCable2');
        if (sataCable2?.status !== 'removed') {
          addLog('❌ Prvo odvijačem odsponjite SATA kabel za SSD!', 'warning');
          return;
        }
      }
    }
    
    // Check if this tool+component is a fix
    const fix = level.fixes.find(
      f => f.componentId === componentId && f.toolId === selectedTool && !appliedFixes.has(`${f.componentId}_${f.toolId}_${f.targetStatus}`)
    );

    if (fix) {
      const fixKey = getFixKey(fix);

      // Special conditions for some fixes
      if (fix.componentId === 'cpu' && fix.toolId === 'thermalPaste') {
        const cpuFan = components.find(c => c.id === 'cpuFan');
        if (cpuFan?.status !== 'removed') {
          addLog('❌ Prvo morate odvijačem odspojiti hladnjak procesora da biste pristupili CPU-u!', 'warning');
          return;
        }
        const cpuMboCable = components.find(c => c.id === 'cpuMboCable');
        const cpuPowerCable = components.find(c => c.id === 'cpuPowerCable');
        const cpuCables = [cpuMboCable, cpuPowerCable].filter(Boolean) as ComponentState[];
        if (cpuCables.some(cable => cable.status !== 'removed')) {
          const cableNames = cpuCables.length === 2
            ? 'oba CPU napojća kabela (8-pin i 4-pin)'
            : `${cpuCables[0].name}`;
          addLog(`❌ Prvo odspojite ${cableNames} odvijačem!`, 'warning');
          return;
        }
      }
      if (fix.componentId === 'cpuFan' && fix.toolId === 'compressedAir') {
        if (comp.status !== 'removed') {
          addLog('❌ Hladnjak mora biti odspojen odvijačem da biste ga očistili kompresiranim zrakom!', 'warning');
          return;
        }
      }
      if (fix.componentId === 'cpuFan' && fix.toolId === 'screwdriver') {
        const cpuMboCable = components.find(c => c.id === 'cpuMboCable');
        const cpuPowerCable = components.find(c => c.id === 'cpuPowerCable');
        const cpuCables = [cpuMboCable, cpuPowerCable].filter(Boolean) as ComponentState[];
        if (cpuCables.some(cable => cable.status !== 'removed')) {
          const cableNames = cpuCables.length === 2
            ? 'oba CPU napojća kabela (8-pin i 4-pin)'
            : `${cpuCables[0].name}`;
          addLog(`❌ Prvo odspojite ${cableNames} odvijačem!`, 'warning');
          return;
        }
      }
      if (fix.componentId === 'gpu' && fix.toolId === 'compressedAir') {
        if (comp.status !== 'removed') {
          addLog('❌ GPU mora biti odspojena da biste je očistili!', 'warning');
          return;
        }
      }
      if (fix.componentId === 'caseFan' && fix.toolId === 'compressedAir') {
        if (comp.status !== 'removed') {
          addLog('❌ Ventilator mora biti odspojen da biste ga očistili!', 'warning');
          return;
        }
      }
      if (fix.componentId === 'gpu' && (fix.toolId === 'replacement' || fix.toolId === 'screwdriver')) {
        const gpuPowerCable = components.find(c => c.id === 'gpuPowerCable');
        if (fix.toolId === 'screwdriver' && gpuPowerCable?.status !== 'removed') {
          addLog('❌ Prvo odvijačem odsponjite GPU kabel napajanja!', 'warning');
          return;
        }
        if (fix.toolId === 'replacement' && gpuPowerCable?.status !== 'removed') {
          addLog('❌ Prvo morate odspojiti GPU kabel napajanja!', 'warning');
          return;
        }
      }
      if (fix.componentId === 'hdd' && fix.toolId === 'screwdriver') {
        const sataCable1 = components.find(c => c.id === 'sataCable1');
        if (sataCable1?.status !== 'removed') {
          addLog('❌ Prvo odvijačem odsponjite SATA kabel za HDD!', 'warning');
          return;
        }
      }
      if (fix.componentId === 'ssd' && fix.toolId === 'screwdriver') {
        const sataCable2 = components.find(c => c.id === 'sataCable2');
        if (sataCable2?.status !== 'removed') {
          addLog('❌ Prvo odvijačem odsponjite SATA kabel za SSD!', 'warning');
          return;
        }
      }
      if (fix.componentId === 'ram1' && fix.toolId === 'screwdriver') {
        // RAM doesn't require prerequisites - just remove directly
      }
      if (fix.componentId === 'ram2' && fix.toolId === 'screwdriver') {
        // RAM doesn't require prerequisites - just remove directly
      }
      if (fix.componentId === 'psu' && fix.toolId === 'screwdriver') {
        const stillConnected = components.filter(c =>
          ['mainPowerCable', 'cpuMboCable', 'cpuPowerCable', 'gpuPowerCable', 'sataCable1', 'sataCable2'].includes(c.id) && c.status !== 'removed'
        );
        if (stillConnected.length > 0) {
          addLog('❌ Prvo morate odspojiti sve kabele vezane uz napajanje.', 'warning');
          return;
        }
      }
      if (fix.componentId === 'psu' && fix.toolId === 'replacement') {
        // PSU must be removed before replacement
        if (comp.status !== 'removed') {
          addLog('❌ Prvo morate izvaditi pokvareno napajanje s odvijačem!', 'warning');
          return;
        }
      }
      if (fix.componentId === 'hdd' && fix.toolId === 'replacement') {
        // HDD must be removed before replacement
        if (comp.status !== 'removed') {
          addLog('❌ Prvo morate odvijačem izvaditi pokvareni HDD!', 'warning');
          return;
        }
      }
      if (fix.toolId === 'hand') {
        if (comp.status === fix.targetStatus) {
          addLog('❌ Ova komponenta već je vraćena!', 'warning');
          return;
        }
      }
      if (fix.toolId === 'screwdriver') {
        // Screwdriver is for removing components
        if (comp.status === 'removed') {
          addLog('❌ Ova komponenta je već uklonjena!', 'warning');
          return;
        }
      }
      if (fix.toolId === 'replacement') {
        // Replacement can work if component is removed (old part) or if we're installing new component
        if (comp.status !== 'removed' && comp.status !== 'broken' && comp.status !== 'failing' && comp.status !== 'dusty') {
          addLog('❌ Prvo morate pripremi komponentu za zamjenu.', 'warning');
          return;
        }
      }

      if (fix.componentId === 'gpu' && fix.toolId === 'replacement' && level.id === 9) {
        if (!diagnosedComponents.has('gpu')) {
          addLog('❌ Prvo provjerite temperaturu grafičke kartice termalnom kamerom.', 'warning');
          return;
        }
      }
      if (fix.componentId === 'gpu' && fix.toolId === 'thermalPaste' && level.id === 17) {
        if (!diagnosedComponents.has('gpu')) {
          addLog('❌ Prvo provjerite GPU termalnom kamerom prije nanošenja termalne paste.', 'warning');
          return;
        }
      }

      // Apply fix!
      // Mark the component as fixed in our state
      const nextComponents = components.map(c => 
        c.id === fix.componentId ? { ...c, status: fix.targetStatus as ComponentStatus } : c
      );
      setComponents(nextComponents);
      setAppliedFixes(prev => new Set(prev).add(fixKey));
      validateAllSteps(nextComponents);

      addLog(fix.description, 'success');
      return;
    }

    // SPECIAL CASE: Allow screwdriver to disconnect components that can be disconnected multiple times
    const disconnectableComponents = [
      'cpuFan', 'gpu', 'mainPowerCable', 'cpuMboCable', 'cpuPowerCable', 
      'gpuPowerCable', 'sataCable1', 'sataCable2', 'hdd', 'ssd', 'caseFan'
    ];
    
    if (disconnectableComponents.includes(comp.id) && selectedTool === 'screwdriver' && comp.status === 'working') {
      // Allow re-disconnection of working components
      if (comp.id === 'cpuFan') {
        const cpuMboCable = components.find(c => c.id === 'cpuMboCable');
        const cpuPowerCable = components.find(c => c.id === 'cpuPowerCable');
        const cpuCables = [cpuMboCable, cpuPowerCable].filter(Boolean) as ComponentState[];
        if (cpuCables.some(cable => cable.status !== 'removed')) {
          const cableNames = cpuCables.length === 2
            ? 'oba CPU napojća kabela (8-pin i 4-pin)'
            : `${cpuCables[0].name}`;
          addLog(`❌ Prvo odspojite ${cableNames} odvijačem!`, 'warning');
          return;
        }
      }
      if (comp.id === 'gpu') {
        const gpuPowerCable = components.find(c => c.id === 'gpuPowerCable');
        if (gpuPowerCable?.status !== 'removed') {
          addLog('❌ Prvo odvijačem odsponjite GPU kabel napajanja!', 'warning');
          return;
        }
      }
      if (comp.id === 'hdd') {
        const sataCable1 = components.find(c => c.id === 'sataCable1');
        if (sataCable1?.status !== 'removed') {
          addLog('❌ Prvo odvijačem odsponjite SATA kabel za HDD!', 'warning');
          return;
        }
      }
      if (comp.id === 'ssd') {
        const sataCable2 = components.find(c => c.id === 'sataCable2');
        if (sataCable2?.status !== 'removed') {
          addLog('❌ Prvo odvijačem odsponjite SATA kabel za SSD!', 'warning');
          return;
        }
      }
      if (comp.id === 'caseFan') {
        // No prerequisites for case fan
      }
      
      const nextComponents = components.map(c => c.id === comp.id ? { ...c, status: 'removed' as ComponentStatus } : c);
      setComponents(nextComponents);
      validateAllSteps(nextComponents);
      addLog(`✅ ${comp.name} je odvojena odvijačem!`, 'success');
      return;
    }

    if (comp.id === 'cpuFan') {
      if (selectedTool === 'screwdriver' && comp.status !== 'removed') {
        const cpuMboCable = components.find(c => c.id === 'cpuMboCable');
        const cpuPowerCable = components.find(c => c.id === 'cpuPowerCable');
        const cpuCables = [cpuMboCable, cpuPowerCable].filter(Boolean) as ComponentState[];
        if (cpuCables.some(cable => cable.status !== 'removed')) {
          const cableNames = cpuCables.length === 2
            ? 'oba CPU napojća kabela (8-pin i 4-pin)'
            : `${cpuCables[0].name}`;
          addLog(`❌ Prvo odspojite ${cableNames} odvijačem!`, 'warning');
          return;
        }

        const nextComponents = components.map(c => c.id === comp.id ? { ...c, status: 'removed' as ComponentStatus } : c);
        setComponents(nextComponents);
        validateAllSteps(nextComponents);
        addLog('✅ CPU hladnjak je odvojen od procesora!', 'success');
        return;
      }

      if (selectedTool === 'hand' && comp.status === 'removed') {
        const nextComponents = components.map(c => c.id === comp.id ? { ...c, status: 'working' as ComponentStatus } : c);
        setComponents(nextComponents);
        validateAllSteps(nextComponents);
        addLog('✅ CPU hladnjak je vraćen i pričvršćen na CPU!', 'success');
        return;
      }
    }

    // Check for diagnostic message
    const diagnostic = level.diagnostics.find(
      d => d.componentId === componentId && d.toolId === selectedTool
    );

    if (diagnostic) {
      const resolvedDiagnostic = resolveDiagnosticMessage(level.id, diagnostic, comp, components);
      setDiagnosedComponents(prev => new Set([...prev, componentId]));
      
      // Register diagnostic fixes as applied immediately
      const diagnosticFix = level.fixes.find(f => f.componentId === componentId && f.toolId === selectedTool);
      if (diagnosticFix) {
        setAppliedFixes(prev => new Set([...prev, getFixKey(diagnosticFix)]));
      }
      
      addLog(resolvedDiagnostic.message, resolvedDiagnostic.type);
      return;
    }

    // Additional diagnostic messages based on component state even without a fix
    if (selectedTool === 'magnifier' && !diagnostic) {
      setDiagnosedComponents(prev => new Set([...prev, componentId]));
      addLog(`🔍 ${comp.name}: ${getGenericVisual(comp.status, comp.name)}`, 'info');
      return;
    }

    // LEVEL 5: Special handling for HDD removal - must be diagnosed first
    if (level.id === 5 && selectedTool === 'screwdriver' && comp.id === 'hdd') {
      if (!diagnosedComponents.has('hdd')) {
        addLog('❌ Prvo koristite dijagnostički disk na HDD-u da potvrdite kvar prije odvajanja.', 'warning');
        return;
      }

      const sataCable1 = components.find(c => c.id === 'sataCable1');
      if (sataCable1?.status !== 'removed') {
        addLog('❌ Prvo odvijačem odsponjite SATA kabel za HDD!', 'warning');
        return;
      }

      setActionCount(prev => prev + 1);
      setComponents(prev => prev.map(c => 
        c.id === 'hdd' ? { ...c, status: 'removed' as ComponentStatus } : c
      ));

      setAppliedFixes(prev => {
        const next = new Set(prev);
        next.add('hdd_screwdriver_removed');
        return next;
      });

      addLog('✅ Pokvareni HDD je izvađen iz kućišta s odvijačem!', 'success');
      return;
    }



    if (level.id === 12 && selectedTool === 'replacement' && comp.id === 'sataCable2') {
      if (!diagnosedComponents.has('sataCable2')) {
        addLog('❌ Prvo pregledajte SATA kabel za SSD povećalom da potvrdite oštećenje prije zamjene.', 'warning');
        return;
      }

      if (comp.status !== 'removed') {
        addLog('❌ Prvo odvijačem odspojite oštećeni SATA kabel prije nego ga zamijenite.', 'warning');
        return;
      }

      setActionCount(prev => prev + 1);
      setComponents(prev => prev.map(c => 
        c.id === 'sataCable2' ? { ...c, status: 'working' as ComponentStatus } : c
      ));

      setAppliedFixes(prev => {
        const next = new Set(prev);
        next.add('sataCable2_replacement_working');
        return next;
      });

      addLog('✅ Dijagnostika je potvrdila oštećenje SATA kabela i novi kabel je ugrađen!', 'success');
      return;
    }

    if (selectedTool === 'hand' && comp.status === 'removed') {
      handleReattach(componentId);
      return;
    }

    if (selectedTool === 'replacement' && comp.status === 'removed') {
      const replacementFix = level.fixes.find(
        fix => fix.componentId === componentId && fix.toolId === 'replacement' && fix.targetStatus === 'working'
      );
      const handFix = level.fixes.find(
        fix => fix.componentId === componentId && fix.toolId === 'hand' && fix.targetStatus === 'working'
      );

      if (!replacementFix && handFix) {
        handleReattach(componentId);
        return;
      }
    }

    // Generic fallback message
    const toolName = TOOLS.find(t => t.id === selectedTool)?.name || selectedTool;
    const compName = comp.name;
    
    const genericMessages: Record<string, string> = {
      'magnifier': `🔍 ${compName}: Vizualni pregled - ${getGenericVisual(comp.status, comp.name)}`,
      'screwdriver': `🔧 ${compName}: ${comp.status === 'removed' ? 'Komponenta je već uklonjena.' : 'Ova komponenta ne treba zamjenu.'}`,
      'replacement': `🔩 ${compName}: Zamjena je moguća samo kada je komponenta uklonjena i kada level ima takav korak.`,
      'thermalCamera': `🌡️ ${compName}: Temperatura je u normalnom rasponu.`,
      'powerTester': `🔌 ${compName}: Napon je unutar normalnih granica.`,
      'postCard': `🖥️ ${compName}: Nema relevantnih POST kodova za ovu komponentu.`,
      'compressedAir': `💨 ${compName}: ${comp.status === 'dusty' ? 'Prašina bi se mogla očistiti, ali to nije glavni problem ovdje.' : 'Nema značajne prašine na ovoj komponenti.'}`,
      'thermalPaste': `🧴 ${compName}: Termalna pasta se ne treba nanositi na ovu komponentu.`,
      'diagnosticDisk': `💿 ${compName}: Nema pristupa dijagnostici za ovu komponentu.`,
      'hand': `✋ ${compName}: Ne možete koristiti ruku na postavljenu komponentu.`,
    };

    addLog(genericMessages[selectedTool] || `${toolName} na ${compName}: Nema relevantnih podataka.`, 'info');
  }, [selectedTool, components, level, appliedFixes, actionCount, hintUsed, completed, diagnosedComponents, addLog, onLevelComplete]);

  const handleReattach = useCallback((componentId: string) => {
    const comp = components.find(c => c.id === componentId);
    if (!comp || comp.status !== 'removed') return;

    const nextComponents = components.map(c => 
      c.id === componentId ? { ...c, status: 'working' as ComponentStatus } : c
    );

    const handFix = level.fixes.find(
      fix => fix.componentId === componentId && fix.toolId === 'hand' && fix.targetStatus === 'working'
    );

    const replacementFallback = level.fixes.find(
      fix => fix.componentId === componentId && fix.toolId === 'replacement' && fix.targetStatus === 'working'
    );

    setActionCount(prev => prev + 1);
    setComponents(nextComponents);
    validateAllSteps(nextComponents);

    if (handFix) {
      const fixKey = getFixKey(handFix);
      if (!appliedFixes.has(fixKey)) {
        setAppliedFixes(prev => new Set([...prev, fixKey]));
      }
    } else if (replacementFallback) {
      const fixKey = getFixKey(replacementFallback);
      if (!appliedFixes.has(fixKey)) {
        setAppliedFixes(prev => new Set([...prev, fixKey]));
      }
    }

    addLog(`✋ ${comp.name} vraćen na mjesto! Sada možete nastaviti s popravkom.`, 'success');
  }, [components, level.fixes, appliedFixes, addLog, validateAllSteps]);

  const handleHint = () => {
    setHintUsed(true);
    setShowHint(true);
    addLog(level.hint, 'action');
    setTimeout(() => setShowHint(false), 10000);
  };

  const canPowerOn = isLevelSolved(level, components);

  return (
    <div className="h-screen w-screen flex flex-col bg-[#0d0d15] text-white overflow-hidden">
      
      {/* TOP BAR */}
      <div className="flex-shrink-0 bg-[#111827] border-b border-gray-700/50 px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="text-gray-400 hover:text-white text-sm transition-colors cursor-pointer">
            ← Natrag
          </button>
          <div className="h-4 w-px bg-gray-700" />
          <div>
            <h2 className="text-sm font-bold" style={{ color: '#22c3a6' }}>Level {level.id}: {level.name}</h2>
            <span className="text-[10px] text-gray-500">{level.difficulty} {'★'.repeat(level.difficultyStars)}{'☆'.repeat(3 - level.difficultyStars)}</span>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          {/* Progress */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-400">Popravci:</span>
            <div className="flex gap-1">
              {level.fixes.map((_, i) => (
                <div key={i} className={`w-3 h-3 rounded-full border ${i < appliedFixes.size ? 'bg-green-500 border-green-400' : 'bg-gray-700 border-gray-600'}`} />
              ))}
            </div>
            <span className="text-xs text-gray-400">{appliedFixes.size}/{level.fixes.length}</span>
          </div>
          
          <div className="h-4 w-px bg-gray-700" />
          
          {/* Score */}
          <div className="text-sm">
            <span className="text-gray-400">Bodovi: </span>
            <span className="font-bold" style={{ color: '#22c3a6' }}>{Math.max(10, 100 - (actionCount * 3) - (hintUsed ? 10 : 0) + (appliedFixes.size * 5))}</span>
          </div>
          
          <div className="h-4 w-px bg-gray-700" />

          {/* Symptoms toggle */}
          <button onClick={() => setShowSymptoms(!showSymptoms)}
            className="text-xs bg-gray-800 hover:bg-gray-700 px-2 py-1 rounded border border-gray-600 cursor-pointer transition-colors">
            📋 Simptomi
          </button>
          
          {/* Hint */}
          {!completed && (
            <button onClick={handleHint}
              className="text-xs bg-yellow-900/40 hover:bg-yellow-900/60 px-2 py-1 rounded border border-yellow-700/40 cursor-pointer transition-colors">
              💡 Pomoć {-10}
            </button>
          )}
        </div>
      </div>

      {/* SYMPTOMS DROPDOWN */}
      {showSymptoms && (
        <div className="flex-shrink-0 bg-[#0f1520] border-b border-gray-700/30 px-4 py-2 animate-fade-in">
          <div className="flex flex-wrap gap-3">
            {level.symptoms.map((s, i) => (
              <span key={i} className="text-xs bg-gray-800/60 px-2 py-1 rounded border border-gray-700/40 text-gray-300">
                {s}
              </span>
            ))}
          </div>
          {showHint && (
            <div className="mt-2 text-xs text-yellow-400 bg-yellow-900/20 px-2 py-1 rounded border border-yellow-700/30">
              {level.hint}
            </div>
          )}
        </div>
      )}

      {/* MAIN AREA */}
      <div className="flex-1 flex min-h-0">
        
        {/* TOOL PANEL - Left */}
        <div className="flex-shrink-0 w-[100px] bg-[#111827] border-r border-gray-700/50 p-2 flex flex-col gap-1.5 overflow-y-auto">
          <div className="text-[9px] text-gray-500 text-center font-bold uppercase tracking-wider mb-1">
            Alati
          </div>
          {TOOLS.map(tool => (
            <button
              key={tool.id}
              onClick={() => setSelectedTool(selectedTool === tool.id ? null : tool.id)}
              className={`tool-btn flex flex-col items-center gap-0.5 p-1.5 rounded-lg border text-center
                ${selectedTool === tool.id 
                  ? 'selected bg-[#0d3d38]/40 border-[#22c3a6]/60' 
                  : 'bg-transparent border-transparent hover:bg-gray-800'}`}
              title={tool.description}
            >
              <span className="text-xl">{tool.icon}</span>
              <span className="text-[8px] leading-tight text-gray-300">{tool.name}</span>
            </button>
          ))}
          
          {/* Deselect button */}
          {selectedTool && (
            <button
              onClick={() => setSelectedTool(null)}
              className="mt-auto text-[9px] text-red-400 hover:text-red-300 bg-red-900/20 py-1 rounded border border-red-800/30 cursor-pointer"
            >
              ✕ Poništi
            </button>
          )}
        </div>

        {/* PC CASE - Center */}
        <div className="flex-1 flex items-center justify-center p-4 bg-gradient-to-br from-[#0d0d15] via-[#101020] to-[#0d0d15]">
          <PCCase 
            components={components}
            selectedTool={selectedTool}
            onComponentClick={handleComponentClick}
            appliedFixes={Array.from(appliedFixes)}
            diagnosedComponents={Array.from(diagnosedComponents)}
            removedComponents={Array.from(removedComponents)}
            onReattach={handleReattach}
            onPowerOn={handlePowerOn}
            canPowerOn={canPowerOn}
            isPoweredOn={isPoweredOn}
          />
        </div>

        {/* DIAGNOSTIC LOG - Right */}
        <div className="flex-shrink-0 w-[320px] bg-[#0a0e17] border-l border-gray-700/50 flex flex-col divide-y divide-gray-800">
          
          {/* TASK LIST (PCBS2 style) */}
          <div className="p-3 bg-[#111827]/50">
            <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: '#22c3a6' }}>📋 Zadaci</span>
            <div className="mt-2 space-y-1.5 max-h-[200px] overflow-y-auto">
              {level.fixes.map((f, i) => {
                const fixKey = getFixKey(f);
                const isDone = appliedFixes.has(fixKey);
                return (
                  <div key={i} className={`flex items-center gap-2 text-[10px] ${isDone ? 'text-gray-500 line-through' : 'text-gray-300'}`}>
                    <div className={`w-3 h-3 rounded-sm border ${isDone ? 'border-gray-600' : 'border-gray-600'}`} style={{ backgroundColor: isDone ? '#22c3a6' : 'transparent', borderColor: isDone ? '#22c3a6' : '#4b5563' }}>
                      {isDone && '✓'}
                    </div>
                    <span className="font-semibold">Korak {i + 1}</span>
                  </div>
                );
              })}
              {/* Power button as final step */}
              <div className={`flex items-center gap-2 text-[10px] ${isPoweredOn ? 'text-gray-500 line-through' : 'text-gray-300'}`}>
                <div className={`w-3 h-3 rounded-sm border ${isPoweredOn ? 'border-gray-600' : 'border-gray-600'}`} style={{ backgroundColor: isPoweredOn ? '#22c3a6' : 'transparent', borderColor: isPoweredOn ? '#22c3a6' : '#4b5563' }}>
                  {isPoweredOn && '✓'}
                </div>
                <span className="font-semibold">Korak {level.fixes.length + 1}</span>
              </div>
            </div>
          </div>

          <div className="px-3 py-2 border-b border-gray-700/30 flex items-center justify-between">
            <span className="text-xs font-bold text-gray-400">📋 DIJAGNOSTIČKI LOG</span>
            <button onClick={() => setLog([])} className="text-[9px] text-gray-600 hover:text-gray-400 cursor-pointer">
              Obriši
            </button>
          </div>
          <div ref={logRef} className="flex-1 overflow-y-auto p-2 space-y-1">
            {log.map(entry => (
              <div key={entry.id} className={`animate-slide-in text-[11px] px-2 py-1.5 rounded-lg border-l-2
                ${entry.type === 'info' ? 'bg-[#0d3d38]/20 border-[#22c3a6] text-[#a3e4d8]' :
                  entry.type === 'warning' ? 'bg-yellow-900/20 border-yellow-500 text-yellow-200' :
                  entry.type === 'error' ? 'bg-red-900/20 border-red-500 text-red-200' :
                  entry.type === 'success' ? 'bg-green-900/20 border-green-500 text-green-200' :
                  entry.type === 'action' ? 'bg-purple-900/20 border-purple-500 text-purple-200' :
                  'bg-gray-900/20 border-gray-500 text-gray-200'}`}
                style={{ whiteSpace: 'pre-line' }}
              >
                {entry.message}
              </div>
            ))}
            {log.length === 0 && (
              <div className="text-gray-600 text-xs text-center mt-8">
                Odaberite alat i kliknite na komponentu...
              </div>
            )}
          </div>
          
          {/* Component info */}
          <div className="border-t border-gray-700/30 px-3 py-2">
            <div className="text-[9px] text-gray-500 mb-1">Savjet:</div>
            <div className="text-[8px] text-gray-400 leading-snug">
              Status komponenti nije odmah vidljiv. Analizirajte simptome i koristite alat za dijagnostiku prije popravka.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function getGenericVisual(status: ComponentState['status'], name: string): string {
  switch (status) {
    case 'working': return `${name} izgleda potpuno u redu. Nema vidljivih oštećenja.`;
    case 'dusty': return `${name} je prekriven/a slojem prašine. Možda treba čišćenje.`;
    case 'loose': return `${name} nije pravilno postavljen/a! Čini se labav/a.`;
    case 'failing': return `${name} pokazuje znakove oštećenja! Vidljivi su tragovi pregrijavanja.`;
    case 'broken': return `${name} je vidljivo i ozbiljno oštećen/a! Treba zamjenu!`;
    case 'overheating': return `${name} je jako vruć/a! Znakovi pregrijavanja su vidljivi.`;
    case 'removed': return `${name} je uklonjena iz kućišta.`;
    default: return 'Status nije poznat.';
  }
}
