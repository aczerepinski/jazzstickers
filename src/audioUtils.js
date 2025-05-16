// Utility to play a trumpet note at a given frequency using Web Audio API
export function playTrumpetFrequency(frequency, duration = 0.3) {
  const ctx = new (window.AudioContext || window.webkitAudioContext)();
  const oscillator = ctx.createOscillator();
  const gain = ctx.createGain();

  oscillator.type = 'sawtooth';
  oscillator.frequency.value = frequency;

  const now = ctx.currentTime;
  const attack = 0.01; // 10ms
  const release = 0.05; // 50ms
  const sustain = Math.max(0, duration - attack - release);

  gain.gain.setValueAtTime(0, now);
  gain.gain.linearRampToValueAtTime(0.25, now + attack); // louder
  gain.gain.setValueAtTime(0.25, now + attack + sustain); // hold
  gain.gain.linearRampToValueAtTime(0, now + attack + sustain + release); // fade out

  oscillator.connect(gain);
  gain.connect(ctx.destination);

  // Resume context if needed (required for Chrome/modern browsers)
  if (ctx.state === 'suspended') {
    ctx.resume().then(() => {
      oscillator.start();
      oscillator.stop(now + attack + sustain + release);
    });
  } else {
    oscillator.start();
    oscillator.stop(now + attack + sustain + release);
  }
  oscillator.onended = () => ctx.close();
}


// Plays a short 'wrong answer' buzz sound
export function playWrongAnswerSound(duration = 0.2) {
  const ctx = new (window.AudioContext || window.webkitAudioContext)();
  const oscillator = ctx.createOscillator();
  const gain = ctx.createGain();

  // Use a square wave for a buzzy sound
  oscillator.type = 'square';
  oscillator.frequency.value = 100; // low frequency for a classic buzz

  // Add vibrato for extra effect
  const vibrato = ctx.createOscillator();
  vibrato.type = 'sine';
  vibrato.frequency.value = 18; // vibrato rate in Hz
  const vibratoGain = ctx.createGain();
  vibratoGain.gain.value = 16; // vibrato depth in Hz
  vibrato.connect(vibratoGain).connect(oscillator.frequency);

  const now = ctx.currentTime;
  gain.gain.setValueAtTime(0, now);
  gain.gain.linearRampToValueAtTime(0.18, now + 0.02); // quick attack
  gain.gain.setValueAtTime(0.18, now + duration - 0.07); // hold
  gain.gain.linearRampToValueAtTime(0, now + duration); // fade out

  oscillator.connect(gain);
  gain.connect(ctx.destination);

  // Resume context if needed
  if (ctx.state === 'suspended') {
    ctx.resume().then(() => {
      oscillator.start();
      vibrato.start();
      oscillator.stop(now + duration);
      vibrato.stop(now + duration);
    });
  } else {
    oscillator.start();
    vibrato.start();
    oscillator.stop(now + duration);
    vibrato.stop(now + duration);
  }
  oscillator.onended = () => ctx.close();
}
