import { useState, useEffect, useCallback, useRef } from 'react';

const SOUND_ENABLED_KEY = 'hypervault_sound_enabled';

export function useSoundEffects() {
  const [soundEnabled, setSoundEnabled] = useState(() => {
    try {
      const saved = localStorage.getItem(SOUND_ENABLED_KEY);
      return saved !== null ? JSON.parse(saved) : true;
    } catch {
      return true;
    }
  });

  const audioCtxRef = useRef(null);

  useEffect(() => {
    try {
      localStorage.setItem(SOUND_ENABLED_KEY, JSON.stringify(soundEnabled));
    } catch {
      // ignore
    }
  }, [soundEnabled]);

  const getAudioContext = useCallback(() => {
    if (!audioCtxRef.current && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        audioCtxRef.current = new AudioCtx();
      }
    }
    if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume().catch(() => {});
    }
    return audioCtxRef.current;
  }, []);

  const playTone = useCallback(
    (freq, type = 'sine', duration = 0.08, gainVal = 0.04) => {
      if (!soundEnabled) return;
      try {
        const ctx = getAudioContext();
        if (!ctx) return;

        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = type;
        osc.frequency.setValueAtTime(freq, ctx.currentTime);

        gain.gain.setValueAtTime(gainVal, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(
          0.0001,
          ctx.currentTime + duration,
        );

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start();
        osc.stop(ctx.currentTime + duration);
      } catch {
        // AudioContext not supported or blocked
      }
    },
    [soundEnabled, getAudioContext],
  );

  const playClick = useCallback(() => {
    playTone(520, 'sine', 0.04, 0.03);
  }, [playTone]);

  const playHover = useCallback(() => {
    playTone(340, 'triangle', 0.02, 0.015);
  }, [playTone]);

  const playSuccess = useCallback(() => {
    if (!soundEnabled) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;

      const now = ctx.currentTime;
      [587.33, 880, 1174.66].forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.05);

        gain.gain.setValueAtTime(0.035, now + idx * 0.05);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.05 + 0.12);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + idx * 0.05);
        osc.stop(now + idx * 0.05 + 0.12);
      });
    } catch {
      // ignore
    }
  }, [soundEnabled, getAudioContext]);

  const playRouletteSpin = useCallback(() => {
    if (!soundEnabled) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;

      const now = ctx.currentTime;
      for (let i = 0; i < 8; i++) {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const freq = 300 + Math.random() * 400;

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + i * 0.04);

        gain.gain.setValueAtTime(0.025, now + i * 0.04);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.04 + 0.05);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + i * 0.04);
        osc.stop(now + i * 0.04 + 0.05);
      }
    } catch {
      // ignore
    }
  }, [soundEnabled, getAudioContext]);

  const toggleSound = useCallback(() => {
    setSoundEnabled((prev) => !prev);
  }, []);

  return {
    soundEnabled,
    toggleSound,
    playClick,
    playHover,
    playSuccess,
    playRouletteSpin,
  };
}
