import { tToPixel } from "@/settings";
import { useGame } from "@/store";
import { Ant } from "@/store/types";
import React, { useEffect, useState } from "react";

interface AntProps {
  ant: Ant;
}

export function Ant({ ant }: AntProps) {
  const { removeFungus } = useGame();
  const [t, setT] = useState<number>(ant.t);

  useEffect(() => {
    const interval = setInterval(() => {
      setT((prevT) => {
        if((ant.startSide === 'left' && prevT < ant?.target.model.t) || (ant.startSide === 'right' && prevT > ant?.target.model.t)) {
          return prevT + (ant.startSide === 'left' ? 1 : -1)
        }
        clearInterval(interval)
        removeFungus(ant.target, ant);
        return prevT;
      })
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  return (
    <g>
      <image
        href={`./ant-walk-${ant.startSide}.gif`}
        x={tToPixel(t) + (ant.startSide === 'left' ? -50 : 0)}
        y={-35}
        width="50px"
        height="50px"
      />
    </g>
  );
}
