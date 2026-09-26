import { isValidConfig } from "./configValidation";
import type { MorseConfig } from "./types";

const STORAGE_KEY = "blip.designs";

export interface SavedDesign {
  id: string;
  name: string;
  config: MorseConfig;
  createdAt: number;
}

function isValidSavedDesign(value: unknown): value is SavedDesign {
  if (typeof value !== "object" || value === null) return false;
  const v = value as Record<string, unknown>;
  return (
    typeof v.id === "string" &&
    typeof v.name === "string" &&
    typeof v.createdAt === "number" &&
    isValidConfig(v.config)
  );
}

export function listSavedDesigns(): SavedDesign[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter(isValidSavedDesign) : [];
  } catch {
    return [];
  }
}

function persist(designs: SavedDesign[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(designs));
  } catch {
    // Storage unavailable (private browsing, sandboxed iframe, quota) --
    // fail silently rather than crash the app.
  }
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
