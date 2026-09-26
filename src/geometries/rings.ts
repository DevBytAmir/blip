import type { GeometryRenderer, Mark } from "./types";
import type { MorseLetter } from "../morse";
import type { GeometryParams } from "./types";

const MIN_RADIUS_FACTOR = 0.05;

function renderRingsBase(
  letters: MorseLetter[],
  params: GeometryParams,
  ellipseRatio: number,
  rotatePerLetter: boolean
): Mark[] {
  const { size, strokeWidth, rotation } = params;
  const maxR = size * 0.42;
  const minR = size * MIN_RADIUS_FACTOR;
  const ringGap = letters.length > 0 ? (maxR - minR) / (letters.length + 1) : 0;

  return letters.map((letter, i): Mark => {
    const r = Math.max(minR, maxR - i * ringGap);
    const circumference = 2 * Math.PI * r;
    const unit = circumference / 40;
    const dashArray: number[] = [];

    letter.symbols.forEach((symbol) => {
      dashArray.push(symbol === "." ? unit : unit * 2.5, unit * 1.2);
    });
    // A trailing pair (zero-length dash, full circumference gap) keeps the
    // array length even so SVG's odd-length dasharray duplication rule
    // doesn't shift parity and turn this closing gap into a visible dash.
    dashArray.push(0, circumference);

    return {
      kind: "ring",
      cx: size / 2,
      cy: size / 2,
      rx: r,
      ry: r * ellipseRatio,
      strokeWidth: strokeWidth * 2,
      dashArray,
      rotation: rotatePerLetter ? (i * 180) / Math.max(1, letters.length) : rotation,
    };
  });
}

export const renderCircles: GeometryRenderer = (letters, params) =>
  renderRingsBase(letters, params, 1, false);

export const renderOrbits: GeometryRenderer = (letters, params) =>
  renderRingsBase(letters, params, 0.45, true);
