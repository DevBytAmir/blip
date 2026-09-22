import { STYLE_PRESETS } from "../presets/styles";
import type { StyleId } from "../types";

export default function StylePicker({
  value,
  onChange,
}: {
  value: StyleId;
  onChange: (id: StyleId) => void;
}) {
  return (
    <div role="group" aria-label="Style" className="picker-grid">
      {Object.values(STYLE_PRESETS).map((preset) => (
        <button
          key={preset.id}
          type="button"
          className="chip"
          aria-pressed={preset.id === value}
          onClick={() => onChange(preset.id)}
        >
          {preset.label}
        </button>
      ))}
    </div>
  );
}
