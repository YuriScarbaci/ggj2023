import React from "react";
import { GameCanvasContext } from "@/components/GameCanvas";
import { randomArc } from "@/settings";
import { useGame } from "@/store";
import { AnchorPoint } from "@/store/types";
import { Root } from "@/components/elements/Root";
import localFont from "@next/font/local";
const RetroGaming = localFont({
  src: "../../styles/fonts/retro-gaming.ttf",
});
export const FungiInventoryPanel = () => {
  const { width } = React.useContext(GameCanvasContext);
  const isActive = "venom";
  return (
    <g
      id="Capa_1-2"
      data-name="Capa 1"
      transform={`translate(${width - 230}, 42)`}
    >
      <g id="complete_select-panel">
        <g id="select-panel">
          <path fill="#003534" d="M8 8.34h191.27v227.45H8z" />
          <path
            d="M202.63 4h4v235.54h-4zM4 0h198.63v4H4zm0 239.24h198.63v4H4zM0 4h4v235.54H0z"
            fill="#1e1e1e"
          />
          <path
            d="M202.63 4v198.74h-3.36V8.51h-59.34v-.03H78.74v.03H8v194.23H4V4h74.74v.03h61.19V4h62.7z"
            fill="#494949"
          />
          <path
            d="M202.63 130.4v109.14h-74.74v-.03H66.7v.03H4V130.4h3.36v104.63H66.7v.03h61.19v-.03h70.74V130.4h4z"
            fill="#2e2e2e"
          />
          <path d="M4 130.4h4v104.63H4z" fill="#2e2e2e" />
          <path d="M198.63 8.34h4V130.4h-4z" fill="#494949" />
          <text
            fill="#fff"
            className={RetroGaming.className}
            fontSize="18px"
            transform="translate(21.82 40.79)"
          >
            <tspan x={0} y={0}>
              {"Select Fungus"}
            </tspan>
          </text>
        </g>
        <g id="a_button-active">
          <path fill="#22990a" d="M40.26 87.2h24v24h-24z" />
          <path d="M40.26 87.2h1v24h-1z" fill="#025104" />
          <path d="M64.26 110.19v1h-24v-1z" fill="#025104" />
          <path d="M64.27 111.19h-1v-24h1z" fill="#025104" />
          <path d="M40.26 87.2h1v12h-1zm24.01 11.99h-1v-12h1z" fill="#5c8e52" />
          <path d="M40.27 88.2v-1h24v1z" fill="#5c8e52" />
          <text
            fill="#fff"
            className={RetroGaming.className}
            fontSize="18px"
            transform="translate(44.72 105.74)"
          >
            <tspan x={0} y={0}>
              {"A"}
            </tspan>
          </text>
        </g>
        <g id="z_button-inactive">
          <path d="M41.26 176.74h24v24h-24z" fill="#1e1e1e" />
          <path d="M41.26 176.74h1v24h-1z" fill="#2e2e2e" />
          <path d="M65.27 199.74v1h-24v-1z" fill="#2e2e2e" />
          <path d="M65.27 200.74h-1v-24h1z" fill="#2e2e2e" />
          <path d="M41.26 176.74h1v12h-1zm24.01 12h-1v-12h1z" fill="#494949" />
          <path d="M41.26 177.75v-1h24v1z" fill="#494949" />
          <text
            fill="#fff"
            className={RetroGaming.className}
            fontSize="18px"
            transform="translate(45.72 195.29)"
          >
            <tspan x={0} y={0}>
              {"Z"}
            </tspan>
          </text>
        </g>
      </g>
      <image
        href={`./textures/colony_${
          isActive === "colony" ? "active" : "inactive"
        }.png`}
        transform="translate(93.37 153.74)"
        id="colony"
        width="70"
        height="70"
      />
      <image
        href={`./textures/venom_${
          isActive === "venom" ? "active" : "inactive"
        }.png`}
        transform="translate(90.37 61.2)"
        id="venom"
        width="70"
        height="70"
      />
    </g>
  );
};
