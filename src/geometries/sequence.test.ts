import { flattenLetters } from "./sequence";
import { encodeMorse } from "../morse";

test("flattens letters into symbols tagged with letter index and letter-start flag", () => {
  const { letters } = encodeMorse("SOS");
  const flat = flattenLetters(letters);
  expect(flat).toHaveLength(9);
  expect(flat[0]).toEqual({ type: "dot", letterIndex: 0, isLetterStart: true });
  expect(flat[3]).toEqual({ type: "dash", letterIndex: 1, isLetterStart: true });
  expect(flat[4].isLetterStart).toBe(false);
});
