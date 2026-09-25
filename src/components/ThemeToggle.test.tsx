import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ThemeToggle from "./ThemeToggle";

test("shows a button to switch to light mode when theme is dark", () => {
  render(<ThemeToggle theme="dark" onToggle={() => {}} />);
  expect(screen.getByRole("button", { name: /light mode/i })).toBeInTheDocument();
});

test("shows a button to switch to dark mode when theme is light", () => {
  render(<ThemeToggle theme="light" onToggle={() => {}} />);
  expect(screen.getByRole("button", { name: /dark mode/i })).toBeInTheDocument();
});

test("shows a moon emoji when theme is dark (offering to switch to light)", () => {
  render(<ThemeToggle theme="dark" onToggle={() => {}} />);
  expect(screen.getByRole("button", { name: /light mode/i })).toHaveTextContent("🌙");
});

test("shows a sun emoji when theme is light (offering to switch to dark)", () => {
  render(<ThemeToggle theme="light" onToggle={() => {}} />);
  expect(screen.getByRole("button", { name: /dark mode/i })).toHaveTextContent("☀️");
});

test("clicking the button calls onToggle", async () => {
  const user = userEvent.setup();
  const onToggle = vi.fn();
  render(<ThemeToggle theme="dark" onToggle={onToggle} />);
  await user.click(screen.getByRole("button"));
  expect(onToggle).toHaveBeenCalledTimes(1);
});
