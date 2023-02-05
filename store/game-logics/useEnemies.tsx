import React from "react";
import TreeModel from "tree-model";
import { v4 as uuid } from "uuid";
import { ColonyPoint, Enemy, LevelType } from "@/store/types";

export const START_SIDES = ["left", "right"];
type EnemyConfig = {
  rootNode: TreeModel.Node<ColonyPoint>;
  currentLevel: LevelType;
  setTreeRerenderKey: Function;
};
export const useEnemies = ({
  rootNode,
  currentLevel,
  setTreeRerenderKey,
}: EnemyConfig) => {
  const [enemies, setEnemies] = React.useState<Enemy[]>([]);
  const enemiesCount = React.useRef(0);

  const getFungusTarget = React.useMemo(
    () =>
      (startSide = "left") => {
        let target: TreeModel.Node<ColonyPoint> = rootNode;
        rootNode.walk((node: TreeModel.Node<ColonyPoint>) => {
          if (
            (startSide === "left" && node.model.t <= target.model.t) ||
            (startSide === "right" && node.model.t >= target.model.t)
          ) {
            target = node;
          }
          return true;
        });
        return target;
      },
    [rootNode]
  );

  React.useEffect(() => {
    const interval = setInterval(() => {
      const startSide = START_SIDES[Math.floor(Math.random() * 2)];
      const target = getFungusTarget(startSide);
      setEnemies((prevEnemies: Enemy[]) => {
        console.log(
          { prevEnemies },
          enemiesCount,
          currentLevel.numberOfEnemies
        );
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
  }, [
    currentLevel.everyMSTime,
    currentLevel.numberOfEnemies,
    currentLevel.types,
    getFungusTarget,
    setEnemies,
  ]);

  const updateTargetEnemies = () => {
    setEnemies((prevEnemies: Enemy[]) => {
      console.log({ prevEnemies }, prevEnemies.length);
      return [
        ...prevEnemies.map((el: Enemy) => {
          const target = getFungusTarget(el.startSide);
          return {
            ...el,
            target,
          };
        }),
      ];
    });
  };

  const removeFungus = (fungus: TreeModel.Node<ColonyPoint>, enemy: Enemy) => {
    console.log({ fungus, enemy });
    rootNode
      .all(() => true)
      .forEach((node: TreeModel.Node<ColonyPoint>) => {
        if (node.model.id === fungus.model.id) {
          node.drop();
        }
      });

    setEnemies((prevEnemies) =>
      prevEnemies.filter((el: Enemy) => el.id !== enemy.id)
    );

    setTreeRerenderKey((o: number) => o + 1);
  };

  return {
    updateTargetEnemies,
    removeFungus,
    enemies,
  };
};
