function ValveCap({ height }) {
  return (
    <div
      style={{
        width: 60,
        height,
        background: 'linear-gradient(90deg, #bbb 0%, #eee 100%)',
        borderRadius: 6,
        boxShadow: '0 2px 8px rgba(0,0,0,0.10)',
        border: '2px solid #888',
        margin: '0 8px',
        boxSizing: 'border-box',
      }}
    />
  );
}

function ValveChamber({ height }) {
  return (
    <div
      style={{
        width: 70,
        height,
        background: 'linear-gradient(90deg, #aaa 0%, #eee 100%)',
        borderRadius: 6,
        boxShadow: '0 2px 8px rgba(0,0,0,0.07)',
        border: '2px solid #888',
        margin: 0,
        boxSizing: 'border-box',
      }}
    />
  );
}

function Piston({ height }) {
  return (
    <div
      style={{
        width: 20,
        height,
        background: 'linear-gradient(90deg, #ccc 0%, #eee 100%)',
        borderRadius: 0,
        margin: 0,
        boxShadow: '0 1px 4px rgba(0,0,0,0.10)',
        borderLeft: '2px solid #aaa',
        borderRight: '2px solid #aaa',
        transition: 'height 0.05s ease-in-out',
        overflow: 'hidden',
        boxSizing: 'border-box',
      }}
    />
  );
}

import React from 'react';

export default function Valve({ depressed = false }) {
  const pistonFullHeight = 40
  const pistonHeight = depressed ? 0 : pistonFullHeight;
  const capHeight = 20;
  const chamberHeight = 200
  const fullHeight = capHeight + pistonFullHeight + chamberHeight;

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-end',
      minHeight: fullHeight,
      height: fullHeight,
      width: 80,
      boxSizing: 'border-box',
    }}>
      <ValveCap height={capHeight} />
      <Piston height={pistonHeight} />
      <ValveChamber height={chamberHeight} />
    </div>
  );
}


