import { renderWave } from "./wave";
import { encodeMorse, totalSymbolCount } from "../morse";

test("renderWave produces one mark per symbol, left to right", () => {
  const { letters } = encodeMorse("SOS");
  const marks = renderWave(letters, { size: 400, strokeWidth: 8, spacing: 2, rotation: 0 });
  expect(marks).toHaveLength(totalSymbolCount(letters));

  const xs = marks.map((m) => ("cx" in m ? m.cx : 0));
  expect(xs).toEqual([...xs].sort((a, b) => a - b));
});
