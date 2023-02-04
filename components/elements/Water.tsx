import { tToPixel } from "@/settings";
import { IWater } from "@/store/types";

interface IWaterProps {
  water: IWater;
}

export function Water(props: IWaterProps) {
  return (
    <g>
      <rect
        x={tToPixel(props.water.t)}
        y={0}
        width={tToPixel(props.water.amount)}
        height={30}
        fill="blue"
      />
    </g>
  );
}
