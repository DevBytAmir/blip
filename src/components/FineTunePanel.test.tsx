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
      onConfigChange={onConfigChange}
      onTouchedChange={onTouchedChange}
    />
  );

  const slider = screen.getByLabelText(/stroke width/i);
  fireEvent.change(slider, { target: { value: "12" } });

  expect(onConfigChange).toHaveBeenCalledWith({ strokeWidth: 12 });
  expect(onTouchedChange).toHaveBeenCalledWith({ strokeWidth: true });
});

test("rotation slider is disabled for a geometry that ignores rotation", () => {
  render(
    <FineTunePanel
      config={{ ...DEFAULT_CONFIG, geometry: "grid" }}
      onConfigChange={() => {}}
      onTouchedChange={() => {}}
    />
  );
  expect(screen.getByLabelText(/rotation/i)).toBeDisabled();
});

test("rotation slider is enabled for a geometry that uses rotation", () => {
  render(
    <FineTunePanel
      config={{ ...DEFAULT_CONFIG, geometry: "spokes" }}
      onConfigChange={() => {}}
      onTouchedChange={() => {}}
    />
  );
  expect(screen.getByLabelText(/rotation/i)).toBeEnabled();
});

test("spacing slider is disabled for a geometry that ignores spacing", () => {
  render(
    <FineTunePanel
      config={{ ...DEFAULT_CONFIG, geometry: "wave" }}
      onConfigChange={() => {}}
      onTouchedChange={() => {}}
    />
  );
  expect(screen.getByLabelText(/^spacing/i)).toBeDisabled();
});

test("frame shape buttons call onConfigChange with the chosen frame", async () => {
  const user = userEvent.setup();
  const onConfigChange = vi.fn();
  render(
    <FineTunePanel
      config={DEFAULT_CONFIG}
      onConfigChange={onConfigChange}
      onTouchedChange={() => {}}
    />
  );
  await user.click(screen.getByRole("button", { name: /^square/i }));
  expect(onConfigChange).toHaveBeenCalledWith({ frame: "square" });
});

test("frame shape buttons show human-readable labels, not raw ids", () => {
  render(
    <FineTunePanel config={DEFAULT_CONFIG} onConfigChange={() => {}} onTouchedChange={() => {}} />
  );
  expect(screen.getByText("Rounded square")).toBeInTheDocument();
});
