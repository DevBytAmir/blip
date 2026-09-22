import { renderHoneycomb } from "./honeycomb";
import { encodeMorse, totalSymbolCount } from "../morse";

test("renderHoneycomb produces one hex-capsule polygon per symbol", () => {
  const { letters } = encodeMorse("SOS");
  const marks = renderHoneycomb(letters, { size: 400, strokeWidth: 8, spacing: 2.2, rotation: 0 });
  expect(marks).toHaveLength(totalSymbolCount(letters));
  for (const mark of marks) {
    expect(mark.kind).toBe("polygon");
    if (mark.kind === "polygon") expect(mark.points).toHaveLength(6);
  }
});
