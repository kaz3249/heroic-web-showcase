export type Project = {
  slug: string;
  title: string;
  year: number;
  featured: boolean;
  category: { en: string; ar: string };
  quote: { en: string; ar: string };
  file: string;
};

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
  },
  {
    slug: "securify",
    title: "Securify",
    year: 2026,
    featured: true,
    category: { en: "SECURITY / SAAS", ar: "أمن رقمي" },
    quote: { en: "Security made visible.", ar: "الأمان أصبح مرئياً." },
    file: "/project-files/securify.html",
  },
  {
    slug: "zero-store",
    title: "Zero Store",
    year: 2026,
    featured: true,
    category: { en: "DIGITAL COMMERCE", ar: "تجارة رقمية" },
    quote: { en: "Digital services, distilled.", ar: "الخدمات الرقمية في أبسط صورة." },
    file: "/project-files/zero-store.html",
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
  },
  {
    slug: "airlines",
    title: "Airlines",
    year: 2026,
    featured: false,
    category: { en: "AIR TRAVEL", ar: "سفر جوي" },
    quote: { en: "The world, without the stress.", ar: "العالم، بلا عناء." },
    file: "/project-files/airlines.html",
  },
  {
    slug: "healcure",
    title: "Healcure",
    year: 2026,
    featured: false,
    category: { en: "HEALTHCARE", ar: "رعاية صحية" },
    quote: { en: "Healthcare designed for good.", ar: "رعاية صحية مصممة للخير." },
    file: "/project-files/healcure.html",
  },
  {
    slug: "lumen-index",
    title: "Lūmen Index",
    year: 2026,
    featured: false,
    category: { en: "EDITORIAL / INDEX", ar: "تحرير وفهرسة" },
    quote: { en: "A graphic system built from light.", ar: "نظام بصري مصنوع من الضوء." },
    file: "/project-files/lumen-index.html",
  },
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}