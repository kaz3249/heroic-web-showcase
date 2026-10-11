import { useEffect, useRef } from "react";

// At most a few card videos download/play at the same time; the oldest is stopped first.
const running = new Map<HTMLVideoElement, () => void>();
export const MIN_CARD_VIDEO_VISIBILITY = 0.6;
export const cardVideoLimit = (coarse: boolean) => coarse ? 2 : 4;
export function skipCardVideo(connection?: { saveData?: boolean; effectiveType?: string }, reducedMotion = false) {
  return reducedMotion || Boolean(connection?.saveData) || ["slow-2g", "2g", "3g"].includes(connection?.effectiveType ?? "");
}

export function CardVideo({ src, poster }: { src: string; poster: string }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }).connection;
    if (!video || skipCardVideo(connection, window.matchMedia("(prefers-reduced-motion: reduce)").matches)) return;
    const maxPlaying = cardVideoLimit(window.matchMedia("(pointer: coarse)").matches);

    const stop = () => {
      running.delete(video);
      video.pause();
      if (video.hasAttribute("src")) {
        video.removeAttribute("src");
        video.load();
      }
    };
    const start = () => {
      if (running.has(video)) return;
      while (running.size >= maxPlaying) running.values().next().value?.();
      running.set(video, stop);
      video.muted = true;
      video.src = src;
      video.play().catch(() => {});
    };

    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.intersectionRatio >= MIN_CARD_VIDEO_VISIBILITY ? start() : stop()),
      { threshold: [0, MIN_CARD_VIDEO_VISIBILITY] },
    );
    io.observe(video);

    const retry = () => {
      if (running.has(video) && video.paused) video.play().catch(() => {});
    };
    document.addEventListener("touchend", retry, { passive: true });
    document.addEventListener("click", retry, { passive: true });

    return () => {
      io.disconnect();
      document.removeEventListener("touchend", retry);
      document.removeEventListener("click", retry);
      stop();
    };
  }, [src]);

  return <video ref={ref} className="card-video" poster={poster} muted loop playsInline preload="none" aria-hidden="true" tabIndex={-1} />;
}