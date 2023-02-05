import * as React from "react";
import { v4 as uuid } from "uuid";
import { AnchorPoint, ColonyPoint, TerritoryType } from "@/store/types";
import TreeModel from "tree-model";

export const useShroomsTree = (config) => {
  const [treeRerenderKey, setTreeRerenderKey] = React.useState(0);
  const fungiTree = React.useMemo(() => new TreeModel(), []);
  const [rootNode, setRootNode] = React.useState(
    fungiTree.parse<ColonyPoint>({
      id: uuid(),
      t: 0,
      x: 0,
      y: 0,
      territoryType: "colonyPoint" as TerritoryType,
      fungusType: "colony",
      rootPoints: 10,
      hitPoints: 5,
      children: [],
    })
  );

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
      if (parentMinusCost < 0) {
        return null;
      }
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
      config.setTotalColonies((o: number) => o + 1);
      setTreeRerenderKey((o) => o + 1);
      if (anchorPoint.territoryType === "colonyPoint") config.addTraitPoints(1);
    },
    [fungiTree, config]
  );
  return { addRoot, treeRerenderKey, setTreeRerenderKey, fungiTree, rootNode };
};
