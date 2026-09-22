import type { GeometryId } from "../types";
import type { GeometryRenderer } from "./types";
import { renderGrid, renderPixel } from "./rows";
import { renderHoneycomb } from "./honeycomb";
import { renderBarcode } from "./barcode";
import { renderCircles, renderOrbits } from "./rings";
import { renderSpokes } from "./spokes";
import { renderSpiral } from "./spiral";
import { renderWave } from "./wave";

export const GEOMETRY_RENDERERS: Record<GeometryId, GeometryRenderer> = {
  grid: renderGrid,
  pixel: renderPixel,
  honeycomb: renderHoneycomb,
  barcode: renderBarcode,
  circles: renderCircles,
  orbits: renderOrbits,
  spokes: renderSpokes,
  spiral: renderSpiral,
  wave: renderWave,
};
