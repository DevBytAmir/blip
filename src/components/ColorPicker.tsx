import { COLOR_THEMES } from "../presets/colors";
import { fillToHex } from "../fillUtils";
import type { ColorThemeId } from "../types";

export default function ColorPicker({
  value,
  onChange,
}: {
  value: ColorThemeId;
  onChange: (id: ColorThemeId) => void;
}) {
  return (
    <div role="group" aria-label="Color" className="picker-grid">
      {Object.values(COLOR_THEMES).map((theme) => {
        const gradientId = `swatch-${theme.id}`;
        return (
          <button
            key={theme.id}
            type="button"
            className="chip chip-with-swatch"
            aria-pressed={theme.id === value}
            aria-label={`${theme.label} color theme`}
            onClick={() => onChange(theme.id)}
          >
            <svg className="chip-swatch" viewBox="0 0 16 16" width={16} height={16} aria-hidden="true">
              <defs>
                <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor={fillToHex(theme.background)} />
                  <stop offset="100%" stopColor={fillToHex(theme.mark)} />
                </linearGradient>
              </defs>
              <circle cx={8} cy={8} r={7} fill={`url(#${gradientId})`} stroke="rgba(255,255,255,0.25)" />
            </svg>
            {theme.label}
          </button>
        );
      })}
    </div>
  );
}
