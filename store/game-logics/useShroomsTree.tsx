import * as React from "react";
import { v4 as uuid } from "uuid";
import { AnchorPoint, ColonyPoint, TerritoryType } from "@/store/types";
import { useTraitPoints } from "@/store/game-logics/useTraitPoints";
import TreeModel from "tree-model";

type Config = {
  selectedTypeOfFungusSelector: "poison" | "colony";
  setTotalColonies: React.Dispatch<React.SetStateAction<number>>;
  addTraitPoints: ReturnType<typeof useTraitPoints>["addTraitPoints"];
  setTargets: Function;
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
  selectedTypeOfFungusSelector,
  anchorPoint,
  parentNode,
  expandCost,
  fungiTree,
}: {
  selectedTypeOfFungusSelector: "poison" | "colony";
  anchorPoint: AnchorPoint;
  parentNode: TreeModel.Node<ColonyPoint>;
  expandCost: number;
  fungiTree: TreeModel;
}) => {
  const parentMinusCost = parentNode.model.rootPoints - expandCost;
  const newRootPoints = Math.floor(parentMinusCost / 2);
  const newPointType =
    anchorPoint.territoryType === "colonyPoint"
      ? selectedTypeOfFungusSelector === "colony"
        ? "colony"
        : "poison"
      : "resource";
  const parentMinusCostMinusShare =
    newPointType === "colony"
      ? parentMinusCost - newRootPoints
      : parentMinusCost;
  const newNode = fungiTree.parse({
    ...anchorPoint,
    fungusType: newPointType,
    rootPoints: newPointType === "colony" ? newRootPoints : 0,
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

  React.useEffect(() => {
    config.setTargets({ left: rootNode, right: rootNode });
  }, []) // eslint-disable-line

  const getFungusTarget = React.useMemo(
    () =>
      (startSide = "left") => {
        let target: TreeModel.Node<ColonyPoint> = rootNode;
        rootNode.walk((node: TreeModel.Node<ColonyPoint>) => {
          if (
            (startSide === "left" && node.model.t <= target.model.t) ||
            (startSide === "right" && node.model.t >= target.model.t)
          ) {
            target = node;
          }
          return true;
        });
        return target;
      },
    [rootNode]
  );

  const updateFungusTargets = React.useCallback(() => {
    const left = getFungusTarget('left');
    const right = getFungusTarget('right');

    config.setTargets({ left, right });
  }, [config, getFungusTarget]);

  const addRoot = React.useCallback(
    ({
      selectedTypeOfFungusSelector,
      anchorPoint,
      parentNode,
    }: {
      selectedTypeOfFungusSelector: "poison" | "colony";
      anchorPoint: AnchorPoint;
      parentNode: TreeModel.Node<ColonyPoint>;
    }) => {
      const [t1, t2] = [parentNode.model.t, anchorPoint.t].sort();
      const expandCost = t2 - t1;

      if (canTheRootExpand({ expandCost, anchorPoint, parentNode }) === false)
        return null;

      handleNodesRootPointsAndChildren({
        selectedTypeOfFungusSelector,
        anchorPoint,
        parentNode,
        expandCost,
        fungiTree,
      });
      updateFungusTargets();
      handleScores({ anchorPoint, setTotalColonies, addTraitPoints });
      setTreeRerenderKey((o) => o + 1);
    },
    [fungiTree, updateFungusTargets, setTotalColonies, addTraitPoints]
  );

  const updateFungus = React.useCallback((fungus: TreeModel.Node<ColonyPoint>) => {
    fungus.model.rootPoints -= 1;
    setTreeRerenderKey((o: number) => o + 1);
  }, []);
  const removeFungus = React.useCallback((fungus: TreeModel.Node<ColonyPoint>) => {
    rootNode
      .all((node: TreeModel.Node<ColonyPoint>) => node.model.id === fungus.model.id)
      .forEach((node: TreeModel.Node<ColonyPoint>) => {
        node.drop();
      });

    updateFungusTargets();

    setTreeRerenderKey((o: number) => o + 1);
  }, [rootNode, updateFungusTargets]);

  return { addRoot, treeRerenderKey, setTreeRerenderKey, fungiTree, rootNode, getFungusTarget, removeFungus, updateFungus };
};
