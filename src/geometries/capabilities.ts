import type { GeometryId } from "../types";
import { totalSymbolCount, type MorseLetter } from "../morse";

const SPACING_GEOMETRIES: ReadonlySet<GeometryId> = new Set(["grid", "pixel", "honeycomb", "barcode"]);
const ROTATION_GEOMETRIES: ReadonlySet<GeometryId> = new Set(["circles", "spokes"]);

export function usesSpacing(geometry: GeometryId): boolean {
  return SPACING_GEOMETRIES.has(geometry);
}

export function usesRotation(geometry: GeometryId): boolean {
  return ROTATION_GEOMETRIES.has(geometry);
}

const COMFORTABLE_SYMBOL_CAP: Record<GeometryId, number> = {
  grid: 45,
  pixel: 45,
  honeycomb: 40,
  circles: 24,
  orbits: 24,
  barcode: 70,
  spokes: 60,
  spiral: 70,
  wave: 70,
};

export function isLikelyCramped(letters: MorseLetter[], geometry: GeometryId): boolean {
  return totalSymbolCount(letters) > COMFORTABLE_SYMBOL_CAP[geometry];
}
