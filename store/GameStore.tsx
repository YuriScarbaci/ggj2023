import * as React from "react";
import { useEvents } from "./Events";
import { IGameStoreContext } from "./types";
import { v4 as uuid } from "uuid";
import { useAnchorPoints } from "@/store/game-setups/useAnchorPoints";
import { useTraitPoints } from "@/store/game-logics/useTraitPoints";
import { useShroomsTree } from "@/store/game-logics/useShroomsTree";
import { AnchorPoint, ColonyPoint, TerritoryType, Enemy } from "@/store/types";
import TreeModel from "tree-model";

export const GameStoreContext = React.createContext<IGameStoreContext>(
  {} as IGameStoreContext
);
export function useGame() {
  return React.useContext(GameStoreContext);
}

export const START_SIDES = ["left", "right"];
export const LEVEL_1 = {
  numberOfEnemies: 6,
  types: ["ant"],
  everyMSTime: 6000,
};

export function GameStore(props: React.PropsWithChildren<{}>) {
  const [totalColonies, setTotalColonies] = React.useState(1);
  const { anchorPoints } = useAnchorPoints();
  const [enemies, setEnemies] = React.useState<Enemy[]>([]);
  const { triggerEvent, subscribeEvent, unsubscribeEvent } = useEvents();
  const {
    traitPoints,
    traits,
    addTraitPoints,
    spendTraitPoints,
    canSpendTraitsPoints,
    revertTrait,
  } = useTraitPoints();
  const { addRoot, treeRerenderKey, setTreeRerenderKey, fungiTree, rootNode } =
    useShroomsTree({
      setTotalColonies,
      addTraitPoints,
    });
  const [selectedFungus, setSelectedFungus] =
    React.useState<TreeModel.Node<ColonyPoint>>(rootNode);

  const getFungusTarget = (startSide = "left") => {
    let target = { model: { t: 0 } };
    rootNode.walk((node) => {
      if (
        (startSide === "left" && node.model.t <= target.model.t) ||
        (startSide === "right" && node.model.t >= target.model.t)
      ) {
        target = node;
      }
    });
    return target;
  };

  React.useEffect(() => {
    const interval = setInterval(() => {
      const startSide = START_SIDES[Math.floor(Math.random() * 2)];
      const target = getFungusTarget(startSide);
      setEnemies((prevEnemies) => {
        console.log({ prevEnemies }, prevEnemies.length);
        if (prevEnemies.length >= LEVEL_1.numberOfEnemies)
          clearInterval(interval);
        return [
          ...prevEnemies,
          {
            id: uuid(),
            type: LEVEL_1.types[0],
            t: target.model.t + (startSide === "left" ? -5 : 5),
            target,
            startSide,
          },
        ];
      });
    }, LEVEL_1.everyMSTime);
    return () => clearInterval(interval);
  }, [getFungusTarget, setEnemies]);

  const updateTargetEnemies = () => {
    setEnemies((prevEnemies: Enemy[]) => {
      console.log({ prevEnemies }, prevEnemies.length);
      // if (prevEnemies.length >= 6) clearInterval(interval);
      return [
        ...prevEnemies.map((el: Enemy) => {
          const target = getFungusTarget(el.startSide);
          return {
            ...el,
            target,
          };
        }),
      ];
    });
  };

  const removeFungus = (fungus: TreeModel.Node<ColonyPoint>, enemy: Enemy) => {
    console.log({ fungus, enemy });
    let fungusTarget = null;
    rootNode.all().forEach((node) => {
      if (node.model.id === fungus.model.id) {
        console.log({ node });

        node.drop();
      }
      console.log(node.model.id);
    });

    // if (fungusTarget.model.id === rootNode.model.id) {
    //   console.log({ rootNode });
    // }
    setTreeRerenderKey((o) => o + 1);
    setEnemies((prevEnemies) =>
      prevEnemies.filter((el: Enemy) => el.id !== enemy.id)
    );
  };

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
      traits,
      addTraitPoints,
      spendTraitPoints,
      canSpendTraitsPoints,
      revertTrait,
      totalColonies,
      enemies,
      removeFungus,
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
      traits,
      addTraitPoints,
      spendTraitPoints,
      canSpendTraitsPoints,
      revertTrait,
      totalColonies,
      enemies,
      removeFungus,
    ]
  );

  return (
    <GameStoreContext.Provider value={contextValue}>
      {props.children}
    </GameStoreContext.Provider>
  );
}
