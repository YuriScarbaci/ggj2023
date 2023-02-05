import { tToPixel } from "@/settings";
import { useGame } from "@/store";
import { Ant } from "@/store/types";
import React, { useEffect, useState } from "react";

interface AntProps {
  ant: Ant;
}

export function Ant({ ant }: AntProps) {
  const { attackFungus, rootNode, getFungusTarget, targets } = useGame();
  const [t, setT] = useState<number>(ant.t);

  useEffect(() => {
    const interval = setInterval(() => {
      setT((prevT) => {
        const targetBySide = targets[ant.startSide];
        if (targetBySide) {
          if (
            (ant.startSide === "left" && prevT < targetBySide.model.t) ||
            (ant.startSide === "right" && prevT > targetBySide.model.t)
          ) {
            return prevT + (ant.startSide === "left" ? 1 : -1);
          }
          attackFungus(targetBySide, ant, interval);
          clearInterval(interval);
        }
        return prevT;
      });
    }, 1200);
    return () => clearInterval(interval);
  }, [ant, getFungusTarget, attackFungus, targets, rootNode]);

  return (
    <g>
      <image
        href={`./ant-walk-${ant.startSide}.gif`}
        x={tToPixel(t) + (ant.startSide === "left" ? -50 : 0)}
        y={-35}
        width="50px"
        height="50px"
      />
    </g>
  );
}
