import type { FillDef } from "../types";

const DEFAULT_SOLID = "#888888";
const DEFAULT_GRADIENT: FillDef = {
  type: "gradient",
  angle: 45,
  stops: [
    { offset: 0, color: "#6c8cff" },
    { offset: 1, color: "#ff6b9d" },
  ],
};

export default function AdvancedColorControls({
  label,
  value,
  themeFallback = DEFAULT_SOLID,
  onChange,
}: {
  label: string;
  value: FillDef | null;
  themeFallback?: string;
  onChange: (fill: FillDef | null) => void;
}) {
  const mode = value?.type ?? "solid";

  return (
    <div className="field">
      <span className="field-label">{label}</span>

      <div className="advanced-color-mode-row">
        <div role="group" aria-label={`${label} mode`} className="picker-grid">
          <button
            type="button"
            className="chip"
            aria-pressed={mode === "solid"}
            onClick={() => onChange({ type: "solid", color: value?.type === "solid" ? value.color : themeFallback })}
          >
            Solid
          </button>
          <button
            type="button"
            className="chip"
            aria-pressed={mode === "gradient"}
            onClick={() => onChange(value?.type === "gradient" ? value : DEFAULT_GRADIENT)}
          >
            Gradient
          </button>
        </div>
        <button
          type="button"
          className="reset-link"
          disabled={value === null}
          onClick={() => onChange(null)}
        >
          Use theme
        </button>
      </div>

      {mode === "solid" && (
        <label className="field">
          <span className="field-label">{label} color</span>
          <input
            type="color"
            value={value?.type === "solid" ? value.color : themeFallback}
            onChange={(e) => onChange({ type: "solid", color: e.target.value })}
          />
        </label>
      )}

      {mode === "gradient" && value?.type === "gradient" && (
        <div className="field">
          <label className="field">
            <span className="field-label">{label} start color</span>
            <input
              type="color"
              value={value.stops[0]?.color ?? "#000000"}
              onChange={(e) =>
                onChange({
                  ...value,
                  stops: [{ ...value.stops[0], color: e.target.value }, value.stops[1]],
                })
              }
            />
          </label>
          <label className="field">
            <span className="field-label">{label} end color</span>
            <input
              type="color"
              value={value.stops[1]?.color ?? "#ffffff"}
              onChange={(e) =>
                onChange({
                  ...value,
                  stops: [value.stops[0], { ...value.stops[1], color: e.target.value }],
                })
              }
            />
          </label>
        </div>
      )}
    </div>
  );
}
