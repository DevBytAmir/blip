import { isValidConfig } from "./configValidation";
import type { MorseConfig } from "./types";

export function encodeConfigToHash(config: MorseConfig): string {
  return btoa(JSON.stringify(config));
}

export function decodeConfigFromHash(hash: string): MorseConfig | null {
  try {
    const parsed: unknown = JSON.parse(atob(hash));
    return isValidConfig(parsed) ? parsed : null;
  } catch {
    return null;
  }
}
