import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "../styles/Home.module.css";
import { EventsStore, GameStore } from "@/store";
import { GameCanvas } from "../components";
import { Background } from "../components/Background";
import { GameCamera } from "../components/GameCamera";
import { Soil } from "@/components/Soil";
import { AnchorPoints } from "@/components/AnchorPoints";
import { Fungi } from "@/components/Fungi";

export default function Home() {
  return (
    <main className={styles.main}>
      <EventsStore>
        <GameStore>
          <GameCanvas>
            <Background />
            <GameCamera>
              <Soil />
              <AnchorPoints />
              <Fungi />
            </GameCamera>
          </GameCanvas>
        </GameStore>
      </EventsStore>
    </main>
  );
}
