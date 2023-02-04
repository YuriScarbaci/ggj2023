export interface IFungus {
  id: string;
  t: number;
  points: number;
}

export interface IRoot {
  from: string;
  to: string;
  length: number;
}

export type IGameStoreContext = {
  fungi: IFungus[];
  roots: IRoot[];

  selectedFungus: IFungus;
};
