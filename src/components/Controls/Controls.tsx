import { FunctionComponent, useState } from "react";
import classes from "./Controls.module.css";
import { playButtonHandler } from "./ControlsHandlers";
import { ControlsProps } from "./ControlsProps";


const Controls: FunctionComponent<ControlsProps> = ({ myP5 }) => {
    const [playButtonText, setPlayButtonText] = useState("Play");

    return (
        <div className={classes.row}>
            <button
                className={classes.playButton}
                onClick={() => playButtonHandler(myP5, setPlayButtonText)}>
                {playButtonText}
            </button>
        </div>
    );
}

export default Controls;