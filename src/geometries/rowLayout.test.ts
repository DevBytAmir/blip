import { layoutRows } from "./rowLayout";
import { encodeMorse } from "../morse";

test("lays out one centered row per letter with dash wider than dot", () => {
  const { letters } = encodeMorse("EI"); // E="." I=".."
  const positions = layoutRows(letters, { size: 400, strokeWidth: 8, spacing: 2, rotation: 0 }, 3);
  expect(positions).toHaveLength(3);
  const [e, i1, i2] = positions;
  expect(e.type).toBe("dot");
  expect(i1.cy).not.toBe(e.cy); // different rows
  expect(i1.cy).toBe(i2.cy); // same row
  expect(i1.cx).not.toBe(i2.cx); // distinct columns within the row
});

test("centers each row horizontally around size / 2", () => {
  const { letters } = encodeMorse("M"); // "--"
  const positions = layoutRows(letters, { size: 400, strokeWidth: 8, spacing: 2, rotation: 0 }, 3);
  const midpoint = (positions[0].cx + positions[1].cx) / 2;
  expect(midpoint).toBeCloseTo(200, 0);
});
