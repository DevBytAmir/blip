import { copyPngToClipboard, exportSvgBlob, serializeSvg } from "./export";

function makeSvg(): SVGSVGElement {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("viewBox", "0 0 400 400");
  const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  circle.setAttribute("r", "10");
  svg.appendChild(circle);
  return svg;
}

test("serializeSvg returns a string containing the svg markup", () => {
  const markup = serializeSvg(makeSvg());
  expect(markup).toContain("<svg");
  expect(markup).toContain("<circle");
});

test("exportSvgBlob returns an image/svg+xml blob", () => {
  const blob = exportSvgBlob(makeSvg());
  expect(blob.type).toBe("image/svg+xml");
});

test("copyPngToClipboard resolves to false (not throw) when the Clipboard API is unavailable", async () => {
  const original = (navigator as any).clipboard;
  delete (navigator as any).clipboard;

  await expect(copyPngToClipboard(makeSvg(), 512)).resolves.toBe(false);

  (navigator as any).clipboard = original;
});
