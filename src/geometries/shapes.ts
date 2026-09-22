export function hexCapsulePoints(
  cx: number,
  cy: number,
  width: number,
  height: number
): [number, number][] {
  const half = height / 2;
  return [
    [cx - width / 2 + half, cy - half],
    [cx + width / 2 - half, cy - half],
    [cx + width / 2, cy],
    [cx + width / 2 - half, cy + half],
    [cx - width / 2 + half, cy + half],
    [cx - width / 2, cy],
  ];
}
