export type Project = {
  slug: string;
  title: string;
  year: number;
  featured: boolean;
  category: { en: string; ar: string };
  quote: { en: string; ar: string };
  file: string;
  warm?: string[];
};

export const TW = "https://cdn.tailwindcss.com";
export const BABEL = "https://unpkg.com/@babel/standalone/babel.min.js";
export const R = ["https://unpkg.com/react@18/umd/react.production.min.js", "https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"];
const ZERO = [TW, "https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js", "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js", "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js"];

export const projects: Project[] = [
  {
    slug: "mostar-city",
    title: "Mostar City",
    year: 2026,
    featured: true,
    category: { en: "CINEMATIC TRAVEL", ar: "سفر سينمائي" },
    quote: { en: "A city unfolds through motion.", ar: "مدينة تنكشف من خلال الحركة." },
    file: "/project-files/mostar-city.html",
  },
  {
    slug: "japan-tours",
    title: "Japan Tours",
    year: 2026,
    featured: true,
    category: { en: "TRAVEL EXPERIENCE", ar: "تجربة سفر" },
    quote: { en: "Ten days, framed like a film.", ar: "عشرة أيام مؤطرة كفيلم." },
    file: "/project-files/japan-tours.html",
    warm: [TW, "https://unpkg.com/lucide@latest"],
  },
  {
    slug: "securify",
    title: "Securify",
    year: 2026,
    featured: true,
    category: { en: "SECURITY / SAAS", ar: "أمن رقمي" },
    quote: { en: "Security made visible.", ar: "الأمان أصبح مرئياً." },
    file: "/project-files/securify.html",
    warm: [TW, BABEL, ...R],
  },
  {
    slug: "zero-store",
    title: "Zero Store",
    year: 2026,
    featured: true,
    category: { en: "DIGITAL COMMERCE", ar: "تجارة رقمية" },
    quote: { en: "Digital services, distilled.", ar: "الخدمات الرقمية في أبسط صورة." },
    file: "/project-files/zero-store.html",
    warm: ZERO,
  },
  {
    slug: "specialist-cleaning",
    title: "Specialist Cleaning",
    year: 2026,
    featured: true,
    category: { en: "LOCAL SERVICES", ar: "خدمات محلية" },
    quote: { en: "Craft and care in every detail.", ar: "حرفة وعناية في كل تفصيل." },
    file: "/project-files/specialist-cleaning.html",
  },
  {
    slug: "al-baraka",
    title: "Al-Baraka",
    year: 2026,
    featured: true,
    category: { en: "AGRICULTURE / SUDAN", ar: "زراعة / السودان" },
    quote: { en: "Cultivating Sudan's future.", ar: "نزرع مستقبل السودان." },
    file: "/project-files/al-baraka.html",
    warm: [TW, BABEL, ...R],
  },
  {
    slug: "prmpt",
    title: "prmpt",
    year: 2026,
    featured: true,
    category: { en: "SYNTHETIC ARCHIVE", ar: "أرشيف اصطناعي" },
    quote: { en: "An archive of synthetic imagination.", ar: "أرشيف من الخيال الاصطناعي." },
    file: "/project-files/prmpt.html",
  },
  {
    slug: "jack-3d",
    title: "Jack 3D",
    year: 2026,
    featured: true,
    category: { en: "3D CREATOR PORTFOLIO", ar: "ملف مصمم ثلاثي الأبعاد" },
    quote: { en: "Worlds built in three dimensions.", ar: "عوالم مبنية بثلاثة أبعاد." },
    file: "/project-files/jack-3d.html",
    warm: [TW, BABEL],
  },
  {
    slug: "cordex",
    title: "Cordex",
    year: 2026,
    featured: true,
    category: { en: "TRANSPORT SAFETY", ar: "سلامة النقل" },
    quote: { en: "Keeping every journey protected.", ar: "كل رحلة في حماية تامة." },
    file: "/project-files/cordex.html",
  },
  {
    slug: "skyelite",
    title: "SkyElite",
    year: 2026,
    featured: false,
    category: { en: "PRIVATE AVIATION", ar: "طيران خاص" },
    quote: { en: "Premium travel above the noise.", ar: "سفر فاخر فوق الضجيج." },
    file: "/project-files/skyelite.html",
    warm: [TW, BABEL, ...R],
  },
  {
    slug: "airlines",
    title: "Airlines",
    year: 2026,
    featured: false,
    category: { en: "AIR TRAVEL", ar: "سفر جوي" },
    quote: { en: "The world, without the stress.", ar: "العالم، بلا عناء." },
    file: "/project-files/airlines.html",
    warm: [TW],
  },
  {
    slug: "healcure",
    title: "Healcure",
    year: 2026,
    featured: false,
    category: { en: "HEALTHCARE", ar: "رعاية صحية" },
    quote: { en: "Healthcare designed for good.", ar: "رعاية صحية مصممة للخير." },
    file: "/project-files/healcure.html",
    warm: [TW],
  },
  {
    slug: "lumen-index",
    title: "Lūmen Index",
    year: 2026,
    featured: false,
    category: { en: "EDITORIAL / INDEX", ar: "تحرير وفهرسة" },
    quote: { en: "A graphic system built from light.", ar: "نظام بصري مصنوع من الضوء." },
    file: "/project-files/lumen-index.html",
    warm: [TW, BABEL],
  },
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}