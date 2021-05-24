import { useEffect, useReducer, useRef } from "react";
import playReducer from "../reducers/playReducer";
import p5 from "p5";
import defineSketch, { myP5 } from "../p5/sketch";
import Controls from "./Controls";
import classes from "./Main.module.css";
import Patterns from "./Patterns";
import Preferences from "./Preferences";

const Main = () => {
    // const [playing, dispatchPlaying] = useReducer(playReducer, false);

    const wrapper = useRef<HTMLDivElement>(null);
    const myP5 = useRef<myP5 | null>(null);

    useEffect(() => {
        if (wrapper.current !== null) {
            myP5.current = new p5(defineSketch(false, 600 / 30, 30, 30, 20), wrapper.current)
            console.log("useEffectCalled");
        }
    }, [])


    return (
        <div className={classes.mainContainer}>
            <div className={classes.canvas} ref={wrapper} />
            <div className={classes.column}>
                <div className={classes.row}>
                    <Preferences />
                    <Patterns />
                </div>
                <Controls myP5={myP5} />
            </div>
        </div>
    );
}

export default Main;