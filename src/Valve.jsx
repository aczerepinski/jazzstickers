function ValveCap() {
  return (
    <div
      style={{
        width: 60,
        height: 20,
        background: 'linear-gradient(90deg, #bbb 0%, #eee 100%)',
        borderRadius: 10,
        boxShadow: '0 2px 8px rgba(0,0,0,0.10)',
        border: '2px solid #888',
        margin: '0 8px',
      }}
    />
  );
}

function ValveChamber() {
  return (
    <div
      style={{
        width: 70,
        height: 200,
        background: 'linear-gradient(90deg, #aaa 0%, #eee 100%)',
        borderRadius: 14,
        boxShadow: '0 2px 8px rgba(0,0,0,0.07)',
        border: '2px solid #888',
        margin: 0,
      }}
    />
  );
}

function Piston({ depressed }) {
  return (
    <div
      style={{
        width: 20,
        height: depressed ? 0 : 40,
        background: 'linear-gradient(90deg, #ccc 0%, #eee 100%)',
        borderRadius: 0,
        margin: 0,
        boxShadow: '0 1px 4px rgba(0,0,0,0.10)',
        borderLeft: '2px solid #aaa',
        borderRight: '2px solid #aaa',
        transition: 'height 0.15s cubic-bezier(.4,2,.6,1)',
        overflow: 'hidden',
      }}
    />
  );
}

import React from 'react';

export default function Valve({ depressed = false }) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-end',
      minHeight: 260,
      height: 260,
      width: 80,
    }}>
      <ValveCap />
      <Piston depressed={depressed} />
      <ValveChamber />
    </div>
  );
}


