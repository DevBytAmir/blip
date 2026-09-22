import type { ColorThemeId } from "../types";

export type FillDef =
  | { type: "solid"; color: string }
  | { type: "gradient"; angle: number; stops: { offset: number; color: string }[] };

export interface ColorTheme {
  id: ColorThemeId;
  label: string;
  background: FillDef;
  mark: FillDef;
}

const solid = (color: string): FillDef => ({ type: "solid", color });

export const COLOR_THEMES: Record<ColorThemeId, ColorTheme> = {
  "mono-dark": { id: "mono-dark", label: "Mono Dark", background: solid("#12141a"), mark: solid("#f4f1ea") },
  "mono-light": { id: "mono-light", label: "Mono Light", background: solid("#f4f1ea"), mark: solid("#1a1c22") },
  terminal: { id: "terminal", label: "Terminal Green", background: solid("#0a0f0a"), mark: solid("#39ff6a") },
  neon: {
    id: "neon", label: "Neon Cyber",
    background: solid("#0b0b12"),
    mark: { type: "gradient", angle: 45, stops: [{ offset: 0, color: "#ff2fd0" }, { offset: 1, color: "#00e5ff" }] },
  },
  sunset: {
    id: "sunset", label: "Sunset Gradient",
    background: { type: "gradient", angle: 90, stops: [{ offset: 0, color: "#ff7a45" }, { offset: 1, color: "#5b2a86" }] },
    mark: solid("#fffaf3"),
  },
  pastel: { id: "pastel", label: "Pastel Soft", background: solid("#fbe4d8"), mark: solid("#2c3350") },
  duotone: { id: "duotone", label: "Ocean Duotone", background: solid("#0e5c56"), mark: solid("#ff6b4a") },
};
