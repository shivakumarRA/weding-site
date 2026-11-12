"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { MapPin, Navigation, Phone } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";
import { facts, images, mapsDirections, mapsLocation } from "@/data/content";
import { useLang } from "./i18n";
import { CornerFlourish } from "./ornaments";
import { Reveal, SectionHeading, WhatsAppIcon, ease } from "./ui";

const formatPhone = (p: string) => (p.length === 10 ? `${p.slice(0, 5)} ${p.slice(5)}` : p);

export function Venue() {
  const { t } = useLang();
  const v = t.venue;

  const photoRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: photoRef, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  const whatsappHref = `https://wa.me/${facts.venueWhatsapp}?text=${encodeURIComponent(t.share)}`;

  return (
    <section id="venue" className="paper relative overflow-hidden py-24 md:py-36">
      <div className="container-luxe">
        <SectionHeading eyebrow={v.eyebrow} title={v.title} />

        <div className="grid items-center lg:grid-cols-12">
          {/* Photograph */}
          <div ref={photoRef} className="relative lg:col-span-7">
            <div className="absolute -inset-3 border border-gold/40 md:-inset-5" aria-hidden="true" />
            <motion.div
              className="relative aspect-[4/3] overflow-hidden lg:aspect-[5/6]"
              initial={{ opacity: 0, scale: 1.04 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 1.6, ease }}
            >
              <motion.div className="absolute -inset-y-[10%] inset-x-0" style={{ y: imgY }}>
                <Image src={images.venue} alt={v.photoAlt} fill sizes="(min-width: 1024px) 58vw, 100vw" className="object-cover" />
              </motion.div>
              <div className="absolute inset-0 bg-ink/15" />
            </motion.div>
          </div>

          {/* Details card */}
          <Reveal delay={0.2} className="relative z-10 -mt-16 px-3 sm:px-8 lg:col-span-5 lg:-ml-24 lg:mt-0 lg:px-0">
            <div className="relative border border-gold/50 bg-ivory px-7 py-12 shadow-2xl shadow-ink/15 md:px-12 md:py-14">
              <div className="pointer-events-none absolute inset-2 border border-gold/20" aria-hidden="true" />
              <CornerFlourish className="absolute left-2 top-2 h-12 w-12" />
              <CornerFlourish className="absolute bottom-2 right-2 h-12 w-12 rotate-180" />

              <p className="eyebrow text-gold">{v.eyebrow}</p>
              <h3 className="mt-5 font-serif text-5xl font-normal leading-[1.05] text-ink md:text-6xl">{v.name}</h3>
              <div className="mt-6 h-px w-20 bg-gold/60" />

              <address className="mt-8 flex gap-4 not-italic">
                <MapPin className="mt-1.5 h-5 w-5 shrink-0 text-gold" strokeWidth={1.2} />
                <span className="font-serif text-xl leading-relaxed text-ink">
                  {v.address.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </span>
              </address>

              <div className="mt-6 flex gap-4">
                <Phone className="mt-1 h-5 w-5 shrink-0 text-gold" strokeWidth={1.2} />
                <p className="font-serif text-xl text-ink">
                  {facts.venuePhones.map((p, i) => (
                    <span key={p}>
                      <a href={`tel:+91${p}`} className="transition-colors hover:text-ink">
                        {formatPhone(p)}
                      </a>
                      {i < facts.venuePhones.length - 1 && <span className="mx-2 text-gold">/</span>}
                    </span>
                  ))}
                </p>
              </div>

              <div className="mt-10 grid gap-3">
                <a href={mapsDirections(facts.venueMapsQuery)} target="_blank" rel="noopener noreferrer" className="btn-gold btn-gold-solid">
                  <Navigation className="h-4 w-4" strokeWidth={1.4} /> {v.directions}
                </a>
                <div className="grid gap-3 sm:grid-cols-2">
                  <a href={`tel:+91${facts.venuePhones[0]}`} className="btn-gold !px-4">
                    <Phone className="h-4 w-4" strokeWidth={1.4} /> {v.call}
                  </a>
                  <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="btn-gold !px-4">
                    <WhatsAppIcon className="h-4 w-4" /> {v.whatsapp}
                  </a>
                </div>
                <a
                  href={mapsLocation(facts.venueMapsQuery)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex items-center justify-center gap-2 text-xs tracking-wider text-gold-deep underline-offset-4 hover:underline"
                >
                  <MapPin className="h-3.5 w-3.5" strokeWidth={1.4} /> Google Maps
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
