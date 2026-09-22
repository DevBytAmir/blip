import { useState } from "react";
import { deleteSavedDesign, listSavedDesigns } from "../savedDesigns";
import type { MorseConfig } from "../types";

export default function SavedDesigns({ onSelect }: { onSelect: (config: MorseConfig) => void }) {
  const [designs, setDesigns] = useState(listSavedDesigns());

  if (designs.length === 0) {
    return <p className="status-message">No saved designs yet.</p>;
  }

  return (
    <ul className="saved-list">
      {designs.map((design) => (
        <li key={design.id}>
          <button type="button" onClick={() => onSelect(design.config)}>
            {design.name}
          </button>
          <button
            type="button"
            aria-label={`Delete ${design.name}`}
            onClick={() => {
              deleteSavedDesign(design.id);
              setDesigns(listSavedDesigns());
            }}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}
