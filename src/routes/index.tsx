import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Search, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { projects, type Project } from "../lib/projects";
import kazeLogoAsset from "../assets/kaze-icon.png.asset.json";

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
    <img className="kaze-logo" src={kazeLogoAsset.url} alt="Kaze Studio" />
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
          <a href="https://www.tiktok.com/@kaze17570?_r=1&_t=ZS-99VfLSJHkEG" target="_blank" rel="noreferrer">TIKTOK</a>
          <a href="https://t.me/Kaze277" target="_blank" rel="noreferrer">TELEGRAM</a>
          <a href="https://wa.me/218935890798" target="_blank" rel="noreferrer">WHATSAPP</a>
          <a href="mailto:kze6860@gmail.com">EMAIL</a>
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