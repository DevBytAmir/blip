import { renderSpokes } from "./spokes";
import { encodeMorse, totalSymbolCount } from "../morse";

const params = { size: 400, strokeWidth: 8, spacing: 2, rotation: 0 };

test("renderSpokes produces a center hub plus one spoke per symbol", () => {
  const { letters } = encodeMorse("SOS");
  const marks = renderSpokes(letters, params);
  expect(marks).toHaveLength(totalSymbolCount(letters) + 1);
  expect(marks[0].kind).toBe("circle");
});

test("dash spokes are longer than dot spokes", () => {
  const { letters } = encodeMorse("EO"); // E=".", O="---"
  const marks = renderSpokes(letters, params);
  const spokes = marks.slice(1).filter((m) => m.kind === "rect");
  expect(spokes[1].kind === "rect" && spokes[1].width).toBeGreaterThan(
    spokes[0].kind === "rect" ? spokes[0].width : 0
  );
});
