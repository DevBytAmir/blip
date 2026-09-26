import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { encodeMorse } from "./morse";
import AvatarPreview from "./components/AvatarPreview";
import TextInput from "./components/TextInput";
import StylePicker from "./components/StylePicker";
import FineTunePanel from "./components/FineTunePanel";
import ColorPanel from "./components/ColorPanel";
import GeometryPicker from "./components/GeometryPicker";
import RandomizeButton from "./components/RandomizeButton";
import SavedDesigns from "./components/SavedDesigns";
import ExportPanel from "./components/ExportPanel";
import ThemeToggle from "./components/ThemeToggle";
import { STYLE_PRESETS } from "./presets/styles";
import { decodeConfigFromHash, encodeConfigToHash } from "./urlState";
import { saveDesign } from "./savedDesigns";
import { DEFAULT_CONFIG, type FieldTouched, type MorseConfig, type StyleId } from "./types";

type Theme = "dark" | "light";
const THEME_STORAGE_KEY = "blip.theme";

function readConfigFromLocation(): { config: MorseConfig; restoreFailed: boolean } {
  const rawHash = window.location.hash;
  if (!rawHash.startsWith("#c=")) return { config: DEFAULT_CONFIG, restoreFailed: false };
  const hash = rawHash.slice(3);
  if (!hash) return { config: DEFAULT_CONFIG, restoreFailed: false };
  const decoded = decodeConfigFromHash(hash);
  return decoded
    ? { config: decoded, restoreFailed: false }
    : { config: DEFAULT_CONFIG, restoreFailed: true };
}

function readInitialTheme(): Theme {
  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    if (stored === "light" || stored === "dark") return stored;
  } catch {
    // localStorage unavailable; fall through to OS preference / default.
  }
  try {
    if (window.matchMedia("(prefers-color-scheme: light)").matches) {
      return "light";
    }
  } catch {
    // matchMedia unavailable; fall through to the default.
  }
  return "dark";
}

export default function App() {
  const initial = useRef(readConfigFromLocation()).current;
  const [config, setConfig] = useState<MorseConfig>(initial.config);
  const [touched, setTouched] = useState<FieldTouched>({ strokeWidth: false, spacing: false });
  const [restoreFailed] = useState(initial.restoreFailed);
  const [savedVersion, setSavedVersion] = useState(0);
  const [copyStatus, setCopyStatus] = useState<"idle" | "copied" | "failed">("idle");
  const [theme, setTheme] = useState<Theme>(readInitialTheme);
  const [previousConfig, setPreviousConfig] = useState<MorseConfig | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const { letters } = useMemo(() => encodeMorse(config.text), [config.text]);

  useEffect(() => {
    window.history.replaceState(null, "", `#c=${encodeConfigToHash(config)}`);
  }, [config]);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try {
      localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch {
      // localStorage unavailable; the theme still applies for this session.
    }
  }, [theme]);

  function applyConfigPatch(patch: Partial<MorseConfig>) {
    setConfig((prev) => {
      const next = { ...prev, ...patch };
      if (patch.style) {
        const preset = STYLE_PRESETS[patch.style as StyleId];
        if (!touched.strokeWidth && patch.strokeWidth === undefined) {
          next.strokeWidth = preset.strokeWidth;
        }
        if (!touched.spacing && patch.spacing === undefined) {
          next.spacing = preset.spacing;
        }
      }
      return next;
    });
  }

  function handleRandomize(patch: Partial<MorseConfig>) {
    setPreviousConfig(config);
    applyConfigPatch(patch);
  }

  function handleUndo() {
    if (previousConfig) {
      setConfig(previousConfig);
      setPreviousConfig(null);
    }
  }

  function handleSave() {
    saveDesign(config.text || "Untitled", config);
    setSavedVersion((v) => v + 1);
  }

  async function handleCopyLink() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopyStatus("copied");
    } catch {
      setCopyStatus("failed");
    }
  }

  return (
    <main className="app">
      <div className="app-header-row">
        <h1 className="app-header">Blip</h1>
        <ThemeToggle theme={theme} onToggle={() => setTheme((t) => (t === "dark" ? "light" : "dark"))} />
      </div>
      {restoreFailed && (
        <p role="status" className="status-banner">
          Couldn't restore that link, showing defaults instead.
        </p>
      )}

      <div className="app-layout">
        <div className="app-panels">
          <section className="field word-banner" aria-label="Word">
            <TextInput
              value={config.text}
              onChange={(text) => applyConfigPatch({ text })}
              geometry={config.geometry}
            />
          </section>

          <section className="panel" aria-labelledby="geometry-heading">
            <h2 id="geometry-heading" className="panel-heading">Geometry</h2>
            <GeometryPicker
              value={config.geometry}
              onChange={(geometry) => applyConfigPatch({ geometry })}
              letters={letters}
            />
          </section>

          <section className="panel" aria-labelledby="style-heading">
            <h2 id="style-heading" className="panel-heading">Style</h2>
            <div className="fine-tune">
              <StylePicker value={config.style} onChange={(style) => applyConfigPatch({ style })} />
              <FineTunePanel
                config={config}
                onConfigChange={applyConfigPatch}
                onTouchedChange={(patch) => setTouched((prev) => ({ ...prev, ...patch }))}
              />
            </div>
          </section>

          <section className="panel" aria-labelledby="color-heading">
            <h2 id="color-heading" className="panel-heading">Color</h2>
            <ColorPanel config={config} onConfigChange={applyConfigPatch} />
          </section>

          <section className="panel" aria-labelledby="export-heading">
            <h2 id="export-heading" className="panel-heading">Export</h2>
            <ExportPanel svgRef={svgRef} onShare={handleCopyLink} shareStatus={copyStatus} />
          </section>

          <section className="panel" aria-labelledby="saved-heading">
            <h2 id="saved-heading" className="panel-heading">Stash</h2>
            <button
              type="button"
              className="action save-design-button"
              onClick={handleSave}
              aria-label="Keep this one: save it to your browser's stash"
            >
              Keep this one
            </button>
            <SavedDesigns key={savedVersion} onSelect={(saved) => setConfig(saved)} />
          </section>
        </div>

        <div className="app-preview-column">
          <AvatarPreviewWithRef config={config} svgRef={svgRef} />
          <div className="button-row">
            <RandomizeButton onRandomize={handleRandomize} />
            {previousConfig && (
              <button type="button" className="action" onClick={handleUndo}>
                Undo
              </button>
            )}
          </div>
        </div>
      </div>
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
  const containerRef = useCallback(
    (node: HTMLDivElement | null) => {
      const svg = node?.querySelector<SVGSVGElement>('[data-testid="avatar-svg"]');
      if (svg) (svgRef as React.MutableRefObject<SVGSVGElement | null>).current = svg;
    },
    [svgRef]
  );

  return (
    <div className="avatar-stage" ref={containerRef}>
      <AvatarPreview config={config} />
    </div>
  );
}
