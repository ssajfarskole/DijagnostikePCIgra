import { useState, useCallback } from 'react';
import MainMenu from './components/MainMenu';
import LevelSelect from './components/LevelSelect';
import GameView from './components/GameView';
import LevelComplete from './components/LevelComplete';
import { LEVELS } from './gameData';

type Screen = 'menu' | 'levelSelect' | 'game' | 'levelComplete';

export default function App() {
  const [screen, setScreen] = useState<Screen>('menu');
  const [currentLevel, setCurrentLevel] = useState(1);
  const [completedLevels, setCompletedLevels] = useState<number[]>([]);
  const [lastScore, setLastScore] = useState(0);

  const handleStart = useCallback(() => {
    setScreen('levelSelect');
  }, []);

  const handleSelectLevel = useCallback((levelId: number) => {
    setCurrentLevel(levelId);
    setScreen('game');
  }, []);

  const handleLevelComplete = useCallback((score: number) => {
    setLastScore(score);
    setCompletedLevels(prev => {
      if (!prev.includes(currentLevel)) {
        return [...prev, currentLevel];
      }
      return prev;
    });
    setScreen('levelComplete');
  }, [currentLevel]);

  const handleNextLevel = useCallback(() => {
    const nextId = currentLevel + 1;
    if (nextId <= LEVELS.length) {
      setCurrentLevel(nextId);
      setScreen('game');
    }
  }, [currentLevel]);

  const handleBackToLevels = useCallback(() => {
    setScreen('levelSelect');
  }, []);

  const handleBackToMenu = useCallback(() => {
    setScreen('menu');
  }, []);

  switch (screen) {
    case 'menu':
      return <MainMenu onStart={handleStart} />;
    
    case 'levelSelect':
      return (
        <LevelSelect
          onSelectLevel={handleSelectLevel}
          onBack={handleBackToMenu}
          completedLevels={completedLevels}
        />
      );
    
    case 'game':
      return (
        <GameView
          key={currentLevel}
          levelId={currentLevel}
          onLevelComplete={handleLevelComplete}
          onBack={handleBackToLevels}
        />
      );
    
    case 'levelComplete': {
      const level = LEVELS[currentLevel - 1];
      return (
        <LevelComplete
          levelName={level.name}
          score={lastScore}
          maxScore={100}
          completionMessage={level.completionMessage}
          educationalNote={level.educationalNote}
          onNextLevel={handleNextLevel}
          onLevelSelect={handleBackToLevels}
          isLastLevel={currentLevel >= LEVELS.length}
        />
      );
    }
  }
}
