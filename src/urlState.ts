import { isValidConfig } from "./configValidation";
import type { MorseConfig } from "./types";

// btoa/atob only handle Latin-1 text. Routing the JSON string through
// encodeURIComponent/decodeURIComponent first makes arbitrary Unicode
// (e.g. non-Latin names, emoji) survive the round-trip instead of throwing.
function unicodeSafeBtoa(str: string): string {
  return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, (_, hex) => String.fromCharCode(parseInt(hex, 16))));
}

function unicodeSafeAtob(str: string): string {
  return decodeURIComponent(
    atob(str)
      .split("")
      .map((c) => "%" + c.charCodeAt(0).toString(16).padStart(2, "0"))
      .join("")
  );
}

export function encodeConfigToHash(config: MorseConfig): string {
  return unicodeSafeBtoa(JSON.stringify(config));
}

export function decodeConfigFromHash(hash: string): MorseConfig | null {
  try {
    const parsed: unknown = JSON.parse(unicodeSafeAtob(hash));
    return isValidConfig(parsed) ? parsed : null;
  } catch {
    return null;
  }
}
