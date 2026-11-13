"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

/* Shared gradient defs (duplicated ids are harmless — identical definitions). */
function MarigoldDefs() {
  return (
    <defs>
      <radialGradient id="mg-orange" cx="40%" cy="35%" r="70%">
        <stop offset="0%" stopColor="#f8e4df" />
        <stop offset="55%" stopColor="#ecc9c3" />
        <stop offset="100%" stopColor="#c98d85" />
      </radialGradient>
      <radialGradient id="mg-yellow" cx="40%" cy="35%" r="70%">
        <stop offset="0%" stopColor="#fbf1dc" />
        <stop offset="55%" stopColor="#e8d2b0" />
        <stop offset="100%" stopColor="#c9a96e" />
      </radialGradient>
      <linearGradient id="leaf" x1="0" x2="1">
        <stop offset="0%" stopColor="#6f7a63" />
        <stop offset="50%" stopColor="#9aa68c" />
        <stop offset="100%" stopColor="#6f7a63" />
      </linearGradient>
    </defs>
  );
}

function Marigold({ cx, cy, r, tone }: { cx: number; cy: number; r: number; tone: "orange" | "yellow" }) {
  const n = 12;
  return (
    <g>
      {Array.from({ length: n }, (_, i) => {
        const a = (i / n) * Math.PI * 2;
        return (
          <circle
            key={i}
            cx={(cx + Math.cos(a) * r * 0.72).toFixed(2)}
            cy={(cy + Math.sin(a) * r * 0.72).toFixed(2)}
            r={r * 0.36}
            fill={`url(#mg-${tone})`}
          />
        );
      })}
      <circle cx={cx} cy={cy} r={r * 0.75} fill={`url(#mg-${tone})`} />
      <circle cx={cx - r * 0.2} cy={cy - r * 0.2} r={r * 0.22} fill="#ffffff" opacity={0.45} />
    </g>
  );
}

/** Mango-leaf thoranam with marigolds, hung across the top of a section. Leaves sway gently. */
export function Thoranam({ className = "", units = 28 }: { className?: string; units?: number }) {
  return (
    <div className={`pointer-events-none flex w-full justify-center overflow-hidden ${className}`} aria-hidden="true">
      {Array.from({ length: units }, (_, i) => (
        <motion.svg
          key={i}
          viewBox="0 0 60 96"
          className="h-20 w-[50px] shrink-0 md:h-24 md:w-[60px]"
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.1, delay: 0.3 + Math.abs(i - units / 2) * 0.04, ease: [0.22, 1, 0.36, 1] }}
        >
          <MarigoldDefs />
          <path d="M0 6 Q30 18 60 6" fill="none" stroke="#b08d57" strokeWidth="1.6" />
          <motion.g
            style={{ originX: "30px", originY: "18px", transformBox: "view-box" }}
            animate={{ rotate: [0, i % 2 ? 3 : -3, 0] }}
            transition={{ duration: 4 + (i % 3), repeat: Infinity, ease: "easeInOut", delay: (i % 5) * 0.3 }}
          >
            <path d="M30 22 C 43 40, 41 68, 30 90 C 19 68, 17 40, 30 22 Z" fill="url(#leaf)" />
            <path d="M30 24 V 88" stroke="#eef0e6" strokeWidth="0.7" opacity="0.7" />
            {[36, 48, 60, 72].map((y) => (
              <path key={y} d={`M30 ${y} l7 -5 M30 ${y} l-7 -5`} stroke="#eef0e6" strokeWidth="0.4" opacity="0.5" />
            ))}
          </motion.g>
          <Marigold cx={30} cy={17} r={8} tone={i % 2 ? "yellow" : "orange"} />
        </motion.svg>
      ))}
    </div>
  );
}

/** A vertical string of marigolds ending in a tassel — hang at the sides of a section. */
export function MarigoldString({ count = 10, className = "", delay = 0 }: { count?: number; className?: string; delay?: number }) {
  const step = 17;
  const h = count * step + 40;
  return (
    <motion.svg
      viewBox={`0 0 30 ${h}`}
      className={`pointer-events-none ${className}`}
      style={{ originX: "15px", originY: "0px", transformBox: "view-box", height: h * 1.4, width: 42 }}
      initial={{ scaleY: 0 }}
      animate={{ scaleY: 1, rotate: [0, 1.6, 0, -1.6, 0] }}
      transition={{
        scaleY: { duration: 1.4, delay, ease: [0.22, 1, 0.36, 1] },
        rotate: { duration: 7, repeat: Infinity, ease: "easeInOut", delay: delay + 1.4 },
      }}
      aria-hidden="true"
    >
      <MarigoldDefs />
      <line x1="15" y1="0" x2="15" y2={count * step} stroke="#b08d57" strokeWidth="1" />
      {Array.from({ length: count }, (_, i) =>
        i % 4 === 3 ? (
          <path key={i} d={`M15 ${10 + i * step - 7} C 22 ${10 + i * step}, 22 ${10 + i * step + 5}, 15 ${10 + i * step + 9} C 8 ${10 + i * step + 5}, 8 ${10 + i * step}, 15 ${10 + i * step - 7}Z`} fill="#c98d85" />
        ) : (
          <Marigold key={i} cx={15} cy={10 + i * step} r={8} tone={i % 2 ? "yellow" : "orange"} />
        )
      )}
      {/* tassel */}
      <circle cx="15" cy={count * step + 4} r="4" fill="#b08d57" />
      {[-4, -2, 0, 2, 4].map((dx) => (
        <line key={dx} x1="15" y1={count * step + 6} x2={15 + dx} y2={count * step + 30} stroke="#b08d57" strokeWidth="0.8" />
      ))}
    </motion.svg>
  );
}

/** Purna kalasam: pot, mango leaves and coconut — drawn in gold. */
export function Kalasam({ className = "" }: { className?: string }) {
  const draw = (d: number) => ({
    initial: { pathLength: 0, opacity: 0 },
    whileInView: { pathLength: 1, opacity: 1 },
    viewport: { once: true },
    transition: { duration: 1.6, delay: d, ease: [0.65, 0, 0.35, 1] as const },
  });
  return (
    <svg viewBox="0 0 120 130" className={className} fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" aria-hidden="true">
      {/* leaves */}
      <motion.path d="M60 48 C 40 40, 24 30, 14 34 C 26 44, 42 50, 60 50" {...draw(0.6)} />
      <motion.path d="M60 48 C 80 40, 96 30, 106 34 C 94 44, 78 50, 60 50" {...draw(0.6)} />
      <motion.path d="M60 46 C 46 34, 36 22, 28 20 C 34 34, 46 44, 60 48" {...draw(0.75)} />
      <motion.path d="M60 46 C 74 34, 84 22, 92 20 C 86 34, 74 44, 60 48" {...draw(0.75)} />
      {/* coconut */}
      <motion.path d="M60 14 C 72 14, 76 28, 74 40 C 70 48, 50 48, 46 40 C 44 28, 48 14, 60 14 Z" {...draw(0.3)} />
      <motion.path d="M60 14 C 58 8, 62 4, 60 2" {...draw(0.4)} />
      {/* pot */}
      <motion.path d="M44 52 H 76 M 46 52 C 46 58, 50 60, 50 62 C 28 70, 24 96, 40 112 C 50 120, 70 120, 80 112 C 96 96, 92 70, 70 62 C 70 60, 74 58, 74 52" {...draw(0)} />
      <motion.path d="M34 84 C 50 90, 70 90, 86 84" {...draw(1)} />
      <motion.path d="M36 96 C 52 102, 68 102, 84 96" {...draw(1.1)} />
      {/* base */}
      <motion.path d="M44 116 L 40 126 H 80 L 76 116" {...draw(1.2)} />
      <motion.circle cx="60" cy="90" r="3" fill="currentColor" initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ delay: 1.6 }} />
    </svg>
  );
}

/** Lotus flanked by gold rules — the section divider. */
export function LotusDivider({ className = "", light = false }: { className?: string; light?: boolean }) {
  const c = light ? "#c9a96e" : "#b08d57";
  return (
    <svg viewBox="0 0 240 34" className={`h-8 w-60 ${className}`} fill="none" stroke={c} strokeWidth="0.9" aria-hidden="true">
      <motion.path d="M0 22 H86" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1.3 }} />
      <motion.path d="M240 22 H154" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1.3 }} />
      <circle cx="80" cy="22" r="1.4" fill={c} />
      <circle cx="160" cy="22" r="1.4" fill={c} />
      {/* lotus */}
      <path d="M120 4 C 128 12, 128 22, 120 28 C 112 22, 112 12, 120 4 Z" fill={c} fillOpacity="0.25" />
      <path d="M120 28 C 112 26, 104 18, 103 10 C 112 12, 118 20, 120 28 Z" />
      <path d="M120 28 C 128 26, 136 18, 137 10 C 128 12, 122 20, 120 28 Z" />
      <path d="M120 28 C 108 30, 98 26, 92 18 C 104 18, 114 22, 120 28 Z" />
      <path d="M120 28 C 132 30, 142 26, 148 18 C 136 18, 126 22, 120 28 Z" />
      <path d="M104 31 H136" />
    </svg>
  );
}

/** Corner flourish (paisley + buds) for framed cards. Rotate for each corner. */
export function CornerFlourish({ className = "", color = "#b08d57" }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 80 80" className={`pointer-events-none ${className}`} fill="none" stroke={color} strokeWidth="1" aria-hidden="true">
      <path d="M4 4 H40 M4 4 V40" />
      <path d="M10 10 C 30 10, 40 20, 40 34 C 40 44, 30 46, 26 40 C 22 34, 30 28, 34 34" />
      <path d="M10 10 C 10 30, 20 40, 34 40" />
      <circle cx="46" cy="6" r="2" fill={color} />
      <circle cx="6" cy="46" r="2" fill={color} />
      <circle cx="54" cy="6" r="1.2" fill={color} />
      <circle cx="6" cy="54" r="1.2" fill={color} />
    </svg>
  );
}

type Petal = { left: number; size: number; duration: number; delay: number; drift: number; spin: number; hue: string };

/** Marigold & rose petals drifting down. Generated after mount (no hydration mismatch). */
export function Petals({ count = 16 }: { count?: number }) {
  const [petals, setPetals] = useState<Petal[]>([]);
  useEffect(() => {
    const hues = ["#ecc9c3", "#e8d2b0", "#f3dccf", "#c98d85", "#f6e3dd"];
    setPetals(
      Array.from({ length: count }, () => ({
        left: Math.random() * 100,
        size: 8 + Math.random() * 9,
        duration: 11 + Math.random() * 12,
        delay: Math.random() * 10,
        drift: (Math.random() - 0.5) * 160,
        spin: (Math.random() - 0.5) * 720,
        hue: hues[Math.floor(Math.random() * hues.length)],
      }))
    );
  }, [count]);
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {petals.map((p, i) => (
        <motion.svg
          key={i}
          viewBox="0 0 20 20"
          className="absolute -top-8"
          style={{ left: `${p.left}%`, width: p.size, height: p.size }}
          initial={{ y: -40, x: 0, rotate: 0, opacity: 0 }}
          animate={{ y: "110vh", x: p.drift, rotate: p.spin, opacity: [0, 0.95, 0.95, 0] }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "linear" }}
        >
          <path d="M10 0 C 18 6, 16 16, 10 20 C 4 16, 2 6, 10 0 Z" fill={p.hue} />
        </motion.svg>
      ))}
    </div>
  );
}
