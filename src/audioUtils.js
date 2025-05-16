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
