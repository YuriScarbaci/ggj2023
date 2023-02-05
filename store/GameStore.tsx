import * as React from "react";
import { useEvents } from "./Events";
import { IGameStoreContext } from "./types";
import { useAnchorPoints } from "@/store/game-setups/useAnchorPoints";
import { useTraitPoints } from "@/store/game-logics/useTraitPoints";
import { useShroomsTree } from "@/store/game-logics/useShroomsTree";
import { ColonyPoint, LevelType } from "@/store/types";
import TreeModel from "tree-model";
import { useEnemies } from "./game-logics/useEnemies";

export const GameStoreContext = React.createContext<IGameStoreContext>(
  {} as IGameStoreContext
);
export function useGame() {
  return React.useContext(GameStoreContext);
}

export const LEVEL_1: LevelType = {
  numberOfEnemies: 6,
  types: ["Ant"],
  everyMSTime: 4000,
};

export function GameStore(props: React.PropsWithChildren<{}>) {
  const [totalColonies, setTotalColonies] = React.useState(1);
  const { anchorPoints } = useAnchorPoints();
  const [selectedTypeOfFungusSelector, setSelectedTypeOfFungusSelector] =
    React.useState<"poison" | "colony">("colony");
  const { triggerEvent, subscribeEvent, unsubscribeEvent } = useEvents();
  const {
    traitPoints,
    addTraitPoints,
    spendTraitPoints,
    canSpendTraitsPoints,
  } = useTraitPoints();
  const { addRoot, treeRerenderKey, setTreeRerenderKey, fungiTree, rootNode } =
    useShroomsTree({
      selectedTypeOfFungusSelector,
      setTotalColonies,
      addTraitPoints,
    });

  const { enemies, removeFungus } = useEnemies({
    rootNode,
    currentLevel: LEVEL_1,
    setTreeRerenderKey,
  });

  const [selectedFungus, setSelectedFungus] =
    React.useState<TreeModel.Node<ColonyPoint>>(rootNode);

  const contextValue = React.useMemo(
    () => ({
      treeRerenderKey,
      rootNode,
      fungiTree,
      selectedFungus,
      anchorPoints,
      addRoot,
      setSelectedFungus,
      traitPoints,
      totalColonies,
      enemies,
      removeFungus,
      selectedTypeOfFungusSelector,
      setSelectedTypeOfFungusSelector,
    }),
    [
      treeRerenderKey,
      rootNode,
      fungiTree,
      selectedFungus,
      anchorPoints,
      addRoot,
      setSelectedFungus,
      traitPoints,
      totalColonies,
      enemies,
      removeFungus,
      selectedTypeOfFungusSelector,
      setSelectedTypeOfFungusSelector,
    ]
  );

  return (
    <GameStoreContext.Provider value={contextValue}>
      {props.children}
    </GameStoreContext.Provider>
  );
}
