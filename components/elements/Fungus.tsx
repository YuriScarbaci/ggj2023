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
      <g>
        <ellipse 
          cx={props.fungus.model.x}
          cy={-24}
          rx={28}
          ry={25}
          fillOpacity="0.5"
          strokeOpacity="0.7" 
          fill={
            selectedFungus?.model.id === props.fungus.model.id ? "lightgreen" : "transparent"
          }
          stroke={
            selectedFungus?.model.id === props.fungus.model.id ? "lime" : "transparent"
          }
        />
      </g>
      <g>
        <image
          href={`./textures/${selectedFungus?.model.fungusType}_64x64.png`}
          x={props.fungus.model.x - 26}
          y={-47}
          width="50px"
          height="50px"
          onClick={handleClick}
        />

        <ellipse 
          cx={props.fungus.model.x + 12}
          cy={15}
          rx={30}
          ry={10}
          fillOpacity="0.3"
          fill="black"
        />
        <text
          x={props.fungus.model.x-14}
          y={20}
         fill={props.fungus.model.rootPoints > 0 ? "lime" :"white"}
         >
         RP: {props.fungus.model.rootPoints}
        </text>
      </g>
    </g>
  );
}
