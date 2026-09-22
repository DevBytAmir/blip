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
    <main className="app">
      <h1 className="app-header">Blip</h1>
      {restoreFailed && (
        <p role="status" className="status-banner">
          Couldn't restore that link, showing defaults instead.
        </p>
      )}

      <section className="field panel" aria-label="Word">
        <TextInput
          value={config.text}
          onChange={(text) => applyConfigPatch({ text })}
          geometry={config.geometry}
        />
      </section>

      <AvatarPreviewWithRef config={config} svgRef={svgRef} />

      <section className="panel" aria-labelledby="customize-heading">
        <h2 id="customize-heading" className="panel-heading">Customize</h2>
        <StepTabs config={config} onConfigChange={applyConfigPatch} />
      </section>

      <section className="panel" aria-labelledby="finetune-heading">
        <h2 id="finetune-heading" className="panel-heading">Fine-tune</h2>
        <FineTunePanel
          config={config}
          touched={touched}
          onConfigChange={applyConfigPatch}
          onTouchedChange={(patch) => setTouched((prev) => ({ ...prev, ...patch }))}
        />
      </section>

      <section className="panel button-row" aria-label="Quick actions">
        <RandomizeButton onRandomize={applyConfigPatch} />
        <button
          type="button"
          className="action"
          onClick={() => saveDesign(config.text || "Untitled", config)}
        >
          Save design
        </button>
      </section>

      <section className="panel" aria-labelledby="export-heading">
        <h2 id="export-heading" className="panel-heading">Export</h2>
        <ExportPanel svgRef={svgRef} />
      </section>

      <section className="panel" aria-labelledby="saved-heading">
        <h2 id="saved-heading" className="panel-heading">Your designs</h2>
        <SavedDesigns onSelect={(saved) => setConfig(saved)} />
      </section>
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
      className="avatar-stage"
      ref={(node) => {
        const svg = node?.querySelector<SVGSVGElement>('[data-testid="avatar-svg"]');
        if (svg) (svgRef as React.MutableRefObject<SVGSVGElement | null>).current = svg;
      }}
    >
      <AvatarPreview config={config} />
    </div>
  );
}
