import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

beforeEach(() => {
  localStorage.clear();
  window.location.hash = "";
});

afterEach(() => {
  vi.unstubAllGlobals();
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

  await user.click(screen.getByRole("button", { name: /playful/i }));

  expect((screen.getByLabelText(/stroke width/i) as HTMLInputElement).value).toBe("15");
});

test("style, color, and geometry panels are all visible at once, with no tab switching", () => {
  render(<App />);
  expect(screen.getByRole("group", { name: /^style$/i })).toBeInTheDocument();
  expect(screen.getByRole("group", { name: /^color$/i })).toBeInTheDocument();
  expect(screen.getByRole("group", { name: /^geometry$/i })).toBeInTheDocument();
  expect(screen.queryByRole("tab")).toBeNull();
});

test("loading a corrupted shared link falls back to defaults with a notice instead of crashing", () => {
  window.location.hash = "#c=not-valid-base64!!!";
  render(<App />);
  expect(screen.getByText(/couldn't restore/i)).toBeInTheDocument();
  expect(screen.getByTestId("avatar-svg")).toBeInTheDocument();
});

test("clicking Keep this one immediately shows it in the stash list", async () => {
  const user = userEvent.setup();
  render(<App />);
  await user.type(screen.getByRole("textbox"), "COOL");
  await user.click(screen.getByRole("button", { name: /^keep this one/i }));
  expect(screen.getByRole("button", { name: /^cool$/i })).toBeInTheDocument();
});

test("clicking Share copies the current URL and shows a confirmation", async () => {
  const writeText = vi.fn().mockResolvedValue(undefined);
  const user = userEvent.setup();
  vi.stubGlobal("navigator", { ...navigator, clipboard: { writeText } });

  render(<App />);
  await user.click(screen.getByRole("button", { name: /^share/i }));

  expect(writeText).toHaveBeenCalledWith(window.location.href);
  expect(await screen.findByText(/copied/i)).toBeInTheDocument();
});

test("clicking Share fails soft with a notice when the clipboard write rejects", async () => {
  const writeText = vi.fn().mockRejectedValue(new Error("denied"));
  const user = userEvent.setup();
  vi.stubGlobal("navigator", { ...navigator, clipboard: { writeText } });

  render(<App />);
  await user.click(screen.getByRole("button", { name: /^share/i }));

  expect(await screen.findByText(/couldn't copy the link/i)).toBeInTheDocument();
});

test("defaults to light mode when the OS prefers light and nothing is stored", () => {
  vi.stubGlobal("matchMedia", (query: string) => ({
    matches: query === "(prefers-color-scheme: light)",
    media: query,
    addEventListener: () => {},
    removeEventListener: () => {},
  }));

  render(<App />);
  expect(document.documentElement.dataset.theme).toBe("light");
});

test("defaults to dark mode when the OS does not prefer light and nothing is stored", () => {
  render(<App />);
  expect(document.documentElement.dataset.theme).toBe("dark");
});

test("a stored theme preference overrides the OS preference", () => {
  localStorage.setItem("blip.theme", "dark");
  vi.stubGlobal("matchMedia", (query: string) => ({
    matches: query === "(prefers-color-scheme: light)",
    media: query,
    addEventListener: () => {},
    removeEventListener: () => {},
  }));

  render(<App />);
  expect(document.documentElement.dataset.theme).toBe("dark");
});

test("theme toggle switches the page between dark and light and remembers the choice", async () => {
  const user = userEvent.setup();
  render(<App />);

  expect(document.documentElement.dataset.theme).toBe("dark");

  await user.click(screen.getByRole("button", { name: /light mode/i }));
  expect(document.documentElement.dataset.theme).toBe("light");
  expect(localStorage.getItem("blip.theme")).toBe("light");
});
