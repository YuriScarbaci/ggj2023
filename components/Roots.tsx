import { randomArc, tToPixel, T_UNIT, T_WORLD_RADIUS } from "@/settings";
import { useGame } from "@/store";
import { IRoot } from "@/store/types";
import React from "react";
import { Root } from "./elements/Root";
import { useGameCanvas } from "./GameCanvas";

export function Roots() {
  const { fungiTree } = useGame();

  const roots = [];

  console.log(fungiTree, fungiTree.flatMap());

  return (
    <g>
      {roots.map((root, i) => (
        <Root key={i} root={root} />
      ))}
    </g>
  );
}