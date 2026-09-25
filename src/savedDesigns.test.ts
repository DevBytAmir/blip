import { beforeEach, expect, test } from "vitest";
import { deleteSavedDesign, listSavedDesigns, saveDesign } from "./savedDesigns";
import { DEFAULT_CONFIG } from "./types";

beforeEach(() => {
  localStorage.clear();
});

test("saveDesign persists and listSavedDesigns returns it", () => {
  saveDesign("My First", { ...DEFAULT_CONFIG, text: "HI" });
  const designs = listSavedDesigns();
  expect(designs).toHaveLength(1);
  expect(designs[0].name).toBe("My First");
  expect(designs[0].config.text).toBe("HI");
});

test("deleteSavedDesign removes only the matching entry", () => {
  const a = saveDesign("A", DEFAULT_CONFIG);
  saveDesign("B", DEFAULT_CONFIG);
  deleteSavedDesign(a.id);
  const designs = listSavedDesigns();
  expect(designs).toHaveLength(1);
  expect(designs[0].name).toBe("B");
});

test("listSavedDesigns returns an empty array when nothing is saved", () => {
  expect(listSavedDesigns()).toEqual([]);
});

test("listSavedDesigns filters out entries with a malformed config", () => {
  localStorage.setItem(
    "blip.designs",
    JSON.stringify([
      { id: "1", name: "Good", config: DEFAULT_CONFIG, createdAt: 1 },
      { id: "2", name: "Bad", config: { ...DEFAULT_CONFIG, geometry: "not-real" }, createdAt: 2 },
      { id: "3", name: "Missing id", config: DEFAULT_CONFIG },
    ])
  );
  const designs = listSavedDesigns();
  expect(designs).toHaveLength(1);
  expect(designs[0].name).toBe("Good");
});
