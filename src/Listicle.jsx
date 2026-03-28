import React from "react";
import ListicleItem from "./ListicleItem";
import colors from "./colors";

export default function Listicle({ title, intro, items, authorName, authorImage }) {
  return (
    <div style={{ maxWidth: 760, margin: '0 auto', padding: '2rem 1rem' }}>
      <h1 style={{ color: colors.white }}>{title}</h1>
      {(intro || authorName) && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', marginBottom: '2rem' }}>
          {authorName && (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', flexShrink: 0, background: colors.white, borderRadius: 10, padding: '1rem 1.25rem' }}>
              {authorImage && <img src={authorImage} alt={authorName} style={{ width: 64, height: 64, borderRadius: '50%', objectFit: 'cover' }} />}
              <span style={{ fontSize: 13, color: colors.grayDark }}>{authorName}</span>
            </div>
          )}
          {intro && <p style={{ margin: 0, color: colors.white, fontSize: 17, lineHeight: 1.6 }}>{intro}</p>}
        </div>
      )}
      {items.map(item => (
        <ListicleItem key={item.title} {...item} />
      ))}
    </div>
  );
}
