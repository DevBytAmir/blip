import { flattenLetters } from "./sequence";
import type { GeometryRenderer, Mark } from "./types";

export const renderBarcode: GeometryRenderer = (letters, params) => {
  const { size, strokeWidth, spacing } = params;
  const dotW = strokeWidth * 1.5;
  const dashW = strokeWidth * 4;
  const gap = strokeWidth * (spacing / 2);
  const letterGap = gap * 2.5;
  const barHeight = size * 0.4;

  const flat = flattenLetters(letters);
  const widths = flat.map((s) => (s.type === "dot" ? dotW : dashW));
  const gaps = flat.map((s, i) => (i === 0 ? 0 : s.isLetterStart ? letterGap : gap));
  const totalWidth = widths.reduce((a, b) => a + b, 0) + gaps.reduce((a, b) => a + b, 0);

  let x = size / 2 - totalWidth / 2;
  const marks: Mark[] = [];

  flat.forEach((_, i) => {
    x += gaps[i];
    const w = widths[i];
    marks.push({
      kind: "rect",
      cx: x + w / 2,
      cy: size / 2,
      width: w,
      height: barHeight,
      cornerRadius: 0,
      rotation: 0,
    });
    x += w;
  });

  return marks;
};
