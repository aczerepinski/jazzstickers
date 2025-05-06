import React, { useState } from "react";

function TooltipIcon({ tip }) {
  const [hover, setHover] = React.useState(false);
  return (
    <span style={{ position: 'relative', marginLeft: 8, verticalAlign: 'middle', cursor: 'pointer' }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      tabIndex={0}
      aria-label="Show tip"
    >
      <span style={{
        display: 'inline-block',
        width: 18,
        height: 18,
        borderRadius: '50%',
        background: '#888',
        color: '#fff',
        fontWeight: 700,
        fontSize: 14,
        textAlign: 'center',
        lineHeight: '18px',
        boxShadow: '0 1px 4px rgba(0,0,0,0.10)',
        userSelect: 'none'
      }}>?</span>
      {hover && (
        <span style={{
          position: 'absolute',
          left: '120%',
          top: '50%',
          transform: 'translateY(-50%)',
          background: '#fff',
          color: '#361F0B',
          border: '1px solid #ccc',
          borderRadius: 6,
          boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
          padding: '8px 14px',
          fontSize: 14,
          minWidth: 180,
          zIndex: 10,
          whiteSpace: 'pre-line',
        }}>{tip}</span>
      )}
    </span>
  );
}

import * as d3 from "d3";

export default function SurveyCard({ question, options, tooltip, onSubmit, onPrevious, showPrevious, completedCount = 0, totalCount = 1 }) {
  const [selected, setSelected] = useState(null);
  const progressRef = React.useRef();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (selected !== null) {
      onSubmit(selected);
    }
  };

  React.useEffect(() => {
    // D3 progress bar
    const width = 340;
    const height = 24;
    const radius = 8;
    const progress = Math.max(0, Math.min(1, completedCount / totalCount));
    const svg = d3.select(progressRef.current)
      .attr("width", width)
      .attr("height", height);
    svg.selectAll("*").remove();

    // Background bar
    svg.append("rect")
      .attr("x", 0)
      .attr("y", 0)
      .attr("width", width)
      .attr("height", height)
      .attr("rx", radius)
      .attr("fill", "#eee");

    // Progress bar
    svg.append("rect")
      .attr("x", 0)
      .attr("y", 0)
      .attr("width", width * progress)
      .attr("height", height)
      .attr("rx", radius)
      .attr("fill", "#28a9e1");

    // Progress label will be rendered outside the SVG for better alignment.
  }, [completedCount, totalCount]);

  return (
    <form onSubmit={handleSubmit} style={{
      background: '#fff',
      borderRadius: 12,
      boxShadow: '0 2px 12px rgba(0,0,0,0.09)',
      maxWidth: 400,
      margin: '2rem auto',
      minHeight: 300,
      padding: '2rem',
      textAlign: 'left',
      position: 'relative'
    }}>
      <style>{`
        @media (min-width: 800px) {
          .quiz-layout > *:first-child {
            display: flex !important;
            flex-direction: column !important;
          }
        }
      `}</style>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontWeight: 700, fontSize: 20, marginBottom: 8 }}>
        <span>{question}</span>
        {tooltip && (
          <TooltipIcon tip={tooltip} />
        )}
      </div>
      <hr style={{ border: 0, borderTop: '1px solid #eee', margin: '16px 0 32px 0' }} />
      <div style={{ marginBottom: 40 }}>
        {options.map((opt, i) => (
          <label key={i} style={{ display: 'block', marginBottom: 10, cursor: 'pointer', color: '#361F0B', fontSize: 17, fontWeight: 500 }}>
            <input
              type="radio"
              name="survey-option"
              value={opt.value}
              checked={selected === opt.value}
              onChange={() => setSelected(opt.value)}
              style={{ marginRight: 8 }}
            />
            {opt.label}
          </label>
        ))}
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 40, marginBottom: 10 }}>
        {showPrevious ? (
          <button
            type="button"
            onClick={onPrevious}
            style={{
              background: '#eee',
              color: '#361F0B',
              border: 'none',
              borderRadius: 6,
              padding: '0.5em 1.5em',
              fontWeight: 600,
              fontSize: 16,
              cursor: 'pointer',
              boxShadow: '0 1px 4px rgba(0,0,0,0.05)'
            }}
          >
            Previous
          </button>
        ) : <div />}
        {options && options.length > 0 && (
          <button
            type="submit"
            disabled={selected === null}
            style={{
              background: '#28a9e1',
              color: '#fff',
              border: 'none',
              borderRadius: 6,
              padding: '0.5em 1.5em',
              fontWeight: 600,
              fontSize: 16,
              cursor: selected === null ? 'not-allowed' : 'pointer',
              opacity: selected === null ? 0.6 : 1,
              boxShadow: '0 1px 4px rgba(0,0,0,0.05)'
            }}
          >
            Next
          </button>
        )}
      </div>
      {/* Progress Bar with Label */}
      <div style={{ width: '100%', marginTop: 18, display: 'flex', alignItems: 'center' }}>
        <svg ref={progressRef} width={340} height={32} style={{ display: 'block', flex: '0 0 auto' }}></svg>
        <span style={{ marginLeft: 16, fontSize: 15, fontWeight: 600, color: '#361F0B', minWidth: 60, textAlign: 'left' }}>{`${completedCount} / ${totalCount}`}</span>
      </div>
    </form>
  );
}
