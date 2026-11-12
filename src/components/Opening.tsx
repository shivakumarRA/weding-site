"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { LangToggle, useLang } from "./i18n";
import { useMusic } from "./MusicProvider";
import { CornerFlourish } from "./ornaments";
import { ease } from "./ui";

/**
 * Full-screen ink "doors" that part to reveal the invitation.
 * Opening is also the user gesture that starts the background music.
 */
export function Opening({ onOpen }: { onOpen: () => void }) {
  const [open, setOpen] = useState(false);
  const [gone, setGone] = useState(false);
  const { play } = useMusic();
  const { t, lang } = useLang();

  useEffect(() => {
    document.body.style.overflow = gone ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [gone]);

  const handleOpen = (withMusic: boolean) => {
    if (withMusic) play();
    setOpen(true);
    onOpen();
    window.setTimeout(() => setGone(true), 1900);
  };

  return (
    <AnimatePresence>
      {!gone && (
        <motion.div className="fixed inset-0 z-[100] flex" exit={{ opacity: 0 }} transition={{ duration: 0.6 }} role="dialog" aria-label={t.opening.open}>
          {(["left", "right"] as const).map((side) => (
            <motion.div
              key={side}
              className="paper relative h-full w-1/2 overflow-hidden"
              animate={open ? { x: side === "left" ? "-100%" : "100%" } : { x: 0 }}
              transition={{ duration: 1.6, ease: [0.76, 0, 0.24, 1], delay: 0.35 }}
            >
              <div className={`absolute inset-4 border border-gold/40 md:inset-8 ${side === "left" ? "border-r-0" : "border-l-0"}`} />
              <div className={`absolute inset-6 border border-gold/20 md:inset-11 ${side === "left" ? "border-r-0" : "border-l-0"}`} />
              <CornerFlourish
                color="#b08d57"
                className={`absolute h-16 w-16 md:h-24 md:w-24 ${side === "left" ? "left-6 top-6 md:left-10 md:top-10" : "right-6 top-6 rotate-90 md:right-10 md:top-10"}`}
              />
              <CornerFlourish
                color="#b08d57"
                className={`absolute h-16 w-16 md:h-24 md:w-24 ${side === "left" ? "bottom-6 left-6 -rotate-90 md:bottom-10 md:left-10" : "bottom-6 right-6 rotate-180 md:bottom-10 md:right-10"}`}
              />
              <div className={`absolute top-0 h-full w-px bg-gold/30 ${side === "left" ? "right-0" : "left-0"}`} />
            </motion.div>
          ))}

          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center text-ink"
            animate={open ? { opacity: 0, scale: 0.96 } : { opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease }}
          >
            <div className="absolute right-5 top-5 md:right-12 md:top-12">
              <LangToggle tone="dark" />
            </div>

            <motion.p
              className="font-serif text-lg italic text-gold-deep md:text-2xl"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 1, ease }}
            >
              {t.blessing}
            </motion.p>

            <motion.button
              onClick={() => handleOpen(true)}
              className="relative my-9 grid h-36 w-36 place-items-center rounded-full md:h-44 md:w-44"
              initial={{ opacity: 0, scale: 0.6, rotate: -20 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ delay: 0.6, duration: 1.4, ease }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              aria-label={t.opening.open}
            >
              <motion.span
                className="absolute inset-0 rounded-full border border-champagne/60"
                animate={{ scale: [1, 1.2], opacity: [0.7, 0] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: "easeOut" }}
              />
              <span
                className="absolute inset-0 rounded-full shadow-[0_18px_40px_-12px_rgba(138,106,59,0.55)]"
                style={{ background: "radial-gradient(circle at 35% 30%, #d9bd85 0%, #b08d57 45%, #8a6a3b 100%)" }}
              />
              <span className="absolute inset-3 rounded-full border border-ivory/40" />
              <span className="absolute inset-5 rounded-full border border-dashed border-ivory/30" />
              <span className="relative font-serif text-4xl font-light tracking-wider text-ivory md:text-5xl">
                {lang === "te" ? (
                  <span className="font-telugu text-3xl md:text-4xl">వెం ♥ స్నే</span>
                ) : (
                  <>
                    V<span className="mx-1 font-script text-3xl">&</span>S
                  </>
                )}
              </span>
            </motion.button>

            <motion.p className="eyebrow text-gold" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8, duration: 1 }}>
              {t.opening.invited}
            </motion.p>
            <motion.h1
              className="te-tight mt-4 font-script text-[2.6rem] leading-tight text-ink sm:text-5xl md:text-7xl"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 1.2, ease }}
            >
              {t.opening.names}
            </motion.h1>
            <motion.p
              className="mt-4 font-serif text-lg tracking-[0.3em] text-ink-soft"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 1 }}
            >
              {t.opening.date}
            </motion.p>

            <motion.div className="mt-10 flex flex-col items-center gap-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5, duration: 1 }}>
              <button onClick={() => handleOpen(true)} className="btn-gold">
                {t.opening.open}
              </button>
              <button onClick={() => handleOpen(false)} className="text-xs tracking-wider text-ink-soft/70 underline-offset-4 hover:text-gold hover:underline">
                {t.opening.noMusic}
              </button>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
