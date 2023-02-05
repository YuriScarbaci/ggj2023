import "@/styles/globals.css";
import type { AppProps } from "next/app";
import localFont from "@next/font/local";

const RetroGaming = localFont({
  src: "../styles/fonts/retro-gaming.ttf",
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={RetroGaming.className}>
      <Component {...pageProps} />
    </main>
  );
}
