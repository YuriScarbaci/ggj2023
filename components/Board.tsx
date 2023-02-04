import styles from "@/styles/Board.module.css";
import { useState } from "react";

export function Board() {
  const [traitBoard, setTraitBoard] = useState(false);
  const handleAddTrait = (type: string) => {
    if (type === "toxic") {
      //setToxicType +1
    }
    if (type === "psychoactive") {
      //setPsychoactiveType +1
    }
  };
  const traitPoints = 1;
  const colonies = 1;
  const enemies = 1;
  const toxic = 1;
  const psychoactive = 1;

  return (
    <foreignObject x="0" y="0" width="160" height="160">
      <div className={styles.quantitiesContainer}>
        <span className={styles.numberItem}>
          Number of colonies: {colonies}
        </span>
        <span className={styles.numberItem}>Number of enemies: {enemies}</span>
      </div>
      <div className={styles.traitsContainer}>
        {traitBoard ? (
          <div className={styles.traitsContainerOpen}>
            <button
              onClick={() => setTraitBoard(!traitBoard)}
              className={styles.closeButton}
            >
              x
            </button>
            <br />
            <span className={styles.numberItem}>
              Trait points: {traitPoints}
            </span>
            <hr />
            <div className={styles.traitElement}>
              <span className={styles.item}>Toxic effect: {toxic}</span>
              {traitPoints > 0 && (
                <button
                  onClick={() => handleAddTrait("toxic")}
                  className={styles.button}
                >
                  +
                </button>
              )}
            </div>
            <div className={styles.traitElement}>
              <span className={styles.item}>
                Psychoactive effect: {psychoactive}
              </span>
              {traitPoints > 0 && (
                <button
                  onClick={() => handleAddTrait("psychoactive")}
                  className={styles.button}
                >
                  +
                </button>
              )}
            </div>
          </div>
        ) : (
          <button
            onClick={() => setTraitBoard(!traitBoard)}
            className={styles.button}
          >
            +
          </button>
        )}
      </div>
    </foreignObject>
  );
}
