import React from "react";
import { randomArc } from "@/settings";
import { ColonyPoint } from "@/store/types";
import { useGame } from "@/store";
import { Fungus } from "@/components/elements/Fungus";
import { Root } from "@/components/elements/Root";
import type TreeModel from "tree-model";

export const FungiColonies = () => {
  const { rootNode, treeRerenderKey } = useGame();
  const fungi: TreeModel.Node<ColonyPoint>[] = [];
  const roots: string[][] = [[]];
  rootNode.walk((node) => {
    fungi.push(node);
    node.children.forEach((childNode: TreeModel.Node<ColonyPoint>) => {
      const rootsArcs: string[] = new Array(5)
        .fill(0)
        .map((_) => randomArc(node.model.t, childNode.model.t));
      roots.push(rootsArcs);
    });

    return true;
  });
  return (
    <g key={treeRerenderKey}>
      <g>
        {roots.map((root, i) => (
          <Root key={`roots-${i}`} arcs={root} />
        ))}
      </g>
      <g>
        {fungi.map((fungus, i) => (
          <Fungus key={`fungus-${fungus.model.id}`} fungus={fungus} />
        ))}
      </g>
    </g>
  );
};

export default FungiColonies;
