import { layoutRows } from "./rowLayout";
import type { GeometryRenderer, Mark } from "./types";

function createRowRenderer(widthFactor: number, cornerRadiusFactor: number): GeometryRenderer {
  return (letters, params) => {
    const positions = layoutRows(letters, params, widthFactor);
    return positions.map((pos): Mark =>
      pos.type === "dot"
        ? { kind: "circle", cx: pos.cx, cy: pos.cy, r: pos.height / 2 }
        : {
            kind: "rect",
            cx: pos.cx,
            cy: pos.cy,
            width: pos.width,
            height: pos.height,
            cornerRadius: pos.height * cornerRadiusFactor,
            rotation: 0,
          }
    );
  };
}

export const renderGrid: GeometryRenderer = createRowRenderer(3, 0.5);
export const renderPixel: GeometryRenderer = createRowRenderer(2.5, 0);
