import React from "react";
import colors from "./colors";

function getHighScores() {
  try {
    const match = document.cookie.match(/trumpetHighScores=([^;]*)/);
    if (!match) return [];
    return JSON.parse(decodeURIComponent(match[1]));
  } catch {
    return [];
  }
}

function setHighScores(scores) {
  document.cookie = `trumpetHighScores=${encodeURIComponent(JSON.stringify(scores))};path=/;max-age=31536000`;
}

export default function PostTrumpetGame({ onRestart, score }) {
  const [highScores, setHighScoresState] = React.useState([]);
  const [isNewHighScore, setIsNewHighScore] = React.useState(false);

  React.useEffect(() => {
    const prevScores = getHighScores();
    const now = new Date();
    const dateStr = now.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    let updated = false;
    let qualifies = false;
    // Only add if this exact score/date is NOT already present
    const alreadyPresent = prevScores.some(
      entry => entry.score === score && entry.date === dateStr
    );
    if (
      typeof score === 'number' &&
      !alreadyPresent &&
      (prevScores.length < 5 || score > prevScores[prevScores.length - 1].score)
    ) {
      // Insert and keep top 5, but avoid duplicates
      const newScores = [...prevScores, { score, date: dateStr }]
        .sort((a, b) => b.score - a.score)
        .slice(0, 5);
      setHighScores(newScores);
      setHighScoresState(newScores);
      updated = true;
      qualifies = newScores.some((entry, idx) => entry.score === score && entry.date === dateStr && idx < 5);
    } else {
      setHighScoresState(prevScores);
    }
    setIsNewHighScore(qualifies && score !== 0);
  }, [score]);

  return (
    <div style={{
      minHeight: 120,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      padding: '2rem',
      background: 'white',
      borderRadius: 12,
    }}>
      <div style={{fontSize: 18, color: colors.blue, marginBottom: 18, fontWeight: 600}}>High Scores</div>
      <ol style={{padding: 0, margin: 0, listStyle: 'none', width: '100%', maxWidth: 260, marginBottom: 24}}>
        {(() => {
          let found = false;
          const today = (new Date()).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
          return highScores.map((entry, i) => {
            let isCurrent = false;
            if (!found && entry.score === score && entry.date === today) {
              isCurrent = true;
              found = true;
            }
            return (
              <li
                key={i}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: 16,
                  padding: '2px 0',
                  color: isCurrent ? colors.blue : undefined,
                  fontWeight: isCurrent ? 700 : 400,
                }}
              >
                <span>{entry.date}</span>
                <span style={{fontWeight: 600}}>{entry.score}</span>
              </li>
            );
          });
        })()}

        {highScores.length === 0 && <li style={{color: '#bbb'}}>No scores yet.</li>}
      </ol>
      <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
        <button
          onClick={onRestart}
          style={{
            fontSize: 18,
            padding: '0.75em 2em',
            borderRadius: 8,
            border: 'none',
            background: colors.blue,
            color: 'white',
            fontWeight: 600,
            cursor: 'pointer',
            boxShadow: '0 2px 8px rgba(0,0,0,0.10)',
          }}
        >
          Play Again
        </button>
      </div>
    </div>
  );
}
