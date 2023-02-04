import { useGame } from "@/store";
import { IRoot } from "@/store/types";
import React from "react";
import { useGameCanvas } from "./GameCanvas";

function randomArc(x1: number, y1: number, x2: number, y2: number) {
  let cx = x1 + (x2 - x1) / 2;
  let cy = y1 + ((Math.random() * 0.6 + 0.3) * Math.abs(x2 - x1)) / 2;
  return `M ${x1} ${y1} Q ${cx} ${cy} ${x2} ${y2}`;
}

export function AnchorPoints() {
  const { selectedFungus } = useGame();

  const [newAnchor, setNewAnchor] = React.useState<number | null>();

  const size = useGameCanvas();
  const worldRadius = React.useMemo(
    () => Math.max(size.width, size.height) * 3,
    [size]
  );

  const anchorPoints = React.useMemo(() => {
    const amount = Math.trunc(worldRadius / 50);
    return new Array(amount).fill(0).map((_, i) => i * 50 - worldRadius / 2);
  }, [worldRadius]);

  const newRoot = React.useMemo(() => {
    if (newAnchor !== null)
      return {
        fromT: selectedFungus.t,
        toT: newAnchor,
      } as IRoot;
    return null;
  }, [newAnchor, selectedFungus]);

  const handleMouseEnter = React.useCallback(
    (e: React.MouseEvent<SVGCircleElement>) => {
      const point = (e.target as HTMLElement).getAttribute("cx");
      setNewAnchor(parseInt(point || "0", 10));
    },
    []
  );

  const handleMouseLeave = React.useCallback(
    (e: React.MouseEvent<SVGCircleElement>) => {
      const point = (e.target as HTMLElement).getAttribute("cx");
      setNewAnchor(null);
    },
    []
  );

  return (
    <g>
      {anchorPoints.map((point) => (
        <circle
          cx={point}
          cy={0}
          r={10}
          fill="rgb(0,0,0,0.1)"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          style={{ cursor: "pointer" }}
        />
      ))}
      {newRoot && (
        <>
          <path
            d={randomArc(newRoot.fromT, 0, newRoot.toT, 0)}
            fill="none"
            stroke="yellow"
            style={{ pointerEvents: "none" }}
          />
          <path
            d={randomArc(newRoot.fromT, 0, newRoot.toT, 0)}
            fill="none"
            stroke="yellow"
            style={{ pointerEvents: "none" }}
          />
          <path
            d={randomArc(newRoot.fromT, 0, newRoot.toT, 0)}
            fill="none"
            stroke="yellow"
            style={{ pointerEvents: "none" }}
          />
          <path
            d={randomArc(newRoot.fromT, 0, newRoot.toT, 0)}
            fill="none"
            stroke="yellow"
            style={{ pointerEvents: "none" }}
          />
          <path
            d={randomArc(newRoot.fromT, 0, newRoot.toT, 0)}
            fill="none"
            stroke="yellow"
            style={{ pointerEvents: "none" }}
          />
        </>
      )}
    </g>
  );
}
