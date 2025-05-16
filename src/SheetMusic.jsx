import trumpetNotes from './trumpetNotes.json';

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

function Oval({ ovalHeight, ovalWidth }) {
  return (
    <div
      style={{
        width: ovalWidth,
        height: ovalHeight,
        background: 'black',
        borderRadius: ovalHeight / 2,
        zIndex: 3,
        border: '3px solid black',
        boxSizing: 'border-box',
        position: 'relative',
        transform: 'rotate(-20deg)',
      }}
    />
  );
}

function Stem({ ovalHeight, ovalWidth, offset }) {
  // Stem height is the distance between 4 staff lines (3 gaps + 1 line)
  const stemHeight = 3 * 16 + 5; // 53px
  const isUp = offset < 0;
  return (
    <div
      style={{
        position: 'absolute',
        left: isUp ? ovalWidth - 2 : 0, // right edge for up, left edge for down
        top: isUp ? -stemHeight + 2 : ovalHeight - 6, // up stems start above, down stems start below
        width: 4,
        height: stemHeight,
        background: 'black',
        borderRadius: 2,
        zIndex: 2,
      }}
    />
  );
}

function MusicalNote({ note }) {
  const ovalHeight = 16;
  const ovalWidth = 24;
  const noteData = trumpetNotes[note] || { offset: 0 };
  return (
    <div
      style={{
        position: 'absolute',
        left: '50%',
        top: `calc(50% - ${noteData.offset}px - ${ovalHeight / 2}px)`,
        width: ovalWidth,
        height: ovalHeight,
        transform: 'translateX(-50%)',
        zIndex: 3,
        pointerEvents: 'none',
      }}
      aria-label={note}
    >
      <Oval ovalHeight={ovalHeight} ovalWidth={ovalWidth} />
      <Stem ovalHeight={ovalHeight} ovalWidth={ovalWidth} offset={noteData.offset} />
    </div>
  );
}

function Staff({ note }) {
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
      {note && <MusicalNote note={note} />}
    </div>
  );
}

export default function SheetMusic({ note }) {
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
      <Staff note={note} />
    </div>
  );
}
