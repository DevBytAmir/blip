import type { MorseLetter } from "../morse";
import type { GeometryParams } from "./types";

export interface RowSymbolPosition {
  cx: number;
  cy: number;
  width: number;
  height: number;
  type: "dot" | "dash";
}

export function layoutRows(
  letters: MorseLetter[],
  params: GeometryParams,
  widthFactor: number
): RowSymbolPosition[] {
  const { size, strokeWidth, spacing } = params;
  const dotW = strokeWidth * widthFactor;
  const dashW = dotW * 2.5;
  const gap = dotW * (spacing / 2);
  const rowHeight = dotW * spacing;
  const totalHeight = letters.length * rowHeight;
  const startY = size / 2 - totalHeight / 2 + rowHeight / 2;

  const positions: RowSymbolPosition[] = [];

  letters.forEach((letter, row) => {
    const widths = letter.symbols.map((s) => (s === "." ? dotW : dashW));
    const totalWidth = widths.reduce((a, b) => a + b, 0) + gap * Math.max(0, widths.length - 1);
    let x = size / 2 - totalWidth / 2;
    const y = startY + row * rowHeight;

    letter.symbols.forEach((symbol, i) => {
      const w = widths[i];
      positions.push({
        cx: x + w / 2,
        cy: y,
        width: w,
        height: dotW,
        type: symbol === "." ? "dot" : "dash",
      });
      x += w + gap;
    });
  });

  return positions;
}
