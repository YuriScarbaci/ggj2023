import type TreeModel from "tree-model";

export interface IFungus {
  id: string;
  t: number;
  points: number;
}

export interface IRoot {
  fromT: number;
  toT: number;
  length: number;
}

export type AnchorPoint = {
  t: number;
  id: string;
  x: number;
  y: number;
  territoryType: "resource" | "colonyPoint" | "desert" | "enemySpawnPoint";
};

export type ColonyPoint = {
  fungusType: "poison" | "psycho" | "colony";
  rootPoints: number;
  hitPoints: number;
  children: ColonyPoint[];
} & AnchorPoint;

export type IGameStoreContext = {
  rootNode: TreeModel.Node<ColonyPoint>;
  fungiTree?: TreeModel;
  selectedFungus?: TreeModel.Node<ColonyPoint>;
  anchorPoints: AnchorPoint[];
  addRoot: ({}: {
    anchorPoint: AnchorPoint;
    parentNode: TreeModel.Node<ColonyPoint>;
  }) => void;
  setSelectedFungus: React.Dispatch<React.SetStateAction<TreeModel.Node<ColonyPoint>>>;
};