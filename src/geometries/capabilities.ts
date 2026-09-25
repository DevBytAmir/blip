import type { GeometryId } from "../types";

const SPACING_GEOMETRIES: ReadonlySet<GeometryId> = new Set(["grid", "pixel", "honeycomb", "barcode"]);
const ROTATION_GEOMETRIES: ReadonlySet<GeometryId> = new Set(["circles", "spokes"]);

export function usesSpacing(geometry: GeometryId): boolean {
  return SPACING_GEOMETRIES.has(geometry);
}

export function usesRotation(geometry: GeometryId): boolean {
  return ROTATION_GEOMETRIES.has(geometry);
}
