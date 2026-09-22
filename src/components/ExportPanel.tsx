import { useState, type RefObject } from "react";
import { copyPngToClipboard, downloadBlob, exportPngBlob, exportSvgBlob } from "../export";

const RESOLUTIONS = [256, 512, 1024, 2048];

export default function ExportPanel({ svgRef }: { svgRef: RefObject<SVGSVGElement> }) {
  const [resolution, setResolution] = useState(512);
  const [copyFailed, setCopyFailed] = useState(false);

  const withSvg = (fn: (svg: SVGSVGElement) => void) => {
    if (svgRef.current) fn(svgRef.current);
  };

  return (
    <div className="field">
      <label htmlFor="resolution" className="field-label">Resolution</label>
      <select
        id="resolution"
        value={resolution}
        onChange={(e) => setResolution(Number(e.target.value))}
      >
        {RESOLUTIONS.map((r) => (
          <option key={r} value={r}>
            {r}x{r}
          </option>
        ))}
      </select>

      <div className="button-row">
        <button
          type="button"
          className="action"
          onClick={() =>
            withSvg(async (svg) => {
              const blob = await exportPngBlob(svg, resolution);
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

        <button
          type="button"
          className="action"
          onClick={() =>
            withSvg(async (svg) => {
              const ok = await copyPngToClipboard(svg, resolution);
              setCopyFailed(!ok);
            })
          }
        >
          Copy to clipboard
        </button>
      </div>
      {copyFailed && (
        <p role="status" className="status-message">
          Couldn't copy to clipboard in this browser -- use a download button instead.
        </p>
      )}
    </div>
  );
}
