import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

beforeEach(() => {
  localStorage.clear();
  window.location.hash = "";
});

test("typing a word updates the avatar preview", async () => {
  const user = userEvent.setup();
  render(<App />);
  await user.type(screen.getByRole("textbox"), "HI");
  const svg = screen.getByTestId("avatar-svg");
  expect(svg.querySelectorAll("circle, rect, polygon, ellipse").length).toBeGreaterThan(0);
});

test("manually changing stroke width then switching style keeps the manual value", async () => {
  const user = userEvent.setup();
  render(<App />);

  const slider = screen.getByLabelText(/stroke width/i);
  fireEvent.change(slider, { target: { value: "15" } });

  await user.click(screen.getByRole("tab", { name: /^style$/i }));
  await user.click(screen.getByRole("button", { name: /playful/i }));

  expect((screen.getByLabelText(/stroke width/i) as HTMLInputElement).value).toBe("15");
});

test("loading a corrupted shared link falls back to defaults with a notice instead of crashing", () => {
  window.location.hash = "#c=not-valid-base64!!!";
  render(<App />);
  expect(screen.getByText(/couldn't restore/i)).toBeInTheDocument();
  expect(screen.getByTestId("avatar-svg")).toBeInTheDocument();
});
