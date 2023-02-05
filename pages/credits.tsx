import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import localFont from "@next/font/local";
import styles from "@/styles/Home.module.css";

const RetroGaming = localFont({
  src: "../styles/fonts/retro-gaming.ttf",
});
export default function NotFound404() {
  return (
    <>
      <Head>
        <title>Mushroomize</title>
        <meta name="description" content="Mushroomize credits page" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gridTemplateRows: "1fr 1fr 1fr",
            gap: "0px 0px",
            justifyContent: "center",
            alignContent: "center",
            justifyItems: "center",
            alignItems: "center",
            height: "100%",
            width: "100%",
            background: "url('./textures/homepage/bg.png')",
            WebkitBackgroundSize: "cover",
          }}
        >
          <div style={{ width: "40%" }}>
            <Image
              width={600}
              height={200}
              src="/textures/homepage/title.png"
              alt="Mushroomize"
            />
          </div>
          <div
            style={{
              textAlign: "center",
              backgroundColor: "#003534",
              opacity: "90%",
              border: "solid 4px #1e1e1e",
              padding: "1.7rem 2rem",
            }}
          >
            <h1>CREDITS</h1>
            <h2
              style={{
                color: "#a2f294",
                fontSize: "1.1em",
                paddingTop: "0.8rem",
              }}
            >
              Developers
            </h2>
            <p
              style={{
                paddingTop: "0.2rem",
              }}
            >
              Freddy Ramirez
            </p>
            <p>Gustavo Leon</p>
            <p>Erick Gomez</p>
            <p>Juan Cruz Fortunatti</p>
            <p>Yuri Scarbaci</p>
            <p>Ezequiel Baruf</p>
            <h2
              style={{
                color: "#a2f294",
                fontSize: "1.1em",
                paddingTop: "0.8rem",
              }}
            >
              Illustrations & Character Design
            </h2>
            <p
              style={{
                paddingTop: "0.2rem",
              }}
            >
              Carlos José Pisarello
            </p>
            <h2
              style={{
                color: "#a2f294",
                fontSize: "1.1em",
                paddingTop: "0.8rem",
              }}
            >
              UI Design & Wireframes
            </h2>
            <p
              style={{
                paddingTop: "0.2rem",
              }}
            >
              Juan Cruz Hernandez
            </p>
            <h2
              style={{
                color: "#a2f294",
                fontSize: "1.1em",
                paddingTop: "0.8rem",
              }}
            >
              QA Testing
            </h2>
            <p
              style={{
                paddingTop: "0.2rem",
              }}
            >
              Car Villarpando
            </p>
            <p>Pia Goicoechea</p>
          </div>
          <Link href="/">
            <div style={{ minWidth: "150px", minHeight: "50px" }}>
              <svg
                id="Capa_2"
                data-name="Capa 2"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 228.29 82.61"
                transform="translate(0 0)"
              >
                <rect
                  fill="#001e33"
                  x="3.04"
                  y="4.12"
                  width="221.08"
                  height="74.56"
                />
                <rect fill="#1e1e1e" y="2.13" width="2.23" height="78.23" />
                <rect
                  fill="#1e1e1e"
                  x="226.06"
                  y="2.13"
                  width="2.23"
                  height="78.23"
                />
                <rect
                  fill="#1e1e1e"
                  x="2.23"
                  y="80.36"
                  width="223.83"
                  height="2.25"
                />
                <rect fill="#1e1e1e" x="2.23" width="223.83" height="2.25" />
                <text
                  fill="#fff"
                  className={RetroGaming.className}
                  fontSize="18px"
                  transform="translate(56.59 47.62)"
                >
                  <tspan x="0" y="0">
                    MAIN MENU
                  </tspan>
                </text>
                <path
                  fill="#494949"
                  d="M4.77,64.82V5.48H223.52v59.34h2.54V2.13H2.23v62.7h2.54Z"
                />
                <path
                  fill="#2e2e2e"
                  d="M223.52,38.27v39.83H4.77V38.27H2.23v42.09H226.06V38.27h-2.54Z"
                />
              </svg>
            </div>
          </Link>
        </div>
      </main>
    </>
  );
}
