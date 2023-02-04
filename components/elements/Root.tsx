import { randomArc, tToPixel } from "@/settings";
import { IRoot } from "@/store/types";
import React from "react";

interface IRootProps {
  root: IRoot;
}

export function Root(props: IRootProps) {
  const arcs = React.useMemo(() => {
    return new Array(5)
      .fill(0)
      .map((_) => randomArc(props.root.fromT, props.root.toT));
  }, [props.root]);

  return (
    <g>
      {arcs.map((arc, i) => (
        <path
          key={i}
          d={arc}
          fill="none"
          stroke="yellow"
          style={{ pointerEvents: "none" }}
        />
      ))}
    </g>
  );
}
