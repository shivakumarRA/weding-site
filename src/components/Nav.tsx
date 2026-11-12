"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { LangToggle, useLang } from "./i18n";
import { ease } from "./ui";

export function Nav() {
  const { t, lang } = useLang();
  const { scrollY } = useScroll();
  const [solid, setSolid] = useState(false);
  const [menu, setMenu] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => setSolid(y > 60));

  useEffect(() => {
    document.body.style.overflow = menu ? "hidden" : "";
  }, [menu]);

  const links = [
    { href: "#top", label: t.nav.home },
    { href: "#couple", label: t.nav.couple },
    { href: "#muhurtham", label: t.nav.muhurtham },
    { href: "#countdown", label: t.nav.countdown },
    { href: "#venue", label: t.nav.venue },
    { href: "#family", label: t.nav.family },
  ];

  const monogram =
    lang === "te" ? (
      <span className="font-telugu text-xl">వెం ♥ స్నే</span>
    ) : (
      <span className="font-script text-3xl">
        V<span className="mx-0.5 text-champagne">&amp;</span>S
      </span>
    );

  return (
    <>
      {/* Always-visible header: language toggle stays reachable on every screen size. */}
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          solid ? "border-b border-gold/15 bg-ivory/95" : "bg-transparent"
        }`}
      >
        <nav className="container-luxe flex h-16 items-center justify-between gap-3 md:h-20" aria-label="Main">
          <a href="#top" className={`shrink-0 transition-colors ${solid ? "text-ink" : "text-ivory"}`} aria-label="Home">
            {monogram}
          </a>

          <ul className="hidden items-center gap-7 xl:flex">
            {links.map((l) => (
              <li key={l.href}>
                <a href={l.href} className={`eyebrow group relative text-[0.62rem] transition-colors hover:text-gold ${solid ? "text-ink" : "text-ivory/90"}`}>
                  {l.label}
                  <span className="absolute -bottom-1.5 left-0 h-px w-full origin-right scale-x-0 bg-champagne transition-transform duration-500 group-hover:origin-left group-hover:scale-x-100" />
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <LangToggle tone={solid ? "dark" : "light"} />
            <button className={`xl:hidden ${solid ? "text-ink" : "text-ivory"}`} onClick={() => setMenu(true)} aria-label="Menu" aria-expanded={menu}>
              <Menu strokeWidth={1.2} className="h-7 w-7" />
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {menu && (
          <motion.div
            className="paper fixed inset-0 z-[60] flex flex-col text-ink"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className="container-luxe flex h-16 items-center justify-between">
              {monogram}
              <button onClick={() => setMenu(false)} aria-label="Close menu">
                <X strokeWidth={1.2} className="h-7 w-7" />
              </button>
            </div>
            <ul className="flex flex-1 flex-col items-center justify-center gap-6">
              {links.map((l, i) => (
                <motion.li key={l.href} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + i * 0.07, duration: 0.8, ease }}>
                  <a href={l.href} onClick={() => setMenu(false)} className="te-tight font-serif text-4xl font-light transition-colors hover:text-gold">
                    {l.label}
                  </a>
                </motion.li>
              ))}
            </ul>
            <div className="flex justify-center pb-10">
              <LangToggle tone="dark" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
