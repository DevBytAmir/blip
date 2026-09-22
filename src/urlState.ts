import type { ColorThemeId, FrameShape, GeometryId, MorseConfig, StyleId } from "./types";

const STYLE_IDS: StyleId[] = ["bold-blocky", "delicate-thin", "retro-terminal", "playful"];
const COLOR_IDS: ColorThemeId[] = [
  "mono-dark", "mono-light", "terminal", "neon", "sunset", "pastel", "duotone",
];
const GEOMETRY_IDS: GeometryId[] = [
  "grid", "circles", "spokes", "spiral", "honeycomb", "barcode", "wave", "orbits", "pixel",
];
const FRAME_SHAPES: FrameShape[] = ["square", "circle", "rounded-square"];

function isValidConfig(value: unknown): value is MorseConfig {
  if (typeof value !== "object" || value === null) return false;
  const v = value as Record<string, unknown>;
  return (
    typeof v.text === "string" &&
    STYLE_IDS.includes(v.style as StyleId) &&
    COLOR_IDS.includes(v.color as ColorThemeId) &&
    GEOMETRY_IDS.includes(v.geometry as GeometryId) &&
    FRAME_SHAPES.includes(v.frame as FrameShape) &&
    typeof v.strokeWidth === "number" &&
    typeof v.spacing === "number" &&
    typeof v.rotation === "number"
  );
}

export function encodeConfigToHash(config: MorseConfig): string {
  return btoa(JSON.stringify(config));
}

export function decodeConfigFromHash(hash: string): MorseConfig | null {
  try {
    const parsed: unknown = JSON.parse(atob(hash));
    return isValidConfig(parsed) ? parsed : null;
  } catch {
    return null;
  }
}
