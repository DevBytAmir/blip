import { useEffect, useRef, useState } from "react";
import AvatarPreview from "./components/AvatarPreview";
import TextInput from "./components/TextInput";
import StepTabs from "./components/StepTabs";
import FineTunePanel from "./components/FineTunePanel";
import RandomizeButton from "./components/RandomizeButton";
import SavedDesigns from "./components/SavedDesigns";
import ExportPanel from "./components/ExportPanel";
import { STYLE_PRESETS } from "./presets/styles";
import { decodeConfigFromHash, encodeConfigToHash } from "./urlState";
import { saveDesign } from "./savedDesigns";
import { DEFAULT_CONFIG, type FieldTouched, type MorseConfig, type StyleId } from "./types";

function readConfigFromLocation(): { config: MorseConfig; restoreFailed: boolean } {
  const hash = window.location.hash.replace(/^#c=/, "");
  if (!hash) return { config: DEFAULT_CONFIG, restoreFailed: false };
  const decoded = decodeConfigFromHash(hash);
  return decoded
    ? { config: decoded, restoreFailed: false }
    : { config: DEFAULT_CONFIG, restoreFailed: true };
}

export default function App() {
  const initial = useRef(readConfigFromLocation()).current;
  const [config, setConfig] = useState<MorseConfig>(initial.config);
  const [touched, setTouched] = useState<FieldTouched>({ strokeWidth: false, spacing: false });
  const [restoreFailed] = useState(initial.restoreFailed);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    window.history.replaceState(null, "", `#c=${encodeConfigToHash(config)}`);
  }, [config]);

  function applyConfigPatch(patch: Partial<MorseConfig>) {
    setConfig((prev) => {
      const next = { ...prev, ...patch };
      if (patch.style) {
        const preset = STYLE_PRESETS[patch.style as StyleId];
        if (!touched.strokeWidth) next.strokeWidth = preset.strokeWidth;
        if (!touched.spacing) next.spacing = preset.spacing;
      }
      return next;
    });
  }

  return (
    <main>
      <h1>Blip</h1>
      {restoreFailed && <p role="status">Couldn't restore that link, showing defaults instead.</p>}

      <TextInput
        value={config.text}
        onChange={(text) => applyConfigPatch({ text })}
        geometry={config.geometry}
      />

      <AvatarPreviewWithRef config={config} svgRef={svgRef} />

      <StepTabs config={config} onConfigChange={applyConfigPatch} />
      <FineTunePanel
        config={config}
        touched={touched}
        onConfigChange={applyConfigPatch}
        onTouchedChange={(patch) => setTouched((prev) => ({ ...prev, ...patch }))}
      />
      <RandomizeButton onRandomize={applyConfigPatch} />
      <ExportPanel svgRef={svgRef} />
      <button type="button" onClick={() => saveDesign(config.text || "Untitled", config)}>
        Save design
      </button>
      <SavedDesigns onSelect={(saved) => setConfig(saved)} />
    </main>
  );
}

function AvatarPreviewWithRef({
  config,
  svgRef,
}: {
  config: MorseConfig;
  svgRef: React.RefObject<SVGSVGElement>;
}) {
  return (
    <div
      ref={(node) => {
        const svg = node?.querySelector<SVGSVGElement>('[data-testid="avatar-svg"]');
        if (svg) (svgRef as React.MutableRefObject<SVGSVGElement | null>).current = svg;
      }}
    >
      <AvatarPreview config={config} />
    </div>
  );
}
