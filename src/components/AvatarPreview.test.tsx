import { render, screen } from "@testing-library/react";
import AvatarPreview from "./AvatarPreview";
import { DEFAULT_CONFIG } from "../types";

test("renders an svg with at least one mark for non-empty text", () => {
  render(<AvatarPreview config={{ ...DEFAULT_CONFIG, text: "HI" }} />);
  const svg = screen.getByTestId("avatar-svg");
  expect(svg.querySelectorAll("circle, rect, polygon, ellipse").length).toBeGreaterThan(0);
});

test("renders a placeholder mark (not empty) when text is empty", () => {
  render(<AvatarPreview config={{ ...DEFAULT_CONFIG, text: "" }} />);
  const svg = screen.getByTestId("avatar-svg");
  expect(svg.querySelectorAll("circle, rect, polygon, ellipse").length).toBeGreaterThan(0);
});

test("uses a circular clip for frame: circle", () => {
  render(<AvatarPreview config={{ ...DEFAULT_CONFIG, text: "HI", frame: "circle" }} />);
  const svg = screen.getByTestId("avatar-svg");
  expect(svg.querySelector("clipPath circle")).not.toBeNull();
});

test("uses a rect clip for frame: square", () => {
  render(<AvatarPreview config={{ ...DEFAULT_CONFIG, text: "HI", frame: "square" }} />);
  const svg = screen.getByTestId("avatar-svg");
  expect(svg.querySelector("clipPath rect")).not.toBeNull();
});
