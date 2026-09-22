import { COLOR_THEMES } from "../presets/colors";
import type { ColorThemeId } from "../types";

export default function ColorPicker({
  value,
  onChange,
}: {
  value: ColorThemeId;
  onChange: (id: ColorThemeId) => void;
}) {
  return (
    <div role="group" aria-label="Color">
      {Object.values(COLOR_THEMES).map((theme) => (
        <button
          key={theme.id}
          type="button"
          aria-pressed={theme.id === value}
          onClick={() => onChange(theme.id)}
        >
          {theme.label}
        </button>
      ))}
    </div>
  );
}
