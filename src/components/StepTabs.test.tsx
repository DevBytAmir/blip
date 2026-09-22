import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import StepTabs from "./StepTabs";
import { DEFAULT_CONFIG } from "../types";

test("can jump directly to the Geometry tab without visiting Style or Color first", async () => {
  const user = userEvent.setup();
  const onConfigChange = vi.fn();
  render(<StepTabs config={DEFAULT_CONFIG} onConfigChange={onConfigChange} />);

  await user.click(screen.getByRole("tab", { name: /geometry/i }));
  await user.click(screen.getByRole("button", { name: /barcode bars/i }));

  expect(onConfigChange).toHaveBeenCalledWith({ geometry: "barcode" });
});

test("switching back to the Style tab still shows the previously selected style as pressed", async () => {
  const user = userEvent.setup();
  render(<StepTabs config={{ ...DEFAULT_CONFIG, style: "playful" }} onConfigChange={() => {}} />);
  await user.click(screen.getByRole("tab", { name: /^style$/i }));
  expect(screen.getByRole("button", { name: /playful/i })).toHaveAttribute("aria-pressed", "true");
});
