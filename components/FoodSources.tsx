import { useGame } from "@/store";
import { Fungus } from "./elements/Fungus";
import { Water } from "./elements/Water";

export function FoodSources() {
  const { elements } = useGame();

  return (
    <g>
      {elements.map((element) => {
        if (element.type === "water")
          return <Water key={element.id} water={element} />;
        return null;
      })}
    </g>
  );
}
