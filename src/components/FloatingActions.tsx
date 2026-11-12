"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check, Download, Link2, Loader2, MoreHorizontal, Music2, Pause, Share2, X } from "lucide-react";
import { useEffect, useState } from "react";
import { downloadInvitationPdf } from "@/lib/pdf";
import { useLang } from "./i18n";
import { useMusic } from "./MusicProvider";
import { FacebookIcon, WhatsAppIcon, XIcon, ease } from "./ui";

const pageUrl = () => (typeof window !== "undefined" ? window.location.href.split("#")[0] : "");

export const whatsappShareLink = (text: string) => `https://wa.me/?text=${encodeURIComponent(`${text}${pageUrl()}`)}`;

/** Compact round button on phones; pill with equaliser bars from md up. */
function MusicButton() {
  const { playing, toggle } = useMusic();
  const { t } = useLang();
  const label = playing ? t.actions.pauseMusic : t.actions.playMusic;
  return (
    <button
      onClick={toggle}
      className="fixed bottom-4 left-4 z-40 flex h-11 w-11 items-center justify-center gap-3 rounded-full border border-gold/50 bg-ivory/95 text-ink shadow-lg shadow-black/10 transition-colors hover:border-gold md:bottom-8 md:left-8 md:h-12 md:w-auto md:pl-3.5 md:pr-4"
      aria-label={label}
      title={label}
      aria-pressed={playing}
    >
      <span className="grid h-5 w-5 place-items-center">
        {playing ? <Pause className="h-4 w-4" strokeWidth={1.4} /> : <Music2 className="h-4 w-4" strokeWidth={1.4} />}
      </span>
      <span className="hidden h-4 items-end gap-[3px] md:flex" aria-hidden="true">
        {[0, 1, 2, 3].map((i) => (
          <motion.span
            key={i}
            className="w-[2px] bg-gold"
            animate={playing ? { height: ["30%", "100%", "45%", "80%", "30%"] } : { height: "30%" }}
            transition={playing ? { duration: 1.2, repeat: Infinity, delay: i * 0.15, ease: "easeInOut" } : { duration: 0.3 }}
          />
        ))}
      </span>
      {/* small playing dot on phones */}
      {playing && <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-gold md:hidden" aria-hidden="true" />}
    </button>
  );
}

export function FloatingActions() {
  const { t } = useLang();
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [pdfBusy, setPdfBusy] = useState(false);
  const [canShare, setCanShare] = useState(false);

  useEffect(() => setCanShare(typeof navigator !== "undefined" && !!navigator.share), []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(pageUrl());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  const nativeShare = async () => {
    try {
      await navigator.share({ title: t.meta.title, text: t.share, url: pageUrl() });
    } catch {}
  };

  const pdf = async () => {
    setPdfBusy(true);
    try {
      await downloadInvitationPdf();
    } finally {
      setPdfBusy(false);
    }
  };

  const round =
    "grid h-11 w-11 place-items-center rounded-full border border-gold/50 bg-ivory/95 text-ink shadow-lg shadow-black/10 transition-colors hover:border-gold hover:bg-gold hover:text-ivory md:h-12 md:w-12";

  return (
    <>
      <MusicButton />

      <div className="fixed bottom-4 right-4 z-40 flex flex-col items-end gap-2.5 md:bottom-8 md:right-8 md:gap-3">
        <AnimatePresence>
          {open && (
            <motion.div
              className="flex flex-col items-end gap-2.5 md:gap-3"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 16 }}
              transition={{ duration: 0.35, ease }}
            >
              <button onClick={pdf} className={round} aria-label={t.actions.pdf} title={t.actions.pdf}>
                {pdfBusy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" strokeWidth={1.4} />}
              </button>
              {canShare && (
                <button onClick={nativeShare} className={round} aria-label={t.actions.share} title={t.actions.share}>
                  <Share2 className="h-4 w-4" strokeWidth={1.4} />
                </button>
              )}
              <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl())}`} target="_blank" rel="noopener noreferrer" className={round} aria-label="Facebook" title="Facebook">
                <FacebookIcon />
              </a>
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(t.share)}&url=${encodeURIComponent(pageUrl())}`}
                target="_blank"
                rel="noopener noreferrer"
                className={round}
                aria-label="X"
                title="X"
              >
                <XIcon />
              </a>
              <button onClick={copy} className={round} aria-label={t.actions.copy} title={t.actions.copy}>
                {copied ? <Check className="h-4 w-4" /> : <Link2 className="h-4 w-4" strokeWidth={1.4} />}
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <button onClick={() => setOpen((o) => !o)} className={round} aria-label={t.actions.share} title={t.actions.share} aria-expanded={open}>
          {open ? <X className="h-4 w-4" strokeWidth={1.4} /> : <MoreHorizontal className="h-5 w-5" strokeWidth={1.4} />}
        </button>
        <a
          href="https://wa.me/"
          onClick={(e) => {
            e.preventDefault();
            window.open(whatsappShareLink(t.share), "_blank", "noopener,noreferrer");
          }}
          className="relative grid h-12 w-12 place-items-center rounded-full bg-[#25D366] text-white shadow-xl shadow-[#25D366]/25 transition-transform hover:scale-105 md:h-14 md:w-14"
          aria-label={t.actions.whatsapp}
          title={t.actions.whatsapp}
        >
          <motion.span
            className="absolute inset-0 rounded-full border border-[#25D366]"
            animate={{ scale: [1, 1.35], opacity: [0.7, 0] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut" }}
          />
          <WhatsAppIcon className="h-6 w-6" />
        </a>
      </div>
    </>
  );
}
