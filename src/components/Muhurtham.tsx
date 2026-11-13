"use client";

import { motion } from "framer-motion";
import { CalendarDays, Clock3, Sparkles, Star, UtensilsCrossed } from "lucide-react";
import Image from "next/image";
import { images } from "@/data/content";
import { useLang } from "./i18n";
import { CornerFlourish, Kalasam } from "./ornaments";
import { Reveal, SectionHeading, ease } from "./ui";

/** Ornamental temple-style calendar leaf. */
function CalendarLeaf() {
  const { t } = useLang();
  const m = t.muhurtham;
  return (
    <div className="relative mx-auto w-56 md:w-64">
      {/* rings */}
      <div className="absolute -top-3 left-0 right-0 z-10 flex justify-center gap-16">
        {[0, 1].map((i) => (
          <span key={i} className="h-7 w-3 rounded-full border-2 border-champagne bg-ink" />
        ))}
      </div>
      <div className="overflow-hidden border border-champagne/60 bg-ivory shadow-2xl shadow-black/30">
        <div className="bg-ink px-4 pb-3 pt-6 text-center">
          <p className="eyebrow text-champagne">{m.month}</p>
          <p className="mt-1 font-serif text-sm tracking-[0.4em] text-ivory/80">{m.year}</p>
        </div>
        <div className="relative px-4 py-6 text-center">
          <CornerFlourish className="absolute left-1 top-1 h-8 w-8" />
          <CornerFlourish className="absolute right-1 top-1 h-8 w-8 rotate-90" />
          <motion.p
            className="font-serif text-[6.5rem] font-light leading-none text-ink"
            initial={{ rotateX: -90, opacity: 0 }}
            whileInView={{ rotateX: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease }}
            style={{ transformPerspective: 600 }}
          >
            {m.dayNum}
          </motion.p>
          <p className="te-tight mt-2 font-serif text-xl italic text-gold-deep">{m.day}</p>
        </div>
        <div className="temple-border opacity-70" />
      </div>
    </div>
  );
}

/** Traditional clock face; hands sweep to 11:22 when scrolled into view. */
function MuhurthamClock() {
  const hourAngle = (11 + 22 / 60) * 30; // 341°
  const minuteAngle = 22 * 6; // 132°
  return (
    <div className="relative mx-auto h-60 w-60 md:h-72 md:w-72">
      <svg viewBox="0 0 240 240" className="h-full w-full" aria-hidden="true">
        <circle cx="120" cy="120" r="116" fill="#2d2620" stroke="#c9a96e" strokeWidth="1.5" />
        <circle cx="120" cy="120" r="108" fill="none" stroke="#c9a96e" strokeWidth="0.6" strokeDasharray="1 4" />
        <circle cx="120" cy="120" r="96" fill="#fbf7f0" />
        <circle cx="120" cy="120" r="90" fill="none" stroke="#b08d57" strokeWidth="0.6" />
        {/* petal ring */}
        {Array.from({ length: 24 }, (_, i) => (
          <path
            key={i}
            d="M120 6 C 124 11, 124 15, 120 19 C 116 15, 116 11, 120 6 Z"
            fill="#c9a96e"
            opacity={0.8}
            transform={`rotate(${i * 15} 120 120)`}
          />
        ))}
        {/* markers & numerals */}
        {Array.from({ length: 12 }, (_, i) => {
          const a = ((i + 1) * 30 - 90) * (Math.PI / 180);
          return (
            <g key={i}>
              <text
                x={(120 + Math.cos(a) * 72).toFixed(2)}
                y={(120 + Math.sin(a) * 72 + 5).toFixed(2)}
                textAnchor="middle"
                fontSize="15"
                fill="#2d2620"
                style={{ fontFamily: "var(--font-cormorant), serif" }}
              >
                {i + 1}
              </text>
              <circle cx={(120 + Math.cos(a) * 86).toFixed(2)} cy={(120 + Math.sin(a) * 86).toFixed(2)} r={i % 3 === 2 ? 2.4 : 1.3} fill="#b08d57" />
            </g>
          );
        })}
        {/* highlighted arc 11:22 → 12:00 (muhurtham to lunch) */}
        <motion.path
          d="M161.6 157.5 A56 56 0 1 1 120 64"
          fill="none"
          stroke="#c98d85"
          strokeWidth="3"
          strokeLinecap="round"
          opacity={0.6}
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 2, delay: 1.2, ease }}
        />
        {/* hands */}
        <motion.g
          initial={{ rotate: 0 }}
          whileInView={{ rotate: hourAngle }}
          viewport={{ once: true }}
          transition={{ duration: 2.2, ease }}
          style={{ originX: "120px", originY: "120px", transformBox: "view-box" }}
        >
          <path d="M120 128 L116 120 L120 66 L124 120 Z" fill="#2d2620" />
        </motion.g>
        <motion.g
          initial={{ rotate: 0 }}
          whileInView={{ rotate: 360 + minuteAngle }}
          viewport={{ once: true }}
          transition={{ duration: 2.6, ease }}
          style={{ originX: "120px", originY: "120px", transformBox: "view-box" }}
        >
          <path d="M120 132 L117.5 120 L120 44 L122.5 120 Z" fill="#b08d57" />
          <circle cx="120" cy="48" r="3" fill="#b08d57" />
        </motion.g>
        <circle cx="120" cy="120" r="6" fill="#b08d57" />
        <circle cx="120" cy="120" r="2.5" fill="#fbf7f0" />
      </svg>
    </div>
  );
}

function Detail({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-start gap-4 border-b border-champagne/20 py-5 last:border-b-0">
      <span className="mt-1 grid h-10 w-10 shrink-0 place-items-center rounded-full border border-champagne/50 text-champagne">{icon}</span>
      <div>
        <p className="eyebrow text-[0.6rem] text-champagne/80">{label}</p>
        <p className="te-tight mt-1 font-serif text-2xl text-ivory md:text-[1.7rem]">{value}</p>
      </div>
    </div>
  );
}

export function Muhurtham() {
  const { t } = useLang();
  const m = t.muhurtham;

  return (
    <section id="muhurtham" className="pattern-ink relative overflow-hidden py-24 text-ivory md:py-36">
      <div className="temple-border-light absolute inset-x-0 top-0 opacity-80" />
      <div className="temple-border-light absolute inset-x-0 bottom-0 rotate-180 opacity-80" />

      <div className="container-luxe relative">
        <SectionHeading eyebrow={m.eyebrow} title={m.title} light />

        <div className="grid items-center gap-14 lg:grid-cols-3 lg:gap-10">
          <Reveal>
            <CalendarLeaf />
          </Reveal>
          <Reveal delay={0.15}>
            <MuhurthamClock />
          </Reveal>
          <Reveal delay={0.3} className="mx-auto w-full max-w-sm">
            <Detail icon={<CalendarDays className="h-4 w-4" strokeWidth={1.3} />} label={m.dateLabel} value={m.date} />
            <Detail icon={<Clock3 className="h-4 w-4" strokeWidth={1.3} />} label={m.timeLabel} value={m.time} />
            <Detail icon={<Star className="h-4 w-4" strokeWidth={1.3} />} label={m.nakshatramLabel} value={m.nakshatram} />
            <Detail icon={<Sparkles className="h-4 w-4" strokeWidth={1.3} />} label={m.lagnamLabel} value={m.lagnam} />
          </Reveal>
        </div>

        {/* Lunch */}
        <Reveal delay={0.1} className="mx-auto mt-20 max-w-3xl md:mt-28">
          <div className="relative grid overflow-hidden border border-champagne/50 bg-ivory text-ink sm:grid-cols-[0.9fr_1.1fr]">
            <div className="relative aspect-[4/3] sm:aspect-auto">
              <Image src={images.lunch} alt="" fill sizes="(min-width: 640px) 340px, 100vw" className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-ivory/10" />
            </div>
            <div className="relative flex flex-col items-center justify-center px-8 py-10 text-center">
              <CornerFlourish className="absolute right-2 top-2 h-10 w-10 rotate-90" />
              <CornerFlourish className="absolute bottom-2 right-2 h-10 w-10 rotate-180" />
              {/* banana-leaf plate icon */}
              <span className="relative grid h-16 w-16 place-items-center rounded-full bg-sage/15 text-sage-deep">
                <svg viewBox="0 0 64 64" className="absolute inset-0 h-full w-full" aria-hidden="true">
                  <path d="M8 40 C 14 18, 40 8, 58 14 C 52 34, 30 52, 8 40 Z" fill="#9aa68c" opacity="0.25" />
                  <path d="M8 40 C 26 32, 42 22, 58 14" stroke="#6f7a63" strokeWidth="1" fill="none" />
                </svg>
                <UtensilsCrossed className="relative h-6 w-6 text-ink" strokeWidth={1.3} />
              </span>
              <p className="eyebrow mt-5 text-gold">{m.lunchLabel}</p>
              <p className="te-tight mt-2 font-serif text-4xl text-ink md:text-5xl">{m.lunchTime}</p>
              <Kalasam className="mt-4 h-10 w-10 text-gold/70" />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
