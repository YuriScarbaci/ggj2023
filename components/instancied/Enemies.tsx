import React from "react";
import { randomArc } from "@/settings";
import { ColonyPoint } from "@/store/types";
import { useGame } from "@/store";
import { Fungus } from "@/components/elements/Fungus";
import { Ant } from "@/components/elements/Ant";
import type TreeModel from "tree-model";

export const Enemies = () => {
  const { enemies } = useGame();
  return (
    <g key={"enemies"}>
      {enemies.map((enemy, i) => {
        if (enemy.type === 'ant') {
          return <Ant key={`ant-${enemy.id}`} ant={enemy} />
        }
        return <Ant key={`ant-${enemy.id}`} ant={enemy} />
      })}
    </g>
  );
};

export default Enemies;
