import { STYLE_PRESETS } from "../presets/styles";
import { COLOR_THEMES } from "../presets/colors";
import type { ColorThemeId, GeometryId, MorseConfig, StyleId } from "../types";

const GEOMETRY_IDS: GeometryId[] = [
  "grid", "circles", "spokes", "spiral", "honeycomb", "barcode", "wave", "orbits", "pixel",
];

function pick<T>(items: T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

export function pickRandomConfig(): Pick<
  MorseConfig,
  "style" | "color" | "geometry" | "strokeWidth" | "spacing" | "rotation"
> {
  const style = pick(Object.keys(STYLE_PRESETS) as StyleId[]);
  const color = pick(Object.keys(COLOR_THEMES) as ColorThemeId[]);
  const geometry = pick(GEOMETRY_IDS);
  return {
    style,
    color,
    geometry,
    strokeWidth: Math.round(2 + Math.random() * 14),
    spacing: Math.round((1 + Math.random() * 3) * 10) / 10,
    rotation: Math.floor(Math.random() * 360),
  };
}

export default function RandomizeButton({
  onRandomize,
}: {
  onRandomize: (patch: Partial<MorseConfig>) => void;
}) {
  return (
    <button type="button" className="primary" onClick={() => onRandomize(pickRandomConfig())}>
      Randomize
    </button>
  );
}
