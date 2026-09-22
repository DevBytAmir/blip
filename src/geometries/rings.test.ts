import { renderCircles, renderOrbits } from "./rings";
import { encodeMorse } from "../morse";

const params = { size: 400, strokeWidth: 8, spacing: 2, rotation: 0 };

test("renderCircles produces one ring per letter, un-rotated", () => {
  const { letters } = encodeMorse("SOS");
  const marks = renderCircles(letters, params);
  expect(marks).toHaveLength(3);
  for (const mark of marks) {
    expect(mark.kind).toBe("ring");
    if (mark.kind === "ring") {
      expect(mark.rx).toBe(mark.ry);
      expect(mark.rotation).toBe(0);
    }
  }
});

test("renderOrbits produces one tilted ellipse per letter", () => {
  const { letters } = encodeMorse("SOS");
  const marks = renderOrbits(letters, params);
  expect(marks).toHaveLength(3);
  for (const mark of marks) {
    if (mark.kind === "ring") expect(mark.rx).toBeGreaterThan(mark.ry);
  }
  const rotations = marks.map((m) => (m.kind === "ring" ? m.rotation : 0));
  expect(new Set(rotations).size).toBeGreaterThan(1);
});

test("ring radius never goes to zero or negative for very long input", () => {
  const { letters } = encodeMorse("THEQUICKBROWNFOXJUMPSOVERALAZYDOG");
  const marks = renderCircles(letters, params);
  for (const mark of marks) {
    if (mark.kind === "ring") {
      expect(mark.rx).toBeGreaterThan(0);
      expect(mark.ry).toBeGreaterThan(0);
    }
  }
});
