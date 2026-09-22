import { flattenLetters } from "./sequence";
import type { GeometryRenderer, Mark } from "./types";

export const renderSpokes: GeometryRenderer = (letters, params) => {
  const { size, strokeWidth, rotation } = params;
  const flat = flattenLetters(letters);
  const cx = size / 2;
  const cy = size / 2;
  const innerR = size * 0.08;
  const dotLen = size * 0.28;
  const dashLen = size * 0.4;
  const angleStep = flat.length > 0 ? 360 / flat.length : 0;

  const marks: Mark[] = [{ kind: "circle", cx, cy, r: innerR * 0.6 }];

  flat.forEach((symbol, i) => {
    const angle = rotation + i * angleStep;
    const len = symbol.type === "dot" ? dotLen : dashLen;
    const rad = (angle * Math.PI) / 180;
    const x1 = cx + Math.cos(rad) * innerR;
    const y1 = cy + Math.sin(rad) * innerR;
    const x2 = cx + Math.cos(rad) * (innerR + len);
    const y2 = cy + Math.sin(rad) * (innerR + len);

    marks.push({
      kind: "rect",
      cx: (x1 + x2) / 2,
      cy: (y1 + y2) / 2,
      width: len,
      height: strokeWidth * 1.1,
      cornerRadius: strokeWidth * 0.5,
      rotation: angle,
    });
  });

  return marks;
};
