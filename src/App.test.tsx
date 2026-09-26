import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

beforeEach(() => {
  localStorage.clear();
  window.location.hash = "";
});

afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
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

test("a hash that isn't a Blip share link at all does not trigger the restore-failed banner", () => {
  window.location.hash = "#some-other-fragment";
  render(<App />);
  expect(screen.queryByText(/couldn't restore/i)).toBeNull();
});

test("Randomize's strokeWidth and spacing survive even though the patch also includes a style", async () => {
  const user = userEvent.setup();
  vi.spyOn(Math, "random").mockReturnValue(0.999999);
  render(<App />);

  await user.click(screen.getByRole("button", { name: /^randomize/i }));

  const strokeWidth = (screen.getByLabelText(/stroke width/i) as HTMLInputElement).value;
  // pickRandomConfig with Math.random() always at the top of its range picks
  // strokeWidth 16, which no style preset uses -- if the style-preset reset
  // clobbered it, this would instead be one of the presets' fixed values.
  expect(strokeWidth).toBe("16");
});

test("clicking Keep this one immediately shows it in the stash list", async () => {
  const user = userEvent.setup();
  render(<App />);
  await user.clear(screen.getByRole("textbox"));
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

test("renders without crashing when localStorage.getItem throws", () => {
  vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => {
    throw new Error("storage disabled");
  });
  expect(() => render(<App />)).not.toThrow();
});

test("Randomize shows an Undo button that restores the previous config", async () => {
  const user = userEvent.setup();
  render(<App />);

  expect(screen.queryByRole("button", { name: /^undo/i })).toBeNull();

  const styleBefore = screen.getByRole("group", { name: /^style$/i }).querySelector(
    '[aria-pressed="true"]'
  )?.textContent;

  await user.click(screen.getByRole("button", { name: /^randomize/i }));
  expect(screen.getByRole("button", { name: /^undo/i })).toBeInTheDocument();

  await user.click(screen.getByRole("button", { name: /^undo/i }));

  const styleAfterUndo = screen.getByRole("group", { name: /^style$/i }).querySelector(
    '[aria-pressed="true"]'
  )?.textContent;
  expect(styleAfterUndo).toBe(styleBefore);
  expect(screen.queryByRole("button", { name: /^undo/i })).toBeNull();
});

test("theme toggle switches the page between dark and light and remembers the choice", async () => {
  const user = userEvent.setup();
  render(<App />);

  expect(document.documentElement.dataset.theme).toBe("dark");

  await user.click(screen.getByRole("button", { name: /light mode/i }));
  expect(document.documentElement.dataset.theme).toBe("light");
  expect(localStorage.getItem("blip.theme")).toBe("light");
});
