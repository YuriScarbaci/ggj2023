import { useGame } from "@/store";
import localFont from "@next/font/local";

const RetroGaming = localFont({
  src: "../styles/fonts/retro-gaming.ttf",
});
export function BoardGlobalStats() {
  const { traitPoints, totalColonies } = useGame();

  return (
    <g transform="translate(56.06 225)">
      <g id="global-stats-panel" transform="scale(1,0.75)">
        <path
          id="global-stats-panel-background"
          style={{
            fill: "#003534",
          }}
          d="M6 6.32h349v132H6z"
        />
        <path
          id="global-stats-panel-internal-border"
          fill="#1e1e1e"
          d="M4 0h353v4H4zM0 4h4v136H0zM357 4h4v136h-4zM4 140h353v4H4z"
        />

        <path
          id="global-stats-panel-bottom-border"
          d="M353 65.41v70.74H8V65.41H4v74.74h353V65.41h-4Z"
          style={{
            fill: "#2e2e2e",
          }}
        />
        <path
          id="global-stats-panel-top-border"
          d="M8 66.7V7.36h345V66.7h4V4H4v62.7h4Z"
          style={{
            fill: "#494949",
          }}
        />
      </g>
      <g id="trait-row" transform="translate(0,-35)">
        <g id="trait-icon">
          <path
            fill="#d4e26d"
            d="M36.88 114.32h1.83v1.83h-1.83zM38.71 112.49h1.83v1.83h-1.83z"
          />
          <path fill="#d4e26d" d="M40.53 110.67h1.83v1.83h-1.83z" />
          <path fill="#d4e26d" d="M42.35 108.85h1.83v1.83h-1.83z" />
          <path
            fill="#d4e26d"
            d="M44.17 107.03H46v1.83h-1.83zM42.35 105.2h1.83v1.83h-1.83zM40.52 103.38h1.83v1.83h-1.83zM38.7 101.55h1.83v1.83H38.7zM36.87 99.73h1.83v1.83h-1.83zM35.05 97.9h1.83v1.83h-1.83zM33.22 99.73h1.83v1.83h-1.83zM31.39 101.56h1.83v1.83h-1.83zM29.56 103.39h1.83v1.83h-1.83z"
          />
          <path
            fill="#d4e26d"
            d="M27.74 105.21h1.83v1.83h-1.83zM25.91 107.04h1.83v1.83h-1.83zM27.75 108.88h1.83v1.83h-1.83zM35.05 116.14h1.83v1.83h-1.83zM33.22 114.32h1.83v1.83h-1.83z"
          />
          <path fill="#d4e26d" d="M31.4 112.5h1.83v1.83H31.4z" />
          <path
            fill="#d4e26d"
            d="M29.58 110.68h1.83v1.83h-1.83zM39.83 109l-1.29 1.29-1.29-1.29-1.3 1.29-1.29-1.29-1.29 1.29-1.29-1.29 1.29-1.3 1.29-1.29 1.29-1.29 1.3 1.29 1.29 1.29 1.29 1.3z"
          />
        </g>
        <text
          fill="#fff"
          className={RetroGaming.className}
          fontSize="18px"
          transform="translate(56.06 114.5)"
        >
          <tspan x={0} y={0}>
            Trait points: {traitPoints}
          </tspan>
        </text>
      </g>

      <g id="shroom-row" transform="translate(0,-5)">
        <g id="shroom-icon">
          <path
            fill="#ef9595"
            d="M27.94 41.17h4.02v2.01h-4.02zM40.02 41.17h4.02v2.01h-4.02zM40.02 39.16v2.01h-2.01v4.02h-4.02v-4.02h-2.01v-2.01h8.04zM25.95 35.14h2.01v6.03h-2.01zM27.96 33.13h2.01v2.01h-2.01zM29.97 31.12h2.01v2.01h-2.01zM31.98 29.11h8.04v2.01h-8.04zM40.02 31.12h2.01v2.01h-2.01zM42.03 33.13h2.01v2.01h-2.01zM44.04 35.14h2.01v6.03h-2.01z"
          />
        </g>
        <text
          className={RetroGaming.className}
          fill="#fff"
          fontSize="18px"
          transform="translate(56.06 42.52)"
        >
          <tspan x={0} y={0}>
            Amount of Colonies: {totalColonies}
          </tspan>
        </text>
      </g>
      {/* <g id="roots-icon">
        <path fill="#baa474" d="M35.03 79.07h2.01v2.01h-2.01z" />
        <path
          fill="#baa474"
          d="M33.03 77.15h2.01v2.01h-2.01zM35.03 75.14h2.01v2.01h-2.01zM37.03 73.13h2.01v2.01h-2.01zM41.05 65.09v2.01h-4.01v4.02h-.01v2h-2.01v-2.01h.01V67.1h-4v-2.01h10.02zM28.99 67.13H31v2.01h-2.01z"
        />
        <path
          fill="#baa474"
          d="M35.04 63.08h2.01v2.01h-2.01zM26.94 69.18h2.01v2.01h-2.01zM28.99 71.22H31v2.01h-2.01zM26.96 73.25h2.01v2.01h-2.01zM41 67.13h2.01v2.01H41zM43.05 69.18h2.01v2.01h-2.01zM41 71.22h2.01v2.01H41zM43.03 73.25h2.01v2.01h-2.01z"
        />
      </g> */}
    </g>
  );
}
