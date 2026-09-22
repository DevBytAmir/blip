import { STYLE_PRESETS } from "./styles";
import { COLOR_THEMES } from "./colors";
import type { StyleId, ColorThemeId } from "../types";

const STYLE_IDS: StyleId[] = ["bold-blocky", "delicate-thin", "retro-terminal", "playful"];
const COLOR_IDS: ColorThemeId[] = [
  "mono-dark", "mono-light", "terminal", "neon", "sunset", "pastel", "duotone",
];

test("every StyleId has a matching preset with strictly positive values", () => {
  for (const id of STYLE_IDS) {
    const preset = STYLE_PRESETS[id];
    expect(preset).toBeDefined();
    expect(preset.id).toBe(id);
    expect(preset.strokeWidth).toBeGreaterThan(0);
    expect(preset.spacing).toBeGreaterThan(0);
  }
});

test("every ColorThemeId has a matching theme", () => {
  for (const id of COLOR_IDS) {
    const theme = COLOR_THEMES[id];
    expect(theme).toBeDefined();
    expect(theme.id).toBe(id);
    expect(theme.background).toBeDefined();
    expect(theme.mark).toBeDefined();
  }
});
