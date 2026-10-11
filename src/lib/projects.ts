export type Project = {
  slug: string;
  title: string;
  year: number;
  featured: boolean;
  category: { en: string; ar: string };
  quote: { en: string; ar: string };
  file: string;
  video?: string;
};

export const TW = "https://cdn.tailwindcss.com";
export const BABEL = "https://unpkg.com/@babel/standalone/babel.min.js";
export const R = ["https://unpkg.com/react@18/umd/react.production.min.js", "https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"];

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
    video: "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260418_063509_7d167302-4fd4-480b-8260-18ab572333d4.mp4",
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
    video: "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260622_204103_f607742e-09da-4cf5-bb06-4e67b0a531de.mp4",
  },
  {
    slug: "prmpt",
    title: "prmpt",
    year: 2026,
    featured: true,
    category: { en: "SYNTHETIC ARCHIVE", ar: "أرشيف اصطناعي" },
    quote: { en: "An archive of synthetic imagination.", ar: "أرشيف من الخيال الاصطناعي." },
    file: "/project-files/prmpt.html",
    video: "https://d8j0ntlcm91z4.cloudfront.net/user_39ca84eAE1ODL9hbR5VhoEj8tBf/hf_20260625_154401_a664f076-b971-4557-8728-40ef9ea4c49b.mp4",
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
    video: "https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/77806b3d-8a1a-4df5-af52-0651710f8a85.mp4",
  },
  {
    slug: "skyelite",
    title: "SkyElite",
    year: 2026,
    featured: false,
    category: { en: "PRIVATE AVIATION", ar: "طيران خاص" },
    quote: { en: "Premium travel above the noise.", ar: "سفر فاخر فوق الضجيج." },
    file: "/project-files/skyelite.html",
    video: "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_091828_e240eb17-6edc-4129-ad9d-98678e3fd238.mp4",
  },
  {
    slug: "airlines",
    title: "Airlines",
    year: 2026,
    featured: false,
    category: { en: "AIR TRAVEL", ar: "سفر جوي" },
    quote: { en: "The world, without the stress.", ar: "العالم، بلا عناء." },
    file: "/project-files/airlines.html",
    video: "https://cdn.sceneai.art/Hero%20Section%20Video/01d1f8de-fec0-4bf5-8b48-9fc2dbc8c6b0.mp4",
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
    video: "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260813_115057_94c3699b-0fd1-4124-bcf3-3626bb8c1f77.mp4",
  },
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}