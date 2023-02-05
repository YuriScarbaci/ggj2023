import React from "react";
import { useGameCanvas } from "./GameCanvas";

export function Soil(props: React.PropsWithChildren<{}>) {
  const size = useGameCanvas();
  const worldRadius = React.useMemo(
    () => Math.max(size.width, size.height) * 3,
    [size]
  );
  return (
    <g transform={`translate(0, ${(3 * size.height) / 4})`}>
      <rect
        width={worldRadius * 2}
        x={-worldRadius / 2}
        height={size.height / 4}
        fill="url(#soil)"
      />
      <g>{props.children}</g>
    </g>
  );

  // return (
  //   <g>
  //     <circle
  //       cx={size.width / 2}
  //       cy={worldRadius + (3 * size.height) / 4}
  //       r={worldRadius}
  //       fill="black"
  //       onMouseDown={handleWorldClick}
  //       // fill="url(#ground)"
  //     />

  //   </g>
  // );
}
