import { layoutRows } from "./rowLayout";
import { hexCapsulePoints } from "./shapes";
import type { GeometryRenderer, Mark } from "./types";

export const renderHoneycomb: GeometryRenderer = (letters, params) => {
  const positions = layoutRows(letters, params, 3);
  return positions.map(
    (pos): Mark => ({
      kind: "polygon",
      points: hexCapsulePoints(pos.cx, pos.cy, pos.width, pos.height),
    })
  );
};
