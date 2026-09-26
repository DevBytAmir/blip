import { beforeEach, expect, test, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SavedDesigns from "./SavedDesigns";
import * as savedDesignsModule from "../savedDesigns";
import { saveDesign } from "../savedDesigns";
import { DEFAULT_CONFIG } from "../types";

beforeEach(() => {
  localStorage.clear();
});

test("lists saved designs and selects one on click", async () => {
  const user = userEvent.setup();
  saveDesign("Cool One", { ...DEFAULT_CONFIG, text: "COOL" });
  const onSelect = vi.fn();
  render(<SavedDesigns onSelect={onSelect} />);

  await user.click(screen.getByRole("button", { name: /^cool one$/i }));
  expect(onSelect).toHaveBeenCalledWith(expect.objectContaining({ text: "COOL" }));
});

test("shows a message when there are no saved designs", () => {
  render(<SavedDesigns onSelect={() => {}} />);
  expect(screen.getByText(/nothing saved yet/i)).toBeInTheDocument();
});

test("only reads localStorage once on mount, not on every re-render", () => {
  const spy = vi.spyOn(savedDesignsModule, "listSavedDesigns");
  const { rerender } = render(<SavedDesigns onSelect={() => {}} />);
  const callsAfterMount = spy.mock.calls.length;

  rerender(<SavedDesigns onSelect={() => {}} />);
  rerender(<SavedDesigns onSelect={() => {}} />);

  expect(spy.mock.calls.length).toBe(callsAfterMount);
  spy.mockRestore();
});
