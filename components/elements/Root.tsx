import React from "react";

interface RootProps {
  arcs: string[];
}

export function Root(props: RootProps) {
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
