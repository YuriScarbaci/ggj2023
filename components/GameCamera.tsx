import React from "react";
import { useGameCanvas } from "./GameCanvas";

export function GameCamera(props: React.PropsWithChildren<{}>) {
  const size = useGameCanvas();

  const [rotation, setRotation] = React.useState(0);

  const worldRadius = React.useMemo(
    () => Math.max(size.width, size.height) * 3,
    [size]
  );

  const handleWorldClick = React.useCallback(
    (e: React.MouseEvent<SVGRectElement>) => {
      let prevX = e.clientX;
      let prevY = e.clientY;

      const handleMouseMove = (e: any) => {
        const currentX = e.clientX;
        const currentY = e.clientY;

        const deltaX = currentX - prevX;
        // const deltaY = currentY - prevY
        prevX = currentX;
        prevY = currentY;

        // const deltaAngle = Math.atan(deltaX / worldRadius);

        setRotation((rot) => rot + deltaX);
      };

      const handleMouseUp = () => {
        e.target.removeEventListener("mousemove", handleMouseMove);
        e.target.removeEventListener("mouseup", handleMouseUp);
      };

      e.target.addEventListener("mouseup", handleMouseUp);
      e.target.addEventListener("mousemove", handleMouseMove);
    },
    []
  );

  return (
    <g
      transform={`translate(${rotation + size.width / 2}, ${
        (3 * size.height) / 4
      })`}
      onMouseDown={handleWorldClick}
    >
      {props.children}
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
