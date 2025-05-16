import React from "react"; 
import colors from "./colors";

export default function PreTrumpetGame({ onStart }) {
  return (
    <div style={{
      minHeight: 120,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      justifyContent: 'center',
      width: '100%',
      padding: '2rem',
      background: 'white',
      borderRadius: 12,
    }}>
      <span style={{fontSize: 18, color: '#888', marginBottom: 10}}>
        Welcome to the jazzstickers.com trumpet game! Here's how to play:
      </span>
      <span style={{fontSize: 14, color: '#888', marginBottom: 1}}>
        - Use the 1, 2, and 3 keys (or 7, 8, and 9) on your keyboard to depress the correct trumpet valves.
      </span> 
      <span style={{fontSize: 14, color: '#888', marginBottom: 10}}>
        - Press the spacebar or 0 (zero) to submit your valve selection and play the trumpet.
      </span>
      <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: 16 }}>
        <button
          onClick={onStart}
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
          Let's Go!
        </button>
      </div>
    </div>
  );
}
