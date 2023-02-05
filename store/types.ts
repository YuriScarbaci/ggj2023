import type TreeModel from "tree-model";
import type { useEnemies } from "@/store/game-logics/useEnemies";

export type TerritoryType =
  | "resource"
  | "colonyPoint"
  | "desert"
  | "enemySpawnPoint";

export type AnchorPoint = {
  t: number;
  id: string;
  x: number;
  y: number;
  territoryType: TerritoryType;
};

export type ColonyPoint = {
  fungusType: "poison" | "resource" | "colony";
  rootPoints: number;
  hitPoints: number;
  children: ColonyPoint[];
} & AnchorPoint;

export type Enemy = {
  id: string;
  t: number;
  points: number;
  target: any;
  startSide: string;
  type: "Ant" | "moreToCome";
};

export interface Ant extends Enemy {
  type: "Ant";
}

export type IGameStoreContext = {
  treeRerenderKey: number;
  fungiTree?: TreeModel;
  rootNode: TreeModel.Node<ColonyPoint>;
  selectedFungus?: TreeModel.Node<ColonyPoint>;
  enemies: Enemy[];
  removeFungus: ReturnType<typeof useEnemies>["removeFungus"];
  anchorPoints: AnchorPoint[];
  traitPoints: number;
  totalColonies: number;
  addRoot: ({}: {
    anchorPoint: AnchorPoint;
    parentNode: TreeModel.Node<ColonyPoint>;
  }) => void;
  setSelectedFungus: React.Dispatch<
    React.SetStateAction<TreeModel.Node<ColonyPoint>>
  >;
};

export type LevelType = {
  numberOfEnemies: number;
  types: Enemy["type"][];
  everyMSTime: number;
};
