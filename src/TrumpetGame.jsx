import SheetMusic from './SheetMusic';
import ValveBlock from './ValveBlock';

import React from 'react';

export default function TrumpetGame() {
  const [valves, setValves] = React.useState([false, false, false]);

  React.useEffect(() => {
    function handleKeyDown(e) {
      if (e.repeat) return;
      if (e.key === '1' || e.key === '2' || e.key === '3') {
        const idx = parseInt(e.key, 10) - 1;
        setValves(v => v.map((pressed, i) => (i === idx ? true : pressed)));
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
  }, []);

  return (
    <div>
      <h1>Trumpet Game</h1>
      <SheetMusic note="F#3"/>
      <ValveBlock valves={valves} />
    </div>
  );
}
