import * as React from "react";
import { useEvents } from "./Events";
import { IFungus, IGameStoreContext, IRoot } from "./types";
import { v4 as uuid } from "uuid";

export const GameStoreContext = React.createContext<IGameStoreContext>({});

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
  const [roots, setRoots] = React.useState<IRoot[]>([]);
  const [selectedFungusId, setSelectedFungisId] = React.useState<string>(
    fungi[0].id
  );

  const selectedFungus = React.useMemo(() => {
    return fungi.find((row) => row.id === selectedFungusId);
  }, [fungi, selectedFungusId]);

  const contextValue = React.useMemo(
    () => ({
      fungi,
      roots,
      selectedFungus,
    }),
    [fungi, roots, selectedFungus]
  );

  return (
    <GameStoreContext.Provider value={contextValue}>
      {props.children}
    </GameStoreContext.Provider>
  );
}
