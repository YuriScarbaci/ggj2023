import * as React from "react";
import { traitsType } from "../types";

export const useTraitPoints = () => {
  const [traitPoints, setTraitPoints] = React.useState(1);
  const [traits, setTraits ] = React.useState<traitsType>({ poison: 0 , psyco: 0, hp: 0});
  
  const addTraitPoints = React.useCallback((n = 1) => {
    setTraitPoints((o) => o + n);
  }, []);
  const spendTraitPoints = React.useCallback((n = 1, name: keyof typeof traits = "poison" ) => {
    setTraitPoints((o) => o - n);

    setTraits( (t) => ({ ...t ,[name]: t[name] + n}));
  }, []);

  const canSpendTraitsPoints = React.useCallback(
    (n = 1) => {
      return traitPoints >= n;
    },
    [traitPoints]
  );

  const revertTrait = React.useCallback(
    (n = 1, name: keyof typeof traits = "poison") => {
      if (traits[name] > 0){
        setTraits( (t) => ({ ...t,[name]: t[name] - n }));
        setTraitPoints((o) => o + n);
      }
    },
    [traits]
  );

  return {
    traitPoints,
    traits,
    addTraitPoints,
    spendTraitPoints,
    canSpendTraitsPoints,
    revertTrait,
  };
};
