// import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { EventsStore, GameStore } from "@/store";
import { GameCanvas } from "../components";
import { Background } from "../components/Background";
import { GameCamera } from "../components/GameCamera";
import { Soil } from "@/components/Soil";
import { AnchorPoints } from "@/components/statics/AnchorPoints";
import { FungiColonies } from "@/components/instancied/FungiColonies";
import { BoardTraits } from "@/components/BoardTraits";
import { BoardGlobalStats } from "@/components/BoardGlobalStats";

export default function Home() {
  return (
    <main className={styles.main}>
      <EventsStore>
        <GameStore>
          <GameCanvas>
            <Background />
            <BoardTraits />
            <BoardGlobalStats />
            <GameCamera>
              <Soil>
                <AnchorPoints />
                <FungiColonies />
              </Soil>
            </GameCamera>
          </GameCanvas>
        </GameStore>
      </EventsStore>
    </main>
  );
}
