export const T_UNIT = 50;
export const T_WORLD_RADIUS = 100;

export function tToPixel(t: number) {
  return t * T_UNIT;
}

export function pixelToT(px: number) {
  return Math.round(px / T_UNIT);
}
