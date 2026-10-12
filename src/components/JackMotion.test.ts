import { test } from "node:test";
import assert from "node:assert/strict";
// Browser-native helper shared by the original standalone project.
// @ts-expect-error The original HTML imports this JavaScript module directly.
import { bindMagnet, observeAnimatedImages } from "../../public/project-support/jack-motion.mjs";

test("Jack responds to touch movement and resets after the touch ends", () => {
  const listeners = new Map<string, (event?: unknown) => void>();
  let draw: (() => void) | undefined;
  const win = {
    matchMedia: () => ({ matches: false }),
    requestAnimationFrame: (callback: () => void) => { draw = callback; return 1; },
    cancelAnimationFrame: () => { draw = undefined; },
    addEventListener: (name: string, handler: (event?: unknown) => void) => listeners.set(name, handler),
    removeEventListener: (name: string) => listeners.delete(name),
  };
  const element = { style: { transform: "", transition: "" }, getBoundingClientRect: () => ({ left: 0, top: 0, width: 100, height: 100 }) };
  const cleanup = bindMagnet(element, { padding: 150, strength: 3, activeTransition: "active", inactiveTransition: "inactive" }, win);
  listeners.get("touchmove")?.({ touches: [{ clientX: 80, clientY: 50 }] });
  draw?.();
  assert.equal(element.style.transform, "translate3d(10px, 0px, 0)");
  listeners.get("touchend")?.();
  assert.equal(element.style.transform, "translate3d(0,0,0)");
  cleanup();
  assert.equal(listeners.size, 0);
});

test("offscreen Jack animations release their image sources", () => {
  let report: ((entries: unknown[]) => void) | undefined;
  const image = { dataset: { animationSrc: "original.gif" }, src: "", removeAttribute: () => { image.src = ""; } };
  let disconnected = false;
  const win = { IntersectionObserver: class {
    constructor(callback: (entries: unknown[]) => void) { report = callback; }
    observe() {}
    disconnect() { disconnected = true; }
  } };
  const cleanup = observeAnimatedImages({ querySelectorAll: () => [image] }, win);
  assert.equal(image.src, "");
  report?.([{ target: image, isIntersecting: true }]);
  assert.equal(image.src, "original.gif");
  report?.([{ target: image, isIntersecting: false }]);
  assert.equal(image.src, "");
  cleanup();
  assert.equal(disconnected, true);
});