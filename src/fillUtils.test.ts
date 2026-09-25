import { fillToHex } from "./fillUtils";

test("returns the color directly for a solid fill", () => {
  expect(fillToHex({ type: "solid", color: "#ff0000" })).toBe("#ff0000");
});

test("returns the first stop's color for a gradient fill", () => {
  expect(
    fillToHex({
      type: "gradient",
      angle: 45,
      stops: [
        { offset: 0, color: "#111111" },
        { offset: 1, color: "#eeeeee" },
      ],
    })
  ).toBe("#111111");
});
