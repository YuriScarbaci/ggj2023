import { tToPixel } from "@/settings";
import { useGame } from "@/store";
import { ColonyPoint } from "@/store/types";
import React from "react";
import type TreeModel from "tree-model";

interface FungusProps {
  fungus: TreeModel.Node<ColonyPoint>;
}

export function Fungus(props: FungusProps) {
  const { setSelectedFungus, selectedFungus } = useGame();
  const { id, x, rootPoints, fungusType } = props.fungus.model;
  const handleClick = React.useCallback(() => {
    if (fungusType === "colony") setSelectedFungus(props.fungus);
  }, [fungusType, setSelectedFungus, props.fungus]);

  return (
    <g>
      <g>
        <ellipse
          cx={x}
          cy={-24}
          rx={28}
          ry={25}
          fillOpacity="0.5"
          strokeOpacity="0.7"
          fill={selectedFungus?.model.id === id ? "lightgreen" : "transparent"}
          stroke={selectedFungus?.model.id === id ? "lime" : "transparent"}
        />
      </g>
      <g>
        <image
          href={`./textures/${fungusType}_64x64.png`}
          x={x - 26}
          y={-47}
          width="50px"
          height="50px"
          onClick={handleClick}
        />

        <ellipse
          cx={x + 12}
          cy={15}
          rx={30}
          ry={10}
          fillOpacity="0.3"
          fill="black"
        />
        {fungusType === "colony" ? (
          <text x={x - 14} y={20} fill={rootPoints > 0 ? "lime" : "white"}>
            RP: {rootPoints}
          </text>
        ) : null}
      </g>
    </g>
  );
}
