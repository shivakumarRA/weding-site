"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { images } from "@/data/content";
import { useLang } from "./i18n";
import { CornerFlourish, Kalasam, LotusDivider, MarigoldString, Petals, Thoranam } from "./ornaments";
import { ease } from "./ui";

export function Hero({ opened }: { opened: boolean }) {
  const { t, lang } = useLang();
  const h = t.hero;
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  const show = (delay: number) => ({
    initial: { opacity: 0, y: 24 },
    animate: opened ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 },
    transition: { duration: 1.2, delay: delay + 0.9, ease },
  });

  return (
    <section ref={ref} id="top" className="relative overflow-hidden bg-ink-deep pb-24 pt-28 md:pb-32 md:pt-36">
      {/* Background photograph, deeply tinted ink */}
      <motion.div className="absolute inset-0" style={{ y: imgY }}>
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1.2 }}
          animate={opened ? { scale: 1.05 } : { scale: 1.2 }}
          transition={{ duration: 3.2, ease }}
        >
          <Image src={images.hero} alt="" fill priority sizes="100vw" className="object-cover" />
        </motion.div>
        <div className="absolute inset-0 bg-ink/55" />
        <div className="pattern-ink absolute inset-0 !bg-transparent" />
      </motion.div>

      {opened && (
        <>
          <Thoranam className="absolute inset-x-0 top-14 z-10 md:top-[4.5rem]" />
          <div className="absolute left-2 top-24 z-10 hidden sm:block md:left-8">
            <MarigoldString count={14} delay={1.1} />
          </div>
          <div className="absolute right-2 top-24 z-10 hidden sm:block md:right-8">
            <MarigoldString count={14} delay={1.3} />
          </div>
          <Petals count={18} />
        </>
      )}

      {/* The invitation card — temple-arch shape */}
      <motion.div
        className="relative z-20 mx-auto mt-16 w-[calc(100%-2rem)] max-w-2xl md:mt-20"
        initial={{ opacity: 0, y: 60, scale: 0.97 }}
        animate={opened ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 60, scale: 0.97 }}
        transition={{ duration: 1.4, delay: 0.6, ease }}
      >
        <div className="paper relative rounded-t-[999px] border border-gold/60 px-6 pb-14 pt-24 text-center shadow-[0_40px_80px_-30px_rgba(0,0,0,0.6)] md:px-16 md:pt-32">
          <div className="pointer-events-none absolute inset-2.5 rounded-t-[999px] border border-gold/30" />
          <div className="pointer-events-none absolute inset-4 rounded-t-[999px] border border-dashed border-gold/20" />
          <CornerFlourish className="absolute bottom-3 left-3 h-14 w-14 -rotate-90" />
          <CornerFlourish className="absolute bottom-3 right-3 h-14 w-14 rotate-180" />

          <motion.div {...show(0)} className="flex justify-center">
            <Kalasam className="h-20 w-20 text-gold md:h-24 md:w-24" />
          </motion.div>

          <motion.p {...show(0.1)} className="mt-4 font-serif text-xl italic text-gold-deep md:text-2xl">
            {t.blessing}
          </motion.p>

          <motion.p {...show(0.2)} className="eyebrow mt-6 text-gold-deep" key={`title-${lang}`}>
            {h.title}
          </motion.p>

          <motion.div {...show(0.25)}>
            <LotusDivider className="mx-auto mt-4" />
          </motion.div>

          <motion.p {...show(0.3)} className="mx-auto mt-6 max-w-md font-serif text-lg italic text-ink-soft md:text-xl">
            {h.blessings}
          </motion.p>
          <motion.p {...show(0.4)} className="mx-auto mt-4 max-w-lg font-serif text-lg leading-relaxed text-ink md:text-xl">
            {h.solicit}
          </motion.p>

          {/* Names */}
          <motion.div {...show(0.55)} className="mt-10">
            <p className="font-serif text-lg italic text-gold-deep md:text-xl">{h.groomPrefix}</p>
            <h1 className="te-tight font-serif text-[2.6rem] font-normal leading-tight text-ink sm:text-6xl md:text-7xl">{h.groom}</h1>
          </motion.div>
          <motion.div {...show(0.7)} className="my-4 flex items-center justify-center gap-4">
            <span className="h-px w-12 bg-gold/60" />
            <span className="eyebrow text-gold">{h.with}</span>
            <span className="h-px w-12 bg-gold/60" />
          </motion.div>
          <motion.div {...show(0.8)}>
            <p className="font-serif text-lg italic text-gold-deep md:text-xl">{h.bridePrefix}</p>
            <p className="te-tight font-serif text-[2.6rem] font-normal leading-tight text-ink sm:text-6xl md:text-7xl">{h.bride}</p>
          </motion.div>

          {/* Date */}
          <motion.div {...show(1)} className="mx-auto mt-12 max-w-sm border-y border-gold/40 py-6">
            <p className="te-tight font-serif text-3xl text-ink md:text-4xl">{h.date}</p>
            <p className="mt-3 flex items-center justify-center gap-3 text-sm tracking-[0.2em] text-gold-deep">
              <span className="uppercase">{h.day}</span>
              <span className="h-4 w-px bg-gold/50" />
              <span>{h.time}</span>
            </p>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll cue */}
      <motion.a
        href="#couple"
        className="relative z-20 mx-auto mt-12 flex w-max flex-col items-center gap-3 text-ivory/80"
        initial={{ opacity: 0 }}
        animate={{ opacity: opened ? 1 : 0 }}
        transition={{ delay: 2.6, duration: 1 }}
        aria-label={h.scroll}
      >
        <span className="eyebrow text-[0.55rem]">{h.scroll}</span>
        <span className="relative h-12 w-px overflow-hidden bg-ivory/25">
          <motion.span
            className="absolute left-0 top-0 h-1/2 w-full bg-champagne"
            animate={{ y: ["-100%", "200%"] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
      </motion.a>
    </section>
  );
}
