import { tToPixel } from "@/settings";
import { useGame } from "@/store";
import { IFungus } from "@/store/types";
import React from "react";

interface IFungusProps {
  fungus: IFungus;
}

export function Fungus(props: IFungusProps) {
  const { changeSelectedFungus, selectedFungus } = useGame();

  const handleClick = React.useCallback(() => {
    changeSelectedFungus(props.fungus.id);
  }, [props.fungus]);

  return (
    <g>
      <circle
        cx={tToPixel(props.fungus.t)}
        cy={0}
        r={20}
        fill="yellow"
        stroke={selectedFungus?.id === props.fungus.id ? "green" : ""}
        strokeWidth={3}
        onClick={handleClick}
      />
    </g>
  );
}
