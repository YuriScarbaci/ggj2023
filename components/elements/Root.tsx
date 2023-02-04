import React from "react";

interface IRootProps {
  arcs: string[];
}

export function Root(props: IRootProps) {
  return (
    <g>
      {props.arcs?.map((arc, i) => (
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
