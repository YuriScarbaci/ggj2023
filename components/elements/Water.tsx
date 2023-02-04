import { tToPixel } from "@/settings";
import { IWater } from "@/store/types";
import { SVGAttributes } from "react";

interface IWaterProps extends SVGAttributes<SVGRectElement> {
  water: IWater;
}

export function Water(props: IWaterProps) {
  return (
    <g>
      <rect
        data-t={props.water.t + props.water.amount / 2}
        x={tToPixel(props.water.t)}
        y={0}
        width={tToPixel(props.water.amount)}
        height={30}
        fill="blue"
        {...props}
      />
    </g>
  );
}
