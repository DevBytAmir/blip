import { isValidConfig } from "./configValidation";
import { DEFAULT_CONFIG } from "./types";

test("accepts a well-formed config", () => {
  expect(isValidConfig(DEFAULT_CONFIG)).toBe(true);
});

test("rejects non-object values", () => {
  expect(isValidConfig(null)).toBe(false);
  expect(isValidConfig("nope")).toBe(false);
  expect(isValidConfig(42)).toBe(false);
});

test("rejects an invalid geometry enum value", () => {
  expect(isValidConfig({ ...DEFAULT_CONFIG, geometry: "not-real" })).toBe(false);
});

test("rejects zero or negative strokeWidth", () => {
  expect(isValidConfig({ ...DEFAULT_CONFIG, strokeWidth: 0 })).toBe(false);
  expect(isValidConfig({ ...DEFAULT_CONFIG, strokeWidth: -5 })).toBe(false);
});

test("rejects zero or negative spacing", () => {
  expect(isValidConfig({ ...DEFAULT_CONFIG, spacing: 0 })).toBe(false);
  expect(isValidConfig({ ...DEFAULT_CONFIG, spacing: -1 })).toBe(false);
});

test("rejects rotation outside [0, 360)", () => {
  expect(isValidConfig({ ...DEFAULT_CONFIG, rotation: -1 })).toBe(false);
  expect(isValidConfig({ ...DEFAULT_CONFIG, rotation: 360 })).toBe(false);
});

test("rejects NaN numeric fields", () => {
  expect(isValidConfig({ ...DEFAULT_CONFIG, strokeWidth: NaN })).toBe(false);
});

test("accepts a valid custom solid fill and rejects a malformed one", () => {
  expect(
    isValidConfig({ ...DEFAULT_CONFIG, customBackground: { type: "solid", color: "#ff0000" } })
  ).toBe(true);
  expect(
    isValidConfig({ ...DEFAULT_CONFIG, customBackground: { type: "solid", color: 123 } })
  ).toBe(false);
});
