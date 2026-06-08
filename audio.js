/* ============================================================
   SFX — Motor de sonido sintetizado (Web Audio API)
   Sin archivos externos. Todo generado en tiempo real.
   API:  SFX.correct() SFX.wrong() SFX.flip() SFX.fanfare()
         SFX.tick() SFX.click() SFX.toggleMusic() SFX.setMuted()
============================================================ */
(function () {
  let ctx = null;
  let master = null;
  let musicGain = null;
  let muted = false;
  let musicOn = false;
  let musicTimer = null;
  let musicStep = 0;

  function ensure() {
    if (ctx) return;
    const AC = window.AudioContext || window.webkitAudioContext;
    ctx = new AC();
    master = ctx.createGain();
    master.gain.value = 0.9;
    master.connect(ctx.destination);
    musicGain = ctx.createGain();
    musicGain.gain.value = 0.0;
    musicGain.connect(master);
  }
  function resume() { ensure(); if (ctx.state === "suspended") ctx.resume(); }

  // --- basic voice ---
  function tone(freq, t0, dur, type, peak, glideTo) {
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = type || "sine";
    o.frequency.setValueAtTime(freq, t0);
    if (glideTo) o.frequency.exponentialRampToValueAtTime(glideTo, t0 + dur);
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.exponentialRampToValueAtTime(peak || 0.3, t0 + 0.012);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    o.connect(g); g.connect(master);
    o.start(t0); o.stop(t0 + dur + 0.02);
  }

  function noise(t0, dur, peak, hp) {
    const n = Math.floor(ctx.sampleRate * dur);
    const buf = ctx.createBuffer(1, n, ctx.sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < n; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / n);
    const src = ctx.createBufferSource(); src.buffer = buf;
    const g = ctx.createGain(); g.gain.value = peak || 0.2;
    const f = ctx.createBiquadFilter(); f.type = "highpass"; f.frequency.value = hp || 800;
    src.connect(f); f.connect(g); g.connect(master);
    src.start(t0); src.stop(t0 + dur);
  }

  const SFX = {
    setMuted(m) {
      muted = m; ensure();
      master.gain.setTargetAtTime(m ? 0 : 0.9, ctx.currentTime, 0.02);
    },
    isMuted() { return muted; },

    click() {
      if (muted) return; resume();
      const t = ctx.currentTime;
      tone(420, t, 0.07, "triangle", 0.18, 540);
    },

    flip() {
      if (muted) return; resume();
      const t = ctx.currentTime;
      noise(t, 0.12, 0.12, 1200);
      tone(300, t, 0.16, "triangle", 0.14, 680);
    },

    correct() {
      if (muted) return; resume();
      const t = ctx.currentTime;
      // bright ascending arpeggio
      tone(523.25, t,        0.14, "triangle", 0.28);
      tone(659.25, t + 0.09, 0.14, "triangle", 0.28);
      tone(783.99, t + 0.18, 0.22, "triangle", 0.30);
      tone(1046.5, t + 0.27, 0.30, "sine",     0.22);
      noise(t, 0.18, 0.06, 4000);
    },

    wrong() {
      if (muted) return; resume();
      const t = ctx.currentTime;
      tone(196, t,        0.18, "sawtooth", 0.20, 150);
      tone(146, t + 0.12, 0.30, "sawtooth", 0.20, 110);
    },

    tick() {
      if (muted) return; resume();
      const t = ctx.currentTime;
      tone(900, t, 0.04, "square", 0.10, 900);
    },

    timeout() {
      if (muted) return; resume();
      const t = ctx.currentTime;
      tone(330, t, 0.5, "sawtooth", 0.18, 90);
    },

    fanfare() {
      if (muted) return; resume();
      const t = ctx.currentTime;
      const seq = [523.25, 659.25, 783.99, 1046.5, 1318.5];
      seq.forEach((f, i) => tone(f, t + i * 0.11, 0.34, "triangle", 0.30));
      // shimmer
      tone(1567.98, t + 0.55, 0.5, "sine", 0.18);
      noise(t + 0.5, 0.4, 0.05, 5000);
    },

    streak() {
      if (muted) return; resume();
      const t = ctx.currentTime;
      tone(880, t, 0.1, "triangle", 0.22, 1320);
      tone(1320, t + 0.07, 0.16, "sine", 0.2);
    },

    // ---- ambient background music: slow pad + arpeggio ----
    isMusicOn() { return musicOn; },
    toggleMusic() {
      ensure(); resume();
      musicOn ? this._stopMusic() : this._startMusic();
      return musicOn;
    },
    _startMusic() {
      musicOn = true;
      musicGain.gain.setTargetAtTime(0.10, ctx.currentTime, 1.2);
      const scale = [261.63, 329.63, 392.0, 493.88, 587.33, 392.0, 329.63, 246.94];
      const chords = [
        [130.81, 196.0, 246.94],   // C
        [146.83, 220.0, 293.66],   // Dm-ish
        [174.61, 261.63, 329.63],  // F
        [196.0,  246.94, 392.0]    // G
      ];
      const stepDur = 0.42;
      let chordIdx = 0;
      const playStep = () => {
        if (!musicOn) return;
        const t = ctx.currentTime + 0.02;
        // arpeggio note
        const f = scale[musicStep % scale.length];
        const o = ctx.createOscillator(); const g = ctx.createGain();
        o.type = "triangle"; o.frequency.value = f;
        g.gain.setValueAtTime(0.0001, t);
        g.gain.exponentialRampToValueAtTime(0.5, t + 0.05);
        g.gain.exponentialRampToValueAtTime(0.0001, t + stepDur * 0.9);
        o.connect(g); g.connect(musicGain);
        o.start(t); o.stop(t + stepDur);
        // pad every 4 steps
        if (musicStep % 4 === 0) {
          const ch = chords[chordIdx % chords.length]; chordIdx++;
          ch.forEach((cf) => {
            const po = ctx.createOscillator(); const pg = ctx.createGain();
            po.type = "sine"; po.frequency.value = cf;
            pg.gain.setValueAtTime(0.0001, t);
            pg.gain.exponentialRampToValueAtTime(0.18, t + 0.4);
            pg.gain.exponentialRampToValueAtTime(0.0001, t + stepDur * 4 * 0.95);
            po.connect(pg); pg.connect(musicGain);
            po.start(t); po.stop(t + stepDur * 4);
          });
        }
        musicStep++;
        musicTimer = setTimeout(playStep, stepDur * 1000);
      };
      playStep();
    },
    _stopMusic() {
      musicOn = false;
      if (musicTimer) clearTimeout(musicTimer);
      if (musicGain) musicGain.gain.setTargetAtTime(0.0, ctx.currentTime, 0.6);
    }
  };

  window.SFX = SFX;
})();
