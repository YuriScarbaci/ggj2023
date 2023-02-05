// import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "../styles/Home.module.css";
import { EventsStore, GameStore } from "@/store";
import { GameCanvas } from "../components";
import { Background } from "../components/Background";
import { GameCamera } from "../components/GameCamera";
import { Soil } from "@/components/Soil";
import { AnchorPoints } from "@/components/statics/AnchorPoints";
import { FungiColonies } from "@/components/instancied/FungiColonies";
import { Board } from "@/components/Board";

export default function Home() {
  return (
    <main className={styles.main}>
      <EventsStore>
        <GameStore>
          <Board />
          <GameCanvas>
            <Background />
            <GameCamera>
              <Soil>
                <FungiColonies />
                <AnchorPoints />
              </Soil>
            </GameCamera>
          </GameCanvas>
        </GameStore>
      </EventsStore>
    </main>
  );
}
