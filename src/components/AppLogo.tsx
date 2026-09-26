import { encodeMorse } from "../morse";

export default function AppLogo({ word }: { word: string }) {
  const { letters } = encodeMorse(word);

  return (
    <h1 className="app-header" aria-label={word}>
      {letters.map((letter, i) => (
        <span className="app-header-letter" key={i} aria-hidden="true">
          <span className="app-header-char">{letter.char}</span>
          <span className="app-header-morse">{letter.symbols.join("")}</span>
        </span>
      ))}
    </h1>
  );
}
