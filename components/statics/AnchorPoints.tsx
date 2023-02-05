import React from "react";
import { randomArc } from "@/settings";
import { useGame } from "@/store";
import { AnchorPoint } from "@/store/types";
import { Root } from "@/components/elements/Root";

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
      <g key={`point-${point.x}`}>
        <g>
          <image
              href="./textures/ground_healthy.png"
              x={point.x}
              y="0"
              width="64"
              height="64"
            />
            <image
              href="./textures/ground_underground.png"
              x={point.x}
              y="63"
              width="64"
              height="64"
            />
            <image
              href="./textures/ground_underground.png"
              x={point.x}
              y="120"
              width="64"
              height="64"
            />
          </g>
          <g>
            {Boolean(
              rootNode.first((node) => node.model.id === point.id)
            ) ? null : (
              <ellipse
                key={`anchor-${point.x}`}
                data-t={point.t}
                cx={point.x}
                cy={2}
                ry={4}
                rx={8}
                fill="brown"
                fillOpacity="0.7"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onClick={(e) => handleClick(point)}
                style={{ cursor: "pointer" }}
              />
            )}
            </g>
          </g>
      ))}
      {hoverdAnchorPointArcs && <Root arcs={hoverdAnchorPointArcs} />}
    </g>
  );
}
