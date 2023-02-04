import { randomArc, tToPixel, T_UNIT, T_WORLD_RADIUS } from "@/settings";
import { useGame } from "@/store";
import { AnchorPoint } from "@/store/types";
import React from "react";
import { Root } from "./elements/Root";
import { useGameCanvas } from "./GameCanvas";

export function AnchorPoints() {
  const { selectedFungus, addRoot, anchorPoints, rootNode } = useGame();

  const [hoverAnchorT, setHoverAnchorT] = React.useState<number | null>();

  const hoverdAnchorPointArcs = React.useMemo(() => {
    if (hoverAnchorT !== null && hoverAnchorT !== undefined && selectedFungus) {
      const rootsArcs: string[] = new Array(5)
        .fill(0)
        .map((_) => randomArc(selectedFungus.model.t, hoverAnchorT));
      return rootsArcs;
    }
    return null;
  }, [hoverAnchorT, selectedFungus]);

  const handleMouseEnter = React.useCallback(
    (e: React.MouseEvent<SVGCircleElement>) => {
      const point = (e.target as HTMLElement).dataset.t;
      setHoverAnchorT(parseInt(point || "0", 10));
    },
    []
  );

  const handleMouseLeave = React.useCallback(
    (e: React.MouseEvent<SVGCircleElement>) => {
      setHoverAnchorT(null);
    },
    []
  );

  const handleClick = React.useCallback<(arg: AnchorPoint) => void>(
    (anchorPoint) => {
      if (selectedFungus) addRoot({ anchorPoint, parentNode: selectedFungus });
    },
    [addRoot, selectedFungus]
  );
  return (
    <g>
      {anchorPoints.map((point) => (
        <>
          {Boolean(
            rootNode.first((node) => node.model.id === point.id)
          ) ? null : (
            <circle
              key={`anchor-${point.x}`}
              data-t={point.t}
              cx={point.x}
              cy={0}
              r={10}
              fill="rgb(0,0,0,0.1)"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onClick={(e) => handleClick(point)}
              style={{ cursor: "pointer" }}
            />
          )}
        </>
      ))}
      {hoverdAnchorPointArcs && <Root arcs={hoverdAnchorPointArcs} />}
    </g>
  );
}
