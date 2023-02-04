import React from "react";
import { useGameCanvas } from "./GameCanvas";

export function AnchorPoints() {
  const size = useGameCanvas();
  const worldRadius = React.useMemo(
    () => Math.max(size.width, size.height) * 3,
    [size]
  );

  const anchorPoints = React.useMemo(() => {
    const amount = Math.trunc(worldRadius / 50);
    return new Array(amount).fill(0).map((_, i) => i * 50 - worldRadius / 2);
  }, [worldRadius]);

  const handleMouseEnter = React.useCallback(
    (e: React.MouseEvent<SVGCircleElement>) => {

    },
    []
  );

  return (
    <g>
      {anchorPoints.map((point) => (
        <circle
          cx={point}
          cy={0}
          r={5}
          fill="black"
          onMouseEnter={handleMouseEnter}
        />
      ))}
    </g>
  );
}
