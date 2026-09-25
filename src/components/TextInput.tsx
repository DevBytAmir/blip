import { encodeMorse, totalSymbolCount, type MorseLetter } from "../morse";
import type { GeometryId } from "../types";

const COMFORTABLE_SYMBOL_CAP: Record<GeometryId, number> = {
  grid: 45,
  pixel: 45,
  honeycomb: 40,
  circles: 24,
  orbits: 24,
  barcode: 70,
  spokes: 60,
  spiral: 70,
  wave: 70,
};

export function isLikelyCramped(letters: MorseLetter[], geometry: GeometryId): boolean {
  return totalSymbolCount(letters) > COMFORTABLE_SYMBOL_CAP[geometry];
}

interface TextInputProps {
  value: string;
  onChange: (text: string) => void;
  geometry: GeometryId;
}

export default function TextInput({ value, onChange, geometry }: TextInputProps) {
  const { letters, strippedCount } = encodeMorse(value);
  const cramped = isLikelyCramped(letters, geometry);

  return (
    <>
      <label htmlFor="morse-text" className="field-label">Word</label>
      <input
        id="morse-text"
        type="text"
        className="text-input"
        placeholder="Type a name, a word, anything..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {strippedCount > 0 && (
        <p role="status" className="status-message">
          {strippedCount} character{strippedCount === 1 ? "" : "s"} removed (only A-Z and 0-9 can be
          Morse-encoded).
        </p>
      )}
      {cramped && (
        <p role="status" className="status-message">
          This might look cramped with the current geometry - try a shorter word or a different
          layout.
        </p>
      )}
    </>
  );
}
