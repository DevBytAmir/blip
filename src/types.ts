export type StyleId = "bold-blocky" | "delicate-thin" | "retro-terminal" | "playful";
export const STYLE_IDS: StyleId[] = ["bold-blocky", "delicate-thin", "retro-terminal", "playful"];

export type ColorThemeId =
  | "mono-dark" | "mono-light" | "terminal" | "neon" | "sunset" | "pastel" | "duotone";
export const COLOR_THEME_IDS: ColorThemeId[] = [
  "mono-dark", "mono-light", "terminal", "neon", "sunset", "pastel", "duotone",
];

export type GeometryId =
  | "grid" | "circles" | "spokes" | "spiral" | "honeycomb"
  | "barcode" | "wave" | "orbits" | "pixel";
export const GEOMETRY_IDS: GeometryId[] = [
  "grid", "circles", "spokes", "spiral", "honeycomb", "barcode", "wave", "orbits", "pixel",
];

export type FrameShape = "square" | "circle" | "rounded-square";
export const FRAME_SHAPES: FrameShape[] = ["square", "circle", "rounded-square"];

export type FillDef =
  | { type: "solid"; color: string }
  | { type: "gradient"; angle: number; stops: { offset: number; color: string }[] };

export interface MorseConfig {
  text: string;
  style: StyleId;
  color: ColorThemeId;
  geometry: GeometryId;
  frame: FrameShape;
  strokeWidth: number;
  spacing: number;
  rotation: number;
  customBackground: FillDef | null;
  customMarkColor: FillDef | null;
}

export interface FieldTouched {
  strokeWidth: boolean;
  spacing: boolean;
}

export const DEFAULT_CONFIG: MorseConfig = {
  text: "",
  style: "bold-blocky",
  color: "mono-dark",
  geometry: "grid",
  frame: "circle",
  strokeWidth: 8,
  spacing: 2.2,
  rotation: 0,
  customBackground: null,
  customMarkColor: null,
};
