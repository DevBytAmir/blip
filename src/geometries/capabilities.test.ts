import { isLikelyCramped, usesRotation, usesSpacing } from "./capabilities";
import { encodeMorse } from "../morse";

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

test("isLikelyCramped compares total symbol count against a per-geometry cap", () => {
  const { letters } = encodeMorse("SOS");
  expect(isLikelyCramped(letters, "grid")).toBe(false);
});

test("isLikelyCramped is true for a long word on a tight geometry like circles", () => {
  const { letters } = encodeMorse("THEQUICKBROWNFOXJUMPSOVERALAZYDOG");
  expect(isLikelyCramped(letters, "circles")).toBe(true);
});
