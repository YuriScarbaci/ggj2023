import * as React from "react";
import { useGame } from "../store";

export function useSelectedFungus() {
  const { selectedFungusId, fungi } = useGame();

  return React.useMemo(() => {
    return fungi.find((fungus) => fungus.id === selectedFungusId);
  }, [selectedFungusId, fungi]);
}
