export function serializeSvg(svg: SVGSVGElement): string {
  return new XMLSerializer().serializeToString(svg);
}

export function exportSvgBlob(svg: SVGSVGElement): Blob {
  return new Blob([serializeSvg(svg)], { type: "image/svg+xml" });
}

export function renderSvgToCanvas(svg: SVGSVGElement, resolution: number): Promise<HTMLCanvasElement> {
  return new Promise((resolve, reject) => {
    const svgBlob = exportSvgBlob(svg);
    const url = URL.createObjectURL(svgBlob);
    const image = new Image();

    image.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = resolution;
      canvas.height = resolution;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        URL.revokeObjectURL(url);
        reject(new Error("Canvas 2D context unavailable"));
        return;
      }
      ctx.drawImage(image, 0, 0, resolution, resolution);
      URL.revokeObjectURL(url);
      resolve(canvas);
    };
    image.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Failed to rasterize SVG"));
    };
    image.src = url;
  });
}

export function exportPngBlob(svg: SVGSVGElement, resolution: number): Promise<Blob> {
  return renderSvgToCanvas(svg, resolution).then(
    (canvas) =>
      new Promise<Blob>((resolve, reject) => {
        canvas.toBlob((blob) => (blob ? resolve(blob) : reject(new Error("toBlob failed"))), "image/png");
      })
  );
}

export async function copyPngToClipboard(svg: SVGSVGElement, resolution: number): Promise<boolean> {
  if (!("clipboard" in navigator) || typeof ClipboardItem === "undefined") {
    return false;
  }
  try {
    const blob = await exportPngBlob(svg, resolution);
    await navigator.clipboard.write([new ClipboardItem({ "image/png": blob })]);
    return true;
  } catch {
    return false;
  }
}

export function downloadBlob(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}
