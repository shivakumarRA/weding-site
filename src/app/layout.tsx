import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Jost, Noto_Sans_Telugu, Pinyon_Script, Tiro_Telugu } from "next/font/google";
import { dictionaries, facts, images } from "@/data/content";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});
const jost = Jost({ subsets: ["latin"], weight: ["300", "400", "500"], variable: "--font-jost", display: "swap" });
const pinyon = Pinyon_Script({ subsets: ["latin"], weight: "400", variable: "--font-pinyon", display: "swap" });
const tiroTelugu = Tiro_Telugu({
  subsets: ["telugu"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-tiro-telugu",
  display: "swap",
});
const notoTelugu = Noto_Sans_Telugu({
  subsets: ["telugu"],
  weight: ["300", "400", "500"],
  variable: "--font-noto-telugu",
  display: "swap",
  preload: false,
});

const en = dictionaries.en;
const te = dictionaries.te;
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: en.meta.title,
  description: `${en.meta.description} ${te.meta.description}`,
  keywords: ["wedding invitation", "Telugu wedding", "శుభలేఖ", "Venkateswarlu", "Sneha", "P.V. Function Hall", "Nayakangudem"],
  openGraph: {
    type: "website",
    locale: "en_IN",
    alternateLocale: ["te_IN"],
    title: en.meta.title,
    description: en.meta.description,
    images: [{ url: images.couple.src, width: images.couple.width, height: images.couple.height, alt: "Venkateswarlu & Sneha" }],
  },
  twitter: { card: "summary_large_image", title: en.meta.title, description: en.meta.description, images: [images.couple.src] },
  robots: { index: false, follow: false }, // private family invitation
};

export const viewport: Viewport = { themeColor: "#fbf7f0", width: "device-width", initialScale: 1 };

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Event",
  name: "Wedding of Chi. Venkateswarlu with Chi. La. Sow. Sneha",
  startDate: facts.muhurthamISO,
  eventStatus: "https://schema.org/EventScheduled",
  eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
  location: {
    "@type": "Place",
    name: "P.V. Function Hall",
    address: "Beside Flyover, Kodad Road, Nayakangudem",
  },
  organizer: { "@type": "Person", name: "Nukapangu Thirapaiah – Thirapamma" },
  image: [images.couple.src],
  description: en.meta.description,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${jost.variable} ${pinyon.variable} ${tiroTelugu.variable} ${notoTelugu.variable}`}
    >
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        {children}
      </body>
    </html>
  );
}
