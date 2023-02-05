import Head from "next/head";
import styles from "../styles/Home.module.css";
import { EventsStore, GameStore } from "@/store";
import { GameCanvas } from "../components";
import { Background } from "../components/Background";
import { GameCamera } from "../components/GameCamera";
import { Soil } from "@/components/Soil";
import { AnchorPoints } from "@/components/statics/AnchorPoints";
import { FungiColonies } from "@/components/instancied/FungiColonies";
import { BoardTraits } from "@/components/BoardTraits";
import { FungiInventoryPanel } from "@/components/statics/FungiInventoryPanel";
import { BoardGlobalStats } from "@/components/BoardGlobalStats";
import { Enemies } from "@/components/instancied/Enemies";

export default function Home() {
  return (
    <>
      <Head>
        <title>Mushroomize</title>
        <meta name="description" content="Mushroomize play page" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <EventsStore>
          <GameStore>
            <GameCanvas>
              <Background />
              <FungiInventoryPanel />
              <BoardTraits />
              <BoardGlobalStats />
              <GameCamera>
                <Soil>
                  <AnchorPoints />
                  <FungiColonies />
                  <Enemies />
                </Soil>
              </GameCamera>
            </GameCanvas>
          </GameStore>
        </EventsStore>
      </main>
    </>
  );
}
