import {
  COLOR_THEME_IDS,
  FRAME_SHAPES,
  GEOMETRY_IDS,
  STYLE_IDS,
  type ColorThemeId,
  type FillDef,
  type FrameShape,
  type GeometryId,
  type MorseConfig,
  type StyleId,
} from "./types";

function isFiniteNumber(value: unknown): value is number {
  return typeof value === "number" && Number.isFinite(value);
}

function isValidFill(value: unknown): value is FillDef {
  if (typeof value !== "object" || value === null) return false;
  const v = value as Record<string, unknown>;
  if (v.type === "solid") return typeof v.color === "string";
  if (v.type === "gradient") {
    return (
      isFiniteNumber(v.angle) &&
      Array.isArray(v.stops) &&
      v.stops.length >= 2 &&
      v.stops.every(
        (stop) =>
          typeof stop === "object" &&
          stop !== null &&
          isFiniteNumber((stop as Record<string, unknown>).offset) &&
          typeof (stop as Record<string, unknown>).color === "string"
      )
    );
  }
  return false;
}

function isValidNullableFill(value: unknown): value is FillDef | null {
  return value === null || isValidFill(value);
}

export function isValidConfig(value: unknown): value is MorseConfig {
  if (typeof value !== "object" || value === null) return false;
  const v = value as Record<string, unknown>;
  return (
    typeof v.text === "string" &&
    STYLE_IDS.includes(v.style as StyleId) &&
    COLOR_THEME_IDS.includes(v.color as ColorThemeId) &&
    GEOMETRY_IDS.includes(v.geometry as GeometryId) &&
    FRAME_SHAPES.includes(v.frame as FrameShape) &&
    isFiniteNumber(v.strokeWidth) && v.strokeWidth > 0 && v.strokeWidth <= 100 &&
    isFiniteNumber(v.spacing) && v.spacing > 0 && v.spacing <= 20 &&
    isFiniteNumber(v.rotation) && v.rotation >= 0 && v.rotation < 360 &&
    isValidNullableFill(v.customBackground) &&
    isValidNullableFill(v.customMarkColor)
  );
}
