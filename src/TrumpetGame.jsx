import SheetMusic from './SheetMusic';
import GameInterface from './GameInterface';
import ValveBlock from './ValveBlock';

import React from 'react';
import trumpetNotes from './trumpetNotes.json';

export default function TrumpetGame() {
  const noteNames = React.useMemo(() => Object.keys(trumpetNotes), []);
  const [valves, setValves] = React.useState([false, false, false]);
  const [currentNote, setCurrentNote] = React.useState(() => {
    const idx = Math.floor(Math.random() * noteNames.length);
    return noteNames[idx];
  });
  const [lastNote, setLastNote] = React.useState(null);
  const [gameState, setGameState] = React.useState('preGame'); // 'preGame', 'inGame', 'postGame'
  // Timer state (not displayed in UI yet)
  const [timerStarted, setTimerStarted] = React.useState(false);
  const [timeLeft, setTimeLeft] = React.useState(30);

  // Key listeners for valves and spacebar
  React.useEffect(() => {
    function handleKeyDown(e) {
      if (e.repeat) return;
      // Accept 1/2/3 and 7/8/9 for valves
      const valveKeys = ['1', '2', '3', '7', '8', '9'];
      if (valveKeys.includes(e.key)) {
        let idx;
        if (e.key === '1' || e.key === '7') idx = 0;
        else if (e.key === '2' || e.key === '8') idx = 1;
        else if (e.key === '3' || e.key === '9') idx = 2;
        setValves(v => v.map((pressed, i) => (i === idx ? true : pressed)));
      }
      // Accept spacebar and 0 for submit
      if (e.code === 'Space' || e.key === ' ' || e.key === '0') {
        // On spacebar/0, check if valves match fingering
        const correctFingering = trumpetNotes[currentNote].fingering;
        const match = valves.every((valve, i) => valve === correctFingering[i]);
        if (match) {
          // Pick a new random note, not the same as current
          let nextNote;
          do {
            const idx = Math.floor(Math.random() * noteNames.length);
            nextNote = noteNames[idx];
          } while (nextNote === currentNote && noteNames.length > 1);
          setLastNote(currentNote);
          setCurrentNote(nextNote);
          setValves([false, false, false]);
        }
      }
    }
    function handleKeyUp(e) {
      // Accept 1/2/3 and 7/8/9 for valves
      const valveKeys = ['1', '2', '3', '7', '8', '9'];
      if (valveKeys.includes(e.key)) {
        let idx;
        if (e.key === '1' || e.key === '7') idx = 0;
        else if (e.key === '2' || e.key === '8') idx = 1;
        else if (e.key === '3' || e.key === '9') idx = 2;
        setValves(v => v.map((pressed, i) => (i === idx ? false : pressed)));
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [currentNote, noteNames, valves]);

  // Timer effect (optional, not displayed)
  React.useEffect(() => {
    if (!timerStarted) return;
    if (timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft(t => t - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timerStarted, timeLeft]);

  // Start timer on mount (optional)
  React.useEffect(() => {
    setTimerStarted(true);
  }, []);

  return (
    <div>
      <GameInterface note={currentNote} gameState={gameState} onStart={() => setGameState('inGame')} />
      <ValveBlock valves={valves} />
    </div>
  );
}
