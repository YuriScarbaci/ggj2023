import * as React from "react";
import { useEvents } from "./Events";
import { IGameStoreContext } from "./types";
import { v4 as uuid } from "uuid";
import { tToPixel, T_WORLD_RADIUS } from "@/settings";
import { AnchorPoint, ColonyPoint, TerritoryType } from "@/store/types";
import TreeModel from "tree-model";

export const GameStoreContext = React.createContext<IGameStoreContext>(
  {} as IGameStoreContext
);

const rootAnchorPointUid = uuid();
export function useGame() {
  return React.useContext(GameStoreContext);
}

export function GameStore(props: React.PropsWithChildren<{}>) {
  const [treeRerenderKey, setTreeRerenderKey] = React.useState(0);
  const [traitPoints, setTraitPoints] = React.useState(1);
  const [totalRootPoints, setTotalRootPoints] = React.useState(1);
  const [totalColonies, setTotalColonies] = React.useState(1);

  const fungiTree = React.useMemo(() => new TreeModel(), []);

  const rootNode = React.useMemo(
    () =>
      fungiTree.parse<ColonyPoint>({
        id: rootAnchorPointUid,
        t: 0,
        x: 0,
        y: 0,
        territoryType: "colonyPoint" as TerritoryType,
        fungusType: "colony",
        rootPoints: 10,
        hitPoints: 5,
        children: [],
      }),
    [fungiTree]
  );

  const { triggerEvent, subscribeEvent, unsubscribeEvent } = useEvents();

  const [selectedFungus, setSelectedFungus] =
    React.useState<TreeModel.Node<ColonyPoint>>(rootNode);

  const addRoot = React.useCallback(
    ({
      anchorPoint,
      parentNode,
    }: {
      anchorPoint: AnchorPoint;
      parentNode: TreeModel.Node<ColonyPoint>;
    }) => {
      const [t1, t2] = [parentNode.model.t, anchorPoint.t].sort();
      const expandCost = t2 - t1;
      const parentMinusCost = parentNode.model.rootPoints - expandCost;
      const newRootPoints = Math.floor(parentMinusCost / 2);
      const parentMinusCostMinusShare = parentMinusCost - newRootPoints;
      const newNode = fungiTree.parse({
        ...anchorPoint,
        fungusType: "colony",
        rootPoints: newRootPoints,
        hitPoints: 5,
      });
      parentNode.addChild(newNode);
      parentNode.model.rootPoints = parentMinusCostMinusShare;
      setTotalColonies(totalColonies + 1);
      setTreeRerenderKey((o) => o + 1);
    },
    [fungiTree, totalColonies]
  );

  const anchorPoints = React.useMemo(() => {
    const tentativePoints = new Array(T_WORLD_RADIUS).fill(0).map((_, i) => ({
      t: i - T_WORLD_RADIUS / 2,
      id: i === 0 ? rootAnchorPointUid : uuid(),
      x: tToPixel(i - T_WORLD_RADIUS / 2),
      y: 0,
      territoryType: (i % 3 === 0
        ? "colonyPoint"
        : i % 2 === 0
        ? "desert"
        : "resource") as TerritoryType,
    }));
    return tentativePoints;

    // rangos de nodos del mismo "type" resource, que entonces tenene que mostrar solo un rect conjunto
    // return tentativePoints.filter(
    //   (p) => !elements.find((e) => e.t <= p.t && e.t + e.amount >= p.t)
    // );
  }, []);

  // score generator
  const MINUTE_MS = 6000;
  React.useEffect(() => {
    const interval = setInterval(() => {
      const resourcesNodes = rootNode.all((node) => {
        return node.model.territoryType === "resource";
      });
      if (resourcesNodes.length) {
        resourcesNodes.forEach((node) => {
          node.model.rootPoints += 1;
        });
      }
      const allRootPoints = rootNode.all((node) => {
        return node.model.rootPoints;
      });
      // we must solve the type of node here
      const getallRootPoints = (
        allRootPoints: TreeModel.Node<ColonyPoint>[]
      ) => {
        let rootPointCount = 0;
        allRootPoints.forEach((node) => {
          rootPointCount += node.model.rootPoints;
        });
        return rootPointCount;
      };
      setTotalRootPoints(getallRootPoints(allRootPoints));
      setTraitPoints(traitPoints + 1);
      setTreeRerenderKey((o) => o + 1);
    }, MINUTE_MS);

    return () => clearInterval(interval);
  }, [rootNode, traitPoints]);

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
      totalRootPoints,
      totalColonies,
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
      totalRootPoints,
      totalColonies,
    ]
  );

  return (
    <GameStoreContext.Provider value={contextValue}>
      {props.children}
    </GameStoreContext.Provider>
  );
}
