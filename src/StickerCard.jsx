import React from "react";

export default function StickerCard({ name, image, alt }) {
  return (
    <figure className="image image--landscape">
      <img src={image} alt={alt} />
      <figcaption>{name}</figcaption>
    </figure>
  );
}
