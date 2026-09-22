import { hexCapsulePoints } from "./shapes";

test("hexCapsulePoints returns 6 points centered on cx/cy", () => {
  const points = hexCapsulePoints(100, 50, 40, 20);
  expect(points).toHaveLength(6);
  const avgX = points.reduce((sum, [x]) => sum + x, 0) / 6;
  const avgY = points.reduce((sum, [, y]) => sum + y, 0) / 6;
  expect(avgX).toBeCloseTo(100, 0);
  expect(avgY).toBeCloseTo(50, 0);
});
