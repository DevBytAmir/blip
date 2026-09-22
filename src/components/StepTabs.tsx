import { useState } from "react";
import StylePicker from "./StylePicker";
import ColorPicker from "./ColorPicker";
import GeometryPicker from "./GeometryPicker";
import type { MorseConfig } from "../types";

type Tab = "style" | "color" | "geometry";
const TABS: { id: Tab; label: string }[] = [
  { id: "style", label: "Style" },
  { id: "color", label: "Color" },
  { id: "geometry", label: "Geometry" },
];

export default function StepTabs({
  config,
  onConfigChange,
}: {
  config: MorseConfig;
  onConfigChange: (patch: Partial<MorseConfig>) => void;
}) {
  const [active, setActive] = useState<Tab>("style");

  return (
    <div>
      <div role="tablist" className="tabs">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            role="tab"
            className="tab"
            aria-selected={active === tab.id}
            onClick={() => setActive(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      {active === "style" && (
        <StylePicker value={config.style} onChange={(style) => onConfigChange({ style })} />
      )}
      {active === "color" && (
        <ColorPicker value={config.color} onChange={(color) => onConfigChange({ color })} />
      )}
      {active === "geometry" && (
        <GeometryPicker value={config.geometry} onChange={(geometry) => onConfigChange({ geometry })} />
      )}
    </div>
  );
}
