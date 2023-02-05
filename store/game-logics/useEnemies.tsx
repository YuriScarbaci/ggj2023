import React from "react";
import TreeModel from "tree-model";
import { v4 as uuid } from "uuid";
import { ColonyPoint, Enemy, LevelType } from "@/store/types";

export const START_SIDES = ["left", "right"] as const;
type EnemyConfig = {
  currentLevel: LevelType;
  getFungusTarget: Function;
  removeFungus: Function;
  updateFungus: Function;
};
export const useEnemies = ({
  currentLevel,
  removeFungus,
  getFungusTarget,
  updateFungus,
}: EnemyConfig) => {
  const [enemies, setEnemies] = React.useState<Enemy[]>([]);
  const enemiesCount = React.useRef(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      const startSide = START_SIDES[Math.floor(Math.random() * 2)];
      const target = getFungusTarget(startSide);
      setEnemies((prevEnemies: Enemy[]) => {
        if (enemiesCount.current >= currentLevel.numberOfEnemies) {
          clearInterval(interval);
          return prevEnemies;
        }
        enemiesCount.current += 1;
        const newEnemy: Enemy = {
          id: uuid(),
          points: 5,
          type: currentLevel.types[0],
          t: target.model.t + (startSide === "left" ? -5 : 5),
          target,
          startSide,
        };
        return [...prevEnemies, newEnemy];
      });
    }, currentLevel.everyMSTime);
    return () => clearInterval(interval);
  }, [currentLevel, getFungusTarget, setEnemies]);

  const attackFungus = (
    fungus: TreeModel.Node<ColonyPoint>,
    enemy: Enemy,
    interval: any
  ) => {
    switch (fungus.model.fungusType) {
      case "poison":
        setEnemies((prevEnemies) =>
          prevEnemies.filter((el: Enemy) => el.id !== enemy.id)
        );
        removeFungus(fungus);
        break;
      default:
        if (fungus.model.rootPoints > 0) {
          updateFungus(fungus);
        } else {
          removeFungus(fungus);
          clearInterval(interval);
        }
        break;
    }
  };

  return {
    attackFungus,
    getFungusTarget,
    enemies,
  };
};
