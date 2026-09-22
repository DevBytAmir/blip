import type { FieldTouched, FrameShape, MorseConfig } from "../types";

const FRAME_SHAPES: FrameShape[] = ["square", "circle", "rounded-square"];

export default function FineTunePanel({
  config,
  touched,
  onConfigChange,
  onTouchedChange,
}: {
  config: MorseConfig;
  touched: FieldTouched;
  onConfigChange: (patch: Partial<MorseConfig>) => void;
  onTouchedChange: (patch: Partial<FieldTouched>) => void;
}) {
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

      <div className="field">
        <label htmlFor="spacing" className="field-label">Spacing</label>
        <input
          id="spacing"
          type="range"
          min={1}
          max={4}
          step={0.1}
          value={config.spacing}
          onChange={(e) => {
            onConfigChange({ spacing: Number(e.target.value) });
            onTouchedChange({ spacing: true });
          }}
        />
      </div>

      <div className="field">
        <label htmlFor="rotation" className="field-label">Rotation</label>
        <input
          id="rotation"
          type="range"
          min={0}
          max={359}
          value={config.rotation}
          onChange={(e) => onConfigChange({ rotation: Number(e.target.value) })}
        />
      </div>

      <div role="group" aria-label="Frame shape" className="picker-grid">
        {FRAME_SHAPES.map((shape) => (
          <button
            key={shape}
            type="button"
            className="chip"
            aria-pressed={config.frame === shape}
            onClick={() => onConfigChange({ frame: shape })}
          >
            {shape}
          </button>
        ))}
      </div>
    </div>
  );
}
