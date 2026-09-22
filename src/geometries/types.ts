export type Mark =
  | { kind: "circle"; cx: number; cy: number; r: number }
  | { kind: "rect"; cx: number; cy: number; width: number; height: number; cornerRadius: number; rotation: number }
  | { kind: "polygon"; points: [number, number][] }
  | { kind: "ring"; cx: number; cy: number; rx: number; ry: number; strokeWidth: number; dashArray: number[]; rotation: number };

export interface GeometryParams {
  size: number;
  strokeWidth: number;
  spacing: number;
  rotation: number;
}

export type GeometryRenderer = (
  letters: import("../morse").MorseLetter[],
  params: GeometryParams
) => Mark[];
