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
