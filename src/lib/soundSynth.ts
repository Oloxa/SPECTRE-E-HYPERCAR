// Web Audio API Quad-Motor Hypercar Acceleration Synthesizer

class HypercarSoundEngine {
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private primaryOsc: OscillatorNode | null = null;
  private subOsc: OscillatorNode | null = null;
  private harmonicsOsc: OscillatorNode | null = null;
  private gainNode: GainNode | null = null;
  private filterNode: BiquadFilterNode | null = null;
  private intervalId: number | null = null;

  public init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public startLaunch(onSpeedUpdate?: (speed: number, rpm: number) => void, onComplete?: () => void) {
    this.init();
    if (!this.ctx) return;

    this.stop();

    this.isPlaying = true;
    const now = this.ctx.currentTime;

    // Master gain
    this.gainNode = this.ctx.createGain();
    this.gainNode.gain.setValueAtTime(0.001, now);
    this.gainNode.gain.exponentialRampToValueAtTime(0.35, now + 0.15);

    // Filter - sweeping resonant high-voltage filter
    this.filterNode = this.ctx.createBiquadFilter();
    this.filterNode.type = 'lowpass';
    this.filterNode.frequency.setValueAtTime(300, now);
    this.filterNode.frequency.exponentialRampToValueAtTime(8000, now + 1.74);
    this.filterNode.Q.setValueAtTime(4, now);

    // Primary High-Voltage Motor Whine (Sawtooth)
    this.primaryOsc = this.ctx.createOscillator();
    this.primaryOsc.type = 'sawtooth';
    this.primaryOsc.frequency.setValueAtTime(110, now); // Low hum
    this.primaryOsc.frequency.exponentialRampToValueAtTime(1450, now + 1.74); // Rapid 1.74s launch

    // Sub Motor Drive (Sine for deep bass torque)
    this.subOsc = this.ctx.createOscillator();
    this.subOsc.type = 'sine';
    this.subOsc.frequency.setValueAtTime(55, now);
    this.subOsc.frequency.exponentialRampToValueAtTime(320, now + 1.74);

    // High Harmonics Turbine Whine (Triangle pitch shimmer)
    this.harmonicsOsc = this.ctx.createOscillator();
    this.harmonicsOsc.type = 'triangle';
    this.harmonicsOsc.frequency.setValueAtTime(220, now);
    this.harmonicsOsc.frequency.exponentialRampToValueAtTime(2900, now + 1.74);

    // Route audio graph
    this.primaryOsc.connect(this.filterNode);
    this.subOsc.connect(this.filterNode);
    this.harmonicsOsc.connect(this.filterNode);
    this.filterNode.connect(this.gainNode);
    this.gainNode.connect(this.ctx.destination);

    // Start oscillators
    this.primaryOsc.start(now);
    this.subOsc.start(now);
    this.harmonicsOsc.start(now);

    // Dynamic state feedback loop over 1.74 seconds
    const duration = 1740; // ms
    const startTime = Date.now();

    this.intervalId = window.setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(1, elapsed / duration);
      
      // Speed from 0 to 60 MPH
      const currentSpeed = Math.round(progress * 60);
      // RPM from 1000 to 22,000 RPM (Ultra-high speed quad electric motors)
      const currentRpm = Math.round(1000 + progress * 21000);

      if (onSpeedUpdate) {
        onSpeedUpdate(currentSpeed, currentRpm);
      }

      if (progress >= 1) {
        if (this.intervalId) clearInterval(this.intervalId);
        // Fade out slightly after hitting 60mph
        if (this.gainNode && this.ctx) {
          this.gainNode.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.8);
        }
        setTimeout(() => {
          this.stop();
          if (onComplete) onComplete();
        }, 800);
      }
    }, 30);
  }

  public stop() {
    this.isPlaying = false;
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    try {
      if (this.primaryOsc) {
        this.primaryOsc.stop();
        this.primaryOsc.disconnect();
      }
      if (this.subOsc) {
        this.subOsc.stop();
        this.subOsc.disconnect();
      }
      if (this.harmonicsOsc) {
        this.harmonicsOsc.stop();
        this.harmonicsOsc.disconnect();
      }
    } catch {
      // Ignore cleanup error if already stopped
    }
  }
}

export const soundEngine = new HypercarSoundEngine();
