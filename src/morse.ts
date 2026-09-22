export type MorseSymbol = "." | "-";

export interface MorseLetter {
  char: string;
  symbols: MorseSymbol[];
}

export interface EncodeResult {
  letters: MorseLetter[];
  strippedCount: number;
}

const MORSE_MAP: Record<string, string> = {
  A: ".-", B: "-...", C: "-.-.", D: "-..", E: ".", F: "..-.",
  G: "--.", H: "....", I: "..", J: ".---", K: "-.-", L: ".-..",
  M: "--", N: "-.", O: "---", P: ".--.", Q: "--.-", R: ".-.",
  S: "...", T: "-", U: "..-", V: "...-", W: ".--", X: "-..-",
  Y: "-.--", Z: "--..",
  "0": "-----", "1": ".----", "2": "..---", "3": "...--", "4": "....-",
  "5": ".....", "6": "-....", "7": "--...", "8": "---..", "9": "----.",
};

export function encodeMorse(text: string): EncodeResult {
  const letters: MorseLetter[] = [];
  let strippedCount = 0;

  for (const rawChar of text.toUpperCase()) {
    const code = MORSE_MAP[rawChar];
    if (!code) {
      strippedCount += 1;
      continue;
    }
    letters.push({ char: rawChar, symbols: code.split("") as MorseSymbol[] });
  }

  return { letters, strippedCount };
}

export function totalSymbolCount(letters: MorseLetter[]): number {
  return letters.reduce((sum, letter) => sum + letter.symbols.length, 0);
}
