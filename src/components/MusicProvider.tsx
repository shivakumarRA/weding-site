"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { facts } from "@/data/content";

type MusicCtx = { playing: boolean; play: () => void; pause: () => void; toggle: () => void };
const Ctx = createContext<MusicCtx | null>(null);

export const useMusic = () => {
  const c = useContext(Ctx);
  if (!c) throw new Error("useMusic must be used inside <MusicProvider>");
  return c;
};

/**
 * A soft generated "music box" melody (Web Audio) used when no mp3 is configured.
 * Progression: I – V – vi – IV in D major, gentle arpeggios with a warm pad.
 */
class MusicBox {
  private ctx: AudioContext;
  private master: GainNode;
  private timer: number | null = null;
  private step = 0;
  private nextTime = 0;

  constructor() {
    const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    this.ctx = new AC();
    this.master = this.ctx.createGain();
    this.master.gain.value = 0;
    const delay = this.ctx.createDelay();
    delay.delayTime.value = 0.38;
    const fb = this.ctx.createGain();
    fb.gain.value = 0.28;
    const wet = this.ctx.createGain();
    wet.gain.value = 0.35;
    this.master.connect(this.ctx.destination);
    this.master.connect(delay);
    delay.connect(fb).connect(delay);
    delay.connect(wet).connect(this.ctx.destination);
  }

  private chords = [
    [62, 66, 69, 74], // D
    [57, 61, 64, 69], // A
    [59, 62, 66, 71], // Bm
    [55, 59, 62, 67], // G
  ];
  private melody = [78, 76, 74, 73, 71, 69, 71, 73, 74, 73, 71, 69, 67, 66, 67, 69];

  private hz = (m: number) => 440 * Math.pow(2, (m - 69) / 12);

  private note(midi: number, t: number, dur: number, vol: number, type: OscillatorType = "sine") {
    const o = this.ctx.createOscillator();
    const g = this.ctx.createGain();
    o.type = type;
    o.frequency.value = this.hz(midi);
    g.gain.setValueAtTime(0, t);
    g.gain.linearRampToValueAtTime(vol, t + 0.02);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(g).connect(this.master);
    o.start(t);
    o.stop(t + dur + 0.05);
  }

  private schedule = () => {
    const beat = 0.42;
    while (this.nextTime < this.ctx.currentTime + 1.2) {
      const bar = Math.floor(this.step / 8) % 4;
      const chord = this.chords[bar];
      const i = this.step % 8;
      const t = this.nextTime;
      // arpeggio
      this.note(chord[[0, 1, 2, 3, 2, 1, 2, 3][i]], t, 1.6, 0.06, "triangle");
      // melody on half beats of every other bar
      if (i % 2 === 0) this.note(this.melody[(this.step / 2) % 16], t, 1.9, 0.045);
      // pad / bass at bar start
      if (i === 0) {
        this.note(chord[0] - 12, t, beat * 8, 0.05);
        this.note(chord[2] - 12, t, beat * 8, 0.025);
      }
      this.step++;
      this.nextTime += beat;
    }
  };

  async start() {
    await this.ctx.resume();
    this.nextTime = this.ctx.currentTime + 0.1;
    this.schedule();
    this.timer = window.setInterval(this.schedule, 300);
    this.master.gain.cancelScheduledValues(this.ctx.currentTime);
    this.master.gain.linearRampToValueAtTime(0.9, this.ctx.currentTime + 2);
  }

  stop() {
    this.master.gain.cancelScheduledValues(this.ctx.currentTime);
    this.master.gain.linearRampToValueAtTime(0, this.ctx.currentTime + 0.6);
    if (this.timer) window.clearInterval(this.timer);
    this.timer = null;
  }
}

export function MusicProvider({ children }: { children: ReactNode }) {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const boxRef = useRef<MusicBox | null>(null);

  useEffect(() => {
    if (facts.musicSrc) {
      const a = new Audio(facts.musicSrc);
      a.loop = true;
      a.volume = 0.5;
      a.preload = "none";
      audioRef.current = a;
    }
    return () => {
      audioRef.current?.pause();
      boxRef.current?.stop();
    };
  }, []);

  const play = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
      return;
    }
    try {
      boxRef.current ??= new MusicBox();
      boxRef.current.start().then(() => setPlaying(true));
    } catch {
      setPlaying(false);
    }
  }, []);

  const pause = useCallback(() => {
    audioRef.current?.pause();
    boxRef.current?.stop();
    setPlaying(false);
  }, []);

  const toggle = useCallback(() => (playing ? pause() : play()), [playing, play, pause]);

  return <Ctx.Provider value={{ playing, play, pause, toggle }}>{children}</Ctx.Provider>;
}
