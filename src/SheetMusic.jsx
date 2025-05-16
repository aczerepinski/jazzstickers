import trumpetNotes from './trumpetNotes.json';

function LedgerLine({ top }) {
  // ovalWidth is 24, so ledger line is 48px
  const lineWidth = 48;
  return (
    <div
      style={{
        width: lineWidth,
        height: 5,
        background: '#444',
        borderRadius: 2,
        margin: '0 auto',
        position: 'absolute',
        left: '50%',
        transform: 'translateX(-50%)',
        top: top,
        zIndex: 2,
        boxSizing: 'border-box'
      }}
    />
  );
}

function LedgerLines({ number, isAbove }) {
  const staffLineGap = 16;
  const staffTopY = -4;
  const staffBottomY = 6 + (5 * staffLineGap); // 64
  const lines = [];
  for (let i = 0; i < number; i++) {
    let topPx;
    if (isAbove) {
      topPx = staffTopY - (i + 1) * staffLineGap;
    } else {
      topPx = staffBottomY + (i + 1) * staffLineGap;
    }
    lines.push(<LedgerLine key={i} top={topPx} />);
  }
  return <>{lines}</>;
}


function StaffLine() {
  return (
    <div
      style={{
        width: '100%',
        height: 5,
        background: '#444',
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
        left: isUp ? ovalWidth - 5 : 0, // right edge for up, left edge for down
        top: isUp ? -stemHeight + 3 : ovalHeight - 6, // up stems start above, down stems start below
        width: 4,
        height: stemHeight,
        background: 'black',
        borderRadius: 2,
        zIndex: 2,
      }}
    />
  );
}

function Accidental({ note, ovalHeight }) {
  if (!note.includes('#')) return null;
  return (
    <span
      style={{
        position: 'absolute',
        left: -30,
        top: -15,
        fontSize: ovalHeight * 3,
        color: 'black',
        fontFamily: 'serif',
        zIndex: 4,
        lineHeight: 1,
        userSelect: 'none',
        pointerEvents: 'none',
      }}
      aria-label="sharp"
    >
      {'\u266F'}
    </span>
  );
}

function MusicalNote({ note }) {
  const ovalHeight = 16;
  const ovalWidth = 24;
  const noteData = trumpetNotes[note] || { offset: 0, ledgerLines: 0 };
  // Staff center is 50%, staff height is 89px, gap between lines is 16px
  // The note's vertical center is: calc(50% - offset - ovalHeight/2)

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
      <Accidental note={note} ovalHeight={ovalHeight} />
      <Oval ovalHeight={ovalHeight} ovalWidth={ovalWidth} />
      <Stem ovalHeight={ovalHeight} ovalWidth={ovalWidth} offset={noteData.offset} />
    </div>
  );
}

function Staff({ note }) {
  // Staff height: 5 lines, each 5px tall + 4 gaps of 16px = 5*5 + 4*16 = 25 + 64 = 89px
  const staffHeight = 89;
  let ledgerLines = null;
  if (note && trumpetNotes[note] && trumpetNotes[note].ledgerLines > 0) {
    const noteData = trumpetNotes[note];
    ledgerLines = <LedgerLines number={noteData.ledgerLines} isAbove={noteData.offset > 0} />;
  }
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
      {ledgerLines}
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

        padding: '4rem 2rem',
        margin: '0 auto',
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
