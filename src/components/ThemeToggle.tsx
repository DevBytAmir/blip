export default function ThemeToggle({
  theme,
  onToggle,
}: {
  theme: "dark" | "light";
  onToggle: () => void;
}) {
  const nextTheme = theme === "dark" ? "light" : "dark";
  return (
    <button
      type="button"
      className="chip theme-toggle"
      onClick={onToggle}
      aria-label={`Switch to ${nextTheme} mode`}
    >
      {nextTheme === "light" ? "🌙" : "☀️"}
    </button>
  );
}
