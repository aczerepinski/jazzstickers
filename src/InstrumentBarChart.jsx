import React from "react";
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import colors from "./colors";

export default function InstrumentBarChart({ scores }) {
  const data = Object.entries(scores)
    .map(([name, value]) => ({ name, compatibility: value }))
    .sort((a, b) => b.compatibility - a.compatibility)
    .slice(0, 5);

  return (
    <div
      style={{
        width: '100%',
        maxWidth: 400, // Match SurveyCard
        background: '#fff',
        borderRadius: 12,
        boxShadow: '0 2px 12px rgba(0,0,0,0.09)',
        padding: '2rem',
        margin: '2rem auto',
        minHeight: 340,
        boxSizing: 'border-box'
      }}
    >
      <style>{`
        @media (min-width: 800px) {
          .quiz-layout > *:last-child {
            display: flex !important;
            flex-direction: column !important;
          }
        }
      `}</style>
      <h2 style={{ fontSize: 20, margin: "0 0 10px 0", color: "#361F0B", textAlign: 'center' }}>Instrument Compatibility</h2>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={data} margin={{ top: 20, right: 20, bottom: 60, left: 40 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" angle={-30} textAnchor="end" interval={0} height={60} style={{ fontSize: 13 }} />
          <Tooltip />
          <Bar dataKey="compatibility" fill={colors.blue} radius={[2, 2, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
