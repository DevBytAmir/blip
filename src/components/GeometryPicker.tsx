import type { GeometryId } from "../types";

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
}: {
  value: GeometryId;
  onChange: (id: GeometryId) => void;
}) {
  return (
    <div role="group" aria-label="Geometry" className="picker-grid">
      {(Object.keys(GEOMETRY_LABELS) as GeometryId[]).map((id) => (
        <button
          key={id}
          type="button"
          className="chip"
          aria-pressed={id === value}
          onClick={() => onChange(id)}
        >
          {GEOMETRY_LABELS[id]}
        </button>
      ))}
    </div>
  );
}
