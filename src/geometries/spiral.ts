import { flattenLetters } from "./sequence";
import type { GeometryRenderer, Mark } from "./types";

export const renderSpiral: GeometryRenderer = (letters, params) => {
  const { size, strokeWidth } = params;
  const flat = flattenLetters(letters);
  const cx = size / 2;
  const cy = size / 2;
  const maxR = size * 0.42;
  const turns = 2.2;
  const angleStep = flat.length > 0 ? (turns * 2 * Math.PI) / flat.length : 0;
  const dotSize = strokeWidth * 2;
  const dashSize = dotSize * 2.5;

  return flat.map((symbol, i): Mark => {
    const angle = i * angleStep;
    const r = (maxR * i) / Math.max(1, flat.length) + size * 0.06;
    const x = cx + Math.cos(angle) * r;
    const y = cy + Math.sin(angle) * r;
    const rotationDeg = (angle * 180) / Math.PI + 90;

    return symbol.type === "dot"
      ? { kind: "circle", cx: x, cy: y, r: dotSize / 2 }
      : {
          kind: "rect",
          cx: x,
          cy: y,
          width: dashSize,
          height: dotSize,
          cornerRadius: dotSize / 2,
          rotation: rotationDeg,
        };
  });
};
