import SheetMusic from './SheetMusic';
import GameInterface from './GameInterface';
import ValveBlock from './ValveBlock';

import React from 'react';
import trumpetNotes from './trumpetNotes.json';
import { playTrumpetFrequency, playWrongAnswerSound } from './audioUtils';

export default function TrumpetGame() {
  const [score, setScore] = React.useState(0);
  const noteNames = React.useMemo(() => Object.keys(trumpetNotes), []);
  const [valves, setValves] = React.useState([false, false, false]);
  const [currentNote, setCurrentNote] = React.useState(() => {
    const idx = Math.floor(Math.random() * noteNames.length);
    return noteNames[idx];
  });
  const [lastNote, setLastNote] = React.useState(null);
  const [gameState, setGameState] = React.useState('preGame'); // 'preGame', 'inGame', 'postGame'
  // Timer state
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
          setScore(s => s + 1);
          // Play sound for correct answer
          playTrumpetFrequency(trumpetNotes[currentNote].frequency);
          // Pick a new random note, not the same as current
          let nextNote;
          do {
            nextNote = noteNames[Math.floor(Math.random() * noteNames.length)];
          } while (nextNote === currentNote || nextNote === lastNote);
          setLastNote(currentNote);
          setCurrentNote(nextNote);
          setValves([false, false, false]);
        } else {
          setScore(s => s - 1);
          playWrongAnswerSound();
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

  // Timer effect: decrement once per second in inGame
  React.useEffect(() => {
    if (gameState !== 'inGame') return;
    if (timeLeft === 0) {
      setGameState('postGame');
      return;
    }
    const interval = setInterval(() => {
      setTimeLeft((t) => (t > 0 ? t - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [gameState, timeLeft]);

  return (
    <div>
      <GameInterface
        note={currentNote}
        gameState={gameState}
        timeLeft={timeLeft}
        score={score}
        onStart={() => {
          setTimeLeft(30);
          setScore(0);
          setGameState('inGame');
        }}
        onRestart={() => {
          setTimeLeft(30);
          setScore(0);
          setGameState('inGame');
        }}
      />
      <ValveBlock valves={valves} />
    </div>
  );
}
