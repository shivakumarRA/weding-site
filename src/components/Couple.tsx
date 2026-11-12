"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import type { ReactNode } from "react";
import { images } from "@/data/content";
import { useLang } from "./i18n";
import { CornerFlourish } from "./ornaments";
import { SectionHeading, ease } from "./ui";

/** Temple-arch frame holding a monogram medallion. */
function ArchCard({ label, prefix, name, initial, children, delay, className = "" }: {
  className?: string;
  label: string;
  prefix: string;
  name: string;
  initial: string;
  children?: ReactNode;
  delay: number;
}) {
  return (
    <motion.article
      className={`relative flex flex-col items-center rounded-t-[999px] border border-gold/50 bg-ivory px-6 pb-12 pt-14 text-center shadow-[0_30px_60px_-35px_rgba(45,38,32,0.35)] md:px-10 ${className}`}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 1.2, delay, ease }}
    >
      <div className="pointer-events-none absolute inset-2 rounded-t-[999px] border border-gold/20" />
      <CornerFlourish className="absolute bottom-2 left-2 h-12 w-12 -rotate-90" />
      <CornerFlourish className="absolute bottom-2 right-2 h-12 w-12 rotate-180" />

      {/* medallion */}
      <div className="relative grid h-40 w-40 place-items-center md:h-48 md:w-48">
        <motion.svg
          viewBox="0 0 200 200"
          className="absolute inset-0 h-full w-full text-gold"
          animate={{ rotate: 360 }}
          transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
          aria-hidden="true"
        >
          <circle cx="100" cy="100" r="96" fill="none" stroke="currentColor" strokeWidth="0.8" />
          <circle cx="100" cy="100" r="84" fill="none" stroke="currentColor" strokeWidth="0.6" strokeDasharray="2 5" />
          {Array.from({ length: 16 }, (_, i) => (
            <path
              key={i}
              d="M100 6 C 106 14, 106 22, 100 28 C 94 22, 94 14, 100 6 Z"
              fill="currentColor"
              fillOpacity="0.25"
              stroke="currentColor"
              strokeWidth="0.5"
              transform={`rotate(${i * 22.5} 100 100)`}
            />
          ))}
        </motion.svg>
        <div className="grid h-[68%] w-[68%] place-items-center rounded-full bg-blush text-gold-deep shadow-inner">
          {/[ఀ-౿]/.test(initial) ? (
            <span className="font-telugu text-4xl leading-none md:text-5xl">{initial}</span>
          ) : (
            <span className="font-script text-6xl md:text-7xl">{initial}</span>
          )}
        </div>
      </div>

      <p className="eyebrow mt-8 text-gold">{label}</p>
      <p className="mt-4 font-serif text-lg italic text-gold-deep">{prefix}</p>
      <h3 className="font-serif text-4xl font-normal text-ink md:text-5xl">{name}</h3>
      {children}
    </motion.article>
  );
}

/** The couple’s photograph in a double gold temple-arch frame. */
function CouplePhoto({ alt, withLabel, className = "" }: { alt: string; withLabel: string; className?: string }) {
  return (
    <motion.figure
      className={`relative mx-auto w-full max-w-[22rem] ${className}`}
      initial={{ opacity: 0, y: 50, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 1.4, ease }}
    >
      <div className="absolute -inset-3 rounded-t-[999px] border border-gold/50" aria-hidden="true" />
      <div className="absolute -inset-5 rounded-t-[999px] border border-gold/20" aria-hidden="true" />
      <div className="group relative aspect-[2/3] overflow-hidden rounded-t-[999px] bg-cream shadow-[0_40px_70px_-35px_rgba(45,38,32,0.5)]">
        <Image
          src={images.couple.src}
          alt={alt}
          fill
          sizes="(min-width: 1024px) 352px, (min-width: 640px) 352px, 90vw"
          className="object-cover object-top transition-transform duration-[1.8s] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.04]"
        />
      </div>
      <CornerFlourish className="absolute -bottom-3 -left-3 h-14 w-14 -rotate-90" />
      <CornerFlourish className="absolute -bottom-3 -right-3 h-14 w-14 rotate-180" />

      {/* "with" + rings, under the photo */}
      <figcaption className="mt-8 flex items-center justify-center gap-4 text-gold">
        <span className="h-px w-10 bg-gold/50" />
        <svg viewBox="0 0 64 40" className="h-8 w-12" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
          <circle cx="24" cy="22" r="14" />
          <circle cx="40" cy="22" r="14" />
          <path d="M24 6 l3 -4 3 4" />
        </svg>
        <span className="eyebrow">{withLabel}</span>
        <span className="h-px w-10 bg-gold/50" />
      </figcaption>
    </motion.figure>
  );
}

export function Couple() {
  const { t, lang } = useLang();
  const c = t.couple;
  const h = t.hero;

  return (
    <section id="couple" className="paper relative overflow-hidden py-24 md:py-36">
      <div className="temple-border absolute inset-x-0 top-0 opacity-70" />
      <div className="container-luxe">
        <SectionHeading eyebrow={c.eyebrow} title={c.title} script={c.script} />

        {/* Mobile: photo on top, cards below. Desktop: groom | photo | bride. */}
        <div className="mx-auto grid max-w-6xl items-center gap-10 sm:grid-cols-2 lg:grid-cols-[1fr_minmax(0,22rem)_1fr] lg:gap-8">
          <CouplePhoto alt={c.photoAlt} withLabel={c.with} className="sm:col-span-2 lg:col-span-1 lg:col-start-2 lg:row-start-1" />

          <ArchCard
            label={c.groomLabel}
            prefix={h.groomPrefix}
            name={h.groom}
            initial={lang === "te" ? "వెం" : "V"}
            delay={0}
            className="lg:col-start-1 lg:row-start-1"
          />

          <ArchCard
            label={c.brideLabel}
            prefix={h.bridePrefix}
            name={h.bride}
            initial={lang === "te" ? "స్నే" : "S"}
            delay={0.2}
            className="lg:col-start-3 lg:row-start-1"
          >
            <p className="mt-5 max-w-xs font-serif text-lg italic leading-relaxed text-ink-soft">{c.brideFamily}</p>
            <div className="mt-6 w-full max-w-xs border-t border-gold/30 pt-5">
              <p className="eyebrow text-[0.6rem] text-gold">{c.residenceLabel}</p>
              <address className="mt-2 font-serif text-lg not-italic leading-snug text-ink">
                {c.residence.map((l) => (
                  <span key={l} className="block">
                    {l}
                  </span>
                ))}
              </address>
            </div>
          </ArchCard>
        </div>

        {/* Traditions band — decorative Indian wedding imagery */}
        <div className="mt-24 grid grid-cols-2 gap-3 md:mt-32 md:grid-cols-4 md:gap-5">
          {images.traditions.map((p, i) => (
            <motion.div
              key={p.src}
              className={`group relative overflow-hidden ${i % 2 ? "md:mt-12" : ""} aspect-[3/4]`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 1.1, delay: i * 0.1, ease }}
            >
              <Image
                src={p.src}
                alt={p.alt}
                fill
                sizes="(min-width: 768px) 25vw, 50vw"
                className="object-cover transition-transform duration-[1.6s] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-110"
              />
              <span className="absolute inset-0 bg-ink/10 transition-colors duration-700 group-hover:bg-ink/0" />
              <span className="absolute inset-3 border border-ivory/50 transition-all duration-700 group-hover:inset-4" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
