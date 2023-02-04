import { randomArc, tToPixel, T_UNIT, T_WORLD_RADIUS } from "@/settings";
import { useGame } from "@/store";
import { IRoot } from "@/store/types";
import React from "react";
import { Root } from "./elements/Root";
import { useGameCanvas } from "./GameCanvas";

export function AnchorPoints() {
  const { selectedFungus, anchorPoints, addRoot } = useGame();

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
      setNewAnchor(null);
    },
    []
  );

  const handleClick = React.useCallback(
    (e: React.MouseEvent<SVGCircleElement>) => {
      const point = (e.target as HTMLElement).getAttribute("data-t");
      if (selectedFungus && point)
        addRoot(selectedFungus.t, parseInt(point || "0", 10));
    },
    [addRoot, selectedFungus]
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
          onClick={handleClick}
          style={{ cursor: "pointer" }}
        />
      ))}
      {newRoot && <Root root={newRoot} />}
    </g>
  );
}
