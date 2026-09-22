import type { StyleId } from "../types";

export interface StylePreset {
  id: StyleId;
  label: string;
  strokeWidth: number;
  spacing: number;
}

export const STYLE_PRESETS: Record<StyleId, StylePreset> = {
  "bold-blocky": { id: "bold-blocky", label: "Bold & Blocky", strokeWidth: 10, spacing: 2.4 },
  "delicate-thin": { id: "delicate-thin", label: "Delicate & Thin", strokeWidth: 4, spacing: 2.0 },
  "retro-terminal": { id: "retro-terminal", label: "Retro Terminal", strokeWidth: 7, spacing: 2.6 },
  playful: { id: "playful", label: "Playful", strokeWidth: 9, spacing: 3.0 },
};
