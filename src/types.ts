export type StyleId = "bold-blocky" | "delicate-thin" | "retro-terminal" | "playful";

export type ColorThemeId =
  | "mono-dark" | "mono-light" | "terminal" | "neon" | "sunset" | "pastel" | "duotone";

export type GeometryId =
  | "grid" | "circles" | "spokes" | "spiral" | "honeycomb"
  | "barcode" | "wave" | "orbits" | "pixel";

export type FrameShape = "square" | "circle" | "rounded-square";

export interface MorseConfig {
  text: string;
  style: StyleId;
  color: ColorThemeId;
  geometry: GeometryId;
  frame: FrameShape;
  strokeWidth: number;
  spacing: number;
  rotation: number;
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
};
