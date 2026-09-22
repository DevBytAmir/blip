import type { MorseLetter } from "../morse";

export interface FlatSymbol {
  type: "dot" | "dash";
  letterIndex: number;
  isLetterStart: boolean;
}

export function flattenLetters(letters: MorseLetter[]): FlatSymbol[] {
  const flat: FlatSymbol[] = [];
  letters.forEach((letter, letterIndex) => {
    letter.symbols.forEach((symbol, i) => {
      flat.push({
        type: symbol === "." ? "dot" : "dash",
        letterIndex,
        isLetterStart: i === 0,
      });
    });
  });
  return flat;
}
