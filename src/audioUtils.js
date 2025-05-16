// Utility to play a trumpet note at a given frequency using Web Audio API
export function playTrumpetFrequency(frequency, duration = 0.2) {
  const ctx = new (window.AudioContext || window.webkitAudioContext)();
  const oscillator = ctx.createOscillator();
  const gain = ctx.createGain();

  oscillator.type = 'triangle'; // 'triangle' is softer, more brass-like than 'sine'
  oscillator.frequency.value = frequency;

  gain.gain.setValueAtTime(0.12, ctx.currentTime); // initial volume
  gain.gain.linearRampToValueAtTime(0, ctx.currentTime + duration); // fade out

  oscillator.connect(gain);
  gain.connect(ctx.destination);

  oscillator.start();
  oscillator.stop(ctx.currentTime + duration);

  oscillator.onended = () => ctx.close();
}
