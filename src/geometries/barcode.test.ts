import { renderBarcode } from "./barcode";
import { encodeMorse, totalSymbolCount } from "../morse";

const params = { size: 400, strokeWidth: 6, spacing: 2, rotation: 0 };

test("renderBarcode produces one square-cornered bar per symbol, left to right", () => {
  const { letters } = encodeMorse("SOS");
  const marks = renderBarcode(letters, params);
  expect(marks).toHaveLength(totalSymbolCount(letters));
  for (const mark of marks) {
    if (mark.kind === "rect") {
      expect(mark.cornerRadius).toBe(0);
      expect(mark.rotation).toBe(0);
    }
  }
  const xs = marks.map((m) => (m.kind === "rect" ? m.cx : 0));
  expect(xs).toEqual([...xs].sort((a, b) => a - b));
});

test("dash bars are wider than dot bars", () => {
  const { letters } = encodeMorse("EO"); // E = ".", O = "---"
  const marks = renderBarcode(letters, params);
  const widths = marks.map((m) => (m.kind === "rect" ? m.width : 0));
  expect(widths[1]).toBeGreaterThan(widths[0]);
});
