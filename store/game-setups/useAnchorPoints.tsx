import * as React from "react";
import { v4 as uuid } from "uuid";
import { tToPixel, T_WORLD_RADIUS } from "@/settings";
import { TerritoryType } from "@/store/types";

export const useAnchorPoints = () => {
  const anchorPoints = React.useMemo(() => {
    const tentativePoints = new Array(T_WORLD_RADIUS).fill(0).map((_, i) => ({
      t: i - T_WORLD_RADIUS / 2,
      id: uuid(),
      x: tToPixel(i - T_WORLD_RADIUS / 2),
      y: 0,
      territoryType: (i % 3 === 0
        ? "colonyPoint"
        : i % 2 === 0
        ? "desert"
        : "resource") as TerritoryType,
    }));
    return tentativePoints;
  }, []);
  return {
    anchorPoints,
  };
};
