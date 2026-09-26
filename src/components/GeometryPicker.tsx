import { isLikelyCramped } from "../geometries/capabilities";
import type { GeometryId } from "../types";
import type { MorseLetter } from "../morse";

const GEOMETRY_LABELS: Record<GeometryId, string> = {
  grid: "Grid Rows",
  circles: "Concentric Circles",
  spokes: "Radial Spokes",
  spiral: "Single Spiral",
  honeycomb: "Honeycomb Capsules",
  barcode: "Barcode Bars",
  wave: "Wave Line",
  orbits: "Orbiting Ellipses",
  pixel: "Pixel Matrix",
};

export default function GeometryPicker({
  value,
  onChange,
  letters,
}: {
  value: GeometryId;
  onChange: (id: GeometryId) => void;
  letters: MorseLetter[];
}) {
  return (
    <div role="group" aria-label="Geometry" className="picker-grid">
      {(Object.keys(GEOMETRY_LABELS) as GeometryId[]).map((id) => {
        const cramped = isLikelyCramped(letters, id);
        return (
          <button
            key={id}
            type="button"
            className={`chip${cramped ? " chip-cramped" : ""}`}
            aria-pressed={id === value}
            aria-label={`${GEOMETRY_LABELS[id]} layout${cramped ? ", may look cramped with this word" : ""}`}
            onClick={() => onChange(id)}
          >
            {GEOMETRY_LABELS[id]}
          </button>
        );
      })}
    </div>
  );
}
