import Valve from './Valve';

export default function ValveBlock({ valves = [false, false, false] }) {
  return (
    <div
      style={{
        width: '100%',
        maxWidth: 400,
        background: '#fff',
        borderRadius: 12,
        boxShadow: '0 2px 12px rgba(0,0,0,0.09)',
        padding: '2rem',
        margin: '0 auto 2rem auto',
        minHeight: 120,
        boxSizing: 'border-box',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Valve depressed={valves[0]} />
      <Valve depressed={valves[1]} />
      <Valve depressed={valves[2]} />
    </div>
  );
}

