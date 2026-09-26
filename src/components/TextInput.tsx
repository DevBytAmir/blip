import { encodeMorse } from "../morse";
import { isLikelyCramped } from "../geometries/capabilities";
import type { GeometryId } from "../types";

export { isLikelyCramped };

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
      {letters.length > 0 && (
        <p className="morse-caption">{letters.map((l) => l.symbols.join("")).join(" ")}</p>
      )}
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
