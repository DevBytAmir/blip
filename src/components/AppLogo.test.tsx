import { render, screen } from "@testing-library/react";
import AppLogo from "./AppLogo";

test("renders each letter of the word with its own morse code beneath it", () => {
  render(<AppLogo word="BLIP" />);

  expect(screen.getByText("B")).toBeInTheDocument();
  expect(screen.getByText("-...")).toBeInTheDocument();

  expect(screen.getByText("L")).toBeInTheDocument();
  expect(screen.getByText(".-..")).toBeInTheDocument();

  expect(screen.getByText("I")).toBeInTheDocument();
  expect(screen.getByText("..")).toBeInTheDocument();

  expect(screen.getByText("P")).toBeInTheDocument();
  expect(screen.getByText(".--.")).toBeInTheDocument();
});

test("renders as a heading for accessibility, with the plain word as its accessible name", () => {
  render(<AppLogo word="BLIP" />);
  expect(screen.getByRole("heading", { name: "BLIP" })).toBeInTheDocument();
});
