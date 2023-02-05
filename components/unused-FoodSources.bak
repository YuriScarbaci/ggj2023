import { randomArc } from "@/settings";
import { useGame } from "@/store";
import { IRoot } from "@/store/types";
import React from "react";
import { Water } from "./elements/Water";

export function FoodSources() {
  const { selectedFungus } = useGame();
  const { elements } = useGame();

  const [newAnchor, setNewAnchor] = React.useState<number | null>();

  const handleMouseEnter = React.useCallback(
    (e: React.MouseEvent<SVGElement>) => {
      const point = (e.target as HTMLElement).getAttribute("data-t");
      setNewAnchor(parseInt(point || "0", 10));
    },
    []
  );

  const handleMouseLeave = React.useCallback(
    (e: React.MouseEvent<SVGElement>) => {
      const point = (e.target as HTMLElement).getAttribute("cx");
      setNewAnchor(null);
    },
    []
  );

  const newRoot = React.useMemo(() => {
    if (newAnchor !== null && selectedFungus)
      return {
        fromT: selectedFungus.t,
        toT: newAnchor,
      } as IRoot;
    return null;
  }, [newAnchor, selectedFungus]);

  return (
    <g>
      {elements.map((element) => {
        if (element.type === "water")
          return (
            <Water
              key={element.id}
              water={element}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            />
          );
        return null;
      })}
      {newRoot && (
        <>
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
