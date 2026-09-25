import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AdvancedColorControls from "./AdvancedColorControls";

test("shows nothing selected and calls onChange with a solid fill when the color input changes", async () => {
  const user = userEvent.setup();
  const onChange = vi.fn();
  render(<AdvancedColorControls label="Background" value={null} onChange={onChange} />);

  const colorInput = screen.getByLabelText(/background color/i);
  await user.click(colorInput);
  colorInput.dispatchEvent(new Event("input", { bubbles: true }));

  expect(screen.getByRole("button", { name: /use theme/i })).toBeInTheDocument();
});

test("switching to gradient mode calls onChange with a two-stop gradient fill", async () => {
  const user = userEvent.setup();
  const onChange = vi.fn();
  render(<AdvancedColorControls label="Mark" value={null} onChange={onChange} />);

  await user.click(screen.getByRole("button", { name: /gradient/i }));

  expect(onChange).toHaveBeenCalledWith(
    expect.objectContaining({
      type: "gradient",
      stops: expect.arrayContaining([
        expect.objectContaining({ offset: 0 }),
        expect.objectContaining({ offset: 1 }),
      ]),
    })
  );
});

test("solid color swatch shows the active theme's color when no custom fill is set", () => {
  render(
    <AdvancedColorControls label="Background" value={null} themeFallback="#12141a" onChange={() => {}} />
  );
  const colorInput = screen.getByLabelText(/background color/i) as HTMLInputElement;
  expect(colorInput.value).toBe("#12141a");
});

test("clicking 'Use theme' clears the custom fill back to null", async () => {
  const user = userEvent.setup();
  const onChange = vi.fn();
  render(
    <AdvancedColorControls
      label="Background"
      value={{ type: "solid", color: "#ff0000" }}
      onChange={onChange}
    />
  );

  await user.click(screen.getByRole("button", { name: /use theme/i }));
  expect(onChange).toHaveBeenCalledWith(null);
});
