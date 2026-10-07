import { projects, R, TW, type Project } from "./projects";

const warmed = new Set<string>();
let viewerOpen = false;

export function setViewerOpen(open: boolean) {
  viewerOpen = open;
}

function canWarm() {
  if (typeof window === "undefined" || viewerOpen) return false;
  const connection = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }).connection;
  if (connection?.saveData) return false;
  if (connection?.effectiveType && ["slow-2g", "2g", "3g"].includes(connection.effectiveType)) return false;
  return true;
}

function warmUrl(url: string, crossOrigin: boolean) {
  if (warmed.has(url)) return;
  warmed.add(url);
  const init: RequestInit & { priority?: string } = { priority: "low" };
  if (crossOrigin) init.mode = "no-cors";
  fetch(url, init).catch(() => warmed.delete(url));
}

export function warmProject(project: Project) {
  if (!canWarm()) return;
  warmUrl(project.file, false);
  project.warm?.forEach((url) => warmUrl(url, true));
}

function idle(callback: () => void) {
  const ric = (window as Window & { requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number }).requestIdleCallback;
  if (ric) ric(callback, { timeout: 2000 });
  else setTimeout(callback, 1);
}

/** Idle warm-up: shared libraries + first 4 project pages. Never Babel. */
export function startIdleWarmup() {
  if (typeof window === "undefined") return () => {};
  let loaded = document.readyState === "complete";
  let interacted = false;
  let done = false;
  let timer: ReturnType<typeof setTimeout> | undefined;
  const run = () => {
    if (done || !loaded || !interacted) return;
    done = true;
    timer = setTimeout(() => idle(() => {
      if (!canWarm()) { done = false; return; }
      [TW, ...R].forEach((url) => warmUrl(url, true));
      projects.slice(0, 4).forEach((project) => warmUrl(project.file, false));
    }), 3000);
  };
  const onLoad = () => { loaded = true; run(); };
  const onInteract = () => { interacted = true; run(); };
  const events = ["scroll", "touchstart", "pointerdown"] as const;
  window.addEventListener("load", onLoad, { once: true });
  events.forEach((name) => window.addEventListener(name, onInteract, { once: true, passive: true }));
  return () => {
    clearTimeout(timer);
    window.removeEventListener("load", onLoad);
    events.forEach((name) => window.removeEventListener(name, onInteract));
  };
}
