"use client";

import { motion } from "framer-motion";
import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import { dictionaries, type Dict, type Lang } from "@/data/content";

type Ctx = { lang: Lang; t: Dict; setLang: (l: Lang) => void };
const LangCtx = createContext<Ctx | null>(null);
const KEY = "invite-lang";

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en"); // English is the default

  useEffect(() => {
    try {
      const saved = localStorage.getItem(KEY);
      if (saved === "te" || saved === "en") setLangState(saved);
    } catch {}
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.title = dictionaries[lang].meta.title;
  }, [lang]);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem(KEY, l);
    } catch {}
  }, []);

  return <LangCtx.Provider value={{ lang, t: dictionaries[lang], setLang }}>{children}</LangCtx.Provider>;
}

export function useLang() {
  const c = useContext(LangCtx);
  if (!c) throw new Error("useLang must be used inside <LanguageProvider>");
  return c;
}

/** English / తెలుగు segmented toggle with a sliding gold pill. */
export function LangToggle({ tone = "dark", className = "" }: { tone?: "dark" | "light"; className?: string }) {
  const { lang, setLang } = useLang();
  const options: { id: Lang; label: string }[] = [
    { id: "en", label: "English" },
    { id: "te", label: "తెలుగు" },
  ];
  const border = tone === "light" ? "border-champagne/60" : "border-gold/50";
  return (
    <div
      role="group"
      aria-label="Language"
      className={`relative inline-flex rounded-full border ${border} p-0.5 ${tone === "light" ? "bg-ink/30" : "bg-ivory/80"} ${className}`}
    >
      {options.map((o) => {
        const active = lang === o.id;
        return (
          <button
            key={o.id}
            onClick={() => setLang(o.id)}
            aria-pressed={active}
            lang={o.id}
            className={`relative z-10 rounded-full px-3.5 py-1.5 text-[0.72rem] font-normal tracking-wide transition-colors duration-300 sm:px-4 ${
              active ? "text-ivory" : tone === "light" ? "text-ivory/85 hover:text-champagne" : "text-gold-deep hover:text-ink"
            } ${o.id === "te" ? "font-telugu text-[0.8rem]" : ""}`}
          >
            {active && (
              <motion.span
                layoutId={`lang-pill-${tone}`}
                className="absolute inset-0 -z-10 rounded-full bg-gold"
                transition={{ type: "spring", stiffness: 420, damping: 34 }}
              />
            )}
            {o.label}
          </button>
        );
      })}
    </div>
  );
}
