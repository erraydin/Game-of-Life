import { FunctionComponent } from "react";
import classes from "./Controls.module.css";
import { playButtonHandler } from "./ControlsHandlers";
import { ControlsProps } from "./ControlsProps";

const Controls: FunctionComponent<ControlsProps> = ({ myP5, playing, setPlaying }) => {

    return (
        <div className={classes.row}>
            <button
                className={classes.playButton}
                onClick={() => playButtonHandler(myP5, setPlaying)}>
                {playing ? "Pause" : "Play"}
            </button>
        </div>
    );
}

export default Controls;