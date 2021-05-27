import { FunctionComponent } from "react";
import classes from "./Controls.module.css";
import { nextButtonHandler, playButtonHandler } from "./ControlsHandlers";
import { ControlsProps } from "./ControlsProps";

const Controls: FunctionComponent<ControlsProps> = ({ myP5, playing, setPlaying }) => {

    return (
        <div className={classes.row}>
            <button
                className={classes.playButton}
                onClick={() => playButtonHandler(myP5, setPlaying)}>
                {playing ? "Pause" : "Play"}
            </button>
            <button
                className={classes.playButton}
                onClick={() => nextButtonHandler(myP5, setPlaying)}>
                Next
            </button>
        </div>
    );
}

export default Controls;