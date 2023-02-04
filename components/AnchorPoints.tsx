import { randomArc, tToPixel, T_UNIT, T_WORLD_RADIUS } from "@/settings";
import { useGame } from "@/store";
import { IRoot } from "@/store/types";
import React from "react";
import { useGameCanvas } from "./GameCanvas";

export function AnchorPoints() {
  const { selectedFungus, anchorPoints } = useGame();

  const [newAnchor, setNewAnchor] = React.useState<number | null>();

  const newRoot = React.useMemo(() => {
    if (newAnchor !== null && selectedFungus)
      return {
        fromT: selectedFungus.t,
        toT: newAnchor,
      } as IRoot;
    return null;
  }, [newAnchor, selectedFungus]);

  const handleMouseEnter = React.useCallback(
    (e: React.MouseEvent<SVGCircleElement>) => {
      const point = (e.target as HTMLElement).getAttribute("data-t");
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
          data-t={point.t}
          cx={tToPixel(point.t)}
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
            d={randomArc(newRoot.fromT, newRoot.toT)}
            fill="none"
            stroke="yellow"
            style={{ pointerEvents: "none" }}
          />
          <path
            d={randomArc(newRoot.fromT, newRoot.toT)}
            fill="none"
            stroke="yellow"
            style={{ pointerEvents: "none" }}
          />
          <path
            d={randomArc(newRoot.fromT, newRoot.toT)}
            fill="none"
            stroke="yellow"
            style={{ pointerEvents: "none" }}
          />
          <path
            d={randomArc(newRoot.fromT, newRoot.toT)}
            fill="none"
            stroke="yellow"
            style={{ pointerEvents: "none" }}
          />
          <path
            d={randomArc(newRoot.fromT, newRoot.toT)}
            fill="none"
            stroke="yellow"
            style={{ pointerEvents: "none" }}
          />
        </>
      )}
    </g>
  );
}
