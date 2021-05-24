import classes from "./Preferences.module.css";
import p5 from "p5";
import defineSketch, { myP5 } from "../p5/sketch";
import { ChangeEvent, FunctionComponent, useState } from "react";

export type PreferencesProps = {
    myP5: React.MutableRefObject<myP5 | null>,
    wrapper: React.RefObject<HTMLDivElement>
}

const Preferences: FunctionComponent<PreferencesProps> = ({ myP5, wrapper }) => {
    const [fps, setFps] = useState(20);
    const sizeSliderHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const num = +event.target.value;
        const playing = myP5.current!.playing;
        myP5.current?.remove();
        myP5.current = new p5(defineSketch(playing!, 600 / num, num, num, fps), wrapper.current!)
    }

    const fpsSliderHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const fps = +event.target.value;
        setFps(fps);
        myP5.current!.fps = fps;

    }

    return (
        <div className={classes.column}>
            <div>
                <h3>Size:</h3>
                <input
                    onChange={sizeSliderHandler}
                    name="sizeSlider"
                    type="range"
                    min="5"
                    max="60"
                    defaultValue="30"
                    className={classes.slider} />
            </div>
            <div>
                <h3>Speed: {fps} fps</h3>
                <input
                    onChange={fpsSliderHandler}
                    name="fpsSlider"
                    type="range"
                    min="1"
                    max="60"
                    defaultValue="20"
                    className={classes.slider} />
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