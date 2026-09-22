import { renderGrid, renderPixel } from "./rows";
import { encodeMorse, totalSymbolCount } from "../morse";

const params = { size: 400, strokeWidth: 8, spacing: 2.2, rotation: 0 };

test("renderGrid produces one circle or rect per symbol, rounded", () => {
  const { letters } = encodeMorse("SOS");
  const marks = renderGrid(letters, params);
  expect(marks).toHaveLength(totalSymbolCount(letters));
  const rects = marks.filter((m) => m.kind === "rect");
  for (const rect of rects) {
    if (rect.kind === "rect") expect(rect.cornerRadius).toBeGreaterThan(0);
  }
});

test("renderPixel produces one mark per symbol, square-cornered", () => {
  const { letters } = encodeMorse("SOS");
  const marks = renderPixel(letters, params);
  expect(marks).toHaveLength(totalSymbolCount(letters));
  const rects = marks.filter((m) => m.kind === "rect");
  for (const rect of rects) {
    if (rect.kind === "rect") expect(rect.cornerRadius).toBe(0);
  }
});
