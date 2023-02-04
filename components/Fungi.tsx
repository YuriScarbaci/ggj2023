import { useGame } from "@/store";
import { IFungus } from "@/store/types";
import { Fungus } from "./Fungus";

export function Fungi() {
  const { fungi } = useGame();

  return (
    <g>
      {fungi.map((fungus) => (
        <Fungus key={fungus.id} fungus={fungus} />
      ))}
    </g>
  );
}
