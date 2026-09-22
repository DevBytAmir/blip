import { encodeMorse, totalSymbolCount } from "./morse";

test("encodes letters and digits to morse symbols", () => {
  const result = encodeMorse("SOS1");
  expect(result.letters.map((l) => l.symbols.join(""))).toEqual([
    "...", "---", "...", ".----",
  ]);
  expect(result.strippedCount).toBe(0);
});

test("is case-insensitive", () => {
  const result = encodeMorse("sos");
  expect(result.letters.map((l) => l.char)).toEqual(["S", "O", "S"]);
});

test("strips unencodable characters and counts them", () => {
  const result = encodeMorse("A B!");
  expect(result.letters.map((l) => l.char)).toEqual(["A", "B"]);
  expect(result.strippedCount).toBe(2);
});

test("handles empty input", () => {
  const result = encodeMorse("");
  expect(result.letters).toEqual([]);
  expect(result.strippedCount).toBe(0);
});

test("totalSymbolCount sums all symbols across letters", () => {
  const result = encodeMorse("SOS");
  expect(totalSymbolCount(result.letters)).toBe(9);
});
