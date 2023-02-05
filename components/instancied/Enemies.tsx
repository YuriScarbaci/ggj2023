import React from "react";
import { useGame } from "@/store";
import { Ant } from "@/components/elements/Ant";

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
