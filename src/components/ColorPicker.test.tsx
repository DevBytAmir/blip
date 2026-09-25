import { render, screen } from "@testing-library/react";
import ColorPicker from "./ColorPicker";

test("each preset button shows a circular swatch filled with the theme's colors", () => {
  render(<ColorPicker value="mono-dark" onChange={() => {}} />);
  const button = screen.getByRole("button", { name: /terminal green/i });
  const circle = button.querySelector("svg.chip-swatch circle") as SVGCircleElement;
  expect(circle).not.toBeNull();
  expect(circle.getAttribute("fill")).toContain("url(#");
});
