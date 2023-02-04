export const T_UNIT = 50;
export const T_WORLD_RADIUS = 100;

export function tToPixel(t: number) {
  return t * T_UNIT;
}

export function pixelToT(px: number) {
  return Math.round(px / T_UNIT);
}

export function randomArc(t1: number, t2: number) {
  const x1 = tToPixel(t1);
  const x2 = tToPixel(t2);

  let cx = x1 + (x2 - x1) / 2;
  let cy = 0 + ((Math.random() * 0.6 + 0.3) * Math.abs(x2 - x1)) / 2;
  return `M ${x1} ${0} Q ${cx} ${cy} ${x2} ${0}`;
}
