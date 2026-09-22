import { useState } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TextInput, { isLikelyCramped } from "./TextInput";
import { encodeMorse } from "../morse";

function ControlledTextInput() {
  const [value, setValue] = useState("");
  return <TextInput value={value} onChange={setValue} geometry="grid" />;
}

test("calls onChange with typed text", async () => {
  const user = userEvent.setup();
  render(<ControlledTextInput />);
  await user.type(screen.getByRole("textbox"), "hi");
  expect(screen.getByRole("textbox")).toHaveValue("hi");
});

test("shows a note when characters were stripped", () => {
  render(<TextInput value="A!" onChange={() => {}} geometry="grid" />);
  expect(screen.getByText(/removed/i)).toBeInTheDocument();
});

test("shows no cramped warning for short text", () => {
  render(<TextInput value="HI" onChange={() => {}} geometry="grid" />);
  expect(screen.queryByText(/cramped/i)).toBeNull();
});

test("shows a cramped warning for long text on a tight geometry", () => {
  render(
    <TextInput value="THEQUICKBROWNFOXJUMPSOVERALAZYDOG" onChange={() => {}} geometry="circles" />
  );
  expect(screen.getByText(/cramped/i)).toBeInTheDocument();
});

test("isLikelyCramped compares total symbol count against a per-geometry cap", () => {
  const { letters } = encodeMorse("SOS");
  expect(isLikelyCramped(letters, "grid")).toBe(false);
});
