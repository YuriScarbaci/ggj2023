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

export type IGameStoreContext = {
  fungi: IFungus[];
  roots: IRoot[];

  selectedFungus: IFungus;
};
