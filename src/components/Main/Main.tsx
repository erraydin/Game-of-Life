import { FunctionComponent, useEffect, useRef } from "react";
import p5 from "p5";
import defineSketch, { myP5 } from "../../p5/sketch";
import Controls from "../Controls/Controls";
import classes from "./Main.module.css";
import Patterns from "../Patterns/Patterns";
import Preferences from "../Preferences/Preferences";
import { pattern } from "../../p5/presets"
import { RouteComponentProps } from "react-router-dom";


const Main: FunctionComponent<RouteComponentProps> = ({ match }) => {
    const wrapper = useRef<HTMLDivElement>(null);
    const myP5 = useRef<myP5 | null>(null);
    const myPattern = pattern.get("achimsp144");
    const size = myPattern!.length;
    console.log(match);
    useEffect(() => {
        if (wrapper.current !== null) {
            myP5.current = new p5(defineSketch(false, 600 / size, size, size, 20, myPattern!), wrapper.current)
            console.log("useEffectCalled");
        }
    }, [size, myPattern])


    return (
        <div className={classes.mainContainer}>
            <div className={classes.canvas} ref={wrapper} />
            <div className={classes.column}>
                <div className={classes.row}>
                    <Preferences myP5={myP5} wrapper={wrapper} initialSize={size} />
                    <Patterns />
                </div>
                <Controls myP5={myP5} />
            </div>
        </div>
    );
}

export default Main;