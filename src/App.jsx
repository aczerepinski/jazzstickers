import './style.css';
import StickerCard from './StickerCard';
import stickers from './stickers.json';

function App() {
  return (
    <>
      <nav className="navbar">
        <div className="navbar__logo">
          <img src="/images/jazz_stickers_logo.png" alt="jazzstickers.com logo" className="navbar__logo-img" />
        </div>
      </nav>
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
