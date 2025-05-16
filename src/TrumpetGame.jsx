import SheetMusic from './SheetMusic';
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
  // Timer state (not displayed in UI yet)
  const [timerStarted, setTimerStarted] = React.useState(false);
  const [timeLeft, setTimeLeft] = React.useState(30);

  // Key listeners for valves and spacebar
  React.useEffect(() => {
    function handleKeyDown(e) {
      if (e.repeat) return;
      if (e.key === '1' || e.key === '2' || e.key === '3') {
        const idx = parseInt(e.key, 10) - 1;
        setValves(v => v.map((pressed, i) => (i === idx ? true : pressed)));
      }
      if (e.code === 'Space' || e.key === ' ') {
        // On spacebar, check if valves match fingering
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
      if (e.key === '1' || e.key === '2' || e.key === '3') {
        const idx = parseInt(e.key, 10) - 1;
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
      <h1>Trumpet Game</h1>
      <SheetMusic note={currentNote} />
      <ValveBlock valves={valves} />
    </div>
  );
}
