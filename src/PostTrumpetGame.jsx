import React from "react";
import colors from "./colors";

export default function PostTrumpetGame({ onRestart }) {
  return (
    <div style={{
      minHeight: 120,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      padding: '4rem 2rem',
      background: 'white',
      borderRadius: 12,
    }}>
      <span style={{fontSize: 22, color: '#888', marginBottom: 24}}>Game Over!</span>
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
