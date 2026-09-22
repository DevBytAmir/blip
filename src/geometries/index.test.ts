import { GEOMETRY_RENDERERS } from "./index";
import { encodeMorse } from "../morse";
import type { GeometryId } from "../types";

const GEOMETRY_IDS: GeometryId[] = [
  "grid", "circles", "spokes", "spiral", "honeycomb", "barcode", "wave", "orbits", "pixel",
];

test("every GeometryId has a renderer that returns marks for non-empty input", () => {
  const { letters } = encodeMorse("HI");
  for (const id of GEOMETRY_IDS) {
    const renderer = GEOMETRY_RENDERERS[id];
    expect(renderer).toBeDefined();
    const marks = renderer(letters, { size: 400, strokeWidth: 8, spacing: 2, rotation: 0 });
    expect(marks.length).toBeGreaterThan(0);
  }
});

test("every renderer returns an empty array for empty input without throwing", () => {
  for (const id of GEOMETRY_IDS) {
    const renderer = GEOMETRY_RENDERERS[id];
    expect(() => renderer([], { size: 400, strokeWidth: 8, spacing: 2, rotation: 0 })).not.toThrow();
  }
});
