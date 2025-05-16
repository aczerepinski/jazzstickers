import React from "react";

export default function Scoreboard({ time = 30, score = 0 }) {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '0 2rem',
      minHeight: 48,
      fontWeight: 600,
      fontSize: 20,
      background: 'white',
    }}>
      <span>Time: {time}s</span>
      <span>Score: {score}</span>
    </div>
  );
}
