import { usesRotation, usesSpacing } from "../geometries/capabilities";
import { FRAME_SHAPES, type FieldTouched, type FrameShape, type MorseConfig } from "../types";

const FRAME_SHAPE_LABELS: Record<FrameShape, string> = {
  square: "Square",
  circle: "Circle",
  "rounded-square": "Rounded square",
};
const FRAME_SHAPE_DESCRIPTIONS: Record<FrameShape, string> = {
  square: "square frame, sharp corners",
  circle: "circle frame, fully rounded",
  "rounded-square": "rounded-square frame, soft corners",
};

export default function FineTunePanel({
  config,
  onConfigChange,
  onTouchedChange,
}: {
  config: MorseConfig;
  onConfigChange: (patch: Partial<MorseConfig>) => void;
  onTouchedChange: (patch: Partial<FieldTouched>) => void;
}) {
  const spacingApplies = usesSpacing(config.geometry);
  const rotationApplies = usesRotation(config.geometry);

  return (
    <div className="fine-tune">
      <div className="field">
        <label htmlFor="stroke-width" className="field-label">Stroke width</label>
        <input
          id="stroke-width"
          type="range"
          min={2}
          max={16}
          value={config.strokeWidth}
          onChange={(e) => {
            onConfigChange({ strokeWidth: Number(e.target.value) });
            onTouchedChange({ strokeWidth: true });
          }}
        />
      </div>

      <div className={`field${spacingApplies ? "" : " field-disabled"}`}>
        <label htmlFor="spacing" className="field-label">
          Spacing{!spacingApplies && " (not used by this geometry)"}
        </label>
        <input
          id="spacing"
          type="range"
          min={1}
          max={4}
          step={0.1}
          value={config.spacing}
          disabled={!spacingApplies}
          onChange={(e) => {
            onConfigChange({ spacing: Number(e.target.value) });
            onTouchedChange({ spacing: true });
          }}
        />
      </div>

      <div className={`field${rotationApplies ? "" : " field-disabled"}`}>
        <label htmlFor="rotation" className="field-label">
          Rotation{!rotationApplies && " (not used by this geometry)"}
        </label>
        <input
          id="rotation"
          type="range"
          min={0}
          max={359}
          value={config.rotation}
          disabled={!rotationApplies}
          onChange={(e) => onConfigChange({ rotation: Number(e.target.value) })}
        />
      </div>

      <div className="field">
        <span className="field-label">Frame shape</span>
        <div role="group" aria-label="Frame shape" className="picker-grid">
          {FRAME_SHAPES.map((shape) => (
            <button
              key={shape}
              type="button"
              className="chip"
              aria-pressed={config.frame === shape}
              aria-label={FRAME_SHAPE_DESCRIPTIONS[shape]}
              onClick={() => onConfigChange({ frame: shape })}
            >
              {FRAME_SHAPE_LABELS[shape]}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
