import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import GeometryPicker from "./GeometryPicker";
import { encodeMorse } from "../morse";

test("clicking an option calls onChange with its id", async () => {
  const user = userEvent.setup();
  const onChange = vi.fn();
  const { letters } = encodeMorse("HI");
  render(<GeometryPicker value="grid" onChange={onChange} letters={letters} />);

  await user.click(screen.getByRole("button", { name: /barcode bars/i }));
  expect(onChange).toHaveBeenCalledWith("barcode");
});

test("flags geometries that would look cramped for the current word, without disabling them", async () => {
  const user = userEvent.setup();
  const onChange = vi.fn();
  const { letters } = encodeMorse("THEQUICKBROWNFOXJUMPSOVERALAZYDOG");
  render(<GeometryPicker value="grid" onChange={onChange} letters={letters} />);

  const circlesButton = screen.getByRole("button", { name: /concentric circles/i });
  expect(circlesButton).toHaveClass("chip-cramped");
  expect(circlesButton).not.toBeDisabled();

  await user.click(circlesButton);
  expect(onChange).toHaveBeenCalledWith("circles");
});

test("does not flag geometries that fit the current word comfortably", () => {
  const { letters } = encodeMorse("HI");
  render(<GeometryPicker value="grid" onChange={() => {}} letters={letters} />);
  expect(screen.getByRole("button", { name: /concentric circles/i })).not.toHaveClass(
    "chip-cramped"
  );
});
