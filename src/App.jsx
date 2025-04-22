import './style.css';
import StickerCard from './StickerCard';
import stickers from './stickers.json';

function App() {
  return (
    <>
      <div className="logo">
        <figure className="image image--square">
          <img src="/images/jazz_stickers_logo.png" alt="jazzstickers.com logo" />
        </figure>
      </div>
      <div className="cta">
        <a href="https://www.etsy.com/shop/JazzStickersDotCom" target="_blank" rel="noopener noreferrer">
          <span className="pulsing">&gt;</span>
          Visit our Etsy Shop!
          <span className="pulsing">&lt;</span>
        </a>
      </div>
      <div className="gallery">
        {stickers.map((sticker, idx) => (
          <a
            key={sticker.name + idx}
            href="https://www.etsy.com/shop/JazzStickersDotCom"
            target="_blank"
            rel="noopener noreferrer"
          >
            <StickerCard {...sticker} />
          </a>
        ))}

      </div>
    </>
  );
}

export default App
