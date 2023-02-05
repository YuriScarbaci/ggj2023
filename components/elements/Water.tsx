import { tToPixel } from "@/settings";
import { AnchorPoint } from "@/store/types";
import { SVGAttributes } from "react";

interface IWaterProps extends SVGAttributes<SVGRectElement> {
  water: AnchorPoint;
}

export function Water(props: IWaterProps) {
  const amount = 1;
  return (
    <g>
      <rect
        data-t={props.water.t + amount/2}
        x={tToPixel(props.water.t)}
        y={0}
        width={tToPixel(amount)}
        height={30}
        fill="blue"
        {...props}
      />
    </g>
  );
}
