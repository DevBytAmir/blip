import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ColorPanel from "./ColorPanel";
import { DEFAULT_CONFIG } from "../types";

test("preset buttons call onConfigChange with the chosen theme", async () => {
  const user = userEvent.setup();
  const onConfigChange = vi.fn();
  render(<ColorPanel config={DEFAULT_CONFIG} onConfigChange={onConfigChange} />);

  await user.click(screen.getByRole("button", { name: /terminal green/i }));
  expect(onConfigChange).toHaveBeenCalledWith({ color: "terminal" });
});

test("background and mark color controls are visible without any extra click", () => {
  render(<ColorPanel config={DEFAULT_CONFIG} onConfigChange={() => {}} />);
  expect(screen.getByText(/^background$/i)).toBeInTheDocument();
  expect(screen.getByText(/^mark$/i)).toBeInTheDocument();
});

test("the background swatch reflects the currently selected preset's color", () => {
  render(
    <ColorPanel config={{ ...DEFAULT_CONFIG, color: "terminal" }} onConfigChange={() => {}} />
  );
  const swatch = screen.getByLabelText(/background color/i) as HTMLInputElement;
  expect(swatch.value).toBe("#0a0f0a");
});

test("changing the background mode patches customBackground directly", async () => {
  const user = userEvent.setup();
  const onConfigChange = vi.fn();
  render(<ColorPanel config={DEFAULT_CONFIG} onConfigChange={onConfigChange} />);

  await user.click(screen.getByRole("group", { name: /^background mode$/i }).querySelector("button")!);

  expect(onConfigChange).toHaveBeenCalledWith(
    expect.objectContaining({ customBackground: expect.objectContaining({ type: "solid" }) })
  );
});
