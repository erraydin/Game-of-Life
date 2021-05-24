import { FunctionComponent, useState } from "react";
import { myP5 } from "../p5/sketch";
import classes from "./Controls.module.css";

export type ControlProps = {
    myP5: React.MutableRefObject<myP5 | null>
}
const Controls: FunctionComponent<ControlProps> = ({ myP5 }) => {
    const [playButtonText, setPlayButtonText] = useState("Play");

    const playButtonHandler = () => {
        myP5.current!.playing = !myP5.current!.playing;
        if (myP5.current!.playing) setPlayButtonText("Pause");
        else setPlayButtonText("Play");
    }

    return (
        <div className={classes.row}>
            <button
                className={classes.playButton}
                onClick={playButtonHandler}>
                {playButtonText}
            </button>
        </div>
    );
}

export default Controls;