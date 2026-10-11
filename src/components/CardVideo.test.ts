import { test } from "node:test";
import assert from "node:assert/strict";
import { MIN_CARD_VIDEO_VISIBILITY, cardVideoLimit, skipCardVideo } from "./CardVideo";
import { projects } from "../lib/projects";

test("card videos start only at the 60% visibility threshold", () => {
  assert.equal(MIN_CARD_VIDEO_VISIBILITY, 0.6);
});
test("touch devices allow at most two card videos", () => {
  assert.equal(cardVideoLimit(true), 2);
});
test("fine-pointer devices allow at most four card videos", () => {
  assert.equal(cardVideoLimit(false), 4);
});
test("Save Data keeps posters only", () => {
  assert.equal(skipCardVideo({ saveData: true, effectiveType: "4g" }), true);
  assert.equal(skipCardVideo({ saveData: false, effectiveType: "4g" }), false);
});
for (const effectiveType of ["slow-2g", "2g", "3g"]) {
  test(`${effectiveType} keeps posters only`, () => assert.equal(skipCardVideo({ effectiveType }), true));
}
test("reduced motion keeps posters only", () => {
  assert.equal(skipCardVideo(undefined, true), true);
  assert.equal(skipCardVideo(undefined, false), false);
});
test("only the seven requested projects have video cards", () => {
  assert.deepEqual(projects.filter((p) => p.video).map((p) => p.slug).sort(),
    ["airlines", "al-baraka", "cordex", "lumen-index", "prmpt", "securify", "skyelite"].sort());
});
test("the six remaining projects keep still thumbnails", () => {
  for (const slug of ["mostar-city", "japan-tours", "zero-store", "specialist-cleaning", "jack-3d", "healcure"]) {
    const project = projects.find((p) => p.slug === slug);
    assert.ok(project);
    assert.equal(project.video, undefined);
  }
});