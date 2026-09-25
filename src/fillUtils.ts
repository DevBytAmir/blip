import type { FillDef } from "./types";

export function fillToHex(fill: FillDef): string {
  return fill.type === "solid" ? fill.color : fill.stops[0]?.color ?? "#888888";
}
