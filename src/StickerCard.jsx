import React from "react";

export default function StickerCard({ name, image, alt, etsyLink }) {
  return (
    <figure className="image image--landscape">
      <img src={image} alt={alt} />
      <figcaption>{name}</figcaption>
      <a
        className="etsy-btn"
        href={etsyLink}
        target="_blank"
        rel="noopener noreferrer"
      >
        buy on etsy
      </a>
    </figure>
  );
}
