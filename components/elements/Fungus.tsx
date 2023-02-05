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

  const handleClick = React.useCallback(() => {
    setSelectedFungus(props.fungus);
  }, [setSelectedFungus, props.fungus]);

  return (
    <g>
      <circle
        cx={props.fungus.model.x}
        cy={0}
        r={20}
        fill="yellow"
        stroke={
          selectedFungus?.model.id === props.fungus.model.id ? "green" : ""
        }
        strokeWidth={3}
        onClick={handleClick}
      />
      <text x={props.fungus.model.x-9} y={5}>
        {props.fungus.model.rootPoints}
      </text>
    </g>
  );
}
