import { useMemo } from "react";
import { encodeMorse } from "../morse";
import { GEOMETRY_RENDERERS } from "../geometries";
import { STYLE_PRESETS } from "../presets/styles";
import { COLOR_THEMES } from "../presets/colors";
import type { FillDef } from "../presets/colors";
import type { MorseConfig } from "../types";
import type { Mark } from "../geometries/types";

const SIZE = 400;

function fillId(prefix: string, colorId: string): string {
  return `${prefix}-${colorId}`;
}

function resolveFill(fill: FillDef, id: string): { attr: string; defs: JSX.Element | null } {
  if (fill.type === "solid") return { attr: fill.color, defs: null };
  const rad = (fill.angle * Math.PI) / 180;
  const x2 = 50 + Math.cos(rad) * 50;
  const y2 = 50 + Math.sin(rad) * 50;
  return {
    attr: `url(#${id})`,
    defs: (
      <linearGradient id={id} x1={`${100 - x2}%`} y1={`${100 - y2}%`} x2={`${x2}%`} y2={`${y2}%`}>
        {fill.stops.map((stop) => (
          <stop key={stop.offset} offset={stop.offset} stopColor={stop.color} />
        ))}
      </linearGradient>
    ),
  };
}

function markToElement(mark: Mark, key: number, fillAttr: string): JSX.Element {
  switch (mark.kind) {
    case "circle":
      return <circle key={key} cx={mark.cx} cy={mark.cy} r={mark.r} fill={fillAttr} />;
    case "rect":
      return (
        <rect
          key={key}
          x={mark.cx - mark.width / 2}
          y={mark.cy - mark.height / 2}
          width={mark.width}
          height={mark.height}
          rx={mark.cornerRadius}
          fill={fillAttr}
          transform={`rotate(${mark.rotation} ${mark.cx} ${mark.cy})`}
        />
      );
    case "polygon":
      return <polygon key={key} points={mark.points.map((p) => p.join(",")).join(" ")} fill={fillAttr} />;
    case "ring":
      return (
        <ellipse
          key={key}
          cx={mark.cx}
          cy={mark.cy}
          rx={mark.rx}
          ry={mark.ry}
          fill="none"
          stroke={fillAttr}
          strokeWidth={mark.strokeWidth}
          strokeDasharray={mark.dashArray.join(" ")}
          transform={`rotate(${mark.rotation} ${mark.cx} ${mark.cy})`}
        />
      );
  }
}

export default function AvatarPreview({ config }: { config: MorseConfig }) {
  const { letters } = useMemo(() => encodeMorse(config.text), [config.text]);
  const style = STYLE_PRESETS[config.style];
  const theme = COLOR_THEMES[config.color];

  const strokeWidth = config.strokeWidth || style.strokeWidth;
  const spacing = config.spacing || style.spacing;

  const marks: Mark[] = useMemo(() => {
    if (letters.length === 0) {
      return [{ kind: "circle", cx: SIZE / 2, cy: SIZE / 2, r: SIZE * 0.08 }];
    }
    return GEOMETRY_RENDERERS[config.geometry](letters, {
      size: SIZE,
      strokeWidth,
      spacing,
      rotation: config.rotation,
    });
  }, [letters, config.geometry, strokeWidth, spacing, config.rotation]);

  const bg = resolveFill(theme.background, fillId("bg", theme.id));
  const mark = resolveFill(theme.mark, fillId("mark", theme.id));
  const clipId = `clip-${config.frame}`;

  return (
    <svg
      data-testid="avatar-svg"
      width={280}
      height={280}
      viewBox={`0 0 ${SIZE} ${SIZE}`}
      role="img"
      aria-label={`Morse avatar for ${config.text || "empty input"}`}
    >
      <defs>
        {bg.defs}
        {mark.defs}
        <clipPath id={clipId}>
          {config.frame === "circle" && <circle cx={SIZE / 2} cy={SIZE / 2} r={SIZE / 2} />}
          {config.frame === "square" && <rect x={0} y={0} width={SIZE} height={SIZE} />}
          {config.frame === "rounded-square" && (
            <rect x={0} y={0} width={SIZE} height={SIZE} rx={SIZE * 0.12} />
          )}
        </clipPath>
      </defs>
      <g clipPath={`url(#${clipId})`}>
        <rect x={0} y={0} width={SIZE} height={SIZE} fill={bg.attr} />
        {marks.map((m, i) => markToElement(m, i, mark.attr))}
      </g>
    </svg>
  );
}
