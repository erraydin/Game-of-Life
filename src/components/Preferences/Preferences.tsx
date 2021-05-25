import classes from "./Preferences.module.css";
import { FunctionComponent, useState } from "react";
import { sizeSliderHandler, fpsSliderHandler } from "./PreferencesHandlers"
import { PreferencesProps } from "./PreferencesProps";


const Preferences: FunctionComponent<PreferencesProps> = ({ myP5, wrapper }) => {
    const [fps, setFps] = useState(20);
    const [size, setSize] = useState(30);

    return (
        <div className={classes.column}>
            <div>
                <h3>Size: {size}×{size}</h3>
                <input
                    onChange={
                        (event) => sizeSliderHandler(event, myP5, wrapper, fps, setSize)
                    }
                    name="sizeSlider"
                    type="range"
                    min="5"
                    max="120"
                    defaultValue="30"
                    className={classes.slider}
                />
            </div>
            <div>
                <h3>Speed: {fps} fps</h3>
                <input
                    onChange={(event) => fpsSliderHandler(event, myP5, setFps)}
                    name="fpsSlider"
                    type="range"
                    min="1"
                    max="60"
                    defaultValue="20"
                    className={classes.slider}
                />
            </div>
            <button className={classes.populateButton}>
                Populate Randomly
            </button>
            <button className={classes.clearButton}>
                Clear
            </button>
        </div>
    );
}

export default Preferences;