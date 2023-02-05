import localFont from "@next/font/local";

const RetroGaming = localFont({
  src: "../styles/fonts/retro-gaming.ttf",
});

export function BoardTraits() {
  const hitPoints = 1;
  const poison = 1;
  const psychedelics = 1;
  return (
    <g transform="translate(56, 42)">
      <path fill="#003534" d="M6 6h349v132H6z" />
      <path
        fill="#1e1e1e"
        d="M4 0h353v4H4zM0 4h4v136H0zm357 0h4v136h-4zM4 140h353v4H4z"
      />
      <text
        fill="#fff"
        className={RetroGaming.className}
        fontSize="18px"
        transform="translate(56 43)"
      >
        <tspan x={0} y={0}>
          Max Hit Points: {hitPoints}
        </tspan>
      </text>
      <text
        fill="#fff"
        className={RetroGaming.className}
        fontSize="18px"
        transform="translate(56 79)"
      >
        <tspan x={0} y={0}>
          Poison points: {poison}
        </tspan>
      </text>
      <text
        fill="#fff"
        className={RetroGaming.className}
        fontSize="18px"
        transform="translate(56 115)"
      >
        <tspan x={0} y={0}>
          Psychedelics points: {psychedelics}
        </tspan>
      </text>
      <path fill="#2e2e2e" d="M353 65v71H8V65H4v75h353V65h-4Z" />
      <path fill="#494949" d="M8 67V7h345v60h4V4H4v63h4Z" />
      <path
        fill="#ea6363"
        d="M44 28v-2h-7v2h-2v-2h-7v2h-2v8h2v3h2v2h2v3h3v2h2v-2h3v-3h2v-2h2v-3h2v-8m-15 3v3h-3v-5h3v2Z"
      />
      <path
        d="M43 70h-2v-2H31v2h-2v6h2v4h2v-2h2v2h2v-2h2v2h2v-4h2v-6Zm-10 5v-4h2v4h-2Zm4 0v-4h2v4h-2Z"
        fill="#a2f294"
      />
      <path
        d="M42 69h4v-2h-2v-2h-2v4Zm-14-2h-2v2h4v-4h-2v2Zm2 10h-4v2h2v2h2v-4Zm12 0v4h2v-2h2v-2h-4Z"
        fill="#a2f294"
      />
      <path
        fill="#c781ef"
        d="M26 100h2v2h-2zm2-2h14v2H28zm16 4h2v12h-2zm-2-2h2v2h-2zm0 14h2v2h-2zm-12 2h12v2H30zm-2-2h2v2h-2zm-2-8h2v8h-2zm2-2h2v2h-2zm2-2h8v2h-8zm8 2h2v2h-2zm2 2h2v6h-2zm-8 6h8v2h-8zm-2-4h2v4h-2zm2-2h4v2h-4zm4 2h2v2h-2z"
      />
    </g>
  );
}
