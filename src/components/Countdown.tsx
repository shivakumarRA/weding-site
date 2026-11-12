"use client";

import { AnimatePresence, motion } from "framer-motion";
import { CalendarPlus } from "lucide-react";
import { useEffect, useState } from "react";
import { facts } from "@/data/content";
import { useLang } from "./i18n";
import { Reveal, SectionHeading, ease } from "./ui";

type Left = { days: number; hours: number; minutes: number; seconds: number };

function timeLeft(target: number): Left {
  const diff = Math.max(0, target - Date.now());
  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor((diff / 3_600_000) % 24),
    minutes: Math.floor((diff / 60_000) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function Unit({ value, label }: { value: number | null; label: string }) {
  const text = value === null ? "--" : String(value).padStart(2, "0");
  return (
    <div className="relative flex flex-col items-center border border-gold/30 bg-ivory px-2 py-6 md:py-10">
      <span className="absolute inset-1.5 border border-gold/15" aria-hidden="true" />
      <div className="relative h-16 overflow-hidden md:h-28">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={text}
            className="block font-serif text-6xl font-light tabular-nums text-ink md:text-8xl"
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            exit={{ y: "-100%", opacity: 0 }}
            transition={{ duration: 0.6, ease }}
          >
            {text}
          </motion.span>
        </AnimatePresence>
      </div>
      <span className="eyebrow mt-3 text-[0.6rem] text-gold-deep md:mt-4">{label}</span>
    </div>
  );
}

function downloadIcs() {
  const start = new Date(facts.muhurthamISO);
  const end = new Date(start.getTime() + 3 * 3_600_000);
  const fmt = (d: Date) => d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Wedding Invitation//EN",
    "BEGIN:VEVENT",
    `UID:${fmt(start)}-venkateswarlu-sneha@invite`,
    `DTSTAMP:${fmt(new Date())}`,
    `DTSTART:${fmt(start)}`,
    `DTEND:${fmt(end)}`,
    "SUMMARY:Wedding of Chi. Venkateswarlu with Chi. La. Sow. Sneha",
    "LOCATION:P.V. Function Hall\\, Beside Flyover\\, Kodad Road\\, Nayakangudem",
    "DESCRIPTION:Sumuhurtham 11:22 AM · Aswini Nakshatram · Dhanassu Lagnam. Lunch 12:00 PM.",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
  const url = URL.createObjectURL(new Blob([ics], { type: "text/calendar" }));
  const a = Object.assign(document.createElement("a"), { href: url, download: "venkateswarlu-sneha-wedding.ics" });
  a.click();
  URL.revokeObjectURL(url);
}

export function Countdown() {
  const { t } = useLang();
  const c = t.countdown;
  const target = new Date(facts.muhurthamISO).getTime();
  const [left, setLeft] = useState<Left | null>(null);

  useEffect(() => {
    setLeft(timeLeft(target));
    const id = window.setInterval(() => setLeft(timeLeft(target)), 1000);
    return () => window.clearInterval(id);
  }, [target]);

  const done = left !== null && left.days + left.hours + left.minutes + left.seconds === 0;

  return (
    <section id="countdown" className="relative overflow-hidden bg-cream py-24 md:py-32">
      <div className="container-luxe relative text-center">
        <SectionHeading eyebrow={done ? c.done : c.eyebrow} title={c.title} />

        <Reveal delay={0.1}>
          <div className="mx-auto grid max-w-4xl grid-cols-2 gap-3 md:grid-cols-4 md:gap-5">
            {(["days", "hours", "minutes", "seconds"] as const).map((k) => (
              <Unit key={k} value={left ? left[k] : null} label={c.units[k]} />
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.25}>
          <button onClick={downloadIcs} className="btn-gold mt-14">
            <CalendarPlus className="h-4 w-4" strokeWidth={1.3} /> {c.calendar}
          </button>
        </Reveal>
      </div>
    </section>
  );
}
