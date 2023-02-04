import { IFungus } from "@/store/types";

interface IFungusProps {
  fungus: IFungus;
}

export function Fungus(props: IFungusProps) {
  return (
    <g>
      <circle cx={props.fungus.t} cy={0} r={20} fill="yellow" />
    </g>
  );
}
