import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import FineTunePanel from "./FineTunePanel";
import { DEFAULT_CONFIG } from "../types";

test("moving the stroke width slider reports both the new value and touched:true", () => {
  const onConfigChange = vi.fn();
  const onTouchedChange = vi.fn();
  render(
    <FineTunePanel
      config={DEFAULT_CONFIG}
      touched={{ strokeWidth: false, spacing: false }}
      onConfigChange={onConfigChange}
      onTouchedChange={onTouchedChange}
    />
  );

  const slider = screen.getByLabelText(/stroke width/i);
  fireEvent.change(slider, { target: { value: "12" } });

  expect(onConfigChange).toHaveBeenCalledWith({ strokeWidth: 12 });
  expect(onTouchedChange).toHaveBeenCalledWith({ strokeWidth: true });
});

test("frame shape buttons call onConfigChange with the chosen frame", async () => {
  const user = userEvent.setup();
  const onConfigChange = vi.fn();
  render(
    <FineTunePanel
      config={DEFAULT_CONFIG}
      touched={{ strokeWidth: false, spacing: false }}
      onConfigChange={onConfigChange}
      onTouchedChange={() => {}}
    />
  );
  await user.click(screen.getByRole("button", { name: /^square$/i }));
  expect(onConfigChange).toHaveBeenCalledWith({ frame: "square" });
});
