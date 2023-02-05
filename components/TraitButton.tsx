import * as React from "react";
import styles from "@/styles/traitButton.module.css";
import { useTraitPoints } from "@/store/game-logics/useTraitPoints";
import { useGame } from "@/store";

interface TraitButtonProps {
    type: "add" | "remove";
    name: string;
  }

export const  TraitButton = (props: TraitButtonProps) => {
    const [pressed, setPressed] = React.useState(false);
    const { spendTraitPoints, canSpendTraitsPoints, revertTrait } = useGame();

    const handleClick = () => {
        if(props.type === "add"){
            if(canSpendTraitsPoints()){
                spendTraitPoints(1, props.name);
            }
        } else {
            revertTrait(1, props.name);
        }
  
    }

    const mouseDown = () =>{
        setPressed(true);
    }

    const mouseUp = () =>{
        setPressed(false);
        handleClick();
    }

    const renderNormal = () => (<g id="Capa_1-2" data-name="Capa 1">
        <g id="plus_hitpoints">
          <rect className={styles.cls1} width="24" height="24"/>
          <rect className={styles.cls3} width="1" height="24"/>
          <rect className={styles.cls3} x="23" width="1" height="24" transform="translate(47 24) rotate(180)"/>
          <rect className={styles.cls3} x="11.5" y="-11.5" width="1" height="24" transform="translate(11.5 12.5) rotate(-90)"/>
          <rect className={styles.cls3} x="11.5" y="11.5" width="1" height="24" transform="translate(-11.5 35.5) rotate(-90)"/>
          <text className={styles.cls2} transform="translate(5.46 18.54)"><tspan x="0" y="0">{props.type === "add" ? "+":"-" }</tspan></text>
        </g>
      </g>);

    const renderPressed = () => {
        return(<g id="Capa_1-2" data-name="Capa 1">
            <g id="plus_hitpoints">
                <rect className={styles.cls4Pressed} width="24" height="24"/>
                <rect className={styles.cls2Pressed} width="1" height="24"/>
                <rect className={styles.cls2Pressed} x="11.5" y="11.5" width="1" height="24" transform="translate(35.5 11.5) rotate(90)"/>
                <rect className={styles.cls2Pressed} x="23" width="1" height="24" transform="translate(47 24) rotate(180)"/>
                <rect className={styles.cls1Pressed} width="1" height="12"/>
                <rect className={styles.cls1Pressed} x="23" width="1" height="12" transform="translate(47 12) rotate(180)"/>
                <rect className={styles.cls1Pressed} x="11.5" y="-11.5" width="1" height="24" transform="translate(11.5 12.5) rotate(-90)"/>
                <text className={styles.cls3Pressed} transform="translate(5.46 18.54)"><tspan x="0" y="0">{ props.type === "add" ? "+":"-" }</tspan></text>
            </g>
        </g>);
    }

    return (
        <g 
         onMouseDown={() => mouseDown()}
         onMouseUp={ () => mouseUp()}>
         {pressed ? renderPressed() : renderNormal()}
        </g>
    );
}