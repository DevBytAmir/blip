import { usesRotation, usesSpacing } from "./capabilities";

test("usesSpacing is true for row-based and barcode geometries", () => {
  expect(usesSpacing("grid")).toBe(true);
  expect(usesSpacing("pixel")).toBe(true);
  expect(usesSpacing("honeycomb")).toBe(true);
  expect(usesSpacing("barcode")).toBe(true);
});

test("usesSpacing is false for geometries that ignore the spacing param", () => {
  expect(usesSpacing("spokes")).toBe(false);
  expect(usesSpacing("wave")).toBe(false);
  expect(usesSpacing("spiral")).toBe(false);
  expect(usesSpacing("circles")).toBe(false);
  expect(usesSpacing("orbits")).toBe(false);
});

test("usesRotation is true only for circles and spokes", () => {
  expect(usesRotation("circles")).toBe(true);
  expect(usesRotation("spokes")).toBe(true);
});

test("usesRotation is false for geometries that ignore the rotation param", () => {
  expect(usesRotation("grid")).toBe(false);
  expect(usesRotation("pixel")).toBe(false);
  expect(usesRotation("honeycomb")).toBe(false);
  expect(usesRotation("barcode")).toBe(false);
  expect(usesRotation("wave")).toBe(false);
  expect(usesRotation("spiral")).toBe(false);
  expect(usesRotation("orbits")).toBe(false);
});
