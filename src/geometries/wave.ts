import { flattenLetters } from "./sequence";
import type { GeometryRenderer, Mark } from "./types";

export const renderWave: GeometryRenderer = (letters, params) => {
  const { size, strokeWidth } = params;
  const flat = flattenLetters(letters);
  const marginX = size * 0.15;
  const usableWidth = size - marginX * 2;
  const amplitude = size * 0.18;
  const dotSize = strokeWidth * 2;
  const dashSize = dotSize * 2.5;

  return flat.map((symbol, i): Mark => {
    const t = flat.length <= 1 ? 0.5 : i / (flat.length - 1);
    const x = marginX + t * usableWidth;
    const angle = t * Math.PI * 2.4;
    const y = size / 2 + Math.sin(angle) * amplitude;
    const slopeDeg = Math.cos(angle) * 40;

    return symbol.type === "dot"
      ? { kind: "circle", cx: x, cy: y, r: dotSize / 2 }
      : {
          kind: "rect",
          cx: x,
          cy: y,
          width: dashSize,
          height: dotSize,
          cornerRadius: dotSize / 2,
          rotation: slopeDeg,
        };
  });
};
