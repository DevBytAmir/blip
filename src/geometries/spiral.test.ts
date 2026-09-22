import { renderSpiral } from "./spiral";
import { encodeMorse, totalSymbolCount } from "../morse";

test("renderSpiral produces one mark per symbol, radius increasing outward", () => {
  const { letters } = encodeMorse("SOS");
  const marks = renderSpiral(letters, { size: 400, strokeWidth: 8, spacing: 2, rotation: 0 });
  expect(marks).toHaveLength(totalSymbolCount(letters));

  const distFromCenter = (m: (typeof marks)[number]) =>
    "cx" in m ? Math.hypot(m.cx - 200, m.cy - 200) : 0;

  expect(distFromCenter(marks[marks.length - 1])).toBeGreaterThan(distFromCenter(marks[0]));
});
