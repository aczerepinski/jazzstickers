import React from "react";
import colors from "./colors";

export default function ListicleItem({ title, creator, image, body, year, subtitle, genre, ratings }) {
  return (
    <div className="listicle-item" style={{
      display: 'flex',
      flexDirection: 'row',
      gap: '1.5rem',
      background: colors.white,
      borderRadius: 10,
      boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
      padding: '1.5rem',
      marginBottom: '2rem',
    }}>
      <style>{`
        @media (max-width: 800px) {
          .listicle-item { flex-direction: column !important; }
          .listicle-item__image { width: 100% !important; max-width: 100% !important; }
        }
      `}</style>
      {image && (
        <img
          className="listicle-item__image"
          src={image}
          alt={title}
          style={{ width: 160, maxWidth: 160, objectFit: 'cover', borderRadius: 6, alignSelf: 'flex-start' }}
        />
      )}
      <div style={{ flex: 1 }}>
        <h2 style={{ color: colors.brown, marginTop: 0, marginBottom: '0.25rem' }}>{title}</h2>
        <div style={{ color: colors.brown, marginBottom: '0.5rem', fontWeight: 500 }}>{creator}</div>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '0.75rem' }}>
          {subtitle && (
            <span style={{ background: colors.tanLight, color: colors.brown, borderRadius: 4, padding: '2px 8px', fontSize: 13 }}>{subtitle}</span>
          )}
          {year && (
            <span style={{ background: colors.tanLight, color: colors.brown, borderRadius: 4, padding: '2px 8px', fontSize: 13 }}>{year}</span>
          )}
          {genre && (
            <span style={{ background: colors.blueLight, color: colors.blueDark, borderRadius: 4, padding: '2px 8px', fontSize: 13 }}>{genre}</span>
          )}
        </div>
        <p style={{ color: colors.grayDark, lineHeight: 1.6, marginTop: 0 }}>{body}</p>
        {ratings && ratings.length > 0 && (
          <div style={{ marginTop: '0.75rem' }}>
            {ratings.map(({ label, value }) => (
              <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
                <span style={{ fontSize: 13, color: colors.brown, minWidth: 48 }}>{label}</span>
                <div style={{ display: 'flex', gap: 4 }}>
                  {Array.from({ length: 5 }, (_, i) => (
                    <span key={i} style={{
                      display: 'inline-block',
                      width: 12,
                      height: 12,
                      borderRadius: '50%',
                      background: i < value ? colors.blue : colors.gray,
                    }} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
