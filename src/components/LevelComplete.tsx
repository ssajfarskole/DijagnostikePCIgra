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
    <div style={{ 
      height: '100vh', 
      width: '100vw',
      backgroundColor: '#0a0a0a',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem'
    }}>
      <div style={{
        width: '384px',
        backgroundColor: '#1a1a1a',
        border: '2px solid #3b82f6',
        padding: '1.5rem'
      }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>🏆</div>
          <h1 style={{ 
            fontSize: '1.25rem',
            fontWeight: 'normal',
            color: '#3b82f6',
            marginBottom: '0.25rem',
            letterSpacing: '0.05em'
          }}>
            LEVEL ZAVRŠEN
          </h1>
          <p style={{ fontSize: '0.75rem', color: '#9ca3af', fontWeight: 'light' }}>{levelName}</p>
        </div>

        {/* Stars */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          gap: '0.75rem',
          marginBottom: '1.5rem'
        }}>
          {[1, 2, 3].map(s => (
            <span key={s} style={{ 
              fontSize: '1.875rem',
              opacity: s <= stars ? 1 : 0.3
            }}>
              ⭐
            </span>
          ))}
        </div>

        {/* Score */}
        <div style={{
          backgroundColor: '#0d0d0d',
          border: '1px solid rgba(59, 130, 246, 0.3)',
          padding: '1rem',
          marginBottom: '1.5rem',
          textAlign: 'center'
        }}>
          <div style={{ 
            fontSize: '1.875rem',
            fontWeight: 'normal',
            color: '#60a5fa',
            marginBottom: '0.25rem'
          }}>
            {score}
          </div>
          <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>od {maxScore} bodova</div>
          <div style={{ 
            width: '100%',
            backgroundColor: '#2a2a2a',
            height: '4px',
            marginTop: '0.75rem'
          }}>
            <div style={{ 
              height: '4px',
              backgroundColor: '#3b82f6',
              width: `${percentage}%`
            }} />
          </div>
        </div>

        {/* Message */}
        <div style={{
          backgroundColor: '#1e3a8a',
          border: '1px solid #1e40af',
          padding: '0.75rem',
          marginBottom: '1.5rem'
        }}>
          <p style={{ 
            fontSize: '0.75rem',
            color: '#bfdbfe',
            lineHeight: '1.5',
            fontWeight: 'light',
            margin: 0
          }}>
            {completionMessage}
          </p>
        </div>

        {/* Educational Note */}
        <div style={{
          backgroundColor: '#0d0d0d',
          border: '1px solid rgba(59, 130, 246, 0.3)',
          padding: '0.75rem',
          marginBottom: '1.5rem'
        }}>
          <p style={{ 
            fontSize: '0.75rem',
            color: '#93c5fd',
            lineHeight: '1.5',
            fontWeight: 'light',
            margin: 0
          }}>
            {educationalNote}
          </p>
        </div>

        {/* Buttons */}
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button
            onClick={onLevelSelect}
            style={{
              flex: 1,
              padding: '0.5rem',
              backgroundColor: '#2a2a2a',
              color: 'white',
              fontSize: '0.75rem',
              fontWeight: 'normal',
              border: '1px solid #4b5563',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#3a3a3a')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#2a2a2a')}
          >
            Leveli
          </button>
          {!isLastLevel && (
            <button
              onClick={onNextLevel}
              style={{
                flex: 1,
                padding: '0.5rem',
                backgroundColor: '#3b82f6',
                color: 'white',
                fontSize: '0.75rem',
                fontWeight: 'normal',
                border: '1px solid #3b82f6',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#2563eb')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#3b82f6')}
            >
              Sljedeći
            </button>
          )}
          {isLastLevel && (
            <div style={{
              flex: 1,
              padding: '0.5rem',
              backgroundColor: '#16a34a',
              color: 'white',
              fontSize: '0.75rem',
              fontWeight: 'normal',
              border: '1px solid #16a34a',
              textAlign: 'center',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              Gotovo!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
