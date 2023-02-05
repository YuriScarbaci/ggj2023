import type TreeModel from "tree-model";

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
  fungusType: "poison" | "psycho" | "colony";
  rootPoints: number;
  hitPoints: number;
  children: ColonyPoint[];
} & AnchorPoint;

export type Ant = {
  id: string;
  t: number;
  points: number;
  target: any;
  startSide: string;
}

export type Enemy = {
  type: string;
} & Ant;

export type IGameStoreContext = {
  treeRerenderKey: number;
  fungiTree?: TreeModel;
  rootNode: TreeModel.Node<ColonyPoint>;
  selectedFungus?: TreeModel.Node<ColonyPoint>;
  enemies?:  TreeModel.Node<Enemy>;
  removeFungus?: () => void;
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
