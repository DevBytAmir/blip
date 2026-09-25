import ColorPicker from "./ColorPicker";
import AdvancedColorControls from "./AdvancedColorControls";
import { COLOR_THEMES } from "../presets/colors";
import { fillToHex } from "../fillUtils";
import type { MorseConfig } from "../types";

export default function ColorPanel({
  config,
  onConfigChange,
}: {
  config: MorseConfig;
  onConfigChange: (patch: Partial<MorseConfig>) => void;
}) {
  const theme = COLOR_THEMES[config.color];

  return (
    <div className="fine-tune">
      <ColorPicker value={config.color} onChange={(color) => onConfigChange({ color })} />

      <div className="color-panel-divider" />

      <span className="field-label">Custom colors</span>
      <div className="color-panel-advanced">
        <AdvancedColorControls
          label="Background"
          value={config.customBackground}
          themeFallback={fillToHex(theme.background)}
          onChange={(fill) => onConfigChange({ customBackground: fill })}
        />
        <AdvancedColorControls
          label="Mark"
          value={config.customMarkColor}
          themeFallback={fillToHex(theme.mark)}
          onChange={(fill) => onConfigChange({ customMarkColor: fill })}
        />
      </div>
    </div>
  );
}
