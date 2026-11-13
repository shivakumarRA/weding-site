/**
 * ─────────────────────────────────────────────────────────────
 *  INVITATION CONTENT — English & Telugu
 *  Every word shown on the site lives here. Edit both languages together.
 * ─────────────────────────────────────────────────────────────
 */

export type Lang = "en" | "te";

const img = (id: string, w = 1600) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

/** Language-independent facts. */
export const facts = {
  /** Sumuhurtham — drives the countdown and calendar file. */
  muhurthamISO: "2026-11-22T11:22:00+05:30",
  /** Phone numbers for the venue (digits only, India). */
  venuePhones: ["9550605192", "8501804306"],
  /** WhatsApp number, with country code. */
  venueWhatsapp: "919550605192",
  /** Exactly what Google Maps searches for — built only from the supplied address. */
  venueMapsQuery: "P.V. Function Hall, Beside Flyover, Kodad Road, Nayakangudem",
  /** Exact venue location (17°11'37.6"N 79°53'35.2"E) — used for directions and the embedded map. */
  venueCoords: "17.193767,79.893109",
  /** Optional: path to an mp3 in /public (e.g. "/music/mangala-vadyam.mp3"). Empty = gentle generated melody. */
  musicSrc: "/music/wedding.mp3",
};

/** Indian wedding imagery (stock, decorative — replace with your own photos in /public/photos). */
export const images = {
  /** The couple’s own photo (public/photos/couple-2026.jpg, 1200×2141). */
  couple: { src: "/photos/couple-2026.jpg", width: 1200, height: 2141 },
  /** The groom’s photo, shown on the entrance screen (public/photos/groom-2026.jpg, 788×1279). */
  groom: { src: "/photos/groom-2026.jpg", width: 788, height: 1279 },
  hero: img("1654156577076-e0350ba86cc1", 2400), // hands joined over the sacred fire
  kalash: img("1606293926075-69a00dbfde81", 1000), // kalasam with coconut & mango leaves
  venue: img("1587271407850-8d438ca9fdf2", 1800), // decorated mandapam (placeholder — not the actual hall)
  lunch: img("1741376509047-66dae5df90f9", 1200), // served on banana leaf
  traditions: [
    { src: img("1601121141461-9d6647bca1ed", 900), alt: "Traditional gold temple jewellery" },
    { src: img("1597157639073-69284dc0fdaf", 900), alt: "Hands adorned with gold bangles during the rituals" },
    { src: img("1592997572594-34be01bc36c7", 900), alt: "Golden paddy — akshintalu for blessings" },
    { src: img("1505932794465-147d1f1b2c97", 900), alt: "Hands decorated with gorintaku (henna)" },
  ],
};

const en = {
  meta: {
    title: "Venkateswarlu & Sneha — Wedding Invitation · 22 November 2026",
    description:
      "Wedding of Chi. Venkateswarlu with Chi. La. Sow. Sneha — Sunday, 22 November 2026 at 11:22 AM, P.V. Function Hall, Kodad Road, Nayakangudem.",
  },
  nav: { home: "Invitation", couple: "The Couple", muhurtham: "Muhurtham", countdown: "Countdown", venue: "Venue", family: "Family" },
  blessing: "Srirasthu! Subhamasthu!! Avighnamasthu!!!",
  opening: {
    invited: "You are cordially invited",
    open: "Open Invitation",
    noMusic: "Enter without music",
    names: "Venkateswarlu & Sneha",
    date: "22 . 11 . 2026",
  },
  hero: {
    title: "Wedding Invitation",
    blessings: "With the blessings of our elders and families.",
    solicit:
      "We solicit your gracious presence with family and friends on the auspicious occasion of the marriage of our only son.",
    groomPrefix: "Chi.",
    groom: "Venkateswarlu",
    with: "with",
    bridePrefix: "Chi. La. Sow.",
    bride: "Sneha",
    date: "22 November 2026",
    day: "Sunday",
    time: "11:22 AM",
    scroll: "Scroll",
  },
  couple: {
    eyebrow: "A Blessed Union",
    title: "The Couple",
    script: "two families, one celebration",
    groomLabel: "The Groom",
    brideLabel: "The Bride",
    with: "with",
    brideFamily: "Second Daughter of Sri Marapangu Nagarjuna and Chilakamma",
    photoAlt: "Venkateswarlu and Sneha",
    residenceLabel: "Residence",
    residence: ["Kudali Village,", "Mothey Mandal,", "Suryapet District."],
  },
  muhurtham: {
    eyebrow: "The Auspicious Moment",
    title: "Sumuhurtham",
    month: "November",
    year: "2026",
    dayNum: "22",
    day: "Sunday",
    dateLabel: "Date",
    date: "Sunday, 22 November 2026",
    timeLabel: "Time",
    time: "11:22 AM",
    nakshatramLabel: "Nakshatram",
    nakshatram: "Aswini Nakshatram",
    lagnamLabel: "Lagnam",
    lagnam: "Dhanassu Lagnam",
    lunchLabel: "Lunch",
    lunchTime: "12:00 PM",
  },
  countdown: {
    eyebrow: "Counting down to the Sumuhurtham",
    title: "22 November 2026 · 11:22 AM",
    units: { days: "Days", hours: "Hours", minutes: "Minutes", seconds: "Seconds" },
    done: "The auspicious moment has arrived",
    calendar: "Add to Calendar",
  },
  venue: {
    eyebrow: "Wedding Venue",
    title: "The Venue",
    name: "P.V. Function Hall",
    address: ["Beside Flyover,", "Kodad Road,", "Nayakangudem."],
    directions: "Get Directions",
    call: "Call Venue",
    whatsapp: "WhatsApp",
    photoAlt: "Decorated wedding mandapam",
  },
  family: {
    eyebrow: "Invitation By",
    names: "Nukapangu Thirapaiah – Thirapamma",
    address: ["Vallapuram Village,", "Nadigudem Mandal,", "Suryapet District."],
    compliments: "With Best Compliments from:",
    nearDear: "Near & Dear...",
  },
  closing: {
    message: "Your gracious presence with family and friends will make our celebration even more memorable.",
    love: "With Love & Best Wishes,",
    names: "Venkateswarlu & Sneha",
    date: "Sunday, 22 November 2026",
  },
  actions: {
    playMusic: "Play music",
    pauseMusic: "Pause music",
    share: "Share",
    whatsapp: "Share on WhatsApp",
    pdf: "Download invitation (PDF)",
    copy: "Copy link",
  },
  share:
    "Wedding Invitation 💐\nChi. Venkateswarlu with Chi. La. Sow. Sneha\nSunday, 22 November 2026 · 11:22 AM\nP.V. Function Hall, Beside Flyover, Kodad Road, Nayakangudem.\n",
};

export type Dict = typeof en;

const te: Dict = {
  meta: {
    title: "వెంకటేశ్వర్లు & స్నేహ — వివాహ శుభలేఖ · 22 నవంబర్ 2026",
    description:
      "చి॥ వెంకటేశ్వర్లు మరియు చి॥ ల॥ సౌ॥ స్నేహ ల వివాహం — ఆదివారం, 22 నవంబర్ 2026, ఉదయం 11:22 గంటలకు, పి.వి. ఫంక్షన్ హాల్, కోదాడ రోడ్డు, నాయకన్‌గూడెం.",
  },
  nav: { home: "ఆహ్వానం", couple: "వధూవరులు", muhurtham: "ముహూర్తం", countdown: "కౌంట్‌డౌన్", venue: "వేదిక", family: "ఆహ్వానించువారు" },
  blessing: "శ్రీరస్తు! శుభమస్తు!! అవిఘ్నమస్తు!!!",
  opening: {
    invited: "మీకు సాదర ఆహ్వానం",
    open: "శుభలేఖను తెరవండి",
    noMusic: "సంగీతం లేకుండా ప్రవేశించండి",
    names: "వెంకటేశ్వర్లు & స్నేహ",
    date: "22 . 11 . 2026",
  },
  hero: {
    title: "వివాహ శుభలేఖ",
    blessings: "మా పెద్దలు మరియు కుటుంబ సభ్యుల ఆశీస్సులతో.",
    solicit:
      "మా ఏకైక కుమారుని వివాహ శుభ సందర్భమున, మీరు సకుటుంబ సపరివార సమేతంగా విచ్చేసి మీ అమూల్యమైన సన్నిధిని ప్రసాదించవలసినదిగా సవినయంగా కోరుచున్నాము.",
    groomPrefix: "చి॥",
    groom: "వెంకటేశ్వర్లు",
    with: "మరియు",
    bridePrefix: "చి॥ ల॥ సౌ॥",
    bride: "స్నేహ",
    date: "22 నవంబర్ 2026",
    day: "ఆదివారం",
    time: "ఉదయం 11:22 గంటలకు",
    scroll: "క్రిందకు",
  },
  couple: {
    eyebrow: "శుభ బంధం",
    title: "వధూవరులు",
    script: "రెండు కుటుంబాలు, ఒకే వేడుక",
    groomLabel: "వరుడు",
    brideLabel: "వధువు",
    with: "మరియు",
    brideFamily: "శ్రీ మారపంగు నాగార్జున మరియు చిలకమ్మ గార్ల ద్వితీయ పుత్రిక",
    photoAlt: "వెంకటేశ్వర్లు మరియు స్నేహ",
    residenceLabel: "నివాసం",
    residence: ["కూడలి గ్రామం,", "మోతే మండలం,", "సూర్యాపేట జిల్లా."],
  },
  muhurtham: {
    eyebrow: "శుభ ఘడియ",
    title: "సుముహూర్తం",
    month: "నవంబర్",
    year: "2026",
    dayNum: "22",
    day: "ఆదివారం",
    dateLabel: "తేదీ",
    date: "ఆదివారం, 22 నవంబర్ 2026",
    timeLabel: "సమయం",
    time: "ఉదయం 11:22 గంటలకు",
    nakshatramLabel: "నక్షత్రం",
    nakshatram: "అశ్విని నక్షత్రం",
    lagnamLabel: "లగ్నం",
    lagnam: "ధనస్సు లగ్నం",
    lunchLabel: "విందు భోజనం",
    lunchTime: "మధ్యాహ్నం 12:00 గంటలకు",
  },
  countdown: {
    eyebrow: "సుముహూర్తానికి మిగిలిన సమయం",
    title: "22 నవంబర్ 2026 · ఉదయం 11:22",
    units: { days: "రోజులు", hours: "గంటలు", minutes: "నిమిషాలు", seconds: "సెకన్లు" },
    done: "శుభ ముహూర్తం ఆసన్నమైంది",
    calendar: "క్యాలెండర్‌కు జోడించండి",
  },
  venue: {
    eyebrow: "వివాహ వేదిక",
    title: "వేదిక",
    name: "పి.వి. ఫంక్షన్ హాల్",
    address: ["ఫ్లైఓవర్ ప్రక్కన,", "కోదాడ రోడ్డు,", "నాయకన్‌గూడెం."],
    directions: "దారి చూపించు",
    call: "వేదికకు కాల్ చేయండి",
    whatsapp: "వాట్సాప్",
    photoAlt: "అలంకరించిన వివాహ మండపం",
  },
  family: {
    eyebrow: "ఆహ్వానించువారు",
    names: "నూకపంగు తిరపయ్య – తిరపమ్మ",
    address: ["వల్లాపురం గ్రామం,", "నడిగూడెం మండలం,", "సూర్యాపేట జిల్లా."],
    compliments: "శుభాకాంక్షలతో:",
    nearDear: "బంధుమిత్రులు...",
  },
  closing: {
    message: "మీరు సకుటుంబ సపరివార సమేతంగా విచ్చేసి, మా వేడుకను మరింత మధురమైన జ్ఞాపకంగా మలచగలరని ఆశిస్తున్నాము.",
    love: "ప్రేమ మరియు శుభాకాంక్షలతో,",
    names: "వెంకటేశ్వర్లు & స్నేహ",
    date: "ఆదివారం, 22 నవంబర్ 2026",
  },
  actions: {
    playMusic: "సంగీతం ప్రారంభించండి",
    pauseMusic: "సంగీతం ఆపండి",
    share: "పంచుకోండి",
    whatsapp: "వాట్సాప్‌లో పంచుకోండి",
    pdf: "శుభలేఖ డౌన్‌లోడ్ (PDF)",
    copy: "లింక్ కాపీ చేయండి",
  },
  share:
    "వివాహ శుభలేఖ 💐\nచి॥ వెంకటేశ్వర్లు మరియు చి॥ ల॥ సౌ॥ స్నేహ\nఆదివారం, 22 నవంబర్ 2026 · ఉదయం 11:22 గంటలకు\nపి.వి. ఫంక్షన్ హాల్, ఫ్లైఓవర్ ప్రక్కన, కోదాడ రోడ్డు, నాయకన్‌గూడెం.\n",
};

export const dictionaries: Record<Lang, Dict> = { en, te };

export const mapsDirections = (q: string) =>
  `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(q)}`;
export const mapsLocation = (q: string) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;
export const mapsEmbed = (q: string) =>
  `https://maps.google.com/maps?q=${encodeURIComponent(q)}&z=16&output=embed`;
