import React from "react";
import { useGame } from "@/store";
import { Enemy, Ant as AntT } from "@/store/types";
import { Ant } from "@/components/elements/Ant";

const isAnt = (enemy: Enemy): enemy is AntT => {
  return enemy.type === "Ant";
};

export const Enemies = () => {
  const { enemies } = useGame();
  return (
    <g key={"enemies"}>
      {enemies.map((enemy, i) => {
        if (isAnt(enemy)) {
          return <Ant key={`ant-${enemy.id}`} ant={enemy} />;
        }
        return null;
      })}
    </g>
  );
};

export default Enemies;
