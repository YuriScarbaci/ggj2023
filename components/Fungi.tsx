import { useGame } from "@/store";
import { Fungus } from "./elements/Fungus";

export function Fungi() {
  // const { fungi } = useGame();
  const fungi = [];
  
  return (
    <g>
      {fungi.map((fungus) => (
        <Fungus key={fungus.id} fungus={fungus} />
      ))}
    </g>
  );
}
