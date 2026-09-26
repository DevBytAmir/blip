import {
  COLOR_THEME_IDS,
  GEOMETRY_IDS,
  STYLE_IDS,
  type MorseConfig,
} from "../types";

function pick<T>(items: T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

export function pickRandomConfig(): Pick<
  MorseConfig,
  "style" | "color" | "geometry" | "strokeWidth" | "spacing" | "rotation"
> {
  const style = pick(STYLE_IDS);
  const color = pick(COLOR_THEME_IDS);
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
