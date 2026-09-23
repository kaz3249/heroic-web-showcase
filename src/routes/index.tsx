import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Mail, Search, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { projects, type Project } from "../lib/projects";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Kaze Studio — Cinematic Web Design" },
      { name: "description", content: "Kaze Studio creates cinematic websites, digital identities, and memorable interactive experiences." },
      { property: "og:title", content: "Kaze Studio — Cinematic Web Design" },
      { property: "og:description", content: "Distinctive digital experiences and high-end websites for ambitious brands." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: KazeStudio,
});

type Language = "en" | "ar";
const copy = {
  en: {
    booking: "Booking new projects · reserve yours →",
    about: "About",
    work: "Work",
    hire: "Hire me",
    hello: "Say hello",
    badge: `${projects.length} SELECTED WORKS · NEW DROPS QUARTERLY`,
    leadA: "Cinematic design,",
    leadB: "one story at a time.",
    intro: "We're Kaze Studio — designers and art directors crafting sites that don't look templated. Brand, motion and code, wired into one frame.",
    viewWork: "View selected work",
    touch: "Get in touch",
    studio: "THE STUDIO",
    aboutA: "A Sudanese studio,",
    aboutB: "built for the web.",
    aboutP1: "Kaze Studio is a digital creative studio based in Khartoum, Sudan, crafting distinctive digital experiences and high-end websites for ambitious brands.",
    aboutP2: "We blend luxury visual design, cinematic motion, interactive technology, and strategic digital thinking to turn brands into memorable digital experiences.",
    search: "Search projects",
    featured: "Featured",
    latest: "Latest",
    tag: "FEATURED",
    empty: "No projects match your search.",
    next: "NEXT STEP",
    makeA: "Let's make something",
    makeB: "worth remembering.",
    open: "OPEN FULL PAGE",
    close: "CLOSE",
    location: "Khartoum · 15.50°N 32.56°E",
  },
  ar: {
    booking: "نحجز مشاريع جديدة · احجز مكانك ←",
    about: "من نحن",
    work: "الأعمال",
    hire: "اعمل معنا",
    hello: "قل مرحباً",
    badge: `${projects.length} أعمال مختارة · إصدارات جديدة دورياً`,
    leadA: "تصميم سينمائي،",
    leadB: "قصة في كل إطار.",
    intro: "نحن كازي ستوديو — مصمّمون ومخرجون فنّيون نصنع مواقع لا تبدو كقوالب جاهزة. علامة وحركة وكود في إطار واحد.",
    viewWork: "شاهد الأعمال المختارة",
    touch: "تواصل معنا",
    studio: "الاستوديو",
    aboutA: "استوديو سوداني،",
    aboutB: "صُنع للإنترنت.",
    aboutP1: "كازي ستوديو استوديو إبداعي رقمي مقره الخرطوم، يصنع تجارب رقمية مميزة ومواقع راقية للعلامات الطموحة.",
    aboutP2: "نمزج التصميم البصري الفاخر، والحركة السينمائية، والتقنية التفاعلية، والتفكير الرقمي الاستراتيجي لنحوّل العلامات إلى تجارب لا تُنسى.",
    search: "ابحث في المشاريع",
    featured: "مميز",
    latest: "الأحدث",
    tag: "مميز",
    empty: "لا توجد مشاريع مطابقة لبحثك.",
    next: "الخطوة التالية",
    makeA: "لنصنع معاً شيئاً",
    makeB: "يستحق أن يُذكر.",
    open: "افتح الصفحة كاملة",
    close: "إغلاق",
    location: "الخرطوم · 15.50°N 32.56°E",
  },
} as const;

function KazeMark() {
  return (
    <img className="kaze-logo" src="/favicon.png" alt="Kaze Studio" />
  );
}

function IconTikTok() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
    </svg>
  );
}

function IconTelegram() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
    </svg>
  );
}

function IconWhatsApp() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
    </svg>
  );
}

function ProjectCard({ project, language, label, onOpen }: { project: Project; language: Language; label: string; onOpen: (project: Project) => void }) {
  return (
    <article className="project-card">
      <div
        className="project-trigger"
        role="button"
        tabIndex={0}
        onClick={() => onOpen(project)}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            onOpen(project);
          }
        }}
        aria-label={`View ${project.title}`}
      >
        <span className="project-thumb">
          <iframe src={project.file} title={`${project.title} preview`} loading="lazy" tabIndex={-1} aria-hidden="true" />
          {project.featured && <span className="featured-badge">{label}</span>}
          <span className="project-overlay">
            <span>“{project.quote[language]}”</span>
            <span className="round-arrow"><ArrowUpRight size={16} /></span>
          </span>
        </span>
      </div>
      <div className="project-meta">
        <h3>{project.title}</h3>
        <span>{project.category[language]}</span>
        <time>{project.year}</time>
      </div>
    </article>
  );
}

function KazeStudio() {
  const [language, setLanguage] = useState<Language>("en");
  const [query, setQuery] = useState("");
  const [mode, setMode] = useState<"featured" | "latest">("featured");
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const t = copy[language];

  const visibleProjects = useMemo(() => {
    const term = query.trim().toLowerCase();
    const list = projects.filter((project) => `${project.title} ${project.category[language]}`.toLowerCase().includes(term));
    return [...list].sort((a, b) => mode === "featured" ? Number(b.featured) - Number(a.featured) : b.year - a.year);
  }, [language, mode, query]);

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
    return () => { document.documentElement.lang = "en"; document.documentElement.dir = "ltr"; };
  }, [language]);

  useEffect(() => {
    document.body.classList.toggle("viewer-open", Boolean(activeProject));
    const close = (event: KeyboardEvent) => event.key === "Escape" && setActiveProject(null);
    window.addEventListener("keydown", close);
    return () => { document.body.classList.remove("viewer-open"); window.removeEventListener("keydown", close); };
  }, [activeProject]);

  return (
    <main className="kaze-site">
      <a className="booking-strip" href="mailto:kze6860@gmail.com"><span>✦</span>{t.booking}</a>
      <header className="site-nav">
        <a href="#top" aria-label="Kaze Studio home"><KazeMark /></a>
        <nav className="nav-pill" aria-label="Primary navigation">
          <a href="#about">{t.about}</a><a href="#work">{t.work}</a><a className="nav-hire" href="#contact">{t.hire}</a>
        </nav>
        <div className="nav-actions">
          <div className="language-switch" aria-label="Language">
            <button className={language === "en" ? "active" : ""} onClick={() => setLanguage("en")}>EN</button>
            <button className={language === "ar" ? "active" : ""} onClick={() => setLanguage("ar")}>AR</button>
          </div>
          <a className="say-hello" href="#contact">{t.hello}</a>
        </div>
      </header>

      <section className="kaze-panel hero-panel" id="top">
        <div className="availability"><i />{t.badge}</div>
        <p className="kaze-word">KAZE</p>
        <h1>{t.leadA}<br /><span>{t.leadB}</span></h1>
        <p className="hero-copy">{t.intro}</p>
        <div className="hero-actions">
          <a className="pill-action primary-action" href="#work">{t.viewWork}<i><ArrowUpRight size={15} /></i></a>
          <a className="pill-action quiet-action" href="#contact"><b>✦</b>{t.touch}</a>
        </div>
      </section>

      <section className="about-section" id="about">
        <p className="eyebrow">{t.studio}</p>
        <h2>{t.aboutA}<br /><span>{t.aboutB}</span></h2>
        <p>{t.aboutP1}</p><p>{t.aboutP2}</p>
      </section>

      <section id="work" className="work-section">
        <div className="work-toolbar">
          <label className="project-search"><Search size={15} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={t.search} /></label>
          <div className="toolbar-right">
            <div className="work-toggle">
              <button className={mode === "featured" ? "active" : ""} onClick={() => setMode("featured")}>{t.featured}</button>
              <button className={mode === "latest" ? "active" : ""} onClick={() => setMode("latest")}>{t.latest}</button>
            </div>
            <span className="project-count"><b>{visibleProjects.length}</b> / {projects.length}</span>
          </div>
        </div>
        <div className="project-grid">
          {visibleProjects.map((project) => <ProjectCard key={project.slug} project={project} language={language} label={t.tag} onOpen={setActiveProject} />)}
          {!visibleProjects.length && <p className="empty-state">{t.empty}</p>}
        </div>
      </section>

      <section className="kaze-panel contact-panel" id="contact">
        <p className="eyebrow">{t.next}</p>
        <h2>{t.makeA}<br /><em>{t.makeB}</em></h2>
        <a className="email-action" href="mailto:kze6860@gmail.com">kze6860@gmail.com<i><ArrowUpRight size={15} /></i></a>
      </section>

      <footer className="site-footer">
        <div className="footer-brand"><KazeMark /><span>© 2026</span></div>
        <div className="footer-links">
          <a href="https://www.tiktok.com/@kaze17570?_r=1&_t=ZS-99VfLSJHkEG" target="_blank" rel="noreferrer" aria-label="TikTok">
            <IconTikTok />
            <span>TIKTOK</span>
          </a>
          <a href="https://t.me/Kaze277" target="_blank" rel="noreferrer" aria-label="Telegram">
            <IconTelegram />
            <span>TELEGRAM</span>
          </a>
          <a href="https://wa.me/218935890798" target="_blank" rel="noreferrer" aria-label="WhatsApp">
            <IconWhatsApp />
            <span>WHATSAPP</span>
          </a>
          <a href="mailto:kze6860@gmail.com" aria-label="Email">
            <Mail size={17} />
            <span>EMAIL</span>
          </a>
        </div>
        <span className="footer-location">{t.location}</span>
      </footer>

      {activeProject && (
        <div className="project-viewer" role="dialog" aria-modal="true" aria-label={activeProject.title}>
          <div className="viewer-bar">
            <div className="viewer-title"><KazeMark /><span>{activeProject.title}</span></div>
            <div className="viewer-actions">
              <Link className="viewer-link" to="/projects/$slug" params={{ slug: activeProject.slug }} target="_blank">{t.open}<ArrowUpRight size={14} /></Link>
              <button className="viewer-close" onClick={() => setActiveProject(null)} aria-label={t.close}><span>{t.close}</span><X size={17} /></button>
            </div>
          </div>
          <iframe src={activeProject.file} title={activeProject.title} />
        </div>
      )}
    </main>
  );
}