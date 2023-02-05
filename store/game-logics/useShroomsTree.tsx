import * as React from "react";
import { v4 as uuid } from "uuid";
import { AnchorPoint, ColonyPoint, TerritoryType } from "@/store/types";
import { useTraitPoints } from "@/store/game-logics/useTraitPoints";
import TreeModel from "tree-model";

type Config = {
  setTotalColonies: React.Dispatch<React.SetStateAction<number>>;
  addTraitPoints: ReturnType<typeof useTraitPoints>["addTraitPoints"];
};

const canTheRootExpand = ({
  anchorPoint,
  parentNode,
  expandCost,
}: {
  anchorPoint: AnchorPoint;
  parentNode: TreeModel.Node<ColonyPoint>;
  expandCost: number;
}) => {
  if (anchorPoint.territoryType === "desert") return false;
  const parentMinusCost = parentNode.model.rootPoints - expandCost;
  if (parentMinusCost < 0) {
    return false;
  }

  return true;
};
const handleScores = ({
  anchorPoint,
  addTraitPoints,
  setTotalColonies,
}: {
  anchorPoint: AnchorPoint;
  addTraitPoints: Config["addTraitPoints"];
  setTotalColonies: Config["setTotalColonies"];
}) => {
  setTotalColonies((o: number) => o + 1);
  if (anchorPoint.territoryType === "colonyPoint") addTraitPoints(1);
};
const handleNodesRootPointsAndChildren = ({
  anchorPoint,
  parentNode,
  expandCost,
  fungiTree,
}: {
  anchorPoint: AnchorPoint;
  parentNode: TreeModel.Node<ColonyPoint>;
  expandCost: number;
  fungiTree: TreeModel;
}) => {
  const parentMinusCost = parentNode.model.rootPoints - expandCost;
  const newRootPoints = Math.floor(parentMinusCost / 2);
  const parentMinusCostMinusShare = parentMinusCost - newRootPoints;
  const newNode = fungiTree.parse({
    ...anchorPoint,
    fungusType: "colony",
    rootPoints: newRootPoints,
    hitPoints: 5,
  });
  parentNode.model.rootPoints = parentMinusCostMinusShare;
  parentNode.addChild(newNode);
};

export const useShroomsTree = (config: Config) => {
  const { setTotalColonies, addTraitPoints } = config;
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

      if (canTheRootExpand({ expandCost, anchorPoint, parentNode }) === false)
        return null;

      handleNodesRootPointsAndChildren({
        anchorPoint,
        parentNode,
        expandCost,
        fungiTree,
      });
      handleScores({ anchorPoint, setTotalColonies, addTraitPoints });
      setTreeRerenderKey((o) => o + 1);
    },
    [fungiTree, setTotalColonies, addTraitPoints]
  );
  return { addRoot, treeRerenderKey, setTreeRerenderKey, fungiTree, rootNode };
};
