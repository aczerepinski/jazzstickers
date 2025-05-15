import './style.css';
import StickerCard from './StickerCard';
import stickers from './stickers.json';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import InstrumentQuiz from './InstrumentQuiz';
import Navbar from './Navbar';
import TrumpetGame from './TrumpetGame';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div style={{ paddingTop: '100px' }}>
        <Routes>
        <Route path="/" element={
          <div className="gallery">
            {stickers.map((sticker, idx) => (
              <StickerCard {...sticker} key={sticker.name + idx} />
            ))}
          </div>
        } />
        <Route path="/instrument-quiz" element={<InstrumentQuiz />} />
        <Route path="/trumpet-game" element={<TrumpetGame />} />
      </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App
