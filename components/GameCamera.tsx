import React from "react";
import { useGameCanvas } from "./GameCanvas";

type IGameCameraContext = {
  translation: number;
};

const GameCameraContext = React.createContext<IGameCameraContext>({
  translation: 0,
});

export function useGameCamera() {
  return React.useContext(GameCameraContext);
}

export function GameCamera(props: React.PropsWithChildren<{}>) {
  const size = useGameCanvas();

  const [translation, setTranslation] = React.useState(0);

  React.useEffect(() => {
    const handleMouseDown = () => {};

    document.addEventListener("mousedown", handleMouseDown);
  }, []);

  const handleWorldClick = React.useCallback(
    (e: React.MouseEvent<SVGRectElement>) => {
      let prevX = e.clientX;
      let prevY = e.clientY;

      const handleMouseMove = (e: any) => {
        const currentX = e.clientX;
        const currentY = e.clientY;

        const deltaX = currentX - prevX;
        // const deltaY = currentY - prevY
        prevX = currentX;
        prevY = currentY;

        // const deltaAngle = Math.atan(deltaX / worldRadius);

        setTranslation((trans) => trans + deltaX);
      };

      const handleMouseUp = () => {
        e.target.removeEventListener("mousemove", handleMouseMove);
        e.target.removeEventListener("mouseup", handleMouseUp);
      };

      e.target.addEventListener("mouseup", handleMouseUp);
      e.target.addEventListener("mousemove", handleMouseMove);
    },
    []
  );

  const contextValue = React.useMemo(() => {
    return {
      translation,
    };
  }, [translation]);

  return (
    <g
      transform={`translate(${translation + size.width / 2}, 0)`}
      onMouseDown={handleWorldClick}
    >
      <GameCameraContext.Provider value={contextValue}>
        {props.children}
      </GameCameraContext.Provider>
    </g>
  );
}
