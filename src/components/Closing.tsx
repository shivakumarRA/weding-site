"use client";

import { useLang } from "./i18n";
import { Kalasam, LotusDivider, MarigoldString, Thoranam } from "./ornaments";
import { Reveal, WhatsAppIcon } from "./ui";
import { whatsappShareLink } from "./FloatingActions";

export function Closing() {
  const { t } = useLang();
  const c = t.closing;

  return (
    <footer className="pattern-ink relative overflow-hidden pb-32 pt-10 text-ivory md:pb-20">
      <Thoranam units={30} />
      <div className="absolute left-3 top-20 hidden md:block">
        <MarigoldString count={12} />
      </div>
      <div className="absolute right-3 top-20 hidden md:block">
        <MarigoldString count={12} delay={0.3} />
      </div>

      <div className="container-luxe relative mt-14 md:mt-20">
        {/* Bordered closing card */}
        <Reveal className="mx-auto max-w-3xl">
          <div className="relative border border-champagne/50 px-6 py-14 text-center md:px-16 md:py-20">
            <div className="temple-border-light absolute inset-x-3 top-3" />
            <div className="temple-border-light absolute inset-x-3 bottom-3 rotate-180" />
            <div className="pointer-events-none absolute inset-y-10 left-3 w-px bg-champagne/40" />
            <div className="pointer-events-none absolute inset-y-10 right-3 w-px bg-champagne/40" />

            <Kalasam className="mx-auto mt-4 h-16 w-16 text-champagne" />
            <p className="mt-4 font-serif text-lg italic text-champagne md:text-xl">
              {t.blessing}
            </p>

            <p className="mx-auto mt-8 max-w-xl font-serif text-2xl italic leading-relaxed text-ivory/95 md:text-3xl">“{c.message}”</p>

            <LotusDivider className="mx-auto mt-10" light />

            <p className="eyebrow mt-10 text-champagne">{c.love}</p>
            <p className="te-tight mt-4 font-script text-[2.6rem] leading-tight text-ivory sm:text-5xl md:text-7xl">{c.names}</p>
            <p className="mt-5 font-serif text-lg tracking-[0.2em] text-champagne/90">{c.date}</p>
          </div>
        </Reveal>

        <Reveal delay={0.2} className="mt-12 text-center">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.open(whatsappShareLink(t.share), "_blank", "noopener,noreferrer");
            }}
            className="btn-gold !border-champagne/60 !text-champagne hover:!text-ink"
          >
            <WhatsAppIcon className="h-4 w-4" /> {t.actions.whatsapp}
          </a>
        </Reveal>
      </div>
    </footer>
  );
}
