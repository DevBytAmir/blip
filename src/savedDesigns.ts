import type { MorseConfig } from "./types";

const STORAGE_KEY = "blip.designs";

export interface SavedDesign {
  id: string;
  name: string;
  config: MorseConfig;
  createdAt: number;
}

export function listSavedDesigns(): SavedDesign[] {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function persist(designs: SavedDesign[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(designs));
}

export function saveDesign(name: string, config: MorseConfig): SavedDesign {
  const design: SavedDesign = {
    id: crypto.randomUUID(),
    name,
    config,
    createdAt: Date.now(),
  };
  persist([...listSavedDesigns(), design]);
  return design;
}

export function deleteSavedDesign(id: string): void {
  persist(listSavedDesigns().filter((d) => d.id !== id));
}
