import * as React from "react";
import { useEvents } from "./Events";
import { IElement, IFungus, IGameStoreContext, IRoot } from "./types";
import { v4 as uuid } from "uuid";
import { tToPixel, T_WORLD_RADIUS } from "@/settings";

export const GameStoreContext = React.createContext<IGameStoreContext>({
  elements: [],
  fungi: [],
  roots: [],
  anchorPoints: [],
  addRoot: () => {},
  changeSelectedfungus: () => {},
});

export function useGame() {
  return React.useContext(GameStoreContext);
}

export function GameStore(props: React.PropsWithChildren<{}>) {
  const { triggerEvent, subscribeEvent, unsubscribeEvent } = useEvents();

  const [fungi, setFungi] = React.useState<IFungus[]>([
    {
      id: uuid(),
      points: 1,
      t: 0,
    },
  ]);
  const [elements, setElements] = React.useState<IElement[]>([
    {
      id: uuid(),
      t: -10,
      amount: 5,
      type: "water",
    },
  ]);
  const [roots, setRoots] = React.useState<IRoot[]>([]);
  const [selectedFungusId, setSelectedFungisId] = React.useState<string | null>(
    fungi[0].id
  );

  const anchorPoints = React.useMemo(() => {
    const tentativePoints = new Array(T_WORLD_RADIUS).fill(0).map((_, i) => ({
      t: i - T_WORLD_RADIUS / 2,
    }));

    return tentativePoints.filter(
      (p) => !elements.find((e) => e.t <= p.t && e.t + e.amount >= p.t)
    );
  }, [elements]);

  const selectedFungus = React.useMemo(() => {
    return fungi.find((row) => row.id === selectedFungusId);
  }, [fungi, selectedFungusId]);

  const addRoot = React.useCallback(
    (fromT: number, toT: number, element?: IElement) => {
      setRoots((roots) => {
        return [
          ...roots,
          {
            fromT,
            toT,
            length: Math.abs(fromT - toT),
          },
        ];
      });

      if (!element) {
        setFungi((fungi) => {
          return [
            ...fungi,
            {
              id: uuid(),
              points: 1,
              t: toT,
            },
          ];
        });
      }
    },
    []
  );

  const changeSelectedFungus = React.useCallback(
    (fungusId: string) => {
      setSelectedFungisId(fungi.find((row) => row.id === fungusId)?.id || null);
    },
    [fungi]
  );

  const contextValue = React.useMemo(
    () => ({
      fungi,
      roots,
      selectedFungus,
      elements,
      anchorPoints,
      addRoot,
      changeSelectedFungus,
    }),
    [
      fungi,
      roots,
      selectedFungus,
      elements,
      anchorPoints,
      addRoot,
      changeSelectedFungus,
    ]
  );

  return (
    <GameStoreContext.Provider value={contextValue}>
      {props.children}
    </GameStoreContext.Provider>
  );
}
