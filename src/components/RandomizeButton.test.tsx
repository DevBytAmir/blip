import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import RandomizeButton, { pickRandomConfig } from "./RandomizeButton";

test("pickRandomConfig returns values within each preset's valid range", () => {
  const patch = pickRandomConfig();
  expect(["bold-blocky", "delicate-thin", "retro-terminal", "playful"]).toContain(patch.style);
  expect(patch.strokeWidth).toBeGreaterThanOrEqual(2);
  expect(patch.strokeWidth).toBeLessThanOrEqual(16);
  expect(patch.rotation).toBeGreaterThanOrEqual(0);
  expect(patch.rotation).toBeLessThan(360);
});

test("clicking the button calls onRandomize with a full patch", async () => {
  const user = userEvent.setup();
  const onRandomize = vi.fn();
  render(<RandomizeButton onRandomize={onRandomize} />);
  await user.click(screen.getByRole("button", { name: /randomize/i }));
  expect(onRandomize).toHaveBeenCalledTimes(1);
  const patch = onRandomize.mock.calls[0][0];
  expect(patch).toHaveProperty("style");
  expect(patch).toHaveProperty("color");
  expect(patch).toHaveProperty("geometry");
});
