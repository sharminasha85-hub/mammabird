/**
 * Ambient Audio Synthesizer for mammaBird
 * Uses Web Audio API to create gentle, soothing birdsong chimes and soft warm lullaby tones.
 * Completely self-contained, no external audio downloads required.
 */
class AmbientSoundManager {
  constructor() {
    this.ctx = null;
    this.isPlaying = false;
    this.intervalId = null;
    this.masterGain = null;
  }

  init() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.ctx = new AudioContext();
        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.setValueAtTime(0.08, this.ctx.currentTime);
        this.masterGain.connect(this.ctx.destination);
      }
    }
  }

  playGentleChime(freq = 587.33, duration = 1.2) {
    if (!this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      
      // Soft gentle attack & bell-like decay
      gain.gain.setValueAtTime(0.001, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.12, this.ctx.currentTime + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch (e) {
      console.warn('Audio playback error', e);
    }
  }

  playSoftBirdChirp() {
    if (!this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      // Pitch bend mimicking a gentle songbird chirp
      const startFreq = 2200 + Math.random() * 400;
      osc.frequency.setValueAtTime(startFreq, now);
      osc.frequency.exponentialRampToValueAtTime(startFreq + 600, now + 0.06);
      osc.frequency.exponentialRampToValueAtTime(startFreq - 200, now + 0.14);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.04, now + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.16);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + 0.18);
    } catch (e) {
      console.warn('Bird chirp error', e);
    }
  }

  start() {
    this.init();
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    this.isPlaying = true;

    // Play initial gentle warm chime chord
    const notes = [523.25, 659.25, 783.99, 1046.5]; // C, E, G, High C
    notes.forEach((note, i) => {
      setTimeout(() => {
        if (this.isPlaying) this.playGentleChime(note, 2.0);
      }, i * 350);
    });

    // Schedule periodic soft melodic chimes & occasional distant bird chirps
    this.intervalId = setInterval(() => {
      if (!this.isPlaying) return;
      
      const chordPitches = [
        [587.33, 739.99, 880.0], // D F# A
        [523.25, 659.25, 783.99], // C E G
        [440.00, 554.37, 659.25], // A C# E
        [659.25, 830.61, 987.77], // E G# B
      ];
      
      const chord = chordPitches[Math.floor(Math.random() * chordPitches.length)];
      chord.forEach((pitch, idx) => {
        setTimeout(() => {
          if (this.isPlaying) this.playGentleChime(pitch, 2.5);
        }, idx * 280);
      });

      // Occasional sweet bird flutter
      if (Math.random() > 0.4) {
        setTimeout(() => {
          if (this.isPlaying) {
            this.playSoftBirdChirp();
            setTimeout(() => this.isPlaying && this.playSoftBirdChirp(), 140);
          }
        }, 1200);
      }
    }, 4800);
  }

  stop() {
    this.isPlaying = false;
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  toggle() {
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.start();
      return true;
    }
  }
}

export const ambientSound = new AmbientSoundManager();
