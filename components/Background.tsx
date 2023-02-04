import { useGameCanvas } from "./GameCanvas";

export function Background() {
  const size = useGameCanvas();
  return (
    <g>
      <rect width={size.width} height={size.height} fill="red" />
    </g>
  );
}
