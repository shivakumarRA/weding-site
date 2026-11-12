"use client";

import Image from "next/image";
import { images } from "@/data/content";
import { useLang } from "./i18n";
import { CornerFlourish, LotusDivider } from "./ornaments";
import { Reveal } from "./ui";

export function Family() {
  const { t } = useLang();
  const f = t.family;

  return (
    <section id="family" className="relative overflow-hidden bg-cream py-24 md:py-36">
      <div className="temple-border absolute inset-x-0 top-0 opacity-60" />
      <div className="container-luxe">
        <div className="mx-auto grid max-w-5xl items-center gap-12 md:grid-cols-[0.8fr_1.2fr] md:gap-16">
          {/* Kalasam photograph in an arch */}
          <Reveal className="relative mx-auto w-full max-w-[13rem] sm:max-w-xs">
            <div className="absolute -inset-3 rounded-t-[999px] border border-gold/40" aria-hidden="true" />
            <div className="relative aspect-[3/4] overflow-hidden rounded-t-[999px]">
              <Image src={images.kalash} alt="Purna kalasam with coconut and mango leaves" fill sizes="320px" className="object-cover" />
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="relative border border-gold/40 bg-ivory px-8 py-12 text-center md:px-14 md:py-16">
              <div className="pointer-events-none absolute inset-2 border border-gold/15" />
              <CornerFlourish className="absolute left-2 top-2 h-12 w-12" />
              <CornerFlourish className="absolute right-2 top-2 h-12 w-12 rotate-90" />
              <CornerFlourish className="absolute bottom-2 left-2 h-12 w-12 -rotate-90" />
              <CornerFlourish className="absolute bottom-2 right-2 h-12 w-12 rotate-180" />

              <p className="eyebrow text-gold">{f.eyebrow}</p>
              <h2 className="mt-6 font-serif text-4xl font-normal leading-tight text-ink md:text-5xl">{f.names}</h2>
              <address className="mt-6 font-serif text-xl not-italic leading-relaxed text-ink-soft">
                {f.address.map((l) => (
                  <span key={l} className="block">
                    {l}
                  </span>
                ))}
              </address>

              <LotusDivider className="mx-auto mt-8" />

              <p className="eyebrow mt-8 text-[0.62rem] text-gold-deep">{f.compliments}</p>
              <p className="mt-3 font-script text-4xl text-ink md:text-5xl">{f.nearDear}</p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
