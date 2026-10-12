// DOM-only motion: no WebGL, sensor permissions, or additional libraries.
export function bindMagnet(element, { padding, strength, activeTransition, inactiveTransition }, win = window) {
  let frame = 0;
  let point = null;
  const reset = () => {
    element.style.transition = inactiveTransition;
    element.style.transform = 'translate3d(0,0,0)';
  };
  const draw = () => {
    frame = 0;
    if (!point) return;
    const rect = element.getBoundingClientRect();
    const dx = point.x - rect.left - rect.width / 2;
    const dy = point.y - rect.top - rect.height / 2;
    if (Math.hypot(dx, dy) >= Math.max(rect.width, rect.height) / 2 + padding) return reset();
    element.style.transition = activeTransition;
    element.style.transform = `translate3d(${dx / strength}px, ${dy / strength}px, 0)`;
  };
  const move = (event) => {
    if (win.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const contact = event.touches ? event.touches[0] : event;
    if (!contact) return;
    point = { x: contact.clientX, y: contact.clientY };
    if (!frame) frame = win.requestAnimationFrame(draw);
  };
  const end = () => {
    if (frame) win.cancelAnimationFrame(frame);
    frame = 0;
    point = null;
    reset();
  };
  win.addEventListener('mousemove', move, { passive: true });
  win.addEventListener('touchstart', move, { passive: true });
  win.addEventListener('touchmove', move, { passive: true });
  win.addEventListener('touchend', end, { passive: true });
  win.addEventListener('touchcancel', end, { passive: true });
  win.addEventListener('blur', end);
  return () => {
    for (const event of ['mousemove', 'touchstart', 'touchmove']) win.removeEventListener(event, move);
    for (const event of ['touchend', 'touchcancel', 'blur']) win.removeEventListener(event, end);
    end();
  };
}

export function bindMarquee(section, firstRow, secondRow, win = window) {
  let frame = 0;
  const draw = () => {
    frame = 0;
    const rect = section.getBoundingClientRect();
    if (rect.bottom < 0 || rect.top > win.innerHeight) return;
    if (win.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const offset = (win.innerHeight - rect.top) * 0.3 - 200;
    firstRow.style.transform = `translateX(${offset}px)`;
    secondRow.style.transform = `translateX(${-offset}px)`;
  };
  const schedule = () => { if (!frame) frame = win.requestAnimationFrame(draw); };
  win.addEventListener('scroll', schedule, { passive: true });
  win.addEventListener('resize', schedule, { passive: true });
  schedule();
  return () => {
    win.removeEventListener('scroll', schedule);
    win.removeEventListener('resize', schedule);
    if (frame) win.cancelAnimationFrame(frame);
  };
}

export function observeAnimatedImages(section, win = window) {
  const images = [...section.querySelectorAll('img[data-animation-src]')];
  if (!win.IntersectionObserver) {
    images.forEach(image => { image.src = image.dataset.animationSrc; });
    return () => {};
  }
  const observer = new win.IntersectionObserver(entries => {
    entries.forEach(({ target, isIntersecting }) => {
      if (isIntersecting) target.src = target.dataset.animationSrc;
      else target.removeAttribute('src');
    });
  }, { rootMargin: '120px' });
  images.forEach(image => observer.observe(image));
  return () => observer.disconnect();
}