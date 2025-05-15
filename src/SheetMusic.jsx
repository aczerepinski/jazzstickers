function StaffLine() {
  return (
    <div
      style={{
        width: '100%',
        height: 5,
        background: '#222',
        borderRadius: 2,
        margin: 0,
        boxSizing: 'border-box',
      }}
    />
  );
}

function TrebleCleff() {
  return (
    <span
      style={{
        position: 'absolute',
        left: 0,
        top: '-30px',
        fontSize: '150px',
        lineHeight: 1,
        zIndex: 2,
        userSelect: 'none',
        color: 'black',
        fontFamily: 'serif',
      }}
      aria-label="treble clef"
    >
      {'\uD834\uDD1E'}
    </span>
  );
}

function Staff() {
  // Staff height: 5 lines, each 5px tall + 4 gaps of 16px = 5*5 + 4*16 = 25 + 64 = 89px
  const staffHeight = 89;
  return (
    <div style={{ position: 'relative', width: '100%', maxWidth: 400, height: staffHeight }}>
      <TrebleCleff />
      <div style={{ width: '100%', height: staffHeight, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 16 }}>
        <StaffLine />
        <StaffLine />
        <StaffLine />
        <StaffLine />
        <StaffLine />
      </div>
    </div>
  );
}

export default function SheetMusic() {
  return (
    <div
      style={{
        width: '100%',
        maxWidth: 400,
        background: '#fff',
        borderRadius: 12,
        boxShadow: '0 2px 12px rgba(0,0,0,0.09)',
        padding: '2rem',
        margin: '2rem auto 16px auto',
        minHeight: 120,
        boxSizing: 'border-box',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Staff />
    </div>
  );
}
