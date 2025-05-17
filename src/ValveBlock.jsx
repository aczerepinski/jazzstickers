import Valve from './Valve';

export default function ValveBlock({ valves = [false, false, false], onValveDown, onValveUp, onSubmit }) {
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
        position: 'relative',
      }}
    >
      {onSubmit && (
        <button
          onClick={onSubmit}
          style={{
            position: 'absolute',
            top: 10,
            right: 10,
            zIndex: 2,
            background: '#28a9e1',
            color: 'white',
            border: 'none',
            borderRadius: 6,
            padding: '0.35em 1em',
            fontWeight: 600,
            fontSize: 14,
            cursor: 'pointer',
            boxShadow: '0 1px 4px rgba(0,0,0,0.08)'
          }}
          tabIndex={0}
          aria-label="Submit valves"
        >
          Submit
        </button>
      )}
      <Valve
        depressed={valves[0]}
        onMouseDown={() => onValveDown && onValveDown(0)}
        onMouseUp={() => onValveUp && onValveUp(0)}
        onTouchStart={e => { e.preventDefault(); onValveDown && onValveDown(0); }}
        onTouchEnd={e => { e.preventDefault(); onValveUp && onValveUp(0); }}
      />
      <Valve
        depressed={valves[1]}
        onMouseDown={() => onValveDown && onValveDown(1)}
        onMouseUp={() => onValveUp && onValveUp(1)}
        onTouchStart={e => { e.preventDefault(); onValveDown && onValveDown(1); }}
        onTouchEnd={e => { e.preventDefault(); onValveUp && onValveUp(1); }}
      />
      <Valve
        depressed={valves[2]}
        onMouseDown={() => onValveDown && onValveDown(2)}
        onMouseUp={() => onValveUp && onValveUp(2)}
        onTouchStart={e => { e.preventDefault(); onValveDown && onValveDown(2); }}
        onTouchEnd={e => { e.preventDefault(); onValveUp && onValveUp(2); }}
      />
    </div>
  );
}

