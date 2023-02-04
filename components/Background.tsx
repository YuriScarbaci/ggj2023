import { tToPixel, T_WORLD_RADIUS } from "@/settings";
import React from "react";
import { useGameCamera } from "./GameCamera";
import { useGameCanvas } from "./GameCanvas";

export function Background() {
  const size = useGameCanvas();
  const { translation } = useGameCamera();

  const worldRadius = React.useMemo(() => tToPixel(T_WORLD_RADIUS), []);

  return (
    <g>
      {new Array(5).fill(0).map((_, i, arr) => (
        <g key={i}>
          <rect
            width={worldRadius * 2}
            x={-worldRadius / 2}
            height={size.height}
            fill={`url(#trees-${i + 1})`}
          />
          <defs>
            <pattern
              id={`trees-${i + 1}`}
              patternUnits="userSpaceOnUse"
              x={translation / (arr.length - i) - translation}
              width={size.width}
              height={size.height}
            >
              <image
                href={`./textures/plx-${i + 1}.png`}
                x="0"
                y="-10%"
                width="100%"
                height="120%"
              />
            </pattern>
          </defs>
        </g>
      ))}
    </g>
  );
}
