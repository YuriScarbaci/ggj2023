import * as React from "react";

export const useTraitPoints = () => {
  const [traitPoints, setTraitPoints] = React.useState(1);

  const addTraitPoints = React.useCallback((n = 1) => {
    setTraitPoints((o) => o + n);
  }, []);
  const spendTraitPoints = React.useCallback((n = 1) => {
    setTraitPoints((o) => o - n);
  }, []);
  const canSpendTraitsPoints = React.useCallback(
    (n = 1) => {
      return traitPoints > n;
    },
    [traitPoints]
  );
  return {
    traitPoints,
    addTraitPoints,
    spendTraitPoints,
    canSpendTraitsPoints,
  };
};
