import { useState, type RefObject } from "react";
import { downloadBlob, exportPngBlob, exportSvgBlob } from "../export";

const RESOLUTIONS = [256, 512, 1024, 2048];
const DEFAULT_CUSTOM_RESOLUTION = 512;
const MIN_RESOLUTION = 64;
const MAX_RESOLUTION = 4096;

function clampResolution(value: number): number {
  if (!Number.isFinite(value)) return DEFAULT_CUSTOM_RESOLUTION;
  return Math.min(MAX_RESOLUTION, Math.max(MIN_RESOLUTION, Math.round(value)));
}

export default function ExportPanel({
  svgRef,
  onShare,
  shareStatus = "idle",
}: {
  svgRef: RefObject<SVGSVGElement>;
  onShare?: () => void;
  shareStatus?: "idle" | "copied" | "failed";
}) {
  const [resolution, setResolution] = useState<number>(512);
  const [isCustom, setIsCustom] = useState(false);
  const [customResolution, setCustomResolution] = useState(DEFAULT_CUSTOM_RESOLUTION);

  const withSvg = (fn: (svg: SVGSVGElement) => void) => {
    if (svgRef.current) fn(svgRef.current);
  };

  const effectiveResolution = isCustom ? clampResolution(customResolution) : resolution;

  return (
    <div className="field">
      <label htmlFor="resolution" className="field-label">Resolution</label>
      <select
        id="resolution"
        value={isCustom ? "custom" : resolution}
        onChange={(e) => {
          if (e.target.value === "custom") {
            setIsCustom(true);
          } else {
            setIsCustom(false);
            setResolution(Number(e.target.value));
          }
        }}
      >
        {RESOLUTIONS.map((r) => (
          <option key={r} value={r}>
            {r}x{r}
          </option>
        ))}
        <option value="custom">Custom size</option>
      </select>

      {isCustom && (
        <label className="field">
          <span className="field-label">Custom resolution (px)</span>
          <input
            type="number"
            min={MIN_RESOLUTION}
            max={MAX_RESOLUTION}
            value={customResolution}
            onChange={(e) => setCustomResolution(Number(e.target.value))}
            onBlur={(e) => setCustomResolution(clampResolution(Number(e.target.value)))}
          />
        </label>
      )}

      <div className="button-row">
        <button
          type="button"
          className="action"
          onClick={() =>
            withSvg(async (svg) => {
              const blob = await exportPngBlob(svg, effectiveResolution);
              downloadBlob(blob, "blip.png");
            })
          }
        >
          Download PNG
        </button>

        <button
          type="button"
          className="action"
          onClick={() => withSvg((svg) => downloadBlob(exportSvgBlob(svg), "blip.svg"))}
        >
          Download SVG
        </button>

        {onShare && (
          <button
            type="button"
            className="action"
            onClick={onShare}
            aria-label="Share: copy a link to this exact design"
          >
            Share
          </button>
        )}
      </div>

      {shareStatus === "copied" && (
        <p role="status" className="status-message">Link copied to clipboard.</p>
      )}
      {shareStatus === "failed" && (
        <p role="status" className="status-message">
          Couldn't copy the link -- copy it from the address bar instead.
        </p>
      )}
    </div>
  );
}
