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
    <div>
      <label htmlFor="stroke-width">Stroke width</label>
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

      <label htmlFor="spacing">Spacing</label>
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

      <label htmlFor="rotation">Rotation</label>
      <input
        id="rotation"
        type="range"
        min={0}
        max={359}
        value={config.rotation}
        onChange={(e) => onConfigChange({ rotation: Number(e.target.value) })}
      />

      <div role="group" aria-label="Frame shape">
        {FRAME_SHAPES.map((shape) => (
          <button
            key={shape}
            type="button"
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
