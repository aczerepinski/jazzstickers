import React from "react";
import Scoreboard from "./Scoreboard";
import SheetMusic from "./SheetMusic";
import PreTrumpetGame from "./PreTrumpetGame";
import PostTrumpetGame from "./PostTrumpetGame";

export default function GameInterface({ note, gameState = "inGame", onStart }) {
  return (
    <div
      style={{
        width: '100%',
        maxWidth: 400,
        background: '#fff',
        borderRadius: 12,
        boxShadow: '0 2px 12px rgba(0,0,0,0.09)',
        padding: 0,
        margin: '.5rem auto',
        minHeight: 120,
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      <Scoreboard time={30} score={0} />
      <div style={{ borderTop: '1px solid #e0e0e0', width: '100%' }} />
      <div style={{ padding: '0', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 120 }}>
        {gameState === "inGame" ? (
          <SheetMusic note={note} />
        ) : gameState === "preGame" ? (
          <PreTrumpetGame onStart={onStart} />
        ) : (
          <PostTrumpetGame />
        )}
      </div>
    </div>
  );
}
