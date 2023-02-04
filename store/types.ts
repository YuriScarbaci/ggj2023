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

export interface IBaseElement {
  id: string;
  t: number;
}

export interface IWater extends IBaseElement {
  amount: number;
  type: "water";
}
export interface IFood extends IBaseElement {
  amount: number;
  type: "food";
}

export type IElement = IWater | IFood;

export interface IAnchorPoint {
  t: number;
}

export type IGameStoreContext = {
  fungi: IFungus[];
  roots: IRoot[];
  elements: IElement[];
  anchorPoints: IAnchorPoint[];

  selectedFungus?: IFungus;
};
